#!/usr/bin/env node
/**
 * Bing Webmaster URL Inspection — JSON snapshot
 *
 * Mirrors scripts/gsc-url-inspection.mjs but talks to Bing Webmaster's
 * JSON API (https://ssl.bing.com/webmaster/api.svc/json/...). Uses the
 * GetUrlInfo endpoint for per-URL crawl/index status and GetSiteStatus
 * for site-wide totals (impressions, clicks, crawled URLs).
 *
 * Required env (set in .env.local or via direct export):
 *   BING_WEBMASTER_API_KEY = your Bing Webmaster API key
 *     Get one from https://www.bing.com/webmasters → Settings → API Access
 *   BING_SITE_URL          = https://merrysails.com
 *
 * Usage:
 *   node scripts/bing-url-inspection.mjs
 *   node scripts/bing-url-inspection.mjs --urls /bosphorus-cruise,/yacht-charter-istanbul
 *
 * Output: data/gsc/bing-url-inspection-YYYY-MM-DD.json
 *
 * NOTE: This script is best-effort. If BING_WEBMASTER_API_KEY is missing it
 * exits cleanly with code 0 so the cron stays green; check stderr for the
 * "skipped" line.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
const today = new Date().toISOString().slice(0, 10);

// Load .env.local
for (const envFile of [path.join(rootDir, ".env.local"), path.join(rootDir, ".env")]) {
  if (!fs.existsSync(envFile)) continue;
  for (const line of fs.readFileSync(envFile, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i < 0) continue;
    const k = t.slice(0, i).trim();
    const v = t.slice(i + 1).trim().replace(/^['"]|['"]$/g, "");
    if (!process.env[k]) process.env[k] = v;
  }
}

const API_KEY = process.env.BING_WEBMASTER_API_KEY || "";
const SITE_URL = process.env.BING_SITE_URL || "https://merrysails.com";
const reportDir = path.join(rootDir, "data", "gsc");

const defaultPaths = [
  "/",
  "/bosphorus-cruise",
  "/istanbul-dinner-cruise",
  "/cruises/bosphorus-sunset-cruise",
  "/yacht-charter-istanbul",
  "/boat-rental-istanbul",
  "/sunset-cruise-tickets-istanbul",
  "/turkish-night-dinner-cruise-istanbul",
  "/dinner-cruise-with-hotel-pickup-istanbul",
  "/dinner-cruise-pickup-sultanahmet-taksim",
  "/kabatas-dinner-cruise-istanbul",
  "/proposal-yacht-rental-istanbul",
  "/corporate-events",
  "/private-events",
  "/bosphorus-cruise-departure-points",
  "/tr/bosphorus-cruise",
  "/de/bosphorus-cruise",
  "/fr/bosphorus-cruise",
];

function parseArgs(argv) {
  const out = { urls: [...defaultPaths] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--urls" || a === "-u") {
      const next = argv[++i] || "";
      out.urls = next.split(",").map((s) => s.trim()).filter(Boolean);
    }
  }
  return out;
}

async function bingApiCall(endpoint, body) {
  const url = `https://ssl.bing.com/webmaster/api.svc/json/${endpoint}?apikey=${API_KEY}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  const txt = await res.text();
  if (!res.ok) {
    return { ok: false, status: res.status, body: txt.slice(0, 500) };
  }
  try {
    return { ok: true, status: res.status, data: JSON.parse(txt) };
  } catch {
    return { ok: false, status: res.status, body: txt.slice(0, 500) };
  }
}

async function inspectUrl(absUrl) {
  // GetUrlInfo returns crawl + index status for the supplied URL.
  return bingApiCall("GetUrlInfo", {
    siteUrl: SITE_URL,
    url: absUrl,
  });
}

async function getSiteStatus() {
  return bingApiCall("GetSiteStats", { siteUrl: SITE_URL });
}

async function main() {
  if (!API_KEY) {
    console.warn("[bing-url-inspection] BING_WEBMASTER_API_KEY not set — skipping");
    console.warn("[bing-url-inspection] Configure at https://www.bing.com/webmasters → Settings → API Access");
    process.exit(0);
  }

  const args = parseArgs(process.argv.slice(2));
  const targets = args.urls.map((u) => (u.startsWith("http") ? u : `${SITE_URL}${u}`));

  console.log(`[bing-url-inspection] Inspecting ${targets.length} URLs against ${SITE_URL}`);

  const siteStatus = await getSiteStatus();
  console.log(`[bing-url-inspection] Site status: ${siteStatus.ok ? "OK" : `FAIL ${siteStatus.status}`}`);

  const results = [];
  for (const target of targets) {
    const r = await inspectUrl(target);
    results.push({ url: target, ok: r.ok, status: r.status, data: r.data ?? null, error: r.body ?? null });
    process.stdout.write(".");
    await new Promise((res) => setTimeout(res, 350));
  }
  process.stdout.write("\n");

  fs.mkdirSync(reportDir, { recursive: true });
  const outPath = path.join(reportDir, `bing-url-inspection-${today}.json`);
  fs.writeFileSync(
    outPath,
    JSON.stringify(
      {
        date: today,
        site: SITE_URL,
        siteStatus: siteStatus.data ?? null,
        siteStatusOk: siteStatus.ok,
        inspected: results.length,
        results,
      },
      null,
      2
    )
  );
  console.log(`[bing-url-inspection] Wrote ${outPath}`);
}

main().catch((err) => {
  console.error("[bing-url-inspection] fatal:", err);
  process.exit(1);
});
