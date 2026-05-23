import "server-only"
import { z } from "zod"
import { MAX_UPLOAD_BYTES_DEFAULT } from "@/backend/models/analysis"

const booleanFromString = z
  .string()
  .optional()
  .transform((value) => value === "true")

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
  GOOGLE_AI_API_KEY: z.string().min(1).optional(),
  MAX_UPLOAD_BYTES: z.coerce.number().int().positive().default(MAX_UPLOAD_BYTES_DEFAULT),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(60_000),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().int().positive().default(20),
  ALLOW_RULE_BASED_FALLBACK: booleanFromString.default(false),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
})

let cachedEnv: z.infer<typeof envSchema> | null = null

export function getServerEnv() {
  if (cachedEnv) {
    return cachedEnv
  }

  const parsed = envSchema.safeParse(process.env)
  if (!parsed.success) {
    const issues = parsed.error.issues.map((issue) => issue.message).join("; ")
    throw new Error(`Invalid environment configuration: ${issues}`)
  }

  cachedEnv = parsed.data
  return cachedEnv
}

export function assertAIReady() {
  const env = getServerEnv()
  if (!env.GOOGLE_AI_API_KEY) {
    throw new Error("GOOGLE_AI_API_KEY is required for AI analysis.")
  }
}

export function assertSupabaseConfigured() {
  const env = getServerEnv()
  if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error(
      "Supabase environment is not configured. Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY."
    )
  }
}

