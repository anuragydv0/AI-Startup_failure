"use client"

import { motion, type MotionProps } from "framer-motion"
import type { ReactNode } from "react"
import { fadeUp, viewportDefaults } from "@/lib/animations"

interface RevealProps extends MotionProps {
  className?: string
  children: ReactNode
  distance?: number
  delay?: number
}

export function Reveal({
  className,
  children,
  distance = 24,
  delay = 0,
  ...props
}: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={fadeUp(distance, { delay })}
      initial="hidden"
      whileInView="visible"
      viewport={viewportDefaults}
      {...props}
    >
      {children}
    </motion.div>
  )
}
