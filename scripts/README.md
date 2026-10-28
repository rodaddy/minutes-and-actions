# scripts

Kit-owned tooling that is not part of what gets installed on the buyer's
machine. This folder stays in the package; it is not copied into the skill.

- `verify-kit.mjs` - plain-Node structural and policy verifier. Checks the
  package's shape and rules, and imports `parseDate` from the aging engine.

Run with Node 22.6.0+ and no install step: `node scripts/verify-kit.mjs`.
