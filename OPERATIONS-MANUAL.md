# Minutes & Actions — Operations Manual

Turn any meeting into clean minutes, a running list of who-owes-what, and
follow-up emails that sound like you — with an AI doing the write-up.

## The one thing to understand

You don't have to change how you run meetings. **Record your meeting however
you already do it** — a phone voice memo is completely fine — get the text of
what was said, and drop it in. That's the whole job.

## How to get the text

You need the words of the meeting as text. A few easy ways:

- **Phone voice memo:** record the meeting on your phone's voice recorder,
  then use its built-in "transcribe" feature (most phones have one now), or
  any transcription app, to turn it into text. Copy that text.
- **Video call:** most call apps (Zoom, Google Meet, Teams) can save a
  transcript or captions. Grab that.
- **You typed notes during the meeting:** those work too — even rough notes.
- **Nothing recorded, just your memory:** dictate or type a quick recap. The
  kit still produces clean minutes from it.

The text can be messy — filler words, people talking over each other, false
starts. That's normal and the AI handles it.

## How to use it

1. **Drop the text in and say "take minutes."** You get minutes back in the
   same fixed format every single time: meeting name, date, who was there,
   a short summary, the decisions made, a table of action items (who owns
   what, by when), discussion notes, and a parking lot for things set aside.
   Same shape every meeting — that consistency is the point.

2. **The action items get added to your ledger.** There's one growing list —
   `action-items.md` — of every action from every meeting. It's append-only:
   new items get added, finished ones get marked "Done" but stay on the list,
   so you always see the full history. When somebody re-promises the same
   thing in a later meeting, it does NOT become a second line — the count on
   the existing line goes up. That count is what powers the next part.

3. **You get the aging report.** After every meeting, and any time you ask,
   you get a short read-back of where things actually stand: what's past its
   due date and by how many days, what's been sitting open for weeks with no
   date on it at all, who's carrying the most overdue work, and — the one
   people notice — **anything that's been re-promised in three or more
   meetings without getting finished.** That last line is the thing you can
   never quite put your finger on in the room. "Vinny has re-committed to the
   Bohemia closeout in four straight meetings" is a sentence the ledger can
   produce and your memory can't.

4. **You get follow-up email drafts in your voice.** The AI writes the
   follow-up emails — a recap to the group, or one note per person with just
   their tasks — in the way *you* write (your greeting, your sign-off, your
   tone). They come to you as **drafts**.

## The Monday-morning question (you don't need a meeting for this)

Open the chat any day and ask:

- **"what's overdue"**
- "who owes me what"
- "what's still open"
- "where do we stand"
- "what keeps slipping"
- "what did we decide about the price increase"

You get the answer straight off your ledger — no transcript, no meeting,
nothing to paste. This is the two-minute habit that makes the whole kit pay
for itself: the write-up is what you put in, and this is what you get back
out.

## When it tells you the meeting was thin

The kit will stop and say so if there is almost nothing in the text for it to
track. It counts three things: tasks somebody agreed to do, decisions the
group reached, and loose ends (anything sitting there waiting, late, or
blocked with nobody's name on it). Under two of those combined, it stops:

> "STOP. ASK. There's almost nothing here for me to track — I found 1 thing
> somebody agreed to do, 0 decisions, and 0 loose ends. I can write it up, but
> your ledger won't gain much from it. Want me to go ahead anyway, or is there
> something that got decided or handed to somebody that isn't in here?"

You can always say "go ahead" and you'll get your minutes, with every gap
listed in the Parking Lot. But the thirty seconds you spend answering it are
usually the most valuable thirty seconds of the whole meeting — that's where
"still waiting on them" turns into "Marisol re-sends Wednesday, we drop them
Friday if there's no answer."

**If you run a meeting that is always like that, tell it so once.** A 6:40am
huddle in the yard or a shift handover is a work assignment, not a debate —
it will never have a "decision" in it, and you do not want to be asked about
that every single morning. The first time it stops on one of those, it will
offer: "If your Morning Huddle always runs like this, tell me and I'll stop
asking about it." Say yes and it remembers that meeting by name, counts
quietly from then on, and just prints one line under your minutes instead.
It still speaks up when a meeting really does come back with nothing at all.

## See it before you try it

The `examples/` folder has three complete runs — a first meeting, the same
business four meetings later, and one where the kit says no. Real-shaped
messy input, and everything that came back. Two minutes of reading, and then
you'll know exactly what your own first run will look like.

## The one rule that never bends

**The AI drafts the follow-up emails. You send them.** The AI will never send
an email for you and will never claim it did. It hands you a draft, you read
it, tweak anything, and send it yourself. Your name is on it, so you press
send. If you ask it to send, it'll instead get the text ready to paste into
your email app — one paste away, but the send is always yours.

## Making it sound like you

The first setup asks how you write — how you greet people, whether you sign
off with "Best" or "Thanks," formal or friendly, short or detailed. That's
saved in your voice file. Want to change it later? Say "update my voice" or
just edit the file. The more you tell it (even pasting one real email you've
sent), the more the drafts sound like you wrote them.

## Where things live

- **Coding-agent installs** (Claude Code / Codex): real files on your machine.
  **Your saved minutes and follow-up drafts go in `~/Documents/meetings/`** (or
  wherever you chose during setup) — your own folder, safe to keep forever. The
  growing **ledger** and your **voice** and **branding** files live inside the
  skill folder so the kit can read them every time; that folder is the one
  removed if you ever uninstall, so see the Uninstall note below before you
  delete it.
- **App installs** (Claude app): minutes and drafts come back to you in the
  chat; keep the one project/skill so the ledger stays together.
- **Bare chat, nothing installed:** it still works — the AI keeps the ledger
  inside the conversation and re-prints it each meeting.

## Reinstalling / moving platforms

Hand `installer.md` to the AI on the new platform and say "install minutes
and actions." The installer adapts the package to whatever that platform
needs — you never repackage anything yourself.

## Uninstall

Your **saved minutes and drafts** already live in your meetings folder
(`~/Documents/meetings/` or wherever you chose), so they always stay put — an
uninstall never touches them. Your **ledger** (and your voice and branding
files) live inside the skill folder, so **move them out first** if you want to
keep them:

- **Coding agents (Claude Code / Codex):** first copy the whole `ledger/` folder
  (and, if you want them, `voice/` and `branding/`) out of
  `~/.claude/skills/minutes/` (or `~/.codex/skills/minutes/`) into your meetings
  folder. Then delete the `minutes` folder from the skills directory. If you
  don't move the ledger out first, deleting the folder wipes your action-item
  history — so move it, then delete.
- **Apps:** remove the skill in Settings → Skills (or delete the Project). Save
  the ledger text out of the chat first if you kept it there.

Once you've moved the ledger out, everything that's yours — your saved minutes
in your meetings folder and your ledger wherever you moved it — stays put.

## Credits

Forged in Rico's lab at rTech Digital Consulting.
