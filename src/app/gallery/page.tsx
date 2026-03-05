import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Gallery",
};

const images = [
  {
    src: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80",
    alt: "Istanbul Bosphorus view",
  },
  {
    src: "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=600&q=80",
    alt: "Cruise on the Bosphorus",
  },
  {
    src: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80",
    alt: "Luxury yacht experience",
  },
  {
    src: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=600&q=80",
    alt: "Sunset cruise Istanbul",
  },
  {
    src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
    alt: "Bosphorus bridge at night",
  },
  {
    src: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=600&q=80",
    alt: "Sailing the strait",
  },
  {
    src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80",
    alt: "Yacht deck view",
  },
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
    alt: "Special event on water",
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    alt: "Scenic Istanbul waterway",
  },
];

export default function GalleryPage() {
  return (
    <main>
      {/* Hero Banner */}
      <section className="min-h-[40vh] bg-primary flex items-center justify-center text-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white">Gallery</h1>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="section">
        <div className="max-w-[1290px] mx-auto px-4">
          <div className="columns-2 md:columns-3 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="break-inside-avoid rounded-2xl mb-4 overflow-hidden hover:opacity-90 transition-opacity"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={600}
                  height={index % 3 === 0 ? 800 : index % 3 === 1 ? 600 : 400}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
