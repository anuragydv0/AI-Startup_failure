/**
 * 💀 DEADPOOL AI — Secure Gemini-Powered Startup Autopsy Engine
 *
 * Route: POST /api/analyze
 * Runtime: nodejs (required for pdf-parse & file Buffer operations)
 *
 * SECURITY:
 *  - GOOGLE_AI_API_KEY is NEVER exposed to the client
 *  - All AI calls happen exclusively server-side here
 *  - File buffers are processed in memory, never written to disk
 *  - No sensitive env vars are logged to console
 */

import { NextRequest } from "next/server"
import { aiAnalysisSchema, type AIAnalysis } from "@/backend/models/analysis"
import { FAILURE_DATABASE } from "@/data/failure-database"
import { parseUploadedDocument } from "@/backend/parsers"
import { detectFileKind } from "@/backend/utils/validation"
import { parseJSONSafely } from "@/backend/utils/json"
import { okResponse, errorResponse } from "@/backend/utils/response"
import { AppError } from "@/backend/utils/errors"
import { getServerEnv } from "@/backend/config/env"
import { getAutopsyModel, GEMINI_MODEL_FALLBACK_CHAIN } from "@/lib/gemini"

export const runtime = "nodejs"
export const maxDuration = 60

// ─────────────────────────────────────────────────────────────────────────────
// SYSTEM PROMPT: 💀 DEADPOOL AI Classified Autopsy Analyst
// ─────────────────────────────────────────────────────────────────────────────
const DEADPOOL_SYSTEM_PROMPT = `You are 💀 DEADPOOL AI — a classified, brutally honest startup autopsy analyst with 20+ years of VC experience.
You have reviewed 15,000+ pitch decks. 85% of the companies you analyzed failed.
You treat every pitch deck as a crime scene of terminal founder hubris.
Your job: perform a hyper-cynical, highly specific, deeply researched autopsy.

RULES:
- Be savage but precise. No generic advice. Reference specific content from the deck.
- No platitudes. No corporate speak. No soft language.
- Think like a partner at Sequoia who has seen every playbook and every delusion.
- The roast must be memeable, devastating, and grounded in actual deck content.

You MUST return ONLY a valid JSON object — no markdown, no explanations outside JSON, no code fences.

Return this EXACT structure:
{
  "overall_failure_score": <integer 0-100, where 100 = certain death>,
  "category_scores": {
    "market_clarity": <integer 0-100>,
    "team_strength": <integer 0-100>,
    "financial_realism": <integer 0-100>,
    "differentiation": <integer 0-100>,
    "execution_risk": <integer 0-100>
  },
  "top_failure_reasons": [<3-5 specific, devastating string reasons>],
  "startup_comparison": [
    {
      "startup_name": "<real failed startup name>",
      "reason": "<why they are eerily similar>",
      "similarity": <integer 0-100>
    }
  ],
  "similarity_score": <integer 0-100, average of comparison similarities>,
  "recommendations": [
    {
      "title": "<short imperative title>",
      "action": "<specific, actionable instruction>",
      "priority": "<high|medium|low>"
    }
  ],
  "roast_mode_output": "<savage, classified, DEADPOOL AI autopsy report — 3-5 sentences, highly memeable>",
  "investor_readiness": {
    "score": <integer 0-100>,
    "summary": "<blunt 1-2 sentence verdict>"
  },
  "market_analysis": {
    "tam_signal": "<specific TAM assessment>",
    "saturation_level": "<level and key competitors>",
    "market_timing": "<timing verdict>"
  },
  "funding_risk": {
    "runway_risk": "<specific risk assessment>",
    "dilution_risk": "<dilution scenario>",
    "funding_probability": <integer 0-100>
  }
}`

// ─────────────────────────────────────────────────────────────────────────────
// RULE-BASED FALLBACK ENGINE (used when Gemini key is missing or API fails)
// ─────────────────────────────────────────────────────────────────────────────
function generateRuleBasedAnalysis(
  fileName: string,
  text: string,
  pageCount: number
): AIAnalysis {
  // Extract startup name from filename
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

  // Detect industry
  let industry = "General Tech"
  let tags = ["saas", "tech"]
  if (lc.includes("crypto") || lc.includes("blockchain") || lc.includes("web3") || lc.includes("nft")) {
    industry = "Web3 / Crypto"; tags = ["blockchain", "crypto", "web3"]
  } else if (lc.includes("ai") || lc.includes("llm") || lc.includes("gpt") || lc.includes("agent") || lc.includes("intelligence")) {
    industry = "Generative AI"; tags = ["ai", "generative_ai", "tech"]
  } else if (lc.includes("health") || lc.includes("medical") || lc.includes("biotech") || lc.includes("patient")) {
    industry = "HealthTech"; tags = ["healthcare", "biotech"]
  } else if (lc.includes("marketplace") || lc.includes("consumer") || lc.includes("d2c") || lc.includes("e-commerce")) {
    industry = "Consumer Tech / Marketplace"; tags = ["marketplace", "consumer", "ecommerce"]
  } else if (lc.includes("saas") || lc.includes("enterprise") || lc.includes("b2b") || lc.includes("subscription")) {
    industry = "B2B SaaS"; tags = ["saas", "b2b", "enterprise"]
  }

  // Compute scores
  let marketClarity = 45 + Math.floor(Math.random() * 20)
  let teamStrength  = 50 + Math.floor(Math.random() * 20)
  let financialRealism = 30 + Math.floor(Math.random() * 20)
  let differentiation  = 40 + Math.floor(Math.random() * 20)
  let executionRisk    = 55 + Math.floor(Math.random() * 25)

  if (pageCount > 0 && pageCount < 4) {
    executionRisk  = Math.min(100, executionRisk + 20)
    marketClarity  = Math.max(0, marketClarity - 15)
  }
  const hasFinancials = lc.includes("revenue") || lc.includes("mrr") || lc.includes("runway") || lc.includes("projections")
  if (!hasFinancials) financialRealism = Math.min(100, financialRealism + 25)
  if (industry === "Web3 / Crypto")    { financialRealism = Math.min(100, financialRealism + 15); executionRisk = Math.min(100, executionRisk + 10) }
  if (industry === "Generative AI")    { differentiation  = Math.min(100, differentiation + 20);  marketClarity = Math.min(100, marketClarity + 10) }

  const category_scores = { market_clarity: marketClarity, team_strength: teamStrength, financial_realism: financialRealism, differentiation, execution_risk: executionRisk }
  const overall_failure_score = Math.round(marketClarity * 0.25 + teamStrength * 0.15 + financialRealism * 0.25 + differentiation * 0.15 + executionRisk * 0.20)

  // Industry-specific failure reasons
  const reasonsMap: Record<string, string[]> = {
    "Generative AI": [
      "Platform Risk: Product is a thin wrapper over OpenAI/Claude APIs and can be replicated in their next model update.",
      "High CAC Bubble: Extreme saturation of AI tools means customer acquisition cost is destroying unit economics.",
      "Margin Erosion: Heavy dependency on third-party AI tokens will obliterate gross margins at any meaningful scale.",
    ],
    "Web3 / Crypto": [
      "Compliance Bottleneck: Multi-jurisdiction tokenomics structures face existential regulatory headwinds.",
      "Speculative Churn: User base consists of yield-farmers with zero organic retention or loyalty.",
      "UX Friction: Smart contract signing will permanently block mainstream non-technical adoption.",
    ],
    "Consumer Tech / Marketplace": [
      "Double-Sided Liquidity Trap: Requires millions in spend to simultaneously acquire supply and demand.",
      "Low LTV Mismatch: Transaction value is too low to support healthy acquisition loops at scale.",
      "Commoditized Moat: Local density can be undercut instantly by gig-economy incumbents with existing infrastructure.",
    ],
    "B2B SaaS": [
      "Sales Cycle vs Runway Mismatch: 9-month enterprise sales cycles will exhaust 6-month runway before a single contract closes.",
      "Feature Trap: Product solves a minor pain point rather than functioning as a critical system of record.",
      "No Repeatable GTM: Entirely dependent on founder-led sales with no scalable outbound execution model.",
    ],
    "HealthTech": [
      "Regulatory Moat: FDA/HIPAA compliance requirements add 18-24 months of pre-revenue runway burn.",
      "Clinical Validation Gap: No peer-reviewed evidence means institutional buyers will not sign off.",
      "Fragmented Payer Landscape: Reimbursement pathways are undefined and take years to establish.",
    ],
  }
  const top_failure_reasons = reasonsMap[industry] ?? [
    "Burn Rate Disconnected from Traction: Monthly burn assumes full velocity before validating product-market fit.",
    "Incumbent Distribution Moat: Entrenched players will bundle your value proposition for free.",
    "Indistinguishable Differentiation: No patent, proprietary data loop, or structural network effects.",
  ]
  if (pageCount > 0 && pageCount < 4) {
    top_failure_reasons.push("Severe Narrative Underdevelopment: Pitch deck has fewer than 4 slides — structurally incomplete.")
  }

  // Pick comparable failures from database
  const matches = FAILURE_DATABASE.filter((c) => c.tags.some((t) => tags.includes(t.toLowerCase())))
  const selected = matches.length > 0 ? matches.slice(0, 2) : FAILURE_DATABASE.slice(0, 2)
  const startup_comparison = selected.map((c) => ({
    startup_name: c.name,
    reason: c.failureReason[0] ?? "Failed to scale unit economics.",
    similarity: 70 + Math.floor(Math.random() * 25),
  }))
  const similarity_score = Math.round(startup_comparison.reduce((s, i) => s + i.similarity, 0) / startup_comparison.length)

  // Industry roasts
  const roastMap: Record<string, string> = {
    "Generative AI": `💀 DEADPOOL AI CLASSIFIED AUTOPSY: ${name.toUpperCase()} 💀\n[TERMINAL PATHOLOGY: AI WRAPPER SYNDROME]\nYour startup is not a 'revolutionary AI system.' It is a gloriously over-engineered wrapper around Claude and ChatGPT. Your 'proprietary moat' is a system prompt that a motivated teenager could replicate over a weekend. When OpenAI ships their next model update, your entire business dissolves into a feature they release for free. Put down the seed deck and look in the mirror.`,
    "Web3 / Crypto": `💀 DEADPOOL AI CLASSIFIED AUTOPSY: ${name.toUpperCase()} 💀\n[TERMINAL PATHOLOGY: BLOCKCHAIN HUBRIS DETECTED]\nWelcome to the graveyard of late-stage blockchain hype. You're solving a problem nobody has, using infrastructure nobody wants, to sell tokens that will trade like penny stocks within 90 days. Your runway burns faster than a GPU farm mining Ethereum in a closet. Investors aren't looking at your tech. They're looking at the exits.`,
    "Consumer Tech / Marketplace": `💀 DEADPOOL AI CLASSIFIED AUTOPSY: ${name.toUpperCase()} 💀\n[TERMINAL PATHOLOGY: MARKETPLACE DELUSION SYNDROME]\nA marketplace! You plan to attract a million buyers AND a million sellers. How? 'Word of mouth.' Translation: zero marketing budget, expecting a miracle. Building a double-sided market without funding is like throwing a party where guests must first construct the venue. Your CAC will eat your runway before you close a single transaction.`,
    "B2B SaaS": `💀 DEADPOOL AI CLASSIFIED AUTOPSY: ${name.toUpperCase()} 💀\n[TERMINAL PATHOLOGY: ENTERPRISE FANTASY DISORDER]\nCongratulations on building the 4,000th SaaS tool to 'optimize enterprise efficiency.' Your sales cycle is 9 months. Your runway is 6. Your sales team is one founder who has never closed an enterprise deal. Your MRR projections belong in the fantasy fiction section. This is a nice feature — not a company.`,
  }
  const roast_mode_output = roastMap[industry] ?? `💀 DEADPOOL AI CLASSIFIED AUTOPSY: ${name.toUpperCase()} 💀\n[TERMINAL PATHOLOGY: GENERAL STARTUP DELUSION]\nYour pitch deck is a stunning collection of dreams, stock illustrations, and buzzwords. You've disruption-proofed your startup by making it completely indistinguishable from the 500 others that failed in your cohort. Stop drawing hockey-stick charts. Go talk to a real human who might actually pay you $5.`

  return {
    overall_failure_score,
    category_scores,
    top_failure_reasons,
    startup_comparison,
    similarity_score,
    recommendations: [
      { title: "Rebuild Value Defensibility", action: "Identify what cannot be duplicated by a model update or competitor bundle. Build a concrete proprietary data collection roadmap.", priority: "high" },
      { title: "Establish Unit Economics Proof", action: "Kill the generalized TAM slide. Secure 3 signed LOIs from enterprise buyers with specific pricing terms.", priority: "high" },
      { title: "Extend Runway Immediately", action: "Cut advisory fees and pre-revenue PR spend. Redirect 100% of capital toward product delivery and direct sales outreach.", priority: "medium" },
    ],
    roast_mode_output,
    investor_readiness: {
      score: Math.max(10, 100 - overall_failure_score),
      summary: `${name} has critical structural defects. 💀 DEADPOOL AI has diagnosed terminal startup pathology. Institutional VCs will pass immediately — pivot to a high-touch niche proof-of-concept before raising any institutional seed.`,
    },
    market_analysis: {
      tam_signal: industry === "Generative AI" ? "Highly saturated — extreme tailwinds but heavy platform consolidation by hyperscalers." : "Moderate TAM with heavy incumbent moats.",
      saturation_level: "Critical: extreme competitor density with negligible switching costs.",
      market_timing: "Late-mover disadvantage. Competitors have already established standard playbooks and distribution channels.",
    },
    funding_risk: {
      runway_risk: pageCount < 4 ? "Extreme: complete strategic planning void detected." : "High runway depletion risk at current burn velocity.",
      dilution_risk: "Severe dilution expected — low valuation markers in a down-cycle environment will crush founder equity.",
      funding_probability: Math.max(5, 95 - overall_failure_score),
    },
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// GEMINI AI ANALYSIS ENGINE
// ─────────────────────────────────────────────────────────────────────────────
async function runGeminiAnalysis(
  text: string,
  fileName: string,
  fileType: string,
  pageCount: number
): Promise<AIAnalysis> {
  const userPrompt = `Perform a classified startup autopsy on this pitch deck.

--- PITCH DECK METADATA ---
File Name: ${fileName}
File Type: ${fileType}
Slide / Page Count: ${pageCount}

--- PITCH DECK CONTENT (truncated to 80,000 chars) ---
${text.slice(0, 80000)}
--- END OF CONTENT ---

Analyze market timing, team strength, unit economics realism, competition, and identify specific reasons this startup will fail.
Generate a brutal, highly specific autopsy report in the DEADPOOL AI style.
Return ONLY valid JSON matching the schema in your instructions.`

  // Try each model in the fallback chain
  for (const modelId of GEMINI_MODEL_FALLBACK_CHAIN) {
    try {
      const model = getAutopsyModel(modelId)
      
      const result = await model.generateContent([
        { text: DEADPOOL_SYSTEM_PROMPT },
        { text: userPrompt },
      ])

      const rawText = result.response.text()
      
      if (!rawText || rawText.trim().length === 0) {
        console.warn(`[DEADPOOL AI] Model ${modelId} returned empty response, trying next model`)
        continue
      }

      // Parse and validate the JSON response
      const parsed = parseJSONSafely<AIAnalysis>(rawText)
      const validated = aiAnalysisSchema.parse(parsed)
      return validated

    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      console.warn(`[DEADPOOL AI] Model ${modelId} failed: ${msg}`)
      // Continue to next model in chain
      continue
    }
  }

  throw new AppError(502, "AI_CHAIN_EXHAUSTED", "All Gemini models failed to return a valid response")
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN POST HANDLER
// ─────────────────────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    console.log("[DEADPOOL AI] POST /api/analyze — request received")

    // ── 1. Parse multipart FormData ─────────────────────────────────────────
    let file: File | null = null
    let fileName = "unknown.pdf"
    let fileBuffer: Buffer | null = null

    try {
      const formData = await request.formData()
      file = formData.get("file") as File

      if (!file) {
        throw new AppError(400, "MISSING_FILE", "No file provided in the request body")
      }

      fileName = file.name
      const arrayBuffer = await file.arrayBuffer()
      fileBuffer = Buffer.from(arrayBuffer)

      console.log("[DEADPOOL AI] File received", {
        fileName,
        fileSize: file.size,
        mimeType: file.type,
      })
    } catch (formError) {
      const msg = formError instanceof AppError
        ? formError.message
        : formError instanceof Error ? formError.message : "FormData parsing failed"
      throw new AppError(400, "FORM_PARSE_ERROR", msg)
    }

    if (!fileBuffer || fileBuffer.length === 0) {
      throw new AppError(400, "EMPTY_FILE", "File is empty or could not be read")
    }

    // ── 2. Validate file type ───────────────────────────────────────────────
    const fileKind = detectFileKind(fileName)
    console.log("[DEADPOOL AI] File kind:", fileKind)

    // ── 3. Parse document text ─────────────────────────────────────────────
    const parsedDoc = await parseUploadedDocument(fileBuffer, fileName, fileBuffer.length, fileKind)
    console.log("[DEADPOOL AI] Document parsed", {
      fileKind,
      pages: parsedDoc.metadata.pageCount,
      textLength: parsedDoc.text.length,
      parser: parsedDoc.metadata.parser,
    })

    if (parsedDoc.text.length === 0) {
      console.warn("[DEADPOOL AI] Warning: empty text — falling back to rule-based engine")
    }

    // ── 4. Load environment, check for Gemini API key ─────────────────────
    let env: ReturnType<typeof getServerEnv> | null = null
    try {
      env = getServerEnv()
    } catch {
      console.warn("[DEADPOOL AI] Could not load server env — using rule-based fallback")
    }

    const hasRealGeminiKey =
      env?.GOOGLE_AI_API_KEY &&
      env.GOOGLE_AI_API_KEY !== "your_google_ai_api_key_here" &&
      !env.GOOGLE_AI_API_KEY.includes("xxxx") &&
      env.GOOGLE_AI_API_KEY.trim().length > 10

    // ── 5. Branch: Gemini vs Rule-Based Fallback ───────────────────────────
    let analysis: AIAnalysis

    if (!hasRealGeminiKey || env?.ALLOW_RULE_BASED_FALLBACK) {
      // Rule-based fallback path
      console.log("[DEADPOOL AI] Using rule-based fallback engine", {
        reason: !hasRealGeminiKey ? "no valid API key" : "ALLOW_RULE_BASED_FALLBACK=true",
      })
      analysis = generateRuleBasedAnalysis(fileName, parsedDoc.text, parsedDoc.metadata.pageCount)
    } else {
      // Live Gemini AI path
      console.log("[DEADPOOL AI] Calling Gemini AI", {
        textLength: parsedDoc.text.length,
        pages: parsedDoc.metadata.pageCount,
      })

      try {
        analysis = await runGeminiAnalysis(
          parsedDoc.text,
          parsedDoc.fileName,
          parsedDoc.fileType,
          parsedDoc.metadata.pageCount
        )
        console.log("[DEADPOOL AI] Gemini analysis succeeded", {
          score: analysis.overall_failure_score,
        })
      } catch (aiError) {
        // Graceful fallback — never crash the app
        console.error("[DEADPOOL AI] Gemini call failed, falling back to rule-based", {
          error: aiError instanceof Error ? aiError.message : String(aiError),
        })
        analysis = generateRuleBasedAnalysis(fileName, parsedDoc.text, parsedDoc.metadata.pageCount)
      }
    }

    // ── 6. Enrich with failure database context ────────────────────────────
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
    console.error("[DEADPOOL AI] Unhandled endpoint error", {
      error: error instanceof Error ? error.message : String(error),
    })
    return errorResponse(error)
  }
}
