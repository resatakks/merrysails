import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Check, X, MapPin, Clock, Users, Globe, Star, Phone, Shield } from "lucide-react";
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
    description: tour.description,
  };
}

export default async function TourDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) notFound();

  const related = tours.filter((t) => t.slug !== slug && t.category === tour.category).slice(0, 4);
  const hasPackages = tour.packages && tour.packages.length > 0;

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

            {/* Title & Rating */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">{tour.nameEn}</h1>
              <p className="text-[var(--text-muted)] mb-3">{tour.name}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.round(tour.rating) ? "text-[var(--brand-gold)] fill-[var(--brand-gold)]" : "text-gray-300"}`} />
                    ))}
                  </div>
                  <span className="font-semibold">{tour.rating}</span>
                  <span className="text-[var(--text-muted)]">({tour.reviewCount} reviews)</span>
                </div>
              </div>
            </div>

            {/* Specs */}
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

            {/* Packages */}
            {hasPackages && (
              <div className="bg-white rounded-2xl p-6 md:p-8">
                <h2 className="text-xl font-bold mb-6">Choose Your Package</h2>
                <div className={`grid grid-cols-1 gap-4 ${tour.packages!.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
                  {tour.packages!.map((pkg, i) => (
                    <div
                      key={pkg.name}
                      className={`rounded-xl border-2 p-5 transition-all ${
                        i === 1
                          ? "border-[var(--brand-primary)] bg-[var(--brand-primary)]/5 shadow-md"
                          : "border-[var(--line)] hover:border-[var(--brand-primary)]/30"
                      }`}
                    >
                      {i === 1 && (
                        <span className="inline-block px-2 py-0.5 bg-[var(--brand-primary)] text-white text-xs font-bold rounded mb-3">
                          POPULAR
                        </span>
                      )}
                      <h3 className="text-lg font-bold mb-1">{pkg.name}</h3>
                      <p className="text-sm text-[var(--text-muted)] mb-3">{pkg.description}</p>
                      <div className="text-2xl font-bold text-[var(--heading)] mb-4">€{pkg.price}</div>
                      <ul className="space-y-2">
                        {pkg.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm">
                            <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add-ons */}
            {tour.addOns && tour.addOns.length > 0 && (
              <div className="bg-white rounded-2xl p-6 md:p-8">
                <h2 className="text-xl font-bold mb-4">Add-On Services</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tour.addOns.map((addon) => (
                    <div key={addon.name} className="flex items-center justify-between py-2.5 px-4 bg-[var(--surface-alt)] rounded-xl">
                      <span className="text-sm font-medium">{addon.name}</span>
                      <span className="text-sm font-bold text-[var(--brand-primary)]">{addon.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold mb-4">About This Tour</h2>
              <div className="text-[var(--body-text)] leading-relaxed whitespace-pre-line">
                {tour.longDescription}
              </div>
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
              <h2 className="text-xl font-bold mb-4">Route & Departure</h2>
              <div className="flex items-center gap-2 text-[var(--body-text)] mb-3">
                <MapPin className="w-5 h-5 text-[var(--brand-primary)] shrink-0" />
                <span>{tour.route}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
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

            {/* Cancellation */}
            <div className="bg-white rounded-2xl p-6 md:p-8">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1">Free Cancellation</h3>
                  <p className="text-sm text-[var(--text-muted)]">
                    Full refund available with 24+ hours advance notice. No questions asked.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-4">
              <BookingCalendar
                tourSlug={tour.slug}
                priceEur={tour.priceEur}
                tourName={tour.nameEn}
              />
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-[var(--line)]">
                <p className="text-sm font-medium mb-3">Need help choosing?</p>
                <a
                  href="https://wa.me/905524638498"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-[#25D366] text-white font-semibold text-sm hover:brightness-110 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  Chat on WhatsApp
                </a>
                <a
                  href="tel:+905524638498"
                  className="flex items-center justify-center gap-2 w-full py-2.5 mt-2 rounded-full border border-[var(--line)] text-[var(--body-text)] font-medium text-sm hover:bg-gray-50 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  +90 552 463 84 98
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related tours */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((t) => (
                <TourCard key={t.id} tour={t} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
