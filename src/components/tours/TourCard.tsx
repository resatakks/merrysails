import Image from "next/image";
import Link from "next/link";
import { Clock, Users } from "lucide-react";
import type { Tour } from "@/data/tours";

export default function TourCard({ tour }: { tour: Tour }) {
  return (
    <Link href={`/cruises/${tour.slug}`} className="tour-card block group">
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="card-overlay" />

        <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold z-10 ${tour.badgeColor}`}>
          {tour.badge}
        </span>

        <div className="absolute top-4 right-4 z-10 price-badge">
          <span className="currency">€</span>
          <span className="amount">{tour.priceEur}</span>
        </div>

        <div className="card-content absolute bottom-0 left-0 right-0 p-5 z-10">
          <h3 className="font-heading text-xl font-bold text-white leading-tight">
            {tour.name}
          </h3>
          <p className="text-white/60 text-[13px] mt-1 line-clamp-1">{tour.nameEn}</p>
          <div className="flex items-center gap-4 mt-3 text-white/50 text-sm">
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{tour.duration}</span>
            <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" />{tour.capacity}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
