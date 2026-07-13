# MerrySails — DAILY OPS STATE
**Domain:** merrysails.com · **Vertical:** Tourism (Bosphorus cruise + yacht charter) · **Priority:** HIGH · **Ads:** Google Ads ON (~2K TRY/day)
**Karakter/Author byline:** Captain Ahmet (cruise/yacht) + Editorial (city guides) — NO cross-brand byline reuse with GoldenSunset
**Conversion truth:** `Reservation` table (DB, MRY-* IDs); GA4 booking event = `purchase` (brand-profile "reservation_submit" adı aspirasyonel — gerçek event `purchase`)
**Rakipler:** GetYourGuide, Viator/TripAdvisor, bosphorustour.com; sister GoldenSunset (differentiation: tier + demographic)
**Son güncelleme:** 2026-07-13 (mode=daily — 🎉 **BING SUPPRESSION RECOVERY TEYİT**: canlı API impr 07-09 **6/clk1** + 07-10 **21/clk2** → kapatma eşiği (imp>5 VE clk>0) 2 gün üst üste aşıldı, ~30 günlük sıfır-seri KIRILDI; SUPPRESSION-WATCH satırı KAPATILDI. /reservation dead-click **88→7/9sess** (FV-1 tentative iyileşme) + /yacht **55→1/39sess** (FV-9 çözüldü). E4 FREEZE temkinen 1-2 hafta korunuyor.)

---

## 📍 NEREDEYIZ — bugünkü snapshot (her run üstten güncellenir)
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

## 🎯 AÇIK FIRSATLAR (öncelik sırası)
1. **[YAPILDI 🎉 · R1 RECOVERY] Bing suppression KIRILDI.** Canlı API: 07-09 imp6/clk1 + 07-10 imp21/clk2 → kapatma eşiği (imp>5 VE clk>0) 2g üst üste aşıldı, ~30 günlük sıfır-seri bitti. SUPPRESSION-WATCH satırı KAPATILDI. **E4 FREEZE temkinen 1-2 hafta daha korunuyor** (recovery henüz 2 günlük — premature title/meta churn = re-trigger riski).
2. **[YAPILDI ✅ · FV-9] /yacht-charter-istanbul dead-click ÇÖZÜLDÜ** — 55/414 (07-11) → 1/39 (07-13). Post-redesign element-fix tuttu. Kapatıldı.
3. **[AÇIK · P1 · D5/FV-1 — tentative iyileşme] /reservation dead-click 88→7/9sess.** Per-session 2.75→0.78 düştü (iyi sinyal) AMA N=9 hafta-sonu düşük hacim → KAPATMA ERTELE, 1 koşu daha izle. İyileşmezse session-recording ile yeniden teşhis. Kod-session.
4. **[AÇIK-4g · P1 · A8 crawl-budget] 1.553 CNI (%82 not-indexed, index-rate 16.9% <%50).** A8 dead-inventory audit (weekly, geçen Pazar 07-12 kaçtı → bu hafta): sınıf-kırılımı (114-post /blog + /guides + locale + reservation query-param + event alt-sayfa) → noindex/410/sitemap-prune. Servis/commercial/indexli KALIR. **Portföy darboğazı = index-RATE, içerik-volümü değil.**
5. **[AÇIK · P1 · B13 REVENUE-RELEVANCE / INTENT-BRIDGE] commercial-trafik %16.4 (<%50).** Yüksek-impr ~0-click info sayfaları PARA KAZANDIRMIYOR: /blog/bosphorus-cruise-vs-ferry (1.652i/9c), /bosphorus-cruise-prices-istanbul (908i/2c), /guides/ortakoy-mosque (677i/2c). → intent-bridge (transactional CTA + 134-167 kelime answer block + BlogToPillarCta) — **body only, title FREEZE**. Money-page derinleştir.
6. **[AÇIK · P1 · B4-lite KONSOLİDASYON] 2 commercial kanibalizasyon:** (a) "akşam yemekli boğaz turu" → /tr/istanbul-dinner-cruise(p33) + /tr/kabatas-dinner-cruise-istanbul(p13); (b) "boat rental/hire istanbul" → /boat-rental-hourly-istanbul(p58) + /boat-rental-istanbul(p24). B4-konsolidasyon: MERGE (canonical/internal-link) — title DOKUNMA E4.
7. **[AÇIK · P1 · B5 rich-results] 2 money page FAIL kalıyor:** /istanbul-dinner-cruise (stale-crawl) + /tr/bosphorus-cruise (locale-remainder). chrome_queue: request_index /dinner + validation_restart "Review snippets". Fix our-side canlı, recrawl bekliyor.
8. **[AÇIK-sezon · P2 · İÇERİK] Yaz trend sıçraması** (Trends: TR cruise MoM+36% / GB +68%, yacht 4→47) → sezon-içi intent-bridge + answer-block refresh (İÇERİK, Ads DEĞİL — operatör alanı).
9. **[AÇIK · P2 · A5] Yandex NOT_IN_SPRAV** — Yandex Business kaydı (operatör, ~10 dk, tek açık Yandex rec).

## ⚠️ AÇIK SORUNLAR / FIX-VERIFY
- **[FV-4 · ✅ RECOVERY — KAPANDI]** Bing suppression: canlı API 07-09 imp6/clk1 + 07-10 imp21/clk2 → eşik aşıldı, ~30 günlük sıfır-seri kırıldı. SUPPRESSION-WATCH kapatıldı. E4 FREEZE 1-2 hafta daha (recovery stabilizasyonu).
- **[FV-9 · ✅ ÇÖZÜLDÜ]** /yacht-charter-istanbul dead-click 55→1/39sess. Post-redesign element-fix tuttu.
- **[FV-1 · P1 · tentative-iyileşme]** /reservation 88→7/9sess (per-sess 2.75→0.78). N=9 küçük → 1 koşu daha izle, kapatma erteli.
- **[FV-5 · ✅ 2/4 VALIDATED]** /yacht + /sunset rich=PASS. Kalan /dinner (stale-crawl) + /tr/bosphorus-cruise (locale-remainder) → chrome_queue recrawl bekliyor.
- **[FV-7 · P1 · AÇIK-4g]** 1.553 CNI (carry 06-30, A1 cache-miss). A8 audit bu hafta (07-12 Pazar kaçtı). bkz Fırsat #4.
- **[OAuth durumu]** GA4 merkezi SA ✅ (534226524), GSC merkezi token ✅. **Ads** operatör alanı (pasif).

## 🔍 SANA İŞ DÜŞEN (operator action)
- **A8 crawl-budget/dead-inventory audit (P1, weekly — 07-12 kaçtı):** 1.553 CNI sınıf-kırılımı + thin/410/sitemap-prune. Push ile çözülmez, portföy darboğazı index-RATE.
- **/reservation dead-click izle (P1):** 88→7/9sess iyileşti ama N küçük — 1 koşu daha, düzelmezse session-recording (kod-session).
- **Yandex Business kaydı** (NOT_IN_SPRAV) — yandex.com/business, ~10 dk.
- **Bing:** aksiyon YOK — 🎉 RECOVERY başladı, E4 FREEZE 1-2 hafta daha koru (premature churn = re-trigger). Site Scan (panel) opsiyonel.
- **Lumen #86820254 URL listesi** hâlâ bekliyor (submit-denylist.md operatör adımları).

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
