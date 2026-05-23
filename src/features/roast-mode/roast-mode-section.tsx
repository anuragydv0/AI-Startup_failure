"use client"

import { useState } from "react"
import { Copy, Flame, Share2 } from "lucide-react"
import { motion } from "framer-motion"
import { Section, SectionHeading } from "@/components/ui/section"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { copyText } from "@/lib/utils"
import { fadeUp, staggerContainer, viewportDefaults, glowPulse } from "@/lib/animations"
import { toggleRoastMode, useUIStore } from "@/store/ui-store"

const roastMessage = `Congratulations.

You built a product for a market already crowded,
with assumptions that only work in your best-case spreadsheet.

Your TAM is enormous on paper.
Your reachable market is painfully narrow in reality.

You have runway.
Your competitors have distribution.

Good luck.`

export function RoastModeSection() {
  const enabled = useUIStore((value) => value.roastModeEnabled)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const success = await copyText(roastMessage)
    if (!success) return
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <Section id="roast-mode">
      <SectionHeading
        eyebrow="Truth Serum"
        title="Roast Mode"
        description="When you need the investor conversation before the investor meeting."
        align="center"
      />

      <motion.div
        className="mx-auto max-w-4xl space-y-8"
        variants={staggerContainer({ staggerChildren: 0.1 })}
        initial="hidden"
        whileInView="visible"
        viewport={viewportDefaults}
      >
        <motion.div className="flex justify-center" variants={fadeUp(14)}>
          <Button
            variant={enabled ? "primary" : "danger"}
            size="lg"
            onClick={toggleRoastMode}
            className="min-w-72"
          >
            <Flame className="h-5 w-5" />
            {enabled ? "Roast Mode Enabled" : "Enable Roast Mode"}
          </Button>
        </motion.div>

        {enabled ? (
          <motion.div variants={fadeUp(14)}>
            <Card tone="danger" className="space-y-8 p-8 md:p-12">
              <motion.h3
                className="font-grotesk text-4xl text-[#FF3B30]"
                animate={glowPulse}
              >
                CONGRATULATIONS.
              </motion.h3>
              <div className="space-y-4">
                {roastMessage.split("\n\n").map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-base leading-relaxed text-[#8A8A8A] md:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="secondary" onClick={handleCopy}>
                  <Copy className="h-4 w-4" />
                  {copied ? "Copied" : "Copy Roast"}
                </Button>
                <Button variant="danger">
                  <Share2 className="h-4 w-4" />
                  Share on X
                </Button>
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div variants={fadeUp(14)}>
            <Card tone="subtle" className="text-center">
              <p className="text-base text-[#8A8A8A] md:text-lg">
                Enable Roast Mode to unlock direct, unfiltered AI commentary on your
                startup thesis.
              </p>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </Section>
  )
}
