"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Gauge,
  Landmark,
  Radar,
  RefreshCw,
  Share2,
  ShieldAlert,
  Sparkles,
  Upload,
  Users,
  TrendingDown,
  Flame,
} from "lucide-react"
import type { AIAnalysis } from "@/backend/models/analysis"
import { Card } from "@/components/ui/card"
import { RiskGauge } from "@/components/dashboard/risk-gauge-animated"
import { UploadDropzone } from "@/features/upload/upload-dropzone"
import { createClient } from "@/lib/supabase/client"

const AUTOPSY_STAGES = [
  "Ingesting pitch deck...",
  "Parsing slide structures...",
  "Interrogating financial models...",
  "Cross-referencing failure database...",
  "Running Gemini AI autopsy engine...",
  "Generating classified report...",
]

const CATEGORY_META = {
  market_clarity: {
    label: "Market Timing",
    icon: Radar,
    short: "How convincingly the deck explains why this market is ready now.",
    fix: "Show a sharper wedge, a real buying trigger, and the exact customer pain that is urgent today.",
    diagnosis:
      "Weak market timing usually means the thesis reads like a category summary instead of a credible opening in the market.",
  },
  team_strength: {
    label: "Team",
    icon: Users,
    short: "Whether the team looks capable of executing the claim under real pressure.",
    fix: "Replace generic bios with proof of repeated execution, domain depth, and visible founder-market fit.",
    diagnosis:
      "A weak team score usually signals that the company is asking investors to believe in ambition without enough execution evidence.",
  },
  financial_realism: {
    label: "Financials",
    icon: Landmark,
    short: "How grounded the model is in actual unit economics and burn logic.",
    fix: "Anchor the model in conservative conversion assumptions, clear burn milestones, and a believable path to capital efficiency.",
    diagnosis:
      "Overheated financial assumptions are one of the fastest ways to destroy credibility because they broadcast wishful thinking.",
  },
  differentiation: {
    label: "Competition",
    icon: ShieldAlert,
    short: "How hard it is for a competitor to duplicate the product or message.",
    fix: "Build a moat story around proprietary data, distribution advantage, or workflow lock-in instead of generic feature lists.",
    diagnosis:
      "If the differentiation score is weak, the deck looks vulnerable to being copied, bundled, or undercut immediately.",
  },
  execution_risk: {
    label: "Execution",
    icon: Gauge,
    short: "How much operational friction stands between the pitch and reality.",
    fix: "Reduce the scope of the first launch, collapse unnecessary dependencies, and prove one narrow execution loop.",
    diagnosis:
      "High execution risk means the plan is heavier than the team, the timeline, or the current cash position can support.",
  },
} as const

type CategoryKey = keyof AIAnalysis["category_scores"]

function clamp(value: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value))
}

function formatPercent(value: number) {
  return `${Math.round(clamp(value))}%`
}

function formatTimestamp(isoString: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(isoString))
}

function formatStartupName(fileName: string) {
  return fileName
    .replace(/\.[^/.]+$/, "")
    .replace(/[-_](pitch)?[-_]?deck/gi, "")
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
}

function bandForScore(score: number) {
  if (score >= 75) {
    return {
      tone: "critical",
      label: "Severe",
      accentClass: "text-[#FF3B30]",
      borderClass: "border-[#FF3B30]/25",
      bgClass: "bg-[#FF3B30]/10",
      dotClass: "bg-[#FF3B30] shadow-[0_0_12px_rgba(255,59,48,0.75)]",
      chipClass: "bg-[#FF3B30]/15 text-[#FF3B30]",
      barClass: "from-[#FF3B30] to-[#FFB020]",
      shadowClass: "shadow-[0_0_18px_rgba(255,59,48,0.35)]",
    }
  }

  if (score >= 50) {
    return {
      tone: "high",
      label: "High",
      accentClass: "text-[#FF9500]",
      borderClass: "border-[#FF9500]/25",
      bgClass: "bg-[#FF9500]/10",
      dotClass: "bg-[#FF9500] shadow-[0_0_12px_rgba(255,149,0,0.75)]",
      chipClass: "bg-[#FF9500]/15 text-[#FF9500]",
      barClass: "from-[#FF9500] to-[#FFB020]",
      shadowClass: "shadow-[0_0_18px_rgba(255,149,0,0.3)]",
    }
  }

  if (score >= 25) {
    return {
      tone: "medium",
      label: "Elevated",
      accentClass: "text-[#FFB020]",
      borderClass: "border-[#FFB020]/25",
      bgClass: "bg-[#FFB020]/10",
      dotClass: "bg-[#FFB020] shadow-[0_0_12px_rgba(255,176,32,0.75)]",
      chipClass: "bg-[#FFB020]/15 text-[#FFB020]",
      barClass: "from-[#FFB020] to-[#FF9500]",
      shadowClass: "shadow-[0_0_18px_rgba(255,176,32,0.28)]",
    }
  }

  return {
    tone: "low",
    label: "Contained",
    accentClass: "text-[#34C759]",
    borderClass: "border-[#34C759]/25",
    bgClass: "bg-[#34C759]/10",
    dotClass: "bg-[#34C759] shadow-[0_0_12px_rgba(52,199,89,0.75)]",
    chipClass: "bg-[#34C759]/15 text-[#34C759]",
    barClass: "from-[#34C759] to-[#30B0C0]",
    shadowClass: "shadow-[0_0_18px_rgba(52,199,89,0.28)]",
  }
}

function overallSummary(score: number) {
  if (score >= 80) {
    return "This pitch is structurally fragile and still needs a credible moat, cleaner economics, and a more defensible launch path."
  }

  if (score >= 60) {
    return "The business is readable, but the thesis still depends on assumptions that could break under normal investor scrutiny."
  }

  if (score >= 40) {
    return "There is a viable story here, but the current version still reads like an early operating draft rather than a fundable machine."
  }

  return "The deck has real survival potential, but the analysis still sees enough friction to warrant disciplined execution."
}

function confidenceFromSignals(analysis: AIAnalysis) {
  return clamp(
    Math.round(
      analysis.overall_failure_score * 0.42 +
        analysis.similarity_score * 0.33 +
        (100 - analysis.investor_readiness.score) * 0.25
    ),
    58,
    98
  )
}

function stageForSimilarity(similarity: number) {
  if (similarity >= 80) return 3
  if (similarity >= 60) return 2
  return 1
}

function impactMeta(priority: AIAnalysis["recommendations"][number]["priority"]) {
  switch (priority) {
    case "high":
      return { badge: "Priority 01", impact: "Very High", difficulty: "Hard", timeline: "0-2 weeks", textClass: "text-[#FF3B30]", bgClass: "bg-[#FF3B30]/15", borderClass: "border-[#FF3B30]/25" }
    case "medium":
      return { badge: "Priority 02", impact: "High", difficulty: "Moderate", timeline: "2-6 weeks", textClass: "text-[#FFB020]", bgClass: "bg-[#FFB020]/15", borderClass: "border-[#FFB020]/25" }
    default:
      return { badge: "Priority 03", impact: "Material", difficulty: "Low", timeline: "6-12 weeks", textClass: "text-[#34C759]", bgClass: "bg-[#34C759]/15", borderClass: "border-[#34C759]/25" }
  }
}

function categoryConfidence(score: number) {
  return clamp(Math.round(64 + Math.abs(score - 50) * 0.6), 64, 99)
}

export function AnalysisDashboard() {
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null)
  const [loading, setLoading] = useState(false)
  const [stageIndex, setStageIndex] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [reportMeta, setReportMeta] = useState<{ fileName: string; analyzedAt: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const stageTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const supabase = createClient()

  useEffect(() => {
    if (!supabase) return

    supabase.auth.getSession().then(({ data: { session } }: { data: { session: any } }) => {
      setUser(session?.user ?? null)
    })
  }, [supabase])

  useEffect(() => {
    return () => {
      if (stageTimerRef.current) {
        clearInterval(stageTimerRef.current)
      }
    }
  }, [])

  const handleFileSelect = async (file: File) => {
    if (!file) return

    const validMimes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/vnd.ms-powerpoint",
    ]

    if (!validMimes.includes(file.type)) {
      setError("Please upload a PDF or PPTX file.")
      return
    }

    if (file.size > 20 * 1024 * 1024) {
      setError(`File too large. Maximum size: 20MB, your file: ${(file.size / 1024 / 1024).toFixed(2)}MB`)
      return
    }

    setLoading(true)
    setError(null)
    setStageIndex(0)
    setReportMeta({ fileName: file.name, analyzedAt: new Date().toISOString() })

    stageTimerRef.current = setInterval(() => {
      setStageIndex((prev) => Math.min(prev + 1, AUTOPSY_STAGES.length - 1))
    }, 3200)

    try {
      const fileType = file.name.toLowerCase().endsWith(".pdf") ? "pdf" : "pptx"
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        const errorMessage = result?.error?.message || result?.error || "Analysis request failed"
        const errorCode = result?.error?.code || "UNKNOWN_ERROR"

        let displayError = errorMessage
        if (errorCode === "PDF_PARSE_ERROR") {
          displayError = `PDF parsing failed: ${errorMessage}. The PDF might be corrupted, scanned, or password-protected.`
        } else if (errorCode === "MISSING_FIELDS") {
          displayError = "Invalid request: missing required fields."
        } else if (errorCode === "API_KEY_MISSING") {
          displayError = "API configuration error. Please contact support."
        } else if (errorCode === "MALFORMED_AI_RESPONSE") {
          displayError = "AI returned invalid response. Please try again."
        }

        throw new Error(displayError)
      }

      const parsedResult = result?.ok === true ? result?.data : result
      setAnalysis(parsedResult)

      if (supabase && user) {
        await supabase.from("analyses").insert({
          user_id: user.id,
          source_file_name: file.name,
          source_file_type: fileType,
          source_file_size: file.size,
          overall_failure_score: parsedResult.overall_failure_score,
          category_scores: parsedResult.category_scores,
          top_failure_reasons: parsedResult.top_failure_reasons,
          startup_comparison: parsedResult.startup_comparison,
          similarity_score: parsedResult.similarity_score,
          recommendations: parsedResult.recommendations,
          roast_mode_output: parsedResult.roast_mode_output,
          investor_readiness: parsedResult.investor_readiness,
          market_analysis: parsedResult.market_analysis,
          funding_risk: parsedResult.funding_risk,
          status: "success",
        })
      }
    } catch (err: any) {
      setError(err.message || "💀 Autopsy engine encountered an unexpected failure. Please retry.")
    } finally {
      setLoading(false)
      if (stageTimerRef.current) {
        clearInterval(stageTimerRef.current)
      }
      stageTimerRef.current = null
    }
  }

  const handleShare = async () => {
    if (!analysis) return

    const text = `💀 DEADPOOL AI AUTOPSY REPORT 💀\n\nStartup Failure Risk Score: ${analysis.overall_failure_score}/100\n\nTop Failure Reasons:\n${analysis.top_failure_reasons.slice(0, 3).map((reason) => `• ${reason}`).join("\n")}`

    if (navigator.share) {
      await navigator.share({ title: "💀 DEADPOOL AI Autopsy Report", text })
    } else {
      await navigator.clipboard.writeText(text)
      alert("Autopsy report copied to clipboard!")
    }
  }

  const restartAnalysis = () => {
    setAnalysis(null)
    setReportMeta(null)
    setError(null)
    setTimeout(() => {
      fileInputRef.current?.click()
    }, 40)
  }

  const selectedFileName = reportMeta?.fileName ?? "Uploaded deck"
  const startupName = formatStartupName(selectedFileName || "Uploaded deck") || "Untitled Startup"
  const analyzedAtLabel = reportMeta ? formatTimestamp(reportMeta.analyzedAt) : "Just now"

  const categoryCards = useMemo(() => {
    if (!analysis) return []

    return (Object.entries(analysis.category_scores) as Array<[CategoryKey, number]>).map(([key, score]) => {
      const meta = CATEGORY_META[key]
      const band = bandForScore(score)

      return {
        key,
        score,
        meta,
        band,
        confidence: categoryConfidence(score),
      }
    })
  }, [analysis])

  const comparisonRows = useMemo(() => {
    if (!analysis) return []

    return analysis.startup_comparison.map((comparison, index) => ({
      ...comparison,
      stage: stageForSimilarity(comparison.similarity),
      index,
    }))
  }, [analysis])

  const recommendationRows = useMemo(() => {
    if (!analysis) return []

    return analysis.recommendations.map((recommendation, index) => ({
      ...recommendation,
      index,
      meta: impactMeta(recommendation.priority),
    }))
  }, [analysis])

  if (loading) {
    return (
      <motion.div className="mx-auto w-full max-w-4xl space-y-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-10">
          <div className="flex flex-col items-center justify-center gap-6 py-10 text-center md:py-16">
            <div className="relative flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute h-28 w-28 rounded-full border border-[#FF3B30]/25"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute h-20 w-20 rounded-full border border-[#FFB020]/20"
              />
              <Sparkles className="h-10 w-10 text-[#FF3B30] drop-shadow-[0_0_12px_rgba(255,59,48,0.5)]" />
            </div>

            <div className="space-y-3 max-w-md">
              <p className="font-grotesk text-2xl font-bold text-[#F5F5F5]">DEADPOOL AI Autopsy in Progress</p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={stageIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="font-mono text-sm text-[#FF3B30]"
                >
                  {AUTOPSY_STAGES[stageIndex]}
                </motion.p>
              </AnimatePresence>

              <div className="flex justify-center gap-1 pt-2">
                {AUTOPSY_STAGES.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 w-7 rounded-full transition-all duration-500 ${index <= stageIndex ? "bg-[#FF3B30]" : "bg-white/10"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  if (error) {
    return (
      <motion.div className="mx-auto w-full max-w-xl" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
        <Card className="relative overflow-hidden border border-[#FF3B30]/30 bg-[linear-gradient(180deg,rgba(255,59,48,0.1),rgba(13,13,13,0.96))] p-8 text-center shadow-[0_24px_90px_rgba(255,59,48,0.08)]">
          <div className="space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#FF3B30]/25 bg-[#FF3B30]/10">
              <AlertTriangle className="h-8 w-8 text-[#FF3B30]" />
            </div>
            <div className="space-y-2">
              <p className="font-grotesk text-xl font-bold text-[#F5F5F5]">Autopsy Halted</p>
              <p className="text-sm leading-relaxed text-[#B0B0B0]">{error}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={restartAnalysis}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF3B30] px-6 py-3 text-sm font-semibold text-[#050505] transition-transform hover:scale-[1.01]"
              >
                <RefreshCw className="h-4 w-4" />
                Retry Autopsy
              </button>
              <button onClick={() => setError(null)} className="rounded-xl border border-white/10 px-6 py-3 text-sm text-[#8A8A8A] transition-colors hover:text-[#F5F5F5]">
                Back to Upload
              </button>
            </div>
          </div>
        </Card>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.pptx"
          title="Upload pitch deck"
          onChange={(event) => event.target.files?.[0] && handleFileSelect(event.target.files[0])}
          className="hidden"
        />
      </motion.div>
    )
  }

  if (!analysis) {
    return (
      <motion.div className="space-y-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <UploadDropzone onFileSelect={handleFileSelect} />
      </motion.div>
    )
  }

  const confidence = confidenceFromSignals(analysis)
  const survivalProbability = clamp(100 - analysis.overall_failure_score)
  const investorRejectionChance = clamp(100 - analysis.investor_readiness.score)
  const weakestCategory = [...categoryCards].sort((left, right) => right.score - left.score)[0]
  const strongestThreat = weakestCategory
    ? `${weakestCategory.meta.label} at ${formatPercent(weakestCategory.score)}`
    : "No dominant threat detected"
  const failureScoreBand = bandForScore(analysis.overall_failure_score)

  const telemetryRows = [
    {
      label: "Market Timing",
      value: analysis.category_scores.market_clarity,
      dotClass: "bg-[#FF3B30] shadow-[0_0_12px_rgba(255,59,48,0.75)]",
      barClass: "from-[#FF3B30] to-[#FFB020]",
      note: "Timing pressure",
    },
    {
      label: "Team",
      value: analysis.category_scores.team_strength,
      dotClass: "bg-[#FF9500] shadow-[0_0_12px_rgba(255,149,0,0.75)]",
      barClass: "from-[#FF9500] to-[#FFB020]",
      note: "Execution depth",
    },
    {
      label: "Competition",
      value: analysis.category_scores.differentiation,
      dotClass: "bg-[#FFB020] shadow-[0_0_12px_rgba(255,176,32,0.75)]",
      barClass: "from-[#FFB020] to-[#FF9500]",
      note: "Moat pressure",
    },
    {
      label: "Financials",
      value: analysis.category_scores.financial_realism,
      dotClass: "bg-[#FF3B30] shadow-[0_0_12px_rgba(255,59,48,0.75)]",
      barClass: "from-[#FF3B30] to-[#FFB020]",
      note: "Model pressure",
    },
    {
      label: "Traction",
      value: clamp(Math.round((survivalProbability + analysis.category_scores.team_strength) / 2)),
      dotClass: "bg-[#FFB020] shadow-[0_0_12px_rgba(255,176,32,0.75)]",
      barClass: "from-[#FFB020] to-[#FF9500]",
      note: "Signal pressure",
    },
    {
      label: "Execution",
      value: analysis.category_scores.execution_risk,
      dotClass: "bg-[#FF9500] shadow-[0_0_12px_rgba(255,149,0,0.75)]",
      barClass: "from-[#FF9500] to-[#FFB020]",
      note: "Delivery pressure",
    },
    {
      label: "Investor Readiness",
      value: investorRejectionChance,
      dotClass: "bg-[#FF3B30] shadow-[0_0_12px_rgba(255,59,48,0.75)]",
      barClass: "from-[#FF3B30] to-[#FF9500]",
      note: "Rejection risk",
    },
  ]

  return (
    <motion.div className="mx-auto w-full max-w-7xl space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
      <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#090909] p-4 shadow-[0_30px_120px_rgba(0,0,0,0.45)] md:p-5 lg:p-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,59,48,0.12),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(255,176,32,0.08),transparent_34%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.15] [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:40px_40px]" />

        <div className="relative flex flex-col gap-4 border-b border-white/6 pb-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#FF3B30]/25 bg-[#FF3B30]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#FFB0AA]">
                <span className="h-2 w-2 rounded-full bg-[#FF3B30] shadow-[0_0_12px_rgba(255,59,48,0.75)]" />
                Deadpool AI Analysis Report
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8A8A8A]">
                <Clock3 className="h-3.5 w-3.5" />
                {analyzedAtLabel}
              </span>
            </div>
            <div>
              <h2 className="font-grotesk text-3xl font-black tracking-tight text-[#F5F5F5] md:text-4xl">
                {startupName}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#8A8A8A] md:text-base">
                Classified AI startup autopsy sequence. The system has triangulated survival risk, market pressure, and investor rejection probability across the full deck.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 rounded-xl border border-[#FF3B30]/25 bg-[#FF3B30]/10 px-4 py-2 text-sm font-semibold text-[#FFB0AA] transition-all hover:border-[#FF3B30]/40 hover:bg-[#FF3B30]/15"
            >
              <Share2 className="h-4 w-4" />
              Share Roast
            </button>
            <button
              onClick={restartAnalysis}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-[#E5E5E5] transition-all hover:border-white/20 hover:bg-white/[0.06]"
            >
              <Upload className="h-4 w-4" />
              Analyze New Deck
            </button>
          </div>
        </div>

        <div className="relative mt-5 grid grid-cols-12 gap-5">
          <div className="col-span-12 lg:col-span-4 space-y-3 min-w-0">
            <Card className="relative overflow-hidden border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#6E6E6E]">Analysis header</div>
                  <h3 className="mt-2 font-grotesk text-xl font-bold text-[#F5F5F5]">Startup dossier locked</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#8A8A8A] max-w-prose">
                    AI status is active, feed is stable, and the evidence confidence is strong enough to support a sharp verdict.
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#FF3B30]/20 bg-[#FF3B30]/10">
                  <Sparkles className="h-5 w-5 text-[#FF3B30]" />
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/8 bg-black/20 p-3.5 min-w-0">
                  <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#6E6E6E]">AI status</div>
                  <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-[#F5F5F5]">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FF3B30] shadow-[0_0_12px_rgba(255,59,48,0.85)]" />
                    Live inference
                  </div>
                </div>
                <div className="rounded-2xl border border-white/8 bg-black/20 p-3.5 min-w-0">
                  <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#6E6E6E]">Confidence</div>
                  <div className="mt-2 flex items-end gap-2">
                    <span className="font-grotesk text-3xl font-black text-[#F5F5F5]">{formatPercent(confidence)}</span>
                    <span className="pb-1 text-xs text-[#8A8A8A]">evidence confidence</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="border border-[#FF3B30]/15 bg-[linear-gradient(180deg,rgba(255,59,48,0.12),rgba(13,13,13,0.95))] p-5 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#FF3B30]/20 bg-[#FF3B30]/10 text-[#FF3B30]">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#8A8A8A]">Verdict card</div>
                  <h3 className="mt-1 font-grotesk text-2xl font-black tracking-tight text-[#F5F5F5]">
                    {failureScoreBand.label.toUpperCase()}
                  </h3>
                </div>
              </div>

              <div className="mt-3.5 flex items-end gap-3">
                <div className="font-grotesk text-5xl font-black tracking-tight text-[#FF3B30] drop-shadow-[0_0_16px_rgba(255,59,48,0.26)]">
                  {formatPercent(analysis.overall_failure_score)}
                </div>
                <div className="pb-2 text-sm text-[#8A8A8A]">failure probability</div>
              </div>
              <p className="mt-3.5 text-sm leading-relaxed text-[#B0B0B0] max-w-prose">{overallSummary(analysis.overall_failure_score)}</p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-3.5 min-w-0">
                  <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#6E6E6E]">Survival</div>
                  <div className="mt-2 flex items-end gap-2">
                    <span className="font-grotesk text-2xl font-black text-[#F5F5F5]">{formatPercent(survivalProbability)}</span>
                    <span className="pb-1 text-xs text-[#8A8A8A]">probability</span>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-3.5 min-w-0">
                  <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#6E6E6E]">Investor rejection</div>
                  <div className="mt-2 flex items-end gap-2">
                    <span className="font-grotesk text-2xl font-black text-[#F5F5F5]">{formatPercent(investorRejectionChance)}</span>
                    <span className="pb-1 text-xs text-[#8A8A8A]">chance</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#6E6E6E]">Key insights</div>
                  <h3 className="mt-2 font-grotesk text-xl font-bold text-[#F5F5F5]">Immediate fault lines</h3>
                </div>
                <BarChart3 className="h-5 w-5 text-[#FFB020]" />
              </div>

              <div className="mt-4 space-y-3.5">
                <InsightRow label="Biggest threat" value={strongestThreat} tone={failureScoreBand} />
                <InsightRow
                  label="Weakest category"
                  value={weakestCategory ? weakestCategory.meta.label : "Not available"}
                  tone={bandForScore(weakestCategory?.score ?? 0)}
                />
                <InsightRow label="Survival probability" value={formatPercent(survivalProbability)} tone={bandForScore(survivalProbability)} />
                <InsightRow label="Investor rejection chance" value={formatPercent(investorRejectionChance)} tone={bandForScore(investorRejectionChance)} />
              </div>
            </Card>
          </div>

          <div className="col-span-12 lg:col-span-5 space-y-3.5 min-w-0">
            <Card className="relative overflow-hidden border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.02))] p-5 backdrop-blur-xl">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,59,48,0.1),transparent_46%)]" />

              <div className="relative">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#6E6E6E]">Cinematic gauge</div>
                    <h3 className="mt-2 font-grotesk text-xl font-bold text-[#F5F5F5]">Risk cockpit</h3>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8A8A8A]">
                    Holographic needle
                  </div>
                </div>

                <div className="mt-1.5 flex justify-center">
                  <RiskGauge score={analysis.overall_failure_score} isAnimating />
                </div>

                <div className="mx-auto mt-3.5 max-w-prose text-center">
                  <p className="text-sm leading-relaxed text-[#B0B0B0] md:text-[15px]">
                    {overallSummary(analysis.overall_failure_score)}
                  </p>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <TelemetryChip label="TAM signal" value={analysis.market_analysis.tam_signal} dotClass="bg-[#FF3B30] shadow-[0_0_12px_rgba(255,59,48,0.75)]" />
                  <TelemetryChip label="Timing verdict" value={analysis.market_analysis.market_timing} dotClass="bg-[#FFB020] shadow-[0_0_12px_rgba(255,176,32,0.75)]" />
                  <TelemetryChip label="Funding probability" value={formatPercent(analysis.funding_risk.funding_probability)} dotClass="bg-[#FF9500] shadow-[0_0_12px_rgba(255,149,0,0.75)]" />
                </div>
              </div>
            </Card>
          </div>

          <div className="col-span-12 lg:col-span-3 space-y-3.5 min-w-0">
            <Card className="border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#6E6E6E]">Risk breakdown</div>
                  <h3 className="mt-2 font-grotesk text-xl font-bold text-[#F5F5F5]">Failure pressure map</h3>
                </div>
                <TrendingDown className="h-5 w-5 text-[#FFB020]" />
              </div>

              <div className="mt-4 space-y-3">
                {telemetryRows.map((row, index) => (
                  <div key={row.label} className="space-y-2">
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <div className="flex items-center gap-2 text-[#F5F5F5]">
                        <span className={`h-1.5 w-1.5 rounded-full ${row.dotClass}`} />
                        <span className="font-medium">{row.label}</span>
                      </div>
                      <div className="font-mono text-xs tracking-[0.3em] text-[#8A8A8A]">{formatPercent(row.value)}</div>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-white/6">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${clamp(row.value)}%` }}
                        transition={{ duration: 0.9, delay: 0.05 * index, ease: [0.22, 1, 0.36, 1] }}
                        className={`h-full rounded-full bg-gradient-to-r ${row.barClass}`}
                      />
                    </div>
                    <div className="text-[11px] leading-relaxed text-[#8A8A8A]">{row.note}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-white/8 bg-black/25 p-3.5">
                <div className="grid gap-3 sm:grid-cols-2">
                  <MiniStat label="Similarity to failure set" value={formatPercent(analysis.similarity_score)} accentClass="text-[#FFB020]" />
                  <MiniStat label="Investor readiness" value={formatPercent(analysis.investor_readiness.score)} accentClass="text-[#34C759]" />
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <TelemetryChip label="Market analysis" value={analysis.market_analysis.saturation_level} dotClass="bg-[#FF3B30] shadow-[0_0_12px_rgba(255,59,48,0.75)]" compact />
          <TelemetryChip label="Runway risk" value={analysis.funding_risk.runway_risk} dotClass="bg-[#FF9500] shadow-[0_0_12px_rgba(255,149,0,0.75)]" compact />
          <TelemetryChip label="Dilution risk" value={analysis.funding_risk.dilution_risk} dotClass="bg-[#FFB020] shadow-[0_0_12px_rgba(255,176,32,0.75)]" compact />
          <TelemetryChip label="Investor summary" value={analysis.investor_readiness.summary} dotClass="bg-[#34C759] shadow-[0_0_12px_rgba(52,199,89,0.75)]" compact />
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading
          eyebrow="Structured analysis"
          title="Category reasoning matrix"
          description="Each major risk vector is broken into a concise diagnosis, improvement path, and confidence indicator."
        />
        <div className="grid gap-4 xl:grid-cols-2">
          {categoryCards.map((category) => (
            <details
              key={category.key}
              className="group rounded-[26px] border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl transition-all duration-300 open:border-white/15 open:bg-white/[0.05]"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 [&::-webkit-details-marker]:hidden">
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${category.band.bgClass} ${category.band.borderClass} ${category.band.accentClass} ${category.band.shadowClass}`}
                  >
                    <category.meta.icon className="h-5 w-5" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-grotesk text-lg font-bold text-[#F5F5F5]">{category.meta.label}</h3>
                      <span className={`rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] ${category.band.chipClass}`}>
                        {formatPercent(category.score)} risk
                      </span>
                    </div>
                    <p className="max-w-2xl text-sm leading-relaxed text-[#B0B0B0]">{category.meta.short}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <div className="text-right">
                    <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#6E6E6E]">Confidence</div>
                    <div className="mt-1 text-sm font-semibold text-[#F5F5F5]">{formatPercent(category.confidence)}</div>
                  </div>
                  <ChevronDown className="h-5 w-5 text-[#8A8A8A] transition-transform duration-300 group-open:rotate-180" />
                </div>
              </summary>

              <div className="mt-4 grid gap-4 lg:grid-cols-[1.25fr_0.95fr]">
                <div className="space-y-3 rounded-2xl border border-white/8 bg-black/25 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#6E6E6E]">AI diagnosis</span>
                    <span className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] ${category.band.chipClass}`}>
                      {category.band.label}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-[#E6E6E6] break-words whitespace-normal max-w-prose">{category.meta.diagnosis}</p>
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                    <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#6E6E6E]">Recommended fix</div>
                    <p className="mt-2 text-sm leading-relaxed text-[#B0B0B0] break-words whitespace-normal max-w-prose">{category.meta.fix}</p>
                  </div>
                </div>

                <div className="space-y-3 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#6E6E6E]">Signal quality</div>
                      <p className="mt-2 text-sm leading-relaxed text-[#B0B0B0]">
                        Higher bars mean a stronger failure pressure in this category.
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`font-grotesk text-3xl font-black ${category.band.accentClass}`}>
                        {formatPercent(category.score)}
                      </div>
                    </div>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-white/6">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${category.score}%` }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      className={`h-full rounded-full bg-gradient-to-r ${category.band.barClass} ${category.band.shadowClass}`}
                    />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <MiniStat label="Score" value={formatPercent(category.score)} accentClass={category.band.accentClass} />
                    <MiniStat label="Confidence" value={formatPercent(category.confidence)} accentClass={category.band.accentClass} />
                  </div>
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading
          eyebrow="Failure stack"
          title="Top failure reasons"
          description="Ranked pressure points detected from the deck, rendered as a structured autopsy chain instead of a generic bullet list."
        />

        <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <Card className="border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl">
            <div className="space-y-3.5">
              {analysis.top_failure_reasons.map((reason, index) => {
                const severity = index === 0 ? "Critical" : index === 1 ? "Severe" : index === 2 ? "High" : "Elevated"

                return (
                  <motion.div
                    key={`${index}-${reason}`}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group rounded-2xl border border-white/8 bg-black/20 p-4 transition-all duration-300 hover:border-white/15 hover:bg-black/30"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border text-sm font-black ${index === 0 ? "border-[#FF3B30]/25 bg-[#FF3B30]/10 text-[#FF3B30]" : index === 1 ? "border-[#FF9500]/25 bg-[#FF9500]/10 text-[#FF9500]" : "border-[#FFB020]/25 bg-[#FFB020]/10 text-[#FFB020]"}`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div className="min-w-0 flex-1 space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] ${index === 0 ? "bg-[#FF3B30]/10 text-[#FF3B30]" : index === 1 ? "bg-[#FF9500]/10 text-[#FF9500]" : "bg-[#FFB020]/10 text-[#FFB020]"}`}
                          >
                            {severity}
                          </span>
                          <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#6E6E6E]">Impact vector</span>
                        </div>
                        <p className="text-sm leading-relaxed text-[#E6E6E6] break-words whitespace-normal max-w-prose">{reason}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </Card>

          <Card className="border border-[#FFB020]/15 bg-[linear-gradient(180deg,rgba(255,176,32,0.08),rgba(13,13,13,0.95))] p-4 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <TrendingDown className="h-5 w-5 text-[#FFB020]" />
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#8A8A8A]">Autopsy summary</div>
                <h3 className="mt-1 font-grotesk text-lg font-bold text-[#F5F5F5]">Structural collapse map</h3>
              </div>
            </div>

            <div className="mt-3.5 space-y-2.5">
                <SummaryLine label="Failure probability" value={formatPercent(analysis.overall_failure_score)} accentClass="text-[#FF3B30]" barClass="from-[#FF3B30] to-[#FFB020]" />
                <SummaryLine label="Investor rejection" value={formatPercent(investorRejectionChance)} accentClass="text-[#FF9500]" barClass="from-[#FF9500] to-[#FFB020]" />
                <SummaryLine label="Survival probability" value={formatPercent(survivalProbability)} accentClass="text-[#34C759]" barClass="from-[#34C759] to-[#30B0C0]" />
            </div>

            <div className="mt-5 rounded-2xl border border-white/8 bg-black/25 p-4 text-sm leading-relaxed text-[#B0B0B0]">
              <strong className="text-[#F5F5F5]">Interpretation:</strong> these reasons compound rather than exist in isolation. The deck is failing because the narrative, the economics, and the execution burden do not reinforce each other yet.
            </div>
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading
          eyebrow="Comparables"
          title="Startup comparison engine"
          description="Each card maps the current deck against a failed company pattern, with similarity rings and timeline cues."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {comparisonRows.map((comparison, index) => (
            <motion.div
              key={`${comparison.startup_name}-${index}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
            >
              <Card className="group relative h-full overflow-hidden border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl transition-all duration-300 hover:border-[#FFB020]/30 hover:bg-white/[0.05]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,176,32,0.08),transparent_44%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative flex items-start justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/35 font-grotesk text-sm font-black text-[#F5F5F5] transition-all duration-300 grayscale group-hover:grayscale-0">
                        {comparison.startup_name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-grotesk text-lg font-bold text-[#F5F5F5]">{comparison.startup_name}</h3>
                        <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#8A8A8A]">Pattern {index + 1}</p>
                      </div>
                    </div>

                    <p className="text-sm leading-relaxed text-[#B0B0B0] min-w-0 break-words whitespace-normal max-w-prose">{comparison.reason}</p>
                  </div>

                  <div className="relative flex h-20 w-20 shrink-0 items-center justify-center">
                    <svg className="h-full w-full -rotate-90" viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="28" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
                      <motion.circle
                        cx="40"
                        cy="40"
                        r="28"
                        fill="none"
                        stroke="#FFB020"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 28}
                        strokeDashoffset={(1 - comparison.similarity / 100) * (2 * Math.PI * 28)}
                        className="drop-shadow-[0_0_8px_rgba(255,176,32,0.45)]"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <div className="font-grotesk text-lg font-black text-[#FFB020]">{comparison.similarity}%</div>
                      <div className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#8A8A8A]">match</div>
                    </div>
                  </div>
                </div>

                <div className="relative mt-5 space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.35em] text-[#6E6E6E]">
                    <span>Failure timeline</span>
                    <span>{comparison.similarity >= 80 ? "Near-clone" : comparison.similarity >= 60 ? "Pattern match" : "Watchlist"}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {["Launch", "Scale", "Collapse"].map((label, timelineIndex) => (
                      <div
                        key={label}
                        className={`rounded-xl border p-2 text-center text-[10px] uppercase tracking-[0.28em] transition-all ${
                          timelineIndex + 1 <= comparison.stage
                            ? "border-[#FFB020]/30 bg-[#FFB020]/10 text-[#FFB020]"
                            : "border-white/8 bg-black/20 text-[#6E6E6E]"
                        }`}
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative mt-4 flex flex-wrap gap-2">
                  <PatternChip label={comparison.similarity >= 80 ? "Hyper-match" : comparison.similarity >= 60 ? "Distribution risk" : "Early warning"} />
                  <PatternChip label={comparison.similarity >= 70 ? "Moat collapse" : "Competitive pressure"} />
                  <PatternChip label={comparison.similarity >= 65 ? "Runway drag" : "Capital friction"} />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <SectionHeading
          eyebrow="Action engine"
          title="Recommendation playbook"
          description="Prioritized fixes are turned into an operational system with impact, difficulty, and rollout timelines."
        />

        <div className="grid gap-4 lg:grid-cols-2">
          {recommendationRows.map((recommendation, index) => (
            <motion.div
              key={`${recommendation.title}-${index}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
            >
              <details className="group rounded-[26px] border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl transition-all duration-300 open:border-white/15 open:bg-white/[0.05]">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 [&::-webkit-details-marker]:hidden">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] ${recommendation.meta.bgClass} ${recommendation.meta.textClass}`}
                      >
                        {recommendation.meta.badge}
                      </span>
                      <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8A8A8A]">
                        {recommendation.priority} priority
                      </span>
                    </div>
                    <h3 className="font-grotesk text-lg font-bold text-[#F5F5F5]">{recommendation.title}</h3>
                    <p className="max-w-2xl text-sm leading-relaxed text-[#B0B0B0] break-words whitespace-normal">{recommendation.action}</p>
                  </div>

                  <ChevronDown className="h-5 w-5 text-[#8A8A8A] transition-transform duration-300 group-open:rotate-180" />
                </summary>

                <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.95fr]">
                  <div className="space-y-3 rounded-2xl border border-white/8 bg-black/25 p-4">
                    <div className="flex items-center gap-2 text-[#F5F5F5]">
                      <ArrowUpRight className={`h-4 w-4 ${recommendation.meta.textClass}`} />
                      <span className="font-semibold">Actionable fix</span>
                    </div>
                    <p className="text-sm leading-relaxed text-[#B0B0B0] break-words whitespace-normal">{recommendation.action}</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <MiniStat label="Estimated impact" value={recommendation.meta.impact} accentClass={recommendation.meta.textClass} />
                      <MiniStat label="Difficulty" value={recommendation.meta.difficulty} accentClass={recommendation.meta.textClass} />
                    </div>
                  </div>

                  <div className="space-y-3 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#6E6E6E]">Rollout window</div>
                        <p className="mt-2 text-sm leading-relaxed text-[#B0B0B0]">
                          Deploy this fix inside a tight execution window so the deck shows momentum, not intent.
                        </p>
                      </div>
                      <Clock3 className="h-5 w-5 text-[#8A8A8A]" />
                    </div>

                    <div className="rounded-2xl border border-white/8 bg-black/25 p-4">
                      <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#6E6E6E]">Timeline</div>
                      <div className="mt-2 font-grotesk text-2xl font-black text-[#F5F5F5]">{recommendation.meta.timeline}</div>
                    </div>
                  </div>
                </div>
              </details>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#6E6E6E]">Classified narrative</div>
              <h3 className="mt-2 font-grotesk text-xl font-bold text-[#F5F5F5]">Roast mode transcript</h3>
            </div>
            <Flame className="h-5 w-5 text-[#FFB020]" />
          </div>

          <div className="mt-4 rounded-2xl border border-white/8 bg-black/30 p-4">
            <p className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-[#FFB020]">{analysis.roast_mode_output}</p>
          </div>
        </Card>

        <Card className="border border-[#34C759]/15 bg-[linear-gradient(180deg,rgba(52,199,89,0.08),rgba(13,13,13,0.95))] p-4 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-[#34C759]" />
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#8A8A8A]">Investor readiness</div>
              <h3 className="mt-1 font-grotesk text-xl font-bold text-[#F5F5F5]">Funding posture</h3>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <SummaryLine label="Readiness score" value={formatPercent(analysis.investor_readiness.score)} accentClass="text-[#34C759]" barClass="from-[#34C759] to-[#30B0C0]" />
            <div className="rounded-2xl border border-white/8 bg-black/25 p-4 text-sm leading-relaxed text-[#B0B0B0]">
              <strong className="text-[#F5F5F5]">Summary:</strong> {analysis.investor_readiness.summary}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <MiniStat label="Runway risk" value={analysis.funding_risk.runway_risk} accentClass="text-[#FF9500]" />
              <MiniStat label="Dilution risk" value={analysis.funding_risk.dilution_risk} accentClass="text-[#FFB020]" />
            </div>
          </div>
        </Card>
      </section>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.pptx"
        title="Upload pitch deck"
        onChange={(event) => {
          setAnalysis(null)
          event.target.files?.[0] && handleFileSelect(event.target.files[0])
        }}
        className="hidden"
      />
    </motion.div>
  )
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="space-y-2">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#8A8A8A]">
        {eyebrow}
      </div>
      <h2 className="font-grotesk text-2xl font-bold text-[#F5F5F5] md:text-3xl">{title}</h2>
      <p className="max-w-3xl text-sm leading-relaxed text-[#8A8A8A] md:text-base">{description}</p>
    </div>
  )
}

function InsightRow({ label, value, tone }: { label: string; value: string; tone: ReturnType<typeof bandForScore> }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-black/20 p-4 min-w-0">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#6E6E6E]">{label}</span>
        <span className={`h-2.5 w-2.5 rounded-full ${tone.dotClass}`} />
      </div>
      <div className="mt-2 text-sm leading-relaxed text-[#F5F5F5] break-words whitespace-normal">{value}</div>
    </div>
  )
}

function TelemetryChip({ label, value, dotClass, compact = false }: { label: string; value: string; dotClass: string; compact?: boolean }) {
  return (
    <div className={`rounded-2xl border border-white/8 bg-white/[0.03] p-4 ${compact ? "min-h-[108px]" : ""} min-w-0`}>
      <div className="flex items-center justify-between gap-3">
        <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#6E6E6E]">{label}</span>
        <span className={`h-2.5 w-2.5 rounded-full ${dotClass}`} />
      </div>
      <div className={`mt-3 font-medium text-[#F5F5F5] ${compact ? "text-sm leading-relaxed" : "text-base leading-relaxed"} break-words whitespace-normal min-w-0`}>{value}</div>
    </div>
  )
}

function SummaryLine({ label, value, accentClass, barClass }: { label: string; value: string; accentClass: string; barClass: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-[#E5E5E5]">{label}</span>
        <span className={`font-mono text-xs uppercase tracking-[0.25em] ${accentClass}`}>{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/6">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full rounded-full bg-gradient-to-r ${barClass}`}
        />
      </div>
    </div>
  )
}

function MiniStat({ label, value, accentClass }: { label: string; value: string; accentClass: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
      <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#6E6E6E]">{label}</div>
      <div className={`mt-2 text-sm font-semibold ${accentClass}`}>
        {value}
      </div>
    </div>
  )
}

function PatternChip({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#A0A0A0]">
      {label}
    </span>
  )
}
