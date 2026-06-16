# 📈 Cruise Vertical — Position & Visibility Trend (old ↔ new)

> Append new dated rows over time. Daily rows = single-day GSC snapshot (small imp); the 30d rows are
> rolling-window pulls (large imp). Compare AVG POSITION across both (it's window-independent).
> Source data: `merrysails/data/gsc/gsc-snapshot-*.json`, `goldensunsettour/data/gsc/`, `data/cruise-deep/<date>/`.

## MerrySails — avg position (lower = better)
| Date | Avg pos | Imp | Note |
|---|---|---|---|
| 2026-04-26 | 30.5 | 72 | early indexation |
| 2026-04-28 | 57.6 | 40 | sandbox churn |
| 2026-05-11 | 61.0 | 43 | bottom |
| 2026-05-20 | 54.8 | 34 | |
| 2026-05-23 | 56.0 | 25 | 2 days before DMCA notice |
| 2026-05-26 | 37.9 | 39 | climbing |
| **2026-05-27** | **19.6** | 36 | **sharp jump — sandbox exit begins** |
| 2026-05-30 | 24.6 | 34 | |
| **2026-06-16** | **11.1** | 16,050 (30d) | **best — pillars matured/recovered** |

**Read:** MS sat pos ~55-60 through Apr–mid May, broke to ~20 around May 27, now ~11. The DMCA notice
(May 25) did NOT durably suppress — position kept improving through and after it. Confirms the
cannibalization-resolution finding (pillars recovered; clean slugs were unnecessary). ~5× position gain in 7 weeks.

## GoldenSunset — avg position
| Date | Avg pos | Imp | Note |
|---|---|---|---|
| 2026-05-26 | 25.7 | 47 | |
| 2026-05-27 | 21.2 | 59 | |
| **2026-05-28** | **13.2** | 88 | sharp improvement |
| 2026-05-31 | 17.1 | 44 | |
| **2026-06-16** | **11.4** | 13,887 (30d) | best |

**Read:** GS improved ~26 → ~13-17 → 11 over 3 weeks. Same maturation curve as MS, slightly ahead on
indexed-page count (GS 503 vs MS 329) but far behind on Bing (GS 0 indexed — fixed via submit 06-16).

## Cross-brand snapshot deltas (vs 2026-06-15 kickoff baseline)
| Metric | MS 06-15 → 06-16 | GS 06-15 → 06-16 |
|---|---|---|
| GSC clicks (30d) | 117 → 117 | 122 → 122 |
| GSC imp | 16,050 → 16,050 | 13,887 → 13,887 |
| Avg pos | 11.1 → 11.1 | 11.4 → 11.4 |
| (flat day-over-day — same 30d window; trend is the multi-week climb above) | | |

## What the trend says (strategy)
- **Both brands are exiting the sandbox** (pos ~55 → ~11). The lever now is **CTR** (0.73%/0.88% is low for pos 11)
  → title/snippet rewrites (in progress) convert existing rank into clicks. This is the highest-ROI move.
- **DMCA was a blip, not a wall** — stop treating it as the dominant constraint (cannibalization-resolution done).
- **GS Bing 0-index** is the one hard visibility gap (GEO/ChatGPT) — submitted 06-16, watch for index appearance.
- Next: re-pull daily, append rows here, watch pos break <10 and CTR rise post title-rewrites.

## History log
- 2026-06-16: first trend file. MS pos 56→11 (7wk), GS 26→11 (3wk). Both sandbox-exiting. CTR is the gap.
