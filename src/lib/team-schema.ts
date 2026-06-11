const SITE_URL = "https://merrysails.com";

export interface TeamMemberProfile {
  slug: string;
  name: string;
  givenName: string;
  familyName: string;
  jobTitle: string;
  bio: string;
  image: string;
  knowsAbout: string[];
  schemaId: string;
}

export const TEAM_MEMBERS: TeamMemberProfile[] = [
  {
    slug: "captain-ahmet",
    name: "Captain Ahmet Yıldız",
    givenName: "Ahmet",
    familyName: "Yıldız",
    jobTitle: "Senior Captain & Bosphorus Routes Lead",
    bio: "22+ years navigating the Bosphorus under a Turkish Maritime Authority master license, Captain Ahmet has piloted Bosphorus, Marmara, and Aegean cruises. He designs every route MerrySails operates and speaks Turkish, English, and basic German.",
    image: "/team/captain-ahmet.jpg",
    knowsAbout: [
      "Bosphorus navigation",
      "Istanbul harbor pilotage",
      "Maritime safety",
      "Turkish coastal routes",
      "Bosphorus history",
      "Ottoman waterfront architecture",
      "Istanbul maritime law",
      "Sea of Marmara seamanship",
      "Yacht charter operations",
      "Golden Horn navigation",
      "Bosphorus current patterns",
      "TURSAB tourism regulation",
      "Dolmabahce Palace shoreline",
      "Rumeli Hisari historic fortress",
      "Bosphorus Bridge crossing protocol",
    ],
    schemaId: `${SITE_URL}/#person-captain-ahmet`,
  },
  {
    slug: "resat-akkus",
    name: "Resat Akkus",
    givenName: "Resat",
    familyName: "Akkus",
    jobTitle: "Founder & Operations Director",
    bio: "TURSAB A-Group licensed operator since 2001, Resat built MerrySails alongside sister brands GoldenSunsetTour and MerryTourism. The portfolio has now served 50,000+ guests and remains the only direct-book boutique Bosphorus operator in Istanbul.",
    image: "/team/resat-akkus.jpg",
    knowsAbout: [
      "Tour operations",
      "Turkish tourism licensing",
      "Bosphorus cruise pricing",
      "Travel agency management",
    ],
    schemaId: `${SITE_URL}/#person-resat`,
  },
  {
    slug: "kayra-sevli",
    name: "Kayra Sevli",
    givenName: "Kayra",
    familyName: "Sevli",
    jobTitle: "Guest Experience Lead",
    bio: "Kayra manages reservations, hotel pickup logistics, and guest support across 5 languages (EN, TR, DE, FR, NL). Every confirmation email and voucher that reaches a MerrySails guest passes through her hands.",
    image: "/team/kayra-sevli.jpg",
    knowsAbout: [
      "Tour booking workflows",
      "Hotel pickup logistics",
      "Multi-language guest support",
    ],
    schemaId: `${SITE_URL}/#person-kayra`,
  },
];

export function getTeamMember(slug: string): TeamMemberProfile | undefined {
  return TEAM_MEMBERS.find((m) => m.slug === slug);
}

export const teamPersonSchemas = TEAM_MEMBERS.map((m) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": m.schemaId,
  name: m.name,
  givenName: m.givenName,
  familyName: m.familyName,
  jobTitle: m.jobTitle,
  description: m.bio,
  worksFor: { "@id": `${SITE_URL}/#organization` },
  knowsAbout: m.knowsAbout,
  image: `${SITE_URL}${m.image}`,
  url: `${SITE_URL}/about/team`,
  ...(m.slug === "resat-akkus"
    ? {
        hasOccupation: {
          "@type": "Occupation",
          name: "Founder & Operations Director",
          occupationLocation: { "@type": "City", name: "Istanbul" },
          skills: [
            "Tour operations",
            "Turkish tourism licensing",
            "Bosphorus cruise pricing",
            "Travel agency management",
          ],
        },
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "TURSAB A Group License",
          identifier: "14316",
          recognizedBy: {
            "@type": "Organization",
            name: "TURSAB -- Association of Turkish Travel Agencies",
            url: "https://www.tursab.org.tr",
          },
        },
      }
    : {}),
  ...(m.slug === "captain-ahmet"
    ? {
        hasOccupation: {
          "@type": "Occupation",
          name: "Senior Bosphorus Captain",
          occupationLocation: { "@type": "City", name: "Istanbul" },
          experienceRequirements: "22+ years piloting passenger vessels on the Bosphorus, Sea of Marmara, and Turkish Aegean coast.",
          skills: [
            "Bosphorus navigation",
            "Passenger-vessel command",
            "Maritime safety drills",
            "Bosphorus current and weather assessment",
            "Multi-language guest briefings (TR/EN/DE)",
          ],
          qualifications: "Turkish Maritime Authority master license",
        },
        hasCredential: [
          {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "Turkish Maritime Authority Master Captain License",
            recognizedBy: {
              "@type": "GovernmentOrganization",
              name: "Turkish Maritime Authority (Denizcilik Genel Müdürlüğü)",
              url: "https://denizcilik.uab.gov.tr",
            },
          },
          {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "STCW Basic Safety Training",
            recognizedBy: {
              "@type": "Organization",
              name: "International Maritime Organization",
              url: "https://www.imo.org",
            },
          },
        ],
      }
    : {}),
}));
