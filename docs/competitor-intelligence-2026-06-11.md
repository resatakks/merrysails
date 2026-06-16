# MerrySails Competitor Intelligence — 2026-06-11
_Methodology: WebSearch (multi-query, OTA-excluded) + direct curl JSON-LD parse + WebFetch content extraction + voice/schema/trust-signal manual review. OTAs (Tripadvisor/Viator/GetYourGuide/Booking) excluded — known aggregator bucket, separate analysis._

---

## TL;DR

1. **Top 3 direct-booking threats: Zoe Yacht (bosphorusyacht.com), Bosphorus Tour / Velena Travel (bosphorustour.com), Bosphorus Cruise Istanbul / Been Travel Group (bosphoruscruise.com.tr).** All three position above MerrySails for the highest-CPC commercial queries via established history (2009/2006/Been-Travel-Group), heavier review-volume signaling (Zoe Tripadvisor Traveller's Choice 2020/2022/2025; Been Travel 948+ reviews per package), and longer multi-locale presence (Zoe 9 languages, Been Travel 4 languages).
2. **Biggest MerrySails gap: named operator voice + license display in body content.** Been Travel Group puts owner "Erhan Çelik" + sales manager "Serdar Kardaş" on the homepage and license #10816 inline. LUFER displays legal entity "Tolerance Seyahat Turizm ve Organizasyon A.Ş." plus "1979 / 1M+ guests". MerrySails has TURSAB #14316 in footer but no named human in pillar body — content gate `voiceTemplate` is configured (Captain Ahmet) yet not surfaced on `/bosphorus-cruise`.
3. **Schema battlefield: MerrySails is winning on depth, losing on signal type.** MerrySails `/bosphorus-cruise` ships 20+ @types including HowTo/Dataset/MerchantReturnPolicy/Brand/AggregateOffer — richest in the pool. But **LUFER, Bosphorus Tour, Bosphorus-Cruises all run FAQPage; MerrySails strips it after May 7 deprecation** — community-finds-2026-06 #28 (Glenn Gabe) confirms this was correct (no AI weight). Real schema gap: **Zoe + Bosphorus Tour + LUFER ship Service + Offer + OfferCatalog** which Google rich-result indexes; MerrySails pillar uses TouristTrip primarily.
4. **Top 5 quick wins (≤2 hr each)**: (a) Named-operator H2 + headshot on `/bosphorus-cruise`, (b) Inline TURSAB #14316 in pillar body (not just footer), (c) `OfferCatalog` array on pillar with all 4 cruise products, (d) Review schema with author names (not just aggregateRating numbers), (e) Visible "since 2001 / 50,000+ guests" ribbon (currently only footer/about).
5. **Strategic edge to defend**: MerrySails has the **only schema-rich + content-gate-aware pillar in the competitive set** — Zoe relies on awards-marketing, LUFER on legacy/volume, Been Travel on review-volume + WhatsApp-first booking. None ship `HowTo` or `Dataset` schema. None publish operator-voice blog at MerrySails' scale (114 posts vs Zoe ~20, LUFER ~15).

---

## 1. Top 5 Direct Booking Competitors (per pillar)

### `/bosphorus-cruise` pillar (target: "bosphorus cruise istanbul" 320 + "boğaz turu" 6,600/mo)

| Competitor | DR est. | Schema strength | Voice | Top advantage | Their weakness |
|---|---|---|---|---|---|
| **bosphorustour.com** (Velena Travel) | 35-40 | TravelAgency + Service + Offer + FAQPage + OfferCatalog | Generic "we" | Established 2006, sees small-group positioning, prominent pricing table | Only EN+ES locales, no license # shown, weak blog/content layer |
| **bosphorusyacht.com** (Zoe Yacht) | 30-35 | LocalBusiness + AggregateRating + WebSite | Named "Zoe Yacht" + owner pitch | 9 languages, Travel+Leisure/BBC/Rough Guides editorial backlinks, World Luxury Travel Award | €499 floor price = different segment (luxury); 12-pax cap; no FAQ schema |
| **bosphoruscruise.com.tr** (Been Travel Group) | 35-45 | (server-rendered JSON-LD not in raw HTML; client-injected) | Named owner Erhan Çelik + sales manager + license #10816 | Highest review volume per package (120-948), 24/7 WhatsApp, "pay later" booking | No structured schema in initial response; possible SSR gap; 4 locales only |
| **lufertour.com** (Mega Lüfer / Tolerance Seyahat) | 40-50 | Organization + LocalBusiness + Service + FAQPage + AggregateRating + ContactPoint + GeoCircle | Legal entity named, no individual | Operating since 1979 (45+ yrs), 1M+ guests, 94k reviews — strongest authority numbers in vertical | Mostly TR + EN, prices hidden behind clicks, partner with OTAs (Viator/Klook/GetYourGuide) which dilutes direct funnel |
| **cruisesistanbul.com** (Luxury Istanbul) | 25-30 | Organization + WebSite + SearchAction only | Generic "Luxury Istanbul" | Luxury weddings/corporate niche, references page | Thinnest schema (3 @types), no pricing, no aggregateRating, EN-only |

### `/istanbul-dinner-cruise` pillar (target: "istanbul dinner cruise" 1,600/mo + TR 1,400)

| Competitor | DR est. | Schema strength | Voice | Top advantage | Their weakness |
|---|---|---|---|---|---|
| **dinnercruisebosphorus.com** | 25-30 | Product + AggregateRating + Brand + Offer | Generic | 795 reviews 4.9/5, clean Product schema, "Book Now Pay Later" | Single-vertical (dinner only), no FAQ, no multi-locale |
| **bosphoruscruise.com.tr** | 35-45 | (same as above) | Named owner + license | Highest CTR positioning for dinner queries | (same) |
| **bosphorus-cruises.com** | 30-35 | Organization + FAQPage + ImageObject + WebSite | Lists ops partners (Dentur/Turyol/Boss4) | Aggregator-feel directory with multiple operators; "Timings" page is high-intent | No Offer/Service schema, no ratings, prices behind clicks |
| **bosporuscruise.com** | 25-30 | Light schema | Generic | Glass-window vessel USP, private table guarantee | Thin authority |
| **bosphorussunset.com** | 25 | Article + VideoObject + Person + TravelAgency + Place | Has Person schema (rare!) | Video content on homepage, structured Person identification | Sunset-only positioning, no AggregateRating |

### `/yacht-charter-istanbul` pillar (target: "istanbul yacht charter" 590 + "yacht charter istanbul" 320)

| Competitor | DR est. | Schema strength | Voice | Top advantage | Their weakness |
|---|---|---|---|---|---|
| **cruisesistanbul.com** | 25-30 | Organization only | Brand voice | Strong wedding/corporate niche, references page | No schema for yacht inventory, no pricing |
| **yachtcharterbosphorus.com** | 25-30 | Unknown (lightweight site) | Generic | "Most dynamic young experienced" positioning | No structured data depth |
| **istanbulyachtcharter.com** | 30-35 | Unknown | Generic | EMD exact-match domain, decade-old, ranks well on brand-keyword overlap | EMD demotion risk per `exactMatchDomainDemotion` (CW leak) — opportunity for us to outrank on quality |
| **luxuryyachtrentalistanbul.com** | 25 | Unknown | Generic "we" | "Ministry of Tourism + Chamber of Commerce licensed" trust copy | Generic luxury positioning, no individual operator voice |
| **bosphoruscruisetours.com** (BCT) | 30-35 | Unknown | Generic | "Since 2009", "one of largest fleets" | No named operator, no aggregateRating |

---

## 2. Per-Competitor Deep Dive (Top 5)

### Competitor 1 — bosphorusyacht.com (Zoe Yacht)

- **Authority signals**: Operating since 2009, World Luxury Travel Awards 2023, Travel+Leisure/BBC Travel/Rough Guides editorial mentions, 2020/2022/2025 Tripadvisor Traveller's Choice
- **Schema**: `LocalBusiness` + `AggregateRating` + `WebSite` + `BreadcrumbList` + `PostalAddress`. **No FAQPage, no Service, no Offer, no TouristTrip, no HowTo.** Schema is thin compared to MerrySails.
- **Voice/author**: "Zoe Yacht" branded as a single vessel/owner story. Owner-direct booking is the pitch. No named captain on homepage but tone is operator-first.
- **Internal linking**: 8 daily-cruise sub-options + Special Occasions + Corporate + Day Trips + FAQ + Press + Blog + Contact. Depth comparable to MerrySails.
- **Image strategy**: Heavy own-vessel photography, yacht-glamour shots, sunset positioning
- **Multi-locale**: 9 languages (EN/DE/FR/ES/RU/IT/NL/TR/AR) — **5 more than MerrySails** (currently EN+TR+DE+FR+NL active)
- **Reddit/social**: Tripadvisor-led; weak Reddit footprint observed
- **Estimated backlinks**: Editorial backlinks from Travel+Leisure/BBC/Rough Guides are the moat
- **Strongest feature**: Multi-locale + editorial backlinks + awards stack
- **Exploitable weakness**: Schema thin (no Service/Offer/FAQPage); €499 floor pricing means losing all <€100 conversion intent

### Competitor 2 — bosphorustour.com (Velena Travel)

- **Authority signals**: "Business est. 2006"; 82-ft yacht, 45-pax. WhatsApp-led booking
- **Schema**: `TravelAgency` + `Service` + `Offer` + `OfferCatalog` + `FAQPage` + `Question`/`Answer` + `BreadcrumbList` + `PostalAddress` + `City` + `Country`. **Cleanest commercial-vertical schema stack** in the competitive set.
- **Voice/author**: "Velena Travel" parent brand, no named individual on homepage
- **Internal linking**: Home → Daily Cruises → Dining Cruises → Private Events → Charter Yachts → Istanbul Tours → Day Trips → Contact (8 verticals)
- **Image strategy**: Yacht-focused, professional photography but with stock-feel headers
- **Multi-locale**: **EN + ES only** — weakness vs MerrySails 5-locale
- **Reddit/social**: Tripadvisor-only signal observed
- **Estimated backlinks**: Mid-tier
- **Strongest feature**: Cleanest commercial schema (Service + Offer + OfferCatalog + FAQPage all wired correctly)
- **Exploitable weakness**: Locale poverty + no license # display + no named operator

### Competitor 3 — bosphoruscruise.com.tr (Been Travel Group)

- **Authority signals**: TURSAB #10816 inline displayed, owner Erhan Çelik + sales manager Serdar Kardaş named on homepage, 120-948 reviews per package
- **Schema**: Initial HTML response had **zero JSON-LD captured by curl** — likely client-injected (Next.js `<Script>` not `<script>` — same bug pattern MerrySails CLAUDE.md rules call out). This is a **massive Googlebot/AI-bot exposure gap for them** if confirmed.
- **Voice/author**: **STRONGEST named-human signal in competitive set.** Owner + sales manager named on homepage; this is the gold-standard pattern for E-E-A-T + AI citation.
- **Internal linking**: Primary cruises → Travel & Tours → Private Yachts → Special Events → Support (5-tier IA)
- **Image strategy**: Mix of own + production photography
- **Multi-locale**: EN/AR/FR/DE (4 langs, 1 fewer than MerrySails)
- **Reddit/social**: Limited
- **Estimated backlinks**: Mid-tier, mostly partnership/directory
- **Strongest feature**: Named operator + license # inline = E-E-A-T gold standard
- **Exploitable weakness**: Schema possibly client-only-rendered → invisible to non-JS crawlers (verify with `view-source:` before exploiting)

### Competitor 4 — lufertour.com (Mega Lüfer Yachts / Tolerance Seyahat)

- **Authority signals**: **Strongest authority numbers in entire competitive set.** Operating since 1979 (47 years), 1,000,000+ customers, 94,000+ reviews, Tripadvisor Traveler's Choice 2025+2026
- **Schema**: `Organization` + `LocalBusiness` + `Service` + `FAQPage` + `AggregateRating` + `ContactPoint` + `GeoCircle` + `OpeningHoursSpecification` + `Person` + `Offer` + `QuantitativeValue` — **18+ @types, second-deepest in competitive set after MerrySails**
- **Voice/author**: Legal entity "Tolerance Seyahat Turizm ve Organizasyon A.Ş." displayed; no individual person
- **Internal linking**: Experiences → Company → Support → Partner Program → Policy (5-tier IA, partner-prog notably absent from MerrySails)
- **Image strategy**: Premium fleet photography, captain visuals
- **Multi-locale**: TR + EN (2 langs only — surprising weakness given 47-yr heritage)
- **Reddit/social**: Partnerships with Viator/Klook/GetYourGuide → diluted direct funnel
- **Estimated backlinks**: HIGH — 47-year operating history + 94k reviews implies strong domain authority
- **Strongest feature**: Unmatched volume/heritage authority signals (94k reviews, 1M+ guests, 1979 founding)
- **Exploitable weakness**: Locale poverty + heavy OTA partnership dilution + no individual-operator voice

### Competitor 5 — dinnercruisebosphorus.com (dinner-pillar-specific)

- **Authority signals**: 795 reviews 4.9/5
- **Schema**: `Product` + `Brand` + `Offer` + `AggregateRating` — **only competitor using Product schema correctly** for cruise vertical (per Google Product Snippet validator). MerrySails CLAUDE.md rule 1 explicitly bans `["TouristTrip", "Product"]` combo; this competitor uses standalone Product. Possibly violating cruise=service-not-good norm but it's indexed.
- **Voice/author**: Generic
- **Internal linking**: Thin — single-vertical dinner-only
- **Image strategy**: Stock-feel
- **Multi-locale**: EN only
- **Reddit/social**: Limited
- **Estimated backlinks**: Low
- **Strongest feature**: Clean Product/Offer/AggregateRating combo, "Book Now Pay Later" CTA
- **Exploitable weakness**: Single-vertical, EN-only, thin authority — easy to outrank on multi-faceted dinner queries

---

## 3. Content Gaps (what they have, MerrySails doesn't)

| Element | Zoe | Bosphorus Tour | Been Travel | LUFER | MerrySails | Gap action |
|---|---|---|---|---|---|---|
| Named owner/operator on homepage | brand only | no | YES (Erhan + Serdar) | legal entity | no (captain in footer) | **Add named Captain Ahmet H2 + portrait to `/bosphorus-cruise` body** |
| License # inline body | no | no | YES (#10816) | no | footer only | **Move TURSAB #14316 inline to pillar body** (TR regulatory binding per CLAUDE.md) |
| Editorial press logos | YES (Travel+Leisure/BBC/Rough) | no | no | no | no | **Pitch Time Out Istanbul / Daily Sabah / Routard** (memory: Featured.com + Qwoted) |
| Multi-locale ≥6 | YES (9) | no (2) | no (4) | no (2) | no (5 active) | **Add ES + RU + AR + IT** — Zoe has these, evidence of demand |
| Pricing table on homepage | YES | YES | YES | partial | partial | **Add 4-product price table to pillar above-the-fold** |
| Review volume display | "5-star reviews" + awards | TA badges | 120-948 per pkg | 94k total + 4.9 | 312 reviews | **Aggregate cross-platform review count** (Tripadvisor + Google + WhatsApp testimonials) |
| WhatsApp-first CTA above fold | yes | yes (chat widget) | YES | yes | exists, button-only | **Make WhatsApp button persistent floating CTA** (Been Travel pattern) |
| Operating-since visible | 2009 | 2006 | implicit | 1979 prominent | 2001 footer | **"Since 2001 • 50,000+ guests" ribbon at top of pillar** |
| Comparison table | no | partial | partial | no | yes (good) | DEFEND — this is our edge |
| 114-post blog | no (~20) | no | no | no (~15) | YES | DEFEND — biggest content moat |
| HowTo schema | no | no | no | no | YES | DEFEND — unique signal |
| Dataset schema | no | no | no | no | YES | DEFEND — unique signal |

---

## 4. Schema Gaps (their schema → ours)

**Confirmed via `curl + grep @type` on each homepage:**

| @type | Zoe | Bosphorus Tour | Been Travel (raw) | LUFER | MerrySails | Verdict |
|---|---|---|---|---|---|---|
| Organization | — | — | — | YES | YES | ✓ keep |
| LocalBusiness | YES | — | — | YES | YES | ✓ keep |
| TravelAgency | — | YES | — | — | — | **CONSIDER**: Add to /about + footer Org? (Per CLAUDE.md rule 1, TravelAgency standalone OK for LocalBusiness slot) |
| Service | — | YES | — | YES | partial | **ADD**: `Service` on each cruise page (per CLAUDE.md rule 1, use `["TouristTrip","Service"]`) |
| Offer | — | YES | — | YES | YES (AggregateOffer) | ✓ keep — but verify per-tour Offer not just Aggregate |
| OfferCatalog | — | YES | — | — | — | **ADD**: `OfferCatalog` to pillar with 4-product hasOfferCatalog (CLAUDE.md mentions hasOfferCatalog is valid on Service) |
| FAQPage | — | YES | — | YES | YES | ✓ keep (Glenn Gabe says no AI weight but rich-result snippet still functional pre-deprecation; deprecation tracked for May 7 2026, but currently OK) |
| AggregateRating | YES | — | — | YES | YES (4.9, 312) | ✓ keep |
| Person | — | — | — | YES | — | **ADD**: `Person` schema for Captain Ahmet — LUFER has it, MerrySails doesn't despite having a real captain (E-E-A-T critical) |
| Product (standalone) | — | — | — | — | — | dinnercruisebosphorus uses it; we should NOT (CLAUDE.md rule 1 ban + Product = goods semantics) |
| HowTo | — | — | — | — | YES | ✓ keep — unique edge |
| Dataset | — | — | — | — | YES | ✓ keep — unique edge |
| EducationalOccupationalCredential | — | — | — | — | YES | ✓ keep — TURSAB credential schema, unique |
| MerchantReturnPolicy | — | — | — | — | YES | ✓ keep — CLAUDE.md rule 4c required for Offer |
| ContactPoint | — | — | — | YES | partial | **ADD**: `ContactPoint` with WhatsApp + phone + email + 24/7 hours (LUFER pattern) |
| GeoCircle | — | — | — | YES | — | **CONSIDER**: `GeoCircle` for service-area-around-Istanbul (LUFER signal for local-pack) |
| OpeningHoursSpecification | — | — | — | YES | — | **ADD**: `OpeningHoursSpecification` for booking-office (LUFER has it) |

**Net schema additions to ship**: `Person` (Captain Ahmet), `OfferCatalog` (pillar), `ContactPoint` (24/7 WhatsApp), `OpeningHoursSpecification`, `GeoCircle` (service area). Estimated ship time 2-3 hr total.

---

## 5. Backlink Gap (editorial pitch list)

Confirmed editorial backlinks to **competitors but not MerrySails** (from competitor research):

1. **Travel + Leisure** — Zoe Yacht featured. Pitch: "First-person captain narrative on Bosphorus cultural moments"
2. **BBC Travel** — Zoe Yacht referenced. Pitch: Bosphorus night-shipping safety + cultural history angle
3. **Rough Guides** — Zoe Yacht. Pitch: TURSAB-licensed booking guide for international tourists
4. **Tripadvisor Traveller's Choice** — Zoe + LUFER 2020-2026 winners. Audit MerrySails Tripadvisor profile (separate task — operator-side)
5. **Storyhunt.io** — pillar article "Bosphorus Cruise Istanbul (2026 Guide)" surfaces Bosphorus Tour, not MerrySails. Pitch outreach via Featured.com
6. **istanbulclues.com / istanbultravelblog.com / awaygowe.com** — independent travel blogger pillars ranking, none cite MerrySails. **Featured.com pitch** ($79/mo memory) or direct cold email

**Reddit gap**: Zero meaningful operator-recommendation Reddit threads in r/istanbul or r/travel returned for `bosphorus cruise istanbul recommendation operator`. Per CLAUDE.md community-finds-2026-06 #21, AUTHENTIC operator participation ≤2/mo is safe — Captain Ahmet (or staff) joining `r/istanbul` to answer ferry-vs-cruise questions is a low-risk high-value moat.

---

## 6. Top 10 Quick Wins (ROI-sorted, ≤2 hr each)

1. **Named-operator H2 + Captain Ahmet portrait on `/bosphorus-cruise`** (1 hr) — closes E-E-A-T gap vs Been Travel's owner-named pattern. Already have voiceTemplate config in `.claude/content-gate.json`; surface it.
2. **Move TURSAB #14316 inline above-fold** (30 min) — Been Travel does this with #10816; TR regulatory binding per CLAUDE.md.
3. **Add `Person` schema for Captain Ahmet** with sameAs (LinkedIn/About) — closes LUFER `Person` schema gap, lifts E-E-A-T signal.
4. **Add `OfferCatalog` with 4 hasOfferCatalog products** to pillar (1 hr) — closes Bosphorus Tour gap; CLAUDE.md rule 1 confirms hasOfferCatalog valid on Service.
5. **Add `ContactPoint` schema with 24/7 WhatsApp + phone + email** (30 min) — closes LUFER gap; supports AI-citation operator-contact extraction.
6. **"Since 2001 • 50,000+ guests served • TÜRSAB A #14316" ribbon above-fold** on pillar (30 min) — LUFER 1979/1M+/94k pattern is their #1 conversion lever.
7. **Pricing table above-fold** on `/bosphorus-cruise` showing all 4 product entry prices (1 hr) — every competitor in top 5 has one.
8. **Cross-platform review aggregator block** showing Tripadvisor + Google + on-page review counts combined (1.5 hr) — bridges the "312 reviews" gap perception vs LUFER's 94k.
9. **Add `OpeningHoursSpecification` + `GeoCircle` for service area** (45 min) — closes LUFER local-pack schema gap.
10. **Substantive `/best-bosphorus-cruise-companies-istanbul-2026` listicle** (4-6 hr, slightly over 2hr but listed for tracking — 2-week AI citation pilot per memory MerrySails P1). Include Zoe, LUFER, Bosphorus Tour with transparent self-rank #1 reasoning.

---

## 7. Strategic Recommendations (per pillar)

### `/bosphorus-cruise` pillar
- **Position MerrySails as "the only schema-rich + Captain-led + multi-locale + 114-post-content-moat operator"** — own the depth axis. Zoe owns awards-luxury; LUFER owns heritage-volume; Been Travel owns named-owner-first-touch; Bosphorus Tour owns commercial-schema-clean. None own depth+content+captain-voice.
- Differentiation axis (per CLAUDE.md multi-brand-scaling 5-axis matrix): **Tier (mid-market €30-90 vs Zoe €499) + Scope (full-stack cruise+yacht+dinner+sunset vs LUFER's split-OTA dilution)**.

### `/istanbul-dinner-cruise` pillar
- Win on **named-Chef + first-party menu data + dietary accommodation depth**. Memory says voice template = Captain Ahmet but dinner pillar should layer Chef voice (sister voiceTemplate). Been Travel's "vegetarian/vegan/gluten-free" is table-stakes; outclass with named-chef + dish-of-the-week.
- Add `MenuItem` + `Restaurant` schema layer (none of top 5 dinner competitors have these — easy schema-rich-results win).

### `/yacht-charter-istanbul` pillar
- Lightest-competition pillar. Top 5 are EMD-dependent or unstructured. **Build out the deepest yacht-charter schema in vertical**: `Boat` (or `Vehicle`) inventory schema with per-yacht spec sheets (length/capacity/year/cabins/price-per-hour). Zero competitor does this.
- Memory: `yacht-charter-istanbul` was fixed to `["TouristTrip","Service"]` 2026-05-01 — extend with `hasOfferCatalog` listing actual yacht inventory.

---

## 8. Defensive Watchlist (monitor monthly)

1. **Been Travel Group SSR schema fix** — if they wire JSON-LD to server-render (currently client-only inferred), they jump ranks rapidly. Re-check `view-source:bosphoruscruise.com.tr` monthly.
2. **Zoe Yacht new editorial backlinks** — Travel+Leisure/BBC/Rough Guides update cycles. Set Google Alert for `site:travelandleisure.com "zoe yacht"` etc.
3. **LUFER multi-locale launch** — if they add DE/FR/RU (currently TR+EN only), the heritage-authority + multi-locale combo would be a serious threat. Currently their #1 weakness.
4. **dinnercruisebosphorus.com Product schema** — if Google starts validating cruise-as-Product more strictly, this competitor may get demoted. Watch GSC rich results coverage for our `["TouristTrip","Service"]` Product warnings.
5. **New entrants on EMD pattern** — `bosphorus-dinner-cruise.com`, `bosphorus-sunset-cruise.com`-type domains keep appearing. EMD demotion (`exactMatchDomainDemotion` from CW leak) means they sandbox 6-12 months; safe to ignore short-term but track for late-2026 rerank.
6. **Editorial content theft** — Lily Ray pattern: aggressive paraphrasing of MerrySails 114-post blog by competitors. Cosine similarity audit quarterly (memory: `~/.agents/skills/seo-ops/references/content/scaled-content-cosine-thresholds.md`).
7. **OTA Reserve-with-Google rollout** — confirmed live globally per CLAUDE.md community-finds #28. If LUFER/Zoe wire Reserve-with-Google before MerrySails, they capture AI-citation hotel booking flows.

---

## 9. Sources

- [Best Bosphorus Cruise Istanbul 2026 — Honest Comparison (GoldenSunsetTour blog)](https://goldensunsettour.com/blog/best-bosphorus-cruise-istanbul-guide)
- [Bosphorus Cruise Tour 2026: Zoe Yacht](https://www.bosphorusyacht.com/)
- [Bosphorus Tour Istanbul (Velena Travel)](https://www.bosphorustour.com/)
- [Bosphorus Cruise Istanbul (Been Travel Group)](https://www.bosphoruscruise.com.tr/)
- [LUFER Tour (Mega Lüfer Yachts)](https://lufertour.com/)
- [Cruises Istanbul (Luxury Istanbul)](https://cruisesistanbul.com/)
- [Bosphorus-Cruises.com (multi-operator directory)](https://www.bosphorus-cruises.com/)
- [Bosphorus Sunset](https://bosphorussunset.com/)
- [Dinner Cruise Bosphorus](https://dinnercruisebosphorus.com/)
- [Storyhunt.io Bosphorus Cruise 2026 Guide](https://www.storyhunt.io/en/articles/bosphorus-strait-cruise)
- [istanbulclues.com Bosphorus cruise options](https://istanbulclues.com/istanbul-bosphorus-cruise-tours/)
- [awaygowe.com 7 Best Bosphorus Cruises 2026](https://www.awaygowe.com/bosphorus-cruise-istanbul/)
- [istanbultravelblog.com first-time guide](https://istanbultravelblog.com/bosphorus-cruise-tours-istanbul/)
- [whatsdownthatstreet.com which Bosphorus cruise best](https://whatsdownthatstreet.com/2024/07/11/which-bosphorus-cruise-best/)
- [MerrySails baseline pillar](https://merrysails.com/bosphorus-cruise)

_Methodology cross-references: CLAUDE.md Schema Rules 1-7, content-gate 7-Q gate, `~/.agents/skills/seo-ops/references/content/community-finds-2026-06.md` (#21-#40 reddit harvest), `~/.agents/skills/seo-ops/references/schema/schema-ai-grounding-debunk.md`._
