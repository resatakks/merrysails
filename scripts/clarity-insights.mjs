#!/usr/bin/env node
/**
 * Microsoft Clarity — daily insights pull for merrysails.com (project wfsykdd4gb).
 *
 * Uses the Clarity Data Export API (Bearer token in CLARITY_API_TOKEN, read from
 * .env.local — gitignored, never committed). Replaces the Clarity MCP, which is
 * connected to the wrong project (merrytourism.com).
 *
 * Usage:  node scripts/clarity-insights.mjs [numOfDays 1-3]
 * API limits: 10 requests/day, max 3 days lookback.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

function readEnvToken() {
  if (process.env.CLARITY_API_TOKEN) return process.env.CLARITY_API_TOKEN;
  try {
    const env = readFileSync(join(ROOT, ".env.local"), "utf8");
    const m = env.match(/^CLARITY_API_TOKEN\s*=\s*"?([^"\n]+)"?/m);
    return m ? m[1] : null;
  } catch {
    return null;
  }
}

const token = readEnvToken();
if (!token) {
  console.error("CLARITY_API_TOKEN not found (env or .env.local). Aborting.");
  process.exit(1);
}

const numDays = Math.min(3, Math.max(1, Number(process.argv[2]) || 3));
const base = "https://www.clarity.ms/export-data/api/v1/project-live-insights";

async function pull(dimension) {
  const url = dimension ? `${base}?numOfDays=${numDays}&dimension1=${dimension}` : `${base}?numOfDays=${numDays}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error(`Clarity API ${res.status}: ${await res.text()}`);
  return res.json();
}

function metric(data, name) {
  return data.find((m) => m.metricName === name)?.information ?? [];
}

const overall = await pull();
const traffic = metric(overall, "Traffic")[0] ?? {};
const engage = metric(overall, "EngagementTime")[0] ?? {};
const scroll = metric(overall, "ScrollDepth")[0] ?? {};
const dead = metric(overall, "DeadClickCount")[0] ?? {};
const rage = metric(overall, "RageClickCount")[0] ?? {};
const quick = metric(overall, "QuickbackClick")[0] ?? {};
const err = metric(overall, "ScriptErrorCount")[0] ?? {};

console.log(`\n=== Clarity merrysails.com — last ${numDays} day(s) ===`);
console.log(`Sessions: ${traffic.totalSessionCount} (bot: ${traffic.totalBotSessionCount}) · users: ${traffic.distinctUserCount} · pages/session: ${Number(traffic.pagesPerSessionPercentage || 0).toFixed(2)}`);
console.log(`Engagement: total ${engage.totalTime}s / active ${engage.activeTime}s · scroll depth avg ${scroll.averageScrollDepth}%`);
console.log(`Friction: deadClick ${dead.subTotal || 0} (${dead.sessionsWithMetricPercentage || 0}%) · rageClick ${rage.subTotal || 0} · quickback ${quick.subTotal || 0} · scriptErr ${err.subTotal || 0}`);

console.log(`\nDevices: ${metric(overall, "Device").map((d) => `${d.name} ${d.sessionsCount}`).join(" · ")}`);
console.log(`Browsers: ${metric(overall, "Browser").slice(0, 4).map((b) => `${b.name} ${b.sessionsCount}`).join(" · ")}`);
console.log(`Countries: ${metric(overall, "Country").slice(0, 6).map((c) => `${c.name} ${c.sessionsCount}`).join(" · ")}`);

const byUrl = await pull("URL");
const pages = metric(byUrl, "Traffic")
  .filter((p) => p.Url)
  .sort((a, b) => Number(b.totalSessionCount) - Number(a.totalSessionCount))
  .slice(0, 12);
console.log(`\nTop pages (session / bot):`);
for (const p of pages) {
  console.log(`  ${p.totalSessionCount}/${p.totalBotSessionCount}  ${p.Url}`);
}
console.log("");
