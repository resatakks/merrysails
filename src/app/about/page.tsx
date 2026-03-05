import type { Metadata } from "next";
import { Shield, Award, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
};

const stats = [
  { value: "1000+", label: "Happy Guests" },
  { value: "4.9/5", label: "Rating" },
  { value: "5+", label: "Years Experience" },
];

const values = [
  {
    icon: Shield,
    title: "Safety First",
    description:
      "Your safety is our top priority. All our vessels are regularly inspected and meet international maritime safety standards.",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description:
      "We deliver premium experiences with attention to every detail, from our well-maintained fleet to our professional crew.",
  },
  {
    icon: Heart,
    title: "Authentic Experience",
    description:
      "As a local Istanbul company, we offer genuine cultural experiences that connect you with the true spirit of the Bosphorus.",
  },
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero Banner */}
      <section className="min-h-[40vh] bg-primary flex items-center justify-center text-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            About MerrySails
          </h1>
        </div>
      </section>

      {/* Story Section */}
      <section className="section">
        <div className="max-w-[900px] mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 -mt-16 relative z-10 shadow-lg">
            <h2 className="text-2xl font-bold text-heading mb-6">Our Story</h2>
            <p className="text-heading/80 leading-relaxed text-lg">
              MerrySails is the maritime brand of Merry Tourism, born from a
              passion for sharing the unparalleled beauty of the Istanbul
              Bosphorus with travelers from around the world. As a
              TURSAB-licensed operator, we bring over 5 years of experience and
              a commitment to safety, quality, and unforgettable experiences on
              the water. From breathtaking sunset cruises that paint the sky in
              shades of gold, to elegant dinner experiences under the stars, and
              exclusive private yacht charters for life&apos;s most special
              moments — every journey with MerrySails is crafted with care and
              attention to detail. We are a local Istanbul company with no
              middlemen, which means you always get the best price and the most
              authentic experience directly from the people who know these waters
              best.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section">
        <div className="max-w-[900px] mx-auto px-4">
          <div className="bg-primary rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-white/80 text-lg">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section bg-bg">
        <div className="max-w-[1290px] mx-auto px-4">
          <h2 className="text-3xl font-bold text-heading text-center mb-10">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="bg-white rounded-2xl p-8 text-center"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-heading mb-3">
                    {value.title}
                  </h3>
                  <p className="text-heading/70">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
