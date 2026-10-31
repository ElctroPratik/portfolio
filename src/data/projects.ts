// src/data/projects.ts
// ============================================================
// REAL POSTER ARTWORKS — Designed by Harmless Pratik
// ============================================================

export type ProjectMode = "design" | "video";

export interface Project {
  id: string;
  mode: ProjectMode;
  number: string;
  title: string;
  year: string;
  thumbnail: string;
  description: string;
  credits?: string;
  medium?: string;
}

export const designProjects: Project[] = [
  {
    id: "p1",
    mode: "design",
    number: "01",
    title: "Akshat Jakhar",
    year: "2026",
    thumbnail: "/images/design/poster-akshat-jakhar.jpg",
    description:
      "Visual identity and cover artwork for Rajasthani hip-hop artist Akshat Jakhar. Designed around high-impact custom jagged typography, vivid crimson backdrop, and direct-flash editorial photography with cuban link details.",
    credits: "Akshat Jakhar / Rajasthani Hip Hop",
    medium: "Editorial Poster / Single Artwork",
  },
  {
    id: "p2",
    mode: "design",
    number: "02",
    title: "Naam Sujal — Live in Pune",
    year: "2026",
    thumbnail: "/images/design/poster-naam-sujal.jpg",
    description:
      "Official concert tour poster for Naam Sujal live at Epitome The Mills, Pune. Collaborative visual identity for Nagpur Moshpit Corporation (NMC) x Harmless Pratik, ticketing via District by Zomato and Noise FM partnership.",
    credits: "Nagpur Moshpit Corporation x Naam Sujal",
    medium: "Live Tour Poster / Event Branding",
  },
  {
    id: "p3",
    mode: "design",
    number: "03",
    title: "Parv — Moradabad Agyakaari",
    year: "2026",
    thumbnail: "/images/design/poster-parv.jpg",
    description:
      "Editorial vintage grunge poster artwork for artist Parv highlighting Moradabad roots and Agyakaari narrative. Built with distressed paper textures, Devanagari and Latin hybrid typography, and retro telecommunications imagery.",
    credits: "Parv / Moradabad",
    medium: "Artist Showcase / Editorial Poster",
  },
  {
    id: "p4",
    mode: "design",
    number: "04",
    title: "Whysokai — Terrible Time To Meet Me",
    year: "2025",
    thumbnail: "/images/design/poster-whysokai.jpg",
    description:
      "Official single and tour artwork for Whysokai's 'Terrible Time To Meet Me'. Merges gritty halftone texture screening with dynamic kinetic white vector flow-lines and warm stage performance lighting.",
    credits: "Whysokai",
    medium: "Single Artwork / Tour Poster",
  },
  {
    id: "p5",
    mode: "design",
    number: "05",
    title: "Daksh aka Dhadkan — MTV Hustle",
    year: "2026",
    thumbnail: "/images/design/poster-daksh-dhadkan.jpg",
    description:
      "Tribute and victory poster for Daksh aka Dhadkan, winner of MTV Hustle. Incorporates iconic Hindi punchlines, retro starbursts, newsprint halftone screening, and rhythmic 'WE ARE THE CULTURE' typography.",
    credits: "Daksh aka Dhadkan / MTV Hustle",
    medium: "Official Cultural Tribute Poster",
  },
  {
    id: "p6",
    mode: "design",
    number: "06",
    title: "Sirohi — I Am That Kid",
    year: "2026",
    thumbnail: "/images/design/poster-sirohi.jpg",
    description:
      "Official artwork for Sirohi's 'I Am That Kid'. Features custom geometric Devanagari lettering, deep royal maroon floral paisley background, golden halo lighting, and rich embroidered fashion styling.",
    credits: "Sirohi / I Am That Kid",
    medium: "Official Single Artwork / Artist Poster",
  },
];

// In video mode, user requested to show a dedicated "COOKING SOMETHING" showcase rather than video cards
export const videoProjects: Project[] = [];

export const allProjects = [...designProjects];
