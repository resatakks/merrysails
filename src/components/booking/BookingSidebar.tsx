"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { format } from "date-fns";
import {
  Check,
  Phone,
  Crown,
  Star,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Package, AddOn } from "@/data/tours";
import BookingCalendar from "./BookingCalendar";
import BookingModal from "./BookingModal";

interface Props {
  tour: {
    slug: string;
    nameEn: string;
    name: string;
    priceEur: number;
    departureTime?: string;
    departurePoint?: string;
    image: string;
    packages?: Package[];
    addOns?: AddOn[];
  };
  /** The effective (possibly promo) base price */
  effectivePrice: number;
  /** Currently selected package — controlled from parent */
  selectedPackage?: Package;
  onSelectPackage?: (pkg: Package) => void;
  /** Currently selected add-ons — controlled from parent */
  selectedAddOns: AddOn[];
}

export default function BookingSidebar({
  tour,
  effectivePrice,
  selectedPackage,
  onSelectPackage,
  selectedAddOns,
}: Props) {
  const [bookingModal, setBookingModal] = useState(false);
  const [bookingDate, setBookingDate] = useState<Date | null>(null);
  const [bookingGuests, setBookingGuests] = useState(2);
  const [bookingTime, setBookingTime] = useState("");
  const [showMobileBar, setShowMobileBar] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const price = selectedPackage?.price ?? effectivePrice;

  // Track sidebar visibility for mobile bar
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowMobileBar(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const el = sidebarRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  const handleBook = useCallback(
    (date: Date, guests: number, time: string) => {
      setBookingDate(date);
      setBookingGuests(guests);
      setBookingTime(time);
      setBookingModal(true);
    },
    []
  );

  const handleMobileBookClick = () => {
    if (sidebarRef.current) {
      sidebarRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setShowMobileBar(false);
    }
  };

  const hasPackages = tour.packages && tour.packages.length > 0;

  return (
    <>
      {/* Desktop sticky sidebar */}
      <div ref={sidebarRef} className="lg:col-span-1">
        <div className="sticky top-[100px] space-y-4">
          {/* Package Selection Cards */}
          {hasPackages && (
            <div className="bg-white rounded-2xl shadow-sm border border-[var(--line)] overflow-hidden">
              <div className="p-5 pb-3">
                <h3 className="font-bold text-[var(--heading)] text-sm uppercase tracking-wider">
                  Choose Your Package
                </h3>
              </div>
              <div className="px-5 pb-5 space-y-3">
                {tour.packages!.map((pkg, i) => {
                  const isSelected = selectedPackage?.name === pkg.name;
                  const isPopular = i === 1;

                  return (
                    <motion.button
                      key={pkg.name}
                      onClick={() => onSelectPackage?.(pkg)}
                      className={`relative w-full text-left rounded-xl border-2 p-4 transition-all ${
                        isSelected
                          ? "border-[var(--brand-primary)] bg-[var(--brand-primary)]/5 shadow-md"
                          : "border-[var(--line)] hover:border-[var(--brand-primary)]/30"
                      }`}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Popular badge */}
                      {isPopular && (
                        <div className="absolute -top-2.5 left-4">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[var(--brand-gold)] text-white text-[10px] font-bold rounded-full uppercase tracking-wider shadow-sm">
                            <Star className="w-3 h-3 fill-current" />
                            Most Popular
                          </span>
                        </div>
                      )}

                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-[var(--heading)]">
                              {pkg.name}
                            </h4>
                            {pkg.name.toLowerCase().includes("vip") && (
                              <Crown className="w-4 h-4 text-[var(--brand-gold)]" />
                            )}
                          </div>
                          <p className="text-xs text-[var(--text-muted)] mt-0.5 line-clamp-1">
                            {pkg.description}
                          </p>
                        </div>
                        <div className="text-right ml-3 shrink-0">
                          <div className="text-lg font-bold text-[var(--heading)]">
                            €{pkg.price}
                          </div>
                          <div className="text-[10px] text-[var(--text-muted)]">
                            /person
                          </div>
                        </div>
                      </div>

                      {/* Features — show on selected */}
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <ul className="mt-3 pt-3 border-t border-[var(--brand-primary)]/15 space-y-1.5">
                              {pkg.features.map((f) => (
                                <li
                                  key={f}
                                  className="flex items-start gap-2 text-xs"
                                >
                                  <Check className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                                  <span className="text-[var(--body-text)]">
                                    {f}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Selected checkmark */}
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[var(--brand-primary)] flex items-center justify-center"
                        >
                          <Check className="w-3.5 h-3.5 text-white" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Calendar / Booking Widget */}
          <BookingCalendar
            tourSlug={tour.slug}
            priceEur={price}
            tourName={tour.nameEn}
            departureTime={tour.departureTime}
            departurePoint={tour.departurePoint}
            onBook={handleBook}
          />

          {/* Help card */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[var(--line)]">
            <p className="text-sm font-medium mb-3">Need help choosing?</p>
            <a
              href="https://wa.me/905370406822"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-[#25D366] text-white font-semibold text-sm hover:brightness-110 transition-all"
            >
              <Phone className="w-4 h-4" />
              Chat on WhatsApp
            </a>
            <a
              href="tel:+905370406822"
              className="flex items-center justify-center gap-2 w-full py-2.5 mt-2 rounded-full border border-[var(--line)] text-[var(--body-text)] font-medium text-sm hover:bg-gray-50 transition-all"
            >
              <Phone className="w-4 h-4" />
              +90 537 040 68 22
            </a>
          </div>
        </div>
      </div>

      {/* Mobile floating bottom bar */}
      <AnimatePresence>
        {showMobileBar && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-[70] lg:hidden"
          >
            <div className="bg-white border-t border-[var(--line)] shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
              {/* Expandable package selector for mobile */}
              <AnimatePresence>
                {mobileExpanded && hasPackages && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden border-b border-[var(--line)]"
                  >
                    <div className="p-4 space-y-2 max-h-[40vh] overflow-y-auto">
                      <div className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                        Select Package
                      </div>
                      {tour.packages!.map((pkg, i) => {
                        const isSelected =
                          selectedPackage?.name === pkg.name;
                        const isPopular = i === 1;
                        return (
                          <button
                            key={pkg.name}
                            onClick={() => {
                              onSelectPackage?.(pkg);
                              setMobileExpanded(false);
                            }}
                            className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all text-left ${
                              isSelected
                                ? "border-[var(--brand-primary)] bg-[var(--brand-primary)]/5"
                                : "border-[var(--line)]"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {isSelected && (
                                <div className="w-5 h-5 rounded-full bg-[var(--brand-primary)] flex items-center justify-center">
                                  <Check className="w-3 h-3 text-white" />
                                </div>
                              )}
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="font-semibold text-sm">
                                    {pkg.name}
                                  </span>
                                  {isPopular && (
                                    <span className="px-1.5 py-0.5 bg-[var(--brand-gold)] text-white text-[9px] font-bold rounded-full">
                                      POPULAR
                                    </span>
                                  )}
                                </div>
                                <span className="text-xs text-[var(--text-muted)]">
                                  {pkg.description}
                                </span>
                              </div>
                            </div>
                            <span className="font-bold text-[var(--heading)] ml-2">
                              €{pkg.price}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Main bar */}
              <div className="px-4 py-3 flex items-center justify-between safe-area-bottom">
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-[var(--text-muted)]">
                      From
                    </span>
                    <span className="text-xl font-bold text-[var(--heading)]">
                      €{price}
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">
                      /person
                    </span>
                  </div>
                  {hasPackages && (
                    <button
                      onClick={() => setMobileExpanded(!mobileExpanded)}
                      className="flex items-center gap-1 text-xs text-[var(--brand-primary)] font-medium mt-0.5"
                    >
                      {selectedPackage?.name || "Select package"}
                      {mobileExpanded ? (
                        <ChevronDown className="w-3 h-3" />
                      ) : (
                        <ChevronUp className="w-3 h-3" />
                      )}
                    </button>
                  )}
                </div>
                <motion.button
                  onClick={handleMobileBookClick}
                  className="px-6 py-3 rounded-full bg-[var(--brand-primary)] text-white font-bold text-sm hover:brightness-110 transition-all shadow-lg"
                  whileTap={{ scale: 0.95 }}
                >
                  Book Now
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      <AnimatePresence>
        {bookingModal && bookingDate && (
          <BookingModal
            booking={{
              tourName: tour.nameEn,
              tourSlug: tour.slug,
              date: format(bookingDate, "dd MMM yyyy"),
              time: bookingTime,
              guests: bookingGuests,
              selectedPackage,
              selectedAddOns,
              basePrice: effectivePrice,
              departurePoint: tour.departurePoint,
              tourImage: tour.image,
            }}
            onClose={() => setBookingModal(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
