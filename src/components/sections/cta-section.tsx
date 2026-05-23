"use client"

import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cinematicReveal, viewportDefaults } from "@/lib/animations"

const ctaBadges = [
  "No Credit Card Required",
  "30-Second Intelligence Pass",
  "Actionable Risk Breakdown",
] as const

export function CtaSection() {
  return (
    <Section className="overflow-hidden pt-16">
      <motion.div
        className="relative mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.06] via-transparent to-[#FF3B30]/[0.08] p-10 text-center md:p-14"
        variants={cinematicReveal()}
        initial="hidden"
        whileInView="visible"
        viewport={viewportDefaults}
      >
        <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top_right,rgba(255,176,32,0.2),transparent_60%)]" />
        <div className="relative z-10">
          <h2 className="font-grotesk text-4xl md:text-6xl">
            Stop guessing.
            <span className="block text-[#FF3B30]">Start knowing.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-[#8A8A8A] md:text-lg">
            Your deck is only chapter one. We expose what your investors are likely to see
            before they tell you.
          </p>

          <Button size="lg" className="mt-8">
            Start Your Startup Autopsy
            <ArrowRight className="h-4 w-4" />
          </Button>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {ctaBadges.map((badge) => (
              <Badge key={badge} variant="neutral">
                {badge}
              </Badge>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
