# Action-Items Ledger

This is the running record of every action item from every meeting, in one place. It grows over time — new meetings add rows to the bottom. Nothing is ever deleted; when an item is finished, its Status changes to "Done" and the row stays, so you always have the full history of what was promised and what got done.

**This file is append-only.** New action items go at the bottom. Existing rows may change only when a later meeting supplies new history: Status, Due Date, Owner on a confirmed handoff, Times Raised, Last Raised, and a short trace note in Action. Rows are never removed, renumbered, or reordered.

## What each column means

- **Owner** — the full name of the person responsible for the action.
- **Action** — what they agreed to do, in plain words.
- **Due Date** — when it's due, written out (for example: "Saturday, July 18, 2026"), or "Not set" if no date was given.
- **Status** — one of: **Open** (still to be done), **Done** (finished), **Dropped** (the group decided not to do it).
- **Meeting** — the name of the meeting this action came from.
- **Date Added** — the date this row was added to the ledger, written as YYYY-MM-DD (for example: 2026-08-12). This one column is written as numbers on purpose, because the aging report counts days from it.
- **Times Raised** — how many separate meetings this same commitment has come up in without being finished. A brand-new row starts at **1**. When a later meeting re-promises the same thing, this number goes up by one and the Last Raised date changes; a new row is NOT added. At **3 or more** while the Status is still Open, the aging report calls it out by name.
- **Last Raised** — the date of the most recent meeting where this commitment came up again, written as YYYY-MM-DD. For a brand-new row it is the same as Date Added.

## The ledger

| Owner | Action | Due Date | Status | Meeting | Date Added | Times Raised | Last Raised |
| --- | --- | --- | --- | --- | --- | --- | --- |

<!-- New rows are appended below this line, one per action item, newest at the bottom. -->

## If your ledger was started before the aging columns existed

Older ledgers have six columns and stop at Date Added. Nothing breaks, and nothing gets rewritten. The first time the aging report runs on an older ledger, add the two new column headings to the table, then fill **Times Raised** with `1` and **Last Raised** with that row's Date Added for every existing row. That is the one and only backfill; it does not change any Owner, Action, Due Date, Status, or Meeting value, so the history stays exactly as it was recorded. Tell the user in one line that you did it.
