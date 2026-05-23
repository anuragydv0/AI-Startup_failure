export interface AnalysisStep {
  label: string
  progress: number
  status: "pending" | "processing" | "complete"
}

export const analysisSteps: AnalysisStep[] = [
  { label: "Market Timing Analysis", progress: 100, status: "complete" },
  { label: "Team Composition Review", progress: 92, status: "complete" },
  { label: "Financial Model Stress Test", progress: 74, status: "processing" },
  { label: "Distribution Risk Mapping", progress: 18, status: "pending" },
]

export const analysisLogs = [
  "[ENGINE] Parsing pitch deck narrative...",
  "[OK] Market category identified: AI productivity SaaS",
  "[WARN] TAM assumptions are 2.6x above benchmark",
  "[RISK] Revenue ramp depends on enterprise ACV before proof of demand",
  "[NEXT] Generating founder-market fit report...",
] as const
