import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { SITE_URL } from "@/lib/constants";
import { ACTIVE_LOCALES, isActiveLocale, type SiteLocale } from "@/i18n/config";
import { buildHreflang } from "@/lib/hreflang";

export const revalidate = 3600;

type CardItem = { href: string; title: string; description: string };

type LocaleContent = {
  title: string;
  description: string;
  canonicalPath: string;
  pageTitle: string;
  pageDescription: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  introHeading: string;
  introBody: string;
  primaryHeading: string;
  primaryCards: CardItem[];
  supportHeading: string;
  supportCards: CardItem[];
  ctaHeading: string;
  ctaBody: string;
  ctaButtonCharter: string;
  ctaButtonReservation: string;
  openPage: string;
  viewInEnglish: string;
};

const CONTENT: Record<string, LocaleContent> = {
  tr: {
    title: "İstanbul'da Özel Boğaz Etkinlik Türleri | MerrySails",
    description:
      "Evlilik teklifi, özel akşam yemeği, kutlama ve kurumsal etkinlikler için özel Boğaz yat sayfalarını karşılaştırın. Genel yat kiralama için Yacht Charter Istanbul.",
    canonicalPath: "/tr/private-tours",
    pageTitle: "İstanbul'da Özel Boğaz Etkinlik Türleri",
    pageDescription:
      "Evlilik teklifi, özel akşam yemeği, kutlama ve kurumsal Boğaz etkinlik sayfalarını farklı niyetleri tek bir rezervasyon yoluna sıkıştırmadan karşılaştırın.",
    breadcrumbHome: "Ana Sayfa",
    breadcrumbCurrent: "Özel Etkinlikler",
    introHeading: "Genel özel yat talebi için Yacht Charter Istanbul'dan başlayın",
    introBody:
      "Hala özel yat boyutu, kiralama süresi, rota veya temel paket fiyatlandırmasını karşılaştırıyorsanız, ana sayfa Yacht Charter Istanbul'dur. Aşağıdaki bölümleri talep evlilik teklifi, akşam yemeği, kutlama veya kurumsal etkinliğe daraldığında kullanın.",
    primaryHeading: "Doğru özel Boğaz yoluyla başlayın",
    primaryCards: [
      {
        href: "/yacht-charter-istanbul",
        title: "Yacht Charter Istanbul",
        description: "Genel özel yat paketleri, charter seviyeleri, rota uzunluğu ve temel özel Boğaz fiyatlandırması için.",
      },
      {
        href: "/boat-rental-hourly-istanbul",
        title: "Saatlik Tekne Kiralama",
        description: "Tam paket yerine tekne, daha kısa süre ve saatlik özel kiralama mantığı önce geldiğinde.",
      },
    ],
    supportHeading: "Özel etkinlik sayfaları",
    supportCards: [
      {
        href: "/proposal-yacht-with-photographer-istanbul",
        title: "Fotoğrafçılı Evlilik Teklifi",
        description: "Fotoğrafçı eşliğinde sürpriz, gizli çekim ve özel Boğaz düzeni için evlilik teklifi planlaması.",
      },
      {
        href: "/private-dinner-cruise-for-couples-istanbul",
        title: "Çiftler için Özel Akşam Yemeği",
        description: "Balayı, yıldönümü ve daha sakin çift odaklı akşamlar için akşam yemeği öncelikli özel yat planlaması.",
      },
      {
        href: "/corporate-yacht-dinner-istanbul",
        title: "Kurumsal Yat Akşam Yemeği",
        description: "Akşam formatının yemek odaklı kalması gereken şirketler için kurumsal yat planlaması.",
      },
      {
        href: "/client-hosting-yacht-istanbul",
        title: "Müşteri Ağırlama Yatı",
        description: "Misafir ağırlama ritminin geniş bir etiketten daha önemli olduğu iş odaklı yat planlaması.",
      },
      {
        href: "/team-building-yacht-istanbul",
        title: "Takım Oluşturma Yatı",
        description: "Geniş bir kurumsal brifing yerine takım bağlantısı odaklı Boğaz planları için şirket destek rotası.",
      },
      {
        href: "/private-events",
        title: "Özel Kutlamalar",
        description: "Doğum günü, yıldönümü ve akşam yemeği odaklı olmayan diğer kutlama talepleri için yönlendirme.",
      },
    ],
    ctaHeading: "Hangi özel yat seçeneği size uygun?",
    ctaBody:
      "Tarih, kişi sayısı ve etkinlik türünü gönderin. Sizi yat kiralama, evlilik teklifi, özel akşam yemeği, kurumsal etkinlik veya tekne kiralama yoluna doğru yönlendireceğiz.",
    ctaButtonCharter: "Yat kiralamayı karşılaştır",
    ctaButtonReservation: "Rezervasyon Yap",
    openPage: "Sayfayı aç",
    viewInEnglish: "English →",
  },
  de: {
    title: "Private Bosporus-Eventtypen in Istanbul | MerrySails",
    description:
      "Vergleichen Sie private Bosporus-Eventseiten für Heiratsanträge, private Dinner, Feiern und Firmenanfragen. Für allgemeinen privaten Jachtcharter beginnen Sie mit Yacht Charter Istanbul.",
    canonicalPath: "/de/private-tours",
    pageTitle: "Private Bosporus-Eventtypen in Istanbul",
    pageDescription:
      "Vergleichen Sie Heiratsantrags-, Privatdinner-, Feier- und Firmen-Bosporus-Eventseiten, ohne unterschiedliche Absichten in denselben Buchungsweg zu zwingen.",
    breadcrumbHome: "Startseite",
    breadcrumbCurrent: "Private Events",
    introHeading: "Beginnen Sie mit Yacht Charter Istanbul für allgemeine private Jacht-Nachfrage",
    introBody:
      "Wenn Sie noch private Jachtgröße, Charterdauer, Route oder Basispakete vergleichen, ist die Hauptseite Yacht Charter Istanbul. Verwenden Sie die untenstehenden Bereiche, wenn die Anfrage bereits auf Heiratsantrag, Dinner, Feier oder Firmenevent eingegrenzt ist.",
    primaryHeading: "Beginnen Sie mit dem richtigen privaten Bosporus-Pfad",
    primaryCards: [
      {
        href: "/yacht-charter-istanbul",
        title: "Yacht Charter Istanbul",
        description: "Für allgemeine private Jachtpakete, Charterstufen, Routenlänge und Basispreise auf dem Bosporus.",
      },
      {
        href: "/boat-rental-hourly-istanbul",
        title: "Stündlicher Bootsverleih",
        description: "Wenn Schiff, kürzere Dauer und stundenbasierte private Vermietung vor einem vollen Charterpaket stehen.",
      },
    ],
    supportHeading: "Private Event-Seiten",
    supportCards: [
      {
        href: "/proposal-yacht-with-photographer-istanbul",
        title: "Heiratsantrag mit Fotograf",
        description: "Antragsplanung mit Fotograf, diskrete Berichterstattung und privatem Bosporus-Setup.",
      },
      {
        href: "/private-dinner-cruise-for-couples-istanbul",
        title: "Privates Dinner für Paare",
        description: "Dinner-orientierte private Jachtplanung für Flitterwochen, Jahrestage und ruhigere Paarabende.",
      },
      {
        href: "/corporate-yacht-dinner-istanbul",
        title: "Firmen-Jachtdinner",
        description: "Dinner-orientierte private Jachtplanung für Firmen, die wissen, dass das Format Dinner-zentriert bleibt.",
      },
      {
        href: "/client-hosting-yacht-istanbul",
        title: "Kundenbewirtung Jacht",
        description: "Geschäftsorientierte Jachtplanung, wenn Gastgeber-Eindruck wichtiger ist als ein breites Event-Label.",
      },
      {
        href: "/team-building-yacht-istanbul",
        title: "Teambuilding Jacht",
        description: "Firmen-Support für Bosporus-Pläne mit Fokus auf Teamverbindung statt eines breiten Firmenbriefings.",
      },
      {
        href: "/private-events",
        title: "Private Feiern",
        description: "Anlassbasiertes Routing für Geburtstage, Jahrestage und breitere Feier-Anfragen, die nicht Dinner-zentriert sind.",
      },
    ],
    ctaHeading: "Welche private Jachtoption passt zu Ihrem Event?",
    ctaBody:
      "Senden Sie Datum, Gästezahl und Anlass. Wir leiten Sie an Jachtcharter, Heiratsantrag, privates Dinner, Firmenevent oder Bootsverleih weiter, ohne die Buchungspfade zu vermischen.",
    ctaButtonCharter: "Jachtcharter vergleichen",
    ctaButtonReservation: "Reservierung",
    openPage: "Seite öffnen",
    viewInEnglish: "English →",
  },
  fr: {
    title: "Types d'événements privés sur le Bosphore à Istanbul | MerrySails",
    description:
      "Comparez les pages d'événements privés pour demandes en mariage, dîners privés, célébrations et demandes d'entreprise. Pour le charter de yacht général, commencez par Yacht Charter Istanbul.",
    canonicalPath: "/fr/private-tours",
    pageTitle: "Types d'événements privés sur le Bosphore à Istanbul",
    pageDescription:
      "Comparez les pages demande en mariage, dîner privé, célébration et événement d'entreprise sans forcer des intentions différentes dans le même chemin de réservation.",
    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "Événements privés",
    introHeading: "Commencez par Yacht Charter Istanbul pour la demande générique de yacht privé",
    introBody:
      "Si vous comparez encore taille de yacht privé, durée du charter, itinéraire ou tarification de base, la page principale est Yacht Charter Istanbul. Utilisez les sections ci-dessous lorsque la demande est déjà restreinte à une demande en mariage, un dîner, une célébration ou un événement d'entreprise.",
    primaryHeading: "Commencez par le bon parcours privé Bosphore",
    primaryCards: [
      {
        href: "/yacht-charter-istanbul",
        title: "Yacht Charter Istanbul",
        description: "Pour forfaits de yacht privé génériques, niveaux de charter, longueur d'itinéraire et tarification de base.",
      },
      {
        href: "/boat-rental-hourly-istanbul",
        title: "Location de bateau à l'heure",
        description: "Quand le bateau, une durée plus courte et la logique de location privée à l'heure passent avant un charter complet.",
      },
    ],
    supportHeading: "Pages d'événements privés",
    supportCards: [
      {
        href: "/proposal-yacht-with-photographer-istanbul",
        title: "Demande en mariage avec photographe",
        description: "Planification de demande en mariage avec photographe, couverture discrète et installation privée sur le Bosphore.",
      },
      {
        href: "/private-dinner-cruise-for-couples-istanbul",
        title: "Dîner privé pour couples",
        description: "Planification de yacht privé axée sur le dîner pour lune de miel, anniversaire et soirées plus calmes en couple.",
      },
      {
        href: "/corporate-yacht-dinner-istanbul",
        title: "Dîner yacht entreprise",
        description: "Planification de yacht privé axée sur le dîner pour entreprises sachant que le format reste centré sur le repas.",
      },
      {
        href: "/client-hosting-yacht-istanbul",
        title: "Yacht hébergement client",
        description: "Planification yacht professionnelle quand l'impression d'accueil compte plus qu'une étiquette d'événement large.",
      },
      {
        href: "/team-building-yacht-istanbul",
        title: "Yacht team building",
        description: "Itinéraire de support entreprise pour plans Bosphore axés sur la connexion d'équipe plutôt qu'un brief corporate large.",
      },
      {
        href: "/private-events",
        title: "Célébrations privées",
        description: "Routing par occasion pour anniversaires, anniversaires de mariage et demandes de célébration non centrées sur le dîner.",
      },
    ],
    ctaHeading: "Quelle option de yacht privé vous convient ?",
    ctaBody:
      "Envoyez la date, le nombre d'invités et l'occasion. Nous vous orienterons vers charter de yacht, demande en mariage, dîner privé, événement d'entreprise ou location de bateau sans mélanger les chemins de réservation.",
    ctaButtonCharter: "Comparer les charters de yacht",
    ctaButtonReservation: "Réservation",
    openPage: "Ouvrir la page",
    viewInEnglish: "English →",
  },
  nl: {
    title: "Privé Bosporus Evenementtypes in Istanbul | MerrySails",
    description:
      "Vergelijk privé Bosporus evenementpagina's voor huwelijksaanzoeken, privédiners, vieringen en zakelijke aanvragen. Voor algemene privé jachtcharter begin met Yacht Charter Istanbul.",
    canonicalPath: "/nl/private-tours",
    pageTitle: "Privé Bosporus Evenementtypes in Istanbul",
    pageDescription:
      "Vergelijk pagina's voor huwelijksaanzoek, privédiner, viering en zakelijk evenement zonder verschillende intenties in hetzelfde boekingstraject te dwingen.",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Privé-evenementen",
    introHeading: "Begin met Yacht Charter Istanbul voor algemene privé jachtvraag",
    introBody:
      "Als u nog jachtgrootte, charterduur, route of basispakketprijzen vergelijkt, is de hoofdpagina Yacht Charter Istanbul. Gebruik de onderstaande secties wanneer de aanvraag al is toegespitst op huwelijksaanzoek, diner, viering of zakelijk evenement.",
    primaryHeading: "Begin met het juiste privé Bosporus-pad",
    primaryCards: [
      {
        href: "/yacht-charter-istanbul",
        title: "Yacht Charter Istanbul",
        description: "Voor algemene privé jachtpakketten, charterklassen, routelengte en basisprijzen op de Bosporus.",
      },
      {
        href: "/boat-rental-hourly-istanbul",
        title: "Boothuur per uur",
        description: "Wanneer het vaartuig, kortere duur en uurgebaseerde privéverhuur eerst komen in plaats van een volledig charterpakket.",
      },
    ],
    supportHeading: "Privé-evenementpagina's",
    supportCards: [
      {
        href: "/proposal-yacht-with-photographer-istanbul",
        title: "Aanzoek met fotograaf",
        description: "Aanzoekplanning met fotograaf, discrete dekking en privé Bosporus-opzet.",
      },
      {
        href: "/private-dinner-cruise-for-couples-istanbul",
        title: "Privédiner voor stellen",
        description: "Diner-eerst privé jachtplanning voor huwelijksreis, jubileum en rustigere koppelavonden.",
      },
      {
        href: "/corporate-yacht-dinner-istanbul",
        title: "Zakelijk jachtdiner",
        description: "Diner-eerst privé jachtplanning voor bedrijven die weten dat de avond diner-georiënteerd blijft.",
      },
      {
        href: "/client-hosting-yacht-istanbul",
        title: "Klanten ontvangen jacht",
        description: "Zakelijke jachtplanning wanneer gastontvangst belangrijker is dan een breed evenementlabel.",
      },
      {
        href: "/team-building-yacht-istanbul",
        title: "Teambuilding jacht",
        description: "Bedrijfsondersteuning voor Bosporus-plannen gericht op teamverbinding in plaats van een brede corporate briefing.",
      },
      {
        href: "/private-events",
        title: "Privévieringen",
        description: "Routing op gelegenheid voor verjaardagen, jubilea en bredere vieringsverzoeken die niet diner-georiënteerd zijn.",
      },
    ],
    ctaHeading: "Welke privé jachtoptie past bij uw evenement?",
    ctaBody:
      "Stuur datum, aantal gasten en gelegenheid. We leiden u naar jachtcharter, aanzoek, privédiner, zakelijk evenement of boothuur zonder de boekingspaden te mengen.",
    ctaButtonCharter: "Jachtcharter vergelijken",
    ctaButtonReservation: "Reservering",
    openPage: "Pagina openen",
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
  const languages = buildHreflang("/private-tours") ?? {
    "x-default": `${SITE_URL}/private-tours`,
    en: `${SITE_URL}/private-tours`,
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

export default async function LocalePrivateToursPage({
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

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: c.pageTitle,
    description: c.pageDescription,
    url: canonicalUrl,
    inLanguage: locale,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="pt-28 pb-20 bg-[var(--surface-alt)]">
        <div className="container-main max-w-6xl">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
            <Link href={`/${locale}`} className="hover:text-[var(--brand-primary)]">
              {c.breadcrumbHome}
            </Link>
            <span>/</span>
            <span className="text-[var(--heading)]">{c.breadcrumbCurrent}</span>
          </nav>

          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--heading)]">{c.pageTitle}</h1>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-lg">{c.pageDescription}</p>
          </div>

          <section className="bg-white rounded-2xl border border-[var(--brand-primary)]/15 p-6 md:p-8 mb-10">
            <h2 className="text-2xl font-bold mb-3 text-[var(--heading)]">{c.introHeading}</h2>
            <p className="text-[var(--body-text)] leading-relaxed">{c.introBody}</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-6 text-[var(--heading)]">{c.primaryHeading}</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {c.primaryCards.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-2xl border border-[var(--line)] bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-[var(--brand-primary)]/30 hover:shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-[var(--heading)] group-hover:text-[var(--brand-primary)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{item.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand-primary)]">
                    {c.openPage} <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-6 text-[var(--heading)]">{c.supportHeading}</h2>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {c.supportCards.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-2xl border border-[var(--line)] bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-[var(--brand-primary)]/30 hover:shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-[var(--heading)] group-hover:text-[var(--brand-primary)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{item.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand-primary)]">
                    {c.openPage} <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link
                href="/private-tours"
                className="inline-flex items-center gap-1 text-sm font-medium text-[var(--brand-primary)] hover:underline"
              >
                {c.viewInEnglish}
              </Link>
            </div>
          </section>

          <section className="rounded-3xl bg-[var(--heading)] p-6 text-white md:p-8">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl">{c.ctaHeading}</h2>
                <p className="max-w-2xl text-sm leading-relaxed text-white/75">{c.ctaBody}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link
                  href={`/${locale}/yacht-charter-istanbul`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[var(--heading)] hover:bg-white/90"
                >
                  {c.ctaButtonCharter} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={`/${locale}/reservation`}
                  className="inline-flex items-center justify-center rounded-xl border border-white/35 px-6 py-3 font-semibold text-white hover:bg-white/10"
                >
                  {c.ctaButtonReservation}
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
