"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Zap, AlertCircle } from "lucide-react"

interface StartupCard {
  name: string
  founded: number
  failed: number | string
  reason: string
  similarity: number
  icon: string
}

const startups: StartupCard[] = [
  {
    name: "Quibi",
    founded: 2018,
    failed: 2020,
    reason: "Wrong platform, right execution",
    similarity: 68,
    icon: "TV",
  },
  {
    name: "Theranos",
    founded: 2003,
    failed: 2018,
    reason: "Overpromising + fraud",
    similarity: 45,
    icon: "LAB",
  },
  {
    name: "Juicero",
    founded: 2013,
    failed: 2019,
    reason: "Solution looking for problem",
    similarity: 52,
    icon: "JUI",
  },
  {
    name: "WeWork",
    founded: 2010,
    failed: "2023 (IPO collapse)",
    reason: "Profitability impossible",
    similarity: 73,
    icon: "OFF",
  },
  {
    name: "Vine",
    founded: 2012,
    failed: 2017,
    reason: "Monetization nightmare",
    similarity: 41,
    icon: "VID",
  },
]

const FailureComparisonSection = () => {
  const [selectedStartup, setSelectedStartup] = useState<StartupCard | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    hover: { y: -20, scale: 1.05 },
  }

  return (
    <section className="relative min-h-screen py-20 px-4 overflow-hidden grain">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-accent/5 to-transparent pointer-events-none" />

      <motion.div
        className="relative z-10 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div className="text-center mb-16">
          <motion.h2 className="cinematic-text text-5xl md:text-6xl mb-4">The Graveyard</motion.h2>
          <motion.p className="text-text-muted text-lg">
            We've seen this movie before. Here's how your startup matches famous failures.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12"
          variants={containerVariants}
        >
          {startups.map((startup) => (
            <motion.div
              key={startup.name}
              variants={cardVariants}
              whileHover="hover"
              onClick={() => setSelectedStartup(startup)}
              className="group cursor-pointer"
            >
              <div className="glass rounded-xl p-6 h-full flex flex-col items-center text-center hover:border-red-accent/60 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-red-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  <div className="text-sm tracking-widest text-red-accent mb-3">{startup.icon}</div>
                  <h3 className="text-text-primary font-bold text-lg mb-2">{startup.name}</h3>
                  <p className="text-text-muted text-xs mb-4">
                    {startup.founded} -&gt; {startup.failed}
                  </p>

                  <motion.div
                    className="inline-block px-3 py-1 rounded-full bg-red-accent/20 border border-red-accent/50 mb-3"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <p className="text-red-accent text-sm font-bold">{startup.similarity}% Match</p>
                  </motion.div>

                  <p className="text-text-muted text-xs mt-4">{startup.reason}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {selectedStartup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass rounded-2xl p-8 mb-8 border border-red-accent/40"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="cinematic-text text-4xl mb-2">{selectedStartup.name}</h3>
                <p className="text-text-muted">{selectedStartup.reason}</p>
              </div>
              <motion.div
                className="px-4 py-2 rounded-full bg-red-accent/20 border border-red-accent/50"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <p className="text-red-accent font-bold">{selectedStartup.similarity}% Similarity</p>
              </motion.div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-black-secondary rounded-lg">
                <p className="text-text-muted text-sm mb-1">Founded</p>
                <p className="text-2xl font-bold">{selectedStartup.founded}</p>
              </div>
              <div className="p-4 bg-black-secondary rounded-lg">
                <p className="text-text-muted text-sm mb-1">Failed</p>
                <p className="text-2xl font-bold">{selectedStartup.failed}</p>
              </div>
              <div className="p-4 bg-red-accent/10 rounded-lg border border-red-accent/30">
                <p className="text-text-muted text-sm mb-1">Pattern Match</p>
                <p className="text-2xl font-bold text-red-accent">{selectedStartup.similarity}%</p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-text-primary font-semibold flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-accent" />
                Matched Failure Patterns
              </h4>
              <ul className="space-y-2 text-text-muted text-sm">
                <li className="flex gap-2">
                  <span className="text-red-accent">x</span>
                  <span>Similar market timing misalignment</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-accent">x</span>
                  <span>Comparable founder background risk</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-accent">x</span>
                  <span>Same growth assumption patterns</span>
                </li>
              </ul>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="glass rounded-xl p-6 border-l-4 border-amber-accent"
        >
          <div className="flex gap-3">
            <Zap className="w-6 h-6 text-amber-accent flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-text-primary font-semibold mb-1">Pattern Recognition</h4>
              <p className="text-text-muted text-sm">
                Our AI has analyzed 50,000+ startup failures. These patterns repeat. Learn from
                history or repeat it.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default FailureComparisonSection
