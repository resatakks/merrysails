import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Mail, Shield } from "lucide-react";
import CoreBookingPlanner from "@/components/booking/CoreBookingPlanner";
import ReservationSearch from "./ReservationSearch";
import { getCoreTours } from "@/data/tours";

export const metadata: Metadata = {
  title: "Bosphorus Cruise Reservation Center | Sunset, Dinner Cruise & Yacht Charter",
  description:
    "Book Bosphorus sunset cruise, dinner cruise, or yacht charter in Istanbul from one reservation center. Compare the 3 core products, choose date and guests, and track your reservation.",
  robots: { index: true, follow: true },
};

const coreTours = getCoreTours();

interface ReservationPageProps {
  searchParams?: Promise<{
    tour?: string;
  }>;
}

export default async function ReservationPage({ searchParams }: ReservationPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const requestedTourSlug = resolvedSearchParams?.tour;
  const initialTourSlug = coreTours.some((tour) => tour.slug === requestedTourSlug)
    ? requestedTourSlug
    : undefined;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[var(--surface-alt)] pt-28 pb-32">
      <div className="mx-auto max-w-[84rem] px-4">
        <section className="mb-8 overflow-hidden rounded-[2.2rem] border border-[var(--line)] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-5 shadow-sm sm:p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center xl:gap-8">
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--brand-primary)]">
                Reservation Center
              </p>
              <h1 className="max-w-[28rem] text-[1.95rem] font-bold leading-tight text-[var(--heading)] md:text-[3.05rem]">
                Choose your cruise first, then continue to booking
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--body-text)] md:text-base">
                Start with sunset cruise, dinner cruise, or yacht charter without getting lost in
                extra text.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="#core-booking-planner"
                  className="btn-cta !px-6 !py-3 text-sm sm:text-base"
                >
                  Choose & book now
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#track-reservation"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-primary)]/18 bg-white px-5 py-3 text-sm font-semibold text-[var(--brand-primary)] transition-all hover:border-[var(--brand-primary)]/35"
                >
                  Track reservation
                </Link>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {coreTours.map((tour) => (
                <Link
                  key={tour.slug}
                  href={`/reservation?tour=${tour.slug}#core-booking-planner`}
                  className="group relative min-h-[13rem] overflow-hidden rounded-[1.7rem] border border-[var(--line)] shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md xl:min-h-[14.25rem]"
                >
                  <Image
                    src={tour.image}
                    alt={tour.nameEn}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,19,47,0.12),rgba(8,19,47,0.3)_36%,rgba(8,19,47,0.92))]" />
                  <div className="absolute inset-x-0 bottom-0 z-10 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/68">
                      {tour.duration}
                    </p>
                    <h2 className="mt-2 text-lg font-semibold leading-snug text-white">
                      {tour.nameEn}
                    </h2>
                    <div className="mt-3 flex items-end justify-between gap-3">
                      <span className="text-sm font-bold text-[var(--brand-gold)]">
                        From €{tour.priceEur}
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-white">
                        Choose
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.62fr)_minmax(19rem,0.78fr)] xl:grid-cols-[minmax(0,1.68fr)_minmax(20rem,0.72fr)]">
          <div className="space-y-6">
            <CoreBookingPlanner
              variant="page"
              source="reservation-center"
              initialTourSlug={initialTourSlug}
            />
          </div>

          <div className="space-y-6">
            <section
              id="track-reservation"
              className="rounded-[2rem] border border-[var(--line)] bg-white p-6 shadow-sm"
            >
              <div className="mb-6">
                <h2 className="mb-2 text-2xl font-bold text-[var(--heading)]">
                  Track Your Reservation
                </h2>
                <p className="text-sm text-[var(--body-text)]">
                  Look up your booking by reservation ID or email address.
                </p>
              </div>
              <ReservationSearch />
            </section>

            <section className="rounded-[2rem] border border-[var(--line)] bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-[var(--heading)]">
                What happens after booking?
              </h2>
              <div className="space-y-3">
                {[
                  {
                    icon: CalendarDays,
                    title: "Reservation ID is created instantly",
                    description:
                      "Every new booking request gets a short reservation reference for tracking and support.",
                  },
                  {
                    icon: Mail,
                    title: "Email confirmation is sent right away",
                    description:
                      "The booking flow sends the customer email, internal notification, and the reservation detail links without waiting.",
                  },
                  {
                    icon: Shield,
                    title: "Voucher, invoice and reminder flow stay aligned",
                    description:
                      "Your reservation links, reminder email, and meeting-point communication all point to the same reservation record.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-3 rounded-2xl bg-[var(--surface-alt)] p-4"
                  >
                    <div className="mt-0.5 rounded-full bg-white p-2">
                      <item.icon className="h-4 w-4 text-[var(--brand-primary)]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--heading)]">{item.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
