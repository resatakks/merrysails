# Bing Portfolio Suppression — Dedicated-Session Investigation Brief

> Open a dedicated session (NOT cruise daily-ops) to investigate the portfolio-wide Bing issue.
> This brief = the starting point. Updated 2026-06-25 from the CRUISE session.

## THE PROBLEM (observed, certain)
Multiple portfolio brands lost Bing visibility, **staggered over time, with DIFFERENT manifestations**:

| Brand | Regular Bing search | AI/Copilot citation | robots bingbot | When |
|---|---|---|---|---|
| **MerryTourism** | ❌ SUPPRESSED (indexed, not served, absent for own brand) | — | allowed | first (earliest) |
| **MerrySails** | ❌ SUPPRESSED | — | allowed (`Allow: /`) | impressions→0 on **2026-06-09** (much later) |
| **KingsWorldTransfer** | ✅ serving (22 clk / 1.2K imp) | ❌ **citations dropped to 0 ~2026-05-31** | allowed (Bing "block" flag = FALSE ALARM, see below) | ~May 31 |
| **GoldenSunset** | ✅ healthy | ✅ healthy | allowed | — |
| other ~9 brands | seem fine (operator, 2026-06-25) | ? (not yet pulled) | ? | — |

"Suppression" = **domain-level serving suppression / soft deindexing** (Bing index vs serving are separate layers; site stays indexed but serving-layer excludes it). Confirmed pattern via 4 Microsoft Q&A 2026 cases (5901309 / 5806007 / 5919797 + Simon Cox) — see [[reference_bing_soft_deindex_2026_06_25]].

## RULED OUT (with evidence — do NOT re-chase these)
- ❌ **Toxic links / PBN** — merrysails AND goldensunset both have the SAME 31 toxic ref-domains (a negative-SEO attack, NOT bought PBN, "not built by site owner"), yet only merrysails is suppressed. Operator separately researched + concluded **disavow not needed**. Bing killed its disavow tool Oct 2023 anyway. Links are NOT the differentiator.
- ❌ **robots.txt bingbot block** — all checked brands have bingbot `Allow: /`. KWT's Bing "robots blocking bingbot" recommendation is an OVER-SENSITIVE FALSE ALARM: KWT's `User-agent: Bingbot` section is `Allow: /` + Disallows ONLY on /checkout + /reservation (correct — transactional paths). Not a real block. (Optional: remove KWT's redundant Bingbot section to clear the false flag.)
- ❌ **Domain age** — merrysails.com + goldensunsettour.com registered the SAME DAY (2026-03-07); one suppressed, one healthy. (merrytourism.com older: 2026-01-12.) Age doesn't differentiate.

## LEADING HYPOTHESIS — CORRECTED 2026-06-25 (deep research + operator's own locked rule)
**ROOT CAUSE = bulk title/meta/h1 CHURN on live impression-earning URLs → Bing freshness/quality classifier flips a site-level SERVING suppression.** NOT footprint, NOT PBN links (both downgraded to ~10%).

Evidence (independent global research converged with the operator's CLAUDE.md "BING SUPPRESSION — title/meta/h1 churn YASAK" rule locked 2026-06-24):
- **Dates align tightly:** MerryTourism got a 132-title-rewrite sweep (7-13 May) → suppressed; MerrySails got 53 titles + "locale-specific h1" + dateModified sweep (4-10 Jun) → impressions→0 on **2026-06-09** (days after). GoldenSunset did NOT get a bulk title sweep → healthy. **The title-churn is the real differential** (not links/robots/age — those are equal between MS and GS).
- It's the ONLY documented Bing cause that produces the exact fingerprint: stays indexed + InIndex RISING + impressions→0 + whole-domain + abrupt single-day cliff.
- Bing scopes penalties per-domain ("boundary = domain"); a true footprint/PBN penalty is cross-domain and would have hit GoldenSunset too (it didn't). Bing's link signature is de-index/demotion, NOT indexed-but-0-served.
- Ranked causes (research, confidence as DRIVER): **#1 content/freshness/churn ~45-55%** · #2 duplicate-cluster (GS too similar, Bing picked GS) ~20% · #3 PBN/links ~10% (refuted) · #4 domain age ~10% (amplifier) · #5 reporting bug ~3% (ruled out — site: returns 0) · #6 brand-entity collision ~2% (ruled out — Speller100 preserves brand tokens, site: not spell-rewritten).
- KWT (AI-citation drop, regular search OK) = a SEPARATE, milder manifestation; its robots "block" is a FALSE ALARM (bingbot Allow:/ + only transactional Disallows).

CONFIDENCE: mechanism (domain-level serving suppression) ~90% · cause is churn-not-links ~75% · exact trigger ~40% (likely unknowable — Bing never discloses).

## WHAT THE DEDICATED SESSION SHOULD DO
1. **Build the full 13-brand matrix** (each brand's own Bing Webmaster API key): GetRankAndTrafficStats (serving 0 or not), AI Performance citations (dropped?), GetCrawlStats, live Bing SERP for the brand name. Registry: `~/.agents/state/brands.json`.
2. **Cross-brand differential** across ALL brands: for the suppressed/AI-dropped set vs the healthy set, find what the hit ones SHARE that the healthy ones lack — content/template similarity (cosine), cross-brand internal/footer/schema links, launch timing, GBP naming consistency, one-word-brand entity collisions, shared GTM/analytics/IP footprint.
3. **Map the staggered timeline to Bing algo updates** — was 2026-05-31 / 2026-06-09 inside a Bing quality update? (Feed in the global-research-agent output, below.)
4. **Per-brand recovery:** file Bing domain-review tickets (feedback widget or Microsoft Q&A — note Q&A is PUBLIC, exposes footprint), monitor, log.
5. **On-site disentanglement already done for MS** (commit `6f0ad2e`: sameAs cleaned, disambiguatingDescription). Replicate the footprint/entity cleanup to MerryTourism + KWT + any hit brand; keep GoldenSunset as the "clean" control.

## INPUTS / ARTIFACTS
- Global research agent (launched 2026-06-25 from cruise session): Bing June-2026 update timeline + Microsoft Q&A confirmed-cause evidence + adversarial alternative-cause ranking. **Output to append here when it completes.**
- Disavow audits: `merrysails/data/disavow-*.txt` (per-brand toxic-domain lists).
- Bing soft-deindex reference: memory `reference_bing_soft_deindex_2026_06_25.md`.
- Brand registry + Clarity/Bing keys: `~/.agents/state/brands.json`.

## HONEST CERTAINTY (2026-06-25)
- WHAT (serving suppression + AI-citation drop): HIGH.
- WHY: ruled out links/robots/age; leading = network/footprint quality signal + (for Merry pair) entity entanglement; **precise trigger NOT confirmable without Bing's ticket reply or the update-timeline.** Don't claim 100% until one of those lands.
