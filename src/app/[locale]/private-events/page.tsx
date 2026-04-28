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
  formatsHeading: string;
  formats: { title: string; desc: string }[];
  faqHeading: string;
  faqs: { q: string; a: string }[];
  ctaWhatsapp: string;
  viewInEnglish: string;
};

const TRANSLATIONS: Record<string, LocaleContent> = {
  tr: {
    metaTitle:
      "Özel Tekne Etkinliği İstanbul 2026 | Doğum Günü & Kutlama Teknesi | MerrySails",
    metaDescription:
      "Doğum günü tekne turu, sünnet kutlaması, yıl dönümü partisi ve özel kutlama akşamları için Boğaz'da özel yat. Pasta, dekor, fotoğrafçı ve DJ eklenebilir.",
    canonicalPath: "/tr/private-events",
    breadcrumbHome: "Ana Sayfa",
    breadcrumbCurrent: "Özel Etkinlikler",
    heroTitle: "İstanbul Özel Tekne Etkinliği",
    heroSubtitle:
      "Doğum günü, sünnet, yıl dönümü ve özel kutlamalar için Boğaz'da kiralık yat",
    heroDescription:
      "MerrySails özel tekne etkinlikleri; doğum günü, sünnet kutlaması, yıl dönümü partisi, bekarlığa veda ve baby shower gibi özel anlar için tüm tekneyi grubunuza tahsis eder. Pasta, dekor, fotoğrafçı, DJ veya canlı müzik ve catering, kutlamanızın havasına göre eklenir.",
    whyHeading: "Boğaz'da Özel Etkinlik Neden MerrySails?",
    reasons: [
      {
        title: "Tüm tekne size özel",
        desc: "Paylaşımlı tur değil; teknenin tamamı yalnızca sizin grubunuza tahsis edilir. Saat, güzergah ve müzik tamamen sizin tercihinize göre belirlenir.",
      },
      {
        title: "Kutlamaya özel kurgu",
        desc: "Pasta, balon, çiçek, isimli süsleme, fotoğrafçı, DJ veya canlı müzik kutlamanızın temasına göre eklenir. Sürpriz organizasyonu için planlama desteği sağlanır.",
      },
      {
        title: "Küçük ve orta gruplara uygun",
        desc: "Doğum günü partileri, baby shower, bekarlığa veda ve özel akşam yemekleri için ideal kapasite. Aile ve arkadaş grupları için samimi bir ortam.",
      },
    ],
    formatsHeading: "Özel Etkinlik Formatları",
    formats: [
      {
        title: "Doğum günü tekne turu",
        desc: "Pasta, müzik ve fotoğraf için yeterli alan; özel akış ve sürpriz kurgusu kolayca planlanır.",
      },
      {
        title: "Yıl dönümü ve önemli kutlamalar",
        desc: "Romantik veya kalabalık aile kutlaması olsun, akşamı kutlamaya odaklı bir formatta planlarız.",
      },
      {
        title: "Sünnet ve aile kutlamaları",
        desc: "Çocuklara güvenli, aileye konforlu bir Boğaz akşamı; tema, ikram ve fotoğraf desteği eklenebilir.",
      },
      {
        title: "Bekarlığa veda / baby shower",
        desc: "Küçük arkadaş grupları için özel kutlama akşamları; dekor, müzik ve fotoğrafçı seçenekleriyle birlikte planlanır.",
      },
    ],
    faqHeading: "Sıkça Sorulan Sorular",
    faqs: [
      {
        q: "Özel etkinlik fiyatı nasıl belirlenir?",
        a: "Fiyatlandırma; konuk sayısı, etkinlik süresi, tekne tipi, ikram beklentileri ve dekor/müzik/fotoğraf gibi ek hizmetlere göre değişir. Tüm istekler teklif bazlı yanıtlanır.",
      },
      {
        q: "Pasta, dekor, fotoğrafçı ve müzik düzenliyor musunuz?",
        a: "Evet. Pasta, balon ve çiçek dekoru, profesyonel fotoğrafçı, DJ veya canlı müzik talepleriniz organizasyonun parçası olarak planlanır.",
      },
      {
        q: "Hangi kutlamalar bu sayfa için uygundur?",
        a: "Doğum günleri, yıl dönümleri, sünnet kutlamaları, baby shower, bekarlığa veda ve esnek özel kutlama akşamları için bu sayfa uygundur. Evlilik teklifi için ayrı bir sayfamız bulunmaktadır.",
      },
      {
        q: "Yiyecek ve içecek menüsü ekleyebilir miyiz?",
        a: "Evet. Set menü, kanepe servisi, kokteyl prolonge veya özel chef menüsü gibi seçenekler kutlamanın temasına göre eklenir; alkollü/alkolsüz içecek paketi ayrıca planlanır.",
      },
    ],
    ctaWhatsapp: "WhatsApp ile Planla",
    viewInEnglish: "View in English →",
  },
  de: {
    metaTitle:
      "Private Bootsparty Istanbul 2026 | Geburtstag & Jubiläum auf der Jacht | MerrySails",
    metaDescription:
      "Geburtstagstour, Jubiläumsfeier, Junggesellinnenabschied und private Festabende auf dem Bosporus. Privatjacht mit Torte, Dekoration, Fotograf und DJ.",
    canonicalPath: "/de/private-events",
    breadcrumbHome: "Startseite",
    breadcrumbCurrent: "Private Veranstaltungen",
    heroTitle: "Private Bootsparty in Istanbul",
    heroSubtitle:
      "Geburtstage, Jubiläen und private Feiern auf einer Jacht am Bosporus",
    heroDescription:
      "MerrySails plant private Veranstaltungen für Geburtstage, Jubiläen, Junggesellinnenabschiede und Babypartys. Die gesamte Jacht steht Ihrer Gruppe exklusiv zur Verfügung; Torte, Dekoration, Fotograf, DJ oder Live-Musik und Catering werden passend zu Ihrer Feier ergänzt.",
    whyHeading: "Warum MerrySails für private Feiern in Istanbul?",
    reasons: [
      {
        title: "Die ganze Jacht für Ihre Gruppe",
        desc: "Keine geteilte Tour: das Boot ist allein für Ihre Gruppe reserviert. Sie bestimmen Zeit, Route und Musik.",
      },
      {
        title: "Konzept rund um die Feier",
        desc: "Torte, Ballons, Blumen, individuelle Dekoration, Fotograf, DJ oder Live-Musik werden auf Ihr Thema abgestimmt – auch Überraschungen werden gerne mitgeplant.",
      },
      {
        title: "Ideal für kleine und mittlere Gruppen",
        desc: "Perfekte Größe für Geburtstagsfeiern, Babypartys, Junggesellinnenabschiede und private Dinner – familiär und entspannt.",
      },
    ],
    formatsHeading: "Formate für private Feiern",
    formats: [
      {
        title: "Geburtstagstour",
        desc: "Genug Platz für Torte, Musik und Fotos – ein eigener Ablauf und Überraschungsmomente lassen sich leicht einbauen.",
      },
      {
        title: "Jubiläum / Hochzeitstag",
        desc: "Ob romantisch zu zweit oder mit der Familie – wir planen den Abend ganz auf Ihre Feier ausgerichtet.",
      },
      {
        title: "Familien- und Festabende",
        desc: "Sicher für Kinder, komfortabel für die Familie. Thema, Catering und Fotodokumentation auf Wunsch.",
      },
      {
        title: "Junggesellinnenabschied / Babyparty",
        desc: "Privater Festabend für kleine Freundeskreise – mit Dekor, Musik und Fotograf nach Wunsch.",
      },
    ],
    faqHeading: "Häufig gestellte Fragen",
    faqs: [
      {
        q: "Wie wird ein privates Event auf der Jacht kalkuliert?",
        a: "Der Preis hängt von Gästezahl, Dauer, Bootstyp, Catering-Erwartungen und Zusatzleistungen wie Dekoration, Musik oder Fotografie ab. Alle Anfragen werden auf Angebotsbasis beantwortet.",
      },
      {
        q: "Organisieren Sie Torte, Dekoration, Fotograf und Musik?",
        a: "Ja. Torte, Ballon- und Blumendekoration, professionelle Fotografen, DJ oder Live-Musik können als Teil der Planung gebucht werden.",
      },
      {
        q: "Welche Anlässe passen zu dieser Seite?",
        a: "Geburtstage, Jubiläen, Babypartys, Junggesellinnenabschiede und flexible private Festabende. Heiratsanträge planen wir auf einer eigenen Seite.",
      },
      {
        q: "Können wir Speisen und Getränke hinzubuchen?",
        a: "Ja. Setmenü, Canapé-Service, Cocktail-Empfang oder ein individuelles Menü vom Privatkoch sind möglich; Getränkepakete (mit oder ohne Alkohol) werden separat zusammengestellt.",
      },
    ],
    ctaWhatsapp: "Per WhatsApp planen",
    viewInEnglish: "View in English →",
  },
  fr: {
    metaTitle:
      "Fête Privée en Yacht Istanbul 2026 | Anniversaire & Soirée Privée Bosphore | MerrySails",
    metaDescription:
      "Anniversaire en bateau, soirée privée, enterrement de vie de jeune fille et fêtes privées sur le Bosphore. Yacht privé avec gâteau, déco, photographe et DJ.",
    canonicalPath: "/fr/private-events",
    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "Événements privés",
    heroTitle: "Fête Privée en Yacht à Istanbul",
    heroSubtitle:
      "Anniversaires, jubilés et soirées privées sur le Bosphore en yacht privé",
    heroDescription:
      "MerrySails organise vos événements privés : anniversaires en bateau, fêtes anniversaires de mariage, enterrements de vie de jeune fille, baby showers et dîners privés. Le yacht est entièrement réservé à votre groupe ; gâteau, décoration, photographe, DJ ou musique live et restauration sont ajoutés selon votre fête.",
    whyHeading: "Pourquoi MerrySails pour vos fêtes privées ?",
    reasons: [
      {
        title: "Le yacht entièrement pour votre groupe",
        desc: "Pas de croisière partagée : le bateau est réservé à votre seul groupe. Vous décidez de l'heure, de l'itinéraire et de la musique.",
      },
      {
        title: "Une mise en scène autour de la fête",
        desc: "Gâteau, ballons, fleurs, décoration nominative, photographe, DJ ou musique live s'adaptent au thème de la soirée. Les surprises sont également prises en charge.",
      },
      {
        title: "Idéal pour les petits et moyens groupes",
        desc: "Capacité parfaite pour les anniversaires, baby showers, enterrements de vie de jeune fille et dîners privés — un cadre familial et chaleureux.",
      },
    ],
    formatsHeading: "Formats de fête privée",
    formats: [
      {
        title: "Anniversaire en bateau",
        desc: "De la place pour le gâteau, la musique et les photos ; le déroulé et les moments-surprises se planifient facilement.",
      },
      {
        title: "Anniversaire de mariage / jubilé",
        desc: "Romantique en couple ou plus large en famille — nous construisons la soirée autour de la célébration.",
      },
      {
        title: "Soirées familiales et fêtes",
        desc: "Confortable pour la famille, sûr pour les enfants. Thématique, restauration et reportage photo en option.",
      },
      {
        title: "Enterrement de vie de jeune fille / baby shower",
        desc: "Soirée privée pour un petit groupe d'ami(e)s — décoration, musique et photographe selon vos envies.",
      },
    ],
    faqHeading: "Questions fréquentes",
    faqs: [
      {
        q: "Comment sont tarifées les fêtes privées en yacht ?",
        a: "Le tarif dépend du nombre d'invités, de la durée, du type de bateau, des attentes en restauration et des prestations comme la décoration, la musique ou la photographie. Toutes les demandes sont sur devis.",
      },
      {
        q: "Organisez-vous gâteau, décoration, photographe et musique ?",
        a: "Oui. Gâteau, décoration florale et ballons, photographe professionnel, DJ ou musique live peuvent faire partie de l'organisation.",
      },
      {
        q: "Quels événements correspondent à cette page ?",
        a: "Anniversaires, jubilés, baby showers, enterrements de vie de jeune fille et soirées privées flexibles. Les demandes en mariage ont leur propre page dédiée.",
      },
      {
        q: "Peut-on ajouter restauration et boissons ?",
        a: "Oui. Menu servi, cocktail dînatoire, service canapés ou menu sur mesure d'un chef privé sont possibles ; les forfaits boissons (avec ou sans alcool) sont composés séparément.",
      },
    ],
    ctaWhatsapp: "Planifier via WhatsApp",
    viewInEnglish: "View in English →",
  },
  nl: {
    metaTitle:
      "Privéfeestje op Jacht Istanbul 2026 | Verjaardag & Jubileum Bosporus | MerrySails",
    metaDescription:
      "Verjaardagstocht, jubileumfeest, vrijgezellenfeest en privéfeestjes op de Bosporus. Privéjacht met taart, decoratie, fotograaf en DJ.",
    canonicalPath: "/nl/private-events",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Privé-evenementen",
    heroTitle: "Privéfeestje op een Jacht in Istanbul",
    heroSubtitle:
      "Verjaardagen, jubilea en privéfeesten op de Bosporus op een privéjacht",
    heroDescription:
      "MerrySails organiseert privéfeestjes: verjaardagstochten, jubileumfeesten, vrijgezellenfeesten, baby showers en privédiners. Het hele jacht is exclusief voor uw gezelschap; taart, decoratie, fotograaf, DJ of live muziek en catering worden toegevoegd op basis van uw feest.",
    whyHeading: "Waarom MerrySails voor uw privéfeest?",
    reasons: [
      {
        title: "Het hele jacht voor uw gezelschap",
        desc: "Geen gedeelde tocht: het jacht is alleen voor uw groep. U bepaalt tijd, route en muziek.",
      },
      {
        title: "Volledig rond uw feest opgezet",
        desc: "Taart, ballonnen, bloemen, gepersonaliseerde decoratie, fotograaf, DJ of live muziek passen we aan uw thema aan. Ook verrassingen plannen wij graag mee.",
      },
      {
        title: "Geschikt voor kleine en middelgrote groepen",
        desc: "Ideaal voor verjaardagen, baby showers, vrijgezellenfeesten en privédiners — gezellig en huiselijk.",
      },
    ],
    formatsHeading: "Formats voor privéfeestjes",
    formats: [
      {
        title: "Verjaardagstocht",
        desc: "Genoeg ruimte voor taart, muziek en foto's; eigen draaiboek en verrassingsmomenten zijn makkelijk in te plannen.",
      },
      {
        title: "Jubileumfeest / trouwdag",
        desc: "Romantisch met z'n tweeën of groter met familie — we bouwen de avond op rond de viering.",
      },
      {
        title: "Familie- en feestavonden",
        desc: "Comfortabel voor familie, veilig voor kinderen. Thema, catering en fotoreportage optioneel.",
      },
      {
        title: "Vrijgezellenfeest / baby shower",
        desc: "Privéfeestje voor een kleine vriendengroep — met decoratie, muziek en fotograaf naar wens.",
      },
    ],
    faqHeading: "Veelgestelde vragen",
    faqs: [
      {
        q: "Hoe wordt een privéfeest op een jacht geprijsd?",
        a: "De prijs hangt af van het aantal gasten, de duur, het type boot, de cateringwensen en extra's zoals decoratie, muziek of fotografie. Alle aanvragen worden op offerte beantwoord.",
      },
      {
        q: "Regelen jullie taart, decoratie, fotograaf en muziek?",
        a: "Ja. Taart, ballon- en bloemendecoratie, een professionele fotograaf, DJ of live muziek kunnen onderdeel zijn van de organisatie.",
      },
      {
        q: "Welke gelegenheden passen bij deze pagina?",
        a: "Verjaardagen, jubilea, baby showers, vrijgezellenfeesten en flexibele privéfeestjes. Voor huwelijksaanzoeken hebben wij een aparte pagina.",
      },
      {
        q: "Kunnen we eten en drinken toevoegen?",
        a: "Ja. Een vast menu, walking dinner, hapjesservice of een op maat gemaakt menu van een privékok behoort tot de mogelijkheden; drankenpakketten (met of zonder alcohol) worden apart samengesteld.",
      },
    ],
    ctaWhatsapp: "Plan via WhatsApp",
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
  const languages = buildHreflang("/private-events");

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

export default async function LocalePrivateEventsPage({
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
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: t.formatsHeading,
      itemListElement: t.formats.map((f) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: f.title,
          description: f.desc,
        },
      })),
    },
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
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">
              {t.formatsHeading}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {t.formats.map((item) => (
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
              href="/private-events"
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
