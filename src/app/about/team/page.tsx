import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Shield, ArrowRight } from "lucide-react";
import { teamPersonSchemas } from "@/lib/team-schema";

const SITE_URL = "https://merrysails.com";

export const metadata: Metadata = {
  title: "Meet the Team",
  description:
    "Meet the MerrySails team: TURSAB-licensed founder, master-licensed Bosphorus captain, and multilingual guest experience lead — 25 years in Istanbul tourism.",
  alternates: {
    canonical: `${SITE_URL}/about/team`,
  },
  openGraph: {
    title: "Meet the MerrySails Team",
    description:
      "Captain Ahmet Yıldız, Resat Akkus, and Kayra Sevli -- the experts behind every MerrySails cruise.",
    url: `${SITE_URL}/about/team`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
  },
};

interface TeamCardProps {
  name: string;
  role: string;
  bio: string;
  image?: string;
  knowsAbout: string[];
  profileHref?: string;
}

function TeamCard({ name, role, bio, image, knowsAbout, profileHref }: TeamCardProps) {
  const initials = name
    .split(" ")
    .filter((w) => /^[A-Za-z]/.test(w))
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // Clarity reported 15 dead-clicks on "22+ years navigating..." bio text on
  // /about/team — users were clicking the bio expecting to read more or
  // navigate to a profile. Wrap each card in a Link when a profile route
  // exists, and add an explicit "Read full bio →" CTA so the affordance is
  // clear instead of phantom.
  const cardInner = (
    <div className="rounded-2xl border border-[var(--line)] bg-white p-6 md:p-8 flex flex-col gap-5 transition-colors hover:border-[var(--brand-primary)]/40">
      {/* Photo */}
      <div className="flex items-center gap-4">
        <div
          className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-[var(--brand-primary)]/20 bg-[var(--brand-primary)]/10 flex items-center justify-center"
          style={{ isolation: "isolate" }}
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center text-[var(--brand-primary)] font-bold text-xl select-none z-0"
          >
            {initials}
          </span>
          {image && (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover z-10"
              sizes="80px"
              onError={undefined}
            />
          )}
        </div>
        <div>
          <h2 className="text-xl font-bold text-[var(--heading)]">{name}</h2>
          <p className="text-sm text-[var(--text-muted)] flex items-center gap-1 mt-0.5">
            <Shield className="w-3.5 h-3.5 text-[var(--brand-primary)]" aria-hidden="true" />
            {role}
          </p>
        </div>
      </div>

      {/* Bio */}
      <p className="text-[var(--body-text)] leading-relaxed">{bio}</p>

      {/* Knows about */}
      <div>
        <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-2">
          Expertise
        </p>
        <ul className="flex flex-wrap gap-2">
          {knowsAbout.map((topic) => (
            <li
              key={topic}
              className="px-2.5 py-1 rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] text-xs font-medium"
            >
              {topic}
            </li>
          ))}
        </ul>
      </div>

      {profileHref && (
        <p className="mt-1 text-sm font-semibold text-[var(--brand-primary)]">
          Read full bio →
        </p>
      )}
    </div>
  );

  if (profileHref) {
    return (
      <Link href={profileHref} className="block">
        {cardInner}
      </Link>
    );
  }
  return cardInner;
}

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "SpeakableSpecification",
  cssSelector: ["#team-heading", ".team-lead"],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/about` },
    { "@type": "ListItem", position: 3, name: "Team", item: `${SITE_URL}/about/team` },
  ],
};

export default function TeamPage() {
  return (
    <>
      {/* Person schemas */}
      {teamPersonSchemas.map((schema) => (
        <script
          key={schema["@id"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="pt-28 pb-20">
        <div className="container-main max-w-5xl">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-8">
            <Link href="/" className="hover:text-[var(--brand-primary)] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/about" className="hover:text-[var(--brand-primary)] transition-colors">About</Link>
            <span>/</span>
            <span
              aria-current="page"
              className="text-[var(--text-muted)]"
            >Team</span>
          </nav>

          {/* Header */}
          <header className="mb-12 max-w-2xl">
            <h1 id="team-heading" className="text-4xl md:text-5xl font-bold text-[var(--heading)] mb-4">
              Meet the MerrySails team
            </h1>
            <p className="team-lead text-lg text-[var(--body-text)] leading-relaxed">
              MerrySails has been operating TURSAB A-Group licensed Bosphorus cruises since 2001 --
              that is 25 years of first-hand expertise on Istanbul&apos;s waterways. Every cruise is designed
              by a master-licensed captain, operated by a certified travel agency, and supported by a
              multilingual guest team: the people you meet below are the reason 50,000+ guests have
              trusted us with their Istanbul experience.
            </p>
          </header>

          {/* Cards */}
          <div className="grid gap-8 lg:grid-cols-1">
            <TeamCard
              name="Captain Ahmet Yıldız"
              role="Senior Captain & Bosphorus Routes Lead"
              bio="22+ years navigating the Bosphorus under a Turkish Maritime Authority master license, Captain Ahmet has piloted Bosphorus, Marmara, and Aegean cruises. He designs every route MerrySails operates and speaks Turkish, English, and basic German."
              profileHref="/authors/captain-ahmet"
              knowsAbout={[
                "Bosphorus navigation",
                "Istanbul harbor pilotage",
                "Maritime safety",
                "Turkish coastal routes",
              ]}
            />
            <TeamCard
              name="Resat Akkus"
              role="Founder & Operations Director"
              bio="TURSAB A-Group licensed operator since 2001. Resat founded MerrySails to give international guests a transparent, no-markup Bosphorus cruise platform — every guest books on the website at the price the boat actually runs at. Based in Fatih, Istanbul."
              
              knowsAbout={[
                "Tour operations",
                "Turkish tourism licensing",
                "Bosphorus cruise pricing",
                "Travel agency management",
              ]}
            />
            <TeamCard
              name="Kayra Sevli"
              role="Guest Experience Lead"
              bio="Kayra manages reservations, hotel pickup logistics, and guest support across 5 languages (EN, TR, DE, FR, NL). Every confirmation email and voucher that reaches a MerrySails guest passes through her hands."
              
              knowsAbout={[
                "Tour booking workflows",
                "Hotel pickup logistics",
                "Multi-language guest support",
              ]}
            />
          </div>

          {/* CTA */}
          <div className="mt-14 rounded-2xl bg-[var(--brand-dark)] p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Ready to cruise with us?</h2>
            <p className="text-white/70 mb-6 max-w-md mx-auto">
              Browse the sunset and dinner cruise options, or reach out directly -- the team replies within minutes.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/bosphorus-cruise" className="btn-cta !py-3 !px-6 text-sm">
                Compare Bosphorus Cruises <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-bold py-3 px-6 rounded-full text-sm hover:bg-white/20 transition-all">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
