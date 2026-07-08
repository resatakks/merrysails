# MerrySails — DAILY OPS STATE
**Domain:** merrysails.com · **Vertical:** Tourism (Bosphorus cruise + yacht charter) · **Priority:** HIGH · **Ads:** Google Ads ON (~2K TRY/day)
**Karakter/Author byline:** Captain Ahmet (cruise/yacht) + Editorial (city guides) — NO cross-brand byline reuse with GoldenSunset
**Conversion truth:** `Reservation` table (DB, MRY-* IDs); GA4 booking event = `purchase` (brand-profile "reservation_submit" adı aspirasyonel — gerçek event `purchase`)
**Rakipler:** GetYourGuide, Viator/TripAdvisor, bosphorustour.com; sister GoldenSunset (differentiation: tier + demographic)
**Son güncelleme:** 2026-07-08 (mode=daily — GA4 MERKEZİ SA ile AÇILDI: AI Assistant = #3 conversion channel 89s/46conv)

---

## 📍 NEREDEYIZ — bugünkü snapshot (her run üstten güncellenir)
| Metrik | Bugün (2026-07-08) | 7g önce | 30g önce | Trend |
|---|---|---|---|---|
| **GSC clicks (7g, 06-30→07-06)** | **113** ✅ CANLI (merkezi token) | 117 (prev-7g 06-23→06-29) | – | ↔ -3.4% WoW (gürültü) |
| GSC impressions (7g) | **12.373** | 11.590 | – | ↑ +6.8% WoW |
| GSC avg position (7g) | **7.59** | 7.76 | – | ↑ iyileşti |
| **Google indexed (A1 UI — 06-30 snapshot)** | **342** | 342 | – | ↔ flat (GSC raporu 30-Haz'dan beri yenilenmedi) |
| **Google NOT-indexed sınıfları (A1 UI, method=page-indexing-ui)** | **crawled-not-indexed 1.553 · discovered 82 · 404 32 · noindex 5 · redirect 14(NR-9) · alt-canonical 0** | 1.553/82/32/5/14/0 | – | ↔ **DEĞİŞMEDİ (R5 CLEAR — büyüme yok, aynı 06-30 snapshot)** |
| **Bing impressions (canlı API)** | **0 (06-09→07-06, gün 30 / week 5)** ⚠️ | 0 | 30-35/gün (erken Haz) | ⛔ SUPPRESSION week 5 — crawl temiz |
| Bing InIndex | **478 (07-07)** | 476 | – | ↑ RISING (5xx=0, blocked=0, crawl issues=0) |
| Yandex searchable | **336** | 336 | – | ↔ stabil (excluded 3) |
| GSC sitemap | lastDownloaded **07-07** ✅ 0 err/0 warn, 594 submitted (tek kayıt) | 07-06 | – | ✅ taze, tek canonical |
| **Rich-results FAIL (money pages)** | **4 sayfa FAIL** (Review itemReviewed) — **5. GÜN** API teyit | 4 | – | ⛔ fix kodda HÂLÂ YOK (P0, 5 gündür açık — BAYAT) |
| Clarity sessions (3g, referrer-grouped) | **~154** | 173 | – | ↔ |
| Dead-click % (site 3g) | **9.09%** ✅ | 11.56% | 13.14% (06-01) | ↓ **İYİLEŞMEYE DEVAM** |
| Rage-click % (site 3g) | **0%** ✅ | 0% | ~8%/rez (07-01) | ✅ düşük |
| JS errors (Clarity, site 3g) | **0.65%** ✅ | 0% | 0 | ✅ negligible (translate-induced) |
| Dead-click (/reservation, session) | **N/A bu run** (Clarity URL-breakdown MCP hata verdi) — dünkü %52.63 doğrulanmadı | %52.63 (07-07) | 58.33% (07-01) | ⏳ ölçülemedi — carry-forward |
| **GA4 sessions (7g)** | **533** ✅ YENİ (merkezi SA) — Direct 172 / Organic 141 / Paid 126 / **AI Assistant 89** / diğer 5 | N/A (haftalarca oauth) | – | ✅ AÇILDI |
| **GA4 conversions (7g, tüm key-event)** | **172** (purchase 11, begin_checkout 54, whatsapp 47, phone 6, abandon 1) | N/A | – | ✅ AÇILDI |
| Ads spend / conv (7g) | N/A (🔒 operatör alanı) — pasif GA4 Paid: 126 sess / 52 conv | – | – | – |
| **Rezervasyon/lead (7g, DB)** | **16** (14 aktif + 2 iptal, %12.5) · ~€2.821 brüt / ~€2.521 iptalsiz | 15 (07-07) | 8 (prev-prev) | ↑ **TOPARLANDI** (2 yüksek-değer private: €755 + €420) |
| **AI referral (GA4 AI Assistant, 7g)** | **89 sess / 46 conv** ✅ **#3 conversion channel** | N/A | – | ✅ **GÜÇLÜ — organik + AI kanıtlı gelir** |
| AI referral (Clarity, 3g) | chatgpt 5 + gemini 2 = 7 | 28+2 (07-07) | 28 (07-01) | ↓ dar pencere gürültüsü (7g GA4 güçlü) |
| AI-visibility mention % | N/A (C1 lbm KALICI KALDIRILDI — 2026-07-06 operatör) | – | – | – |

**Rezervasyon dağılımı (7g, DB):** 16 rez · sunset-shared 10 (€30-102), private-sunset 1 (€420), yacht 4 (1 iptal €220; aktif €220-297), dinner-yacht 1 (**€755**). **İki yüksek-değer private booking (€755 + €420 = €1.175)** brütü dünkü €1.726'dan €2.821'e taşıdı. İptal %12.5 (stabil-düşük). gclid=Y sadece 1 (7915).
**Trafik kaynağı (GA4 7g):** Direct 172, Organic 141, Paid 126, **AI Assistant 89 (#3 conv)**, Cross-network 2, Referral 2, Social 1. (Clarity 3g referrer: null 79, google 59, chatgpt 5, gmail 4, bing 2, gemini 2, yandex 1, self 1.)
**GA4 event seti (booking-marka sözleşmesi — HEPSİ ATEŞLİYOR):** purchase 11 ✅ · begin_checkout 54 ✅ · whatsapp_click 47 ✅ · phone_click 6 ✅ · booking_abandonment 1 ✅. contact_submit 7g'de 0 (form gönderimi yok — bug değil). D-EVENT sözleşmesi TAM.
**D8 reconciliation:** GA4 purchase **11** vs DB rez **16** (aynı-pencere ~15) = ~%27 GA4-altında-DB. **Beklenen yön** (GA4 consent/adblock/AI-session altında-sayımı normal %15-30) — ikisi de sağlıklı/sıfır-değil → tracking-bug DEĞİL, izle (R10 soft).
**B2 striking-distance (pos 4-20):** **YENİ büyük: "ortakoy mosque" 147i/1c/pos10.8** (informational — sunset cruise Ortaköy'den geçer = bridge adayı) + fiyat/ferry kümesi (bosphorus ferry 34i/0c, sunset cruise 28i/0c, ferry vs cruise 22i/0c, dinner cruise price 21i/0c, "is bosphorus cruise worth it" 16i/1c/pos5.7, "bosphorus cruise istanbul" 9i/0c/pos4.2 top-3'e yakın). Neredeyse hepsi 0 click = büyük CTR açığı.
**B7 intent-mix (7g page-level, method farkı NOT):** commercial impr %8.8 / click %23.7 — informational impr %91.2 / click %76.3. (Not: bugünkü regex fiyat-blog'larını informational sayıyor; dünkü %68.4 ile method farklı — DİREKT karşılaştırma yapma. Değişmeyen tez: commercial sayfalar impression-başına ~3× daha yüksek CTR üretiyor → intent-bridge sağlam.)
**B10 Google Trends (TR, merkezi cache 07-08):** "bosphorus cruise" 12ay ort 62, son 4hf 65 (MoM +%7, istikrarlı büyüme, peak May 10-16); "yacht charter istanbul" son 4hf 25, güncel hafta peak (Jun 28-Jul 4, talep artışı); "dinner cruise istanbul" son 4hf 19 yükseliyor. Sezon-içi (May-Eki). Cache status=ok, helper çağrılmadı (429-önlem).
**A1 method=page-indexing-ui (Chrome MCP):** merrysails property doğrulandı; **GSC raporu freshness = 30.06.2026** (Son güncelleme) → 07-07 ile birebir aynı (indexed 342, CNI 1.553). Delta sıfır GERÇEK — GSC aggregate raporu 24 saatte yenilenmedi, büyüme yok → R5 CLEAR. Düzeltilen sınıf yok → "Doğrulamayı Yeniden Başlat" basılmadı.
**A7 request-index:** /tr/bosphorus-cruise **indexed→"Crawled - currently not indexed"e döndü** (07-08 02:39 taze crawl, fetch başarılı, indexing izinli = soft kalite/crawl-budget kararı, teknik blok DEĞİL). Chrome ile Request-Index DENENDİ ama **DOĞRULANAMADI** (tıklama anında GSC property'yi merrytourism'e otomatik değiştirdi — request-index modal'ı açılmadı = büyük ihtimalle kaydolmadı). "Emin değilsen BASMA" → **başarılı SAYILMADI**. URL zaten bugünkü auto-submit'te (IndexNow/Bing/Yandex 202). Gerçek çözüm = internal-link/içerik (GROWTH-PLAN Hamle 4), request-index değil.
**E7-light güvenlik:** 6/6 money page CANLI 200 (/, dinner, yacht, sunset, /reservation, /tr/bosphorus-cruise) · headers TAM apex'te (HSTS max-age 63072000 + CSP + X-Frame SAMEORIGIN + X-Content-Type nosniff + Referrer + Permissions) · secret/JWT-fallback taraması bu run curl-tabanlı (derin grep weekly E7-full). Kritik bulgu yok.
**C1-light AI-readiness (3+1 sinyal apex'te CANLI):** robots Content-Signal directive ✅ + `/.well-known/api-catalog` 200 ✅ + `Accept: text/markdown` → text/markdown 200 ✅ + llms.txt 200 ✅. (Proxy sinyal, gerçek AI-citation testi değil.)
**Repo notu:** branch `main`; recent commit'lerde title/H1 churn YOK (E4 FREEZE korunuyor), ReviewsCarousel.tsx'e dokunulmadı (FV-5 hâlâ açık, 5. gün).

## 🎯 AÇIK FIRSATLAR (öncelik sırası)
1. **[P0 · B5/FV-5 · BAYAT-5g] 4 money page Review `itemReviewed` FAIL — kod fix HÂLÂ yazılmadı.** /istanbul-dinner-cruise, /yacht-charter-istanbul, /cruises/bosphorus-sunset-cruise, /de/istanbul-dinner-cruise (her birinde 4× `Invalid object type for field "itemReviewed"`). Kaynak: `src/components/ui/ReviewsCarousel.tsx` — Review'ı sayfanın ana entity `@id`'sine bağla (dinner/sunset→Event, yacht→Product). Referans: /bosphorus-cruise PASS (bugün de teyit). Schema-only = FREEZE-safe. **5 gündür açık — en eski P0, artık BAYAT eşiğinde. Ayrı kod-session ŞART.**
2. **[P1 · A1 crawl-budget — AÇIK-1g] 1.553 "Tarandı-dizine eklenmedi" (%82 not-indexed, index-rate ~16.8%).** Sınıf DEĞİŞMEDİ (06-30 snapshot, büyümüyor — regresyon değil ama sistemik). **A8 dead-inventory audit** (next_due 07-13, öne çekilebilir): 1.553'ün URL sınıf-kırılımı (114-post /blog + /guides + locale varyant + reservation query-param + event alt-sayfa) → noindex/410/sitemap-prune. 404×32 ayrı kır. Servis/commercial/indexli KALIR.
3. **[P1 · INTENT-BRIDGE — büyük CTR açığı, AÇIK] fiyat sayfaları impression kanıyor, ~0 click:** /blog/bosphorus-cruise-prices-2026 (1.522i/2c), /bosphorus-cruise-prices-istanbul-2026 (892i/0c), /blog/bosphorus-cruise-vs-ferry-istanbul-2026 (1.403i/16c) = ~3.800 impr / ~18 click. **+ YENİ bridge adayı: "ortakoy mosque" 147i/pos10.8** (sunset cruise Ortaköy'den geçer). GROWTH-PLAN Hamle 2 (transactional CTA + 134-167 kelime self-contained answer block + BlogToPillarCta) uygula. Title FREEZE — sadece body.
4. **[P1 · A7/TR — internal-link, AÇIK, KÖTÜLEŞTİ] /tr/bosphorus-cruise indexed→crawled-not-indexed'e DÖNDÜ.** Günlük push'a rağmen 07-08 taze crawl sonrası Google dizinden düşürdü (soft kalite kararı). Push+request-index yetersiz kanıtlandı (bugün de request-index doğrulanamadı) → **kod-tarafı internal-link denetimi ŞART:** TR sayfalardan /tr/bosphorus-cruise'a link sayısı/konumu (GROWTH-PLAN Hamle 4). "boğaz turu" 6.600/mo KD~1 hedefi.
5. **[P1 · GA4 AÇILDI — YENİ, GEO validation] AI Assistant = #3 conversion channel (89 sess / 46 conv, 7g).** Merkezi SA ile GA4 açıldı; AI trafiği organik (53) + paid (52) conversion'a NEREDEYSE eşit (46). Bu, GROWTH-PLAN Hamle 2 (GEO/AI-citation içerik) yatırımının nicel gerekçesi. AI-citation pillar refresh + comparison cluster'ı önceliklendir.
6. **[P1 · FV-1/D5 · AÇIK] /reservation dead-click package-kart tıklanamazlığı** — bu run Clarity URL-breakdown MCP hata verdiği için ölçülemedi (site-geneli %9.09 iyileşiyor). Dünkü kök-neden kaydı geçerli: tüm package kartı = clickable label; maskeli fiyat pointer-events; "Continue booking" disabled-affordance; "(function(){…})" script-as-text araştır. Ayrı kod-session.
7. **[P2 · R1 SUPPRESSION · AÇIK-30g] Bing week 5, gün 30, imp 0 (07-06'ya kadar).** Teknik taraf TAM TEMİZ (InIndex 478↑, crawl issues 0, 5xx 0, blocked 0, sitemap 594/0-err). Title FREEZE + günlük submit sürüyor. ETA penceresi 07-07→08-04; eskalasyon eşiği (week 6 ~07-22) gelmedi. Operatör: Bing Site Scan (panel-only).
8. **[P2 · A5] Yandex NOT_IN_SPRAV** — Yandex Business kaydı (operatör, tek açık Yandex recommendation, değişmedi).

## ⚠️ AÇIK SORUNLAR / FIX-VERIFY
- **[FV-5 · P0 · BAYAT-5g]** 4 money page rich-results FAIL (Review itemReviewed) — kod fix bekliyor (`ReviewsCarousel.tsx`). En eski açık P0. bkz. Fırsat #1.
- **[FV-7 · P1 · AÇIK-1g]** 1.553 crawled-not-indexed + 82 discovered + 404×32. 06-30 snapshot, değişmedi (büyümüyor). A8 audit gerekli. bkz. Fırsat #2.
- **[FV-1 · P0 · ölçülemedi]** /reservation dead-click — bu run Clarity URL-breakdown MCP hatası; site-geneli %9.09'a iyileşti. Verify carry-forward.
- **[/tr/bosphorus-cruise · YENİ watch]** indexed→crawled-not-indexed (tek sayfa; toplam indexed 342 stabil = R3 değil). Internal-link işi (Fırsat #4).
- **[R1 SUPPRESSION — AÇIK week 5 gün 30]** bkz. Fırsat #7. `fix-verify-queue.md` FV-4. SUPPRESSION-WATCH gün 30.
- **[OAuth — GA4 AÇILDI ✅]** GA4 merkezi SA (`~/.agents/.gcp-service-account.json` → property 534226524) ÇALIŞIYOR — D2/D8/D11-GA4 CANLI. **Ads** hâlâ operatör alanı (pasif GA4 Paid okundu). **GSC merkezi token** ÇALIŞIYOR.

## 🔍 SANA İŞ DÜŞEN (operator action)
- **FV-5 kod fix (P0, 5. gün):** `ReviewsCarousel.tsx` — Review→ana entity @id (schema-only, FREEZE-safe). Ayrı kod-session, en yüksek öncelik.
- **A1 crawl-budget/A8 audit (P1):** 1.553 CNI'nin URL sınıf-kırılımı + thin/410/sitemap-prune. Push ile çözülmez.
- **/tr/bosphorus-cruise internal-link (P1):** TR sayfalardan içerik-içi link akışı (dizinden düştü, push yetersiz).
- **Manuel Request-Index:** bugün /tr/bosphorus-cruise DENENDİ ama GSC property-switch nedeniyle doğrulanamadı — sonraki interaktif koşuda tekrar dene (URL zaten auto-submit'te).
- **Yandex Business kaydı** (NOT_IN_SPRAV) — yandex.com/business, ~10 dk.
- **Bing:** aksiyon YOK — title FREEZE + Site Scan (panel) + sabır (week 5/6).
- **Lumen #86820254 URL listesi** hâlâ bekliyor (submit-denylist.md operatör adımları).

## 🗓️ WEEKLY/MONTHLY due-tracker
| Kontrol | Son | Next due | Durum |
|---|---|---|---|
| B3 rank sweep | 06-25 (rank-history) | 2026-07-12 (Pazar oto-weekly) | scheduled |
| B4 cannibalization + konsolidasyon | 07-06 (kısmi) | 2026-07-12 | scheduled |
| C1 AI-visibility (lbm) | – | – | ⛔ **KALICI KALDIRILDI (2026-07-06 operatör)** |
| **A8 dead-inventory** | – | **2026-07-12 (A1 keşfi ile ÖNE ÇEKİLMELİ)** | ⚑ crawl-budget audit tetiklendi |
| A11 suppression-recovery review | 07-06 | 2026-07-12 | scheduled |
| B9 SF/Semrush export mutabakatı | – | 2026-07-12 | scheduled (serpstat KALICI KALDIRILDI) |
| D6 rakip turu | – | 2026-07-12 | scheduled |
| D9-deep (PageSpeed) | 07-06 (quota-exceeded) | 2026-07-12 | scheduled |
| D12 GTM + event-sözleşmesi | 07-06 | 2026-07-12 | scheduled (bugün D-EVENT set tam doğrulandı) |
| D13 görsel performans | 07-06 | 2026-07-12 | scheduled |
| D14 GBP + reviews | – | 2026-07-12 | scheduled |
| E7-full güvenlik (derin) | 07-06 (FV-6 fix'lendi) | 2026-07-13 (Pazartesi) | ✅ 0 vuln |
| E3 backlink audit | 05-02 (disavow) | 2026-08-01 | scheduled |
| C3 isitagentready + C4 AI-bot erişim | – | 2026-08-01 | scheduled |

---

## 📅 GÜNLÜK LOG (append-only, son 30 gün tutulur)

### 2026-07-08 (mode=daily)
- **Coverage:** tüm DAILY hücreler DONE/N/A(sebep). **GA4 MERKEZİ SA İLE AÇILDI (haftalarca kör kalan D2/D8/D11).**
- **GA4 (merkezi SA `indexing-api-bot@kingsworld` → property 534226524, CANLI):** 7g 533 sess — Direct 172/17conv, Organic 141/53conv, Paid 126/52conv, **AI Assistant 89/46conv (#3 conversion channel!)**, diğer 5. Key-events: purchase 11, begin_checkout 54, whatsapp_click 47, phone_click 6, booking_abandonment 1 — booking D-EVENT sözleşmesi TAM ateşliyor. **AI trafiği organik+paid conversion'a neredeyse eşit — GEO yatırımının nicel gerekçesi.**
- **B1 (CANLI, 06-30→07-06):** 113c/12.373i/pos 7.59 → prev-7g (06-23→06-29) 117c/11.590i = -3.4% click (gürültü) / +6.8% impr / pozisyon 7.76→7.59 iyileşti.
- **B2 striking-distance (pos 4-20):** YENİ büyük "ortakoy mosque" 147i/1c/pos10.8 (informational bridge adayı — sunset Ortaköy'den geçer). Fiyat/ferry kümesi devam: bosphorus ferry 34i/0c, sunset cruise 28i/0c, ferry vs cruise 22i/0c, dinner cruise price 21i/0c, "is bosphorus cruise worth it" 16i/1c/pos5.7, "bosphorus cruise istanbul" 9i/0c/pos4.2. Neredeyse hepsi 0c = CTR açığı.
- **B5 rich-results (Inspection API):** 4 money page **FAIL — 5. GÜN** (aynı itemReviewed ×4/sayfa). /bosphorus-cruise PASS teyit. Kod fix hâlâ yok → FV-5 BAYAT eşiğinde.
- **A1 (Chrome page-indexing-ui, merrysails doğrulandı):** indexed 342, CNI 1.553, discovered 82, 404 32, noindex 5, redirect 14(NR-9), alt-canonical 0 — **06-30 snapshot, 07-07 ile birebir aynı** (GSC "Son güncelleme 30.06.2026" — rapor 24h yenilenmedi). Delta sıfır GERÇEK, büyüme yok → R5 CLEAR. Düzeltilen sınıf yok → validation-restart basılmadı.
- **A3 sitemap:** GSC lastDownloaded 07-07 (taze), 0 err/0 warn, 594 submitted, TEK canonical. Sözleşme ihlali yok. (Not: /tr/bosphorus-cruise inspection'ında "Site Haritaları: Geçici işleme hatası" — GSC-tarafı geçici, sitemap sağlıklı.)
- **A4/A5/A6 auto-submit (helper, 17 priority URL):** IndexNow Bing 200 + Yandex 202; Bing SubmitUrlBatch 200 (submitted 17, daily_quota 90); Yandex recrawl 17/17 202 (quota_remainder 144/150, searchable 336). Denylist boş (Lumen operatörde).
- **A7 inspect:** /tr/bosphorus-cruise indexed→"Crawled-not-indexed" (07-08 02:39 crawl, fetch OK, indexing izinli). Chrome Request-Index denendi — **doğrulanamadı** (property merrytourism'e switch etti, modal açılmadı) → başarılı SAYILMADI, sonraki interaktif koşuya devir. Diğer money page'ler indexed. Manuel kota fiilen 0 kullanıldı.
- **A10 index-rate:** Google **342**, Bing InIndex **478** (↑476), Yandex searchable **336** (=). index-rate ~16.8% (<%50 → A8 prune P0, ama stabil/büyümüyor). **SUPPRESSION SAYACI:** Bing 0-seri 06-09→07-06 = **gün 30 / week 5** (canlı GetRankAndTrafficStats). Crawl: 5xx 0, blocked 0, in4xx 0, crawlErrors 41 (hafif creep 39→41), crawled 229/gün.
- **R-SENTINEL:** **R1 AÇIK (Bing week 5, gün 30)** — carry-forward, engine-özel (Google click -3.4% gürültü, sağlıklı). **R5 CLEAR** (dünkü cold-start 1.553 büyümedi — 06-30 snapshot sabit). R2 CLEAR (click -3.4%, impr +6.8%, rez ↑16). R3 CLEAR (Google 342 stabil, Bing↑, Yandex =; /tr/bosphorus-cruise tek-sayfa dizinden düştü = watch, toplam düşmedi). R4 CLEAR (16 rez, 2 yüksek-değer). R6 N/A(Ads operatör). R7 CLEAR (site dead 9.09%↓, rage 0%, /reservation ölçülemedi). **R10 soft** (GA4 purchase 11 vs DB 16 ~%27 undercount — beklenen GA4 yönü, bug değil, izle).
- **D1/D10 (Clarity ~154 sess/3g):** site dead **9.09%** ✅ (↓11.56) / rage **0%** ✅ / JS-error **0.65%** (negligible, translate-induced). URL-bazlı dead-click breakdown + /reservation: **bu run çekilemedi** (MCP grouped-query "An error occurred" ×5; sadece total-query çalıştı) — carry-forward.
- **D4 rez (DB):** 16/7g — 14 aktif + 2 iptal (%12.5). Gross ~€2.821 / net ~€2.521. sunset-shared 10, private-sunset 1 (€420), yacht 4 (1 iptal), dinner-yacht 1 (**€755**). İki yüksek-değer private toparladı. gclid=Y 1.
- **D8 reconciliation:** GA4 purchase 11 vs DB 16 (~%27, beklenen GA4-undercount yönü) — tracking-bug değil, izle.
- **D11 AI-referral:** GA4 AI Assistant **89 sess/46 conv/7g** (#3 conv channel — GÜÇLÜ). Clarity 3g chatgpt 5+gemini 2 (dar pencere). AI GERÇEK ve gelir üretiyor.
- **B7 intent-mix:** commercial impr %8.8/click %23.7 vs informational impr %91.2/click %76.3 (method dünle farklı — direkt karşılaştırma yok; tez sağlam: commercial ~3× CTR).
- **B10 Trends (TR, merkezi cache):** bosphorus cruise +%7 MoM, yacht charter güncel-hafta peak, dinner cruise yükseliyor. Sezon-içi.
- **C1-light:** 3+1 AI-readiness sinyali apex'te CANLI. **E7-light:** 6/6 money page 200, headers tam apex, temiz.
- **Sezon:** cruise penceresi (May-Eki) içindeyiz; yacht charter Trends güncel-hafta peak + 2 yüksek-değer yacht/private booking = sezon-içi talep somut. Sezon-hazırlık içerik-fırsatı (Ads DEĞİL).

### 2026-07-07 (mode=daily)
- **Coverage:** tüm DAILY hücreler DONE/N/A(sebep). **BÜYÜK A1 KEŞFİ.**
- **A1 (gerçek Page-Indexing raporu — Chrome MCP, ilk kez):** Google indexed **342**; not-indexed: **CNI 1.553** (Başarısız), discovered 82, 404 **32**, noindex 5, redirect 14 (NR-9). **%82 not-indexed** — money-page örneklemi (22/22) bunu gizliyordu (07-06 acilkaseniz dersi). Baseline kuruldu.
- **B1 (CANLI, 06-29→07-05):** 112c/12.188i/pos 7.7 → prev 108c/11.332i = +3.7% click/+7.6% impr. B5 4 money FAIL (4. gün). A10 Bing InIndex 477↑, Yandex 336, suppression gün 29/week5. D4 15 rez. D11 chatgpt 28. R7 /reservation dead %52.63 (FV-1 çözülmüyor).

### 2026-07-06 (mode=weekly — coverage tam sweep)
- **Coverage:** tüm DAILY + WEEKLY (B4 kısmi, C1/B9/D9-deep blocked, D12/D13 done, E7-full done+FV-6). **B1 120c/12.390i.** B5 4 money FAIL (3. gün). A10 suppression gün 28. R7 /reservation 34.78% (iyileşme). D4 20 rez. **E7-full: npm audit 4 HIGH → FV-6 açıldı+fix'lendi (0 vuln).**

### 2026-07-05 (Bing recovery deep-dive + FV-1 fix)
- Bing InIndex 472↑, 5xx 0. next.config 80× redirect `permanent:true`→`statusCode:301` (FREEZE-safe). FV-1 fix: PlannerDateCalendar ay-nav + "Change" scrollIntoView (build ✅, push YOK).

### 2026-07-04 (mode=daily)
- GSC merkezi token UNBLOCK. B1 130c/12.346i (+49% WoW). B5 4 money FAIL (FV-5 açıldı). A10 Yandex 336, Bing 470; suppression week4. R7 /reservation dead 64.7%. D11 chatgpt 25. D4 21 rez.

### 2026-07-02 (mode=daily)
- GSC+GA4+Ads OAuth revoke. R1 Bing week3. R4 CLEAR (22 rez, +175% WoW). R7 IMPROVED (/reservation rage→0, dead 33%). A5 Yandex 326.

### 2026-07-01 (mode=daily, cold-start baseline)
- R4 CLEAR (24 rez). R3 CLEAR (Yandex 326, Bing 454). R1 AÇIK (Bing imp→0 06-09). R7 FLAG (/reservation dead 58%+rage 8%).
