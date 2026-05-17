# MerrySails — CLAUDE.md

## ⚠️ SEO/GEO/AI Visibility Project Rules

Bu projedeki TÜM commercial sayfa, schema, metadata, locale work için:

- **RULES.md** → universal SEO/GEO/AI standards (Semrush P0/P1/P2 fix guide dahil)
- **KEYWORDS.md** → bu markanın commercial keyword inventory + rank baseline
- **ROADMAP.md** → 90-günlük plan + 30/60/90 milestones

Workflow:
- Yeni sayfa yazımı: KEYWORDS.md'den target keyword seç → RULES.md kalite kontrolü → ROADMAP'i işaretle
- "Kurallara göre yap" emri: RULES.md uygula
- Pillar/cluster/programmatic kararı için ROADMAP'e bak

---

## ⚠️ SEO Rules — Bunlar Bozulursa Tüm Çalışma Boşa Gider

### Schema (Structured Data) Kuralları
1. **NEVER** kullanma `["TouristTrip", "Product"]` — Google Product Snippet validator bunu reddediyor (`availableLanguage`, `inLanguage`, `duration`, `areaServed`, `hasOfferCatalog` Product vocab'da yok). Doğru: `["TouristTrip", "Service"]` veya tek başına `TouristTrip`.
2. **LocalBusiness/TravelAgency schemada `address` ZORUNLU** — boş bırakılamaz. Postal address inline yazılmalı (`@id` referansıyla bağlamak yetersiz, validator kontrol edemiyor).
3. Her sayfada `generateMetadata()` + JSON-LD schema mecburi.
4. Schema'yı eklerken Schema.org validator ile test et: `https://validator.schema.org/?url=...`
4a. **AggregateRating yalnızca şu parent type'larda olabilir** (Google Review snippet spec): `Event`, `Product`, `LocalBusiness`, `Organization`, `Recipe`, `Movie`, `Course`, `Book`, `HowTo`. **NEVER** `Service`, `TouristTrip`, `Place`, `Offer`. Aynı sayfada hem `Event` hem `Service` aggregateRating'i varsa Google parser conflict → SADECE Event'a yaz.
4b. **Event schema required fields**: `name`, `description`, `image`, `startDate`, `endDate`, `eventStatus`, `eventAttendanceMode`, `location`, `organizer`, `performer`. Event.offers required: `availability`, `validFrom`, `price`, `priceCurrency`, `url`. Eksikse GSC warning verir.
4c. **Merchant listings (Offer)** required: `shippingDetails` (use `{@type:OfferShippingDetails, doesNotShip:true}` for cruise/digital), `hasMerchantReturnPolicy.returnMethod`. Eksikse "Merchant listings" warning.
4d. **`npm run lint:schema`** her commit öncesi çalıştır — `scripts/lint-schema.mjs` rules 1-7'yi enforce eder + Event required fields + title suffix + price reality. ZERO ERROR olmadan deploy etme.

### Title Tag Kuralları
5. **Asla `| MerrySails` yazma** title sonuna — root layout zaten `template: "%s | MerrySails Istanbul 2026"` ekliyor. Yazarsan duplicate olur: "X | MerrySails | MerrySails Istanbul 2026".
6. Title max 60 karakter (template suffix dahil). Suffix 28 karakter, demek sayfa kısmı max 32 karakter.
7. Locale title'larında fiyat gösteriyorsan **gerçek fiyatı** yaz: dinner €30 (NOT €55), sunset €34, yacht €280. Yanlış fiyat = yanlış intent.

### URL & Redirect Kuralları
8. **307 redirect = SEO kanıyor.** Kapalı/silinmiş sayfaları next.config.ts'te `permanent: true` ile redirect et.
9. Eski URL'lere işaret eden internal link **bırakma** — `grep -rn "OLD-URL" src/` ile tara.
10. 404 internal link bulursan: ya hedef sayfayı oluştur, ya da redirect ekle, ya da link kaldır.

### H1 / Heading Kuralları
11. **Her sayfada SADECE 1 adet `<h1>`.** Shared component (TourDetailClient gibi) `<h1>` kullanıyorsa, sayfa kendi `<h1>`'ini koyamaz.
12. H2'ler keyword-rich olsun ama spam değil. H3'lere kadar hiyerarşi koru.

### hreflang & i18n Kuralları
13. `<html lang>` STATIK olarak `en` set edilir — root layout'a `headers()` koyma (444 sayfa dynamic olur, SEO regresyonu). Semrush "language mismatch" uyarısı kabul edildi (Google hreflang annotations'ı kullanır, html lang'i değil).
14. hreflang `alternates.languages` her sayfada — `buildHreflang(path)` helper kullan.
15. Multi-locale için 11 future locale tanımlı, ama ACTIVE: `["en", "tr", "de", "fr", "nl"]`.

### Internal Linking
17. Her yeni page'i Footer + Sitemap + llms.txt'e ekle.
18. Orphan page (sitemap'te ama hiçbir sayfa link vermiyor) = düşük crawl priority.
19. Blog post'lar arası en az 3 internal link.

### Content Kuralları
20. **NEVER** uydurma fiyat yazma blog post'larda — `/pricing` route'undan gerçek fiyatları kullan.
21. Paragraph max 80 kelime (Semrush "paragraphs are too long" hatası).
22. Text/HTML ratio %5 altına düşmesin — fazla embedded SVG/script.

---

## Project Overview
MerrySails (merrysails.com) is an Istanbul-based Bosphorus cruise and yacht charter operator. TURSAB A Group licensed since 2001, 50,000+ guests hosted. Direct booking platform targeting English-speaking international tourists, with planned expansion to DE/RU/AR/TR locales. The product portfolio spans public shared cruises, private yacht charters, corporate events, and proposals.

---

## Tech Stack

| Layer | Version |
|-------|---------|
| Next.js | 16.2.4 (App Router, Turbopack) |
| React | 19.2.3 |
| TypeScript | 5 strict |
| Tailwind | 4 (no tailwind.config.ts — CSS-first config) |
| Prisma | 7.7.0 + pg adapter |
| Database | PostgreSQL |
| Email | nodemailer (SMTP) |
| Auth | Custom cookie session (no auth library) |
| Notifications | Telegram bot (TelegramUser model) |
| Analytics | GTM + Microsoft Clarity |
| Ads | Google Ads (Lead Forms → GoogleAdsLead model) |

**No next-intl.** i18n config is custom (`src/i18n/config.ts`).

---

## Key Architecture

```
src/
  app/               # App Router — all public routes are flat (no [locale] prefix yet)
    [route]/page.tsx # Each page has generateMetadata() + JSON-LD schema
    layout.tsx       # Root: DM Sans, GTM, Clarity, Organization+SiteNav schema
    robots.txt/      # Dynamic route handler
    sitemap.xml/     # Dynamic route handler
    llms.txt/        # AI visibility file
    llms-full.txt/   # Extended AI visibility
    admin/           # Password-protected admin panel
    api/             # Route handlers (reservations, webhooks, Telegram, Google Ads)
  components/
    blog/            # Blog-specific: key-takeaways, ToC, section renderer, author-card
    home/            # Homepage sections
    layout/          # SiteChrome (header+footer)
    analytics/       # AnalyticsRouteTracker
    booking/         # Reservation flow
    ui/              # shadcn-style UI primitives
  data/
    blog.ts          # 3583 lines, 114 posts — DO NOT read whole file (use grep + offset)
    tours.ts         # Tour definitions with packages/pricing
    guides.ts        # 12 Bosphorus guides
    faq.ts           # Site-wide FAQ data
    fleet.ts         # Yacht fleet info
    testimonials.ts  # Customer testimonials
    team.ts          # Author profiles (captain-ahmet, editorial)
  content/
    blog.ts          # Commercial support posts (supplemental BlogPost entries)
  i18n/
    config.ts        # SUPPORTED_LOCALES (12), ACTIVE_LOCALES (["en"]), RTL_LOCALES (["sa"])
    localize.ts      # Utility functions
  lib/
    admin-auth.ts    # Cookie-based admin session
    prisma.ts        # Prisma client singleton
prisma/
  schema.prisma      # Models: Reservation, TelegramUser, ContactMessage, GoogleAdsLead, TourOperationDay, BookingPrefill
data/                # SEO work files (not src/)
  gsc/               # GSC CSV exports
  serp/              # SERP rank tracking CSVs
  seo-inventory-2026-04-27.md  # Content + SEO inventory
docs/
  ads/               # Google Ads editor CSV files
```

---

## Conventions

### General
- `cn()` from `clsx` + `tailwind-merge` for conditional classes
- Server components by default; `'use client'` only for state/hooks
- `generateMetadata()` required on every public page
- JSON-LD schema required on every public page
- Prices in EUR only in user-facing copy
- WhatsApp CTA: +90 544 898 98 12

### i18n
- Default and only active locale: `en`
- 11 future locales in `FUTURE_LOCALES` — architecture is ready but routes not built
- RTL: `sa` (Arabic) only
- No `[locale]` folder prefix — when multi-locale launches, App Router refactor needed

### Image Handling
- `next/image` with `fill` or explicit dimensions
- External: only `images.unsplash.com` allowed in remotePatterns
- Local images in `public/images/`

### Blog
- **NEVER read blog.ts in full** — use `grep -n 'slug: "TARGET"' src/data/blog.ts` then `offset+limit`
- Linter auto-modifies blog.ts after writes → use Python atomic read/write scripts (not Edit tool)
- Pattern to find insert point: `];\n\nexport function getBlogBySlug`

---

## SEO Priority

### Status (2026-04-27)
- Site is in early indexation — 0 clicks, 1,170 impressions in 3 months
- Best position: "eminönü waterfront" at pos 10.5 (informational guide)
- All commercial keywords: pos 60-100+ (sandbox phase)

### Infrastructure
- ✅ robots.txt: all AI bots allowed
- ✅ llms.txt + llms-full.txt
- ✅ Organization + SiteNavigation schema in root layout
- ✅ generateMetadata() on all pages except /blog listing
- ✅ Sitemap: dynamic, includes blog + guides + tours
- ✅ Redirects: www→non-www, old URLs → canonical slugs
- ❌ Homepage H1 missing
- ❌ /yacht-charter-istanbul H1 missing
- ❌ Multi-locale build (11 locales pending)

### Keyword Pillars
1. **Bosphorus Cruise** → /bosphorus-cruise (6,600/mo, KD 42)
2. **Dinner Cruise Istanbul** → /istanbul-dinner-cruise + /cruises/bosphorus-dinner-cruise (1,600/mo)
3. **Yacht Charter Istanbul** → /yacht-charter-istanbul (590/mo)
4. **Sunset Cruise Istanbul** → /cruises/bosphorus-sunset-cruise (480/mo)

### hreflang
Currently: no hreflang (single locale). When multi-locale launches, use `alternates.languages` in `generateMetadata()`.

---

## Session & Deploy Rules

### Deploy Policy
- **Max 1 deploy per day**, acil bug fix olmadıkça
- Deploy **sadece session sonunda, kullanıcı açıkça istediğinde** yapılır
- Her deploy öncesi `npm run build` lokal çalıştır — Vercel'e broken build gönderme
- Build hata veriyorsa deploy yapma, önce düzelt

### Autonomy
- Onay beklemeden çalış — yapıyı bozma, çalışan şeyi bozma, doğru yap
- Model değişikliği (Opus↔Sonnet) Claude seçer, kullanıcıdan onay bekleme

### Model Seçimi
- Blog post / guide / commercial page copy yazımı → **Opus** (kalite kritik)
- Orta komplekslik (schema, metadata, route handler) → **Sonnet**
- Basit fix / grep / dosya okuma → **Haiku**
- Geçiş kararı Claude verir, kullanıcıdan onay bekleme

### Tracking & Analytics
- Bot/AI crawler tracking önemli — middleware.ts ile UA loglama yapılacak
- GSC + Clarity + GTM veri kalitesi yüksek tutulacak

### CookieConsent
- Cookie consent modal **gerekmez** — müşteri hukuki yaptırım riski almadı, karar verildi
- GTM mevcut şekliyle çalışmaya devam eder

---

## Active Skills

| Skill | Active | Notes |
|-------|--------|-------|
| seo-eeat | ✅ | Primary content optimization |
| seo-schema | ✅ | FAQPage, TourActivity, LocalBusiness |
| seo-meta | ✅ | generateMetadata review |
| seo-technical | ✅ | Core Web Vitals, robots, sitemap |
| seo-content-plan | ✅ | Blog + guide planning |
| seo-internal-linking | ✅ | Cross-linking tours/blog/guides |
| ui-component | ✅ | Booking UI components |
| analytics-setup | ✅ | GTM, Clarity, bot UA logging |
| performance-audit | ✅ | LCP/CLS/INP optimization |
| seo-programmatic | ❌ | Not needed currently |

Google Ads: ACTIVE. Meta Ads: unknown (ask user). Yandex: not integrated.

---

## 🔁 Daily Routine — kullanıcı "devam et" / "bugün ne yapacağız" derken otomatik kontrol et

Her gün başlatıldığında (kullanıcı "devam et" / "ne durumdayız" dediğinde), bu sıralı checklist'i ÇALIŞTIR:

1. **GSC URL Inspection** (10-14 priority URL, son `data/gsc/url-inspection-YYYY-MM-DD.json`'dan farklı bir tarihteyse) — schema fix recrawl, yeni pillar discovery, sandbox-break verify
2. **GSC Search Analytics** son 7d query/page/country pull — CTR krizleri ve yüksek imp / düşük click pages tespit
3. **Yandex Reindex** (150/gün quota) — yeni içerik veya şu ana kadar indexlenmemiş URL'ler için. Quota reset 00:00 UTC
4. **IndexNow ping** (Bing + Yandex) — son commit'teki tüm değişen URL'ler için (her commit sonrası rutin)
5. **Wayback Machine** archive (yeni pillar veya schema fix sonrası) — AI training data fodder
6. **Bing Webmaster AI Performance** check (haftada 1) — Microsoft Copilot citation count
7. **Schema lint + tsc + Semrush-grade audit** (her oturumda 1 kere) — `node scripts/lint-schema.mjs && node scripts/seo-audit-comprehensive.mjs && npx tsc --noEmit`. P0 = 0 olmadan deploy etme

### Yüksek hacimli keyword PRIORITY indexing

**KURAL (2026-05-14 güncel):** Kullanıcı "yat / sunset / dinner cruise odaklı müşteri çekmek" diye netleştirdi. Özel etkinlik sayfaları (proposal, team-building, corporate-yacht-dinner, product-launch, client-hosting, photographer) **düşük converting** — manual indexing slot'unu YEMEK Yat/Sunset/Dinner için kullan. Event sub-page'ler sitemap'te ve yat hub'dan link var, organic discovery yeterli.

#### Tier 1 — 3 Core commercial pages (her gün manual indexing önce burada):
- **YAT KİRALAMA** — `/tr/yacht-charter-istanbul` + `/yacht-charter-istanbul` + `/tr/blog/yat-kiralama-istanbul-fiyat-rehberi-2026` (3,800 TR + 590 EN = **4,390 vol/mo**)
- **SUNSET CRUISE** — `/cruises/bosphorus-sunset-cruise` + `/tr/cruises/bosphorus-sunset-cruise` + `/de/cruises/bosphorus-sunset-cruise` (480 EN + 360 TR + 480 DE = **1,320 vol/mo**)
- **DİNNER CRUISE** — `/istanbul-dinner-cruise` + `/tr/istanbul-dinner-cruise` (1,600 EN + 1,400 TR = **3,000 vol/mo**)

#### Tier 2 — Compare hubs + commercial pillars (sonra):
- `/tr/bosphorus-cruise` (6,600 vol TR boğaz turu)
- `/bosphorus-cruise` (EN compare hub)
- `/blog/istanbul-cruise-complete-guide-2026` (1,200 EN)
- `/tr/blog/bogaz-turu-fiyat-rehberi-istanbul-2026` (1,490 TR)
- `/de/bosphorus-cruise` + `/de/blog/bosporus-kreuzfahrt-preise-rehber-2026` (1,440 DE)
- `/fr/bosphorus-cruise` + `/fr/blog/croisiere-bosphore-prix-guide-2026` (600 FR)
- `/nl/blog/bosphorus-cruise-prijzen-gids-2026` (170 NL)

#### Tier 3 — Informational pillars (low booking intent, organic discovery yeterli):
- 5 Princes Islands pillars (EN+TR+DE+FR+NL)
- Galataport shore excursion (when built — 6,450 vol US/GB)
- All blog support posts (CTR rewrites)

#### Tier 4 — DEPRIORITIZED (manual indexing slot harcamayın):
- Event-specific yat sub-pages: `/proposal-yacht-rental-istanbul`, `/proposal-yacht-with-photographer-istanbul`, `/corporate-yacht-dinner-istanbul`, `/team-building-yacht-istanbul`, `/client-hosting-yacht-istanbul`, `/product-launch-yacht-istanbul`
- Kullanıcı 2026-05-14: "özel etkinlikler, doğum günü, evlilik teklifi vs. çok da gelmiyor". Sitemap + yat hub link yeterli, manual quota'yı buralarda harcamayın.

### Yeni sayfa / yeni içerik geldiyse — otomatik tetikle

Her commit'ten sonra (özellikle yeni blog post, yeni service page, yeni locale variant):
1. IndexNow ping (3 endpoint × yeni URL listesi)
2. Yandex Reindex submit (UI üzerinden, ben browser'la)
3. Wayback save
4. GSC URL Inspect 24-48 saat sonra (recrawl bekleyişi)

Bu rutini ben otomatik yaparım — kullanıcı her seferinde "Yandex'e submit ettin mi" diye sormak zorunda kalmasın.

---

## Active Missions

_(none — link missions here when opened)_

---

## Known Issues

1. **blog.ts linter issue** — Auto-formatting after write breaks Edit tool; use Python atomic scripts
2. **worktree build** — `npm run build` sadece ana proje dizininden (`/Users/resat/Desktop/merrysails/`) çalışır; worktree'de tsc --noEmit ile type check yap, symlink: `ln -sf /proje/node_modules worktree/node_modules`

## ✅ Resolved (2026-04-27)
- H1 tags: HeroSection + TourDetailClient içinde mevcut — sorun yoktu
- /blog page generateMetadata() — eklendi
- AI bot tracking — proxy.ts + /api/bot-visit + BotVisit Prisma model + daily stats digest

---

## Brand
- TURSAB A Group licensed since 2001
- "50,000+ guests" trust signal
- E-E-A-T phrases: always include at least 1 per commercial page
- See `.claude/brand/voice.md` and `.claude/brand/about.md`

---

## Mission brief (2026-05-04)

> Read `~/.config/brand-ops/playbook.md` first.

**Brand**: Merrysails — sunset & dinner cruise (4-5 lokal).
**Ads bütçe**: 2K TRY/gün.
**Coğrafi alan**: **yurtdışı** — UK, Almanya, Ukrayna, Çin (Türk turist hedefi DEĞİL).
**Servis tipi**: cruise — transfer DEĞİL.
**Negative keyword** (zorunlu): transfer, taxi, taksi, airport, havalimanı, vip transfer.
**Test fokusu**: ürün sayfaları + anasayfa (sunset cruise + dinner cruise). PMax kapalı kalsın (KWT'de işe yaramadı).

## How to win
1. UK + DE + UA için ayrı kampanya (her birinde multi-language ad group: native + en)
2. Çin için ayrı bütçe testi (Yandex/Baidu organic dipnotu — Google Ads erişimi sınırlı CN için)
3. Visual-heavy landing page (cruise için video/foto kritik) — CWV bottleneck olmasın
4. Schema: TouristAttraction + Event + Product

## 🚨 Critical findings (2026-05-04 backlink audit)

**6 backlink target'ından 4'ünde SSR'de H1 YOK** — Googlebot bu sayfaları H1'siz görüyor (link juice ana keyword'e bağlanmıyor):
- ✅ `/` (anasayfa) — H1 SSR'de var (`Bosphorus Cruise Istanbul`)
- ❌ `/cruises/bosphorus-sunset-cruise` — H1 YOK SSR'de (client-side render?)
- ❌ `/istanbul-dinner-cruise` — H1 YOK SSR'de
- ❌ `/de/cruises/bosphorus-sunset-cruise` — H1 YOK + anchor "bosporus sonnenuntergangsfahrt istanbul" sayfada yok
- ❌ `/de/istanbul-dinner-cruise` — H1 YOK + title 93 char
- ⚠️ `/de` — title 76 char + 596 word (zayıf)

Acil fix: cruise detail page'ler için JSX'te `<h1>` server-rendered olmalı. Eğer Astro/Next.js ile dinamik içerik geliyorsa `'use client'` öncesinde tanımla, ya da Server Component'te statik H1 koy.

**Anchor mismatch**: Backlink alacağımız anchor text sayfada exact match olmalı — `/de/cruises/...`'de "bosporus sonnenuntergangsfahrt istanbul" body'de yok. Backlink boşa gider.

## Disavow file (kullanıcı talimatı)

Spam/zararlı backlink'ler GSC > Linkler > External links → CSV export et → toxic olanları `disavow.txt` formatında GSC > Disavow Tool'a yükle. Kontrol kriteri: TF/CF düşük (<10), spam score yüksek (>50%, Moz/Ahrefs/SEMrush), unrelated niche.

DataForSEO Backlinks API ile aylık otomatik tarama: `POST /v3/backlinks/summary/live` ile spam_score >50% olanları flag.

## How to win — güncel
1. **Tüm cruise pages'e H1 ekle** (Hero üstü `<h1>` — JSX'te `<h1 className="...">{t('hero.title')}</h1>`)
2. Desc'leri 150 char'a indir (Google'da kesik göstermesin)
3. /de pages'i 596 → 1500+ word genişlet (gerçek Almanca, EN copy değil)
4. Disavow file kur + monthly cron review


## DataForSEO insights (2026-05-04)

**Merrysails niş ve dar — ama az rakipli**:

| Pazar | Toplam volume | Top keyword | CPC |
|---|---|---|---|
| UK | ~1200/ay | "istanbul cruise" 480 | $2.53 |
| DE | ~90/ay | "istanbul dinner cruise" 40 | $2.32 |
| UA | ~20/ay | (ihmal) | - |
| CN | ~40/ay | "bosphorus cruise" 30 | $1.90 |

**Aksiyon**:
- 2K bütçe **UK ağırlıklı** olmalı (1500 TRY → UK, 500 TRY → DE)
- UA/CN şu an test etmeye değmez — volume çok düşük
- "bosphorus cruise istanbul" 320 vol $2.59 → ana sayfadaki agresif backlink hedefi