import { notFound } from "next/navigation";
import Link from "next/link";
import { tours, getTourBySlug } from "@/data/tours";
import TourDetailClient from "@/components/tours/TourDetailClient";

export function generateStaticParams() {
  return tours.map((tour) => ({ slug: tour.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const tour = getTourBySlug(params.slug);
  if (!tour) return { title: "Tour Not Found" };
  return {
    title: tour.nameEn,
    description: tour.description,
  };
}

export default async function TourDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) notFound();

  const related = tours.filter((t) => t.slug !== slug && t.category === tour.category).slice(0, 4);

  return (
    <div className="pt-28 pb-20 bg-[var(--surface-alt)]">
      <div className="container-main">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
          <Link href="/" className="hover:text-[var(--brand-primary)]">Home</Link>
          <span>/</span>
          <Link href="/cruises" className="hover:text-[var(--brand-primary)]">Cruises</Link>
          <span>/</span>
          <span className="text-[var(--heading)] truncate">{tour.nameEn}</span>
        </div>

        <TourDetailClient tour={tour} related={related} />
      </div>
    </div>
  );
}
