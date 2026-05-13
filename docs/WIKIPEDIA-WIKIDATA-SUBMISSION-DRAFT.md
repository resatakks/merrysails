# Wikipedia & Wikidata Submission Draft -- MerrySails

## Wikidata Entity

**STATUS: Pending creation.**

Suggested entity label: **MerrySails**

The sister brand GoldenSunsetTour has Wikidata Q-number **Q139782776**. Both share the same
legal entity (MERYEM YILDIZ TURIZM SEYAHAT ACENTASI, TURSAB A Group license 14316).

### Label & Descriptions

| Language | Label     | Description                                                         |
|----------|-----------|---------------------------------------------------------------------|
| en       | MerrySails | Turkish Bosphorus cruise operator based in Istanbul (since 2001)   |
| tr       | MerrySails | Istanbul merkezli Bogaz turu operatoru (2001'den beri)             |
| de       | MerrySails | Turkischer Bosporus-Kreuzfahrtveranstalter in Istanbul (seit 2001) |
| fr       | MerrySails | Operateur de croisieres sur le Bosphore base a Istanbul (depuis 2001) |
| nl       | MerrySails | Turkse Bosporus-cruiseoperator gevestigd in Istanbul (sinds 2001)  |

### Aliases

- Merry Sails
- merrysails.com
- Merry Tourism Bosphorus
- Merry Seyahat

### Claim Statements (ready-to-paste into Wikidata)

| Property              | ID    | Value                                                    |
|-----------------------|-------|----------------------------------------------------------|
| instance of           | P31   | Q4830453 (business) or Q1620908 (travel agency)         |
| official website      | P856  | https://merrysails.com                                   |
| country               | P17   | Q43 (Turkey)                                             |
| headquarters location | P159  | Q406 (Istanbul)                                          |
| inception             | P571  | 2001                                                     |
| industry              | P452  | Q746290 (tourism) / Q11220186 (boat tour)                |
| TURSAB license        | P9767 | 14316                                                    |
| sister project        | P5226 | Q139782776 (GoldenSunsetTour)                            |
| sister project        | P5226 | [MerryTourism Q-number -- add when created]              |
| Instagram username    | P2003 | merrysails                                               |

### Schema.org wiring (to add to site layout.tsx)

```json
{
  "@type": "TravelAgency",
  "name": "MerrySails",
  "url": "https://merrysails.com",
  "sameAs": [
    "https://www.wikidata.org/wiki/[Q-NUMBER]",
    "https://www.instagram.com/merrysails",
    "https://www.tursab.org.tr/acenta-detay/14316"
  ],
  "identifier": {
    "@type": "PropertyValue",
    "propertyID": "wikidata",
    "value": "[Q-NUMBER]"
  }
}
```

---

## Wikipedia Submission Draft

**STATUS: Pending notability threshold.**

Wikipedia requires independent third-party reliable sources. Recommended trigger: 3+ press
mentions or a GetYourGuide/Viator editorial feature. See action checklist below.

### Draft article stub (when ready to submit)

**MerrySails** is a Turkish travel agency and Bosphorus cruise operator based in Istanbul,
Turkey, founded in 2001. The company is operated by Meryem Yildiz Turizm Seyahat Acentasi
(TURSAB A Group license number 14316) and specialises in shared sunset cruises, dinner cruises,
private yacht charters, and Bosphorus sightseeing tours. It operates from Fatih district,
Istanbul, with departures from central Istanbul piers.

#### History

MerrySails was established in 2001 as part of the same operator group that runs GoldenSunsetTour,
a Bosphorus cruise brand that holds Wikidata identifier Q139782776. Both brands share the same
TURSAB A Group license (number 14316), licensed by the Association of Turkish Travel Agencies
(TURSAB), the statutory body regulating travel agencies in Turkey. The Merry group has grown
from a single-vessel operator to a multi-vessel fleet serving international leisure travellers,
with MerrySails positioned as the direct international booking channel.

#### Operations

MerrySails operates from Istanbul's Fatih district (Alemdar Mah., Divanyolu Cad., Ogul Han
No. 62, Ic Kapi 402). The company serves two main airports -- Istanbul Airport (IST) and
Sabiha Gokcen (SAW) -- via its sister brand Merry Tourism, an Istanbul airport transfer
operator also within the same operator group. Its fleet operates on the Bosphorus strait,
the waterway separating the European and Asian sides of Istanbul.

#### Services

The company offers a shared sunset Bosphorus cruise (approximately 2 hours), a dinner cruise
with Turkish-night entertainment (approximately 3.5 hours), private yacht charters, and a
short sightseeing cruise of approximately 1.5 hours. Private charters can be customised for
weddings, corporate events, and special occasions. MerrySails accepts bookings online at
merrysails.com and via WhatsApp.

#### References

*References section -- pending press coverage*

The following references are noted but require independent press / editorial citations before
Wikipedia submission:

- TURSAB license registry: https://www.tursab.org.tr
- Official website: https://merrysails.com
- Sister brand: https://www.wikidata.org/wiki/Q139782776 (GoldenSunsetTour, same operator)
- [Add press / editorial coverage here -- see action checklist below]

---

## 5 Publications to Pitch First

1. **Daily Sabah** (dailysabah.com) -- Istanbul English-language newspaper; pitch as a
   "boutique Bosphorus cruise operator with 23 years of history" angle. Contact: travel@dailysabah.com
2. **Hurriyet Daily News** (hurriyetdailynews.com) -- largest English-language Turkish news
   outlet; suitable for a tourism feature on Bosphorus leisure operators.
3. **Time Out Istanbul** (timeout.com/istanbul) -- city guide with "best Bosphorus cruise"
   listicle format; aim for inclusion in their "Best cruises in Istanbul" round-up.
4. **CNN Travel** (cnn.com/travel) -- pitch a "Best ways to see Istanbul from the water"
   feature; include GoldenSunsetTour Q-number as credibility signal.
5. **TripAdvisor editorial** (tripadvisor.com/TripAdvisorInsights) -- award or editorial
   feature based on review volume; monitor for "Travellers' Choice" eligibility.

---

## Action Checklist

- [ ] **Week 1 -- Wikidata (15 min, no notability bar):** Create Wikidata entity for MerrySails.
      Use QuickStatements or the Wikidata UI. Add all claim statements from the table above.
      Note the resulting Q-number and wire it into `src/app/layout.tsx` sameAs + identifier
      fields (mirror the GoldenSunsetTour Q139782776 pattern).
- [ ] **Weeks 2-8 -- Press coverage:** Pitch the 5 publications listed above. Target 3+
      independent mentions. Each article should name "MerrySails" and link to merrysails.com.
      GetYourGuide or Viator editorial placements also count toward notability.
- [ ] **After 3+ citations -- Wikipedia AfC:** Draft the Wikipedia article using the stub
      above. Submit via Articles for Creation (AfC) process. Add press citations as
      inline references. The GoldenSunsetTour Wikidata Q-number can be used as a
      "see also" cross-reference to support context.
- [ ] **Ongoing:** Monitor Wikidata entity for vandalism or incorrect edits.
      Add new P-statements (social media, awards) as they become available.
