import Link from "next/link";
import Image from "next/image";
import { Clock, Users, MapPin, Globe, Check } from "lucide-react";
import type { Tour } from "@/data/tours";

interface Props {
  tour: Tour;
  reverse?: boolean;
}

export default function FeaturedTour({ tour, reverse = false }: Props) {
  return (
    <section className="py-16 md:py-20">
      <div className="container-main">
        <div className={`bg-white rounded-2xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-2`}>
          {/* Image */}
          <div className={`relative min-h-[350px] lg:min-h-[500px] overflow-hidden ${reverse ? "lg:order-2" : ""}`}>
            <Image
              src={tour.image}
              alt={tour.nameEn}
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute top-4 left-4">
              <span className={`inline-block px-3 py-1 text-xs font-bold rounded-md ${tour.badgeColor}`}>
                {tour.badge}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{tour.nameEn}</h2>
            <p className="text-[var(--text-muted)] mb-6">{tour.descriptionEn}</p>

            {/* Specs */}
            <div className="spec-grid mb-6">
              <div className="spec-item">
                <Clock className="w-5 h-5 text-[var(--brand-primary)] mx-auto mb-1" />
                <div className="label">Duration</div>
                <div className="value">{tour.duration}</div>
              </div>
              <div className="spec-item">
                <Users className="w-5 h-5 text-[var(--brand-primary)] mx-auto mb-1" />
                <div className="label">Guests</div>
                <div className="value">{tour.capacity}</div>
              </div>
              <div className="spec-item">
                <MapPin className="w-5 h-5 text-[var(--brand-primary)] mx-auto mb-1" />
                <div className="label">Departure</div>
                <div className="value">{tour.departureTime}</div>
              </div>
              <div className="spec-item">
                <Globe className="w-5 h-5 text-[var(--brand-primary)] mx-auto mb-1" />
                <div className="label">Languages</div>
                <div className="value">EN / TR</div>
              </div>
            </div>

            {/* Includes */}
            <div className="mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {tour.includes.slice(0, 6).map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-[var(--brand-gold)] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price + CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="price-box">
                <span className="currency">€</span>
                <span className="amount">{tour.priceEur}</span>
                <span className="suffix">/person</span>
                {tour.originalPriceEur && (
                  <span className="old-price">€{tour.originalPriceEur}</span>
                )}
              </div>
              <Link href={`/cruises/${tour.slug}`}>
                <button className="btn-cta">Book Now</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
