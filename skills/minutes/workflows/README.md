# workflows

The four jobs the skill runs, one file each, in the order they normally fire.

- `take-minutes.md` - transcript through the trackability gate, then minutes
  in the one fixed format, saved to `meetings_dir`.
- `update-ledger.md` - append or merge this meeting's actions; a re-promise
  increments `Times Raised` on the existing row instead of duplicating it.
- `aging-report.md` - the judgment layer: overdue, aging, on track, who is
  carrying the most, and the three-or-more repeat flag.
- `draft-followups.md` - follow-up emails in the user's voice. The AI drafts,
  the human sends.
