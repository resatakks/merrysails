import Image from "next/image";
import Link from "next/link";
import { Tour } from "@/data/tours";
import { Clock, Users, MapPin, Languages, Check } from "lucide-react";

interface FeaturedTourProps {
  tour: Tour;
  reverse?: boolean;
}

export default function FeaturedTour({ tour, reverse = false }: FeaturedTourProps) {
  return (
    <section className="featured-section">
      <div className="max-w-[1290px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden bg-white shadow-lg">
          {/* Image Side */}
          <div className={`feat-img relative min-h-[350px] lg:min-h-[500px] ${reverse ? "lg:order-2" : ""}`}>
            <Image
              src={tour.image}
              alt={tour.nameEn}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Content Side */}
          <div className={`p-8 lg:p-10 flex flex-col justify-center ${reverse ? "lg:order-1" : ""}`}>
            {/* Badge */}
            {tour.badge && (
              <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase mb-4 self-start ${tour.badgeColor}`}
              >
                {tour.badge}
              </span>
            )}

            {/* Title */}
            <h2 className="text-heading text-2xl lg:text-3xl font-bold mb-3">{tour.nameEn}</h2>

            {/* Description */}
            <p className="text-text-light mb-6">{tour.descriptionEn}</p>

            {/* Spec Grid */}
            <div className="spec-grid grid grid-cols-2 gap-4 mb-6">
              <div className="spec-item flex items-center gap-3 bg-bg rounded-xl p-3">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-text-light">Duration</p>
                  <p className="text-sm font-semibold text-heading">{tour.duration}</p>
                </div>
              </div>
              <div className="spec-item flex items-center gap-3 bg-bg rounded-xl p-3">
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-text-light">Guests</p>
                  <p className="text-sm font-semibold text-heading">{tour.capacity}</p>
                </div>
              </div>
              <div className="spec-item flex items-center gap-3 bg-bg rounded-xl p-3">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-text-light">Departure</p>
                  <p className="text-sm font-semibold text-heading">{tour.departureTime}</p>
                </div>
              </div>
              <div className="spec-item flex items-center gap-3 bg-bg rounded-xl p-3">
                <Languages className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-text-light">Guide</p>
                  <p className="text-sm font-semibold text-heading">English & Turkish</p>
                </div>
              </div>
            </div>

            {/* Includes */}
            {tour.includes && tour.includes.length > 0 && (
              <ul className="space-y-2 mb-6">
                {tour.includes.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-heading">
                    <Check className="w-4 h-4 text-secondary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {/* Price Box */}
            <div className="price-box rounded-xl p-5 mb-6">
              <div className="flex items-baseline gap-1">
                <span className="currency text-white/60 text-lg">€</span>
                <span className="amount text-white text-4xl font-bold">{tour.priceEur}</span>
                <span className="suffix text-white/60 text-sm">/person</span>
              </div>
              {tour.originalPriceEur && (
                <p className="text-white/50 text-sm mt-1">
                  <s>€{tour.originalPriceEur}</s>
                </p>
              )}
            </div>

            {/* CTA */}
            <Link href={`/cruises/${tour.slug}`} className="btn-cta inline-block text-center">
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
