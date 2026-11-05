"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Project } from "@/data/projects";
import { CUSTOM_EASE } from "@/lib/animations";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  index: number;
}

export default function ProjectCard({ project, onClick, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: CUSTOM_EASE }}
      onClick={onClick}
      className="group cursor-pointer flex flex-col bg-transparent select-none"
    >
      {/* ── 3:4 POSTER CONTAINER ── */}
      <div
        className="relative w-full aspect-[3/4] overflow-hidden border-2 border-[#151515] bg-[#1a1a1a] shadow-[4px_4px_0px_#151515] sm:shadow-[6px_6px_0px_#151515]"
      >
        {/* Poster Image */}
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* ── RESTING BADGE: Visible by default on all screens ── */}
        <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5 bg-[#151515]/90 border border-white/10 px-2 py-0.5 sm:px-2.5 sm:py-1 backdrop-blur-md shadow-md pointer-events-none group-hover:opacity-0 transition-opacity duration-200">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E44339] animate-pulse" />
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.14em] font-bold text-white uppercase">
            {project.views}
          </span>
        </div>

        {/* ── DESKTOP-ONLY HOVER OVERLAY (Hidden on mobile/touch to prevent accidental touch redirects) ── */}
        <div className="hidden lg:flex absolute inset-0 z-20 bg-[#151515]/94 backdrop-blur-md p-5 flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-250 pointer-events-none group-hover:pointer-events-auto">
          {/* Top Row */}
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="font-mono text-[9.5px] tracking-[0.2em] text-[#E44339] uppercase font-bold">
              [ {project.badge || "VERIFIED RESULT"} ]
            </span>
            <span className="font-mono text-[10px] tracking-[0.16em] text-[#777777]">
              NO. {project.number}
            </span>
          </div>

          {/* Center Results Section */}
          <div className="flex flex-col items-center justify-center text-center my-auto py-1">
            <span className="font-mono text-[10px] tracking-[0.24em] text-white/60 uppercase font-medium mb-0.5">
              AUDIENCE IMPACT
            </span>
            <div className="flex items-baseline justify-center gap-1">
              <span className="font-display font-black text-4xl lg:text-5xl text-[#E44339] tracking-[-0.03em] leading-none">
                {project.views}
              </span>
              <span className="font-mono text-[12px] font-bold text-white/90 tracking-wider">
                VIEWS
              </span>
            </div>

            {/* Recognition & Artist Mention (with custom orange clickable link) */}
            <div className="mt-2.5 px-2">
              {project.artistMention ? (
                <p className="font-body text-[13px] text-[#F2F0E9]/90 leading-snug">
                  {project.artistMention.prefix}
                  <a
                    href={project.artistMention.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[#FF7A00] font-bold underline decoration-[#FF7A00]/50 underline-offset-2 hover:text-[#FFA347] transition-colors"
                  >
                    {project.artistMention.name}
                  </a>
                  {project.artistMention.role && (
                    <span className="text-white/60 text-[11px] ml-1">
                      {project.artistMention.role}
                    </span>
                  )}
                </p>
              ) : (
                <p className="font-body text-[13px] text-[#F2F0E9]/85 leading-snug">
                  {project.resultText}
                </p>
              )}
            </div>
          </div>

          {/* Bottom Action Buttons */}
          <div className="flex items-center gap-2 pt-2 border-t border-white/10">
            {project.instagramUrl && (
              <a
                href={project.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 flex items-center justify-center gap-1.5 bg-[#E44339] hover:bg-white hover:text-[#151515] text-white font-display font-bold text-[11px] tracking-[0.12em] py-2 px-2.5 uppercase transition-colors shadow-md shrink-0"
              >
                <svg
                  className="w-3 h-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                VIEW ON INSTA ↗
              </a>
            )}

            <button
              onClick={onClick}
              className="p-2 bg-[#202020] hover:bg-white hover:text-[#151515] text-white/80 transition-colors border border-white/10 shrink-0"
              aria-label="Expand artwork details"
            >
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── CARD FOOTER: Meta ── */}
      <div className="pt-2 sm:pt-3 flex flex-col gap-0.5">
        <div className="flex items-baseline justify-between gap-1.5">
          <div className="flex items-baseline gap-1.5 sm:gap-2 min-w-0">
            <span className="font-mono text-[10px] sm:text-[11px] font-bold text-[#E44339] tracking-[0.14em] shrink-0">
              {project.number}
            </span>
            <h3 className="font-display font-bold text-[13px] sm:text-[15px] md:text-[17px] text-[#151515] leading-tight truncate group-hover:text-[#E44339] transition-colors duration-200">
              {project.title}
            </h3>
          </div>
          <span className="font-mono text-[9px] sm:text-[10px] text-[#777777] shrink-0 font-medium">
            {project.views}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
