# tests

Plain-Node behavior tests for the kit's deterministic spine, using the
built-in `node:test` runner. No packages, no build, no Bun.

- `aging-report.test.mjs` - exercises `buildAgingReport`, `parseDate`, and
  `parseLedger` from `skills/minutes/scripts/aging-report.mjs` against ledger
  fixtures, so the aging arithmetic is proven rather than assumed.

Run with Node 22.6.0+: `node --test tests/`.
