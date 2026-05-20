"use client"

import React from "react"
import { motion } from "framer-motion"
import { BarChart3, TrendingDown, AlertCircle, Zap, Users, Map } from "lucide-react"

const DashboardGrid = () => {
  const metrics = [
    {
      title: "Overall Failure Risk",
      value: "72%",
      change: "+8%",
      icon: AlertCircle,
      color: "text-red-accent",
      bg: "bg-red-accent/10",
    },
    {
      title: "Market Timing",
      value: "Critical",
      change: "Saturated",
      icon: Map,
      color: "text-amber-accent",
      bg: "bg-amber-accent/10",
    },
    {
      title: "Team Strength",
      value: "6/10",
      change: "-2 since seed",
      icon: Users,
      color: "text-amber-accent",
      bg: "bg-amber-accent/10",
    },
    {
      title: "Financial Realism",
      value: "2/10",
      change: "Projections off",
      icon: TrendingDown,
      color: "text-red-accent",
      bg: "bg-red-accent/10",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="glass rounded-xl p-6 border border-white/10 hover:border-red-accent/30 transition-all group"
          whileHover={{ y: -5 }}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-text-muted text-sm mb-1">{metric.title}</p>
              <p className={`text-3xl font-bold ${metric.color}`}>{metric.value}</p>
            </div>
            <div className={`${metric.bg} p-3 rounded-lg`}>
              <metric.icon className={`w-5 h-5 ${metric.color}`} />
            </div>
          </div>
          <p className="text-text-muted text-xs">{metric.change}</p>
        </motion.div>
      ))}
    </div>
  )
}

const AnalysisChart = () => {
  const categories = [
    { name: "Market Fit", score: 35, max: 100 },
    { name: "Team Quality", score: 62, max: 100 },
    { name: "Financial Plan", score: 18, max: 100 },
    { name: "Differentiation", score: 42, max: 100 },
    { name: "Execution Risk", score: 78, max: 100 },
  ]

  return (
    <div className="glass rounded-xl p-8 border border-white/10">
      <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-red-accent" />
        Category Breakdown
      </h3>

      <div className="space-y-6">
        {categories.map((cat, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-text-muted text-sm">{cat.name}</p>
              <p className={`font-bold ${cat.score > 60 ? "text-red-accent" : "text-amber-accent"}`}>
                {cat.score}
              </p>
            </div>
            <div className="w-full bg-black-secondary rounded-full h-2 overflow-hidden">
              <motion.div
                className={`h-full ${cat.score > 60 ? "bg-red-accent" : "bg-amber-accent"}`}
                initial={{ width: 0 }}
                animate={{ width: `${cat.score}%` }}
                transition={{ duration: 1, delay: i * 0.1 + 0.5 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="border-b border-white/10 pb-6"
      >
        <h1 className="cinematic-text text-5xl md:text-6xl mb-2">Intelligence Report</h1>
        <p className="text-text-muted">Your startup under the microscope.</p>
      </motion.div>

      {/* Metrics Grid */}
      <DashboardGrid />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalysisChart />

        {/* Founder Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-xl p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-red-accent" />
            Founder Assessment
          </h3>

          <div className="space-y-4">
            <div className="p-4 bg-amber-accent/10 rounded-lg border border-amber-accent/30">
              <p className="text-amber-accent text-sm font-semibold mb-1">CEO Background</p>
              <p className="text-text-muted text-sm">
                Product-focused, weak on business operations. First-time founder.
              </p>
            </div>

            <div className="p-4 bg-red-accent/10 rounded-lg border border-red-accent/30">
              <p className="text-red-accent text-sm font-semibold mb-1">Market Experience</p>
              <p className="text-text-muted text-sm">
                Limited enterprise sales background. Tech-only network.
              </p>
            </div>

            <div className="p-4 bg-black-secondary rounded-lg">
              <p className="text-text-muted text-sm font-semibold mb-1">Risk Factor</p>
              <p className="text-text-primary text-sm">
                Team lacks distribution expertise. High founder-market mismatch risk.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Competition Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-xl p-8 border border-white/10"
      >
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Zap className="w-5 h-5 text-red-accent" />
          Competition Heatmap
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-text-primary font-semibold mb-4">Direct Competitors</h4>
            <div className="space-y-3">
              {["Notion (Features)", "Monday.com (Market Share)", "Asana (Enterprise)"].map((comp) => (
                <div key={comp} className="flex items-center justify-between p-3 bg-black-secondary rounded-lg">
                  <p className="text-text-muted text-sm">{comp}</p>
                  <div className="flex gap-1">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < 4 ? "bg-red-accent" : "bg-text-muted/30"
                          }`}
                        />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-text-primary font-semibold mb-4">Your Positioning</h4>
            <div className="space-y-3">
              {[
                { label: "Feature Parity", score: 3 },
                { label: "Brand Strength", score: 1 },
                { label: "Market Position", score: 2 },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-3 bg-black-secondary rounded-lg">
                  <p className="text-text-muted text-sm">{item.label}</p>
                  <div className="flex gap-1">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < item.score ? "bg-amber-accent" : "bg-text-muted/30"
                          }`}
                        />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Critical Warnings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass rounded-xl p-8 border-l-4 border-red-accent bg-red-accent/5"
      >
        <h3 className="text-lg font-bold text-red-accent mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          Critical Issues
        </h3>
        <ul className="space-y-3">
          {[
            "Revenue projections unrealistic (3x industry benchmark)",
            "TAM calculation includes non-addressable markets",
            "No clear path to profitability before runway depletion",
            "Competitive moat is unclear and defensibility is low",
          ].map((issue, i) => (
            <li key={i} className="flex gap-3 text-text-muted text-sm">
              <span className="text-red-accent flex-shrink-0">✗</span>
              <span>{issue}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}

export default Dashboard
