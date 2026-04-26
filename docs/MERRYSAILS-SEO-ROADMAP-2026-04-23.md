# MerrySails SEO Roadmap

Date: `2026-04-23`
Workspace: `/Users/resat/Desktop/merrysails`
Primary market: English-first Istanbul tourism demand

This roadmap is the long-running MerrySails SEO operating plan. It should be read together with:

- `docs/MERRYSAILS-FULL-SEO-AUDIT-2026-04-22.md`
- `docs/MERRYSAILS-SEO-RUNBOOK.md`
- `docs/MERRYSAILS-SEO-DATA-HANDOFF.md`
- `AGENTS.md`

## Executive Diagnosis

MerrySails already has a strong SEO base: core revenue pages, commercial support pages, a broad blog library, guide pages, sitemap, `llms.txt`, `llms-full.txt`, robots policy for AI/search crawlers, and an indexing queue. The main opportunity is not simply adding more pages. The main opportunity is turning the existing content mass into a strict commercial funnel.

Current SEO posture:

- Discovery exists, but commercial capture is weak.
- GSC snapshot on `2026-04-22` showed about `5K` impressions, `22` clicks, `0.4%` CTR, and average position `18.8` over 3 months.
- The pages getting early visibility are mostly homepage, blog, and guides rather than the 3 protected revenue pages.
- The site has enough content to win long-tail and mid-funnel demand, but it needs stronger owner URL routing, title/meta CTR work, structured-data hygiene, and Semrush-led commercial keyword mapping.

Strategic decision:

- Keep the 3 protected revenue pages as high-quality conversion pages.
- Do not heavily rewrite their main explanatory body copy.
- Use metadata, heading refinement, schema, breadcrumbs, internal links, adjacent helper blocks, support pages, local pages, blog, and hubs to grow SEO.

## Operating Rules

- Keep token efficiency high: reuse stable repo context, avoid repeating large audits, and focus edits on the highest-leverage surfaces first.
- Pull GSC once per day by default, then use that daily snapshot as the working truth for the rest of the day.
- Treat the 3 protected owner pages as conversion assets first and SEO assets second.
- Grow new SEO capture mainly through commercial service pages, local-support guides, comparison hubs, and CTA-rich support content.
- Default expansion path: `commercial keyword -> owner fit check -> service/support page if the intent is narrower than the owner page`.

## 2026 Writing Standard

This roadmap now follows current Google guidance for people-first content and AI search surfaces.

### Content must be people-first

- Write for one real audience and one real decision per page.
- Add first-hand, operationally useful detail instead of generic travel filler.
- Do not pad to hit a word count.
- Do not update dates just to look fresh unless the page has materially changed.
- Do not mass-produce near-duplicate pages just because a keyword exists.
- Make the page satisfying enough that the user does not need to search again immediately for the same question.

### E-E-A-T / trust rules for MerrySails

- Trust is the primary filter.
- Use clearly verifiable business facts: Merry Tourism, TURSAB A Group, since 2001, phone, email, address, real departure-flow rules, and confirmed package ladders.
- Avoid unsupported social-proof numbers, review counts, ratings, employee counts, or exaggerated “best/highest-rated” style claims.
- Prefer pages that show how the service actually works: boarding flow, pickup logic, marina confirmation, package differences, and booking process.
- Keep About, TURSAB, Contact, and boarding/waterfront guides strong because they help both users and AI systems verify the business.

### AI visibility rules

- For Google AI features, no special AI-only markup is required; pages must simply be indexed, snippet-eligible, crawlable, and useful.
- Keep important information in visible text, not only in images or interactive UI.
- Keep structured data aligned with visible content.
- Maintain strong internal linking so AI systems can fan out from broad questions into the right owner or support page.
- Use citation-friendly support surfaces for trust and logistics:
  - `/about`
  - `/tursab`
  - `/contact`
  - `/guides/kabatas-pier`
  - `/guides/karakoy-waterfront`
  - `/guides/kurucesme-marina`

### ChatGPT / OpenAI discovery rules

- Keep `OAI-SearchBot` crawlable in robots and infrastructure.
- Treat citation-friendly trust/support pages as the best surfaces for AI discovery when the query is not yet ready for a raw booking page.
- If merchant/feed opportunities become relevant later, they should be additive, not a substitute for crawlable, well-structured site content.

## Protected Revenue Pages

These pages are revenue-critical and should not be rewritten aggressively without explicit approval:

- `/cruises/bosphorus-sunset-cruise`
- `/istanbul-dinner-cruise`
- `/yacht-charter-istanbul`

Allowed SEO improvements on protected pages:

- Meta title and description tests
- H1, H2, and H3 refinement
- Breadcrumb schema
- FAQ schema where visible FAQ content exists
- Product/Tour schema cleanup
- Internal-link modules around the core copy
- Trust proof and booking clarity
- Light adjacent support sections that do not replace the main content

Avoid:

- Rewriting the core explanatory paragraphs
- Changing package truths, inclusions, or prices without source verification
- Flattening sunset, dinner, and yacht charter into generic `Bosphorus cruise`
- Creating competing exact-match service pages for the same intent

## Current Architecture Read

### Core Revenue Layer

| Intent | Owner URL | Current Role | Roadmap Direction |
| --- | --- | --- | --- |
| Bosphorus sunset cruise | `/cruises/bosphorus-sunset-cruise` | Protected money page | Own all direct sunset transactional queries |
| Istanbul dinner cruise | `/istanbul-dinner-cruise` | Protected money page | Own shared dinner cruise + Turkish night + pickup intent |
| Yacht charter Istanbul | `/yacht-charter-istanbul` | Protected money page | Own private yacht charter and private Bosphorus yacht intent |

### Support Commercial Layer

| Intent | URL | Current Role | Roadmap Direction |
| --- | --- | --- | --- |
| Boat rental Istanbul | `/boat-rental-istanbul` | Strong support page | Build as flexible private boat hire page, not full yacht package owner |
| Proposal yacht rental | `/proposal-yacht-rental-istanbul` | Support page | Build as proposal-specific private intent |
| Corporate yacht event | `/corporate-events` | Strong support page | Build for MICE, client hosting, company dinner, launch, offsite |
| Private dinner yacht | `/private-bosphorus-dinner-cruise` | Support page | Build as private dinner alternative to shared dinner cruise |
| Private events | `/private-events` | Broad support hub | Clarify role as occasion hub, then link to narrower service pages |
| Contact | `/contact` | Lead capture | Strengthen for quote and trust, not generic contact only |

### Hub Layer

| Hub | URL | Ideal Ownership |
| --- | --- | --- |
| Bosphorus cruise comparison | `/bosphorus-cruise` | Generic `bosphorus cruise istanbul`, comparison, price/format selection |
| Cruise catalog | `/cruises` | All public tour/product discovery |
| Blog index | `/blog` | Editorial and commercial support discovery |
| Guide index | `/guides` | Landmark/entity authority and AI citation support |

### Content Layer

Current blog collections:

- `commercial-cruise-guides`
- `commercial-conversion-guides`
- `private-yacht-and-occasion-guides`
- `foundational-cruise-guides`
- `planning-and-support-guides`
- `istanbul-city-guides`

Current guide themes:

- Bosphorus Strait
- Maiden's Tower
- Dolmabahce Palace
- Ortakoy Mosque
- Rumeli Fortress
- Galata Bridge / Eminonu
- Princes Islands
- Kurucesme Marina
- Golden Horn
- Bosphorus bridges

The content library is broad enough. The next job is classification, consolidation, routing, visual quality, and update cadence.

## Service-Page Expansion Model

New pages should only be created when the commercial intent is narrower than an existing owner page and needs its own landing experience.

### What qualifies for a new service page

- Clear commercial modifier
- Clear conversion path
- Different CTA or quote logic
- Different trust proof or operational explanation
- Low risk of cannibalizing one of the 3 protected owner pages

### What does not qualify

- Thin synonyms of existing owners
- City + owner keyword duplicates with no different user need
- Pages that only restate an existing product without adding new decision help
- “SEO pages” written mainly to capture search impressions without a distinct booking purpose

### Service-page template

Each new commercial service page should try to include:

- exact owner/support role
- clear H1 that matches the real intent
- short opening answer block
- “who this page is for”
- visible package / quote / route / pickup / marina / duration logic if true
- one primary CTA and one fallback CTA
- trust block with licensing and operator facts
- FAQ that matches visible content
- breadcrumb + service schema where appropriate
- routing links back to the parent owner page when the intent is still broad

## Next Commercial Service-Page Queue

These are the best expansion candidates if Semrush/GSC confirms real commercial demand:

### Tier 1

- `dinner cruise with hotel pickup istanbul`
  - implemented as support page: `/dinner-cruise-with-hotel-pickup-istanbul`
  - goal: pickup-led evening intent with strong CTA to `/istanbul-dinner-cruise`
- `kabatas dinner cruise istanbul`
  - implemented as support page: `/kabatas-dinner-cruise-istanbul`
  - goal: boarding-confidence + dinner booking CTA
- `private yacht departure marina istanbul`
  - likely owner/support: keep guide/support unless demand becomes clearly commercial
  - goal: route users into `/yacht-charter-istanbul`

### Tier 2

- `boat rental istanbul hourly`
  - implemented as support page: `/boat-rental-hourly-istanbul`
- `private dinner cruise for couples istanbul`
  - implemented as support page: `/private-dinner-cruise-for-couples-istanbul`
  - goal: route date-night, honeymoon, and anniversary-style couple intent into the private dinner cluster without rewriting the protected owner body
- `corporate yacht dinner istanbul`
  - implemented as support page: `/corporate-yacht-dinner-istanbul`
- `proposal yacht with photographer istanbul`
  - implemented as support page: `/proposal-yacht-with-photographer-istanbul`
- `team building yacht istanbul`
  - implemented as support page: `/team-building-yacht-istanbul`
- `product launch yacht istanbul`
  - implemented as support page: `/product-launch-yacht-istanbul`

These should only be promoted to dedicated service pages after ownership is checked against:

- `/boat-rental-istanbul`
- `/private-bosphorus-dinner-cruise`
- `/corporate-events`
- `/proposal-yacht-rental-istanbul`

## Page-By-Page Roadmap

### Homepage `/`

Role:

- Brand + commercial routing page.
- Should not try to rank for every keyword.
- Should clearly send users and search engines into Sunset, Dinner, Yacht, Boat Rental, Corporate, Proposal, Private Dinner, and Bosphorus Cruise hub.

Current strengths:

- Strong commercial framing.
- Core booking pages are linked.
- Trust signals exist.
- WebSite and FAQ schema exist.

Risks:

- If homepage tries to own `bosphorus cruise istanbul` too strongly, it can blur with `/bosphorus-cruise`.
- Homepage may receive impressions before money pages and need strong routing.

Roadmap:

- Keep homepage broad but not keyword-stuffed.
- Add homepage title/meta CTR tests after each 28-day GSC review.
- Add clearer internal anchors into the 3 protected owner URLs.
- Add section-level copy that explains `which page to choose` without duplicating full service page content.
- Keep the hero/CTA/blog-index discovery pattern compare-first: broader users should see `/bosphorus-cruise` before they see the narrower owner/support pages or the reservation router.
- Keep `/cruises` catalog-first as well: metadata, H1, and intro copy should stay narrowed around `MerrySails catalog / service pages`, not generic `Istanbul cruise` ownership.
- Monitor if homepage receives queries that should belong to a money page, then add internal links and adjust snippet language.

Priority: High

### `/bosphorus-cruise`

Role:

- Primary generic comparison hub for `Bosphorus cruise Istanbul`.
- Should help users choose sunset vs dinner vs private yacht.

Current strengths:

- Strong hub intent.
- Links to core products and support services.
- FAQ + breadcrumb schema added.
- Upgraded on `2026-04-23` with comparison-led H2s, H3 owner cards, visible price/use-case table, and ItemList schema.

Risks:

- Could cannibalize protected sunset/dinner/yacht pages if headings become too transactional.
- Generic pages are usually the highest cannibalization risk.

Roadmap:

- Keep H1 focused on `Bosphorus Cruise Istanbul`.
- Make H2s comparison-led rather than exact-match transactional.
- Keep the visible comparison table aligned with current price/offer truth.
- Keep `best for`, duration, starting price, privacy level, booking path, and owner URL CTA visible.
- Keep ItemList schema matched to the visible comparison cards/table.
- Use this as internal link target from informational blog posts.

Priority: Very High

### `/cruises`

Role:

- Catalog and all-tours hub.
- Good for users who are undecided or looking at all product options.

Risks:

- Could overlap with `/bosphorus-cruise`.
- Tour slugs under `/cruises/[slug]` may create competing URLs for protected money pages if canonical routing is not strict.

Roadmap:

- Keep `/cruises` as `all experiences` not `best Bosphorus cruise` owner.
- Add ItemList schema if the visible list is stable.
- Ensure each tour card points to canonical owner where applicable.
- Add clearer category filters:
  - Shared cruises
  - Private yachts
  - Events
  - Day tours
- Add intro text that routes commercial users to the 3 owner URLs.

Priority: High

### `/cruises/bosphorus-sunset-cruise`

Role:

- Owner for all direct sunset commercial intent.

Protected handling:

- Do not rewrite main body.
- Improve only title/meta/headings/schema/internal links unless approved.

Roadmap:

- Monitor GSC for:
  - `bosphorus sunset cruise`
  - `sunset cruise istanbul`
  - `istanbul sunset cruise`
  - `bosphorus sunset cruise istanbul`
  - `sunset yacht cruise istanbul`
- If average position is `5-20`, run title/meta CTR test first.
- Ensure H1 contains commercial intent naturally.
- Add supporting internal links from:
  - `/bosphorus-cruise`
  - sunset comparison blog posts
  - what-to-wear post
  - departure points post
  - photography posts
- Keep private sunset intent separate from shared sunset intent.

Priority: Very High

### `/istanbul-dinner-cruise`

Role:

- Owner for shared dinner cruise, Turkish night, package, and pickup-supported evening cruise intent.

Protected handling:

- Do not rewrite main body.
- Improve only title/meta/headings/schema/internal links unless approved.

Roadmap:

- Monitor GSC for:
  - `istanbul dinner cruise`
  - `bosphorus dinner cruise`
  - `dinner cruise istanbul`
  - `bosphorus dinner cruise with turkish night`
  - `istanbul dinner cruise with pickup`
- Ensure private dinner queries route to `/private-bosphorus-dinner-cruise`, not this page.
- Add FAQ/schema only where visible FAQ content matches.
- Add support links from dinner expectation/pricing/comparison blogs.
- Title tests should include price/package clarity only if current package facts remain true.

Priority: Very High

### `/yacht-charter-istanbul`

Role:

- Owner for private yacht charter and high-value private yacht hire demand.

Protected handling:

- Do not rewrite main body.
- Improve only title/meta/headings/schema/internal links unless approved.

Roadmap:

- Monitor GSC for:
  - `yacht charter istanbul`
  - `private yacht charter istanbul`
  - `istanbul yacht rental`
  - `private bosphorus cruise`
  - `private yacht tour istanbul`
  - `bosphorus yacht charter`
- Separate `boat rental` and `yacht charter` in page copy and internal links.
- Add support from price guides and private yacht blogs.
- Ensure quote CTAs capture group size, date, occasion, preferred time, and budget.
- Consider a visible `from EUR 280` trust block if not already prominent enough.
- Use `docs/MERRYSAILS-YACHT-CHARTER-SEMRUSH-BRIEF-2026-04-23.md` for the missing manual Semrush pass before broader yacht content expansion.
- Treat `yacht charter istanbul`, `private yacht charter istanbul`, `istanbul yacht rental`, and `private bosphorus cruise` as the main owner-validation terms.

Priority: Very High

### `/boat-rental-istanbul`

Role:

- Support page for flexible private boat hire.
- Should not steal full luxury charter intent from `/yacht-charter-istanbul`.

Current strengths:

- Strong price ladder.
- Service + FAQ + breadcrumb schema.
- Clear trust and CTA.

Roadmap:

- Expand local modifier coverage lightly:
  - `boat rental Istanbul`
  - `private boat hire Istanbul`
  - `Bosphorus boat rental`
  - `hourly boat rental Istanbul`
  - `boat hire for birthday`
  - `boat rental with captain`
- Add short section comparing boat rental vs yacht charter, linking to yacht owner.
- Add FAQ around captain, fuel, duration, capacity, pickup/departure, catering.
- Semrush can decide if this becomes a larger hub.

Priority: High

### `/corporate-events`

Role:

- Support page for business-led private yacht events.

Current strengths:

- Good `Corporate Yacht Events Istanbul` framing.
- Visible `From EUR 280`.
- Service + FAQ + breadcrumb schema.

Roadmap:

- Expand business modifiers:
  - `corporate yacht event Istanbul`
  - `company dinner Bosphorus`
  - `client hosting Istanbul yacht`
  - `team building yacht Istanbul`
  - `product launch yacht Istanbul`
  - `MICE yacht event Istanbul`
- Add planner-oriented proof:
  - invoice support
  - route timing
  - branding setup
  - A/V possibilities if true
  - menu planning
  - guest capacity ranges
- Keep compare-card H3s and support routing explicit so company intent does not bleed into proposal, private dinner, or generic yacht charter pages.
- Link from corporate blog cluster into this page.

Priority: High

### `/proposal-yacht-rental-istanbul`

Role:

- Narrow support owner for proposal/marriage proposal private yacht intent.

Current strengths:

- Good service specificity.
- Has FAQ and breadcrumb schema.

Risks:

- Schema provider is less unified than newer support pages.
- If copy gets too generic, it can overlap with yacht charter.

Roadmap:

- Harmonize schema provider reference with global organization/travel agency identity.
- Add price or quote truth only if reliable.
- Add visual proof section:
  - roses
  - candles
  - Maiden's Tower / Bosphorus backdrop
  - photographer option
  - private timing
- Keep yacht charter linked as the parent owner path for users still comparing generic private yacht packages.
- Create or refresh one support blog: `How to Plan a Marriage Proposal on the Bosphorus`.

Priority: Medium-High

### `/private-bosphorus-dinner-cruise`

Role:

- Narrow support owner for private dinner intent.
- Should not compete with shared dinner cruise.

Current strengths:

- Clear intent.
- Has FAQ and breadcrumb schema.

Roadmap:

- Harmonize schema provider reference with global identity.
- Add visible differentiation block:
  - Shared dinner cruise = ticketed table + show
  - Private dinner yacht = private vessel + custom dining + flexible plan
- Add private dinner FAQ.
- Link from `/istanbul-dinner-cruise` only in a support/comparison section, not as direct replacement.
- Keep compare-card H3s aligned to related support paths so this page stays narrow and does not absorb shared dinner or generic yacht intent.

Priority: Medium-High

### `/private-events`

Role:

- Broad occasion hub.

Risk:

- Broad hubs can become weak if they do not clearly route to narrower pages.

Roadmap:

- Keep it indexable as an occasion hub only while it routes clearly to narrower pages.
- Add cards for:
  - Yacht charter
  - Proposal
  - Birthday
  - Anniversary
  - Private dinner
  - Corporate
  - Wedding / engagement if true
- Keep H1 broad.
- Use internal links to narrower owner pages instead of trying to rank for all events.

### `/private-tours`

Role:

- Broad private-event-type hub below the yacht charter owner page.

Risk:

- This page can cannibalize `/yacht-charter-istanbul` if title/H1/meta behave like a generic charter owner.

Roadmap:

- Keep title, H1, and FAQ language hub-like rather than exact-match `private yacht charter Istanbul`.
- Route generic private yacht package comparison first to `/yacht-charter-istanbul`.
- Use this page for proposal, private dinner, celebration, and corporate discovery only after the user is already in narrower private-event intent.

Priority: Medium

Priority: Medium

### `/meeting-points/[slug]`

Current state:

- Existing dynamic meeting-point pages are `noindex, nofollow`.
- They contain operationally useful content for sunset/dinner meeting details.

Roadmap decision:

- Keep operational meeting-point pages private/noindex if the exact boarding location can change by reservation.
- Create separate indexable public pages only if content is stable:
  - `/bosphorus-cruise-departure-points`
    implemented as support hub
  - `/kabatas-bosphorus-cruise`
  - `/kurucesme-marina-yacht-charter`
    implemented as support page
  - `/eminonu-bosphorus-cruise`
- Those indexable pages should not expose unstable reservation details.
- They should route users to correct owner pages.

Priority: Medium

## Cannibalization Map

### Cluster A: Sunset vs Dinner vs Private Dinner

Owner rules:

- Shared sunset intent -> `/cruises/bosphorus-sunset-cruise`
- Shared dinner intent -> `/istanbul-dinner-cruise`
- Private dinner intent -> `/private-bosphorus-dinner-cruise`

Watch queries:

- `bosphorus sunset cruise`
- `sunset cruise istanbul`
- `bosphorus dinner cruise`
- `dinner cruise istanbul`
- `private dinner cruise istanbul`
- `bosphorus dinner cruise with turkish night`

Actions:

- If a blog post ranks for direct money intent in positions `5-20`, add stronger CTA/internal link to owner page.
- If two URLs get the same query in GSC, flag as cannibalization.
- Do not create another direct `sunset cruise Istanbul` page.

### Cluster B: Yacht Charter vs Boat Rental

Owner rules:

- Private yacht package intent -> `/yacht-charter-istanbul`
- Flexible boat hire intent -> `/boat-rental-istanbul`
- Price education -> price guide blog, but with strong link to owner page

Watch queries:

- `yacht charter istanbul`
- `private yacht charter istanbul`
- `istanbul yacht rental`
- `boat rental istanbul`
- `private boat hire istanbul`
- `bosphorus yacht rental prices`

Actions:

- Consolidate duplicate singular/plural price articles if GSC shows overlap.
- Use canonical internal linking: price articles should link to `/yacht-charter-istanbul`.
- Keep boat rental as practical/flexible hire, not luxury charter owner.

### Cluster C: Generic Bosphorus Cruise

Owner rules:

- Generic comparison -> `/bosphorus-cruise`
- Full catalog -> `/cruises`
- Direct product query -> product owner page

Watch queries:

- `bosphorus cruise`
- `bosphorus cruise istanbul`
- `best bosphorus cruise istanbul`
- `bosphorus cruise prices`
- `book bosphorus cruise istanbul`

Actions:

- `/bosphorus-cruise` should be the main generic hub.
- `/cruises` should not over-optimize for the same H1/title pattern.
- Blog posts should use comparison or guide modifiers, not exact owner phrasing.

### Cluster D: Corporate and Event Intent

Owner rules:

- Business-led event -> `/corporate-events`
- Personal celebration -> `/private-events` or narrower occasion page
- Proposal -> `/proposal-yacht-rental-istanbul`
- Private dinner -> `/private-bosphorus-dinner-cruise`

Watch queries:

- `corporate yacht event istanbul`
- `company dinner yacht istanbul`
- `birthday yacht istanbul`
- `proposal yacht istanbul`
- `private event yacht istanbul`

Actions:

- Use page-specific internal links.
- Avoid one mega-event page trying to own every occasion.

## Technical SEO Roadmap

### Critical

1. Review snippet issue

- GSC reported `Yorumun birden fazla toplam puanı var`.
- Continue isolating exact URL/schema source.
- Do not emit multiple aggregate ratings for the same main entity/page.
- Keep review/rating schema only where the visible content and entity match.

2. Title/meta CTR sprint

- GSC CTR is weak at `0.4%`.
- Use `28-day` window for title/meta tests.
- Prioritize pages with impressions and average position `5-20`.
- Change one variable at a time where possible.

3. Indexation discipline

- Continue priority indexing queue.
- First priority:
  - `/bosphorus-cruise`
  - `/cruises`
  - `/istanbul-dinner-cruise`
  - `/cruises/bosphorus-sunset-cruise`
  - `/yacht-charter-istanbul`
  - `/boat-rental-istanbul`
  - `/corporate-events`
  - `/proposal-yacht-rental-istanbul`
  - `/private-bosphorus-dinner-cruise`

### High

4. Schema standardization

- Use consistent Organization/TravelAgency identity.
- Prefer stable `@id` references.
- Match FAQ schema to visible FAQ content.
- Use BreadcrumbList on all important pages.
- Add ItemList to hubs only where visible lists exist.

5. Sitemap quality

- Keep static money/support URLs high priority.
- Consider differentiated blog priorities by commercial relevance rather than flat priority.
- Keep `lastModified` accurate.
- Ensure canonical URLs match actual preferred owner pages.

6. Internal link modules

- Build reusable internal link modules:
  - `Choose Your Bosphorus Cruise`
  - `Related Private Yacht Options`
  - `Compare Shared vs Private`
  - `Plan by Occasion`
  - `Departure and Planning Guides`
- Use these modules instead of random inline links.

### Medium

7. Blog card and metadata cleanup

- Existing cleanup for markdown residue should continue.
- Audit title, meta, excerpt, and H1 consistency across blog posts.
- Avoid titles that look like scraped/over-optimized SEO strings.

8. Image SEO

- Replace repeated generic Unsplash images on priority posts.
- Add unique, branded OG/card visuals to commercial support and high-impression blog posts.
- Use descriptive alt text, but do not keyword-stuff.

9. Core Web Vitals

- Audit image sizes for large pages.
- Prefer optimized local images where possible.
- Keep scripts centralized and avoid analytics duplication.

## Content Roadmap

### Keep / Refresh First

These existing content types should be refreshed before creating too many new pages:

- Price guides
- Comparison guides
- Departure point guides
- What-to-expect guides
- Family/kids guide
- What-to-wear guide
- Safety guide
- Private yacht price and planning guides
- Corporate yacht event guide
- Proposal yacht planning guide

### New Page Opportunities

Only create these after checking GSC and Semrush gaps:

1. `Bosphorus Cruise Departure Points` stable public page

- Use for general departure education.
- Do not reveal unstable reservation-specific meeting points.
- Link to sunset/dinner/yacht owner pages.

2. `Kabatas Bosphorus Cruise` local support page

- Only if Semrush/GSC shows demand.
- Must be educational and route to owner pages.

3. `Kurucesme Marina Yacht Charter` local support page

- Good fit for private yacht/local departure intent.
- Must not compete with `/yacht-charter-istanbul`.

4. `Bosphorus Dinner Cruise with Hotel Pickup` support section/page

- Only if query volume is strong.
- Could be a section on dinner owner page first.

5. `Private Yacht Charter Istanbul Prices` consolidated guide

- If current singular/plural pages cannibalize, consolidate into one best price guide.

6. `Best Bosphorus Cruise for Couples`

- Could support sunset and yacht charter.
- Keep romantic intent separate from proposal intent.

7. `Bosphorus Cruise for Families`

- Existing content may already cover this. Refresh before creating new.

8. `Corporate Yacht Event Istanbul Planning Guide`

- Support `/corporate-events`.
- Include planner checklist if operationally true.

9. `Bosphorus Proposal Yacht Checklist`

- Support `/proposal-yacht-rental-istanbul`.
- Include privacy, timing, photographer, decoration, music, route.

### Content To Avoid For Now

- Duplicate exact-match pages for the 3 protected owner intents.
- Thin location pages without stable local information.
- AI-written generic Istanbul listicles with no MerrySails routing.
- Multiple price pages with nearly the same keyword.
- Pages promising exact boarding points, inclusions, or pickup details that can change.

## Semrush Workflow

The user has Semrush, so every keyword expansion should become data-led.

### Competitor Seed Domains

Use these as first Semrush Organic Research / Keyword Gap seed domains. Verify actual overlap in Semrush before treating any as direct competitor.

Direct/local operator and niche sites:

- `merrysails.com`
- `bosphorussunset.com`
- `istanbulbosphorus.cruises`
- `gbosphorus.com`
- `bosphorustour.com`
- `bosphorustours.com`
- `bosforcruise.com`
- `bosphorusnight.com`
- `bosphorusyacht.com`
- `suyat.com.tr`
- `yachtcharterbosphorus.com`
- `luxuryyachtrentalistanbul.com`
- `bosphoruscruise-tickets.com`
- `bosphorusdinnercruise.com`
- `bosphorusdinnercruise.net`
- `bosphorustickets.com`

OTA/marketplace competitors:

- `getyourguide.com`
- `viator.com`
- `tripadvisor.com`
- `headout.com`
- `klook.com`

Use OTAs for keyword discovery and SERP feature understanding, but do not copy their generic content structure directly. MerrySails should win on direct local operator trust, price clarity, and booking support.

### Semrush Exports Needed

Export these columns when possible:

- Keyword
- Search volume
- Keyword difficulty
- Intent
- CPC
- SERP features
- Trend
- Competitor ranking URL
- Competitor position
- Traffic %
- URL
- Country database

### Semrush Country Databases

Start with:

- US
- UK
- Australia
- Canada
- UAE English demand if available
- Global/Worldwide if Semrush plan supports it

Do not start with Turkish unless the strategy changes. Current MerrySails SEO focus is English-first.

### Filters For Commercial Keyword Discovery

Include terms containing:

- `bosphorus`
- `istanbul`
- `cruise`
- `sunset`
- `dinner`
- `yacht`
- `charter`
- `rental`
- `boat`
- `private`
- `price`
- `tickets`
- `book`
- `proposal`
- `corporate`
- `birthday`
- `pickup`

Prioritize:

- Intent: Commercial / Transactional
- KD: low to medium first
- CPC: non-zero is useful signal
- Competitor position: top 20
- MerrySails current position: missing, weak, or `5-20`

Exclude or downgrade:

- ferry/public transport queries
- map/weather/wiki queries
- free/cheap-only searches unless a comparison page handles them
- non-Istanbul yacht charter queries
- generic Turkey boat/yacht queries with weak Bosphorus intent
- adult/party intent not aligned with brand
- competitor brand terms unless used only for learning

### Keyword Ownership Template

For every Semrush keyword, assign:

| Field | Rule |
| --- | --- |
| Query | Exact keyword from Semrush |
| Intent | Sunset, dinner, yacht, boat rental, proposal, corporate, generic, informational |
| Owner URL | One canonical target URL |
| Support URL | Blog/hub if needed |
| Funnel stage | BOFU, MOFU, TOFU |
| SERP type | Local operator, OTA, listicle, Reddit, video, map, AI answer |
| Action | Title test, H1/H2 tweak, internal link, refresh, new page, no action |

If one query maps to two owner URLs, stop and resolve ownership before editing.

## Competitor Pattern Notes

### Bosphorus Sunset Pattern

Source reviewed: [bosphorussunset.com](https://bosphorussunset.com/)

Observed pattern:

- Strong exact-match brand/domain alignment.
- Navigation clusters around sunset cruise, dinner cruise, yacht charter, private organizations, and blog.
- It builds one central Bosphorus vertical, then branches into event/occasion pages.
- It uses direct product pages plus blog/support content.

MerrySails response:

- Do not try to become an exact-match clone.
- Use stronger trust and direct operator positioning.
- Build better page ownership and cleaner UX.
- Use richer guide/entity content and clearer package truth.

### 2M Tesisat Pattern

Source reviewed: [2mtesisat.com.tr](https://2mtesisat.com.tr/)

Observed pattern:

- Homepage reinforces trust, emergency availability, WhatsApp, phone, service categories, and service area coverage.
- Large service tree:
  - water plumbing
  - blockage opening
  - boiler/heating
  - repair/maintenance
  - emergency service
  - district pages
- It turns one local service business into a grid of service x location x urgency pages.

MerrySails response:

- Do not copy plumbing-style location spam.
- Translate the model into:
  - product x occasion
  - product x departure/local
  - product x buyer concern
  - product x price/booking stage
- Example MerrySails grid:
  - sunset cruise x couples
  - dinner cruise x pickup
  - yacht charter x proposal
  - yacht charter x corporate
  - boat rental x hourly
  - Bosphorus cruise x departure points
  - Kurucesme marina x private yacht

### Istanbul Shuttle Line Visual Pattern

Source reviewed: [istanbulshuttleline.com/tr/blog](https://istanbulshuttleline.com/tr/blog)

Observed pattern:

- Blog cards use branded visuals rather than only generic stock photos.
- Cards feel like campaign assets: logo, vehicle/product, city background, title overlay.

MerrySails response:

- Build a visual system for blog and guide cards.
- Use real MerrySails photos for real product/tour pages.
- Use branded editorial composites or AI-assisted backgrounds for guide/blog pages.
- Avoid presenting AI-generated scenes as real tour photos.

## Blog Visual Generation System

### Goal

Make MerrySails blog/guides look like a premium direct operator, not a generic travel blog with repeated Unsplash images.

### Recommended Output Sizes

- Blog card: `1200x800` or `1600x1000`
- Open Graph: `1200x630`
- Social vertical: `1080x1350`
- Optional square: `1080x1080`

### Visual Style Directions

Direction A: Premium Bosphorus Editorial

- Navy, cream, muted gold
- Realistic Bosphorus skyline
- Yacht silhouette or deck detail
- Minimal title overlay added by code, not baked into AI image
- Best for commercial guides and price pages

Direction B: Map + Route Explainer

- Stylized Bosphorus map line
- Landmarks as small icons
- Route ribbon
- Good for departure points, route guides, landmark guides

Direction C: Magazine Card

- Large photo/composite
- MerrySails logo lockup
- Short 3-5 word label
- Category badge: `Guide`, `Prices`, `Private Yacht`, `Dinner`
- Good for blog index cards and social sharing

Direction D: Real Photo Plus Brand Overlay

- Use existing MerrySails real images.
- Add consistent typography, gradient, logo, and title.
- Best for core product support content.

Direction E: AI Background + Programmatic Text

- Generate clean background without text.
- Overlay title, logo, and badge using code.
- Best option for consistency and avoiding AI text artifacts.

### Recommended Implementation

Phase 1:

- Add visual fields to blog data:
  - `cardImage`
  - `ogImage`
  - `imageAlt`
  - `visualBrief`
  - `visualStyle`
  - `imageSource`

Phase 2:

- Create a repeatable image prompt template.
- Generate images for top 20 commercial/support posts first.
- Store final images in `/public/images/blog/...`.
- Update sitemap/OG metadata to use local branded images.

Phase 3:

- Create a programmatic OG/card generator if scale increases.
- Use generated backgrounds and consistent overlay templates.

### AI Image Prompt Template

Use this structure:

```text
Premium editorial travel image for MerrySails, Istanbul Bosphorus at golden hour, elegant private yacht in foreground, soft cinematic light, Dolmabahce Palace and Bosphorus Bridge atmosphere in background, navy and warm gold palette, luxury but authentic, no people close-up, no readable text, no logos, no fake signage, wide composition for blog hero, realistic photography style, high detail, clean negative space for title overlay.
```

For dinner cruise:

```text
Premium editorial travel image for MerrySails, Istanbul Bosphorus dinner cruise at blue hour, elegant yacht dining ambience, warm table lights, Istanbul skyline reflections on water, tasteful Turkish night atmosphere without crowded stage focus, navy and amber palette, realistic photography style, no readable text, no logos, clean negative space for title overlay.
```

For yacht charter:

```text
Premium editorial travel image for MerrySails, private yacht charter on the Istanbul Bosphorus, elegant white yacht cruising near waterfront mansions, golden hour light, privacy and comfort mood, luxury travel photography, navy cream gold color palette, no readable text, no logos, clean negative space for title overlay.
```

For map/guide:

```text
Elegant illustrated travel map of the Istanbul Bosphorus for a cruise guide, simplified route line between European and Asian sides, subtle icons for Dolmabahce Palace, Ortakoy Mosque, Maiden's Tower, Bosphorus Bridge, premium navy and cream palette, editorial magazine style, no readable text, no logos.
```

### Safety Rules For AI Visuals

- Do not imply AI-generated images are actual tour photos.
- Do not create fake customer faces, fake reviews, fake vessel interiors, or fake exact menus.
- Use real operational photos for product galleries where possible.
- Use AI/composite visuals mainly for blog, guide, and social assets.
- Alt text should describe the concept, not pretend to be documentary proof.

## Daily SEO Operating Rhythm

Every daily MerrySails SEO session should run this order:

1. GSC 24 hours

- New impressions
- New URLs receiving impressions
- Sudden CTR or ranking changes
- Fresh indexing signals

2. GSC 7 days

- Weekly winners/losers
- Query shifts by page
- CTR anomalies
- New commercial queries

3. GSC 28 days

- Title/meta decisions
- H1/H2/internal link decisions
- Owner URL mapping
- Cannibalization checks

4. GSC 3 months

- Structural decisions
- Page consolidation
- New page planning
- Content pruning

5. Indexing/rich results

- Indexed/not indexed delta
- Review snippet issue
- FAQ/breadcrumb/schema validations

6. Work queue

- Apply only the highest-confidence change.
- Log what changed and why.
- Avoid random edits without query/page evidence.

## 30-Day Sprint

### Week 1: Technical and Ownership Baseline

Goals:

- Stabilize schema.
- Confirm owner URL map.
- Reduce immediate rich-result risk.
- Prepare Semrush exports.

Tasks:

- Isolate review snippet error by URL/schema source.
- Validate breadcrumb + FAQ schema on priority pages.
- Confirm canonical paths for protected revenue pages.
- Audit title/H1/meta for top 20 indexed pages.
- Create Semrush Keyword Gap export using competitor seed list.
- Build first keyword ownership sheet.
- Identify GSC queries where wrong URL is ranking.

Deliverables:

- Updated issue list.
- Semrush keyword ownership sheet.
- First CTR sprint candidate list.

### Week 2: CTR and Internal Link Sprint

Goals:

- Increase clicks from existing impressions.
- Push authority from discovery posts into owner pages.

Tasks:

- Title/meta test for pages with impressions and CTR weakness.
- Add internal link modules from high-impression blogs/guides to owner URLs.
- Refresh blog cards/excerpts for top discovery posts.
- Add comparison table to `/bosphorus-cruise` if not already present.
- Strengthen `/cruises` as catalog, not generic owner.

Deliverables:

- Updated titles/meta for selected pages.
- Internal link map.
- GSC tracking notes for before/after.

### Week 3: Support Page Expansion

Goals:

- Make support pages rank-worthy without touching protected copy.

Tasks:

- Expand `/boat-rental-istanbul` around hourly/private boat hire modifiers.
- Expand `/corporate-events` around MICE/company/client hosting modifiers.
- Harmonize schema on `/proposal-yacht-rental-istanbul`.
- Harmonize schema on `/private-bosphorus-dinner-cruise`.
- Clarify `/private-events` as occasion hub.
- Keep `/private-tours` below `/yacht-charter-istanbul` for generic private yacht intent.

Deliverables:

- Support page edits.
- Schema validation.
- Updated sitemap/indexing queue.

### Week 4: Blog Consolidation and Visual Pilot

Goals:

- Reduce cannibalization and improve perceived content quality.

Tasks:

- Audit yacht price articles for overlap.
- Audit Bosphorus price/comparison articles for overlap.
- Choose 20 priority blog/guide posts for branded visuals.
- Create visual prompt briefs and alt text.
- Generate or prepare first visual batch.
- Update card/OG images for pilot posts.

Deliverables:

- Cannibalization decisions.
- Visual batch 1 list.
- Updated blog image plan.

## 60-Day Roadmap

Focus:

- Scale what GSC proves.
- Use Semrush to identify missing commercial clusters.
- Build stable local/support pages only when data supports them.

Tasks:

- Create or refresh departure point hub.
- Create Kurucesme Marina private yacht support page if Semrush/GSC validates demand.
- Refresh family/couples/what-to-wear/safety posts around clear owner routing.
- Create corporate planning guide if corporate queries appear.
- Consolidate duplicate price pages.
- Add programmatic visual fields to blog data.
- Expand `llms-full.txt` with best-page-for-query mappings.
- Build weekly reporting template.

Success signals:

- More owner-page impressions.
- Commercial queries begin ranking on intended owner URLs.
- CTR improves from current baseline.
- Indexed priority pages increase.
- Rich result issue decreases or is resolved.

## 90-Day Roadmap

Focus:

- Authority, differentiation, and repeatable publishing.

Tasks:

- Build content clusters only from Semrush/GSC validated gaps.
- Add trust/citation assets:
  - safety page
  - TURSAB/license explainer
  - fleet overview
  - route/landmark entity pages
  - departure guide
- Start backlink/outreach targets:
  - Istanbul travel blogs
  - hotel concierge resource pages
  - wedding/proposal directories
  - event planner resources
  - expat/travel communities
- Improve blog visual coverage.
- Consider multilingual only after English owner URLs stabilize.

Success signals:

- More top 10 long-tail rankings.
- Owner pages move from discovery to commercial click capture.
- Direct operator trust assets start earning citations/backlinks.
- Blog supports booking pages instead of competing with them.

## KPI Dashboard

Track weekly:

- Organic clicks
- Organic impressions
- CTR
- Average position
- Owner page impressions
- Owner page clicks
- Queries in positions `5-20`
- New indexed pages
- Not indexed pages
- Rich-result errors
- Top 10 query/page pairs
- Wrong-URL query matches
- Organic WhatsApp clicks
- Organic phone clicks
- Organic reservation starts
- Organic completed reservation requests

Do not judge SEO only by traffic. For MerrySails, commercial owner-page visibility and qualified lead actions matter more.

## Backlog Priority Matrix

### P0

- Review snippet error isolation
- GSC query-to-owner mapping
- CTR sprint for high-impression low-CTR pages
- Semrush keyword gap export
- Internal links from winning blog/guide pages to owner URLs

### P1

- `/bosphorus-cruise` comparison table and stronger routing
- `/cruises` catalog/schema improvement
- `/boat-rental-istanbul` modifier expansion
- `/corporate-events` planner expansion
- Proposal/private dinner schema harmonization
- Blog visual pilot

### P2

- Departure point stable public page
- Kurucesme Marina support page
- Corporate planning guide
- Proposal checklist guide
- Price guide consolidation
- `llms-full.txt` query-to-page expansion

### P3

- Multilingual expansion
- Large-scale programmatic location pages
- Broad travel listicles
- Aggressive backlink campaigns
- New product pages beyond verified offers

## What I Need From Semrush

When the user is ready, send exports or screenshots for:

1. Keyword Gap:

- `merrysails.com` vs local/operator seed domains.

2. Organic Research:

- Top organic keywords for each direct competitor.

3. Pages:

- Top pages by estimated traffic for each competitor.

4. SERP Features:

- Which keywords trigger FAQ, reviews, images, video, People Also Ask, local pack, or AI-style snippets.

5. Keyword Magic:

- Root terms:
  - `bosphorus sunset cruise`
  - `bosphorus dinner cruise`
  - `yacht charter istanbul`
  - `boat rental istanbul`
  - `private bosphorus cruise`
  - `istanbul yacht rental`
  - `bosphorus cruise prices`
  - `proposal yacht istanbul`

I will then classify keywords into owner URLs and decide whether to edit, refresh, consolidate, or create pages.

## Operating Principle

MerrySails should become the clearest direct local operator result for English Bosphorus cruise demand:

- clearer than exact-match niche sites
- more trustworthy than anonymous OTAs
- more structured than generic travel blogs
- more conversion-ready than informational guides
- more accurate than AI-generated listicles

The way to get there is not uncontrolled content volume. The way is disciplined query ownership, protected product copy, strong support pages, clean schema, strong visuals, and daily GSC-led iteration.
