# MerrySails Conversion Todo — 23 Apr 2026

Use this file before enabling any Google Ads spend. The goal is clean reporting first, then scaling.

## Tracking IDs

- GTM container ID: `GTM-MWVS696K`
- GA4 measurement ID: `G-9B3Q7FM7X8`
- Microsoft Clarity project ID: `wfsykdd4gb`
- Google Ads account: `548-498-9676`
- Main phone / WhatsApp: `+90 537 040 68 22`

## Code Status

Installed in the site:

- GTM base tag is loaded from `src/app/layout.tsx` when `NEXT_PUBLIC_GTM_CONTAINER_ID` is set.
- GA4 and Google Ads should be loaded from the GTM container only.
- Clarity is loaded directly from `src/app/layout.tsx` so it stays independent from Google.
- Client-side page views are sent by `src/components/analytics/AnalyticsRouteTracker.tsx`.
- Central `dataLayer` event dispatch lives in `src/lib/analytics.ts`.

Vercel env status on 24 Apr 2026:

- `NEXT_PUBLIC_GTM_CONTAINER_ID`, `NEXT_PUBLIC_CLARITY_PROJECT_ID`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`, and `NEXT_PUBLIC_GOOGLE_ADS_ID` are set for `Production` and `Development`.
- Production deployment `dpl_7EMibLeQmBMTkdQ9HfKSH8erirEy` is aliased to `https://merrysails.com`.
- Live browser QA confirms the current app-side GTM bootstrap, Clarity script, traffic attribution, and Google Ads conversion router are active on `merrysails.com`.

Event sources:

- `purchase`: fires only after reservation creation succeeds.
- `begin_checkout`: fires when a visitor starts the booking flow.
- `phone_click`: fires on tracked `tel:+905370406822` links.
- `whatsapp_click`: fires on tracked WhatsApp links.
- `contact_submit_success`: fires only after contact form success.
- `generate_lead`: mirrors contact form success for GA4 lead reporting.
- `booking_abandonment`: fires when a qualified abandonment lead is accepted by the local endpoint or queued with `sendBeacon`.
- `traffic_attribution`: fires on page view with paid/organic/direct/referral source context for GA4 exploration.

Clarity traffic tags:

- `traffic_channel`: current page-view channel such as `google_ads` or `organic_search`.
- `traffic_source`: Google, referrer host, or direct source.
- `utm_campaign`: readable Ads campaign name when UTM is present.
- `first_traffic_channel`: first-touch session channel.
- `first_utm_campaign`: first-touch campaign.
- `first_landing_path`: first-touch landing page.

## Conversion Hierarchy

Primary conversion in Google Ads:

- `purchase`

Secondary conversions in Google Ads:

- `whatsapp_click`
- `phone_click`
- `booking_abandonment`
- `contact_submit_success`
- `generate_lead`
- `begin_checkout`

Important rule:

- `Conversions` column should mean completed reservation request only.
- `All conv.` can include WhatsApp, call, form, checkout, and abandonment diagnostics.
- Do not optimize bidding to WhatsApp, call, or abandonment during launch.

## GA4 Setup Checklist

- [ ] Open GA4 property for `G-9B3Q7FM7X8`.
- [ ] Confirm Realtime page views from `merrysails.com`.
- [ ] Trigger one safe booking flow start and confirm `begin_checkout`.
- [ ] Trigger one safe WhatsApp click and confirm `whatsapp_click`.
- [ ] Trigger one safe phone click on mobile or browser and confirm `phone_click`.
- [ ] Trigger one safe contact form success and confirm `contact_submit_success` + `generate_lead`.
- [ ] Trigger one qualified booking abandonment test and confirm `booking_abandonment`.
- [ ] Trigger or wait for a real safe reservation success and confirm `purchase`.
- [ ] Mark `purchase` as a GA4 key event as soon as it is visible.
- [ ] Do not mark `begin_checkout` as the main business success event.

## Google Ads Import Checklist

- [x] Create or confirm a GTM `Conversion Linker` tag on all pages.
- [x] Create or confirm direct Google Ads conversion actions for the GTM `google_ads_conversion` events.
- [x] Set the direct Google Ads `purchase` conversion to `Primary`.
- [x] Confirm `purchase` is included in the `Conversions` column.
- [x] Keep `transaction_id` mapped for `purchase` in the GTM Ads conversion route so duplicate reservation success events are deduplicated.
- [x] Add `whatsapp_click`, `phone_click`, `booking_abandonment`, and `contact_submit_success` Ads conversion routes in GTM only after `purchase` is protected.
- [x] Keep all non-purchase actions as `Secondary`.
- [x] Confirm secondary actions appear in `All conv.` and are not the bidding target.
- [ ] If Google Ads creates a custom goal, do not add secondary actions to a bidding custom goal.
- [ ] Enable call reporting if Google Ads offers it for the account.
- [ ] Link Google Ads account `548-498-9676` with GA4 property `G-9B3Q7FM7X8` for audience and reporting context.

Confirmed Google Ads conversion actions on 24 Apr 2026:

- `MS Purchase - Reservation`: `AW-18112460958/UNEQCIWVrqEcEJ7x2LxD`, `Primary`, included in `Conversions`.
- `MS Contact Submit Success`: `AW-18112460958/9qixCP64saEcEJ7x2LxD`, `Secondary`, excluded from `Conversions`.
- `MS Phone Click`: `AW-18112460958/ZirXCPu4saEcEJ7x2LxD`, `Secondary`, excluded from `Conversions`.
- `MS WhatsApp Click`: `AW-18112460958/gnRdCPi4saEcEJ7x2LxD`, `Secondary`, excluded from `Conversions`.
- `MS Booking Abandonment`: `AW-18112460958/jRdoCIG5saEcEJ7x2LxD`, `Secondary`, excluded from `Conversions`.

Current GTM live status on 24 Apr 2026:

- `Sürüm 2 - MerrySails GA4 + Ads conversions + Clarity baseline` is published live.
- Production deployment `dpl_7EMibLeQmBMTkdQ9HfKSH8erirEy` is aliased to `https://merrysails.com`.
- `MS - Conversion Linker` fires on `All Pages`.
- `MS - Google Tag - GA4` fires on `Initialization - All Pages`.
- `MS - DataLayer Tracking Router` fires on `All Pages`.
- The router maps `purchase`, `contact`, `phone`, `whatsapp`, and `abandonment` from the site `dataLayer` to the confirmed direct Google Ads conversion labels.
- Live browser QA on `https://merrysails.com` confirmed that all five conversion routes pass `value`, `currency`, and `transaction_id` to the correct `AW-18112460958/...` labels.
- Import files remain available locally as historical fallback artifacts:
  - `/Users/resat/Downloads/merrysails-gtm-minimal-import.json`
  - `/Users/resat/Downloads/merrysails-gtm-ads-ga4-import.json`

## Google Ads Panel Note

On 23 Apr 2026, the `New conversion action` wizard opened a simplified setup flow for web-site conversions and phone calls. For launch reliability, use GTM-managed Google Ads conversion tags as the primary Ads source and keep GA4 as the analytics reporting source.

Preferred launch path:

- Site pushes `purchase` into `dataLayer`.
- GTM sends `purchase` to GA4 for analytics reporting.
- GTM fires the Google Ads `purchase` conversion tag with value, currency, and transaction ID.
- Google Ads sets the direct GTM `purchase` conversion as primary.
- GA4 `purchase` can be marked as a key event, but it should not be imported as another primary Ads conversion while the direct Ads tag is active.

Reason:

- Importing the same `purchase` from GA4 while also firing a direct Ads tag can create a second purchase source and make reporting harder to reconcile.
- We want one source of truth during launch: reservation success in the site code → GTM `dataLayer` event → GA4 analytics event and one direct Google Ads conversion tag.

## Launch Gate

Do not enable campaigns until all of these are true:

- [ ] Campaigns are still paused after import/build.
- [ ] `purchase` is configured as the only primary conversion.
- [ ] Search Partners are off.
- [ ] Display expansion is off.
- [ ] Location option is Istanbul presence-only.
- [ ] Daily budgets match the approved 1,000 TL/day test split: Sunset 417 TL, Dinner 417 TL, Private Yacht 166 TL.
- [ ] Phone and WhatsApp links point to `+905370406822`.
- [ ] Final URLs resolve with UTMs.

## Daily Optimization Rule

Budget increases are allowed only when all of these are true:

- Search terms match the campaign product intent.
- `purchase` or high-quality assisted signals exist.
- CPC is within the expected range for the ad group.
- Clarity recordings do not show obvious form, speed, or CTA friction.
- Negatives have been added for irrelevant search terms.

If spend is happening but `purchase` is zero:

- First inspect search terms.
- Then inspect Clarity recordings.
- Then inspect booking abandonment details.
- Only after that adjust bids, copy, landing page, or budget.

## Source Of Truth

- Campaign build files: `docs/ads/google-ads-editor/`
- Day 1 monitoring: `docs/ads/google-ads-editor/09-day-1-monitoring-template.md`
- Launch QA: `docs/ads/google-ads-editor/07-launch-qa.md`
- UTM and conversion map: `docs/ads/google-ads-editor/08-utm-and-conversion-map.md`
