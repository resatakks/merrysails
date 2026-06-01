import { Sparkles } from "lucide-react";
import { DIRECT_BOOKING_STATS, PARENT_OPERATOR_STATS } from "@/lib/trust-evidence";
import type { SiteLocale } from "@/i18n/config";

/**
 * Subtle live-counter badge — pulls from real DB snapshot in trust-evidence.ts.
 * Localised for all 5 active non-EN locales.
 */

const STRINGS: Record<string, {
  directBookings: (n: number) => string;
  since: (date: string) => string;
  cumulativeGuests: (k: number, year: number) => string;
}> = {
  en: {
    directBookings: (n) => `${n}+ direct bookings`,
    since: (d) => `since ${d}.`,
    cumulativeGuests: (k, year) => `${k}k+ guests cumulative since ${year}.`,
  },
  tr: {
    directBookings: (n) => `${n}+ doğrudan rezervasyon`,
    since: (d) => `${d} itibarıyla.`,
    cumulativeGuests: (k, year) => `${year}'den bu yana toplam ${k} bin+ misafir.`,
  },
  de: {
    directBookings: (n) => `${n}+ Direktbuchungen`,
    since: (d) => `seit ${d}.`,
    cumulativeGuests: (k, year) => `Kumulativ ${k}k+ Gäste seit ${year}.`,
  },
  fr: {
    directBookings: (n) => `${n}+ réservations directes`,
    since: (d) => `depuis le ${d}.`,
    cumulativeGuests: (k, year) => `${k}k+ voyageurs cumulés depuis ${year}.`,
  },
  nl: {
    directBookings: (n) => `${n}+ directe boekingen`,
    since: (d) => `sinds ${d}.`,
    cumulativeGuests: (k, year) => `${k}k+ gasten cumulatief sinds ${year}.`,
  },
  ru: {
    directBookings: (n) => `${n}+ прямых бронирований`,
    since: (d) => `с ${d}.`,
    cumulativeGuests: (k, year) => `Всего ${k}k+ гостей с ${year} года.`,
  },
};

const DATE_LOCALE: Record<string, string> = {
  en: "en-GB",
  tr: "tr-TR",
  de: "de-DE",
  fr: "fr-FR",
  nl: "nl-NL",
  ru: "ru-RU",
};

type Props = {
  variant?: "inline" | "banner";
  locale?: SiteLocale;
  className?: string;
};

export default function LiveBookingCounter({
  variant = "inline",
  locale = "en",
  className = "",
}: Props) {
  const t = STRINGS[locale] ?? STRINGS.en;
  const launchDateText = new Date(
    DIRECT_BOOKING_STATS.launchedOn,
  ).toLocaleDateString(DATE_LOCALE[locale] ?? "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const k = Number((PARENT_OPERATOR_STATS.cumulativeGuestsServed / 1000).toFixed(0));

  if (variant === "banner") {
    return (
      <div
        className={`flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 ${className}`}
      >
        <Sparkles className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden />
        <div className="text-sm">
          <span className="font-bold text-emerald-900">
            {t.directBookings(DIRECT_BOOKING_STATS.totalReservations)}
          </span>{" "}
          <span className="text-emerald-800">{t.since(launchDateText)}</span>{" "}
          <span className="text-emerald-700">
            {t.cumulativeGuests(k, PARENT_OPERATOR_STATS.tursabSinceYear)}
          </span>
        </div>
      </div>
    );
  }

  return (
    <p className={`text-xs text-[var(--text-muted)] ${className}`}>
      <span className="font-semibold text-[var(--heading)]">
        {t.directBookings(DIRECT_BOOKING_STATS.totalReservations)}
      </span>{" "}
      {t.since(launchDateText)}{" "}
      <span className="font-semibold text-[var(--heading)]">
        {t.cumulativeGuests(k, PARENT_OPERATOR_STATS.tursabSinceYear)}
      </span>
    </p>
  );
}
