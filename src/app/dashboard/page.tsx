"use client"

import React from "react"
import Navigation from "@/components/Navigation"
import Dashboard from "@/components/Dashboard"
import { motion } from "framer-motion"

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-black-primary text-text-primary">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 pt-24 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Dashboard />
        </motion.div>
      </div>
    </main>
  )
}
