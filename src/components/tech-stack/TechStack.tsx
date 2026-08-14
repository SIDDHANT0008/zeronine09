"use client";

import { useRef, useCallback } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

const technologies = [
  { name: "React",      category: "Frontend" },
  { name: "Next.js",    category: "Framework" },
  { name: "TypeScript", category: "Language" },
  { name: "Node.js",    category: "Runtime" },
  { name: "Python",     category: "Language" },
  { name: "PostgreSQL", category: "Database" },
  { name: "MongoDB",    category: "Database" },
  { name: "AWS",        category: "Cloud" },
  { name: "OpenAI",     category: "AI" },
  { name: "Anthropic",  category: "AI" },
  { name: "Vercel",     category: "Platform" },
  { name: "Cloudflare", category: "Infrastructure" },
  { name: "Docker",     category: "DevOps" },
  { name: "Redis",      category: "Cache" },
  { name: "GraphQL",    category: "API" },
  { name: "Tailwind",   category: "Styling" },
];

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="section-spacing overflow-hidden">
      {/* header */}
      <div className="content-width mb-14 md:mb-24">
        <motion.div
          className="flex items-center gap-3 md:gap-4 mb-5 md:mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="w-6 md:w-8 h-px bg-fg-muted/40" />
          <span className="text-[10px] md:text-[11px] font-mono text-fg-muted tracking-[0.18em] md:tracking-[0.2em] uppercase">Technology</span>
        </motion.div>

        <motion.h2
          className="text-[28px] md:text-[clamp(28px,4vw,48px)] font-normal leading-[1.1] tracking-[-0.02em]"
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          The tools change.<br />
          <span className="text-fg-muted">The standard doesn&apos;t.</span>
        </motion.h2>
      </div>

      {/* grid */}
      <div className="content-width">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-md overflow-hidden">
          {technologies.map((tech, index) => (
            <TechItem key={tech.name} tech={tech} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TechItem({ tech, index }: { tech: (typeof technologies)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const cfg    = { stiffness: 150, damping: 20, mass: 0.5 };
  const smoothX = useSpring(mouseX, cfg);
  const smoothY = useSpring(mouseY, cfg);
  const rotateX = useTransform(smoothY, [0, 1], [5, -5]);
  const rotateY = useTransform(smoothX, [0, 1], [-5, 5]);

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top)  / rect.height);
    },
    [mouseX, mouseY],
  );

  const onLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      className="group relative bg-bg-secondary p-5 md:p-6 lg:p-8 hover:bg-bg-tertiary transition-colors duration-300"
      style={{ perspective: 600, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.03 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="flex flex-col gap-1.5 md:gap-2"
      >
        <span className="text-[9px] md:text-[10px] font-mono text-fg-muted/45 tracking-[0.12em] md:tracking-[0.15em] uppercase">
          {tech.category}
        </span>
        <span className="text-[15px] md:text-[16px] lg:text-[18px] font-normal group-hover:text-accent transition-colors duration-300">
          {tech.name}
        </span>
      </motion.div>

      <div className="absolute top-3 right-3 md:top-4 md:right-4">
        <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-fg/5 group-hover:bg-accent group-hover:shadow-[0_0_8px_rgba(200,255,0,0.35)] transition-all duration-300" />
      </div>
    </motion.div>
  );
}
