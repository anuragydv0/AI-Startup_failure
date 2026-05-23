"use client"

import { motion } from "framer-motion"
import { TrendingDown } from "lucide-react"
import type { AIAnalysis } from "@/backend/models/analysis"
import { useTheme } from "@/components/shared/theme-provider"

interface ComparableFailuresProps {
  comparisons: AIAnalysis["startup_comparison"]
}

export function ComparableFailures({ comparisons }: ComparableFailuresProps) {
  const { theme } = useTheme()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  }

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <TrendingDown className="h-5 w-5 text-[#FFB020]" />
          <h3 className={`font-grotesk text-xl font-bold tracking-tight ${
            theme === "light" ? "text-[#111111]" : "text-[#F5F5F5]"
          }`}>
            Similar Startup Autopsies
          </h3>
        </div>
        <p className={`text-sm ${theme === "light" ? "text-[#666666]" : "text-[#8A8A8A]"}`}>
          Studying pattern recognition metrics from dead predecessors who navigated similar commercial pitfalls.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {comparisons.map((comparison, index) => {
          // Circular progress dimensions
          const size = 64
          const radius = 26
          const circ = 2 * Math.PI * radius
          const strokeOffset = circ - (comparison.similarity / 100) * circ

          return (
            <motion.div key={index} variants={itemVariants}>
              <div 
                className={`glass-panel rounded-2xl border p-5 transition-all duration-300 relative group flex items-start justify-between gap-4 ${
                  theme === "light" 
                    ? "border-black/5 bg-[#FFFFFF]/70 hover:border-[#FFB020]/40" 
                    : "border-white/5 bg-[#0D0D0D]/60 hover:border-[#FFB020]/40 hover:bg-[#0D0D0D]/80"
                }`}
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    {/* Grayscale-to-Color Animated Logo */}
                    <div className="relative h-9 w-9 rounded-xl overflow-hidden shrink-0 border border-white/10 flex items-center justify-center bg-black/80">
                      <div className="absolute inset-0 bg-[#FFB020]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="font-grotesk text-sm font-black text-white grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-115">
                        {comparison.startup_name.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h4 className={`font-grotesk font-bold ${
                        theme === "light" ? "text-[#111111]" : "text-[#F5F5F5]"
                      }`}>
                        {comparison.startup_name}
                      </h4>
                      <span className={`text-[10px] font-mono uppercase tracking-widest ${theme === "light" ? "text-[#666666]" : "text-[#8A8A8A]"}`}>
                        AUTOPSED COMPILATION
                      </span>
                    </div>
                  </div>
                  <p className={`text-xs leading-relaxed ${theme === "light" ? "text-[#666666]" : "text-[#B0B0B0]"}`}>
                    {comparison.reason}
                  </p>
                </div>

                {/* Circular Glowing Similarity Meter */}
                <div className="flex flex-col items-center shrink-0">
                  <div className="relative" style={{ width: size, height: size }}>
                    <svg className="w-full h-full -rotate-90">
                      <circle 
                        cx={size / 2} 
                        cy={size / 2} 
                        r={radius} 
                        fill="none" 
                        stroke={theme === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.04)"} 
                        strokeWidth="4" 
                      />
                      <motion.circle 
                        cx={size / 2} 
                        cy={size / 2} 
                        r={radius} 
                        fill="none" 
                        stroke="#FFB020" 
                        strokeWidth="4" 
                        strokeDasharray={circ}
                        strokeDashoffset={strokeOffset}
                        strokeLinecap="round"
                        style={{ filter: "drop-shadow(0 0 6px #FFB020)" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center font-grotesk font-black text-[#FFB020] text-sm">
                      {comparison.similarity}%
                    </div>
                  </div>
                  <span className={`text-[9px] font-mono tracking-widest uppercase mt-1 ${theme === "light" ? "text-[#666666]" : "text-[#8A8A8A]"}`}>
                    SIMILARITY
                  </span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Warning HUD Box */}
      <motion.div
        className={`rounded-xl border p-4 ${
          theme === "light" 
            ? "border-[#FFB020]/20 bg-[#FFB020]/5 text-[#111111]" 
            : "border-[#FFB020]/20 bg-[#FFB020]/5 text-[#F5F5F5]"
        }`}
        variants={itemVariants}
      >
        <p className="text-xs md:text-sm leading-relaxed font-satoshi">
          <strong>Autopsy Diagnostic:</strong> Your operational coordinates track closely with these failed corporate behaviors. Study the root fatal failure points carefully to construct structural deflections immediately.
        </p>
      </motion.div>
    </motion.div>
  )
}
