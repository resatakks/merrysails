# GSC URL Inspect — Priority Queue (MerrySails)
**Son güncelleme:** 2026-07-04 (Inspection API ile 7 URL yeniden doğrulandı) · **API kotası:** 2000/gün/property (bol) · **Manuel Request-Index kotası:** ~1-3/gün (kıt — israf edilmez)

> **KURAL:** Google indexing stratejisi = güçlü internal link + sıfır teknik hata + geçerli rich results. Manuel Request-Index SADECE doğrulanmış-unindexed money page (max 1-3/gün). Index-durum doğrulaması Inspection API ile otomatik yapılır.

> ✅ **Merkezi token (`/Users/resat/mcp-gsc/token.json`) FULL çalışıyor (2026-07-04):** inspection + search-analytics + sitemaps üçü de. Repo-lokal GSC OAuth hâlâ revoked ama artık bloker değil.

## 🎯 Aktif kuyruk — SADECE doğrulanmış-unindexed

| # | URL | Coverage (API, 2026-07-04) | Aksiyon |
|---|-----|---------------------------|---------|
| 1 | https://merrysails.com/blog/best-bosphorus-sunset-cruise-istanbul-2026 | **Crawled — currently not indexed** (son crawl 06-27, 07-02'den beri değişim yok) | 🎯 **manuel Request-Index adayı (operatör)** — sunset money page + companies-blog'dan internal link güçlendirilince bas; AI-citation listicle pilotu |

Bugün başka doğrulanmış-unindexed URL YOK — manuel kota harcanmasın.

## 👁️ İzleme listesi (indexed ama sorunlu — manuel kota GEREKMEZ)

| URL | Durum (2026-07-04) | İzleme sebebi |
|---|---|---|
| /tr/bosphorus-cruise | Indexed, rich PASS, **crawl 05-13 (52 gün bayat)** | "boğaz turu" 6.600/mo hedef sayfası — Yandex/IndexNow push devam (bugün gitti); Google recrawl gelmiyor → TR internal-link akışı işi |
| /istanbul-dinner-cruise | Indexed, **rich FAIL** (4× Review itemReviewed), crawl **07-03** | FV-5: taze crawl'da bile FAIL = fix deploy edilmedi; schema fix sonrası re-inspect |
| /yacht-charter-istanbul | Indexed, **rich FAIL**, crawl 06-24 | FV-5 — fix sonrası re-inspect |
| /cruises/bosphorus-sunset-cruise | Indexed, **rich FAIL**, crawl 06-26 | FV-5 — fix sonrası re-inspect |
| /de/istanbul-dinner-cruise | Indexed, **rich FAIL**, crawl 06-26 | FV-5 — fix sonrası re-inspect |
| /yacht-charter-istanbul/premium-yacht-15 | Indexed, rich PASS + Product review/aggregateRating WARNING | Gerçek first-party review eklenince re-inspect |

## Kota notu
- Manuel Request-Index bugün gerekli: **1 URL** (yukarıdaki 🎯). Kalan manuel kota başka markaya/yarına.
- Index doğrulama Inspection API ile (2000/gün) — manuel inspect kotası bu işe KULLANILMAZ.
- Detaylı bulgular: `data/ops/INDEX-AUDIT-2026-07-02.md` · DMCA submit kuralı: `data/ops/submit-denylist.md`
