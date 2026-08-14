"use client";

import { useCallback, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Magnetic button — pulls toward the cursor within a radius.
 * Spring physics for the pull, scale-down on press.
 *
 * @example
 * <MagneticButton as="a" href="/work" cursorLabel="VIEW">See work</MagneticButton>
 */

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
  as?: "button" | "a";
  href?: string;
  onClick?: () => void;
  cursorLabel?: string;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  radius = 120,
  as = "button",
  href,
  onClick,
  cursorLabel,
}: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 150, damping: 20, mass: 0.5 });

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      const el   = e.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = e.clientX - cx;
      const dy   = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        const pull = 1 - dist / radius;
        x.set(dx * strength * pull);
        y.set(dy * strength * pull);
      } else {
        x.set(0);
        y.set(0);
      }
    },
    [x, y, strength, radius],
  );

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  if (as === "a") {
    return (
      <motion.a
        href={href}
        className={className}
        style={{ x: springX, y: springY }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        data-cursor={cursorLabel}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      data-cursor={cursorLabel}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
