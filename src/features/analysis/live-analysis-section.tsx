"use client"

import { Section } from "@/components/ui/section"
import { fadeUp, staggerContainer, viewportDefaults } from "@/lib/animations"
import { motion } from "framer-motion"
import { AnalysisDashboard } from "@/components/dashboard/analysis-dashboard"

export function LiveAnalysisSection() {
  return (
    <Section id="analysis" className="overflow-hidden">
      <div className="mx-auto mb-8 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 border-b border-white/6 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FF3B30]/20 bg-[#FF3B30]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#FFB0AA]">
              Live Autopsy
            </div>
            <h2 className="font-grotesk text-2xl font-bold text-[#F5F5F5] md:text-3xl">
              Upload once. Watch assumptions collapse.
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-[#8A8A8A] md:text-base">
              AI analysis reveals the exact failure probability, root causes, and the investor rejection logic behind the deck.
            </p>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-xs uppercase tracking-[0.3em] text-[#8A8A8A]">
            Classified result operating system
          </div>
        </div>
      </div>

      <motion.div
        className="space-y-10"
        variants={staggerContainer({ staggerChildren: 0.09 })}
        initial="hidden"
        whileInView="visible"
        viewport={viewportDefaults}
      >
        <motion.div variants={fadeUp(14)}>
          <AnalysisDashboard />
        </motion.div>
      </motion.div>
    </Section>
  )
}
