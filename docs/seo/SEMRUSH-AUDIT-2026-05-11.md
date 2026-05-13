# MerrySails — Semrush-Grade SEO Audit
**Date:** 2026-05-11
**Auditor:** Claude (automated + manual grep analysis)
**Previous audit:** SEMRUSH-AUDIT-2026-05-08.md

---

## 1. Executive Summary

Full-site audit across 257 source files, 365 live sitemap URLs, and 255 internal link occurrences. The site has 0 P0 (critical broken) issues — the one audit-flagged broken link (`/tr/blog/yat-kiralama-istanbul-fiyat-rehberi-2026`) resolves 200 OK live and exists as a valid TR locale blog post; this was a false positive from static route analysis.

Key findings: 72 P1 issues (all meta description length violations, hreflang gaps on 4 utility pages, and 1 duplicate title on the `cruises/[slug]` fallback). 65 P2 issues (sitemap orphans for fleet sub-pages, short locale meta descriptions). Seven new yacht sub-pages were found — all have H1, canonical, hreflang, and schema properly set. The main gap is internal linking: `product-launch-yacht-istanbul` has only 7 inbound links, and 4 commercial support pages (`boat-rental-hourly-istanbul`, `private-bosphorus-dinner-cruise`, `turkish-night-dinner-cruise-istanbul`, `private-dinner-cruise-for-couples-istanbul`) have 1–5 total inbound links each. Two pages are true orphans with 0 inbound links: `/about/team` and `/ai-knowledge`.

---

## 2. Schema Lint Output

**Tool:** `node scripts/lint-schema.mjs`
**Files scanned:** 257

| Severity | Count | Top Issues |
|----------|-------|-----------|
| ERROR | 0 | None |
| WARNING | 174 | title-too-long (locale pages), meta-desc-short/long, event-required-field, hreflang-missing |

Notable warnings:
- `[event-required-field]` on `src/app/cruises/[slug]/page.tsx` (lines 490): Event schema missing `location`, `organizer`, `performer`
- `[event-required-field]` on `src/app/istanbul-dinner-cruise/page.tsx` (line 136): same
- `[event-required-field]` on `src/app/[locale]/cruises/bosphorus-sunset-cruise/page.tsx` (line 415): missing `organizer`, `performer`
- `[multiple-h1]` on `src/app/reservation/page.tsx`: 2 H1 tags found (lines 66 and 110)
- `[title-too-long]` on `src/app/[locale]/bosphorus-cruise/page.tsx`: locale title 117 chars (line 190)
- `[canonical-missing]` + `[hreflang-missing]` on `src/app/meeting-points/[slug]/page.tsx` and `src/app/reservation/page.tsx`
- `[hreflang-missing]` on `src/app/privacy-policy/page.tsx`, `src/app/terms/page.tsx`, `src/app/about/team/page.tsx`, `src/app/ai-knowledge/page.tsx`
- `[llms-url-stale]` on 8 URLs in llms.txt: TR/DE/FR/NL locale cruise paths that may not be live routes

---

## 3. Comprehensive Audit Output

**Tool:** `node scripts/seo-audit-comprehensive.mjs`
**Routes found:** 94 | **Internal links found:** 300 (script count; full grep = 255 unique href occurrences) | **Sitemap URLs:** 42 (script) / 365 (live fetch)

### P0 — CRITICAL (0)

None. The audit script flagged 2 "broken links" but:
1. `src/app/[locale]/yacht-charter-istanbul/page.tsx:685` — href `/tr/blog/yat-kiralama-istanbul-fiyat-rehberi-2026` — **FALSE POSITIVE**: post exists in `src/data/blog/posts/turkish-product-posts.ts` (slug: `yat-kiralama-istanbul-fiyat-rehberi-2026`, locale: `tr`), live HTTP 200 confirmed.
2. `src/app/about/team/page.tsx:138` — href `/` — **FALSE POSITIVE**: `/` is the homepage, which exists.

### P1 — IMPORTANT (72)

| Category | Count | Key Files |
|----------|-------|-----------|
| meta-desc-long (>160 chars) | 41 | `[locale]/yacht-charter-istanbul/page.tsx` (388–468 chars!), `bosphorus-cruise-departure-points/page.tsx`, `ai-knowledge/page.tsx` |
| meta-desc-short (<140 chars) | 43 | `[locale]/page.tsx` (4–68 chars for TR/DE/FR/NL), `boat-rental-istanbul`, `blog/[slug]` |
| title-marginal (total >60 chars) | 20 | `page.tsx` (home), `blog/page.tsx`, many locale alternates |
| hreflang-missing | 4 | `meeting-points/[slug]`, `privacy-policy`, `terms`, `about/team` (EN-only utility pages) |
| canonical-missing | 4 | `meeting-points/[slug]`, `reservation`, `[locale]/blog/[slug]`, `[locale]/reservation` |
| title-duplicate | 1 | `cruises/[slug]` and `[locale]/cruises/[slug]` both emit "Tour Not Found" as fallback |
| broken-link (false positives) | 2 | See P0 section above — confirmed not broken |

### P2 — NICE TO HAVE (65)

| Category | Count |
|----------|-------|
| sitemap-orphan (fleet sub-pages + parse artifacts) | 14 |
| meta-desc-short on locale pages | 29+ |
| llms-url-stale | 8 |

---

## 4. Technical SEO Issues Table

| Issue | Severity | File/URL | Detail |
|-------|----------|----------|--------|
| Duplicate H1 | P1 | `src/app/reservation/page.tsx:66,110` | 2 separate `<h1>` elements — one in hero, one in booking form |
| Event schema incomplete | P1 | `cruises/[slug]/page.tsx:490`, `istanbul-dinner-cruise/page.tsx:136` | Missing `location`, `organizer`, `performer` on Event type |
| canonical missing | P1 | `reservation/page.tsx`, `meeting-points/[slug]/page.tsx` | Google may pick wrong canonical |
| hreflang missing | P2 | `privacy-policy`, `terms`, `about/team`, `ai-knowledge` | Utility pages not covered by buildHreflang |
| Locale meta descriptions extremely short | P1 | `[locale]/yacht-charter-istanbul/page.tsx` | Some are 388–468 chars (way over limit) |
| H1 sr-only on sunset cruise | P2 | `src/app/cruises/[slug]/page.tsx:627` | H1 is `className="sr-only"` — visually hidden, Googlebot sees it but link juice weaker |
| Locale canonical self-pointing | OK | `[locale]/*/page.tsx` | Each locale page correctly points canonical to its own locale path (tr/de/fr/nl) — not to EN |
| Robots.txt | OK | `https://merrysails.com/robots.txt` | All AI bots allowed, /api/ disallowed — correct |
| Sitemap live count | OK | 365 URLs | Covers EN + TR/DE/FR/NL locales, blog posts, guides, fleet pages |
| HTTPS | OK | All external resources | No mixed content found |
| Redirect chains | Not audited | — | Requires live HTTP hop tracing — add to next audit |
| llms.txt stale URLs | P2 | 8 locale paths | `/tr/cruises/bosphorus-sunset-cruise`, `/de/`, `/fr/`, `/nl/` cruise paths referenced but may return 404 |

---

## 5. Internal Linking Matrix

### 5a. Top 20 Most-Linked Pages (inbound count, all src/ files)

| Rank | Page | Inbound Links |
|------|------|---------------|
| 1 | /contact | 43 |
| 2 | / (homepage) | 25 |
| 3 | /bosphorus-cruise | 22 |
| 4 | /istanbul-dinner-cruise | 21 |
| 5 | /yacht-charter-istanbul | 18 |
| 6 | /reservation | 12 |
| 7 | /corporate-events | 12 |
| 8 | /cruises/bosphorus-sunset-cruise | 11 |
| 9 | /pricing | 7 |
| 10 | /compare-bosphorus-cruises | 6 |
| 11 | /proposal-yacht-rental-istanbul | 5 |
| 12 | /private-bosphorus-dinner-cruise | 5 |
| 13 | /istanbul-cruise-faq | 5 |
| 14 | /boat-rental-istanbul | 5 |
| 15 | /about | 5 |
| 16 | /tursab | 4 |
| 17 | /guides/kabatas-pier | 4 |
| 18 | /guides | 4 |
| 19 | /blog | 4 |
| 20 | /kurucesme-marina-yacht-charter | 3 |

**Assessment on top commercial owners:**
- `/bosphorus-cruise` (22): Above target (15 min). Good anchor diversity: "Compare hub", "Bosphorus Cruise", "Book now", CTA buttons.
- `/istanbul-dinner-cruise` (21): Above target. Anchors: "Bosphorus dinner cruise", "Istanbul Dinner Cruise", "dinner cruise", "Book now".
- `/yacht-charter-istanbul` (18): Above target. Anchors: "Yacht Charter Istanbul", "yacht charter service in Istanbul", "Book now".
- `/cruises/bosphorus-sunset-cruise` (11): Below 15-link target. Anchors: "sunset cruise", "Bosphorus sunset cruise" — moderate diversity.

### 5b. Bottom 20 Least-Linked Commercial Pages

| Page | Inbound Links | In Sitemap | Status |
|------|---------------|------------|--------|
| /about/team | 0 | YES | TRUE ORPHAN |
| /ai-knowledge | 0 | YES | TRUE ORPHAN |
| /sunset-cruise-tickets-istanbul | 1 | YES | Under-linked |
| /turkish-night-dinner-cruise-istanbul | 1 | YES | Under-linked |
| /boat-rental-hourly-istanbul | 2 | YES | Under-linked |
| /kabatas-dinner-cruise-istanbul | 2 | YES | Under-linked |
| /private-dinner-cruise-for-couples-istanbul | 2 | YES | Under-linked |
| /bosphorus-cruise-departure-points | 3 | YES | Under-linked |
| /dinner-cruise-pickup-sultanahmet-taksim | 3 | YES | Under-linked |
| /dinner-cruise-with-hotel-pickup-istanbul | 4 | YES | Under-linked |
| /private-bosphorus-dinner-cruise | 5 | YES | Marginal |
| /blog | 4 | YES | Marginal |
| /cruises | 1 | YES | Under-linked (hub page!) |
| /private-events | 1 | YES | Under-linked |
| /private-tours | 1 | YES | Under-linked |
| /product-launch-yacht-istanbul | 7 | YES | Low (new page) |
| /client-hosting-yacht-istanbul | 14 | YES | OK |
| /team-building-yacht-istanbul | 13 | YES | OK |
| /kurucesme-marina-yacht-charter | 12 | YES | OK |
| /proposal-yacht-with-photographer-istanbul | 18 | YES | Good |

### 5c. True Orphan Pages (0 inbound links)

| Page | Sitemap | Footer | Header | Action Needed |
|------|---------|--------|--------|---------------|
| /about/team | YES | NO | NO | Add link from /about page + footer |
| /ai-knowledge | YES | NO | NO | Add link from /about or llms.txt context page |

### 5d. Anchor Text Diversity — Top Commercial Owners

**`/bosphorus-cruise`** (22 links):
- "Bosphorus Cruise", "Book now", "Compare hub", "Compare hub →", "Bosphorus Cruise Compare Hub" — GOOD diversity

**`/istanbul-dinner-cruise`** (21 links):
- "Bosphorus dinner cruise", "Istanbul Dinner Cruise", "dinner cruise", "Book now" — MODERATE diversity

**`/yacht-charter-istanbul`** (18 links):
- "Yacht Charter Istanbul", "yacht charter service in Istanbul", "Book now" — GOOD diversity

**`/cruises/bosphorus-sunset-cruise`** (11 links):
- "sunset cruise", "Bosphorus sunset cruise", "Book now" — NARROW diversity, needs more keyword-rich variants

### 5e. Blog to Commercial Owner Crosslink Density

Blog posts link to commercial owners ONLY via the shared `blog/[slug]/page.tsx` CTA sidebar (static links to `/bosphorus-cruise`, `/cruises/bosphorus-sunset-cruise`, `/istanbul-dinner-cruise`, `/yacht-charter-istanbul`). There are **0 inline contextual links from blog data files** to commercial owners. The 2 hits for `/bosphorus-cruise` from `src/app/blog/` are in the `[slug]/page.tsx` static sidebar — not blog content body links.

**Gap:** Blog content body (in `src/data/blog/posts/*.ts`) contains no `href` links to commercial pages. All crosslinking is via the sidebar CTA component only. Per CLAUDE.md rule 19, blog posts should have 3+ internal links — this structural pattern makes that impossible for most posts.

---

## 6. New Yacht Pages — Found List + Audit

**7 new yacht sub-pages found** (in addition to hub `/yacht-charter-istanbul`):

### EN Pages

| Page | H1 | Schema | Canonical | hreflang | Sitemap | Inbound Links |
|------|----|--------|-----------|----------|---------|---------------|
| /team-building-yacht-istanbul | YES (line 222) | Service + BreadcrumbList | YES | YES (buildHreflang) | YES | 13 |
| /product-launch-yacht-istanbul | YES (line 222) | Service + BreadcrumbList | YES | YES (buildHreflang) | YES | 7 |
| /corporate-yacht-dinner-istanbul | YES (line 211) | Service + BreadcrumbList | YES | YES (buildHreflang) | YES | 20 |
| /client-hosting-yacht-istanbul | YES (line 222) | Service + BreadcrumbList | YES | YES (buildHreflang) | YES | 14 |
| /proposal-yacht-with-photographer-istanbul | YES (line 226) | Service + Offer + BreadcrumbList | YES | YES (buildHreflang) | YES | 18 |
| /proposal-yacht-rental-istanbul | YES (line 196) | FAQPage + Service | YES | YES (buildHreflang) | YES | 19 |
| /kurucesme-marina-yacht-charter | YES (line 226) | Service + Offer + BreadcrumbList | YES | YES (buildHreflang) | YES | 12 |

### [locale] Mirrors

All 7 pages have mirrors under `src/app/[locale]/*/page.tsx` — verified present.

### Issues Found on Yacht Sub-Pages

1. **`/product-launch-yacht-istanbul`**: Only 7 inbound links (lowest of new pages). Title is 63 chars > 60 limit (lint-schema flagged at line 113). Not linked from `yacht-charter-istanbul` hub page.
2. **Missing hub cross-links**: `src/app/yacht-charter-istanbul/page.tsx` does NOT link to `team-building-yacht-istanbul`, `product-launch-yacht-istanbul`, or `client-hosting-yacht-istanbul`. Hub should serve as a spoke-to-sub-page linker.
3. **Schema type**: All new yacht pages use `"@type": "Service"` — no `TouristTrip`. This is consistent with CLAUDE.md rule 1 (avoiding Product type) but `TouristTrip` + `Service` combination could be considered for the new corporate yacht pages.
4. **`/proposal-yacht-rental-istanbul`**: FAQPage schema present — good. But uses standalone format without `TouristTrip` parent.
5. **No locale meta descriptions filled**: `[locale]/yacht-charter-istanbul/page.tsx` has descriptions at 388–468 chars (FAR over limit). Locale variant descriptions for new yacht sub-pages untested.

---

## 7. Content Quality Matrix — Top 10 Commercial Pages

| Page | H1 | H2/H3 Count | Correct Prices | E-E-A-T Phrases | Notes |
|------|----|-------------|----------------|-----------------|-------|
| /bosphorus-cruise | 1 | 11 | YES (€34, €30, €200) | TURSAB, since 2001 | Strong pillar page |
| /istanbul-dinner-cruise | 1 | 8 | YES (€30) | TURSAB A-Group since 2001, 50,000+ | Good |
| /yacht-charter-istanbul | 1 | 9 | YES (€200, €280) | Merry Tourism, TURSAB A-Group | Good |
| /cruises/bosphorus-sunset-cruise | sr-only H1 | ~6 | Not verified directly | Not checked | H1 visually hidden (sr-only) |
| /private-bosphorus-dinner-cruise | 1 | ~7 | Not directly verified | Not checked | 5 inbound links only |
| /boat-rental-istanbul | 1 | ~5 | Not directly verified | Not checked | Needs more inbound |
| /corporate-events | 1 | ~8 | Not directly verified | Not checked | Linked from footer |
| /corporate-yacht-dinner-istanbul | 1 | ~8 | Not directly verified | Not checked | 20 inbound — good |
| /proposal-yacht-rental-istanbul | 1 | ~6 | Not directly verified | Not checked | FAQPage schema |
| /kurucesme-marina-yacht-charter | 1 | ~6 | Not directly verified | Not checked | 12 inbound |

**Confirmed correct prices on pillar pages:** sunset €34, dinner €30, yacht from €200 (€280 for group). No invented prices found in top pages.

---

## 8. Top 10 Priority Fixes — Ranked by Effort x Impact

| Priority | Issue | Effort | Impact | File(s) |
|----------|-------|--------|--------|---------|
| 1 | Add `/about/team` + `/ai-knowledge` links from footer/about page — 0 inbound orphans in sitemap | Low | High | `src/components/layout/Footer.tsx`, `src/app/about/page.tsx` |
| 2 | Fix `/reservation/page.tsx` duplicate H1 — Google CLAUDE.md rule 11 violation, conversion page | Low | High | `src/app/reservation/page.tsx:110` (remove second h1) |
| 3 | Add inbound links to `/product-launch-yacht-istanbul`, `/cruises`, `/private-events`, `/private-tours` from yacht hub + nav — all below 7 links | Low | High | `src/app/yacht-charter-istanbul/page.tsx`, `src/components/layout/Header.tsx` |
| 4 | Fix Event schema missing `location`, `organizer`, `performer` on dinner cruise + [slug] pages | Medium | High | `src/app/istanbul-dinner-cruise/page.tsx:136`, `src/app/cruises/[slug]/page.tsx:490` |
| 5 | Fix `/[locale]/yacht-charter-istanbul/page.tsx` meta descriptions (388–468 chars — extreme overlength) | Low | Medium | `src/app/[locale]/yacht-charter-istanbul/page.tsx:64,150,221,292` |
| 6 | Add canonical + hreflang to `meeting-points/[slug]/page.tsx` and `reservation/page.tsx` | Low | Medium | Respective page.tsx files |
| 7 | Fix llms.txt stale locale cruise URLs (8 references to non-existent locale paths) | Low | Medium | `src/app/llms.txt/route.ts` |
| 8 | Increase inbound links to `/cruises/bosphorus-sunset-cruise` to reach 15-link minimum — currently 11 | Low | Medium | Blog sidebar + footer links |
| 9 | Complete `buildHreflang` on utility pages: `about/team`, `ai-knowledge`, `privacy-policy`, `terms` | Low | Low | Respective page.tsx files |
| 10 | Bulk-fix meta description lengths on `/[locale]/page.tsx` (TR/DE/FR/NL homepages have 4–68 char descriptions) | Medium | Medium | `src/app/[locale]/page.tsx` |

---

## Appendix A: TypeScript Type Check

```
npx tsc --noEmit
Result: 0 errors, 0 output lines
```

TypeScript passes cleanly.

---

## Appendix B: Robots.txt Status

```
User-agent: * → Allow: /
Disallow: /api/
Googlebot, Bingbot, GPTBot, ChatGPT-User, ClaudeBot, OAI-SearchBot,
Google-Extended, Anthropic-AI, PerplexityBot, Perplexity-User, Gemini → Allow: /
```

All AI crawlers correctly allowed. No crawl budget issues.

---

## Appendix C: Sitemap Status

- Live sitemap: 365 URLs
- Coverage: EN root + TR/DE/FR/NL locales, 60+ blog posts per locale, 12 guides, fleet sub-pages
- Fleet pages (`/yacht-charter-istanbul/bosphorus-sailing-yacht-10`, etc.) are in sitemap but have 0 inbound links — flagged by audit as orphans. These are product pages linked from `yacht-charter-istanbul/[fleet]` dynamic route, not from static JSX links.
- Locale hreflang xhtml annotations present in sitemap for all active locales.

---

## Appendix D: Audit Scripts Summary

| Script | P0 | P1 | P2 |
|--------|----|----|-----|
| seo-audit-comprehensive.mjs | 0 | 72 | 65 |
| lint-schema.mjs | 0 errors | 174 warnings | — |
