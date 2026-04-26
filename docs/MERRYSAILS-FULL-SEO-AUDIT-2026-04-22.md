# MerrySails Full SEO Audit

Date: `2026-04-22`
Workspace: `/Users/resat/Desktop/merrysails`

This file is the project-wide SEO operating snapshot for MerrySails. It is meant to be updated across sessions, not treated as a one-off report.

## Executive Read

- MerrySails currently has strong support-content discovery, but weak commercial capture.
- GSC shows visibility is being carried mainly by the homepage, blog posts, and guides rather than the 3 main revenue pages.
- The safest growth path is not heavy body rewrites on the protected money pages.
- The highest-leverage path is:
  - homepage framing
  - commercial support pages
  - `/bosphorus-cruise`
  - `/cruises`
  - blog-to-money-page routing
  - guide-to-money-page routing
  - schema cleanup
  - indexation discipline

## Protected Money Pages

These are protected content assets and should not receive major body rewrites without explicit user approval:

- `/cruises/bosphorus-sunset-cruise`
- `/istanbul-dinner-cruise`
- `/yacht-charter-istanbul`

Safe work on these pages:

- meta title
- meta description
- H1, H2, H3 refinement
- breadcrumb and FAQ schema
- internal-link support
- adjacent support sections

## Current Surface Inventory

- Public route count observed in `src/app`: about `33` page routes
- Base blog content posts: about `113`
- Commercial support posts in `src/content/blog.ts`: `5`
- Guide pages: `12`

This means the site already has enough content depth to rank for long-tail and mid-funnel queries. The current problem is not "lack of pages". The problem is routing authority and converting discovery into commercial page demand.

## GSC Snapshot

Observed in Google Search Console on `2026-04-22`.

### Performance — 3 Months

- Clicks: `22`
- Impressions: about `5K`
- CTR: `0.4%`
- Average position: `18.8`

### Indexing

- Indexed pages: `59`
- Not indexed pages: `103`

### Rich Results

- Review snippet issue visible in GSC
- Reported problem: `Yorumun birden fazla toplam puanı var`

Interpretation:

- the site has discovery but weak SERP click capture
- a large share of the site is still not fully trusted or indexed
- structured-data consistency needs continued cleanup

## Pages Winning Discovery Right Now

Top visibility is currently coming from:

- `/`
- `/blog/what-to-wear-bosphorus-cruise`
- `/blog/bosphorus-cruise-with-kids`
- `/blog/istanbul-hidden-gems-local-guide`
- `/blog/bosphorus-cruise-departure-points`
- `/blog/bosphorus-dinner-cruise-what-to-expect`
- `/guides/istanbul-bosphorus-bridges`

Interpretation:

- support content is doing the heavy lifting
- commercial routing from support content to owner URLs matters more than more random content production
- every strong support page should have a clear next-step path into sunset, dinner, yacht, or a service page

## Core Commercial Ownership Map

Owner URLs should stay strict:

- `sunset cruise` intent → `/cruises/bosphorus-sunset-cruise`
- `dinner cruise` intent → `/istanbul-dinner-cruise`
- `private yacht / yacht charter` intent → `/yacht-charter-istanbul`

Support-owner relationships:

- `boat rental istanbul` → `/boat-rental-istanbul`
- `proposal yacht istanbul` → `/proposal-yacht-rental-istanbul`
- `corporate yacht event istanbul` → `/corporate-events`
- `private dinner cruise` → `/private-bosphorus-dinner-cruise`
- `general comparison / route selection` → `/bosphorus-cruise`
- `full catalog / all options` → `/cruises`

## High-Risk Cannibalization Areas

These clusters need ongoing monitoring. They are not all errors, but they are the most likely places where query ownership can blur.

### Cluster 1: Sunset vs Dinner vs Private Dinner

Pages:

- `/cruises/bosphorus-sunset-cruise`
- `/istanbul-dinner-cruise`
- `/private-bosphorus-dinner-cruise`
- `/blog/bosphorus-sunset-cruise-vs-dinner-cruise`
- `/blog/bosphorus-dinner-cruise-what-to-expect`

Risk:

- shared dinner and private dinner can blur
- sunset comparison articles may steal intent from the sunset owner page

Rule:

- comparison and expectation posts should push intent down to the correct owner page, not compete for direct transactional phrasing

### Cluster 2: Yacht Charter vs Boat Rental

Pages:

- `/yacht-charter-istanbul`
- `/boat-rental-istanbul`
- `/blog/boat-rental-vs-yacht-charter-istanbul`
- `/blog/private-yacht-charter-istanbul-guide`
- `/blog/private-yacht-charter-istanbul-price`
- `/blog/private-yacht-charter-istanbul-prices`

Risk:

- price, guide, and comparison articles can dilute the charter owner page
- singular/plural price pages may overlap

Rule:

- service page owns service intent
- comparison pages own education intent
- price guides own price-intent capture and should route back into the charter owner or the right narrower page

### Cluster 3: Corporate Event Intent

Pages:

- `/corporate-events`
- `/blog/corporate-yacht-events-on-the-bosphorus`
- `/blog/corporate-event-yacht-bosphorus`
- other event-related party pages

Risk:

- company-event intent can drift into generic yacht event content

Rule:

- if the brief is business-led, route the first commercial click to `/corporate-events`

### Cluster 4: Bosphorus Guide / Best Cruise / Prices

Pages:

- `/bosphorus-cruise`
- `/cruises`
- `/blog/best-bosphorus-cruise-istanbul-guide`
- `/blog/bosphorus-cruise-prices-2026`
- `/blog/bosphorus-cruise-departure-points`

Risk:

- too many generic Bosphorus pages can split "bosphorus cruise istanbul" discovery

Rule:

- `/bosphorus-cruise` should be the comparison hub
- `/cruises` should be the full catalog hub
- generic blog guides must support those two hubs, not compete with them

## Technical Findings

### Already Improved

- duplicate homepage organization schema conflict reduced
- support/service pages received breadcrumb and FAQ improvements
- indexing queue now prioritizes owner URLs and top support URLs

### Active Technical Risks

- review snippet error still visible in GSC
- some content data contains markdown-link residue in title/meta/excerpt fields
- blog and guide surfaces are large enough that title and excerpt hygiene matters across many cards, metadata outputs, sitemap outputs, and AI index outputs

### Data Quality Issues Found

Examples found in source:

- markdown links in blog titles
- markdown links in blog meta descriptions
- markdown links in excerpts

Impact:

- ugly visible titles in cards or H1s
- degraded metadata quality
- low-trust snippets in XML or AI-facing text outputs

## Content Architecture Assessment

### What Is Good

- broad topical depth already exists
- route support is strong
- many articles are commercially aware and already route toward booking pages
- footer and support modules already provide internal linking surface

### What Is Weak

- commercial ownership is not yet strict enough everywhere
- generic discovery posts are outperforming money pages
- some guide and blog surfaces still behave like isolated content rather than part of a funnel
- indexation backlog is still too high

## Page-Type Priorities

### Tier 1 — Immediate

- homepage
- `/bosphorus-cruise`
- `/cruises`
- `/boat-rental-istanbul`
- `/corporate-events`
- `/private-bosphorus-dinner-cruise`
- `/proposal-yacht-rental-istanbul`

### Tier 2 — Support Funnel

- `/guides`
- guide detail pages that already get impressions
- blog hub
- blog posts ranking in positions `5-20`

### Tier 3 — Expansion

- meeting-point pages
- local/boarding/departure pages
- broader local SEO landing pages
- new commercial comparison pages only after current owner routing is clean

## Daily Operating Loop

Every meaningful SEO session should read:

1. `24 hours`
2. `7 days`
3. `28 days`
4. `3 months`

What to capture each time:

- first-impression URLs
- newly indexed URLs
- pages with impressions but weak CTR
- commercial queries in positions `5-20`
- owner URL mismatches
- rich-result regressions

## 14-Day Execution Plan

### Phase 1 — Stabilize Sitewide SEO Signals

- continue schema cleanup
- resolve visible text hygiene issues in blog and guide rendering
- keep sitemap and AI-facing outputs clean
- keep owner URLs at the top of the indexing queue

### Phase 2 — Strengthen Commercial Routing

- improve internal links from top-impression blog posts into owner URLs
- improve internal links from top-impression guides into owner URLs
- strengthen `/bosphorus-cruise` as the comparison hub
- strengthen `/cruises` as the full commercial catalog hub

### Phase 3 — Convert Support Pages Into Better Commercial Bridges

- expand support-page H2/H3 logic
- improve FAQ precision
- tighten service-page first paragraphs around intent
- keep the main money-page body content protected

### Phase 4 — Content Pruning and Cannibalization Control

- review singular vs plural price-guide overlap
- review similar yacht-guide overlap
- review dinner/support overlap
- merge, de-emphasize, or reroute only when GSC confirms query conflict

## Semrush Workflow For Commercial Keywords

Semrush should be used manually by the user and fed into this repo workflow. Do not automate Semrush access.

Best input format for future sessions:

- keyword
- country
- volume
- keyword difficulty
- intent
- current target URL
- top 3 ranking competitor URLs

Recommended commercial keyword examples to collect first:

- `bosphorus dinner cruise`
- `istanbul dinner cruise`
- `yacht charter istanbul`
- `private yacht charter istanbul`
- `boat rental istanbul`
- `bosphorus sunset cruise`
- `private dinner cruise istanbul`
- `proposal yacht istanbul`
- `corporate yacht event istanbul`
- `bosphorus cruise prices`

Best way to send Semrush findings into the session:

- paste a compact table into chat
- or save a CSV / sheet with columns:
  - `keyword`
  - `volume`
  - `KD`
  - `intent`
  - `current URL`
  - `best competitor URL`
  - `notes`

## Immediate Next Safe Tasks

- keep GSC review going across the 4 time windows
- continue rich-result debugging on the exact URLs GSC flags
- strengthen routing from high-impression blog and guide pages
- improve hub pages before creating many new pages
- only create new commercial pages after current ownership is cleaner

## Decision Rules

- if a page is already informative and trusted, do not rewrite it just to insert keywords
- if a query has one clear commercial owner, do not split it across multiple pages
- if GSC shows impressions but poor CTR, improve title/description/H1 before writing a whole new page
- if support content ranks but money pages do not, improve routing and internal links before expanding the blog again
