"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { clampScore, getRiskStroke } from "@/utils/risk"

interface RiskGaugeProps {
  score: number
  isAnimating?: boolean
}

function getSeverityTone(score: number) {
  if (score >= 75) {
    return {
      label: "CRITICAL FAILURE RISK",
      accentClass: "text-[#FF3B30]",
      borderClass: "border-[#FF3B30]/25",
      bgClass: "bg-[#FF3B30]/10",
      glowClass: "shadow-[0_0_18px_rgba(255,59,48,0.55)]",
    }
  }

  if (score >= 50) {
    return {
      label: "HIGH FAILURE RISK",
      accentClass: "text-[#FF9500]",
      borderClass: "border-[#FF9500]/25",
      bgClass: "bg-[#FF9500]/10",
      glowClass: "shadow-[0_0_18px_rgba(255,149,0,0.45)]",
    }
  }

  if (score >= 25) {
    return {
      label: "MODERATE FAILURE RISK",
      accentClass: "text-[#FFB020]",
      borderClass: "border-[#FFB020]/25",
      bgClass: "bg-[#FFB020]/10",
      glowClass: "shadow-[0_0_18px_rgba(255,176,32,0.4)]",
    }
  }

  return {
    label: "LOW FAILURE RISK",
    accentClass: "text-[#34C759]",
    borderClass: "border-[#34C759]/25",
    bgClass: "bg-[#34C759]/10",
    glowClass: "shadow-[0_0_18px_rgba(52,199,89,0.4)]",
  }
}

export function RiskGauge({ score, isAnimating = true }: RiskGaugeProps) {
  const normalizedScore = clampScore(score)
  const [displayScore, setDisplayScore] = useState(isAnimating ? 0 : normalizedScore)
  const needleRef = useRef<HTMLDivElement | null>(null)
  const meterRef = useRef<HTMLDivElement | null>(null)
  const tone = useMemo(() => getSeverityTone(displayScore), [displayScore])

  useEffect(() => {
    const tweenState = { value: displayScore }

    const counter = gsap.to(tweenState, {
      value: normalizedScore,
      duration: isAnimating ? 1.8 : 0,
      ease: "power4.out",
      onUpdate: () => setDisplayScore(Math.round(tweenState.value)),
    })

    const rotation = (normalizedScore / 100) * 180 - 90
    if (needleRef.current) {
      gsap.to(needleRef.current, {
        rotate: rotation,
        duration: isAnimating ? 1.55 : 0,
        ease: "elastic.out(1, 0.6)",
      })
    }

    if (meterRef.current) {
      gsap.fromTo(
        meterRef.current,
        { scale: 0.985, opacity: 0.85 },
        {
          scale: 1,
          opacity: 1,
          duration: isAnimating ? 0.9 : 0,
          ease: "power3.out",
        }
      )
    }

    return () => {
      counter.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [normalizedScore, isAnimating])

  const size = 320
  const radius = 106
  const circumference = 2 * Math.PI * radius
  const progress = (displayScore / 100) * circumference

  return (
    <motion.div
      className="flex w-full flex-col items-center gap-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <div
        ref={meterRef}
        className="relative mx-auto flex aspect-square w-full max-w-[340px] items-center justify-center"
      >
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,59,48,0.12),transparent_58%)] blur-xl" />

        <motion.div
          aria-hidden
          className="absolute inset-[8%] rounded-full border border-dashed border-white/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          aria-hidden
          className="absolute inset-[17%] rounded-full border border-white/5"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        <svg viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 h-full w-full -rotate-90">
          <defs>
            <linearGradient id="deadpool-risk-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34C759" />
              <stop offset="42%" stopColor="#FFB020" />
              <stop offset="74%" stopColor="#FF9500" />
              <stop offset="100%" stopColor="#FF3B30" />
            </linearGradient>
            <filter id="deadpool-risk-glow">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="10"
          />

          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#deadpool-risk-gradient)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={circumference - progress}
            filter="url(#deadpool-risk-glow)"
            transition={{ duration: 0.9, ease: "easeOut" }}
          />

          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius - 14}
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1"
            strokeDasharray="3 7"
          />
        </svg>

        <motion.div
          aria-hidden
          className="absolute inset-[11%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.07),transparent_72%)]"
          animate={{ opacity: [0.45, 0.75, 0.45] }}
          transition={{ duration: 3.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />

        <motion.div
          aria-hidden
          className="absolute inset-[14%] overflow-hidden rounded-full"
        >
          <motion.div
            className="absolute left-[-18%] top-[-18%] h-[40%] w-[26%] rotate-45 bg-white/10 blur-2xl"
            animate={{ x: ["-20%", "360%"] }}
            transition={{ duration: 4.6, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </motion.div>

            <div className="absolute inset-[22%] flex items-center justify-center rounded-full border border-white/8 bg-[#050505]/88 shadow-[0_0_40px_rgba(0,0,0,0.55)] backdrop-blur-xl">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,59,48,0.14),transparent_68%)]" />

          <div className="absolute bottom-[50%] left-1/2 h-[42%] w-5 -translate-x-1/2 overflow-hidden">
            <div
              ref={needleRef}
              className="absolute inset-x-1/2 bottom-0 h-full w-[6px] -translate-x-1/2 origin-bottom rounded-full bg-gradient-to-b from-[#FF3B30] via-[#FF9500] to-[#FFB020] shadow-[0_0_18px_rgba(255,59,48,0.65)]"
            >
              <div className="absolute -top-1.5 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border border-white/35 bg-[#FF3B30] shadow-[0_0_12px_rgba(255,59,48,0.65)]" />
            </div>
          </div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.42em] text-[#8A8A8A]">
              Failure Risk
            </span>
            <div className="mt-2 flex items-end gap-2">
              <span className={`font-grotesk text-6xl font-black tracking-tighter ${tone.accentClass}`}>
                {displayScore}
              </span>
              <span className="pb-2 text-sm font-semibold text-[#8A8A8A]">/ 100</span>
            </div>
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-[12%] mx-auto h-px w-[72%] bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />
      </div>

      <div className="max-w-xl text-center">
        <p className={`font-grotesk text-lg font-semibold tracking-[0.22em] ${tone.accentClass}`}>
          {tone.label}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[#8A8A8A] md:text-[15px]">
          Dark-mode telemetry showing how close this startup is to a structural collapse event.
        </p>
      </div>

      <div className="grid w-full max-w-xl gap-3 sm:grid-cols-3">
        {[
          { label: "Risk band", value: tone.label },
          { label: "Signal", value: `${getRiskStroke(displayScore)}` },
          { label: "Severity", value: displayScore >= 75 ? "Severe" : displayScore >= 50 ? "Elevated" : "Watch" },
        ].map((metric) => (
          <div
            key={metric.label}
            className={`rounded-2xl border ${tone.borderClass} ${tone.bgClass} px-4 py-3 text-left backdrop-blur-xl ${tone.glowClass}`}
          >
            <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#6E6E6E]">
              {metric.label}
            </div>
            <div className="mt-2 text-sm font-semibold text-[#F5F5F5]">
              {metric.value}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
