#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const MONTHS = new Map([
  ["january", 0], ["february", 1], ["march", 2], ["april", 3],
  ["may", 4], ["june", 5], ["july", 6], ["august", 7],
  ["september", 8], ["october", 9], ["november", 10], ["december", 11],
]);
const WEEKDAYS = new Map([
  ["sunday", 0], ["monday", 1], ["tuesday", 2], ["wednesday", 3],
  ["thursday", 4], ["friday", 5], ["saturday", 6],
]);

function utcDate(year, month, day) {
  const date = new Date(Date.UTC(year, month, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month ||
    date.getUTCDate() !== day
  ) {
    return null;
  }
  return date;
}

export function parseDate(value) {
  const text = value.trim();
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(text);
  if (iso) return utcDate(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3]));

  const written = /^(?:([A-Za-z]+),\s+)?([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4})$/.exec(text);
  if (!written) return null;
  const month = MONTHS.get(written[2].toLowerCase());
  if (month === undefined) return null;
  const date = utcDate(Number(written[4]), month, Number(written[3]));
  if (!date) return null;
  if (written[1]) {
    const weekday = WEEKDAYS.get(written[1].toLowerCase());
    if (weekday === undefined || weekday !== date.getUTCDay()) return null;
  }
  return date;
}

function daysBetween(later, earlier) {
  return Math.floor((later.getTime() - earlier.getTime()) / 86_400_000);
}

function splitRow(line) {
  return line.trim().slice(1, -1).split("|").map((cell) => cell.trim());
}

// The only Status values ledger/action-items.md documents. Anything else --
// including case drift like "open" or a trailing space -- is unreadable, not
// closed.
const KNOWN_STATUSES = new Set(["Open", "Done", "Dropped"]);

const LEDGER_COLUMNS = ["Owner", "Action", "Due Date", "Status", "Meeting", "Date Added", "Times Raised", "Last Raised"];

// A ledger row that cannot be read as eight cells is REPORTED, never guessed at
// and never silently dropped (KIT-STANDARD 4.9). It comes back as a row whose
// `parseError` explains, in the buyer's words, what is wrong with that one line;
// buildAgingReport turns it into an `unreadable` entry and the run exits 1.
function unreadableRow(line, reason) {
  return { parseError: reason, sourceLine: line.trim() };
}

export function parseLedger(markdown) {
  const lines = markdown.split(/\r?\n/);
  const headerIndex = lines.findIndex((line) => /^\|\s*Owner\s*\|/.test(line));
  if (headerIndex < 0) throw new Error("ledger table header not found");

  const headers = splitRow(lines[headerIndex]);
  const required = LEDGER_COLUMNS;
  if (headers.join("|") !== required.join("|")) {
    throw new Error(`ledger columns must be: ${required.join(", ")}`);
  }

  const rows = [];
  const body = lines.slice(headerIndex + 2);
  // Trailing blank lines end the table cleanly. A blank line with more table
  // below it is an INTERRUPTION -- reported, so the rest of the ledger is never
  // silently truncated.
  let lastTableLine = -1;
  body.forEach((line, index) => {
    if (line.trim().startsWith("|")) lastTableLine = index;
  });

  for (let index = 0; index <= lastTableLine; index += 1) {
    const line = body[index];
    if (!line.trim().startsWith("|")) {
      if (line.trim() === "") {
        rows.push(unreadableRow(line, `blank line inside the ledger table at body line ${index + 1}; delete the blank line so the table is one unbroken block`));
      } else {
        rows.push(unreadableRow(line, `line inside the ledger table does not start with "|"; every ledger row must be a full eight-column table row`));
      }
      continue;
    }
    const cells = splitRow(line);
    if (cells.length !== required.length) {
      const problem = cells.length > required.length
        ? `found ${cells.length} cells instead of ${required.length} -- a "|" character inside the text splits the row; write it as "\\|" or replace it with "/"`
        : `found ${cells.length} cells instead of ${required.length} -- the row is missing columns; it needs all eight: ${required.join(", ")}`;
      rows.push(unreadableRow(line, problem));
      continue;
    }
    rows.push(Object.fromEntries(required.map((header, cellIndex) => [header, cells[cellIndex]])));
  }
  return rows;
}

export function buildAgingReport(rows, runDate) {
  const unreadable = [];
  const open = [];

  rows.forEach((row, index) => {
    if (row.parseError) {
      unreadable.push({ row: index + 1, owner: "unknown", action: row.sourceLine, reason: row.parseError });
      return;
    }
    // Status is hand-typed in a markdown file, so case and spacing drift. An
    // unrecognized value is REPORTED, never silently treated as closed.
    if (!KNOWN_STATUSES.has(row.Status)) {
      unreadable.push({
        row: index + 1,
        owner: row.Owner,
        action: row.Action,
        reason: `unrecognized Status "${row.Status}" -- it must be exactly one of: ${[...KNOWN_STATUSES].join(", ")}`,
      });
      return;
    }
    if (row.Status !== "Open") return;
    const dateAdded = parseDate(row["Date Added"]);
    const dueDate = row["Due Date"] === "Not set" ? null : parseDate(row["Due Date"]);
    const timesRaised = Number(row["Times Raised"]);
    if (!dateAdded || (row["Due Date"] !== "Not set" && !dueDate) || !Number.isInteger(timesRaised) || timesRaised < 1) {
      unreadable.push({ row: index + 1, owner: row.Owner, action: row.Action, reason: "unreadable date or Times Raised" });
      return;
    }

    const daysOpen = daysBetween(runDate, dateAdded);
    const daysOverdue = dueDate ? daysBetween(runDate, dueDate) : null;
    let bucket = "On Track";
    if (dueDate && daysOverdue > 0) bucket = "Overdue";
    else if (!dueDate && daysOpen > 14) bucket = "Aging";

    open.push({
      owner: row.Owner,
      action: row.Action,
      dueDate: row["Due Date"],
      dateAdded: row["Date Added"],
      timesRaised,
      daysOpen,
      daysOverdue,
      bucket,
      carriedIn: /carried in|\bper\s+[^)]+\bat\b/i.test(row.Action),
    });
  });

  const overdue = open.filter((row) => row.bucket === "Overdue").sort((a, b) => b.daysOverdue - a.daysOverdue || a.owner.localeCompare(b.owner));
  const aging = open.filter((row) => row.bucket === "Aging").sort((a, b) => b.daysOpen - a.daysOpen || a.owner.localeCompare(b.owner));
  const onTrack = open.filter((row) => row.bucket === "On Track");
  const repeats = open.filter((row) => row.timesRaised >= 3).sort((a, b) => b.timesRaised - a.timesRaised || b.daysOpen - a.daysOpen);
  const oldest = [...open].sort((a, b) => b.daysOpen - a.daysOpen || a.owner.localeCompare(b.owner))[0] ?? null;

  const ownerCounts = new Map();
  for (const row of [...overdue, ...aging]) {
    const current = ownerCounts.get(row.owner) ?? { owner: row.owner, overdue: 0, aging: 0, total: 0 };
    current[row.bucket.toLowerCase()] += 1;
    current.total += 1;
    ownerCounts.set(row.owner, current);
  }
  const maxLate = Math.max(0, ...[...ownerCounts.values()].map((item) => item.total));
  const carryingMost = [...ownerCounts.values()].filter((item) => item.total === maxLate && maxLate > 0).sort((a, b) => a.owner.localeCompare(b.owner));

  return {
    runDate: runDate.toISOString().slice(0, 10),
    summary: { open: open.length, overdue: overdue.length, aging: aging.length, onTrack: onTrack.length },
    repeats,
    overdue,
    aging,
    onTrackCount: onTrack.length,
    carryingMost,
    oldest,
    unreadable,
  };
}

async function main(argv) {
  const [ledgerPath, dateFlag, dateValue] = argv;
  if (!ledgerPath || dateFlag !== "--date" || !dateValue) {
    console.error("Usage: node scripts/aging-report.mjs <ledger.md> --date YYYY-MM-DD");
    return 1;
  }
  const runDate = parseDate(dateValue);
  if (!runDate) {
    console.error(`Invalid run date: ${dateValue}`);
    return 1;
  }

  try {
    const rows = parseLedger(await readFile(ledgerPath, "utf8"));
    const report = buildAgingReport(rows, runDate);
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    return report.unreadable.length === 0 ? 0 : 1;
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    return error && typeof error === "object" && "code" in error ? 3 : 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  process.exitCode = await main(process.argv.slice(2));
}
