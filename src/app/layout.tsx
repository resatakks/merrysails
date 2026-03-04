import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBookingBar from "@/components/layout/MobileBookingBar";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], display: "swap", variable: "--font-sans" });

export const metadata: Metadata = {
  title: { default: "MerrySails — Istanbul Bosphorus Cruise & Boat Tours", template: "%s | MerrySails" },
  description: "Premium Bosphorus cruise experiences in Istanbul. Sunset cruises, dinner cruises, private yacht charter. TURSAB licensed, trusted local operator.",
  openGraph: { type: "website", locale: "tr_TR", url: "https://merrysails.vercel.app", siteName: "MerrySails" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body className={`${dmSans.variable} antialiased`}><Header /><main>{children}</main><Footer /><MobileBookingBar /></body>
    </html>
  );
}
