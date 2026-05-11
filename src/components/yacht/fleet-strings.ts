import type { SiteLocale } from "@/i18n/config";

type FleetStringsCommon = {
  capacity: string;
  guests: string;
  hours: string;
  hoursShort: string;
  perHourFrom: string;
  totalLabel: string;
  saveLabel: string;
  reserve: string;
  requestQuote: string;
  viewDetails: string;
  popularBadge: string;
  eventBadge: string;
  boutiqueBadge: string;
  megaBadge: string;
  discountBadge: string;
  exteriorTab: string;
  interiorTab: string;
  whatsappPrefill: string;
  minNote: string;
  sectionEyebrow: string;
  sectionTitle: string;
  sectionIntro: string;
  pricingTableHeading: string;
  pricingTableIntro: string;
  fleetColumn: string;
  capacityColumn: string;
  hourColumnByHour: Record<number, string>;
  quoteLabel: string;
  includedHeading: string;
  includedItems: string[];
  onRequestHeading: string;
  onRequestItems: string[];
  onRequestNote: string;
};

const EN: FleetStringsCommon = {
  capacity: "Capacity",
  guests: "guests",
  hours: "Duration",
  hoursShort: "h",
  perHourFrom: "From · 2h",
  totalLabel: "Total",
  saveLabel: "Saving",
  reserve: "Book this yacht",
  requestQuote: "Request a quote",
  viewDetails: "See full yacht page",
  popularBadge: "Most booked",
  eventBadge: "Events",
  boutiqueBadge: "Small deck",
  megaBadge: "Mega",
  discountBadge: "−10% from 3 hours",
  exteriorTab: "Outside",
  interiorTab: "Inside",
  whatsappPrefill:
    "Hi MerrySails — I'm interested in the {label} (up to {capacity} guests). Could you share availability?",
  minNote: "Two-hour minimum. Captain and crew sail with you.",
  sectionEyebrow: "Sailing the Bosphorus",
  sectionTitle: "Pick your Bosphorus yacht — six decks, one private sailing",
  sectionIntro:
    "Each booking holds the whole yacht — captain, crew, soft drinks, and a snack tray ride with the deck. Match it to your group size and the hours you want on the water; sailings of three hours or longer drop a flat ten percent automatically. Food, alcohol service, DJ, and event styling sit on a separate quote so the deck price stays clean.",
  pricingTableHeading: "Bosphorus yacht prices at a glance — EUR, per yacht",
  pricingTableIntro:
    "All six yachts, all duration tiers, in euros. Captain, crew, fuel, soft drinks, and snacks are baked into the deck price. The three-hour saving is automatic. Event-class decks are scoped per program and quoted separately.",
  fleetColumn: "Yacht tier",
  capacityColumn: "Up to",
  hourColumnByHour: { 2: "2h", 3: "3h", 4: "4h", 5: "5h", 6: "6h", 7: "7h", 8: "8h" },
  quoteLabel: "On quote",
  includedHeading: "On every sailing",
  includedItems: [
    "Whole-yacht booking — never per seat",
    "Captain and crew, fully licensed",
    "Fuel and standard Bosphorus route fees",
    "Soft drinks and bottled water",
    "Light snack tray for the deck",
    "Onboard audio system with Bluetooth pairing",
    "Life jackets and standard safety kit",
  ],
  onRequestHeading: "Add to the brief",
  onRequestItems: [
    "Plated dinners and catering menus",
    "Wine, beer, spirits, full bar service",
    "DJ, live music, dance act",
    "Proposal styling, flowers, cake",
    "Photographer or videographer",
    "Marina meet-and-greet, hotel transfer, parking",
  ],
  onRequestNote:
    "These sit outside the deck price — send the brief on WhatsApp and a fixed proposal comes back.",
};

const TR: FleetStringsCommon = {
  capacity: "Kapasite",
  guests: "kişi",
  hours: "Süre",
  hoursShort: "saat",
  perHourFrom: "2 saatten",
  totalLabel: "Toplam",
  saveLabel: "Tasarruf",
  reserve: "Bu yatı al",
  requestQuote: "Teklif iste",
  viewDetails: "Yat sayfasına geç",
  popularBadge: "En çok tercih",
  eventBadge: "Etkinlik",
  boutiqueBadge: "Küçük güverte",
  megaBadge: "Mega",
  discountBadge: "3 saatten itibaren −%10",
  exteriorTab: "Dış",
  interiorTab: "İç",
  whatsappPrefill:
    "Merhaba MerrySails — {label} ({capacity} kişiye kadar) ilgimi çekiyor. Müsaitlik paylaşır mısınız?",
  minNote: "Minimum iki saat. Kaptan ve mürettebat sizinle yola çıkar.",
  sectionEyebrow: "Boğaz'da Sailing",
  sectionTitle: "Boğaz yatınızı seçin — altı güverte, tek özel sailing",
  sectionIntro:
    "Her rezervasyon tüm yatı tutar — kaptan, mürettebat, yumuşak içecek ve atıştırmalık tabağı güverteyle birlikte yola çıkar. Grup büyüklüğünüze ve denizdeki saatlerinize göre eşleyin; üç saat ve üzeri sailingler otomatik olarak düz %10 düşer. Yemek, alkol servisi, DJ ve etkinlik stillemesi ayrı teklif olarak ilerler; böylece güverte fiyatı temiz kalır.",
  pricingTableHeading: "Bir bakışta Boğaz yat fiyatları — EUR, yat başı",
  pricingTableIntro:
    "Altı yat, tüm süre seçenekleri, euro cinsinden. Kaptan, mürettebat, yakıt, yumuşak içecek ve atıştırmalık güverte fiyatına dahil. Üç saatlik tasarruf otomatiktir. Etkinlik sınıfı güverteler programa göre ayrı fiyatlandırılır.",
  fleetColumn: "Yat sınıfı",
  capacityColumn: "Maks. kişi",
  hourColumnByHour: { 2: "2 saat", 3: "3 saat", 4: "4 saat", 5: "5 saat", 6: "6 saat", 7: "7 saat", 8: "8 saat" },
  quoteLabel: "Teklif",
  includedHeading: "Her sailingde",
  includedItems: [
    "Tüm yat rezervasyonu — koltuk bazlı değil",
    "Tam lisanslı kaptan ve mürettebat",
    "Yakıt ve standart Boğaz rota ücretleri",
    "Yumuşak içecek ve şişe su",
    "Güverte için hafif atıştırmalık tabağı",
    "Bluetooth eşleşmeli tekne ses sistemi",
    "Can yelekleri ve standart güvenlik seti",
  ],
  onRequestHeading: "Brief'e ekle",
  onRequestItems: [
    "Tabak servis yemekler ve catering menüleri",
    "Şarap, bira, sert içecek, tam bar servisi",
    "DJ, canlı müzik, dans gösterisi",
    "Evlilik teklifi stillemesi, çiçek, pasta",
    "Fotoğrafçı veya videograf",
    "Marina karşılama, otel transferi, otopark",
  ],
  onRequestNote:
    "Bunlar güverte fiyatının dışındadır — brief'i WhatsApp'tan iletin, sabit teklif geri döner.",
};

const DE: FleetStringsCommon = {
  capacity: "Kapazität",
  guests: "Gäste",
  hours: "Dauer",
  hoursShort: "Std.",
  perHourFrom: "Ab · 2 Std.",
  totalLabel: "Gesamt",
  saveLabel: "Ersparnis",
  reserve: "Diese Yacht buchen",
  requestQuote: "Angebot anfordern",
  viewDetails: "Zur Yacht-Seite",
  popularBadge: "Am meisten gebucht",
  eventBadge: "Events",
  boutiqueBadge: "Kleines Deck",
  megaBadge: "Mega",
  discountBadge: "Ab 3 Stunden −10 %",
  exteriorTab: "Außen",
  interiorTab: "Innen",
  whatsappPrefill:
    "Hallo MerrySails — die {label} (bis zu {capacity} Gäste) interessiert mich. Können Sie die Verfügbarkeit mitteilen?",
  minNote: "Mindestens zwei Stunden. Kapitän und Crew fahren mit.",
  sectionEyebrow: "Sailing am Bosporus",
  sectionTitle: "Wählen Sie Ihre Bosporus-Yacht — sechs Decks, ein privates Sailing",
  sectionIntro:
    "Jede Buchung sichert die ganze Yacht — Kapitän, Crew, Softdrinks und ein Snackbrett gehören zum Deck. Wählen Sie nach Gruppengröße und Stundenzahl; Sailings ab drei Stunden ziehen automatisch flache zehn Prozent ab. Essen, Bar-Service, DJ und Event-Styling laufen über ein separates Angebot, damit der Deckpreis sauber bleibt.",
  pricingTableHeading: "Bosporus-Yachtpreise auf einen Blick — EUR, pro Yacht",
  pricingTableIntro:
    "Alle sechs Yachten, alle Stundenstufen, in Euro. Kapitän, Crew, Treibstoff, Softdrinks und Snacks sind im Deckpreis enthalten. Die Drei-Stunden-Ersparnis ist automatisch. Event-Decks werden pro Programm separat angeboten.",
  fleetColumn: "Yacht-Stufe",
  capacityColumn: "Bis zu",
  hourColumnByHour: { 2: "2 Std.", 3: "3 Std.", 4: "4 Std.", 5: "5 Std.", 6: "6 Std.", 7: "7 Std.", 8: "8 Std." },
  quoteLabel: "Auf Anfrage",
  includedHeading: "In jedem Sailing",
  includedItems: [
    "Ganzes Schiff gebucht — nie pro Platz",
    "Kapitän und Crew, voll lizenziert",
    "Treibstoff und Standard-Bosporus-Routengebühren",
    "Softdrinks und Wasser in der Flasche",
    "Leichtes Snackbrett für das Deck",
    "Bord-Audio mit Bluetooth-Kopplung",
    "Rettungswesten und Standard-Sicherheitsausrüstung",
  ],
  onRequestHeading: "Zum Briefing hinzufügen",
  onRequestItems: [
    "Tellergedeckte Menüs und Catering",
    "Wein, Bier, Spirituosen, voller Bar-Service",
    "DJ, Live-Musik, Tanz-Act",
    "Heiratsantrag-Styling, Blumen, Torte",
    "Fotograf oder Videograf",
    "Marina-Empfang, Hoteltransfer, Parken",
  ],
  onRequestNote:
    "Diese laufen außerhalb des Deckpreises — Briefing per WhatsApp senden, ein Festangebot kommt zurück.",
};

const FR: FleetStringsCommon = {
  capacity: "Capacité",
  guests: "invités",
  hours: "Durée",
  hoursShort: "h",
  perHourFrom: "À partir de · 2h",
  totalLabel: "Total",
  saveLabel: "Économie",
  reserve: "Réserver ce yacht",
  requestQuote: "Demander un devis",
  viewDetails: "Voir la fiche yacht",
  popularBadge: "Le plus réservé",
  eventBadge: "Événements",
  boutiqueBadge: "Petit pont",
  megaBadge: "Méga",
  discountBadge: "−10 % dès 3 heures",
  exteriorTab: "Extérieur",
  interiorTab: "Intérieur",
  whatsappPrefill:
    "Bonjour MerrySails — le {label} (jusqu'à {capacity} invités) m'intéresse. Pourriez-vous m'indiquer les disponibilités ?",
  minNote: "Deux heures minimum. Capitaine et équipage naviguent avec vous.",
  sectionEyebrow: "Voile sur le Bosphore",
  sectionTitle: "Choisissez votre yacht du Bosphore — six ponts, une voile privée",
  sectionIntro:
    "Chaque réservation tient le yacht entier — capitaine, équipage, boissons sans alcool et un plateau d'amuse-bouches accompagnent le pont. Calez sur la taille du groupe et le nombre d'heures voulu sur l'eau ; les voiles de trois heures ou plus retirent dix pour cent automatiquement. Restauration, service bar, DJ et stylisme événementiel passent par un devis séparé pour garder le prix du pont net.",
  pricingTableHeading: "Tarifs yacht Bosphore d'un coup d'œil — EUR, par yacht",
  pricingTableIntro:
    "Les six yachts, tous les paliers d'heures, en euros. Capitaine, équipage, carburant, boissons sans alcool et collations sont compris dans le prix du pont. L'économie sur trois heures est automatique. Les ponts de classe événement sont calés sur le programme et chiffrés séparément.",
  fleetColumn: "Catégorie",
  capacityColumn: "Jusqu'à",
  hourColumnByHour: { 2: "2h", 3: "3h", 4: "4h", 5: "5h", 6: "6h", 7: "7h", 8: "8h" },
  quoteLabel: "Sur devis",
  includedHeading: "Sur chaque voile",
  includedItems: [
    "Yacht entier réservé — jamais à la place",
    "Capitaine et équipage, pleinement agréés",
    "Carburant et frais de route standard",
    "Boissons sans alcool et eau en bouteille",
    "Plateau d'amuse-bouches pour le pont",
    "Audio de bord avec appairage Bluetooth",
    "Gilets de sauvetage et kit de sécurité standard",
  ],
  onRequestHeading: "À ajouter au brief",
  onRequestItems: [
    "Dîners à l'assiette et menus catering",
    "Vin, bière, spiritueux, service bar complet",
    "DJ, musique live, numéro de danse",
    "Stylisme demande en fiançailles, fleurs, gâteau",
    "Photographe ou vidéaste",
    "Accueil marina, transfert hôtel, parking",
  ],
  onRequestNote:
    "Hors prix du pont — envoyez le brief sur WhatsApp, un devis fixe revient.",
};

const NL: FleetStringsCommon = {
  capacity: "Capaciteit",
  guests: "gasten",
  hours: "Duur",
  hoursShort: "u",
  perHourFrom: "Vanaf · 2u",
  totalLabel: "Totaal",
  saveLabel: "Besparing",
  reserve: "Dit jacht boeken",
  requestQuote: "Offerte aanvragen",
  viewDetails: "Naar jacht-pagina",
  popularBadge: "Meest geboekt",
  eventBadge: "Events",
  boutiqueBadge: "Klein dek",
  megaBadge: "Mega",
  discountBadge: "−10% vanaf 3 uur",
  exteriorTab: "Buiten",
  interiorTab: "Binnen",
  whatsappPrefill:
    "Hallo MerrySails — de {label} (tot {capacity} gasten) heeft mijn interesse. Kunt u de beschikbaarheid delen?",
  minNote: "Minimaal twee uur. Kapitein en bemanning varen mee.",
  sectionEyebrow: "Zeilen op de Bosporus",
  sectionTitle: "Kies uw Bosporus-jacht — zes dekken, één privé zeilingang",
  sectionIntro:
    "Elke boeking houdt het hele jacht — kapitein, bemanning, frisdrank en een snackbord horen bij het dek. Stem af op groepsgrootte en het aantal uren dat u op het water wilt; vaarten van drie uur of langer trekken automatisch een vlakke tien procent af. Eten, barservice, DJ en eventstyling lopen via een aparte offerte, zodat de dekprijs schoon blijft.",
  pricingTableHeading: "Bosporus-jachtprijzen in één oogopslag — EUR, per jacht",
  pricingTableIntro:
    "Alle zes jachten, alle uurklassen, in euro's. Kapitein, bemanning, brandstof, frisdrank en snacks zitten in de dekprijs. De drie-uur korting is automatisch. Event-dekken worden per programma apart geprijsd.",
  fleetColumn: "Jacht-klasse",
  capacityColumn: "Tot",
  hourColumnByHour: { 2: "2u", 3: "3u", 4: "4u", 5: "5u", 6: "6u", 7: "7u", 8: "8u" },
  quoteLabel: "Op offerte",
  includedHeading: "Bij elke vaart",
  includedItems: [
    "Hele jacht geboekt — nooit per plek",
    "Kapitein en bemanning, volledig gediplomeerd",
    "Brandstof en standaard Bosporus-routekosten",
    "Frisdrank en flessenwater",
    "Licht snackbord voor het dek",
    "Audio aan boord met Bluetooth-koppeling",
    "Reddingsvesten en standaard veiligheidsset",
  ],
  onRequestHeading: "Aan de briefing toevoegen",
  onRequestItems: [
    "Bord-geserveerde diners en catering",
    "Wijn, bier, sterke drank, volledige barservice",
    "DJ, livemuziek, dansoptreden",
    "Huwelijksaanzoek-styling, bloemen, taart",
    "Fotograaf of videograaf",
    "Marina-ontvangst, hoteltransfer, parkeren",
  ],
  onRequestNote:
    "Deze vallen buiten de dekprijs — stuur de briefing via WhatsApp en een vast voorstel komt terug.",
};

const STRINGS: Partial<Record<SiteLocale, FleetStringsCommon>> = {
  en: EN,
  tr: TR,
  de: DE,
  fr: FR,
  nl: NL,
};

export function getFleetStrings(locale: SiteLocale): FleetStringsCommon {
  return STRINGS[locale] ?? EN;
}

export type { FleetStringsCommon };
