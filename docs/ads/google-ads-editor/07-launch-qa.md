# MerrySails Launch QA

Run this before enabling campaigns.

## Tracking

- [ ] GA4 pageviews visible
- [ ] `purchase` visible
- [ ] `begin_checkout` visible
- [ ] `phone_click` visible
- [ ] `whatsapp_click` visible
- [ ] `contact_submit_success` visible
- [ ] `booking_abandonment` visible after a qualified abandonment test
- [ ] `purchase` is primary conversion
- [ ] WhatsApp / phone / abandonment remain secondary diagnostics at launch
- [ ] `docs/ads/MERRYSAILS-CONVERSION-TODO-2026-04-23.md` is complete

## Budget

- [ ] Total daily test budget is 1,000 TL/day
- [ ] Sunset daily budget is 417 TL
- [ ] Dinner daily budget is 417 TL
- [ ] Private Yacht daily budget is 166 TL
- [ ] If changing daily total, preserve the same priority ratio unless the user changes priorities
- [ ] Confirm campaign budgets are not accidentally set to 3,000 TL/day
- [ ] If using API/scripts, use `node scripts/google-ads-budget-helper.mjs 417 417 166`

## Bidding

- [ ] Initial bid strategy is Manual CPC
- [ ] Core Sunset max CPC starts at 18 TL
- [ ] Core Dinner max CPC starts at 20 TL
- [ ] Yacht Charter Core max CPC starts at 30 TL
- [ ] No automated conversion bidding until `purchase` data is real

## Campaign Settings

- [ ] Search only
- [ ] Search Partners off
- [ ] Display expansion off
- [ ] English
- [ ] Istanbul presence-only
- [ ] Ad schedule: 08:00-23:30 Istanbul time, every day
- [ ] Exact + phrase only
- [ ] Campaigns paused before final review

## Geo / Hotel Logic

- [ ] Istanbul city target is active
- [ ] No all-Turkey or interest-only expansion
- [ ] Priority zones documented: Sultanahmet, Sirkeci, Karakoy, Taksim, Beyoglu, Besiktas, Kabatas, Ortakoy, Nisantasi, Sisli
- [ ] Private Yacht watch zones documented: Ortakoy, Kurucesme, Bebek, Arnavutkoy, Levent, Maslak
- [ ] Hotel logic documented for 4-5 star hotels and strong 3-star Sultanahmet/Sirkeci hotels

## Copy Safety

- [ ] Sunset uses `From EUR 34`
- [ ] Dinner uses `From EUR 30`
- [ ] Private Yacht uses `From EUR 280`
- [ ] Free Shuttle appears only in Dinner
- [ ] Dinner shuttle copy says central/eligible areas
- [ ] No universal pickup promise
- [ ] No yacht free shuttle claim

## Final URL Safety

- [ ] Sunset goes to `/cruises/bosphorus-sunset-cruise`
- [ ] Dinner goes to `/istanbul-dinner-cruise`
- [ ] Yacht Charter goes to `/yacht-charter-istanbul`
- [ ] Boat Rental goes to `/boat-rental-istanbul`
- [ ] Proposal goes to `/proposal-yacht-rental-istanbul`
- [ ] Phone links use `tel:+905370406822`
- [ ] WhatsApp links use `https://wa.me/905370406822`
- [ ] Contact form success is secondary only

## Day 1 Monitoring

- [ ] Check search terms as soon as available
- [ ] Add cross-product negatives immediately
- [ ] Watch CTR by ad group
- [ ] Watch CPC by campaign
- [ ] Watch support signals
- [ ] Save Ads view with `Conversions` and `All conv.`
- [ ] Treat `Conversions` as `purchase`
- [ ] Treat WhatsApp, phone, contact, checkout, and abandonment under `All conv.` as diagnostic
- [ ] Do not add broad match
- [ ] Do not raise budgets before query quality is known
