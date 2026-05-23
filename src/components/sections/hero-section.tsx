"use client"

import { ArrowRight, Play } from "lucide-react"
import { motion } from "framer-motion"
import { staggerContainer, fadeUp, glowPulse, floatingAnimation } from "@/lib/animations"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const heroStats = [
  { label: "Startups Analyzed", value: "50K+" },
  { label: "Pattern Signals", value: "1.2M" },
  { label: "Prediction Accuracy", value: "87%" },
] as const

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center px-4 pt-28 pb-16">
      <motion.div
        className="absolute right-[8%] top-28 h-80 w-80 rounded-full bg-[#FF3B30]/20 blur-[120px]"
        animate={floatingAnimation}
      />
      <motion.div
        className="absolute left-[6%] bottom-24 h-72 w-72 rounded-full bg-[#FFB020]/20 blur-[120px]"
        animate={{
          ...floatingAnimation,
          transition: { ...floatingAnimation.transition, delay: 0.8 },
        }}
      />

      <motion.div
        className="relative mx-auto flex w-full max-w-6xl flex-col items-center text-center"
        variants={staggerContainer({ staggerChildren: 0.12, delayChildren: 0.12 })}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeUp(18)}>
          <Badge
            variant="danger"
            className="mb-8 px-4 py-2 font-satoshi tracking-[0.18em]"
          >
            💀 CLASSIFIED STARTUP AUTOPSY SYSTEM
          </Badge>
        </motion.div>

        <motion.h1
          className="max-w-5xl font-grotesk text-5xl leading-[1.03] md:text-7xl xl:text-8xl"
          variants={fadeUp(24)}
        >
          Most startups do not fail slowly.
          <span className="mt-2 block text-[#FF3B30]">They fail without warning.</span>
        </motion.h1>

        <motion.p
          className="mt-8 max-w-3xl text-balance text-base text-[#8A8A8A] md:text-xl"
          variants={fadeUp(24)}
        >
          Upload your pitch deck and get a ruthless intelligence brief on market timing,
          founder risk, and execution blind spots before investors ghost your next round.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col gap-4 sm:flex-row"
          variants={fadeUp(20)}
        >
          <Button size="lg" className="group">
            Analyze My Startup
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button size="lg" variant="secondary">
            <Play className="h-4 w-4" />
            Watch Demo
          </Button>
        </motion.div>

        <motion.div
          className="mt-12 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3"
          variants={fadeUp(20)}
        >
          {heroStats.map((stat) => (
            <motion.div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl"
              whileHover={{ y: -4 }}
            >
              <motion.p
                className="font-grotesk text-2xl text-[#FF3B30]"
                animate={glowPulse}
              >
                {stat.value}
              </motion.p>
              <p className="mt-1 text-xs uppercase tracking-wide text-[#8A8A8A]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
