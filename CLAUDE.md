# MerrySails — CLAUDE.md

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
- WhatsApp CTA: +90 537 040 68 22

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
