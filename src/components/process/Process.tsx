"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    id: "01",
    title: "Discover",
    description: "We understand the problem before writing the first line of code.",
    detail: "Stakeholder interviews · Market research · Technical audit · Architecture planning",
  },
  {
    id: "02",
    title: "Architect",
    description: "Systems, infrastructure and product architecture designed for scale from day one.",
    detail: "System design · Database schema · API architecture · Infrastructure planning",
  },
  {
    id: "03",
    title: "Build",
    description: "Clean, scalable and production-ready software. Every commit is deliberate.",
    detail: "Sprint cycles · Code reviews · CI/CD pipelines · Automated testing",
  },
  {
    id: "04",
    title: "Refine",
    description: "Polish until it shines. Performance optimization, UX refinement and edge case handling.",
    detail: "Performance audits · Accessibility · Cross-browser testing · Load testing",
  },
  {
    id: "05",
    title: "Launch",
    description: "Deployment, monitoring and ongoing support. We don't disappear after launch.",
    detail: "Zero-downtime deploy · Monitoring · Incident response · Continuous improvement",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} id="process" className="section-spacing">
      {/* header */}
      <div className="content-width mb-14 md:mb-24">
        <motion.div
          className="flex items-center gap-3 md:gap-4 mb-5 md:mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="w-6 md:w-8 h-px bg-fg-muted/40" />
          <span className="text-[10px] md:text-[11px] font-mono text-fg-muted tracking-[0.18em] md:tracking-[0.2em] uppercase">Process</span>
        </motion.div>

        <motion.h2
          className="text-[28px] md:text-[clamp(28px,4vw,48px)] font-normal leading-[1.1] tracking-[-0.02em]"
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          How we build.
        </motion.h2>
      </div>

      {/* timeline */}
      <div className="content-width">
        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-[14px] md:left-[31px] top-0 bottom-0 w-px bg-border" />

          <div>
            {steps.map((step, index) => (
              <ProcessStep key={step.id} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessStep({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      className="group relative"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
    >
      <div className="grid grid-cols-[28px_1fr] md:grid-cols-[62px_minmax(0,1fr)] lg:grid-cols-[62px_minmax(0,1fr)_minmax(0,1fr)] gap-4 md:gap-10 lg:gap-16 py-8 md:py-12 lg:py-14 border-t border-border">
        {/* dot + number */}
        <div className="relative flex flex-col items-center pt-0.5">
          <motion.div
            className="w-[5px] h-[5px] md:w-[6px] md:h-[6px] rounded-full border border-fg-muted/25 bg-bg z-10"
            animate={inView ? { borderColor: "rgba(245,245,245,0.18)" } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
          />
        </div>

        {/* title + description */}
        <div>
          <motion.h3
            className="text-[17px] md:text-[clamp(16px,2.2vw,26px)] font-normal tracking-[-0.005em] mb-3 md:mb-4"
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 + 0.1 }}
          >
            {step.title}
          </motion.h3>
          <motion.p
            className="text-fg-secondary text-[14px] md:text-[15px] leading-[1.6] max-w-[400px]"
            initial={{ opacity: 0, y: 6 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 + 0.15 }}
          >
            {step.description}
          </motion.p>

          {/* detail — visible on mobile below description */}
          <motion.p
            className="text-fg-muted text-[12px] md:text-[13px] leading-[1.6] mt-3 lg:hidden"
            initial={{ opacity: 0, y: 6 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 + 0.2 }}
          >
            {step.detail}
          </motion.p>
        </div>

        {/* detail — desktop right column */}
        <div className="hidden lg:block">
          <motion.p
            className="text-fg-muted text-[13px] leading-[1.7]"
            initial={{ opacity: 0, y: 6 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 + 0.2 }}
          >
            {step.detail}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
