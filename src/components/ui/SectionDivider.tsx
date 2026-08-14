"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionDividerProps {
  label?: string;
}

export default function SectionDivider({ label }: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <div ref={ref} className="content-width py-8 md:py-12">
      <motion.div
        className="flex items-center gap-3 md:gap-5"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="flex-1 h-px bg-border"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "left" }}
        />
        {label && (
          <motion.span
            className="text-[9px] md:text-[10px] font-mono text-fg-muted/35 tracking-[0.2em] md:tracking-[0.25em] uppercase shrink-0"
            initial={{ opacity: 0, y: 5 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {label}
          </motion.span>
        )}
        <motion.div
          className="flex-1 h-px bg-border"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{ transformOrigin: "right" }}
        />
      </motion.div>
    </div>
  );
}
