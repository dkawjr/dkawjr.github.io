# Reproducing the research score

The public script is generic. Input sequences, observed genotype records and outputs are deliberately not in this public repository.

1. Create an isolated Python 3.11 environment. The verified runtime used PyTorch 2.7.1+cu128, Transformers 4.49.0, NumPy 2.2.6 and safetensors 0.5.3.
2. Download the official model files from pinned revision `06615c1660c892fc199840c18123f8385b3542a8` into `ntv2/` beside the script: config.json, esm_config.py, modeling_esm.py, tokenizer_config.json, special_tokens_map.json, vocab.txt and model.safetensors. Review the official model license and code. Do not use pickle weights.
3. Verify the safetensors SHA-256: `7a00ffaaf8f3ca627741a61e568d7e550b5c79aada70c76c8cb861192fbe7c59`.
4. Prepare a **private** `variants.json` array beside the script. Each row needs gene, marker, chromosome, position (1-based), reference, alternate, raw_genotype, call_status, assembly, strand, source_url, reference_id, window_start, window_end, variant_index, sequence, sequence_sha256. Sequence must be 4,096 unambiguous reference bases, variant_index 2048; verify the reference base and allele presence independently. Do not use this schema to imply that a raw call is confirmed.
5. Run `python run_ntv2.py`. Outputs `partial_results.json` and `ntv2_results.json` are private.
6. The runtime uses float32, TF32 disabled, and model eval mode. Each view has 512 DNA tokens plus the classification token. The variant-containing 6-mer is masked. Score = log P(alternate 6-mer) − log P(reference 6-mer) using the same masked context.
7. The 12 views vary token boundary (six positions) and orientation (two strands). The repeat/zero controls check implementation, not predictive accuracy.

Negative means lower model probability for the alternate; positive means higher. There is no validated threshold. Do not interpret a positive score as benign or a negative score as pathogenic. Coding stop-gains, promoter variants and splice effects require different biological interpretation; this sequence model does not directly predict those effects. Larger models, longer windows and task-specific tools may yield different results.

Primary sources: [official model](https://huggingface.co/InstaDeepAI/nucleotide-transformer-v2-500m-multi-species), [Nucleotide Transformer paper](https://pmc.ncbi.nlm.nih.gov/articles/PMC11810778/).
