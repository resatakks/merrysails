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
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  trustHeading: string;
  trustBody: string;
  ctaCompare: string;
  ctaContact: string;
  asideHeading: string;
  asideItems: string[];
  reasonsHeading: string;
  reasons: { title: string; desc: string }[];
  flowHeading: string;
  flow: { title: string; desc: string }[];
  faqHeading: string;
  faqs: { q: string; a: string }[];
  finalHeading: string;
  finalBody: string;
  ctaWhatsapp: string;
  ctaPhone: string;
  viewInEnglish: string;
};

const TRANSLATIONS: Record<string, LocaleContent> = {
  tr: {
    metaTitle:
      "Kuruçeşme Marina Yat Kiralama İstanbul 2026 | Boğaz Özel Yat | MerrySails",
    metaDescription:
      "Kuruçeşme Marina'dan kalkışlı özel yat kiralama: Boğaz turu, biniş, marina ulaşımı ve özel charter detayları. Tarih ve grup için netleştirilmiş teklif.",
    canonicalPath: "/tr/kurucesme-marina-yacht-charter",
    breadcrumbHome: "Ana Sayfa",
    breadcrumbCurrent: "Kuruçeşme Marina Yat Kiralama",
    heroBadge: "Marina odaklı özel charter sayfası",
    heroTitle: "Kuruçeşme Marina'dan Özel Yat Kiralama İstanbul",
    heroSubtitle:
      "Boğaz'da özel yat kiralamada Kuruçeşme Marina kalkış noktası, biniş ve marina ulaşımı detayları",
    heroDescription:
      "Bu sayfa, özel yat kiralamanın doğru seçim olduğunu bilen ve Kuruçeşme Marina kalkış akışını netleştirmek isteyen misafirler için hazırlandı. Genel yat sayfası karşılaştırma ve fiyat içerir; bu sayfa ise marina, biniş zamanlaması ve sahil noktası bağlamı odaklıdır. Tarih ve grup detaylarınıza göre kalkış akışını sizin için netleştiriyoruz.",
    trustHeading: "Kalkış noktası odaklı destek",
    trustBody:
      "MerrySails, 2001'den beri faaliyet gösteren Merry Tourism altında TÜRSAB lisansıyla çalışır. Kuruçeşme Marina özel yat kalkışları için pratik bir referans noktasıdır; kesin biniş yeri tarih ve yat atamasıyla yazılı onay aşamasında netleştirilir.",
    ctaCompare: "Yat Paketlerini Karşılaştır",
    ctaContact: "Marina Uygunluğu Sor",
    asideHeading: "Kalkış akışını netleştirmek için bilmemiz gerekenler",
    asideItems: [
      "Tercih ettiğiniz tarih ve yaklaşık charter saati",
      "Misafir sayısı ve etkinlik düzeyi (sade veya organizasyonlu)",
      "Transfer ihtiyacı veya kendi imkânlarıyla geliş tercihi",
      "Evlilik teklifi, akşam yemeği veya özel kutlama planı",
    ],
    reasonsHeading: "Misafirlerin Kuruçeşme Marina'yı tercih sebepleri",
    reasons: [
      {
        title: "Sade ve düzgün biniş akışı",
        desc: "Karmaşık etkinlik kurgusu olmadan, marina girişinden temiz bir biniş deneyimi isteyen gruplar için uygundur.",
      },
      {
        title: "Gün batımı ve fotoğraf odaklı zamanlama",
        desc: "Marina ve kalkış saati, ışık koşulu ve daha kısa lüks bir tur için planlanmak istendiğinde idealdir.",
      },
      {
        title: "Kutlama lojistiği ve eklentiler",
        desc: "Dekorasyon, ikram veya canlı müzik gibi eklentiler eklenmeden önce yat ve biniş akışının net olması işi kolaylaştırır.",
      },
    ],
    flowHeading: "Marina odaklı rezervasyon akışı genelde nasıl ilerler?",
    flow: [
      {
        title: "Önce özel yat kiralamayı doğrulayın",
        desc: "Yat sahibi sayfa paket karşılaştırmayı sağlar. Bu sayfa, özel charter yönü zaten netleştikten sonra anlam kazanır.",
      },
      {
        title: "Kuruçeşme'yi pratik kalkış referansı olarak kullanın",
        desc: "Kuruçeşme Marina, çoğu özel kalkış için en temiz referans noktasıdır; ancak kesin biniş yeri yat atamasına bağlıdır.",
      },
      {
        title: "Transfer veya kendi gelişinizi belirleyin",
        desc: "Bazı rezervasyonlar basit kendi geliş charter'ıdır; bazıları otel transferi veya organizasyonlu varış ister.",
      },
      {
        title: "Yazılı onayı esas alın",
        desc: "Tarihinize özel marina, saat ve biniş akışı için yazılı rezervasyon onayı tek geçerli kaynaktır.",
      },
    ],
    faqHeading: "Sıkça Sorulan Sorular",
    faqs: [
      {
        q: "Tüm özel yat rezervasyonları Kuruçeşme Marina'dan mı kalkıyor?",
        a: "Pek çok özel charter için Kuruçeşme Marina en net kalkış referansıdır, ancak kesin biniş noktası yat atamasına, rotaya ve rezervasyon detaylarına göre değişebilir.",
      },
      {
        q: "Bu sayfa ana yat kiralama sayfası mı?",
        a: "Hayır. Asıl sayfa Yacht Charter Istanbul'dur. Bu sayfa, özel yatın zaten doğru seçim olduğu durumlarda Kuruçeşme Marina kalkış akışını netleştirmek için ek bir destek sayfasıdır.",
      },
      {
        q: "Brief gerçekten teklif veya akşam yemeği odaklıysa başka sayfa açmalı mıyım?",
        a: "Evet. Sürpriz teklif odaklıysa proposal sayfasını, akşam yemeği odaklıysa özel akşam yemeği sayfasını kullanmak daha doğru olur.",
      },
      {
        q: "Marina akışını netleştirmek için ekibe ne yardımcı olur?",
        a: "Tarih, misafir sayısı, yat brifi, transfer ihtiyacı ve etkinlik düzeyi ekip için en kritik bilgilerdir.",
      },
    ],
    finalHeading: "Yat brifini gönderin, en uygun kalkış akışını netleştirelim",
    finalBody:
      "Tarih, grup büyüklüğü ve sade bir özel charter mı yoksa organizasyonlu bir kurgu mu istediğinizi paylaşın. Sizi en uygun marina ve charter akışına yönlendirelim.",
    ctaWhatsapp: "WhatsApp ile Sor",
    ctaPhone: PHONE_DISPLAY,
    viewInEnglish: "View in English →",
  },
  de: {
    metaTitle:
      "Kuruçeşme Marina Yachtcharter Istanbul 2026 | Bosporus Privatyacht | MerrySails",
    metaDescription:
      "Privatyacht-Charter ab Kuruçeşme Marina: Bosporus-Tour, Boarding, Marina-Anfahrt und private Charterdetails. Konkretes Angebot nach Datum und Gruppe.",
    canonicalPath: "/de/kurucesme-marina-yacht-charter",
    breadcrumbHome: "Startseite",
    breadcrumbCurrent: "Kuruçeşme Marina Yachtcharter",
    heroBadge: "Marina-orientierte Charter-Supportseite",
    heroTitle: "Yachtcharter ab Kuruçeşme Marina, Istanbul",
    heroSubtitle:
      "Abfahrtsort, Boarding und Anfahrt für eine private Bosporus-Yachtcharter ab Kuruçeşme",
    heroDescription:
      "Diese Seite richtet sich an Gäste, für die eine private Yachtcharter bereits feststeht und die nun konkrete Antworten zur Abfahrt ab Kuruçeşme Marina brauchen. Die übergeordnete Yacht-Seite zeigt Pakete und Preise; hier geht es um Marina, Boarding-Timing und Hafenkontext. Wir klären den Abfahrtsablauf passend zu Datum und Gruppe.",
    trustHeading: "Abfahrtsorientierter Support",
    trustBody:
      "MerrySails arbeitet unter Merry Tourism, einem TÜRSAB-lizenzierten Istanbul-Veranstalter seit 2001. Kuruçeşme Marina ist ein praktischer Referenzpunkt für private Abfahrten; der genaue Boarding-Ort wird mit der schriftlichen Buchungsbestätigung festgelegt.",
    ctaCompare: "Yachtpakete vergleichen",
    ctaContact: "Marina-Eignung anfragen",
    asideHeading: "Was uns hilft, den Abfahrtsablauf zu klären",
    asideItems: [
      "Wunschdatum und ungefähre Charterzeit",
      "Gästezahl und Format (klassische Charter oder Eventaufbau)",
      "Bedarf an Hoteltransfer oder Eigenanreise",
      "Ob Antrag, Dinner oder Feier bereits Teil des Briefings sind",
    ],
    reasonsHeading: "Warum Gäste Kuruçeşme Marina bevorzugen",
    reasons: [
      {
        title: "Klares, einfaches Boarding",
        desc: "Passend, wenn die Gruppe ohne komplexen Eventaufbau einen sauberen Marina-Empfang wünscht.",
      },
      {
        title: "Sunset- und Foto-orientiertes Timing",
        desc: "Sinnvoll, wenn Marina und Abfahrtsslot zu Lichtstimmung, Route oder einer kürzeren Luxustour passen sollen.",
      },
      {
        title: "Feier-Logistik vor den Add-ons",
        desc: "Hilfreich, wenn Yacht und Boarding klar sein sollten, bevor Dekoration oder Catering ins Spiel kommen.",
      },
    ],
    flowHeading: "So läuft der marinaorientierte Buchungsprozess meist ab",
    flow: [
      {
        title: "Privatcharter bestätigen",
        desc: "Die Hauptseite Yacht Charter Istanbul übernimmt den Paketvergleich. Diese Seite ergänzt, sobald Privatcharter feststeht.",
      },
      {
        title: "Kuruçeşme als praktischen Abfahrtsbezug nutzen",
        desc: "Für viele private Abfahrten ist Kuruçeşme Marina der sauberste öffentliche Bezugspunkt – ohne dass jeder Hafen automatisch garantiert ist.",
      },
      {
        title: "Transfer oder Eigenanreise klären",
        desc: "Manche Buchungen sind einfache Eigenanreise-Charter, andere benötigen Hoteltransfer oder eine eventorientierte Anreise.",
      },
      {
        title: "Schriftliche Bestätigung als Quelle der Wahrheit",
        desc: "Marina, Zeit und Boarding für Ihr konkretes Datum stehen erst mit der schriftlichen Buchungsbestätigung fest.",
      },
    ],
    faqHeading: "Häufig gestellte Fragen",
    faqs: [
      {
        q: "Starten alle privaten Yachtbuchungen ab Kuruçeşme Marina?",
        a: "Viele private Charterabläufe nutzen Kuruçeşme Marina als klarsten Bezugspunkt; der genaue Boarding-Ort hängt jedoch von Yacht, Route und Buchung ab.",
      },
      {
        q: "Ist das die Hauptseite für private Yachtcharter in Istanbul?",
        a: "Nein. Die Hauptseite ist Yacht Charter Istanbul. Diese Supportseite klärt nur die Marina- und Boarding-Frage, wenn Privatcharter bereits feststeht.",
      },
      {
        q: "Sollte ich eine andere Seite öffnen, wenn das Briefing eher Antrag oder Dinner ist?",
        a: "Ja. Bei einem Heiratsantrag passt die Proposal-Seite, bei klarem Dinner-Brief die private Dinner-Seite besser.",
      },
      {
        q: "Was hilft dem Team, den Marina-Ablauf zu bestätigen?",
        a: "Datum, Gästezahl, Yacht-Briefing, Transferbedarf und Eventniveau sind die wichtigsten Eckpunkte.",
      },
    ],
    finalHeading: "Schicken Sie uns das Briefing, wir bestätigen den passenden Abfahrtsweg",
    finalBody:
      "Senden Sie Datum, Gruppengröße und ob Sie eine einfache Privatcharter oder einen eventorientierten Aufbau wünschen. Wir leiten Sie zum richtigen Marina- und Charter-Setup.",
    ctaWhatsapp: "Per WhatsApp anfragen",
    ctaPhone: PHONE_DISPLAY,
    viewInEnglish: "View in English →",
  },
  fr: {
    metaTitle:
      "Yacht Charter Marina Kuruçeşme Istanbul 2026 | Yacht Privé Bosphore | MerrySails",
    metaDescription:
      "Location de yacht privé au départ de la marina de Kuruçeşme : croisière Bosphore, embarquement, accès à la marina et détails du charter privé. Devis selon date et groupe.",
    canonicalPath: "/fr/kurucesme-marina-yacht-charter",
    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "Yacht Charter Marina Kuruçeşme",
    heroBadge: "Page de support charter axée marina",
    heroTitle: "Yacht Charter au Départ de la Marina de Kuruçeşme, Istanbul",
    heroSubtitle:
      "Lieu de départ, embarquement et logistique d'accès pour un yacht privé sur le Bosphore",
    heroDescription:
      "Cette page s'adresse aux invités pour qui le yacht privé est déjà la bonne option et dont la véritable question est le déroulement du départ depuis la marina de Kuruçeşme. La page yacht principale couvre la comparaison de formules et les prix ; cette page éclaire la marina, le timing d'embarquement et le contexte du quai en fonction de votre date et de votre groupe.",
    trustHeading: "Support orienté lieu de départ",
    trustBody:
      "MerrySails opère sous Merry Tourism, opérateur stambouliote sous licence TÜRSAB depuis 2001. La marina de Kuruçeşme est un point de référence pratique pour de nombreux départs privés ; le point d'embarquement exact est confirmé dans la confirmation écrite de réservation.",
    ctaCompare: "Comparer les formules yacht",
    ctaContact: "Demander la pertinence marina",
    asideHeading: "Ce qui nous aide à valider le déroulé du départ",
    asideItems: [
      "Date souhaitée et créneau de charter approximatif",
      "Nombre d'invités et niveau (charter classique ou événement)",
      "Besoin de transfert ou arrivée par vos soins",
      "Si demande en mariage, dîner ou célébration sont déjà au brief",
    ],
    reasonsHeading: "Pourquoi les invités choisissent la marina de Kuruçeşme",
    reasons: [
      {
        title: "Embarquement privé clair",
        desc: "Idéal lorsque le groupe veut un accueil propre à la marina sans logique d'événement complexe autour.",
      },
      {
        title: "Timing coucher de soleil ou photo",
        desc: "Utile quand la marina et l'horaire de départ doivent coïncider avec la lumière, la route ou une sortie luxe plus courte.",
      },
      {
        title: "Logistique de fête avant les options",
        desc: "Pratique lorsque le yacht et l'embarquement doivent être confirmés avant d'aborder décoration et restauration.",
      },
    ],
    flowHeading: "Comment se déroule en général la réservation orientée marina",
    flow: [
      {
        title: "Confirmer le yacht privé comme parcours principal",
        desc: "La page yacht principale gère la comparaison des formules. Cette page intervient une fois la direction privée déjà claire.",
      },
      {
        title: "Utiliser Kuruçeşme comme référence pratique",
        desc: "Pour de nombreux départs privés, la marina de Kuruçeşme est la référence publique la plus claire, sans que chaque mention soit une garantie.",
      },
      {
        title: "Vérifier transfert ou arrivée autonome",
        desc: "Certaines réservations sont de simples charters en arrivée libre ; d'autres demandent un transfert hôtel ou une arrivée plus orchestrée.",
      },
      {
        title: "Suivre la confirmation finale",
        desc: "La confirmation écrite reste la source de vérité pour la marina, l'horaire et le déroulé d'embarquement le jour J.",
      },
    ],
    faqHeading: "Questions fréquentes",
    faqs: [
      {
        q: "Tous les yachts privés partent-ils de la marina de Kuruçeşme ?",
        a: "De nombreux flux privés utilisent Kuruçeşme comme référence la plus claire ; le point d'embarquement exact dépend du yacht, de la route et de la réservation.",
      },
      {
        q: "Est-ce la page principale pour le yacht charter privé à Istanbul ?",
        a: "Non. La page principale reste Yacht Charter Istanbul. Cette page de support traite uniquement la question marina/embarquement quand le charter privé est déjà décidé.",
      },
      {
        q: "Dois-je ouvrir une autre page si le brief est plutôt demande en mariage ou dîner ?",
        a: "Oui. La page proposal convient à un projet de demande, et la page private dinner aux soirées centrées sur le repas.",
      },
      {
        q: "Qu'est-ce qui aide l'équipe à confirmer le bon flux marina ?",
        a: "La date, le nombre d'invités, le brief yacht, le besoin de transfert et le niveau d'événement sont les éléments clés.",
      },
    ],
    finalHeading: "Envoyez le brief, nous confirmons le départ le plus propre",
    finalBody:
      "Indiquez la date, la taille du groupe et si vous voulez un charter privé simple ou une mise en place plus orientée événement. Nous vous orientons vers la marina et le format de charter adaptés.",
    ctaWhatsapp: "Demander sur WhatsApp",
    ctaPhone: PHONE_DISPLAY,
    viewInEnglish: "View in English →",
  },
  nl: {
    metaTitle:
      "Kuruçeşme Marina Jacht Charter Istanbul 2026 | Privé Jacht Bosporus | MerrySails",
    metaDescription:
      "Privé jacht charter vanaf Kuruçeşme Marina: Bosporus-tour, boarding, marinatoegang en private charter-details. Offerte op basis van datum en groep.",
    canonicalPath: "/nl/kurucesme-marina-yacht-charter",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Kuruçeşme Marina Jacht Charter",
    heroBadge: "Marina-gerichte charter-supportpagina",
    heroTitle: "Jachtcharter vanaf Kuruçeşme Marina, Istanbul",
    heroSubtitle:
      "Vertrekpunt, boarding en aankomstlogistiek voor een privé jacht op de Bosporus",
    heroDescription:
      "Deze pagina is voor gasten die al weten dat een privéjacht de juiste keuze is en concrete duidelijkheid willen over het vertrek vanaf Kuruçeşme Marina. De hoofdpagina toont pakketten en prijzen; deze pagina richt zich op marina, boarding-timing en kade-context, afgestemd op uw datum en groep.",
    trustHeading: "Vertrekgerichte ondersteuning",
    trustBody:
      "MerrySails werkt onder Merry Tourism, een TÜRSAB-gelicentieerde Istanbul-operator sinds 2001. Kuruçeşme Marina is een praktisch referentiepunt voor private vertrekken; het exacte boarding-punt wordt vastgelegd in de schriftelijke boekingsbevestiging.",
    ctaCompare: "Vergelijk jachtpakketten",
    ctaContact: "Vraag naar marina-passendheid",
    asideHeading: "Wat ons helpt het vertrek helder te maken",
    asideItems: [
      "Voorkeursdatum en globale charter-tijd",
      "Aantal gasten en type (eenvoudige charter of event)",
      "Behoefte aan transfer of zelfstandige aankomst",
      "Of huwelijksaanzoek, diner of feest al onderdeel van de briefing zijn",
    ],
    reasonsHeading: "Waarom gasten Kuruçeşme Marina kiezen",
    reasons: [
      {
        title: "Heldere private boarding",
        desc: "Past bij groepen die een rustige marina-aankomst willen zonder complexe event-opbouw eromheen.",
      },
      {
        title: "Sunset- of foto-getimed vertrek",
        desc: "Handig wanneer marina en vertrekslot moeten aansluiten bij licht, route of een kortere luxe uitstap.",
      },
      {
        title: "Logistiek voor de toevoegingen komen",
        desc: "Nuttig als jacht en boarding bevestigd moeten zijn voordat decoratie of catering aan bod komen.",
      },
    ],
    flowHeading: "Hoe de marina-gerichte boekingsflow meestal verloopt",
    flow: [
      {
        title: "Bevestig privé jacht charter als hoofdroute",
        desc: "De hoofdpagina dekt pakketvergelijking. Deze pagina is relevant zodra privé charter al duidelijk is.",
      },
      {
        title: "Gebruik Kuruçeşme als praktisch vertrekpunt",
        desc: "Voor veel private vertrekken is Kuruçeşme het schoonste publieke referentiepunt zonder dat het automatisch een garantie is.",
      },
      {
        title: "Transfer of zelfstandige aankomst",
        desc: "Sommige boekingen zijn simpele zelfstandige charters; andere hebben hoteltransfer of een event-aankomst nodig.",
      },
      {
        title: "Schriftelijke bevestiging is de bron",
        desc: "Marina, tijd en boarding op uw datum staan pas vast met de definitieve schriftelijke bevestiging.",
      },
    ],
    faqHeading: "Veelgestelde vragen",
    faqs: [
      {
        q: "Vertrekken alle privéjachten vanaf Kuruçeşme Marina?",
        a: "Veel private charters gebruiken Kuruçeşme als duidelijkste referentie; het exacte boarding-punt hangt af van jacht, route en boeking.",
      },
      {
        q: "Is dit de hoofdpagina voor privé jachtcharter in Istanbul?",
        a: "Nee. De hoofdpagina blijft Yacht Charter Istanbul. Deze supportpagina verheldert alleen het marina- en boardingvraagstuk wanneer privé charter al gekozen is.",
      },
      {
        q: "Moet ik een andere pagina openen als het echt om aanzoek of diner gaat?",
        a: "Ja. Voor een huwelijksaanzoek past de proposal-pagina; voor een privédiner past de private dinner-pagina beter.",
      },
      {
        q: "Wat helpt het team om de juiste marina-flow te bevestigen?",
        a: "Datum, aantal gasten, jacht-briefing, transferbehoefte en het eventniveau zijn de belangrijkste punten.",
      },
    ],
    finalHeading: "Stuur de briefing, wij bevestigen de schoonste vertrekroute",
    finalBody:
      "Geef datum, groepsgrootte en aan of u een eenvoudige private charter of een meer event-gerichte opzet wilt. Wij wijzen u naar de juiste marina- en charter-flow.",
    ctaWhatsapp: "Vraag via WhatsApp",
    ctaPhone: PHONE_DISPLAY,
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
  const languages = buildHreflang("/kurucesme-marina-yacht-charter");

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

export default async function LocaleKurucesmeMarinaPage({
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
    serviceType: "Private Yacht Charter Departure Support",
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
            className="mb-6 flex items-center gap-2 text-sm text-[var(--text-muted)]"
          >
            <Link href={`/${locale}`} className="hover:text-[var(--brand-primary)]">
              {t.breadcrumbHome}
            </Link>
            <span>/</span>
            <span className="text-[var(--heading)] truncate">{t.breadcrumbCurrent}</span>
          </nav>

          <section className="mb-12 grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="mb-4 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                {t.heroBadge}
              </p>
              <h1 className="mb-4 text-3xl font-bold leading-tight text-[var(--heading)] md:text-5xl">
                {t.heroTitle}
              </h1>
              <p className="mb-6 max-w-3xl text-lg leading-relaxed text-[var(--text-muted)]">
                {t.heroSubtitle}
              </p>
              <p className="mb-6 max-w-3xl text-sm md:text-base leading-relaxed text-[var(--text-muted)]">
                {t.heroDescription}
              </p>
              <div className="mb-6 rounded-2xl border border-[var(--brand-primary)]/10 bg-white p-4">
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
                  {t.trustHeading}
                </p>
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                  {t.trustBody}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--brand-primary)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--brand-primary-hover)]"
                >
                  {t.ctaCompare} <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={`tel:${PHONE_DISPLAY.replace(/\s+/g, "")}`}
                  className="inline-flex items-center justify-center rounded-xl border border-[var(--brand-primary)] px-6 py-3 font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)] hover:text-white"
                >
                  {t.ctaContact}
                </a>
              </div>
            </div>

            <aside className="rounded-2xl border border-white bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-[var(--heading)]">
                {t.asideHeading}
              </h2>
              <ul className="space-y-3 text-sm text-[var(--text-muted)]">
                {t.asideItems.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="font-bold text-[var(--brand-primary)]">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </section>

          <section className="mb-12 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">
              {t.reasonsHeading}
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
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">
              {t.flowHeading}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {t.flow.map((item) => (
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
            <h2 className="mb-6 text-2xl font-bold text-[var(--heading)]">
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
                  {t.finalHeading}
                </h2>
                <p className="max-w-2xl text-sm leading-relaxed text-white/75">
                  {t.finalBody}
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
                <a
                  href={`tel:${PHONE_DISPLAY.replace(/\s+/g, "")}`}
                  className="inline-flex items-center justify-center rounded-xl border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                >
                  {t.ctaPhone}
                </a>
              </div>
            </div>
          </section>

          <div className="mt-8 flex justify-end">
            <Link
              href="/kurucesme-marina-yacht-charter"
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
