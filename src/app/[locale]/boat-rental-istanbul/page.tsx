import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fleet } from "@/data/fleet";
import { SITE_URL, WHATSAPP_URL } from "@/lib/constants";
import { isActiveLocale, type SiteLocale } from "@/i18n/config";

export const revalidate = 3600;

const startingRate = Math.min(...fleet.map((b) => b.pricePerHour));

const TRANSLATIONS: Record<string, {
  title: string;
  description: string;
  canonicalPath: string;
}> = {
  tr: {
    title: `Tekne Kiralama İstanbul 2026 | Saatlik €${startingRate}'dan | MerrySails`,
    description: `İstanbul'da tekne kiralama saatlik €${startingRate}'dan başlıyor. Boğaz'da özel tekne turu, yemek ve gün batımı ekstraları dahil edilebilir. Hemen teklif alın.`,
    canonicalPath: "/tr/boat-rental-istanbul",
  },
  de: {
    title: `Bootsverleih Istanbul 2026 | Ab €${startingRate}/Std | MerrySails`,
    description: `Bootsverleih Istanbul ab €${startingRate} pro Stunde. Privates Boot auf dem Bosporus mieten, Dinner und Sonnenuntergang optional hinzubuchen. Angebot anfragen.`,
    canonicalPath: "/de/boat-rental-istanbul",
  },
  fr: {
    title: `Location Bateau Istanbul 2026 | À partir de €${startingRate}/h | MerrySails`,
    description: `Location bateau Istanbul à partir de €${startingRate}/heure. Promenade privée sur le Bosphore, options dîner et coucher de soleil disponibles. Demandez un devis.`,
    canonicalPath: "/fr/boat-rental-istanbul",
  },
  nl: {
    title: `Boothuur Istanbul 2026 | Vanaf €${startingRate}/uur | MerrySails`,
    description: `Boothuur Istanbul vanaf €${startingRate} per uur. Privé vaartuig op de Bosporus, diner en zonsondergang optioneel toe te voegen. Vraag een offerte aan.`,
    canonicalPath: "/nl/boat-rental-istanbul",
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
        "x-default": `${SITE_URL}/boat-rental-istanbul`,
        en: `${SITE_URL}/boat-rental-istanbul`,
        [locale]: canonicalUrl,
      },
    },
    openGraph: {
      title: t.title,
      description: t.description,
      url: canonicalUrl,
      type: "website",
    },
  };
}

export default async function LocaleBoatRentalPage({
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
      { "@type": "ListItem", position: 2, name: "Tekne Kiralama İstanbul", item: canonicalUrl },
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
            <span className="text-[var(--heading)]">Tekne Kiralama</span>
          </nav>

          <div className="mb-10">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
              MerrySails İstanbul
            </p>
            <h1 className="mb-4 text-4xl font-bold text-[var(--heading)] md:text-5xl">
              Tekne Kiralama İstanbul
            </h1>
            <p className="max-w-2xl text-lg text-[var(--text-muted)]">
              Saatlik €{startingRate}'dan başlayan özel tekne kiralama. Tekneyi ve güzergahı önce
              belirleyin, akşam yemeği, gün batımı veya özel kutlama ekstralarını sonra ekleyin.
            </p>
          </div>

          <section className="rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-6">Filo Seçenekleri</h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {fleet.slice(0, 6).map((boat) => (
                <div key={boat.id} className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
                  <h3 className="font-semibold text-[var(--heading)] mb-1">{boat.name}</h3>
                  <p className="text-xl font-bold text-[var(--brand-primary)] mb-1">
                    €{boat.pricePerHour}<span className="text-sm font-normal text-[var(--text-muted)]">/saat</span>
                  </p>
                  <p className="text-sm text-[var(--text-muted)]">
                    {boat.capacity} kişi kapasite
                    {boat.length ? ` · ${boat.length}` : ""}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/20 p-4">
              <p className="text-sm text-[var(--text-muted)]">
                <strong className="text-[var(--heading)]">Nasıl çalışır?</strong> Tekneyi seçin →
                tarih ve süreyi belirtin → WhatsApp veya telefon ile teklif alın. Marina ve tam fiyat
                seçilen tekneye göre onaylanır.
              </p>
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-xl font-bold text-[var(--heading)] mb-4">Teklife Özel Ekstralar</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {[
                "Akşam yemeği (kişi başı menü seçeneğiyle)",
                "Gün batımı zamanlaması",
                "Evlilik teklifi dekorasyonu",
                "Profesyonel fotoğrafçı",
                "Doğum günü / yıl dönümü pastası",
                "Canlı müzik veya DJ",
                "Alkol paketi",
                "Gece turu (şehir ışıkları)",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                  <span className="text-[var(--brand-primary)]">✓</span>
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-6">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                WhatsApp ile Teklif Al
              </a>
            </div>
          </section>

          <div className="mt-8 flex justify-end">
            <Link href="/boat-rental-istanbul" className="text-sm text-[var(--text-muted)] hover:text-[var(--brand-primary)]">
              View in English →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
