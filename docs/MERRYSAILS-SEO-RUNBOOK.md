# MerrySails SEO Runbook

This file is the ongoing SEO operating playbook for MerrySails sessions.

## Session Rules

- Prefer token-efficient work: audit precisely, change only the highest-leverage surfaces, and avoid re-reading or re-explaining stable context unless something materially changed.
- The 3 protected revenue pages keep their hand-written main explanatory body copy unless explicit approval is given for deeper content edits.
- Pull GSC once per day by default. Use that daily snapshot as the source of truth for the session unless there is a specific reason to re-check later the same day.
- Grow new SEO capture mainly through commercial service pages, support pages, guides, and local-support assets rather than rewriting the protected core pages.
- On new service-page work, keep CTA clarity, trust/E-E-A-T, routing, and owner-URL discipline ahead of word count.

## Scope

Protect the main user-facing explanatory quality of these 3 pages:

- `/cruises/bosphorus-sunset-cruise`
- `/istanbul-dinner-cruise`
- `/yacht-charter-istanbul`

Push harder SEO changes mainly through:

- homepage
- `/bosphorus-cruise`
- `/cruises`
- service pages
- blog
- guides
- local/supporting pages
- schema and internal linking

## GSC Review Rhythm

Read these windows in the daily GSC review:

1. `24 hours`
2. `7 days`
3. `28 days`
4. `3 months`

Interpretation:

- `24 hours`: fresh impressions, new URLs, indexing signs, sudden changes
- `7 days`: recent trend changes, quick wins, new content pickup
- `28 days`: default decision window for SEO edits
- `3 months`: strategic direction and structural gaps

## Current GSC Snapshot

Observed on `2026-04-22`:

- `3 months`: `22 clicks`, about `5K impressions`, `0.4% CTR`, average position `18.8`
- Indexed pages: `59`
- Not indexed pages: `103`
- Rich-result problem: review snippet issue, `Yorumun birden fazla toplam puanı var`

Current visibility is being carried more by:

- homepage
- blog posts
- guides

This means:

- supporting content is currently the discovery layer
- core product pages should be supported, not heavily rewritten
- internal linking and service-page structure are high-leverage opportunities

## Current Workstreams

### 1. Rich Result Cleanup

- Remove duplicate aggregate-rating conflicts
- Keep one coherent review/aggregate-rating story
- Recheck GSC review snippet status after deployment

Status update `2026-04-23`:

- Local code search shows no active `aggregateRating`, `reviewRating`, or `ratingValue` JSON-LD in `src/app` or `src/components`.
- Visible review counts still exist in tour UI, but they are not currently emitted as review schema.
- Next validation step after deployment: recheck GSC Review Snippets report and Rich Results Test for affected URLs.

### 2. Homepage and Hub Ownership

- Strengthen homepage as the main Bosphorus authority/comparison entry
- Strengthen `/bosphorus-cruise` as a comparison hub
- Improve internal routes into sunset, dinner, yacht, boat rental, proposal, and corporate pages

### 3. Service Page Expansion

Priority pages:

- `/boat-rental-istanbul`
- `/corporate-events`
- `/private-events`
- `/private-tours`
- `/proposal-yacht-rental-istanbul`
- `/private-bosphorus-dinner-cruise`

Goals:

- stronger keyword ownership
- cleaner H1-H2-H3 structure
- FAQ and breadcrumb support
- better internal linking from blog/guides/home

### 4. Blog and Guide Support Layer

- Identify blog/guide pages receiving impressions but weak monetization value
- Route authority toward owner URLs with natural anchors
- Add or improve contextual links into core and service pages
- Apply `docs/MERRYSAILS-CONTENT-QUALITY-GUARDRAILS-2026-04-23.md` before new content or manual indexing
- Use `docs/MERRYSAILS-SERP-RANK-CHECK-RUNBOOK-2026-04-23.md` and `data/serp/merrysails-serp-rank-tracking-keywords-2026-04-23.csv` for weekly rank checks
- Use `docs/MERRYSAILS-CONTENT-TREE-INDEXATION-AUDIT-2026-04-23.md` before indexation, sitemap, or owner-URL changes
- Use `docs/MERRYSAILS-YACHT-CHARTER-SEMRUSH-BRIEF-2026-04-23.md` before manual Semrush work on yacht/private intent

Status update `2026-04-23`:

- Legacy repeated `expertQuote` snippets are now rendered as `MerrySails field note` blocks instead of named third-party expert endorsements.
- The remaining content QA backlog is to rewrite/remove repeated quote text in the source data, starting with GSC-visible blog posts.
- Homepage, FAQ, blog metadata, and priority commercial guides were cleaned of unsupported review-count, guest-count, "highest-rated", and fake direct-source quote claims where found in the first QA pass.
- GSC API access works through the local service account for `sc-domain:merrysails.com`.
- `next.config.ts` redirect ownership was fixed so `/bosphorus-cruise` remains the generic Bosphorus owner hub and old dynamic dinner/yacht URLs consolidate to their top-level owner pages.
- `/bosphorus-cruise` was upgraded from a light routing page into the generic Bosphorus cruise decision hub with comparison-led H2s, H3 owner cards, visible price/use-case table, and matching ItemList schema.
- `/reservation` should stay `noindex, follow`: it is a booking router and reservation lookup surface, not a Google landing page for product keywords.
- `/yacht-charter-istanbul` now has stronger exact-intent ownership in title/meta/schema/support H2 copy, and the missing Semrush work now has a dedicated manual brief.
- `/private-tours` was repositioned as a private-event-type hub instead of a generic private yacht charter owner, with title/H1/FAQ language now routing pure charter intent to `/yacht-charter-istanbul`.
- `/private-events`, `/corporate-events`, `/proposal-yacht-rental-istanbul`, and `/private-bosphorus-dinner-cruise` now use cleaner compare-card H3 structure so support-page heading hierarchy and internal routing are more explicit.
- `/boat-rental-istanbul` now covers the missing support-layer basics from the roadmap: a visible `boat rental vs yacht charter` section, expanded FAQ coverage for departures/duration/add-ons, and H3-based compare routing.
- `/contact` now works as a stronger conversion router with direct links into sunset, dinner, yacht charter, and boat rental paths plus a visible request-quality checklist.
- `/contact` was further expanded to cover proposal, private dinner, corporate, and private-event support owners, and the noindex `/reservation` CTA was removed from the contact helper block.
- `/private-events` no longer leaks proposal intent in title/description/schema; proposal ownership stays on `/proposal-yacht-rental-istanbul`.
- `/private-tours` no longer dumps users into broad dynamic `/cruises/*` private/event pages; it now routes directly to the intended top-level owner/support URLs.
- The generic blog sidebar CTA now routes to `/bosphorus-cruise` instead of `/cruises`, so informational traffic is pushed toward the comparison owner hub.
- `/cruises` schema is now page-local instead of leaking from the shared layout into all child tour URLs.
- Overlapping dynamic support slugs for proposal, corporate, and private dinner now redirect to their top-level owner pages and are excluded from the sitemap.
- `llms.txt` and `llms-full.txt` now stay publicly fetchable but carry `X-Robots-Tag: noindex, follow`.
- Yacht-related blog support content was tightened so it stops competing as aggressively with `/yacht-charter-istanbul`: the main private-yacht planning guide, luxury-yacht planning guide, pricing guide, proposal planning guide, and luxury-experience guide now use narrower titles/meta/keywords and route live buying intent back to the owner or occasion-specific page.
- A new support post, `private-yacht-departure-points-istanbul`, now explains marina confirmation and boarding logic without turning departure intent into a misleading generic owner page.
- Homepage and discovery modules were also softened: `LatestBlogPosts`, the Bosphorus guide shortcuts, and footer blog links now prioritize comparison, dinner-expectation, and departure-planning content instead of repeatedly amplifying broader yacht-commercial articles.
- `src/content/blog.ts` now keeps `boat-rental-vs-yacht-charter-istanbul` concentrated inside yacht-relevant discovery instead of repeatedly surfacing it for `cruise-guide`, `istanbul`, and `tips` categories.
- `bosphorus-family-cruise-kids-guide` and `best-bosphorus-cruise-istanbul-guide` were softened again on title/keyword/excerpt positioning so they support `/bosphorus-cruise` without pulling as hard on the broad generic query.
- `private-yacht-charter-istanbul-prices`, `bosphorus-dinner-cruise-booking`, `istanbul-sunset-cruise-booking`, and `bosphorus-cruise-with-kids` were tightened into support/planning roles: softer exact-match keywording, fresher `dateModified`, and clearer first-click routing back to the protected owner pages.
- `bosphorus-sunset-cruise-istanbul` and `private-yacht-charter-istanbul-price` were softened in the same way so sunset/yacht support posts explain timing and price logic without trying to act like the primary owner URLs.
- Continue scanning lower-priority blog clusters before requesting manual indexing for those URLs.

### 5. Indexing Queue

Current queue source:

- [data/urls-to-index-today.txt](/Users/resat/Desktop/merrysails/data/urls-to-index-today.txt:1)

Preferred priority order:

- `/bosphorus-cruise`
- `/istanbul-dinner-cruise`
- `/cruises/bosphorus-sunset-cruise`
- `/yacht-charter-istanbul`
- service pages
- home, blog, and guides support pages

## Daily Session Checklist

1. Read GSC `24h`, `7d`, `28d`, `3m`
2. Note fresh indexing or first-impression URLs
3. Note commercial queries in positions `5-20`
4. Confirm the right owner URL is receiving impressions
5. Check rich-result and indexation issues
6. Run `npm run seo:rank-monitor` when GSC exports/API access are available
7. Make the smallest safe SEO changes with the best leverage
8. Refresh the indexing queue when needed

## Safe Change Boundaries

Usually safe:

- meta titles
- meta descriptions
- homepage framing copy
- service page H1, H2, H3
- support blocks and comparison sections
- internal links
- FAQ, breadcrumb, and service schema
- sitemap/indexing workflow

Use extra caution:

- core product body copy
- package descriptions
- operational statements that affect booking accuracy

## Recent Support-Post Positioning

- `bosphorus-cruise-for-couples` was repositioned as a couples-planning guide with clearer routing toward `/cruises/bosphorus-sunset-cruise`, `/istanbul-dinner-cruise`, `/yacht-charter-istanbul`, and `/proposal-yacht-rental-istanbul`.
- `istanbul-cruise-booking-tips` was tightened into a direct-booking support guide that tells users to choose the right owner URL first instead of treating `book bosphorus cruise` as one generic commercial page.
- `corporate-events-yacht-istanbul` and `istanbul-corporate-yacht-event-booking` were both softened into planning/support roles so the main `/corporate-events` page keeps the stronger corporate-event ownership.
- `istanbul-dinner-cruise-price-guide-2026` was narrowed into a package-ladder explainer with explicit routing back to `/istanbul-dinner-cruise` for the live shared-offer flow.
- `istanbul-proposal-yacht-cruise` was tightened into a proposal-planning explainer and now explicitly routes live proposal intent to `/proposal-yacht-rental-istanbul`.
- `party-boat-istanbul`, `istanbul-cruise-for-groups`, `bosphorus-cruise-groups-istanbul`, and `group-bosphorus-cruise-guide` were all pulled toward planning/comparison roles with clearer routing to `/private-events`, `/corporate-events`, or `/yacht-charter-istanbul`.
- `birthday-party-boat-istanbul` no longer leaks to `/private-tours`; its main CTA now routes to `/yacht-charter-istanbul`, `/private-events`, or `/corporate-events` depending on the event fit.
- `party-boat-istanbul-birthday` was also repositioned as a birthday-planning support post, with clearer owner routing toward `/private-events`, `/yacht-charter-istanbul`, and `/corporate-events` instead of acting like a broad party-boat commercial page.
- `yacht-rental-istanbul-prices` now behaves as a quote-explainer asset rather than a quasi-owner page, and its route/booking sections now hand live intent back to `/yacht-charter-istanbul` or the relevant narrower occasion page.
- `luxury-yacht-bosphorus-experience` was tightened into a premium-brief guide, reducing broad luxury-owner pressure while keeping the article useful for comfort, dining, and service-level planning.
- `istanbul-boat-party-private` and `corporate-boat-hire-istanbul` were narrowed again so celebration demand routes back to `/private-events` and company demand routes back to `/corporate-events`.
- Homepage discovery was also cleaned: the Bosphorus guide section no longer pushes the broad yacht-pricing support post as a primary path and now links directly to `/yacht-charter-istanbul`.
- `relatedPosts` integrity was cleaned again: the stale `best-time-bosphorus-cruise-istanbul` typo and the mistaken `boat-rental-istanbul` service-page reference were removed from blog recommendation arrays.
- Support-to-support loops were reduced in the birthday, night-cruise, and corporate-yacht clusters so recommendation cards point outward to healthier adjacent guides instead of repeatedly bouncing users between near-duplicate support posts.
- `contact` now reinforces the licensed Istanbul-operator cluster with direct links to `/tursab` and `/about`, and `tursab` now links users back into the main owner/support paths instead of behaving like a dead-end trust page.
- Blog discovery no longer relies on arbitrary first-post ordering: the blog index featured card and planning-read modules now use an explicit whitelist of safer comparison/planning posts instead of defaulting to the broadest foundational guide.
- `/guides` now routes landmark visitors first toward `/bosphorus-cruise`, `/cruises/bosphorus-sunset-cruise`, `/istanbul-dinner-cruise`, and `/yacht-charter-istanbul`, while its supporting article shelf is curated to boarding/comparison/planning posts instead of generic category slices.
- `/faq` now acts as a cleaner routing surface by linking users directly into the Bosphorus hub and the three core owner paths, with the trust/quote path reinforced through `/tursab` and `/contact`.
- Homepage `LatestBlogPosts` and footer blog highlights were tightened again so sitewide internal-link equity now favors comparison and departure-planning guides instead of broader `best-*` commercial-support posts.
- `/corporate-events` metadata and above-the-fold messaging are now quote-led and event-brief-led rather than behaving like a second `from EUR 280` yacht-package owner.
- `/yacht-charter-istanbul` metadata and intro were narrowed again so the page owns charter intent more cleanly without trying to absorb proposal, dinner, and corporate modifiers in the main metadata layer.
- `sitemap.xml` now uses the fresh content date for `/private-tours`, `/guides`, `/about`, `/contact`, `/faq`, and guide detail URLs instead of stale hard-coded dates.
- `indexnow.ts` now includes the Bosphorus compare hub, core owners, main service pages, and `/tursab` in its static URL set so whole-site push jobs cover the real commercial/public surface area.
- A ninth narrow corporate support page, `/product-launch-yacht-istanbul`, now separates launch/showcase-led company intent from the broader `/corporate-events` owner so reveal-timing and launch-night logistics do not have to compete with every other company brief on one page.
- Trust/discovery surfaces were tightened again: the footer support-links block now highlights the current high-intent support stack (pickup, proposal-photo, corporate dinner, team-building, departure logic) instead of the older generic service-page set.
- `/about` now uses the exact Merry Tourism / TURSAB entity facts from shared constants and its support-routing column points to the current narrower support/event routes rather than the older private-router mix.
- `llms.txt` and `llms-full.txt` were expanded again so AI systems see the current support-page stack, the compare hub, and the public departure/trust surfaces as the preferred routing and citation layer.
- A new dinner-local support page, `/dinner-cruise-pickup-sultanahmet-taksim`, now captures Sultanahmet, Taksim, Sirkeci, and Karakoy pickup-fit intent without turning the protected `/istanbul-dinner-cruise` page into a long transfer FAQ.
- The new central-pickup page is wired into `commercial-intents`, sitemap, IndexNow, contact, FAQ, guides, homepage discovery, footer, `llms.txt`, and `llms-full.txt`; it should be monitored as a narrow support URL under `/dinner-cruise-with-hotel-pickup-istanbul` and the dinner owner.
- Homepage support discovery was tightened once more: the support-card strip now highlights dinner-pickup, proposal-photo, corporate-yacht-dinner, client-hosting, and departure-logic modifiers, while the `Why Us` secondary CTA now routes narrow briefs toward `/contact` instead of the older private-router hub.
- Blog discovery cleanup continued: `BlogIndexClient` now references the live `corporate-yacht-events-on-the-bosphorus` slug instead of the stale corporate-event planning slug, preventing a silent missing-card gap on the blog index.
- Category routing for `events` is no longer purely corporate-biased. Generic event fallback now gives room to `/private-events` and `/proposal-yacht-rental-istanbul` alongside `/corporate-events`, while the generic copy now tells users to separate private celebrations from company-led briefs before requesting a quote.
- `yacht-guide` high-intent fallback no longer injects the corporate-event article as a default yacht-planning recommendation; it now leans on boat-rental comparison, proposal planning, and private-yacht departure logic first.
- Homepage/blog discovery hierarchy was tightened again: the homepage support-strip now includes dinner pickup, hourly boat rental, proposal-photo, corporate-yacht-dinner, and departure logic, while `LatestBlogPosts` now surfaces broader owner pages before narrower proposal/corporate support modifiers.
- `/faq` now includes a dedicated `Kabatas Dinner Support` route card, which gives dinner-boarding modifiers a safer discovery surface without pushing them into the protected dinner owner copy.
- `/guides` and guide detail pages now use a newer reading stack: departure, dinner-what-to-expect, proposal planning, and corporate-yacht/event explainers are favored over older broad `best-*` style reads, and `kurucesme-marina` now has its own yacht-support article mix.
- `contact` was re-weighted again so its main secondary grid now favors the newer exact-match support pages first, while broader support owners are demoted into a smaller tag-style row.
- `/bosphorus-cruise` now treats pickup, Kabatas boarding, hourly rental, proposal-photo, company dinner, and departure logic as the main narrow follow-up routes; broader support owners sit in a secondary row instead of competing inside the main modifier grid.
- `private-tours` now points to the newer narrow private-event support pages first, including proposal-photo, couples private dinner, corporate yacht dinner, client hosting, and team building.
- `/cruises` catalog copy was narrowed once more so the page describes itself explicitly as a browse catalog rather than a primary destination for generic cruise demand.
- `/cruises` also lost its bottom `CommercialIntentSection` expansion, so the catalog URL now behaves more like a utility browse page and less like a second discovery hub.
- Homepage `LatestBlogPosts` was tightened again: broader proposal/corporate owners now appear before narrower support modifiers, and the shortcut set now includes dinner-pickup support instead of leaning on the older broad private-dinner owner.
- Support-owner compare blocks were refreshed again: `corporate-events`, `boat-rental-istanbul`, `private-bosphorus-dinner-cruise`, and `proposal-yacht-rental-istanbul` now lean more on the newer narrow support stack such as proposal-photo, couples private dinner, boat-rental-hourly, and corporate-yacht-dinner instead of repeatedly defaulting to older broad support owners.
- The homepage Bosphorus guide card for service/custom briefs now routes to `/private-tours` instead of collapsing multiple service intents into `/private-events`, and its quick links now lean more on owner pages plus safer comparison/boarding guides.
- Two new indexable local-support guides were added: `/guides/kabatas-pier` for dinner-cruise boarding logic and `/guides/karakoy-waterfront` for sunset-cruise meeting-flow context.
- The guides cluster is no longer framed as landmark-only; `/guides` and guide detail UI now explicitly cover landmark, boarding, and waterfront-location intent so local-support pages fit the cluster naturally.
- Guide article schema `dateModified` was refreshed to `2026-04-23` so the expanded guide layer does not keep broadcasting a stale March timestamp.
- `/faq` now carries narrower route cards for dinner pickup and departure-logic questions, so question-led users can reach the right support URL without forcing those modifiers into the protected owner pages.
- `/guides` now has a dedicated boarding-support block for Kabatas dinner, dinner pickup, and Kurucesme marina logic; these pages are intentionally framed as secondary support routes, not first-click owners for broad demand.
- `/blog` now puts `/bosphorus-cruise` first in its booking-page box and adds explicit shortcut cards for pickup-led, hourly private-hire, and corporate-hosting/dinner modifiers.
- Blog detail “Explore Core Cruise Pages” and the homepage CTA strip/hero now also surface `/bosphorus-cruise` more prominently, so broader readers and homepage entrants get a compare-first path before they fall into a specific owner or the reservation router.
- `/cruises` was narrowed again into a real catalog page: title/meta/H1/H2 language now says catalog/service pages rather than trying to own generic `Istanbul cruise` demand.
- The global header now leads with the compare-safe `/bosphorus-cruise` route as `Cruises`, so sitewide nav no longer makes sunset/dinner/yacht the first click for every undecided user.
- Homepage guide shortcuts were refreshed again: narrower shortcuts now lean more on proposal-with-photographer, client-hosting, hourly boat rental, and corporate-yacht-dinner support routes where that intent is already specific.
- Three body-level blog links now hand off cleaner to the newest support URLs: proposal-photographer, Kurucesme marina, and client-hosting support each gained a stronger exact-match contextual link inside the relevant planning article body.
- `commercialIntents` was corrected so the generic `/bosphorus-cruise` hub and the core `/istanbul-dinner-cruise` owner are present in the source of truth. Compact intent modules now sort core owners before service/support URLs instead of letting narrower support pages surface first by accident.
- `/cruises/layout.tsx` metadata was narrowed to a catalog role as well, so the layout layer no longer broadcasts broad `Bosphorus cruise Istanbul` ownership above the already-softened `/cruises` page.
- `BlogRoutingPanel` now uses route-aware helper copy: compare hubs, planning guides, and booking/support pages are described differently instead of everything being labeled like a generic service page.
- `RelatedPosts` fallback is now source-of-truth-driven: it first uses curated high-intent/planning slugs for the current category before falling back to generic same-category posts. That keeps blog discovery more owner-safe and reduces random support-post loops.
- `about` was tightened into a cleaner entity/trust page: unsupported guest-count/rating/tour-count stats were removed and replaced with verified operating-history, licensing, language, and owner-path signals.
- `private-tours` was tightened as a routing hub rather than a pseudo-owner: duplicate support links were reduced and FAQ copy now avoids unsupported package-specific claims.
- `llms.txt` and `llms-full.txt` now explicitly surface `/about`, `/tursab`, `/contact`, and the boarding/waterfront guides as citation-friendly AI routing surfaces.
- Global discovery was tightened again: header navigation now emphasizes the three owner pages plus the Bosphorus compare hub, while homepage CTA/TourGrid buttons route broad intent to `/bosphorus-cruise` instead of `/cruises`.
- The homepage “Why Us” support-shortcut block was reduced so it points first to the Bosphorus compare hub and only secondarily to the private-event router.
- A new narrow commercial service page, `/dinner-cruise-with-hotel-pickup-istanbul`, now captures pickup-led dinner intent without forcing the protected `/istanbul-dinner-cruise` page to own every pickup qualifier directly.
- That pickup page is wired into `commercial-intents`, the sitemap, `/contact`, `/faq`, and the `Kabatas` guide so hotel-pickup questions can route through a CTA-rich support surface before the final dinner owner decision.
- A second narrow commercial service page, `/corporate-yacht-dinner-istanbul`, now captures dinner-led company-event demand without making `/corporate-events` carry every narrower `corporate dinner` modifier directly.
- Blog detail CTA, guide detail CTA, and several guide/home discovery modules were tightened again so broad users now route to `/bosphorus-cruise` more consistently instead of falling back to `/cruises`.
- A third narrow commercial support page, `/kabatas-dinner-cruise-istanbul`, now captures Kabatas-side dinner boarding intent without forcing the protected dinner owner page or the local guide layer to absorb every Kabatas modifier directly.
- `/contact` was reorganized into `core owner pages first` and `narrower support pages second`, reducing the old mini-directory pattern while still leaving specific support routes reachable.
- A fourth narrow commercial support page, `/boat-rental-hourly-istanbul`, now captures hourly private-hire demand without forcing `/boat-rental-istanbul` to own every `per hour` modifier directly.
- A fifth narrow commercial support page, `/private-dinner-cruise-for-couples-istanbul`, now captures quieter couple-led private dinner intent without forcing `/private-bosphorus-dinner-cruise` to own every date-night, honeymoon, and anniversary-style modifier directly.
- A sixth narrow commercial support page, `/proposal-yacht-with-photographer-istanbul`, now captures photographer-led proposal modifiers without forcing `/proposal-yacht-rental-istanbul` to own every media-specific reveal query directly.
- A seventh narrow commercial/local support page, `/kurucesme-marina-yacht-charter`, now captures marina-led private-yacht departure intent without forcing `/yacht-charter-istanbul` or the broader Kurucesme guide to own every departure-specific charter query directly.
- An eighth narrow commercial support page, `/team-building-yacht-istanbul`, now captures team-building-led company demand without forcing `/corporate-events` to own every narrower group-connection modifier directly.
- A new public support hub, `/bosphorus-cruise-departure-points`, now centralizes stable departure logic for dinner, sunset, and private-yacht products without exposing unstable reservation-only meeting details.
- Breadcrumb and crawl routing were tightened again: `/istanbul-dinner-cruise`, `/yacht-charter-istanbul`, and dynamic `/cruises/[slug]` pages now route breadcrumb authority through `/bosphorus-cruise` instead of `/cruises`, and the footer no longer repeats the broad `Cruise Catalog` link sitewide.
- `/cruises` remains a utility catalog, but its sitemap weight was reduced so it behaves more like a secondary browse page than a near-owner commercial node.
- A tenth narrow dinner support page, `/turkish-night-dinner-cruise-istanbul`, now captures `Turkish night` / show-led shared-dinner intent without forcing the protected `/istanbul-dinner-cruise` owner to absorb every entertainment-led modifier directly.
- That Turkish-night page is wired into `commercial-intents`, the sitemap, `IndexNow`, `/contact`, `/faq`, `/bosphorus-cruise`, homepage support discovery, footer support links, and the dinner-owner compare block so the modifier launches with real discovery instead of waiting for blog leakage.
- `dinner-cruise-with-hotel-pickup-istanbul` and `kabatas-dinner-cruise-istanbul` now include visible decision tables that separate transfer-led, Kabatas-led, Turkish-night-led, and private-dinner-led shared-evening intent instead of making users infer the differences from generic prose.
- `/boat-rental-istanbul` was expanded around the `private boat hire Istanbul` modifier in visible copy, metadata, and a new decision table, reinforcing it as the broader flexible-hire owner while keeping `/boat-rental-hourly-istanbul` as the narrower hour-led support page.
- A new sunset support page, `/sunset-cruise-tickets-istanbul`, now captures ticket-led shared-sunset intent without creating another broad `sunset cruise Istanbul` owner. It sits under the protected sunset owner and clarifies the current EUR 34 / EUR 40 public ladder plus the reserve-direct path.
- That sunset-ticket page is wired into `commercial-intents`, the sitemap, `IndexNow`, `/contact`, `/faq`, `/guides`, the homepage support strip, the Bosphorus compare hub, footer support links, and `llms.txt`, so the sunset modifier launches with multiple discovery surfaces rather than waiting for organic leakage.
