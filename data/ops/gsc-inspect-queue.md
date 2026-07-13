# GSC URL Inspect — Priority Queue (MerrySails)
**Son güncelleme:** 2026-07-13 (chrome_queue carry; 🎉 Bing suppression RECOVERY teyit — auto-submit sürüyor) · **API kotası:** 2000/gün/property (bol) · **Manuel Request-Index kotası:** ~1-3/gün (kıt)

> **KURAL:** Google indexing stratejisi = güçlü internal link + sıfır teknik hata + geçerli rich results. Manuel Request-Index SADECE doğrulanmış-unindexed VEYA büyük-değişiklik-görmüş money page (max 1-3/gün). Index-durum doğrulaması Inspection API ile otomatik. Tıkları **post-sweep TEK SERİ Chrome fazı** atar (property-guard) — sweep agent'ı basmaz.

> ✅ **Merkezi token (`/Users/resat/mcp-gsc/token.json`) FULL çalışıyor:** inspection + search-analytics + sitemaps.

## 🤖 chrome_queue — bugün (post-sweep serial Chrome fazı işler)
| # | Action | Target | Kanıt / neden |
|---|---|---|---|
| 1 | **request_index** | https://merrysails.com/istanbul-dinner-cruise | Rich=**FAIL** AMA son crawl **07-03 (deploy öncesi, stale)**; schema fix CANLI (`#event`). Tier-1 dinner. Re-crawl rich-FAIL temizler. |
| 2 | **validation_restart** | GSC "Yorum snippet'leri (Review snippets)" enhancement raporu | FV-5 our-side KANITLI: /yacht + /sunset artık rich=**PASS** (07-10 crawl). Kalan /dinner + /tr/bosphorus-cruise için validate-fix re-crawl'ı hızlandırır. |

## 🎯 Aktif kuyruk — doğrulanmış-unindexed money page
| URL | Durum (2026-07-11) | Aksiyon |
|---|---|---|
| _(boş)_ | /tr/bosphorus-cruise **"Submitted and indexed"e döndü** (FV-8 çözüldü, lastCrawl 07-10) | Doğrulanmış-unindexed money page YOK. Auto-submit sürüyor. |

## 👁️ İzleme listesi (rich-results durumu — Inspection API 07-11)
| URL | Google-tarafı (2026-07-11) | Not |
|---|---|---|
| /yacht-charter-istanbul | Indexed, rich **PASS** ✅, lastCrawl 07-10 | FV-5 VALIDATED |
| /cruises/bosphorus-sunset-cruise | Indexed, rich **PASS** ✅, lastCrawl 07-10 | FV-5 VALIDATED |
| /istanbul-dinner-cruise | Indexed, rich **FAIL**, lastCrawl **07-03 (stale)** | chrome_queue #1 request_index |
| /tr/bosphorus-cruise | **Submitted and indexed** ✅, rich **FAIL**, lastCrawl 07-10 | Locale-remainder — bugünkü `fix(schema) FV-5 locale remainder` commit hedefliyor; re-crawl bekle |
| /blog/best-bosphorus-sunset-cruise-istanbul-2026 | Indexed, rich **PASS** ✅ | listicle pilotu indexed |
| /bosphorus-cruise | Indexed, rich **PASS** (referans) | FV-5 pattern kaynağı |

## ⚑ A1 CRAWL-BUDGET (carry 06-30 snapshot — bugün A1 cache-miss, taze page-indexing-ui yok)
- **Tarandı - dizine eklenmedi: 1.553** · Keşfedildi: 82 · 404: 32 · noindex: 5 · Yönlendirmeli: 14(NR-9) · alt-canonical: 0
- **Google indexed: 342** → %82 not-indexed / index-rate ~16.9%
- **07-11:** a1-cache-2026-07-11.json YOK → N/A(chrome-cache-miss), taze delta hesaplanamaz (R5 baseline). **Aksiyon: A8 dead-inventory audit** (next_due 07-12 yarın weekly). SF-1/SF-2 301 map CANLI → 404×32 audit'te yeniden ölç.

## Kota notu
- chrome_queue: 1 request_index + 1 validation_restart. Serial Chrome fazı kota izin verdiğince (~1-3) atar; kalan yarına devreder.
- Index doğrulama Inspection API ile (2000/gün) — manuel kota bu işe kullanılmaz.
- DMCA submit kuralı: `data/ops/submit-denylist.md` (Lumen #86820254 URL listesi operatörde, tablo boş).
