/**
 * UTILITIES - CONSOLIDATED & REFACTORED
 * 
 * Centralized utility functions for consistent patterns across the codebase.
 * All functions are TypeScript-typed and well-documented.
 */

// ============================================================================
// CLASS NAME UTILITIES
// ============================================================================

/**
 * Merge and combine classnames with conditional support
 */
export function cn(
  ...classes: (string | undefined | null | false | Record<string, boolean>)[]
): string {
  return classes
    .filter(Boolean)
    .map((cls) => {
      if (cls && typeof cls === 'object') {
        return Object.entries(cls)
          .filter(([, value]) => value)
          .map(([key]) => key)
          .join(' ')
      }
      return cls as string
    })
    .join(' ')
    .trim()
}

// ============================================================================
// FORMATTING UTILITIES
// ============================================================================

export function formatPercentage(value: number, decimals = 0): string {
  return `${Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)}%`
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat().format(value)
}

export function formatBytes(bytes: number, decimals = 2): string {
  const units = ['B', 'KB', 'MB', 'GB']
  let size = bytes
  let unitIndex = 0

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }

  return `${size.toFixed(decimals)} ${units[unitIndex]}`
}

// ============================================================================
// RISK SCORING UTILITIES
// ============================================================================

export function getRiskColor(score: number): string {
  if (score < 30) return "#FFB020" // Amber
  if (score < 60) return "#FF6B35" // Orange
  return "#FF3B30" // Red
}

export function getRiskLevel(score: number): 'Low' | 'Medium' | 'High' | 'Critical' {
  if (score < 20) return "Low"
  if (score < 40) return "Medium"
  if (score < 70) return "High"
  return "Critical"
}

export function getRiskClass(score: number): string {
  const level = getRiskLevel(score)
  const classMap: Record<string, string> = {
    Low: 'bg-green-500/10 border-green-500/30',
    Medium: 'bg-amber-500/10 border-amber-500/30',
    High: 'bg-orange-500/10 border-orange-500/30',
    Critical: 'bg-red-500/10 border-red-500/30',
  }
  return classMap[level]
}

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

export function isEmpty(value: any): boolean {
  return value === null || value === undefined || value === ''
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// ============================================================================
// ARRAY UTILITIES
// ============================================================================

export function unique<T>(array: T[]): T[] {
  return Array.from(new Set(array))
}

export function groupBy<T>(
  array: T[],
  key: keyof T
): Record<string | number, T[]> {
  return array.reduce((result, item) => {
    const group = String(item[key])
    if (!result[group]) result[group] = []
    result[group].push(item)
    return result
  }, {} as Record<string | number, T[]>)
}

// ============================================================================
// TIMING UTILITIES
// ============================================================================

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null

  return function debounced(...args: Parameters<T>) {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0

  return function throttled(...args: Parameters<T>) {
    const now = Date.now()
    if (now - lastCall >= delay) {
      lastCall = now
      func(...args)
    }
  }
}

// ============================================================================
// BROWSER UTILITIES
// ============================================================================

export function getScrollPosition(): { x: number; y: number } {
  return {
    x: typeof window !== 'undefined' ? window.scrollX : 0,
    y: typeof window !== 'undefined' ? window.scrollY : 0,
  }
}

export function scrollToElement(element: HTMLElement, offset = 0): void {
  if (typeof window === 'undefined') return

  const top = element.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

export function prefersDarkMode(): boolean {
  if (typeof window === 'undefined') return true
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}
