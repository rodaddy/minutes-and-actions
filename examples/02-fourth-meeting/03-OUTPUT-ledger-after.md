# OUTPUT — the ledger, after run four

Four meetings in. Read the **Times Raised** column, because that is where the
kit stops being a typing service.

```
## The ledger

| Owner | Action | Due Date | Status | Meeting | Date Added | Times Raised | Last Raised |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Vinny Castellano | Chase the town on the Bohemia dry well inspection | Not set | Done | Monday Ops | 2026-04-07 | 2 | 2026-05-11 |
| Vinny Castellano | Finish the Bohemia punch list and closeout, get the paperwork to Mrs. Kaplan | Friday, August 14, 2026 | Open | Monday Ops | 2026-04-07 | 4 | 2026-08-10 |
| Marisol Reyes | Follow up with the Nesconset customer on the $12,600 estimate | Thursday, April 9, 2026 | Done | Monday Ops | 2026-04-07 | 2 | 2026-05-11 |
| Marisol Reyes | Call the Nesconset customer if there is no reply (dropped 2026-08-10 - customer never responded, marked dead) | Saturday, April 11, 2026 | Dropped | Monday Ops | 2026-04-07 | 3 | 2026-08-10 |
| Unassigned | Take the F-350 in for brake work | Not set | Open | Monday Ops | 2026-04-07 | 3 | 2026-07-13 |
| Vinny Castellano | Close out the Riverhead account and move all stone orders to Anderson | Not set | Done | Monday Ops | 2026-05-11 | 2 | 2026-08-10 |
| Marisol Reyes | Send the Coram retaining-wall quote | Friday, June 5, 2026 | Done | Monday Ops | 2026-06-02 | 1 | 2026-06-02 |
| Marisol Reyes | Chase the Selden customer for a site visit date | Not set | Open | Monday Ops | 2026-06-02 | 2 | 2026-07-13 |
| Vinny Castellano | Order the pavers for the Holbrook job | Monday, July 20, 2026 | Done | Monday Ops | 2026-07-13 | 1 | 2026-07-13 |
| Vinny Castellano | Send Mrs. Kaplan the revised grading photos | Friday, July 24, 2026 | Open | Monday Ops | 2026-07-13 | 1 | 2026-07-13 |
| Sal Vitale | Renew the commercial vehicle insurance before it lapses | Friday, July 31, 2026 | Open | Monday Ops | 2026-07-13 | 1 | 2026-07-13 |
| Marisol Reyes | Write the Selden proposal and send it out | Tuesday, August 11, 2026 | Open | Monday Ops | 2026-08-10 | 1 | 2026-08-10 |
| Marisol Reyes | Book the F-350 brake work | Thursday, August 13, 2026 | Open | Monday Ops | 2026-08-10 | 1 | 2026-08-10 |
```

## What the kit did to this ledger this morning, and what it refused to do

- **The Bohemia paperwork went from 3 to 4.** Vinny re-committed to it, so the
  existing row's Times Raised went up and its Due Date moved to August 14. It
  did **not** get a fifth row. That is why the count means anything.
- **The dead Nesconset callback became `Dropped`,** with the reason written
  into the Action cell and the row left in place. History is not deleted; it
  is annotated.
- **The unowned F-350 row stayed `Open` and stayed `Unassigned`.** This is the
  subtle one. Marisol's new commitment is "book the brake work," which is a
  different job from "take the truck in," so the kit opened a NEW row rather
  than quietly closing the old one. It said so out loud:

  > "Marisol is booking the appointment, which isn't the same as the truck
  > actually going in — should I close the April item, or keep it open until
  > the work is done?"

- **The Riverhead-to-Anderson closeout got marked Done** off Marisol's "closed,
  we're all Anderson now."
