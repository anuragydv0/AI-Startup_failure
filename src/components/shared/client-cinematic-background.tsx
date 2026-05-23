"use client"

import dynamic from "next/dynamic"

/**
 * Client-side wrapper for CinematicBackground.
 * ssr: false is only allowed inside Client Components — this wrapper solves that.
 */
const CinematicBackgroundLazy = dynamic(
  () =>
    import("@/components/3d/cinematic-background").then((mod) => mod.CinematicBackground),
  { ssr: false }
)

export function ClientCinematicBackground() {
  return <CinematicBackgroundLazy />
}
