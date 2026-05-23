export function getRiskStroke(score: number): string {
  if (score >= 60) return "#FF3B30"
  if (score >= 35) return "#FFB020"
  return "#E5E7EB"
}

export function clampScore(score: number): number {
  return Math.max(0, Math.min(100, score))
}
