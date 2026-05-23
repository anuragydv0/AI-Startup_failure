import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "2.5rem",
      },
    },
    extend: {
      colors: {
        background: "var(--bg)",
        surface: "var(--surface)",
        card: "var(--card)",
        accent: {
          red: "var(--accent-red)",
          amber: "var(--accent-amber)",
        },
        text: {
          primary: "var(--text)",
          muted: "var(--muted)",
        },
      },
      fontFamily: {
        grotesk: ["var(--font-space-grotesk)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        satoshi: ["var(--font-satoshi)", "var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        "card-soft": "0 16px 48px rgba(0, 0, 0, 0.45)",
        "glow-red": "0 0 28px rgba(255, 59, 48, 0.35)",
        "glow-amber": "0 0 28px rgba(255, 176, 32, 0.35)",
      },
    },
  },
  plugins: [],
}
export default config
