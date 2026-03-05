"use client";

import { useState } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isBefore, isToday, startOfDay } from "date-fns";
import { ChevronLeft, ChevronRight, Minus, Plus, Phone, Shield } from "lucide-react";

interface Props {
  tourSlug: string;
  priceEur: number;
  tourName: string;
}

const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function BookingCalendar({ tourSlug, priceEur, tourName }: Props) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState(2);

  const today = startOfDay(new Date());
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Monday = 0, so adjust getDay (0=Sun) to Monday-first
  const startDay = getDay(monthStart);
  const blanks = startDay === 0 ? 6 : startDay - 1;

  const total = priceEur * guests;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[var(--line)] overflow-hidden">
      {/* Price header */}
      <div className="price-box !rounded-none">
        <span className="currency">€</span>
        <span className="amount">{priceEur}</span>
        <span className="suffix">/person</span>
      </div>

      {/* Calendar */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
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
            <div key={d} className="text-center text-xs font-medium text-[var(--text-muted)] py-2">
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
            const isSelected = selectedDate && day.getTime() === selectedDate.getTime();
            const isTodayDate = isToday(day);

            return (
              <button
                key={day.toISOString()}
                onClick={() => !isPast && setSelectedDate(day)}
                disabled={isPast}
                className={`py-2 text-center rounded-lg text-sm transition-all ${
                  isPast
                    ? "text-gray-300 cursor-not-allowed"
                    : isSelected
                    ? "bg-[var(--brand-primary)] text-white font-bold"
                    : "hover:bg-gray-100 text-[var(--body-text)]"
                } ${isTodayDate && !isSelected ? "font-bold text-[var(--brand-primary)]" : ""}`}
              >
                <div>{format(day, "d")}</div>
                {!isPast && (
                  <div className="text-[10px] text-[var(--brand-gold)] font-semibold">
                    €{priceEur}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Booking summary */}
      {selectedDate && (
        <div className="border-t border-[var(--line)] p-5 space-y-4">
          <div className="text-sm text-[var(--text-muted)]">
            Selected: <span className="font-semibold text-[var(--heading)]">{format(selectedDate, "dd MMM yyyy")}</span>
          </div>

          {/* Guest selector */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Guests</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-[var(--line)] hover:bg-gray-50 transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-semibold w-8 text-center">{guests}</span>
              <button
                onClick={() => setGuests(Math.min(20, guests + 1))}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-[var(--line)] hover:bg-gray-50 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between py-3 border-t border-[var(--line)]">
            <span className="font-semibold">Total</span>
            <span className="text-2xl font-bold text-[var(--heading)]">€{total}</span>
          </div>

          {/* Book button */}
          <button className="btn-cta w-full !py-3.5 text-base">
            Book Now
          </button>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/905524638498?text=Hi, I'd like to book ${tourName} on ${format(selectedDate, "dd MMM yyyy")} for ${guests} guests.`}
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
      )}
    </div>
  );
}
