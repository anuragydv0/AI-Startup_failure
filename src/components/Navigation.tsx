"use client"

import React from "react"
import { motion } from "framer-motion"

const Navigation = () => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass backdrop-blur-md border-b border-white/5"
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2 font-grotesk font-bold text-xl"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-3 h-3 bg-red-accent rounded-full" />
          <span>FAILFAST</span>
        </motion.div>

        {/* Menu Items */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          {["Features", "Roast Mode", "Dashboard", "Pricing"].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-text-muted hover:text-red-accent transition-colors"
              whileHover={{ textShadow: "0 0 8px rgba(255, 59, 48, 0.5)" }}
            >
              {item}
            </motion.a>
          ))}
        </div>

        {/* CTA Button */}
        <motion.button
          className="px-6 py-2 bg-red-accent/10 border border-red-accent/50 rounded-lg text-red-accent font-semibold hover:bg-red-accent/20 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Sign In
        </motion.button>
      </div>
    </motion.nav>
  )
}

export default Navigation
