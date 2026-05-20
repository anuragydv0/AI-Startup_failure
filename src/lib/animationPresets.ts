/**
 * MOTION SYSTEM - CONSOLIDATED & REFACTORED
 * 
 * Centralized animation system for consistent, performant motion design.
 * All animations are GPU-optimized and follow design specifications.
 */

import { Variants, TargetAndTransition } from 'framer-motion'

// ============================================================================
// TIMING & EASING
// ============================================================================

export const TIMINGS = {
  FAST: 0.3,
  NORMAL: 0.6,
  SLOW: 1.0,
  CINEMATIC: 1.5,
} as const

export const EASINGS = {
  SMOOTH: 'cubic-bezier(0.4, 0, 0.2, 1)',
  POWER_OUT: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  POWER_IN: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  EASE_IN_OUT: 'easeInOut',
  LINEAR: 'linear',
} as const

export const STAGGER_DELAYS = {
  COMPONENT: 0.05,
  SECTION: 0.1,
  ITEM: 0.15,
} as const

// ============================================================================
// FACTORY FUNCTIONS (Reusable patterns)
// ============================================================================

export const createFadeVariant = (delay = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: TIMINGS.NORMAL, ease: EASINGS.SMOOTH, delay },
  },
})

export const createSlideVariant = (
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  delay = 0
): Variants => {
  const distanceMap = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: -30 },
    right: { x: 30 },
  }

  const distance = distanceMap[direction]

  return {
    hidden: { opacity: 0, ...distance },
    visible: {
      opacity: 1,
      ...Object.keys(distance).reduce((acc, key) => ({ ...acc, [key]: 0 }), {}),
      transition: { duration: TIMINGS.NORMAL, ease: EASINGS.SMOOTH, delay },
    },
  }
}

export const createScaleVariant = (
  startScale = 0.95,
  delay = 0
): Variants => ({
  hidden: { opacity: 0, scale: startScale },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: TIMINGS.NORMAL, ease: EASINGS.POWER_OUT, delay },
  },
})

export const createContainerVariant = (
  staggerDelay: number = STAGGER_DELAYS.ITEM
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.2,
    },
  },
})

// ============================================================================
// PRESET ANIMATIONS (Ready to use)
// ============================================================================

// Fade animations
export const Animations = {
  fadeIn: createFadeVariant(),
  fadeInUp: createSlideVariant('up'),
  fadeInDown: createSlideVariant('down'),
  fadeInLeft: createSlideVariant('left'),
  fadeInRight: createSlideVariant('right'),
  scaleIn: createScaleVariant(),

  // Container animations
  container: createContainerVariant(),
  containerFast: createContainerVariant(STAGGER_DELAYS.COMPONENT),
  containerSlow: createContainerVariant(STAGGER_DELAYS.SECTION),

  item: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },

  // Glow effects
  glowPulse: {
    animate: {
      boxShadow: [
        '0 0 20px rgba(255, 59, 48, 0.3)',
        '0 0 40px rgba(255, 59, 48, 0.8)',
        '0 0 20px rgba(255, 59, 48, 0.3)',
      ],
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
    },
  } as TargetAndTransition,

  // Float animations
  floatUp: {
    animate: {
      y: [0, -20, 0],
      transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
    },
  } as TargetAndTransition,

  // Rotation
  rotateSlow: {
    animate: {
      rotate: 360,
      transition: { duration: 20, repeat: Infinity, ease: 'linear' },
    },
  } as TargetAndTransition,

  // Cinematic reveal
  cinematicReveal: {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: TIMINGS.CINEMATIC, ease: EASINGS.POWER_OUT },
    },
  } as Variants,
}
