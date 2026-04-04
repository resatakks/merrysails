"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { getTourBySlug } from "@/data/tours";
import { getDiscountedPrice } from "@/lib/promo";

export default function MobileBookingBar() {
  const pathname = usePathname();

  // Detect current tour page
  const slugMatch = pathname.match(/^\/cruises\/([^/]+)$/);
  const currentTour = slugMatch ? getTourBySlug(slugMatch[1]) : null;

  const originalPrice = currentTour?.priceEur ?? 40;
  const displayPrice = getDiscountedPrice(originalPrice);
  const bookHref = currentTour
    ? `/cruises/${currentTour.slug}`
    : "/cruises/bosphorus-sunset-cruise";
  const label = currentTour ? currentTour.nameEn : "Sunset Cruise";

  return (
    <div className="mobile-bar lg:hidden">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs text-[var(--text-muted)] truncate">{label}</div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-[var(--heading)]">
              €{displayPrice}
            </span>
            <span className="text-sm text-[var(--text-muted)] line-through">
              €{originalPrice}
            </span>
            <span className="text-xs text-[var(--text-muted)]">/person</span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://wa.me/905370406822"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-11 h-11 rounded-xl bg-[var(--brand-whatsapp)] text-white"
          >
            <Phone className="w-5 h-5" />
          </a>
          <Link href={bookHref}>
            <button className="btn-cta text-sm !py-2.5 !px-5">Book Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
