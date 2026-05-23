"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"
import { marketingNavItems } from "@/constants/navigation"
import { brand } from "@/assets/brand"
import { fadeUp } from "@/lib/animations"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#050505]/70 backdrop-blur-2xl"
      variants={fadeUp(16)}
      initial="hidden"
      animate="visible"
    >
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="group inline-flex items-center gap-3 rounded-full px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B30]"
          aria-label="Go to homepage"
        >
          <span className="h-3 w-3 rounded-full bg-[#FF3B30] shadow-[0_0_14px_rgba(255,59,48,0.65)]" />
          <span className="font-grotesk text-lg font-semibold tracking-tight text-[#F5F5F5]">
            {brand.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {marketingNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-[#8A8A8A] transition-colors hover:text-[#F5F5F5]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Button variant="secondary" size="sm">
            Founder Login
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-[#F5F5F5] md:hidden"
          onClick={() => setOpen((current) => !current)}
          aria-controls="mobile-nav"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <nav
        id="mobile-nav"
        className={cn(
          "overflow-hidden border-t border-white/10 bg-[#050505]/95 px-4 transition-[max-height] duration-300 md:hidden",
          open ? "max-h-80 py-4" : "max-h-0 py-0"
        )}
        aria-label="Mobile"
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3">
          {marketingNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm text-[#8A8A8A] hover:bg-white/5 hover:text-[#F5F5F5]"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Button variant="secondary" size="sm">
            Founder Login
          </Button>
        </div>
      </nav>
    </motion.header>
  )
}
