# Google Ads Launch Plan — Luma Yacht + Vesper (2026-06-21)

**Status: PLANNING ONLY.** Nothing here is launched. The operator creates/connects
the accounts, sets the budget, and builds these campaigns later from this doc.
No ad account was touched. No site code in `lumayacht/` or `vesper/` was modified.

This doc lives in the MerrySails repo because MerrySails is the portfolio's ads home —
it keeps the plan out of the way of the agents currently editing the Luma/Vesper site repos.

---

## 0. Brands at a glance (real data, pulled from each site repo)

| | **Vesper** | **Luma Yacht** |
|---|---|---|
| Domain | `vesper.yachts` | `lumayacht.com` |
| Axis (do NOT overlap) | **Bosphorus SUNSET cruise specialist** | **Private YACHT charter + occasions** |
| Core product | Shared sunset sail + private sunset yacht | Private whole-boat charter (sunset/full-day/event) |
| Real prices | Shared **€30 weekday / €34 std** per person; +Wine €35/€40; Private sunset yacht **from €200** | All charters **from €200**, quote-based |
| Pricing model | Per-person (shared only) + "from €200" quote floor (private) | "From €200" quote floor, custom-priced |
| Trust signal | TÜRSAB **A Group #14316**, since **2001**, **50,000+** guests | Same — TÜRSAB **A Group #14316**, since **2001**, **50,000+** guests |
| Phone / WhatsApp | **+90 544 898 98 12** | **+90 544 898 98 12** (shared, operator decision) |
| Email | info@vesper.yachts | info@lumayacht.com |
| Contact channel | **WhatsApp only** (no Telegram in UI) | **WhatsApp only** |
| GBP | None yet (no location extension) | None yet (no location extension) |

**The opportunity:** both are brand-new niche EN-first sites entering SERPs with
**zero paid competitors** on the core sunset/charter terms — cheap CPC, open auction.
OTA-demotion (TripAdvisor/Expedia/Booking down through 2026) is a tailwind for
direct-booking brands. The plan is built to enter cheaply and mine search terms,
not to outspend anyone.

**Axis separation rule (locked):** Vesper bids SUNSET head terms; Luma bids YACHT
CHARTER head terms. **No keyword appears in both accounts.** "Istanbul sunset cruise"
is Vesper-only; "Istanbul yacht charter" is Luma-only. The one fuzzy zone — *private
sunset yacht* — stays with **Vesper** (its sunset specialism); Luma's sunset is sold
only inside its broader "yacht charter / full-day" framing, never as a standalone
"sunset cruise" keyword. This keeps the two accounts from cannibalising each other's
auctions and keeps the portfolio footprint clean.

---

## 1. Account / MCC recommendation (both brands)

- **One top-level MCC**, both Luma and Vesper as **direct children** (no nesting).
  This matches the portfolio MCC architecture already in use (single top-level,
  children direct). If a portfolio MCC already exists, add these two as new children
  rather than spinning up a separate manager.
- **2-Step Verification (2SV) MANDATORY on every MCC user** before linking, per the
  **Google Ads MFA enforcement (Apr 21 2026)** — refresh tokens fail if a child admin
  later enables 2-step without it being set portfolio-wide. Turn on 2SV pre-emptively.
- **Account tier:** **Basic access** (15,000 ops/day, ~2-day review) is the right tier
  for a multi-brand portfolio. Do not request "WayOut" (not a real tier).
- **Currency / time zone:** set each account to the operator's billing reality. Spend
  caps below are given in EUR for clarity; if the account bills in **TRY**, convert at
  the day's rate and **double-check the ad-group/campaign bids are real TRY, not
  EUR-as-TRY** (a sibling brand once shipped €-value numbers into a TRY account and
  every bid sat below the auction floor — sanity-check the first day).
- **Billing:** confirm a valid payment method + (optional but recommended) a
  monthly invoice/credit-line so the account isn't paused mid-test.
- **Conversion tracking:** GA4 is already live on both (gtag direct + GTM + Clarity).
  Import GA4 conversions into Google Ads rather than dropping new Ads tags (§7).

> **OPERATOR DECISION NEEDED:** (a) final daily budget per brand, (b) confirm geo list
> (UK/US/DE/NL proposed, TR excluded), (c) account billing currency (EUR vs TRY).

---

## 2. Campaign structure

### Shared settings (both brands, all campaigns)

| Setting | Value | Why |
|---|---|---|
| **Campaign type** | **Search only** | **NOT PMax for launch.** PMax was paused on MerrySails and "didn't work on KWT" — for a new brand with no conversion history PMax has nothing to learn from and absorbs spend on junk placements/Final-URL pages. Revisit PMax only after each account has 30+ conversions. |
| **Networks** | Search only — **Search Partners OFF, Display Network OFF** | Keep spend on Google Search where intent is highest; partners/display dilute a tiny test budget. |
| **Geo** | **UK, US, Germany, Netherlands** — target by **"Presence: people in or regularly in"** (NOT "interest"). **Exclude Turkey** (these target foreign tourists, not TR domestic). | Matches DataForSEO demand (UK is the biggest EN cruise market; DE/NL secondary). Excluding interest-based avoids TR agencies/locals. |
| **Languages** | **English** (+ German on the DE-facing groups if a DE RSA is added later). Start EN-only. | Sites are EN-first/EN-indexed; don't pay for languages the landing page can't serve. |
| **Ad schedule** | All days; **bias to evenings + weekends** once data exists. Start 24/7, then add an ad-schedule bid adjustment toward 16:00–23:00 local + Fri–Sun after week 1. | Sunset/charter intent peaks when people plan an evening out; refine from search-term/hour data, don't pre-guess hard. |
| **Bidding** | **Maximize Conversions WITH a max-CPC cap** OR **Manual CPC** for the first ~2 weeks. Start manual/capped, switch to a Conversion-value/tCPA strategy only after ≥15–30 conversions. | New accounts have no signal for full automated bidding; a cap stops a €15 click. |
| **Final URL Expansion** | **OFF** (see §8) | Stops Google sending traffic to blog/guide pages instead of the money page. |
| **Device** | All devices; expect **mobile-heavy** tourist traffic. Ensure WhatsApp/Call CTAs are above the fold on mobile LPs (already the brand pattern). | — |
| **Conversion goals** | Account-level conversion set = **generate_lead + whatsapp_click + phone_click** as **Primary**; the rest **Secondary** (§7). | Optimise toward real contact intent, not page views. |

### Budget split (modest test — adjust to the operator's real number)

Proposed total **≈ €20/day across both brands** (≈ €10 each), a sensible starting
test. Scale only when search-term data is clean and cost-per-lead is known.

**Vesper — total ≈ €10/day**

| Campaign | Daily budget | Bidding | Notes |
|---|---|---|---|
| `VES-Search-Shared-Sunset-EN` | **€5/day** | Max Conv, cap ~€1.20 | Lowest-price entry product (€30–34 pp) → highest conversion volume; the workhorse. |
| `VES-Search-Private-Sunset-Yacht-EN` | **€3/day** | Max Conv, cap ~€2.00 | Higher value (from €200), lower volume; quote/WhatsApp leads. |
| `VES-Search-Sunset-Occasions-EN` | **€2/day** | Manual CPC ~€1.50 | Proposal / anniversary / honeymoon — high intent, thin volume. |

**Luma — total ≈ €10/day**

| Campaign | Daily budget | Bidding | Notes |
|---|---|---|---|
| `LUMA-Search-Yacht-Charter-EN` | **€5/day** | Max Conv, cap ~€2.20 | Core "istanbul yacht charter / private yacht rental" — the prize keyword set. |
| `LUMA-Search-Occasion-Charter-EN` | **€3/day** | Max Conv, cap ~€2.00 | Proposal + birthday + corporate + bachelor — bundled, tightly themed ad groups. |
| `LUMA-Search-Full-Day-Charter-EN` | **€2/day** | Manual CPC ~€1.80 | Full/half-day charter intent. |

> Budgets are deliberately small. With **zero paid competitors** on core terms, expected
> CPC is low (DataForSEO EN cruise CPC ~$2.3–2.6; charter likely similar). €10/brand/day
> should buy real click volume. **Raise budget only after** a campaign shows cost-per-lead
> the operator is happy with — don't pre-scale on a guess.

---

## 3. Ad groups + keywords (exact + phrase only — NO broad at launch)

> Match-type convention: `[exact]` and `"phrase"`. No broad/broad-modified at launch —
> mine the search-terms report and *promote* discovered queries to exact instead.

### VESPER

#### Campaign `VES-Search-Shared-Sunset-EN`

**Ad group: Bosphorus Sunset Cruise** → LP `https://vesper.yachts/bosphorus-sunset-cruise`
```
[bosphorus sunset cruise]
[sunset cruise bosphorus]
"bosphorus sunset cruise"
"bosphorus sunset boat tour"
[bosphorus sunset boat tour]
"sunset cruise on the bosphorus"
```

**Ad group: Istanbul Sunset Cruise** → LP `https://vesper.yachts/istanbul-sunset-cruise`
```
[istanbul sunset cruise]
[sunset cruise istanbul]
"istanbul sunset cruise"
"istanbul sunset boat tour"
[istanbul sunset boat trip]
"sunset boat tour istanbul"
```

**Ad group: Shared Sunset Sail** → LP `https://vesper.yachts/shared-sunset-cruise`
```
[shared sunset cruise istanbul]
"sunset sailing istanbul"
[istanbul sunset sailing tour]
"evening cruise istanbul bosphorus"
```

#### Campaign `VES-Search-Private-Sunset-Yacht-EN`

**Ad group: Private Sunset Yacht** → LP `https://vesper.yachts/private-sunset-yacht-istanbul`
```
[private sunset yacht istanbul]
[private sunset cruise istanbul]
"private sunset yacht istanbul"
"private bosphorus sunset cruise"
[private yacht sunset bosphorus]
"rent sunset yacht istanbul"
```

#### Campaign `VES-Search-Sunset-Occasions-EN`

**Ad group: Sunset Proposal** → LP `https://vesper.yachts/sunset-proposal-istanbul`
```
[sunset proposal istanbul]
[marriage proposal yacht istanbul]
"sunset proposal cruise istanbul"
"proposal boat istanbul bosphorus"
```

**Ad group: Anniversary & Honeymoon Sunset** → LP `https://vesper.yachts/anniversary-sunset-istanbul` (anniversary terms) / `https://vesper.yachts/honeymoon-sunset-istanbul` (honeymoon terms — split into two ad groups if you want per-LP control)
```
[anniversary cruise istanbul]
"anniversary sunset cruise istanbul"
[honeymoon cruise istanbul]
"honeymoon sunset cruise istanbul"
"romantic sunset cruise istanbul"
```
*(Optional separate ad group: `sunset-photoshoot-istanbul` → LP `/sunset-photoshoot-istanbul` with `[sunset photoshoot istanbul]`, `"istanbul photoshoot cruise"` — low volume, add only if budget allows.)*

### LUMA YACHT

#### Campaign `LUMA-Search-Yacht-Charter-EN`

**Ad group: Istanbul Yacht Charter** → LP `https://lumayacht.com/yacht-charter-istanbul`
```
[istanbul yacht charter]
[yacht charter istanbul]
"istanbul yacht charter"
"yacht charter istanbul bosphorus"
[bosphorus yacht charter]
"private yacht charter istanbul"
```

**Ad group: Private Yacht Rental** → LP `https://lumayacht.com/yacht-charter-istanbul`
```
[private yacht rental istanbul]
[yacht rental istanbul]
"rent a yacht istanbul"
"private yacht hire istanbul"
[hire yacht istanbul]
"yacht rental bosphorus"
```

#### Campaign `LUMA-Search-Occasion-Charter-EN`

**Ad group: Yacht Proposal** → LP `https://lumayacht.com/proposal-yacht-istanbul`
```
[yacht proposal istanbul]
[proposal yacht istanbul]
"marriage proposal yacht istanbul"
"private proposal boat istanbul"
```

**Ad group: Birthday Yacht** → LP `https://lumayacht.com/birthday-yacht-istanbul`
```
[birthday yacht istanbul]
[birthday boat party istanbul]
"birthday yacht charter istanbul"
"private birthday boat istanbul"
```

**Ad group: Corporate Yacht** → LP `https://lumayacht.com/corporate-yacht-istanbul`
```
[corporate yacht istanbul]
[corporate boat event istanbul]
"corporate yacht charter istanbul"
"company event yacht istanbul"
```

**Ad group: Bachelor / Bachelorette Yacht** → LP `https://lumayacht.com/bachelor-party-yacht-istanbul`
```
[bachelor party yacht istanbul]
[bachelorette yacht istanbul]
"stag party boat istanbul"
"hen party yacht istanbul"
"bachelor party boat istanbul"
```

#### Campaign `LUMA-Search-Full-Day-Charter-EN`

**Ad group: Full-Day Charter** → LP `https://lumayacht.com/full-day-yacht-charter`
```
[full day yacht charter istanbul]
[day yacht charter istanbul]
"full day boat charter istanbul"
"private day cruise istanbul yacht"
[half day yacht charter istanbul]
```

*(Optional later: `sunset-yacht-charter-istanbul` LP exists on Luma, but to honour the
axis-separation rule, keep "sunset" keywords in **Vesper**. Only point Luma's
sunset-charter LP at sitelinks/organic, not paid sunset keywords.)*

---

## 4. Negative keywords

### Shared negative list (apply as a shared library to BOTH accounts)
```
transfer
airport transfer
taxi
taksi
airport
havalimani
shuttle
job
jobs
career
careers
hiring
crew job
salary
free
cheap
cheapest
discount code
coupon
salvage
for sale
buy a yacht
yacht for sale
used yacht
second hand yacht
yacht price new
yacht manufacturer
yacht builder
ferry
public ferry
ferry schedule
ferry ticket
sehir hatlari
vapur
water taxi
how to make
diy
license
captain license
yacht insurance
charter business
how to start
wikipedia
meaning
definition
```

### Vesper-specific negatives (protect the SUNSET account from charter/yacht-ownership intent)
```
yacht charter         # belongs to Luma, keep out of Vesper auctions
buy yacht
charter business
fishing
fishing trip
swimming
party boat           # (re-add as keyword only if Vesper later sells it; not now)
```

### Luma-specific negatives (protect the CHARTER account from low-value sunset/shared intent)
```
shared cruise
shared sunset
sunset cruise         # sunset head terms belong to Vesper
public cruise
dinner cruise         # Luma is charter, not a dinner-cruise product
group tour ticket
per person
cheap cruise
```

> Add to the negative lists weekly from each account's **search-terms report** during
> the first 2 weeks (§9). The biggest budget leak on a new account is irrelevant queries —
> review daily for the first week.

---

## 5. RSA assets (real, honest, price-transparent — brand voice)

> Headlines ≤30 chars, descriptions ≤90 chars. Pin the brand/price headline to position 1
> where noted. No fabricated claims — every line is true to the site.

### VESPER — Shared Sunset (ad group: Bosphorus / Istanbul Sunset Cruise)

**Headlines**
1. Bosphorus Sunset Cruise *(pin H1)*
2. Sunset Sail From €30
3. Golden Hour on the Strait
4. Book Direct, No OTA Fees
5. TÜRSAB Licensed Since 2001
6. Small-Group Sunset Sail
7. 2 Hours of Golden Light
8. WhatsApp a Real Captain
9. 50,000+ Guests Hosted
10. Istanbul Sunset Cruise

**Descriptions**
1. Two hours of golden hour on the Bosphorus. Small group, from €30. Book direct.
2. TÜRSAB-licensed since 2001, 50,000+ guests. No OTA fees — book straight with us.
3. Weekday sail from €30, standard €34. Wine option available. Reserve on WhatsApp.
4. Sunset over two continents. Real captain on WhatsApp — no booking middlemen.

### VESPER — Private Sunset Yacht (ad group: Private Sunset Yacht)

**Headlines**
1. Private Sunset Yacht *(pin H1)*
2. Whole Boat From €200
3. Your Group, Your Evening
4. Crewed Bosphorus Charter
5. TÜRSAB Licensed Since 2001
6. Private Golden-Hour Sail
7. Up to 12, 40, 90 Guests
8. Book Direct, No OTA Fees
9. Quote on WhatsApp
10. Istanbul Private Sunset

**Descriptions**
1. The whole boat, crewed, timed around your evening. From €200. Quote on WhatsApp.
2. Private golden-hour charter on the Bosphorus. TÜRSAB-licensed, 50,000+ guests.
3. Couples to 150 guests — proposals, parties, events. Book direct, no OTA fees.
4. A sleek crewed yacht and the strait to yourselves. From €200. Message a captain.

### VESPER — Sunset Occasions (ad group: Proposal / Anniversary / Honeymoon)

**Headlines**
1. Sunset Proposal Istanbul *(pin H1 for proposal AG)*
2. Private Charter From €200
3. Set Up for the Question
4. Golden Hour, Just You Two
5. Anniversary Sunset Sail
6. Honeymoon on the Bosphorus
7. TÜRSAB Licensed Since 2001
8. Plan It on WhatsApp
9. Book Direct, No OTA Fees
10. Crewed Private Yacht

**Descriptions**
1. A private golden-hour charter, set up for the proposal. From €200. WhatsApp us.
2. Mark the anniversary with the deck to yourselves at sunset. TÜRSAB-licensed.
3. Begin the honeymoon with an intimate private sail. Book direct, no OTA fees.
4. We help plan the moment. Real captain on WhatsApp, 50,000+ guests hosted.

### LUMA — Istanbul Yacht Charter (ad group: Yacht Charter / Private Yacht Rental)

**Headlines**
1. Istanbul Yacht Charter *(pin H1)*
2. Private Yacht From €200
3. Whole Boat, Just Your Group
4. Crewed Bosphorus Charter
5. TÜRSAB Licensed Since 2001
6. Book Direct, No OTA Fees
7. Up to 150 Guests
8. Quote on WhatsApp
9. 50,000+ Guests Hosted
10. Private Yacht Rental

**Descriptions**
1. Private crewed yacht on the Bosphorus, your group only. From €200. Quote on WhatsApp.
2. TÜRSAB-licensed since 2001, 50,000+ guests. Book direct — no OTA fees, no markup.
3. Couples to 150 guests, half or full day, tailored to you. Message us on WhatsApp.
4. The whole boat and a crew that knows the strait. From €200. Reserve direct.

### LUMA — Occasion Charter (ad group: Proposal / Birthday / Corporate / Bachelor)

**Headlines**
1. Private Yacht Proposal *(swap H1 per AG: Birthday / Corporate / Bachelor)*
2. Charter From €200
3. Your Celebration Afloat
4. Crewed, Tailored, Private
5. TÜRSAB Licensed Since 2001
6. Birthdays & Milestones
7. Corporate Boat Events
8. Stag & Hen on the Bosphorus
9. Plan It on WhatsApp
10. Book Direct, No OTA Fees

**Descriptions**
1. Proposals, birthdays, corporate, stag & hen — tailored to your event. From €200.
2. Private crewed yacht for your celebration. TÜRSAB-licensed, 50,000+ guests hosted.
3. We help plan the day. Real team on WhatsApp — book direct, no OTA fees.
4. Whole-boat charter, up to 150 guests. Bosphorus backdrop. Quote on WhatsApp.

### LUMA — Full-Day Charter (ad group: Full-Day Charter)

**Headlines**
1. Full-Day Yacht Charter *(pin H1)*
2. Private Charter From €200
3. A Day on the Strait
4. Half or Full Day, Crewed
5. TÜRSAB Licensed Since 2001
6. Whole Boat, Your Itinerary
7. Book Direct, No OTA Fees
8. Up to 150 Guests
9. Quote on WhatsApp
10. Istanbul Private Day Cruise

**Descriptions**
1. A full or half day on the Bosphorus, your way. Private crewed yacht from €200.
2. Whole boat, your itinerary, swim stops and skyline. TÜRSAB-licensed since 2001.
3. Plan a private day on the water. Book direct on WhatsApp — no OTA fees.
4. Couples to large groups. 50,000+ guests hosted. Quote in minutes on WhatsApp.

> **Voice / honesty checks honoured:** "from €30 / from €200" use the real site prices;
> shared sunset is the only per-person product; everything else is quote-led ("from €200",
> never a fabricated total). TÜRSAB #14316 / since 2001 / 50,000+ guests are the real
> shared trust signals. WhatsApp is the only contact channel (no Telegram).

---

## 6. Extensions (assets)

### Sitelinks — VESPER
| Sitelink | URL |
|---|---|
| Shared Sunset Sail | `https://vesper.yachts/shared-sunset-cruise` |
| Private Sunset Yacht | `https://vesper.yachts/private-sunset-yacht-istanbul` |
| Sunset Proposal | `https://vesper.yachts/sunset-proposal-istanbul` |
| The Fleet | `https://vesper.yachts/fleet` |
| Reviews | `https://vesper.yachts/reviews` |
| Contact (WhatsApp) | `https://vesper.yachts/contact` |

### Sitelinks — LUMA
| Sitelink | URL |
|---|---|
| Yacht Charter | `https://lumayacht.com/yacht-charter-istanbul` |
| Proposals & Celebrations | `https://lumayacht.com/celebrations` |
| Corporate Charter | `https://lumayacht.com/corporate-yacht-istanbul` |
| Full-Day Charter | `https://lumayacht.com/full-day-yacht-charter` |
| The Fleet | `https://lumayacht.com/fleet` |
| Reviews | `https://lumayacht.com/reviews` |

### Callouts (both brands — pick 4–6 per brand)
```
TÜRSAB licensed since 2001
50,000+ guests hosted
Book direct — no OTA fees
Crewed private yacht
WhatsApp a real captain        (Vesper)
WhatsApp our team              (Luma)
From €30 sunset sail           (Vesper only)
From €200 private charter
Up to 150 guests               (Luma) / Couples to 150 guests (Vesper)
```

### Structured snippets
- **Vesper** — header **"Types"**: `Shared Sunset Sail, Private Sunset Yacht, Sunset Proposal, Anniversary, Honeymoon`
- **Luma** — header **"Types"**: `Sunset Charter, Full-Day Charter, Proposal, Birthday, Corporate, Bachelor & Hen, Event Charter`

### Call extension (both brands)
```
+90 544 898 98 12
```
Set to record calls if allowed; schedule it to the same hours as the campaigns.
Map call clicks/calls to the `phone_click` conversion (§7).

### Location extension
**None** — neither brand has a Google Business Profile yet. **Do not add a location
extension or location asset.** When a GBP is created later, link it and add the asset.

---

## 7. Conversion import + bidding-to-event mapping

Both sites already fire GA4 events (gtag direct + GTM + Clarity). **Import the GA4
conversions into Google Ads** (Tools → Conversions → Import → Google Analytics 4) rather
than adding duplicate Ads tags. Confirmed event names in each repo's `analytics.ts`:

| GA4 event | Google Ads role | Counting | Notes |
|---|---|---|---|
| **`generate_lead`** | **Primary** ★ | One | Fires on contact submit + reservation request — the strongest intent signal; optimise toward this. |
| **`whatsapp_click`** | **Primary** ★ | One | The main contact action for this brand (WhatsApp-only). Bid toward it. |
| **`phone_click`** | **Primary** ★ | One | Tie to the call extension too. |
| `reservation_submitted` / `reservation_submit` | Secondary | One | Vesper shared-sunset self-serve booking; useful but generate_lead already covers most. Promote to Primary for Vesper once volume exists. |
| `begin_checkout` | Secondary | One | Mid-funnel; keep as observation, don't bid on it. |
| `select_item` | Secondary | One | Product-card click; observation only. |
| `reserve_click` (Vesper) / `reserve_cta` (Luma) | Secondary | One | CTA click; observation only. |
| `contact_submit` | Secondary | One | Folds into generate_lead — avoid double-counting; if both import, keep generate_lead Primary and contact_submit Secondary. |

**Bidding strategy maps to the Primary set:** `generate_lead + whatsapp_click + phone_click`.
Set these three as the campaign's conversion goals; everything else Secondary
(tracked, not bid toward). This avoids optimising toward a soft page-view event.

**Enhanced Conversions:** turn on **Enhanced Conversions for Leads** — both sites already
hash email/phone/name (SHA-256) in the analytics layer on the MerrySails pattern; confirm
the same first-party fields are passed on Luma/Vesper before relying on it. This recovers
attribution lost to cookieless/iOS traffic and materially improves lead-gen bidding.

**Pre-flight:** before spending, fire one test of each event (book a test slot / click
WhatsApp / click call) and confirm it shows in **GA4 Realtime** AND lands in **Google Ads →
Conversions** as "Recording conversions". Do not enable automated bidding until at least
generate_lead + whatsapp_click are confirmed recording.

---

## 8. Final URL Expansion + landing pages

- **Final URL Expansion = OFF** on every campaign. With it ON, Google can route paid
  clicks to blog/guide/about pages instead of the money page — a known budget leak.
- **Landing pages = the specific money page per ad group**, never the homepage. Exact
  URLs are listed inline in §3; consolidated here:

**Vesper**
| Ad group | Final URL |
|---|---|
| Bosphorus Sunset Cruise | `https://vesper.yachts/bosphorus-sunset-cruise` |
| Istanbul Sunset Cruise | `https://vesper.yachts/istanbul-sunset-cruise` |
| Shared Sunset Sail | `https://vesper.yachts/shared-sunset-cruise` |
| Private Sunset Yacht | `https://vesper.yachts/private-sunset-yacht-istanbul` |
| Sunset Proposal | `https://vesper.yachts/sunset-proposal-istanbul` |
| Anniversary Sunset | `https://vesper.yachts/anniversary-sunset-istanbul` |
| Honeymoon Sunset | `https://vesper.yachts/honeymoon-sunset-istanbul` |

**Luma**
| Ad group | Final URL |
|---|---|
| Istanbul Yacht Charter | `https://lumayacht.com/yacht-charter-istanbul` |
| Private Yacht Rental | `https://lumayacht.com/yacht-charter-istanbul` |
| Yacht Proposal | `https://lumayacht.com/proposal-yacht-istanbul` |
| Birthday Yacht | `https://lumayacht.com/birthday-yacht-istanbul` |
| Corporate Yacht | `https://lumayacht.com/corporate-yacht-istanbul` |
| Bachelor / Hen Yacht | `https://lumayacht.com/bachelor-party-yacht-istanbul` |
| Full-Day Charter | `https://lumayacht.com/full-day-yacht-charter` |

- **Tracking template:** append UTMs so GA4 attributes paid traffic cleanly, e.g.
  `?utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_content={adgroupid}&gclid={gclid}`
  (or set a final-URL suffix with `gclid` if auto-tagging is on — confirm auto-tagging is ON).
- **LP readiness gate:** confirm each money page is **indexable/live, has the WhatsApp +
  Call CTA above the fold on mobile**, and shows the real "from €X" price before sending
  paid traffic. (Both sites are EN-indexed-only by the locale rule — paid traffic should
  only hit EN money pages.)

---

## 9. Launch checklist + first-2-week watch list

### Pre-launch checklist (do in order — nothing spends until the last box)
- [ ] MCC ready; Luma + Vesper added as **direct children**; **2SV on all users**.
- [ ] Account billing currency confirmed (EUR vs TRY) + payment method valid.
- [ ] GA4 conversions imported; **generate_lead + whatsapp_click + phone_click = Primary**, rest Secondary.
- [ ] Enhanced Conversions for Leads enabled + first-party hashing confirmed on both sites.
- [ ] Test-fire each Primary event → confirmed in GA4 Realtime **and** Google Ads "Recording conversions".
- [ ] Campaigns built (Search only; Partners + Display OFF).
- [ ] Geo = UK/US/DE/NL, **"presence" targeting**, **Turkey excluded**.
- [ ] Language = English. Ad schedule = all days (refine later).
- [ ] Bidding = Manual CPC or Max Conv **with cap** (per §2 table).
- [ ] **Final URL Expansion = OFF** on every campaign.
- [ ] Ad groups + exact/phrase keywords loaded (no broad).
- [ ] Shared + per-brand negative lists applied.
- [ ] RSAs in (≥8 headlines, ≥4 descriptions; brand/price H1 pinned).
- [ ] Sitelinks, callouts, structured snippets, **call extension (+90 544 898 98 12)** added.
- [ ] **No location extension** (no GBP yet).
- [ ] Final URLs point to the money pages in §8 (not homepage); UTMs/auto-tagging set.
- [ ] Daily budget set to the operator's confirmed number.

### First 48 hours
- Check **search-terms report twice daily** — add junk queries as negatives immediately
  (this is where a new account leaks money). Watch for: TR-language queries (geo leak),
  "for sale / used / job / ferry" intent, and cross-brand terms (sunset showing up in Luma
  or charter showing up in Vesper → tighten negatives).
- Confirm impressions are actually serving on the **exact** keywords; if zero impressions,
  the bid is below floor — raise the cap (and re-check the EUR-vs-TRY bid sanity issue).
- Verify clicks land on the right LP and conversions are still recording.

### Week 1–2 watch list
| Watch | Cadence | Action threshold |
|---|---|---|
| Search-terms mining | Daily (wk1), every 2 days (wk2) | Promote good queries → exact; bury junk → negatives. |
| CPC sanity | Daily | If avg CPC > €3 with no conversions, lower cap / pause the keyword. |
| Cost-per-lead by campaign | From day 3 | Identify the cheapest-lead campaign; shift budget toward it. |
| Impression share lost (budget) | Day 5+ | If a converting campaign is budget-capped, that's the first place to scale. |
| Wasted spend on non-converters | Day 7 | Pause ad groups with spend > ~€10 and 0 leads pending more data. |
| LP behaviour (Clarity) | Day 3+ | Check rage-clicks / dead CTAs on paid landing sessions; fix LP, not the ad. |

### When to consider scaling / changing strategy
- **Scale a campaign** only once it shows a stable, acceptable **cost-per-lead** AND is
  losing impression share to budget (not to rank). Raise that one campaign's budget 20–30%,
  re-evaluate after 3–4 days.
- **Switch from Manual/capped → Maximize Conversions (uncapped) or tCPA** only after the
  account has **≥15–30 conversions** in ~30 days, so the algorithm has signal.
- **Optimise toward:** start with `whatsapp_click + phone_click` (highest volume contact
  events for these brands) for early signal, then shift the bid emphasis to `generate_lead`
  once it accumulates enough volume — it's the cleaner intent signal.
- **Revisit PMax** only after Search proves the unit economics and each account has 30+
  conversions — and even then with **Final URL Expansion OFF / page-feed restricted** and
  brand exclusions, given the sibling-brand PMax failures.
- **Add a German RSA / DE-language layer** only if the DE geo is delivering leads and the
  LP can serve German (sites are EN-first today).

---

## 10. Open operator decisions (flagged)
1. **Final daily budget** per brand (plan assumes ≈ €10/brand/day; adjust the §2 split proportionally).
2. **Geo confirmation** — UK/US/DE/NL proposed, **TR excluded**. Add/remove markets?
3. **Billing currency** (EUR vs TRY) — drives the bid-floor sanity check.
4. **Promote `reservation_submitted` to Primary for Vesper?** (it has a real self-serve
   shared-sunset booking; Luma is request-only, so generate_lead stays Vesper+Luma primary).
5. Whether to run a **German-language ad group** now or wait for DE lead data.

---

*Prepared 2026-06-21. Planning artifact only — no account created, no campaign launched,
no Luma/Vesper site code modified. Prices, URLs, phone, and trust signals verified against
the `vesper/` and `lumayacht/` repos on this date.*
