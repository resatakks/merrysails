import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section className="section-padding bg-bg-white">
      <div className="max-w-[1290px] mx-auto">
        <div className="text-center mb-14">
          <p className="text-secondary font-semibold tracking-[0.2em] uppercase text-sm mb-3">Testimonials</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-heading">What Our Guests Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div key={item.id} className="bg-bg-body rounded-2xl p-7 relative hover:shadow-md transition-all duration-300">
              <Quote className="absolute top-5 right-5 w-7 h-7 text-secondary/15" />
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">{item.avatar}</div>
                <div><p className="font-semibold text-heading text-sm">{item.name}</p><p className="text-xs text-muted">{item.country}</p></div>
              </div>
              <div className="flex gap-0.5 mb-3">{Array.from({ length: item.rating }).map((_, j) => (<Star key={j} className="w-3.5 h-3.5 fill-secondary text-secondary" />))}</div>
              <p className="text-[var(--text)] text-sm leading-relaxed">&ldquo;{item.text}&rdquo;</p>
              <p className="text-xs text-secondary font-semibold mt-4 uppercase tracking-wider">{item.tour}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
