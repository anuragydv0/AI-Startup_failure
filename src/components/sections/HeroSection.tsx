"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const HeroSection = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  if (!mounted) return null

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 right-10 w-96 h-96 bg-red-accent/20 rounded-full blur-3xl"
        animate={{
          y: [0, -50, 0],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ opacity: 0.3 }}
      />

      <motion.div
        className="absolute bottom-20 left-10 w-96 h-96 bg-amber-accent/20 rounded-full blur-3xl"
        animate={{
          y: [0, 50, 0],
          x: [0, -50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ opacity: 0.2 }}
      />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-block mb-6"
        >
          <div className="glass rounded-full px-4 py-2 border border-red-accent/30 inline-flex items-center gap-2">
            <span className="w-2 h-2 bg-red-accent rounded-full animate-pulse" />
            <span className="text-sm text-text-muted">AI STARTUP FAILURE PREDICTOR</span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.div variants={itemVariants} className="mb-6">
          <h1 className="cinematic-text text-6xl md:text-7xl lg:text-8xl leading-tight mb-4">
            <motion.span
              className="inline-block"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Most Startups
            </motion.span>
            <br />
            <motion.span
              className="text-red-accent text-glow"
              animate={{ textShadow: ["0 0 10px rgba(255, 59, 48, 0.3)", "0 0 30px rgba(255, 59, 48, 0.8)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Don't Fail Slowly.
            </motion.span>
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-2xl text-text-muted mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          They die from problems <span className="text-red-accent font-semibold">nobody told them about.</span> Upload your
          pitch deck. Get the brutally honest truth before investors ghost you.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <motion.button
            className="group relative px-8 py-4 bg-red-accent text-black-primary font-bold rounded-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-red-accent to-amber-accent opacity-0 group-hover:opacity-100 transition-opacity"
              initial={false}
            />
            <span className="relative flex items-center gap-2 justify-center">
              Analyze My Startup
              <ArrowRight className="w-5 h-5" />
            </span>
          </motion.button>

          <motion.button
            className="px-8 py-4 glass rounded-lg border-2 border-text-muted/30 hover:border-red-accent/60 font-bold transition-all"
            whileHover={{ scale: 1.05, borderColor: "#FF3B30" }}
            whileTap={{ scale: 0.95 }}
          >
            Watch Demo
          </motion.button>
        </motion.div>

        {/* Floating metrics */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-4 max-w-md mx-auto"
        >
          {[
            { label: "Startups Analyzed", value: "50K+" },
            { label: "Success Patterns", value: "94%" },
            { label: "Accuracy", value: "87%" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="glass rounded-lg p-4"
              whileHover={{ y: -5 }}
            >
              <p className="text-2xl font-bold text-red-accent">{stat.value}</p>
              <p className="text-xs text-text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-text-muted/30 rounded-full flex items-start justify-center p-2">
          <motion.div className="w-1 h-2 bg-red-accent rounded-full" animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection
