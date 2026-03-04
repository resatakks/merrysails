import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBookingBar from "@/components/layout/MobileBookingBar";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MerrySails — Istanbul Bosphorus Cruise & Boat Tours",
    template: "%s | MerrySails",
  },
  description:
    "Premium Bosphorus cruise experiences in Istanbul. Sunset cruises, dinner cruises, private yacht charter and special organizations. TURSAB licensed, trusted local operator.",
  keywords: [
    "istanbul bosphorus cruise",
    "bosphorus sunset cruise",
    "istanbul boat tour",
    "dinner cruise istanbul",
    "private yacht istanbul",
    "istanbul boğaz turu",
    "yat kiralama istanbul",
  ],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    alternateLocale: "en_US",
    url: "https://merrysails.vercel.app",
    siteName: "MerrySails",
    title: "MerrySails — Istanbul Bosphorus Cruise & Boat Tours",
    description: "Premium Bosphorus cruise experiences in Istanbul.",
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
      <body className={`${playfair.variable} ${dmSans.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileBookingBar />
      </body>
    </html>
  );
}
