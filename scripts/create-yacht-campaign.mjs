#!/usr/bin/env node
/**
 * One-shot: create the MerrySails yacht-charter Search campaign PAUSED (zero spend
 * until the operator enables in the UI). Creates budget + campaign + geo + language
 * + negatives + 6 core EN ad groups (keywords + RSA). Reads creds from .env.local.
 * Run: node scripts/create-yacht-campaign.mjs
 */
import fs from "fs";
import path from "path";

const API = "v20";
const root = path.dirname(new URL(import.meta.url).pathname).replace(/\/scripts$/, "");
const env = {};
for (const line of fs.readFileSync(path.join(root, ".env.local"), "utf8").split("\n")) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
const customerId = env.GOOGLE_ADS_CUSTOMER_ID?.replace(/-/g, "");
const creds = {
  customerId,
  developerToken: env.GOOGLE_ADS_DEVELOPER_TOKEN,
  refreshToken: env.GOOGLE_ADS_REFRESH_TOKEN,
  clientId: env.GOOGLE_ADS_CLIENT_ID,
  clientSecret: env.GOOGLE_ADS_CLIENT_SECRET,
};
for (const [k, v] of Object.entries(creds)) if (!v) { console.error("MISSING cred:", k); process.exit(1); }

async function token() {
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_id: creds.clientId, client_secret: creds.clientSecret, refresh_token: creds.refreshToken, grant_type: "refresh_token" }),
  });
  if (!r.ok) throw new Error("OAuth " + r.status + " " + await r.text());
  return (await r.json()).access_token;
}
let TKN;
const H = () => ({ Authorization: `Bearer ${TKN}`, "developer-token": creds.developerToken, "Content-Type": "application/json" });
async function mutate(resource, operations) {
  const r = await fetch(`https://googleads.googleapis.com/${API}/customers/${customerId}/${resource}:mutate`, { method: "POST", headers: H(), body: JSON.stringify({ operations }) });
  const t = await r.text();
  if (!r.ok) throw new Error(`${resource} ${r.status}: ${t}`);
  return JSON.parse(t);
}

const NEGATIVES = ["transfer","taxi","taksi","airport","havalimanı","vip transfer","cheap","free","affordable","ferry","public","shared","ticket","price per person","per person","job","jobs","salary","for sale","buy yacht","yacht for sale","license","captain course","crew jobs","rental car","apartment","hotel room","fishing","parasailing","jet ski","ferry schedule"];

const FINAL = ["https://merrysails.com/yacht-charter-istanbul"];
const BASE_HEADLINES = ["Private Yacht Charter Istanbul","Rent the Whole Boat, Direct","Bosphorus Private Yacht","From €220 — 2-Hour Charter","Captain & Crew Included","No Concierge Markup","TÜRSAB Licensed Since 2001","50,000+ Guests Hosted","Book Direct, Skip the Markup","Instant WhatsApp Quote"];
const DESCRIPTIONS = ["Charter the whole boat for 12–150 guests. Sunset, dinner or custom route. From €220, no broker fees — quote in minutes on WhatsApp.","Premium Bosphorus yacht, captain + crew included. TÜRSAB-A licensed, 50,000+ guests since 2001. Book direct, skip the concierge markup."];
const ph = (t) => ({ text: t });

const AD_GROUPS = [
  { name: "AG-A — Yacht Birthday — EN", h1: "Birthday Yacht on the Bosphorus", bid: 900000, kws: ["yacht birthday party istanbul","birthday boat istanbul","private yacht birthday bosphorus","birthday yacht rental istanbul"] },
  { name: "AG-B — Proposal Yacht — EN", h1: "Propose on a Private Yacht", bid: 1200000, kws: ["marriage proposal yacht istanbul","proposal boat istanbul","propose on a yacht istanbul","engagement yacht bosphorus"] },
  { name: "AG-C — Couples Sunset — EN", h1: "Private Sunset Yacht for Two", bid: 1100000, kws: ["private sunset yacht istanbul","romantic sunset boat istanbul","couples yacht bosphorus","sunset yacht for two istanbul"] },
  { name: "AG-H — Luxury / Hotel-capture — EN", h1: "Luxury Private Yacht Istanbul", bid: 1800000, kws: ["luxury yacht charter istanbul","exclusive yacht bosphorus","vip yacht istanbul","private boat tour istanbul","whole boat hire istanbul"] },
  { name: "AG-G — Private Charter — EN", h1: "Private Yacht Charter Istanbul", bid: 1800000, kws: ["private yacht charter istanbul","rent a yacht bosphorus","private bosphorus yacht rental","private boat hire bosphorus"] },
  { name: "AG-M — Head Exact — EN", h1: "Istanbul Yacht Rental — Direct", bid: 1000000, exact: true, kws: ["istanbul yacht rental","istanbul yacht charter","bosphorus yacht charter"] },
];

(async () => {
  TKN = await token();
  console.log("OAuth OK. Customer:", customerId);

  // geo: Istanbul (resolve) + UK/US/DE/UAE/SA/QA/KW/RU
  let geoIds = [2826, 2840, 2276, 2784, 2682, 2634, 2414, 2643];
  try {
    const sg = await fetch(`https://googleads.googleapis.com/${API}/geoTargetConstants:suggest`, { method: "POST", headers: H(), body: JSON.stringify({ locale: "en", countryCode: "TR", locationNames: { names: ["Istanbul"] } }) });
    if (sg.ok) { const j = await sg.json(); const ist = (j.geoTargetConstantSuggestions||[]).find(s => s.geoTargetConstant?.name === "Istanbul"); const id = Number(ist?.geoTargetConstant?.id); if (id) { geoIds.unshift(id); console.log("Istanbul geo resolved:", id, ist.geoTargetConstant.canonicalName); } }
  } catch (e) { console.log("Istanbul geo suggest failed (country-only):", e.message); }

  // budget ₺1000/day
  const bud = await mutate("campaignBudgets", [{ create: { name: `MS Yacht Search Budget ${Date.now()}`, amountMicros: String(1000 * 1_000_000), deliveryMethod: "STANDARD", explicitlyShared: false } }]);
  const budgetRN = bud.results[0].resourceName;
  console.log("Budget created:", budgetRN, "= ₺1000/day");

  // campaign PAUSED, Search-only, manual CPC
  const camp = await mutate("campaigns", [{ create: {
    name: "MS — Yacht Charter — Search — Intent",
    status: "PAUSED",
    advertisingChannelType: "SEARCH",
    manualCpc: { enhancedCpcEnabled: false },
    campaignBudget: budgetRN,
    networkSettings: { targetGoogleSearch: true, targetSearchNetwork: false, targetContentNetwork: false, targetPartnerSearchNetwork: false },
    geoTargetTypeSetting: { positiveGeoTargetType: "PRESENCE_OR_INTEREST", negativeGeoTargetType: "PRESENCE" },
  } }]);
  const campaignRN = camp.results[0].resourceName;
  console.log("CAMPAIGN created (PAUSED):", campaignRN);

  // geo + language criteria
  await mutate("campaignCriteria", geoIds.map(id => ({ create: { campaign: campaignRN, location: { geoTargetConstant: `geoTargetConstants/${id}` } } })));
  console.log("Geo criteria added:", geoIds.length, "locations");
  await mutate("campaignCriteria", [1000, 1001, 1019, 1031].map(lid => ({ create: { campaign: campaignRN, type: "LANGUAGE", language: { languageConstant: `languageConstants/${lid}` } } })));
  console.log("Language criteria added: EN/DE/AR/RU");

  // negatives (campaign-level)
  await mutate("campaignCriteria", NEGATIVES.map(k => ({ create: { campaign: campaignRN, negative: true, keyword: { text: k, matchType: "BROAD" } } })));
  console.log("Negatives added:", NEGATIVES.length);

  // ad groups + keywords + RSA
  for (const ag of AD_GROUPS) {
    const agR = await mutate("adGroups", [{ create: { name: ag.name, campaign: campaignRN, type: "SEARCH_STANDARD", status: "ENABLED", cpcBidMicros: String(ag.bid) } }]);
    const agRN = agR.results[0].resourceName;
    await mutate("adGroupCriteria", ag.kws.map(t => ({ create: { adGroup: agRN, status: "ENABLED", keyword: { text: t, matchType: ag.exact ? "EXACT" : "PHRASE" } } })));
    const headlines = [ph(ag.h1), ...BASE_HEADLINES.map(ph)].slice(0, 15);
    await mutate("adGroupAds", [{ create: { adGroup: agRN, status: "ENABLED", ad: { finalUrls: FINAL, responsiveSearchAd: { headlines, descriptions: DESCRIPTIONS.map(ph) } } } }]);
    console.log(`  AG ✓ ${ag.name} — ${ag.kws.length} kw, RSA`);
  }

  console.log("\n=== DONE — campaign is PAUSED. Review + add assets (WhatsApp/call/sitelinks) + ENABLE in the Ads UI. ===");
  console.log("Campaign:", campaignRN);
})().catch(e => { console.error("\nFAILED:", e.message); process.exit(1); });
