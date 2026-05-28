import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FleetDetailContent from "@/components/yacht/FleetDetailContent";
import { getFleetDetailStrings } from "@/components/yacht/fleet-detail-strings";
import {
  getCharterFleet,
  getCharterFleetItem,
  getCharterFleetLocale,
  type CharterFleetSlug,
} from "@/data/fleet";
import { SITE_URL } from "@/lib/constants";
import { ACTIVE_LOCALES, isActiveLocale, type SiteLocale } from "@/i18n/config";
import { buildHreflang } from "@/lib/hreflang";

export const revalidate = 3600;

export function generateStaticParams() {
  const fleet = getCharterFleet();
  const params: { locale: string; fleet: string }[] = [];
  for (const locale of ACTIVE_LOCALES) {
    if (locale === "en") continue;
    for (const boat of fleet) {
      params.push({ locale, fleet: boat.slug });
    }
  }
  return params;
}

const VALID_SLUGS: CharterFleetSlug[] = ["boutique-yacht-12", "premium-yacht-14", "group-yacht-40-standard", "group-yacht-40-signature", "event-yacht-90", "mega-event-yacht-150"];
function isValidSlug(s: string): s is CharterFleetSlug {
  return (VALID_SLUGS as string[]).includes(s);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; fleet: string }>;
}): Promise<Metadata> {
  const { locale, fleet } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();
  if (!isValidSlug(fleet)) notFound();
  const boat = getCharterFleetItem(fleet);
  if (!boat) notFound();
  const t = getCharterFleetLocale(boat, locale as SiteLocale);
  const entryPrice = boat.priceByHours?.[boat.minHours] ?? null;
  const canonicalUrl = `${SITE_URL}/${locale}/yacht-charter-istanbul/${fleet}`;
  const title = entryPrice
    ? `${t.label} — €${entryPrice} / 2h`
    : t.label;
  const description = `${t.label} — ${t.tagline}. ${t.description.slice(0, 130)}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: buildHreflang(`/yacht-charter-istanbul/${fleet}`),
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      images: [
        { url: boat.coverImage, width: 1600, height: 1200, alt: `${t.label} — ${boat.altDescriptor}` },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [boat.coverImage],
    },
  };
}

export default async function LocaleFleetDetailPage({
  params,
}: {
  params: Promise<{ locale: string; fleet: string }>;
}) {
  const { locale, fleet } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();
  if (!isValidSlug(fleet)) notFound();
  const boat = getCharterFleetItem(fleet);
  if (!boat) notFound();
  const t = getCharterFleetLocale(boat, locale as SiteLocale);
  const strings = getFleetDetailStrings(locale as SiteLocale);
  const canonicalUrl = `${SITE_URL}/${locale}/yacht-charter-istanbul/${fleet}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": ["TouristTrip", "Service"],
    inLanguage: locale,
    name: t.label,
    description: t.description,
    serviceType: "Private Yacht Charter",
    url: canonicalUrl,
    image: boat.exteriorImages,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "City", name: "Istanbul" },
    audience: {
      "@type": "QuantitativeValue",
      minValue: boat.capacity.min,
      maxValue: boat.capacity.max,
      unitText: "guests",
    },
    ...(boat.priceByHours
      ? {
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "EUR",
            lowPrice: boat.priceByHours[boat.minHours],
            highPrice: boat.priceByHours[8],
            offerCount: Object.keys(boat.priceByHours).length,
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: strings.breadcrumbHome, item: `${SITE_URL}/${locale}` },
      {
        "@type": "ListItem",
        position: 2,
        name: strings.breadcrumbCharter,
        item: `${SITE_URL}/${locale}/yacht-charter-istanbul`,
      },
      { "@type": "ListItem", position: 3, name: t.label, item: canonicalUrl },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: strings.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FleetDetailContent
        boat={boat}
        locale={locale as SiteLocale}
        strings={strings}
        reservationBasePath={`/${locale}/reservation`}
        yachtTourSlug="yacht-charter-in-istanbul"
        homeHref={`/${locale}`}
        charterHref={`/${locale}/yacht-charter-istanbul`}
      />
    </>
  );
}
