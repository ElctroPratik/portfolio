"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { Project } from "@/data/projects";
import { CUSTOM_EASE } from "@/lib/animations";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-[#151515]/90 z-[100] backdrop-blur-sm cursor-pointer"
            onClick={onClose}
          />

          {/* Modal Container — 100% contained without scroll on desktop; smooth vertical scroll on mobile */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.28, ease: CUSTOM_EASE }}
            className="fixed inset-2 sm:inset-4 md:inset-6 lg:inset-8 z-[101] bg-[#F2F0E9] flex flex-col border-2 border-[#151515] overflow-y-auto lg:overflow-hidden shadow-2xl max-h-[96vh] my-auto"
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
          >
            {/* Modal header — compact and sticky */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#151515]/10 shrink-0 bg-[#F2F0E9] sticky top-0 z-20">
              <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
                <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#E44339]">
                  NO. {project.number} — {project.year}
                </span>
                <span className="text-[#151515]/30 hidden sm:inline">/</span>
                <h2 className="font-display font-black text-[16px] sm:text-[18px] md:text-[22px] text-[#151515] leading-none">
                  {project.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close project"
                className="w-9 h-9 flex items-center justify-center border-2 border-[#151515] hover:bg-[#151515] hover:text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E44339] shrink-0"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content area */}
            <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1fr_360px] p-4 sm:p-5 md:p-6 gap-6 items-stretch overflow-visible lg:overflow-hidden">
              {/* Left: Full poster image view */}
              <div className="relative flex items-center justify-center bg-[#151515] p-3 sm:p-4 border border-[#151515]/15 h-[380px] sm:h-[480px] lg:h-full min-h-0 w-full overflow-hidden shrink-0">
                <div className="relative h-full w-full flex items-center justify-center">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-contain drop-shadow-2xl"
                    sizes="(max-width: 1024px) 100vw, 70vw"
                    priority
                  />
                </div>
              </div>

              {/* Right: Info sidebar */}
              <div className="flex flex-col justify-between h-full min-h-0 lg:overflow-y-auto pr-0 lg:pr-1 gap-5">
                <div className="flex flex-col gap-4 sm:gap-5">
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-[#777777] block mb-1.5 uppercase font-medium">
                      About this artwork
                    </span>
                    <p className="font-body text-[14px] sm:text-[15px] text-[#151515] leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="border-t border-[#151515]/10 pt-3.5 flex flex-col gap-2">
                    <div className="flex justify-between items-center text-[12px]">
                      <span className="font-mono text-[10px] tracking-[0.14em] text-[#777777]">DISCIPLINE</span>
                      <span className="font-mono text-[11px] font-semibold text-[#151515]">Poster Design</span>
                    </div>
                    <div className="flex justify-between items-center text-[12px]">
                      <span className="font-mono text-[10px] tracking-[0.14em] text-[#777777]">YEAR</span>
                      <span className="font-mono text-[11px] font-semibold text-[#151515]">{project.year}</span>
                    </div>
                    {project.credits && (
                      <div className="flex justify-between items-start text-[12px] gap-3">
                        <span className="font-mono text-[10px] tracking-[0.14em] text-[#777777] shrink-0">CREDITS</span>
                        <span className="font-mono text-[11px] font-semibold text-[#151515] text-right">
                          {project.credits}
                        </span>
                      </div>
                    )}
                    {project.medium && (
                      <div className="flex justify-between items-start text-[12px] gap-3">
                        <span className="font-mono text-[10px] tracking-[0.14em] text-[#777777] shrink-0">FORMAT</span>
                        <span className="font-mono text-[11px] font-semibold text-[#151515] text-right">
                          {project.medium}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#151515]/10 mt-2 lg:mt-0">
                  <a
                    href="#contact"
                    onClick={onClose}
                    className="w-full inline-flex items-center justify-center gap-3 bg-[#E44339] text-white font-display font-bold text-[12px] sm:text-[13px] tracking-[0.12em] px-6 py-3.5 hover:bg-[#151515] transition-colors duration-300 shadow-md"
                  >
                    COMMISSION A POSTER
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
