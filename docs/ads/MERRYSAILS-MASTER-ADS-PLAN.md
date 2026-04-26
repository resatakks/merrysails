# MerrySails — Master Ads Plan

**Prepared on:** 22 April 2026
**Launch target:** 23 April 2026
**Workspace mode:** MerrySails Ads + tracking + optimization operating plan
**Primary objective:** Launch a controlled Google Search program for the 3 core commercial lines and improve it continuously through clean measurement, disciplined negatives, and landing-page/message fit.

---

## 1. Executive Summary

MerrySails should launch with **3 separate Search campaigns**:

1. `Sunset`
2. `Dinner`
3. `Private Yacht`

This is better than 1 campaign and better than a compressed 2-campaign structure for the current situation because:

- `Sunset` and `Dinner` are the two immediate priority products.
- `Dinner` can safely use transfer/shuttle messaging, while `Sunset` cannot.
- `Private Yacht` uses a different economic model and attracts different user intent.
- Each product already has a clear owner page and pricing logic in the repo.

**Initial budget:** `3,000 TL`

Recommended split:

- `Sunset`: `1,250 TL`
- `Dinner`: `1,250 TL`
- `Private Yacht`: `500 TL`

**Primary bidding signal:** `purchase`

**Secondary diagnostic signals:**

- `whatsapp_click`
- `phone_click`
- `contact_submit_success`
- `generate_lead`
- `begin_checkout`

The key strategic posture is:

- measure first
- launch tightly
- read search terms every day
- add negatives aggressively
- push spend toward winner queries only after they prove themselves

---

## 2. Business Truth We Must Protect

These are the commercial truths that ads must not distort.

### Sunset

- Owner page: `/cruises/bosphorus-sunset-cruise`
- Public pricing:
  - `€34` Without Wine
  - `€40` With Wine
- Product type:
  - shared cruise
  - 2 hours
- Meeting flow:
  - Karakoy-side meeting flow
  - final boarding pin confirmed after booking
- Route landmark signals already supported in repo:
  - Maiden's Tower
  - Dolmabahce Palace
  - Ortakoy Mosque
  - Rumeli Fortress
  - Bosphorus Bridge
- Transfer truth:
  - hotel pickup/drop-off only as extra service
  - not a free standard inclusion

### Dinner

- Owner page: `/istanbul-dinner-cruise`
- Public pricing:
  - `€30`
  - `€45`
  - `€80`
  - `€90`
- Product type:
  - shared dinner cruise
  - 3.5 hours
  - package ladder
- Boarding logic:
  - Kabatas Pier flow
- Transfer truth:
  - hotel pickup and drop-off from central European-side areas
  - not universal pickup
  - Asian-side guests usually come directly
- Strongest promise set:
  - dinner
  - Turkish show
  - package options
  - VIP table tiers
  - central-area shuttle support

### Private Yacht

- Owner page: `/yacht-charter-istanbul`
- Supporting pages:
  - `/boat-rental-istanbul`
  - `/proposal-yacht-rental-istanbul`
  - `/corporate-events`
- Public pricing:
  - `€280`
  - `€380`
  - `€680`
- Product type:
  - private yacht charter
  - per-yacht economics
  - event / celebration use cases
- Departure logic:
  - Kurucesme / marina-led charter flow
- Transfer truth:
  - no standard free shuttle

---

## 3. Why 3 Campaigns Is The Correct Launch Structure

### Why not 1 campaign

One campaign would cause:

- Sunset and Dinner keyword overlap
- shared-ticket and per-yacht economics mixed together
- noisy ad copy
- poor landing-page match
- slower negative control

### Why not merge Sunset and Dinner right now

A 2-campaign setup is a valid fallback if operational simplicity is more important than precision, but it is not the best launch choice here because:

- `Dinner` can legitimately use `free shuttle from central areas`
- `Sunset` cannot
- `Dinner` package ladder and value messaging are much more complex
- Sunset and Dinner search behavior differ enough to justify separate CPC and query management

### Why Yacht must stay separate

Private yacht traffic differs from shared cruise traffic in:

- query intent
- ticket value
- competition shape
- landing pages
- add-on behavior

If yacht traffic is mixed into shared products, budget can leak quickly.

---

## 4. Campaign Architecture

### Campaign 1

`Search | EN | Sunset | Istanbul Presence`

Goal:

- Own high-intent sunset cruise demand with a clear shared-product offer

Core message:

- Shared Bosphorus Sunset Cruise
- From €34
- Direct booking
- Strong landmark route

### Campaign 2

`Search | EN | Dinner | Istanbul Presence`

Goal:

- Own high-intent dinner cruise demand with strong price + transfer + package clarity

Core message:

- Istanbul Dinner Cruise From €30
- Free Shuttle From Central Areas
- Dinner + Turkish Show
- VIP Table Options

### Campaign 3

`Search | EN | Private Yacht | Istanbul Presence`

Goal:

- Capture controlled private yacht and private event demand without polluting shared-cruise campaigns

Core message:

- Yacht Charter Istanbul From €280
- Private Bosphorus Yacht
- Proposal, Birthday, Corporate

---

## 5. Budget Plan

### Initial budget

- Total: `3,000 TL`

### Allocation

- Sunset: `1,250 TL`
- Dinner: `1,250 TL`
- Private Yacht: `500 TL`

### Budget logic

Sunset and Dinner get the majority because:

- they are top current priorities
- they are more likely to generate faster query learning
- they are more likely to drive visible booking demand at lower cost per click than private yacht

Private Yacht starts smaller because:

- it attracts more variable search intent
- it can be more expensive
- it needs cleaner early validation before scale

### Scaling rule

We increase budget only when at least one of the following becomes clear:

- search terms are consistently relevant
- `purchase` starts appearing
- CTR and landing-page fit are strong
- phone / WhatsApp support signals align with quality traffic

We do **not** increase budget just because spend is low.

---

## 6. Geo Strategy

### Core targeting rule

- Target only users physically present in Istanbul
- Use presence-only location targeting

### Primary zones

- Sultanahmet
- Sirkeci
- Taksim
- Beyoglu
- Karakoy
- Besiktas
- Harbiye
- Fatih

These zones matter because:

- they are hotel-dense
- they are tourist-dense
- they are close to same-day and next-day booking demand
- Dinner’s transfer logic already matches this geography

### Secondary zones

- Sisli
- Nisantasi
- Ortakoy
- Topkapi
- Galataport / Findikli line

### Private Yacht higher-value support zones

- Bebek
- Arnavutkoy
- Levent
- Bosphorus hotel areas

### Product-specific geo emphasis

#### Sunset

Best fit zones:

- Sultanahmet
- Sirkeci
- Karakoy
- Taksim
- Beyoglu

#### Dinner

Best fit zones:

- Sultanahmet
- Sirkeci
- Taksim
- Harbiye
- Beyoglu
- Karakoy
- Besiktas
- Topkapi

#### Private Yacht

Best fit zones:

- Besiktas
- Ortakoy
- Bebek
- Arnavutkoy
- Sisli
- Nisantasi
- Levent

### Zones to avoid over-prioritizing at launch

- broad Asian-side shared dinner demand
- outer residential districts without tourist stay behavior
- generic full-city broad expansion without data

---

## 7. Conversion And Tracking Plan

### Current measurement posture

Installed and active:

- GA4 via `G-9B3Q7FM7X8`
- Microsoft Clarity via `wfsykdd4gb`

### Event map

Primary event:

- `purchase`

Secondary events:

- `begin_checkout`
- `contact_submit_success`
- `generate_lead`
- `phone_click`
- `whatsapp_click`

### Why `purchase` stays primary

Because the site already supports direct reservation creation and that is the strongest commercial signal available. If Google optimizes too early toward `whatsapp_click` or `phone_click`, it may chase cheap curiosity instead of actual booking behavior.

### Current tracked CTA surfaces

Tracked now:

- sticky call button
- sticky WhatsApp button
- header phone
- mobile menu phone
- footer phone
- contact page phone
- contact page WhatsApp
- homepage CTA phone
- homepage CTA WhatsApp
- blog inline CTA WhatsApp
- reservation page WhatsApp
- booking sidebar WhatsApp
- booking sidebar phone
- booking mobile bar phone
- booking calendar WhatsApp
- booking modal WhatsApp
- reservation confirmation WhatsApp

### Launch-day tracking QA

Before Ads starts spending, verify:

1. pageviews are visible in GA4
2. `purchase` appears after a test reservation
3. `phone_click` appears after at least 3 separate CTA tests
4. `whatsapp_click` appears from at least:
   - sticky button
   - booking sidebar
   - contact page
5. `begin_checkout` appears when booking flow starts

### Reporting hierarchy after launch

Primary performance read:

- `purchase`

Support reads:

- `begin_checkout`
- `phone_click`
- `whatsapp_click`

Context reads:

- `contact_submit_success`
- `generate_lead`

---

## 8. Competitive Landscape And Gaps

### Market pattern: Sunset

Many visible competitors use sunset messaging that sounds more like private yacht charter than a shared cruise. This leaves a gap for a premium-feeling but more accessible shared sunset product.

**Our advantage:**

- shared product clarity
- direct reservation
- visible low entry price
- route-specific landmark storytelling

### Market pattern: Dinner

Competitors push:

- Turkish night
- pickup
- VIP table
- premium package language

**Our advantage:**

- lower visible entry point
- clearer package ladder
- direct booking messaging
- central-area shuttle truth

### Market pattern: Private Yacht

Many private yacht sellers use generic luxury language and less commercial structure.

**Our advantage:**

- simpler starter pricing
- clearer package ladder
- event-specific use cases already supported by the site

### Competitive gaps we should exploit

1. Many competitors are vague.
2. Many competitors rely on generic luxury language.
3. Some competitors lead too hard with premium pricing.
4. Many do not explain the route clearly enough.
5. Some competitors overpromise pickup.

### Our response

- use honest pricing
- use route landmarks
- keep product intent separated
- use direct-booking language
- qualify transfer claims carefully

---

## 9. Messaging Framework

### Sunset messaging framework

Lead with:

- shared sunset
- from €34
- direct booking
- landmark route

Safe example themes:

- Bosphorus Sunset Cruise From €34
- Shared Sunset Cruise Istanbul
- See Maiden's Tower At Sunset
- Dolmabahce, Ortakoy, Rumeli Fortress

Avoid:

- private yacht language
- free shuttle language
- generic “best Bosphorus tour” copy

### Dinner messaging framework

Lead with:

- from €30
- free shuttle from central areas
- dinner + Turkish show
- VIP table options

Safe example themes:

- Istanbul Dinner Cruise From €30
- Free Shuttle From Central Areas
- Dinner Cruise With Turkish Show
- VIP Table Options

Avoid:

- citywide pickup claims
- Asian-side pickup assumptions
- private dining phrasing for the shared product

### Private Yacht messaging framework

Lead with:

- from €280
- private yacht
- event use cases
- direct pricing

Safe example themes:

- Yacht Charter Istanbul From €280
- Private Bosphorus Yacht
- Proposal, Birthday, Corporate
- Direct Yacht Booking Istanbul

Avoid:

- free shuttle
- shared cruise language
- sunset ticket phrasing

---

## 10. Route And Landmark Strategy

Competitors often underuse route specificity. MerrySails should be better here.

### Sunset route anchors

- Maiden's Tower
- Dolmabahce Palace
- Ortakoy Mosque
- Rumeli Fortress
- Bosphorus Bridge

### Dinner route anchors

- Kabatas
- illuminated Bosphorus
- evening skyline
- stage and dinner flow

### Private Yacht anchors

- Kurucesme marina logic
- private Bosphorus route
- event flexibility
- premium views and direct private usage

### Why route signals matter

- they make the ad feel more real
- they separate us from vague “luxury” competitors
- they improve perceived product clarity before the click

---

## 11. Asset Strategy

### Sunset images

- `public/images/sunset1.jpeg`
- `public/images/sunset5.jpeg`
- `public/images/sunset6.jpeg`

### Dinner images

- `public/images/dinner-etkinlik-13.jpeg`
- `public/images/dinner-etkinlik-4.jpeg`
- `public/images/dinner-etkinlik-8.jpeg`
- `public/images/vip-menu.jpeg`

### Private Yacht images

- use yacht page assets where accepted by Google Ads asset requirements
- if quick launch requires simplification, launch Sunset and Dinner image assets first and validate yacht image formatting separately

### Creative rule

Sunset should feel:

- scenic
- premium
- shared
- golden-hour

Dinner should feel:

- structured
- atmospheric
- service-led
- package-oriented

Private Yacht should feel:

- private
- premium
- event-ready
- direct

---

## 12. Negative Keyword Discipline

### Sunset negatives

- dinner
- dinner cruise
- private yacht
- yacht charter
- boat rental
- proposal
- wedding
- corporate
- birthday party
- public ferry
- sehir hatlari

### Dinner negatives

- sunset
- sunset cruise
- private yacht
- yacht charter
- boat rental
- proposal
- wedding yacht
- birthday yacht
- public ferry

### Private Yacht negatives

- shared cruise
- dinner cruise ticket
- sunset cruise ticket
- cheap ferry
- public boat
- free shuttle
- hotel pickup included

### Operating rule

We do not wait a week to clean negatives. We add them daily from day 1.

---

## 13. Launch-Day Operations

### Before enabling campaigns

1. Confirm GA4 and Clarity are active.
2. Confirm `purchase` test event is visible.
3. Confirm major CTA events appear.
4. Confirm all final URLs match campaign intent.
5. Confirm no free shuttle message outside Dinner.
6. Confirm exact + phrase only.
7. Confirm Search Partners are off.
8. Confirm presence-only geo.
9. Confirm budgets are loaded correctly.

### Day 1 tasks

1. Launch all 3 campaigns.
2. Watch first search terms as soon as impressions begin.
3. Check CTR by campaign and ad group.
4. Block obvious mismatches immediately.

### Day 2-3 tasks

1. Tighten negatives.
2. Check which districts and devices show better quality.
3. Compare `begin_checkout` against clicks.
4. Watch first `phone_click` and `whatsapp_click` patterns.

### Day 4-7 tasks

1. Identify winner keyword themes.
2. Shift budget within campaigns if necessary.
3. Reduce spend on weak ad groups.
4. Protect exact-match winners.

---

## 14. Reporting Cadence

### Daily

Review:

- campaign
- ad group
- search term
- CTR
- CPC
- device
- location
- `begin_checkout`
- `purchase`
- `phone_click`
- `whatsapp_click`

### Weekly

Review:

- total spend by product line
- cost per purchase
- quality of calls and WhatsApp signals
- landing-page fit
- new negatives
- new exact-match opportunities

### Questions we should answer every day

1. Which queries deserve more spend?
2. Which queries need to be blocked?
3. Which district zones look strongest?
4. Is Dinner’s transfer messaging helping or hurting?
5. Is Yacht spending too broadly for the budget size?

---

## 15. Decision Rules

### Increase budget when

- purchases appear with clean search intent
- winner queries are constrained by budget
- landing pages clearly match search behavior

### Keep flat when

- clicks are okay but query quality is still mixed
- support signals are present but purchases are too early to read

### Decrease or pause when

- strong mismatch between query and LP
- soft conversions rise but no real booking signal appears
- CPC is inflated without quality improvement

---

## 16. Immediate Next Execution Order

This is the order we should follow from here:

1. Use this master plan as the operating document.
2. Treat [MERRYSAILS-GOOGLE-ADS-LAUNCH-PACKAGE.md](/Users/resat/Desktop/merrysails/docs/ads/MERRYSAILS-GOOGLE-ADS-LAUNCH-PACKAGE.md) as the build sheet.
3. Launch 3 campaigns with the current budget split.
4. Verify conversion events on launch day.
5. Start daily query and negative management immediately.
6. Scale only from evidence.

---

## 17. Success Definition

This launch is successful if, in the first phase, we achieve:

- clean product separation
- reliable `purchase` measurement
- strong visibility in core Istanbul tourist demand
- obvious negative-keyword learning
- the first clear winner queries for Sunset and Dinner

The goal is not just to launch ads. The goal is to create a system that gets smarter every day.
