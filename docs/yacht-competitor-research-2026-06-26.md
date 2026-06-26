# Yacht Booking Page — Competitor Research & Playbook (2026-06-26)

Research across three clusters to sharpen the MerrySails / GoldenSunset yacht pages and to port the booking logic to **lumayacht** later. Sources fetched/searched: TripAdvisor (full teardowns), Viator, GetYourGuide (403-blocked → docs/teardowns), Click&Boat, GetMyBoat, Boatsetter, Sailo, SamBoat, Borrow A Boat, + Istanbul rivals (SU Yachts, Lotus, BosphorusTour/Velena, Istanbul Yacht Charter, Eureka, Viravira).

---

## 1. The highest-leverage patterns (deduped across all sources)

| # | Pattern | Source | Status for us |
|---|---|---|---|
| 1 | **Pre-set departure time slots** ("Sunset 18:30", "Daytime 11:00") beat free-form time AND beat OTA "Start time: Check availability" | GetMyBoat, Boatsetter | ⚠️ We added a 09:00–23:30 **dropdown** (better than OTA) — could curate popular named slots |
| 2 | **Named duration tiers** (Quarter/Half/Full Day = 2h/4h/8h) | Sailo | ⚠️ We have 2h–8h tabs — could label them |
| 3 | **Selectable option cards before the date** (2h vs 3h, sunset vs day, +transfer) each with group price | Viator "product options", GYG | ◻️ New — partially covered by fleet cards + duration tabs |
| 4 | **Per-GROUP pricing** ("Per group, up to 12 · from €220"), never per-person bait | TripAdvisor, GYG flat-group | ✅ Fixed this session (server perGroup) + copy already says "per yacht" |
| 5 | **3 reassurance lines at the CTA**: free cancellation 48h · reserve-now-pay-later/deposit · "most book X days ahead" | TripAdvisor verbatim | ◻️ New, easy, high-value |
| 6 | **All-inclusive total before commit + "no broker markup / no OTA service fee"** as a selling point | Boatsetter, SamBoat, Borrow A Boat | ◻️ Booking modal shows total; emphasize "no markup" |
| 7 | **Instant confirmation — badge it** (+80% Boatsetter, +20% Click&Boat) | marketplaces | ◻️ We confirm instantly (Neon) — add an "Instant confirmation" badge |
| 8 | **Extras = priced toggles raise AOV** (catering, photographer, transfer) | Boatsetter, GetMyBoat | ⚠️ Operator chose meal-priced + rest "on request" (showcased 14 services). Note: pricing more extras would lift AOV if ever wanted |
| 9 | **Reviews surfaced HIGH (top 3–5 above booking) + operator replies on every review** = E-E-A-T | TripAdvisor | ◻️ Surface a top-3 strip higher; captain replies |
| 10 | **Trust stacked at top**: TÜRSAB # + verification link, "since 2001 / 50,000+", secure payment, weather-cancellation guarantee | Boatsetter Trip Protection + Istanbul gap | ✅ SocialProofBadges has 4.9/TÜRSAB/50k/3-min — add weather-cancel guarantee |
| 11 | **WhatsApp concierge as a CO-EQUAL CTA + speed-to-human promise** (replies <1h convert 7×) | Report 3 | ✅ WhatsApp CTA + "3-min reply" — make the dual CTA explicit |
| 12 | **Sticky booking bar** (desktop right-rail + mobile bottom) carrying price + CTA | all marketplaces | ◻️ Add a price-anchored sticky on yacht detail |
| 13 | **Cancellation policy as ONE line near CTA** + link to full | TripAdvisor, GYG | ◻️ New, easy |
| 14 | **Low deposit / pay-later** (15% down, installments) | Borrow A Boat, Sailo | ◻️ Strategic (bigger change) |
| 15 | **Capacity in the H1** ("Private yacht, up to 12 guests") | all 3 OTAs | ✅ FleetDetailContent shows capacity label |

## 2. AVOID (OTA patterns that hurt a direct brand)
- **Per-person "from" pricing on a private product** (Viator `fromPrice`) — feels like bait. Quote the group total.
- **Fake urgency** ("Likely to sell out" demand-forecast w/ liability disclaimer). Only use real booking-system scarcity.
- **OTA middleman framing** ("Lowest Price Guarantee", combined 3rd-party reviews). Our edge = book direct, no markup, captain contactable, TÜRSAB A #14316.
- **Hiding times behind "Check availability"** — that's an OTA inventory-sync limitation, not UX.

## 3. Canonical section order (synthesised)
Hero gallery (image-first, 6–10 photos) → **H1 with capacity** + rating/review count → **3 reassurance lines** → **option/duration cards with group "from €X"** → **sticky booking widget** (option → date → real time slot → guests → total) → highlights → included/excluded (✓/✗) → route → meeting & pickup (map + surcharge inline) → cancellation (1 line + link) → reviews (top-3 high, full list + captain replies) → FAQ → other charters. Sticky right-rail (desktop) + sticky bottom "Check dates & price" bar (mobile).

## 4. Istanbul competitive white-space (what we can OWN)
1. **NO direct Istanbul rival has live availability + instant price + instant confirm** — only the aggregator Viravira. Our Neon booking flow IS this. **Biggest moat.**
2. Rivals miss **TÜRSAB license display** (SU Yachts 16yrs, IYC = none), **on-page reviews** (IYC zero), **rich spec cards** (only Lotus shows length; Viravira shows year/cabins). We have these.
3. **EUR-primary** for international tourists (SU=TRY-only, Eureka=USD-only, BosphorusTour mixes). We're correct.
4. BosphorusTour **hides charter price entirely** ("On Request"); we show transparent hourly per-yacht.
- Operator scores: Lotus 8/10 (best direct rival), Viravira 9/10 (aggregator — study, don't beat head-on), BosphorusTour 5/10 (dated ©2004–2021).

## 5. lumayacht port checklist (DO LATER — operator: "en son")
Apply the same logic to `/Users/resat/Desktop/lumayacht` once MerrySails/GS land:
- per-GROUP pricing + server fleet+hours pricing (the `priceMode:"perGroup"` + `fleetSlug/charterHours` snapshot fix)
- per-person add-on detection regex (`/(?:\/\s*|per\s+)(?:person|guest)/i`)
- product-first hub (fleet up top, Reserve→#fleet)
- start-time picker (09:00–23:30) on the per-boat flow
- request-only extras + service showcase + localized note
- mobile overflow guard + sticky price CTA
- 3 reassurance lines + instant-confirm badge
Lumayacht is agency-model (no boat names) → adapt the fleet cards to class-based (already its pattern per project memory).
