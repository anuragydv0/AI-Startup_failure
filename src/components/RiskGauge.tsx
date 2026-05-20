"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"

interface FailureRiskProps {
  score?: number
  animated?: boolean
}

const FailureRiskGauge = ({ score = 72, animated = true }: FailureRiskProps) => {
  const [displayScore, setDisplayScore] = useState(0)
  const gaugeRef = React.useRef<SVGCircleElement>(null)

  useEffect(() => {
    if (animated) {
      gsap.to({ value: 0 }, {
        value: score,
        duration: 2,
        ease: "power2.out",
        onUpdate: function() {
          setDisplayScore(Math.floor(this.targets()[0].value))
        },
      })
    } else {
      setDisplayScore(score)
    }
  }, [score, animated])

  const circumference = 2 * Math.PI * 90
  const offset = circumference - (displayScore / 100) * circumference

  const getColor = () => {
    if (displayScore < 30) return "#FFB020"
    if (displayScore < 60) return "#FF6B35"
    return "#FF3B30"
  }

  return (
    <div className="relative w-full max-w-md mx-auto aspect-square flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
        {/* Background circle */}
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="4"
        />

        {/* Progress circle */}
        <circle
          ref={gaugeRef}
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke={getColor()}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-300 drop-shadow-lg"
          style={{
            filter: `drop-shadow(0 0 20px ${getColor()}80)`,
          }}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          className="text-6xl font-bold text-glow"
          style={{ color: getColor() }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {displayScore}%
        </motion.div>
        <div className="text-text-muted text-sm mt-2 font-grotesk">FAILURE RISK</div>
      </div>
    </div>
  )
}

const RiskReasons = () => {
  const reasons = [
    "Weak moat detected",
    "Unrealistic TAM",
    "No distribution advantage",
    "Founder-market mismatch",
  ]

  return (
    <motion.div className="mt-8 space-y-3">
      {reasons.map((reason, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15 + 2, duration: 0.5 }}
          className="glass px-4 py-3 rounded-lg border-l-2 border-red-accent"
        >
          <div className="text-sm text-text-muted">{reason}</div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export { FailureRiskGauge, RiskReasons }
