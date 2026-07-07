# MerrySails — DAILY OPS STATE
**Domain:** merrysails.com · **Vertical:** Tourism (Bosphorus cruise + yacht charter) · **Priority:** HIGH · **Ads:** Google Ads ON (~2K TRY/day)
**Karakter/Author byline:** Captain Ahmet (cruise/yacht) + Editorial (city guides) — NO cross-brand byline reuse with GoldenSunset
**Conversion truth:** `reservation_submit` (DB: `Reservation` table, MRY-* IDs)
**Rakipler:** GetYourGuide, Viator/TripAdvisor, bosphorustour.com; sister GoldenSunset (differentiation: tier + demographic)
**Son güncelleme:** 2026-07-07 (mode=daily — A1 gerçek Page-Indexing raporu Chrome ile çekildi → 1.553 crawled-not-indexed keşfedildi)

---

## 📍 NEREDEYIZ — bugünkü snapshot (her run üstten güncellenir)
| Metrik | Bugün (2026-07-07) | 7g önce | 30g önce | Trend |
|---|---|---|---|---|
| **GSC clicks (7g, 06-29→07-05)** | **112** ✅ CANLI (merkezi token) | 108 (prev-7g 06-22→06-28) | – | ↑ +3.7% WoW |
| GSC impressions (7g) | **12.188** | 11.332 | – | ↑ +7.6% WoW |
| GSC avg position (7g) | **7.7** | 8.1 | – | ↑ iyileşti (7-8 bandı) |
| **Google indexed (A1 gerçek UI)** | **342** | – (ilk ölçüm) | – | ⚑ baseline kuruldu |
| **Google NOT-indexed sınıfları (A1 gerçek UI — YENİ)** | **crawled-not-indexed 1.553 · discovered 82 · 404 32 · noindex 5 · redirect 14(NR-9) · alt-canonical 0** | – (ilk ölçüm) | – | ⛔ %82 not-indexed oranı → thin/crawl-budget audit |
| **Bing impressions (canlı, ~2g lag)** | **0 (06-09→07-05 HARD ZERO, 29. gün / week 5)** ⚠️ | 0 | 30-35/gün (erken Haz) | ⛔ SUPPRESSION week 5 — crawl temiz |
| Bing InIndex | **477 (07-05)** | 476 | – | ↑ RISING (5xx=0, robots-block=0, crawl issues=0) |
| Yandex searchable | **336** | 337 | – | ↔ -1 (gürültü) |
| GSC sitemap | lastDownloaded **07-06** ✅ 0 err/0 warn, 594 submitted (tek kayıt) | 07-06 | – | ✅ taze, tek canonical |
| **Rich-results FAIL (money pages)** | **4 sayfa FAIL** (Review itemReviewed) — **4. GÜN** API teyit | 4 | – | ⛔ fix kodda HÂLÂ YOK (P0, 4 gündür açık) |
| Clarity sessions (3g) | **173** | 178 | – | ↔ |
| Dead-click % (site 3g) | **11.56%** ✅ | 13.48% | 13.14% (06-01) | ↓ **İYİLEŞMEYE DEVAM** |
| Rage-click % (site 3g) | **0%** ✅ | 0% | ~8%/rez (07-01) | ✅ düşük |
| Dead-click (/reservation, session-bazlı) | **%52.63 (19 sess)** ⚠️ + 0 rage | 34.78% (07-06) | 58.33% (07-01) | ⛔ **YÜKSELDİ — FV-1 çözülmüyor (kök-neden kaydı)** |
| JS errors (Clarity) | **%0** ✅ | 0 | 0 | ✅ |
| LCP (site avg) | N/A (bu run çekilmedi; 2.330ms proxy geçerli) | 2.330 ms | – | – |
| GA4 conversions (7g) | N/A (OAuth missing — operatör) | – | – | – |
| Ads spend / conv (7g) | N/A (OAuth; 🔒 operatör alanı) | – | – | – |
| **Rezervasyon/lead (7g, DB)** | **15** (13 aktif + 2 iptal, %13.3 iptal) · ~€1.726 brüt / ~€1.426 iptalsiz | 20 (07-06) | 8 (prev-prev) | ↓ hafif yumuşadı (pencere: yüksek-değer tur geride kaldı, sunset ağırlıklı) |
| AI referral (ChatGPT, 3g) | **28 sess** ✅ + Gemini 2 | 7 (07-06) | 28 (07-01) | ↑ **GÜÇLÜ TOPARLANMA** |
| AI-visibility mention % | N/A (C1 lbm KALICI KALDIRILDI — 2026-07-06 operatör) | – | – | – |

**Rezervasyon dağılımı (7g, DB):** 15 rez · sunset-cruise 10 (1 iptal €80), yacht-charter 4 (1 iptal €220; aktif €220-297), dinner 1 (€80). gclid=Y sadece 1. İptal oranı %13.3 (stabil-düşük). Bu pencerede yüksek-değer private-istanbul-tour YOK (önceki €1.110 kümesi 7g penceresinden çıktı) → brüt düştü ama hacim/iptal sağlıklı.
**Trafik kaynağı (Clarity 3g):** google 89 (www 78 + null 11) + gmail-app 4, direct 53, **chatgpt 28**, **gemini 2**, bing 2, yandex 1, localhost 2. (Cihaz kırılımı bu run çekilmedi.)
**B7 intent-mix (7g page-level GSC):** informational impr **%68.4** / click **%42.5** — commercial impr **%31.6** / click **%57.5**. Commercial sayfalar impression-başına çok daha yüksek CTR üretiyor — intent-bridge tezi sağlam.
**B10 Google Trends (TR):** "bosphorus cruise" 39→44 (+5% MoM, peak Eki 5-11), "istanbul dinner cruise" 3→21 (relatif büyük yükseliş), "yacht charter istanbul" 2→4. "MerrySails" + "bosphorus sunset cruise" BLOCKED (Trends API kısıtı). Sezon-içi (May-Eki) — dinner-cruise talebi yükseliyor sinyali.
**A1 KEŞİF (gerçek UI raporu, Chrome MCP):** money-page örneklemi 22/22 indexed gösterirken **gerçek Page-Indexing raporu 1.553 "Tarandı-dizine eklenmedi" + 82 "Keşfedildi-dizine eklenmedi" + 404×32** ortaya çıkardı (07-06 acilkaseniz dersi birebir tekrarlandı — örneklem sağlıklı, sınıf-toplamı DEĞİL). Google indexed 342 vs not-indexed ~1.690 = **%82 not-indexed oranı.** Bu, brand-profile'daki Firefly/generalist riskinin nicel kanıtı.
**A7:** 0 doğrulanmış-unindexed money page (hepsi indexed) → manuel Request-Index kotası bugün 0 kullanıldı. Listicle `/blog/best-bosphorus-sunset-cruise-istanbul-2026` INDEXED (crawl 07-06, kapalı kalıyor).
**E7-light güvenlik:** headers TAM apex'te (HSTS+preload/CSP/X-Frame/X-Content-Type/Referrer/Permissions), `.env` git'te değil, hardcoded secret/JWT-fallback YOK, `/admin` 307 guard, robots Content-Signal directive canlı. Kritik bulgu yok.
**C1-light AI-readiness (3 sinyal apex'te CANLI):** robots.txt Content-Signal directive ✅ + `/.well-known/api-catalog` 200 ✅ + `Accept: text/markdown` → `text/markdown` 200 ✅ + llms.txt 200 ✅. (Proxy sinyal, gerçek AI-citation testi değil.)
**Repo notu:** branch `main`; `feat/yacht-product-redesign` merge edilmiş (caad5d9). FV-6 npm-audit fix (1a345b9) + booking priceMode fix (74ae435) commit'li. Recent commit'lerde title/H1 churn YOK (E4 FREEZE korunuyor), ReviewsCarousel'a dokunulmadı (FV-5 hâlâ açık).

## 🎯 AÇIK FIRSATLAR (öncelik sırası)
1. **[P0/P1 · A1 crawl-budget — YENİ HEADLINE] 1.553 "Tarandı-dizine eklenmedi" (%82 not-indexed).** Gerçek Page-Indexing raporu money-page örnekleminin gizlediğini ortaya çıkardı. **Thin-content/crawl-budget audit gerekli (A8 dead-inventory'yi öne çek):** 1.553'ün hangi URL sınıflarından geldiğini kır (locale varyantları, /guides, /blog 114-post, reservation query-param URL'leri, event alt-sayfaları) → crawl-budget kurallarına göre noindex/410/sitemap-prune. 404×32 → kırık/kaldırılmış URL'leri bul. Firefly/generalist riskinin somut hâli.
2. **[P0 · B5/FV-5 · 4. GÜN AÇIK] 4 money page Review `itemReviewed` FAIL — kod fix HÂLÂ yazılmadı.** /istanbul-dinner-cruise, /yacht-charter-istanbul, /cruises/bosphorus-sunset-cruise, /de/istanbul-dinner-cruise (her birinde 4× `Invalid object type for field "itemReviewed"`). Kaynak: `src/components/ui/ReviewsCarousel.tsx` — Review'ı sayfanın ana entity `@id`'sine bağla (yacht/dinner-DE→Product, sunset/dinner→Event). Referans: /bosphorus-cruise + /tr/bosphorus-cruise ikisi de PASS. Schema-only = FREEZE-safe. **4. gün — en eski açık P0.**
3. **[P1 · FV-1/D5 · kök-neden KAYDI] /reservation dead-click %52.63 (↑ %34.78'den) — package kartları tıklanabilir değil.** Element kırılımı: month-nav fix ÇALIŞTI ("July 2026" label dead 116→6), AMA baskın dead artık boş/maskeli fiyat alanı (blank 179 + masked "••••" 24) + package-kart metni (Dinner Cruise 9, Without Wine 5, /person 3, Selected 3) + "Continue booking" CTA (5). Fix: tüm package kartı = clickable label; maskeli fiyat konteyneri pointer-events; "Continue booking" disabled-affordance; "(function(){…})" script-as-text (3 dead) araştır.
4. **[P1 · INTENT-BRIDGE — büyük CTR açığı] fiyat sayfaları impression kanıyor, ~0 click:** /blog/bosphorus-cruise-prices-2026 (1363i/2c/%0.1), /bosphorus-cruise-prices-istanbul-2026 (877i/0c/%0.0), /blog/bosphorus-cruise-vs-ferry-istanbul-2026 (1468i/15c/%1.0) = ~3.700 impr / ~17 click. GROWTH-PLAN Hamle 2'yi (transactional CTA + 134-167 kelime self-contained answer block + BlogToPillarCta) iki fiyat sayfasına uygula. Title FREEZE — sadece body.
5. **[P1 · A7/TR — internal-link, push DEĞİL] /tr/bosphorus-cruise crawl 55 gün donuk (05-13).** Rich PASS + indexed ama günlük push'a rağmen Google recrawl gelmiyor (3. gün not). Push tek başına yetersiz kanıtlandı → kod-tarafı internal-link denetimi: TR sayfalardan /tr/bosphorus-cruise'a giden link sayısı/konumu. "boğaz turu" 6.600/mo hedefi ("akşam yemekli boğaz turu" pos 36.7).
6. **[P2 · R1 SUPPRESSION] Bing week 5, gün 29, imp 0 (07-05'e kadar).** Teknik taraf TAM TEMİZ (InIndex 477↑, crawl issues 0, 5xx 0, sitemap 594/0-err, 301-fix canlı). Title FREEZE + günlük submit sürüyor. ETA penceresi 07-07→08-04 içinde; eskalasyon (week 6 ~07-22) gelmedi. Operatör: Bing Site Scan (panel-only).
7. **[P2 · D5 watch] /princes-islands-tour-istanbul %66.67 dead (3 sess, 18 dead click) — düşük-N ama yoğun.** Sonraki run element kontrolü; tur sayfasında kırık CTA ihtimali.
8. **[P2 · A5] Yandex NOT_IN_SPRAV** — Yandex Business kaydı (operatör, tek açık Yandex recommendation, değişmedi).

## ⚠️ AÇIK SORUNLAR / FIX-VERIFY
- **[A1 crawl-budget — YENİ]** 1.553 crawled-not-indexed + 82 discovered + 404×32. Baseline daily-state.jsonl'e yazıldı (yarın delta hesaplanabilir). `fix-verify-queue.md` yeni madde + Fırsat #1.
- **[FV-5 · P0 · 4. GÜN]** 4 money page rich-results FAIL (Review itemReviewed) — kod fix bekliyor (`ReviewsCarousel.tsx`). bkz. Fırsat #2.
- **[FV-1 · P0 · ÇÖZÜLMÜYOR]** /reservation dead %52.63 (↑ %34.78'den). Month-nav fix'i doğrulandı (July-2026 116→6) ama yeni baskın kaynak = package-kart/maskeli-fiyat alanı. Element kaydı Fırsat #3'te. Verify AÇIK kalıyor.
- **[R1 SUPPRESSION — AÇIK week 5]** bkz. Fırsat #6. `fix-verify-queue.md` FV-4. SUPPRESSION-WATCH güncellenecek (gün 29).
- **[FV-6 KAPANDI ✅]** npm audit 4 HIGH → 0 (commit 1a345b9 git log'da teyit). Next.js 16.2.10 + nodemailer 9.0.3.
- **[OAuth]** GA4 (missing token) + Ads (operatör alanı) → D2/D8/D3 N/A. **GSC merkezi token ÇALIŞIYOR** (script `gsc-daily-snapshot.mjs` .env.local'daki BAYAT GSC_REFRESH_TOKEN'ı tercih ettiği için invalid_grant verdi — merkezi token direkt kullanıldığında B1/A3/A7/B5 CANLI). GA4 yenileme P1.

## 🔍 SANA İŞ DÜŞEN (operator action)
- **A1 crawl-budget audit (P1 — YENİ):** 1.553 crawled-not-indexed'in URL sınıf-kırılımı + thin/held-back/410 kararı. Bu, sadece push ile çözülmez; içerik/sitemap-mimari işi.
- **Manuel Request-Index:** bugün **0 URL** gerekli (tüm money page indexed) — kota diğer markalara.
- **GA4 OAuth yenile:** `node scripts/ga4-merrysails-oauth.mjs auth-url` (D2/D8/D11-GA4 için tek eksik).
- **`.env.local` GSC_REFRESH_TOKEN temizle/güncelle** (opsiyonel) — bayat; script merkezi token'a düşmüyor çünkü env-var önceliği var.
- **Yandex Business kaydı** (NOT_IN_SPRAV) — yandex.com/business, ~10 dk.
- **Bing:** aksiyon YOK — title FREEZE + Site Scan (panel) + sabır (week 5/6).
- **Lumen #86820254 URL listesi** hâlâ bekliyor (submit-denylist.md operatör adımları).

## 🗓️ WEEKLY/MONTHLY due-tracker
| Kontrol | Son | Next due | Durum |
|---|---|---|---|
| B3 rank sweep | 06-25 (rank-history) | 2026-07-08 | scheduled (yarın) |
| B4 cannibalization | 07-06 (kısmi) | 2026-07-13 | scheduled |
| C1 AI-visibility (lbm) | – | – | ⛔ **KALICI KALDIRILDI (2026-07-06 operatör) — lbm asla kullanılmayacak** |
| D6 rakip turu | – | 2026-07-13 | scheduled |
| **A8 dead-inventory** | – | **2026-07-13 (A1 keşfi ile ÖNE ÇEKİLMELİ)** | ⚑ crawl-budget audit tetiklendi |
| A11 suppression-recovery review | 07-06 | 2026-07-13 | scheduled |
| B9 serpstat audit | – | – | ⛔ **KALICI KALDIRILDI (2026-07-06 operatör)** |
| D9-deep (PageSpeed) | 07-06 (quota-exceeded) | 2026-07-13 | scheduled (Pazar) |
| D12 GTM container sağlığı | 07-06 | 2026-07-13 | scheduled |
| D13 görsel performans | 07-06 | 2026-07-13 | scheduled |
| E7-full güvenlik (derin) | 07-06 (FV-6 fix'lendi) | 2026-07-13 | ✅ 0 vuln |
| E3 backlink audit | 05-02 (disavow) | 2026-08-01 | scheduled |
| C3 isitagentready + C4 AI-bot erişim | – | 2026-08-01 | scheduled |

---

## 📅 GÜNLÜK LOG (append-only, son 30 gün tutulur)

### 2026-07-07 (mode=daily)
- **Coverage:** tüm DAILY hücreler DONE/N/A(sebep). **BÜYÜK A1 KEŞFİ.**
- **A1 (gerçek Page-Indexing raporu — Chrome MCP, ilk kez çekildi):** Google indexed **342**; not-indexed sınıfları: **Tarandı-dizine eklenmedi 1.553** (Başarısız), Keşfedildi-dizine eklenmedi 82 (Başladı), Bulunamadı-404 **32** (Başarısız), noindex 5, Yönlendirmeli 14 (NR-9, hata sayılmaz), alt-canonical 0. **%82 not-indexed oranı** — money-page örneklemi (22/22 indexed) bunu tamamen gizliyordu (07-06 acilkaseniz dersi birebir). Baseline daily-state.jsonl'e yazıldı; regression_flags'e R5-coldstart + opportunities'e thin/crawl-budget audit eklendi.
- **B1 (CANLI, 06-29→07-05):** 112 click / 12.188 impr / pos 7.7 → prev-7g (06-22→06-28) 108c/11.332i = **+3.7% click / +7.6% impr WoW**, pozisyon 8.1→7.7 iyileşti. Not: `gsc-daily-snapshot.mjs` .env.local bayat GSC_REFRESH_TOKEN'ı tercih edip invalid_grant verdi; merkezi token direkt kullanıldı (`/Users/resat/mcp-gsc/token.json` refresh OK doğrulandı).
- **B2 striking-distance (pos 4-20):** yoğun fiyat+ferry kümesi — "bosphorus ferry" 9.7/34i, "bosphorus sunset cruise" 10.7/28i, "ferry vs cruise" 9.4/22i, "bosphorus dinner cruise price" 10.2/18i, "bosphorus cruise istanbul price 2026" 7.1/17i, "is bosphorus cruise worth it" 6.1/16i+1c, "bosphorus cruise istanbul" 4.7/7i (top-3'e yakın). Neredeyse hepsi 0 click = büyük CTR açığı (intent-bridge).
- **B5 rich-results (Inspection API):** 4 money page **FAIL — 4. GÜN** (07-04/05/06/07 aynı `itemReviewed` hatası ×4/sayfa). /bosphorus-cruise + /tr/bosphorus-cruise PASS (referans: Review→Product @id). Kod fix hâlâ yok → FV-5 en eski açık P0.
- **A3 sitemap:** GSC lastDownloaded 07-06 (taze ✅), 0 err/0 warn, 594 submitted, TEK canonical kayıt (/sitemap.xml). Sözleşme ihlali yok.
- **A4/A5/A6 auto-submit (helper, 18 priority URL):** IndexNow Bing 200 + Yandex 202; Bing SubmitUrlBatch 200 (submitted 18, daily_quota 100); Yandex recrawl 18/18 202 (quota_remainder 150/150). Denylist boş (Lumen operatörde).
- **A7 inspect:** 29 money/priority URL API ile — **0 doğrulanmış-unindexed** (hepsi indexed). Manuel Request-Index bugün 0. Listicle indexed kapalı. /tr/bosphorus-cruise crawl 05-13 (55 gün donuk) — internal-link kod-denetimi öneriliyor (push yetersiz).
- **A10 index-rate:** Google **342**, Bing InIndex **477** (↑476), Yandex searchable **336** (↓337, gürültü). **SUPPRESSION SAYACI:** Bing 0-seri 06-09→07-05 = **gün 29 / week 5** (canlı GetRankAndTrafficStats, 60 satır hepsi 0). Crawl sağlığı: CrawlIssues 0, 5xx 0, 4xx 38/234 (~%16, hafif yüksek — izle), robots-block 0.
- **R-SENTINEL:** **R1 AÇIK (Bing week 5, gün 29)** — carry-forward (Google click +3.7% sağlıklı, engine-özel). **R5 YENİ (cold-start): crawled-not-indexed 1.553** — ilk ölçüm, delta yok ama %82 oran → thin/crawl-budget audit. **R7-watch: /reservation dead %52.63** (↑%34.78, düşük-N 19 sess, yeni deploy spike DEĞİL — FV-1 çözülmüyor). R2 CLEAR (click/impr ↑, rez -25% ama <%40). R3 CLEAR (Bing↑, Yandex ~flat). R4 CLEAR (15 rez). R6 N/A(Ads oauth). R10 N/A(GA4 oauth).
- **D1/D5/D10 (Clarity 173 sess/3g):** site dead **11.56%** ✅ (↓13.48) / rage **0%** ✅ / quickback 12.72% / JS-error **0%** ✅. URL-bazlı dead-click count: /reservation 21, /princes-islands-tour-istanbul 18 (yeni, 3 sess %66.67 düşük-N), /cruises/bosphorus-sunset-cruise 14, /bosphorus-cruise 12. **/reservation element kırılımı (FV-1):** blank 179 + masked-fiyat 24 + Dinner Cruise 9 + July-2026 6 (fix çalıştı, 116→6) + Continue-booking 5 + Without Wine 5 + /person 3 + script-as-text 3 → kök-neden package-kart tıklanamazlığı.
- **D4 rez (DB):** 15/7g — 13 aktif + 2 iptal (%13.3). Gross ~€1.726 / net ~€1.426. sunset 10 (1 iptal), yacht 4 (1 iptal €220; aktif €220-297), dinner 1. gclid=Y 1. Yüksek-değer tur bu pencerede yok → brüt düşük ama hacim sağlıklı.
- **D11 AI-referral:** chatgpt.com **28 sess/3g** (07-06'daki 7'den GÜÇLÜ toparlanma) + **gemini 2** + bing 2 + yandex 1 (organik engine). AI trafiği GERÇEK ve büyüyor.
- **B7 intent-mix:** informational impr %68.4/click %42.5 vs commercial impr %31.6/click %57.5 — commercial impression-başına daha yüksek CTR (intent-bridge işi meyve veriyor).
- **B10 Trends (TR):** "bosphorus cruise" 39→44 (+5%), "istanbul dinner cruise" 3→21 (yükseliş), "yacht charter istanbul" 2→4. Marka+sunset BLOCKED. Sezon-içi.
- **C1-light:** 3 AI-readiness sinyali apex'te CANLI (Content-Signal robots + api-catalog 200 + Accept:markdown 200 + llms.txt 200). Proxy sinyal.
- **E7-light:** headers tam apex, secret/JWT-fallback yok, .env git'te değil, /admin 307 guard. Temiz.
- **D2/D3/D8:** N/A (GA4 oauth_missing + Ads operatör alanı/oauth). D9-light: LCP bu run çekilmedi, dünkü 2.330ms proxy.
- **Sezon:** cruise penceresi (May-Eki) içindeyiz; dinner-cruise Trends yükselişi sezon-içi içerik-fırsatı (Ads değil).

### 2026-07-06 (mode=weekly — coverage tam sweep)
- **Coverage:** tüm DAILY hücreler DONE/N/A(sebep). WEEKLY ek maddeler de işlendi (B4 kısmi, C1 blocked, B9 blocked, D9-deep blocked, D12 done, D13 done, E7-full done+P0 bulgu, A11 done).
- **B1 (CANLI, 06-27→07-03):** 120c/12.390i/pos 7.9 → prev-7g 130c/12.346i = hafif -8% click (gürültü). B2 fiyat-intent kümesi genişledi. **B5 4 money FAIL (3. gün).** A3 lastDownloaded 07-06, 0 err. A4/A5/A6 14 URL push OK. **A7 listicle INDEXED** (manuel kota 0). A10 Yandex 337, Bing 476; suppression gün 28/week4→5. **R7 iyileşme:** site dead 18.54→13.48, /reservation 64.7→34.78 (hedef değil). D11 chatgpt 7 (düşüş). D4 20 rez (%15 iptal). **E7-full: npm audit 4 HIGH → FV-6 açıldı+fix'lendi (0 vuln).**

### 2026-07-05 (Bing recovery deep-dive + FV-1 fix)
- **Bing recovery:** son imp>0 06-08 (restate); InIndex 472↑, 5xx 0, CrawlIssues 0. next.config 80× redirect `permanent:true`→`statusCode:301` (FREEZE-safe). Sitemap 398/398 %100 200. Auto-submit 10 URL OK.
- **FV-1 fix (deploy-gap YOK):** 2 gerçek bug — (1) `PlannerDateCalendar` ay-nav render-snap kilidi (Ağustos rez görüntülenemiyordu) + (2) "Change" scrollIntoView no-op → pulse. Build ✅, push YOK.

### 2026-07-04 (mode=daily)
- **BÜYÜK UNBLOCK:** GSC merkezi token search-analytics+sitemaps+inspection açıyor. B1 130c/12.346i (+49% WoW). B2 "is bosphorus cruise worth it" 4.7+1c. B5 4 money FAIL (FV-5 açıldı). A10 Yandex 336, Bing 470; suppression week4. **R7 REOPEN: /reservation dead 64.7%.** D11 chatgpt 25. D4 21 rez (%38 iptal).

### 2026-07-02 (mode=daily)
- GSC+GA4+Ads OAuth revoke. R1 Bing week3 (imp 0 06-11→06-30). R4 CLEAR (22 rez, +175% WoW). R7 IMPROVED (/reservation rage 8.33→0, dead 58→33). A4 IndexNow OK. A5 Yandex 326. B5 0 error/4 warning.

### 2026-07-01 (mode=daily, cold-start baseline)
- R4 CLEAR (24 rez). R3 CLEAR (Yandex 326, Bing 454). R1 AÇIK (Bing imp→0 06-09→06-22). R7 FLAG (/reservation dead 58%+rage 8%). A4 3 URL push 200. D4 24/7g.
