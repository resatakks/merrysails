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
import { resolveBookingPrefill } from "@/lib/booking-prefill";
import { ACTIVE_LOCALES, isActiveLocale, type SiteLocale } from "@/i18n/config";
import { SITE_URL } from "@/lib/constants";

const OWNER_REDIRECTS: Record<string, string> = {
  "bosphorus-dinner-cruise": "/istanbul-dinner-cruise",
  "yacht-charter-in-istanbul": "/yacht-charter-istanbul",
  "romantic-marriage-proposal": "/proposal-yacht-rental-istanbul",
  "corporate-event-bosphorus-cruise": "/corporate-events",
  "private-bosphorus-dinner-yacht-cruise": "/private-bosphorus-dinner-cruise",
};

export const revalidate = 3600;

export function generateStaticParams() {
  const localeSlugs: { locale: string; slug: string }[] = [];
  for (const locale of ACTIVE_LOCALES) {
    if (locale === "en") continue;
    for (const tour of tours) {
      // Skip slugs that have a static [locale]/cruises/<slug> page already
      if (tour.slug === "bosphorus-sunset-cruise") continue;
      localeSlugs.push({ locale, slug: tour.slug });
    }
  }
  return localeSlugs;
}

function buildLocaleHreflang(slug: string): Record<string, string> {
  const languages: Record<string, string> = {
    "x-default": `${SITE_URL}/cruises/${slug}`,
    en: `${SITE_URL}/cruises/${slug}`,
  };
  for (const locale of ACTIVE_LOCALES) {
    if (locale !== "en") {
      languages[locale] = `${SITE_URL}/${locale}/cruises/${slug}`;
    }
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
  const tour = getTourBySlug(slug);
  if (!tour) return { title: "Tour Not Found" };

  const showPricing = isPricingVisible(tour);
  const title = showPricing
    ? `${tour.nameEn} — From €${tour.priceEur} | MerrySails`
    : `${tour.nameEn} | MerrySails Service Page`;
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

  const tour = getTourBySlug(slug);
  if (!tour) notFound();
  const showPricing = isPricingVisible(tour);

  const related = tours
    .filter((t) => t.slug !== slug && t.category === tour.category)
    .slice(0, 4);

  const canonicalUrl = `${SITE_URL}/${locale}/cruises/${slug}`;

  // JSON-LD TouristTrip + Product schema
  const tourSchema = {
    "@context": "https://schema.org",
    "@type": ["TouristTrip", "Product"],
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
            <span className="text-[var(--heading)] truncate">{tour.nameEn}</span>
          </nav>

          <TourDetailClient
            tour={tour}
            related={related}
            bookingPrefill={await resolveBookingPrefill(resolvedSearchParams)}
          />
        </div>
      </div>
    </>
  );
}
