# MerrySails Pre-Launch QA — 23 Apr 2026

## Landing URL Check

Checked with production server and UTM parameters:

| URL | Status | Local total time |
| --- | ---: | ---: |
| `/` | 200 | 24 ms |
| `/cruises/bosphorus-sunset-cruise` | 200 | 52 ms |
| `/istanbul-dinner-cruise` | 200 | 56 ms |
| `/yacht-charter-istanbul` | 200 | 58 ms |
| `/boat-rental-istanbul` | 200 | 51 ms |
| `/proposal-yacht-rental-istanbul` | 200 | 57 ms |
| `/contact` | 200 | 55 ms |
| `/reservation` | 200 | 66 ms |

All campaign landing URLs resolve correctly with UTM parameters.

## Tracking Check

Found on core landing pages:

- GA4 ID: `G-9B3Q7FM7X8`
- Clarity ID: `wfsykdd4gb`
- Phone: `tel:+905370406822`
- WhatsApp: `https://wa.me/905370406822`

Clarity custom events are now mirrored from the central analytics layer:

- `purchase`
- `begin_checkout`
- `phone_click`
- `whatsapp_click`
- `contact_submit_success`
- `generate_lead`
- `booking_abandonment`

## Speed Check

PageSpeed API was unavailable due quota, and local Lighthouse could not run because Chrome is not installed in the local shell.

Production fetch / asset checks:

| Page | HTML bytes | Local fetch |
| --- | ---: | ---: |
| Sunset | 158,952 | 114 ms |
| Dinner | 192,694 | 18 ms |
| Yacht | 201,585 | 17 ms |

Optimized hero image checks with WebP-capable request:

| Asset | Optimized size |
| --- | ---: |
| Sunset hero `sunset5.jpeg` at 1200w | 48.8 KB WebP |
| Dinner hero `dinner-etkinlik-13.jpeg` at 1200w | 142.8 KB WebP |
| Yacht hero at 1200w | 120.8 KB WebP |

Clarity currently shows an LCP warning, so after launch we should inspect recordings by page and device before making image/content changes.

## Campaign Readiness

Ready but still paused:

- `Search | EN | Sunset | Istanbul Presence`
- `Search | EN | Dinner | Istanbul Presence`
- `Search | EN | Private Yacht | Istanbul Presence`

Budget model:

- Total test budget: 1,000 TL/day
- Sunset: 417 TL/day
- Dinner: 417 TL/day
- Private Yacht: 166 TL/day

Ad schedule:

- Every day, 08:00-23:30 Istanbul time

Location:

- Istanbul city target
- Presence-only
- English
- Google Search only
- Search Partners off
- Display expansion off

## Manual Ads Panel Items Still Needed

- Link Google Ads account `548-498-9676` to GA4 property `G-9B3Q7FM7X8`.
- Import `purchase` first and set it as primary.
- Import WhatsApp, phone, form, checkout, and abandonment only as secondary.
- Complete `docs/ads/MERRYSAILS-CONVERSION-TODO-2026-04-23.md` before enabling spend.
- Enable call reporting if Google Ads offers it in the account.
- Confirm auto-apply recommendations are off.
- Confirm campaign location option is presence-only.
- Confirm all campaigns remain paused until final manual review.
