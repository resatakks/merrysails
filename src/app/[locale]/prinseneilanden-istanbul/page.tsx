import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Anchor, Ship, MapPin, Clock, Users, Trees } from "lucide-react";
import { SITE_URL, TURSAB_LICENSE_NUMBER, WHATSAPP_URL } from "@/lib/constants";
import { isActiveLocale, type SiteLocale } from "@/i18n/config";

export const revalidate = 3600;

export async function generateStaticParams() {
  return [{ locale: "nl" }];
}

const canonicalUrl = `${SITE_URL}/nl/prinseneilanden-istanbul`;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "nl") return {};
  return {
    title: "Prinseneilanden Tour Istanbul — vanaf €45",
    description:
      "Prinseneilanden-tour vanaf Istanbul 2026 — gedeelde dagtour €45 (veerboot + gids + lunch) of privéjacht vanaf €280. Büyükada, Heybeliada, autovrije eilanden.",
    alternates: { canonical: canonicalUrl, languages: undefined },
    openGraph: {
      title: "Prinseneilanden Tour Istanbul — vanaf €45",
      description: "Twee manieren om de Prinseneilanden vanuit Istanbul te bezoeken: gedeelde 8-uurs veerboottour €45 of privéjacht vanaf €280.",
      url: canonicalUrl, type: "article",
    },
  };
}

const ISLANDS = [
  { name: "Büyükada", sizeLabel: "Grootste · 5,4 km²", summary: "De hoofdattractie. Victoriaanse houten villa's, het Aya Yorgi-klooster op de hoogste heuvel, met dennenbomen omzoomde straten en het populaire Yörükali-strand. Ongeveer 75-90 min met de publieke veerboot vanuit Kabataş." },
  { name: "Heybeliada", sizeLabel: "Tweede · 2,3 km²", summary: "Rustiger dan Büyükada, met het historische Grieks-orthodoxe Halki-seminarie, een mooi kustwandelpad en het picknickgebied Değirmenburnu. Zelfde veerbootroute als Büyükada." },
  { name: "Burgazada", sizeLabel: "Middel · 1,5 km²", summary: "Compact en intiem. Ideaal voor een ontspannen dag met visgerechten aan de Kalpazankaya-kliffen, makkelijke wandelroutes en veel minder toeristen." },
  { name: "Kınalıada", sizeLabel: "Dichtst bij Istanbul · 1,3 km²", summary: "Eerste halte op de veerbootroute — 40 min vanuit Kabataş. Zandstranden, visrestaurants op de pier en kleine Armeense kerken in het dorp." },
];

const FAQ_ITEMS = [
  { q: "Wat is de goedkoopste manier om de Prinseneilanden vanuit Istanbul te bezoeken?", a: "De publieke Şehir Hatları-veerboot vanuit Kabataş kost ongeveer ₺40 (€1,20) enkele reis en bereikt Büyükada in 75-90 minuten. De MerrySails dagtour van €45 bevat retour-veerboot, gids, lunch en een gestructureerde wandeling — handig als u niet zelf wilt navigeren of Turkse dienstregelingen wilt lezen." },
  { q: "Zijn auto's toegestaan op de Prinseneilanden?", a: "Nee — privé-auto's zijn verboden op alle vier bewoonde eilanden. Het enige gemotoriseerde vervoer zijn gemeentelijke elektrische voertuigen. Locals en bezoekers verplaatsen zich per fiets, elektrische shuttle of te voet. De autovrije sfeer is een van de grootste attracties." },
  { q: "Hoe lang duurt een Prinseneilanden-tour vanuit Istanbul?", a: "Een begeleide dagtour duurt 8 uur deur-tot-deur (vertrek 09:00, terug ~17:00). Een privéjacht-dagcharter is typisch 6-8 uur en volledig flexibel — kies vertrektijd, route tussen eilanden en hoe lang u op elk eiland blijft." },
  { q: "Gedeelde veerboot of privéjacht — wat is beter?", a: "Gedeelde veerboot (€45/persoon) is geschikt voor alleenreizigers, koppels met budget en bezoekers die gids en lunch geregeld willen. Privéjacht (€280+ voor de hele boot, 2 uur minimum, hele dag mogelijk) is beter voor groepen vanaf 4, gezinnen of wie flexibiliteit wil — kies eilanden, stops en timing zelf, catering optioneel aan boord." },
  { q: "Wanneer is de beste tijd om de Prinseneilanden te bezoeken?", a: "Eind april — begin juni en midden september — oktober zijn ideaal — warm genoeg om te zwemmen, koel genoeg om te wandelen en veel minder druk dan in het hoogseizoen. Juli- en augustuszondagen zijn extreem druk met Istanbulse bewoners. Winterbezoeken zijn sfeervol maar de meeste strandrestaurants zijn dicht." },
  { q: "Kan men zwemmen op de Prinseneilanden?", a: "Ja — Büyükada heeft Yörükali Plajı en Nakibey Plajı (toegang betaald, ligstoelen). Heybeliada heeft Değirmenburnu en Yelken Klübü. De meeste openbare stranden zijn geopend van half mei tot half oktober. Watertemperatuur juli-augustus ~22-24°C." },
  { q: "Is er een privéjacht vanuit Istanbul naar de Prinseneilanden?", a: "Ja — MerrySails biedt privé-dagcharters vanuit Kuruçeşme Marina of Kabataş. Een typische Prinseneilanden-jachtdag is 6-8 uur vanaf €280 voor maximaal 8 gasten (Essential), met stops bij Büyükada, Heybeliada en uw keuze van zwemkreek. Grotere jachten voor groepen tot 150." },
];

const pageSchema = {
  "@context": "https://schema.org", "@type": "TouristAttraction",
  name: "Prinseneilanden Tour vanaf Istanbul",
  description: "Twee manieren om de Prinseneilanden vanuit Istanbul te bezoeken: gedeelde begeleide dagtour €45 of privéjacht vanaf €280. Büyükada, Heybeliada, Burgazada en Kınalıada — Istanbul's autovrije archipel.",
  url: canonicalUrl, image: `${SITE_URL}/og-image.jpg`,
  isAccessibleForFree: false, publicAccess: true,
  touristType: ["Koppels", "Gezinnen", "Solo-reizigers", "Groepen"],
  hasMap: "https://www.google.com/maps?q=Prinseneilanden+Istanbul",
  containsPlace: ISLANDS.map((i) => ({ "@type": "TouristAttraction", name: i.name })),
};
const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  speakable: { "@type": "SpeakableSpecification", cssSelector: [".faq-q", ".faq-a"] },
};
const breadcrumbSchema = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Startpagina", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Prinseneilanden Tour Istanbul", item: canonicalUrl },
  ],
};

const WHATSAPP_PREFILL = "Hoi MerrySails — Ik plan een dag naar de Prinseneilanden. Datum: [datum], gasten: [N]. Gedeelde tour of privéjacht?";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale !== "nl") notFound();
  return (
    <main className="bg-[var(--bg)] text-[var(--body-text)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="border-b border-[var(--line)] bg-gradient-to-b from-[var(--accent-soft,#f5f0e6)] to-[var(--bg)]">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="text-sm text-[var(--text-muted)] mb-4">
            <Link href="/nl" className="hover:underline">Startpagina</Link><span className="mx-2">/</span>
            <span>Prinseneilanden Tour Istanbul</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--heading)] mb-3">Prinseneilanden Tour vanaf Istanbul — Gids 2026</h1>
          <p className="text-base sm:text-lg text-[var(--body-text)] max-w-3xl">
            <strong>Kort.</strong> Twee manieren om Istanbul&apos;s autovrije Prinseneilanden te bezoeken: een gedeelde dagtour per veerboot voor <strong>€45/persoon</strong> (8 uur, lunch + gids inbegrepen) of privéjacht vanaf <strong>€280</strong> voor maximaal 8 gasten (flexibele 6-8-uurs dag, kies uw eilanden en zwemkreken). De vier bewoonde eilanden — Büyükada, Heybeliada, Burgazada, Kınalıada — hebben geen privé-auto&apos;s, alleen fietsen, elektrische shuttles en wandelpaden.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/cruises/istanbul-princes-island-tour" className="inline-flex items-center gap-2 rounded-full bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white hover:brightness-110 transition">Gedeelde tour vanaf €45 <ArrowRight className="w-4 h-4" /></Link>
            <Link href="/nl/yacht-charter-istanbul" className="inline-flex items-center gap-2 rounded-full border border-[var(--brand)] px-5 py-3 text-sm font-semibold text-[var(--brand)] hover:bg-[var(--brand)]/5 transition">Privéjacht vanaf €280 <ArrowRight className="w-4 h-4" /></Link>
            <a href={`${WHATSAPP_URL}?text=${encodeURIComponent(WHATSAPP_PREFILL)}`} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white hover:brightness-110 transition">WhatsApp +90 544 898 98 12</a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="text-2xl font-bold text-[var(--heading)] mb-6">Gedeelde veerboot vs privéjacht</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-[var(--line)] bg-white p-5">
            <div className="flex items-center gap-2 text-[var(--brand)] mb-2"><Ship className="w-5 h-5" /><span className="text-xs font-bold uppercase tracking-wide">Gedeelde dagtour</span></div>
            <h3 className="text-xl font-bold text-[var(--heading)] mb-2">€45 per persoon</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2"><Clock className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>8 uur · vertrek 09:00</span></li>
              <li className="flex gap-2"><Users className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>Max. 50 gasten · solo &amp; koppels welkom</span></li>
              <li className="flex gap-2"><MapPin className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>Publieke veerboot → Büyükada → begeleide wandeling → lunch</span></li>
              <li className="flex gap-2"><Trees className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>Lunch + veerboot + gids inbegrepen</span></li>
            </ul>
            <Link href="/cruises/istanbul-princes-island-tour" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand)] hover:underline">Details gedeelde tour <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="rounded-2xl border border-[var(--brand)]/30 bg-[var(--brand)]/5 p-5">
            <div className="flex items-center gap-2 text-[var(--brand)] mb-2"><Anchor className="w-5 h-5" /><span className="text-xs font-bold uppercase tracking-wide">Privéjacht</span></div>
            <h3 className="text-xl font-bold text-[var(--heading)] mb-2">Vanaf €280 / jacht</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2"><Clock className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>6-8 uur flexibel · kies tijdstip</span></li>
              <li className="flex gap-2"><Users className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>2-150 gasten (Essential voor 8)</span></li>
              <li className="flex gap-2"><MapPin className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>Uw route — Büyükada, Heybeliada, zwemkreken</span></li>
              <li className="flex gap-2"><Trees className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>Kapitein + bemanning inbegrepen, catering optioneel</span></li>
            </ul>
            <Link href="/nl/yacht-charter-istanbul" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand)] hover:underline">Bekijk jachtpakketten <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      <section className="bg-[var(--accent-soft,#f7f4ec)] border-y border-[var(--line)]">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <h2 className="text-2xl font-bold text-[var(--heading)] mb-2">De vier bewoonde Prinseneilanden</h2>
          <p className="text-sm text-[var(--text-muted)] mb-6">In totaal negen eilanden in de archipel — vier bewoond en bereikbaar per publieke veerboot. Veerboten doen alle vier op een vaste route vanuit Kabataş en Kadıköy aan.</p>
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
        <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">Reizen van Istanbul naar de Prinseneilanden</h2>
        <div className="space-y-4 text-sm leading-relaxed">
          <p><strong>Publieke Şehir Hatları-veerboot vanuit Kabataş (Europese kant):</strong> de meest gebruikte route. Ongeveer 75-90 min naar Büyükada, met stops in Kınalıada, Burgazada en Heybeliada. Veerboten elke 1-2 uur; eerste rond 06:50, laatste retour vanuit Büyükada ~21:30. Enkele reis ~₺40 met Istanbulkart.</p>
          <p><strong>Publieke veerboot vanuit Kadıköy of Bostancı (Aziatische kant):</strong> sneller — Bostancı naar Büyükada in ongeveer 30 min. Handig als uw hotel al aan de Aziatische kant ligt.</p>
          <p><strong>İDO sea bus (deniz otobüsü):</strong> snellere catamaran-service vanuit Kabataş en Bostancı, bereikt Büyükada in ongeveer 45 min. Iets hogere prijs (~₺70). Schema minder frequent dan publieke veerboot.</p>
          <p><strong>Privéjacht vanuit Kuruçeşme Marina of Kabataş:</strong> 60-75 min naar Büyükada afhankelijk van jacht. Deur-tot-deur — geen veerbootrijen, geen vast retour-uurschema, uw route is uw eigen. MerrySails regelt marina-reservering en kapitein.</p>
        </div>
      </section>

      <section className="bg-[var(--accent-soft,#f7f4ec)] border-y border-[var(--line)]">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <h2 className="text-2xl font-bold text-[var(--heading)] mb-6">FAQ — Prinseneilanden Tour Istanbul</h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item) => (
              <details key={item.q} className="group rounded-2xl border border-[var(--line)] bg-white p-5">
                <summary className="faq-q cursor-pointer text-base font-semibold text-[var(--heading)] list-none flex items-start justify-between gap-3">
                  <span>{item.q}</span><span className="text-[var(--brand)] group-open:rotate-180 transition shrink-0">▼</span>
                </summary>
                <p className="faq-a mt-3 text-sm leading-relaxed text-[var(--body-text)]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-3xl bg-gradient-to-r from-[var(--brand)] to-[var(--brand-dark,#0a3e6f)] p-8 sm:p-10 text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Plan uw Prinseneilanden-dag vanuit Istanbul</h2>
          <p className="text-sm sm:text-base opacity-90 mb-5 max-w-2xl">Stuur uw data en groepsgrootte via WhatsApp — we bevestigen beschikbaarheid van de gedeelde tour of geven een offerte voor een privéjacht voor dezelfde dag, meestal binnen enkele minuten. TÜRSAB groep A vergunning (#{TURSAB_LICENSE_NUMBER}) · 50.000+ gasten sinds 2001.</p>
          <div className="flex flex-wrap gap-3">
            <a href={`${WHATSAPP_URL}?text=${encodeURIComponent(WHATSAPP_PREFILL)}`} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--brand)] hover:brightness-105 transition">WhatsApp het team</a>
            <Link href="/nl/bosphorus-cruise" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition">Bosporuscruise-opties <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
