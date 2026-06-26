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
| 2026-06-24 (28d) | MS | Direct 476/113 · Organic 270/59 · **AI Assistant 145/49 (~34% rate = HIGHEST)** · Paid 46/11 | AI(ChatGPT ~95%) = top convert-rate + fastest-growing (d7 already 72/33). **Paid barely 46 sess/28d = ads not landing.** Mobile converts 6× desktop (236 vs 39 ke). TR+US convert most (not UK/DE). 16 purchases/28d. |
| 2026-06-24 (28d) | GS | Direct 355/19 · Organic 235/**5** · **AI Assistant 101/16** · Paid **0** | Organic 235 sess→5 ke (2%, informational rot). High-traffic pages convert ZERO (sunset 67/0) → inline-booking should help. 404 leak 23×/28d (ru-yacht fleet) FIXED. 8 purchases/28d (3-4× worse than MS). |

## History log
- 2026-06-16: first trend file. MS pos 56→11 (7wk), GS 26→11 (3wk). Both sandbox-exiting. CTR is the gap.
- 2026-06-24: SF/SEMrush error batch fixed + DEPLOYED (MS aa2656a / GS 3ed2ec0). **Why so many errors = incomplete fixes + 1 renderer bug + 1 stale crawl, NOT new rot:** (1) hreflang.ts was patched (commit 0cb49fa) but sitemap+[locale]/layout still emitted raw sa/zh → fixed to ar/zh-Hans everywhere (3 signals now agree); (2) LanguageSwitcher emitted same-slug locale URLs → 754 internal 404s (blog/guide slugs are locale-disjoint) → switch to locale index, ONE file fix; (3) WeekdayDiscountBanner {product}=English nameEn leaked into zh body → localized; (4) GS 30 locale LocalBusiness "missing address" = STALE crawl (address already inline in source, clears on re-crawl); (5) GS 8 blog refs said yacht €280 (real floor €220) → fixed. **PREVENTION: 4 permanent lint guards** (invalid-hreflang-code / hreflang-target-redirects / code-consistency / hardcoded-English) + G4 brand-address guard + seo-audit-comprehensive self-audit → these classes now FAIL the build locally; **no longer need SF/SEMrush for them.** Still crawl-time-only (periodic SF): broken-internal-link discovery, orphan-in-sitemap, redirect-chains. Also shipped: booking-bridge CTAs (vs-ferry/kids/tipping), striking-distance (yacht €220 H2+FAQ, /bosphorus-cruise title "From €30"), smart-date+scroll-mt booking. QUEUED→DONE same day: see next line.
- 2026-06-24 (b): QUEUE CLEARED + DEPLOYED (MS 3140619 / GS 1843760). Sitemap focus hygiene (MS 462→396, GS 428→394 — removed zero-impression event/occasion + 34/2 EN blog clusters, REMOVE-FROM-SITEMAP only, pages stay live + indexable, fully reversible). /ru/ru//zh/zh/ double-prefix root-caused + idempotent-fixed. RING related-posts graph → every blog post (EN+locale, MS 188 + GS 198) gets exactly 3 in-content inlinks (kills the 89/34 "1-internal-link" flags, no sitewide strip). GS Footer /ru/guides 404 (sitewide) fixed via staged-locale gating. 4 orphan money pages linked from pillars. 27 yacht-class locale dup-titles fixed by adding de/fr/nl/ru/zh fleet i18n (localize, NOT noindex). Shared seo-lint package: r29 (region-as-language) + r30 (hreflang-target-redirects) + r31 (code-inconsistent) → all 12 brands inherit, all PASS. 12 stale wrong-brand CSVs purged from GS. GS Bing still unverified (task #19) — fix = Bing Webmaster "Import from GSC" (GS is GSC-verified). Ads: keep ₺1000 70/30, in-Istanbul+Europe both, weight by geo-conversion after 3-5d (AE cheapest $0.73).
- 2026-06-24 (c): **CONVERSION UX — inline locked-product booking** (MS `65413d5` / GS `069ca0e`, prod-verified). Operator disliked the "Reserve from €X" bounce to /reservation's generic "choose the product first" planner. Fix: `CoreBookingPlanner` gained `lockTour` (hides 3-product selector, h2=cruise name, straight to package/**calendar**/guests/price/Book); embedded INLINE on `cruises/[slug]` + `[locale]/cruises/[slug]` + `istanbul-dinner-cruise` + `yacht-charter-istanbul` (both brands) high on the page; hero+mobile-sticky Reserve CTA now scroll to `#core-booking-planner` (same page, no bounce). Preview-proven MS sunset/dinner/yacht (locked widget, real prices, same-page CTAs). Fleet-specific "Book this yacht" deep-links + header nav + schema URLs deliberately keep /reservation. Also shipped earlier same day: GS Bing Webmaster VERIFIED (ChatGPT-citation channel opened) + AI answer-capsules strengthened (sunset/dinner both brands) + GSC re-crawl/IndexNow/Bing-submit. GSC chart live: MS 280 clicks total, 8-12/day recent (growing), vs-ferry blog +121% impressions. Conversion-bottleneck audit: booking flow now CLEAN post-deploy (rage~0, dead-clicks were text-selection noise) — next lever is sunset above-fold copy A/B, not a code fix.
- 2026-06-25: **BING soft-deindex DIAGNOSED + fixed (on-site) + full daily sweep.** MS+MerryTourism = domain-level serving suppression (indexed but not served, absent for own brand; impressions=0 since 06-09), research-confirmed via 4 Microsoft Q&A cases — cause = portfolio footprint + PBN links; recovery = operator files Bing domain-review (Bing killed disavow Oct 2023). On-site fix deployed `6f0ad2e`: layout.tsx sameAs cleaned (removed kingsworld/acilkaseniz/merry-tourism cross-brand links) + disambiguatingDescription. GS HEALTHY on Bing (serving, not spreading); Yandex both healthy (MS 333/GS 263). **GROWTH:** GSC clicks 7d MS 79 (+30%) / GS 42 (+83%); AI Assistant = #1 converting channel both (MS 70s/40ke, GS 29/14); GA4 purchase 7d MS 7/GS 3. Commercial still weak on head terms (pos 60+) but GS TR-price cluster winning (pos 9-12), MS sunset pos 5. Index: no new errors (galataport built+indexed, de-yacht orphan→discovered, tr-dinner content-strengthened awaiting re-crawl). Users: NO problems (GS clean, MS PC-sunset "dead-clicks"=verified false-positive working tabs). **ADS** (all MANUAL_CPC, no learning-phase): budget Yacht ₺1000/Sunset ₺500; desktop bid -60% (was ₺714/0conv, all 7 conv mobile); Germany +40% (cheapest ₺254/cv); 6 competitor-brand negatives (zoe/constantine/butalux/bosfora/bosphorusyachts/better-space). Best ad-groups AG-S2 sunset-phrase ₺344/cv + AG-H yacht-luxury ₺592/cv(4conv). 2 yacht orders + first yacht submit. Inline-booking + desktop date-display + PDF-download conversion fixes confirmed holding (PC dead-clicks 144→3). YACHT PAGES off-limits (operator redesign). NEXT: yacht link list on request, 10 GS URLs/day, Bing recovery watch, measure ads.
- 2026-06-23: daily deep sweep. **WIN: 4 MS yacht detail pages went Discovered→INDEXED in 1 day** (Request-Indexing + "Explore each yacht" in-content links). GA4: **AI Assistant is a top-3 channel + converting** (MS 28 / GS 15 keyEvents/7d) — GEO confirmed the strongest lever. Conversion bottleneck: cruise/booking pages show heavy dead-clicks (MS sunset 338, GS sunset 612, dinner 211, /reservation 192 over 3d) on look-clickable-inert elements (paragraphs, price, "Save €16", review/photo counts, FAQ). Keyword: still NOT on big-commercial kw (tiny impressions); ranking incidental long-tail; striking-distance commercial = "private yacht istanbul price" pos 8.9. Ads rebalanced Yacht ₺700 / Sunset ₺300 (dinner dropped), in-Istanbul targeting opened. ProductHero gained a Call button. [deep-sweep workflow findings folded in below in the dated daily log]
