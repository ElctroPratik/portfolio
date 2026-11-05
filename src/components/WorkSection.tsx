"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProfession } from "@/hooks/useProfession";
import { designProjects, Project } from "@/data/projects";
import { videoProjects } from "@/data/videos";
import VideoCard from "./VideoCard";
import { CUSTOM_EASE } from "@/lib/animations";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import ProfessionSwitcher from "./ProfessionSwitcher";

export default function WorkSection() {
  const { activeMode } = useProfession();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const isDesign = activeMode === "design";
  const sectionTitle = isDesign ? "POSTER DESIGN" : "VIDEO EDITING";

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
            /* VIDEO EDITING GRID — 1 col mobile, 2 col desktop */
            <motion.div
              key="video-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10"
            >
              {videoProjects.map((video, i) => (
                <VideoCard key={video.id} video={video} index={i} />
              ))}
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
