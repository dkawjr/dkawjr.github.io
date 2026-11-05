# DNA Fieldnotes

A buildless, phone-friendly viewer for an encrypted personal genomic report.

## Privacy

Only the HTML/CSS/JavaScript and an AES-256-GCM encrypted report are published. Raw DNA, plaintext findings, names, source-file identifiers and the random 256-bit decryption key are excluded from the public source.

The private URL carries the key in its fragment. The page removes the fragment after unlocking, performs decryption locally, and does not use analytics, external scripts, network APIs, cookies or web storage. A restrictive content-security policy permits only the exact embedded script/style hashes.

Possession of the full private link grants access. This is encrypted bearer-link sharing, not account-based authentication. Browser history, the clipboard and recipients can retain the link. GitHub administrators or future code changes are part of the hosting trust model. Printing creates an unencrypted copy.

## Report scope

The report distinguishes raw array calls, published variant evidence, ClinVar classification strength and unresolved analytic validity. The current ClinVar snapshot is 2026-11-01 (GRCh37; download MD5 713226d78bd406565bcdccbbc53d08a2). Discordant nucleotide calls at duplicate positions are excluded from the database scan. Internal probes are presented as coordinate-matched candidates, with explicit validation limitations.

Current model options were researched, but no foundation-model inference was completed: AlphaGenome/Atlas required access credentials and the NTv3 model download required approved access. The interface does not claim AI-generated health probabilities or clinical validation.

## Features

- Responsive single-page layout, accessible controls and reduced-motion support
- Searchable findings with category filters
- Exact genotype and source details
- Direct ClinVar candidate review with classification and call validity separated
- Printable clinical summary
- Unlock, lock and explicit private-link copying

## Validation

Local automated checks cover authenticated encryption, wrong-key/tamper rejection, plaintext leak detection, CSP hashes, absence of data-network calls, unlock, filtering, search, print-summary generation, link copying and DOM clearing on lock. These are not clinical validation or on-device visual QA.

No public unlock link or decryption key belongs in this repository, its issues, logs or Actions artifacts.
