# OUTPUT — the kit stops and says the input is not good enough

The trackability gate counted zero owned actions, zero decisions, and zero
loose ends. Total zero, under the threshold of two. **No minutes were written
in this turn.**

---

```
STOP. ASK. There's almost nothing here for me to track - I found 0 things
somebody agreed to do, 0 decisions, and 0 loose ends. I can write it up, but
your ledger won't gain much from it. Want me to go ahead anyway, or is there
something that got decided or handed to somebody that isn't in here?

If your Monday ops always runs like this - a quick round rather than a
working session - tell me and I'll stop asking about it.
```

Then it waited. It did not write minutes in the same message and then
mention the problem afterwards, which would make the warning decorative.

---

## Path A — the user answers the question

> **Sal:** good point. Selden - Marisol re-sends the proposal Wednesday and
> if they don't answer by Friday we drop them. And Vinny stays on Holbrook
> through Thursday, then Coram.

Now there are three owned actions and a real decision (drop Selden Friday
absent a reply). The kit writes normal minutes, and the ledger gains
something worth aging. **This is the outcome the gate exists to produce, and
it cost one sentence.**

## Path B — the user says go ahead

> **Sal:** just write it up, it was a short one.

The kit writes the minutes immediately, no second question, and every gap
lands in the Parking Lot rather than being smoothed over:

```
## Decisions Made
- None.

## Action Items
| Owner | Action | Due Date | Status |
| --- | --- | --- | --- |
| None recorded. |

## Parking Lot
- No decisions recorded in this meeting.
- Nothing in this meeting landed on anybody. Nothing was added to the ledger.
```

The escape hatch is always there, and using it is not punished.

## Path C — the user says "that's every Monday"

> **Sal:** honestly that's what Monday ops IS. Quick round, then we work.

The kit writes one line into `USER-CONFIG.md` -
`quiet_gate_meetings: Monday ops` - and says so:

```
Got it. I'll stop asking about Monday ops. I'll still count what's in it, and
if one of them ever comes back with nothing at all I'll say so once - but no
more questions about it every week.
```

From then on that meeting gets a quiet one-liner under its minutes instead of
a stop. **This is the difference between a refusal and a nag.** A gate that
fires every single morning on a meeting that is a work assignment by design
does not make the kit more rigorous; it makes the user stop pasting by
Wednesday, and a kit nobody pastes into is worth nothing. The condition still
exists, still counts, and still speaks up for the genuinely empty week.

## Why a kit that can say no is worth more than one that can't

Anything that always produces something is a formatter. The moment the output
is guaranteed, its content stops carrying information - a clean-looking set of
minutes means the same thing whether the meeting was sharp or aimless.
Because this kit will stop, a set of minutes that comes back without a stop is
itself a signal: the meeting had something in it worth tracking.
