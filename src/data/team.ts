export interface TeamMember {
  id: string;
  name: string;
  role: string;
  credential: string;
  bio: string;
}

export const team: TeamMember[] = [
  {
    id: "captain-ahmet",
    name: "Captain Ahmet Yılmaz",
    role: "Founder & Senior Captain",
    credential: "TURSAB Licensed, 25+ years maritime experience",
    bio: "Founded Merry Tourism in 2001. Over 25 years navigating the Bosphorus, Captain Ahmet has personally guided more than 50,000 guests through Istanbul's waterways.",
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
