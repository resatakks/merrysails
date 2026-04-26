# MerrySails — Ads Runbook

**Purpose:** Exact step-by-step execution order for launching MerrySails Google Ads with no skipped setup.
**Launch model:** 3 Search campaigns
**Budget:** 3,000 TL total
**Primary conversion:** `purchase`

---

## 1. Before Touching Campaigns

Do these first.

### 1.1 Confirm measurement

Verify in GA4:

- `page_view` is arriving
- `purchase` exists
- `begin_checkout` exists
- `phone_click` exists
- `whatsapp_click` exists

If `purchase` is not visible, do not launch ads yet.

### 1.2 Confirm site truth

Final offer truths:

- Sunset from `€34`
- Dinner from `€30`
- Private Yacht from `€280`
- `Free Shuttle` only for Dinner and only with central-area qualification

### 1.3 Confirm final launch structure

Use these 3 campaigns:

1. `Search | EN | Sunset | Istanbul Presence`
2. `Search | EN | Dinner | Istanbul Presence`
3. `Search | EN | Private Yacht | Istanbul Presence`

Do not collapse this into one generic campaign.

---

## 2. Account-Level Setup

### 2.1 Conversion action choice

Use:

- `purchase` as primary optimization conversion

Keep as secondary only:

- `phone_click`
- `whatsapp_click`
- `contact_submit_success`
- `begin_checkout`
- `generate_lead`

### 2.2 Auto-tagging

- confirm it is on

### 2.3 Recommendations / automations

Turn off anything that would:

- auto-add broad match
- auto-expand to display
- auto-change LP logic
- auto-apply suggestions without review

### 2.4 Search Partners

- keep off

---

## 3. Location Strategy In Google Ads

### 3.1 Targeting mode

Set:

- people in or regularly in targeted locations

Do not use:

- people who show interest in targeted locations

### 3.2 City scope

Use Istanbul-focused targeting.

### 3.3 Internal geo priority

This is the district logic we will optimize toward after launch:

- Sultanahmet
- Sirkeci
- Taksim
- Beyoglu
- Karakoy
- Besiktas
- Harbiye
- Fatih

For yacht, also watch:

- Ortakoy
- Bebek
- Arnavutkoy
- Sisli
- Nisantasi
- Levent

---

## 4. Campaign Creation Order

Create campaigns in this order:

1. Sunset
2. Dinner
3. Private Yacht

Why:

- Sunset and Dinner are budget priorities
- Yacht is smaller and easier to control once the shared campaigns are set

---

## 5. Campaign 1 — Sunset

### 5.1 Create campaign

Name:

- `Search | EN | Sunset | Istanbul Presence`

Daily budget:

- use the TL equivalent of the planned Sunset allocation
- current working share: `1,250 TL`

Bidding:

- start conservatively
- if the account is new and conversion history is thin:
  - Maximize Clicks with CPC discipline or Manual CPC
- switch only later when `purchase` data is real

### 5.2 Add ad groups

Ad groups:

1. `Core Sunset`
2. `Sunset Landmark Intent`
3. `Sunset With Wine`

### 5.3 Add keywords

Use only the exact + phrase sets from:

- [MERRYSAILS-GOOGLE-ADS-LAUNCH-PACKAGE.md](/Users/resat/Desktop/merrysails/docs/ads/MERRYSAILS-GOOGLE-ADS-LAUNCH-PACKAGE.md)

### 5.4 Add negatives

At minimum:

- dinner
- dinner cruise
- private yacht
- yacht charter
- boat rental
- proposal
- wedding
- corporate
- public ferry

### 5.5 Add ads

Use the Sunset RSA set from the launch package.

### 5.6 Add assets

Use:

- Sunset Cruise From €34
- Dinner Cruise From €30
- Yacht Charter From €280
- Contact MerrySails

Callouts:

- Reserve Direct
- From EUR 34
- Live Guide
- Shared Luxury Yacht

### 5.7 Final URL check

All core sunset ad groups must point to:

- `https://merrysails.com/cruises/bosphorus-sunset-cruise`

---

## 6. Campaign 2 — Dinner

### 6.1 Create campaign

Name:

- `Search | EN | Dinner | Istanbul Presence`

Daily budget:

- current working share: `1,250 TL`

### 6.2 Add ad groups

Ad groups:

1. `Core Dinner`
2. `Dinner Show / VIP`
3. `Pickup / Kabatas`

### 6.3 Add keywords

Use the exact + phrase keyword sets from the launch package.

### 6.4 Add negatives

At minimum:

- sunset
- sunset cruise
- private yacht
- yacht charter
- boat rental
- proposal
- wedding yacht
- public ferry

### 6.5 Add ads

Use the Dinner RSA set from the launch package.

### 6.6 Add assets

Allowed Dinner callouts:

- From EUR 30
- Free Shuttle
- VIP Table Options
- Turkish Show
- Reserve Direct

### 6.7 Transfer wording control

Allowed:

- Free Shuttle From Central Areas
- Hotel Pickup From Eligible Central Zones
- Central Istanbul Pickup Support

Not allowed:

- Free Shuttle All Istanbul
- Free Hotel Pickup Everywhere
- Pickup For Asian Side

### 6.8 Final URL check

Dinner ad groups should point to:

- `https://merrysails.com/istanbul-dinner-cruise`

---

## 7. Campaign 3 — Private Yacht

### 7.1 Create campaign

Name:

- `Search | EN | Private Yacht | Istanbul Presence`

Daily budget:

- current working share: `500 TL`

### 7.2 Add ad groups

Ad groups:

1. `Yacht Charter Core`
2. `Boat Rental`
3. `Proposal / Event Intent`

### 7.3 Add keywords

Use the exact + phrase sets from the launch package.

### 7.4 Add negatives

At minimum:

- shared cruise
- dinner cruise ticket
- sunset cruise ticket
- cheap ferry
- public boat
- free shuttle

### 7.5 Add ads

Use the Private Yacht RSA set from the launch package.

### 7.6 Add assets

Use:

- Yacht Charter From €280
- Boat Rental Istanbul
- Proposal Yacht Rental
- Corporate Events

### 7.7 Final URL check

Use the correct LP by ad group:

- core yacht → `/yacht-charter-istanbul`
- boat rental → `/boat-rental-istanbul`
- proposal intent → `/proposal-yacht-rental-istanbul`

---

## 8. Ad Asset Rules

### Images to use first

Sunset:

- `/Users/resat/Desktop/merrysails/public/images/sunset1.jpeg`
- `/Users/resat/Desktop/merrysails/public/images/sunset5.jpeg`
- `/Users/resat/Desktop/merrysails/public/images/sunset6.jpeg`

Dinner:

- `/Users/resat/Desktop/merrysails/public/images/dinner-etkinlik-13.jpeg`
- `/Users/resat/Desktop/merrysails/public/images/dinner-etkinlik-4.jpeg`
- `/Users/resat/Desktop/merrysails/public/images/dinner-etkinlik-8.jpeg`
- `/Users/resat/Desktop/merrysails/public/images/vip-menu.jpeg`

### Route hooks to reference in copy

Sunset:

- Maiden's Tower
- Dolmabahce
- Ortakoy
- Rumeli Fortress

Dinner:

- Kabatas
- Bosphorus night skyline
- Turkish show
- VIP tables

Private Yacht:

- Kurucesme / Bosphorus private route
- proposal / birthday / corporate

---

## 9. Pre-Launch QA Checklist

Run this after all 3 campaigns are built but before enabling them.

- [ ] Only exact + phrase match used
- [ ] Search Partners off
- [ ] Presence-only targeting enabled
- [ ] Budgets set correctly
- [ ] Final URLs checked
- [ ] No Sunset ad says free shuttle
- [ ] No Yacht ad says free shuttle
- [ ] Dinner transfer copy is geographically qualified
- [ ] Price headlines match real LP pricing
- [ ] `purchase` is the primary optimization conversion
- [ ] CTA events are visible in GA4

---

## 10. Launch-Day Monitoring

### First 2-4 hours

Watch:

- impressions by campaign
- CTR by ad group
- search terms
- obvious mismatches

### First 24 hours

Watch:

- CPC
- search term quality
- `begin_checkout`
- `phone_click`
- `whatsapp_click`
- any early `purchase`

### Immediate actions allowed

- add negatives
- pause obviously weak ad groups
- tighten duplicate or irrelevant query themes

### Immediate actions not allowed

- broad-match expansion
- random budget doubling
- mixing sunset and dinner messages

---

## 11. Daily Optimization Routine

### Every day in week 1

1. Export or review search terms
2. Add negatives
3. Identify winner exact queries
4. Compare device quality
5. Compare districts / zones
6. Review `purchase`
7. Review support events:
   - `phone_click`
   - `whatsapp_click`
   - `begin_checkout`

### Winner rule

A keyword theme is a “winner” when:

- intent clearly matches LP
- CTR is healthy
- checkout or purchase behavior appears

Then:

- protect it with exact coverage
- improve ad copy around it
- consider budget preference later

### Loser rule

A query is a “loser” when:

- wrong product intent
- public ferry / irrelevant tourist noise
- charter vs shared mismatch
- soft clicks with no downstream behavior

Then:

- add as negative fast

---

## 12. Week-1 Decision Rules

### If Sunset wins faster than Dinner

- keep structure unchanged
- add more exact coverage to sunset winners
- do not steal all Dinner budget too early

### If Dinner CTR is strong but purchase is weak

- inspect transfer wording
- inspect VIP/table messaging
- inspect whether price-led clicks are too bargain-oriented

### If Private Yacht burns spend without quality

- tighten event/proposal terms
- narrow charter language
- pause weak ad groups before increasing budget

---

## 13. After Launch

Once first data comes in:

1. compare campaigns by `purchase`
2. compare support-event quality
3. refine geo focus
4. refine negatives
5. consider brand campaign later

Do not add new complexity until the base 3-campaign system is clean.
