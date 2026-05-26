import type { SiteLocale } from "@/i18n/config";

/* Legacy fleet entries consumed by boat-rental routes. Kept intact. */

export interface Yacht {
  id: string;
  slug: string;
  name: string;
  type: string;
  capacity: number;
  length: string;
  features: string[];
  description: string;
  image: string;
  pricePerHour: number;
}

export const fleet: Yacht[] = [
  {
    id: "1",
    slug: "merry-star",
    name: "Merry Star",
    type: "Lüks Motor Yat",
    capacity: 50,
    length: "24 metre",
    features: ["Klimalı salon", "Açık üst güverte", "VIP bölüm", "Profesyonel mutfak", "Ses sistemi", "LED aydınlatma"],
    description: "MerrySails filosunun amiral gemisi. 50 kişiye kadar misafir ağırlayabilen Merry Star, lüks salonu ve geniş üst güvertesiyle grup turları ve özel organizasyonlar için ideal.",
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1920&q=80&auto=format&fit=crop",
    pricePerHour: 300,
  },
  {
    id: "2",
    slug: "merry-breeze",
    name: "Merry Breeze",
    type: "Klasik Ahşap Tekne",
    capacity: 40,
    length: "18 metre",
    features: ["Geleneksel ahşap tasarım", "Açık güverte", "Gölgelik alan", "Ses sistemi", "Mini mutfak"],
    description: "Otantik İstanbul deneyimi sunan klasik ahşap teknemiz. Boğaz'ın ruhunu en iyi yansıtan Merry Breeze, gün batımı ve keşif turları için mükemmel.",
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1920&q=80&auto=format&fit=crop",
    pricePerHour: 200,
  },
  {
    id: "3",
    slug: "merry-diamond",
    name: "Merry Diamond",
    type: "VIP Süper Yat",
    capacity: 20,
    length: "28 metre",
    features: ["Jacuzzi", "Üst güverte bar", "Master suite", "Jet ski platformu", "Full mutfak", "Sinema sistemi"],
    description: "Ultra lüks VIP deneyimi için tasarlanmış Merry Diamond. Jacuzzi, sinema sistemi ve özel bar ile Boğaz'da en prestijli deneyimi sunuyor.",
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1920&q=80&auto=format&fit=crop",
    pricePerHour: 600,
  },
  {
    id: "4",
    slug: "merry-pearl",
    name: "Merry Pearl",
    type: "Katamaran",
    capacity: 35,
    length: "20 metre",
    features: ["Geniş güverte", "Stabilite", "Kapalı salon", "Açık bar", "WiFi", "USB şarj"],
    description: "Çift gövdeli tasarımıyla yüksek stabilite sunan Merry Pearl, deniz tutması endişesi olanlar için ideal. Geniş güvertesi ve modern iç mekanıyla konforlu bir yolculuk vaat ediyor.",
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1920&q=80&auto=format&fit=crop",
    pricePerHour: 250,
  },
];

/* ---------------------------------------------------------------------------
 * Charter fleet — yacht-charter-istanbul page. Six vessels, EUR-priced.
 * Boat brand names never appear in UI. Capacity-tier labels only.
 * ------------------------------------------------------------------------ */

export type CharterFleetSlug = "bosphorus-sailing-yacht-10" | "bosphorus-sailing-yacht-14" | "bosphorus-group-yacht-36" | "bosphorus-signature-yacht-36" | "bosphorus-event-yacht-44" | "bosphorus-mega-event-yacht-150";

export type CharterFleetLocaleStrings = {
  label: string;
  tagline: string;
  description: string;
};

export type CharterFleetItem = {
  slug: CharterFleetSlug;
  internalCode: string;
  capacity: { min: number; max: number };
  hourlyEur: number | null;
  minHours: 2;
  discountFromHours: 3;
  discountPercent: 10;
  priceByHours: Record<number, number> | null;
  coverImage: string;
  exteriorImages: string[];
  interiorImages: string[];
  bookable: boolean;
  badges?: Array<"popular" | "discount" | "event" | "boutique" | "mega">;
  altDescriptor: string;
  i18n: Partial<Record<SiteLocale, CharterFleetLocaleStrings>> & {
    en: CharterFleetLocaleStrings;
  };
};

const altDescriptors = {
  y1: "10-guest sailing yacht for an intimate Bosphorus voyage",
  y2: "14-guest sailing yacht for friend or family groups on the Bosphorus",
  y3: "36-guest charter yacht for medium-sized group sailings on the Bosphorus",
  y4: "36-guest signature charter yacht for upgraded Bosphorus sailing",
  y5: "44-guest event yacht for weddings and corporate gatherings on the Bosphorus",
  y6: "150-guest mega event yacht for large Bosphorus celebrations and galas",
} as const;

const CHARTER_FLEET: CharterFleetItem[] = [
  {
    slug: "bosphorus-sailing-yacht-10",
    internalCode: "boutique-10",
    capacity: { min: 10, max: 12 },
    hourlyEur: 100,
    minHours: 2,
    discountFromHours: 3,
    discountPercent: 10,
    priceByHours: { 2: 200, 3: 275, 4: 370, 5: 460, 6: 550, 7: 640, 8: 735 },
    coverImage: "/images/fleet/y1/exterior-1.jpg",
    exteriorImages: [
      "/images/fleet/y1/exterior-1.jpg",
      "/images/fleet/y1/exterior-2.jpg",
      "/images/fleet/y1/exterior-3.jpg",
      "/images/fleet/y1/exterior-4.jpg",
    ],
    interiorImages: [
      "/images/fleet/y1/interior-1.jpg",
      "/images/fleet/y1/interior-2.jpg",
      "/images/fleet/y1/interior-3.jpg",
      "/images/fleet/y1/interior-4.jpg",
      "/images/fleet/y1/interior-5.jpg",
      "/images/fleet/y1/interior-6.jpg",
      "/images/fleet/y1/interior-7.jpg",
      "/images/fleet/y1/interior-8.jpg",
      "/images/fleet/y1/interior-9.jpg",
    ],
    bookable: true,
    badges: ["boutique"],
    altDescriptor: altDescriptors.y1,
    i18n: {
      en: {
        label: "Bosphorus Sailing Yacht · 10",
        tagline: "Small-deck sailing for couples and close-knit groups",
        description:
          "An intimate sailing yacht tuned for couples, anniversaries, and tight friend groups looking for a calm Bosphorus afternoon. Soft drinks and a light snack tray come with the deck.",
      },
      tr: {
        label: "Boğaz Sailing Yatı · 10 Kişi",
        tagline: "Çiftler ve yakın gruplar için küçük güverteli sailing",
        description:
          "Çiftlerin, yıl dönümü kutlamalarının ve yakın arkadaş gruplarının Boğaz'da sakin bir öğleden sonra geçirmesi için ölçeklenmiş samimi bir sailing yatı. Yumuşak içecek ve hafif bir atıştırmalık tabağı güverteyle birlikte gelir.",
      },
      de: {
        label: "Bosporus-Sailing-Yacht · 10",
        tagline: "Kleines Deck für Paare und enge Gruppen",
        description:
          "Eine intime Sailing-Yacht, abgestimmt auf Paare, Jubiläen und enge Freundeskreise, die einen ruhigen Bosporus-Nachmittag suchen. Softdrinks und ein leichter Snack-Teller gehören zum Deck dazu.",
      },
      fr: {
        label: "Voilier Bosphore · 10",
        tagline: "Petit pont pour couples et groupes restreints",
        description:
          "Un voilier intime taillé pour les couples, les anniversaires de mariage et les petits cercles d'amis en quête d'un après-midi paisible sur le Bosphore. Boissons sans alcool et un plateau d'amuse-bouches accompagnent le pont.",
      },
      nl: {
        label: "Bosporus Zeiljacht · 10",
        tagline: "Klein dek voor stellen en kleine groepen",
        description:
          "Een intieme zeiljacht, afgestemd op stellen, jubilea en kleine vriendengroepen die een rustige Bosporus-middag zoeken. Frisdrank en een licht snackbord horen bij het dek.",
      },
    },
  },
  {
    slug: "bosphorus-sailing-yacht-14",
    internalCode: "premium-14",
    capacity: { min: 12, max: 14 },
    hourlyEur: 110,
    minHours: 2,
    discountFromHours: 3,
    discountPercent: 10,
    priceByHours: { 2: 220, 3: 300, 4: 400, 5: 500, 6: 600, 7: 700, 8: 800 },
    coverImage: "/images/fleet/y2/exterior-1.jpg",
    exteriorImages: [
      "/images/fleet/y2/exterior-1.jpg",
      "/images/fleet/y2/exterior-2.jpg",
      "/images/fleet/y2/exterior-3.jpg",
    ],
    interiorImages: [
      "/images/fleet/y2/interior-1.jpg",
      "/images/fleet/y2/interior-2.jpg",
      "/images/fleet/y2/interior-3.jpg",
      "/images/fleet/y2/interior-4.jpg",
      "/images/fleet/y2/interior-5.jpg",
      "/images/fleet/y2/interior-6.jpg",
    ],
    bookable: true,
    badges: ["popular"],
    altDescriptor: altDescriptors.y2,
    i18n: {
      en: {
        label: "Bosphorus Sailing Yacht · 14",
        tagline: "Wider deck and salon for friends and families",
        description:
          "A step up in deck space and salon comfort, this sailing yacht works for birthday afternoons, family meetups, and friend trips where everyone wants room to drift between sun and shade. Soft drinks and snacks aboard.",
      },
      tr: {
        label: "Boğaz Sailing Yatı · 14 Kişi",
        tagline: "Arkadaşlar ve aileler için geniş güverte ve salon",
        description:
          "Güverte alanı ve salon konforu bir tık yukarıda; doğum günü öğleden sonraları, aile buluşmaları ve herkesin güneşle gölge arasında rahat hareket etmek istediği arkadaş çıkışları için yapılmış bir sailing yatı. Tekne yumuşak içecek ve atıştırmalıkla yola çıkar.",
      },
      de: {
        label: "Bosporus-Sailing-Yacht · 14",
        tagline: "Breiteres Deck und Salon für Freunde und Familien",
        description:
          "Eine Stufe mehr Deckfläche und Salonkomfort. Diese Sailing-Yacht passt zu Geburtstagsnachmittagen, Familientreffen und Freundesausflügen, bei denen alle Platz haben sollen, um zwischen Sonne und Schatten zu wechseln. Softdrinks und Snacks an Bord.",
      },
      fr: {
        label: "Voilier Bosphore · 14",
        tagline: "Pont et salon plus larges pour amis et familles",
        description:
          "Un niveau au-dessus en surface de pont et confort de salon. Ce voilier convient aux après-midis d'anniversaire, aux retrouvailles familiales et aux escapades entre amis où chacun veut pouvoir circuler entre soleil et ombre. Boissons sans alcool et collations à bord.",
      },
      nl: {
        label: "Bosporus Zeiljacht · 14",
        tagline: "Breder dek en salon voor vrienden en familie",
        description:
          "Een stap groter in dekruimte en saloncomfort. Deze zeiljacht past bij verjaardagsmiddagen, familiebijeenkomsten en uitstapjes met vrienden waar iedereen wil kunnen schuiven tussen zon en schaduw. Frisdrank en snacks aan boord.",
      },
    },
  },
  {
    slug: "bosphorus-group-yacht-36",
    internalCode: "group-standard-36",
    capacity: { min: 30, max: 36 },
    hourlyEur: 140,
    minHours: 2,
    discountFromHours: 3,
    discountPercent: 10,
    priceByHours: { 2: 280, 3: 375, 4: 500, 5: 625, 6: 750, 7: 875, 8: 1000 },
    coverImage: "/images/fleet/y3/exterior-1.jpg",
    exteriorImages: [
      "/images/fleet/y3/exterior-1.jpg",
      "/images/fleet/y3/exterior-2.jpg",
      "/images/fleet/y3/exterior-3.jpg",
      "/images/fleet/y3/exterior-4.jpg",
      "/images/fleet/y3/exterior-5.jpg",
    ],
    interiorImages: [
      "/images/fleet/y3/interior-1.jpg",
      "/images/fleet/y3/interior-2.jpg",
      "/images/fleet/y3/interior-3.jpg",
      "/images/fleet/y3/interior-4.jpg",
    ],
    bookable: true,
    altDescriptor: altDescriptors.y3,
    i18n: {
      en: {
        label: "Bosphorus Group Yacht · 36",
        tagline: "Mid-size deck for medium-sized celebrations",
        description:
          "A practical mid-size group yacht — comfortable for 30 to 36 guests across bachelor afternoons, milestone birthdays, and smaller corporate offsites. Soft drinks and snacks already on board; everything else builds from there.",
      },
      tr: {
        label: "Boğaz Grup Yatı · 36 Kişi",
        tagline: "Orta ölçek güvertede orta ölçek kutlamalar",
        description:
          "Pragmatik orta sınıf grup yatı — bekarlığa veda öğleden sonraları, yuvarlak yaş doğum günleri ve daha kompakt kurumsal off-site'lar için 30-36 kişiyi rahat ağırlar. Yumuşak içecek ve atıştırmalık zaten teknede; gerisi buradan kurulur.",
      },
      de: {
        label: "Bosporus Gruppen-Yacht · 36",
        tagline: "Mittelgroßes Deck für mittelgroße Feiern",
        description:
          "Praktische mittelgroße Gruppen-Yacht — komfortabel für 30 bis 36 Gäste, ob Junggesellinnen-Nachmittag, runder Geburtstag oder kompakter Firmen-Offsite. Softdrinks und Snacks sind bereits an Bord; alles weitere bauen Sie darauf auf.",
      },
      fr: {
        label: "Yacht de Groupe Bosphore · 36",
        tagline: "Pont moyen pour célébrations moyennes",
        description:
          "Yacht de groupe pratique de taille moyenne — confortable pour 30 à 36 invités, qu'il s'agisse d'un après-midi entre copines, d'un anniversaire marquant ou d'un offsite d'entreprise compact. Boissons sans alcool et collations déjà à bord ; tout le reste se construit ensuite.",
      },
      nl: {
        label: "Bosporus Groepsjacht · 36",
        tagline: "Middelgroot dek voor middelgrote vieringen",
        description:
          "Praktisch middelgroot groepsjacht — comfortabel voor 30 tot 36 gasten, of het nu om een vrijgezellenmiddag, een mijlpaalverjaardag of een compacte bedrijfsoffsite gaat. Frisdrank en snacks staan al aan boord; al het andere wordt daarop opgebouwd.",
      },
    },
  },
  {
    slug: "bosphorus-signature-yacht-36",
    internalCode: "group-signature-36",
    capacity: { min: 30, max: 36 },
    hourlyEur: 150,
    minHours: 2,
    discountFromHours: 3,
    discountPercent: 10,
    priceByHours: { 2: 300, 3: 400, 4: 535, 5: 670, 6: 800, 7: 935, 8: 1070 },
    coverImage: "/images/fleet/y4/exterior-1.jpg",
    exteriorImages: [
      "/images/fleet/y4/exterior-1.jpg",
      "/images/fleet/y4/exterior-2.jpg",
      "/images/fleet/y4/exterior-3.jpg",
      "/images/fleet/y4/exterior-4.jpg",
    ],
    interiorImages: [
      "/images/fleet/y4/interior-1.jpg",
      "/images/fleet/y4/interior-2.jpg",
      "/images/fleet/y4/interior-3.jpg",
      "/images/fleet/y4/interior-4.jpg",
      "/images/fleet/y4/interior-5.jpg",
      "/images/fleet/y4/interior-6.jpg",
    ],
    bookable: true,
    badges: ["popular"],
    altDescriptor: altDescriptors.y4,
    i18n: {
      en: {
        label: "Bosphorus Signature Yacht · 36",
        tagline: "Upgraded interior and a smoother ride at 36 guests",
        description:
          "Same 36-guest footprint, dialed-in interior, calmer ride at cruise speed. The signature option for milestone birthdays, brand evenings, and weddings that want a sharper finish without jumping to event class.",
      },
      tr: {
        label: "Boğaz Signature Yatı · 36 Kişi",
        tagline: "36 kişide rafine iç mekan ve daha sakin seyir",
        description:
          "Aynı 36 kişilik ölçek, ince ayarlı iç mekan, seyir hızında daha sakin sürüş. Etkinlik sınıfına geçmeden daha keskin bir final isteyen yuvarlak yaş doğum günleri, marka geceleri ve düğünler için signature seçenek.",
      },
      de: {
        label: "Bosporus Signature-Yacht · 36",
        tagline: "Edleres Interieur und ruhigere Fahrt für 36 Gäste",
        description:
          "Gleiche 36-Gäste-Größe, abgestimmter Innenraum, ruhigere Fahrt bei Reisegeschwindigkeit. Die Signature-Option für runde Geburtstage, Markenabende und Hochzeiten, die ein schärferes Finish wollen, ohne in die Event-Klasse zu wechseln.",
      },
      fr: {
        label: "Yacht Signature Bosphore · 36",
        tagline: "Intérieur soigné et navigation plus douce pour 36 invités",
        description:
          "Même format 36 invités, intérieur peaufiné, navigation plus douce à vitesse de croisière. L'option signature pour les anniversaires marquants, les soirées de marque et les mariages qui veulent une finition plus nette sans passer en classe événement.",
      },
      nl: {
        label: "Bosporus Signature Jacht · 36",
        tagline: "Verfijnder interieur en rustigere vaart bij 36 gasten",
        description:
          "Zelfde 36-gasten formaat, fijngestemd interieur, rustigere vaart op kruissnelheid. De signature-optie voor mijlpaalverjaardagen, merkavonden en bruiloften die een scherpere afwerking willen zonder naar de event-klasse over te stappen.",
      },
    },
  },
  {
    slug: "bosphorus-event-yacht-44",
    internalCode: "event-44",
    capacity: { min: 30, max: 44 },
    hourlyEur: null,
    minHours: 2,
    discountFromHours: 3,
    discountPercent: 10,
    priceByHours: null,
    coverImage: "/images/fleet/y5/exterior-1.jpg",
    exteriorImages: [
      "/images/fleet/y5/exterior-1.jpg",
      "/images/fleet/y5/exterior-2.jpg",
      "/images/fleet/y5/exterior-3.jpg",
      "/images/fleet/y5/exterior-4.jpg",
      "/images/fleet/y5/exterior-5.jpg",
      "/images/fleet/y5/exterior-6.jpg",
    ],
    interiorImages: [
      "/images/fleet/y5/interior-1.jpg",
      "/images/fleet/y5/interior-2.jpg",
      "/images/fleet/y5/interior-3.jpg",
      "/images/fleet/y5/interior-4.jpg",
      "/images/fleet/y5/interior-5.jpg",
      "/images/fleet/y5/interior-6.jpg",
      "/images/fleet/y5/interior-7.jpg",
      "/images/fleet/y5/interior-8.jpg",
      "/images/fleet/y5/interior-9.jpg",
      "/images/fleet/y5/interior-10.jpg",
      "/images/fleet/y5/interior-11.jpg",
      "/images/fleet/y5/interior-12.jpg",
    ],
    bookable: false,
    badges: ["event"],
    altDescriptor: altDescriptors.y5,
    i18n: {
      en: {
        label: "Bosphorus Event Yacht · 44",
        tagline: "Wedding receptions, brand evenings, full-scale dinners",
        description:
          "An event-built deck for up to 44 guests — wedding receptions, brand evenings, product launches, and dinner parties that need a real stage on the water. Costs are scoped per brief; send the plan and a fixed proposal comes back.",
      },
      tr: {
        label: "Boğaz Etkinlik Yatı · 44 Kişi",
        tagline: "Düğün resepsiyonları, marka geceleri, tam ölçekli yemekler",
        description:
          "44 kişiye kadar etkinlik için tasarlanmış güverte — düğün resepsiyonları, marka geceleri, lansmanlar ve su üstünde gerçek bir sahne isteyen yemekli partiler. Maliyet brief'e göre belirlenir; planı gönderin, sabit teklif geri döner.",
      },
      de: {
        label: "Bosporus Event-Yacht · 44",
        tagline: "Hochzeitsempfänge, Markenabende, große Dinnerformate",
        description:
          "Ein eventfähiges Deck für bis zu 44 Gäste — Hochzeitsempfänge, Markenabende, Produktlaunches und Dinnerpartys, die eine echte Bühne auf dem Wasser brauchen. Die Kosten werden pro Briefing definiert; Plan schicken, ein Festangebot kommt zurück.",
      },
      fr: {
        label: "Yacht Événement Bosphore · 44",
        tagline: "Réceptions de mariage, soirées de marque, dîners en grand",
        description:
          "Un pont conçu pour l'événement jusqu'à 44 invités — réceptions de mariage, soirées de marque, lancements et dîners de réception qui demandent une vraie scène sur l'eau. Les coûts se calent sur le brief ; envoyez le plan, un devis fixe revient.",
      },
      nl: {
        label: "Bosporus Event Jacht · 44",
        tagline: "Bruiloftsrecepties, merkavonden, volwaardige diners",
        description:
          "Een eventklaar dek voor maximaal 44 gasten — bruiloftsrecepties, merkavonden, productlanceringen en diners die een echt podium op het water nodig hebben. Kosten worden per briefing bepaald; stuur het plan en een vast voorstel komt terug.",
      },
    },
  },
  {
    slug: "bosphorus-mega-event-yacht-150",
    internalCode: "mega-150",
    capacity: { min: 80, max: 150 },
    hourlyEur: null,
    minHours: 2,
    discountFromHours: 3,
    discountPercent: 10,
    priceByHours: null,
    coverImage: "/images/fleet/y6/exterior-1.jpg",
    exteriorImages: ["/images/fleet/y6/exterior-1.jpg", "/images/fleet/y6/exterior-2.jpg"],
    interiorImages: [
      "/images/fleet/y6/interior-1.jpg",
      "/images/fleet/y6/interior-2.jpg",
      "/images/fleet/y6/interior-3.jpg",
      "/images/fleet/y6/interior-4.jpg",
      "/images/fleet/y6/interior-5.jpg",
      "/images/fleet/y6/interior-6.jpg",
    ],
    bookable: false,
    badges: ["mega", "event"],
    altDescriptor: altDescriptors.y6,
    i18n: {
      en: {
        label: "Bosphorus Mega Event Yacht · 150",
        tagline: "Large weddings, galas, and full-program brand activations",
        description:
          "The largest vessel in the fleet, set up for full programs — large weddings, gala dinners, full-floor brand activations, and corporate evenings up to 150 guests. Quote-only; pricing tracks the program, not a per-hour formula.",
      },
      tr: {
        label: "Boğaz Mega Etkinlik Yatı · 150 Kişi",
        tagline: "Büyük düğünler, galalar ve tam programlı marka aktivasyonları",
        description:
          "Filodaki en büyük tekne, tam programlar için kurulu — büyük düğünler, gala yemekleri, kat dolusu marka aktivasyonları ve 150 kişiye kadar kurumsal akşamlar. Yalnız teklif; fiyat saatlik bir formüle değil, programa göre belirlenir.",
      },
      de: {
        label: "Bosporus Mega-Event-Yacht · 150",
        tagline: "Große Hochzeiten, Galas und volle Markenprogramme",
        description:
          "Das größte Schiff der Flotte, eingerichtet für volle Programme — große Hochzeiten, Galadinner, ganzflächige Markenaktivierungen und Firmenabende für bis zu 150 Gäste. Nur auf Angebot; der Preis richtet sich nach dem Programm, nicht nach einer Stundenformel.",
      },
      fr: {
        label: "Yacht Méga-Événement Bosphore · 150",
        tagline: "Grands mariages, galas et activations de marque complètes",
        description:
          "Le plus grand bateau de la flotte, monté pour des programmes complets — grands mariages, dîners de gala, activations de marque sur tout le plateau et soirées d'entreprise jusqu'à 150 invités. Uniquement sur devis ; le prix suit le programme, pas une formule horaire.",
      },
      nl: {
        label: "Bosporus Mega Event Jacht · 150",
        tagline: "Grote bruiloften, gala's en volledige merkactivaties",
        description:
          "Het grootste schip van de vloot, ingericht voor volledige programma's — grote bruiloften, galadiners, merkactivaties over de hele vloer en bedrijfsavonden tot 150 gasten. Alleen op offerte; de prijs volgt het programma, niet een uurformule.",
      },
    },
  },
];

export function getCharterFleet(): CharterFleetItem[] {
  return CHARTER_FLEET;
}

export function getCharterFleetItem(slug: CharterFleetSlug): CharterFleetItem | null {
  return CHARTER_FLEET.find((b) => b.slug === slug) ?? null;
}

export function getCharterFleetLocale(
  item: CharterFleetItem,
  locale: SiteLocale,
): CharterFleetLocaleStrings {
  return item.i18n[locale] ?? item.i18n.en;
}

export function getCharterLowestEntryPriceEur(): number {
  let lowest = Infinity;
  for (const item of CHARTER_FLEET) {
    if (item.priceByHours) {
      const entry = item.priceByHours[item.minHours];
      if (entry && entry < lowest) lowest = entry;
    }
  }
  return lowest === Infinity ? 200 : lowest;
}

export function getCharterHighestTotalPriceEur(): number {
  let highest = 0;
  for (const item of CHARTER_FLEET) {
    if (item.priceByHours) {
      const hourKeys = Object.keys(item.priceByHours).map(Number);
      const maxHour = Math.max(...hourKeys);
      const val = item.priceByHours[maxHour];
      if (val && val > highest) highest = val;
    }
  }
  return highest;
}
