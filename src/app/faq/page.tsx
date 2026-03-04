import type { Metadata } from "next";
import Image from "next/image";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { faqItems } from "@/data/faq";

export const metadata: Metadata = {
  title: "Sıkça Sorulan Sorular (SSS)",
  description: "MerrySails turları, rezervasyon, ödeme, iptal ve daha fazlası hakkında sıkça sorulan sorular.",
};

export default function FAQPage() {
  const categories = [...new Set(faqItems.map((item) => item.category))];

  return (
    <>
      <section className="relative h-72 md:h-80 flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1920&q=80"
          alt="SSS"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white">SSS</h1>
          <p className="text-white/70 text-lg mt-4">Sıkça Sorulan Sorular</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-3xl mx-auto">
          {categories.map((cat) => (
            <div key={cat} className="mb-10">
              <h2 className="font-heading text-2xl font-bold text-heading mb-4">{cat}</h2>
              <div className="space-y-3">
                {faqItems
                  .filter((item) => item.category === cat)
                  .map((item, i) => (
                    <FAQAccordion key={i} question={item.question} answer={item.answer} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
