"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const projects = [
  {
    id: "01",
    category: "AI / DEVELOPMENT",
    title: "Intelligence, built into the workflow.",
    description: "AI-powered SaaS platform transforming how teams automate complex processes.",
    tech: ["Next.js", "OpenAI", "PostgreSQL"],
    color: "#C8FF00",
    preview: "AI dashboard with real-time analytics and model orchestration",
  },
  {
    id: "02",
    category: "FINTECH / PRODUCT",
    title: "Capital moves at the speed of code.",
    description: "Modern fintech platform enabling real-time transactions and portfolio management.",
    tech: ["React", "Node.js", "AWS"],
    color: "#00D4FF",
    preview: "Financial interface with live trading charts and portfolio view",
  },
  {
    id: "03",
    category: "E-COMMERCE / EXPERIENCE",
    title: "Commerce reimagined from the cart up.",
    description: "Headless e-commerce experience delivering sub-second page loads and seamless checkout.",
    tech: ["Next.js", "Shopify", "Vercel"],
    color: "#FF6B35",
    preview: "Premium shopping interface with immersive product galleries",
  },
  {
    id: "04",
    category: "AI / AUTOMATION",
    title: "Systems that think before they act.",
    description: "Autonomous workflow engine powered by multi-agent AI architecture.",
    tech: ["Python", "Anthropic", "Redis"],
    color: "#A855F7",
    preview: "Workflow graph with connected autonomous agents",
  },
  {
    id: "05",
    category: "BRAND / PLATFORM",
    title: "Where identity meets infrastructure.",
    description: "Full-stack digital brand platform with real-time content management and analytics.",
    tech: ["React", "Sanity", "Cloudflare"],
    color: "#FF3366",
    preview: "Brand platform with content editor and live preview",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [previewPos, setPreviewPos] = useState({ x: 0, y: 0 });

  const onPreviewMove = useCallback((e: React.MouseEvent) => {
    setPreviewPos({ x: e.clientX, y: e.clientY });
  }, []);

  return (
    <section ref={sectionRef} id="work" className="section-spacing" onMouseMove={onPreviewMove}>
      {/* header */}
      <div className="content-width mb-16 md:mb-28">
        <motion.div
          className="flex items-center gap-3 md:gap-4 mb-5 md:mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="w-6 md:w-8 h-px bg-fg-muted/40" />
          <span className="text-[10px] md:text-[11px] font-mono text-fg-muted tracking-[0.18em] md:tracking-[0.2em] uppercase">
            Selected Work
          </span>
        </motion.div>

        <motion.h2
          className="text-[28px] md:text-[clamp(28px,4vw,48px)] font-normal leading-[1.1] tracking-[-0.02em] text-fg"
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          Projects that define<br />what&apos;s possible.
        </motion.h2>
      </div>

      {/* project list */}
      <div className="content-width relative">
        {projects.map((project, index) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={index}
            isHovered={hoveredIndex === index}
            onHover={() => setHoveredIndex(index)}
            onLeave={() => setHoveredIndex(null)}
          />
        ))}
      </div>

      {/* floating preview — desktop only */}
      <AnimatePresence>
        {hoveredIndex !== null && (
          <motion.div
            className="fixed pointer-events-none z-40 hidden lg:block"
            style={{ left: previewPos.x + 24, top: previewPos.y - 120 }}
            initial={{ opacity: 0, scale: 0.92, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="w-[260px] h-[170px] rounded-lg overflow-hidden border border-border-light/20 flex items-center justify-center"
              style={{ backgroundColor: `${projects[hoveredIndex].color}06` }}
            >
              <div className="text-center px-6">
                <div
                  className="text-[10px] font-mono tracking-[0.1em] mb-2"
                  style={{ color: projects[hoveredIndex].color }}
                >
                  PREVIEW
                </div>
                <div className="text-[12px] text-fg-muted leading-[1.5]">
                  {projects[hoveredIndex].preview}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectRow({
  project,
  index,
  isHovered,
  onHover,
  onLeave,
}: {
  project: (typeof projects)[0];
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className="border-t border-border"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <a
        href="#"
        className="block py-10 md:py-16 transition-all duration-500"
        data-cursor="VIEW PROJECT"
      >
        {/* mobile: stacked layout */}
        <div className="md:hidden">
          {/* number + category */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[11px] font-mono tracking-[0.12em] text-fg-muted/50">
              {project.id}
            </span>
            <span className="text-[10px] font-mono tracking-[0.15em] text-fg-muted/40 uppercase">
              {project.category}
            </span>
          </div>

          {/* title */}
          <h3
            className={`text-[22px] font-normal leading-[1.15] tracking-[-0.01em] mb-4 transition-colors duration-500 ${
              isHovered ? "text-fg" : "text-fg-secondary"
            }`}
          >
            {project.title}
          </h3>

          {/* description */}
          <p
            className={`text-[14px] leading-[1.6] mb-5 transition-colors duration-500 ${
              isHovered ? "text-fg-secondary" : "text-fg-muted"
            }`}
          >
            {project.description}
          </p>

          {/* tech */}
          <div className="flex flex-wrap items-center gap-x-1">
            {project.tech.map((t, i) => (
              <span key={t} className="flex items-center gap-1">
                <span className="text-[10px] tracking-[0.04em] text-fg-muted/40 font-mono uppercase">
                  {t}
                </span>
                {i < project.tech.length - 1 && (
                  <span className="text-fg-muted/15 text-[9px] mx-0.5">·</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* desktop: 3-column grid */}
        <div className="hidden md:grid md:grid-cols-[64px_minmax(0,1fr)_320px] lg:grid-cols-[72px_minmax(0,1fr)_340px] gap-10 lg:gap-16">
          {/* col 1 — number */}
          <div className="flex items-start pt-1">
            <span
              className={`text-[12px] lg:text-[13px] font-mono tracking-[0.12em] transition-colors duration-500 ${
                isHovered ? "text-fg" : "text-fg-muted/40"
              }`}
            >
              {project.id}
            </span>
          </div>

          {/* col 2 — category + title */}
          <div>
            <span className="text-[10px] lg:text-[11px] font-mono tracking-[0.16em] lg:tracking-[0.18em] text-fg-muted/50 block mb-3 lg:mb-4 uppercase">
              {project.category}
            </span>
            <h3
              className={`text-[clamp(22px,3vw,36px)] font-normal leading-[1.1] tracking-[-0.015em] transition-colors duration-500 max-w-[520px] ${
                isHovered ? "text-fg" : "text-fg-secondary"
              }`}
            >
              {project.title}
            </h3>
          </div>

          {/* col 3 — description + tech */}
          <div className="flex flex-col justify-between h-full">
            <p
              className={`text-[14px] lg:text-[15px] leading-[1.6] max-w-[300px] lg:max-w-[320px] transition-colors duration-500 ${
                isHovered ? "text-fg-secondary" : "text-fg-muted"
              }`}
            >
              {project.description}
            </p>

            <div className="mt-6 lg:mt-8 flex flex-wrap items-center gap-x-1">
              {project.tech.map((t, i) => (
                <span key={t} className="flex items-center gap-1">
                  <span className="text-[10px] lg:text-[11px] tracking-[0.04em] text-fg-muted/40 font-mono uppercase">
                    {t}
                  </span>
                  {i < project.tech.length - 1 && (
                    <span className="text-fg-muted/15 text-[9px] mx-1">·</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
}
