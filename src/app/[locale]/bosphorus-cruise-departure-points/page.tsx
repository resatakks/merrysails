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
  flowsHeading: string;
  flows: { title: string; eyebrow: string; desc: string; href: string; label: string }[];
  faqHeading: string;
  faqs: { q: string; a: string }[];
  ctaLabel: string;
};

const TRANSLATIONS: Record<string, LocaleContent> = {
  tr: {
    metaTitle: "İstanbul Boğaz Turu Kalkış Noktaları 2026 | MerrySails",
    metaDescription:
      "Boğaz turu kalkış noktaları: akşam yemeği turu için Kabataş, gün batımı turu için Karaköy buluşma noktası, özel yat için Kurucesme marinası.",
    canonicalPath: "/tr/bosphorus-cruise-departure-points",
    breadcrumbHome: "Ana Sayfa",
    breadcrumbCurrent: "Boğaz Turu Kalkış Noktaları",
    heroTitle: "İstanbul Boğaz Turu Kalkış Noktaları",
    heroDesc:
      "Hangi turda hangi iskeleten kalktığınızı öğrenin: paylaşımlı akşam yemeği turu için Kabataş, gün batımı turu için Karaköy buluşma noktası, özel yat için Kurucesme marinası.",
    flowsHeading: "Ürüne Göre Kalkış Noktası",
    flows: [
      {
        title: "Kabataş — Akşam Yemeği Turu",
        eyebrow: "Paylaşımlı akşam yemeği",
        desc: "Paylaşımlı Boğaz akşam yemeği turu Kabataş iskele akışını kullanır; seçili Avrupa yakası otel transfer desteğiyle birleştirilir.",
        href: "/istanbul-dinner-cruise",
        label: "Akşam Yemeği Turuna Git",
      },
      {
        title: "Karaköy / Buluşma Noktası — Gün Batımı Turu",
        eyebrow: "Paylaşımlı gün batımı",
        desc: "Paylaşımlı gün batımı turu genellikle rezervasyon onayında paylaşılan Karaköy tarafı buluşma noktası ile çalışır.",
        href: "/cruises/bosphorus-sunset-cruise",
        label: "Gün Batımı Turuna Git",
      },
      {
        title: "Kurucesme Marinası — Özel Yat",
        eyebrow: "Özel yat kiralama",
        desc: "Özel yat kiralama ve özel Boğaz gezileri seçilen tekne ve rezervasyon akışına göre onaylanan marina kalkış noktalarından hareket eder.",
        href: "/yacht-charter-istanbul",
        label: "Yat Kiralamasına Git",
      },
    ],
    faqHeading: "Sık Sorulan Sorular",
    faqs: [
      {
        q: "Boğaz turu için nereden kalkılıyor?",
        a: "Kalkış noktası tura göre değişir: paylaşımlı akşam yemeği turu için Kabataş, paylaşımlı gün batımı turu için Karaköy buluşma noktası, özel yat için ise rezervasyon akışında onaylanan marina.",
      },
      {
        q: "Otelden alım yapılıyor mu?",
        a: "Seçili merkezi Avrupa yakası otelleri için transfer desteği sağlanabilir. Kesin detaylar rezervasyon sonrası yazılı olarak paylaşılır.",
      },
      {
        q: "Kabataş nerede?",
        a: "Kabataş, Beşiktaş ile Karaköy arasında, Dolmabahçe Sarayı'na yürüme mesafesinde bir Avrupa yakası iskelesidir. Metro ve tramvayla ulaşım oldukça kolaydır.",
      },
    ],
    ctaLabel: "Rezervasyon için WhatsApp",
  },
  de: {
    metaTitle: "Bosporus Kreuzfahrt Abfahrtsorte Istanbul 2026 | MerrySails",
    metaDescription:
      "Abfahrtsorte für Bosporus-Kreuzfahrten: Kabatas für Dinner-Kreuzfahrten, Karakoy-Treffpunkt für Sunset-Touren, Kurucesme-Marina für Privatyachten.",
    canonicalPath: "/de/bosphorus-cruise-departure-points",
    breadcrumbHome: "Startseite",
    breadcrumbCurrent: "Abfahrtsorte Bosporus-Kreuzfahrt",
    heroTitle: "Abfahrtsorte für Bosporus-Kreuzfahrten in Istanbul",
    heroDesc:
      "Erfahren Sie, von welchem Ort welche Kreuzfahrt abfährt: Kabatas für Dinner-Kreuzfahrten, Karakoy-Treffpunkt für Sunset-Touren, Kurucesme-Marina für Privatyachten.",
    flowsHeading: "Abfahrtsort nach Produkt",
    flows: [
      {
        title: "Kabatas — Dinner-Kreuzfahrt",
        eyebrow: "Geteilte Dinner-Kreuzfahrt",
        desc: "Die geteilte Bosporus-Dinner-Kreuzfahrt nutzt die Kabatas-Abfahrtslogik, oft kombiniert mit Hotel-Abholsupport auf der europäischen Seite.",
        href: "/istanbul-dinner-cruise",
        label: "Zur Dinner-Kreuzfahrt",
      },
      {
        title: "Karakoy / Treffpunkt — Sunset-Kreuzfahrt",
        eyebrow: "Geteilte Sunset-Tour",
        desc: "Die geteilte Sunset-Kreuzfahrt arbeitet üblicherweise mit einem Karakoy-seitigen Treffpunkt, der nach der Reservierung mitgeteilt wird.",
        href: "/cruises/bosphorus-sunset-cruise",
        label: "Zur Sunset-Kreuzfahrt",
      },
      {
        title: "Kurucesme-Marina — Privatyacht",
        eyebrow: "Private Yacht-Charter",
        desc: "Privatyacht-Charter und private Bosporus-Touren starten von einer nach Buchung bestätigten Marina.",
        href: "/yacht-charter-istanbul",
        label: "Zur Yacht-Charter",
      },
    ],
    faqHeading: "Häufige Fragen",
    faqs: [
      {
        q: "Von wo fahren Bosporus-Kreuzfahrten ab?",
        a: "Der Abfahrtsort hängt vom Produkt ab: Kabatas für Dinner-Kreuzfahrten, Karakoy-Treffpunkt für Sunset-Touren, bestätigte Marina für Privatyachten.",
      },
      {
        q: "Wird ein Hoteltransfer angeboten?",
        a: "Für ausgewählte zentral gelegene Hotels auf der europäischen Seite kann Transfer-Support arrangiert werden. Details werden nach der Buchung schriftlich mitgeteilt.",
      },
      {
        q: "Wo liegt Kabatas?",
        a: "Kabatas ist ein Pier auf der europäischen Seite zwischen Besiktas und Karakoy, fußläufig vom Dolmabahce-Palast. Metro und Straßenbahn sind in der Nähe.",
      },
    ],
    ctaLabel: "WhatsApp für Reservierung",
  },
  fr: {
    metaTitle: "Points de Départ Croisière Bosphore Istanbul 2026 | MerrySails",
    metaDescription:
      "Points de départ croisière Bosphore : Kabatas pour le dîner-croisière, point de rendez-vous Karakoy pour le coucher de soleil, marina Kurucesme pour les yachts privés.",
    canonicalPath: "/fr/bosphorus-cruise-departure-points",
    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "Points de Départ",
    heroTitle: "Points de Départ des Croisières sur le Bosphore à Istanbul",
    heroDesc:
      "Découvrez d'où part chaque croisière : Kabatas pour le dîner-croisière partagé, Karakoy pour la croisière coucher de soleil, et la marina Kurucesme pour les yachts privés.",
    flowsHeading: "Point de Départ par Produit",
    flows: [
      {
        title: "Kabatas — Dîner-Croisière",
        eyebrow: "Dîner-croisière partagé",
        desc: "La croisière dîner partagée sur le Bosphore utilise l'embarquement côté Kabatas, souvent avec un service de navette hôtel.",
        href: "/istanbul-dinner-cruise",
        label: "Voir le Dîner-Croisière",
      },
      {
        title: "Karakoy / Point de Rendez-vous — Coucher de Soleil",
        eyebrow: "Croisière coucher de soleil",
        desc: "La croisière coucher de soleil partagée fonctionne avec un point de rendez-vous côté Karakoy confirmé après réservation.",
        href: "/cruises/bosphorus-sunset-cruise",
        label: "Voir la Croisière Coucher de Soleil",
      },
      {
        title: "Marina Kurucesme — Yacht Privé",
        eyebrow: "Location de yacht privé",
        desc: "Les charters de yachts privés partent d'une marina confirmée selon le yacht sélectionné et le processus de réservation.",
        href: "/yacht-charter-istanbul",
        label: "Voir le Charter de Yacht",
      },
    ],
    faqHeading: "Questions Fréquentes",
    faqs: [
      {
        q: "D'où partent les croisières sur le Bosphore ?",
        a: "Le point de départ dépend du produit : Kabatas pour le dîner-croisière, Karakoy pour le coucher de soleil, marina confirmée pour les yachts privés.",
      },
      {
        q: "Y a-t-il un service de navette depuis l'hôtel ?",
        a: "Un support de navette peut être arrangé pour certains hôtels centraux côté européen. Les détails sont confirmés par écrit après réservation.",
      },
      {
        q: "Où se trouve Kabatas ?",
        a: "Kabatas est un embarcadère côté européen entre Besiktas et Karakoy, à distance de marche du Palais de Dolmabahce. Métro et tramway à proximité.",
      },
    ],
    ctaLabel: "WhatsApp pour Réservation",
  },
  nl: {
    metaTitle: "Bosporus Cruise Vertrekpunten Istanbul 2026 | MerrySails",
    metaDescription:
      "Vertrekpunten voor Bosporus-cruises: Kabatas voor diner-cruises, Karakoy-ontmoetingspunt voor zonsondergangstouren, Kurucesme-marina voor privéjachten.",
    canonicalPath: "/nl/bosphorus-cruise-departure-points",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Vertrekpunten Bosporus Cruise",
    heroTitle: "Vertrekpunten voor Bosporus-Cruises in Istanbul",
    heroDesc:
      "Ontdek van welk punt welke cruise vertrekt: Kabatas voor dinercruises, Karakoy voor zonsondergangstouren en de Kurucesme-marina voor privéjachten.",
    flowsHeading: "Vertrekpunt per Product",
    flows: [
      {
        title: "Kabatas — Dinercruise",
        eyebrow: "Gedeelde dinercruise",
        desc: "De gedeelde Bosporus-dinercruise vertrekt via Kabatas, vaak gecombineerd met hoteltransfer-ondersteuning aan de Europese zijde.",
        href: "/istanbul-dinner-cruise",
        label: "Naar Dinercruise",
      },
      {
        title: "Karakoy / Ontmoetingspunt — Zonsondergang",
        eyebrow: "Gedeelde zonsondergangs-cruise",
        desc: "De gedeelde zonsondergangs-cruise werkt met een Karakoy-ontmoetingspunt dat na reservering wordt bevestigd.",
        href: "/cruises/bosphorus-sunset-cruise",
        label: "Naar Zonsondergangs-cruise",
      },
      {
        title: "Kurucesme-marina — Privéjacht",
        eyebrow: "Privé jachtcharter",
        desc: "Privé jachtcharters en privé Bosporus-tochten vertrekken vanuit een na boeking bevestigde marina.",
        href: "/yacht-charter-istanbul",
        label: "Naar Jachtcharter",
      },
    ],
    faqHeading: "Veelgestelde Vragen",
    faqs: [
      {
        q: "Vanwaar vertrekken Bosporus-cruises?",
        a: "Het vertrekpunt hangt af van het product: Kabatas voor dinercruises, Karakoy voor zonsondergangstouren, bevestigde marina voor privéjachten.",
      },
      {
        q: "Is er een hoteltransfer beschikbaar?",
        a: "Voor geselecteerde centraal gelegen hotels aan de Europese zijde kan transfer-ondersteuning worden geregeld. Details worden na boeking schriftelijk bevestigd.",
      },
      {
        q: "Waar ligt Kabatas?",
        a: "Kabatas is een aanlegsteiger aan de Europese zijde tussen Besiktas en Karakoy, op loopafstand van Dolmabahce Paleis. Metro en tram zijn nabij.",
      },
    ],
    ctaLabel: "WhatsApp voor Reservering",
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
  const languages = buildHreflang("/bosphorus-cruise-departure-points");
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

export default async function BosphorusDeparturePointsLocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();
  const t = TRANSLATIONS[locale];
  if (!t) notFound();

  const canonicalUrl = `${SITE_URL}${t.canonicalPath}`;
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t.heroTitle,
    description: t.heroDesc,
    url: canonicalUrl,
    inLanguage: locale,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <div className="pt-28 pb-20 bg-[var(--surface-alt)]">
        <div className="container-main">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
            <Link href={`/${locale}`} className="hover:text-[var(--brand-primary)]">{t.breadcrumbHome}</Link>
            <span>/</span>
            <span className="text-[var(--heading)] truncate">{t.breadcrumbCurrent}</span>
          </nav>

          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--heading)] mb-4">{t.heroTitle}</h1>
            <p className="max-w-2xl text-base leading-relaxed text-[var(--text-muted)]">{t.heroDesc}</p>
          </div>

          <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-xl font-bold text-[var(--heading)] mb-5">{t.flowsHeading}</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {t.flows.map((flow) => (
                <div key={flow.href} className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)] mb-1">{flow.eyebrow}</p>
                  <h3 className="text-base font-semibold text-[var(--heading)] mb-2">{flow.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)] mb-3">{flow.desc}</p>
                  <Link href={`/${locale}${flow.href}`} className="text-sm font-semibold text-[var(--brand-primary)] hover:underline">
                    {flow.label} →
                  </Link>
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
            <a
              href="https://wa.me/905370406822"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-3 font-semibold text-[var(--brand-primary)] hover:bg-gray-50 transition-colors"
            >
              {t.ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
