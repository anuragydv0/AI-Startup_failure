"use client"

import { motion } from "framer-motion"
import { BarChart3, Rocket, Shield, Zap } from "lucide-react"
import { Section, SectionHeading } from "@/components/ui/section"
import { Card } from "@/components/ui/card"
import { fadeUp, staggerContainer, viewportDefaults } from "@/lib/animations"

const features = [
  {
    title: "Failure Pattern Engine",
    description:
      "Compares your startup profile against thousands of known collapse trajectories.",
    icon: Shield,
  },
  {
    title: "Market Heat Mapping",
    description:
      "Validates your category timing, buyer urgency, and competition density in real-time.",
    icon: BarChart3,
  },
  {
    title: "Founder-Market Fit Signal",
    description:
      "Scores team narrative against execution capability and distribution readiness.",
    icon: Zap,
  },
  {
    title: "Projection Stress Testing",
    description:
      "Pressure-tests growth assumptions against realistic benchmark trajectories.",
    icon: Rocket,
  },
] as const

export function FeaturesSection() {
  return (
    <Section id="features">
      <SectionHeading
        eyebrow="Core Intelligence"
        title="Clarity before burn-rate regret."
        description="A unified risk system that surfaces the blind spots most founders discover too late."
        align="center"
      />

      <motion.div
        className="grid gap-4 md:grid-cols-2"
        variants={staggerContainer({ staggerChildren: 0.08 })}
        initial="hidden"
        whileInView="visible"
        viewport={viewportDefaults}
      >
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <motion.div key={feature.title} variants={fadeUp(16)}>
              <Card className="h-full transition-transform duration-300 hover:-translate-y-1">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#FF3B30]/30 bg-[#FF3B30]/10">
                  <Icon className="h-5 w-5 text-[#FF3B30]" />
                </div>
                <h3 className="font-grotesk text-xl">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#8A8A8A]">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>
    </Section>
  )
}
