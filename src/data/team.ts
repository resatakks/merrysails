export interface TeamMember {
  id: string;
  name: string;
  role: string;
  credential: string;
  bio: string;
}

export const team: TeamMember[] = [
  {
    id: "meryem-yildiz",
    name: "Meryem Yıldız",
    role: "TÜRSAB Licensed Tour Operator & Founder",
    credential: "TÜRSAB A-Group License #14316, holder for MerrySails + GoldenSunsetTour + MerryTourism",
    bio: "TÜRSAB A-Group licensed tour operator and the founder behind the parent travel agency that operates MerrySails (Bosphorus cruises & yacht charters), GoldenSunsetTour (sunset & dinner cruises) and MerryTourism (Istanbul airport transfers and multi-vertical tourism). All three brands share the same TÜRSAB licensee since 2001.",
  },
  {
    id: "captain-ahmet",
    name: "Captain Ahmet Yıldız",
    role: "Senior Captain",
    credential: "Turkish Maritime Authority master license, 25+ years Bosphorus experience",
    bio: "Senior captain at MerrySails. Over 25 years navigating the Bosphorus, Captain Ahmet Yıldız has personally guided more than 50,000 guests through Istanbul's waterways under a Turkish Maritime Authority master license.",
  },
  {
    id: "editorial",
    name: "MerrySails Editorial Team",
    role: "Local Istanbul Travel Experts",
    credential: "10+ years Bosphorus cruise operations",
    bio: "Written by local Istanbul maritime experts with 10+ years of experience operating Bosphorus cruises and yacht charters. Our team lives and breathes Istanbul's waterways.",
  },
];

export function getAuthor(id: string): TeamMember | undefined {
  return team.find((m) => m.id === id);
}
