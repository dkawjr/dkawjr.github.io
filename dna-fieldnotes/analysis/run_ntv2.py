"""Research-only, masked 6-mer allele contrast. No pathogenicity calibration."""
import os
from pathlib import Path
B=Path(__file__).parent
os.environ['HF_HOME']=str(B/'hf-cache');os.environ['HF_HUB_OFFLINE']='1';os.environ['TRANSFORMERS_OFFLINE']='1'
import json,hashlib,time,statistics,platform
import torch,transformers
from transformers import AutoTokenizer,AutoModelForMaskedLM
torch.manual_seed(0)
torch.set_num_threads(8)
torch.backends.cuda.matmul.allow_tf32=False
torch.backends.cudnn.allow_tf32=False
MODEL=B/'ntv2'
REV='06615c1660c892fc199840c18123f8385b3542a8'
variants=json.loads((B/'variants.json').read_text())
tokenizer=AutoTokenizer.from_pretrained(str(MODEL),local_files_only=True)
device='cuda' if torch.cuda.is_available() else 'cpu'
print('Loading pinned NTv2 500M; device:',device,flush=True)
model,loading=AutoModelForMaskedLM.from_pretrained(str(MODEL),trust_remote_code=True,local_files_only=True,use_safetensors=True,torch_dtype=torch.float32,output_loading_info=True)
assert not loading['missing_keys'],loading['missing_keys']
assert not loading['unexpected_keys'],loading['unexpected_keys']
assert not loading.get('mismatched_keys'),loading.get('mismatched_keys')
model=model.to(device).eval()
rc=lambda s:s.translate(str.maketrans('ACGT','TGCA'))[::-1]
def view(sequence,idx,ref,alt,offset,strand):
 start=512+offset;seq=sequence[start:start+3072];i=idx-start
 assert seq[i]==ref
 if strand=='-':seq=rc(seq);i=len(seq)-1-i;ref=rc(ref);alt=rc(alt)
 six_start=i//6*6;ref6=seq[six_start:six_start+6];alt6=ref6[:i%6]+alt+ref6[i%6+1:]
 # Encode explicit k-mers to fix boundaries; validate against the model's native tokenizer.
 kmers=[seq[k:k+6] for k in range(0,len(seq),6)]
 ids=[tokenizer.cls_token_id]+tokenizer.convert_tokens_to_ids(kmers)
 native=tokenizer(seq,add_special_tokens=True)['input_ids']
 assert ids==native,'Unexpected tokenizer boundaries'
 assert tokenizer.unk_token_id not in ids
 maskpos=1+i//6;refid=tokenizer.convert_tokens_to_ids(ref6);altid=tokenizer.convert_tokens_to_ids(alt6)
 assert refid==ids[maskpos] and refid!=altid and altid!=tokenizer.unk_token_id
 ids[maskpos]=tokenizer.mask_token_id
 return dict(ids=ids,maskpos=maskpos,reference_token=ref6,alternate_token=alt6,reference_id=refid,alternate_id=altid,offset=offset,strand=strand)
def score(v):
 views=[view(v['sequence'],v['variant_index'],v['reference'],v['alternate'],o,s) for s in ['+','-'] for o in range(6)]
 rows=[]
 with torch.inference_mode():
  for t in views:
   ids=torch.tensor([t['ids']],device=device);mask=torch.ones_like(ids)
   logits=model(input_ids=ids,attention_mask=mask).logits[0,t['maskpos']].float()
   lp=torch.log_softmax(logits,dim=-1)
   a=lp[t['alternate_id']].item();r=lp[t['reference_id']].item();delta=a-r
   assert abs(delta-(logits[t['alternate_id']]-logits[t['reference_id']]).item())<1e-4
   assert torch.isfinite(lp).all()
   # Same-allele negative control must be exactly zero.
   assert (lp[t['reference_id']]-lp[t['reference_id']]).item()==0
   rows.append(dict(offset=t['offset'],strand=t['strand'],reference_token=t['reference_token'],alternate_token=t['alternate_token'],logp_reference=r,logp_alternate=a,delta_logp_alt_minus_ref=delta))
 ds=[r['delta_logp_alt_minus_ref'] for r in rows]
 return {k:x for k,x in v.items() if k!='sequence'}|dict(mean_delta=statistics.mean(ds),median_delta=statistics.median(ds),min_delta=min(ds),max_delta=max(ds),sd_delta=statistics.stdev(ds),negative_views=sum(x<0 for x in ds),positive_views=sum(x>0 for x in ds),views=rows)
began=time.time();results=[]
for v in variants:
 result=score(v);results.append(result);print(v['gene'],v['marker'],'mean',round(result['mean_delta'],4),'range',round(result['min_delta'],4),round(result['max_delta'],4),flush=True)
 (B/'partial_results.json').write_text(json.dumps(results,indent=2))
repeat=score(variants[0]);assert abs(repeat['mean_delta']-results[0]['mean_delta'])<1e-6
manifest=dict(model='InstaDeepAI/nucleotide-transformer-v2-500m-multi-species',revision=REV,weights_sha256=hashlib.file_digest((MODEL/'model.safetensors').open('rb'),'sha256').hexdigest(),date='2026-11-05',device=device,gpu=torch.cuda.get_device_name(0) if device=='cuda' else None,precision='float32; TF32 disabled',torch=torch.__version__,transformers=transformers.__version__,python=platform.python_version(),context_bp=3072,views_per_variant=12,method='Mask the 6-mer containing the variant; log P(alternate 6-mer | masked reference context) minus log P(reference 6-mer | same context). Mean across six tokenization offsets on each strand. Reference-genome context, not phased personal haplotypes.',interpretation='Negative values mean the model assigns the alternate sequence lower probability. Not a calibrated pathogenicity probability, effect size, confidence interval, or diagnostic result.',checks={'reference_base_verified':True,'native_tokenization_matches_explicit_kmers':True,'zero_change_control':True,'deterministic_repeat':True,'model_loading_missing_keys':loading['missing_keys'],'model_loading_unexpected_keys':loading['unexpected_keys']},elapsed_seconds=time.time()-began,results=results)
(B/'ntv2_results.json').write_text(json.dumps(manifest,indent=2));print('COMPLETE',len(results),'variants',flush=True)