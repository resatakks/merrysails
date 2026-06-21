#!/usr/bin/env node
/** Add Arabic (Gulf) ad group → the now-live /yacht-charter-istanbul-ar landing page.
 *  Arabic keywords + Arabic RSA (whole-boat-direct €220 wedge + TÜRSAB + WhatsApp). */
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
async function mut(res, ops, pf) { const b = { operations: ops }; if (pf) b.partialFailure = true; const x = await fetch(`https://googleads.googleapis.com/${API}/customers/${cid}/${res}:mutate`, { method: "POST", headers: H(), body: JSON.stringify(b) }); const t = await x.text(); return { ok: x.ok, t }; }
const ph = (t) => ({ text: t });
const campaignRN = `customers/${cid}/campaigns/23959940309`;
const AR_PAGE = "https://merrysails.com/yacht-charter-istanbul-ar";

const KW = ["إيجار يخت اسطنبول", "يخت خاص اسطنبول", "تأجير يخت البوسفور", "يخت خاص البوسفور", "ايجار قارب اسطنبول", "رحلة يخت خاصة اسطنبول", "تأجير يخت خاص اسطنبول"];
const HEADLINES = ["يخت خاص من €220", "القارب كامل مباشرة", "بدون عمولة وكلاء", "رخصة TÜRSAB A", "احجز عبر واتساب", "الكابتن والطاقم مشمول", "يخت البوسفور الفاخر", "رد خلال دقائق", "أكثر من 50000 ضيف", "احجز مباشرة ووفّر"];
const DESCRIPTIONS = ["استأجر اليخت كاملاً مباشرة من €220 — بدون عمولة فنادق أو وكلاء، الطاقم مشمول.", "يخت البوسفور الفاخر، القارب كامل من €220. رخصة TÜRSAB منذ 2001. احجز عبر واتساب."];

TKN = await token();
const agR = await mut("adGroups", [{ create: { name: "AG-AR — Gulf Arabic — AR", campaign: campaignRN, type: "SEARCH_STANDARD", status: "ENABLED", cpcBidMicros: "60000000" } }]);
let agRN;
try { agRN = JSON.parse(agR.t).results[0].resourceName; } catch { console.log("AG create FAIL:", agR.t.slice(0, 250)); process.exit(1); }
console.log("Arabic ad group created ✓ (bid ₺60)");
const kr = await mut("adGroupCriteria", KW.map((t) => ({ create: { adGroup: agRN, status: "ENABLED", keyword: { text: t, matchType: "PHRASE" } } })), true);
console.log(`Arabic keywords (${KW.length} PHRASE):`, kr.ok ? "✓" : "partial: " + kr.t.slice(0, 150));
const ar = await mut("adGroupAds", [{ create: { adGroup: agRN, status: "ENABLED", ad: { finalUrls: [AR_PAGE], responsiveSearchAd: { headlines: HEADLINES.map(ph), descriptions: DESCRIPTIONS.map(ph) } } } }]);
console.log("Arabic RSA →", AR_PAGE, ":", ar.ok ? "✓ (10 H / 2 D)" : "✗ " + ar.t.slice(0, 250));
