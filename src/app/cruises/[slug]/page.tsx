import Image from "next/image";
import { notFound } from "next/navigation";
import { tours, getTourBySlug } from "@/data/tours";
import BookingCalendar from "@/components/booking/BookingCalendar";
import { Check, X, MapPin, Clock, Users } from "lucide-react";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return tours.map((tour) => ({
    slug: tour.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) return { title: "Tour Not Found" };

  return {
    title: tour.nameEn,
    description: tour.descriptionEn,
  };
}

export default async function TourDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    notFound();
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center">
        <Image
          src={tour.image}
          alt={tour.nameEn}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4">
          <span className="inline-block bg-secondary text-heading text-sm font-semibold px-4 py-1 rounded-full mb-4">
            {tour.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {tour.nameEn}
          </h1>
        </div>
      </section>

      {/* Two-Column Layout */}
      <section className="section">
        <div className="max-w-[1290px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Info */}
              <div className="flex flex-wrap gap-6 text-text-light">
                {tour.duration && (
                  <span className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    {tour.duration}
                  </span>
                )}
                {tour.capacity && (
                  <span className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Up to {tour.capacity} guests
                  </span>
                )}
                {tour.route && (
                  <span className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    {tour.route}
                  </span>
                )}
              </div>

              {/* Long Description */}
              <div className="prose max-w-none">
                <p className="text-lg leading-relaxed text-heading/80">
                  {tour.longDescription || tour.descriptionEn}
                </p>
              </div>

              {/* Highlights */}
              {tour.highlights && tour.highlights.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-heading mb-4">
                    Highlights
                  </h2>
                  <ul className="space-y-3">
                    {tour.highlights.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-heading/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* What's Included */}
              {tour.includes && tour.includes.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-heading mb-4">
                    What&apos;s Included
                  </h2>
                  <ul className="space-y-3">
                    {tour.includes.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-heading/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Not Included */}
              {tour.notIncluded && tour.notIncluded.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-heading mb-4">
                    Not Included
                  </h2>
                  <ul className="space-y-3">
                    {tour.notIncluded.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-heading/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Route Info */}
              {tour.route && (
                <div>
                  <h2 className="text-2xl font-bold text-heading mb-4">
                    Route Information
                  </h2>
                  <div className="bg-bg rounded-2xl p-6">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-heading/80">{tour.route}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Gallery */}
              {tour.gallery && tour.gallery.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-heading mb-4">
                    Gallery
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {tour.gallery.map((img: string, i: number) => (
                      <div
                        key={i}
                        className="relative h-48 rounded-2xl overflow-hidden"
                      >
                        <Image
                          src={img}
                          alt={`${tour.nameEn} gallery ${i + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <BookingCalendar
                  tourSlug={tour.slug}
                  priceEur={tour.priceEur}
                  tourName={tour.nameEn}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
