# Bing + Yandex Index Health — 2026-06-25 (both brands)

## BING (api key, ssl.bing.com/webmaster/api.svc/json)

### MerrySails — impression cliff CONFIRMED, crawl/index HEALTHY
- InIndex (GetCrawlStats, Bing data lags ~2d → latest 06-23): 451→454 over 06-19→06-23 (RISING)
- Money pages GetUrlInfo: all healthy DocumentSize 162K–556K, HttpStatus 0, 4/5 crawled today 06-25 08:33 (/boat-rental last 06-13)
- Homepage: DocumentSize 520996, crawled today, 5537 anchors — no block
- Impressions (GetRankAndTrafficStats): decayed thru early June, 8 on 06-08, then **0 EVERY DAY 06-09 → 06-22**. Hard cliff to zero while indexed+crawled = Bing relevance/quality demotion, NOT technical. Queries that died were informational (istanbul currency, ortakoy...).

### GoldenSunset — 4 SubmitUrlBatch pages NOT re-fetched yet; index RISING; impressions alive
- 4 yesterday-submitted pages STILL DocumentSize=0, NOT re-crawled since submit:
  - /bosphorus-cruise last 05-31 | /istanbul-dinner-cruise last 05-18 | /yacht-charter-istanbul last 06-02 | /boat-rental-istanbul last 06-07
  - Control /cruises/bosphorus-sunset-cruise (NOT in batch) crawled today, DocumentSize 528145 → crawler IS active, just hasn't reached the 4
  - 24h too short; Bing crawl-stats only report to 06-23 so re-fetch wouldn't show yet either way
- InIndex: 330→386 over 06-19→06-23 (+56, strong growth)
- Impressions: alive 5–14/day, occasional clicks (06-17 14imp 1click)
- ACTION TODAY: re-SubmitUrlBatch 4 pages (HTTP d:null=accepted), quota 90/day 590/mo full

## YANDEX (OAuth token, api.webmaster.yandex.net/v4 — NO Brave needed)
- user_id 2233440146; hosts https:merrysails.com:443 / https:goldensunsettour.com:443
- searchable_pages_count: MS 327 / GS 264 — SAME as 06-23 because 06-23 IS the latest data point (Yandex recomputes every 2-3d). Both JUMPED on 06-23: MS 271→327 (+56), GS 230→264 (+34) = deploy effect.
- diagnostics: all FATAL/CRITICAL ABSENT. Only 1 RECOMMENDATION each = NOT_IN_SPRAV (not in Yandex Business directory), updated 06-24. No technical blocker.
- excluded_pages: MS 10 / GS 11. sqi 0 both (not yet computed).
- recrawl quota: MS 144/150, GS 145/150 after pushes
- ACTION TODAY: GS 4 zero-size pages → Yandex recrawl queue (task_ids returned)

## SUBMISSIONS FIRED TODAY
- GS Bing SubmitUrlBatch ×4 (re-submit)
- GS Yandex recrawl ×4
- MS IndexNow ×6 money pages (HTTP 200)
- GS IndexNow ×6 incl /tr/bogaz-turu-fiyatlari (HTTP 200)
