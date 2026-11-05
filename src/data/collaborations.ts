// src/data/collaborations.ts
// ============================================================
// ARTISTS & CLIENT RECOGNITIONS — Harmless Pratik
// ============================================================

export interface Collaborator {
  name: string;
  role: string;
  tag: string;
  highlight: string;
  instagramUrl?: string;
}

export const collaborators: Collaborator[] = [
  {
    name: "AKSHAT JAKHAR",
    role: "Hip Hop Artist",
    tag: "ARTIST RECOGNITION",
    highlight: "Direct artwork recognition for Rajasthani hip-hop visual identity",
    instagramUrl: "https://www.instagram.com/akshatjakhar/",
  },
  {
    name: "PARV (PARVMUSIC)",
    role: "Independent Rapper",
    tag: "80K+ VIEWS & RECOGNITION",
    highlight: "Viral Moradabad Agyakaari poster & visual identity",
    instagramUrl: "https://www.instagram.com/itsparvman/",
  },
  {
    name: "DHADKAN (DAKSH)",
    role: "MTV Hustle",
    tag: "MTV HUSTLE RECOGNITION",
    highlight: "Official recognition from MTV Hustle performer",
    instagramUrl: "https://www.instagram.com/daksh.aka.dhadkan/",
  },
  {
    name: "NAAM SUJAL",
    role: "Live Concert Tour",
    tag: "TOUR VISUAL IDENTITY",
    highlight: "Pune live concert tour poster in partnership with NMC",
    instagramUrl: "https://www.instagram.com/p/Dep86-uIB_a/",
  },
  {
    name: "WHYSOKAI",
    role: "Recording Artist",
    tag: "SINGLE RELEASE",
    highlight: "Terrible Time To Meet Me release artwork exploration",
    instagramUrl: "https://www.instagram.com/p/DeHeI2jIAv8/",
  },
  {
    name: "SIROHI",
    role: "Hip Hop Creator",
    tag: "COVER ARTWORK",
    highlight: "I Am That Kid single cover concept design",
    instagramUrl: "https://www.instagram.com/p/DeQUEU_oYFt/",
  },
];
