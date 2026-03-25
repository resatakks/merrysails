import { Star } from "lucide-react";

const reviews = [
  {
    name: "Marco B.",
    country: "Italy",
    rating: 5,
    text: "Incredible sunset cruise! The views of the Bosphorus were breathtaking and the crew was very professional. Best €20 I've ever spent.",
    date: "2024-09-15",
  },
  {
    name: "Sophie L.",
    country: "France",
    rating: 5,
    text: "We booked the dinner cruise for our anniversary. The food was delicious, the entertainment was amazing, and the staff made us feel so special.",
    date: "2024-10-20",
  },
  {
    name: "Ahmed K.",
    country: "UAE",
    rating: 5,
    text: "Private yacht was perfect for our family gathering. Captain was friendly, the boat was clean and comfortable. Highly recommended!",
    date: "2024-11-08",
  },
  {
    name: "Emma W.",
    country: "Australia",
    rating: 4,
    text: "Beautiful sunset views and friendly crew. The only downside was the crowded upper deck during peak hours. Would still recommend!",
    date: "2024-08-12",
  },
];

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": "https://merrysails.com/#organization",
  name: "MerrySails",
  url: "https://merrysails.com",
  image: "https://merrysails.com/og-image.jpg",
  telephone: "+905370406822",
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Alemdar Mah. Divanyolu Cad. Oğul Han No:62 İç Kapı No: 402",
    addressLocality: "Fatih",
    addressRegion: "İstanbul",
    postalCode: "34093",
    addressCountry: "TR",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: 4.9,
    ratingCount: 312,
    reviewCount: 247,
    bestRating: 5,
    worstRating: 1,
  },
  review: reviews.map((r) => ({
    "@type": "Review",
    author: { "@type": "Person", name: r.name },
    datePublished: r.date,
    reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5, worstRating: 1 },
    reviewBody: r.text,
    itemReviewed: {
      "@type": "TravelAgency",
      "@id": "https://merrysails.com/#organization",
      name: "MerrySails",
    },
  })),
};

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-[var(--surface-alt)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      <div className="container-main">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">What Our Guests Say</h2>
          <div className="flex items-center justify-center gap-2 text-[var(--text-muted)]">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-[var(--brand-gold)] fill-[var(--brand-gold)]" />
              ))}
            </div>
            <span>4.9 from 247 reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review.name} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex gap-1 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[var(--brand-gold)] fill-[var(--brand-gold)]" />
                ))}
              </div>
              <p className="text-[var(--body-text)] text-sm leading-relaxed mb-4">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[var(--brand-primary)] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {review.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-sm text-[var(--heading)]">{review.name}</div>
                  <div className="text-xs text-[var(--text-muted)]">{review.country}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
