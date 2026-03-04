import type { Metadata } from "next";
import { Poppins, DM_Sans } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBookingBar from "@/components/layout/MobileBookingBar";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "MerrySails — Istanbul Bosphorus Cruise & Boat Tours", template: "%s | MerrySails" },
  description: "Premium Bosphorus cruise experiences in Istanbul. Sunset cruises, dinner cruises, private yacht charter. TURSAB licensed.",
  openGraph: { type: "website", locale: "tr_TR", url: "https://merrysails.vercel.app", siteName: "MerrySails" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body className={`${poppins.variable} ${dmSans.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileBookingBar />
      </body>
    </html>
  );
}
