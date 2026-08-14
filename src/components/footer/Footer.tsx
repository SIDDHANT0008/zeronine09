"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";

const FooterGrain = dynamic(() => import("./FooterGrain"), { ssr: false });

const navLinks = [
  { label: "Work",     href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process",  href: "#process" },
  { label: "Studio",   href: "#studio" },
  { label: "Contact",  href: "#contact" },
];

const socialLinks = [
  { label: "GitHub",   href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "X",        href: "https://x.com" },
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const footerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setMousePos({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.footer
      ref={ref}
      className="border-t border-border relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(200, 255, 0, 0.02), transparent 60%)`,
        }}
      />

      <div className="absolute inset-0 pointer-events-none">
        <FooterGrain />
      </div>

      <div ref={footerRef} className="relative z-10 content-width py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-16 md:mb-20">
          {/* brand */}
          <div className="md:col-span-5">
            <span className="text-[12px] md:text-[13px] font-semibold tracking-[0.22em] text-fg block mb-4 md:mb-5">
              ZERONINE
            </span>
            <p className="text-fg-muted text-[13px] md:text-[14px] max-w-[260px] leading-[1.6] mb-6 md:mb-8">
              Digital products, engineered differently.
            </p>
            <div className="flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[9px] md:text-[10px] font-mono text-fg-muted/45 tracking-[0.1em] md:tracking-[0.12em] uppercase">
                Available for select projects
              </span>
            </div>
          </div>

          {/* navigation */}
          <div className="md:col-span-3">
            <h4 className="text-[9px] md:text-[10px] font-mono text-fg-muted/35 tracking-[0.18em] md:tracking-[0.2em] uppercase mb-5 md:mb-6">Navigation</h4>
            <nav className="flex flex-col gap-3 md:gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="text-[13px] md:text-[14px] text-fg-muted hover:text-fg transition-colors duration-300 text-left link-line w-fit"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* social */}
          <div className="md:col-span-2">
            <h4 className="text-[9px] md:text-[10px] font-mono text-fg-muted/35 tracking-[0.18em] md:tracking-[0.2em] uppercase mb-5 md:mb-6">Social</h4>
            <nav className="flex flex-col gap-3 md:gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] md:text-[14px] text-fg-muted hover:text-fg transition-colors duration-300 inline-flex items-center gap-1.5 link-line w-fit"
                  data-cursor={link.label.toUpperCase()}
                >
                  {link.label}
                  <svg className="w-2.5 h-2.5 md:w-3 md:h-3 opacity-25" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M1 11L11 1M11 1H3M11 1V9" />
                  </svg>
                </a>
              ))}
            </nav>
          </div>

          {/* contact */}
          <div className="md:col-span-2">
            <h4 className="text-[9px] md:text-[10px] font-mono text-fg-muted/35 tracking-[0.18em] md:tracking-[0.2em] uppercase mb-5 md:mb-6">Contact</h4>
            <a
              href="mailto:hello@zeronine.studio"
              className="text-[13px] md:text-[14px] text-fg-muted hover:text-fg transition-colors duration-300 link-line"
              data-cursor="EMAIL"
            >
              hello@zeronine.studio
            </a>
          </div>
        </div>

        {/* bottom bar */}
        <div className="pt-6 md:pt-8 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-4">
          <span className="text-fg-muted/35 text-[10px] md:text-[11px]">© 2026 zeronine. All rights reserved.</span>
          <div className="flex items-center gap-4 md:gap-6 text-fg/[0.06] text-[9px] md:text-[10px] font-mono select-none">
            <span>BUILD_STATUS: READY</span>
            <span className="hidden sm:inline">SYSTEM: ONLINE</span>
            <span>VERSION: 09.01</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
