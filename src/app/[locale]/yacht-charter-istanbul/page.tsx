import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import TourDetailClient from "@/components/tours/TourDetailClient";
import { getTourBySlug, type Tour } from "@/data/tours";
import { SITE_URL, WHATSAPP_URL, PHONE_DISPLAY } from "@/lib/constants";
import { isActiveLocale, type SiteLocale } from "@/i18n/config";

export const revalidate = 3600;

const yachtTour = getTourBySlug("yacht-charter-in-istanbul");
if (!yachtTour) throw new Error("Yacht charter data is missing.");

const relatedTours: Tour[] = [
  getTourBySlug("bosphorus-sunset-cruise"),
  getTourBySlug("bosphorus-dinner-cruise"),
  getTourBySlug("private-bosphorus-sunset-cruise"),
].filter((t): t is Tour => Boolean(t));

const TRANSLATIONS: Record<string, {
  title: string;
  description: string;
  canonicalPath: string;
}> = {
  tr: {
    title: "İstanbul Yat Kiralama 2026 | Özel Boğaz Yat Turu | MerrySails",
    description:
      "İstanbul'da özel yat kiralama €280'den başlıyor. Tüm tekne size özel, Boğaz güzergahı, kaptanlı ve yemek seçeneğiyle. Evlilik teklifi, doğum günü ve kurumsal etkinlikler.",
    canonicalPath: "/tr/yacht-charter-istanbul",
  },
  de: {
    title: "Yachtcharter Istanbul 2026 | Private Jacht Bosporus | MerrySails",
    description:
      "Yachtcharter Istanbul ab €280. Exklusive Privatjacht auf dem Bosporus mit Kapitän. Ideal für Heiratsantrag, Geburtstag und Firmenevents. TÜRSAB-lizenziert.",
    canonicalPath: "/de/yacht-charter-istanbul",
  },
  fr: {
    title: "Location Yacht Istanbul 2026 | Yacht Privé Bosphore | MerrySails",
    description:
      "Location yacht Istanbul à partir de €280. Yacht privé exclusif sur le Bosphore avec capitaine. Demande en mariage, anniversaire, événements d'entreprise. Certifié TÜRSAB.",
    canonicalPath: "/fr/yacht-charter-istanbul",
  },
  nl: {
    title: "Jachthuur Istanbul 2026 | Privé Jacht Bosporus | MerrySails",
    description:
      "Jachthuur Istanbul vanaf €280. Exclusief privéjacht op de Bosporus met kapitein. Huwelijksaanzoek, verjaardag en bedrijfsevenementen. TÜRSAB-gecertificeerd.",
    canonicalPath: "/nl/yacht-charter-istanbul",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();
  if (!yachtTour) notFound();

  const t = TRANSLATIONS[locale];
  if (!t) notFound();

  const canonicalUrl = `${SITE_URL}${t.canonicalPath}`;

  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "x-default": `${SITE_URL}/yacht-charter-istanbul`,
        en: `${SITE_URL}/yacht-charter-istanbul`,
        [locale]: canonicalUrl,
      },
    },
    openGraph: {
      title: t.title,
      description: t.description,
      url: canonicalUrl,
      type: "website",
      images: [{ url: yachtTour.image, width: 1200, height: 630, alt: "İstanbul Yat Kiralama — MerrySails" }],
    },
  };
}

export default async function LocaleYachtCharterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();
  if (!yachtTour) notFound();

  const t = TRANSLATIONS[locale];
  if (!t) notFound();

  const canonicalUrl = `${SITE_URL}${t.canonicalPath}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": ["TouristTrip", "Product"],
    name: "İstanbul Yat Kiralama",
    alternateName: ["Özel Yat Turu İstanbul", "Boğaz Özel Yat", "Istanbul Yacht Charter"],
    description: yachtTour.description,
    url: canonicalUrl,
    image: yachtTour.image,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "City", name: "İstanbul" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: yachtTour.rating,
      reviewCount: yachtTour.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: Math.min(...(yachtTour.packages?.map((p) => p.price) ?? [yachtTour.priceEur])),
      highPrice: Math.max(...(yachtTour.packages?.map((p) => p.price) ?? [yachtTour.priceEur])),
      priceCurrency: "EUR",
      offerCount: yachtTour.packages?.length ?? 1,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <div className="pt-28 pb-20 bg-[var(--surface-alt)]">
        <div className="container-main">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
            <Link href={`/${locale}`} className="hover:text-[var(--brand-primary)]">Ana Sayfa</Link>
            <span>/</span>
            <Link href={`/${locale}/bosphorus-cruise`} className="hover:text-[var(--brand-primary)]">Boğaz Turu</Link>
            <span>/</span>
            <span className="text-[var(--heading)]">Yat Kiralama</span>
          </nav>

          <TourDetailClient tour={yachtTour} related={relatedTours} />

          <section className="mt-12 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">
              İstanbul Özel Yat Kiralama Neden Tercih Edilir?
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Tüm tekne size özel",
                  desc: "Paylaşımlı turların aksine, yat tamamıyla grubunuza ayrılır. Güzergah, zamanlama ve içeriği özelleştirebilirsiniz.",
                },
                {
                  title: "Özel etkinlikler için ideal",
                  desc: "Evlilik teklifi, doğum günü, yıl dönümü ve kurumsal etkinlikler için en uygun seçenek. Çiçek, pasta ve fotoğrafçı eklenebilir.",
                },
                {
                  title: "Net paket yapısı",
                  desc: "Essential €280, Premium €380 ve VIP €680 olmak üzere üç net paket. Fiyatlar 2 saatlik tur içindir, uzatma seçeneği mevcuttur.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
                  <h3 className="font-semibold text-[var(--heading)] mb-2">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                WhatsApp ile Bilgi Al
              </a>
              <a href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`} className="btn-secondary">
                {PHONE_DISPLAY}
              </a>
            </div>
          </section>

          <div className="mt-8 flex justify-end">
            <Link href="/yacht-charter-istanbul" className="text-sm text-[var(--text-muted)] hover:text-[var(--brand-primary)]">
              View in English →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
