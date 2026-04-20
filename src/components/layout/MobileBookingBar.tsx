"use client";

import { usePathname } from "next/navigation";
import { getBookingMode, getTourPath, isPricingVisible, tours } from "@/data/tours";

export default function MobileBookingBar() {
  const pathname = usePathname();
  const currentTour =
    tours.find((tour) => getTourPath(tour) === pathname) ??
    tours.find((tour) => `/cruises/${tour.slug}` === pathname) ??
    null;

  if (!currentTour || !isPricingVisible(currentTour) || getBookingMode(currentTour) !== "book") {
    return null;
  }

  return null;
}
