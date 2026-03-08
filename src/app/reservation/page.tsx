import type { Metadata } from "next";
import ReservationSearch from "./ReservationSearch";

export const metadata: Metadata = {
  title: "Track Your Reservation",
  robots: { index: false, follow: false },
};

export default function ReservationPage() {
  return (
    <main className="min-h-screen bg-[var(--surface-alt)] pt-28 pb-32">
      <div className="mx-auto max-w-lg px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--heading)] mb-2">Track Your Reservation</h1>
          <p className="text-[var(--body-text)]">
            Look up your booking by reservation ID or email address.
          </p>
        </div>
        <ReservationSearch />
      </div>
    </main>
  );
}
