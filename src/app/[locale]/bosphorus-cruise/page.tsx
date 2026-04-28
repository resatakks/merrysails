import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/constants";
import { isActiveLocale, type SiteLocale } from "@/i18n/config";

export const revalidate = 3600;

const CONTENT: Record<string, {
  title: string;
  description: string;
  canonicalPath: string;
  h1: string;
  subtitle: string;
  intro: string;
  trustBadge: string;
  ctaLabel: string;
  compareSectionTitle: string;
  compareItems: { title: string; desc: string }[];
  tourOptions: { slug: string; title: string; price: string; duration: string; tag: string; desc: string }[];
}> = {
  tr: {
    title: "Boğaz Turu İstanbul 2026 | Gün Batımı ve Akşam Yemeği Turları | MerrySails",
    description: "İstanbul Boğaz turu seçeneklerini karşılaştırın: €34 gün batımı turu, €30 akşam yemeği turu ve €280 özel yat kiralama. TÜRSAB lisanslı, doğrudan rezervasyon.",
    canonicalPath: "/tr/bosphorus-cruise",
    h1: "Boğaz Turu İstanbul",
    subtitle: "MerrySails İstanbul",
    intro: "İstanbul Boğazı'nda tekne turunu doğru seçin. Üç ana seçenek: gün batımı turu, akşam yemeği turu ve özel yat kiralama. Fiyatları ve kapsamları karşılaştırın, sonra rezervasyon yapın.",
    trustBadge: "TÜRSAB A Grubu lisanslı · 2001'den bu yana · 50.000+ misafir",
    ctaLabel: "Detaylar ve rezervasyon →",
    compareSectionTitle: "Boğaz Turu Seçerken Nelere Dikkat Edilmeli?",
    compareItems: [
      { title: "Süre ve bütçe", desc: "2 saatlik hafif deneyim için gün batımı turu (€34), tam akşam programı için yemekli tur (€30–€90), tam özel için yat kiralama (€280+)." },
      { title: "Özel mi, paylaşımlı mı?", desc: "Gün batımı ve akşam yemeği turları paylaşımlı teknelerdir. Evlilik teklifi, kutlama veya grup etkinliği için özel yat kiralama tercih edin." },
      { title: "Rezervasyon zamanlaması", desc: "Yaz sezonunda (Mayıs–Eylül) popüler tarihler çabuk dolar. En az 3–5 gün öncesinden rezervasyon yapmanız önerilir." },
    ],
    tourOptions: [
      { slug: "sunset", title: "Boğaz Gün Batımı Turu", price: "€34", duration: "2 saat", tag: "En çok tercih edilen", desc: "İki seçenek: Şarapsız €34, Şaraplı €40. Altın saat manzarası, canlı rehber ve hafif ikramlar dahil." },
      { slug: "dinner", title: "İstanbul Akşam Yemeği Turu", price: "€30", duration: "3,5 saat", tag: "4 paket seçeneği", desc: "€30'dan €90'a kadar 4 paket. Türk gecesi eğlencesi, akşam yemeği ve otel transfer desteği." },
      { slug: "yacht", title: "Özel Yat Kiralama", price: "€280", duration: "2+ saat", tag: "Tam özel", desc: "Tüm tekne size özel. Evlilik teklifi, doğum günü ve kurumsal etkinlikler için idealdir." },
      { slug: "boat", title: "Tekne Kiralama", price: "Saatlik", duration: "Esnek", tag: "Önce tekne seçin", desc: "Tekne ve güzergahı önce belirleyin, akşam yemeği veya gün batımı ekstralarını sonra ekleyin." },
    ],
  },
  de: {
    title: "Bosporus Kreuzfahrt Istanbul 2026 | Sonnenuntergang & Dinner | MerrySails",
    description: "Bosporus Kreuzfahrt Istanbul vergleichen: Sonnenuntergang ab €34, Dinner ab €30, Privat-Jacht ab €280. TÜRSAB-lizenziert seit 2001. Direkt buchen ohne Aufpreis.",
    canonicalPath: "/de/bosphorus-cruise",
    h1: "Bosporus Kreuzfahrt Istanbul",
    subtitle: "MerrySails Istanbul",
    intro: "Vergleichen Sie die Bosporus-Kreuzfahrtoptionen in Istanbul: Sonnenuntergangskreuzfahrt, Dinner-Kreuzfahrt und private Jachtcharter. Finden Sie das passende Angebot und buchen Sie direkt.",
    trustBadge: "TÜRSAB A-Gruppe lizenziert · seit 2001 · 50.000+ Gäste",
    ctaLabel: "Details & Buchung →",
    compareSectionTitle: "Worauf sollten Sie bei einer Bosporus-Kreuzfahrt achten?",
    compareItems: [
      { title: "Dauer und Budget", desc: "Sonnenuntergangskreuzfahrt (€34) für 2 Std. leichtes Erlebnis, Dinner-Kreuzfahrt (€30–€90) für einen vollständigen Abend, Jachtcharter (€280+) für volle Privatsphäre." },
      { title: "Privat oder geteilt?", desc: "Sonnenuntergangs- und Dinner-Kreuzfahrten sind geteilte Boote. Für Heiratsanträge, Feiern oder Gruppenevents empfehlen wir eine private Jacht." },
      { title: "Buchungszeitpunkt", desc: "In der Hochsaison (Mai–September) sind beliebte Termine schnell ausgebucht. Wir empfehlen eine Buchung mindestens 3–5 Tage im Voraus." },
    ],
    tourOptions: [
      { slug: "sunset", title: "Bosporus Sonnenuntergang-Kreuzfahrt", price: "€34", duration: "2 Std.", tag: "Beliebteste Option", desc: "Zwei Optionen: Ohne Wein €34, Mit Wein €40. Goldstunden-Panorama, Live-Guide und Erfrischungen inklusive." },
      { slug: "dinner", title: "Istanbul Dinner Cruise", price: "€30", duration: "3,5 Std.", tag: "4 Pakete", desc: "4 Pakete von €30 bis €90. Türkische Nachtshow, Abendessen und Hoteltransfer verfügbar." },
      { slug: "yacht", title: "Privater Jachtcharter", price: "€280", duration: "2+ Std.", tag: "Vollständig privat", desc: "Das gesamte Boot gehört Ihnen. Ideal für Heiratsantrag, Geburtstag und Firmenevents." },
      { slug: "boat", title: "Bootsverleih Istanbul", price: "Stündlich", duration: "Flexibel", tag: "Boot zuerst wählen", desc: "Wählen Sie zuerst das Boot und die Route, fügen Sie dann Dinner oder Sonnenuntergangs-Extras hinzu." },
    ],
  },
  fr: {
    title: "Croisière Bosphore Istanbul 2026 | Coucher de Soleil & Dîner | MerrySails",
    description: "Comparez les croisières Bosphore à Istanbul: coucher de soleil dès €34, dîner dès €30, yacht privé dès €280. Agence certifiée TÜRSAB depuis 2001. Réservez directement.",
    canonicalPath: "/fr/bosphorus-cruise",
    h1: "Croisière Bosphore Istanbul",
    subtitle: "MerrySails Istanbul",
    intro: "Comparez les options de croisière sur le Bosphore à Istanbul : croisière coucher de soleil, croisière dîner et charter de yacht privé. Trouvez l'offre adaptée et réservez directement.",
    trustBadge: "Certifié TÜRSAB groupe A · depuis 2001 · 50 000+ invités",
    ctaLabel: "Détails et réservation →",
    compareSectionTitle: "Comment choisir votre croisière sur le Bosphore ?",
    compareItems: [
      { title: "Durée et budget", desc: "Coucher de soleil (€34) pour 2h d'expérience légère, dîner-croisière (€30–€90) pour une soirée complète, charter de yacht (€280+) pour l'intimité totale." },
      { title: "Privé ou partagé ?", desc: "Les croisières coucher de soleil et dîner sont sur des bateaux partagés. Pour une demande en mariage, une fête ou un événement de groupe, optez pour un yacht privé." },
      { title: "Quand réserver ?", desc: "En haute saison (mai–septembre), les dates populaires se remplissent vite. Nous recommandons de réserver au moins 3–5 jours à l'avance." },
    ],
    tourOptions: [
      { slug: "sunset", title: "Croisière Coucher de Soleil Bosphore", price: "€34", duration: "2h", tag: "Option la plus populaire", desc: "Deux options: Sans vin €34, Avec vin €40. Vue panoramique dorée, guide live et rafraîchissements inclus." },
      { slug: "dinner", title: "Croisière Dîner Istanbul", price: "€30", duration: "3h30", tag: "4 formules", desc: "4 formules de €30 à €90. Spectacle de nuit turc, dîner et transfert hôtel disponibles." },
      { slug: "yacht", title: "Charter de Yacht Privé", price: "€280", duration: "2h+", tag: "Entièrement privé", desc: "Le bateau entier vous appartient. Idéal pour demande en mariage, anniversaire et événements d'entreprise." },
      { slug: "boat", title: "Location de Bateau Istanbul", price: "À l'heure", duration: "Flexible", desc: "Choisissez d'abord le bateau et l'itinéraire, puis ajoutez des extras dîner ou coucher de soleil.", tag: "Bateau d'abord" },
    ],
  },
  nl: {
    title: "Bosporus Cruise Istanbul 2026 | Zonsondergang & Diner | MerrySails",
    description: "Vergelijk Bosporus cruises in Istanbul: zonsondergang vanaf €34, diner vanaf €30, privéjacht vanaf €280. TÜRSAB-gecertificeerd sinds 2001. Boek direct.",
    canonicalPath: "/nl/bosphorus-cruise",
    h1: "Bosporus Cruise Istanbul",
    subtitle: "MerrySails Istanbul",
    intro: "Vergelijk Bosporus cruiseopties in Istanbul: zonsondergang cruise, diner cruise en privé jachtcharter. Vind het juiste aanbod en boek direct.",
    trustBadge: "TÜRSAB A-groep gecertificeerd · sinds 2001 · 50.000+ gasten",
    ctaLabel: "Details en boeking →",
    compareSectionTitle: "Waar moet u op letten bij een Bosporus cruise?",
    compareItems: [
      { title: "Duur en budget", desc: "Zonsondergang cruise (€34) voor 2 uur lichte ervaring, diner cruise (€30–€90) voor een volledige avond, jachtcharter (€280+) voor volledige privacy." },
      { title: "Privé of gedeeld?", desc: "Zonsondergang- en dinercruises zijn op gedeelde boten. Voor huwelijksaanzoeken, feesten of groepsevenementen raden wij een privéjacht aan." },
      { title: "Wanneer boeken?", desc: "In het hoogseizoen (mei–september) zijn populaire data snel vol. We raden aan minimaal 3–5 dagen van tevoren te boeken." },
    ],
    tourOptions: [
      { slug: "sunset", title: "Bosporus Zonsondergang Cruise", price: "€34", duration: "2 uur", tag: "Meest populair", desc: "Twee opties: Zonder wijn €34, Met wijn €40. Gouden uur panorama, live gids en versnaperingen inbegrepen." },
      { slug: "dinner", title: "Istanbul Diner Cruise", price: "€30", duration: "3,5 uur", tag: "4 pakketten", desc: "4 pakketten van €30 tot €90. Turkse avondshow, diner en hotelophaal beschikbaar." },
      { slug: "yacht", title: "Privé Jachtcharter", price: "€280", duration: "2+ uur", tag: "Volledig privé", desc: "De hele boot voor u alleen. Ideaal voor huwelijksaanzoek, verjaardag en bedrijfsevenementen." },
      { slug: "boat", title: "Boothuur Istanbul", price: "Per uur", duration: "Flexibel", tag: "Boot eerst kiezen", desc: "Kies eerst de boot en route, voeg dan diner of zonsondergang-extras toe." },
    ],
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

  return {
    title: c.title,
    description: c.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "x-default": `${SITE_URL}/bosphorus-cruise`,
        en: `${SITE_URL}/bosphorus-cruise`,
        [locale]: canonicalUrl,
      },
    },
    openGraph: {
      title: c.title,
      description: c.description,
      url: canonicalUrl,
      type: "website",
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: c.h1 }],
    },
  };
}

const ROUTE_MAP: Record<string, Record<string, string>> = {
  sunset: { tr: "/tr/cruises/bosphorus-sunset-cruise", de: "/de/cruises/bosphorus-sunset-cruise", fr: "/fr/cruises/bosphorus-sunset-cruise", nl: "/nl/cruises/bosphorus-sunset-cruise" },
  dinner: { tr: "/tr/istanbul-dinner-cruise", de: "/de/istanbul-dinner-cruise", fr: "/fr/istanbul-dinner-cruise", nl: "/nl/istanbul-dinner-cruise" },
  yacht: { tr: "/tr/yacht-charter-istanbul", de: "/de/yacht-charter-istanbul", fr: "/fr/yacht-charter-istanbul", nl: "/nl/yacht-charter-istanbul" },
  boat: { tr: "/tr/boat-rental-istanbul", de: "/de/boat-rental-istanbul", fr: "/fr/boat-rental-istanbul", nl: "/nl/boat-rental-istanbul" },
};

export default async function LocaleBosphorusCruisePage({
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
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: c.h1, item: canonicalUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="pt-28 pb-20 bg-[var(--surface-alt)]">
        <div className="container-main">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
            <Link href={`/${locale}`} className="hover:text-[var(--brand-primary)]">Home</Link>
            <span>/</span>
            <span className="text-[var(--heading)]">{c.h1}</span>
          </nav>

          <div className="mb-10">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
              {c.subtitle}
            </p>
            <h1 className="mb-4 text-4xl font-bold text-[var(--heading)] md:text-5xl">{c.h1}</h1>
            <p className="max-w-2xl text-lg text-[var(--text-muted)]">{c.intro}</p>
            <p className="mt-3 text-sm text-[var(--text-muted)]">
              <strong>{c.trustBadge}</strong>
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {c.tourOptions.map((opt) => (
              <Link
                key={opt.slug}
                href={ROUTE_MAP[opt.slug]?.[locale] ?? `/${locale}/bosphorus-cruise`}
                className="group rounded-2xl border border-[var(--line)] bg-white p-6 transition-all hover:border-[var(--brand-primary)]/40 hover:shadow-md"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="inline-block rounded-full bg-[var(--brand-primary)]/10 px-3 py-0.5 text-xs font-semibold text-[var(--brand-primary)] mb-2">
                      {opt.tag}
                    </span>
                    <h2 className="text-xl font-bold text-[var(--heading)] group-hover:text-[var(--brand-primary)]">
                      {opt.title}
                    </h2>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[var(--brand-primary)]">{opt.price}</p>
                    <p className="text-xs text-[var(--text-muted)]">{opt.duration}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">{opt.desc}</p>
                <p className="mt-4 text-sm font-semibold text-[var(--brand-primary)]">{c.ctaLabel}</p>
              </Link>
            ))}
          </div>

          <section className="mt-12 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">{c.compareSectionTitle}</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {c.compareItems.map((item) => (
                <div key={item.title} className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
                  <h3 className="font-semibold text-[var(--heading)] mb-2">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-8 flex justify-end">
            <Link href="/bosphorus-cruise" className="text-sm text-[var(--text-muted)] hover:text-[var(--brand-primary)]">
              English →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
