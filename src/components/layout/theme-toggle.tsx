"use client"

import { useTheme } from "@/components/shared/theme-provider"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#F5F5F5] hover:bg-white/10 transition-colors"
    >
      {theme === "light" ? <Sun className="h-4 w-4 text-[#111]" /> : <Moon className="h-4 w-4 text-[#F5F5F5]" />}
    </button>
  )
}
