# MerrySails SERP Rank Check Runbook - 2026-04-23

## Purpose

This runbook turns the 2026-04-23 keyword cluster export into a repeatable weekly rank-tracking workflow for MerrySails.

The goal is not only to know whether a keyword ranks. The goal is to know:

- which MerrySails URL ranks
- whether the correct owner URL ranks
- whether a keyword is moving toward page one
- whether a support page is cannibalizing a core revenue page
- which competitor domains repeatedly own the SERP

## Source Files

- Cluster source: `/Users/resat/Downloads/merrysails_clusters_2026-04-23.csv`
- Active tracking set: `data/serp/merrysails-serp-rank-tracking-keywords-2026-04-23.csv`
- Excluded / future pool: `data/serp/merrysails-serp-rank-tracking-excluded-2026-04-23.csv`

## Current Tracking Set

The first wave has `58` active keywords.

- `/bosphorus-cruise`: `32` keywords
- `/istanbul-dinner-cruise`: `9` keywords
- `/cruises/bosphorus-sunset-cruise`: `4` keywords
- `/yacht-charter-istanbul`: `9` keywords
- `/boat-rental-istanbul`: `2` keywords
- `/private-bosphorus-dinner-cruise`: `1` keyword
- `/proposal-yacht-rental-istanbul`: `1` keyword

The excluded / future pool keeps Turkish, non-English, cruise-ship, ferry, broad travel, and unclear-owner terms out of the first English commercial rank test.

## Tool Finding

The public SerpRankChecker site describes Top 100 rank tracking, daily movement, and page-level ranking ownership. The public pages inspected on 2026-04-23 did not expose a usable unauthenticated batch rank API in the HTML. The visible forms redirect toward RankTracker registration / tracking flow.

Use SerpRankChecker / RankTracker as a manual or authenticated rank-tracking tool unless an API key or export access is provided.

Reference:

- https://serprankchecker.com/
- https://serprankchecker.com/tools/serp-rank-checker/

## Measurement Settings

Use the same settings every week unless a deliberate market split is created.

- Domain: `merrysails.com`
- Search engine: `Google`
- First market: `United States`
- Language: `English`
- Device: `desktop + mobile` if the tool supports both
- Ranking depth: `Top 100` if available
- Refresh cadence: weekly
- First comparison date: `2026-04-30`

Later market splits can be added for `United Kingdom`, `Germany`, and `Turkey English SERP`, but do not mix those into the first baseline.

## Owner URL Rules

Rank is counted as a clean win only when the mapped owner URL ranks.

- Generic Bosphorus cruise / boat tour intent -> `/bosphorus-cruise`
- Dinner / night / dinner cruise intent -> `/istanbul-dinner-cruise`
- Sunset intent -> `/cruises/bosphorus-sunset-cruise`
- Yacht / private charter intent -> `/yacht-charter-istanbul`
- Boat rental intent -> `/boat-rental-istanbul`
- Private dinner intent -> `/private-bosphorus-dinner-cruise`
- Proposal intent -> `/proposal-yacht-rental-istanbul`

If MerrySails ranks with a different URL, mark it as `cannibalization_check_required`, not as a clean win.

## Weekly Update Procedure

1. Import or check the keywords in `data/serp/merrysails-serp-rank-tracking-keywords-2026-04-23.csv`.
2. Fill `current_rank`, `current_ranking_url`, and `rank_source`.
3. Keep `expected_url` unchanged.
4. If the ranking URL differs from `expected_url`, add a note in `notes`.
5. Compare against the previous export before changing headings or body content.
6. Prioritize terms in positions `5-20` first because they are the highest-leverage SEO wins.
7. Cross-check with GSC `28 days` and `3 months` before deciding whether a page needs heading changes, internal links, or new support content.

## Automated Repo Workflow

Use this command when GSC exports or API access are available:

```bash
npm run seo:rank-monitor
```

The script reads the active tracking CSV, checks GSC files from `data/gsc`, and writes a markdown report under `docs/seo-rank-reports`.

If API access is configured, it can call the official Search Console Search Analytics API directly with:

- `GSC_ACCESS_TOKEN`
- `GSC_SERVICE_ACCOUNT_JSON`
- `GSC_SITE_URL`

If API access is not configured, export GSC CSV files into `data/gsc` using these names:

- `merrysails-gsc-24h.csv`
- `merrysails-gsc-7d.csv`
- `merrysails-gsc-28d.csv`
- `merrysails-gsc-3m.csv`

Required columns are `query`, `page`, `clicks`, `impressions`, `ctr`, and `position`. Common GSC export labels are normalized by the script.

## Action Logic

Use rank data this way:

- Position `1-3`: protect current title/H1 alignment, improve rich result eligibility, avoid unnecessary rewrites.
- Position `4-10`: improve CTR, schema, FAQ visibility, and internal links before rewriting copy.
- Position `11-20`: review H1/H2 coverage, above-the-fold intent match, internal links, and competitor page format.
- Position `21-50`: add support content, strengthen topical cluster, and improve page ownership clarity.
- Not in Top 100: check indexation, canonical, sitemap, page intent, and whether a new support page is needed.

## Commercial Priority

The first revenue focus remains English commercial demand.

Highest priority keywords include:

- `bosphorus cruise`
- `bosphorus boat trip`
- `boat tour istanbul`
- `istanbul dinner cruise`
- `bosphorus dinner cruise`
- `sunset cruise istanbul`
- `bosphorus sunset cruise`
- `yacht charter istanbul`
- `yacht rental istanbul`
- `private bosphorus cruise`
- `boat rental istanbul`

## Notes For Future Sessions

- Do not treat mixed Turkish and English keyword lists as a problem by itself. Separate them by language and owner URL before acting.
- Do not rewrite protected core page body copy just because a rank checker shows weak positions.
- For protected core pages, start with title, meta description, H1/H2/H3, schema, breadcrumbs, internal links, and adjacent support sections.
- For service pages, support pages, and blogs, more aggressive expansion is allowed if the owner URL map is clean.
- Do not request manual indexing for thin, duplicate, or unsupported AI-generated content.
