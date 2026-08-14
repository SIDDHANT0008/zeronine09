"use client";

import { useEffect, useRef } from "react";

/**
 * Custom cursor with three layers:
 *  • dot   – follows the pointer exactly (1-frame latency)
 *  • ring  – follows with a smooth lerp, expands on interactive hover
 *  • label – accent-coloured text that appears inside the ring on hover
 *
 * Disabled on mobile (≤768px) via CSS and JS guard.
 */

interface CursorState {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  isHovering: boolean;
  label: string;
  isVisible: boolean;
}

export default function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<CursorState>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    isHovering: false,
    label: "",
    isVisible: false,
  });
  const animRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const state = stateRef.current;

    /* ---- mouse tracking ---- */
    const onMove = (e: MouseEvent) => {
      state.targetX = e.clientX;
      state.targetY = e.clientY;
      if (!state.isVisible) {
        state.isVisible = true;
        if (dotRef.current)  dotRef.current.style.opacity  = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
      }
    };

    const onLeave = () => {
      state.isVisible = false;
      if (dotRef.current)   dotRef.current.style.opacity   = "0";
      if (ringRef.current)  ringRef.current.style.opacity  = "0";
      if (labelRef.current) labelRef.current.style.opacity = "0";
    };

    /* ---- animation loop ---- */
    const animate = () => {
      const lerp = 0.08;
      state.x += (state.targetX - state.x) * lerp;
      state.y += (state.targetY - state.y) * lerp;

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${state.targetX}px, ${state.targetY}px) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        const size = state.isHovering ? 56 : 36;
        ringRef.current.style.transform =
          `translate(${state.x}px, ${state.y}px) translate(-50%, -50%)`;
        ringRef.current.style.width  = `${size}px`;
        ringRef.current.style.height = `${size}px`;
      }

      if (labelRef.current) {
        labelRef.current.style.transform =
          `translate(${state.x}px, ${state.y}px) translate(-50%, -50%)`;
        labelRef.current.style.opacity =
          state.isHovering && state.label ? "1" : "0";
      }

      animRef.current = requestAnimationFrame(animate);
    };

    /* ---- interactive element detection ---- */
    const onEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      state.isHovering = true;
      state.label = el.getAttribute("data-cursor") || "";
      if (ringRef.current) ringRef.current.style.borderColor = "rgba(200, 255, 0, 0.4)";
    };

    const onItemLeave = () => {
      state.isHovering = false;
      state.label = "";
      if (ringRef.current) ringRef.current.style.borderColor = "rgba(245, 245, 245, 0.2)";
    };

    const setupTargets = () => {
      document
        .querySelectorAll('a, button, [data-cursor], input, textarea, select, [role="button"]')
        .forEach((el) => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onItemLeave);
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onItemLeave);
        });
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    animRef.current = requestAnimationFrame(animate);

    setupTargets();
    const obs = new MutationObserver(setupTargets);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(animRef.current);
      obs.disconnect();
    };
  }, []);

  return (
    <>
      {/* tight dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-1.5 h-1.5 rounded-full bg-fg opacity-0 hidden md:block"
        style={{ willChange: "transform" }}
        aria-hidden="true"
      />

      {/* lagging ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full border border-fg/20 opacity-0 hidden md:block transition-[width,height,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ width: 36, height: 36, willChange: "transform,width,height" }}
        aria-hidden="true"
      />

      {/* hover label */}
      <div
        ref={labelRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none opacity-0 hidden md:block"
        style={{ willChange: "transform,opacity" }}
        aria-hidden="true"
      >
        <span className="text-[10px] font-mono font-medium tracking-[0.2em] text-accent uppercase whitespace-nowrap">
          {stateRef.current.label}
        </span>
      </div>
    </>
  );
}
