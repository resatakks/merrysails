# INDEX AUDIT — MerrySails (2026-07-02)

> ⚠️ **STALE (GSC raporu 3 Tem'de düzeldi)** — bu audit 12 Haz–2 Tem donuk-rapor penceresinde alındı; GSC Page-Indexing (Sayfalar) raporu bu pencerede 11 Haz verisinde DONUKTU. Aggregate sınıf sayıları (404/CNI/Discovered vb.) stale-şüpheli → taze (29 Haz+) veriyle re-count. URL-bazlı Inspection-API satırları canlı veriydi, GEÇERLİ. (işaret: 2026-07-05 · dosya SİLİNMEZ)

**Property:** `sc-domain:merrysails.com` · **Yöntem:** GSC Sitemaps API + URL Inspection API (10 URL) + canlı HTML JSON-LD denetimi (4 money page)
**Token durumu:** ✅ merkezi OAuth (`/Users/resat/mcp-gsc/token.json`) ÇALIŞIYOR — kuyruktaki "token revoked" notu güncel değil, API inspect yeniden aktif.

---

## 1) Sitemap sağlığı — ✅ SAĞLIKLI

| Sitemap | Son indirme | Pending | Errors | Warnings | Submitted |
|---|---|---|---|---|---|
| https://merrysails.com/sitemap.xml | **2026-07-02 01:27 UTC (bugün)** | Hayır | 0 | 0 | 398 web + 196 image |

**NET CEVAP:** Sitemap taranıyor — Google bugün gece indirmiş, sıfır hata, sıfır uyarı. Son submit 2026-06-27. `indexed` alanı API'de artık doldurulmuyor (0 görünmesi gerçek index sayısı DEĞİL — index durumu aşağıdaki Inspection sonuçlarından okunur).

---

## 2) URL × Coverage × Rich Results (Inspection API, 10/10 kuyruk URL'si)

| # | URL | Coverage | Verdict | Son crawl | Canonical farkı | Rich results |
|---|---|---|---|---|---|---|
| 1 | /bosphorus-cruise | ✅ Submitted and indexed | PASS | 06-26 | yok | ✅ PASS (Product+Breadcrumb+Review) |
| 2 | /istanbul-dinner-cruise | ✅ Submitted and indexed | PASS | 06-19 | yok | ❌ **FAIL — 4× Review `itemReviewed` geçersiz tip** |
| 3 | /yacht-charter-istanbul | ✅ Submitted and indexed | PASS | 06-24 | yok | ❌ **FAIL — 4× Review `itemReviewed` geçersiz tip** |
| 4 | /cruises/bosphorus-sunset-cruise | ✅ Submitted and indexed | PASS | 06-26 | yok | ❌ **FAIL — 4× Review `itemReviewed` geçersiz tip** |
| 5 | /blog/bosphorus-cruise-vs-ferry-istanbul-2026 | ✅ Submitted and indexed | PASS | 06-24 | yok | ✅ PASS (Breadcrumb) |
| 6 | /blog/best-bosphorus-sunset-cruise-istanbul-2026 | ⚠️ **Crawled — currently not indexed** | NEUTRAL | 06-27 | yok | — |
| 7 | /tr/bosphorus-cruise | ✅ Submitted and indexed | PASS | **05-13 (50 gün eski!)** | yok | ✅ PASS |
| 8 | /de/istanbul-dinner-cruise | ✅ Submitted and indexed | PASS | 06-26 | yok | ❌ **FAIL — 4× Review `itemReviewed` geçersiz tip** |
| 9 | /yacht-charter-istanbul/premium-yacht-15 | ✅ Submitted and indexed | PASS | 06-21 | yok | ⚠️ WARNING — Product `review` + `aggregateRating` eksik |
| 10 | /reservation | ➖ Excluded by 'noindex' | NEUTRAL | 04-19 | user→homepage, google→self | — (transactional, beklenen davranış) |

**Skor: 8/10 INDEXED · 1 doğrulanmış-unindexed (blog listicle) · 1 noindex (doğru).** Hiçbir URL'de canonical çatışması yok, robots hepsi ALLOWED, fetch hepsi SUCCESSFUL. `/reservation`'da user-canonical homepage'i gösterirken noindex var — karışık sinyal ama transactional sayfada zararsız (Google kendi self-canonical seçmiş), aksiyon gerekmez.

---

## 3) Rich results derin denetim (canlı HTML JSON-LD — 4 money page)

### ❌ P0 — Tek kök neden, 4 money page'de rich-results FAIL:
Standalone `Review` blokları `itemReviewed.@type: "Service"` kullanıyor. **`Service` Google'ın review snippet için kabul ettiği itemReviewed tipleri arasında YOK** (geçerli: Product, Event, LocalBusiness, Organization, HowTo, Recipe vb.). Sayfa başına 4 Review bloğu → 4'ü de `ERROR: Invalid object type for field "itemReviewed"`.

Örnek (canlı /istanbul-dinner-cruise):
```json
{"@type":"Review","itemReviewed":{"@type":"Service","name":"Bosphorus Dinner Cruise"}, ...}
```

**Etkilenen sayfalar (API + canlı HTML birebir teyitli):**
- /istanbul-dinner-cruise (4×)
- /de/istanbul-dinner-cruise (4× — aynı paylaşılan komponent)
- /yacht-charter-istanbul (4×)
- /cruises/bosphorus-sunset-cruise (4×)

**Fix (schema-only, title/meta/h1 DEĞİL — Bing suppression riski yok):** Review'ları standalone bırakmak yerine sayfanın mevcut ana entity'sine bağla: dinner/sunset sayfalarında `Event`'e (`itemReviewed: {"@type":"Event","@id":...}` veya Event içine `review` property), yacht/bosphorus'ta `Product`'a. `/bosphorus-cruise` bu yüzden PASS — orada Review'lar doğru bağlı; o pattern'i 4 sayfaya kopyala. Tek komponent kaynaklı görünüyor → tek fix, 4 sayfa düzelir.

### ⚠️ P2 — /yacht-charter-istanbul/premium-yacht-15:
Product snippet'te `review` + `aggregateRating` eksik (WARNING, error değil). Gerçek (first-party) review + rating eklenirse yıldızlı snippet açılır.

### ✅ Temiz çıkanlar (r-sınıfı kontroller):
- **r28** (Offer priceCurrency var price yok): temiz — tüm Product offer'larında price mevcut.
- **r26** (datePublished/dateModified Organization-subtype'ta): temiz.
- **FAQPage**: 4 sayfada da geçerli yapı (Question + acceptedAnswer tam).
- **LocalBusiness/TravelAgency/Restaurant address**: hepsinde mevcut.
- JSON parse hatası yok (15-22 blok/sayfa — blok sayısı yüksek ama geçerli).

---

## 4) DMCA durumu (submit-denylist)

- Notice: **Lumen #86820254**, şikayetçi **bosphorussunset.com** (AST Tourism, TÜRSAB A-805), tarih ~2026-05-25. Kaynak: `data/cruise-deep/2026-06-16/COMPETITOR-INTEL.md`, `data/cruise-deep/TREND.md`.
- Şikayete konu **tam URL listesi repo'da YOK**; Lumen sayfası bot-challenge (Anubis) arkasında, API ile çekilemedi → operatör browser'dan açıp URL'leri `data/ops/submit-denylist.md`'ye eklemeli + GSC UI → Kaldırmalar → "Yasal sorunlar nedeniyle kaldırılanlar" panelini kontrol etmeli.
- Bugün inspect edilen 10 URL'nin hiçbirinde legal-removal izi yok (hepsi normal coverage state). TREND.md tespiti: "DMCA was a blip" — pozisyon şikayet sonrasında da iyileşmiş.
- **Kural aktif:** `data/ops/submit-denylist.md` oluşturuldu — DMCA'lı URL'ler IndexNow/Yandex/Bing auto-submit'e ASLA girmez. Auto-submit script'leri bu dosyayı kontrol etmeli.

---

## 5) Öncelikli FIX listesi

1. **[P0 · schema] Review `itemReviewed: Service` → geçerli tip** (Event/Product `@id` bağla). 4 money page'in rich-results FAIL'ini tek komponent fix'iyle temizler. `/bosphorus-cruise`'daki PASS pattern'i referans.
2. **[P1 · index] /blog/best-bosphorus-sunset-cruise-istanbul-2026** = doğrulanmış "Crawled — currently not indexed" (AI-citation listicle pilotu). Internal link güçlendir (sunset money page + ilgili bloglardan) → operatör manuel Request-Index (bugünün tek adayı).
3. **[P1 · crawl] /tr/bosphorus-cruise son crawl 13 Mayıs (50 gün)** — TR money page (6600/mo hedef) bayat. IndexNow/Yandex Reindex push'una devam + TR sayfalara internal link akışı artır. Title/meta değişikliği YOK (Bing suppression week-3).
4. **[P1 · ops] DMCA denylist'i doldur** — operatör Lumen #86820254'ü browser'dan açsın + GSC Kaldırmalar>Yasal panelini kontrol etsin; URL'ler `submit-denylist.md`'ye. Auto-submit script'lerine denylist filtresi ekle.
5. **[P2 · schema] premium-yacht-15 Product'a gerçek review + aggregateRating** — WARNING giderme, yıldızlı snippet.

**Yapılmayacaklar:** title/meta/h1 değişikliği (Bing suppression week-3 — MS zaten 9 Haziran'dan beri Bing'de 0 impression, churn'ü tetikleme). Kod değişiklikleri bu audit'te YAPILMADI — sadece rapor.
