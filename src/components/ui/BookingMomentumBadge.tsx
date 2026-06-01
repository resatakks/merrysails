import { TrendingUp, Calendar, AlertCircle } from "lucide-react";
import type { BookingMomentum } from "@/lib/booking-momentum";

/**
 * Server-rendered urgency / social-proof badge using real Reservation DB
 * counts (see src/lib/booking-momentum.ts).
 *
 * Rendering logic — only show a row when there's actually something to
 * say. Empty momentum = no badge, no fake urgency.
 *
 *   - next14days >= 3       → "X reservations in the next 14 days"
 *   - last7days >= 2        → "X reservations this week"
 *   - nextSoldOutDate set   → "Next sold-out date: [Y] — book a different evening"
 *
 * Maximum 2 badges shown so it doesn't crowd the above-fold space.
 */

type Props = {
  momentum: BookingMomentum;
  productLabel: string; // e.g. "sunset cruise"
  className?: string;
};

export default function BookingMomentumBadge({
  momentum,
  productLabel,
  className = "",
}: Props) {
  const badges: Array<{ icon: typeof TrendingUp; text: string; tone: "neutral" | "warn" }> = [];

  if (momentum.next14days >= 3) {
    badges.push({
      icon: TrendingUp,
      text: `${momentum.next14days} ${productLabel} reservations confirmed for the next 14 days`,
      tone: "neutral",
    });
  } else if (momentum.last7days >= 2) {
    badges.push({
      icon: Calendar,
      text: `${momentum.last7days} new ${productLabel} bookings in the last 7 days`,
      tone: "neutral",
    });
  }

  if (momentum.nextSoldOutDate) {
    badges.push({
      icon: AlertCircle,
      text: `Next sold-out date: ${formatDate(momentum.nextSoldOutDate)} — pick a different evening`,
      tone: "warn",
    });
  }

  if (badges.length === 0) return null;

  return (
    <div className={`flex flex-col gap-2 ${className}`} aria-live="polite">
      {badges.slice(0, 2).map((b) => {
        const Icon = b.icon;
        return (
          <div
            key={b.text}
            className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm ${
              b.tone === "warn"
                ? "border-amber-200 bg-amber-50 text-amber-900"
                : "border-emerald-200 bg-emerald-50 text-emerald-900"
            }`}
          >
            <Icon
              className={`h-4 w-4 shrink-0 ${
                b.tone === "warn" ? "text-amber-600" : "text-emerald-600"
              }`}
              aria-hidden
            />
            <span className="font-medium">{b.text}</span>
          </div>
        );
      })}
    </div>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}
