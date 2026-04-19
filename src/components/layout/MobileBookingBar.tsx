"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getBookingMode,
  getPriceSuffix,
  getTourPath,
  isPricingVisible,
  tours,
} from "@/data/tours";
import SalePrice from "@/components/ui/SalePrice";

export default function MobileBookingBar() {
  const pathname = usePathname();

  const currentTour =
    tours.find((tour) => getTourPath(tour) === pathname) ??
    tours.find((tour) => `/cruises/${tour.slug}` === pathname) ??
    null;

  if (!currentTour || !isPricingVisible(currentTour) || getBookingMode(currentTour) !== "book") {
    return null;
  }

  const displayPrice = currentTour.priceEur;
  const bookHref = getTourPath(currentTour);
  const label = currentTour.nameEn;
  const priceSuffix = getPriceSuffix(currentTour);

  return (
    <div className="mobile-bar lg:hidden">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs text-[var(--text-muted)] truncate">{label}</div>
          <SalePrice
            price={displayPrice}
            originalPrice={currentTour.originalPriceEur}
            suffix={priceSuffix}
            size="sm"
            className="mt-0.5"
          />
        </div>
        <div className="shrink-0">
          <Link href={bookHref}>
            <button className="btn-cta text-sm !py-2.5 !px-4">Continue Booking</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
