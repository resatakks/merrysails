# MerrySails Blog Image Prompt Library

Date: 2026-04-23
Scope: Blog, guides, service-page support visuals, and AI-assisted editorial assets.

## Core Rule

AI-generated images are allowed for editorial support, but they must not be presented as real MerrySails guests, real vessels, real events, or real documentary proof. Use them as visual explanations, mood-led hero images, route concepts, packing/checklist graphics, comparison cards, and seasonal planning visuals.

## Preferred Visual Types

- Editorial hero image: cinematic Bosphorus mood, no readable text, no fake logos.
- Route concept: simplified Bosphorus map-style illustration, no exact navigation claim.
- Comparison graphic: sunset vs dinner vs yacht charter, clean icons and product cues.
- Planning checklist: what to wear, what to bring, pickup/boarding flow.
- Seasonal visual: spring, summer sunset, autumn golden hour, winter dinner cruise.
- Local landmark explainer: Maiden's Tower, Ortakoy Mosque, Dolmabahce Palace, Bosphorus Bridge.

## Avoid

- Fake close-up guests.
- Fake MerrySails logo on a boat.
- Fake ticket, boarding pass, or review screenshot.
- Fake named captain/guide/person.
- Overcrowded generic party visuals that make the product look low quality.
- Text-heavy generated images with spelling risk.
- Visuals implying inclusions that are not guaranteed on the page.

## File and Alt Text Rules

- Filename format: `merrysails-{slug}-{visual-type}.webp`
- Alt text should describe the visual truthfully.
- If image is conceptual, alt text should not imply it is a real photo.
- Hero aspect: `16:9` or `3:2`.
- Card aspect: `4:3`.
- Social share: `1200x630`.

## Base Brand Prompt

```text
Premium editorial travel visual for MerrySails, Istanbul Bosphorus atmosphere, elegant nautical travel aesthetic, navy blue and warm gold palette, realistic but clearly editorial, clean composition, no readable text, no logos, no fake signage, no close-up identifiable people, high detail, natural light, useful negative space for page title overlay.
```

## Page-Specific Prompts

### Bosphorus Cruise Guide

```text
Premium editorial travel visual for a Bosphorus cruise guide, Istanbul strait with a comfortable sightseeing boat passing Dolmabahce Palace and the Bosphorus Bridge, warm daylight, clear water reflections, navy and gold color palette, realistic editorial style, no readable text, no logos, no close-up people, wide 16:9 composition.
```

Alt text:

```text
Editorial Bosphorus cruise scene with Istanbul waterfront landmarks and a sightseeing boat.
```

### Bosphorus Sunset Cruise

```text
Premium editorial travel visual for a Bosphorus sunset cruise, golden-hour Istanbul skyline, Ortakoy Mosque and Bosphorus Bridge atmosphere, elegant shared cruise vessel in the mid-distance, warm amber sky, calm water, cinematic but natural, no readable text, no logos, no close-up people, wide 16:9 composition.
```

Alt text:

```text
Editorial sunset cruise scene on the Bosphorus with golden light and Istanbul landmarks.
```

### Istanbul Dinner Cruise

```text
Premium editorial travel visual for an Istanbul dinner cruise, evening Bosphorus with illuminated bridge and waterfront palaces, warm indoor dining glow visible from a cruise vessel, elegant night atmosphere, navy blue and gold palette, no fake menu text, no logos, no close-up people, wide 16:9 composition.
```

Alt text:

```text
Editorial Bosphorus dinner cruise scene with illuminated Istanbul shoreline at night.
```

### Yacht Charter Istanbul

```text
Premium editorial travel visual for private yacht charter in Istanbul, elegant private motor yacht on the Bosphorus, soft golden-hour light, refined luxury travel mood, Dolmabahce Palace and bridge atmosphere in background, no fake logos, no readable text, no close-up people, wide 16:9 composition.
```

Alt text:

```text
Editorial private yacht charter scene on the Bosphorus in Istanbul.
```

### Boat Rental vs Yacht Charter

```text
Clean editorial comparison graphic for Istanbul boat rental versus yacht charter, split composition with simple boat icons, Bosphorus skyline silhouette, navy blue and warm gold palette, minimal premium travel design, no readable text, no fake logos, 16:9 composition.
```

Alt text:

```text
Conceptual comparison visual for boat rental and yacht charter options in Istanbul.
```

### Proposal Yacht Rental

```text
Premium editorial romantic travel visual for a proposal yacht rental in Istanbul, private yacht deck setup with subtle flowers and warm lights, Bosphorus skyline and Maiden's Tower atmosphere, no visible faces, no readable signage, no fake proposal text, elegant and natural, wide 16:9 composition.
```

Alt text:

```text
Editorial romantic yacht setup on the Bosphorus for a proposal-style private cruise.
```

### What to Wear on a Bosphorus Cruise

```text
Editorial packing flat lay for a Bosphorus cruise in Istanbul, light jacket, sunglasses, comfortable shoes, camera, scarf, and small bag arranged on a navy travel surface with subtle nautical accents, premium travel guide style, no readable text, no logos, 4:3 composition.
```

Alt text:

```text
Conceptual packing flat lay for what to wear on a Bosphorus cruise.
```

### Bosphorus Cruise Departure Points

```text
Clean editorial route-planning visual for Bosphorus cruise departure points, simplified Istanbul waterfront map mood with pier markers, boat route line, Bosphorus Bridge silhouette, navy and gold palette, no exact map labels, no readable text, no logos, 16:9 composition.
```

Alt text:

```text
Conceptual Bosphorus departure-point planning visual with pier markers and route line.
```

## Production Workflow

1. Choose the target page and owner keyword.
2. Pick one prompt from this library and adjust only the route, season, or product details.
3. Generate one hero and one social crop.
4. Save as WebP with descriptive filename.
5. Add truthful alt text.
6. Confirm the image does not imply fake guests, fake vessels, fake reviews, or unsupported inclusions.
7. Only then use it on a blog, guide, or service support page.

## First Visual Pilot Queue

- `/blog/what-to-wear-bosphorus-cruise`
- `/blog/bosphorus-cruise-departure-points`
- `/blog/bosphorus-sunset-cruise-vs-dinner-cruise`
- `/blog/boat-rental-vs-yacht-charter-istanbul`
- `/blog/proposal-yacht-rental-istanbul-planning-guide`
- `/blog/best-time-for-bosphorus-cruise-istanbul`

Start with these because they can benefit from informational visuals without pretending to show real guest events.
