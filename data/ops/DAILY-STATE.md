# MerrySails — DAILY OPS STATE
**Domain:** merrysails.com · **Vertical:** Tourism (Bosphorus cruise + yacht charter) · **Priority:** HIGH · **Ads:** Google Ads ON (~2K TRY/day)
**Karakter/Author byline:** Captain Ahmet (cruise/yacht) + Editorial (city guides) — NO cross-brand byline reuse with GoldenSunset
**Conversion truth:** `reservation_submit` (DB: `Reservation` table, MRY-* IDs)
**Rakipler:** GetYourGuide, Viator/TripAdvisor, bosphorustour.com; sister GoldenSunset (differentiation: tier + demographic)
**Son güncelleme:** 2026-07-04

---

## 📍 NEREDEYIZ — bugünkü snapshot (her run üstten güncellenir)
| Metrik | Bugün (2026-07-04) | 7g önce | 30g önce | Trend |
|---|---|---|---|---|
| **GSC clicks (7g, 06-26→07-02)** | **130** ✅ CANLI (merkezi token, sc-domain) | 87 (prev-7g) | – (property değişti, baseline reset) | ↑ **+49% WoW** |
| GSC impressions (7g) | **12.346** | 10.111 | – | ↑ +22% |
| GSC avg position (07-02 günlük) | **8.0** | 8.3 (06-20) | – | ↔ stabil 7-8 bandı |
| **Bing impressions (canlı, ~2g lag)** | **0 (06-09→07-02 HARD ZERO, seri restate)** ⚠️ | 0 | 30-35/gün (erken Haz) | ⛔ SUPPRESSION week 4 |
| Bing clicks (canlı) | 0 | 0 | 1-2/gün | ⛔ |
| Top-3 keyword (7g örneklem) | ~5 (merrysails, bosporus sonnenuntergang DE, best-cruises-2026 listicle…) | ~3 | ~0 | ↑ |
| Pos 4-20 striking-distance | **8 sorgu** (sunset 11.6/31imp, worth-it 4.7, boat-rental 11…) | ~7 | – | ↔ |
| Indexed (Yandex searchable) | **336** | 326 (07-02) | – | ↑ +10 healthy |
| Indexed (Bing InIndex) | **470 (07-03)** | 454 (06-23) | – | ↑ RISING (5xx=0, robots-block=0) |
| GSC sitemap | lastDownloaded **07-03** ✅ 0 err/0 warn, 398 web+196 img | 07-02 | – | ✅ taze |
| GSC pages-errors (açık) | N/A (coverage report API'de yok — UI-only) | – | – | – |
| Clarity sessions (3g) | **150** | 107 (07-02) | – | ↑ |
| Dead-click % (site 3g) | **18.54%** ⚠️ | 11.21% (07-02) | 13.14% (07-01) | ↑ SPIKE (R7) |
| Rage-click % (site 3g) | 0.66% | 0% | ~8% /rez (07-01) | ↔ düşük |
| Dead-click (/reservation, session-bazlı) | **11/17 sess = %64.7** ⚠️ + 1 rage | 33.33% (07-02) | 58.33% (07-01) | ⛔ RE-SPIKE (FV-1 REOPEN) |
| LCP (site avg, Clarity 3g) | **2.330 ms** ✅ (<2.5s) | – | – | ✅ |
| JS errors (Clarity) | %0 ✅ | 0 | 0 | ✅ |
| GA4 conversions (7g) | N/A (OAuth missing — operatör) | – | – | – |
| Ads spend / conv (7g) | N/A (OAuth; 🔒 operatör alanı) | – | – | – |
| **Rezervasyon/lead (7g, DB)** | **21** (13 aktif + 8 iptal) · €3.699 brüt / €2.635 iptalsiz | 22 (€3.920) | 8 (prev-prev) | ↔ stabil yüksek |
| AI referral (ChatGPT, 3g) | **25 sess** (19+6) | 7 (07-02) | 28 (07-01) | ↑ geri yükseldi |
| AI-visibility mention % | N/A (weekly, due 07-08) | – | – | – |
| **Rich-results FAIL (money pages)** | **4 sayfa FAIL** (Review itemReviewed) — bugün API'yle teyit | 4 (07-02) | – | ⛔ fix kodda YOK (P0) |

**Rezervasyon dağılımı (7g, DB):** 21 rez · sunset-cruise 11 (8'i €68 bandı, **7 iptal 06-27/28 kümesi**), yacht-charter 5 (€220-397, 1 iptal), private-istanbul-tour 2 (€760+€350 confirmed 💰), dinner 1. gclid=Y sadece 2. İptal oranı %38 — çoğu sunset düşük-bilet; yacht+private tour net büyüyor.
**Trafik kaynağı (Clarity 3g):** google 77, direct 56, **chatgpt.com 25** (AI referral yeniden yükselişte), yandex 3, paytr 1. **Top sayfa: /yacht-charter-istanbul 58 sess** (%6.9 dead — sağlıklı).
**🔓 GSC UNBLOCK:** merkezi token (`/Users/resat/mcp-gsc/token.json`) search-analytics + sitemaps + inspection'ın ÜÇÜNE de erişiyor — "OAuth revoked" blokajı SADECE repo-lokal script'lerdeydi. B1/A3/A7 canlı geri döndü (sc-domain property; eski 06-14 "2c/38i" baseline'ı URL-prefix property'siydi, karşılaştırma yapma).

## 🎯 AÇIK FIRSATLAR (öncelik sırası)
1. **[P0 · B5 rich-results] 4 money page Review `itemReviewed` FAIL — kod fix'i HÂLÂ uygulanmadı** (GROWTH-PLAN Hamle 1). Bugün Inspection API teyidi: /istanbul-dinner-cruise (crawl **07-03** — taze crawl'da bile FAIL), /yacht-charter-istanbul, /cruises/bosphorus-sunset-cruise, /de/istanbul-dinner-cruise. Kaynak komponent: `src/components/ui/ReviewsCarousel.tsx` (tek paylaşılan blok). `/bosphorus-cruise` PASS pattern'ine bağla (Event/Product `@id`). Schema-only = suppression-safe. + premium-yacht-15: Product review/aggregateRating WARNING (sadece GERÇEK review ile doldur).
2. **[R1 SUPPRESSION — AÇIK, week 4] Bing impressions HARD-ZERO 06-09→07-02** (canlı seri; Bing 06-08'e 4 imp restate etti — önceki kayıt 06-10 idi). Crawl+index SAĞLIKLI (InIndex 470 ↑, 5xx 0, robots-block 0). Recovery protokolü sürüyor: title/meta/h1 FREEZE + IndexNow/SubmitUrlBatch daily (bugün 12 URL 200/202). Week 6 (~07-22) sabır penceresi; o zamana kadar 0 ise Site Scan + eskalasyon.
3. **[P0 · FV-1 REOPEN] /reservation dead-click re-spike %64.7 (11/17 sess) + 1 rage.** Element verisi (Clarity 3g): boşluk/whitespace 1.480 dead, **"Change" butonu 155 dead (fix'in kendi eklediği buton tıklamaya cevap vermiyor görünüyor!)**, month-label "Julio de 2026"+"July 2026" 116, "2Guests" 52, **maskeli kart alanı "•••••" 48 (PayTR iframe overlay şüphesi)**. Hipotez: calendar fix commit'leri main'de ama prod deploy'da etkisiz VEYA "Change" handler kırık. Kod tarafı doğrulama gerekli (prod'da buton click handler test).
4. **[P1 INTENT-BRIDGE — canlı GSC teyitli] "is bosphorus cruise worth it" pos 4.7 + CLICK geliyor** (/blog/bosphorus-cruise-vs-ferry). GEO-GOLD keyword page-1'de. BlogToPillarCta + transactional quote-block + 134-167w answer block ekle (body-only, title dokunma) → GROWTH-PLAN Hamle 2. Yanına: "bosphorus sunset cruise" pos 11.6/31 imp (sunset money page striking) + "boat rental istanbul" pos 11 (/boat-rental-istanbul).
5. **[P1 A7] Listicle `/blog/best-bosphorus-sunset-cruise-istanbul-2026` hâlâ Crawled-not-indexed** (crawl 06-27, değişmedi). Sunset money page + companies-blog'dan internal link güçlendir → operatör manuel Request-Index (kuyrukta tek aday).
6. **[P1 TR] /tr/bosphorus-cruise crawl 05-13 — 52 gün bayat** (bugün de teyit). TR sayfalardan içerik-içi link akışı + günlük Yandex/IndexNow push (bugün gitti). TR dinner kw "akşam yemekli boğaz turu" 20 imp pos 37.8 — TR pillar zayıf, internal-link + body zenginleştirme (title değil).
7. **[P2 D5 YENİ] /cruises/bosphorus-sunset-cruise dead-click %26 (23 sess)** — element lokalizasyonu gerekli (muhtemelen package-card/calendar pattern'i). /ru/yacht-charter ve /yacht-charter-istanbul-ar %33 (low-N, izle).
8. **[P2 A5] Yandex NOT_IN_SPRAV** — Yandex Business kaydı (operatör, tek açık Yandex recommendation).

## ⚠️ AÇIK SORUNLAR / FIX-VERIFY
- **[R1 SUPPRESSION — AÇIK week 4]** bkz. Fırsat #2. `fix-verify-queue.md` FV-4. Sayaç: SUPPRESSION-WATCH.md güncellendi (06-09 başlangıç, veri 07-02'ye kadar 24 gün, bugün ~26. gün).
- **[FV-1 REOPEN — P0]** /reservation dead %64.7 + "Change" butonu 155 dead click. 07-02'deki "iyileşme" sinyali noise çıktı. Element listesi fix-verify'da; kod/deploy doğrulaması gerekli.
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
| B4 cannibalization | – | 2026-07-08 | scheduled |
| C1 AI-visibility (lbm) | – | 2026-07-08 | scheduled — ChatGPT referral 25 sess/3g, öncelik yüksek |
| D6 rakip turu | – | 2026-07-08 | scheduled |
| A8 dead-inventory | – | 2026-07-08 | scheduled |
| A11 suppression-recovery review | 07-04 (inline sayaç) | 2026-07-08 | scheduled (R1 açıkken haftalık) |
| B9 serpstat audit + D9-deep + D12 + D13 | – | 2026-07-06 (Pazar) | scheduled |
| E7 güvenlik | – | 2026-07-06 (Pazartesi) | scheduled |
| E3 backlink audit | 05-02 (disavow) | 2026-08-01 | scheduled |
| C3 isitagentready + C4 AI-bot erişim | – | 2026-08-01 | scheduled |

---

## 📅 GÜNLÜK LOG (append-only, son 30 gün tutulur)

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
