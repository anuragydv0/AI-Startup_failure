import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "black-primary": "#050505",
        "black-secondary": "#0D0D0D",
        "red-accent": "#FF3B30",
        "amber-accent": "#FFB020",
        "text-primary": "#F5F5F5",
        "text-muted": "#8A8A8A",
      },
      fontFamily: {
        grotesk: ["var(--font-space-grotesk)"],
        satoshi: ["var(--font-satoshi)"],
        inter: ["var(--font-inter)"],
      },
      animation: {
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        glow: "glow 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        slideUp: "slideUp 0.6s ease-out",
        glitch: "glitch 0.3s infinite",
      },
      keyframes: {
        glow: {
          "0%, 100%": { opacity: "1", filter: "drop-shadow(0 0 8px rgba(255, 59, 48, 0.5))" },
          "50%": { opacity: "0.8", filter: "drop-shadow(0 0 16px rgba(255, 59, 48, 0.8))" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        glitch: {
          "0%": { clipPath: "inset(40% 0 61% 0)" },
          "20%": { clipPath: "inset(92% 0 1% 0)" },
          "40%": { clipPath: "inset(43% 0 1% 0)" },
          "60%": { clipPath: "inset(25% 0 58% 0)" },
          "80%": { clipPath: "inset(54% 0 7% 0)" },
          "100%": { clipPath: "inset(58% 0 43% 0)" },
        },
      },
      backdropFilter: {
        glass: "backdrop-blur-20px",
      },
      boxShadow: {
        glow: "0 0 20px rgba(255, 59, 48, 0.5)",
        "glow-lg": "0 0 40px rgba(255, 59, 48, 0.8)",
      },
    },
  },
  plugins: [],
}
export default config
