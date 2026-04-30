# MerrySails — DE Commercial Keywords

**Last updated:** 2026-04-30
**Market:** Germany (DataForSEO `location_code: 2276`, `language_code: de`)
**Engines tracked:** Google DE (primary), Bing DE (secondary, ~10% DACH share)
**Source columns:** `Vol` and `Rank` to be filled by next live `/api/seo/rankings` run with DE config enabled. Volume estimates below are priors based on EN volumes and DE-market multipliers (~0.15-0.30× of EN). Replace `TBD-LIVE` after live API call.

---

## Tier 1 — High Intent Bosphorus Cruise Core (10)

| # | Keyword | Vol Est | KD Est | Target URL | Google DE Rank | Bing DE Rank |
|---|---------|--------:|-------:|-----------|:--------------:|:------------:|
| 1 | bosporus kreuzfahrt | 1,300-2,400 | 38 | /de/bosphorus-cruise | TBD-LIVE | TBD-LIVE |
| 2 | bosporus kreuzfahrt istanbul | 480-880 | 35 | /de/bosphorus-cruise | TBD-LIVE | TBD-LIVE |
| 3 | bosporus bootstour | 320-590 | 32 | /de/bosphorus-cruise | TBD-LIVE | TBD-LIVE |
| 4 | bosporus bootsfahrt | 260-480 | 30 | /de/bosphorus-cruise | TBD-LIVE | TBD-LIVE |
| 5 | istanbul bootstour | 590-1,100 | 34 | /de/bosphorus-cruise | TBD-LIVE | TBD-LIVE |
| 6 | istanbul kreuzfahrt | 320-590 | 36 | /de/bosphorus-cruise | TBD-LIVE | TBD-LIVE |
| 7 | bosporus tour istanbul | 210-390 | 28 | /de/bosphorus-cruise | TBD-LIVE | TBD-LIVE |
| 8 | istanbul bosporus tour | 170-320 | 28 | /de/bosphorus-cruise | TBD-LIVE | TBD-LIVE |
| 9 | bosporus rundfahrt | 140-260 | 25 | /de/bosphorus-cruise | TBD-LIVE | TBD-LIVE |
| 10 | bosporus schiff tour | 90-170 | 22 | /de/bosphorus-cruise | TBD-LIVE | TBD-LIVE |

## Tier 2 — Dinner / Sunset (8)

| # | Keyword | Vol Est | KD Est | Target URL | Google DE Rank | Bing DE Rank |
|---|---------|--------:|-------:|-----------|:--------------:|:------------:|
| 11 | bosporus dinner kreuzfahrt | 210-390 | 27 | /de/istanbul-dinner-cruise | TBD-LIVE | TBD-LIVE |
| 12 | dinner kreuzfahrt istanbul | 210-390 | 27 | /de/istanbul-dinner-cruise | TBD-LIVE | TBD-LIVE |
| 13 | abendessen kreuzfahrt istanbul | 90-170 | 22 | /de/istanbul-dinner-cruise | TBD-LIVE | TBD-LIVE |
| 14 | bosporus sunset cruise | 140-260 | 24 | /de/cruises/bosphorus-sunset-cruise | TBD-LIVE | TBD-LIVE |
| 15 | sonnenuntergang kreuzfahrt istanbul | 90-170 | 22 | /de/cruises/bosphorus-sunset-cruise | TBD-LIVE | TBD-LIVE |
| 16 | romantische bootsfahrt istanbul | 70-140 | 19 | /de/private-bosphorus-dinner-cruise | TBD-LIVE | TBD-LIVE |
| 17 | bosporus mit abendessen | 50-110 | 18 | /de/istanbul-dinner-cruise | TBD-LIVE | TBD-LIVE |
| 18 | nachtkreuzfahrt istanbul | 40-90 | 17 | /de/istanbul-dinner-cruise | TBD-LIVE | TBD-LIVE |

## Tier 3 — Yacht / Private (7)

| # | Keyword | Vol Est | KD Est | Target URL | Google DE Rank | Bing DE Rank |
|---|---------|--------:|-------:|-----------|:--------------:|:------------:|
| 19 | yachtcharter istanbul | 140-260 | 30 | /de/yacht-charter-istanbul | TBD-LIVE | TBD-LIVE |
| 20 | yacht charter istanbul | 90-170 | 28 | /de/yacht-charter-istanbul | TBD-LIVE | TBD-LIVE |
| 21 | private yacht istanbul | 40-90 | 22 | /de/yacht-charter-istanbul | TBD-LIVE | — (skip) |
| 22 | luxus yacht istanbul | 40-90 | 24 | /de/yacht-charter-istanbul | TBD-LIVE | — (skip) |
| 23 | bosporus yacht charter | 30-70 | 21 | /de/yacht-charter-istanbul | TBD-LIVE | — (skip) |
| 24 | yacht mieten istanbul | 50-110 | 23 | /de/yacht-charter-istanbul | TBD-LIVE | — (skip) |
| 25 | private bosporus tour | 70-140 | 25 | /de/private-bosphorus-dinner-cruise | TBD-LIVE | — (skip) |

## Bing-Specific Top 15 (DACH market — older traveler segment)

Run Bing SERP `/v3/serp/bing/organic/live/advanced` for these (Tier 1 + first 5 of Tier 2):
1-10 (Tier 1 above), 11, 12, 14, 19, 20

---

## Long-Tail Expansion (To Be Discovered via Keywords-For-Keywords)

Run `/v3/keywords_data/google_ads/keywords_for_keywords/live` with seeds:
- `bosporus kreuzfahrt`
- `istanbul bootstour`
- `dinner kreuzfahrt istanbul`
- `yachtcharter istanbul`

Expected harvested categories (group + expand into separate sheet):
- "**bosporus kreuzfahrt preise**" / "**bosporus kreuzfahrt kosten**" — commercial price intent
- "**bosporus kreuzfahrt buchen**" — direct booking intent (highest value)
- "**bosporus kreuzfahrt erfahrungen**" — review intent
- "**bosporus kreuzfahrt mit getyourguide**" — competitor-named (negative for Ads, positive for content)
- "**istanbul bootstour kabataş**" — pier-specific
- "**bosporus kreuzfahrt deutsche reiseleitung**" — language-specific (huge intent — needs dedicated FAQ block)
- "**istanbul yacht hochzeit**" — wedding yacht
- "**istanbul yacht heiratsantrag**" — proposal yacht (dedicated page exists: `/de/proposal-yacht-rental-istanbul`)
- "**istanbul bootstour pfingsten 2026**" — seasonal

---

## Brand & Defensive

| Keyword | Vol Est | Action |
|---------|--------:|--------|
| merrysails | <10 | Defend with brand campaign in Ads (cheap, captures direct demand) |
| merry sails istanbul | <10 | Same |
| merry sails bosporus | <10 | Same |

---

## Negative-Keyword Seed (for Ads)

Add to all DE Search campaigns:
- "kostenlos", "gratis", "umsonst" (free-seekers)
- "bewerbung", "job", "stellenangebot" (job seekers)
- "kreuzfahrtschiff", "AIDA", "TUI Cruises", "MSC", "Costa" (ocean cruise lines)
- "rhein", "donau", "elbe", "main", "mosel" (river cruise queries)
- "antalya", "izmir", "bodrum", "marmaris" (other Turkey destinations)
- "wikipedia", "definition", "bedeutung" (informational)

---

## Update Cadence

- **Weekly:** Re-run SERP for all 25 + Bing 15 (cost ~$0.30/wk)
- **Monthly:** Refresh search volumes (cost ~$0.05)
- **Quarterly:** Re-run keywords-for-keywords expansion to harvest new long-tails

Cron entry already exists at `/api/seo/rankings` — extend it to include `location_code=2276, language_code=de` block.
