"use client"

import React, { useEffect, useRef } from "react"
import { motion } from "framer-motion"

const AnimatedGridFloor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight * 1.2

    let animationFrame: number
    let scrollY = 0

    const draw = () => {
      ctx.fillStyle = "rgba(5, 5, 5, 1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.strokeStyle = "rgba(255, 59, 48, 0.1)"
      ctx.lineWidth = 1

      const gridSize = 100
      const perspectiveY = canvas.height * 0.6 + scrollY * 0.5

      for (let x = 0; x < canvas.width + gridSize; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const perspective = 1 + (y - perspectiveY) * 0.001
          ctx.globalAlpha = Math.max(0.05, perspective * 0.3)
          ctx.strokeRect(x, y, gridSize, gridSize)
        }
      }

      ctx.globalAlpha = 1

      animationFrame = requestAnimationFrame(draw)
    }

    draw()

    const handleScroll = () => {
      scrollY = window.scrollY
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 1.2
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full pointer-events-none"
      style={{ zIndex: -1 }}
    />
  )
}

const FloatingParticles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-red-accent rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.2,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: Math.random() * 8 + 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

export { AnimatedGridFloor, FloatingParticles }
