"use client"

import { PropsWithChildren } from "react"
import { useLenis } from "@/hooks/use-lenis"

export function SmoothScrollProvider({ children }: PropsWithChildren) {
  useLenis()
  return children
}
