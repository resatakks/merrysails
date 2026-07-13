# MerrySails — CORE-SEO SCORECARD
**Tarih:** 2026-07-13 (mode=daily) · Kaynak: CORE-SEO-CHECKLIST.json (36 item) · Mature marka = daily-item her koşu + weekly-item weekly koşuda
**Skor (daily-14 subset):** 12 pass / 2 fail / 22 na(weekly) = **%85.7** · Money pages CANLIDA curl+grep doğrulandı

> Not: RAMP marka değil (mature) → bugün daily-cadence 14 item puanlandı; weekly-cadence 22 item = na(weekly, next Pazar). FREEZE aktif (Bing E4) → title/meta/h1 FAIL olsa RAPORLA-ERTELE; bugün hepsi pass, ertelenen yok.

## A. Crawl & Index
| id | cadence | sonuç | not |
|---|---|---|---|
| robots_txt | daily | ✅ pass | money-page path'leri Disallow'da değil, money 200 |
| meta_robots | daily | ✅ pass | /dinner + /yacht curl: noindex YOK |
| xml_sitemap | daily | ✅ pass | lastDownloaded 07-10, 0 err/0 warn, 393 web+196 image |
| sitemap_noindex_sync | daily | ✅ pass | NR-9 korunuyor; noindex/410 sitemap'te değil |
| index_coverage | daily | ❌ **fail** | index-rate **16.9%** (<%50) — 1.553 CNI, A8 audit P1 (ref FV-7) |
| html_sitemap | weekly | na | – |
| crawl_budget_softarly | weekly | na | – |
| crawl_stats | weekly | na | Bing crawl temiz (canlı: 2xx 102, 5xx 0) |

## B. On-page & Content
| id | cadence | sonuç | not |
|---|---|---|---|
| title_tags | daily | ✅ pass | unique, "…\| MerrySails" suffix, iyi uzunluk |
| meta_descriptions | daily | ✅ pass | present; /dinner ~155+ char (hafif uzun, lint-warn — minor) |
| h1 | daily | ✅ pass | /dinner + /yacht tam 1 H1 |
| h2_h3_hierarchy | daily | ✅ pass | mature layout, atlanan seviye görülmedi |
| duplicate/thin/alt/answer_block | weekly | na | B4 kanibalizasyon sinyali açık (2 commercial) |

## C. URLs & Structure
| id | cadence | sonuç | not |
|---|---|---|---|
| canonical | daily | ✅ pass | /dinner → /bosphorus-dinner-cruise-istanbul (kasıtlı konsolidasyon), /yacht self-canonical |
| url_structure/breadcrumbs/orphans/pagination | weekly | na | – |

## D. Structured Data
| id | cadence | sonuç | not |
|---|---|---|---|
| schema_present_valid | daily | ❌ **fail** | 2 money page rich FAIL: /dinner (stale-crawl) + /tr/bosphorus-cruise (locale-remainder); yacht+sunset PASS |
| rich_results_errors | daily | ⚠️ (schema_present_valid ile aynı kök) | recrawl bekliyor, our-side fix canlı |
| jsonld_native_ssr | weekly | na | JSON-LD SSR'da (curl'de 40-44 blok görünüyor) |

## E. Links & Redirects — weekly (na bugün)
## F. i18n
| id | cadence | sonuç | not |
|---|---|---|---|
| hreflang | daily | ✅ pass | curl: hrefLang (capital-L) 9-15 entry money pages |

## G. Technical/Perf
| id | cadence | sonuç | not |
|---|---|---|---|
| https_mixed | daily | ✅ pass | HSTS 63072000 + CSP + X-Frame + nosniff; HTTPS |
| mobile/cwv/pagespeed | weekly | na | – |

## H. Social meta — weekly (na bugün)

## Delta (önceki koşu = ilk scorecard, baseline)
- İlk scorecard oluşturuldu (07-13). Sonraki koşuda düzelen ✅ / bozulan ⚠️ işaretlenecek.
- **P1 FAIL → fix-verify-queue:** index_coverage (FV-7, A8 audit) + rich_results (FV-5 kalan 2). Her ikisi zaten kuyrukta.
