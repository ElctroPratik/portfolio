"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { useProfession, ProfessionMode } from "@/hooks/useProfession";
import { CUSTOM_EASE } from "@/lib/animations";

const options: { value: ProfessionMode; label: string }[] = [
  { value: "design", label: "GRAPHIC DESIGNER" },
  { value: "video", label: "VIDEO EDITOR" },
];

interface ProfessionSwitcherProps {
  compact?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export default function ProfessionSwitcher({
  compact = false,
  fullWidth = false,
  className = "",
}: ProfessionSwitcherProps) {
  const { activeMode, setActiveMode } = useProfession();
  const instanceId = useId();

  const containerClasses = [
    fullWidth ? "w-full flex" : "inline-flex",
    "items-center bg-[#151515] p-1 border-2 border-[#151515] shadow-xl select-none",
    compact ? "gap-1" : "gap-1.5",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      role="group"
      aria-label="Select discipline"
      className={containerClasses}
    >
      {options.map((opt) => {
        const isActive = activeMode === opt.value;
        const buttonClasses = [
          fullWidth ? "flex-1" : "",
          "relative flex items-center justify-center font-mono tracking-[0.16em] uppercase transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E44339] cursor-pointer",
          compact
            ? "text-[10px] md:text-[11px] px-3.5 py-2 font-medium"
            : "text-[12px] md:text-[13px] px-5 py-3 font-bold",
          isActive
            ? "text-white"
            : "text-[#F2F0E9]/60 hover:text-white hover:bg-white/5",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <button
            key={opt.value}
            onClick={() => setActiveMode(opt.value)}
            role="radio"
            aria-checked={isActive}
            className={buttonClasses}
          >
            {/* Active red indicator pill with instance-scoped layoutId */}
            {isActive && (
              <motion.span
                layoutId={`profession-indicator-${instanceId}`}
                className="absolute inset-0 bg-[#E44339] shadow-md"
                transition={{ duration: 0.28, ease: CUSTOM_EASE }}
                style={{ zIndex: 0 }}
              />
            )}
            
            <span className="relative z-10 flex items-center justify-center gap-2 whitespace-nowrap">
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
              )}
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
