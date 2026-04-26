# MerrySails Content Tree & Indexation Audit - 2026-04-23

## Purpose

This file maps the current MerrySails route tree into SEO roles so future edits do not create keyword cannibalization or accidental thin indexed pages.

## Money Pages

These are the core revenue URLs. Keep the owner mapping strict.

| Intent | Owner URL | Status |
|---|---|---|
| Generic Bosphorus cruise / boat tour | `/bosphorus-cruise` | Index, sitemap, high priority |
| Sunset cruise | `/cruises/bosphorus-sunset-cruise` | Index, sitemap, protected body copy |
| Dinner cruise | `/istanbul-dinner-cruise` | Index, sitemap, protected body copy |
| Yacht charter | `/yacht-charter-istanbul` | Index, sitemap, protected body copy |

## Commercial Support Pages

These can be expanded more aggressively than the protected core pages.

| Page | Role | SEO Use |
|---|---|---|
| `/boat-rental-istanbul` | flexible private hire | Support `boat rental istanbul`, `rent a boat istanbul` |
| `/private-bosphorus-dinner-cruise` | private dinner intent | Support private dinner searches without overloading the shared dinner page |
| `/proposal-yacht-rental-istanbul` | proposal / romantic charter | Support proposal intent and wedding-adjacent searches |
| `/corporate-events` | business event charter | Support corporate event / team dinner / client hosting intent |
| `/private-events` | private celebration support | Support birthday, anniversary, celebration pages |
| `/private-tours` | broader private tour discovery | Keep below yacht owner URL for pure charter intent |

## Trust & Utility Pages

| Page | Status | Notes |
|---|---|---|
| `/about` | Index, sitemap | Good E-E-A-T support page |
| `/contact` | Index, sitemap | Conversion support |
| `/faq` | Index, sitemap | Good answer visibility support |
| `/tursab` | Fixed 2026-04-23 | Added canonical and sitemap entry |
| `/reservation` | Fixed 2026-04-23 | Public booking router is now `noindex, follow`; it remains usable for conversion, but should not compete with money pages |
| `/reservation/[id]` | Noindex | Correct for private booking records |
| `/reservation/[id]/invoice` | Noindex | Correct |
| `/reservation/[id]/voucher` | Noindex | Correct |
| `/admin/*` | Noindex | Correct |

## Blog & Guide Layers

| Layer | Route | Role |
|---|---|---|
| Blog index | `/blog` | Commercial and informational content hub |
| Blog articles | `/blog/[slug]` | Cluster support, internal-link source, AI visibility citations |
| Guide index | `/guides` | Istanbul/Bosphorus entity hub |
| Guide articles | `/guides/[slug]` | Entity support for landmarks and route context |
| Meeting points | `/meeting-points/[slug]` | Noindex | operational utility, not SEO landing pages |

## Immediate Fixes Completed

- Added `/tursab` canonical metadata.
- Added `/tursab` to sitemap with monthly change frequency.
- Created a weekly SERP rank-tracking set tied to owner URLs.
- Added a bottom CTA block to `/private-tours` so private event visitors can route to contact or the yacht charter owner URL.
- Set `/reservation` to `noindex, follow` and hardened the manual indexing script so utility/noindex routes do not enter the GSC request-indexing queue.
- Fixed redirect ownership in `next.config.ts`: `/bosphorus-cruise` no longer redirects to `/cruises`, plural `/bosphorus-cruises` and `/boat-tour` now consolidate into `/bosphorus-cruise`, and old dynamic dinner/yacht URLs now 301 to their top-level owner URLs.

## GSC API Snapshot - 2026-04-23

The service-account API pull for `sc-domain:merrysails.com` produced:

| Window | Rows | Impressions | Clicks | Matched Tracking Keywords |
|---|---:|---:|---:|---:|
| 24h | 33 | 42 | 0 | 3 |
| 7d | 149 | 307 | 0 | 8 |
| 28d | 269 | 878 | 0 | 13 |
| 3m | 339 | 1116 | 0 | 16 |

The API snapshot does not match the earlier manual audit note of about `5K` impressions and `22` clicks, so keep both as separate evidence until the GSC UI/export view is compared.

High-priority query ownership findings:

- `yacht rental istanbul`, `yacht charter istanbul`, `private yacht charter istanbul`, and `istanbul yacht rental` were surfacing the old dynamic URL `/cruises/yacht-charter-in-istanbul` instead of `/yacht-charter-istanbul`.
- `dinner cruise istanbul`, `istanbul night cruise`, and `dinner cruise` were surfacing the old dynamic URL `/cruises/bosphorus-dinner-cruise` instead of `/istanbul-dinner-cruise`.
- `bosphorus cruise` was surfacing blog URLs while `/bosphorus-cruise` should be the owner hub.
- `/bosphorus-cruise` was incorrectly redirected to `/cruises`; this was fixed.
- Blog inline CTA and generic cruise/tips routing now point first to `/bosphorus-cruise` so blog visibility can flow into the owner hub.
- `/bosphorus-cruise` now has a stronger comparison hub structure: answer-first intro, focused H1, H2/H3 intent map, visible price/use-case table, and ItemList schema matching the visible comparison options.
- `/istanbul-dinner-cruise` received protected-page-safe SEO refinements: exact `Bosphorus Dinner Cruise` title ownership, stronger package/night-cruise H2s, Service schema alternate names, and H3 comparison cards without rewriting the core product body.
- `/yacht-charter-istanbul` received protected-page-safe SEO refinements: stronger exact yacht intent in title/meta, Service schema alternate names for `private yacht charter` and `istanbul yacht rental`, and clearer support H2/H3 ownership without touching the core body copy.
- Yacht intent now has a dedicated Semrush handoff brief so future manual keyword work does not split owner intent across yacht, boat rental, proposal, and private dinner pages.
- `/private-tours` was softened away from generic private yacht charter ownership: title, H1, description, FAQ, and intro CTA now position it as a private-event-type hub that sends pure charter demand to `/yacht-charter-istanbul`.
- `/private-events`, `/corporate-events`, `/proposal-yacht-rental-istanbul`, and `/private-bosphorus-dinner-cruise` now use stronger compare-card H3 structure and clearer owner/support routing language.
- `/boat-rental-istanbul` now includes a direct comparison block against yacht charter, plus support FAQ coverage for departures, duration, and add-ons without turning the page into a generic yacht owner.
- `/contact` now acts as a better SEO-safe conversion utility by routing users into the correct product pages before form submission, instead of behaving as a dead-end generic contact page.
- `/contact` now covers the main support owners as well, and the helper CTA no longer pushes all traffic into the noindex booking router.
- `/private-events` no longer mentions proposal intent in metadata/schema, so proposal-led ownership remains isolated on `/proposal-yacht-rental-istanbul`.
- `/private-tours` was rebuilt into a real routing hub with fixed owner/support cards instead of broad dynamic tour grids.
- Blog article sidebar CTA routing now points generic comparison users to `/bosphorus-cruise` instead of `/cruises`.
- `/cruises` layout no longer injects index `ItemList` schema into every child tour page.
- Dynamic overlapping service/event slugs for proposal, corporate, and private dinner were removed from the sitemap and consolidated toward their top-level owner pages.
- `llms.txt` and `llms-full.txt` now return `X-Robots-Tag: noindex, follow`, reducing thin utility URL indexation risk.
- Yacht-commercial blog pressure was reduced on the support layer: the private-yacht guide, luxury-yacht guide, yacht pricing guide, proposal guide, and luxury-experience guide now use narrower planning language and clearer routing back to `/yacht-charter-istanbul` or the relevant support owner page.
- A new support asset, `private-yacht-departure-points-istanbul`, now captures boarding/marina intent safely without forcing a local-modifier service page onto the owner stack.
- Home/footer/blog discovery surfaces were cleaned so comparison and departure-planning guides are featured more often than broad yacht-commercial articles.
- `src/content/blog.ts` discovery logic now keeps `boat-rental-vs-yacht-charter-istanbul` mostly inside yacht-led contexts, reducing repeated private-hire amplification across general/tips categories.
- `bosphorus-family-cruise-kids-guide` and `best-bosphorus-cruise-istanbul-guide` were softened on title/meta/excerpt/keyword posture to reduce generic `bosphorus cruise` cannibalization while preserving useful support content.
- `private-yacht-charter-istanbul-prices`, `bosphorus-dinner-cruise-booking`, `istanbul-sunset-cruise-booking`, and `bosphorus-cruise-with-kids` were also repositioned as planning/support assets rather than broad owner-page substitutes.
- `bosphorus-sunset-cruise-istanbul` and `private-yacht-charter-istanbul-price` were also pulled back into support roles with softer title/meta/keyword posture and clearer routing toward the sunset/yacht owner pages.
- `bosphorus-cruise-for-couples` now behaves as a romantic-format comparison guide instead of a generic `romantic bosphorus cruise` owner substitute.
- `istanbul-cruise-booking-tips` now pushes users toward the correct owner URLs first, reducing broad booking-intent dilution across one support article.
- `corporate-events-yacht-istanbul` and `istanbul-corporate-yacht-event-booking` were both narrowed so `/corporate-events` remains the clearer corporate-event destination.
- `istanbul-dinner-cruise-price-guide-2026` was softened into a pricing explainer and now routes the live booking intent back to `/istanbul-dinner-cruise`.
- `istanbul-proposal-yacht-cruise` now behaves as a proposal-planning explainer instead of a broad proposal owner substitute, and routes live demand to `/proposal-yacht-rental-istanbul`.
- `party-boat-istanbul`, `istanbul-cruise-for-groups`, `bosphorus-cruise-groups-istanbul`, and `group-bosphorus-cruise-guide` were narrowed into planning/support roles so private-event, corporate-event, and private-yacht ownership stay clearer.
- `birthday-party-boat-istanbul` no longer routes birthday intent through `/private-tours`; owner routing now stays aligned with `/yacht-charter-istanbul`, `/private-events`, and `/corporate-events`.
- `party-boat-istanbul-birthday` was narrowed into a birthday-planning support asset so it no longer behaves like a broad `party boat istanbul` owner substitute.
- `yacht-rental-istanbul-prices` now acts as a pricing explainer, with route/timing and booking sections aligned to `/yacht-charter-istanbul` and occasion-specific support owners instead of broad yacht ownership.
- `luxury-yacht-bosphorus-experience` was tightened into a premium-brief article and no longer needs homepage-style amplification as a broad luxury sales path.
- `istanbul-boat-party-private` now routes party intent to `/private-events`, `/yacht-charter-istanbul`, or `/corporate-events` according to the brief instead of trying to own the generic party term.
- `corporate-boat-hire-istanbul` now behaves as a corporate-planning guide and sends live company demand back to `/corporate-events`.
- The homepage Bosphorus guide block no longer promotes `/blog/yacht-rental-istanbul-prices`; it now pushes the direct `/yacht-charter-istanbul` owner path.
- `relatedPosts` arrays no longer contain the stale `best-time-bosphorus-cruise-istanbul` typo or the invalid `boat-rental-istanbul` service-page reference.
- Recommendation-loop pressure was reduced across the birthday-party, night-cruise, and corporate-yacht support clusters so blog cards are less likely to trap users inside adjacent support articles.
- `/contact` and `/tursab` now participate more clearly in the Istanbul trust/local-support layer with reciprocal internal links back to `/about`, `/contact`, `/bosphorus-cruise`, and `/yacht-charter-istanbul`.
- `/blog` discovery is now curated by explicit support-post whitelists rather than source-order defaults, which reduces the chance that a broad foundational Bosphorus guide becomes the permanent featured card.
- `/guides` now routes users toward the Bosphorus compare hub and core owner URLs first, while its supporting-article shelf is explicitly curated to boarding/comparison/planning assets.
- `/faq` now includes direct route cards to the Bosphorus hub and the three main owner pages, plus trust/quote links to `/tursab` and `/contact`.
- Homepage and footer discovery were tightened again so sitewide blog highlights emphasize comparison and departure-planning guides rather than broad `best-*` or generic commercial-support posts.
- `/corporate-events` was repositioned higher in the funnel as a quote-led company-event brief page, reducing the risk that it behaves like a duplicate `yacht charter` price owner.
- `/yacht-charter-istanbul` metadata was narrowed so the page stays focused on private yacht charter / Istanbul yacht rental ownership instead of spreading its metadata across proposal, dinner, and corporate modifiers.
- `sitemap.xml` freshness signals were tightened by replacing several stale hard-coded `lastmod` values with the current content-derived date for static/support/guides surfaces.
- `indexnow.ts` now covers the core compare hub, owner pages, main service pages, and `/tursab`, making whole-site IndexNow pushes closer to the real public commercial surface.
- The homepage Bosphorus guide shortcuts now route more directly toward owner URLs and safer comparison/boarding assets, and the service/custom-planning card no longer dumps mixed intent into `/private-events`.
- New indexable local-support guides were added for `Kabatas` and `Karakoy`, giving the site public boarding-area URLs without exposing booking-only exact pins as the main SEO surface.
- The guide cluster now intentionally covers landmarks plus boarding/waterfront logistics, which makes `/guides` a stronger home for local-support intent around dinner boarding and sunset meeting-flow queries.
- `/about` now behaves more like a citation/trust page and less like a directory stuffed with unsupported social-proof stats.
- `/private-tours` was narrowed further into a routing hub, reducing duplicate support-link pressure and removing unsupported FAQ/package detail claims.
- `llms.txt` and `llms-full.txt` now expose the main trust/entity pages and the new boarding-support guides, improving AI routing toward citation-friendly surfaces.
- Sitewide navigation and homepage broad-intent CTA layers now lean harder on the three owner URLs plus `/bosphorus-cruise`, reducing the amount of top-level internal-link equity sent to mixed hubs.
- A new service page, `/dinner-cruise-with-hotel-pickup-istanbul`, now exists for narrower pickup-led shared-dinner demand; it keeps `/istanbul-dinner-cruise` as the package owner while letting pickup/Kabatas questions land on a better-matched commercial support URL.
- The new pickup page is already linked from `/contact`, `/faq`, and `/guides/kabatas-pier`, which gives it a cleaner internal-link context than launching it as an orphan or forcing the pickup modifier into the protected dinner owner body.
- A second service page, `/corporate-yacht-dinner-istanbul`, now handles dinner-led company-event demand as a narrower support URL under the corporate cluster instead of trying to make `/corporate-events` own both broad and dinner-specific company intent alone.
- Broad-intent leakage was tightened again: blog detail and guide detail CTAs now point to `/bosphorus-cruise` instead of `/cruises`, guide detail related reading is curated instead of keyword-overlap-driven, and guides/FAQ/home blog modules now feature fewer support-commercial shortcuts by default.
- A third service page, `/kabatas-dinner-cruise-istanbul`, now separates `Kabatas dinner cruise` booking intent from the broader `Kabatas` public guide so boarding-confidence demand can land on a commercial support page instead of mixing entirely into the local-support layer.
- `/contact` no longer acts as a flat directory of every support page. It now emphasizes `/bosphorus-cruise` plus the three owner paths first, with narrower support links demoted into a secondary block.
- A fourth service page, `/boat-rental-hourly-istanbul`, now separates hourly private-hire demand from the broader `/boat-rental-istanbul` owner so per-hour queries do not have to compete with every other private-boat modifier on one page.
- A fifth service page, `/private-dinner-cruise-for-couples-istanbul`, now separates couple-led private dinner intent from the broader `/private-bosphorus-dinner-cruise` owner so quieter date-night and anniversary modifiers do not need to compete with every other private-dinner brief on one page.
- A sixth service page, `/proposal-yacht-with-photographer-istanbul`, now separates photographer-led proposal intent from the broader `/proposal-yacht-rental-istanbul` owner so media-specific reveal modifiers do not need to compete with every other proposal brief on one page.
- A seventh service page, `/kurucesme-marina-yacht-charter`, now separates marina-led private-yacht departure intent from the broader `/yacht-charter-istanbul` owner and the informational Kurucesme guide.
- An eighth service page, `/team-building-yacht-istanbul`, now separates team-building-led corporate intent from the broader `/corporate-events` owner so internal-culture and group-connection modifiers do not have to compete with every other corporate brief.
- A new public support hub, `/bosphorus-cruise-departure-points`, now gives dinner, sunset, and private-yacht products one stable indexable departure-logic page instead of forcing users into mixed blog/guide references or unstable reservation details.
- A ninth support page, `/product-launch-yacht-istanbul`, now separates launch/showcase-led corporate intent from the broader `/corporate-events` owner, keeping reveal-driven company briefs from mixing into dinner-led or hosting-led pages.
- Remaining broad `/cruises` leakage was reduced again: the Bosphorus compare hub no longer points back to `/cruises` in its closing CTA, owner and dynamic cruise breadcrumbs now route through `/bosphorus-cruise`, the footer no longer repeats `Cruise Catalog`, and sitemap weight for `/cruises` was lowered.
- Broad discovery was tightened again after the new service-page wave: `/blog` now shows `/bosphorus-cruise` first in its booking-page box, blog detail “core pages” now includes the compare hub, homepage CTA strips now expose the compare hub before deeper owners, and FAQ/guides surfaces now route narrower boarding/pickup questions toward the right support pages instead of only the core owners.
- `/cruises` metadata and page copy were narrowed again so it behaves more like a brand catalog/service index and less like a second owner for broad `Istanbul cruise` or `boat tour` demand.
- Sitewide nav now gives `/bosphorus-cruise` the first top-level position as `Cruises`, reducing the chance that broad internal-link equity defaults to a protected owner page before the comparison hub.
- Contextual internal links were added inside the proposal, private-yacht marina, and corporate-yacht planning articles so the newest support URLs are discoverable from the exact body sections that match their narrower intent.
- The shared `commercialIntents` dataset was corrected so `/bosphorus-cruise` and `/istanbul-dinner-cruise` exist as core-owner entries, and compact commercial-intent modules now render core owners before narrower support/service URLs.
- The `/cruises` layout metadata was narrowed to the same catalog role as the page itself, reducing the chance that inherited metadata reintroduces broad `Bosphorus cruise` ownership pressure.
- Blog routing panels now describe compare hubs, guides, and booking/support pages more accurately, which reduces UX confusion around whether the next click is a broad hub or a narrow service route.
- Blog related-post fallback now uses curated high-intent/planning slugs first, which makes discovery less random and less likely to bounce broad readers between weaker support posts.
- Footer support links now reflect the current high-intent support stack instead of the older generic service-page mix, reducing stale discovery signals for AI crawlers and human users alike.
- `/about` trust/support columns now use the latest support pages plus the departure-points hub and public waterfront guides, keeping entity/citation routing aligned with the live support architecture.
- `llms.txt` and `llms-full.txt` now enumerate the newer pickup, Kabatas, hourly-rental, proposal-photo, company-modifier, marina, and departure-hub pages so AI retrieval is less likely to miss the post-audit support layer.
- Homepage support discovery was tightened again: the public support grid now emphasizes pickup, company-dinner, proposal-photo, client-hosting, and departure-logic modifiers, and the `Why Us` fallback now routes narrow briefs through `/contact` rather than the older private-router hub.
- The blog index no longer points at the stale `corporate-yacht-event-bosphorus-guide` slug; the live corporate-event planning article is now used, which restores that planning-read slot and removes a silent discovery hole.
- Generic `events` fallback is now split more safely across `/corporate-events`, `/private-events`, and `/proposal-yacht-rental-istanbul` instead of teaching every event-style article to route users into the corporate owner first.
- Generic `yacht-guide` fallback no longer injects the corporate-event article as a default recommendation, reducing business-led bias inside proposal, marina, and private-yacht planning contexts.
- `/faq` now surfaces `/kabatas-dinner-cruise-istanbul`, giving Kabatas dinner modifiers a stronger indexable discovery point outside the protected owner page.
- `/guides` and guide detail fallback stacks now favor departure logic, dinner expectation, proposal planning, and private-yacht support reads over broader `best-*` reads, with `kurucesme-marina` receiving a dedicated yacht-support article set.
- `/contact` now pushes the newer exact-match support URLs first and demotes broader support owners into a secondary chip row, reducing directory-like discovery pressure.
- `/bosphorus-cruise` narrowed its support grid again: pickup, Kabatas boarding, hourly rental, proposal-photo, corporate-yacht-dinner, and departure logic now carry the first narrow-click layer, while broader support owners are secondary.
- `/private-tours` now surfaces the newer narrow private-event pages before older broader routers, improving internal-link ownership for proposal-photo, couples dinner, client-hosting, and team-building modifiers.
- `/cruises` copy now calls out its browse-only role more explicitly, further reducing its risk of behaving like a broad commercial destination.
- `/cruises` no longer re-expands discovery through a bottom compact intent block, which keeps that URL closer to a strict utility catalog.
- Homepage blog shortcut discovery now favors broader proposal/corporate owners plus dinner-pickup support before falling back to older generic private-dinner routing.
- Compare/related blocks inside the main support-owner pages were tightened too: broader support pages now reference newer narrow modifiers more often, reducing repeated loops back into the same older support-owner set.
- A tenth support page, `/turkish-night-dinner-cruise-istanbul`, now separates show-led `Turkish night` shared-dinner intent from the broader `/istanbul-dinner-cruise` owner, reducing pressure to make the protected owner page carry every entertainment-led modifier directly.
- The new Turkish-night page is already discoverable from the compare hub, homepage support strip, contact, FAQ, footer, `commercial-intents`, sitemap, and AI-facing routing file, so it launches with multiple discovery entry points instead of waiting for passive blog discovery.
- `dinner-cruise-with-hotel-pickup-istanbul` and `kabatas-dinner-cruise-istanbul` now expose visible decision tables, improving user help and keyword clarity by distinguishing pickup-led, Kabatas-led, Turkish-night-led, and private-dinner-led sub-intents.
- `/boat-rental-istanbul` now more clearly owns the `private boat hire Istanbul` modifier in visible copy and structure while `boat-rental-hourly-istanbul` remains the narrower hour-led support page. This reduces the need to create a duplicate `private boat hire` URL prematurely.
- A new sunset support page, `/sunset-cruise-tickets-istanbul`, now separates ticket-led shared-sunset intent from the broader `/cruises/bosphorus-sunset-cruise` owner without creating a second generic sunset owner page.
- The new sunset-ticket page is already discoverable from the compare hub, homepage support grid, contact, FAQ, guides, footer, `commercial-intents`, sitemap, and `llms.txt`, so it launches with a stronger discovery graph than a stand-alone thin ticket page.
- A new local pickup support page, `/dinner-cruise-pickup-sultanahmet-taksim`, now separates Sultanahmet/Taksim/Sirkeci/Karakoy transfer-fit intent from the broader dinner pickup page and the protected dinner owner.
- The new central-pickup page is already discoverable from the compare hub, homepage support grid, contact, FAQ, guides, footer, `commercial-intents`, sitemap, IndexNow, and AI-facing routing files, so it launches as part of the dinner support cluster rather than an orphan location page.

## Open Decisions

### `/reservation`

Original state:

- metadata allows indexing
- not included in sitemap
- title targets `Bosphorus Cruise Reservation Center | Sunset, Dinner Cruise & Yacht Charter`
- page is useful for users but can overlap with core commercial owner pages

Decision made on `2026-04-23`:

- Set `/reservation` to `noindex, follow`.
- Keep it out of the sitemap.
- Treat it as a conversion utility and product-selection router, not an SEO landing page.
- Keep the page UX strong for conversion, but do not target it as the owner URL for `bosphorus cruise`, `dinner cruise`, `sunset cruise`, or `yacht charter` queries.

Reason:

- The page lets users choose sunset, dinner, or yacht charter, then continues to the selected product booking path.
- It is not the canonical owner for any one commercial query.
- Keeping it indexable risks competing with the three protected owner pages.
- `follow` still lets Google discover the useful booking/product links from the page if it crawls the URL.

## Next SEO Work Queue

1. Pull GSC `24h`, `7d`, `28d`, and `3m` before changing any more SEO-sensitive headings.
2. Fill the 58-row SERP rank baseline from SerpRankChecker / RankTracker / Semrush Position Tracking.
3. Continue auditing support-page internal links from service pages to the correct owner pages with commercial CTA anchors.
4. Audit blog posts for unsupported numeric claims before requesting manual indexing.
5. Expand `/boat-rental-istanbul` further only if Semrush or GSC validates local departure modifiers such as Kurucesme/Kabatas or hourly variants.
6. Continue auditing yacht-related blog posts and featured modules for any remaining exact-match commercial title pressure before manual indexing.
7. Create AI-generated blog images only after the target blog slug, keyword owner, and visual prompt are approved.
8. Check whether the new pickup service page starts getting first impressions before expanding dinner modifiers further.
9. Check whether the new corporate-dinner service page earns first impressions before expanding more company-event modifiers.
10. Check whether the new Kabatas service page earns first impressions before opening any more dinner-location modifiers.
11. Check whether the new hourly boat-rental page earns first impressions before expanding more time-based private-hire modifiers.
12. Check whether the new `product-launch-yacht-istanbul` page earns first impressions before expanding further launch/incentive-style corporate modifiers.
13. Check whether `/sunset-cruise-tickets-istanbul` earns first impressions before opening any more direct sunset ticket/booking modifiers.
14. Check whether `/dinner-cruise-pickup-sultanahmet-taksim` earns first impressions before opening additional district-level pickup URLs.
13. Check whether the new `turkish-night-dinner-cruise-istanbul` page earns first impressions before opening any more entertainment-led dinner modifiers.
14. Check whether the new `sunset-cruise-tickets-istanbul` page earns first impressions before opening any more direct sunset ticket/booking modifiers.
