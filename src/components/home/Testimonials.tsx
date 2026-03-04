import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-[1290px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-secondary font-medium tracking-[0.15em] uppercase text-sm mb-3">Testimonials</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-heading">
            What Our Guests Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-bg-secondary rounded-2xl p-7 relative border border-transparent hover:border-border transition-colors"
            >
              <Quote className="absolute top-5 right-5 w-8 h-8 text-secondary/15" />
              <div className="flex items-center gap-3 mb-5">
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
              <p className="text-gray-600 text-[15px] leading-relaxed">&ldquo;{item.text}&rdquo;</p>
              <p className="text-xs text-secondary font-semibold mt-5 uppercase tracking-wider">{item.tour}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
