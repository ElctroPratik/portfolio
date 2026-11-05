// src/data/projects.ts
// ============================================================
// REAL POSTER ARTWORKS — Designed by Harmless Pratik
// ============================================================

export type ProjectMode = "design" | "video";

export interface ArtistMention {
  prefix: string;
  name: string;
  role?: string;
  url: string;
}

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
  views: string;
  instagramUrl: string;
  badge?: string;
  resultText?: string;
  artistMention?: ArtistMention;
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
    views: "~2.5K",
    instagramUrl: "https://www.instagram.com/p/DeNa8sEoev0/",
    badge: "ARTIST RECOGNITION",
    artistMention: {
      prefix: "Got recognition from ",
      name: "Akshat",
      role: "(rapper)",
      url: "https://www.instagram.com/akshatjakhar/",
    },
  },
  {
    id: "p2",
    mode: "design",
    number: "02",
    title: "Naam Sujal — Live in Pune",
    year: "2026",
    thumbnail: "/images/design/poster-naam-sujal.jpg",
    description:
      "Live concert tour concept poster for Naam Sujal live at Epitome The Mills, Pune. Collaborative visual identity exploration for Nagpur Moshpit Corporation (NMC) x Harmless Pratik, ticketing via District by Zomato and Noise FM.",
    credits: "Naam Sujal / Concert Concept",
    medium: "Live Tour Concept Poster",
    views: "~1K",
    instagramUrl: "https://www.instagram.com/p/Dep86-uIB_a/",
    badge: "TOUR CONCEPT",
    resultText: "Live concert tour concept poster & venue branding",
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
    views: "~80K",
    instagramUrl: "https://www.instagram.com/p/DeHfBmFI1KK/",
    badge: "VIRAL REACH",
    artistMention: {
      prefix: "Around 80K views & recognition from ",
      name: "Parv",
      role: "(rapper)",
      url: "https://www.instagram.com/itsparvman/",
    },
  },
  {
    id: "p4",
    mode: "design",
    number: "04",
    title: "Whysokai — Terrible Time To Meet Me",
    year: "2025",
    thumbnail: "/images/design/poster-whysokai.jpg",
    description:
      "Single release and tour concept poster for Whysokai's 'Terrible Time To Meet Me'. Merges gritty halftone texture screening with dynamic kinetic white vector flow-lines and warm stage performance lighting.",
    credits: "Whysokai / Concept Design",
    medium: "Single Artwork / Concept Poster",
    views: "~2K",
    instagramUrl: "https://www.instagram.com/p/DeHeI2jIAv8/",
    badge: "CONCEPT ARTWORK",
    resultText: "Single release concept artwork & tour promo",
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
    medium: "Cultural Tribute Poster",
    views: "~10K",
    instagramUrl: "https://www.instagram.com/p/DeVXd2-Iuwv/",
    badge: "MTV HUSTLE",
    artistMention: {
      prefix: "Got recognition from ",
      name: "Dhadkan",
      role: "(rapper)",
      url: "https://www.instagram.com/daksh.aka.dhadkan/",
    },
  },
  {
    id: "p6",
    mode: "design",
    number: "06",
    title: "Sirohi — I Am That Kid",
    year: "2026",
    thumbnail: "/images/design/poster-sirohi.jpg",
    description:
      "Single concept artwork for Sirohi's 'I Am That Kid'. Features custom geometric Devanagari lettering, deep royal maroon floral paisley background, golden halo lighting, and rich embroidered fashion styling.",
    credits: "Sirohi / Concept Design",
    medium: "Single Artwork Concept / Artist Poster",
    views: "~2K",
    instagramUrl: "https://www.instagram.com/p/DeQUEU_oYFt/",
    badge: "COVER CONCEPT",
    resultText: "Single release cover concept & typography study",
  },
];

export const videoProjects: Project[] = [];
export const allProjects = [...designProjects];
