#!/usr/bin/env node
/**
 * Weekly keyword rank tracker using DataForSEO SERP API.
 * Reads tracking config from data/multi-brand-monitoring/rank-tracking.json
 * Appends weekly snapshot to data/multi-brand-monitoring/rank-history.jsonl
 * Generates delta report at data/multi-brand-monitoring/rank-latest.md
 *
 * Cost: ~$0.002 per keyword per market check.
 * Default config tracks ~10 commercial keywords per brand across primary markets.
 *
 * Usage:
 *   node --env-file=.env.local scripts/rank-tracker.mjs                  # all brands
 *   node --env-file=.env.local scripts/rank-tracker.mjs merrysails       # single brand
 */

import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const CONFIG_PATH = path.join(ROOT, "data/multi-brand-monitoring/rank-tracking.json");
const HISTORY_PATH = path.join(ROOT, "data/multi-brand-monitoring/rank-history.jsonl");
const REPORT_PATH = path.join(ROOT, "data/multi-brand-monitoring/rank-latest.md");

const login = process.env.DATAFORSEO_LOGIN;
const password = process.env.DATAFORSEO_PASSWORD;
if (!login || !password) {
  console.error("DATAFORSEO_LOGIN/PASSWORD missing in .env.local");
  process.exit(1);
}
const auth = "Basic " + Buffer.from(`${login}:${password}`).toString("base64");

const config = JSON.parse(await fs.readFile(CONFIG_PATH, "utf-8"));
const onlyBrand = process.argv[2];
const brands = onlyBrand
  ? config.brands.filter((b) => b.id === onlyBrand)
  : config.brands;

if (brands.length === 0) {
  console.error(`No brand matched id "${onlyBrand}"`);
  process.exit(1);
}

async function rankCheck(domain, keyword, locationCode, languageCode) {
  const res = await fetch(
    "https://api.dataforseo.com/v3/serp/google/organic/live/advanced",
    {
      method: "POST",
      headers: { Authorization: auth, "Content-Type": "application/json" },
      body: JSON.stringify([
        {
          keyword,
          location_code: locationCode,
          language_code: languageCode,
          device: "desktop",
          os: "windows",
          depth: 100,
        },
      ]),
    }
  );
  const data = await res.json();
  const cost = data.cost ?? 0;
  const items = data.tasks?.[0]?.result?.[0]?.items ?? [];
  const match = items.find(
    (it) => it.type === "organic" && it.url && it.url.toLowerCase().includes(domain.toLowerCase())
  );
  return {
    rank: match?.rank_absolute ?? null,
    url: match?.url ?? null,
    title: match?.title ?? null,
    cost,
  };
}

const ts = new Date().toISOString();
const dateKey = ts.split("T")[0];
const snapshot = { date: dateKey, brands: [] };
let totalCost = 0;
let totalChecks = 0;

// Load previous snapshot for delta computation
let previousSnapshot = null;
try {
  const lines = (await fs.readFile(HISTORY_PATH, "utf-8")).trim().split("\n").filter(Boolean);
  if (lines.length > 0) previousSnapshot = JSON.parse(lines[lines.length - 1]);
} catch {
  // first run
}

for (const b of brands) {
  console.log(`\n━━━ ${b.brand} (${b.domain}) ━━━`);
  const brandSnap = { brand: b.id, domain: b.domain, results: [] };

  for (const kw of b.keywords) {
    const r = await rankCheck(b.domain, kw.keyword, kw.location_code, kw.language_code);
    totalCost += r.cost;
    totalChecks++;
    const prev = previousSnapshot?.brands.find((x) => x.brand === b.id)?.results.find(
      (x) => x.keyword === kw.keyword && x.location_code === kw.location_code
    );
    const delta = prev?.rank != null && r.rank != null ? prev.rank - r.rank : null; // positive = improved
    brandSnap.results.push({
      keyword: kw.keyword,
      location_code: kw.location_code,
      language_code: kw.language_code,
      rank: r.rank,
      url: r.url,
      previous_rank: prev?.rank ?? null,
      delta,
    });
    const rankStr = r.rank == null ? "─" : `#${r.rank}`;
    const deltaStr = delta == null ? "" : delta > 0 ? ` (↑${delta})` : delta < 0 ? ` (↓${-delta})` : " (=)";
    console.log(`  ${kw.keyword.padEnd(45)} [loc ${kw.location_code}]  ${rankStr}${deltaStr}`);
  }
  snapshot.brands.push(brandSnap);
}

// Append to history (JSONL — one snapshot per line)
await fs.appendFile(HISTORY_PATH, JSON.stringify(snapshot) + "\n");

// Generate delta report
const lines = [];
lines.push(`# Keyword Rank Snapshot — ${dateKey}`);
lines.push("");
lines.push(`**Total checks**: ${totalChecks}   **Cost**: ~$${totalCost.toFixed(4)}`);
if (previousSnapshot) lines.push(`**Compared to**: ${previousSnapshot.date}`);
lines.push("");

for (const b of snapshot.brands) {
  lines.push(`## ${b.brand}`);
  lines.push("");
  lines.push(`| Keyword | Loc | Rank | Δ | URL |`);
  lines.push(`|---|---|---:|---:|---|`);
  for (const r of b.results) {
    const rank = r.rank == null ? "—" : `#${r.rank}`;
    const delta = r.delta == null
      ? ""
      : r.delta > 0
      ? `↑${r.delta}`
      : r.delta < 0
      ? `↓${-r.delta}`
      : "=";
    const url = r.url ? r.url.replace(/^https?:\/\//, "").slice(0, 50) : "—";
    lines.push(`| ${r.keyword} | ${r.location_code} | ${rank} | ${delta} | ${url} |`);
  }
  lines.push("");
}

await fs.writeFile(REPORT_PATH, lines.join("\n"));

console.log(`\n══════ SUMMARY ══════`);
console.log(`Total checks: ${totalChecks}   Cost: ~$${totalCost.toFixed(4)}`);
console.log(`History: ${HISTORY_PATH}`);
console.log(`Report:  ${REPORT_PATH}`);
