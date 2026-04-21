"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check, X, MapPin, Clock, Users, Star, Shield,
  Camera, CalendarDays, Anchor, Navigation,
  Plus, Minus,
} from "lucide-react";
import {
  getBookingMode,
  getPriceMode,
  getPriceSuffix,
  isPricingVisible,
  type Tour,
  type Package,
  type AddOn,
} from "@/data/tours";
import BookingSidebar from "@/components/booking/BookingSidebar";
import ImageLightbox from "@/components/ui/ImageLightbox";
import SalePrice from "@/components/ui/SalePrice";
import TourCard from "@/components/tours/TourCard";
import SocialProof from "@/components/tours/SocialProof";
import BestPriceBadge from "@/components/tours/BestPriceBadge";
import { MAX_BOOKING_GUESTS } from "@/lib/constants";

interface Props {
  tour: Tour;
  related: Tour[];
  bookingPrefill?: {
    packageName?: string;
    date?: string;
    guests?: number;
    time?: string;
  };
}

type TabKey = "overview" | "itinerary" | "included" | "faq";

const TAB_LABELS: { key: TabKey; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "itinerary", label: "Itinerary" },
  { key: "included", label: "What's Included" },
  { key: "faq", label: "FAQ" },
];

export default function TourDetailClient({
  tour,
  related,
  bookingPrefill,
}: Props) {
  const packageParam = bookingPrefill?.packageName;
  const dateParam = bookingPrefill?.date;
  const guestsParam = bookingPrefill?.guests;
  const timeParam = bookingPrefill?.time;

  const resolvePackageSelection = () =>
    tour.packages?.find((pkg) => pkg.name === packageParam) ??
    tour.packages?.[0];

  const [selectedPackage, setSelectedPackage] = useState<Package | undefined>(
    resolvePackageSelection()
  );
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  const contentRef = useRef<HTMLDivElement>(null);

  const hasPackages = tour.packages && tour.packages.length > 0;
  const hasItinerary = tour.itinerary && tour.itinerary.length > 0;
  const hasFaq = tour.faq && tour.faq.length > 0;
  const showPricing = isPricingVisible(tour);
  const bookingMode = getBookingMode(tour);
  const priceMode = getPriceMode(tour);
  const priceSuffix = getPriceSuffix(tour);

  const allImages = [tour.image, ...tour.gallery.filter((img) => img !== tour.image)];
  const prefilledDate = useMemo(() => {
    if (!dateParam) return undefined;
    const parsed = new Date(`${dateParam}T12:00:00`);
    return Number.isNaN(parsed.getTime()) ? undefined : parsed;
  }, [dateParam]);

  const prefilledGuests = useMemo(() => {
    if (!guestsParam || guestsParam < 1) return undefined;
    return Math.min(guestsParam, MAX_BOOKING_GUESTS);
  }, [guestsParam]);
  const availableAddOns = useMemo(
    () => selectedPackage?.addOns ?? tour.addOns ?? [],
    [selectedPackage, tour.addOns]
  );
  const pickupStatus = useMemo(() => {
    const hasPickupIncluded = tour.includes.some((item) => {
      const normalized = item.toLowerCase();
      return normalized.includes("pickup") || normalized.includes("transfer");
    }
    );
    const hasPickupExcluded = tour.notIncluded?.some((item) => {
      const normalized = item.toLowerCase();
      return normalized.includes("pickup") || normalized.includes("transfer");
    }
    );

    if (hasPickupIncluded) return "Included";
    if (hasPickupExcluded) return "Optional";
    return "Check details";
  }, [tour.includes, tour.notIncluded]);

  // Build available tabs based on tour data
  const availableTabs = TAB_LABELS.filter((tab) => {
    if (tab.key === "itinerary" && !hasItinerary) return false;
    if (tab.key === "faq" && !hasFaq) return false;
    return true;
  });

  const toggleAddOn = (addon: AddOn) => {
    setSelectedAddOns((prev) =>
      prev.some((a) => a.name === addon.name)
        ? prev.filter((a) => a.name !== addon.name)
        : [...prev, addon]
    );
  };

  const handlePackageSelect = (pkg: Package) => {
    setSelectedPackage(pkg);

    const nextAvailableAddOns = pkg.addOns ?? tour.addOns ?? [];
    setSelectedAddOns((prev) =>
      prev.filter((addon) =>
        nextAvailableAddOns.some((item) => item.name === addon.name)
      )
    );
  };


  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    // Smooth scroll to content area
    if (contentRef.current) {
      const top = contentRef.current.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const basePrice = tour.priceEur;
  const effectivePrice = selectedPackage?.price ?? basePrice;
  const effectiveOriginalPrice =
    selectedPackage?.originalPrice ??
    (effectivePrice === basePrice ? tour.originalPriceEur : undefined);
  const selectedOptionLabel = hasPackages ? "Selected package" : "Current fare";
  const hasVideoPreview = Boolean(tour.videoSrc);

  return (
    <>
      {/* Hero Gallery — 3-image layout: 1 large + 2 stacked */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-2 rounded-2xl overflow-hidden mb-8 h-[280px] sm:h-[360px] md:h-[440px]">
        {/* Main large image */}
        <div
          className="md:col-span-2 relative cursor-pointer group"
          onClick={() => openLightbox(0)}
        >
          <Image
            src={allImages[0]}
            alt={`${tour.nameEn} — ${tour.route} in Istanbul`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority
            sizes="(max-width: 768px) 100vw, 66vw"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          <div className="absolute top-4 left-4 z-10">
            {tour.badge && (
              <span className={`inline-block px-3 py-1 text-xs font-bold rounded-md ${tour.badgeColor}`}>
                {tour.badge}
              </span>
            )}
          </div>
        </div>

        {/* 2 stacked images on the right */}
        <div className="hidden md:grid grid-rows-2 gap-2">
          {allImages.slice(1, 3).map((img, i) => (
            <div
              key={i}
              className="relative cursor-pointer group overflow-hidden"
              onClick={() => openLightbox(i + 1)}
            >
              <Image
                src={img}
                alt={`${tour.nameEn} ${i + 2}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>
          ))}
        </div>

        {/* "View all X photos" button overlay */}
        <button
          onClick={() => openLightbox(0)}
          className="absolute bottom-4 right-4 z-10 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg text-sm font-semibold text-[var(--heading)] shadow-md hover:bg-white transition-colors cursor-pointer"
        >
          <Camera className="w-4 h-4" />
          View all {allImages.length} photos
        </button>
      </div>

      {/* Quick Info Bar — horizontal with dividers */}
      <div className="mb-8 grid grid-cols-2 overflow-hidden rounded-2xl border border-[var(--line)] bg-white md:grid-cols-4">
        <div className="flex items-center gap-2.5 border-b border-r border-[var(--line)] px-5 py-4 md:border-b-0">
          <Clock className="w-5 h-5 text-[var(--brand-primary)] shrink-0" />
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium">Duration</div>
            <div className="text-sm font-semibold text-[var(--heading)]">{tour.duration}</div>
          </div>
        </div>
        <div className="flex items-center gap-2.5 border-b border-[var(--line)] px-5 py-4 md:border-b-0 md:border-r">
          <Users className="w-5 h-5 text-[var(--brand-primary)] shrink-0" />
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium">Max People</div>
            <div className="text-sm font-semibold text-[var(--heading)]">{tour.capacity}</div>
          </div>
        </div>
        <div className="flex items-center gap-2.5 border-r border-[var(--line)] px-5 py-4">
          <CalendarDays className="w-5 h-5 text-[var(--brand-primary)] shrink-0" />
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium">Departure</div>
            <div className="text-sm font-semibold text-[var(--heading)]">{tour.departureTime}</div>
          </div>
        </div>
        <div className="flex items-center gap-2.5 px-5 py-4">
          <Navigation className="w-5 h-5 text-[var(--brand-primary)] shrink-0" />
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium">Pick-up</div>
            <div className="text-sm font-semibold text-[var(--heading)]">
              {pickupStatus}
            </div>
          </div>
        </div>
      </div>

      {hasVideoPreview ? (
        <div className="mb-8 overflow-hidden rounded-[2rem] border border-[var(--line)] bg-white shadow-sm">
          <div className="grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="relative aspect-video bg-[#071022]">
              <video
                className="h-full w-full object-cover"
                controls
                playsInline
                preload="metadata"
                poster={tour.image}
              >
                <source src={tour.videoSrc} type="video/mp4" />
              </video>
            </div>

            <div className="flex flex-col justify-center p-6 md:p-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--brand-primary)]">
                On-board preview
              </p>
              <h2 className="mt-2 text-2xl font-bold text-[var(--heading)]">
                See the live sunset atmosphere before you book
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                This short onboard video shows the actual sunset mood, yacht feel,
                and golden-hour light of the shared Bosphorus departure.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.35rem] border border-[var(--line)] bg-[var(--surface-alt)] px-4 py-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    Departure
                  </div>
                  <div className="mt-2 text-base font-semibold text-[var(--heading)]">
                    {tour.departureTime} shared sunset sailing
                  </div>
                </div>
                <div className="rounded-[1.35rem] border border-[var(--line)] bg-[var(--surface-alt)] px-4 py-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    Experience type
                  </div>
                  <div className="mt-2 text-base font-semibold text-[var(--heading)]">
                    Small-group luxury yacht route
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="order-2 space-y-6 lg:order-1 lg:col-span-2">
          {/* Title & Rating */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">{tour.nameEn}</h1>
            <p className="text-[var(--text-muted)] mb-3">{tour.name}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.round(tour.rating) ? "text-[var(--brand-gold)] fill-[var(--brand-gold)]" : "text-gray-300"}`} />
                  ))}
                </div>
                <span className="font-semibold">{tour.rating}</span>
                <span className="text-[var(--text-muted)]">({tour.reviewCount} reviews)</span>
              </div>
            </div>
          </div>

          {showPricing && (
            <div className="rounded-2xl border border-[var(--brand-primary)]/10 bg-[linear-gradient(135deg,rgba(255,8,68,0.06),rgba(255,184,0,0.08))] p-5 md:p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-3">
                  <SalePrice
                    price={effectivePrice}
                    originalPrice={effectiveOriginalPrice}
                    suffix={priceSuffix}
                    label={selectedOptionLabel}
                    size="xl"
                    showBadge={Boolean(effectiveOriginalPrice)}
                    showMeta={Boolean(effectiveOriginalPrice)}
                    metaText="Direct booking price shown on this page"
                  />
                  <p className="max-w-2xl text-sm leading-relaxed text-[var(--body-text)]/80">
                    {selectedPackage?.name ? `${selectedPackage.name}. ` : ""}
                    We keep the booking flow focused on the live public option ladder,
                    so your selected package, date, and guest count stay together all
                    the way into the reservation step.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-white/80 px-4 py-3 shadow-sm">
                    <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                      Packages
                    </div>
                    <div className="mt-1 text-sm font-semibold text-[var(--heading)]">
                      {hasPackages ? `${tour.packages!.length} public options` : "Single public fare"}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white/80 px-4 py-3 shadow-sm">
                    <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                      Duration
                    </div>
                    <div className="mt-1 text-sm font-semibold text-[var(--heading)]">
                      {tour.duration}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white/80 px-4 py-3 shadow-sm">
                    <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                      Booking
                    </div>
                    <div className="mt-1 text-sm font-semibold text-[var(--heading)]">
                      Direct request flow
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="rounded-xl border border-[var(--line)] bg-white p-1.5 lg:sticky lg:top-20 lg:z-20">
            <div className="flex gap-1">
              {availableTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => handleTabChange(tab.key)}
                  className={`relative flex-1 py-2.5 px-3 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                    activeTab === tab.key
                      ? "text-white"
                      : "text-[var(--body-text)] hover:text-[var(--heading)] hover:bg-[var(--surface-alt)]"
                  }`}
                >
                  {activeTab === tab.key && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-[var(--brand-primary)] rounded-lg"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content with animation */}
          <div ref={contentRef}>
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  {/* Description */}
                  <div className="bg-white rounded-2xl p-6 md:p-8">
                    <h2 className="text-xl font-bold mb-4">About This Tour</h2>
                    <div className="text-[var(--body-text)] leading-relaxed whitespace-pre-line">
                      {tour.longDescription}
                    </div>
                  </div>

                  {/* Packages */}
                  {hasPackages && (
                    <div className="bg-white rounded-2xl p-6 md:p-8">
                      <h2 className="text-xl font-bold mb-6">
                        {showPricing ? "Choose Your Package" : "Choose Your Service Scope"}
                      </h2>
                      <div className={`grid grid-cols-1 gap-4 ${tour.packages!.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
                        {tour.packages!.map((pkg) => {
                          const isSelected = selectedPackage?.name === pkg.name;
                          return (
                            <button
                              key={pkg.name}
                              onClick={() => handlePackageSelect(pkg)}
                              className={`text-left rounded-xl border-2 p-5 transition-all ${
                                isSelected
                                  ? "border-[var(--brand-primary)] bg-[var(--brand-primary)]/5 shadow-md ring-2 ring-[var(--brand-primary)]/20"
                                  : "border-[var(--line)] hover:border-[var(--brand-primary)]/30"
                              }`}
                            >
                              <h3 className="text-lg font-bold mb-1">{pkg.name}</h3>
                              <p className="text-sm text-[var(--text-muted)] mb-3">{pkg.description}</p>
                              {showPricing ? (
                                <div className="mb-4">
                                  <SalePrice
                                    price={pkg.price}
                                    originalPrice={pkg.originalPrice}
                                    suffix={priceSuffix}
                                    size="md"
                                    showBadge={Boolean(pkg.originalPrice)}
                                    showMeta={Boolean(pkg.originalPrice)}
                                    metaText="Current direct booking fare"
                                  />
                                </div>
                              ) : (
                                <div className="mb-4 text-sm font-semibold text-[var(--brand-primary)]">
                                  Price on request
                                </div>
                              )}
                              <ul className="space-y-2">
                                {pkg.features.map((f) => (
                                  <li key={f} className="flex items-start gap-2 text-sm">
                                    <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                    <span>{f}</span>
                                  </li>
                                ))}
                              </ul>
                              {isSelected && (
                                <div className="mt-4 pt-3 border-t border-[var(--brand-primary)]/20 text-center">
                                  <span className="text-xs font-bold text-[var(--brand-primary)] uppercase tracking-wider">
                                    {showPricing ? "Selected" : "Selected scope"}
                                  </span>
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Add-ons */}
                  {availableAddOns.length > 0 && (
                    <div className="bg-white rounded-2xl p-6 md:p-8">
                      <h2 className="text-xl font-bold mb-4">Add-On Services</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {availableAddOns.map((addon) => {
                          const isSelected = selectedAddOns.some((a) => a.name === addon.name);
                          return (
                            <button
                              key={addon.name}
                              onClick={() => toggleAddOn(addon)}
                              className={`flex items-center justify-between py-3 px-4 rounded-xl border-2 transition-all text-left ${
                                isSelected
                                  ? "border-[var(--brand-primary)] bg-[var(--brand-primary)]/5"
                                  : "border-transparent bg-[var(--surface-alt)] hover:border-[var(--brand-primary)]/20"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-colors ${
                                  isSelected
                                    ? "bg-[var(--brand-primary)] border-[var(--brand-primary)]"
                                    : "border-gray-300"
                                }`}>
                                  {isSelected && <Check className="w-3 h-3 text-white" />}
                                </div>
                                <span className="text-sm font-medium">{addon.name}</span>
                              </div>
                              <span className="text-sm font-bold text-[var(--brand-primary)]">
                                {showPricing ? addon.price : "Available on request"}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Route & Departure */}
                  <div className="bg-white rounded-2xl p-6 md:p-8">
                    <h2 className="text-xl font-bold mb-4">Route &amp; Departure</h2>
                    <div className="flex items-center gap-2 text-[var(--body-text)] mb-3">
                      <Anchor className="w-5 h-5 text-[var(--brand-primary)] shrink-0" />
                      <span>{tour.route}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                      <MapPin className="w-4 h-4 shrink-0" />
                      Departure: {tour.departurePoint} &mdash; {tour.departureTime}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="bg-white rounded-2xl p-6 md:p-8">
                    <h2 className="text-xl font-bold mb-4">Highlights</h2>
                    <div className="flex flex-wrap gap-2">
                      {tour.highlights.map((h) => (
                        <span key={h} className="px-3 py-1.5 bg-[var(--surface-alt)] rounded-full text-sm font-medium">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  {(tour.bestFor?.length || tour.importantNotes?.length) && (
                    <div className="grid gap-6 md:grid-cols-2">
                      {tour.bestFor && tour.bestFor.length > 0 && (
                        <div className="bg-white rounded-2xl p-6 md:p-8">
                          <h2 className="text-xl font-bold mb-4">Best For</h2>
                          <div className="flex flex-wrap gap-2">
                            {tour.bestFor.map((item) => (
                              <span
                                key={item}
                                className="rounded-full bg-[var(--surface-alt)] px-3 py-2 text-sm font-medium text-[var(--body-text)]"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {tour.importantNotes && tour.importantNotes.length > 0 && (
                        <div className="bg-white rounded-2xl p-6 md:p-8">
                          <h2 className="text-xl font-bold mb-4">Important Booking Notes</h2>
                          <ul className="space-y-3">
                            {tour.importantNotes.map((note) => (
                              <li key={note} className="flex items-start gap-3 text-sm leading-relaxed text-[var(--body-text)]">
                                <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--brand-primary)]" />
                                <span>{note}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Cancellation */}
                  <div className="bg-white rounded-2xl p-6 md:p-8">
                    <div className="flex items-start gap-3">
                      <Shield className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold mb-1">Free Cancellation</h3>
                        <p className="text-sm text-[var(--text-muted)]">
                          Full refund available with 24+ hours advance notice. No questions asked.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "itinerary" && hasItinerary && (
                <motion.div
                  key="itinerary"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="bg-white rounded-2xl p-6 md:p-8">
                    <h2 className="text-xl font-bold mb-8">Tour Itinerary</h2>
                    <div className="relative">
                      {/* Continuous vertical line */}
                      <div className="absolute left-[39px] top-4 bottom-4 w-0.5 bg-[var(--brand-primary)]/15" />

                      <div className="space-y-0">
                        {tour.itinerary!.map((step, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.08 }}
                            className="flex gap-5 group"
                          >
                            {/* Time marker on left */}
                            <div className="flex flex-col items-center shrink-0 w-[80px]">
                              <div className="text-xs font-bold text-[var(--brand-primary)] mb-1.5 w-full text-right pr-4">
                                {step.time}
                              </div>
                            </div>

                            {/* Dot on the line */}
                            <div className="flex flex-col items-center shrink-0 relative">
                              <div className="w-3 h-3 rounded-full bg-[var(--brand-primary)] ring-4 ring-[var(--brand-primary)]/10 shrink-0 mt-0.5 z-10" />
                              {i < tour.itinerary!.length - 1 && (
                                <div className="w-0.5 flex-1 bg-[var(--brand-primary)]/15 my-0" />
                              )}
                            </div>

                            {/* Content */}
                            <div className={`pb-8 ${i === tour.itinerary!.length - 1 ? "pb-0" : ""} flex-1`}>
                              <h3 className="font-semibold text-[var(--heading)] mb-1 group-hover:text-[var(--brand-primary)] transition-colors">
                                {step.title}
                              </h3>
                              <p className="text-sm text-[var(--body-text)] leading-relaxed">{step.description}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "included" && (
                <motion.div
                  key="included"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="bg-white rounded-2xl p-6 md:p-8">
                    <h2 className="text-xl font-bold mb-6">What&apos;s Included</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Included column */}
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 text-green-600" />
                          </div>
                          <h3 className="font-semibold text-green-700">Included</h3>
                        </div>
                        <ul className="space-y-3">
                          {tour.includes.map((item) => (
                            <li key={item} className="flex items-start gap-3 text-sm">
                              <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-3 h-3 text-green-500" />
                              </div>
                              <span className="text-[var(--body-text)]">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Not Included column */}
                      {tour.notIncluded && tour.notIncluded.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                              <X className="w-3.5 h-3.5 text-red-500" />
                            </div>
                            <h3 className="font-semibold text-red-600">Not Included</h3>
                          </div>
                          <ul className="space-y-3">
                            {tour.notIncluded.map((item) => (
                              <li key={item} className="flex items-start gap-3 text-sm">
                                <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                                  <X className="w-3 h-3 text-red-400" />
                                </div>
                                <span className="text-[var(--text-muted)]">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "faq" && hasFaq && (
                <motion.div
                  key="faq"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="bg-white rounded-2xl p-6 md:p-8">
                    <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-3">
                      {tour.faq!.map((item, i) => {
                        const isOpen = openFaqIndex === i;
                        return (
                          <div
                            key={i}
                            className={`border rounded-xl overflow-hidden transition-colors ${
                              isOpen ? "border-[var(--brand-primary)]/30 bg-[var(--brand-primary)]/[0.02]" : "border-[var(--line)]"
                            }`}
                          >
                            <button
                              onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                              className="w-full flex items-center justify-between p-5 text-left hover:bg-[var(--surface-alt)]/50 transition-colors cursor-pointer"
                            >
                              <span className="font-medium text-sm text-[var(--heading)] pr-4">{item.question}</span>
                              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                                isOpen ? "bg-[var(--brand-primary)] text-white" : "bg-[var(--surface-alt)] text-[var(--body-text)]"
                              }`}>
                                {isOpen ? (
                                  <Minus className="w-3.5 h-3.5" />
                                ) : (
                                  <Plus className="w-3.5 h-3.5" />
                                )}
                              </div>
                            </button>
                            <AnimatePresence>
                              {isOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25 }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-5 pb-5 text-sm text-[var(--body-text)] leading-relaxed">
                                    {item.answer}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Sidebar — sticky booking area with package cards + mobile bar */}
        <div className="order-1 lg:order-2">
          <BookingSidebar
          tour={{
            slug: tour.slug,
            nameEn: tour.nameEn,
            name: tour.name,
            priceEur: tour.priceEur,
            originalPriceEur: tour.originalPriceEur,
            departureTime: tour.departureTime,
            departurePoint: tour.departurePoint,
            image: tour.image,
            packages: tour.packages,
            addOns: availableAddOns,
            bookingMode,
            priceMode,
            showPricing,
            enquiryLabel: tour.enquiryLabel,
          }}
          effectivePrice={effectivePrice}
          selectedPackage={selectedPackage}
          onSelectPackage={handlePackageSelect}
          selectedAddOns={selectedAddOns}
          initialDate={prefilledDate}
          initialGuests={prefilledGuests}
          initialTime={timeParam || undefined}
        />
          <SocialProof tourSlug={tour.slug} />
        </div>
      </div>

      {showPricing && <BestPriceBadge />}

      {/* Related tours */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((t) => (
              <TourCard key={t.id} tour={t} />
            ))}
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <ImageLightbox
          images={allImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setLightboxIndex}
          alt={tour.nameEn}
        />
      )}

    </>
  );
}
