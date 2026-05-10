# MerrySails Analytics + Service Page Audit — 2026-05-10

---

## Section 1 — Analytics & Tracking Audit

### Architecture Overview

- GTM container ID: **BLOCKED** (GTM-MWVS696K is hardcoded as blocked in `layout.tsx` — correct, to prevent cross-contamination with Merry Tourism)
- GA4: fires via direct `gtag('config', GA_MEASUREMENT_ID, { send_page_view: true })` loaded with the AW tag
- Google Ads: direct `gtag('event', 'conversion', ...)` calls from `src/lib/analytics.ts`
- Microsoft Clarity: inline stub + CDN script, both in `layout.tsx`
- SPA route tracking: `AnalyticsRouteTracker` component — calls `trackPageView()` on every `pathname` + `searchParams` change
- Attribution persistence: `sessionStorage` key `merrysails:first-attribution`, first-touch model

---

### Event-by-Event Matrix

| # | Event | Triggered in Code | Event Name | UTM/gclid Attribution | Enhanced Conversions (SHA256) | Clarity Tags | Status |
|---|-------|:-----------------:|------------|:---------------------:|:-----------------------------:|:------------:|--------|
| 1 | Page view | YES — `AnalyticsRouteTracker` on every route change; initial fire via `gtag('config', ..., { send_page_view: true })` in layout | `page_view` | YES — `traffic_attribution` dataLayer push with gclid/gbraid/wbraid/utm_* on every page view; first-touch stored in sessionStorage | N/A | YES — `traffic_channel`, `traffic_source`, `landing_path`, `first_traffic_channel`, etc. | PASS |
| 2 | Begin checkout | YES — `CoreBookingPlanner.handleContinue()` and `BookingSidebar` both call `trackBeginCheckout()` on "Continue to booking" click | `begin_checkout` | YES — attribution is stored first-touch at page view time | N/A | YES — `tour_slug`, `item_name`, `item_variant`, `guests`, `value` via `CLARITY_EVENT_TAG_KEYS` | PASS |
| 3 | Purchase / reservation submitted | YES — `BookingModal.handleSubmit()` calls `trackPurchase()` immediately on `createReservation` success | `purchase` + `conversion` (Google Ads) | YES — `getStoredAttribution()` sends first-touch data to server action via `attribution` field; Prisma saves gclid/gbraid/wbraid/utmSource etc. on the Reservation row | YES — `sha256_email_address`, `sha256_phone_number`, `sha256_first_name`, `sha256_last_name` via `setEnhancedConversionsUserData()` called before `trackEvent` | YES — `tour_slug`, `item_name`, `transaction_id`, `value` | PASS |
| 4 | Booking abandonment | YES — `BookingModal.sendAbandonment()` triggered by `beforeunload`, `pagehide`, `visibilitychange`, backdrop click, close button, unmount; only fires if `hasBookingAbandonmentContact()` returns true (email or phone entered) and server POST to `/api/booking-abandonment` succeeds | `booking_abandonment` + `conversion` (Google Ads `abandonment` label) | YES — first-touch stored at page view time | YES — `sha256_email_address` and `sha256_phone_number` called before abandonment conversion fires | YES — `trigger`, `fields_completed`, `item_name`, `guests`, `value` | PASS |
| 5 | WhatsApp click | YES — `TrackedContactLink` (kind="whatsapp") calls `handleTrackedContactNavigation()` → `trackWhatsAppClick()` throughout site; also in `BookingCalendar`, `BookingModal` | `whatsapp_click` + `contact_us` + `conversion` (Google Ads `whatsapp` label) | YES — first-touch stored at page view time | NO — no user data hashing for WhatsApp clicks (user hasn't entered form fields at that point — correct by design) | YES — `click_label`, `click_location`, `contact_intent`, `contact_method` | PASS |
| 6 | Phone click | YES — `TrackedContactLink` (kind="phone") calls `handleTrackedContactNavigation()` → `trackPhoneClick()` | `phone_click` + `contact_us` + `conversion` (Google Ads `phone` label) | YES | NO — by design, same as WhatsApp | YES — `click_label`, `click_location`, `contact_method` | PASS |
| 7 | Contact form submit | YES — `ContactForm.tsx` calls `trackContactSubmitSuccess()` on server action success | `contact_submit_success` + `submit_form` + `contact_us` + `generate_lead` (4 events) + `conversion` (Google Ads `contact` label) | YES — `getStoredAttribution()` sent to `submitContactForm` server action | YES — `sha256_email_address` and `sha256_first_name/last_name` | YES — `contact_method`, `form_subject`, `page_path` | PASS |
| 8 | Booking PDF download / Voucher download | NO — `ReservationPdfPreview` component renders as a plain `<a href>` download link. No `onClick` tracking. Voucher and invoice PDF download clicks are untracked. | N/A | N/A | N/A | N/A | **FAIL — P1** |
| 9 | Voucher view | PARTIAL — page view fires on `/reservation/[id]/voucher` route. No dedicated `voucher_view` event. | `page_view` (generic) | YES (generic page_view) | N/A | YES (generic `page_path`) | PARTIAL |
| 10 | Newsletter signup | YES — `NewsletterSignup.tsx` fires a `generate_lead` event on success | `generate_lead` | NO — fires `window.gtag` directly; **bypasses `analytics.ts` wrapper, so no dataLayer push, no Clarity tag, no first-touch attribution params** | NO | NO | **FAIL — P1** |

---

### Customer Journey Attribution Verification

**First-touch model:** `getTrafficAttribution()` reads `gclid`, `gbraid`, `wbraid`, `gad_source`, `utm_*` from the current URL on landing. Written to `sessionStorage['merrysails:first-attribution']` once and never overwritten.

- gclid/gbraid/wbraid are read from URL params on every page view — only the **first** is persisted.
- `getStoredAttribution()` returns the flat shape and is passed to `createReservation()` server action — fields are saved to the `Reservation` Prisma row (columns: `gclid`, `gbraid`, `wbraid`, `utmSource`, `utmMedium`, `utmCampaign`, etc.).
- AI referral sources (ChatGPT, Perplexity, Claude, Gemini, Copilot, DeepSeek, Grok, etc.) are detected and tagged as `channel: 'ai_referral'` with `aiSource` set.
- Navigation delay (180ms) on WhatsApp/phone links allows `trackWhatsAppClick`/`trackPhoneClick` to fire before navigation.

**Verdict:** Attribution chain is solid for paid search and organic. Session boundary (tab close or 30-min session reset) will lose attribution if the user returns later — this is expected behavior for a sessionStorage-only model. No cross-device attribution.

---

### Microsoft Clarity Smart Events Enabled

The following custom tags are set via `clarity('set', key, value)` on qualifying events:

**Traffic/Session tags (set on every page view):**
- `traffic_channel`, `traffic_source`, `traffic_medium`, `utm_campaign`, `utm_content`, `utm_term`
- `ai_source`, `google_click_id_type` (`gclid`/`gbraid`/`wbraid`)
- `landing_path`, `referrer_host`
- `first_traffic_channel`, `first_traffic_source`, `first_traffic_medium`, `first_utm_campaign`, `first_landing_path`
- `browser_language`, `browser_languages`, `rtl_user`
- `page_path` (on every route change via `ClarityIdentityProvider`)

**Event tags (set when events fire):**
- `click_label`, `click_location`, `contact_intent`, `contact_method`
- `currency`, `fields_completed`, `guests`, `item_name`, `item_variant`
- `package_name`, `page_context`, `page_path`, `reservation_date`
- `tour_slug`, `trigger`, `value`

**Error tags:**
- `js_error`, `promise_rejection`

**Deduplication:** `safeClarityEvent()` uses sessionStorage-based dedup per event name per session — prevents double-counting.

---

### Critical Gaps (P0/P1)

| Priority | Issue | Location | Impact |
|----------|-------|----------|--------|
| **P0** | Newsletter signup fires raw `window.gtag()` directly, bypassing `analytics.ts` entirely — no dataLayer push, no Clarity tags, no attribution params attached | `src/components/marketing/NewsletterSignup.tsx:44` | Newsletter conversions invisible in GA4 behavioral reports; no Clarity session tag; no attribution data |
| **P1** | Voucher PDF download and Invoice PDF download are plain `<a href>` links with no onClick tracking | `src/components/reservation/ReservationPdfPreview.tsx` + voucher/invoice pages | Cannot measure post-booking engagement; no signal of how many confirmed customers download their travel documents |
| **P1** | Voucher page view is a generic `page_view`, not a dedicated `voucher_view` event — no way to build GA4 funnel: Purchase → Voucher View → PDF Download | `src/app/reservation/[id]/voucher/page.tsx` | Post-booking funnel analysis not possible |

**Note:** The newsletter P0 is worth a one-line fix but the event is `generate_lead` fired directly on the gtag path that IS configured (GA_MEASUREMENT_ID is set in the config). It reaches GA4 but misses Clarity and dataLayer. Low conversion volume makes this P1-equivalent in practice, not true P0 since the GA4 signal does land.

---

### No P0 Broken Events Found

No fire-and-forget path with a missing track call was found for the core booking funnel. All 5 Google Ads conversion labels have corresponding tracking calls. The only structural gap is the newsletter bypass and PDF download absence. No code changes were made.

---

## Section 2 — Service Page Gap Audit

### Existing Commercial Page Inventory

| Path | Target Keyword (Primary) | Approx. Lines | Schema Present | Intent |
|------|--------------------------|:-------------:|:--------------:|--------|
| `/bosphorus-cruise` | bosphorus cruise istanbul | 775 | YES (TouristTrip + Product + FAQPage) | commercial-high |
| `/istanbul-dinner-cruise` | istanbul dinner cruise | 479 | YES (TouristTrip + AggregateOffer + FAQPage) | commercial-high |
| `/yacht-charter-istanbul` | yacht charter istanbul | 522 | YES (TouristTrip + Service) | commercial-high |
| `/boat-rental-istanbul` | boat rental istanbul | 545 | YES | commercial-high |
| `/cruises/bosphorus-sunset-cruise` | sunset cruise istanbul | ~dynamic | YES (TouristTrip, Event conditional) | commercial-high |
| `/cruises/bosphorus-dinner-cruise` | bosphorus dinner cruise | ~dynamic | YES | commercial-high |
| `/sunset-cruise-tickets-istanbul` | sunset cruise tickets istanbul | 548 | YES | commercial-high |
| `/turkish-night-dinner-cruise-istanbul` | turkish night dinner cruise | 568 | YES | commercial-high |
| `/dinner-cruise-with-hotel-pickup-istanbul` | dinner cruise hotel pickup | 625 | YES | commercial-medium |
| `/kabatas-dinner-cruise-istanbul` | kabatas dinner cruise | 595 | YES | commercial-medium |
| `/private-bosphorus-dinner-cruise` | private dinner cruise istanbul | 320 | YES | commercial-high |
| `/private-dinner-cruise-for-couples-istanbul` | dinner cruise for couples | 406 | YES | commercial-medium |
| `/boat-rental-hourly-istanbul` | hourly boat rental istanbul | 477 | YES | commercial-medium |
| `/compare-bosphorus-cruises` | compare bosphorus cruises | 510 | YES | informational/commercial |
| `/istanbul-cruise-faq` | istanbul cruise faq | 419 | YES | informational |
| `/private-events` | private events istanbul yacht | 262 | YES | commercial-medium |
| `/corporate-events` | corporate yacht events istanbul | 403 | YES | commercial-medium |
| `/proposal-yacht-rental-istanbul` | proposal yacht istanbul | 338 | YES | commercial-medium |
| `/team-building-yacht-istanbul` | team building yacht | 401 | YES | commercial-medium |
| `/client-hosting-yacht-istanbul` | client hosting yacht | 401 | YES | commercial-medium |
| `/kurucesme-marina-yacht-charter` | kurucesme marina charter | 405 | YES | commercial-medium |
| `/bosphorus-cruise-departure-points` | departure points bosphorus | 355 | YES | informational |
| `/dinner-cruise-pickup-sultanahmet-taksim` | dinner cruise pickup | 382 | YES | commercial-medium |
| `/product-launch-yacht-istanbul` | product launch yacht | 379 | YES | commercial-medium |
| `/corporate-yacht-dinner-istanbul` | corporate yacht dinner | 417 | YES | commercial-medium |

**Thin pages (under ~200 lines, likely <500 words):** `/private-events` (262 lines) and `/private-tours` (236 lines) are candidates — both are likely thin by word count standards.

---

### Gap Matrix: Keywords Ranking Pos 11-30 with No Dedicated Page

Based on keyword research (2026-05-01) cross-referenced with existing pages:

| Keyword Cluster | Volume | Market | Gap Type | Closest Existing Page |
|----------------|--------|--------|----------|-----------------------|
| `boğaz turu` / `istanbul boğaz turu` (TR) | 6,600 + 3,600/mo | TR | **Locale page gap** — `/tr/bosphorus-cruise` exists in `[locale]` routes but quality/depth of TR content unknown | `/tr/bosphorus-cruise` (locale exists) |
| `tekne kiralama istanbul` (TR) | 1,900/mo | TR | **Locale page gap** — `/tr/boat-rental-istanbul` exists but depth unknown | `/tr/boat-rental-istanbul` (locale exists) |
| `yat kiralama istanbul` (TR) | 1,900/mo | TR | **Locale page gap** — `/tr/yacht-charter-istanbul` exists | `/tr/yacht-charter-istanbul` (locale exists) |
| `bosporus istanbul` / `bootsfahrt istanbul` (DE) | 480 + 50/mo | DE | Locale page exists (`/de/bosphorus-cruise`) but CLAUDE.md notes DE title is 93 chars (over limit) and content is thin (~596 words) | `/de/bosphorus-cruise` |
| `istanbul bosphore croisiere` (FR) | 390/mo | FR | `/fr/bosphorus-cruise` exists | `/fr/bosphorus-cruise` |
| `bosphorus cruise for couples` (EN) | est. 200-500/mo | EN | **No dedicated page** — covered partially in `/private-dinner-cruise-for-couples-istanbul` but no public cruise version | None — nearest is private dinner cruise |
| `morning bosphorus cruise` (EN) | unclear | EN | **No dedicated page** | None |
| `gece boğaz turu` (TR night cruise) | 70/mo | TR | **No dedicated TR night cruise page** | `/turkish-night-dinner-cruise-istanbul` (EN only) |
| `istanbul tekne kiralama doğum günü` (birthday boat) | 30/mo | TR | **No page** — content gap for birthday boat rental | None |

---

### Top 5 New Page Recommendations

| Rank | Page | Target Keyword | Volume Potential | Effort | Notes |
|------|------|---------------|-----------------|--------|-------|
| 1 | `/tr/bosphorus-cruise` content depth upgrade | `boğaz turu` + `istanbul boğaz turu` + price FAQ cluster | 6,600+/mo (TR) | **Small** — locale page exists, needs pricing FAQ section + schedule section in real Turkish | KD=0, biggest single opportunity in the dataset |
| 2 | `/de/bosphorus-cruise` content expansion | `bosporus istanbul` + `bootsfahrt istanbul` | 480+/mo (DE) | **Small** — page exists, expand from 596 words to 1,500+; fix title to <60 chars; add H1 | CLAUDE.md flagged: H1 missing, title 93 chars |
| 3 | `/bosphorus-cruise-for-couples` (NEW EN page) | `bosphorus cruise for couples` | est. 200-500/mo (EN, global) | **Medium** — new page; differentiated from private dinner cruise by focusing on shared/sunset cruise experience for two; add couple-specific schema/FAQ | No EN page targets this intent currently |
| 4 | `/tr/turkish-night-dinner-cruise-istanbul` or `/tr/istanbul-gece-bogaz-turu` (NEW TR page) | `gece boğaz turu` | 70/mo (TR, KD=0) | **Medium** — new TR locale page; `/turkish-night-dinner-cruise-istanbul` exists in EN only; TR version captures night cruise intent | Locale route architecture ready |
| 5 | `/de/istanbul-dinner-cruise` content + H1 fix | `bosporus dinner-kreuzfahrt` (DE) | 10/mo (DE, small but zero comp) | **Small** — page exists; CLAUDE.md flagged H1 missing SSR; add proper H1 and expand content | CLAUDE.md critical finding from backlink audit |

---

### Schema Coverage Summary

All audited commercial pages have schema. Confirmed schema types:
- Primary commercial pages: `TouristTrip`, `Service`, `Product` (where appropriate), `AggregateRating`
- Root layout: `TravelAgency`, `LocalBusiness`, `WebSite`, `Person` (Captain Ahmet), `SiteNavigationElement`
- FAQ pages: `FAQPage`
- Blog/guides: `Article`/`BlogPosting`

No schema gaps found on existing commercial pages.

---

## tsc Result

**CLEAN** — `npx tsc --noEmit` returned 0 errors, 0 warnings.

---

*Audit completed: 2026-05-10. Files read: analytics.ts, layout.tsx, AnalyticsRouteTracker.tsx, ClarityIdentityProvider.tsx, TrackedContactLink.tsx, ErrorTracker.tsx, WebVitalsReporter.tsx, BookingModal.tsx, BookingCalendar.tsx, CoreBookingPlanner.tsx, BookingSidebar.tsx, reservation.ts (server action), NewsletterSignup.tsx, ReservationPdfPreview.tsx (component grep), voucher/page.tsx, keyword-research-2026-05-01.md, seo-inventory-2026-04-27.md.*
