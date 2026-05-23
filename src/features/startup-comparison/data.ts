export interface FailureCase {
  name: string
  founded: number
  failed: string
  reason: string
  similarity: number
  sector: string
}

export const failureCases: FailureCase[] = [
  {
    name: "Quibi",
    founded: 2018,
    failed: "2020",
    reason: "Wrong medium for behavior shift",
    similarity: 68,
    sector: "Consumer Media",
  },
  {
    name: "Juicero",
    founded: 2013,
    failed: "2019",
    reason: "Over-built product with weak core value",
    similarity: 54,
    sector: "Hardware + IoT",
  },
  {
    name: "Vine",
    founded: 2012,
    failed: "2017",
    reason: "Monetization and creator economics failure",
    similarity: 47,
    sector: "Social Video",
  },
  {
    name: "WeWork",
    founded: 2010,
    failed: "2023 (Chapter 11)",
    reason: "Unit economics collapsed at scale",
    similarity: 72,
    sector: "Real Estate Tech",
  },
  {
    name: "Theranos",
    founded: 2003,
    failed: "2018",
    reason: "Narrative outran technical reality",
    similarity: 39,
    sector: "HealthTech",
  },
]
