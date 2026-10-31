"use client";

import { motion } from "framer-motion";

const track1Items = [
  "POSTER DESIGNER",
  "*",
  "VIDEO EDITOR",
  "*",
  "2026",
  "*",
  "PORTFOLIO",
  "*",
];

const track2Items = [
  "HARMLESS.PRATIK",
  "->",
  "VISUAL STORYTELLING",
  "*",
  "CREATIVE DIRECTION",
  "*",
  "MUMBAI, INDIA",
  "*",
];

function MarqueeTrack({
  items,
  direction = 1,
  speed = 40,
}: {
  items: string[];
  direction?: 1 | -1;
  speed?: number;
}) {
  // 4x repetition for seamless infinite loop
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        className="inline-flex gap-8 py-2.5"
        animate={{ x: direction === 1 ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        style={{ willChange: "transform" }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className={`font-display font-bold uppercase select-none ${
              item === "*" || item === "->"
                ? "text-[#E44339]"
                : "text-[#F2F0E9]"
            }`}
            style={{ fontSize: "clamp(14px,1.9vw,22px)", letterSpacing: "0.1em" }}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="relative overflow-hidden pt-6 pb-6 md:pt-8 md:pb-8 bg-[#F2F0E9] select-none">
      {/* Shifted down and tilted seamlessly with tight, crisp spacing */}
      <div className="relative -rotate-1 md:-rotate-2 scale-105 transform origin-center shadow-xl bg-[#151515] py-1.5 z-10">
        <MarqueeTrack items={track1Items} direction={1} speed={40} />
        <div className="h-px bg-[#F2F0E9]/10" />
        <MarqueeTrack items={track2Items} direction={-1} speed={48} />
      </div>
    </section>
  );
}
