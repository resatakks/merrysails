"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import {
  detectBookingLocaleFromPathname,
  getBookingCalendarStrings,
  type BookingLocale,
} from "@/i18n/booking-strings";

// Guest-counter labels per active locale. Falls back to English when the
// pathname starts with a locale segment we have not translated yet.

const GUEST_LABELS: Record<BookingLocale, {
  adults: string;
  adultsHint: string;
  children: string;
  childrenHint: string;
  infants: string;
  infantsHint: string;
  noAlcoholHint: string;
}> = {
  en: {
    adults: "Adults",
    adultsHint: "Age 13+",
    children: "Children",
    childrenHint: "Ages 3–13 · 50% off",
    infants: "Infants",
    infantsHint: "Ages 0–3 · free",
    noAlcoholHint: " · not available on alcoholic packages",
  },
  tr: {
    adults: "Yetişkin",
    adultsHint: "13+ yaş",
    children: "Çocuk",
    childrenHint: "3–13 yaş · %50 indirim",
    infants: "Bebek",
    infantsHint: "0–3 yaş · ücretsiz",
    noAlcoholHint: " · alkollü paketlere eklenemez",
  },
  de: {
    adults: "Erwachsene",
    adultsHint: "Ab 13 Jahren",
    children: "Kinder",
    childrenHint: "3–13 Jahre · 50% Rabatt",
    infants: "Kleinkinder",
    infantsHint: "0–3 Jahre · kostenlos",
    noAlcoholHint: " · nicht in Paketen mit Alkohol verfügbar",
  },
  fr: {
    adults: "Adultes",
    adultsHint: "13 ans et plus",
    children: "Enfants",
    childrenHint: "3–13 ans · 50% de réduction",
    infants: "Bébés",
    infantsHint: "0–3 ans · gratuit",
    noAlcoholHint: " · non disponible sur les forfaits alcoolisés",
  },
  nl: {
    adults: "Volwassenen",
    adultsHint: "Vanaf 13 jaar",
    children: "Kinderen",
    childrenHint: "3–13 jaar · 50% korting",
    infants: "Baby's",
    infantsHint: "0–3 jaar · gratis",
    noAlcoholHint: " · niet beschikbaar bij alcoholpakketten",
  },
  ru: {
    adults: "Взрослые",
    adultsHint: "От 13 лет",
    children: "Дети",
    childrenHint: "3–13 лет · −50%",
    infants: "Младенцы",
    infantsHint: "0–3 года · бесплатно",
    noAlcoholHint: " · недоступно для пакетов с алкоголем",
  },
};
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isBefore,
  isToday,
  isSameDay,
  addDays,
  isSameMonth,
  startOfDay,
} from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Phone,
  Shield,
  Clock,
  Calendar,
  Users,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { PriceMode } from "@/data/tours";
import { handleTrackedContactNavigation } from "@/lib/analytics";
import SalePrice from "@/components/ui/SalePrice";
import { MAX_BOOKING_GUESTS } from "@/lib/constants";
import {
  getSameDayBookingClosedMessage,
  isSameDayBookingClosed,
} from "@/lib/booking-cutoffs";

interface Props {
  tourSlug: string;
  priceEur: number;
  originalPriceEur?: number;
  /**
   * Optional recurring weekday discount. When provided, calendar cells that
   * fall on one of the listed weekdays render at `discountedPrice` with a
   * subtle emerald accent. Uses JS Date.getDay() encoding (0=Sun, 1=Mon, ...).
   */
  weekdayDiscount?: {
    weekdays: number[];
    discountedPrice: number;
  };
  tourName: string;
  departureTime?: string;
  departurePoint?: string;
  priceMode?: PriceMode;
  initialDate?: Date;
  initialGuests?: number;
  initialTime?: string;
  /**
   * Fires when the user confirms the booking step on the calendar. The 4th
   * argument carries the optional child/infant breakdown introduced on
   * 2026-05-25 — adults = guests - children - infants (kept backward
   * compatible: legacy callers that read only the first three params still
   * receive the full head count).
   */
  onBook?: (
    date: Date,
    guests: number,
    time: string,
    breakdown?: { children?: number; infants?: number },
  ) => void;
}

interface TourOperationClientSnapshot {
  id: string;
  tourSlug: string;
  date: string;
  isSoldOut: boolean;
  departureTimeOverride: string | null;
  note: string | null;
}

function parseTimeOptions(dt?: string): string[] {
  if (!dt) return [];
  if (
    dt.toLowerCase().includes("flexible") ||
    dt.toLowerCase().includes("timed")
  )
    return [];
  return dt
    .split("/")
    .map((t) => t.replace(/\(.*\)/, "").trim())
    .filter((t) => /^\d{2}:\d{2}$/.test(t));
}

const emptySubscribe = () => () => {};

export default function BookingCalendar({
  tourSlug,
  priceEur,
  originalPriceEur,
  weekdayDiscount,
  tourName,
  departureTime,
  priceMode = "perPerson",
  initialDate,
  initialGuests,
  initialTime,
  onBook,
}: Props) {
  const safeInitialDate =
    initialDate && !Number.isNaN(initialDate.getTime())
      ? startOfDay(initialDate)
      : null;
  const safeInitialGuests =
    initialGuests && Number.isFinite(initialGuests)
      ? Math.max(1, Math.min(MAX_BOOKING_GUESTS, initialGuests))
      : 2;

  const pathname = usePathname();
  const bookingLocale = detectBookingLocaleFromPathname(pathname);
  const bookingLabels = GUEST_LABELS[bookingLocale];
  const t = getBookingCalendarStrings(bookingLocale);
  const dayLabels = t.dayLabels;

  const [currentMonth, setCurrentMonth] = useState<Date | null>(safeInitialDate);
  const [selectedDate, setSelectedDate] = useState<Date | null>(safeInitialDate);
  const [adults, setAdults] = useState(safeInitialGuests);
  // Çocuk indirimi (per ops 2026-05-25):
  //   children: 3-13 yaş, paket fiyatının %50'si
  //   infants:  0-3 yaş, ücretsiz
  // Alkollü paket seçildiğinde her ikisi de 0'a sıfırlanır + sayaç UI disable.
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [selectedTime, setSelectedTime] = useState(initialTime ?? "");
  const [operations, setOperations] = useState<TourOperationClientSnapshot[]>([]);
  // Clarity dead-click signal: users tap the disabled "Continue to booking"
  // button when no time slot is picked. We flash the time-pill row + scroll
  // it into view so the gating reason is obvious instead of silent.
  const [timeNudge, setTimeNudge] = useState(false);
  const isPerGroup = priceMode === "perGroup";
  const operationsByDate = Object.fromEntries(
    operations.map((operation) => [operation.date, operation])
  ) as Record<string, TourOperationClientSnapshot>;
  const selectedDateKey = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
  const selectedOperation = selectedDateKey
    ? operationsByDate[selectedDateKey]
    : undefined;
  const activeDepartureTime =
    selectedOperation?.departureTimeOverride || departureTime;

  const totalGuests = adults + children + infants;
  // Resolve weekday-discount price when a Mon/Tue/Thu date is selected
  const selectedDayOfWeek = selectedDate ? selectedDate.getDay() : -1;
  const isWeekdayDiscountDay = weekdayDiscount
    ? weekdayDiscount.weekdays.includes(selectedDayOfWeek)
    : false;
  const effectivePriceEur =
    isWeekdayDiscountDay && weekdayDiscount
      ? weekdayDiscount.discountedPrice
      : priceEur;
  // Alkollü paket detection — UI only; pricing layer also enforces this.
  // Detect against tourName because BookingCalendar doesn't have the package
  // object directly here; the parent (TourDetailClient) reflects the selected
  // package into the tour heading. A separate prop would be cleaner; this keeps
  // the surface change minimal for now.
  const isAlcoholicSelection = /alcohol|with wine|şarapl|saraplı|şarapli|mit wein|avec vin|met wijn|unlimited alcohol/i.test(
    tourName ?? "",
  );
  // If user toggled into an alcoholic package, snap child/infant back to 0.
  // Guarded by a ref to avoid effect loops; this is a render-time correction.
  const effectiveChildren = isAlcoholicSelection ? 0 : children;
  const effectiveInfants = isAlcoholicSelection ? 0 : infants;
  const childUnitPrice = Math.round(effectivePriceEur * 0.5 * 100) / 100;
  const total = isPerGroup
    ? effectivePriceEur
    : effectivePriceEur * adults + childUnitPrice * effectiveChildren;
  const hasDiscount =
    typeof originalPriceEur === "number" && originalPriceEur > priceEur;
  const originalTotal = hasDiscount
    ? isPerGroup
      ? originalPriceEur
      : originalPriceEur * adults +
        Math.round(originalPriceEur * 0.5 * 100) / 100 * effectiveChildren
    : undefined;
  const totalSavings = originalTotal ? originalTotal - total : 0;
  const timeOptions = parseTimeOptions(activeDepartureTime);
  const isHydrated = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const now = isHydrated ? new Date() : null;
  const sameDayClosedForSelectedDate = selectedDate
    ? isSameDayBookingClosed(
        tourSlug,
        selectedDate,
        now ?? new Date(0),
        selectedOperation?.departureTimeOverride || selectedTime || departureTime
      )
    : false;
  const bookingLabel = isPerGroup ? t.requestNowConfirm : t.reserveNowPayOnboard;
  const bookingMetaText = isPerGroup
    ? t.privateChartersReviewedAndConfirmed
    : t.selectedDateAndGuestsUpdate;
  const bookingPillText = isPerGroup ? t.privateCharterRequest : t.sharedCruiseRequest;
  const normalizedSelectedTime =
    timeOptions.length > 1 && timeOptions.includes(selectedTime)
      ? selectedTime
      : "";
  const effectiveTime =
    selectedOperation?.departureTimeOverride ||
    normalizedSelectedTime ||
    (timeOptions.length === 1 ? timeOptions[0] : "");

  useEffect(() => {
    const controller = new AbortController();

    async function loadOperations() {
      try {
        const response = await fetch(
          `/api/booking-availability?tourSlug=${encodeURIComponent(tourSlug)}`,
          {
            method: "GET",
            cache: "no-store",
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          setOperations([]);
          return;
        }

        const data = (await response.json()) as {
          operations?: TourOperationClientSnapshot[];
        };

        setOperations(Array.isArray(data.operations) ? data.operations : []);
      } catch {
        if (!controller.signal.aborted) {
          setOperations([]);
        }
      }
    }

    void loadOperations();

    return () => controller.abort();
  }, [tourSlug]);

  const handleBookNow = () => {
    if (selectedDate && onBook) {
      onBook(
        selectedDate,
        totalGuests,
        effectiveTime || activeDepartureTime || "",
        { children: effectiveChildren, infants: effectiveInfants },
      );
    }
  };

  if (!isHydrated || !now) {
    return (
      <div id="booking-calendar" className="scroll-mt-24 overflow-hidden rounded-2xl border border-[var(--line)] bg-white shadow-sm">
        <div className="bg-[var(--brand-price-box)] px-5 py-5">
          <SalePrice
            price={priceEur}
            originalPrice={originalPriceEur}
            suffix={isPerGroup ? t.perGroup : t.perPerson}
            label={bookingLabel}
            size="lg"
            tone="overlay"
            showBadge={Boolean(hasDiscount)}
            showMeta={Boolean(hasDiscount)}
            metaText={bookingMetaText}
          />
        </div>
        <div className="p-5">
          <div className="h-72 animate-pulse rounded-2xl bg-[var(--surface-alt)]" />
        </div>
      </div>
    );
  }

  const today = startOfDay(now);
  const resolvedCurrentMonth = currentMonth ?? safeInitialDate ?? today;
  const tomorrow = addDays(today, 1);
  const monthStart = startOfMonth(resolvedCurrentMonth);
  const monthEnd = endOfMonth(resolvedCurrentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDay = getDay(monthStart);
  const blanks = startDay === 0 ? 6 : startDay - 1;
  const canGoPrev = isSameMonth(resolvedCurrentMonth, today)
    ? false
    : !isBefore(subMonths(monthStart, 1), startOfMonth(today));

  return (
    <div id="booking-calendar" className="scroll-mt-24 overflow-hidden rounded-2xl border border-[var(--line)] bg-white shadow-sm">
      {/* Price header */}
      <div className="bg-[var(--brand-price-box)] px-5 py-5">
        <div className="flex items-start justify-between gap-4">
          <SalePrice
            price={priceEur}
            originalPrice={originalPriceEur}
            suffix={isPerGroup ? t.perGroup : t.perPerson}
            label={bookingLabel}
            size="lg"
            tone="overlay"
            showBadge={Boolean(hasDiscount)}
            showMeta={Boolean(hasDiscount)}
            metaText={bookingMetaText}
          />
          <div className="hidden rounded-2xl border border-white/10 bg-white/10 px-3 py-2 sm:block">
            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">
              {t.booking}
            </div>
            <div className="mt-1 text-sm font-semibold text-white">
              {bookingPillText}
            </div>
          </div>
        </div>
      </div>

      {/* Date Selection Prompt */}
      {!selectedDate && (
        <div className="px-5 pt-5 pb-2">
          <div className="flex items-center gap-2 text-sm font-medium text-[var(--heading)]">
            <Calendar className="w-4 h-4 text-[var(--brand-primary)]" />
            {t.selectYourPreferredDate}
          </div>
        </div>
      )}

      {/* Calendar */}
      <div className="p-5 pt-3">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() =>
              canGoPrev || !isSameMonth(resolvedCurrentMonth, today)
                ? setCurrentMonth(subMonths(resolvedCurrentMonth, 1))
                : null
            }
            disabled={isSameMonth(resolvedCurrentMonth, today)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-semibold text-[var(--heading)]">
            {format(resolvedCurrentMonth, "MMMM yyyy")}
          </span>
          <button
            onClick={() => setCurrentMonth(addMonths(resolvedCurrentMonth, 1))}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Day headers — translate="no": Mon/Tue/… are functional codes, not
            prose; stops browser auto-translate reprocessing this grid (the
            "daylabels is not defined" translate-origin ReferenceError). */}
        <div className="grid grid-cols-7 mb-1" translate="no">
          {dayLabels.map((d) => (
            <div
              key={d}
              className="text-center text-xs font-medium text-[var(--text-muted)] py-2"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-y-1">
          {/* 2026-06-06: pointer-events-none + aria-hidden — see twin fix in
              PlannerDateCalendar.tsx. Also added gap-y-1 for visual parity
              with the other calendar (was 0, leading to touching rows). */}
          {Array.from({ length: blanks }).map((_, i) => (
            <div
              key={`blank-${i}`}
              className="pointer-events-none"
              aria-hidden="true"
            />
          ))}
          {days.map((day) => {
            const isPast = isBefore(day, today);
            const dayKey = format(day, "yyyy-MM-dd");
            const operation = operationsByDate[dayKey];
            const isSoldOut = operation?.isSoldOut ?? false;
            const isCutoffClosed = isSameDayBookingClosed(
              tourSlug,
              day,
              now,
              operation?.departureTimeOverride || departureTime
            );
            const isDisabled = isPast || isSoldOut || isCutoffClosed;
            const isSelected =
              selectedDate && day.getTime() === selectedDate.getTime();
            const isTodayDate = isToday(day);
            const isTomorrow = isSameDay(day, tomorrow);
            const dayOfWeek = getDay(day); // 0=Sun, 5=Fri, 6=Sat
            const isWeekendDay = dayOfWeek === 5 || dayOfWeek === 6;
            const hasOperationalUpdate =
              Boolean(operation?.departureTimeOverride) || Boolean(operation?.note);
            const showLastSpots =
              !isDisabled && (isTodayDate || isTomorrow);

            return (
              <button
                key={day.toISOString()}
                onClick={() => !isDisabled && setSelectedDate(day)}
                disabled={isDisabled}
                className={`relative py-2 text-center rounded-lg text-sm transition-all ${
                  isSoldOut
                    ? "text-gray-300 cursor-not-allowed line-through"
                    : isPast
                    ? "text-gray-300 cursor-not-allowed"
                    : isSelected
                    ? "bg-[var(--brand-primary)] text-white font-bold shadow-md"
                    : "hover:bg-[var(--brand-primary)]/5 text-[var(--body-text)]"
                } ${
                  isTodayDate && !isSelected
                    ? "font-bold text-[var(--brand-primary)] ring-1 ring-[var(--brand-primary)]/30"
                    : ""
                }`}
              >
                <div className="relative inline-block">
                  {format(day, "d")}
                  {/* High demand orange dot for weekends */}
                  {isWeekendDay && !isDisabled && !isSelected && (
                    <span className="absolute -top-0.5 -right-1.5 w-1.5 h-1.5 rounded-full bg-orange-400" />
                  )}
                  {hasOperationalUpdate && !isDisabled && !isSelected && (
                    <span className="absolute -bottom-0.5 -right-1.5 w-1.5 h-1.5 rounded-full bg-sky-500" />
                  )}
                </div>
                {isSoldOut ? (
                  <div className="text-[9px] font-semibold text-gray-400">
                    {t.soldOut}
                  </div>
                ) : isCutoffClosed ? (
                  <div className="text-[9px] font-semibold text-gray-400">
                    {t.closed}
                  </div>
                ) : operation?.departureTimeOverride ? (
                  <div
                    className={`text-[9px] font-bold ${
                      isSelected ? "text-white/90" : "text-sky-600"
                    }`}
                  >
                    {operation.departureTimeOverride}
                  </div>
                ) : showLastSpots ? (
                  <div
                    className={`text-[9px] font-bold ${
                      isSelected ? "text-white/90" : "text-red-500"
                    }`}
                  >
                    {t.lastSpots}
                  </div>
                ) : !isPast ? (
                  <div
                    className={`text-[10px] font-semibold ${
                      isSelected
                        ? "text-white/80"
                        : weekdayDiscount && weekdayDiscount.weekdays.includes(getDay(day))
                        ? "text-emerald-600"
                        : "text-[var(--brand-gold)]"
                    }`}
                  >
                    €{
                      weekdayDiscount && weekdayDiscount.weekdays.includes(getDay(day))
                        ? weekdayDiscount.discountedPrice
                        : priceEur
                    }
                    {weekdayDiscount && weekdayDiscount.weekdays.includes(getDay(day)) && !isSelected && (
                      <span className="ml-0.5 text-[8px] font-bold text-emerald-700">−</span>
                    )}
                  </div>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {/* Booking summary — appears after date selection */}
      <AnimatePresence>
        {selectedDate && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-[var(--line)] p-5 space-y-4">
              {/* Selected date display */}
              <div className="flex items-center gap-2 px-3 py-2.5 bg-[var(--brand-primary)]/5 rounded-xl">
                <Calendar className="w-4 h-4 text-[var(--brand-primary)]" />
                <span className="text-sm font-semibold text-[var(--heading)]">
                  {format(selectedDate, "EEEE, dd MMM yyyy")}
                </span>
                <button
                  translate="no"
                  onClick={() => setSelectedDate(null)}
                  className="ml-auto text-xs text-[var(--text-muted)] hover:text-[var(--body-text)] transition-colors"
                >
                  {t.change}
                </button>
              </div>

              {/* Time slot pills */}
              {timeOptions.length > 1 && (
                <div
                  id="time-slot-pills"
                  className={`transition-all ${
                    timeNudge && !normalizedSelectedTime
                      ? "rounded-xl bg-amber-50 ring-2 ring-amber-300 p-2 -m-2"
                      : ""
                  }`}
                  aria-busy={timeNudge}
                >
                  <label className="text-sm font-medium mb-2 flex items-center gap-1.5 text-[var(--heading)]">
                    <Clock className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                    {t.departureTime}
                    {timeNudge && !normalizedSelectedTime && (
                      <span className="ml-1 text-xs font-semibold text-amber-700">
                        ←
                      </span>
                    )}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {timeOptions.map((time) => (
                      <button
                        key={time}
                        translate="no"
                        onClick={() => setSelectedTime(time)}
                        className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                          normalizedSelectedTime === time
                            ? "bg-[var(--brand-primary)] text-white shadow-md"
                            : "bg-[var(--surface-alt)] text-[var(--body-text)] hover:bg-[var(--brand-primary)]/10 hover:text-[var(--brand-primary)]"
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {time}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {timeOptions.length === 1 && (
                <div className="flex items-center gap-2 text-sm text-[var(--body-text)]">
                  <Clock className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                  {t.departure}:{" "}
                  <span className="font-semibold">{timeOptions[0]}</span>
                </div>
              )}

              {timeOptions.length === 0 && activeDepartureTime && (
                <div className="flex items-center gap-2 text-sm text-[var(--body-text)]">
                  <Clock className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                  {activeDepartureTime}
                </div>
              )}

              {selectedOperation?.note && (
                <div className="rounded-xl border border-sky-200 bg-sky-50 px-3 py-2 text-sm text-sky-800">
                  {selectedOperation.note}
                </div>
              )}

              {sameDayClosedForSelectedDate && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
                  {getSameDayBookingClosedMessage(
                    tourSlug,
                    selectedOperation?.departureTimeOverride || selectedTime || departureTime
                  )}
                </div>
              )}

              {/* Guest counters */}
              <div className="space-y-3">
                <label className="text-sm font-medium flex items-center gap-1.5 text-[var(--heading)]">
                  <Users className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                  {t.guests}
                </label>
                <p className="text-xs text-[var(--text-muted)]">
                  {t.maxGuestsLine(MAX_BOOKING_GUESTS)}
                </p>

                {/* Adults */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-[var(--heading)]">
                      {bookingLabels.adults}
                    </div>
                    <div className="text-xs text-[var(--text-muted)]">
                      {bookingLabels.adultsHint}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      translate="no"
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      disabled={adults <= 1}
                      className="w-9 h-9 flex items-center justify-center rounded-full border-2 border-[var(--line)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[var(--line)] disabled:hover:text-inherit"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-bold w-8 text-center text-lg">
                      {adults}
                    </span>
                    <button
                      translate="no"
                      onClick={() =>
                        setAdults(Math.min(MAX_BOOKING_GUESTS - children - infants, adults + 1))
                      }
                      disabled={adults + children + infants >= MAX_BOOKING_GUESTS}
                      className="w-9 h-9 flex items-center justify-center rounded-full border-2 border-[var(--line)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[var(--line)] disabled:hover:text-inherit"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Children — 3-13 yaş, %50 indirim */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-[var(--heading)]">
                      {bookingLabels.children}
                    </div>
                    <div className="text-xs text-[var(--text-muted)]">
                      {bookingLabels.childrenHint}
                      {isAlcoholicSelection ? bookingLabels.noAlcoholHint : ""}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      translate="no"
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      disabled={children <= 0 || isAlcoholicSelection}
                      className="w-9 h-9 flex items-center justify-center rounded-full border-2 border-[var(--line)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[var(--line)] disabled:hover:text-inherit"
                      aria-label="Bir çocuk az"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-bold w-8 text-center text-lg">
                      {effectiveChildren}
                    </span>
                    <button
                      translate="no"
                      onClick={() =>
                        setChildren(
                          Math.min(
                            MAX_BOOKING_GUESTS - adults - infants,
                            children + 1,
                          ),
                        )
                      }
                      disabled={
                        isAlcoholicSelection ||
                        adults + children + infants >= MAX_BOOKING_GUESTS
                      }
                      className="w-9 h-9 flex items-center justify-center rounded-full border-2 border-[var(--line)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[var(--line)] disabled:hover:text-inherit"
                      aria-label="Bir çocuk fazla"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Infants — 0-3 yaş, ücretsiz */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-[var(--heading)]">
                      {bookingLabels.infants}
                    </div>
                    <div className="text-xs text-[var(--text-muted)]">
                      {bookingLabels.infantsHint}
                      {isAlcoholicSelection ? bookingLabels.noAlcoholHint : ""}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      translate="no"
                      onClick={() => setInfants(Math.max(0, infants - 1))}
                      disabled={infants <= 0 || isAlcoholicSelection}
                      className="w-9 h-9 flex items-center justify-center rounded-full border-2 border-[var(--line)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[var(--line)] disabled:hover:text-inherit"
                      aria-label="Bir bebek az"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-bold w-8 text-center text-lg">
                      {effectiveInfants}
                    </span>
                    <button
                      translate="no"
                      onClick={() =>
                        setInfants(
                          Math.min(
                            MAX_BOOKING_GUESTS - adults - children,
                            infants + 1,
                          ),
                        )
                      }
                      disabled={
                        isAlcoholicSelection ||
                        adults + children + infants >= MAX_BOOKING_GUESTS
                      }
                      className="w-9 h-9 flex items-center justify-center rounded-full border-2 border-[var(--line)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[var(--line)] disabled:hover:text-inherit"
                      aria-label="Bir bebek fazla"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Price breakdown */}
              <div className="space-y-2 py-3 border-t border-[var(--line)]">
                {isWeekdayDiscountDay && weekdayDiscount && (
                  <div className="flex items-center justify-between text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-2 py-1">
                    <span>
                      {t.weekdayDiscountLine(
                        selectedDate
                          ? selectedDate.getDay() === 2
                            ? t.weekdayShort.tue
                            : t.weekdayShort.thu
                          : ""
                      )}
                    </span>
                    <span>
                      €{priceEur} → €{weekdayDiscount.discountedPrice}{t.perPerson}
                    </span>
                  </div>
                )}
                {originalTotal && (
                  <div className="flex items-center justify-between text-sm text-[var(--text-muted)]">
                    <span>{t.standardDirectFare}</span>
                    <span className="line-through">€{originalTotal}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  {isPerGroup ? (
                    <span className="text-[var(--body-text)]">
                      €{effectivePriceEur} {t.privateCharterPrice}
                    </span>
                  ) : (
                    <span className="text-[var(--body-text)]">
                      {t.perPersonPriceLine(effectivePriceEur, totalGuests)}
                    </span>
                  )}
                  <span className="font-medium">€{total}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[var(--heading)]">
                    {t.total}
                  </span>
                  <span className="text-2xl font-bold text-[var(--heading)]">
                    €{total}
                  </span>
                </div>
                {/* Clarity (May 27) showed users clicking the €{total} text
                    expecting interaction. Adding a clear "pay onboard" sub-line
                    converts the dead intent into a trust signal — no upfront
                    payment is one of the highest-converting cues for direct
                    booking (vs OTAs that demand prepayment). */}
                <p className="-mt-1 text-xs text-[var(--text-muted)]">
                  Pay onboard · no upfront payment · free cancellation up to 24 h before departure
                </p>
                {originalTotal && (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
                    {t.youSaveOnReservation(totalSavings)}
                  </div>
                )}
              </div>

              {/* Book button — note: NOT disabled when only the time slot is
                  missing. Instead we intercept the click and nudge the user to
                  the time-pill row (Clarity showed dead-click rage on the
                  disabled state). The sameDay-closed case stays disabled. */}
              <motion.button
                translate="no"
                onClick={() => {
                  if (sameDayClosedForSelectedDate) return;
                  if (timeOptions.length > 1 && !normalizedSelectedTime) {
                    setTimeNudge(true);
                    const target = document.getElementById("time-slot-pills");
                    if (target) {
                      const top =
                        target.getBoundingClientRect().top +
                        window.scrollY -
                        110;
                      window.scrollTo({ top, behavior: "smooth" });
                    }
                    window.setTimeout(() => setTimeNudge(false), 2000);
                    return;
                  }
                  handleBookNow();
                }}
                disabled={sameDayClosedForSelectedDate}
                aria-disabled={
                  sameDayClosedForSelectedDate ||
                  (timeOptions.length > 1 && !normalizedSelectedTime)
                }
                className="btn-cta w-full !py-3.5 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                whileTap={{ scale: 0.98 }}
              >
                {sameDayClosedForSelectedDate
                  ? t.sameDayBookingClosed
                  : timeOptions.length > 1 && !normalizedSelectedTime
                  ? t.selectDepartureTime
                  : t.continueToBooking}
              </motion.button>

              {/* WhatsApp */}
              {(() => {
                const dateLabel = format(selectedDate, "dd MMM yyyy");
                const whatsappBody = t.whatsappBookingMessage(tourName, dateLabel, totalGuests);
                const whatsappHref = `https://wa.me/905448989812?text=${encodeURIComponent(whatsappBody)}`;
                return (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) =>
                      handleTrackedContactNavigation(event, {
                        href: whatsappHref,
                        intent: "during_booking",
                        kind: "whatsapp",
                        label: "booking_calendar_whatsapp",
                        location: tourSlug,
                      })
                    }
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[var(--brand-whatsapp)] text-white font-semibold hover:brightness-110 transition-all text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    {t.bookViaWhatsApp}
                  </a>
                );
              })()}

              <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] justify-center">
                <Shield className="w-3.5 h-3.5" />
                {t.freeCancellation}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
