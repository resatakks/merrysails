import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Galeri",
  description: "MerrySails turlarından fotoğraflar. İstanbul Boğazı'nın büyüleyici manzaraları ve misafir anıları.",
};

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80", alt: "Boğaz Gün Batımı", category: "Manzara" },
  { src: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80", alt: "Yemekli Cruise", category: "Tur" },
  { src: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&q=80", alt: "Boğaz Köprüsü", category: "Manzara" },
  { src: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80", alt: "Lüks Yat", category: "Filo" },
  { src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80", alt: "Tekne İç Mekan", category: "Filo" },
  { src: "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800&q=80", alt: "Kahvaltı Turu", category: "Tur" },
  { src: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800&q=80", alt: "Marina", category: "Filo" },
  { src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80", alt: "Adalar", category: "Manzara" },
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80", alt: "Romantik Akşam", category: "Etkinlik" },
  { src: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&q=80", alt: "VIP Yat", category: "Filo" },
  { src: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80", alt: "İstanbul Silüeti", category: "Manzara" },
  { src: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80", alt: "Akşam Yemeği", category: "Tur" },
];

export default function GalleryPage() {
  return (
    <>
      <section className="relative h-72 md:h-80 flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1920&q=80"
          alt="Galeri"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Galeri</h1>
          <p className="text-white/70 text-lg mt-4">MerrySails deneyiminden kareler</p>
        </div>
      </section>

      <section className="section">
        <div className="max-w-[1290px] mx-auto">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="break-inside-avoid group relative rounded-2xl overflow-hidden cursor-pointer"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={i % 3 === 0 ? 400 : i % 3 === 1 ? 500 : 350}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/50 transition-all flex items-end">
                  <div className="p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                    <p className="text-white font-semibold">{img.alt}</p>
                    <span className="text-gold text-sm">{img.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
