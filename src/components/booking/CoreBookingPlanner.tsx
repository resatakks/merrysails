"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Clock,
  Minus,
  Plus,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import { getCoreTours, getPriceSuffix, getTourPath, type Tour } from "@/data/tours";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SalePrice from "@/components/ui/SalePrice";
import { PlannerDateCalendar } from "@/components/booking/PlannerDateCalendar";
import { MAX_BOOKING_GUESTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

type PlannerVariant = "hero" | "page";

interface CoreBookingPlannerProps {
  variant?: PlannerVariant;
  source?: string;
  initialTourSlug?: string;
}

const coreTours = getCoreTours();

function getDefaultPackageName(tour: Tour): string {
  return tour.packages?.[0]?.name ?? "";
}

function clampGuests(value: number): number {
  return Math.max(1, Math.min(MAX_BOOKING_GUESTS, value));
}

function extractClockTime(value: string): string | undefined {
  return value.match(/\b\d{1,2}:\d{2}\b/)?.[0];
}

export default function CoreBookingPlanner({
  variant = "page",
  source = "direct",
  initialTourSlug,
}: CoreBookingPlannerProps) {
  const router = useRouter();
  const [isOpeningBooking, setIsOpeningBooking] = useState(false);
  const safeInitialTourSlug = coreTours.some((tour) => tour.slug === initialTourSlug)
    ? initialTourSlug
    : coreTours[0]?.slug ?? "";
  const [selectedTourSlug, setSelectedTourSlug] = useState(safeInitialTourSlug);
  const [packageSelectionByTour, setPackageSelectionByTour] = useState<Record<string, string>>(
    () => Object.fromEntries(coreTours.map((tour) => [tour.slug, getDefaultPackageName(tour)]))
  );
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedDepartureTime, setSelectedDepartureTime] = useState<string | undefined>(
    undefined
  );
  const [selectedOperationNote, setSelectedOperationNote] = useState<string | undefined>(
    undefined
  );
  const [guests, setGuests] = useState(2);

  const selectedTour = useMemo(
    () => coreTours.find((tour) => tour.slug === selectedTourSlug) ?? coreTours[0],
    [selectedTourSlug]
  );

  useEffect(() => {
    setDate(undefined);
    setSelectedDepartureTime(undefined);
    setSelectedOperationNote(undefined);
  }, [selectedTourSlug]);

  if (!selectedTour) {
    return null;
  }

  const heroVariant = variant === "hero";
  const pageVariant = !heroVariant;
  const selectedPackageName =
    packageSelectionByTour[selectedTour.slug] ?? getDefaultPackageName(selectedTour);
  const selectedPackage =
    selectedTour.packages?.find((pkg) => pkg.name === selectedPackageName) ??
    selectedTour.packages?.[0];
  const selectedPackagePrice = selectedPackage?.price ?? selectedTour.priceEur;
  const selectedOriginalPrice =
    selectedPackage?.originalPrice ??
    (selectedPackagePrice === selectedTour.priceEur
      ? selectedTour.originalPriceEur
      : undefined);
  const selectedSavings =
    selectedOriginalPrice && selectedOriginalPrice > selectedPackagePrice
      ? selectedOriginalPrice - selectedPackagePrice
      : 0;
  const bookingPath = getTourPath(selectedTour);
  const effectiveDepartureTime =
    selectedDepartureTime ||
    extractClockTime(selectedTour.departureTime) ||
    selectedTour.departureTime;

  const buildFallbackParams = () => {
    const params = new URLSearchParams();

    if (selectedPackage?.name) {
      params.set("package", selectedPackage.name);
    }

    if (date) {
      params.set("date", format(date, "yyyy-MM-dd"));
    }

    if (selectedDepartureTime) {
      params.set("time", selectedDepartureTime);
    }

    params.set("guests", String(guests));
    params.set("source", source);

    return params;
  };

  const handleContinue = async () => {
    if (isOpeningBooking) {
      return;
    }

    setIsOpeningBooking(true);

    try {
      const response = await fetch("/api/booking-prefill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tourSlug: selectedTour.slug,
          packageName: selectedPackage?.name,
          date: date ? format(date, "yyyy-MM-dd") : undefined,
          guests,
          time: effectiveDepartureTime,
          source,
        }),
      });

      if (response.ok) {
        const result = (await response.json()) as { success?: boolean; id?: string };

        if (result.success && result.id) {
          router.push(`${bookingPath}?prefill=${encodeURIComponent(result.id)}#booking`);
          return;
        }
      }
    } catch (error) {
      console.error("Failed to create prefill id:", error);
    } finally {
      setIsOpeningBooking(false);
    }

    router.push(`${bookingPath}?${buildFallbackParams().toString()}#booking`);
  };

  return (
    <section
      id={pageVariant ? "core-booking-planner" : undefined}
      className={cn(
        "overflow-hidden rounded-[2rem] border border-[var(--line)] bg-white shadow-sm",
        heroVariant && "shadow-[0_24px_80px_rgba(7,14,40,0.22)]"
      )}
    >
      <div className="border-b border-[var(--line)] bg-[linear-gradient(180deg,#ffffff_0%,#fbf8f2_100%)] px-4 py-5 md:px-6 md:py-6">
        <div className="flex flex-col gap-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--brand-primary)]">
            Core Booking Planner
          </p>
          <h2
            className={cn(
              "font-bold leading-tight text-[var(--heading)]",
              pageVariant ? "max-w-3xl text-[1.7rem] md:text-[2.75rem]" : "text-2xl md:text-3xl"
            )}
          >
            {pageVariant
              ? "Choose the product first, then set date and guests"
              : "Choose the product first, then continue to booking"}
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
            Cleaner product selection, the same date validations, and a shorter booking path.
          </p>
        </div>
      </div>

      <div className="px-4 py-4 md:px-6 md:py-6">
        <div className="grid gap-3">
          {coreTours.map((tour) => {
            const packageCount = tour.packages?.length ?? 0;
            const isSelected = selectedTour.slug === tour.slug;

            return (
              <button
                key={tour.slug}
                type="button"
                onClick={() => setSelectedTourSlug(tour.slug)}
                className={cn(
                  "rounded-[1.6rem] border p-3 text-left transition-all",
                  isSelected
                    ? "border-[var(--brand-primary)] bg-[var(--brand-primary)]/[0.03] shadow-[0_16px_34px_rgba(24,41,135,0.12)]"
                    : "border-[var(--line)] bg-white hover:border-[var(--brand-primary)]/35 hover:shadow-sm"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[1.2rem]">
                    <Image
                      src={tour.image}
                      alt={tour.nameEn}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex rounded-full bg-[var(--surface-alt)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                        {packageCount} options
                      </span>
                      {isSelected && (
                        <span className="inline-flex rounded-full bg-[var(--brand-primary)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                          Selected
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2 text-base font-semibold leading-snug text-[var(--heading)] md:text-lg">
                      {tour.nameEn}
                    </h3>
                    <p className="mt-1 text-xs text-[var(--text-muted)] md:text-sm">
                      {tour.duration} • {packageCount} booking choice{packageCount > 1 ? "s" : ""}
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                      From
                    </div>
                    <div className="mt-1 text-xl font-bold text-[var(--brand-gold)]">
                      €{tour.priceEur}
                    </div>
                    <div className="text-[10px] font-medium text-[var(--text-muted)]">
                      {getPriceSuffix(tour)}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,1.18fr)] xl:grid-cols-[minmax(0,1.02fr)_minmax(0,1.28fr)_minmax(16rem,0.92fr)]">
          <section className="min-w-0 rounded-[1.7rem] border border-[var(--line)] bg-[var(--surface-alt)] p-4 xl:p-5">
            <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
              <Sparkles className="h-3.5 w-3.5 text-[var(--brand-primary)]" />
              Package
            </label>
            <Select
              value={selectedPackageName}
              onValueChange={(value) =>
                setPackageSelectionByTour((current) => ({
                  ...current,
                  [selectedTour.slug]: value,
                }))
              }
            >
              <SelectTrigger
                aria-label={`${selectedTour.nameEn} package`}
                className="mt-2 h-12 w-full rounded-2xl border-[var(--line)] bg-white px-4 text-left text-sm font-medium text-[var(--heading)] shadow-none"
              >
                <SelectValue placeholder="Select package" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-[var(--line)] bg-white p-2 shadow-xl">
                {(selectedTour.packages ?? []).map((pkg) => (
                  <SelectItem
                    key={pkg.name}
                    value={pkg.name}
                    className="rounded-xl px-3 py-3 text-sm focus:bg-[var(--surface-alt)]"
                  >
                    {pkg.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="mt-4 rounded-2xl border border-white/70 bg-white px-4 py-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    Selected Plan
                  </div>
                  <div className="mt-1 text-base font-semibold text-[var(--heading)]">
                    {selectedPackage?.name ?? selectedTour.nameEn}
                  </div>
                </div>

                <div className="shrink-0 rounded-[1.15rem] bg-[var(--surface-alt)] px-3 py-2">
                  <SalePrice
                    price={selectedPackagePrice}
                    originalPrice={selectedOriginalPrice}
                    suffix={getPriceSuffix(selectedTour)}
                    align="left"
                    size="sm"
                  />
                </div>
              </div>

              {selectedSavings > 0 && (
                <div className="mt-3 inline-flex rounded-full border border-[var(--brand-primary)]/12 bg-[var(--brand-primary)]/6 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--brand-primary)]">
                  Save €{selectedSavings}
                </div>
              )}

              {selectedPackage?.description && (
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  {selectedPackage.description}
                </p>
              )}
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-[var(--text-muted)]">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-[var(--brand-primary)]" />
                  {selectedTour.duration}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-[var(--brand-primary)]" />
                  ID-based booking path
                </span>
              </div>
              {selectedOperationNote && (
                <div className="mt-3 rounded-xl border border-sky-200 bg-sky-50 px-3 py-2 text-sm text-sky-800">
                  {selectedOperationNote}
                </div>
              )}
            </div>
          </section>

          <PlannerDateCalendar
            tourSlug={selectedTour.slug}
            priceEur={selectedPackage?.price ?? selectedTour.priceEur}
            departureTime={selectedTour.departureTime}
            value={date}
            onSelect={(nextDate, context) => {
              setDate(nextDate);
              setSelectedDepartureTime(context.departureTimeOverride ?? undefined);
              setSelectedOperationNote(context.note ?? undefined);
            }}
          />

          <section className="min-w-0 rounded-[1.7rem] border border-[var(--line)] bg-white p-4 shadow-sm lg:col-span-2 xl:col-span-1 xl:p-5">
            <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
              <Users className="h-3.5 w-3.5 text-[var(--brand-primary)]" />
              Guests
            </label>
            <div className="mt-2 flex h-12 items-center justify-between rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] px-3">
              <button
                type="button"
                onClick={() => setGuests((value) => clampGuests(value - 1))}
                disabled={guests <= 1}
                aria-label="Decrease guests"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-white text-[var(--body-text)] transition-colors hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Minus className="h-4 w-4" />
              </button>
              <div className="text-center">
                <div className="text-base font-bold text-[var(--heading)]">{guests}</div>
                <div className="text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                  {guests === 1 ? "Guest" : "Guests"}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setGuests((value) => clampGuests(value + 1))}
                disabled={guests >= MAX_BOOKING_GUESTS}
                aria-label="Increase guests"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-white text-[var(--body-text)] transition-colors hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 rounded-2xl bg-[var(--surface-alt)] px-4 py-4">
              <SalePrice
                price={selectedPackage?.price ?? selectedTour.priceEur}
                originalPrice={selectedOriginalPrice}
                suffix={getPriceSuffix(selectedTour)}
                align="left"
                size="md"
              />
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-[var(--text-muted)]">
                {effectiveDepartureTime && (
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-[var(--brand-primary)]" />
                    {effectiveDepartureTime}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-[var(--brand-primary)]" />
                  Up to {MAX_BOOKING_GUESTS} guests
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleContinue}
              disabled={isOpeningBooking}
              className="mt-4 inline-flex min-h-[3.75rem] w-full items-center justify-center gap-2 rounded-2xl bg-[var(--brand-primary)] px-5 py-4 text-center text-[15px] font-semibold leading-tight text-white transition-all hover:brightness-110 disabled:cursor-wait disabled:opacity-80 sm:text-base"
            >
              {isOpeningBooking
                ? "Opening booking..."
                : pageVariant
                ? "Continue booking"
                : "Continue with this booking"}
              <ArrowRight className="h-4 w-4 shrink-0" />
            </button>
          </section>
        </div>
      </div>
    </section>
  );
}
