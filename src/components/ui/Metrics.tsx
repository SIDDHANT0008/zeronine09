"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const metrics = [
  { value: "<100ms", label: "Response targets" },
  { value: "99.9%",  label: "Reliability mindset" },
  { value: "24/7",   label: "Systems thinking" },
];

export default function Metrics() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} className="py-16 md:py-24">
      <div className="content-width">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-md overflow-hidden">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              className="group bg-bg-secondary p-8 md:p-10 lg:p-14 text-center hover:bg-bg-tertiary transition-colors duration-500"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.1 }}
            >
              <div className="text-[28px] md:text-[clamp(28px,3.5vw,48px)] font-normal tracking-[-0.03em] mb-2 md:mb-3 group-hover:text-accent transition-colors duration-500">
                {m.value}
              </div>
              <div className="text-fg-muted text-[10px] md:text-[11px] font-mono tracking-[0.08em] uppercase">{m.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
