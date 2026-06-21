#!/usr/bin/env node
/** Stand up the Conquest ad group: remove charter-rival brand NEGATIVES (zoe/biteknem —
 *  keep butalux/lufer dinner-intent negatives), create "AG-X — Conquest — EN" with rival-
 *  brand phrase keywords (≤₺90), and a price-contrast wedge RSA (NO rival name in copy). */
import fs from "fs";
import path from "path";
const API = "v21";
const root = path.dirname(new URL(import.meta.url).pathname).replace(/\/scripts$/, "");
const env = {};
for (const line of fs.readFileSync(path.join(root, ".env.local"), "utf8").split("\n")) { const m = line.match(/^([A-Z0-9_]+)=(.*)$/); if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, ""); }
const cid = env.GOOGLE_ADS_CUSTOMER_ID.replace(/-/g, "");
let TKN;
async function token() { const r = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ client_id: env.GOOGLE_ADS_CLIENT_ID, client_secret: env.GOOGLE_ADS_CLIENT_SECRET, refresh_token: env.GOOGLE_ADS_REFRESH_TOKEN, grant_type: "refresh_token" }) }); return (await r.json()).access_token; }
const H = () => ({ Authorization: `Bearer ${TKN}`, "developer-token": env.GOOGLE_ADS_DEVELOPER_TOKEN, "Content-Type": "application/json" });
async function srch(q) { const x = await fetch(`https://googleads.googleapis.com/${API}/customers/${cid}/googleAds:search`, { method: "POST", headers: H(), body: JSON.stringify({ query: q }) }); const j = JSON.parse(await x.text()); if (j.error) throw new Error(JSON.stringify(j.error).slice(0, 200)); return j.results || []; }
async function mut(res, ops, pf) { const b = { operations: ops }; if (pf) b.partialFailure = true; const x = await fetch(`https://googleads.googleapis.com/${API}/customers/${cid}/${res}:mutate`, { method: "POST", headers: H(), body: JSON.stringify(b) }); const t = await x.text(); return { ok: x.ok, t }; }
const ph = (t) => ({ text: t });
const campaignRN = `customers/${cid}/campaigns/23959940309`;

// rival CHARTER brands to conquest (remove from negatives). Keep dinner-intent (butalux/lufer/mega lufer) negatived.
const UNNEGATE = new Set(["zoe", "zoe yacht", "biteknem", "bi teknem", "biz teknem"]);
const CONQUEST_KW = [
  { t: "zoe yacht", b: 85 }, { t: "su yachts", b: 80 }, { t: "su yat istanbul", b: 80 },
  { t: "biteknem", b: 70 }, { t: "bi teknem", b: 70 }, { t: "lotus yacht istanbul", b: 90 },
  { t: "bosphorus yacht rental", b: 85 },
];
const HEADLINES = ["Same Yacht, €279 Less", "Rivals Start at €499", "Whole Yacht From €220", "No Concierge Markup", "Book Direct, Not a Broker", "TÜRSAB A-Group #14316", "Captain & Crew Included", "We Reply in Minutes", "Private Bosphorus Yacht", "50,000+ Guests Hosted", "Whole Boat, Sold Direct", "Skip the OTA Markup", "Real Operator, Not OTA", "No Reseller Commission", "Instant WhatsApp Quote"];
const DESCRIPTIONS = ["Charter the whole yacht direct from €220 — no concierge or OTA markup, crew included.", "Same boat rivals list at €499. Book direct on WhatsApp, TÜRSAB-licensed since 2001.", "Premium Bosphorus yacht, whole boat from €220. We reply in minutes on WhatsApp.", "TÜRSAB A-Group #14316 since 2001, 50,000+ guests. Book direct, skip the markup."];

TKN = await token();
// 1) remove charter-rival negatives
const negs = await srch(`SELECT campaign_criterion.resource_name, campaign_criterion.keyword.text FROM campaign_criterion WHERE campaign.id = 23959940309 AND campaign_criterion.type = 'KEYWORD' AND campaign_criterion.negative = true`);
const toRemove = negs.filter((n) => UNNEGATE.has((n.campaignCriterion.keyword.text || "").toLowerCase())).map((n) => ({ remove: n.campaignCriterion.resourceName }));
if (toRemove.length) { const r = await mut("campaignCriteria", toRemove); console.log(`Removed ${toRemove.length} charter-rival negatives (zoe/biteknem) — kept butalux/lufer dinner negatives:`, r.ok ? "✓" : r.t.slice(0, 120)); }
else console.log("No matching rival negatives to remove (already clear).");

// 2) create conquest ad group
const agR = await mut("adGroups", [{ create: { name: "AG-X — Conquest — EN", campaign: campaignRN, type: "SEARCH_STANDARD", status: "ENABLED", cpcBidMicros: "80000000" } }]);
let agRN;
try { agRN = JSON.parse(agR.t).results[0].resourceName; } catch { console.log("AG create:", agR.t.slice(0, 200)); process.exit(1); }
console.log("Conquest ad group created ✓");

// 3) keywords (phrase) with per-kw bids
const kwOps = CONQUEST_KW.map((k) => ({ create: { adGroup: agRN, status: "ENABLED", cpcBidMicros: String(k.b * 1_000_000), keyword: { text: k.t, matchType: "PHRASE" } } }));
const kr = await mut("adGroupCriteria", kwOps, true);
console.log(`Conquest keywords (${CONQUEST_KW.length} PHRASE, ₺70-90):`, kr.ok ? "✓" : "partial");

// 4) wedge RSA (no rival name in copy)
const ar = await mut("adGroupAds", [{ create: { adGroup: agRN, status: "ENABLED", ad: { finalUrls: ["https://merrysails.com/yacht-charter-istanbul"], responsiveSearchAd: { headlines: HEADLINES.map(ph), descriptions: DESCRIPTIONS.map(ph) } } } }]);
console.log("Conquest wedge RSA:", ar.ok ? "✓ (15 H / 4 D, no rival names in copy)" : "✗ " + ar.t.slice(0, 200));
console.log("\n✅ Conquest live. Intercepts rivals' shoppers with our 56% price + TÜRSAB wedge. Monitor CPA on WhatsApp/call.");
