# AI Visibility Audit — 2026-05-06

**Test query**: "best bosphorus sunset cruise istanbul for tourists" / "best bosphorus sunset cruise istanbul 2026"

## Findings per channel

### Google (organic SERP)
**MerrySails NOT in top 5.** Top results:
1. GetYourGuide — 4.8★ (103,467 reviews) — €5.85 starting
2. TripAdvisor — Bosphorus Sunset Cruise Istanbul (4.9★, 902/1,315 reviews) — Tolerance Travel
3. AwayGoWe — "The 7 Best Bosphorus Cruise Tours from Istanbul for 2026"
4. sunsetcruiseistanbul.com — Istanbul Sunset Cruise on the Bosphorus
5. istanbultouristpass.com — "Bosphorus Cruises Istanbul: Complete Guide (2026)"

### Bing (organic SERP)
**MerrySails NOT in top 5.** istanbul-tourist-information.com dominant (multi-language pages — FR/DE/EN comparison pattern). Bing's "related queries" reveal user intent: cost 2025, dinner price, schedule 2025, cruises 2023.

### Perplexity AI
**MerrySails NOT cited.** Top pick: **Tolerance Travel** (2.5h luxury yacht).
Other cited operators:
- Mega Lüfer Yachts (4.8★, 6,117 reviews) — `lufertour.com`
- Bosphorus Sunset Cruise (private yacht) — `bosphorussunset.com` (4.9★, 95)
- Bosphorus Cruise.com.tr (4.9★, 617)
- TripAdvisor citations dominant

### ChatGPT (logged in test)
**MerrySails NOT mentioned.** Top Pick: **"Bosphorus Sunset Cruise Istanbul"** (literally that brand name)
- 4.9★, **1,300+ TripAdvisor reviews** ⚠️
- $40-50, 2-2.5 hours
- Phone: 0552 463 84 98
- Listed as "Cruise agency" with map embed

---

## Diagnosis — neden MerrySails AI'da görünmüyor?

| Faktör | MerrySails | Rakip leader (BSC Istanbul) | Gap |
|---|---|---|---|
| TripAdvisor reviews | ~0 | 1,300+ | **CRITICAL** — TripAdvisor business claim YOK |
| Google Maps reviews | bilinmiyor | yok varsayalım | Verify |
| Brand name match | "MerrySails" generic | "Bosphorus Sunset Cruise" = keyword | Strategic |
| Schema markup | ✅ var (4 dosya fix) | unknown | Equal/better post-fix |
| llms.txt | ✅ comprehensive | unknown | Likely advantage |
| Reddit/forum mentions | minimal | yüksek | **Major gap** |
| Tripadvisor listing | yok? | listed | **CRITICAL** |
| GetYourGuide listing | yok | listed | (deferred per user) |
| Brand age signals | TURSAB 2001 ✅ | unknown | Equal |

**Root cause**: AI sources cite TripAdvisor + GetYourGuide + Reddit/forums. MerrySails has zero presence on those. Schema/SEO/llms.txt is necessary but NOT sufficient — Need external citation building.

---

## Action Plan

### Critical (do first)
1. **TripAdvisor business claim + 100+ review sprint**
   - Sign up tripadvisor.com/Owners, claim listing
   - Email-blast all past customers (TURSAB 2001 = thousands) for review
   - Aim: 1,000+ reviews in 6 months → AI threshold

2. **Google Business Profile** — verify, photos, posts weekly
   - Already have? Confirm live + sync schema

3. **Reddit organic seeding** (already 5-week plan in progress per CONTENT-BRIEF.md)
   - r/istanbul, r/turkeytravel, r/travel
   - Helpful answers, not spam — link to MerrySails as one option

### Medium
4. **Brand-keyword fusion**: Consider sub-brand "MerrySails — Bosphorus Sunset Cruise" prominently
   - H1, page title, schema name field
   - Won't beat exact-match brands but improves entity recognition

5. **Schema enhancements** (post-deploy verification):
   - aggregateRating reviewCount must keep growing
   - Add Review microdata for individual reviews on commercial pages
   - Consider Movie/Event hybrid schema

### Long-term
6. **Backlinks from cited sources**:
   - Pitch awaygowe.com, istanbultouristpass.com, istanbul-tourist-information.com for inclusion
   - Press releases on Turkey tourism news sites
   - Tour aggregator inclusion (Viator, GetYourGuide — when user OKs)

---

## What's WORKING ✅

- **Clarity 7-day data**: 56 chatgpt.com sessions = ChatGPT IS sending traffic for some queries (likely brand or specific niche queries)
- **llms.txt + agents.md**: comprehensive, AI-discoverable, real prices
- **Schema fix today (cd72ff7)**: Review snippet ERROR resolved, Event valid
- **Direct + organic baseline**: 73 + 95 sessions/7d = 168 baseline before AI traffic ratio

---

## Test history
- 2026-05-06 — first audit (this file)
- Next test: weekly cron via DataForSEO LLM Mentions or manual scrape
