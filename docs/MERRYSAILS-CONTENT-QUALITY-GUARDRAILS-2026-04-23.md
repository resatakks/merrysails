# MerrySails Content Quality Guardrails

Date: 2026-04-23
Scope: SEO, GEO, AI visibility, blog, guides, service pages, and support content.

## Why This Exists

MerrySails should not look like a generic AI-content site. The project can use AI-assisted production, but every page must behave like a real travel operator page: accurate offer facts, clear user help, defensible claims, and a direct route to booking or support.

## Non-Negotiable Rules

- Do not invent experts, credentials, guide licenses, captain names, review counts, proposal counts, or business statistics.
- Do not repeat the same quote block across many pages as if it were unique expert commentary.
- Do not use Turkish, French, Dutch, or Spanish keyword variants inside English headings unless the page is intentionally built for that language.
- Do not publish new content for manual indexing until the page has a clear owner URL relationship, visible CTA path, unique user value, and current offer facts.
- Do not use FAQ schema unless the same Q&A is visible on the page.
- Do not cite outdated prices, boarding points, inclusions, or departure times in `/llms.txt`, blog posts, schema, or meta descriptions.
- Do not use a support page to compete against a protected core owner page unless the intent is truly narrower.

## Useful Content Standard

Every indexable page should contain at least one of these value types:

- Real booking decision help, such as package comparison, who should choose which option, or what changes price.
- Local route knowledge, such as Bosphorus landmarks, departure logic, traffic timing, or weather/season constraints.
- Operational clarity, such as meeting point policy, guest count limits, safety/licensing, cancellation logic, or add-on rules.
- Commercial disambiguation, such as shared cruise vs private yacht, sunset vs dinner, yacht charter vs boat rental.
- Visual or planning support, such as route maps, checklists, timing tables, or image briefs.

## Blog Quote Policy

Current code renders legacy `expertQuote` blocks as `MerrySails field note` instead of third-party expert endorsements. This avoids presenting repeated or unverified snippets as external authority.

Future quote rules:

- Use named expert quotes only when the person, role, and permission are verified.
- Store verified source details in a durable content note before publishing.
- Prefer `field note`, `booking team note`, or `route planning note` for internal operational observations.
- If a quote repeats across more than one page, rewrite it as a general note or remove it.

## AI Visibility Rules

- Put the direct answer in the first 30% of the page or section.
- Keep facts consistent between visible copy, schema, sitemap, `/llms.txt`, and `/llms-full.txt`.
- Use tables for package, price, route, and format comparisons where users need to choose.
- Use concise summary blocks that answer real prompts like "Which Bosphorus cruise should I book?" or "Is a private yacht better than a dinner cruise?"
- Keep AI-facing files conservative: no exaggerated superlatives, no stale package claims, and no unsupported review/rating claims.

## Image Generation Rules

- AI-generated blog visuals can be used for editorial illustrations, route concepts, packing/checklist graphics, and mood-led hero art.
- Do not present AI-generated images as real cruise photos, real guests, real boats, or real event documentation.
- Each generated image should have a page-specific prompt, descriptive filename, and truthful alt text.
- Prefer informational visuals for SEO posts: maps, itinerary cards, comparison illustrations, seasonal packing visuals, or landmark explainers.

## Pre-Indexing Checklist

- Primary intent and owner URL are clear.
- H1 uses one owner intent, not several competing terms.
- H2s cover sub-intents; H3s answer practical questions.
- Meta title and description match the page and current offer facts.
- Internal links point users to the correct core product page or contact path.
- Schema matches visible page content.
- No fake expert, fake review, stale price, or duplicated quote pattern remains.
- Page adds something meaningfully different from existing indexed pages.

## Current Risk Backlog

- Audit all legacy `expertQuote` entries and convert repeated snippets into unique field notes or remove them.
- Review posts with package prices and boarding details against `src/data/tours.ts`.
- Prioritize GSC-visible pages before manually indexing low-signal pages.
- Build a blog image prompt library before creating many visuals.
