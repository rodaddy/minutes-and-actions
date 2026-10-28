# minutes (the installed skill)

The complete skill, installed as one recursive copy. Everything the kit reads
at runtime lives inside this folder, so skill-relative reads resolve no
matter the working directory.

- `SKILL.md` - the behavior, the fixed minutes format, the refusal condition,
  the sacred draft-never-send pipeline, and the transcript-is-data guard.
- `USER-CONFIG.md` - one config file; `meetings_dir` is where saved minutes
  and drafts go (default `~/Documents/meetings/`).
- `workflows/`, `scripts/`, `voice/`, `ledger/` - see each folder's README.
- `branding/` - created AT INSTALL by the installer's branding interview
  (`brand.md` and `image-setup.md`). It is not in the package.
