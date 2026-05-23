"use client"

import { useEffect, useState } from "react"
import { AlertCircle, Radar, TrendingDown, Users, ChevronRight, ArrowLeft, RefreshCw, Upload, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import dynamic from "next/dynamic"
import { CategoryScores } from "@/components/dashboard/category-scores"

const RiskGauge = dynamic(
  () => import("@/components/dashboard/risk-gauge-animated").then((mod) => mod.RiskGauge),
  { ssr: false }
)
import { FailureReasons } from "@/components/dashboard/failure-reasons"
import { ComparableFailures } from "@/components/dashboard/comparable-failures"
import { Recommendations } from "@/components/dashboard/recommendations"
import { InsightCards } from "@/components/dashboard/insight-cards"
import { useTheme } from "@/components/shared/theme-provider"
import type { AIAnalysis } from "@/backend/models/analysis"

// Mock seed historical records for excellent empty-state visuals or fallback offline mode
const SEED_HISTORY: (AIAnalysis & { id: string; source_file_name: string; created_at: string; source_file_type: string; source_file_size: number })[] = [
  {
    id: "deadpool-seed",
    source_file_name: "Deadpool_AI_Autopsy_Report.pdf",
    source_file_type: "pdf",
    source_file_size: 2840000,
    created_at: new Date().toISOString(),
    overall_failure_score: 57,
    category_scores: {
      market_clarity: 62,
      team_strength: 84,
      financial_realism: 42,
      differentiation: 55,
      execution_risk: 68,
    },
    top_failure_reasons: [
      "Severe customer acquisition friction: selling automated autopsy protocols to defensive, high-ego founders who reject failure analytics.",
      "Capital structure strain: high engineering payroll burn rates relative to contract subscription values.",
      "Vague monetization pathway: relying on speculative recovery audit cuts rather than high-margin software SaaS recurring fees."
    ],
    startup_comparison: [
      { startup_name: "Startup Llama", reason: "AI startup auditor that ran out of runway due to high enterprise sales cycles.", similarity: 78 },
      { startup_name: "Autopsy.io", reason: "Community-driven startup failure database that failed to monetize post-launch.", similarity: 82 }
    ],
    similarity_score: 80,
    recommendations: [
      { title: "Standardize SaaS Pricing", action: "Deploy instant, transactional audit fees starting at $99/mo instead of bespoke enterprise service retainers.", priority: "high" },
      { title: "Automate LLM Parsing Pipeline", action: "Reduce manual validation by training custom small language models on startup autopsy patterns.", priority: "medium" },
      { title: "Partner with Accelerator VCs", action: "Integrate dashboard directly into portfolio monitoring portals to secure steady flow of pitch reviews.", priority: "low" }
    ],
    roast_mode_output: "Selling autopsy reports to dying startups? That's like selling tombstone options to terminal patients and expecting recurring software margins! Founders don't want to hear why they're failing—they'd rather burn the last $50k on another billboard. Unless you secure venture capitalists as enterprise subscribers who want to audit their portfolio, your own autopsy report will be the next file added here.",
    investor_readiness: {
      score: 43,
      summary: "Deadpool AI has incredibly strong builder-market alignment and superior design engineering. However, the business model exhibits severe customer resistance and high burn rate friction. Standardize transactional monetizations before entering next financing rounds."
    },
    market_analysis: {
      tam_signal: "Strong niche market if integrated into institutional investment risk pipelines.",
      saturation_level: "Medium: first-mover automated forensics tool with specialized LLM embeddings.",
      market_timing: "Perfect: launch aligns with the current tech liquidation wave and funding crunch."
    },
    funding_risk: {
      runway_risk: "Moderate: high engineering payroll yields an 11-month crisis window.",
      dilution_risk: "Significant: pricing friction threatens early investor valuations.",
      funding_probability: 43
    }
  },
  {
    id: "airbnb-seed",
    source_file_name: "airbnb_seed_deck.pdf",
    source_file_type: "pdf",
    source_file_size: 1450000,
    created_at: new Date(Date.now() - 4 * 3600000).toISOString(),
    overall_failure_score: 28,
    category_scores: {
      market_clarity: 88,
      team_strength: 78,
      financial_realism: 72,
      differentiation: 82,
      execution_risk: 32,
    },
    top_failure_reasons: [
      "Heavy reliance on rapid international travel volumes, leaving them vulnerable to global macroeconomic freezes.",
      "High platform transaction friction: booking trust takes a long time to build with host verification pipelines.",
      "Regulatory hurdles: cities will restrict short-term rentals as zoning laws react to housing shortages."
    ],
    startup_comparison: [
      { startup_name: "Wimdu", reason: "Copied Airbnb's model in Europe but lost due to brand network effects.", similarity: 72 }
    ],
    similarity_score: 72,
    recommendations: [
      { title: "Lobby City Governments", action: "Establish local trust committees to preemptively write compliance laws.", priority: "high" },
      { title: "Expand Host Insurance", action: "Release premium host protections to incentivize supply retention.", priority: "medium" }
    ],
    roast_mode_output: "Ah, renting air mattresses in other people's apartments. Honestly, it sounds like a liability nightmare that belongs on Craigslist. But your network effects actually protect you from the 200 copycats popping up in Germany. Focus on keeping hosts happy before city mayors ban you entirely.",
    investor_readiness: {
      score: 82,
      summary: "Airbnb exhibits incredible founder-market fit. Defensibility is high due to double-sided network effects. Address local zoning compliance risks in early pitch slides."
    },
    market_analysis: {
      tam_signal: "Huge TAM. The entire hospitality market is open to disruption.",
      saturation_level: "Low: first-mover advantage with massive brand lock-in.",
      market_timing: "Perfect: users are actively looking for budget travel alternatives during this downturn."
    },
    funding_risk: {
      runway_risk: "Low: organic booking commissions yield positive operating cash flow.",
      dilution_risk: "Minimal: founders maintain high leverage in this round.",
      funding_probability: 85
    }
  },
  {
    id: "juicero-seed",
    source_file_name: "juicero_pitch.pptx",
    source_file_type: "pptx",
    source_file_size: 4200000,
    created_at: new Date(Date.now() - 28 * 3600000).toISOString(),
    overall_failure_score: 91,
    category_scores: {
      market_clarity: 24,
      team_strength: 65,
      financial_realism: 18,
      differentiation: 30,
      execution_risk: 94,
    },
    top_failure_reasons: [
      "Over-engineered hardware solving a non-urgent problem: manual juice packs squeeze easily by hand.",
      "Exorbitant pricing: charging $400 for a machine that relies on expensive subscription juice packs.",
      "High capital expenditure: manufacturing custom metal gears creates massive cash drain before validation."
    ],
    startup_comparison: [
      { startup_name: "Juicero", reason: "Hardware over-engineering led to public relations collapse.", similarity: 100 }
    ],
    similarity_score: 100,
    recommendations: [
      { title: "Halt Hardware Assembly", action: "Cancel the custom gear manufacturing pipeline. Test product demand with simple manual bags.", priority: "high" },
      { title: "Reduce Device Pricing", action: "Drop price point to under $100 or abandon the hardware completely to focus on juice subscriptions.", priority: "high" }
    ],
    roast_mode_output: "A $400 internet-connected press to squeeze a bag of fruit that a toddler could squeeze by hand. This is the absolute peak of Silicon Valley bubble delusion. You've manufactured a solution to a problem that does not exist, and spent $120M doing it. Your margins are negative and your product is a joke.",
    investor_readiness: {
      score: 8,
      summary: "Juicero is uninvestable. The value proposition is entirely artificial. Cancel hardware engineering plans immediately."
    },
    market_analysis: {
      tam_signal: "Extremely narrow. Curated organic juice is a luxury niche.",
      saturation_level: "High: cheap manual juice presses are available at every retail store.",
      market_timing: "Late: consumers are highly price-sensitive in this environment."
    },
    funding_risk: {
      runway_risk: "Critical: heavy hardware burn rate will deplete capital within 3 months.",
      dilution_risk: "Severe: massive down-rounds expected if company survives.",
      funding_probability: 5
    }
  }
]

interface DashboardOverviewProps {
  user: any
}

export function DashboardOverview({ user }: DashboardOverviewProps) {
  const router = useRouter()
  const { theme } = useTheme()
  const [history, setHistory] = useState<any[]>([])
  const [selectedAnalysis, setSelectedAnalysis] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  
  const supabase = createClient()

  useEffect(() => {
    async function loadHistory() {
      setLoading(true)
      if (!user || !supabase) {
        // Fallback seed data in local mode
        setHistory(SEED_HISTORY)
        setSelectedAnalysis(SEED_HISTORY[0]) // Default to Deadpool AI autopsy seed report
        setLoading(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from("analyses")
          .select("*")
          .order("created_at", { ascending: false })

        if (error) throw error

        if (data && data.length > 0) {
          // Prepend our custom premium Deadpool AI report to history so it's always accessible!
          const combined = [SEED_HISTORY[0], ...data]
          setHistory(combined)
          setSelectedAnalysis(SEED_HISTORY[0])
        } else {
          setHistory(SEED_HISTORY)
          setSelectedAnalysis(SEED_HISTORY[0])
        }
      } catch (err) {
        console.error("Failed to load analyses history from Supabase Postgres:", err)
        setHistory(SEED_HISTORY)
        setSelectedAnalysis(SEED_HISTORY[0])
      } finally {
        setLoading(false)
      }
    }

    loadHistory()
  }, [user, supabase])

  // Sign out helper
  const handleSignOut = async () => {
    if (supabase) {
      await supabase.auth.signOut()
      router.push("/auth/sign-in")
      router.refresh()
    }
  }

  // Aggregate metrics calculations
  const calculateAggregates = () => {
    if (history.length === 0) return { avgRisk: 0, satCount: "0%", avgTeam: 0, avgRealism: 0 }
    
    const sumRisk = history.reduce((sum, item) => sum + item.overall_failure_score, 0)
    const avgRisk = Math.round(sumRisk / history.length)

    const sumTeam = history.reduce((sum, item) => sum + (100 - item.category_scores.team_strength), 0)
    const avgTeam = Number((sumTeam / history.length / 10).toFixed(1))

    const sumRealism = history.reduce((sum, item) => sum + (100 - item.category_scores.financial_realism), 0)
    const avgRealism = Number((sumRealism / history.length / 10).toFixed(1))

    // Count highly saturated or late markets
    const highRiskDecks = history.filter((item) => item.overall_failure_score >= 60).length
    const satPercentage = Math.round((highRiskDecks / history.length) * 100)

    return {
      avgRisk: `${avgRisk}%`,
      satCount: `${satPercentage}%`,
      avgTeam: `${avgTeam} / 10`,
      avgRealism: `${avgRealism} / 10`
    }
  }

  const aggregates = calculateAggregates()

  // Format date helper
  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="space-y-8">
      <AnimatePresence mode="wait">
        {!selectedAnalysis ? (
          // Grid View: aggregate metrics & past files history list
          <motion.div
            key="dashboard-grid"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-6 ${
              theme === "light" ? "border-black/10" : "border-white/10"
            }`}>
              <div className="space-y-1">
                <p className={`font-satoshi text-xs uppercase tracking-[0.24em] ${
                  theme === "light" ? "text-[#666666]" : "text-[#8A8A8A]"
                }`}>
                  Founder Intelligence Suite
                </p>
                <h1 className={`font-grotesk text-4xl md:text-5xl font-bold ${
                  theme === "light" ? "text-[#111111]" : "text-[#F5F5F5]"
                }`}>
                  Autopsy Dashboard
                </h1>
                <p className={`max-w-2xl text-xs ${
                  theme === "light" ? "text-[#666666]" : "text-[#8A8A8A]"
                }`}>
                  Overview of uploaded decks and failure risks for {user?.email || "Local Demo Mode"}.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => router.push("/#analysis")}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#FFB020] to-[#FF3B30] px-4 py-2.5 text-xs font-semibold text-[#050505] hover:opacity-90 transition-opacity"
                >
                  <Upload className="h-3.5 w-3.5" />
                  Analyze Pitch Deck
                </button>
                {user && (
                  <button
                    onClick={handleSignOut}
                    className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold transition-colors ${
                      theme === "light"
                        ? "border-black/10 bg-black/5 text-[#111111] hover:bg-black/10"
                        : "border-white/10 bg-white/5 text-[#F5F5F5] hover:bg-white/10"
                    }`}
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>

            {/* aggregate cards metrics */}
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <Card tone="danger">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className={`text-xs ${theme === "light" ? "text-[#666666]" : "text-[#8A8A8A]"}`}>
                      Composite Failure Risk
                    </p>
                    <p className="mt-2 font-grotesk text-3xl font-bold text-[#FF3B30]">{aggregates.avgRisk}</p>
                    <p className={`mt-1 text-[10px] ${theme === "light" ? "text-[#777777]" : "text-[#8A8A8A]"}`}>
                      Weighted cross-deck failure risk
                    </p>
                  </div>
                  <div className={`rounded-xl border p-2 text-[#FF3B30] ${
                    theme === "light" ? "border-black/5 bg-black/5" : "border-white/10 bg-black/40"
                  }`}>
                    <AlertCircle className="h-4 w-4 animate-pulse" />
                  </div>
                </div>
              </Card>

              <Card tone="warning">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className={`text-xs ${theme === "light" ? "text-[#666666]" : "text-[#8A8A8A]"}`}>
                      High Risk Scenarios
                    </p>
                    <p className="mt-2 font-grotesk text-3xl font-bold text-[#FFB020]">{aggregates.satCount}</p>
                    <p className={`mt-1 text-[10px] ${theme === "light" ? "text-[#777777]" : "text-[#8A8A8A]"}`}>
                      Decks rated above 60% failure
                    </p>
                  </div>
                  <div className={`rounded-xl border p-2 text-[#FFB020] ${
                    theme === "light" ? "border-black/5 bg-black/5" : "border-white/10 bg-black/40"
                  }`}>
                    <Radar className="h-4 w-4" />
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className={`text-xs ${theme === "light" ? "text-[#666666]" : "text-[#8A8A8A]"}`}>
                      Avg Team Capability
                    </p>
                    <p className={`mt-2 font-grotesk text-3xl font-bold ${
                      theme === "light" ? "text-[#111111]" : "text-[#F5F5F5]"
                    }`}>
                      {aggregates.avgTeam}
                    </p>
                    <p className={`mt-1 text-[10px] ${theme === "light" ? "text-[#777777]" : "text-[#8A8A8A]"}`}>
                      Founder alignment index
                    </p>
                  </div>
                  <div className={`rounded-xl border p-2 text-[#FF3B30] ${
                    theme === "light" ? "border-black/5 bg-black/5" : "border-white/10 bg-black/40"
                  }`}>
                    <Users className="h-4 w-4" />
                  </div>
                </div>
              </Card>

              <Card tone="subtle">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className={`text-xs ${theme === "light" ? "text-[#666666]" : "text-[#8A8A8A]"}`}>
                      Avg Financial Realism
                    </p>
                    <p className={`mt-2 font-grotesk text-3xl font-bold ${
                      theme === "light" ? "text-[#555555]" : "text-[#8A8A8A]"
                    }`}>
                      {aggregates.avgRealism}
                    </p>
                    <p className={`mt-1 text-[10px] ${theme === "light" ? "text-[#777777]" : "text-[#8A8A8A]"}`}>
                      Cash projections benchmark
                    </p>
                  </div>
                  <div className={`rounded-xl border p-2 text-[#FFB020] ${
                    theme === "light" ? "border-black/5 bg-black/5" : "border-white/10 bg-black/40"
                  }`}>
                    <TrendingDown className="h-4 w-4" />
                  </div>
                </div>
              </Card>
            </div>

            {/* List and Category breakdown */}
            <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
              {/* Chronological Analyses List */}
              <Card className="flex flex-col h-full min-h-[400px]">
                <div className="flex justify-between items-center mb-6">
                  <div className="space-y-1">
                    <h2 className={`font-grotesk text-xl font-bold ${
                      theme === "light" ? "text-[#111111]" : "text-[#F5F5F5]"
                    }`}>
                      Analysis History
                    </h2>
                    <p className={`text-xs ${theme === "light" ? "text-[#666666]" : "text-[#8A8A8A]"}`}>
                      Chronological log of evaluated files.
                    </p>
                  </div>
                  {loading && <RefreshCw className="h-4 w-4 animate-spin text-[#FF3B30]" />}
                </div>

                <div className="flex-grow space-y-3 overflow-y-auto max-h-[480px] pr-1">
                  {loading ? (
                    <div className="space-y-4">
                      {[1, 2].map((i) => (
                        <div key={i} className={`h-20 rounded-xl animate-pulse ${
                          theme === "light" ? "bg-black/5" : "bg-white/5"
                        }`} />
                      ))}
                    </div>
                  ) : history.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                      <div className={`rounded-full p-4 border ${
                        theme === "light" ? "bg-black/5 border-black/10" : "bg-white/5 border-white/10"
                      }`}>
                        <Sparkles className="h-6 w-6 text-[#FF3B30]" />
                      </div>
                      <div>
                        <h3 className={`font-grotesk text-lg font-bold ${
                          theme === "light" ? "text-[#111111]" : "text-[#F5F5F5]"
                        }`}>
                          No decks uploaded yet
                        </h3>
                        <p className={`text-xs max-w-sm mt-1 ${theme === "light" ? "text-[#666666]" : "text-[#8A8A8A]"}`}>
                          Upload your startup PDF/PPTX to populate the failure risk reports history database.
                        </p>
                      </div>
                    </div>
                  ) : (
                    history.map((analysis) => {
                      const isHigh = analysis.overall_failure_score >= 60
                      const isLow = analysis.overall_failure_score <= 35
                      return (
                        <motion.div
                          key={analysis.id}
                          whileHover={{ x: 4 }}
                          onClick={() => setSelectedAnalysis(analysis)}
                          className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                            theme === "light" 
                              ? "border-black/5 bg-black/[0.01] hover:bg-black/[0.03]" 
                              : "border-white/5 bg-white/[0.01] hover:bg-white/[0.04]"
                          }`}
                        >
                          <div className="flex flex-col gap-1.5 min-w-0 pr-4">
                            <span className={`font-grotesk text-sm font-semibold truncate block transition-colors ${
                              theme === "light" ? "text-[#111111]" : "text-[#F5F5F5]"
                            }`}>
                              {analysis.source_file_name}
                            </span>
                            <div className="flex items-center gap-2 text-[10px] font-mono tracking-wide">
                              <span className={`uppercase font-bold ${theme === "light" ? "text-[#777777]" : "text-[#8A8A8A]"}`}>
                                {analysis.source_file_type}
                              </span>
                              <span className="text-[#8A8A8A]">•</span>
                              <span className={theme === "light" ? "text-[#777777]" : "text-[#8A8A8A]"}>
                                {formatBytes(analysis.source_file_size)}
                              </span>
                              <span className="text-[#8A8A8A]">•</span>
                              <span className={theme === "light" ? "text-[#777777]" : "text-[#8A8A8A]"}>
                                {formatDate(analysis.created_at)}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <Badge variant={isHigh ? "danger" : isLow ? "neutral" : "warning"}>
                              {analysis.overall_failure_score}% Risk
                            </Badge>
                            <ChevronRight className={`h-4 w-4 ${
                              theme === "light" ? "text-black/45" : "text-[#8A8A8A]"
                            }`} />
                          </div>
                        </motion.div>
                      )
                    })
                  )}
                </div>
              </Card>

              {/* Dynamic Category Breakdown */}
              <Card className="flex flex-col h-full justify-between">
                <div>
                  <h2 className={`font-grotesk text-xl font-bold ${
                    theme === "light" ? "text-[#111111]" : "text-[#F5F5F5]"
                  }`}>
                    Category Benchmarks
                  </h2>
                  <p className={`text-xs mt-1 ${theme === "light" ? "text-[#666666]" : "text-[#8A8A8A]"}`}>
                    Weighted across all compiled historical startups.
                  </p>
                </div>
                
                <div className="space-y-6 py-6">
                  {[
                    { label: "Market Clarity", field: "market_clarity" },
                    { label: "Team Capability", field: "team_strength" },
                    { label: "Financial Realism", field: "financial_realism" },
                    { label: "Defensibility", field: "differentiation" },
                    { label: "Execution Risk", field: "execution_risk" }
                  ].map((category) => {
                    // Compute average of each category in history
                    const sum = history.reduce((s, item) => s + (item.category_scores?.[category.field as keyof typeof item.category_scores] || 0), 0)
                    const avg = history.length > 0 ? Math.round(sum / history.length) : 0
                    
                    return (
                      <div key={category.label}>
                        <div className="mb-2 flex justify-between text-xs font-semibold">
                          <span className={theme === "light" ? "text-[#666666]" : "text-[#8A8A8A]"}>{category.label}</span>
                          <span className={theme === "light" ? "text-[#111111]" : "text-[#F5F5F5]"}>{avg}%</span>
                        </div>
                        <div className={`h-1.5 overflow-hidden rounded-full ${
                          theme === "light" ? "bg-black/5" : "bg-white/5"
                        }`}>
                          <motion.div
                            className="h-full bg-gradient-to-r from-[#FFB020] to-[#FF3B30]"
                            initial={{ width: 0 }}
                            animate={{ width: `${avg}%` }}
                            transition={{ duration: 1.1, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>

                <Badge variant="warning" className="w-fit">
                  Integrations active
                </Badge>
              </Card>
            </div>
          </motion.div>
        ) : (
          // Detailed Report View: Full cinematic detailed report transitions
          <motion.div
            key="dashboard-detail"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSelectedAnalysis(null)}
                className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-colors ${
                  theme === "light"
                    ? "border-black/10 bg-black/5 text-[#111111] hover:bg-black/10"
                    : "border-white/10 bg-white/5 text-[#F5F5F5] hover:bg-white/10"
                }`}
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div className="space-y-0.5">
                <p className={`font-satoshi text-[10px] uppercase tracking-[0.24em] ${
                  theme === "light" ? "text-[#666666]" : "text-[#8A8A8A]"
                }`}>
                  Intelligence Autopsy Report
                </p>
                <h1 className={`font-grotesk text-2xl md:text-3xl font-bold truncate max-w-lg transition-colors ${
                  theme === "light" ? "text-[#111111]" : "text-[#F5F5F5]"
                }`}>
                  {selectedAnalysis.source_file_name}
                </h1>
              </div>
            </div>

            {/* Cinematic details section: Animating risk gauge centerpiece */}
            <div className="flex justify-center py-6">
              <RiskGauge score={selectedAnalysis.overall_failure_score} isAnimating={true} />
            </div>

            {/* Comprehensive details layout including standard items and dynamic sections */}
            <div className="grid gap-8">
              {/* Holographic Insight cards representing the six vital failure coordinates */}
              <section className="space-y-2">
                <div className="flex items-center gap-2">
                  <Radar className={`h-5 w-5 animate-spin-slow ${
                    selectedAnalysis.overall_failure_score >= 60 ? "text-[#FF3B30]" : "text-[#FFB020]"
                  }`} />
                  <h3 className={`font-grotesk text-xl font-bold ${
                    theme === "light" ? "text-[#111111]" : "text-[#F5F5F5]"
                  }`}>
                    Forensic Coordinates
                  </h3>
                </div>
                <InsightCards analysis={selectedAnalysis} />
              </section>

              {/* Startup category risk scores */}
              <section>
                <CategoryScores scores={selectedAnalysis.category_scores} />
              </section>

              {/* Structural failure reasons */}
              <section>
                <FailureReasons reasons={selectedAnalysis.top_failure_reasons} />
              </section>

              {/* Startup comparisons */}
              <section>
                <ComparableFailures comparisons={selectedAnalysis.startup_comparison} />
              </section>

              {/* Tactical Recommendations playbook */}
              <section>
                <Recommendations recommendations={selectedAnalysis.recommendations} />
              </section>

              {/* Roast mode savage commentary */}
              <section className="space-y-4">
                <h3 className={`font-grotesk text-xl font-bold ${
                  theme === "light" ? "text-[#111111]" : "text-[#F5F5F5]"
                }`}>
                  Roast Mode Output (The Savage Truth)
                </h3>
                <div className={`rounded-2xl border p-6 transition-all duration-300 ${
                  theme === "light" 
                    ? "border-[#FF3B30]/30 bg-[#FF3B30]/5 text-[#C02010]" 
                    : "border-[#FF3B30]/25 bg-[#0A0A0A]/90 text-[#FFB020]"
                }`}>
                  <p className="font-mono text-sm leading-relaxed whitespace-pre-wrap">
                    {selectedAnalysis.roast_mode_output}
                  </p>
                </div>
              </section>

              {/* Investor readiness audit */}
              <section className="space-y-4">
                <h3 className={`font-grotesk text-xl font-bold ${
                  theme === "light" ? "text-[#111111]" : "text-[#F5F5F5]"
                }`}>
                  Investor Readiness Assessment
                </h3>
                <div className={`rounded-2xl border p-6 transition-all duration-300 ${
                  theme === "light" 
                    ? "border-[#34C759]/30 bg-[#34C759]/5 text-[#1E8A38]" 
                    : "border-[#34C759]/20 bg-[#34C759]/5 text-[#F5F5F5]"
                }`}>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`font-semibold ${
                        theme === "light" ? "text-[#333333]" : "text-[#F5F5F5]"
                      }`}>Readiness Score</span>
                      <span className={`font-grotesk text-3xl font-bold ${
                        theme === "light" ? "text-[#16A34A]" : "text-[#34C759]"
                      }`}>
                        {selectedAnalysis.investor_readiness?.score || 100 - selectedAnalysis.overall_failure_score}/100
                      </span>
                    </div>
                    <p className={`leading-relaxed text-sm ${
                      theme === "light" ? "text-[#555555]" : "text-[#B0B0B0]"
                    }`}>
                      {selectedAnalysis.investor_readiness?.summary || "No description provided."}
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

