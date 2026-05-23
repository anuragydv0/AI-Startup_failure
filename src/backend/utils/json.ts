import { AppError } from "@/backend/utils/errors"

function stripMarkdownCodeBlock(raw: string) {
  const trimmed = raw.trim()
  if (!trimmed.startsWith("```")) {
    return trimmed
  }

  return trimmed.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim()
}

function extractLikelyJSONObject(raw: string) {
  const firstBrace = raw.indexOf("{")
  const lastBrace = raw.lastIndexOf("}")

  if (firstBrace === -1 || lastBrace === -1 || firstBrace >= lastBrace) {
    return raw
  }

  return raw.slice(firstBrace, lastBrace + 1)
}

export function parseJSONSafely<T>(raw: string): T {
  const withoutFence = stripMarkdownCodeBlock(raw)
  const candidate = extractLikelyJSONObject(withoutFence)

  try {
    return JSON.parse(candidate) as T
  } catch (error) {
    throw new AppError(502, "MALFORMED_AI_RESPONSE", "AI returned malformed JSON", {
      raw,
      parseError: error instanceof Error ? error.message : "unknown",
    })
  }
}

