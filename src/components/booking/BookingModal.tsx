"use client";

import { useState, useEffect } from "react";
import { X, Phone, Shield, Calendar, Users, Package, Check } from "lucide-react";
import type { Package as PackageType, AddOn } from "@/data/tours";

interface BookingDetails {
  tourName: string;
  tourSlug: string;
  date: string;
  guests: number;
  selectedPackage?: PackageType;
  selectedAddOns: AddOn[];
  basePrice: number;
}

interface Props {
  booking: BookingDetails;
  onClose: () => void;
}

export default function BookingModal({ booking, onClose }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Calculate total
  const packagePrice = booking.selectedPackage?.price ?? booking.basePrice;
  const addOnsText = booking.selectedAddOns.map((a) => a.name).join(", ");
  const total = packagePrice * booking.guests;

  const handleSubmitWhatsApp = () => {
    const lines = [
      `Hi, I'd like to book:`,
      ``,
      `Tour: ${booking.tourName}`,
      `Date: ${booking.date}`,
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

    const encoded = encodeURIComponent(lines);
    window.open(`https://wa.me/905370406822?text=${encoded}`, "_blank");
    onClose();
  };

  const handleSubmitEmail = () => {
    const subject = encodeURIComponent(`Booking Request: ${booking.tourName}`);
    const body = encodeURIComponent(
      [
        `Tour: ${booking.tourName}`,
        `Date: ${booking.date}`,
        `Guests: ${booking.guests}`,
        booking.selectedPackage ? `Package: ${booking.selectedPackage.name} (€${booking.selectedPackage.price}/person)` : `Price: €${booking.basePrice}/person`,
        addOnsText ? `Add-ons: ${addOnsText}` : "",
        `Total: €${total}`,
        ``,
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        message ? `Message: ${message}` : "",
      ].filter(Boolean).join("\n")
    );
    window.open(`mailto:info@merrytourism.com?subject=${subject}&body=${body}`, "_self");
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
          <h2 className="text-lg font-bold">Complete Your Booking</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Booking Summary */}
          <div className="bg-[var(--surface-alt)] rounded-xl p-4 space-y-2.5">
            <h3 className="font-semibold text-sm text-[var(--heading)]">{booking.tourName}</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2 text-[var(--body-text)]">
                <Calendar className="w-4 h-4 text-[var(--brand-primary)]" />
                {booking.date}
              </div>
              <div className="flex items-center gap-2 text-[var(--body-text)]">
                <Users className="w-4 h-4 text-[var(--brand-primary)]" />
                {booking.guests} guest{booking.guests > 1 ? "s" : ""}
              </div>
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
            <div>
              <label className="block text-sm font-medium mb-1">Full Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-[var(--line)] focus:border-[var(--brand-primary)] focus:outline-none transition-colors text-sm"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-[var(--line)] focus:border-[var(--brand-primary)] focus:outline-none transition-colors text-sm"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone *</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-[var(--line)] focus:border-[var(--brand-primary)] focus:outline-none transition-colors text-sm"
                placeholder="+90 555 123 45 67"
              />
            </div>
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
              onClick={handleSubmitWhatsApp}
              disabled={!name || !phone}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-[#25D366] text-white font-bold hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Phone className="w-4 h-4" />
              Book via WhatsApp
            </button>
            <button
              onClick={handleSubmitEmail}
              disabled={!name || !email}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-full border-2 border-[var(--brand-primary)] text-[var(--brand-primary)] font-semibold hover:bg-[var(--brand-primary)] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              Send via Email
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] justify-center pb-2">
            <Shield className="w-3.5 h-3.5" />
            Free cancellation up to 24h before the tour
          </div>
        </div>
      </div>
    </div>
  );
}
