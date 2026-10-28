# ledger

The running record the whole kit compounds on. This is the file that makes
meeting five worth more than meeting one.

- `action-items.md` - the action-items ledger, shipped empty as a starter,
  with its eight columns documented in plain language.

It is append-only: new rows go at the bottom, and existing rows change only
when a later meeting supplies new history (Status, Due Date, a confirmed
Owner handoff, `Times Raised`, `Last Raised`, a short trace note). Rows are
never removed, renumbered, or reordered. On upgrade this folder is carried
forward and never overwritten.
