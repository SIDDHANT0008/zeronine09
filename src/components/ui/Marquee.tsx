"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface MarqueeProps {
  text: string;
  speed?: number;
  className?: string;
}

export default function Marquee({ text, speed = 40, className = "" }: MarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  const repeated = Array(6).fill(text).join(" · ");

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden py-8 md:py-10 ${className}`}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ x: { duration: speed, repeat: Infinity, ease: "linear" } }}
      >
        <span className="text-[20px] md:text-[clamp(24px,3.5vw,40px)] lg:text-[clamp(24px,4vw,48px)] font-light text-fg/[0.025] tracking-[-0.01em] mr-8 md:mr-12 select-none">
          {repeated}
        </span>
        <span className="text-[20px] md:text-[clamp(24px,3.5vw,40px)] lg:text-[clamp(24px,4vw,48px)] font-light text-fg/[0.025] tracking-[-0.01em] mr-8 md:mr-12 select-none">
          {repeated}
        </span>
      </motion.div>
    </motion.div>
  );
}
