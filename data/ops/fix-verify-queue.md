# Fix-Verify Queue (MerrySails)
**Son güncelleme:** 2026-07-06

> GSC "Sayfalar / neden dizine eklenmiyor" sınıf-raporu API'de yok (UI-only) → A1 sınıf-delta operatör UI'sinden. Rich-results + coverage tek-URL doğrulaması Inspection API ile CANLI (merkezi token).

## AÇIK (fix bekliyor / verify bekliyor)

### FV-1 · [P0 · KOD FIX DEPLOY EDİLDİ — KISMEN İYİLEŞTİ, VERIFY DEVAM EDİYOR] /reservation dead-click
- **07-04→07-05:** %64.7 (11/17 sess) + 1 rage.
- **07-06 (Clarity 3g, 07-04→07-06):** **%34.78** (23 sess) — **büyük düşüş, deploy sinyali AÇIK** ama hedef <15%'in hâlâ ~2.3× üstünde. Rage 0%.
- **Site-geneli paralel iyileşme:** dead-click %18.54 (07-04) → **%13.48** (07-06, 178 sess), quickback %15.17, JS-error %0.
- **Değerlendirme:** FV-1 fix'i (0b9a217/b8a3755, month-nav kilidi + "Change" no-op) prod'da aktif görünüyor — düşüş yönü doğru ve büyük, ama /reservation için "verify" henüz KAPANMADI (hedef <15%, mevcut %34.78). Element-bazlı kırılım bugün çekilmedi (sadece URL-agregesi); yarın "Change"/month-label spesifik sayılara bakılmalı — eğer o ikisi ~0'a düştüyse kalan %34.78 farklı bir element kümesinden geliyor demektir (yeni kök-neden araştırması gerekebilir).
- **Not (repo durumu):** `feat/yacht-product-redesign` branch'i main'e merge edilmiş (`1135d0c`) ve Vercel production 23-24 saat önce deploy görünüyor — fix canlıda kabul edilebilir güvenle.
- **Verify:** ⏳ AÇIK — hedef <15% henüz değil. Yarın element-detay + 1-2 gün daha trend izlenmeli, <15% sürdürülebilir olursa KAPAT.

### FV-2 · [P1 · KOD PENDING] /istanbul-dinner-cruise dead-click
- **Kaynak:** Clarity. 07-01: 42.86% → 07-02: 16.67% → 07-04: %0 (3 sess, low-N) → **07-06: veri toplu URL listesinde bugün görünmedi (muhtemelen <3 sess, noise-eşiği altı)**.
- **Fix durumu:** ⏳ PENDING — breadcrumb'ı gerçek link + package-card title tıklanabilir. Kod fix'i hâlâ uygulanmadı.
- **Verify:** ✘ bekliyor — kod fix + sürdürülebilir <5%, ölçüm için yeterli session hacmi gerek.

### FV-3 · [P1 · İYİLEŞME SÜRÜYOR] /bosphorus-cruise dead-click
- **Kaynak:** Clarity. 07-01: 23.08% → 07-02: 16.67% → 07-04: %0 (7 sess) → **07-06: %40 (bugünkü toplu URL taramasında yeniden göründü, N bilinmiyor — muhtemelen düşük örneklem varyansı, KAPATILMAMALI).**
- **Değerlendirme:** 3 günlük seri düz-düşüş değil, dalgalı (0%↔40%) — düşük session hacminde noise. KAPATMA ERTELENDİ, yarın session-N ile birlikte tekrar bak.
- **Verify:** ⏳ AÇIK — session-N açık gelmeden karar verilmesin.

### FV-4 · [R1 · SUPPRESSION · AÇIK week 4→5] Bing impression cliff → 0
- **Kaynak:** Canlı GetRankAndTrafficStats (2026-07-06) → impressions **0 HER GÜN, veri artık 07-04'e kadar** (son imp>0 hâlâ 06-08/4imp — Bing restate'i korunuyor). **28. gün bugün (week 4 tamamlandı → week 5 başlıyor).**
- **Crawl/index sağlığı:** InIndex **476** ↑ (07-05, +6 vs 07-03), Yandex searchable **337** ↑, GetCrawlIssues **0**, crawl aktif (200-270 sayfa/gün). Deindex DEĞİL — klasik suppression, teknik taraf tamamen temiz.
- **Fix durumu:** RECOVERY PROTOCOL aktif — (1) title/meta/h1 FREEZE, (2) crawl-health temiz ✅, (3) SubmitUrlBatch (07-06: 14 URL 200) + IndexNow (Bing 200/Yandex 202) daily, (4) sabır: **week 5/6, ETA penceresi 07-07→08-04 içinde kalıyor.**
- **Verify:** ✘ — imp hâlâ 0. Week 6 (~07-22) hâlâ 0 ise: Bing Site Scan + eskalasyon notu (SUPPRESSION-WATCH'ta zaten planlı).

### FV-5 · [P0 · AÇIK, DEPLOY EDİLMEDİ] 4 money page Review `itemReviewed` FAIL
- **Kaynak:** Inspection API richResultsResult (2026-07-06, canlı re-check): /istanbul-dinner-cruise (crawl 07-03), /yacht-charter-istanbul (crawl 06-24), /cruises/bosphorus-sunset-cruise (crawl 06-26), /de/istanbul-dinner-cruise (crawl 06-26). Hata AYNEN sürüyor: `ERROR: Invalid object type for field "itemReviewed"` × 4'er adet, her sayfada.
- **Kök neden (değişmedi):** standalone `Review` blokları `itemReviewed: Service` (geçersiz tip) — tek paylaşılan komponent `src/components/ui/ReviewsCarousel.tsx`.
- **Durum:** 2 gündür (07-04, 07-05, 07-06) hep aynı sonuç — kod fix HÂLÂ yazılmadı/deploy edilmedi. FV-1/Bing-301 fix'leri bu pencerede deploy edildi ama ReviewsCarousel'a dokunulmadı. **Bu artık 3. gündür açık kalan P0 — öncelik yükseltilmeli.**
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

## KAPANAN (son 30 gün)
- **FV-6** (2026-07-06) — npm audit 4 HIGH + 6 moderate + 1 low → 0. Next.js 16.2.10 + nodemailer 9.0.3 (major, operatör onaylı) + qs/fast-uri/hono/ip-address/js-yaml transitive temizlik. Commit: `<PENDING — bir sonraki edit'te commit hash buraya eklenecek>`.
- _FV-3 dalgalı, FV-1 verify-devam-ediyor._
