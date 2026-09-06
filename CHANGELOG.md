# semantic-release-bamboo

## 1.0.0

### Major Changes

- b4ed720: Drop CommonJS: the package is now ESM-only.
  
  `semantic-release` has loaded plugins with dynamic `import()` since v20
  ([`lib/plugins/utils.js`](https://github.com/semantic-release/semantic-release/blob/master/lib/plugins/utils.js)),
  so an ESM-only plugin works on every semantic-release version that is still
  supported. The previous CJS build was in fact already unusable: both runtime
  dependencies (`@semantic-release/error` v4 and `env-ci` v11) are ESM-only, so a
  `require()` of the old `dist-es5/index.js` failed regardless.
  
  **What changed**
  
  - `"type": "module"`, and `main`/`typings` are replaced by an `exports` map with
    no `require` condition.
  - The build output moved from `dist-es5/` to `dist/`, and the compile target
    moved from `es2015` to `es2023` with `module`/`moduleResolution` set to
    `nodenext`.
  - `tsconfig.es5.json` was renamed to `tsconfig.build.json`.
  
  **Migration**
  
  - Consumers on `semantic-release` v20 or later need no change; keep listing
    `semantic-release-bamboo` in `verifyConditions` as before.
  - Consumers on `semantic-release` v19 or earlier must upgrade `semantic-release`.
    v19 resolves plugins with `require()` and cannot load this package.
  - Anyone importing the module directly must use `import`, not `require`, and must
    drop any deep import of `semantic-release-bamboo/dist-es5/...`; only the package
    root and `./package.json` are exported.

### Patch Changes

- 2b610aa: Declare a supported Node range: `^20.19.0 || ^22.13.0 || >=24`.
  
  Every version in that range has unflagged `require(esm)`, so a CommonJS consumer's
  `require()` of this now-ESM-only package resolves rather than throwing `ERR_REQUIRE_ESM`.
  Node 18 (EOL April 2025) and Node 20.0–20.18 are excluded because `require()` hard-fails there.

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
