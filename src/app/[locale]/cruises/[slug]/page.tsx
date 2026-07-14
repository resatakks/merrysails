import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getTourBySlug,
  getTourPath,
  isPricingVisible,
  tours,
} from "@/data/tours";
import TourDetailClient from "@/components/tours/TourDetailClient";
import CoreBookingPlanner from "@/components/booking/CoreBookingPlanner";
import { resolveBookingPrefill } from "@/lib/booking-prefill";
import WeekdayDiscountBanner from "@/components/promo/WeekdayDiscountBanner";
import { getWeekdayDiscountStrings } from "@/components/promo/weekday-discount-strings";
import { ACTIVE_LOCALES, isActiveLocale, type SiteLocale } from "@/i18n/config";
import { SITE_URL } from "@/lib/constants";
import { OFFER_MERCHANT_DEFAULTS } from "@/lib/schema-merchant";
import SocialProofBadges from "@/components/ui/SocialProofBadges";
import LiveBookingCounter from "@/components/ui/LiveBookingCounter";
import BookingMomentumBadge from "@/components/ui/BookingMomentumBadge";
import ReviewsCarousel from "@/components/ui/ReviewsCarousel";
import StickyMobileCta from "@/components/ui/StickyMobileCta";
import { getProductBookingMomentum } from "@/lib/booking-momentum";

const OWNER_REDIRECTS: Record<string, string> = {
  // 2026-07-09: destination moved off /istanbul-dinner-cruise (DMCA relocation,
  // Lumen #86820254) — chain-flattened to the new EN root, still bare (no
  // locale prefix) matching the pre-existing behavior of this map.
  "bosphorus-dinner-cruise": "/bosphorus-dinner-cruise-istanbul",
  "yacht-charter-in-istanbul": "/yacht-charter-istanbul",
  "romantic-marriage-proposal": "/proposal-yacht-rental-istanbul",
  "corporate-event-bosphorus-cruise": "/corporate-events",
  "private-bosphorus-dinner-yacht-cruise": "/private-bosphorus-dinner-cruise",
};

export const revalidate = 3600;

// 2026-06-05 [P1-A — Semrush duplicate-meta cluster]: previously this route
// generated `tour.slug` × 5 non-EN locales = ~95 pages. The bulk of each page
// rendered EN strings (tour.nameEn, tour.description) because tour-locales.ts
// only ships translations for 3 slugs (sunset, dinner, yacht-charter), all of
// which either have a dedicated static page or live in OWNER_REDIRECTS. The
// 16 untranslated slugs × 5 locales = 80 pages were duplicate-EN content under
// non-English URLs → language mismatch + duplicate-meta + thin-content trio.
//
// Fix: only pre-render slugs that REDIRECT (OWNER_REDIRECTS map). Everything
// else returns 404 (dynamicParams = false). When translation budget exists,
// add per-slug native content + readd to generateStaticParams.
export const dynamicParams = false;

const OWNER_REDIRECT_SLUGS = Object.keys(OWNER_REDIRECTS);

export function generateStaticParams() {
  const localeSlugs: { locale: string; slug: string }[] = [];
  for (const locale of ACTIVE_LOCALES) {
    if (locale === "en") continue;
    for (const slug of OWNER_REDIRECT_SLUGS) {
      localeSlugs.push({ locale, slug });
    }
  }
  return localeSlugs;
}

// Locales that actually render a /<locale>/cruises/<slug> page. ru + zh do NOT
// have live locale cruise pages, so emitting hreflang for them produced
// "missing return links" in Semrush (2026-06-22 audit). Mirror the gating in
// src/lib/hreflang.ts — only annotate alternates that reciprocate.
const CRUISE_HREFLANG_LOCALES: SiteLocale[] = ["tr", "de", "fr", "nl"];

function buildLocaleHreflang(slug: string): Record<string, string> {
  const languages: Record<string, string> = {
    "x-default": `${SITE_URL}/cruises/${slug}`,
    en: `${SITE_URL}/cruises/${slug}`,
  };
  for (const locale of CRUISE_HREFLANG_LOCALES) {
    languages[locale] = `${SITE_URL}/${locale}/cruises/${slug}`;
  }
  return languages;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") {
    return {};
  }
  const tour = getTourBySlug(slug, locale);
  if (!tour) return { title: "Tour Not Found" };

  const showPricing = isPricingVisible(tour);
  // Bare title — the root layout template ("%s | MerrySails") appends the brand
  // suffix exactly once. Appending "| MerrySails" here too produced a double
  // suffix ("… | MerrySails | MerrySails") on 28 localized cruise pages
  // (Semrush audit 2026-06-22). See CLAUDE.md title rule #5.
  const title = showPricing
    ? `${tour.nameEn} — From €${tour.priceEur}`
    : tour.nameEn;
  const description = showPricing
    ? `${tour.description} Duration: ${tour.duration}. Capacity: ${tour.capacity}. Book your ${tour.nameEn} in Istanbul today.`
    : `${tour.description} Explore the service structure, highlights, and best-fit use cases for ${tour.nameEn} in Istanbul.`;

  const ownerRedirect = OWNER_REDIRECTS[slug];
  const url = ownerRedirect
    ? `${SITE_URL}/${locale}${ownerRedirect}`
    : `${SITE_URL}/${locale}/cruises/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      ...(!ownerRedirect && { languages: buildLocaleHreflang(slug) }),
    },
    robots: {
      index: !ownerRedirect,
      follow: true,
      googleBot: {
        index: !ownerRedirect,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large" as const,
        "max-snippet": -1,
      },
    },
    openGraph: {
      title,
      description: tour.description,
      url,
      type: "website",
      images: [{ url: tour.image, width: 1200, height: 630, alt: tour.nameEn }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: tour.description,
      images: [tour.image],
    },
  };
}

export default async function LocaleTourDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale, slug } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") {
    notFound();
  }

  const resolvedSearchParams = await searchParams;
  const ownerRedirect = OWNER_REDIRECTS[slug];
  if (ownerRedirect) redirect(`/${locale}${ownerRedirect}`);

  // Pass the locale so getTourBySlug merges any tour-locales.ts override.
  // Empty/missing fields fall back to EN automatically.
  const tour = getTourBySlug(slug, locale);
  if (!tour) notFound();
  const showPricing = isPricingVisible(tour);

  // Locale-aware booking momentum + product label
  const momentum = await getProductBookingMomentum(slug);
  const productLabelByLocale: Record<string, Record<string, string>> = {
    en: { sunset: "sunset cruise", dinner: "dinner cruise", yacht: "private yacht", generic: "Bosphorus cruise" },
    tr: { sunset: "gün batımı turu", dinner: "akşam yemekli tur", yacht: "özel yat", generic: "Boğaz turu" },
    de: { sunset: "Sonnenuntergangsfahrt", dinner: "Dinner-Kreuzfahrt", yacht: "private Yacht", generic: "Bosporus-Kreuzfahrt" },
    fr: { sunset: "croisière coucher de soleil", dinner: "croisière dîner", yacht: "yacht privé", generic: "croisière Bosphore" },
    nl: { sunset: "zonsondergangs-cruise", dinner: "dinercruise", yacht: "privéjacht", generic: "Bosporus-cruise" },
    ru: { sunset: "закатный круиз", dinner: "ужин-круиз", yacht: "частная яхта", generic: "круиз по Босфору" },
  };
  const productLabels = productLabelByLocale[locale] ?? productLabelByLocale.en;
  const productLabel =
    slug === "bosphorus-sunset-cruise"
      ? productLabels.sunset
      : slug === "bosphorus-dinner-cruise"
        ? productLabels.dinner
        : tour.category === "private"
          ? productLabels.yacht
          : productLabels.generic;
  const reviewProductKey: "sunset" | "dinner" | "yacht" | "any" =
    slug === "bosphorus-sunset-cruise"
      ? "sunset"
      : slug === "bosphorus-dinner-cruise"
        ? "dinner"
        : tour.category === "private"
          ? "yacht"
          : "any";

  // WhatsApp prefill text per locale
  const whatsappPrefillByLocale: Record<string, string> = {
    en: `Hi MerrySails! I'm interested in the ${tour.nameEn} (from €${tour.priceEur}). What dates are available?`,
    tr: `Merhaba MerrySails! ${tour.nameEn} (€${tour.priceEur}'dan başlayan) için fiyat ve müsait tarihler hakkında bilgi alabilir miyim?`,
    de: `Hallo MerrySails! Ich interessiere mich für die ${tour.nameEn} (ab €${tour.priceEur}). Welche Termine sind verfügbar?`,
    fr: `Bonjour MerrySails ! Je suis intéressé(e) par ${tour.nameEn} (à partir de €${tour.priceEur}). Quelles dates sont disponibles ?`,
    nl: `Hallo MerrySails! Ik ben geïnteresseerd in de ${tour.nameEn} (vanaf €${tour.priceEur}). Welke data zijn beschikbaar?`,
    ru: `Здравствуйте, MerrySails! Меня интересует ${tour.nameEn} (от €${tour.priceEur}). Какие даты свободны?`,
  };
  const whatsappPrefill = whatsappPrefillByLocale[locale] ?? whatsappPrefillByLocale.en;
  // Locale "Reserve from €X" label
  const reserveLabelByLocale: Record<string, string> = {
    en: `Reserve from €${tour.priceEur}`,
    tr: `€${tour.priceEur}'dan rezerve et`,
    de: `Ab €${tour.priceEur} buchen`,
    fr: `Réserver dès €${tour.priceEur}`,
    nl: `Boeken vanaf €${tour.priceEur}`,
    ru: `Забронировать от €${tour.priceEur}`,
  };
  const reserveLabel = reserveLabelByLocale[locale] ?? reserveLabelByLocale.en;
  // showPricing is computed earlier — keep typescript happy by referencing it.
  void showPricing;

  const related = tours
    .filter((t) => t.slug !== slug && t.category === tour.category)
    .slice(0, 4);

  const canonicalUrl = `${SITE_URL}/${locale}/cruises/${slug}`;

  // JSON-LD TouristTrip + Product schema
  const tourSchema = {
    "@context": "https://schema.org",
    "@type": ["TouristTrip", "Service"],
    name: tour.nameEn,
    description: tour.description,
    touristType: "Leisure",
    url: canonicalUrl,
    image: tour.image,
    duration: (() => {
      const h = tour.duration.match(/(\d+)\.?(\d*)\s*hour/i);
      if (!h) return undefined;
      const hours = parseInt(h[1]);
      const frac = h[2];
      return `PT${hours}H${frac === "5" ? "30M" : ""}`;
    })(),
    availableLanguage: ["English", "Turkish"],
    inLanguage: locale,
    brand: {
      "@type": "Brand",
      name: "MerrySails",
    },
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    ...(showPricing
      ? {
          offers: {
            "@type": "Offer",
            ...OFFER_MERCHANT_DEFAULTS,
            price: tour.priceEur,
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            validFrom: "2026-01-01",
            priceValidUntil: "2026-12-31",
            url: canonicalUrl,
            hasMerchantReturnPolicy: {
              "@type": "MerchantReturnPolicy",
              applicableCountry: "TR",
              returnPolicyCategory:
                "https://schema.org/MerchantReturnFiniteReturnWindow",
              merchantReturnDays: 1,
              returnFees: "https://schema.org/FreeReturn",
            },
          },
        }
      : {}),
    ...(tour.rating && tour.reviewCount
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: tour.rating,
            reviewCount: tour.reviewCount,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
    itinerary: {
      "@type": "ItemList",
      itemListElement: tour.highlights.map((h, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: h,
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/${locale}` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Bosphorus Cruise",
        item: `${SITE_URL}/${locale}/bosphorus-cruise`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tour.nameEn,
        item: canonicalUrl,
      },
    ],
  };

  const faqs = showPricing ? tour.faq : tour.faq;
  const faqSchema = faqs
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tourSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <div className="pt-28 pb-20 bg-[var(--surface-alt)]">
        <div className="container-main">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6"
          >
            <Link
              href={`/${locale}`}
              className="hover:text-[var(--brand-primary)]"
            >
              Home
            </Link>
            <span>/</span>
            <Link
              href={`/${locale}/bosphorus-cruise`}
              className="hover:text-[var(--brand-primary)]"
            >
              Bosphorus Cruise
            </Link>
            <span>/</span>
            <span
              aria-current="page"
              className="text-[var(--text-muted)] truncate">{tour.nameEn}</span>
          </nav>

          {/* Locale-aware conversion stack — same components as EN cruises. */}
          <SocialProofBadges
            variant="product"
            productKey={reviewProductKey === "any" ? undefined : reviewProductKey}
            locale={locale as SiteLocale}
            className="mb-6"
          />
          <LiveBookingCounter locale={locale as SiteLocale} className="mb-4" />
          <BookingMomentumBadge
            momentum={momentum}
            productLabel={productLabel}
            locale={locale as SiteLocale}
            className="mb-6"
          />

          {tour.packages?.some((p) => p.weekdayDiscount) && (
            <WeekdayDiscountBanner
              packages={tour.packages}
              productName={tour.nameEn}
              strings={getWeekdayDiscountStrings(locale as SiteLocale)}
            />
          )}

          <div className="my-8">
            <CoreBookingPlanner
              variant="page"
              source={`product-${tour.slug}`}
              initialTourSlug={tour.slug}
              lockTour
            />
          </div>

          <TourDetailClient
            tour={tour}
            related={related}
            locale={locale as SiteLocale}
            bookingPrefill={await resolveBookingPrefill(resolvedSearchParams)}
          />

          <div className="my-8">
            <ReviewsCarousel productKey={reviewProductKey} locale={locale as SiteLocale} />
          </div>
        </div>
      </div>
      <StickyMobileCta
        reserveHref="#core-booking-planner"
        reserveLabel={reserveLabel}
        locale={locale as SiteLocale}
        whatsappLocation={`locale_cruise_${locale}_${tour.slug}`}
        whatsappPrefill={whatsappPrefill}
      />
    </>
  );
}
