import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/constants";
import { ACTIVE_LOCALES, isActiveLocale, type SiteLocale } from "@/i18n/config";
import { buildHreflang } from "@/lib/hreflang";

export const revalidate = 3600;

export function generateStaticParams() {
  return ACTIVE_LOCALES.filter((l) => l !== "en").map((l) => ({ locale: l }));
}

type LocaleContent = {
  metaTitle: string;
  metaDescription: string;
  canonicalPath: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  heroTitle: string;
  heroDesc: string;
  infoHeading: string;
  infoItems: { title: string; desc: string }[];
  faqHeading: string;
  faqs: { q: string; a: string }[];
  ctaHeading: string;
  ctaDesc: string;
  ctaBtn: string;
  mainPageLabel: string;
};

const TRANSLATIONS: Record<string, LocaleContent> = {
  tr: {
    metaTitle: "Kabataş Akşam Yemeği Turu İstanbul 2026 | Biniş Noktası Desteği | MerrySails",
    metaDescription:
      "Kabataş'tan Boğaz akşam yemeği turu için biniş detayları, varış yönlendirmesi ve Kabataş iskelesi bilgisi. Paylaşımlı akşam yemeği turu zaten seçildiyse buradan başlayın.",
    canonicalPath: "/tr/kabatas-dinner-cruise-istanbul",
    breadcrumbHome: "Ana Sayfa",
    breadcrumbCurrent: "Kabataş Akşam Yemeği Turu",
    heroTitle: "Kabataş Akşam Yemeği Turu İstanbul",
    heroDesc:
      "Paylaşımlı Boğaz akşam yemeği turuna karar verdiyseniz ve Kabataş biniş noktasını, varış süresini veya yönlendirmesini netleştirmeniz gerekiyorsa bu sayfa doğru adres.",
    infoHeading: "Kabataş Binişi Hakkında",
    infoItems: [
      {
        title: "Neden Kabataş?",
        desc: "Paylaşımlı Boğaz akşam yemeği turu Kabataş iskelesi üzerinden çalışır. Dolmabahçe Sarayı yakınındaki bu iskeleye metro ve tramvayla kolayca ulaşabilirsiniz.",
      },
      {
        title: "Biniş saati",
        desc: "Tam biniş saati ve buluşma noktası rezervasyon onayında yazılı olarak paylaşılır. Kapıdan check-in için 15-20 dakika erkenden gelmeniz önerilir.",
      },
      {
        title: "Otel transferi",
        desc: "Seçili merkezi Avrupa yakası otelleri için transfer desteği sağlanabilir. Kesin detaylar rezervasyon akışında netleştirilir.",
      },
    ],
    faqHeading: "Sık Sorulan Sorular",
    faqs: [
      {
        q: "Kabataş iskelesine nasıl gidilir?",
        a: "Metro M2 hattıyla Taksim'den Kabataş'a 5 dakikada ulaşabilirsiniz. T1 tramvayıyla da Kabataş durağında inebilirsiniz. Taksiyle Sultanahmet veya Beyoğlu'ndan yaklaşık 10-15 dakika sürer.",
      },
      {
        q: "Kabataş'ta park yeri var mı?",
        a: "Kabataş çevresinde ücretli otopark mevcuttur ancak akşam saatlerinde doluluk oranı yüksektir. Toplu taşıma tercih edilir.",
      },
      {
        q: "Paylaşımlı akşam yemeği turu ne kadar sürer?",
        a: "Paylaşımlı Boğaz akşam yemeği turu yaklaşık 3,5 saat sürer. Kesin kalkış saati biniş onayında belirtilir.",
      },
    ],
    ctaHeading: "Rezervasyon için iletişime geçin",
    ctaDesc: "Tarih, misafir sayısı ve paket tercihini paylaşın, hızla yanıt alalım.",
    ctaBtn: "WhatsApp ile Planla",
    mainPageLabel: "Tam Akşam Yemeği Turu Sayfasına Git",
  },
  de: {
    metaTitle: "Kabatas Dinner-Kreuzfahrt Istanbul 2026 | Einschiffung Kabatas | MerrySails",
    metaDescription:
      "Kabatas Einschiffungsdetails für die geteilte Bosporus-Dinner-Kreuzfahrt: Ankunftszeit, Treffpunkt und Pier-Orientierung für Istanbul-Gäste.",
    canonicalPath: "/de/kabatas-dinner-cruise-istanbul",
    breadcrumbHome: "Startseite",
    breadcrumbCurrent: "Kabatas Dinner-Kreuzfahrt",
    heroTitle: "Kabatas Dinner-Kreuzfahrt Istanbul",
    heroDesc:
      "Wenn Sie sich bereits für die geteilte Bosporus-Dinner-Kreuzfahrt entschieden haben und Einschiffungsdetails, Ankunftszeiten oder Pier-Orientierung in Kabatas klären möchten, sind Sie hier richtig.",
    infoHeading: "Über die Kabatas-Einschiffung",
    infoItems: [
      {
        title: "Warum Kabatas?",
        desc: "Die geteilte Bosporus-Dinner-Kreuzfahrt nutzt den Kabatas-Pier. Dieser Pier in der Nähe des Dolmabahce-Palastes ist mit Metro und Straßenbahn gut erreichbar.",
      },
      {
        title: "Einschiffungszeit",
        desc: "Die genaue Einschiffungszeit und der Treffpunkt werden nach der Buchung schriftlich mitgeteilt. Es empfiehlt sich, 15-20 Minuten früher anzukommen.",
      },
      {
        title: "Hotel-Transfer",
        desc: "Für ausgewählte zentral gelegene Hotels auf der europäischen Seite kann ein Transfer arrangiert werden. Details werden im Buchungsprozess geklärt.",
      },
    ],
    faqHeading: "Häufige Fragen",
    faqs: [
      {
        q: "Wie komme ich zum Kabatas-Pier?",
        a: "Mit der Metro M2 von Taksim in ca. 5 Minuten oder mit der Straßenbahn T1 bis Haltestelle Kabatas. Vom Sultanahmet oder Beyoglu ca. 10-15 Minuten mit dem Taxi.",
      },
      {
        q: "Gibt es Parkmöglichkeiten in Kabatas?",
        a: "In der Umgebung gibt es kostenpflichtige Parkplätze, die abends jedoch oft besetzt sind. Öffentliche Verkehrsmittel werden empfohlen.",
      },
      {
        q: "Wie lange dauert die Dinner-Kreuzfahrt?",
        a: "Die geteilte Bosporus-Dinner-Kreuzfahrt dauert ca. 3,5 Stunden. Die genaue Abfahrtszeit wird in der Buchungsbestätigung angegeben.",
      },
    ],
    ctaHeading: "Reservierung anfragen",
    ctaDesc: "Teilen Sie Datum, Gästeanzahl und Paketpräferenz mit — wir antworten schnell.",
    ctaBtn: "Via WhatsApp planen",
    mainPageLabel: "Zur vollständigen Dinner-Kreuzfahrt-Seite",
  },
  fr: {
    metaTitle: "Croisière Dîner Kabatas Istanbul 2026 | Embarquement Kabatas | MerrySails",
    metaDescription:
      "Détails d'embarquement à Kabatas pour la croisière dîner partagée sur le Bosphore : heure d'arrivée, point de rendez-vous et orientation au pier pour les visiteurs d'Istanbul.",
    canonicalPath: "/fr/kabatas-dinner-cruise-istanbul",
    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "Croisière Dîner Kabatas",
    heroTitle: "Croisière Dîner au Départ de Kabatas à Istanbul",
    heroDesc:
      "Si vous avez choisi la croisière dîner partagée sur le Bosphore et souhaitez clarifier les détails d'embarquement, d'arrivée ou d'orientation au pier de Kabatas, cette page est pour vous.",
    infoHeading: "À Propos de l'Embarquement à Kabatas",
    infoItems: [
      {
        title: "Pourquoi Kabatas ?",
        desc: "La croisière dîner partagée sur le Bosphore utilise le pier de Kabatas, situé près du Palais de Dolmabahce et facilement accessible en métro et tramway.",
      },
      {
        title: "Heure d'embarquement",
        desc: "L'heure exacte et le point de rendez-vous sont communiqués par écrit après réservation. Il est conseillé d'arriver 15 à 20 minutes en avance.",
      },
      {
        title: "Navette depuis l'hôtel",
        desc: "Un service de navette peut être arrangé pour certains hôtels centraux côté européen. Les détails sont précisés lors du processus de réservation.",
      },
    ],
    faqHeading: "Questions Fréquentes",
    faqs: [
      {
        q: "Comment rejoindre le pier de Kabatas ?",
        a: "Métro M2 depuis Taksim en 5 minutes ou tramway T1 arrêt Kabatas. En taxi depuis Sultanahmet ou Beyoglu, environ 10 à 15 minutes.",
      },
      {
        q: "Y a-t-il un parking à Kabatas ?",
        a: "Des parkings payants sont disponibles à proximité, mais ils sont souvent complets le soir. Les transports en commun sont recommandés.",
      },
      {
        q: "Quelle est la durée de la croisière dîner ?",
        a: "La croisière dîner partagée dure environ 3h30. L'heure de départ exacte est indiquée dans la confirmation de réservation.",
      },
    ],
    ctaHeading: "Demander une réservation",
    ctaDesc: "Partagez la date, le nombre de convives et vos préférences — nous répondons rapidement.",
    ctaBtn: "Planifier via WhatsApp",
    mainPageLabel: "Voir la page complète de la croisière dîner",
  },
  nl: {
    metaTitle: "Kabatas Dinercruise Istanbul 2026 | Instappen Kabatas | MerrySails",
    metaDescription:
      "Instapdetails bij Kabatas voor de gedeelde Bosporus-dinercruise: aankomsttijd, ontmoetingspunt en pier-oriëntatie voor bezoekers van Istanbul.",
    canonicalPath: "/nl/kabatas-dinner-cruise-istanbul",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Kabatas Dinercruise",
    heroTitle: "Dinercruise Vertrek Kabatas Istanbul",
    heroDesc:
      "Als u al heeft gekozen voor de gedeelde Bosporus-dinercruise en de instapdetails, aankomsttijden of pier-oriëntatie bij Kabatas wilt verduidelijken, bent u hier op de juiste plek.",
    infoHeading: "Over het Instappen bij Kabatas",
    infoItems: [
      {
        title: "Waarom Kabatas?",
        desc: "De gedeelde Bosporus-dinercruise vertrekt via de Kabatas-pier, gelegen nabij het Dolmabahce Paleis en goed bereikbaar met metro en tram.",
      },
      {
        title: "Instaptijd",
        desc: "De exacte instaptijd en het ontmoetingspunt worden na boeking schriftelijk bevestigd. Reken op 15-20 minuten eerder aanwezig zijn.",
      },
      {
        title: "Hoteltransfer",
        desc: "Voor geselecteerde centraal gelegen hotels aan de Europese zijde kan transfer-ondersteuning worden geregeld. Details worden bevestigd tijdens het boekingsproces.",
      },
    ],
    faqHeading: "Veelgestelde Vragen",
    faqs: [
      {
        q: "Hoe kom ik bij de Kabatas-pier?",
        a: "Metro M2 vanuit Taksim in ca. 5 minuten, of tram T1 halte Kabatas. Vanuit Sultanahmet of Beyoglu ca. 10-15 minuten met de taxi.",
      },
      {
        q: "Is er parkeergelegenheid bij Kabatas?",
        a: "Er zijn betaalde parkeerplaatsen in de buurt, maar die zijn 's avonds vaak bezet. Openbaar vervoer wordt aanbevolen.",
      },
      {
        q: "Hoe lang duurt de dinercruise?",
        a: "De gedeelde Bosporus-dinercruise duurt ongeveer 3,5 uur. De exacte vertrektijd staat in de boekingsbevestiging.",
      },
    ],
    ctaHeading: "Reservering aanvragen",
    ctaDesc: "Deel de datum, het aantal gasten en uw voorkeur — wij reageren snel.",
    ctaBtn: "Plan via WhatsApp",
    mainPageLabel: "Naar de volledige dinercruise-pagina",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = TRANSLATIONS[locale];
  if (!t) return {};
  const canonicalUrl = `${SITE_URL}${t.canonicalPath}`;
  const languages = buildHreflang("/kabatas-dinner-cruise-istanbul");
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: canonicalUrl, languages },
    openGraph: {
      title: t.metaTitle,
      description: t.metaDescription,
      url: canonicalUrl,
      type: "website",
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
  };
}

export default async function KabatasDinnerCruiseLocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();
  const t = TRANSLATIONS[locale];
  if (!t) notFound();

  return (
    <div className="pt-28 pb-20 bg-[var(--surface-alt)]">
      <div className="container-main">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
          <Link href={`/${locale}`} className="hover:text-[var(--brand-primary)]">{t.breadcrumbHome}</Link>
          <span>/</span>
          <span className="text-[var(--heading)] truncate">{t.breadcrumbCurrent}</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--heading)] mb-4">{t.heroTitle}</h1>
          <p className="max-w-2xl text-base leading-relaxed text-[var(--text-muted)] mb-6">{t.heroDesc}</p>
          <Link href={`/${locale}/istanbul-dinner-cruise`} className="btn-secondary">
            {t.mainPageLabel} →
          </Link>
        </div>

        <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
          <h2 className="text-xl font-bold text-[var(--heading)] mb-5">{t.infoHeading}</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {t.infoItems.map((item) => (
              <div key={item.title} className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
                <h3 className="text-base font-semibold text-[var(--heading)] mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
          <h2 className="text-xl font-bold text-[var(--heading)] mb-4">{t.faqHeading}</h2>
          <div className="space-y-3">
            {t.faqs.map((faq) => (
              <details key={faq.q} className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4 group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[var(--heading)]">
                  {faq.q}
                  <span className="text-[var(--text-muted)] transition-transform group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="rounded-2xl bg-[var(--brand-primary)] p-8 text-center text-white">
          <h2 className="text-xl font-bold text-white mb-2">{t.ctaHeading}</h2>
          <p className="text-white/80 mb-5 text-sm">{t.ctaDesc}</p>
          <a
            href="https://wa.me/905370406822"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-3 font-semibold text-[var(--brand-primary)] hover:bg-gray-50 transition-colors"
          >
            {t.ctaBtn}
          </a>
        </div>
      </div>
    </div>
  );
}
