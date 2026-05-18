#!/usr/bin/env node
/**
 * GA4 Data API — daily insights pull for merrysails.com (property 534226524).
 *
 * Needs GA4_REFRESH_TOKEN in .env.local (run scripts/ga4-oauth.mjs first) plus
 * the shared GSC_CLIENT_ID / GSC_CLIENT_SECRET. Pulls sessions, conversions,
 * traffic sources, top pages, and per-event counts — so the GA4 event setup
 * (whatsapp_click, phone_click, begin_checkout, purchase, generate_lead…) can
 * be verified without opening the GA4 UI.
 *
 * Usage:  node scripts/ga4-insights.mjs [daysBack=28]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
const PROPERTY_ID = "534226524"; // merrysails GA4 property (a354021660p534226524)

loadEnv(path.join(rootDir, ".env.local"));
function loadEnv(file) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    const k = t.slice(0, i).trim();
    const v = t.slice(i + 1).trim().replace(/^['"]|['"]$/g, "");
    if (!process.env[k]) process.env[k] = v;
  }
}

const clientId = process.env.GSC_CLIENT_ID;
const clientSecret = process.env.GSC_CLIENT_SECRET;
const refreshToken = process.env.GA4_REFRESH_TOKEN;
if (!clientId || !clientSecret || !refreshToken) {
  console.error("Missing GSC_CLIENT_ID / GSC_CLIENT_SECRET / GA4_REFRESH_TOKEN in .env.local");
  console.error("Run scripts/ga4-oauth.mjs first to obtain GA4_REFRESH_TOKEN.");
  process.exit(1);
}

const days = Number(process.argv[2]) || 28;

async function accessToken() {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });
  const json = await res.json();
  if (!res.ok || !json.access_token) throw new Error("Token refresh failed: " + JSON.stringify(json));
  return json.access_token;
}

async function runReport(token, body) {
  const res = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY_ID}:runReport`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );
  const json = await res.json();
  if (!res.ok) throw new Error("runReport failed: " + JSON.stringify(json));
  return json;
}

const dateRanges = [{ startDate: `${days}daysAgo`, endDate: "today" }];
const token = await accessToken();

// 1. Overall totals
const totals = await runReport(token, {
  dateRanges,
  metrics: [
    { name: "sessions" },
    { name: "totalUsers" },
    { name: "screenPageViews" },
    { name: "userEngagementDuration" },
    { name: "keyEvents" },
  ],
});
const t = totals.rows?.[0]?.metricValues?.map((m) => m.value) ?? [];
console.log(`\n=== GA4 merrysails.com — last ${days} days (property ${PROPERTY_ID}) ===`);
console.log(`Sessions: ${t[0]} · Users: ${t[1]} · Pageviews: ${t[2]} · KeyEvents: ${t[4]}`);
console.log(`Engagement: ${Math.round((Number(t[3]) || 0) / 60)} min total`);

// 2. Traffic source/medium
const src = await runReport(token, {
  dateRanges,
  dimensions: [{ name: "sessionSourceMedium" }],
  metrics: [{ name: "sessions" }],
  orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
  limit: 10,
});
console.log(`\nTraffic sources:`);
for (const r of src.rows ?? []) {
  console.log(`  ${r.metricValues[0].value.padStart(5)}  ${r.dimensionValues[0].value}`);
}

// 3. Per-event counts — verify event tracking
const events = await runReport(token, {
  dateRanges,
  dimensions: [{ name: "eventName" }],
  metrics: [{ name: "eventCount" }],
  orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
  limit: 30,
});
console.log(`\nEvents (eventName · count):`);
for (const r of events.rows ?? []) {
  console.log(`  ${r.metricValues[0].value.padStart(6)}  ${r.dimensionValues[0].value}`);
}

// 4. Top pages
const pages = await runReport(token, {
  dateRanges,
  dimensions: [{ name: "pagePath" }],
  metrics: [{ name: "sessions" }],
  orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
  limit: 12,
});
console.log(`\nTop pages (sessions):`);
for (const r of pages.rows ?? []) {
  console.log(`  ${r.metricValues[0].value.padStart(5)}  ${r.dimensionValues[0].value}`);
}
console.log("");
