import { Star, Users, Award, Clock } from "lucide-react";
import { DIRECT_BOOKING_STATS, SATISFACTION_STATS, PARENT_OPERATOR_STATS } from "@/lib/trust-evidence";
import type { SiteLocale } from "@/i18n/config";

const STRINGS: Record<string, {
  reviews: string;
  guestsSince: (year: number) => string;
  licence: string;
  whatsappReply: string;
}> = {
  en: {
    reviews: "reviews",
    guestsSince: (year) => `guests since ${year}`,
    licence: (() => "licence")(),
    whatsappReply: "avg WhatsApp reply",
  },
  tr: {
    reviews: "yorum",
    guestsSince: (year) => `${year}'den beri misafir`,
    licence: "lisans",
    whatsappReply: "ort. WhatsApp yanıt",
  },
  de: {
    reviews: "Bewertungen",
    guestsSince: (year) => `Gäste seit ${year}`,
    licence: "Lizenz",
    whatsappReply: "ø WhatsApp-Antwort",
  },
  fr: {
    reviews: "avis",
    guestsSince: (year) => `voyageurs depuis ${year}`,
    licence: "licence",
    whatsappReply: "réponse WhatsApp moy.",
  },
  nl: {
    reviews: "beoordelingen",
    guestsSince: (year) => `gasten sinds ${year}`,
    licence: "vergunning",
    whatsappReply: "gem. WhatsApp-reactie",
  },
  ru: {
    reviews: "отзывов",
    guestsSince: (year) => `гостей с ${year}`,
    licence: "лицензия",
    whatsappReply: "сред. ответ WhatsApp",
  },
  zh: {
    reviews: "条评价",
    guestsSince: (year) => `${year} 年至今接待`,
    licence: "许可证",
    whatsappReply: "平均 WhatsApp 回复",
  },
};

type Props = {
  variant?: "product" | "generic";
  productKey?: "sunset" | "dinner" | "yacht";
  locale?: SiteLocale;
  className?: string;
};

export default function SocialProofBadges({
  variant = "generic",
  productKey,
  locale = "en",
  className = "",
}: Props) {
  const t = STRINGS[locale] ?? STRINGS.en;
  const rating =
    productKey === "sunset"
      ? SATISFACTION_STATS.averageRatingSunset
      : productKey === "dinner"
        ? SATISFACTION_STATS.averageRatingDinner
        : productKey === "yacht"
          ? SATISFACTION_STATS.averageRatingYacht
          : SATISFACTION_STATS.averageRatingBlended;
  const reviews =
    productKey === "sunset"
      ? SATISFACTION_STATS.reviewCountSunset
      : productKey === "dinner"
        ? SATISFACTION_STATS.reviewCountDinner
        : productKey === "yacht"
          ? SATISFACTION_STATS.reviewCountYacht
          : SATISFACTION_STATS.totalReviewsBlended;

  return (
    <div
      className={`mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 ${className}`}
      aria-label="Trust signals"
    >
      {/* Rating — 2026-06-06: wrapped in <a href="#reviews"> after Clarity
          surfaced 84 dead clicks on this card in the last 7d on
          /istanbul-dinner-cruise alone. Users tap the rating expecting it to
          scroll to the reviews carousel. ReviewsCarousel renders with
          id="reviews" + scroll-mt-24 so the anchor lands cleanly under the
          sticky header. */}
      <a
        href="#reviews"
        aria-label={`${rating.toFixed(2)} out of 5 — read recent guest reviews`}
        className="flex items-center gap-2 rounded-xl border border-[var(--line)] bg-white px-3 py-2.5 transition-colors hover:border-[var(--brand-primary)]/40 hover:bg-[var(--surface-alt)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]"
      >
        <Star className="h-5 w-5 shrink-0 fill-[var(--brand-gold)] text-[var(--brand-gold)]" />
        <div className="min-w-0">
          <div className="text-sm font-bold text-[var(--heading)]">
            {rating.toFixed(2)}/5
          </div>
          <div className="text-[10px] uppercase tracking-wide text-[var(--text-muted)]">
            {reviews.toLocaleString("en-US")} {t.reviews}
          </div>
        </div>
      </a>

      {/* Guests served (parent operator scale) */}
      <div className="flex items-center gap-2 rounded-xl border border-[var(--line)] bg-white px-3 py-2.5">
        <Users className="h-5 w-5 shrink-0 text-[var(--brand-primary)]" />
        <div className="min-w-0">
          <div className="text-sm font-bold text-[var(--heading)]">
            {(PARENT_OPERATOR_STATS.cumulativeGuestsServed / 1000).toFixed(0)}k+
          </div>
          <div className="text-[10px] uppercase tracking-wide text-[var(--text-muted)]">
            {t.guestsSince(PARENT_OPERATOR_STATS.tursabSinceYear)}
          </div>
        </div>
      </div>

      {/* TURSAB license */}
      <div className="flex items-center gap-2 rounded-xl border border-[var(--line)] bg-white px-3 py-2.5">
        <Award className="h-5 w-5 shrink-0 text-[var(--brand-primary)]" />
        <div className="min-w-0">
          <div className="text-sm font-bold text-[var(--heading)]">
            TÜRSAB A
          </div>
          <div className="text-[10px] uppercase tracking-wide text-[var(--text-muted)]">
            {t.licence} #{PARENT_OPERATOR_STATS.tursabLicenseNumber}
          </div>
        </div>
      </div>

      {/* WhatsApp response time (operational signal) */}
      <div className="flex items-center gap-2 rounded-xl border border-[var(--line)] bg-white px-3 py-2.5">
        <Clock className="h-5 w-5 shrink-0 text-emerald-600" />
        <div className="min-w-0">
          <div className="text-sm font-bold text-[var(--heading)]">
            {DIRECT_BOOKING_STATS.averageWhatsAppReplyMin} min
          </div>
          <div className="text-[10px] uppercase tracking-wide text-[var(--text-muted)]">
            {t.whatsappReply}
          </div>
        </div>
      </div>
    </div>
  );
}
