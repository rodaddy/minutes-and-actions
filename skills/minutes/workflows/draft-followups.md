# Draft the Follow-Up Emails

After a meeting, people need to be told what they agreed to do. This workflow drafts those emails in the user's own voice, so they read like the user wrote them — and then the user sends them.

**Sacred pipeline: the AI drafts, the human sends.** You produce drafts. You never send an email and never say one was sent. Put the drafts in front of the user, remind them in one line that sending is theirs to do, and stop. This is not optional — an email going out under someone's name must be sent by that person.

## Steps

1. **Read `voice/your-voice.md` first.** This is what makes the drafts sound like the user and not like a form letter. Match their greeting, their sign-off, their tone (formal or friendly), and how long they tend to write. Read `branding/brand.md` too, for the business name and tagline used in the signature. In a bare chat, ask for the sign-off and tone if you don't have them.

2. **Decide who gets an email.** Three shapes — ask the user which they want if it isn't obvious:
   - **One recap email to everyone** — the whole group gets the summary, the decisions, and the full action list.
   - **One email per owner** — each person gets a short note with just their own action items and due dates. Better for accountability; more emails.
   - **Outbound notes to people who were NOT in the room** — see step 2b. These are usually the ones the user cares about most.

2b. **Catch the outbound items — the ones aimed at someone outside the meeting.** Plenty of action items are not "tell Marco what he owes"; they are the user chasing a customer, a client, a vendor, or a subcontractor. Those are the notes with money attached, and the person receiving them was never an attendee, so a plain per-owner sweep misses them completely.

   The check is mechanical: **go down the action items and mark every one whose Action text names a person or company that is NOT in the Attendees line.** ("Email Rina at Sandbar for the photo library" — Rina is not an attendee. "Call Gus about the shoot date" — Gus is not an attendee.) Those are the outbound ones. Say what you found and offer them:

   > "Three of these are aimed at people who weren't in the room — Rina at Sandbar, Gus at Bay Shore, and the Northport office manager. Want drafts for those too? Those are the ones that move something."

   Draft an outbound note in the same voice, with two differences that matter:
   - **Write it to the outside reader**, not about them. No internal shorthand, no other clients' names, no candid internal framing ("Marco never started it") — an outbound note repeats only what that reader needs and what was actually promised TO them.
   - **Never state a commitment on the client's behalf** the meeting did not make. If the action is "ask Rina for the photo library", the draft asks for the photo library; it does not promise a delivery date the group never agreed on.

   If an outbound item is a CALL rather than an email ("call her today, not email"), do not quietly convert it into an email — that changes what the user decided to do. Say so and offer the useful thing instead: "This one you said you'd call about. Want three bullets to have in front of you for the call?"

   Same sacred pipeline: these are drafts, the user sends them.

3. **Draft each email in the user's voice**, keeping it to this simple shape:
   - **Greeting** — the user's usual one (from the voice file).
   - **One line of context** — "Thanks for the time today" or similar, in their tone.
   - **The point** — the decisions that affect this reader, and their action items with due dates, in plain words. For a per-owner email, only their items.
   - **A close** — offer to answer questions if that fits their voice.
   - **Sign-off** — exactly the user's sign-off and name from the voice file, plus the business name/tagline from brand.md if that's their habit.

4. **Keep it honest and plain.** No invented enthusiasm, no corporate filler the user wouldn't use. If the voice file says short and friendly, write short and friendly.

5. **Hand the drafts over as drafts.** Print them clearly labeled ("Draft — for you to review and send"). If the kit is installed with a place to save files, you may also save them under the user's meetings folder: read `meetings_dir` from `USER-CONFIG.md` (in this skill folder; default `~/Documents/meetings/`) and save to `{{meetings_dir}}/{{date}}-followups/`. Never save drafts inside the skill folder. Then say, in one line: **"These are drafts. Give them a read, tweak anything, and send them yourself — I don't send email."**

6. **If the user asks you to send it:** you cannot and do not. Offer instead to copy the final text to their clipboard or format it for their email app so sending is one paste away. The send is always theirs.
