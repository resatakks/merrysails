"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isBefore,
  isSameDay,
  isSameMonth,
  isToday,
  startOfDay,
  startOfMonth,
  subMonths,
} from "date-fns";
import { usePathname } from "next/navigation";
import { Calendar, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import {
  getSameDayBookingClosedMessage,
  isSameDayBookingClosed,
} from "@/lib/booking-cutoffs";
import {
  detectBookingLocaleFromPathname,
  getBookingCalendarStrings,
} from "@/i18n/booking-strings";

interface TourOperationClientSnapshot {
  id: string;
  tourSlug: string;
  date: string;
  isSoldOut: boolean;
  departureTimeOverride: string | null;
  note: string | null;
}

interface PlannerDateCalendarProps {
  tourSlug: string;
  priceEur: number;
  departureTime?: string;
  value?: Date;
  /**
   * Optional recurring weekday discount. When provided, days that fall on one
   * of the listed weekdays render at `discountedPrice` instead of `priceEur`,
   * and pick up a subtle "−" badge so guests can see the deal at a glance.
   * Weekday values use the JS Date.getDay() convention (0=Sun, 1=Mon, ...).
   */
  weekdayDiscount?: {
    weekdays: number[];
    discountedPrice: number;
  };
  onSelect: (
    date: Date | undefined,
    context: { departureTimeOverride?: string | null; note?: string | null }
  ) => void;
}

const emptySubscribe = () => () => {};

export function PlannerDateCalendar({
  tourSlug,
  priceEur,
  departureTime,
  value,
  weekdayDiscount,
  onSelect,
}: PlannerDateCalendarProps) {
  const t = getBookingCalendarStrings(
    detectBookingLocaleFromPathname(usePathname())
  );
  const selectedDate = value ? startOfDay(value) : undefined;
  const [navigationMonth, setNavigationMonth] = useState<Date | null>(
    selectedDate ?? null
  );
  const [operations, setOperations] = useState<TourOperationClientSnapshot[]>([]);

  const operationsByDate = useMemo(
    () =>
      Object.fromEntries(
        operations.map((operation) => [operation.date, operation])
      ) as Record<string, TourOperationClientSnapshot>,
    [operations]
  );

  const selectedOperation = selectedDate
    ? operationsByDate[format(selectedDate, "yyyy-MM-dd")]
    : undefined;
  const isHydrated = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const now = isHydrated ? new Date() : null;

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

  if (!isHydrated || !now) {
    return (
      <section className="rounded-[1.7rem] border border-[var(--line)] bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[var(--heading)]">
          <Calendar className="h-4 w-4 text-[var(--brand-primary)]" />
          {t.selectYourPreferredDate}
        </div>
        <div className="h-64 animate-pulse rounded-[1.5rem] bg-[var(--surface-alt)]" />
      </section>
    );
  }

  const today = startOfDay(now);
  const tomorrow = addDays(today, 1);
  const resolvedNavigationMonth = navigationMonth ?? selectedDate ?? today;
  const currentMonth =
    selectedDate && !isSameMonth(resolvedNavigationMonth, selectedDate)
      ? selectedDate
      : resolvedNavigationMonth;
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDay = getDay(monthStart);
  const blanks = startDay === 0 ? 6 : startDay - 1;
  const canGoPrev =
    !isSameMonth(currentMonth, today) &&
    !isBefore(subMonths(monthStart, 1), startOfMonth(today));

  return (
    <section className="rounded-[1.7rem] border border-[var(--line)] bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[var(--heading)]">
        <Calendar className="h-4 w-4 text-[var(--brand-primary)]" />
        {t.selectYourPreferredDate}
      </div>

      <div className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface-alt)] p-4">
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              if (canGoPrev) {
                setNavigationMonth(subMonths(currentMonth, 1));
              }
            }}
            disabled={!canGoPrev}
            aria-label={`Go to ${format(subMonths(currentMonth, 1), "MMMM yyyy")}`}
            className="rounded-lg p-2 transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {/* Clarity (14d /reservation): 18 dead clicks on the "June 2026"
              month label — users tap the title expecting it to advance the
              calendar like the chevrons. Wire it to the next month so the
              tap has a response (it sits next to the forward chevron, which
              is the dominant browsing direction when scouting dates). */}
          <button
            type="button"
            onClick={() => setNavigationMonth(addMonths(currentMonth, 1))}
            aria-label={`${format(currentMonth, "MMMM yyyy")} — go to ${format(addMonths(currentMonth, 1), "MMMM yyyy")}`}
            className="rounded-lg px-2 py-1 font-semibold text-[var(--heading)] transition-colors hover:bg-white"
          >
            {format(currentMonth, "MMMM yyyy")}
          </button>
          <button
            type="button"
            onClick={() => setNavigationMonth(addMonths(currentMonth, 1))}
            aria-label={`Go to ${format(addMonths(currentMonth, 1), "MMMM yyyy")}`}
            className="rounded-lg p-2 transition-colors hover:bg-white"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-1 grid grid-cols-7">
          {t.dayLabels.map((dayLabel) => (
            <div
              key={dayLabel}
              className="py-2 text-center text-xs font-medium text-[var(--text-muted)]"
            >
              {dayLabel}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-1">
          {/* 2026-06-06: pointer-events-none + aria-hidden so taps on the
              pre-first-of-month placeholders don't register as dead clicks.
              Clarity flagged 265 clicks on " " whitespace in 7d on
              /reservation — root cause was these empty grid cells. */}
          {Array.from({ length: blanks }).map((_, index) => (
            <div
              key={`blank-${index}`}
              className="pointer-events-none"
              aria-hidden="true"
            />
          ))}

          {days.map((day) => {
            const dayKey = format(day, "yyyy-MM-dd");
            const operation = operationsByDate[dayKey];
            const isPast = isBefore(day, today);
            const isSoldOut = operation?.isSoldOut ?? false;
            const isCutoffClosed = isSameDayBookingClosed(
              tourSlug,
              day,
              now,
              operation?.departureTimeOverride || departureTime
            );
            const isDisabled = isPast || isSoldOut || isCutoffClosed;
            const isSelected = Boolean(
              selectedDate && day.getTime() === selectedDate.getTime()
            );
            const isTodayDate = isToday(day);
            const isTomorrowDate = isSameDay(day, tomorrow);
            const hasOperationalUpdate =
              Boolean(operation?.departureTimeOverride) || Boolean(operation?.note);
            const showLastSpots = !isDisabled && (isTodayDate || isTomorrowDate);

            return (
              <button
                key={dayKey}
                type="button"
                onClick={() => {
                  if (isDisabled) return;
                  // Clarity (14d /reservation): dead clicks on "Last spots!"
                  // (19) and the cell price (e.g. "€220", 26) — tomorrow is
                  // pre-selected, so re-tapping the already-selected cell was
                  // a no-op. Scroll the date confirmation + CTA into view so
                  // the re-tap has a visible response instead of nothing.
                  if (isSelected) {
                    if (typeof document !== "undefined") {
                      document
                        .getElementById("planner-selected-date")
                        ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
                    }
                    return;
                  }
                  onSelect(day, {
                    departureTimeOverride: operation?.departureTimeOverride,
                    note: operation?.note,
                  });
                }}
                disabled={isDisabled}
                className={`relative rounded-lg py-2 text-center text-sm transition-all ${isDisabled ? "pointer-events-none " : ""}${
                  isSoldOut
                    ? "cursor-not-allowed text-gray-300 line-through"
                    : isPast
                    ? "cursor-not-allowed text-gray-300"
                    : isSelected
                    ? "bg-[var(--brand-primary)] font-bold text-white shadow-md"
                    : "text-[var(--body-text)] hover:bg-white"
                } ${
                  isTodayDate && !isSelected
                    ? "font-bold text-[var(--brand-primary)] ring-1 ring-[var(--brand-primary)]/25"
                    : ""
                }`}
              >
                <div className="relative inline-block">
                  {format(day, "d")}
                  {hasOperationalUpdate && !isDisabled && !isSelected && (
                    <span className="absolute -right-1.5 -bottom-0.5 h-1.5 w-1.5 rounded-full bg-sky-500" />
                  )}
                </div>
                {isSoldOut ? (
                  <div className="text-[9px] font-semibold text-gray-400">{t.soldOut}</div>
                ) : isCutoffClosed ? (
                  <div className="text-[9px] font-semibold text-gray-400">{t.closed}</div>
                ) : operation?.departureTimeOverride ? (
                  <div
                    className={`text-[9px] font-bold ${
                      isSelected ? "text-white/85" : "text-sky-600"
                    }`}
                  >
                    {operation.departureTimeOverride}
                  </div>
                ) : showLastSpots ? (
                  <div
                    className={`text-[9px] font-bold ${
                      isSelected ? "text-white/85" : "text-red-500"
                    }`}
                  >
                    {t.lastSpots}
                  </div>
                ) : !isPast ? (
                  (() => {
                    const isDiscountDay = Boolean(
                      weekdayDiscount && weekdayDiscount.weekdays.includes(getDay(day))
                    );
                    const dayPrice = isDiscountDay
                      ? weekdayDiscount!.discountedPrice
                      : priceEur;
                    return (
                      <div
                        className={`text-[10px] font-semibold ${
                          isSelected
                            ? "text-white/80"
                            : isDiscountDay
                            ? "text-emerald-600"
                            : "text-[var(--brand-gold)]"
                        }`}
                      >
                        €{dayPrice}
                        {isDiscountDay && !isSelected && (
                          <span className="ml-0.5 text-[8px] font-bold text-emerald-700">
                            −
                          </span>
                        )}
                      </div>
                    );
                  })()
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {selectedDate && (
        <div id="planner-selected-date" className="mt-4 scroll-mt-24 space-y-3">
          <div className="flex items-center gap-2 rounded-xl bg-[var(--brand-primary)]/5 px-3 py-2.5">
            <Calendar className="h-4 w-4 text-[var(--brand-primary)]" />
            <span className="text-sm font-semibold text-[var(--heading)]">
              {format(selectedDate, "EEEE, dd MMM yyyy")}
            </span>
            {selectedOperation?.departureTimeOverride && (
              <span className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-sky-700">
                <Clock className="h-3.5 w-3.5" />
                {selectedOperation.departureTimeOverride}
              </span>
            )}
          </div>

          {selectedOperation?.note && (
            <div className="rounded-xl border border-sky-200 bg-sky-50 px-3 py-2 text-sm text-sky-800">
              {selectedOperation.note}
            </div>
          )}

          {/* Clarity (14d /reservation): 26 dead clicks on "Choose your date
              here" — a date is already pre-selected when this shows, so the
              instruction-style copy read like a tappable CTA. Reworded to a
              plain confirmation hint (no imperative) so it stops inviting
              clicks; the calendar grid above is the actual date control. */}
          {!selectedOperation?.note && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
              {selectedDate && isSameDay(selectedDate, today)
                ? getSameDayBookingClosedMessage(tourSlug, departureTime) ??
                  "Same-day reservations depend on departure cutoffs."
                : "This date uses the same validation rules as the product pages. Pick another day in the calendar above any time."}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
