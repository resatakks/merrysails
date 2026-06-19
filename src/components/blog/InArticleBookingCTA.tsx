"use client";

import Link from "next/link";
import { ArrowRight, Anchor, Ship, Sunset, Utensils } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import {
  getContactChannel,
  SITE_URL,
  SITE_NAME,
  TURSAB_LICENSE_NUMBER,
} from "@/lib/constants";

/**
 * In-article booking CTA for blog posts.
 *
 * Three positions, one component:
 *  - `top`    → compact card right under the H1 + TL;DR (above the fold)
 *  - `mid`    → contextual product embed between H2 sections (~3rd–4th H2)
 *  - `bottom` → "Next Steps" panel before the FAQ
 *
 * Each variant emits a JSON-LD `Offer` sibling so AI engines (Bing/Perplexity)
 * can pick up the price + booking signal even when they skip the body text.
 *
 * Each CTA click fires `blog_cta_click` with {slug, position, cruiseType,
 * locale} so we can measure blog → product conversion lift in GA4/Clarity.
 *
 * For `ru` locale: WhatsApp is replaced by Telegram (channel resolved via
 * `getContactChannel`).
 */
export type InArticleCruiseType = "sunset" | "dinner" | "yacht" | "any";
export type InArticleCTAPosition = "top" | "mid" | "bottom";

interface InArticleBookingCTAProps {
  cruiseType: InArticleCruiseType;
  locale: string;
  position: InArticleCTAPosition;
  slug: string;
}

interface CruiseMeta {
  title: string;
  href: string;
  priceFloor: string;
  pier: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  offerName: string;
  offerCurrency: "EUR";
  offerPriceNumeric?: number;
}

function getCruiseMeta(
  cruiseType: InArticleCruiseType,
  locale: string,
): CruiseMeta {
  const localized = (path: string) =>
    locale === "en" ? path : `/${locale}${path}`;

  switch (cruiseType) {
    case "sunset":
      return {
        title: "Bosphorus Sunset Cruise",
        href: localized("/cruises/bosphorus-sunset-cruise"),
        priceFloor: "From €30 / €34",
        pier: "Kabataş / Karaköy",
        icon: Sunset,
        description:
          "Shared golden-hour Bosphorus cruise — boarding 18:30, departs at sunset, returns ~2 hours.",
        offerName: "Bosphorus Sunset Cruise",
        offerCurrency: "EUR",
        offerPriceNumeric: 30,
      };
    case "dinner":
      return {
        title: "Bosphorus Dinner Cruise",
        href: localized("/istanbul-dinner-cruise"),
        priceFloor: "From €30",
        pier: "Kabataş",
        icon: Utensils,
        description:
          "Four-tier dinner cruise package (Standard / Premium / Deluxe / Royal) with Turkish-night show, transfers optional.",
        offerName: "Bosphorus Dinner Cruise",
        offerCurrency: "EUR",
        offerPriceNumeric: 30,
      };
    case "yacht":
      return {
        title: "Private Yacht Charter",
        href: localized("/yacht-charter-istanbul"),
        priceFloor: "From €220",
        pier: "Kuruçeşme Marina",
        icon: Ship,
        description:
          "Private Bosphorus charter — whole-boat, per-vessel pricing from €220 (2-hour minimum, 6-yacht fleet).",
        offerName: "Bosphorus Private Yacht Charter",
        offerCurrency: "EUR",
        offerPriceNumeric: 200,
      };
    case "any":
    default:
      return {
        title: "Plan Your Bosphorus Cruise",
        href: localized("/bosphorus-cruise"),
        priceFloor: "From €30",
        pier: "Karaköy / Kabataş / Kuruçeşme",
        icon: Anchor,
        description:
          "Compare shared sunset, dinner cruises, and private yacht charters in one place — pick what fits your group.",
        offerName: "Bosphorus Cruise (any)",
        offerCurrency: "EUR",
        offerPriceNumeric: 30,
      };
  }
}

/** Locale-aware copy. Keys mirror the existing UI_COPY blocks in the slug pages. */
const COPY: Record<
  string,
  {
    headingTop: string;
    headingMid: string;
    headingBottom: string;
    bookNow: string;
    pierLabel: string;
    fromLabel: string;
    tursab: (n: string) => string;
    nextStepsBody: string;
    sunsetCard: string;
    dinnerCard: string;
    yachtCard: string;
    ruWaDisclaimer: string;
  }
> = {
  en: {
    headingTop: "Book this cruise",
    headingMid: "Ready to book?",
    headingBottom: "Next steps — pick your cruise",
    bookNow: "Book now",
    pierLabel: "Pier",
    fromLabel: "From",
    tursab: (n) => `TÜRSAB A-Group licensed (#${n}) · Direct booking, no middlemen.`,
    nextStepsBody:
      "Three booking options. Same operator, same TÜRSAB licence. Pick the format that matches your group.",
    sunsetCard: "Sunset cruise — €30",
    dinnerCard: "Dinner cruise — €30",
    yachtCard: "Private yacht — €200+",
    ruWaDisclaimer: "",
  },
  tr: {
    headingTop: "Bu turu rezerve et",
    headingMid: "Rezervasyon yapmaya hazır mısınız?",
    headingBottom: "Sıradaki adım — turunuzu seçin",
    bookNow: "Hemen rezerve et",
    pierLabel: "İskele",
    fromLabel: "Başlangıç",
    tursab: (n) => `TÜRSAB A Grubu lisanslı (#${n}) · Aracısız direkt rezervasyon.`,
    nextStepsBody:
      "Üç rezervasyon seçeneği. Aynı operatör, aynı TÜRSAB lisansı. Grubunuza uygun olanı seçin.",
    sunsetCard: "Gün batımı turu — €30",
    dinnerCard: "Akşam yemekli tur — €30",
    yachtCard: "Özel yat — €200+",
    ruWaDisclaimer: "",
  },
  de: {
    headingTop: "Diese Tour buchen",
    headingMid: "Bereit zu buchen?",
    headingBottom: "Nächste Schritte — wählen Sie Ihre Tour",
    bookNow: "Jetzt buchen",
    pierLabel: "Anleger",
    fromLabel: "Ab",
    tursab: (n) => `TÜRSAB A-Gruppe lizenziert (#${n}) · Direktbuchung ohne Zwischenhändler.`,
    nextStepsBody:
      "Drei Buchungsoptionen. Gleicher Anbieter, gleiche TÜRSAB-Lizenz. Wählen Sie das Format passend zu Ihrer Gruppe.",
    sunsetCard: "Sonnenuntergangs-Kreuzfahrt — €30",
    dinnerCard: "Dinner-Kreuzfahrt — €30",
    yachtCard: "Private Yacht — €200+",
    ruWaDisclaimer: "",
  },
  fr: {
    headingTop: "Réserver cette croisière",
    headingMid: "Prêt à réserver ?",
    headingBottom: "Prochaines étapes — choisissez votre croisière",
    bookNow: "Réserver",
    pierLabel: "Embarcadère",
    fromLabel: "À partir de",
    tursab: (n) => `Licence TÜRSAB groupe A (#${n}) · Réservation directe, sans intermédiaire.`,
    nextStepsBody:
      "Trois options de réservation. Même opérateur, même licence TÜRSAB. Choisissez le format adapté à votre groupe.",
    sunsetCard: "Croisière coucher de soleil — €30",
    dinnerCard: "Croisière dîner — €30",
    yachtCard: "Yacht privé — €200+",
    ruWaDisclaimer: "",
  },
  nl: {
    headingTop: "Boek deze cruise",
    headingMid: "Klaar om te boeken?",
    headingBottom: "Volgende stappen — kies je cruise",
    bookNow: "Boek nu",
    pierLabel: "Steiger",
    fromLabel: "Vanaf",
    tursab: (n) => `TÜRSAB groep A vergunning (#${n}) · Directe boeking zonder tussenpersoon.`,
    nextStepsBody:
      "Drie boekingsopties. Zelfde aanbieder, zelfde TÜRSAB-vergunning. Kies wat past bij je groep.",
    sunsetCard: "Sunset cruise — €30",
    dinnerCard: "Dinercruise — €30",
    yachtCard: "Privéjacht — €200+",
    ruWaDisclaimer: "",
  },
  ru: {
    headingTop: "Забронировать круиз",
    headingMid: "Готовы забронировать?",
    headingBottom: "Следующий шаг — выберите круиз",
    bookNow: "Забронировать",
    pierLabel: "Причал",
    fromLabel: "От",
    tursab: (n) => `Лицензия TÜRSAB группа А (#${n}) · Прямое бронирование без посредников.`,
    nextStepsBody:
      "Три варианта бронирования. Один оператор, одна лицензия TÜRSAB. Выберите формат для своей группы.",
    sunsetCard: "Закатный круиз — €30",
    dinnerCard: "Ужин-круиз — €30",
    yachtCard: "Частная яхта — €200+",
    ruWaDisclaimer:
      "Мы отвечаем в WhatsApp круглосуточно — пишите в любое время.",
  },
};

function getCopy(locale: string) {
  return COPY[locale] ?? COPY.en;
}

function handleClick(
  slug: string,
  position: InArticleCTAPosition,
  cruiseType: InArticleCruiseType,
  locale: string,
  ctaTarget: "book" | "contact",
) {
  trackEvent("blog_cta_click", {
    slug,
    position,
    cruise_type: cruiseType,
    locale,
    cta_target: ctaTarget,
  });
}

function ContactButton({
  locale,
  slug,
  position,
  cruiseType,
  variant,
}: {
  locale: string;
  slug: string;
  position: InArticleCTAPosition;
  cruiseType: InArticleCruiseType;
  variant: "filled" | "outline";
}) {
  const channel = getContactChannel(locale);
  const label = "WhatsApp +90 544 898 98 12";

  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-full text-sm py-3 px-5 min-h-[44px] transition-all w-full sm:w-auto";
  const styles =
    variant === "filled"
      ? "bg-[var(--brand-whatsapp,#25D366)] text-white hover:brightness-110"
      : "bg-white/10 border border-white/40 text-white hover:bg-white/20";

  return (
    <a
      href={channel.url}
      target="_blank"
      rel="noopener noreferrer"
      data-contact-tracked="1"
      onClick={() => handleClick(slug, position, cruiseType, locale, "contact")}
      className={`${base} ${styles}`}
    >
      {label}
    </a>
  );
}

export default function InArticleBookingCTA({
  cruiseType,
  locale,
  position,
  slug,
}: InArticleBookingCTAProps) {
  const meta = getCruiseMeta(cruiseType, locale);
  const copy = getCopy(locale);
  const Icon = meta.icon;

  // JSON-LD Offer sibling so AI/SERP crawlers see the price + booking signal
  // even when the rendered card text is skipped.
  const offerSchema = {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: meta.offerName,
    price: meta.offerPriceNumeric,
    priceCurrency: meta.offerCurrency,
    url: `${SITE_URL}${meta.href}`,
    availability: "https://schema.org/InStock",
    seller: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
    },
    areaServed: "Istanbul, Turkey",
  };

  // -------- TOP variant: compact card above the fold -------------------------
  if (position === "top") {
    return (
      <div
        className="my-6 rounded-2xl border border-[var(--line)] bg-gradient-to-br from-white to-[var(--surface-alt)] p-5 md:p-6 shadow-sm max-w-4xl"
        data-blog-cta-position="top"
        data-blog-cta-slug={slug}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }}
        />
        <div className="flex items-start gap-4 mb-4">
          <div className="hidden sm:flex w-12 h-12 rounded-full bg-[var(--brand-primary)]/10 items-center justify-center shrink-0">
            <Icon className="w-6 h-6 text-[var(--brand-primary)]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)] mb-1">
              {copy.headingTop}
            </p>
            <h2 className="text-lg md:text-xl font-bold text-[var(--heading)] mb-1">
              {meta.title}
            </h2>
            <p className="text-sm text-[var(--body-text)]">{meta.description}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-[var(--text-muted)]">
              <span>
                <strong className="text-[var(--heading)]">{copy.fromLabel}:</strong>{" "}
                {meta.priceFloor}
              </span>
              <span>
                <strong className="text-[var(--heading)]">{copy.pierLabel}:</strong>{" "}
                {meta.pier}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={meta.href}
            onClick={() => handleClick(slug, "top", cruiseType, locale, "book")}
            className="inline-flex items-center justify-center gap-2 bg-[var(--brand-primary)] text-white font-bold py-3 px-6 rounded-full text-sm hover:shadow-lg transition-all min-h-[44px] w-full sm:w-auto"
          >
            {copy.bookNow} <ArrowRight className="w-4 h-4" />
          </Link>
          <ContactButton
            locale={locale}
            slug={slug}
            position="top"
            cruiseType={cruiseType}
            variant="outline"
          />
        </div>
        {locale === "ru" && copy.ruWaDisclaimer && (
          <p className="mt-3 text-xs text-[var(--text-muted)] italic">
            {copy.ruWaDisclaimer}
          </p>
        )}
      </div>
    );
  }

  // -------- MID variant: contextual product embed ----------------------------
  if (position === "mid") {
    return (
      <div
        className="my-10 rounded-2xl bg-[var(--brand-primary)] p-6 md:p-7 text-white max-w-4xl"
        data-blog-cta-position="mid"
        data-blog-cta-slug={slug}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }}
        />
        <div className="flex items-center gap-2 mb-2">
          <Icon className="w-5 h-5" />
          <p className="text-xs font-semibold uppercase tracking-wide opacity-90">
            {copy.headingMid}
          </p>
        </div>
        <h3 className="text-xl md:text-2xl font-bold mb-2">{meta.title}</h3>
        <p className="text-white/85 text-sm mb-4">{meta.description}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/80 mb-5">
          <span>
            <strong className="text-white">{copy.fromLabel}:</strong> {meta.priceFloor}
          </span>
          <span>
            <strong className="text-white">{copy.pierLabel}:</strong> {meta.pier}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={meta.href}
            onClick={() => handleClick(slug, "mid", cruiseType, locale, "book")}
            className="inline-flex items-center justify-center gap-2 bg-white text-[var(--brand-primary)] font-bold py-3 px-6 rounded-full text-sm hover:shadow-lg transition-all min-h-[44px] w-full sm:w-auto"
          >
            {copy.bookNow} <ArrowRight className="w-4 h-4" />
          </Link>
          <ContactButton
            locale={locale}
            slug={slug}
            position="mid"
            cruiseType={cruiseType}
            variant="outline"
          />
        </div>
        <p className="mt-4 text-xs text-white/70">{copy.tursab(TURSAB_LICENSE_NUMBER)}</p>
      </div>
    );
  }

  // -------- BOTTOM variant: "Next Steps" 3-way panel -------------------------
  const localized = (p: string) => (locale === "en" ? p : `/${locale}${p}`);
  const cards: { href: string; title: string; tag: InArticleCruiseType }[] = [
    {
      href: localized("/cruises/bosphorus-sunset-cruise"),
      title: copy.sunsetCard,
      tag: "sunset",
    },
    {
      href: localized("/istanbul-dinner-cruise"),
      title: copy.dinnerCard,
      tag: "dinner",
    },
    {
      href: localized("/yacht-charter-istanbul"),
      title: copy.yachtCard,
      tag: "yacht",
    },
  ];
  return (
    <div
      className="my-12 rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-6 md:p-8 max-w-4xl"
      data-blog-cta-position="bottom"
      data-blog-cta-slug={slug}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }}
      />
      <h2 className="text-xl md:text-2xl font-bold text-[var(--heading)] mb-2">
        {copy.headingBottom}
      </h2>
      <p className="text-sm text-[var(--body-text)] mb-5">{copy.nextStepsBody}</p>
      <div className="grid gap-3 sm:grid-cols-3 mb-5">
        {cards.map((c) => (
          <Link
            key={c.tag}
            href={c.href}
            onClick={() => handleClick(slug, "bottom", c.tag, locale, "book")}
            className="rounded-xl border border-[var(--line)] bg-white p-4 hover:border-[var(--brand-primary)]/40 hover:shadow-sm transition-all min-h-[44px] flex items-center justify-between gap-2"
          >
            <span className="text-sm font-semibold text-[var(--heading)]">
              {c.title}
            </span>
            <ArrowRight className="w-4 h-4 text-[var(--brand-primary)] shrink-0" />
          </Link>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <ContactButton
          locale={locale}
          slug={slug}
          position="bottom"
          cruiseType={cruiseType}
          variant="filled"
        />
        <Link
          href={localized("/bosphorus-cruise")}
          onClick={() => handleClick(slug, "bottom", "any", locale, "book")}
          className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-[var(--brand-primary)] hover:underline min-h-[44px]"
        >
          {locale === "ru"
            ? "Сравнить все круизы"
            : locale === "tr"
            ? "Tüm tur seçeneklerini karşılaştır"
            : locale === "de"
            ? "Alle Kreuzfahrten vergleichen"
            : locale === "fr"
            ? "Comparer toutes les croisières"
            : locale === "nl"
            ? "Vergelijk alle cruises"
            : "Compare all cruise options"}
        </Link>
      </div>
      <p className="mt-4 text-xs text-[var(--text-muted)]">
        {copy.tursab(TURSAB_LICENSE_NUMBER)}
      </p>
      {locale === "ru" && copy.ruWaDisclaimer && (
        <p className="mt-2 text-xs text-[var(--text-muted)] italic">
          {copy.ruWaDisclaimer}
        </p>
      )}
    </div>
  );
}

// The slug → cruiseType heuristic lives in `./infer-cruise-type.ts` so server
// components can call it without crossing the client/server boundary. Re-export
// is intentionally avoided here so this client-only module stays narrow.
