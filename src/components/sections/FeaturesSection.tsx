"use client"

import React from "react"
import { motion } from "framer-motion"
import { Zap, BarChart3, Shield, Rocket } from "lucide-react"

const FeaturesSection = () => {
  const features = [
    {
      icon: Shield,
      title: "AI Risk Analysis",
      description: "Deep learning models trained on 50K+ startup failures to predict your specific risks.",
    },
    {
      icon: BarChart3,
      title: "Market Intelligence",
      description: "Real-time market saturation analysis, TAM validation, and competitive positioning.",
    },
    {
      icon: Zap,
      title: "Founder Assessment",
      description: "Pattern matching against successful and failed founder archetypes in your space.",
    },
    {
      icon: Rocket,
      title: "Growth Reality Check",
      description: "Compare your projections against historical benchmarks. See where you're lying to yourself.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section className="relative py-20 px-4 grain overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-accent/5 to-transparent pointer-events-none" />

      <motion.div
        className="relative z-10 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="cinematic-text text-5xl md:text-6xl mb-4">Why Founders Choose FAILFAST</h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Because delusion is expensive. Get clarity before the board meeting.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
        >
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group"
                whileHover={{ y: -5 }}
              >
                <div className="glass rounded-xl p-8 border border-white/10 hover:border-red-accent/30 transition-all h-full">
                  <motion.div
                    className="w-12 h-12 rounded-lg bg-red-accent/10 flex items-center justify-center mb-4 group-hover:bg-red-accent/20 transition-colors"
                    whileHover={{ rotate: 10 }}
                  >
                    <Icon className="w-6 h-6 text-red-accent" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default FeaturesSection
