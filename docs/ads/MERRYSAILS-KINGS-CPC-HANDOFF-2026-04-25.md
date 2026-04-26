# MerrySails Kings CPC Handoff — 25 Apr 2026

Use this note before changing MerrySails international Google Ads bidding.

## Why This Exists

Kings World Transfer and MerryTourism both showed the same practical lesson: high-intent international travel clicks are not cheap enough for a `30 TL` style ceiling.

If MerrySails uses a low CPC ceiling too early, Search can look "enabled" but still fail to get meaningful click flow.

## Cross-Account Evidence

Kings World Transfer, Europe/UK Search, 24 Apr 2026:

- Average CPC was roughly `129 TL`.
- Ad group average CPC ranged roughly from `92 TL` to `227 TL`.
- The campaign still generated qualified conversion activity at this higher click cost.

MerryTourism, Antalya/international transfer Search, 25 Apr 2026:

- Low/controlled bidding produced almost no traffic.
- After moving to realistic click ceilings, the first Search impression started.
- Current practical test caps there are `80 TL` for Antalya Search and `120 TL` for international Search.

## MerrySails Rule

Do not set `30 TL`, `35 TL`, or similarly low CPC caps for international MerrySails Search unless the user explicitly asks for a tiny diagnostic micro-test.

For normal international acquisition:

- It is acceptable to run `Maximize Conversions` with no low target CPA while conversion volume is still thin.
- If using `Maximize Clicks`, use realistic ceilings:
  - Shared Sunset / Dinner cruise intent: start around `80-120 TL`.
  - Private yacht / charter / event intent: start around `120-200 TL`.
  - No CPC cap can be acceptable when budget, keywords, negatives, and daily monitoring are tight.
- Do not restore the old `350 TL` target CPA or add a low target CPA before impression and click flow are stable.

## Product Fit

Do not copy transfer keywords directly into MerrySails.

Keep MerrySails separated by commercial intent:

- Sunset cruise
- Dinner cruise
- Private yacht / charter
- Event / proposal / corporate yacht intent

The Kings lesson is about bid realism and international buyer cost, not about copying transfer ad groups.

## Country Logic

The current international launch set is still reasonable:

- United Kingdom
- Germany
- France
- Netherlands
- China as a small controlled probe

Language, ad copy, and landing page intent should match as closely as the site allows.

## Lead Asset Logic

MerrySails can lean into direct leads if Google Ads inventory supports it:

- Call asset: keep active.
- Lead form asset: useful, but quality must be checked against real reservations.
- Do not use one generic lead form across all campaigns. Create/attach a separate lead form per campaign or product intent so reporting and copy stay clean.
- Keep lead forms friction-light: ask only for `full name` and `phone number` by default. Do not require email unless there is a specific follow-up workflow that needs it.
- Match form copy to the campaign:
  - Sunset: sunset cruise availability / callback.
  - Dinner: dinner cruise availability / package callback.
  - Yacht / charter: private yacht availability / event callback.
  - PMax: broad cruise availability, but still not generic tourism copy.
- Webhook leads should land in the admin/panel lead queue with source, campaign/form IDs, raw payload, and status (`new`, `qualified`, `converted`, `invalid`) so Google lead quality can be judged against panel truth.
- WhatsApp/message asset: use if available in the UI, because API support has been unreliable for this account.

Phone, WhatsApp, and lead form clicks are not equal to purchase until panel truth proves quality.

## PMax Guardrail

Keep PMax controlled while Search learns:

- PMax should stay near `200 TL/day` unless it proves qualified lead quality.
- Do not scale PMax just because it gets cheap clicks.
- Watch placements/channels and exclude low-quality inventory.

## Daily Check

For the first week, check:

- Spend, impressions, clicks, CPC, conversions.
- Real reservation and qualified lead count.
- Search terms: add junk negatives, promote winner terms.
- Whether Search is limited by rank, not budget.
- Whether any low bid cap or low target CPA is starving delivery.
