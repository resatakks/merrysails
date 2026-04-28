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
  eyebrow: string;
  heroTitle: string;
  heroDesc: string;
  whyHeading: string;
  reasons: { title: string; desc: string }[];
  faqHeading: string;
  faqs: { q: string; a: string }[];
  ctaHeading: string;
  ctaDesc: string;
  ctaBtn: string;
};

const TRANSLATIONS: Record<string, LocaleContent> = {
  tr: {
    metaTitle: "İstanbul Fotoğrafçılı Evlilik Teklifi Yatı 2026 | Boğaz'da Gizli Çekim | MerrySails",
    metaDescription:
      "İstanbul'da fotoğrafçılı evlilik teklifi yatı: anın doğal ve gizli bir şekilde fotoğraflanması, özel rota planlaması ve Boğaz manzarası eşliğinde özel bir teklif formatı.",
    canonicalPath: "/tr/proposal-yacht-with-photographer-istanbul",
    breadcrumbHome: "Ana Sayfa",
    breadcrumbCurrent: "Fotoğrafçılı Teklif Yatı İstanbul",
    eyebrow: "Özel evlilik teklifi",
    heroTitle: "İstanbul Fotoğrafçılı Teklif Yatı",
    heroDesc:
      "Evlilik teklifini Boğaz'da özel bir yatta gerçekleştirin, anı gizli ve doğal bir şekilde fotoğraflayın. Fotoğraf kapsamı teklifin ana planlama detayıysa bu sayfa doğru yer.",
    whyHeading: "Neden Fotoğrafçıyla Birlikte Teklif Yatı?",
    reasons: [
      {
        title: "Gizli, doğal çekim",
        desc: "Fotoğrafçı, anın spontane kalmasını sağlamak için önceden hazır bulunur. Sürpriz korunur; an sahici şekilde kaydedilir.",
      },
      {
        title: "Çift portreleri",
        desc: "Teklif anı çekimlerinin yanı sıra Boğaz manzarasıyla çift portreleri ve altın saat fotoğrafları planlanabilir.",
      },
      {
        title: "Özel rota",
        desc: "Fotoğraf açısı ve ışık kalitesi göz önünde bulundurularak teklif zamanlaması ve rota kişiselleştirilir.",
      },
    ],
    faqHeading: "Sık Sorulan Sorular",
    faqs: [
      {
        q: "Fotoğrafçı teklif anında nerede durur?",
        a: "Fotoğrafçı tekneye önceden biner ve teklife dahil olmayan biri gibi konumlanır. Gizli çekim için önceden koordinasyon sağlanır.",
      },
      {
        q: "Video çekimi de sağlanıyor mu?",
        a: "Evet, talebe göre video çekimi veya kısa film formatı eklenebilir. Rezervasyon aşamasında belirtmeniz yeterlidir.",
      },
      {
        q: "Çiçek, pasta veya dekorasyon da organize edilebilir mi?",
        a: "Evet. Çiçek buketi, pasta, keman ve masa dekorasyon hizmetleri fotoğrafçı eklentisiyle birleştirilebilir.",
      },
    ],
    ctaHeading: "Teklif planını paylaşın",
    ctaDesc: "Tarih, tercih ettiğiniz zamanlama ve fotoğraf kapsamını gönderin, hızla dönelim.",
    ctaBtn: "WhatsApp ile Planla",
  },
  de: {
    metaTitle: "Heiratsantrag Yacht mit Fotograf Istanbul 2026 | Bosporus Geheimfoto | MerrySails",
    metaDescription:
      "Heiratsantrag auf einer Privatyacht am Bosporus mit diskretem Fotografen: natürliche, verborgene Aufnahmen des Moments und individuelle Routenplanung in Istanbul.",
    canonicalPath: "/de/proposal-yacht-with-photographer-istanbul",
    breadcrumbHome: "Startseite",
    breadcrumbCurrent: "Heiratsantrag Yacht mit Fotograf Istanbul",
    eyebrow: "Privater Heiratsantrag",
    heroTitle: "Heiratsantrag Yacht mit Fotograf in Istanbul",
    heroDesc:
      "Machen Sie Ihren Heiratsantrag auf einer Privatyacht am Bosporus und lassen Sie den Moment diskret und natürlich festhalten. Diese Seite ist ideal, wenn die Fotografieabdeckung Ihr Hauptplanungsdetail ist.",
    whyHeading: "Warum ein Antrag auf der Yacht mit Fotograf?",
    reasons: [
      {
        title: "Diskretes, natürliches Shooting",
        desc: "Der Fotograf positioniert sich vorab, damit der Moment spontan wirkt. Die Überraschung bleibt erhalten; der Augenblick wird authentisch festgehalten.",
      },
      {
        title: "Paarporträts",
        desc: "Neben den Antrags-Aufnahmen können Paarporträts mit Bosporus-Panorama und Goldstunden-Fotos geplant werden.",
      },
      {
        title: "Individuelle Route",
        desc: "Timing und Route werden unter Berücksichtigung des besten Fotolichts und der idealen Kamerawinkel personalisiert.",
      },
    ],
    faqHeading: "Häufige Fragen",
    faqs: [
      {
        q: "Wo positioniert sich der Fotograf beim Antrag?",
        a: "Der Fotograf besteigt das Schiff vorab und positioniert sich so, als wäre er kein Teil des Antrags. Die diskrete Aufnahme wird vorab koordiniert.",
      },
      {
        q: "Ist Videoaufnahme auch möglich?",
        a: "Ja, auf Wunsch kann Videoaufnahme oder ein Kurzfilm-Format hinzugefügt werden. Einfach bei der Buchung angeben.",
      },
      {
        q: "Können Blumen, Kuchen oder Dekoration arrangiert werden?",
        a: "Ja. Blumenstrauß, Kuchen, Geige und Tischdekoration können mit dem Fotografen-Add-on kombiniert werden.",
      },
    ],
    ctaHeading: "Antragsplan teilen",
    ctaDesc: "Teilen Sie Datum, Wunschtiming und Fotoumfang mit — wir antworten schnell.",
    ctaBtn: "Plan via WhatsApp",
  },
  fr: {
    metaTitle: "Yacht Demande en Mariage avec Photographe Istanbul 2026 | Bosphore | MerrySails",
    metaDescription:
      "Demande en mariage sur yacht privé au Bosphore avec photographe discret à Istanbul : photos naturelles du moment, planification de route personnalisée.",
    canonicalPath: "/fr/proposal-yacht-with-photographer-istanbul",
    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "Demande en Mariage Yacht avec Photographe",
    eyebrow: "Demande en mariage privée",
    heroTitle: "Demande en Mariage sur Yacht avec Photographe à Istanbul",
    heroDesc:
      "Faites votre demande en mariage sur un yacht privé au Bosphore et capturez le moment discrètement et naturellement. Cette page est idéale si la couverture photographique est votre principal détail de planification.",
    whyHeading: "Pourquoi une demande en mariage sur yacht avec photographe ?",
    reasons: [
      {
        title: "Shooting discret et naturel",
        desc: "Le photographe se positionne à l'avance pour que le moment reste spontané. La surprise est préservée ; l'instant est capturé authentiquement.",
      },
      {
        title: "Portraits de couple",
        desc: "En plus des photos de la demande, des portraits de couple avec le panorama du Bosphore et des photos en lumière dorée peuvent être planifiés.",
      },
      {
        title: "Route personnalisée",
        desc: "Le timing et l'itinéraire sont personnalisés en tenant compte de la meilleure lumière photo et des meilleurs angles de vue.",
      },
    ],
    faqHeading: "Questions Fréquentes",
    faqs: [
      {
        q: "Où se positionne le photographe lors de la demande ?",
        a: "Le photographe monte à bord à l'avance et se positionne comme s'il ne faisait pas partie de la demande. La prise de vue discrète est coordonnée à l'avance.",
      },
      {
        q: "La vidéo est-elle également possible ?",
        a: "Oui, la vidéo ou le format court-métrage peut être ajouté sur demande. Il suffit de l'indiquer lors de la réservation.",
      },
      {
        q: "Des fleurs, un gâteau ou une décoration peuvent-ils être arrangés ?",
        a: "Oui. Bouquet, gâteau, violoniste et décoration de table peuvent être combinés avec l'option photographe.",
      },
    ],
    ctaHeading: "Partagez votre plan de demande",
    ctaDesc: "Envoyez la date, le timing souhaité et la couverture photo — nous répondons rapidement.",
    ctaBtn: "Planifier via WhatsApp",
  },
  nl: {
    metaTitle: "Huwelijksaanzoek Jacht met Fotograaf Istanbul 2026 | Bosporus | MerrySails",
    metaDescription:
      "Huwelijksaanzoek op privéjacht aan de Bosporus met discrete fotograaf in Istanbul: natuurlijke, verborgen foto's van het moment en gepersonaliseerde routeplanning.",
    canonicalPath: "/nl/proposal-yacht-with-photographer-istanbul",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Huwelijksaanzoek Jacht met Fotograaf",
    eyebrow: "Privé huwelijksaanzoek",
    heroTitle: "Huwelijksaanzoek op Jacht met Fotograaf in Istanbul",
    heroDesc:
      "Doe uw huwelijksaanzoek op een privéjacht aan de Bosporus en leg het moment discreet en natuurlijk vast. Deze pagina is ideaal als fotografiedekking uw belangrijkste planningsdetail is.",
    whyHeading: "Waarom een aanzoek op jacht met fotograaf?",
    reasons: [
      {
        title: "Discrete, natuurlijke fotoshoot",
        desc: "De fotograaf positioneert zich vooraf zodat het moment spontaan blijft. De verrassing wordt bewaard; het moment wordt authentiek vastgelegd.",
      },
      {
        title: "Koppelportretten",
        desc: "Naast de aanzoekfoto's kunnen koppelportretten met Bosporus-panorama en gouden-uur-foto's worden gepland.",
      },
      {
        title: "Gepersonaliseerde route",
        desc: "Timing en route worden gepersonaliseerd rekening houdend met het beste fotolicht en de ideale camerahoeken.",
      },
    ],
    faqHeading: "Veelgestelde Vragen",
    faqs: [
      {
        q: "Waar positioneert de fotograaf zich tijdens het aanzoek?",
        a: "De fotograaf stapt vooraf aan boord en positioneert zich alsof hij geen deel uitmaakt van het aanzoek. Discrete opname wordt vooraf gecoördineerd.",
      },
      {
        q: "Is video-opname ook mogelijk?",
        a: "Ja, op verzoek kan video-opname of een korte filmformat worden toegevoegd. Geef dit gewoon aan bij de boeking.",
      },
      {
        q: "Kunnen bloemen, taart of decoratie worden geregeld?",
        a: "Ja. Boeket, taart, viool en tafeldecoratie kunnen worden gecombineerd met de fotografenoptie.",
      },
    ],
    ctaHeading: "Deel uw aanzoekplan",
    ctaDesc: "Stuur de datum, gewenste timing en fotografiedekking — wij reageren snel.",
    ctaBtn: "Plannen via WhatsApp",
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
  const languages = buildHreflang("/proposal-yacht-with-photographer-istanbul");
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

export default async function ProposalYachtPhotographerLocalePage({
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
          <Link href={`/${locale}/proposal-yacht-rental-istanbul`} className="hover:text-[var(--brand-primary)]">
            {locale === "tr" ? "Teklif Yatı" : locale === "de" ? "Heiratsantrag Yacht" : locale === "fr" ? "Yacht Demande" : "Aanzoek Jacht"}
          </Link>
          <span>/</span>
          <span className="text-[var(--heading)] truncate">{t.breadcrumbCurrent}</span>
        </nav>

        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--brand-primary)] mb-3">{t.eyebrow}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--heading)] mb-4">{t.heroTitle}</h1>
          <p className="max-w-2xl text-base leading-relaxed text-[var(--text-muted)]">{t.heroDesc}</p>
        </div>

        <section className="mb-8 rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8">
          <h2 className="text-xl font-bold text-[var(--heading)] mb-5">{t.whyHeading}</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {t.reasons.map((r) => (
              <div key={r.title} className="rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
                <h3 className="text-base font-semibold text-[var(--heading)] mb-2">{r.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">{r.desc}</p>
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
