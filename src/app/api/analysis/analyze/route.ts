/**
 * LEGACY ROUTE: POST /api/analysis/analyze
 *
 * This route is maintained for backward compatibility only.
 * The primary AI analysis endpoint is now /api/analyze (Gemini-powered).
 *
 * This route always returns a rule-based analysis result.
 */

import { NextRequest } from "next/server"
// Note: AI analysis now handled by /api/analyze route using @google/generative-ai
import { type AIAnalysis } from "@/backend/models/analysis"
import { FAILURE_DATABASE } from "@/data/failure-database"
import { parseUploadedDocument } from "@/backend/parsers"
import { detectFileKind } from "@/backend/utils/validation"
import { okResponse, errorResponse } from "@/backend/utils/response"
import { AppError } from "@/backend/utils/errors"

export const runtime = "nodejs"

// Heuristic Rule-Based Fallback Engine
function generateRuleBasedAnalysis(
  fileName: string,
  text: string,
  pageCount: number
): AIAnalysis {
  let name = fileName.replace(/\.[^/.]+$/, "")
  name = name.replace(/[-_]?(pitch)?[_-]?deck[_-]?/gi, "")
  name = name.replace(/[-_]/g, " ")
  name = name.split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ")
    .trim()

  if (name.length <= 2) {
    const lines = text.split("\n").map((l) => l.trim()).filter(Boolean)
    name = (lines.length > 0 && lines[0].length < 30) ? lines[0] : "QuantumSaaS"
  }

  const lc = text.toLowerCase()

  let industry = "General Tech"
  let tags = ["saas", "tech"]

  if (lc.includes("crypto") || lc.includes("blockchain") || lc.includes("web3") || lc.includes("nft")) {
    industry = "Web3 / Crypto"; tags = ["blockchain", "crypto", "web3"]
  } else if (lc.includes("ai") || lc.includes("llm") || lc.includes("gpt") || lc.includes("agent")) {
    industry = "Generative AI"; tags = ["ai", "generative_ai", "tech"]
  } else if (lc.includes("health") || lc.includes("medical") || lc.includes("biotech")) {
    industry = "HealthTech"; tags = ["healthcare", "biotech"]
  } else if (lc.includes("marketplace") || lc.includes("consumer") || lc.includes("d2c")) {
    industry = "Consumer Tech / Marketplace"; tags = ["marketplace", "consumer", "ecommerce"]
  } else if (lc.includes("saas") || lc.includes("enterprise") || lc.includes("b2b")) {
    industry = "B2B SaaS"; tags = ["saas", "b2b", "enterprise"]
  }

  let marketClarity = 45 + Math.floor(Math.random() * 20)
  let teamStrength = 50 + Math.floor(Math.random() * 20)
  let financialRealism = 30 + Math.floor(Math.random() * 20)
  let differentiation = 40 + Math.floor(Math.random() * 20)
  let executionRisk = 55 + Math.floor(Math.random() * 25)

  if (pageCount > 0 && pageCount < 4) {
    executionRisk = Math.min(100, executionRisk + 20)
    marketClarity = Math.max(0, marketClarity - 15)
  }

  const hasFinancials = lc.includes("revenue") || lc.includes("mrr") || lc.includes("runway")
  if (!hasFinancials) financialRealism = Math.min(100, financialRealism + 25)
  if (industry === "Web3 / Crypto") { financialRealism = Math.min(100, financialRealism + 15); executionRisk = Math.min(100, executionRisk + 10) }
  if (industry === "Generative AI") { differentiation = Math.min(100, differentiation + 20); marketClarity = Math.min(100, marketClarity + 10) }

  const category_scores = { market_clarity: marketClarity, team_strength: teamStrength, financial_realism: financialRealism, differentiation, execution_risk: executionRisk }
  const overall_failure_score = Math.round(marketClarity * 0.25 + teamStrength * 0.15 + financialRealism * 0.25 + differentiation * 0.15 + executionRisk * 0.20)

  const reasonsMap: Record<string, string[]> = {
    "Generative AI": [
      "Platform Risk: Product is a thin wrapper over foundation models and can be replicated with a model update.",
      "High CAC Bubble: AI tool saturation is destroying customer acquisition economics.",
      "Margin Erosion: Third-party AI token costs will obliterate gross margins at scale.",
    ],
    "Web3 / Crypto": [
      "Compliance Bottleneck: Multi-jurisdiction tokenomics face existential regulatory headwinds.",
      "Speculative Churn: User base is yield-farmers with zero organic retention.",
      "UX Friction: Smart contract signing permanently blocks mainstream adoption.",
    ],
    "Consumer Tech / Marketplace": [
      "Double-Sided Liquidity Trap: Requires millions to acquire both supply and demand simultaneously.",
      "Low LTV Mismatch: Transaction value too low to support healthy acquisition loops.",
      "Commoditized Moat: Can be undercut instantly by gig-economy incumbents.",
    ],
    "B2B SaaS": [
      "Sales Cycle vs Runway Mismatch: 9-month enterprise cycles will exhaust 6-month runway.",
      "Feature Trap: Solves a minor pain point rather than a critical system of record.",
      "No Repeatable GTM: Entirely dependent on founder-led sales.",
    ],
  }

  const top_failure_reasons = reasonsMap[industry] ?? [
    "Burn Rate Disconnected from Traction: Burn assumes full velocity before product-market fit.",
    "Incumbent Distribution Moat: Incumbents will bundle your value proposition for free.",
    "Indistinguishable Differentiation: No patent, data loop, or structural network effect.",
  ]

  if (pageCount > 0 && pageCount < 4) {
    top_failure_reasons.push("Severe Narrative Underdevelopment: Fewer than 4 slides — structurally incomplete.")
  }

  const matches = FAILURE_DATABASE.filter((c) => c.tags.some((t) => tags.includes(t.toLowerCase())))
  const selected = matches.length > 0 ? matches.slice(0, 2) : FAILURE_DATABASE.slice(0, 2)
  const startup_comparison = selected.map((c) => ({
    startup_name: c.name,
    reason: c.failureReason[0] ?? "Failed to scale unit economics.",
    similarity: 70 + Math.floor(Math.random() * 25),
  }))
  const similarity_score = Math.round(startup_comparison.reduce((s, i) => s + i.similarity, 0) / startup_comparison.length)

  const roast_mode_output = `💀 DEADPOOL AI CLASSIFIED AUTOPSY: ${name.toUpperCase()} 💀\n[TERMINAL PATHOLOGY DETECTED — RULE-BASED ENGINE]\nYour pitch deck has been processed. Our classified autopsy system has identified critical structural defects across market clarity, financial realism, and execution risk. For a full Gemini-powered savage analysis, ensure your GOOGLE_AI_API_KEY is configured in .env.local.`

  return {
    overall_failure_score,
    category_scores,
    top_failure_reasons,
    startup_comparison,
    similarity_score,
    recommendations: [
      { title: "Rebuild Value Defensibility", action: "Identify what cannot be duplicated by a model update or competitor bundle. Build a proprietary data collection roadmap.", priority: "high" },
      { title: "Establish Unit Economics Proof", action: "Kill the generalized TAM slide. Secure 3 signed LOIs from enterprise buyers with specific pricing terms.", priority: "high" },
      { title: "Extend Runway Immediately", action: "Cut advisory fees and pre-revenue PR spend. Redirect capital toward product delivery and direct sales.", priority: "medium" },
    ],
    roast_mode_output,
    investor_readiness: {
      score: Math.max(10, 100 - overall_failure_score),
      summary: `${name} has critical structural defects. 💀 DEADPOOL AI has diagnosed terminal startup pathology. Pivot to a high-touch niche proof-of-concept before raising any institutional seed.`,
    },
    market_analysis: {
      tam_signal: "Moderate TAM with heavy incumbent moats.",
      saturation_level: "Critical: extreme competitor density with negligible switching costs.",
      market_timing: "Late-mover disadvantage. Competitors have established distribution channels.",
    },
    funding_risk: {
      runway_risk: pageCount < 4 ? "Extreme: complete strategic planning void detected." : "High runway depletion risk at current burn velocity.",
      dilution_risk: "Severe dilution expected in a down-cycle environment.",
      funding_probability: Math.max(5, 95 - overall_failure_score),
    },
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("[LEGACY API] POST /api/analysis/analyze — using rule-based engine (upgrade to /api/analyze for Gemini)")

    let file: File | null = null
    let fileName = "unknown.pdf"
    let fileBuffer: Buffer | null = null

    try {
      const formData = await request.formData()
      file = formData.get("file") as File
      if (!file) throw new AppError(400, "MISSING_FILE", "No file provided in request")
      fileName = file.name
      const arrayBuffer = await file.arrayBuffer()
      fileBuffer = Buffer.from(arrayBuffer)
    } catch (formError) {
      const msg = formError instanceof Error ? formError.message : "FormData parsing failed"
      throw new AppError(400, "FORM_PARSE_ERROR", msg)
    }

    if (!fileBuffer || fileBuffer.length === 0) {
      throw new AppError(400, "EMPTY_FILE", "File is empty or could not be read")
    }

    const fileKind = detectFileKind(fileName)
    const parsedDoc = await parseUploadedDocument(fileBuffer, fileName, fileBuffer.length, fileKind)

    const analysis = generateRuleBasedAnalysis(fileName, parsedDoc.text, parsedDoc.metadata.pageCount)

    const enrichedAnalysis = {
      ...analysis,
      failure_database_context: FAILURE_DATABASE.filter((f) =>
        f.tags.some((tag) =>
          analysis.top_failure_reasons.some((reason) =>
            reason.toLowerCase().includes(tag.toLowerCase())
          )
        )
      ).slice(0, 3),
    }

    return okResponse(enrichedAnalysis)
  } catch (error) {
    console.error("[LEGACY API] Unhandled error", {
      error: error instanceof Error ? error.message : String(error),
    })
    return errorResponse(error)
  }
}
