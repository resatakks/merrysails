import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Anchor, MapPin, CalendarDays, Check } from "lucide-react";
import {
  getBookingMode,
  getPriceSuffix,
  getTourPath,
  getTourFormat,
  isPricingVisible,
  type Tour,
} from "@/data/tours";
import SalePrice from "@/components/ui/SalePrice";

interface Props {
  tour: Tour;
  reverse?: boolean;
}

export default function FeaturedTour({ tour, reverse = false }: Props) {
  const showPricing = isPricingVisible(tour);
  const href = getTourPath(tour);
  const bookingMode = getBookingMode(tour);
  const priceSuffix = getPriceSuffix(tour);
  const tourFormat = getTourFormat(tour);
  const detailCards = [
    {
      icon: Clock,
      label: "Duration",
      value: tour.duration,
    },
    {
      icon: Anchor,
      label: "Format",
      value: tourFormat,
    },
    {
      icon: MapPin,
      label: "Departure",
      value: tour.departurePoint,
    },
    {
      icon: CalendarDays,
      label: "Timing",
      value: tour.departureTime,
    },
  ];

  return (
    <section className="py-16 md:py-20">
      <div className="container-main">
        <div className="overflow-hidden rounded-[2rem] border border-[var(--line)] bg-white shadow-sm">
          <div className={`grid grid-cols-1 xl:grid-cols-[1.04fr_0.96fr]`}>
          {/* Image */}
          <div
            className={`relative min-h-[340px] overflow-hidden xl:min-h-[560px] ${reverse ? "xl:order-2" : ""}`}
          >
            <Image
              src={tour.image}
              alt={tour.nameEn}
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 1280px) 100vw, 52vw"
            />
            {tour.badge && (
              <div className="absolute top-4 left-4">
                <span className={`inline-block px-3 py-1 text-xs font-bold rounded-md ${tour.badgeColor}`}>
                  {tour.badge}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center p-6 md:p-8 xl:p-10">
            <div className="mb-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-primary)]">
                Core product
              </p>
              <h2 className="mb-3 text-2xl font-bold md:text-4xl">{tour.nameEn}</h2>
              <p className="max-w-2xl text-base leading-relaxed text-[var(--text-muted)]">
                {tour.description}
              </p>
            </div>

            <div className="mb-6 grid gap-3 sm:grid-cols-2">
              {detailCards.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.35rem] border border-[var(--line)] bg-[var(--surface-alt)] px-4 py-4"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <item.icon className="h-4 w-4 text-[var(--brand-primary)]" />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                      {item.label}
                    </span>
                  </div>
                  <p className="text-base font-semibold leading-snug text-[var(--heading)]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mb-7">
              <div className="grid grid-cols-1 gap-x-5 gap-y-3 sm:grid-cols-2">
                {tour.includes.slice(0, 6).map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-sm leading-relaxed">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-gold)]" />
                    <span className="text-[var(--body-text)]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price + CTA */}
            <div className="flex flex-col gap-4 rounded-[1.6rem] border border-[var(--line)] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                {showPricing ? (
                  <SalePrice
                    price={tour.priceEur}
                    originalPrice={tour.originalPriceEur}
                    suffix={priceSuffix}
                    label="From"
                    size="lg"
                    showBadge={Boolean(tour.originalPriceEur)}
                    showMeta={Boolean(tour.originalPriceEur)}
                    metaText="Direct booking fare"
                  />
                ) : (
                  <div className="rounded-full border border-[var(--line)] px-5 py-3 text-sm font-semibold text-[var(--body-text)]">
                    Tailor-made planning
                  </div>
                )}
              </div>
              <Link
                href={href}
                className="btn-cta inline-flex min-w-[190px] items-center justify-center sm:shrink-0"
              >
                  {bookingMode === "quote" ? "Plan This Service" : "Book Now"}
                  <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
