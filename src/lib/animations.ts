import type { TargetAndTransition, Variants } from "framer-motion"
import { motionTokens } from "@/constants/design-system"

const easeOut = [0.22, 1, 0.36, 1] as const
const easeInOut = [0.42, 0, 0.58, 1] as const

interface VariantOptions {
  delay?: number
  duration?: number
}

interface StaggerOptions {
  delayChildren?: number
  staggerChildren?: number
}

export const fadeUp = (distance = 24, options: VariantOptions = {}): Variants => ({
  hidden: { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: options.duration ?? motionTokens.base,
      delay: options.delay ?? 0,
      ease: easeOut,
    },
  },
})

export const staggerContainer = (options: StaggerOptions = {}): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: options.staggerChildren ?? motionTokens.staggerBase,
      delayChildren: options.delayChildren ?? 0,
    },
  },
})

export const scaleIn = (startScale = 0.95, options: VariantOptions = {}): Variants => ({
  hidden: { opacity: 0, scale: startScale },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: options.duration ?? motionTokens.base,
      delay: options.delay ?? 0,
      ease: easeOut,
    },
  },
})

export const cinematicReveal = (options: VariantOptions = {}): Variants => ({
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: options.duration ?? motionTokens.cinematic,
      delay: options.delay ?? 0,
      ease: easeOut,
    },
  },
})

export const glowPulse: TargetAndTransition = {
  boxShadow: [
    "0 0 0 rgba(255, 59, 48, 0)",
    "0 0 36px rgba(255, 59, 48, 0.42)",
    "0 0 0 rgba(255, 59, 48, 0)",
  ],
  transition: {
    duration: 2.8,
    ease: easeInOut,
    repeat: Number.POSITIVE_INFINITY,
  },
}

export const floatingAnimation: TargetAndTransition = {
  y: [0, -12, 0],
  transition: {
    duration: 4.8,
    ease: easeInOut,
    repeat: Number.POSITIVE_INFINITY,
  },
}

export const rotateSlow: TargetAndTransition = {
  rotate: 360,
  transition: {
    duration: 28,
    ease: "linear",
    repeat: Number.POSITIVE_INFINITY,
  },
}

export const parallaxMotion = (
  strength = 24,
  options: VariantOptions = {}
): Variants => ({
  hidden: { opacity: 0, y: strength },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: options.duration ?? motionTokens.slow,
      delay: options.delay ?? 0,
      ease: easeOut,
    },
  },
})

export const viewportDefaults = {
  once: true,
  amount: 0.25,
} as const
