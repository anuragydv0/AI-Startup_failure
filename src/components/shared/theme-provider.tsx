"use client"

import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react"

type ThemeMode = "dark" | "light"

type ThemeContextValue = {
  theme: ThemeMode
  toggleTheme: () => void
  setTheme: (theme: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") return "dark"

  const storedTheme = window.localStorage.getItem("theme")
  if (storedTheme === "dark" || storedTheme === "light") return storedTheme

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
}

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setThemeState] = useState<ThemeMode>(getInitialTheme)

  useEffect(() => {
    setThemeState(getInitialTheme())
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = theme === "light" ? "light" : "dark"
    root.style.colorScheme = theme
    window.localStorage.setItem("theme", theme)
  }, [theme])

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme: setThemeState,
      toggleTheme: () => setThemeState((current) => (current === "light" ? "dark" : "light")),
    }),
    [theme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }

  return context
}
