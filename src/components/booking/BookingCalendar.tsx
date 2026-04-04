"use client";

import { useState } from "react";
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

interface Props {
  tourSlug: string;
  priceEur: number;
  tourName: string;
  departureTime?: string;
  departurePoint?: string;
  onBook?: (date: Date, guests: number, time: string) => void;
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

/** Simple deterministic hash from a string. */
function hashSlug(slug: string, salt: number = 0): number {
  let h = 0x811c9dc5;
  const s = slug + String(salt);
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return Math.abs(h);
}

/** Generate 2-3 "sold out" days in the next 14 days based on slug hash. */
function getSoldOutDays(slug: string, today: Date): Date[] {
  const count = 2 + (hashSlug(slug, 999) % 2); // 2 or 3
  const days: Date[] = [];
  for (let i = 0; i < count; i++) {
    // Pick a day 2-13 days from today (avoid tomorrow which gets "Last spots!")
    const offset = 2 + (hashSlug(slug, 500 + i) % 12);
    days.push(addDays(today, offset));
  }
  return days;
}

const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function BookingCalendar({
  tourSlug,
  priceEur,
  tourName,
  departureTime,
  departurePoint,
  onBook,
}: Props) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [selectedTime, setSelectedTime] = useState("");

  const today = startOfDay(new Date());
  const soldOutDays = getSoldOutDays(tourSlug, today);
  const tomorrow = addDays(today, 1);
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const startDay = getDay(monthStart);
  const blanks = startDay === 0 ? 6 : startDay - 1;

  const totalGuests = adults + children;
  const total = priceEur * totalGuests;
  const timeOptions = parseTimeOptions(departureTime);
  const effectiveTime =
    selectedTime || (timeOptions.length === 1 ? timeOptions[0] : "");

  const canGoPrev = isSameMonth(currentMonth, new Date())
    ? false
    : !isBefore(subMonths(monthStart, 1), startOfMonth(today));

  const handleBookNow = () => {
    if (selectedDate && onBook) {
      onBook(selectedDate, totalGuests, effectiveTime || departureTime || "");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[var(--line)] overflow-hidden">
      {/* Price header */}
      <div className="price-box !rounded-none">
        <span className="currency">€</span>
        <span className="amount">{priceEur}</span>
        <span className="suffix">/person</span>
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
              canGoPrev || !isSameMonth(currentMonth, new Date())
                ? setCurrentMonth(subMonths(currentMonth, 1))
                : null
            }
            disabled={isSameMonth(currentMonth, new Date())}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-semibold text-[var(--heading)]">
            {format(currentMonth, "MMMM yyyy")}
          </span>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
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
            const isSoldOut = soldOutDays.some((d) => isSameDay(d, day));
            const isDisabled = isPast || isSoldOut;
            const isSelected =
              selectedDate && day.getTime() === selectedDate.getTime();
            const isTodayDate = isToday(day);
            const isTomorrow = isSameDay(day, tomorrow);
            const dayOfWeek = getDay(day); // 0=Sun, 5=Fri, 6=Sat
            const isWeekendDay = dayOfWeek === 5 || dayOfWeek === 6;
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
                </div>
                {isSoldOut ? (
                  <div className="text-[9px] font-semibold text-gray-400">
                    Sold Out
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
                          selectedTime === time
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

              {timeOptions.length === 0 && departureTime && (
                <div className="flex items-center gap-2 text-sm text-[var(--body-text)]">
                  <Clock className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                  {departureTime}
                </div>
              )}

              {/* Guest counters */}
              <div className="space-y-3">
                <label className="text-sm font-medium flex items-center gap-1.5 text-[var(--heading)]">
                  <Users className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                  Guests
                </label>

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
                        setAdults(Math.min(20 - children, adults + 1))
                      }
                      disabled={adults + children >= 20}
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
                        setChildren(Math.min(20 - adults, children + 1))
                      }
                      disabled={adults + children >= 20}
                      className="w-9 h-9 flex items-center justify-center rounded-full border-2 border-[var(--line)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[var(--line)] disabled:hover:text-inherit"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Price breakdown */}
              <div className="space-y-2 py-3 border-t border-[var(--line)]">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--body-text)]">
                    €{priceEur} × {totalGuests} guest
                    {totalGuests > 1 ? "s" : ""}
                  </span>
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
              </div>

              {/* Book button */}
              <motion.button
                onClick={handleBookNow}
                disabled={timeOptions.length > 1 && !selectedTime}
                className="btn-cta w-full !py-3.5 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                whileTap={{ scale: 0.98 }}
              >
                {timeOptions.length > 1 && !selectedTime
                  ? "Select a Departure Time"
                  : "Book Now"}
              </motion.button>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/905370406822?text=Hi, I'd like to book ${tourName} on ${format(
                  selectedDate,
                  "dd MMM yyyy"
                )} for ${totalGuests} guests.`}
                target="_blank"
                rel="noopener noreferrer"
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
