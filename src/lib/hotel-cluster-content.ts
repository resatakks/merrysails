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
        a: "Çok yakın. Karaköy otelleri (10 Karaköy, Soho House, Sumahan on the Water) gün batımı turunun bindiği Karaköy iskelesinden 5 dakika yürüyüş. Biniş noktası Galata Köprüsü'nün hemen kuzeyinde, Balıkçı Kemal restoranının yanında.",
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

/**
 * German locale variants — used by /de/bosphorus-cruise-from-<district>.
 * Native German content (NOT machine-translated). Same shape as TR/EN.
 */
export const HOTEL_CLUSTER_DISTRICTS_DE: Record<string, HotelClusterDistrict> = {
  sultanahmet: {
    slug: "bosphorus-cruise-from-sultanahmet",
    name: "Sultanahmet",
    side: "European",
    introCapsule:
      "Bosporus-Kreuzfahrt ab Sultanahmet — Sonnenuntergangs-Tour (Mo/Di/Do) ab €30, Dinner-Cruise (Silver Soft) ab €30. Sultanahmet-Hotels sind 8-12 Minuten mit der T1-Straßenbahn vom Kabataş-Anleger entfernt, mit dem Taxi 15 Minuten. Hotel-Abholung in den Dinner-Cruise-Paketen enthalten — Bestätigung per WhatsApp.",
    knownHotels: [
      "Four Seasons Sultanahmet",
      "Sirkeci Mansion",
      "Hotel Amira",
      "Sura Hagia Sophia",
      "White House Hotel",
      "Hotel Sphendon",
    ],
    transportToPier: [
      { mode: "Straßenbahn T1", detail: "Sultanahmet → Endstation Kabataş (8-12 Min., ~30 TL)" },
      { mode: "Taxi (BiTaksi)", detail: "Sultanahmet → Kabataş (~15 Min. außerhalb der Stoßzeiten, 80-120 TL)" },
      { mode: "Zu Fuß", detail: "Nicht empfohlen — 30+ Min. bergauf über Hippodrom und Gülhane" },
      { mode: "Hotel-Transfer", detail: "Im Dinner-Cruise inklusive — Abholzeit per WhatsApp bestätigt" },
    ],
    recommendedCruise: "dinner",
    pickupEligible: true,
    walkingTimeMin: 30,
    taxiCostTL: "80-120 TL",
    faqs: [
      {
        q: "Ist die Hotel-Abholung von Sultanahmet im Dinner-Cruise enthalten?",
        a: "Ja. Alle vier Dinner-Cruise-Pakete (€30 Silver Soft, €45 Silver Alkohol, €80 Gold Soft, €90 Gold Unbegrenzt Alkohol) beinhalten Hotel-Abholung aus Sultanahmet. Die Abholzeit wird einen Tag vorher per WhatsApp bestätigt, meist 30-45 Minuten vor der 20:30 Abfahrt in Kabataş.",
      },
      {
        q: "Wie komme ich von Sultanahmet allein zum Anleger?",
        a: "Am einfachsten mit der T1-Straßenbahn: an der Haltestelle Sultanahmet einsteigen, Endstation Kabataş (8-12 Min.). Der Anleger ist 30 Meter von der Straßenbahnhaltestelle. Per Taxi (BiTaksi) außerhalb der Stoßzeiten 15 Min., 80-120 TL.",
      },
      {
        q: "Welches Cruise-Format passt am besten zu Sultanahmet-Hotels?",
        a: "Der Dinner-Cruise (€30 Silver Soft → €90 Gold Unbegrenzt Alkohol), weil die Hotel-Abholung inklusive ist — der Transport-Schritt entfällt. Die Sonnenuntergangs-Tour (€34, Mo/Di/Do €30) erfordert eigene Anreise zum Karaköy-Anleger, von Sultanahmet T1 + 5 Min. zu Fuß.",
      },
      {
        q: "Kann ich am Anreisetag vom Flughafen IST direkt zum Cruise?",
        a: "Möglich, aber knapp. Vom Flughafen IST zum Kabataş-Anleger 3 Stunden einplanen (90 Min. Transfer + Puffer). Für den 20:30 Dinner-Cruise sollte die Maschine bis 16:30 landen. Komfortabler: Tag 1 Hotel-Check-in + Erholung, Tag 2 Abend-Cruise.",
      },
    ],
  },
  taksim: {
    slug: "bosphorus-cruise-from-taksim",
    name: "Taksim",
    side: "European",
    introCapsule:
      "Bosporus-Kreuzfahrt ab Taksim — Sonnenuntergangs-Tour €30 (Mo/Di/Do) und Dinner-Cruise Silver Soft €30. Taksim-Hotels erreichen den Kabataş-Anleger in 5-7 Minuten mit der F1-Standseilbahn (eine Station) oder 10 Minuten mit dem Taxi. Die Standseilbahn fährt von 06:00 bis Mitternacht alle 4 Minuten.",
    knownHotels: [
      "The Marmara Taksim",
      "Swissotel The Bosphorus",
      "Pera Palace Hotel Jumeirah",
      "Park Bosphorus Hotel",
      "DoubleTree by Hilton Istanbul Esentepe",
      "InterContinental Istanbul",
      "Hilton Istanbul Bosphorus",
    ],
    transportToPier: [
      { mode: "Standseilbahn F1", detail: "Taksim → Kabataş (1 Station, 4-5 Min., ~30 TL)" },
      { mode: "Taxi (BiTaksi)", detail: "Taksim → Kabataş (~10 Min., 60-90 TL)" },
      { mode: "Zu Fuß", detail: "Möglich — 15 Min. bergab über Sıraselviler" },
      { mode: "Hotel-Transfer", detail: "Im Dinner-Cruise inklusive — Abholzeit per WhatsApp bestätigt" },
    ],
    recommendedCruise: "sunset",
    pickupEligible: true,
    walkingTimeMin: 15,
    taxiCostTL: "60-90 TL",
    faqs: [
      {
        q: "Wie lange braucht man von Taksim zum Anleger?",
        a: "Mit der F1-Standseilbahn 5-7 Minuten (Taksim Metro → Kabataş, eine Station, alle 4 Min. von 06:00 bis Mitternacht). Per Taxi außerhalb der Stoßzeiten 10 Min., 60-90 TL. Zu Fuß über Sıraselviler 15 Min. bergab.",
      },
      {
        q: "Ist die Hotel-Abholung von Taksim im Dinner-Cruise enthalten?",
        a: "Ja — alle vier Dinner-Cruise-Pakete beinhalten Hotel-Abholung aus Taksim-Hotels. Die Abholzeit wird einen Tag vorher per WhatsApp bestätigt, meist 30-45 Min. vor der 20:30 Abfahrt in Kabataş.",
      },
      {
        q: "Welches Cruise-Format passt zu Taksim-Hotels?",
        a: "Beide funktionieren, aber die Sonnenuntergangs-Tour (€30 Mo/Di/Do, €34 andere Tage) ist besonders einfach — die F1-Standseilbahn bringt Sie in 5 Min. nach Kabataş, für die 19:00 Abfahrt reicht ein Hotel-Aufbruch um 18:15. Der Dinner-Cruise funktioniert auch mit inkl. Abholung.",
      },
      {
        q: "Kann ich von Taksim zu Fuß zum Anleger?",
        a: "Ja — 15 Min. bergab über die Sıraselviler-Straße. Im Frühling/Herbst angenehm, aber bei Sommerhitze oder Winterregen unbequem. Die F1-Standseilbahn ist die bessere Wahl für Abendtouren — frisch ankommen.",
      },
    ],
  },
  beyoglu: {
    slug: "bosphorus-cruise-from-beyoglu",
    name: "Beyoğlu",
    side: "European",
    introCapsule:
      "Bosporus-Kreuzfahrt ab Beyoğlu — Sonnenuntergangs- oder Dinner-Cruise Silver Soft ab €30. Beyoğlu-Hotels (Karaköy, Galata, Cihangir, Pera) erreichen den Kabataş-Anleger in 10-25 Min. mit Tram oder Taxi. Karaköy-Hotels liegen am nächsten zum Sonnenuntergangs-Anleger (5 Min. zu Fuß).",
    knownHotels: [
      "Soho House Istanbul",
      "Sumahan on the Water",
      "10 Karaköy",
      "Pera Palace Hotel Jumeirah",
      "Tomtom Suites",
      "Georges Hotel Galata",
      "The Stay Bosphorus",
    ],
    transportToPier: [
      { mode: "Zu Fuß (Karaköy)", detail: "Karaköy-Hotels → Karaköy-Anleger (Sonnenuntergangs-Tour): 5 Min." },
      { mode: "Straßenbahn T1", detail: "Karaköy / Tophane → Kabataş (1-2 Stationen, 4-6 Min.)" },
      { mode: "Standseilbahn F1", detail: "Galata / Tünel-Bereich → Taksim → Kabataş (insgesamt 8 Min.)" },
      { mode: "Taxi (BiTaksi)", detail: "Pera / Cihangir → Kabataş (~10 Min., 70-100 TL)" },
      { mode: "Hotel-Transfer", detail: "Im Dinner-Cruise aus zentralen Beyoğlu-Vierteln inkl." },
    ],
    recommendedCruise: "sunset",
    pickupEligible: true,
    walkingTimeMin: 5,
    taxiCostTL: "70-100 TL",
    faqs: [
      {
        q: "Wie nah sind Karaköy-Hotels am Sonnenuntergangs-Anleger?",
        a: "Sehr nah. Karaköy-Hotels (10 Karaköy, Soho House, Sumahan on the Water) sind 5 Min. zu Fuß vom Karaköy-Anleger, wo die Sonnenuntergangs-Tour startet. Der Treffpunkt liegt direkt nördlich der Galata-Brücke, beim Mimar-Sinan-Denkmal.",
      },
      {
        q: "Hotel-Abholung von Beyoğlu im Dinner-Cruise?",
        a: "Ja, Abholung aus zentralen Beyoğlu-Vierteln (Karaköy, Galata, Cihangir, Pera, Beyoğlu) ist enthalten. Der Transfer holt Sie ab und bringt Sie für die 20:30 Abfahrt nach Kabataş. Abholzeit per WhatsApp am Vortag bestätigt.",
      },
      {
        q: "Welches Beyoğlu-Viertel passt am besten?",
        a: "Karaköy am nächsten zum Sonnenuntergangs-Anleger (5 Min. zu Fuß). Galata gut für beide — 8 Min. Standseilbahn für Dinner, 5 Min. bergab nach Karaköy für Sonnenuntergang. Pera und Cihangir brauchen Tram oder Taxi, aber insgesamt nur 10-15 Min.",
      },
      {
        q: "Kann man abends von Beyoğlu zum Anleger zu Fuß?",
        a: "Von Karaköy ja — 5 Min. bei jedem Wetter gehbar. Von Galata 12-15 Min. bergab (zurück bergauf). Von Pera oder Cihangir 20-30 Min., und die Route via Tarlabaşı nach Dunkelheit nicht empfohlen.",
      },
    ],
  },
};

/**
 * French locale variants — used by /fr/bosphorus-cruise-from-<district>.
 * Native French content (NOT machine-translated).
 */
export const HOTEL_CLUSTER_DISTRICTS_FR: Record<string, HotelClusterDistrict> = {
  sultanahmet: {
    slug: "bosphorus-cruise-from-sultanahmet",
    name: "Sultanahmet",
    side: "European",
    introCapsule:
      "Croisière sur le Bosphore depuis Sultanahmet — coucher de soleil (lun/mar/jeu) à partir de €30, croisière-dîner (Silver Soft) à partir de €30. Les hôtels de Sultanahmet sont à 8-12 min de l'embarcadère de Kabataş par le tramway T1, ou 15 min en taxi. Prise en charge à l'hôtel incluse sur les forfaits dîner — confirmation par WhatsApp.",
    knownHotels: [
      "Four Seasons Sultanahmet",
      "Sirkeci Mansion",
      "Hotel Amira",
      "Sura Hagia Sophia",
      "White House Hotel",
      "Hotel Sphendon",
    ],
    transportToPier: [
      { mode: "Tramway T1", detail: "Sultanahmet → terminus Kabataş (8-12 min, ~30 TL)" },
      { mode: "Taxi (BiTaksi)", detail: "Sultanahmet → Kabataş (~15 min hors heures de pointe, 80-120 TL)" },
      { mode: "À pied", detail: "Non recommandé — 30+ min en montée par l'Hippodrome et Gülhane" },
      { mode: "Transfert hôtelier", detail: "Inclus sur la croisière-dîner — horaire confirmé par WhatsApp" },
    ],
    recommendedCruise: "dinner",
    pickupEligible: true,
    walkingTimeMin: 30,
    taxiCostTL: "80-120 TL",
    faqs: [
      {
        q: "La prise en charge à l'hôtel depuis Sultanahmet est-elle incluse sur la croisière-dîner ?",
        a: "Oui. Les quatre forfaits dîner (€30 Silver Soft, €45 Silver Alcoolisé, €80 Gold Soft, €90 Gold Alcool Illimité) incluent la prise en charge depuis les hôtels de Sultanahmet. L'horaire est confirmé par WhatsApp la veille, généralement 30-45 min avant le départ de 20h30 à Kabataş.",
      },
      {
        q: "Comment se rendre seul de Sultanahmet à l'embarcadère ?",
        a: "Le plus simple : tramway T1 depuis l'arrêt Sultanahmet jusqu'au terminus Kabataş (8-12 min). L'embarcadère est à 30 m de l'arrêt. En taxi (BiTaksi) hors heures de pointe : 15 min, 80-120 TL.",
      },
      {
        q: "Quel format de croisière convient le mieux aux hôtels Sultanahmet ?",
        a: "La croisière-dîner (€30 Silver Soft → €90 Gold Alcool Illimité) car la prise en charge à l'hôtel est incluse — vous évitez l'étape transport. La croisière coucher de soleil (€34, lun/mar/jeu €30) demande de rejoindre seul l'embarcadère de Karaköy, soit T1 + 5 min à pied depuis Sultanahmet.",
      },
      {
        q: "Puis-je faire la croisière le jour même de l'arrivée à l'aéroport IST ?",
        a: "Possible mais serré. Compter 3 h depuis IST jusqu'à Kabataş (90 min de transfert + marge). Pour la croisière-dîner de 20h30, l'avion doit atterrir avant 16h30. Plus confortable : jour 1 check-in + repos, jour 2 croisière du soir.",
      },
    ],
  },
  taksim: {
    slug: "bosphorus-cruise-from-taksim",
    name: "Taksim",
    side: "European",
    introCapsule:
      "Croisière sur le Bosphore depuis Taksim — coucher de soleil à €30 (lun/mar/jeu) et croisière-dîner Silver Soft à €30. Les hôtels de Taksim rejoignent l'embarcadère de Kabataş en 5-7 min par le funiculaire F1 (1 station) ou 10 min en taxi. Le funiculaire circule de 06h à minuit toutes les 4 minutes.",
    knownHotels: [
      "The Marmara Taksim",
      "Swissotel The Bosphorus",
      "Pera Palace Hotel Jumeirah",
      "Park Bosphorus Hotel",
      "DoubleTree by Hilton Istanbul Esentepe",
      "InterContinental Istanbul",
      "Hilton Istanbul Bosphorus",
    ],
    transportToPier: [
      { mode: "Funiculaire F1", detail: "Taksim → Kabataş (1 station, 4-5 min, ~30 TL)" },
      { mode: "Taxi (BiTaksi)", detail: "Taksim → Kabataş (~10 min, 60-90 TL)" },
      { mode: "À pied", detail: "Possible — 15 min en descente par Sıraselviler" },
      { mode: "Transfert hôtelier", detail: "Inclus sur la croisière-dîner — horaire confirmé par WhatsApp" },
    ],
    recommendedCruise: "sunset",
    pickupEligible: true,
    walkingTimeMin: 15,
    taxiCostTL: "60-90 TL",
    faqs: [
      {
        q: "Combien de temps de Taksim à l'embarcadère ?",
        a: "Funiculaire F1 : 5-7 min (Taksim métro → Kabataş, 1 station, toutes les 4 min de 06h à minuit). Taxi hors heures de pointe : 10 min, 60-90 TL. À pied via Sıraselviler : 15 min en descente.",
      },
      {
        q: "Prise en charge à l'hôtel depuis Taksim sur la croisière-dîner ?",
        a: "Oui — les quatre forfaits dîner incluent la prise en charge depuis les hôtels de Taksim. Horaire confirmé par WhatsApp la veille, généralement 30-45 min avant le départ de 20h30 à Kabataş.",
      },
      {
        q: "Quel format choisir depuis un hôtel à Taksim ?",
        a: "Les deux fonctionnent, mais la croisière coucher de soleil (€30 lun/mar/jeu, €34 autres jours) est particulièrement pratique — le funiculaire F1 vous dépose à Kabataş en 5 min, départ d'hôtel à 18h15 pour le 19h. La croisière-dîner fonctionne aussi avec la prise en charge.",
      },
      {
        q: "Puis-je rejoindre l'embarcadère à pied depuis Taksim ?",
        a: "Oui — 15 min en descente par la rue Sıraselviler. Agréable au printemps/automne mais inconfortable en été ou par temps de pluie. Le funiculaire F1 reste le meilleur choix pour les croisières du soir — vous arrivez frais.",
      },
    ],
  },
  beyoglu: {
    slug: "bosphorus-cruise-from-beyoglu",
    name: "Beyoğlu",
    side: "European",
    introCapsule:
      "Croisière sur le Bosphore depuis Beyoğlu — coucher de soleil ou croisière-dîner Silver Soft à partir de €30. Les hôtels de Beyoğlu (Karaköy, Galata, Cihangir, Pera) rejoignent l'embarcadère de Kabataş en 10-25 min en tramway ou taxi. Les hôtels de Karaköy sont les plus proches de l'embarcadère coucher de soleil (5 min à pied).",
    knownHotels: [
      "Soho House Istanbul",
      "Sumahan on the Water",
      "10 Karaköy",
      "Pera Palace Hotel Jumeirah",
      "Tomtom Suites",
      "Georges Hotel Galata",
      "The Stay Bosphorus",
    ],
    transportToPier: [
      { mode: "À pied (Karaköy)", detail: "Hôtels Karaköy → embarcadère Karaköy (croisière coucher de soleil) : 5 min" },
      { mode: "Tramway T1", detail: "Karaköy / Tophane → Kabataş (1-2 stations, 4-6 min)" },
      { mode: "Funiculaire F1", detail: "Galata / Tünel → Taksim → Kabataş (8 min au total)" },
      { mode: "Taxi (BiTaksi)", detail: "Pera / Cihangir → Kabataş (~10 min, 70-100 TL)" },
      { mode: "Transfert hôtelier", detail: "Inclus sur la croisière-dîner depuis les quartiers centraux de Beyoğlu" },
    ],
    recommendedCruise: "sunset",
    pickupEligible: true,
    walkingTimeMin: 5,
    taxiCostTL: "70-100 TL",
    faqs: [
      {
        q: "À quelle distance les hôtels Karaköy de l'embarcadère coucher de soleil ?",
        a: "Très proches. Les hôtels Karaköy (10 Karaköy, Soho House, Sumahan on the Water) sont à 5 min à pied de l'embarcadère Karaköy d'où part la croisière coucher de soleil. Le point de rendez-vous est juste au nord du pont de Galata, près du restaurant Balıkçı Kemal.",
      },
      {
        q: "Prise en charge à l'hôtel depuis Beyoğlu sur la croisière-dîner ?",
        a: "Oui, prise en charge depuis les quartiers centraux de Beyoğlu (Karaköy, Galata, Cihangir, Pera, Beyoğlu) incluse. Le transfert vous récupère à l'hôtel pour le départ de 20h30 à Kabataş. Horaire confirmé par WhatsApp la veille.",
      },
      {
        q: "Quel quartier de Beyoğlu est le mieux placé ?",
        a: "Karaköy au plus près de l'embarcadère coucher de soleil (5 min à pied). Galata bien pour les deux — 8 min de funiculaire pour le dîner, 5 min en descente vers Karaköy pour le coucher de soleil. Pera et Cihangir demandent tram ou taxi mais restent à 10-15 min au total.",
      },
      {
        q: "Peut-on rejoindre l'embarcadère à pied depuis Beyoğlu le soir ?",
        a: "Depuis Karaköy oui — 5 min praticable par tous temps. Depuis Galata 12-15 min en descente (remontée au retour). Depuis Pera ou Cihangir 20-30 min, et la route via Tarlabaşı est déconseillée après la tombée du jour.",
      },
    ],
  },
};

/**
 * Dutch locale variants — used by /nl/bosphorus-cruise-from-<district>.
 * Native Dutch content (NOT machine-translated).
 */
export const HOTEL_CLUSTER_DISTRICTS_NL: Record<string, HotelClusterDistrict> = {
  sultanahmet: {
    slug: "bosphorus-cruise-from-sultanahmet",
    name: "Sultanahmet",
    side: "European",
    introCapsule:
      "Bosporuscruise vanuit Sultanahmet — gedeelde zonsondergangscruise (ma/di/do) vanaf €30, dinercruise (Silver Soft) vanaf €30. Sultanahmet-hotels zijn 8-12 minuten van Kabataş-steiger met tram T1, of 15 minuten met taxi. Hotelophaling inbegrepen bij dinercruise — bevestigd via WhatsApp.",
    knownHotels: [
      "Four Seasons Sultanahmet",
      "Sirkeci Mansion",
      "Hotel Amira",
      "Sura Hagia Sophia",
      "White House Hotel",
      "Hotel Sphendon",
    ],
    transportToPier: [
      { mode: "Tram T1", detail: "Sultanahmet → eindstation Kabataş (8-12 min, ~30 TL)" },
      { mode: "Taxi (BiTaksi)", detail: "Sultanahmet → Kabataş (~15 min buiten spits, 80-120 TL)" },
      { mode: "Lopen", detail: "Niet aangeraden — 30+ min bergop via Hippodroom en Gülhane" },
      { mode: "Hoteltransfer", detail: "Inbegrepen bij dinercruise — ophaaltijd bevestigd via WhatsApp" },
    ],
    recommendedCruise: "dinner",
    pickupEligible: true,
    walkingTimeMin: 30,
    taxiCostTL: "80-120 TL",
    faqs: [
      {
        q: "Is de hotelophaling vanuit Sultanahmet inbegrepen bij de dinercruise?",
        a: "Ja. Alle vier dinercruise-pakketten (€30 Silver Soft, €45 Silver met Alcohol, €80 Gold Soft, €90 Gold Onbeperkt Alcohol) bevatten hotelophaling vanuit Sultanahmet. De ophaaltijd wordt een dag tevoren bevestigd via WhatsApp, meestal 30-45 minuten voor het 20:30 vertrek vanuit Kabataş.",
      },
      {
        q: "Hoe kom ik zelfstandig van Sultanahmet naar de steiger?",
        a: "Het eenvoudigst met tram T1: instappen bij halte Sultanahmet, eindstation Kabataş (8-12 min). De steiger ligt 30 meter van de tramhalte. Per taxi (BiTaksi) buiten de spits 15 min, 80-120 TL.",
      },
      {
        q: "Welk cruise-formaat past het best bij Sultanahmet-hotels?",
        a: "De dinercruise (€30 Silver Soft → €90 Gold Onbeperkt Alcohol), omdat de hotelophaling inbegrepen is — de transportstap vervalt. De zonsondergangscruise (€34, ma/di/do €30) vereist eigen aankomst bij de Karaköy-steiger, vanaf Sultanahmet T1 + 5 min lopen.",
      },
      {
        q: "Kan ik op de aankomstdag vanuit luchthaven IST direct naar de cruise?",
        a: "Mogelijk maar krap. Reken 3 uur vanaf IST tot Kabataş-steiger (90 min transfer + buffer). Voor de 20:30 dinercruise moet het vliegtuig vóór 16:30 landen. Comfortabeler: dag 1 hotelcheck-in + rust, dag 2 avondcruise.",
      },
    ],
  },
  taksim: {
    slug: "bosphorus-cruise-from-taksim",
    name: "Taksim",
    side: "European",
    introCapsule:
      "Bosporuscruise vanuit Taksim — zonsondergangscruise €30 (ma/di/do) en dinercruise Silver Soft €30. Taksim-hotels bereiken Kabataş-steiger in 5-7 minuten met de F1-funiculaire (één halte) of 10 minuten met taxi. De funiculaire rijdt van 06:00 tot middernacht, elke 4 minuten.",
    knownHotels: [
      "The Marmara Taksim",
      "Swissotel The Bosphorus",
      "Pera Palace Hotel Jumeirah",
      "Park Bosphorus Hotel",
      "DoubleTree by Hilton Istanbul Esentepe",
      "InterContinental Istanbul",
      "Hilton Istanbul Bosphorus",
    ],
    transportToPier: [
      { mode: "Funiculaire F1", detail: "Taksim → Kabataş (1 halte, 4-5 min, ~30 TL)" },
      { mode: "Taxi (BiTaksi)", detail: "Taksim → Kabataş (~10 min, 60-90 TL)" },
      { mode: "Lopen", detail: "Mogelijk — 15 min bergaf via Sıraselviler" },
      { mode: "Hoteltransfer", detail: "Inbegrepen bij dinercruise — ophaaltijd bevestigd via WhatsApp" },
    ],
    recommendedCruise: "sunset",
    pickupEligible: true,
    walkingTimeMin: 15,
    taxiCostTL: "60-90 TL",
    faqs: [
      {
        q: "Hoe lang duurt het van Taksim naar de steiger?",
        a: "Met de F1-funiculaire 5-7 minuten (Taksim metro → Kabataş, één halte, elke 4 min van 06:00 tot middernacht). Per taxi buiten de spits 10 min, 60-90 TL. Lopend via Sıraselviler 15 min bergaf.",
      },
      {
        q: "Hotelophaling vanuit Taksim bij de dinercruise?",
        a: "Ja — alle vier dinercruise-pakketten bevatten hotelophaling vanuit Taksim-hotels. Ophaaltijd wordt een dag tevoren bevestigd via WhatsApp, meestal 30-45 min voor het 20:30 vertrek vanuit Kabataş.",
      },
      {
        q: "Welk formaat past bij een Taksim-hotel?",
        a: "Beide werken, maar de zonsondergangscruise (€30 ma/di/do, €34 andere dagen) is bijzonder handig — de F1-funiculaire brengt u in 5 min naar Kabataş, hotelvertrek om 18:15 voor 19:00 afvaart volstaat. De dinercruise werkt ook met inbegrepen ophaling.",
      },
      {
        q: "Kan ik lopend naar de steiger vanuit Taksim?",
        a: "Ja — 15 min bergaf via Sıraselviler-straat. Aangenaam in lente/herfst maar oncomfortabel bij zomerse hitte of winterregen. F1-funiculaire blijft de beste keuze voor avondcruises — fris arriveren.",
      },
    ],
  },
  beyoglu: {
    slug: "bosphorus-cruise-from-beyoglu",
    name: "Beyoğlu",
    side: "European",
    introCapsule:
      "Bosporuscruise vanuit Beyoğlu — gedeelde zonsondergang of dinercruise Silver Soft vanaf €30. Beyoğlu-hotels (Karaköy, Galata, Cihangir, Pera) bereiken Kabataş-steiger in 10-25 min met tram of taxi. Karaköy-hotels liggen het dichtst bij de zonsondergangssteiger (5 min lopen).",
    knownHotels: [
      "Soho House Istanbul",
      "Sumahan on the Water",
      "10 Karaköy",
      "Pera Palace Hotel Jumeirah",
      "Tomtom Suites",
      "Georges Hotel Galata",
      "The Stay Bosphorus",
    ],
    transportToPier: [
      { mode: "Lopen (Karaköy)", detail: "Karaköy-hotels → Karaköy-steiger (zonsondergangscruise): 5 min" },
      { mode: "Tram T1", detail: "Karaköy / Tophane → Kabataş (1-2 haltes, 4-6 min)" },
      { mode: "Funiculaire F1", detail: "Galata / Tünel → Taksim → Kabataş (totaal 8 min)" },
      { mode: "Taxi (BiTaksi)", detail: "Pera / Cihangir → Kabataş (~10 min, 70-100 TL)" },
      { mode: "Hoteltransfer", detail: "Bij dinercruise vanuit centrale Beyoğlu-wijken inbegrepen" },
    ],
    recommendedCruise: "sunset",
    pickupEligible: true,
    walkingTimeMin: 5,
    taxiCostTL: "70-100 TL",
    faqs: [
      {
        q: "Hoe dichtbij liggen Karaköy-hotels de zonsondergangssteiger?",
        a: "Heel dichtbij. Karaköy-hotels (10 Karaköy, Soho House, Sumahan on the Water) liggen 5 min lopen van de Karaköy-steiger waar de zonsondergangscruise vertrekt. Het ontmoetingspunt is net ten noorden van de Galata-brug, bij restaurant Balıkçı Kemal.",
      },
      {
        q: "Hotelophaling vanuit Beyoğlu bij de dinercruise?",
        a: "Ja, ophaling vanuit centrale Beyoğlu-wijken (Karaköy, Galata, Cihangir, Pera, Beyoğlu) is inbegrepen. De transfer haalt u op bij het hotel en brengt u voor het 20:30 vertrek naar Kabataş. Ophaaltijd wordt een dag tevoren bevestigd via WhatsApp.",
      },
      {
        q: "Welke Beyoğlu-buurt is best gelegen?",
        a: "Karaköy het dichtst bij de zonsondergangssteiger (5 min lopen). Galata goed voor beide — 8 min funiculaire voor diner, 5 min bergaf naar Karaköy voor zonsondergang. Pera en Cihangir vereisen tram of taxi maar blijven binnen 10-15 min totaal.",
      },
      {
        q: "Kan ik 's avonds lopend naar de steiger vanuit Beyoğlu?",
        a: "Vanuit Karaköy ja — 5 min loopbaar bij elk weer. Vanuit Galata 12-15 min bergaf (terug bergop). Vanuit Pera of Cihangir 20-30 min, en de route via Tarlabaşı na zonsondergang wordt afgeraden.",
      },
    ],
  },
};

/**
 * Russian locale variants — used by /ru/bosphorus-cruise-from-<district>.
 * Native Russian content (NOT machine-translated). Formal address (Вы).
 */
export const HOTEL_CLUSTER_DISTRICTS_RU: Record<string, HotelClusterDistrict> = {
  sultanahmet: {
    slug: "bosphorus-cruise-from-sultanahmet",
    name: "Sultanahmet",
    side: "European",
    introCapsule:
      "Круиз по Босфору из Султанахмета — общий круиз на закате (пн/вт/чт) от €30, ужин-круиз (Silver Soft) от €30. Отели Султанахмета — 8-12 минут от причала Кабаташ на трамвае Т1 или 15 минут на такси. Трансфер от отеля включён в ужин-круизе — подтверждается в WhatsApp.",
    knownHotels: [
      "Four Seasons Sultanahmet",
      "Sirkeci Mansion",
      "Hotel Amira",
      "Sura Hagia Sophia",
      "White House Hotel",
      "Hotel Sphendon",
    ],
    transportToPier: [
      { mode: "Трамвай Т1", detail: "Султанахмет → конечная Кабаташ (8-12 мин, ~30 TL)" },
      { mode: "Такси (BiTaksi)", detail: "Султанахмет → Кабаташ (~15 мин вне часов пик, 80-120 TL)" },
      { mode: "Пешком", detail: "Не рекомендуется — 30+ мин в гору через Ипподром и Гюльхане" },
      { mode: "Трансфер от отеля", detail: "Включён в ужин-круизе — время согласуется в WhatsApp" },
    ],
    recommendedCruise: "dinner",
    pickupEligible: true,
    walkingTimeMin: 30,
    taxiCostTL: "80-120 TL",
    faqs: [
      {
        q: "Входит ли трансфер от отеля в Султанахмете в стоимость ужин-круиза?",
        a: "Да. Все четыре пакета ужин-круиза (€30 Silver Soft, €45 Silver с алкоголем, €80 Gold Soft, €90 Gold Безлимитный алкоголь) включают трансфер от отелей Султанахмета. Время согласуется накануне в WhatsApp, обычно за 30-45 минут до отправления в 20:30 от Кабаташа.",
      },
      {
        q: "Как самостоятельно добраться от Султанахмета до причала?",
        a: "Проще всего трамваем Т1: садитесь на остановке Султанахмет, конечная — Кабаташ (8-12 мин). Причал в 30 метрах от трамвайной остановки. На такси (BiTaksi) вне часов пик 15 мин, 80-120 TL.",
      },
      {
        q: "Какой формат круиза подходит для отелей в Султанахмете?",
        a: "Ужин-круиз (€30 Silver Soft → €90 Gold Безлимитный алкоголь), потому что трансфер от отеля включён — этап транспорта исключён. Круиз на закате (€34, пн/вт/чт €30) требует самостоятельной поездки к причалу Карайёй: Т1 + 5 мин пешком от Султанахмета.",
      },
      {
        q: "Можно ли в день прилёта из аэропорта IST успеть на круиз?",
        a: "Возможно, но впритык. Закладывайте 3 часа от IST до Кабаташа (90 мин трансфера + запас). Для ужин-круиза в 20:30 самолёт должен сесть до 16:30. Комфортнее: день 1 — заселение + отдых, день 2 — вечерний круиз.",
      },
    ],
  },
  taksim: {
    slug: "bosphorus-cruise-from-taksim",
    name: "Taksim",
    side: "European",
    introCapsule:
      "Круиз по Босфору из Таксима — закат €30 (пн/вт/чт) и ужин-круиз Silver Soft €30. Отели Таксима — 5-7 минут до Кабаташа на фуникулёре F1 (одна остановка) или 10 минут на такси. Фуникулёр работает с 06:00 до полуночи, каждые 4 минуты.",
    knownHotels: [
      "The Marmara Taksim",
      "Swissotel The Bosphorus",
      "Pera Palace Hotel Jumeirah",
      "Park Bosphorus Hotel",
      "DoubleTree by Hilton Istanbul Esentepe",
      "InterContinental Istanbul",
      "Hilton Istanbul Bosphorus",
    ],
    transportToPier: [
      { mode: "Фуникулёр F1", detail: "Таксим → Кабаташ (1 остановка, 4-5 мин, ~30 TL)" },
      { mode: "Такси (BiTaksi)", detail: "Таксим → Кабаташ (~10 мин, 60-90 TL)" },
      { mode: "Пешком", detail: "Возможно — 15 мин вниз по Сыраселвилер" },
      { mode: "Трансфер от отеля", detail: "Включён в ужин-круизе — время согласуется в WhatsApp" },
    ],
    recommendedCruise: "sunset",
    pickupEligible: true,
    walkingTimeMin: 15,
    taxiCostTL: "60-90 TL",
    faqs: [
      {
        q: "Сколько ехать от Таксима до причала?",
        a: "Фуникулёр F1 — 5-7 минут (метро Таксим → Кабаташ, одна остановка, каждые 4 мин с 06:00 до полуночи). На такси вне часов пик 10 мин, 60-90 TL. Пешком по Сыраселвилер — 15 мин вниз.",
      },
      {
        q: "Включён ли трансфер от отеля в Таксиме в ужин-круиз?",
        a: "Да — все четыре пакета ужин-круиза включают трансфер от отелей Таксима. Время согласуется накануне в WhatsApp, обычно за 30-45 мин до отправления в 20:30 от Кабаташа.",
      },
      {
        q: "Какой формат выбрать из отеля в Таксиме?",
        a: "Оба удобны, но круиз на закате (€30 пн/вт/чт, €34 другие дни) особенно прост — фуникулёр F1 доставит до Кабаташа за 5 мин, выходить из отеля можно в 18:15 на отправление в 19:00. Ужин-круиз тоже работает — с включённым трансфером.",
      },
      {
        q: "Можно ли дойти до причала пешком из Таксима?",
        a: "Да — 15 мин вниз по улице Сыраселвилер. Приятно весной/осенью, но неудобно в летнюю жару или зимний дождь. Фуникулёр F1 — лучший выбор для вечерних круизов: прибываете свежим.",
      },
    ],
  },
  beyoglu: {
    slug: "bosphorus-cruise-from-beyoglu",
    name: "Beyoğlu",
    side: "European",
    introCapsule:
      "Круиз по Босфору из Бейоглу — общий закат или ужин-круиз Silver Soft от €30. Отели Бейоглу (Карайёй, Галата, Джихангир, Пера) — 10-25 мин до причала Кабаташ трамваем или такси. Отели Карайёй ближе всего к причалу заката (5 мин пешком).",
    knownHotels: [
      "Soho House Istanbul",
      "Sumahan on the Water",
      "10 Karaköy",
      "Pera Palace Hotel Jumeirah",
      "Tomtom Suites",
      "Georges Hotel Galata",
      "The Stay Bosphorus",
    ],
    transportToPier: [
      { mode: "Пешком (Карайёй)", detail: "Отели Карайёй → причал Карайёй (круиз на закате): 5 мин" },
      { mode: "Трамвай Т1", detail: "Карайёй / Тофане → Кабаташ (1-2 остановки, 4-6 мин)" },
      { mode: "Фуникулёр F1", detail: "Галата / Тюнель → Таксим → Кабаташ (всего 8 мин)" },
      { mode: "Такси (BiTaksi)", detail: "Пера / Джихангир → Кабаташ (~10 мин, 70-100 TL)" },
      { mode: "Трансфер от отеля", detail: "Из центральных кварталов Бейоглу — включён в ужин-круизе" },
    ],
    recommendedCruise: "sunset",
    pickupEligible: true,
    walkingTimeMin: 5,
    taxiCostTL: "70-100 TL",
    faqs: [
      {
        q: "Насколько отели Карайёй близко к причалу заката?",
        a: "Очень близко. Отели Карайёй (10 Karaköy, Soho House, Sumahan on the Water) — 5 мин пешком до причала Карайёй, откуда отправляется круиз на закате. Место встречи сразу к северу от Галатского моста, у памятника Мимару Синану.",
      },
      {
        q: "Трансфер от отеля в Бейоглу для ужин-круиза?",
        a: "Да, трансфер из центральных кварталов Бейоглу (Карайёй, Галата, Джихангир, Пера, Бейоглу) включён. Машина забирает Вас от отеля и доставляет к Кабаташу к 20:30. Время согласуется накануне в WhatsApp.",
      },
      {
        q: "Какой квартал Бейоглу удобнее?",
        a: "Карайёй ближе всего к причалу заката (5 мин пешком). Галата хорош для обоих — 8 мин фуникулёра для ужина, 5 мин вниз к Карайёй для заката. Пера и Джихангир требуют трамвая или такси, но 10-15 мин в сумме.",
      },
      {
        q: "Можно ли вечером пешком до причала из Бейоглу?",
        a: "Из Карайёй да — 5 мин в любую погоду. Из Галаты 12-15 мин вниз (обратно в гору). Из Пера или Джихангира 20-30 мин, и маршрут через Тарлабаши после темноты не рекомендуется.",
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
        a: "Very close. Karaköy hotels (10 Karaköy, Soho House, Sumahan on the Water) are 5 minutes on foot from the Karaköy ferry pier where the sunset cruise boards. The boarding point sits just north of the Galata Bridge, right by Balıkçı Kemal restaurant.",
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
