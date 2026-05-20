/**
 * FAILFAST AI - Color System
 * 
 * Centralized color definitions for consistent
 * design language throughout the application.
 */

export const COLORS = {
  // Primary
  background: {
    primary: "#050505",
    secondary: "#0D0D0D",
    tertiary: "#1A1A1A",
  },

  // Accents
  accent: {
    red: "#FF3B30",
    redHover: "#FF5B50",
    redDark: "#E8271F",
    amber: "#FFB020",
    amberHover: "#FFC540",
    amberDark: "#E89D00",
  },

  // Text
  text: {
    primary: "#F5F5F5",
    secondary: "#E0E0E0",
    muted: "#8A8A8A",
    mutedHover: "#A0A0A0",
  },

  // Semantic
  status: {
    success: "#4ADE80",
    warning: "#FFB020",
    error: "#FF3B30",
    info: "#3B82F6",
  },

  // Gradients
  gradient: {
    redToAmber: "linear-gradient(45deg, #FF3B30, #FFB020)",
    darkTrans: "linear-gradient(180deg, rgba(5, 5, 5, 0.8), rgba(5, 5, 5, 0))",
    accentRadial:
      "radial-gradient(circle, rgba(255, 59, 48, 0.2), transparent)",
  },

  // Glass effects
  glass: {
    light: "rgba(255, 255, 255, 0.1)",
    medium: "rgba(255, 255, 255, 0.15)",
    dark: "rgba(255, 255, 255, 0.05)",
  },
}

// Tailwind class utilities
export const COLOR_CLASSES = {
  background: "bg-black-primary",
  backgroundSecondary: "bg-black-secondary",
  textPrimary: "text-text-primary",
  textMuted: "text-text-muted",
  accentRed: "text-red-accent",
  accentAmber: "text-amber-accent",
  borderRed: "border-red-accent",
  borderAmber: "border-amber-accent",
}

// Glow/Shadow utilities
export const GLOWS = {
  red: "drop-shadow(0 0 20px rgba(255, 59, 48, 0.5))",
  redLarge: "drop-shadow(0 0 40px rgba(255, 59, 48, 0.8))",
  amber: "drop-shadow(0 0 20px rgba(255, 176, 32, 0.5))",
  none: "drop-shadow(0 0 0px transparent)",
}
