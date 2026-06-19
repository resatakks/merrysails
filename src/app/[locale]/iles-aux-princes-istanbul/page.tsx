import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Anchor, Ship, MapPin, Clock, Users, Trees } from "lucide-react";
import { SITE_URL, TURSAB_LICENSE_NUMBER, WHATSAPP_URL } from "@/lib/constants";
import { isActiveLocale, type SiteLocale } from "@/i18n/config";

export const revalidate = 3600;

// FR-only French slug — Îles aux Princes targets local FR search intent.
export async function generateStaticParams() {
  return [{ locale: "fr" }];
}

const canonicalUrl = `${SITE_URL}/fr/iles-aux-princes-istanbul`;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "fr") return {};
  return {
    title: "Îles aux Princes Istanbul — dès €45",
    description:
      "Tour des Îles aux Princes Istanbul 2026 — journée partagée €45 (ferry + guide + déjeuner) ou yacht privé dès €220. Büyükada, Heybeliada, îles sans voitures.",
    alternates: {
      canonical: canonicalUrl,
      languages: undefined,
    },
    openGraph: {
      title: "Îles aux Princes Istanbul — dès €45",
      description:
        "Deux façons de visiter les Îles aux Princes depuis Istanbul : excursion ferry partagée 8 h à €45 ou yacht privé dès €220.",
      url: canonicalUrl,
      type: "article",
    },
  };
}

const ISLANDS = [
  {
    name: "Büyükada",
    sizeLabel: "Plus grande · 5,4 km²",
    summary:
      "L'attraction principale. Demeures victoriennes en bois, monastère d'Aya Yorgi au sommet de la plus haute colline, rues ombragées de pins et la plage prisée de Yörükali. Environ 75-90 min en ferry public depuis Kabataş.",
  },
  {
    name: "Heybeliada",
    sizeLabel: "Deuxième plus grande · 2,3 km²",
    summary:
      "Plus calme que Büyükada, avec le séminaire grec-orthodoxe de Halki, un beau sentier côtier et l'aire de pique-nique de Değirmenburnu. Mêmes arrêts ferry que Büyükada.",
  },
  {
    name: "Burgazada",
    sizeLabel: "Moyenne · 1,5 km²",
    summary:
      "Compacte et intime. Idéale pour une journée détendue avec déjeuner de poisson sur les falaises de Kalpazankaya, boucles de marche faciles et beaucoup moins de touristes.",
  },
  {
    name: "Kınalıada",
    sizeLabel: "La plus proche d'Istanbul · 1,3 km²",
    summary:
      "Premier arrêt sur la route — 40 min depuis Kabataş. Plages de sable, restaurants de poisson sur le quai et petites églises arméniennes dans le village.",
  },
];

const FAQ_ITEMS = [
  {
    q: "Quel est le moyen le moins cher de visiter les Îles aux Princes depuis Istanbul ?",
    a: "Le ferry public Şehir Hatları depuis Kabataş coûte environ ₺40 (€1,20) l'aller et atteint Büyükada en 75-90 min. Le tour journée guidé MerrySails à €45 inclut ferry aller-retour, guide, déjeuner et marche structurée — utile si vous ne voulez pas naviguer seul ni lire les horaires en turc.",
  },
  {
    q: "Les voitures sont-elles autorisées sur les Îles aux Princes ?",
    a: "Non — les voitures particulières sont interdites sur les quatre îles habitées. Le seul transport motorisé est constitué de véhicules électriques municipaux. Habitants et visiteurs se déplacent à vélo, en navette électrique ou à pied. L'atmosphère sans voiture est l'une des principales attractions.",
  },
  {
    q: "Combien de temps dure un tour des Îles aux Princes depuis Istanbul ?",
    a: "Un tour guidé journée dure 8 heures porte à porte (départ 09:00, retour ~17:00). Une croisière privée yacht journée fait typiquement 6-8 heures et est entièrement flexible — vous choisissez l'heure de départ, la route entre les îles et la durée sur chaque île.",
  },
  {
    q: "Ferry partagé ou yacht privé — lequel choisir ?",
    a: "Le ferry partagé (€45/personne) convient aux voyageurs seuls, couples au budget serré et visiteurs qui veulent guide et déjeuner gérés. Le yacht privé (€220+ pour le bateau entier, 2 h minimum, journée disponible) convient mieux aux groupes de 4+, familles ou ceux qui veulent flexibilité — choisissez vos îles, vos arrêts, votre timing, restauration à bord en option.",
  },
  {
    q: "Quelle est la meilleure période pour visiter les Îles aux Princes ?",
    a: "Fin avril à début juin et mi-septembre à octobre sont idéaux — assez chaud pour nager, assez frais pour marcher et beaucoup moins de monde qu'en haute saison. Les week-ends de juillet-août sont très chargés. L'hiver est atmosphérique mais la plupart des restaurants de plage sont fermés.",
  },
  {
    q: "Peut-on se baigner sur les Îles aux Princes ?",
    a: "Oui — Büyükada a Yörükali Plajı et Nakibey Plajı (entrée payante, transats). Heybeliada a Değirmenburnu et Yelken Klübü. La plupart des plages publiques sont ouvertes de mi-mai à mi-octobre. Température de l'eau juillet-août ~22-24°C.",
  },
  {
    q: "Y a-t-il des yachts privés depuis Istanbul vers les Îles aux Princes ?",
    a: "Oui — MerrySails propose des affrètements journée privés depuis Kuruçeşme Marina ou Kabataş. Une journée yacht typique aux Îles aux Princes dure 6-8 heures à partir de €220 pour 12 invités maximum (yacht Boutique), avec arrêts à Büyükada, Heybeliada et la crique de baignade de votre choix. Yachts plus grands pour groupes jusqu'à 150 personnes.",
  },
];

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  name: "Tour des Îles aux Princes depuis Istanbul",
  description:
    "Deux façons de visiter les Îles aux Princes depuis Istanbul : tour journée guidé ferry partagé à €45 ou yacht privé dès €220. Büyükada, Heybeliada, Burgazada et Kınalıada — l'archipel sans voitures d'Istanbul.",
  url: canonicalUrl,
  image: `${SITE_URL}/og-image.jpg`,
  isAccessibleForFree: false,
  publicAccess: true,
  touristType: ["Couples", "Familles", "Voyageurs solo", "Groupes"],
  hasMap: "https://www.google.com/maps?q=Îles+aux+Princes+Istanbul",
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
    { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Tour des Îles aux Princes Istanbul", item: canonicalUrl },
  ],
};

const WHATSAPP_PREFILL =
  "Bonjour MerrySails — Je planifie une journée aux Îles aux Princes. Date : [date], invités : [N]. Ferry partagé ou yacht privé ?";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale !== "fr") notFound();

  return (
    <main className="bg-[var(--bg)] text-[var(--body-text)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="border-b border-[var(--line)] bg-gradient-to-b from-[var(--accent-soft,#f5f0e6)] to-[var(--bg)]">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="text-sm text-[var(--text-muted)] mb-4">
            <Link href="/fr" className="hover:underline">Accueil</Link>
            <span className="mx-2">/</span>
            <span>Tour des Îles aux Princes Istanbul</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--heading)] mb-3">
            Tour des Îles aux Princes depuis Istanbul — Guide 2026
          </h1>
          <p className="text-base sm:text-lg text-[var(--body-text)] max-w-3xl">
            <strong>En bref.</strong> Deux façons de visiter les Îles aux Princes sans voitures
            depuis Istanbul : tour ferry journée partagé à <strong>€45/personne</strong> (8 h,
            déjeuner + guide inclus) ou yacht privé dès <strong>€220</strong> pour 12 invités
            maximum (journée flexible 6-8 h, choisissez vos îles et criques de baignade). Les
            quatre îles habitées — Büyükada, Heybeliada, Burgazada, Kınalıada — n&apos;ont aucune
            voiture privée : vélo, navette électrique et marche uniquement.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/cruises/istanbul-princes-island-tour" className="inline-flex items-center gap-2 rounded-full bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white hover:brightness-110 transition">
              Tour partagé dès €45 <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/fr/yacht-charter-istanbul" className="inline-flex items-center gap-2 rounded-full border border-[var(--brand)] px-5 py-3 text-sm font-semibold text-[var(--brand)] hover:bg-[var(--brand)]/5 transition">
              Yacht privé dès €220 <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={`${WHATSAPP_URL}?text=${encodeURIComponent(WHATSAPP_PREFILL)}`} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white hover:brightness-110 transition">
              WhatsApp +90 544 898 98 12
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="text-2xl font-bold text-[var(--heading)] mb-6">Ferry partagé vs yacht privé</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-[var(--line)] bg-white p-5">
            <div className="flex items-center gap-2 text-[var(--brand)] mb-2">
              <Ship className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wide">Tour journée partagé</span>
            </div>
            <h3 className="text-xl font-bold text-[var(--heading)] mb-2">€45 par personne</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2"><Clock className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>8 heures · départ 09:00</span></li>
              <li className="flex gap-2"><Users className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>Max. 50 invités · solo &amp; couples bienvenus</span></li>
              <li className="flex gap-2"><MapPin className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>Ferry public → Büyükada → marche guidée → déjeuner</span></li>
              <li className="flex gap-2"><Trees className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>Déjeuner + ferry + guide inclus</span></li>
            </ul>
            <Link href="/cruises/istanbul-princes-island-tour" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand)] hover:underline">
              Détails du tour partagé <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="rounded-2xl border border-[var(--brand)]/30 bg-[var(--brand)]/5 p-5">
            <div className="flex items-center gap-2 text-[var(--brand)] mb-2">
              <Anchor className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wide">Yacht privé</span>
            </div>
            <h3 className="text-xl font-bold text-[var(--heading)] mb-2">Dès €220 / yacht</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2"><Clock className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>6-8 h flexible · choisissez l&apos;heure</span></li>
              <li className="flex gap-2"><Users className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>2-150 invités (Boutique jusqu&apos;à 12)</span></li>
              <li className="flex gap-2"><MapPin className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>Votre route — Büyükada, Heybeliada, criques</span></li>
              <li className="flex gap-2"><Trees className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>Capitaine + équipage inclus, restauration optionnelle</span></li>
            </ul>
            <Link href="/fr/yacht-charter-istanbul" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand)] hover:underline">
              Voir les forfaits yacht <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[var(--accent-soft,#f7f4ec)] border-y border-[var(--line)]">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <h2 className="text-2xl font-bold text-[var(--heading)] mb-2">Les quatre Îles aux Princes habitées</h2>
          <p className="text-sm text-[var(--text-muted)] mb-6">Neuf îles au total dans l&apos;archipel — quatre habitées et accessibles par ferry public. Les ferries desservent les quatre sur une boucle fixe depuis Kabataş et Kadıköy.</p>
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
        <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">Comment se rendre aux Îles aux Princes depuis Istanbul</h2>
        <div className="space-y-4 text-sm leading-relaxed">
          <p><strong>Ferry public Şehir Hatları depuis Kabataş (rive européenne) :</strong> la route la plus courante. Environ 75-90 minutes jusqu&apos;à Büyükada, avec arrêts à Kınalıada, Burgazada et Heybeliada. Ferries toutes les 1-2 heures ; premier vers 06:50, dernier retour de Büyükada vers 21:30. Aller simple ~₺40 avec Istanbulkart.</p>
          <p><strong>Ferry public depuis Kadıköy ou Bostancı (rive asiatique) :</strong> plus rapide — Bostancı à Büyükada en environ 30 minutes. Pratique si votre hôtel est déjà côté asiatique.</p>
          <p><strong>Sea bus İDO (deniz otobüsü) :</strong> service catamaran plus rapide depuis Kabataş et Bostancı, atteint Büyükada en environ 45 minutes. Tarif légèrement plus élevé (~₺70). Horaire moins fréquent que le ferry public.</p>
          <p><strong>Yacht privé depuis Kuruçeşme Marina ou Kabataş :</strong> 60-75 minutes jusqu&apos;à Büyükada selon le yacht. Porte à porte — pas de files de ferry, pas d&apos;horaire fixe, votre route est à vous. MerrySails gère la réservation marina et le capitaine.</p>
        </div>
      </section>

      <section className="bg-[var(--accent-soft,#f7f4ec)] border-y border-[var(--line)]">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <h2 className="text-2xl font-bold text-[var(--heading)] mb-6">FAQ — Tour des Îles aux Princes Istanbul</h2>
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Planifiez votre journée aux Îles aux Princes</h2>
          <p className="text-sm sm:text-base opacity-90 mb-5 max-w-2xl">
            Envoyez vos dates et la taille du groupe sur WhatsApp — nous confirmons la disponibilité du tour partagé ou nous établissons un devis yacht privé pour le même jour, généralement en quelques minutes. Licence TÜRSAB Groupe A (#{TURSAB_LICENSE_NUMBER}) · 50 000+ invités depuis 2001.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={`${WHATSAPP_URL}?text=${encodeURIComponent(WHATSAPP_PREFILL)}`} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--brand)] hover:brightness-105 transition">
              Contacter l&apos;équipe
            </a>
            <Link href="/fr/bosphorus-cruise" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition">
              Options croisière Bosphore <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
