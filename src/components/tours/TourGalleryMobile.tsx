"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";

type Props = {
  images: string[];
  alt: string;
  onOpen: (index: number) => void;
  className?: string;
};

const AUTO_ADVANCE_MS = 5000;

/**
 * Mobile-only hero gallery: a native scroll-snap carousel that auto-advances,
 * supports swipe (native horizontal scroll), tap-to-enlarge, and dot indicators.
 * Desktop uses the static 3-image grid in TourDetailClient instead.
 */
export default function TourGalleryMobile({ images, alt, onOpen, className }: Props) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const interacting = useRef(false);

  // Auto-advance — pauses while the user is touching the carousel
  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => {
      if (interacting.current) return;
      const track = trackRef.current;
      if (!track) return;
      const next = (active + 1) % images.length;
      track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" });
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [active, images.length]);

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const idx = Math.round(track.scrollLeft / track.clientWidth);
    if (idx !== active) setActive(idx);
  };

  return (
    <div className={className}>
      <div className="relative overflow-hidden rounded-2xl">
        <div
          ref={trackRef}
          onScroll={handleScroll}
          onTouchStart={() => { interacting.current = true; }}
          onTouchEnd={() => { interacting.current = false; }}
          className="flex h-[280px] snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => onOpen(i)}
              aria-label={`Open photo ${i + 1} of ${images.length}`}
              className="relative h-full w-full shrink-0 snap-center"
            >
              <Image
                src={img}
                alt={`${alt} ${i + 1}`}
                fill
                className="object-cover"
                sizes="100vw"
                priority={i === 0}
              />
            </button>
          ))}
        </div>

        {/* Photo count */}
        <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-semibold text-[var(--heading)] shadow-md">
          <Camera className="h-3.5 w-3.5" />
          {active + 1} / {images.length}
        </span>
      </div>

      {/* Dots */}
      {images.length > 1 && (
        <div className="mt-3 flex justify-center gap-1.5">
          {images.map((img, i) => (
            <button
              key={img + i}
              type="button"
              aria-label={`Go to photo ${i + 1}`}
              onClick={() => {
                const track = trackRef.current;
                if (track) track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" });
              }}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-5 bg-[var(--brand-primary)]" : "w-1.5 bg-[var(--line)]"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
