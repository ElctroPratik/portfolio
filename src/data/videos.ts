// src/data/videos.ts
// ============================================================
// VIDEO EDITING PROJECTS — Harmless Pratik
// ============================================================

export interface VideoProject {
  id: string;
  number: string;
  title: string;
  publicId: string;
  videoUrl: string;
  thumbnailUrl: string;
  instagramUrl: string;
  views: string;
  rawViews: string;
  tags: string[];
  description: string;
}

const CLOUD_NAME = "cf9isa65";

export const videoProjects: VideoProject[] = [
  {
    id: "v1",
    number: "01",
    title: "Fast Paced Music Edit",
    publicId: "FastEdit_2",
    videoUrl: `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/FastEdit_2.mp4`,
    thumbnailUrl: `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/so_1/FastEdit_2.jpg`,
    instagramUrl: "https://www.instagram.com/p/DaMkrZLIm7d/",
    views: "~35K",
    rawViews: "35,000+",
    tags: ["FAST PACED", "HIGH RETENTION"],
    description: "Rapid-fire visual cuts, kinetic typography and bass-synced motion transitions.",
  },
  {
    id: "v2",
    number: "02",
    title: "High Engagement Reel Edit",
    publicId: "Whitehandedit",
    videoUrl: `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/Whitehandedit.mp4`,
    thumbnailUrl: `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/so_1/Whitehandedit.jpg`,
    instagramUrl: "https://www.instagram.com/p/DZbtG5eI4an/",
    views: "~25K",
    rawViews: "25,000+",
    tags: ["HIGHLY ENGAGING", "DYNAMIC"],
    description: "Attention-hook editing designed for peak watch time and viral social distribution.",
  },
  {
    id: "v3",
    number: "03",
    title: "Cinematic Narrative Cut",
    publicId: "10000612_1",
    videoUrl: `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/10000612_1.mp4`,
    thumbnailUrl: `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/so_1/10000612_1.jpg`,
    instagramUrl: "https://www.instagram.com/reel/DcFYkGWocxF/",
    views: "~6K",
    rawViews: "6,000+",
    tags: ["STORYTELLING", "SLOW PACED"],
    description: "Atmospheric pacing, rich color grading and character-driven visual storytelling.",
  },
  {
    id: "v4",
    number: "04",
    title: "Talking Head Sound Design",
    publicId: "Readyforsounddesignweek01_1_2",
    videoUrl: `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/Readyforsounddesignweek01_1_2.mp4`,
    thumbnailUrl: `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/so_1/Readyforsounddesignweek01_1_2.jpg`,
    instagramUrl: "https://www.instagram.com/reel/DcxVhiro_pr/",
    views: "~3K",
    rawViews: "3,000+",
    tags: ["TALKING HEAD", "EDUCATIONAL"],
    description: "Tight vocal pacing, punch-in framing, B-roll overlays and contextual sound effects.",
  },
  {
    id: "v5",
    number: "05",
    title: "Filmmaking & Sound Design",
    publicId: "Murdertruth",
    videoUrl: `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/Murdertruth.mp4`,
    thumbnailUrl: `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/so_1/Murdertruth.jpg`,
    instagramUrl: "https://www.instagram.com/reel/DZtirvMIb9H/",
    views: "~5K",
    rawViews: "5,000+",
    tags: ["FILMMAKING", "SOUND DESIGN"],
    description: "Multi-layered Foley soundscapes, cinematic tension building and visual rhythm.",
  },
];
