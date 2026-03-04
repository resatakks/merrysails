import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, Users, MapPin, Calendar, Check, ArrowLeft, Star, Ship, MessageCircle } from "lucide-react";
import { tours, getTourBySlug } from "@/data/tours";
import { formatPrice, formatPriceTRY } from "@/lib/utils";
import TourCard from "@/components/tours/TourCard";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return tours.map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) return { title: "Tour Not Found" };
  return {
    title: `${tour.nameEn} — ${formatPrice(tour.priceEur)}`,
    description: tour.descriptionEn,
    openGraph: {
      title: tour.nameEn,
      description: tour.descriptionEn,
      images: [{ url: tour.image, width: 800, height: 600 }],
    },
  };
}

export default async function CruiseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) notFound();

  const related = tours.filter((t) => t.id !== tour.id).slice(0, 4);

  return (
    <>
      <section className="relative h-[50vh] md:h-[55vh]">
        <Image src={tour.image} alt={tour.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-[1290px] mx-auto">
            <Link href="/cruises" className="inline-flex items-center gap-1 text-white/60 hover:text-white text-sm mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" /> All Cruises
            </Link>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${tour.badgeColor}`}>
              {tour.badge}
            </span>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-white">{tour.name}</h1>
            <p className="text-white/60 text-lg mt-1">{tour.nameEn}</p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-[1290px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Clock, label: "Duration", value: tour.duration },
                  { icon: Users, label: "Capacity", value: tour.capacity },
                  { icon: Calendar, label: "Departure", value: tour.departureTime },
                  { icon: MapPin, label: "Location", value: tour.departurePoint },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="bg-bg-white rounded-2xl p-4 text-center border border-border">
                    <Icon className="w-5 h-5 text-accent mx-auto mb-2" />
                    <p className="text-xs text-muted uppercase tracking-wider">{label}</p>
                    <p className="text-heading font-semibold text-sm mt-1">{value}</p>
                  </div>
                ))}
              </div>

              <div>
                <h2 className="font-heading text-2xl font-bold text-heading mb-4">About This Tour</h2>
                <p className="text-[var(--text)] leading-relaxed">{tour.longDescription}</p>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-bold text-heading mb-4">What&apos;s Included</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tour.includes.map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <div className="w-5 h-5 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-success" />
                      </div>
                      <span className="text-[var(--text)] text-[15px]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-bold text-heading mb-4">Highlights</h2>
                <div className="flex flex-wrap gap-2">
                  {tour.highlights.map((h) => (
                    <span key={h} className="flex items-center gap-1.5 bg-bg-white border border-border text-primary px-4 py-2 rounded-full text-sm font-medium">
                      <Star className="w-3.5 h-3.5 text-secondary" />{h}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-bold text-heading mb-4">Route</h2>
                <div className="bg-bg-white rounded-2xl p-5 flex items-center gap-3 border border-border">
                  <Ship className="w-6 h-6 text-primary flex-shrink-0" />
                  <p className="text-[var(--text)]">{tour.route}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-bg-white border border-border rounded-2xl shadow-lg overflow-hidden">
                <div className="price-box justify-center">
                  <span className="currency">€</span>
                  <span className="amount">{tour.priceEur}</span>
                  <span className="per-person">/ person</span>
                </div>
                <div className="p-6 space-y-5">
                  <p className="text-center text-muted text-sm">{formatPriceTRY(tour.priceTry)}</p>
                  <div>
                    <label className="text-sm font-semibold text-heading mb-1.5 block">Date</label>
                    <input type="date" className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors bg-white" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-heading mb-1.5 block">Guests</label>
                    <select className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors appearance-none bg-white">
                      {[1,2,3,4,5,6,7,8,9,10].map((n) => <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>)}
                    </select>
                  </div>
                  <Link href={`/booking?tour=${tour.slug}`} className="block bg-accent hover:bg-accent-hover text-white text-center py-3.5 rounded-full font-semibold transition-all shadow-md hover:-translate-y-0.5">
                    Book Now
                  </Link>
                  <p className="text-xs text-muted text-center">Free cancellation up to 24 hours before</p>
                  <hr className="border-border" />
                  <a
                    href="https://wa.me/905321234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-whatsapp hover:bg-[#20BD5A] text-white py-3 rounded-full font-semibold text-sm transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Ask via WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <h2 className="font-heading text-3xl font-bold text-heading mb-8">Similar Cruises</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
              {related.map((t) => <TourCard key={t.id} tour={t} />)}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
