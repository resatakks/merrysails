"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Minus, Plus, Search } from "lucide-react";
import { motion } from "framer-motion";

const ACTIVITIES = [
  "All Activities",
  "Sunset Cruise",
  "Dinner Cruise",
  "Yacht Charter",
  "Day Tours",
  "Private Events",
] as const;

export default function HeroBookingWidget() {
  const router = useRouter();
  const [activity, setActivity] = useState<string>(ACTIVITIES[0]);
  const [guests, setGuests] = useState(2);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const decrement = () => setGuests((g) => Math.max(1, g - 1));
  const increment = () => setGuests((g) => Math.min(50, g + 1));

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (activity !== "All Activities") {
      params.set("activity", activity);
    }
    params.set("guests", String(guests));
    router.push(`/cruises?${params.toString()}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="absolute -bottom-10 left-1/2 -translate-x-1/2 z-20 w-[calc(100%-2rem)] max-w-3xl"
    >
      <div className="bg-white rounded-2xl shadow-xl px-4 py-4 md:px-6 md:py-5 flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-0">
        {/* Activity Dropdown */}
        <div className="relative flex-1 md:border-r md:border-gray-200 md:pr-4">
          <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1 md:mb-1.5">
            Activity
          </label>
          <button
            type="button"
            onClick={() => setDropdownOpen((o) => !o)}
            className="w-full flex items-center justify-between gap-2 text-left text-sm font-medium text-gray-800 hover:text-[var(--brand-primary)] transition-colors cursor-pointer"
          >
            <span>{activity}</span>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {dropdownOpen && (
            <>
              {/* Invisible overlay to close dropdown */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20 min-w-[200px]">
                {ACTIVITIES.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setActivity(item);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                      activity === item
                        ? "bg-[var(--brand-primary)]/5 text-[var(--brand-primary)] font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Guests Counter */}
        <div className="flex-1 md:px-4 md:border-r md:border-gray-200">
          <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1 md:mb-1.5">
            Guests
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={decrement}
              disabled={guests <= 1}
              className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-sm font-medium text-gray-800 min-w-[70px] text-center">
              {guests} {guests === 1 ? "Person" : "Persons"}
            </span>
            <button
              type="button"
              onClick={increment}
              disabled={guests >= 50}
              className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Search Button */}
        <div className="md:pl-4">
          <button
            type="button"
            onClick={handleSearch}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-dark,#0a1e3d)] text-white font-semibold text-sm py-3 px-6 rounded-xl transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
