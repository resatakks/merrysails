import { TrendingUp, Calendar, AlertCircle } from "lucide-react";
import type { BookingMomentum } from "@/lib/booking-momentum";
import type { SiteLocale } from "@/i18n/config";

const STRINGS: Record<string, {
  next14: (n: number, p: string) => string;
  last7: (n: number, p: string) => string;
  soldOut: (date: string) => string;
}> = {
  en: {
    next14: (n, p) => `${n} ${p} reservations confirmed for the next 14 days`,
    last7: (n, p) => `${n} new ${p} bookings in the last 7 days`,
    soldOut: (d) => `Next sold-out date: ${d} — pick a different evening`,
  },
  tr: {
    next14: (n, p) => `Önümüzdeki 14 gün için ${n} onaylanmış ${p} rezervasyonu`,
    last7: (n, p) => `Son 7 günde ${n} yeni ${p} rezervasyonu`,
    soldOut: (d) => `Bir sonraki dolu tarih: ${d} — başka bir akşam seçin`,
  },
  de: {
    next14: (n, p) => `${n} bestätigte ${p}-Reservierungen in den nächsten 14 Tagen`,
    last7: (n, p) => `${n} neue ${p}-Buchungen in den letzten 7 Tagen`,
    soldOut: (d) => `Nächster ausverkaufter Termin: ${d} — wählen Sie einen anderen Abend`,
  },
  fr: {
    next14: (n, p) => `${n} réservations ${p} confirmées pour les 14 prochains jours`,
    last7: (n, p) => `${n} nouvelles réservations ${p} ces 7 derniers jours`,
    soldOut: (d) => `Prochaine date complète : ${d} — choisissez une autre soirée`,
  },
  nl: {
    next14: (n, p) => `${n} bevestigde ${p}-reserveringen voor de komende 14 dagen`,
    last7: (n, p) => `${n} nieuwe ${p}-boekingen in de afgelopen 7 dagen`,
    soldOut: (d) => `Volgende uitverkochte datum: ${d} — kies een andere avond`,
  },
  ru: {
    next14: (n, p) => `${n} подтверждённых бронирований ${p} на ближайшие 14 дней`,
    last7: (n, p) => `${n} новых бронирований ${p} за последние 7 дней`,
    soldOut: (d) => `Ближайшая распроданная дата: ${d} — выберите другой вечер`,
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
  momentum: BookingMomentum;
  productLabel: string; // e.g. "sunset cruise" — caller passes locale-appropriate label
  locale?: SiteLocale;
  className?: string;
};

export default function BookingMomentumBadge({
  momentum,
  productLabel,
  locale = "en",
  className = "",
}: Props) {
  const t = STRINGS[locale] ?? STRINGS.en;
  const dateLoc = DATE_LOCALE[locale] ?? "en-GB";
  const badges: Array<{ icon: typeof TrendingUp; text: string; tone: "neutral" | "warn" }> = [];

  if (momentum.next14days >= 3) {
    badges.push({
      icon: TrendingUp,
      text: t.next14(momentum.next14days, productLabel),
      tone: "neutral",
    });
  } else if (momentum.last7days >= 2) {
    badges.push({
      icon: Calendar,
      text: t.last7(momentum.last7days, productLabel),
      tone: "neutral",
    });
  }

  if (momentum.nextSoldOutDate) {
    badges.push({
      icon: AlertCircle,
      text: t.soldOut(formatDate(momentum.nextSoldOutDate, dateLoc)),
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

function formatDate(iso: string, dateLocale: string = "en-GB"): string {
  const d = new Date(iso);
  return d.toLocaleDateString(dateLocale, {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}
