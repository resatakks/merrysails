# MerrySails — Ads Rollout Plan

**Date:** 22 April 2026
**Purpose:** Step-by-step Google Ads launch and tracking rollout for MerrySails after GA4 and Clarity installation.
**Scope:** `Sunset`, `Dinner`, `Yacht`, and `Brand` campaigns, with `purchase` as the main optimization event.

---

## 1. Current Status

### Tracking

- `GA4` installed with measurement ID `G-9B3Q7FM7X8`
- `Microsoft Clarity` installed with project ID `wfsykdd4gb`
- Current tracked site events:
  - `purchase`
  - `begin_checkout`
  - `contact_submit_success`
  - `generate_lead`
  - `phone_click`
  - `whatsapp_click`

### Google Ads

- Google Ads account number received: `548-498-9676`
- Missing for direct site-side Ads conversion firing:
  - `AW-...` site tag ID
  - conversion labels
- Safe immediate path:
  - link `GA4` to `Google Ads`
  - import `purchase` first
  - add secondary imports only after account hygiene is correct

---

## 2. No-Skip Rollout Order

1. Confirm Google Ads and GA4 are linked.
2. Verify `purchase` is appearing in GA4 debug / realtime.
3. Import only `purchase` into Google Ads first.
4. Mark `purchase` as the primary optimization conversion.
5. Keep `phone_click`, `whatsapp_click`, and `contact_submit_success` out of primary bidding at launch.
6. Build `Brand`, `Sunset`, `Dinner`, and `Yacht` campaigns separately.
7. Launch with `phrase` and `exact` match only.
8. Use `presence-only` location targeting for Istanbul.
9. Keep `Search Partners` off at launch.
10. Review search terms daily in week 1.
11. Add negatives aggressively to stop product crossover.
12. Only after clean early data: decide whether to import more secondary conversions.

---

## 3. Conversion Decision For Launch

### Primary

- `purchase`

### Secondary, tracked but not used for primary bidding at launch

- `contact_submit_success`
- `phone_click`
- `whatsapp_click`
- `begin_checkout`

### Why this is the safer launch setup

- MerrySails already has a direct reservation flow.
- `purchase` is the clearest high-intent business event.
- `phone` and `WhatsApp` clicks are valuable, but they are still softer than a completed reservation request.
- If these softer actions are imported as primary too early, Google may chase cheap contacts instead of real booking intent.

---

## 4. Istanbul Market Scan — What The Market Is Selling

**Important note:** This scan reflects pages and commercial results visible on 22 April 2026. It is strong for message and landing-page pattern detection, but exact paid ad positions can still vary by device, language, and location context.

### 4.1 Sunset market pattern

Observed pattern:
- Many `sunset` competitors frame the product as a private yacht experience, not a shared-ticket cruise.
- Common promises:
  - sunset photography
  - private yacht
  - flexible boarding points
  - tea / coffee / light refreshments

Commercial threat types:
- `bosphorusyacht.com`
- `bosphorustour.com`
- `bosphorustours.com`

Implication for MerrySails:
- MerrySails should not sound like another vague private yacht sunset seller.
- The winning distinction is:
  - `shared`
  - `reserve direct`
  - `from EUR 34`
  - clear two-option ladder
  - cleaner booking path

### 4.2 Dinner market pattern

Observed pattern:
- Dinner competitors lead very hard with:
  - full-course dinner
  - Turkish night / live show
  - hotel pickup
  - Kabataş boarding
  - VIP table or package upgrades

Commercial threat types:
- `turnatour.com`
- `gbosphorus.com`

Implication for MerrySails:
- Dinner ads must not stay generic.
- The message should lead with:
  - shared Bosphorus dinner cruise
  - package clarity
  - pickup / transfer support truth
  - direct booking
  - clear departure flow

### 4.3 Yacht market pattern

Observed pattern:
- Yacht competitors push:
  - instant confirmation
  - secure payment
  - crew
  - hourly starting prices
  - event flexibility

Commercial threat types:
- `suyat.com.tr`
- other private charter operators in yacht SERPs

Implication for MerrySails:
- Yacht ads must lean into:
  - `from EUR 280`
  - private charter
  - event use cases
  - package ladder clarity
  - direct booking rather than quote confusion where possible

---

## 5. Product-Specific Ad Direction

### Sunset

- Lead message:
  - `Bosphorus Sunset Cruise`
  - `Reserve Direct`
  - `From EUR 34`
- Reinforcement:
  - 2-hour golden hour
  - snacks and drinks
  - shared product clarity
- Avoid:
  - sounding like a private yacht charter
  - vague “best Bosphorus tour” copy

### Dinner

- Lead message:
  - `Istanbul Dinner Cruise`
  - `Shared Evening Cruise`
  - `Direct Booking`
- Reinforcement:
  - package options
  - show and dinner flow
  - pickup / boarding clarity
- Avoid:
  - promising more transfer certainty than the page supports
  - generic “night cruise” language without dinner intent

### Yacht

- Lead message:
  - `Yacht Charter Istanbul`
  - `Private Bosphorus Yacht`
  - `From EUR 280`
- Reinforcement:
  - proposal / birthday / corporate / private cruise support
  - package ladder
  - premium private-use framing
- Avoid:
  - blending into shared cruise intent
  - sending charter intent to generic cruise pages

---

## 6. Campaign Build Order

1. `Search | EN | Brand | Istanbul Presence`
2. `Search | EN | Sunset | Istanbul Presence`
3. `Search | EN | Dinner | Istanbul Presence`
4. `Search | EN | Yacht | Istanbul Presence`

### Why this order

- `Brand` protects against competitor interception and gives the fastest signal check.
- `Sunset` and `Dinner` validate the two main public-ticket product lines.
- `Yacht` is higher-ticket and often more expensive per click, so it should launch with stricter control.

---

## 7. Daily Week-1 Checklist

1. Check whether `purchase` is populating in GA4 correctly.
2. Check whether Google Ads imported conversion status is healthy.
3. Review search terms by campaign.
4. Add cross-product negatives:
   - `sunset` campaign negatives: dinner, yacht charter, proposal, wedding
   - `dinner` campaign negatives: sunset, private yacht, boat rental
   - `yacht` campaign negatives: cheap dinner, public cruise, ferry-like intent
5. Review device split and CTR.
6. Review landing-page fit by query.
7. Log competitor message changes seen in live SERPs.

---

## 8. What To Do Next

### Immediate next action

- Link `GA4` and `Google Ads`, then import `purchase` first.

### After that

- Build the 4-campaign launch structure.
- Keep secondary events observed but non-primary.
- Run a fresh Istanbul-mobile competitor sweep to capture exact ad headlines and sitelinks.

### Separate later session

- abandonment / remarketing flow
- advanced secondary conversion policy
- potential direct `AW-...` site-side conversion firing once tag details exist

---

## 9. Live Source Set

- MerrySails Sunset page: `https://merrysails.com/cruises/bosphorus-sunset-cruise`
- MerrySails Dinner page: `https://merrysails.com/istanbul-dinner-cruise`
- MerrySails Yacht page: `https://merrysails.com/yacht-charter-istanbul`
- Turnatour Dinner Cruise: `https://www.turnatour.com/`
- GBosphorus Dinner Cruise: `https://www.gbosphorus.com/`
- SU Yachts: `https://www.suyat.com.tr/en`
- Bosphorus Yacht Sunset Cruise: `https://www.bosphorusyacht.com/cruises/sunset-cruises/`
