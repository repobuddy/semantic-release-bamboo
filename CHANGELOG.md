# semantic-release-bamboo

## 0.1.4

### Patch Changes

- a077078: Upgrade `@changesets/cli` to v3 and update `.changeset/config.json` to the v4 config schema.
  
  The release workflow uses `changesets/action@v2.1.0`, which bundles the v3-era changesets
  libraries and does not work against `@changesets/cli` v2. This realigns the CLI with the action.

## 0.1.3

### Patch Changes

- ae087f2: Point `repository`, `homepage` and `bugs` at `cyberuni/semantic-release-bamboo`.

  `repository` is read when generating provenance attestations, so it has to be correct at
  publish time — not merely correct in the repo.

  The emitted output also moves from ES5 to ES2015. That is not a choice: TypeScript 7
  removed `target: ES5` outright, and this repo was already pinned to TypeScript 7. The
  `dist-es5` path is kept as-is so no consumer's deep import breaks.
