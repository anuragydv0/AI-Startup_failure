"use client"

import { useEffect } from "react"
import Lenis from "lenis"

export function LenisProvider() {
  useEffect(() => {
    let rafId: number
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      // @ts-ignore
      if (lenis && lenis.destroy) lenis.destroy()
    }
  }, [])

  return null
}
