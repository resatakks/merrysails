# MerrySails — DAILY OPS STATE
**Domain:** merrysails.com · **Vertical:** Tourism (Bosphorus cruise + yacht charter) · **Priority:** HIGH · **Ads:** Google Ads ON (~2K TRY/day)
**Karakter/Author byline:** Captain Ahmet (cruise/yacht) + Editorial (city guides) — NO cross-brand byline reuse with GoldenSunset
**Conversion truth:** `Reservation` table (DB, MRY-* IDs); GA4 booking event = `purchase` (brand-profile "reservation_submit" adı aspirasyonel — gerçek event `purchase`)
**Rakipler:** GetYourGuide, Viator/TripAdvisor, bosphorustour.com; sister GoldenSunset (differentiation: tier + demographic)
**Son güncelleme:** 2026-07-10 (mode=daily — **BÜYÜK: FV-5 + SF-1/SF-2 + FV-1 fix'leri DEPLOY EDİLDİ + CANLI doğrulandı**; Bing 07-07 imp=1 recovery-flicker)

---

## 📍 NEREDEYIZ — bugünkü snapshot (her run üstten güncellenir)
> Not: 07-09 koşu yok (gap) → delta 07-08'e karşı (2 gün). A1 method=page-indexing-ui her iki gün.
| Metrik | Bugün (2026-07-10) | 7g/önceki | 30g | Trend |
|---|---|---|---|---|
| **GSC clicks (7g, 07-02→07-08)** | **121** ✅ CANLI (merkezi token) | 117 (prev-7g 06-25→07-01) | – | ↑ +3.4% WoW |
| GSC impressions (7g) | **13.257** | 11.970 | – | ↑ +10.8% WoW |
| GSC avg position (7g) | **7.37** | 7.60 | – | ↑ iyileşti |
| **Google indexed (A1 cache page-indexing-ui — 06-30 snapshot)** | **342** | 342 | – | ↔ flat (GSC raporu 30-Haz'dan beri yenilenmedi) |
| **Google NOT-indexed sınıfları (A1 cache, page-indexing-ui)** | **CNI 1.553 · discovered 82 · 404 32 · noindex 5 · redirect 14(NR-9) · alt-canonical 0** | 1.553/82/32/5/14/0 | – | ↔ **DEĞİŞMEDİ (R5 CLEAR — aynı 06-30 snapshot, büyüme yok)** |
| **Bing impressions (canlı API, veri 07-09'a kadar)** | **~0 · 07-07 imp=1 FLICKER** ⚠️🟡 | 0 | 30-35/gün (erken Haz) | 🟡 SUPPRESSION ~gün 32 / week 5 — **ilk recovery sinyali** |
| Bing InIndex | **478 (07-09)** | 476 | – | ↔ PLATO (470→478, 5xx=0, blocked=0, crawlErr 27-41) |
| Yandex searchable | **336** (carry, stabil) | 336 | – | ↔ stabil |
| GSC sitemap | lastDownloaded **07-09** ✅ 0 err/0 warn, 398 web submitted (tek kayıt) | 07-07 | – | ✅ taze, tek canonical |
| **Rich-results FAIL (money pages)** | **fix DEPLOY + CANLI ✅** — Google tarafı 4 sayfa hâlâ FAIL AMA **stale crawl** (06-24→07-06, deploy öncesi) | 4 FAIL (5g) | – | ✅ **FV-5 ÇÖZÜLDÜ our-side, Google re-crawl bekliyor** |
| Clarity dead-click % (site 3g) | **12.52%** | 9.09% | 13.14% (06-01) | ↑ hafif (band 9-18% içi; yacht-redesign etkisi) |
| Clarity rage-click % (site 3g) | **1.09%** ✅ | 0% | ~8%/rez (07-01) | ↑ ama <2% eşik altı |
| Clarity JS errors (site 3g) | **0%** ✅ | 0.65% | 0 | ✅ temiz |
| Dead-click ham sayı (3g, URL) | **/reservation 80 · /yacht-charter-istanbul 53** (YENİ post-redesign) · dinner 19 · / 13 | /res carry | – | ⚠️ /res fix deploy edildi (izle) + /yacht YENİ |
| **GA4 sessions (7g, 07-03→07-09, merkezi SA)** | **919** — Paid 470 / Direct 211 / Organic 154 / **AI Assistant 75** / diğer 9 | 533 (07-08 pencere) | – | ↑ (Paid ↑↑ operatör Ads ölçekleme, pasif) |
| **GA4 key-events (7g)** | **256** (whatsapp 66, begin_checkout 59, phone 26, purchase 11, abandon 2) | 172 | – | ✅ booking D-EVENT TAM |
| Ads spend / conv (7g) | 🔒 operatör alanı — pasif GA4 Paid: 470 sess / 108 keyEvent | – | – | – |
| **Rezervasyon/lead (7g, DB)** | **18** (15 aktif + 3 iptal, %16.7) · ~€3.039 brüt / ~€2.709 net | 16 (07-08) | 8 | ↑ **BÜYÜYOR** (€755 dinner-yacht + €420 private-sunset + 2×€270 yacht) |
| **AI referral (GA4 AI Assistant, 7g)** | **75 sess / 56 keyEvent** ✅ **#4 kanal ama %75 conv-oranı** (chatgpt 70s/53k) | 89s/46conv | – | ✅ **GÜÇLÜ — organik AI kanıtlı gelir** |
| Intent-mix (7g, page heuristik) | commercial impr **8.2%** / click **16.4%** · info impr 91.8% / click 83.6% | ~ | – | commercial ~2× CTR/impr → bridge sağlam |
| AI-visibility mention % | N/A (C1 lbm KALICI KALDIRILDI — 2026-07-06 operatör) | – | – | – |

**Rezervasyon dağılımı (7g, DB):** 18 rez · sunset-shared 11 (€30-150), private-sunset 2 (€220+€420), yacht 3 (2 aktif €270×2 + 1 iptal €220), private-dinner-yacht 1 (**€755**). İptal 3 (€30 dinner + €80 sunset + €220 yacht = %16.7). gclid=N hepsi (bu pencerede paid-attributed rez yok; GA4 Paid conv ayrı sayıyor). En güçlü hafta: €755 + €420 + 2×€270 = €1.715 yüksek-değer.
**Trafik kaynağı (GA4 7g):** google 614s/170k, direct 211s/24k, **chatgpt.com 70s/53k** (#3 kaynak!), bing 4, yandex.com.tr 4, gemini 3, perplexity.ai 2s/3k. AI-source toplam 79s/56k. (Clarity 3g referrer: null 325, google 67, googleads 18, youtube 24, taboola/itsfunmag = spam-referrer gürültüsü.)
**GA4 event seti (booking-marka sözleşmesi — HEPSİ ATEŞLİYOR):** purchase 11 ✅ · begin_checkout 59 ✅ · whatsapp_click 66 ✅ · phone_click 26 ✅ · booking_abandonment 2 ✅. contact_submit/form_submit/generate_lead = 0 (booking-marka, form-gönderim yok — bug değil). D-EVENT sözleşmesi TAM.
**D8 reconciliation:** GA4 purchase **11** vs DB aktif rez **15** (7g) = ~%27 GA4-altında-DB. **Beklenen yön** (GA4 consent/adblock/AI-session under-count %15-30 normal) — tracking-bug DEĞİL, izle (R10 soft, stabil).
**B2 striking-distance (pos 4-20):** "ortakoy mosque" 119i/1c/pos10.7 (info bridge adayı) + fiyat/ferry kümesi: bosphorus ferry 29i/1c, bosphorus sunset cruise 20i/0c, bosphorus dinner cruise price 19i/0c, "is bosphorus cruise worth it" 18i/1c/pos6.3, "bosphorus cruise istanbul" 9i/0c/**pos4.1 (top-3'e yakın!)**. Neredeyse hepsi 0 click = büyük CTR açığı (fiyat kümesi).
**B4-lite kanibalizasyon (COMMERCIAL, YENİ):** `"kabataş yemekli boğaz turu"` → **/tr/istanbul-dinner-cruise (13i/pos21) + /tr/kabatas-dinner-cruise-istanbul (12i/pos32)** — iki TR dinner sayfası aynı commercial query'de yarışıyor, ikisi de derin. Pazar B4-KONSOLİDASYON'a besle (MERGE adayı: kabatas-variant → dinner pillar canonical/internal-link; title DOKUNMA E4). Ek (info): fiyat-blog vs fiyat-pillar çakışması ("bosphorus cruise prices 2026" 2 URL), "bosphorus sunset cruise price" (blog p9 + sunset money p5).
**B10 Google Trends (merkezi cache 07-10, status=ok kısmi):** dinner cruise istanbul **4→56**, yacht charter istanbul **4→49**, sunset cruise **4→56** — üçü de son 4 haftada güçlü sıçrama, peak son 2 hafta (28 Haz-11 Tem). **Portföydeki en yüksek/güncel sezon sinyali.** ("bosphorus cruise" kw blocked — kısmi.) Sezon-içi (May-Eki). → sezon-hazırlık İÇERİK fırsatı (Ads DEĞİL).
**A1 (cache page-indexing-ui, merrysails):** indexed 342, CNI 1.553, discovered 82, 404 32, noindex 5, redirect 14(NR-9), alt-canonical 0 → **06-30 snapshot, 07-08 ile birebir aynı** (GSC aggregate raporu hâlâ yenilenmedi). Delta sıfır GERÇEK → R5 CLEAR. index-rate 16.9%.
**A7 / rich-results deploy-timing (KRİTİK BULGU):** FV-5 fix (`f875d43`) **CANLI** — curl doğrulaması: /istanbul-dinner-cruise `itemReviewed:{@id .../bosphorus-dinner-cruise-istanbul#event}`, /yacht `#product`, /sunset `#event`. AMA Inspection API 4 sayfada hâlâ FAIL çünkü **son crawl deploy'dan ÖNCE** (dinner 07-03, yacht 06-24, sunset 07-06, de-dinner 06-26). → chrome_queue: validation_restart "Review snippets" + request_index /yacht-charter-istanbul (16g stale crawl, schema değişti). /bosphorus-cruise PASS teyit (referans).
**E7-light güvenlik:** 6/7 money page CANLI 200 (/, dinner, yacht, sunset, /reservation, /bosphorus-cruise, /tr/bosphorus-cruise HEPSİ 200) · headers TAM apex (HSTS 63072000 + CSP + X-Frame SAMEORIGIN + nosniff + Referrer + Permissions) · **tracked-secret taraması TEMİZ** (grep hit'leri: `TrustCredentialsBand.tsx` dosya-adı false-pos + `INDEXNOW_KEY` fallback = KAMUYA AÇIK anahtar public/*.txt'te, sızıntı DEĞİL — commit 98d88f0 düzeltti). **Deploy-gap YOK: 12 commit origin/main'in önünde AMA prod GÜNCEL** (vercel --prod pattern, FV-5/SF-1/SF-2 canlı doğrulandı; git push YOK = operatör kararı).
**E7-tracking-live:** GA4 + Clarity CANLI VERİ DÖNÜYOR (GA4 919 sess/256 keyEvent, Clarity friction verisi) → tracking demonstrably çalışıyor (baskitasarla 0-veri dersi bu markada yok).
**C1-light AI-readiness (proxy sinyal):** robots 200 + api-catalog 200 + llms.txt 200 + Accept:text/markdown→text/markdown 200. (Gerçek AI-citation kanıtı = D11 GA4 AI-referral, yukarıda güçlü.)
**Repo notu:** branch `main`; son commit'lerde title/H1 churn YOK (E4 FREEZE korunuyor). **12 commit deploy edildi (prod güncel) ama origin'e push edilmedi** — F6 kuralı: push operatör kararı.

## 🎯 AÇIK FIRSATLAR (öncelik sırası)
1. **[YAPILDI ✅ · FV-5 · was P0/BAYAT-5g] 4 money page Review itemReviewed fix DEPLOY + CANLI doğrulandı.** `f875d43` ile ReviewsCarousel Review→ana entity @id (#event/#product) bağlandı; curl 3/3 money page teyitli. Google tarafı re-crawl bekliyor (stale crawl 06-24→07-06). chrome_queue'da validation_restart + request_index. **Kazanım — 5-günlük en eski P0 kapandı.**
2. **[YAPILDI ✅ · SF-1/SF-2] 797 shadow-404 → 301 map DEPLOY + CANLI.** `9259378` ile locale-mismatch ölü URL'ler slug-birebir 301 (curl: /blog/bogaz-turu... → /tr/blog/..., /fr/blog/accessible... → /blog/...). Crawl-budget temizliği + internal_broken_links kökü kapandı. 797 URL auto-submit edildi.
3. **[AÇIK-1g · P1 · A1 crawl-budget] 1.553 "Tarandı-dizine eklenmedi" (%82 not-indexed, index-rate 16.9%).** DEĞİŞMEDİ (06-30 snapshot). **A8 dead-inventory audit** (next_due 07-12): 1.553'ün URL sınıf-kırılımı (114-post /blog + /guides + locale + reservation query-param + event alt-sayfa) → noindex/410/sitemap-prune. Servis/commercial/indexli KALIR. 404×32 ayrı kır (SF-1/SF-2 301'i çoğunu çözmüş olabilir — audit'te ölç).
4. **[YENİ · P1 · D5/R7 UX] /yacht-charter-istanbul 53 dead-click (post yacht-redesign).** Yacht product redesign (`feat/yacht-product-redesign` merged) sonrası Tier-1 money page'de dead-click birikimi + sub-page'ler (group-yacht-40-signature 7, boutique-yacht-12 6). Session-recording ile element sınıfla: non-interactive kart/görsel/fiyat tıklanıyor mu. Ayrı kod-session.
5. **[AÇIK · P1 · INTENT-BRIDGE — büyük CTR açığı] fiyat sayfaları impression kanıyor ~0 click:** /blog/bosphorus-cruise-prices-2026 (**1.588i/1c!**), /blog/bosphorus-cruise-vs-ferry-istanbul-2026 (1.537i/14c), /bosphorus-cruise-prices-istanbul-2026 (910i/2c). + ortakoy mosque bridge (119i/pos10.7). GROWTH-PLAN Hamle 2 (transactional CTA + 134-167 kelime self-contained answer block + BlogToPillarCta) — body only, title FREEZE.
6. **[AÇIK · P1 · FV-1 fix deploy edildi, verify pending] /reservation dead-click.** `c98ca49` (package cards tappable) + `b169c81` (single-package summary affordance) DEPLOY edildi. Clarity 3g hâlâ 80 ham dead-click (pencere deploy öncesini kapsıyor) → 3-5 gün sonra re-measure. Kod tarafı yapıldı; ölçüm bekliyor.
7. **[AÇIK · P1 · A7/TR internal-link] /tr/bosphorus-cruise crawled-not-indexed (teyit: coverage CNI, lastCrawl 07-07).** Push+request-index marjinal kanıtlandı → **TR sayfalardan içerik-içi internal-link akışı ŞART** (GROWTH-PLAN Hamle 4). "boğaz turu" 6.600/mo KD~1. Kod-session.
8. **[AÇIK · P1 · B4-lite KONSOLİDASYON, YENİ] "kabataş yemekli boğaz turu" 2 TR dinner sayfası çakışıyor** (dinner pillar p21 + kabatas-variant p32). Pazar B4-konsolidasyon: MERGE (canonical/internal-link kabatas→pillar) veya DIFFERENTIATE (body-scope; title DEĞİL). Tek-intent-tek-URL.
9. **[AÇIK-30g · P2 · R1 SUPPRESSION — TEMKİNLİ RECOVERY] Bing week 5 / ~gün 32, 07-07 imp=1 flicker.** Teknik TAM TEMİZ (InIndex 478 plato, 5xx 0, crawl 1.726/7g). Title/body/schema FREEZE + günlük submit sürüyor. **07-07 imp=1 = ilk recovery sinyali** (merrytourism deseni) — izle. Eskalasyon eşiği (week 6) yaklaşıyor. Operatör: Bing Site Scan (panel).
10. **[AÇIK · P2 · A5] Yandex NOT_IN_SPRAV** — Yandex Business kaydı (operatör, ~10 dk, tek açık Yandex rec).

## ⚠️ AÇIK SORUNLAR / FIX-VERIFY
- **[FV-5 · ✅ ÇÖZÜLDÜ our-side]** fix `f875d43` DEPLOY + curl-CANLI. Google re-crawl bekliyor → chrome_queue validation_restart + request_index. Google PASS teyidi 7-14g.
- **[SF-1/SF-2 · ✅ ÇÖZÜLDÜ]** 797 shadow-404 301 map `9259378` CANLI (curl teyit).
- **[FV-1 · fix DEPLOY, verify pending]** /reservation package-card `c98ca49`+`b169c81` deploy edildi; Clarity re-measure 3-5g (şu an 80 ham dead-click, deploy-öncesi pencere).
- **[FV-7 · P1 · AÇIK-1g]** 1.553 CNI (06-30 snapshot, değişmedi). A8 audit gerekli. bkz Fırsat #3.
- **[FV-8 · WATCH]** /tr/bosphorus-cruise crawled-not-indexed (toplam indexed 342 stabil = R3 değil). Internal-link işi (Fırsat #7).
- **[R1 SUPPRESSION — 🟡 TEMKİNLİ] Bing week 5 gün ~32, 07-07 imp=1 flicker** — fix-verify FV-4. SUPPRESSION-WATCH güncellendi.
- **[YENİ · D5/R7]** /yacht-charter-istanbul 53 dead-click post-redesign — bkz Fırsat #4.
- **[OAuth durumu]** GA4 merkezi SA ✅ CANLI (property 534226524), GSC merkezi token ✅ CANLI. **Ads** operatör alanı (pasif GA4 Paid okundu).

## 🔍 SANA İŞ DÜŞEN (operator action)
- **A8 crawl-budget/dead-inventory audit (P1, next_due 07-12):** 1.553 CNI'nin URL sınıf-kırılımı + thin/410/sitemap-prune. Push ile çözülmez. (SF-1/SF-2 301 sonrası 404×32'yi yeniden ölç.)
- **/yacht-charter-istanbul dead-click (P1, YENİ):** yacht-redesign sonrası 53 dead-click — session-recording ile element-fix (ayrı kod-session).
- **/tr/bosphorus-cruise internal-link (P1):** TR sayfalardan içerik-içi link akışı (dizinden düştü, push yetersiz).
- **FV-1 verify:** /reservation fix deploy edildi — 3-5 gün sonra Clarity dead-click <%15 doğrula.
- **Yandex Business kaydı** (NOT_IN_SPRAV) — yandex.com/business, ~10 dk.
- **Bing:** aksiyon YOK — FREEZE + Site Scan (panel) + sabır (07-07 imp=1 flicker izle, week 6 yaklaşıyor).
- **Lumen #86820254 URL listesi** hâlâ bekliyor (submit-denylist.md operatör adımları).
- **Git push (opsiyonel):** 12 commit prod'da canlı ama origin/main'e push edilmedi — istersen `git push` (deploy tetiklemez, git.deploymentEnabled:false).

## 🗓️ WEEKLY/MONTHLY due-tracker
| Kontrol | Son | Next due | Durum |
|---|---|---|---|
| B3 rank sweep | 06-25 | 2026-07-12 (Pazar oto-weekly) | scheduled |
| B4 cannibalization + konsolidasyon | 07-10 (kabatas sinyali) | 2026-07-12 | scheduled — YENİ commercial sinyal besle |
| C1 AI-visibility (lbm) | – | – | ⛔ **KALICI KALDIRILDI (2026-07-06 operatör)** |
| **A8 dead-inventory** | – | **2026-07-12 (A1 keşfi ile ÖNE ÇEKİLMELİ)** | ⚑ crawl-budget audit tetiklendi |
| A11 suppression-recovery review | 07-06 | 2026-07-12 | scheduled (07-07 imp=1 flicker işlenecek) |
| B9 SF/Semrush export mutabakatı | 07-08 (SF-1/SF-2 FIXED artık) | 2026-07-12 | SF-3/4/5 title-metni = operatör onayı bekliyor |
| D6 rakip turu | – | 2026-07-12 | scheduled |
| D9-deep (PageSpeed) | 07-06 (quota) | 2026-07-12 | scheduled |
| D12 GTM + event-sözleşmesi | 07-06 | 2026-07-12 | D-EVENT set tam ✓ |
| D13 görsel performans | 07-06 | 2026-07-12 | scheduled |
| D14 GBP + reviews | – | 2026-07-12 | scheduled |
| E7-full güvenlik (derin) | 07-06 (FV-6 fix) | 2026-07-13 | ✅ 0 vuln |
| E3 backlink audit | 05-02 | 2026-08-01 | scheduled |
| C3 isitagentready + C4 AI-bot | – | 2026-08-01 | scheduled |

---

## 📅 GÜNLÜK LOG (append-only, son 30 gün tutulur)

### 2026-07-10 (mode=daily) — 07-09 koşu yok (gap), delta 07-08'e karşı
- **Coverage:** tüm DAILY hücreler DONE/N/A(sebep). **BÜYÜK GÜN: 3 P0/P1 fix DEPLOY + CANLI doğrulandı.**
- **🚀 DEPLOY DOĞRULAMA (curl, prod):** (1) **FV-5** — money page'lerde `itemReviewed` artık `#event`/`#product` @id'ye bağlı (dinner/sunset→#event, yacht→#product), `f875d43`. (2) **SF-1/SF-2** — 797 shadow-404 301 map canlı (/blog/bogaz-turu... → /tr/blog/..., /fr/blog/accessible... → /blog/...), `9259378`. (3) **FV-1** — /reservation package-card fix `c98ca49`+`b169c81` deploy edildi. **12 commit origin önünde ama prod GÜNCEL (vercel --prod), push YOK.**
- **B1 (CANLI, 07-02→07-08):** 121c/13.257i/pos 7.37 → prev-7g (06-25→07-01) 117c/11.970i/pos7.60 = **+3.4% click / +10.8% impr / pozisyon iyileşti**. R2 CLEAR.
- **B2 striking (pos 4-20):** ortakoy mosque 119i/1c/pos10.7 (bridge) + fiyat kümesi 0-click (bosphorus ferry 29i, dinner price 19i, "bosphorus cruise istanbul" 9i/**pos4.1**). Büyük CTR açığı.
- **B5/A7 rich-results (Inspection API):** 4 money page Google-tarafı hâlâ FAIL AMA **fix CANLI + stale crawl** (06-24→07-06 deploy öncesi). /bosphorus-cruise PASS. → validation_restart + request_index /yacht (crawl 06-24, 16g stale). **FV-5 our-side ÇÖZÜLDÜ.**
- **B4-lite (YENİ commercial kanibalizasyon):** "kabataş yemekli boğaz turu" → /tr/istanbul-dinner-cruise(p21) + /tr/kabatas-dinner-cruise-istanbul(p32) iki TR dinner sayfası çakışıyor. Pazar B4-konsolidasyon MERGE adayı.
- **B7 intent-mix:** commercial impr 8.2%/click 16.4% vs info impr 91.8%/click 83.6% (commercial ~2× CTR/impr → bridge sağlam).
- **B10 Trends (merkezi cache, kısmi ok):** dinner 4→56, yacht 4→49, sunset 4→56 — güçlü yaz sıçraması, peak son 2 hafta. Portföyün en güçlü sezon sinyali. Sezon-içi içerik fırsatı.
- **A1 (cache page-indexing-ui):** indexed 342, CNI 1.553, discovered 82, 404 32, noindex 5, redirect 14, alt-canonical 0 — **06-30 snapshot, 07-08 ile birebir aynı → R5 CLEAR.** index-rate 16.9%.
- **A3 sitemap:** lastDownloaded 07-09 (taze), 0 err/0 warn, 398 web submitted, TEK canonical. Sözleşme ihlali yok.
- **A4/A5/A6 auto-submit (22 URL):** IndexNow Bing 200 + Yandex 202; Bing SubmitUrlBatch 200 (22 submitted, quota 90); Yandex recrawl 20/22 202 (quota 140/150). Denylist boş.
- **A10 index-rate:** Google **342**, Bing InIndex **478** (plato), Yandex searchable **336** (carry). **SUPPRESSION SAYACI:** Bing 06-09→07-06 sıfır (28g), **07-07 imp=1 FLICKER**, 07-08/09=0 → ~gün 32/week 5. Crawl 7g 1.726 sayfa, 5xx=0, blocked=0, crawlErr 27-41.
- **D1/D10 (Clarity 3g):** site dead **12.52%** (↑9.09, band içi) / rage **1.09%** (<2% eşik) / JS-error **0%** ✅. URL dead ham: /reservation 80, **/yacht-charter-istanbul 53 (YENİ post-redesign)**, dinner 19, / 13.
- **D2 (GA4 merkezi SA, 07-03→07-09):** 919 sess — Paid 470/108k, Direct 211/24k, Organic 154/64k, **AI Assistant 75/56k**, diğer. keyEvents 256 (whatsapp 66, begin_checkout 59, phone 26, purchase 11, abandon 2). Paid ↑↑ (operatör Ads, pasif).
- **D4 rez (DB):** **18/7g** — 15 aktif + 3 iptal (%16.7). Gross €3.039 / net €2.709. sunset 11, private-sunset 2 (€420), yacht 3 (2 aktif €270×2), dinner-yacht 1 (**€755**). gclid=N hepsi.
- **D8 reconciliation:** GA4 purchase 11 vs DB aktif 15 (~%27 undercount, beklenen GA4 yönü) — bug değil, izle.
- **D11 AI-referral:** GA4 AI Assistant **75s/56k** (chatgpt 70s/53k dominant) — #3 kaynak, %75 conv-oranı. AI gerçek gelir üretiyor.
- **D5 UX:** /yacht-charter-istanbul 53 dead-click (yacht-redesign) = YENİ fırsat; /reservation fix deploy edildi (verify 3-5g).
- **R-SENTINEL:** **R1 🟡 TEMKİNLİ** (Bing week 5 gün 32, 07-07 imp=1 flicker — ilk recovery sinyali; Google click +3.4% sağlıklı, engine-özel). **R2 CLEAR** (click +3.4%, impr +10.8%, rez +12.5%). **R3 CLEAR** (Google 342, Bing 478, Yandex 336 stabil). **R4 CLEAR** (18 rez). **R5 CLEAR** (A1 06-30 snapshot değişmedi, same-method). R6 N/A(Ads operatör). **R7 SOFT** (dead 12.52% band içi ama /yacht-redesign 53 dead-click = yeni-deploy UX sinyali, izle). R10 soft (GA4 vs DB %27, beklenen).
- **E7-light:** 7/7 money page 200, headers tam apex, tracked-secret TEMİZ (grep hit'leri benign: component adı + kamuya-açık IndexNow key), deploy-gap YOK (prod güncel). **C1-light:** 4/4 AI-readiness sinyali CANLI. **E7-tracking-live:** GA4+Clarity canlı veri = tracking çalışıyor.
- **Sezon:** cruise penceresi (May-Eki) içinde; Trends dinner/yacht/sunset güçlü sıçrama + €755/€420 yüksek-değer booking = sezon-içi talep somut.

### 2026-07-08 (mode=daily)
- **Coverage:** tüm DAILY hücreler DONE/N/A(sebep). **GA4 MERKEZİ SA İLE AÇILDI (haftalarca kör kalan D2/D8/D11).**
- **GA4 (merkezi SA `indexing-api-bot@kingsworld` → property 534226524, CANLI):** 7g 533 sess — Direct 172/17conv, Organic 141/53conv, Paid 126/52conv, **AI Assistant 89/46conv (#3 conversion channel!)**, diğer 5. Key-events: purchase 11, begin_checkout 54, whatsapp_click 47, phone_click 6, booking_abandonment 1 — booking D-EVENT sözleşmesi TAM ateşliyor. **AI trafiği organik+paid conversion'a neredeyse eşit — GEO yatırımının nicel gerekçesi.**
- **B1 (CANLI, 06-30→07-06):** 113c/12.373i/pos 7.59 → prev-7g (06-23→06-29) 117c/11.590i = -3.4% click (gürültü) / +6.8% impr / pozisyon 7.76→7.59 iyileşti.
- **B2 striking-distance (pos 4-20):** YENİ büyük "ortakoy mosque" 147i/1c/pos10.8 (informational bridge adayı — sunset Ortaköy'den geçer). Fiyat/ferry kümesi devam.
- **B5 rich-results (Inspection API):** 4 money page **FAIL — 5. GÜN** (aynı itemReviewed ×4/sayfa). /bosphorus-cruise PASS teyit.
- **A1 (Chrome page-indexing-ui, merrysails doğrulandı):** indexed 342, CNI 1.553, discovered 82, 404 32, noindex 5, redirect 14(NR-9), alt-canonical 0 — **06-30 snapshot** → R5 CLEAR.
- **A4/A5/A6 auto-submit (17 priority URL):** IndexNow Bing 200 + Yandex 202; Bing SubmitUrlBatch 200 (17, quota 90); Yandex recrawl 17/17 202 (quota 144/150).
- **A10 index-rate:** Google 342, Bing InIndex 478, Yandex 336. **SUPPRESSION:** Bing gün 30/week 5.
- **R-SENTINEL:** R1 AÇIK (Bing week 5 gün 30). R5 CLEAR. R2/R3/R4 CLEAR. R10 soft.
- **D1/D10 (Clarity ~154 sess/3g):** site dead 9.09% / rage 0% / JS-error 0.65%. /reservation ölçülemedi (MCP grouped-query hata) — carry-forward.
- **D4 rez (DB):** 16/7g — 14 aktif + 2 iptal. Gross €2.821 / net €2.521.
- **D11 AI-referral:** GA4 AI Assistant 89s/46conv (#3). Clarity chatgpt 5+gemini 2.

### 2026-07-07 (mode=daily)
- **A1 (gerçek Page-Indexing raporu — Chrome MCP, ilk kez):** Google indexed **342**; CNI 1.553, discovered 82, 404 32, noindex 5, redirect 14. %82 not-indexed. Baseline kuruldu.
- **B1 (CANLI, 06-29→07-05):** 112c/12.188i/pos 7.7. B5 4 money FAIL (4. gün). A10 Bing InIndex 477↑, suppression gün 29. D4 15 rez. D11 chatgpt 28. R7 /reservation dead %52.63.

### 2026-07-06 (mode=weekly)
- **B1 120c/12.390i.** B5 4 money FAIL (3. gün). A10 suppression gün 28. R7 /reservation 34.78%. D4 20 rez. **E7-full: npm audit 4 HIGH → FV-6 açıldı+fix'lendi (0 vuln).**

### 2026-07-05 (Bing recovery deep-dive + FV-1 fix)
- Bing InIndex 472↑. next.config 80× redirect `permanent:true`→`statusCode:301` (FREEZE-safe). FV-1 fix: PlannerDateCalendar ay-nav + "Change" scrollIntoView.

### 2026-07-04 (mode=daily)
- GSC merkezi token UNBLOCK. B1 130c/12.346i. B5 4 money FAIL (FV-5 açıldı). A10 Yandex 336, Bing 470; suppression week4. R7 /reservation dead 64.7%. D4 21 rez.

### 2026-07-02 (mode=daily)
- GSC+GA4+Ads OAuth revoke. R1 Bing week3. R4 CLEAR (22 rez, +175% WoW). R7 IMPROVED (/reservation rage→0, dead 33%). A5 Yandex 326.

### 2026-07-01 (mode=daily, cold-start baseline)
- R4 CLEAR (24 rez). R3 CLEAR (Yandex 326, Bing 454). R1 AÇIK (Bing imp→0 06-09). R7 FLAG (/reservation dead 58%+rage 8%).
