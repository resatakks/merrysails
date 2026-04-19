import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield, Mail, CalendarDays } from "lucide-react";
import CoreBookingPlanner from "@/components/booking/CoreBookingPlanner";
import ReservationSearch from "./ReservationSearch";

export const metadata: Metadata = {
  title: "Reservation Center | Start or Track Your Booking",
  robots: { index: false, follow: false },
};

export default function ReservationPage() {
  return (
    <main className="min-h-screen bg-[var(--surface-alt)] pt-28 pb-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--brand-primary)] mb-3">
            Reservation Center
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-[var(--heading)] mb-3">
            Start a new booking or track an existing one
          </h1>
          <p className="mx-auto max-w-3xl text-[var(--body-text)]">
            This page brings the three flagship products together in one reservation center.
            Start with the option that fits your plan, or search by reservation ID or email if
            you already booked.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.45fr_0.9fr]">
          <div className="space-y-6">
            <CoreBookingPlanner variant="page" source="reservation-center" />

            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Bosphorus Sunset Cruise",
                  description:
                    "2-hour golden-hour shared cruise with 2 core options and fast date-led booking.",
                  href: "/cruises/bosphorus-sunset-cruise",
                },
                {
                  title: "Bosphorus Dinner Cruise",
                  description:
                    "4 public dinner packages for the main shared evening sales intent.",
                  href: "/istanbul-dinner-cruise",
                },
                {
                  title: "Yacht Charter Istanbul",
                  description:
                    "3 yacht packages for private charter demand, add-ons, and higher-ticket bookings.",
                  href: "/yacht-charter-istanbul",
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl border border-[var(--line)] bg-white p-5 transition-all hover:border-[var(--brand-primary)]/30 hover:shadow-sm"
                >
                  <h2 className="text-lg font-semibold text-[var(--heading)] mb-2">
                    {item.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)] mb-4">
                    {item.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-primary)]">
                    Open booking page
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-[var(--line)] bg-white p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-[var(--heading)] mb-2">
                  Track Your Reservation
                </h2>
                <p className="text-sm text-[var(--body-text)]">
                  Look up your booking by reservation ID or email address.
                </p>
              </div>
              <ReservationSearch />
            </div>

            <div className="rounded-[2rem] border border-[var(--line)] bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-[var(--heading)] mb-4">
                What happens after booking?
              </h2>
              <div className="space-y-3">
                {[
                  {
                    icon: CalendarDays,
                    title: "Reservation ID is created",
                    description:
                      "Every new reservation request gets a trackable reservation reference for follow-up.",
                  },
                  {
                    icon: Mail,
                    title: "Email confirmation is sent",
                    description:
                      "The reservation flow already sends request-received emails and internal notifications, then status updates when the booking is confirmed or changed.",
                  },
                  {
                    icon: Shield,
                    title: "Voucher and invoice are ready",
                    description:
                      "Each reservation can now open both a direct voucher page and a reservation invoice page from the reservation center.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3 rounded-2xl bg-[var(--surface-alt)] p-4">
                    <div className="mt-0.5 rounded-full bg-white p-2">
                      <item.icon className="h-4 w-4 text-[var(--brand-primary)]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--heading)]">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
