import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/constants";
import { ACTIVE_LOCALES, isActiveLocale, type SiteLocale } from "@/i18n/config";
import { buildHreflang } from "@/lib/hreflang";

export const revalidate = 3600;

type LocaleContent = {
  title: string;
  description: string;
  canonicalPath: string;
  pageTitle: string;
  pageDescription: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  contactHeading: string;
  contactBody: string;
  phoneLabel: string;
  whatsappLabel: string;
  emailLabel: string;
  hoursLabel: string;
  hoursValue: string;
  addressLabel: string;
  addressValue: string;
  ctaBook: string;
  ctaWhatsapp: string;
  viewInEnglish: string;
};

const PHONE = "+90 537 040 68 22";
const PHONE_HREF = "+905370406822";
const WHATSAPP_URL = "https://wa.me/905370406822";
const EMAIL = "info@merrysails.com";
const ADDRESS = "Alemdar Mah. Divanyolu Cad. Oğul Han No:62 İç Kapı No: 402, Fatih, Istanbul";

const CONTENT: Record<string, LocaleContent> = {
  tr: {
    title: "İletişim — MerrySails | Telefon, WhatsApp ve E-posta",
    description:
      "Boğaz turu rezervasyonu için MerrySails ile iletişime geçin. +90 537 040 68 22'yi arayın, WhatsApp yazın veya info@merrysails.com'a e-posta gönderin. Her gün 09:00–22:00 açık.",
    canonicalPath: "/tr/contact",
    pageTitle: "İletişim — Boğaz Turunuzu Rezerve Edin",
    pageDescription:
      "Bizi arayın, WhatsApp yazın veya e-posta gönderin. Her gün 09:00–22:00 saatleri arasında İstanbul'da hizmetinizdeyiz.",
    breadcrumbHome: "Ana Sayfa",
    breadcrumbCurrent: "İletişim",
    contactHeading: "Bize Ulaşın",
    contactBody:
      "Tarihiniz, kişi sayınız ve istediğiniz deneyim hakkında bize yazın. Her rezervasyon talebine ekibimiz bireysel olarak yanıt verir; rezervasyon kimliğinizi ve detayları e-posta ile alırsınız.",
    phoneLabel: "Telefon",
    whatsappLabel: "WhatsApp",
    emailLabel: "E-posta",
    hoursLabel: "Çalışma Saatleri",
    hoursValue: "Her gün 09:00–22:00",
    addressLabel: "Adres",
    addressValue: ADDRESS,
    ctaBook: "WhatsApp ile Rezervasyon",
    ctaWhatsapp: "WhatsApp Yaz",
    viewInEnglish: "English →",
  },
  de: {
    title: "Kontakt — MerrySails | Telefon, WhatsApp und E-Mail",
    description:
      "Kontaktieren Sie MerrySails für Bosporus-Kreuzfahrt-Buchungen. Rufen Sie +90 537 040 68 22 an, schreiben Sie per WhatsApp oder E-Mail an info@merrysails.com. Täglich 09:00–22:00 geöffnet.",
    canonicalPath: "/de/contact",
    pageTitle: "Kontakt — Buchen Sie Ihre Bosporus-Kreuzfahrt",
    pageDescription:
      "Rufen Sie uns an, schreiben Sie per WhatsApp oder senden Sie eine E-Mail. Täglich von 09:00 bis 22:00 Uhr in Istanbul für Sie da.",
    breadcrumbHome: "Startseite",
    breadcrumbCurrent: "Kontakt",
    contactHeading: "Nehmen Sie Kontakt auf",
    contactBody:
      "Schreiben Sie uns Ihr Datum, die Anzahl der Gäste und das gewünschte Erlebnis. Unser Team antwortet persönlich auf jede Buchungsanfrage; Sie erhalten Ihre Buchungs-ID und alle Details per E-Mail.",
    phoneLabel: "Telefon",
    whatsappLabel: "WhatsApp",
    emailLabel: "E-Mail",
    hoursLabel: "Öffnungszeiten",
    hoursValue: "Täglich 09:00–22:00",
    addressLabel: "Adresse",
    addressValue: ADDRESS,
    ctaBook: "Per WhatsApp buchen",
    ctaWhatsapp: "WhatsApp schreiben",
    viewInEnglish: "English →",
  },
  fr: {
    title: "Contact — MerrySails | Téléphone, WhatsApp et E-mail",
    description:
      "Contactez MerrySails pour réserver une croisière Bosphore. Appelez le +90 537 040 68 22, écrivez sur WhatsApp ou envoyez un e-mail à info@merrysails.com. Ouvert tous les jours 09h00–22h00.",
    canonicalPath: "/fr/contact",
    pageTitle: "Contact — Réservez votre croisière Bosphore",
    pageDescription:
      "Appelez-nous, écrivez sur WhatsApp ou envoyez un e-mail. Ouvert tous les jours de 09h00 à 22h00 à Istanbul.",
    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "Contact",
    contactHeading: "Contactez-nous",
    contactBody:
      "Indiquez-nous votre date, le nombre d'invités et l'expérience souhaitée. Notre équipe répond individuellement à chaque demande de réservation ; vous recevrez votre identifiant de réservation et tous les détails par e-mail.",
    phoneLabel: "Téléphone",
    whatsappLabel: "WhatsApp",
    emailLabel: "E-mail",
    hoursLabel: "Horaires d'ouverture",
    hoursValue: "Tous les jours 09h00–22h00",
    addressLabel: "Adresse",
    addressValue: ADDRESS,
    ctaBook: "Réserver via WhatsApp",
    ctaWhatsapp: "Écrire sur WhatsApp",
    viewInEnglish: "English →",
  },
  nl: {
    title: "Contact — MerrySails | Telefoon, WhatsApp en E-mail",
    description:
      "Neem contact op met MerrySails voor uw Bosporus cruise boeking. Bel +90 537 040 68 22, stuur WhatsApp of e-mail naar info@merrysails.com. Dagelijks geopend 09:00–22:00.",
    canonicalPath: "/nl/contact",
    pageTitle: "Contact — Boek uw Bosporus cruise",
    pageDescription:
      "Bel ons, stuur een WhatsApp-bericht of e-mail. Dagelijks geopend van 09:00 tot 22:00 uur in Istanbul.",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Contact",
    contactHeading: "Neem contact op",
    contactBody:
      "Stuur ons uw datum, het aantal gasten en de gewenste ervaring. Ons team reageert persoonlijk op elke boekingsaanvraag; u ontvangt uw boekings-ID en alle details per e-mail.",
    phoneLabel: "Telefoon",
    whatsappLabel: "WhatsApp",
    emailLabel: "E-mail",
    hoursLabel: "Openingstijden",
    hoursValue: "Dagelijks 09:00–22:00",
    addressLabel: "Adres",
    addressValue: ADDRESS,
    ctaBook: "Boek via WhatsApp",
    ctaWhatsapp: "WhatsApp sturen",
    viewInEnglish: "English →",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();

  const c = CONTENT[locale];
  if (!c) notFound();

  const canonicalUrl = `${SITE_URL}${c.canonicalPath}`;
  const languages = buildHreflang("/contact") ?? {
    "x-default": `${SITE_URL}/contact`,
    en: `${SITE_URL}/contact`,
    [locale]: canonicalUrl,
  };

  return {
    title: c.title,
    description: c.description,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title: c.title,
      description: c.description,
      url: canonicalUrl,
      type: "website",
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: c.pageTitle }],
    },
  };
}

export function generateStaticParams() {
  return ACTIVE_LOCALES.filter((l) => l !== "en").map((locale) => ({ locale }));
}

export default async function LocaleContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();

  const c = CONTENT[locale];
  if (!c) notFound();

  const canonicalUrl = `${SITE_URL}${c.canonicalPath}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: c.breadcrumbHome, item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: c.breadcrumbCurrent, item: canonicalUrl },
    ],
  };

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: c.pageTitle,
    description: c.pageDescription,
    url: canonicalUrl,
    inLanguage: locale,
    mainEntity: {
      "@type": ["TravelAgency", "LocalBusiness"],
      "@id": "https://merrysails.com/#organization",
      name: "MerrySails — Merry Tourism",
      url: "https://merrysails.com",
      telephone: PHONE_HREF,
      email: EMAIL,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Alemdar Mah. Divanyolu Cad. Oğul Han No:62 İç Kapı No: 402",
        addressLocality: "Fatih",
        addressRegion: "Istanbul",
        postalCode: "34093",
        addressCountry: "TR",
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "09:00",
        closes: "22:00",
      },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="pt-28 pb-20 bg-[var(--surface-alt)]">
        <div className="container-main max-w-3xl">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
            <Link href={`/${locale}`} className="hover:text-[var(--brand-primary)]">
              {c.breadcrumbHome}
            </Link>
            <span>/</span>
            <span className="text-[var(--heading)]">{c.breadcrumbCurrent}</span>
          </nav>

          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-[var(--heading)]">{c.pageTitle}</h1>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-lg">{c.pageDescription}</p>
          </div>

          <section className="bg-white rounded-2xl border border-[var(--line)] p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-3">{c.contactHeading}</h2>
            <p className="text-[var(--body-text)] leading-relaxed mb-6">{c.contactBody}</p>

            <div className="grid gap-4 md:grid-cols-2">
              <a
                href={`tel:${PHONE_HREF}`}
                className="rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-4 transition-all hover:border-[var(--brand-primary)] hover:shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)] mb-1">
                  {c.phoneLabel}
                </p>
                <p className="text-base font-semibold text-[var(--heading)]">{PHONE}</p>
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-4 transition-all hover:border-[var(--brand-primary)] hover:shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)] mb-1">
                  {c.whatsappLabel}
                </p>
                <p className="text-base font-semibold text-[var(--heading)]">{PHONE}</p>
              </a>

              <a
                href={`mailto:${EMAIL}`}
                className="rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-4 transition-all hover:border-[var(--brand-primary)] hover:shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)] mb-1">
                  {c.emailLabel}
                </p>
                <p className="text-base font-semibold text-[var(--heading)] break-all">{EMAIL}</p>
              </a>

              <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)] mb-1">
                  {c.hoursLabel}
                </p>
                <p className="text-base font-semibold text-[var(--heading)]">{c.hoursValue}</p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)] mb-1">
                {c.addressLabel}
              </p>
              <p className="text-sm leading-relaxed text-[var(--body-text)]">{c.addressValue}</p>
            </div>
          </section>

          <section className="rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8 text-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[var(--brand-primary)] px-8 py-3 text-base font-semibold text-white hover:opacity-90"
            >
              {c.ctaBook}
            </a>
          </section>

          <div className="mt-8 flex justify-end">
            <Link href="/contact" className="text-sm text-[var(--text-muted)] hover:text-[var(--brand-primary)]">
              {c.viewInEnglish}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
