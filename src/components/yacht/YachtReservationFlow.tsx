"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Minus, Plus } from "lucide-react";
import BookingModal from "@/components/booking/BookingModal";
import { PlannerDateCalendar } from "@/components/booking/PlannerDateCalendar";
import type { CharterFleetItem } from "@/data/fleet";
import { getCharterFleetLocale } from "@/data/fleet";
import type { SiteLocale } from "@/i18n/config";

type Props = {
  boat: CharterFleetItem;
  initialHours: number;
  initialDate?: string;
  initialGuests?: number;
  tourSlug: string;
  tourName: string;
  locale?: SiteLocale;
  fleetDetailBasePath?: string;
};

const PLACEHOLDER_FEATURES = [
  "2-hour minimum private Bosphorus charter (whole yacht)",
  "Licensed captain and crew",
  "Fuel and standard route fees",
  "Complimentary soft drinks, water, and light snacks",
  "Onboard sound system with Bluetooth",
  "Safety equipment and life jackets",
];

function defaultDateString(): string {
  const d = new Date();
  d.setDate(d.getDate() + 2);
  return d.toISOString().split("T")[0];
}

function isoToDate(s: string | undefined): Date | undefined {
  if (!s) return undefined;
  const d = new Date(s + "T00:00:00");
  return isNaN(d.getTime()) ? undefined : d;
}

function dateToIso(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function YachtReservationFlow({
  boat,
  initialHours,
  initialDate,
  initialGuests,
  tourSlug,
  tourName,
  locale = "en",
  fleetDetailBasePath = "/yacht-charter-istanbul",
}: Props) {
  const t = getCharterFleetLocale(boat, locale);
  const minGuests = 2;
  const maxGuests = boat.capacity.max;
  const minHours = boat.minHours;

  const availableHours = useMemo(() => {
    if (!boat.priceByHours) return [minHours];
    return Object.keys(boat.priceByHours)
      .map(Number)
      .sort((a, b) => a - b);
  }, [boat.priceByHours, minHours]);

  const safeInitialHours = availableHours.includes(initialHours)
    ? initialHours
    : availableHours[0] ?? minHours;

  const [hours, setHours] = useState<number>(safeInitialHours);
  const initialDateStr = initialDate || defaultDateString();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(isoToDate(initialDateStr));
  const [guests, setGuests] = useState<number>(
    Math.min(Math.max(initialGuests ?? minGuests, minGuests), maxGuests),
  );
  const [modalOpen, setModalOpen] = useState(false);

  const date = selectedDate ? dateToIso(selectedDate) : "";
  const total = boat.priceByHours?.[hours] ?? 0;
  const isDiscount = hours >= boat.discountFromHours;
  const regularTotal = (boat.hourlyEur ?? 0) * hours;
  const savings = isDiscount && boat.hourlyEur ? regularTotal - total : 0;

  function decGuests() {
    setGuests((g) => Math.max(minGuests, g - 1));
  }
  function incGuests() {
    setGuests((g) => Math.min(maxGuests, g + 1));
  }

  const packageName = `${t.label} — ${hours}h`;

  const booking = {
    tourName,
    tourSlug,
    date,
    time: "18:00",
    guests,
    selectedPackage: {
      name: packageName,
      price: total,
      description: t.description,
      features: PLACEHOLDER_FEATURES,
    },
    selectedAddOns: [],
    basePrice: total,
    priceMode: "perGroup" as const,
    departurePoint: "Bosphorus marina (confirmed after booking)",
    tourImage: boat.coverImage,
  };

  function handleContinue() {
    if (!date) return;
    setModalOpen(true);
  }

  return (
    <section
      id="core-booking-planner"
      className="rounded-[2rem] border border-[var(--line)] bg-white p-5 shadow-sm md:p-7"
    >
      <header className="mb-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--brand-primary)]">
          Selected yacht
        </p>
        <h2 className="mt-1 text-xl md:text-2xl font-bold text-[var(--heading)]">{t.label}</h2>
        <p className="mt-1 text-sm text-[var(--text-muted)]">{t.tagline}</p>
      </header>

      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--surface-alt)]">
          <Image
            src={boat.coverImage}
            alt={`${t.label} — ${boat.altDescriptor}`}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
          />
          <Link
            href={`${fleetDetailBasePath}/${boat.slug}`}
            className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-[var(--brand-primary)] shadow-md backdrop-blur-sm hover:bg-white"
          >
            See yacht details →
          </Link>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
              Duration
            </label>
            <div className="mt-1.5 grid grid-cols-4 gap-1.5 sm:grid-cols-7">
              {availableHours.map((h) => {
                const isSelected = h === hours;
                const discounted = h >= boat.discountFromHours;
                return (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setHours(h)}
                    className={`rounded-xl border px-2 py-2 text-xs font-bold transition-all ${
                      isSelected
                        ? "border-[var(--brand-primary)] bg-[var(--brand-primary)] text-white shadow-md"
                        : "border-[var(--line)] bg-white text-[var(--heading)] hover:border-[var(--brand-primary)]/40"
                    }`}
                  >
                    {h}h
                    {discounted && (
                      <span className={`mt-0.5 block text-[9px] ${isSelected ? "text-white/85" : "text-emerald-600"}`}>
                        −{boat.discountPercent}%
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)] mb-1.5">
              Date
            </label>
            <PlannerDateCalendar
              tourSlug={tourSlug}
              priceEur={total}
              value={selectedDate}
              onSelect={(d) => setSelectedDate(d)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
              Guests <span className="text-[var(--text-muted)]/70">(max {maxGuests} on this yacht)</span>
            </label>
            <div className="mt-1.5 flex items-center justify-between rounded-xl border border-[var(--line)] bg-white p-3">
              <button
                type="button"
                onClick={decGuests}
                disabled={guests <= minGuests}
                className="rounded-full border border-[var(--line)] p-2 text-[var(--heading)] transition-colors hover:bg-[var(--surface-alt)] disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Decrease guests"
              >
                <Minus className="h-4 w-4" />
              </button>
              <div className="text-center">
                <p className="text-2xl font-bold text-[var(--heading)]">{guests}</p>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--text-muted)]">Guests</p>
              </div>
              <button
                type="button"
                onClick={incGuests}
                disabled={guests >= maxGuests}
                className="rounded-full border border-[var(--line)] p-2 text-[var(--heading)] transition-colors hover:bg-[var(--surface-alt)] disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Increase guests"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-1.5 text-[11px] text-[var(--text-muted)]">
              Yacht capacity is {boat.capacity.min}–{boat.capacity.max} guests. The whole yacht is
              reserved for your group regardless of size.
            </p>
          </div>

          <div className="rounded-xl bg-[var(--surface-alt)] p-4">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                  Total · {hours}h whole-yacht charter
                </p>
                {isDiscount && savings > 0 && (
                  <p className="mt-0.5 text-xs text-emerald-700 font-semibold">
                    Save €{savings} — 10% off from 3 hours
                  </p>
                )}
              </div>
              <p className="text-3xl font-extrabold text-[var(--brand-primary)]">€{total}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleContinue}
            disabled={!date}
            style={{ color: "#ffffff" }}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--brand-primary)] px-6 py-4 text-base font-bold !text-white shadow-md transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Continue booking
            <ArrowRight className="h-5 w-5" />
          </button>
          <p className="text-center text-[11px] text-[var(--text-muted)]">
            Captain and crew, fuel, soft drinks and snacks included. Alcohol, catering, DJ, and
            event styling quoted separately on request.
          </p>
        </div>
      </div>

      {modalOpen && (
        <BookingModal booking={booking} onClose={() => setModalOpen(false)} />
      )}
    </section>
  );
}
