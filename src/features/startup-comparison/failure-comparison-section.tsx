"use client"

import { useState } from "react"
import { AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import { Section, SectionHeading } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { failureCases, type FailureCase } from "@/features/startup-comparison/data"
import { fadeUp, staggerContainer, viewportDefaults } from "@/lib/animations"

export function FailureComparisonSection() {
  const [selectedCase, setSelectedCase] = useState<FailureCase>(failureCases[0])

  return (
    <Section id="graveyard">
      <SectionHeading
        eyebrow="Historical Mirror"
        title="The startup graveyard remembers patterns."
        description="Tap a collapse case to compare your signal similarity."
        align="center"
      />

      <motion.div
        className="grid gap-4 md:grid-cols-2 xl:grid-cols-5"
        variants={staggerContainer({ staggerChildren: 0.06 })}
        initial="hidden"
        whileInView="visible"
        viewport={viewportDefaults}
      >
        {failureCases.map((entry) => (
          <motion.button
            key={entry.name}
            type="button"
            variants={fadeUp(12)}
            onClick={() => setSelectedCase(entry)}
            className="text-left"
          >
            <Card
              className="h-full transition-transform duration-300 hover:-translate-y-1"
              tone={selectedCase.name === entry.name ? "danger" : "default"}
            >
              <p className="font-satoshi text-xs uppercase tracking-[0.18em] text-[#8A8A8A]">
                {entry.sector}
              </p>
              <h3 className="mt-3 font-grotesk text-2xl">{entry.name}</h3>
              <p className="mt-1 text-sm text-[#8A8A8A]">
                {entry.founded} → {entry.failed}
              </p>
              <Badge variant="danger" className="mt-4">
                {entry.similarity}% match
              </Badge>
              <p className="mt-4 text-sm text-[#8A8A8A]">{entry.reason}</p>
            </Card>
          </motion.button>
        ))}
      </motion.div>

      <motion.div
        variants={fadeUp(18)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportDefaults}
      >
        <Card className="mt-8 border-l-4 border-l-[#FF3B30]">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 text-[#FF3B30]" />
            <div className="space-y-3">
              <h3 className="font-grotesk text-2xl">
                {selectedCase.name}: matched risk profile
              </h3>
              <p className="text-sm text-[#8A8A8A]">
                {selectedCase.reason}. Your current signal overlap is{" "}
                <span className="font-medium text-[#FF3B30]">
                  {selectedCase.similarity}%
                </span>
                .
              </p>
              <ul className="space-y-2 text-sm text-[#8A8A8A]">
                <li>• Similar go-to-market timing and saturation pressure.</li>
                <li>• Comparable team-to-distribution capability gap.</li>
                <li>• Matching optimism bias in financial trajectory assumptions.</li>
              </ul>
            </div>
          </div>
        </Card>
      </motion.div>
    </Section>
  )
}
