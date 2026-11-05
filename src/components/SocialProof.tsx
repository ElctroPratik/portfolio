"use client";

import { motion } from "framer-motion";
import { collaborators } from "@/data/collaborations";
import { CUSTOM_EASE } from "@/lib/animations";

export default function SocialProof() {
  return (
    <section className="bg-[#F2F0E9] py-14 sm:py-20 border-b border-[#151515]/10 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16">
        
        {/* Section Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-14 border-b border-[#151515]/10 pb-6">
          <div>
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.24em] text-[#E44339] uppercase font-bold block mb-2">
              [ ARTIST NETWORK & REPUTATION ]
            </span>
            <h2
              className="font-display font-black leading-[0.88] tracking-[-0.03em] text-[#151515] uppercase"
              style={{ fontSize: "clamp(34px, 7vw, 76px)" }}
            >
              RECOGNIZED BY<span className="text-[#E44339]">.</span>
            </h2>
          </div>

          <p className="font-body text-[14px] sm:text-[15px] text-[#777777] max-w-md leading-relaxed">
            Direct artwork recognition, viral music edits and visual identities developed for independent hip-hop artists and cultural movements.
          </p>
        </div>

        {/* 6-Card Collaborator Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {collaborators.map((artist, idx) => (
            <motion.div
              key={artist.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: CUSTOM_EASE }}
              className="group relative bg-[#151515] text-[#F2F0E9] border-2 border-[#151515] p-5 sm:p-6 shadow-[5px_5px_0px_#151515] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
            >
              {/* Card Top: Number + Tag */}
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                  <span className="font-mono text-[10px] tracking-[0.16em] text-[#777777] font-semibold">
                    0{idx + 1}
                  </span>
                  <span className="font-mono text-[8.5px] sm:text-[9.5px] tracking-[0.18em] text-[#E44339] uppercase font-bold bg-[#E44339]/15 border border-[#E44339]/30 px-2 py-0.5">
                    {artist.tag}
                  </span>
                </div>

                {/* Artist Name & Role */}
                <h3 className="font-display font-bold text-[18px] sm:text-[20px] text-white tracking-[-0.01em] uppercase group-hover:text-[#E44339] transition-colors duration-200 mb-1">
                  {artist.name}
                </h3>
                <span className="font-mono text-[10px] tracking-[0.18em] text-[#777777] uppercase block mb-3 font-medium">
                  {artist.role}
                </span>

                {/* Highlight Detail */}
                <p className="font-body text-[12.5px] sm:text-[13px] text-[#F2F0E9]/75 leading-snug mb-5">
                  {artist.highlight}
                </p>
              </div>

              {/* Card Bottom: Instagram Link */}
              {artist.instagramUrl && (
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <a
                    href={artist.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.14em] text-white/70 hover:text-[#FF7A00] transition-colors uppercase font-semibold"
                  >
                    <svg
                      className="w-3.5 h-3.5"
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
                    PROFILE ↗
                  </a>

                  <span className="w-1.5 h-1.5 rounded-full bg-[#E44339] opacity-70 group-hover:scale-150 transition-transform" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
