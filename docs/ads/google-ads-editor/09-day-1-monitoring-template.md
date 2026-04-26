# MerrySails Day 1 Monitoring Template

Use this after the campaigns go live.

## First 2 Hours

- Confirm all campaigns are spending only inside Istanbul presence targeting.
- Confirm search terms are product-matched.
- Pause any ad group with obviously wrong intent.
- Add negatives immediately for public ferry, cheap ferry, free boat, job, map, timetable, and irrelevant Turkish local transport terms.
- Check that call assets are showing on mobile.
- Check that landing-page WhatsApp and phone clicks appear in GA4 Realtime.
- In Clarity, filter `traffic_channel = google_ads` to inspect paid sessions.
- In Clarity, filter `traffic_channel = organic_search` to compare SEO sessions.
- In Clarity, use `first_traffic_channel` when the visitor navigated before converting.

## Mid-Day Review

For each campaign:

- Spend:
- Clicks:
- CTR:
- Avg. CPC:
- Search terms to keep:
- Search terms to negate:
- Device split:
- District / location clues:
- WhatsApp clicks:
- Phone clicks:
- Checkout starts:
- Contact form successes:
- Booking abandonments:
- Purchases:
- Clarity paid-session friction:
- Clarity organic-session friction:
- Highest-risk landing page:
- Highest-opportunity campaign:

## Evening Review

Decision rules:

- If CTR is low and terms are relevant, rewrite RSA headline set before raising bid.
- If terms are irrelevant, add negatives before changing bids.
- If CPC is too high but terms are correct, lower ad group max CPC by 10-15%.
- If Sunset or Dinner has clean terms and no impressions, raise only the matching ad group max CPC by 10-15%.
- If WhatsApp is high but purchase is zero, inspect Clarity recordings before optimizing to WhatsApp.
- If abandonment is high but purchase is zero, inspect the exact booking step, device, and page speed before increasing budget.
- If checkout starts but no purchase, inspect booking friction and abandonment alerts.
- If Google Ads sessions behave worse than organic sessions on the same page, fix ad message-match before raising spend.
- If organic sessions convert but Ads sessions bounce, tighten keywords/negatives and landing promise.

## Winner Rules

Promote:

- Exact terms with commercial intent.
- Terms with `book`, `reservation`, `price`, `with pickup`, `with show`, `private`, or clear product modifiers.
- Terms matching the correct owner URL.

Do not promote:

- Public ferry queries.
- Ultra-cheap local transport queries.
- Generic `things to do in Istanbul` queries.
- Competitor brand terms on day 1.
- Turkish generic terms unless the user explicitly opens Turkish campaigns.

## Day 2 Actions

- Split any winning phrase term into exact match.
- Add cross-product negatives if a search term belongs to another campaign.
- Keep `purchase` as primary even if WhatsApp gets more volume.
- Only increase total spend after search-term quality is clean.
