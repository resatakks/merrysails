import { CalendarCheck, CheckCircle2, MessageCircle } from "lucide-react";

/**
 * Booking reassurance strip (2026-06-27) — competitor-gap CRO.
 *
 * The best-converting Bosphorus-cruise competitors lead with three risk
 * removers right at the booking action: free cancellation, instant
 * confirmation, and a fast human reply. Our existing free-cancellation note
 * was buried below the reviews carousel, so the user scanning the booking
 * widget never saw it. This compact, single-row strip surfaces all three near
 * the CTA. Tasteful, no clutter — one row, not a sitewide nav strip.
 *
 * Numbers stay truthful: free cancellation up to 24h is the published policy;
 * the "reply in minutes" claim matches the 3-min average WhatsApp reply in
 * trust-evidence.ts. No fabricated counts.
 */
type Props = {
  className?: string;
};

const ITEMS = [
  {
    icon: CalendarCheck,
    title: "Free cancellation",
    detail: "Full refund up to 24h before departure",
  },
  {
    icon: CheckCircle2,
    title: "Instant confirmation",
    detail: "Your spot is confirmed in writing right away",
  },
  {
    icon: MessageCircle,
    title: "Reply in minutes",
    detail: "Real person on WhatsApp, not a bot queue",
  },
] as const;

export default function BookingReassurance({ className = "" }: Props) {
  return (
    <div
      className={`grid grid-cols-1 gap-2 rounded-xl border border-emerald-200 bg-emerald-50/70 p-3 sm:grid-cols-3 sm:gap-3 ${className}`}
      aria-label="Booking reassurance"
    >
      {ITEMS.map(({ icon: Icon, title, detail }) => (
        <div key={title} className="flex items-start gap-2.5">
          <Icon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
          <div className="min-w-0">
            <div className="text-sm font-semibold text-emerald-900">{title}</div>
            <div className="text-xs leading-snug text-emerald-800/80">{detail}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
