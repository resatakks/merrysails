"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Clock,
  Loader2,
  Minus,
  Plus,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import { getCoreTours, getPriceSuffix, getTourPath, type Tour } from "@/data/tours";
import {
  applyGroupDiscount,
  isGroupDiscountEligibleTour,
  GROUP_DISCOUNT_MIN_GUESTS,
} from "@/lib/group-discount";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { trackBeginCheckout } from "@/lib/analytics";
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
  // Clarity (14d /reservation): 25 dead clicks on "Without Wine", 26 on
  // "€220" — users tap the read-only "Selected Plan" summary card and the
  // package name expecting to change the option, but the real control is the
  // small <Select> trigger above. Controlling the dropdown open-state lets the
  // summary card act as a second, larger tap target that opens the picker.
  const [isPackageMenuOpen, setIsPackageMenuOpen] = useState(false);
  const safeInitialTourSlug = coreTours.some((tour) => tour.slug === initialTourSlug)
    ? initialTourSlug
    : coreTours[0]?.slug ?? "";
  const [selectedTourSlug, setSelectedTourSlug] = useState(safeInitialTourSlug);
  const [packageSelectionByTour, setPackageSelectionByTour] = useState<Record<string, string>>(
    () => Object.fromEntries(coreTours.map((tour) => [tour.slug, getDefaultPackageName(tour)]))
  );
  // Smart date default — pre-select tomorrow rather than leaving the calendar
  // empty. Pre-filled forms convert measurably better than blank forms; users
  // can still change the date but they don't have to commit to a date-pick
  // step before seeing the price/CTA come alive. Computed in useEffect so
  // the server-rendered HTML doesn't drift from the client (today differs
  // between SSR + hydration windows).
  const [date, setDate] = useState<Date | undefined>(undefined);
  useEffect(() => {
    if (date) return; // user already chose
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    setDate(tomorrow);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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

    trackBeginCheckout({
      date: date ? format(date, "yyyy-MM-dd") : undefined,
      guests,
      packageName: selectedPackage?.name,
      source,
      tourName: selectedTour.nameEn,
      tourSlug: selectedTour.slug,
      value: selectedPackagePrice,
    });

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
                onClick={() => {
                  // Clarity (May 27 session 4) showed users clicking the
                  // "Selected" badge of the already-selected tour expecting
                  // some action — it registered as a dead click because the
                  // tour was already selected. Fix: scroll the package
                  // selector into view so the click has a visible response
                  // even when the tour state doesn't change.
                  setSelectedTourSlug(tour.slug);
                  if (isSelected && typeof document !== "undefined") {
                    const packageSelect = document.querySelector<HTMLElement>(
                      "[data-booking-package-selector]",
                    );
                    if (packageSelect) {
                      packageSelect.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                    }
                  }
                }}
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
          <section
            data-booking-package-selector
            className="min-w-0 rounded-[1.7rem] border border-[var(--line)] bg-[var(--surface-alt)] p-4 xl:p-5"
          >
            <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
              <Sparkles className="h-3.5 w-3.5 text-[var(--brand-primary)]" />
              Package
            </label>
            <Select
              open={isPackageMenuOpen}
              onOpenChange={setIsPackageMenuOpen}
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

            <button
              type="button"
              onClick={() => {
                if ((selectedTour.packages?.length ?? 0) > 1) {
                  setIsPackageMenuOpen(true);
                }
              }}
              aria-label={`Change package — currently ${selectedPackage?.name ?? selectedTour.nameEn}`}
              className="mt-4 w-full rounded-2xl border border-white/70 bg-white px-4 py-4 text-left transition-colors hover:border-[var(--brand-primary)]/30"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    Selected Plan
                    {(selectedTour.packages?.length ?? 0) > 1 && (
                      <span className="text-[10px] font-medium normal-case tracking-normal text-[var(--brand-primary)]">
                        · tap to change
                      </span>
                    )}
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
            </button>
          </section>

          <PlannerDateCalendar
            tourSlug={selectedTour.slug}
            priceEur={selectedPackage?.price ?? selectedTour.priceEur}
            weekdayDiscount={
              selectedPackage?.weekdayDiscount
                ? {
                    weekdays: selectedPackage.weekdayDiscount.weekdays,
                    discountedPrice: selectedPackage.weekdayDiscount.discountedPrice,
                  }
                : undefined
            }
            departureTime={selectedTour.departureTime}
            value={date}
            onSelect={(nextDate, context) => {
              setDate(nextDate);
              setSelectedDepartureTime(
                context.departureTimeOverride
                  ? extractClockTime(context.departureTimeOverride) ?? context.departureTimeOverride
                  : undefined,
              );
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
                  <span
                    className="inline-flex items-center gap-1.5"
                    title={
                      /flexible/i.test(effectiveDepartureTime)
                        ? "Departure time is arranged with you after booking"
                        : undefined
                    }
                  >
                    <Clock className="h-3.5 w-3.5 text-[var(--brand-primary)]" />
                    {effectiveDepartureTime}
                  </span>
                )}
                {/* Clarity (14d /reservation): 16 dead clicks on the
                    "Up to 25 guests" text — it reads like a control sitting
                    right under the guest stepper. Wire it as a real shortcut
                    that jumps the counter to the maximum for large groups,
                    so the click does something instead of nothing. */}
                <button
                  type="button"
                  onClick={() => setGuests(MAX_BOOKING_GUESTS)}
                  disabled={guests >= MAX_BOOKING_GUESTS}
                  className="inline-flex items-center gap-1.5 rounded-full transition-colors hover:text-[var(--brand-primary)] disabled:cursor-default disabled:hover:text-[var(--text-muted)]"
                >
                  <Users className="h-3.5 w-3.5 text-[var(--brand-primary)]" />
                  Up to {MAX_BOOKING_GUESTS} guests
                </button>
              </div>
            </div>

            {(() => {
              if (!isGroupDiscountEligibleTour(selectedTour.slug)) return null;
              const perPerson =
                selectedPackage?.price ?? selectedTour.priceEur ?? 0;
              const subtotal = perPerson * guests;
              const result = applyGroupDiscount(
                subtotal,
                selectedTour.slug,
                guests,
              );
              if (result.eligible && result.savings > 0) {
                return (
                  <div className="mt-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
                    <div className="flex items-center justify-between gap-2 font-semibold">
                      <span>Group discount applied</span>
                      <span>−€{result.savings}</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-xs text-emerald-800">
                      <span>
                        €{subtotal} → <strong>€{result.discountedTotal}</strong>{" "}
                        for {guests} guests
                      </span>
                      <span className="opacity-75">auto-applied</span>
                    </div>
                  </div>
                );
              }
              const needed = GROUP_DISCOUNT_MIN_GUESTS - guests;
              return (
                <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-medium text-amber-900">
                  Add {needed} more {needed === 1 ? "guest" : "guests"} to save
                  10% — sunset &amp; dinner cruises only.
                </div>
              );
            })()}

            {/* Clarity (14d /reservation): 45 dead clicks + 1 rage click on
                "Continue booking". The handler is sound (it writes a prefill
                row then navigates), but the network round-trip leaves the
                button looking idle, so users re-tap. A spinner + busy state
                makes the wait unmistakable; aria-busy announces it to AT. */}
            <button
              type="button"
              onClick={handleContinue}
              disabled={isOpeningBooking}
              aria-busy={isOpeningBooking}
              className="mt-4 inline-flex min-h-[3.75rem] w-full items-center justify-center gap-2 rounded-2xl bg-[var(--brand-primary)] px-5 py-4 text-center text-[15px] font-semibold leading-tight text-white transition-all hover:brightness-110 disabled:cursor-wait disabled:opacity-80 sm:text-base"
            >
              {isOpeningBooking ? (
                <>
                  <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
                  Opening booking...
                </>
              ) : (
                <>
                  {pageVariant ? "Continue booking" : "Continue with this booking"}
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </>
              )}
            </button>
          </section>
        </div>
      </div>
    </section>
  );
}
