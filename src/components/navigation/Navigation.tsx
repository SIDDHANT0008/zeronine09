"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";

const navItems = [
  { label: "Work",     href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process",  href: "#process" },
  { label: "Studio",   href: "#studio" },
  { label: "Contact",  href: "#contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 60);
  });

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    // Small delay to let the menu close animation start
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        animate={{ y: isScrolled ? 8 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* backdrop */}
        <div
          className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isScrolled
              ? "bg-bg/85 backdrop-blur-2xl border-b border-border"
              : "bg-transparent"
          }`}
        />

        <nav className="content-width relative">
          <div className="flex items-center justify-between h-[64px] md:h-[80px]">
            {/* logo */}
            <Link href="/" className="relative z-10 group" data-cursor="HOME">
              <span className="text-[12px] md:text-[13px] font-semibold tracking-[0.22em] text-fg">
                ZERONINE
              </span>
              <span className="hidden md:block text-[10px] font-mono text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-[0.15em] mt-0.5">
                0 → 9
              </span>
            </Link>

            {/* desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.href)}
                  className="text-[13px] tracking-[0.04em] text-fg-muted hover:text-fg transition-colors duration-300"
                  data-cursor={item.label.toUpperCase()}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* desktop CTA */}
            <div className="hidden md:flex items-center">
              <a
                href="mailto:hello@zeronine.studio"
                className="group flex items-center gap-2 text-[13px] tracking-[0.04em] text-fg-muted hover:text-fg transition-colors duration-300"
                data-cursor="LET'S TALK"
              >
                <span>Let&apos;s talk</span>
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"
                >
                  <path d="M1 13L13 1M13 1H3M13 1V11" />
                </svg>
              </a>
            </div>

            {/* mobile burger */}
            <button
              className="md:hidden relative z-10 w-11 h-11 flex items-center justify-center -mr-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <div className="flex flex-col gap-[5px]">
                <motion.span
                  className="w-[18px] h-[1.5px] bg-fg block origin-center"
                  animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 3.25 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.span
                  className="w-[18px] h-[1.5px] bg-fg block origin-center"
                  animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -3.25 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-bg flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.label}
                  onClick={() => scrollTo(item.href)}
                  className="text-[28px] font-light tracking-[-0.02em] text-fg"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>

            <motion.a
              href="mailto:hello@zeronine.studio"
              className="mt-14 text-fg-muted text-[13px] tracking-[0.04em]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              hello@zeronine.studio
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
