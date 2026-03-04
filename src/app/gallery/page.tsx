import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeri | MerrySails",
  description:
    "MerrySails galeri. İstanbul Boğazı'ndaki yat turlarımızdan ve özel organizasyonlarımızdan kareler.",
};

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80",
    alt: "İstanbul manzarası",
    height: 400,
  },
  {
    src: "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=600&q=80",
    alt: "Boğaz köprüsü",
    height: 300,
  },
  {
    src: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80",
    alt: "Lüks yat",
    height: 350,
  },
  {
    src: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=600&q=80",
    alt: "İstanbul gün batımı",
    height: 280,
  },
  {
    src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
    alt: "Deniz manzarası",
    height: 360,
  },
  {
    src: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=600&q=80",
    alt: "Tekne turu",
    height: 320,
  },
  {
    src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80",
    alt: "Boğaz turu",
    height: 380,
  },
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
    alt: "Özel organizasyon",
    height: 300,
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    alt: "Deniz ve dağ manzarası",
    height: 340,
  },
];

export default function GalleryPage() {
  return (
    <main>
      {/* Hero Banner */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80"
          alt="Galeri hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#0A1628]/70" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F1EB]">
            Galeri
          </h1>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 md:py-24 bg-[#F5F1EB]">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-[#0A1628]/70 text-lg mb-12 max-w-2xl mx-auto">
            İstanbul Boğazı&apos;ndaki unutulmaz anlarımızdan kareler.
            Turlarımızdan ve özel organizasyonlarımızdan görüntüler.
          </p>
          <div className="columns-2 md:columns-3 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="mb-4 rounded-2xl overflow-hidden hover:opacity-90 transition-opacity duration-300 break-inside-avoid"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={600}
                  height={image.height}
                  className="w-full h-auto object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
