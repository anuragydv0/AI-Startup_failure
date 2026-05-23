"use client"
import { motion } from "framer-motion"
import { AlertTriangle } from "lucide-react"
import type { AIAnalysis } from "@/backend/models/analysis"
import { useTheme } from "@/components/shared/theme-provider"

interface FailureReasonsProps {
  reasons: AIAnalysis["top_failure_reasons"]
}

export function FailureReasons({ reasons }: FailureReasonsProps) {
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
          <AlertTriangle className="h-5 w-5 text-[#FF3B30] animate-pulse" />
          <h3 className={`font-grotesk text-xl font-bold tracking-tight ${
            theme === "light" ? "text-[#111111]" : "text-[#F5F5F5]"
          }`}>
            Existential Failure Hazards
          </h3>
        </div>
        <p className={`text-sm ${theme === "light" ? "text-[#666666]" : "text-[#8A8A8A]"}`}>
          Granular structural vulnerabilities detected during deck processing that directly trigger liquidation risks.
        </p>
      </div>

      <div className="space-y-4">
        {reasons.map((reason, index) => (
          <motion.div key={index} variants={itemVariants}>
            <div 
              className={`glass-panel border-l-4 border-l-[#FF3B30] rounded-2xl border p-5 transition-all duration-300 relative group flex gap-4 ${
                theme === "light" 
                  ? "border-black/5 bg-[#FFFFFF]/70 hover:bg-[#FFFFFF] hover:border-[#FF3B30]/60 hover:shadow-md" 
                  : "border-white/5 bg-[#0D0D0D]/60 hover:border-[#FF3B30]/40 hover:bg-[#0D0D0D]/80"
              }`}
            >
              {/* Radial glow background effect on hover */}
              {theme !== "light" && (
                <div className="absolute inset-0 -z-10 bg-radial-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" 
                     style={{
                       background: "radial-gradient(400px circle at var(--x, 50%) var(--y, 50%), rgba(255, 59, 48, 0.05), transparent 80%)"
                     }}
                />
              )}

              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-grotesk font-black text-sm transition-all duration-300 ${
                theme === "light" 
                  ? "bg-[#FF3B30]/10 text-[#FF3B30] group-hover:scale-110" 
                  : "bg-[#FF3B30]/20 text-[#FF3B30] group-hover:bg-[#FF3B30]/35 group-hover:scale-110"
              }`}>
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className="flex-1 space-y-1.5">
                <p className={`leading-relaxed font-medium transition-colors ${
                  theme === "light" ? "text-[#111111]" : "text-[#F5F5F5]"
                }`}>
                  {reason}
                </p>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono tracking-widest uppercase ${
                    theme === "light" ? "text-[#888888]" : "text-[#555555]"
                  }`}>
                    RISK CLASS: SEVERE
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF3B30] animate-ping" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary box */}
      <motion.div
        className={`rounded-xl border p-4 transition-colors duration-300 ${
          theme === "light" 
            ? "border-[#FF3B30]/30 bg-[#FF3B30]/5 text-[#111111]" 
            : "border-[#FF3B30]/25 bg-[#FF3B30]/5 text-[#F5F5F5]"
        }`}
        variants={itemVariants}
      >
        <p className="text-xs md:text-sm leading-relaxed font-satoshi">
          <strong>Blunt Autopsy Diagnostics:</strong> These are existential operations gaps. Each represents a catastrophic single point of failure that will trigger terminal capital collapse. Corrective restructuring is demanded immediately.
        </p>
      </motion.div>
    </motion.div>
  )
}

