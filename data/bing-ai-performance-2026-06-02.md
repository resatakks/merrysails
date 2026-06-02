# Bing Copilot AI Performance — 2 Haziran 2026

Source: https://www.bing.com/webmasters/aiperformance?siteUrl=https://merrysails.com
Pulled: 2026-06-02 (Brave / resatakkus10)

## 24-day citation chart (May 7 → May 30)

**Total Citations: 356** across 24 days = ~14.8/day avg
**Avg Cited Pages: 5** (Copilot routes to ~5 distinct merrysails pages per query batch)

| Date | Citations | Avg Cited Pages |
|---|---:|---:|
| May 07 | 10 | 7 |
| May 08 | 9 | 5 |
| May 09 | 16 | 9 |
| May 10 | 22 | 6 |
| May 11 | 21 | 8 |
| May 12 | 3 | 2 |
| May 13 | 11 | 4 |
| May 14 | 8 | 2 |
| May 15 | 5 | 2 |
| May 16 | 23 | 8 |
| May 17 | 23 | 6 |
| May 18 | **28** | 4 |
| May 19 | 5 | 1 |
| May 20 | 18 | 6 |
| May 21 | 12 | 6 |
| May 22 | 14 | 7 |
| May 23 | 14 | 6 |
| May 24 | **28** | 8 |
| May 25 | 17 | 5 |
| May 26 | 15 | 6 |
| May 27 | 7 | 3 |
| May 28 | 22 | 7 |
| May 29 | 10 | 5 |
| May 30 | 15 | 8 |

## Peaks
- **May 18 + May 24** = 28 citations each day (post-deploy weekends?)
- Lowest: May 12 (3) and May 19 (5) — both Tuesdays
- Last 5d avg (May 26-30): (15+7+22+10+15)/5 = **13.8/day** stable

## Notes
- Pages tab + Grounding Queries detail tables don't render via DOM scrape
  (lazy-loaded after virtualization). User can click "Download" in UI to
  pull CSV with per-page citations + per-query breakdowns.
- Microsoft Copilot **15× more citations** than ChatGPT for merrysails
  (Bing AI: ~15/day vs GA4 ChatGPT referrers: ~6/day).

## Action items
- Pull `Download` CSV monthly to track which pages Copilot loves
- Compare against GA4 `chatgpt.com` referrer counts
- Push more comparison/decision-tree content to llms.txt + comparison pages
  (already done 2 June: +10 entries to llms.txt)
