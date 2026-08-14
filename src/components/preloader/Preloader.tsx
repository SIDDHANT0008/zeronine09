"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const WebGLLoader = dynamic(() => import("./WebGLLoader"), { ssr: false });

/**
 * Full-screen branded preloader.
 * Shows a WebGL gradient-mesh background, an SVG "09" stroke animation,
 * and a progress counter. Phases: enter → loading → exit.
 */

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase]     = useState<"enter" | "loading" | "exit">("enter");
  const [isReady, setIsReady] = useState(false);

  /* ---- detect already-loaded page ---- */
  useEffect(() => {
    if (document.readyState === "complete") {
      setIsReady(true);
    } else {
      const onLoad = () => setIsReady(true);
      window.addEventListener("load", onLoad);
      return () => window.removeEventListener("load", onLoad);
    }
  }, []);

  /* ---- progress ticker ---- */
  useEffect(() => {
    if (phase !== "loading") return;

    const duration = isReady ? 500 : 1400;
    const steps    = 60;
    const interval = duration / steps;
    let current    = 0;

    const timer = setInterval(() => {
      current += 100 / steps;
      setProgress(Math.round(Math.min(current, 100)));

      if (current >= 100) {
        clearInterval(timer);
        setTimeout(() => setPhase("exit"), 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [phase, isReady]);

  /* ---- phase transitions ---- */
  useEffect(() => {
    if (phase === "enter") {
      const t = setTimeout(() => setPhase("loading"), 500);
      return () => clearTimeout(t);
    }
    if (phase === "exit") {
      const t = setTimeout(onComplete, 700);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* WebGL background */}
          <div className="absolute inset-0">
            <WebGLLoader />
          </div>

          {/* content overlay */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            {/* "09" SVG stroke mark */}
            <motion.div
              className="relative mb-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <svg
                width="140"
                height="70"
                viewBox="0 0 140 70"
                fill="none"
                className="overflow-visible"
              >
                {/* "0" */}
                <motion.ellipse
                  cx="35"
                  cy="35"
                  rx="22"
                  ry="30"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-fg/60"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    pathLength: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 },
                    opacity:   { duration: 0.4, delay: 0.3 },
                  }}
                />
                {/* "9" */}
                <motion.path
                  d="M80 35 C80 15, 115 15, 115 35 C115 55, 80 55, 80 35 L80 70"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                  className="text-fg/60"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    pathLength: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 },
                    opacity:   { duration: 0.4, delay: 0.5 },
                  }}
                />
                {/* accent dot inside "0" */}
                <motion.circle
                  cx="35"
                  cy="35"
                  r="2"
                  fill="currentColor"
                  className="text-accent"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </svg>
            </motion.div>

            {/* progress */}
            <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="text-micro font-mono tracking-[0.25em] text-fg/40">
                INITIALIZING
              </div>

              <div className="w-48 h-px bg-white/[0.06] relative overflow-hidden rounded-full">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-fg/30 rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.15, ease: "linear" }}
                />
              </div>

              <div className="text-micro font-mono tracking-[0.2em] text-fg/20 tabular-nums">
                {String(progress).padStart(3, "0")}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
