# 🔎 CRUISE Daily Deep Sweep — 2026-06-23

Position/channel trend → see `TREND.md`. This file = the strategic findings + the routine the daily ops should follow. Compare future sweeps against this.

## TL;DR — what the data actually says
- **Organic position is GOOD now** (sandbox exited, most money pages pos 5-9). The bottleneck is **CTR + impression volume + authority**, NOT rank.
- **AI Assistant (ChatGPT/Claude) is the #1 working channel** (GA4 7d: MS 76 sess/28 keyEvents, GS 44/15). GEO is where the money is.
- **WIN:** 4 MS yacht detail pages went Discovered→INDEXED in 1 day (Request-Indexing + "Explore each yacht" links).
- **Booking flow is NOT broken** — GS funnel 51 sessions→23 Book in 3d. The big dead-click counts (sunset 338/612) are mostly exploratory clicks on body text/prices + already-fixed translate issues, NOT a broken CTA.

## 🚨 CRITICAL CORRECTIONS (stop repeating the old assumptions)
1. **Keyword volumes in CLAUDE.md/KEYWORDS.md are 2-4× INFLATED.** Fresh DataForSEO UK: `bosphorus cruise` **1,600** (not 6,600), `istanbul dinner cruise` **70** (not 1,600), `yacht charter istanbul` **10** (not 590), `sunset cruise istanbul` **70**. Base content investment on FRESH volume, not the legacy playbook. The big-commercial prize is small + OTA-saturated → not worth out-authority-ing.
2. **FAQ/schema = AI-citation signal is DEBUNKED** (Ahrefs May 2026: schema added ZERO citation lift, -4.6% on AIO; Google officially debunked schema-overfocus). Keep existing schema for rich results only; do NOT add schema for GEO. (Our memory still lists "FAQPage = AI signal" — it's wrong.)
3. **Self-promotional GEO listicles now actively demoted** (Lily Ray, May 2026 core update, 40-95% drops). Our "best-X listicle pilot" is a demotion risk unless genuinely substantive w/ transparent self-ranking + real competitor inclusion. Do NOT scale the format.
4. **Crawl budget is a NON-ISSUE under ~10,000 pages** (Google's own threshold). MS=462 / GS=440 indexable URLs. **noindex does NOT save crawl budget** ("Google still requests then drops — wasting crawl time") AND **breaks hreflang clusters.** → Do NOT noindex low-volume locales (see Multi-locale below).

## Bottleneck (verified — minimal real fixes)
- ✅ FIXED: GS CoreBookingPlanner missing the smart-date useEffect (pre-select tomorrow) MS has → ported (funnel-quality/pre-fill lift). + scroll-mt-28 on planner section both repos (jump clears fixed header).
- ❌ NOT bugs (verifier rejected): single-package no-op card (all core tours have ≥2 packages); "Choose & book now" anchor (always resolves). Don't over-engineer.
- The translate=no + affordance fixes (2026-06-22) already addressed the real dead-click sources. Re-check Clarity in a tight post-deploy window before claiming new "fixes."

## Keyword strategy (effort allocation: 60% long-tail+CTA / 25% GEO / 15% striking-distance)
- **P0 — booking-bridge CTAs on high-impression informational pages** (the fastest revenue lever — 80% of impressions sit here at <0.4% CTR): vs-ferry blog (2,986 imp!), /guides/ortakoy-mosque (1,575), /guides/istanbul-bosphorus-bridges (1,472), /blog/bosphorus-cruise-with-kids (930), tipping-guide (1,094). Add ONE contextual in-content CTA each (NOT a sitewide strip — RED LINE). GS too, in GS voice (no 1:1 paraphrase).
- **P1 — striking-distance commercial:** `private yacht istanbul price` pos 8.9 (already 11% CTR) → H2 "Private Yacht Istanbul — Price & What's Included" (real €220 floor) on /yacht-charter-istanbul. Cluster pos 4-10: `bosphorus cruise from sultanahmet` (3.7), `bosphorus cruise price 2026` (5.7), family terms (3.0/8.3) → 1 FAQ/H2 + 1 internal link each.
- **P1 — money-page CTR:** /bosphorus-cruise pos 6.5 but ~0 clicks → title rewrite (price+benefit hook).
- **DON'T:** chase head-term authority on "bosphorus cruise"/"dinner cruise" — small real volume + OTA-saturated + authority-gated. Paid Ads is the right tool for head-term commercial intent.

## Multi-locale verdict (operator hypothesis DEBUNKED — honest)
- The "noindex low-volume locales to save crawl budget" idea **backfires**: crawl budget is a non-issue at 440-462 URLs; noindex wastes crawl + breaks hreflang clusters.
- The EXISTING staging system (ACTIVE_LOCALES + RU/ZH/SA_ENABLED_ROUTES gating hreflang + sitemap) is the CORRECT pattern. **Stage FORWARD by readiness; never retroactively noindex a page that earns impressions** (resets the sandbox clock).
- Inventory: MS 462 (EN 210 [133 blog], tr 66, de 51, fr 51, nl 50, ru 29, zh 5); GS 440 (EN 135, tr 61, de 53, fr 53, nl 53, ru 40, **sa 34, zh 11**). The operator's "~35 EN" undercounts EN ~6× (most are blog posts).
- **Only defensible trim:** GS over-emits **sa (34) + zh (11)** which aren't Google-search markets — consider narrowing their ENABLED_ROUTES to homepage+4 pillars via STAGING (not noindex), reason = translation-quality/readiness. Verify GSC per-locale impressions first; freeze any URL with >0 impressions as KEEP.

## 🔁 ROUTINE ADDITIONS (research-backed, add to daily/weekly ops)
**GEO/AI (our working channel — prioritize):**
- **WEEKLY — Brand-demand building** (brand search volume = #1 AI-citation predictor, > backlinks; 5W 680M-citation study). Ask completed-cruise guests (WhatsApp/email) to search "MerrySails Bosphorus"; chase 1 branded editorial mention/wk.
- **WEEKLY — Off-site mention seeding** (85% of AI mentions are third-party; Reddit #1 for travel, Tripadvisor #1 for Perplexity). 1 authentic operator Reddit answer/mo (verified TÜRSAB bio, no link drops) + keep Tripadvisor/Google/Trustpilot review-responses current.
- **WEEKLY — Bing-index verification** (ChatGPT only cites Bing-indexed pages; IndexNow already firing). Verify 6-10 commercial/pillar URLs are Bing-indexed. **GS Bing Webmaster 404/unverified = live hole (task #19) — fix.**
- **ONE-TIME→MONTHLY — Google Things to Do listing** (feeds OUR price/URL into Google AI Overviews + Gemini at 0% commission, via GBP Ticket & Activities editor). Travel-specific; missing from our playbook.
- **WEEKLY — Entity clarity** (consistent NAP + 1-line descriptor across site/GBP/Tripadvisor/social; NOT more schema). Phone +90 544 898 98 12 byte-identical everywhere.
- **WEEKLY — Information-Gain pass** (1 unique first-party datum per commercial/pillar page — real sunset times from Kabataş, 50k-guest stat, 6-boat specs; uses the 994 photos). This is the on-page work that still moves AI citation post-schema-debunk.
- **MONTHLY — AI-citation tracking KPI** (replaces vanity rank): 10 fixed prompts across ChatGPT/Perplexity/Gemini ("best Bosphorus cruise Istanbul", "private yacht Istanbul price", "is MerrySails good?") → log appearance + price-accuracy + OUR-URL-vs-OTA.

**SEO:**
- DAILY — GSC pos 4-20 + imp≥3 filter: pick 1/day, add 1 FAQ/H2 + 1 internal link to the already-ranking page (Vengeons 20-min routine).
- WEEKLY — re-pull DataForSEO money-cluster volumes quarterly (legacy figures inflated). Audit top-10 high-impression pages for a booking-bridge CTA.

## Action queue (next)
1. P0: booking-bridge CTAs on the 5 high-impression informational pages (MS + GS, distinct voice).
2. P1: "private yacht istanbul price" H2 + striking-distance cluster FAQ/links.
3. P1: /bosphorus-cruise title CTR rewrite.
4. GS Bing Webmaster verify (task #19).
5. Google Things to Do listing setup (operator — GBP).
6. Deploy the 2 booking fixes (GS smart-date + scroll-mt) with the next batch.
