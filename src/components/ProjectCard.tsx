"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Project } from "@/data/projects";
import { CUSTOM_EASE } from "@/lib/animations";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  index: number;
}

const placeholderColors = [
  "#1c1c1c",
  "#1a1a2e",
  "#16213e",
  "#1b2838",
  "#222222",
  "#181818",
];

function isPlaceholder(src: string) {
  return !src || src.includes("placeholder-");
}

function PlaceholderThumb({ project, index }: { project: Project; index: number }) {
  const isVideo = project.mode === "video";
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-3 select-none"
      style={{ backgroundColor: placeholderColors[index % placeholderColors.length] }}
    >
      <span
        className="font-display font-black leading-none"
        style={{ fontSize: "clamp(36px,5vw,64px)", color: "rgba(242,240,233,0.14)" }}
      >
        {project.number}
      </span>
      <span
        className="font-mono text-[9px] tracking-[0.2em] uppercase text-center px-4"
        style={{ color: "rgba(242,240,233,0.3)" }}
      >
        {isVideo ? "VIDEO EDIT" : "POSTER DESIGN"}
      </span>
      <span
        className="font-mono text-[9px] tracking-[0.16em] text-center px-4"
        style={{ color: "rgba(228,67,57,0.6)" }}
      >
        [ ADD {isVideo ? "FOOTAGE" : "ARTWORK"} ]
      </span>
    </div>
  );
}

export default function ProjectCard({ project, onClick, index }: ProjectCardProps) {
  const isVideo = project.mode === "video";
  const showPlaceholder = isPlaceholder(project.thumbnail);

  // Consistent aspect ratio:
  // Posters: always 3/4
  // Videos: always 16/9
  const aspectClass = isVideo ? "aspect-[16/9]" : "aspect-[3/4]";

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: CUSTOM_EASE }}
      onClick={onClick}
      className="group cursor-pointer flex flex-col"
    >
      {/* Thumbnail wrapper */}
      <div
        className={`relative w-full overflow-hidden ${aspectClass} border border-[#151515]/10`}
        style={{ backgroundColor: "#1a1a1a" }}
      >
        {showPlaceholder ? (
          <PlaceholderThumb project={project} index={index} />
        ) : (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}

        {/* Video play icon overlay */}
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-13 h-13 rounded-full bg-[#E44339]/90 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-lg">
              <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
            </div>
          </div>
        )}

        {/* Hover dark overlay */}
        <div className="absolute inset-0 bg-[#151515]/0 group-hover:bg-[#151515]/25 transition-colors duration-300 pointer-events-none" />

        {/* View arrow icon */}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-6 h-6 sm:w-8 sm:h-8 bg-[#E44339] flex items-center justify-center opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
          <svg
            className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </div>
      </div>

      {/* Meta — clean number and title, category removed */}
      <div className="pt-2 sm:pt-3 flex flex-col gap-0.5">
        <div className="flex items-baseline justify-between gap-1.5">
          <div className="flex items-baseline gap-1.5 sm:gap-2.5 min-w-0">
            <span className="font-mono text-[10px] sm:text-[11px] font-bold text-[#E44339] tracking-[0.14em] shrink-0">
              {project.number}
            </span>
            <h3 className="font-display font-bold text-[13px] sm:text-[15px] md:text-[18px] text-[#151515] leading-tight truncate group-hover:text-[#E44339] transition-colors duration-200">
              {project.title}
            </h3>
          </div>
          <span className="font-mono text-[9px] sm:text-[10px] text-[#777777] shrink-0">{project.year}</span>
        </div>
      </div>
    </motion.article>
  );
}
