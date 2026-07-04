# MerrySails — GROWTH PLAN (G2)
**Oluşturma:** 2026-07-02 · **Yenileme:** ayın 1'i · Günlük runner bu planı BAĞLAM olarak okur — günlük fırsat önceliklendirmesi buna hizmet eder.

## 🔒 OPERATÖR KARARI (kayıtlı — bağlayıcı, AYNEN taşındı)
- **WhatsApp TEK müşteri kanalı** tüm locale'lerde (ru dahil). Müşteriye Telegram CTA YOK (2026-06-02).
- **Cookie consent modal SKIPPED** — operatör riski kabul etti. Cookie banner ASLA eklenmez.
- **Max 1 deploy/gün, session sonu, önce lokal build.**
- **Title suffix " | MerrySails" şablondan gelir** — sayfa title'ına hardcode edilmez (47-char kaynak limiti).
- **Schema: ASLA `["TouristTrip","Product"]`** — `["TouristTrip","Service"]` kullanılır.
- **Voice: Captain Ahmet** (cruise/yacht) + Editorial (city guides). GoldenSunset/MerryTourism ile byline overlap YASAK.
- **Manuel indexing önceliği: yacht > sunset > dinner > compare hub.** Event alt-sayfaları düşük öncelik.

## Mevcut durum (2026-07-02)
- **Rezervasyon funnel güçlü ve büyüyor:** 22 rez/7g, €3.920, **+175% WoW** (prev-7g: 8). Sunset-cruise dominant (13). Sezon piki İÇİNDEYİZ (May-Eki; proposal piki Haz-Eyl).
- **R1 Bing suppression WEEK 3 (AÇIK):** impressions HARD-ZERO 06-11→06-30 (canlı doğrulandı); crawl+index sağlıklı (InIndex 454 rising, 18/18 money page 200). Recovery = title/meta/h1 FREEZE + IndexNow daily + 2-6 hafta sabır. Operatör aksiyonu YOK.
- **Index sağlıklı, rich-results KIRIK:** 8/10 priority URL indexed; ama **4 money page rich-results FAIL** — tek kök neden: standalone `Review` blokları `itemReviewed: Service` (geçersiz tip). `/bosphorus-cruise` PASS pattern'i referans.
- 1 doğrulanmış-unindexed: `/blog/best-bosphorus-sunset-cruise-istanbul-2026` (AI-citation listicle pilotu, crawled-not-indexed). `/tr/bosphorus-cruise` son crawl 05-13 (50 gün bayat — "boğaz turu" 6.600/mo KD~1 hedef sayfası).
- **AI-referral GERÇEK:** chatgpt.com 7 sess/3g. UX iyileşiyor: /reservation rage 0% (calendar fix prod'da), dead 33%↓; /istanbul-dinner-cruise 16.67% (FV-2 kodda pending).
- GSC search-analytics + GA4 + Ads **OAuth toplu revoke** → canlı trafik/conv verisi kör (Inspection API merkezi token ile çalışıyor).

## Büyüme hamleleri (öncelik sırasıyla)
1. **[P0 · teknik/rich-results] Review `itemReviewed: Service` → geçerli tip fix (schema-only, suppression-safe):** 4 money page'de (/istanbul-dinner-cruise, /de/istanbul-dinner-cruise, /yacht-charter-istanbul, /cruises/bosphorus-sunset-cruise) Review'ları sayfanın mevcut ana entity'sine bağla — dinner/sunset'te `Event` `@id`, yacht'ta `Product` `@id` (`/bosphorus-cruise` PASS pattern'i kopyala; TouristTrip+Service kuralı korunur). Tek paylaşılan komponent → tek fix. + P2: premium-yacht-15 Product'a GERÇEK first-party review+aggregateRating (uydurma yok). **Ölçüt: rich-results FAIL 4→0 (Inspection API re-check, 14 gün); yıldızlı snippet pik sezonda canlı.**
2. **[P1 · GEO/comparison cluster] "vs ferry" counter-narrative intent-bridge:** Reddit/AI konsensüsü "₺20 vapura bin" diyor — comparison/decision cluster'ı OWN et. `/blog/bosphorus-cruise-vs-ferry-istanbul-2026` (283 impr @ pos 6.5, %0.4 CTR — en yüksek-impression sayfa) body'sine BlogToPillarCta + transactional quote-block + 134-167 kelime self-contained answer block ("€X vs vapur: ne alıyorsun — proposal, kalabalık yok, hotel pickup, dinner"). Title/meta DOKUNMA, sadece body. + `/blog/best-bosphorus-sunset-cruise-istanbul-2026` listicle'ını sunset money page + ilgili bloglardan internal-link ile güçlendir → operatör manuel Request-Index (kuyruktaki tek aday). **Ölçüt: vs-ferry CTR %0.4→≥1.5 (GSC OAuth dönünce doğrula, 30 gün); listicle indexed ≤14 gün; ChatGPT referral 7→15+/3g.**
3. **[P1 · citation/offer] Review-velocity engine + Google Things to Do + Yandex Business:** 22 rez/7g = review yakıtı akıyor — post-cruise WhatsApp review isteği (hafta 1-2 sustained, GBP + Trustpilot); **Google Things to Do direct connection** (Bokun/FareHarbor, %0 komisyon) = AI Overview eligibility + booking link tek hamle; Yandex Business kaydı (NOT_IN_SPRAV — tek açık Yandex recommendation). **Ölçüt: ≥12 yeni GBP review/30 gün; Things to Do listing canlı (operatör hesabı gerektirir); NOT_IN_SPRAV kapandı.**
4. **[P1 · TR domestic] `/tr/bosphorus-cruise` tazeliği + "boğaz turu" (6.600/mo, KD~1, 0 paid rakip):** 50 gün bayat crawl'ı kır — TR sayfalardan içerik-içi internal link akışı artır, günlük Yandex Reindex (kota 144/150 boş) + IndexNow push'a TR money page'i sabitle. Title/meta değişikliği YOK — sadece link + push + gerekirse body zenginleştirme (Captain Ahmet first-party: saatlik/mevsimlik kalabalık pencereleri). **Ölçüt: Google son-crawl ≤14 gün; Yandex searchable stabil 326+; "boğaz turu" pozisyon ölçümü GSC dönünce (hedef top-10→top-3, 60 gün).**
5. **[P2 · UX/conversion] Pik-sezon dead-click temizliği (FV-2):** /istanbul-dinner-cruise breadcrumb'ı gerçek link + package-card title tıklanabilir yap (kodda PENDING); /reservation final verify (33% dead → <15%, 3-5 gün sonra Clarity ölçümü). **Ölçüt: money-page dead-click <5%; rez 22→30/7g pik sezonda (DB-truth).**

## YAPMA listesi (bu markada)
- ❌ **Title/meta/h1 değişikliği — FREEZE** (Bing suppression week 3; MerrySails 8-Haz çöküşünün kök nedeni title churn'dü). Body/data düzeltmesi OK, schema-only fix OK.
- ❌ **Ads hamlesi** — kampanya/bütçe/negative operatör alanı.
- ❌ **Yeni informational blog** — 114-post blog zaten Firefly-risk; %90 commercial kuralı; mevcut info sayfaları intent-bridge et (Hamle 2).
- ❌ **Sunset terim kümesi → Vesper'e, family/budget → GoldenSunset'e, saf private-yacht → LumaYacht'a bırak** (sister-brand cannibalization; B4 taraması denetler).
- ❌ Cross-brand byline (Captain Ahmet SADECE burada), sitewide footer cross-link, ABC triangle, funnel paylaşımı.
- ❌ `["TouristTrip","Product"]` schema (operatör kuralı) + `BoatTrip` schema (ferry-only, zero Google).
- ❌ Uydurma review/rating markup — premium-yacht-15'e sadece GERÇEK first-party review.
- ❌ DMCA'lı URL'leri auto-submit'e sokma (`submit-denylist.md` filtresi; Lumen #86820254 URL listesi operatörden bekleniyor).
- ❌ Cookie banner (operatör kuralı, tüm markalar).
