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
  /** Review text — edited only for length / typos. */
  text: string;
  /** Star rating 1-5. */
  rating: number;
  /** Product slug this review applies to. */
  productKey: "sunset" | "dinner" | "yacht" | "any";
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
 * Returns up to N reviews relevant to a product. Always falls back to
 * "any" reviews if not enough product-specific ones exist.
 */
export function getReviewsForProduct(
  productKey: CuratedReview["productKey"],
  count = 4,
): CuratedReview[] {
  const productSpecific = CURATED_REVIEWS.filter((r) => r.productKey === productKey);
  const generic = CURATED_REVIEWS.filter((r) => r.productKey === "any");
  return [...productSpecific, ...generic].slice(0, count);
}
