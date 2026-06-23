#!/usr/bin/env node
/**
 * Rebalance MerrySails ads to the operator's 2026-06-22 plan:
 *  1. Yacht campaign budget ₺1000 → ₺700 (70%)
 *  2. Yacht: drop the Turkey-PRESENCE exclusion + add Istanbul presence
 *     → reach FOREIGN tourists already in Istanbul (language filter en/de/ru/ar
 *     keeps Turkish residents out). Highest-intent untapped segment.
 *  3. Create "MS — Sunset Cruise — Search — Intent" at ₺300/day (30%)
 *     — real prices (from €30 Mon/Tue/Thu), WhatsApp + Call + sitelink assets,
 *     same foreign + Istanbul geo. Sunset converts self-serve (submit) easier
 *     than yacht. NO dinner (operator: margin too thin).
 * Idempotent guards: skips sunset create if it already exists.
 */
import fs from "fs";
import path from "path";

const API = "v21";
const root = path.dirname(new URL(import.meta.url).pathname).replace(/\/scripts$/, "");
const env = {};
for (const line of fs.readFileSync(path.join(root, ".env.local"), "utf8").split("\n")) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/); if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
const cid = env.GOOGLE_ADS_CUSTOMER_ID.replace(/-/g, "");
let TKN;
const token = async () => {
  const r = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ client_id: env.GOOGLE_ADS_CLIENT_ID, client_secret: env.GOOGLE_ADS_CLIENT_SECRET, refresh_token: env.GOOGLE_ADS_REFRESH_TOKEN, grant_type: "refresh_token" }) });
  return (await r.json()).access_token;
};
const H = () => ({ Authorization: `Bearer ${TKN}`, "developer-token": env.GOOGLE_ADS_DEVELOPER_TOKEN, "Content-Type": "application/json" });
const mutate = async (resource, operations) => {
  const r = await fetch(`https://googleads.googleapis.com/${API}/customers/${cid}/${resource}:mutate`, { method: "POST", headers: H(), body: JSON.stringify({ operations }) });
  const t = await r.text(); if (!r.ok) throw new Error(`${resource} ${r.status}: ${t.slice(0, 400)}`); return JSON.parse(t);
};
const search = async (query) => {
  const r = await fetch(`https://googleads.googleapis.com/${API}/customers/${cid}/googleAds:search`, { method: "POST", headers: H(), body: JSON.stringify({ query }) });
  const t = await r.text(); if (!r.ok) throw new Error(`search ${r.status}: ${t.slice(0, 300)}`); return JSON.parse(t);
};
const ph = (t) => ({ text: t });

// foreign source markets (EU + RU/UA + Gulf/Arab + key English) — matches DB nationalities
const GEO_COUNTRIES = [2826, 2840, 2276, 2250, 2528, 2380, 2724, 2643, 2804, 2616, 2682, 2784, 2414, 2634, 2124, 2036, 2056, 2208, 2372, 2752, 2756];
const LANGS = [1000, 1001, 1002, 1019, 1031]; // en, de, fr, ar, ru
const FINAL = ["https://merrysails.com/cruises/bosphorus-sunset-cruise"];

const SUNSET_HEADLINES = [
  "Bosphorus Sunset Cruise", "Sunset Cruise From €30", "Golden Hour on the Bosphorus",
  "Book Direct on WhatsApp", "TURSAB Licensed Since 2001", "Daily Sunset Departures",
  "Shared & Private Options", "Reserve Online in 2 Min", "Call or WhatsApp to Book",
  "No Booking Fees, Direct", "Istanbul Sunset by Boat", "50,000+ Guests Hosted",
  "Sunset Over Two Continents", "Kids Under 3 Sail Free", "Live Bosphorus Sunset",
];
const SUNSET_DESCRIPTIONS = [
  "Golden-hour Bosphorus sunset cruise from €30. Book direct on WhatsApp — no markup.",
  "Daily sunset departures, TURSAB licensed since 2001. Reserve online or message us.",
  "Sunset over the Bosphorus from €30 (Mon/Tue/Thu). Instant WhatsApp confirmation.",
  "Shared & private sunset cruises. Kids under 3 free. Book direct, skip the fees.",
];
const SUNSET_AGS = [
  { name: "AG-S1 — Sunset Core — EXACT", exact: true, bid: 45_000_000, h1: "Bosphorus Sunset Cruise",
    kws: ["bosphorus sunset cruise", "sunset cruise istanbul", "istanbul sunset cruise", "sunset cruise bosphorus"] },
  { name: "AG-S2 — Sunset Boat — PHRASE", exact: false, bid: 42_000_000, h1: "Istanbul Sunset by Boat",
    kws: ["sunset boat tour istanbul", "bosphorus sunset boat tour", "sunset cruise bosphorus istanbul", "istanbul sunset boat"] },
];
const SUNSET_SITELINKS = [
  { linkText: "WhatsApp to Book", url: "https://wa.me/905448989812?text=Hi%2C%20I%27d%20like%20to%20book%20a%20Bosphorus%20sunset%20cruise", d1: "Instant confirmation", d2: "We reply in minutes" },
  { linkText: "Sunset Prices & Times", url: "https://merrysails.com/cruises/bosphorus-sunset-cruise", d1: "From €30 Mon/Tue/Thu", d2: "Daily departures" },
  { linkText: "Private Sunset for Two", url: "https://merrysails.com/yacht-charter-istanbul", d1: "Romantic golden hour", d2: "Whole boat option" },
  { linkText: "All Bosphorus Cruises", url: "https://merrysails.com/bosphorus-cruise", d1: "Compare options", d2: "Book direct, no markup" },
];
const SUNSET_CALLOUTS = ["From €30", "Daily Departures", "No Booking Fees", "TURSAB Licensed", "Free Cancellation", "Book on WhatsApp"];
const NEG = ["transfer", "taxi", "taksi", "airport", "havalimani", "vip transfer", "free", "cheapest", "jobs", "for sale", "ferry timetable", "public ferry", "dinner show"];

(async () => {
  TKN = await token();

  // ---- 1. Yacht budget → ₺700 ----
  try {
    const y = await search(`SELECT campaign.campaign_budget FROM campaign WHERE campaign.name = 'MS — Yacht Charter — Search — Intent' AND campaign.status != 'REMOVED'`);
    const budRN = y.results[0].campaign.campaignBudget;
    await mutate("campaignBudgets", [{ update: { resourceName: budRN, amountMicros: String(700 * 1_000_000) }, updateMask: "amount_micros" }]);
    console.log("✅ Yacht budget → ₺700");
  } catch (e) { console.log("✗ YACHT BUDGET:", e.message.slice(0, 200)); }

  // ---- 2. Yacht in-Istanbul: drop TR exclusion + add Istanbul presence ----
  let istanbulId = null;
  try {
    const sg = await fetch(`https://googleads.googleapis.com/${API}/geoTargetConstants:suggest`, { method: "POST", headers: H(), body: JSON.stringify({ locale: "en", countryCode: "TR", locationNames: { names: ["Istanbul"] } }) });
    const sj = await sg.json();
    const hit = (sj.geoTargetConstantSuggestions || []).find(s => /Istanbul/i.test(s.geoTargetConstant?.canonicalName || "") && s.geoTargetConstant?.targetType === "City") || (sj.geoTargetConstantSuggestions || [])[0];
    istanbulId = hit ? Number(hit.geoTargetConstant.id) : null;
    console.log("Istanbul geo:", istanbulId, hit?.geoTargetConstant?.canonicalName);
  } catch (e) { console.log("✗ ISTANBUL RESOLVE:", e.message.slice(0, 120)); }
  try {
    const yc = await search(`SELECT campaign.resource_name FROM campaign WHERE campaign.name = 'MS — Yacht Charter — Search — Intent' AND campaign.status != 'REMOVED'`);
    const yRN = yc.results[0].campaign.resourceName;
    // find + remove the Turkey (2792) PRESENCE negative location criterion
    const negc = await search(`SELECT campaign_criterion.resource_name, campaign_criterion.location.geo_target_constant FROM campaign_criterion WHERE campaign.resource_name = '${yRN}' AND campaign_criterion.type = 'LOCATION' AND campaign_criterion.negative = true`);
    const trNeg = (negc.results || []).filter(r => /geoTargetConstants\/2792$/.test(r.campaignCriterion.location.geoTargetConstant));
    if (trNeg.length) { await mutate("campaignCriteria", trNeg.map(r => ({ remove: r.campaignCriterion.resourceName }))); console.log("✅ Yacht: removed TR-presence exclusion"); }
    else console.log("· Yacht: no TR exclusion found (already clean)");
    // idempotent: only add Istanbul if not already a positive location target
    const posLoc = await search(`SELECT campaign_criterion.location.geo_target_constant FROM campaign_criterion WHERE campaign.resource_name = '${yRN}' AND campaign_criterion.type = 'LOCATION' AND campaign_criterion.negative = false`);
    const hasIst = (posLoc.results || []).some(r => new RegExp(`geoTargetConstants/${istanbulId}$`).test(r.campaignCriterion.location.geoTargetConstant));
    if (istanbulId && !hasIst) { await mutate("campaignCriteria", [{ create: { campaign: yRN, location: { geoTargetConstant: `geoTargetConstants/${istanbulId}` } } }]); console.log("✅ Yacht: added Istanbul presence target"); }
    else console.log("· Yacht: Istanbul already targeted (skip)");
  } catch (e) { console.log("✗ YACHT GEO:", e.message.slice(0, 220)); }

  // ---- 3. Create Sunset campaign ₺300 ----
  try {
    const exists = await search(`SELECT campaign.resource_name FROM campaign WHERE campaign.name = 'MS — Sunset Cruise — Search — Intent' AND campaign.status != 'REMOVED'`);
    if (exists.results?.length) { console.log("· Sunset campaign already exists — skipping create"); }
    else {
      const bud = await mutate("campaignBudgets", [{ create: { name: `MS Sunset Search Budget ${Date.now()}`, amountMicros: String(300 * 1_000_000), deliveryMethod: "STANDARD", explicitlyShared: false } }]);
      const budRN = bud.results[0].resourceName;
      const camp = await mutate("campaigns", [{ create: {
        name: "MS — Sunset Cruise — Search — Intent", status: "ENABLED", advertisingChannelType: "SEARCH",
        containsEuPoliticalAdvertising: "DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING",
        manualCpc: { enhancedCpcEnabled: false }, campaignBudget: budRN,
        networkSettings: { targetGoogleSearch: true, targetSearchNetwork: false, targetContentNetwork: false, targetPartnerSearchNetwork: false },
        geoTargetTypeSetting: { positiveGeoTargetType: "PRESENCE_OR_INTEREST", negativeGeoTargetType: "PRESENCE" },
      } }]);
      const cRN = camp.results[0].resourceName;
      console.log("✅ Sunset campaign created:", cRN);
      // geo (foreign + Istanbul), languages
      const geoIds = istanbulId ? [...GEO_COUNTRIES, istanbulId] : GEO_COUNTRIES;
      await mutate("campaignCriteria", geoIds.map(id => ({ create: { campaign: cRN, location: { geoTargetConstant: `geoTargetConstants/${id}` } } })));
      await mutate("campaignCriteria", LANGS.map(lid => ({ create: { campaign: cRN, type: "LANGUAGE", language: { languageConstant: `languageConstants/${lid}` } } })));
      await mutate("campaignCriteria", NEG.map(k => ({ create: { campaign: cRN, negative: true, keyword: { text: k, matchType: "BROAD" } } })));
      console.log("  geo:", geoIds.length, "| langs:", LANGS.length, "| negatives:", NEG.length);
      // ad groups + keywords + RSA
      for (const ag of SUNSET_AGS) {
        const agR = await mutate("adGroups", [{ create: { name: ag.name, campaign: cRN, type: "SEARCH_STANDARD", status: "ENABLED", cpcBidMicros: String(ag.bid) } }]);
        const agRN = agR.results[0].resourceName;
        await mutate("adGroupCriteria", ag.kws.map(t => ({ create: { adGroup: agRN, status: "ENABLED", keyword: { text: t, matchType: ag.exact ? "EXACT" : "PHRASE" } } })));
        const headlines = [...new Set([ag.h1, ...SUNSET_HEADLINES])].slice(0, 15).map(ph);
        await mutate("adGroupAds", [{ create: { adGroup: agRN, status: "ENABLED", ad: { finalUrls: FINAL, responsiveSearchAd: { headlines, descriptions: SUNSET_DESCRIPTIONS.map(ph) } } } }]);
        console.log("  ✅ ad group:", ag.name, `(${ag.kws.length} kw)`);
      }
      // assets: call + sitelinks + callouts
      try {
        const a = await mutate("assets", [{ create: { callAsset: { countryCode: "TR", phoneNumber: "544 898 98 12", callConversionReportingState: "USE_ACCOUNT_LEVEL_CALL_CONVERSION_ACTION" } } }]);
        await mutate("campaignAssets", [{ create: { campaign: cRN, asset: a.results[0].resourceName, fieldType: "CALL" } }]); console.log("  ✅ call asset");
      } catch (e) { console.log("  ✗ call:", e.message.slice(0, 120)); }
      for (const s of SUNSET_SITELINKS) {
        try { const a = await mutate("assets", [{ create: { finalUrls: [s.url], sitelinkAsset: { linkText: s.linkText, description1: s.d1, description2: s.d2 } } }]);
          await mutate("campaignAssets", [{ create: { campaign: cRN, asset: a.results[0].resourceName, fieldType: "SITELINK" } }]); console.log("  ✅ sitelink:", s.linkText);
        } catch (e) { console.log("  ✗ sitelink", s.linkText, e.message.slice(0, 80)); }
      }
      for (const txt of SUNSET_CALLOUTS) {
        try { const a = await mutate("assets", [{ create: { calloutAsset: { calloutText: txt } } }]);
          await mutate("campaignAssets", [{ create: { campaign: cRN, asset: a.results[0].resourceName, fieldType: "CALLOUT" } }]); console.log("  ✅ callout:", txt);
        } catch (e) { console.log("  ✗ callout", txt, e.message.slice(0, 80)); }
      }
    }
  } catch (e) { console.log("✗ SUNSET CAMPAIGN:", e.message.slice(0, 400)); }

  console.log("=== REBALANCE DONE ===");
})().catch(e => { console.error("FATAL:", e.message); process.exit(1); });
