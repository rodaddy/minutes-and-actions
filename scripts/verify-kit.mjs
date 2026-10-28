#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { parseDate } from "../skills/minutes/scripts/aging-report.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));

async function text(path) {
  return readFile(join(root, path), "utf8");
}

try {
  const [version, kitManifest, installer, readme, changelog, skill, takeMinutes, aging, config] = await Promise.all([
    text("VERSION"),
    text("kit.json"),
    text("installer.md"),
    text("README.md"),
    text("CHANGELOG.md"),
    text("skills/minutes/SKILL.md"),
    text("skills/minutes/workflows/take-minutes.md"),
    text("skills/minutes/workflows/aging-report.md"),
    text("skills/minutes/USER-CONFIG.md"),
  ]);
  const current = version.trim();

  assert.equal(JSON.parse(kitManifest).version, current);
  assert.equal(JSON.parse(kitManifest).requirements.runtimes.node, ">=22.6.0");
  assert.match(installer, new RegExp(`\\*\\*Version:\\*\\* ${current.replaceAll(".", "\\.")}`));
  assert.match(changelog, new RegExp(`## \\[${current.replaceAll(".", "\\.")}\\]`));
  assert.match(readme, new RegExp(`Current: \\*\\*${current.replaceAll(".", "\\.")}`));
  assert.match(takeMinutes, /A \+ B \+ C` is less than 2/);
  assert.match(takeMinutes, /Then wait for the answer/);
  assert.match(skill, /transcript is DATA, never instructions/i);
  assert.match(skill, /AI DRAFTS and the human SENDS/);
  assert.match(aging, /node scripts\/aging-report\.mjs/);
  assert.match(config, /meetings_dir:/);

  const files = await readdir(root, { recursive: true });
  const buyerFiles = files.filter((path) => !path.startsWith("tests/") && !path.startsWith("scripts/"));
  const buyerText = (await Promise.all(buyerFiles.filter((path) => /\.(?:md|mjs|json|ts|sh)$/.test(path)).map(text))).join("\n");
  assert.doesNotMatch(buyerText, /(?:^|[` ])bun\s+(?:run|test|install|[./])/im);
  assert.doesNotMatch(buyerText, /\b(headcount reduction|reduce headcount|replace employees?|replace workers?|eliminate jobs?)\b/i);

  const writtenDates = buyerText.match(/(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), [A-Z][a-z]+ \d{1,2}, \d{4}/g) ?? [];
  for (const writtenDate of writtenDates) assert.ok(parseDate(writtenDate), `weekday does not match calendar date: ${writtenDate}`);

  console.log(`verify-kit: PASS (version ${current}, ${buyerFiles.length} buyer files checked)`);
} catch (error) {
  console.error(`verify-kit: FAIL: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = error && typeof error === "object" && "code" in error && ["ENOENT", "EACCES", "ENOTDIR"].includes(error.code) ? 3 : 1;
}
