# The Aging Report — what is overdue, who is carrying it, what keeps coming back

This is the judgment layer of the kit. Everything else writes things down; this reads them back and tells the user something they did not already know.

Run it in two situations:

1. **Automatically**, as the last step of `update-ledger.md`, every single meeting.
2. **On demand**, with no meeting at all, when the user asks any of these — this is the Monday-morning use and it needs no transcript:
   - "what's overdue" / "what is overdue"
   - "who owes me what" / "who owes what"
   - "what's still open" / "where do we stand"
   - "what did we decide about {{topic}}"
   - "aging report" / "run the aging report"
   - "what keeps slipping" / "what keeps coming up"

If the user asks one of these and no ledger exists yet, say so plainly in one line: "There's no action-items ledger yet — it fills up the first time I take minutes from one of your meetings." Do not invent a report.

## The sorting is mechanical — run the script, do not eyeball it

The categories below are decided by arithmetic, not by judgment. When the harness can execute files, run the kit-owned plain-Node engine from the installed `minutes/` folder:

```text
node scripts/aging-report.mjs ledger/action-items.md --date YYYY-MM-DD
```

Node 22.6.0 or newer is the declared T1/T2 runtime; this `.mjs` file needs no package install, build, or Bun. The script owns date parsing, day counts, bucket order, sorting, owner totals, oldest-item selection, and the 3+ repeat set. The AI reads its JSON result and writes the plain-language read-back below. If the script exits `1`, STOP: show the unreadable rows it reported and ask the one question needed to repair them; never guess past malformed data. Exit `3` means the harness could not read the file.

In T3 chat-only mode, no script can enforce the result. Apply the same rules by hand in the same order and label the report **degraded — arithmetic self-checked, not script-verified**.

**Today's date** is the date of the run. Ask the user for it if you cannot determine it — do not guess a date, because every number below comes from it.

Work only from rows whose Status is **Open**. Done and Dropped rows are history; they never appear in the aging report except in the summary count at the end.

For each Open row:

- **Days open** = today's date minus **Date Added**, in whole days.
- **Days overdue** = today's date minus **Due Date**, in whole days, and only when a real Due Date exists (not "Not set").

Then put each row in exactly one bucket, checking in this order:

| Bucket | Rule |
| --- | --- |
| **Overdue** | Has a real Due Date, and that date is before today. |
| **Aging** | No Due Date ("Not set"), and Days open is more than 14. |
| **On Track** | Everything else: due today or later, or undated and 14 days old or less. |

Sort Overdue by Days overdue, largest first. Sort Aging by Days open, largest first.

## Then compute the two named calls

- **Who is carrying the most late work.** Count **Overdue plus Aging** rows per Owner — both buckets, not Overdue alone. Name the person with the highest count, with the number and the split ("4 late items: 1 overdue, 3 aging"). If there is a tie, name all of them. If nothing is in either bucket, say that plainly — "nothing is late" is a real and welcome answer.

  **Counting Overdue alone is a bug, and it produced a wrong headline in testing.** An item with no due date can never be Overdue no matter how old it gets, so a ledger whose worst problem is a 91-day-old undated commitment will report the owner of one 17-day-old dated item as "carrying the most." That is the single line the business owner reads, and it pointed at the wrong person while the real problem sat two lines above it. Count both buckets.

- **The oldest thing in the ledger, by name.** After the carrying line, name the single Open row with the largest **Days open**, whoever owns it: "The oldest open commitment is {{owner}}'s {{action}} — {{days}} days, since {{Date Added}}." This is one line and it is the one that catches the quiet, undated, never-quite-urgent item — including when it belongs to the owner themselves. If the oldest item is also in the Keeps-coming-back list, say that too; something both old and re-promised is the most stuck thing in the business.
- **The repeat flag: anything raised three or more times without closing.** Every Open row whose **Times Raised** is 3 or more gets called out BY NAME, with the owner, the commitment, the number of meetings, and the date it was first added. **Where the count was carried in from what someone said rather than from meetings this kit witnessed** (see "Commitments older than the ledger" in `update-ledger.md`, which marks those rows in the Action cell), say so in the same sentence — "three times per Tasha, before this ledger started" — because a number the kit was told is a different quality of fact than a number the kit counted, and blurring the two is how a report stops being trustworthy. This is the single most valuable line the kit produces. It is not a scolding and it is not a performance review — it is a loose end that the meeting rhythm is hiding, and surfacing it is what the user is paying for. If the count is 5 or more, say so first, before the overdue list.

## What to hand back

Write it as plain sentences with short lists, not a wall of table. Keep the whole thing to something a busy owner reads standing up. Use the business name from `branding/brand.md` in the heading and the user's own tone from `voice/your-voice.md`.

```
# Where things stand — {{business name}}
As of {{today's date, written out}}

{{One sentence: how many commitments are open, and the single most important thing in this report.}}

## Keeps coming back
- {{Owner}} has re-committed to "{{action}}" in {{Times Raised}} meetings now, first raised {{Date Added}}. Still open.
(If there are none: "Nothing has been re-promised three times or more. Good.")

## Overdue
- {{Owner}} — {{action}} — was due {{Due Date}}, {{days}} days ago.

## Aging (no due date, open more than two weeks)
- {{Owner}} — {{action}} — open {{days}} days, no date on it.

## On track
{{count}} more items are open and not late yet.

## Carrying the most
{{Owner}} has {{n}} late items ({{n}} overdue, {{n}} aging), more than anyone else. (Or: "Nothing is late.")

## Oldest thing on the list
{{Owner}}'s "{{action}}" — open {{days}} days, since {{Date Added}}.
```

Then offer exactly one next step, in one line: "Want me to draft a short note to {{owner}} about the overdue ones?" — which hands off to `draft-followups.md`. The AI drafts; the user sends.

## Say what the numbers support, and nothing more

- The ledger records what was **committed in meetings**. It does not know what happened outside them. An item that is Overdue in the ledger may well be finished in real life and never mentioned again — so the honest framing is "this is still open in the ledger," not "this person did not do their job."
- The repeat flag is about **the commitment, not the person**. Something re-promised four times is usually blocked, under-specified, or owned by the wrong role — the useful question is "what is in the way of this?" not "why hasn't Vinny done it?" Write it that way. The point of surfacing it is to get the loose end resolved and to take it off the owner's plate, not to build a case against anybody.
- **Never invent a date, an owner, or a count.** Every number in this report traces to a cell in the ledger. If a row is malformed or a date is unreadable, list it under a short "Couldn't read these rows" heading with what you saw, and ask the user to fix it — a report with one honest gap is worth more than a clean-looking one with a guessed number in it.
