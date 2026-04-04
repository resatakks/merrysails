import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBookingBar from "@/components/layout/MobileBookingBar";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { ToastProvider } from "@/components/ui/Toast";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const SITE_URL = "https://merrysails.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MerrySails — Bosphorus Cruise & Yacht Charter Istanbul 2026 | Book Online",
    template: "%s | MerrySails Istanbul 2026",
  },
  description:
    "Book the best Bosphorus cruise in Istanbul for 2026 — sunset cruises from €40, dinner cruises from €65, private yacht charters from €280, and luxury boat tours. Operated by Merry Tourism, TURSAB licensed since 2001. Best price guarantee — book online today.",
  keywords: [
    "bosphorus cruise", "istanbul dinner cruise", "sunset cruise istanbul",
    "bosphorus dinner cruise", "boat trip istanbul", "boat tour istanbul",
    "yacht rental istanbul", "bosphorus sunset cruise", "istanbul cruise tour",
    "private yacht istanbul", "bosphorus boat tour", "bosphorus night cruise",
    "yacht charter istanbul", "dinner cruise istanbul", "bosphorus tour",
    "istanbul bosphorus cruise", "best dinner cruise istanbul",
    "bosphorus yacht cruise", "princess island tour", "party boat istanbul",
    "boat cruises istanbul turkey", "bosphorus boat ride istanbul",
    "istanbul boat cruise", "bosphorus cruise istanbul", "yacht charter istanbul turkey",
    "bosphorus yacht tour", "bosphorus sunset", "private bosphorus cruise",
    "istanbul night cruise", "bosphorus boat trip", "bosphorus ferry ride",
    "bosphorus cruise price", "short bosphorus cruise", "long bosphorus cruise",
    "bosphorus cruise with dinner", "istanbul sunset cruise price",
    "istanbul by night cruise", "bosphorus cruise with lunch", "morning bosphorus cruise",
    "two continents cruise istanbul", "istanbul sightseeing cruise",
    "maiden tower boat trip", "istanbul cruise ticket",
  ],
  authors: [{ name: "Merry Tourism", url: SITE_URL }],
  creator: "MerrySails - Merry Tourism",
  publisher: "MerrySails",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "MerrySails — Bosphorus Cruise & Yacht Charter in Istanbul",
    description: "Book the best Bosphorus cruise in Istanbul — sunset cruises, dinner cruises, private yacht charters, and luxury boat tours. Since 2001.",
    siteName: "MerrySails",
    locale: "en_US",
    type: "website",
    url: SITE_URL,
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "MerrySails — Bosphorus Cruise & Yacht Charter in Istanbul",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MerrySails — Bosphorus Cruise & Yacht Charter in Istanbul",
    description: "Sunset cruises, dinner cruises, private yacht charters, and luxury boat tours. Since 2001.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "travel",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || undefined,
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION ? [process.env.NEXT_PUBLIC_BING_VERIFICATION] : [],
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["TravelAgency", "LocalBusiness"],
  "@id": `${SITE_URL}/#organization`,
  name: "MerrySails",
  alternateName: "Merry Tourism",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  image: `${SITE_URL}/og-image.jpg`,
  description: "Premium Bosphorus cruise and yacht charter services in Istanbul since 2001.",
  foundingDate: "2001-01-01",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Alemdar Mah. Divanyolu Cad. Oğul Han No:62 İç Kapı No: 402",
    addressLocality: "Fatih",
    addressRegion: "İstanbul",
    postalCode: "34093",
    addressCountry: "TR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.0082,
    longitude: 28.9784,
  },
  telephone: "+905370406822",
  email: "info@merrysails.com",
  priceRange: "€€",
  sameAs: [
    "https://www.instagram.com/merrysails",
    "https://www.facebook.com/merrysails",
    "https://www.google.com/maps/place/Merry+Tourism/@41.0082,28.9784,17z",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: 4.9,
    bestRating: 5,
    ratingCount: 312,
    reviewCount: 247,
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Bosphorus Cruise & Yacht Services",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Bosphorus Cruise Tours",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Bosphorus Cruise Tours",
            },
            priceSpecification: {
              "@type": "PriceSpecification",
              price: 25,
              priceCurrency: "EUR",
              valueAddedTaxIncluded: true,
            },
          },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Private Yacht Charter",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Private Yacht Charter",
            },
            priceSpecification: {
              "@type": "PriceSpecification",
              price: 500,
              priceCurrency: "EUR",
              valueAddedTaxIncluded: true,
            },
          },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Group Event & Party Boats",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Group Event & Party Boats",
            },
            priceSpecification: {
              "@type": "PriceSpecification",
              price: 1000,
              priceCurrency: "EUR",
              valueAddedTaxIncluded: true,
            },
          },
        ],
      },
    ],
  },
  areaServed: {
    "@type": "City",
    name: "Istanbul",
    containedInPlace: {
      "@type": "Country",
      name: "Turkey",
    },
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    opens: "09:00",
    closes: "22:00",
  },
  paymentAccepted: "Cash, Credit Card, Bank Transfer",
  currenciesAccepted: "EUR, USD, TRY, GBP",
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "TURSAB A Group License",
  },
  knowsAbout: ["Bosphorus Cruise Tours", "Yacht Charter Istanbul", "Private Boat Tours", "Dinner Cruise Istanbul", "Corporate Event Cruises"],
};

const siteNavigationSchema = {
  "@context": "https://schema.org",
  "@type": "SiteNavigationElement",
  name: [
    "Bosphorus Sunset Cruise",
    "Dinner Cruise",
    "Yacht Charter",
    "All Cruises",
    "Private Tours",
    "Blog",
    "Istanbul Guides",
    "About",
    "Contact",
    "FAQ",
  ],
  url: [
    `${SITE_URL}/cruises/bosphorus-sunset-cruise`,
    `${SITE_URL}/cruises/bosphorus-dinner-cruise`,
    `${SITE_URL}/cruises/yacht-charter-in-istanbul`,
    `${SITE_URL}/cruises`,
    `${SITE_URL}/private-tours`,
    `${SITE_URL}/blog`,
    `${SITE_URL}/guides`,
    `${SITE_URL}/about`,
    `${SITE_URL}/contact`,
    `${SITE_URL}/faq`,
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={dmSans.variable}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationSchema) }}
        />
      </head>
      <body className="font-sans antialiased">
        <ToastProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <MobileBookingBar />
          <WhatsAppButton />
        </ToastProvider>
      </body>
    </html>
  );
}
