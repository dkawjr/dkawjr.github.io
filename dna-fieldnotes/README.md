# DNA Fieldnotes

Phone-friendly, encrypted personal genomic report with source-linked findings, exact ClinVar candidate review and a completed local foundation-model research analysis.

## Privacy

Only viewer code and an AES-256-GCM encrypted report are public. Raw DNA, plaintext results, names and the random 256-bit key are excluded. The private URL carries the key in its fragment; the page removes it after unlocking and decrypts on-device. No analytics, external scripts, network APIs, cookies or web storage are used. The CSP permits only exact embedded script/style hashes.

Anyone with the full private link can decrypt the report. This is bearer-link encryption, not account authentication. Browser history, clipboard and recipients may retain the link. Hosting administrators and future code changes remain part of the trust model. Printing creates an unencrypted copy.

## Clinical scope

Consumer-array calls are unconfirmed. Published variant classification, ClinVar review strength, raw-call validity and model outputs are distinct. The ClinVar reference is 2026-11-01, GRCh37, archive MD5 713226d78bd406565bcdccbbc53d08a2. Internal probes are displayed as coordinate-matched candidates with validation limitations. No comprehensive negative disease screen, calibrated risk score or diagnosis is implied.

## Foundation-model run

Nucleotide Transformer v2, 500M, was run locally. Weights came from the official [InstaDeep model](https://huggingface.co/InstaDeepAI/nucleotide-transformer-v2-500m-multi-species), pinned revision `06615c1660c892fc199840c18123f8385b3542a8`; verified SHA-256 `7a00ffaaf8f3ca627741a61e568d7e550b5c79aada70c76c8cb861192fbe7c59`.

The research method compares alternate/reference masked 6-mer log probabilities in 3,072-base reference-genome windows. Six token offsets and both strands give 12 correlated views per allele. The spread describes method sensitivity, not a confidence interval. This custom contrast has not been clinically calibrated; sequence plausibility is not pathogenicity or a measured molecular effect. Personal neighboring variants and phase are not modeled.

See [analysis/run_ntv2.py](analysis/run_ntv2.py) and [method details](analysis/README.md). Individual scores and identities remain encrypted.

AlphaGenome and NTv3 were investigated but not run because access was unavailable. NTv2 is an accessible alternative, not the newest model. [AlphaGenome access](https://alphagenome.google/api) is an optional next step.

## Verification

Checks passed for reference alleles, alternate-allele presence in the local source, native tokenizer alignment, complete checkpoint loading, weight checksum, finite results, unchanged-allele zero controls and a deterministic repeated score. UI tests cover encryption, wrong-key/tamper rejection, public plaintext leakage, CSP hashes, unlock/lock, search, filters, all model rows, printed summary and private-link copying.

These checks are neither clinical validation nor independent mobile visual QA. Never commit a private unlock link, key, raw genome or plaintext result to this repository.
