import { Star, Quote } from "lucide-react";
import { getReviewsForProduct, getReviewText, type CuratedReview } from "@/data/curated-reviews";
import type { SiteLocale } from "@/i18n/config";

/**
 * Recent reviews carousel — surfaces 3-4 curated guest reviews on
 * commercial pages. Server-rendered, supports all 5 non-EN locales.
 *
 * Native-quote priority:
 *   1. Reviews with `textByLocale[locale]` present (real native quote)
 *   2. Reviews from the locale's native country
 *   3. Product-specific generic
 *   4. "any" fallback
 *
 * Schema:
 *   - Each card emits a JSON-LD Review (Google rich-snippet eligible)
 *   - We DO NOT emit AggregateRating here — that's already on the
 *     Tour / Service schema. Two AggregateRatings on one page can
 *     trigger Google's "duplicate review summary" warning.
 */

const STRINGS: Record<string, {
  heading: string;
  disclaimer: string;
  cruisedOn: (d: string) => string;
}> = {
  en: {
    heading: "Recent guest reviews",
    disclaimer:
      "Collected directly via WhatsApp and email follow-up after the cruise. First name + country + date are real; full names kept private for guest comfort.",
    cruisedOn: (d) => `cruised ${d}`,
  },
  tr: {
    heading: "Son misafir yorumları",
    disclaimer:
      "Tur sonrası WhatsApp ve e-posta üzerinden doğrudan alındı. İlk isim + ülke + tarih gerçek; soyadı gizliliği için paylaşılmaz.",
    cruisedOn: (d) => `${d} tarihinde tura katıldı`,
  },
  de: {
    heading: "Aktuelle Gästebewertungen",
    disclaimer:
      "Direkt nach der Fahrt per WhatsApp und E-Mail eingeholt. Vorname + Land + Datum sind echt; vollständige Namen bleiben aus Datenschutzgründen privat.",
    cruisedOn: (d) => `Fahrt am ${d}`,
  },
  fr: {
    heading: "Avis récents de nos passagers",
    disclaimer:
      "Recueillis directement par WhatsApp et e-mail après la croisière. Prénom + pays + date sont réels ; les noms complets restent privés pour le confort des passagers.",
    cruisedOn: (d) => `croisière du ${d}`,
  },
  nl: {
    heading: "Recente gastbeoordelingen",
    disclaimer:
      "Direct verzameld via WhatsApp en e-mail na de cruise. Voornaam + land + datum zijn echt; volledige namen blijven privé.",
    cruisedOn: (d) => `gevaren op ${d}`,
  },
  ru: {
    heading: "Недавние отзывы гостей",
    disclaimer:
      "Собраны напрямую через WhatsApp и e-mail после круиза. Имя, страна и дата — реальные; фамилии не публикуются для конфиденциальности гостей.",
    cruisedOn: (d) => `круиз ${d}`,
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
  productKey: CuratedReview["productKey"];
  locale?: SiteLocale;
  className?: string;
};

const FLAG: Record<string, string> = {
  GB: "🇬🇧", US: "🇺🇸", DE: "🇩🇪", FR: "🇫🇷", IT: "🇮🇹", PL: "🇵🇱",
  CH: "🇨🇭", AE: "🇦🇪", SA: "🇸🇦", EG: "🇪🇬", IN: "🇮🇳", AU: "🇦🇺",
  SG: "🇸🇬", RU: "🇷🇺", TR: "🇹🇷", NL: "🇳🇱",
};

function formatDate(iso: string, dateLocale: string = "en-GB"): string {
  return new Date(iso).toLocaleDateString(dateLocale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ReviewsCarousel({
  productKey,
  locale = "en",
  className = "",
}: Props) {
  const safeLocale = (locale ?? "en") as "en" | "tr" | "de" | "fr" | "nl" | "ru";
  const reviews = getReviewsForProduct(productKey, 4, safeLocale);
  if (reviews.length === 0) return null;
  const t = STRINGS[safeLocale] ?? STRINGS.en;
  const dateLoc = DATE_LOCALE[safeLocale] ?? "en-GB";

  // Emit JSON-LD Review for each card — Google rich-snippet eligible.
  // We use itemReviewed as a generic Service to avoid duplicating the
  // page-level Tour/Service schema. Each guest gets their own Review node.
  const reviewSchemas = reviews.map((r) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    author: {
      "@type": "Person",
      name: `${r.firstName} (${r.country})`,
    },
    datePublished: r.cruiseDate,
    reviewBody: getReviewText(r, safeLocale),
    reviewRating: {
      "@type": "Rating",
      ratingValue: r.rating,
      bestRating: 5,
      worstRating: 1,
    },
    itemReviewed: {
      "@type": "Service",
      name:
        productKey === "sunset"
          ? "Bosphorus Sunset Cruise"
          : productKey === "dinner"
            ? "Bosphorus Dinner Cruise"
            : productKey === "yacht"
              ? "Private Yacht Charter Istanbul"
              : "Bosphorus Cruise",
    },
  }));

  return (
    <>
      {reviewSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <section
        id="reviews"
        aria-label={t.heading}
        className={`scroll-mt-24 rounded-2xl border border-[var(--line)] bg-white p-6 ${className}`}
      >
        <h2 className="mb-1 text-xl font-bold text-[var(--heading)]">{t.heading}</h2>
        <p className="mb-5 text-xs text-[var(--text-muted)]">{t.disclaimer}</p>

        <div className="grid gap-3 md:grid-cols-2">
          {reviews.map((r) => (
            <article
              key={`${r.firstName}-${r.cruiseDate}`}
              className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4"
            >
              <div className="mb-2 flex items-center gap-2">
                <Quote className="h-4 w-4 text-[var(--brand-primary)]/40" aria-hidden />
                <div className="flex gap-0.5" aria-label={`${r.rating} / 5`}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < r.rating
                          ? "fill-[var(--brand-gold)] text-[var(--brand-gold)]"
                          : "text-gray-300"
                      }`}
                      aria-hidden
                    />
                  ))}
                </div>
              </div>
              <p className="mb-3 text-sm leading-relaxed text-[var(--body-text)]">
                &ldquo;{getReviewText(r, safeLocale)}&rdquo;
              </p>
              <p className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                <span aria-hidden>{FLAG[r.country] ?? "🌍"}</span>
                <span className="font-semibold text-[var(--heading)]">{r.firstName}</span>
                <span>·</span>
                <span>{t.cruisedOn(formatDate(r.cruiseDate, dateLoc))}</span>
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
