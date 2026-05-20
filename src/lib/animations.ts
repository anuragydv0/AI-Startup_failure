/**
 * ANIMATION VARIANTS - FRAMER MOTION
 * 
 * Reusable Framer Motion variants for consistent animation patterns.
 * All variants are GPU-optimized and follow design system timings.
 */

import { Variants } from 'framer-motion'

// Import centralized timings
import { TIMINGS, EASINGS, STAGGER_DELAYS } from './animationPresets'

// ============================================================================
// CONTAINER ANIMATIONS (For staggered children)
// ============================================================================

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGER_DELAYS.ITEM,
      delayChildren: 0.2,
    },
  },
}

export const containerFastVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGER_DELAYS.COMPONENT,
    },
  },
}

// ============================================================================
// ITEM ANIMATIONS (For children in containers)
// ============================================================================

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMINGS.NORMAL,
      ease: EASINGS.SMOOTH,
    },
  },
}

export const fadeInUp: Variants = itemVariants

export const itemFadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: TIMINGS.FAST, ease: EASINGS.SMOOTH },
  },
}

// ============================================================================
// SECTION ANIMATIONS
// ============================================================================

export const sectionRevealVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGER_DELAYS.SECTION,
      delayChildren: 0.1,
    },
  },
}

// ============================================================================
// HERO ANIMATIONS
// ============================================================================

export const heroHeadlineVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMINGS.SLOW,
      ease: EASINGS.SMOOTH,
      delay,
    },
  }),
}

// ============================================================================
// VIEWPORT ANIMATIONS (whileInView)
// ============================================================================

export const viewportRevealVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMINGS.NORMAL,
      ease: EASINGS.SMOOTH,
    },
  },
}

export const viewportScaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: TIMINGS.NORMAL,
      ease: EASINGS.POWER_OUT,
    },
  },
}

// ============================================================================
// HOVER ANIMATIONS
// ============================================================================

export const glowAnimation = {
  boxShadow: [
    '0 0 20px rgba(255, 59, 48, 0.3)',
    '0 0 40px rgba(255, 59, 48, 0.8)',
    '0 0 20px rgba(255, 59, 48, 0.3)',
  ],
}
