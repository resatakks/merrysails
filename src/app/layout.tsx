import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBookingBar from "@/components/layout/MobileBookingBar";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "MerrySails — Istanbul Bosphorus Cruises",
    template: "%s | MerrySails",
  },
  description:
    "Book the best Bosphorus cruise experience in Istanbul. Sunset cruises, dinner cruises, private yacht charters and more. Operated by Merry Tourism since 2001.",
  keywords: [
    "istanbul bosphorus cruise",
    "sunset cruise istanbul",
    "dinner cruise istanbul",
    "private yacht istanbul",
    "bosphorus tour",
  ],
  openGraph: {
    title: "MerrySails — Istanbul Bosphorus Cruises",
    description: "Book the best Bosphorus cruise experience in Istanbul.",
    siteName: "MerrySails",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileBookingBar />
      </body>
    </html>
  );
}
