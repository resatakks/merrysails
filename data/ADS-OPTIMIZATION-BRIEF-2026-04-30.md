# Google Ads Optimization Brief — merrysails.com

**Date:** 2026-04-30
**Daily budget:** ₺1000 (≈ $32)
**Backlink-aligned bid boost:** +30% on the 6 priority URLs (see `BACKLINK-URLS.md`)

## Budget Allocation (₺1000/day)

| Campaign | Daily Budget | Geo Target | Lang | Goal |
|----------|-------------:|------------|------|------|
| EN — UK + tourists in TR | ₺600 | UK + on-arrival in TR (loc 2792 EN audiences, IP geos GB+US+AU+CA) | English | Direct conversion |
| DE — Germany + AT + CH | ₺200 | DE, AT, CH (DACH) | German | Top-of-funnel + conversion |
| US — premium yacht charter | ₺200 | US metros (NY, LA, SF, MIA) | English | Premium charter inquiry |

> Rationale: 60% of revenue currently comes from UK + on-arrival tourists. DE is a strategic
> growth market (DE pages just shipped). US gets premium-charter spend only because CPMs are
> high but ROAS is positive on private full-day charters.

## Backlink-URL Bid Boost (+30%)

For every keyword whose **landing page** is one of the 6 priority URLs in `BACKLINK-URLS.md`,
apply a +30% bid adjustment via portfolio bid strategy override:

- `https://merrysails.com` → kw cluster: bosphorus cruise istanbul, yacht charter istanbul, private bosphorus cruise, boat tour istanbul
- `/cruises/bosphorus-sunset-cruise` → sunset cruise istanbul, bosphorus sunset cruise
- `/istanbul-dinner-cruise` → istanbul dinner cruise, bosphorus dinner cruise, yemekli boğaz turu
- `/de` → bosporus kreuzfahrt istanbul, romantische bootsfahrt istanbul
- `/de/cruises/bosphorus-sunset-cruise` → bosporus sonnenuntergangsfahrt istanbul
- `/de/istanbul-dinner-cruise` → istanbul dinner kreuzfahrt

Why: paid traffic boosts CTR and dwell time on the exact URLs we're trying to rank,
which feeds positive engagement signals back to Search.

## Negative Keywords (apply at account level)

```
free
cheap
diy
job
jobs
salary
career
ferry
public ferry
sehir hatlari
şehir hatları
captain license
yacht for sale
yacht sale
buy yacht
used yacht
boat insurance
boat license
sailing course
sailing lessons
şikayet
complaint
refund
iptal
cancellation policy
how to drive
youtube
wikipedia
reddit
```

## Ad-group Structure (EN UK + tourists)

1. **AG_Bosphorus_Cruise** → bosphorus cruise istanbul, bosphorus boat tour, bosphorus cruise, private bosphorus cruise. LP `/`.
2. **AG_Sunset** → bosphorus sunset cruise, sunset cruise istanbul, sunset yacht istanbul. LP `/cruises/bosphorus-sunset-cruise`.
3. **AG_Dinner** → istanbul dinner cruise, bosphorus dinner cruise, dinner yacht istanbul. LP `/istanbul-dinner-cruise`.
4. **AG_Yacht_Charter** → yacht charter istanbul, private yacht istanbul, luxury yacht charter istanbul. LP `/`.

## Ad-group Structure (DE)

1. **AG_DE_Kreuzfahrt** → bosporus kreuzfahrt istanbul, bosporus kreuzfahrt. LP `/de`.
2. **AG_DE_Sonnenuntergang** → bosporus sonnenuntergangsfahrt istanbul, romantische bootsfahrt istanbul. LP `/de/cruises/bosphorus-sunset-cruise`.
3. **AG_DE_Dinner** → istanbul dinner kreuzfahrt, dinner kreuzfahrt bosporus. LP `/de/istanbul-dinner-cruise`.

## Ad-group Structure (US premium)

1. **AG_US_Luxury_Charter** → luxury yacht charter istanbul, private full day yacht istanbul, exclusive bosphorus yacht. LP `/`.

## RSA Headlines & Descriptions (templates)

EN headlines (15):
1. Private Bosphorus Cruise — Sunset Yacht
2. Istanbul Dinner Cruise on a Yacht
3. Luxury Yacht Charter — Istanbul
4. Bosphorus Sunset Cruise from $99
5. Skip the Crowds — Private Yacht
6. Bosphorus Cruise — Free Cancellation
7. Istanbul Yacht Tour — All Inclusive
8. Sunset on the Bosphorus — Book Now
9. Private Yacht Up to 12 Guests
10. Romantic Bosphorus Dinner Cruise
11. Same-Day Booking Available
12. 5-Star Reviewed Yacht Charter
13. Departing from Bebek & Beşiktaş
14. Captain + Crew Included
15. Custom Routes — You Choose

DE headlines (15) — keep "ş, ç, ğ, ı, ö, ü" correct:
1. Private Bosporus Kreuzfahrt
2. Istanbul Dinner Kreuzfahrt
3. Luxus Yacht Charter Istanbul
4. Bosporus Sonnenuntergangsfahrt
5. Romantische Bootsfahrt Istanbul
6. Bosporus Yacht ab 99 €
7. Privatyacht bis 12 Gäste
8. Bosporus Kreuzfahrt mit Abendessen
9. Kostenlose Stornierung
10. Same-Day Buchung möglich
11. 5-Sterne Bewertungen
12. Abfahrt Bebek & Beşiktaş
13. Kapitän + Crew inklusive
14. Individuelle Routen
15. Direkt buchen — keine Provision

## Sitelinks (4 per campaign)

- Sunset Cruise → /cruises/bosphorus-sunset-cruise
- Dinner Cruise → /istanbul-dinner-cruise
- Private Charter → /
- Reviews → /reviews (or homepage testimonial section)

## Bid Strategy

- Start: tCPA at $25 EN, €30 DE, $40 US premium.
- After 14 days + ≥30 conversions/campaign → switch to tROAS 300%.
- Quality Score floor: pause any keyword with QS < 5 after 100 impressions.

## Daily Monitoring (existing crons)

- `/api/google-ads/safety-check` → every 2h (kill-switch on overspend)
- `/api/google-ads/budget-review` → Monday 06:00 UTC
- New: `/api/seo/rankings` → daily 07:00 UTC (correlates ad spend ↔ organic rank gain)

## Pending

- Build conversion goal "outbound_phone_click" + "whatsapp_click" in GTM
- Add UTMs: `utm_source=google&utm_medium=cpc&utm_campaign={campaign}&utm_content={url}`
- Test 2 RSA variants per ad-group; pause loser after 200 impressions diff
