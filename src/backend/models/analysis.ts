import { z } from "zod"

export const MAX_UPLOAD_BYTES_DEFAULT = 20 * 1024 * 1024

export const fileKindSchema = z.enum(["pdf", "pptx"])

export type FileKind = z.infer<typeof fileKindSchema>

export interface ParsedPageLike {
  index: number
  title?: string
  text: string
  noteText?: string
}

export interface ParsedDocument {
  fileName: string
  fileType: FileKind
  fileSize: number
  text: string
  pages: ParsedPageLike[]
  metadata: {
    pageCount: number
    extractedAt: string
    parser: string
  }
}

const categoryScoresSchema = z.object({
  market_clarity: z.number().min(0).max(100),
  team_strength: z.number().min(0).max(100),
  financial_realism: z.number().min(0).max(100),
  differentiation: z.number().min(0).max(100),
  execution_risk: z.number().min(0).max(100),
})

const startupComparisonItemSchema = z.object({
  startup_name: z.string().min(1),
  reason: z.string().min(1),
  similarity: z.number().min(0).max(100),
})

const recommendationSchema = z.object({
  title: z.string().min(1),
  action: z.string().min(1),
  priority: z.enum(["high", "medium", "low"]),
})

export const aiAnalysisSchema = z.object({
  overall_failure_score: z.number().min(0).max(100),
  category_scores: categoryScoresSchema,
  top_failure_reasons: z.array(z.string().min(1)).min(3).max(10),
  startup_comparison: z.array(startupComparisonItemSchema).min(1).max(5),
  similarity_score: z.number().min(0).max(100),
  recommendations: z.array(recommendationSchema).min(3).max(8),
  roast_mode_output: z.string().min(20),
  investor_readiness: z.object({
    score: z.number().min(0).max(100),
    summary: z.string().min(10),
  }),
  market_analysis: z.object({
    tam_signal: z.string().min(5),
    saturation_level: z.string().min(5),
    market_timing: z.string().min(5),
  }),
  funding_risk: z.object({
    runway_risk: z.string().min(5),
    dilution_risk: z.string().min(5),
    funding_probability: z.number().min(0).max(100),
  }),
})

export type AIAnalysis = z.infer<typeof aiAnalysisSchema>

export interface ScoredAnalysis extends AIAnalysis {
  generated_at: string
  parser_summary: {
    page_count: number
    text_length: number
    file_type: FileKind
  }
  status: "success" | "degraded"
}

export interface PersistedAnalysis extends ScoredAnalysis {
  id: string
  user_id: string
  created_at: string
  source_file_name: string
}

export interface AnalysisRequestContext {
  requestId: string
  userId: string
  fileName: string
}

