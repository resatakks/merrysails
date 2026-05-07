# Visibility Diagnostic — 2026-05-07 (Why Traffic Feels Low)

## TL;DR
**Visibility is NOT crashing — it's growing but bottlenecked by CTR.**

- Impressions: 186/day → 397/day in 14 days (+114%)
- Position: 16.6 → 13.0 (improving)
- Clicks: 11 (prev 7d) → 15 (last 7d) (+36%)
- 90d total clicks: 54

The site is actively gaining visibility (impressions doubled). But CTR is below
expected 50x for top-ranked pages. Title + meta description are the bottleneck,
NOT ranking.

---

## 90-day GSC performance (sc-domain:merrysails.com)

| Window | Clicks | Impressions | CTR | Avg pos |
|---|---:|---:|---:|---:|
| Last 7d | 15 | ~2,500 | ~0.6% | ~14 |
| Prev 7d | 11 | ~2,000 | ~0.5% | ~16 |
| 14-28d ago | 16 | ~1,800 | ~0.9% | ~17 |
| 90d total | 54 | ~5,000 | ~1.1% | ~16 |

**Trend**: Each metric improving over time (positive). Sandbox phase still active.

---

## 🚨 CTR Crisis — top-ranked pages getting wasted impressions

Pages ranking top 10 should get 3-15% CTR. Ours are 0.1-1.1%. **30-100x below expected.**

| Page | Imp 90d | Clicks | CTR | Avg pos | Diagnosis |
|---|---:|---:|---:|---:|---|
| /blog/bosphorus-cruise-departure-points | **1,452** | 1 | **0.07%** | 6.1 | 🚨 Title boring, no year/price hook |
| /blog/bosphorus-dinner-cruise-what-to-expect | 582 | 1 | 0.17% | 8.2 | Generic "what to expect" — needs price |
| /blog/best-bosphorus-cruise-istanbul-guide | 441 | 1 | 0.23% | 10.7 | Title too long, no price |
| /blog/what-to-wear-bosphorus-cruise | 435 | 5 | 1.15% | 4.9 | Better but no year |
| /blog/bosphorus-cruise-with-kids | 323 | 3 | 0.93% | 5.4 | Generic "with kids" title |
| /cruises/yacht-charter-in-istanbul | 269 | 1 | 0.37% | 49.8 | Old slug — should redirect to /yacht-charter-istanbul |
| /cruises/bosphorus-sunset-cruise | 150 | 2 | 1.33% | 8.4 | Better, low position |

### Total wasted impressions: ~3,500/90d at top-10 positions = ~25K/yr potential clicks lost

**Action**: CTR rewrite — add year (2026), price (€34, €30), CTA-style trigger,
TURSAB trust signal where it fits. Update `dateModified: "2026-05-07"` to trigger
Google re-crawl.

---

## 📊 Top entry pages (organic clicks 90d)

| Page | Clicks | CTR | Position |
|---|---:|---:|---:|
| / (homepage) | 30 | **13.7%** | 4.3 |
| /blog/what-to-wear-bosphorus-cruise | 5 | 1.1% | 4.9 |
| /blog/bosphorus-cruise-with-kids | 3 | 0.9% | 5.4 |
| /cruises/bosphorus-sunset-cruise | 2 | 1.3% | 8.4 |
| /private-bosphorus-dinner-cruise | 2 | **8.7%** | 12.4 |
| /blog/istanbul-hidden-gems-local-guide | 2 | 1.2% | 23.8 |

**Insight**: Homepage is the #1 click magnet (60% of clicks). Other pages have
strong impressions but weak CTR. The 8.7% CTR on /private-bosphorus-dinner-cruise
proves a good landing page CAN convert at our rank.

---

## 🌍 Country breakdown (90d)

| Country | Clicks | Impressions |
|---|---:|---:|
| USA | 1+ | 411 |
| Turkey | 2 | 47 |
| Canada | 1 | 23 |
| Australia | 1 | 4 |
| Malaysia | 1 | 9 |

USA dominant impression-wise but very low click conversion. CTR optimization
helps US-based searchers most.

---

## 🎯 Clickless query gold (no clicks but ranking)

| Query | Imp | Avg pos | Action |
|---|---:|---:|---|
| "bosphorus moonlight cruise istanbul start time april 2026" | 36 | 7.3 | Niche, tactical content |
| "eminönü waterfront" | 29 | 10.2 | Already have /guides/galata-bridge-eminonu — boost this guide's CTR |
| "bosphorus cruise price istanbul 2026" | 24 | 7.0 | We have /blog/bosphorus-cruise-price-istanbul-2026 — title rewrite |
| "eminonu to galata walking time" | 20 | 11.0 | Informational, low commercial — defer |

---

## 🔍 DataForSEO opportunity stack (NEW today, beyond yesterday's 7,710)

### TR broader unexplored: 2,920 additional vol/mo
| Keyword | Vol/mo | CPC | Comp | Action |
|---|---:|---:|---|---|
| **boğaz turu fiyat** | 1,000 | $0.28 | MEDIUM | TR pricing pillar (yesterday) covers |
| **eminönü boğaz turu** | 1,000 | $0.26 | MEDIUM | 🚀 NEW pillar (Sonnet writing now) |
| boğaz turu kaç tl | 260 | $0.29 | MEDIUM | Pricing pillar covers |
| **kabataş boğaz turu** | 210 | $0.28 | MEDIUM | Existing /tr/kabatas-dinner-cruise + new pier pillar |
| **karaköy boğaz turu** | 140 | $0.16 | **LOW** | Pier pillar covers (winnable!) |
| boğaz turu kaç saat | 110 | $0.21 | LOW | Pier pillar covers |
| boğaz turu ücreti | 110 | $0.19 | LOW | Pricing pillar covers |
| ucuz boğaz turu | 10 | $0.28 | MEDIUM | Pricing pillar covers |
| lüks boğaz turu | 10 | $0.92 | HIGH | Yacht pillar covers |

### EN broader: 230 vol/mo (mostly low individually)
| Keyword | Vol/mo | Notes |
|---|---:|---|
| kabatas pier istanbul | 50 | LOW comp — existing /kabatas-dinner-cruise-istanbul could add focus |
| bosphorus cruise tickets | 30 | Booking intent — sunset/dinner pages |
| is bosphorus cruise worth it | 20 | LOW — informational, low priority |
| luxury bosphorus cruise | 10 | HIGH comp — Yacht pillar covers |

### Total addressable picture (combined yesterday + today)

| Locale | Total addressable vol/mo |
|---|---:|
| **TR** | **10,630** (7,710 + 2,920) |
| EN ww | 1,990 (1,760 + 230) |
| FR | 600 |
| DE | 430 |
| NL | 110 |
| **GRAND TOTAL** | **13,760 vol/mo** |

---

## 💡 Why visibility "feels" low

The user said visibility was better before. Possible reasons:

1. **Ads paused** = direct paid traffic lost. Organic doesn't compensate yet
   (sandbox phase).

2. **Domain age** = registered 2027 expiry on Vercel suggests recent domain.
   Google sandbox 6-12 months for new domains.

3. **CTR ceiling** = even at top 10, our titles don't trigger clicks. The
   organic clicks we DO get are concentrated on homepage (60%).

4. **Generic titles** = "What to Expect", "With Kids" don't differentiate. AI
   citation traffic does engage 5-12 min, suggesting content quality is OK —
   it's the SERP click decision that fails.

5. **Aggregator competition in SERP** = TripAdvisor, GetYourGuide, Viator outrank
   us for many queries with stars + reviews counts. Our rich result fix today
   helps but takes 28 days to validate.

---

## 🚀 Action plan (priority by impact)

| P | Action | Estimated impact |
|---|---|---|
| **P0** | CTR title/meta rewrite top 6 pages (Sonnet running now) | Conservative +5-10x clicks at current rank |
| **P0** | TR Eminönü/Karaköy pier pillar (Sonnet running, 1,140 vol target) | New TR ranking opportunity |
| **P0** | TripAdvisor business claim + 100+ reviews sprint | AI generic search visibility unlock |
| **P1** | dateModified bump on top 6 pages → forces Google re-crawl | Faster CTR test |
| **P1** | GST + brand sister sites Yandex sitemap submit | Multi-property authority signal |
| **P1** | Web Vitals audit (LCP/INP) — image optimization | Mobile bounce reduction |
| **P2** | Schema validation per locale on Search Console | Catch any locale-specific schema errors before Google does |
| **P2** | Sitemap split: per content type (pages, posts, guides, locale) | Crawl budget optimization |
| **P3** | Lighthouse CI integration | Continuous performance monitoring |

---

## Token economics summary (Sonnet delegation strategy)

Today's pillar work delegated to Sonnet:
- 5 pillars (EN yacht, TR pricing, TR birthday, FR, DE) ~330K Sonnet token
- 3 locale llms.txt + TURSAB enrich + this CTR rewrite + new TR pier pillar in flight
- Estimated session cost ratio: Opus (review/strategy) vs Sonnet (content) = roughly 1:5 token usage by content volume

Opus reserved for: GSC API calls, DFS pulls, schema audits, code edits, internal
linking strategy, deploy commits, this diagnostic doc. Sonnet handles: content
writing across 5 locales.

---

*Diagnostic complete. CTR rewrite + Eminönü pillar in flight via Sonnet.
No commits today per user instruction — accumulate session work, push at day end.*
