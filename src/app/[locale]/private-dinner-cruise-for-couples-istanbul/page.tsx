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
  fitHeading: string;
  fits: { title: string; desc: string }[];
  driversHeading: string;
  drivers: { title: string; desc: string }[];
  reasonsHeading: string;
  reasons: { title: string; desc: string }[];
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
      "Çiftler İçin Özel Akşam Yemeği Teknesi İstanbul 2026 | Boğaz'da Romantik Akşam | MerrySails",
    metaDescription:
      "Çiftler için özel Boğaz akşam yemeği teknesi: kendi masanız, sessiz atmosfer ve özel yatla romantik İstanbul akşamı. Yıldönümü, balayı ve özel kutlamalar.",
    canonicalPath: "/tr/private-dinner-cruise-for-couples-istanbul",
    breadcrumbHome: "Ana Sayfa",
    breadcrumbCurrent: "Çiftler İçin Özel Akşam Yemeği Teknesi",
    heroBadge: "Çift odaklı özel destek sayfası",
    heroTitle: "Çiftler İçin Özel Akşam Yemeği Teknesi İstanbul",
    heroSubtitle:
      "Sessiz, romantik ve tamamen size ait bir Boğaz akşam yemeği için özel yat",
    heroDescription:
      "Bu sayfa, akşamın paylaşımlı bir tekneden çok özel ve sessiz olmasını isteyen çiftler için hazırlandı. Yıldönümü, balayı ve özel akşam yemekleri için ideal; gösteri formatı yerine kendi masanızda Boğaz manzarasının tadını çıkardığınız sade bir özel deneyim sunar. Brifinize göre yat, menü ve atmosferi birlikte kurguluyoruz.",
    trustHeading: "Güven ve planlama gerçeği",
    trustBody:
      "MerrySails, 2001'den beri faaliyet gösteren TÜRSAB lisanslı Merry Tourism altında çalışır. Tarih, rota süresi, akşam yemeği tarzı ve sade gizlilik mi yoksa romantik ekstralar mı istediğiniz netleştikten sonra teklif paylaşırız.",
    ctaCompare: "Özel Akşam Yemeği Seçeneklerini Gör",
    ctaContact: "Çift İçin Teklif İste",
    asideHeading: "Akşamı net fiyatlandırmamız için yardımcı olan detaylar",
    asideItems: [
      "Tercih edilen tarih; gün batımı veya gece manzarası önceliği",
      "Yıldönümü, balayı veya özel buluşma ayrımı",
      "Akşam yemeği tarzı, içecek, pasta, çiçek veya fotoğraf isteği",
      "Atmosferin ne kadar sade ve gizli kalması gerektiği",
    ],
    fitHeading: "Bu çift sayfası ne zaman uygun?",
    fits: [
      {
        title: "Hem akşam yemeği hem de mahremiyet önemli",
        desc: "Çift, suyun üstünde bir yemek istiyor ama yatı veya masayı başka misafirlerle paylaşmak istemiyorsa.",
      },
      {
        title: "Sakin atmosfer öncelik",
        desc: "Eğlence odaklı yüksek tempolu bir tekne yerine sessiz bir Boğaz akşamı tercih eden çiftler için uygundur.",
      },
      {
        title: "Romantik ama sürpriz teklif değil",
        desc: "Date night, balayı akşamı veya yıldönümü için; tam bir teklif kurgusuna gerek olmadığında işe yarar.",
      },
    ],
    driversHeading: "Özel akşam yemeği teklifini ne değiştirir?",
    drivers: [
      {
        title: "Mahremiyet seviyesi ve süre",
        desc: "Yat sınıfı, rota süresi ve sade bir slot mu yoksa daha uzun özel bir akşam mı istediğiniz ilk fiyat etkenidir.",
      },
      {
        title: "Menü ve içecek tarzı",
        desc: "Sade akşam yemeği masası, deniz ürünleri menüsü, şampanya, pasta veya özel ikram seviyesi planı belirler.",
      },
      {
        title: "Romantik ekstralar",
        desc: "Çiçek, kemancı, fotoğrafçı ve özel masa süslemesi opsiyonel katmanlardır.",
      },
      {
        title: "Brifin sürpriz tekliflere dönmesi",
        desc: "Brif tamamen sürpriz teklif odaklı hâle gelirse, doğru sayfa proposal sayfası olur.",
      },
    ],
    reasonsHeading: "Çiftlerin özel akşam yemeği teknesi tercih sebepleri",
    reasons: [
      {
        title: "Boğaz'da date night",
        desc: "Sıcak bir akşam, sadece ikiniz ve siluet manzarası; paylaşımlı tekneye göre çok daha sakin bir ritim.",
      },
      {
        title: "Yıldönümü akşamı",
        desc: "Akşam yemeğinin özel kalmasını isteyen, daha büyük bir kutlama formatına dönmemesi gereken çiftler için uygundur.",
      },
      {
        title: "Balayı veya seyahat anısı",
        desc: "İstanbul'da hatırlanacak tek bir özel akşam; paylaşımlı bir etkinlik yapısı olmadan.",
      },
    ],
    faqHeading: "Sıkça Sorulan Sorular",
    faqs: [
      {
        q: "Bu, özel akşam yemeği teknesinin ana sayfası mı?",
        a: "Hayır. Daha geniş ana sayfa Private Bosphorus Dinner Cruise'dur. Bu sayfa, sadece çiftlere odaklı sade bir özel akşam yemeği için ek destek sayfasıdır.",
      },
      {
        q: "Ne zaman paylaşımlı akşam yemeği yerine bu sayfayı kullanmalıyım?",
        a: "Masanın sadece çifte ait olması, atmosferin sessiz kalması ve akşamın halka açık bir gösteri formatında geçmemesi gerekiyorsa bu sayfa uygundur.",
      },
      {
        q: "Sürpriz teklif ise hangi sayfa daha doğru?",
        a: "Eğer akşamın temel kurgusu sürpriz, dekor zamanlaması ve fotoğraf ise proposal sayfası daha uygundur.",
      },
      {
        q: "Yıldönümü ve date night için de uygun mu?",
        a: "Evet. Yıldönümü, balayı ve sakin date night akşamları için iyi bir seçim. Akşam yemeği ve mahremiyet ön planda olduğunda işe yarar.",
      },
      {
        q: "Çift akşam yemeği teklifini ne belirler?",
        a: "Yat büyüklüğü, rota süresi, menü tarzı, içecekler ve çiçek, pasta, canlı müzik veya fotoğrafçı gibi ekstralar.",
      },
    ],
    finalHeading: "Akşam ne kadar sessiz, romantik veya sade olmalı, paylaşın",
    finalBody:
      "Tarih, date night mi yıldönümü mü olduğunu ve sade bir özel akşam yemeği mi yoksa daha kurgulanmış bir akşam mı istediğinizi gönderin. Sizi en uygun rezervasyon yoluna yönlendirelim.",
    ctaWhatsapp: "WhatsApp ile Teklif Al",
    ctaPhone: PHONE_DISPLAY,
    viewInEnglish: "View in English →",
  },
  de: {
    metaTitle:
      "Privates Dinner für Paare auf dem Bosporus 2026 | Romantische Yacht Istanbul | MerrySails",
    metaDescription:
      "Privates Dinner für Paare auf einer Yacht am Bosporus: eigener Tisch, ruhige Atmosphäre und romantischer Abend in Istanbul. Ideal für Jubiläum und Flitterwochen.",
    canonicalPath: "/de/private-dinner-cruise-for-couples-istanbul",
    breadcrumbHome: "Startseite",
    breadcrumbCurrent: "Privates Dinner für Paare",
    heroBadge: "Paar-orientierte Supportseite",
    heroTitle: "Privates Dinner-Cruise für Paare auf dem Bosporus",
    heroSubtitle:
      "Ein ruhiger, romantischer Bosporus-Abend nur für Sie zwei – auf einer privaten Yacht",
    heroDescription:
      "Diese Seite richtet sich an Paare, die ihren Abend privat, dinnerorientiert und ruhiger als eine geteilte Cruise erleben möchten. Ideal für Jubiläum, Flitterwochen oder einen besonderen Abend zu zweit – ohne Showformat, mit eigenem Tisch und Bosporus-Skyline. Yacht, Menü und Atmosphäre stimmen wir auf Ihr Briefing ab.",
    trustHeading: "Vertrauen und realistische Planung",
    trustBody:
      "MerrySails arbeitet unter Merry Tourism, einem TÜRSAB-lizenzierten Istanbul-Veranstalter seit 2001. Wir erstellen das Angebot, sobald Datum, Routenlänge, Dinner-Stil und gewünschte romantische Extras klar sind.",
    ctaCompare: "Private Dinner-Optionen ansehen",
    ctaContact: "Angebot für Paare anfragen",
    asideHeading: "Was uns hilft, den Abend sauber zu kalkulieren",
    asideItems: [
      "Wunschdatum, Sonnenuntergang oder Nachtblick wichtiger?",
      "Date Night, Flitterwochen oder Jubiläum",
      "Dinner-Stil, Getränke, Torte, Blumen oder Fotografie",
      "Wie privat und zurückhaltend die Atmosphäre bleiben soll",
    ],
    fitHeading: "Wann passt diese Paar-Seite?",
    fits: [
      {
        title: "Dinner und Privatsphäre sind beide wichtig",
        desc: "Wenn das Paar ein Essen auf dem Wasser will, aber weder Yacht noch Tisch teilen möchte.",
      },
      {
        title: "Ruhige Atmosphäre als Ziel",
        desc: "Für Paare, die einen leisen Bosporus-Abend einer lauten, showorientierten Cruise vorziehen.",
      },
      {
        title: "Romantisch, aber kein Antrag",
        desc: "Date Night, Flitterwochen oder Jubiläum – ohne aufwendigen Antrag-Aufbau.",
      },
    ],
    driversHeading: "Was das Angebot fürs Paar-Dinner bestimmt",
    drivers: [
      {
        title: "Privatsphäre und Dauer",
        desc: "Yachtklasse, Routenlänge und ob ein einfacher Dinner-Slot oder ein längerer privater Abend gewünscht ist.",
      },
      {
        title: "Menü und Getränke",
        desc: "Klassisches Dinner, vollständiges Seafood-Menü, Champagner, Torte oder individueller Service ändern den Plan.",
      },
      {
        title: "Romantische Extras",
        desc: "Blumen, Geige, Fotograf und sanftes Tisch-Styling sind optionale Schichten.",
      },
      {
        title: "Wenn das Briefing zum Antrag wird",
        desc: "Wird der Abend reveal-orientiert, ist die Proposal-Seite die saubere Wahl.",
      },
    ],
    reasonsHeading: "Häufige Gründe für ein privates Paar-Dinner",
    reasons: [
      {
        title: "Date Night auf dem Bosporus",
        desc: "Privates Dinner mit Skyline-Blick und einem ruhigeren Rhythmus als eine öffentliche Cruise.",
      },
      {
        title: "Hochzeitstag-Dinner an Bord",
        desc: "Wenn der Abend privat bleiben soll und nicht zur Großveranstaltung wird.",
      },
      {
        title: "Flitterwochen oder Reisehöhepunkt",
        desc: "Ein einprägsamer Abend in Istanbul ohne Eventstruktur einer geteilten Cruise.",
      },
    ],
    faqHeading: "Häufig gestellte Fragen",
    faqs: [
      {
        q: "Ist das die Hauptseite für private Yacht-Dinner?",
        a: "Nein. Die übergeordnete Seite ist Private Bosphorus Dinner Cruise. Diese Seite ist eine Supportseite speziell für Paare.",
      },
      {
        q: "Wann sollten Paare diese Seite statt der geteilten Cruise nutzen?",
        a: "Wenn Tisch und Yacht ihnen allein gehören sollen, die Atmosphäre ruhig bleiben soll und kein öffentliches Showformat passt.",
      },
      {
        q: "Wann ist die Proposal-Seite besser?",
        a: "Wenn der Antrag selbst, das Timing der Enthüllung, Fotografie oder ein Überraschungsaufbau im Mittelpunkt stehen.",
      },
      {
        q: "Funktioniert das auch für Date Night und Hochzeitstage?",
        a: "Ja. Ideal für Jubiläum, Flitterwochen und ruhige Date Nights, bei denen Dinner und Privatsphäre wichtiger sind als ein Eventaufbau.",
      },
      {
        q: "Was beeinflusst das endgültige Angebot?",
        a: "Yachtgröße, Routendauer, Menüstil, Getränke und Extras wie Blumen, Torte, Live-Musik oder Fotografie.",
      },
    ],
    finalHeading: "Sagen Sie uns, wie ruhig, romantisch oder schlicht der Abend sein soll",
    finalBody:
      "Datum, Anlass und ob Sie ein einfaches privates Dinner oder einen stärker stilisierten Abend möchten – wir leiten Sie auf den besten Bosporus-Buchungsweg.",
    ctaWhatsapp: "Per WhatsApp anfragen",
    ctaPhone: PHONE_DISPLAY,
    viewInEnglish: "View in English →",
  },
  fr: {
    metaTitle:
      "Dîner Privé pour Couples sur le Bosphore 2026 | Yacht Romantique Istanbul | MerrySails",
    metaDescription:
      "Dîner privé pour couples sur yacht au Bosphore : votre table, ambiance calme et soirée romantique à Istanbul. Idéal anniversaire de mariage et lune de miel.",
    canonicalPath: "/fr/private-dinner-cruise-for-couples-istanbul",
    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "Dîner Privé pour Couples",
    heroBadge: "Page de support orientée couple",
    heroTitle: "Dîner Privé en Yacht pour Couples sur le Bosphore",
    heroSubtitle:
      "Une soirée calme, romantique et entièrement à vous deux sur un yacht privé à Istanbul",
    heroDescription:
      "Cette page s'adresse aux couples qui souhaitent une soirée privée, centrée sur le dîner, plus calme qu'une croisière partagée. Idéale pour un anniversaire de mariage, une lune de miel ou un soir spécial — sans format spectacle, avec votre propre table et la skyline du Bosphore. Nous façonnons yacht, menu et ambiance selon votre brief.",
    trustHeading: "Confiance et planification réelle",
    trustBody:
      "MerrySails opère sous Merry Tourism, opérateur stambouliote sous licence TÜRSAB depuis 2001. Le devis est confirmé une fois la date, la durée, le style de dîner et la présence d'extras romantiques validés.",
    ctaCompare: "Voir les options dîner privé",
    ctaContact: "Demander un devis couple",
    asideHeading: "Ce qui nous aide à chiffrer la soirée proprement",
    asideItems: [
      "Date souhaitée et préférence coucher de soleil ou nuit",
      "Date night, lune de miel ou anniversaire",
      "Style de dîner, boissons, gâteau, fleurs ou photo",
      "Niveau de discrétion et d'ambiance souhaité",
    ],
    fitHeading: "Quand cette page couple est-elle adaptée ?",
    fits: [
      {
        title: "Dîner et intimité comptent autant",
        desc: "Quand le couple veut un repas sur l'eau sans partager le yacht ni la table avec d'autres invités.",
      },
      {
        title: "Une atmosphère calme avant tout",
        desc: "Pour les couples qui préfèrent une soirée Bosphore tranquille à une croisière animée.",
      },
      {
        title: "Romantique, sans demande en mariage",
        desc: "Date night, lune de miel ou anniversaire — sans construire une mise en scène complète de demande.",
      },
    ],
    driversHeading: "Ce qui fait évoluer le devis dîner privé pour couples",
    drivers: [
      {
        title: "Niveau de privé et durée",
        desc: "Classe de yacht, durée du parcours et créneau dîner simple vs. soirée plus longue.",
      },
      {
        title: "Menu et boissons",
        desc: "Table de dîner simple, menu fruits de mer plus complet, champagne, gâteau ou service personnalisé changent la facture.",
      },
      {
        title: "Suppléments romantiques",
        desc: "Fleurs, violon, photographe et stylisme de table en options.",
      },
      {
        title: "Si le brief devient une demande",
        desc: "Quand la soirée s'oriente vers une demande surprise, la page proposal devient la meilleure piste.",
      },
    ],
    reasonsHeading: "Pourquoi les couples choisissent un yacht privé pour dîner",
    reasons: [
      {
        title: "Date night sur le Bosphore",
        desc: "Un dîner privé avec vue skyline et un rythme plus lent qu'une croisière publique.",
      },
      {
        title: "Soirée d'anniversaire de mariage",
        desc: "Quand on veut garder le dîner intime sans transformer la soirée en grande célébration.",
      },
      {
        title: "Lune de miel ou moment fort du voyage",
        desc: "Une soirée mémorable à Istanbul sans la structure d'un événement partagé.",
      },
    ],
    faqHeading: "Questions fréquentes",
    faqs: [
      {
        q: "Est-ce la page principale pour les dîners privés en yacht ?",
        a: "Non. La page propriétaire plus large est Private Bosphorus Dinner Cruise. Cette page est centrée sur les couples.",
      },
      {
        q: "Quand l'utiliser plutôt que la croisière dîner partagée ?",
        a: "Quand la table doit appartenir au couple, l'atmosphère doit rester calme et le format ne doit pas être un divertissement public.",
      },
      {
        q: "Quand utiliser la page demande en mariage ?",
        a: "Quand la révélation, le timing surprise, la photographie ou la mise en scène sont l'objet principal.",
      },
      {
        q: "Cela convient-il aussi à un anniversaire ou date night ?",
        a: "Oui. Idéal pour anniversaires, lunes de miel et soirées calmes axées dîner et intimité.",
      },
      {
        q: "Qu'est-ce qui définit le devis final ?",
        a: "La taille du yacht, la durée du parcours, le menu, les boissons et les extras (fleurs, gâteau, musique live, photo).",
      },
    ],
    finalHeading: "Dites-nous à quel point la soirée doit être calme, romantique ou simple",
    finalBody:
      "Envoyez la date, la nature de l'occasion et le format souhaité (dîner privé simple ou plus stylisé). Nous vous orientons vers la meilleure piste de réservation Bosphore.",
    ctaWhatsapp: "Demande WhatsApp",
    ctaPhone: PHONE_DISPLAY,
    viewInEnglish: "View in English →",
  },
  nl: {
    metaTitle:
      "Privé Diner Cruise voor Stellen Bosporus 2026 | Romantisch Jacht Istanbul | MerrySails",
    metaDescription:
      "Privé diner cruise voor stellen op de Bosporus: eigen tafel, rustige sfeer en romantische avond in Istanbul. Ideaal voor jubileum en huwelijksreis.",
    canonicalPath: "/nl/private-dinner-cruise-for-couples-istanbul",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Privé Diner voor Stellen",
    heroBadge: "Op stellen gerichte supportpagina",
    heroTitle: "Privé Diner Cruise voor Stellen op de Bosporus",
    heroSubtitle:
      "Een rustige, romantische Bosporus-avond, alleen voor jullie tweeën, op een privé jacht",
    heroDescription:
      "Deze pagina is voor stellen die hun avond privé, dinergericht en rustiger dan een gedeelde cruise willen beleven. Perfect voor een jubileum, huwelijksreis of bijzondere avond — geen showformat, eigen tafel met de Bosporus-skyline. Jacht, menu en sfeer worden afgestemd op uw briefing.",
    trustHeading: "Vertrouwen en realistische planning",
    trustBody:
      "MerrySails werkt onder Merry Tourism, een TÜRSAB-gelicentieerde Istanbul-operator sinds 2001. We geven een offerte zodra datum, route-duur, dinerstijl en gewenste extra's helder zijn.",
    ctaCompare: "Bekijk privé dineropties",
    ctaContact: "Vraag offerte voor stellen",
    asideHeading: "Wat ons helpt om de avond goed te begroten",
    asideItems: [
      "Voorkeursdatum, sunset of nacht-uitzicht",
      "Date night, huwelijksreis of jubileum",
      "Dinerstijl, drank, taart, bloemen of fotografie",
      "Hoe privé en ingetogen de sfeer moet blijven",
    ],
    fitHeading: "Wanneer past deze stellen-pagina?",
    fits: [
      {
        title: "Diner én privacy zijn allebei belangrijk",
        desc: "Wanneer het stel wel op het water wil eten maar jacht en tafel niet wil delen.",
      },
      {
        title: "Een rustige sfeer als doel",
        desc: "Voor stellen die een rustige Bosporus-avond verkiezen boven een drukke entertainment-cruise.",
      },
      {
        title: "Romantisch, maar geen aanzoek",
        desc: "Date night, huwelijksreis of jubileum — zonder volledige aanzoek-opbouw.",
      },
    ],
    driversHeading: "Wat de privé-diner offerte voor stellen verandert",
    drivers: [
      {
        title: "Privacy en duur",
        desc: "Jacht-klasse, route-duur en of er een eenvoudige slot of een langere privé-avond gewenst is.",
      },
      {
        title: "Menu en drank",
        desc: "Een eenvoudige tafel, een uitgebreid zeevruchtenmenu, champagne, taart of custom service maakt verschil.",
      },
      {
        title: "Romantische extra's",
        desc: "Bloemen, viool, fotograaf en zachte tafelstyling zijn optionele lagen.",
      },
      {
        title: "Als de briefing een aanzoek wordt",
        desc: "Als het draait om de onthulling zelf, past de proposal-pagina beter.",
      },
    ],
    reasonsHeading: "Waarom stellen voor een privé jacht-diner kiezen",
    reasons: [
      {
        title: "Date night op de Bosporus",
        desc: "Een privé-diner met skyline-uitzicht en een rustiger ritme dan een publieke cruise.",
      },
      {
        title: "Trouwdag-diner aan boord",
        desc: "Wanneer het diner privé moet blijven en niet uitgroeit tot een grote viering.",
      },
      {
        title: "Huwelijksreis of reishoogtepunt",
        desc: "Eén onvergetelijke avond in Istanbul zonder de structuur van een gedeeld evenement.",
      },
    ],
    faqHeading: "Veelgestelde vragen",
    faqs: [
      {
        q: "Is dit de hoofdpagina voor privé jacht-diners?",
        a: "Nee. De bredere hoofdpagina is Private Bosphorus Dinner Cruise. Deze pagina is specifiek voor stellen.",
      },
      {
        q: "Wanneer deze pagina in plaats van de gedeelde cruise gebruiken?",
        a: "Wanneer tafel en jacht alleen voor het stel zijn, de sfeer rustig moet blijven en er geen publiek showformat past.",
      },
      {
        q: "Wanneer de proposal-pagina gebruiken?",
        a: "Wanneer de aanzoek zelf, timing, fotografie of verrassingsopbouw centraal staan.",
      },
      {
        q: "Werkt dit ook voor jubileum en date night?",
        a: "Ja. Ideaal voor jubileum, huwelijksreis en rustige date nights waar diner en privacy belangrijker zijn dan een eventopbouw.",
      },
      {
        q: "Wat bepaalt de uiteindelijke offerte?",
        a: "Jacht-grootte, route-duur, menu, drank en extra's zoals bloemen, taart, live muziek of fotografie.",
      },
    ],
    finalHeading: "Vertel hoe rustig, romantisch of eenvoudig de avond moet voelen",
    finalBody:
      "Stuur de datum, gelegenheid en het gewenste formaat (eenvoudig privé-diner of meer gestileerd). Wij wijzen u de schoonste Bosporus-boekingsroute.",
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
  const languages = buildHreflang("/private-dinner-cruise-for-couples-istanbul");

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

export default async function LocalePrivateDinnerCouplesPage({
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
    "@type": ["TouristTrip", "Service"],
    name: t.heroTitle,
    description: t.heroDescription,
    url: canonicalUrl,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "City", name: "İstanbul" },
    serviceType: "Private Dinner Cruise for Couples",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "312",
      bestRating: "5",
      worstRating: "1",
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
              <p className="mb-4 inline-flex rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-rose-700">
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

          <section className="mb-12 rounded-2xl border border-rose-100 bg-rose-50 p-6">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">
              {t.fitHeading}
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {t.fits.map((item) => (
                <div key={item.title} className="rounded-xl border border-white bg-white p-4 shadow-sm">
                  <h3 className="font-semibold text-[var(--heading)] mb-2">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-[var(--heading)]">
              {t.driversHeading}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {t.drivers.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4"
                >
                  <h3 className="font-semibold text-[var(--heading)] mb-2">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{item.desc}</p>
                </div>
              ))}
            </div>
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
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{item.desc}</p>
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
              href="/private-dinner-cruise-for-couples-istanbul"
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
