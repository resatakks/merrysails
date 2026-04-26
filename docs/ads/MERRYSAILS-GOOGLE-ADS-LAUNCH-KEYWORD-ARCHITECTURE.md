# MerrySails — Google Ads Launch Keyword Architecture

**Date:** 22 April 2026
**Scope:** Launch-ready Search structure for `Sunset`, `Dinner`, `Yacht`, and `Brand` campaigns.
**Goal:** Make the next Ads session executable without re-planning keyword buckets or cross-campaign negatives.

---

## 1. Launch Rules

- Launch as **Search-first** with high-control keyword matching.
- Start with **phrase match + exact match** only.
- Keep **Search Partners off** at launch.
- Use **presence-only** location targeting for Istanbul.
- Keep the campaigns separate by product intent:
  - `Sunset` = shared sunset cruise
  - `Dinner` = shared dinner cruise
  - `Yacht` = private yacht charter / private boat rental
  - `Brand` = MerrySails / Merry Tourism protection
- Do not mix shared-ticket intent and private-charter intent inside the same campaign.

---

## 2. Campaign Naming

- `Search | EN | Sunset | Istanbul Presence`
- `Search | EN | Dinner | Istanbul Presence`
- `Search | EN | Yacht | Istanbul Presence`
- `Search | EN | Brand | Istanbul Presence`

If a later foreign-intent test is opened, keep it separate:

- `Search | EN | Yacht | Foreign Intent Test`

---

## 3. Landing Page Map

| Campaign | Primary landing page | Notes |
|---|---|---|
| Sunset | `/cruises/bosphorus-sunset-cruise` | Shared sunset only |
| Dinner | `/istanbul-dinner-cruise` | Shared dinner only |
| Yacht | `/yacht-charter-istanbul` | Use `/boat-rental-istanbul` as a supporting sitelink, not the primary LP |
| Brand | Best-fit destination by query | Use exact page for branded product terms |

Supporting sitelinks for all relevant campaigns:

- `/meeting-points/bosphorus-sunset-cruise`
- `/meeting-points/bosphorus-dinner-cruise`
- `/bosphorus-cruise`
- `/contact`

---

## 4. Sunset Campaign

### 4.1 Ad Group: Core Sunset Cruise

**Primary intent:** Shared sunset cruise on the Bosphorus.

**Phrase match**

- `"bosphorus sunset cruise"`
- `"sunset cruise istanbul"`
- `"istanbul sunset cruise"`
- `"bosphorus sunset boat tour"`
- `"bosphorus sunset yacht cruise"`
- `"sunset bosphorus cruise"`

**Exact match**

- `[bosphorus sunset cruise]`
- `[sunset cruise istanbul]`
- `[istanbul sunset cruise]`
- `[bosphorus sunset boat tour]`

### 4.2 Ad Group: Sunset With Wine / Snacks

**Primary intent:** Users comparing what is included.

**Phrase match**

- `"bosphorus sunset cruise with wine"`
- `"sunset cruise with wine istanbul"`
- `"bosphorus sunset cruise with snacks"`
- `"istanbul sunset yacht cruise with wine"`

**Exact match**

- `[bosphorus sunset cruise with wine]`
- `[sunset cruise with wine istanbul]`

### 4.3 Ad Group: Sunset Location Modifiers

**Primary intent:** Users searching from tourist-heavy districts or near the boarding area.

**Phrase match**

- `"sunset cruise karakoy"`
- `"bosphorus sunset cruise karakoy"`
- `"sunset cruise kabatas"`
- `"sunset cruise taksim"`
- `"sunset cruise sultanahmet"`
- `"sunset cruise sirkeci"`
- `"sunset cruise besiktas"`
- `"bosphorus cruise galata"`

**Exact match**

- `[sunset cruise karakoy]`
- `[bosphorus sunset cruise karakoy]`
- `[sunset cruise taksim]`
- `[sunset cruise sultanahmet]`

### 4.4 Ad Group: Sunset Tour / Boat / Yacht Variants

**Primary intent:** Query wording varies, but the product is still a shared sunset cruise.

**Phrase match**

- `"istanbul sunset boat trip"`
- `"bosphorus sunset tour"`
- `"istanbul sunset boat tour"`
- `"bosphorus evening cruise sunset"`

**Exact match**

- `[bosphorus sunset tour]`
- `[istanbul sunset boat tour]`

### 4.5 Sunset Campaign Negatives

**Campaign negatives**

- `dinner`
- `dinner cruise`
- `night show`
- `turkish night`
- `buffet`
- `vip table`
- `private yacht`
- `yacht charter`
- `boat rental`
- `proposal`
- `wedding`
- `corporate`
- `birthday party`

**Watchlist to negative quickly if noisy**

- `free`
- `public ferry`
- `sehir hatlari`
- `ido`
- `dentur`
- `map`
- `timetable`
- `schedule`
- `weather`

---

## 5. Dinner Campaign

### 5.1 Ad Group: Core Dinner Cruise

**Primary intent:** Shared Bosphorus dinner cruise.

**Phrase match**

- `"istanbul dinner cruise"`
- `"bosphorus dinner cruise"`
- `"dinner cruise istanbul"`
- `"bosphorus night cruise dinner"`
- `"istanbul bosphorus dinner cruise"`
- `"night cruise istanbul dinner"`

**Exact match**

- `[istanbul dinner cruise]`
- `[bosphorus dinner cruise]`
- `[dinner cruise istanbul]`
- `[istanbul bosphorus dinner cruise]`

### 5.2 Ad Group: Dinner Show / Entertainment

**Primary intent:** Users explicitly wanting the classic tourist dinner-show format.

**Phrase match**

- `"bosphorus dinner cruise with show"`
- `"istanbul dinner cruise with show"`
- `"bosphorus dinner cruise turkish night"`
- `"dinner cruise with belly dance istanbul"`
- `"night cruise with dinner and show istanbul"`

**Exact match**

- `[bosphorus dinner cruise with show]`
- `[istanbul dinner cruise with show]`
- `[bosphorus dinner cruise turkish night]`

### 5.3 Ad Group: Dinner Pickup / Central Hotels

**Primary intent:** Users looking for transfer convenience from tourist zones.

**Phrase match**

- `"dinner cruise with pickup istanbul"`
- `"bosphorus dinner cruise hotel pickup"`
- `"istanbul dinner cruise hotel pickup"`
- `"dinner cruise taksim"`
- `"dinner cruise sultanahmet"`
- `"dinner cruise sirkeci"`
- `"dinner cruise karakoy"`

**Exact match**

- `[dinner cruise with pickup istanbul]`
- `[bosphorus dinner cruise hotel pickup]`
- `[dinner cruise taksim]`
- `[dinner cruise sultanahmet]`

### 5.4 Ad Group: Dinner Boarding Point / Kabatas

**Primary intent:** Users searching around the port area or boarding zone.

**Phrase match**

- `"dinner cruise kabatas"`
- `"kabatas dinner cruise"`
- `"bosphorus dinner cruise kabatas"`
- `"kabatas night cruise istanbul"`

**Exact match**

- `[dinner cruise kabatas]`
- `[bosphorus dinner cruise kabatas]`

### 5.5 Dinner Campaign Negatives

**Campaign negatives**

- `sunset`
- `sunset cruise`
- `yacht charter`
- `private yacht`
- `boat rental`
- `private boat`
- `proposal`
- `wedding`
- `corporate event`
- `hourly rental`

**Watchlist to negative quickly if noisy**

- `menu pdf`
- `restaurant`
- `ferry`
- `public boat`
- `cheap ferry`
- `jobs`
- `career`

---

## 6. Yacht Campaign

### 6.1 Ad Group: Yacht Charter Core

**Primary intent:** Private Bosphorus yacht charter.

**Phrase match**

- `"yacht charter istanbul"`
- `"bosphorus yacht charter"`
- `"private yacht istanbul"`
- `"private bosphorus yacht"`
- `"istanbul yacht hire"`
- `"private yacht charter istanbul"`

**Exact match**

- `[yacht charter istanbul]`
- `[bosphorus yacht charter]`
- `[private yacht istanbul]`
- `[private yacht charter istanbul]`

### 6.2 Ad Group: Boat Rental / Private Boat

**Primary intent:** Same commercial intent, different wording.

**Phrase match**

- `"boat rental istanbul"`
- `"private boat istanbul"`
- `"private boat rental istanbul"`
- `"bosphorus boat rental"`
- `"boat hire istanbul"`
- `"private boat bosphorus"`

**Exact match**

- `[boat rental istanbul]`
- `[private boat istanbul]`
- `[bosphorus boat rental]`
- `[private boat bosphorus]`

### 6.3 Ad Group: Luxury / Premium Yacht

**Primary intent:** Higher-ticket guests comparing comfort tier.

**Phrase match**

- `"luxury yacht istanbul"`
- `"luxury yacht charter istanbul"`
- `"private luxury yacht istanbul"`
- `"vip yacht istanbul"`
- `"luxury boat rental istanbul"`

**Exact match**

- `[luxury yacht istanbul]`
- `[luxury yacht charter istanbul]`
- `[private luxury yacht istanbul]`

### 6.4 Ad Group: Yacht Location Modifiers

**Primary intent:** Local area + private yacht queries, especially high-tourist or marina-adjacent.

**Phrase match**

- `"yacht charter besiktas"`
- `"yacht charter kurucesme"`
- `"boat rental besiktas"`
- `"private yacht karakoy"`
- `"yacht charter kabatas"`
- `"private yacht taksim"`

**Exact match**

- `[yacht charter kurucesme]`
- `[yacht charter besiktas]`
- `[boat rental besiktas]`

### 6.5 Ad Group: Sunset / Dinner Private Variants

**Primary intent:** Still private charter, but with sunset or dinner language.

**Phrase match**

- `"private sunset yacht istanbul"`
- `"private dinner yacht istanbul"`
- `"bosphorus private sunset cruise"`
- `"private bosphorus dinner cruise"`
- `"romantic yacht istanbul"`

**Exact match**

- `[private sunset yacht istanbul]`
- `[private dinner yacht istanbul]`
- `[private bosphorus dinner cruise]`

### 6.6 Yacht Campaign Negatives

**Campaign negatives**

- `ticket`
- `tickets`
- `per person`
- `shared cruise`
- `shared boat`
- `dinner show`
- `turkish night`
- `buffet`
- `group table`
- `cheap dinner cruise`

**Watchlist to negative quickly if noisy**

- `for sale`
- `buy yacht`
- `used yacht`
- `captain license`
- `how to rent a boat`
- `jobs`
- `career`

---

## 7. Brand Campaign

### 7.1 Ad Group: MerrySails Brand

**Phrase match**

- `"merrysails"`
- `"merrysails istanbul"`
- `"merrysails bosphorus"`
- `"merrysails cruise"`

**Exact match**

- `[merrysails]`
- `[merrysails istanbul]`
- `[merrysails cruise]`

### 7.2 Ad Group: Merry Tourism / Agency Brand

**Phrase match**

- `"merry tourism"`
- `"merry tourism istanbul"`
- `"merry tourism bosphorus"`

**Exact match**

- `[merry tourism]`
- `[merry tourism istanbul]`

### 7.3 Ad Group: Branded Product Terms

**Phrase match**

- `"merrysails sunset cruise"`
- `"merrysails dinner cruise"`
- `"merrysails yacht charter"`
- `"merry tourism sunset cruise"`

**Exact match**

- `[merrysails sunset cruise]`
- `[merrysails dinner cruise]`
- `[merrysails yacht charter]`

### 7.4 Brand Campaign Negatives

- `jobs`
- `career`
- `address`
- `invoice`
- `reservation id`
- `voucher`
- `cancel reservation`

These can be handled by organic or support flows instead of paid search.

---

## 8. Shared Account-Level Negative Themes

Add these centrally unless a specific future campaign requires them:

- `jobs`
- `career`
- `salary`
- `internship`
- `captain license`
- `for sale`
- `buy`
- `used`
- `second hand`
- `public ferry`
- `ferry timetable`
- `sehir hatlari`
- `ido`
- `dentur`
- `map`
- `weather`
- `free`
- `youtube`
- `tiktok`
- `reddit`

---

## 9. Cross-Campaign Negative Matrix

| Campaign | Negative out |
|---|---|
| Sunset | `dinner`, `night show`, `turkish night`, `yacht charter`, `boat rental`, `private yacht`, `proposal`, `corporate` |
| Dinner | `sunset`, `yacht charter`, `boat rental`, `private yacht`, `proposal`, `hourly rental`, `private boat` |
| Yacht | `ticket`, `shared cruise`, `shared dinner`, `turkish night`, `buffet`, `private table`, `show` |
| Brand | Broad non-brand generic cruise terms unless branded modifier is present |

Use this matrix aggressively. It is more important to keep the traffic clean than to chase every impression.

---

## 10. Terms To Delay Until Search-Term Data Exists

Do **not** launch these on day one unless account history strongly supports them:

- `bosphorus cruise`
- `cruise istanbul`
- `istanbul cruise`
- `boat tour istanbul`
- `things to do in istanbul`
- `istanbul attraction`
- `galataport cruise`
- `maiden's tower cruise`

These are too broad and are likely to bring mixed sightseeing, ferry, OTA, and informational intent.

---

## 11. Build Order For The Next Ads Session

1. Create the four campaigns with the naming above.
2. Add campaign-level negatives before importing keywords.
3. Build ad groups exactly as grouped here.
4. Add phrase match first, then exact match.
5. Add the cross-campaign negatives immediately.
6. Map each campaign to the correct landing page.
7. Draft RSAs based on the ad-group intent, not one generic ad per campaign.
8. After launch, promote only real winners into exact-match expansion.

---

## 12. Notes From Current Market Reality

- Sunset demand is shaped by `wine`, `snacks`, `2 hours`, and easy boarding from central Istanbul.
- Dinner demand is shaped by `pickup`, `Kabatas`, `show`, `private table`, and same-evening convenience.
- Yacht demand is shaped by `private`, `luxury`, `Kurucesme/Besiktas`, and per-yacht pricing logic.
- Brand should stay small and defensive, but it matters once competitors start bidding on branded product combinations.
