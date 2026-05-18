# SEO / GEO / AI Visibility Standards — Universal (apply to ALL 10 brands)

**Version**: 1.0 (2026-05-17)
**Purpose**: Tek dosya — her marka session'ında kopyalayıp `CLAUDE.md` veya `RULES.md` olarak sakla. Sonra "kurallara göre SEO yap" demek yeter, session bu standartları uygular.

---

## 🚨 KATI KURALLAR — Bu hatalar çıkarsa CI fail, deploy yok (2026-05-18 enforcement)

Her commit öncesi `node scripts/lint-schema.mjs` çalıştır — sıfır error olmadan push yok.

### P0 — Asla yapılmayacaklar
1. **Nested `Offer` schema'da `price` field eksik** — Google Merchant listing + Product snippet reddedilir
   - ✅ DOĞRU: `{ "@type": "Offer", "price": "30", "priceCurrency": "EUR", ... }`
   - ❌ YANLIŞ: `{ "@type": "Offer", "name": "..." }` (price yok)
   - ❌ YANLIŞ: `{ "@type": "Offer", "price": "€30" }` (currency in string)
   - ❌ YANLIŞ: `{ "@type": "Offer", "price": null }` veya `""`
2. **LocalBusiness/Restaurant'ta `inLanguage` kullanma** — Google validator reddediyor (Schema.org'da geçerli ama Google'da değil). Sadece FAQPage + Menu + Article gibi content type'larda kullan.
3. **LocalBusiness/TravelAgency/TouristInformationCenter** — `address` ZORUNLU inline (`@type: "PostalAddress"`, streetAddress + addressLocality + addressRegion + postalCode + addressCountry hepsi). `@id` reference YETMİYOR.
4. **TR-only sayfa için `LOCALIZED_ROUTES`'a EKLEME** — hreflang non-existent /de/, /fr/ vs sayfalara işaret eder, 4×404 verir. Sadece TR'de canonical olarak emit et.
5. **Sitemap'te redirect URL OLAMAZ** — `next.config.ts`'de redirect varsa, slug'ı `EXCLUDED_TOUR_SLUGS`'a ekle veya elle çıkar.
6. **Title comment'inde `<h1>` veya `<h2>` HTML tag yazma** — lint regex false-positive verir. Yerine "H1", "H2" yaz.
7. **`?w=...&q=80&w=3840&q=75`** — Next.js Image component zaten size param'i ekliyor, Unsplash URL'inde manuel `?w=` koyma (double param 404).
8. **Title >32 char (suffix hariç) yazma** — root layout `template: "%s | MerrySails Istanbul 2026"` ile +28 char ekler. Suffix dahil 60 cap. Local pages'de çevirisi uzunsa BRAND'i çıkar (suffix kapatıyor zaten).

### P1 — Yapmasak iyi olur
9. Paragraph >80 word — Semrush "paragraphs too long" verir, readability düşer
10. Meta description <130 veya >160 char — Google rewrite veya truncate
11. H1 + Title aynı kelime sırası — duplicate content sinyali
12. Internal link 308 redirect üzerinden — link juice azalır, direkt canonical URL kullan
13. Orphan page (sitemap'te ama tek internal link bile yok) — düşük crawl priority
14. Schema'da `priceSpecification` kullanma eğer `price` yeterse — simple > nested

---

## 🧱 SCHEMA RULES (zorunlu — Schema.org validator pass)

### Schema type combos
| ✅ DOĞRU | ❌ YANLIŞ |
|---|---|
| `["TouristTrip", "Service"]` | `["TouristTrip", "Product"]` (Google reddediyor) |
| `LocalBusiness` + inline address | Address sadece `@id` reference (yetersiz) |
| `Event` + required fields hepsi | Event sadece name + date (eksik) |

### AggregateRating sadece şu parent'larda olur
- ✅ `Event`, `Product`, `LocalBusiness`, `Organization`, `Recipe`, `Movie`, `Course`, `Book`, `HowTo`
- ❌ `Service`, `TouristTrip`, `Place`, `Offer` (parser conflict)

### Event schema required fields
```
name, description, image, startDate, endDate, eventStatus,
eventAttendanceMode, location, organizer, performer
Event.offers: availability, validFrom, price, priceCurrency, url
```

### Merchant Offer required (cruise/digital için)
```
shippingDetails: {@type:"OfferShippingDetails", doesNotShip:true}
hasMerchantReturnPolicy.returnMethod
```

### Schema validation (yayın öncesi zorunlu)
- Local: `npm run lint:schema` (varsa)
- External: https://validator.schema.org
- Google Rich Results: https://search.google.com/test/rich-results

---

## 📝 TITLE / DESCRIPTION RULES

| Element | Limit | Not |
|---|---|---|
| Title (page) | ≤32 char | + template suffix 28 char = 60 total |
| Title (template suffix) | Brand name | Otomatik root layout'tan gelir, sayfaya yazma |
| Meta description | 130-160 char | Truncate ise: 155 ideal |
| H1 | 1 adet/sayfa | Keyword-rich, brand co-occurrence |
| H2 | Keyword cluster | LSI variant'lar |

**Kural**: Title'a brand adını **manuel ekleme** — template ekliyor. "X | Brand | Brand 2026" duplicate olur.

---

## 🌍 URL / REDIRECT RULES

1. **307 redirect = SEO kanaması** — `permanent: true` (301) kullan
2. Eski URL'ler kapatılınca `next.config.ts`'de redirect kuralı ekle
3. Internal link eski URL'e işaret ederse: `grep -rn "OLD-URL" src/` → fix
4. 404 internal link: ya hedef sayfa oluştur, ya redirect, ya link kaldır
5. www → non-www tek yön, https zorunlu

---

## 🎯 PILLAR PAGE STRUCTURE (zorunlu)

Her pillar/commercial page'de bulunması gereken minimum:

### Content
1. **H1**: primary keyword + brand co-occurrence + value-prop
2. **TL;DR paragraph** (başta — AI summary için ideal)
3. **Comparison table** (varsa rakipler — AI cite ediyor bu pattern'i)
4. **Numbered list** (Top X format — AI cite ediyor)
5. **FAQ** minimum 6-8 soru + FAQPage schema
6. **Updated date** prominent ("Last updated: 2026-XX-XX")
7. **Internal links** minimum 5 (related pages, hub, blog)
8. **CTA**: WhatsApp/Phone/Reservation (her 600 kelimede 1)
9. **Wordcount target**:
   - Pillar: 1500-2500 kelime
   - Cluster: 800-1500 kelime
   - Programmatic district: 600-900 kelime

### Schema
- `Service` veya `TouristTrip` (varsa offer)
- `BreadcrumbList`
- `FAQPage`
- `LocalBusiness` (varsa fiziki adres)
- `Offer` (varsa fiyat)
- `Person` + `Review` (testimonials)

### Metadata (`generateMetadata()`)
- title <60 char (template suffix dahil)
- description 130-160 char
- canonical URL
- hreflang annotations (multi-locale brands)
- og:image specific

---

## 🤖 AI VISIBILITY (GEO — Generative Engine Optimization)

### AI'ın cite ettiği content pattern'leri (kanıtlanmış — Perplexity scan 2026-05-17)
1. **Comparison listicle** ("Top 10 X 2026") — en güçlü pattern
2. **Numbered lists** içinde brand mention
3. **Dated guides** ("2026 honest review", "updated 2026")
4. **TL;DR + bullet structure**
5. **Specific data** (price, duration, capacity — somut sayılar)
6. **Trust signals** (license, awards, years experience, guest count)
7. **Schema.org valid** (machine-readable)
8. **TripAdvisor / Trustpilot / Yelp** review pickup

### AI'a destek file'lar (root domain'de)
- `robots.txt` — `User-agent: *` allow + AI bots (GPTBot, ClaudeBot, PerplexityBot, GoogleBot-Extended)
- `llms.txt` — site bilgisi (decision-tree formatında)
- `llms-full.txt` — extended detail
- `/pricing` — machine-readable price file (Markdown)
- Speakable schema (voice/AI answer engines)

### Off-site authority (AI scan'de gözlemlendi — rakipler bu yüzden cite ediliyor)
- **Google Business Profile** — Bard/Gemini doğrudan kullanıyor
- **Trustpilot** — Perplexity cite ediyor
- **TripAdvisor** — Cruise/restaurant için kritik
- **Bing Places** — Bing AI (Copilot) data source
- **Yandex Business** — Yandex AI + Google bile cite ediyor

---

## 🌐 E-E-A-T REQUIREMENTS (her commercial page)

- **Experience**: yıllar (e.g., "TURSAB licensed since 2001")
- **Expertise**: author/owner credentials, certifications
- **Authoritativeness**: license badge, awards, third-party verification
- **Trust**: customer count ("50,000+ guests"), reviews displayed, security badges, SSL

**Minimum**: her commercial page'de en az 1 E-E-A-T phrase explicit yer alır.

---

## 🔗 INTERNAL LINKING RULES

1. Her yeni page Footer + Sitemap + `llms.txt`'e ekle
2. Orphan page (sitemap'te ama link yok) = düşük crawl priority — yasak
3. Pillar → cluster → leaf hierarchy
4. Anchor text: keyword-rich ama natural (over-optimization spam değil)
5. Blog → service page link ZORUNLU (commercial conversion)
6. Service page → blog support post (E-E-A-T destek)

---

## 📐 i18n / hreflang RULES (multi-locale brands)

1. `<html lang>` static (`headers()` koyma — Next.js dynamic regression)
2. `alternates.languages` her sayfada — `buildHreflang(path)` helper kullan
3. Locale path: `/en/...`, `/de/...`, `/tr/...`, `/fr/...`, `/nl/...`
4. RTL: `/ar/...` veya `/sa/...` (Arabic)
5. Hreflang validator pass — `x-default` mutlaka

---

## 🚫 CONTENT RULES (red flags)

| Yasak | Neden |
|---|---|
| Uydurma fiyat | AI/SERP'de yalan = trust loss |
| Paragraph >80 kelime | Semrush "paragraphs too long" hatası |
| Text/HTML <%5 | Düşük content density |
| Keyword stuffing | Google penalty risk |
| Duplicate meta description | Cannibalization |
| AI-generated thin content | E-E-A-T fail |
| Auto-translate (locale spam) | Native quality DEĞİL |

---

## ⚡ CORE WEB VITALS TARGETS

| Metric | Hedef | Sertifikasyon |
|---|---|---|
| LCP | <2.5s | "Good" |
| INP | <200ms | "Good" |
| CLS | <0.1 | "Good" |
| TTFB | <800ms | (server side) |

Lighthouse CI ile her commit (varsa). PageSpeed Insights manuel test.

---

## 🛠️ TECHNICAL RULES (Next.js spesifik — applicable her marka)

1. `'use client'` sadece state/hooks gerektiğinde — server components default
2. `cn()` utility (`clsx` + `tailwind-merge`) for conditional classes
3. `next/image` `fill` veya explicit dimensions
4. External images: `images.unsplash.com` allowlist
5. `generateMetadata()` her public page (mecbur)
6. JSON-LD schema her public page (mecbur)
7. Prisma queries: server only, never client
8. Cookie consent modal **YOK** (project decision — see CLAUDE.md)
9. Mobile-first responsive

---

## 📤 DEPLOY POLICY

1. **Max 1 deploy/gün** (acil bug hariç)
2. Deploy = **session sonu** + **kullanıcı açıkça onaylar**
3. Önce lokal `npm run build` — broken build deploy etme
4. Pre-commit hook (varsa) HER zaman pass (`--no-verify` kullanma)
5. Schema lint pass (`npm run lint:schema` or `scripts/lint-schema.mjs`)
6. TypeScript strict pass (`npx tsc --noEmit`)
7. Pre-commit failure = NEW commit (asla `--amend`)

---

## 🔄 POST-PUBLISH CHECKLIST (her yeni page için)

```
[ ] Schema.org validator pass
[ ] Google Rich Results test pass
[ ] Schema lint script pass
[ ] tsc --noEmit pass
[ ] Lokal build pass
[ ] IndexNow ping (Bing + Yandex)
[ ] Sitemap güncel (auto if dynamic)
[ ] GSC URL inspect → submit for indexing
[ ] Bing Webmaster manual submit (varsa)
[ ] Yandex Webmaster manual submit
[ ] Wayback Machine save (yeni pillar)
[ ] llms.txt update
[ ] Internal link grafiği güncel (footer, related, hub)
```

---

## 📊 MEASUREMENT (haftalık review)

Central monitoring (merrysails repo'da, dokunma — sadece sonuç oku):
- AI visibility scan → `data/multi-brand-monitoring/ai-visibility-latest.md`
- Rank tracker → `data/multi-brand-monitoring/rank-latest.md`

Bu marka için:
- GSC weekly: clicks + impressions + CTR per page
- Clarity weekly: bounce rate + scroll depth + dead clicks
- GBP weekly: searches + actions

---

## 🚨 EMERGENCY TRIGGERS

| Sinyal | Acil aksiyon |
|---|---|
| Yeni pillar yayında 14 gün, 0 GSC click | Schema audit + content expand + IndexNow re-ping |
| AI scan'de marka %10 düştü | Yeni rakip mı cite edildi? Audit + comparison content |
| Rank ≥10 pozisyon düştü | Algorithm/penalty check, manual action check |
| Schema validator error | Hemen fix, deploy'u dur |
| Lokal build broken | Deploy yasak, root cause fix |

---

## 🔍 SEMRUSH AUDIT RULES (P0/P1/P2 priority breakdown)

Senin paylaştığın Semrush audit raporundaki hataları sınıflandır, otomatik fix:

### 🔴 P0 — Acil fix (rich results + crawl killers)

#### **Structured data invalid** (Schema rejected)
- **Tespit**: Schema.org validator, Google Rich Results test
- **Sebep**: AggregateRating wrong parent, Event missing required, TouristTrip+Product hatası
- **Fix**:
  - `["TouristTrip", "Service"]` kullan (Product değil)
  - AggregateRating: sadece Event/Product/LocalBusiness/Organization/Recipe/Movie/Course/Book/HowTo
  - Event required: name, description, image, startDate, endDate, eventStatus, eventAttendanceMode, location, organizer, performer
  - Offer required: availability, validFrom, price, priceCurrency, url, shippingDetails (`doesNotShip:true` cruise/digital için), hasMerchantReturnPolicy.returnMethod
- **Lint**: `node scripts/lint-schema.mjs` (merrysails'de var, kopya al)

#### **Hreflang conflicts** (Locale routing broken)
- **Tespit**: GSC International Targeting + Semrush Site Audit
- **Sebep**: hreflang annotations farklı sayfalarda farklı dil işaret ediyor / x-default eksik
- **Fix**:
  - Her sayfada `alternates.languages` (generateMetadata) — helper kullan (`buildHreflang(path)`)
  - x-default mutlaka ekle (default locale = EN için root)
  - `<html lang>` STATIK set (Next.js dynamic regression)
  - Her locale aynı path structure: `/en/...`, `/de/...` vb.

#### **4xx errors** (Crawl budget waste)
- **Tespit**: GSC Coverage report + Semrush Audit + `scripts/lint-broken-links.mjs` (yaz)
- **Sebep**: Eski URL'lere internal link, kapalı sayfalar
- **Fix**:
  - `next.config.ts` redirect ekle (`permanent: true` = 301, ASLA 307)
  - Internal link grep: `grep -rn "OLD-URL" src/` → güncelle
  - Kapalı sayfalar için ya redirect ya kaldır

#### **Broken internal links** (Link juice loss)
- **Tespit**: `npx broken-link-checker https://site.com -r` veya Semrush
- **Sebep**: Refactored URL'ler güncellenmemiş
- **Fix**:
  - Her broken link: ya redirect ya link kaldır ya hedef sayfa oluştur
  - Pre-commit hook: broken link check (varsa)

#### **Duplicate title tags** (Cannibalization)
- **Tespit**: GSC + Semrush Audit
- **Sebep**: Aynı title birden fazla sayfada (özellikle multi-locale yanlış konfigüre olunca)
- **Fix**:
  - Her sayfada `generateMetadata()` unique title
  - Title max 32 char (template suffix dahil 60)
  - Brand name suffix template'ten gelir — sayfada YAZMA

#### **Duplicate meta descriptions**
- **Fix**:
  - Her sayfada unique description, 130-160 char
  - Tarif, ürün listesi gibi sayfalarda dinamik description

### 🟡 P1 — Bu ay fix (UX + indexation)

#### **Too long titles** (>60 char)
- **Fix**: Title shrink — keyword + brand + value-prop fits in 32 char (template suffix 28 hesap)
- Auto-check: `scripts/lint-meta.mjs` yaz (yoksa)

#### **Pages need 3+ clicks to reach** (Deep page)
- **Fix**:
  - Anasayfa veya navigation'a top-level link ekle
  - Footer'a related links cluster
  - Sitemap structure flatten (max 2 click)
  - Internal linking artır

#### **Orphaned sitemap pages**
- **Tespit**: Sitemap'te ama 0 internal link
- **Fix**: Her page'e en az 1 internal incoming link (anasayfa, related, hub)
- Footer'a "related guides" widget

#### **Low word count** (<300 kelime)
- **Fix**: Content expand 800+ kelime minimum (commercial), 1500+ pillar

#### **Hreflang language mismatch** (page lang ≠ hreflang)
- **Fix**: HTML body language = hreflang annotation language. Native content, çeviri değil.

#### **Pages with single internal link**
- **Fix**: Her page'e minimum 3 internal incoming link

#### **Content not optimized** (AI Search flag)
- **Tespit**: Semrush AI Search audit
- **Fix**:
  - TL;DR başta (AI-friendly)
  - Comparison table mid-article
  - Numbered list (AI cite ediyor)
  - FAQ schema 6+ soru
  - Updated date 2026 explicit

### ⚪ P2 — IGNORE veya context (gereksiz panik)

#### **Low text-HTML ratio** (947 pages)
- **Verdict**: ❌ YAPMA. Modern siteler hep low ratio (Tailwind classes + JS bundle). Google öncelik vermiyor.

#### **Large JS/CSS total size** (947 pages)
- **Verdict**: Semrush'un keyfi metric'i. Lighthouse'a güven:
  - LCP < 2.5s OK
  - INP < 200ms OK
  - CLS < 0.1 OK
  - Network tab: First Load JS < 200kb hedef
- Eğer LCP > 2.5s ise dynamic imports + tree-shake + image optimize. Ratio'ya bakma.

#### **Blocked from crawling** (1,026 pages)
- **Verdict**: Admin routes, API endpoints, /admin/* — bunlar BLOCK olmalı. Bu doğru davranış. IGNORE.

#### **Permanent redirects** (613)
- **Verdict**: Eski URL → yeni URL = doğru SEO. Bu hata değil, hijyen. IGNORE.

### 📋 Semrush audit automation

Pre-commit + weekly local audit:
```bash
# scripts/seo-audit.sh
npm run lint:schema           # P0: schema valid
npm run lint:meta             # P0: title/desc unique + length
npx tsc --noEmit              # P0: TS strict
npx broken-link-checker URL   # P0: internal links
npm run lighthouse:ci         # P1: CWV
```

Her commit'te bu script. P0 fail = commit reddedilir.

### 🎯 Audit cadence

| Frequency | Action |
|---|---|
| Per commit | lint-schema + lint-meta + tsc |
| Weekly | Lighthouse CI + broken-link check |
| Monthly | Full Semrush audit (manual, shared Guru hesabı, MCP YOK ban risk) |
| Quarterly | DataForSEO keyword refresh + competitor backlink scan |

---

## 🔒 2026-05-18 AUDIT — DÜZELTİLEN HATALAR → KALICI ÖNLEME KURALLARI

> Bu hatalar 2026-05-18 audit'inde bulundu + düzeltildi. **Bir daha yapılmayacak.**
> `node scripts/lint-schema.mjs` her commit'te bunları yakalar.

### 1. Meta description uzunluğu — ZORUNLU 140-160 karakter
- **Hata**: 74 sayfada meta description >165 char → Google SERP'te kesiyor.
- **Kural**: Her `description:` / `metaDescription:` metadata alanı **140-160 karakter**. 165 üstü = hata.
- **Yeni sayfa yazarken**: description'ı yazdıktan sonra karakter say. Filler kelime ("you can", "we offer", gereksiz sıfat) at.
- Locale sayfalarında: TR/DE/FR/NL description'ları da 140-160 — kendi dilinde, çeviri uzunluğu kontrol et.

### 2. Title uzunluğu — ZORUNLU ≤60 karakter (toplam)
- **Hata**: 153 başlık >60 char (template suffix dahil).
- **Kural**: `title:` alanı ≤58 char. Root layout template suffix (` | MerrySails Istanbul 2026` = 28 char) hariç sayfa-parçası ≤32 char.
- Title'a **asla** `| MerrySails` veya `| İstanbul` manuel ekleme — template ekliyor, duplicate olur.
- Blog post / guide title'ları da ≤32 char (suffix dahil ≤60).

### 3. Schema combo — ["TouristTrip","Product"] YASAK
- **Kural**: `["TouristTrip","Service"]` veya tek `TouristTrip`. Review snippet için ayrı `Product` node (`@id` suffix `#product`).

### 4. LocalBusiness/TravelAgency/Restaurant — inline PostalAddress ZORUNLU
- `@id` referansı yetmez — `address: { "@type": "PostalAddress", streetAddress, addressLocality, postalCode, addressCountry }` inline yazılacak.
- LocalBusiness subclass'larına **`inLanguage` YAZMA** — Google validator reddediyor (Menu/CreativeWork'te OK).

### 5. Event schema — location + organizer + performer + offers ZORUNLU
- Event node'unda: `name, startDate, endDate, location, eventStatus, eventAttendanceMode, organizer, performer, image, description`.
- Event `offers`: `availability, validFrom, price, priceCurrency, url`.

### 6. canonical + hreflang
- Her indexlenebilir sayfada `alternates.canonical` (shorthand `{ canonical }` de OK).
- Multi-locale sayfa: `alternates.languages = buildHreflang(path)`. Path `LOCALIZED_ROUTES`'ta olmalı.
- TR-only sayfa (örn. `/kabatas-bogaz-turu`): `LOCALIZED_ROUTES`'a **EKLEME** — yoksa de/fr/nl için 4×404 hreflang üretir.
- `noindex` sayfalar (reservation, meeting-points): canonical/hreflang gerekmiyor.

### 7. lint-schema.mjs doğru kullanım
- Lint regex'leri 2026-05-18'de precision fix aldı: title/desc artık satır-başı 2-4 boşluk indent ile sadece metadata-level alanları yakalıyor (nested `tourOptions[].title`, MenuItem `description` false-positive vermez). Türkçe apostrof (`"€30'dan"`) artık capture'ı kırmıyor.
- Commit öncesi: `node scripts/lint-schema.mjs` → çıktıda `[meta-desc-long]`, `[title-too-long]`, `[title-suffix-duplicate]`, `[tourist-product-combo]`, `[localbusiness-*]`, `[event-*]` = **0 olmalı**.

---

## 🎁 "DO PER STANDARDS" (kullanıcı bu emri verdiğinde)

Kullanıcı session'da der ki: "kurallara göre /yeni-sayfa-x yaz"

Senin yapacağın:
1. Bu STANDARDS.md'yi yeniden oku (header eserlerini ezberleme — referans olarak tut)
2. Page tipini belirle (pillar / cluster / programmatic)
3. Schema combo seç (TouristTrip+Service / LocalBusiness / Event)
4. Wordcount target uygula
5. Tüm zorunlu öğeleri ekle (H1, TL;DR, table, list, FAQ, schema, CTA, internal links)
6. Validate (schema lint, tsc, build)
7. Post-publish checklist run
8. User'a "X kuralı uyguladım, Y şu sebepten ihmal ettim" raporla

Bu doc kalıcı referans. Yeni page'in standardı bu — sapmayın.
