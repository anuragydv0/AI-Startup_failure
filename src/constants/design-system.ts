export const colors = {
  background: "#050505",
  surface: "#0D0D0D",
  card: "rgba(255, 255, 255, 0.03)",
  accentRed: "#FF3B30",
  accentAmber: "#FFB020",
  text: "#F5F5F5",
  muted: "#8A8A8A",
} as const

export const spacing = {
  "2xs": "0.25rem",
  xs: "0.5rem",
  sm: "0.75rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "3rem",
  "3xl": "4rem",
  "4xl": "6rem",
} as const

export const radii = {
  sm: "0.5rem",
  md: "0.75rem",
  lg: "1rem",
  xl: "1.5rem",
  pill: "9999px",
} as const

export const shadows = {
  glowRed: "0 0 30px rgba(255, 59, 48, 0.35)",
  glowAmber: "0 0 30px rgba(255, 176, 32, 0.25)",
  card: "0 16px 48px rgba(0, 0, 0, 0.45)",
} as const

export const typography = {
  heading: "var(--font-space-grotesk)",
  body: "var(--font-inter)",
  accent: "var(--font-satoshi)",
} as const

export const motionTokens = {
  fast: 0.2,
  base: 0.45,
  slow: 0.8,
  cinematic: 1.2,
  staggerFast: 0.05,
  staggerBase: 0.1,
  staggerSlow: 0.16,
} as const
