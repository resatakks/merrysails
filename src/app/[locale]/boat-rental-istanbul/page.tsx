import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fleet } from "@/data/fleet";
import { SITE_URL, WHATSAPP_URL } from "@/lib/constants";
import { ACTIVE_LOCALES, isActiveLocale, type SiteLocale } from "@/i18n/config";
import { buildHreflang } from "@/lib/hreflang";

export const revalidate = 3600;

const startingRate = Math.min(...fleet.map((b) => b.pricePerHour));

type LocaleContent = {
  title: string;
  description: string;
  canonicalPath: string;
  eyebrow: string;
  heroTitle: string;
  heroDescription: string;
  fleetHeading: string;
  priceUnit: string;
  capacityLabel: string;
  lengthSeparator: string;
  howItWorksBox: { heading: string; body: string };
  extrasHeading: string;
  extras: string[];
  ctaWhatsapp: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  viewInEnglish: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
  whyTitle: string;
  whyItems: { title: string; desc: string }[];
};

const TRANSLATIONS: Record<string, LocaleContent> = {
  tr: {
    title: "Tekne Kiralama İstanbul — €380'dan başlayan fiyatlar | MerrySails",
    description: `İstanbul'da tekne kiralama saatlik €${startingRate}'dan başlıyor. Boğaz'da özel tekne turu, yemek ve gün batımı ekstraları dahil edilebilir. Hemen teklif alın.`,
    canonicalPath: "/tr/boat-rental-istanbul",
    eyebrow: "MerrySails İstanbul",
    heroTitle: "Tekne Kiralama İstanbul",
    heroDescription:
      `Saatlik €${startingRate}'dan başlayan özel tekne kiralama. Önce tekneyi ve güzergahı seçin; akşam yemeği, gün batımı zamanlaması veya kutlama ekstralarını sonra ekleyin. 2001'den bu yana TÜRSAB A Grubu lisanslı, 50.000'den fazla misafire hizmet vermiş bir filo ile çalışırsınız.`,
    fleetHeading: "Filo Seçenekleri",
    priceUnit: "/saat",
    capacityLabel: "kişi kapasite",
    lengthSeparator: " · ",
    howItWorksBox: {
      heading: "Nasıl çalışır?",
      body: "Tekneyi seçin → tarih ve süreyi belirtin → WhatsApp veya telefon ile teklif alın. Marina ve nihai fiyat seçilen tekneye, tarihe ve eklenen hizmetlere göre onaylanır.",
    },
    extrasHeading: "Teklife Özel Ekstralar",
    extras: [
      "Akşam yemeği (kişi başı menü seçeneğiyle)",
      "Gün batımı zamanlaması",
      "Evlilik teklifi dekorasyonu",
      "Profesyonel fotoğrafçı",
      "Doğum günü / yıl dönümü pastası",
      "Canlı müzik veya DJ",
      "Alkol paketi",
      "Gece turu (şehir ışıkları)",
    ],
    ctaWhatsapp: "WhatsApp ile Teklif Al",
    breadcrumbHome: "Ana Sayfa",
    breadcrumbCurrent: "Tekne Kiralama İstanbul",
    viewInEnglish: "View in English →",
    faqTitle: "Sık Sorulan Sorular",
    faqs: [
      { q: "İstanbul'da tekne kiralama ne kadar?", a: `Saatlik fiyatlar tekne tipine ve kapasitesine göre €${startingRate}'dan başlar. 2 saatlik standart kiralama €${startingRate * 2}'dan, 4 saatlik tam gün paketi ise daha uygun fiyatla sunulur. Kesin fiyat; seçilen tekneye, tarihe ve eklenecek hizmetlere göre belirlenir.` },
      { q: "Minimum kiralama süresi kaçtır?", a: "Minimum kiralama süresi 2 saattir. Günlük veya yarım günlük kiralamalar da mevcuttur; uzun süreli kiralamalarda daha avantajlı fiyatlar uygulanır." },
      { q: "Tekneye akşam yemeği veya catering eklenebilir mi?", a: "Evet. Kişi başı menü seçenekleriyle tam catering hizmeti mevcuttur. Balık, et veya vejeteryan menüler arasından seçim yapabilir, içecek paketi de ekleyebilirsiniz. Reservasyon sırasında belirtmeniz yeterli." },
      { q: "Evlilik teklifi için tekne kiralanabilir mi?", a: "Kesinlikle. Evlilik teklifi tekne kiralama en popüler taleplerimizden biri. Çiçek, mum, gülsuyu ve profesyonel fotoğrafçı desteği ile tam paket hazırlanabilir. Detaylar için WhatsApp'tan ulaşın." },
      { q: "Tekne güzergahını biz mi belirleriz?", a: "Evet. Standart Boğaz güzergahlarından birini seçebilir ya da özel bir güzergah talep edebilirsiniz. Adalar turu, Sarıyer'e kadar uzun tur veya Anadolu yakasına geçiş gibi seçenekler mevcuttur." },
      { q: "Kaç kişiye kadar tekne kiralayabiliriz?", a: "Filomuzda 2 kişilik küçük yatlardan 30+ kişilik büyük teknelere kadar seçenekler bulunmaktadır. Büyük grup etkinlikleri için birden fazla tekne koordinasyonu da yapılmaktadır." },
    ],
    whyTitle: "Neden MerrySails?",
    whyItems: [
      { title: "TÜRSAB A Grubu Lisansı", desc: "2001'den bu yana A Grubu lisanslı. Güvenli rezervasyon, resmi sigorta, yasal güvence." },
      { title: "Geniş Filo", desc: "Küçük lüks yatlardan büyük etkinlik teknelerine kadar 10+ seçenek." },
      { title: "Ücretsiz İptal", desc: "48 saat öncesine kadar ücretsiz iptal ve tam para iadesi." },
      { title: "Özelleştirme", desc: "Yemek, fotoğrafçı, dekorasyon, müzik — her şeyi tek çatı altında organize ediyoruz." },
    ],
  },
  de: {
    title: "Bootsverleih Istanbul — Ab €380 | MerrySails",
    description: `Bootsverleih Istanbul ab €${startingRate} pro Stunde. Privates Boot auf dem Bosporus mieten, Dinner und Sonnenuntergang optional hinzubuchen. Direkt Angebot anfragen.`,
    canonicalPath: "/de/boat-rental-istanbul",
    eyebrow: "MerrySails Istanbul",
    heroTitle: "Bootsverleih Istanbul",
    heroDescription:
      `Privater Bootsverleih auf dem Bosporus ab €${startingRate} pro Stunde. Wählen Sie zuerst das Boot und die Route, danach ergänzen Sie optional Dinner, Sonnenuntergang oder Anlass-Extras. Sie buchen bei Merry Tourism, seit 2001 TÜRSAB-A-lizenziert und mit über 50.000 begrüßten Gästen.`,
    fleetHeading: "Flotte zur Auswahl",
    priceUnit: "/Stunde",
    capacityLabel: "Personen Kapazität",
    lengthSeparator: " · ",
    howItWorksBox: {
      heading: "So funktioniert es",
      body: "Boot auswählen → Datum und Dauer angeben → Angebot per WhatsApp oder Telefon erhalten. Anlegestelle und Endpreis werden je nach Boot, Termin und Zusatzleistungen bestätigt.",
    },
    extrasHeading: "Optionale Zusatzleistungen",
    extras: [
      "Dinner an Bord (mit Menüauswahl pro Person)",
      "Zeitplanung zum Sonnenuntergang",
      "Heiratsantrag-Dekoration",
      "Professioneller Fotograf",
      "Geburtstags- oder Jubiläumstorte",
      "Live-Musik oder DJ",
      "Getränkepaket inkl. Alkohol",
      "Nachttour mit Stadtbeleuchtung",
    ],
    ctaWhatsapp: "Angebot per WhatsApp anfragen",
    breadcrumbHome: "Startseite",
    breadcrumbCurrent: "Bootsverleih Istanbul",
    viewInEnglish: "View in English →",
    faqTitle: "Häufig gestellte Fragen",
    faqs: [
      { q: "Was kostet ein Bootsverleih in Istanbul?", a: `Die Stundenpreise beginnen ab €${startingRate}, abhängig von Bootstyp und Kapazität. Ein 2-stündiger Standardverleih beginnt ab €${startingRate * 2}. Der genaue Preis richtet sich nach Boot, Datum und Zusatzleistungen.` },
      { q: "Wie lange ist die Mindestmietdauer?", a: "Die Mindestmietdauer beträgt 2 Stunden. Halbtages- und Tagesmieten sind ebenfalls verfügbar; bei längeren Buchungen gelten günstigere Konditionen." },
      { q: "Kann Dinner oder Catering hinzugebucht werden?", a: "Ja. Vollständiger Catering-Service mit Menüauswahl pro Person ist verfügbar. Wählen Sie zwischen Fisch-, Fleisch- oder vegetarischen Menüs und fügen Sie optional ein Getränkepaket hinzu." },
      { q: "Kann ich ein Boot für einen Heiratsantrag mieten?", a: "Absolut. Heiratsantrags-Bootsmieten gehören zu unseren beliebtesten Anfragen. Wir organisieren Blumen, Kerzen, Rosenblätter und professionellen Fotografen auf Wunsch als Komplettpaket." },
      { q: "Können wir die Route selbst festlegen?", a: "Ja. Sie wählen aus Standardrouten auf dem Bosporus oder fordern eine individuelle Route an: Prinzeninseln, Fahrt bis Sarıyer oder zur asiatischen Seite." },
      { q: "Für wie viele Personen sind Boote erhältlich?", a: "Unsere Flotte reicht von kleinen Luxusjachten für 2 Personen bis hin zu größeren Schiffen für 30+ Personen. Für große Gruppenveranstaltungen koordinieren wir auch mehrere Boote." },
    ],
    whyTitle: "Warum MerrySails?",
    whyItems: [
      { title: "TÜRSAB A-Gruppe Lizenz", desc: "Seit 2001 A-Gruppe lizenziert. Sichere Buchung, offizielle Versicherung, rechtliche Absicherung." },
      { title: "Große Flotte", desc: "Von kleinen Luxusjachten bis großen Veranstaltungsbooten — über 10 Optionen." },
      { title: "Kostenlose Stornierung", desc: "Kostenlose Stornierung und volle Rückerstattung bis 48 Stunden vor Abfahrt." },
      { title: "Rundum-Service", desc: "Dinner, Fotograf, Dekoration, Musik — alles aus einer Hand." },
    ],
  },
  fr: {
    title: "Location Bateau Istanbul — À partir de €380 | MerrySails",
    description: `Location de bateau à Istanbul à partir de €${startingRate}/h. Bateau privé sur le Bosphore, dîner et coucher de soleil en option. Demandez un devis.`,
    canonicalPath: "/fr/boat-rental-istanbul",
    eyebrow: "MerrySails Istanbul",
    heroTitle: "Location de Bateau Istanbul",
    heroDescription:
      `Location de bateau privée sur le Bosphore à partir de €${startingRate} par heure. Choisissez d'abord le bateau et l'itinéraire, puis ajoutez le dîner, la programmation au coucher du soleil ou des options pour vos célébrations. Vous réservez auprès de Merry Tourism, licencié TÜRSAB Groupe A depuis 2001 avec plus de 50 000 voyageurs accueillis.`,
    fleetHeading: "Options de la flotte",
    priceUnit: "/heure",
    capacityLabel: "personnes de capacité",
    lengthSeparator: " · ",
    howItWorksBox: {
      heading: "Comment ça marche",
      body: "Choisissez le bateau → indiquez la date et la durée → recevez un devis par WhatsApp ou téléphone. Le port de départ et le tarif final sont confirmés selon le bateau, la date et les services ajoutés.",
    },
    extrasHeading: "Options en supplément",
    extras: [
      "Dîner à bord (avec choix de menu par personne)",
      "Programmation au coucher du soleil",
      "Décoration pour demande en mariage",
      "Photographe professionnel",
      "Gâteau d'anniversaire ou de mariage",
      "Musique live ou DJ",
      "Forfait boissons alcoolisées",
      "Tour nocturne avec lumières de la ville",
    ],
    ctaWhatsapp: "Demander un devis sur WhatsApp",
    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "Location de Bateau Istanbul",
    viewInEnglish: "View in English →",
    faqTitle: "Questions fréquentes",
    faqs: [
      { q: "Quel est le prix d'une location de bateau à Istanbul ?", a: `Les tarifs horaires commencent à partir de €${startingRate} selon le type et la capacité du bateau. Une location standard de 2 heures commence à €${startingRate * 2}. Le tarif exact dépend du bateau choisi, de la date et des services inclus.` },
      { q: "Quelle est la durée minimale de location ?", a: "La durée minimale est de 2 heures. Des locations à la demi-journée ou à la journée entière sont également disponibles, avec des tarifs plus avantageux." },
      { q: "Peut-on ajouter un dîner ou un traiteur ?", a: "Oui. Un service traiteur complet avec menu au choix par personne est disponible. Choisissez entre des menus poisson, viande ou végétarien, et ajoutez un forfait boissons si vous le souhaitez." },
      { q: "Peut-on louer un bateau pour une demande en mariage ?", a: "Absolument. Les locations de bateaux pour demandes en mariage font partie de nos demandes les plus fréquentes. Nous organisons fleurs, bougies, pétales de rose et photographe professionnel en package complet sur demande." },
      { q: "Peut-on choisir l'itinéraire soi-même ?", a: "Oui. Vous choisissez parmi des itinéraires standard sur le Bosphore ou demandez un itinéraire personnalisé : îles des Princes, remontée jusqu'à Sarıyer ou traversée vers la rive asiatique." },
      { q: "Combien de personnes les bateaux peuvent-ils accueillir ?", a: "Notre flotte va de petits yachts de luxe pour 2 personnes à de grands bateaux pour 30+ personnes. Pour les grands événements en groupe, nous coordonnons aussi plusieurs bateaux." },
    ],
    whyTitle: "Pourquoi MerrySails ?",
    whyItems: [
      { title: "Licence TÜRSAB groupe A", desc: "Licencié groupe A depuis 2001. Réservation sécurisée, assurance officielle, garantie légale." },
      { title: "Grande flotte", desc: "Des petits yachts de luxe aux grands bateaux événementiels — plus de 10 options." },
      { title: "Annulation gratuite", desc: "Annulation gratuite et remboursement intégral jusqu'à 48 heures avant le départ." },
      { title: "Service clé en main", desc: "Dîner, photographe, décoration, musique — tout organisé en un seul endroit." },
    ],
  },
  nl: {
    title: "Boothuur Istanbul — Vanaf €380 | MerrySails",
    description: `Boothuur Istanbul vanaf €${startingRate} per uur. Privéboottocht op de Bosporus, diner en zonsondergang optioneel toe te voegen. Vraag direct een offerte aan.`,
    canonicalPath: "/nl/boat-rental-istanbul",
    eyebrow: "MerrySails Istanbul",
    heroTitle: "Boothuur Istanbul",
    heroDescription:
      `Privéboothuur op de Bosporus vanaf €${startingRate} per uur. Kies eerst de boot en de route en voeg daarna optioneel diner, zonsondergangtiming of feestelijke extra's toe. U boekt bij Merry Tourism, sinds 2001 TÜRSAB A-gelicenseerd met meer dan 50.000 verwelkomde gasten.`,
    fleetHeading: "Vlootopties",
    priceUnit: "/uur",
    capacityLabel: "personen capaciteit",
    lengthSeparator: " · ",
    howItWorksBox: {
      heading: "Hoe het werkt",
      body: "Kies de boot → geef datum en duur op → ontvang een offerte via WhatsApp of telefoon. De jachthaven en de einduprijs worden bevestigd op basis van de gekozen boot, datum en extra's.",
    },
    extrasHeading: "Optionele extra's",
    extras: [
      "Diner aan boord (met menukeuze per persoon)",
      "Timing rond de zonsondergang",
      "Decoratie huwelijksaanzoek",
      "Professionele fotograaf",
      "Verjaardags- of jubileumtaart",
      "Live muziek of dj",
      "Drankenpakket inclusief alcohol",
      "Avondtocht met stadslichten",
    ],
    ctaWhatsapp: "Offerte aanvragen via WhatsApp",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Boothuur Istanbul",
    viewInEnglish: "View in English →",
    faqTitle: "Veelgestelde vragen",
    faqs: [
      { q: "Wat kost boothuur in Istanbul?", a: `De uurtarieven beginnen vanaf €${startingRate}, afhankelijk van het type en de capaciteit van de boot. Een standaardhuur van 2 uur begint vanaf €${startingRate * 2}. De exacte prijs hangt af van de gekozen boot, datum en extra diensten.` },
      { q: "Wat is de minimale huurduur?", a: "De minimale huurduur is 2 uur. Halve dag- en volledige dagboekingen zijn ook beschikbaar, met voordeligere tarieven bij langere boekingen." },
      { q: "Kan een diner of catering worden toegevoegd?", a: "Ja. Volledige cateringservice met menukeuze per persoon is beschikbaar. Kies uit vis-, vlees- of vegetarische menu's en voeg optioneel een drankenpakket toe." },
      { q: "Kan ik een boot huren voor een huwelijksaanzoek?", a: "Absoluut. Boothuur voor huwelijksaanzoeken is een van onze populairste aanvragen. We organiseren bloemen, kaarsen, rozenblaadjes en een professionele fotograaf als compleet pakket op aanvraag." },
      { q: "Kunnen we de route zelf kiezen?", a: "Ja. Kies uit standaardroutes op de Bosporus of vraag een gepersonaliseerde route aan: Prinseilanden, vaart tot Sarıyer of oversteek naar de Aziatische kant." },
      { q: "Voor hoeveel personen zijn boten beschikbaar?", a: "Onze vloot varieert van kleine luxe jachten voor 2 personen tot grote boten voor 30+ personen. Voor grote groepsevenementen coördineren we ook meerdere boten." },
    ],
    whyTitle: "Waarom MerrySails?",
    whyItems: [
      { title: "TÜRSAB A-groep certificering", desc: "Gecertificeerd A-groep sinds 2001. Veilig boeken, officiële verzekering, juridische zekerheid." },
      { title: "Grote vloot", desc: "Van kleine luxe jachten tot grote evenementsboten — meer dan 10 opties." },
      { title: "Gratis annulering", desc: "Gratis annulering en volledige terugbetaling tot 48 uur voor vertrek." },
      { title: "Alles-in-één service", desc: "Diner, fotograaf, decoratie, muziek — alles op één plek geregeld." },
    ],
  },
};

export function generateStaticParams() {
  return ACTIVE_LOCALES.filter((l) => l !== "en").map((locale) => ({ locale }));
}

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

  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: canonicalUrl,
      languages: buildHreflang("/boat-rental-istanbul"),
    },
    openGraph: {
      title: t.title,
      description: t.description,
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
      title: t.title,
      description: t.description,
      images: [`${SITE_URL}/og-image.jpg`],
    },
  };
}

export default async function LocaleBoatRentalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale === "en") notFound();

  const t = TRANSLATIONS[locale];
  if (!t) notFound();

  const canonicalUrl = `${SITE_URL}${t.canonicalPath}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.breadcrumbHome, item: SITE_URL },
      { "@type": "ListItem", position: 2, name: t.breadcrumbCurrent, item: canonicalUrl },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": ["TouristTrip", "Service"],
    name: t.heroTitle,
    description: t.description,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "City", name: "Istanbul" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "312",
      bestRating: "5",
      worstRating: "1",
    },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: startingRate,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
    url: canonicalUrl,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="pt-28 pb-20 bg-[var(--surface-alt)]">
        <div className="container-main">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6"
          >
            <Link href={`/${locale}`} className="hover:text-[var(--brand-primary)]">
              {t.breadcrumbHome}
            </Link>
            <span>/</span>
            <span className="text-[var(--heading)]">{t.breadcrumbCurrent}</span>
          </nav>

          <div className="mb-10">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
              {t.eyebrow}
            </p>
            <h1 className="mb-4 text-4xl font-bold text-[var(--heading)] md:text-5xl">
              {t.heroTitle}
            </h1>
            <p className="max-w-2xl text-lg text-[var(--text-muted)]">
              {t.heroDescription}
            </p>
          </div>

          <section className="rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-6">
              {t.fleetHeading}
            </h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {fleet.slice(0, 6).map((boat) => (
                <div
                  key={boat.id}
                  className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4"
                >
                  <h3 className="font-semibold text-[var(--heading)] mb-1">{boat.name}</h3>
                  <p className="text-xl font-bold text-[var(--brand-primary)] mb-1">
                    €{boat.pricePerHour}
                    <span className="text-sm font-normal text-[var(--text-muted)]">
                      {t.priceUnit}
                    </span>
                  </p>
                  <p className="text-sm text-[var(--text-muted)]">
                    {boat.capacity} {t.capacityLabel}
                    {boat.length ? `${t.lengthSeparator}${boat.length}` : ""}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/20 p-4">
              <p className="text-sm text-[var(--text-muted)]">
                <strong className="text-[var(--heading)]">{t.howItWorksBox.heading}</strong>{" "}
                {t.howItWorksBox.body}
              </p>
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-xl font-bold text-[var(--heading)] mb-4">
              {t.extrasHeading}
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              {t.extras.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm text-[var(--text-muted)]"
                >
                  <span className="text-[var(--brand-primary)]">✓</span>
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-6">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                {t.ctaWhatsapp}
              </a>
            </div>
          </section>

          {/* Why MerrySails */}
          <section className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-6">{t.whyTitle}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {t.whyItems.map((item) => (
                <div key={item.title} className="flex gap-3">
                  <div className="mt-1 h-5 w-5 shrink-0 rounded-full bg-[var(--brand-primary)]/15 flex items-center justify-center">
                    <svg className="h-3 w-3 text-[var(--brand-primary)]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--heading)]">{item.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-[var(--body-text)]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-6">{t.faqTitle}</h2>
            <div className="flex flex-col gap-3">
              {t.faqs.map((faq) => (
                <details key={faq.q} className="group rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] overflow-hidden">
                  <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-semibold text-[var(--heading)] list-none">
                    <span>{faq.q}</span>
                    <svg className="h-4 w-4 shrink-0 text-[var(--text-muted)] transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="border-t border-[var(--line)] bg-white px-5 py-4 text-sm leading-relaxed text-[var(--body-text)]">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </section>

          <div className="mt-8 flex justify-end">
            <Link href="/boat-rental-istanbul" className="text-sm text-[var(--text-muted)] hover:text-[var(--brand-primary)]">
              {t.viewInEnglish}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
