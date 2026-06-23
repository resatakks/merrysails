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
| **2026-06-23** | ~10 | small | **4 yacht detail pages Discovered→INDEXED in 1 day** (Request-Indexing + in-content "Explore each yacht" links worked). Still ranking incidental long-tail, NOT big-commercial kw yet. |

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

## GA4 channel mix (the conversion truth — not just rankings)
| Date | Brand | Top channels (sessions / keyEvents, 7d) | Read |
|---|---|---|---|
| 2026-06-23 | MS | Direct 144/18 · Organic 82/29 · **AI Assistant 76/28** · Paid 40/11 | AI Assistant = top-3 channel AND converts. GEO is the working growth lever. Paid (yacht) converting. |
| 2026-06-23 | GS | Direct 219/9 · **AI Assistant 44/15** · Organic 42/2 | GS organic weak (42/2); AI Assistant strong (44/15). |

## History log
- 2026-06-16: first trend file. MS pos 56→11 (7wk), GS 26→11 (3wk). Both sandbox-exiting. CTR is the gap.
- 2026-06-24: SF/SEMrush error batch fixed + DEPLOYED (MS aa2656a / GS 3ed2ec0). **Why so many errors = incomplete fixes + 1 renderer bug + 1 stale crawl, NOT new rot:** (1) hreflang.ts was patched (commit 0cb49fa) but sitemap+[locale]/layout still emitted raw sa/zh → fixed to ar/zh-Hans everywhere (3 signals now agree); (2) LanguageSwitcher emitted same-slug locale URLs → 754 internal 404s (blog/guide slugs are locale-disjoint) → switch to locale index, ONE file fix; (3) WeekdayDiscountBanner {product}=English nameEn leaked into zh body → localized; (4) GS 30 locale LocalBusiness "missing address" = STALE crawl (address already inline in source, clears on re-crawl); (5) GS 8 blog refs said yacht €280 (real floor €220) → fixed. **PREVENTION: 4 permanent lint guards** (invalid-hreflang-code / hreflang-target-redirects / code-consistency / hardcoded-English) + G4 brand-address guard + seo-audit-comprehensive self-audit → these classes now FAIL the build locally; **no longer need SF/SEMrush for them.** Still crawl-time-only (periodic SF): broken-internal-link discovery, orphan-in-sitemap, redirect-chains. Also shipped: booking-bridge CTAs (vs-ferry/kids/tipping), striking-distance (yacht €220 H2+FAQ, /bosphorus-cruise title "From €30"), smart-date+scroll-mt booking. QUEUED: 7 residual broken links + /ru/ru double-prefix bug, orphan money-page links, ru/zh dup-title strategy, blog ≥3-internal-link.
- 2026-06-23: daily deep sweep. **WIN: 4 MS yacht detail pages went Discovered→INDEXED in 1 day** (Request-Indexing + "Explore each yacht" in-content links). GA4: **AI Assistant is a top-3 channel + converting** (MS 28 / GS 15 keyEvents/7d) — GEO confirmed the strongest lever. Conversion bottleneck: cruise/booking pages show heavy dead-clicks (MS sunset 338, GS sunset 612, dinner 211, /reservation 192 over 3d) on look-clickable-inert elements (paragraphs, price, "Save €16", review/photo counts, FAQ). Keyword: still NOT on big-commercial kw (tiny impressions); ranking incidental long-tail; striking-distance commercial = "private yacht istanbul price" pos 8.9. Ads rebalanced Yacht ₺700 / Sunset ₺300 (dinner dropped), in-Istanbul targeting opened. ProductHero gained a Call button. [deep-sweep workflow findings folded in below in the dated daily log]
