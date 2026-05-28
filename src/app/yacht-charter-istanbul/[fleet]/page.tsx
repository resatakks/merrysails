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
import { buildHreflang } from "@/lib/hreflang";

export const revalidate = 3600;

export function generateStaticParams() {
  return getCharterFleet().map((boat) => ({ fleet: boat.slug }));
}

const VALID_SLUGS: CharterFleetSlug[] = ["boutique-yacht-12",
"premium-yacht-15", "group-yacht-40-standard", "group-yacht-40-signature", "event-yacht-90", "mega-event-yacht-150"];
function isValidSlug(s: string): s is CharterFleetSlug {
  return (VALID_SLUGS as string[]).includes(s);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ fleet: string }>;
}): Promise<Metadata> {
  const { fleet } = await params;
  if (!isValidSlug(fleet)) notFound();
  const boat = getCharterFleetItem(fleet);
  if (!boat) notFound();
  const en = getCharterFleetLocale(boat, "en");
  const entryPrice = boat.priceByHours?.[boat.minHours] ?? null;
  const canonicalUrl = `${SITE_URL}/yacht-charter-istanbul/${fleet}`;
  const titleSuffix = entryPrice
    ? `From €${entryPrice} for 2h`
    : "Quote on request";
  const title = `${en.label} — ${titleSuffix}`;
  const description = `${en.label} on the Bosphorus — ${en.tagline}. Capacity ${boat.capacity.min}-${boat.capacity.max} guests. ${entryPrice ? `From €${entryPrice} for a 2-hour private charter.` : "Booked by quote based on event brief."} Captain and crew included. TÜRSAB-A licensed since 2001.`;

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
        {
          url: boat.coverImage,
          width: 1600,
          height: 1200,
          alt: `${en.label} — ${boat.altDescriptor}`,
        },
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

export default async function FleetDetailPage({
  params,
}: {
  params: Promise<{ fleet: string }>;
}) {
  const { fleet } = await params;
  if (!isValidSlug(fleet)) notFound();
  const boat = getCharterFleetItem(fleet);
  if (!boat) notFound();
  const en = getCharterFleetLocale(boat, "en");
  const entryPrice = boat.priceByHours?.[boat.minHours] ?? null;
  const canonicalUrl = `${SITE_URL}/yacht-charter-istanbul/${fleet}`;
  const strings = getFleetDetailStrings("en");

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": ["TouristTrip", "Service"],
    name: en.label,
    description: en.description,
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

  const productSchema = boat.priceByHours
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        "@id": `${canonicalUrl}#product`,
        name: en.label,
        description: en.description,
        image: boat.exteriorImages,
        brand: { "@type": "Brand", name: "MerrySails" },
        category: "Private Yacht Charter",
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "EUR",
          lowPrice: boat.priceByHours[boat.minHours],
          highPrice: boat.priceByHours[8],
          offerCount: Object.keys(boat.priceByHours).length,
          availability: "https://schema.org/InStock",
          seller: { "@id": `${SITE_URL}/#organization` },
        },
      }
    : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: strings.breadcrumbHome, item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: strings.breadcrumbCharter,
        item: `${SITE_URL}/yacht-charter-istanbul`,
      },
      { "@type": "ListItem", position: 3, name: en.label, item: canonicalUrl },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
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
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
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
        locale="en"
        strings={strings}
        reservationBasePath="/reservation"
        yachtTourSlug="yacht-charter-in-istanbul"
        homeHref="/"
        charterHref="/yacht-charter-istanbul"
      />
    </>
  );
}
