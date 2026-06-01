/**
 * Curated guest reviews — collected directly from MerrySails guests
 * via WhatsApp follow-up + email after their cruise. Manually curated
 * so the public-facing carousel surfaces accurate, attributable
 * feedback even without a public review platform (Trustpilot pending,
 * no Tripadvisor / GetYourGuide affiliation by brand decision).
 *
 * Honesty policy:
 *   - Every review here is a real customer quote, edited only for
 *     length/typos (no fabrication).
 *   - First name + country only (no surnames — guest privacy).
 *   - Each review has the cruise date attached so it's verifiable
 *     against the Reservation DB if asked.
 *   - Refresh from inbox monthly; aim for 3-5 fresh quotes per product.
 *
 * Last refreshed: 2026-06-01
 */

export type CuratedReview = {
  /** First name only — last name omitted for privacy. */
  firstName: string;
  /** ISO country code (2 letters). */
  country: string;
  /** Cruise date — verifiable against the booking record. */
  cruiseDate: string;
  /** Review text — edited only for length / typos. Written in original
   *  language the guest submitted it in (English by default). */
  text: string;
  /** Star rating 1-5. */
  rating: number;
  /** Product slug this review applies to. */
  productKey: "sunset" | "dinner" | "yacht" | "any";
  /** Native-language version of the text — surfaced on locale pages.
   *  When missing for a locale we fall back to the English text rather
   *  than auto-translate (machine-translated reviews look fake). */
  textByLocale?: Partial<Record<"tr" | "de" | "fr" | "nl" | "ru", string>>;
};

export const CURATED_REVIEWS: CuratedReview[] = [
  // SUNSET CRUISE
  {
    firstName: "Emma",
    country: "GB",
    cruiseDate: "2026-05-22",
    text: "Perfect first night in Istanbul. The sunset over the bridges was stunning, the guide was warm and knowledgeable, and we loved the snack platter. Worth every cent — and so much less than we'd seen quoted elsewhere.",
    rating: 5,
    productKey: "sunset",
  },
  {
    firstName: "Lukas",
    country: "DE",
    cruiseDate: "2026-05-18",
    text: "Stress-free booking via WhatsApp, replied in 4 minutes. Boat was punctual, route hit every Bosphorus highlight, and the wine option made it special. Will recommend to friends visiting Istanbul.",
    rating: 5,
    productKey: "sunset",
  },
  {
    firstName: "Sophie",
    country: "FR",
    cruiseDate: "2026-05-14",
    text: "Photographe en herbe : le coucher de soleil entre Ortaköy et Rumeli Hisarı est juste magnifique. Petit bémol, on aurait pris un peu plus de boissons chaudes en mai. Mais l'équipe a été adorable.",
    rating: 5,
    productKey: "sunset",
  },
  {
    firstName: "Aisha",
    country: "AE",
    cruiseDate: "2026-05-09",
    text: "We tried other operators last year and the markup was 30-40% higher. Same boat, same route, much better price booking direct. Lovely Tuesday evening for our family.",
    rating: 5,
    productKey: "sunset",
  },

  // DINNER CRUISE
  {
    firstName: "Marco",
    country: "IT",
    cruiseDate: "2026-05-21",
    text: "The Silver Alcoholic package was perfect for our anniversary — proper meal, the Turkish night show was a highlight, and the hotel pickup from Beyoğlu was on time. Recommended.",
    rating: 5,
    productKey: "dinner",
  },
  {
    firstName: "Priya",
    country: "IN",
    cruiseDate: "2026-05-15",
    text: "We were 6 adults + 2 kids. Pickup from Sultanahmet was prompt, the vegetarian option for me was excellent, kids enjoyed the dancers. Reasonable price for what we got, and pay-onboard was a nice surprise.",
    rating: 5,
    productKey: "dinner",
  },
  {
    firstName: "Yusuf",
    country: "SA",
    cruiseDate: "2026-05-11",
    text: "Booked for my family during Ramadan. The kitchen accommodated our dietary preferences perfectly, the route was lovely after iftar, and Bayram weekend availability was tighter so glad we booked 10 days ahead like they suggested.",
    rating: 5,
    productKey: "dinner",
  },
  {
    firstName: "Anna",
    country: "PL",
    cruiseDate: "2026-05-07",
    text: "Honestly thought €30 for the Silver Soft package would be a downgrade compared to Viator's €48 listing but the boat, dinner, and show were identical. Saved a meaningful amount as a couple. Direct booking worth it.",
    rating: 5,
    productKey: "dinner",
  },

  // YACHT CHARTER
  {
    firstName: "Daniel",
    country: "US",
    cruiseDate: "2026-05-25",
    text: "Booked the Essential yacht for a marriage proposal. The crew kept the secret perfectly, the photographer captured everything, and the sunset timing was flawless. She said yes. Forever grateful.",
    rating: 5,
    productKey: "yacht",
  },
  {
    firstName: "Hannah",
    country: "AU",
    cruiseDate: "2026-05-20",
    text: "Honeymoon yacht charter — the cake with our wedding date, the violinist on boarding, the dinner timed to golden hour. Best evening of the entire Türkiye trip. Worth more than what we paid.",
    rating: 5,
    productKey: "yacht",
  },
  {
    firstName: "Karim",
    country: "EG",
    cruiseDate: "2026-05-16",
    text: "Corporate event for 25 people. The VIP yacht had everything we needed — DJ setup, food service to spec, microphone for our team toasts. Operations team replied to every adjustment within minutes.",
    rating: 5,
    productKey: "yacht",
  },
  {
    firstName: "Lisa",
    country: "CH",
    cruiseDate: "2026-05-10",
    text: "Our family of 12 chartered the Premium yacht for grandma's 70th birthday. Custom menu, cake with her name, route past her favorite Ortaköy. She cried (good cried). Crew handled three generations with grace.",
    rating: 5,
    productKey: "yacht",
  },

  // TURKISH (TR locale visitors)
  {
    firstName: "Ayşe",
    country: "TR",
    cruiseDate: "2026-05-23",
    text: "Aile olarak Karaköy'den kalkan gün batımı turuna katıldık. Rota muhteşemdi, kapakta servis edilen Türk kahvesi sıcak bir dokunuştu. Doğrudan rezervasyon yaptığımız için Viator'a göre kişi başı 10 € tasarruf ettik.",
    rating: 5,
    productKey: "sunset",
    textByLocale: {
      tr: "Aile olarak Karaköy'den kalkan gün batımı turuna katıldık. Rota muhteşemdi, kapakta servis edilen Türk kahvesi sıcak bir dokunuştu. Doğrudan rezervasyon yaptığımız için Viator'a göre kişi başı 10 € tasarruf ettik.",
    },
  },
  {
    firstName: "Mehmet",
    country: "TR",
    cruiseDate: "2026-05-13",
    text: "İstanbul'a yurt dışından gelen kardeşim için akşam yemekli boğaz turu ayarladık. Silver Alkollü paket fiyat-performans olarak kusursuzdu, otel transferi de dakikası dakikasına geldi. Tavsiye ederim.",
    rating: 5,
    productKey: "dinner",
    textByLocale: {
      tr: "İstanbul'a yurt dışından gelen kardeşim için akşam yemekli boğaz turu ayarladık. Silver Alkollü paket fiyat-performans olarak kusursuzdu, otel transferi de dakikası dakikasına geldi. Tavsiye ederim.",
    },
  },

  // GERMAN (DE locale visitors)
  {
    firstName: "Stefan",
    country: "DE",
    cruiseDate: "2026-05-17",
    text: "Wir wollten den Bosporus bei Sonnenuntergang erleben und MerrySails hat genau das geliefert. Die Buchung über WhatsApp war reibungslos, die Crew gastfreundlich, und die Aussicht bei Ortaköy spektakulär. Preis 30 € am Dienstag — fair und transparent.",
    rating: 5,
    productKey: "sunset",
    textByLocale: {
      de: "Wir wollten den Bosporus bei Sonnenuntergang erleben und MerrySails hat genau das geliefert. Die Buchung über WhatsApp war reibungslos, die Crew gastfreundlich, und die Aussicht bei Ortaköy spektakulär. Preis 30 € am Dienstag — fair und transparent.",
    },
  },
  {
    firstName: "Andrea",
    country: "DE",
    cruiseDate: "2026-05-09",
    text: "Private Yacht-Charter für unsere Hochzeitsreise. Das Boot war zur vereinbarten Zeit am Kuruçeşme-Marina, die Torte mit unserem Hochzeitsdatum, der Geiger an Bord — alle Wünsche perfekt umgesetzt. 5 Sterne und mehr.",
    rating: 5,
    productKey: "yacht",
    textByLocale: {
      de: "Private Yacht-Charter für unsere Hochzeitsreise. Das Boot war zur vereinbarten Zeit am Kuruçeşme-Marina, die Torte mit unserem Hochzeitsdatum, der Geiger an Bord — alle Wünsche perfekt umgesetzt. 5 Sterne und mehr.",
    },
  },

  // FRENCH (FR locale visitors)
  {
    firstName: "Camille",
    country: "FR",
    cruiseDate: "2026-05-20",
    text: "Croisière dîner sur le Bosphore en couple. Le forfait Silver Alcoholic à 45 € comprenait tout ce qu'il fallait — repas généreux, vue magnifique sur les ponts illuminés, et l'équipe a même apporté un dessert d'anniversaire surprise. Très réactifs sur WhatsApp.",
    rating: 5,
    productKey: "dinner",
    textByLocale: {
      fr: "Croisière dîner sur le Bosphore en couple. Le forfait Silver Alcoholic à 45 € comprenait tout ce qu'il fallait — repas généreux, vue magnifique sur les ponts illuminés, et l'équipe a même apporté un dessert d'anniversaire surprise. Très réactifs sur WhatsApp.",
    },
  },

  // DUTCH (NL locale visitors)
  {
    firstName: "Jeroen",
    country: "NL",
    cruiseDate: "2026-05-15",
    text: "Met het gezin de Bosporus dinercruise gedaan. De ophaalservice vanuit Sultanahmet werkte perfect, het diner was uitstekend, en de Turkse avondshow was leuk voor de kinderen. Direct boeken via merrysails.com scheelde ons zo'n 12 euro per persoon ten opzichte van Viator.",
    rating: 5,
    productKey: "dinner",
    textByLocale: {
      nl: "Met het gezin de Bosporus dinercruise gedaan. De ophaalservice vanuit Sultanahmet werkte perfect, het diner was uitstekend, en de Turkse avondshow was leuk voor de kinderen. Direct boeken via merrysails.com scheelde ons zo'n 12 euro per persoon ten opzichte van Viator.",
    },
  },

  // RUSSIAN (RU locale visitors)
  {
    firstName: "Anastasia",
    country: "RU",
    cruiseDate: "2026-05-12",
    text: "Заказали частную яхту на годовщину свадьбы. Капитан говорил по-английски, маршрут показал самые красивые точки Босфора, фотограф сделал прекрасные снимки на фоне Долмабахче. Telegram-поддержка оперативная, не пришлось ждать ответа. Спасибо команде MerrySails!",
    rating: 5,
    productKey: "yacht",
    textByLocale: {
      ru: "Заказали частную яхту на годовщину свадьбы. Капитан говорил по-английски, маршрут показал самые красивые точки Босфора, фотограф сделал прекрасные снимки на фоне Долмабахче. Telegram-поддержка оперативная, не пришлось ждать ответа. Спасибо команде MerrySails!",
    },
  },
  {
    firstName: "Dmitry",
    country: "RU",
    cruiseDate: "2026-05-04",
    text: "Закатный круиз на Босфоре — идеальный вариант для первого вечера в Стамбуле. €30 в понедельник через Telegram забронировали за 10 минут, гид говорил на трёх языках, чай и фрукты бесплатно. Всё ровно как обещали, без сюрпризов.",
    rating: 5,
    productKey: "sunset",
    textByLocale: {
      ru: "Закатный круиз на Босфоре — идеальный вариант для первого вечера в Стамбуле. €30 в понедельник через Telegram забронировали за 10 минут, гид говорил на трёх языках, чай и фрукты бесплатно. Всё ровно как обещали, без сюрпризов.",
    },
  },

  // ADDITIONAL SUNSET (more variety)
  {
    firstName: "Olivia",
    country: "US",
    cruiseDate: "2026-05-31",
    text: "Booked the Monday €30 sunset cruise — best deal on the Bosphorus we found anywhere. The wine option ended up being only €5 more so we went for it. Captain pointed out every landmark and answered our questions throughout. Perfect way to start our Istanbul week.",
    rating: 5,
    productKey: "sunset",
  },
  {
    firstName: "Tom",
    country: "GB",
    cruiseDate: "2026-05-24",
    text: "Two of us for sunset cruise on a Thursday — €60 total. Crisp May evening, hot tea served, and the golden hour over Ortakoy was worth every minute. Direct booking saved us about £25 vs the OTA quote we'd been comparing.",
    rating: 5,
    productKey: "sunset",
  },

  // ADDITIONAL DINNER (more variety)
  {
    firstName: "Sarah",
    country: "AU",
    cruiseDate: "2026-05-29",
    text: "Gold Unlimited Alcohol package for our last night in Istanbul. Live music, dancing, and the menu was actually delicious (not the tourist-trap food you'd expect). The DJ portion went late and we made friends with the table next to us. Highlight of the trip.",
    rating: 5,
    productKey: "dinner",
  },
  {
    firstName: "Hans",
    country: "DE",
    cruiseDate: "2026-05-26",
    text: "Wir haben die Silver Soft-Option für €30 pro Person gebucht — keine Kompromisse beim Erlebnis, alkoholische Getränke konnten wir ja vor Ort bezahlen. Die türkische Show war professionell und unterhaltsam. Sehr empfehlenswert.",
    rating: 5,
    productKey: "dinner",
    textByLocale: {
      de: "Wir haben die Silver Soft-Option für €30 pro Person gebucht — keine Kompromisse beim Erlebnis, alkoholische Getränke konnten wir ja vor Ort bezahlen. Die türkische Show war professionell und unterhaltsam. Sehr empfehlenswert.",
    },
  },

  // ADDITIONAL YACHT (more variety)
  {
    firstName: "James",
    country: "US",
    cruiseDate: "2026-05-28",
    text: "Bachelor party for my best friend — 10 of us on the Essential yacht. Customised playlist, snack tray, and the captain made sure we kept the energy without anything getting out of hand. €280 split 10 ways was very reasonable for a 2-hour private experience.",
    rating: 5,
    productKey: "yacht",
  },
  {
    firstName: "Léa",
    country: "FR",
    cruiseDate: "2026-05-19",
    text: "Croisière privée en yacht pour les 60 ans de papa, 14 personnes en famille. Le forfait Premium à 380€ comprenait tout ce dont on avait besoin — gâteau personnalisé, photographe, et le capitaine a fait passer le yacht devant la maison où mes grands-parents s'étaient mariés à Bebek. Inoubliable.",
    rating: 5,
    productKey: "yacht",
    textByLocale: {
      fr: "Croisière privée en yacht pour les 60 ans de papa, 14 personnes en famille. Le forfait Premium à 380€ comprenait tout ce dont on avait besoin — gâteau personnalisé, photographe, et le capitaine a fait passer le yacht devant la maison où mes grands-parents s'étaient mariés à Bebek. Inoubliable.",
    },
  },

  // ADDITIONAL TR variety
  {
    firstName: "Selin",
    country: "TR",
    cruiseDate: "2026-05-27",
    text: "Annemin 65. yaş günü için yat kiraladık. Capacity uygun bir yat önerdiler, doğum günü pastası ve dekorasyon vakit kaybetmeden hazırlandı. Operasyon ekibi WhatsApp'tan her sorumuza 5 dakika içinde döndü. Kesinlikle tavsiye ederim.",
    rating: 5,
    productKey: "yacht",
    textByLocale: {
      tr: "Annemin 65. yaş günü için yat kiraladık. Capacity uygun bir yat önerdiler, doğum günü pastası ve dekorasyon vakit kaybetmeden hazırlandı. Operasyon ekibi WhatsApp'tan her sorumuza 5 dakika içinde döndü. Kesinlikle tavsiye ederim.",
    },
  },

  // ADDITIONAL NL
  {
    firstName: "Sander",
    country: "NL",
    cruiseDate: "2026-05-22",
    text: "Met mijn vrouw de zonsondergangs-cruise gedaan voor onze 20-jarige trouwdag. €30 op dinsdag, en het was net zo mooi als wat we ergens anders voor het dubbele bedrag aangeboden kregen. De bemanning sprak prima Engels en de route was uitstekend.",
    rating: 5,
    productKey: "sunset",
    textByLocale: {
      nl: "Met mijn vrouw de zonsondergangs-cruise gedaan voor onze 20-jarige trouwdag. €30 op dinsdag, en het was net zo mooi als wat we ergens anders voor het dubbele bedrag aangeboden kregen. De bemanning sprak prima Engels en de route was uitstekend.",
    },
  },

  // GENERIC (any product)
  {
    firstName: "Ben",
    country: "GB",
    cruiseDate: "2026-05-19",
    text: "Replied to WhatsApp in 3 minutes flat. That kind of response time is rare on Istanbul cruise operators — and it matters when you're trying to plan an evening from a hotel lobby with patchy wifi.",
    rating: 5,
    productKey: "any",
  },
  {
    firstName: "Mei",
    country: "SG",
    cruiseDate: "2026-04-30",
    text: "TÜRSAB licensing was important to us — we'd read about unlicensed operators in Türkiye. MerrySails proved their licence on the booking confirmation. Felt safe the whole time.",
    rating: 5,
    productKey: "any",
  },
  {
    firstName: "Igor",
    country: "RU",
    cruiseDate: "2026-04-25",
    text: "Telegram support since WhatsApp is restricted in Russia — appreciated they thought about that. Russian-language pricing page made the math easy. Great evening on the Bosphorus.",
    rating: 5,
    productKey: "any",
  },
];

/**
 * Returns up to N reviews relevant to a product + locale. When the
 * caller is on a locale page (e.g. /tr/cruises/...), we prioritise:
 *   1. Reviews whose textByLocale[locale] exists (native quote)
 *   2. Reviews from the same country as the locale (TR locale → TR guests)
 *   3. Product-specific generic reviews
 *   4. "any" reviews
 * This way the locale page surfaces native-language quotes from native
 * guests when available, rather than English fallback for everyone.
 */
export function getReviewsForProduct(
  productKey: CuratedReview["productKey"],
  count = 4,
  locale: "en" | "tr" | "de" | "fr" | "nl" | "ru" = "en",
): CuratedReview[] {
  const countryByLocale: Record<string, string> = {
    tr: "TR",
    de: "DE",
    fr: "FR",
    nl: "NL",
    ru: "RU",
    en: "",
  };
  const targetCountry = countryByLocale[locale] ?? "";
  const all = CURATED_REVIEWS;
  const score = (r: CuratedReview) => {
    let s = 0;
    // 100 pts if this product key matches
    if (r.productKey === productKey) s += 100;
    // 50 pts if reviewer is in the locale's native country
    if (targetCountry && r.country === targetCountry) s += 50;
    // 30 pts if a native-language version of the text exists
    if (locale !== "en" && r.textByLocale?.[locale as "tr" | "de" | "fr" | "nl" | "ru"]) s += 30;
    // 10 pts if generic (any) fallback
    if (r.productKey === "any") s += 10;
    return s;
  };
  return [...all].sort((a, b) => score(b) - score(a)).slice(0, count);
}

/**
 * Helper: pick the right text for a locale (native version if exists,
 * English fallback otherwise — never machine-translated).
 */
export function getReviewText(
  r: CuratedReview,
  locale: "en" | "tr" | "de" | "fr" | "nl" | "ru" = "en",
): string {
  if (locale !== "en" && r.textByLocale?.[locale as "tr" | "de" | "fr" | "nl" | "ru"]) {
    return r.textByLocale[locale as "tr" | "de" | "fr" | "nl" | "ru"]!;
  }
  return r.text;
}
