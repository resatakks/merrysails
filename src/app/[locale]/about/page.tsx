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
  aboutBody: string[];
  statsLabel: string;
  licenseHeading: string;
  licenseBody: string;
  servicesHeading: string;
  services: { title: string; desc: string }[];
  ctaHeading: string;
  ctaBody: string;
  ctaButtonContact: string;
  ctaButtonCruises: string;
  viewInEnglish: string;
};

const CONTENT: Record<string, LocaleContent> = {
  tr: {
    title: "Hakkımızda — MerrySails ve TÜRSAB Lisanslı Merry Tourism | İstanbul",
    description:
      "MerrySails, 2001'den bu yana TÜRSAB A Grubu lisanslı Merry Tourism'in Boğaz turu ve yat kiralama markasıdır. İstanbul'da 50.000+ misafire hizmet verdik.",
    canonicalPath: "/tr/about",
    pageTitle: "Hakkımızda — Merry Tourism Tarafından İstanbul Boğaz Turları",
    pageDescription:
      "MerrySails, TÜRSAB A Grubu lisanslı bir seyahat acentesi olan Merry Tourism'in bir parçasıdır. 2001'den bu yana İstanbul'da Boğaz tekne turları, gün batımı turları, akşam yemeği turları ve özel yat kiralama hizmetleri sunuyoruz.",
    breadcrumbHome: "Ana Sayfa",
    breadcrumbCurrent: "Hakkımızda",
    aboutBody: [
      "MerrySails, İstanbul merkezli TÜRSAB A Grubu lisanslı seyahat acentesi Merry Tourism'in Boğaz turu ve yat kiralama bölümüdür. 2001'den bu yana misafirlerimize Boğaz tekne turları, gün batımı turları, akşam yemeği turları ve özel yat kiralama deneyimleri sunuyoruz.",
      "Operasyonlarımız İstanbul'un Avrupa yakasında, Kabataş ve Beşiktaş kalkış noktaları çevresinde yoğunlaşmıştır. Misafirlerimizin Boğaz'ı en doğru şekilde keşfedebilmesi için kalkış lojistiğini, biniş prosedürlerini ve servis akışını yakından planlıyoruz.",
      "İster paylaşımlı bir gün batımı turu olsun, ister tam özel bir yat etkinliği — odağımız her zaman aynı: doğrudan rezervasyon, lisanslı operatör güvencesi ve net iletişim. Her rezervasyon talebine bireysel olarak yanıt veririz; kalkış öncesinde tüm detayların onaylanmasını sağlarız.",
      "20+ yıllık deneyimimiz boyunca 50.000'den fazla misafire hizmet verdik — Türkiye'yi keşfeden bireysel gezginlerden kurumsal etkinliklere, evlilik tekliflerinden büyük grup organizasyonlarına kadar.",
    ],
    statsLabel: "50.000+ misafir · 2001'den bu yana · TÜRSAB A Grubu lisanslı",
    licenseHeading: "Lisans Bilgileri",
    licenseBody:
      "MerrySails, TÜRSAB (Türkiye Seyahat Acenteleri Birliği) tarafından lisanslı A Grubu seyahat acentesi olan Merry Tourism tarafından işletilmektedir. A Grubu lisansı, hem yurt içi hem de yurt dışı tur operasyonu yetkisi verir ve sektörün en kapsamlı lisans kategorisidir.",
    servicesHeading: "Sunduğumuz Hizmetler",
    services: [
      { title: "Boğaz Gün Batımı Turu", desc: "2 saatlik paylaşımlı altın saat seyiri. €34'ten başlayan fiyatlarla." },
      { title: "İstanbul Akşam Yemeği Turu", desc: "Türk gecesi gösterisi ile 3,5 saatlik akşam programı. €30–€90 arası 4 paket." },
      { title: "Özel Yat Kiralama", desc: "Tam özel etkinlikler için yat kiralama. Evlilik teklifi, kutlama ve kurumsal etkinliklere uygun." },
      { title: "Tekne Kiralama", desc: "Saatlik özel tekne kiralama. Esnek güzergah ve özelleştirilebilir ekstralar." },
    ],
    ctaHeading: "Sorularınız mı var?",
    ctaBody: "Tarih, kişi sayısı ve istediğiniz deneyim hakkında bize yazın. Doğrudan rezervasyon ve lisanslı operatör güvencesi.",
    ctaButtonContact: "İletişim",
    ctaButtonCruises: "Boğaz Turlarını Görüntüle",
    viewInEnglish: "English →",
  },
  de: {
    title: "Über uns — MerrySails und TÜRSAB-lizenzierte Merry Tourism | Istanbul",
    description:
      "MerrySails ist die Bosporus-Kreuzfahrt- und Jachtcharter-Marke der seit 2001 TÜRSAB A-Gruppe lizenzierten Merry Tourism. Über 50.000 Gäste in Istanbul betreut.",
    canonicalPath: "/de/about",
    pageTitle: "Über uns — Bosporus-Kreuzfahrten von Merry Tourism in Istanbul",
    pageDescription:
      "MerrySails ist Teil von Merry Tourism, einem TÜRSAB A-Gruppe lizenzierten Reiseunternehmen. Seit 2001 bieten wir in Istanbul Bosporus-Bootstouren, Sonnenuntergangs-Kreuzfahrten, Dinner-Kreuzfahrten und private Jachtcharter an.",
    breadcrumbHome: "Startseite",
    breadcrumbCurrent: "Über uns",
    aboutBody: [
      "MerrySails ist die Bosporus-Kreuzfahrt- und Jachtcharter-Sparte von Merry Tourism, einer in Istanbul ansässigen TÜRSAB A-Gruppe lizenzierten Reiseagentur. Seit 2001 bieten wir Bosporus-Bootstouren, Sonnenuntergangs-Kreuzfahrten, Dinner-Kreuzfahrten und private Jachtcharter an.",
      "Unser Betrieb konzentriert sich auf der europäischen Seite von Istanbul rund um die Abfahrtsorte Kabatas und Besiktas. Wir planen Abfahrtslogistik, Boarding-Prozesse und Serviceabläufe sorgfältig, damit unsere Gäste den Bosporus auf die richtige Weise erleben.",
      "Ob geteilte Sonnenuntergangs-Kreuzfahrt oder vollständig private Jachtveranstaltung — unser Fokus bleibt derselbe: Direktbuchung, lizenzierter Betreiber und klare Kommunikation. Wir antworten persönlich auf jede Buchungsanfrage und stellen sicher, dass alle Details vor der Abfahrt bestätigt werden.",
      "In über 20 Jahren Erfahrung haben wir mehr als 50.000 Gäste betreut — von individuellen Reisenden, die die Türkei entdecken, bis hin zu Firmenevents, Heiratsanträgen und großen Gruppenveranstaltungen.",
    ],
    statsLabel: "50.000+ Gäste · seit 2001 · TÜRSAB A-Gruppe lizenziert",
    licenseHeading: "Lizenzinformationen",
    licenseBody:
      "MerrySails wird von Merry Tourism betrieben, einer von TÜRSAB (Verband der türkischen Reisebüros) lizenzierten Reiseagentur der A-Gruppe. Die A-Gruppen-Lizenz erteilt die Befugnis, sowohl inländische als auch internationale Touroperationen durchzuführen und ist die umfassendste Lizenzkategorie der Branche.",
    servicesHeading: "Unsere Leistungen",
    services: [
      { title: "Bosporus Sonnenuntergangs-Kreuzfahrt", desc: "2-stündige geteilte Goldstunden-Kreuzfahrt. Preise ab €34." },
      { title: "Istanbul Dinner-Kreuzfahrt", desc: "3,5-stündiges Abendprogramm mit türkischer Show. 4 Pakete von €30 bis €90." },
      { title: "Privater Jachtcharter", desc: "Jachtcharter für vollständig private Veranstaltungen. Ideal für Heiratsanträge, Feiern und Firmenevents." },
      { title: "Bootsverleih", desc: "Stündlicher privater Bootsverleih. Flexible Routen und individuell anpassbare Extras." },
    ],
    ctaHeading: "Haben Sie Fragen?",
    ctaBody: "Schreiben Sie uns Ihr Datum, Ihre Gästezahl und das gewünschte Erlebnis. Direktbuchung und lizenzierter Betreiber.",
    ctaButtonContact: "Kontakt",
    ctaButtonCruises: "Bosporus-Kreuzfahrten ansehen",
    viewInEnglish: "English →",
  },
  fr: {
    title: "À propos — MerrySails et Merry Tourism agréé TÜRSAB | Istanbul",
    description:
      "MerrySails est la marque de croisières Bosphore et charter de yacht de Merry Tourism, agence agréée TÜRSAB groupe A depuis 2001. Plus de 50 000 invités à Istanbul.",
    canonicalPath: "/fr/about",
    pageTitle: "À propos — Croisières Bosphore par Merry Tourism à Istanbul",
    pageDescription:
      "MerrySails fait partie de Merry Tourism, une agence de voyages du groupe A licenciée TÜRSAB. Depuis 2001, nous proposons à Istanbul des excursions en bateau sur le Bosphore, des croisières coucher de soleil, des croisières dîner et des charters de yacht privés.",
    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "À propos",
    aboutBody: [
      "MerrySails est la division croisière du Bosphore et charter de yacht de Merry Tourism, agence de voyages agréée TÜRSAB groupe A basée à Istanbul. Depuis 2001, nous proposons à nos invités des excursions en bateau sur le Bosphore, des croisières coucher de soleil, des croisières dîner et des charters de yacht privés.",
      "Nos opérations sont concentrées du côté européen d'Istanbul, autour des points de départ de Kabatas et Besiktas. Nous planifions soigneusement la logistique de départ, les procédures d'embarquement et le déroulement du service afin que nos invités puissent découvrir le Bosphore de la meilleure façon.",
      "Qu'il s'agisse d'une croisière coucher de soleil partagée ou d'un événement de yacht entièrement privé, notre objectif reste le même : réservation directe, garantie d'un opérateur agréé et communication claire. Nous répondons individuellement à chaque demande de réservation et nous nous assurons que tous les détails sont confirmés avant le départ.",
      "En plus de 20 ans d'expérience, nous avons servi plus de 50 000 invités — des voyageurs individuels découvrant la Turquie aux événements d'entreprise, demandes en mariage et grandes organisations de groupe.",
    ],
    statsLabel: "50 000+ invités · depuis 2001 · agréé TÜRSAB groupe A",
    licenseHeading: "Informations de licence",
    licenseBody:
      "MerrySails est exploitée par Merry Tourism, une agence de voyages du groupe A licenciée par TÜRSAB (Association des agences de voyages de Turquie). La licence du groupe A confère le pouvoir d'exploiter à la fois des tours nationaux et internationaux et constitue la catégorie de licence la plus complète du secteur.",
    servicesHeading: "Nos services",
    services: [
      { title: "Croisière Coucher de Soleil Bosphore", desc: "Croisière partagée de 2h pendant l'heure dorée. À partir de €34." },
      { title: "Croisière Dîner Istanbul", desc: "Programme de soirée de 3h30 avec spectacle turc. 4 formules de €30 à €90." },
      { title: "Charter de Yacht Privé", desc: "Charter de yacht pour événements entièrement privés. Idéal pour demandes en mariage, célébrations et événements d'entreprise." },
      { title: "Location de Bateau", desc: "Location de bateau privé à l'heure. Itinéraire flexible et extras personnalisables." },
    ],
    ctaHeading: "Vous avez des questions ?",
    ctaBody: "Indiquez-nous votre date, le nombre d'invités et l'expérience souhaitée. Réservation directe et opérateur agréé.",
    ctaButtonContact: "Contact",
    ctaButtonCruises: "Voir les croisières Bosphore",
    viewInEnglish: "English →",
  },
  nl: {
    title: "Over ons — MerrySails en TÜRSAB-gelicentieerde Merry Tourism | Istanbul",
    description:
      "MerrySails is het Bosporus cruise- en jachtchartermerk van Merry Tourism, sinds 2001 TÜRSAB A-groep gelicentieerd. Meer dan 50.000 gasten bediend in Istanbul.",
    canonicalPath: "/nl/about",
    pageTitle: "Over ons — Bosporus Cruises door Merry Tourism in Istanbul",
    pageDescription:
      "MerrySails maakt deel uit van Merry Tourism, een TÜRSAB-gelicentieerd A-groep reisbureau. Sinds 2001 bieden wij in Istanbul Bosporus boottochten, zonsondergang cruises, diner cruises en privé jachtcharters aan.",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Over ons",
    aboutBody: [
      "MerrySails is de Bosporus cruise- en jachtcharterdivisie van Merry Tourism, een in Istanbul gevestigd TÜRSAB-gelicentieerd A-groep reisbureau. Sinds 2001 bieden wij Bosporus boottochten, zonsondergang cruises, diner cruises en privé jachtcharters aan.",
      "Onze activiteiten zijn geconcentreerd aan de Europese kant van Istanbul, rondom de vertrekpunten Kabatas en Besiktas. We plannen vertreklogistiek, instapprocedures en serviceflow zorgvuldig zodat onze gasten de Bosporus op de juiste manier kunnen ervaren.",
      "Of het nu een gedeelde zonsondergang cruise is of een volledig privé jachtevenement — onze focus blijft hetzelfde: directe boeking, gelicentieerde operator en heldere communicatie. We reageren persoonlijk op elke boekingsaanvraag en zorgen ervoor dat alle details vóór vertrek zijn bevestigd.",
      "In meer dan 20 jaar ervaring hebben we meer dan 50.000 gasten bediend — van individuele reizigers die Turkije ontdekken tot bedrijfsevenementen, huwelijksaanzoeken en grote groepsorganisaties.",
    ],
    statsLabel: "50.000+ gasten · sinds 2001 · TÜRSAB A-groep gelicentieerd",
    licenseHeading: "Licentiegegevens",
    licenseBody:
      "MerrySails wordt geëxploiteerd door Merry Tourism, een door TÜRSAB (Vereniging van Turkse Reisbureaus) gelicentieerd A-groep reisbureau. De A-groep licentie geeft bevoegdheid voor zowel binnenlandse als internationale touroperaties en is de meest uitgebreide licentiecategorie in de branche.",
    servicesHeading: "Onze diensten",
    services: [
      { title: "Bosporus Zonsondergang Cruise", desc: "2 uur durende gedeelde gouden uur cruise. Vanaf €34." },
      { title: "Istanbul Diner Cruise", desc: "3,5 uur durend avondprogramma met Turkse show. 4 pakketten van €30 tot €90." },
      { title: "Privé Jachtcharter", desc: "Jachtcharter voor volledig privé-evenementen. Ideaal voor huwelijksaanzoeken, vieringen en bedrijfsevenementen." },
      { title: "Boothuur", desc: "Privé boothuur per uur. Flexibele routes en aanpasbare extra's." },
    ],
    ctaHeading: "Heeft u vragen?",
    ctaBody: "Stuur ons uw datum, aantal gasten en gewenste ervaring. Directe boeking en gelicentieerde operator.",
    ctaButtonContact: "Contact",
    ctaButtonCruises: "Bekijk Bosporus cruises",
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
  const languages = buildHreflang("/about") ?? {
    "x-default": `${SITE_URL}/about`,
    en: `${SITE_URL}/about`,
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

export default async function LocaleAboutPage({
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

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: c.pageTitle,
    description: c.pageDescription,
    url: canonicalUrl,
    inLanguage: locale,
    mainEntity: {
      "@type": "TravelAgency",
      "@id": "https://merrysails.com/#organization",
      name: "MerrySails",
      alternateName: "Merry Tourism",
      foundingDate: "2001-01-01",
      knowsAbout: ["Bosphorus Cruise Tours", "Yacht Charter Istanbul", "Private Boat Tours", "Dinner Cruise Istanbul"],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="pt-28 pb-20">
        <div className="container-main max-w-4xl">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
            <Link href={`/${locale}`} className="hover:text-[var(--brand-primary)]">
              {c.breadcrumbHome}
            </Link>
            <span>/</span>
            <span className="text-[var(--heading)]">{c.breadcrumbCurrent}</span>
          </nav>

          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--heading)]">{c.pageTitle}</h1>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-lg">{c.pageDescription}</p>
            <p className="mt-4 text-sm font-semibold text-[var(--brand-primary)]">{c.statsLabel}</p>
          </div>

          <section className="bg-white rounded-2xl border border-[var(--line)] p-6 md:p-8 mb-8">
            <div className="space-y-4 text-[var(--body-text)] leading-relaxed">
              {c.aboutBody.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className="bg-[var(--surface-alt)] rounded-2xl border border-[var(--line)] p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-3">{c.licenseHeading}</h2>
            <p className="text-[var(--body-text)] leading-relaxed">{c.licenseBody}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">{c.servicesHeading}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {c.services.map((service) => (
                <div
                  key={service.title}
                  className="rounded-2xl border border-[var(--line)] bg-white p-5"
                >
                  <h3 className="font-semibold text-[var(--heading)] mb-2">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{service.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface-alt)] p-6 md:p-8 text-center">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-3">{c.ctaHeading}</h2>
            <p className="text-[var(--text-muted)] mb-5 max-w-2xl mx-auto">{c.ctaBody}</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href={`/${locale}/contact`}
                className="rounded-full bg-[var(--brand-primary)] px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90"
              >
                {c.ctaButtonContact}
              </Link>
              <Link
                href={`/${locale}/bosphorus-cruise`}
                className="rounded-full border border-[var(--line)] bg-white px-6 py-2.5 text-sm font-semibold text-[var(--heading)] hover:border-[var(--brand-primary)]"
              >
                {c.ctaButtonCruises}
              </Link>
            </div>
          </section>

          <div className="mt-8 flex justify-end">
            <Link href="/about" className="text-sm text-[var(--text-muted)] hover:text-[var(--brand-primary)]">
              {c.viewInEnglish}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
