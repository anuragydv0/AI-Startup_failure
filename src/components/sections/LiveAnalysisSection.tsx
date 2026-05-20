"use client"

import React from "react"
import { motion } from "framer-motion"
import { Upload, AlertCircle, CheckCircle2, Zap } from "lucide-react"

interface AnalysisStep {
  label: string
  progress: number
  status: "pending" | "processing" | "complete"
}

const LiveAnalysisSection = () => {
  const steps: AnalysisStep[] = [
    { label: "Analyzing Market", progress: 100, status: "complete" },
    { label: "Evaluating Team", progress: 100, status: "complete" },
    { label: "Financial Review", progress: 65, status: "processing" },
    { label: "Competitive Analysis", progress: 0, status: "pending" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-20 px-4 grain">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-accent/5 to-transparent pointer-events-none" />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="cinematic-text text-5xl md:text-6xl mb-4">
            Upload Your Truth
          </h2>
          <p className="text-text-muted text-lg">
            Watch as our AI tears apart your assumptions in real-time
          </p>
        </motion.div>

        {/* Upload Area */}
        <motion.div
          variants={itemVariants}
          className="glass rounded-2xl p-8 mb-12 border-2 border-dashed border-red-accent/30 hover:border-red-accent/60 transition-colors cursor-pointer group"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex flex-col items-center gap-4">
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Upload className="w-16 h-16 text-red-accent opacity-60 group-hover:opacity-100 transition-opacity" />
            </motion.div>
            <div className="text-center">
              <p className="text-text-primary font-semibold text-lg">Drop your pitch deck</p>
              <p className="text-text-muted text-sm mt-1">PDF, PPT, or Google Slides link</p>
            </div>
          </div>
        </motion.div>

        {/* Analysis Progress */}
        <motion.div variants={itemVariants} className="space-y-4">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="glass rounded-lg p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center gap-4">
                {step.status === "complete" && (
                  <CheckCircle2 className="w-5 h-5 text-amber-accent flex-shrink-0" />
                )}
                {step.status === "processing" && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Zap className="w-5 h-5 text-red-accent flex-shrink-0" />
                  </motion.div>
                )}
                {step.status === "pending" && (
                  <div className="w-5 h-5 rounded-full border-2 border-text-muted/30 flex-shrink-0" />
                )}

                <div className="flex-1">
                  <p className="text-text-primary text-sm font-medium">{step.label}</p>
                </div>

                <div className="w-32 bg-black-secondary rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-red-accent to-amber-accent"
                    initial={{ width: 0 }}
                    animate={{ width: `${step.progress}%` }}
                    transition={{ duration: 1.5, delay: i * 0.1 }}
                  />
                </div>

                <p className="text-text-muted text-xs w-10 text-right">{step.progress}%</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Warning Section */}
        <motion.div
          variants={itemVariants}
          className="mt-12 glass rounded-xl p-6 border-l-4 border-red-accent bg-red-accent/5"
        >
          <div className="flex gap-4">
            <AlertCircle className="w-6 h-6 text-red-accent flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-red-accent font-semibold mb-2">Warning Detected</h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Unrealistic revenue projections detected. Growth curve follows textbook SaaS model
                despite novel business model.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Terminal Log Section */}
        <motion.div variants={itemVariants} className="mt-12">
          <div className="glass rounded-xl overflow-hidden font-mono text-xs">
            <div className="bg-black-primary p-4 space-y-2 max-h-48 overflow-y-auto">
              <div className="text-amber-accent">[AI ANALYSIS] Initializing market assessment...</div>
              <div className="text-green-500">[OK] Market size validation complete</div>
              <div className="text-amber-accent">[WARN] Team composition analysis in progress</div>
              <div className="text-red-accent">[ERROR] Critical: Founder lacks enterprise sales experience</div>
              <div className="text-amber-accent">[AI] Comparing against 10,000 failed startups...</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default LiveAnalysisSection

