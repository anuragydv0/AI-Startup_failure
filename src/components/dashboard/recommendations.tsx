"use client"

import { motion } from "framer-motion"
import { CheckCircle2, AlertTriangle, TrendingUp, ArrowUpRight } from "lucide-react"
import type { AIAnalysis } from "@/backend/models/analysis"
import { useTheme } from "@/components/shared/theme-provider"

interface RecommendationsProps {
  recommendations: AIAnalysis["recommendations"]
}

function getPriorityIcon(priority: string) {
  switch (priority) {
    case "high":
      return <AlertTriangle className="h-5 w-5 text-[#FF3B30] shrink-0" />
    case "medium":
      return <TrendingUp className="h-5 w-5 text-[#FFB020] shrink-0" />
    case "low":
      return <CheckCircle2 className="h-5 w-5 text-[#34C759] shrink-0" />
    default:
      return null
  }
}

export function Recommendations({ recommendations }: RecommendationsProps) {
  const { theme } = useTheme()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  }

  const highPriority = recommendations.filter((r) => r.priority === "high")
  const mediumPriority = recommendations.filter((r) => r.priority === "medium")
  const lowPriority = recommendations.filter((r) => r.priority === "low")

  const allByPriority = [...highPriority, ...mediumPriority, ...lowPriority]

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="space-y-2">
        <h3 className={`font-grotesk text-xl font-bold tracking-tight ${
          theme === "light" ? "text-[#111111]" : "text-[#F5F5F5]"
        }`}>
          Tactical Restructuring Playbook
        </h3>
        <p className={`text-sm ${theme === "light" ? "text-[#666666]" : "text-[#8A8A8A]"}`}>
          High-yield tactical corrections designed to neutralize identified failure hazards and extend runway.
        </p>
      </div>

      <div className="space-y-3">
        {allByPriority.map((rec, index) => {
          // Dynamic styling for card based on theme and priority
          const priorityColorClass = 
            rec.priority === "high"
              ? "border-l-[#FF3B30]"
              : rec.priority === "medium"
                ? "border-l-[#FFB020]"
                : "border-l-[#34C759]"

          const priorityBadgeTextClass = 
            rec.priority === "high"
              ? "text-[#FF3B30]"
              : rec.priority === "medium"
                ? (theme === "light" ? "text-[#D97706]" : "text-[#FFB020]")
                : (theme === "light" ? "text-[#16A34A]" : "text-[#34C759]")

          return (
            <motion.div key={index} variants={itemVariants}>
              <div
                className={`glass-panel border-l-4 rounded-2xl border p-5 transition-all duration-300 relative group flex flex-col justify-between gap-3 ${priorityColorClass} ${
                  theme === "light"
                    ? "border-black/5 bg-[#FFFFFF]/70 hover:bg-[#FFFFFF] hover:shadow-md"
                    : "border-white/5 bg-[#0D0D0D]/60 hover:bg-[#0D0D0D]/80 hover:border-r-white/10"
                }`}
              >
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start gap-3">
                    {getPriorityIcon(rec.priority)}
                    <div className="flex-1 space-y-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <h4 className={`font-grotesk font-bold ${
                          theme === "light" ? "text-[#111111]" : "text-[#F5F5F5]"
                        }`}>
                          {rec.title}
                        </h4>
                        <span className={`text-[10px] font-mono tracking-wider uppercase font-black shrink-0 ${priorityBadgeTextClass}`}>
                          [{rec.priority} Priority]
                        </span>
                      </div>
                      <p className={`text-sm leading-relaxed transition-colors ${
                        theme === "light" ? "text-[#444444]" : "text-[#B0B0B0]"
                      }`}>
                        {rec.action}
                      </p>
                    </div>
                  </div>

                  {/* Actionability indicator */}
                  <div className={`flex items-center gap-2 text-xs font-mono ${
                    theme === "light" ? "text-[#666666]" : "text-[#8A8A8A]"
                  }`}>
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    <span>
                      {rec.priority === "high"
                        ? "CRITICAL MANDATE - EXECUTE PRIOR TO FUNDING RUN"
                        : rec.priority === "medium"
                          ? "STRATEGIC INITIATIVE - SCHEDULE NEXT OPERATIONAL CYCLE"
                          : "TACTICAL OPTIMIZATION - EXECUTE WHEN RUNWAY PERMITS"}
                    </span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Call to action */}
      <motion.div
        className={`rounded-xl border p-5 transition-colors duration-300 ${
          theme === "light"
            ? "border-[#34C759]/40 bg-[#34C759]/5 text-[#111111]"
            : "border-[#34C759]/20 bg-[#34C759]/5 text-[#F5F5F5]"
        }`}
        variants={itemVariants}
      >
        <div className="space-y-2">
          <p className="text-xs md:text-sm leading-relaxed font-satoshi">
            <strong>Operational Roadmap:</strong> These measures are survival-critical. High-priority interventions must be deployed immediately. Failing to pivot your current vectors within the next 90 days will result in a hard landing.
          </p>
          <p className={`text-[10px] font-mono uppercase ${
            theme === "light" ? "text-[#555555]" : "text-[#8A8A8A]"
          }`}>
            * PROJECTIONS ARE CONTINGENT ON RIGOROUS EXECUTION OF THESE STRUCTURAL DEFLECTIONS.
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

