import type { SiteLocale } from "@/i18n/config";

/* ---------------------------------------------------------------------------
 * Legacy fleet (consumed by boat-rental pages). Do not remove without
 * refactoring those pages — kept verbatim for backward compatibility.
 * ------------------------------------------------------------------------ */

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
    image: "/images/tours/yacht-charter-in-istanbul/03.jpeg",
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
    image: "/images/tours/yacht-charter-in-istanbul/05.jpeg",
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
    image: "/images/tours/yacht-charter-in-istanbul/10.webp",
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
    image: "/images/tours/yacht-charter-in-istanbul/15.jpg",
    pricePerHour: 250,
  },
];

/* ---------------------------------------------------------------------------
 * Charter fleet (yacht-charter-istanbul page). Six vessels, EUR-priced,
 * capacity-tier labels — boat brand names never surface in UI.
 * ------------------------------------------------------------------------ */

export type CharterFleetSlug =
  | "mega-event-yacht-150"
  | "boutique-yacht-12"
  | "premium-yacht-15"
  | "group-yacht-40-standard"
  | "group-yacht-40-signature"
  | "event-yacht-90";

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
  // 2026-05-28 fleet refresh: event-yacht-90 only starts from 4h and discounts
  // kick in from 5h, so these literal types were relaxed to `number`.
  minHours: number;
  discountFromHours: number;
  discountPercent: 10;
  priceByHours: Record<number, number> | null;
  coverImage: string;
  exteriorImages: string[];
  interiorImages: string[];
  bookable: boolean;
  badges?: Array<"popular" | "discount" | "event" | "boutique" | "mega">;
  altDescriptor: string;
  /** Partial — every item must include "en". Other locales fall back to en. */
  i18n: Partial<Record<SiteLocale, CharterFleetLocaleStrings>> & {
    en: CharterFleetLocaleStrings;
  };
};

const altDescriptors = {
  y6: "150-guest mega event yacht for Bosphorus large gatherings",
  y7: "12-guest boutique private yacht for Bosphorus charter",
  y8: "15-guest premium private yacht for Bosphorus charter",
  y9: "40-guest group charter yacht for Bosphorus group cruise",
  y10: "90-guest event yacht for Bosphorus corporate and large private events",
} as const;

const CHARTER_FLEET: CharterFleetItem[] = [
  {
    slug: "boutique-yacht-12",
    internalCode: "boutique-12",
    capacity: { min: 0, max: 12 },
    hourlyEur: 110,
    minHours: 2,
    discountFromHours: 3,
    discountPercent: 10,
    priceByHours: { 2: 220, 3: 297, 4: 396, 5: 495, 6: 594, 7: 693, 8: 792 },
    coverImage: "/images/fleet/y7/01.jpeg",
    exteriorImages: [
      "/images/fleet/y7/01.jpeg",
      "/images/fleet/y7/02.jpeg",
      "/images/fleet/y7/03.jpeg",
      "/images/fleet/y7/04.jpeg",
      "/images/fleet/y7/05.jpeg",
      "/images/fleet/y7/06.jpeg",
    ],
    interiorImages: [
      "/images/fleet/y7/07.jpeg",
      "/images/fleet/y7/08.jpeg",
      "/images/fleet/y7/09.jpeg",
      "/images/fleet/y7/10.jpeg",
      "/images/fleet/y7/11.jpeg",
    ],
    bookable: true,
    badges: ["boutique"],
    altDescriptor: altDescriptors.y7,
    i18n: {
      en: {
        label: "Boutique Yacht · 12 Guests",
        tagline: "Intimate private deck for couples and small groups",
        description:
          "Compact boutique-class private yacht for up to 12 guests. Built for proposals, anniversaries, and tight friend groups who want the Bosphorus to feel personal. From €220 for a 2-hour charter, with an automatic 10% discount from 3 hours onward.",
      },
      tr: {
        label: "Butik Yat · 12 Kişilik",
        tagline: "Çiftler ve küçük gruplar için samimi özel güverte",
        description:
          "12 kişiye kadar misafir ağırlayan kompakt butik sınıfı özel yat. Evlilik teklifi, yıl dönümü ve dar arkadaş grupları için ideal. 2 saatlik özel kiralama €220'den başlar, 3 saat ve üzeri rezervasyonlarda otomatik %10 indirim uygulanır.",
      },
      de: {
        label: "Boutique-Yacht · 12 Gäste",
        tagline: "Intimes Privatdeck für Paare und kleine Gruppen",
        description:
          "Kompakte Boutique-Privatyacht für bis zu 12 Gäste. Gebaut für Heiratsanträge, Hochzeitstage und enge Freundeskreise, die den Bosporus ganz persönlich erleben möchten. Ab €220 für eine 2-Stunden-Charter, mit automatisch 10 % Rabatt ab 3 Stunden.",
      },
      fr: {
        label: "Yacht Boutique · 12 Invités",
        tagline: "Pont privé intime pour couples et petits groupes",
        description:
          "Yacht privé boutique compact pour 12 invités maximum. Conçu pour les demandes en mariage, anniversaires de mariage et petits cercles d'amis qui veulent vivre le Bosphore en toute intimité. À partir de €220 pour 2 heures, avec 10 % de remise automatique dès 3 heures.",
      },
      nl: {
        label: "Boutique Jacht · 12 Gasten",
        tagline: "Intiem privédek voor stellen en kleine groepen",
        description:
          "Compact boutique-privéjacht voor maximaal 12 gasten. Gebouwd voor huwelijksaanzoeken, jubilea en kleine vriendengroepen die de Bosporus persoonlijk willen beleven. Vanaf €220 voor een charter van 2 uur, met automatisch 10 % korting vanaf 3 uur.",
      },
      ru: {
        label: "Бутик-яхта · 12 гостей",
        tagline: "Уютная частная палуба для пар и небольших групп",
        description:
          "Компактная частная яхта бутик-класса для группы до 12 гостей. Создана для предложений руки и сердца, годовщин и близких компаний, желающих ощутить Босфор лично. От €220 за 2-часовую аренду, со скидкой 10 % автоматически от 3 часов.",
      },
      zh: {
        label: "精品游艇 · 12 人",
        tagline: "为情侣与小团体打造的私密私人甲板",
        description:
          "可容纳最多 12 位宾客的紧凑型精品级私人游艇。专为求婚、纪念日及希望私密体验博斯普鲁斯海峡的小型亲友团而设。2 小时包船 €220 起，3 小时起自动享 10 % 折扣。",
      },
    },
  },
  {
    slug: "premium-yacht-15",
    internalCode: "premium-15",
    capacity: { min: 0, max: 15 },
    hourlyEur: 160,
    minHours: 2,
    discountFromHours: 3,
    discountPercent: 10,
    priceByHours: { 2: 320, 3: 432, 4: 576, 5: 720, 6: 864, 7: 1008, 8: 1152 },
    coverImage: "/images/fleet/y8/01.jpeg",
    exteriorImages: [
      "/images/fleet/y8/01.jpeg",
      "/images/fleet/y8/02.jpeg",
      "/images/fleet/y8/03.jpeg",
      "/images/fleet/y8/04.jpeg",
      "/images/fleet/y8/05.jpeg",
    ],
    interiorImages: [],
    bookable: true,
    badges: ["popular"],
    altDescriptor: altDescriptors.y8,
    i18n: {
      en: {
        label: "Premium Yacht · 15 Guests",
        tagline: "Larger deck and lounge for mid-size groups",
        description:
          "Premium private yacht for up to 15 guests with a wider top deck and a more refined lounge than the boutique tier. Ideal for birthdays, family days, and small celebrations. From €320 for a 2-hour charter; 10% discount from 3 hours onward.",
      },
      tr: {
        label: "Premium Yat · 15 Kişilik",
        tagline: "Orta gruplar için daha geniş güverte ve salon",
        description:
          "15 kişiye kadar misafir ağırlayan premium özel yat. Butik sınıfına göre daha geniş üst güverte ve daha rafine bir salon sunar. Doğum günleri, aile günleri ve küçük kutlamalar için ideal. 2 saatlik özel kiralama €320'den başlar; 3 saat ve üzeri rezervasyonlarda %10 indirim uygulanır.",
      },
      de: {
        label: "Premium-Yacht · 15 Gäste",
        tagline: "Größeres Deck und Lounge für mittelgroße Gruppen",
        description:
          "Premium-Privatyacht für bis zu 15 Gäste mit breiterem Oberdeck und einer feineren Lounge als die Boutique-Stufe. Ideal für Geburtstage, Familientage und kleine Feiern. Ab €320 für eine 2-Stunden-Charter; 10 % Rabatt ab 3 Stunden.",
      },
      fr: {
        label: "Yacht Premium · 15 Invités",
        tagline: "Pont et salon plus vastes pour groupes moyens",
        description:
          "Yacht privé premium pour 15 invités maximum, doté d'un pont supérieur plus large et d'un salon plus raffiné que la catégorie boutique. Idéal pour les anniversaires, journées en famille et petites célébrations. À partir de €320 pour 2 heures ; 10 % de remise dès 3 heures.",
      },
      nl: {
        label: "Premium Jacht · 15 Gasten",
        tagline: "Ruimer dek en lounge voor middelgrote groepen",
        description:
          "Premium privéjacht voor maximaal 15 gasten met een breder bovendek en een verfijndere lounge dan de boutique-klasse. Ideaal voor verjaardagen, familiedagen en kleine vieringen. Vanaf €320 voor een charter van 2 uur; 10 % korting vanaf 3 uur.",
      },
      ru: {
        label: "Премиум-яхта · 15 гостей",
        tagline: "Просторная палуба и салон для средних групп",
        description:
          "Премиальная частная яхта для группы до 15 гостей с более широкой верхней палубой и более изысканным салоном, чем у бутик-класса. Идеальна для дней рождения, семейных дней и небольших торжеств. От €320 за 2 часа; скидка 10 % от 3 часов.",
      },
      zh: {
        label: "高级游艇 · 15 人",
        tagline: "为中型团体准备的更宽敞甲板与休息区",
        description:
          "可容纳最多 15 位宾客的高级私人游艇，配备比精品级更宽阔的上层甲板和更精致的休息区。适合生日、家庭聚会和小型庆典。2 小时包船 €320 起；3 小时起享 10 % 折扣。",
      },
    },
  },
  {
    slug: "group-yacht-40-standard",
    internalCode: "group-standard-40",
    capacity: { min: 0, max: 15 },
    hourlyEur: 190,
    minHours: 2,
    discountFromHours: 3,
    discountPercent: 10,
    priceByHours: { 2: 380, 3: 513, 4: 684, 5: 855, 6: 1026, 7: 1197, 8: 1368 },
    // Cover order updated 2026-05-28: first two photos in y9 are interior
    // shots; the third (03.jpeg) is the first exterior frame and is the
    // image we want guests to see first.
    coverImage: "/images/fleet/y9/03.jpeg",
    exteriorImages: [
      "/images/fleet/y9/03.jpeg",
      "/images/fleet/y9/04.jpeg",
      "/images/fleet/y9/05.jpeg",
      "/images/fleet/y9/06.jpeg",
    ],
    interiorImages: [
      "/images/fleet/y9/01.jpeg",
      "/images/fleet/y9/02.jpeg",
      "/images/fleet/y9/07.jpeg",
      "/images/fleet/y9/08.jpeg",
      "/images/fleet/y9/09.jpeg",
      "/images/fleet/y9/10.jpeg",
      "/images/fleet/y9/11.jpeg",
    ],
    bookable: true,
    altDescriptor: altDescriptors.y9,
    i18n: {
      en: {
        label: "Group Yacht · 40 Guests · Standard",
        tagline: "Group charter at the smaller-group rate (up to 15 guests)",
        description:
          "Group-class private yacht for up to 40 guests, priced at the smaller-group tier when the booking is for 15 guests or fewer. Suited to bachelor parties, birthdays, and small corporate gatherings. From €380 for a 2-hour charter; 10% discount from 3 hours onward.",
      },
      tr: {
        label: "Grup Yatı · 40 Kişilik · Standart",
        tagline: "15 kişiye kadar grup tarifesi (40 kişilik yatta)",
        description:
          "40 kişiye kadar misafir ağırlayan grup sınıfı özel yat — 15 kişiye kadar olan rezervasyonlar için Standart tarife uygulanır. Bekarlığa veda, doğum günü ve küçük kurumsal toplantılar için uygun. 2 saatlik özel kiralama €380'den başlar; 3 saat ve üzeri rezervasyonlarda %10 indirim.",
      },
      de: {
        label: "Gruppenyacht · 40 Gäste · Standard",
        tagline: "Gruppencharter zum Kleingruppen-Tarif (bis 15 Gäste)",
        description:
          "Gruppen-Privatyacht für bis zu 40 Gäste, zum Kleingruppen-Tarif, wenn die Buchung für 15 Gäste oder weniger ist. Geeignet für Junggesellenabschiede, Geburtstage und kleine Firmenrunden. Ab €380 für eine 2-Stunden-Charter; 10 % Rabatt ab 3 Stunden.",
      },
      fr: {
        label: "Yacht Groupe · 40 · Standard",
        tagline: "Charter groupe au tarif petit groupe (jusqu'à 15 invités)",
        description:
          "Yacht privé de catégorie groupe pour 40 invités maximum, au tarif petit groupe lorsque la réservation concerne 15 invités ou moins. Adapté aux enterrements de vie de garçon, anniversaires et petites réunions d'entreprise. À partir de €380 pour 2 heures ; 10 % de remise dès 3 heures.",
      },
      nl: {
        label: "Groepsjacht · 40 Gasten · Standard",
        tagline: "Groepscharter tegen kleingroep-tarief (tot 15 gasten)",
        description:
          "Privéjacht van groepsklasse voor maximaal 40 gasten, tegen het kleingroep-tarief wanneer de boeking voor 15 gasten of minder is. Geschikt voor vrijgezellenfeesten, verjaardagen en kleine bedrijfsbijeenkomsten. Vanaf €380 voor 2 uur; 10 % korting vanaf 3 uur.",
      },
      ru: {
        label: "Групповая яхта · 40 · Стандарт",
        tagline: "Групповая аренда по тарифу малой группы (до 15 гостей)",
        description:
          "Частная яхта группового класса для группы до 40 гостей, по тарифу малой группы при бронировании на 15 гостей или меньше. Подходит для девичников, дней рождения и небольших корпоративных встреч. От €380 за 2 часа; скидка 10 % от 3 часов.",
      },
      zh: {
        label: "团体游艇 · 40 人 · 标准",
        tagline: "团体包船小团体价（最多 15 人）",
        description:
          "可容纳最多 40 位宾客的团体级私人游艇——预订 15 人及以内时按小团体价计费。适合单身派对、生日及小型企业聚会。2 小时包船 €380 起；3 小时起享 10 % 折扣。",
      },
    },
  },
  {
    slug: "group-yacht-40-signature",
    internalCode: "group-signature-40",
    capacity: { min: 15, max: 40 },
    hourlyEur: 250,
    minHours: 2,
    discountFromHours: 3,
    discountPercent: 10,
    priceByHours: { 2: 500, 3: 675, 4: 900, 5: 1125, 6: 1350, 7: 1575, 8: 1800 },
    // Same y9 yacht as Standard, exterior-first ordering (see Standard above).
    coverImage: "/images/fleet/y9/03.jpeg",
    exteriorImages: [
      "/images/fleet/y9/03.jpeg",
      "/images/fleet/y9/04.jpeg",
      "/images/fleet/y9/05.jpeg",
      "/images/fleet/y9/06.jpeg",
    ],
    interiorImages: [
      "/images/fleet/y9/01.jpeg",
      "/images/fleet/y9/02.jpeg",
      "/images/fleet/y9/07.jpeg",
      "/images/fleet/y9/08.jpeg",
      "/images/fleet/y9/09.jpeg",
      "/images/fleet/y9/10.jpeg",
      "/images/fleet/y9/11.jpeg",
    ],
    bookable: true,
    badges: ["popular"],
    altDescriptor: altDescriptors.y9,
    i18n: {
      en: {
        label: "Group Yacht · 40 Guests · Signature",
        tagline: "Group charter at the larger-group rate (15–40 guests)",
        description:
          "Same 40-guest group-class yacht, priced at the larger-group tier when the booking is for 15 to 40 guests. Ideal for milestone celebrations, brand evenings, and mid-size corporate events. From €500 for a 2-hour charter; 10% discount from 3 hours onward.",
      },
      tr: {
        label: "Grup Yatı · 40 Kişilik · Signature",
        tagline: "15–40 kişi için grup tarifesi (40 kişilik yatta)",
        description:
          "Aynı 40 kişilik grup yatı — 15 ile 40 kişi arasındaki rezervasyonlar için Signature tarife uygulanır. Önemli kutlamalar, marka geceleri ve orta ölçekli kurumsal etkinlikler için ideal. 2 saatlik özel kiralama €500'den başlar; 3 saat ve üzeri rezervasyonlarda %10 indirim.",
      },
      de: {
        label: "Gruppenyacht · 40 Gäste · Signature",
        tagline: "Gruppencharter zum Großgruppen-Tarif (15–40 Gäste)",
        description:
          "Dieselbe 40-Gäste-Gruppenyacht, zum Großgruppen-Tarif, wenn die Buchung für 15 bis 40 Gäste ist. Ideal für besondere Anlässe, Markenabende und mittelgroße Firmenevents. Ab €500 für eine 2-Stunden-Charter; 10 % Rabatt ab 3 Stunden.",
      },
      fr: {
        label: "Yacht Groupe · 40 · Signature",
        tagline: "Charter groupe au tarif grand groupe (15 à 40 invités)",
        description:
          "Le même yacht de groupe pour 40 invités, au tarif grand groupe lorsque la réservation concerne 15 à 40 invités. Idéal pour les célébrations marquantes, soirées de marque et événements d'entreprise de taille moyenne. À partir de €500 pour 2 heures ; 10 % de remise dès 3 heures.",
      },
      nl: {
        label: "Groepsjacht · 40 Gasten · Signature",
        tagline: "Groepscharter tegen grootgroep-tarief (15–40 gasten)",
        description:
          "Hetzelfde groepsjacht voor 40 gasten, tegen het grootgroep-tarief wanneer de boeking voor 15 tot 40 gasten is. Ideaal voor mijlpaalvieringen, merkavonden en middelgrote bedrijfsevenementen. Vanaf €500 voor 2 uur; 10 % korting vanaf 3 uur.",
      },
      ru: {
        label: "Групповая яхта · 40 · Сигнатур",
        tagline: "Групповая аренда по тарифу большой группы (15–40 гостей)",
        description:
          "Та же яхта на 40 гостей, по тарифу большой группы при бронировании на 15–40 гостей. Идеальна для значимых торжеств, брендовых вечеров и корпоративных мероприятий среднего масштаба. От €500 за 2 часа; скидка 10 % от 3 часов.",
      },
      zh: {
        label: "团体游艇 · 40 人 · 尊享",
        tagline: "团体包船大团体价（15 至 40 人）",
        description:
          "同一艘 40 人团体游艇——预订 15 至 40 人时按大团体价计费。适合重要庆典、品牌之夜及中型企业活动。2 小时包船 €500 起；3 小时起享 10 % 折扣。",
      },
    },
  },
  {
    slug: "event-yacht-90",
    internalCode: "event-90",
    capacity: { min: 30, max: 90 },
    hourlyEur: null,
    minHours: 4,
    discountFromHours: 5,
    discountPercent: 10,
    // Operator model 2026-06-19: Event 90 is a BY-QUOTE vessel (no published
    // price, like the Mega 150). priceByHours null keeps it out of the
    // published min/max ladder and suppresses the Offer schema.
    priceByHours: null,
    coverImage: "/images/fleet/y10/01.jpeg",
    exteriorImages: [
      "/images/fleet/y10/01.jpeg",
      "/images/fleet/y10/02.jpeg",
      "/images/fleet/y10/03.jpeg",
      "/images/fleet/y10/04.jpeg",
      "/images/fleet/y10/05.jpeg",
    ],
    interiorImages: [
      "/images/fleet/y10/06.jpeg",
      "/images/fleet/y10/07.jpeg",
      "/images/fleet/y10/08.jpeg",
    ],
    // Was `true`, contradicting the by-quote comment above and Mega 150's
    // `bookable: false`. Every "Reserve" CTA (FleetDetailContent, BoatCard)
    // gated on this flag routed customers into the full BookingModal
    // reservation flow, but reservation-pricing.ts unconditionally rejects
    // any fleetSlug whose priceByHours resolves to null — so every submit
    // for this yacht failed 100% of the time with "the selected yacht or
    // duration could not be verified" (2026-07-16 hotfix).
    bookable: false,
    badges: ["event"],
    altDescriptor: altDescriptors.y10,
    i18n: {
      en: {
        label: "Event Yacht · 90 Guests",
        tagline: "Corporate evenings, weddings, and large private parties",
        description:
          "Event-class yacht built for corporate evenings, product launches, wedding receptions, and large private parties up to 90 guests. Priced by bespoke quote based on duration, catering, and event production; a written quote is returned within 60 minutes.",
      },
      tr: {
        label: "Etkinlik Yatı · 90 Kişilik",
        tagline: "Kurumsal akşamlar, düğünler ve büyük özel partiler",
        description:
          "Kurumsal akşamlar, lansmanlar, düğün resepsiyonları ve 90 kişiye kadar büyük özel partiler için tasarlanmış etkinlik sınıfı yat. Süre, ikram ve etkinlik prodüksiyonuna göre özel teklif ile fiyatlandırılır; yazılı teklif 60 dakika içinde iletilir.",
      },
      de: {
        label: "Event-Yacht · 90 Gäste",
        tagline: "Firmenabende, Hochzeiten und große Privatpartys",
        description:
          "Event-Yacht für Firmenabende, Produktlaunches, Hochzeitsempfänge und große Privatpartys bis zu 90 Gäste. Preis auf individuelles Angebot je nach Dauer, Catering und Event-Produktion; ein schriftliches Angebot folgt innerhalb von 60 Minuten.",
      },
      fr: {
        label: "Yacht Événement · 90 Invités",
        tagline: "Soirées d'entreprise, mariages et grandes fêtes privées",
        description:
          "Yacht de catégorie événement conçu pour les soirées d'entreprise, lancements de produit, réceptions de mariage et grandes fêtes privées jusqu'à 90 invités. Tarif sur devis personnalisé selon la durée, la restauration et la production événementielle ; un devis écrit est renvoyé sous 60 minutes.",
      },
      nl: {
        label: "Event-jacht · 90 Gasten",
        tagline: "Bedrijfsavonden, bruiloften en grote privéfeesten",
        description:
          "Event-jacht gebouwd voor bedrijfsavonden, productlanceringen, bruiloftsrecepties en grote privéfeesten tot 90 gasten. Prijs op maatwerkofferte op basis van duur, catering en eventproductie; een schriftelijke offerte volgt binnen 60 minuten.",
      },
      ru: {
        label: "Event-яхта · 90 гостей",
        tagline: "Корпоративные вечера, свадьбы и большие частные вечеринки",
        description:
          "Яхта event-класса для корпоративных вечеров, презентаций, свадебных банкетов и больших частных вечеринок до 90 гостей. Стоимость по индивидуальному предложению с учётом длительности, кейтеринга и организации мероприятия; письменное предложение в течение 60 минут.",
      },
      zh: {
        label: "活动游艇 · 90 人",
        tagline: "企业晚宴、婚礼及大型私人派对",
        description:
          "专为企业晚宴、产品发布、婚礼宴会及最多 90 人的大型私人派对打造的活动级游艇。根据时长、餐饮及活动制作按定制报价计费；书面报价 60 分钟内回复。",
      },
    },
  },
  {
    slug: "mega-event-yacht-150",
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
        label: "Mega Event Yacht · 150 Guests",
        tagline: "Large-scale gatherings, gala dinners, and weddings",
        description:
          "Our largest event vessel, configured for large weddings, gala dinners, brand activations, and corporate-scale gatherings up to 150 guests. Booked by quote only.",
      },
      tr: {
        label: "Mega Etkinlik Yatı · 150 Kişilik",
        tagline: "Büyük ölçekli toplantılar, gala yemekleri ve düğünler",
        description:
          "Büyük düğünler, gala yemekleri, marka aktivasyonları ve 150 kişiye kadar kurumsal ölçekte toplantılar için yapılandırılmış en büyük etkinlik teknemiz. Yalnızca teklif ile rezerve edilir.",
      },
      de: {
        label: "Mega-Event-Yacht · 150 Gäste",
        tagline: "Großveranstaltungen, Galadinner und Hochzeiten",
        description:
          "Unser größtes Eventschiff, konfiguriert für große Hochzeiten, Galadinner, Markenaktivierungen und Firmenveranstaltungen bis zu 150 Gäste. Buchung ausschließlich auf Angebotsbasis.",
      },
      fr: {
        label: "Yacht Méga-Événement · 150 Invités",
        tagline: "Rassemblements de grande envergure, dîners de gala et mariages",
        description:
          "Notre plus grand navire événementiel, configuré pour les grands mariages, dîners de gala, activations de marque et événements d'entreprise jusqu'à 150 invités. Réservation uniquement sur devis.",
      },
      nl: {
        label: "Mega Event Jacht · 150 Gasten",
        tagline: "Grootschalige bijeenkomsten, galadiners en bruiloften",
        description:
          "Ons grootste eventschip, ingericht voor grote bruiloften, galadiners, merkactivaties en bedrijfsbijeenkomsten tot 150 gasten. Alleen op offertebasis.",
      },
      ru: {
        label: "Мега-Event-яхта · 150 гостей",
        tagline: "Масштабные мероприятия, гала-ужины и свадьбы",
        description:
          "Наше крупнейшее event-судно, оборудованное для больших свадеб, гала-ужинов, брендовых активаций и корпоративных мероприятий до 150 гостей. Бронируется только по запросу.",
      },
      zh: {
        label: "超大活动游艇 · 150 人",
        tagline: "大型聚会、晚宴与婚礼",
        description:
          "我们最大的活动游艇，专为大型婚礼、晚宴、品牌活动及最多 150 人的企业级聚会配置。仅接受报价预订。",
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
