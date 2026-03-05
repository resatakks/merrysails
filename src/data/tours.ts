export interface Tour {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  longDescription: string;
  duration: string;
  capacity: string;
  priceEur: number;
  originalPriceEur?: number;
  priceTry: number;
  includes: string[];
  notIncluded?: string[];
  highlights: string[];
  badge: string;
  badgeColor: string;
  image: string;
  gallery: string[];
  route: string;
  departureTime: string;
  departurePoint: string;
  category: "cruise" | "private" | "event" | "tour";
}

export const tours: Tour[] = [
  {
    id: "1",
    slug: "sunset-cruise",
    name: "Boğaz Gün Batımı Turu",
    nameEn: "Bosphorus Sunset Cruise",
    description:
      "İstanbul Boğazı'nda büyüleyici bir gün batımı deneyimi. Tarihi mekanları altın ışığında keşfedin.",
    descriptionEn:
      "Experience the magic of Istanbul as the sun sets over the Bosphorus. Sail past iconic landmarks bathed in golden light on this unforgettable evening cruise.",
    longDescription:
      "Watch the sunset paint the sky in shades of gold, amber, and crimson as you glide along the legendary Bosphorus Strait. This enchanting 2.5-hour cruise takes you on a journey through centuries of history, where Ottoman palaces stand alongside medieval fortresses and iconic suspension bridges connect two continents. Your professional crew will guide you past the ethereal Maiden's Tower rising from the waters, the ornate Dolmabahçe Palace with its European grandeur, the charming Ortaköy Mosque framed perfectly against the Bosphorus Bridge, and the imposing Rumeli Fortress built by Sultan Mehmed the Conqueror. As daylight fades, the city transforms into a glittering tapestry of lights reflected on the water — a sight that has captivated travelers for millennia. Perfect for couples seeking romance, families creating memories, and photographers chasing the golden hour. Enjoy welcome drinks and snacks as the gentle breeze carries the sounds of the city across the water.",
    duration: "2.5 hours",
    capacity: "Max 40 guests",
    priceEur: 20,
    originalPriceEur: 40,
    priceTry: 1400,
    includes: [
      "Welcome drinks",
      "Live commentary",
      "Open bar (soft drinks)",
      "Snack platter",
      "WiFi",
    ],
    notIncluded: ["Alcoholic beverages", "Hotel transfer"],
    highlights: [
      "Maiden's Tower",
      "Dolmabahçe Palace",
      "Ortaköy Mosque",
      "Rumeli Fortress",
      "Bosphorus Bridge",
    ],
    badge: "Winter Special",
    badgeColor: "bg-secondary text-white",
    image:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80",
      "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    ],
    route:
      "Eminönü → Maiden's Tower → Dolmabahçe → Ortaköy → Rumeli Fortress → Return",
    departureTime: "17:00 / 18:00 (seasonal)",
    departurePoint: "Eminönü Pier",
    category: "cruise",
  },
  {
    id: "2",
    slug: "dinner-cruise",
    name: "Boğaz Yemekli Tur & Türk Gecesi",
    nameEn: "Bosphorus Dinner Cruise & Turkish Night",
    description:
      "Otantik Türk mutfağı, canlı müzik ve geleneksel gösterilerle unutulmaz bir Boğaz gecesi.",
    descriptionEn:
      "An unforgettable evening on the Bosphorus featuring a 4-course Turkish dinner, live entertainment, belly dancing, and whirling dervish performances against the illuminated Istanbul skyline.",
    longDescription:
      "Step aboard for the ultimate Istanbul evening experience — a spectacular 3.5-hour dinner cruise that combines world-class Turkish cuisine with mesmerizing traditional entertainment. As your vessel glides along the illuminated Bosphorus, you'll be treated to a sumptuous 4-course dinner featuring the finest flavors of Turkish gastronomy, from savory mezes to succulent kebabs and decadent baklava. The night comes alive with a dazzling Turkish Night show: watch in awe as belly dancers perform their hypnotic routines, witness the spiritual beauty of the Whirling Dervish ceremony, and feel the energy of traditional Turkish folk dances from across Anatolia. Between performances, a live DJ keeps the atmosphere electric while the illuminated silhouettes of mosques, palaces, and bridges create a magical backdrop. With hotel pickup and drop-off included, unlimited local drinks flowing, and the city's most iconic landmarks glittering around you, this is the dinner party that only Istanbul can host.",
    duration: "3.5 hours",
    capacity: "Max 150 guests",
    priceEur: 65,
    priceTry: 2600,
    includes: [
      "Hotel pickup & drop-off",
      "4-course Turkish dinner",
      "Unlimited local drinks",
      "Live music & DJ",
      "Belly dance show",
      "Whirling dervish performance",
      "Turkish folk show",
    ],
    notIncluded: ["Premium imported drinks", "Photo/video service"],
    highlights: [
      "Turkish Night entertainment",
      "Live belly dancing",
      "Whirling dervish ceremony",
      "Illuminated Bosphorus views",
      "4-course dinner",
    ],
    badge: "Best Seller",
    badgeColor: "bg-primary text-secondary",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    ],
    route: "Eminönü → Full Bosphorus Tour → Return",
    departureTime: "19:30",
    departurePoint: "Eminönü Pier",
    category: "cruise",
  },
  {
    id: "3",
    slug: "private-yacht",
    name: "İstanbul Özel Yat Kiralama",
    nameEn: "Private Yacht Charter in Istanbul",
    description:
      "Tamamen özel yat deneyimi. Esnek rota, profesyonel ekip ve lüks hizmet.",
    descriptionEn:
      "Your own private yacht on the Bosphorus. Enjoy a fully customizable experience with professional crew, champagne, and the freedom to explore Istanbul's waterways at your own pace.",
    longDescription:
      "Elevate your Istanbul experience with a private yacht charter that puts you in command of your own Bosphorus adventure. From the moment you step aboard at Kuruçeşme Marina, your dedicated captain and crew ensure every detail is perfect. Sip welcome champagne as you chart your course along the world's most famous strait, stopping wherever catches your eye — perhaps a swimming break in the crystal-clear waters near the Black Sea entrance, or a photo stop beneath the towering pillars of the Fatih Sultan Mehmet Bridge. The yacht comes equipped with a premium Bluetooth sound system so you can set the soundtrack to your journey, while a fresh fruit platter keeps everyone refreshed. Choose from three carefully curated packages: Essential (€280) for an intimate 3-hour cruise, Premium (€450) adding gourmet catering and water toys, or VIP (€650) for the ultimate all-inclusive luxury experience with a private chef on board. Whether it's a romantic escape, a family celebration, or an exclusive gathering with friends, this is Istanbul as it was meant to be experienced — on your own terms, surrounded by breathtaking beauty.",
    duration: "3 hours (extendable)",
    capacity: "Max 15 guests",
    priceEur: 280,
    priceTry: 11200,
    includes: [
      "Private yacht & crew",
      "Welcome champagne",
      "Fresh fruit platter",
      "Bluetooth sound system",
      "Professional captain",
      "Swimming stop",
    ],
    highlights: [
      "Fully private experience",
      "Flexible itinerary",
      "Swimming in Bosphorus",
      "Sunset views",
      "Professional crew",
    ],
    badge: "Premium",
    badgeColor: "bg-secondary text-heading",
    image:
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    ],
    route: "Custom route based on preference",
    departureTime: "Flexible",
    departurePoint: "Kuruçeşme Marina",
    category: "private",
  },
  {
    id: "4",
    slug: "bosphorus-sightseeing",
    name: "Boğaz Kısa Tur",
    nameEn: "Bosphorus Short Cruise",
    description:
      "Kısa sürede Boğaz'ın en güzel noktalarını keşfedin. 12 dilde sesli rehber dahil.",
    descriptionEn:
      "A quick and affordable way to see the Bosphorus highlights. Enjoy audio guides in 12 languages as you cruise past Istanbul's most iconic waterfront landmarks.",
    longDescription:
      "Perfect for travelers with limited time or those looking for an affordable introduction to the Bosphorus, this 1.5-hour sightseeing cruise packs all the essential highlights into a compact journey. Depart from the historic Eminönü Pier and immediately be greeted by the stunning panorama of Istanbul's layered skyline — minarets, domes, and modern towers rising together in perfect harmony. Your audio guide, available in 12 languages, brings each landmark to life with fascinating historical commentary as you pass the mysterious Maiden's Tower standing sentinel in the strait, the magnificent Dolmabahçe Palace stretching along the European shore, and the picturesque Ortaköy Mosque with its baroque-inspired architecture. The cruise offers multiple departure times throughout the day, making it easy to fit into any itinerary. Complimentary soft drinks and WiFi keep you comfortable, while the open deck provides the best vantage points for photography. This is the most popular and budget-friendly way to experience the magic of the Bosphorus.",
    duration: "1.5 hours",
    capacity: "Max 50 guests",
    priceEur: 15,
    priceTry: 600,
    includes: [
      "Audio guide (12 languages)",
      "Soft drinks",
      "WiFi",
      "Photo spots",
    ],
    highlights: [
      "Maiden's Tower",
      "Dolmabahçe Palace",
      "Ortaköy Mosque",
      "Continental views",
      "Affordable sightseeing",
    ],
    badge: "Budget Friendly",
    badgeColor: "bg-green-500 text-white",
    image:
      "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&q=80",
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80",
      "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800&q=80",
    ],
    route: "Eminönü → Maiden's Tower → Dolmabahçe → Ortaköy → Return",
    departureTime: "10:00 / 14:00 / 16:00",
    departurePoint: "Eminönü Pier",
    category: "cruise",
  },
  {
    id: "5",
    slug: "proposal-cruise",
    name: "Romantik Evlilik Teklifi Turu",
    nameEn: "Romantic Marriage Proposal Cruise",
    description:
      "Hayatınızın en özel anı için mükemmel bir sahne. Gül yaprakları, mumlar ve profesyonel fotoğrafçı.",
    descriptionEn:
      "Create the most magical proposal moment against the backdrop of the Bosphorus sunset. Complete with rose petals, candles, a custom cake, professional photographer, and live music.",
    longDescription:
      "Make your love story legendary with a marriage proposal set against the most romantic backdrop imaginable — the Bosphorus at sunset. Every detail of this intimate 2-hour cruise is meticulously designed to create a moment you'll both treasure forever. As you board your privately decorated vessel, your partner will be greeted by a pathway of rose petals leading to a candlelit setting with panoramic views of the strait. The boat gently circles the iconic Maiden's Tower — steeped in its own legendary love story — as the sky transforms into a canvas of warm colors. A professional photographer discreetly captures every emotion, from the nervous anticipation to the joyful tears, ensuring you'll have stunning images to share with family and friends. The moment is accompanied by the soulful melodies of a live violinist or saxophonist, while champagne awaits to toast your new chapter. A custom-designed cake adds the perfect sweet touch to the celebration. Our experienced event team handles every detail behind the scenes, so all you need to focus on is the question — and savoring the 'yes.'",
    duration: "2 hours",
    capacity: "2-6 guests",
    priceEur: 350,
    priceTry: 14000,
    includes: [
      "Romantic decoration",
      "Rose petals & candles",
      "Custom cake",
      "Professional photographer",
      "Champagne",
      "Live violin or saxophonist",
    ],
    highlights: [
      "Maiden's Tower backdrop",
      "Professional photography",
      "Live music",
      "Romantic decoration",
      "Sunset timing",
      "Completely private",
    ],
    badge: "Romantic",
    badgeColor: "bg-red-500 text-white",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    ],
    route: "Special romantic route (around Maiden's Tower)",
    departureTime: "Timed with sunset",
    departurePoint: "Kuruçeşme Marina",
    category: "private",
  },
  {
    id: "6",
    slug: "birthday-yacht",
    name: "Yat Doğum Günü Partisi İstanbul",
    nameEn: "Yacht Birthday Party Istanbul",
    description:
      "Boğaz'da unutulmaz bir doğum günü partisi. DJ, pasta ve parti dekorasyonu dahil.",
    descriptionEn:
      "Celebrate your birthday in style aboard a private yacht on the Bosphorus. Complete with DJ, custom cake, party decorations, and LED lighting for an unforgettable night.",
    longDescription:
      "Why settle for an ordinary birthday when you can celebrate on the Bosphorus? This 4-hour yacht birthday party experience transforms a luxury vessel into your own floating nightclub, complete with professional DJ, custom LED lighting that pulses to the beat, and Instagram-worthy party decorations tailored to your theme. From the moment your guests step aboard, they'll know this is no ordinary celebration. The custom birthday cake — designed to your specifications — takes center stage, while unlimited soft drinks keep the party fueled all night long. As the yacht cruises past Istanbul's illuminated skyline, the open deck becomes a dance floor under the stars, with the city's most famous landmarks providing a spectacular backdrop. The DJ reads the room and keeps the energy high, transitioning from chill sunset vibes to full-on party mode as the night progresses. Whether you're turning 18 or 80, this is the birthday celebration that Istanbul dreams are made of. Upgrade options include premium catering packages, alcoholic beverage service, and extended cruise duration.",
    duration: "4 hours",
    capacity: "Max 25 guests",
    priceEur: 400,
    priceTry: 16000,
    includes: [
      "Party decorations",
      "Custom cake",
      "DJ & sound system",
      "Unlimited soft drinks",
      "LED lighting setup",
    ],
    highlights: [
      "Private yacht party",
      "Professional DJ",
      "Custom cake & decorations",
      "LED light show",
      "Bosphorus night views",
      "Dance floor on deck",
    ],
    badge: "Party",
    badgeColor: "bg-purple-500 text-white",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    ],
    route: "Kuruçeşme → Bosphorus Night Tour → Return",
    departureTime: "20:00",
    departurePoint: "Kuruçeşme Marina",
    category: "event",
  },
  {
    id: "7",
    slug: "corporate-cruise",
    name: "Kurumsal Etkinlik Boğaz Turu",
    nameEn: "Corporate Event Bosphorus Cruise",
    description:
      "Kurumsal etkinlikleriniz için profesyonel bir Boğaz deneyimi. Tam donanımlı A/V ekipmanı.",
    descriptionEn:
      "Host your corporate event, team building, or product launch on the Bosphorus. Professional event coordination, A/V equipment, catering, and branding options included.",
    longDescription:
      "Transform your next corporate event into an extraordinary experience that your team and clients will talk about for years. Our Corporate Event Bosphorus Cruise provides a unique venue that combines the prestige of Istanbul's iconic waterway with professional-grade event infrastructure. A dedicated event coordinator works with you from the planning stage to ensure every detail aligns with your vision — whether it's a team-building cruise, product launch, investor dinner, or annual celebration. The vessel comes equipped with state-of-the-art A/V equipment including projector, screen, wireless microphone system, and high-speed WiFi, making presentations and speeches seamless. Professional catering service offers customizable menus ranging from cocktail receptions to formal sit-down dinners, all prepared with the finest local ingredients. Branding options include custom banners, table settings, and digital displays, ensuring your corporate identity is front and center. The 4-hour cruise accommodates up to 50 guests in comfort, with both indoor and outdoor spaces adaptable to any format. Let the Bosphorus be the backdrop to your next big moment.",
    duration: "4 hours",
    capacity: "Max 50 guests",
    priceEur: 500,
    priceTry: 20000,
    includes: [
      "Event coordinator",
      "A/V equipment",
      "Catering service",
      "Branding options",
      "Custom program",
    ],
    highlights: [
      "Professional event management",
      "Full A/V setup",
      "Custom catering menus",
      "Corporate branding",
      "Networking atmosphere",
      "Unique venue",
    ],
    badge: "Corporate",
    badgeColor: "bg-primary text-white",
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    ],
    route: "Custom corporate route",
    departureTime: "Flexible",
    departurePoint: "Eminönü Pier / Kuruçeşme Marina",
    category: "event",
  },
  {
    id: "8",
    slug: "princes-islands",
    name: "İstanbul Prens Adaları Turu",
    nameEn: "Istanbul Princes' Islands Tour",
    description:
      "Büyükada ve Heybeliada'yı keşfedin. Bisiklet turu, öğle yemeği ve profesyonel rehber dahil.",
    descriptionEn:
      "Escape the city bustle with a full-day tour to the enchanting Princes' Islands. Explore Büyükada and Heybeliada with cycling, a delicious lunch, and professional guide.",
    longDescription:
      "Leave the urban energy of Istanbul behind and sail to the tranquil Princes' Islands — a car-free archipelago in the Sea of Marmara that feels like stepping back in time. This comprehensive 6-hour tour begins with a scenic ferry ride from Kabataş, offering sweeping views of the Istanbul skyline as it gradually gives way to the serene blue waters of the Marmara. Your first stop is Büyükada, the largest and most popular of the nine islands, where elegant Victorian-era wooden mansions line pine-shaded streets and horse-drawn carriages (now electric vehicles) provide a charming mode of transport. Hop on a bicycle for a guided cycling tour around the island, discovering hidden monasteries, panoramic hilltop viewpoints, and quiet beaches. After working up an appetite, enjoy a traditional Turkish lunch at a seaside restaurant featuring fresh seafood and island specialties. The adventure continues with a visit to Heybeliada, known for its naval academy and lush green landscapes. Your professional guide shares fascinating stories of the islands' history — from Byzantine exile destinations to Ottoman-era retreats for Istanbul's elite. All entrance fees are included, ensuring a seamless and enriching day away from the city.",
    duration: "6 hours",
    capacity: "Max 40 guests",
    priceEur: 60,
    priceTry: 2400,
    includes: [
      "Ferry ride",
      "Island cycling tour",
      "Lunch",
      "Professional guide",
      "Entrance fees",
    ],
    highlights: [
      "Büyükada exploration",
      "Heybeliada visit",
      "Island cycling",
      "Seaside lunch",
      "Car-free island experience",
      "Historical mansions",
    ],
    badge: "Full Day",
    badgeColor: "bg-primary-hover text-white",
    image:
      "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800&q=80",
      "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&q=80",
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80",
    ],
    route: "Kabataş → Büyükada → Heybeliada → Return",
    departureTime: "09:00",
    departurePoint: "Kabataş Pier",
    category: "tour",
  },
];

export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find((tour) => tour.slug === slug);
}

export function getToursByCategory(category: Tour["category"]): Tour[] {
  return tours.filter((tour) => tour.category === category);
}
