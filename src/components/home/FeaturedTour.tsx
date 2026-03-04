import Image from "next/image";
import Link from "next/link";
import { Clock, Users, Calendar, Check } from "lucide-react";
import type { Tour } from "@/data/tours";

interface Props { tour: Tour; reverse?: boolean; }

export default function FeaturedTour({ tour, reverse }: Props) {
  return (
    <div className="featured-section">
      <div className={`feat-img ${reverse ? "lg:order-2" : ""}`}>
        <Image src={tour.image} alt={tour.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
      </div>
      <div className={`p-8 lg:p-12 flex flex-col justify-center ${reverse ? "lg:order-1" : ""}`}>
        <h2 className="text-heading font-bold text-xl md:text-2xl">{tour.nameEn}</h2>
        <p className="text-muted text-sm mt-1">{tour.name}</p>
        <p className="text-[var(--text)] leading-relaxed mt-4 text-[15px]">{tour.description}</p>

        <div className="spec-grid mt-6">
          <div className="spec-item"><p className="label">Duration</p><p className="value">{tour.duration}</p></div>
          <div className="spec-item"><p className="label">Max People</p><p className="value">{tour.capacity}</p></div>
          <div className="spec-item"><p className="label">Availability</p><p className="value">All Year</p></div>
          <div className="spec-item"><p className="label">Guide</p><p className="value">Included</p></div>
        </div>

        <div className="flex flex-wrap gap-2 mt-6">
          {tour.includes.slice(0, 4).map((item) => (
            <span key={item} className="flex items-center gap-1.5 text-sm text-[var(--text)]">
              <Check className="w-4 h-4 text-green-500 flex-shrink-0" />{item}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-8">
          <div className="price-box rounded-xl">
            <span className="currency">€</span>
            <span className="amount">{tour.priceEur}</span>
            <span className="suffix">/ person</span>
          </div>
          <Link href={`/cruises/${tour.slug}`} className="btn-primary">Book Now</Link>
        </div>
      </div>
    </div>
  );
}
