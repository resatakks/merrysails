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
      "Otelden Transferli Akşam Yemeği Teknesi İstanbul 2026 | MerrySails",
    metaDescription:
      "Boğaz akşam yemeği teknesi için otel transferi: seçili Avrupa yakası merkez bölgelerinden Kabataş'a kadar transfer destekli akşam yemeği rezervasyonu.",
    canonicalPath: "/tr/dinner-cruise-with-hotel-pickup-istanbul",
    breadcrumbHome: "Ana Sayfa",
    breadcrumbCurrent: "Otelden Transferli Akşam Yemeği Teknesi",
    heroTitle: "Otelden Transferli Akşam Yemeği Teknesi İstanbul",
    heroSubtitle:
      "Seçili Avrupa yakası merkez bölgelerinden Kabataş'a transfer destekli paylaşımlı Boğaz akşam yemeği",
    heroDescription:
      "Bu sayfa, paylaşımlı Boğaz akşam yemeği teknesini zaten doğru ürün olarak değerlendirip otelden transferin ana karar noktası olduğu misafirler için hazırlandı. Ana ürün sayfası İstanbul Akşam Yemeği Teknesi olmaya devam eder; bu sayfa otel konumu, sokak erişimi ve Kabataş tarafındaki biniş akışı arasındaki bağlantıyı netleştirir. MerrySails, 2001'den beri TURSAB lisanslı Merry Tourism çatısı altında çalışır.",
    whyHeading: "Otel Transferli Akşam Yemeği Teknesinde Neye Dikkat Edilir?",
    reasons: [
      {
        title: "Konum kontrolü önce yapılır",
        desc: "Transfer; otel adresi, sokak erişimi ve günün operasyon planı incelendikten sonra netleşir. Genel bir şehir vaadi yerine yazılı onay verilir.",
      },
      {
        title: "Avrupa yakası merkez odaklı",
        desc: "Seçili Avrupa yakası bölgeleri ilk uygunluk halkasıdır. Asya yakası genelde doğrudan Kabataş'a varış için yönlendirilir.",
      },
      {
        title: "Aynı paylaşımlı akşam yemeği akışı",
        desc: "Transfer ayrı bir ürün değildir; aynı paylaşımlı akşam yemeği akışına bağlanan operasyonel bir destektir. Ücretlendirme yine paket bazında kalır.",
      },
    ],
    faqHeading: "Sıkça Sorulan Sorular",
    faqs: [
      {
        q: "Her İstanbul akşam yemeği teknesi rezervasyonu için otel transferi garantili midir?",
        a: "Hayır. Transfer; otel adresi, sokak erişimi ve günün operasyon akışı incelendikten sonra yazılı olarak onaylanır. Bazı oteller doğrudan kapı transferi yerine yakın bir buluşma noktasına yönlendirilir.",
      },
      {
        q: "Asya yakasındaki oteller için de aynı destek geçerli midir?",
        a: "Genellikle değil. Asya yakası misafirleri çoğunlukla doğrudan Kabataş tarafına varış için yönlendirilir; standart Avrupa yakası transfer akışına dahil edilmez.",
      },
      {
        q: "Transfer onaylandıktan sonra ne olur?",
        a: "Ekip otelin doğrudan kapı transferi mi yoksa yakın bir buluşma noktası mı kullanacağını teyit eder; ardından sizi Kabataş tarafındaki paylaşımlı akşam yemeği biniş akışına dahil eder.",
      },
      {
        q: "Hangi durumlarda farklı bir sayfayı seçmeliyim?",
        a: "Paketleri karşılaştırmak için ana akşam yemeği sayfasını, akşamın tamamen özel olmasını istiyorsanız özel akşam yemeği teknesini, tekne tipi karar noktanızsa yat kiralama veya tekne kiralama sayfalarını kullanın.",
      },
    ],
    ctaWhatsapp: "WhatsApp'tan Otel Transferini Sor",
    viewInEnglish: "View in English →",
  },
  de: {
    metaTitle:
      "Bosporus Dinner-Cruise mit Hotel-Abholung Istanbul 2026 | MerrySails",
    metaDescription:
      "Bosporus-Dinnercruise mit Hotelabholung: Transfer aus ausgewählten zentralen europäischen Stadtteilen Istanbuls zum Kabataş-Boarding mit schriftlicher Bestätigung.",
    canonicalPath: "/de/dinner-cruise-with-hotel-pickup-istanbul",
    breadcrumbHome: "Startseite",
    breadcrumbCurrent: "Dinner-Cruise mit Hotelabholung",
    heroTitle: "Dinner-Cruise mit Hotel-Abholung Istanbul",
    heroSubtitle:
      "Geteilter Bosporus-Abend mit Transfer aus ausgewählten zentralen europäischen Stadtteilen Richtung Kabataş",
    heroDescription:
      "Diese Seite richtet sich an Gäste, die den geteilten Bosporus-Dinnercruise bereits als das passende Produkt ansehen und für die der Hoteltransfer der entscheidende Faktor ist. Die Hauptseite bleibt Istanbul Dinner-Cruise; hier klären wir, wie Hoteladresse, Straßenzugang und das Kabataş-Boarding zusammenpassen. MerrySails arbeitet seit 2001 unter Merry Tourism mit TURSAB-Lizenz.",
    whyHeading: "Worauf es bei Dinner-Cruise mit Hotelabholung ankommt",
    reasons: [
      {
        title: "Standortprüfung kommt zuerst",
        desc: "Der Transfer wird nach Hoteladresse, Straßenzugang und Tagesplan geprüft und schriftlich bestätigt – kein pauschales Stadt-versprechen.",
      },
      {
        title: "Schwerpunkt zentrale europäische Seite",
        desc: "Ausgewählte zentrale Stadtteile auf der europäischen Seite sind die erste Eignungsstufe. Asiatische Hotels werden meist zur direkten Anreise nach Kabataş geführt.",
      },
      {
        title: "Selber geteilter Dinnerablauf",
        desc: "Der Transfer ist kein eigenes Produkt, sondern operative Unterstützung für denselben geteilten Dinnercruise. Die Preislogik bleibt am Paket.",
      },
    ],
    faqHeading: "Häufig gestellte Fragen",
    faqs: [
      {
        q: "Ist die Hotelabholung für jede Buchung garantiert?",
        a: "Nein. Der Transfer wird nach Hoteladresse, Straßenzugang und Tagesplan geprüft und schriftlich bestätigt. Manche Hotels werden statt Türtransfer einem nahen Treffpunkt zugewiesen.",
      },
      {
        q: "Gilt die Unterstützung auch für Hotels auf der asiatischen Seite?",
        a: "Meist nicht. Gäste auf der asiatischen Seite werden in der Regel zur direkten Anreise nach Kabataş geführt – außerhalb des regulären europäischen Transferflusses.",
      },
      {
        q: "Was passiert, sobald der Transfer bestätigt ist?",
        a: "Wir bestätigen, ob Türabholung möglich ist oder ein nahegelegener Treffpunkt sauberer ist, und führen Sie anschließend in den Kabataş-seitigen Boarding-Ablauf des Dinnercruise.",
      },
      {
        q: "Wann ist eine andere Seite besser?",
        a: "Für reinen Paketvergleich die Haupt-Dinner-Seite, für ein vollständig privates Abendformat den Privaten Dinner-Cruise, und für vessel-first Entscheidungen die Yachtcharter- oder Bootsmiete-Seiten.",
      },
    ],
    ctaWhatsapp: "Hotelabholung per WhatsApp anfragen",
    viewInEnglish: "View in English →",
  },
  fr: {
    metaTitle:
      "Croisière Dîner avec Prise en Charge à l'Hôtel Istanbul 2026 | MerrySails",
    metaDescription:
      "Croisière dîner partagée sur le Bosphore avec prise en charge depuis certains hôtels du centre côté européen vers Kabataş, avec confirmation écrite.",
    canonicalPath: "/fr/dinner-cruise-with-hotel-pickup-istanbul",
    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "Croisière dîner avec prise en charge à l'hôtel",
    heroTitle: "Croisière Dîner avec Prise en Charge à l'Hôtel Istanbul",
    heroSubtitle:
      "Soirée Bosphore partagée avec transfert depuis certains hôtels centraux côté européen vers Kabataş",
    heroDescription:
      "Cette page s'adresse aux clients qui considèrent déjà la croisière dîner partagée comme le bon produit et pour qui le transfert depuis l'hôtel est la question décisive. La page principale reste Istanbul Dinner Cruise ; ici nous clarifions comment l'adresse de l'hôtel, l'accès et l'embarquement à Kabataş se relient. MerrySails opère depuis 2001 sous Merry Tourism, licence TURSAB.",
    whyHeading: "Ce qui compte pour la prise en charge à l'hôtel",
    reasons: [
      {
        title: "Vérification d'adresse en premier",
        desc: "Le transfert est confirmé par écrit après examen de l'adresse, de l'accès rue et du plan opérationnel du jour — pas de promesse générique.",
      },
      {
        title: "Centre côté européen prioritaire",
        desc: "Quelques quartiers centraux côté européen sont la première zone d'éligibilité. Les hôtels côté asiatique sont souvent orientés vers une arrivée directe à Kabataş.",
      },
      {
        title: "Même flux de dîner partagé",
        desc: "Le transfert n'est pas un produit séparé : c'est un soutien opérationnel autour de la même croisière dîner. Le tarif reste lié au forfait.",
      },
    ],
    faqHeading: "Questions fréquentes",
    faqs: [
      {
        q: "La prise en charge à l'hôtel est-elle garantie pour chaque réservation ?",
        a: "Non. Le transfert est confirmé par écrit après examen de l'adresse, de l'accès et du plan du jour. Certains hôtels sont orientés vers un point de rencontre proche plutôt qu'une prise en charge à la porte.",
      },
      {
        q: "Cette aide s'applique-t-elle aux hôtels côté asiatique ?",
        a: "Généralement non. Les clients côté asiatique sont souvent orientés vers une arrivée directe à Kabataş, en dehors du flux de transfert standard côté européen.",
      },
      {
        q: "Que se passe-t-il une fois la prise en charge confirmée ?",
        a: "L'équipe confirme si une prise en charge à la porte est possible ou si un point de rencontre proche est plus net, puis vous fait rejoindre le flux d'embarquement Kabataş.",
      },
      {
        q: "Quand vaut-il mieux choisir une autre page ?",
        a: "Pour comparer les forfaits, utilisez la page principale du dîner ; pour une soirée totalement privée, le dîner privé ; pour une décision orientée bateau, les pages location de yacht ou bateau.",
      },
    ],
    ctaWhatsapp: "Demander la prise en charge sur WhatsApp",
    viewInEnglish: "View in English →",
  },
  nl: {
    metaTitle:
      "Diner-Cruise met Hotel-Pickup Istanbul 2026 | MerrySails",
    metaDescription:
      "Gedeelde Bosporus diner-cruise met hotel-pickup vanuit geselecteerde centrale wijken aan de Europese kant naar Kabataş, met schriftelijke bevestiging.",
    canonicalPath: "/nl/dinner-cruise-with-hotel-pickup-istanbul",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Diner-cruise met hotel-pickup",
    heroTitle: "Diner-Cruise met Hotel-Pickup Istanbul",
    heroSubtitle:
      "Gedeelde Bosporus-avond met transfer vanuit geselecteerde centrale wijken aan de Europese kant richting Kabataş",
    heroDescription:
      "Deze pagina is voor gasten die de gedeelde diner-cruise al als het juiste product zien en voor wie de hotel-pickup de beslissende vraag is. De hoofdpagina blijft Istanbul Dinner Cruise; hier verduidelijken we hoe hoteladres, bereikbaarheid en Kabataş-instap samen werken. MerrySails opereert sinds 2001 onder Merry Tourism met TURSAB-licentie.",
    whyHeading: "Waar het op aankomt bij hotel-pickup",
    reasons: [
      {
        title: "Locatiecheck eerst",
        desc: "De transfer wordt schriftelijk bevestigd na controle van adres, straatbereikbaarheid en dagplanning — geen generieke stadbelofte.",
      },
      {
        title: "Focus op centrale Europese kant",
        desc: "Geselecteerde centrale wijken aan de Europese kant zijn de eerste geschiktheidskring. Aziatische hotels worden meestal direct naar Kabataş geleid.",
      },
      {
        title: "Zelfde gedeelde dinerflow",
        desc: "De pickup is geen apart product, maar operationele ondersteuning binnen dezelfde gedeelde diner-cruise. Het tarief volgt het pakket.",
      },
    ],
    faqHeading: "Veelgestelde vragen",
    faqs: [
      {
        q: "Is hotel-pickup gegarandeerd bij elke boeking?",
        a: "Nee. De transfer wordt schriftelijk bevestigd na controle van hoteladres, bereikbaarheid en dagplanning. Sommige hotels krijgen een nabijgelegen ontmoetingspunt in plaats van deur-pickup.",
      },
      {
        q: "Geldt deze ondersteuning ook voor hotels aan de Aziatische kant?",
        a: "Meestal niet. Gasten aan de Aziatische kant worden vaak direct naar Kabataş geleid, buiten de standaard Europese pickup-flow.",
      },
      {
        q: "Wat gebeurt er na bevestiging van de pickup?",
        a: "Het team bevestigt of een directe deur-pickup mogelijk is of dat een nabijgelegen punt schoner is, en sluit u vervolgens aan op de Kabataş-boarding van de diner-cruise.",
      },
      {
        q: "Wanneer beter een andere pagina kiezen?",
        a: "Voor pakketvergelijking de hoofdpagina diner-cruise, voor een volledig privé-avond de privé diner-cruise, en voor vessel-first keuzes de yachtcharter- of bootverhuurpagina's.",
      },
    ],
    ctaWhatsapp: "Hotel-pickup via WhatsApp opvragen",
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
  const languages = buildHreflang("/dinner-cruise-with-hotel-pickup-istanbul");

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

export default async function LocaleDinnerCruiseHotelPickupPage({
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
    serviceType: "Shared Bosphorus Dinner Cruise Pickup Support",
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
              href="/dinner-cruise-with-hotel-pickup-istanbul"
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
