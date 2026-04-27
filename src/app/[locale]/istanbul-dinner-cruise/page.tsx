import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import TourDetailClient from "@/components/tours/TourDetailClient";
import { getTourBySlug, type Tour } from "@/data/tours";
import { SITE_URL } from "@/lib/constants";
import { isActiveLocale, type SiteLocale } from "@/i18n/config";

export const revalidate = 3600;

const dinnerTour = getTourBySlug("bosphorus-dinner-cruise");
if (!dinnerTour) throw new Error("Dinner cruise data is missing.");

const relatedTours: Tour[] = [
  getTourBySlug("bosphorus-sunset-cruise"),
  getTourBySlug("yacht-charter-in-istanbul"),
  getTourBySlug("private-bosphorus-dinner-yacht-cruise"),
].filter((t): t is Tour => Boolean(t));

const TRANSLATIONS: Record<string, {
  title: string;
  description: string;
  h1: string;
  breadcrumb: string;
  canonicalPath: string;
}> = {
  tr: {
    title: "İstanbul Akşam Yemeği Turu | Boğaz Yemekli Gece Turu | MerrySails",
    description:
      "İstanbul'da Boğaz akşam yemeği turu paketleri €30'dan başlıyor. Türk gecesi eğlencesi, otel transfer desteği ve 4 farklı paket seçeneği. Hemen rezervasyon yapın.",
    h1: "İstanbul Akşam Yemeği Turu",
    breadcrumb: "Akşam Yemeği Turu",
    canonicalPath: "/tr/istanbul-dinner-cruise",
  },
  de: {
    title: "Istanbul Dinner Cruise | Bosporus Dinner Kreuzfahrt | MerrySails",
    description:
      "Bosporus Dinner Cruise Istanbul ab €30. Türkische Abendunterhaltung, 4 Pakete bis €90, Hoteltransfer möglich. TÜRSAB-lizenziert seit 2001. Jetzt buchen.",
    h1: "Istanbul Dinner Cruise",
    breadcrumb: "Dinner Cruise",
    canonicalPath: "/de/istanbul-dinner-cruise",
  },
  fr: {
    title: "Croisière Dîner Istanbul | Croisière Bosphore Dîner | MerrySails",
    description:
      "Croisière dîner sur le Bosphore à Istanbul à partir de €30. 4 formules jusqu'à €90, spectacle de nuit turque, transfert hôtel disponible. Réservez maintenant.",
    h1: "Croisière Dîner Istanbul",
    breadcrumb: "Croisière Dîner",
    canonicalPath: "/fr/istanbul-dinner-cruise",
  },
  nl: {
    title: "Istanbul Dinner Cruise | Bosporus Diner Cruise | MerrySails",
    description:
      "Bosporus diner cruise Istanbul vanaf €30. Turkse avondshow, 4 pakketten tot €90, hotelophaal mogelijk. Boek direct bij TÜRSAB-gecertificeerd bedrijf.",
    h1: "Istanbul Dinner Cruise",
    breadcrumb: "Dinner Cruise",
    canonicalPath: "/nl/istanbul-dinner-cruise",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();
  if (!dinnerTour) notFound();

  const t = TRANSLATIONS[locale];
  if (!t) notFound();

  const canonicalUrl = `${SITE_URL}${t.canonicalPath}`;

  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "x-default": `${SITE_URL}/istanbul-dinner-cruise`,
        en: `${SITE_URL}/istanbul-dinner-cruise`,
        [locale]: canonicalUrl,
      },
    },
    openGraph: {
      title: t.title,
      description: t.description,
      url: canonicalUrl,
      type: "website",
      images: [{ url: dinnerTour.image, width: 1200, height: 630, alt: t.h1 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
      images: [dinnerTour.image],
    },
  };
}

export default async function LocaleDinnerCruisePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();
  if (!dinnerTour) notFound();

  const t = TRANSLATIONS[locale];
  if (!t) notFound();

  const canonicalUrl = `${SITE_URL}${t.canonicalPath}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": ["TouristTrip", "Product"],
    name: dinnerTour.name ?? dinnerTour.nameEn,
    alternateName: ["İstanbul Akşam Yemeği Turu", "Boğaz Yemekli Gece Turu", "Boğaz Dinner Cruise"],
    description: dinnerTour.description,
    touristType: "Kültür Turizmi",
    url: canonicalUrl,
    image: dinnerTour.image,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "City", name: "İstanbul" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: dinnerTour.rating,
      reviewCount: dinnerTour.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: Math.min(...(dinnerTour.packages?.map((p) => p.price) ?? [dinnerTour.priceEur])),
      highPrice: Math.max(...(dinnerTour.packages?.map((p) => p.price) ?? [dinnerTour.priceEur])),
      priceCurrency: "EUR",
      offerCount: dinnerTour.packages?.length ?? 1,
      availability: "https://schema.org/InStock",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Boğaz Turu", item: `${SITE_URL}/tr/bosphorus-cruise` },
      { "@type": "ListItem", position: 3, name: t.breadcrumb, item: canonicalUrl },
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
            <span className="text-[var(--heading)] truncate">{t.breadcrumb}</span>
          </nav>

          <TourDetailClient tour={dinnerTour} related={relatedTours} />

          {/* TR Content Block */}
          <section className="mt-12 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">
              İstanbul Boğaz Akşam Yemeği Turu Nedir?
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4 text-sm leading-relaxed text-[var(--text-muted)]">
                <p>
                  MerrySails İstanbul Akşam Yemeği Turu, Boğaz'ın en güzel manzaralarını izlerken
                  akşam yemeği ve Türk gecesi eğlencesinin bir arada sunulduğu paylaşımlı tekne
                  deneyimidir. Tur yaklaşık 3,5 saat sürer, Kabataş İskelesi'nden hareket eder ve
                  dört farklı paket seçeneği sunar: €30, €45, €80 ve €90.
                </p>
                <p>
                  <strong>2001'den bu yana TÜRSAB A Grubu lisanslı</strong> Merry Tourism tarafından
                  sunulan bu turda 50.000'den fazla misafiri ağırladık. Her paketin içeriği — koltuk
                  tipi, içecek çeşitleri ve yemek menüsü düzeyi — net olarak ayrılmıştır.
                </p>
                <p>
                  Bazı merkezi Avrupa yakası otelleri için servis transferi mevcuttur. Transfer
                  detayları rezervasyon onayından sonra yazılı olarak iletilir.
                </p>
              </div>
              <div className="overflow-hidden rounded-2xl border border-[var(--line)]">
                <table className="w-full border-collapse text-left text-sm">
                  <tbody>
                    {[
                      ["Süre", "~3,5 saat"],
                      ["Kalkış", "Kabataş (20:30)"],
                      ["En düşük fiyat", "€30 (Silver Soft Drinks)"],
                      ["En yüksek fiyat", "€90 (Gold Unlimited Alkol)"],
                      ["Paket sayısı", "4 farklı paket"],
                      ["Transfer desteği", "Uygun oteller için mevcut"],
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
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">Paket Karşılaştırması</h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  name: "Silver Soft Drinks",
                  price: "€30",
                  items: ["Standart koltuk", "Sınırsız alkolsüz içecek", "Akşam yemeği menüsü", "Türk gecesi gösterisi"],
                },
                {
                  name: "Silver Alcoholic",
                  price: "€45",
                  items: ["Standart koltuk", "Yerel alkollü içecekler", "Akşam yemeği menüsü", "Türk gecesi gösterisi"],
                },
                {
                  name: "Gold Soft Drinks",
                  price: "€80",
                  items: ["VIP sahne yakını koltuk", "Sınırsız alkolsüz içecek", "Premium yemek menüsü", "Türk gecesi + DJ"],
                },
                {
                  name: "Gold Unlimited Alkol",
                  price: "€90",
                  items: ["VIP sahne yakını koltuk", "Sınırsız alkol dahil", "Premium yemek menüsü", "Türk gecesi + DJ"],
                },
              ].map((pkg) => (
                <div key={pkg.name} className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
                  <div className="mb-3">
                    <p className="font-bold text-[var(--heading)]">{pkg.name}</p>
                    <p className="text-xl font-bold text-[var(--brand-primary)]">{pkg.price}</p>
                    <p className="text-xs text-[var(--text-muted)]">kişi başı</p>
                  </div>
                  <ul className="space-y-1">
                    {pkg.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                        <span className="mt-0.5 text-[var(--brand-primary)]">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">Sıkça Sorulan Sorular</h2>
            <div className="space-y-4">
              {[
                {
                  q: "Akşam yemeği turu ne kadar sürer?",
                  a: "Tur yaklaşık 3,5 saat sürer. Kabataş'tan saat 20:30'da hareket eder.",
                },
                {
                  q: "Otel transferi dahil mi?",
                  a: "Merkezi Avrupa yakası otellerinin büyük bölümü için servis transferi mevcuttur. Kesin transfer detayları rezervasyon onayından sonra yazılı olarak iletilir.",
                },
                {
                  q: "Paketler arasındaki fark nedir?",
                  a: "Farklar koltuk tipi (standart / VIP sahne yakını), içecek kapsamı ve yemek menüsü düzeyidir. Güzergah ve tur süresi tüm paketlerde aynıdır.",
                },
                {
                  q: "Ne zaman rezervasyon yapmalıyım?",
                  a: "Yaz sezonunda (Mayıs–Eylül) en az 3–5 gün öncesinden rezervasyon yapmanızı öneririz. Turlar çoğunlukla dolup taşmaktadır.",
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
                  href: `/${locale}/cruises/bosphorus-sunset-cruise`,
                  title: "Boğaz Gün Batımı Turu",
                  desc: "€34'ten başlayan 2 saatlik altın saat gün batımı turu.",
                },
                {
                  href: `/${locale}/yacht-charter-istanbul`,
                  title: "Özel Yat Kiralama",
                  desc: "€280'den başlayan tam özel yat deneyimi.",
                },
                {
                  href: "/istanbul-dinner-cruise",
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
