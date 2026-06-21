import Link from "next/link";
import Image from "next/image";
import { Star, ArrowRight, MessageCircle } from "lucide-react";

/**
 * Visual conversion hero for commercial product pages (yacht / sunset / dinner).
 *
 * Why this exists (2026-06-21): Clarity showed ~30% average scroll depth, so the
 * booking action was never seen — the old above-the-fold was a text wall + a
 * 150-word AI answer box with no photo. Cruises/yachts are visual, high-emotion
 * products: lead with the boat photo + the price wedge + a WhatsApp/Reserve CTA
 * above the fold. The <h1> lives HERE; the page must render this only when it is
 * the page's sole <h1> (e.g. gated to !bookingPrefill), so the literal <h1> is
 * out of the page file and never collides with TourDetailClient's <h1>.
 *
 * The WhatsApp anchor is a raw <a href="wa.me/…"> — the global listener in
 * analytics-whatsapp.ts auto-tracks every wa.me click, so no onClick needed.
 */
type TrustPoint = string;

interface Props {
  image: string;
  imageAlt: string;
  /** Small uppercase kicker above the title (the wedge / positioning line). */
  eyebrow: string;
  /** The page <h1>. */
  title: string;
  /** One-line benefit paragraph under the title. */
  benefit: string;
  /** URL-encoded WhatsApp prefill text (without the wa.me prefix). */
  whatsappText: string;
  /** Short page key for analytics (data-whatsapp-source). */
  whatsappSource: string;
  /** Reserve / book CTA href. */
  reserveHref: string;
  /** Label for the WhatsApp button. */
  whatsappLabel?: string;
  /** Label for the reserve button. */
  reserveLabel?: string;
  /** Optional inline trust points rendered as a chip row inside the hero. */
  trust?: TrustPoint[];
  className?: string;
}

const WA_BASE = "https://wa.me/905448989812?text=";

export default function ProductHero({
  image,
  imageAlt,
  eyebrow,
  title,
  benefit,
  whatsappText,
  whatsappSource,
  reserveHref,
  whatsappLabel = "WhatsApp instant quote",
  reserveLabel = "Reserve online",
  trust,
  className = "",
}: Props) {
  return (
    <section
      className={`relative flex min-h-[18rem] items-end overflow-hidden rounded-3xl bg-[#0b1e3a] md:min-h-[24rem] ${className}`}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="(max-width: 768px) 100vw, 1100px"
        className="object-cover [object-position:50%_45%]"
        quality={72}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/40 to-black/5"
      />
      <div className="relative z-10 w-full p-5 md:p-9">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--brand-gold)] md:text-xs">
          {eyebrow}
        </p>
        <h1 className="max-w-2xl text-[1.7rem] font-bold leading-[1.1] text-white md:text-[2.5rem] md:leading-[1.05]">
          {title}
        </h1>
        <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-white/85 md:text-base">
          {benefit}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2.5 md:mt-5 md:gap-3">
          <a
            href={`${WA_BASE}${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            data-whatsapp-source={whatsappSource}
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-[0_14px_30px_rgba(37,211,102,0.4)] transition-transform hover:scale-[1.03] md:px-6 md:text-base"
          >
            <MessageCircle className="h-4 w-4" /> {whatsappLabel}
          </a>
          <Link
            href={reserveHref}
            className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/95 px-5 py-3 text-sm font-semibold text-[var(--brand-primary)] backdrop-blur-sm transition-colors hover:bg-white md:px-6 md:text-base"
          >
            {reserveLabel} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {trust && trust.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-white/82 md:text-[13px]">
            <span className="inline-flex items-center gap-1">
              <Star className="h-3.5 w-3.5 text-[var(--brand-gold)]" /> {trust[0]}
            </span>
            {trust.slice(1).map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
