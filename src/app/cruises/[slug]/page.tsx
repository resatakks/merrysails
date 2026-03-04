import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, Users, MapPin, Calendar, Check, ArrowLeft, Star, Ship } from "lucide-react";
import { tours, getTourBySlug } from "@/data/tours";
import { formatPrice, formatPriceTRY } from "@/lib/utils";
import Button from "@/components/ui/Button";
import TourCard from "@/components/tours/TourCard";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return tours.map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) return { title: "Tur Bulunamadı" };
  return {
    title: `${tour.name} — ${formatPrice(tour.priceEur)} | MerrySails`,
    description: tour.description,
    openGraph: {
      title: tour.name,
      description: tour.description,
      images: [{ url: tour.image, width: 800, height: 600 }],
    },
  };
}

export default async function CruiseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) notFound();

  const relatedTours = tours.filter((t) => t.id !== tour.id).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] md:h-[60vh]">
        <Image
          src={tour.image}
          alt={tour.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/90 via-deep-navy/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-7xl mx-auto">
            <Link
              href="/cruises"
              className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Tüm Turlar
            </Link>
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${tour.badgeColor}`}>
                  {tour.badge}
                </span>
                <h1 className="font-heading text-3xl md:text-5xl font-bold text-white">
                  {tour.name}
                </h1>
                <p className="text-white/70 text-lg mt-2">{tour.nameEn}</p>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <p className="text-white/60 text-xs uppercase tracking-wider">Fiyat (kişi başı)</p>
                <p className="text-white font-mono font-bold text-3xl mt-1">
                  {formatPrice(tour.priceEur)}
                </p>
                <p className="text-white/50 text-sm">{formatPriceTRY(tour.priceTry)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Clock, label: "Süre", value: tour.duration },
                  { icon: Users, label: "Kapasite", value: tour.capacity },
                  { icon: Calendar, label: "Kalkış", value: tour.departureTime },
                  { icon: MapPin, label: "Hareket", value: tour.departurePoint },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="bg-cream rounded-xl p-4 text-center">
                    <Icon className="w-6 h-6 text-sunset mx-auto mb-2" />
                    <p className="text-xs text-gray-400 uppercase tracking-wider">{label}</p>
                    <p className="text-deep-navy font-semibold text-sm mt-1">{value}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-deep-navy mb-4">
                  Tur Hakkında
                </h2>
                <p className="text-gray-600 leading-relaxed">{tour.longDescription}</p>
              </div>

              {/* Includes */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-deep-navy mb-4">
                  Dahil Olanlar
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tour.includes.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-success shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-deep-navy mb-4">
                  Öne Çıkanlar
                </h2>
                <div className="flex flex-wrap gap-2">
                  {tour.highlights.map((h) => (
                    <span
                      key={h}
                      className="flex items-center gap-1 bg-cream text-ocean-blue px-3 py-1.5 rounded-full text-sm"
                    >
                      <Star className="w-3.5 h-3.5 text-gold" />
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Route */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-deep-navy mb-4">
                  Rota
                </h2>
                <div className="bg-cream rounded-xl p-5 flex items-center gap-3">
                  <Ship className="w-6 h-6 text-ocean-blue shrink-0" />
                  <p className="text-gray-600">{tour.route}</p>
                </div>
              </div>
            </div>

            {/* Sidebar - Booking */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white border border-gray-200 rounded-2xl shadow-lg p-6 space-y-5">
                <h3 className="font-heading text-xl font-bold text-deep-navy">
                  Rezervasyon Yap
                </h3>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1.5 block">
                    Tarih
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-sunset transition-colors"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1.5 block">
                    Kişi Sayısı
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-sunset transition-colors appearance-none">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={n}>
                        {n} Kişi
                      </option>
                    ))}
                  </select>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Birim fiyat</span>
                    <span className="font-semibold">{formatPrice(tour.priceEur)}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-gray-500">2 kişi toplam</span>
                    <span className="font-bold text-lg text-deep-navy">
                      {formatPrice(tour.priceEur * 2)}
                    </span>
                  </div>
                </div>

                <Button href={`/booking?tour=${tour.slug}`} className="w-full" size="lg">
                  Rezervasyon Yap
                </Button>

                <p className="text-xs text-gray-400 text-center">
                  24 saat öncesine kadar ücretsiz iptal
                </p>

                <div className="border-t border-gray-100 pt-4">
                  <a
                    href="https://wa.me/905321234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold text-sm transition-colors"
                  >
                    WhatsApp ile Sorun
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Related Tours */}
          <div className="mt-16">
            <h2 className="font-heading text-3xl font-bold text-deep-navy mb-8">
              Benzer Turlar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedTours.map((t) => (
                <TourCard key={t.id} tour={t} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
