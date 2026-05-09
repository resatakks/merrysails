# DataForSEO Live Volume Pull — 2026-05-09

**Pulled**: 2026-05-09 via DataForSEO Google Ads Search Volume API (live).
**Method**: HTTP Basic auth, `/v3/keywords_data/google_ads/search_volume/live`.
**Comparison**: Annotations show NEW vs 2026-05-07 doc where applicable.

---

## Opportunity Score Formula

`Opportunity = (search_volume * 0.01 * top3_ctr) / competition_penalty`

Simplified for ranking: LOW competition = 3x multiplier vs MEDIUM/HIGH.
All competition levels returned as LOW for all seeds (no HIGH found in these niches).

---

## EN Seeds — US (location: 2840) + GB (location: 2826)

### United States

| Keyword | Vol/mo | CPC | Competition | Opportunity | Notes |
|---|---:|---:|---|---|---|
| bosphorus cruise istanbul | 880 | $3.23 | LOW | **HIGH** | Confirmed from 05-07 |
| istanbul cruise | 720 | $5.25 | LOW | **HIGH** | **NEW** — not in 05-07 doc |
| bosphorus tour | 590 | $3.10 | LOW | HIGH | Confirmed |
| istanbul boat tour | 320 | $3.18 | LOW | MEDIUM | Confirmed |
| sunset cruise istanbul | 110 | $4.51 | LOW | MEDIUM | Lower than 05-07 (was 320 — US vs worldwide) |
| dinner cruise istanbul | 110 | $3.93 | LOW | MEDIUM | Confirmed |
| bosphorus cruise tickets | 30 | $4.72 | LOW | LOW | **NEW** — not in 05-07 doc |
| private yacht istanbul | 20 | $8.45 | LOW | LOW | **NEW** — not in 05-07 doc; high CPC despite low vol |
| yacht charter istanbul | 10 | $1.80 | LOW | LOW | Confirmed |

**US Total addressable**: ~2,790 vol/mo

### United Kingdom

| Keyword | Vol/mo | CPC | Competition | Opportunity | Notes |
|---|---:|---:|---|---|---|
| istanbul cruise | 480 | $2.53 | LOW | **HIGH** | **NEW** — separate GB pull; confirms MEMORY.md figure |
| bosphorus cruise istanbul | 320 | $2.59 | LOW | HIGH | Confirmed |
| istanbul boat tour | 320 | $2.04 | LOW | HIGH | **NEW** explicit GB figure |
| bosphorus tour | 320 | $1.74 | LOW | MEDIUM | **NEW** GB split |
| dinner cruise istanbul | 90 | $2.70 | LOW | MEDIUM | **NEW** GB explicit |
| sunset cruise istanbul | 70 | $3.61 | LOW | MEDIUM | **NEW** GB explicit |
| private yacht istanbul | 20 | $2.77 | LOW | LOW | **NEW** GB explicit |
| yacht charter istanbul | 10 | $4.07 | LOW | LOW | Low but high CPC |
| bosphorus cruise tickets | 10 | $2.33 | LOW | LOW | **NEW** GB explicit |

**GB Total addressable**: ~1,630 vol/mo

### EN Combined (US + GB, deduplicated by highest value)

| # | Keyword | Vol US | Vol GB | Combined | CPC max | Opportunity |
|---|---|---:|---:|---:|---:|---|
| 1 | istanbul cruise | 720 | 480 | **1,200** | $5.25 | HIGHEST |
| 2 | bosphorus cruise istanbul | 880 | 320 | **1,200** | $3.23 | HIGHEST |
| 3 | bosphorus tour | 590 | 320 | **910** | $3.10 | HIGH |
| 4 | istanbul boat tour | 320 | 320 | **640** | $3.18 | HIGH |
| 5 | sunset cruise istanbul | 110 | 70 | **180** | $4.51 | MEDIUM |
| 6 | dinner cruise istanbul | 110 | 90 | **200** | $3.93 | MEDIUM |
| 7 | bosphorus cruise tickets | 30 | 10 | **40** | $4.72 | LOW |
| 8 | private yacht istanbul | 20 | 20 | **40** | $8.45 | LOW-HIGH CPC |
| 9 | yacht charter istanbul | 10 | 10 | **20** | $4.07 | LOW |

**EN Total combined addressable**: ~4,430 vol/mo (US + GB)

---

## TR Seeds — Turkey (location: 2792, language: tr)

| Keyword | Vol/mo | CPC | Competition | Opportunity | Notes |
|---|---:|---:|---|---|---|
| boğaz turu | 6,600 | $0.32 | LOW | **DOMINANT** | Confirmed from 05-07 |
| boğaz turu fiyat | 1,000 | $0.28 | LOW | **HIGH** | Confirmed |
| eminönü boğaz turu | 1,000 | $0.26 | LOW | **HIGH** | **NEW pull** — previously grouped; now standalone confirmed |
| kabataş boğaz turu | 210 | $0.28 | LOW | MEDIUM | **NEW** — not in 05-07 doc |
| yat turu istanbul | 170 | $0.92 | LOW | MEDIUM | **NEW** — not in 05-07 doc |
| akşam yemekli boğaz turu | 110 | $0.45 | LOW | MEDIUM | Confirmed |
| özel yat kiralama | 90 | $0.33 | LOW | LOW-MED | **NEW** as standalone (05-07 had "yat kiralama istanbul" at 1,900) |
| gün batımı boğaz turu | — | — | — | — | No volume returned (too long-tail) |

**TR Total addressable**: ~9,180 vol/mo (seeds only; full cluster from 05-07 adds ~7,710 more)

---

## DE Seeds — Germany (location: 2276, language: de)

| Keyword | Vol/mo | CPC | Competition | Opportunity | Notes |
|---|---:|---:|---|---|---|
| sonnenuntergang istanbul | 480 | $0.00 | LOW | **HIGH** | **NEW** — not pulled before; informational but large for DE |
| yacht mieten istanbul | 70 | $1.24 | LOW | MEDIUM | Confirmed from 05-07 |
| bootsfahrt istanbul | 50 | $1.28 | LOW | LOW-MED | **NEW** — distinct from "bosporus rundfahrt" |
| istanbul dinner cruise | 40 | $2.32 | LOW | LOW-MED | Confirmed from 05-07 |
| bosporus kreuzfahrt | 30 | $0.90 | LOW | LOW | Confirmed |
| bosporus rundfahrt | 30 | $0.83 | LOW | LOW | Confirmed |
| schiffstour istanbul | 10 | $0.00 | LOW | VERY LOW | New; organic only |
| bosporus dinner | — | — | — | — | No volume |
| bosporus kreuzfahrt istanbul | — | — | — | — | No volume |
| sonnenuntergang kreuzfahrt istanbul | — | — | — | — | No volume |

**DE Total addressable**: ~710 vol/mo (seeds)

Key finding: "sonnenuntergang istanbul" at 480 vol is the biggest DE keyword found — but it's informational (city search), not cruise-intent. /de/cruises/bosphorus-sunset-cruise should target it with a "Sonnenuntergang vom Bosporus" content angle.

---

## FR Seeds — France (location: 2250, language: fr)

| Keyword | Vol/mo | CPC | Competition | Opportunity | Notes |
|---|---:|---:|---|---|---|
| croisiere bosphore istanbul | 390 | $1.83 | LOW | **HIGH** | Confirmed from MEMORY.md |
| croisiere istanbul | 210 | $2.05 | LOW | HIGH | **NEW** — not in previous docs |
| bateau istanbul | 140 | $1.37 | LOW | MEDIUM | **NEW** — navigational, worth targeting |
| diner croisiere istanbul | 50 | $2.53 | LOW | MEDIUM | **NEW** — not in 05-07 doc |
| location yacht istanbul | 10 | $0.94 | LOW | LOW | Confirmed |
| coucher de soleil istanbul bateau | — | — | — | — | No volume |

**FR Total addressable**: ~800 vol/mo (seeds)

---

## NL Seeds — Netherlands (location: 2528, language: nl)

| Keyword | Vol/mo | CPC | Competition | Opportunity | Notes |
|---|---:|---:|---|---|---|
| bosporus cruise | 170 | $1.90 | LOW | HIGH | **NEW** — not in previous docs |
| bosphorus cruise istanbul | 40 | $3.15 | LOW | MEDIUM | New NL-market figure |
| dinner cruise istanbul | 20 | $2.35 | LOW | LOW | New NL-market figure |
| rondvaart istanbul | 10 | $0.78 | LOW | LOW | **NEW** — Dutch-language term |
| istanbul boottocht | 10 | $0.67 | LOW | LOW | **NEW** — Dutch-language term |

**NL Total addressable**: ~250 vol/mo (seeds)

---

## Total Addressable Volume by Locale

| Locale | Vol/mo (seeds) | Competition | Priority |
|---|---:|---|---|
| TR | ~9,180 | LOW | TIER 1 |
| EN (US+GB) | ~4,430 | LOW | TIER 1 |
| FR | ~800 | LOW | TIER 2 |
| DE | ~710 | LOW | TIER 2 |
| NL | ~250 | LOW | TIER 3 |

**Grand total addressable (seeds)**: ~15,370 vol/mo across 5 locales.

---

## Top 10 Priority Terms (All Locales, by Opportunity Score)

| Rank | Keyword | Locale | Vol/mo | CPC | Competition | Page Target |
|---|---|---|---:|---:|---|---|
| 1 | boğaz turu | TR | 6,600 | $0.32 | LOW | /tr/bosphorus-cruise |
| 2 | istanbul cruise | EN | 1,200* | $5.25 | LOW | /bosphorus-cruise |
| 3 | bosphorus cruise istanbul | EN | 1,200* | $3.23 | LOW | /bosphorus-cruise |
| 4 | boğaz turu fiyat | TR | 1,000 | $0.28 | LOW | /tr/bosphorus-cruise |
| 5 | eminönü boğaz turu | TR | 1,000 | $0.26 | LOW | /tr/bosphorus-cruise |
| 6 | bosphorus tour | EN | 910* | $3.10 | LOW | /bosphorus-cruise |
| 7 | istanbul boat tour | EN | 640* | $3.18 | LOW | /bosphorus-cruise |
| 8 | croisiere bosphore istanbul | FR | 390 | $1.83 | LOW | /fr/bosphorus-cruise |
| 9 | sonnenuntergang istanbul | DE | 480 | $0.00 | LOW | /de/cruises/bosphorus-sunset-cruise |
| 10 | kabataş boğaz turu | TR | 210 | $0.28 | LOW | /tr/bosphorus-cruise |

*US+GB combined

---

## NEW Terms vs 2026-05-07 Doc

Terms not present in DATAFORSEO-OPPORTUNITY-2026-05-07.md:

1. **istanbul cruise** (EN/US: 720, EN/GB: 480) — Biggest new EN find. High CPC ($5.25 US). /bosphorus-cruise already partially optimized but "istanbul cruise" should be in H2 and meta description.
2. **bosphorus cruise tickets** (EN/US: 30, GB: 10) — Transactional intent, ticket-buying phrase. Add "tickets" to /bosphorus-cruise FAQ or CTA copy.
3. **private yacht istanbul** (EN/US: 20) — High CPC $8.45 despite low vol. /yacht-charter-istanbul should include "private yacht istanbul" in title or H2.
4. **croisiere istanbul** (FR: 210) — Generic French cruise term. /fr/bosphorus-cruise ranks for it by default but add explicit H2.
5. **bosporus cruise** (NL: 170) — Dutch spelling variant. /nl/bosphorus-cruise already targets it but ensure Dutch spelling "Bosporus" appears in H1.
6. **sonnenuntergang istanbul** (DE: 480) — Informational but high volume for DE. /de/cruises/bosphorus-sunset-cruise should target with "Sonnenuntergang vom Bosporus" narrative.
7. **kabataş boğaz turu** (TR: 210) — Departure-point intent. /tr/bosphorus-cruise has Kabataş in departure section; make it an H3.
8. **yat turu istanbul** (TR: 170) — Distinct from "yat kiralama". /tr/yacht-charter-istanbul should include this phrase.
9. **bateau istanbul** (FR: 140) — Broad French boat search. /fr/bosphorus-cruise could capture with "bateau Istanbul" in FAQ.
10. **diner croisiere istanbul** (FR: 50) — French dinner cruise. /fr/istanbul-dinner-cruise primary target.

---

## Strategic Update vs 05-07

**Unchanged conclusions**:
- TR is 4-5x the EN addressable volume and dominates opportunity
- DE/FR/NL maintain-only for content investment (no new pillars needed)
- All competition LOW across all niches

**New finding**:
- "istanbul cruise" (US 720 + GB 480 = 1,200 combined) rivals "bosphorus cruise istanbul" (US 880 + GB 320 = 1,200). Both are tier-1 EN targets. The EN /bosphorus-cruise page should use both terms naturally.
- "sonnenuntergang istanbul" (DE 480) is the second largest DE keyword after "yacht mieten istanbul". It's informational, but a sunset cruise page in German can intercept it with proper H1 optimization.
- FR has 800 vol/mo vs DE's 710 — both tiny, but FR has better CPC ($1.83-$2.53 vs DE $0-$1.28), suggesting higher conversion intent.
