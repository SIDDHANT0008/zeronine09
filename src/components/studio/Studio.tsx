"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const principles = [
  { label: "Fast by default",        description: "Performance is a feature. Every millisecond matters." },
  { label: "Scalable by design",     description: "Architecture that grows with your ambition." },
  { label: "Maintainable by architecture", description: "Code that your future self will thank you for." },
];

export default function Studio() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} id="studio" className="section-spacing">
      <div className="content-width">
        {/* header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-24 mb-16 md:mb-28 lg:mb-36">
          <div>
            <motion.div
              className="flex items-center gap-3 md:gap-4 mb-5 md:mb-6"
              initial={{ opacity: 0, y: 16 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-6 md:w-8 h-px bg-fg-muted/40" />
              <span className="text-[10px] md:text-[11px] font-mono text-fg-muted tracking-[0.18em] md:tracking-[0.2em] uppercase">Studio</span>
            </motion.div>

            <motion.h2
              className="text-[28px] md:text-[clamp(28px,4vw,48px)] font-normal leading-[1.1] tracking-[-0.02em]"
              initial={{ opacity: 0, y: 24 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              Small team.<br />Big systems.
            </motion.h2>
          </div>

          <motion.div
            className="flex flex-col justify-end"
            initial={{ opacity: 0, y: 16 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <p className="text-fg-secondary text-[15px] md:text-[17px] leading-[1.6] mb-6 md:mb-8">
              zeronine is a development studio focused on turning ambitious ideas
              into fast, intelligent and scalable digital products.
            </p>
            <p className="text-fg-muted text-[14px] md:text-[15px] leading-[1.6]">
              We believe in engineering discipline, design precision and the
              relentless pursuit of quality. Every pixel, every API endpoint,
              every interaction — intentional.
            </p>
          </motion.div>
        </div>

        {/* principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-md overflow-hidden mb-16 md:mb-28 lg:mb-36">
          {principles.map((p, i) => (
            <PrincipleCard key={p.label} principle={p} index={i} />
          ))}
        </div>

        {/* "09" mark */}
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 1.2 }}
        >
          <ZeroNineMark />
        </motion.div>
      </div>
    </section>
  );
}

function ZeroNineMark() {
  return (
    <div className="relative w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64">
      <motion.div
        className="absolute inset-0 border border-fg/[0.04] rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-6 md:inset-8 lg:inset-10 border border-fg/[0.06] rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="flex items-baseline gap-0.5"
          animate={{ opacity: [0.06, 0.14, 0.06] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[40px] md:text-[52px] lg:text-[64px] font-light text-fg tracking-[-0.04em] select-none">0</span>
          <span className="text-[40px] md:text-[52px] lg:text-[64px] font-light text-fg tracking-[-0.04em] select-none">9</span>
        </motion.div>
      </div>

      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-accent/20 rounded-full"
          style={{ top: "50%", left: "50%" }}
          animate={{
            x: [Math.cos((i * Math.PI) / 2) * 60 - 2, Math.cos((i * Math.PI) / 2 + Math.PI * 2) * 60 - 2],
            y: [Math.sin((i * Math.PI) / 2) * 60 - 2, Math.sin((i * Math.PI) / 2 + Math.PI * 2) * 60 - 2],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: i * 2 }}
        />
      ))}
    </div>
  );
}

function PrincipleCard({ principle, index }: { principle: (typeof principles)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <motion.div
      ref={ref}
      className="group bg-bg-secondary p-6 md:p-8 lg:p-10 hover:bg-bg-tertiary transition-colors duration-300"
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
    >
      <div className="flex flex-col gap-3 md:gap-4">
        <span className="text-[9px] md:text-[10px] font-mono text-accent/55 tracking-[0.12em]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="text-[16px] md:text-[17px] lg:text-[19px] font-normal">{principle.label}</h3>
        <p className="text-fg-muted text-[12px] md:text-[13px] leading-[1.6]">{principle.description}</p>
      </div>
    </motion.div>
  );
}
