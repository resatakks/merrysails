"use client";

import { useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import ImageLightbox from "./ImageLightbox";

type Props = {
  images: string[];
  alt: string;
  className?: string;
};

export default function FleetHeroImage({ images, alt, className = "" }: Props) {
  const [open, setOpen] = useState(false);
  const cover = images[0];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`group relative block cursor-zoom-in overflow-hidden rounded-2xl bg-[var(--surface-alt)] ${className}`}
        aria-label={`Open ${alt} gallery`}
      >
        {cover && (
          <Image
            src={cover}
            alt={alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm">
          <Maximize2 className="h-3.5 w-3.5" />
          View gallery
        </span>
      </button>

      {open && (
        <ImageLightbox
          images={images}
          alts={images.map((_, i) => `${alt} — image ${i + 1}`)}
          initialIndex={0}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
