"use client";

import { useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
  alt?: string;
  /**
   * Optional in-lightbox CTA — surfaces when users browse photos extensively without
   * proceeding to booking (Clarity-tracked behavior 2026-05-06).
   */
  cta?: {
    label: string;
    priceLabel?: string;
    onClick: () => void;
  };
}

const SWIPE_THRESHOLD = 50;

export default function ImageLightbox({ images, currentIndex, onClose, onNavigate, alt = "Tour photo", cta }: Props) {
  const touchStartX = useRef<number | null>(null);
  const thumbsRef = useRef<HTMLDivElement | null>(null);

  const goNext = useCallback(() => {
    onNavigate((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  const goPrev = useCallback(() => {
    onNavigate((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, goNext, goPrev]);

  // Keep the active thumbnail scrolled into view
  useEffect(() => {
    const strip = thumbsRef.current;
    if (!strip) return;
    const active = strip.children[currentIndex] as HTMLElement | undefined;
    active?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [currentIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > SWIPE_THRESHOLD) goPrev();
    else if (delta < -SWIPE_THRESHOLD) goNext();
    touchStartX.current = null;
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-black/92" onClick={onClose}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-sm font-medium text-white/70">
          {currentIndex + 1} / {images.length}
        </span>
        <button
          onClick={onClose}
          aria-label="Close gallery"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Stage */}
      <div className="relative flex flex-1 items-center justify-center">
        {images.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            aria-label="Previous photo"
            className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        <div
          className="relative mx-4 aspect-[16/10] w-full max-w-5xl"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <Image
            src={images[currentIndex]}
            alt={`${alt} ${currentIndex + 1}`}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>

        {images.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            aria-label="Next photo"
            className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* CTA */}
      {cta && (
        <div className="flex justify-center pb-2" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={(e) => { e.stopPropagation(); cta.onClick(); onClose(); }}
            className="inline-flex items-center gap-3 rounded-full bg-[var(--brand-primary)] px-6 py-3 text-sm font-bold text-white shadow-lg ring-2 ring-white/20 transition-transform hover:scale-105"
          >
            <span>{cta.label}</span>
            {cta.priceLabel && (
              <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold">
                {cta.priceLabel}
              </span>
            )}
          </button>
        </div>
      )}

      {/* Thumbnail strip — detailed browsing */}
      {images.length > 1 && (
        <div
          ref={thumbsRef}
          className="flex gap-2 overflow-x-auto px-4 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((img, i) => (
            <button
              key={img + i}
              onClick={() => onNavigate(i)}
              aria-label={`View photo ${i + 1}`}
              className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-md transition-all ${
                i === currentIndex
                  ? "ring-2 ring-white"
                  : "opacity-50 hover:opacity-90"
              }`}
            >
              <Image src={img} alt={`${alt} thumbnail ${i + 1}`} fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
