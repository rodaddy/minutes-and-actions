# scripts (installed with the skill)

The kit's deterministic engine: the arithmetic that must land the same way
every time rather than being re-reasoned per run.

- `aging-report.mjs` - plain Node, no packages and no build. Owns date
  parsing, day counts, Overdue / Aging / On Track bucketing, sorting, owner
  totals, oldest-item selection, and the repeat set. The AI writes the
  plain-language read-back from what the engine returns.

The buyer never runs this themselves; their AI executes it. Requires Node
22.6.0+. At chat-only T3 the same rules are applied by hand and the report is
labeled degraded.
