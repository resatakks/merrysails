# MerrySails — Project Rules

## Project Focus
- This repository is the MerrySails revenue site.
- Default working mode for this workspace is `conversion-first SEO + Google Ads + analytics`.
- Treat this repo as a `MerrySails SEO + Ads + measurement session`.
- Before proposing campaign changes, verify landing page fit, measurement quality, and commercial intent clarity.
- Before proposing SEO rewrites, verify owner URL fit, indexing state, and GSC query behavior.

## Business Snapshot
- Brand: `MerrySails`
- Legal / operating brand: `Merry Tourism`
- Category: Bosphorus cruises, dinner cruises, sunset cruises, yacht charter, private event charters
- Market: Istanbul tourism demand, English-first paid search priority unless the user asks for additional languages
- Trust signals already used in site copy and schema:
  - `Since 2001`
  - `TURSAB A Group` licensing references
  - Phone: `+90 537 040 68 22`
  - Email: `info@merrysails.com`

## Core Revenue Pages
- `Sunset` owner URL: `/cruises/bosphorus-sunset-cruise`
- `Dinner` owner URL: `/istanbul-dinner-cruise`
- `Yacht` owner URL: `/yacht-charter-istanbul`

## Protected Core Page Rule
- These 3 core revenue pages are protected content assets.
- Do not substantially rewrite their main explanatory body copy unless the user explicitly asks for deeper content edits.
- SEO work on these pages should usually stay within:
  - meta title and meta description
  - H1, H2, H3 refinement
  - schema cleanup
  - breadcrumbs
  - internal-link support
  - adjacent support sections around the core body
- Use homepage, service pages, local/supporting pages, blog, guides, and comparison hubs as the main place for more aggressive SEO expansion.

## Supporting Commercial Pages
- `Boat rental` support page: `/boat-rental-istanbul`
- `Proposal` support page: `/proposal-yacht-rental-istanbul`
- `Corporate events` support page: `/corporate-events`
- `Private dinner` support page: `/private-bosphorus-dinner-cruise`
- `Contact` page: `/contact`

## Commercial Ownership Rules
- Keep one clear owner URL for each core commercial intent.
- Do not split the same paid-search intent across multiple pages without a strong reason.
- Do not mix shared-ticket intent and private-charter intent in the same campaign or ad group.
- When a query is clearly `sunset`, send it to the sunset owner URL first.
- When a query is clearly `dinner cruise`, send it to the dinner owner URL first.
- When a query is clearly `private yacht / yacht charter`, send it to the yacht owner URL first.
- Use support pages only when the query intent is truly narrower than the owner page.

## Working Sequence
1. Audit the current funnel before changing anything.
2. Confirm measurement status and conversion definitions.
3. Confirm landing page ownership and message match.
4. Review query architecture, negatives, and geo settings.
5. Only then propose campaign builds, budget changes, or creative tests.

## SEO Working Sequence
1. Read GSC before changing SEO-sensitive content.
2. Check owner URL fit for the query set.
3. Check indexation and rich-result status.
4. Check title, description, H1, H2, H3, internal links, and schema.
5. Only then change copy, headings, internal links, or new page plans.

## GSC Cadence
- Every meaningful MerrySails SEO session should review:
  - `24 hours`
  - `7 days`
  - `28 days`
  - `3 months`
- Use `24 hours` to spot fresh impressions, new indexing, and new URL activity.
- Use `7 days` to spot weekly winners, losers, and CTR anomalies.
- Use `28 days` as the default optimization window for titles, H1s, internal links, and owner mapping.
- Use `3 months` for broader trend direction and structural decisions.
- Always look for:
  - pages with first impressions
  - commercial queries in positions `5-20`
  - mismatched owner URLs
  - rich-result failures
  - pages with impressions but weak CTR

## Google Ads Operating Rules
- Launch and scale from `Search-first`.
- Default launch matching: `phrase + exact` only.
- Keep `Search Partners` off at launch unless there is data-backed reason to test them.
- Use `presence-only` location targeting for Istanbul demand.
- Keep campaigns separated by product intent:
  - `Sunset`
  - `Dinner`
  - `Yacht`
  - `Brand`
- Keep `Brand` isolated from non-brand.
- Default first paid-search focus is `high-intent English demand`.
- Add negatives aggressively when a search term belongs to another product line.
- Do not recommend broad-match expansion before the account has clean query data and reliable conversion tracking.

## Conversion Hierarchy
- Highest-value conversion:
  - Completed reservation / reservation request successfully created
- Strong lead conversion:
  - Qualified contact form submission tied to booking intent
- Secondary engagement conversions:
  - `WhatsApp` click
  - `Phone` click
  - Booking flow start
  - Reservation lookup / support actions only if later needed for UX analysis
- Do not mark low-intent engagement actions as primary optimization goals unless the user explicitly wants lead-volume bias.

## Measurement Rules
- Prefer environment-variable driven analytics configuration over hard-coded IDs.
- Prefer one central tracking layer rather than scattering vendor snippets across many components.
- Fire success conversions only after confirmed success state, not on button click alone.
- Avoid duplicate event firing across page load, form submit, and client-side rerenders.
- Include product context where possible:
  - `tour_slug`
  - `tour_name`
  - `package_name`
  - `guests`
  - `value`
  - `currency`
- When the user provides `GA4`, `Clarity`, `Google Ads`, or other tags, document exactly where each ID is used and which events it powers.

## Existing Conversion Surfaces In Code
- Reservation creation flow via `src/app/actions/reservation.ts`
- Contact form flow via `src/app/actions/contact.ts`
- Sticky phone CTA via `src/components/layout/WhatsAppButton.tsx`
- Sticky WhatsApp CTA via `src/components/layout/WhatsAppButton.tsx`
- Reservation management and document pages can later support CRM or offline analysis, but they are not the first paid-media optimization target

## Landing Page and Offer Truth
- Keep ad copy aligned with real offer structure.
- Current public price ladders referenced in site content:
  - Sunset: `EUR 34 / 40`
  - Dinner: `EUR 30-90`
  - Yacht: `from EUR 280`
- Do not promise inclusions, pickup, boarding point certainty, or pricing logic that the page cannot support clearly.
- Do not flatten all products into a generic `Bosphorus cruise` promise when the user intent is more specific.

## Required Reads Before Ads Work
- `docs/ads/MERRYSAILS-GOOGLE-ADS-LAUNCH-KEYWORD-ARCHITECTURE.md`
- `docs/ads/MERRYSAILS-COMPETITOR-AD-RESEARCH-WORKSHEET.md`
- `src/data/commercial-intents.ts`
- `src/app/page.tsx`
- `src/app/layout.tsx`

## Required Reads Before SEO Work
- `docs/MERRYSAILS-SEO-ROADMAP-2026-04-23.md`
- `docs/MERRYSAILS-KEYWORD-CLUSTER-MEMORY-2026-04-23.md`
- `docs/MERRYSAILS-SERP-RANK-CHECK-RUNBOOK-2026-04-23.md`
- `docs/MERRYSAILS-CONTENT-TREE-INDEXATION-AUDIT-2026-04-23.md`
- `docs/MERRYSAILS-CONTENT-QUALITY-GUARDRAILS-2026-04-23.md`
- `docs/MERRYSAILS-BLOG-IMAGE-PROMPT-LIBRARY-2026-04-23.md`
- `docs/MERRYSAILS-YACHT-CHARTER-SEMRUSH-BRIEF-2026-04-23.md`
- `docs/MERRYSAILS-FULL-SEO-AUDIT-2026-04-22.md`
- `docs/MERRYSAILS-SEO-DATA-HANDOFF.md`
- `docs/MERRYSAILS-SEO-RUNBOOK.md`
- `src/data/commercial-intents.ts`
- `src/app/page.tsx`
- `src/app/layout.tsx`
- `src/app/sitemap.xml/route.ts`

## Google Ads Budget Safety (Critical)
- Google Ads budget mutations are a red-line operation.
- Never send raw daily budgets by guessing micros manually.
- Always use a helper that converts human currency units to micros safely.
- Rule: `1 currency unit = 1,000,000 micros`.
- Example: `6500 TL = 6,500,000,000 micros`.
- A value like `6500000` micros means only `6.5 TL` and is a severe bug.
- Reject suspicious budget updates below `50` local currency units unless the user explicitly confirms a tiny test budget.
- If a budget update is done via API or script, log the intended currency amount before mutating.

## Session Goal
- Use this workspace to improve:
  - conversion tracking quality
  - campaign structure
  - landing page match
  - competitor response
  - user service quality
  - commercial clarity
- The default posture is `measure first, then optimize`.
