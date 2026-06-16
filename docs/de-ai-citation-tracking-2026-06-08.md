# DE AI Citation Tracking — Setup & Methodology

**Date**: 2026-06-09
**Scope**: 3 direct-booking DE-locale brands — MerrySails (DE cruise), GoldenSunset (DE sister-brand cruise), KWT (DE airport transfer)
**Strategic context**: Sistrix May 22-23 2026 GPT-5.5 transition shift documented OTA demotion in German ChatGPT visibility:
- Tripadvisor **-53%**, Expedia **-60%**, Booking.com **-34%**
- Welt.de **+99%**, German first-party publishers **+50-100%**
- Direct-booking brand opportunity window: **~18 months** before next major model shift (StudioHawk benchmark on prior model transitions)

This doc establishes the baseline measurement so we can prove (or disprove) that our DE pages capture share from displaced OTAs.

---

## Why now

1. **OTA demotion mechanic is fresh** — Sistrix observed it 2-3 weeks ago. Most operators don't have AI-visibility tracking, so the competitive field is wide open.
2. **Our DE pages exist already** — MerrySails has `/de/bosphorus-cruise`, `/de/cruises/bosphorus-sunset-cruise`, `/de/istanbul-dinner-cruise`, GoldenSunset mirrors, KWT has DE transfer pages.
3. **First-party operator content rewards** — Sistrix shift correlates with editorial/operator content (vs marketplace aggregation). Captain Ahmet byline + first-party stats = exact pattern that's lifting.
4. **Multi-engine measurement** — ChatGPT alone ≠ AI visibility. Perplexity, Gemini, Claude all behave differently. The script captures all 4 in one run for $0.10.

---

## Methodology

### Engines
- ChatGPT (OpenAI gpt-4o-mini) — proxies for the largest AI surface
- Claude (Anthropic Sonnet 4.5) — independent baseline, less Bing-overlap
- Perplexity (sonar) — search-grounded with explicit citation list
- Gemini (1.5 Flash) — Google AI Overviews surrogate

(Production tweak: swap gpt-4o-mini → gpt-5 once API parity is needed; cost rises ~5-8×.)

### Queries (9 German, commercial intent)

| # | Intent | Query |
|---|--------|-------|
| q01 | cruise-bosphorus | Was ist die beste Bosporus Kreuzfahrt in Istanbul? |
| q02 | cruise-price | Wie viel kostet eine Bootsfahrt auf dem Bosporus in Istanbul? |
| q03 | sunset-cruise | Empfehlung für eine Sonnenuntergangstour auf dem Bosporus. |
| q04 | dinner-cruise | Wo kann man eine Dinner Cruise in Istanbul buchen? |
| q05 | yacht-charter | Privater Yachtcharter Istanbul — welche Anbieter? |
| q06 | airport-transfer | Zuverlässiger Flughafentransfer in Istanbul vom Hotel? |
| q07 | private-transfer | Privater Transferservice in Istanbul empfohlen? |
| q08 | sabiha-transfer | Transfer vom Flughafen Sabiha Gökçen ins Zentrum Istanbul? |
| q09 | yacht-marmaris | Yachtcharter in Marmaris oder Bodrum — Anbieter mit Direktbuchung? |

Each query × 4 engines = **36 prompts per run**. Output: brand-mention counts + first-mention position.

### Tracked brands

- **Our brands** (success metric): merrysails, goldensunset, kwt
- **OTA reference** (Sistrix-thesis validation): tripadvisor, getyourguide, viator, expedia, booking
- **Win condition**: our mentions trend UP, OTA mentions trend FLAT/DOWN week over week.

### Output

- `data/de-ai-citation-YYYY-MM-DD.csv` — one row per (query, engine), mention counts + positions
- `data/de-ai-citation-YYYY-MM-DD-raw.jsonl` — raw model responses (debug / quote-mining)

### Cost

~$0.10 per full run (36 prompts × ~500 tokens). At weekly cadence = **$5/year**.

---

## Baseline measurement template (operator fills after first run)

| Engine | Query (id) | merrysails | goldensunset | kwt | tripadvisor | getyourguide | viator | expedia | booking |
|--------|------------|-----------:|-------------:|----:|------------:|-------------:|-------:|--------:|--------:|
| chatgpt | q01 | _ | _ | _ | _ | _ | _ | _ | _ |
| chatgpt | q02 | _ | _ | _ | _ | _ | _ | _ | _ |
| chatgpt | q03 | _ | _ | _ | _ | _ | _ | _ | _ |
| chatgpt | q04 | _ | _ | _ | _ | _ | _ | _ | _ |
| chatgpt | q05 | _ | _ | _ | _ | _ | _ | _ | _ |
| chatgpt | q06 | _ | _ | _ | _ | _ | _ | _ | _ |
| chatgpt | q07 | _ | _ | _ | _ | _ | _ | _ | _ |
| chatgpt | q08 | _ | _ | _ | _ | _ | _ | _ | _ |
| chatgpt | q09 | _ | _ | _ | _ | _ | _ | _ | _ |
| claude | … | | | | | | | | |
| perplexity | … | | | | | | | | |
| gemini | … | | | | | | | | |

CSV auto-fills these. Operator just sorts/pivots in spreadsheet.

---

## Weekly cadence

**Monday morning, 5 min**:
```bash
cd /Users/resat/Desktop/merrysails
source .env.local  # OPENAI_API_KEY, ANTHROPIC_API_KEY, PERPLEXITY_API_KEY, GEMINI_API_KEY
python3 scripts/de-ai-citation-tracking.py
```

Diff vs previous week's CSV:
- Our brand mention count delta (target: +1 to +3 per week growing baseline)
- OTA mention count delta (thesis check: should flat or drop)
- New competitors surfacing (note in operator log)

**Monthly review (15 min)**:
- Aggregate 4 weekly runs
- Identify highest-citing query → invest content there
- Identify zero-citation query → pillar gap, P1 content plan

---

## Operator week-1 checklist

- [ ] Set 4 API keys in `.env.local`:
  - `OPENAI_API_KEY` (platform.openai.com)
  - `ANTHROPIC_API_KEY` (console.anthropic.com)
  - `PERPLEXITY_API_KEY` (perplexity.ai/settings/api)
  - `GEMINI_API_KEY` (aistudio.google.com)
- [ ] Dry-run: `python3 scripts/de-ai-citation-tracking.py --dry-run` (validates query list, no API calls)
- [ ] Pip install: `pip install openai anthropic google-generativeai requests`
- [ ] First real run: `python3 scripts/de-ai-citation-tracking.py` → review `data/de-ai-citation-*.csv`
- [ ] Manual sanity check: open `data/de-ai-citation-*-raw.jsonl`, read 2-3 responses, confirm German output + brand mentions are real (not hallucinated domains)
- [ ] Set Monday calendar reminder for weekly run
- [ ] Confirm decision: run only for these 3 brands, or expand to MerryTourism (also DE-capable) — operator call

---

## Content tactics based on Sistrix DE shift (parallel work, not part of script)

The Sistrix data implies what wins in German AI surfaces right now:

1. **First-party operator content** (Captain Ahmet German byline if available, or operator-attributed quote with translation). Welt.de +99% lift signals editorial-voice preference.
2. **Direct-booking emphasis** — meta + H1 + first paragraph: "Wir sind der Anbieter, nicht eine Buchungsplattform." Makes OTA-vs-direct distinction obvious to the model.
3. **Reddit DE participation** (+59% trend on Sistrix Reddit visibility) — operator answer in r/Istanbul, r/de_Travel, ≤2/month, verified license bio, no link drops. Strictly authentic.
4. **Multi-modal** — Captain Ahmet on camera with subtitles (German subtitle file uploaded), 5-min cruise overview on YouTube. Operator on-camera + transcript on-page = the YouTube mention > backlink mechanic (Ahrefs r=0.737 vs 0.218 in Q1 2026 study).
5. **Information Island test** for DE pillar pages — 134-167 word self-contained answer block per H2 (Wellows 4.2× citation when semantically complete).

---

## Files

- `/Users/resat/Desktop/merrysails/scripts/de-ai-citation-tracking.py` — tracker script
- `/Users/resat/Desktop/merrysails/docs/de-ai-citation-tracking-2026-06-08.md` — this doc
- `/Users/resat/Desktop/merrysails/data/de-ai-citation-YYYY-MM-DD.csv` — weekly output (created on first run)
- `/Users/resat/Desktop/merrysails/data/de-ai-citation-YYYY-MM-DD-raw.jsonl` — raw responses

## Confidence

- **Engine selection**: HIGH. 4 engines cover ~90% of German AI surface.
- **Query selection**: MEDIUM-HIGH. 9 queries cover top commercial intents; expand to 15-20 once baseline data shows gap zones.
- **Mention-counting heuristic**: MEDIUM. Substring match counts ".com" mentions and bare brand names; will need disambiguation if a competitor brand name overlaps with a generic word. Manual sanity-check on first 2-3 runs.
- **Sistrix thesis applicability**: MEDIUM. Sistrix study was DE-wide travel vertical; our brands are Istanbul-specific. Direction of shift likely the same; magnitude uncertain. The tracker will tell us.
