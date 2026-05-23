"use client"

import dynamic from "next/dynamic"
import { SectionSkeleton } from "@/components/shared/section-skeleton"

const SiteHeader = dynamic(
  () => import("@/components/layout/site-header").then((mod) => mod.SiteHeader),
  { ssr: false }
)

const HeroSection = dynamic(
  () => import("@/components/sections/hero-section").then((mod) => mod.HeroSection),
  {
    ssr: false,
    loading: () => <SectionSkeleton />,
  }
)

const FeaturesSection = dynamic(
  () => import("@/components/sections/features-section").then((mod) => mod.FeaturesSection),
  {
    ssr: false,
    loading: () => <SectionSkeleton />,
  }
)

const LiveAnalysisSection = dynamic(
  () => import("@/features/analysis/live-analysis-section").then((mod) => mod.LiveAnalysisSection),
  {
    ssr: false,
    loading: () => <SectionSkeleton />,
  }
)

const FailureComparisonSection = dynamic(
  () => import("@/features/startup-comparison/failure-comparison-section").then((mod) => mod.FailureComparisonSection),
  {
    ssr: false,
    loading: () => <SectionSkeleton />,
  }
)

const RoastModeSection = dynamic(
  () => import("@/features/roast-mode/roast-mode-section").then((mod) => mod.RoastModeSection),
  {
    ssr: false,
    loading: () => <SectionSkeleton />,
  }
)

const CtaSection = dynamic(
  () => import("@/components/sections/cta-section").then((mod) => mod.CtaSection),
  {
    ssr: false,
    loading: () => <SectionSkeleton />,
  }
)

export function ClientMarketingPage() {
  return (
    <>
      <SiteHeader />
      <HeroSection />
      <FeaturesSection />
      <LiveAnalysisSection />
      <FailureComparisonSection />
      <RoastModeSection />
      <CtaSection />
    </>
  )
}
