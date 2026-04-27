import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/constants";
import { isActiveLocale, type SiteLocale } from "@/i18n/config";

export const revalidate = 3600;

const TRANSLATIONS: Record<string, {
  title: string;
  description: string;
  canonicalPath: string;
}> = {
  tr: {
    title: "Boğaz Turu İstanbul 2026 | Gün Batımı ve Akşam Yemeği Turları | MerrySails",
    description:
      "İstanbul Boğaz turu seçeneklerini karşılaştırın: €34 gün batımı turu, €30 akşam yemeği turu ve €280 özel yat kiralama. TÜRSAB lisanslı, doğrudan rezervasyon.",
    canonicalPath: "/tr/bosphorus-cruise",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();

  const t = TRANSLATIONS[locale];
  if (!t) notFound();

  const canonicalUrl = `${SITE_URL}${t.canonicalPath}`;

  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "x-default": `${SITE_URL}/bosphorus-cruise`,
        en: `${SITE_URL}/bosphorus-cruise`,
        [locale]: canonicalUrl,
      },
    },
    openGraph: {
      title: t.title,
      description: t.description,
      url: canonicalUrl,
      type: "website",
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Boğaz Turu İstanbul — MerrySails" }],
    },
  };
}

const tourOptions = [
  {
    slug: "gunbatimi",
    href: "/tr/cruises/bosphorus-sunset-cruise",
    title: "Boğaz Gün Batımı Turu",
    price: "€34",
    duration: "2 saat",
    tag: "En çok tercih edilen",
    desc: "İki seçenek: Şarapsız €34, Şaraplı €40. Altın saat manzarası, canlı rehber ve hafif ikramlar dahil.",
  },
  {
    slug: "aksam",
    href: "/tr/istanbul-dinner-cruise",
    title: "İstanbul Akşam Yemeği Turu",
    price: "€30",
    duration: "3,5 saat",
    tag: "4 paket seçeneği",
    desc: "€30'dan €90'a kadar 4 paket. Türk gecesi eğlencesi, akşam yemeği ve otel transfer desteği.",
  },
  {
    slug: "yat",
    href: "/tr/yacht-charter-istanbul",
    title: "Özel Yat Kiralama",
    price: "€280",
    duration: "2+ saat",
    tag: "Tam özel",
    desc: "Tüm tekne size özel. Evlilik teklifi, doğum günü ve kurumsal etkinlikler için idealdir.",
  },
  {
    slug: "tekne",
    href: "/tr/boat-rental-istanbul",
    title: "Tekne Kiralama",
    price: "Saatlik",
    duration: "Esnek",
    tag: "Önce tekne seçin",
    desc: "Tekne ve güzergahı önce belirleyin, akşam yemeği veya gün batımı ekstralarını sonra ekleyin.",
  },
];

export default async function LocaleBosphorusCruisePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();

  const t = TRANSLATIONS[locale];
  if (!t) notFound();

  const canonicalUrl = `${SITE_URL}${t.canonicalPath}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Boğaz Turu", item: canonicalUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="pt-28 pb-20 bg-[var(--surface-alt)]">
        <div className="container-main">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
            <Link href={`/${locale}`} className="hover:text-[var(--brand-primary)]">Ana Sayfa</Link>
            <span>/</span>
            <span className="text-[var(--heading)]">Boğaz Turu</span>
          </nav>

          <div className="mb-10">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
              MerrySails İstanbul
            </p>
            <h1 className="mb-4 text-4xl font-bold text-[var(--heading)] md:text-5xl">
              Boğaz Turu İstanbul
            </h1>
            <p className="max-w-2xl text-lg text-[var(--text-muted)]">
              İstanbul Boğazı'nda tekne turunu doğru seçin. Üç ana seçenek: gün batımı turu, akşam
              yemeği turu ve özel yat kiralama. Fiyatları ve kapsamları karşılaştırın, sonra
              rezervasyon yapın.
            </p>
            <p className="mt-3 text-sm text-[var(--text-muted)]">
              <strong>TÜRSAB A Grubu lisanslı</strong> · 2001'den bu yana · 50.000+ misafir
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {tourOptions.map((opt) => (
              <Link
                key={opt.slug}
                href={opt.href}
                className="group rounded-2xl border border-[var(--line)] bg-white p-6 transition-all hover:border-[var(--brand-primary)]/40 hover:shadow-md"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="inline-block rounded-full bg-[var(--brand-primary)]/10 px-3 py-0.5 text-xs font-semibold text-[var(--brand-primary)] mb-2">
                      {opt.tag}
                    </span>
                    <h2 className="text-xl font-bold text-[var(--heading)] group-hover:text-[var(--brand-primary)]">
                      {opt.title}
                    </h2>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[var(--brand-primary)]">{opt.price}</p>
                    <p className="text-xs text-[var(--text-muted)]">{opt.duration}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">{opt.desc}</p>
                <p className="mt-4 text-sm font-semibold text-[var(--brand-primary)]">
                  Detaylar ve rezervasyon →
                </p>
              </Link>
            ))}
          </div>

          <section className="mt-12 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">
              Boğaz Turu Seçerken Nelere Dikkat Edilmeli?
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Süre ve bütçe",
                  desc: "2 saatlik hafif deneyim için gün batımı turu (€34), tam akşam programı için yemekli tur (€30–€90), tam özel için yat kiralama (€280+).",
                },
                {
                  title: "Özel mi, paylaşımlı mı?",
                  desc: "Gün batımı ve akşam yemeği turları paylaşımlı teknelerdir. Evlilik teklifi, kutlama veya grup etkinliği için özel yat kiralama tercih edin.",
                },
                {
                  title: "Rezervasyon zamanlaması",
                  desc: "Yaz sezonunda (Mayıs–Eylül) popüler tarihler çabuk dolar. En az 3–5 gün öncesinden rezervasyon yapmanız önerilir.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
                  <h3 className="font-semibold text-[var(--heading)] mb-2">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-8 flex justify-end">
            <Link href="/bosphorus-cruise" className="text-sm text-[var(--text-muted)] hover:text-[var(--brand-primary)]">
              View in English →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
