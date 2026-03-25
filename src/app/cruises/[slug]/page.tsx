import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { tours, getTourBySlug } from "@/data/tours";
import TourDetailClient from "@/components/tours/TourDetailClient";

const SITE_URL = "https://merrysails.com";

/* Keyword mapping from CSV research (volume/KD) for each tour slug */
const tourKeywords: Record<string, string[]> = {
  "bosphorus-sunset-cruise": [
    "bosphorus sunset cruise", "sunset cruise istanbul", "sunset cruise",
    "bosphorus sunset", "istanbul bosphorus sunset cruise", "boat trip istanbul",
  ],
  "bosphorus-dinner-cruise": [
    "istanbul dinner cruise", "bosphorus dinner cruise", "dinner cruise istanbul",
    "bosphorus night cruise with dinner", "bosphorus night cruise", "best dinner cruise istanbul",
    "istanbul night cruise", "bosphorus cruise dinner menu", "dinner on the bosphorus",
  ],
  "yacht-charter-in-istanbul": [
    "yacht rental istanbul", "yacht charter istanbul", "yacht charter istanbul turkey",
    "bosphorus yacht cruise", "bosphorus yacht tour", "private bosphorus cruise",
    "yacht istanbul", "bosphorus yacht", "boat rental istanbul",
  ],
  "bosphorus-sightseeing-cruise": [
    "short bosphorus cruise", "bosphorus day cruise istanbul", "bosphorus boat tour",
    "bosphorus sightseeing cruise", "bosphorus cruise tour", "bosphorus boat ride istanbul",
  ],
  "istanbul-princes-island-tour": [
    "princess island tour", "istanbul prince islands ferry", "princess island turkey tour",
    "princes island boat tour istanbul",
  ],
  "istanbul-bosphorus-lunch-cruise": [
    "bosphorus boat tour", "boat cruise istanbul", "bosphorus river cruise",
    "istanbul cruise tour", "cruise in istanbul",
  ],
  "private-bosphorus-sunset-cruise": [
    "private bosphorus cruise", "bosphorus sunset cruise on luxury yacht",
    "yacht rental istanbul", "private yacht charter",
  ],
  "corporate-event-bosphorus-cruise": [
    "party boat istanbul", "corporate event yacht istanbul", "boat trip istanbul",
  ],
  "romantic-marriage-proposal": [
    "marriage proposal yacht istanbul", "private yacht istanbul", "yacht charter bosphorus",
  ],
  "yacht-birthday-party": [
    "istanbul birthday", "party boat istanbul", "yacht birthday party istanbul",
  ],
  "private-bosphorus-dinner-yacht-cruise": [
    "private dinner cruise istanbul", "bosphorus dinner yacht", "private yacht dinner bosphorus",
    "luxury dinner cruise istanbul", "romantic dinner yacht istanbul",
  ],
  "private-bosphorus-lunch-yacht-cruise": [
    "private lunch cruise istanbul", "bosphorus lunch yacht", "private yacht lunch bosphorus",
    "luxury lunch cruise istanbul",
  ],
  "bosphorus-sightseeing-yacht-cruise": [
    "bosphorus sightseeing yacht", "private sightseeing cruise istanbul",
    "bosphorus yacht sightseeing tour", "luxury bosphorus cruise",
  ],
  "yacht-weddings": [
    "yacht wedding istanbul", "wedding on yacht bosphorus", "wedding cruise istanbul",
    "luxury wedding yacht turkey", "bosphorus wedding venue",
  ],
  "wedding-anniversary": [
    "anniversary yacht istanbul", "wedding anniversary cruise bosphorus",
    "anniversary celebration yacht", "romantic anniversary istanbul",
  ],
  "bachelorette-yacht-party": [
    "bachelorette party istanbul", "bachelorette yacht istanbul", "hen party yacht bosphorus",
    "bachelorette cruise istanbul",
  ],
  "private-yacht-swimming-tour": [
    "swimming yacht istanbul", "private swimming tour bosphorus", "yacht swimming istanbul",
    "bosphorus swimming cruise", "istanbul boat swimming",
  ],
  "full-day-istanbul-old-city-tour": [
    "istanbul old city tour", "istanbul walking tour", "full day istanbul tour",
    "sultanahmet tour", "istanbul sightseeing tour",
  ],
  "istanbul-lunch-cruise": [
    "istanbul lunch cruise", "lunch cruise bosphorus", "bosphorus lunch tour",
    "istanbul boat lunch", "midday cruise istanbul",
  ],
  "bosphorus-cruise-for-cruise-passengers": [
    "istanbul cruise port tour", "bosphorus cruise for cruise passengers",
    "istanbul cruise ship excursion", "istanbul port bosphorus tour",
  ],
  "new-years-eve-party-cruise": [
    "new years eve istanbul cruise", "nye bosphorus cruise", "istanbul new year party boat",
    "new years eve dinner cruise istanbul", "istanbul nye celebration",
  ],
};

/* Unique FAQ data per tour for FAQPage JSON-LD structured data */
const tourFaqs: Record<string, { question: string; answer: string }[]> = {
  "bosphorus-sunset-cruise": [
    { question: "How long is the Bosphorus sunset cruise?", answer: "The Bosphorus sunset cruise lasts approximately 2.5 hours. Departure times are adjusted seasonally — 17:00 in winter and 18:00 in summer — to ensure you experience the sunset at its most spectacular moment over the strait." },
    { question: "What time does the sunset cruise depart?", answer: "The sunset cruise departs from Eminönü Pier at 17:00 during winter months and 18:00 during summer months. We recommend arriving 15 minutes before departure to board comfortably." },
    { question: "What is included in the Bosphorus sunset cruise?", answer: "The cruise includes welcome drinks, an open bar with soft drinks, a snack platter, live commentary about the landmarks, and free WiFi on board. Alcoholic beverages and hotel transfers are available as add-ons." },
    { question: "When is the best time of year for a sunset cruise in Istanbul?", answer: "The best time for a sunset cruise is from April to October, when the weather is warm and the sunsets are most dramatic. However, winter sunsets over the Bosphorus can be equally stunning with fewer crowds and special pricing from €20." },
    { question: "How much does the Bosphorus sunset cruise cost?", answer: "The Bosphorus sunset cruise starts from €20 per person (winter special, regular price €40). The price includes welcome drinks, soft drinks, snack platter, live commentary, and WiFi." },
  ],
  "bosphorus-dinner-cruise": [
    { question: "What is on the Bosphorus dinner cruise menu?", answer: "The dinner cruise features a 4-course Turkish dinner: traditional mezes (hummus, ezme, stuffed vine leaves), fresh seasonal salad, your choice of grilled lamb, chicken, or fish kebab, and classic baklava with Turkish tea. Unlimited local drinks (beer, wine, rakı, soft drinks) are included." },
    { question: "How long is the Istanbul dinner cruise?", answer: "The Bosphorus dinner cruise lasts approximately 3.5 hours, departing at 19:30 from Eminönü Pier. This gives you plenty of time to enjoy the full dinner, entertainment shows, and illuminated Bosphorus views." },
    { question: "Is there a dress code for the dinner cruise?", answer: "There is no strict dress code, but smart casual attire is recommended. Most guests dress comfortably yet presentably. Flat, non-slip shoes are advisable for walking on deck." },
    { question: "How much does the Istanbul dinner cruise cost?", answer: "The Standard package starts at €65 per person and includes hotel pickup and drop-off, 4-course dinner, unlimited local drinks, and all entertainment. The Gold package at €95 offers reserved panoramic seating and a premium menu with imported spirits." },
    { question: "Is hotel pickup included in the dinner cruise?", answer: "Yes, complimentary hotel pickup and drop-off is included in both the Standard (€65) and Gold (€95) packages. Pickup is available from major hotel areas including Sultanahmet, Taksim, and Beyoğlu." },
  ],
  "yacht-charter-in-istanbul": [
    { question: "How many guests can a private yacht hold in Istanbul?", answer: "Our yacht charter options accommodate up to 15 guests. We offer three packages: Essential (standard yacht), Premium (larger yacht), and VIP (high-end luxury yacht), all with professional captain and crew." },
    { question: "Can I customize the yacht cruise route?", answer: "Absolutely! One of the biggest advantages of a private yacht charter is complete route flexibility. Your captain will work with you to create a custom itinerary — whether you want to cruise past specific landmarks, stop for swimming, or focus on sunset views." },
    { question: "Is catering available on the yacht charter?", answer: "The VIP package (€680) includes a food plate. Additionally, you can add a 4-course meal for €35 per person, champagne for €50, or unlimited alcoholic drinks for €50–65 per person. Birthday cakes are also available from €35." },
    { question: "How much does yacht rental cost in Istanbul?", answer: "Yacht rental in Istanbul starts at €280 for the Essential package (2-hour private cruise with crew). The Premium package is €380 with a larger yacht and snacks, while the VIP package at €680 includes a luxury yacht with food and maximum deck space." },
    { question: "How far in advance should I book a yacht charter?", answer: "We recommend booking at least 48 hours in advance to secure your preferred date and yacht. For peak season (June–September) and weekends, booking 1–2 weeks ahead is advisable. Last-minute bookings are possible subject to availability." },
  ],
  "bosphorus-sightseeing-cruise": [
    { question: "How long is the short Bosphorus sightseeing cruise?", answer: "The Bosphorus short cruise lasts 1.5 hours, making it perfect for travelers with limited time. You'll see all the essential landmarks including Maiden's Tower, Dolmabahçe Palace, and Ortaköy Mosque." },
    { question: "What time does the sightseeing cruise depart?", answer: "The sightseeing cruise offers three daily departure times: 10:00, 14:00, and 16:00 from Eminönü Pier. This gives you flexibility to fit the cruise into your Istanbul itinerary." },
    { question: "Is there an audio guide on the sightseeing cruise?", answer: "Yes, the cruise includes a professional audio guide available in 12 languages. The commentary covers the history and significance of each landmark you pass, bringing centuries of Istanbul's heritage to life." },
    { question: "How much does the Bosphorus sightseeing cruise cost?", answer: "The Bosphorus short cruise costs just €15 per person, making it one of the most affordable ways to experience the Bosphorus. The price includes audio guide, soft drinks, WiFi, and designated photo spots." },
    { question: "What landmarks will I see on the Bosphorus cruise?", answer: "The cruise route passes Maiden's Tower, Dolmabahçe Palace, Ortaköy Mosque, and offers stunning views of both European and Asian continental shorelines. The 1.5-hour route covers the most photogenic section of the strait." },
  ],
  "istanbul-princes-island-tour": [
    { question: "How long is the Princes' Islands tour from Istanbul?", answer: "The Princes' Islands tour is a full-day experience lasting approximately 8 hours, including the scenic ferry rides to and from Büyükada. The tour departs at 09:00 from the meeting point in front of Cibali Tram Station." },
    { question: "What is included in the Princes' Islands tour?", answer: "The tour includes a traditional Turkish lunch at a seaside restaurant, guiding service, Bosphorus boat tickets, and a guided island tour of Büyükada. Tips, beverages, and personal expenses are not included." },
    { question: "Are there cars on the Princes' Islands?", answer: "No, the Princes' Islands are car-free, which is one of their biggest charms. Transportation on the islands is by bicycle, electric vehicle, or on foot. This creates a peaceful, traffic-free environment perfect for exploration." },
    { question: "How much does the Princes' Islands tour cost?", answer: "The Princes' Islands tour costs €45 per person and includes the ferry, guided tour, and lunch. It's one of the best full-day excursions from Istanbul, offering a complete escape from the city." },
    { question: "What will I see on Büyükada island?", answer: "On Büyükada, you'll explore elegant Victorian-era wooden mansions, hidden monasteries, panoramic hilltop viewpoints, and quiet beaches. The guided tour covers the island's historical highlights before you enjoy free time for relaxation and photography." },
  ],
  "istanbul-bosphorus-lunch-cruise": [
    { question: "How long is the Istanbul Bosphorus lunch cruise and two continents tour?", answer: "This comprehensive experience lasts approximately 7 hours, combining a Bosphorus cruise, Turkish lunch, and guided visits to both the European and Asian sides of Istanbul. It departs at 09:30 from Eminönü Pier." },
    { question: "What is included in the lunch cruise price?", answer: "The €55 per person price includes a scenic Bosphorus cruise, a traditional Turkish lunch at a seaside restaurant, professional guide service, and visits to both the European and Asian sides including Kadıköy and Moda neighborhoods." },
    { question: "Do you visit the Asian side of Istanbul?", answer: "Yes! This is one of the few cruises that crosses to the Asian side. After the Bosphorus cruise and lunch, you'll explore the colorful Kadıköy neighborhood and the vibrant Moda district, experiencing Istanbul's Asian character." },
    { question: "How much does the two continents tour cost?", answer: "The Istanbul Bosphorus Lunch Cruise and Two Continents Tour costs €55 per person. This includes the Bosphorus cruise, lunch, professional guide, and visits to both European and Asian Istanbul." },
    { question: "What is the best time to take this cruise?", answer: "This daytime tour departs at 09:30 and takes advantage of the best daylight hours for sightseeing and photography. It runs year-round, though spring (April–June) and autumn (September–November) offer the most comfortable weather." },
  ],
  "private-bosphorus-sunset-cruise": [
    { question: "What makes the private sunset cruise different from the regular sunset cruise?", answer: "The private sunset cruise gives you an entire yacht exclusively for your group (up to 15 guests), with a professional captain who charts the perfect route to catch the sunset. Unlike the shared cruise, you control the pace, music, and stops." },
    { question: "What is the best season for a private sunset cruise?", answer: "Private sunset cruises run year-round with departure times adjusted to match the sunset. Summer (June–August) offers the longest golden hours, while spring and autumn provide dramatic sky colors. Winter sunsets are brief but can be equally spectacular." },
    { question: "What photography tips do you have for the sunset cruise?", answer: "Arrive early to capture the golden hour light on landmarks. The best angles are near Maiden's Tower and under the Bosphorus Bridge. Bring a polarizing filter to reduce water glare. Our crew can suggest the best spots, and a professional photographer can be added for €190." },
    { question: "How much does a private Bosphorus sunset cruise cost?", answer: "The private sunset cruise starts at €280 for the Essential package (2-hour cruise). The Premium package (€380) includes a larger yacht and snacks, while VIP (€680) features a luxury yacht with food plate and spacious deck." },
    { question: "Can I add extras like a photographer or violinist?", answer: "Yes, popular add-ons include a professional photographer (€190), violinist (€180), unlimited alcoholic drinks (€50–65 per person), and extra hours (€125–300). These can be arranged at booking or up to 48 hours before departure." },
  ],
  "corporate-event-bosphorus-cruise": [
    { question: "How many guests can the corporate event cruise accommodate?", answer: "Our corporate event cruise accommodates up to 50 guests. For larger groups, we can arrange multiple vessels or a larger charter. Our event coordinator will work with you to find the perfect setup for your group size." },
    { question: "What corporate event packages are available?", answer: "We offer three packages: Essential (€280) with A/V equipment and basic amenities, Premium (€380) with a larger yacht and catering options, and VIP (€680) with a luxury yacht, full catering, dedicated event coordinator, and branding options." },
    { question: "Is A/V equipment available on the cruise?", answer: "Yes, all corporate packages include A/V equipment. The Essential package includes a projector and sound system, while Premium and VIP packages offer enhanced A/V with wireless microphones and high-speed WiFi for presentations and live streaming." },
    { question: "Can you arrange catering for corporate events?", answer: "Yes, catering is available as part of Premium and VIP packages or as an add-on to the Essential package. Options range from cocktail receptions and finger foods to full sit-down dinners. We can accommodate dietary requirements with advance notice." },
    { question: "How far in advance should we book a corporate event cruise?", answer: "We recommend booking corporate events at least 2–4 weeks in advance to allow time for coordination, custom branding, and catering arrangements. For large events (30+ guests) or peak season dates, 4–6 weeks is advisable." },
  ],
  "romantic-marriage-proposal": [
    { question: "How private is the marriage proposal yacht experience?", answer: "The experience is completely private — the yacht is exclusively yours with a maximum of 6 guests. Our discreet crew ensures your special moment is intimate and undisturbed, with the iconic Maiden's Tower and Bosphorus sunset as your backdrop." },
    { question: "What proposal decorations are included?", answer: "The Essential package (€280) includes table and yacht decoration with snacks and fruits. Premium (€380) adds rose petals and a champagne toast. VIP (€680) features full romantic decoration with a luxury yacht and spacious private deck. Additional decoration is available from €50–75." },
    { question: "Can I hire a photographer for the proposal?", answer: "Yes, a professional photographer can be added for €190. They will discreetly capture every moment of your proposal, including candid reactions and posed photos with the Bosphorus backdrop. Photo delivery is typically within 3–5 days." },
    { question: "What proposal packages are available?", answer: "Three packages are available: Essential (€280) with intimate yacht decoration and snacks, Premium (€380) with rose petals and champagne, and VIP (€680) with full luxury decoration. Add-ons include photographer, violinist, custom cake, and VIP car pickup." },
    { question: "When is the best time for a proposal cruise?", answer: "Most proposals are timed with sunset for the most romantic atmosphere, especially near the Maiden's Tower. The crew coordinates departure time with sunset schedules. Weekday evenings offer the calmest waters and quietest setting." },
  ],
  "yacht-birthday-party": [
    { question: "How many guests can attend a yacht birthday party?", answer: "Our yacht birthday party accommodates up to 25 guests. We offer Essential (€280), Premium (€380 with larger yacht and LED lighting), and VIP (€680 with luxury yacht and premium sound system) packages." },
    { question: "Can I bring my own cake or order one through you?", answer: "Both options are available! We offer custom birthday cakes — small for €35 and large for €60. Alternatively, you're welcome to bring your own cake on board at no extra charge." },
    { question: "Is a DJ included in the birthday party?", answer: "The yacht includes a Bluetooth sound system in all packages, so you can play your own music. A professional DJ can be added for €250. Other entertainment options include a belly dancer (€180–190) and professional photographer (€190)." },
    { question: "How much does a yacht birthday party cost in Istanbul?", answer: "Yacht birthday parties start at €280 for the Essential package (2-hour cruise with sound system). Premium is €380 with a larger yacht and LED lighting, and VIP is €680 with a luxury yacht, food plate, and premium sound." },
    { question: "Can the party be extended beyond 2 hours?", answer: "Yes, all birthday party packages can be extended. Extra hours cost between €125 and €300 depending on the yacht size. We also offer food add-ons like a 4-course meal at €35 per person and unlimited alcoholic drinks at €50–65 per person." },
  ],
  "yacht-weddings": [
    { question: "What wedding decoration options are available on the yacht?", answer: "Basic decoration is included in the Essential package (€680). Premium (€1,200) includes full decoration with flowers and elegant setup. VIP (€2,500) features premium decoration with custom themes, a wedding coordinator, and bespoke arrangements tailored to your vision." },
    { question: "How many guests can a yacht wedding accommodate?", answer: "Our yacht wedding service accommodates up to 50 guests. For intimate ceremonies, smaller yachts provide a cozy atmosphere, while the VIP luxury mega yacht is perfect for grand celebrations with full entertainment." },
    { question: "What wedding packages are available?", answer: "Three packages are available: Essential (€680, 4-hour cruise with basic decoration), Premium (€1,200 with full decoration, catering, DJ, and photographer), and VIP (€2,500 with a luxury mega yacht, premium catering, full entertainment, wedding coordinator, and video recording)." },
    { question: "Can we have live music at our yacht wedding?", answer: "Yes, the Premium package includes a DJ, and additional live music options can be arranged. Popular choices include a violinist, traditional Turkish musicians, or a live band. All entertainment is coordinated by our events team." },
    { question: "How much does a yacht wedding cost in Istanbul?", answer: "Yacht weddings start at €680 for the Essential package (4-hour cruise with decoration). Premium is €1,200 with catering and entertainment, and VIP is €2,500 for the complete luxury experience with coordinator and video recording." },
  ],
  "wedding-anniversary": [
    { question: "What anniversary decoration is included?", answer: "The Essential package (€280) includes anniversary-themed yacht decoration. Premium (€380) adds champagne toast and enhanced décor with snacks and fruits. VIP (€680) features full romantic decoration with a luxury yacht, gourmet dinner, and premium service." },
    { question: "How many guests can attend the anniversary cruise?", answer: "The wedding anniversary cruise accommodates 2 to 10 guests, making it perfect for an intimate celebration with your partner or a small gathering with close family and friends." },
    { question: "What anniversary packages are available?", answer: "We offer Essential (€280, 2-hour cruise with anniversary decoration), Premium (€380 with larger yacht, snacks, and champagne toast), and VIP (€680 with luxury yacht, gourmet dinner, full decoration, and premium service)." },
    { question: "Can we have live music for our anniversary?", answer: "Yes, a violinist can be added for €180 to create an intimate musical atmosphere. A DJ is also available for €250. Both pair beautifully with the romantic Bosphorus setting." },
    { question: "How much does a wedding anniversary cruise cost?", answer: "Anniversary cruises start at €280 for the Essential package. The Premium package is €380 with champagne and enhanced comfort, while VIP at €680 includes a gourmet dinner and luxury yacht for the ultimate celebration." },
  ],
  "bachelorette-yacht-party": [
    { question: "How many guests can attend a bachelorette yacht party?", answer: "The bachelorette yacht party accommodates up to 20 guests. Choose from Essential (€280), Premium (€380 with bachelorette decorations and larger yacht), or VIP (€680 with luxury yacht and full themed decoration)." },
    { question: "Are bachelorette decorations included?", answer: "The Premium package (€380) includes bachelorette-themed decorations. The VIP package (€680) features a full decoration theme with custom touches. Custom decorations beyond the package can also be arranged as an add-on." },
    { question: "Can we have music and a DJ on board?", answer: "All packages include a Bluetooth sound system for your own playlists. A professional DJ can be added for €250 to keep the party energy high as you cruise past Istanbul's skyline." },
    { question: "How much does a bachelorette yacht party cost?", answer: "Bachelorette parties start at €280 for the Essential package (2-hour cruise with sound system). Premium is €380 with bachelorette decorations and snacks, and VIP is €680 with a luxury yacht and full themed decoration." },
    { question: "What food and drink options are available?", answer: "Tea, coffee, and water are included in all packages. You can add unlimited alcoholic drinks (€50–65 per person), a 4-course meal (€35 per person), or snack platters. The VIP package includes a food plate. Custom catering requests are welcome." },
  ],
  "private-bosphorus-dinner-yacht-cruise": [
    { question: "What is served on the private dinner yacht cruise?", answer: "A carefully prepared 4-course Turkish dinner is served on deck: traditional mezes, fresh seafood, grilled specialties, and traditional desserts — all made with locally sourced ingredients. The Premium package adds wine pairing, and VIP includes a personal chef." },
    { question: "How long is the private dinner cruise?", answer: "The private dinner yacht cruise lasts 3 hours, departing at 19:00 or 20:00 from Kuruçeşme Marina. This allows ample time for a relaxed multi-course dinner while cruising the illuminated Bosphorus." },
    { question: "How many guests can join the private dinner cruise?", answer: "The private dinner yacht cruise accommodates up to 12 guests, ensuring an intimate and exclusive dining experience on the water with personalized service from the crew." },
    { question: "How much does a private dinner cruise cost?", answer: "The Essential package starts at €380 for a 3-hour private cruise with 4-course dinner. Premium (€550) adds wine pairing and expanded dessert selection. VIP (€850) features a luxury yacht with premium spirits and personal chef." },
    { question: "Is the dinner cruise suitable for special occasions?", answer: "Absolutely! The private dinner cruise is ideal for anniversaries, proposals, birthdays, and intimate celebrations. Candlelit setup is included, and the illuminated Bosphorus skyline provides a magical backdrop for any special occasion." },
  ],
  "private-bosphorus-lunch-yacht-cruise": [
    { question: "What is included in the private lunch yacht cruise?", answer: "All packages include a private yacht with professional crew, Turkish lunch served on board, and tea, coffee, and water. Premium (€380) adds an expanded menu with fruits, and VIP (€680) features a gourmet menu with premium beverages." },
    { question: "How long is the private lunch cruise?", answer: "The private lunch yacht cruise is a 2-hour experience departing at 12:00 from Kuruçeşme Marina. The midday timing offers the best daylight for sightseeing and photography along the Bosphorus." },
    { question: "Is the lunch cruise suitable for families?", answer: "Yes, the private lunch cruise is very family-friendly. The daytime schedule, calm waters, and spacious deck make it comfortable for guests of all ages. A swimming stop can be included in your route." },
    { question: "How much does the private lunch yacht cruise cost?", answer: "The lunch yacht cruise starts at €280 for the Essential package. Premium is €380 with a larger yacht and expanded menu, and VIP is €680 featuring a luxury yacht with gourmet menu and premium beverages." },
    { question: "Can I combine the lunch cruise with swimming?", answer: "Yes! Your captain can include a swimming stop in the itinerary, typically at calm coves in the upper Bosphorus. The yacht is equipped with a swimming ladder for easy water access. Just let us know when booking." },
  ],
  "bosphorus-sightseeing-yacht-cruise": [
    { question: "What landmarks will I see on the private sightseeing yacht cruise?", answer: "You'll see all the Bosphorus highlights including Dolmabahçe Palace, Maiden's Tower, Ortaköy Mosque, Rumeli Fortress, Bosphorus Bridge, and charming fishing villages. Your captain can customize stops based on your interests." },
    { question: "How is this different from the shared sightseeing cruise?", answer: "Unlike the shared cruise, the private sightseeing yacht gives you complete freedom — your own yacht, flexible stops, custom pace, and the ability to linger at landmarks or detour to hidden spots that larger boats cannot access." },
    { question: "How many guests can join the private sightseeing cruise?", answer: "The private sightseeing yacht accommodates up to 15 guests. All packages include tea, coffee, water, and a professional crew who knows every landmark and hidden gem along the Bosphorus." },
    { question: "How much does a private sightseeing yacht cruise cost?", answer: "The Essential package starts at €280 for a 2-hour private cruise covering all landmarks. Premium (€380) offers a larger yacht with snacks, and VIP (€680) features a luxury yacht with food plate and premium service." },
    { question: "When is the best time for a sightseeing yacht cruise?", answer: "Daytime cruises offer the best visibility for landmarks and photography, especially in the morning. However, you can choose any departure time. Late afternoon combines sightseeing with golden hour light for stunning photos." },
  ],
  "private-yacht-swimming-tour": [
    { question: "What is the swimming tour route on the Bosphorus?", answer: "The yacht heads to the upper Bosphorus near the Black Sea entrance, where waters are calmer and crystal clear. Your captain knows the best swimming spots — secluded coves, calm bays, and scenic stretches ideal for swimming." },
    { question: "What safety measures are in place for swimming?", answer: "All yachts are equipped with swimming ladders, life jackets, and safety equipment. Your professional crew monitors conditions and selects the safest spots with calm currents. Life rings and first aid kits are always on board." },
    { question: "What should I bring on the swimming tour?", answer: "Bring swimwear, a towel, sunscreen, and sunglasses. Water shoes are recommended for rocky areas. The yacht provides tea, coffee, water, and snacks. Premium and VIP packages include additional amenities like water toys and BBQ." },
    { question: "When is the swimming season on the Bosphorus?", answer: "The swimming season runs from June through September, when water temperatures range from 20°C to 25°C. July and August offer the warmest water. Tours depart at 10:00 or 14:00 from Kuruçeşme Marina." },
    { question: "How much does the private yacht swimming tour cost?", answer: "The swimming tour starts at €280 for the Essential 3-hour package with swimming stops and crew. Premium (€380) adds water toys and snacks. VIP (€680) includes a luxury yacht with BBQ on board and full water sports equipment." },
  ],
  "full-day-istanbul-old-city-tour": [
    { question: "What historical sites are included in the old city tour?", answer: "The tour covers Istanbul's most iconic sites: Hagia Sophia, Blue Mosque (Sultan Ahmed Mosque), Topkapi Palace, the Grand Bazaar, and the ancient Hippodrome. A professional guide provides detailed historical commentary at each location." },
    { question: "Are entrance fees included in the tour price?", answer: "Yes, all entrance fees to historical sites are included in the €60 per person price, along with a professional guide, lunch, and hotel pickup. Tips, beverages, and personal expenses are not included." },
    { question: "How long is the full-day old city tour?", answer: "The tour lasts approximately 8 hours, departing at 09:00 with hotel pickup. This allows thorough exploration of each site without rushing, plus a lunch break at a traditional restaurant." },
    { question: "Is hotel pickup included?", answer: "Yes, hotel pickup and return is included in the tour price. Pickup is available from major hotel areas in Istanbul. Your guide will confirm the exact pickup time the evening before." },
    { question: "How much does the Istanbul old city tour cost?", answer: "The full-day Istanbul Old City Tour costs €60 per person, which includes a professional guide, all entrance fees, lunch, and hotel pickup and drop-off." },
  ],
  "istanbul-lunch-cruise": [
    { question: "What is included in the Istanbul lunch cruise?", answer: "The €35 per person price includes a freshly prepared Turkish lunch on board, soft drinks, a Bosphorus sightseeing cruise, and an audio guide. Alcoholic beverages are available for purchase separately." },
    { question: "How long is the Istanbul lunch cruise?", answer: "The lunch cruise lasts 2 hours, departing at 12:30 from Eminönü Pier. It's the perfect midday break combining sightseeing with a delicious Turkish meal on the water." },
    { question: "What food is served on the lunch cruise?", answer: "A freshly prepared Turkish lunch is served on board, featuring traditional dishes made with local ingredients. The menu typically includes mezes, a main course, and dessert, giving you an authentic taste of Turkish cuisine." },
    { question: "How much does the Istanbul lunch cruise cost?", answer: "The Istanbul lunch cruise costs €35 per person, including the Turkish lunch, soft drinks, Bosphorus cruise, and audio guide. It's an affordable way to combine dining and sightseeing." },
    { question: "Is the lunch cruise suitable for families?", answer: "Yes, the lunch cruise is very family-friendly with a relaxed daytime atmosphere. Children aged 0–5 ride free, and ages 6–12 receive a 50% discount. The 2-hour duration is comfortable for guests of all ages." },
  ],
  "bosphorus-cruise-for-cruise-passengers": [
    { question: "Will I get back to my cruise ship on time?", answer: "Absolutely. Our tour is specifically designed for cruise ship passengers with a guaranteed return well before your ship's departure. We coordinate with port schedules and build in a comfortable time buffer." },
    { question: "Do you pick up from the cruise port?", answer: "Yes, our team picks you up directly from Istanbul's cruise port and returns you to the same location. Port pickup and return is included in the €50 per person price." },
    { question: "How long is the Bosphorus tour for cruise passengers?", answer: "The tour lasts approximately 4 hours, giving you a comprehensive Bosphorus experience including all major landmarks while ensuring timely return to your ship." },
    { question: "How much does the cruise passenger tour cost?", answer: "The tour costs €50 per person and includes port pickup and return, Bosphorus cruise, professional guide, and soft drinks. It's designed to maximize your Istanbul port day experience." },
    { question: "What if my cruise ship arrives late?", answer: "We monitor ship arrivals and adjust pickup times accordingly. If your ship is significantly delayed, we'll modify the tour itinerary to ensure you still see the key highlights while making it back before departure. Contact us via WhatsApp for real-time coordination." },
  ],
  "new-years-eve-party-cruise": [
    { question: "What is included in the New Year's Eve cruise?", answer: "The €120 per person price includes a gala dinner, unlimited drinks (alcoholic and non-alcoholic), live entertainment with DJ, party favors, and front-row views of Istanbul's midnight fireworks over the Bosphorus." },
    { question: "How long is the New Year's Eve cruise?", answer: "The New Year's Eve party cruise lasts approximately 5 hours, departing at 20:00 from Eminönü Pier. You'll ring in the New Year on the water with the midnight fireworks display as the centerpiece." },
    { question: "How many guests can the NYE cruise accommodate?", answer: "The New Year's Eve party cruise accommodates up to 200 guests, creating a vibrant and festive atmosphere with live entertainment and dancing on the Bosphorus." },
    { question: "How much does the New Year's Eve cruise cost?", answer: "The New Year's Eve party cruise costs €120 per person, including gala dinner, unlimited drinks, live entertainment, DJ, and party favors. It's Istanbul's most spectacular way to welcome the New Year." },
    { question: "How early should I book the New Year's Eve cruise?", answer: "The NYE cruise sells out quickly — we recommend booking at least 4–6 weeks in advance. Early booking also helps secure preferred seating positions for the best fireworks views." },
  ],
};

export function generateStaticParams() {
  return tours.map((tour) => ({ slug: tour.slug }));
}

/* CTR-optimised title/description overrides for pages with impressions but zero clicks */
const metaOverrides: Record<string, { title: string; description: string }> = {
  "bosphorus-sightseeing-cruise": {
    title: "Bosphorus Sightseeing Cruise Istanbul 2026 — €15 | Book Online",
    description: "Book a short Bosphorus cruise in Istanbul for just €15. 1.5-hour sightseeing tour past palaces, mosques & both bridges. 4.9 rating. Audio guide in 12 languages. Best price guarantee — book online.",
  },
  "bosphorus-sunset-cruise": {
    title: "Bosphorus Sunset Cruise Istanbul 2026 — €20 | Book Online",
    description: "Book the best Bosphorus sunset cruise in Istanbul for €20. 2.5-hour golden hour experience with drinks & snacks. 4.9 rating from 800+ reviews. Free cancellation — book online today.",
  },
  "wedding-anniversary": {
    title: "Anniversary Yacht Cruise Istanbul 2026 — From €280 | Book Online",
    description: "Celebrate your anniversary on a private yacht in Istanbul. Romantic Bosphorus cruise with decoration & sunset views. 4.9 rating. Best price guarantee — book online.",
  },
  "romantic-marriage-proposal": {
    title: "Marriage Proposal Yacht Istanbul 2026 — €280 | Book Online",
    description: "Plan the perfect proposal on a private Bosphorus yacht. Roses, candles & Maiden's Tower backdrop. 5.0 rating. Photographer available. Book online — best price guarantee.",
  },
  "bosphorus-dinner-cruise": {
    title: "Istanbul Bosphorus Dinner Cruise 2026 — €65 All-Inclusive | Book Online",
    description: "Book the best dinner cruise in Istanbul for €65. 4-course Turkish dinner, belly dance, live show & hotel pickup included. 4.9 rating (312 reviews). Best price guarantee — book online.",
  },
  "yacht-charter-in-istanbul": {
    title: "Private Yacht Charter Istanbul 2026 — From €280 | Book Online",
    description: "Rent a private yacht in Istanbul from €280. Custom Bosphorus route with professional crew. Perfect for birthdays, proposals & corporate events. Best price guarantee — book online.",
  },
  "corporate-event-bosphorus-cruise": {
    title: "Corporate Event Cruise Istanbul 2026 — Bosphorus Yacht | Book Online",
    description: "Host your corporate event on the Bosphorus. A/V equipment, catering & branding options for up to 50 guests. From €280. TURSAB licensed since 2001. Book online.",
  },
  "istanbul-princes-island-tour": {
    title: "Princes Islands Tour Istanbul 2026 — €45 Full Day | Book Online",
    description: "Visit the car-free Princes Islands from Istanbul. Full-day tour with ferry, lunch & guided island exploration. €45 per person. Best price guarantee — book online.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) return { title: "Tour Not Found" };

  const override = metaOverrides[slug];
  const title = override?.title ?? `${tour.nameEn} — From €${tour.priceEur} | Book Online`;
  const description = override?.description ?? `${tour.description} Duration: ${tour.duration}. Capacity: ${tour.capacity}. Starting from €${tour.priceEur}/person. Free cancellation. Book your ${tour.nameEn} in Istanbul today.`;
  const url = `${SITE_URL}/cruises/${slug}`;
  const keywords = tourKeywords[slug] || [
    tour.nameEn.toLowerCase(), "bosphorus cruise", "istanbul boat tour",
  ];

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large" as const,
        "max-snippet": -1,
      },
    },
    openGraph: {
      title,
      description: tour.description,
      url,
      type: "website",
      images: [{ url: tour.image, width: 1200, height: 630, alt: tour.nameEn }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: tour.description,
    },
  };
}

export default async function TourDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) notFound();

  const related = tours.filter((t) => t.slug !== slug && t.category === tour.category).slice(0, 4);

  // JSON-LD TouristTrip + Product schema (dual type for aggregateRating support)
  const tourSchema = {
    "@context": "https://schema.org",
    "@type": ["TouristTrip", "Product"],
    name: tour.nameEn,
    description: tour.description,
    touristType: "Leisure",
    url: `${SITE_URL}/cruises/${tour.slug}`,
    image: tour.image,
    duration: (() => {
      const h = tour.duration.match(/(\d+)\.?(\d*)\s*hour/i);
      if (!h) return undefined;
      const hours = parseInt(h[1]);
      const frac = h[2];
      return `PT${hours}H${frac === "5" ? "30M" : ""}`;
    })(),
    availableLanguage: ["English", "Turkish"],
    inLanguage: "en",
    brand: {
      "@type": "Brand",
      name: "MerrySails",
    },
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    offers: {
      "@type": "Offer",
      price: tour.priceEur,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      validFrom: "2026-01-01",
      priceValidUntil: "2026-12-31",
      url: `${SITE_URL}/cruises/${tour.slug}`,
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "TR",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 1,
        returnFees: "https://schema.org/FreeReturn",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tour.rating,
      reviewCount: tour.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    itinerary: {
      "@type": "ItemList",
      itemListElement: tour.highlights.map((h, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: h,
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Cruises", item: `${SITE_URL}/cruises` },
      { "@type": "ListItem", position: 3, name: tour.nameEn, item: `${SITE_URL}/cruises/${tour.slug}` },
    ],
  };

  // FAQPage JSON-LD schema (unique per tour)
  const faqs = tourFaqs[slug];
  const faqSchema = faqs
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tourSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <div className="pt-28 pb-20 bg-[var(--surface-alt)]">
        <div className="container-main">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
            <Link href="/" className="hover:text-[var(--brand-primary)]">Home</Link>
            <span>/</span>
            <Link href="/cruises" className="hover:text-[var(--brand-primary)]">Cruises</Link>
            <span>/</span>
            <span className="text-[var(--heading)] truncate">{tour.nameEn}</span>
          </nav>

          <TourDetailClient tour={tour} related={related} />
        </div>
      </div>
    </>
  );
}
