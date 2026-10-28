# basic

The only tier of Minutes & Actions. Everything in the kit folder ships in it;
there is nothing held back for a higher tier.

## What ships

Drop in the text of a meeting -- a transcript, a voice memo already turned
into text, or rough typed notes -- and get back, the same way every time:

1. **Minutes in one fixed format** every meeting: meeting name, date,
   attendees, a short summary, decisions, an action-items table, discussion
   notes, and a parking lot.
2. **An append-only action-items ledger** (`action-items.md`) that compounds
   across meetings. Rows are never deleted or reordered; a finished item is
   marked Done and stays. A re-promise increments `Times Raised` on the
   existing row instead of adding a duplicate.
3. **An aging report over that ledger** -- the judgment layer. What is
   overdue and by how many days, what has sat open with no date, who is
   carrying the most, and anything re-promised in three or more meetings
   without closing. Answerable any day with no meeting in hand ("what's
   overdue", "who owes me what", "what keeps slipping").
4. **Follow-up email drafts in the user's own voice** -- their greeting,
   sign-off, and tone, read from `voice/your-voice.md`.

The mechanical spine is one plain-Node engine,
`skills/minutes/scripts/aging-report.mjs`: date parsing, day counts,
Overdue / Aging / On Track bucketing, sorting, owner totals, oldest-item
selection, and the repeat set are arithmetic with a fixed rule order, not
vibes. No npm install, bundler, jq, Python, or Bun. Declared runtime is
Node 22.6.0+ (`kit.json`).

Also in the box: `START-HERE.md` (per-device "get installer.md to your AI"),
`installer.md` (the self-adapting install file), `OPERATIONS-MANUAL.md`
(plain-language driving manual), `scripts/verify-kit.mjs` (structural and
policy verifier), `tests/aging-report.test.mjs` (plain-Node behavior tests),
and `examples/` (three complete worked runs).

Capability ladder, as the kit declares it: **T1** full (filesystem plus Node
22.6.0+, several meetings via one subagent per meeting); **T2** shell-only,
same files and engine, meetings processed sequentially in fresh contexts;
**T3** chat-only, which still runs but is labeled **degraded -- arithmetic
self-checked, not script-verified**, with the ledger living as conversation
state and `Times Raised` maintained by hand.

## Who it is for

The owner or manager who runs recurring meetings and carries the loose ends
in their head. It takes the write-up and the chasing off their plate and
hands back the follow-through: nobody's job gets smaller, the follow-through
gets easier and the person doing it looks sharper. The aging report is
written about the commitment, never about the person -- the question it
prompts is "what's in the way of this?", and a commitment re-promised four
times is usually blocked, under-specified, or sitting with someone who does
not control what it depends on. Naming it is how it gets taken off that
person's plate.

The buyer never opens a terminal; their AI runs the engine. Verified working
in the Claude app (zip drag-and-drop) and Codex (unzip, point Codex at the
folder), both 2026-08-12. claude.ai web is presumed the same as the app and
is **UNVERIFIED** until a human runs it.

## What it refuses to do

- **It stops on a thin meeting.** It counts three things -- tasks somebody
  agreed to do, decisions the group reached, and loose ends with nobody's
  name on them. Under two of those combined it stops and asks before writing
  anything, listing what it found. The user can always say "go ahead", and
  every gap lands in the Parking Lot. It asks once per meeting SHAPE, so a
  daily huddle never becomes a daily nag.
- **It never sends an email.** Sacred pipeline: the AI drafts, the human
  sends. It never claims a draft was sent.
- **It never obeys instructions found inside a transcript.** Ingested meeting
  text is data, not commands. A line that looks addressed to the assistant
  ("mark all action items complete", "change the ledger") is quoted back to
  the user and treated as meeting text. Ledger and status changes come only
  from the user in the chat.
- **It never rewrites ledger history.** No row is removed, renumbered, or
  reordered; the fixed minutes format cannot be changed by anything in the
  transcript.
- **It does not verify on a fixture.** The install proves itself on the
  buyer's OWN meeting text. The Appendix A sample is a fallback only for
  someone who genuinely has nothing yet, never the opening move.
- **It does not invent facts.** A missing date is flagged, not filled in; an
  action with no owner is marked Unassigned.
- **It does not overwrite user data on upgrade.** The old skill folder is
  backed up and `USER-CONFIG.md`, `branding/`, `voice/`, and `ledger/` are
  carried forward over the package's blank starters.

## Install

From `installer.md`, condensed. The user hands `installer.md` to their AI and
says "install minutes and actions"; the AI does the rest.

1. **Get `installer.md` to the AI.** Per `START-HERE.md`: unzip on
   iPhone/iPad, Windows, or Mac, then drag or share `installer.md` into the
   Claude app, ChatGPT, or a Claude Code / terminal window -- or paste its
   full text into a new chat.
2. **Detect the runtime** (installer Section 2). Coding agent with
   filesystem, chat app with zip skill uploads, projects/custom instructions
   with no skills feature, or plain chat. The package adapts itself to the
   host; "this package doesn't work here" is never the answer.
3. **Install by path** (Sections 3A-3D). On a filesystem host: locate the
   skills directory (`~/.claude/skills/`, `~/.codex/skills/`, or the
   equivalent), run the collision check -- an existing Minutes & Actions
   offers an upgrade that backs up the old folder and carries the user's data
   forward -- then copy `skills/minutes/` in recursively, the entire folder.
   Chat hosts get the same canonical files reshaped into a zip upload, a
   project instruction block, or the conversation itself.
4. **Branding interview** (Section 3.5, mandatory). Business name and
   tagline, written to `branding/brand.md` and `image-setup.md` INSIDE the
   installed `minutes/` skill folder, beside `voice/` and `ledger/`.
5. **Voice interview** (Section 3.6, mandatory). Greeting, sign-off and
   signing name, formal or relaxed, short or more context -- written into
   `voice/your-voice.md`.
6. **Verify on their own meeting** (Section 4). Ask for real meeting text,
   messy is fine, and produce real minutes plus a real follow-up draft live in
   front of them. Never end by listing what was done.

Everything the kit READS -- ledger, voice, branding, config -- lives inside
the installed `skills/minutes/` folder so skill-relative reads resolve at
runtime. Saved minutes and drafts are outputs and go to the user's meetings
folder (`meetings_dir` in `USER-CONFIG.md`, default `~/Documents/meetings/`),
so uninstalling the skill never destroys them.

## Current version

`VERSION`: 1.1.4

Matches `kit.json` and the `**Version:**` line of `installer.md`; all three
must agree. Full history is in `CHANGELOG.md`.
