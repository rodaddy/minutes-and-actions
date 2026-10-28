# Changelog — Minutes & Actions

All notable changes to this kit. Keep a Changelog format, semantic
versioning. The current version is also in `VERSION` and on the
`**Version:**` line of `installer.md`; those three must always agree.

## [1.1.4] - 2026-08-17

Cross-family review lane (Opus + Terra). Every finding was a way the
deterministic engine could either refuse to load or lose a commitment without
saying so — exactly the failures the 1.1.3 hardening was supposed to end.

### Fixed

- The engine could not be imported. Its main-module guard called
  `pathToFileURL(process.argv[1])` unguarded, so any run where `argv[1]` is
  undefined — which is what a chat-app code sandbox does when it imports or
  evals the module rather than spawning it — died with a Node internals stack
  trace before the exports existed. The buyer's documented path is "your AI
  runs it in its own sandbox," so this was the path most likely to break.
- An unrecognized `Status` silently dropped the commitment. Any value that was
  not exactly `Open` was treated as closed, so a hand-typed `open` or `OPEN`
  vanished from the accountability report with nothing in `unreadable` and a
  clean exit 0. Status is now checked against the three values the ledger
  documents (`Open`, `Done`, `Dropped`); anything else is reported and trips
  the nonzero exit.
- A literal `|` in a cell killed the whole report. Action text is free-form
  English off a transcript, so a pasted pipe is realistic input; the parser
  threw a raw `malformed ledger row` and the run produced no report at all.
  One bad row is now one `unreadable` entry, the other rows still report, and
  the message names the character and the fix.
- A blank or non-table line inside the ledger truncated it silently. The parser
  stopped at the first such line, so that row and **every commitment below it**
  disappeared with no entry and a zero exit. The interruption is now reported
  and the rows after it are still read. Trailing blank lines still end the
  table normally.

### Changed

- The installer's Section 3C preserve-list now carries the T3
  **degraded — arithmetic self-checked, not script-verified** label. 3C and 3D
  ARE the degrading install paths, and the label previously lived only in
  `workflows/aging-report.md` and `README.md` — neither of which reaches a
  Projects/Gem or plain-chat install.
- Corrected the installer's closing pointer, which still said `examples/` holds
  two worked runs while its own header said three and three exist. The 1.1.3
  entry claimed this was already fixed; it had been applied to only one of the
  two lines.
- The 3C acceptance box now records that the v1.1.4 preserve-list extension is
  also un-re-linted, rather than leaving the older note to imply the current
  list was covered.

### Added

- Four regression tests covering each fixed defect, each confirmed to fail
  against the pre-fix engine before being trusted. Kit tests: 7, all passing on
  Node 24 (`node --test tests/aging-report.test.mjs`).

## [1.1.3] - 2026-08-13

Hardening lane. The kit said its aging report was deterministic but shipped no
mechanical implementation or kit-owned test, so the same ledger could still get
a different answer depending on the AI doing the arithmetic.

### Added

- `skills/minutes/scripts/aging-report.mjs`, a dependency-free plain-Node engine
  that owns date parsing, day counts, bucket order, sorting, owner totals, the
  oldest-item call, and the 3+ repeat set. It refuses malformed rows instead of
  guessing past them.
- `tests/aging-report.test.mjs` and `scripts/verify-kit.mjs` as kit-owned plain-
  Node behavior and structural checks.

### Changed

- The installer and capability ladder now declare Node 22.6.0+ for T1/T2, copy
  the engine recursively with the skill, and keep the buyer out of Terminal:
  their AI runs the script in its own sandbox. No npm install, build, or Bun.
- T3 aging reports are explicitly labeled degraded because arithmetic is
  self-checked rather than script-verified.
- Repaired the upgrade sequence: after backing up the old skill, the installer
  now creates a complete new live skill (including scripts) and restores the
  protected config, branding, voice, and ledger from backup before asserting
  them. The previous wording could leave the backup holding the only live data.
- Corrected stale package and changelog prose: the installer now says three
  worked examples, and the README current-version line agrees with `VERSION`,
  `kit.json`, and `installer.md`.
- Corrected impossible weekday/date pairs in the first worked run. The Node
  parser now refuses a written weekday that does not match its calendar date,
  so the error cannot silently feed the overdue arithmetic again.

## [1.1.2] - 2026-08-12

Workout lane. Three rounds of running the kit's own workflows literally, as the
buyer's AI would, on three invented-but-realistic Long Island businesses: a
Huntington marketing agency (meeting one, no date stated), a Massapequa
insurance agency (meeting five, auto-transcript with mangled speaker labels, a
prompt-injection line, and an ownership handoff), and a Farmingdale electrical
contractor (a 6:40am tailgate huddle in the yard). Six defects found by running
it, all fixed here. Nothing in this release changes the package shape or the
install flow.

### Fixed

- **"Carrying the most" named the wrong person.** The rule counted Overdue rows
  only, and an item with no due date can never be Overdue however old it gets.
  On the insurance run the report told the owner that a CSR with one 17-day-old
  item was carrying the most, two lines under his own 91-day-old undated
  agency E and O renewal. `aging-report.md` now counts **Overdue plus Aging**
  per owner and reports the split, and a new one-line **"Oldest thing on the
  list"** call names the single longest-open row whoever owns it — which is what
  catches the quiet, undated, never-quite-urgent item, including the owner's own.
- **The trackability gate fired forever on work-assignment meetings.** The
  condition was "fewer than two owned actions OR no decisions", which a morning
  tailgate huddle trips every single day by design; the electrical contractor
  would have stopped pasting by Wednesday. The gate now counts **owned actions +
  decisions + loose ends** and trips under two TOTAL. It is asked **once per
  meeting shape**, not once per meeting: the first trip offers to go quiet for
  that named meeting, and if the user accepts, the name is written to
  `quiet_gate_meetings:` in `USER-CONFIG.md` and the gate counts silently and
  prints one line instead of stopping. The refusal is not weakened — a genuinely
  empty meeting is still called out plainly.
- **The gate was blind to the most expensive sentence in the room.** A stalled
  job waiting on an inspector has no owner (so it never counted as an action)
  and is not a decision (so it never counted there) — the gate measured the two
  things a job-site meeting was never going to have and ignored the one thing
  that mattered. **Loose ends are now a counted category**, and each one becomes
  an Unassigned ledger row that ages like everything else.
- **Relative dates were resolved by feel, with nothing written down.** Meetings
  are spoken in "today", "Thursday", "end of the month", and every overdue count
  the kit produces is subtracted from those, so a wrong week is a wrong number
  with no signal. `take-minutes.md` step 6 now carries a mechanical resolution
  table, requires the MEETING DATE to be established first (asked for, never
  substituted with today's date), calls out the same-weekday case ("by Monday"
  said on a Monday), sends anything unresolvable to "Not set" plus a Parking Lot
  line, and prints the arithmetic in one line so a wrong week is catchable.
- **The repeat flag stayed silent on commitments older than the ledger.** On
  meeting one an agency owner's staffer said out loud that she had asked a
  client for a shoot date three times; the kit initialized that row at Times
  Raised 1 because the count only ever came from meetings the kit had itself
  seen. `update-ledger.md` now carries in a **stated** history — an explicit
  count in the text sets that number, a stated repetition with no number sets 2,
  nothing stated stays 1 — with the quote noted in the row so the number traces
  to a sentence, and `aging-report.md` says plainly which counts were carried in
  versus witnessed.
- **Auto-transcript speaker labels had no procedure.** "Speaker 1" through
  "Speaker 4" with a mangled surname is the NORMAL Teams/Zoom input this kit is
  sold for, and the only guidance was "do not invent a name". New step 2b:
  take names the text states, use the ledger's Owner column for real people and
  correct spellings, **ask once for the rest in one message showing your
  working**, and where it is still unresolved write "Unidentified speaker" and
  "Unassigned" rather than attaching a real person's name to a commitment on a
  guess. A name that cannot be spelled is asked about, never invented.

### Added

- **Outbound follow-up drafts** (`draft-followups.md` step 2b). The workflow
  offered exactly two shapes, both internal to attendees — so the drafts the
  agency owner most wanted (email the client for the photo library, call the
  dealer about the shoot date) had no shape at all, because the recipient was
  never in the room. The kit now runs a mechanical check for action items naming
  a person or company **not in the Attendees line**, offers those as their own
  drafts written to the outside reader, keeps internal framing and other
  clients' names out of them, never states a commitment on the client's behalf
  that the meeting did not make, and refuses to quietly convert a call into an
  email (offering call bullets instead).
- **Handoffs in the ledger match rules** (`update-ledger.md` step 3). A
  commitment moving from a CSR to the owner is one of the commonest things that
  happens in a small business and the match rule was written entirely around
  "same owner, same work" — so a handoff looked like a new commitment, opened a
  second row, and reset the repeat count to 1 on the very item that had earned
  the flag. A handoff now keeps the ONE row, moves the Owner, increments Times
  Raised, and notes the transfer, with the two-rows case asked about rather than
  decided for the user.

## [1.1.1] - 2026-08-12

Kit-quality tribunal rework (`research/kits/2026-08-11_kit-quality-tribunal.md`,
"## minutes-and-actions"). The tribunal's finding: the minutes engine and the
format discipline were sound, but the ledger — which the kit itself called
"the voodoo" — was an append-only table with no judgment on it, and two greps
confirmed zero occurrences of overdue/aging/stale/escalation anywhere in the
package. This release adds the judgment.

### Added

- **`skills/minutes/workflows/aging-report.md` — the judgment layer.** Splits
  open items into Overdue (past a real due date) / Aging (no due date, open
  more than 14 days) / On Track by fixed rule order, computes days open and
  days overdue from the ledger dates, names the owner carrying the most
  overdue work (ties named in full), and **flags any commitment still Open at
  Times Raised 3 or more, by name, with its owner and first-raised date.**
  Sorting and counting are mechanical and run in the platform's own code
  sandbox where one exists; the AI writes the read-back from the result.
- **A standing query trigger.** The aging report answers "what's overdue",
  "who owes me what", "what's still open", "where do we stand", "what keeps
  slipping", "aging report", and "what did we decide about X" **with no
  meeting and nothing pasted**. Added to the SKILL.md frontmatter triggers,
  the skill body, and the operations manual. Before this the kit only
  activated when a transcript arrived, which made it a write-only archive.
- **A named refusal (KIT-STANDARD refusal requirement).** The trackability
  gate in `take-minutes.md` step 4: fewer than two actions with a named
  owner, or no decisions at all, and the kit STOPS and says the input is not
  good enough before writing anything. Visible escape hatch; on "go ahead"
  every gap lands in the Parking Lot. Documented in SKILL.md, carried through
  §3C condensation as preserve-list priority 4, and named in the README
  acceptance checklist.
- **`examples/` — three complete worked runs** (KIT-STANDARD worked-example
  layer). Day-one run with an honestly-empty aging report; the same business
  four meetings later where the repeat flag fires on a commitment re-promised
  four times, plus the no-meeting "what's overdue" ask; and the refusal, shown
  down both branches.
- **`VERSION` and this `CHANGELOG.md`** as first-class package files.

### Changed

- **Ledger schema, additive: `Times Raised` and `Last Raised`.** A commitment
  re-promised in a later meeting no longer spawns a duplicate row — the
  existing row's count increments and its Last Raised date moves. That count
  is the mechanism the repeat flag rides on. `Date Added` and `Last Raised`
  are written as YYYY-MM-DD because the report counts days from them.
- **`update-ledger.md` step 5 is a judgment, not a filter.** It used to print
  the open rows. It now runs the aging report. Step 3 gained explicit
  matched/re-promised/different-work handling, and an instruction to ASK when
  a match is genuinely ambiguous rather than guessing — a wrong guess in
  either direction corrupts the count.
- **Installer §4 verify runs on the buyer's own meeting text** (tribunal
  line-wide ban on fixture-first verification). Appendix A is demoted to a
  fallback reachable only at step 1c, when the user has nothing of their own,
  and is labelled as such in the appendix itself and in "What This File
  Does". The "offer to demo with the sample transcript" line in §3C was
  changed to ask for their own meeting first.
- Installer package lists, §3A/§3B/§3C/§3D file counts, and the §3C
  preserve-list updated for the fourth workflow, the eight ledger columns,
  the aging report, and the refusal.
- Upgrade path handles the additive ledger columns: an existing six-column
  ledger gains the two headings with Times Raised `1` and Last Raised = its
  own Date Added, and nothing else in any row changes. Still never overwrites
  USER-CONFIG.md, branding/, voice/, or ledger/.
- README and OPERATIONS-MANUAL rewritten around the aging report, the
  Monday-morning standing question, the refusal, and the examples folder.

### Not verified

The v1.1.1 changes are WRITTEN, not clean-room re-run. Four acceptance boxes
are honestly unchecked in the README: refusal fires, verify-on-own-data, the
aging report's determinism, and the six-column ledger upgrade. The real-device
spot check remains unchecked as it has been since 1.0.

## [1.1] - 2026-07-15

- Version-aware upgrade path in `installer.md` (data preserved by
  construction; only SKILL.md and `workflows/` replaced, after backup).
- GPT-5.6 review fixes: §3C names the exact files to add as Project/Gem
  sources and PAUSEs until added, with a paste fallback for file caps; the
  image-lane step verifies native generation actually responds before
  recording it and falls back to SVG/CSS.
- Path overhaul (KIT-STANDARD §4.5): `voice/`, `ledger/`, and `branding/`
  moved inside the installed skill folder; saved minutes and drafts go to
  `meetings_dir` from the single `USER-CONFIG.md`.
- Uninstall truthfulness in OPERATIONS-MANUAL (move the ledger out first).
- Untrusted-input hardening (§4.7): transcript-is-DATA guard in SKILL.md and
  `take-minutes.md`, preserved through §3C condensation as priority 5.
- Voice single-sourced to `voice/your-voice.md`; `brand.md` points at it.
- Ledger trigger qualified to "update the action items ledger" / "update the
  meeting ledger" so multi-kit owners don't misfire.
- `START-HERE.md` added per §4.6.

## [1.0] - 2026-07-15

- Initial clean-room-tested build.
