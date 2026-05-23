import type { Metadata } from "next"
import type { ReactNode } from "react"
import { ThemeProvider } from "@/components/shared/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "💀 DEADPOOL AI — AI Startup Failure Autopsy",
  description:
    "Upload your pitch deck and let DEADPOOL AI brutally analyze why your startup will fail before investors reject it.",
  openGraph: {
    title: "💀 DEADPOOL AI — AI Startup Failure Autopsy",
    description:
      "Upload your pitch deck and let DEADPOOL AI brutally analyze why your startup will fail before investors reject it.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "💀 DEADPOOL AI — AI Startup Failure Autopsy",
    description:
      "Upload your pitch deck and let DEADPOOL AI brutally analyze why your startup will fail before investors reject it.",
  },
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen overflow-x-hidden bg-[var(--bg)] font-inter text-[var(--text)] antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
