import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { buildHreflang } from "@/lib/hreflang";
import HotelClusterPage from "@/components/cruise/HotelClusterPage";
import { HOTEL_CLUSTER_DISTRICTS } from "@/lib/hotel-cluster-content";

const district = HOTEL_CLUSTER_DISTRICTS.taksim;

export const metadata: Metadata = {
  title: "Bosphorus Cruise from Taksim — €30",
  description:
    "Bosphorus cruise from Taksim hotels. F1 funicular to Kabataş in 5 min, taxi 10 min. Sunset cruise €30 Mon/Tue/Thu. Hotel pickup on dinner cruise.",
  alternates: {
    canonical: `${SITE_URL}/${district.slug}`,
    languages: buildHreflang(`/${district.slug}`),
  },
  openGraph: {
    title: "Bosphorus Cruise from Taksim",
    description:
      "Bosphorus cruise from Taksim — F1 funicular puts you at Kabataş in 5 minutes. Direct booking, hotel pickup on dinner cruise.",
    url: `${SITE_URL}/${district.slug}`,
    type: "article",
  },
};

export default function Page() {
  return <HotelClusterPage district={district} />;
}
