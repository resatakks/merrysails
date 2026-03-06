import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Istanbul Bosphorus Cruises & Boat Tours — Book Online",
  description:
    "Browse all Bosphorus cruises in Istanbul: sunset cruises, dinner cruises, private yacht charters, and special events. Best prices guaranteed. Free cancellation.",
  keywords: [
    "bosphorus cruises",
    "istanbul boat tours",
    "sunset cruise istanbul",
    "dinner cruise bosphorus",
    "yacht charter istanbul",
    "book cruise istanbul",
  ],
  alternates: { canonical: "https://merrysails.vercel.app/cruises" },
  openGraph: {
    title: "All Istanbul Bosphorus Cruises & Boat Tours",
    description:
      "Sunset cruises, dinner cruises, private yacht charters. Browse all tours and book online with best price guarantee.",
    url: "https://merrysails.vercel.app/cruises",
    type: "website",
  },
};

export default function CruisesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
