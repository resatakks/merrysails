import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Istanbul Bosphorus Cruises & Boat Tours — Book Online",
  description:
    "Browse all Bosphorus cruises in Istanbul: sunset cruises, dinner cruises, private yacht charters, boat tours, and special event packages. Best prices guaranteed. Free cancellation.",
  alternates: { canonical: "https://merrysails.vercel.app/cruises" },
  openGraph: {
    title: "All Istanbul Bosphorus Cruises & Boat Tours",
    description: "Sunset cruises, dinner cruises, private yacht charters, and more. Browse all tours and book online.",
    url: "https://merrysails.vercel.app/cruises",
  },
};

export default function CruisesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
