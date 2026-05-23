export interface ScoreCategory {
  label: string
  score: number
}

export const scoreCategories: ScoreCategory[] = [
  { label: "Market Clarity", score: 34 },
  { label: "Team Capability", score: 62 },
  { label: "Financial Realism", score: 21 },
  { label: "Defensibility", score: 40 },
  { label: "Execution Risk", score: 78 },
]

export const criticalFindings = [
  "Revenue forecast assumes enterprise cycle < 45 days with no sales team.",
  "TAM model includes adjacent markets with no product fit proof.",
  "Runway reaches zero before repeatable acquisition channel is validated.",
  "Competitive moat is feature-based and easy to replicate.",
] as const

export interface MetricCard {
  label: string
  value: string
  detail: string
  severity: "critical" | "warning"
}

export const dashboardMetrics: MetricCard[] = [
  {
    label: "Overall Failure Risk",
    value: "72%",
    detail: "+8 points after financial review",
    severity: "critical",
  },
  {
    label: "Market Timing",
    value: "Saturated",
    detail: "High incumbent density",
    severity: "warning",
  },
  {
    label: "Team Strength",
    value: "6.2 / 10",
    detail: "Gap in GTM leadership",
    severity: "warning",
  },
  {
    label: "Financial Realism",
    value: "2.4 / 10",
    detail: "Model diverges from benchmark",
    severity: "critical",
  },
]
