export const metadata = {
  title: "Blog — Bosphorus Cruise & Istanbul Travel Guides",
  description:
    "Expert guides for Bosphorus cruises, yacht charters, Istanbul boat tours, dinner cruises, and travel tips. Plan your perfect Istanbul experience.",
  keywords: [
    "bosphorus cruise blog",
    "istanbul travel guide",
    "cruise tips istanbul",
    "yacht charter guide",
    "istanbul boat tour tips",
    "bosphorus travel blog",
  ],
  alternates: { canonical: "https://merrysails.vercel.app/blog" },
  openGraph: {
    title: "Blog — Bosphorus Cruise & Istanbul Travel Guides",
    description:
      "Expert cruise guides, yacht charter tips, and Istanbul travel advice from MerrySails.",
    url: "https://merrysails.vercel.app/blog",
    type: "website" as const,
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
