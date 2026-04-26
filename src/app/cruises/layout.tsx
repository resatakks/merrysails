import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MerrySails Cruise Catalog | Core Products & Support Pages 2026",
  description:
    "Browse the MerrySails cruise catalog with the Bosphorus compare hub, 3 core booking pages, and narrower support pages for specific planning needs.",
  keywords: [
    "merrysails cruise catalog",
    "merrysails bosphorus pages",
    "merrysails cruise collection",
    "merrysails support pages",
    "merrysails istanbul routes",
  ],
  alternates: { canonical: "https://merrysails.com/cruises" },
  openGraph: {
    title: "MerrySails Cruise Catalog | Core Products & Support Pages 2026",
    description:
      "Catalog view for the Bosphorus compare hub, core booking pages, and narrower MerrySails support routes.",
    url: "https://merrysails.com/cruises",
    type: "website",
    images: [{ url: "https://merrysails.com/og-image.jpg", width: 1200, height: 630, alt: "MerrySails — Bosphorus Cruises Istanbul 2026" }],
  },
};

export default function CruisesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
