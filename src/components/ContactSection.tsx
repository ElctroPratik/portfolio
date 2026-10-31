"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import { CUSTOM_EASE } from "@/lib/animations";

const tags = ["BRANDING", "POSTERS", "VIDEO EDITING", "SOCIAL MEDIA", "AND MORE..."];

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = siteConfig.email;

    const fallbackCopy = () => {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand("copy");
        document.body.removeChild(textArea);
        if (successful) {
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
        }
      } catch (err) {
        console.error("Clipboard copy failed:", err);
      }
    };

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
        })
        .catch(() => {
          fallbackCopy();
        });
    } else {
      fallbackCopy();
    }
  };

  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    siteConfig.email
  )}`;

  return (
    <section
      id="contact"
      className="bg-[#F2F0E9] border-t border-[#151515]/10 py-16 sm:py-24 md:py-36"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 sm:gap-14 lg:gap-16 items-start lg:items-end">

          {/* Heading & Tags */}
          <div className="flex flex-col gap-5 sm:gap-6">
            <span className="font-mono text-[10px] tracking-[0.22em] text-[#777777] uppercase font-medium">
              Get in touch
            </span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: CUSTOM_EASE }}
              className="font-display font-black leading-[0.88] tracking-[-0.03em] text-[#151515] uppercase"
              style={{ fontSize: "clamp(40px,9.5vw,98px)" }}
            >
              WANT TO
              <br />
              WORK{" "}
              <span className="relative inline-block px-1">
                <span className="relative z-10">WITH ME?</span>
                <span
                  className="absolute left-0 right-0 bottom-1 sm:bottom-1.5 bg-[#E44339] z-0"
                  style={{ height: "55%" }}
                />
              </span>
            </motion.h2>

            <p className="font-body text-[14px] sm:text-[15px] md:text-[17px] text-[#777777] max-w-md leading-relaxed">
              Got a project in mind? Let&apos;s turn your ideas into something great.
            </p>

            <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-1">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[9px] sm:text-[10px] tracking-[0.16em] border border-[#151515]/20 px-2.5 sm:px-3 py-1 sm:py-1.5 text-[#777777]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTA block */}
          <div className="flex flex-col gap-3 w-full sm:w-auto lg:pb-3">
            {/* Primary Action Button: Opens Gmail in new tab */}
            <motion.a
              href={gmailComposeUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-4 bg-[#151515] text-[#F2F0E9] font-display font-bold tracking-[0.12em] px-7 sm:px-8 py-4 sm:py-5 hover:bg-[#E44339] transition-colors duration-300 shadow-xl cursor-pointer"
              style={{ fontSize: "clamp(13px,1.3vw,16px)" }}
            >
              LET&apos;S TALK
              <svg className="w-4 h-4 text-[#E44339] group-hover:text-white transition-colors duration-300 group-hover:translate-x-1 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </motion.a>

            {/* Below button: Copy Email with instant feedback */}
            <div className="flex items-center justify-between sm:justify-start gap-3 pt-1">
              <button
                type="button"
                onClick={handleCopy}
                className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-[#777777] hover:text-[#151515] transition-colors duration-200 cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 text-[#E44339]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
                <span className="underline underline-offset-4">
                  {copied ? "COPIED TO CLIPBOARD!" : "COPY EMAIL"}
                </span>
              </button>

              <span className="font-mono text-[11px] text-[#777777]/60">
                ({siteConfig.email})
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
