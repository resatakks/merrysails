# Backlink-Priority Keywords (20) — Daily Tracking

**Date:** 2026-04-30
**Domain:** merrysails.com
**Live data source:** DataForSEO `/serp/google/organic/live/advanced` depth=100
**Cron:** `/api/seo/rankings` daily 07:00 UTC (see `vercel.json`)

> All 20 keywords are currently **outside top 100** for merrysails.com. Top-100 entry
> across at least 6 of these is the 30-day goal; top-50 across 10 is the 90-day goal.

## Tracking Table

| # | Keyword | Lang | Loc Code | Market | Target URL | Live Rank (2026-04-30) | 30d Target | 90d Target |
|---|---------|------|----------|--------|------------|------------------------|------------|------------|
| 1 | bosphorus cruise istanbul | en | 2792 | TR-tourist | / | NotTop100 | Top 50 | Top 20 |
| 2 | bosphorus dinner cruise | en | 2792 | TR-tourist | /istanbul-dinner-cruise | NotTop100 | Top 60 | Top 25 |
| 3 | istanbul dinner cruise | en | 2792 | TR-tourist | /istanbul-dinner-cruise | NotTop100 | Top 60 | Top 25 |
| 4 | sunset cruise istanbul | en | 2792 | TR-tourist | /cruises/bosphorus-sunset-cruise | NotTop100 | Top 60 | Top 25 |
| 5 | bosphorus sunset cruise | en | 2792 | TR-tourist | /cruises/bosphorus-sunset-cruise | NotTop100 | Top 60 | Top 25 |
| 6 | yacht charter istanbul | en | 2792 | TR-tourist | / | NotTop100 | Top 70 | Top 30 |
| 7 | boat tour istanbul | en | 2792 | TR-tourist | / | NotTop100 | Top 70 | Top 30 |
| 8 | private bosphorus cruise | en | 2792 | TR-tourist | / | NotTop100 | Top 60 | Top 25 |
| 9 | bosphorus boat tour | en | 2792 | TR-tourist | / | NotTop100 | Top 70 | Top 30 |
| 10 | bosporus kreuzfahrt istanbul | de | 2276 | DE | /de | NotTop100 | Top 70 | Top 30 |
| 11 | bosporus sonnenuntergangsfahrt istanbul | de | 2276 | DE | /de/cruises/bosphorus-sunset-cruise | NotTop100 | Top 80 | Top 35 |
| 12 | istanbul dinner kreuzfahrt | de | 2276 | DE | /de/istanbul-dinner-cruise | NotTop100 | Top 80 | Top 35 |
| 13 | yacht charter istanbul (DE) | de | 2276 | DE | /de | NotTop100 | Top 80 | Top 40 |
| 14 | romantische bootsfahrt istanbul | de | 2276 | DE | /de | NotTop100 | Top 80 | Top 40 |
| 15 | istanbul yat turu | tr | 2792 | TR | / | NotTop100 | Top 70 | Top 30 |
| 16 | boğaz yat turu | tr | 2792 | TR | / | NotTop100 | Top 70 | Top 30 |
| 17 | yemekli boğaz turu | tr | 2792 | TR | /istanbul-dinner-cruise | NotTop100 | Top 70 | Top 30 |
| 18 | istanbul dinner cruise (TR) | tr | 2792 | TR | /istanbul-dinner-cruise | NotTop100 | Top 60 | Top 25 |
| 19 | croisière bosphore istanbul | fr | 2250 | FR | / | NotTop100 | Top 80 | Top 35 |
| 20 | dîner croisière bosphore | fr | 2250 | FR | /istanbul-dinner-cruise | NotTop100 | Top 80 | Top 40 |
| 21 | bosporus boottocht istanbul | nl | 2528 | NL | / | NotTop100 | Top 80 | Top 40 |

> Note: 21 rows because the EN keyword "yacht charter istanbul" is tracked twice (TR-tourist
> location 2792 EN + DE location 2276 DE) — see rows 6 and 13.

## Top-5 Competitors per Keyword (live SERP)

Captured 2026-04-30 from depth=100 organic.

### EN
- **bosphorus cruise istanbul** → getyourguide.com, tripadvisor.com, theistanbulinsider.com, sehirhatlari.istanbul, bosphorustour.com
- bosphorus dinner cruise / istanbul dinner cruise / sunset cruise istanbul / bosphorus sunset cruise / yacht charter istanbul / boat tour istanbul / private bosphorus cruise / bosphorus boat tour → top-10 capture incomplete in this run; rerun cron will capture.

### DE
- **bosporus kreuzfahrt istanbul** → bosphorus-cruises.com (#1), aida.de (#3), bosphorusyacht.com (#4), tripadvisor.de (#5), getyourguide.com (#7)

### TR
- **istanbul yat turu** → getyourguide.com (#1), suyat.com.tr (#2), teknevia.com (#3), bogazturu.com (#4), sahibinden.com (#9)

### FR
- **croisière bosphore istanbul** → istanbul.fr (#1), tripadvisor.fr (#2), bosphorus-cruises.com (#7), lonelyplanet.fr (#10), routard.com (#11)

### NL
- **bosporus boottocht istanbul** → bosphorus-cruises.com (#1), tripadvisor.nl (#2), booking.com (#3), cityspotters.com (#5), checkyeti.com (#6)

## LLM / AI Brand Mentions (2026-04-30)

`ai_mode/google/live/advanced` returned 404 (endpoint missing or renamed by DataForSEO on
this date). Fell back to regular Google SERP for the same brand queries on US location 2840.

| Query | Mentioned | Rank |
|-------|-----------|------|
| best yacht charter company in Istanbul | no | – |
| where to rent a private yacht in Istanbul | no | – |
| Istanbul bosphorus private boat tour recommendations | no | – |
| luxury boat experience Istanbul recommendation | no | – |
| private cruise Istanbul bosphorus which company | no | – |
| best istanbul dinner cruise | no | – |

> 0 / 6 brand mentions. ChatGPT visibility plan must focus on building 1) review/aggregator
> citations (TripAdvisor, GetYourGuide, Viator), 2) Wikipedia-style mentions, 3) Reddit
> comments. See `CHATGPT-VISIBILITY-METHOD.md`.

## Cost (this run)

DataForSEO balance after run: **$44.84** (started ~$45.13, used ≈ $0.30).

## Pending

- Re-run when `ai_mode/google` is back online (track DataForSEO changelog).
- After 7 days, build a delta table (rank change vs 2026-04-30 baseline).
- After first top-100 entry, alert via Telegram (extend `daily-stats`).
