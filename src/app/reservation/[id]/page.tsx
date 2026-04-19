import type { Metadata } from "next";
import { getReservation } from "@/app/actions/reservation";
import { getTourBySlug, getTourPath } from "@/data/tours";
import { format } from "date-fns";
import { Calendar, Users, Clock, MapPin, Phone, Shield, Info, Camera, Anchor, FileText } from "lucide-react";
import Link from "next/link";
import CancelButton from "./CancelButton";
import { parseReservationNotes } from "@/lib/reservation-meta";

export const metadata: Metadata = {
  title: "Reservation Details",
  robots: { index: false, follow: false },
};

const statusConfig: Record<string, { color: string; label: string; icon: string }> = {
  pending: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", label: "Pending Confirmation", icon: "..." },
  confirmed: { color: "bg-green-100 text-green-800 border-green-200", label: "Confirmed", icon: "" },
  cancelled: { color: "bg-red-100 text-red-800 border-red-200", label: "Cancelled", icon: "" },
  completed: { color: "bg-blue-100 text-blue-800 border-blue-200", label: "Completed", icon: "" },
};

export default async function ReservationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await getReservation(id);

  if (!result.success || !result.reservation) {
    return (
      <main className="min-h-screen bg-[var(--surface-alt)] pt-28 pb-16">
        <div className="mx-auto max-w-lg px-4 text-center">
          <div className="bg-white rounded-2xl shadow-sm border border-[var(--line)] p-8">
            <div className="text-6xl mb-4">🔍</div>
            <h1 className="text-2xl font-bold text-[var(--heading)] mb-2">Reservation Not Found</h1>
            <p className="text-[var(--body-text)] mb-6">
              We couldn&apos;t find a reservation with ID <strong className="font-mono">{id.toUpperCase()}</strong>
            </p>
            <div className="space-y-3">
              <Link
                href="/reservation"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[var(--brand-primary)] text-white font-bold hover:brightness-110 transition-all"
              >
                Try Again
              </Link>
              <p className="text-sm text-[var(--text-muted)]">
                Lost your reservation ID? <Link href="/reservation" className="text-[var(--brand-primary)] font-medium hover:underline">Search by email</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const r = result.reservation;
  const tour = getTourBySlug(r.tourSlug);
  const dateFormatted = format(new Date(r.date), "EEEE, MMMM d, yyyy");
  // eslint-disable-next-line react-hooks/purity
  const now = Date.now();
  const canCancel = r.status !== "cancelled" && r.status !== "completed" && (new Date(r.date).getTime() - now) > 24 * 60 * 60 * 1000;
  const isUpcoming = r.status !== "cancelled" && r.status !== "completed" && new Date(r.date).getTime() > now;
  const status = statusConfig[r.status] || { color: "bg-gray-100 text-gray-800 border-gray-200", label: r.status, icon: "" };
  const departurePoint = tour?.departurePoint;
  const reservationMeta = parseReservationNotes(r.notes);
  const hasSelectedOptions = Boolean(
    reservationMeta.packageName || reservationMeta.addOns.length > 0
  );

  return (
    <main className="min-h-screen bg-[var(--surface-alt)] pt-28 pb-32">
      <div className="mx-auto max-w-lg px-4 space-y-4">
        {/* Status Badge */}
        <div className="text-center mb-2">
          <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold border ${status.color}`}>
            <span>{status.icon}</span>
            {status.label}
          </span>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-[var(--line)] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[var(--heading)] to-[#1e3a5f] p-6 text-center">
            <div className="text-xs text-[var(--brand-primary)] font-medium mb-1">Reservation ID</div>
            <div className="text-2xl font-bold text-white tracking-wider font-mono">{r.reservationId}</div>
          </div>

          {/* Tour Details */}
          <div className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <h2 className="text-lg font-bold text-[var(--heading)]">{r.tourName}</h2>
              {tour && (
                <Link href={getTourPath(tour)} className="text-xs text-[var(--brand-primary)] font-medium hover:underline shrink-0 ml-3">
                  View Tour
                </Link>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm text-[var(--body-text)]">
                <Calendar className="w-4 h-4 text-[var(--brand-primary)] shrink-0" />
                <span>{dateFormatted}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--body-text)]">
                <Clock className="w-4 h-4 text-[var(--brand-primary)] shrink-0" />
                {r.time}
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--body-text)]">
                <Users className="w-4 h-4 text-[var(--brand-primary)] shrink-0" />
                {r.guests} guest{r.guests > 1 ? "s" : ""}
              </div>
              {tour && (
                <div className="flex items-center gap-2 text-sm text-[var(--body-text)]">
                  <Anchor className="w-4 h-4 text-[var(--brand-primary)] shrink-0" />
                  {tour.duration}
                </div>
              )}
            </div>

            {hasSelectedOptions && (
              <div className="bg-[var(--surface-alt)] rounded-xl p-3">
                <div className="text-xs text-[var(--text-muted)] mb-2">
                  Booking Selection
                </div>
                <div className="space-y-2 text-sm text-[var(--body-text)]">
                  {reservationMeta.packageName && (
                    <p>
                      <span className="font-semibold text-[var(--heading)]">Package:</span>{" "}
                      {reservationMeta.packageName}
                    </p>
                  )}
                  {reservationMeta.addOns.length > 0 && (
                    <p>
                      <span className="font-semibold text-[var(--heading)]">Add-ons:</span>{" "}
                      {reservationMeta.addOns.join(", ")}
                    </p>
                  )}
                </div>
              </div>
            )}

            {reservationMeta.customerNote && (
              <div className="bg-[var(--surface-alt)] rounded-xl p-3">
                <div className="text-xs text-[var(--text-muted)] mb-1">Special Requests</div>
                <p className="text-sm text-[var(--body-text)]">{reservationMeta.customerNote}</p>
              </div>
            )}

            {/* Price */}
            <div className="pt-3 border-t border-[var(--line)] flex items-center justify-between">
              <div>
                <span className="font-semibold text-sm">Total Price</span>
                <span className="block text-xs text-[var(--text-muted)]">Pay onboard</span>
              </div>
              <span className="text-2xl font-bold text-[var(--heading)]">
                {r.currency === "EUR" ? "€" : r.currency}{r.totalPrice}
              </span>
            </div>
          </div>
        </div>

        {/* Meeting Point — only for upcoming bookings */}
        {isUpcoming && departurePoint && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-blue-900">Meeting Point</div>
                <div className="text-sm text-blue-800 mt-0.5">{departurePoint}</div>
                <div className="text-xs text-blue-600 mt-1.5">Please arrive 15 minutes before departure</div>
              </div>
            </div>
          </div>
        )}

        {/* Practical Tips — only for upcoming bookings */}
        {isUpcoming && (
          <div className="bg-white rounded-2xl shadow-sm border border-[var(--line)] p-5">
            <div className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">Good to Know</div>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-[var(--body-text)]">
                <Info className="w-4 h-4 text-[var(--brand-primary)] shrink-0 mt-0.5" />
                <span>Payment is collected onboard — no prepayment needed</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-[var(--body-text)]">
                <Camera className="w-4 h-4 text-[var(--brand-primary)] shrink-0 mt-0.5" />
                <span>Bring your camera — the Bosphorus views are spectacular!</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-[var(--body-text)]">
                <Shield className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span>Free cancellation available up to 24 hours before departure</span>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-2.5">
          <Link
            href={`/reservation/${r.reservationId}/invoice`}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-full border-2 border-[var(--line)] text-sm text-[var(--body-text)] font-semibold hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] transition-all"
          >
            <FileText className="w-4 h-4" />
            Open Reservation Invoice
          </Link>

          <Link
            href={`/reservation/${r.reservationId}/voucher`}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[var(--heading)] text-white font-semibold hover:brightness-110 transition-all text-sm"
          >
            <FileText className="w-4 h-4" />
            Open Travel Voucher
          </Link>

          {canCancel && <CancelButton reservationId={r.reservationId} />}

          <a
            href={`https://wa.me/905370406822?text=${encodeURIComponent(`Hi! My reservation ID is ${r.reservationId}. I have a question about my booking.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#25D366] text-white font-semibold hover:brightness-110 transition-all text-sm"
          >
            <Phone className="w-4 h-4" />
            Contact Us via WhatsApp
          </a>

          <Link
            href="/reservation"
            className="flex items-center justify-center w-full py-3 rounded-full border-2 border-[var(--line)] text-sm text-[var(--body-text)] font-semibold hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] transition-all"
          >
            Search Another Reservation
          </Link>
        </div>
      </div>
    </main>
  );
}
