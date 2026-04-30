# Backlink URL Tracking Plan — merrysails.com

**Date:** 2026-04-30
**Owner:** SEO/Backlink ops
**Daily monitor:** `/api/seo/rankings` (cron 07:00 UTC, see `vercel.json`)
**Live SERP source:** DataForSEO `/serp/google/organic/live/advanced` depth=100

## 6 Priority Backlink Targets

These are the URLs we will actively build backlinks to. Anchor text is the primary keyword
the link should rank for. Live rank is captured from DataForSEO on the date above.

| # | URL | Anchor Keyword | Market / Loc / Lang | Live Rank (2026-04-30) | 30-day Target | 90-day Target |
|---|-----|----------------|---------------------|------------------------|---------------|---------------|
| 1 | https://merrysails.com | bosphorus cruise istanbul | TR-tourist / 2792 / en | Not in top 100 | Top 50 | Top 20 |
| 2 | https://merrysails.com/cruises/bosphorus-sunset-cruise | bosphorus sunset cruise | TR-tourist / 2792 / en | Not in top 100 | Top 60 | Top 25 |
| 3 | https://merrysails.com/istanbul-dinner-cruise | istanbul dinner cruise | TR-tourist / 2792 / en | Not in top 100 | Top 60 | Top 25 |
| 4 | https://merrysails.com/de | Bosporus Kreuzfahrt Istanbul | DE / 2276 / de | Not in top 100 | Top 70 | Top 30 |
| 5 | https://merrysails.com/de/cruises/bosphorus-sunset-cruise | Bosporus Sonnenuntergangsfahrt Istanbul | DE / 2276 / de | Not in top 100 | Top 80 | Top 35 |
| 6 | https://merrysails.com/de/istanbul-dinner-cruise | Istanbul Dinner Cruise (DE) | DE / 2276 / de | Not in top 100 | Top 80 | Top 35 |

> **Reality check:** All 6 URLs are currently outside top 100. The DE locale shipped recently
> (commit `0e98d04`), and the EN core pages have low DR. Backlink campaigns must therefore
> aim for *first-page entry*, not rank improvement, in the first 30 days.

## Per-URL Optimization Checklist

For each of the 6 URLs the following must be verified before any backlink push.
Status legend: `[x]` done, `[ ]` pending, `[!]` blocker.

### URL 1 — `/` (homepage)
- [ ] `<title>` includes "Bosphorus Cruise Istanbul" (≤60 chars)
- [ ] `<meta name="description">` includes anchor + USP (luxury, private, sunset)
- [ ] LocalBusiness + Organization schema present
- [ ] Internal links to `/cruises/bosphorus-sunset-cruise` and `/istanbul-dinner-cruise`
- [ ] Hreflang tags x-default / en / de / fr / nl
- [ ] OG image 1200x630 with brand
- [ ] Page speed LCP < 2.5s on mobile

### URL 2 — `/cruises/bosphorus-sunset-cruise`
- [ ] `<title>` "Bosphorus Sunset Cruise — Private Yacht Istanbul"
- [ ] Product schema (offer, price range, rating placeholder)
- [ ] Breadcrumb schema (Home → Cruises → Bosphorus Sunset Cruise)
- [ ] FAQPage schema (3-5 Q&A about timing, dress code, group size)
- [ ] Internal link to homepage and `/istanbul-dinner-cruise`
- [ ] Image alt text contains "bosphorus sunset cruise"

### URL 3 — `/istanbul-dinner-cruise`
- [ ] `<title>` "Istanbul Dinner Cruise — Bosphorus Yacht with Dinner"
- [ ] Product schema with menu/offer details
- [ ] FAQPage schema (3-5 Q&A about menu, vegetarian, alcohol, duration)
- [ ] Breadcrumb schema
- [ ] Internal link to `/cruises/bosphorus-sunset-cruise`

### URL 4 — `/de` (DE locale homepage)
- [ ] `<title>` "Bosporus Kreuzfahrt Istanbul — Privatyacht"
- [ ] German LocalBusiness schema with `inLanguage:"de-DE"`
- [ ] Hreflang back to en / x-default
- [ ] Internal links to `/de/cruises/bosphorus-sunset-cruise`, `/de/istanbul-dinner-cruise`
- [ ] All visible text in German, no untranslated EN strings

### URL 5 — `/de/cruises/bosphorus-sunset-cruise`
- [ ] `<title>` "Bosporus Sonnenuntergangsfahrt Istanbul — Privatyacht"
- [ ] Product schema in German
- [ ] FAQ in German
- [ ] Breadcrumb schema (Startseite → Touren → Sonnenuntergangsfahrt)

### URL 6 — `/de/istanbul-dinner-cruise`
- [ ] `<title>` "Istanbul Dinner Cruise — Bosporus Yacht mit Abendessen"
- [ ] Product schema in German
- [ ] FAQ in German

## Daily Monitor

The cron `/api/seo/rankings` runs every day at 07:00 UTC and writes:
- `SeoRanking` row per (keyword × locationCode × languageCode) — find URL/rank/title
- `SeoBacklink` row per day — total backlinks, referring domains, domain rank
- `SeoLlmMention` row per brand query

Manual check while debugging:

```bash
curl -H "Authorization: Bearer $CRON_SECRET" \
  https://merrysails.com/api/seo/rankings
```

## DataForSEO Cost

Per daily run (20 kw + 1 backlink summary + 6 brand queries):
- SERP 20 kw  ≈ $0.12
- Backlinks   ≈ $0.005
- LLM/brand   ≈ $0.06 (regular SERP fallback; `ai_mode/google` returned 404 on 2026-04-30)
- **Total ≈ $0.19/day → ≈ $5.7/month**

## Pending Work

1. Submit 6 URLs to GSC for indexing (already in `urls-to-index.json`).
2. Reach out to 10 Istanbul travel blogs for guest posts targeting URLs 1–3.
3. Translate guest-post outreach for DE market (URLs 4–6).
4. Track first-page entry for any of the 6 URLs by 2026-05-30.
