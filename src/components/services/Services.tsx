"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const services = [
  {
    id: "01",
    title: "Product Development",
    description: "From concept to launch. We architect, design and build digital products that scale.",
    capabilities: ["Product Strategy", "Technical Architecture", "MVP Development", "Iterative Design"],
  },
  {
    id: "02",
    title: "Web Development",
    description: "High-performance websites and web applications built with modern frameworks.",
    capabilities: ["Next.js & React", "Headless CMS", "Performance Optimization", "SEO Engineering"],
  },
  {
    id: "03",
    title: "AI & Automation",
    description: "Intelligent systems that automate workflows, enhance decisions and learn over time.",
    capabilities: ["LLM Integration", "Custom AI Models", "Workflow Automation", "Data Pipelines"],
  },
  {
    id: "04",
    title: "SaaS Development",
    description: "Multi-tenant platforms with robust architecture, billing systems and admin dashboards.",
    capabilities: ["Multi-tenancy", "Subscription Billing", "Admin Systems", "API Design"],
  },
  {
    id: "05",
    title: "E-Commerce",
    description: "Conversion-optimized shopping experiences with headless architecture.",
    capabilities: ["Headless Commerce", "Checkout Optimization", "Inventory Systems", "Payment Integration"],
  },
  {
    id: "06",
    title: "Digital Experiences",
    description: "Immersive, interactive websites that blur the line between product and experience.",
    capabilities: ["3D & WebGL", "Motion Design", "Interactive Storytelling", "Creative Technology"],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section ref={sectionRef} id="services" className="section-spacing">
      {/* header */}
      <div className="content-width mb-14 md:mb-24">
        <motion.div
          className="flex items-center gap-3 md:gap-4 mb-5 md:mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="w-6 md:w-8 h-px bg-fg-muted/40" />
          <span className="text-[10px] md:text-[11px] font-mono text-fg-muted tracking-[0.18em] md:tracking-[0.2em] uppercase">Services</span>
        </motion.div>

        <motion.div
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12"
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <h2 className="text-[28px] md:text-[clamp(28px,4vw,48px)] font-normal leading-[1.1] tracking-[-0.02em]">
            We design.<br />We engineer.<br />We scale.
          </h2>
          <p className="text-fg-muted text-[14px] md:text-[15px] max-w-[320px] md:max-w-[360px] leading-[1.6]">
            Every service is built around one principle: ship software that moves the needle.
          </p>
        </motion.div>
      </div>

      {/* list */}
      <div className="content-width">
        {services.map((service, index) => (
          <ServiceItem
            key={service.id}
            service={service}
            index={index}
            isActive={activeIndex === index}
            onHover={() => setActiveIndex(index)}
            onLeave={() => setActiveIndex(null)}
          />
        ))}
      </div>
    </section>
  );
}

function ServiceItem({
  service,
  index,
  isActive,
  onHover,
  onLeave,
}: {
  service: (typeof services)[0];
  index: number;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      className="border-t border-border"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div
        className={`py-5 md:py-7 cursor-pointer transition-opacity duration-400 ${
          isActive ? "opacity-100" : "opacity-40 hover:opacity-100"
        }`}
      >
        {/* mobile layout */}
        <div className="md:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-fg-muted/35 tracking-[0.12em]">
                {service.id}
              </span>
              <h3 className="text-[17px] font-normal tracking-[-0.005em]">
                {service.title}
              </h3>
            </div>
            <motion.svg
              className={`w-3.5 h-3.5 transition-colors duration-300 ${isActive ? "text-fg" : "text-fg-muted/25"}`}
              viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"
              animate={{ rotate: isActive ? -45 : 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <path d="M4 10H16M16 10L10 4M16 10L10 16" />
            </motion.svg>
          </div>

          <AnimatePresence>
            {isActive && (
              <motion.div
                className="overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.25, delay: 0.05 } }}
              >
                <p className="text-fg-muted text-[13px] leading-[1.6] mt-3 mb-3">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-x-2.5 gap-y-1.5">
                  {service.capabilities.map((cap, i) => (
                    <motion.span
                      key={cap}
                      className="text-[10px] font-mono tracking-[0.05em] text-fg-muted/50 uppercase"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {cap}
                      {i < service.capabilities.length - 1 && (
                        <span className="text-fg-muted/15 ml-2.5">·</span>
                      )}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* desktop layout */}
        <div className="hidden md:grid md:grid-cols-[64px_minmax(0,1fr)_300px_36px] lg:grid-cols-[72px_minmax(0,1fr)_320px_40px] items-center gap-8 lg:gap-12">
          <span className="text-[10px] lg:text-[11px] font-mono text-fg-muted/35 tracking-[0.12em]">
            {service.id}
          </span>

          <h3 className="text-[clamp(16px,2.2vw,26px)] font-normal tracking-[-0.005em] transition-colors duration-300">
            {service.title}
          </h3>

          <p className="text-fg-muted text-[13px] lg:text-[14px] leading-[1.6] hidden lg:block">
            {service.description}
          </p>

          <div className="flex justify-end">
            <motion.svg
              className={`w-3.5 h-3.5 lg:w-4 lg:h-4 transition-colors duration-300 ${isActive ? "text-fg" : "text-fg-muted/25"}`}
              viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"
              animate={{ x: isActive ? 3 : 0, rotate: isActive ? -45 : 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <path d="M4 10H16M16 10L10 4M16 10L10 16" />
            </motion.svg>
          </div>
        </div>

        {/* desktop capabilities */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              className="hidden md:block pt-4 md:pl-[72px] lg:pl-[84px] overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.25, delay: 0.05 } }}
            >
              <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                {service.capabilities.map((cap, i) => (
                  <motion.span
                    key={cap}
                    className="text-[10px] lg:text-[11px] font-mono tracking-[0.05em] text-fg-muted/50 uppercase"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {cap}
                    {i < service.capabilities.length - 1 && (
                      <span className="text-fg-muted/15 ml-3">·</span>
                    )}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
