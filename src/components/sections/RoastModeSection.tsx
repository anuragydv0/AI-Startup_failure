"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Share2, Copy, Flame } from "lucide-react"

const RoastModeSection = () => {
  const [roastMode, setRoastMode] = useState(false)
  const [copied, setCopied] = useState(false)

  const roastContent = `Congratulations.

You've built a solution nobody asked for,
in a market already dominated,
with projections written by pure optimism.

Your TAM is the size of Mars.
Your actual addressable market is your friends.

The team looks like a Stanford startup stereotype.
Probably has someone named "growth."

You have 18 months of runway.
Competitors have 18 years of market share.

Good luck.`

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(roastContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-20 px-4 grain overflow-hidden">
      {/* Dynamic background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={roastMode ? { opacity: [0.3, 0.5, 0.3] } : { opacity: 0 }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-red-accent/20 via-transparent to-transparent" />
      </motion.div>

      {/* Glitch effect background */}
      {roastMode && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: [0, 0.1, 0] }}
          transition={{ duration: 0.3, repeat: Infinity }}
        >
          <div className="absolute inset-0 bg-red-accent/10" />
        </motion.div>
      )}

      <motion.div
        className="relative z-10 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Toggle Button */}
        <motion.div className="flex justify-center mb-12" variants={itemVariants}>
          <motion.button
            onClick={() => setRoastMode(!roastMode)}
            className={`flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 ${
              roastMode
                ? "bg-red-accent text-black-primary glow-red-lg"
                : "bg-black-secondary border-2 border-red-accent text-red-accent hover:bg-red-accent/10"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Flame className="w-6 h-6" />
            {roastMode ? "ROAST MODE: ENABLED" : "ENABLE ROAST MODE"}
          </motion.button>
        </motion.div>

        {/* Roast Content Area */}
        {roastMode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Main roast card */}
            <div className="glass rounded-2xl p-12 border-2 border-red-accent/50 relative overflow-hidden">
              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{ boxShadow: ["0 0 20px rgba(255, 59, 48, 0.3)", "0 0 40px rgba(255, 59, 48, 0.6)"] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  border: "2px solid transparent",
                  borderImage: "linear-gradient(45deg, #FF3B30, transparent) 1",
                }}
              />

              {/* Content */}
              <div className="relative z-10 font-grotesk">
                <motion.p
                  className="text-5xl md:text-6xl font-bold leading-tight text-white mb-8 text-glow"
                  style={{ color: "#FF3B30" }}
                >
                  CONGRATULATIONS.
                </motion.p>

                <motion.div
                  className="space-y-6 text-lg md:text-xl leading-relaxed text-text-primary"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {roastContent.split("\n\n").map((paragraph, i) => (
                    <motion.p
                      key={i}
                      variants={itemVariants}
                      className="text-text-muted"
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-6 py-3 glass rounded-lg hover:border-red-accent/60 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Copy className="w-4 h-4" />
                {copied ? "Copied!" : "Copy Roast"}
              </motion.button>

              <motion.button
                className="flex items-center gap-2 px-6 py-3 bg-red-accent/20 border border-red-accent/50 rounded-lg hover:bg-red-accent/30 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 className="w-4 h-4" />
                Share on X
              </motion.button>
            </div>

            {/* Meme card idea */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-xl p-8 text-center border border-amber-accent/30"
            >
              <p className="text-text-muted text-sm mb-4">This will be your startup story:</p>
              <p className="cinematic-text text-3xl text-amber-accent">
                "We had a great run"
              </p>
              <p className="text-text-muted text-sm mt-4">- Every failed founder, probably</p>
            </motion.div>
          </motion.div>
        )}

        {/* Disabled state message */}
        {!roastMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center max-w-2xl mx-auto"
          >
            <p className="text-text-muted text-lg mb-4">
              Ready to hear the truth? Enable roast mode to unlock brutally honest AI commentary.
            </p>
            <p className="text-text-muted text-sm">
              Warning: May damage your confidence. Use with founders only.
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}

export default RoastModeSection
