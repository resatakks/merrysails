#!/usr/bin/env node
/**
 * Lumen Database monitor — checks for new DMCA / Trademark notices
 * filed against goldensunsettour.com or merrysails.com.
 *
 * Usage:
 *   node scripts/monitoring/lumen-watch.mjs
 *
 * Recommended: cron 'monthly' or GitHub Action 'schedule: cron 0 9 1 * *'.
 * On hit, prints notice metadata to stdout (exit 1 so cron alerts).
 */

const DOMAINS = ["goldensunsettour.com", "merrysails.com"];
const ENDPOINT = "https://www.lumendatabase.org/notices/search.json";

async function searchDomain(domain) {
  const url = new URL(ENDPOINT);
  url.searchParams.set("term", domain);
  url.searchParams.set("per_page", "25");
  const res = await fetch(url, { headers: { "User-Agent": "lumen-watch/1.0" } });
  if (!res.ok) throw new Error(`Lumen ${res.status} for ${domain}`);
  const data = await res.json();
  return data.notices ?? [];
}

const seenPath = new URL("./lumen-seen.json", import.meta.url);
let seen = new Set();
try {
  const fs = await import("node:fs/promises");
  const raw = await fs.readFile(seenPath, "utf8");
  seen = new Set(JSON.parse(raw));
} catch {}

let newHits = 0;
for (const domain of DOMAINS) {
  const notices = await searchDomain(domain);
  for (const n of notices) {
    if (seen.has(n.id)) continue;
    newHits += 1;
    console.log(`NEW NOTICE — ${domain}`);
    console.log(`  ID: ${n.id}`);
    console.log(`  Title: ${n.title}`);
    console.log(`  Type: ${n.type}`);
    console.log(`  Date: ${n.date_sent}`);
    console.log(`  URL: https://lumendatabase.org/notices/${n.id}`);
    console.log("");
    seen.add(n.id);
  }
}

const fs = await import("node:fs/promises");
await fs.writeFile(seenPath, JSON.stringify([...seen], null, 2));

if (newHits > 0) {
  console.log(`${newHits} new notice(s) detected. Investigate at Lumen.`);
  process.exit(1);
}
console.log("No new notices.");
