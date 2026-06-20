# MerrySails Yacht-Charter Ads — LAUNCH-READY PLAN (2026-06-20, FINAL)

Companion to `MERRYSAILS-YACHT-ADS-RESEARCH-2026-06-19.md` (the full verdict + math).
This is the copy-paste-executable config the operator approves. **Yacht-only. Search-only. All ads → `/yacht-charter-istanbul`. Real per-vessel prices only. Spend nothing until operator says "go" AND tracking prereqs (§8) are green.**

Account: `AW-18112460958` · GA4 `G-9B3Q7FM7X8` · Phone/WhatsApp `+90 544 898 98 12`.

---

## 0. Headline decisions (operator's 4 questions answered)
- **Otel lokasyonları (geo):** "Çırağan/Rixos/Four Seasons çevresine geo-radius reklam" fikri **mekanik olarak çalışmaz** — radius "zengin/turist" diyemez; locals + otel personeli + komütör yakalar, in-room misafir zaten concierge'den alır. **DOĞRU mekanik:** geo = **kaynak ülke** (UK/US/DE + Körfez/RU) "Presence OR interest" + **küçük +%15-30 bid modifier** Beşiktaş–Ortaköy–Bebek / Kabataş–Karaköy / Sultanahmet sahil-otel kümesine. Otel açısı = **MESAJ + bid sinyali**, harita pin'i değil. Concierge kanalı = **off-platform partnership track**, Ads layer DEĞİL.
- **Hedef kitle (turist):** En değerli alıcı **seyahatten ÖNCE evden** booking yapan planlayıcı (booking window 49+ gün) — "Presence or interest" location ayarı bunu yakalar (Travel vertical ~+%5 conv). Audiences **observe-mode 14 gün**, sonra top-converting segment'e +%15-40 bid.
- **Test:** ₺1.000/gün (2.000 DEĞİL), Search-only, manual CPC bid-cap, EN core + DE/AR/RU split ad-grupları. **Kill: €600-750 harcamada <2 charter booking (CPA>€350) → durdur.** Ölçülecek = **gerçek reservation submit**, WhatsApp click DEĞİL.
- **Undercut açısı (gerçek):** concierge/broker'a göre belirgin ucuz. Hook: *"From €220 — the whole boat, direct. No concierge markup, no broker commission."* Otel ADI yazma (karşılaştırmalı reklam riski). Asla €/saat uydurma — flat per-experience fiyat: **€220'den**.

---

## 1. Campaign shell (create in Ads UI/Editor — see §9 why)
`MS — Yacht Charter — Search — Intent`
- Type: **Search only** · Networks: Search partners OFF, Display Expansion OFF
- Bidding: **Manual CPC with "Maximize clicks" + bid cap** (NOT tCPA — too little conv volume at ₺1k/day to train; migrate to tCPA only after ~30 conversions)
- Budget: **₺1.000/gün** · Safety cap already `GOOGLE_ADS_SAFETY_DAILY_CAP_TRY=2000`
- Conversion goal: **single — Purchase/reservation** (WhatsApp/Phone = secondary, NOT bidding target — see §8 Gap A)
- **PMax OFF** · **AI Max OFF** · **Final URL Expansion OFF** (blog/guide pages would absorb spend)
- Location option: **"Presence or interest"** (critical — captures pre-trip planners in home country)
- Languages: English + German + Arabic + Russian (so native-language ads serve)
- Ad rotation: optimize · Devices: all, **mobile +10-20%**

---

## 2. Geo / location targeting (the "tourist in hotel districts" fix, done correctly)
**Targets (each as its OWN geo so bids + reports separate):**
1. **Istanbul (city)** — presence (in-destination tourists already searching)
2. **United Kingdom** — interest (primary source market, ~1200/mo EN)
3. **United States** — interest (EN tourists, high AOV)
4. **Germany** — interest (DE ad group)
5. **Gulf — UAE, Saudi Arabia, Qatar, Kuwait** — interest (AR proposal/honeymoon/birthday, high AOV)
6. **Russia + CIS (RU, UA, KZ)** — interest (RU sunset-couples/honeymoon/bachelorette)

**Hotel-waterfront bid modifiers (the operator's instinct, as a bid signal not a radius):**
- **+15-30%** location bid modifier on Beşiktaş–Ortaköy–Bebek, Kabataş–Karaköy, Sultanahmet sahil-otel zones (lobide "istanbul private yacht" arayan misafir = ideal click).
- This layers ON TOP of the city target — does not throw away pre-trip demand.

**Negatives geo:** exclude nothing initially; review search-terms by country after 7 days.

---

## 3. Ad groups + keywords (occasion long-tails = cheap, OTA-free lane)
> Volumes are Planner-band estimates — **verify in Keyword Planner (Istanbul + each source country) before locking bids.** All keywords PHRASE or EXACT — **NO broad**. All → `/yacht-charter-istanbul`.

### Budget split (₺1.000/gün)
| Tier | Ad groups | Share | ~₺/day |
|---|---|---|---|
| **P0 occasions** | Birthday · Proposal · Couples-Sunset | ~60% | ₺600 |
| **P1 private-charter mid-tail + occasions** | Private-Charter generic · Honeymoon · Anniversary · Bachelorette | ~25% | ₺250 |
| **P2 head-term (capped) + corporate** | Istanbul Yacht Rental (exact, low-bid, observe) · Corporate | ~15% | ₺150 |

### AG-A — Yacht Birthday (P0, EN; AR+RU mirrors)
`"yacht birthday party istanbul"`, `"birthday boat istanbul"`, `"private yacht birthday bosphorus"`, `[yacht birthday istanbul]`
Est. 70-140/mo · CPC €0.40-0.90 · bid cap ~€0.90

### AG-B — Marriage Proposal Yacht (P0, EN; AR mirror)
`"marriage proposal yacht istanbul"`, `"proposal boat istanbul"`, `"propose on a yacht istanbul"`, `"engagement yacht bosphorus"`, `[proposal yacht istanbul]`
Est. 90-170/mo · CPC €0.60-1.20 · highest emotion + AOV · bid cap ~€1.20

### AG-C — Couples Sunset Yacht (P0, EN; AR+RU+DE mirrors)
`"private sunset yacht istanbul"`, `"romantic sunset boat istanbul"`, `"couples yacht bosphorus"`, `"sunset yacht for two istanbul"`
Est. 110-210/mo · CPC €0.50-1.10 · bid cap ~€1.10

### AG-D — Anniversary / Romantic (P1, EN; AR mirror)
`"anniversary yacht istanbul"`, `"romantic boat istanbul"`, `"romantic yacht charter bosphorus"`
Est. 40-90/mo · CPC €0.40-0.90 · bid cap ~€0.90

### AG-E — Honeymoon Yacht (P1, EN; AR+RU mirrors)
`"honeymoon yacht bosphorus"`, `"honeymoon cruise istanbul"`, `"honeymoon boat istanbul"`
Est. 50-110/mo · CPC €0.50-1.00 · pre-trip intent → "presence or interest" essential · bid cap ~€1.00

### AG-F — Bachelorette / Hen (P1, EN; RU mirror)
`"bachelorette yacht istanbul"`, `"hen party boat istanbul"`, `"bachelorette boat bosphorus"`
Est. 30-70/mo · CPC €0.35-0.80 · bid cap ~€0.80

### AG-G — Private Charter generic (P1, EN; AR+RU+DE mirrors)
`"private yacht charter istanbul"`, `"rent a yacht bosphorus"`, `"private bosphorus yacht rental"`, `"luxury yacht charter istanbul"`, `"private boat hire bosphorus"`
Est. 250-450/mo · CPC €1.20-2.20 · bid-capped ~€1.80

### AG-H — Corporate Yacht (P2 lead, EN; DE mirror)
`"corporate yacht istanbul"`, `"company boat event istanbul"`, `"corporate boat charter bosphorus"`
Est. 40-90/mo · CPC €0.60-1.30 · B2B high-AOV · bid cap ~€1.30

### AG-I — Head term (P2, EXACT only, observe, low bid)
`[istanbul yacht rental]`, `[istanbul yacht charter]`
Est. 700-1300/mo · CPC €1.80-3.00+ · **OTA bloodbath** — exact-match, low bid (~€1.00), let organic carry it. Add as observation; pause if CPA blows out.

---

## 4. Multi-language plan (single account, native ad-group splits)
- **EN** — core across ALL occasions (broadest international tourist base). Build first.
- **AR** — strongest for Proposal / Honeymoon / Birthday / Couples-Sunset (Gulf luxury-leisure, high AOV). **Requires AR ad copy.** Build AR ad groups only after AR landing variant or at minimum AR RSA copy is ready.
- **RU** — Couples-Sunset / Honeymoon / Bachelorette / Birthday (CIS leisure). Route via RU geo + Russian copy.
- **DE** — Private-Charter mid-tail + Corporate (weaker on emotional long-tails). DE ad group → DE ad copy.
- **Rollout order:** Week 1 = all EN ad groups live. Week 2 = DE + AR mirrors on the converting occasions. RU after first read on CIS geo demand.
- Language criterion via API `create_language_ad_group` `languageId`: EN `1000`, DE `1001`, AR `1019`, RU `1031`.

---

## 5. Negative keywords (LOCKED — apply campaign-level via `add_negatives`)
**Mission-brief mandatory:** `transfer`, `taxi`, `taksi`, `airport`, `havalimanı`, `vip transfer`
**Yacht-context noise:** `cheap`, `free`, `affordable`, `ferry`, `public`, `shared`, `ticket`, `price per person`, `per person`
**Non-buyer / commercial-other:** `job`, `jobs`, `salary`, `for sale`, `buy yacht`, `yacht for sale`, `license`, `captain course`, `crew jobs`, `rental car`, `apartment`, `hotel`
**Wrong-product:** `fishing`, `parasailing`, `jet ski`, `ferry schedule`

---

## 6. Ad assets (RSA copy — real prices only)
**Landing page:** `/yacht-charter-istanbul` (NOT homepage). H1 restored 2026-06-19, €220 correct, 6-vessel fleet. Image assets: `public/images/tours/yacht-charter-in-istanbul/01-06.webp` + `public/images/fleet/`.

**Headlines (EN — pin H1 to occasion per ad group):**
`Private Yacht Charter Istanbul` · `Rent the Whole Boat, Direct` · `Bosphorus Private Yacht` · `From €220 — 2-Hour Charter` · `Captain & Crew Included` · `No Concierge Markup` · `TÜRSAB Licensed Since 2001` · `50,000+ Guests Hosted` · `Book Direct & Save vs Broker` · `Instant WhatsApp Quote` · `Sunset, Birthday or Proposal` · `Up to 150 Guests`
(Per-occasion AG: swap H1 → `Birthday Yacht on the Bosphorus` / `Propose on a Private Yacht` / `Private Sunset Yacht for Two`.)

**Descriptions:**
1. `Charter the whole boat for 12–150 guests. Sunset, dinner or custom route. Direct prices from €220, no broker fees — quote in minutes on WhatsApp.`
2. `Premium Bosphorus yacht, captain + crew included. TÜRSAB-A licensed, 50,000+ guests since 2001. Book direct and skip the concierge markup.`

**Sitelinks:** `Yacht Fleet & Prices` (/yacht-charter-istanbul) · `Sunset Yacht` (/cruises/bosphorus-sunset-cruise) · `Private Dinner Yacht` (/istanbul-dinner-cruise) · `WhatsApp a Quote` (wa.me link)
**Callouts:** `No Concierge Markup` · `Captain & Crew Included` · `TÜRSAB Licensed` · `50,000+ Guests` · `Free Cancellation`
**Structured snippet:** Header *Service catalog* → `Sunset Charter, Birthday, Proposal, Anniversary, Corporate, Honeymoon`

**WhatsApp + Call assets (operator requested):**
- **WhatsApp click-to-chat sitelink:** `https://wa.me/905448989812?text=Hi%2C%20I%27d%20like%20a%20private%20yacht%20charter%20quote` → fires WhatsApp Click conversion (secondary).
- **Call asset:** `+90 544 898 98 12`, call reporting ON → Phone Click conversion (secondary).
- Both are **secondary** conversions — do NOT set as bidding target (see §8 Gap A).

**Real-price reference (canonical, `src/data/fleet.ts` = source of truth):**
| Vessel | Capacity | From (2h) |
|---|---|---|
| Boutique 12 | 12 | €220 |
| Premium 15 | 15 | €320 |
| Group 40 (≤15 guests) | 40 | €380 |
| Group 40 (15–40 guests) | 40 | €500 |
| Event 90 | 90 | by quote |
| Mega 150 | 150 | by quote |
10% auto-discount from 3 hours. Never publish an hourly rate in ad copy — lead with "from €220".

---

## 7. Audience layering (observe 14 days → bid-up converters)
- **In-market:** Luxury Travel · Vacation Packages · Cruises & Charters · Hotels & Accommodations
- **Affinity:** Boating & Sailing Enthusiasts · Luxury Travelers · Luxury Shoppers · Frequently Dines Out
- **RLSA (existing):** userLists/9378861029 Site Visitors 30d (+25%) · userLists/9378861032 Cart Abandoners 60d (+50%)
- **Demographic (luxury-occasion AGs only):** skew 25-44 for Proposal/Honeymoon/Anniversary; exclude bottom income tier where lever exists.
- All **Observation** for 14 days (don't choke intent at ₺1k/day), then +15-40% on top converters.

---

## 8. Conversion-tracking prerequisites — FIX BEFORE / RIGHT-AFTER SPEND
On-site tracking is wired correctly (purchase = real DB reservation, gclid/UTM captured + persisted to `Reservation` row, EC SHA-256 hashing in place, GTM `GTM-MWVS696K` hard-blocked so no double-count). The yacht-specific holes:

- **Gap A — ⚠️ WhatsApp-close bookings uncredited + soft conversions ON.** Yacht closes happen in WhatsApp; that fires only a WhatsApp *click* conversion (hardcoded 300 TRY), never a `purchase`, and is never tied back to gclid. `NEXT_PUBLIC_GADS_DISABLE_SOFT_CONVERSIONS="false"` means Smart Bidding would chase cheap WhatsApp clicks. **Action:** keep WhatsApp/Phone/Contact as SECONDARY only (not bidding target) — which the manual-CPC + single-Purchase-goal setup in §1 already enforces. Real fix = Gap B.
- **Gap B — offline-conversion import → SKIPPED (operator decision 2026-06-20).** Too much DB/Vercel/Neon cost + complexity for the value. Few customers submit the form; most close on WhatsApp/call. **Instead, the tracked signals are:** (1) on-site reservation submit (sunset/dinner/yacht) → **Purchase** conversion with gclid (already wired + verified live), (2) ad → **WhatsApp Click** conversion (wa.me CTA), (3) ad → **Phone Click** conversion. With **manual CPC** (not Smart Bidding), keeping WhatsApp/Phone as conversions does NOT distort bidding — they're pure measurement, which is exactly what we want: read which keyword/ad group drives WhatsApp chats + calls + the occasional submit, and kill the wasteful ones. gclid/gbraid/wbraid + UTM are captured + persisted on every reservation (`@@index([gclid])`), so the ones who DO submit are fully attributed. **No offline upload route is built.**
- **Gap C — ⚠️ Currency mismatch.** Purchase value = EUR, soft conversions = TRY. Google converts both to account currency — confirm the **AW account currency** and EUR↔account FX once in the Ads UI before reading ROAS.
- **Gap D — ⚠️ EC account toggle.** Client hashing is correct, but `gtag('config','AW-…')` has no `allow_enhanced_conversions:true` and EC must be toggled ON in Ads UI (Conversions → Settings → Enhanced conversions). **Verify the toggle is ON** or the hashed user_data is ignored.
- **Gap E — ℹ️ Verify live Vercel env** has `NEXT_PUBLIC_GOOGLE_ADS_ID`, `NEXT_PUBLIC_GADS_LABEL_PURCHASE`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`. One-time Google Tag Assistant check on `merrysails.com`: `purchase` fires once with correct `send_to`, no duplicate GTM-side tag.

**Go/No-go gate:** D + E must be GREEN before spend. A is satisfied by the §1 setup. B is required before any scale beyond ₺1k.

---

## 9. Exact Google Ads API actions (`src/app/api/google-ads/campaigns/route.ts`)
**Important:** the route has **no `create_campaign` action**. Create the campaign shell + budget + bidding + geo + conversion goal in **Ads UI or Ads Editor** (§1), capture its `campaignResourceName` (`customers/<cid>/campaigns/<id>`), THEN script the ad groups via API. The route's `create_language_ad_group` builds ad group + keywords + RSA + (optional) language criterion in one call — use it for every ad group (not just DE/FR).

**Step 1 — Set budget** (after shell exists):
```json
POST /api/google-ads/campaigns
{ "action": "set_budget", "campaignId": "<CAMPAIGN_ID>", "budgetTry": 1000 }
```

**Step 2 — Add negatives** (campaign-level, §5 list):
```json
{ "action": "add_negatives",
  "keywords": ["transfer","taxi","taksi","airport","havalimanı","vip transfer","cheap","free","affordable","ferry","public","shared","ticket","price per person","per person","job","jobs","salary","for sale","buy yacht","yacht for sale","license","captain course","crew jobs","rental car","apartment","hotel","fishing","parasailing","jet ski","ferry schedule"] }
```

**Step 3 — Create each ad group + RSA + keywords** (repeat per AG, A→I; example AG-B Proposal EN):
```json
{ "action": "create_language_ad_group",
  "campaignResourceName": "customers/<CID>/campaigns/<CAMPAIGN_ID>",
  "adGroupName": "AG-B — Proposal Yacht — EN",
  "finalUrls": ["https://merrysails.com/yacht-charter-istanbul"],
  "keywords": [
    {"text":"marriage proposal yacht istanbul","matchType":"PHRASE"},
    {"text":"proposal boat istanbul","matchType":"PHRASE"},
    {"text":"propose on a yacht istanbul","matchType":"PHRASE"},
    {"text":"engagement yacht bosphorus","matchType":"PHRASE"},
    {"text":"proposal yacht istanbul","matchType":"EXACT"}
  ],
  "headlines": ["Propose on a Private Yacht","Private Yacht Charter Istanbul","From €220 — Whole Boat Direct","Captain & Crew Included","No Concierge Markup","TÜRSAB Licensed Since 2001","Instant WhatsApp Quote"],
  "descriptions": ["Charter the whole boat for your proposal on the Bosphorus. Direct prices from €220, captain + crew included — quote in minutes on WhatsApp.","Premium Bosphorus yacht, TÜRSAB-A licensed, 50,000+ guests since 2001. Book direct, skip the concierge markup."],
  "path1": "yacht-charter", "path2": "proposal",
  "cpcBidMicros": 1200000,
  "languageId": 1000 }
```
- `cpcBidMicros` = bid cap in account currency micros (1_200_000 = ~€1.20 worth; set per §3 cap).
- `headlines` 3-15, `descriptions` 2-4 (route enforces).
- For DE/AR/RU mirrors: same call, swap `adGroupName`, localized `keywords`/`headlines`/`descriptions`, `languageId` 1001/1019/1031.

**Step 4 — Verify + monitor** (read-only):
```json
{ "action": "get_campaign_info" }
{ "action": "list_search_terms" }   // after 7 days → harvest negatives → add_negatives
```

**Things the API route does NOT do** (handle in Ads UI/Editor): create campaign shell, sitelink/callout/structured-snippet/image/call/WhatsApp assets, audience attach (observe), location targets + waterfront bid modifiers, mobile bid modifier, bidding strategy, conversion-goal selection. Alternatively build the whole thing in **Ads Editor** from the CSVs in `docs/ads/google-ads-editor/`.

---

## 10. Kill / scale rules
- **Kill:** €600-750 spent with <2 charter bookings (CPA > €350) → pause campaign, review search terms + landing.
- **Hold at ₺1k** until 30 days OR ~30 conversions. Do NOT raise to ₺2k until CPA < €250 proven AND offline-conversion import (Gap B) is live.
- **Scale trigger:** CPA < €250 + Gap B shipped → migrate bidding to tCPA, raise budget stepwise, add AR/RU ad groups if their geo showed demand.
- Weekly: `list_search_terms` → negatives. Daily first week: check spend pacing + zero-conversion ad groups.

---

## 11. Pre-launch checklist
- [ ] Tracking Gap D (EC toggle ON) + Gap E (Vercel env + Tag Assistant) GREEN
- [ ] Campaign shell created (Search-only, manual CPC bid-cap, Presence-or-interest, single Purchase goal, PMax/AI Max/URL-expansion OFF)
- [ ] Budget ₺1.000/day set (`set_budget`)
- [ ] Geo targets (Istanbul + UK/US/DE/Gulf/RU) + waterfront +15-30% bid modifiers + mobile +10-20%
- [ ] Negatives applied (`add_negatives`)
- [ ] EN ad groups A-I created (`create_language_ad_group`), all → /yacht-charter-istanbul
- [ ] Assets: WhatsApp sitelink + call asset + callouts + sitelinks + images
- [ ] Audiences attached in Observation
- [ ] Operator budget-go confirmed
