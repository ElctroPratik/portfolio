// src/data/videos.ts
// ============================================================
// VIDEO EDITING PROJECTS — Harmless Pratik
// ============================================================

export interface VideoProject {
  id: string;
  title: string;
  youtubeId: string;
  instagramUrl: string;
  views: string;
  tags: string[];
}

export const videoProjects: VideoProject[] = [
  {
    id: "v1",
    title: "Fast Paced Music Edit",
    youtubeId: "ofmbStG1TE8",
    instagramUrl: "https://www.instagram.com/p/DaMkrZLIm7d/",
    views: "35K",
    tags: ["FAST PACED"],
  },
  {
    id: "v2",
    title: "High Retention Content Edit",
    youtubeId: "IIVppjyI1uc",
    instagramUrl: "https://www.instagram.com/p/DZbtG5eI4an/",
    views: "25K",
    tags: ["HIGHLY ENGAGING"],
  },
  {
    id: "v3",
    title: "Cinematic Storytelling Cut",
    youtubeId: "jqz8DxnEWuU",
    instagramUrl: "https://www.instagram.com/reel/DcFYkGWocxF/",
    views: "6K",
    tags: ["STORYTELLING", "SLOW PACED"],
  },
  {
    id: "v4",
    title: "Talking Head Edit",
    youtubeId: "zQHJZBktBL8",
    instagramUrl: "https://www.instagram.com/reel/DcxVhiro_pr/",
    views: "3K",
    tags: ["TALKING HEAD"],
  },
  {
    id: "v5",
    title: "Filmmaking & Sound Design",
    youtubeId: "pWKjEwMTbO8",
    instagramUrl: "https://www.instagram.com/reel/DZtirvMIb9H/",
    views: "5K",
    tags: ["FILMMAKING", "SOUND DESIGN"],
  },
];
