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
      "Sultanahmet ve Taksim'den Akşam Yemeği Teknesi Transferi 2026 | MerrySails",
    metaDescription:
      "Sultanahmet, Taksim, Sirkeci ve Karaköy bölgelerinden Boğaz akşam yemeği teknesi için transfer desteği. Otel adresine göre yazılı uygunluk onayı.",
    canonicalPath: "/tr/dinner-cruise-pickup-sultanahmet-taksim",
    breadcrumbHome: "Ana Sayfa",
    breadcrumbCurrent: "Sultanahmet ve Taksim'den Akşam Yemeği Teknesi Transferi",
    heroTitle: "Sultanahmet ve Taksim'den Akşam Yemeği Teknesi Transferi",
    heroSubtitle:
      "Sultanahmet, Taksim, Sirkeci ve Karaköy'deki oteller için merkez Boğaz akşam yemeği teknesi transfer desteği",
    heroDescription:
      "Bu sayfa, paylaşımlı Boğaz akşam yemeği teknesini zaten doğru ürün olarak görüp Sultanahmet, Taksim, Sirkeci veya Karaköy'deki bir otelin transfer akışına uygun olup olmadığını netleştirmek isteyen misafirler için hazırlandı. Ana ürün sayfası İstanbul Akşam Yemeği Teknesi olmaya devam eder; bu sayfa yalnızca bölgesel transfer karar noktasını yanıtlar.",
    whyHeading: "Sultanahmet ve Taksim Transferinde Önemli Noktalar",
    reasons: [
      {
        title: "Adres bazlı kontrol",
        desc: "Mahalle adı tek başına yeterli değildir; otel adı, sokak ve erişim koşulları kontrol edilerek transfer yazılı şekilde onaylanır.",
      },
      {
        title: "Yakın buluşma noktası seçeneği",
        desc: "Bazı otellerde araç durmasına izin verilmediği için kapı transferi yerine yakın bir buluşma noktası önerilebilir. Bu, akşam akışını korur.",
      },
      {
        title: "Aynı paylaşımlı akşam yemeği biniş akışı",
        desc: "Transfer ayrı bir ürün değildir; aynı Kabataş tarafı paylaşımlı biniş akışına bağlanan operasyonel bir destektir.",
      },
    ],
    faqHeading: "Sıkça Sorulan Sorular",
    faqs: [
      {
        q: "Sultanahmet'ten akşam yemeği teknesi transferi mümkün mü?",
        a: "Sultanahmet, Avrupa yakasının merkezindeki ilk transfer kontrol bölgelerinden biridir; ancak nihai onay otel adresi, sokak erişimi ve günün operasyon planına göre verilir.",
      },
      {
        q: "Taksim'den de transfer alabilir miyim?",
        a: "Taksim ve Beyoğlu bölgelerindeki birçok otel için transfer veya yakın buluşma noktası desteği değerlendirilebilir. Kapı transferi otelin tam adresine ve günün koşullarına bağlıdır.",
      },
      {
        q: "Karaköy ve Sirkeci'de durum nedir?",
        a: "Karaköy ve Sirkeci yeterince merkezdedir; doğrudan varış, yakın buluşma noktası veya transfer desteği günün akşam planına göre seçilebilir. Yazılı onay her zaman geçerlidir.",
      },
      {
        q: "Asya yakasındaki oteller bu sayfayı kullanmalı mı?",
        a: "Genellikle hayır. Asya yakası misafirleri ilk adımda standart Avrupa yakası transfer akışına dahil edilmez; ayrıca yazılı bir plan oluşturulur.",
      },
    ],
    ctaWhatsapp: "Otel Adresinizle WhatsApp'tan Sorun",
    viewInEnglish: "View in English →",
  },
  de: {
    metaTitle:
      "Dinner-Cruise Abholung Sultanahmet und Taksim 2026 | MerrySails",
    metaDescription:
      "Transferunterstützung für die Bosporus-Dinnercruise aus Sultanahmet, Taksim, Sirkeci und Karaköy. Schriftliche Bestätigung nach Hoteladresse.",
    canonicalPath: "/de/dinner-cruise-pickup-sultanahmet-taksim",
    breadcrumbHome: "Startseite",
    breadcrumbCurrent: "Dinner-Cruise Abholung Sultanahmet und Taksim",
    heroTitle: "Dinner-Cruise Abholung aus Sultanahmet und Taksim",
    heroSubtitle:
      "Transferunterstützung für die Bosporus-Dinnercruise aus zentralen Stadtteilen wie Sultanahmet, Taksim, Sirkeci und Karaköy",
    heroDescription:
      "Diese Seite ist für Gäste, die die geteilte Dinner-Cruise bereits als das passende Produkt sehen und nur klären möchten, ob ein Hotel in Sultanahmet, Taksim, Sirkeci oder Karaköy in den Transferablauf passt. Die Hauptseite bleibt Istanbul Dinner Cruise; hier beantworten wir nur die lokale Transferfrage.",
    whyHeading: "Wichtige Punkte für Transfers aus Sultanahmet und Taksim",
    reasons: [
      {
        title: "Adressbasierte Prüfung",
        desc: "Der Stadtteilname allein reicht nicht. Hotelname, Straße und Zugang werden geprüft und der Transfer wird schriftlich bestätigt.",
      },
      {
        title: "Nahegelegener Treffpunkt als Option",
        desc: "Wenn das Fahrzeug nicht direkt am Hotel halten kann, wird ein naher Treffpunkt empfohlen. So bleibt der Abendablauf sauber.",
      },
      {
        title: "Selber Kabataş-Boarding-Ablauf",
        desc: "Der Transfer ist kein eigenes Produkt, sondern operative Unterstützung, die in denselben Kabataş-seitigen Boarding-Ablauf führt.",
      },
    ],
    faqHeading: "Häufig gestellte Fragen",
    faqs: [
      {
        q: "Ist ein Transfer aus Sultanahmet möglich?",
        a: "Sultanahmet ist eine der ersten Prüfregionen für Transfers im europäischen Zentrum, die endgültige Bestätigung erfolgt aber nach Hoteladresse, Straßenzugang und Tagesplan.",
      },
      {
        q: "Kann ich aus Taksim abgeholt werden?",
        a: "Viele Hotels in Taksim und Beyoğlu können für direkte Abholung oder einen nahen Treffpunkt geprüft werden. Eine Türabholung hängt von der genauen Adresse und Tagesbedingungen ab.",
      },
      {
        q: "Wie sieht es in Karaköy und Sirkeci aus?",
        a: "Karaköy und Sirkeci sind zentral genug. Je nach Abendplan kann direkte Anreise, ein naher Treffpunkt oder Transfer ausgewählt werden – die schriftliche Bestätigung ist maßgeblich.",
      },
      {
        q: "Sollten Hotels auf der asiatischen Seite diese Seite nutzen?",
        a: "Meistens nicht. Gäste auf der asiatischen Seite werden in der Regel nicht in den europäischen Standard-Transferfluss aufgenommen, sondern erhalten eine separate Planung.",
      },
    ],
    ctaWhatsapp: "Hoteladresse per WhatsApp senden",
    viewInEnglish: "View in English →",
  },
  fr: {
    metaTitle:
      "Prise en Charge Croisière Dîner Sultanahmet et Taksim 2026 | MerrySails",
    metaDescription:
      "Support de transfert pour la croisière dîner du Bosphore depuis Sultanahmet, Taksim, Sirkeci et Karaköy. Confirmation écrite selon l'adresse de l'hôtel.",
    canonicalPath: "/fr/dinner-cruise-pickup-sultanahmet-taksim",
    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "Prise en charge croisière dîner Sultanahmet et Taksim",
    heroTitle: "Prise en Charge Croisière Dîner depuis Sultanahmet et Taksim",
    heroSubtitle:
      "Support de transfert pour la croisière dîner du Bosphore depuis les quartiers centraux Sultanahmet, Taksim, Sirkeci et Karaköy",
    heroDescription:
      "Cette page s'adresse aux clients qui considèrent déjà la croisière dîner partagée comme le bon produit et qui veulent uniquement savoir si un hôtel à Sultanahmet, Taksim, Sirkeci ou Karaköy entre dans le flux de transfert. La page principale reste Istanbul Dinner Cruise ; ici nous répondons uniquement à la question locale du transfert.",
    whyHeading: "Points clés pour les transferts depuis Sultanahmet et Taksim",
    reasons: [
      {
        title: "Vérification basée sur l'adresse",
        desc: "Le nom du quartier ne suffit pas. Nom de l'hôtel, rue et accès sont vérifiés, et le transfert est confirmé par écrit.",
      },
      {
        title: "Point de rencontre proche en option",
        desc: "Si le véhicule ne peut pas s'arrêter à la porte de l'hôtel, un point proche est suggéré. Cela maintient un flux d'arrivée fluide.",
      },
      {
        title: "Même flux d'embarquement à Kabataş",
        desc: "Le transfert n'est pas un produit séparé : c'est un support opérationnel qui se connecte au même embarquement Kabataş partagé.",
      },
    ],
    faqHeading: "Questions fréquentes",
    faqs: [
      {
        q: "La prise en charge depuis Sultanahmet est-elle possible ?",
        a: "Sultanahmet est l'une des premières zones de contrôle de transfert au centre côté européen, mais la confirmation finale dépend de l'adresse, de l'accès et du plan opérationnel du jour.",
      },
      {
        q: "Puis-je être pris en charge depuis Taksim ?",
        a: "Beaucoup d'hôtels à Taksim et Beyoğlu peuvent être étudiés pour une prise en charge ou un point proche. La prise en charge à la porte dépend de l'adresse exacte et des conditions du jour.",
      },
      {
        q: "Et à Karaköy et Sirkeci ?",
        a: "Karaköy et Sirkeci sont assez centraux. Selon le plan du soir, arrivée directe, point proche ou transfert peuvent être proposés – la confirmation écrite fait foi.",
      },
      {
        q: "Les hôtels côté asiatique doivent-ils utiliser cette page ?",
        a: "Généralement non. Les clients côté asiatique ne sont habituellement pas inclus dans le flux de transfert standard côté européen ; un plan séparé est mis en place.",
      },
    ],
    ctaWhatsapp: "Envoyer l'adresse de l'hôtel sur WhatsApp",
    viewInEnglish: "View in English →",
  },
  nl: {
    metaTitle:
      "Diner-Cruise Pickup Sultanahmet en Taksim 2026 | MerrySails",
    metaDescription:
      "Transferondersteuning voor de Bosporus diner-cruise vanuit Sultanahmet, Taksim, Sirkeci en Karaköy. Schriftelijke bevestiging per hoteladres.",
    canonicalPath: "/nl/dinner-cruise-pickup-sultanahmet-taksim",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Diner-cruise pickup Sultanahmet en Taksim",
    heroTitle: "Diner-Cruise Pickup vanuit Sultanahmet en Taksim",
    heroSubtitle:
      "Transferondersteuning voor de Bosporus diner-cruise vanuit centrale wijken Sultanahmet, Taksim, Sirkeci en Karaköy",
    heroDescription:
      "Deze pagina is voor gasten die de gedeelde diner-cruise al als juiste product zien en alleen willen weten of een hotel in Sultanahmet, Taksim, Sirkeci of Karaköy past in de transferflow. De hoofdpagina blijft Istanbul Dinner Cruise; hier beantwoorden we enkel de lokale transfervraag.",
    whyHeading: "Belangrijkste punten voor pickup uit Sultanahmet en Taksim",
    reasons: [
      {
        title: "Adresgebaseerde controle",
        desc: "De wijknaam alleen volstaat niet. Hotelnaam, straat en bereikbaarheid worden gecontroleerd en de transfer wordt schriftelijk bevestigd.",
      },
      {
        title: "Nabijgelegen ontmoetingspunt als optie",
        desc: "Als het voertuig niet direct bij het hotel kan stoppen, wordt een nabijgelegen punt voorgesteld. Dat houdt de avondflow soepel.",
      },
      {
        title: "Zelfde Kabataş-boarding-flow",
        desc: "De pickup is geen apart product, maar operationele ondersteuning die uitkomt op dezelfde gedeelde Kabataş-boarding.",
      },
    ],
    faqHeading: "Veelgestelde vragen",
    faqs: [
      {
        q: "Is pickup vanuit Sultanahmet mogelijk?",
        a: "Sultanahmet is een van de eerste controlegebieden voor transfers aan de centrale Europese kant, maar de definitieve bevestiging hangt af van hoteladres, straatbereikbaarheid en de dagplanning.",
      },
      {
        q: "Kan ik vanuit Taksim worden opgehaald?",
        a: "Veel hotels in Taksim en Beyoğlu kunnen worden beoordeeld voor pickup of een nabijgelegen punt. Deur-pickup hangt af van het exacte adres en dagomstandigheden.",
      },
      {
        q: "Hoe zit het met Karaköy en Sirkeci?",
        a: "Karaköy en Sirkeci zijn voldoende centraal. Afhankelijk van het avondplan kan directe aankomst, een nabijgelegen punt of een transfer worden gekozen – de schriftelijke bevestiging is leidend.",
      },
      {
        q: "Moeten hotels aan de Aziatische kant deze pagina gebruiken?",
        a: "Meestal niet. Gasten aan de Aziatische kant worden gewoonlijk niet opgenomen in de standaard Europese transferflow; er wordt een aparte planning gemaakt.",
      },
    ],
    ctaWhatsapp: "Hoteladres via WhatsApp sturen",
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
  const languages = buildHreflang("/dinner-cruise-pickup-sultanahmet-taksim");

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

export default async function LocaleDinnerCruisePickupSultanahmetTaksimPage({
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
    areaServed: [
      { "@type": "Place", name: "Sultanahmet, Istanbul" },
      { "@type": "Place", name: "Taksim, Istanbul" },
      { "@type": "Place", name: "Sirkeci, Istanbul" },
      { "@type": "Place", name: "Karaköy, Istanbul" },
    ],
    serviceType: "Bosphorus Dinner Cruise Pickup Area Support",
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
              href="/dinner-cruise-pickup-sultanahmet-taksim"
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
