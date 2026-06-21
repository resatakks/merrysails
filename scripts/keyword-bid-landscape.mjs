#!/usr/bin/env node
/**
 * Floor-bid + competition landscape for our yacht keywords via Keyword Planner API
 * (generateKeywordIdeas). Returns avg monthly searches + competition + low/high
 * top-of-page bid (account currency = TRY) so we can check our ₺42-90 bids vs the floor.
 */
import fs from "fs";
import path from "path";
const API = "v21";
const root = path.dirname(new URL(import.meta.url).pathname).replace(/\/scripts$/, "");
const env = {};
for (const line of fs.readFileSync(path.join(root, ".env.local"), "utf8").split("\n")) { const m = line.match(/^([A-Z0-9_]+)=(.*)$/); if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, ""); }
const customerId = env.GOOGLE_ADS_CUSTOMER_ID?.replace(/-/g, "");
const creds = { clientId: env.GOOGLE_ADS_CLIENT_ID, clientSecret: env.GOOGLE_ADS_CLIENT_SECRET, refreshToken: env.GOOGLE_ADS_REFRESH_TOKEN, developerToken: env.GOOGLE_ADS_DEVELOPER_TOKEN };
let TKN;
async function token() { const r = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ client_id: creds.clientId, client_secret: creds.clientSecret, refresh_token: creds.refreshToken, grant_type: "refresh_token" }) }); if (!r.ok) throw new Error("OAuth " + r.status); return (await r.json()).access_token; }
const H = () => ({ Authorization: `Bearer ${TKN}`, "developer-token": creds.developerToken, "Content-Type": "application/json" });

const SEEDS = ["private yacht charter istanbul","rent a yacht istanbul","luxury yacht charter istanbul","yacht birthday party istanbul","marriage proposal yacht istanbul","private sunset yacht istanbul","honeymoon yacht istanbul","bachelorette party yacht istanbul","corporate yacht istanbul","private boat hire istanbul","anniversary yacht istanbul","yacht mieten istanbul","аренда яхты стамбул"];

async function ideas(geoIds, langId, label) {
  const r = await fetch(`https://googleads.googleapis.com/${API}/customers/${customerId}:generateKeywordIdeas`, {
    method: "POST", headers: H(),
    body: JSON.stringify({ language: `languageConstants/${langId}`, geoTargetConstants: geoIds.map(g => `geoTargetConstants/${g}`), keywordPlanNetwork: "GOOGLE_SEARCH", keywordSeed: { keywords: SEEDS } }),
  });
  const t = await r.text();
  if (!r.ok) { console.log(`${label} ERR:`, t.slice(0, 200)); return; }
  const j = JSON.parse(t);
  const rows = (j.results || []).filter(x => SEEDS.includes((x.text || "").toLowerCase())).slice(0, 40);
  console.log(`\n=== ${label} — top-of-page bid (TRY) ===`);
  console.log("kw".padEnd(38), "vol".padStart(7), "comp".padStart(7), "low₺".padStart(7), "high₺".padStart(7));
  for (const x of rows) {
    const m = x.keywordIdeaMetrics || {};
    const lo = Number(m.lowTopOfPageBidMicros || 0) / 1e6, hi = Number(m.highTopOfPageBidMicros || 0) / 1e6;
    console.log((x.text || "").slice(0, 37).padEnd(38), String(m.avgMonthlySearches ?? "-").padStart(7), (m.competition || "-").slice(0, 6).padStart(7), lo.toFixed(0).padStart(7), hi.toFixed(0).padStart(7));
  }
}

(async () => {
  TKN = await token();
  console.log("Our ad-group bids: ₺42–90. Floor = lowTopOfPage; ceiling = highTopOfPage (account currency TRY).");
  await ideas([2826, 2840, 2276], 1000, "EN — UK+US+DE tourists");          // English source markets
  await ideas([21069], 1000, "EN — in-Istanbul tourists");                  // Istanbul presence
  await ideas([2276], 1001, "DE — Germany");                                 // German
  await ideas([2643], 1031, "RU — Russia");                                  // Russian
})().catch(e => { console.error("FATAL:", e.message); process.exit(1); });
