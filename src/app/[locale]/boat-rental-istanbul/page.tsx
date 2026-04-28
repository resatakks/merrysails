import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fleet } from "@/data/fleet";
import { SITE_URL, WHATSAPP_URL } from "@/lib/constants";
import { ACTIVE_LOCALES, isActiveLocale, type SiteLocale } from "@/i18n/config";
import { buildHreflang } from "@/lib/hreflang";

export const revalidate = 3600;

const startingRate = Math.min(...fleet.map((b) => b.pricePerHour));

type LocaleContent = {
  title: string;
  description: string;
  canonicalPath: string;
  eyebrow: string;
  heroTitle: string;
  heroDescription: string;
  fleetHeading: string;
  priceUnit: string;
  capacityLabel: string;
  lengthSeparator: string;
  howItWorksBox: { heading: string; body: string };
  extrasHeading: string;
  extras: string[];
  ctaWhatsapp: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  viewInEnglish: string;
};

const TRANSLATIONS: Record<string, LocaleContent> = {
  tr: {
    title: `Tekne Kiralama İstanbul 2026 | Saatlik €${startingRate}'dan | MerrySails`,
    description: `İstanbul'da tekne kiralama saatlik €${startingRate}'dan başlıyor. Boğaz'da özel tekne turu, yemek ve gün batımı ekstraları dahil edilebilir. Hemen teklif alın.`,
    canonicalPath: "/tr/boat-rental-istanbul",
    eyebrow: "MerrySails İstanbul",
    heroTitle: "Tekne Kiralama İstanbul",
    heroDescription:
      `Saatlik €${startingRate}'dan başlayan özel tekne kiralama. Önce tekneyi ve güzergahı seçin; akşam yemeği, gün batımı zamanlaması veya kutlama ekstralarını sonra ekleyin. 2001'den bu yana TÜRSAB A Grubu lisanslı, 50.000'den fazla misafire hizmet vermiş bir filo ile çalışırsınız.`,
    fleetHeading: "Filo Seçenekleri",
    priceUnit: "/saat",
    capacityLabel: "kişi kapasite",
    lengthSeparator: " · ",
    howItWorksBox: {
      heading: "Nasıl çalışır?",
      body: "Tekneyi seçin → tarih ve süreyi belirtin → WhatsApp veya telefon ile teklif alın. Marina ve nihai fiyat seçilen tekneye, tarihe ve eklenen hizmetlere göre onaylanır.",
    },
    extrasHeading: "Teklife Özel Ekstralar",
    extras: [
      "Akşam yemeği (kişi başı menü seçeneğiyle)",
      "Gün batımı zamanlaması",
      "Evlilik teklifi dekorasyonu",
      "Profesyonel fotoğrafçı",
      "Doğum günü / yıl dönümü pastası",
      "Canlı müzik veya DJ",
      "Alkol paketi",
      "Gece turu (şehir ışıkları)",
    ],
    ctaWhatsapp: "WhatsApp ile Teklif Al",
    breadcrumbHome: "Ana Sayfa",
    breadcrumbCurrent: "Tekne Kiralama İstanbul",
    viewInEnglish: "View in English →",
  },
  de: {
    title: `Bootsverleih Istanbul 2026 | Ab €${startingRate}/Stunde | MerrySails`,
    description: `Bootsverleih Istanbul ab €${startingRate} pro Stunde. Privates Boot auf dem Bosporus mieten, Dinner und Sonnenuntergang optional hinzubuchen. Direkt Angebot anfragen.`,
    canonicalPath: "/de/boat-rental-istanbul",
    eyebrow: "MerrySails Istanbul",
    heroTitle: "Bootsverleih Istanbul",
    heroDescription:
      `Privater Bootsverleih auf dem Bosporus ab €${startingRate} pro Stunde. Wählen Sie zuerst das Boot und die Route, danach ergänzen Sie optional Dinner, Sonnenuntergang oder Anlass-Extras. Sie buchen bei Merry Tourism, seit 2001 TÜRSAB-A-lizenziert und mit über 50.000 begrüßten Gästen.`,
    fleetHeading: "Flotte zur Auswahl",
    priceUnit: "/Stunde",
    capacityLabel: "Personen Kapazität",
    lengthSeparator: " · ",
    howItWorksBox: {
      heading: "So funktioniert es",
      body: "Boot auswählen → Datum und Dauer angeben → Angebot per WhatsApp oder Telefon erhalten. Anlegestelle und Endpreis werden je nach Boot, Termin und Zusatzleistungen bestätigt.",
    },
    extrasHeading: "Optionale Zusatzleistungen",
    extras: [
      "Dinner an Bord (mit Menüauswahl pro Person)",
      "Zeitplanung zum Sonnenuntergang",
      "Heiratsantrag-Dekoration",
      "Professioneller Fotograf",
      "Geburtstags- oder Jubiläumstorte",
      "Live-Musik oder DJ",
      "Getränkepaket inkl. Alkohol",
      "Nachttour mit Stadtbeleuchtung",
    ],
    ctaWhatsapp: "Angebot per WhatsApp anfragen",
    breadcrumbHome: "Startseite",
    breadcrumbCurrent: "Bootsverleih Istanbul",
    viewInEnglish: "View in English →",
  },
  fr: {
    title: `Location Bateau Istanbul 2026 | À partir de €${startingRate}/h | MerrySails`,
    description: `Location de bateau à Istanbul à partir de €${startingRate}/heure. Promenade en bateau privée sur le Bosphore, options dîner et coucher de soleil disponibles. Demandez un devis.`,
    canonicalPath: "/fr/boat-rental-istanbul",
    eyebrow: "MerrySails Istanbul",
    heroTitle: "Location de Bateau Istanbul",
    heroDescription:
      `Location de bateau privée sur le Bosphore à partir de €${startingRate} par heure. Choisissez d'abord le bateau et l'itinéraire, puis ajoutez le dîner, la programmation au coucher du soleil ou des options pour vos célébrations. Vous réservez auprès de Merry Tourism, licencié TÜRSAB Groupe A depuis 2001 avec plus de 50 000 voyageurs accueillis.`,
    fleetHeading: "Options de la flotte",
    priceUnit: "/heure",
    capacityLabel: "personnes de capacité",
    lengthSeparator: " · ",
    howItWorksBox: {
      heading: "Comment ça marche",
      body: "Choisissez le bateau → indiquez la date et la durée → recevez un devis par WhatsApp ou téléphone. Le port de départ et le tarif final sont confirmés selon le bateau, la date et les services ajoutés.",
    },
    extrasHeading: "Options en supplément",
    extras: [
      "Dîner à bord (avec choix de menu par personne)",
      "Programmation au coucher du soleil",
      "Décoration pour demande en mariage",
      "Photographe professionnel",
      "Gâteau d'anniversaire ou de mariage",
      "Musique live ou DJ",
      "Forfait boissons alcoolisées",
      "Tour nocturne avec lumières de la ville",
    ],
    ctaWhatsapp: "Demander un devis sur WhatsApp",
    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "Location de Bateau Istanbul",
    viewInEnglish: "View in English →",
  },
  nl: {
    title: `Boothuur Istanbul 2026 | Vanaf €${startingRate}/uur | MerrySails`,
    description: `Boothuur Istanbul vanaf €${startingRate} per uur. Privéboottocht op de Bosporus, diner en zonsondergang optioneel toe te voegen. Vraag direct een offerte aan.`,
    canonicalPath: "/nl/boat-rental-istanbul",
    eyebrow: "MerrySails Istanbul",
    heroTitle: "Boothuur Istanbul",
    heroDescription:
      `Privéboothuur op de Bosporus vanaf €${startingRate} per uur. Kies eerst de boot en de route en voeg daarna optioneel diner, zonsondergangtiming of feestelijke extra's toe. U boekt bij Merry Tourism, sinds 2001 TÜRSAB A-gelicenseerd met meer dan 50.000 verwelkomde gasten.`,
    fleetHeading: "Vlootopties",
    priceUnit: "/uur",
    capacityLabel: "personen capaciteit",
    lengthSeparator: " · ",
    howItWorksBox: {
      heading: "Hoe het werkt",
      body: "Kies de boot → geef datum en duur op → ontvang een offerte via WhatsApp of telefoon. De jachthaven en de einduprijs worden bevestigd op basis van de gekozen boot, datum en extra's.",
    },
    extrasHeading: "Optionele extra's",
    extras: [
      "Diner aan boord (met menukeuze per persoon)",
      "Timing rond de zonsondergang",
      "Decoratie huwelijksaanzoek",
      "Professionele fotograaf",
      "Verjaardags- of jubileumtaart",
      "Live muziek of dj",
      "Drankenpakket inclusief alcohol",
      "Avondtocht met stadslichten",
    ],
    ctaWhatsapp: "Offerte aanvragen via WhatsApp",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Boothuur Istanbul",
    viewInEnglish: "View in English →",
  },
};

export function generateStaticParams() {
  return ACTIVE_LOCALES.filter((l) => l !== "en").map((locale) => ({ locale }));
}

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
      languages: buildHreflang("/boat-rental-istanbul"),
    },
    openGraph: {
      title: t.title,
      description: t.description,
      url: canonicalUrl,
      type: "website",
      images: [
        {
          url: `${SITE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: t.heroTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
      images: [`${SITE_URL}/og-image.jpg`],
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
      { "@type": "ListItem", position: 1, name: t.breadcrumbHome, item: SITE_URL },
      { "@type": "ListItem", position: 2, name: t.breadcrumbCurrent, item: canonicalUrl },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t.heroTitle,
    description: t.description,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "City", name: "Istanbul" },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: startingRate,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
    url: canonicalUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div className="pt-28 pb-20 bg-[var(--surface-alt)]">
        <div className="container-main">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6"
          >
            <Link href={`/${locale}`} className="hover:text-[var(--brand-primary)]">
              {t.breadcrumbHome}
            </Link>
            <span>/</span>
            <span className="text-[var(--heading)]">{t.breadcrumbCurrent}</span>
          </nav>

          <div className="mb-10">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
              {t.eyebrow}
            </p>
            <h1 className="mb-4 text-4xl font-bold text-[var(--heading)] md:text-5xl">
              {t.heroTitle}
            </h1>
            <p className="max-w-2xl text-lg text-[var(--text-muted)]">
              {t.heroDescription}
            </p>
          </div>

          <section className="rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-6">
              {t.fleetHeading}
            </h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {fleet.slice(0, 6).map((boat) => (
                <div
                  key={boat.id}
                  className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4"
                >
                  <h3 className="font-semibold text-[var(--heading)] mb-1">{boat.name}</h3>
                  <p className="text-xl font-bold text-[var(--brand-primary)] mb-1">
                    €{boat.pricePerHour}
                    <span className="text-sm font-normal text-[var(--text-muted)]">
                      {t.priceUnit}
                    </span>
                  </p>
                  <p className="text-sm text-[var(--text-muted)]">
                    {boat.capacity} {t.capacityLabel}
                    {boat.length ? `${t.lengthSeparator}${boat.length}` : ""}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/20 p-4">
              <p className="text-sm text-[var(--text-muted)]">
                <strong className="text-[var(--heading)]">{t.howItWorksBox.heading}</strong>{" "}
                {t.howItWorksBox.body}
              </p>
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-xl font-bold text-[var(--heading)] mb-4">
              {t.extrasHeading}
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              {t.extras.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm text-[var(--text-muted)]"
                >
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
                {t.ctaWhatsapp}
              </a>
            </div>
          </section>

          <div className="mt-8 flex justify-end">
            <Link
              href="/boat-rental-istanbul"
              className="text-sm text-[var(--text-muted)] hover:text-[var(--brand-primary)]"
            >
              {t.viewInEnglish}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
