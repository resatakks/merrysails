#!/usr/bin/env node
/**
 * Add research-driven ad groups (DE + RU occasion long-tails + EN anniversary/bachelorette/
 * corporate/niche) and expanded negatives to the existing PAUSED MerrySails yacht campaign.
 * Run once. Campaign stays PAUSED.
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
async function mutate(resource, operations) { const r = await fetch(`https://googleads.googleapis.com/${API}/customers/${customerId}/${resource}:mutate`, { method: "POST", headers: H(), body: JSON.stringify({ operations }) }); const t = await r.text(); if (!r.ok) throw new Error(`${resource} ${r.status}: ${t}`); return JSON.parse(t); }
async function search(query) { const r = await fetch(`https://googleads.googleapis.com/${API}/customers/${customerId}/googleAds:search`, { method: "POST", headers: H(), body: JSON.stringify({ query }) }); const t = await r.text(); if (!r.ok) throw new Error(`search ${r.status}: ${t}`); return JSON.parse(t); }
const ph = (t) => ({ text: t });

const EN_H = ["Private Yacht Charter Istanbul","Rent the Whole Boat, Direct","Bosphorus Private Yacht","From €220 — 2-Hour Charter","Captain & Crew Included","No Concierge Markup","TÜRSAB Licensed Since 2001","50,000+ Guests Hosted","Book Direct, Skip the Markup","Instant WhatsApp Quote"];
const EN_D = ["Charter the whole boat from €220. Captain & crew included, no broker markup.","Premium Bosphorus yacht, TÜRSAB-licensed since 2001. Book direct on WhatsApp."];
const DE_H = ["Privatyacht Istanbul mieten","Ganzes Boot, ab €220","Yacht am Bosporus, privat","Kapitän & Crew inklusive","Ohne Concierge-Aufschlag","TÜRSAB-lizenziert seit 2001","Direkt buchen & sparen","Angebot per WhatsApp","Sonnenuntergang & Dinner","Geburtstag, Antrag, Event"];
const DE_D = ["Ganzes Luxusboot ab €220. Kapitän & Crew inklusive, kein Makler-Aufschlag.","Privatyacht am Bosporus, TÜRSAB-lizenziert seit 2001. Direkt per WhatsApp buchen."];
const RU_H = ["Частная яхта Стамбул","Целая яхта от €220","Яхта на Босфоре, приватно","Капитан и команда","Без наценки агента","Лицензия TÜRSAB с 2001","Бронируйте напрямую","Расчёт в WhatsApp","Закат и ужин на яхте","День рождения и юбилей"];
const RU_D = ["Целая люксовая яхта от €220. Капитан и команда включены, без наценок.","Частная яхта на Босфоре, лицензия TÜRSAB с 2001. Бронируйте в WhatsApp."];
const FIN_EN = ["https://merrysails.com/yacht-charter-istanbul"];
const FIN_DE = ["https://merrysails.com/de/yacht-charter-istanbul"];
const FIN_RU = ["https://merrysails.com/ru/yacht-charter-istanbul"];

const NEW_AGS = [
  { name: "AG-D — Anniversary/Honeymoon — EN", h1: "Anniversary Yacht Istanbul", bid: 900000, base: EN_H, desc: EN_D, final: FIN_EN, kws: ["anniversary yacht cruise istanbul","honeymoon yacht istanbul","romantic private boat istanbul","private yacht bosphorus for couples"] },
  { name: "AG-F — Bachelorette/Bachelor — EN", h1: "Bachelorette Yacht Istanbul", bid: 800000, base: EN_H, desc: EN_D, final: FIN_EN, kws: ["bachelorette party yacht istanbul","hen party boat istanbul","bachelor party yacht istanbul"] },
  { name: "AG-K — Corporate — EN", h1: "Corporate Yacht Istanbul", bid: 1300000, base: EN_H, desc: EN_D, final: FIN_EN, kws: ["corporate yacht charter istanbul","company boat event istanbul","corporate boat charter bosphorus"] },
  { name: "AG-N — Day/Photo niche — EN", h1: "Private Yacht Day & Photo", bid: 700000, base: EN_H, desc: EN_D, final: FIN_EN, kws: ["private yacht photoshoot istanbul","yacht swimming tour istanbul","private boat day charter bosphorus","private bosphorus cruise small group"] },
  { name: "AG-L — Rent/Hire long-tail — EN", h1: "Rent a Yacht in Istanbul", bid: 1600000, base: EN_H, desc: EN_D, final: FIN_EN, kws: ["private yacht rental istanbul bosphorus","rent a yacht istanbul","private boat hire istanbul","luxury yacht charter istanbul whole boat"] },
  { name: "AG-DE — German Occasions — DE", h1: "Privatyacht Istanbul mieten", bid: 1000000, base: DE_H, desc: DE_D, final: FIN_DE, kws: ["yacht mieten istanbul","privatyacht mieten istanbul bosporus","private bootstour istanbul","heiratsantrag boot istanbul","geburtstag yacht istanbul","romantische bootsfahrt istanbul","luxusyacht charter istanbul","junggesellenabschied istanbul boot"] },
  { name: "AG-RU — Russian Occasions — RU", h1: "Частная яхта Стамбул", bid: 800000, base: RU_H, desc: RU_D, final: FIN_RU, kws: ["аренда яхты стамбул","частная яхта стамбул","прогулка на яхте босфор","яхта на день рождения стамбул","предложение руки на яхте стамбул","романтическая прогулка на яхте стамбул","аренда яхты стамбул цена"] },
];

const MORE_NEG2 = ["satılık","satılık tekne","satılık yat","greece","greek islands","mykonos","santorini","dubai","cyprus","cesme","fethiye","antalya","kayak","canoe","scuba","diving","gulet cabin charter","cabin charter","water taxi","banana boat","speed boat ride","sehir hatlari","hop on hop off","per head","discount code","coupon","how to","wikipedia","nedir","meaning","weather","yacht maintenance","boat repair","mooring","berth rental","sailing lessons","sailing school","stewardess job","careers","internship","remote control boat","toy boat"];

(async () => {
  TKN = await token();
  const c = await search(`SELECT campaign.resource_name FROM campaign WHERE campaign.name = 'MS — Yacht Charter — Search — Intent' AND campaign.status != 'REMOVED'`);
  const campaignRN = c.results?.[0]?.campaign?.resourceName;
  if (!campaignRN) { console.error("Campaign not found"); process.exit(1); }
  console.log("Campaign:", campaignRN);

  // expanded negatives
  try { await mutate("campaignCriteria", MORE_NEG2.map(k => ({ create: { campaign: campaignRN, negative: true, keyword: { text: k, matchType: "BROAD" } } }))); console.log("Expanded negatives added:", MORE_NEG2.length); } catch (e) { console.log("NEG2 FAIL:", e.message.slice(0, 200)); }

  // new ad groups
  for (const ag of NEW_AGS) {
    try {
      const agR = await mutate("adGroups", [{ create: { name: ag.name, campaign: campaignRN, type: "SEARCH_STANDARD", status: "ENABLED", cpcBidMicros: String(ag.bid) } }]);
      const agRN = agR.results[0].resourceName;
      await mutate("adGroupCriteria", ag.kws.map(t => ({ create: { adGroup: agRN, status: "ENABLED", keyword: { text: t, matchType: "PHRASE" } } })));
      const headlines = [...new Set([ag.h1, ...ag.base])].slice(0, 15).map(ph);
      await mutate("adGroupAds", [{ create: { adGroup: agRN, status: "ENABLED", ad: { finalUrls: ag.final, responsiveSearchAd: { headlines, descriptions: ag.desc.map(ph) } } } }]);
      console.log(`  AG ✓ ${ag.name} — ${ag.kws.length} kw, RSA → ${ag.final[0].replace("https://merrysails.com","")}`);
    } catch (e) { console.log(`  AG FAIL ${ag.name}:`, e.message.slice(0, 240)); }
  }
  console.log("=== ADD-RESEARCH DONE (campaign still PAUSED) ===");
})().catch(e => { console.error("FATAL:", e.message); process.exit(1); });
