import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section className="section">
      <div className="max-w-[1290px] mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-heading font-bold">What Our Guests Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.slice(0, 3).map((t) => (
            <div key={t.id} className="bg-white rounded-2xl p-6 relative hover:shadow-md transition-all">
              <Quote className="absolute top-4 right-4 w-6 h-6 text-gold/15" />
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">{t.avatar}</div>
                <div><p className="font-semibold text-heading text-sm">{t.name}</p><p className="text-xs text-muted">{t.country}</p></div>
              </div>
              <div className="flex gap-0.5 mb-3">{Array.from({length: t.rating}).map((_,j) => <Star key={j} className="w-3.5 h-3.5 fill-gold text-gold" />)}</div>
              <p className="text-[var(--text)] text-sm leading-relaxed">&ldquo;{t.text}&rdquo;</p>
              <p className="text-xs text-gold font-semibold mt-3 uppercase tracking-wider">{t.tour}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
