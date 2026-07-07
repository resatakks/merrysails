# GSC URL Inspect — Priority Queue (MerrySails)
**Son güncelleme:** 2026-07-07 (Inspection API ile 29 URL doğrulandı — 0 unindexed) · **API kotası:** 2000/gün/property (bol) · **Manuel Request-Index kotası:** ~1-3/gün (kıt)

> **KURAL:** Google indexing stratejisi = güçlü internal link + sıfır teknik hata + geçerli rich results. Manuel Request-Index SADECE doğrulanmış-unindexed money page (max 1-3/gün). Index-durum doğrulaması Inspection API ile otomatik.

> ✅ **Merkezi token (`/Users/resat/mcp-gsc/token.json`) FULL çalışıyor:** inspection + search-analytics + sitemaps. (Not: `gsc-daily-snapshot.mjs` .env.local'daki bayat GSC_REFRESH_TOKEN'ı tercih ediyor → env-var precedence bug; merkezi token direkt kullanılmalı.)

## 🎯 Aktif kuyruk — SADECE doğrulanmış-unindexed
**Bugün YOK.** 29 money/priority URL Inspection API ile doğrulandı — **hepsi indexed** (0 unindexed). Manuel Request-Index kotası bugün harcanmadı.

## ⚑ A1 CRAWL-BUDGET UYARISI (2026-07-07 — gerçek Page-Indexing raporu, Chrome MCP)
Money-page örneklemi 22/22 indexed gösterirken **gerçek "Sayfalar neden dizine eklenmiyor" raporu** şunu ortaya çıkardı:
- **Tarandı - şu anda dizine eklenmiş değil: 1.553** (Başarısız)
- Keşfedildi - şu anda dizine eklenmiş değil: 82 (Başladı)
- Bulunamadı (404): 32 (Başarısız)
- "noindex" ile hariç: 5 · Yönlendirmeli: 14 (NR-9, hata değil) · alt-canonical: 0
- **Google indexed: 342** → %82 not-indexed oranı.

Bu, manuel Request-Index ile ÇÖZÜLMEZ (sistemik thin/crawl-budget). **Aksiyon: A8 dead-inventory audit öne çek** — 1.553'ün URL sınıf-kırılımı (locale varyantları / /guides / 114-post /blog / reservation query-param / event alt-sayfa) → noindex/410/sitemap-prune. Baseline daily-state.jsonl'e yazıldı, yarın delta izlenecek.

## 👁️ İzleme listesi (indexed ama sorunlu — manuel kota GEREKMEZ, deploy sonrası re-inspect)
| URL | Durum (2026-07-07) | İzleme sebebi |
|---|---|---|
| /istanbul-dinner-cruise | Indexed, **rich FAIL** (4× itemReviewed), crawl 07-03 | FV-5 — ReviewsCarousel.tsx fix sonrası re-inspect |
| /yacht-charter-istanbul | Indexed, **rich FAIL**, crawl 06-24 | FV-5 — fix sonrası re-inspect |
| /cruises/bosphorus-sunset-cruise | Indexed, **rich FAIL**, crawl 07-06 | FV-5 — fix sonrası re-inspect |
| /de/istanbul-dinner-cruise | Indexed, **rich FAIL**, crawl 06-26 | FV-5 — fix sonrası re-inspect |
| /tr/bosphorus-cruise | Indexed, rich PASS, **crawl 05-13 (55 gün donuk)** | "boğaz turu" 6.600/mo hedefi; push yetersiz → TR internal-link kod-denetimi gerekli |
| /bosphorus-cruise | Indexed, **rich PASS** (Product+Review+Breadcrumb), crawl 07-06 | Referans PASS pattern (FV-5 fix bunu kopyalayacak) |

## Kota notu
- Manuel Request-Index bugün gerekli: **0 URL**. Tüm manuel kota diğer markalara.
- Index doğrulama Inspection API ile (2000/gün) — manuel kota bu işe kullanılmaz.
- DMCA submit kuralı: `data/ops/submit-denylist.md` (Lumen #86820254 URL listesi operatörde).
