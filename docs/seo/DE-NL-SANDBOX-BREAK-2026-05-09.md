# DE / NL / FR Locale Sandbox Break Strategy — 2026-05-09

**Status snapshot from GSC URL Inspection (2026-05-09)**:
- `/de/bosphorus-cruise` — "URL is unknown to Google" (14+ days live)
- `/nl/bosphorus-cruise` — "Discovered, not indexed"
- `/fr/yacht-charter-istanbul` — "Discovered, not indexed"
- `/fr/bosphorus-cruise` — PASS (indexed with rich results)

---

## Diagnostic Findings

### 1. Content Depth Analysis

All locale pages share the same JSX template (`/src/app/[locale]/bosphorus-cruise/page.tsx`). Content words per locale content block (data keys only, not JSX boilerplate):

| Locale | Content words | FAQs | Price rows | Tour options |
|---|---:|---:|---:|---:|
| TR | ~944 | 10 | 7 | 4 |
| FR | ~798 | 8 | 7 | 4 |
| DE | ~743 | 8 | 7 | 4 |
| NL | ~707 | 7 | 7 | 4 |

DE has the least content of all 4 non-EN locales (~200 words fewer than TR). NL is the thinnest.

**Rendered word count estimate**: Each locale page renders roughly 1,100-1,400 words of visible text (content keys + JSX labels + shared UI text). This is above Google's "thin content" threshold for structured pages, but on the lower end for standalone pillar pages.

**FR indexed, DE not** — FR has 4 blog posts in `french-product-posts.ts` that each link to `/fr/bosphorus-cruise` (verified in source). DE has 4 blog posts in `german-product-posts.ts` with only 2 links to `/de/bosphorus-cruise`. Additionally, FR blog posts contain 4 inline Markdown links to `/fr/bosphorus-cruise` vs DE's 2 links. This link equity difference is the most likely differentiator.

### 2. Internal Link Audit

**Links pointing to `/de/bosphorus-cruise`** (all sources):

| Source | Type | Count |
|---|---|---|
| `/src/components/layout/Footer.tsx` | Footer link | 1 |
| `/src/app/[locale]/bosphorus-cruise/page.tsx` | Canonical definition (not a rendered link) | 0 |
| `german-product-posts.ts` | Blog post body Markdown links | 2 |
| `llms.txt/route.ts` | AI visibility file (not crawled as HTML) | 2 (text refs) |
| `/src/app/[locale]/page.tsx` (DE homepage) | No link to hub page | 0 |
| Sitemap | XML sitemap entry (0.97 priority) | 1 |

**Total crawlable inbound links to `/de/bosphorus-cruise`**: 3 (1 footer + 2 blog body links)

**Links pointing to `/fr/bosphorus-cruise`** (indexed):

| Source | Type | Count |
|---|---|---|
| `/src/components/layout/Footer.tsx` | Footer link | 1 |
| `french-product-posts.ts` | Blog post body Markdown links | 4 |
| `/src/app/[locale]/page.tsx` (FR homepage) | No hub link | 0 |
| Sitemap | XML sitemap entry (0.97 priority) | 1 |

**Total crawlable inbound links to `/fr/bosphorus-cruise`**: 5 (1 footer + 4 blog body links)

**Links pointing to `/nl/bosphorus-cruise`**:

| Source | Type | Count |
|---|---|---|
| Footer.tsx | Footer link | 1 |
| `dutch-product-posts.ts` | Blog body links (to be verified) | ~2 |
| Sitemap | XML sitemap entry | 1 |

**Root cause**: DE and NL have 3 total crawlable inbound links vs FR's 5. For a new-domain sandbox phase, this marginal difference is likely decisive — Googlebot deprioritizes discovery of pages with fewer internal signals.

### 3. Crawl Path Analysis

The most critical crawl path: Googlebot discovers and crawls EN `/bosphorus-cruise` (indexed). Does it follow hreflang links to `/de/bosphorus-cruise`?

The hreflang is declared in `generateMetadata()` via `alternates.languages` and in the sitemap XML via `<xhtml:link>`. Googlebot does process hreflang for crawl discovery, but it does NOT guarantee indexing — it only signals the relationship. For "URL is unknown" status (not even "Discovered"), the page was not followed from any crawl path.

**Key gap**: The DE locale homepage (`/de/`) does NOT link to `/de/bosphorus-cruise`. The locale homepage links to `/de/cruises/bosphorus-sunset-cruise`, `/de/istanbul-dinner-cruise`, and `/de/yacht-charter-istanbul` — but not to the hub page. This means the most authoritative internal DE page fails to pass equity to the hub.

The FR locale homepage has the same gap. Yet FR is indexed — because FR blog posts (4 links) compensate. DE blog posts (2 links) do not provide the same signal weight.

### 4. Sandbox Phase vs Link Gap

The domain has been live ~3 months with 0 clicks and 1,170 impressions. This is a confirmed sandbox phase. During sandbox, Google is more conservative about indexing thin/low-link pages. The threshold to exit sandbox for locale sub-pages appears to be:

- Minimum ~5 crawlable inbound links from indexed pages (FR met this; DE/NL did not)
- OR at least 1 crawlable link from a page Google already assigned ranking authority to

The EN root pages are the only authority nodes. Locale pages inherit authority only through internal links from indexed pages.

---

## Root Cause Hypothesis: /de/bosphorus-cruise "Unknown to Google"

**Primary cause**: Insufficient crawlable inbound links from indexed pages.
- `/de/bosphorus-cruise` has 3 total crawlable inbound links (footer + 2 blog body).
- The footer link appears on every page but Google discounts sitewide footer links as navigation (low PageRank value).
- The 2 DE blog post body links appear within `/de/blog/bosporus-kreuzfahrt-preise-istanbul` and `/de/blog/bosporus-bootstour-istanbul-2026-ratgeber`. These DE blog pages may themselves be "Discovered, not indexed" — making their outbound links unprocessed by Google.

**Secondary cause**: No link from an authoritative indexed page.
- The EN `/bosphorus-cruise` page does not link to `/de/bosphorus-cruise` (only hreflang annotation, not a visible hyperlink).
- The DE locale homepage (`/de/`) does not link to `/de/bosphorus-cruise`.

**Tertiary cause**: Thin content relative to depth of locale.
- DE at ~743 content words is the thinnest locale page. Google may deprioritize crawling locale variations of thin pages during sandbox.

**Why FR is indexed but DE is not**: FR blog posts have 4 body links to `/fr/bosphorus-cruise`; DE blog posts have 2. Additionally, FR was deployed earlier or Googlebot happened to follow its crawl path first. Once FR was indexed, its internal links to `/fr/bosphorus-cruise` created a crawl chain. DE has not yet crossed that threshold.

---

## 5-Step Action Plan to Break DE/NL Sandbox

### Step 1 — Add hub link from DE/NL locale homepages (Effort: 30 min)

**File**: `/src/app/[locale]/page.tsx`

The locale homepage (`/de/`) is in the sitemap at priority 0.97 and is likely indexed (it's the root locale URL). Adding a visible link to `/de/bosphorus-cruise` creates the highest-value internal link possible within the DE locale.

Implementation: Add a "Alle Bosporus-Kreuzfahrten vergleichen" link card in the hero or products section that points to `/${locale}/bosphorus-cruise`. This is the hub page that compares all tours — it fits naturally as a "see all options" CTA.

Do NOT touch Footer.tsx (per task constraints).

### Step 2 — Add /de/bosphorus-cruise body link from each LocaleHelpfulResources instance (Effort: 15 min)

**File**: `/src/components/layout/LocaleHelpfulResources.tsx`

`LocaleHelpfulResources` already includes DE links for sunset/dinner/yacht/boat, but the component is used on the sub-pages (e.g., `/de/istanbul-dinner-cruise`). Currently the `hub` link in `LocaleHelpfulResources` does NOT appear to be rendered (the `omit="hub"` prop is passed in the bosphorus-cruise page itself).

However, `LocaleHelpfulResources` renders on `/de/istanbul-dinner-cruise`, `/de/yacht-charter-istanbul`, etc. — confirm the hub link ("Alle Bosporus-Kreuzfahrten →") is NOT omitted on sub-pages. If the hub link is only conditionally shown (it is — `omit="hub"` is only on the hub page itself), then sub-pages should be linking back to `/de/bosphorus-cruise` already.

Action: Verify `LocaleHelpfulResources` renders the hub link on at least 3 sub-pages per locale. If confirmed, this adds ~6 more inbound links to `/de/bosphorus-cruise` from indexed pages.

### Step 3 — Add 2 more body links from DE blog posts (Effort: 45 min)

**Files**: `/src/data/blog/posts/german-product-posts.ts`

DE blog posts `bosporus-kreuzfahrt-preise-istanbul` and `bosporus-bootstour-istanbul-2026-ratgeber` each contain 1 body link to `/de/bosphorus-cruise`. Add a second link in each post by including a natural cross-reference (e.g., "Alle Touren vergleichen: [Bosporus Kreuzfahrt Istanbul](/de/bosphorus-cruise)").

Also verify: are these DE blog pages themselves indexed? If they are "Discovered, not indexed", their outbound links carry no weight. If they are indexed, each body link is high value.

For NL: Apply same treatment to `/src/data/blog/posts/dutch-product-posts.ts` — add 2 body links to `/nl/bosphorus-cruise` and `/nl/istanbul-dinner-cruise`.

### Step 4 — Add EN cross-link from /bosphorus-cruise to DE/NL versions (Effort: 15 min)

**File**: `/src/app/bosphorus-cruise/page.tsx` (EN page)

The EN bosphorus-cruise page is indexed and has ranking authority. Adding a visible "Available in: Deutsch | Francais | Nederlands" language switcher with real `<a>` hrefs (not just hreflang meta) creates direct crawl paths from an authoritative indexed page to all locale variants.

This is the single highest-impact action because Googlebot processes links from high-authority indexed pages much faster than sitewide navigation or sitemap entries.

### Step 5 — Submit via IndexNow + GSC URL Inspection (Effort: 10 min)

After Steps 1-4 are deployed:

1. POST to `/api/gsc/inspect` with `action: "indexnow"` for:
   - `https://merrysails.com/de/bosphorus-cruise`
   - `https://merrysails.com/nl/bosphorus-cruise`
   - `https://merrysails.com/fr/yacht-charter-istanbul`
2. Use GSC URL Inspection "Request Indexing" for each URL manually.
3. Wait 3-7 days and re-inspect in GSC.

IndexNow signals to Bing immediately. For Google, the URL Inspection + sitemaps + inbound links must converge.

---

## Effort Summary

| Step | Action | Effort | Impact |
|---|---|---|---|
| 1 | Hub link from locale homepages | 30 min | HIGH |
| 2 | Verify LocaleHelpfulResources hub links on sub-pages | 15 min | MEDIUM |
| 3 | Add 2 more body links per locale in blog posts | 45 min | MEDIUM |
| 4 | EN cross-link to locale variants | 15 min | HIGH |
| 5 | IndexNow + GSC Request Indexing | 10 min | MEDIUM |

**Total estimated effort**: ~2 hours.
**Expected result**: DE/NL pages move from "Unknown/Discovered" to "Crawled, currently not indexed" within 7 days, and to "Indexed" within 14-21 days after fix deployment.

---

## Additional Notes

**Why /fr/yacht-charter-istanbul is "Discovered, not indexed"**:
Same root cause — fewer inbound links than `/fr/bosphorus-cruise`. The FR yacht page likely has 1-2 body links from FR blog posts vs bosphorus-cruise's 4+. Apply Step 3 treatment: add 2 body links to `/fr/yacht-charter-istanbul` from existing FR blog posts.

**Do NOT add canonical-confusing hreflang changes** — the current implementation is correct. The problem is crawl discovery, not canonicalization.

**Monitor with**: GSC URL Inspection > Last crawl date. If the date doesn't update within 7 days of deploy, Googlebot is still not reaching the page via crawl paths (sitemap-only discovery is very slow for new domains).
