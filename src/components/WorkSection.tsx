"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProfession } from "@/hooks/useProfession";
import { designProjects, Project } from "@/data/projects";
import { CUSTOM_EASE } from "@/lib/animations";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import ProfessionSwitcher from "./ProfessionSwitcher";

export default function WorkSection() {
  const { activeMode } = useProfession();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const isDesign = activeMode === "design";
  const sectionTitle = isDesign ? "POSTER DESIGN" : "COOKING SOMETHING";

  return (
    <section id="work" className="bg-[#F2F0E9] pt-12 md:pt-16 pb-20 md:pb-28">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16">

        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 sm:gap-6 mb-10 md:mb-16 border-b border-[#151515]/10 pb-6 md:pb-8">
          <div>
            <AnimatePresence mode="wait">
              <motion.h2
                key={sectionTitle}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: CUSTOM_EASE }}
                className="font-display font-black leading-[0.88] tracking-[-0.03em] text-[#151515] uppercase"
                style={{ fontSize: "clamp(36px,8.5vw,92px)" }}
              >
                {sectionTitle}
                <span className="text-[#E44339]">.</span>
              </motion.h2>
            </AnimatePresence>
          </div>

          {/* Synchronized compact switcher (full-width on mobile, auto on desktop) */}
          <div className="shrink-0 w-full sm:w-auto">
            <ProfessionSwitcher compact className="w-full sm:w-auto" fullWidth />
          </div>
        </div>

        {/* Content View: Poster Grid OR Cooking Something Teaser */}
        <AnimatePresence mode="wait">
          {isDesign ? (
            /* POSTER DESIGN GRID (All 6 Real Posters, Identical Aspect Ratio) */
            <motion.div
              key="poster-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5 md:gap-6 lg:gap-8"
            >
              {designProjects.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </motion.div>
          ) : (
            /* COOKING SOMETHING SHOWCASE (No video cards, pure editorial) */
            <motion.div
              key="cooking-something"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: CUSTOM_EASE }}
              className="bg-[#151515] text-[#F2F0E9] p-6 sm:p-10 md:p-14 lg:p-20 border-2 border-[#151515] shadow-2xl relative overflow-hidden"
            >
              {/* Background watermark */}
              <div className="absolute right-0 bottom-0 select-none pointer-events-none opacity-[0.03] overflow-hidden leading-none">
                <span className="font-display font-black text-[clamp(80px,18vw,260px)]">
                  EDIT
                </span>
              </div>

              <div className="max-w-2xl flex flex-col gap-5 sm:gap-6 relative z-10">
                <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.24em] text-[#E44339] uppercase font-bold">
                  [ IN THE TIMELINE ]
                </span>

                <h3
                  className="font-display font-black leading-[0.92] tracking-[-0.03em] uppercase text-white"
                  style={{ fontSize: "clamp(30px,6vw,68px)" }}
                >
                  NEW CUTS RENDERING.
                </h3>

                <p className="font-body text-[14px] sm:text-[16px] md:text-[18px] text-[#F2F0E9]/75 leading-relaxed">
                  The edit suite is actively fired up. Music videos, cinematic reels, and dynamic motion sequences are currently in post-production.
                </p>

                {/* Technical status strip */}
                <div className="pt-4 pb-2 border-t border-[#F2F0E9]/15 flex flex-wrap gap-y-2 gap-x-5 sm:gap-x-6">
                  <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.16em] text-[#777777]">
                    STATUS: ACTIVE POST-PRODUCTION
                  </span>
                  <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.16em] text-[#777777]">
                    LOCATION: MUMBAI, INDIA
                  </span>
                  <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.16em] text-[#777777]">
                    SUITE: PREMIERE PRO / AFTER EFFECTS
                  </span>
                </div>

                {/* Action button */}
                <div className="pt-2">
                  <a
                    href="#contact"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#E44339] text-white font-display font-bold text-[12px] sm:text-[13px] tracking-[0.12em] px-6 sm:px-8 py-3.5 sm:py-4 hover:bg-white hover:text-[#151515] transition-colors duration-300"
                  >
                    INQUIRE ABOUT VIDEO EDITING
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Project detail modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
