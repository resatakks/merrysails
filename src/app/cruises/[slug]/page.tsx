import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Check, X, MapPin, Clock, Users, Globe, ArrowLeft } from "lucide-react";
import { tours, getTourBySlug } from "@/data/tours";
import BookingCalendar from "@/components/booking/BookingCalendar";
import TourCard from "@/components/tours/TourCard";

export function generateStaticParams() {
  return tours.map((tour) => ({ slug: tour.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const tour = getTourBySlug(params.slug);
  if (!tour) return { title: "Tour Not Found" };
  return {
    title: tour.nameEn,
    description: tour.descriptionEn,
  };
}

export default async function TourDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) notFound();

  const related = tours.filter((t) => t.slug !== slug).slice(0, 4);

  return (
    <div className="pt-28 pb-20 bg-[var(--surface-alt)]">
      <div className="container-main">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
          <Link href="/" className="hover:text-[var(--brand-primary)]">Home</Link>
          <span>/</span>
          <Link href="/cruises" className="hover:text-[var(--brand-primary)]">Cruises</Link>
          <span>/</span>
          <span className="text-[var(--heading)]">{tour.nameEn}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero image */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
              <Image
                src={tour.image}
                alt={tour.nameEn}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              <div className="absolute top-4 left-4">
                <span className={`inline-block px-3 py-1 text-xs font-bold rounded-md ${tour.badgeColor}`}>
                  {tour.badge}
                </span>
              </div>
            </div>

            {/* Gallery thumbnails */}
            <div className="grid grid-cols-3 gap-3">
              {tour.gallery.map((img, i) => (
                <div key={i} className="relative aspect-video rounded-xl overflow-hidden">
                  <Image src={img} alt={`${tour.nameEn} ${i + 1}`} fill className="object-cover" sizes="30vw" />
                </div>
              ))}
            </div>

            {/* Title & specs */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{tour.nameEn}</h1>
              <p className="text-[var(--text-muted)] mb-6">{tour.name}</p>

              <div className="spec-grid">
                <div className="spec-item">
                  <Clock className="w-5 h-5 text-[var(--brand-primary)] mx-auto mb-1" />
                  <div className="label">Duration</div>
                  <div className="value">{tour.duration}</div>
                </div>
                <div className="spec-item">
                  <Users className="w-5 h-5 text-[var(--brand-primary)] mx-auto mb-1" />
                  <div className="label">Guests</div>
                  <div className="value">{tour.capacity}</div>
                </div>
                <div className="spec-item">
                  <MapPin className="w-5 h-5 text-[var(--brand-primary)] mx-auto mb-1" />
                  <div className="label">Departure</div>
                  <div className="value">{tour.departureTime}</div>
                </div>
                <div className="spec-item">
                  <Globe className="w-5 h-5 text-[var(--brand-primary)] mx-auto mb-1" />
                  <div className="label">Languages</div>
                  <div className="value">EN / TR</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold mb-4">About This Tour</h2>
              <p className="text-[var(--body-text)] leading-relaxed whitespace-pre-line">
                {tour.longDescription}
              </p>
            </div>

            {/* Includes */}
            <div className="bg-white rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold mb-4">What&apos;s Included</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tour.includes.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
                {tour.notIncluded?.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                    <X className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Route */}
            <div className="bg-white rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold mb-4">Route</h2>
              <div className="flex items-center gap-2 text-[var(--body-text)]">
                <MapPin className="w-5 h-5 text-[var(--brand-primary)] shrink-0" />
                <span>{tour.route}</span>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <MapPin className="w-4 h-4 shrink-0" />
                Departure: {tour.departurePoint}
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold mb-4">Highlights</h2>
              <div className="flex flex-wrap gap-2">
                {tour.highlights.map((h) => (
                  <span key={h} className="px-3 py-1.5 bg-[var(--surface-alt)] rounded-full text-sm font-medium">
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Booking Calendar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <BookingCalendar
                tourSlug={tour.slug}
                priceEur={tour.priceEur}
                tourName={tour.nameEn}
              />
            </div>
          </div>
        </div>

        {/* Related tours */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((t) => (
              <TourCard key={t.id} tour={t} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
