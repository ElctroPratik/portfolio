"use client";

import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { useProfession } from "@/hooks/useProfession";
import { siteConfig } from "@/data/siteConfig";
import { CUSTOM_EASE } from "@/lib/animations";
import ProfessionSwitcher from "./ProfessionSwitcher";

export default function Hero() {
  const { activeMode } = useProfession();
  const prefersReduced = useReducedMotion();
  const profData = siteConfig.professions[activeMode];

  const textVariant: Variants = prefersReduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.15 } } }
    : {
        hidden: { opacity: 0, y: 14 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: CUSTOM_EASE } },
      };

  return (
    <section
      id="about"
      className="bg-[#F2F0E9] pt-[54px] md:pt-[72px] overflow-hidden"
    >
      {/* ── MOBILE HERO (< lg): Perfectly leveled 2-column editorial composition ── */}
      <div className="lg:hidden relative flex flex-col justify-start w-full max-w-[640px] mx-auto px-5 pt-3 pb-8 sm:px-8 overflow-hidden">
        
        {/* Top: Category Label & Full-Width Switcher */}
        <div className="flex flex-col gap-1.5 relative z-20 mb-3 sm:mb-4 w-full">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-[#777777] uppercase"
          >
            INDEPENDENT CREATIVE PORTFOLIO / {siteConfig.year}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.35 }}
            className="w-full"
          >
            <ProfessionSwitcher compact fullWidth />
          </motion.div>
        </div>

        {/* Leveled Main Row: Left Portrait Column + Right Text Column */}
        <div className="relative grid grid-cols-[48fr_52fr] sm:grid-cols-[50fr_50fr] gap-2.5 sm:gap-4 items-stretch">
          
          {/* Left Column: Portrait with red graphic scaled & leveled to heading */}
          <div className="relative z-10 flex items-end justify-start h-full">
            {/* Orange/Red shape scaled to 100% of heading height on left */}
            <div
              className="absolute top-0 bottom-0 left-0 w-[94%] bg-[#E44339]"
              style={{ clipPath: "polygon(0% 0%, 82% 0%, 100% 100%, 0% 100%)" }}
            />

            {/* Ghost text */}
            <div className="absolute bottom-1 left-1 z-0 select-none pointer-events-none overflow-hidden">
              <span
                className="font-display font-black text-[#151515] leading-none tracking-[-0.04em] whitespace-nowrap text-[48px] sm:text-[68px] opacity-[0.05]"
              >
                PRATIK
              </span>
            </div>

            {/* Portrait cutout image scaled to level with the heading */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: CUSTOM_EASE }}
              className="relative z-10 h-full w-full flex items-end justify-start"
            >
              <Image
                src={siteConfig.portrait}
                alt="Harmless Pratik — creative professional"
                width={420}
                height={600}
                priority
                className="h-full max-h-[360px] sm:max-h-[420px] w-auto object-contain object-bottom scale-105 origin-bottom-left"
                style={{ filter: "drop-shadow(0 15px 30px rgba(0,0,0,0.22))" }}
              />
            </motion.div>
          </div>

          {/* Right Column: Vertically centered headline, intro, CTA & metadata */}
          <div className="relative z-20 flex flex-col justify-center h-full gap-2.5 sm:gap-3 pl-1 sm:pl-2">
            
            {/* Headline */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: CUSTOM_EASE, delay: 0.15 }}
                className="font-display font-black leading-[0.88] tracking-[-0.03em] text-[#151515] uppercase text-[38px] sm:text-[50px]"
              >
                WANT TO
                <br />
                GROW<span className="text-[#E44339]">?</span>
              </motion.h1>
            </div>

            {/* Name + Intro — tight, little gap under GROW? */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25, ease: CUSTOM_EASE }}
              className="flex flex-col gap-0.5 mt-0.5 sm:mt-1"
            >
              <p className="font-body text-[11.5px] sm:text-[13px] text-[#777777] font-medium">
                Hi, I am Harmless Pratik.
              </p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeMode + "-m-intro"}
                  variants={textVariant}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
                  className="font-body text-[11.5px] sm:text-[13px] text-[#151515] leading-snug line-clamp-3"
                >
                  {profData.intro}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="pt-1.5 sm:pt-2"
            >
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#E44339] text-white font-display font-bold text-[10.5px] sm:text-[12px] tracking-[0.1em] px-3.5 py-2 sm:px-4 sm:py-2.5 hover:bg-[#151515] transition-colors shadow-md"
              >
                HIRE ME
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </motion.div>

            {/* Metadata */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              className="flex flex-col gap-0.5 pt-1"
            >
              <span className="font-mono text-[7.5px] sm:text-[9px] tracking-[0.14em] text-[#777777]">
                [{siteConfig.location}]
              </span>
              <span className="font-mono text-[7.5px] sm:text-[9px] tracking-[0.14em] text-[#777777]">
                [{siteConfig.openTo}]
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── DESKTOP HERO (lg and up): 2-Column Editorial Grid (Locked) ── */}
      <div className="hidden lg:grid w-full max-w-[1440px] mx-auto px-10 lg:px-16 grid-cols-[46fr_54fr] gap-12 items-center min-h-[calc(100vh-72px)]">

        {/* ── LEFT COLUMN: CREATOR PORTRAIT ── */}
        <div className="relative flex justify-start items-end h-[calc(100vh-72px)] max-h-[860px]">

          {/* Red graphic shape behind portrait */}
          <div
            className="absolute bottom-0 left-0 w-[82%] sm:w-[78%] h-[78%] sm:h-[76%] bg-[#E44339]"
            style={{ clipPath: "polygon(0% 0%, 82% 0%, 100% 100%, 0% 100%)" }}
          />

          {/* Large ghost text */}
          <div className="absolute bottom-4 sm:bottom-6 left-0 z-0 select-none pointer-events-none overflow-hidden">
            <span
              className="font-display font-black text-[#151515] leading-none tracking-[-0.04em] whitespace-nowrap text-[120px] xl:text-[150px] opacity-[0.05]"
            >
              PRATIK
            </span>
          </div>

          {/* Portrait image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.2, ease: CUSTOM_EASE }}
            className="relative z-10 h-full w-auto flex items-end"
          >
            <Image
              src={siteConfig.portrait}
              alt="Harmless Pratik — creative professional"
              width={480}
              height={680}
              priority
              className="h-full w-auto object-contain object-bottom"
              style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.22))" }}
            />
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN: TEXT CONTENT & PROFESSION SWITCHER ── */}
        <div className="relative flex flex-col justify-center gap-6 lg:gap-7 pl-4">

          {/* Top row: Label + Profession Switcher */}
          <div className="flex items-center justify-between gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="font-mono text-[11px] tracking-[0.22em] text-[#777777] uppercase"
            >
              INDEPENDENT CREATIVE PORTFOLIO / {siteConfig.year}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
            >
              <ProfessionSwitcher />
            </motion.div>
          </div>

          {/* Hero heading */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, ease: CUSTOM_EASE, delay: 0.15 }}
              className="font-display font-black leading-[0.88] tracking-[-0.03em] text-[#151515] uppercase text-[100px] xl:text-[118px]"
            >
              WANT TO
              <br />
              GROW<span className="text-[#E44339]">?</span>
            </motion.h1>
          </div>

          {/* Name + intro */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: CUSTOM_EASE }}
            className="flex flex-col gap-2"
          >
            <p className="font-body text-[15px] text-[#777777] font-medium">
              Hi, I am Harmless Pratik.
            </p>
            <AnimatePresence mode="wait">
              <motion.p
                key={activeMode + "-desktop-intro"}
                variants={textVariant}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -10, transition: { duration: 0.18 } }}
                className="font-body text-[17px] text-[#151515] leading-relaxed max-w-lg"
              >
                {profData.intro}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
          >
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-[#E44339] text-white font-display font-bold text-[14px] tracking-[0.12em] px-7 py-3.5 hover:bg-[#151515] transition-colors duration-300 shadow-md"
            >
              HIRE ME
              <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </motion.div>

          {/* Metadata */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex flex-col gap-1 pt-1"
          >
            <span className="font-mono text-[10px] tracking-[0.18em] text-[#777777]">
              [{siteConfig.location}]
            </span>
            <span className="font-mono text-[10px] tracking-[0.18em] text-[#777777]">
              [{siteConfig.openTo}]
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
