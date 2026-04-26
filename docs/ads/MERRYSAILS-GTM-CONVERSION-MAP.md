# MerrySails GTM + Conversion Map

## Goal

Use one `Google Tag Manager` container for MerrySails and keep paid-media optimization centered on high-intent Istanbul cruise leads.

Current Merry/MerrySails GTM container:

- `NEXT_PUBLIC_GTM_CONTAINER_ID=GTM-MWVS696K`
- GTM account/container: `Merry` / `merrytourism.com`
- Vercel env status on 24 Apr 2026: `NEXT_PUBLIC_GTM_CONTAINER_ID`, `NEXT_PUBLIC_CLARITY_PROJECT_ID`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`, and `NEXT_PUBLIC_GOOGLE_ADS_ID` are set for `Production` and `Development`. A new production deploy is still required before the new app-side GTM bootstrap appears on `merrysails.com`.

## Recommended Tag Architecture

- `1 GTM container` on the whole site: `GTM-MWVS696K`
- `1 GA4 Configuration` tag inside GTM
- `1 Google Ads Conversion Linker` tag inside GTM on all pages
- `1 Google Ads remarketing / Google tag` setup inside GTM
- `5 Google Ads conversion actions` mapped from site events
- `1 Microsoft Clarity` script loaded directly by the app

## Site Event Sources

The Google stack should load only through GTM. GA4 and Google Ads must be installed inside GTM, while the site pushes structured `dataLayer` events. Clarity stays independent from Google and is loaded directly by the app.

Core events:

- `page_view`
- `traffic_attribution`
- `begin_checkout`
- `purchase`
- `contact_submit_success`
- `generate_lead`
- `booking_abandonment`
- `phone_click`
- `whatsapp_click`
- `google_ads_conversion`

## Primary vs Secondary

### Primary

- `purchase`

### Secondary

- `contact_submit_success`
- `phone_click`
- `whatsapp_click`
- `booking_abandonment`
- `begin_checkout`

## Suggested Google Ads Values

- `purchase`: dynamic booking value in `EUR`
- `contact_submit_success`: `350 TRY`
- `phone_click`: `300 TRY`
- `whatsapp_click`: `300 TRY`
- `booking_abandonment`: `250 TRY`

These micro-conversions should stay `secondary` until lead quality proves they deserve promotion.

## GTM Trigger Plan

### GA4

- Use GA4 measurement ID `G-9B3Q7FM7X8` inside GTM.
- Keep the GA4 Configuration tag in GTM only.
- Fire a `GA4 Event` tag for each custom event name
- Keep `purchase` and `generate_lead` available for Google Ads import if needed

### Google Ads

- Use Google Ads tag ID `AW-18112460958` inside GTM only.
- Add a `Conversion Linker` tag that fires on all pages.
- Preferred trigger path:
  - listen to `google_ads_conversion`
  - filter by `conversion_name`
  - map each conversion to its own Ads conversion tag
  - map `value`, `currency`, and `transaction_id` from dataLayer variables where available

Recommended mappings:

- `conversion_name = purchase` → `MS Purchase - Reservation` / `AW-18112460958/UNEQCIWVrqEcEJ7x2LxD`
- `conversion_name = contact` → `MS Contact Submit Success` / `AW-18112460958/9qixCP64saEcEJ7x2LxD`
- `conversion_name = phone` → `MS Phone Click` / `AW-18112460958/ZirXCPu4saEcEJ7x2LxD`
- `conversion_name = whatsapp` → `MS WhatsApp Click` / `AW-18112460958/gnRdCPi4saEcEJ7x2LxD`
- `conversion_name = abandonment` → `MS Booking Abandonment` / `AW-18112460958/jRdoCIG5saEcEJ7x2LxD`

As of 24 Apr 2026, Google Ads conversion actions are configured with `purchase` as the only primary conversion. `contact`, `phone`, `whatsapp`, and `abandonment` are secondary and excluded from the `Conversions` column.

GTM live status on 24 Apr 2026:

- `Sürüm 2 - MerrySails GA4 + Ads conversions + Clarity baseline` is published live.
- Production deployment `dpl_7EMibLeQmBMTkdQ9HfKSH8erirEy` is aliased to `https://merrysails.com`.
- `MS - Conversion Linker` fires on `All Pages`.
- `MS - Google Tag - GA4` fires on `Initialization - All Pages`.
- `MS - DataLayer Tracking Router` fires on `All Pages` and routes the site's `google_ads_conversion` events to the correct Google Ads conversion labels.
- The live GTM container JS contains `G-9B3Q7FM7X8`, `AW-18112460958`, and all five MerrySails conversion labels.
- Live browser QA on `https://merrysails.com` confirmed that `purchase`, `contact`, `phone`, `whatsapp`, and `abandonment` route to the intended Google Ads labels with `value`, `currency`, and `transaction_id`.

## Campaign Optimization Intent

### Search

- Total daily budget: `3000 TL`
- Owner intent:
  - `Sunset`
  - `Dinner`
  - `Generic Cruise`
  - `Private Yacht`
- Search should keep focusing on direct booking, call, and WhatsApp intent

### Performance Max

- Test budget: `1000 TL/day`
- Objective: incremental high-intent local demand
- Strongest signals:
  - `purchase`
  - `phone_click`
  - `whatsapp_click`

## Tracking QA Checklist

- `purchase` fires only after confirmed reservation success
- `purchase` sends a stable `transaction_id` to prevent duplicate Ads conversion counting
- `contact_submit_success` fires only after confirmed submit success
- `phone_click` only from visible call CTA
- `whatsapp_click` only from visible WhatsApp CTA
- `booking_abandonment` should not fire repeatedly in the same flow
- `traffic_attribution` should carry `utm_*`, `gclid`, and source context into GA4 via GTM
- Clarity should receive the same traffic tags directly through `window.clarity("set", ...)`
- If direct Google Ads conversion tags are active, do not import the same GA4 `purchase` event as a primary Ads conversion.

## Important Constraint

Do not add direct GA4 or Google Ads snippets to the Next.js app. Google reporting and Ads conversions must flow through `NEXT_PUBLIC_GTM_CONTAINER_ID`. Clarity is intentionally separate and should use `NEXT_PUBLIC_CLARITY_PROJECT_ID`.
