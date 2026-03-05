import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Heart, Cake, Building2, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Special Events",
};

const events = [
  {
    icon: Heart,
    title: "Marriage Proposal",
    description:
      "Create an unforgettable marriage proposal on the Bosphorus. With the stunning Istanbul skyline as your backdrop, pop the question in the most romantic setting imaginable. We handle every detail — from flower decorations to photography — so you can focus on the moment that matters most.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    slug: "marriage-proposal-yacht",
  },
  {
    icon: Cake,
    title: "Birthday Party",
    description:
      "Celebrate your special day with a unique birthday cruise on the Bosphorus. Enjoy music, dancing, and a delicious birthday feast while cruising past Istanbul's most iconic landmarks. Our team will ensure your birthday celebration is truly one-of-a-kind.",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    slug: "birthday-party-yacht",
  },
  {
    icon: Building2,
    title: "Corporate Event",
    description:
      "Impress your clients and team with a prestigious corporate event on the water. From product launches to team-building activities and gala dinners, our private yachts provide the perfect venue for professional gatherings with a spectacular view.",
    image:
      "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800&q=80",
    slug: "corporate-event-yacht",
  },
  {
    icon: Sparkles,
    title: "Wedding",
    description:
      "Say &apos;I do&apos; on the beautiful Bosphorus. Our wedding cruise packages offer a magical setting for your ceremony and reception, with panoramic views of Istanbul, professional catering, and elegant decorations to make your wedding day truly extraordinary.",
    image:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80",
    slug: "wedding-yacht",
  },
];

export default function EventsPage() {
  return (
    <main>
      {/* Hero Banner */}
      <section className="min-h-[40vh] bg-primary flex items-center justify-center text-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Special Events &amp; Organizations
          </h1>
        </div>
      </section>

      {/* Event Cards */}
      <section className="section">
        <div className="max-w-[1290px] mx-auto px-4 space-y-8">
          {events.map((event, index) => {
            const Icon = event.icon;
            const isReversed = index % 2 !== 0;

            return (
              <div
                key={event.title}
                className={`bg-white rounded-2xl overflow-hidden flex flex-col ${
                  isReversed ? "md:flex-row-reverse" : "md:flex-row"
                }`}
              >
                {/* Image Side */}
                <div className="relative w-full md:w-1/2 h-64 md:h-auto">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content Side */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-heading mb-3">
                    {event.title}
                  </h3>
                  <p className="text-heading/70 mb-6 leading-relaxed">
                    {event.description}
                  </p>
                  <Link
                    href={`/cruises/${event.slug}`}
                    className="btn-cta inline-block w-fit"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
