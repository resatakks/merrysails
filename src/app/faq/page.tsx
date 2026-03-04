import type { Metadata } from "next";
import Link from "next/link";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { faqItems } from "@/data/faq";

export const metadata: Metadata = {
  title: "SSS | MerrySails",
  description:
    "MerrySails hakkında sıkça sorulan sorular. Yat kiralama, boğaz turu, fiyatlar ve organizasyon detayları.",
};

export default function FAQPage() {
  return (
    <main>
      {/* Hero Banner */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#0A1628]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A5F]/50 to-[#0A1628]/90" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F1EB]">
            Sıkça Sorulan Sorular
          </h1>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-[#F5F1EB]">
        <div className="max-w-[800px] mx-auto px-4">
          <p className="text-center text-[#0A1628]/70 text-lg mb-12">
            Merak ettiğiniz soruların cevaplarını aşağıda bulabilirsiniz.
            Aradığınız cevabı bulamadıysanız bizimle iletişime geçmekten
            çekinmeyin.
          </p>
          <div className="space-y-3">
            {faqItems.map((item) => (
              <FAQAccordion key={item.question} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1E3A5F]">
        <div className="max-w-[800px] mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#F5F1EB] mb-4">
            Sorunuzun cevabını bulamadınız mı?
          </h2>
          <p className="text-[#F5F1EB]/70 mb-8 text-lg">
            Bizimle doğrudan iletişime geçin, size yardımcı olmaktan mutluluk
            duyarız.
          </p>
          <Link
            href="/contact"
            className="btn-cta inline-flex"
          >
            İletişime Geçin
          </Link>
        </div>
      </section>
    </main>
  );
}
