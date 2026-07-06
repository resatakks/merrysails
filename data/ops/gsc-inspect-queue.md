# GSC URL Inspect — Priority Queue (MerrySails)
**Son güncelleme:** 2026-07-06 (Inspection API ile 9 URL yeniden doğrulandı) · **API kotası:** 2000/gün/property (bol) · **Manuel Request-Index kotası:** ~1-3/gün (kıt — israf edilmez)

> **KURAL:** Google indexing stratejisi = güçlü internal link + sıfır teknik hata + geçerli rich results. Manuel Request-Index SADECE doğrulanmış-unindexed money page (max 1-3/gün). Index-durum doğrulaması Inspection API ile otomatik yapılır.

> ✅ **Merkezi token (`/Users/resat/mcp-gsc/token.json`) FULL çalışıyor:** inspection + search-analytics + sitemaps üçü de.

## 🎯 Aktif kuyruk — SADECE doğrulanmış-unindexed

**Bugün YOK.** Dünkü tek aday (`/blog/best-bosphorus-sunset-cruise-istanbul-2026`) doğal olarak indexlendi — aşağıya bkz. Manuel Request-Index kotası harcanmasın, bugüne kadar hiçbir manuel aksiyon gerekmiyor.

## ✅ KAPANAN (indexlendi, artık izlemeye gerek yok)

| URL | Önceki durum | Bugünkü durum (2026-07-06) |
|---|---|---|
| /blog/best-bosphorus-sunset-cruise-istanbul-2026 | Crawled — currently not indexed (06-27'den beri donuk) | **✅ Submitted and indexed**, crawl bugün **07-06 11:38** — rich PASS. Internal-link güçlendirme + auto-submit cadence işe yaramış görünüyor. |

## 👁️ İzleme listesi (indexed ama sorunlu — manuel kota GEREKMEZ)

| URL | Durum (2026-07-06) | İzleme sebebi |
|---|---|---|
| /tr/bosphorus-cruise | Indexed, rich PASS, **crawl HÂLÂ 05-13 (54 gün bayat, değişmedi)** | "boğaz turu" 6.600/mo hedef sayfası — Yandex/IndexNow push devam (bugün gitti); Google recrawl hâlâ gelmiyor → TR internal-link akışı işi güçlendirilmeli (2 gün önceki tavsiyeye rağmen crawl tarihi sabit kaldı) |
| /istanbul-dinner-cruise | Indexed, **rich FAIL** (4× Review itemReviewed), crawl 07-03 | FV-5: kod fix HÂLÂ deploy edilmedi (`ReviewsCarousel.tsx`); schema fix sonrası re-inspect |
| /yacht-charter-istanbul | Indexed, **rich FAIL**, crawl 06-24 | FV-5 — fix sonrası re-inspect |
| /cruises/bosphorus-sunset-cruise | Indexed, **rich FAIL**, crawl 06-26 | FV-5 — fix sonrası re-inspect |
| /de/istanbul-dinner-cruise | Indexed, **rich FAIL**, crawl 06-26 | FV-5 — fix sonrası re-inspect |
| /yacht-charter-istanbul/premium-yacht-15 | Indexed, rich PASS + Product review/aggregateRating WARNING (değişmedi) | Gerçek first-party review eklenince re-inspect |

## Kota notu
- Manuel Request-Index bugün gerekli: **0 URL**. Tüm manuel kota diğer markalara ayrılabilir.
- Index doğrulama Inspection API ile (2000/gün) — manuel inspect kotası bu işe KULLANILMAZ.
- Detaylı bulgular: `data/ops/INDEX-AUDIT-2026-07-02.md` · DMCA submit kuralı: `data/ops/submit-denylist.md`
