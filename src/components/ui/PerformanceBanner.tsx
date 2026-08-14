"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function PerformanceBanner() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const words = [
    { text: "BUILT",        delay: 0 },
    { text: "FOR",          delay: 0.08 },
    { text: "PERFORMANCE.", delay: 0.16 },
  ];

  return (
    <section ref={ref} className="py-20 md:py-28 lg:py-36 overflow-hidden">
      <div className="content-width">
        <div className="flex flex-wrap items-baseline gap-x-3 md:gap-x-5">
          {words.map((word, i) => (
            <motion.span
              key={word.text}
              className="text-[28px] md:text-[clamp(32px,6vw,64px)] lg:text-[clamp(32px,7vw,80px)] font-normal tracking-[-0.025em] md:tracking-[-0.03em] leading-[0.95]"
              initial={{ opacity: 0, y: 40, filter: "blur(5px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: word.delay }}
            >
              {i === words.length - 1 ? (
                <span className="text-fg-muted">{word.text}</span>
              ) : (
                word.text
              )}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
