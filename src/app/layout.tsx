import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MerrySails — İstanbul Boğazı Cruise & Tekne Turları",
    template: "%s | MerrySails",
  },
  description:
    "İstanbul Boğazı'nda unutulmaz cruise deneyimleri. Gün batımı turları, yemekli akşam cruise, özel yat kiralama ve organizasyonlar. TURSAB lisanslı, güvenilir hizmet.",
  keywords: [
    "istanbul boğaz turu",
    "bosphorus cruise",
    "istanbul boat tour",
    "sunset cruise istanbul",
    "dinner cruise istanbul",
    "yat kiralama istanbul",
  ],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://merrysails.com",
    siteName: "MerrySails",
    title: "MerrySails — İstanbul Boğazı Cruise & Tekne Turları",
    description: "İstanbul Boğazı'nda unutulmaz cruise deneyimleri.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${playfair.variable} ${inter.variable} antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
