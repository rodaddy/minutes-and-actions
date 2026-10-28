# How Minutes and Actions was built

Minutes and Actions was developed inside the author's private consulting
repository and published here as a single snapshot, so this repo's git log is
short. The history below comes from the kit's CHANGELOG (1.0 to 1.1.4), the
commits that touched the kit in the private repository (2026-07-30 to
2026-08-24), and two internal review reports from August 2026: a kit quality
review on 2026-08-11 and a multi-round buyer dry-run report on 2026-08-12.
Every buyer in those reports was simulated by an AI agent; none was a real
customer.

## The problem and the first version

Small teams hold meetings, agree on things, and lose track of who promised
what. Notes, if anyone takes them, are written differently every time and are
never read again. Version 1.0 (2026-07-15) was an AI agent skill that turns a
meeting transcript or rough notes into minutes in one fixed layout, adds every
action to a running ledger, and drafts follow-up messages for each owner.

## Timeline

| Date | Version | What changed |
| --- | --- | --- |
| 2026-07-15 | 1.0 | Transcript to minutes, ledger and follow-up drafts. |
| 2026-07-15 | 1.1 | Version-aware upgrade path, fixes from a GPT model review, transcript text treated as data never as instructions, `START-HERE.md`. |
| 2026-08-11 | | Kit quality review: verdict "rework". The ledger was a table nobody judged. |
| 2026-08-12 | 1.1.1 | The aging report, questions answered with no meeting, a refusal for meetings with nothing to track, three worked examples. |
| 2026-08-12 | 1.1.2 | Three rounds of simulated buyers, each round fixing what the last found. |
| 2026-08-13 | 1.1.3 | `aging-report.mjs`, a plain-Node engine that owns dates, day counts, sorting, owner totals and the repeat flag, plus kit-owned tests. |
| 2026-08-17 | 1.1.4 | Fixes from a cross-family model review of that engine. |

## Key design decisions

- **The ledger has to judge.** The 2026-08-11 review found the ledger, the
  part the kit called its main value, was an append-only table: there was no
  mention of overdue, aging or escalation anywhere in the package. 1.1.1 added
  the aging report. It splits open items into overdue, aging (no due date and
  open more than 14 days) and on track, names who is carrying the most, and
  flags any commitment raised three or more times, by name.
- **Ask without a meeting.** Before 1.1.1 the kit only ran when a transcript
  arrived. Now "what's overdue" or "what did we decide about X" works with
  nothing pasted.
- **A script does the arithmetic (1.1.3).** The CHANGELOG states the problem
  directly: the kit called its aging report deterministic, but the same ledger
  could get a different answer depending on the AI doing the arithmetic.
  `aging-report.mjs` now owns date parsing, day counts, bucket order, owner
  totals and the repeat set. It needs no install step: the buyer's AI runs it
  in its own code sandbox. Where no sandbox exists, the report is labelled
  "degraded, arithmetic self-checked, not script-verified".
- **Missing facts are flagged, not invented.** A meeting date nobody stated is
  asked for, relative dates such as "Thursday" are resolved with the arithmetic
  shown, and an action nobody owns becomes an "Unassigned" row that ages like
  any other.

## How AI models and agents were used

- The kit is itself an agent skill, and it was built and maintained by AI
  coding agents under the author's direction.
- **Quality review (2026-08-11).** Eight kits were each dry-run by an agent
  against a realistic small-business scenario and scored on a ten-point
  rubric. For this kit the agent ran a contractor's Monday operations meeting,
  a messy transcript with five speakers and no date, through the full
  pipeline.
- **Buyer dry-runs (2026-08-12).** One agent lane ran the kit as three
  successive simulated buyers (a creative agency's client call, an insurance
  agency's fifth meeting with a hostile auto-transcript, and an electrical
  contractor's early-morning huddle), fixed what each round found in the
  kit's own files, and then sent a harder buyer at the fixed version.
- **Cross-family review (2026-08-17).** A Claude model and a GPT model
  reviewed the 1.1.3 engine. Each of the four regression tests added in 1.1.4
  was confirmed to fail against the old engine before it was trusted.

## How it is tested

- `node --test tests/*.test.mjs`: 7 tests, passing on 2026-10-27. They cover
  classification and sorting, the repeat flag, refusal of malformed rows,
  unrecognised status values, a literal `|` in a cell, a blank line inside the
  table, and importing the engine with no command-line arguments.
- `scripts/verify-kit.mjs` checks the package structure and that the version
  agrees across files.
- `examples/` holds three complete worked runs: a first meeting with an
  honestly empty aging report, the same business four meetings later where the
  repeat flag fires, and the refusal shown down both branches.

## What did not work, and what changed

- **The report named the wrong person.** "Carrying the most" counted only
  overdue rows, and an item with no due date can never be overdue, so a
  91-day undated item was invisible while someone with one 17-day item was
  named. It now counts overdue plus aging, and adds an "oldest thing on the
  list" line.
- **The refusal fired every morning.** The first refusal tripped on "fewer
  than two owned actions or no decisions". A daily site huddle has no decisions
  by design, so it would trip every day, and it told the user their meeting was
  not a real meeting. It was rebuilt on three counts (owned actions, decisions
  and loose ends), with a rule never to call someone's meeting not a meeting.
- **Handoffs reset the repeat count.** A commitment passed from one person to
  another looked new, which would reset the count on exactly the item that had
  earned the flag. A handoff now keeps the one row.
- **Commitments could disappear without a word.** The 1.1.4 review found
  that a status typed as `open` instead of `Open` dropped the item, a `|` in
  the text stopped the whole report, a blank line cut off every row below it,
  and the engine crashed when imported in a sandbox. Each now reports the
  problem and keeps reading.

## Current state

Stable at 1.1.4, published for review under a non-commercial licence. The
August report notes that the installer has never been run cold at any version:
the dry runs tested the workflows, not the install.
