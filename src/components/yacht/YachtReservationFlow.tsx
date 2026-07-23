"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Minus, Plus } from "lucide-react";
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

// Start-time picker (operator 2026-06-26): private charters choose their own
// departure slot — hourly 09:00→23:00 plus a final late 23:30. Shared cruises
// are intentionally NOT given this control (their departures are fixed —
// sunset 19:00, dinner 20:30 — and never change).
const START_TIMES = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00",
  "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "23:30",
];

// We set the start; the customer's chosen duration completes the window
// (e.g. 14:00 + 3h → 17:00). Wraps past midnight for long late charters.
function addHoursToTime(hhmm: string, hours: number): string {
  const [h, m] = hhmm.split(":").map(Number);
  const total = (h * 60 + m + hours * 60) % (24 * 60);
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(
    total % 60,
  ).padStart(2, "0")}`;
}

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
  // Default 18:00 = the previous hard-coded value, so visitors who don't touch
  // the picker keep the exact prior behaviour.
  const [startTime, setStartTime] = useState<string>("18:00");
  const initialDateStr = initialDate || defaultDateString();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(isoToDate(initialDateStr));
  const [guests, setGuests] = useState<number>(
    Math.min(Math.max(initialGuests ?? minGuests, minGuests), maxGuests),
  );
  const [modalOpen, setModalOpen] = useState(false);

  const date = selectedDate ? dateToIso(selectedDate) : "";
  const total = boat.priceByHours?.[hours] ?? 0;
  const endTime = addHoursToTime(startTime, hours);
  const endsNextDay =
    Number(endTime.replace(":", "")) <= Number(startTime.replace(":", ""));
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
    time: startTime,
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
    fleetSlug: boat.slug,
    charterHours: hours,
    departurePoint: "Karaköy marina (confirmed after booking)",
    tourImage: boat.coverImage,
  };

  function handleContinue() {
    if (!date) {
      // 2026-06-06: Clarity flagged 32 dead clicks on "Continue booking" in 7d.
      // Date is normally pre-filled (today+2), so this branch is rare — but
      // when it triggers we now scroll the calendar into view and ring-focus
      // it instead of silently blocking. Old behavior just returned, which
      // Clarity classified as a dead click.
      if (typeof document !== "undefined") {
        const cal = document.getElementById("yacht-charter-calendar");
        cal?.scrollIntoView({ behavior: "smooth", block: "center" });
        cal?.classList.add("ring-2", "ring-[var(--brand-primary)]");
        window.setTimeout(
          () => cal?.classList.remove("ring-2", "ring-[var(--brand-primary)]"),
          1800,
        );
      }
      return;
    }
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

          <div id="yacht-charter-calendar" className="scroll-mt-24 rounded-2xl transition-shadow">
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
            <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)] mb-1.5">
              Start time
            </label>
            <select
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              aria-label="Charter start time"
              className="w-full rounded-xl border border-[var(--line)] bg-white px-3 py-3 text-sm font-semibold text-[var(--heading)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/40"
            >
              {START_TIMES.map((tValue) => (
                <option key={tValue} value={tValue}>
                  {tValue}
                </option>
              ))}
            </select>
            <p className="mt-1.5 text-[11px] text-[var(--text-muted)]">
              Your {hours}h charter runs {startTime} – {endTime}
              {endsNextDay ? " (next day)" : ""}. We confirm the exact return
              time on WhatsApp.
            </p>
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

          {/* 2026-06-06: removed pure `disabled` — disabled buttons swallow
              clicks silently, which Clarity registers as a dead click (32 in
              7d). Now `aria-disabled` so screen readers still announce state
              but the click event fires and handleContinue() scrolls the user
              to the calendar with visual feedback. */}
          <button
            type="button"
            onClick={handleContinue}
            aria-disabled={!date}
            style={{ color: "#ffffff" }}
            className={`flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--brand-primary)] px-6 py-4 text-base font-bold !text-white shadow-md transition-opacity hover:opacity-90 ${!date ? "opacity-50" : ""}`}
          >
            Continue booking
            <ArrowRight className="h-5 w-5" />
          </button>
          {/* 2026-06-26 (competitor research): a 3-line reassurance strip at the
              booking CTA is TripAdvisor's proven decision-moment pattern and the
              single highest-intent conversion lever — free cancellation kills
              anxiety, instant confirmation beats the OTA "check availability"
              wait, and "no broker markup" is our direct-operator edge. */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11px] font-medium text-[var(--text-muted)]">
            <span className="inline-flex items-center gap-1">
              <Check className="h-3.5 w-3.5 text-emerald-600" /> Free cancellation up to 48h
            </span>
            <span className="inline-flex items-center gap-1">
              <Check className="h-3.5 w-3.5 text-emerald-600" /> Instant confirmation
            </span>
            <span className="inline-flex items-center gap-1">
              <Check className="h-3.5 w-3.5 text-emerald-600" /> Direct operator — no broker markup
            </span>
          </div>
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
