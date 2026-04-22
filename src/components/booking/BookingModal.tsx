"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  X,
  Phone,
  Shield,
  Calendar,
  Users,
  Package,
  Check,
  Loader2,
  CheckCircle,
  AlertCircle,
  FileText,
  MapPin,
  Clock,
  Anchor,
  Camera,
  Info,
  CalendarPlus,
  RefreshCw,
} from "lucide-react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { motion } from "framer-motion";
import type { Package as PackageType, AddOn, PriceMode } from "@/data/tours";
import { createReservation } from "@/app/actions/reservation";
import { PHONE_DISPLAY, WHATSAPP_URL } from "@/lib/constants";

interface BookingDetails {
  tourName: string;
  tourSlug: string;
  date: string;
  time: string;
  guests: number;
  selectedPackage?: PackageType;
  selectedAddOns: AddOn[];
  basePrice: number;
  priceMode?: PriceMode;
  departurePoint?: string;
  tourImage?: string;
}

interface Props {
  booking: BookingDetails;
  onClose: () => void;
}

type ModalState = "form" | "loading" | "success" | "error";

const steps = [
  { num: 1, label: "Details" },
  { num: 2, label: "Contact" },
  { num: 3, label: "Confirm" },
];

function buildCalendarUrl(booking: BookingDetails): string {
  const dateStr = booking.date.replace(/\s/g, " ");
  const startDate = new Date(dateStr);
  if (isNaN(startDate.getTime())) {
    const now = new Date();
    now.setDate(now.getDate() + 1);
    startDate.setTime(now.getTime());
  }

  const timeMatch = booking.time?.match(/(\d{2}):(\d{2})/);
  if (timeMatch) {
    startDate.setHours(parseInt(timeMatch[1]), parseInt(timeMatch[2]), 0);
  } else {
    startDate.setHours(17, 0, 0);
  }

  const endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000);

  const pad = (n: number) => n.toString().padStart(2, "0");
  const formatGCal = (d: Date) =>
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(
      d.getHours()
    )}${pad(d.getMinutes())}00`;

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: booking.tourName,
    dates: `${formatGCal(startDate)}/${formatGCal(endDate)}`,
    details: `Guests: ${booking.guests}\nPackage: ${
      booking.selectedPackage?.name || "Standard"
    }`,
    location: booking.departurePoint || "Istanbul",
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export default function BookingModal({ booking, onClose }: Props) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [modalState, setModalState] = useState<ModalState>("form");
  const [reservationId, setReservationId] = useState("");
  const [confirmedTotal, setConfirmedTotal] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [privateTransferRequested, setPrivateTransferRequested] = useState(false);
  const [showTransferInfo, setShowTransferInfo] = useState(false);
  const [showAdditionalGuests, setShowAdditionalGuests] = useState(false);
  const [additionalGuestsText, setAdditionalGuestsText] = useState("");

  const [touchedName, setTouchedName] = useState(false);
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedPhone, setTouchedPhone] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const phoneFieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const packagePrice = booking.selectedPackage?.price ?? booking.basePrice;
  const isPerGroup = booking.priceMode === "perGroup";
  const addOnsText = booking.selectedAddOns.map((a) => a.name).join(", ");

  // Parse add-on prices and sum them
  const addOnsTotal = booking.selectedAddOns.reduce((sum, addon) => {
    const priceStr = addon.price;
    // Extract the first/lower numeric value from the price string
    const numMatch = priceStr.match(/(\d+)/);
    if (!numMatch) return sum;
    const value = parseInt(numMatch[1], 10);
    // "/person" add-ons are multiplied by guest count
    if (priceStr.includes("/person") || priceStr.includes("/guest")) {
      return sum + value * booking.guests;
    }
    return sum + value;
  }, 0);

  const total = (isPerGroup ? packagePrice : packagePrice * booking.guests) + addOnsTotal;

  const nameValid = name.trim().length >= 2;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phoneValid = phone.replace(/\D/g, "").length >= 7;
  const showNameError = (touchedName || submitAttempted) && !nameValid;
  const showEmailError = (touchedEmail || submitAttempted) && !emailValid;
  const showPhoneError = (touchedPhone || submitAttempted) && !phoneValid;
  const isValid = nameValid && emailValid && phoneValid;
  const sharedTransferSupport =
    booking.tourSlug === "bosphorus-sunset-cruise" ||
    booking.tourSlug === "bosphorus-dinner-cruise";
  const additionalGuestNames = additionalGuestsText
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
  const transferSummaryNote =
    booking.tourSlug === "bosphorus-dinner-cruise"
      ? "Private transfer requested in addition to the standard dinner-cruise hotel shuttle flow. Quote separately and confirm after contact."
      : booking.tourSlug === "bosphorus-sunset-cruise"
      ? "Extra hotel pickup / private transfer requested for the sunset cruise. Quote separately and confirm after contact."
      : "Private transfer requested. Quote separately and confirm after contact.";
  const bookingPreviewImage =
    booking.tourSlug === "bosphorus-dinner-cruise"
      ? "/images/dinner-etkinlik-4.jpeg"
      : booking.tourImage;
  const bookingPreviewImageClass =
    booking.tourSlug === "bosphorus-dinner-cruise"
      ? "object-cover object-center"
      : "object-cover object-center";

  const focusFirstInvalidField = () => {
    setSubmitAttempted(true);
    setTouchedName(true);
    setTouchedEmail(true);
    setTouchedPhone(true);

    if (!nameValid) {
      nameInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      nameInputRef.current?.focus();
      setValidationMessage("Please enter your full name first.");
      return;
    }

    if (!emailValid) {
      emailInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      emailInputRef.current?.focus();
      setValidationMessage("Please enter a valid email address.");
      return;
    }

    if (!phoneValid) {
      phoneFieldRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      const phoneInput = phoneFieldRef.current?.querySelector("input");
      if (phoneInput instanceof HTMLInputElement) {
        phoneInput.focus();
      }
      setValidationMessage("Please add a reachable phone number to continue.");
    }
  };

  const handleSubmit = async () => {
    setSubmitAttempted(true);

    if (!isValid) {
      focusFirstInvalidField();
      return;
    }

    setValidationMessage("");
    setModalState("loading");
    const combinedNotes = [
      message.trim(),
      privateTransferRequested ? transferSummaryNote : "",
      additionalGuestNames.length > 0
        ? `Additional guests: ${additionalGuestNames.join(", ")}`
        : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    const result = await createReservation({
      tourSlug: booking.tourSlug,
      date: booking.date,
      time: booking.time || "17:00",
      guests: booking.guests,
      customerName: name.trim(),
      customerEmail: email.trim(),
      customerPhone: phone.trim(),
      packageName: booking.selectedPackage?.name,
      addOns: booking.selectedAddOns.map((addon) => addon.name),
      additionalGuests: additionalGuestNames,
      privateTransferRequested,
      notes: combinedNotes || undefined,
      honeypot: company,
    });

    if (result.success && "reservationId" in result && result.reservationId) {
      setReservationId(result.reservationId);
      setConfirmedTotal("totalPrice" in result ? result.totalPrice ?? total : total);
      setModalState("success");
      setTimeout(() => {
        router.push(`/reservation/${result.reservationId}`);
      }, 700);
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
      booking.selectedPackage
        ? `Package: ${booking.selectedPackage.name} (€${booking.selectedPackage.price}${isPerGroup ? "/group" : "/person"})`
        : `Price: €${booking.basePrice}${isPerGroup ? "/group" : "/person"}`,
      addOnsText ? `Add-ons: ${addOnsText}` : "",
      privateTransferRequested ? "Extra service: Private transfer requested (to be quoted separately)" : "",
      additionalGuestNames.length > 0 ? `Additional guests: ${additionalGuestNames.join(", ")}` : "",
      `Total: €${total}`,
      ``,
      name ? `Name: ${name}` : "",
      email ? `Email: ${email}` : "",
      phone ? `Phone: ${phone}` : "",
      message ? `Message: ${message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(lines)}`, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with progress */}
        <div className="sticky top-0 bg-white border-b border-[var(--line)] z-10">
          <div className="p-5 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[var(--heading)]">
              {modalState === "success"
                ? "Booking Confirmed!"
                : modalState === "error"
                ? "Booking Failed"
                : "Complete Your Booking"}
            </h2>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface-alt)] text-[var(--heading)] shadow-sm transition-colors hover:bg-white"
              aria-label="Close booking modal"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Progress indicator */}
          {modalState === "form" && (
            <div className="px-5 pb-4">
              <div className="grid grid-cols-3 gap-3">
                {steps.map((step, i) => (
                  <div key={step.num} className="relative flex items-center">
                    {i < steps.length - 1 && (
                      <div
                        className={`absolute left-[calc(50%+1rem)] right-[-0.75rem] top-3.5 h-0.5 rounded ${
                          step.num < 2 ? "bg-[var(--brand-primary)]" : "bg-[var(--surface-alt)]"
                        }`}
                      />
                    )}
                    <div className="relative z-10 flex items-center gap-2 rounded-full bg-white pr-2">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                          step.num <= 2
                            ? "bg-[var(--brand-primary)] text-white"
                            : "bg-[var(--surface-alt)] text-[var(--text-muted)]"
                        }`}
                      >
                        {step.num <= 1 ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          step.num
                        )}
                      </div>
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-[0.14em] ${
                          step.num <= 2 ? "text-[var(--heading)]" : "text-[var(--text-muted)]"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1">
          <div className="p-5">
            {/* SUCCESS STATE */}
            {modalState === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-5 py-2"
              >
                {/* Success animation */}
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 12,
                      delay: 0.1,
                    }}
                    className="relative w-20 h-20 mx-auto mb-4"
                  >
                    <div className="absolute inset-0 bg-green-100 rounded-full" />
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </motion.div>
                    {/* Celebration particles */}
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0.5],
                          x: Math.cos((i * Math.PI * 2) / 8) * 50,
                          y: Math.sin((i * Math.PI * 2) / 8) * 50,
                        }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className={`absolute top-1/2 left-1/2 w-2 h-2 rounded-full ${
                          i % 3 === 0
                            ? "bg-[var(--brand-primary)]"
                            : i % 3 === 1
                            ? "bg-[var(--brand-gold)]"
                            : "bg-green-400"
                        }`}
                      />
                    ))}
                  </motion.div>
                  <h3 className="text-xl font-bold text-[var(--heading)]">
                    Thank you, {name}!
                  </h3>
                  <p className="text-[var(--body-text)] text-sm mt-1">
                    Your reservation has been received. Our team will contact
                    you shortly to confirm your booking.
                  </p>
                </div>

                {/* Reservation ID */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-[var(--surface-alt)] rounded-xl p-4 text-center"
                >
                  <div className="text-xs text-[var(--text-muted)] mb-1">
                    Reservation ID
                  </div>
                  <div className="text-2xl font-bold text-[var(--brand-primary)] tracking-wider font-mono">
                    {reservationId}
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mt-2">
                    Confirmation sent to <strong>{email}</strong>
                  </p>
                </motion.div>

                {/* Booking summary */}
                <div className="bg-white border border-[var(--line)] rounded-xl p-4 space-y-2.5">
                  <div className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Your Booking
                  </div>
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
                        €{confirmedTotal ?? total}
                      </div>
                    </div>
                </div>

                {/* Meeting point */}
                {booking.departurePoint && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-semibold text-blue-900">
                          Meeting Point
                        </div>
                        <div className="text-sm text-blue-800 mt-0.5">
                          {booking.departurePoint}
                        </div>
                        <div className="text-xs text-blue-600 mt-1">
                          Please arrive 15 minutes before departure
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tips */}
                <div className="rounded-xl border border-[var(--line)] p-4">
                  <div className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2.5">
                    Good to Know
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2.5 text-sm text-[var(--body-text)]">
                      <Info className="w-3.5 h-3.5 text-[var(--brand-primary)] shrink-0 mt-0.5" />
                      <span>
                        Payment is collected onboard — no prepayment needed
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5 text-sm text-[var(--body-text)]">
                      <Camera className="w-3.5 h-3.5 text-[var(--brand-primary)] shrink-0 mt-0.5" />
                      <span>
                        Bring your camera — the views are spectacular!
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5 text-sm text-[var(--body-text)]">
                      <Shield className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                      <span>
                        Free cancellation up to 24 hours before departure
                      </span>
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
                    href={`/reservation/${reservationId}/invoice`}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-full border-2 border-[var(--line)] text-[var(--body-text)] font-semibold hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] transition-all text-sm"
                  >
                    <FileText className="w-4 h-4" />
                    Open Reservation Invoice
                  </a>
                  <a
                    href={`/reservation/${reservationId}/voucher`}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[var(--heading)] text-white font-semibold hover:brightness-110 transition-all text-sm"
                  >
                    <Package className="w-4 h-4" />
                    Open Travel Voucher
                  </a>
                  <a
                    href={buildCalendarUrl(booking)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-full border-2 border-[var(--line)] text-[var(--body-text)] font-semibold hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] transition-all text-sm"
                  >
                    <CalendarPlus className="w-4 h-4" />
                    Add to Google Calendar
                  </a>
                  <a
                    href={`https://wa.me/905370406822?text=${encodeURIComponent(
                      `Hi! My reservation ID is ${reservationId}. I'd like to confirm my booking.`
                    )}`}
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
              </motion.div>
            )}

            {/* ERROR STATE */}
            {modalState === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-5 py-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto"
                >
                  <AlertCircle className="w-10 h-10 text-red-500" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--heading)]">
                    Something went wrong
                  </h3>
                  <p className="text-[var(--body-text)] text-sm mt-2 max-w-sm mx-auto">
                    {errorMessage}
                  </p>
                </div>
                <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-left max-w-sm mx-auto">
                  <p className="text-sm text-red-700">
                    Don&apos;t worry — no charges have been made. You can try
                    again or reach us directly on WhatsApp for immediate
                    assistance.
                  </p>
                </div>
                <div className="space-y-2.5 pt-2">
                  <button
                    onClick={() => setModalState("form")}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-[var(--brand-primary)] text-white font-bold hover:brightness-110 transition-all"
                  >
                    <RefreshCw className="w-4 h-4" />
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
              </motion.div>
            )}

            {/* LOADING STATE */}
            {modalState === "loading" && (
              <div className="text-center space-y-4 py-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Loader2 className="w-12 h-12 text-[var(--brand-primary)] mx-auto" />
                </motion.div>
                <div>
                  <p className="text-[var(--heading)] font-semibold">
                    Creating your reservation...
                  </p>
                  <p className="text-sm text-[var(--text-muted)] mt-1">
                    This will only take a moment
                  </p>
                </div>
              </div>
            )}

            {/* FORM STATE */}
            {modalState === "form" && (
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {/* Left: Booking Summary */}
                <div className="md:col-span-2 space-y-4">
                  {/* Tour image thumbnail */}
                  {bookingPreviewImage && (
                    <div className="relative h-36 w-full overflow-hidden rounded-xl md:h-40">
                      <Image
                        src={bookingPreviewImage}
                        alt={booking.tourName}
                        fill
                        className={bookingPreviewImageClass}
                        sizes="300px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-white font-bold text-sm leading-tight">
                          {booking.tourName}
                        </h3>
                      </div>
                    </div>
                  )}

                  <div className="bg-[var(--surface-alt)] rounded-xl p-4 space-y-3">
                    {!bookingPreviewImage && (
                      <h3 className="font-semibold text-sm text-[var(--heading)]">
                        {booking.tourName}
                      </h3>
                    )}
                    <div className="space-y-2 text-sm">
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
                        <div className="flex items-center gap-2 text-[var(--body-text)]">
                          <Package className="w-4 h-4 text-[var(--brand-primary)]" />
                          {booking.selectedPackage.name} — €
                          {booking.selectedPackage.price}
                          {isPerGroup ? "/group" : "/person"}
                        </div>
                      )}
                    </div>
                    {booking.selectedAddOns.length > 0 && (
                      <div className="pt-2 border-t border-[var(--line)]">
                        <div className="text-xs text-[var(--text-muted)] mb-1">
                          Add-ons:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {booking.selectedAddOns.map((a) => (
                            <span
                              key={a.name}
                              className="inline-flex items-center gap-1 px-2 py-0.5 bg-white rounded-md text-xs font-medium"
                            >
                              <Check className="w-3 h-3 text-green-500" />
                              {a.name} ({a.price})
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="pt-2 border-t border-[var(--line)] flex items-center justify-between">
                      <span className="font-semibold text-sm">Total</span>
                      <span className="text-xl font-bold text-[var(--heading)]">
                        €{total}
                      </span>
                    </div>
                  </div>

                  {/* Trust badges on desktop */}
                  <div className="hidden md:block space-y-2.5 text-xs text-[var(--text-muted)]">
                    <div className="flex items-center gap-2">
                      <Shield className="w-3.5 h-3.5 text-green-500" />
                      Free cancellation up to 24h before
                    </div>
                    <div className="flex items-center gap-2">
                      <Info className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
                      Pay onboard — no prepayment
                    </div>
                  </div>
                </div>

                {/* Right: Form */}
                <div className="md:col-span-3 space-y-4">
                  <div
                    aria-hidden="true"
                    className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
                  >
                    <label htmlFor="company-field">Company</label>
                    <input
                      id="company-field"
                      type="text"
                      value={company}
                      onChange={(event) => setCompany(event.target.value)}
                      autoComplete="off"
                      tabIndex={-1}
                    />
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-[var(--heading)]">
                      Full Name *
                    </label>
                    <input
                      ref={nameInputRef}
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (validationMessage) setValidationMessage("");
                      }}
                      onBlur={() => setTouchedName(true)}
                      autoComplete="name"
                      className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-colors text-sm ${
                        showNameError
                          ? "border-red-300 focus:border-red-400 bg-red-50/50"
                          : "border-[var(--line)] focus:border-[var(--brand-primary)]"
                      }`}
                      placeholder="John Doe"
                      required
                    />
                    {showNameError && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Please enter your full name (at least 2 characters)
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-[var(--heading)]">
                      Email *
                    </label>
                    <input
                      ref={emailInputRef}
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (validationMessage) setValidationMessage("");
                      }}
                      onBlur={() => setTouchedEmail(true)}
                      autoComplete="email"
                      className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-colors text-sm ${
                        showEmailError
                          ? "border-red-300 focus:border-red-400 bg-red-50/50"
                          : "border-[var(--line)] focus:border-[var(--brand-primary)]"
                      }`}
                      placeholder="john@example.com"
                      required
                    />
                    {showEmailError && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Please enter a valid email address
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div ref={phoneFieldRef}>
                    <label className="block text-sm font-medium mb-1.5 text-[var(--heading)]">
                      Phone *
                    </label>
                    <PhoneInput
                      defaultCountry="tr"
                      value={phone}
                      onChange={(val) => {
                        setPhone(val);
                        if (validationMessage) setValidationMessage("");
                      }}
                      inputClassName="!h-auto !w-full !rounded-r-xl !border-2 !border-l-0 !border-[var(--line)] !bg-white !px-4 !py-3 !text-sm !transition-colors focus:!border-[var(--brand-primary)] focus:!outline-none"
                      countrySelectorStyleProps={{
                        buttonClassName:
                          "!h-auto !rounded-l-xl !border-2 !border-r-0 !border-[var(--line)] !bg-white !px-3 !py-3",
                      }}
                      className="!w-full"
                      inputProps={{
                        autoComplete: "tel",
                        placeholder: "+90 5xx xxx xx xx",
                        onBlur: () => setTouchedPhone(true),
                      }}
                    />
                    {showPhoneError && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Please enter a valid phone number
                      </p>
                    )}
                  </div>

                  {sharedTransferSupport && (
                    <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)]/65 p-4">
                      <div className="flex items-start gap-3">
                        <input
                          id="private-transfer-request"
                          type="checkbox"
                          checked={privateTransferRequested}
                          onChange={(event) => setPrivateTransferRequested(event.target.checked)}
                          className="mt-1 h-4 w-4 rounded border-[var(--line)] text-[var(--brand-primary)] focus:ring-[var(--brand-primary)]"
                        />
                        <div className="min-w-0 flex-1">
                          <label
                            htmlFor="private-transfer-request"
                            className="flex items-center gap-2 text-sm font-semibold text-[var(--heading)]"
                          >
                            I want private transfer support
                            <button
                              type="button"
                              onClick={() => setShowTransferInfo((value) => !value)}
                              className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-[var(--brand-primary)]"
                              aria-label="Show private transfer details"
                            >
                              <Info className="h-3.5 w-3.5" />
                            </button>
                          </label>
                          <p className="mt-1 text-xs leading-relaxed text-[var(--text-muted)]">
                            {booking.tourSlug === "bosphorus-dinner-cruise"
                              ? "Dinner cruise reservations already use the central hotel shuttle flow when the route includes it."
                              : "Sunset cruise guests can request hotel pickup and drop-off as an extra service."}
                          </p>
                          {showTransferInfo && (
                            <div className="mt-2 rounded-xl border border-[var(--brand-primary)]/15 bg-white px-3 py-2 text-xs leading-relaxed text-[var(--body-text)]">
                              {booking.tourSlug === "bosphorus-dinner-cruise"
                                ? "The shared dinner cruise already works with the operational shuttle flow for central areas. If you want a private transfer instead, tick this option and our team will quote it separately."
                                : "The sunset cruise does not include a free hotel shuttle by default. If you want hotel pickup, drop-off, or a private transfer, tick this option and our team will quote it separately."}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {booking.guests > 1 && (
                    <div className="rounded-2xl border border-[var(--line)] bg-white p-4">
                      <div className="flex items-start gap-3">
                        <input
                          id="additional-guests-toggle"
                          type="checkbox"
                          checked={showAdditionalGuests}
                          onChange={(event) => setShowAdditionalGuests(event.target.checked)}
                          className="mt-1 h-4 w-4 rounded border-[var(--line)] text-[var(--brand-primary)] focus:ring-[var(--brand-primary)]"
                        />
                        <div className="min-w-0 flex-1">
                          <label
                            htmlFor="additional-guests-toggle"
                            className="text-sm font-semibold text-[var(--heading)]"
                          >
                            Add other passenger names
                          </label>
                          <p className="mt-1 text-xs leading-relaxed text-[var(--text-muted)]">
                            Optional. You can add the names of the other {booking.guests - 1} guest
                            {booking.guests - 1 > 1 ? "s" : ""} for smoother follow-up.
                          </p>
                          {showAdditionalGuests && (
                            <textarea
                              value={additionalGuestsText}
                              onChange={(event) => setAdditionalGuestsText(event.target.value)}
                              rows={Math.min(5, Math.max(2, booking.guests - 1))}
                              className="mt-3 w-full rounded-xl border-2 border-[var(--line)] px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--brand-primary)]"
                              placeholder={"One passenger per line\nJane Doe\nMichael Doe"}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Special Requests */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-[var(--heading)]">
                      Special Requests
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[var(--line)] focus:border-[var(--brand-primary)] focus:outline-none transition-colors text-sm resize-none"
                      placeholder="Any special requests or requirements..."
                    />
                  </div>

                  {/* Submit buttons */}
                  <div className="space-y-2.5 pt-2">
                    {validationMessage && (
                      <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
                        {validationMessage}
                      </div>
                    )}
                    <motion.button
                      onClick={handleSubmit}
                      className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-[var(--brand-primary)] text-white font-bold hover:brightness-110 transition-all"
                      whileTap={{ scale: 0.98 }}
                    >
                      <Check className="w-4 h-4" />
                      Confirm Booking — €{total}
                    </motion.button>
                    <button
                      onClick={handleWhatsApp}
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#25D366] text-white font-semibold hover:brightness-110 transition-all text-sm"
                    >
                      <Phone className="w-4 h-4" />
                      Or Book via WhatsApp
                    </button>
                  </div>

                  {/* Trust on mobile */}
                  <div className="md:hidden flex items-center gap-2 text-xs text-[var(--text-muted)] justify-center pb-2">
                    <Shield className="w-3.5 h-3.5" />
                    Free cancellation up to 24h before the tour &bull; Pay
                    onboard
                  </div>
                  <div className="md:hidden text-center text-[11px] text-[var(--text-muted)]">
                    Need help first? Call or WhatsApp {PHONE_DISPLAY}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
