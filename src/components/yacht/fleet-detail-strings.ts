import type { SiteLocale } from "@/i18n/config";

export type FleetDetailStrings = {
  breadcrumbHome: string;
  breadcrumbCharter: string;
  pricingHeading: string;
  pricingIntro: string;
  durationColumn: string;
  totalColumn: string;
  savingsColumn: string;
  galleryHeading: string;
  galleryExterior: string;
  galleryInterior: string;
  includedHeading: string;
  includedItems: string[];
  onRequestHeading: string;
  onRequestItems: string[];
  bestForHeading: string;
  bestForByTier: {
    boutique: string[];
    medium: string[];
    event: string[];
  };
  whyThisSize: string;
  faqHeading: string;
  faqs: { q: string; a: string }[];
  reserveCta: string;
  quoteCta: string;
  backToFleet: string;
  capacity: string;
  capacityLabel: string;
  guests: string;
  duration: string;
  fromPrice: string;
  twoHourMin: string;
  taxIncluded: string;
  campaignLine: string;
  whatsappPrefill: string;
};

const EN: FleetDetailStrings = {
  breadcrumbHome: "Home",
  breadcrumbCharter: "Yacht Charter Istanbul",
  pricingHeading: "Pricing for this yacht — 2 to 8 hours",
  pricingIntro:
    "Whole-yacht pricing in euros. Includes captain, crew, fuel, soft drinks, and snacks. The 10% reduction applies automatically from 3 hours onward. Catering, alcohol, DJ, and event styling are quoted separately.",
  durationColumn: "Duration",
  totalColumn: "Total (EUR)",
  savingsColumn: "Savings",
  galleryHeading: "Yacht gallery",
  galleryExterior: "Exterior",
  galleryInterior: "Interior",
  includedHeading: "Included with every charter",
  includedItems: [
    "Whole-yacht private charter (not per person)",
    "Licensed captain and crew",
    "Fuel and standard route fees",
    "Soft drinks and bottled water",
    "Light snacks on board",
    "Bluetooth audio system",
    "Life jackets and safety kit",
  ],
  onRequestHeading: "Available on request",
  onRequestItems: [
    "Full meals and catering menus",
    "Wine, beer, spirits and bar service",
    "DJ, live music, dance performance",
    "Proposal styling, flowers, cake",
    "Professional photographer or videographer",
    "Marina pickup, hotel transfer, parking",
  ],
  bestForHeading: "Who this yacht is for",
  bestForByTier: {
    boutique: [
      "Marriage proposals on the Bosphorus",
      "Anniversaries and date nights",
      "Small birthday gatherings (4–12 guests)",
      "Tight friend groups for a private afternoon",
      "Couples wanting a quiet sunset sail",
      "Family outings with close relatives",
    ],
    medium: [
      "Birthday parties for 20–36 guests",
      "Bachelor and bachelorette afternoons",
      "Small corporate offsites and team builds",
      "Friend reunions and milestone celebrations",
      "Family gatherings across multiple generations",
      "Brand evenings with intimate guest lists",
    ],
    event: [
      "Wedding receptions on the water",
      "Gala dinners and corporate evenings",
      "Brand activations and product launches",
      "Large birthday and milestone parties",
      "Anniversary celebrations for extended families",
      "Conference dinners with full-floor programming",
    ],
  },
  whyThisSize:
    "Yacht size shapes the entire evening: deck space per guest, the way conversation flows, and how you frame the celebration. This vessel is sized for the use cases below — if your group sits outside this range, our other fleet tiers will fit better.",
  faqHeading: "Frequently asked questions",
  faqs: [
    {
      q: "What's the minimum charter duration?",
      a: "Every yacht starts on a 2-hour charter minimum. You can extend in 1-hour blocks up to 8 hours. From 3 hours onward, a 10% discount is applied automatically across the bookable fleet.",
    },
    {
      q: "Is the price per person or per yacht?",
      a: "Pricing is per yacht, not per person. The number shown covers the whole vessel within the published capacity range — bring your full group at no extra seat charge.",
    },
    {
      q: "What's included in the deck price?",
      a: "Captain and crew, fuel and standard route fees, soft drinks and bottled water, light snacks, onboard sound system with Bluetooth, and full safety equipment. The crew handles the route, music, and timing while you focus on your group.",
    },
    {
      q: "Can we bring our own food and drinks?",
      a: "Yes, guests are welcome to bring their own food, alcohol, and decoration. Alternatively, we offer catering menus, bar service, DJ, live music, proposal styling, and photographer as add-ons — each priced separately per brief.",
    },
    {
      q: "Where does the charter depart from?",
      a: "Departures are typically from Kabataş, Beşiktaş, Bebek, or Kuruçeşme Marina depending on availability. The exact boarding point is confirmed after booking, and a meeting-point pin is sent via WhatsApp or email.",
    },
    {
      q: "How do I confirm the booking?",
      a: "Pick your date and group size, then send the booking request. We confirm availability within a few hours, take a deposit, and you receive the meeting-point details and crew contact ahead of your sailing day.",
    },
  ],
  reserveCta: "Reserve this yacht",
  quoteCta: "Request a quote",
  backToFleet: "Browse full fleet",
  capacity: "Capacity",
  capacityLabel: "Private charter",
  guests: "guests",
  duration: "hours",
  fromPrice: "From · 2h",
  twoHourMin: "Minimum charter: 2 hours.",
  taxIncluded: "Prices include taxes. Captain, crew, fuel, soft drinks, and snacks included. Catering, alcohol, DJ, and event extras priced on request.",
  campaignLine: "Ready to book?",
  whatsappPrefill:
    "Hi MerrySails — I'd like to book the {label} (capacity {capacity}). Please share availability and the next steps.",
};

const TR: FleetDetailStrings = {
  breadcrumbHome: "Ana Sayfa",
  breadcrumbCharter: "Yat Kiralama İstanbul",
  pricingHeading: "Bu yat için fiyatlandırma — 2 ila 8 saat",
  pricingIntro:
    "Yat başına euro fiyatlandırma. Kaptan, mürettebat, yakıt, yumuşak içecek ve atıştırmalık dahildir. %10 indirim 3 saatten itibaren otomatik uygulanır. Yemek, alkol, DJ ve etkinlik stillemesi ayrı teklif olarak fiyatlandırılır.",
  durationColumn: "Süre",
  totalColumn: "Toplam (EUR)",
  savingsColumn: "İndirim",
  galleryHeading: "Yat galerisi",
  galleryExterior: "Dış",
  galleryInterior: "İç",
  includedHeading: "Her kiralamada dahildir",
  includedItems: [
    "Yatın tamamı özel kiralama (kişi başı değil)",
    "Lisanslı kaptan ve mürettebat",
    "Yakıt ve standart rota ücretleri",
    "Yumuşak içecek ve şişe su",
    "Tekne içi hafif atıştırmalık",
    "Bluetooth ses sistemi",
    "Can yelekleri ve güvenlik ekipmanları",
  ],
  onRequestHeading: "Talep üzerine",
  onRequestItems: [
    "Tam menü ve catering",
    "Şarap, bira, sert içecekler ve bar servisi",
    "DJ, canlı müzik ve dans gösterisi",
    "Evlilik teklifi dekorasyonu, çiçek, pasta",
    "Profesyonel fotoğrafçı veya videograf",
    "Marina karşılama, otel transferi, otopark",
  ],
  bestForHeading: "Bu yat kimler için ideal",
  bestForByTier: {
    boutique: [
      "Boğaz'da evlilik teklifi anları",
      "Yıl dönümleri ve özel akşamlar",
      "4-12 kişilik küçük doğum günü buluşmaları",
      "Yakın arkadaş grupları için sakin bir öğleden sonra",
      "Çiftler için sessiz bir gün batımı turu",
      "Yakın aile çıkışları",
    ],
    medium: [
      "20-36 kişilik doğum günü partileri",
      "Bekarlığa veda öğleden sonraları",
      "Küçük kurumsal off-site ve takım etkinlikleri",
      "Arkadaş buluşmaları ve önemli kutlamalar",
      "Çok kuşaklı aile toplantıları",
      "Sınırlı misafir listeli marka geceleri",
    ],
    event: [
      "Su üstü düğün resepsiyonları",
      "Gala yemekleri ve kurumsal akşamlar",
      "Marka aktivasyonları ve lansmanlar",
      "Büyük ölçekli doğum günü partileri",
      "Geniş aile yıl dönümü kutlamaları",
      "Tam program konferans yemekleri",
    ],
  },
  whyThisSize:
    "Yat büyüklüğü tüm akşamı şekillendirir: kişi başına güverte alanı, sohbet akışı ve kutlamayı çerçevelendirme şekli. Bu tekne aşağıdaki kullanım senaryolarına göre boyutlandırılmıştır — grup büyüklüğünüz bu aralığın dışındaysa diğer filo sınıflarımız daha uygun olur.",
  faqHeading: "Sıkça sorulan sorular",
  faqs: [
    {
      q: "Minimum kiralama süresi nedir?",
      a: "Her yat 2 saat minimum kiralamayla başlar. 8 saate kadar 1'er saatlik artışlarla uzatabilirsiniz. 3 saatten itibaren tüm kiralanabilir filoda %10 indirim otomatik uygulanır.",
    },
    {
      q: "Fiyat kişi başı mı yat başına mı?",
      a: "Fiyatlandırma yat başınadır, kişi başı değil. Gösterilen tutar, yayınlanan kapasite aralığındaki tüm grubu kapsar — fazladan koltuk ücreti yoktur.",
    },
    {
      q: "Güverte fiyatına neler dahil?",
      a: "Kaptan ve mürettebat, yakıt ve standart rota ücretleri, yumuşak içecek ve şişe su, hafif atıştırmalık, Bluetooth ses sistemi ve eksiksiz güvenlik ekipmanı. Rota, müzik ve zamanlama mürettebattadır; siz grupla ilgilenirsiniz.",
    },
    {
      q: "Kendi yiyecek ve içeceğimizi getirebilir miyiz?",
      a: "Evet, misafirler kendi yiyeceklerini, alkollerini ve dekorasyonlarını getirebilir. Alternatif olarak catering menüleri, bar servisi, DJ, canlı müzik, evlilik teklifi stillemesi ve fotoğrafçı eklemelerimiz vardır — her biri brief'e göre ayrı fiyatlandırılır.",
    },
    {
      q: "Kalkış nereden olur?",
      a: "Kalkış genelde müsaitliğe göre Kabataş, Beşiktaş, Bebek veya Kuruçeşme Marina'dan olur. Tam biniş noktası rezervasyondan sonra onaylanır; buluşma pin'i WhatsApp veya e-posta ile iletilir.",
    },
    {
      q: "Rezervasyonu nasıl onaylarım?",
      a: "Tarih ve grup büyüklüğünü seçip rezervasyon talebini gönderin. Müsaitliği birkaç saat içinde onaylar, depozito alır ve sailing gününüzden önce buluşma detayları ile mürettebat iletişimini iletiriz.",
    },
  ],
  reserveCta: "Bu yatı rezerve et",
  quoteCta: "Teklif iste",
  backToFleet: "Tüm filoya geri dön",
  capacity: "Kapasite",
  capacityLabel: "Özel kiralama",
  guests: "kişi",
  duration: "saat",
  fromPrice: "2 saatten",
  twoHourMin: "Minimum kiralama: 2 saat.",
  taxIncluded: "Fiyatlara vergi dahildir. Kaptan, mürettebat, yakıt, yumuşak içecek ve atıştırmalık dahildir. Yemek, alkol, DJ ve etkinlik ekstraları talep üzerine fiyatlandırılır.",
  campaignLine: "Rezervasyon için hazır mısınız?",
  whatsappPrefill:
    "Merhaba MerrySails — {label} (kapasite {capacity}) rezerve etmek istiyorum. Müsaitliği ve sonraki adımları paylaşır mısınız?",
};

const DE: FleetDetailStrings = {
  breadcrumbHome: "Startseite",
  breadcrumbCharter: "Yachtcharter Istanbul",
  pricingHeading: "Preise für diese Yacht — 2 bis 8 Stunden",
  pricingIntro:
    "Pro-Yacht-Preise in Euro. Inklusive Kapitän, Crew, Treibstoff, Softdrinks und Snacks. Ab 3 Stunden gilt automatisch 10 % Rabatt. Catering, Alkohol, DJ und Event-Styling werden separat angeboten.",
  durationColumn: "Dauer",
  totalColumn: "Gesamt (EUR)",
  savingsColumn: "Ersparnis",
  galleryHeading: "Yacht-Galerie",
  galleryExterior: "Außen",
  galleryInterior: "Innen",
  includedHeading: "In jeder Charter enthalten",
  includedItems: [
    "Ganzes Schiff (nicht pro Person)",
    "Lizenzierter Kapitän und Crew",
    "Treibstoff und Routengebühren",
    "Softdrinks und Wasser",
    "Leichte Snacks an Bord",
    "Bluetooth-Audio-System",
    "Rettungswesten und Sicherheitsausrüstung",
  ],
  onRequestHeading: "Auf Anfrage",
  onRequestItems: [
    "Vollmenüs und Catering",
    "Wein, Bier, Spirituosen, Bar-Service",
    "DJ, Live-Musik, Tanz-Act",
    "Heiratsantrag-Styling, Blumen, Torte",
    "Fotograf oder Videograf",
    "Marina-Abholung, Hoteltransfer, Parken",
  ],
  bestForHeading: "Für wen diese Yacht ideal ist",
  bestForByTier: {
    boutique: [
      "Heiratsanträge auf dem Bosporus",
      "Hochzeitstage und romantische Abende",
      "Kleine Geburtstagsrunden (4–12 Gäste)",
      "Enge Freundeskreise für einen privaten Nachmittag",
      "Paare, die eine ruhige Sonnenuntergangsfahrt wollen",
      "Familienausflüge im engsten Kreis",
    ],
    medium: [
      "Geburtstagsfeiern für 20–36 Gäste",
      "Junggesellen- und Junggesellinnen-Nachmittage",
      "Kleine Firmen-Offsites und Team-Events",
      "Freundes-Reunions und besondere Anlässe",
      "Familienfeiern über mehrere Generationen",
      "Markenabende mit ausgewählter Gästeliste",
    ],
    event: [
      "Hochzeitsempfänge auf dem Wasser",
      "Galadinner und Firmenabende",
      "Markenaktivierungen und Produktlaunches",
      "Große Geburtstagsfeiern",
      "Hochzeitstage der erweiterten Familie",
      "Konferenz-Dinner mit Komplettprogramm",
    ],
  },
  whyThisSize:
    "Die Yachtgröße prägt den ganzen Abend: Deckfläche pro Gast, der Fluss der Gespräche und der Rahmen für die Feier. Dieses Schiff ist auf die untenstehenden Anlässe zugeschnitten — liegt Ihre Gruppe außerhalb, passen unsere anderen Flotten-Stufen besser.",
  faqHeading: "Häufig gestellte Fragen",
  faqs: [
    {
      q: "Wie lang ist die Mindestcharterdauer?",
      a: "Jede Yacht beginnt mit 2 Stunden Mindestcharter. Sie können in 1-Stunden-Blöcken auf bis zu 8 Stunden verlängern. Ab 3 Stunden wird automatisch 10 % Rabatt angewendet.",
    },
    {
      q: "Ist der Preis pro Person oder pro Yacht?",
      a: "Der Preis gilt pro Yacht, nicht pro Person. Der angezeigte Betrag deckt das ganze Schiff im veröffentlichten Kapazitätsbereich ab.",
    },
    {
      q: "Was ist im Deckpreis enthalten?",
      a: "Kapitän und Crew, Treibstoff und Standard-Routengebühren, Softdrinks und Wasser, leichte Snacks, Bord-Audio mit Bluetooth und vollständige Sicherheitsausrüstung. Crew kümmert sich um Route, Musik und Timing.",
    },
    {
      q: "Können wir eigenes Essen und Getränke mitbringen?",
      a: "Ja, Gäste dürfen eigenes Essen, Alkohol und Dekoration mitbringen. Alternativ bieten wir Catering, Bar-Service, DJ, Live-Musik, Heiratsantrag-Styling und Fotograf als Add-ons an.",
    },
    {
      q: "Wo legt die Charter ab?",
      a: "Abfahrt meist ab Kabataş, Beşiktaş, Bebek oder Kuruçeşme Marina je nach Verfügbarkeit. Der genaue Anlegepunkt wird nach Buchung bestätigt; eine Treffpunkt-Pin wird per WhatsApp oder E-Mail versendet.",
    },
    {
      q: "Wie bestätige ich die Buchung?",
      a: "Datum und Gruppengröße wählen, dann die Buchungsanfrage senden. Wir bestätigen die Verfügbarkeit innerhalb weniger Stunden, nehmen eine Anzahlung und senden Treffpunkt und Crew-Kontakt vor Ihrem Sailing-Tag.",
    },
  ],
  reserveCta: "Diese Yacht reservieren",
  quoteCta: "Angebot anfordern",
  backToFleet: "Zur gesamten Flotte",
  capacity: "Kapazität",
  capacityLabel: "Privatcharter",
  guests: "Gäste",
  duration: "Std.",
  fromPrice: "Ab · 2 Std.",
  twoHourMin: "Mindestcharter: 2 Stunden.",
  taxIncluded: "Preise inkl. Steuern. Kapitän, Crew, Treibstoff, Softdrinks und Snacks inklusive. Catering, Alkohol, DJ und Event-Extras auf Anfrage.",
  campaignLine: "Bereit zur Buchung?",
  whatsappPrefill:
    "Hallo MerrySails — ich möchte die {label} (Kapazität {capacity}) buchen. Bitte teilen Sie mir die Verfügbarkeit und die nächsten Schritte mit.",
};

const FR: FleetDetailStrings = {
  breadcrumbHome: "Accueil",
  breadcrumbCharter: "Location de Yacht Istanbul",
  pricingHeading: "Tarification de ce yacht — 2 à 8 heures",
  pricingIntro:
    "Tarification par yacht en euros. Inclut capitaine, équipage, carburant, boissons sans alcool et collations. La remise de 10 % s'applique automatiquement à partir de 3 heures. Restauration, alcool, DJ et stylisme événementiel sur devis séparé.",
  durationColumn: "Durée",
  totalColumn: "Total (EUR)",
  savingsColumn: "Économie",
  galleryHeading: "Galerie du yacht",
  galleryExterior: "Extérieur",
  galleryInterior: "Intérieur",
  includedHeading: "Inclus dans chaque location",
  includedItems: [
    "Yacht entier (jamais à la place)",
    "Capitaine et équipage agréés",
    "Carburant et frais de route",
    "Boissons sans alcool et eau",
    "Collations légères à bord",
    "Système audio Bluetooth",
    "Gilets de sauvetage et kit de sécurité",
  ],
  onRequestHeading: "Sur demande",
  onRequestItems: [
    "Menus complets et catering",
    "Vin, bière, spiritueux, service bar",
    "DJ, musique live, numéro de danse",
    "Stylisme demande en fiançailles, fleurs, gâteau",
    "Photographe ou vidéaste",
    "Accueil marina, transfert hôtel, parking",
  ],
  bestForHeading: "Pour qui ce yacht est conçu",
  bestForByTier: {
    boutique: [
      "Demandes en fiançailles sur le Bosphore",
      "Anniversaires de mariage et soirées en duo",
      "Petites fêtes d'anniversaire (4–12 invités)",
      "Petits cercles d'amis pour un après-midi privé",
      "Couples cherchant une croisière coucher de soleil tranquille",
      "Sorties en famille proche",
    ],
    medium: [
      "Anniversaires pour 20 à 36 invités",
      "Enterrements de vie de garçon ou jeune fille",
      "Petits offsites d'entreprise et team-builds",
      "Retrouvailles entre amis et célébrations marquantes",
      "Réunions de famille intergénérationnelles",
      "Soirées de marque avec liste d'invités restreinte",
    ],
    event: [
      "Réceptions de mariage sur l'eau",
      "Dîners de gala et soirées d'entreprise",
      "Activations de marque et lancements de produit",
      "Grandes fêtes d'anniversaire",
      "Anniversaires en famille élargie",
      "Dîners de conférence avec programme complet",
    ],
  },
  whyThisSize:
    "La taille du yacht façonne toute la soirée : espace de pont par invité, fluidité des conversations et cadre de la célébration. Ce navire est calibré pour les usages ci-dessous — si votre groupe sort de cette plage, nos autres catégories conviendront mieux.",
  faqHeading: "Questions fréquentes",
  faqs: [
    {
      q: "Quelle est la durée minimale de location ?",
      a: "Chaque yacht démarre sur une location minimale de 2 heures. Vous pouvez prolonger par tranches d'une heure jusqu'à 8 heures. À partir de 3 heures, une remise de 10 % s'applique automatiquement.",
    },
    {
      q: "Le prix est-il par personne ou par yacht ?",
      a: "Le tarif est par yacht, jamais par personne. Le montant affiché couvre l'ensemble du bateau dans la plage de capacité publiée — aucun supplément par place.",
    },
    {
      q: "Qu'inclut le prix du pont ?",
      a: "Capitaine et équipage, carburant et frais de route standard, boissons sans alcool et eau, collations légères, système audio avec Bluetooth et équipement de sécurité complet. L'équipage gère l'itinéraire, la musique et le timing.",
    },
    {
      q: "Pouvons-nous apporter notre nourriture et nos boissons ?",
      a: "Oui, les invités peuvent apporter leur propre nourriture, alcool et décoration. Vous pouvez aussi ajouter restauration, service bar, DJ, musique live, stylisme demande en fiançailles et photographe en options chiffrées séparément.",
    },
    {
      q: "D'où part la location ?",
      a: "Les départs se font généralement de Kabataş, Beşiktaş, Bebek ou de Kuruçeşme Marina selon disponibilité. Le point d'embarquement exact est confirmé après réservation, et un repère cartographique est envoyé par WhatsApp ou e-mail.",
    },
    {
      q: "Comment confirmer la réservation ?",
      a: "Choisissez date et taille de groupe, puis envoyez la demande. Nous confirmons la disponibilité en quelques heures, prenons un acompte et vous transmettons le point de rendez-vous et le contact équipage avant la journée de navigation.",
    },
  ],
  reserveCta: "Réserver ce yacht",
  quoteCta: "Demander un devis",
  backToFleet: "Voir toute la flotte",
  capacity: "Capacité",
  capacityLabel: "Location privée",
  guests: "invités",
  duration: "heures",
  fromPrice: "À partir de · 2h",
  twoHourMin: "Location minimum : 2 heures.",
  taxIncluded: "Taxes incluses. Capitaine, équipage, carburant, boissons sans alcool et collations inclus. Restauration, alcool, DJ et extras événementiels sur devis.",
  campaignLine: "Prêt à réserver ?",
  whatsappPrefill:
    "Bonjour MerrySails — je souhaite réserver le {label} (capacité {capacity}). Pouvez-vous m'indiquer les disponibilités et la suite ?",
};

const NL: FleetDetailStrings = {
  breadcrumbHome: "Home",
  breadcrumbCharter: "Jachthuur Istanbul",
  pricingHeading: "Prijzen voor dit jacht — 2 tot 8 uur",
  pricingIntro:
    "Prijs per jacht in euro's. Inclusief kapitein, bemanning, brandstof, frisdrank en snacks. Vanaf 3 uur geldt automatisch 10 % korting. Catering, alcohol, DJ en eventstyling worden apart geprijsd.",
  durationColumn: "Duur",
  totalColumn: "Totaal (EUR)",
  savingsColumn: "Korting",
  galleryHeading: "Jacht-galerij",
  galleryExterior: "Buiten",
  galleryInterior: "Binnen",
  includedHeading: "Bij elke charter inbegrepen",
  includedItems: [
    "Het hele jacht (niet per persoon)",
    "Gediplomeerde kapitein en bemanning",
    "Brandstof en standaard routekosten",
    "Frisdrank en flessenwater",
    "Lichte snacks aan boord",
    "Bluetooth-audio aan boord",
    "Reddingsvesten en veiligheidsuitrusting",
  ],
  onRequestHeading: "Op aanvraag",
  onRequestItems: [
    "Volledige menu's en catering",
    "Wijn, bier, sterke drank, barservice",
    "DJ, livemuziek, dansoptreden",
    "Huwelijksaanzoek-styling, bloemen, taart",
    "Fotograaf of videograaf",
    "Marina-ontvangst, hoteltransfer, parkeren",
  ],
  bestForHeading: "Voor wie dit jacht ideaal is",
  bestForByTier: {
    boutique: [
      "Huwelijksaanzoeken op de Bosporus",
      "Jubilea en romantische avonden",
      "Kleine verjaardagsbijeenkomsten (4–12 gasten)",
      "Kleine vriendengroepen voor een privémiddag",
      "Stellen voor een rustige zonsondergangtocht",
      "Familie-uitjes in nauwe kring",
    ],
    medium: [
      "Verjaardagen voor 20–36 gasten",
      "Vrijgezellenmiddagen",
      "Kleine bedrijfsoffsites en teamuitjes",
      "Vriendenreünies en mijlpaalvieringen",
      "Familiebijeenkomsten over meerdere generaties",
      "Merkavonden met selecte gastenlijst",
    ],
    event: [
      "Bruiloftsrecepties op het water",
      "Galadiners en bedrijfsavonden",
      "Merkactivaties en productlanceringen",
      "Grote verjaardagsfeesten",
      "Jubilea voor uitgebreide families",
      "Conferentie-diners met volledig programma",
    ],
  },
  whyThisSize:
    "Jachtgrootte bepaalt de hele avond: dekruimte per gast, gespreksstroom en de manier waarop u de viering kadert. Dit schip is afgestemd op onderstaande gelegenheden — past uw groep daarbuiten, dan zijn onze andere klassen geschikter.",
  faqHeading: "Veelgestelde vragen",
  faqs: [
    {
      q: "Wat is de minimale charterduur?",
      a: "Elk jacht begint met een charter van minimaal 2 uur. U kunt in blokken van 1 uur verlengen tot 8 uur. Vanaf 3 uur wordt automatisch 10 % korting toegepast.",
    },
    {
      q: "Is de prijs per persoon of per jacht?",
      a: "De prijs is per jacht, niet per persoon. Het getoonde bedrag dekt het hele schip binnen het gepubliceerde capaciteitsbereik — geen extra kosten per stoel.",
    },
    {
      q: "Wat zit er in de dekprijs?",
      a: "Kapitein en bemanning, brandstof en standaard routekosten, frisdrank en flessenwater, lichte snacks, audio aan boord met Bluetooth en volledige veiligheidsuitrusting. De bemanning regelt route, muziek en timing.",
    },
    {
      q: "Mogen we eigen eten en drinken meebrengen?",
      a: "Ja, gasten mogen eigen eten, alcohol en decoratie meebrengen. Daarnaast bieden we catering, barservice, DJ, livemuziek, huwelijksaanzoek-styling en fotograaf als extra opties die apart geprijsd worden.",
    },
    {
      q: "Vanwaar vertrekt de charter?",
      a: "Vertrek meestal vanaf Kabataş, Beşiktaş, Bebek of Kuruçeşme Marina afhankelijk van beschikbaarheid. Het exacte instappunt wordt na boeking bevestigd; een ontmoetingspin wordt via WhatsApp of e-mail gestuurd.",
    },
    {
      q: "Hoe bevestig ik de boeking?",
      a: "Kies datum en groepsgrootte en stuur de boekingsaanvraag. We bevestigen beschikbaarheid binnen enkele uren, ontvangen een aanbetaling en sturen ontmoetingsdetails en bemanningscontact vóór uw vaardag.",
    },
  ],
  reserveCta: "Dit jacht reserveren",
  quoteCta: "Offerte aanvragen",
  backToFleet: "Naar volledige vloot",
  capacity: "Capaciteit",
  capacityLabel: "Privécharter",
  guests: "gasten",
  duration: "uur",
  fromPrice: "Vanaf · 2u",
  twoHourMin: "Minimale charter: 2 uur.",
  taxIncluded: "Prijzen inclusief belastingen. Kapitein, bemanning, brandstof, frisdrank en snacks inbegrepen. Catering, alcohol, DJ en eventextra's op aanvraag.",
  campaignLine: "Klaar om te boeken?",
  whatsappPrefill:
    "Hallo MerrySails — ik wil de {label} (capaciteit {capacity}) boeken. Kunt u de beschikbaarheid en de volgende stappen delen?",
};

const STRINGS: Partial<Record<SiteLocale, FleetDetailStrings>> = {
  en: EN,
  tr: TR,
  de: DE,
  fr: FR,
  nl: NL,
};

export function getFleetDetailStrings(locale: SiteLocale): FleetDetailStrings {
  return STRINGS[locale] ?? EN;
}
