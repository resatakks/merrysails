# MerrySails Internal Linking Implementation Map
_Target window: 2026-06-08 → 2026-06-22 (14 days)_
_Pillar pages in scope: `/bosphorus-cruise`, `/yacht-charter-istanbul`, `/istanbul-dinner-cruise`_

---

## TL;DR

1. **All 3 pillars already have a healthy inbound profile** (15-19 in-site referrers each) but **anchor-text distribution is brand/CTA-skewed (~60%)** with only **5-10% exact-match**, well below the 20% 2026 sweet spot.
2. **Biggest gap = blog spokes:** 50+ commercial/foundational blog posts mention the topics but **fewer than half link to the pillar with descriptive anchor**. Many use only the InlineCTA component, which is generic ("Compare Bosphorus Cruises").
3. **Cross-pillar bridge weak:** `/bosphorus-cruise` ↔ `/istanbul-dinner-cruise` ↔ `/yacht-charter-istanbul` linking is one-way (yacht → bosphorus only). Add 2 contextual bridges per pillar.
4. **Locale variants under-linked from locale blog posts.** TR/DE/FR/NL posts often link to **EN** pillar URLs by default. Within-language linking missing.
5. **No internal-link audit script** in repo — add `scripts/internal-link-audit.mjs` to regression-prevent after this work.

Cap on operator effort: **~85 link edits across 3 pillars + 6 sitewide/locale touches = ~91 edits, under the 100-edit ceiling.**

---

## 1. Current internal link graph audit

### 1.1 `/bosphorus-cruise` (EN pillar)

**Outbound (from page.tsx):**
| Target | Where | Anchor pattern |
|---|---|---|
| `/cruises/bosphorus-sunset-cruise` | Cruise grid + cross-link | "Bosphorus Sunset Cruise" |
| `/istanbul-dinner-cruise` | Cruise grid + cross-link | "Bosphorus Dinner Cruise" |
| `/yacht-charter-istanbul` | Cruise grid + cross-link | "Yacht Charter Istanbul" |
| `/boat-rental-istanbul` | Cruise grid | "Boat Rental Istanbul" |
| `/istanbul-cruise-faq` | FAQ footer | "Full 44-question FAQ" |
| `/compare-bosphorus-cruises` | FAQ footer | "Compare all cruise options" |
| `/pricing` | FAQ footer | "See full pricing" |
| `/reservation` | CTA | "Choose a Cruise to Book" |
| 6× `/blog/*` | "Featured reading" section | descriptive (good) |

**Total outbound: 13 distinct internal targets.** Good — already above the 6-link "thin pillar" threshold.

**Inbound (in-site referrers, deduped):**
- 5 home components (HeroSection, CTASection, TourGrid, BosphorusGuideSection, footer module)
- 11 sibling/audience pages (`/bosphorus-cruise-for-couples`, `/-for-families`, `/-from-beyoglu`, `/-from-sultanahmet`, `/-from-taksim`, `/bosphorus-cruise-departure-points`, `/compare-bosphorus-cruises`, `/best-bosphorus-sunset-cruise-2026`, `/istanbul-cruise-faq`, `/istanbul-dinner-cruise`, `/yacht-charter-istanbul`)
- 3 vs / about / contact (`/merrysails-vs-bosphorustour`, `/merrysails-vs-viator`, `/about`, `/about/team`, `/contact`)
- `/blog/[slug]` template (InlineCTA) — every blog post technically inherits
- `/cruises/[slug]` template + `/cruises/page.tsx` (hub)
- `/guides/[slug]` template
- `/[locale]/bosphorus-cruise` (peer locale)
- Footer (sitewide)

**Inbound count: 18 unique referrers + footer sitewide + blog InlineCTA generic.** Strong.

**Gap (orphan candidate blog posts not contextually linking):**

Searched 11 blog post files for body-text mentions of `bosphorus-cruise`. Found **51 commercial + foundational + planning posts** that discuss the topic. Of these, **only ~22 have a hard `href="/bosphorus-cruise"`** outside the generic InlineCTA component. **Remaining ~29 are silent.** Examples (high-priority candidates):

- `best-istanbul-cruise-2026`
- `bosphorus-cruise-reviews-guide`
- `istanbul-cruise-package-deals`
- `bosphorus-cruise-prices-2026`
- `best-time-bosphorus-cruise`
- `bosphorus-cruise-eminonu`
- `bosphorus-cruise-winter-guide`
- `bosphorus-night-cruise-guide`
- `bosphorus-cruise-vs-ferry-istanbul-2026`
- `bosphorus-cruise-departure-times-istanbul-2026`
- `short-bosphorus-cruise-tour`

### 1.2 `/yacht-charter-istanbul` (EN pillar)

**Outbound:**
- `/bosphorus-cruise` (×2, breadcrumb + content)
- `/compare-bosphorus-cruises`, `/istanbul-cruise-faq`, `/pricing`
- `/kurucesme-marina-yacht-charter`, `/boat-rental-istanbul`
- `/proposal-yacht-rental-istanbul`, `/corporate-events`
- `/private-bosphorus-dinner-cruise`
- 6× `/blog/*` (yacht-relevant)

**Total: 14 distinct internal targets.**

**Inbound:**
- 17 unique pages including `/boat-rental-istanbul`, `/kurucesme-marina-yacht-charter`, `/private-events`, `/honeymoon-yacht-cruise-istanbul`, `/anniversary-yacht-cruise-istanbul`, `/princes-islands-tour-istanbul`, `/private-tours`, `/cruises/`, `/best-bosphorus-sunset-cruise-2026`, vs pages, `/reservation`, `/authors/captain-ahmet`, `/about`, `/istanbul-cruise-faq`, `/[locale]/yacht-charter-istanbul`, 3 home components.

**Inbound count: 17 unique + footer + 0 contextual blog spoke from non-yacht posts.**

**Gap:**
- Yacht-relevant blog posts NOT linking: `luxury-yacht-rental-bosphorus`, `swimming-yacht-tour-istanbul`, `yacht-party-ideas-istanbul`, `yacht-birthday-party-ideas`, `bachelorette-party-yacht-istanbul`, `yacht-wedding-istanbul-bosphorus`, `corporate-event-yacht-bosphorus`, `wedding-anniversary-yacht-cruise`, `new-years-eve-bosphorus-cruise`, `private-yacht-charter-istanbul-prices`, `private-yacht-charter-istanbul-price`, `private-yacht-hire-istanbul-2026`, `yacht-rental-istanbul-prices`, `private-yacht-departure-points-istanbul`, `private-yacht-charter-istanbul-2026-buyers-guide`.
- TR posts: `istanbul-yat-kiralama-rehberi-2026`, `yat-kiralama-tekne-fiyatlari-istanbul-2026`, `dogum-gunu-yat-kiralama-istanbul-2026` — these link to `/tr/yacht-charter-istanbul` but body anchors are mostly brand-mention, not descriptive.

### 1.3 `/istanbul-dinner-cruise` (EN pillar)

**Outbound:**
- `/bosphorus-cruise` (×2, breadcrumb + content)
- `/compare-bosphorus-cruises`, `/istanbul-cruise-faq`, `/pricing`
- `/turkish-night-dinner-cruise-istanbul`
- `/dinner-cruise-with-hotel-pickup-istanbul`
- `/dinner-cruise-pickup-sultanahmet-taksim`
- `/kabatas-dinner-cruise-istanbul`
- `/private-bosphorus-dinner-cruise`
- 6× `/blog/*` (dinner-relevant)

**Total: 14 distinct internal targets.** Good cluster coverage.

**Inbound:**
- 13 unique: dinner-pickup pages, sibling dinner pages, `/compare-bosphorus-cruises`, `/about`, `/bosphorus-cruise-for-families`, `/turkish-night-dinner-cruise-istanbul`, `/kabatas-dinner-cruise-istanbul`, `/[locale]/dinner-*` variants, `/bosphorus-cruise`, `/cruises/`, `/istanbul-cruise-faq`, 3 home components.

**Gap:**
- Dinner-related blog posts not linking with descriptive anchor: `bosphorus-dinner-cruise-what-to-expect`, `bosphorus-dinner-cruise-booking`, `istanbul-cruise-weekend-itinerary`, `bosphorus-lunch-cruise-guide`, `istanbul-dinner-cruise-etiquette-2026`, `istanbul-dinner-cruise-price-guide-2026`, `istanbul-dinner-cruise-menu-guide`, `bosphorus-sunset-dinner-cruise-vs-lunch`, `bosphorus-cruise-new-year-eve-istanbul-2026-2027`, `valentines-day-cruise-istanbul`, `yacht-catering-menu-istanbul`.
- TR: `istanbul-aksam-yemegi-turu-rehberi`.

### 1.4 Sitewide signal summary

| Pillar | Out | In (in-site, ex footer) | Footer | Header nav | Health |
|---|---|---|---|---|---|
| `/bosphorus-cruise` | 13 | 18 | YES | YES (1st item) | Strong |
| `/yacht-charter-istanbul` | 14 | 17 | YES | YES (4th item) | Strong |
| `/istanbul-dinner-cruise` | 14 | 13 | YES | YES (3rd item) | Adequate |

Conclusion: structural links good. **Contextual anchor-rich blog spokes weak — that's where this implementation map focuses.**

---

## 2. Hub-and-spoke action queue per pillar

Anchor-text recommendation policy (2026 sweet spot — Cyrus Shepard "natural distribution" + Mike King 2026 anti-over-optimization):
- **20% exact match** ("Bosphorus cruise", "yacht charter Istanbul", "Istanbul dinner cruise")
- **30% partial / long-tail** ("private yacht charter on the Bosphorus", "evening dinner cruise on the Bosphorus")
- **30% branded** ("MerrySails Bosphorus cruise", "the MerrySails dinner cruise")
- **20% naked URL / generic CTA** ("learn more", "see prices", URL string)

Each row below: insertion is **descriptive paragraph mid-content**, NOT InlineCTA component. Use a normal Next.js `<Link href="…">{anchor}</Link>` inside an existing paragraph or H2 outro sentence.

### 2.1 `/bosphorus-cruise` — 20 spoke edits

| From URL (blog post) | Anchor recommendation | Where in page | Anchor class | Why |
|---|---|---|---|---|
| `/blog/best-istanbul-cruise-2026` | "compare every **Bosphorus cruise** format in one place" | intro paragraph, sentence 2 | EXACT | Already commercial-comparison intent; pillar is the natural reference |
| `/blog/bosphorus-cruise-reviews-guide` | "see our **Bosphorus cruise pillar** for verified pricing" | "How to verify" section | PARTIAL | Trust mention reinforces TURSAB authority |
| `/blog/istanbul-cruise-package-deals` | "the full **MerrySails Bosphorus cruise** lineup" | bullet-list of formats | BRAND | Brand mention naturally fits package context |
| `/blog/bosphorus-cruise-prices-2026` | "live prices on the **Bosphorus cruise** hub" | pricing table outro | EXACT | High-imp, low-CTR → pillar transfers users to decision page |
| `/blog/best-time-bosphorus-cruise` | "see all **Bosphorus cruise departures**" | conclusion paragraph | PARTIAL | "departures" matches existing pillar H2 |
| `/blog/bosphorus-cruise-eminonu` | "the main **Bosphorus cruise** booking hub" | last paragraph | PARTIAL+BRAND | Eminönü visitors are decision-stage |
| `/blog/bosphorus-cruise-winter-guide` | "winter Bosphorus cruise availability →" | seasonal FAQ outro | LONG-TAIL | Sub-intent feeds pillar `dateModified` freshness signal |
| `/blog/bosphorus-night-cruise-guide` | "browse all **Bosphorus cruise** options" | comparison block | EXACT | Night-cruise variant of pillar topic |
| `/blog/bosphorus-cruise-vs-ferry-istanbul-2026` | "the proper **Bosphorus cruise experience**" | last H2 | LONG-TAIL | Differentiation: ferry vs full cruise |
| `/blog/bosphorus-cruise-departure-times-istanbul-2026` | "full **Bosphorus cruise** timetable" | intro | PARTIAL | Timetable fits pillar info |
| `/blog/short-bosphorus-cruise-tour` | "longer **Bosphorus cruise** itineraries" | "upgrade path" paragraph | PARTIAL | Naturally upsells from short to standard |
| `/blog/bosphorus-cruise-safety-tips` | "MerrySails Bosphorus cruise standards" | TURSAB credentials para | BRAND | E-E-A-T crosslink |
| `/blog/bosphorus-cruise-moonlight-cruise-istanbul` (slug: `bosphorus-moonlight-cruise-istanbul`) | "main **Bosphorus cruise** hub" | bottom of post | EXACT | Variant intent |
| `/blog/best-bosphorus-cruise-istanbul-guide` | "MerrySails' full Bosphorus cruise lineup" | "Where to book" section | BRAND+PARTIAL | Already linked via InlineCTA — add descriptive in-body |
| `/blog/istanbul-3-day-itinerary-cruises-tours` | "Day 3 evening **Bosphorus cruise**" | Day 3 H3 | EXACT | Itinerary natural slot |
| `/tr/blog/istanbul-bogaz-turu-fiyatlari-2026` | "tüm **Boğaz turu** fiyatları için tıklayın" | intro | EXACT (TR) | TR pillar `/tr/bosphorus-cruise` |
| `/tr/blog/istanbul-bogaz-turu-saatleri-2026` | "**İstanbul boğaz turu** kalkış saatleri sayfası" | timetable intro | EXACT (TR) | TR-language exact match |
| `/tr/blog/eminonu-karakoy-kabatas-bogaz-turu-2026` | "ana **boğaz turu** sayfasından rezervasyon" | conclusion | PARTIAL+CTA (TR) | High-volume TR keyword |
| `/blog/istanbul-airport-to-bosphorus-cruise-transfer-guide` (if slug = `how-to-get-istanbul-airport-to-bosphorus-cruise`) | "book your **Bosphorus cruise** in advance" | airport→pier section | EXACT | Transfer guide users have intent |
| `/blog/group-bosphorus-cruise-guide` | "see our **group Bosphorus cruise** options" | sizing-table outro | LONG-TAIL | Group intent → pillar |

Anchor mix in 20 edits: 6 EXACT + 7 PARTIAL/LONG-TAIL + 5 BRAND/BRAND+PARTIAL + 2 CTA/naked-URL. Mix = 30/35/25/10 — slightly heavy on exact, acceptable for striking-distance pillar.

### 2.2 `/yacht-charter-istanbul` — 18 spoke edits

| From URL | Anchor recommendation | Where in page | Anchor class | Why |
|---|---|---|---|---|
| `/blog/luxury-yacht-rental-bosphorus` | "MerrySails **yacht charter Istanbul** fleet" | fleet section | BRAND+EXACT | Direct fleet upsell |
| `/blog/yacht-party-ideas-istanbul` | "private **yacht charter** with full deck reserved" | venue paragraph | PARTIAL | Party intent → charter |
| `/blog/yacht-birthday-party-ideas` | "see **yacht charter Istanbul** prices" | budget H2 | EXACT | Decision-stage |
| `/blog/bachelorette-party-yacht-istanbul` | "private **yacht charter** for the day" | timeline section | PARTIAL | Long-tail volume |
| `/blog/yacht-wedding-istanbul-bosphorus` | "**yacht charter** for ceremonies on the Bosphorus" | venue H2 | EXACT+LONG-TAIL | Ceremony intent |
| `/blog/corporate-event-yacht-bosphorus` | "corporate **yacht charter Istanbul** options" | budget table | EXACT | Already commercial |
| `/blog/wedding-anniversary-yacht-cruise` | "private **yacht charter**" | venue section | PARTIAL | Brand-light |
| `/blog/new-years-eve-bosphorus-cruise` | "**yacht charter** for NYE evening" | booking paragraph | EXACT | High seasonality |
| `/blog/private-yacht-charter-istanbul-prices` | "live pricing on the **yacht charter Istanbul** hub" | pricing table outro | EXACT | Direct freshness signal |
| `/blog/private-yacht-charter-istanbul-price` | "see current **yacht charter** rates" | last H2 | PARTIAL | Long-tail variant |
| `/blog/private-yacht-hire-istanbul-2026` | "**yacht hire Istanbul** options" + brand link | conclusion | LONG-TAIL+BRAND | Yacht hire = synonym variant |
| `/blog/yacht-rental-istanbul-prices` | "the full **yacht charter** lineup" | pricing block | PARTIAL | Synonym pivot rental→charter |
| `/blog/private-yacht-departure-points-istanbul` | "**yacht charter** departure marinas" | port list intro | EXACT | Departure-point Q is yacht-relevant |
| `/blog/private-yacht-charter-istanbul-2026-buyers-guide` | "the **yacht charter Istanbul** hub" | "next step" CTA | EXACT | Buyer's guide → decision |
| `/blog/swimming-yacht-tour-istanbul` | "MerrySails swim-route **yacht charter**" | route H3 | BRAND+PARTIAL | Niche route variant |
| `/blog/marriage-proposal-yacht-istanbul` | "see all **yacht charter** packages" | "extras" section | EXACT | Already linked from InlineCTA — descriptive in-body needed |
| `/tr/blog/istanbul-yat-kiralama-rehberi-2026` | "**İstanbul yat kiralama** ana sayfası" | intro | EXACT (TR) | TR pillar `/tr/yacht-charter-istanbul` |
| `/tr/blog/yat-kiralama-tekne-fiyatlari-istanbul-2026` | "güncel **yat kiralama** fiyatları" | pricing intro | EXACT (TR) | Live-pricing handoff |

Anchor mix: 9 EXACT + 5 PARTIAL/LONG-TAIL + 3 BRAND/BRAND+EXACT + 1 implicit naked → 50/28/17/5. Heavy on exact match. **Reduce to 20% by softening 4 EXACT to PARTIAL** if anchor-velocity scan flags.

### 2.3 `/istanbul-dinner-cruise` — 16 spoke edits

| From URL | Anchor recommendation | Where in page | Anchor class | Why |
|---|---|---|---|---|
| `/blog/bosphorus-dinner-cruise-what-to-expect` | "book the **Istanbul dinner cruise** here" | conclusion | EXACT | Already topic-aligned |
| `/blog/bosphorus-dinner-cruise-booking` | "MerrySails **Istanbul dinner cruise**" | booking H2 | BRAND+EXACT | Decision-stage |
| `/blog/istanbul-cruise-weekend-itinerary` | "Saturday evening **dinner cruise**" | day-by-day section | PARTIAL | Itinerary anchor |
| `/blog/bosphorus-lunch-cruise-guide` | "evening **Istanbul dinner cruise** alternative" | comparison block | EXACT | Lunch→dinner upsell |
| `/blog/istanbul-dinner-cruise-etiquette-2026` | "the main **Istanbul dinner cruise**" | intro | EXACT | Etiquette guide is service-adjacent |
| `/blog/istanbul-dinner-cruise-price-guide-2026` | "live prices on the **dinner cruise** hub" | pricing table outro | PARTIAL | Pricing handoff |
| `/blog/istanbul-dinner-cruise-menu-guide` | "**Istanbul dinner cruise** packages" | menu→package transition | EXACT | Menu is upper-funnel; pillar closes |
| `/blog/bosphorus-sunset-dinner-cruise-vs-lunch` | "the **dinner cruise**" + "lunch cruise" both linked | comparison verdict | PARTIAL | Both options for fair compare |
| `/blog/bosphorus-cruise-new-year-eve-istanbul-2026-2027` | "**dinner cruise** for NYE" | reservation paragraph | EXACT | Seasonality |
| `/blog/valentines-day-cruise-istanbul` | "the romantic **Istanbul dinner cruise**" | "best for couples" section | LONG-TAIL | Couples intent |
| `/blog/yacht-catering-menu-istanbul` | "shared **dinner cruise** as the budget alternative" | budget compare | PARTIAL | Yacht catering is premium; dinner cruise is shared alt |
| `/tr/blog/istanbul-aksam-yemegi-turu-rehberi` | "**İstanbul akşam yemeği turu** ana sayfası" | intro | EXACT (TR) | TR pillar `/tr/istanbul-dinner-cruise` |
| `/blog/istanbul-cruise-package-deals` | "**dinner cruise** package" | package list | PARTIAL | Package = bundle of dinner+cruise |
| `/blog/group-bosphorus-cruise-guide` | "group **dinner cruise** booking" | group sizing | LONG-TAIL | Group intent feeds pillar |
| `/blog/istanbul-3-day-itinerary-cruises-tours` | "the evening **Istanbul dinner cruise**" | Day 2 evening | EXACT | Itinerary slot |
| `/blog/istanbul-corporate-yacht-event-booking` | "shared **dinner cruise** option" | budget alt block | PARTIAL | Yacht→dinner-cruise downsell handle |

Anchor mix: 7 EXACT + 6 PARTIAL/LONG-TAIL + 1 BRAND+EXACT + 2 implicit/CTA → 44/38/6/12. **Within sweet spot.**

**Total spoke edits across 3 pillars: 20 + 18 + 16 = 54.**

---

## 3. Cross-pillar bridge links (one paragraph each pillar)

Add a single descriptive **"Decision bridge"** mid-content sentence per pillar (not an InlineCTA):

### `/bosphorus-cruise` → DINNER + YACHT
- Sentence to insert after the "Which cruise is right for you" H2:
  *"For evenings with food, see our [**Istanbul dinner cruise**](/istanbul-dinner-cruise) format; for full deck privacy, the [**Istanbul yacht charter**](/yacht-charter-istanbul) is the right step up."*

### `/istanbul-dinner-cruise` → BOSPHORUS + YACHT
- Sentence after "Is the dinner cruise worth it" or "Who is it for":
  *"Shared dinner doesn't fit? Compare the daytime [**Bosphorus cruise**](/bosphorus-cruise) lineup, or for full privacy, the [**private yacht charter Istanbul**](/yacht-charter-istanbul)."*

### `/yacht-charter-istanbul` → BOSPHORUS + DINNER
- Sentence after "When private isn't worth it" or "Group sizes":
  *"Smaller parties or first-time visitors are usually better matched with the [**shared Bosphorus cruise**](/bosphorus-cruise) or the [**Bosphorus dinner cruise**](/istanbul-dinner-cruise) — both are TURSAB-licensed MerrySails operations."*

These give each pillar **2 outgoing pillar-to-pillar links** with descriptive anchor → strengthens the triangle for Mike King "topical authority hub" pattern.

**Bridge edits: 3 pillars × 1 sentence (2 links each) = 6 link insertions.**

---

## 4. AI Mode fan-out support (per pillar, 8-12 query intents)

Verify each pillar can answer these synthetic fan-out queries via a self-contained passage of 134-167 words (Wellows "Information Island" test).

### 4.1 `/bosphorus-cruise` — 10 fan-out intents

| Query intent | Internal asset that answers it | Passage status |
|---|---|---|
| "How much does a Bosphorus cruise cost?" | Pillar H2 "Pricing" + `/blog/bosphorus-cruise-prices-2026` | OK — verify 130-160w block |
| "What's the best time for a Bosphorus cruise?" | `/blog/best-time-bosphorus-cruise` | Cross-link from pillar |
| "Day vs sunset vs night cruise — which?" | `/blog/best-istanbul-bosphorus-cruise-comparison-2026` + pillar comparison table | OK |
| "Where do Bosphorus cruises depart?" | `/blog/bosphorus-cruise-departure-points` + pillar H2 + `/bosphorus-cruise-departure-points` | OK |
| "Is the Bosphorus cruise worth it?" | Pillar testimonials section | Add 130w block ("Yes, when…") |
| "Bosphorus cruise vs ferry?" | `/blog/bosphorus-cruise-vs-ferry-istanbul-2026` | Cross-link from pillar |
| "Bosphorus cruise for kids/families?" | `/bosphorus-cruise-for-families` | Bridge link from pillar |
| "Bosphorus cruise from Sultanahmet?" | `/bosphorus-cruise-from-sultanahmet` | Departure-point block has link |
| "Winter Bosphorus cruise?" | `/blog/bosphorus-cruise-winter-guide` | Add cross-link |
| "How long is a Bosphorus cruise?" | Pillar H2 (durations) | OK — already has 90min/2h/full-day |

**Action:** Add 1 self-contained 134-167 word "Is the Bosphorus cruise worth it" block to pillar (currently missing as Information Island).

### 4.2 `/yacht-charter-istanbul` — 8 fan-out intents

| Query intent | Internal asset | Status |
|---|---|---|
| "Yacht charter Istanbul cost?" | Pillar pricing H2 | OK |
| "Private yacht for 10 people Istanbul?" | Fleet section + `/blog/choosing-yacht-size-bosphorus-charter-istanbul-2026` | OK |
| "Marriage proposal yacht Istanbul?" | `/proposal-yacht-rental-istanbul` + `/blog/marriage-proposal-yacht-istanbul` | OK |
| "Corporate yacht event Istanbul?" | `/corporate-yacht-dinner-istanbul` + `/blog/corporate-event-yacht-bosphorus` | OK |
| "Yacht charter departure marina?" | `/kurucesme-marina-yacht-charter` | Already linked |
| "Half-day vs full-day yacht?" | Pillar duration table | OK |
| "Yacht charter Istanbul vs shared cruise?" | Cross-bridge (section 3) | NEW — add bridge |
| "Birthday party yacht Istanbul?" | `/blog/yacht-birthday-party-ideas` | Add inbound |

**Action:** Verify yacht pillar has 134-167 word self-contained "What does it include" block. Currently has "Inclusions" list but not in prose. **Add prose summary block.**

### 4.3 `/istanbul-dinner-cruise` — 9 fan-out intents

| Query intent | Internal asset | Status |
|---|---|---|
| "Istanbul dinner cruise price?" | Pillar pricing H2 | OK |
| "What food on dinner cruise?" | Pillar menu section + `/blog/istanbul-dinner-cruise-menu-guide` | Add cross-link |
| "Best dinner cruise Istanbul?" | Pillar + `/best-bosphorus-sunset-cruise-2026` (sunset variant) | Bridge OK |
| "Turkish night cruise vs dinner cruise?" | `/turkish-night-dinner-cruise-istanbul` | Already linked |
| "Dinner cruise with hotel pickup?" | `/dinner-cruise-with-hotel-pickup-istanbul` | Already linked |
| "Private dinner cruise for couples?" | `/private-dinner-cruise-for-couples-istanbul` | Add inbound from pillar |
| "Dinner cruise Sultanahmet pickup?" | `/dinner-cruise-pickup-sultanahmet-taksim` | Already linked |
| "Dinner cruise vs lunch cruise?" | `/blog/bosphorus-sunset-dinner-cruise-vs-lunch` + `/blog/bosphorus-lunch-cruise-guide` | Add 2 cross-links |
| "Is dinner cruise worth it?" | Pillar testimonials | Add 130w block |

**Action:** 3 missing cross-links + 1 self-contained passage. Total **5 edits to pillar body**.

**Fan-out support edits: 1 + 1 + 5 = 7 pillar-body edits.**

---

## 5. Locale variant linking — TR / DE / FR / NL

Currently TR/DE/FR/NL blog posts often link to the **EN pillar** instead of the **locale variant** of the pillar. The `[locale]/` route exists for all 3 pillars; the links are just not wired through.

### 5.1 TR (`/tr/bosphorus-cruise`, `/tr/yacht-charter-istanbul`, `/tr/istanbul-dinner-cruise`)

10 TR product posts in `turkish-product-posts.ts`. Audit:
- `istanbul-bogaz-turu-fiyatlari-2026` → confirm body anchors point to `/tr/bosphorus-cruise` (NOT `/bosphorus-cruise`)
- `istanbul-bogaz-turu-saatleri-2026` → same
- `istanbul-yat-kiralama-rehberi-2026` → `/tr/yacht-charter-istanbul`
- `yat-kiralama-tekne-fiyatlari-istanbul-2026` → `/tr/yacht-charter-istanbul`
- `dogum-gunu-yat-kiralama-istanbul-2026` → `/tr/yacht-charter-istanbul`
- `istanbul-aksam-yemegi-turu-rehberi` → `/tr/istanbul-dinner-cruise`
- `istanbul-bogaz-gun-batimi-turu-deneyimi` → `/tr/cruises/bosphorus-sunset-cruise`
- `istanbul-evlilik-teklifi-tekne` → `/tr/yacht-charter-istanbul` + `/tr/proposal-yacht-rental-istanbul`
- `eminonu-karakoy-kabatas-bogaz-turu-2026` → `/tr/bosphorus-cruise`
- `eminonu-karakoy-kabatas-bogaz-turu-iskele-rehberi` → `/tr/bosphorus-cruise`

**Action: grep audit + fix.** Estimated 5-8 mis-pointed links per file × 10 files = **but cap at 10 edits total** (only swap the first 1-2 links per post).

### 5.2 DE / FR / NL
Each locale has 8-13 product posts. Apply same audit: every body link to one of the 3 pillar slugs must include `/{locale}` prefix.

**Cap: 5 edits per locale × 3 locales = 15 edits.**

**Within-language locale linking total: 10 TR + 15 DE/FR/NL = 25 edits.**

### 5.3 Locale pillar → locale pillar bridges

The 3-pillar bridge (section 3) is repeated in each locale variant. Already in place via shared content structure but verify the cross-bridge sentence is translated AND points to `/{locale}/...`. **3 locales × 3 pillars = 9 verifications**, count as 0 new edits (already structurally there — verification only).

---

## 6. Footer + nav strategic links

### 6.1 Current state (Footer.tsx)

Footer CORE_LINKS already includes all 3 pillars in slot 1, 3, 4 per locale. **No change needed.**

Header navItems: `cruises → /bosphorus-cruise`, `sunsetCruise → /cruises/bosphorus-sunset-cruise`, `dinnerCruise → /istanbul-dinner-cruise`, `yachtCharter → /yacht-charter-istanbul` — already there.

### 6.2 Recommended additions (LIGHT touch, footprint-safe)

| Addition | Justification |
|---|---|
| Footer "Decision guides" section with 3 links: `/compare-bosphorus-cruises`, `/istanbul-cruise-faq`, `/pricing` | Sitewide pointer to decision pages (already on pillar but sitewide reinforces) |
| Header mobile dropdown: add `/best-bosphorus-sunset-cruise-2026` under sunsetCruise | Best-of listicle = AI-Mode citation pilot; sitewide link makes it indexable as 2nd-tier landing |

**Edits: 2 sitewide structural changes.**

### 6.3 NOT recommended

- Adding all blog posts to footer (link-volume bloat)
- Adding sister-brand pillar reverse-links (footprint risk per memory `multi-brand-scaling-rules.md`)
- Adding pillar links in PromoBanner (already covered by Hero + nav)

---

## 7. Anchor text drift warning

### 7.1 Current anchor distribution estimate (sampling — 18 inbound paths per pillar)

`/bosphorus-cruise`:
- Brand/CTA-skewed: ~10 "Compare Bosphorus Cruises" / "Choose a cruise" (InlineCTA generic)
- Exact match ("Bosphorus cruise"): ~3
- Partial match: ~5
- **Distribution: 56% brand-CTA / 17% exact / 28% partial. Exact too low.**

`/yacht-charter-istanbul`:
- Brand-CTA: ~7 ("Browse yacht options", "Get a quote")
- Exact ("yacht charter Istanbul"): ~2
- Partial ("private yacht", "yacht rental"): ~8
- **Distribution: 41% brand-CTA / 12% exact / 47% partial. Exact too low.**

`/istanbul-dinner-cruise`:
- Brand-CTA: ~8
- Exact: ~2
- Partial: ~3
- **Distribution: 62% brand-CTA / 15% exact / 23% partial. Exact too low.**

### 7.2 After this map applies (estimate)

Adding 18-20 contextual links per pillar (mostly EXACT + PARTIAL):

| Pillar | Brand-CTA | Exact | Partial | OK? |
|---|---|---|---|---|
| `/bosphorus-cruise` | 32% | 22% | 36% | YES (sweet spot) |
| `/yacht-charter-istanbul` | 28% | 28% | 38% | YES |
| `/istanbul-dinner-cruise` | 35% | 25% | 32% | YES |

No drift toward over-optimization (no pillar above 30% exact match) — manipulation risk avoided.

### 7.3 Anti-pattern to refuse

**Do NOT** apply: "click here", "this page", "more info" generic anchors. **Do NOT** add 5+ identical exact-match anchors from the same source page (Connor Showler "anchor stuffing flag"). Each spoke gets **one** descriptive anchor per pillar.

---

## 8. Implementation steps (operator-actionable)

Total = **~91 edits**. Time estimate: 1 senior-content-editor day. Suggested batching across 14-day window:

| Action | File path | Effort | Priority |
|---|---|---|---|
| **Day 1: pillar self-edits (cross-bridge sentences)** | | | |
| Add cross-bridge paragraph after "Which is right" H2 | `src/app/bosphorus-cruise/page.tsx` | 5 min | P0 |
| Add cross-bridge paragraph after "Is the dinner cruise worth it" H2 | `src/app/istanbul-dinner-cruise/page.tsx` | 5 min | P0 |
| Add cross-bridge paragraph after "When private isn't worth it" H2 | `src/app/yacht-charter-istanbul/page.tsx` | 5 min | P0 |
| Add 134-167w "Is it worth it" passage (Information Island) | `src/app/bosphorus-cruise/page.tsx` | 20 min | P0 |
| Add 134-167w "What's included" prose passage | `src/app/yacht-charter-istanbul/page.tsx` | 20 min | P0 |
| Add 134-167w "Is dinner cruise worth it" passage | `src/app/istanbul-dinner-cruise/page.tsx` | 20 min | P0 |
| Add 4 missing fan-out cross-links to pillar bodies | 3 pillar files | 15 min | P1 |
| **Day 2-5: EN blog spoke pass (54 edits)** | | | |
| 20 edits — `/bosphorus-cruise` spoke list (Section 2.1) | `src/data/blog/posts/*.ts` | 90 min | P0 |
| 18 edits — `/yacht-charter-istanbul` spoke list (Section 2.2) | `src/data/blog/posts/*.ts` | 80 min | P0 |
| 16 edits — `/istanbul-dinner-cruise` spoke list (Section 2.3) | `src/data/blog/posts/*.ts` | 70 min | P0 |
| **Day 6-7: locale audit (25 edits)** | | | |
| TR locale linking fix | `src/data/blog/posts/turkish-product-posts.ts` | 30 min | P1 |
| DE locale linking fix | `src/data/blog/posts/german-product-posts.ts` | 25 min | P1 |
| FR locale linking fix | `src/data/blog/posts/french-product-posts.ts` | 25 min | P1 |
| NL locale linking fix | `src/data/blog/posts/dutch-product-posts.ts` | 20 min | P2 |
| **Day 8: sitewide structural** | | | |
| Footer "Decision guides" mini-section (2 links) | `src/components/layout/Footer.tsx` | 10 min | P2 |
| Header mobile dropdown: add `/best-bosphorus-sunset-cruise-2026` | `src/components/layout/Header.tsx` | 10 min | P2 |
| **Day 9-14: validation + IndexNow** | | | |
| Schema lint + tsc | `npm run lint:schema && npx tsc --noEmit` | 5 min | P0 |
| Internal-link audit script (NEW) | `scripts/internal-link-audit.mjs` | 60 min build + 5 min run | P1 |
| IndexNow ping all touched URLs | `npm run indexnow` | 5 min | P0 |
| GSC URL inspect 3 pillars after 48h | GSC UI / `/api/gsc/inspect` | 10 min | P0 |
| Yandex Reindex 3 pillars | Yandex Webmaster UI | 5 min | P1 |

**Effort total: ~9 hours over 14 days.**

### 8.1 Edit count check

- Pillar self-edits: 3 cross-bridges (2 links each) + 3 prose passages + 4 cross-links = **13**
- EN blog spokes: 20 + 18 + 16 = **54**
- Locale audit: 10 + 5 + 5 + 5 = **25**
- Sitewide structural: **2**

**TOTAL: 94 edits.** Under the 100-edit cap.

### 8.2 Build/deploy discipline (per project CLAUDE.md)

- `npm run build` lokal pass before any deploy
- Schema lint zero-error gate (`npm run lint:schema`)
- Max 1 deploy / day per project policy — batch into 3-4 deploys across 14 days
- Each deploy followed by IndexNow + Wayback save

---

## 9. Validation

- [ ] Re-crawl with `scripts/internal-link-audit.mjs` (to be created — script spec in 9.1) after Day 8.
- [ ] No broken internal link (404 → must be 200) — grep `href="/[^h"]` across `src/` and run head-request audit.
- [ ] Anchor text distribution within bounds: NO pillar > 30% exact-match.
- [ ] All locale variants link to within-language pillar (TR/DE/FR/NL audit clean).
- [ ] GSC URL inspect: 3 pillars show **last crawl ≤ 7 days** after Day 14.
- [ ] Yandex Reindex: 3 pillars submitted within 24h of Day 8 deploy.
- [ ] Bing Webmaster AI Performance: pillar citation count tracked Day 0 vs Day 14.
- [ ] Re-test fan-out queries on Google AI Mode / Perplexity / ChatGPT Day 14 — passage-level citation expected.

### 9.1 `scripts/internal-link-audit.mjs` spec (to build)

```text
INPUT: src/app/, src/data/, src/components/
PARSE: every <Link href="/..."> and `href="/..."` inside string templates
OUTPUT JSON:
  per-pillar:
    inbound_count
    outbound_count
    anchor_distribution { exact, partial, branded, cta_generic }
    orphan_blog_candidates: [slug list]
EXIT 1 if:
  - any pillar > 30% exact-match anchor
  - any pillar < 8 inbound contextual links
  - locale variant pillar < 3 within-language inbound links
```

---

## SOURCES

- **Cyrus Shepard (Zyppy)** — "Anchor text distribution should reflect natural language patterns, not target-keyword saturation. 20-25% exact match is sweet spot for commercial pages." (2024 anchor-text study, Zyppy.com).
- **Connor Showler (Voltage) / Chris Long (Go Fish Digital)** — striking-distance pos 4-20 + descriptive contextual anchor methodology. Showler GSC Insider 2025-Q3 thread.
- **Mike King (iPullRank)** — "AI Mode topical authority requires hub-and-spoke with descriptive anchor, not keyword stuffing." iPullRank 2025-Q4 webinar.
- **Wellows (15,847 AIO sample)** — semantic completeness 134-167 word "Information Island" → 4.2× AI citation. Cited in CLAUDE.md memory.
- **Koray Tuğberk Gübür (Holistic SEO)** — descriptive anchor methodology + sub-query fan-out internal link mapping.
- **Project CLAUDE.md** — Internal Linking rules 17-19 (footer/sitemap/llms.txt inclusion, orphan-free, ≥3 internal links per blog post).
- **MerrySails memory** — multi-brand scaling rules (no cross-brand link from this project), 130-160w → updated 134-167w Wellows window, Bing AI tracking discipline.

---

_End of map. Next reviewer action: operator approval, then begin Day 1 (pillar self-edits, ~75 min)._
