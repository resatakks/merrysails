# MerrySails — Google Ads DE Campaign Brief

**Date:** 2026-04-30
**Total daily budget pool:** ₺1.000 (~€30 / ~$33 per day)
**Recommended DE allocation:** ₺150-₺200 / day (~€4.5-€6) → ~15-20% of pool
**Rationale for carve-out:** DE audience converts on different intent signals than EN; PMax mixing hides DE quality score and prevents per-locale optimization. A small dedicated DE Search campaign keeps signal clean and protects EN PMax budget from Germany-region serving.

---

## CAMPAIGN STRUCTURE

### Recommended structure
```
Google Ads Account
├── [Existing] PMax — All locales / EN audience       (~₺550/day)
├── [Existing] Brand Search — "merrysails"            (~₺50/day)
├── [Existing] Search EN — Bosphorus commercial       (~₺250/day)
└── [NEW]      Search DE — Bosporus commercial        (~₺150/day)  ← THIS BRIEF
```

### Why Search and not PMax for DE
- PMax requires conversion volume to learn. MerrySails has near-zero baseline conversions on DE pages (no traffic → no learning data).
- Search lets you control exactly which DE keywords trigger and which DE landing page receives the click.
- Once DE conversions reach ~30/month, consider promoting top performers into a separate DE PMax with strict location/language signals.

---

## CAMPAIGN SETTINGS

| Setting | Value |
|---------|-------|
| Campaign name | `MS-Search-DE-Bosporus-2026Q2` |
| Campaign type | Search |
| Bidding | Maximize Conversions (with target CPA = €25 once 15+ conversions logged) |
| Locations | Germany, Austria, Switzerland (`presence` mode, NOT interest) |
| Languages | German |
| Networks | Google Search only (NO display, NO partner) |
| Devices | All — but bid +20% mobile (German hotel booking trends mobile-first) |
| Ad rotation | Optimize for conversions |
| Daily budget | ₺150 (~€4.5) — increase to ₺200 after 14 days if CPA on target |
| Conversion goal | **MS Reservation (purchase) ONLY** — not soft conversions |

---

## AD GROUPS (4)

### AG1 — Bosphorus Cruise Core
**Landing:** `/de/bosphorus-cruise`
**Keywords (phrase + exact, no broad initially):**
- `bosporus kreuzfahrt`
- `bosporus kreuzfahrt istanbul`
- `bosporus bootstour`
- `bosporus bootsfahrt`
- `istanbul bootstour`
- `istanbul kreuzfahrt`
- `bosporus tour istanbul`

**Negatives (campaign-level + ad-group):** see global negatives section.

### AG2 — Dinner Cruise
**Landing:** `/de/istanbul-dinner-cruise`
**Keywords:**
- `dinner kreuzfahrt istanbul`
- `bosporus dinner kreuzfahrt`
- `abendessen kreuzfahrt istanbul`
- `bosporus mit abendessen`
- `nachtkreuzfahrt istanbul`
- `türkische nacht istanbul`
- `bosporus dinner cruise`

### AG3 — Sunset Cruise
**Landing:** `/de/cruises/bosphorus-sunset-cruise`
**Keywords:**
- `bosporus sonnenuntergang kreuzfahrt`
- `sonnenuntergang kreuzfahrt istanbul`
- `bosporus sunset cruise`
- `romantische bootsfahrt istanbul`
- `bosporus goldene stunde`

### AG4 — Yacht Charter
**Landing:** `/de/yacht-charter-istanbul`
**Keywords:**
- `yachtcharter istanbul`
- `yacht charter istanbul`
- `private yacht istanbul`
- `luxus yacht istanbul`
- `yacht mieten istanbul`
- `bosporus yacht charter`
- `private bosporus tour`

---

## RESPONSIVE SEARCH AD COPY (per ad group)

### AG1 — Bosphorus Cruise Core
**Headlines (15):**
1. Bosporus Kreuzfahrt ab €34
2. Direkt vom Veranstalter buchen
3. TÜRSAB-A lizenziert seit 2001
4. Sonnenuntergang, Dinner & Yacht
5. 50.000+ zufriedene Gäste
6. Kostenfreie Stornierung 48h
7. MwSt. inkl. — Klare Preise
8. Istanbul Bosporus auf Deutsch
9. Bosporus Kreuzfahrt Istanbul
10. Sicher buchen mit SEPA
11. Klarna & Sofort verfügbar
12. Pünktliche Abfahrt garantiert
13. Hoteltransfer Sultanahmet
14. Bewertung 4,8 von 5 Sternen
15. Vergleichen Sie alle Optionen

**Descriptions (4):**
1. Sonnenuntergangs-, Dinner- oder private Yacht-Kreuzfahrt auf dem Bosporus. Direkt vom lizenzierten Veranstalter ab €34.
2. TÜRSAB A-Gruppe lizenziert seit 2001. Über 50.000 begrüßte Gäste. Alle Preise inkl. MwSt., kostenfreie Stornierung 48h.
3. SEPA, Klarna, Sofort und Kreditkarte. Hoteltransfer ab Sultanahmet/Taksim verfügbar. Jetzt direkt buchen.
4. Bosporus auf Deutsch erleben — pünktliche Abfahrt, deutschsprachige Buchungsbetreuung, transparente Preise ohne Aufschläge.

**Sitelinks (4):**
- Sonnenuntergang ab €34 → `/de/cruises/bosphorus-sunset-cruise`
- Dinner Kreuzfahrt ab €30 → `/de/istanbul-dinner-cruise`
- Yachtcharter ab €280 → `/de/yacht-charter-istanbul`
- Häufige Fragen → `/de/faq`

**Callout extensions:**
- Kostenfreie Stornierung
- MwSt. inkl.
- TÜRSAB-A Lizenz
- 50.000+ Gäste
- Direkte Buchung
- SEPA & Klarna

**Structured snippet (Service):**
- Sonnenuntergangs-Kreuzfahrt
- Dinner-Kreuzfahrt
- Privater Yachtcharter
- Bootsverleih
- Hoteltransfer

### AG2 — Dinner Cruise (variations)
Headlines lead with: `Istanbul Dinner Kreuzfahrt €30`, `Türkische Nacht & Live-Show`, `4 Pakete €30 bis €90`, `Hoteltransfer Sultanahmet`, `3,5 Stunden Bosporus-Dinner`.

### AG3 — Sunset Cruise (variations)
Headlines lead with: `Bosporus Sonnenuntergang €34`, `Goldene Stunde auf dem Wasser`, `2 Stunden Luxusjacht`, `Mit oder ohne Wein`, `Live-Reiseleitung an Bord`.

### AG4 — Yacht Charter (variations)
Headlines lead with: `Yachtcharter Istanbul ab €280`, `Heiratsantrag auf dem Bosporus`, `Private Jacht für Ihre Gruppe`, `Geburtstag, Hochzeitstag, Event`, `Sie bestimmen Route & Programm`.

---

## NEGATIVE KEYWORDS (campaign-level)

### Free / job seekers
kostenlos, gratis, umsonst, free, kostenfrei (NOT for stornierung context — handle separately), bewerbung, job, jobs, stellenangebot, karriere, ausbildung, praktikum

### Wrong cruise type
aida, tui cruise, msc, costa, kreuzfahrtschiff, ozeankreuzfahrt, hochseekreuzfahrt, transatlantik, mittelmeerkreuzfahrt, rhein, donau, elbe, main, mosel, neckar, flusskreuzfahrt

### Wrong destination
antalya, izmir, bodrum, marmaris, alanya, side, kemer, fethiye, dubai, kairo, athen, dubrovnik, kreta

### Informational
wikipedia, definition, was ist, bedeutung, geschichte (broad — refine after data)

### Competitor brand (decide ad-group level)
Decide per-account policy: bidding on getyourguide / viator / civitatis brand terms is allowed by Google but ROI typically poor. Recommend exclude initially: getyourguide, get your guide, viator, civitatis, tripadvisor, klook, headout

### Misspellings to AVOID as negatives (these convert!)
Do NOT add: bosphorus (alternative spelling), kreutzfahrt (common DE typo)

---

## CONVERSION TRACKING

Confirm in GTM:
- `MS Reservation` (purchase) → primary conversion, marked "Primary" in Ads
- `phone_click`, `whatsapp_click`, `contact_submit_success`, `booking_abandonment` → marked "Secondary" only
- Conversion Linker active
- Enhanced Conversions: enable for SEPA/Klarna order forms (hash email + phone)

**Critical:** The master analysis flagged that PMax conversion goal override was incomplete. Before launching DE Search, verify only `MS Reservation` is marked Primary. Otherwise DE campaign will optimize for soft conversions and waste budget.

---

## WHEN TO TEST PMax FOR DE

After 30 days of Search DE, check:
- ≥30 conversions logged from DE Search?
  - YES → spin up `MS-PMax-DE-2026Q3` with €5/day, location DACH, language DE, audience signal = converters from DE Search.
  - NO → keep optimizing Search; PMax needs minimum signal to learn.

---

## EXPECTED PERFORMANCE (CONSERVATIVE)

| Metric | Week 1-2 | Week 3-4 | Month 2 |
|--------|---------:|---------:|--------:|
| Daily impressions | 200-500 | 500-1,200 | 1,000-2,500 |
| Daily clicks | 5-15 | 15-30 | 25-50 |
| Daily cost | ₺120-150 | ₺150-180 | ₺180-200 |
| CPC (€) | €1.20-€2.00 | €1.00-€1.60 | €0.90-€1.40 |
| Daily conversions | 0-1 | 1-2 | 2-4 |
| CPA (€) | €25-€40 | €20-€30 | €15-€25 |
| AOV target (€) | €60 | €60 | €70 |
| ROAS target | break-even W1-2 | 2.0× | 3.0× |

---

## IMMEDIATE NEXT STEPS

1. **Find `GOOGLE_ADS_CUSTOMER_ID`** (already flagged in master analysis) — needed to manage via API.
2. **Build DE Search campaign in Ads UI manually** for first 2 weeks (don't wait for API automation).
3. **Verify conversion goal override** — only `MS Reservation` Primary.
4. **Add UTM parameters** to all DE landing pages: `?utm_source=google&utm_medium=cpc&utm_campaign=ms-search-de-bosporus&utm_content={adgroup}&utm_term={keyword}`
5. **Pre-launch QA:** load each of the 4 landing pages with German browser locale + German IP (VPN) — confirm DE content renders, prices visible, payment options visible, FAQ in DE.
6. **Day 7 review:** filter Search Terms report for any irrelevant queries → add to negatives.
7. **Day 14 review:** if any keyword has 0 impressions, raise bid 25% or change match type from exact→phrase.
8. **Day 30 review:** decide PMax DE expansion (see above).

---

## RISK / WATCH-OUTS

- **Trademark issues:** Some operators have "Bosporus" or "Istanbul Cruise" as trademarks in DE. If Google flags an ad, swap exact phrase for paraphrase.
- **Auto-translated landing page check:** Ensure no remaining English fragments on `/de/*` (German tourists bounce instantly on mixed-language pages). The current DE translations look complete but a final QA pass is required.
- **Quality Score asymmetry:** Initially DE ads will score lower because the landing pages are new and have no traffic history. Expect 4-6/10 starting QS, climbing to 7-8 after 4 weeks of CTR data.
- **Mobile speed:** German users abandon at 3+ second LCP. Pre-launch, run PSI on all 4 DE landing pages and ensure LCP < 2.5s, CLS < 0.1.
