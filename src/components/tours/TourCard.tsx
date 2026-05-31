"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, Star } from "lucide-react";
import {
  getBookingMode,
  getPriceSuffix,
  getTourPath,
  isPricingVisible,
  type Tour,
} from "@/data/tours";
import SalePrice from "@/components/ui/SalePrice";

type CardLocale = "en" | "tr" | "de" | "fr" | "nl" | "ru";

const categoryLabels: Record<CardLocale, Record<string, string>> = {
  en: { cruise: "Cruise", private: "Private Yacht", event: "Event", tour: "Tour", organization: "Organization" },
  tr: { cruise: "Tur", private: "Özel Yat", event: "Etkinlik", tour: "Tur", organization: "Organizasyon" },
  de: { cruise: "Kreuzfahrt", private: "Private Yacht", event: "Event", tour: "Tour", organization: "Organisation" },
  fr: { cruise: "Croisière", private: "Yacht Privé", event: "Événement", tour: "Tour", organization: "Organisation" },
  nl: { cruise: "Cruise", private: "Privéjacht", event: "Evenement", tour: "Tour", organization: "Organisatie" },
  ru: { cruise: "Круиз", private: "Частная яхта", event: "Событие", tour: "Тур", organization: "Организация" },
};

const cardCopy: Record<CardLocale, { tailorMade: string; servicePage: string }> = {
  en: { tailorMade: "Tailor-made plan", servicePage: "Service page" },
  tr: { tailorMade: "Özel plan", servicePage: "Hizmet sayfası" },
  de: { tailorMade: "Maßgeschneiderter Plan", servicePage: "Service-Seite" },
  fr: { tailorMade: "Plan sur mesure", servicePage: "Page de service" },
  nl: { tailorMade: "Plan op maat", servicePage: "Servicepagina" },
  ru: { tailorMade: "Индивидуальный план", servicePage: "Страница услуги" },
};

export default function TourCard({ tour, locale = "en" }: { tour: Tour; locale?: CardLocale }) {
  const showPricing = isPricingVisible(tour);
  const bookingMode = getBookingMode(tour);
  const prefix = locale === "en" ? "" : `/${locale}`;
  const href = `${prefix}${getTourPath(tour)}`;
  const priceSuffix = getPriceSuffix(tour);
  const categoryLabel = categoryLabels[locale] ?? categoryLabels.en;
  const copy = cardCopy[locale] ?? cardCopy.en;
  // Locale-resolved display name. Tours that ship a per-locale i18n.nameEn
  // (used as the translated display name) take precedence; fall back to
  // English when no translation exists so SEO copy stays intact.
  const localizedName =
    locale !== "en"
      ? (tour.i18n as Record<string, { nameEn?: string } | undefined> | undefined)?.[locale]?.nameEn ?? tour.nameEn
      : tour.nameEn;
  const alt = showPricing
    ? `${tour.nameEn} — book from €${tour.priceEur} in Istanbul`
    : `${tour.nameEn} — Bosphorus tour in Istanbul`;

  return (
    <Link
      href={href}
      className="block group rounded-2xl overflow-hidden bg-white border border-[var(--line)] hover:shadow-xl hover:shadow-black/8 hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={tour.image}
          alt={alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

        {/* Category badge — top left */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-block px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide rounded-md bg-white/90 backdrop-blur-sm text-[var(--heading)]">
            {categoryLabel[tour.category] || tour.category}
          </span>
        </div>

        {/* Original badge — top right */}
        {tour.badge && (
          <div className="absolute top-3 right-3 z-10">
            <span
              className={`inline-block px-2.5 py-1 text-xs font-bold rounded-md ${tour.badgeColor}`}
            >
              {tour.badge}
            </span>
          </div>
        )}

        {/* Content at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
          <h3 className="text-lg font-bold text-white mb-1 leading-tight group-hover:text-[var(--brand-gold)] transition-colors">
            {localizedName}
          </h3>

          {/* Rating stars */}
          <div className="flex items-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.round(tour.rating)
                    ? "fill-[var(--brand-gold)] text-[var(--brand-gold)]"
                    : "text-white/30"
                }`}
              />
            ))}
            <span className="text-xs font-semibold text-white ml-1">
              {tour.rating}
            </span>
            <span className="text-[10px] text-white/50">
              ({tour.reviewCount})
            </span>
          </div>

          {/* Price + Duration row */}
          <div className="flex items-end justify-between">
            <div>
              {showPricing ? (
                <SalePrice
                  price={tour.priceEur}
                  originalPrice={tour.originalPriceEur}
                  suffix={priceSuffix}
                  size="sm"
                  tone="overlay"
                  showBadge={Boolean(tour.originalPriceEur)}
                  className="gap-1.5"
                />
              ) : (
                <span className="text-sm font-semibold text-[var(--brand-gold)]">
                  {bookingMode === "quote" ? copy.tailorMade : copy.servicePage}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-white/70">
              <Clock className="w-3.5 h-3.5" />
              {tour.duration}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
