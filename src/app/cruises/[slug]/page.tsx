import Image from "next/image";
import Link from "next/link";
import { tours, getTourBySlug } from "@/data/tours";
import { notFound } from "next/navigation";
import { Clock, Users, MapPin, Check, Star, MessageCircle } from "lucide-react";

export function generateStaticParams() {
  return tours.map((tour) => ({
    slug: tour.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const tour = getTourBySlug(params.slug);
  if (!tour) return { title: "Tur Bulunamadı | MerrySails" };

  return {
    title: `${tour.name} | MerrySails`,
    description: tour.description,
  };
}

export default function TourDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const tour = getTourBySlug(params.slug);

  if (!tour) {
    notFound();
  }

  return (
    <section className="section-padding">
      <div className="max-w-[1290px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column */}
          <div className="lg:col-span-7">
            {/* Hero Image */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-6">
              <Image
                src={tour.image}
                alt={tour.nameEn}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 58vw"
                priority
              />
            </div>

            {/* Badge */}
            {tour.badge && (
              <span
                className={`inline-block rounded-full px-4 py-1.5 text-sm font-semibold mb-4 ${tour.badgeColor}`}
              >
                {tour.badge}
              </span>
            )}

            {/* Tour Name */}
            <h1 className="font-heading text-3xl md:text-4xl text-heading mb-2">
              {tour.name}
            </h1>

            {/* English Name */}
            <h2 className="text-muted text-lg mb-6">{tour.nameEn}</h2>

            {/* Long Description */}
            <p className="text-body leading-relaxed mb-8">
              {tour.longDescription}
            </p>

            {/* Route */}
            <div className="mb-8">
              <h3 className="font-heading text-xl text-heading mb-3">
                Tur Güzergahı
              </h3>
              <p className="text-body">{tour.route}</p>
            </div>

            {/* Includes */}
            <div className="mb-8">
              <h3 className="font-heading text-xl text-heading mb-3">
                Dahil Olanlar
              </h3>
              <ul className="space-y-2">
                {tour.includes.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-body">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Highlights */}
            <div className="mb-8">
              <h3 className="font-heading text-xl text-heading mb-3">
                Öne Çıkanlar
              </h3>
              <ul className="space-y-2">
                {tour.highlights.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-[#D4A853] flex-shrink-0" />
                    <span className="text-body">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                {/* Price Box Header */}
                <div className="bg-[#1E3A5F] px-6 py-8 text-center">
                  <div className="text-white/70 text-sm mb-1">Kişi başı</div>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-white text-lg">€</span>
                    <span className="text-white font-heading text-5xl">
                      {tour.priceEur}
                    </span>
                    <span className="text-white/70 text-sm">/kişi</span>
                  </div>
                </div>

                {/* Spec Items */}
                <div className="px-6 py-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-[#1E3A5F] flex-shrink-0" />
                    <div>
                      <div className="text-sm text-muted">Süre</div>
                      <div className="text-heading font-medium">
                        {tour.duration}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-[#1E3A5F] flex-shrink-0" />
                    <div>
                      <div className="text-sm text-muted">Kapasite</div>
                      <div className="text-heading font-medium">
                        {tour.capacity}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-[#1E3A5F] flex-shrink-0" />
                    <div>
                      <div className="text-sm text-muted">Kalkış Saati</div>
                      <div className="text-heading font-medium">
                        {tour.departureTime}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-[#1E3A5F] flex-shrink-0" />
                    <div>
                      <div className="text-sm text-muted">Kalkış Noktası</div>
                      <div className="text-heading font-medium">
                        {tour.departurePoint}
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="px-6 pb-6 space-y-3">
                  <Link
                    href="/booking"
                    className="btn-cta w-full block text-center"
                  >
                    Hemen Rezervasyon Yap
                  </Link>

                  <a
                    href="https://wa.me/905551234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp w-full flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp ile İletişim
                  </a>
                </div>

                {/* Trust Note */}
                <div className="px-6 pb-6">
                  <p className="text-center text-sm text-muted">
                    Ücretsiz iptal · Anında onay
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
