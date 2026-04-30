# MerrySails — DE Landing Pages Plan (5 Priority URLs)

**Date:** 2026-04-30
**Principle:** Each H1/H2/meta below is **DE-market native**, not a literal translation of the English page. Copy assumes German tourist priors: cancellation policy first, MwSt. clarity, formal `Sie` address, foregrounding of TÜRSAB licensing as a state-issued credential, payment-method transparency.

For each page: **Current state** (what's in the codebase today) → **Recommendation** (what to add/change) → **Backlink anchor strategy** (for outreach).

---

## 1. `/de` — Homepage

### Primary keyword: `bosporus kreuzfahrt`
### Current meta (verified)
- Title: `Bosporus Kreuzfahrt Istanbul | Dinner & Yacht | MerrySails`
- Description: `Istanbuls exklusive Bosporus-Erlebnisse: Sonnenuntergangs-Kreuzfahrt, Dinner-Kreuzfahrt und private Yacht-Charter. TURSAB A-Gruppe lizenziert, 50.000+ Gäste.`

### Recommended meta
- **Title (60 chars):** `Bosporus Kreuzfahrt Istanbul ab €34 — Direkt buchen | MerrySails`
- **Description (180 chars):** `Bosporus Kreuzfahrt Istanbul ab €34, Dinner ab €30, private Yacht ab €280. TÜRSAB-A lizenziert, kostenfreie Stornierung 48h, MwSt. inkl. Direkt vom Veranstalter buchen.`

### Recommended H1
`Bosporus Kreuzfahrt Istanbul — Sonnenuntergang, Dinner und privater Yachtcharter`

### Recommended H2 hierarchy
- H2: `Drei Bosporus-Erlebnisse — eine vertrauenswürdige Adresse`
- H2: `Warum deutschsprachige Gäste MerrySails wählen`
  - "Kostenfreie Stornierung bis 48 Stunden vor Abfahrt"
  - "TÜRSAB A-Gruppe staatlich lizenziert seit 2001"
  - "Alle Preise inkl. MwSt., kein Trinkgeld erforderlich"
  - "Direkte Buchung — keine Plattformaufschläge"
- H2: `Häufige Fragen aus Deutschland, Österreich und der Schweiz`
- H2: `Bezahlung: SEPA, Klarna, Sofort, Kreditkarte`
- H2: `Pünktliche Abfahrt — Anlegestellen Kabataş, Beşiktaş, Kuruçeşme`

### Backlink anchor strategy (for outreach)
Preferred anchors:
- "Bosporus Kreuzfahrt Istanbul" (60% of links)
- "MerrySails" (brand, 25%)
- "Istanbul Bootstour Anbieter" (long-tail, 15%)

---

## 2. `/de/bosphorus-cruise` — Bosphorus Cruise Hub

### Primary keyword: `bosporus kreuzfahrt istanbul`
### Current meta (verified)
- Title: `Bosporus Kreuzfahrt Istanbul — Ab €34 | MerrySails`
- Description: `Bosporus Kreuzfahrt Istanbul: Sonnenuntergang ab €34, Dinner-Kreuzfahrt ab €30, Privatjacht ab €280. TÜRSAB A-Gruppe lizenziert seit 2001, 50.000+ Gäste. Direkt buchen.`

### Recommended meta
- **Title:** `Bosporus Kreuzfahrt Istanbul: Vergleich, Preise, Buchung | MerrySails`
- **Description:** `Alle Bosporus-Kreuzfahrtoptionen im Vergleich: Sonnenuntergang ab €34, Dinner ab €30, Privatjacht ab €280. MwSt. inkl., kostenfreie Stornierung 48h. Seit 2001 TÜRSAB-A lizenziert.`

### Recommended H1
`Bosporus Kreuzfahrt Istanbul`

### Recommended H2 / H3 additions to the existing structure
- H2: `Welche Bosporus-Kreuzfahrt passt zu Ihnen? Entscheidungshilfe`
  - H3: `Erste Reise nach Istanbul → Sonnenuntergang (2 Std., €34)`
  - H3: `Romantischer Abend → Dinner-Kreuzfahrt (3,5 Std., €30-€90)`
  - H3: `Heiratsantrag, Geburtstag, Familienfeier → Private Yacht (€280+)`
- H2: `Bosporus Kreuzfahrt Preisliste 2026 (alle Preise inkl. MwSt.)` — already present, just ensure MwSt. note
- H2: `Stornierung und Umbuchung — was Sie wissen müssen` (NEW — German priority)
  - "Kostenfreie Stornierung bis 48 Stunden vor Abfahrt"
  - "Schlechtwetter: kostenlose Umbuchung auf den nächsten freien Termin"
  - "Volle Rückerstattung auf Ihr SEPA- oder Kreditkartenkonto innerhalb von 5 Werktagen"
- H2: `Anlegestellen am Bosporus — die nächste zu Ihrem Hotel finden`
- H2: `Häufig gestellte Fragen` — already present, expand with:
  - "Gibt es deutschsprachige Reiseleitung an Bord?" (this exact query has commercial intent)
  - "Wird MwSt. zusätzlich berechnet?" (always asked by German tourists)
  - "Kann ich mit Klarna oder Sofort bezahlen?"

### Schema additions
- Add `inLanguage: "de-DE"` to TouristTrip
- Ensure single `AggregateRating` (not duplicated across Organization + Product) — fixes existing GSC error

---

## 3. `/de/istanbul-dinner-cruise` — Dinner Cruise

### Primary keyword: `dinner kreuzfahrt istanbul`
### Current meta (verified)
- Title: `Istanbul Dinner Cruise — Ab €55 | MerrySails`  ← **PROBLEM: title says €55 but starting price is €30**
- Description: `Bosporus Dinner Cruise Istanbul ab €30. Türkische Abendunterhaltung, 4 Pakete bis €90, Hoteltransfer möglich. TÜRSAB-lizenziert seit 2001. Jetzt buchen.`

### Recommended meta
- **Title:** `Istanbul Dinner Kreuzfahrt ab €30 — Türkische Nacht & Bosporus | MerrySails`
  - Fixes the €55/€30 mismatch
  - Adds primary DE keyword "Dinner Kreuzfahrt"
  - "Türkische Nacht" is a high-intent DE search term
- **Description:** `Istanbul Dinner Kreuzfahrt auf dem Bosporus ab €30. 3,5 Std., 4 Paketstufen bis €90, Türkische Nacht mit Live-Show, Hoteltransfer ab Sultanahmet/Taksim. MwSt. inkl., kostenfreie Stornierung.`

### Recommended H1
`Istanbul Dinner Kreuzfahrt auf dem Bosporus`

### Recommended H2 additions
- H2: `Was Sie an Bord erwartet — die Türkische Nacht`
  - Live-Musik, traditioneller Bauchtanz, Volkstanz aus verschiedenen Regionen
  - 3-Gang-Menü mit türkischen Spezialitäten und vegetarischer Option
- H2: `Vier Pakete im Vergleich — €30, €45, €80, €90`
- H2: `Hoteltransfer Sultanahmet & Taksim` (German tourists overwhelmingly stay in these districts)
- H2: `Vegetarisch, vegan, halal — Menüoptionen` (German market priority)
- H2: `Häufige Fragen zur Dinner-Kreuzfahrt`

### Backlink anchor strategy
- "Istanbul Dinner Kreuzfahrt" (50%)
- "Türkische Nacht Istanbul" (20%)
- "Bosporus Abendessen Tour" (15%)
- "MerrySails Dinner Cruise" (15%)

---

## 4. `/de/cruises/bosphorus-sunset-cruise` — Sunset Cruise

### Primary keyword: `bosporus sonnenuntergang kreuzfahrt`
### Current meta (verified)
- Title: `Bosporus Sonnenuntergangs-Kreuzfahrt Istanbul — Ab €34 | MerrySails`
- Description: `Bosporus Sonnenuntergang Kreuzfahrt Istanbul ab €34. 2 Stunden Luxusjacht, Live-Guide, Erfrischungen. Mit Wein ab €40. TÜRSAB-lizenziert. Direkt buchen.`

### Recommended meta
- **Title:** `Bosporus Sonnenuntergang Kreuzfahrt Istanbul ab €34 | MerrySails`
  - Drop the awkward "Sonnenuntergangs-" hyphenation; German searchers type "Sonnenuntergang Kreuzfahrt"
- **Description:** Keep existing — well-formed.

### Recommended H1
`Bosporus Sonnenuntergang Kreuzfahrt — die Goldene Stunde auf dem Wasser`

### Recommended H2 additions
- H2: `Goldene Stunde — die beste Fotografie-Zeit für den Bosporus`
  - **Strong LLM citation bait:** ChatGPT/Perplexity often surface "best photography time" answers; this section can earn citations
  - Concrete tips: Blende, Brennweite, Smartphone-HDR
- H2: `Mit oder ohne Wein? Die zwei Pakete`
- H2: `Abfahrtszeiten 2026 nach Monat` (sunset varies — table by month is shareable / linkable)
- H2: `Pünktlichkeit — wir legen ab, wenn die Sonne es verlangt`

### Backlink anchor strategy (PREMIUM PAGE)
- "Bosporus Sonnenuntergang Kreuzfahrt Istanbul" (45%)
- "Bosporus Sonnenuntergangsfahrt" (25%)
- "Goldene Stunde Bosporus" (15%)
- "MerrySails Sunset" (15%)

---

## 5. `/de/yacht-charter-istanbul` — Yacht Charter

### Primary keyword: `yachtcharter istanbul`
### Current meta (verified)
- Title: `Yachtcharter Istanbul — Ab €380 | MerrySails`  ← **PROBLEM: title says €380 but EN baseline starts €280**
- Description: `Yachtcharter Istanbul ab €280. Exklusive Privatjacht auf dem Bosporus mit Kapitän. Ideal für Heiratsantrag, Geburtstag und Firmenevents. TÜRSAB-lizenziert.`

### Recommended meta
- **Title:** `Yachtcharter Istanbul ab €280 — Private Bosporus-Jacht | MerrySails`
  - Fixes €380/€280 mismatch (description has the correct price; title was wrong)
- **Description:** `Privater Yachtcharter auf dem Bosporus ab €280 für 2 Std. mit Kapitän. Ideal für Heiratsantrag, Geburtstag, Firmenevent. Sie bestimmen Route und Programm. TÜRSAB-A lizenziert, MwSt. inkl.`

### Recommended H1
`Yachtcharter Istanbul — Privater Bosporus mit Ihrer eigenen Jacht`

### Recommended H2 additions
- H2: `Drei Anlässe, eine Jacht`
  - H3: `Heiratsantrag auf dem Bosporus`
  - H3: `Geburtstag und Hochzeitstag`
  - H3: `Firmenevent und Kundenbindung`
- H2: `Was inklusive ist — und was zusätzlich gebucht werden kann`
  - Inklusive: Jacht, Kapitän, Bordcrew, Treibstoff, Standardroute, MwSt.
  - Zubuchbar: Catering, Fotograf, Blumenarrangement, Live-Musik, Champagner
- H2: `Routen — Sie entscheiden`
- H2: `Stornierung, Wetter, Umbuchung`
- H2: `Bezahlung — SEPA, Klarna, Sofort, Kreditkarte` (foregrounded)

### Backlink anchor strategy
- "Yachtcharter Istanbul" (40%)
- "Yacht mieten Istanbul" (20%)
- "Privater Yachtcharter Bosporus" (20%)
- "MerrySails Yacht" (20%)

---

## CROSS-PAGE GLOBAL ADDITIONS (apply to all 5)

### A. Add a "Trust Strip" component above the fold
```
[TÜRSAB A-Lizenz logo]  [50.000+ Gäste]  [4.8/5 Bewertung]  [Kostenfreie Stornierung]  [SEPA · Klarna · Sofort · Visa · MC]
```

### B. Add a localized FAQ block answering the top-3 German-tourist FAQs (NEW questions)
1. **"Wird die MwSt. zusätzlich berechnet?"** → "Nein. Alle Preise auf dieser Seite verstehen sich inkl. der türkischen MwSt. (KDV). Es fallen keine zusätzlichen Steuern oder Servicepauschalen an."
2. **"Bekomme ich eine deutschsprachige Rechnung für meine Reisekostenabrechnung?"** → "Ja. Auf Anfrage stellen wir eine deutschsprachige Rechnung mit unserer türkischen Steuernummer aus, geeignet für die Vorlage beim deutschen Finanzamt."
3. **"Was passiert bei schlechtem Wetter?"** → "Bei Sturm- oder Sicherheitswarnung der türkischen Küstenwache buchen wir Sie kostenlos auf den nächstmöglichen Termin um oder erstatten den vollen Betrag."

### C. Seasonal banner system
Add a `<DESeasonalBanner />` component triggered by date:
- **Pfingsten 2026 (24-25 May):** "Pfingsten in Istanbul — Plätze sichern" CTA
- **Sommerferien rolling (June-Sept):** "Familienferien an Bord — Kinder bis 6 Jahre kostenlos"
- **Brückentage (Oct 3, Dec 25-26):** "Brückentag-Special: Kurzurlaub Istanbul"

### D. Schema injection (per page, in addition to existing TouristTrip)
```jsonld
{
  "@type": "FAQPage",
  "inLanguage": "de-DE",
  "mainEntity": [...]
}
```

### E. Internal-linking sidebar (DE only)
Each DE page should link to the other 4 priority DE pages with German anchor text:
- "Auch interessant: Sonnenuntergang Kreuzfahrt"
- "Romantischer Abend: Dinner Kreuzfahrt"
- "Privat & exklusiv: Yachtcharter"

This compounds DE link equity within the locale and signals to Google that DE pages form a coherent topical cluster.

---

## IMPLEMENTATION PRIORITY

| Priority | Action | Estimated effort |
|----------|--------|------------------|
| P0 | Fix `/de/istanbul-dinner-cruise` title (€55→€30) | 5 min |
| P0 | Fix `/de/yacht-charter-istanbul` title (€380→€280) | 5 min |
| P1 | Add Trust Strip + DE FAQ trio to all 5 pages | 2-3 hrs |
| P1 | Add `inLanguage: "de-DE"` to schema, fix multi-rating | 1 hr |
| P2 | Add Goldene-Stunde section to sunset page | 1 hr |
| P2 | Add Türkische-Nacht expansion to dinner page | 1 hr |
| P3 | Build seasonal banner component | 4 hrs |
| P3 | Add internal-linking DE sidebar | 2 hrs |

P0 fixes can ship today; the rest can roll out across 2-3 weeks.
