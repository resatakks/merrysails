# Fix-Verify Queue (MerrySails)
**Son güncelleme:** 2026-07-08

> GSC "Sayfalar / neden dizine eklenmiyor" sınıf-raporu API'de yok (UI-only) → A1 sınıf-delta operatör UI'sinden. Rich-results + coverage tek-URL doğrulaması Inspection API ile CANLI (merkezi token).

## AÇIK (fix bekliyor / verify bekliyor)

### FV-1 · [P0 · ÇÖZÜLMÜYOR — KÖK-NEDEN KAYDI, month-nav kısmı doğrulandı] /reservation dead-click
- **Seri:** 58% (07-01) → 33% (07-02) → 64.7% (07-04/05) → 34.78% (07-06) → **%52.63 (07-07, 19 sess)** — dalgalı, DÜŞMÜYOR. Rage 0%.
- **Site-geneli iyileşme sürüyor:** dead %18.54 (07-04) → %13.48 (07-06) → **%11.56 (07-07)** — site iyileşti ama /reservation ayrışıyor.
- **07-07 ELEMENT KIRILIMI (yeni, kritik):** month-nav fix ÇALIŞTI → "July 2026" label dead **116→6** ✅. AMA baskın dead artık BAŞKA yerden:
  - blank/whitespace " " **179** + maskeli fiyat "•••• •••• ••••" **24** = tıklanamayan kart/fiyat konteyner alanı
  - package-kart metni: "Dinner Cruise" 9, "Without Wine" 5, "/person" 3, "Selected" 3, "31" (takvim günü) 3
  - "Continue booking" CTA **5** dead ⚠️ (birincil CTA — disabled-state affordance şüphesi)
  - "(function(){if(typeof Nod…" **3** — script-as-visible-text (render bug şüphesi, araştır)
- **YENİ KÖK-NEDEN HİPOTEZİ:** package/option kartları TAM tıklanabilir değil — sadece küçük radio/buton wire'lı, kart gövdesi/metni/fiyatı dead. + maskeli fiyat konteyneri click'i yutuyor.
- **FIX PLANI (kod, ayrı session):** (1) tüm package kartı = clickable `<label>`/button (radio kartı sar); (2) maskeli fiyat/summary alanı `pointer-events:none` (disabled hücreler zaten öyle); (3) "Continue booking" disabled iken görünür affordance + no-op'u kaldır; (4) "(function(){…})" script-as-text render bug'ını bul.
- **Verify:** ⏳ AÇIK — month-nav portion FIXED ✅, ama /reservation genel dead hedef <15% DEĞİL (%52.63). Yeni fix (package-card) deploy edilene kadar açık.

### FV-2 · [P1 · KOD PENDING] /istanbul-dinner-cruise dead-click
- **Kaynak:** Clarity. 07-01: 42.86% → 07-02: 16.67% → 07-04: %0 (3 sess, low-N) → **07-06: veri toplu URL listesinde bugün görünmedi (muhtemelen <3 sess, noise-eşiği altı)**.
- **Fix durumu:** ⏳ PENDING — breadcrumb'ı gerçek link + package-card title tıklanabilir. Kod fix'i hâlâ uygulanmadı.
- **Verify:** ✘ bekliyor — kod fix + sürdürülebilir <5%, ölçüm için yeterli session hacmi gerek.

### FV-3 · [P1 · İYİLEŞME SÜRÜYOR] /bosphorus-cruise dead-click
- **Kaynak:** Clarity. 07-01: 23.08% → 07-02: 16.67% → 07-04: %0 (7 sess) → **07-06: %40 (bugünkü toplu URL taramasında yeniden göründü, N bilinmiyor — muhtemelen düşük örneklem varyansı, KAPATILMAMALI).**
- **Değerlendirme:** 3 günlük seri düz-düşüş değil, dalgalı (0%↔40%) — düşük session hacminde noise. KAPATMA ERTELENDİ, yarın session-N ile birlikte tekrar bak.
- **Verify:** ⏳ AÇIK — session-N açık gelmeden karar verilmesin.

### FV-4 · [R1 · SUPPRESSION · AÇIK week 5] Bing impression cliff → 0
- **Kaynak:** Canlı GetRankAndTrafficStats (2026-07-08) → impressions **0 HER GÜN, veri 07-06'ya kadar** (son imp>0 hâlâ 06-08/4imp — Bing restate'i korunuyor). **30. gün (week 5).**
- **Crawl/index sağlığı:** InIndex **478** ↑ (07-07, seri 470→472→476→477→478), Yandex searchable **336**, GetCrawlIssues **0**, 5xx 0, blocked 0, in4xx 0, crawlErrors 41 (hafif creep), crawl 229 sayfa/gün. Deindex DEĞİL — klasik suppression, teknik taraf tamamen temiz.
- **Fix durumu:** RECOVERY PROTOCOL aktif — (1) title/meta/h1 FREEZE, (2) crawl-health temiz ✅, (3) SubmitUrlBatch (07-08: 17 URL 200, quota 90) + IndexNow (Bing 200/Yandex 202) daily, (4) sabır: **week 5, ETA penceresi 07-07→08-04 içinde.**
- **Verify:** ✘ — imp hâlâ 0. Week 6 (~07-22) hâlâ 0 ise: Bing Site Scan + eskalasyon notu (SUPPRESSION-WATCH'ta planlı).

### FV-5 · [P0 · AÇIK, DEPLOY EDİLMEDİ — 5. GÜN · BAYAT] 4 money page Review `itemReviewed` FAIL
- **Kaynak:** Inspection API richResultsResult (2026-07-08, canlı re-check): /istanbul-dinner-cruise (crawl 07-03), /yacht-charter-istanbul (crawl 06-24), /cruises/bosphorus-sunset-cruise (crawl 07-06), /de/istanbul-dinner-cruise (crawl 06-26). Hata AYNEN: `ERROR: Invalid object type for field "itemReviewed"` × 4'er adet. **/bosphorus-cruise PASS teyitli (Review→Product @id referans pattern).**
- **Kök neden (değişmedi):** standalone `Review` blokları `itemReviewed: Service` (geçersiz tip) — tek paylaşılan komponent `src/components/ui/ReviewsCarousel.tsx`.
- **Durum:** **5 gün üst üste (07-04/05/06/07/08) aynı sonuç** — kod fix HÂLÂ yazılmadı. **En eski açık P0 — BAYAT eşiğinde. Ayrı kod-session ŞART, öncelik en üstte.**
- **Fix planı (GROWTH-PLAN Hamle 1, değişmedi):** Review'ları sayfanın ana entity `@id`'sine bağla (dinner/sunset→Event, yacht→Product; `/bosphorus-cruise` PASS pattern'i, bugün de PASS teyitli). `["TouristTrip","Service"]` kuralı korunur. Schema-only = title FREEZE ihlali YOK.
- **Bonus:** premium-yacht-15 Product `review`/`aggregateRating` WARNING — değişmedi.
- **Verify:** ✘ — fix hâlâ yazılmadı.

### FV-6 · [P0 · YENİ 2026-07-06 · E7-full güvenlik] npm audit — 4 HIGH severity dependency vulnerability
- **Kaynak:** `npm audit --audit-level=high` (2026-07-06, weekly E7-full derin tarama).
- **Bulgular:** Next.js (`16.2.4`) 8× advisory — XSS in beforeInteractive scripts, middleware/proxy bypass ×3 (dynamic route param injection, segment-prefetch, Pages Router i18n), RSC cache poisoning, DoS ×2 (connection exhaustion, Image Optimization API), WebSocket SSRF. **nodemailer** (`8.0.5`) 4× advisory — CRLF header injection via List-* comments, jsonTransport bypasses disableFileAccess/disableUrlAccess, improper TLS cert validation in OAuth2 token fetch, raw-option file-read/SSRF bypass. + qs moderate DoS.
- **Risk değerlendirmesi:** nodemailer email-akışında AKTİF (post-booking confirmation email) — CRLF injection + SSRF bypass gerçek saldırı yüzeyi. Next.js middleware bypass'ları da production'da aktif route'ları etkileyebilir.
- **Fix uygulandı (2026-07-06, follow-up session):** `npm audit fix` → Next.js `16.2.4→16.2.10` (patch, `^16.2.4` aralığı içinde), qs/fast-uri/hono/ip-address/js-yaml transitive'ler temizlendi, nodemailer `8.0.5→8.0.11` (patch) 3/4 advisory çözdü. **Kalan 1 HIGH** (`GHSA-p6gq-j5cr-w38f`, raw-option file-read/SSRF) 8.x serisinin TAMAMINI etkiliyor — npm audit JSON `isSemVerMajor:true` işaretledi, 8.x'te hiç patch yok. Kod incelendi (`src/lib/email.ts` — tek kullanım noktası, `raw` option hiç kullanılmıyor, sadece standart `createTransport`/`sendMail`/`verify`), `engines` gereksinimi aynı (`>=6.0.0`) → **major bump güvenli değerlendirildi, operatör onayıyla nodemailer `^9.0.3`'e yükseltildi** (package.json range değişti, tek istisna — planlanan "sadece patch" varsayımı bu 1 CVE için tutmadı).
- **Doğrulama:** `npx tsc --noEmit` 0 hata (önce eksik `prisma generate` nedeniyle hata görünüyordu, build script zaten `prisma generate && next build` olduğu için ayrı çalıştırılınca temizlendi) · `npm run build` başarılı (388 sayfa, sadece pre-existing 4 meta-desc-length lint uyarısı, nodemailer/next ile ilgisiz) · nodemailer kullanım noktası (`src/lib/email.ts`) ve next.config.ts 80 redirect (hepsi `statusCode:301`, `permanent:` boolean yok — commit 97fe9e3 pattern'i korunuyor) spot-check edildi, bozulma yok.
- **Verify:** ✅ — `npm audit --audit-level=high` → **0 vulnerabilities** (moderate/low dahil tümü, sadece 4 high değil).

### FV-7 · [P1 · YENİ 2026-07-07 · A1 crawl-budget] 1.553 "Tarandı-dizine eklenmedi"
- **Kaynak:** Gerçek GSC Page-Indexing raporu (Chrome MCP, ilk kez çekildi). Money-page Inspection API örneklemi 22/22 indexed gösteriyordu — sınıf-toplamını GİZLİYORDU (07-06 acilkaseniz dersi birebir tekrar).
- **Sınıf-kırılımı (baseline):** crawled-not-indexed **1.553** (Başarısız) · discovered-not-indexed 82 (Başladı) · 404 **32** (Başarısız) · noindex 5 · Yönlendirmeli 14 (NR-9, hata değil) · alt-canonical 0. **Google indexed 342 → %82 not-indexed oranı.**
- **Kök neden hipotezi:** thin/generalist crawl-budget (114-post /blog + /guides + locale varyantları + reservation query-param URL'leri + event alt-sayfa). Brand-profile Firefly riskinin nicel kanıtı.
- **Fix planı (kod/içerik, ayrı session):** A8 dead-inventory audit öne çek → 1.553'ün URL sınıf-kırılımı çıkar → sitemap-vs-<15imp/30d diff → thin/held-back → noindex (canlı kalır) veya 410 (dead) + sitemap-prune (NR-9). Servis/commercial/indexli sayfalar KALIR. 404×32'yi ayrı kır (kırık internal link mi, kaldırılmış sayfa mı).
- **Verify (07-08):** ✘ — sınıflar 07-07 ile BİREBİR AYNI (GSC raporu freshness 30.06.2026, 24h yenilenmedi) → büyüme YOK, **R5 CLEAR**. Delta izleme aynı-method (page-indexing-ui) günler arasında; GSC raporu yenilenince gerçek delta gelir. Audit (A8) sonrası indexed/not-indexed oranı ölçülecek.

### FV-8 · [WATCH · YENİ 2026-07-08] /tr/bosphorus-cruise indexed → "Crawled - currently not indexed"
- **Kaynak:** Inspection API + Chrome URL-denetimi (2026-07-08): 07-08 02:39 taze crawl, "Sayfa getirme: Başarılı", "Dizine eklenmesine izin verildi: Evet" — AMA "URL Google'da yok / Tarandı - şu anda dizine eklenmiş değil". Dün indexed'di.
- **Değerlendirme:** Tek-sayfa dizinden düşme (toplam indexed 342 STABİL = R3 DEĞİL). Push+request-index'e rağmen (07-08'de her ikisi de yapıldı) Google soft-kalite kararıyla düşürdü — crawl-budget/thin sinyalinin "boğaz turu" 6.600/mo hedef sayfasına dokunması.
- **Fix planı:** kod-tarafı TR internal-link denetimi (GROWTH-PLAN Hamle 4) — TR sayfalardan içerik-içi link akışı artır. Request-index/push marjinal kanıtlandı.
- **Verify:** ⏳ AÇIK — internal-link işi sonrası re-inspect. Bu arada günlük auto-submit'te kalır.

## KAPANAN (son 30 gün)
- **FV-6** (2026-07-06) — npm audit 4 HIGH + 6 moderate + 1 low → 0. Next.js 16.2.10 + nodemailer 9.0.3 (major, operatör onaylı) + qs/fast-uri/hono/ip-address/js-yaml transitive temizlik. Commit: `1a345b9` (git log'da teyit 2026-07-07).
- _FV-3 dalgalı, FV-1 çözülmüyor (kök-neden package-card), FV-5 4. gün açık._

## SF/Semrush mutabakat 2026-07-08 (öne çekilmiş B9)

**Amaç:** eski SF/Semrush audit bulgularının canlıda hâlâ var olup olmadığını tek tek doğrulamak (operatör şüphesi: "hiç fixlenmedi mi?").
**Kaynak export:** `~/Desktop/seospider/merrysails/semrush/*_20260623.csv` (Semrush Site Audit crawl 2026-06-23 23:37) + SF ham crawl top-level CSV (`page_titles_over_561_pixels.csv`, `h1_all.csv`, `canonical_chains.csv`, 2026-06-21/22). Doğrulama: `curl -sIL` (status+redirect hop) + canlı `<title>/<meta>/<h1>` içerik karşılaştırması, tümü 2026-07-08. Title/meta/h1 metnine dokunacak HİÇBİR fix uygulanmadı/önerilmedi (Bing suppression kuralı).

**Özet:** 7 aksiyon-alınabilir sınıftan **2 FIXED, 5 AÇIK** (+2 sınıf export'ta zaten 0 bulgu). Azınlık FIXED → aşağıdaki AÇIK liste öncelik sırasında.

### AÇIK (öncelik sıralı)

**SF-1 · internal_broken_links (export 761 satır)** — 5/5 örnek hâlâ canlı 404 (`curl -sIL` doğrulandı): `/fr/blog/accessible-bosphorus-cruise`, `/de/blog/accessible-bosphorus-cruise`, `/tr/blog/accessible-bosphorus-cruise`, `/nl/blog/accessible-bosphorus-cruise`, `/de/blog/avoid-tourist-traps-istanbul-cruises`. Muhtemel kök neden: blog post sadece EN'de var ama başka locale'e link/hreflang üretiliyor. Fix = link-üretim mantığı (kod), title değil. **YÜKSEK ÖNCELİK, SF-2 ile muhtemelen ortak kök-neden.**

**SF-2 · http_4xx_client_errors (export 797 satır)** — 5/5 örnek hâlâ 404: `/blog/adalar-turu-istanbul-buyukada-rehberi-2026`, `/blog/arenda-yakhty-stambul-2026`, `/blog/bogaz-turu-fiyat-rehberi-istanbul-2026`, `/blog/bogaz-turu-kac-saat-surer-rehberi-2026`, `/blog/bosphorus-cruise-prijzen-gids-2026` — TR/RU/NL dilinde slug ama locale-prefix'siz `/blog/` altında. SF-1 ile aynı audit'te birlikte çözülmeli.

**SF-3 · long_title / SF pixel-width (export 13 satır, top-level)** — 5/5 örnek hâlâ uzun canlı title: `/ru/team-building-yacht-istanbul` (100 char!), `/ru/cruises/bosphorus-sunset-cruise` (96), `/zh` (84), `/yacht-charter-istanbul/group-yacht-40-standard` (72), `/yacht-charter-istanbul/mega-event-yacht-150` (64). CLAUDE.md kural #6 ihlali (kaynak title max 47 char) canlı teyitli. **FIX TITLE METNİ DEĞİŞİKLİĞİ GEREKTİRİR → operatör onayı şart, bu işçi uygulayamaz (Bing suppression kuralı).** Öneri: tek seferde 1-2 sayfa, düşük-impression locale'den başla.

**SF-4 · permanent_redirects / tek-atlama redirect (export 7 satır)** — `curl -sIL` doğrulandı: `/blog/bosphorus-cruise-departure-points` hâlâ `308` ile `/bosphorus-cruise-departure-points`'e yönleniyor (tek hop, çoklu-hop zincir DEĞİL — export'un "chain" değil "permanent redirect" olarak adlandırması doğru). 7 farklı sayfa (`/blog`, `/de/blog`, `/fr/blog`, `/nl/blog`, `/tr/blog`, `/guides/kabatas-pier`, `/guides/karakoy-waterfront`) hâlâ redirect'e giren eski URL'e link veriyor. Düşük öncelik — fix = internal link'i final URL'e güncelle (kod, title değil).

**SF-5 · h1_and_title_tags_have_duplicate_content (export 7 satır, tartışmalı)** — 5/5 örnekte H1 metni Title metniyle birebir aynı (örn. `/cruises/bosphorus-cruise-for-cruise-passengers`). Muhtemelen `ProductHero`/`TourDetailClient` tasarım deseni. Semrush'ın önerisi H1 veya Title metnini değiştirmek — **BU İŞÇİ UYGULAYAMAZ (title/h1 değişikliği yasak).** Operatöre: gerçek sorun mu tasarım-kaynaklı kabul edilebilir mi karar bekliyor, düşük öncelik.

### FIXED — export bayat — fixlendi ✅

**SF-6 · duplicate_title_tag (export 27 satır)** — export bayat — fixlendi ✅. Crawl anında (06-23) 6 yacht-charter sayfası (`boutique-yacht-12`, `event-yacht-90`, `group-yacht-40-signature`, `group-yacht-40-standard`, `mega-event-yacht-150`, `premium-yacht-15`) × 5 locale (de/fr/nl/ru/zh) hepsi İngilizce fallback title gösteriyordu (duplicate). Canlı doğrulama (07-08, 8/8 örnek): artık kendi dilinde benzersiz title (örn. `/zh/.../group-yacht-40-signature` → "团体游艇 · 40 人 · 尊享 — €500 / 2h"). i18n içerik tamamlama export'tan SONRA gelmiş (ACTIVE_LOCALES şu an `en,tr,de,fr,nl,ru,zh` — ru/zh dahil).

**SF-7 · duplicate_meta_description (export 27 satır)** — export bayat — fixlendi ✅. Aynı 6 yacht sayfası × 5 locale — canlı doğrulama 5/5 örnek artık benzersiz çevrilmiş meta description (DE/RU/FR/ZH/NL hepsi farklı metin).

### Export'ta zaten 0 bulgu (doğrulama gerekmedi)
- `canonical_chains.csv` (SF top-level, 06-21/22 crawl): 0 satır
- `canonicals_nonındexable_canonicals.csv` (SF top-level): 0 satır
- missing_h1 (h1_all.csv, boş H1-1 + indexable filtre, script ile hesaplandı): 0 satır — CLAUDE.md "Resolved 2026-04-27" notuyla tutarlı

**VERDİKT:** azınlık FIXED (2/7) → yeni crawl'ın "temiz" sonuç göstermesi BEKLENMEMELİ, ama veri toplamak güvenli (read-only, siteye etkisi yok). Sıradaki iş SF-1/SF-2 (muhtemelen ortak kök-neden, tek session'da ikisi kapanabilir).
