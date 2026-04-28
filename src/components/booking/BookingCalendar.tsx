"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
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
  tourName: string;
  departureTime?: string;
  departurePoint?: string;
  priceMode?: PriceMode;
  initialDate?: Date;
  initialGuests?: number;
  initialTime?: string;
  onBook?: (date: Date, guests: number, time: string) => void;
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

const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const emptySubscribe = () => () => {};

export default function BookingCalendar({
  tourSlug,
  priceEur,
  originalPriceEur,
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

  const [currentMonth, setCurrentMonth] = useState<Date | null>(safeInitialDate);
  const [selectedDate, setSelectedDate] = useState<Date | null>(safeInitialDate);
  const [adults, setAdults] = useState(safeInitialGuests);
  const [children, setChildren] = useState(0);
  const [selectedTime, setSelectedTime] = useState(initialTime ?? "");
  const [operations, setOperations] = useState<TourOperationClientSnapshot[]>([]);
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

  const totalGuests = adults + children;
  const total = isPerGroup ? priceEur : priceEur * totalGuests;
  const hasDiscount =
    typeof originalPriceEur === "number" && originalPriceEur > priceEur;
  const originalTotal = hasDiscount
    ? isPerGroup
      ? originalPriceEur
      : originalPriceEur * totalGuests
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
  const bookingLabel = isPerGroup
    ? "Request now, confirm with operations"
    : "Reserve now, pay onboard";
  const bookingMetaText = isPerGroup
    ? "Private charters are reviewed and confirmed in writing"
    : "Selected date and guests update the total below";
  const bookingPillText = isPerGroup
    ? "Private charter request"
    : "Shared cruise request";
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
      onBook(selectedDate, totalGuests, effectiveTime || activeDepartureTime || "");
    }
  };

  if (!isHydrated || !now) {
    return (
      <div id="booking-calendar" className="scroll-mt-24 overflow-hidden rounded-2xl border border-[var(--line)] bg-white shadow-sm">
        <div className="bg-[var(--brand-price-box)] px-5 py-5">
          <SalePrice
            price={priceEur}
            originalPrice={originalPriceEur}
            suffix={isPerGroup ? "/group" : "/person"}
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
            suffix={isPerGroup ? "/group" : "/person"}
            label={bookingLabel}
            size="lg"
            tone="overlay"
            showBadge={Boolean(hasDiscount)}
            showMeta={Boolean(hasDiscount)}
            metaText={bookingMetaText}
          />
          <div className="hidden rounded-2xl border border-white/10 bg-white/10 px-3 py-2 sm:block">
            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">
              Booking
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
            Select your preferred date
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

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-1">
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
        <div className="grid grid-cols-7">
          {Array.from({ length: blanks }).map((_, i) => (
            <div key={`blank-${i}`} />
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
                    Sold Out
                  </div>
                ) : isCutoffClosed ? (
                  <div className="text-[9px] font-semibold text-gray-400">
                    Closed
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
                    Last spots!
                  </div>
                ) : !isPast ? (
                  <div
                    className={`text-[10px] font-semibold ${
                      isSelected
                        ? "text-white/80"
                        : "text-[var(--brand-gold)]"
                    }`}
                  >
                    €{priceEur}
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
                  onClick={() => setSelectedDate(null)}
                  className="ml-auto text-xs text-[var(--text-muted)] hover:text-[var(--body-text)] transition-colors"
                >
                  Change
                </button>
              </div>

              {/* Time slot pills */}
              {timeOptions.length > 1 && (
                <div>
                  <label className="text-sm font-medium mb-2 flex items-center gap-1.5 text-[var(--heading)]">
                    <Clock className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                    Departure Time
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {timeOptions.map((time) => (
                      <button
                        key={time}
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
                  Departure:{" "}
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
                  Guests
                </label>
                <p className="text-xs text-[var(--text-muted)]">
                  A maximum of {MAX_BOOKING_GUESTS} guests can be added in one booking flow.
                </p>

                {/* Adults */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-[var(--heading)]">
                      Adults
                    </div>
                    <div className="text-xs text-[var(--text-muted)]">
                      Age 13+
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
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
                      onClick={() =>
                        setAdults(Math.min(MAX_BOOKING_GUESTS - children, adults + 1))
                      }
                      disabled={adults + children >= MAX_BOOKING_GUESTS}
                      className="w-9 h-9 flex items-center justify-center rounded-full border-2 border-[var(--line)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[var(--line)] disabled:hover:text-inherit"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-[var(--heading)]">
                      Children
                    </div>
                    <div className="text-xs text-[var(--text-muted)]">
                      Age 0–12
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      disabled={children <= 0}
                      className="w-9 h-9 flex items-center justify-center rounded-full border-2 border-[var(--line)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[var(--line)] disabled:hover:text-inherit"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-bold w-8 text-center text-lg">
                      {children}
                    </span>
                    <button
                      onClick={() =>
                        setChildren(Math.min(MAX_BOOKING_GUESTS - adults, children + 1))
                      }
                      disabled={adults + children >= MAX_BOOKING_GUESTS}
                      className="w-9 h-9 flex items-center justify-center rounded-full border-2 border-[var(--line)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[var(--line)] disabled:hover:text-inherit"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Price breakdown */}
              <div className="space-y-2 py-3 border-t border-[var(--line)]">
                {originalTotal && (
                  <div className="flex items-center justify-between text-sm text-[var(--text-muted)]">
                    <span>Standard direct fare</span>
                    <span className="line-through">€{originalTotal}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  {isPerGroup ? (
                    <span className="text-[var(--body-text)]">
                      €{priceEur} private charter price
                    </span>
                  ) : (
                    <span className="text-[var(--body-text)]">
                      €{priceEur} × {totalGuests} guest
                      {totalGuests > 1 ? "s" : ""}
                    </span>
                  )}
                  <span className="font-medium">€{total}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[var(--heading)]">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-[var(--heading)]">
                    €{total}
                  </span>
                </div>
                {originalTotal && (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
                    You save €{totalSavings} on this reservation when you book the
                    current fare.
                  </div>
                )}
              </div>

              {/* Book button */}
              <motion.button
                onClick={handleBookNow}
                disabled={
                  sameDayClosedForSelectedDate ||
                  (timeOptions.length > 1 && !normalizedSelectedTime)
                }
                className="btn-cta w-full !py-3.5 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                whileTap={{ scale: 0.98 }}
              >
                {sameDayClosedForSelectedDate
                  ? "Same-Day Booking Closed"
                  : timeOptions.length > 1 && !normalizedSelectedTime
                  ? "Select a Departure Time"
                  : "Continue to booking"}
              </motion.button>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/905370406822?text=Hi, I'd like to book ${tourName} on ${format(
                  selectedDate,
                  "dd MMM yyyy"
                )} for ${totalGuests} guests.`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) =>
                  handleTrackedContactNavigation(event, {
                    href: `https://wa.me/905370406822?text=Hi, I'd like to book ${tourName} on ${format(
                      selectedDate,
                      "dd MMM yyyy"
                    )} for ${totalGuests} guests.`,
                    intent: "during_booking",
                    kind: "whatsapp",
                    label: "booking_calendar_whatsapp",
                    location: tourSlug,
                  })
                }
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[var(--brand-whatsapp)] text-white font-semibold hover:brightness-110 transition-all text-sm"
              >
                <Phone className="w-4 h-4" />
                Book via WhatsApp
              </a>

              <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] justify-center">
                <Shield className="w-3.5 h-3.5" />
                Free cancellation up to 24h before
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
