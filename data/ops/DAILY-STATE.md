# MerrySails — DAILY OPS STATE
**Domain:** merrysails.com · **Vertical:** Tourism (Bosphorus cruise + yacht charter) · **Priority:** HIGH · **Ads:** Google Ads ON (~2K TRY/day)
**Karakter/Author byline:** Captain Ahmet (cruise/yacht) + Editorial (city guides) — NO cross-brand byline reuse with GoldenSunset
**Conversion truth:** `Reservation` table (DB, MRY-* IDs); GA4 booking event = `purchase` (brand-profile "reservation_submit" adı aspirasyonel — gerçek event `purchase`)
**Rakipler:** GetYourGuide, Viator/TripAdvisor, bosphorustour.com; sister GoldenSunset (differentiation: tier + demographic)
**Son güncelleme:** 2026-07-17 (mode=daily — GSC 28g **392c/45.475i/pos7.9/strike9** (377→392, +4%, devam-toparlıyor; **GSC 7d CANLI N/A = OAuth token EXPIRED**). Bing suppression **RECOVERED-SUSTAINED** (07-13 imp42, baseline-üstü). **FV-1 /reservation dead-click ÇÖZÜLÜYOR: %36→%6.9 (29 sess)** — muhtemel sebep commit fd88234 booking-fix. A1 FRESH page-indexing-ui (06-30'dan beri ilk): CNI 1720, index-rate %15.6. FRESH DB rez: 16 (10 aktif, **cancel %37.5** soft-watch). E4 FREEZE korunuyor.)

---

## 📍 NEREDEYIZ — 2026-07-17 snapshot (A1 FRESH page-indexing-ui + FRESH DB rez + Bing canlı + Clarity 3g + auto-submit)
> **A1 BUGÜN TAZE** (page-indexing-ui, 06-30'dan beri ilk) → dünkü kayıt cache-miss'ti → **method-değişimi BASELINE** (R5 TETİKLENMEZ; CNI 1720 vs carry 1553 = gerçek taze sayı, regresyon değil). **GSC 7d/query/page/striking = N/A(gsc-token-EXPIRED)** merkezi+proje → B1 28g merkezi cache'ten (çalışıyor); B2/B11/B4-lite/A7-inspection CARRY. GA4 merkezi cache. Clarity 3g + Bing GetRankAndTrafficStats + DB rez CANLI.

| Metrik | Bugün (2026-07-17) | 7g/önceki (07-15) | Trend |
|---|---|---|---|
| GSC 28g (merkezi cache) | **392c / 45.475i / CTR 0.9% / pos 7.9** | 377c/44.390i (07-15) | strike:9 · ✅ +15c (+4.0%) devam |
| GSC 7d (CANLI) | **N/A(gsc-token-EXPIRED — merkezi+proje)** | 137c/16.038i (07-15) | ⚠️ operatör refresh gerek |
| Google indexed (A1 **FRESH** page-indexing-ui) | **341** | 342 carry | ↔ ilk taze (06-30'dan beri) |
| Google NOT-indexed (FRESH) | CNI **1720** · disc 64 · 404 36 · noindex 6 · redirect 16(NR-9) · alt-canon 0 | carry 1553/82/32/5/14/0 | BASELINE (method değişti, R5 YOK) |
| index-rate | **15.6%** (341/2181, <%50) | 16.9% | ⚠️ A8 prune P1 (taze sayı daha büyük) |
| Bing impressions (suppression) | **RECOVERED-SUSTAINED** — seri 6/21/18/19/**42** (07-09→07-13), baseline-ÜSTÜ | recovered | 🟢 gerçek toparlanma, watch KAPALI |
| Bing InIndex / Yandex searchable | ~478 / 336 (carry) | aynı | ↔ |
| GSC sitemap | 393 web + 196 img · 0 err (carry) · lastDownloaded 07-10 (**7g — stale eşiğinde**) | 07-10 | ⚠️ soft: 7g'de yenilenmezse "taranmıyor" |
| Rich-results money (our-side CANLI denetim) | **CLEAN** — r28 **0 ihlal**, tüm money **1 H1**, itemReviewed @id live | 2 fail | ✅ Google-side 2 pending (token-blocked verify) |
| Clarity rage / JS-err (site 3g) | **0% / 0%** ✅ | 0%/0% | ✅ temiz |
| **/reservation dead-click (3g)** | **6.9% (29 sess)** ✅ | %36.36 (4/11) | 🟢 **FV-1 RESOLVING 36→6.9 (N sağlam)** |
| /yacht-charter-istanbul dead-click (3g) | **6.25% (48 sess)** ✅ | 3.7% (1/27) | ✅ band-içi holds |
| **boutique-yacht-12** | **temizlendi — N=1 noise'du (taze veride sinyal yok)** | %22 (2/9) | ✅ sinyal düştü |
| Home / vs-ferry dead-click (3g) | 19.23% / 20% | – | ⚠️ CRO teşhis (entry-point) |
| GA4 (merkezi cache ~28g) | **2.637 sess / 2.259 users / 1.491 keyEvents** · google | 2.607/2.242/1.453 | ✅ ↑ CANLI (SA 534226524) |
| AI referral (GA4 ~28g) | **chatgpt 317 · gemini 8 · perplexity 2** = ~327 AI sess | 307/6/2 (07-15) | ✅ güçlü, chatgpt ↑ |
| Rezervasyon (7g, **FRESH DB**) | **16** → 10 aktif (3 conf + 7 new) · 6 iptal · **cancel %37.5** · ~€1.160 net-aktif | 18 carry (15akt/€2709) | ⚠️ cancel-rate DOUBLED (soft-watch) |
| Revenue-relevance (carry, B11 token-blocked) | commercial ~%47 · money-page-share DÜŞÜK | ~%47 (07-15) | ⚠️ intent-bridge P1 |
| Core-SEO scorecard | 12 pass / 2 fail / 22 na(weekly) = %85.7 | %85.7 | fail: index-rate + rich Google-side×2 |

## 📊 GA4 + CLARITY BUGÜN (2026-07-17) — sayılı mini-özet
1. **GA4 (merkezi cache ~28g):** 2.637 session / 2.259 users / 1.491 key-events · source=google dominant. AI-referral: **chatgpt 317** (↑307'den), gemini 8 (↑6), perplexity 2 = ~327 AI session (~%12) — organik AI kanalı güçlü ve büyüyor, chatgpt ezici.
2. **GSC 28g CANLI-cache:** 392c/45.475i/pos7.9, strike 8→9, +15c/+4.0% vs 07-15. Devam eden toparlanma (355→377→392). **GSC 7d fresh delta = N/A (OAuth token expired).**
3. **Clarity (3g money-page split):** rage **0%** ✅ · JS-err **0%** ✅ tüm sayfalarda. **/reservation 6.9% dead-click (29 sess)** — 07-15'teki %36.36'dan (11 sess) net düşüş, FV-1 RESOLVING. /yacht 6.25% (48 sess, holds). boutique-yacht-12 sinyali temizlendi (N=1 noise'du). home 19.23% + vs-ferry 20% (CRO teşhis adayı).
4. **Rez (FRESH DB 7g):** 16 total → 10 aktif · 6 iptal (**cancel %37.5** vs carry %16.7 = doubled) · ~€1.160 net-aktif. Baskın tur bosphorus-sunset (€34-150). 3 yacht iptali (€297/€220/€320) hepsi 07-14 CRO-block'tan ÖNCE = price-block DEĞİL. Sadece 1 gclid (Ads etkisi minimal).
5. **Yorum:** Trafik+AI+index toparlanıyor, Bing recovery sustained, FV-1 çözülüyor — sağlam gün. İki soft-watch: rez cancel-rate doubling (baseline stale, yarın true prev-7d) + GSC token expired (delta-detay bloke). "Her şey iyi" değil: home/vs-ferry dead-click CRO fırsatı açık.

## 📍 NEREDEYIZ — 2026-07-15 snapshot (arşiv)
> A1 yine chrome-cache-miss (a1-cache-2026-07-15 merrysails kaydı yok) → indexed carry 06-30, R5 baseline. GSC 7d/28g + query/page = merkezi token CANLI çekildi. Clarity 3g CANLI.

| Metrik | Bugün (2026-07-15) | 7g/önceki | Trend |
|---|---|---|---|
| GSC 28g (merkezi cache) | **377c / 44.390i / pos 7.9** | 355c/42.723i (07-13) | strike:8 · ↑ toparlıyor |
| GSC 7d (CANLI, 07-06..07-13) | **137c / 16.038i / CTR 0.85% / pos 7.39** | 133c/14.116i (prev-7d) | ✅ **WoW clicks +3.0%, impr +13.6%, pos↑** |
| Google indexed (A1 CACHE-MISS→carry) | 342 (carry 06-30) | 342 | ↔ N/A(chrome-cache-miss) |
| Google NOT-indexed (carry 06-30) | CNI 1.553 · disc 82 · 404 32 · noindex 5 · redirect 14(NR-9) | aynı | ↔ index-rate 16.9% <%50 (A8 P1) |
| Bing impressions (suppression) | **RECOVERED** (07-10 imp21/clk2; watch KAPALI) | 0-seri kırıldı | 🟢 |
| Bing InIndex / Yandex searchable | ~478 / 336 (carry) | 478 / 336 | ↔ |
| GSC sitemap | lastDownloaded 07-10, 0 err/0 warn, 393 web+196 img | 07-10 | ✅ sözleşme-temiz |
| Rich-results (money, carry Insp 07-11) | FAIL 2 (/dinner stale + /tr/bosphorus locale) · /yacht+/sunset PASS | 2 FAIL | ↔ recrawl bekliyor |
| Clarity dead-click % (site, from URL split) | rage **0%** · JS-err **0%** ✅ | – | temiz |
| **/reservation dead-click (3g)** | **%36.36 (4/11 sess) — AÇIK** ⚠️ | 7/9 (07-13) | 🔴 FV-1 ÇÖZÜLMEDİ, session-recording |
| /yacht-charter-istanbul dead-click (3g) | **3.7% (1/27)** ✅ | 1/39 (07-13) | ✅ FV-9 holds; quickback 18.5% izle |
| **YENİ: /yacht.../boutique-yacht-12** | **%22 dead-click (2/9)** | – | ⚠️ yeni CRO sinyali (kart-clickability) |
| GA4 (merkezi cache ~28g) | **2.607 sess / 2.242 users / 1.453 keyEvents** · google | 2.467/2.115/1.388 (07-13) | ✅ ↑ CANLI (SA 534226524) |
| AI referral (GA4 ~28g) | **chatgpt 307 · gemini 6 · perplexity 2** = ~315 AI sess | 304/6/2 (07-13) | ✅ güçlü, chatgpt ↑ |
| Rezervasyon (7g, DB carry) | 18 (15 aktif €2.709 net) | 18 | ↔ (fresh DB pull yok) |
| Revenue-relevance (top-page 7g click) | commercial ~%45-48 click · money-page-share DÜŞÜK (impr-bazlı %90 info) | %16.4 (07-13 impr-w.) | ⚠️ intent-bridge P1 |
| Core-SEO scorecard | 12 pass / 2 fail / 22 na(weekly) = %85.7 | %85.7 | fail: index-rate + rich×2 |

## 📊 GA4 + CLARITY BUGÜN (2026-07-15) — sayılı mini-özet
1. **GA4 (merkezi cache ~28g):** 2.607 session / 2.242 users / 1.453 key-events · source=google dominant. AI-referral: **chatgpt 307** (↑304'ten), gemini 6, perplexity 2 = ~315 AI session (~%12) — organik AI kanalı güçlü, chatgpt ezici.
2. **GSC 7d CANLI:** 137c/16.038i, WoW clicks **+3.0%** (07-11 -13.8% soft-watch RESOLVED = small-N noise'du), impr +13.6%, pos 7.56→7.39 iyileşti.
3. **Clarity (3g money-page split):** rage **0%** ✅ · JS-err **0%** ✅ tüm sayfalarda. **/reservation %36.36 dead-click (4/11)** ⚠️ · /yacht 3.7% (1/27, FV-9 holds ama quickback 18.5%) · **/yacht.../boutique-yacht-12 %22 (2/9) yeni** · /fr/reservation %50 (1/2 low-N, aynı rez-pattern).
4. **Yorum:** Trafik+AI+booking sağlıklı/toparlıyor; iki money-page dead-click açık: /reservation (FV-1 çözülmedi, kart/masked-price click yutuyor) + yeni yacht-detail sub-page. İkisi de aynı "kart tam clickable değil" pattern şüphesi → tek kod-session.

---

## 📍 NEREDEYIZ — 2026-07-13 snapshot (arşiv)
> Not: A1 yine cache-miss (a1-cache-2026-07-13 merrysails kaydı yok) → indexed carry 06-30 snapshot, R5 delta hesaplanamaz (baseline). GSC/GA4 = merkezi cache 28g (fresh 7d cache'te yok → carry).
| Metrik | Bugün (2026-07-13) | 7g/önceki | 30g | Trend |
|---|---|---|---|---|
| GSC 28g (merkezi cache) | **355c / 42.723i / 0.8% / pos 8.0** | 359c/43.343i (07-11) | – | strike:6 · ↔ hafif yumuşama |
| GSC clicks 7g (carry 07-11) | 112 (carry, taze 7d cache yok) | 130 (prev-7g) | – | N/A(fresh-7d-cache-miss) — 28g esas |
| **Google indexed (A1 CACHE-MISS → carry 06-30)** | **342 (carry)** | 342 | – | ↔ N/A(chrome-cache-miss) |
| **Google NOT-indexed (carry 06-30 snapshot)** | CNI 1.553 · disc 82 · 404 32 · noindex 5 · redirect 14(NR-9) · alt-canon 0 | 1.553/82/32/5/14/0 | – | ↔ carry (index-rate 16.9% <%50 P1) |
| **🎉 Bing impressions (CANLI API, veri 07-10'a kadar)** | **07-09 imp6/clk1 · 07-10 imp21/clk2 — RECOVERY** ✅ | 06-09→07-08 ~0 (07-07 imp1 flicker) | 15-23/gün pre-supp | 🟢 **SUPPRESSION KIRILDI — kapatma eşiği aşıldı 2g** |
| Bing crawl sağlığı (canlı) | 2xx 102/gün · 5xx **0** · blocked **0** · InLinks 2.694 · crawlErr 5-11 | – | – | ✅ TEKNİK TEMİZ |
| Bing InIndex | **~478 (carry)** | 478 | – | ↔ plato |
| Yandex searchable | **336** (carry, stabil) | 336 | – | ↔ stabil |
| GSC sitemap | lastDownloaded **07-10** ✅ 0 err/0 warn, 393 web + 196 image (TEK canonical) | 07-10 | – | ✅ taze, sözleşme-temiz |
| **Rich-results (money pages, carry Inspection 07-11)** | **FAIL 2** — /dinner (stale-crawl) + /tr/bosphorus-cruise (locale-remainder); /yacht + /sunset PASS ✅ | 2 FAIL | – | ↔ kalan 2 recrawl bekliyor |
| Clarity dead-click % (site 3g) | **11.63%** ✅ | 12.39% | 13.14% (06-01) | ↓ iyileşti, band içi |
| Clarity rage-click % (site 3g) | **0%** ✅ | 1.09% | ~8%/rez (07-01) | ↓ temiz |
| Clarity JS errors (site 3g) | **0%** ✅ | 0% | 0 | ✅ temiz |
| Clarity quickback % (site 3g) | 9.88% | 9.29% | – | ↔ band içi |
| **Dead-click ham (3g, URL)** | **/reservation 7/9sess ✅ · /yacht 1/39sess ✅** · fr/reservation 1 | /res 88/32 · /yacht 55/414 | – | 🟢 **/res FV-1 tentative-iyileşti (low-N) · /yacht FV-9 ÇÖZÜLDÜ** |
| **GA4 (merkezi cache ~28g)** | **2.467 sess / 2.115 users / 1.388 keyEvents** · google source · AI: chatgpt 304, gemini 6, perplexity 2 | 2.542/2.216/1.334 (07-11) | – | ✅ CANLI (merkezi SA 534226524) |
| Ads spend / conv | 🔒 operatör alanı — pasif GA4 (source=google dominant) | – | – | – |
| **Rezervasyon/lead (7g, DB carry)** | **18** (15 aktif €2.709 net · %16.7 iptal) | 18 (07-11) | 8 | ↔ stabil-güçlü (carry — DB fresh pull yok) |
| **AI referral (GA4 ~28g)** | **chatgpt 304 · gemini 6 · perplexity 2** = ~312 AI sess ✅ | 282/6/2 (07-11) | – | ✅ **GÜÇLÜ — organik AI kanıtlı gelir, chatgpt ↑** |
| Intent-mix / revenue-relevance (carry 7g) | commercial-click %16.4 · info-impr %91.8 → money-page share DÜŞÜK | ~ | – | ⚠️ commercial<%50 → intent-bridge P1 |
| Core-SEO scorecard (daily-14 subset) | **12 pass / 2 fail / 22 na(weekly)** = %85.7 | – | – | fail: index-rate 16.9% + rich-results×2 |
| AI-visibility mention % | N/A (C1 lbm KALICI KALDIRILDI — 2026-07-06 operatör) | – | – | – |

## 📊 GA4 + CLARITY BUGÜN (2026-07-13) — sayılı mini-özet
1. **GA4 (merkezi cache ~28g):** 2.467 session / 2.115 users / 1.388 key-events · source=google dominant. AI-referral: **chatgpt 304** (↑ 282'den), gemini 6, perplexity 2 = ~312 AI session (~%13) — organik AI kanalı güçlü, chatgpt ezici.
2. **GA4 booking (7g DB carry):** 18 rez, 15 aktif (€2.709 net), %16.7 iptal — booking-marka D-EVENT seti (purchase/begin_checkout/whatsapp/phone/abandon) tam ateşliyor (07-11 doğrulamalı; bugün DB fresh pull yok = carry).
3. **Clarity (3g, 07-11→07-13):** dead-click **11.63%** (↓12.39'dan, band içi 9-18) · rage **0%** ✅ · JS-error **0%** ✅ · quickback 9.88%.
4. **Clarity en sorunlu sayfalar (dramatik iyileşme):** **/reservation 7 dead-click / 9 sess** (FV-1 88→7, low-N ama per-sess 2.75→0.78 = tentative-iyileşti) · **/yacht-charter-istanbul 1 dead-click / 39 sess** (FV-9 55→1 = ÇÖZÜLDÜ). Hafta sonu düşük hacim, ama per-session oran ikisinde de düştü.
5. **Yorum:** Trafik/booking sağlıklı-stabil, AI kanalı güçleniyor (chatgpt 282→304). İki money-page dead-click darboğazı (rez + yacht) net iyileşme sinyali veriyor — /yacht kapanabilir, /reservation bir koşu daha izle (N=9 küçük). Site rage-click 0%.

**Rezervasyon (7g, DB):** 18 · confirmed 8 (€2.143) + new 7 (€566) = 15 aktif (€2.709 net) + cancelled 3 (€430) = %16.7 iptal. Stabil-güçlü.
**B2 striking-distance (pos 4-20, 7g):** "ortakoy mosque" 107i/1c/pos10.6 (info bridge, guides sayfası) + "bosphorus ferry" 32i/pos8.7 (info) + "bosphorus boat cruise" 1i/pos4.0. Commercial striking ince; asıl açık = fiyat/vs-ferry sayfaları yüksek-impr/~0-click.
**Intent-mix / CTR açığı (top-page 7g):** info-ağır — /blog/bosphorus-cruise-vs-ferry 1.652i/9c, /bosphorus-cruise-prices-istanbul-2026 **908i/2c**, /guides/ortakoy-mosque 677i/2c, /bosphorus-cruise-departure-points 577i/3c. Commercial money: /yacht 282i/4c, /sunset 159i/4c, /bosphorus-cruise 284i/2c. → intent-bridge (body-only) sağlam fırsat.
**B4-lite kanibalizasyon (COMMERCIAL):** (1) `"akşam yemekli boğaz turu"` → /tr/istanbul-dinner-cruise (22i/pos33) + /tr/kabatas-dinner-cruise-istanbul (1i/pos13) — TR dinner pillar+variant çakışması (07-10 sinyali DEVAM). (2) **YENİ:** `"boat rental istanbul"`/`"boat hire istanbul"` → /boat-rental-hourly-istanbul (p58-61) + /boat-rental-istanbul (p24-27) — iki boat-rental sayfası derin çakışıyor. Pazar B4-KONSOLİDASYON'a besle (canonical/internal-link; title DOKUNMA E4).
**B10 Trends (merkezi cache status=ok):** TR — Bosphorus cruise 56 avg (son4hf 64, MoM +36%), boğaz turu 28 avg (son4hf 57, MoM +10%, rising breakout: "şehir hatları boğaz turu bilet al"), yacht charter Istanbul 4→47 sıçrama. GB — Bosphorus cruise 18 avg (son4hf 42, MoM +68%), dinner cruise son4hf 42 (peak Tem 2026). **Yaz sezonu her iki pazarda güçlü ivme, EN sıçraması TR'den keskin** → intent-bridge + sezon-içi içerik fırsatı (Ads DEĞİL).
**A1 (chrome-cache-miss):** a1-cache-2026-07-11.json dosyası/kaydı YOK → **N/A(chrome-cache-miss)**. Indexed carry 342 (06-30 page-indexing-ui snapshot); taze page-indexing-ui olmadan sınıf-delta/R5 hesaplanamaz → R5 BASELINE (büyüme flag'lenmez). index-rate carry ~16.9%.
**A7 / rich-results (Inspection API — BÜYÜK):** FV-5 Google-side **VALIDATED**: /yacht-charter-istanbul **rich=PASS** ✅ + /cruises/bosphorus-sunset-cruise **rich=PASS** ✅ (ikisi de lastCrawl 07-10, indexed). Kalan FAIL 2: /istanbul-dinner-cruise (stale crawl 07-03, deploy öncesi) + /tr/bosphorus-cruise (locale-remainder — bugünkü commit `fix(schema) FV-5 locale remainder` bunu hedefliyor). → chrome_queue request_index /dinner + validation_restart "Review snippets". **Ayrıca /tr/bosphorus-cruise "Submitted and indexed"e GERİ DÖNDÜ ✅ (crawled-not-indexed'den flip — FV-8 çözüldü).**
**A3 sitemap:** lastDownloaded 07-10 (taze), 0 err/0 warn, 393 web + 196 image submitted, TEK canonical kayıt. Sözleşme ihlali yok (submitted 398→393 minor).
**A4/A5/A6 auto-submit (8 URL):** IndexNow Bing 200 + Yandex 202; Bing SubmitUrlBatch 200 (8, daily_quota 90); Yandex recrawl 8/8 202 (quota 144/150). Denylist boş.
**A10 index-rate/suppression:** Google 342 (carry), Bing InIndex ~478 (carry), Yandex 336. index-rate 16.9% (<%50 → prune P1). **🎉 SUPPRESSION SAYACI — RECOVERY:** canlı GetRankAndTrafficStats (veri 07-10'a kadar): 06-29→07-06 sıfır, 07-07 imp1, 07-08 sıfır, **07-09 imp6/clk1, 07-10 imp21/clk2** → kapatma eşiği (imp>5 VE clk>0) 2g üst üste aşıldı → ~30 günlük sıfır-seri KIRILDI. SUPPRESSION-WATCH satırı KAPATILDI (recovery). Crawl teknik TEMİZ (2xx 102, 5xx 0, blocked 0, InLinks 2.694, crawlErr 5-11).
**E7-light güvenlik (07-13):** 5/5 money page CANLI 200 · headers TAM apex (HSTS 63072000 + CSP + X-Frame SAMEORIGIN + nosniff) · **tracked-secret TEMİZ** (grep hit `TrustCredentialsBand.tsx` = dosya-adı false-pos) · **Deploy-gap YOK: 0 commit origin önünde** (git rev-list origin/main..HEAD = 0, prod senkron). E4 FREEZE korunuyor (bugün on-page mutasyon YOK).
**E7-tracking-live:** GA4 + Clarity CANLI VERİ (2.542 sess / 548 Clarity sess) → tracking çalışıyor.
**C1-light AI-readiness (proxy):** robots/api-catalog/llms.txt/Accept:markdown 200 (carry). Gerçek AI-citation kanıtı = GA4 AI-referral (chatgpt 282, güçlü).
**Repo notu:** branch `main`; title/H1 churn YOK (E4 FREEZE korunuyor). Prod güncel, origin senkron (deploy-gap 0). Bugünkü tek commit = FV-5 locale-remainder schema fallback.

## 🎯 AÇIK FIRSATLAR — 2026-07-17 (öncelik + yaşam-döngüsü)
1. **[AÇIK-8g · P1] A8 crawl-budget audit** — FRESH A1: CNI **1720** (carry 1553'ten büyük, gerçek taze sayı), index-rate **15.6%** (<%50). Weekly 07-12+07-13 KAÇTI → 2 hafta gecikti. Sınıf-kırılımı + 0-imp ölü ağırlık 410-prune + sitemap senkron. **Portföy darboğazı = index-RATE.**
2. **[YENİ · P1] GSC OAuth token EXPIRED** — hem merkezi (`/Users/resat/mcp-gsc/token.json`) hem proje (`.env.local` GSC_*) `invalid_grant`. A7 inspection + B2 striking + B11 intent-mix + B4-lite delta HEPSİ bloke. 28g merkezi cache kurtardı (B1). Operatör: `node scripts/gsc-oauth-refresh.mjs` veya re-auth.
3. **[YENİ · P1 · İZLE] Rez cancel-rate %37.5** (6/16 vs carry %16.7 = DOUBLED). Net-aktif €1.160 vs €2.709 stale-carry. AMA: 7 "new" pipeline'da + baseline stale (true prev-7d yok) → yarın FRESH prev-7d ile karşılaştır. 3 yacht iptali hepsi 07-14 CRO-block ÖNCESİ (price-block değil). Erken panik YOK, izle.
4. **[YAPILDI 🎉 · FV-1] /reservation dead-click ÇÖZÜLÜYOR** — %36.36(11) → **%6.9(29 sess)**. Muhtemel sebep: commit fd88234 "Event Yacht 90 doomed reservation flow" fix + önceki CRO (breadcrumb-mute + package-card). Yarın holds ederse FV-1 KAPAT.
5. **[AÇIK-Ng · P1] B13/B11 intent-bridge (money-first, carry)** — vs-ferry 2.215i + prices-2026 1.400i yüksek-impr ~0-click, PARA KAZANDIRMIYOR. 134-167 kelime commercial answer-block + reservation CTA + BlogToPillarCta→pillar. Body-only (title FREEZE E4). (fresh B11 token-blocked)
6. **[AÇIK-Ng · P1] B4 kanibalizasyon (COMMERCIAL, carry)** — (a) blog prices-2026 + commercial prices pillar; (b) TR kabatas-dinner + TR dinner pillar. Internal-link yönü + canonical netliği. Title DOKUNMA (E4).
7. **[AÇIK · P1] B5 rich Google-side ×2** — /dinner (stale-crawl 07-03) + /tr/bosphorus (locale). Our-side CANLI CLEAN (r28 0-ihlal, itemReviewed live). chrome_queue: request_index /dinner + validation_restart. Recrawl bekliyor (token-expired = Inspection verify bugün yapılamadı).
8. **[YENİ · P2 · CRO] Home 19.23% + vs-ferry 20% dead-click** — entry-point'te non-interactive element tıklanıyor (hero/badge/trust). Session-recording teşhis → affordance fix veya clickable yap.
9. **[AÇIK · P2] B2 striking (carry)** — /bosphorus-cruise pos4.6 top-3'e çok yakın → internal-link push (title DEĞİL). (fresh striking token-blocked)
10. **[AÇIK · P2] Yandex Business NOT_IN_SPRAV** — operatör ~10 dk.
11. **[İZLE · P2] /yacht quickback 18.5%** (07-15) — yeni CRO price-block sonrası bounce; price-shock mı? İzle.
12. **[AÇIK-sezon · P2 · İÇERİK] Yaz trend** (Trends TR bosphorus-cruise MoM+21% rising "tours istanbul"+90% / boğaz-turu rising "şehir hatları bilet al"+200%) → sezon-içi intent-bridge + answer-block refresh (İÇERİK, Ads DEĞİL).

## 🎯 AÇIK FIRSATLAR — 2026-07-15 (arşiv, öncelik + yaşam-döngüsü)
1. **[AÇIK-6g · P1] A8 crawl-budget audit** — 1.553 CNI, index-rate 16.9% (<%50). Weekly, 07-12 Pazar KAÇTI → hâlâ bekliyor. Sınıf-kırılımı + 0-imp ölü ağırlık 410-prune + sitemap senkron. Portföy darboğazı = index-RATE.
2. **[AÇIK-Ng · P1] B13/B11 intent-bridge (money-first)** — vs-ferry 2.215i/10c (pos5.7) + prices-2026 1.400i/5c + tipping 1.352i/3c = yüksek-impr info sayfalar ~0.4% CTR, PARA KAZANDIRMIYOR. DENE: 134-167 kelime commercial answer-block + reservation CTA + BlogToPillarCta→pillar. Body-only (title FREEZE E4).
3. **[AÇIK-Ng · P1] B4 kanibalizasyon (COMMERCIAL)** — (a) "bosphorus cruise prices": /blog/bosphorus-cruise-prices-2026 (1.400i) + /bosphorus-cruise-prices-istanbul-2026 (890i commercial pillar) ÇAKIŞIYOR → internal-link blog→pillar + canonical netliği; (b) TR dinner: /tr/kabatas-dinner-cruise (pos9.2, 313i) + TR dinner pillar. Title DOKUNMA (E4), sadece internal-link yönü.
4. **[AÇIK · P1] FV-1 /reservation dead-click ÇÖZÜLMEDİ** — %36.36 (4/11 sess), rage 0. Kart/masked-price container click yutuyor. Session-recording teşhis + package kart full-clickable `<label>` + masked-price `pointer-events:none`. Kod-session (escalated).
5. **[YENİ · P1] /yacht.../boutique-yacht-12 %22 dead-click (2/9)** — yacht-detail sub-page, muhtemelen FV-1 ile aynı kart-clickability pattern → tek kod-session'da beraber çöz.
6. **[AÇIK · P1] B5 rich-results ×2** — /dinner (stale-crawl 07-03) + /tr/bosphorus (locale-remainder). chrome_queue: request_index /dinner + validation_restart "Review snippets". Recrawl bekliyor.
7. **[AÇIK · P2] B2 striking** — /bosphorus-cruise pos4.6 (307i) top-3'e ÇOK yakın (commercial pillar) → internal-link güçlendir + freshness (title DEĞİL). + /bosphorus-cruise-prices-istanbul pos7.5 body-derinlik.
8. **[AÇIK · P2] Yandex Business NOT_IN_SPRAV** — operatör ~10 dk.
9. **[İZLE · P2] /yacht quickback 18.5% (5/27)** — yeni CRO price-block sonrası bounce; price-shock mı? 1 koşu daha izle.

## 🎯 AÇIK FIRSATLAR (arşiv 2026-07-13)
1. **[YAPILDI 🎉 · R1 RECOVERY] Bing suppression KIRILDI.** Canlı API: 07-09 imp6/clk1 + 07-10 imp21/clk2 → kapatma eşiği (imp>5 VE clk>0) 2g üst üste aşıldı, ~30 günlük sıfır-seri bitti. SUPPRESSION-WATCH satırı KAPATILDI. **E4 FREEZE temkinen 1-2 hafta daha korunuyor** (recovery henüz 2 günlük — premature title/meta churn = re-trigger riski).
2. **[YAPILDI ✅ · FV-9] /yacht-charter-istanbul dead-click ÇÖZÜLDÜ** — 55/414 (07-11) → 1/39 (07-13). Post-redesign element-fix tuttu. Kapatıldı.
3. **[AÇIK · P1 · D5/FV-1 — tentative iyileşme] /reservation dead-click 88→7/9sess.** Per-session 2.75→0.78 düştü (iyi sinyal) AMA N=9 hafta-sonu düşük hacim → KAPATMA ERTELE, 1 koşu daha izle. İyileşmezse session-recording ile yeniden teşhis. Kod-session.
4. **[AÇIK-4g · P1 · A8 crawl-budget] 1.553 CNI (%82 not-indexed, index-rate 16.9% <%50).** A8 dead-inventory audit (weekly, geçen Pazar 07-12 kaçtı → bu hafta): sınıf-kırılımı (114-post /blog + /guides + locale + reservation query-param + event alt-sayfa) → noindex/410/sitemap-prune. Servis/commercial/indexli KALIR. **Portföy darboğazı = index-RATE, içerik-volümü değil.**
5. **[AÇIK · P1 · B13 REVENUE-RELEVANCE / INTENT-BRIDGE] commercial-trafik %16.4 (<%50).** Yüksek-impr ~0-click info sayfaları PARA KAZANDIRMIYOR: /blog/bosphorus-cruise-vs-ferry (1.652i/9c), /bosphorus-cruise-prices-istanbul (908i/2c), /guides/ortakoy-mosque (677i/2c). → intent-bridge (transactional CTA + 134-167 kelime answer block + BlogToPillarCta) — **body only, title FREEZE**. Money-page derinleştir.
6. **[AÇIK · P1 · B4-lite KONSOLİDASYON] 2 commercial kanibalizasyon:** (a) "akşam yemekli boğaz turu" → /tr/istanbul-dinner-cruise(p33) + /tr/kabatas-dinner-cruise-istanbul(p13); (b) "boat rental/hire istanbul" → /boat-rental-hourly-istanbul(p58) + /boat-rental-istanbul(p24). B4-konsolidasyon: MERGE (canonical/internal-link) — title DOKUNMA E4.
7. **[AÇIK · P1 · B5 rich-results] 2 money page FAIL kalıyor:** /istanbul-dinner-cruise (stale-crawl) + /tr/bosphorus-cruise (locale-remainder). chrome_queue: request_index /dinner + validation_restart "Review snippets". Fix our-side canlı, recrawl bekliyor.
8. **[AÇIK-sezon · P2 · İÇERİK] Yaz trend sıçraması** (Trends: TR cruise MoM+36% / GB +68%, yacht 4→47) → sezon-içi intent-bridge + answer-block refresh (İÇERİK, Ads DEĞİL — operatör alanı).
9. **[AÇIK · P2 · A5] Yandex NOT_IN_SPRAV** — Yandex Business kaydı (operatör, ~10 dk, tek açık Yandex rec).

## ⚠️ AÇIK SORUNLAR / FIX-VERIFY (2026-07-17)
- **[FV-1 · 🎉 RESOLVING → yarın KAPAT]** /reservation dead-click %36.36(11 sess) → **%6.9(29 sess)**. Sağlam N. Muhtemel sebep commit fd88234 booking-fix + önceki CRO. Yarın holds ederse kapat.
- **[FV-4 · ✅ RECOVERED-SUSTAINED]** Bing suppression: seri 6/21/18/19/**42** (07-13) — flicker değil, pre-supp baseline üstünde. Watch kapalı. E4 FREEZE ~1 hafta daha (temkinli).
- **[FV-9 · ✅ ÇÖZÜLDÜ/holds]** /yacht dead-click 6.25%/48sess band-içi. Kapalı kalır.
- **[FV-5 · ✅ 2/4 VALIDATED · kalan 2 recrawl]** /yacht + /sunset rich=PASS. /dinner (stale) + /tr/bosphorus (locale) our-side CLEAN (r28 0-ihlal, itemReviewed live) → chrome_queue recrawl bekliyor. **Google-side verify bugün N/A (Inspection token expired).**
- **[FV-7 · P1 · AÇIK-8g]** FRESH A1: CNI **1720** (gerçek taze, carry 1553'ten büyük), index-rate 15.6%. A8 audit 2 hafta gecikti. bkz Fırsat #1.
- **[YENİ · P1 · TOKEN]** GSC OAuth token EXPIRED (merkezi + proje) → A7/B2/B11/B4-lite delta bloke. GA4 merkezi SA ✅ (534226524). Ads operatör alanı (pasif).
- **[İZLE · P1]** Rez cancel-rate %37.5 (6/16, DOUBLED) — soft-watch, yarın true prev-7d.

## 🔍 SANA İŞ DÜŞEN (operator action)
- **GSC OAuth token refresh (P1 · YENİ):** merkezi + proje token `invalid_grant`. `node scripts/gsc-oauth-refresh.mjs` / re-auth. A7 inspection + B2 striking + B11 intent-mix bu olmadan çalışmıyor.
- **A8 crawl-budget/dead-inventory audit (P1, weekly — 2 hafta gecikti):** CNI 1720 sınıf-kırılımı + thin/410/sitemap-prune. Push ile çözülmez, darboğaz index-RATE.
- **Yandex Business kaydı** (NOT_IN_SPRAV) — yandex.com/business, ~10 dk.
- **Bing:** aksiyon YOK — RECOVERED-SUSTAINED. E4 FREEZE ~1 hafta daha koru (premature churn = re-trigger).
- **Lumen #86820254 URL listesi** hâlâ bekliyor (submit-denylist.md operatör adımları).

## 🗓️ WEEKLY/MONTHLY due-tracker
| Kontrol | Son | Next due | Durum |
|---|---|---|---|
| B3 rank sweep | 06-25 | 2026-07-19 (Pazar oto-weekly) | scheduled |
| B4 cannibalization + konsolidasyon | 07-10 (kabatas sinyali) | 2026-07-19 (gecikti) | scheduled — YENİ commercial sinyal besle |
| C1 AI-visibility (lbm) | – | – | ⛔ **KALICI KALDIRILDI (2026-07-06 operatör)** |
| **A8 dead-inventory** | – | **2026-07-19 (2 hafta gecikti — ÖNCELİK)** | ⚑ crawl-budget audit tetiklendi |
| A11 suppression-recovery review | 07-06 | 2026-07-19 (gecikti) | scheduled (07-07 imp=1 flicker işlenecek) |
| B9 SF/Semrush export mutabakatı | 07-08 (SF-1/SF-2 FIXED artık) | 2026-07-19 (gecikti) | SF-3/4/5 title-metni = operatör onayı bekliyor |
| D6 rakip turu | – | 2026-07-19 (gecikti) | scheduled |
| D9-deep (PageSpeed) | 07-06 (quota) | 2026-07-19 (gecikti) | scheduled |
| D12 GTM + event-sözleşmesi | 07-06 | 2026-07-19 (gecikti) | D-EVENT set tam ✓ |
| D13 görsel performans | 07-06 | 2026-07-19 (gecikti) | scheduled |
| D14 GBP + reviews | – | 2026-07-19 (gecikti) | scheduled |
| E7-full güvenlik (derin) | 07-06 (FV-6 fix) | 2026-07-13 | ✅ 0 vuln |
| E3 backlink audit | 05-02 | 2026-08-01 | scheduled |
| C3 isitagentready + C4 AI-bot | – | 2026-08-01 | scheduled |

---

## 📅 GÜNLÜK LOG (append-only, son 30 gün tutulur)

### 2026-07-17 (mode=daily)
- **Coverage:** tüm DAILY hücreler DONE/N/A(sebep). **KAZANIM: 🎉 FV-1 /reservation dead-click %36→%6.9 (29 sess) RESOLVING + Bing suppression RECOVERED-SUSTAINED (imp42 baseline-üstü) + GSC 28g +4% (377→392) + boutique-yacht-12 noise temizlendi.**
- **A1 FRESH (page-indexing-ui, 06-30'dan beri ilk):** indexed 341 · CNI **1720** · disc 64 · 404 36 · noindex 6 · redirect 16(NR-9). Method-değişimi → **BASELINE** (dün cache-miss'ti, R5 TETİKLENMEZ; 1720 gerçek taze sayı, carry 1553 regresyon değil). index-rate **15.6%** (<%50, A8 P1).
- **GSC:** 28g merkezi cache 392c/45.475i/pos7.9/strike9 (+15c/+4%). **GSC 7d/query/page/striking = N/A (OAuth token EXPIRED merkezi+proje — P1 operatör refresh).**
- **Bing (canlı GetRankAndTrafficStats):** seri 07-09 imp6/clk1 → 07-10 imp21/clk2 → 07-11 imp18 → 07-12 imp19 → **07-13 imp42** = SUSTAINED recovery, pre-supp baseline (15-23) ÜSTÜNDE. R1 tamamen temiz.
- **GA4 28g:** 2.637s/2.259u/1.491ke · AI chatgpt **317**↑/gemini8/perplexity2 = ~327 AI sess. Clarity: rage 0%, JS 0%, /reservation 6.9%/29, /yacht 6.25%/48, home 19.23%, vs-ferry 20%.
- **Rez (FRESH DB 7g):** 16 → 10 aktif (3 conf + 7 new) · 6 iptal (**cancel %37.5** vs carry %16.7 DOUBLED) · ~€1.160 net-aktif. Baskın sunset-cruise. 3 yacht iptali hepsi 07-14 CRO-block ÖNCESİ (price-block değil). Soft-watch.
- **Rich-results our-side CANLI:** CLEAN — r28 **0 ihlal**, tüm money **1 H1**, /dinner itemReviewed @id live. Google-side 2 pending (token-blocked verify).
- **Auto-submit (15 URL):** IndexNow Bing200/Yandex202 · Bing batch200(q77) · Yandex 15/15 202(q150). Denylist boş.
- **E7-light:** 7/7 money 200 · headers tam (HSTS+CSP+XFO+nosniff) · secret temiz (TrustCredentialsBand.tsx false-pos) · deploy-gap **0** (origin senkron) · yeni commit fd88234 canlı.
- **Core-SEO:** 12 pass/2 fail(index-rate 15.6% + rich Google-side×2)/22 na = %85.7.
- **Açık P1:** GSC token refresh (YENİ blocker) · A8 crawl-budget (2 hafta gecikti) · intent-bridge/B4 (carry, token-blocked) · rich Google-side×2 recrawl · rez cancel-rate izle.

### 2026-07-13 (mode=daily)
- **Coverage:** tüm DAILY hücreler DONE/N/A(sebep). **KAZANIM: 🎉 Bing suppression RECOVERY (imp 6→21, clk 1→2, ~30g sıfır-seri kırıldı) + /yacht dead-click çözüldü (55→1) + /reservation tentative iyileşme (88→7).**
- **Bing canlı API:** 07-09 imp6/clk1, 07-10 imp21/clk2 → SUPPRESSION-WATCH satırı kapatıldı. E4 FREEZE 1-2 hafta temkinen korunuyor.
- **GSC 28g:** 355c/42.723i/pos8.0/strike6 (07-11 359c'den hafif yumuşama). A1 yine cache-miss → indexed 342 carry, R5 baseline.
- **GA4 28g:** 2.467s/2.115u/1.388ke · AI chatgpt 304↑/gemini6/perplexity2. Clarity: dead 11.63%↓, rage 0%, JS 0%.
- **Auto-submit:** 8 URL — IndexNow Bing200/Yandex202, Bing batch200(q90), Yandex 8/8 202(q144).
- **Core-SEO scorecard:** daily-14 subset 12 pass/2 fail (index-rate 16.9% + rich×2)/22 na-weekly = %85.7.
- **E7-light:** 5/5 money 200, headers tam, secret temiz, deploy-gap 0. Trends cache=ok (yaz sıçraması).
- **Açık P1:** A8 crawl-budget audit (07-12 kaçtı), intent-bridge/revenue-relevance (commercial %16.4), B4 konsolidasyon, rich-results×2 recrawl.

### 2026-07-11 (mode=daily)
- **Coverage:** tüm DAILY hücreler DONE/N/A(sebep). **KAZANIM: FV-5 Google-side 2/4 VALIDATED + /tr/bosphorus-cruise re-indexed.**
- **B1 (CANLI, 07-03→07-09):** **112c**/13.573i/CTR 0.83%/pos **7.21** → prev-7g (06-26→07-02) 130c/12.346i/pos7.71 = **click -13.8% WoW** (SOFT-WATCH, small-N 18 click) / impr +9.9% / **pos iyileşti**. CTR 1.05→0.83 (impr↑/CTR↓ → long-tail veya AIO; pos iyileşti = rank-loss DEĞİL). 28g merkezi cache: 359c/43.343i/pos7.9.
- **B2 striking (pos 4-20):** ortakoy mosque 107i/1c/pos10.6 (bridge) + bosphorus ferry 32i/pos8.7. Commercial striking ince; asıl açık fiyat/vs-ferry yüksek-impr-0-click.
- **B5/A7 rich-results (Inspection API — BÜYÜK):** /yacht **PASS** ✅ + /sunset **PASS** ✅ (FV-5 Google-side validated, lastCrawl 07-10). FAIL 4→2 (/dinner stale-crawl 07-03 + /tr/bosphorus-cruise locale-remainder). /tr/bosphorus-cruise **"Submitted and indexed"e döndü** (FV-8 çözüldü). → chrome_queue request_index /dinner + validation_restart Review snippets.
- **B4-lite kanibalizasyon:** (a) "akşam yemekli boğaz turu" TR dinner pillar+kabatas (p33+p13, DEVAM); (b) YENİ "boat rental/hire istanbul" 2 sayfa (hourly p58 + istanbul p24). Pazar B4-MERGE.
- **B7/B11 intent-mix:** top-page info-ağır (vs-ferry 1.652i/9c, prices 908i/2c, ortakoy 677i/2c). Commercial money düşük-click → intent-bridge sağlam.
- **B10 Trends:** N/A(trends-blocked) merkezi cache. Carry 07-10 dinner/yacht/sunset güçlü yaz sıçrama.
- **A1:** **N/A(chrome-cache-miss)** — a1-cache-2026-07-11.json yok. Indexed carry 342 (06-30). Taze page-indexing-ui yok → R5 baseline (delta hesaplanamaz).
- **A3 sitemap:** lastDownloaded 07-10 (taze), 0 err/0 warn, 393 web + 196 image, TEK canonical. Sözleşme temiz.
- **A4/A5/A6 auto-submit (15 URL):** IndexNow Bing 200 + Yandex 202; Bing SubmitUrlBatch 200 (15, quota 90); Yandex recrawl 15/15 202 (quota 144/150). Denylist boş.
- **A10 index-rate/suppression:** Google 342 (carry), Bing InIndex ~478 (carry, API scheme-err), Yandex 336. **SUPPRESSION:** Bing 06-09→07-08 sıfır (07-07 imp=1 tek flicker), **sustained recovery YOK** → ~gün 33/week 5. Crawl teknik TEMİZ (2xx 102, 5xx 0, blocked 0, InLinks 2.694, crawlErr 5-11).
- **D1/D10 (Clarity 3g, 548 sess):** dead **12.39%** / rage **1.09%** / JS-error **0%** ✅ / quickback 9.29%. URL dead ham: **/reservation 88/32sess (FV-1 DÜZELMEDİ)**, /yacht-charter-istanbul 55/414sess, boutique-yacht-12 6, group-yacht-40 6.
- **D2/D11 (GA4 merkezi cache ~28g):** 2.542 sess / 2.216 users / 1.334 keyEvents · source=google. AI-referral chatgpt 282, gemini 6, perplexity 2 (~%11, chatgpt ezici).
- **D4 rez (DB, 7g):** **18** — confirmed 8 (€2.143) + new 7 (€566) = 15 aktif (€2.709 net) + cancelled 3 (€430) = %16.7 iptal.
- **D5 UX:** /reservation FV-1 verify BAŞARISIZ (eskale) + /yacht post-redesign 55 dead — iki money-page UX P1.
- **R-SENTINEL:** **R1 🟡** (Bing suppression week 5 gün 33, sustained recovery YOK). **R2 🟡 SOFT-WATCH** (Google click -13.8% WoW, <40% eşik + small-N; impr+9.9%/pos iyileşti = hard-flag DEĞİL, izle). **R3 CLEAR** (indexed stabil + /tr/bosphorus-cruise re-indexed = iyileşme). **R4 CLEAR** (18 rez). **R5 CLEAR/baseline** (A1 cache-miss, taze delta yok). R6 N/A(Ads). **R7 SOFT** (dead 12.39% band içi; /reservation FV-1 düzelmedi = izle). R10 soft (GA4/DB beklenen).
- **E7-light:** 7/7 money 200, headers tam apex, tracked-secret TEMİZ (benign filename), **deploy-gap 0** (operatör push etti, prod senkron; bugün tek commit FV-5 locale-remainder schema = E4-safe targeted). **C1-light:** AI-readiness carry pass. **E7-tracking-live:** GA4+Clarity canlı.
- **Sezon:** cruise penceresi (May-Eki) içinde, Trends güçlü + €2.709 net booking = talep somut.

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
