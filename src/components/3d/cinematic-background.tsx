"use client"

import { useEffect, useMemo, useRef } from "react"
import { motion } from "framer-motion"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"

const PARTICLE_COUNT = 26

export function CinematicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext("2d")
    if (!context) return

    let rafId = 0
    let width = window.innerWidth
    let height = window.innerHeight

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * Math.min(window.devicePixelRatio, 1.5))
      canvas.height = Math.floor(height * Math.min(window.devicePixelRatio, 1.5))
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(1, 0, 0, 1, 0, 0)
      context.scale(canvas.width / width, canvas.height / height)
    }

    resize()

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height)
      context.fillStyle = "#050505"
      context.fillRect(0, 0, width, height)

      const gradient = context.createRadialGradient(
        width * 0.84,
        height * 0.2,
        0,
        width * 0.84,
        height * 0.2,
        width * 0.65
      )
      gradient.addColorStop(0, "rgba(255, 59, 48, 0.14)")
      gradient.addColorStop(1, "rgba(255, 59, 48, 0)")
      context.fillStyle = gradient
      context.fillRect(0, 0, width, height)

      context.strokeStyle = "rgba(255, 59, 48, 0.08)"
      context.lineWidth = 1
      const grid = 72
      const offset = prefersReducedMotion ? 0 : (time * 0.015) % grid

      for (let x = -grid; x <= width + grid; x += grid) {
        context.beginPath()
        context.moveTo(x + offset, height * 0.5)
        context.lineTo(x + offset + 20, height)
        context.stroke()
      }

      rafId = window.requestAnimationFrame(draw)
    }

    rafId = window.requestAnimationFrame(draw)
    window.addEventListener("resize", resize)

    return () => {
      window.cancelAnimationFrame(rafId)
      window.removeEventListener("resize", resize)
    }
  }, [prefersReducedMotion])

  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }).map((_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: 7 + Math.random() * 8,
        x: Math.random() * 32 - 16,
      })),
    []
  )

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <canvas ref={canvasRef} aria-hidden className="h-full w-full" />
      {!prefersReducedMotion
        ? particles.map((particle) => (
            <motion.span
              key={particle.id}
              className="absolute h-1.5 w-1.5 rounded-full bg-[#FF3B30]/40"
              style={{ left: particle.left, top: particle.top }}
              animate={{
                y: [0, -30, 0],
                x: [0, particle.x, 0],
                opacity: [0.15, 0.5, 0.15],
              }}
              transition={{
                duration: particle.duration,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))
        : null}
    </div>
  )
}
