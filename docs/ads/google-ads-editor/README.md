# MerrySails Google Ads Editor Package

**Prepared:** 23 April 2026
**Purpose:** One-shot launch package for 3 MerrySails Search campaigns.

This folder contains the build files for Google Ads Editor / manual panel setup.

## Files

- `01-campaigns.csv` — campaign shell and budget pool notes
- `02-ad-groups.csv` — ad group structure
- `03-keywords.csv` — phrase and exact launch keywords
- `04-negative-keywords.csv` — campaign-level launch negatives
- `05-responsive-search-ads.csv` — one RSA per launch ad group
- `06-assets.csv` — sitelinks, callouts, snippets, image recommendations
- `07-launch-qa.md` — checklist before enabling spend
- `08-utm-and-conversion-map.md` — GA4 and Ads reporting map
- `09-day-1-monitoring-template.md` — first-day optimization sheet
- `10-ad-schedule-and-geo-plan.md` — launch hours, hotel zones, tourist districts
- `11-final-url-audit.md` — landing URL, WhatsApp, call, and form QA
- `../MERRYSAILS-CONVERSION-TODO-2026-04-23.md` — GA4 / Google Ads conversion setup checklist

## Budget Safety

The user approved a **1,000 TL/day test budget**, split with the same product priority ratio:

- Sunset: 417 TL/day
- Dinner: 417 TL/day
- Private Yacht: 166 TL/day

Google Ads campaign budgets are daily budgets. This file now uses daily budgets, not total test-pool values.

Reference conversions if the user later changes the total daily budget:

- 1,000 TL/day: Sunset 417 TL/day, Dinner 417 TL/day, Private Yacht 166 TL/day
- 1,500 TL/day: Sunset 625 TL/day, Dinner 625 TL/day, Private Yacht 250 TL/day
- 2,000 TL/day: Sunset 833 TL/day, Dinner 833 TL/day, Private Yacht 334 TL/day
- 3,000 TL/day: Sunset 1,250 TL/day, Dinner 1,250 TL/day, Private Yacht 500 TL/day

The campaign CSV currently uses the **1,000 TL/day test**:

- Sunset: 417 TL/day
- Dinner: 417 TL/day
- Private Yacht: 166 TL/day

All three campaigns are still `Paused` in the import file. Do not enable them until the launch QA is complete.

The campaign CSV includes the launch ad schedule: every day from `08:00` to `23:30` in the account time zone.

If any future Ads API script needs micros, use:

```bash
node scripts/google-ads-budget-helper.mjs 417 417 166
```

## Bidding Safety

Initial bid strategy is `Manual CPC`, not automated conversion bidding.

Reason:

- The Ads account is new.
- `purchase` has to collect real signal first.
- WhatsApp and phone should be observed without letting Google optimize toward cheap low-intent clicks.

After clean conversion data exists, move in this order:

1. Manual CPC with search-term cleanup
2. Maximize Clicks only if impression volume is too low and CPC caps are controlled
3. Maximize Conversions only after reliable `purchase` volume exists

## Launch State

Set campaigns to `Paused` while importing/building.

Enable only after:

- GA4 pageviews are visible
- `purchase` is verified
- `phone_click` is visible
- `whatsapp_click` is visible
- Search Partners are off
- presence-only location targeting is confirmed
- ad schedule is set to Istanbul 08:00-23:30
- final URL and CTA audit is complete

## Tracking Rule

Primary conversion:

- `purchase`

Secondary / diagnostic:

- `begin_checkout`
- `phone_click`
- `whatsapp_click`
- `contact_submit_success`
- `generate_lead`
- `booking_abandonment`

Do not optimize bidding to phone or WhatsApp on day 1.
