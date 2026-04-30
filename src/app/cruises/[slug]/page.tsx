import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getTourBySlug,
  getTourPath,
  isPricingVisible,
  tours,
} from "@/data/tours";
import TourDetailClient from "@/components/tours/TourDetailClient";
import { resolveBookingPrefill } from "@/lib/booking-prefill";
import { buildHreflang } from "@/lib/hreflang";

const SITE_URL = "https://merrysails.com";
const OWNER_REDIRECTS: Record<string, string> = {
  "bosphorus-dinner-cruise": "/istanbul-dinner-cruise",
  "yacht-charter-in-istanbul": "/yacht-charter-istanbul",
  "romantic-marriage-proposal": "/proposal-yacht-rental-istanbul",
  "corporate-event-bosphorus-cruise": "/corporate-events",
  "private-bosphorus-dinner-yacht-cruise": "/private-bosphorus-dinner-cruise",
};

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
    { question: "How long is the Bosphorus sunset cruise?", answer: "The Bosphorus sunset cruise lasts approximately 2 hours and is timed around the daily sunset window." },
    { question: "What time does the sunset cruise depart?", answer: "Departure time changes with the season so the cruise can sail through golden hour and the early blue-hour return." },
    { question: "What is included in the Bosphorus sunset cruise?", answer: "The verified public structure shows two shared options on the same route. Both include the 2-hour cruise, live guide support, multilingual audio guide access, tea, Turkish coffee, lemonade, water, fruit, and snacks. The wine option adds 2 glasses of wine per guest." },
    { question: "When is the best time of year for a sunset cruise in Istanbul?", answer: "The best time for a sunset cruise is from April to October, when the weather is warm and the sunsets are most dramatic. However, winter sunsets over the Bosphorus can be equally stunning with fewer crowds." },
    { question: "How much does the Bosphorus sunset cruise cost?", answer: "The verified live sunset ladder currently starts at EUR 34 for the Without Wine option and EUR 40 for the wine-served option." },
  ],
  "bosphorus-dinner-cruise": [
    { question: "How is the Bosphorus dinner cruise structured?", answer: "The dinner cruise is structured as four shared evening package choices: Silver Soft Drinks, Silver Alcoholic Drinks, Gold Soft Drinks, and Gold Unlimited Alcohol." },
    { question: "How long is the Istanbul dinner cruise?", answer: "The shared Bosphorus dinner cruise lasts approximately 3.5 hours and follows a central evening sailing route." },
    { question: "Is there a dress code for the dinner cruise?", answer: "There is no strict dress code, but smart casual attire is recommended. Most guests dress comfortably yet presentably. Flat, non-slip shoes are advisable for walking on deck." },
    { question: "How much does the Istanbul dinner cruise cost?", answer: "The public package ladder currently starts from EUR 30 per guest and tops out at EUR 90 per guest." },
    { question: "What changes between the packages?", answer: "The route stays the same, but Silver uses standard seating, Gold uses stage-close VIP tables, Silver Alcoholic adds a limited local-alcohol service, and Gold Unlimited Alcohol adds unlimited local plus imported alcoholic drinks." },
  ],
  "yacht-charter-in-istanbul": [
    { question: "How many guests can a private yacht hold in Istanbul?", answer: "The public Essential, Premium, and VIP starter packages are positioned around a private 2-person setup, but larger groups can still be matched to the right yacht and extras plan depending on the vessel assigned." },
    { question: "Can I customize the yacht cruise route?", answer: "Absolutely! One of the biggest advantages of a private yacht charter is complete route flexibility. Your captain will work with you to create a custom itinerary — whether you want to cruise past specific landmarks, stop for swimming, or focus on sunset views." },
    { question: "Is catering available on the yacht charter?", answer: "Yes. The yacht charter page includes a visible add-on structure for meals, drinks, transfer, entertainment, cake, and extra service requests." },
    { question: "How much does yacht rental cost in Istanbul?", answer: "The public yacht charter packages currently start from EUR 280 for Essential, EUR 380 for Premium, and EUR 680 for VIP." },
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
    { question: "What makes the private sunset cruise different from the regular sunset cruise?", answer: "The private sunset cruise gives you an entire yacht exclusively for your booking, with the yacht size matched to your group and a professional captain who times the route around golden hour. Unlike the shared cruise, you control the pace, music, and overall atmosphere." },
    { question: "What is the best season for a private sunset cruise?", answer: "Private sunset cruises run year-round with departure times adjusted to match the sunset. Summer (June–August) offers the longest golden hours, while spring and autumn provide dramatic sky colors. Winter sunsets are brief but can be equally spectacular." },
    { question: "What photography tips do you have for the sunset cruise?", answer: "Arrive early to capture the golden-hour light on the landmarks, and ask the crew to slow the route near Maiden's Tower or the Bosphorus Bridge when the light is strongest. A professional photographer can also be arranged if you want the session handled as part of the proposal." },
    { question: "How much does a private Bosphorus sunset cruise cost?", answer: "Private sunset charters are quoted after we confirm the yacht class, guest count, sunset slot, and any extras such as photography, drinks service, or live music. The public yacht-charter ladder can be used as a baseline, but the final sunset proposal depends on the selected vessel and timing." },
    { question: "Can I add extras like a photographer or violinist?", answer: "Yes. Photography, live music, drinks service, decoration, and extra time can all be added to the private sunset charter and are confirmed in the proposal before payment." },
  ],
  "corporate-event-bosphorus-cruise": [
    { question: "How many guests can the corporate event cruise accommodate?", answer: "Our corporate event cruise accommodates up to 50 guests. For larger groups, we can arrange multiple vessels or a larger charter. Our event coordinator will work with you to find the perfect setup for your group size." },
    { question: "What corporate event packages are available?", answer: "Corporate events are planned as private, quote-led formats. Once we confirm the guest count, event objective, AV needs, and catering brief, we match the right yacht or event vessel and build the service plan around it." },
    { question: "Is A/V equipment available on the cruise?", answer: "Yes. Presentation screens, wireless microphones, speakers, and other AV support can be arranged when the vessel and event format are confirmed." },
    { question: "Can you arrange catering for corporate events?", answer: "Yes. Corporate catering can be built as a cocktail reception, buffet, or seated dinner, with halal, vegetarian, vegan, and other dietary requests confirmed in advance." },
    { question: "How far in advance should we book a corporate event cruise?", answer: "We recommend booking corporate events at least 2–4 weeks in advance to allow time for coordination, custom branding, and catering arrangements. For large events (30+ guests) or peak season dates, 4–6 weeks is advisable." },
  ],
  "romantic-marriage-proposal": [
    { question: "How private is the marriage proposal yacht experience?", answer: "The experience is completely private — the yacht is exclusively yours with a maximum of 6 guests. Our discreet crew ensures your special moment is intimate and undisturbed, with the iconic Maiden's Tower and Bosphorus sunset as your backdrop." },
    { question: "What proposal decorations are included?", answer: "Proposal decoration is planned around the moment you want to create. The setup can stay intimate with table styling and candles, or scale into a fuller romantic build with rose petals, signage, flowers, music, and celebration service." },
    { question: "Can I hire a photographer for the proposal?", answer: "Yes. A discreet photographer can be arranged to capture the proposal and the follow-up couple shots on the Bosphorus, with the coverage style confirmed before the cruise." },
    { question: "What proposal packages are available?", answer: "Proposal bookings are handled as private, quote-based plans. We first confirm the yacht class, timing, route, decoration direction, and extras such as photographer, violinist, transfer, or celebration cake, then prepare the final proposal." },
    { question: "When is the best time for a proposal cruise?", answer: "Most proposals are timed with sunset for the most romantic atmosphere, especially near the Maiden's Tower. The crew coordinates departure time with sunset schedules. Weekday evenings offer the calmest waters and quietest setting." },
  ],
  "yacht-birthday-party": [
    { question: "How many guests can attend a yacht birthday party?", answer: "Guest capacity depends on the yacht assigned to the event. Smaller birthday cruises work beautifully for intimate groups, while larger vessels can be matched for bigger celebrations." },
    { question: "Can I bring my own cake or order one through you?", answer: "Both options are available. You can bring your own cake with advance notice, or we can arrange a custom celebration cake as part of the event plan." },
    { question: "Is a DJ included in the birthday party?", answer: "A Bluetooth sound system is available for playlists, and professional DJ or live-music support can be arranged if you want a fuller party setup." },
    { question: "How much does a yacht birthday party cost in Istanbul?", answer: "Birthday events are quoted after we confirm the yacht size, guest count, route timing, decoration direction, and whether the event needs catering, cake, DJ, or photography support." },
    { question: "Can the party be extended beyond 2 hours?", answer: "Yes. Extended charters can be arranged, and the final timing is confirmed together with the yacht assignment, route plan, and any food or drinks service." },
  ],
  "yacht-weddings": [
    { question: "What wedding decoration options are available on the yacht?", answer: "Wedding decoration is planned around the guest count, ceremony style, and whether the event needs a simple romantic setup or a fuller reception-style production with flowers, table styling, and coordination support." },
    { question: "How many guests can a yacht wedding accommodate?", answer: "Our yacht wedding service accommodates up to 50 guests. For intimate ceremonies, smaller yachts provide a cozy atmosphere, while the VIP luxury mega yacht is perfect for grand celebrations with full entertainment." },
    { question: "What wedding packages are available?", answer: "Wedding events are structured as private, quote-based plans. Once the team understands your ceremony format, guest count, decoration brief, and catering or entertainment needs, it can match the right yacht and service build." },
    { question: "Can we have live music at our yacht wedding?", answer: "Yes. DJs, violinists, traditional musicians, and live-band setups can all be arranged depending on the vessel, guest count, and ceremony format." },
    { question: "How much does a yacht wedding cost in Istanbul?", answer: "Yacht weddings are quoted after confirming the guest count, vessel scale, ceremony and dining format, decoration level, and whether entertainment or full coordination is required." },
  ],
  "wedding-anniversary": [
    { question: "What anniversary decoration is included?", answer: "Anniversary decoration is planned around the mood you want. It can stay simple and elegant with flowers, candles, and table styling, or scale into a fuller romantic setup with music, dessert, and celebration service." },
    { question: "How many guests can attend the anniversary cruise?", answer: "The wedding anniversary cruise accommodates 2 to 10 guests, making it perfect for an intimate celebration with your partner or a small gathering with close family and friends." },
    { question: "What anniversary packages are available?", answer: "Anniversary cruises are handled as private, quote-based experiences. We first confirm the yacht style, guest count, timing, dining direction, and any celebration touches, then build the final plan around that brief." },
    { question: "Can we have live music for our anniversary?", answer: "Yes. A violinist, guitarist, DJ, or other live-music format can be arranged depending on the atmosphere you want and the yacht selected for the cruise." },
    { question: "How much does a wedding anniversary cruise cost?", answer: "Anniversary pricing is prepared after we confirm the yacht class, route length, guest count, decoration level, and whether the cruise needs dining, dessert, transfer, or live-music support." },
  ],
  "bachelorette-yacht-party": [
    { question: "How many guests can attend a bachelorette yacht party?", answer: "Guest capacity depends on the yacht assigned to the booking. Standard private-yacht formats work well for smaller bridal groups, and larger themed events can be matched with a bigger vessel." },
    { question: "Are bachelorette decorations included?", answer: "Bachelorette decoration is arranged according to the event brief. We can keep it light with table styling and themed details or build a fuller party look with signage, balloons, flowers, and photo moments." },
    { question: "Can we have music and a DJ on board?", answer: "All packages include a Bluetooth sound system for your own playlists. A professional DJ can be added for €250 to keep the party energy high as you cruise past Istanbul's skyline." },
    { question: "How much does a bachelorette yacht party cost?", answer: "Bachelorette events are quoted after we confirm the yacht size, guest count, route timing, decoration level, and whether the booking needs catering, open-bar service, DJ, or photography support." },
    { question: "What food and drink options are available?", answer: "Food and drink service is built around the event plan. We can arrange snack platters, cocktail-style service, seated meals, non-alcoholic drinks, or fuller celebration beverage plans depending on the yacht and the party brief." },
  ],
  "private-bosphorus-dinner-yacht-cruise": [
    { question: "What is served on the private dinner yacht cruise?", answer: "The private dinner menu is arranged around Turkish mezes, salad, a main-course choice, dessert, and the beverage style you want for the evening. The exact dining plan is confirmed according to the yacht, guest count, and occasion." },
    { question: "How long is the private dinner cruise?", answer: "The private dinner yacht cruise lasts 3 hours, departing at 19:00 or 20:00 from Kuruçeşme Marina. This allows ample time for a relaxed multi-course dinner while cruising the illuminated Bosphorus." },
    { question: "How many guests can join the private dinner cruise?", answer: "The private dinner yacht cruise accommodates up to 12 guests, ensuring an intimate and exclusive dining experience on the water with personalized service from the crew." },
    { question: "How much does a private dinner cruise cost?", answer: "Private dinner cruises are quoted after we confirm the yacht class, route duration, guest count, and whether the evening needs a simple dinner flow or a more elaborate dining and celebration setup." },
    { question: "Is the dinner cruise suitable for special occasions?", answer: "Absolutely! The private dinner cruise is ideal for anniversaries, proposals, birthdays, and intimate celebrations. Candlelit setup is included, and the illuminated Bosphorus skyline provides a magical backdrop for any special occasion." },
  ],
  "private-bosphorus-lunch-yacht-cruise": [
    { question: "What is included in the private lunch yacht cruise?", answer: "The private lunch cruise includes the yacht, professional crew, and an onboard lunch setup matched to the guest profile and the style of the cruise. Tea, coffee, and water can be included, and the meal direction is finalized before the booking is confirmed." },
    { question: "How long is the private lunch cruise?", answer: "The private lunch yacht cruise is a 2-hour experience departing at 12:00 from Kuruçeşme Marina. The midday timing offers the best daylight for sightseeing and photography along the Bosphorus." },
    { question: "Is the lunch cruise suitable for families?", answer: "Yes, the private lunch cruise is very family-friendly. The daytime schedule, calm waters, and spacious deck make it comfortable for guests of all ages. A swimming stop can be included in your route." },
    { question: "How much does the private lunch yacht cruise cost?", answer: "Lunch charters are quoted after we confirm the yacht size, guest count, route timing, and whether the cruise needs a light lunch, a fuller meal setup, or additional swimming or celebration stops." },
    { question: "Can I combine the lunch cruise with swimming?", answer: "Yes! Your captain can include a swimming stop in the itinerary, typically at calm coves in the upper Bosphorus. The yacht is equipped with a swimming ladder for easy water access. Just let us know when booking." },
  ],
  "bosphorus-sightseeing-yacht-cruise": [
    { question: "What landmarks will I see on the private sightseeing yacht cruise?", answer: "You'll see all the Bosphorus highlights including Dolmabahçe Palace, Maiden's Tower, Ortaköy Mosque, Rumeli Fortress, Bosphorus Bridge, and charming fishing villages. Your captain can customize stops based on your interests." },
    { question: "How is this different from the shared sightseeing cruise?", answer: "Unlike the shared cruise, the private sightseeing yacht gives you complete freedom — your own yacht, flexible stops, custom pace, and the ability to linger at landmarks or detour to hidden spots that larger boats cannot access." },
    { question: "How many guests can join the private sightseeing cruise?", answer: "Guest capacity depends on the yacht assigned to your booking. All private sightseeing charters include tea, coffee, water, and a professional crew who knows every landmark and hidden gem along the Bosphorus, and larger groups can be matched with a bigger vessel." },
    { question: "How much does a private sightseeing yacht cruise cost?", answer: "Private sightseeing charters are quoted after we confirm the yacht class, guest count, route length, and whether the cruise needs extras such as guide support, snacks, or a stronger celebration setup." },
    { question: "When is the best time for a sightseeing yacht cruise?", answer: "Daytime cruises offer the best visibility for landmarks and photography, especially in the morning. However, you can choose any departure time. Late afternoon combines sightseeing with golden hour light for stunning photos." },
  ],
  "private-yacht-swimming-tour": [
    { question: "What is the swimming tour route on the Bosphorus?", answer: "The yacht heads to the upper Bosphorus near the Black Sea entrance, where waters are calmer and crystal clear. Your captain knows the best swimming spots — secluded coves, calm bays, and scenic stretches ideal for swimming." },
    { question: "What safety measures are in place for swimming?", answer: "All yachts are equipped with swimming ladders, life jackets, and safety equipment. Your professional crew monitors conditions and selects the safest spots with calm currents. Life rings and first aid kits are always on board." },
    { question: "What should I bring on the swimming tour?", answer: "Bring swimwear, a towel, sunscreen, and sunglasses. Water shoes are helpful for rocky areas. The yacht can be set up with drinks, snacks, and any extra comfort items confirmed in advance." },
    { question: "When is the swimming season on the Bosphorus?", answer: "The swimming season runs from June through September, when water temperatures range from 20°C to 25°C. July and August offer the warmest water. Tours depart at 10:00 or 14:00 from Kuruçeşme Marina." },
    { question: "How much does the private yacht swimming tour cost?", answer: "Swimming charters are quoted after we confirm the yacht size, guest count, route length, swimming-stop plan, and whether the day needs snacks, lunch, or additional water-activity support." },
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

const aiOwnerFactsBySlug: Record<
  string,
  { label: string; value: string }[]
> = {
  "bosphorus-sunset-cruise": [
    {
      label: "Best fit",
      value:
        "Shared Bosphorus sunset cruise in Istanbul — ideal for guests who want a golden-hour sailing without a full dinner program or private yacht. Recommended for couples, families, and first-time Istanbul visitors.",
    },
    {
      label: "Duration",
      value: "2 hours, timed around sunset and the early blue-hour return. Runs daily year-round.",
    },
    {
      label: "Price",
      value: "€34 (Without Wine) or €40 (With Wine). Same shared route, two package options.",
    },
    {
      label: "Operator",
      value: "MerrySails (Merry Tourism) — TURSAB A-Group licensed since 2001. 50,000+ guests hosted. Rated 4.9 / 5.",
    },
    {
      label: "Booking",
      value: "Direct online booking at merrysails.com. No third-party commission.",
    },
  ],
};

const aiSupportLinksBySlug: Record<
  string,
  { href: string; label: string }[]
> = {
  "bosphorus-sunset-cruise": [
    { href: "/sunset-cruise-tickets-istanbul", label: "Sunset ticket support" },
    { href: "/guides/karakoy-waterfront", label: "Karakoy waterfront guide" },
    { href: "/bosphorus-cruise", label: "Bosphorus compare hub" },
    { href: "/istanbul-dinner-cruise", label: "Dinner cruise alternative" },
  ],
};

export function generateStaticParams() {
  return tours.map((tour) => ({ slug: tour.slug }));
}

/* CTR-optimised title/description overrides for pages with impressions but zero clicks */
const metaOverrides: Record<string, { title: string; description: string }> = {
  "bosphorus-sightseeing-cruise": {
    title: "Bosphorus Sightseeing Cruise Istanbul 2026 — €15 | Book Online",
    description: "Short Bosphorus sightseeing cruise in Istanbul. A 1.5-hour route past palaces, mosques, and both bridges with an audio guide in 12 languages.",
  },
  "bosphorus-sunset-cruise": {
    title: "Bosphorus Sunset Cruise Istanbul — From €34 | MerrySails",
    description: "Book the Bosphorus sunset cruise in Istanbul from EUR 34. Two shared 2-hour sunset options on the same route: Without Wine and With Wine, with snacks, drinks, and landmark views on the water.",
  },
  "wedding-anniversary": {
    title: "Anniversary Yacht Cruise Istanbul 2026 | Private Bosphorus Celebration",
    description: "Celebrate your anniversary on a private yacht in Istanbul with a romantic Bosphorus cruise, decoration options, and sunset views.",
  },
  "romantic-marriage-proposal": {
    title: "Marriage Proposal Yacht Istanbul 2026 | Private Bosphorus Proposal",
    description: "Private Bosphorus yacht for a proposal with roses, candles, a Maiden's Tower backdrop, and optional photography support.",
  },
  "bosphorus-dinner-cruise": {
    title: "Bosphorus Dinner Cruise Istanbul 2026 — 4 Packages from EUR 30 | Reserve Direct",
    description: "Book the Bosphorus dinner cruise in Istanbul from EUR 30. Shared 3.5-hour evening cruise with Silver and Gold package choices, package-based drinks, and hotel pickup support.",
  },
  "yacht-charter-in-istanbul": {
    title: "Yacht Charter Istanbul 2026 — 3 Packages from EUR 280 | Book Online",
    description: "Book yacht charter in Istanbul from EUR 280 per yacht. Choose Essential, Premium, or VIP and expand the charter with meals, drinks, transfer, and event add-ons.",
  },
  "corporate-event-bosphorus-cruise": {
    title: "Corporate Event Cruise Istanbul 2026 | Bosphorus Yacht Venue",
    description: "Host your corporate event on the Bosphorus with A/V, catering, branding, and private-yacht planning support for business groups. TURSAB licensed since 2001.",
  },
  "istanbul-princes-island-tour": {
    title: "Princes Islands Tour Istanbul 2026 — €45 Full Day | Book Online",
    description: "Visit the car-free Princes Islands from Istanbul on a full-day tour with ferry, lunch, and guided island stops.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const ownerRedirect = OWNER_REDIRECTS[slug];
  const tour = getTourBySlug(slug);
  if (!tour) return { title: "Tour Not Found" };

  const override = metaOverrides[slug];
  const showPricing = isPricingVisible(tour);
  const title = showPricing
    ? override?.title ?? `${tour.nameEn} — From €${tour.priceEur} | MerrySails`
    : `${tour.nameEn} | MerrySails Service Page`;
  const description = showPricing
    ? override?.description ??
      `${tour.description} Duration: ${tour.duration}. Capacity: ${tour.capacity}. Book your ${tour.nameEn} in Istanbul today.`
    : `${tour.description} Explore the service structure, highlights, and best-fit use cases for ${tour.nameEn} in Istanbul.`;
  const url = ownerRedirect ? `${SITE_URL}${ownerRedirect}` : `${SITE_URL}${getTourPath(tour)}`;
  const keywords = tourKeywords[slug] || [
    tour.nameEn.toLowerCase(), "bosphorus cruise", "istanbul boat tour",
  ];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      ...(!ownerRedirect && { languages: buildHreflang(getTourPath(tour)) }),
    },
    robots: {
      index: !ownerRedirect,
      follow: true,
      googleBot: {
        index: !ownerRedirect,
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

export default async function TourDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const ownerRedirect = OWNER_REDIRECTS[slug];
  if (ownerRedirect) redirect(ownerRedirect);
  const tour = getTourBySlug(slug);
  if (!tour) notFound();
  const showPricing = isPricingVisible(tour);

  const related = tours.filter((t) => t.slug !== slug && t.category === tour.category).slice(0, 4);

  // JSON-LD TouristTrip + Product schema
  const tourSchema = {
    "@context": "https://schema.org",
    "@type": ["TouristTrip", "Product"],
    name: tour.nameEn,
    description: tour.description,
    touristType: "Leisure",
    url: `${SITE_URL}${getTourPath(tour)}`,
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
    ...(showPricing
      ? {
          offers: {
            "@type": "Offer",
            price: tour.priceEur,
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            validFrom: "2026-01-01",
            priceValidUntil: "2026-12-31",
            url: `${SITE_URL}${getTourPath(tour)}`,
            hasMerchantReturnPolicy: {
              "@type": "MerchantReturnPolicy",
              applicableCountry: "TR",
              returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
              merchantReturnDays: 1,
              returnFees: "https://schema.org/FreeReturn",
            },
          },
        }
      : {}),
    ...(tour.rating && tour.reviewCount
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: tour.rating,
            reviewCount: tour.reviewCount,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
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
      { "@type": "ListItem", position: 2, name: "Bosphorus Cruise", item: `${SITE_URL}/bosphorus-cruise` },
      { "@type": "ListItem", position: 3, name: tour.nameEn, item: `${SITE_URL}${getTourPath(tour)}` },
    ],
  };

  // Event schema — only for the recurring sunset cruise departure
  const eventSchema =
    slug === "bosphorus-sunset-cruise"
      ? {
          "@context": "https://schema.org",
          "@type": "Event",
          name: "Bosphorus Sunset Cruise",
          startDate: "2026-05-01T18:00:00+03:00",
          endDate: "2026-05-01T20:00:00+03:00",
          eventSchedule: {
            "@type": "Schedule",
            byDay: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            startTime: "18:00",
            endTime: "20:00",
            scheduleTimezone: "Europe/Istanbul",
            repeatFrequency: "P1D",
          },
          location: {
            "@type": "Place",
            name: "Karaköy Meeting Point — MerrySails",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Arap Cami Mah., Uskufcular Sk.",
              addressLocality: "Karaköy, Beyoğlu",
              addressRegion: "Istanbul",
              postalCode: "34425",
              addressCountry: "TR",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 41.0245,
              longitude: 28.9741,
            },
          },
          offers: {
            "@type": "AggregateOffer",
            lowPrice: "34",
            highPrice: "40",
            priceCurrency: "EUR",
            url: "https://merrysails.com/cruises/bosphorus-sunset-cruise",
          },
          organizer: {
            "@type": "Organization",
            name: "MerrySails",
            url: "https://merrysails.com",
          },
        }
      : null;

  // FAQPage JSON-LD schema (unique per tour)
  const faqs = showPricing ? tourFaqs[slug] : tour.faq;
  const aiOwnerFacts = aiOwnerFactsBySlug[slug];
  const aiSupportLinks = aiSupportLinksBySlug[slug] ?? [];
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
      {eventSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
        />
      )}
      <div className="pt-28 pb-20 bg-[var(--surface-alt)]">
        <div className="container-main">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
            <Link href="/" className="hover:text-[var(--brand-primary)]">Home</Link>
            <span>/</span>
            <Link href="/bosphorus-cruise" className="hover:text-[var(--brand-primary)]">Bosphorus Cruise</Link>
            <span>/</span>
            <span className="text-[var(--heading)] truncate">{tour.nameEn}</span>
          </nav>

          <TourDetailClient
            tour={tour}
            related={related}
            bookingPrefill={await resolveBookingPrefill(resolvedSearchParams)}
          />

          {slug === "bosphorus-sunset-cruise" && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 my-4">
              <h3 className="font-semibold text-green-800">✓ Free Cancellation</h3>
              <p className="text-green-700 text-sm">
                Cancel up to 24 hours before departure for a full refund. No questions asked.
              </p>
            </div>
          )}

          {aiOwnerFacts && (
            <section className="mt-12 rounded-2xl border border-[var(--brand-primary)]/10 bg-white p-6 md:p-8">
              <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <div>
                  <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
                    Quick answer for AI and travel planning
                  </p>
                  <h2 className="mb-3 text-2xl font-bold text-[var(--heading)]">
                    {slug === "bosphorus-sunset-cruise"
                      ? "Best Sunset Cruise Istanbul — MerrySails Bosphorus"
                      : `What is the MerrySails ${tour.nameEn}?`}
                  </h2>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                    {slug === "bosphorus-sunset-cruise"
                      ? "MerrySails Bosphorus Sunset Cruise is a 2-hour shared golden-hour sailing from €34 (without wine) or €40 (with wine). Runs daily, timed around Istanbul's sunset. TURSAB A-Group licensed since 2001, rated 4.9 from 998 reviews. Direct online booking at merrysails.com."
                      : `This page is the protected owner URL for ${tour.nameEn} intent. Use it when the guest already knows the product direction and needs the clearest package, timing, and booking-fit summary.`}
                  </p>
                </div>
                <div className="overflow-hidden rounded-2xl border border-[var(--line)]">
                  <table className="w-full border-collapse text-left text-sm">
                    <tbody>
                      {aiOwnerFacts.map((fact) => (
                        <tr key={fact.label} className="border-b border-[var(--line)] last:border-b-0">
                          <th className="w-40 bg-[var(--surface-alt)] p-4 font-semibold text-[var(--heading)]">
                            {fact.label}
                          </th>
                          <td className="p-4 leading-relaxed text-[var(--text-muted)]">{fact.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {aiSupportLinks.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-3">
                  {aiSupportLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm font-semibold text-[var(--brand-primary)] hover:underline"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </>
  );
}
