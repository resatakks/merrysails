import Link from "next/link";
import Image from "next/image";
import { Clock, Star } from "lucide-react";
import type { Tour } from "@/data/tours";
import { isPromoActive, getSunsetPrice, SUNSET_PROMO } from "@/lib/promo";

export default function TourCard({ tour }: { tour: Tour }) {
  const promoActive = isPromoActive();
  const isSunset = tour.slug === SUNSET_PROMO.slug;
  const displayPrice = isSunset ? getSunsetPrice() : tour.priceEur;
  const showOriginal = isSunset ? promoActive : !!tour.originalPriceEur;
  const originalPrice = isSunset ? SUNSET_PROMO.regularPrice : tour.originalPriceEur;

  return (
    <Link href={`/cruises/${tour.slug}`} className="block tour-card group">
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={tour.image}
          alt={`${tour.nameEn} — Book from €${displayPrice} in Istanbul`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Badge — hide Winter Special after promo ends */}
        {!(isSunset && !promoActive) && (
          <div className="absolute top-4 left-4 z-10">
            <span className={`inline-block px-3 py-1 text-xs font-bold rounded-md ${tour.badgeColor}`}>
              {tour.badge}
            </span>
          </div>
        )}

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
          <h3 className="text-lg font-bold text-white mb-0.5 leading-tight group-hover:text-[var(--brand-gold)] transition-colors">
            {tour.nameEn}
          </h3>
          <div className="flex items-center gap-1.5 mb-2">
            <Star className="w-3.5 h-3.5 fill-[var(--brand-gold)] text-[var(--brand-gold)]" />
            <span className="text-sm font-semibold text-white">{tour.rating}</span>
            <span className="text-xs text-white/50">({tour.reviewCount})</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              {showOriginal && originalPrice && (
                <span className="text-sm text-white/50 line-through mr-2">
                  €{originalPrice}
                </span>
              )}
              <span className="text-lg font-bold text-[var(--brand-gold)]">
                {showOriginal ? "" : "From "}€{displayPrice}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-white/70">
              <Clock className="w-3.5 h-3.5" />
              {tour.duration}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
