export const easings = {
  outExpo: [0.16, 1, 0.3, 1],
  outQuint: [0.22, 1, 0.36, 1],
  spring: [0.34, 1.56, 0.64, 1],
  outCirc: [0, 0.55, 0.45, 1],
} as const;

export const durations = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  cinematic: 1.2,
} as const;

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.slow,
      ease: easings.outExpo,
      delay,
    },
  }),
};

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: {
      duration: durations.normal,
      ease: easings.outExpo,
      delay,
    },
  }),
};

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: durations.slow,
      ease: easings.outExpo,
      delay,
    },
  }),
};

export const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easings.outExpo,
    },
  },
};

export const slideInFromLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: durations.slow,
      ease: easings.outExpo,
      delay,
    },
  }),
};

export const slideInFromRight = {
  hidden: { opacity: 0, x: 60 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: durations.slow,
      ease: easings.outExpo,
      delay,
    },
  }),
};

export const clipReveal = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: (delay: number = 0) => ({
    clipPath: "inset(0 0% 0 0)",
    transition: {
      duration: durations.slow,
      ease: easings.outExpo,
      delay,
    },
  }),
};
