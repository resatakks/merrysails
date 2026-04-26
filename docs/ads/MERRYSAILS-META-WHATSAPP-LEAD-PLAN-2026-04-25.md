# MerrySails Meta + WhatsApp Lead Plan — 25 Apr 2026

## Decision

Meta should be used only as a controlled lead-quality test for the two products MerrySails wants to scale:

- `Sunset Cruise`
- `Dinner Cruise`

Do not use Meta as a broad traffic channel. The goal is not cheap clicks; the goal is qualified WhatsApp conversations, qualified lead forms, and eventual reservations.

## Required Meta Setup

MerrySails needs these assets before launching Meta WhatsApp or Instant Form campaigns:

- Meta Business portfolio / Business Manager
- Meta ad account with payment method
- Facebook Page for MerrySails or Merry Tourism
- WhatsApp Business number connected to the Page / Business portfolio
- Instagram account connected if available
- Privacy policy URL
- UTM naming standard for all ads
- Lead handling process: who calls/messages within 5 minutes

Optional but recommended:

- Meta Pixel on the website
- Conversions API later, after the first lead flow is stable
- CRM or shared lead inbox for fast lead follow-up

## Campaign Structure

Start with 2 campaigns, not many campaigns.

### Campaign 1 — Sunset Lead Test

Objective:

- Leads or messages, depending on setup availability

Primary ad paths:

- Click-to-WhatsApp
- Instant Form

Landing support:

- `https://merrysails.com/cruises/bosphorus-sunset-cruise`

Offer truth:

- Bosphorus Sunset Cruise
- From EUR 34 per person
- Golden-hour route
- TURSAB licensed operation
- Do not claim hotel pickup or free shuttle unless the page and operation clearly support it.

### Campaign 2 — Dinner Lead Test

Objective:

- Leads or messages, depending on setup availability

Primary ad paths:

- Click-to-WhatsApp
- Instant Form

Landing support:

- `https://merrysails.com/istanbul-dinner-cruise`

Offer truth:

- Bosphorus Dinner Cruise
- From EUR 30 per person
- Turkish night dinner format
- Hotel pickup support where the product page supports it
- TURSAB licensed operation

## Form Quality Rules

Meta Instant Forms can generate high volume, but they can also create weak leads. Use higher-intent forms, not maximum-volume forms.

Recommended fields:

- Full name
- Phone number
- Email
- Country
- City
- Preferred contact time
- Travel date
- Guest count
- Product interest: Sunset / Dinner

Recommended confirmation copy:

`Thanks. MerrySails will contact you about current availability, package details, and booking support. For faster help, message us on WhatsApp.`

## WhatsApp Conversation Script

First automated or saved reply:

`Hi, welcome to MerrySails. Are you interested in the Bosphorus Sunset Cruise or Dinner Cruise? Please share your travel date, guest count, hotel area, and preferred language.`

Qualification labels:

- `qualified_sunset`
- `qualified_dinner`
- `price_only`
- `wrong_country_or_spam`
- `job_supplier_other`
- `needs_follow_up`
- `booked`

## Budget Guardrail

Do not launch Meta with a large budget before the lead handling workflow is ready.

Suggested first test:

- Sunset: small daily test budget
- Dinner: small daily test budget
- Run 2-3 days max before judgment
- Pause any ad set that creates repeated spam or impossible leads

Do not judge Meta by lead count alone. Judge by:

- cost per qualified WhatsApp conversation
- cost per reachable lead
- cost per booking request
- eventual purchase / reservation

## Google + Meta Lead Architecture

Current Google site-free paths:

- Call asset
- Product-specific Google Lead Form for Sunset
- Product-specific Google Lead Form for Dinner

Future Meta site-free paths:

- Click-to-WhatsApp ads
- Instant Form lead ads
- Call lead ads if phone handling is strong

Central reporting should separate:

- Google Search lead form
- Google call asset
- Meta WhatsApp conversation
- Meta instant form
- Website WhatsApp click
- Website phone click
- Website purchase / reservation

## One-Panel Management

Meta Business Suite can manage Facebook, Instagram, and WhatsApp conversations in one inbox. It does not manage Google Ads.

For Google + Meta + WhatsApp in one operating view, use a CRM or shared inbox layer after the first test:

- HubSpot: stronger CRM/reporting path
- respond.io: stronger WhatsApp/team inbox path
- GoHighLevel: all-in-one agency-style path, but heavier and easier to misconfigure

Do not add a paid CRM before the first qualified-lead pattern is clear.

## Germany Turkish Layer

There is no confirmed `/tr/...` Turkish owner URL layer in the current app routes.

Do not launch Turkish-language Germany ads to nonexistent or weak landing pages.

Safe options:

1. Send Germany Turkish ads to the English Sunset/Dinner owner pages with Turkish ad copy only if user accepts the language mismatch.
2. Create noindex, ad-only Turkish landing pages for Sunset and Dinner, then launch Germany-only Turkish ad groups.
3. Build full Turkish locale pages later, but this has SEO/indexation consequences and should not be done casually.

Recommended path:

- Create noindex ad-only Turkish landing pages if Germany Turkish demand becomes a real paid test.
- Keep canonical commercial SEO ownership on the English owner URLs until there is a deliberate Turkish SEO strategy.
