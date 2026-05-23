"use client"

import { motion } from "framer-motion"
import { AlertOctagon, Clock, Users, DollarSign, Layers, Activity } from "lucide-react"
import { useTheme } from "@/components/shared/theme-provider"

interface InsightCardProps {
  title: string
  value: string
  detail?: string
  tone?: "danger" | "warning" | "success" | "neutral"
  icon: any
  progress: number
}

function InsightCard({ title, value, detail, tone = "neutral", icon: Icon, progress }: InsightCardProps) {
  const { theme } = useTheme()

  const toneConfig = {
    danger: {
      dark: "border-[#FF3B30]/20 bg-gradient-to-tr from-[#2a0808]/40 to-[#0A0A0A]/60 shadow-[0_8px_32px_rgba(255,59,48,0.06)] hover:border-[#FF3B30]/50",
      light: "border-[#FF3B30]/20 bg-gradient-to-tr from-[#FF3B30]/5 to-[#FFFFFF]/80 shadow-[0_8px_32px_rgba(255,59,48,0.02)] hover:border-[#FF3B30]/40",
      iconColor: "text-[#FF3B30]",
      glowColor: "rgba(255, 59, 48, 0.4)",
      barBg: "from-[#FFB020] to-[#FF3B30]"
    },
    warning: {
      dark: "border-[#FFB020]/20 bg-gradient-to-tr from-[#201205]/40 to-[#0A0A0A]/60 shadow-[0_8px_32px_rgba(255,176,32,0.06)] hover:border-[#FFB020]/50",
      light: "border-[#FFB020]/20 bg-gradient-to-tr from-[#FFB020]/5 to-[#FFFFFF]/80 shadow-[0_8px_32px_rgba(255,176,32,0.02)] hover:border-[#FFB020]/40",
      iconColor: "text-[#FFB020]",
      glowColor: "rgba(255, 176, 32, 0.4)",
      barBg: "from-[#FFD60A] to-[#FFB020]"
    },
    success: {
      dark: "border-[#34C759]/20 bg-gradient-to-tr from-[#051c0a]/40 to-[#0A0A0A]/60 shadow-[0_8px_32px_rgba(52,199,89,0.06)] hover:border-[#34C759]/50",
      light: "border-[#34C759]/20 bg-gradient-to-tr from-[#34C759]/5 to-[#FFFFFF]/80 shadow-[0_8px_32px_rgba(52,199,89,0.02)] hover:border-[#34C759]/40",
      iconColor: "text-[#34C759]",
      glowColor: "rgba(52, 199, 89, 0.4)",
      barBg: "from-[#30B0C0] to-[#34C759]"
    },
    neutral: {
      dark: "border-white/5 bg-gradient-to-tr from-white/[0.01] to-[#0A0A0A]/60 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-white/15",
      light: "border-black/5 bg-[#FFFFFF]/70 shadow-[0_8px_32px_rgba(0,0,0,0.02)] hover:border-black/15",
      iconColor: "text-[#8A8A8A]",
      glowColor: "rgba(138, 138, 138, 0.2)",
      barBg: "from-[#8A8A8A] to-[#F5F5F5]"
    }
  }

  const activeStyles = theme === "light" ? toneConfig[tone].light : toneConfig[tone].dark

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`rounded-2xl border p-5 backdrop-blur-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between group ${activeStyles}`}
    >
      {/* Dynamic light sweep sweep effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-0">
        <motion.div 
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          className="absolute w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
        />
      </div>

      <div className="flex items-start gap-4 relative z-10">
        {/* Glowing Icon Container */}
        <div 
          style={{ filter: `drop-shadow(0 0 8px ${toneConfig[tone].glowColor})` }}
          className={`rounded-xl p-3 shrink-0 ${
            theme === "light" ? "bg-black/5" : "bg-white/5"
          } ${toneConfig[tone].iconColor}`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <span className={`text-[10px] font-mono tracking-widest uppercase ${theme === "light" ? "text-[#666666]" : "text-[#8A8A8A]"}`}>
            {title}
          </span>
          <div className={`mt-2 font-grotesk text-2xl font-black tracking-tight truncate ${
            theme === "light" ? "text-[#111111]" : "text-[#F5F5F5]"
          }`}>
            {value}
          </div>
          {detail && (
            <p className={`mt-1 text-xs truncate ${theme === "light" ? "text-[#666666]" : "text-[#8A8A8A]"}`}>
              {detail}
            </p>
          )}
        </div>
      </div>

      {/* Mini Progress Bar Indicator */}
      <div className="mt-4 w-full relative z-10">
        <div className={`h-1.5 w-full rounded-full overflow-hidden ${
          theme === "light" ? "bg-black/5" : "bg-white/5"
        }`}>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className={`h-full rounded-full bg-gradient-to-r ${toneConfig[tone].barBg}`}
          />
        </div>
      </div>
    </motion.div>
  )
}

export function InsightCards({ analysis }: { analysis?: any }) {
  // Extract custom parameters or fallback to seed report values
  const biggestThreat = analysis?.biggest_threat || "Copycat Density"
  const saturation = analysis?.market_analysis?.saturation_level || "High"
  const fundingDiff = analysis?.funding_risk?.dilution_risk || "Significant"
  const competitorDensity = analysis?.market_analysis?.tam_signal ? "Intense" : "Extreme"
  const survivalProb = analysis?.investor_readiness?.score ? `${analysis.investor_readiness.score}%` : "43%"
  const timeToCrisis = analysis?.funding_risk?.runway_risk ? "8 Months" : "8 Months"

  const cards = [
    {
      title: "Biggest Threat",
      value: biggestThreat,
      detail: "Incumbent aggression vectors",
      tone: "danger" as const,
      icon: AlertOctagon,
      progress: 84
    },
    {
      title: "Market Saturation",
      value: saturation,
      detail: "18 direct market copycats",
      tone: "danger" as const,
      icon: Layers,
      progress: 91
    },
    {
      title: "Funding Difficulty",
      value: fundingDiff,
      detail: "Runway capital availability caps",
      tone: "warning" as const,
      icon: DollarSign,
      progress: 68
    },
    {
      title: "Competitor Density",
      value: competitorDensity,
      detail: "Severe capital burning ocean",
      tone: "danger" as const,
      icon: Users,
      progress: 88
    },
    {
      title: "Survival Probability",
      value: survivalProb,
      detail: "Required operational adjustments",
      tone: "warning" as const,
      icon: Activity,
      progress: 43
    },
    {
      title: "Time to Crisis",
      value: timeToCrisis,
      detail: "Forensic runway deplete window",
      tone: "danger" as const,
      icon: Clock,
      progress: 76
    }
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <InsightCard key={card.title} {...card} />
      ))}
    </div>
  )

}
