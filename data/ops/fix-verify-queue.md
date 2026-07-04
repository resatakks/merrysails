# Fix-Verify Queue (MerrySails)
**Son güncelleme:** 2026-07-04

> GSC "Sayfalar / neden dizine eklenmiyor" sınıf-raporu API'de yok (UI-only) → A1 sınıf-delta operatör UI'sinden. Rich-results + coverage tek-URL doğrulaması Inspection API ile CANLI (merkezi token).

## AÇIK (fix bekliyor / verify bekliyor)

### FV-1 · [P0 · REOPEN 2026-07-04] /reservation dead-click re-spike
- **Kaynak:** Clarity 3g (07-02→07-04): **11/17 session dead-click = %64.7 + 1 rage** (07-02 ölçümü %33 idi — "iyileşme" noise çıktı).
- **Element verisi (Clarity, dead-click sayısı):** whitespace/boşluk **1.480**, **"Change" butonu 155** (fix'in eklediği selected-date "Change" cue tıklamaya cevap vermiyor görünüyor), month-label "Julio de 2026" 98 + "July 2026" 18, "2Guests" 52, **maskeli kart alanı "•••••" 48 (PayTR iframe overlay şüphesi)**, takvim günü "31" 20.
- **Fix durumu:** calendar fix commit'leri (0259ab1/f246b39/6c07e66) main'de AMA prod etkisi görünmüyor. YENİ HİPOTEZ: (a) deploy-gap (main deploy edilmedi) veya (b) "Change" click-handler kırık / event yutuluyor.
- **AKSIYON:** prod'da /reservation aç → "Change" + month-label + guests satırı gerçekten tepki veriyor mu test; `vercel ls` ile son deploy zamanı vs commit zamanı karşılaştır. Kart alanı 48 dead için PayTR iframe z-index/overlay kontrolü.
- **Verify:** ✘ REOPEN — hedef: session-dead <15%, "Change" dead-click →~0.

### FV-2 · [P1 · KOD PENDING] /istanbul-dinner-cruise dead-click
- **Kaynak:** Clarity. 07-01: 42.86% → 07-02: 16.67% → **07-04: %0 (3 sess, low-N)**.
- **Fix durumu:** ⏳ PENDING — breadcrumb'ı gerçek link + package-card title tıklanabilir. Kod fix'i hâlâ uygulanmadı; bugünkü %0 düşük örneklem, kapatmaya yetmez.
- **Verify:** ✘ bekliyor — kod fix + sürdürülebilir <5%.

### FV-3 · [P1] /bosphorus-cruise dead-click
- **Kaynak:** Clarity. 07-01: 23.08% → 07-02: 16.67% → **07-04: %0 (7 sess)**. İyileşme sinyali sürüyor.
- **Verify:** ⏳ 3 gün daha <5% kalırsa KAPAT.

### FV-4 · [R1 · SUPPRESSION · AÇIK week 4] Bing impression cliff → 0
- **Kaynak:** Canlı GetRankAndTrafficStats (2026-07-04) → impressions **0 HER GÜN 06-09 → 07-02** (Bing seriyi restate etti: son imp>0 artık 06-08/4imp görünüyor; önceki kayıt 06-10 idi). Veri ~2g lag.
- **Crawl/index sağlığı:** InIndex **470** ↑ (07-03), 5xx 0, robots-block 0, 4xx ~27 (minör). Deindex DEĞİL — klasik suppression (MerryTourism precedent).
- **Fix durumu:** RECOVERY PROTOCOL aktif — (1) title/meta/h1 FREEZE, (2) crawl-health temiz ✅, (3) SubmitUrlBatch (07-04: 12 URL 200) + IndexNow (Bing 200/Yandex 202) daily, (4) sabır: **week 4/6**.
- **Verify:** ✘ — imp hâlâ 0. Week 6 (~07-22) hâlâ 0 ise: Bing Site Scan + eskalasyon notu.

### FV-5 · [P0 · YENİ 2026-07-04 · B5 rich-results] 4 money page Review `itemReviewed` FAIL
- **Kaynak:** Inspection API richResultsResult (07-04): /istanbul-dinner-cruise (crawl 07-03 — TAZE crawl'da FAIL), /yacht-charter-istanbul (06-24), /cruises/bosphorus-sunset-cruise (06-26), /de/istanbul-dinner-cruise (06-26). Hata: `ERROR: Invalid object type for field "itemReviewed"` × 4'er adet.
- **Kök neden:** standalone `Review` blokları `itemReviewed: Service` (geçersiz tip) — tek paylaşılan komponent `src/components/ui/ReviewsCarousel.tsx`.
- **Fix planı (GROWTH-PLAN Hamle 1):** Review'ları sayfanın ana entity `@id`'sine bağla (dinner/sunset→Event, yacht→Product; `/bosphorus-cruise` PASS pattern'i). `["TouristTrip","Service"]` kuralı korunur. Schema-only = title FREEZE ihlali YOK.
- **Bonus:** premium-yacht-15 Product `review`/`aggregateRating` WARNING → sadece GERÇEK first-party review ile doldur (uydurma YASAK).
- **Verify:** ✘ — fix deploy sonrası Inspection API re-check (hedef FAIL 4→0, 14 gün).

## KAPANAN (son 30 gün)
- _henüz yok. FV-3 kapanmaya en yakın (3 gün stabil <5% bekleniyor)._
