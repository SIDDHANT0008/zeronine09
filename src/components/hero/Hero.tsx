"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";

const WebGLAmbient   = dynamic(() => import("./WebGLAmbient"),   { ssr: false });
const GridBackground = dynamic(() => import("./GridBackground"), { ssr: false });

const LINES = ["WE BUILD", "DIGITAL", "EXPERIENCES"];

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY       = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] flex flex-col justify-end pb-16 md:pb-28 overflow-hidden"
    >
      {/* WebGL ambient */}
      <div className="absolute inset-0">
        <WebGLAmbient />
      </div>

      {/* dot grid */}
      <div className="absolute inset-0 opacity-20 md:opacity-25">
        <GridBackground />
      </div>

      {/* vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 75% 60% at 50% 55%, transparent 0%, var(--color-bg) 80%)",
        }}
      />

      {/* content */}
      <motion.div
        className="relative z-10 content-width"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* hero type */}
        <div className="flex flex-col mb-12 md:mb-16">
          {LINES.map((line, i) => (
            <AnimatedLine key={line} text={line} delay={0.5 + i * 0.15} isLoaded={isLoaded} />
          ))}
        </div>

        {/* supporting */}
        <motion.div
          className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-fg-secondary text-[15px] md:text-[17px] max-w-[340px] md:max-w-[380px] leading-[1.6]">
            Development studio for ambitious products, brands and ideas.
          </p>

          <div className="flex items-center gap-6 md:gap-8">
            <a
              href="#work"
              className="group inline-flex items-center gap-2.5 text-[13px] font-medium tracking-[0.04em] text-fg-secondary hover:text-fg transition-colors duration-300"
              data-cursor="EXPLORE"
            >
              <span className="relative">
                Explore our work
                <span className="absolute bottom-[-2px] left-0 w-0 h-px bg-fg-muted transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
              </span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
              >
                <path d="M1 8H15M15 8L8 1M15 8L8 15" />
              </svg>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center px-5 py-2.5 md:px-6 md:py-3 rounded-full bg-fg text-bg text-[13px] font-medium tracking-[0.04em] hover:bg-fg-secondary transition-colors duration-300"
              data-cursor="START"
            >
              Start a project
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* scroll indicator */}
      <motion.div
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span className="text-[9px] md:text-[10px] font-mono text-fg-muted/50 tracking-[0.25em] uppercase">
          Scroll
        </span>
        <motion.div
          className="w-px h-6 md:h-8 bg-gradient-to-b from-fg/20 to-transparent"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
}

function AnimatedLine({
  text,
  delay,
  isLoaded,
}: {
  text: string;
  delay: number;
  isLoaded: boolean;
}) {
  const words = text.split(" ");

  return (
    <div className="overflow-hidden">
      <div className="text-hero font-medium" style={{ perspective: "800px" }}>
        {words.map((word, wIdx) => (
          <span key={wIdx} className="inline-block mr-[0.25em] md:mr-[0.3em]">
            {word.split("").map((char, cIdx) => (
              <motion.span
                key={cIdx}
                className="inline-block"
                style={{ transformOrigin: "bottom center" }}
                initial={{ opacity: 0, y: 80, rotateX: 60, filter: "blur(8px)" }}
                animate={isLoaded ? { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" } : {}}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: delay + (wIdx * word.length + cIdx) * 0.03,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
