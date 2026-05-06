# AI Citation Check — 2026-05-06

## Method
For each query × provider, paste URL into Brave, screenshot result, note:
- **Mentioned**: yes/no/partial
- **Position**: top pick / cited / footnote / not mentioned
- **Citation context**: what was said about MerrySails

## Results

### Brand search (control test) — ✅ EXCELLENT

| Query | Provider | Mentioned | Position | Notes |
|---|---|:-:|---|---|
| merrysails istanbul bosphorus cruise TURSAB licensed | Perplexity | ✅ YES | Detailed (10 sources) | Cited TURSAB #14316, Meryem Yıldız Travel, exact prices €34/€30/€280, address Alemdar Mah., 50,000+ guests, 24h free cancellation. Phone slightly stale (cache). llms.txt strategy WORKING. |

### Generic intent search

| Query | Provider | Mentioned | Position | Notes |
|---|---|:-:|---|---|
| best bosphorus sunset cruise istanbul 2026 | Google | ❌ NO | not in top 5 | GetYourGuide, TripAdvisor, AwayGoWe dominant |
| best bosphorus sunset cruise istanbul 2026 | Bing | ❌ NO | not in top 5 | istanbul-tourist-information.com dominant (multi-language!) |
| best bosphorus sunset cruise istanbul for tourists | Perplexity | ❌ NO | not mentioned | Tolerance Travel top pick (1,300+ TripAdvisor reviews) |
| best bosphorus sunset cruise istanbul for tourists | ChatGPT | ❌ NO | not mentioned | "Bosphorus Sunset Cruise Istanbul" (literal name brand) top pick, 1,300+ TripAdvisor reviews |

## Findings

### What's working ✅
- **Brand search**: Perplexity gives detailed branded content (TURSAB, prices, address, history). Comprehensive llms.txt + agents.md serving its purpose.
- **ChatGPT direct referrals**: 56 sessions/7d via Clarity (top entries: /, /yacht-charter-istanbul, /blog/bosphorus-cruise-price-istanbul-2026)
- **Schema rich data fully indexed**: TURSAB license, prices, hours all mapped

### What's NOT working ❌
- **Generic intent**: All AI providers ignore MerrySails for "best X" queries
- Top competitors win via:
  1. **TripAdvisor 1,300-6,117 reviews** (we have 312-621)
  2. **Brand-keyword fusion** ("Bosphorus Sunset Cruise Istanbul" = literal brand name)
  3. **Aggregator listings** (TripAdvisor, GetYourGuide cited heavily)
  4. **Reddit/forum mentions** (sources Perplexity scrapes)

### Action priority

| P | Action |
|---|---|
| P0 | TripAdvisor business claim + review sprint (target 1,000+ reviews in 6 months) |
| P0 | Get listed on awaygowe.com / istanbul-tourist-information.com (cited sources) |
| P1 | Reddit organic seeding (per CONTENT-BRIEF.md 5-week plan) |
| P1 | "X price 2026" content for sunset + yacht (proven pattern) |
| P2 | Brand-keyword fusion: H1/title prominently feature "Bosphorus Sunset Cruise" + "MerrySails" |
| P3 | Wait for Perplexity to refresh cache (phone stale by ~6 weeks, llms.txt is current) |

## Test history
- 2026-05-06 — first full audit (this file)
- 2026-05-13 (next week) — re-run, compare deltas after schema fix deploys
