import { analysisLogs, analysisSteps } from "@/features/analysis/data"

export function getLiveAnalysisSnapshot() {
  return {
    steps: analysisSteps,
    logs: analysisLogs,
  }
}
