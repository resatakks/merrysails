"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Calendar,
  ChevronDown,
  Clock,
  Minus,
  Plus,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import {
  getCoreTours,
  getPriceSuffix,
  getTourPath,
  type Tour,
} from "@/data/tours";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as DayPickerCalendar } from "@/components/ui/calendar";
import SalePrice from "@/components/ui/SalePrice";
import { MAX_BOOKING_GUESTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

type PlannerVariant = "hero" | "page";

interface CoreBookingPlannerProps {
  variant?: PlannerVariant;
  source?: string;
}

const coreTours = getCoreTours();
const tourCardNotes: Record<string, string> = {
  "bosphorus-sunset-cruise":
    "Shared golden-hour route with Without Wine and wine-served options.",
  "bosphorus-dinner-cruise":
    "Shared night cruise with Silver and Gold ladders on the same route.",
  "yacht-charter-in-istanbul":
    "Private yacht charter with Essential, Premium, and VIP comfort tiers.",
};

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
}: CoreBookingPlannerProps) {
  const router = useRouter();
  const [isOpeningBooking, setIsOpeningBooking] = useState(false);
  const [selectedTourSlug, setSelectedTourSlug] = useState(coreTours[0]?.slug ?? "");
  const [packageSelectionByTour, setPackageSelectionByTour] = useState<Record<string, string>>(
    () =>
      Object.fromEntries(
        coreTours.map((tour) => [tour.slug, getDefaultPackageName(tour)])
      )
  );
  const selectedTour = useMemo(
    () => coreTours.find((tour) => tour.slug === selectedTourSlug) ?? coreTours[0],
    [selectedTourSlug]
  );
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState(2);

  if (!selectedTour) {
    return null;
  }

  const selectedPackageName =
    packageSelectionByTour[selectedTour.slug] ?? getDefaultPackageName(selectedTour);
  const selectedPackage =
    selectedTour.packages?.find((pkg) => pkg.name === selectedPackageName) ??
    selectedTour.packages?.[0];

  const bookingPath = getTourPath(selectedTour);
  const selectedOriginalPrice =
    selectedPackage?.originalPrice ??
    (selectedPackage?.price === selectedTour.priceEur
      ? selectedTour.originalPriceEur
      : undefined);

  const buildFallbackParams = () => {
    const params = new URLSearchParams();
    if (selectedPackage?.name) {
      params.set("package", selectedPackage.name);
    }
    if (date) {
      params.set("date", format(date, "yyyy-MM-dd"));
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
          time: extractClockTime(selectedTour.departureTime),
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

  const heroVariant = variant === "hero";

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[2rem]",
        heroVariant
          ? "border border-slate-200/90 bg-white/96 shadow-[0_24px_80px_rgba(7,14,40,0.22)] backdrop-blur-xl"
          : "bg-white shadow-sm"
      )}
    >
      <div
        className={cn(
          "border-b",
          heroVariant ? "border-slate-200/80 px-4 py-4 md:px-6" : "border-[var(--line)] px-6 py-6"
        )}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--brand-primary)]">
                Core Booking Planner
              </p>
              <h2
                className={cn(
                  "mt-2 font-bold text-[var(--heading)]",
                  heroVariant ? "text-xl md:text-2xl" : "text-2xl md:text-3xl"
                )}
              >
                Plan your Bosphorus dinner cruise, sunset cruise or yacht charter
              </h2>
              <p
                className={cn(
                  "mt-2 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]",
                  heroVariant ? "md:max-w-2xl" : ""
                )}
              >
                Start with the product, continue with the right package, then choose your date
                and guest count. The next page opens with your booking path already prefilled.
              </p>
            </div>

            {!heroVariant && (
              <div className="hidden rounded-2xl bg-[var(--surface-alt)] px-4 py-3 text-right md:block">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">
                  Choice
                </div>
                <div className="mt-1 text-sm font-semibold text-[var(--heading)]">
                  3 clear Bosphorus options
                </div>
              </div>
            )}
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {coreTours.map((tour) => {
              const active = selectedTour.slug === tour.slug;
              const packageCount = tour.packages?.length ?? 0;
              const tourPriceSuffix = getPriceSuffix(tour);

              return (
                <button
                  key={tour.slug}
                  type="button"
                  onClick={() => setSelectedTourSlug(tour.slug)}
                  className={cn(
                    "rounded-2xl border p-4 text-left transition-all",
                    active
                      ? "border-[var(--brand-primary)] bg-[var(--brand-primary)]/6 shadow-sm"
                      : "border-[var(--line)] bg-white hover:border-[var(--brand-primary)]/30"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                  <p className="text-sm font-semibold text-[var(--heading)]">
                        {tour.nameEn}
                      </p>
                      <p className="mt-1 text-xs text-[var(--text-muted)]">
                        {tour.duration} · {packageCount} option{packageCount > 1 ? "s" : ""}
                      </p>
                      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[var(--text-muted)]">
                        {tourCardNotes[tour.slug]}
                      </p>
                    </div>
                    {active && (
                      <span className="rounded-full bg-[var(--brand-primary)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                        Selected
                      </span>
                    )}
                  </div>
                  <div className="mt-3 border-t border-[var(--line)] pt-3">
                    <SalePrice
                      price={tour.priceEur}
                      originalPrice={tour.originalPriceEur}
                      suffix={tourPriceSuffix}
                      label="From"
                      align="left"
                      size="md"
                      showBadge={Boolean(tour.originalPriceEur)}
                      className="w-full"
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className={cn(
          "grid gap-4",
          heroVariant
            ? "px-4 py-4 md:grid-cols-2 xl:grid-cols-[1.15fr_1fr_0.95fr_1.05fr] md:px-6 md:py-5"
            : "px-6 py-6 lg:grid-cols-[1.2fr_1fr_0.95fr_1.1fr]"
        )}
      >
        <div className="space-y-2">
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
            <SelectTrigger className="h-12 w-full rounded-2xl border-[var(--line)] bg-white px-4 text-left text-sm font-medium text-[var(--heading)] shadow-none">
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
          {selectedPackage && (
            <p className="text-xs leading-relaxed text-[var(--text-muted)]">
              {selectedPackage.description}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
            <Calendar className="h-3.5 w-3.5 text-[var(--brand-primary)]" />
            Preferred Date
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="flex h-12 w-full items-center justify-between rounded-2xl border border-[var(--line)] bg-white px-4 text-left text-sm font-medium text-[var(--heading)] outline-none transition-colors hover:border-[var(--brand-primary)]/30"
              >
                <span>{date ? format(date, "dd MMM yyyy") : "Select preferred date"}</span>
                <ChevronDown className="h-4 w-4 text-[var(--text-muted)]" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto rounded-3xl border-[var(--line)] bg-white p-3 shadow-2xl" align="start">
              <DayPickerCalendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={{ before: new Date() }}
                className="rounded-2xl"
              />
            </PopoverContent>
          </Popover>
          <p className="text-xs leading-relaxed text-[var(--text-muted)]">
            Optional. We will carry your date into the booking section.
          </p>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
            <Users className="h-3.5 w-3.5 text-[var(--brand-primary)]" />
            Guests
          </label>
          <div className="flex h-12 items-center justify-between rounded-2xl border border-[var(--line)] bg-white px-3">
            <button
              type="button"
              onClick={() => setGuests((value) => clampGuests(value - 1))}
              disabled={guests <= 1}
              aria-label="Decrease guests"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-[var(--body-text)] transition-colors hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] disabled:cursor-not-allowed disabled:opacity-40"
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
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-[var(--body-text)] transition-colors hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <p className="text-xs leading-relaxed text-[var(--text-muted)]">
            Per-person pricing is used for sunset and dinner. Yacht pricing is per boat. Up to {MAX_BOOKING_GUESTS} guests can be prefilled.
          </p>
        </div>

        <div className="flex flex-col justify-between gap-3">
          <div className="rounded-2xl bg-[var(--surface-alt)] px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  Selected plan
                </div>
                <div className="mt-1 text-sm font-semibold text-[var(--heading)]">
                  {selectedPackage?.name ?? selectedTour.nameEn}
                </div>
              </div>
              <SalePrice
                price={selectedPackage?.price ?? selectedTour.priceEur}
                originalPrice={selectedOriginalPrice}
                suffix={getPriceSuffix(selectedTour)}
                align="right"
                size="md"
              />
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-[var(--text-muted)]">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-[var(--brand-primary)]" />
                {selectedTour.duration}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-[var(--brand-primary)]" />
                Reservation path prefilled
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleContinue}
            disabled={isOpeningBooking}
            className={cn(
              "inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl font-semibold text-white transition-all hover:brightness-110 disabled:cursor-wait disabled:opacity-80",
              heroVariant ? "bg-[var(--brand-primary)]" : "bg-[var(--brand-primary)] shadow-sm"
            )}
          >
            {isOpeningBooking ? "Opening booking..." : "Continue to booking page"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
