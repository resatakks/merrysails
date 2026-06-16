# MerrySails SEO/GEO/AI Visibility Context — 2026-06-08
_Production domain: merrysails.com | Folder: merrysails | Vertical: Bosphorus cruise + private yacht charter (Istanbul)_

## TL;DR — bu brand için en kritik 3 şey
1. **/ru locale rollout W1** — operator queue gereği MerrySails ilk sıra (4 tourism brand içinde en hazır pillar set + WhatsApp-only contact policy locked). 5 active locale + ru = 6.
2. **Captain Ahmet byline SADECE MerrySails'te** — GoldenSunset farklı kaptan byline, cross-brand reuse = scaled content abuse classifier. Voice template `.claude/content-gate.json` sabit.
3. **/articles + 114 blog post audit (Lily Ray Jan 20 pattern)** — homepage + cruise pages dominant (inverse Ray pattern), blog supplementary risk LOW immediate ama scan eksik. Body-length, derivative cosine, dateModified pipeline P1.

## 1. Bu session'da öğrenilen + bu brand'e direkt etkili 10 madde
- **YouTube mention > backlink 3× AI citation gap** (Ahrefs r=0.737) — Captain Ahmet on-camera (Bosphorus deck + harbor) creator outreach P1. Istanbul food/travel vlogger 6 brand × 1 video → 30-60-90 priority.
- **134-167 word self-contained answer block** (Wellows r=0.87, 4.2× citation) — TldrBox component'larda mevcut "40-60 word" yetersiz, her pillar üst bloğu rewrite et. Önceki "130-160" güncellendi.
- **Schema → AI citation lift = istatistiksel gürültü** (Ahrefs diff-in-diff May 2026, Otterly 319 prompt) — FAQ schema KEEP (Glenn Gabe verbatim: AI surface signal değil ama rich result safe), TaxiService/TouristTrip KEEP. Yeni "AI schema variants" eklemeyin.
- **DE AI citation opportunity** — Sistrix Tripadvisor -53% (May 2026). /de/cruises/bosphorus-sunset-cruise + /de/istanbul-dinner-cruise pillar refresh P1 (H1 SSR missing per CLAUDE.md "Critical findings 2026-05-04" — VERIFY fix landed).
- **TÜRSAB license display = regulatory binding** (Jan 2021 + Jan 2026 lawsuit) — TURSAB A Group homepage + footer her sayfa zorunlu, GIZLEMEK = mali ceza. Confirm src/components/layout/Footer'da görünür.
- **Cross-brand footer link mesh OUT** — commit b8a5db6 (strip 36 merrytourism + 18 goldensunset) + b7562fa (CrossBrandPromo removed). Sitewide cross-brand link = footprint, kalmasın.
- **Discover MED-HI potential** (memory: 4 of 13 brand) — entity binding + 1200px+ image + max-image-preview:large. Pillar pages için image audit P2.
- **dateModified pipeline** — Ahrefs ChatGPT-cited content 458 days fresher. Pillar pages (bosphorus-cruise, dinner, sunset, yacht-charter) aylık refresh cadence; freshness-cron.json ile bağla.
- **OTA demotion Mar+May 2026** = direct-booking tailwind (TripAdvisor -44.8%, Expedia -32.7%). MerrySails "no-marketplace" anchor pillar copyleri güçlendir.
- **NoArchive Bing verdict**: presumed SAFE (no operator flag this session); haftalık schema-radar check sürdür.

## 2. Bu brand'in mevcut SEO/GEO durumu
- **Bing NOARCHIVE**: SAFE (no flag this session)
- **Scaled content risk**: LOW immediate (114 blog post + 12 guide ama homepage/cruise dominant; Lily Ray Jan 20 inverse pattern). Cosine scan + derivative ratio check P1.
- **YMYL exposure**: NONE (leisure/travel)
- **Schema status**: TouristTrip + Service across commercial; AggregateOffer on dinner+sunset; AggregateRating on dinner (4.88, 312) + yacht-charter (4.9). Recent fixes: TouristTrip.provider → TravelAgency (2c759a7), WebSite JSON-LD dropped (e63ff65).
- **Internal linking**: Hub-and-spoke (bosphorus-cruise pillar + cruise sub-pages + blog ring). RED LINE compliant (no duplicate InternalLinksNav strip).
- **AI grounding eligibility**: confirmed — robots.txt all AI bots, llms.txt + llms-full.txt, /pricing route machine-readable.
- **Multi-locale**: ACTIVE en (root), tr, de, fr, nl. Pending: ru (Week 1 of W1-4 plan), 6 future FUTURE_LOCALES architecture-ready.
- **Recent commits this session**: b8a5db6, b7562fa (cross-brand footer strip), 54e7056 (custom-booking flag), e63ff65 (WebSite JSON-LD dropped homepage), 427e6eb (Clarity ID fallback removed), de6bf51 (meta keywords dropped), 2c759a7 (provider TravelAgency), ec7a429 (LOCALIZED_ROUTES SSOT).

## 3. P0 action queue
| # | Action | Effort | Why now |
|---|---|---|---|
| 1 | /ru locale build — 5 commercial pillar (bosphorus-cruise, dinner, sunset, yacht-charter, boat-rental) | 6-10h | CIS tourist organic via yandex.ru (yandex-tr-deep-2026.md), W1 of 4-week rollout |
| 2 | TldrBox component upgrade 40-60w → 134-167w self-contained answer block | 1-2h | 4.2× AI citation, blanket all 5 pillar |
| 3 | Pillar dateModified pipeline → freshness-cron.json wire | 2h | Ahrefs 458-day freshness gap, automated monthly bump |
| 4 | DE pillar SSR H1 audit (cruises/sunset, istanbul-dinner-cruise, /de root) | 1h | 2026-05-04 finding may still be live |
| 5 | TÜRSAB display verify footer + homepage all locales | 30m | Regulatory binding check |

## 4. P1-P2 backlog
- Captain Ahmet YouTube channel setup + creator outreach (Istanbul food vlogger 3 candidate)
- Cosine similarity scan 114 blog posts (≥0.92 REWRITE, <0.75 KEEP) — script in seo-ops references
- Discover image audit (≥1200px + descriptive titles) all pillars
- Wikipedia/Wikidata submission draft (already drafted in docs/) — execute Q3
- Yandex Webmaster reindex daily ritual (150 URL/day quota)

## 5. SKIP list
- Yandex Metrica install: **SKIP** (operator 2026-06-08 — GA4+Clarity yeterli)
- llms.txt automated pipeline: **SKIP** (Google docs May 15 2026 verbatim — keep static file, no pipeline)
- Cross-brand footer link mesh: **OUT** (committed b8a5db6/b7562fa)
- WeChat/Klook/Tripadvisor manual seeding: **SKIP** (operator priority)
- BoatTrip schema: **NEVER** (ferry-only — use TouristTrip+Product+Offer)
- AI-specific schema variants: **SKIP** (Glenn Gabe + Ahrefs debunk)
- Russian Telegram fallback: **NEVER** (operator 2026-06-02 — WhatsApp ALL locales incl. ru)

## 6. Yandex / Bing / AI engines durumu
- **Yandex**: verified (resatakkus10@gmail.com host kapsamı) — OAuth token `bae18e6118b241f4ac25e80c0ef3b623`. Reindex 150/day quota.
- **Bing**: indexed, AI Performance panel BETA access — daily check + screenshot.
- **ChatGPT/Perplexity/Claude/Gemini**: baseline citation tracking via Otterly + Bing AI Performance manual.

## 7. References
- `/Users/resat/Desktop/merrysails/docs/MERRYSAILS-FULL-SEO-AUDIT-2026-04-22.md`
- `/Users/resat/Desktop/merrysails/docs/MERRYSAILS-SEO-ROADMAP-2026-04-23.md`
- `/Users/resat/Desktop/merrysails/docs/AI-CITATION-TRACKING.md`
- `/Users/resat/Desktop/merrysails/docs/SISTER-BRAND-LINK-CAMPAIGN.md`
- `~/.agents/skills/seo-ops/references/strategy/solis-travel-benchmark.md`
- `~/.agents/skills/seo-ops/references/strategy/yandex-tr-deep-2026.md` (CIS tourist pivot)
- `~/.agents/skills/seo-ops/references/content/community-finds-2026-06.md`
- `~/.agents/skills/seo-ops/references/schema/schema-ai-grounding-debunk.md`
- `~/.agents/skills/seo-ops/references/content/youtube-multimodal-ai-citation.md`

## 8. Cross-brand caution (footprint risk)
- **Sister brands**: GoldenSunsetTour (clone-pair fingerprint flagged day-1 audit), TourThese (private guide vertical — distinct), MerryTurizm (transfer vertical — distinct).
- **Cross-link policy**: footer cross-brand link mesh REMOVED (commit b8a5db6/b7562fa). nofollow legal/about parentOrganization OK; commercial anchor YASAK; ABC triangle YASAK.
- **Captain Ahmet byline**: MerrySails ONLY. GoldenSunset farklı kaptan. Reuse = scaled content abuse classifier (Mar 2026 Firefly leak).
- **Clone-pair (MS↔GS) cosine**: tours.ts structure aynı — same-vessel paraphrase = HIGH risk. Day-1 audit flagged; differentiation matrix: tier (premium vs budget), vessel class, demographic ayrıştır.

## 9. Operator next-session checklist
- [ ] /ru locale W1 başlat — 5 pillar Russian rewrite (native, machine translation YASAK)
- [ ] TldrBox 134-167w upgrade tüm pillar
- [ ] DE pillar SSR H1 doğrula (curl + grep)
- [ ] freshness-cron.json + pillar dateModified pipeline
- [ ] Yandex Reindex daily 150 URL submit
- [ ] AI citation baseline screenshot (Bing AI panel + Perplexity + ChatGPT) → data/ai-citations/2026-06-09.md
