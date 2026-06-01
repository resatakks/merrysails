import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { buildHreflang } from "@/lib/hreflang";
import HotelClusterPage from "@/components/cruise/HotelClusterPage";
import { HOTEL_CLUSTER_DISTRICTS } from "@/lib/hotel-cluster-content";

const district = HOTEL_CLUSTER_DISTRICTS.sultanahmet;

export const metadata: Metadata = {
  title: "Bosphorus Cruise from Sultanahmet — €30",
  description:
    "Bosphorus cruise from Sultanahmet hotels. Dinner cruise pickup included (€30 Silver Soft → €90 Gold). Tram T1 to Kabataş 8-12 min. TÜRSAB A licensed since 2001.",
  alternates: {
    canonical: `${SITE_URL}/${district.slug}`,
    languages: buildHreflang(`/${district.slug}`),
  },
  openGraph: {
    title: "Bosphorus Cruise from Sultanahmet",
    description:
      "Bosphorus cruise from Sultanahmet — direct booking, hotel pickup included on dinner cruise, T1 tram + taxi options to Kabataş pier.",
    url: `${SITE_URL}/${district.slug}`,
    type: "article",
  },
};

export default function Page() {
  return <HotelClusterPage district={district} />;
}
