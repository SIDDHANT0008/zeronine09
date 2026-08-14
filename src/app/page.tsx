"use client";

import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import {
  Mail,
  ArrowRight,
  Check,
  Loader2,
  Zap,
} from "lucide-react";
import confetti from "canvas-confetti";

/* ══════════════════════════════════════════════════════════
   MOTION VARIANTS
   ══════════════════════════════════════════════════════════ */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.15,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

/* ══════════════════════════════════════════════════════════
   BACKGROUND — AMBIENT ORB
   ══════════════════════════════════════════════════════════ */

function AmbientOrb() {
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* single subtle emerald glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 600,
          height: 600,
          left: "50%",
          top: "30%",
          background:
            "radial-gradient(circle, rgba(52,211,153,0.12) 0%, transparent 70%)",
          filter: "blur(100px)",
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          x: [0, 30, -20, 10, 0],
          y: [0, -20, 30, -10, 0],
          scale: [1, 1.08, 0.96, 1.04, 1],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* faint secondary orb */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 400,
          height: 400,
          right: "-5%",
          bottom: "10%",
          background:
            "radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, -20, 15, 0],
          y: [0, 15, -20, 0],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   HEADER
   ══════════════════════════════════════════════════════════ */

function Header() {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-12"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      custom={0}
    >
      <motion.div
        className="flex items-center gap-2.5"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <Zap className="h-5 w-5 text-emerald-400" strokeWidth={2.5} />
        <span className="text-lg font-semibold tracking-[0.25em] text-white/90">
          ZORONINE
        </span>
      </motion.div>

      <motion.span
        className="hidden items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-emerald-400/70 sm:flex"
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </span>
        Coming Soon
      </motion.span>
    </motion.header>
  );
}

/* ══════════════════════════════════════════════════════════
   NOTIFY FORM
   ══════════════════════════════════════════════════════════ */

function NotifyForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const fireConfetti = useCallback(() => {
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };
    const end = Date.now() + 1200;

    const frame = () => {
      confetti({
        ...defaults,
        particleCount: 30,
        origin: { x: Math.random(), y: Math.random() * 0.3 },
        colors: ["#34d399", "#22d3ee", "#a78bfa", "#ffffff"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1400));
    setStatus("success");
    fireConfetti();

    setTimeout(() => {
      setStatus("idle");
      setEmail("");
    }, 3500);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm flex-col gap-3 sm:flex-row"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={4}
    >
      <div className="relative flex-1">
        <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading" || status === "success"}
          className="input-glow glass w-full rounded-lg py-3 pl-10 pr-4 text-sm text-white placeholder-zinc-600 outline-none transition-all duration-300 focus:border-emerald-500/30 disabled:opacity-50"
        />
      </div>

      <motion.button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className="relative flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-emerald-500 px-5 py-3 text-sm font-semibold text-black transition-colors duration-300 hover:bg-emerald-400 disabled:cursor-not-allowed"
        whileHover={{
          scale: 1.03,
          boxShadow: "0 0 24px rgba(52,211,153,0.35)",
        }}
        whileTap={{ scale: 0.97 }}
      >
        <motion.div
          className="absolute inset-0 rounded-lg bg-emerald-400"
          animate={{ opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "blur(18px)", zIndex: -1 }}
        />

        <AnimatePresence mode="wait">
          {status === "idle" && (
            <motion.span
              key="idle"
              className="flex items-center gap-1.5"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
            >
              Notify Me <ArrowRight className="h-3.5 w-3.5" />
            </motion.span>
          )}
          {status === "loading" && (
            <motion.span
              key="loading"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
            >
              <Loader2 className="h-4 w-4 animate-spin" />
            </motion.span>
          )}
          {status === "success" && (
            <motion.span
              key="success"
              className="flex items-center gap-1.5"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -6 }}
            >
              <Check className="h-4 w-4" /> You&apos;re in!
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.form>
  );
}

/* ══════════════════════════════════════════════════════════
   SOCIAL ICONS
   ══════════════════════════════════════════════════════════ */

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21.5c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
  </svg>
);

const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

function MagneticIcon({
  children,
  href,
  label,
}: {
  children: React.ReactNode;
  href: string;
  label: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const tx = useTransform(x, (v) => `${v * 0.25}px`);
  const ty = useTransform(y, (v) => `${v * 0.25}px`);

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] text-zinc-500 transition-colors hover:border-emerald-500/20 hover:text-emerald-400"
      style={{ x: tx, y: ty }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.a>
  );
}

function Footer() {
  const socials = [
    { icon: <XIcon />, href: "#", label: "Twitter / X" },
    { icon: <GithubIcon />, href: "#", label: "GitHub" },
    { icon: <DiscordIcon />, href: "#", label: "Discord" },
    { icon: <LinkedinIcon />, href: "#", label: "LinkedIn" },
  ];

  return (
    <motion.footer
      className="flex flex-col items-center gap-5"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={6}
    >
      <div className="flex items-center gap-2.5">
        {socials.map((s, i) => (
          <motion.div
            key={s.label}
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            custom={7 + i}
          >
            <MagneticIcon href={s.href} label={s.label}>
              {s.icon}
            </MagneticIcon>
          </motion.div>
        ))}
      </div>
      <p className="text-[11px] text-zinc-700">
        © {new Date().getFullYear()} ZORONINE
      </p>
    </motion.footer>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════════════════ */

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      {/* background */}
      <AmbientOrb />

      {/* subtle grain texture overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* content */}
      <div className="relative z-10 flex w-full max-w-lg flex-col items-center gap-8 text-center">
        <Header />

        {/* mobile badge */}
        <motion.div
          className="mt-20 flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-3.5 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-emerald-400/60 sm:hidden"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          Coming Soon
        </motion.div>

        {/* headline */}
        <motion.h1
          className="gradient-text text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          Where Ideas
          <br />
          Become Digital
        </motion.h1>

        {/* divider */}
        <motion.div
          className="h-px w-12 bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
        />

        {/* subtext */}
        <motion.p
          className="max-w-sm text-sm leading-relaxed text-zinc-500 sm:text-base"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          A next-generation experience is on the way.
          <br className="hidden sm:block" /> Be the first to know.
        </motion.p>

        {/* form */}
        <NotifyForm />

        {/* spacer */}
        <div className="pt-6">
          <Footer />
        </div>
      </div>
    </div>
  );
}
