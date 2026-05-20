"use client"

import React from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const CTASection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  }

  return (
    <section className="relative py-20 px-4 grain overflow-hidden">
      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-red-accent/20 via-transparent to-amber-accent/20 blur-3xl"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <motion.h2
          variants={itemVariants}
          className="cinematic-text text-5xl md:text-6xl mb-6 relative z-10"
        >
          Stop Guessing.
          <br />
          <span className="text-red-accent text-glow">Start Knowing.</span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-text-muted text-lg mb-8 max-w-2xl mx-auto relative z-10"
        >
          Your pitch deck is only the beginning. We'll tell you what your investors are really thinking.
        </motion.p>

        <motion.button
          variants={itemVariants}
          className="relative z-10 group px-8 py-4 bg-red-accent text-black-primary font-bold rounded-lg overflow-hidden inline-flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-red-accent to-amber-accent opacity-0 group-hover:opacity-100 transition-opacity"
            initial={false}
          />
          <span className="relative flex items-center gap-2">
            Start Your Autopsy Now
            <ArrowRight className="w-5 h-5" />
          </span>
        </motion.button>

        {/* Risk badges */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-wrap justify-center gap-4 relative z-10"
        >
          {["No Credit Card Required", "30-Sec Analysis", "Brutally Honest Results"].map((badge) => (
            <motion.div
              key={badge}
              className="glass px-4 py-2 rounded-full text-sm text-text-muted border border-white/10"
              whileHover={{ borderColor: "rgb(255, 59, 48)" }}
            >
              {badge}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default CTASection
