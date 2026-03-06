import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { guides } from "@/data/guides";

export const metadata = {
  title: "Istanbul Landmark Guides — Bosphorus, Palaces & More",
  description:
    "Explore Istanbul's iconic landmarks: Bosphorus Strait, Maiden's Tower, Dolmabahce Palace, Ortakoy Mosque, Rumeli Fortress, and Princes' Islands. Expert travel guides.",
  keywords: [
    "istanbul landmarks guide",
    "bosphorus attractions",
    "maidens tower istanbul",
    "dolmabahce palace guide",
    "istanbul tourist attractions",
    "bosphorus cruise landmarks",
  ],
  alternates: { canonical: "https://merrysails.vercel.app/guides" },
  openGraph: {
    title: "Istanbul Landmark Guides — Bosphorus, Palaces & More",
    description:
      "In-depth guides to Istanbul's iconic landmarks along the Bosphorus. Expert travel tips for visitors.",
    url: "https://merrysails.vercel.app/guides",
    type: "website" as const,
    images: [{ url: "https://merrysails.vercel.app/og-image.jpg", width: 1200, height: 630, alt: "MerrySails — Bosphorus Cruise Istanbul" }],
  },
};

export default function GuidesPage() {
  return (
    <div className="pt-32 pb-20 bg-[var(--surface-alt)]">
      <div className="container-main">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Istanbul Landmark & Destination Guides
          </h1>
          <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
            In-depth guides to the landmarks you&apos;ll see on a Bosphorus
            cruise — palaces, fortresses, mosques, islands, and hidden gems
            along the strait.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group"
            >
              <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow h-full flex flex-col">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={guide.image}
                    alt={guide.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h2 className="text-lg font-semibold mb-2 group-hover:text-[var(--brand-primary)] transition-colors">
                    {guide.title}
                  </h2>
                  <p className="text-sm text-[var(--text-muted)] mb-3 line-clamp-3 flex-1">
                    {guide.excerpt}
                  </p>
                  <span className="text-sm text-[var(--brand-primary)] font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    Read Guide <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
