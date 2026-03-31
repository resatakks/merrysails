export interface GuideSection {
  heading: string;
  content: string;
}

export interface Guide {
  slug: string;
  title: string;
  metaDescription: string;
  excerpt: string;
  image: string;
  keywords: string[];
  sections: GuideSection[];
  relatedTours: string[];
}

export const guides: Guide[] = [
  {
    slug: "bosphorus-strait",
    title: "The Bosphorus Strait — Istanbul's Legendary Waterway",
    metaDescription: "Complete guide to the Bosphorus Strait in Istanbul. History, landmarks, cruise options, and why this 31km waterway is one of the world's most famous.",
    excerpt: "Discover everything about the Bosphorus Strait — the iconic waterway that divides Europe and Asia, lined with Ottoman palaces, medieval fortresses, and modern bridges.",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80",
    keywords: ["bosphorus", "bosphorus strait", "istanbul bosphorus", "bosphorus cruise"],
    sections: [
      { heading: "What is the Bosphorus?", content: "The Bosphorus (Boğaziçi in Turkish) is a narrow, natural strait in northwestern Turkey that connects the Black Sea to the Sea of Marmara. At just 31 kilometers long and ranging from 700 meters to 3.3 kilometers wide, it divides the city of Istanbul into European and Asian halves — making Istanbul the only city in the world that straddles two continents. The strait has been a vital shipping route and strategic military passage for thousands of years." },
      { heading: "History of the Bosphorus", content: "The Bosphorus has shaped civilizations since ancient times. Greek mythology says Io swam across its waters as a heifer — hence the name 'Bosphorus' (Oxford of the Cow). The Byzantines built mighty walls along its shores, and the Ottomans constructed great fortresses like Rumeli Hisarı to control passage. Sultan Mehmed the Conqueror famously dragged his ships overland to bypass the chain across the Golden Horn during the 1453 siege of Constantinople. Today, over 48,000 ships pass through the strait each year, making it one of the busiest waterways on Earth." },
      { heading: "Key Landmarks Along the Bosphorus", content: "Cruising the Bosphorus reveals centuries of architecture. The Dolmabahçe Palace (1856) stretches 600 meters along the European shore with its stunning Baroque-Ottoman facade. The Ortaköy Mosque stands photogenically at the foot of the Bosphorus Bridge. The Maiden's Tower (Kız Kulesi) rises from a tiny islet near the Asian shore, surrounded by legends of imprisoned princesses. Rumeli Fortress, built in just four months by Sultan Mehmed II, guards the narrowest point. Elegant yalıs (waterfront mansions) line both shores, some dating back to the 18th century." },
      { heading: "How to Experience the Bosphorus", content: "The most popular way to experience the Bosphorus is by boat cruise. Options range from budget-friendly sightseeing cruises (from €15) and romantic sunset cruises (from €40) to dinner cruises with Turkish night entertainment (from €65) and private yacht charters (from €280). Public ferries operated by İDO and Şehir Hatları also cross the strait regularly, though they don't offer the commentary and curated route of a dedicated cruise. For the best experience, choose a sunset or dinner cruise to see Istanbul's skyline illuminated." },
      { heading: "Bosphorus Bridges", content: "Three suspension bridges span the Bosphorus, connecting Europe and Asia. The 15 July Martyrs Bridge (1973) was the first, stretching 1,560 meters and illuminated with colorful LED lights at night. The Fatih Sultan Mehmet Bridge (1988) sits at the strait's narrowest point. The Yavuz Sultan Selim Bridge (2016) near the Black Sea is the widest suspension bridge in the world. Sailing beneath these engineering marvels is a highlight of any Bosphorus cruise." },
      { heading: "Best Time to Cruise the Bosphorus", content: "The Bosphorus is stunning year-round, but each season offers something different. Spring (April–May) brings mild weather and tulip displays along the shores. Summer (June–August) is perfect for swimming tours and late sunsets. Autumn (September–November) offers golden light and fewer crowds. Winter (December–March) features dramatic skies and the best prices — sunset cruises drop to €40 during the winter season. For photography, the golden hour just before sunset creates magical lighting on the palaces and mosques." }
    ],
    relatedTours: ["bosphorus-sunset-cruise", "bosphorus-dinner-cruise", "yacht-charter-in-istanbul", "bosphorus-sightseeing-cruise"]
  },
  {
    slug: "maidens-tower",
    title: "Maiden's Tower (Kız Kulesi) — Istanbul's Most Romantic Landmark",
    metaDescription: "Guide to Maiden's Tower in Istanbul. History, legends, visiting info, and how to see it on a Bosphorus cruise. Recently restored and reopened.",
    excerpt: "The iconic Maiden's Tower rises from the Bosphorus waters near the Asian shore — a symbol of Istanbul wrapped in legends of love, tragedy, and mystery.",
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&q=80",
    keywords: ["maidens tower", "kiz kulesi", "istanbul landmarks", "bosphorus landmarks"],
    sections: [
      { heading: "The Legend of the Maiden's Tower", content: "According to Turkish legend, a sultan was told by a prophecy that his beloved daughter would die from a snakebite on her 18th birthday. To protect her, he built a tower in the middle of the Bosphorus where no snake could reach. But on her birthday, a basket of fruits sent as a gift from the palace contained a hidden asp, and the princess was bitten and died. The Greek legend tells of Hero and Leander — a priestess and her lover who would swim across the strait guided by a lantern in the tower." },
      { heading: "History and Architecture", content: "The tower's history stretches back to 408 BC when Athenian general Alcibiades built a customs station on the rock. The Byzantines used it as a watchtower and anchor point for the great chain that blocked enemy ships from entering the Golden Horn. The Ottomans rebuilt it as a lighthouse in 1725, and it has served variously as a quarantine station during cholera outbreaks, a radio station, and even an inspection point for ships. The current structure, with its distinctive lead-covered dome and lantern, was extensively restored and reopened in 2023 with a restaurant and museum." },
      { heading: "Visiting the Maiden's Tower", content: "The Maiden's Tower is located about 200 meters off the coast of Üsküdar on the Asian side. After its 2021–2023 restoration, visitors can now reach it by small boats departing from Üsküdar or Kabataş. Inside, you'll find a museum showcasing the tower's history, a cafe with panoramic Bosphorus views, and a restaurant on the upper levels. The rooftop terrace offers 360-degree views of both the European and Asian sides of Istanbul." },
      { heading: "Seeing the Tower by Cruise", content: "Every Bosphorus cruise passes the Maiden's Tower, making it one of the most photographed moments of any boat tour. Sunset cruises offer particularly magical views as the golden light illuminates the tower against the Istanbul skyline. Private yacht charters can circle the tower closely — this is a popular spot for marriage proposals, with the tower's romantic legends adding to the atmosphere. The tower is also beautifully illuminated at night, creating stunning reflections on the water during dinner cruises." },
      { heading: "In Popular Culture", content: "The Maiden's Tower gained international fame as a key location in the 1999 James Bond film 'The World Is Not Enough,' where it served as the villain's headquarters. It has also appeared in countless Turkish films, novels, and paintings. The tower is one of Istanbul's most recognizable symbols, appearing on postcards, souvenirs, and even Turkish Airlines branding. For locals, it represents the romantic soul of Istanbul — a city where East meets West, surrounded by water and history." }
    ],
    relatedTours: ["bosphorus-sunset-cruise", "romantic-marriage-proposal", "private-bosphorus-sunset-cruise"]
  },
  {
    slug: "dolmabahce-palace",
    title: "Dolmabahçe Palace — Istanbul's Grandest Waterfront Palace",
    metaDescription: "Complete visitor guide to Dolmabahce Palace. Opening hours, tickets, architecture highlights, and how to see it from a Bosphorus cruise.",
    excerpt: "Dolmabahçe Palace stretches 600 meters along the Bosphorus shore — a breathtaking blend of Baroque, Rococo, and Ottoman architecture that served as the last seat of the Ottoman Empire.",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80",
    keywords: ["dolmabahce palace", "dolmabahce hours", "dolmabahce palace tour", "istanbul palace"],
    sections: [
      { heading: "Overview and History", content: "Built between 1843 and 1856 by Sultan Abdülmecid I, Dolmabahçe Palace replaced the ancient Topkapı Palace as the main residence of the Ottoman sultans. The name 'Dolmabahçe' means 'filled-in garden' — the site was originally a small bay that was filled with earth over centuries. The palace cost an estimated 5 million Ottoman gold liras (roughly $1.5 billion today), using 14 tons of gold leaf in its interior decoration. It contains 285 rooms, 46 halls, 6 hammams, and 68 toilets." },
      { heading: "Architecture Highlights", content: "The palace's main ceremonial hall (Muayede Salonu) is a masterpiece featuring a 36-meter-high dome and the world's largest Bohemian crystal chandelier, weighing 4.5 tons with 750 lights — a gift from Queen Victoria. The Crystal Staircase, with its banisters made of Baccarat crystal, is another showstopper. The exterior blends European Baroque and Rococo styles with traditional Ottoman elements, creating a facade that's best appreciated from the water during a Bosphorus cruise." },
      { heading: "Visiting Information", content: "Dolmabahçe Palace is open every day except Monday from 09:00 to 18:00 (last entry 17:00). There are two sections to visit: the Selamlık (official state rooms) and the Harem (private quarters). Combined tickets cost approximately 650 TL for foreign visitors. Guided tours run in groups every 15–20 minutes. The palace is located in the Beşiktaş district, easily reached by tram (Kabataş stop) or bus. Photography is not permitted inside the palace rooms." },
      { heading: "Seeing Dolmabahçe from the Water", content: "Arguably the best view of Dolmabahçe Palace is from the Bosphorus itself. The 600-meter-long waterfront facade is a stunning sight, especially during golden hour when the white marble glows warmly. Every Bosphorus cruise passes directly in front of the palace, and guides provide commentary about its history. For the most impressive view, take a sunset cruise — the palace is on the European shore and catches beautiful evening light." },
      { heading: "Atatürk's Connection", content: "Dolmabahçe Palace holds deep significance for modern Turkey. Mustafa Kemal Atatürk, the founder of the Turkish Republic, used the palace as his Istanbul residence and it was here that he passed away on November 10, 1938, at 9:05 AM. All the clocks in the palace were stopped at this time and remain so today. His bedroom, preserved exactly as it was, is one of the most visited rooms in the palace." }
    ],
    relatedTours: ["bosphorus-sunset-cruise", "bosphorus-sightseeing-cruise", "full-day-istanbul-old-city-tour"]
  },
  {
    slug: "ortakoy-mosque",
    title: "Ortaköy Mosque — Istanbul's Most Photogenic Waterfront Mosque",
    metaDescription: "Guide to Ortaköy Mosque (Büyük Mecidiye Camii) in Istanbul. History, architecture, visiting tips, and the iconic view from the Bosphorus.",
    excerpt: "Ortaköy Mosque sits at the water's edge beneath the Bosphorus Bridge — creating what is arguably Istanbul's most iconic and photographed composition.",
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&q=80",
    keywords: ["ortakoy mosque", "istanbul mosque", "bosphorus mosque", "istanbul landmarks"],
    sections: [
      { heading: "The Iconic View", content: "There are few views in Istanbul more recognizable than Ortaköy Mosque framed against the massive cables of the Bosphorus Bridge. This juxtaposition of delicate Ottoman-Baroque architecture against modern engineering has made it one of the most photographed scenes in Turkey. From a Bosphorus cruise, the mosque appears at the water's edge as your boat passes between Europe and Asia, creating an unforgettable moment." },
      { heading: "History and Architecture", content: "Officially named Büyük Mecidiye Camii, the mosque was commissioned by Sultan Abdülmecid I and completed in 1856 by Armenian architects Garabet and Nikoğos Balyan — the same architects who designed Dolmabahçe Palace. Its Neo-Baroque style features large windows that flood the interior with natural light reflected from the Bosphorus waters. The mosque is notable for its single dome and twin minarets, and its intimate scale compared to Istanbul's grand imperial mosques." },
      { heading: "The Ortaköy Neighborhood", content: "Ortaköy itself is one of Istanbul's most charming waterfront neighborhoods. The square in front of the mosque hosts a popular weekend market selling crafts, jewelry, and street food. The area's famous kumpir (stuffed baked potatoes) are a must-try Istanbul snack. The neighborhood also has excellent cafes and restaurants with Bosphorus views, making it a perfect spot to spend an afternoon before or after a cruise." },
      { heading: "Best Ways to See It", content: "From the water, Ortaköy Mosque is visible on every Bosphorus cruise as boats pass between the first bridge (15 July Martyrs Bridge) and the mosque. Sunset cruises offer the most dramatic lighting. From land, walk along the Ortaköy waterfront promenade for close-up views. The mosque is free to enter outside of prayer times, and the interior is worth seeing for its elegant proportions and luminous atmosphere." }
    ],
    relatedTours: ["bosphorus-sunset-cruise", "bosphorus-dinner-cruise", "yacht-charter-in-istanbul"]
  },
  {
    slug: "rumeli-fortress",
    title: "Rumeli Fortress (Rumeli Hisarı) — The Conqueror's Castle on the Bosphorus",
    metaDescription: "Guide to Rumeli Fortress in Istanbul. Built by Sultan Mehmed II in 1452 to conquer Constantinople. History, visiting hours, and views from the water.",
    excerpt: "Built in just four months by Sultan Mehmed the Conqueror, Rumeli Fortress stands as a powerful testament to Ottoman military engineering at the narrowest point of the Bosphorus.",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80",
    keywords: ["rumeli fortress", "rumeli hisari", "bosphorus fortress", "istanbul castle"],
    sections: [
      { heading: "A Fortress Built for Conquest", content: "In 1452, Sultan Mehmed II ordered the construction of Rumeli Hisarı at the narrowest point of the Bosphorus (just 660 meters wide) as a strategic move to cut off Byzantine Constantinople from Black Sea reinforcements and grain supplies. Incredibly, the massive fortress was completed in just four months with 1,000 masons and 2,000 workers. Together with Anadolu Hisarı on the Asian shore (built by his great-grandfather in 1394), the two fortresses gave the Ottomans complete control of the strait." },
      { heading: "Architecture and Design", content: "The fortress covers 31,250 square meters and features three main towers (named after the three viziers who supervised construction), 13 smaller watchtowers, and walls up to 7 meters thick. The three cylindrical towers are connected by curtain walls that follow the contours of the hillside. The design was purely functional — cannons placed within the towers could hit any ship attempting to pass through the strait without permission. After the conquest of Constantinople in 1453, the fortress served as a customs checkpoint and later as a prison." },
      { heading: "Visiting Today", content: "Today, Rumeli Hisarı is an open-air museum and one of Istanbul's most atmospheric historical sites. The fortress grounds host summer concerts and cultural events. You can walk along the walls for dramatic views of the Bosphorus, the Fatih Sultan Mehmet Bridge above, and the Asian shore opposite. The fortress is in the Sarıyer district, accessible by bus from Kabataş or Taksim." },
      { heading: "Seeing It From the Bosphorus", content: "From a cruise boat, Rumeli Fortress is one of the most impressive sights on the Bosphorus. The massive stone walls rise steeply from the waterline, and the three towers dominate the hillside. On a sunset cruise, the fortress catches warm golden light that contrasts beautifully with the deep blue waters. Tour guides typically share the dramatic story of the 1453 conquest as you pass — a moment that changed world history." }
    ],
    relatedTours: ["bosphorus-sunset-cruise", "bosphorus-sightseeing-cruise", "bosphorus-sightseeing-yacht-cruise"]
  },
  {
    slug: "galata-bridge-eminonu",
    title: "Galata Bridge & Eminönü — Istanbul's Vibrant Waterfront Hub",
    metaDescription: "Guide to Galata Bridge and Eminönü district. Departure point for Bosphorus cruises, fish market, restaurants, and one of Istanbul's most iconic locations.",
    excerpt: "Galata Bridge spans the Golden Horn at Eminönü — the starting point for most Bosphorus cruises and one of Istanbul's most vibrant, atmospheric locations.",
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&q=80",
    keywords: ["eminonu istanbul", "galata bridge", "istanbul cruise departure", "eminonu pier"],
    sections: [
      { heading: "Eminönü — Where Istanbul's Cruises Begin", content: "Eminönü is the main departure point for Bosphorus cruises, ferries, and boat tours in Istanbul. Located at the southern end of the Galata Bridge on the European side, this bustling waterfront district has been a transportation hub for centuries. Most shared Bosphorus cruises (sunset, dinner, sightseeing) depart from piers along the Eminönü waterfront, making it easy to combine a cruise with exploring the surrounding historical district." },
      { heading: "Galata Bridge — A Bridge of Two Levels", content: "The current Galata Bridge (built 1994) is a double-deck bridge stretching 490 meters across the Golden Horn. The upper deck carries traffic and is lined with fishermen casting their lines into the waters below — one of Istanbul's most iconic scenes. The lower deck houses a row of fish restaurants where you can dine with views of the water lapping at the pillars. At sunset, the bridge offers incredible views of the Old City skyline with its mosques and minarets silhouetted against the sky." },
      { heading: "What to See in Eminönü", content: "Beyond the cruise piers, Eminönü is packed with things to see. The New Mosque (Yeni Cami, 1665) dominates the square with its grand cascading domes. The nearby Spice Bazaar (Mısır Çarşısı) is a sensory explosion of colors, aromas, and flavors — selling spices, Turkish delight, dried fruits, and teas. Don't miss the iconic balık ekmek (fish sandwich) boats rocking on the Golden Horn, where freshly grilled fish is served in bread for just a few lira." },
      { heading: "Getting to Eminönü", content: "Eminönü is one of Istanbul's most accessible locations. The T1 tramway stops directly at Eminönü, connecting it to Sultanahmet (2 stops), Kabataş, and beyond. Multiple bus routes converge here, and ferries connect to the Asian side (Kadıköy, Üsküdar). If you're coming from Taksim/Beyoğlu, take the historic Tünel funicular to Karaköy and walk across Galata Bridge. Arrive at least 15 minutes before your cruise departure time." }
    ],
    relatedTours: ["bosphorus-sunset-cruise", "bosphorus-dinner-cruise", "bosphorus-sightseeing-cruise", "istanbul-lunch-cruise"]
  },
  {
    slug: "buyukada-princes-islands",
    title: "Büyükada & the Princes' Islands — Istanbul's Car-Free Escape",
    metaDescription: "Complete guide to Büyükada and the Princes' Islands. How to get there, what to see, beaches, food, and why it's Istanbul's best day trip.",
    excerpt: "The Princes' Islands are a car-free archipelago in the Sea of Marmara — just an hour from Istanbul but a world away, with Victorian mansions, pine forests, and peaceful beaches.",
    image: "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800&q=80",
    keywords: ["princes islands", "buyukada", "istanbul islands", "princess island tour"],
    sections: [
      { heading: "What Are the Princes' Islands?", content: "The Princes' Islands (Adalar in Turkish) are an archipelago of nine islands in the Sea of Marmara, about 18km southeast of Istanbul. Only four are inhabited: Büyükada (the largest and most popular), Heybeliada, Burgazada, and Kınalıada. Named after Byzantine princes who were exiled here, the islands served as a place of banishment, a Greek Orthodox spiritual center, and later a summer retreat for Istanbul's wealthy. Today, they're car-free havens where the only transport is electric vehicles, bicycles, and walking." },
      { heading: "Büyükada — The Big Island", content: "Büyükada is the main attraction and the largest of the Princes' Islands. Its streets are lined with grand Victorian-era wooden mansions (köşks) built by Ottoman-era Greek, Armenian, and Jewish families. The Aya Yorgi Church and Monastery sits atop the island's highest hill, offering panoramic views of the Sea of Marmara and Istanbul's distant skyline. The island's beaches, particularly Yörükali, are popular swimming spots in summer. The harbor front is lined with seafood restaurants serving the day's fresh catch." },
      { heading: "How to Get There", content: "Public ferries from Kabataş (European side) or Kadıköy (Asian side) reach Büyükada in about 75–90 minutes. Faster sea bus services (İDO) take about 45 minutes. You can also take a guided Princes' Islands tour from Istanbul which includes ferry tickets, a guide, lunch, and island exploration — typically an 8-hour full-day experience. The guided tour is the most convenient option as it handles all logistics and includes commentary about the islands' history." },
      { heading: "What to Do", content: "Cycle around Büyükada's perimeter road (about 12km) for stunning coastal views. Visit the Aya Yorgi Church at the hilltop — the walk up through pine forests is beautiful. Explore the island's charming back streets with their flower-draped wooden mansions. Have a traditional Turkish lunch at a waterfront restaurant. Swim at one of the beaches (best in summer). Browse the handicraft shops along the main street. Take a horse-drawn carriage ride (phaeton) — though these are being phased out in favor of electric vehicles." },
      { heading: "Best Time to Visit", content: "Spring (April–June) and early autumn (September–October) are ideal — pleasant weather without summer crowds. Summer weekends can be extremely busy with Istanbul residents escaping the city heat. Winter visits are quiet and atmospheric, with fewer tourists and a melancholic beauty to the empty mansions. If visiting in summer, take an early morning ferry to avoid crowds and secure a good lunch spot." }
    ],
    relatedTours: ["istanbul-princes-island-tour"]
  },
  {
    slug: "kurucesme-marina",
    title: "Kuruçeşme Marina — Istanbul's Private Yacht Departure Point",
    metaDescription: "Guide to Kuruçeşme Marina in Istanbul. Private yacht charter departure point, how to get there, nearby restaurants, and what to expect.",
    excerpt: "Kuruçeşme Marina is where most private Bosphorus yacht experiences begin — a scenic marina on the European shore nestled between the Bosphorus Bridge and Ortaköy.",
    image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",
    keywords: ["kurucesme marina", "istanbul marina", "yacht departure istanbul", "private yacht istanbul"],
    sections: [
      { heading: "About Kuruçeşme Marina", content: "Kuruçeşme Marina is located on the European side of Istanbul, between Ortaköy and Arnavutköy, directly beneath the Bosphorus Bridge. This picturesque marina serves as the primary departure point for private yacht charters, marriage proposal cruises, birthday parties, and other yacht events on the Bosphorus. The marina is home to a variety of vessels — from intimate 10-person yachts to spacious luxury boats accommodating 50 guests." },
      { heading: "Getting to the Marina", content: "Kuruçeşme is easily accessible from central Istanbul. By bus, take the 25E, 40, or 42T from Kabataş or Taksim (Kuruçeşme stop). By taxi, it's about 15 minutes from Taksim Square or 20 minutes from Sultanahmet. If you've booked a VIP yacht package, private car pickup from your hotel can be arranged as an add-on. The marina has a small car park for those driving. Look for the meeting point instructions in your booking confirmation." },
      { heading: "What to Expect", content: "When you arrive at Kuruçeşme Marina for your private yacht charter, you'll be greeted by the yacht crew who will guide you to your vessel. Boarding typically begins 10–15 minutes before departure. Your yacht will be set up according to your package — Essential, Premium, or VIP — with any add-on decorations, food, or entertainment you've requested. The professional captain briefs you on safety before setting sail along one of the most beautiful waterways in the world." },
      { heading: "Nearby Attractions", content: "Before or after your yacht experience, explore the charming Kuruçeşme waterfront. Several excellent restaurants and cafes line the shore, including some of Istanbul's best fish restaurants. The nearby Ortaköy neighborhood (a 10-minute walk) offers the famous kumpir stalls, weekend craft market, and the stunning Ortaköy Mosque. The Kuruçeşme coastline also hosts open-air concerts and events during summer months." }
    ],
    relatedTours: ["yacht-charter-in-istanbul", "romantic-marriage-proposal", "yacht-birthday-party", "private-bosphorus-sunset-cruise"]
  },
  {
    slug: "golden-horn",
    title: "The Golden Horn — Istanbul's Historic Natural Harbor",
    metaDescription: "Guide to the Golden Horn (Haliç) in Istanbul. History, landmarks, parks, and how this famous inlet connects to the Bosphorus cruise experience.",
    excerpt: "The Golden Horn is Istanbul's ancient natural harbor — a curved inlet where the Byzantine fleet was once anchored and where the city's story began thousands of years ago.",
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&q=80",
    keywords: ["golden horn istanbul", "halic istanbul", "istanbul harbor", "golden bosphorus"],
    sections: [
      { heading: "What is the Golden Horn?", content: "The Golden Horn (Haliç in Turkish) is a natural inlet of the Bosphorus, forming the primary inlet of Istanbul. It curves northwest from the point where the Bosphorus meets the Sea of Marmara, creating a horn-shaped harbor about 7.5 kilometers long. The name 'Golden Horn' may derive from the golden glow of sunlight reflecting off the water at sunset, or from the wealth that once flowed through its harbors. This waterway divides the European side of Istanbul into the Old City (south) and Beyoğlu/Galata (north)." },
      { heading: "Historical Significance", content: "The Golden Horn has been central to Istanbul's strategic importance for over 2,500 years. The Byzantines protected it with a massive chain stretched across its mouth, famously breached by Sultan Mehmed II who dragged his ships overland through Galata in 1453. The inlet served as the primary port of the Ottoman Empire, with shipyards at Kasımpaşa producing the imperial fleet. During the 20th century, industrial pollution severely degraded the waterway, but major cleanup efforts since the 1990s have restored much of its beauty." },
      { heading: "Landmarks Along the Golden Horn", content: "Several of Istanbul's key landmarks line the Golden Horn. The Galata Bridge spans its mouth, connecting Eminönü to Karaköy. Further up, the Fener and Balat neighborhoods preserve Ottoman-era Greek and Jewish heritage with colorful houses and ancient churches. The Eyüp Sultan Mosque, one of Islam's holiest sites, sits at the upper end. Miniaturk — a miniature park with scale models of Turkey's landmarks — and the Rahmi Koç Museum of industry and technology are also along its shores." },
      { heading: "The Golden Horn Today", content: "Today, the Golden Horn is lined with parks, walking paths, and cultural spaces. The Haliç Congress Center hosts events, while the Santral Istanbul arts center (in a converted power plant) brings creative energy to the area. Ferry services run along the Golden Horn from Eminönü to Eyüp, offering a scenic alternative to road transport. While Bosphorus cruises typically head north along the strait, the Golden Horn's entrance at Eminönü is visible from the departure pier and the Galata Bridge area." }
    ],
    relatedTours: ["bosphorus-sunset-cruise", "bosphorus-sightseeing-cruise", "full-day-istanbul-old-city-tour"]
  },
  {
    slug: "istanbul-bosphorus-bridges",
    title: "Istanbul's Three Bosphorus Bridges — Engineering Wonders Connecting Continents",
    metaDescription: "Guide to Istanbul's three Bosphorus bridges. History, engineering facts, and the experience of sailing beneath them on a Bosphorus cruise.",
    excerpt: "Three magnificent suspension bridges span the Bosphorus, connecting Europe and Asia — and sailing beneath them on a cruise is one of Istanbul's most thrilling experiences.",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80",
    keywords: ["bosphorus bridge", "istanbul bridge", "bosphorus bridges", "istanbul landmarks"],
    sections: [
      { heading: "Three Bridges, Two Continents", content: "Istanbul is connected across the Bosphorus by three suspension bridges — each a feat of engineering and each with its own character. Together, they carry hundreds of thousands of vehicles daily between the European and Asian sides of the city. For cruise passengers, sailing beneath these massive structures is a highlight, with the bridge cables soaring overhead and the scale of the engineering creating a sense of awe that photographs rarely capture." },
      { heading: "15 July Martyrs Bridge (First Bridge)", content: "Originally called the Bosphorus Bridge, this was the first bridge to span the strait when it opened in 1973 on the 50th anniversary of the Turkish Republic. Stretching 1,560 meters with a main span of 1,074 meters, it was the 4th longest suspension bridge in the world at the time. Renamed after the failed 2016 coup attempt, it is illuminated at night with colorful LED lights that create stunning reflections on the water — a highlight of any dinner or night cruise. The bridge connects Ortaköy on the European side to Beylerbeyi on the Asian side." },
      { heading: "Fatih Sultan Mehmet Bridge (Second Bridge)", content: "Completed in 1988 and named after Sultan Mehmed the Conqueror, this bridge spans the narrowest point of the Bosphorus. At 1,510 meters long, it sits between the two great Ottoman fortresses — Rumeli Hisarı and Anadolu Hisarı — that were built to control this strategic point. The bridge's sleek design and dramatic setting between the fortresses make it particularly photogenic on a Bosphorus cruise, especially during sunset when the light catches the cables against the sky." },
      { heading: "Yavuz Sultan Selim Bridge (Third Bridge)", content: "The newest and most impressive of the three, the Yavuz Sultan Selim Bridge opened in 2016 near the Black Sea entrance of the Bosphorus. It is the widest suspension bridge in the world at 59 meters, carrying 8 lanes of traffic and 2 railway lines. Named after Sultan Selim I, it was designed by architect Michel Virlogeux (who also designed France's famous Millau Viaduct). While standard Bosphorus cruises typically don't reach this far north, extended yacht charters and full Bosphorus tours pass beneath it." },
      { heading: "Experiencing the Bridges by Cruise", content: "On a typical Bosphorus cruise, you'll pass under the First Bridge and often approach the Second Bridge before turning back. The experience of looking up as you glide beneath the massive structure is remarkable — the bridge seems to stretch infinitely overhead. At night, the First Bridge's LED display creates a rainbow of colors reflected in the black water. For photographers, the bridges make excellent framing elements for skyline shots and are particularly dramatic at sunset." }
    ],
    relatedTours: ["bosphorus-sunset-cruise", "bosphorus-dinner-cruise", "bosphorus-sightseeing-cruise", "yacht-charter-in-istanbul"]
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getAllGuideSlugs(): string[] {
  return guides.map((g) => g.slug);
}
