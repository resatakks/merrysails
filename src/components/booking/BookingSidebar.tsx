"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { format } from "date-fns";
import {
  Check,
  Phone,
  Crown,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { AddOn, BookingMode, Package, PriceMode } from "@/data/tours";
import SalePrice from "@/components/ui/SalePrice";
import { PHONE_DISPLAY, WHATSAPP_URL } from "@/lib/constants";
import BookingCalendar from "./BookingCalendar";
import BookingModal from "./BookingModal";

interface Props {
  tour: {
    slug: string;
    nameEn: string;
    name: string;
    priceEur: number;
    originalPriceEur?: number;
    departureTime?: string;
    departurePoint?: string;
    image: string;
    packages?: Package[];
    addOns?: AddOn[];
    bookingMode: BookingMode;
    priceMode: PriceMode;
    showPricing: boolean;
    enquiryLabel?: string;
  };
  effectivePrice: number;
  selectedPackage?: Package;
  onSelectPackage?: (pkg: Package) => void;
  selectedAddOns: AddOn[];
  initialDate?: Date;
  initialGuests?: number;
  initialTime?: string;
}

export default function BookingSidebar({
  tour,
  effectivePrice,
  selectedPackage,
  onSelectPackage,
  selectedAddOns,
  initialDate,
  initialGuests,
  initialTime,
}: Props) {
  const [bookingModal, setBookingModal] = useState(false);
  const [bookingDate, setBookingDate] = useState<Date | null>(null);
  const [bookingGuests, setBookingGuests] = useState(2);
  const [bookingTime, setBookingTime] = useState("");
  const [showMobileBar, setShowMobileBar] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const price = selectedPackage?.price ?? effectivePrice;
  const currentOriginalPrice =
    price === tour.priceEur ? tour.originalPriceEur : undefined;
  const isQuote = tour.bookingMode === "quote";
  const isPerGroup = tour.priceMode === "perGroup";
  const priceUnitLabel = isPerGroup ? "/group" : "/person";

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
  const selectedPackageName = selectedPackage?.name ?? tour.packages?.[0]?.name ?? tour.nameEn;
  const quoteMessage = encodeURIComponent(
    [
      "Hi, I'd like a pricing and availability for this Bosphorus service.",
      "",
      `Service: ${tour.nameEn}`,
      `Selected option: ${selectedPackageName}`,
      selectedAddOns.length > 0
        ? `Requested add-ons: ${selectedAddOns.map((addon) => addon.name).join(", ")}`
        : "",
    ]
      .filter(Boolean)
      .join("\n")
  );

  return (
    <>
      {/* Desktop sticky sidebar */}
      <div id="booking" ref={sidebarRef} className="lg:col-span-1">
        <div className="sticky top-[100px] space-y-4">
          {!isQuote && tour.showPricing && (
            <div className="overflow-hidden rounded-2xl border border-[var(--brand-primary)]/10 bg-[linear-gradient(135deg,rgba(255,8,68,0.08),rgba(255,184,0,0.1))] p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-primary)]">
                    Current Fare
                  </div>
                  <div className="mt-2">
                    <SalePrice
                      price={price}
                      originalPrice={currentOriginalPrice}
                      suffix={priceUnitLabel}
                      size="lg"
                      showBadge={Boolean(currentOriginalPrice)}
                      showMeta={Boolean(currentOriginalPrice)}
                      metaText="Selected package stays prefilled below"
                    />
                  </div>
                </div>
                <div className="rounded-2xl bg-white/80 px-3 py-2 text-right shadow-sm">
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    Option
                  </div>
                  <div className="mt-1 text-sm font-semibold text-[var(--heading)]">
                    {selectedPackageName}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Package Selection Cards */}
          {hasPackages && (
            <div className="bg-white rounded-2xl shadow-sm border border-[var(--line)] overflow-hidden">
              <div className="p-5 pb-3">
                <h3 className="font-bold text-[var(--heading)] text-sm uppercase tracking-wider">
                  {tour.showPricing ? "Choose Your Package" : "Choose Your Service Scope"}
                </h3>
              </div>
              <div className="px-5 pb-5 space-y-3">
                {tour.packages!.map((pkg) => {
                  const isSelected = selectedPackage?.name === pkg.name;

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
                          {tour.showPricing ? (
                            <>
                              <div className="text-lg font-bold text-[var(--heading)]">
                                €{pkg.price}
                              </div>
                              <div className="text-[10px] text-[var(--text-muted)]">
                                {priceUnitLabel}
                              </div>
                            </>
                          ) : (
                            <div className="text-xs font-semibold text-[var(--brand-primary)]">
                              Price on request
                            </div>
                          )}
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

          {isQuote ? (
            <div className="bg-white rounded-2xl shadow-sm border border-[var(--line)] overflow-hidden">
              <div className="p-5 border-b border-[var(--line)]">
                <h3 className="font-bold text-[var(--heading)] text-sm uppercase tracking-wider">
                  Plan Your Tailor-Made Cruise
                </h3>
              </div>
              <div className="p-5 space-y-4">
                <div className="rounded-xl bg-[var(--surface-alt)] p-4">
                  <p className="text-sm font-semibold text-[var(--heading)]">
                    {selectedPackageName}
                  </p>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">
                    This page now works as a service-led route. We keep the package structure, but pricing is confirmed after the brief.
                  </p>
                </div>
                <a
                  href={`${WHATSAPP_URL}?text=${quoteMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cta flex w-full items-center justify-center"
                >
                  {tour.enquiryLabel || "Plan on WhatsApp"}
                </a>
                <a
                  href="mailto:info@merrysails.com"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full border border-[var(--line)] text-[var(--body-text)] font-medium text-sm hover:bg-gray-50 transition-all"
                >
                  Email Your Brief
                </a>
              </div>
            </div>
          ) : (
            <BookingCalendar
              tourSlug={tour.slug}
              priceEur={price}
              originalPriceEur={currentOriginalPrice}
              tourName={tour.nameEn}
              departureTime={tour.departureTime}
              departurePoint={tour.departurePoint}
              priceMode={tour.priceMode}
              initialDate={initialDate}
              initialGuests={initialGuests}
              initialTime={initialTime}
              onBook={handleBook}
            />
          )}

          {/* Help card */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[var(--line)]">
            <p className="text-sm font-medium mb-3">
              {isQuote ? "Need help planning?" : "Need help choosing?"}
            </p>
            <a
              href={WHATSAPP_URL}
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
              {PHONE_DISPLAY}
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
                      {tour.packages!.map((pkg) => {
                        const isSelected =
                          selectedPackage?.name === pkg.name;
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
                                <span className="font-semibold text-sm">
                                  {pkg.name}
                                </span>
                                <span className="text-xs text-[var(--text-muted)]">
                                  {pkg.description}
                                </span>
                              </div>
                            </div>
                            <span className="font-bold text-[var(--heading)] ml-2">
                              {tour.showPricing ? `€${pkg.price}` : "Quote"}
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
                  {tour.showPricing ? (
                    <SalePrice
                      price={price}
                      originalPrice={currentOriginalPrice}
                      suffix={priceUnitLabel}
                      label="From"
                      size="sm"
                    />
                  ) : (
                    <div className="text-sm font-semibold text-[var(--heading)]">
                      Tailor-made plan
                    </div>
                  )}
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
                  onClick={
                    isQuote
                      ? () => window.open(`${WHATSAPP_URL}?text=${quoteMessage}`, "_blank")
                      : handleMobileBookClick
                  }
                  className="px-6 py-3 rounded-full bg-[var(--brand-primary)] text-white font-bold text-sm hover:brightness-110 transition-all shadow-lg"
                  whileTap={{ scale: 0.95 }}
                >
                  {isQuote ? "Continue" : "Continue Booking"}
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
