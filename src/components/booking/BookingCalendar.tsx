"use client";

import { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameDay,
  isBefore,
  isToday,
  addMonths,
  subMonths,
  getDay,
  startOfDay,
} from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Users,
  Calendar,
  Check,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

interface BookingCalendarProps {
  tourSlug: string;
  priceEur: number;
  tourName: string;
}

export default function BookingCalendar({
  tourSlug,
  priceEur,
  tourName,
}: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState<number>(2);

  const today = startOfDay(new Date());
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Monday = 0, Sunday = 6 (ISO week)
  const startDayOfWeek = getDay(monthStart);
  // Convert from Sunday=0 to Monday=0 format
  const emptyDays = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDateSelect = (day: Date) => {
    if (isBefore(day, today)) return;
    setSelectedDate(day);
  };

  const handleGuestChange = (delta: number) => {
    setGuests((prev) => Math.min(20, Math.max(1, prev + delta)));
  };

  const totalPrice = priceEur * guests;

  return (
    <div className="space-y-6">
      {/* Calendar */}
      <div className="bg-white rounded-2xl shadow-card p-6">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5 text-body" />
          </button>
          <h3 className="text-lg font-semibold text-heading">
            {format(currentMonth, "MMMM yyyy")}
          </h3>
          <button
            onClick={handleNextMonth}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5 text-body" />
          </button>
        </div>

        {/* Weekday Headers */}
        <div className="calendar-grid mb-2">
          {weekDays.map((day) => (
            <div
              key={day}
              className="calendar-header text-xs font-semibold text-muted uppercase tracking-wide text-center py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Day Cells */}
        <div className="calendar-grid">
          {/* Empty cells before first day */}
          {Array.from({ length: emptyDays }).map((_, index) => (
            <div key={`empty-${index}`} className="calendar-day-empty" />
          ))}

          {/* Day cells */}
          {daysInMonth.map((day) => {
            const isPast = isBefore(day, today);
            const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
            const isTodayDate = isToday(day);

            return (
              <button
                key={day.toISOString()}
                onClick={() => handleDateSelect(day)}
                disabled={isPast}
                className={`
                  calendar-day relative flex flex-col items-center justify-center
                  rounded-xl p-2 min-h-[72px] transition-all duration-200
                  ${
                    isPast
                      ? "calendar-day-unavailable opacity-40 cursor-not-allowed bg-gray-50 text-gray-400"
                      : isSelected
                      ? "calendar-day-selected bg-primary text-white shadow-lg scale-105"
                      : "calendar-day-available hover:bg-primary/10 hover:scale-102 cursor-pointer bg-white border border-gray-100"
                  }
                `}
              >
                <span
                  className={`text-sm ${
                    isTodayDate && !isSelected ? "font-bold text-primary" : ""
                  } ${isSelected ? "font-bold" : "font-medium"}`}
                >
                  {format(day, "d")}
                </span>

                {!isPast && (
                  <>
                    <span
                      className={`text-xs mt-0.5 ${
                        isSelected
                          ? "text-white/90"
                          : "text-green-600 font-semibold"
                      }`}
                    >
                      €{priceEur}
                    </span>
                    <Check
                      className={`w-3 h-3 mt-0.5 ${
                        isSelected ? "text-white/80" : "text-green-500"
                      }`}
                    />
                  </>
                )}
              </button>
            );
          })}
        </div>

        {/* Currency Note */}
        <p className="text-xs text-muted text-center mt-4">
          Showing prices in EUR (Euro)
        </p>
      </div>

      {/* Booking Summary */}
      {selectedDate && (
        <div className="bg-white rounded-2xl shadow-card p-6 space-y-5 animate-fade-in">
          <h3 className="text-lg font-semibold text-heading flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Booking Summary
          </h3>

          {/* Tour Name */}
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-sm text-muted">Tour</span>
              <span className="text-sm font-medium text-heading text-right max-w-[60%]">
                {tourName}
              </span>
            </div>

            {/* Selected Date */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted">Date</span>
              <span className="text-sm font-medium text-heading">
                {format(selectedDate, "EEEE, MMMM d, yyyy")}
              </span>
            </div>

            {/* Guest Count Selector */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                Guests
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleGuestChange(-1)}
                  disabled={guests <= 1}
                  className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                    text-heading hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  -
                </button>
                <span className="text-sm font-semibold text-heading w-6 text-center">
                  {guests}
                </span>
                <button
                  onClick={() => handleGuestChange(1)}
                  disabled={guests >= 20}
                  className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center
                    text-heading hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>
            </div>

            {/* Price Calculation */}
            <div className="border-t border-gray-100 pt-3">
              <div className="flex justify-between items-center text-sm text-muted mb-1">
                <span>
                  €{priceEur} x {guests} guest{guests > 1 ? "s" : ""}
                </span>
                <span>€{totalPrice}</span>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center bg-gray-50 rounded-xl p-4">
              <span className="text-base font-semibold text-heading">
                Total
              </span>
              <span className="text-2xl font-bold text-primary">
                €{totalPrice}
              </span>
            </div>
          </div>

          {/* Book Now Button */}
          <Link
            href={`/booking/${tourSlug}?date=${format(
              selectedDate,
              "yyyy-MM-dd"
            )}&guests=${guests}`}
            className="btn-cta w-full block text-center text-lg"
          >
            Book Now — €{totalPrice}
          </Link>

          {/* Free Cancellation Note */}
          <p className="text-xs text-center text-muted flex items-center justify-center gap-1">
            <Check className="w-3.5 h-3.5 text-green-500" />
            Free cancellation up to 24h before departure
          </p>

          {/* WhatsApp Contact */}
          <Link
            href={`https://wa.me/905551234567?text=${encodeURIComponent(
              `Hi! I'd like to book ${tourName} on ${format(
                selectedDate,
                "MMMM d, yyyy"
              )} for ${guests} guests.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-sm text-green-600 hover:text-green-700 
              transition-colors py-2 rounded-xl hover:bg-green-50"
          >
            <MessageCircle className="w-4 h-4" />
            Or book via WhatsApp
            <ChevronDown className="w-3.5 h-3.5 rotate-[-90deg]" />
          </Link>
        </div>
      )}
    </div>
  );
}
