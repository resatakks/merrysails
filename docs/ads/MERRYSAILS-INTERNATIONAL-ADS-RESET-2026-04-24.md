# MerrySails International Ads Reset — 24 Apr 2026

## Decision

All Istanbul/Turkey-local test traffic is paused. The next test should target people physically in:

- Germany
- France
- Netherlands
- United Kingdom
- China

The commercial hypothesis is that higher-quality buyers plan Istanbul cruises before arrival, especially for `Sunset` and `Dinner`. Private yacht and broad generic cruise are not part of this reset.

## 15:20 Validation Update

Quota is open again.

Validation result:

- The Search campaign build validates successfully.
- No live spend was started during validation.
- WhatsApp message asset through API is not reliable for this account/API surface yet. The script now keeps it optional and does not let a WhatsApp asset failure break the whole launch.
- Call asset will be created and attached during live mode.

Current ready command:

```bash
node scripts/google-ads-international-reset-2026-04-24.cjs --live --include-message-asset
```

If WhatsApp message asset fails during live mode, the script will still keep the Search campaigns and call asset path alive, then report the message asset failure.

## 15:25 Live Launch Update

Live launch completed.

Enabled campaigns:

- `Search | INTL | Sunset | Travel Planners`
  - Campaign ID: `23794703947`
  - Daily budget: `400 TL`
  - Bid strategy: `Maximize Conversions`
  - Call asset: `enabled`
- `Search | INTL | Dinner | Travel Planners`
  - Campaign ID: `23794703983`
  - Daily budget: `400 TL`
  - Bid strategy: `Maximize Conversions`
  - Call asset: `enabled`

WhatsApp message asset result:

- API creation failed with an account/API-surface compatibility error on `business_message_asset`.
- This did not block campaign launch.
- Next step: check Google Ads UI asset library. If `Message / WhatsApp` asset is visible there, add it manually to these two campaigns.

Still not launched:

- Old Istanbul-local campaigns remain outside the reset plan.
- PMax is not relaunched yet.
- Private Yacht is not relaunched yet.

## 15:45 Controlled PMax Launch Update

Controlled international PMax was launched after the Search campaigns.

Enabled campaign:

- `PMax | INTL | MerrySails | Controlled Travel Planners`
  - Campaign ID: `23794755046`
  - Daily budget: `200 TL`
  - Bid strategy: `Maximize Conversions`
  - Asset group: `Sunset + Dinner Controlled URLs`
  - Asset group ID: `6705373613`
  - Call asset: `enabled`

PMax controls used:

- Target countries match the Search reset:
  - Germany
  - France
  - Netherlands
  - United Kingdom
  - China
- Languages:
  - English
  - German
  - French
  - Dutch
  - Chinese
- Final URLs limited inside the asset group to:
  - `https://merrysails.com/`
  - `https://merrysails.com/reservation`
  - `https://merrysails.com/cruises/bosphorus-sunset-cruise`
  - `https://merrysails.com/istanbul-dinner-cruise`
- Asset automation settings opted out where the API supports it:
  - final URL expansion text automation
  - text asset automation
  - image extraction
  - image enhancement
- Search themes:
  - `bosphorus sunset cruise`
  - `istanbul sunset cruise`
  - `bosphorus dinner cruise`
  - `istanbul dinner cruise`
  - `istanbul cruise with dinner`
  - `bosphorus cruise from europe`
  - `istanbul trip planning`
  - `book istanbul cruise`

Stop rule remains stricter than Search:

- Pause PMax if it spends around `200 TL` with no qualified action.
- Pause PMax immediately if it produces `3` bad/fake WhatsApp or call leads.
- Do not raise PMax budget before Search proves lead quality.

## Direct Lead Asset Status

Call asset:

- Active on the two international Search campaigns.
- Active on the controlled international PMax campaign.
- This is currently the clean native Google Ads path for site-free phone leads.

WhatsApp message asset:

- Attempted through the Google Ads API.
- API rejected `business_message_asset` for this account/API surface.
- If Google Ads UI exposes `Message / WhatsApp` asset manually, add it to:
  - `Search | INTL | Sunset | Travel Planners`
  - `Search | INTL | Dinner | Travel Planners`
  - `PMax | INTL | MerrySails | Controlled Travel Planners`

Lead form asset:

- Created live after the account owner approved Lead Form Terms in the Google Ads UI.
- Attached to the two international Search campaigns and the controlled international PMax campaign.
- Asset resource: `customers/5484989676/assets/352790297411`.
- CTA: `Book now / Get cruise availability`.
- Fields: full name, email, phone number, preferred contact time.
- Intent setting: `HIGH_INTENT`.
- API verification: campaign asset links are `ENABLED`; asset review is currently `REVIEW_IN_PROGRESS`.
- Treat this as a site-free lead test, not as a primary purchase substitute until lead quality is proven.

## Budget Guardrail

Today should be a controlled test, not a scale push.

- `Search | INTL | Sunset | Travel Planners`: `400 TL/day`
- `Search | INTL | Dinner | Travel Planners`: `400 TL/day`
- PMax reserve/manual test: `200 TL/day max`, only after final URL and asset safety are confirmed

Do not exceed `1000 TL/day` total test spend without explicit approval.

Do not restart the old Istanbul-local Search or PMax campaigns for this test.

## 25 Apr Morning Growth Decision

Early signal showed that the international reset is technically serving, but Search volume is too low:

- `PMax | INTL | MerrySails | Controlled Travel Planners`: first traffic started on 24 Apr with `20` impressions, `4` clicks, and about `4.76 TL` spend.
- `Search | INTL | Dinner | Travel Planners`: first impressions started, but no clicks yet.
- `Search | INTL | Sunset | Travel Planners`: first impressions started, but no clicks yet.

The campaign/service state is not blocked:

- Search ads are approved and reviewed.
- Call assets are approved.
- Lead form asset remains in review.
- Search campaigns are in bidding learning.

Growth action prepared:

- Remove the `350 TL` target CPA constraint from the two Search campaigns while keeping `Maximize Conversions`.
- Keep budgets unchanged.
- Keep the same target countries.
- Add booking/ticket/price long-tail keywords as `phrase + exact`, not broad.

Prepared script:

```bash
node scripts/google-ads-search-growth-2026-04-25.cjs --live
```

Important: validation passed, but the live API mutate hit Google Ads Explorer operation quota. Retry after the API quota window resets. The quota error returned a retry delay of about `5h 54m`, so retry around `15:00-15:15` Istanbul time on `25 Apr 2026`.

## 25 Apr 16:30 Growth Update Applied

The Search growth update was applied live after quota recovered.

Applied changes:

- Removed the `350 TL` target CPA constraint from:
  - `Search | INTL | Sunset | Travel Planners`
  - `Search | INTL | Dinner | Travel Planners`
- Kept both campaigns on `Maximize Conversions`.
- Kept budgets unchanged:
  - Sunset Search: `400 TL/day`
  - Dinner Search: `400 TL/day`
  - Controlled PMax: `200 TL/day`
- Added booking/ticket/price long-tail keywords as `phrase + exact` across the 10 country/product ad groups.
- Did not add broad match.
- Did not change ad copy.

Verification after update:

- Search campaign `targetCpaTL` is now `0`.
- Search campaigns remain `ENABLED` and `SERVING`.
- Search ads remain `APPROVED / REVIEWED`.
- Call assets remain approved.
- Lead form asset is still `REVIEW_IN_PROGRESS`.
- Some newly added keywords are still `UNDER_REVIEW`, which is expected immediately after expansion.

## 25 Apr Product Lead Forms Applied

The generic lead form was removed from the two Search campaigns and replaced with product-specific Google-hosted lead forms. This is the preferred site-free lead path for Sunset and Dinner while WhatsApp message assets are not available on this account surface.

Sunset Search:

- Campaign: `Search | INTL | Sunset | Travel Planners`
- Asset: `customers/5484989676/assets/353356620887`
- Name: `MerrySails Sunset Lead Form | 1777135247318`
- Headline: `Ask Sunset Cruise Availability`
- CTA description: `Get sunset availability`
- Final URL: `https://merrysails.com/cruises/bosphorus-sunset-cruise`
- Review status: `REVIEW_IN_PROGRESS`

Dinner Search:

- Campaign: `Search | INTL | Dinner | Travel Planners`
- Asset: `customers/5484989676/assets/353510546619`
- Name: `MerrySails Dinner Lead Form | 1777135247318`
- Headline: `Ask Dinner Cruise Availability`
- CTA description: `Get dinner availability`
- Final URL: `https://merrysails.com/istanbul-dinner-cruise`
- Review status: `REVIEW_IN_PROGRESS`

Shared form structure:

- Intent: `HIGH_INTENT`
- Fields: full name, email, phone number, country, city, preferred contact time
- Preferred contact time options: morning, afternoon, evening

Controlled PMax:

- Keeps the original generic form for now:
  - Asset: `customers/5484989676/assets/352790297411`
  - Headline: `Ask MerrySails Availability`
  - Final URL: `https://merrysails.com/reservation`
- Review status remains `REVIEW_IN_PROGRESS`.

Next quality rule:

- Treat lead-form submissions as useful only after manual quality tagging.
- A valid lead should have a plausible country/city, preferred contact time, and a real Sunset or Dinner booking question.
- If lead volume is cheap but low quality, add one more qualifying question before scaling budgets.

## 25 Apr English-Only Search Delivery Update

The user confirmed that MerrySails should stay English-only for ads and landing pages. Germany Turkish and local-language expansion are paused for now.

Live Search delivery changes were applied after validation:

- `Search | INTL | Sunset | Travel Planners`
  - Bid strategy changed from `Maximize Conversions` to `Maximize Clicks` / `TARGET_SPEND`.
  - CPC bid ceiling: `120 TL`.
  - Daily budget unchanged: `400 TL/day`.
- `Search | INTL | Dinner | Travel Planners`
  - Bid strategy changed from `Maximize Conversions` to `Maximize Clicks` / `TARGET_SPEND`.
  - CPC bid ceiling: `120 TL`.
  - Daily budget unchanged: `400 TL/day`.

Keyword cleanup and expansion:

- Non-English localized keywords were paused.
- Added `260` English phrase/exact keywords across the 10 country/product ad groups.
- Added terms are broader but still commercial/travel-relevant, such as:
  - `bosphorus cruise`
  - `istanbul bosphorus cruise`
  - `bosphorus boat tour`
  - `bosphorus cruise tickets`
  - `bosphorus cruise price`
  - `istanbul night cruise`
  - `bosphorus dinner show`
  - `dinner cruise with hotel pickup`

Verification after live update:

- Both Search campaigns are `ENABLED`.
- Both Search campaigns are `SERVING`.
- Both Search campaigns report `TARGET_SPEND`.
- CPC ceiling verifies as `120 TL`.
- Call assets remain enabled and approved.
- Product-specific lead forms remain enabled and in `REVIEW_IN_PROGRESS`.

Reasoning:

- Search had almost no delivery while using `Maximize Conversions` without conversion volume.
- This change is a controlled data-gathering move: open auction entry without increasing daily budgets.
- Once enough qualified calls/forms/purchases are recorded, move Search back toward conversion-based bidding.

## 25 Apr Minimal Lead Form + Webhook Update

The user confirmed that lead forms should ask only for the lowest-friction contact fields:

- Full name
- Phone number

Email, country, city, and preferred contact time were removed from the Google-hosted lead forms.

Live Google Ads changes:

- `Search | INTL | Sunset | Travel Planners` was renamed to `Sunset | Travel Planners`.
- `Search | INTL | Dinner | Travel Planners` was renamed to `Dinner | Travel Planners`.
- Old lead forms were removed from Sunset, Dinner, and controlled PMax.
- New minimal lead forms were created and attached:
  - Sunset asset: `customers/5484989676/assets/353531116947`
  - Dinner asset: `customers/5484989676/assets/353378482388`
  - PMax asset: `customers/5484989676/assets/353461709863`
- All 3 forms use:
  - `FULL_NAME`
  - `PHONE_NUMBER`
  - `HIGH_INTENT`
  - webhook delivery enabled
- All 3 forms are currently `REVIEW_IN_PROGRESS`.

Webhook/admin/Telegram implementation:

- Production endpoint: `https://merrysails.com/api/google-ads/lead-form`
- Admin panel: `https://merrysails.com/admin/leads`
- Production env: `GOOGLE_ADS_LEAD_FORM_SECRET` added in Vercel.
- DB migration applied: `20260425173000_google_ads_leads`
- Production deploy completed and aliased to `https://merrysails.com`.
- A production webhook test returned `{ "success": true }` and stored a test lead with:
  - `googleLeadId`: `codex-test-lead-2026-04-25-001`
  - campaign: `Sunset | Travel Planners`
  - product: `Sunset Cruise`

Operational rule:

- Treat Google Lead Form submissions as speed-to-lead opportunities.
- Call or WhatsApp the lead as soon as it lands.
- Quality tag manually after contact: `new`, `contacted`, `qualified`, `bad`, or `booked`.

## 26 Apr Morning Optimization

Live read at `2026-04-26 11:16 Europe/Istanbul`:

- `PMax | INTL | MerrySails | Controlled Travel Planners`
  - `2,352` impressions
  - `175` clicks
  - `191.45 TL` spend
  - `1.09 TL` average CPC
  - `0` primary conversions
  - `13` all conversions:
    - `8` MS WhatsApp Click
    - `5` MS Phone Click
- `Sunset | Travel Planners`
  - `20` impressions
  - `2` clicks
  - `115.13 TL` spend
  - `57.57 TL` average CPC
  - `0` conversions
- `Dinner | Travel Planners`
  - `1` impression
  - `1` click
  - `37.03 TL` spend
  - `0` conversions

Lead status:

- No real Google Lead Form submissions in the DB yet.
- Only the Codex test lead exists.
- All 3 Google-hosted lead forms remain `REVIEW_IN_PROGRESS`.

Clarity read:

- PMax traffic was mostly landing on the homepage through `intl_pmax_controlled` UTMs.
- Many PMax sessions were very short, but there were also some engaged sessions.
- Reservation, Sunset, and Dinner pages showed some dead-click friction.
- Rage-click friction was low overall.

Actions applied:

- Removed homepage from the controlled PMax asset group final URL set.
- PMax is now constrained to:
  - `https://merrysails.com/reservation`
  - `https://merrysails.com/cruises/bosphorus-sunset-cruise`
  - `https://merrysails.com/istanbul-dinner-cruise`
- Added English-only cleanup negatives to both Search campaigns as phrase negatives:
  - `schifffahrt`
  - `bateau`
  - `croisiere`
  - `croisière`
  - `prix`
  - `traversée`
  - `bosphore`
  - `bootstour`
  - `bootsfahrt`
  - `abendessen`
  - `buchen`
  - `boeken`
  - `diner croisiere`
  - `bosporus schifffahrt`

Interpretation:

- PMax is producing very cheap contact clicks, but quality is not proven.
- Do not scale PMax yet.
- PMax should now be judged by whether the product/reservation URL restriction improves qualified phone/WhatsApp behavior.
- Search is expensive but cleaner; keep it running as the higher-intent data source.

## 25 Apr Cross-Account CPC Lesson

Kings World Transfer and MerryTourism showed that serious international travel clicks can require much higher effective CPC than a `30 TL` ceiling.

Do not restore low CPC caps or the old `350 TL` target CPA while MerrySails is still trying to build impression and click flow.

- Keep Search on `Maximize Conversions` without a low target CPA until there is enough conversion data.
- If switching to `Maximize Clicks`, use realistic ceilings instead of starving delivery:
  - Sunset / Dinner cruise: roughly `80-120 TL`.
  - Private yacht / charter / event intent: roughly `120-200 TL`.
- No CPC cap is acceptable when budgets, negatives, landing ownership, and daily checks are controlled.
- Keep the MerrySails product split distinct from transfer accounts: Sunset, Dinner, Yacht, and Events should not be merged into generic transfer-style campaigns.

Detailed handoff:

- `docs/ads/MERRYSAILS-KINGS-CPC-HANDOFF-2026-04-25.md`

## Campaign Structure

### Search | INTL | Sunset | Travel Planners

Landing page:

- `https://merrysails.com/cruises/bosphorus-sunset-cruise`

Ad groups:

- `Germany | Sunset Travel Planners`
- `France | Sunset Travel Planners`
- `Netherlands | Sunset Travel Planners`
- `UK | Sunset Travel Planners`
- `China | Sunset Travel Planners`

Offer message:

- `Bosphorus Sunset Cruise`
- `From EUR 34 Per Person`
- `Direct booking`
- `TURSAB licensed`
- `Call or message to book`

Do not claim free shuttle in Sunset ads unless the landing page clearly supports it for that package.

### Search | INTL | Dinner | Travel Planners

Landing page:

- `https://merrysails.com/istanbul-dinner-cruise`

Ad groups:

- `Germany | Dinner Travel Planners`
- `France | Dinner Travel Planners`
- `Netherlands | Dinner Travel Planners`
- `UK | Dinner Travel Planners`
- `China | Dinner Travel Planners`

Offer message:

- `Bosphorus Dinner Cruise`
- `From EUR 30 Per Person`
- `Turkish night dinner`
- `Hotel pickup support`
- `Call or message to book`

Dinner can use pickup/support claims because the page already states hotel pickup support and central European-side pickup logic.

## Asset Strategy

### Call asset

Use the main MerrySails number:

- `+90 537 040 68 22`

Schedule the call asset only when sales follow-up is realistic:

- `00:00-01:00`
- `09:00-24:00`

Account timezone is Istanbul. This keeps the previous `01:00-09:00` closed-window rule.

### WhatsApp message asset

Google now supports message assets that can route clicks directly to WhatsApp for eligible accounts, but the feature is beta / allowlist-gated.

Use it if available:

- Provider: `WhatsApp`
- CTA: `Contact us`
- Starter message: `Hi MerrySails, I am planning Istanbul and want cruise availability, prices, and pickup details.`

If the API rejects it due allowlist, use Google Ads UI if the asset appears in the account. If it does not appear in the UI either, fall back to landing-page WhatsApp tracking and call asset.

### Lead form asset

Lead form is now live as a controlled site-free lead test. Current required fields:

- Full name
- Email
- Phone number
- Preferred contact time

If quality is weak, tighten the next form iteration with extra qualifying questions:

- Istanbul travel date
- Guest count
- Cruise type: Sunset / Dinner
- Hotel area or country
- WhatsApp number

Reason: Google-hosted lead forms can generate cheap but low-quality leads unless the form adds enough friction.

## PMax Guardrail

PMax caused low-quality lead volume in the first local test. The international PMax test is allowed only as a small controlled experiment.

Required before enabling PMax:

- Final URL expansion off
- Page feed / URL set limited to:
  - `https://merrysails.com/`
  - `https://merrysails.com/reservation`
  - `https://merrysails.com/cruises/bosphorus-sunset-cruise`
  - `https://merrysails.com/istanbul-dinner-cruise`
- Asset groups split by Sunset and Dinner
- Audience signals based on cruise/dinner/sunset intent and competitor/travel planning URLs
- X/Twitter and low-quality app placement exclusions where available
- Stop rule: pause immediately after 3 bad leads or 200 TL spend with no qualified action

Launch order:

1. Start only the two international Search campaigns first.
2. Wait for early impression/click/call/message behavior.
3. Add PMax only if Search quality is acceptable or if we need a tightly capped channel test.
4. Never give PMax the main budget until it proves qualified lead quality.

## Keywords

Use phrase + exact only at launch. No broad match.

Core English:

- `bosphorus sunset cruise`
- `istanbul sunset cruise`
- `sunset cruise istanbul`
- `bosphorus sunset boat tour`
- `istanbul dinner cruise`
- `bosphorus dinner cruise`
- `dinner cruise istanbul`
- `bosphorus dinner cruise with show`
- `istanbul dinner cruise with pickup`

Localized support terms are allowed inside country-specific ad groups, but the landing page stays English.

## Negatives

Start with aggressive negatives:

- `free ferry`
- `public ferry`
- `sehir hatlari`
- `turyol`
- `dentur`
- `timetable`
- `schedule`
- `map`
- `weather`
- `jobs`
- `recipe`
- cross-product negatives between Sunset and Dinner

## Tracking Interpretation

Optimization hierarchy:

- Primary business winner: `purchase`
- Strong support signals: qualified `phone_click`, qualified `whatsapp_click`
- Watch but do not over-trust: PMax message/call volume without real booking quality

The old local PMax taught us that cheap WhatsApp/call volume can be fake. For this reset, a phone or WhatsApp lead is only useful if it is manually judged as:

- real Istanbul travel intent
- asking for Sunset or Dinner availability/pricing
- plausible travel date or hotel/context
- not spam, job, supplier, local unrelated, or random message

Daily read:

- Spend by campaign
- Click type: website click vs call/message asset
- Search terms
- Country split
- Device split
- Clarity paid URL/session quality
- WhatsApp/call quality manually tagged as `qualified`, `bad`, or `unknown`

## Implementation Script

Prepared script:

```bash
node scripts/google-ads-international-reset-2026-04-24.cjs --include-message-asset
```

Live mode:

```bash
node scripts/google-ads-international-reset-2026-04-24.cjs --live --include-message-asset
```

Current blocker:

- Google Ads API developer-token explorer quota is exhausted.
- Last retry delay returned by Google at `10:22 Europe/Istanbul`: about `17709s`.
- Earliest retry: `24 Apr 2026 15:18 Europe/Istanbul`.
- Safe retry window: `24 Apr 2026 15:25 Europe/Istanbul` or later.
- Do not try to force repeated calls; it only extends noise and does not create campaigns.

## Run Order When Quota Opens

At `15:25 Europe/Istanbul` or later, run validation first:

```bash
node scripts/google-ads-international-reset-2026-04-24.cjs --include-message-asset
```

If validation passes, then run live:

```bash
node scripts/google-ads-international-reset-2026-04-24.cjs --live --include-message-asset
```

If validation fails only because the WhatsApp message asset is not allowlisted, run live without the message asset and then add WhatsApp message asset from the UI if the UI exposes it:

```bash
node scripts/google-ads-international-reset-2026-04-24.cjs --live
```

Do not enable PMax from API in this first retry. PMax should be added only after checking final URL expansion, page feed restriction, asset groups, and placement safety in the UI/API.

## New Plan From Prior Prompts

The plan to run now is:

- Pause/ignore old Turkey-local traffic for the reset.
- Do not advertise Private Yacht for now.
- Use only `Sunset` and `Dinner` Search as the main test.
- Target Germany, France, Netherlands, United Kingdom, and China with presence-only location logic.
- Keep the landing pages narrow:
  - Sunset → `/cruises/bosphorus-sunset-cruise`
  - Dinner → `/istanbul-dinner-cruise`
  - Home/reservation only for later PMax or sitelink support, not as generic Search landing pages.
- Keep phrase + exact match only.
- Use country-specific ad groups, but keep the website English.
- Use localized keyword variants carefully inside the country ad groups.
- Make call asset the strongest direct-from-ad lead path.
- Try WhatsApp message asset if Google exposes it, but do not rely on it until confirmed live.
- Keep purchase as the most important business conversion.
- Treat WhatsApp/call as strong support signals only when lead quality is real.
- Keep PMax capped, delayed, and controlled because the previous PMax produced low-quality leads.

## 26 Apr 2026 Live Guardrail Update

Snapshot pulled via Google Ads API:

- `Sunset | Travel Planners`: enabled, serving, presence-only international targeting, Search Partners off, 400 TL/day.
- `Dinner | Travel Planners`: enabled, serving, presence-only international targeting, Search Partners off, 400 TL/day.
- `PMax | INTL | MerrySails | Controlled Travel Planners`: enabled, serving, 200 TL/day, final URLs restricted to reservation, Sunset, and Dinner.
- International targeting verified as China, France, Germany, Netherlands, and United Kingdom.
- PMax generated cheap click volume and secondary contact events, but no purchase or real lead-form lead yet.
- PMax budget must not be increased until qualified lead quality is proven.

Lead form status:

- Sunset minimal lead form: `REVIEW_IN_PROGRESS`.
- Dinner minimal lead form: `REVIEW_IN_PROGRESS`.
- PMax minimal lead form: `REVIEW_IN_PROGRESS`.
- Forms are high-intent and only ask for full name + phone number.
- Production webhook is live at `/api/google-ads/lead-form` and stores leads in `GoogleAdsLead`.
- Current DB contains only the Codex test lead; no real Google lead-form lead has arrived yet.

Negative keyword cleanup applied:

- Search campaigns received additional negatives for non-English, public-transport, ferry, port-schedule, and cruise-ship intent.
- PMax received campaign-level negatives for the same low-quality traffic patterns.
- Key examples: `boottocht`, `tour en bateau`, `traversee`, `bosporus`, `ferry`, `eminonu`, `cruise ship`, `port schedule`, `departure timetable`, `dentur`, `turyol`, `sehir hatlari`.

Next read:

- Do not judge PMax on click count alone.
- Separate `MS WhatsApp Click` and `MS Phone Click` from real purchase / lead-form leads.
- If PMax keeps producing only cheap secondary clicks and no qualified conversations, pause or keep capped; do not scale.
- For Search, keep expanding only high-intent English terms with phrase/exact match, then prune search terms daily.

## 26 Apr 2026 Competitor-Led Search Expansion

Competitor pattern reviewed:

- Marketplaces compete heavily on `from` prices, reviews, free cancellation, and pickup.
- Sunset competitor messaging clusters around `tickets`, `price`, `yacht`, `snacks`, `wine`, and `golden hour`.
- Dinner competitor messaging clusters around `tickets`, `with show`, `hotel pickup`, `private table`, `Turkish night`, and package pricing.
- MerrySails should not try to win only as the cheapest marketplace-style listing.
- MerrySails positioning should stay: direct booking, Merry Tourism/TURSAB trust, real product pages, fast WhatsApp/phone support, and clear package pricing.

Live keyword expansion applied without budget changes:

- Added 84 missing phrase/exact high-intent keywords across the international Search ad groups.
- Sunset examples: `bosphorus sunset cruise tickets`, `istanbul sunset cruise tickets`, `bosphorus sunset cruise price`, `istanbul sunset cruise price`, `sunset yacht cruise istanbul`, `book sunset cruise istanbul`.
- Dinner examples: `istanbul dinner cruise tickets`, `bosphorus dinner cruise with show`, `bosphorus dinner cruise with pickup`, `book dinner cruise istanbul`, `istanbul dinner cruise price`, `turkish night dinner cruise istanbul`.
- No broad-match expansion was added.
- Search terms must be checked daily because these terms can still pull cheap ferry, marketplace, or low-quality comparison traffic.

Analytics tooling update:

- Added MerrySails GA4 OAuth/report scripts adapted from the MerryTurizm workflow.
- Added MerrySails Clarity paid-summary script with local caching to avoid wasting the Clarity daily export quota.
- GA4 still needs a one-time `analytics.readonly` OAuth token before API reporting can run.
- Clarity export quota was already exhausted on 26 Apr 2026, so the cached workflow should be used on the next reset window.
