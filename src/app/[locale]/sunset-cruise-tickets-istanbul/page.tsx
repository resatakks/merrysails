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
    metaTitle: "İstanbul Gün Batımı Turu Bileti 2026 | Boğaz Gün Batımı Bilet Desteği | MerrySails",
    metaDescription:
      "İstanbul Boğaz gün batımı turu bileti için paket seçimi, rezervasyon ve direkt booking desteği. Paylaşımlı gün batımı turu zaten seçildiyse buradan başlayın.",
    canonicalPath: "/tr/sunset-cruise-tickets-istanbul",
    breadcrumbHome: "Ana Sayfa",
    breadcrumbCurrent: "Gün Batımı Turu Bileti",
    heroTitle: "İstanbul Gün Batımı Turu Bileti",
    heroDesc:
      "Paylaşımlı Boğaz gün batımı turuna karar verdiyseniz ve bilet, paket seçimi veya direkt rezervasyon konusunda netlik arıyorsanız bu sayfa doğru yerdedir.",
    infoHeading: "Gün Batımı Turu Bilet Bilgisi",
    infoItems: [
      {
        title: "Paket seçenekleri",
        desc: "Paylaşımlı gün batımı turu farklı dahil hizmet seviyeleriyle karşılaştırılabilir paketler sunar. Ana tur sayfasında tüm paketleri görebilirsiniz.",
      },
      {
        title: "Direkt rezervasyon",
        desc: "Bilet, MerrySails üzerinden direkt rezervasyon yoluyla alınır; üçüncü taraf platform komisyonu ödenmez. Rezervasyon onayı e-posta ile gönderilir.",
      },
      {
        title: "İptal ve değişiklik",
        desc: "İptal ve değişiklik koşulları rezervasyon onayında belirtilir. Sorularınız için WhatsApp üzerinden iletişime geçebilirsiniz.",
      },
    ],
    faqHeading: "Sık Sorulan Sorular",
    faqs: [
      {
        q: "Gün batımı turu bileti nereden alınır?",
        a: "MerrySails gün batımı turu bileti direkt rezervasyon yoluyla alınır. Ana tur sayfasındaki rezervasyon formunu doldurmanız yeterlidir.",
      },
      {
        q: "Bilet fiyatı ne kadar?",
        a: "Paylaşımlı Boğaz gün batımı turu paket fiyatları ana tur sayfasında detaylı şekilde görüntülenebilir. Fiyatlar kişi başı EUR olarak belirtilmiştir.",
      },
      {
        q: "Son dakika bilet alınabilir mi?",
        a: "Uygunluk durumuna göre son dakika rezervasyonu mümkündür. Güncel müsaitlik için WhatsApp üzerinden hızlıca öğrenebilirsiniz.",
      },
    ],
    ctaHeading: "Biletinizi rezerve edin",
    ctaDesc: "Tarih ve misafir sayısını paylaşın, hızla yanıt alın.",
    ctaBtn: "WhatsApp ile Rezervasyon",
    mainPageLabel: "Tam Gün Batımı Turu Sayfasına Git",
  },
  de: {
    metaTitle: "Sonnenuntergang Kreuzfahrt Tickets Istanbul 2026 | Bosporus Sunset Tickets | MerrySails",
    metaDescription:
      "Tickets für die geteilte Bosporus-Sonnenuntergangskreuzfahrt in Istanbul: Paketauswahl, Direktbuchung und Reservierungssupport.",
    canonicalPath: "/de/sunset-cruise-tickets-istanbul",
    breadcrumbHome: "Startseite",
    breadcrumbCurrent: "Sonnenuntergang Kreuzfahrt Tickets",
    heroTitle: "Sonnenuntergang Kreuzfahrt Tickets Istanbul",
    heroDesc:
      "Wenn Sie sich für die geteilte Bosporus-Sonnenuntergangskreuzfahrt entschieden haben und Klarheit über Tickets, Paketauswahl oder Direktbuchung benötigen, sind Sie hier richtig.",
    infoHeading: "Ticket-Informationen",
    infoItems: [
      {
        title: "Paketoptionen",
        desc: "Die geteilte Sunset-Kreuzfahrt bietet verschiedene vergleichbare Pakete mit unterschiedlichen Leistungen. Alle Pakete finden Sie auf der Haupt-Tourseite.",
      },
      {
        title: "Direktbuchung",
        desc: "Tickets werden direkt über MerrySails gebucht — ohne Provision an Drittanbieter-Plattformen. Die Buchungsbestätigung wird per E-Mail zugesandt.",
      },
      {
        title: "Stornierung und Änderungen",
        desc: "Die Storno- und Änderungsbedingungen sind in der Buchungsbestätigung aufgeführt. Bei Fragen stehen wir über WhatsApp zur Verfügung.",
      },
    ],
    faqHeading: "Häufige Fragen",
    faqs: [
      {
        q: "Wo kaufe ich Tickets für die Sunset-Kreuzfahrt?",
        a: "Tickets werden direkt über MerrySails gebucht. Füllen Sie das Buchungsformular auf der Haupt-Tourseite aus.",
      },
      {
        q: "Was kostet ein Ticket?",
        a: "Die Paketpreise für die geteilte Sunset-Kreuzfahrt sind auf der Haupt-Tourseite detailliert aufgeführt — pro Person in EUR.",
      },
      {
        q: "Sind Last-Minute-Tickets verfügbar?",
        a: "Je nach Verfügbarkeit sind Last-Minute-Buchungen möglich. Aktuelle Verfügbarkeiten können schnell per WhatsApp erfragt werden.",
      },
    ],
    ctaHeading: "Tickets reservieren",
    ctaDesc: "Teilen Sie Datum und Personenzahl mit — wir antworten schnell.",
    ctaBtn: "Via WhatsApp buchen",
    mainPageLabel: "Zur vollständigen Sunset-Kreuzfahrt-Seite",
  },
  fr: {
    metaTitle: "Billets Croisière Coucher de Soleil Istanbul 2026 | Bosphore Sunset | MerrySails",
    metaDescription:
      "Billets pour la croisière coucher de soleil partagée sur le Bosphore à Istanbul : sélection de forfait, réservation directe et support réservation.",
    canonicalPath: "/fr/sunset-cruise-tickets-istanbul",
    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "Billets Croisière Coucher de Soleil",
    heroTitle: "Billets Croisière Coucher de Soleil Istanbul",
    heroDesc:
      "Si vous avez choisi la croisière coucher de soleil partagée sur le Bosphore et souhaitez des précisions sur les billets, le choix de forfait ou la réservation directe, cette page est pour vous.",
    infoHeading: "Informations sur les Billets",
    infoItems: [
      {
        title: "Options de forfait",
        desc: "La croisière coucher de soleil partagée propose plusieurs forfaits comparables avec différentes prestations. Tous les forfaits sont visibles sur la page principale.",
      },
      {
        title: "Réservation directe",
        desc: "Les billets sont achetés directement via MerrySails — sans commission de plateforme tierce. La confirmation de réservation est envoyée par e-mail.",
      },
      {
        title: "Annulation et modifications",
        desc: "Les conditions d'annulation et de modification sont précisées dans la confirmation de réservation. Pour toute question, contactez-nous via WhatsApp.",
      },
    ],
    faqHeading: "Questions Fréquentes",
    faqs: [
      {
        q: "Où acheter des billets pour la croisière coucher de soleil ?",
        a: "Les billets sont réservés directement via MerrySails. Remplissez le formulaire de réservation sur la page principale de la croisière.",
      },
      {
        q: "Quel est le prix d'un billet ?",
        a: "Les tarifs des forfaits de la croisière coucher de soleil partagée sont détaillés sur la page principale — par personne en EUR.",
      },
      {
        q: "Les billets de dernière minute sont-ils disponibles ?",
        a: "Des réservations de dernière minute sont possibles selon les disponibilités. Vérifiez rapidement les disponibilités actuelles via WhatsApp.",
      },
    ],
    ctaHeading: "Réserver vos billets",
    ctaDesc: "Partagez la date et le nombre de personnes — nous répondons rapidement.",
    ctaBtn: "Réserver via WhatsApp",
    mainPageLabel: "Voir la page complète de la croisière coucher de soleil",
  },
  nl: {
    metaTitle: "Zonsondergang Cruise Tickets Istanbul 2026 | Bosporus Sunset Tickets | MerrySails",
    metaDescription:
      "Tickets voor de gedeelde Bosporus-zonsondergangs-cruise in Istanbul: pakketkeuze, directe boeking en reserveringsondersteuning.",
    canonicalPath: "/nl/sunset-cruise-tickets-istanbul",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Zonsondergang Cruise Tickets",
    heroTitle: "Zonsondergang Cruise Tickets Istanbul",
    heroDesc:
      "Als u heeft gekozen voor de gedeelde Bosporus-zonsondergangs-cruise en duidelijkheid wilt over tickets, pakketkeuze of directe boeking, bent u hier op de juiste plek.",
    infoHeading: "Ticketinformatie",
    infoItems: [
      {
        title: "Pakketopties",
        desc: "De gedeelde zonsondergangs-cruise biedt verschillende vergelijkbare pakketten met uiteenlopende inclusies. Alle pakketten zijn te zien op de hoofdpagina.",
      },
      {
        title: "Directe boeking",
        desc: "Tickets worden direct via MerrySails geboekt — zonder commissie aan derden-platforms. De boekingsbevestiging wordt per e-mail verzonden.",
      },
      {
        title: "Annulering en wijzigingen",
        desc: "De annulerings- en wijzigingsvoorwaarden staan vermeld in de boekingsbevestiging. Voor vragen kunt u contact opnemen via WhatsApp.",
      },
    ],
    faqHeading: "Veelgestelde Vragen",
    faqs: [
      {
        q: "Waar koop ik tickets voor de zonsondergangs-cruise?",
        a: "Tickets worden direct via MerrySails geboekt. Vul het reserveringsformulier in op de hoofdpagina van de cruise.",
      },
      {
        q: "Wat kost een ticket?",
        a: "De pakketprijzen voor de gedeelde zonsondergangs-cruise staan gedetailleerd op de hoofdpagina — per persoon in EUR.",
      },
      {
        q: "Zijn last-minute tickets beschikbaar?",
        a: "Afhankelijk van de beschikbaarheid zijn last-minute boekingen mogelijk. Controleer snel de actuele beschikbaarheid via WhatsApp.",
      },
    ],
    ctaHeading: "Tickets reserveren",
    ctaDesc: "Deel de datum en het aantal personen — wij reageren snel.",
    ctaBtn: "Reserveren via WhatsApp",
    mainPageLabel: "Naar de volledige zonsondergangs-cruise-pagina",
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
  const languages = buildHreflang("/sunset-cruise-tickets-istanbul");
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

export default async function SunsetCruiseTicketsLocalePage({
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
          <Link href={`/${locale}/cruises/bosphorus-sunset-cruise`} className="btn-secondary">
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
