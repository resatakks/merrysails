import type { Metadata } from "next";
import { Suspense } from "react";
import { DM_Sans } from "next/font/google";
import Script from "next/script";
import AnalyticsRouteTracker from "@/components/analytics/AnalyticsRouteTracker";
import EngagementTracker from "@/components/analytics/EngagementTracker";
import ClarityIdentityProvider from "@/components/analytics/ClarityIdentityProvider";
import ErrorTracker from "@/components/analytics/ErrorTracker";
import GlobalContactClickTracker from "@/components/analytics/GlobalContactClickTracker";
import WebVitalsReporter from "@/components/analytics/WebVitalsReporter";
import SiteChrome from "@/components/layout/SiteChrome";
import { ToastProvider } from "@/components/ui/Toast";
import { DEFAULT_LOCALE, getHtmlDir } from "@/i18n/config";
import "./globals.css";
import { BRAND_IN_LANGUAGE, OFFER_MERCHANT_DEFAULTS } from "@/lib/schema-merchant";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const SITE_URL = "https://merrysails.com";
// Block Merry's GTM-MWVS696K container — MerrySails has no own GTM yet,
// so loading Merry's would cross-contaminate tag fires. Direct gtag for
// GA4 + Ads is wired below (G-9B3Q7FM7X8 + AW-18112460958).
// Hardened block: tolerates whitespace, casing, and common typos.
const RAW_GTM = (process.env.NEXT_PUBLIC_GTM_CONTAINER_ID ?? "").trim();
const BLOCKED_GTM_IDS = new Set(["GTM-MWVS696K", "gtm-mwvs696k"]);
const GTM_CONTAINER_ID = BLOCKED_GTM_IDS.has(RAW_GTM) || BLOCKED_GTM_IDS.has(RAW_GTM.toUpperCase())
  ? ""
  : RAW_GTM;
const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";
const GOOGLE_ADS_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "";
// No fallback Clarity ID — when env unset we render null. Hard-coding the
// production ID into source meant every preview/local build sent traffic to
// the live Clarity project, polluting heatmaps and session recordings.
const CLARITY_PROJECT_ID =
  (process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? "").trim();
const META_PIXEL_ID =
  (process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "").trim();
// Yandex Metrica — counter ID for CIS/RU organic + Yandex Webmaster pairing.
// Set NEXT_PUBLIC_YANDEX_METRICA_ID in Vercel env (operator provides). When
// unset (preview/local) the script is skipped — no fallback ID.
const YANDEX_METRICA_ID =
  (process.env.NEXT_PUBLIC_YANDEX_METRICA_ID ?? "").trim();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    // Suffix kept short (" | MerrySails" = 13 chars) so the page-specific part
    // has a ~47-char budget before the 60-char limit. The old 27-char suffix
    // (" | MerrySails Istanbul 2026") pushed 138 pages over Semrush's long-title
    // threshold — "Istanbul" is already in nearly every page title anyway.
    default: "Bosphorus Cruise & Yacht Charter Istanbul | MerrySails",
    template: "%s | MerrySails",
  },
  description:
    "MerrySails focuses on Bosphorus sunset cruises, Bosphorus dinner cruises, and yacht charter in Istanbul, with dedicated private event, proposal, and corporate pages.",
  authors: [{ name: "Merry Tourism", url: SITE_URL }],
  creator: "MerrySails - Merry Tourism",
  publisher: "MerrySails",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "MerrySails — Bosphorus Cruise & Yacht Charter in Istanbul",
    description: "Bosphorus sunset cruise, Bosphorus dinner cruise, and yacht charter in Istanbul with dedicated private event and charter pages.",
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
    description: "Bosphorus sunset cruise, Bosphorus dinner cruise, and yacht charter in Istanbul.",
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
      // 2026-06-12: Baidu Zhanzhang (百度搜索资源平台) site verification for
      // Chinese organic + AI grounding visibility (DeepSeek/Doubao/Kimi
      // ground on Baidu surfaces). Set NEXT_PUBLIC_BAIDU_VERIFICATION in
      // Vercel env once operator runs the ziyuan.baidu.com property-add flow
      // (codeva-XXXXX format). Empty array when unset — no premature signals.
      "baidu-site-verification": process.env.NEXT_PUBLIC_BAIDU_VERIFICATION ? [process.env.NEXT_PUBLIC_BAIDU_VERIFICATION] : [],
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["TravelAgency", "LocalBusiness"],
  "@id": `${SITE_URL}/#organization`,
  inLanguage: BRAND_IN_LANGUAGE,
  name: "MerrySails",
  alternateName: ["Merry Tourism", "Meryem Yildiz Travel"],
  legalName: "MERYEM YILDIZ TURIZM SEYAHAT ACENTASI",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  image: `${SITE_URL}/og-image.jpg`,
  description: "Premium Bosphorus cruise and yacht charter services in Istanbul since 2001.",
  foundingDate: "2001-01-01",
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    value: 25,
  },
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
  telephone: "+905448989812",
  email: "info@merrysails.com",
  priceRange: "€€",
  sameAs: [
    "https://www.wikidata.org/wiki/Q139785645",
    "https://www.instagram.com/merrysails",
    "https://www.facebook.com/merrysails",
    "https://www.google.com/maps/place/Merry+Tourism/@41.0082,28.9784,17z",
    // 2026-06-13: GBP review URL — anchors brand to Google Business Profile
    // entity (Place ID ChIJo5HLfp5GCgsRKqlEhm13b3k). Improves Knowledge Graph
    // reconciliation + lets AI engines surface "leave a review" CTA inline.
    "https://search.google.com/local/writereview?placeid=ChIJo5HLfp5GCgsRKqlEhm13b3k",
    "https://kingsworldtransfer.com",
    "https://acilkaseniz.com",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Bosphorus Cruise & Yacht Services",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Bosphorus Sunset Cruise",
        itemListElement: [
          {
            "@type": "Offer",
            ...OFFER_MERCHANT_DEFAULTS,
            itemOffered: {
              "@type": "Service",
              name: "Bosphorus Sunset Cruise",
            },
            priceSpecification: {
              "@type": "PriceSpecification",
              price: 30,
              priceCurrency: "EUR",
              valueAddedTaxIncluded: true,
            },
          },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Bosphorus Dinner Cruise",
        itemListElement: [
          {
            "@type": "Offer",
            ...OFFER_MERCHANT_DEFAULTS,
            itemOffered: {
              "@type": "Service",
              name: "Bosphorus Dinner Cruise",
            },
            priceSpecification: {
              "@type": "PriceSpecification",
              price: 30,
              priceCurrency: "EUR",
              valueAddedTaxIncluded: true,
            },
          },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Yacht Charter Istanbul",
        itemListElement: [
          {
            "@type": "Offer",
            ...OFFER_MERCHANT_DEFAULTS,
            itemOffered: {
              "@type": "Service",
              name: "Yacht Charter Istanbul",
            },
            priceSpecification: {
              "@type": "PriceSpecification",
              price: 220,
              priceCurrency: "EUR",
              valueAddedTaxIncluded: true,
            },
          },
        ],
      },
    ],
  },
  hasMap: "https://www.google.com/maps/place/Merry+Tourism/@41.0082,28.9784,17z",
  areaServed: [
    {
      "@type": "City",
      name: "Istanbul",
      containedInPlace: {
        "@type": "Country",
        name: "Turkey",
      },
    },
    { "@type": "Place", name: "Kabataş", containedInPlace: { "@type": "City", name: "Istanbul" } },
    { "@type": "Place", name: "Sultanahmet", containedInPlace: { "@type": "City", name: "Istanbul" } },
    { "@type": "Place", name: "Taksim", containedInPlace: { "@type": "City", name: "Istanbul" } },
    { "@type": "Place", name: "Karaköy", containedInPlace: { "@type": "City", name: "Istanbul" } },
    { "@type": "Place", name: "Ortaköy", containedInPlace: { "@type": "City", name: "Istanbul" } },
    { "@type": "Place", name: "Beşiktaş", containedInPlace: { "@type": "City", name: "Istanbul" } },
  ],
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
    identifier: "14316",
    recognizedBy: {
      "@type": "Organization",
      name: "TURSAB — Association of Turkish Travel Agencies",
      url: "https://www.tursab.org.tr",
    },
  },
  identifier: [
    {
      "@type": "PropertyValue",
      name: "TURSAB License Number",
      value: "14316",
    },
    {
      "@type": "PropertyValue",
      propertyID: "wikidata",
      value: "Q139785645",
    },
  ],
  knowsAbout: ["Bosphorus Cruise Tours", "Yacht Charter Istanbul", "Private Boat Tours", "Dinner Cruise Istanbul", "Corporate Event Cruises"],
  // Parent disclosure — same TÜRSAB licensee (Meryem Yıldız) operates
  // MerrySails + GoldenSunsetTour + MerryTourism. MS hosts the canonical
  // parent node; sibling brands reference by @id.
  parentOrganization: { "@id": `${SITE_URL}/#parent-tursab-licensee` },
};

// Shared parent disclosure node — referenced by GoldenSunsetTour and
// MerryTourism Organization schemas via @id. Hosted here on MerrySails as the
// canonical disclosure surface for the multi-brand TÜRSAB licensee group.
const parentTursabLicenseeSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#parent-tursab-licensee`,
  name: "MERYEM YILDIZ TURIZM SEYAHAT ACENTASI",
  alternateName: ["Meryem Yıldız Turizm", "TÜRSAB Licensed Operator (License #14316)"],
  legalName: "MERYEM YILDIZ TURIZM SEYAHAT ACENTASI",
  url: SITE_URL,
  description:
    "TÜRSAB A-Group licensed Turkish travel agency (license #14316) trading publicly under three consumer brands: MerrySails, GoldenSunsetTour, and MerryTourism. Same licensee, same regulatory entity since 2001.",
  foundingDate: "2001-01-01",
  founder: {
    "@type": "Person",
    "@id": `${SITE_URL}/#person-meryem-yildiz`,
    name: "Meryem Yıldız",
    jobTitle: "TÜRSAB Licensed Tour Operator & Founder",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Alemdar Mah. Divanyolu Cad. Oğul Han No:62 İç Kapı No: 402",
    addressLocality: "Fatih",
    addressRegion: "İstanbul",
    postalCode: "34093",
    addressCountry: "TR",
  },
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "TURSAB A Group License",
    identifier: "14316",
    recognizedBy: {
      "@type": "Organization",
      name: "TURSAB — Association of Turkish Travel Agencies",
      url: "https://www.tursab.org.tr",
    },
  },
  subOrganization: [
    { "@id": `${SITE_URL}/#organization` },
    {
      "@type": "Organization",
      "@id": "https://goldensunsettour.com/#organization",
      name: "GoldenSunsetTour",
      url: "https://goldensunsettour.com",
    },
    {
      "@type": "Organization",
      "@id": "https://www.merrytourism.com/#organization",
      name: "Merry Tourism",
      url: "https://www.merrytourism.com",
    },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  inLanguage: BRAND_IN_LANGUAGE,
  name: "MerrySails",
  url: SITE_URL,
  description: "Bosphorus cruise and yacht charter booking in Istanbul — sunset cruise, dinner cruise, private yacht.",
  publisher: { "@id": `${SITE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const captainSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#captain-ahmet`,
  inLanguage: BRAND_IN_LANGUAGE,
  name: "Captain Ahmet Yıldız",
  givenName: "Ahmet",
  familyName: "Yıldız",
  jobTitle: "Senior Captain",
  description: "Senior captain at MerrySails. Over 25 years navigating the Bosphorus, Captain Ahmet Yıldız has personally guided more than 50,000 guests through Istanbul's waterways under a Turkish Maritime Authority master license.",
  worksFor: { "@id": `${SITE_URL}/#organization` },
  knowsAbout: ["Bosphorus Cruise", "Yacht Charter Istanbul", "Istanbul Maritime Tourism", "Private Boat Tours"],
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    name: "TURSAB A-Group License",
    credentialCategory: "Professional License",
  },
  url: `${SITE_URL}/about`,
};

const meryemSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person-meryem-yildiz`,
  inLanguage: BRAND_IN_LANGUAGE,
  name: "Meryem Yıldız",
  givenName: "Meryem",
  familyName: "Yıldız",
  jobTitle: "TÜRSAB Licensed Tour Operator & Founder",
  description:
    "TÜRSAB A-Group licensed tour operator (license #14316). Founder of the parent travel agency MERYEM YILDIZ TURIZM SEYAHAT ACENTASI, which operates MerrySails, GoldenSunsetTour and MerryTourism under the same single license.",
  worksFor: { "@id": `${SITE_URL}/#parent-tursab-licensee` },
  founderOf: { "@id": `${SITE_URL}/#parent-tursab-licensee` },
  knowsAbout: [
    "TÜRSAB tourism licensing",
    "Turkish travel agency regulation",
    "Multi-brand tour operator management",
    "Bosphorus cruise operations",
    "Istanbul airport transfer operations",
  ],
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "TURSAB A Group License",
    identifier: "14316",
    recognizedBy: {
      "@type": "Organization",
      name: "TURSAB — Association of Turkish Travel Agencies",
      url: "https://www.tursab.org.tr",
    },
  },
  url: `${SITE_URL}/about`,
};

const siteNavigationSchema = {
  "@context": "https://schema.org",
  "@type": "SiteNavigationElement",
  name: [
    "Bosphorus Sunset Cruise",
    "Dinner Cruise",
    "Yacht Charter",
    "Bosphorus Cruise Hub",
    "Blog",
    "Istanbul Guides",
    "About",
    "Contact",
    "FAQ",
  ],
  url: [
    `${SITE_URL}/cruises/bosphorus-sunset-cruise`,
    `${SITE_URL}/istanbul-dinner-cruise`,
    `${SITE_URL}/yacht-charter-istanbul`,
    `${SITE_URL}/bosphorus-cruise`,
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
  // <html lang="..."> is static — middleware rewrites it per-locale
  // (see src/proxy.ts handleHtmlLangRewrite). This keeps all 444 pages
  // statically prerendered while still emitting correct lang attribute.
  return (
    <html
      lang={DEFAULT_LOCALE}
      dir={getHtmlDir(DEFAULT_LOCALE)}
      className={dmSans.variable}
    >
      <head>
        {/* Google-Translate / iOS in-app-translate React resilience shim.
            Auto-translate reparents text nodes React still tracks → React's
            removeChild/insertBefore throw "NotFoundError: The object can not
            be found here." + "Maximum call stack size exceeded" (es-ES / iOS
            CriOS = ~40%+20% of mobile JS errors, exactly the non-English Ads
            tourist traffic). No-ops ONLY when parent/child don't match (the
            exact crash condition); same-parent ops run untouched. Must run
            before hydration, so it is the first node in <head>.
            React issue #11538 — canonical patch. 2026-06-20. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){if(typeof Node!=='function'||!Node.prototype)return;var r=Node.prototype.removeChild;Node.prototype.removeChild=function(child){if(child.parentNode!==this){return child;}return r.apply(this,arguments);};var i=Node.prototype.insertBefore;Node.prototype.insertBefore=function(newNode,referenceNode){if(referenceNode&&referenceNode.parentNode!==this){return newNode.parentNode===this?newNode:this.appendChild(newNode);}return i.apply(this,arguments);};})();`,
          }}
        />
        {/* Bing/Copilot grounding eligibility — per Bing Webmaster Guidelines
            Feb 27 2026 rewrite ("doesn't guarantee citations but grounding
            eligibility"). Clone of goldensunsettour pattern. 2026-06-09. */}
        <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        {/* Google tag (gtag.js) loaded directly to make window.gtag available
            BEFORE GTM executes. Primary purpose:
            1) Set Google Consent Mode v2 defaults (all granted — no cookie banner)
            2) Configure the Google Ads ID so direct gtag('event','conversion')
               calls for purchase deduplification reach Ads servers
            GTM handles GA4 configuration — we deliberately do NOT call
            gtag('config', GA_MEASUREMENT_ID) here to avoid duplicate page views. */}
        {GOOGLE_ADS_ID ? (
          <>
            <Script
              id="gtag-consent-init"
              strategy="beforeInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  window.gtag = gtag;
                  gtag('consent', 'default', {
                    analytics_storage: 'granted',
                    ad_storage: 'granted',
                    ad_user_data: 'granted',
                    ad_personalization: 'granted',
                    wait_for_update: 0
                  });
                `,
              }}
            />
            <Script
              id="gtag-js"
              src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="gtag-ads-config"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `gtag('js', new Date()); gtag('config', '${GOOGLE_ADS_ID}');${
                  GA_MEASUREMENT_ID && !GTM_CONTAINER_ID
                    ? ` gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: true });`
                    : ""
                }`,
              }}
            />
          </>
        ) : null}
        {GA_MEASUREMENT_ID && !GOOGLE_ADS_ID && !GTM_CONTAINER_ID ? (
          <>
            <Script
              id="ga4-direct"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="ga4-direct-config"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  window.gtag = window.gtag || gtag;
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: true });`,
              }}
            />
          </>
        ) : null}
        {GTM_CONTAINER_ID ? (
          <>
            <Script
              id="gtm-bootstrap"
              strategy="beforeInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  window.dataLayer.push({
                    'gtm.start': new Date().getTime(),
                    event: 'gtm.js'
                  });
                `,
              }}
            />
            {/* GTM external — lazyOnload (defer 60-100 KB blocking JS until after LCP).
                Mobile CWV fix 2026-06-11. */}
            <Script
              id="gtm-script"
              src={`https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`}
              strategy="lazyOnload"
            />
          </>
        ) : null}
        {CLARITY_PROJECT_ID ? (
          <>
            <Script
              id="microsoft-clarity-stub"
              strategy="beforeInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                (function(w){
                  if (typeof w.clarity !== 'function') {
                    var q = [];
                    var c = function(){ q.push(arguments); };
                    c.q = q;
                    c.l = +new Date();
                    w.clarity = c;
                  }
                  try {
                    w.clarity('consent');
                    w.clarity('consentv2', { analytics_storage: 'granted', ad_storage: 'granted' });
                    var uid = (document.cookie.match(/(?:^|; )_craft_uid=([^;]*)/) || [])[1];
                    if (!uid) {
                      uid = localStorage.getItem('_clarity_uid');
                      if (!uid) {
                        uid = crypto.randomUUID();
                        localStorage.setItem('_clarity_uid', uid);
                      }
                    }
                    if (uid) w.clarity('identify', uid, undefined, w.location.pathname);
                  } catch(e) {}
                })(window);
              `,
              }}
            />
            {/* Clarity tag — lazyOnload (mobile CWV fix 2026-06-11). */}
            <Script
              id="microsoft-clarity"
              strategy="lazyOnload"
              dangerouslySetInnerHTML={{
                __html: `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
              `,
              }}
            />
          </>
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(captainSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(parentTursabLicenseeSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(meryemSchema) }}
        />
        {/* Meta Pixel — fires PageView on init; explicit events go through
            src/lib/meta-pixel.ts which also mirrors to /api/meta-capi for
            server-side CAPI dedup. Skipped when NEXT_PUBLIC_META_PIXEL_ID is
            not set so unconfigured deploys are safe. */}
        {META_PIXEL_ID && (
          <Script id="meta-pixel" strategy="lazyOnload">
            {`
              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
              document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}
        {/* Yandex Metrica — CIS/RU funnel + Yandex Webmaster pairing. Loads
            lazyOnload to keep mobile LCP unaffected. Skipped when
            NEXT_PUBLIC_YANDEX_METRICA_ID is unset (preview/local safe). */}
        {YANDEX_METRICA_ID && (
          <>
            <Script id="yandex-metrica" strategy="lazyOnload">
              {`
                (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
                ym(${YANDEX_METRICA_ID}, "init", {
                  clickmap:true,
                  trackLinks:true,
                  accurateTrackBounce:true,
                  webvisor:true,
                  ecommerce:"dataLayer"
                });
              `}
            </Script>
            <noscript>
              <div>
                <img
                  src={`https://mc.yandex.ru/watch/${YANDEX_METRICA_ID}`}
                  style={{ position: "absolute", left: "-9999px" }}
                  alt=""
                />
              </div>
            </noscript>
          </>
        )}
      </head>
      <body className="font-sans antialiased">
        {GTM_CONTAINER_ID ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        ) : null}
        <Suspense fallback={null}>
          <AnalyticsRouteTracker />
          <EngagementTracker />
          <ClarityIdentityProvider />
          <ErrorTracker />
        </Suspense>
        <WebVitalsReporter />
        <GlobalContactClickTracker />
        <ToastProvider>
          <SiteChrome>{children}</SiteChrome>
        </ToastProvider>
      </body>
    </html>
  );
}
