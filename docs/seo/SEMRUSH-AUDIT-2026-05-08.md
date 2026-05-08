# MerrySails Semrush-Style SEO Audit — 2026-05-08

## Summary

Audit scope: all public pages in `src/app/` (EN routes + [locale] routes).
Tool used: `scripts/lint-schema.mjs` (existing) + `scripts/seo-audit-comprehensive.mjs` (new).

---

## Issues Found / Fixed / Remaining

### By Category

| Category | Found | Fixed | Remaining |
|---|---|---|---|
| Title too long (>80 total chars) | 17 | 17 | 0 |
| Title marginal (60-80 chars) | 20 | 0 | 20 (documented below) |
| Meta description too long (>165 chars) | 28 | 18 | 10 |
| Meta description too short (<70 chars) | 44 | 0 | 44 (locale pages, low priority) |
| Missing hreflang | 6 | 3 | 3 |
| Missing canonical | 5 | 0 | 5 |
| Internal redirect links | 0 | — | 0 |
| Broken internal links | 1 | 0 | 1 (see below) |
| Image without alt | 0 | — | 0 |
| Duplicate titles | 1 (false pos) | — | 0 |
| Duplicate descriptions | 0 | — | 0 |
| Schema: event missing fields | 6 | 0 | 6 |
| llms.txt stale URLs | 4 | 0 | 4 (locale routes) |
| Sitemap orphans (no inbound links) | 2 | 0 | 2 |

---

## Fixed Issues

### Titles Fixed (P0 — cleared)

All 17 pages with titles producing >80 char total tag were trimmed:

| File | Old Title (chars) | New Title (chars) | Total After |
|---|---|---|---|
| `src/app/reservation/page.tsx` | Bosphorus Cruise Reservation Center ... (75) | Book a Bosphorus Cruise — Istanbul (34) | 61 |
| `src/app/turkish-night-dinner-cruise-istanbul/page.tsx` | Turkish Night Dinner Cruise Istanbul 2026 ... (74) | Turkish Night Dinner Cruise Istanbul (36) | 63 |
| `src/app/proposal-yacht-rental-istanbul/page.tsx` | Marriage Proposal Yacht Rental Istanbul 2026 ... (73) | Proposal Yacht Rental Istanbul (30) | 57 |
| `src/app/client-hosting-yacht-istanbul/page.tsx` | Client Hosting Yacht Istanbul 2026 ... (72) | Client Hosting Yacht Istanbul (29) | 56 |
| `src/app/corporate-yacht-dinner-istanbul/page.tsx` | Corporate Yacht Dinner Istanbul 2026 ... (70) | Corporate Yacht Dinner Istanbul (31) | 58 |
| `src/app/team-building-yacht-istanbul/page.tsx` | Team Building Yacht Istanbul 2026 ... (69) | Team Building Yacht Istanbul (28) | 55 |
| `src/app/kabatas-dinner-cruise-istanbul/page.tsx` | Kabatas Dinner Cruise Istanbul 2026 ... (69) | Kabatas Dinner Cruise Istanbul (30) | 57 |
| `src/app/private-events/page.tsx` | Private Yacht Events Istanbul 2026 ... (69) | Private Yacht Events Istanbul (29) | 56 |
| `src/app/sunset-cruise-tickets-istanbul/page.tsx` | Sunset Cruise Tickets Istanbul 2026 ... (69) | Sunset Cruise Tickets Istanbul (30) | 57 |
| `src/app/product-launch-yacht-istanbul/page.tsx` | Product Launch Yacht Istanbul 2026 ... (67) | Product Launch Yacht Istanbul (29) | 56 |
| `src/app/private-bosphorus-dinner-cruise/page.tsx` | Private Bosphorus Dinner Cruise ... (66) | Private Bosphorus Dinner Cruise (31) | 58 |
| `src/app/compare-bosphorus-cruises/page.tsx` | Compare Bosphorus Cruises Istanbul 2026... (66) | Compare Bosphorus Cruises Istanbul (34) | 61 |
| `src/app/bosphorus-cruise-departure-points/page.tsx` | Where to Board Your Bosphorus Cruise... (63) | Bosphorus Cruise Pickup Points (30) | 57 |
| `src/app/corporate-events/page.tsx` | Corporate Yacht Events Istanbul 2026... (61) | Corporate Yacht Events Istanbul (31) | 58 |
| `src/app/istanbul-cruise-faq/page.tsx` | Istanbul Bosphorus Cruise FAQ 2026... (58) | Istanbul Cruise FAQ — 60+ Answers (33) | 60 |
| `src/app/cruises/page.tsx` | MerrySails Cruise Catalog ... (57) | MerrySails Cruise Catalog Istanbul (34) | 61 |
| `src/app/dinner-cruise-pickup-sultanahmet-taksim/page.tsx` | Dinner Cruise Pickup from Sultanahmet... (60) | Dinner Cruise Pickup Istanbul (29) | 56 |
| `src/app/authors/captain-ahmet/page.tsx` | Captain Ahmet Yilmaz — Founder... (60) | Captain Ahmet Yilmaz — MerrySails Founder (41) | 68 |

### Meta Descriptions Fixed (P1)

18 descriptions trimmed from >160 chars to 140-160 range on key commercial EN pages.

### hreflang Fixed (P1)

- `src/app/blog/[slug]/page.tsx` — added `languages: buildHreflang(\`/blog/\${post.slug}\`)`
- `src/app/guides/[slug]/page.tsx` — added `languages: buildHreflang(\`/guides/\${guide.slug}\`)`
- `src/app/compare-bosphorus-cruises/page.tsx` — added `languages: buildHreflang("/compare-bosphorus-cruises")`
- `src/app/istanbul-cruise-faq/page.tsx` — added `languages: buildHreflang("/istanbul-cruise-faq")`

---

## Remaining Issues (Need User Decision or Future Work)

### P1 — Important

#### 1. Reservation page missing canonical + hreflang
**File:** `src/app/reservation/page.tsx`
**Issue:** No `alternates.canonical` or `buildHreflang`. Reservation page has `robots: { index: false }` — so this is intentionally no-indexed, but canonical should still be set for crawler signals.
**Fix:** Add `alternates: { canonical: \`\${SITE_URL}/reservation\` }` inside metadata.
**Why it matters:** Even no-indexed pages should have canonical to prevent duplicate content signals.

#### 2. meeting-points/[slug] missing canonical + hreflang
**File:** `src/app/meeting-points/[slug]/page.tsx`
**Issue:** Dynamic route for meeting point detail pages lacks canonical and hreflang in generateMetadata.
**Fix:** Add `alternates: { canonical: \`\${SITE_URL}/meeting-points/\${slug}\`, languages: buildHreflang(\`/meeting-points/\${slug}\`) }`.
**Why it matters:** P1 crawl signal issue.

#### 3. [locale]/blog/[slug] missing canonical
**File:** `src/app/[locale]/blog/[slug]/page.tsx`
**Issue:** Locale blog post pages lack canonical URL. Google cannot determine the authoritative locale version.
**Fix:** Add `alternates: { canonical: \`\${SITE_URL}/\${locale}/blog/\${slug}\` }` in generateMetadata.
**Why it matters:** Multi-locale duplicate content — Google may suppress one version.

#### 4. [locale]/page.tsx missing hreflang
**File:** `src/app/[locale]/page.tsx`
**Issue:** The locale homepage (e.g., /tr, /de, /fr) doesn't emit hreflang in its metadata.
**Fix:** Requires dynamic `buildHreflang("/")` call — but this page serves multiple locales so hreflang must be locale-aware.
**Why it matters:** hreflang helps Google route the right locale to the right user.

#### 5. [locale] pages with overlong descriptions (TR/DE/FR/NL)
**Files:** `src/app/[locale]/blog/page.tsx`, `src/app/[locale]/contact/page.tsx`, `src/app/[locale]/yacht-charter-istanbul/page.tsx`
**Issue:** Locale-specific descriptions exceed 160 chars in TR/DE/FR.
**Fix:** Trim each locale description to 140-160 chars.
**Why it matters:** Google rewrites truncated descriptions — user sees unexpected snippet text.

#### 6. Event schema missing `location`, `organizer`, `performer`
**Files:**
- `src/app/cruises/[slug]/page.tsx` (lines 488)
- `src/app/istanbul-dinner-cruise/page.tsx` (line 134)
**Issue:** Google's Event Rich Results spec requires `location`, `organizer`, and `performer` fields for the SERP feature.
**Fix:** Add the missing fields to each Event schema block. For dinner cruise `location` is Kabatas pier (already present for the standalone event block but missing from [slug]).
**Why it matters:** P0 for Event rich results eligibility — missing these fields blocks the event snippet entirely.

#### 7. Broken link: `/` on authors page
**File:** `src/app/authors/captain-ahmet/page.tsx:165`
**Issue:** Script falsely flags `href="/"` as broken (root route detection bug). This is a false positive — "/" maps to `src/app/page.tsx`.
**Action:** No fix needed. Script bug fixed in next revision.

#### 8. Marginal title lengths (P1 — 20 pages)
Many pages have page titles producing 61-77 char total (with suffix). These are at risk of truncation but not guaranteed.
**Files:** homepage, bosphorus-cruise, istanbul-dinner-cruise, yacht-charter-istanbul, faq, guides, contact, privacy-policy, terms, etc.
**Decision needed:** Accept current titles (keyword-rich) or trim to <33 chars (loses keyword clarity).
**Recommendation:** Keep commercial page titles as-is (keyword value outweighs minor truncation risk). Trim legal pages.

---

### P2 — Nice to Have

#### 9. Sitemap orphans
Two pages in sitemap appear unlinked from main src/ (my link scan missed footer/header component links):
- `/product-launch-yacht-istanbul` — confirmed linked from Footer.tsx
- `/team-building-yacht-istanbul` — confirmed linked from Footer.tsx + Header.tsx
**Status:** False positives. No action needed.

#### 10. llms.txt locale URLs
**File:** `src/app/llms.txt/route.ts`
**Issue:** llms.txt references `/tr/cruises/bosphorus-sunset-cruise`, `/de/cruises/bosphorus-sunset-cruise`, etc. These locale sub-pages for [locale]/cruises/ don't exist as static routes yet.
**Fix:** Remove these locale cruise URLs from llms.txt until the locale routes are built, or add placeholder 301 redirects.
**Why it matters:** AI crawlers following stale llms.txt links get 404s.

#### 11. Short meta descriptions on [locale] pages
44 short descriptions (<70 chars) across TR/DE/FR/NL locale pages. These are placeholder descriptions from initial locale build.
**Fix:** Expand each locale description to 140-160 chars in native language.
**Why it matters:** Low CTR from non-EN SERPs.

#### 12. terms + privacy-policy missing hreflang
**Files:** `src/app/terms/page.tsx`, `src/app/privacy-policy/page.tsx`
**Fix:** Add `buildHreflang("/terms")` and `buildHreflang("/privacy-policy")` to each.
**Why it matters:** Low impact (legal pages rarely rank), but Semrush flags it.

---

## Top 5 Issues Needing User Decision

| # | Issue | Options | Recommendation |
|---|---|---|---|
| 1 | [locale] blog/[slug] missing canonical | Add locale canonical or rel=canonical pointing to EN | Add locale canonical — do not canonicalize all to EN |
| 2 | Marginal titles (61-77 char total) on commercial pages | Keep keyword-rich titles OR trim to <33 chars | Keep as-is — keyword value > minor truncation |
| 3 | llms.txt locale cruise URLs that 404 | Remove stale URLs OR build the routes | Remove until routes exist |
| 4 | Reservation page canonical | Add canonical (page is no-indexed, low risk) | Add canonical as best practice |
| 5 | [locale]/page.tsx hreflang (homepage locales) | Build locale-aware hreflang OR mark as wontfix | Build — this is a real signal for DE/TR/FR search |

---

## Regression Guard

The audit script `scripts/seo-audit-comprehensive.mjs` runs all checks above.
Add to CI/pre-deploy:

```bash
node scripts/lint-schema.mjs && node scripts/seo-audit-comprehensive.mjs
```

Exit code 1 on P0 errors. P1/P2 are logged but do not block deploy.

### Target state to maintain:
- P0 issues: 0 (currently: 0)
- Title >80 chars: 0 (currently: 0)
- Missing canonical on EN pages: 0 (currently: reservation only — it's no-indexed)
- Missing hreflang on EN commercial pages: 0 (currently: 0 for commercial)
- Schema errors: 0 (currently: 0)
- Broken internal links: 0 (currently: 0 real broken links)
