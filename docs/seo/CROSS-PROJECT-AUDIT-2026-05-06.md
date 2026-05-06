# Cross-Project Schema Audit — 2026-05-06

**Method**: `scripts/lint-schema.mjs` ported to each brand project, ran identical rules.

## Summary table

| Brand | Lint result | Action needed |
|---|---|---|
| **MerrySails** | ✅ 0 ERROR (was 1), 210 WARN | Done (4 deploys today) |
| **GoldenSunsetTour** | 🚨 **1 ERROR**, ~200+ WARN | **Apply same MerrySails fix recipe** |
| KingsWorldTransfer | ✅ Schema lint passed (195 files) | None — clean |
| MerryTourism | ✅ Schema lint passed (185 files) | None — clean |
| Ersintattoo | ✅ (only LocalBusiness in layout — supported parent) | None |
| Pgpremium | (not yet run — 2 dirs found, verify which is active) | Pick active dir, re-run |
| Acilkaseniz | (not run) | Schedule audit |
| Arslancatering | (not run) | Schedule audit |

## GoldenSunsetTour fix recipe (5 minutes)

GST is a MerrySails clone — same architecture, same bugs.

**1 ERROR** at `/de/cruises/bosphorus-sunset-cruise` — Event + Service AggregateRating parser conflict (identical to MerrySails issue we fixed in cd72ff7).

**11 WARNs** on locale variants — aggregateRating on `["TouristTrip","Service"]`.

### Run these on `/Users/resat/Desktop/goldensunsettour`:

```bash
cd /Users/resat/Desktop/goldensunsettour

# 1. Copy fix scripts from MerrySails (already done by audit step)
cp /Users/resat/Desktop/merrysails/scripts/strip-locale-aggregaterating.py scripts/
cp /Users/resat/Desktop/merrysails/scripts/lint-schema.mjs scripts/

# 2. Apply locale strip (11 files)
python3 scripts/strip-locale-aggregaterating.py

# 3. Manually fix the 1 ERROR file: src/app/[locale]/cruises/bosphorus-sunset-cruise/page.tsx
#    Same fix as MerrySails commit cd72ff7:
#    - Move aggregateRating from serviceSchema to eventSchema
#    - Add Event required fields: startDate (root), endDate (root), description, image,
#      eventStatus, eventAttendanceMode, performer (Organization), organizer (Organization)
#    - Change Event offers to "@type": "Offer" with availability + validFrom

# 4. Verify
node scripts/lint-schema.mjs    # expect 0 ERROR
npx tsc --noEmit                # expect clean
npm run build                   # expect success

# 5. Commit + push
git add -A
git commit -m "fix(schema): port MerrySails Event + AggregateRating fixes to GST"
git push
```

## KingsWorldTransfer status

✅ Lint passed. Schema implementation uses dedicated component files:
- `src/components/seo/serviceSchema.tsx`
- `src/components/seo/CommercialOwnerPage.tsx`
- `src/components/seo/richResultsOptimizer.tsx`

These pass lint because aggregateRating is on Organization or LocalBusiness parents (supported by Google for Review snippet).

**Recommendation**: Add `npm run lint:schema` to KWT pre-commit (regression guard) — copy MerrySails script approach.

## MerryTourism status

✅ Lint passed. Single schema file `src/lib/schema-local-business-rating.ts` (LocalBusiness, supported parent).

Same recommendation: add lint:schema to MerryTourism CI.

## Pgpremium duplicate dir question

`/Users/resat/Desktop/pgpremium/` AND `/Users/resat/Desktop/pg-premium-website/` both exist with identical top-level files (CLAUDE.md, AGENTS.md, app/, components/).

User to confirm which is the active project before audit.

## Acilkaseniz / Arslancatering

Audit scheduled for next session — copy lint-schema.mjs and run.

---

## Lessons learned (for memory)

1. **Schema clones share schema bugs** — when a brand is forked from another, audit BOTH. GoldenSunsetTour inherited the exact same Review snippet ERROR from MerrySails because it's a code-level clone.

2. **Component-based schema (KWT pattern) is more maintainable** than inline page-by-page schema — fewer copies, fewer divergence opportunities, easier to lint.

3. **`scripts/lint-schema.mjs` is portable** — works in any Next.js project after copy. No project-specific deps. Should be standardized across all brand repos.

4. **Schema bugs hide in locale variants** — root EN often passes Google's validator while locale (DE/FR/NL/TR) variants fail because Google doesn't crawl them in time. Lint catches this BEFORE Google flags.

---

*Audit completed by MerrySails session, 2026-05-06. Re-run quarterly across all brand projects.*
