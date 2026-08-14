"use client";

import { useEffect, useRef } from "react";

/**
 * Canvas-based dot grid that reacts to cursor proximity.
 * Each dot grows and brightens when the pointer is within influenceRadius.
 */

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: 0, y: 0 });
  const animRef   = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width  = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width  = window.innerWidth;
      height = window.innerHeight;
      canvas.width  = width  * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width  = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    const GRID_SIZE       = 60;
    const DOT_SIZE        = 1;
    const INFLUENCE_RADIUS = 200;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width  / GRID_SIZE) + 1;
      const rows = Math.ceil(height / GRID_SIZE) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * GRID_SIZE;
          const y = j * GRID_SIZE;

          const dx   = mouseRef.current.x - x;
          const dy   = mouseRef.current.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const influence = Math.max(0, 1 - dist / INFLUENCE_RADIUS);
          const size    = DOT_SIZE + influence * 3;
          const opacity = 0.08 + influence * 0.25;

          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.fill();
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
