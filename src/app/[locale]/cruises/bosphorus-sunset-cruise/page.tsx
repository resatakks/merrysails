import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import TourDetailClient from "@/components/tours/TourDetailClient";
import { getTourBySlug, type Tour } from "@/data/tours";
import { SITE_URL } from "@/lib/constants";
import { isActiveLocale, type SiteLocale } from "@/i18n/config";

export const revalidate = 3600;

const sunsetTour = getTourBySlug("bosphorus-sunset-cruise");
if (!sunsetTour) throw new Error("Sunset cruise data is missing.");

const relatedTours: Tour[] = [
  getTourBySlug("bosphorus-dinner-cruise"),
  getTourBySlug("yacht-charter-in-istanbul"),
  getTourBySlug("private-bosphorus-sunset-cruise"),
].filter((t): t is Tour => Boolean(t));

const TRANSLATIONS: Record<string, {
  title: string;
  description: string;
  h1: string;
  canonicalPath: string;
}> = {
  tr: {
    title: "Boğaz Gün Batımı Turu İstanbul 2026 | Gün Batımı Teknesi | MerrySails",
    description:
      "İstanbul'da Boğaz gün batımı turu €34'ten başlıyor. 2 saatlik paylaşımlı lüks yat turu, canlı rehber, hafif ikramlar ve şarap seçeneği. Hemen rezervasyon.",
    h1: "Boğaz Gün Batımı Turu",
    canonicalPath: "/tr/cruises/bosphorus-sunset-cruise",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();
  if (!sunsetTour) notFound();

  const t = TRANSLATIONS[locale];
  if (!t) notFound();

  const canonicalUrl = `${SITE_URL}${t.canonicalPath}`;

  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "x-default": `${SITE_URL}/cruises/bosphorus-sunset-cruise`,
        en: `${SITE_URL}/cruises/bosphorus-sunset-cruise`,
        [locale]: canonicalUrl,
      },
    },
    openGraph: {
      title: t.title,
      description: t.description,
      url: canonicalUrl,
      type: "website",
      images: [{ url: sunsetTour.image, width: 1200, height: 630, alt: t.h1 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
      images: [sunsetTour.image],
    },
  };
}

export default async function LocaleSunsetCruisePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();
  if (!sunsetTour) notFound();

  const t = TRANSLATIONS[locale];
  if (!t) notFound();

  const canonicalUrl = `${SITE_URL}${t.canonicalPath}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": ["TouristTrip", "Product"],
    name: sunsetTour.name ?? sunsetTour.nameEn,
    alternateName: ["Boğaz Gün Batımı Turu", "İstanbul Gün Batımı Teknesi", "Boğaz Sunset Cruise"],
    description: sunsetTour.description,
    touristType: "Kültür Turizmi",
    url: canonicalUrl,
    image: sunsetTour.image,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "City", name: "İstanbul" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: sunsetTour.rating,
      reviewCount: sunsetTour.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: Math.min(...(sunsetTour.packages?.map((p) => p.price) ?? [sunsetTour.priceEur])),
      highPrice: Math.max(...(sunsetTour.packages?.map((p) => p.price) ?? [sunsetTour.priceEur])),
      priceCurrency: "EUR",
      offerCount: sunsetTour.packages?.length ?? 1,
      availability: "https://schema.org/InStock",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Boğaz Turu", item: `${SITE_URL}/tr/bosphorus-cruise` },
      { "@type": "ListItem", position: 3, name: "Gün Batımı Turu", item: canonicalUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="pt-28 pb-20 bg-[var(--surface-alt)]">
        <div className="container-main">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
            <Link href={`/${locale}`} className="hover:text-[var(--brand-primary)]">Ana Sayfa</Link>
            <span>/</span>
            <Link href={`/${locale}/bosphorus-cruise`} className="hover:text-[var(--brand-primary)]">Boğaz Turu</Link>
            <span>/</span>
            <span className="text-[var(--heading)] truncate">Gün Batımı Turu</span>
          </nav>

          <TourDetailClient tour={sunsetTour} related={relatedTours} />

          <section className="mt-12 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">
              Boğaz Gün Batımı Turu Hakkında
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4 text-sm leading-relaxed text-[var(--text-muted)]">
                <p>
                  MerrySails Boğaz Gün Batımı Turu, İstanbul'un en ikonik manzaralarını altın saat
                  ışığında izlemek isteyen misafirler için tasarlanmış 2 saatlik paylaşımlı lüks yat
                  deneyimidir. Tur, €34 (şarapsız) ve €40 (şaraplı) olmak üzere iki net seçenek sunar.
                </p>
                <p>
                  Güzergah boyunca Dolmabahçe Sarayı, Ortaköy Camii, Boğaz Köprüleri ve kıyı
                  kasabalarından geçilir. Canlı rehber eşliğinde, çay, Türk kahvesi, atıştırmalıklar ve
                  meyve ikramı dahildir. Şaraplı seçenekte kişi başı 2 kadeh şarap eklenir.
                </p>
                <p>
                  <strong>2001'den bu yana TÜRSAB A Grubu lisanslı</strong> Merry Tourism, 50.000'den
                  fazla misafiri ağırlamış deneyimiyle güvenilir hizmet sunmaktadır.
                </p>
              </div>
              <div className="overflow-hidden rounded-2xl border border-[var(--line)]">
                <table className="w-full border-collapse text-left text-sm">
                  <tbody>
                    {[
                      ["Süre", "~2 saat"],
                      ["Tekne tipi", "Paylaşımlı lüks yat"],
                      ["Şarapsız", "€34 / kişi"],
                      ["Şaraplı", "€40 / kişi (2 kadeh)"],
                      ["Rehber", "Canlı rehber + 12 dil sesli"],
                      ["İkramlar", "Çay, kahve, atıştırmalık, meyve"],
                    ].map(([label, value]) => (
                      <tr key={label} className="border-b border-[var(--line)] last:border-b-0">
                        <th className="w-44 bg-[var(--surface-alt)] p-3 font-semibold text-[var(--heading)] text-xs">{label}</th>
                        <td className="p-3 text-[var(--text-muted)]">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">Sıkça Sorulan Sorular</h2>
            <div className="space-y-4">
              {[
                {
                  q: "Gün batımı turu kaç saat sürer?",
                  a: "Tur yaklaşık 2 saat sürer. Güzergah Boğaz'ın güney kesimini kapsar; Dolmabahçe, Ortaköy ve köprüleri geçerek geri döner.",
                },
                {
                  q: "Şaraplı ve şarapsız seçenek arasındaki fark nedir?",
                  a: "İkisi de aynı 2 saatlik güzergahı, rehberi ve ikramları kapsar. Şaraplı seçenekte kişi başı 2 kadeh şarap eklenir; fiyat €34'ten €40'a çıkar.",
                },
                {
                  q: "Nerede başlıyor?",
                  a: "Kalkış yeri rezervasyon onayından sonra yazılı olarak bildirilir. Merkezi Avrupa yakasından hareket edilmektedir.",
                },
                {
                  q: "Akşam yemeği turu yerine gün batımı turu ne zaman tercih edilir?",
                  a: "Akşam yemeği ve Türk gecesi eğlencesi yerine daha kısa ve hafif bir deneyim isteyenler için gün batımı turu idealdir. Çiftler, fotoğraf meraklıları ve ilk kez gelenler için önerilir.",
                },
              ].map(({ q, a }) => (
                <details key={q} className="rounded-xl border border-[var(--line)] p-4">
                  <summary className="cursor-pointer font-semibold text-[var(--heading)]">{q}</summary>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">Diğer Seçenekler</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  href: `/${locale}/istanbul-dinner-cruise`,
                  title: "Akşam Yemeği Turu",
                  desc: "€30'dan başlayan 3,5 saatlik Türk gecesi yemekli turu.",
                },
                {
                  href: `/${locale}/yacht-charter-istanbul`,
                  title: "Özel Yat Kiralama",
                  desc: "€280'den başlayan tam özel yat deneyimi.",
                },
                {
                  href: "/cruises/bosphorus-sunset-cruise",
                  title: "English Page",
                  desc: "View this tour in English.",
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4 transition-colors hover:border-[var(--brand-primary)]/30 hover:bg-white"
                >
                  <h3 className="font-semibold text-[var(--heading)] mb-1">{item.title}</h3>
                  <p className="text-sm text-[var(--text-muted)]">{item.desc}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
