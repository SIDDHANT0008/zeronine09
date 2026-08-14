"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" });
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top)  / rect.height - 0.5,
      });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="section-spacing">
      <div className="content-width">
        <div
          ref={containerRef}
          className="relative rounded-xl bg-bg-secondary border border-border overflow-hidden"
        >
          {/* cursor glow */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              background: `radial-gradient(500px circle at ${50 + mousePos.x * 40}% ${50 + mousePos.y * 40}%, rgba(200, 255, 0, 0.03), transparent 60%)`,
            }}
          />

          {/* corner accents */}
          <div className="absolute top-0 left-0 w-16 h-16 md:w-20 md:h-20 border-t border-l border-fg/[0.04] rounded-tl-xl" />
          <div className="absolute bottom-0 right-0 w-16 h-16 md:w-20 md:h-20 border-b border-r border-fg/[0.04] rounded-br-xl" />

          {/* content */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 py-16 md:px-16 md:py-24 lg:px-24 lg:py-32">
            <motion.div
              className="flex items-center gap-3 md:gap-4 mb-8 md:mb-10"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-6 md:w-8 h-px bg-fg-muted/40" />
              <span className="text-[10px] md:text-[11px] font-mono text-fg-muted tracking-[0.18em] md:tracking-[0.2em] uppercase">Get in touch</span>
              <div className="w-6 md:w-8 h-px bg-fg-muted/40" />
            </motion.div>

            <motion.h2
              className="text-[28px] md:text-[clamp(28px,5.5vw,60px)] font-normal leading-[1.0] tracking-[-0.025em] mb-8 md:mb-10"
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              style={{ transform: `translate(${mousePos.x * 8}px, ${mousePos.y * 8}px)` }}
            >
              Have something<br />worth building?
            </motion.h2>

            <motion.p
              className="text-fg-muted text-[14px] md:text-[16px] mb-10 md:mb-12 max-w-[340px] md:max-w-[400px] leading-[1.6]"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              Tell us about your project. We&apos;ll tell you how we&apos;d build it.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center gap-4 md:gap-5"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            >
              <MagneticCTA />

              <span className="text-fg-muted/30 text-[12px] md:text-[13px] hidden sm:block">or</span>

              <a
                href="mailto:hello@zeronine.studio"
                className="text-[12px] md:text-[13px] text-fg-muted hover:text-fg transition-colors duration-300 link-line"
                data-cursor="EMAIL"
              >
                hello@zeronine.studio
              </a>
            </motion.div>

            {/* availability */}
            <motion.div
              className="mt-10 md:mt-12 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[9px] md:text-[10px] font-mono text-fg-muted/45 tracking-[0.12em] md:tracking-[0.15em] uppercase">
                Available for select projects
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MagneticCTA() {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = buttonRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect   = el.getBoundingClientRect();
      const dx     = e.clientX - (rect.left + rect.width  / 2);
      const dy     = e.clientY - (rect.top  + rect.height / 2);
      const dist   = Math.sqrt(dx * dx + dy * dy);
      if (dist < 140) {
        const pull = 1 - dist / 140;
        el.style.transform = `translate(${dx * 0.25 * pull}px, ${dy * 0.25 * pull}px)`;
      }
    };
    const onLeave = () => { el.style.transform = "translate(0, 0)"; };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, []);

  return (
    <a
      ref={buttonRef}
      href="mailto:hello@zeronine.studio"
      className="group relative inline-flex items-center gap-2.5 px-7 py-3 md:px-8 md:py-3.5 rounded-full bg-fg text-bg text-[12px] md:text-[13px] font-medium tracking-[0.04em] overflow-hidden transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
      data-cursor="EMAIL"
      style={{ willChange: "transform" }}
    >
      <span className="relative z-10 group-hover:text-bg transition-colors duration-300">
        Let&apos;s build it
      </span>
      <svg
        className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
        viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
      >
        <path d="M1 8H15M15 8L8 1M15 8L8 15" />
      </svg>
      <div className="absolute inset-0 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full" />
    </a>
  );
}
