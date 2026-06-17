import React from "react";

function VisaIcon() {
  return (
    <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Visa" className="h-6 w-auto">
      <rect width="48" height="32" rx="4" fill="#1A1F71" />
      <text x="24" y="22" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="800" fontFamily="Arial,sans-serif" letterSpacing="-0.5">VISA</text>
    </svg>
  );
}

function MastercardIcon() {
  return (
    <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Mastercard" className="h-6 w-auto">
      <rect width="48" height="32" rx="4" fill="#252525" />
      <circle cx="18" cy="16" r="9" fill="#EB001B" />
      <circle cx="30" cy="16" r="9" fill="#F79E1B" />
      <path d="M24 9.25A9 9 0 0 1 27.75 16 9 9 0 0 1 24 22.75 9 9 0 0 1 20.25 16 9 9 0 0 1 24 9.25z" fill="#FF5F00" />
    </svg>
  );
}

function AmexIcon() {
  return (
    <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="American Express" className="h-6 w-auto">
      <rect width="48" height="32" rx="4" fill="#2E77BC" />
      <text x="24" y="13" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="700" fontFamily="Arial,sans-serif" letterSpacing="0.3">AMERICAN</text>
      <text x="24" y="22" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="700" fontFamily="Arial,sans-serif" letterSpacing="0.3">EXPRESS</text>
    </svg>
  );
}

function ApplePayIcon() {
  return (
    <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Apple Pay" className="h-6 w-auto">
      <rect width="48" height="32" rx="4" fill="#000000" />
      <text x="28" y="21" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="500" fontFamily="-apple-system,BlinkMacSystemFont,sans-serif">Pay</text>
      <path d="M14 12.5c.7-.8 1.1-1.9.9-3-1 .1-2.2.6-2.9 1.5-.6.8-1.1 1.9-.9 3 1.1.1 2.2-.6 2.9-1.5z" fill="#FFFFFF" />
      <path d="M17 14.8c-.8.4-1.3 1.2-1.3 2.1 0 1 .6 1.9 1.4 2.3-.2.8-.7 1.5-1.2 2.1-.7.9-1.3 1.8-2.3 1.8-.9 0-1.2-.6-2.3-.6-1.1 0-1.5.6-2.4.6s-1.6-.8-2.3-1.9c-1-1.3-1.7-3.4-1.7-5.3 0-3.1 2-4.7 4-4.7 1 0 1.9.7 2.6.7.6 0 1.7-.7 2.9-.7.5 0 1.9.2 2.8 1.4l-.2.2z" fill="#FFFFFF" />
    </svg>
  );
}

function GooglePayIcon() {
  return (
    <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Google Pay" className="h-6 w-auto">
      <rect width="48" height="32" rx="4" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1" />
      <text x="24" y="21" textAnchor="middle" fill="#3C4043" fontSize="10" fontWeight="600" fontFamily="Arial,sans-serif">G Pay</text>
    </svg>
  );
}

interface Props {
  className?: string;
  /**
   * Visual context for the row.
   *
   *  - "dark"  (default): built for the dark footer — gold SSL label, white/50
   *    "Pay onboard" line, card SVGs sit bare on the dark surface.
   *  - "light": for light/gradient surfaces (e.g. the homepage TrustCredentials
   *    band). The SSL label + "Pay onboard" line switch to dark/brand text so
   *    they stay legible, and the card icons get a subtle white chip so their
   *    own backgrounds read cleanly against the gradient.
   *
   * The card SVGs carry their own backgrounds, so only the surrounding text
   * and the icon chip change between tones.
   */
  tone?: "dark" | "light";
}

export default function PaymentTrust({ className = "", tone = "dark" }: Props) {
  const isLight = tone === "light";
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 ${className}`}>
      <div
        className={
          isLight
            ? "flex items-center gap-1.5 rounded-xl border border-[var(--line)] bg-white px-2.5 py-1.5"
            : "flex items-center gap-1.5"
        }
      >
        <VisaIcon />
        <MastercardIcon />
        <AmexIcon />
        <ApplePayIcon />
        <GooglePayIcon />
      </div>
      <div className="flex items-center gap-1.5">
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-3.5 w-3.5 text-green-500">
          <rect x="3" y="7" width="10" height="8" rx="1.5" fill="currentColor" />
          <path d="M5 7V5a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <circle cx="8" cy="11" r="1.2" fill="white" />
        </svg>
        <span className="text-[11px] font-semibold text-[var(--brand-gold)]">256-bit SSL</span>
      </div>
      <span
        className={
          isLight
            ? "text-[11px] font-medium text-[var(--text-muted)]"
            : "text-[11px] text-white/50"
        }
      >
        Pay onboard or in advance &middot; &euro; &middot; &pound; &middot; $
      </span>
    </div>
  );
}
