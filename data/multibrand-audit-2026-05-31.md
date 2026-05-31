# Multi-Brand Audit — MerrySails ↔ Sister Brands
**Date**: 2026-05-31
**Scope**: Detect Google clustering / SpamBrain "ölüm fitili" signals between MerrySails and 5 sister brands (GoldenSunsetTour, MerryTourism, KingsWorldTransfer, AcılKaseniz)
**Purpose**: Pre-flight check before launching 5-6 NEW cruise brands

---

## 🔴 RED FLAGS (active clustering signals)

### 1. `sameAs` array openly declares 5 sister brand entity equivalence
**File**: `src/app/layout.tsx:154-166` (MerrySails)
```js
sameAs: [
  "https://www.merrytourism.com",
  "https://www.wikidata.org/wiki/Q139785651",
  "https://kingsworldtransfer.com",
  "https://goldensunsettour.com",
  "https://www.wikidata.org/wiki/Q139782776",
  "https://acilkaseniz.com",
]
```
**Risk**: Schema.org `sameAs` = "this entity IS equivalent to that one." Google's primary entity-merge join key. **GoldenSunset + MerryTourism = same niche** → canonical clustering. KingsWorld (transfer) + AcılKaseniz (restaurant) = different niches, lower cluster risk.

**DECISION PENDING** (user must choose):
- **A**: Keep all (current — knowledge graph trust win, SEO clustering risk)
- **B** (recommended): Remove same-niche (`goldensunsettour.com`, `merrytourism.com`, both Wikidata) — break cluster but keep cross-vertical trust
- **C**: Remove all sister brand `sameAs` — max SEO independence, lose Wikidata investment

### 2. `captain-ahmet` identical author entity on both MerrySails + GST
**Files**:
- `src/data/team.ts:11` (MerrySails: `id: "captain-ahmet"`)
- `/Users/resat/Desktop/goldensunsettour/src/data/team.ts:15` (GST: `id: "captain-ahmet"` + `image: "/team/captain-ahmet.jpg"`)

**Risk**: Same author entity with same photo = Google identifies author cluster. With 5+ brands using the same captain, this becomes a fake-entity signal.

**Action**: Each brand should have a distinct author profile + distinct bio + distinct photo file. For 5-6 new brands, plan now: real photos of different captains/team members, or AI-generated distinct headshots, with brand-specific bios.

---

## 🟡 YELLOW FLAGS (content-level cross-mentions)

### 3. Body content openly references sister brands

**MerrySails** has no direct body cross-mention to GST (checked).

**GoldenSunsetTour** has multiple:
- `src/app/about/team/page.tsx:176` — Resat bio: "built GoldenSunsetTour alongside sister brands MerrySails and MerryTourism. The portfolio has now served 50,000+ guests"
- `src/app/best-bosphorus-cruise-2026/page.tsx:149` — listed competitor: "MerrySails (sister brand)"
- `src/app/tursab/page.tsx:563` — trust signal: "50,000+ guests across the GoldenSunsetTour, MerrySails, and..."
- `src/app/layout.tsx:415` — UI comment: "matches MerrySails, KingsWorldTransfer, Viator"

**Risk**: Google's NLP can extract "X is sister brand of Y" relationships from body text. Combined with `sameAs` (#1), this confirms entity cluster to algorithm.

**Decision**: If user keeps Option A (`sameAs` intact), body mentions are consistent and fine. If Option B/C, body mentions should be reviewed — at minimum the "sister brand" wording in `best-bosphorus-cruise-2026:149`.

---

## 🟢 GREEN (acceptable/intentional signals)

### 4. llms.txt sister brand declaration
**File**: `src/app/llms.txt/route.ts:169, 529, 531`

Explicit narrative: "all three operate under the same TURSAB A Group license #14316 ... share Bosphorus fleet, captains, operational base in Fatih"

**Verdict**: **Intentional and correct** for LLM/AI citation. Researcher 2026-05-31: "sameAs is Google's entity join key, not llms.txt narrative." LLM citation strategy ≠ Google SERP clustering. Keep.

### 5. Shared TÜRSAB license #14316 in schema
**Files**: Both MerrySails and GST schemas list `identifier: { propertyID: "TURSAB License", value: "#14316" }`

**Verdict**: **Safe**. Google does not parse custom license identifiers as entity join keys. Plan Tours, Setur, dozens of TÜRSAB-licensed operators run multiple brands under one license without issue. Threshold confirmed.

### 6. Shared phone +90-544-898-9812
**Files**: Both sites use the same telephone in schema + body content.

**Verdict**: **Safe for WEB SEO** (Mueller: "Google can handle multiple URLs to the same content"). Risk only exists for Google Business Profile / Maps NAP dedup — user has already accepted only 1-2 GBPs across the portfolio. No web-SEO risk from shared phone.

### 7. Same Next.js skeleton / Tailwind / schema shape
**Verdict**: **Invisible to Googlebot**. Crawler sees rendered HTML, not React component tree, Tailwind utility classes, or schema shape. Shopify/WordPress operators run 100+ same-theme sites. **Cloning skeleton + rewriting all body content is the green-light expansion pattern.**

---

## 📋 PRE-EXPANSION CHECKLIST (before opening Brand 3-8)

Each new brand MUST set up clean from day 1:

- [ ] **NO `sameAs` link to MerrySails or other same-niche sisters** (cross-vertical OK per Option B)
- [ ] **Distinct author entity** — different captain name, different bio photo file, different schemaId, different `@id` person hash
- [ ] **Distinct photo asset library** — minimum 60-70% unique images (hero, gallery, team, OG)
- [ ] **Different brand voice** — copy framework, FAQ tone, blog narrator
- [ ] **Separate Google Workspace + GSC owner email** — `admin@<newbrand>.com`, not centralized
- [ ] **Separate GA4 property + separate GTM container**
- [ ] **Separate Vercel project + separate GitHub repo**
- [ ] **Different registrar + spaced registration** (min 1 month apart, mix Namecheap/Porkbun/Cloudflare/GoDaddy)
- [ ] **Distinct H1/H2/IA per page** — not a 1:1 page-name clone of MerrySails
- [ ] **Body text overlap <30% per analogous page** (sunset cruise page on new brand ≠ MerrySails sunset cruise page word-for-word)
- [ ] **TÜRSAB #14316 OK to reuse** (verified safe)
- [ ] **Phone +90 544 OK to reuse** (verified safe)
- [ ] **Same Next.js/Tailwind skeleton OK to fork** (verified safe)

---

## 🎯 RECOMMENDED BRAND ROSTER (revised 2026-05-31)

Replacing previous "8 brands all selling everything in English" plan:

| # | Brand | Differentiation Axis | AOV | Status |
|---|---|---|---|---|
| 1 | MerrySails | EN global flagship | €30-280 | Live |
| 2 | GoldenSunset | EN sister, sunset-leaning, white-label feel | €34-50 | Live (1 mo) |
| 3 | (NEW) Yacht-only Luxury | EN intent cluster: "yacht charter Istanbul" | €800-2k | Q3 2026 |
| 4 | (NEW) **German-native** (.de or de subdomain) | **Language** (separate SERP universe) | EUR | Q4 2026 |
| 5 | (NEW) Photography/Event micro-brand | EN intent cluster: proposal/honeymoon/event | €120-300 | Q1 2027 |
| 6 | (NEW) **Asia-facing Chinese landing** (CN content site) | **Language** (Ctrip/RED traffic capture, NOT Baidu organic) | varied | Q1 2027 |
| 7-8 | (OPTIONAL) City expansion (Bodrum/Marmaris yacht) | **Geography** (different city = different entity) | varied | 2027+ |

**Why this beats "8 EN cruise sites"**:
- Brand 4 + 6 are different LANGUAGE (German + Chinese) → live in separate SERP universes, zero canonical conflict
- Brand 3 + 5 are different INTENT clusters within EN (yacht-only vs photography micro vs MerrySails generalist) → don't fight for same SERPs
- Brand 7-8 are different GEOGRAPHY → different entity by definition

**Cancelled**: 3+ EN-only general-product cruise brands — canonical bloodbath confirmed by research.

---

## NEXT STEPS

1. **User decision needed**: Option A/B/C on `sameAs` cross-links
2. If B/C: clean `src/app/layout.tsx:154-166` MerrySails + verify GST + MerryTourism + KingsWorld layout files
3. Plan author entity diversification (real captain photos vs AI-generated distinct headshots)
4. Apply pre-expansion checklist to Brand 3 setup
5. Klook + KKday supplier application (parallel, MerrySails first)
6. TGA matching grant application (Q4 2026 cycle)

---

## SOURCES
- Research 2026-05-31 (Reddit/forum/Google docs synthesis)
- BlackHatWorld multi-site threads
- Mueller statements on multi-URL same content
- Google Spam Policies (doorway definition)
- Schema.org Organization & sameAs documentation
- Hilton/Marriott multi-brand precedent analysis
