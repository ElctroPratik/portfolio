"use client";

import { siteConfig } from "@/data/siteConfig";

const navLinks = [
  { label: "WORK", href: "#work" },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" },
];

function InstagramIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}


function LinkedInIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function MailIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

const socialLinks = [
  { label: "Instagram", icon: InstagramIcon, href: siteConfig.social.instagram },
  { label: "LinkedIn", icon: LinkedInIcon, href: siteConfig.social.linkedin },
  { label: "Email", icon: MailIcon, href: siteConfig.social.email },
];

export default function Footer() {
  return (
    <footer className="bg-[#151515] text-[#F2F0E9] py-12 md:py-16">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16">

        {/* Main row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 pb-8 sm:pb-10 border-b border-[#F2F0E9]/10">

          {/* Brand */}
          <div className="flex flex-col gap-2">
            <span className="font-display font-black text-[16px] tracking-[0.06em]">
              {siteConfig.displayName}
            </span>
            <span className="font-body text-[13px] text-[#777777]">
              {siteConfig.tagline}
            </span>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-3 md:items-center">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-mono text-[11px] tracking-[0.18em] text-[#777777] hover:text-[#F2F0E9] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div className="flex flex-col gap-3 md:items-end">
            {socialLinks
              .filter((link) => Boolean(link.href))
              .map((link) => {
                const Icon = link.icon;
                const isMailto = typeof link.href === "string" && link.href.startsWith("mailto");
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={isMailto ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] text-[#777777] hover:text-[#E44339] transition-colors duration-200"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {link.label}
                  </a>
                );
              })}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-6">
          <span className="font-mono text-[10px] tracking-[0.16em] text-[#777777]">
            © {siteConfig.year} {siteConfig.name}. All rights reserved.
          </span>
          <span className="font-mono text-[10px] tracking-[0.16em] text-[#777777]">
            {siteConfig.location}
          </span>
        </div>
      </div>
    </footer>
  );
}
