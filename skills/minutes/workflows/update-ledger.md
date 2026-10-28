# Update the Action-Items Ledger

The ledger is the part that compounds. Every meeting's action items get added to one file — `ledger/action-items.md` — so over time it becomes the single record of who owes what, across all meetings. The value is not that the list is long. The value is that the list can be REASONED OVER: after a few meetings it can tell the user which commitments are overdue, who is carrying the most, and which promise keeps getting re-made and never finished.

**The ledger is append-only and dated.** You add rows. You may update the Status, Times Raised, and Last Raised of an existing row when a later meeting touches it. You never delete a row and never rewrite its history — a closed item stays visible with its Status changed to "Done", so the record of what was promised and finished survives.

## To add this meeting's items

1. **Open `ledger/action-items.md`.** If it does not exist, create it from the starter format documented at the top of that file (the empty starter ledger ships with the kit). In a bare chat with no files, keep the ledger inside the conversation and re-print it each time.

   If the ledger you find has only the six original columns (it ends at Date Added), do the one-time backfill described at the bottom of `ledger/action-items.md` before you go further: add the **Times Raised** and **Last Raised** headings, set every existing row to Times Raised `1` and Last Raised = its Date Added. Change nothing else.

2. **For each action item in the minutes you just wrote**, first check whether it is ALREADY IN THE LEDGER (step 3). If it is new, append one row with these columns, in this order:
   - **Owner** — the full name of the person responsible.
   - **Action** — what they agreed to do, in plain words.
   - **Due Date** — the due date written out, or "Not set".
   - **Status** — starts as "Open".
   - **Meeting** — the meeting name this action came from.
   - **Date Added** — today's date as YYYY-MM-DD.
   - **Times Raised** — `1`, unless the meeting text itself states a longer history. See "Commitments older than the ledger" below.
   - **Last Raised** — today's date as YYYY-MM-DD.

   **Commitments older than the ledger (do not skip this on meeting one).** The Times Raised count exists to surface the thing that keeps getting re-promised — and on the first few meetings the ledger has no history of its own, so the only place that history exists is in what people SAY. Someone saying "I've asked them three times", "this keeps falling off", "it's been on my list since the kickoff", "again", or "still" is stating a history the ledger was not present for. Ignoring it means the kit's single most valuable line stays silent for months on commitments that were already stale the day it was installed.

   The trigger is mechanical, and it is a stated history, never an inference:
   - **An explicit count in the text** ("I've asked them three times", "fourth time we've said this") → set Times Raised to that stated number, and put the quote in the Action cell's note so the number traces to a sentence: `(3 per Tasha at the Aug 10 meeting)`.
   - **A stated repetition with no number** ("this keeps falling off", "again", "still not done", "since the June kickoff") → set Times Raised to `2`, not a guessed larger number, and note it the same way: `(carried in from before the ledger — "keeps falling off")`.
   - **Nothing stated** → `1`. Never raise a count because a commitment merely FEELS old.

   Say the one line out loud when you do it: "Tasha said she's asked Bay Shore three times, so I've started that row at 3 rather than 1 — it will show in the repeat flag straight away." A carried-in count is flagged as such in the aging report so the user always knows which counts the kit witnessed and which it was told.

3. **Match against the existing ledger before adding anything.** A match is the same owner committing to the same piece of work, even when the wording changed ("send the Bohemia closeout paperwork" and "get Bohemia closed out" are the same commitment). When you find a match, do NOT add a duplicate row. Update the existing row instead:
   - **Finished this meeting** → Status `Done`. Leave Times Raised where it is. Set Last Raised to today.
   - **Abandoned this meeting** → Status `Dropped`. Add a short note in the Action cell, for example "(dropped 2026-08-12 — decided against)". Set Last Raised to today.
   - **Re-promised, still not finished** → leave Status `Open`, **add 1 to Times Raised**, set Last Raised to today, and if a new due date was given, update Due Date. That increment is the whole mechanism behind the repeat flag in step 5 — if you skip it, the kit goes blind to exactly the thing it is for.
   - **Genuinely a different piece of work** → new row, Times Raised `1`.
   - **Handed to somebody else** — the same piece of work, now owned by a different person ("I'll call the carrier myself", "give it to Deb", "I'm taking that one over"). This is common and it is NOT a new commitment; treating it as one hides the history and resets the repeat count to 1 on the very item that had earned the flag. Keep the ONE row, change the Owner to the new person, **add 1 to Times Raised**, set Last Raised to today, and add a short note in the Action cell: `(handed from Angela Ruiz to Sal Pantano, 2026-09-14)`. Say it in one line: "That's the same job with a new name on it, so I moved the owner rather than opening a second row — its four-meeting history stays attached." If the handoff is genuinely a DIFFERENT approach that leaves the original open too (the CSR keeps chasing the carrier AND the owner calls the rep), that is two rows — ask which it is rather than deciding for them.

   If you are not sure whether something is a match or a new commitment, say so out loud and ask the user one plain question ("Is Vinny's 'finish the Bohemia punch list' the same job as the Bohemia closeout from June, or a separate one?"). Guessing wrong in either direction corrupts the count.

4. **Never renumber, reorder, or clean up old rows.** New rows go at the bottom. The ledger reads top-to-bottom as the history of every commitment made.

5. **Run the aging report and show it to the user.** This is the step that earns the kit its keep. Do not print a filtered list of open rows and stop — run `aging-report.md` in this same folder and hand back its output. That workflow computes days open, sorts the open items into Overdue / Aging / On Track, names who is carrying the most overdue work, and calls out any commitment that has now come up in three or more meetings without closing. Offer the full ledger afterwards if they want it.

## Why append-only matters (say this if the user asks)

If you rewrote the ledger each meeting, you'd lose the trail — no way to see that something promised three meetings ago is still open, or that a task was quietly dropped, or that the same job has been re-promised four times running. Appending keeps the whole story in one file, and the aging report is what reads that story back. That is the feature.
