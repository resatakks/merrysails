"use client";

import { useEffect, useCallback } from "react";
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

export default function ImageLightbox({ images, currentIndex, onClose, onNavigate, alt = "Tour photo", cta }: Props) {
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

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center" onClick={onClose}>
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-4 text-white/70 text-sm font-medium">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          className="absolute left-4 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Image */}
      <div className="relative w-full max-w-5xl mx-4 aspect-[16/10]" onClick={(e) => e.stopPropagation()}>
        <Image
          src={images[currentIndex]}
          alt={`${alt} ${currentIndex + 1}`}
          fill
          className="object-contain"
          sizes="100vw"
          priority
        />
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          className="absolute right-4 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* In-lightbox CTA — converts gallery browsers into bookers */}
      {cta && (
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
          onClick={(e) => e.stopPropagation()}
        >
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
    </div>
  );
}
