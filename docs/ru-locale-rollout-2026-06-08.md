# MerrySails /ru Locale Rollout Plan
_Target: 2026-06-08 → 2026-07-08 (Week 1 of 4-brand rollout) | Audience: RU/UA/KZ CIS tourist segment_

> **Status at start**: `/ru` is already partially live. `ru` is in `ACTIVE_LOCALES`, 16 paths in `RU_ENABLED_PATHS` (sitemap.xml/route.ts:75), and `[locale]/` route files exist. This plan is about **finishing the rollout** (content quality lift + remaining paths + Yandex distribution), NOT bootstrapping.

---

## 0. Rationale

- Yandex TR market share collapsed 42.59% → 13.44% (2025) — but **yandex.ru CIS tourist organic ~9M annual intent untouched**.
- CIS tourist segments for Turkey tourism: top source markets are RU, UA, KZ, BY. Istanbul = #1 destination.
- No production-quality `/ru` locale = invisible to yandex.ru organic. Backlink and direct WhatsApp inquiries from Russian-speakers currently land on EN/TR pages with sub-optimal conversion.
- **Yandex Metrica install SKIPPED** per operator decision 2026-06-08 ("yandex metrika bence gerek yok ya"). GA4 + Clarity remains the analytics stack for RU traffic too.
- **MerrySails goes first** in the 4-brand rollout because it has the highest organic volume baseline + RU scaffolding already started → fastest path to learning.

---

## 1. Brand current locale state

| Item | Value |
|---|---|
| i18n style | Custom (`src/i18n/config.ts`), NOT next-intl |
| Active locales | `["en", "tr", "de", "fr", "nl", "ru", "zh"]` |
| Route prefix | EN at root (`/`), others at `/<locale>/` (e.g. `/ru/bosphorus-cruise`) |
| Locale routing | `src/app/[locale]/<route>/page.tsx` + flat EN routes at `src/app/<route>/page.tsx` |
| Hreflang | `src/lib/hreflang.ts` — `buildHreflang(path)` emits per-locale `<link rel="alternate">` |
| Sitemap RU gate | `RU_ENABLED_PATHS` set in `src/app/sitemap.xml/route.ts:75` — currently 16 paths |
| Translation source | NO JSON message files. RU copy lives **inline in each `src/app/[locale]/<route>/page.tsx`** as locale-branched objects (read locale param, return RU object) |

**RU paths already live** (RU_ENABLED_PATHS, 16 paths):
- `/bosphorus-cruise`
- `/cruises/bosphorus-sunset-cruise`
- `/istanbul-dinner-cruise`
- `/yacht-charter-istanbul`
- `/boat-rental-istanbul`
- `/proposal-yacht-rental-istanbul`
- `/private-bosphorus-dinner-cruise`
- `/corporate-events`
- `/private-events`
- `/kabatas-dinner-cruise-istanbul`
- `/team-building-yacht-istanbul`
- `/kurucesme-marina-yacht-charter`
- `/honeymoon-yacht-cruise-istanbul`
- `/anniversary-yacht-cruise-istanbul`
- `/bosphorus-cruise-for-couples`
- (16th — verify against route.ts)

**Phase 1 audit deliverable**: confirm whether RU content on each of these 16 paths is **operator-verified native Russian** or **machine translation output**. Likely it is the latter. Lift to native-quality is the actual Phase B work below.

---

## 2. /ru locale activation steps

### Phase A — Audit existing /ru content (3-5 hr) — **BLOCKING**

1. Curl-test each of the 16 RU paths and capture:
   - Title length (target ≤ 47 char before " | MerrySails Istanbul 2026" suffix → 60 char rendered)
   - Meta description length (target ≤ 150 char)
   - H1 presence in SSR HTML (CLAUDE.md known issue — 4 backlink-target cruise pages had no SSR H1; verify RU pages too)
   - Word count (Russian needs ~1500-2000 words for pillar-quality)
   - Visual scan: does the Russian read as native, or does it have machine-translation tells (literal "тур по Босфору" calques, no Russian-specific idioms, EN sentence structure)?
2. Score each page 1-5 on:
   - Translation quality
   - Russian-specific intent satisfaction (e.g., does the page address "visa-free entry for RU citizens" — a Russian-customer-only question?)
   - Schema completeness (`inLanguage: "ru"` per page)
3. Output: `docs/ru-audit-2026-06-08.md` with per-page scores + REWRITE / KEEP / GAP-FILL verdict.

**Exit criterion**: Phase A complete = list of pages needing native rewrite vs. those passable.

### Phase B — Content lift (12-20 hr)

**Priority order**:
1. `/ru/bosphorus-cruise` (matches EN volume leader 6,600/mo)
2. `/ru/istanbul-dinner-cruise` (1,600/mo EN baseline)
3. `/ru/cruises/bosphorus-sunset-cruise` (480/mo EN baseline)
4. `/ru/yacht-charter-istanbul` (590/mo EN baseline)
5. Remaining 12 RU_ENABLED paths in volume-descending order

**Per-page requirements**:
1. **Operator-verified native Russian** — engage a native Russian speaker for review pass. Machine translation alone = trust collapse and Yandex demotes thin/derivative content harder than Google does.
2. **Russian-specific content blocks** that EN pages don't carry:
   - Из Москвы / СПб в Стамбул — booking arc (visa-free, Aeroflot direct, Turkish Airlines from regional cities, transfer to marina)
   - 90-day visa-free arrival reminder for RU citizens (regulatory fact, not promo)
   - Rouble equivalent display next to EUR (invoice still EUR — informational only)
   - Russian customer testimonial block (operator gathers 5-8 quotes from existing RU WhatsApp customers, translates back to written form if originals were voice)
   - WhatsApp +90 544 898 98 12 — the ONLY contact channel per CLAUDE.md (no Telegram CTA anywhere, including RU pages)
3. **Content gate compliance** (per global SEO rules):
   - ≥2 first-party datum (operator-only stat — e.g., "50,000+ guests since 2001", "15+ Russian-speaking guests per month")
   - Author byline: Captain Ahmet (RU voice variant) — same person, different language ≠ different byline. Mueller "different topics" carve-out applies. **GoldenSunset RU pages MUST use a DIFFERENT captain** (cross-brand byline overlap = scaled-content-abuse signal).
   - Information Gain: at least one paragraph not on page-1 SERP (e.g., specific marina pickup details Russians need)
   - ≥2 internal links (RU → RU; do NOT link RU page to EN, except for missing-translation fallbacks)
4. **Title tag discipline** (CLAUDE.md rule 5-6):
   - Never write ` | MerrySails` in source title — root layout adds `"%s | MerrySails Istanbul 2026"`
   - Source `title:` max 47 char
   - Real prices in title if shown (€30 dinner, €34 sunset, €280 yacht)

**Russian H1 examples** (illustrative — operator rewrites):
- `/ru/bosphorus-cruise`: `Круиз по Босфору в Стамбуле`
- `/ru/istanbul-dinner-cruise`: `Ужин на яхте в Стамбуле`
- `/ru/cruises/bosphorus-sunset-cruise`: `Круиз на закате по Босфору`
- `/ru/yacht-charter-istanbul`: `Аренда яхты в Стамбуле`

### Phase C — SEO / Schema (2-3 hr)

1. Add `inLanguage: "ru"` to all JSON-LD schema on `/ru/*` pages.
2. Verify hreflang emits correctly:
   - x-default → EN root
   - hreflang="en" → EN root
   - hreflang="ru" → `/ru/<path>` (only when path is in `RU_ENABLED_PATHS`)
3. Submit RU paths via GSC URL Inspection (10 URL/day cap per `gsc_indexing_discipline.md`).
4. Yandex Webmaster:
   - Verify property already claimed (cross-CLAUDE.md: merrysails.com already verified by resatakkus10@gmail.com)
   - Submit RU-only sitemap or use main sitemap.xml (already gated by `RU_ENABLED_PATHS`)
   - Request indexing via Reindex tool — 150 URL/day quota
5. IndexNow ping (Bing+Yandex+Seznam) for every RU URL touched in this rollout.
6. Wayback Machine archive each canonical RU pillar page (AI training data fodder, operator-confirmed practice).

### Phase D — Distribution (1-2 hr)

1. **Yandex Business listing** — claim if not done. Address = MerrySails Istanbul office (not marina, not airport). Operator confirms.
2. **Yandex Maps verification** — pin the actual departure marinas (Kabataş, Beşiktaş, Kuruçeşme) but the *business* listing is the office address.
3. **NO Yandex Metrica install** per operator decision 2026-06-08. GA4 + Clarity already capture RU traffic via locale=ru filter.
4. **WhatsApp Russian-speaker support** — operator decides whether to publicize. Default: keep the existing single WhatsApp line (+90 544 898 98 12); any operator who picks up handles RU via translation/typed messages.
5. **NO Telegram CTA** anywhere in /ru — CLAUDE.md rule binding. RU customers reach us on WhatsApp.

### Phase E — Measurement

- GA4 RU filter: `pagePath contains "/ru"` + country breakdown (RU, UA, KZ, BY).
- DataForSEO Yandex location (Russia + regional) — rank track RU keywords weekly.
- GSC Search Analytics — country breakdown for RU paths (Google Russia data still flows for non-Russia GSC properties even after Yandex dominance shifted).
- Yandex Webmaster — query/page reports (lower fidelity than GSC but the only path to yandex.ru organic data).

---

## 3. Content priorities — what to translate first

| Priority | Page | EN baseline volume | Why |
|---|---|---|---|
| P0 | `/ru/bosphorus-cruise` | 6,600/mo | Volume leader + already RU-staged |
| P0 | `/ru/istanbul-dinner-cruise` | 1,600/mo | Conversion intent + high-CPC equivalent |
| P0 | `/ru/cruises/bosphorus-sunset-cruise` | 480/mo | Operator's named priority |
| P0 | `/ru/yacht-charter-istanbul` | 590/mo | Highest AOV vertical |
| P1 | `/ru/boat-rental-istanbul` | — | Secondary intent |
| P1 | `/ru/proposal-yacht-rental-istanbul` | — | High AOV, RU honeymoon market significant |
| P2 | Other 10 RU_ENABLED paths | — | Volume-descending after P0/P1 confirmed indexing |

**DEFER**:
- All 114 blog posts (top 20% later if RU traffic justifies)
- City guides — write fresh Russian-native if at all, do NOT translate
- FAQ + cancellation policy (operational pages, low SEO leverage)
- About + license page (1-2 hr, do once, freeze)

**NEVER**:
- TR posts translated to RU (TR-to-RU machine bridge = compounding loss)

---

## 4. Effort estimate

| Phase | Hours |
|---|---|
| A — Audit existing 16 RU pages | 3-5 |
| B — Native content lift (4 P0 + 2 P1 = 6 pages) | 12-18 |
| C — Schema + GSC/Yandex submit | 2-3 |
| D — Distribution (Yandex Business + Maps) | 1-2 |
| E — Measurement baseline | 1 |
| **TOTAL Week 1** | **19-29 hr** |

---

## 5. Risks / mitigations

| Risk | Mitigation |
|---|---|
| **Existing RU pages are machine-translated low-quality** — already indexed = derivative-content classifier risk | Phase A audit identifies; native rewrite mandatory before promoting page |
| **Cross-brand byline overlap** with GoldenSunset (sister brand, also adding /ru) | MerrySails RU author = Captain Ahmet (existing). GoldenSunset RU author MUST be a different captain. Enforce in `.claude/content-gate.json` per brand |
| **Roskomnadzor RU regulation** — TR-domain sites exempt from register but content gating exists | Avoid LGBT/gambling/crypto-payment language in RU copy. Tour brand content is naturally clear. |
| **Hreflang misconfiguration** | Test with hreflang.org validator before each phase deploy. Current RU_ENABLED_PATHS gating prevents pointing hreflang to 404s. |
| **Russian Cyrillic encoding** | All files UTF-8 (already standard in Next.js). Verify no double-encoded characters in DB-stored content (Telegram bot/ContactMessage) |
| **Yandex Webmaster Reindex quota burned on already-indexed pages** | Track submitted URLs in `data/yandex/reindex-log.json` (cross-project pattern). Skip URLs that returned status=indexed in last 30d |
| **Existing TR/DE/FR/NL author bylines clash** | Captain Ahmet is the EN+RU+(DE+FR+NL?) author. Verify cross-locale byline reuse doesn't get flagged. Same person, different language = OK per Mueller carve-out |

---

## 6. Order of operations across 4 brands

**Sequential, not parallel** (learning curve compounds):
1. **Week 1 (this plan)**: MerrySails — highest volume, scaffolding already started
2. **Week 2**: GoldenSunset — sister brand, apply MerrySails learnings (different captain byline mandatory)
3. **Week 3**: KWT — transfer vertical, simpler page scope (no blog post translation, no yacht detail pages)
4. **Week 4**: MerryTourism — multi-vertical, most complex, leverage final pattern

---

## 7. Skip list — MerrySails-specific

- **Blog post RU translation in this rollout window** — defer entire 114-post archive. Do P0 pillars first; revisit blog after 90-day RU traffic data
- **Yandex Metrica install** — operator decision 2026-06-08
- **Russian Telegram channel** — explicit "WhatsApp ONLY" rule in CLAUDE.md; do NOT seed `ru → Telegram` mental model
- **TR-from-RU back-translation** as a content shortcut — TR content for Turkish customers, RU content for Russian customers, independently authored
- **`/ru/private-tours` add** before any P0 page is rewritten — fix existing 16 paths first
- **Adding new RU pages to RU_ENABLED_PATHS** until Phase A audit confirms each addition is native-quality
- **CN/zh expansion in this rollout** — zh is its own staged rollout (already in ZH_ENABLED_PATHS, homepage + 4 paths)

---

## 8. Open questions for operator

1. **Native Russian reviewer source** — operator has a contact? Or freelance hire (Upwork/Toptal, 50-100 USD per pillar pass)?
2. **Russian customer testimonials** — do we have existing RU customers in WhatsApp history willing to provide quotes? (5-8 quotes = enough for trust block)
3. **Yandex Business listing** address — operator confirms central Istanbul office (not marina, not airport per CLAUDE.md TÜRSAB binding regs)
4. **Russian phone number** — add a +7 (Russia) virtual WhatsApp number, or keep `+90 544 898 98 12` only? Default: keep TR number only
5. **Russian customer payment method preference** — current WhatsApp inquiry → EUR invoice. Some RU customers ask about ruble payment due to SWIFT sanctions. Operator decides whether to mention "EUR invoice, ruble equivalent for reference only" explicitly
6. **TR-RU customer overlap risk** — if a Russian customer lands on `/tr/` first (because TR is a common stopover language), how do we redirect to `/ru/`? Defer — let users click locale switcher

---

## 9. Definition of done — Week 1 exit

- [ ] All 16 existing RU paths audited (Phase A report committed)
- [ ] 4 P0 pages rewritten to native Russian + operator-verified
- [ ] All P0 pages: H1 SSR-rendered, schema `inLanguage: "ru"`, hreflang validates
- [ ] GSC URL Inspect submitted for P0 (4 URLs, well under 10/day cap)
- [ ] Yandex Webmaster: 4 P0 URLs queued for Reindex
- [ ] IndexNow ping fired for all touched RU URLs
- [ ] Yandex Business listing claimed (or confirmed not-yet-ready)
- [ ] GA4 RU-locale filter saved + baseline traffic captured
- [ ] `data/ru-rollout-week-1-merrysails.md` log committed with metrics + learnings

---

## Sources

- Operator decisions 2026-06-08 (PakBodrum skip, Yandex Metrica skip, /ru active for 4 tourism brands)
- Yandex TR Deep dive: `~/.agents/skills/seo-ops/references/strategy/yandex-tr-deep-2026.md`
- Multi-brand scaling: `~/.agents/skills/seo-geo/references/multi-brand-scaling-rules.md`
- Cross-brand byline rule: `~/.agents/skills/seo-first-party-authority/references/voice-templates/captain-cruise.md`
- Current RU staging: `src/app/sitemap.xml/route.ts:75-95` (RU_ENABLED_PATHS)
- Existing locale config: `src/i18n/config.ts`
- Hreflang impl: `src/lib/hreflang.ts`
