# MerrySails UTM And Conversion Map

Use this file when building the campaigns manually or through Google Ads Editor.

## Final URL Suffix

Use one shared final URL suffix pattern:

```text
utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_content={adgroupid}_{creative}&utm_term={keyword}&utm_matchtype={matchtype}&utm_device={device}
```

If Google Ads Editor does not accept dynamic values in this field, use the campaign-level fallbacks below.

## Campaign-Level Fallbacks

Sunset:

```text
utm_source=google&utm_medium=cpc&utm_campaign=merrysails_sunset_search_istanbul&utm_content={adgroupid}_{creative}&utm_term={keyword}&utm_matchtype={matchtype}&utm_device={device}
```

Dinner:

```text
utm_source=google&utm_medium=cpc&utm_campaign=merrysails_dinner_search_istanbul&utm_content={adgroupid}_{creative}&utm_term={keyword}&utm_matchtype={matchtype}&utm_device={device}
```

Private Yacht:

```text
utm_source=google&utm_medium=cpc&utm_campaign=merrysails_private_yacht_search_istanbul&utm_content={adgroupid}_{creative}&utm_term={keyword}&utm_matchtype={matchtype}&utm_device={device}
```

## GA4 Events Already Wired In Code

## Clarity Traffic Tags

The site now sends these Clarity custom tags on page views:

- `traffic_channel`: `google_ads`, `organic_search`, `direct`, `referral`, `paid_search`, `social`, or `email`
- `traffic_source`: `google`, referrer host, or direct source
- `traffic_medium`: UTM medium when present
- `utm_campaign`: readable campaign name from Ads final URL suffix
- `utm_content`: ad group / creative context
- `utm_term`: keyword
- `landing_path`: current landing path
- `first_traffic_channel`: first-touch channel for the session
- `first_traffic_source`: first-touch source for the session
- `first_utm_campaign`: first-touch campaign for the session
- `first_landing_path`: first-touch landing page for the session

Daily Clarity rule:

- Filter `traffic_channel = google_ads` for paid campaign sessions.
- Filter `traffic_channel = organic_search` for SEO sessions.
- Use `first_traffic_channel` when the user navigated across pages before converting.

Primary:

- `purchase`: fires only after reservation creation succeeds.

Secondary:

- `begin_checkout`: fires when booking flow starts.
- `phone_click`: fires on tracked call links.
- `whatsapp_click`: fires on tracked WhatsApp links.
- `contact_submit_success`: fires only after contact form success.
- `generate_lead`: mirrors successful contact form submission for GA4 lead reporting.
- `booking_abandonment`: fires after a qualified abandonment lead is accepted by the local endpoint or queued with `sendBeacon`.

## Google Ads Import Order

1. Link Google Ads account `548-498-9676` with GA4 property `G-9B3Q7FM7X8`.
2. In GA4, mark `purchase` as a key event after it appears.
3. In Google Ads, import `purchase` from GA4.
4. Set `purchase` as `Primary`.
5. Import `phone_click`, `whatsapp_click`, `contact_submit_success`, `begin_checkout`, and `booking_abandonment` only as `Secondary`.
6. Do not include secondary events in custom campaign goals during launch.
7. Use `docs/ads/MERRYSAILS-CONVERSION-TODO-2026-04-23.md` as the launch gate before enabling spend.

## Reporting Columns

Use these columns in the first saved Ads view:

- Campaign
- Ad group
- Search term
- Keyword
- Match type
- Cost
- Clicks
- CTR
- Avg. CPC
- Conversions
- Cost / conv.
- All conv.
- Conv. value

Interpretation rule:

- `Conversions` should mean `purchase`.
- `All conv.` can include WhatsApp, phone, contact, and checkout diagnostics.
