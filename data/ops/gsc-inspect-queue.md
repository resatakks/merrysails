# GSC URL Inspect — Priority Queue (MerrySails)
**Son güncelleme:** 2026-07-08 (Inspection API ile 6 URL doğrulandı) · **API kotası:** 2000/gün/property (bol) · **Manuel Request-Index kotası:** ~1-3/gün (kıt)

> **KURAL:** Google indexing stratejisi = güçlü internal link + sıfır teknik hata + geçerli rich results. Manuel Request-Index SADECE doğrulanmış-unindexed money page (max 1-3/gün). Index-durum doğrulaması Inspection API ile otomatik.

> ✅ **Merkezi token (`/Users/resat/mcp-gsc/token.json`) FULL çalışıyor:** inspection + search-analytics + sitemaps. Bugünkü scratchpad script'i env-var precedence bug'ını bypass ediyor (token dosyasını direkt okur).

## 🎯 Aktif kuyruk — doğrulanmış-unindexed money page (max 3)
| # | URL | Durum (2026-07-08) | Aksiyon |
|---|---|---|---|
| 1 | **/tr/bosphorus-cruise** | **"Crawled - currently not indexed"** (indexed→CNI'ye DÖNDÜ; 07-08 02:39 taze crawl, fetch OK, indexing izinli — soft kalite/crawl-budget kararı) | Chrome Request-Index **DENENDİ ama DOĞRULANAMADI** (GSC property merrytourism'e switch etti, modal açılmadı). Bugünkü auto-submit'te (IndexNow/Bing/Yandex 202). **Gerçek çözüm = internal-link** (GROWTH-PLAN Hamle 4), request-index marjinal. Sonraki interaktif koşuda tekrar dene. |

**Not:** "boğaz turu" 6.600/mo KD~1 hedef sayfası dizinden düştü — push+request-index tek başına yetersiz kanıtlandı (3+ gün). TR sayfalardan içerik-içi internal-link akışı ŞART (kod-session).

## ⚑ A1 CRAWL-BUDGET UYARISI (07-07 keşfi, 07-08 DEĞİŞMEDİ — 06-30 snapshot)
Gerçek "Sayfalar neden dizine eklenmiyor" raporu (Chrome MCP, GSC freshness 30.06.2026):
- **Tarandı - dizine eklenmedi: 1.553** (Başarısız) · Keşfedildi: 82 (Başladı) · 404: 32 (Başarısız) · noindex: 5 · Yönlendirmeli: 14 (NR-9) · alt-canonical: 0
- **Google indexed: 342** → %82 not-indexed / index-rate ~16.8%
- **07-08:** sınıflar 07-07 ile BİREBİR AYNI (rapor 24h yenilenmedi) → büyüme yok, R5 CLEAR. Manuel Request-Index ile ÇÖZÜLMEZ (sistemik). **Aksiyon: A8 dead-inventory audit** (next_due 07-12, öne çek) — sınıf-kırılımı → noindex/410/sitemap-prune. 404×32 ayrı kır.

## 👁️ İzleme listesi (indexed ama rich FAIL — manuel kota GEREKMEZ, fix sonrası re-inspect)
| URL | Durum (2026-07-08) | İzleme sebebi |
|---|---|---|
| /istanbul-dinner-cruise | Indexed, **rich FAIL** (4× itemReviewed), crawl 07-03 | FV-5 (5. gün) — ReviewsCarousel.tsx fix sonrası re-inspect |
| /yacht-charter-istanbul | Indexed, **rich FAIL**, crawl 06-24 | FV-5 — fix sonrası re-inspect |
| /cruises/bosphorus-sunset-cruise | Indexed, **rich FAIL**, crawl 07-06 | FV-5 — fix sonrası re-inspect |
| /de/istanbul-dinner-cruise | Indexed, **rich FAIL**, crawl 06-26 | FV-5 — fix sonrası re-inspect |
| /bosphorus-cruise | Indexed, **rich PASS** (Product+Review+Breadcrumb), crawl 07-06 | Referans PASS pattern (FV-5 fix bunu kopyalayacak) |

## Kota notu
- Manuel Request-Index bugün onaylı: **0 URL** (/tr/bosphorus-cruise denendi ama doğrulanamadı). Kalan manuel kota diğer markalara.
- Index doğrulama Inspection API ile (2000/gün) — manuel kota bu işe kullanılmaz.
- DMCA submit kuralı: `data/ops/submit-denylist.md` (Lumen #86820254 URL listesi operatörde, tablo boş).
