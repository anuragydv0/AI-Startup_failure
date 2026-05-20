"use client"

import React, { useEffect } from "react"
import Navigation from "@/components/Navigation"
import HeroSection from "@/components/sections/HeroSection"
import FeaturesSection from "@/components/sections/FeaturesSection"
import LiveAnalysisSection from "@/components/sections/LiveAnalysisSection"
import FailureComparisonSection from "@/components/sections/FailureComparisonSection"
import RoastModeSection from "@/components/sections/RoastModeSection"
import CTASection from "@/components/sections/CTASection"
import { AnimatedGridFloor, FloatingParticles } from "@/components/background/Background3D"

export default function Home() {
  useEffect(() => {
    // Smooth scroll setup if Lenis is needed
    const handleScroll = () => {
      // Custom scroll effects can go here
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-black-primary text-text-primary overflow-x-hidden">
      {/* Animated backgrounds */}
      <AnimatedGridFloor />
      <FloatingParticles />

      {/* Navigation */}
      <Navigation />

      {/* Sections */}
      <HeroSection />
      <FeaturesSection />
      <LiveAnalysisSection />
      <FailureComparisonSection />
      <RoastModeSection />
      <CTASection />

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-text-muted text-sm">
                <li><a href="#" className="hover:text-red-accent transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-red-accent transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-red-accent transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-text-muted text-sm">
                <li><a href="#" className="hover:text-red-accent transition-colors">About</a></li>
                <li><a href="#" className="hover:text-red-accent transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-red-accent transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-text-muted text-sm">
                <li><a href="#" className="hover:text-red-accent transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-red-accent transition-colors">Terms</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Social</h4>
              <ul className="space-y-2 text-text-muted text-sm">
                <li><a href="#" className="hover:text-red-accent transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-red-accent transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-text-muted text-sm">(c) 2024 FAILFAST AI. All rights reserved.</p>
            <p className="text-text-muted text-xs mt-4 md:mt-0">
              Built by founders who've failed before.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
