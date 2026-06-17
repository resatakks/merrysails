# 🔎 GSC Detailed Review — 2026-06-17 (browser pull, Brave/resatakkus10)

> Pulled from the GSC UI "Sayfa sayısı" (Pages) report — both APIs (GSC OAuth + GA4 OAuth)
> are EXPIRED/revoked, so browser is the only route. Last GSC data update: 12.06.2026.

## Pages report — counts (both brands)
| | MerrySails | GoldenSunset |
|---|---|---|
| **Indexed** | 329 | **503** |
| **Not indexed** | 1,410 (5 reasons) | 132 (6 reasons) |
| Crawled-not-indexed | **1,258** (benign `_next` build chunks — MS deploys more) | 31 |
| Discovered-not-indexed | 121 | 42 |
| **404 (Bulunamadı)** | 16 | **39** ← biggest real error |
| Redirect (Yönlendirmeli) | 10 | 14 |
| noindex | 5 | 5 (the 71 noindexed clone posts await recrawl) |
| Blocked 401 | — | 1 |

**Read:** GS has more indexed (503) but more 404s (39). MS's 1,258 crawled-not-indexed = `_next/static` chunks (confirmed benign prior). The real actionable error on both is the **404 bucket**.

## 404 drill-down (GS, 39 — examples 1-10) + root cause
The 404 chart **spiked late-May→early-June 2026** (recent). Two distinct causes:

**A. Stale/renamed yacht-detail slugs** — Google has the OLD slugs; data now uses new ones (`src/lib/locale-routes.ts` lists `premium-yacht-15`, `group-yacht-40-standard`, `group-yacht-40-signature`):
- `/yacht-charter-istanbul/group-yacht-36-standard` (EN, 404) → renamed to `group-yacht-40-standard`
- `/de/yacht-charter-istanbul/premium-yacht-14` → renamed to `premium-yacht-15`
- `/tr/yacht-charter-istanbul/group-yacht-36-standard`
- **Fix:** 301 the dead slugs → the renamed yacht (or `/yacht-charter-istanbul` hub if unsure of mapping). Confirm mapping from live `tours.ts`/`fleet.ts` before redirecting.

**B. Locale variants of EN-only routes** — these routes exist EN-only (GS has `/[locale]/faq`, NOT `/[locale]/istanbul-cruise-faq`; no `/[locale]/compare-bosphorus-cruises`):
- `/tr|/de|/nl/istanbul-cruise-faq`, `/fr|/nl/compare-bosphorus-cruises`
- **Source:** the locale page's "localized landing pages" link grid (pointed at fixed locale URLs) — **already REMOVED** in the locale declutter (GS `b7995a6`). So once deployed, nothing feeds these. To actively clear: 301 `/[locale]/<en-only-route>` → `/<en-only-route>` (EN) or `/[locale]` home.

## MS 404 bucket (16) — not yet drilled
Likely the same two patterns (stale yacht slugs + locale-variants). Drill next session via Brave (same method: click the "Bulunamadı (404)" row → Örnekler table).

## Discovered-not-indexed (MS 121 / GS 42) + noindex
- Discovered-not-indexed = pages Google found but hasn't crawled yet (new content + laggards). **Push via IndexNow + GSC Request-Indexing AFTER deploy** (10/day/property quota).
- noindex bucket only 5 on GS, but 71 clone posts were noindexed (`a04cf36`) → most await recrawl; will migrate into this bucket over weeks.

## Actionable queue (post-deploy)
1. **301 redirects for dead yacht slugs** (both brands) — confirm mapping from live fleet data, then add to `next.config.ts`.
2. **Deploy** the UI work — stops feeding the locale-variant 404 links.
3. **Optional broad rule:** `/[locale]/<en-only-route>` → EN (catch stray locale-variants).
4. **GSC Request-Indexing + IndexNow** on the rewritten/GEO/new pages (browser, 10/day).
5. **MS 404 drill** (16) next session to confirm the same patterns.

## Tooling note
GSC OAuth token (`/Users/resat/mcp-gsc/token.json`) + GA4 OAuth + lbm token all EXPIRED. URL Inspection API + GA4 API are down until reconnected. Browser (Brave) is the working path for GSC. **Reconnect the OAuth tokens** = an operator/ops task to restore API automation.
