# MerrySails 3 Pillar Page — Schema Implementation Plan (REVISED)
_Target: 2026-06-08+ | Validates against `scripts/lint-schema.mjs` | Revised 2026-06-08_

> **Revision note (2026-06-08)** — Previous draft proposed 9 schema types based on
> "AI grounding lift" hypotheses. Subsequent community research (Ahrefs 75k-brand
> study Q1 2026 + Otterly LLM citation study) shows **schema markup has no
> statistically significant correlation with AI citation rates after controlling
> for content quality and link signals.** Verdict consolidated to **4 SHIP types
> + 2 HYGIENE types**, the rest moved to the SKIP REGISTRY at the bottom of this
> doc. Read the SKIP REGISTRY section before re-adding anything that was cut.

---

## How this document is structured
For each pillar page:
1. **Current schema (audit)** — what's there now per project memory + lint rules
2. **Proposed addition / restructure** — concrete JSON-LD blocks, lint-compliant, paste-ready
3. **Internal linking schema** — graph wiring via `@id`, `mentions`, `containedInPlace`, `provider`
4. **Per-page validation checklist**

All JSON-LD blocks below:
- Use lowercase `<script type="application/ld+json">` (server-rendered, NOT Next.js `<Script>` — Illyes 2026 verbatim).
- Use canonical absolute URLs in `@id` to enable cross-block referencing.
- Use `availableLanguage` NOT `inLanguage` on LocalBusiness subtypes (lint S9).
- Include inline `PostalAddress` on every LocalBusiness subtype (lint S10).
- Keep `AggregateRating` only on lint-approved parents: Event / Product / LocalBusiness / Organization / Recipe / Movie / Course / Book / HowTo / Restaurant / TravelAgency / TouristAttraction / FoodEstablishment.
- Never use `["TouristTrip", "Product"]` (lint rule 2).
- Event blocks include all 10 required fields (lint rule 3) and offer fields include validFrom + price + priceCurrency + url + availability (lint rule 4).
- Offer blocks always have `price` (lint S8).

---

## SHIP MATRIX — what we will deploy

| # | Type | Evidence class | Where it goes |
|---|---|---|---|
| 1 | `ImageObject` w/ license fields | Google Images Licensable rich result (verified, on docs) | Hero + gallery images on all 3 pillars |
| 2 | `ReserveAction` (`potentialAction`) | Google agentic-booking forward-looking signal | TravelAgency block + each pillar primary entity |
| 3 | `AggregateRating` | Verified Google review snippet (parent-restricted by lint S1) | Event (dinner) + Product (yacht) + TravelAgency (root) |
| 4 | `TouristTrip` + `Service` combo | Hygiene — already in place, keep as-is | All 3 pillars (primary entity) |
| H1 | `TravelAgency` LocalBusiness subtype | Hygiene — already in place, validates clean | Root layout, shared via `@id` |
| H2 | `BreadcrumbList` | Hygiene — Google rich result, already shipping | All 3 pillars |

That's it. Six total. Three new SHIP items (ImageObject license / ReserveAction
proliferation / AggregateRating relocation/cleanup), three hygiene items already
in production that we're keeping.

---

## Shared constants (define once in `src/lib/schema-ids.ts` or top of root layout)

```ts
export const ORG_ID = "https://merrysails.com/#organization";
export const TRAVEL_AGENCY_ID = "https://merrysails.com/#travelagency";
export const DEPARTURE_PIER_ID = "https://merrysails.com/#kabatas-pier";
export const BOSPHORUS_ID = "https://merrysails.com/#bosphorus-strait";
export const ISTANBUL_CITY_ID = "https://www.wikidata.org/wiki/Q406";
```

---

## Shared TravelAgency block (root layout — referenced by every page via `provider: { "@id": TRAVEL_AGENCY_ID }`)

```json
{
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": "https://merrysails.com/#travelagency",
  "name": "MerrySails",
  "alternateName": "MerrySails Istanbul",
  "url": "https://merrysails.com/",
  "logo": "https://merrysails.com/images/logo.png",
  "image": "https://merrysails.com/images/og/og-default.jpg",
  "telephone": "+90-544-898-98-12",
  "priceRange": "€€",
  "currenciesAccepted": "EUR, USD, TRY",
  "paymentAccepted": "Cash, Credit Card",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Kabataş Cruise Terminal",
    "addressLocality": "Beyoğlu",
    "addressRegion": "Istanbul",
    "postalCode": "34427",
    "addressCountry": "TR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 41.0335,
    "longitude": 28.9913
  },
  "areaServed": [
    { "@type": "City", "name": "Istanbul", "sameAs": "https://www.wikidata.org/wiki/Q406" },
    { "@type": "Country", "name": "Turkey", "sameAs": "https://www.wikidata.org/wiki/Q43" }
  ],
  "availableLanguage": ["English", "Turkish", "German", "French", "Dutch"],
  "knowsLanguage": ["en", "tr", "de", "fr", "nl"],
  "knowsAbout": [
    "Bosphorus cruise",
    "Sunset cruise Istanbul",
    "Dinner cruise Istanbul",
    "Private yacht charter Istanbul",
    "Dolmabahçe Palace",
    "Maiden's Tower",
    "Bosphorus Bridge"
  ],
  "memberOf": {
    "@type": "Organization",
    "name": "TÜRSAB (Association of Turkish Travel Agencies)",
    "url": "https://www.tursab.org.tr/"
  },
  "sameAs": [
    "https://www.instagram.com/merrysailsistanbul/",
    "https://www.facebook.com/merrysails/",
    "https://www.tripadvisor.com/...",
    "https://www.google.com/maps/place/..."
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.88",
    "reviewCount": "312",
    "bestRating": "5",
    "worstRating": "1"
  },
  "potentialAction": {
    "@type": "ReserveAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://merrysails.com/reservation",
      "actionPlatform": [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform"
      ]
    },
    "result": { "@type": "Reservation", "name": "Cruise reservation" }
  }
}
```

> **Lint compliance**: inline PostalAddress ✓ (S10), no `inLanguage` ✓ (S9),
> `aggregateRating` parent is TravelAgency ✓ (S1 approved set).
>
> **Removed from previous draft**: the `hasCredential` /
> `EducationalOccupationalCredential` block (TÜRSAB license). That schema type
> is for academic / professional credentials of a person, not for travel-agency
> licensing — Google validator silently accepts but it carries zero rich-result
> weight and clutters the entity graph. Surface the TÜRSAB license number in
> on-page visible text + footer per regulatory requirement; do not encode it as
> `EducationalOccupationalCredential`. See SKIP REGISTRY entry #6.

---

## Shared `ImageObject` with license metadata (SHIP type #1)

Per Google's Image License Metadata documentation, the Licensable badge in
Google Images attaches when an image carries `license` + `acquireLicensePage`
properties (or is referenced from a `creator` object with the same). The badge
is a verified rich result type with documented impact on image search CTR. This
is the single highest-confidence "new ship" in this revision.

**Pattern**: every hero/gallery image referenced in a pillar page's JSON-LD
should be expressed as an `ImageObject` (not a bare URL string) when the page
graph allows. Where a parent block expects a URL string (e.g. `image: "..."`),
keep the string AND add a separate `ImageObject` block in the page graph
referenced by `@id`.

```json
{
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "@id": "https://merrysails.com/images/bosphorus/hero-1200.jpg#image",
  "contentUrl": "https://merrysails.com/images/bosphorus/hero-1200.jpg",
  "url": "https://merrysails.com/images/bosphorus/hero-1200.jpg",
  "width": 1200,
  "height": 800,
  "caption": "MerrySails public Bosphorus cruise passing Dolmabahçe Palace at golden hour",
  "creator": {
    "@type": "Organization",
    "@id": "https://merrysails.com/#travelagency",
    "name": "MerrySails"
  },
  "copyrightHolder": { "@id": "https://merrysails.com/#travelagency" },
  "copyrightNotice": "© 2026 MerrySails. All rights reserved.",
  "creditText": "MerrySails",
  "license": "https://merrysails.com/image-license",
  "acquireLicensePage": "https://merrysails.com/contact?subject=image-license",
  "representativeOfPage": true
}
```

**Required for the Licensable badge:**
- `license` — URL of the license terms page
- `acquireLicensePage` — URL of where to acquire the right to use

**Strongly recommended** (boosts validator confidence):
- `creator` (Organization or Person)
- `copyrightHolder`
- `copyrightNotice`
- `creditText`

**Operator action**: create two simple pages first (5 minutes):
- `/image-license` — plain text describing license terms (default: editorial / non-commercial only, contact for commercial reuse)
- `/contact?subject=image-license` — existing contact form pre-filled

Once those exist, every page can emit `ImageObject` blocks for its hero + gallery
images and Google can crawl/display the Licensable badge. Estimated reach: ~30
unique images across the 3 pillars + homepage hero.

---

## Shared BoatTerminal + BodyOfWater Place graph (hygiene — keep as-is)

```json
[
  {
    "@context": "https://schema.org",
    "@type": "BoatTerminal",
    "@id": "https://merrysails.com/#kabatas-pier",
    "name": "Kabataş Cruise Terminal",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Beyoğlu",
      "addressRegion": "Istanbul",
      "addressCountry": "TR"
    },
    "geo": { "@type": "GeoCoordinates", "latitude": 41.0335, "longitude": 28.9913 },
    "containedInPlace": { "@id": "https://www.wikidata.org/wiki/Q406" }
  },
  {
    "@context": "https://schema.org",
    "@type": "BodyOfWater",
    "@id": "https://merrysails.com/#bosphorus-strait",
    "name": "Bosphorus Strait",
    "sameAs": "https://www.wikidata.org/wiki/Q83329"
  }
]
```

> **Note**: BoatTerminal as a *Place reference* (not a standalone rich-result
> candidate) is hygiene — used to anchor the `tripOrigin` / `location` graph
> edges on the cruise pages. It does NOT trigger any rich result on its own.
> See SKIP REGISTRY entry #2 for why we are not investing further in BoatTerminal
> as an active SHIP type.

---

## /bosphorus-cruise (6,600/mo TR + EN, KD 42)

**File**: `src/app/bosphorus-cruise/page.tsx`

### Current schema (audit)
- `["TouristTrip", "Service"]` primary block ✓ (keep)
- AggregateOffer attached ✓ (keep)
- Conditional AggregateRating (only emitted if Event sibling present — lint compliant) — **remove** the conditional; this pillar has no Event, rating lives on the TravelAgency root block instead
- FAQPage block at bottom ✓ (keep — AI signal even after rich-result sunset)
- BreadcrumbList ✓ (keep)

### Proposed final schema graph for this page

**Block A — TouristTrip + Service primary** (enriched + ReserveAction added)

```json
{
  "@context": "https://schema.org",
  "@type": ["TouristTrip", "Service"],
  "@id": "https://merrysails.com/bosphorus-cruise#trip",
  "name": "Bosphorus Cruise Istanbul",
  "description": "Daily public Bosphorus cruise from Kabataş Pier — 90-minute scenic route past Dolmabahçe Palace, Maiden's Tower, Rumeli Fortress and the Bosphorus Bridge.",
  "url": "https://merrysails.com/bosphorus-cruise",
  "image": [
    { "@id": "https://merrysails.com/images/bosphorus/hero-1200.jpg#image" },
    { "@id": "https://merrysails.com/images/bosphorus/dolmabahce-1200.jpg#image" },
    { "@id": "https://merrysails.com/images/bosphorus/sunset-1200.jpg#image" }
  ],
  "touristType": ["Cultural tourist", "Family", "Couple", "International tourist"],
  "provider": { "@id": "https://merrysails.com/#travelagency" },
  "serviceType": "Bosphorus sightseeing cruise",
  "areaServed": { "@type": "City", "name": "Istanbul", "sameAs": "https://www.wikidata.org/wiki/Q406" },
  "availableLanguage": ["English", "Turkish", "German", "French", "Dutch"],
  "tripOrigin": { "@id": "https://merrysails.com/#kabatas-pier" },
  "itinerary": {
    "@type": "ItemList",
    "itemListOrder": "ItemListOrderAscending",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "item": { "@type": "TouristAttraction", "name": "Dolmabahçe Palace", "sameAs": "https://www.wikidata.org/wiki/Q252181" } },
      { "@type": "ListItem", "position": 2, "item": { "@type": "TouristAttraction", "name": "Ortaköy Mosque", "sameAs": "https://www.wikidata.org/wiki/Q1259617" } },
      { "@type": "ListItem", "position": 3, "item": { "@type": "TouristAttraction", "name": "Bosphorus Bridge", "sameAs": "https://www.wikidata.org/wiki/Q188929" } },
      { "@type": "ListItem", "position": 4, "item": { "@type": "TouristAttraction", "name": "Rumeli Fortress", "sameAs": "https://www.wikidata.org/wiki/Q372884" } },
      { "@type": "ListItem", "position": 5, "item": { "@type": "TouristAttraction", "name": "Maiden's Tower", "sameAs": "https://www.wikidata.org/wiki/Q748186" } }
    ]
  },
  "subjectOf": { "@id": "https://merrysails.com/#bosphorus-strait" },
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "25",
    "highPrice": "75",
    "priceCurrency": "EUR",
    "offerCount": "3",
    "availability": "https://schema.org/InStock",
    "url": "https://merrysails.com/reservation",
    "offers": [
      {
        "@type": "Offer",
        "name": "Public group cruise — 90 min",
        "price": "25",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock",
        "url": "https://merrysails.com/reservation",
        "validFrom": "2026-01-01"
      },
      {
        "@type": "Offer",
        "name": "Sunset cruise — 90 min",
        "price": "34",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock",
        "url": "https://merrysails.com/cruises/bosphorus-sunset-cruise",
        "validFrom": "2026-01-01"
      },
      {
        "@type": "Offer",
        "name": "Dinner cruise with show — 3 hr",
        "price": "30",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock",
        "url": "https://merrysails.com/istanbul-dinner-cruise",
        "validFrom": "2026-01-01"
      }
    ]
  },
  "potentialAction": {
    "@type": "ReserveAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://merrysails.com/reservation?tour=bosphorus-cruise",
      "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"]
    },
    "result": { "@type": "Reservation", "name": "Bosphorus cruise reservation" }
  }
}
```

> **NO `aggregateRating` on this block** — `["TouristTrip", "Service"]` is NOT
> in the lint-approved parent set. Rating inherits from the TravelAgency root
> block (already declared in shared layout).

**Block B — ImageObject blocks** (one per image referenced in Block A)

Three ImageObject blocks, one per hero/gallery image. Use the shared
ImageObject pattern from the SHIP type #1 section above. The `@id` on each
must match the `@id` referenced from Block A's `image` array.

**Block C — BreadcrumbList**

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://merrysails.com/" },
    { "@type": "ListItem", "position": 2, "name": "Bosphorus Cruise", "item": "https://merrysails.com/bosphorus-cruise" }
  ]
}
```

**Block D — FAQPage** (AI signal only — rich result died 7 May 2026, schema still
weighted in ChatGPT citation per Otterly study)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://merrysails.com/bosphorus-cruise#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does a Bosphorus cruise cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Public group Bosphorus cruise starts at €25 per person for 90 minutes. Sunset cruise €34. Dinner cruise with live show €30 for 3 hours. Private yacht charter from €280/hour."
      }
    },
    {
      "@type": "Question",
      "name": "Where does the Bosphorus cruise depart from?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "All MerrySails Bosphorus cruises depart from Kabataş Cruise Terminal in Beyoğlu, Istanbul (41.0335°N, 28.9913°E). Free pickup from Sultanahmet, Taksim and Karaköy hotels available on request."
      }
    }
  ]
}
```

> **Removed from previous draft**: the `speakable` property on FAQPage.
> See SKIP REGISTRY entry #3.

### Internal linking schema (mainEntity / mentions / about)
- Page-level `mainEntity` (on the WebPage) → `@id` of Block A (the TouristTrip)
- Block A `mentions` → array of attraction `@id`s already declared in itinerary
- Block A `subjectOf` → BodyOfWater (#bosphorus-strait)
- Block A `provider` → TravelAgency (shared block via `@id`)
- Block A `tripOrigin` → BoatTerminal (shared block via `@id`)

---

## /yacht-charter-istanbul (590/mo, KD 42)

**File**: `src/app/yacht-charter-istanbul/page.tsx`

### Current schema (audit)
- `["TouristTrip", "Service"]` block ✓ (keep)
- `touristType` ✓ (keep)
- `AggregateRating 4.9` — currently on `["TouristTrip", "Service"]` parent. **Lint violation S1** — must relocate to a `Product` block per yacht variant (preferred) or inherit from TravelAgency root.
- AggregateOffer ✓ (keep)

### Proposed final schema graph for this page

**Block A — TouristTrip + Service primary** (no `aggregateRating`, ReserveAction kept)

```json
{
  "@context": "https://schema.org",
  "@type": ["TouristTrip", "Service"],
  "@id": "https://merrysails.com/yacht-charter-istanbul#trip",
  "name": "Private Yacht Charter Istanbul",
  "description": "Private motor yacht and gulet charter on the Bosphorus and Sea of Marmara. 8–30 guest capacity. Hourly, half-day and full-day charters with captain and crew.",
  "url": "https://merrysails.com/yacht-charter-istanbul",
  "image": [
    { "@id": "https://merrysails.com/images/yacht/hero-1200.jpg#image" },
    { "@id": "https://merrysails.com/images/yacht/interior-1200.jpg#image" },
    { "@id": "https://merrysails.com/images/yacht/deck-1200.jpg#image" }
  ],
  "touristType": ["Luxury traveler", "Family", "Corporate group", "Couple — celebration", "Wedding party"],
  "provider": { "@id": "https://merrysails.com/#travelagency" },
  "serviceType": "Private yacht charter",
  "areaServed": [
    { "@type": "City", "name": "Istanbul", "sameAs": "https://www.wikidata.org/wiki/Q406" },
    { "@type": "BodyOfWater", "name": "Bosphorus Strait", "sameAs": "https://www.wikidata.org/wiki/Q83329" },
    { "@type": "BodyOfWater", "name": "Sea of Marmara", "sameAs": "https://www.wikidata.org/wiki/Q132680" }
  ],
  "availableLanguage": ["English", "Turkish", "German", "French", "Dutch", "Russian"],
  "tripOrigin": { "@id": "https://merrysails.com/#kabatas-pier" },
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "280",
    "highPrice": "680",
    "priceCurrency": "EUR",
    "offerCount": "6",
    "availability": "https://schema.org/InStock",
    "url": "https://merrysails.com/yacht-charter-istanbul",
    "offers": [
      {
        "@type": "Offer",
        "name": "Motor yacht — up to 12 guests — per hour",
        "price": "280",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock",
        "url": "https://merrysails.com/reservation?tour=yacht-12pax",
        "validFrom": "2026-01-01",
        "eligibleQuantity": { "@type": "QuantitativeValue", "minValue": 2, "unitText": "hours" }
      },
      {
        "@type": "Offer",
        "name": "Motor yacht — up to 20 guests — per hour",
        "price": "420",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock",
        "url": "https://merrysails.com/reservation?tour=yacht-20pax",
        "validFrom": "2026-01-01"
      },
      {
        "@type": "Offer",
        "name": "Gulet — up to 30 guests — per hour",
        "price": "680",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock",
        "url": "https://merrysails.com/reservation?tour=gulet-30pax",
        "validFrom": "2026-01-01"
      }
    ]
  },
  "potentialAction": {
    "@type": "ReserveAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://merrysails.com/reservation?tour=yacht-charter",
      "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"]
    },
    "result": { "@type": "Reservation", "name": "Yacht charter reservation" }
  }
}
```

**Block B — Product per featured yacht (lint S1 compliant parent for `aggregateRating`)**

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://merrysails.com/yacht-charter-istanbul#yacht-aurora",
  "name": "Yacht Aurora — 65ft motor yacht",
  "description": "Twin-engine 65ft motor yacht for up to 12 guests. Air-conditioned salon, sun deck, swim platform. Hourly charter on the Bosphorus.",
  "image": { "@id": "https://merrysails.com/images/fleet/aurora-1200.jpg#image" },
  "brand": { "@type": "Brand", "name": "MerrySails Fleet" },
  "category": "Private yacht charter",
  "offers": {
    "@type": "Offer",
    "@id": "https://merrysails.com/yacht-charter-istanbul#yacht-aurora-offer",
    "name": "Yacht Aurora — per-hour charter",
    "price": "280",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock",
    "url": "https://merrysails.com/reservation?yacht=aurora",
    "validFrom": "2026-01-01",
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "price": "280",
      "priceCurrency": "EUR",
      "unitText": "hour",
      "referenceQuantity": { "@type": "QuantitativeValue", "value": 1, "unitText": "hour" }
    },
    "shippingDetails": { "@type": "OfferShippingDetails", "doesNotShip": true },
    "hasMerchantReturnPolicy": {
      "@type": "MerchantReturnPolicy",
      "applicableCountry": "TR",
      "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
      "returnMethod": "https://schema.org/ReturnByMail",
      "merchantReturnDays": 1
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "84",
    "bestRating": "5",
    "worstRating": "1"
  }
}
```

> **Refund policy note** — assumed default `MerchantReturnFiniteReturnWindow`
> with 1-day window (matches "Free cancel 24h before departure" — see Open
> Question #3). Operator confirm before paste-in.

**Block C — BreadcrumbList**

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://merrysails.com/" },
    { "@type": "ListItem", "position": 2, "name": "Yacht Charter Istanbul", "item": "https://merrysails.com/yacht-charter-istanbul" }
  ]
}
```

**Block D — FAQPage** (no `speakable`)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does a private yacht charter cost in Istanbul?",
      "acceptedAnswer": { "@type": "Answer", "text": "Private yacht charter from €280/hour for a 12-guest motor yacht. 20-guest yacht €420/hour. 30-guest gulet €680/hour. Minimum 2-hour booking. Captain, fuel and crew included." }
    },
    {
      "@type": "Question",
      "name": "Can you cater food and drinks on board?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — finger food, set menu, BBQ and bar packages available. Birthday cake, flower arrangements and proposal set-ups arranged with 48-hour notice." }
    }
  ]
}
```

### Internal linking schema
- WebPage `mainEntity` → Block A `@id`
- Block B `Product` `isRelatedTo` → other yacht Product `@id`s (when more yachts added)
- Block A `provider` → TravelAgency
- Block A `tripOrigin` → Kabataş BoatTerminal
- Block A `areaServed` → BodyOfWater entities

---

## /istanbul-dinner-cruise (1,600/mo)

**File**: `src/app/istanbul-dinner-cruise/page.tsx`

### Current schema (audit)
- `["TouristTrip", "Service"]` block ✓ (keep)
- `Event` block (daily departure schedule) with `AggregateRating 4.88, 312` ✓ (keep — Event is lint-approved AggregateRating parent)
- AggregateOffer ✓ (keep)

### Proposed final schema graph for this page

**Block A — TouristTrip + Service primary** (no aggregateRating, ReserveAction kept)

```json
{
  "@context": "https://schema.org",
  "@type": ["TouristTrip", "Service"],
  "@id": "https://merrysails.com/istanbul-dinner-cruise#trip",
  "name": "Istanbul Dinner Cruise on the Bosphorus",
  "description": "Three-hour Bosphorus dinner cruise with live entertainment, Turkish folk and modern dance show, unlimited soft drinks and 3-course dinner. Departures nightly from Kabataş.",
  "url": "https://merrysails.com/istanbul-dinner-cruise",
  "image": [
    { "@id": "https://merrysails.com/images/dinner/hero-1200.jpg#image" },
    { "@id": "https://merrysails.com/images/dinner/show-1200.jpg#image" },
    { "@id": "https://merrysails.com/images/dinner/dining-1200.jpg#image" }
  ],
  "touristType": ["Couple", "Family", "Honeymoon", "Group celebration", "Corporate dinner"],
  "provider": { "@id": "https://merrysails.com/#travelagency" },
  "serviceType": "Bosphorus dinner cruise with live entertainment",
  "areaServed": { "@type": "City", "name": "Istanbul", "sameAs": "https://www.wikidata.org/wiki/Q406" },
  "availableLanguage": ["English", "Turkish", "German", "French", "Dutch"],
  "tripOrigin": { "@id": "https://merrysails.com/#kabatas-pier" },
  "subjectOf": { "@id": "https://merrysails.com/#bosphorus-strait" },
  "potentialAction": {
    "@type": "ReserveAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://merrysails.com/reservation?tour=dinner-cruise",
      "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"]
    },
    "result": { "@type": "Reservation", "name": "Dinner cruise reservation" }
  }
}
```

**Block B — Event (recurring nightly departure) — lint S1 approved AggregateRating parent + the highest-value rich-result candidate on this page**

Lint rule 3 enforces these required fields: `name`, `startDate`, `endDate`, `location`, `eventStatus`, `eventAttendanceMode`, `organizer`, `performer`, `image`, `description`. Lint rule 4 enforces Event.offers required: `availability`, `validFrom`, `price`, `priceCurrency`, `url` (AggregateOffer with `lowPrice` substitutes for `price`).

```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "@id": "https://merrysails.com/istanbul-dinner-cruise#event-2026-06-09",
  "name": "MerrySails Bosphorus Dinner Cruise",
  "description": "Nightly 3-hour Bosphorus dinner cruise with Turkish folk dance, belly dance, modern show, 3-course dinner and unlimited soft drinks.",
  "image": [
    { "@id": "https://merrysails.com/images/dinner/event-hero-1200.jpg#image" }
  ],
  "startDate": "2026-06-09T19:30:00+03:00",
  "endDate": "2026-06-09T22:30:00+03:00",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": "Kabataş Cruise Terminal — MerrySails dinner boat",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kabataş Cruise Terminal",
      "addressLocality": "Beyoğlu",
      "addressRegion": "Istanbul",
      "postalCode": "34427",
      "addressCountry": "TR"
    },
    "geo": { "@type": "GeoCoordinates", "latitude": 41.0335, "longitude": 28.9913 }
  },
  "organizer": { "@id": "https://merrysails.com/#travelagency" },
  "performer": [
    { "@type": "PerformingGroup", "name": "MerrySails Folk Dance Ensemble" },
    { "@type": "PerformingGroup", "name": "MerrySails Show Team" }
  ],
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "30",
    "highPrice": "90",
    "priceCurrency": "EUR",
    "offerCount": "4",
    "availability": "https://schema.org/InStock",
    "url": "https://merrysails.com/reservation?tour=dinner-cruise",
    "validFrom": "2026-01-01",
    "offers": [
      {
        "@type": "Offer",
        "name": "Standard dinner package — set menu",
        "price": "30",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock",
        "url": "https://merrysails.com/reservation?tour=dinner-standard",
        "validFrom": "2026-01-01"
      },
      {
        "@type": "Offer",
        "name": "VIP dinner package — premium seating + alcohol",
        "price": "90",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock",
        "url": "https://merrysails.com/reservation?tour=dinner-vip",
        "validFrom": "2026-01-01"
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.88",
    "reviewCount": "312",
    "bestRating": "5",
    "worstRating": "1"
  }
}
```

> **Lint compliance**: ALL 10 Event required fields present. Offers has
> AggregateOffer with `lowPrice` + `priceCurrency` + `availability` +
> `validFrom` + `url`. `aggregateRating` parent = Event ✓ (S1 approved).

**Block C — BreadcrumbList**

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://merrysails.com/" },
    { "@type": "ListItem", "position": 2, "name": "Istanbul Dinner Cruise", "item": "https://merrysails.com/istanbul-dinner-cruise" }
  ]
}
```

**Block D — FAQPage** (no `speakable`)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much is a dinner cruise in Istanbul?",
      "acceptedAnswer": { "@type": "Answer", "text": "MerrySails Bosphorus dinner cruise starts at €30 per person for a 3-hour experience with 3-course dinner, live Turkish folk and modern dance show, and unlimited soft drinks. VIP package with premium seating and alcohol €90." }
    },
    {
      "@type": "Question",
      "name": "What time does the dinner cruise start?",
      "acceptedAnswer": { "@type": "Answer", "text": "Boarding from 19:00. Departure 19:30 sharp. Return to Kabataş 22:30. Year-round nightly operation (weather permitting in winter)." }
    },
    {
      "@type": "Question",
      "name": "Is alcohol included?",
      "acceptedAnswer": { "@type": "Answer", "text": "Standard package includes unlimited soft drinks, water and tea. Alcohol available à la carte on the standard package or unlimited on the VIP package." }
    }
  ]
}
```

### Internal linking schema
- WebPage `mainEntity` → Block A
- Block A `subEvent` → Block B `@id` (binds nightly departure event to the trip)
- Block B `superEvent` → Block A `@id` (reverse cross-link)
- Block A `provider` and Block B `organizer` → same TravelAgency `@id`
- Both blocks `location` / `tripOrigin` → Kabataş BoatTerminal `@id`

> **Recurrence note**: Block B as written is a single dated instance. Daily
> Event recommended over `EventSeries` parent — generate one Event per next 14
> days server-side and roll daily via cron. Simpler operationally and the
> default pattern in tourism vertical (see Open Question #4).

---

## Implementation steps

### Phase 1 — Prerequisites (operator confirms before any code touches)
1. Answer the 5 Open Questions at the bottom of this doc.
2. Create `/image-license` plain-text page describing image license terms.
3. Confirm fleet vessel names (`src/data/fleet.ts` — currently placeholder names "Aurora" used above).

### Phase 2 — Shared infrastructure (root layout — 1 commit)
1. Add shared constants to `src/lib/schema-ids.ts` (or top of `src/app/layout.tsx`).
2. Add/update TravelAgency JSON-LD block in root layout (remove `hasCredential`).
3. Add BoatTerminal + BodyOfWater Place graph in root layout.
4. Add ImageObject blocks for the homepage hero + OG default image.
5. Run `npm run lint:schema && npx tsc --noEmit` — must be 0 errors.

### Phase 3 — Per-pillar implementation (3 commits, one per page)
For each pillar page in this order:
- `src/app/bosphorus-cruise/page.tsx` (lowest schema delta)
- `src/app/istanbul-dinner-cruise/page.tsx` (highest rich-result value — Event)
- `src/app/yacht-charter-istanbul/page.tsx` (highest lint risk — AggregateRating relocation)

Per-page steps:
1. Replace existing schema graph with the proposed Blocks A/B/C/D for that page.
2. Add ImageObject blocks for that page's hero + gallery images.
3. Verify `<script type="application/ld+json">` lowercase (not Next.js `<Script>`).
4. Run `npm run lint:schema scripts/lint-schema.mjs src/app/<page>/page.tsx` — must be 0 errors.
5. Run `npx tsc --noEmit`.
6. Commit, deploy nothing yet.

### Phase 4 — Pre-deploy verification
1. `npm run build` lokal must pass.
2. `npm run lint:schema` full repo scan — 0 errors.
3. Schema.org validator each page URL (post-deploy, in staging if possible).
4. Google Rich Results Test each page URL (post-deploy).

### Phase 5 — Post-deploy verify
1. IndexNow ping all 3 URLs.
2. GSC URL Inspection live test + Request Indexing each.
3. Wayback Machine snapshot.
4. 48h later: re-run Rich Results Test, confirm Event rich result on `/istanbul-dinner-cruise`, confirm Licensable badge candidate on hero images.
5. 7d later: Bing Webmaster AI Performance panel — confirm Copilot citation count delta vs pre-deploy baseline.

### Validation commands
```bash
# Per-page lint
node scripts/lint-schema.mjs src/app/bosphorus-cruise/page.tsx
node scripts/lint-schema.mjs src/app/yacht-charter-istanbul/page.tsx
node scripts/lint-schema.mjs src/app/istanbul-dinner-cruise/page.tsx

# Full repo + tsc
npm run lint:schema && npx tsc --noEmit

# Build
npm run build
```

---

## Validation checklist (per page)

### Lint compliance
- [ ] `npm run lint:schema` passes 0 errors, 0 warnings on the modified file
- [ ] `npx tsc --noEmit` passes
- [ ] No `["TouristTrip", "Product"]` combo anywhere (lint rule 2)
- [ ] All Offer blocks have `price` (lint S8)
- [ ] All LocalBusiness subtype blocks have inline `PostalAddress` (lint S10)
- [ ] No `inLanguage` on LocalBusiness subtypes (lint S9)
- [ ] `aggregateRating` parents are only Event / Product / TravelAgency on this page

### Schema.org validator (URL test, post-deploy)
- [ ] https://validator.schema.org/?url=https%3A%2F%2Fmerrysails.com%2Fbosphorus-cruise
- [ ] https://validator.schema.org/?url=https%3A%2F%2Fmerrysails.com%2Fyacht-charter-istanbul
- [ ] https://validator.schema.org/?url=https%3A%2F%2Fmerrysails.com%2Fistanbul-dinner-cruise

### Google Rich Results Test (URL test, post-deploy)
- [ ] https://search.google.com/test/rich-results?url=https%3A%2F%2Fmerrysails.com%2Fbosphorus-cruise
- [ ] https://search.google.com/test/rich-results?url=https%3A%2F%2Fmerrysails.com%2Fyacht-charter-istanbul
- [ ] https://search.google.com/test/rich-results?url=https%3A%2F%2Fmerrysails.com%2Fistanbul-dinner-cruise

**Expected rich result types per page** (revised expectations):
- `/bosphorus-cruise` → Breadcrumb only. (FAQ recognized but no SERP feature post-May-2026.)
- `/yacht-charter-istanbul` → Breadcrumb + Product (per yacht Block B) + Merchant listing.
- `/istanbul-dinner-cruise` → Breadcrumb + **Event** (highest-value rich result).
- All 3 pages → Licensable badge on hero images in Google Images.

### Third-party verify
- [ ] https://behlul.com/en/schema-radar/ — TR developer cross-check
- [ ] https://isitagentready.com/ — LLM-readiness scan post-deploy

### Post-deploy verify
- [ ] IndexNow ping all 3 URLs (Bing + Yandex)
- [ ] GSC URL Inspection → live test → "Request indexing" for each URL
- [ ] Wayback Machine snapshot
- [ ] 48h: re-run Google Rich Results Test, confirm Event rich result on `/istanbul-dinner-cruise`
- [ ] 7d: Bing Webmaster AI Performance panel — confirm Copilot citation count delta

### Lint-rule cross-reference for these blocks
| Rule | Risk on these blocks | Mitigation in this design |
|---|---|---|
| 1. aggregateRating-parent | High — TouristTrip+Service is NOT a valid parent | Rating relocated to Event (dinner) and Product (yacht). Bosphorus pillar inherits rating from TravelAgency root |
| 2. tourist-product-combo | None — we use TouristTrip+Service everywhere | n/a |
| 3. event-required-field | Event block on `/istanbul-dinner-cruise` | All 10 required fields present and verified above |
| 4. event-offer-field | Event offers on `/istanbul-dinner-cruise` | AggregateOffer with lowPrice + priceCurrency + availability + validFrom + url present |
| 7. price reality | sunset €34, dinner €30, yacht €280 floor | All offer prices respected: €25 group / €34 sunset / €30 dinner / €280 yacht-hour |
| S8. offer-missing-price | Every Offer has explicit price | Verified above |
| S9. localbusiness-inlanguage | TravelAgency block | Uses `availableLanguage` + `knowsLanguage`, NOT `inLanguage` |
| S10. localbusiness-no-address | TravelAgency block | Inline PostalAddress present |
| S11. unsplash-double-w-param | Image URLs all on merrysails.com domain | N/A |
| S13. multiple-h1 | Page JSX, not schema | N/A for this review |

---

## SKIP REGISTRY — what we DID NOT ship and why

> **Discipline statement on "AI grounding lift" claims** — The pre-revision draft
> of this doc invoked schema additions as boosting AI assistant citation
> probability. Independent measurement (Ahrefs 75k-brand multi-LLM study Q1
> 2026, Otterly LLM citation correlation panel May 2026) shows that after
> controlling for (a) on-page text quality / Information Gain, (b) backlink /
> mention authority, (c) freshness of `dateModified`, **schema markup has no
> statistically significant standalone correlation with LLM citation rates**.
> The signal everyone was attributing to schema turned out to be confounded by
> the kinds of sites that bother to ship rich schema (i.e. they also produce
> better content). The 2026-06-08 verdict: ship schema for **verified Google
> rich results** (which DO drive CTR), and for **forward-looking agentic
> protocols** (ReserveAction, where the cost is low and the upside is real if
> agentic booking ships). Skip everything else.

### Re-evaluation triggers (when to revisit any of these)
- Google publishes a new structured data type for travel / cruise / boat tours with a documented rich result.
- ChatGPT / Perplexity / Claude documents an explicit schema preference (none have as of 2026-06-08).
- Otterly or Ahrefs publishes a follow-up panel reversing the null finding.
- A Google product manager (Mueller, Illyes, Splitt) explicitly recommends one of the skipped types for tourism in a public statement.

### Deprecated entries (kept for archival reference)

#### 1. `BoatTrip` schema — SKIP (semantically wrong)
- Reason: `BoatTrip` in Schema.org is ferry-only — the parent type is `BusOrCoachTrip` / `TrainTrip` / `BoatTrip` for scheduled point-to-point transport. A sightseeing cruise that returns to its origin is NOT a `BoatTrip` in the schema vocabulary.
- Status: No Google rich result attached to `BoatTrip` regardless. Use `TouristTrip` + `Service` (our current shape) which IS the correct semantic.
- Previous draft proposed: Block B on `/bosphorus-cruise` as a `BoatTrip` adjunct describing the route asset.
- Revised verdict: do not ship. Route narrative belongs in `TouristTrip.itinerary` (already there).

#### 2. `BoatTerminal` (as active SHIP) — SKIP (no rich result)
- Reason: `BoatTerminal` is a `Place` subtype with no Google rich result attached. We use it AS A PLACE REFERENCE only (the `@id` anchor for `tripOrigin` / `location` graph edges) — this is hygiene, not an active SHIP.
- Status: Keep the Place block as-is in the shared layout (it costs nothing). Do not invest in further `BoatTerminal` properties or marketing it as an entity hub.
- Previous draft positioned it more centrally; revised position is "passive Place reference, leave it alone".

#### 3. `Speakable` / `SpeakableSpecification` — SKIP (7-year BETA, sunset path)
- Reason: `speakable` has been in BETA since 2019 with no exit-from-beta announcement, no documented rich result, and no published rollout to non-news verticals. Mueller has repeatedly downgraded it in public statements. The Google Assistant feature it was originally designed for has been deprioritized in favor of Gemini.
- Status: Remove all `speakable` properties from FAQPage / WebPage blocks. Costs zero to delete, zero risk.
- Previous draft proposed: `"speakable": { "@type": "SpeakableSpecification", "cssSelector": [".tldr-box", ".faq-answer"] }` on every FAQPage block.
- Revised verdict: deleted in all 3 pillar FAQPage blocks above.

#### 4. `TaxiService` — SKIP (out of scope for MerrySails)
- Reason: MerrySails is a cruise / yacht charter brand, not an airport transfer brand. `TaxiService` is the correct type for airport transfer brands (KWT / TransferStambul) and the right rich-result hook for the Bing Copilot / Perplexity airport-transfer answer pattern.
- Status: Skip on MerrySails. Recommend ship on KWT (separate pillar revision, separate doc).
- Previous draft did not propose this on MerrySails — clarified here in case of cross-brand confusion.

#### 5. `EducationalOccupationalCredential` (for TÜRSAB license) — SKIP (wrong type)
- Reason: `EducationalOccupationalCredential` is for academic / professional credentials of a Person (university degree, professional certification, training cert). It is NOT for legal business licenses of an Organization. Google validator silently accepts the misuse but carries zero rich-result weight and clutters the entity graph.
- Status: Surface the TÜRSAB license number in **on-page visible text** in the homepage / footer (already required by Turkish regulatory law per Jan 2021 binding regulation). Do not encode it as `EducationalOccupationalCredential`.
- Previous draft included `hasCredential` block on the TravelAgency root. Revised: removed from the TravelAgency block above.

#### 6. `Menu` / `MenuItem` (for dinner cruise served menu) — SKIP (wrong brand)
- Reason: `Menu` schema is for `Restaurant` / `FoodEstablishment` LocalBusiness subtypes with a defined `hasMenu`. MerrySails dinner cruise highlights the served menu in on-page text but the brand is a TravelAgency, not a Restaurant. Adding `Menu` would force a brand-type confusion (TravelAgency + Restaurant double-typing).
- Status: Skip on MerrySails. The menu description belongs in `Event.description` and on-page text. Recommend ship on Pinogare (separate brand, IS a Restaurant — separate doc).
- Previous draft mentioned this possibility on `/istanbul-dinner-cruise` — revised verdict is hard no.

#### 7. `TattooParlor` — SKIP (wrong brand)
- Reason: Out of scope. Belongs to ErsinTattoo brand revision.

---

## Open questions for operator (5 — defaults proposed)

### Q1. Kabataş Cruise Terminal as primary BoatTerminal
**Question**: Confirm Kabataş Cruise Terminal (Kabataş Iskelesi 1, Beyoğlu) is the primary departure point for ALL 3 pillars. Some yacht charters may also depart from Bebek or Karaköy on request.
**Proposed default**: YES, Kabataş primary. If yacht charter can depart from secondary piers on request, add a second `BoatTerminal` entity for Bebek with `name: "Bebek Marina"` and link both via `tripOrigin: [{ "@id": "..." }, { "@id": "..." }]` array.
**Operator action**: confirm YES/NO, and if secondary piers exist, list them.

### Q2. Fleet vessel names for `/yacht-charter-istanbul` Product blocks
**Question**: The Product block uses placeholder name "Yacht Aurora". `src/data/fleet.ts` already has the real fleet — pull from there.
**Proposed default**: `["MerrySails-1", "MerrySails-2"]` as 2 separate `Product` blocks if real fleet names not yet locked. Better: read `src/data/fleet.ts` actual values and bind one Product per vessel.
**Operator action**: confirm real fleet vessel names + capacities + hourly rates per vessel. Ideal: send the operator a one-liner "what are the 2-3 yacht names you want on the public page", paste them in.

### Q3. Refund / cancellation policy in MerchantReturnPolicy
**Question**: Current Product block assumes `MerchantReturnFiniteReturnWindow` with `merchantReturnDays: 1` (matches "Free cancel 24h before departure" — operator practice).
**Proposed default**: Keep `MerchantReturnFiniteReturnWindow` + 1 day. If operator allows full refund within 48h, change to `merchantReturnDays: 2`. If non-refundable, change to `MerchantReturnNotPermitted`.
**Operator action**: confirm cancellation window (24h / 48h / non-refundable). Default for SHIP = 24h free cancel.

### Q4. EventSeries vs daily Event for `/istanbul-dinner-cruise`
**Question**: Emit one Event per upcoming day (rolling 14 days) OR use `EventSeries` parent with child Events.
**Proposed default**: Daily Event, rolling 14 days, generated server-side. Simpler ops, default pattern in tourism vertical. Cron updates the 14-day window nightly. Use the same `name` / `description` / `performer` across all 14 instances; only `startDate` / `endDate` / `@id` differ.
**Operator action**: confirm "ship daily Event x 14, roll nightly" approach. Cron implementation is a separate task — for v1, can hardcode the next 7 days statically in the page template and update weekly via commit.

### Q5. TÜRSAB license number — surface where?
**Question**: TÜRSAB A Group license, valid since 2001 (per project memory). License number not in current memory.
**Proposed default**: Surface in on-page visible text in footer ("TÜRSAB A Group License No. [XXXX] — operating since 2001") per Jan 2021 Turkish regulatory binding rule. Do NOT encode in `EducationalOccupationalCredential` (SKIP REGISTRY #5).
**Operator action**: provide TÜRSAB license number string. Update footer copy. Separate from schema work.

---

## Summary of changes vs previous version

| Change | Previous | Revised |
|---|---|---|
| Total schema types proposed | 9 | 4 SHIP + 2 HYGIENE |
| `Speakable` on FAQPage | Yes (all 3 pillars) | Removed (SKIP #3) |
| `BoatTrip` Block B on `/bosphorus-cruise` | Yes | Removed (SKIP #1) |
| `BoatTerminal` as active SHIP | Yes | Demoted to passive Place reference (SKIP #2) |
| `hasCredential` (TÜRSAB) on TravelAgency | Yes | Removed (SKIP #5) |
| `ImageObject` with license fields | Not in draft | **NEW SHIP** (Licensable badge — verified rich result) |
| `ReserveAction` proliferation | TravelAgency root only | **EXPANDED** to all 3 pillar primary entities |
| `AggregateRating` placement | TravelAgency root + sometimes on Service | Lint-clean: TravelAgency root + Event (dinner) + Product (yacht only) |
| Refund policy | `MerchantReturnNotPermitted` | `MerchantReturnFiniteReturnWindow` 1 day (operator confirms Q3) |
