#!/usr/bin/env node
/** Additively create a SECOND, competitor-wedge RSA (price-contrast €220 vs €499 +
 *  TÜRSAB-visible) in the impression-getting EN ad groups. Non-destructive — leaves
 *  the existing ad; Google rotates/optimizes. */
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
async function mut(res, ops) { const x = await fetch(`https://googleads.googleapis.com/${API}/customers/${cid}/${res}:mutate`, { method: "POST", headers: H(), body: JSON.stringify({ operations: ops }) }); const t = await x.text(); return { ok: x.ok, t }; }
const ph = (t) => ({ text: t });

const HEADLINES = ["Same Yacht, €279 Less", "Rivals Start at €499", "Whole Yacht From €220", "No Concierge Markup", "Book Direct, Not a Broker", "TÜRSAB A-Group #14316", "Captain & Crew Included", "We Reply in Minutes", "Private Bosphorus Yacht", "50,000+ Guests Hosted", "Whole Boat, Sold Direct", "Skip the OTA Markup", "2-Hour Private Charter", "No Reseller Commission", "Instant WhatsApp Quote"];
const DESCRIPTIONS = ["Charter the whole yacht direct from €220 — no concierge or OTA markup, crew included.", "Same boat rivals list at €499. Book direct on WhatsApp, TÜRSAB-licensed since 2001.", "Premium Bosphorus yacht, whole boat from €220. We reply in minutes on WhatsApp.", "TÜRSAB A-Group #14316 since 2001, 50,000+ guests. Book direct, skip the markup."];
const GROUPS = ["AG-H — Luxury / Hotel-capture — EN", "AG-G — Private Charter — EN", "AG-M — Head Exact — EN"];

TKN = await token();
for (const gname of GROUPS) {
  const rows = await srch(`SELECT ad_group.resource_name, ad_group_ad.ad.final_urls, ad_group_ad.ad.responsive_search_ad.path1, ad_group_ad.ad.responsive_search_ad.path2 FROM ad_group_ad WHERE campaign.id = 23959940309 AND ad_group.name = "${gname}" AND ad_group_ad.status != 'REMOVED' LIMIT 1`).catch((e) => { console.log("  err", gname, e.message.slice(0, 80)); return []; });
  if (!rows.length) { console.log("  no ad/group:", gname); continue; }
  const agRN = rows[0].adGroup.resourceName;
  const finalUrls = rows[0].adGroupAd.ad.finalUrls || ["https://merrysails.com/yacht-charter-istanbul"];
  const rsa = { headlines: HEADLINES.map(ph), descriptions: DESCRIPTIONS.map(ph) };
  const p1 = rows[0].adGroupAd.ad.responsiveSearchAd?.path1; const p2 = rows[0].adGroupAd.ad.responsiveSearchAd?.path2;
  if (p1) rsa.path1 = p1; if (p2) rsa.path2 = p2;
  const o = await mut("adGroupAds", [{ create: { adGroup: agRN, status: "ENABLED", ad: { finalUrls, responsiveSearchAd: rsa } } }]);
  console.log(`  ${gname.split(" — ")[0]}: new wedge RSA ${o.ok ? "✓ created (15 H / 4 D)" : "✗ " + o.t.slice(0, 200)}`);
}
