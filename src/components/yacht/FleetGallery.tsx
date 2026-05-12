"use client";

import { useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import ImageLightbox from "./ImageLightbox";

type Props = {
  exteriorImages: string[];
  interiorImages: string[];
  altPrefix: string;
  altDescriptor: string;
  exteriorLabel: string;
  interiorLabel: string;
};

export default function FleetGallery({
  exteriorImages,
  interiorImages,
  altPrefix,
  altDescriptor,
  exteriorLabel,
  interiorLabel,
}: Props) {
  const allImages = [...exteriorImages, ...interiorImages];
  const allAlts = [
    ...exteriorImages.map((_, i) => `${altPrefix} exterior view ${i + 1} — ${altDescriptor}`),
    ...interiorImages.map((_, i) => `${altPrefix} interior view ${i + 1} — ${altDescriptor}`),
  ];

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)] mb-3">
            {exteriorLabel}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {exteriorImages.map((src, idx) => (
              <button
                key={src}
                type="button"
                onClick={() => setLightboxIndex(idx)}
                className="group relative aspect-[4/3] cursor-zoom-in overflow-hidden rounded-xl bg-[var(--surface-alt)]"
                aria-label={`Open exterior image ${idx + 1}`}
              >
                <Image
                  src={src}
                  alt={`${altPrefix} exterior view ${idx + 1} — ${altDescriptor}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="pointer-events-none absolute right-2 top-2 rounded-full bg-black/45 p-1.5 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 backdrop-blur-sm">
                  <Maximize2 className="h-3.5 w-3.5" />
                </span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)] mb-3">
            {interiorLabel}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {interiorImages.map((src, idx) => (
              <button
                key={src}
                type="button"
                onClick={() => setLightboxIndex(exteriorImages.length + idx)}
                className="group relative aspect-[4/3] cursor-zoom-in overflow-hidden rounded-xl bg-[var(--surface-alt)]"
                aria-label={`Open interior image ${idx + 1}`}
              >
                <Image
                  src={src}
                  alt={`${altPrefix} interior view ${idx + 1} — ${altDescriptor}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="pointer-events-none absolute right-2 top-2 rounded-full bg-black/45 p-1.5 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 backdrop-blur-sm">
                  <Maximize2 className="h-3.5 w-3.5" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <ImageLightbox
          images={allImages}
          alts={allAlts}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
