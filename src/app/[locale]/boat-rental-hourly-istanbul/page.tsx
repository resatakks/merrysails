import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { SITE_URL, WHATSAPP_URL, PHONE_DISPLAY } from "@/lib/constants";
import { ACTIVE_LOCALES, isActiveLocale, type SiteLocale } from "@/i18n/config";
import { buildHreflang } from "@/lib/hreflang";

export const revalidate = 3600;

export function generateStaticParams() {
  return ACTIVE_LOCALES.filter((locale) => locale !== "en").map((locale) => ({
    locale,
  }));
}

type LocaleContent = {
  metaTitle: string;
  metaDescription: string;
  canonicalPath: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  whyHeading: string;
  reasons: { title: string; desc: string }[];
  faqHeading: string;
  faqs: { q: string; a: string }[];
  ctaWhatsapp: string;
  viewInEnglish: string;
};

const TRANSLATIONS: Record<string, LocaleContent> = {
  tr: {
    metaTitle:
      "Saatlik Tekne Kiralama İstanbul 2026 | Boğaz'da Saat Bazlı Özel Tekne | MerrySails",
    metaDescription:
      "İstanbul'da saatlik tekne kiralama: paket bazlı yat kiralama yerine saat bazlı özel tekne arayan misafirler için Boğaz'da esnek özel tekne hizmeti.",
    canonicalPath: "/tr/boat-rental-hourly-istanbul",
    breadcrumbHome: "Ana Sayfa",
    breadcrumbCurrent: "Saatlik Tekne Kiralama İstanbul",
    heroTitle: "Saatlik Tekne Kiralama İstanbul",
    heroSubtitle:
      "Saat bazlı özel tekne ihtiyacı için Boğaz'da esnek planlama",
    heroDescription:
      "MerrySails saatlik tekne kiralama; paket bazlı yat kiralama yerine saat bazlı özel tekne aradığınızda doğru sayfadır. Boğaz'da kısa özel sürüşler, gün batımı zamanlamaları ve hafif özel kutlamalar için tekne ve süre bloğu önce belirlenir; ekstra detaylar brifinize göre eklenir. Standart bir paket dayatılmadan, vessel-first mantıkla planlanır.",
    whyHeading: "Saatlik Tekne Kiralama Neden MerrySails?",
    reasons: [
      {
        title: "Saat bazlı şeffaf planlama",
        desc: "Tekne ve süre bloğu ön plandadır; rota, misafir sayısı ve ekstra detaylar üzerine eklenir. Saatlik mantık esnek kalır.",
      },
      {
        title: "Hafif özel format",
        desc: "Kısa Boğaz turları, fotoğraf çekimleri ve sade özel kutlamalar için ağır paket yapısı dayatılmadan özel tekne deneyimi sunulur.",
      },
      {
        title: "TURSAB lisanslı operatör",
        desc: "2001'den beri TURSAB A Grubu lisanslı Merry Tourism çatısı altında, özel tekne kiralama deneyimi güvenli ve şeffaf şekilde organize edilir.",
      },
    ],
    faqHeading: "Sıkça Sorulan Sorular",
    faqs: [
      {
        q: "Saatlik tekne kiralama yat kiralama ile aynı mı?",
        a: "Hayır. Saatlik tekne kiralama, saat bazlı özel kiralama mantığı için kullanılır. Paket bazlı premium yat formatı için yat kiralama sayfasını öneririz.",
      },
      {
        q: "Saatlik fiyat genellikle neyi kapsar?",
        a: "Saatlik fiyat tekne ve süre bloğunu kapsar; nihai teklif seçilen tekne, rota, misafir sayısı ve eklenen yiyecek/içecek/kutlama detaylarına göre değişir.",
      },
      {
        q: "Saatlik tekne kiralama kimler için uygundur?",
        a: "Kısa Boğaz turları, sade özel sürüşler, fotoğraf çekimleri, hafif kutlamalar ve ağır paket yapısı istemeyen misafirler için en uygun formatır.",
      },
      {
        q: "Hangi durumlarda farklı bir sayfaya geçmeliyim?",
        a: "Paket bazlı premium plan için yat kiralama, akşam yemeği odaklı özel akşam için özel akşam yemeği teknesi, evlilik teklifi veya kurumsal etkinlik için ilgili özel sayfaları kullanın.",
      },
    ],
    ctaWhatsapp: "WhatsApp ile Saatlik Teklif Al",
    viewInEnglish: "View in English →",
  },
  de: {
    metaTitle:
      "Stündliche Bootsmiete Istanbul 2026 | Privatboot pro Stunde Bosporus | MerrySails",
    metaDescription:
      "Stündliche Bootsmiete in Istanbul: privates Boot pro Stunde auf dem Bosporus statt paketbasierter Yachtcharter. Flexible Planung, vessel-first.",
    canonicalPath: "/de/boat-rental-hourly-istanbul",
    breadcrumbHome: "Startseite",
    breadcrumbCurrent: "Stündliche Bootsmiete Istanbul",
    heroTitle: "Stündliche Bootsmiete Istanbul",
    heroSubtitle:
      "Privatboot pro Stunde auf dem Bosporus statt paketbasierter Yachtcharter",
    heroDescription:
      "MerrySails Stündliche Bootsmiete ist die richtige Seite, wenn Sie ein privates Boot pro Stunde suchen statt einer paketbasierten Yachtcharter. Boot und Zeitfenster stehen im Mittelpunkt; Route, Gästezahl und Extras werden danach ergänzt. So bleibt die Buchung leicht und vessel-first, ohne Standardpaket.",
    whyHeading: "Warum MerrySails für stündliche Bootsmiete?",
    reasons: [
      {
        title: "Transparente Stundenlogik",
        desc: "Boot und Stundenblock kommen zuerst; Route, Gästezahl und Extras werden danach hinzugefügt. Stündliche Buchung bleibt flexibel.",
      },
      {
        title: "Leichtes privates Format",
        desc: "Kurze Bosporus-Touren, Fotofahrten und schlichte private Anlässe ohne ein schweres Charterpaket – perfekt für eine kleinere Gruppe.",
      },
      {
        title: "TURSAB-lizenzierter Veranstalter",
        desc: "Seit 2001 unter Merry Tourism mit TURSAB-A-Lizenz organisiert: sichere, transparente private Bootsmiete in Istanbul.",
      },
    ],
    faqHeading: "Häufig gestellte Fragen",
    faqs: [
      {
        q: "Ist stündliche Bootsmiete dasselbe wie eine Yachtcharter?",
        a: "Nein. Stündliche Bootsmiete ist für Stunden-basierte private Buchungen gedacht. Für eine paketbasierte Premium-Yacht nutzen Sie bitte die Yachtcharter-Seite.",
      },
      {
        q: "Was deckt der Stundenpreis üblicherweise ab?",
        a: "Der Stundenpreis umfasst Boot und Zeitblock; das endgültige Angebot hängt von Bootstyp, Route, Gästezahl sowie hinzugebuchten Speisen, Getränken oder Extras ab.",
      },
      {
        q: "Für wen ist stündliche Bootsmiete geeignet?",
        a: "Kurze Bosporus-Ausfahrten, einfache Privatfahrten, Foto-Sessions, leichte Feiern und alle Gäste, die kein schweres Charterpaket brauchen.",
      },
      {
        q: "Wann sollte ich eine andere Seite wählen?",
        a: "Für paketbasierte Premium-Pläne die Yachtcharter, für ein dinner-zentriertes Privatschiff das Private Dinner Cruise, für Heiratsantrag oder Firmenevent die jeweiligen Spezialseiten.",
      },
    ],
    ctaWhatsapp: "Stundenangebot per WhatsApp",
    viewInEnglish: "View in English →",
  },
  fr: {
    metaTitle:
      "Location de Bateau à l'Heure Istanbul 2026 | Bateau Privé par Heure Bosphore | MerrySails",
    metaDescription:
      "Location de bateau à l'heure à Istanbul : bateau privé par heure sur le Bosphore plutôt qu'une location de yacht en formule. Planification flexible, vessel-first.",
    canonicalPath: "/fr/boat-rental-hourly-istanbul",
    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "Location de bateau à l'heure Istanbul",
    heroTitle: "Location de Bateau à l'Heure Istanbul",
    heroSubtitle:
      "Bateau privé par heure sur le Bosphore plutôt qu'une location de yacht en formule",
    heroDescription:
      "La location de bateau à l'heure MerrySails est la bonne page lorsque vous voulez un bateau privé facturé à l'heure plutôt qu'une formule yacht. Le bateau et le créneau horaire viennent en premier ; itinéraire, nombre d'invités et extras s'ajoutent ensuite. La logique vessel-first garde la réservation simple, sans formule imposée.",
    whyHeading: "Pourquoi MerrySails pour la location de bateau à l'heure ?",
    reasons: [
      {
        title: "Logique horaire transparente",
        desc: "Le bateau et le bloc d'heures viennent d'abord ; itinéraire, invités et extras s'ajoutent par-dessus. La location à l'heure reste flexible.",
      },
      {
        title: "Format privé léger",
        desc: "Idéal pour une courte sortie sur le Bosphore, une session photo ou une simple célébration privée, sans imposer une formule charter lourde.",
      },
      {
        title: "Opérateur licencié TURSAB",
        desc: "Sous Merry Tourism, licence TURSAB classe A depuis 2001. Location de bateau privée organisée de façon sûre et transparente.",
      },
    ],
    faqHeading: "Questions fréquentes",
    faqs: [
      {
        q: "La location à l'heure est-elle identique à une location de yacht ?",
        a: "Non. La location à l'heure est faite pour une logique privée à l'heure. Pour un yacht en formule premium, utilisez la page de location de yacht.",
      },
      {
        q: "Que couvre généralement le tarif horaire ?",
        a: "Le tarif horaire couvre le bateau et le bloc temps ; le devis final dépend du bateau choisi, de l'itinéraire, du nombre d'invités et des options nourriture/boissons/célébration.",
      },
      {
        q: "À qui s'adresse la location à l'heure ?",
        a: "Aux courtes sorties sur le Bosphore, aux balades privées simples, aux sessions photo, aux célébrations légères et aux clients qui ne veulent pas d'une formule charter lourde.",
      },
      {
        q: "Quand basculer vers une autre page ?",
        a: "Page yacht charter pour une formule premium, page dîner privé pour une soirée centrée repas, pages dédiées pour demande en mariage ou événement d'entreprise.",
      },
    ],
    ctaWhatsapp: "Demander un devis horaire WhatsApp",
    viewInEnglish: "View in English →",
  },
  nl: {
    metaTitle:
      "Boot per Uur Huren Istanbul 2026 | Privéboot per Uur Bosporus | MerrySails",
    metaDescription:
      "Boot per uur huren in Istanbul: een privéboot per uur op de Bosporus in plaats van een pakket-yachtcharter. Flexibele planning, vessel-first.",
    canonicalPath: "/nl/boat-rental-hourly-istanbul",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Boot per uur huren Istanbul",
    heroTitle: "Boot per Uur Huren Istanbul",
    heroSubtitle:
      "Privéboot per uur op de Bosporus in plaats van een pakket-yachtcharter",
    heroDescription:
      "MerrySails Boot per Uur is de juiste pagina als u een privéboot per uur wilt in plaats van een pakketgebaseerde yachtcharter. De boot en het tijdblok staan voorop; route, aantal gasten en extra's komen daarna. Zo blijft de boeking licht en vessel-first, zonder standaardpakket.",
    whyHeading: "Waarom MerrySails voor boot per uur?",
    reasons: [
      {
        title: "Transparante uurlogica",
        desc: "Eerst de boot en het uurblok; route, gastenaantal en extra's komen daarbovenop. Per-uur boekingen blijven flexibel.",
      },
      {
        title: "Licht privéformat",
        desc: "Ideaal voor een korte Bosporus-tocht, fotosessie of eenvoudige privéviering, zonder een zwaar charterpakket op te leggen.",
      },
      {
        title: "TURSAB-erkende operator",
        desc: "Onder Merry Tourism met TURSAB A-licentie sinds 2001. Privéboot per uur veilig en transparant georganiseerd.",
      },
    ],
    faqHeading: "Veelgestelde vragen",
    faqs: [
      {
        q: "Is een boot per uur hetzelfde als een yachtcharter?",
        a: "Nee. Boot per uur is voor uurlijkse private boekingslogica. Voor een pakketgebaseerd premium yacht gebruikt u onze yachtcharter-pagina.",
      },
      {
        q: "Wat dekt het uurtarief meestal?",
        a: "Het uurtarief omvat de boot en het tijdblok; de uiteindelijke offerte hangt af van bootkeuze, route, aantal gasten en eventuele eten/drinken/viering-extra's.",
      },
      {
        q: "Voor wie is boot per uur het beste?",
        a: "Voor korte Bosporus-uitstapjes, simpele privéritten, fotosessies, lichte vieringen en gasten die geen zwaar charterpakket nodig hebben.",
      },
      {
        q: "Wanneer naar een andere pagina overstappen?",
        a: "Naar yachtcharter voor een pakketgebaseerd premium plan, naar private diner-cruise voor een dineravond, en naar de specifieke pagina's voor huwelijksaanzoek of bedrijfsevent.",
      },
    ],
    ctaWhatsapp: "Vraag uurofferte via WhatsApp",
    viewInEnglish: "View in English →",
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
  const languages = buildHreflang("/boat-rental-hourly-istanbul");

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title: t.metaTitle,
      description: t.metaDescription,
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
      title: t.metaTitle,
      description: t.metaDescription,
      images: [`${SITE_URL}/og-image.jpg`],
    },
  };
}

export default async function LocaleBoatRentalHourlyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();

  const t = TRANSLATIONS[locale];
  if (!t) notFound();

  const canonicalUrl = `${SITE_URL}${t.canonicalPath}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t.heroTitle,
    description: t.heroDescription,
    url: canonicalUrl,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "City", name: "İstanbul" },
    serviceType: "Hourly Private Boat Rental",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.breadcrumbHome, item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: t.breadcrumbCurrent,
        item: canonicalUrl,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
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

      <main className="pt-28 pb-20 bg-[var(--surface-alt)]">
        <div className="container-main">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6"
          >
            <Link href={`/${locale}`} className="hover:text-[var(--brand-primary)]">
              {t.breadcrumbHome}
            </Link>
            <span>/</span>
            <span className="text-[var(--heading)] truncate">{t.breadcrumbCurrent}</span>
          </nav>

          <header className="mb-10">
            <h1 className="text-3xl md:text-5xl font-bold text-[var(--heading)] mb-4 leading-tight">
              {t.heroTitle}
            </h1>
            <p className="text-lg text-[var(--text-muted)] max-w-3xl mb-4">
              {t.heroSubtitle}
            </p>
            <p className="text-sm md:text-base text-[var(--text-muted)] max-w-3xl leading-relaxed">
              {t.heroDescription}
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--brand-primary)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--brand-primary-hover)]"
              >
                {t.ctaWhatsapp} <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`}
                className="inline-flex items-center justify-center rounded-xl border border-[var(--brand-primary)] px-6 py-3 font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)] hover:text-white"
              >
                {PHONE_DISPLAY}
              </a>
            </div>
          </header>

          <section className="mb-12 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">
              {t.whyHeading}
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {t.reasons.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4"
                >
                  <h3 className="font-semibold text-[var(--heading)] mb-2">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-6">
              {t.faqHeading}
            </h2>
            <div className="space-y-4">
              {t.faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4 group"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[var(--heading)]">
                    {faq.q}
                    <span className="text-gray-400 transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          <section className="rounded-3xl bg-[var(--heading)] p-6 text-white md:p-8">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl">
                  {t.heroTitle}
                </h2>
                <p className="max-w-2xl text-sm leading-relaxed text-white/75">
                  {t.heroSubtitle}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[var(--heading)] transition-colors hover:bg-white/90"
                >
                  {t.ctaWhatsapp} <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </section>

          <div className="mt-8 flex justify-end">
            <Link
              href="/boat-rental-hourly-istanbul"
              className="text-sm text-[var(--text-muted)] hover:text-[var(--brand-primary)]"
            >
              {t.viewInEnglish}
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
