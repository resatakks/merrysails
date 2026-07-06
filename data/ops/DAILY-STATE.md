# MerrySails — DAILY OPS STATE
**Domain:** merrysails.com · **Vertical:** Tourism (Bosphorus cruise + yacht charter) · **Priority:** HIGH · **Ads:** Google Ads ON (~2K TRY/day)
**Karakter/Author byline:** Captain Ahmet (cruise/yacht) + Editorial (city guides) — NO cross-brand byline reuse with GoldenSunset
**Conversion truth:** `reservation_submit` (DB: `Reservation` table, MRY-* IDs)
**Rakipler:** GetYourGuide, Viator/TripAdvisor, bosphorustour.com; sister GoldenSunset (differentiation: tier + demographic)
**Son güncelleme:** 2026-07-06 (mode=weekly — coverage tam sweep + FV-1 verify-devam + listicle indexlendi)

---

## 📍 NEREDEYIZ — bugünkü snapshot (her run üstten güncellenir)
| Metrik | Bugün (2026-07-06) | 7g önce | 30g önce | Trend |
|---|---|---|---|---|
| **GSC clicks (7g, 06-27→07-03)** | **120** ✅ CANLI (merkezi token, sc-domain) | 130 (prev-7g 06-26→07-02) | – (property değişti, baseline reset) | ↓ -8% WoW (hafif, gürültü bandında) |
| GSC impressions (7g) | **12.390** | 12.346 | – | ↔ stabil |
| GSC avg position (07-03 günlük) | **7.9** | 8.0 (07-02) | – | ↔ stabil 7-8 bandı |
| **Bing impressions (canlı, ~2g lag)** | **0 (06-09→07-04 HARD ZERO, 28. gün — week 4 tamamlandı)** ⚠️ | 0 | 30-35/gün (erken Haz) | ⛔ SUPPRESSION week 4→5 — crawl temiz, 301-fix deploy edildi (301-fix landed 97fe9e3) |
| Bing clicks (canlı) | 0 | 0 | 1-2/gün | ⛔ |
| Top-3 keyword (7g örneklem) | ~5 (merrysails, bosphorus cruise from sultanahmet, bosporus sonnenuntergang…) | ~5 | ~0 | ↔ |
| Pos 4-20 striking-distance | **~20 sorgu** (fiyat-kümesi büyüdü: "istanbul bosphorus cruise prices 2026" pos 5.1, "bosphorus dinner cruise price 2026" pos 5.7, sunset 11.5/36imp, worth-it 5.1…) | 8 sorgu | – | ↑ genişledi (fiyat-intent kümesi yeni) |
| Indexed (Yandex searchable) | **337** | 336 (07-04) | – | ↑ +1 healthy |
| Indexed (Bing InIndex) | **476 (07-05)** | 470 (07-03) | – | ↑ RISING (5xx=0, robots-block=0, crawl issues=0) |
| GSC sitemap | lastDownloaded **07-06** ✅ 0 err/0 warn, 398 web+196 img | 07-03 | – | ✅ taze |
| GSC pages-errors (açık) | N/A (coverage report API'de yok — UI-only) | – | – | – |
| Clarity sessions (3g) | **178** | 150 (07-04) | – | ↑ |
| Dead-click % (site 3g) | **13.48%** ✅ | 18.54% (07-04) | 13.14% (06-01 baseline) | ↓ **İYİLEŞTİ (R7 fix etkisi görünüyor)** |
| Rage-click % (site 3g) | 0% | 0.66% (07-04) | ~8% /rez (07-01) | ✅ düşük |
| Dead-click (/reservation, session-bazlı) | **%34.78 (23 sess)** ⚠️ + 0 rage | 64.7% (07-04/05) | 58.33% (07-01) | ↓ **büyük iyileşme ama hedef <15%'e henüz değil (FV-1 verify devam)** |
| LCP (site avg, Clarity 3g) | N/A (bu run'da ayrı çekilmedi, dünkü 2.330ms ✅ baz alınabilir) | 2.330 ms | – | – |
| JS errors (Clarity) | %0 ✅ | 0 | 0 | ✅ |
| GA4 conversions (7g) | N/A (OAuth missing — operatör) | – | – | – |
| Ads spend / conv (7g) | N/A (OAuth; 🔒 operatör alanı) | – | – | – |
| **Rezervasyon/lead (7g, DB)** | **20** (17 aktif + 3 iptal, %15 iptal) · ~€2.860 brüt / ~€2.506 iptalsiz | 21 (13 aktif+8 iptal, %38 iptal) | 8 (prev-prev) | ↔ stabil hacim, **iptal oranı belirgin düştü** |
| AI referral (ChatGPT, 3g) | **7 sess** | 25 (07-04) | 28 (07-01) | ↓ düştü (Gemini 1 sess yeni göründü) |
| AI-visibility mention % | N/A (weekly, due 07-08) | – | – | – |
| **Rich-results FAIL (money pages)** | **4 sayfa FAIL** (Review itemReviewed) — bugün API'yle 3. gün üst üste teyit | 4 (07-04) | – | ⛔ fix kodda HÂLÂ YOK (P0, 3 gündür açık) |

**Rezervasyon dağılımı (7g, DB):** 20 rez · sunset-cruise 8 (1 iptal), yacht-charter 5 (2 iptal, €220-396), private-istanbul-tour 2 (€760+€350 confirmed 💰), dinner 1. gclid=Y sadece 1. İptal oranı %15 (dünkü %38'den belirgin düşüş — sunset'teki 06-27/28 iptal kümesi geride kaldı).
**Trafik kaynağı (Clarity 3g):** www.google.com 80, chatgpt.com 7, gemini.google.com 1 (yeni), diğer 3. Cihaz: Mobile 126 / PC 52 (~%71 mobil, brand-profile beklentisiyle uyumlu).
**B7 intent-mix (7g page-level GSC):** informational impr %67.3 / click %43.0 — commercial impr %32.7 / click %57.0. Commercial sayfalar impression-başına çok daha yüksek CTR üretiyor; intent-bridge (vs-ferry CTA) işi meyve veriyor sinyali.
**B10 Google Trends (TR):** "bosphorus sunset cruise" 12ay-avg 2 → son-4hf-avg **30** (peak hafta 06-21→27) — GSC'deki sunset striking-distance büyümesini (11.5pos/36impr) doğruluyor, gerçek sezonsal talep artışı. "bosphorus cruise" 63→70 (+11% MoM). "MerrySails"/"istanbul dinner cruise" trend verisi BLOCKED (Google Trends API kısıtı, marka-adı sorgularında sık görülür).
**A7 KAZANIM:** `/blog/best-bosphorus-sunset-cruise-istanbul-2026` artık **INDEXED** (crawl bugün 07-06 11:38) — dünkü tek manuel Request-Index adayı doğal olarak kapandı, bugün manuel kota kullanılmadı.
**E7-light güvenlik spot-check:** security headers TAM (HSTS/CSP/X-Frame-Options/X-Content-Type-Options/Referrer-Policy/Permissions-Policy hepsi canlı), `.env`/`.env.local` git'te değil, `$queryRawUnsafe` kullanımı YOK (sadece Prisma generated type tanımlarında görünüyor, gerçek çağrı yok), `/admin` 307 redirect (auth guard aktif görünüyor). Kritik bulgu yok.
**Repo notu:** çalışma branch'i `feat/yacht-product-redesign` (main'e `1135d0c` ile merge edilmiş, FV-1 + Bing-301 fix'leri dahil, Vercel prod ~23-24 saat önce deploy). Branch'te ayrıca başka bir session'ın elle yaptığı uncommitted değişiklikler var (StickyMobileCta eklemeleri `corporate-events`/`proposal-yacht-rental-istanbul` sayfalarına, `BookingSidebar.tsx`'e `priceMode` alanı) — bu ajan tarafından yapılmadı, dokunulmadı, sadece not düşüldü.

## 🎯 AÇIK FIRSATLAR (öncelik sırası)
1. **[P0 · B5 rich-results, 3. GÜN AÇIK — öncelik yükseltildi] 4 money page Review `itemReviewed` FAIL — kod fix HÂLÂ yazılmadı.** 3 gün üst üste (07-04/05/06) aynı sonuç: /istanbul-dinner-cruise, /yacht-charter-istanbul, /cruises/bosphorus-sunset-cruise, /de/istanbul-dinner-cruise. Kaynak komponent: `src/components/ui/ReviewsCarousel.tsx`. `/bosphorus-cruise` PASS pattern'ine bağla (Event/Product `@id`). Schema-only = suppression-safe. FV-1 ve Bing-301 fix'leri bu pencerede deploy edildi ama ReviewsCarousel'a dokunulmadı — bu artık en eski açık P0.
2. **[P0 · FV-1 VERIFY DEVAM EDİYOR] /reservation dead-click %64.7→%34.78 — büyük iyileşme, hedef henüz değil.** Site-geneli dead-click de %18.54→%13.48 düştü — fix'in prod'da çalıştığı sinyali güçlü. Ama /reservation için hedef <15%, mevcut %34.78 hâlâ ~2.3× üstünde. Yarın element-bazlı kırılım (Change/month-label spesifik) çekilip kalan dead-click'in kaynağı netleştirilmeli.
3. **[R1 SUPPRESSION — AÇIK, week 4 tamamlandı → week 5] Bing impressions HARD-ZERO, veri artık 06-09→07-04'e kadar 0** (28. gün). Crawl+index SAĞLIKLI ve BÜYÜYOR (InIndex 476 ↑, Yandex 337 ↑, crawl issues 0). Recovery protokolü sürüyor: title/meta/h1 FREEZE + IndexNow/SubmitUrlBatch daily (bugün 14 URL 200/202). ETA penceresi 07-07→08-04 içinde kalıyor, henüz eskalasyon eşiği (week 6) değil.
4. **[P1 TR — kırık crawl] /tr/bosphorus-cruise crawl HÂLÂ 05-13 (54 gün, 2 gündür sabit)** — internal-link + push tavsiyesine rağmen Google recrawl hiç gelmedi. TR dinner kw "akşam yemekli boğaz turu" hâlâ zayıf (37.8 pos civarı). Bu artık sadece push ile çözülmüyor gibi görünüyor — TR sayfaya giden internal-link sayısı/konumu somut olarak denetlenmeli (kod-tarafı iş, sadece push değil).
5. **[P1 INTENT-BRIDGE — büyüyen fırsat] Fiyat-intent keyword kümesi genişliyor:** "istanbul bosphorus cruise prices 2026" pos 5.1/14impr, "bosphorus dinner cruise price 2026" pos 5.7/11impr, "bosphorus cruise price" pos 12.1/15impr — hepsi `/bosphorus-cruise-prices-2026` ve `/bosphorus-cruise-prices-istanbul-2026` sayfalarına gidiyor (1285 impr ve 801 impr ile GSC'de 2. ve 3. en yüksek-impression sayfalar, ama click sırasıyla sadece 2 ve 1). CTR açığı büyük — bu sayfalara transactional CTA/answer-block eklenmesi vs-ferry pattern'i tekrarlayabilir (GROWTH-PLAN Hamle 2 mantığı fiyat-sayfalarına da uygulanabilir, YENİ aday).
6. **[P2 B10 sezon-hazırlık] "bosphorus sunset cruise" Trends %2→%30 (12ay-avg→son4hf) + GSC striking-distance büyüyor.** Sezon zaten içindeyiz (May-Eki) — bu içerik-fırsatı, Ads DEĞİL: sunset money page'in body/answer-block'u güçlendirilebilir, mevcut FV-5 fix'i bu sayfayı da kapsıyor zaten.
7. **[P2 D5] /cruises/bosphorus-sunset-cruise dead-click dalgalı (%0↔%40, düşük-N)** — FV-3'te izleniyor, session-N netleşmeden karar verilmeyecek.
8. **[P2 A5] Yandex NOT_IN_SPRAV** — Yandex Business kaydı (operatör, tek açık Yandex recommendation, değişmedi).

## ⚠️ AÇIK SORUNLAR / FIX-VERIFY
- **[R1 SUPPRESSION — AÇIK week 4]** bkz. Fırsat #2. `fix-verify-queue.md` FV-4. Sayaç: SUPPRESSION-WATCH.md güncellendi (06-09 başlangıç, veri 07-02'ye kadar 24 gün, bugün ~26. gün).
- **[FV-1 KOD FIX LANDED 2026-07-05 — deploy bekliyor]** /reservation dead %64.7 kök-nedeni bulundu: **deploy-gap DEĞİL** (canlı bundle = HEAD planner kodu, kanıt fix-verify'da). 2 gerçek bug fix'lendi (`PlannerDateCalendar.tsx`): (1) ay navigasyonu seçili aya kilitleniyordu — month-label/chevron dead'lerin kökü, sonraki aya geçiş imkânsızdı; (2) "Change" butonu scrollIntoView no-op'tu → görünür pulse eklendi. PayTR overlay hipotezi çürüdü (repo'da PayTR yok). Deploy sonrası verify: session-dead <15% + "Change" ~0.
- **[FV-5 YENİ — P0]** 4 money page rich-results FAIL (Review itemReviewed) — kod fix'i bekliyor (`ReviewsCarousel.tsx`).
- **[OAuth]** GA4 (missing token) + Google Ads (`unauthorized_client`) hâlâ bloke → D2/D8 N/A. **GSC artık merkezi token'la ÇALIŞIYOR** (revoked olan repo-lokal script credential'ıydı) — operatör GSC OAuth yenilemesi artık P2'ye düştü; GA4 yenileme hâlâ P1.

## 🔍 SANA İŞ DÜŞEN (operator action)
- **Manuel Request-Index (1 URL):** `/blog/best-bosphorus-sunset-cruise-istanbul-2026` (tek doğrulanmış-unindexed; önce internal-link işi bitsin istersen yarına sarkabilir).
- **GA4 OAuth yenile:** `node scripts/ga4-merrysails-oauth.mjs auth-url` (D2/D8/D11-GA4 için tek eksik). Ads OAuth istersen — Ads zaten operatör alanı.
- **Yandex Business kaydı** (NOT_IN_SPRAV) — yandex.com/business, ~10 dk.
- **Bing:** aksiyon YOK — title FREEZE + sabır (week 4/6).
- **Lumen #86820254 URL listesi** hâlâ bekliyor (submit-denylist.md operatör adımları).

## 🗓️ WEEKLY/MONTHLY due-tracker
| Kontrol | Son | Next due | Durum |
|---|---|---|---|
| B3 rank sweep | 06-25 (rank-history) | 2026-07-08 | scheduled |
| B4 cannibalization | **07-06 (bugün, kısmi)** | 2026-07-13 | ✅ yapıldı — bkz. günlük log; sunset-terim çakışması flag edildi (aksiyon değil, gözlem) |
| C1 AI-visibility (lbm) | – | 2026-07-08 | ⛔ **N/A(oauth) — lbm token 401 UNAUTHORIZED, reconnect gerekiyor** |
| D6 rakip turu | – | 2026-07-13 | scheduled (bugün yapılmadı, kapasite darboğazı) |
| A8 dead-inventory | – | 2026-07-13 | scheduled |
| A11 suppression-recovery review | **07-06 (bugün)** | 2026-07-13 | ✅ yapıldı — crawl-health temiz teyit + FREEZE uyumu + sayaç güncellendi (28. gün) |
| B9 serpstat audit | **07-06 (denendi)** | 2026-07-13 | ⛔ **N/A(plan-locked) — "Api not allowed for your plan" (code 32011), bilinen tekrarlayan kısıt** |
| D9-deep (PageSpeed) | **07-06 (denendi)** | 2026-07-07 (yarın tekrar) | ⛔ **N/A(quota-exceeded) — PagespeedOnline API günlük kota portfolio-genelinde tükenmiş**; Clarity 3g baseline (07-04: LCP 2.330ms) kullanılabilir proxy |
| D12 GTM container sağlığı | **07-06 (bugün)** | 2026-07-13 | ✅ yapıldı — MerrySails kendi GTM'i yok, sister-brand (Merry Tourism GTM-MWVS696K) ID'si hard-blocked set ile engelleniyor (cross-contamination guard, SAĞLIKLI); Consent Mode v2 default=granted doğru; GA4/Ads direct-gtag |
| D13 görsel performans | **07-06 (bugün)** | 2026-07-13 | ✅ yapıldı — 0 raw `<img>` (tümü next/image), `max-image-preview:large` yaygın, 15 dosyada `priority` kullanımı. Temiz. |
| E7-full güvenlik (derin) | **07-06 (bugün, tamamlandı)** | 2026-07-13 | ⚠️ **P0 bulgu** — `npm audit --audit-level=high`: **4 HIGH** (Next.js 8× CVE: XSS beforeInteractive script, middleware/proxy bypass ×3, cache poisoning, DoS ×2, SSRF; **nodemailer** CRLF header injection + disableFileAccess/disableUrlAccess bypass + TLS cert validation + SSRF) + 6 moderate + 1 low (qs DoS). Fix mevcut (`npm audit fix`), **breaking change riski DÜŞÜK** (next `^16.2.4`→patch, nodemailer `^8.0.5`→patch, major bump değil). Aksiyon almadım (kod-değişikliği + build + deploy gerektiriyor, bugünkü rapor kapsamı dışı) — ayrı odaklı session'a flag edildi. nodemailer email-akışında AKTİF KULLANIMDA (post-booking confirmation) — öncelik yüksek. |
| E3 backlink audit | 05-02 (disavow) | 2026-08-01 | scheduled |
| C3 isitagentready + C4 AI-bot erişim | – | 2026-08-01 | scheduled |

---

## 📅 GÜNLÜK LOG (append-only, son 30 gün tutulur)

### 2026-07-06 (mode=weekly — coverage tam sweep)
- **Coverage:** tüm DAILY hücreler DONE/N/A(sebep). WEEKLY ek maddeler de bu run'da işlendi (B4 kısmi, C1 blocked, B9 blocked, D9-deep blocked, D12 done, D13 done, E7-full done+P0 bulgu, A11 done).
- **B1 (CANLI, 06-27→07-03):** 120 click / 12.390 impr / pos 7.9 → prev-7g (06-26→07-02) 130c/12.346i = hafif -8% click (gürültü bandında, alarm değil). Günlük 07-03: 15c/1.795i pos 7.9.
- **B2 striking-distance genişledi:** fiyat-intent kümesi yeni öne çıktı — "istanbul bosphorus cruise prices 2026" pos 5.1/14impr, "bosphorus dinner cruise price 2026" pos 5.7/11impr, "bosphorus cruise price" pos 12.1/15impr (hepsi `/bosphorus-cruise-prices-2026` + `/bosphorus-cruise-prices-istanbul-2026`'ya gidiyor — 1285+801 impr ile 2./3. en yüksek-impression sayfa ama click sadece 2+1, büyük CTR açığı). "is bosphorus cruise worth it" pos 5.1/8impr aktif. Sunset 11.5pos/36impr.
- **B5 rich-results (Inspection API, 5 URL re-check):** 4 money page **FAIL SÜRÜYOR** — 3. gün üst üste (07-04/05/06) aynı `Invalid object type for field "itemReviewed"` hatası, kod fix hâlâ yazılmadı. `/bosphorus-cruise` PASS teyitli (referans pattern). FV-5 önceliği yükseltildi (en eski açık P0).
- **A3 sitemap:** GSC lastDownloaded 07-06 (taze ✅), 0 error/0 warning, 398 web + 196 image. Sözleşme ihlali yok.
- **A4/A5/A6 auto-submit (helper, 14 priority URL):** IndexNow Bing 200 + Yandex 202; Bing SubmitUrlBatch 200 (submitted 14, daily_quota 90); Yandex recrawl 14/14 202 (quota_remainder 144/150). Denylist boş (Lumen listesi hâlâ operatörde) — filtreleme yapılmadı.
- **A7 inspect — BÜYÜK KAZANIM:** `/blog/best-bosphorus-sunset-cruise-istanbul-2026` **Crawled-not-indexed → Submitted and indexed** (crawl bugün 07-06 11:38, rich PASS). Dünkü tek manuel Request-Index adayı doğal yoldan kapandı — bugün manuel kota 0 kullanıldı. `/tr/bosphorus-cruise` HÂLÂ crawl 05-13'te donuk (54 gün, 2 gündür değişmedi) — sadece push yeterli gelmiyor gibi görünüyor, internal-link kod-tarafı denetim öneriliyor.
- **A10 index-rate:** Yandex searchable **337** (+1), Bing InIndex **476** (07-05, +6 vs 07-03). Crawl sağlığı: GetCrawlIssues 0, crawl 200-270 sayfa/gün aktif. **SUPPRESSION SAYACI:** Bing 0-seri 06-09→07-04 (veri artık 1 gün daha taze) — **28. gün, week 4 tamamlandı → week 5**. SUPPRESSION-WATCH güncellendi.
- **A11 suppression-recovery review (weekly, R1 açıkken):** crawl-health temiz teyit edildi (5xx 0, robots-block 0, crawl issues 0), title/meta/h1 FREEZE ihlali yok (git log'da churn izi yok), SubmitUrlBatch/IndexNow cadence sürüyor. ETA penceresi (07-07→08-04) içinde kalınıyor, eskalasyon eşiği (week 6, ~07-22) henüz gelmedi.
- **R-SENTINEL:** **R1 AÇIK (Bing week 4→5)** — carry-forward, teknik taraf temiz. **R7 İYİLEŞİYOR (kapanmadı):** site dead-click %18.54→%13.48 ✅; /reservation dead-click %64.7→%34.78 (büyük düşüş ama hedef <15%'in henüz altında değil — FV-1 "verify devam ediyor" durumunda, kapatılmadı). R2 TERS (click -8%, gürültü bandında, flag değil). R3 CLEAR (337/476 ↑). R4 CLEAR (20 rez, iptal oranı %38→%15 düştü). R5 N/A(coverage API yok). R6 N/A(Ads oauth).
- **D1/D5/D10 (Clarity 178 sess/3g):** site dead 13.48% ✅ / rage 0% ✅ / quickback 15.17% / JS-error %0 ✅. Cihaz: Mobile 126 / PC 52. URL-bazlı: /tr/istanbul-dinner-cruise ve /blog/bosphorus-cruise-vs-princes-islands-tour-istanbul-2026 %100 dead (düşük-N, tek-pageview noise ihtimali yüksek — izlemede ama alarm değil), /reservation %34.78 (FV-1), /bosphorus-cruise %40 (FV-3, dalgalı-düşük-N).
- **D9-light:** ayrı çekilmedi bu run'da (D9-deep PageSpeed kota-tükendi); dünkü LCP 2.330ms ✅ proxy olarak geçerli kabul edildi.
- **D11 AI-referral:** chatgpt.com **7 sess/3g** (dünkü 25'ten düşüş) + **gemini.google.com 1 sess (yeni referrer, ilk kez görüldü)**. Düşüş tek-günlük varyans olabilir, trend izlenecek.
- **D4 rez (DB):** 20/7g — 17 aktif + 3 iptal (%15 iptal — dünkü %38'den belirgin iyileşme, 06-27/28 sunset iptal kümesi geride kaldı). Gross ~€2.860 / iptalsiz ~€2.506. sunset 8, yacht-charter 5 (2 iptal), private-istanbul-tour 2×confirmed €1.110 💰, dinner 1. gclid=Y 1.
- **B7 intent-mix (page-level GSC):** informational impr %67.3 / click %43.0 vs commercial impr %32.7 / click %57.0 — commercial sayfalar impression-başına çok daha yüksek CTR (intent-bridge işi meyve veriyor sinyali).
- **B10 Google Trends (yeni bu hafta):** "bosphorus sunset cruise" TR 12ay-avg 2 → son-4hf-avg **30** (peak 06-21→27) — GSC sunset-striking-distance büyümesini doğruluyor, gerçek sezonsal talep. "bosphorus cruise" 63→70 (+11%). Marka-adı ve "istanbul dinner cruise" sorgusu BLOCKED (Trends API kısıtı).
- **B4 cannibalization (kısmi gözlem):** "sunset" GSC page-level taramasında MerrySails'te **9 farklı sunset-ilişkili sayfa** aktif, toplam ~745 impr/7g — GROWTH-PLAN'ın "sunset terimini Vesper'e bırak" kararıyla gerilim yaratıyor. Aksiyon alınmadı (mevcut sayfaları silmek/yönlendirmek büyük karar, sadece flag; GROWTH-PLAN'da zaten strateji var, operatör kararına bağlı).
- **C1 AI-visibility:** N/A(oauth) — lbm token 401 UNAUTHORIZED, reconnect gerekiyor.
- **B9 serpstat site-audit:** N/A(plan-locked) — "Api not allowed for your plan" (code 32011), bilinen tekrarlayan kısıt.
- **D9-deep PageSpeed:** N/A(quota-exceeded) — PagespeedOnline API günlük kota portfolio-genelinde tükenmiş.
- **D12 GTM container sağlığı:** MerrySails'in kendi GTM'i yok; sister-brand (Merry Tourism) GTM-MWVS696K ID'si koddaki hardened bir Set ile explicit blocklanmış (cross-contamination guard, SAĞLIKLI tasarım). Consent Mode v2 default=granted+wait_for_update:0 doğru (no cookie banner kuralına uyumlu). GA4/Ads direct-gtag, GTM sadece GA4 config'i devre dışı bırakarak duplicate pageview önlüyor.
- **D13 görsel performans:** 0 raw `<img>` (tamamı next/image), `max-image-preview:large` layout+blog genelinde uygulanmış, 15 dosyada `priority` kullanımı. Temiz, aksiyon gerekmiyor.
- **E7-full güvenlik (derin):** security headers tam (HSTS/CSP/X-Frame-Options/X-Content-Type-Options/Referrer-Policy/Permissions-Policy canlı doğrulandı), `.env`/`.env.local` git'te değil, `$queryRawUnsafe` kullanımı yok (sadece Prisma generated type tanımlarında), `/admin` 307 redirect (auth guard aktif), JWT-fallback-tarzı hardcoded secret yok. **`npm audit --audit-level=high`: 4 HIGH + 6 moderate + 1 low** (Next.js 8× CVE + nodemailer 4× CVE + qs) — **YENİ P0 (FV-6)**, fix mevcut düşük-risk ama bu run'da uygulanmadı (kod+deploy gerektiriyor, kapsam dışı), ayrı session'a flag edildi.
- **Repo notu:** `feat/yacht-product-redesign` branch main'e merge edilmiş (FV-1 + Bing-301 fix dahil), Vercel prod ~23-24s önce deploy. Branch'te başka bir session'ın uncommitted elle-değişiklikleri var (StickyMobileCta + priceMode) — bu ajan tarafından yapılmadı, dokunulmadı.
- **Sezon:** cruise penceresi (May-Eki) içindeyiz, sunset-Trends sinyali sezon-içi bir içerik-fırsatı olarak not edildi (Ads değil).

### 2026-07-05 (Bing recovery — deep-dive, 27. gün / week 4)
- **Bing recovery — 2026-07-05:** Son imp>0: **2026-06-08** (4 imp; restate teyit — canlı GetRankAndTrafficStats, veri 07-03'e kadar hard-zero). Crawl+index SAĞLIKLI: InIndex **472**↑, 2xx 457→515/21g, 5xx=0, robots-block=0, GetCrawlIssues=**0**.
- **AllOtherCodes 78→192/21g = merrytourism'dekiyle aynı 308 bookkeeping (hata değil):** www→apex + http→https platform 308 + next.config **80× `permanent:true`** (= Next.js 308 emit; canlı doğrulandı `/yacht-charter`, `/bosphorus-guide`, `/yacht-charter-istanbul/y1-6`). Yine de Bing tarafında explicit olsun diye 80 kural `statusCode:301`e çevrildi — title/meta/h1 FREEZE bozulmadı. tsc + izole build PASS. Deploy sonraki pencerede.
- **Sitemap sweep:** 398/398 URL **%100 200**.
- **Auto-submit (bugün):** 10 money page — Bing SubmitUrlBatch **200** (quota 90), IndexNow Bing **200** + Yandex **202**, Yandex recrawl **10×202**.
- **Operatör Bing UI:** Site Scan başlat/yenile. ETA: 2-6 hafta penceresi = 07-07→08-04; teknik taraf temiz, sabır fazı.

### 2026-07-05 (mode=fix, FV-1 P0 /reservation dead-click)
- **Deploy-gap verdict: GAP YOK.** Kanıt: canlı bundle chunk'ında `planner-calendar-grid")?.scrollIntoView({behavior:"smooth"` (0259ab1'in birebir onClick'i) + prod HTML'de `905448989812` (4f23b43); 4f23b43..HEAD = sadece cron/parser/email backend, planner'a dokunan 0 commit. Yani "Change" fix'i canlıdaydı — dead click'leri üreten canlı kodun kendisiydi.
- **BUG 1 (month lock):** `PlannerDateCalendar` render-time snap-back (`3511f4c` kökenli) + CoreBookingPlanner'ın yarın pre-select'i = ay navigasyonu (chevron + month-label butonu) kalıcı kilitli; `setNavigationMonth(Ağustos)` her render'da seçili aya geri eziliyordu → DOM değişimi 0 = month-label 116 dead + **Ağustos rezervasyonu görüntülenemiyordu** (gelir etkisi). Fix: snap sadece selection değişince; `currentMonth = navigationMonth ?? selectedDate ?? today`.
- **BUG 2 ("Change" no-op):** buton handler'ı bağlıydı ama grid zaten ekrandayken scrollIntoView görünür hiçbir şey yapmıyor → 155 dead. Fix: scroll + takvim yüzeyinde 1.6s brand-ring pulse (her tıka görünür yanıt, Clarity dead saymaz).
- **PayTR overlay hipotezi ÇÜRÜDÜ:** repo'da PayTR yok, /reservation'da iframe yok; maskeli "•••••" 48 muhtemelen fiyat içeren grid konteyneri (Balanced masking + disabled-cell pointer-events-none pass-through). Kod değişikliği gerekmedi — deploy sonrası izlenecek.
- **Build:** `npx tsc --noEmit` ✅ + `npm run build` ✅ (1204 static gen OK). Push YOK (kural). **Deploy sonrası verify: /reservation session-dead <15% + "Change" dead ~0 + month-label dead ~0.**
- Kapsam dışı bırakılanlar: ReviewsCarousel/schema (FV-5 ayrı chip), title/meta/h1 (FREEZE), PayTR entegrasyon mantığı.

### 2026-07-04 (mode=daily)
- **Coverage:** tüm DAILY hücreler DONE/N/A. **BÜYÜK UNBLOCK: GSC merkezi token (`/Users/resat/mcp-gsc/token.json`) search-analytics + sitemaps + inspection üçünü de açıyor** — B1/A3/A7 CANLI. sc-domain:merrysails.com property (eski "2c/38i" baseline URL-prefix'ti, kıyaslama yapılmaz).
- **B1 (CANLI):** 7g (06-26→07-02) 130 click / 12.346 impr / pos ~7.7 → prev-7g 87c/10.111i = **+49% click WoW.** Günlük 07-02: 21c/1.702i pos 8.0.
- **B2 striking:** "bosphorus sunset cruise" 11.6/31imp (sunset page), "is bosphorus cruise worth it" **4.7 + 1 click** (vs-ferry blog — GEO gold page-1'de), "sunset cruise price" 6.8, "best bosphorus sunset cruise*" 3.5-12.2 (companies listicle), "boat rental istanbul" 11/25, "best bosphorus boat tours 2026" 7.5. TR: "akşam yemekli boğaz turu" 20imp pos 37.8 (uzak, TR pillar zayıf).
- **B7 intent-mix:** informational-ağır sürüyor (~%65-70 impr guides/blog; commercial: sunset 36, boat-rental ~6, TR dinner 21). Bridge = Fırsat #4.
- **B5 rich-results (Inspection API):** 4 money page **FAIL sürüyor** (Review itemReviewed) — dinner 07-03 taze crawl'da bile FAIL = fix deploy edilmedi (kodda da yok, `ReviewsCarousel.tsx`). premium-yacht-15 PASS + Product review/aggregateRating WARNING. /tr/bosphorus-cruise rich PASS ama crawl 05-13 bayat. → FV-5 P0 açıldı.
- **A3 sitemap:** GSC lastDownloaded 07-03 (taze ✅), 0 error/0 warning, 398 web + 196 image submitted, pending değil. Sözleşme ihlali yok ("indexed:0" alanı deprecated, alarm değil).
- **A4/A5/A6 auto-submit (helper):** 12 priority URL → IndexNow Bing 200 + Yandex 202; Bing SubmitUrlBatch 200 (submitted 12, daily_quota 90); Yandex recrawl 12/12 202 (quota_remainder 144). Denylist tablosu hâlâ boş (Lumen listesi operatörde) — filtrelenecek URL yok.
- **A7 inspect (7 URL):** listicle Crawled-not-indexed (crawl 06-27, değişim yok) 🎯 manuel aday; /tr/bosphorus-cruise indexed ama crawl 05-13 (52g); 4 money FAIL (yukarıda); premium-yacht-15 PASS+warning.
- **A10 index-rate:** Yandex searchable **336** (+10), Bing InIndex **470** (07-03, +16 vs 06-23), Google proxy: sitemap 398 submitted. Crawl sağlığı: Bing 5xx 0, robots-block 0, 4xx ~27/272 (minör, izle). **SUPPRESSION SAYACI:** Bing 0-seri 06-09→07-02 (Bing 06-08'i 4 imp'e restate etti; önceki "son imp>0 06-10" kaydı revize) — SUPPRESSION-WATCH güncellendi, week 4.
- **R-SENTINEL:** **R1 AÇIK (Bing week 4)** — carry-forward. **R7 REOPEN: /reservation dead %33→%64.7 (11/17 sess) + 1 rage; site dead 11.21→18.54.** Kök-neden hipotezi: calendar-fix "Change" butonu 155 dead click üretiyor (handler kırık veya deploy-gap) + maskeli kart alanı 48 dead (PayTR iframe overlay). R2 TERS (+49% click), R3 CLEAR (336/470 ↑), R4 CLEAR (21 rez), R5 N/A(coverage API yok), R6 N/A(Ads oauth).
- **D1/D5/D10:** Clarity 150 sess/3g; site dead 18.54% ⚠ / rage 0.66% / quickback 12.6% / JS-error %0. Sayfa: /yacht-charter-istanbul 58 sess %6.9 ✅ (top sayfa), /cruises/bosphorus-sunset-cruise **%26 dead** (yeni bulgu), /reservation %64.7 sess-dead (FV-1 REOPEN + element listesi), /, /bosphorus-cruise, /istanbul-dinner-cruise %0-7 ✅.
- **D9-light:** LCP avg 2.330ms ✅ (<2.5s), page-load 3.36s. Flag yok.
- **D11 AI-referral:** chatgpt.com **25 sess/3g** (07-02'de 7 idi — geri yükseldi). Landing çoğunlukla yacht/cruise sayfaları (Clarity kaynak tablosu).
- **D4 rez (DB):** 21/7g — 13 aktif + 8 iptal (%38 iptal, çoğu sunset €68 bandı 06-27/28 kümesi). €3.699 brüt / €2.635 iptalsiz. private-istanbul-tour 2×confirmed €1.110 💰. gclid=Y 2.
- **D2/D8:** N/A (GA4 oauth_missing_token — operatör). **D3:** N/A (🔒 operatör alanı; oauth da yok).
- **Sezon:** cruise penceresi (May-Eki) İÇİNDEYİZ, proposal piki (Haz-Eyl) aktif — sezon-hazırlık maddesi gerekmiyor, mevcut fırsatlar zaten sezon-içi.

### 2026-07-02 (mode=daily)
- **Coverage:** DAILY hücreler DONE/N/A. GSC+GA4+Ads OAuth toplu revoke → A1/A2/B1/A7-live/D2/D3 canlı N/A. Baseline: GSC 06-14, index-health 06-25.
- **R-SENTINEL:** **R1 AÇIK (Bing suppression week 3)** — canlı GetRankAndTrafficStats: impressions=0 HER GÜN 06-11→06-30, crawl/index sağlıklı. Standing carry-forward. **R4 CLEAR (22 rez/7g, €3,920, +175% WoW vs prev-7g 8).** R3 CLEAR (Yandex 326, Bing InIndex 454 rising, 18/18 money 200). **R7 IMPROVED — /reservation rage 8.33%→0%, dead 58%→33%; site rage→0%, dead 13.14%→11.21%** (calendar fix 0259ab1 prod'a inmiş sinyali). R5/R6 N/A (GSC/Ads OAuth). R2: rez +175% (yukarı, flag değil).
- **D1/D5/D10 (Clarity 107 sess/3g):** site dead 11.21%, rage 0%. Sayfa: /reservation 33% dead 0% rage (18 sess, ↓↓), /istanbul-dinner-cruise 16.67% (↓ 43'ten), /bosphorus-cruise 16.67% (↓ 23'ten), /premium-yacht-15 33% (3 sess, low-N). 100%-dead sayfalar (/tr, /zh, /de sunset, voucher) = tek-pageview noise. JS-error /reservation = YOK (D10 temiz).
- **A4 IndexNow (auto-submit helper):** Bing 200, Yandex 202 — 3 money page (bosphorus-cruise, istanbul-dinner-cruise, yacht-charter-istanbul).
- **A5 Yandex:** recrawl 3 URL submitted_ok, quota_remainder 144/150. searchable 326 (baseline). 1 rec (NOT_IN_SPRAV).
- **A6 Bing:** SubmitUrlBatch 200, daily_quota 90. URL-inspection 18/18 site status OK, HttpStatus 0, crawled today. Canlı traffic-stats: impr=0 (R1).
- **B5 schema lint:** 0 error, 4 warning (zh reservation short-desc + external voucher/invoice internal-docs + galataport long-desc). Unchanged, non-blocking.
- **B7 intent-mix:** informational-ağır (blog vs-ferry baseline 283 impr, commercial ~0). Bridge önerisi Fırsat #3. GSC canlı doğrulama token bekliyor.
- **D3 Ads:** OAuth `unauthorized_client` → canlı spend/conv çekilemedi. N/A(oauth).
- **D4 rez:** 22/7g ✅ €3,920, +175% WoW. sunset dominant.
- **Deploy durumu:** Clarity rage→0% + dead düşüşü = calendar fix (0259ab1) prod'da aktif görünüyor (07-01'deki deploy-gap büyük ölçüde kapandı sinyali). 3-5 gün sonra final Clarity verify.

### 2026-07-01 (mode=daily, cold-start baseline)
- **Coverage:** DAILY hücreler DONE/N/A. GSC+GA4 OAuth revoked → B1/D2/A1/A2/A7 canlı N/A (baseline: GSC snapshot 06-14, index-health 06-25).
- **R-SENTINEL:** R4 CLEAR (24 rez/7g). R3 CLEAR (Yandex 326↔327, Bing InIndex 454 rising). **R1 AÇIK: Bing impression→0 suppression (06-09→06-22)** — standing anomaly. R7 FLAG: /reservation dead 58% + rage 8% (deploy-gap şüphesi).
- **D1/D5/D10 (Clarity 175 sess/3g):** site dead 13.14%. /reservation 58% dead+8% rage, /istanbul-dinner-cruise 43%, /bosphorus-cruise 23%. JS-error YOK.
- **A4 IndexNow:** 3 money page push HTTP 200.
- **A5 Yandex:** searchable 326, excluded 5, 1 rec (NOT_IN_SPRAV).
- **B5:** 0 error, 4 warning. **B7:** informational-ağır. **D3:** Clarity paid rows 0; Ads API çekilmedi. **D4:** 24/7g ✅.
- **Deploy:** calendar fix main'de (0259ab1), prod DOĞRULANMALI.
