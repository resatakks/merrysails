# Fix-Verify Queue (MerrySails)
**Son güncelleme:** 2026-07-05

> GSC "Sayfalar / neden dizine eklenmiyor" sınıf-raporu API'de yok (UI-only) → A1 sınıf-delta operatör UI'sinden. Rich-results + coverage tek-URL doğrulaması Inspection API ile CANLI (merkezi token).

## AÇIK (fix bekliyor / verify bekliyor)

### FV-1 · [P0 · KÖK-NEDEN BULUNDU + KOD FIX 2026-07-05 · deploy bekliyor] /reservation dead-click re-spike
- **Kaynak:** Clarity 3g (07-02→07-04): **11/17 session dead-click = %64.7 + 1 rage** (07-02 ölçümü %33 idi — "iyileşme" noise çıktı).
- **Element verisi (Clarity, dead-click sayısı):** whitespace/boşluk **1.480**, **"Change" butonu 155**, month-label "Julio de 2026" 98 + "July 2026" 18, "2Guests" 52, maskeli alan "•••••" 48, takvim günü "31" 20.
- **DEPLOY-GAP VERDICT (2026-07-05): GAP YOK.** Canlı bundle'da (`dpl_D6zt4oZ…`) `planner-calendar-grid")?.scrollIntoView({behavior:"smooth"` birebir mevcut = 0259ab1 canlıda; prod HTML'de `905448989812` (4f23b43, HEAD-7) mevcut; 4f23b43..HEAD arası sadece backend/cron/parser (planner'a dokunan 0 commit). Dead-click'ler canlıdaki (=HEAD) kodun kendi bug'ları.
- **BUG 1 — ay navigasyonu kilidi (month-label 116 + chevron dead'lerin kökü):** `PlannerDateCalendar.tsx` render-time kuralı `currentMonth = selectedDate'in ayı (navigationMonth farklıysa)` + `CoreBookingPlanner` her zaman yarını pre-select ediyor → prev/next chevron VE month-label butonu her tıkta seçili aya geri çakılıyordu; DOM değişmiyor = dead click, **Ağustos'a geçmek imkânsızdı** (satır kökeni: 3511f4c). Fix: snap sadece selection DEĞİŞTİĞİNDE (render-phase adjustment pattern), `currentMonth = navigationMonth ?? selectedDate ?? today`.
- **BUG 2 — "Change" butonu görünmez no-op (155 dead):** onClick bağlıydı ama tek işi grid'e `scrollIntoView` — grid butonun hemen ÜSTÜNDE, neredeyse her zaman ekranda → sıfır scroll, sıfır DOM değişimi = dead click (0259ab1'in fix'i kendisi dead-click üretiyordu). Fix: scroll korunur + takvim yüzeyinde 1.6s ring pulse (her tıka görünür yanıt).
- **PayTR overlay hipotezi ÇÜRÜDÜ:** repo'da PayTR entegrasyonu YOK (grep 0 hit); /reservation'da iframe yok (tek iframe /reservation/[id] PDF modal'ı, z-[100] doğru katmanlı). Maskeli "•••••" 48 = Balanced masking'in sayı içeren planner yüzeyi (fiyatlı grid konteyneri — disabled hücreler pointer-events-none, tık konteynere düşüyor) olma ihtimali yüksek; overlay/z-index bug'ı YOK, deploy sonrası izle.
- **Fix commit:** `PlannerDateCalendar.tsx` — tsc + build PASS, push YOK, deploy bekliyor (session-sonu kuralı).
- **Verify:** ✘ deploy sonrası — hedef: session-dead **<15%**, "Change" dead **→~0**, month-label dead **→~0** (artık ay ilerletiyor). 48'lik maskeli alan düşmezse ayrı ele al.

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
