import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBookingBar from "@/components/layout/MobileBookingBar";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "MerrySails — Istanbul Bosphorus Cruise & Boat Tours",
  description:
    "Discover premium Bosphorus cruises and unforgettable boat tours in Istanbul. Sunset dinners, private yacht charters, and group tours along the iconic Istanbul strait.",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://merrysails.vercel.app",
    title: "MerrySails — Istanbul Bosphorus Cruise & Boat Tours",
    description:
      "Discover premium Bosphorus cruises and unforgettable boat tours in Istanbul. Sunset dinners, private yacht charters, and group tours along the iconic Istanbul strait.",
    siteName: "MerrySails",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileBookingBar />
      </body>
    </html>
  );
}
