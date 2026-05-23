import { AppError } from "@/backend/utils/errors"

interface RateLimitBucket {
  count: number
  resetAt: number
}

const buckets = new Map<string, RateLimitBucket>()

export function enforceRateLimit(
  identifier: string,
  maxRequests: number,
  windowMs: number
) {
  const now = Date.now()
  const bucket = buckets.get(identifier)

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(identifier, { count: 1, resetAt: now + windowMs })
    return
  }

  if (bucket.count >= maxRequests) {
    throw new AppError(429, "RATE_LIMITED", "Too many requests. Please retry later.", {
      resetAt: bucket.resetAt,
    })
  }

  bucket.count += 1
  buckets.set(identifier, bucket)
}

