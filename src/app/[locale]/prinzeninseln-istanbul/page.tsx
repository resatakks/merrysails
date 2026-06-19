import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Anchor, Ship, MapPin, Clock, Users, Trees } from "lucide-react";
import { SITE_URL, TURSAB_LICENSE_NUMBER, WHATSAPP_URL } from "@/lib/constants";
import { isActiveLocale, type SiteLocale } from "@/i18n/config";

export const revalidate = 3600;

// DE-only German slug — Prinzeninseln targets local DE search intent
// directly. EN equivalent lives at /princes-islands-tour-istanbul.
export async function generateStaticParams() {
  return [{ locale: "de" }];
}

const canonicalUrl = `${SITE_URL}/de/prinzeninseln-istanbul`;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "de") return {};
  return {
    title: "Prinzeninseln Tour Istanbul — ab €45",
    description:
      "Prinzeninseln-Tour ab Istanbul 2026 — geteilter Ganztagsausflug €45 (Fähre + Guide + Mittag) oder private Yacht ab €220. Büyükada, Heybeliada, autofreie Inseln.",
    alternates: {
      canonical: canonicalUrl,
      languages: undefined,
    },
    openGraph: {
      title: "Prinzeninseln Tour Istanbul — ab €45",
      description:
        "Zwei Wege auf die Prinzeninseln ab Istanbul: 8-Stunden-Gruppenausflug €45 oder private Yacht ab €220. Beide Formate im Vergleich.",
      url: canonicalUrl,
      type: "article",
    },
  };
}

const ISLANDS = [
  {
    name: "Büyükada",
    sizeLabel: "Größte · 5,4 km²",
    summary:
      "Die Hauptattraktion. Viktorianische Holzvillen, das Aya-Yorgi-Kloster auf dem höchsten Hügel, kiefernbeschattete Straßen und der beliebte Strand Yörükali. Etwa 75-90 Min. mit der öffentlichen Fähre ab Kabataş.",
  },
  {
    name: "Heybeliada",
    sizeLabel: "Zweitgrößte · 2,3 km²",
    summary:
      "Ruhiger als Büyükada, mit dem historischen griechisch-orthodoxen Halki-Seminar, einem schönen Küstenwanderweg und dem Picknickbereich Değirmenburnu. Gleiche Fährhaltestellen wie Büyükada.",
  },
  {
    name: "Burgazada",
    sizeLabel: "Mittel · 1,5 km²",
    summary:
      "Kompakt und intim. Ideal für einen entspannten Tag mit Fisch-Mittagessen an den Kalpazankaya-Klippen, einfachen Wanderrunden und viel weniger Touristen als die beiden größeren Inseln.",
  },
  {
    name: "Kınalıada",
    sizeLabel: "Istanbul am nächsten · 1,3 km²",
    summary:
      "Erste Station auf der Fährroute — 40 Min. ab Kabataş. Sandstrände, Fischrestaurants am Pier und kleine armenische Kirchen im Dorf.",
  },
];

const FAQ_ITEMS = [
  {
    q: "Was ist der günstigste Weg, die Prinzeninseln ab Istanbul zu besuchen?",
    a: "Die öffentliche Şehir-Hatları-Fähre ab Kabataş kostet ~₺40 (€1,20) einfach und erreicht Büyükada in 75-90 Min. Der MerrySails-Ganztagsausflug mit €45 enthält Hin- und Rückfähre, Guide, Mittagessen und einen strukturierten Inselrundgang — sinnvoll, wenn Sie nicht selbst navigieren oder türkische Fahrpläne lesen wollen.",
  },
  {
    q: "Sind Autos auf den Prinzeninseln erlaubt?",
    a: "Nein — Privatautos sind auf allen vier bewohnten Inseln verboten. Einziges motorisiertes Transportmittel sind kommunale Elektrofahrzeuge. Einheimische und Besucher bewegen sich mit Fahrrad, Elektro-Shuttle oder zu Fuß. Die autofreie Atmosphäre ist die Hauptattraktion der Inseln.",
  },
  {
    q: "Wie lange dauert eine Prinzeninseln-Tour ab Istanbul?",
    a: "Ein geführter Ganztagsausflug dauert 8 Stunden door-to-door (Abfahrt 09:00, Rückkehr ~17:00). Eine private Yacht-Charter-Tagestour dauert in der Regel 6-8 Stunden und ist vollständig flexibel — Abfahrtszeit, Inselroute und Aufenthaltsdauer wählen Sie.",
  },
  {
    q: "Gruppenfähre oder Privatyacht — was ist besser?",
    a: "Gruppenfähre (€45/Person) ist ideal für Alleinreisende, Paare mit Budget und Besucher, die Guide und Mittagessen erledigt haben möchten. Private Yacht (€220+ für die ganze Yacht, 2 Std. Minimum, Ganztag möglich) eignet sich besser für Gruppen ab 4 Personen, Familien oder alle, die Flexibilität wollen — Sie wählen Ihre Inseln, Stopps und Timing, Catering an Bord möglich.",
  },
  {
    q: "Wann ist die beste Reisezeit für die Prinzeninseln?",
    a: "Ende April bis Anfang Juni und Mitte September bis Oktober sind ideal — warm genug zum Schwimmen, leicht genug zum Wandern und deutlich weniger Andrang als zur Hochsaison. Wochenenden im Juli und August sind sehr voll mit Istanbuler Einheimischen. Winterbesuche sind atmosphärisch, aber die meisten Strandlokale sind geschlossen.",
  },
  {
    q: "Kann man auf den Prinzeninseln schwimmen?",
    a: "Ja — Büyükada hat Yörükali Plajı und Nakibey Plajı (Eintritt, Liegen). Heybeliada hat Değirmenburnu und Yelken Klübü. Die meisten öffentlichen Strände sind von Mitte Mai bis Mitte Oktober geöffnet. Wassertemperatur Juli-August ~22-24°C.",
  },
  {
    q: "Gibt es eine private Yacht-Charter ab Istanbul zu den Prinzeninseln?",
    a: "Ja — MerrySails bietet private Ganztagscharter ab Kuruçeşme Marina oder Kabataş. Ein typischer Prinzeninseln-Yachttag dauert 6-8 Stunden ab €220 für bis zu 12 Gäste (Boutique-Yacht), mit Stopps an Büyükada, Heybeliada und einer Schwimmbucht Ihrer Wahl. Größere Yachten für Gruppen bis 150.",
  },
];

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  name: "Prinzeninseln Tour ab Istanbul",
  description:
    "Zwei Wege, die Prinzeninseln ab Istanbul zu besuchen: geteilter geführter Ganztagsfährausflug €45 oder private Yacht ab €220. Büyükada, Heybeliada, Burgazada und Kınalıada — der autofreie Archipel Istanbuls.",
  url: canonicalUrl,
  image: `${SITE_URL}/og-image.jpg`,
  isAccessibleForFree: false,
  publicAccess: true,
  touristType: ["Paare", "Familien", "Alleinreisende", "Gruppen"],
  hasMap: "https://www.google.com/maps?q=Prinzeninseln+Istanbul",
  containsPlace: ISLANDS.map((i) => ({ "@type": "TouristAttraction", name: i.name })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
  speakable: { "@type": "SpeakableSpecification", cssSelector: [".faq-q", ".faq-a"] },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Startseite", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Prinzeninseln Tour Istanbul", item: canonicalUrl },
  ],
};

const WHATSAPP_PREFILL =
  "Hallo MerrySails — Ich plane einen Tag zu den Prinzeninseln. Datum: [Datum], Gäste: [N]. Gruppenfähre oder private Yacht?";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale !== "de") notFound();

  return (
    <main className="bg-[var(--bg)] text-[var(--body-text)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="border-b border-[var(--line)] bg-gradient-to-b from-[var(--accent-soft,#f5f0e6)] to-[var(--bg)]">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="text-sm text-[var(--text-muted)] mb-4">
            <Link href="/de" className="hover:underline">Startseite</Link>
            <span className="mx-2">/</span>
            <span>Prinzeninseln Tour Istanbul</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--heading)] mb-3">
            Prinzeninseln Tour ab Istanbul — Reiseführer 2026
          </h1>
          <p className="text-base sm:text-lg text-[var(--body-text)] max-w-3xl">
            <strong>Kurz gesagt.</strong> Zwei Wege auf Istanbuls autofreie Prinzeninseln: ein
            geteilter Ganztags-Fährausflug für <strong>€45/Person</strong> (8 Std., Mittagessen +
            Guide inkl.) oder ein privater Yacht-Charter ab <strong>€220</strong> für bis zu 12
            Gäste (flexibler 6-8-Stunden-Tag, Inseln und Schwimmbuchten frei wählbar). Die vier
            bewohnten Inseln — Büyükada, Heybeliada, Burgazada, Kınalıada — sind autofrei und
            werden nur per Fahrrad, Elektrofahrzeug oder zu Fuß erkundet.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/cruises/istanbul-princes-island-tour" className="inline-flex items-center gap-2 rounded-full bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white hover:brightness-110 transition">
              Gruppentour ab €45 <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/de/yacht-charter-istanbul" className="inline-flex items-center gap-2 rounded-full border border-[var(--brand)] px-5 py-3 text-sm font-semibold text-[var(--brand)] hover:bg-[var(--brand)]/5 transition">
              Private Yacht ab €220 <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={`${WHATSAPP_URL}?text=${encodeURIComponent(WHATSAPP_PREFILL)}`} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white hover:brightness-110 transition">
              WhatsApp +90 544 898 98 12
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="text-2xl font-bold text-[var(--heading)] mb-6">Gruppen-Fährtour vs. private Yacht-Charter</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-[var(--line)] bg-white p-5">
            <div className="flex items-center gap-2 text-[var(--brand)] mb-2">
              <Ship className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wide">Geteilte Ganztagstour</span>
            </div>
            <h3 className="text-xl font-bold text-[var(--heading)] mb-2">€45 pro Person</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2"><Clock className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>8 Stunden insgesamt · Abfahrt 09:00</span></li>
              <li className="flex gap-2"><Users className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>Max. 50 Gäste · ideal für Alleinreisende &amp; Paare</span></li>
              <li className="flex gap-2"><MapPin className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>Öffentliche Fähre → Büyükada → geführter Rundgang → Mittag</span></li>
              <li className="flex gap-2"><Trees className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>Mittag + Fähre + Guide inklusive</span></li>
            </ul>
            <Link href="/cruises/istanbul-princes-island-tour" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand)] hover:underline">
              Details zur Gruppentour <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="rounded-2xl border border-[var(--brand)]/30 bg-[var(--brand)]/5 p-5">
            <div className="flex items-center gap-2 text-[var(--brand)] mb-2">
              <Anchor className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wide">Private Yacht-Charter</span>
            </div>
            <h3 className="text-xl font-bold text-[var(--heading)] mb-2">Ab €220 / Yacht</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2"><Clock className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>6-8 Stunden flexibel · Startzeit frei wählbar</span></li>
              <li className="flex gap-2"><Users className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>2-150 Gäste (Boutique bis 12 Gäste)</span></li>
              <li className="flex gap-2"><MapPin className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>Ihre Route — Büyükada, Heybeliada, Schwimmbuchten</span></li>
              <li className="flex gap-2"><Trees className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>Kapitän + Crew inklusive, Catering optional</span></li>
            </ul>
            <Link href="/de/yacht-charter-istanbul" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand)] hover:underline">
              Yacht-Pakete ansehen <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[var(--accent-soft,#f7f4ec)] border-y border-[var(--line)]">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <h2 className="text-2xl font-bold text-[var(--heading)] mb-2">Die vier bewohnten Prinzeninseln</h2>
          <p className="text-sm text-[var(--text-muted)] mb-6">Insgesamt neun Inseln im Archipel — vier bewohnt und mit öffentlicher Fähre erreichbar. Fähren laufen alle vier auf einer festen Route von Kabataş und Kadıköy an.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {ISLANDS.map((island) => (
              <div key={island.name} className="rounded-2xl border border-[var(--line)] bg-white p-5">
                <h3 className="text-lg font-bold text-[var(--heading)] mb-1">{island.name}</h3>
                <p className="text-xs text-[var(--text-muted)] uppercase tracking-wide mb-2">{island.sizeLabel}</p>
                <p className="text-sm text-[var(--body-text)]">{island.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">Anreise von Istanbul zu den Prinzeninseln</h2>
        <div className="space-y-4 text-sm leading-relaxed">
          <p><strong>Öffentliche Şehir-Hatları-Fähre ab Kabataş (Europäische Seite):</strong> die häufigste Route. Etwa 75-90 Minuten nach Büyükada, mit Halten in Kınalıada, Burgazada und Heybeliada. Fähren alle 1-2 Stunden; erste um 06:50, letzte Rückfahrt von Büyükada gegen 21:30. Einzelfahrt ~₺40 mit Istanbulkart.</p>
          <p><strong>Öffentliche Fähre ab Kadıköy oder Bostancı (Asiatische Seite):</strong> schneller — Bostancı nach Büyükada in etwa 30 Min. Praktisch, wenn das Hotel auf der asiatischen Seite liegt.</p>
          <p><strong>İDO-Seebus (deniz otobüsü):</strong> schneller Katamaran-Service ab Kabataş und Bostancı, erreicht Büyükada in etwa 45 Min. Etwas höherer Preis (~₺70). Weniger Abfahrten als die öffentliche Fähre.</p>
          <p><strong>Private Yacht-Charter ab Kuruçeşme Marina oder Kabataş:</strong> 60-75 Min. nach Büyükada je nach Yacht. Door-to-door — keine Fährschlangen, keine feste Rückfahrt, Ihre Route ist Ihre. MerrySails organisiert Marina-Reservierung und Kapitän.</p>
        </div>
      </section>

      <section className="bg-[var(--accent-soft,#f7f4ec)] border-y border-[var(--line)]">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <h2 className="text-2xl font-bold text-[var(--heading)] mb-6">FAQ — Prinzeninseln Tour Istanbul</h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item) => (
              <details key={item.q} className="group rounded-2xl border border-[var(--line)] bg-white p-5">
                <summary className="faq-q cursor-pointer text-base font-semibold text-[var(--heading)] list-none flex items-start justify-between gap-3">
                  <span>{item.q}</span>
                  <span className="text-[var(--brand)] group-open:rotate-180 transition shrink-0">▼</span>
                </summary>
                <p className="faq-a mt-3 text-sm leading-relaxed text-[var(--body-text)]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-3xl bg-gradient-to-r from-[var(--brand)] to-[var(--brand-dark,#0a3e6f)] p-8 sm:p-10 text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Planen Sie Ihren Prinzeninseln-Tag ab Istanbul</h2>
          <p className="text-sm sm:text-base opacity-90 mb-5 max-w-2xl">
            Schicken Sie Termin und Gruppengröße per WhatsApp — wir bestätigen Gruppentour-Verfügbarkeit oder erstellen ein Yacht-Angebot für denselben Tag, meist innerhalb von Minuten. TÜRSAB A-Gruppe lizenziert (#{TURSAB_LICENSE_NUMBER}) · 50.000+ Gäste seit 2001.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={`${WHATSAPP_URL}?text=${encodeURIComponent(WHATSAPP_PREFILL)}`} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--brand)] hover:brightness-105 transition">
              WhatsApp ans Team
            </a>
            <Link href="/de/bosphorus-cruise" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition">
              Bosporus-Optionen <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
