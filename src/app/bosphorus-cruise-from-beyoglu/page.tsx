import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { buildHreflang } from "@/lib/hreflang";
import HotelClusterPage from "@/components/cruise/HotelClusterPage";
import { HOTEL_CLUSTER_DISTRICTS } from "@/lib/hotel-cluster-content";

const district = HOTEL_CLUSTER_DISTRICTS.beyoglu;

export const metadata: Metadata = {
  title: "Bosphorus Cruise from Beyoğlu — €30",
  description:
    "Bosphorus cruise from Beyoğlu hotels (Karaköy, Galata, Pera, Cihangir). Sunset cruise 5-min walk from Karaköy. Dinner cruise pickup included.",
  alternates: {
    canonical: `${SITE_URL}/${district.slug}`,
    languages: buildHreflang(`/${district.slug}`),
  },
  openGraph: {
    title: "Bosphorus Cruise from Beyoğlu",
    description:
      "Bosphorus cruise from Beyoğlu — Karaköy hotels are 5 minutes from the sunset cruise pier. Direct booking, hotel pickup on dinner cruise.",
    url: `${SITE_URL}/${district.slug}`,
    type: "article",
  },
};

export default function Page() {
  return <HotelClusterPage district={district} />;
}
