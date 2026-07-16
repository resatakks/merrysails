# GSC URL Inspect — Priority Queue (MerrySails)
**Son güncelleme:** 2026-07-17 · **⚠️ GSC OAuth token EXPIRED** (merkezi `/Users/resat/mcp-gsc/token.json` + proje `.env.local` GSC_* → `invalid_grant`) → **Inspection API doğrulama BUGÜN YAPILAMADI.** chrome_queue carry. Auto-submit (IndexNow/Bing/Yandex) token'dan bağımsız, 15 URL 200/202 gitti.

> **2026-07-17 durum:** GSC token expired = A7 index-verification + B2 striking + B11 intent-mix bloke (operatör refresh gerek: `node scripts/gsc-oauth-refresh.mjs`). chrome_queue DEĞİŞMEDİ (carry): (1) request_index /istanbul-dinner-cruise (rich our-side CLEAN — itemReviewed @id live curl-doğrulandı; Google-side stale-crawl 07-03) + (2) validation_restart "Review snippets". Doğrulanmış-unindexed money page YOK (07-11 son taze inspection). A1 BUGÜN FRESH page-indexing-ui: CNI 1720, index-rate 15.6%.

> **KURAL:** Google indexing = güçlü internal link + sıfır teknik hata + geçerli rich results. Manuel Request-Index SADECE doğrulanmış-unindexed VEYA büyük-değişiklik money page (max 1-3/gün). Tıkları post-sweep TEK SERİ Chrome fazı atar (property-guard) — sweep agent'ı basmaz.

## 🤖 chrome_queue — bugün (post-sweep serial Chrome fazı işler)
| # | Action | Target | Kanıt / neden |
|---|---|---|---|
| 1 | **request_index** | https://merrysails.com/istanbul-dinner-cruise | Rich our-side CLEAN (itemReviewed `#event` @id curl-live); Google son crawl **07-03 stale**. Tier-1 dinner. Re-crawl rich-FAIL temizler. |
| 2 | **validation_restart** | GSC "Yorum snippet'leri (Review snippets)" enhancement raporu | FV-5 our-side KANITLI: /yacht + /sunset rich=PASS (07-10 crawl). Kalan /dinner + /tr/bosphorus için validate-fix re-crawl'ı hızlandırır. |

## 🎯 Aktif kuyruk — doğrulanmış-unindexed money page
| URL | Durum | Aksiyon |
|---|---|---|
| _(boş)_ | GSC token expired → bugün taze inspection yok. Son taze (07-11): /tr/bosphorus-cruise "Submitted and indexed" | Doğrulanmış-unindexed money page YOK. Auto-submit sürüyor. Token refresh sonrası yeniden tara. |

## 👁️ İzleme listesi (rich-results — carry Inspection 07-11, bugün verify token-blocked)
| URL | Google-tarafı (07-11) | Not |
|---|---|---|
| /yacht-charter-istanbul | Indexed, rich **PASS** ✅ | FV-5 VALIDATED |
| /cruises/bosphorus-sunset-cruise | Indexed, rich **PASS** ✅ | FV-5 VALIDATED |
| /istanbul-dinner-cruise | rich FAIL, lastCrawl 07-03 (stale) | chrome_queue #1 request_index (our-side CLEAN) |
| /tr/bosphorus-cruise | Submitted+indexed ✅, rich FAIL (locale) | re-crawl bekle |
| /bosphorus-cruise | Indexed, rich PASS (referans) | FV-5 pattern kaynağı |

## ⚑ A1 CRAWL-BUDGET (2026-07-17 FRESH page-indexing-ui — 06-30'dan beri ilk taze)
- **Tarandı-dizine eklenmedi (CNI): 1.720** · Keşfedildi: 64 · 404: 36 · noindex: 6 · Yönlendirmeli: 16(NR-9) · alt-canonical: 0
- **Google indexed: 341** → index-rate **15.6%** (<%50)
- Method-değişimi (dün cache-miss) → **BASELINE**, R5 tetiklenmez. 1720 gerçek taze sayı (carry 1553 stale'di). **Aksiyon: A8 dead-inventory audit (weekly, 2 hafta gecikti).** SF-1/SF-2 301 map CANLI → 404×36 audit'te yeniden ölç.

## Kota notu
- chrome_queue: 1 request_index + 1 validation_restart. Serial Chrome fazı kota izin verdiğince (~1-3) atar; kalan yarına devreder.
- **GSC token refresh sonrası:** A7 taze inspection + B2 striking + B11 intent-mix yeniden çek.
- DMCA submit kuralı: `data/ops/submit-denylist.md` (Lumen #86820254 operatörde, tablo boş).
