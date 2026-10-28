# Minutes & Actions — User Config

This is the ONE config file for the kit. The installer writes the user's
choices here, and every workflow reads its values from here. Do not create a
second config file anywhere.

Keys (each fully spelled out, one per line, `key: value`):

- `meetings_dir:` — the folder where SAVED MINUTES and FOLLOW-UP DRAFTS are
  written, so the user opens them in Finder/Explorer. This is a user-facing
  OUTPUT location, chosen during install. Default: `~/Documents/meetings/`.
  Everything the kit READS (the ledger, the voice file, branding) lives inside
  this installed skill folder, not here.
- `quiet_gate_meetings:` — the names of recurring meetings where the
  trackability gate should count silently instead of stopping the user, comma
  separated. A daily tailgate huddle or a shift handover is a work assignment
  and will never contain a decision, so the gate would otherwise fire every
  morning forever. Written only when the USER accepts the offer the gate makes
  on its first trip; never set on the user's behalf. Empty by default. See step
  4 of `workflows/take-minutes.md`.

## The config

```
meetings_dir: ~/Documents/meetings/
quiet_gate_meetings:
```

<!--
The installer sets meetings_dir to the folder the user picked during install.
If the user kept the default, it stays ~/Documents/meetings/.
take-minutes.md and draft-followups.md read meetings_dir from this file and
save their output there. If this file is missing (bare chat, nothing
installed), the workflows fall back to the default and/or print output in the
conversation.
-->
