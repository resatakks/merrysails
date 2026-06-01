/**
 * Shared content + data for the /bosphorus-cruise-from-[district] landing
 * pages (Tier-2 high-intent SERP capture).
 *
 * Each district object is a self-contained content brief that the shared
 * page template renders. Adding a new district = one entry here +
 * a thin page.tsx that imports the district and renders the template.
 */

import type { ReactNode } from "react";

export type HotelClusterDistrict = {
  slug: string;            // bosphorus-cruise-from-sultanahmet
  name: string;            // Sultanahmet
  side: "European" | "Asian";
  introCapsule: string;    // 40-60 word answer-capsule
  knownHotels: string[];   // listed in body (helps capture branded co-search)
  transportToPier: Array<{ mode: string; detail: string }>;
  recommendedCruise: "sunset" | "dinner" | "yacht";
  pickupEligible: boolean; // whether dinner-cruise hotel transfer covers
  walkingTimeMin: number;
  taxiCostTL: string;
  faqs: Array<{ q: string; a: string }>;
};

/**
 * Turkish locale variants — used by /tr/bosphorus-cruise-from-<district>.
 * Native Turkish content (NOT machine-translated). Shares the same
 * underlying structure so the HotelClusterPage component renders both
 * EN + TR with the same shape.
 */
export const HOTEL_CLUSTER_DISTRICTS_TR: Record<string, HotelClusterDistrict> = {
  sultanahmet: {
    slug: "bosphorus-cruise-from-sultanahmet",
    name: "Sultanahmet",
    side: "European",
    introCapsule:
      "Sultanahmet'ten Boğaz turu — paylaşımlı gün batımı (Pzt/Sal/Per) €30'dan, akşam yemekli (Silver Soft) €30'dan. Sultanahmet otelleri Kabataş iskelesine T1 tramvayıyla 8-12 dakika, taksi 15 dakika. Akşam yemekli turda otel pickup dahil — rezervasyon sonrası WhatsApp ile teyit edilir.",
    knownHotels: [
      "Four Seasons Sultanahmet",
      "Sirkeci Mansion",
      "Hotel Amira",
      "Sura Hagia Sophia",
      "White House Hotel",
      "Hotel Sphendon",
    ],
    transportToPier: [
      { mode: "T1 Tramvayı", detail: "Sultanahmet durağı → Kabataş son durak (8-12 dk, ~30 TL)" },
      { mode: "Taksi (BiTaksi)", detail: "Sultanahmet → Kabataş (~15 dk yoğun olmayan saatlerde, 80-120 TL)" },
      { mode: "Yürüyüş", detail: "Önerilmez — Hipodrom ve Gülhane üzerinden 30+ dakika yokuşlu" },
      { mode: "Otel transferi", detail: "Akşam yemekli turda dahil — pickup zamanı WhatsApp ile teyit edilir" },
    ],
    recommendedCruise: "dinner",
    pickupEligible: true,
    walkingTimeMin: 30,
    taxiCostTL: "80-120 TL",
    faqs: [
      {
        q: "Sultanahmet'ten akşam yemekli boğaz turunda otel pickup dahil mi?",
        a: "Evet. Dört akşam yemekli paket de (€30 Silver Soft, €45 Silver Alkollü, €80 Gold Soft, €90 Gold Sınırsız Alkol) Sultanahmet otellerinden otel pickup içerir. Pickup zamanı bir gün önce WhatsApp ile teyit edilir, genelde 20:30 Kabataş kalkışından 30-45 dakika önce.",
      },
      {
        q: "Sultanahmet'ten kendi başıma iskeleye nasıl giderim?",
        a: "En basit yol T1 tramvayı: Sultanahmet'ten binin, son durak Kabataş, iskele tramvay durağından 30 metre. Yolculuk 8-12 dakika. Taksiyle (BiTaksi veya iTaksi) Sultanahmet → Kabataş yoğun olmayan saatlerde 15 dakika, 80-120 TL.",
      },
      {
        q: "Sultanahmet otelinden hangi tur formatı en uygun?",
        a: "Akşam yemekli tur (€30 Silver Soft → €90 Gold Sınırsız Alkol) çünkü otel pickup dahil — ulaşım adımını atlıyorsunuz. Gün batımı turu (€34, Pzt/Sal/Per €30) Karaköy iskelesine kendi başınıza ulaşmayı gerektirir — Sultanahmet'ten T1 tramvayı + 5 dakika yürüyüş demek.",
      },
      {
        q: "Aynı gün İstanbul Havalimanı'na indikten sonra boğaz turuna gidebilir miyim?",
        a: "Mümkün ama dar. IST varışından Kabataş iskelesine 3 saat hesaplayın (90 dakika transfer + tampon). 20:30 akşam yemekli tur kalkışı için uçağın 16:30'a kadar inmesi gerekir. Daha rahat yol: 1. gün otel check-in + dinlenme, 2. gün akşam tur.",
      },
    ],
  },
  taksim: {
    slug: "bosphorus-cruise-from-taksim",
    name: "Taksim",
    side: "European",
    introCapsule:
      "Taksim'den Boğaz turu — gün batımı €30 (Pzt/Sal/Per) ve akşam yemekli Silver Soft €30. Taksim otelleri Kabataş iskelesine F1 füniküleriyle 5-7 dakika (tek durak) veya taksi 10 dakika. Füniküler 06:00'dan gece yarısına kadar her 4 dakikada bir.",
    knownHotels: [
      "The Marmara Taksim",
      "Swissotel The Bosphorus",
      "Hyatt Regency Istanbul Atakoy",
      "Pera Palace Hotel Jumeirah",
      "Park Bosphorus Hotel",
      "DoubleTree by Hilton Istanbul Esentepe",
      "InterContinental Istanbul",
      "Hilton Istanbul Bosphorus",
    ],
    transportToPier: [
      { mode: "F1 Füniküleri", detail: "Taksim → Kabataş (1 durak, 4-5 dk, ~30 TL)" },
      { mode: "Taksi (BiTaksi)", detail: "Taksim → Kabataş (~10 dk, 60-90 TL)" },
      { mode: "Yürüyüş", detail: "Mümkün — Sıraselviler üzerinden 15 dk yokuş aşağı" },
      { mode: "Otel transferi", detail: "Akşam yemekli turda dahil — pickup zamanı WhatsApp ile teyit edilir" },
    ],
    recommendedCruise: "sunset",
    pickupEligible: true,
    walkingTimeMin: 15,
    taxiCostTL: "60-90 TL",
    faqs: [
      {
        q: "Taksim'den iskeleye ne kadar sürer?",
        a: "F1 füniküleriyle 5-7 dakika (Taksim metro'dan Kabataş'a tek durak, 06:00'dan gece yarısına her 4 dakikada). Taksiyle yoğun olmayan saatlerde 10 dakika, 60-90 TL. Yürüyerek Sıraselviler caddesi üzerinden 15 dakika yokuş aşağı.",
      },
      {
        q: "Taksim'den akşam yemekli turda otel pickup dahil mi?",
        a: "Evet — dört akşam yemekli paket de Taksim otellerinden otel pickup içerir. Pickup zamanı bir gün önce WhatsApp ile teyit edilir, genelde 20:30 Kabataş kalkışından 30-45 dakika önce.",
      },
      {
        q: "Taksim otelinden hangi tur formatı en uygun?",
        a: "Her ikisi de iyi ama gün batımı turu (€30 Pzt/Sal/Per, €34 diğer günler) Taksim'den özellikle kolay — F1 füniküleri sizi Kabataş'a 5 dakikada bırakır, 19:00 kalkış için otelden 18:15'te ayrılabilirsiniz. Akşam yemekli tur da pickup dahil çalışır.",
      },
      {
        q: "Taksim'den iskeleye yürüyebilir miyim?",
        a: "Evet — Sıraselviler Caddesi üzerinden 15 dakika yokuş aşağı. İlkbahar/sonbaharda hoş ama yaz sıcağında veya kış yağmurunda rahatsız. F1 füniküleri akşam turları için çok daha iyi seçim — taze varırsınız.",
      },
    ],
  },
  beyoglu: {
    slug: "bosphorus-cruise-from-beyoglu",
    name: "Beyoğlu",
    side: "European",
    introCapsule:
      "Beyoğlu'ndan Boğaz turu — paylaşımlı gün batımı veya akşam yemekli Silver Soft €30'dan. Beyoğlu otelleri (Karaköy, Galata, Cihangir, Pera) Kabataş iskelesine tramvay veya taksiyle 10-25 dakika. Karaköy otelleri gün batımı turu iskelesine en yakın (5 dakika yürüyüş).",
    knownHotels: [
      "Soho House Istanbul",
      "Sumahan on the Water",
      "10 Karaköy",
      "Pera Palace Hotel Jumeirah",
      "Tomtom Suites",
      "Witt Istanbul Suites",
      "Georges Hotel Galata",
      "The Stay Bosphorus",
    ],
    transportToPier: [
      { mode: "Yürüyüş (Karaköy)", detail: "Karaköy otelleri → Karaköy iskelesi (gün batımı turu): 5 dakika" },
      { mode: "T1 Tramvayı", detail: "Karaköy / Tophane durağı → Kabataş (1-2 durak, 4-6 dk)" },
      { mode: "F1 Füniküleri", detail: "Galata / Tünel bölgesi → Taksim üzerinden Kabataş (toplam 8 dk)" },
      { mode: "Taksi (BiTaksi)", detail: "Pera / Cihangir → Kabataş (~10 dk, 70-100 TL)" },
      { mode: "Otel transferi", detail: "Akşam yemekli turda merkezi Beyoğlu mahallelerinden dahil" },
    ],
    recommendedCruise: "sunset",
    pickupEligible: true,
    walkingTimeMin: 5,
    taxiCostTL: "70-100 TL",
    faqs: [
      {
        q: "Karaköy otelleri gün batımı turu iskelesine ne kadar yakın?",
        a: "Çok yakın. Karaköy otelleri (10 Karaköy, Soho House, Sumahan on the Water) gün batımı turunun bindiği Karaköy iskelesinden 5 dakika yürüyüş. Biniş noktası Galata Köprüsü'nün hemen kuzeyinde, Mimar Sinan heykelinin yanında.",
      },
      {
        q: "Beyoğlu'ndan akşam yemekli turda otel pickup var mı?",
        a: "Evet, merkezi Beyoğlu mahallelerinden (Karaköy, Galata, Cihangir, Pera, Beyoğlu) pickup mevcut. Pickup aracı sizi otelden alır ve 20:30 akşam yemekli tur kalkışı için Kabataş iskelesine bırakır. Pickup zamanı bir gün önce WhatsApp ile teyit edilir.",
      },
      {
        q: "Boğaz turu için en uygun Beyoğlu otel bölgesi hangisi?",
        a: "Karaköy gün batımı turu iskelesine en yakın (5 dakika yürüyüş). Galata her ikisi için iyi — akşam yemekli için 8 dakikalık füniküler, gün batımı için 5 dakika Karaköy'e iniş. Pera ve Cihangir tramvay veya taksi gerektirir ama yine de 10-15 dakika toplam.",
      },
      {
        q: "Beyoğlu'ndan akşam iskeleye yürüyebilir miyim?",
        a: "Karaköy'den evet — 5 dakika her hava koşulunda yürünebilir. Galata'dan 12-15 dakika yokuş aşağı (geri dönüşte yokuş yukarı). Pera veya Cihangir'den yürüyüş 20-30 dakika ve karanlık sonrası Tarlabaşı'nı içeren rota önerilmez.",
      },
    ],
  },
};

export const HOTEL_CLUSTER_DISTRICTS: Record<string, HotelClusterDistrict> = {
  sultanahmet: {
    slug: "bosphorus-cruise-from-sultanahmet",
    name: "Sultanahmet",
    side: "European",
    introCapsule:
      "Bosphorus cruise from Sultanahmet starts at €30 per person on the shared sunset cruise (Mon/Tue/Thu) or €30 on the dinner cruise (Silver Soft package). Sultanahmet hotels are 8-12 minutes from Kabataş pier by tram T1, or 15 minutes by taxi. Hotel pickup is included on dinner cruise packages — confirmed by WhatsApp the day before departure.",
    knownHotels: [
      "Four Seasons Sultanahmet",
      "Sirkeci Mansion",
      "Hotel Amira",
      "Sura Hagia Sophia",
      "White House Hotel",
      "Hotel Sphendon",
    ],
    transportToPier: [
      { mode: "Tram T1", detail: "Sultanahmet station → Kabataş end station (8-12 min, ~30 TL)" },
      { mode: "Taxi (BiTaksi)", detail: "Sultanahmet → Kabataş (~15 min off-peak, 80-120 TL)" },
      { mode: "Walking", detail: "Not recommended — 30+ minutes uphill via Hippodrome and Gülhane" },
      { mode: "Hotel pickup", detail: "Included on dinner cruise — pickup confirmed by WhatsApp" },
    ],
    recommendedCruise: "dinner",
    pickupEligible: true,
    walkingTimeMin: 30,
    taxiCostTL: "80-120 TL",
    faqs: [
      {
        q: "Is hotel pickup from Sultanahmet included on the Bosphorus dinner cruise?",
        a: "Yes. All four dinner cruise packages (€30 Silver Soft, €45 Silver Alcoholic, €80 Gold Soft, €90 Gold Unlimited Alcohol) include hotel pickup from Sultanahmet hotels. The pickup time is confirmed by WhatsApp the day before, typically 30-45 minutes before the 20:30 Kabataş departure.",
      },
      {
        q: "How do I get from Sultanahmet to the cruise pier on my own?",
        a: "The simplest path is the T1 tram: board at Sultanahmet station, exit at Kabataş (end of the line), and the pier is 30 metres from the tram stop. The ride is 8-12 minutes. By taxi (BiTaksi or iTaksi), Sultanahmet → Kabataş takes 15 minutes off-peak and costs 80-120 TL.",
      },
      {
        q: "Which cruise format fits a Sultanahmet hotel best?",
        a: "The dinner cruise (€30 Silver Soft → €90 Gold Unlimited) because hotel pickup is included — you skip the transport step entirely. The sunset cruise (€34, or €30 Mon/Tue/Thu) requires self-arrival at Karaköy pier, which from Sultanahmet means the T1 tram + a 5-minute walk.",
      },
      {
        q: "Can I do the Bosphorus cruise on the same day I land at Istanbul Airport?",
        a: "Workable but tight. Allow 3 hours from IST arrival to Kabataş pier (90-min transfer + buffer). For a 20:30 dinner cruise departure, the flight should land by 16:30. Easier path: Day 1 hotel check-in + rest, Day 2 evening cruise.",
      },
    ],
  },

  taksim: {
    slug: "bosphorus-cruise-from-taksim",
    name: "Taksim",
    side: "European",
    introCapsule:
      "Bosphorus cruise from Taksim starts at €30 per person — the sunset cruise (Mon/Tue/Thu) and the dinner cruise Silver Soft package are both €30. Taksim hotels are 5-7 minutes from Kabataş pier via the F1 funicular (one stop) or 10 minutes by taxi. The funicular runs every 4 minutes from 06:00 to midnight.",
    knownHotels: [
      "The Marmara Taksim",
      "Swissotel The Bosphorus",
      "Hyatt Regency Istanbul Atakoy",
      "Pera Palace Hotel Jumeirah",
      "Park Bosphorus Hotel",
      "DoubleTree by Hilton Istanbul Esentepe",
      "InterContinental Istanbul",
      "Hilton Istanbul Bosphorus",
    ],
    transportToPier: [
      { mode: "F1 funicular", detail: "Taksim → Kabataş (1 stop, 4-5 min, ~30 TL)" },
      { mode: "Taxi (BiTaksi)", detail: "Taksim → Kabataş (~10 min, 60-90 TL)" },
      { mode: "Walking", detail: "Possible — 15 min downhill via Sıraselviler" },
      { mode: "Hotel pickup", detail: "Included on dinner cruise — pickup confirmed by WhatsApp" },
    ],
    recommendedCruise: "sunset",
    pickupEligible: true,
    walkingTimeMin: 15,
    taxiCostTL: "60-90 TL",
    faqs: [
      {
        q: "How long from Taksim to the Bosphorus cruise pier?",
        a: "5-7 minutes via the F1 funicular (one stop from Taksim metro to Kabataş, runs every 4 minutes from 06:00 to midnight). By taxi, 10 minutes off-peak and 60-90 TL. Walking is 15 minutes downhill via Sıraselviler.",
      },
      {
        q: "Is hotel pickup from Taksim included on the dinner cruise?",
        a: "Yes — all four dinner cruise packages include hotel pickup from Taksim hotels. The pickup time is confirmed by WhatsApp the day before, typically 30-45 minutes before the 20:30 Kabataş departure.",
      },
      {
        q: "Which cruise format fits a Taksim hotel best?",
        a: "Either works, but the sunset cruise (€30 Mon/Tue/Thu, €34 other days) is particularly easy from Taksim because the F1 funicular puts you at Kabataş in 5 minutes — you can leave the hotel at 18:15 for a 19:00 departure. The dinner cruise also works with pickup included.",
      },
      {
        q: "Can I walk from Taksim to the Bosphorus cruise pier?",
        a: "Yes — 15 minutes downhill via Sıraselviler Caddesi. The walk is pleasant in spring/autumn but uncomfortable in summer heat or winter rain. The F1 funicular is a far better choice for evening cruises when you want to arrive fresh.",
      },
    ],
  },

  beyoglu: {
    slug: "bosphorus-cruise-from-beyoglu",
    name: "Beyoğlu",
    side: "European",
    introCapsule:
      "Bosphorus cruise from Beyoğlu starts at €30 per person on the shared sunset or dinner Silver Soft package. Beyoğlu hotels (Karaköy, Galata, Cihangir, Pera) are 10-25 minutes from Kabataş pier by tram or taxi. Karaköy hotels are closest to the sunset cruise pier (5-minute walk). Hotel pickup is included on dinner cruise from Beyoğlu central districts.",
    knownHotels: [
      "Soho House Istanbul",
      "Sumahan on the Water",
      "10 Karaköy",
      "Pera Palace Hotel Jumeirah",
      "Tomtom Suites",
      "Witt Istanbul Suites",
      "Georges Hotel Galata",
      "The Stay Bosphorus",
    ],
    transportToPier: [
      { mode: "Walking (Karaköy)", detail: "Karaköy hotels → Karaköy pier (sunset cruise): 5 minutes" },
      { mode: "Tram T1", detail: "Karaköy / Tophane station → Kabataş (1-2 stops, 4-6 min)" },
      { mode: "F1 funicular", detail: "Galata / Tunel area → Kabataş via Taksim (8 min total)" },
      { mode: "Taxi (BiTaksi)", detail: "Pera / Cihangir → Kabataş (~10 min, 70-100 TL)" },
      { mode: "Hotel pickup", detail: "Included on dinner cruise from central Beyoğlu districts" },
    ],
    recommendedCruise: "sunset",
    pickupEligible: true,
    walkingTimeMin: 5,
    taxiCostTL: "70-100 TL",
    faqs: [
      {
        q: "How close are Karaköy hotels to the sunset cruise pier?",
        a: "Very close. Karaköy hotels (10 Karaköy, Soho House, Sumahan on the Water) are 5 minutes on foot from the Karaköy ferry pier where the sunset cruise boards. The boarding point sits just north of the Galata Bridge, by the Mimar Sinan statue.",
      },
      {
        q: "Is the Bosphorus dinner cruise pickup available from Beyoğlu?",
        a: "Yes from central Beyoğlu districts (Karaköy, Galata, Cihangir, Pera, Beyoğlu proper). The pickup vehicle picks you up at the hotel and drops at Kabataş pier for the 20:30 dinner cruise departure. Specific pickup time is confirmed by WhatsApp the day before.",
      },
      {
        q: "What's the best Beyoğlu hotel area for someone planning a Bosphorus cruise?",
        a: "Karaköy is closest to the sunset cruise pier (5-minute walk). Galata is excellent for both — 8-minute funicular ride to Kabataş for dinner cruise, 5-minute walk down to Karaköy for sunset. Pera and Cihangir need a tram or taxi but are still 10-15 minutes total.",
      },
      {
        q: "Can I walk from Beyoğlu to the cruise pier in the evening?",
        a: "From Karaköy, yes — 5 minutes is genuinely walkable in any weather. From Galata, 12-15 minutes downhill (uphill on return). From Pera or Cihangir, walking is 20-30 minutes and not recommended after dark when the route includes Tarlabaşı.",
      },
    ],
  },
};
