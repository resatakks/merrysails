import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section className="section-padding">
      <div className="max-w-[1290px] mx-auto">
        <div className="text-center mb-14">
          <p className="text-secondary font-semibold tracking-[0.2em] uppercase text-sm mb-3">Testimonials</p>
          <h2 className="font-heading text-3xl md:text-[42px] font-bold text-heading leading-tight">
            What Our Guests Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-bg-white rounded-2xl p-8 relative border border-transparent hover:border-border hover:shadow-lg transition-all duration-300"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-secondary/12" />
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {item.avatar}
                </div>
                <div>
                  <p className="font-semibold text-heading text-[15px]">{item.name}</p>
                  <p className="text-sm text-muted">{item.country}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: item.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-secondary text-secondary" />
                ))}
              </div>
              <p className="text-[var(--text)] text-[15px] leading-relaxed">&ldquo;{item.text}&rdquo;</p>
              <p className="text-xs text-secondary font-semibold mt-6 uppercase tracking-wider">{item.tour}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
