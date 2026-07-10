# GSC URL Inspect — Priority Queue (MerrySails)
**Son güncelleme:** 2026-07-10 (Inspection API ile 6 URL doğrulandı) · **API kotası:** 2000/gün/property (bol) · **Manuel Request-Index kotası:** ~1-3/gün (kıt)

> **KURAL:** Google indexing stratejisi = güçlü internal link + sıfır teknik hata + geçerli rich results. Manuel Request-Index SADECE doğrulanmış-unindexed VEYA büyük-değişiklik-görmüş money page (max 1-3/gün). Index-durum doğrulaması Inspection API ile otomatik. Tıkları **post-sweep TEK SERİ Chrome fazı** atar (property-guard) — sweep agent'ı basmaz.

> ✅ **Merkezi token (`/Users/resat/mcp-gsc/token.json`) FULL çalışıyor:** inspection + search-analytics + sitemaps.

## 🤖 chrome_queue — bugün (post-sweep serial Chrome fazı işler)
| # | Action | Target | Kanıt / neden |
|---|---|---|---|
| 1 | **validation_restart** | GSC "Yorum snippet'leri (Review snippets)" enhancement raporu | FV-5 fix `f875d43` **CANLI** — curl: /istanbul-dinner-cruise `itemReviewed:{@id .../bosphorus-dinner-cruise-istanbul#event}`, /yacht `#product`, /sunset `#event`. Google stale crawl (06-24→07-06 deploy öncesi) → validate-fix re-crawl'ı hızlandırır. /bosphorus-cruise PASS referans. |
| 2 | **request_index** | https://merrysails.com/yacht-charter-istanbul | Schema fix CANLI (itemReviewed→#product) AMA son crawl **06-24 (16g stale)** = deploy öncesi. Tier-1 yacht önceliği. Re-crawl rich-FAIL'i temizler + pik-sezon yıldız snippet. |
| 3 | **request_index** (ikincil) | https://merrysails.com/tr/bosphorus-cruise | Doğrulanmış-unindexed (crawled-not-indexed, lastCrawl 07-07). "boğaz turu" 6.600/mo hedef. NOT: gerçek çözüm = internal-link (kod); request-index marjinal, kota kalırsa. |

## 🎯 Aktif kuyruk — doğrulanmış-unindexed money page
| URL | Durum (2026-07-10) | Aksiyon |
|---|---|---|
| **/tr/bosphorus-cruise** | **"Crawled - currently not indexed"** (Inspection teyit: coverage CNI, verdict NEUTRAL, lastCrawl 07-07) | chrome_queue #3 (ikincil). **Gerçek çözüm = TR internal-link** (GROWTH-PLAN Hamle 4). Auto-submit'te (IndexNow/Bing/Yandex 202). |

## 👁️ İzleme listesi (indexed — rich FAIL AMA fix CANLI, Google re-crawl bekliyor)
| URL | Google-tarafı (2026-07-10) | Canlı JSON-LD (curl) | Not |
|---|---|---|---|
| /istanbul-dinner-cruise | Indexed, rich **FAIL** (4× itemReviewed), lastCrawl **07-03** | ✅ `#event` (DÜZELDİ) | Re-crawl bekliyor → validation_restart |
| /yacht-charter-istanbul | Indexed, rich **FAIL**, lastCrawl **06-24** | ✅ `#product` (DÜZELDİ) | chrome_queue #2 request_index |
| /cruises/bosphorus-sunset-cruise | Indexed, rich **FAIL**, lastCrawl **07-06** | ✅ `#event` (DÜZELDİ) | Re-crawl bekliyor → validation_restart |
| /de/istanbul-dinner-cruise | Indexed, rich **FAIL**, lastCrawl **06-26** | ✅ (fix paylaşılan komponent) | Re-crawl bekliyor |
| /bosphorus-cruise | Indexed, rich **PASS** (Product+Review+Breadcrumb), lastCrawl 07-06 | ✅ referans PASS | FV-5 fix bu pattern'i kopyaladı |

## ⚑ A1 CRAWL-BUDGET (07-07 keşfi, 07-10 DEĞİŞMEDİ — cache page-indexing-ui, 06-30 snapshot)
- **Tarandı - dizine eklenmedi: 1.553** (Başarısız) · Keşfedildi: 82 · 404: 32 · noindex: 5 · Yönlendirmeli: 14(NR-9) · alt-canonical: 0
- **Google indexed: 342** → %82 not-indexed / index-rate 16.9%
- **07-10:** sınıflar 07-08 ile BİREBİR AYNI (GSC aggregate raporu hâlâ 06-30 freshness) → R5 CLEAR. **Aksiyon: A8 dead-inventory audit** (next_due 07-12). **SF-1/SF-2 301 map (797 URL) CANLI** → 404×32'yi audit'te yeniden ölç (çoğu çözülmüş olabilir).

## Kota notu
- Manuel Request-Index kuyruğu (chrome_queue): 1 validation_restart + 2 request_index. Serial Chrome fazı kota izin verdiğince (~1-3) atar; kalan yarına devreder.
- Index doğrulama Inspection API ile (2000/gün) — manuel kota bu işe kullanılmaz.
- DMCA submit kuralı: `data/ops/submit-denylist.md` (Lumen #86820254 URL listesi operatörde, tablo boş).
