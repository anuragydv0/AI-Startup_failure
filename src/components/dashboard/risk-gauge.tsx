"use client"

import { useEffect, useState } from "react"
import { animate, motion, useMotionValue } from "framer-motion"
import { formatPercentage } from "@/lib/utils"
import { clampScore, getRiskStroke } from "@/utils/risk"

interface RiskGaugeProps {
  score: number
}

export function RiskGauge({ score }: RiskGaugeProps) {
  const normalized = clampScore(score)
  const progress = useMotionValue(0)
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const controls = animate(progress, normalized, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (value) => setDisplayValue(Math.round(value)),
    })
    return () => controls.stop()
  }, [normalized, progress])

  const radius = 88
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference - (displayValue / 100) * circumference
  const stroke = getRiskStroke(displayValue)

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[260px]">
      <svg viewBox="0 0 220 220" className="-rotate-90">
        <circle
          cx={110}
          cy={110}
          r={radius}
          stroke="rgba(255,255,255,0.12)"
          strokeWidth={8}
          fill="none"
        />
        <motion.circle
          cx={110}
          cy={110}
          r={radius}
          stroke={stroke}
          strokeWidth={8}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          transition={{ duration: 0.4 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="font-grotesk text-5xl text-[#F5F5F5]">
          {formatPercentage(displayValue)}
        </p>
        <p className="mt-2 text-xs uppercase tracking-wider text-[#8A8A8A]">
          failure risk
        </p>
      </div>
    </div>
  )
}
