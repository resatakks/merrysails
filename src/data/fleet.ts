export interface Yacht {
  id: string;
  slug: string;
  name: string;
  type: string;
  capacity: number;
  length: string;
  features: string[];
  description: string;
  image: string;
  pricePerHour: number;
}

export const fleet: Yacht[] = [
  {
    id: "1",
    slug: "merry-star",
    name: "Merry Star",
    type: "Lüks Motor Yat",
    capacity: 50,
    length: "24 metre",
    features: ["Klimalı salon", "Açık üst güverte", "VIP bölüm", "Profesyonel mutfak", "Ses sistemi", "LED aydınlatma"],
    description: "MerrySails filosunun amiral gemisi. 50 kişiye kadar misafir ağırlayabilen Merry Star, lüks salonu ve geniş üst güvertesiyle grup turları ve özel organizasyonlar için ideal.",
    image: "/images/tours/yacht-charter-in-istanbul/01.jpeg",
    pricePerHour: 300,
  },
  {
    id: "2",
    slug: "merry-breeze",
    name: "Merry Breeze",
    type: "Klasik Ahşap Tekne",
    capacity: 40,
    length: "18 metre",
    features: ["Geleneksel ahşap tasarım", "Açık güverte", "Gölgelik alan", "Ses sistemi", "Mini mutfak"],
    description: "Otantik İstanbul deneyimi sunan klasik ahşap teknemiz. Boğaz'ın ruhunu en iyi yansıtan Merry Breeze, gün batımı ve keşif turları için mükemmel.",
    image: "/images/tours/yacht-charter-in-istanbul/05.jpeg",
    pricePerHour: 200,
  },
  {
    id: "3",
    slug: "merry-diamond",
    name: "Merry Diamond",
    type: "VIP Süper Yat",
    capacity: 20,
    length: "28 metre",
    features: ["Jacuzzi", "Üst güverte bar", "Master suite", "Jet ski platformu", "Full mutfak", "Sinema sistemi"],
    description: "Ultra lüks VIP deneyimi için tasarlanmış Merry Diamond. Jacuzzi, sinema sistemi ve özel bar ile Boğaz'da en prestijli deneyimi sunuyor.",
    image: "/images/tours/yacht-charter-in-istanbul/10.webp",
    pricePerHour: 600,
  },
  {
    id: "4",
    slug: "merry-pearl",
    name: "Merry Pearl",
    type: "Katamaran",
    capacity: 35,
    length: "20 metre",
    features: ["Geniş güverte", "Stabilite", "Kapalı salon", "Açık bar", "WiFi", "USB şarj"],
    description: "Çift gövdeli tasarımıyla yüksek stabilite sunan Merry Pearl, deniz tutması endişesi olanlar için ideal. Geniş güvertesi ve modern iç mekanıyla konforlu bir yolculuk vaat ediyor.",
    image: "/images/tours/yacht-charter-in-istanbul/15.jpg",
    pricePerHour: 250,
  },
];
