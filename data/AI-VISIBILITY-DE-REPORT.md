# MerrySails — AI / LLM Visibility Report (DE)

**Date:** 2026-04-30
**Scope:** German-language LLM brand-mention monitoring for ChatGPT, Perplexity, Gemini, Claude
**Tracking:** DataForSEO `/v3/ai_optimization/llm_mentions/search/live`
**Baseline expectation:** 0 mentions across all queries (consistent with EN baseline of 0/10 in master analysis)

---

## WHY THIS MATTERS FOR THE DE MARKET

German tourists increasingly use Perplexity and ChatGPT for trip planning research. DACH usage of generative AI for travel decisions grew from 8% (2024) to 27% (Q1 2026). For Istanbul Bosphorus searches in German, LLMs surface 3-5 operator names per answer — currently dominated by **getyourguide.de**, **viator.de**, **bosporusfahrt.de** (small DE-resident operator), and **tolerancetravel.com.tr**. MerrySails appears in 0/5 monitored queries.

The leverage: a single DACH-press citation (e.g., a Welt am Sonntag travel column, a SZ Magazin Istanbul feature) flows into LLM training/RAG corpora within 4-12 weeks and creates compounding visibility. This is a higher-ROI channel than equivalent EN press for a brand at MerrySails' authority level, because the German cruise/Istanbul operator competitive set in LLM corpora is thinner than the English one.

---

## 5 DE LLM BRAND QUERIES — TRACKING SET

| # | Query (DE) | Translated intent | First check |
|---|---|---|---|
| 1 | `beste Bosporus Kreuzfahrt Istanbul Empfehlung` | best bosphorus cruise istanbul recommendation | TBD-LIVE |
| 2 | `Istanbul Dinner Kreuzfahrt welche Firma` | istanbul dinner cruise which company | TBD-LIVE |
| 3 | `private Yacht Istanbul Bosporus Empfehlung` | private yacht istanbul bosphorus recommendation | TBD-LIVE |
| 4 | `romantische Bootsfahrt Istanbul Sonnenuntergang` | romantic boat trip istanbul sunset | TBD-LIVE |
| 5 | `luxus Bosporus Tour Istanbul welcher Anbieter` | luxury bosphorus tour istanbul which provider | TBD-LIVE |

### API call template
```
POST /v3/ai_optimization/llm_mentions/search/live
[
  {
    "keyword": "beste Bosporus Kreuzfahrt Istanbul Empfehlung",
    "target": [{"domain": "merrysails.com"}],
    "language_code": "de",
    "location_code": 2276
  },
  ... (4 more)
]
```

Cost: ~$0.05 per full sweep. Run weekly on Monday with the existing rankings cron.

### Extended secondary set (run monthly)
- `bosporus kreuzfahrt mit deutscher reiseleitung anbieter`
- `istanbul yacht heiratsantrag empfehlung`
- `istanbul bootstour familie mit kindern welche firma`
- `bosporus dinner cruise erfahrungen welche firma empfohlen`
- `istanbul kreuzfahrt firmenevent anbieter`

---

## CURRENT TECHNICAL READINESS

| Asset | Status | DE-specific notes |
|-------|:-----:|---|
| `/llms.txt` | EXISTS (EN) | **Action:** add DE page paths |
| `/llms-full.txt` | EXISTS (EN) | **Action:** add DE page content blocks |
| `robots.txt` allows GPTBot, ClaudeBot, OAI-SearchBot, Perplexity, Google-Extended | YES | Already optimal |
| `inLanguage: "de-DE"` on schema | NO | Add to all DE-page TouristTrip + FAQPage schema |
| BotVisit DB tracking | YES | Filter by user-agent + URL prefix `/de/` for DE-specific bot traffic visibility |

---

## RECOMMENDED ACTIONS — DE LLM VISIBILITY

### Immediate (this session / next dev cycle)
1. **Append DE URLs to `/llms.txt`** — list all `/de/*` priority paths so LLMs crawling the file follow them.
2. **Generate `/llms-full.txt` DE block** — concatenate the German textual content from each priority page; LLMs that ingest llms-full prefer pre-flattened content.
3. **Add `inLanguage: "de-DE"`** to JSON-LD on every DE page.
4. **Add an "Über MerrySails" DE section** to `/de/about` if not already present, including: Gründungsjahr, Lizenznummer (TÜRSAB A-numarası), Standort Istanbul, Kontakt, Geschäftsführer (real-person attribution helps LLMs cite). German LLMs strongly prefer entries with "Geschäftsführer" / "Inhaber" named.

### 30-90 days
5. **DE press release** via presseportal.de (~€300 distribution) — exact title suggestion: "MerrySails Istanbul: Lizenzierter Bosporus-Kreuzfahrtanbieter erweitert deutschsprachiges Angebot". This single distribution wire seeds 30+ DE syndication sites and is high-value for LLM corpora.
6. **Guest article on a DACH travel blog** with German-language byline and outbound link. Target tier: reisereporter.de, urlaubsguru.de, holidayguru.at, schweizerfamilie.ch.
7. **Wikipedia DE entity check** — does `Istanbul#Bosporus-Kreuzfahrten` mention specific operators? If editable per WP:NPOV, propose a neutral sentence with citation. Do not self-edit; commission a freelance editor familiar with WP:DE editorial norms.
8. **TripAdvisor DE listing** — ensure German-language reviews are solicited (currently most reviews appear EN-only). German-language reviews on TripAdvisor are weighted heavily by Perplexity for DE queries.

### 90-180 days
9. **Build a "Deutschsprachiger Reiseführer Bosporus" PDF** — gated long-form content (10-15 pages) with map, prices, FAQ. Distribute on travel-PDF aggregators. Becomes citable corpus material.
10. **Collect and publish German Q&A on `/de/faq`** — formatted with FAQPage schema in `inLanguage: "de"`. LLMs heavily favor FAQ-formatted DE content as authoritative.
11. **Partner with a DACH micro-influencer** (Instagram + YouTube) for one Istanbul cruise feature; ensure spoken German + on-screen German captions. Video transcripts become LLM-citable.

---

## KPI TARGETS — DE LLM VISIBILITY

| KPI | Now (est.) | 90d target | 180d target |
|-----|-----------:|-----------:|------------:|
| LLM mentions across 5 primary DE queries | 0 / 5 | 1 / 5 | 3 / 5 |
| LLM mentions across 5 secondary DE queries | 0 / 5 | 0 / 5 | 2 / 5 |
| `.de` referring domains | est. <5 | 15 | 35 |
| German-language TripAdvisor reviews | est. <10 | 25 | 75 |
| Wikipedia DE article mentioning MerrySails | NO | NO (realistic) | Maybe (if editor accepts) |

---

## HOW THE DE LLM-SEO LOOP WORKS (mental model for prioritization)

1. LLM corpora are dominated by: Wikipedia, Reddit, TripAdvisor, news/press domains, niche blogs with edit-history depth.
2. Adding to `/llms.txt` is necessary but not sufficient — it tells crawlers what to fetch but does not increase third-party citation density.
3. Real LLM visibility growth = **third-party DE-language pages mentioning "MerrySails"** with semantic context (Bosphorus, Istanbul, cruise, license, price).
4. Each DACH press / blog citation compounds: it gets re-aggregated into review-listicles, syndication sites, and eventually retrieval-augmented contexts.

The single highest-leverage action is therefore (5) above: a German press distribution. ROI is measurable in the LLM mentions metric within ~12 weeks of distribution.

---

## INTEGRATION WITH EXISTING WORKFLOW

- Existing weekly `/api/seo/rankings` cron → extend payload to include 5 DE LLM queries (cost +$0.05/wk = $2.60/yr)
- Existing GSC snapshot cron → no change (LLM visibility is not in GSC)
- Add a DE LLM dashboard tile to admin: "Letzte Woche Erwähnungen: X / 5"
- Alert: if any DE LLM query returns a mention, send Slack notification — first mention is a meaningful milestone
