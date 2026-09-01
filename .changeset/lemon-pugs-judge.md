---
"semantic-release-bamboo": patch
---

Upgrade `@changesets/cli` to v3 and update `.changeset/config.json` to the v4 config schema.

The release workflow uses `changesets/action@v2.1.0`, which bundles the v3-era changesets
libraries and does not work against `@changesets/cli` v2. This realigns the CLI with the action.
