"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Smooth editorial deceleration curve
const SMOOTH_CURVE = [0.16, 1, 0.3, 1] as const;

export default function LogoAnimation() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="/"
      className="group relative inline-flex items-center cursor-pointer py-1 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E44339] rounded-sm"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onClick={(e) => {
        if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
          e.preventDefault();
          setHovered((v) => !v);
        }
      }}
      aria-label="HARMLESS.PRATIK — He can do anything"
    >
      {/* The letter H remains stationary on the left */}
      <span className="font-display font-black text-[15px] md:text-[17px] tracking-[0.06em] text-[#151515] leading-normal shrink-0">
        H
      </span>

      {/* Suffix container with synchronized smooth layout width transition */}
      <motion.span
        layout
        transition={{ duration: 0.45, ease: SMOOTH_CURVE }}
        className="relative inline-grid grid-cols-1 grid-rows-1 overflow-hidden h-[2.2em] items-center ml-[0.5px]"
      >
        {/* State A: "ARMLESS.PRATIK" */}
        <motion.span
          initial={false}
          animate={
            hovered
              ? { y: "-120%", opacity: 0 }
              : { y: "0%", opacity: 1 }
          }
          transition={{
            duration: 0.45,
            ease: SMOOTH_CURVE,
          }}
          className="col-start-1 row-start-1 inline-flex items-center font-display font-black text-[15px] md:text-[17px] tracking-[0.06em] text-[#151515] whitespace-nowrap leading-normal"
        >
          ARMLESS.PRATIK
        </motion.span>

        {/* State B: "e can do anything" — all words glide in simultaneously at the exact same time */}
        <motion.span
          initial={false}
          animate={
            hovered
              ? { y: "0%", opacity: 1 }
              : { y: "120%", opacity: 0 }
          }
          transition={{
            duration: 0.45,
            ease: SMOOTH_CURVE,
          }}
          className="col-start-1 row-start-1 inline-flex items-center font-display font-black text-[15px] md:text-[17px] tracking-[0.04em] text-[#151515] whitespace-nowrap leading-normal pointer-events-none"
        >
          e can do anything
        </motion.span>
      </motion.span>
    </a>
  );
}
