"use client"

import { motion } from "framer-motion"
import type { AIAnalysis } from "@/backend/models/analysis"
import { Card } from "@/components/ui/card"
import { AlertTriangle, CheckCircle2, AlertCircle } from "lucide-react"

interface CategoryScoresProps {
  scores: AIAnalysis["category_scores"]
}

const categoryDescriptions = {
  market_clarity:
    "Does the founder understand their market size, dynamics, and positioning?",
  team_strength:
    "Do they have the skills and experience to execute this vision?",
  financial_realism:
    "Are the financial projections based on real data, not wishful thinking?",
  differentiation: "Why will customers choose this over existing solutions?",
  execution_risk: "How hard is the actual execution vs. the pitch claims?",
}

function getRiskIcon(score: number) {
  if (score >= 70) return <AlertTriangle className="h-5 w-5 text-[#FF3B30]" />
  if (score >= 40) return <AlertCircle className="h-5 w-5 text-[#FFB020]" />
  return <CheckCircle2 className="h-5 w-5 text-[#34C759]" />
}

function getRiskColor(score: number) {
  if (score >= 70) return "bg-[#FF3B30]/20 border-[#FF3B30]/40"
  if (score >= 40) return "bg-[#FFB020]/20 border-[#FFB020]/40"
  return "bg-[#34C759]/20 border-[#34C759]/40"
}

function getBarColor(score: number) {
  if (score >= 70) return "bg-gradient-to-r from-[#FF3B30] to-[#CC2D26]"
  if (score >= 40) return "bg-gradient-to-r from-[#FFB020] to-[#FF9500]"
  return "bg-gradient-to-r from-[#34C759] to-[#30B0C0]"
}

export function CategoryScores({ scores }: CategoryScoresProps) {
  const categories = Object.entries(scores) as Array<
    [keyof typeof scores, number]
  >

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  }

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="space-y-2">
        <h3 className="font-grotesk text-xl font-bold text-[#F5F5F5]">
          Risk Breakdown by Category
        </h3>
        <p className="text-sm text-[#8A8A8A]">
          Each category scored 0-100 (higher = more risk)
        </p>
      </div>

      {categories.map(([category, score], index) => (
        <motion.div key={category} variants={itemVariants}>
          <Card
            className={`border p-4 transition-all hover:border-[#FF3B30]/60 ${getRiskColor(score)}`}
          >
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {getRiskIcon(score)}
                    <h4 className="font-grotesk font-bold capitalize text-[#F5F5F5]">
                      {category.replace(/_/g, " ")}
                    </h4>
                  </div>
                  <p className="mt-1 text-xs text-[#8A8A8A]">
                    {
                      categoryDescriptions[
                        category as keyof typeof categoryDescriptions
                      ]
                    }
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-grotesk text-2xl font-bold text-[#FF3B30]">
                    {score}
                  </span>
                  <span className="text-xs text-[#8A8A8A]">/100</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-2 w-full rounded-full bg-[#1A1A1A]">
                <motion.div
                  className={`h-full rounded-full ${getBarColor(score)}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${score}%` }}
                  transition={{ delay: 0.1 * (index + 1), duration: 0.8 }}
                />
              </div>

              {/* Risk assessment */}
              <div className="flex items-center gap-2 text-xs font-semibold">
                {score >= 70 && (
                  <>
                    <div className="h-2 w-2 rounded-full bg-[#FF3B30]" />
                    <span className="text-[#FF3B30]">Critical Risk</span>
                  </>
                )}
                {score >= 40 && score < 70 && (
                  <>
                    <div className="h-2 w-2 rounded-full bg-[#FFB020]" />
                    <span className="text-[#FFB020]">Significant Risk</span>
                  </>
                )}
                {score < 40 && (
                  <>
                    <div className="h-2 w-2 rounded-full bg-[#34C759]" />
                    <span className="text-[#34C759]">Manageable Risk</span>
                  </>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
