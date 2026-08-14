import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0A0A0A",
          secondary: "#111111",
          tertiary: "#161616",
        },
        fg: {
          DEFAULT: "#F5F5F5",
          secondary: "#E0E0E0",
          muted: "#8A8A8A",
        },
        accent: {
          DEFAULT: "#C8FF00",
          dim: "rgba(200, 255, 0, 0.15)",
        },
        border: {
          DEFAULT: "rgba(255,255,255,0.08)",
          light: "rgba(255,255,255,0.15)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "hero": ["clamp(3rem, 10vw, 12rem)", { lineHeight: "0.9", letterSpacing: "-0.04em" }],
        "hero-mobile": ["clamp(2.5rem, 12vw, 5rem)", { lineHeight: "0.92", letterSpacing: "-0.04em" }],
        "display": ["clamp(2rem, 5vw, 5rem)", { lineHeight: "1", letterSpacing: "-0.03em" }],
        "heading": ["clamp(1.5rem, 3vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "body": ["1rem", { lineHeight: "1.6" }],
        "small": ["0.8125rem", { lineHeight: "1.5", letterSpacing: "0.02em" }],
        "micro": ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.08em" }],
      },
      spacing: {
        "section": "clamp(80px, 12vw, 160px)",
      },
      borderRadius: {
        "sm": "4px",
        "md": "8px",
        "lg": "12px",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-quint": "cubic-bezier(0.22, 1, 0.36, 1)",
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "reveal": "reveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-dot": "pulseDot 2s ease-in-out infinite",
        "grain": "grain 8s steps(10) infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        reveal: {
          "0%": { clipPath: "inset(0 100% 0 0)" },
          "100%": { clipPath: "inset(0 0% 0 0)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "20%": { transform: "translate(-15%, 5%)" },
          "30%": { transform: "translate(7%, -25%)" },
          "40%": { transform: "translate(-5%, 25%)" },
          "50%": { transform: "translate(-15%, 10%)" },
          "60%": { transform: "translate(15%, 0%)" },
          "70%": { transform: "translate(0%, 15%)" },
          "80%": { transform: "translate(3%, 35%)" },
          "90%": { transform: "translate(-10%, 10%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
