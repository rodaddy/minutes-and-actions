import assert from "node:assert/strict";
import test from "node:test";

import { buildAgingReport, parseDate, parseLedger } from "../skills/minutes/scripts/aging-report.mjs";

const ledger = `# Action-Items Ledger

| Owner | Action | Due Date | Status | Meeting | Date Added | Times Raised | Last Raised |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Vinny Castellano | Finish the Bohemia closeout | Friday, August 14, 2026 | Open | Monday Ops | 2026-04-07 | 4 | 2026-08-10 |
| Marisol Reyes | Chase the Selden customer | Not set | Open | Monday Ops | 2026-06-02 | 2 | 2026-07-13 |
| Sal Vitale | Renew the vehicle insurance | Friday, July 31, 2026 | Open | Monday Ops | 2026-07-13 | 1 | 2026-07-13 |
| Marisol Reyes | Write the Selden proposal | Tuesday, August 11, 2026 | Open | Monday Ops | 2026-08-10 | 1 | 2026-08-10 |
| Vinny Castellano | Completed item | Monday, July 20, 2026 | Done | Monday Ops | 2026-07-13 | 1 | 2026-07-13 |
`;

test("classifies, sorts, and calls out repeat commitments deterministically", () => {
  const report = buildAgingReport(parseLedger(ledger), parseDate("2026-08-13"));

  assert.deepEqual(report.summary, { open: 4, overdue: 2, aging: 1, onTrack: 1 });
  assert.deepEqual(report.overdue.map((row) => [row.owner, row.daysOverdue]), [
    ["Sal Vitale", 13],
    ["Marisol Reyes", 2],
  ]);
  assert.deepEqual(report.aging.map((row) => [row.owner, row.daysOpen]), [["Marisol Reyes", 72]]);
  assert.deepEqual(report.repeats.map((row) => [row.owner, row.timesRaised]), [["Vinny Castellano", 4]]);
  assert.deepEqual(report.carryingMost, [{ owner: "Marisol Reyes", overdue: 1, aging: 1, total: 2 }]);
  assert.equal(report.oldest.owner, "Vinny Castellano");
  assert.equal(report.oldest.daysOpen, 128);
  assert.deepEqual(report.unreadable, []);
});

test("reports malformed open rows instead of guessing", () => {
  const badLedger = ledger.replace("Friday, July 31, 2026", "Thursday, July 31, 2026");
  const report = buildAgingReport(parseLedger(badLedger), parseDate("2026-08-13"));

  assert.equal(report.unreadable.length, 1);
  assert.equal(report.unreadable[0].owner, "Sal Vitale");
  assert.equal(report.summary.open, 3);
});

test("rejects stale six-column ledgers until the documented backfill runs", () => {
  const oldLedger = `| Owner | Action | Due Date | Status | Meeting | Date Added |\n| --- | --- | --- | --- | --- | --- |\n`;
  assert.throws(() => parseLedger(oldLedger), /ledger columns must be/);
});

test("reports an unrecognized Status instead of silently dropping the commitment", () => {
  const drifted = ledger.replace(
    "| Sal Vitale | Renew the vehicle insurance | Friday, July 31, 2026 | Open |",
    "| Sal Vitale | Renew the vehicle insurance | Friday, July 31, 2026 | open |",
  );
  const report = buildAgingReport(parseLedger(drifted), parseDate("2026-08-13"));

  assert.equal(report.summary.open, 3);
  assert.equal(report.unreadable.length, 1);
  assert.equal(report.unreadable[0].owner, "Sal Vitale");
  assert.match(report.unreadable[0].reason, /unrecognized Status "open"/);
});

test("flags a row containing a literal pipe without killing the rest of the report", () => {
  const withPipe = `${ledger}| Dana Ruiz | Send the P&L | update | Not set | Open | Monday Ops | 2026-08-01 | 1 | 2026-08-01 |\n`;
  const report = buildAgingReport(parseLedger(withPipe), parseDate("2026-08-13"));

  assert.equal(report.summary.open, 4, "the four readable open rows still report");
  assert.equal(report.unreadable.length, 1);
  assert.match(report.unreadable[0].reason, /9 cells instead of 8/);
  assert.match(report.unreadable[0].reason, /"\|" character inside the text/);
});

test("reports a blank line inside the table instead of truncating the ledger", () => {
  const interrupted = ledger.replace(
    "| Sal Vitale | Renew",
    "\n| Sal Vitale | Renew",
  );
  const report = buildAgingReport(parseLedger(interrupted), parseDate("2026-08-13"));

  assert.equal(report.summary.open, 4, "rows after the blank line are still read");
  assert.equal(report.unreadable.length, 1);
  assert.match(report.unreadable[0].reason, /blank line inside the ledger table/);
});

test("stays importable when there is no argv[1] to compare against", async () => {
  const engine = await import("../skills/minutes/scripts/aging-report.mjs");
  assert.equal(typeof engine.buildAgingReport, "function");
  assert.equal(typeof engine.parseLedger, "function");
  assert.equal(typeof engine.parseDate, "function");
});
