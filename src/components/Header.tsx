"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LogoAnimation from "./LogoAnimation";
import { siteConfig } from "@/data/siteConfig";

const navLinks = [
  { label: "WORK", href: "#work" },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-5 sm:px-6 md:px-10 py-3.5 md:py-4 bg-[#F2F0E9]/95 backdrop-blur-md border-b border-[#151515]/10">
        {/* Logo */}
        <LogoAnimation />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-mono text-[11px] tracking-[0.18em] text-[#151515] hover:text-[#E44339] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Availability indicator (Desktop) */}
        <div className="hidden md:flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E44339] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E44339]" />
          </span>
          <span className="font-mono text-[10px] tracking-[0.16em] text-[#151515] uppercase">
            {siteConfig.availability}
          </span>
        </div>

        {/* Mobile hamburger (Touch friendly 44px hit-box) */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E44339] rounded"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-[#151515] transition-all duration-200 origin-center${menuOpen ? " rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#151515] transition-all duration-200${menuOpen ? " opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#151515] transition-all duration-200 origin-center${menuOpen ? " -rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#F2F0E9] border-b border-[#151515]/15 px-6 py-6 shadow-xl"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-mono text-[14px] font-bold tracking-[0.2em] text-[#151515] hover:text-[#E44339] transition-colors py-1"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-2 pt-5 border-t border-[#151515]/10 mt-4">
              <span className="w-2 h-2 rounded-full bg-[#E44339]" />
              <span className="font-mono text-[10px] tracking-[0.16em] text-[#777777] uppercase">
                {siteConfig.availability}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
