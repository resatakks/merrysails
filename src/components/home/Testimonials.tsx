import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  const displayed = testimonials.slice(0, 3);

  return (
    <section className="section-padding bg-[#F5F1EB]">
      <div className="mx-auto max-w-[1290px] px-4">
        {/* Section Heading */}
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-bold text-heading md:text-4xl">
            Misafirlerimiz Ne Diyor?
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gold" />
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {displayed.map((t, i) => (
            <div
              key={i}
              className="relative rounded-2xl bg-white p-6 transition hover:shadow-md"
            >
              {/* Quote Icon */}
              <Quote className="absolute right-4 top-4 h-8 w-8 text-gold/15" />

              {/* Avatar + Name */}
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1E3A5F] text-sm font-bold text-white">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-heading text-sm font-semibold text-heading">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted">{t.country}</p>
                </div>
              </div>

              {/* Star Rating */}
              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star
                    key={idx}
                    className="h-4 w-4 fill-gold text-gold"
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-sm leading-relaxed text-muted">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Tour Name Label */}
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-gold">
                {t.tour}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
