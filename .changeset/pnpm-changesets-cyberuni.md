---
'semantic-release-bamboo': patch
---

Point `repository`, `homepage` and `bugs` at `cyberuni/semantic-release-bamboo`.

`repository` is read when generating provenance attestations, so it has to be correct at
publish time — not merely correct in the repo.

The emitted output also moves from ES5 to ES2015. That is not a choice: TypeScript 7
removed `target: ES5` outright, and this repo was already pinned to TypeScript 7. The
`dist-es5` path is kept as-is so no consumer's deep import breaks.
