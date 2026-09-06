---
'semantic-release-bamboo': major
---

Drop CommonJS: the package is now ESM-only.

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
