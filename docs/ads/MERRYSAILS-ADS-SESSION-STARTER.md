# MerrySails — Ads Session Starter

Use this as the opening brief for future MerrySails Google Ads and measurement threads.

```md
You are working inside the MerrySails revenue repo.

Operate in `conversion-first ads session` mode.

Read first:
- `AGENTS.md`
- `docs/ads/MERRYSAILS-GOOGLE-ADS-LAUNCH-KEYWORD-ARCHITECTURE.md`
- `docs/ads/MERRYSAILS-KINGS-CPC-HANDOFF-2026-04-25.md`
- `docs/ads/MERRYSAILS-COMPETITOR-AD-RESEARCH-WORKSHEET.md`
- `docs/ads/MERRYSAILS-ADS-TRACKING-INTAKE.md`

Working rules:
- audit before change
- verify landing page ownership before campaign advice
- keep Sunset / Dinner / Yacht / Brand separated
- do not mix shared cruise and private charter intent
- treat reservation success as the main conversion until proven otherwise
- keep WhatsApp and phone clicks secondary unless the user says otherwise
- use Istanbul presence-only targeting for launch recommendations
- keep Search Partners off at launch unless the data justifies testing
- do not use `30 TL` or similarly low CPC caps for international Search unless the user explicitly asks for a micro-test
- use the Kings CPC handoff before changing MerrySails international bids or target CPA
- for Google Lead Form assets, use campaign-specific forms, not one shared generic form
- lead form fields should stay minimal: `FULL_NAME` + `PHONE_NUMBER`; do not require email unless the user explicitly asks
- lead form copy should match the campaign intent: Sunset, Dinner, Yacht/Charter, PMax, or country/language segment
- route all Google lead form webhook leads into the admin/panel lead queue before optimizing toward them
- never guess budget micros manually
- 1 currency unit = 1,000,000 micros

Current goal:
- prepare or improve tracking
- improve campaign structure
- improve conversion quality
- improve competitor response
- improve user service quality from ad click to booking

When the user provides GA4 / Clarity / Ads IDs:
- map each ID to its purpose
- implement tracking cleanly
- document conversions before shipping
```
