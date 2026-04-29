#!/usr/bin/env node
/**
 * GSC Daily Snapshot — manuel veya cron ile çalıştır
 * Usage: node scripts/gsc-daily-snapshot.mjs [--date 2026-04-26]
 *
 * Requires env: GSC_CLIENT_ID, GSC_CLIENT_SECRET, GSC_REFRESH_TOKEN, GSC_SITE_URL
 * Token file fallback: /Users/resat/mcp-gsc/token.json
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
const TOKEN_FILE = process.env.GSC_TOKEN_PATH || "/Users/resat/mcp-gsc/token.json";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const REPORT_DIR = path.join(rootDir, "data", "gsc");

// Load .env
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

function getCredentials() {
  if (process.env.GSC_CLIENT_ID && process.env.GSC_REFRESH_TOKEN) {
    return {
      client_id: process.env.GSC_CLIENT_ID,
      client_secret: process.env.GSC_CLIENT_SECRET,
      refresh_token: process.env.GSC_REFRESH_TOKEN,
    };
  }
  if (fs.existsSync(TOKEN_FILE)) {
    const t = JSON.parse(fs.readFileSync(TOKEN_FILE, "utf8"));
    return { client_id: t.client_id, client_secret: t.client_secret, refresh_token: t.refresh_token };
  }
  throw new Error("No GSC credentials found. Set GSC_CLIENT_ID/SECRET/REFRESH_TOKEN in .env");
}

async function getAccessToken() {
  const creds = getCredentials();
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ ...creds, grant_type: "refresh_token" }),
  });
  if (!res.ok) throw new Error(`Token refresh failed: ${await res.text()}`);
  return (await res.json()).access_token;
}

async function querySearchAnalytics(accessToken, siteUrl, date, dimensions, rowLimit = 10) {
  const encoded = encodeURIComponent(siteUrl);
  const url = `https://www.googleapis.com/webmasters/v3/sites/${encoded}/searchAnalytics/query`;
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({ startDate: date, endDate: date, dimensions, rowLimit, dataState: "all" }),
  });
  if (!res.ok) throw new Error(`GSC query failed (${res.status}): ${await res.text()}`);
  return (await res.json()).rows || [];
}

function snapshotDate(override) {
  if (override) return override;
  const d = new Date();
  d.setDate(d.getDate() - 3);
  return d.toISOString().slice(0, 10);
}

async function main() {
  const dateArg = process.argv.find((_, i, a) => a[i - 1] === "--date");
  const date = snapshotDate(dateArg);
  const siteUrl = process.env.GSC_SITE_URL || "sc-domain:merrysails.com";

  console.log(`📊 GSC Snapshot — ${date} (property: ${siteUrl})`);

  const accessToken = await getAccessToken();

  const queryRows = await querySearchAnalytics(accessToken, siteUrl, date, ["query"], 25);
  const pageRows = await querySearchAnalytics(accessToken, siteUrl, date, ["page"], 10);

  const totalClicks = queryRows.reduce((s, r) => s + r.clicks, 0);
  const totalImpressions = queryRows.reduce((s, r) => s + r.impressions, 0);
  const ctr = totalImpressions > 0 ? totalClicks / totalImpressions : 0;
  const avgPos = queryRows.length > 0
    ? queryRows.reduce((s, r) => s + r.position * r.impressions, 0) / Math.max(totalImpressions, 1)
    : 0;

  const topQueries = queryRows
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 10)
    .map((r) => ({ query: r.keys[0], clicks: r.clicks, impressions: r.impressions, ctr: +(r.ctr * 100).toFixed(1), position: +r.position.toFixed(1) }));

  const topPages = pageRows
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 10)
    .map((r) => ({ page: r.keys[0].replace("https://merrysails.com", ""), clicks: r.clicks, impressions: r.impressions, ctr: +(r.ctr * 100).toFixed(1), position: +r.position.toFixed(1) }));

  const snapshot = {
    date,
    site: siteUrl,
    totals: { clicks: totalClicks, impressions: totalImpressions, ctr: +(ctr * 100).toFixed(2), avgPosition: +avgPos.toFixed(1) },
    topQueries,
    topPages,
    capturedAt: new Date().toISOString(),
  };

  if (!fs.existsSync(REPORT_DIR)) fs.mkdirSync(REPORT_DIR, { recursive: true });
  const outFile = path.join(REPORT_DIR, `gsc-snapshot-${date}.json`);
  fs.writeFileSync(outFile, JSON.stringify(snapshot, null, 2) + "\n");

  console.log(`\n✅ Kaydedildi: ${outFile}`);
  console.log(`\n📈 TOPLAM:`);
  console.log(`   Tıklama: ${totalClicks} | Gösterim: ${totalImpressions} | CTR: ${(ctr * 100).toFixed(1)}% | Ort. Sıra: ${avgPos.toFixed(1)}`);

  if (topQueries.length > 0) {
    console.log(`\n🔍 TOP QUERIES:`);
    for (const q of topQueries) {
      console.log(`   ${q.clicks}c / ${q.impressions}i / pos${q.position} — "${q.query}"`);
    }
  } else {
    console.log(`\n⚠️  Sorgu verisi yok — GSC henüz indexlememiş olabilir.`);
  }

  if (topPages.length > 0) {
    console.log(`\n📄 TOP PAGES:`);
    for (const p of topPages) {
      console.log(`   ${p.clicks}c / ${p.impressions}i / pos${p.position} — ${p.page}`);
    }
  }
}

main().catch((e) => { console.error("❌", e.message); process.exit(1); });
