/**
 * 💀 DEADPOOL AI — Centralized Gemini AI Client
 *
 * SECURITY: This file is server-side only.
 * It MUST NOT be imported from any client component or browser-side code.
 * The GOOGLE_AI_API_KEY is read exclusively from process.env (server runtime).
 */
import "server-only"
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai"

let _client: GoogleGenerativeAI | null = null

/**
 * Returns the singleton Gemini client.
 * Throws a clear error if the API key is not configured — never silently fails.
 */
export function getGeminiClient(): GoogleGenerativeAI {
  if (_client) return _client

  const apiKey = process.env.GOOGLE_AI_API_KEY

  if (!apiKey || apiKey === "your_google_ai_api_key_here" || apiKey.includes("xxxx")) {
    throw new Error(
      "[DEADPOOL AI] GOOGLE_AI_API_KEY is not configured. " +
        "Set it in .env.local to enable Gemini-powered autopsy analysis."
    )
  }

  _client = new GoogleGenerativeAI(apiKey)
  return _client
}

/**
 * Returns a configured generative model for structured startup autopsy analysis.
 * Uses gemini-2.5-pro as primary, falls back to gemini-1.5-pro.
 */
export function getAutopsyModel(modelId: string = "gemini-2.5-pro") {
  const client = getGeminiClient()

  return client.getGenerativeModel({
    model: modelId,
    generationConfig: {
      temperature: 0.4,         // Lower temp = more focused, consistent JSON output
      topP: 0.85,
      topK: 32,
      maxOutputTokens: 8192,
      responseMimeType: "application/json", // Force structured JSON output
    },
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
    ],
  })
}

/** List of model IDs to try in order when the primary fails. */
export const GEMINI_MODEL_FALLBACK_CHAIN = [
  "gemini-2.5-pro",
  "gemini-1.5-pro",
  "gemini-1.5-flash",
] as const
