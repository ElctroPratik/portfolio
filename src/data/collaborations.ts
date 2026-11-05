// src/data/collaborations.ts
// ============================================================
// VERIFIED ARTIST RECOGNITIONS — Harmless Pratik
// ============================================================

export interface Collaborator {
  name: string;
  role: string;
  tag: string;
  highlight: string;
  instagramUrl: string;
}

export const collaborators: Collaborator[] = [
  {
    name: "AKSHAT JAKHAR",
    role: "Hip Hop Artist",
    tag: "ARTIST RECOGNITION",
    highlight: "Direct artwork recognition for Rajasthani hip-hop visual identity and cover design.",
    instagramUrl: "https://www.instagram.com/akshatjakhar/",
  },
  {
    name: "PARV (PARVMUSIC)",
    role: "Independent Rapper",
    tag: "80K+ VIEWS & RECOGNITION",
    highlight: "Viral Moradabad Agyakaari tribute poster generating over 80,000 organic views.",
    instagramUrl: "https://www.instagram.com/itsparvman/",
  },
  {
    name: "DHADKAN (DAKSH)",
    role: "MTV Hustle",
    tag: "MTV HUSTLE RECOGNITION",
    highlight: "Direct recognition and tribute artwork for MTV Hustle performer Daksh aka Dhadkan.",
    instagramUrl: "https://www.instagram.com/daksh.aka.dhadkan/",
  },
];
