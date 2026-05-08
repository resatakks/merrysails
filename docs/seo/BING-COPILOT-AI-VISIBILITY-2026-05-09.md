# Bing / Microsoft Copilot AI Visibility — Plan 2026-05-09

## Baseline (verified via Bing Webmaster Tools / AI Performance)

| Surface | Citations 7d | Citations 30d | Citations 3M |
|---|---:|---:|---:|
| Microsoft Copilot + Partners | 0 | 0 | **0** |

By contrast, our own UTM-based Clarity data shows:

| Surface | Sessions 7d | Avg duration |
|---|---:|---:|
| ChatGPT | 64 | 176s |
| Perplexity | 1 | 21s |
| OpenAI direct | 2 | 12s |
| Microsoft Copilot | 0 (no UTM tag observed) | — |

**Conclusion:** the OpenAI ecosystem (ChatGPT + Perplexity which uses GPT) is citing MerrySails frequently. The Microsoft Copilot ecosystem (Copilot in Edge, Copilot in Bing, Copilot in Office) is citing us **zero times** in the last 90 days.

This is a real visibility gap on a surface that ships pre-installed in Windows 11 and Edge. Closing it should give us another 30–60 sessions/week if Copilot mention frequency catches up to ChatGPT.

## Why ChatGPT cites us but Copilot does not

Copilot grounds answers in three sources:

1. Bing Search index (organic SERP)
2. Bing Knowledge Graph (entity database)
3. Live web fetch via the Edge browser sidebar

For Copilot to cite us we need to be in (1) ranking well, OR in (2) as a known entity, OR be on the page the user is currently reading in Edge.

ChatGPT's grounding includes:

1. Pretrained corpus (which leans heavily on Common Crawl + Reddit + Wikipedia)
2. Browse with Bing (when the model decides to search)
3. Site:- specific knowledge from training cutoff

The ChatGPT path that works for us is mostly (1) — our blog posts and llms.txt got into the training corpus before Copilot's own retrieval kicked in. Copilot relies more heavily on real-time Bing organic ranking, where we are still in sandbox.

## Tactical fixes (priority order)

### P0 — Bing organic ranking
- IndexNow ping is live and sends every change to api.indexnow.org / Bing / Yandex (verified 200 today). Continue.
- Bing rewards sitemaps that update lastmod aggressively. Our sitemap is dynamic and last DL was 2026-05-07. Good.
- Bing weighs schema.org markup more heavily than Google for entity recognition. The HowTo schema we added today on /bosphorus-cruise + the VideoObject schema on /cruises/[slug] are precisely the rich-result types Bing favors.
- Confirm site:merrysails.com count in Bing weekly. Target: 200+ pages indexed within 30 days.

### P0 — Bing Knowledge Graph entity
- Bing maintains its own entity database. Submit a structured Organization profile (already in place via our root layout JSON-LD).
- Verify our entity is pickable: search "MerrySails" on Bing, check if a Knowledge Panel shows.
- If no Knowledge Panel: add a Wikipedia page for parent entity Merry Tourism (separate session, user-driven).

### P1 — Bing-specific content surface
- Bing prefers structured listicles ("Top 10 Bosphorus cruises in Istanbul") over essay-style content.
- Add an /istanbul-bosphorus-cruise-comparison page or boost /compare-bosphorus-cruises with HowTo + ItemList schema.
- Bing's algorithm rewards explicit price + duration in the FIRST 100 words of the page (we already do this in metadata, ensure body matches).

### P1 — Edge sidebar Copilot grounding
- When a user opens Copilot sidebar while on merrysails.com, it grounds on the current page text.
- Ensure all commercial pages have:
  - First-paragraph summary with price + duration + license signal (already in place after today's metadata fix)
  - Clear FAQ block at the bottom (already in place)
  - aggregateRating in JSON-LD (already in place)
- This is what flips Edge users into Copilot users who can copy our answer + share it.

### P2 — Microsoft Clarity bridge
- Clarity is Microsoft-owned. While Clarity does not directly feed Copilot, sites with high Clarity engagement signal "real users use this site" to the Microsoft ecosystem.
- Our Clarity data is healthy (140s+ avg duration, low rage-click after today's UX fix).
- Continue Clarity Smart Events tracking — Microsoft uses Clarity as a quality signal proxy.

### P2 — Bing Webmaster Site Scan
- Run "Site Scan" in Bing Webmaster Tools every 2 weeks. It produces Bing-specific SEO recommendations not covered by Google's Search Console.
- Schedule: bi-weekly Monday morning.

## Tracking

Add to monthly review:

| Metric | Source | Target 30d | Target 90d |
|---|---|---|---|
| Copilot citations | Bing Webmaster AI Performance | 5+ | 30+ |
| site:merrysails.com Bing count | Bing search | 100+ | 250+ |
| Clarity sessions from Edge | Clarity dashboard | 10+ | 50+ |
| MerrySails Knowledge Panel | Bing search | exists | rich |

## Anti-pattern

Do NOT spam Bing URL Submission tool — it's been deprecated and merged into IndexNow. Manual submissions there now have no effect.

Do NOT run multiple Site Scans in the same week — Bing throttles repeat scans.

## Owner

This is a slow-burn surface. Expect 60–90 days before Copilot citations start appearing. Track monthly, not weekly. Patience required.
