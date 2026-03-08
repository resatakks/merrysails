"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Phone, Shield, Calendar, Users, Package, Check, Loader2, CheckCircle, AlertCircle, MapPin, Clock, Anchor, Camera, Info } from "lucide-react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import type { Package as PackageType, AddOn } from "@/data/tours";
import { createReservation } from "@/app/actions/reservation";

interface BookingDetails {
  tourName: string;
  tourSlug: string;
  date: string;
  time: string;
  guests: number;
  selectedPackage?: PackageType;
  selectedAddOns: AddOn[];
  basePrice: number;
  departurePoint?: string;
}

interface Props {
  booking: BookingDetails;
  onClose: () => void;
}

type ModalState = "form" | "loading" | "success" | "error";

export default function BookingModal({ booking, onClose }: Props) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [modalState, setModalState] = useState<ModalState>("form");
  const [reservationId, setReservationId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [touchedName, setTouchedName] = useState(false);
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedPhone, setTouchedPhone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const packagePrice = booking.selectedPackage?.price ?? booking.basePrice;
  const addOnsText = booking.selectedAddOns.map((a) => a.name).join(", ");
  const total = packagePrice * booking.guests;

  const nameValid = name.trim().length >= 2;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phoneValid = phone.replace(/\D/g, "").length >= 7;
  const isValid = nameValid && emailValid && phoneValid;

  const handleSubmit = async () => {
    if (!isValid) return;
    setModalState("loading");

    const result = await createReservation({
      tourSlug: booking.tourSlug,
      tourName: booking.tourName,
      date: booking.date,
      time: booking.time || "17:00",
      guests: booking.guests,
      totalPrice: total,
      currency: "EUR",
      customerName: name.trim(),
      customerEmail: email.trim(),
      customerPhone: phone.trim(),
      notes: message.trim() || undefined,
    });

    if (result.success && result.reservationId) {
      setReservationId(result.reservationId);
      setModalState("success");
      // Auto-redirect to reservation detail page after 2.5 seconds
      setTimeout(() => {
        router.push(`/reservation/${result.reservationId}`);
      }, 2500);
    } else {
      setErrorMessage(result.error || "Something went wrong");
      setModalState("error");
    }
  };

  const handleWhatsApp = () => {
    const lines = [
      `Hi, I'd like to book:`,
      ``,
      `Tour: ${booking.tourName}`,
      `Date: ${booking.date}`,
      booking.time ? `Time: ${booking.time}` : "",
      `Guests: ${booking.guests}`,
      booking.selectedPackage ? `Package: ${booking.selectedPackage.name} (€${booking.selectedPackage.price}/person)` : `Price: €${booking.basePrice}/person`,
      addOnsText ? `Add-ons: ${addOnsText}` : "",
      `Total: €${total}`,
      ``,
      name ? `Name: ${name}` : "",
      email ? `Email: ${email}` : "",
      phone ? `Phone: ${phone}` : "",
      message ? `Message: ${message}` : "",
    ].filter(Boolean).join("\n");

    window.open(`https://wa.me/905370406822?text=${encodeURIComponent(lines)}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[var(--line)] p-5 flex items-center justify-between rounded-t-2xl z-10">
          <h2 className="text-lg font-bold">
            {modalState === "success" ? "Booking Confirmed!" : modalState === "error" ? "Booking Failed" : "Complete Your Booking"}
          </h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* ── SUCCESS STATE ── */}
          {modalState === "success" && (
            <div className="space-y-4 py-2">
              <div className="text-center">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-[var(--heading)]">Thank you, {name}!</h3>
                <p className="text-[var(--body-text)] text-sm mt-1">Your reservation has been received. Our team will contact you shortly to confirm your booking.</p>
                <p className="text-xs text-[var(--text-muted)] mt-2">Redirecting to your reservation details...</p>
              </div>

              {/* Reservation ID */}
              <div className="bg-[var(--surface-alt)] rounded-xl p-4 text-center">
                <div className="text-xs text-[var(--text-muted)] mb-1">Reservation ID</div>
                <div className="text-2xl font-bold text-[var(--brand-primary)] tracking-wider font-mono">{reservationId}</div>
                <p className="text-xs text-[var(--text-muted)] mt-2">
                  Confirmation sent to <strong>{email}</strong>
                </p>
              </div>

              {/* Booking summary */}
              <div className="bg-white border border-[var(--line)] rounded-xl p-4 space-y-2.5">
                <div className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Your Booking</div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2 text-[var(--body-text)]">
                    <Calendar className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                    {booking.date}
                  </div>
                  {booking.time && (
                    <div className="flex items-center gap-2 text-[var(--body-text)]">
                      <Clock className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                      {booking.time}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-[var(--body-text)]">
                    <Users className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                    {booking.guests} guest{booking.guests > 1 ? "s" : ""}
                  </div>
                  <div className="flex items-center gap-2 text-[var(--body-text)]">
                    <Anchor className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                    €{total}
                  </div>
                </div>
              </div>

              {/* Meeting point */}
              {booking.departurePoint && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-blue-900">Meeting Point</div>
                      <div className="text-sm text-blue-800 mt-0.5">{booking.departurePoint}</div>
                      <div className="text-xs text-blue-600 mt-1">Please arrive 15 minutes before departure</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Practical tips */}
              <div className="rounded-xl border border-[var(--line)] p-4">
                <div className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2.5">Good to Know</div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2.5 text-sm text-[var(--body-text)]">
                    <Info className="w-3.5 h-3.5 text-[var(--brand-primary)] shrink-0 mt-0.5" />
                    <span>Payment is collected onboard — no prepayment needed</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-sm text-[var(--body-text)]">
                    <Camera className="w-3.5 h-3.5 text-[var(--brand-primary)] shrink-0 mt-0.5" />
                    <span>Bring your camera — the views are spectacular!</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-sm text-[var(--body-text)]">
                    <Shield className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                    <span>Free cancellation up to 24 hours before departure</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2.5 pt-1">
                <a
                  href={`/reservation/${reservationId}`}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-[var(--brand-primary)] text-white font-bold hover:brightness-110 transition-all"
                >
                  Track Your Reservation
                </a>
                <a
                  href={`https://wa.me/905370406822?text=${encodeURIComponent(`Hi! My reservation ID is ${reservationId}. I'd like to confirm my booking.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#25D366] text-white font-semibold hover:brightness-110 transition-all text-sm"
                >
                  <Phone className="w-4 h-4" />
                  Confirm via WhatsApp
                </a>
                <button
                  onClick={onClose}
                  className="w-full py-2.5 text-[var(--text-muted)] font-medium hover:text-[var(--body-text)] transition-all text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* ── ERROR STATE ── */}
          {modalState === "error" && (
            <div className="text-center space-y-4 py-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--heading)]">Something went wrong</h3>
                <p className="text-[var(--body-text)] text-sm mt-1">{errorMessage}</p>
              </div>
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={() => setModalState("form")}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-[var(--brand-primary)] text-white font-bold hover:brightness-110 transition-all"
                >
                  Try Again
                </button>
                <button
                  onClick={handleWhatsApp}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#25D366] text-white font-semibold hover:brightness-110 transition-all text-sm"
                >
                  <Phone className="w-4 h-4" />
                  Book via WhatsApp Instead
                </button>
              </div>
            </div>
          )}

          {/* ── LOADING STATE ── */}
          {modalState === "loading" && (
            <div className="text-center space-y-4 py-8">
              <Loader2 className="w-12 h-12 text-[var(--brand-primary)] animate-spin mx-auto" />
              <p className="text-[var(--body-text)] font-medium">Creating your reservation...</p>
            </div>
          )}

          {/* ── FORM STATE ── */}
          {modalState === "form" && (
            <>
              {/* Booking Summary */}
              <div className="bg-[var(--surface-alt)] rounded-xl p-4 space-y-2.5">
                <h3 className="font-semibold text-sm text-[var(--heading)]">{booking.tourName}</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2 text-[var(--body-text)]">
                    <Calendar className="w-4 h-4 text-[var(--brand-primary)]" />
                    {booking.date}
                  </div>
                  {booking.time && (
                    <div className="flex items-center gap-2 text-[var(--body-text)]">
                      <Clock className="w-4 h-4 text-[var(--brand-primary)]" />
                      {booking.time}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-[var(--body-text)]">
                    <Users className="w-4 h-4 text-[var(--brand-primary)]" />
                    {booking.guests} guest{booking.guests > 1 ? "s" : ""}
                  </div>
                  {booking.departurePoint && (
                    <div className="flex items-center gap-2 text-[var(--body-text)]">
                      <MapPin className="w-4 h-4 text-[var(--brand-primary)]" />
                      {booking.departurePoint}
                    </div>
                  )}
                  {booking.selectedPackage && (
                    <div className="flex items-center gap-2 text-[var(--body-text)] col-span-2">
                      <Package className="w-4 h-4 text-[var(--brand-primary)]" />
                      {booking.selectedPackage.name} — €{booking.selectedPackage.price}/person
                    </div>
                  )}
                </div>
                {booking.selectedAddOns.length > 0 && (
                  <div className="pt-2 border-t border-[var(--line)]">
                    <div className="text-xs text-[var(--text-muted)] mb-1">Add-ons:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {booking.selectedAddOns.map((a) => (
                        <span key={a.name} className="inline-flex items-center gap-1 px-2 py-0.5 bg-white rounded-md text-xs font-medium">
                          <Check className="w-3 h-3 text-green-500" />
                          {a.name} ({a.price})
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="pt-2 border-t border-[var(--line)] flex items-center justify-between">
                  <span className="font-semibold text-sm">Total</span>
                  <span className="text-xl font-bold text-[var(--heading)]">€{total}</span>
                </div>
              </div>

              {/* Form */}
              <div className="space-y-3">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setTouchedName(true)}
                    className={`w-full px-4 py-2.5 rounded-xl border-2 focus:outline-none transition-colors text-sm ${
                      touchedName && !nameValid
                        ? "border-red-300 focus:border-red-400"
                        : "border-[var(--line)] focus:border-[var(--brand-primary)]"
                    }`}
                    placeholder="John Doe"
                    required
                  />
                  {touchedName && !nameValid && (
                    <p className="text-red-500 text-xs mt-1">Please enter your full name (at least 2 characters)</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-1">Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setTouchedEmail(true)}
                    className={`w-full px-4 py-2.5 rounded-xl border-2 focus:outline-none transition-colors text-sm ${
                      touchedEmail && !emailValid
                        ? "border-red-300 focus:border-red-400"
                        : "border-[var(--line)] focus:border-[var(--brand-primary)]"
                    }`}
                    placeholder="john@example.com"
                    required
                  />
                  {touchedEmail && !emailValid && (
                    <p className="text-red-500 text-xs mt-1">Please enter a valid email address</p>
                  )}
                </div>

                {/* Phone with country selector */}
                <div>
                  <label className="block text-sm font-medium mb-1">Phone *</label>
                  <PhoneInput
                    defaultCountry="tr"
                    value={phone}
                    onChange={(val) => { setPhone(val); if (!touchedPhone) setTouchedPhone(true); }}
                    inputClassName="!w-full !px-4 !py-2.5 !rounded-r-xl !border-2 !border-l-0 !border-[var(--line)] focus:!border-[var(--brand-primary)] focus:!outline-none !transition-colors !text-sm !h-auto"
                    countrySelectorStyleProps={{
                      buttonClassName: "!px-3 !py-2.5 !rounded-l-xl !border-2 !border-r-0 !border-[var(--line)] !h-auto",
                    }}
                    className="!w-full"
                  />
                  {touchedPhone && !phoneValid && (
                    <p className="text-red-500 text-xs mt-1">Please enter a valid phone number</p>
                  )}
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-sm font-medium mb-1">Special Requests</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-[var(--line)] focus:border-[var(--brand-primary)] focus:outline-none transition-colors text-sm resize-none"
                    placeholder="Any special requests or requirements..."
                  />
                </div>
              </div>

              {/* Submit buttons */}
              <div className="space-y-2.5">
                <button
                  onClick={handleSubmit}
                  disabled={!isValid}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-[var(--brand-primary)] text-white font-bold hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Check className="w-4 h-4" />
                  Confirm Booking — €{total}
                </button>
                <button
                  onClick={handleWhatsApp}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#25D366] text-white font-semibold hover:brightness-110 transition-all text-sm"
                >
                  <Phone className="w-4 h-4" />
                  Or Book via WhatsApp
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] justify-center pb-2">
                <Shield className="w-3.5 h-3.5" />
                Free cancellation up to 24h before the tour • Pay onboard
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
