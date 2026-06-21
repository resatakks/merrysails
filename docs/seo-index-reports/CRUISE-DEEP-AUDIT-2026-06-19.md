All core claims confirmed against live code. GS layout has `price: "280"` and `price: 280` (P0), GS foundational guide has 15 fabricated tokens vs MS's 1 (the cleanup did NOT mirror to GS), MS tours.ts still has 55 Essential/VIP references, MS quick-answers has 10 fabricated €350/€1200 tokens, and CoreBookingPlanner is English-hardcoded. The findings are accurate and not already-fixed. Producing the report.

---

# Cruise Brands Deep Audit — MerrySails (MS) + GoldenSunset (GS)
**Date:** 2026-06-19 · **Scope:** read-only synthesis, self-verified against live code · **De-duplicated:** 60 raw findings → 38 unique issues

> Verification note: I confirmed the top P0s against current code post-deploy. `MS layout.tsx:220 price: 280`, `GS layout.tsx:227/237 price "280"/280`, `agents.md` untouched since May 30, MS reservation META lacks ru/zh, MS yacht-charter h1 demoted to h2 (TourDetailClient gated behind `bookingPrefill &&` → h1=0), GS foundational price guide still carries 15 fabricated tokens (MS=1, i.e. cleanup never mirrored to GS), MS tours.ts = 55 Essential/VIP refs, MS quick-answers = 10 fabricated €350/€1200 tokens. **None of these P0s were fixed by today's deploy.**

---

## 1. P0 — DO NOW (wrong-price-live to AI / dead booking flow / fabricated tiers on indexed pages)

| # | Brand | Issue | Location (file:line / URL) | Exact fix | Effort |
|---|-------|-------|-----------|-----------|--------|
| P0-1 | both | Sitewide layout OfferCatalog declares yacht at fabricated **€280** (canonical €220) — renders on EVERY page, the machine-readable headline yacht price for Google + ChatGPT | MS `src/app/layout.tsx:220`; GS `src/app/layout.tsx:227` + `:237` | Set Offer price + priceSpecification.price `280 → 220` (both files; GS has two literals) | 5 min |
| P0-2 | GS | **GS price pillar serves fabricated Essential €280 / Premium €380 / VIP €680 LIVE** — MS's identical file was purged, GS's was NOT | `goldensunsettour/src/data/blog/posts/foundational-cruise-guides.ts` (15 tokens; slugs `bosphorus-cruise-price-istanbul-2026`, `best-bosphorus-cruise-istanbul-guide`) | Mirror MS cleanup: 6-vessel/no-package model (€220/€320/€380/€500/€600/by-quote, "from €220"); kill "from €200 per vessel"; re-lint, redeploy, IndexNow + Wayback | 30–45 min |
| P0-3 | GS | **Arabic /sa blog serves "yacht from €280" headline LIVE** (26 instances/page; primary Gulf-family GS locale) | `goldensunsettour/src/data/blog/posts/arabic-product-posts.ts` (29× €280) | Replace all €280 yacht headlines → €220; align tiers €220/€320/€380/€500/€600. Same for `german-product-posts.ts` (4×) + `turkish-product-posts.ts` (4×). Resubmit /sa,/de,/tr | 30 min |
| P0-4 | both | **Fabricated Essential/Premium/VIP tiers (€280/€380/€680, €320/€550/€850) render LIVE on ~40 locale cruise pages** via `[locale]/cruises/[slug]` | MS `src/data/tours.ts:700-1092` (11 tours, 55 refs); GS `src/data/tours.ts:2133-2525` (+ wedding €1200/€2500 :2376-77) | Strip `packages[]` Essential/Premium/VIP; set priceEur to per-vessel (Boutique 12=220); render 6-boat "from €220" OR 308-redirect locale slugs to canonicalPath like EN. Then grep `Essential\|VIP\|€280\|€380\|€680` across `src/` | 2–3 h |
| P0-5 | both | tours.ts private-yacht entries feed those fabricated prices into **Product AggregateOffer schema** on 2 live EN pages each (lowPrice/highPrice from packages → 280-680, 320-850) | MS `private-sunset-cruise-bosphorus-istanbul/page.tsx:64-66` + `private-bosphorus-dinner-yacht-charter/page.tsx:64-66`; GS `private-sunset-yacht-bosphorus-istanbul/page.tsx:68-69` + `private-dinner-yacht-bosphorus-istanbul/page.tsx:68-69` | Repoint pages at fleet.ts per-vessel model, or cap highPrice at €600 + remove tier names. **Schema currently contradicts the page's own "from €220" copy.** | resolved by P0-4 |
| P0-6 | both | **Booking planner (CoreBookingPlanner) is English-hardcoded** — every non-EN user gets an all-English booking form at the conversion step; compounds the documented 53 dead-clicks + 10 rage-clicks | MS `src/components/booking/CoreBookingPlanner.tsx` (no locale prop; "Select package":347, "Continue booking":573, "Choose the product first":230); GS same component | Add `locale` prop, route ~15 strings through a per-locale Record (mirror weekday-discount-strings.ts) for en/tr/de/fr/nl/ru/zh (+sa GS). Verify in preview on /de,/ru,/zh,/sa /reservation. Also fix image `alt={tour.nameEn}` | 3–4 h |
| P0-7 | MS | **`/ru/reservation` + `/zh/reservation` = 404** — primary "Book online" CTA dead-ends for Russian + Chinese visitors (China = #2 source country; ChatGPT = #1-2 traffic) | `src/app/[locale]/reservation/page.tsx:12` META Record (`if(!META[locale]) notFound()`; only tr/de/fr/nl keys) | Add ru + zh entries to META (GS already has all 7). Planner renders regardless — only the metadata gate needs the 2 keys | 10 min |
| P0-8 | MS | **Entire /ru and /zh header + mobile nav is full of 404 links** (about, contact, guides, faq, blog, reservation) — Header.localizeHref ignores per-locale enabled-route sets | `src/components/layout/Header.tsx:46-52` localizeHref; `src/i18n/localized-routes.ts:63-95` RU/ZH_ENABLED_ROUTES | Gate localizeHref by RU/ZH_ENABLED_ROUTES like LanguageSwitcher's `localeHasRoute()`; fall back to EN-root href (200) for un-shipped routes. Feeds 8 mobile-Sheet usages too | 30 min |
| P0-9 | both | **agents.md served live to AI agents with fabricated yacht/dinner prices** — NOT touched by today's cleanup (last mod May 30) | MS `public/agents.md` (€350/€65/€200/€280/€380) + served via `src/app/api/md/route.ts:18-20` & `next.config.ts:543`; GS `public/agents.md` (€280/€380/€680 Essential/Premium/VIP, stale capacities) | Regenerate both from fleet.ts + 4 real dinner packages; mirror clean /llms.txt route content; remove Essential/Premium/VIP + stale vessel counts (10/14/36/44→12/15/40/90/150) | 30 min |
| P0-10 | MS | **Fabricated €350 yacht-dinner "deck" price renders live** on locale corporate/private dinner pages (inconsistent w/ EN €320, both wrong vs canonical from €220) | `src/data/quick-answers.ts:349,355,373,427,433,439,451` (GS: 9×) — header says "AI engines quote these verbatim" | Reprice to real per-vessel model; reconcile the EN €320 too — pick ONE operator-confirmed private-dinner figure, propagate EN + all locales + both brands. **Operator decision: confirm the private-dinner number.** | 1 h |

**P0 grouping for one batch commit:** the price-fabrication cluster (P0-1,2,3,4,5,9,10 + F-series below) is one sweep — fix all `€280 / €350 / €680 / Essential/Premium/VIP / €200-floor / €1200-event` tokens across `tours.ts`, `quick-answers.ts`, blog locale posts, `agents.md`, `llms*.txt`, `InArticleBookingCTA.tsx`, `tour-locales.ts`, then re-lint + grep-verify zero residual before deploy.

---

## 2. P1 — THIS WEEK

| # | Brand | Issue | Location | Exact fix | Effort |
|---|-------|-------|----------|-----------|--------|
| P1-1 | both | **`/yacht-charter-istanbul` renders ZERO `<h1>` in SSR** — page-level h1 wrongly demoted to h2 on a false "TourDetailClient h1 is unconditional" assumption; TourDetailClient is gated behind `{bookingPrefill && …}` so never renders on normal load. TÜRSAB backlink target, 590/mo pillar | MS `src/app/yacht-charter-istanbul/page.tsx:567` (h2) + `:589` gate; GS `:703-713` | Promote the line-567 h2 "Yacht Charter Istanbul" back to `<h1>`. Verify exactly one h1. Both brands | 15 min |
| P1-2 | both | **fleet.ts yacht descriptions leak English** on all non-EN money pages (ru/zh/sa=0 coverage; de/fr/nl only 1 of 6 yachts). yacht-charter is a top-4 pillar | MS + GS `src/data/fleet.ts` i18n Partial | Populate de/fr/nl (all 6 yachts) + ru/zh (+sa GS): tagline + description per vessel | 3–4 h |
| P1-3 | both | **Dinner package descriptions in tours.ts leak English** on non-EN dinner pages (not covered by tour-locales.ts). 3,000 vol/mo pillar | `tours.ts:351,354,370,390,407` packages array; renders on `/[locale]/istanbul-dinner-cruise` | Add dinner-package label/description/items to tour-locales.ts override (or parallel package-strings map), all active locales, both brands | 2 h |
| P1-4 | MS | **MS Footer secondary columns hardcoded English on every locale** + EN-root hrefs (serviceLinks/experienceLinks/planLinks/companyLinks/blogLinks/guideLinks). /tr visitor clicking "About" leaves locale. **GS Footer does NOT have this bug** | `src/components/layout/Footer.tsx:108-173` | Port GS's `buildLinks(HREFS, LABELS, locale)` pattern: move labels into chrome-strings per-locale, locale-prefix hrefs via gated localizeHref | 2 h |
| P1-5 | GS | **GS /zh renders entire header/footer/switcher + home sub-components in English** — zh is active but missing from CHROME_LOCALES + home Records (~half-English "Chinese" page) | `goldensunsettour/src/i18n/chrome-strings.ts:20-22,634-650`; `[locale]/page.tsx:1369` | Add zh to ChromeLocale + detect + a zh chrome Record; add zh to TourGrid/FeaturedTour/Testimonials/CTASection Records — OR descope /zh until built | 4 h |
| P1-6 | both | **AI-cited quick-answers say event yacht "from €1,200 (4h min)"** — canonical Event 90 = €600 (doubles the real headline). Also in MS `german-product-posts.ts` (9 lines) | MS `quick-answers.ts:136,172`; GS 3×; `german-product-posts.ts:92,248,…` | Set event-yacht headline to €600 (or a 4h figure derived from €600 + 10% rule) consistently. **Tied to GEO operator decision below** | 1 h |
| P1-7 | both | **/pricing lists wrong departure piers** (Kabataş/Beşiktaş/Bebek) contradicting canonical Karaköy (sunset) + Kuruçeşme Marina (yacht) — llms.txt explicitly warns AI not to give a single pier, yet /pricing does | MS + GS `src/app/pricing/route.ts:28,47,67` | Sunset = Karaköy ferry pier (Mimar Sinan statue); Yacht = Kuruçeşme Marina; Dinner = Kabataş (already correct). Remove "Beşiktaş/Bebek (your choice)" | 20 min |
| P1-8 | MS | **MerrySails Bing/Copilot impressions hard-crashed to 0 from June 9** (7+ straight zero days); GS did NOT crash. Pages indexed/robots OK — quality re-eval of informational/blog long-tail (Lily Ray /articles pattern), DMCA secondary. MS top Bing queries were all informational, zero commercial | Bing GetRankAndTrafficStats sc:merrysails.com | (1) IndexNow re-push 3 commercial pillars to Bing; (2) audit the blog/informational posts Bing ranked-then-dropped for thin/derivative signals, prune/strengthen; (3) check Bing Webmaster for manual action; (4) prioritize getting COMMERCIAL pages ranking on Bing (ChatGPT=Bing infra) over recovering lost informational impressions | 2 h triage + ongoing |
| P1-9 | both | **MS + GS llms-full.txt are 0.518 word-Jaccard** (rule <0.5) + tours.ts shares 57 byte-identical product paragraphs + 5/6 testimonials byte-identical w/ identical reviewer names — clone-pair / scaled-content footprint on the AI surface ChatGPT cites | MS vs GS `llms-full.txt`, `tours.ts`, `testimonials.ts` | Differentiate GS toward family/budget voice (kids 0-3 free / 3-8 50%, family-of-4 worked examples); rewrite GS testimonials w/ distinct names+prose; target word-Jaccard <0.45. Prioritize money-page tours first. Remove dead "VIP dinner cruise" wording | 1–2 days |
| P1-10 | GS | **GS sunset longDescription is near-verbatim paraphrase of MS** (the operator's own flagged "lexical paraphrase = scaled content abuse" death-fitil) | GS `tours.ts:184` vs MS `tours.ts:197` | Rewrite GS sunset/dinner/yacht longDescriptions from family/budget angle, distinct structure, GS-specific first-party detail. Same pier OK; prose must not be a reword. Re-check pair <0.4 | 3 h |
| P1-11 | MS | **Double " \| MerrySails \| MerrySails" title suffix on all ~40 locale cruise-slug pages** (missing `{absolute}` wrapper; GS uses absolute correctly here) | `src/app/[locale]/cruises/[slug]/page.tsx:87-88` | Wrap `title:{absolute: title}` OR drop manual " \| MerrySails" + let template add once. Also localize tour.nameEn so /tr titles aren't English | 30 min |
| P1-12 | GS | **GS cruise-slug titles leak internal jargon " \| GoldenSunsetTour Service Page" to SERP**; also stays English on /tr | `goldensunsettour/src/app/[locale]/cruises/[slug]/page.tsx:71` | Remove " Service Page" literal; clean localized title; localize tour.nameEn | 20 min |
| P1-13 | GS | **GS /bosphorus-cruise money-page title renders 77 chars w/ double " \| " separator** | `goldensunsettour/src/app/bosphorus-cruise/page.tsx:12` | Shorten source to ≤41 chars, no internal pipe, e.g. "Family Bosphorus Cruise Istanbul — €30" | 5 min |
| P1-14 | GS | **GS fleet BoatCard images request quality=80** not in `images.qualities [72,75]` → HTTP 400 broken images on scroll | `goldensunsettour/src/components/yacht/BoatCard.tsx:149` vs `next.config.ts:24` | `quality={80} → 75` (one-line). MS clean | 2 min |
| P1-15 | both | **InArticleBookingCTA renders "Private yacht — €200+"** (canonical €220) in live blog posts; tour-locales.ts yacht intro also "from €200" all locales | MS `InArticleBookingCTA.tsx:146-221` + `tour-locales.ts:161,243,281,319,357`; GS `:153-262` | `€200+ / from €200 → €220+ / from €220` all locales both brands | 30 min |
| P1-16 | both | **quick-answers private/corporate yacht "from €350 the deck"** — no €350 tier exists (same root as P0-10, EN-locale variants) | MS `quick-answers.ts:349,355,361,427,433,439,451`; GS 9× | Reprice to real per-vessel model, all locales both brands | merged into P0-10 |
| P1-17 | both | **team.ts author/founder bios are English-only on every locale** AND publicly enumerate the MS↔GS↔MerryTourism sister relationship + license #14316 on every localized author card (same-owner footprint) | MS `team.ts:15,22,29`; GS `:19,27,28,37,65` | Add localized bio variants (tr/de/fr/nl/ru/zh +sa GS). Reconsider whether explicit sister-brand enumeration belongs in a customer-facing bio on every page vs a single nofollow about/parentOrganization disclosure | 2 h + decision |
| P1-18 | MS | **Sitemap lastmod (2026-05-31) decoupled from page dateModified (06-13) and today's price deploy** — weak Bing recrawl trigger exactly when it re-evaluated quality (the concrete Copilot-recovery lever) | `src/app/sitemap.xml/route.ts:127` (lastmod=latestBlogDate) | Set commercial lastmod to `max(latestBlogDate, SITE_LAST_MODIFIED)`, redeploy, IndexNow-push the price-changed URLs, request recrawl in Bing Webmaster | 30 min |
| P1-19 | MS | **4 locale dinner pages emit AggregateOffer lowPrice:55 highPrice:119** (canonical €30-90); contradicts sibling Product Offer price:30 on same page; ships ×7 locales each | `kabatas-dinner-cruise-istanbul/page.tsx:919-920`, `turkish-night…:775-776`, `dinner-cruise-with-hotel-pickup…:844-845`, `dinner-cruise-pickup-sultanahmet-taksim:773-774` | Replace 55/119 → 30/90, ideally derived from dinnerTour.packages like EN-root already does | 30 min |
| P1-20 | GS | **Lone GS dinner-pickup page still 55/119** (sister GS dinner pages already reconciled to 30/90) | `goldensunsettour/src/app/[locale]/dinner-cruise-pickup-sultanahmet-taksim/page.tsx:1094-1095` | 55/119 → 30/90 | 5 min |
| P1-21 | MS | **EN-root /bosphorus-cruise Product AggregateOffer highPrice "680"** (canonical ceiling €600); page copy says "from €220" → schema contradicts | `src/app/bosphorus-cruise/page.tsx:158` | highPrice "680" → "600" | 2 min |
| P1-22 | GS | **7 GS EN-root pages hardcode yacht Offer price "280"** (separate literals from the data leak) | `bosphorus-cruise:79`, `luxury-yacht-charter-istanbul:54`, `honeymoon-cruise-istanbul:56`, `kurucesme-marina-yacht-charter:64`, `private-bosphorus-dinner-cruise:107`, `proposal-yacht-rental-istanbul:107`, `besiktas-yacht-charter:50` | `280 → 220` (or source fleet.ts) | 20 min |
| P1-23 | GS | **GS private-dinner-couples AggregateOffer highPrice "1800"** (no canonical basis; ceiling €600) | `goldensunsettour/src/app/private-dinner-cruise-for-couples-istanbul/page.tsx:69` | Cap highPrice at €600 | 2 min |
| P1-24 | GS | **GS best-bosphorus-cruise-2026 (locale) AggregateOffer lowPrice "15" highPrice "1200"** (both fabricated; ships all locales) | `goldensunsettour/src/app/[locale]/best-bosphorus-cruise-2026/page.tsx:1446-1447` | lowPrice 30, highPrice 600 | 2 min |
| P1-25 | MS | **MS locale cruises/[slug] attaches aggregateRating to ["TouristTrip","Service"]** — forbidden parent per RULES §4a (linter misses it: rating inside spread-ternary). EN root + GS equivalent correctly omit | `src/app/[locale]/cruises/[slug]/page.tsx:258-268` | Remove aggregateRating from TouristTrip/Service; add sibling Product carrying the rating (mirror EN root + GS) | 20 min |
| P1-26 | GS | **GS llms-full RU line "до €600+"** vague upper bound, inconsistent with €500 Signature / Event-Mega by-quote | `goldensunsettour/src/app/llms-full.txt/route.ts:159` | "от €220 за яхту; Group Signature до €500, Event/Mega — по запросу" | 5 min |
| P1-27 | MS | **LIVE MS llms.txt still serves €600 Event price** the local file already changed to "by quote" — live AI surface disagrees w/ source AND /pricing (€1,200) | `merrysails.com/llms.txt` (live) vs `src/app/llms.txt/route.ts:240,476,664` | After GEO-02 decision, redeploy so llms.txt + llms-full + /pricing all serve ONE Event figure; curl-verify | merged w/ deploy |

---

## 3. P2 / P3 — BACKLOG

**P2:**
- **GS /pricing internal contradiction**: Event yacht "by quote" in table (`route.ts:75`) vs "from €600" in FAQ (`:109`). Pick one (align w/ GEO-02). · GS
- **/pricing mislabels founding year as license #** ("TÜRSAB A-Group #2001"). Real # = 14316. AI will cite a fabricated license number. `MS+GS pricing/route.ts:14` → reference `TURSAB_LICENSE_NUMBER`. · both
- **Stray €280 + €55 yacht tokens in MS llms.txt** (live: €220×26 correct, but €280×1, €55×1 from competitor-comparison row `route.ts:268`). Replace €280→€220; keep €55 only if real attributed third-party figure. · MS
- **Two conflicting LocalBusiness postal addresses on MS /yacht-charter-istanbul** (Fatih/Divanyolu/34093 vs Karaköy/Beyoğlu/34421) — NAP inconsistency. Standardize to one TÜRSAB-registered office sitewide. · MS
- **GS homepage TTFB 0.84s + 683KB HTML vs MS 0.28s/477KB** (27 vs 20 JSON-LD blocks) — 3× slower server response. Trim redundant JSON-LD, ISR/revalidate parity. (Operator's "LCP 8s" = dev-server artifact; prod MS fine.) · GS
- **Non-EN QuickAnswer blocks far below 134-167w target** (ZH 18/15w, TR/FR/NL/RU ~50w; GS EN also short). Expand all, pass Information-Island test, update obsolete "40-60 word" comment in `QuickAnswer.tsx:7`. Prioritize ZH. · both
- **Fabricated tiers still in tours.ts on redirected slugs** (latent P0 — one un-redirect re-publishes wrong prices; also pollutes any AI/agent ingesting the module). Delete dead tour objects or rewrite to per-vessel. · both
- **MS yacht-charter importantNotes says "all three packages"** but fleet now has four (`tours.ts:639`). "three"→"four". · MS
- **MS BADGE_TRANSLATIONS missing 10+ badges** (Party/Wedding/Anniversary/Corporate/Summer/etc. leak English). Copy complete set from GS `tour-badge.ts`. · MS
- **GS turkish-night Event offers AggregateOffer missing explicit `price`** (linter flag; prices correct). Add `price: 30`. · GS
- **GS blog Article author = dangling @id** to a Person node not emitted on page. Emit Person JSON-LD or inline like MS; reconcile two schemaId conventions (`#person-captain-yusuf` vs `#captain-yusuf`). · GS
- **GS locale product-blog cluster (~73 posts)** thin/near-duplicate — correlates w/ the ~150-200→110 deindex trim. Fix €280 first (P0-3), then audit per-URL GSC impressions, consolidate/410 zero-impression remainder. · GS
- **GS CoreBookingPlanner missing the re-click scroll feedback** MS added (residual dead-click source). Port MS `scrollIntoView('[data-booking-package-selector]')`. · GS

**P3:**
- MS Organization sameAs cross-lists unrelated brands (kingsworldtransfer.com, acilkaseniz.com) — behavioral footprint. Remove; keep only true MS profiles; express parentage via parentOrganization @id. GS sameAs is clean. `MS layout.tsx:160-161`. · MS
- /pricing "cheapest cruise" FAQ cites €34, ignores €30 floor (sunset Mon/Tue/Thu + dinner Silver Soft €30). Lead with €30. `MS+GS pricing:104-105`. · both
- Rating values differ across surfaces within each brand (homepage 4.9/998 vs /pricing "4.9 combined" vs 4.88/312, 4.93/621). Drive all from one constants source; don't claim Viator/TripAdvisor "combined" unless in sameAs. · both
- Stale static `public/llms.txt` + `llms-full.txt` carry €280/€380/€680 (overridden by route handlers, not served). Delete or sync. · MS
- globals.css comment names DMCA-filer "Pixel-perfect match to bosphorussunset.com" (`GS globals.css:9`) — self-incriminating source footprint. Remove. · GS
- brand-stats.ts fleetDescription + scale figures byte-identical (ratings already differentiated). Optionally reword GS string. · both
- `[locale]/reservation` pages have no H1 (root /reservation does) — noindex, accessibility nit only. · both
- GS video sitemap content_loc → external tiktok.com URLs (Google Video likely ignores). Host on-domain or drop. · GS
- GS OFFER_RETURN_POLICY omits returnFees (MS has FreeReturn). Add for parity. · GS
- MS openapi.json locale enum omits ru/zh; example price 320 arbitrary. Add when those flows accept; annotate example. · MS
- BookingModal stale "ru → Telegram" comment (behavior correct = WhatsApp; comment risks a future dev re-adding forbidden branch). `BookingModal.tsx:910`. · MS
- lint-schema.mjs aggregateRating-parent rule blind to spread-wrapped ratings (why P1-25 passed clean). Harden brace-match + treat rating on Service/TouristTrip/Place/Offer as ERROR regardless of co-located Event. · both
- Booking planner tour-card `alt={tour.nameEn}` English on all locales (fix w/ P0-6). · both
- **Stale-crawl false positives (no code change — re-run scan):** Bing Site Scan 103 HTTP-4xx phantom /tr|/de|/fr/blog URLs + 32 H1-missing are a 22-day-old crawl; /tr,/de,/fr,/nl/blog all return 200 live. GS indexed-count drop (~150-200→110) is benign long-tail trim; all money pages PASS. Trigger fresh Bing Site Scan; do NOT chase as live errors.

---

## 4. SEO / GEO / AI VISIBILITY GROWTH ROADMAP — "ne yapacağız?"

Ranked by **impact × (1/effort)**. ChatGPT = #1-2 traffic source for both brands → **AI-file price accuracy is the multiplier on every other play.**

| Rank | Play | Why it grows visibility | Impact × Effort | Brand |
|------|------|------------------------|-----------------|-------|
| **1** | **Purge ALL fabricated price tokens from AI surfaces** (agents.md, llms*.txt, quick-answers, tours.ts, blog locale posts) | ChatGPT/Copilot cite these verbatim; wrong prices = lost trust + lost bookings on the #1 channel. Single highest ROI. | HIGH × LOW | both |
| **2** | **Single-source pricing → fleet.ts feeds every AI file at render time** | Kills price drift permanently (today there are 3 contradictory Event prices: €600 / €1200 / by-quote). Prevents recurrence of plays 1. | HIGH × MED | both |
| **3** | **MS Bing/Copilot crash recovery**: IndexNow-push 3 commercial pillars + bump sitemap lastmod + audit/prune the informational blog posts Bing dropped + check manual action | Recovers the Bing surface that ChatGPT runs on (Bing infra); GS proves the brand can stay alive on Bing. | HIGH × MED | MS |
| **4** | **Restore yacht-charter `<h1>` both brands** | 590/mo pillar + TÜRSAB backlink anchor target currently can't bind anchor juice (h1=0). | MED × LOW | both |
| **5** | **De-clone GS from MS** (testimonials, tours longDescriptions, llms-full, sunset paraphrase → family/budget voice, Jaccard <0.45) | Removes the scaled-content/site-reputation classifier risk that can make one brand suppress the other in AI answers. | HIGH × HIGH | both |
| **6** | **Localize booking planner + fleet + dinner packages (zero English leak)** | Non-EN (zh ~50% English, ru) = the ChatGPT-driven growth markets; full translation lifts conversion + dwell + avoids "thin translation" signal. | HIGH × HIGH | both |
| **7** | **Expand QuickAnswer blocks to 134-167w + Information-Island test, all locales** (esp. ZH one-liners) | Wellows: 134-167w self-contained = 4.2× AI citation. Currently non-EN blocks are uncitable standalone. | MED × MED | both |
| **8** | **CTR/title rewrites**: kill double " \| MerrySails", GS " Service Page" jargon, GS 77-char title; localize nameEn in titles | Clean SERP titles on ~80 locale pages; the brands just exited sandbox (MS pos 56→11, GS 26→11) so CTR is the gap, not ranking. | MED × LOW | both |
| **9** | **Striking-distance KW (Connor Showler pos 4-20)**: MS Bing top queries are all informational at pos 4-9 with zero commercial — pull GSC pos 4-20, add one H2 + one FAQ + internal link per commercial pillar, IndexNow | Cheapest free ranking lever; both brands are post-sandbox so small pushes move pos 11→top-5. | MED × LOW | both |
| **10** | **Freshness cadence**: monthly dateModified on pillars + sitemap lastmod tied to data changes | AI-cited content averages 458 days fresher (Ahrefs); also the Bing recrawl trigger. | MED × LOW | both |
| **11** | **Entity / multimodal**: verify both Wikidata items populated; add ≥1 high-authority third-party profile per brand (Things-to-Do OBM via Bokun/FareHarbor) to sameAs; one operator-on-camera YouTube per brand w/ on-page transcript + VideoObject | YT mention > backlink for AI citation (Ahrefs r=0.737 vs 0.218); 3rd-party travel profiles are what Bing-backed ChatGPT leans on for operators. | MED × HIGH | both |
| **12** | **Market expansion**: finish CN (/zh chrome + home), RU (/ru locale completeness), DE (fleet/dinner translations) | Removes the half-English barrier on the exact ChatGPT-driven non-EN markets. | MED × HIGH | both |

---

## 5. UI / UX FIX LIST

**Booking flow (highest revenue leverage — this is where the 53 dead-clicks + 10 rage-clicks live):**
- CoreBookingPlanner fully English on non-EN /reservation + hero widget → localize (P0-6). MS /ru/reservation + /zh/reservation are outright 404 (P0-7).
- GS planner missing re-click scroll feedback → re-taps register as dead clicks (port MS fix).
- Verify package cards / date cells are actually clickable targets — the rage-clicks suggest a hit-area/handler issue, not just copy. **Confirm in Clarity + preview.**
- Booking planner tour-card image alt is English on all locales.

**Navigation / links:**
- MS /ru + /zh header + mobile nav: about/contact/guides/faq/blog/reservation all 404 (P0-8). MS Footer /reservation link 404 for ru/zh (same root). MS Footer secondary columns English + leave-locale on every non-EN page (P1-4).

**i18n rendering:**
- GS /zh ~half English (chrome + home sub-components) (P1-5). MS /zh ~50% English (planner + WeekdayDiscountBanner + "Best Seller" banner + Duration/Format/Departure/Included labels). fleet + dinner-package + team-bio + badge English leaks (P1-2,3,17; F11).
- MS locale homepages thinner than EN (no FeaturedTour blocks / Testimonials / LatestBlogPosts); GS already mirrors these — add for EN parity + non-EN dwell. · MS

**Visual / performance:**
- GS BoatCard q=80 → 400 broken boat images on scroll (P1-14, one-liner). GS homepage 3× slower TTFB + 683KB (trim JSON-LD).
- MS hero `<img>` missing fetchpriority=high (preload covers it; verify Next `priority` prop isn't stripped).

**Accessibility:**
- MS /yacht-charter-istanbul (+GS) zero h1 (P1-1). Locale /reservation pages no h1 (noindex, parity nit).

---

## 6. THE SINGLE HIGHEST-LEVERAGE NEXT ACTION

**Run one price-fabrication purge sweep across both brands' AI-facing surfaces and redeploy.**

Concretely, in one branch: fix `MS+GS layout.tsx` OfferCatalog (€280→€220), `public/agents.md` (both), `quick-answers.ts` (€350, €1200), `tours.ts` fabricated Essential/Premium/VIP tiers, GS `foundational-cruise-guides.ts` + `arabic/german/turkish-product-posts.ts`, `InArticleBookingCTA.tsx` + `tour-locales.ts` (€200→€220), and the 7 hardcoded GS yacht "280" pages — then `grep -rE 'Essential|Premium|VIP|€?280|€?350|€?680|1[.,]200' src/ public/` must return **zero** non-canonical hits, run `npm run lint:schema && tsc --noEmit`, deploy, and IndexNow + Wayback the changed URLs.

**Why this one:** ChatGPT is the #1-2 traffic source for both brands and cites these files verbatim; every fabricated token is actively quoting a wrong price to buyers right now, and none of it was touched by today's deploy. It is high-impact, low-effort, and unblocks the GEO recovery plays. It is bounded by a single grep gate, so "done" is verifiable.

---

### Operator-decision items (cannot proceed without your call)
1. **Event Yacht 90 price** — €600 (2h) OR from €1,200 (4h min)? Three live surfaces disagree. Picking one unblocks P1-6, P1-27, GS /pricing, fleet.ts. (GEO-02/05)
2. **Private-dinner-yacht "deck" price** — EN says €320, locales say €350, canonical floor €220. Confirm the real number to propagate. (P0-10)
3. **Sister-brand disclosure** — keep the explicit MS↔GS↔MerryTourism + license-#14316 enumeration in the customer-facing author bio on every locale page, or move to a single nofollow about/parentOrganization disclosure? (P1-17, footprint)