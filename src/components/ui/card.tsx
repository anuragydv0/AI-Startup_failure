import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardVariants = cva(
  "rounded-2xl border border-[var(--glass-border)] bg-[var(--card)] p-6 text-[var(--text)] shadow-[0_16px_48px_rgba(0,0,0,0.1)] dark:shadow-[0_16px_48px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-300",
  {
    variants: {
      tone: {
        default: "border-[var(--glass-border)]",
        warning: "border-[#FFB020]/30 bg-[#FFB020]/[0.05] text-[#B07000] dark:text-[#FFB020]",
        danger: "border-[#FF3B30]/30 bg-[#FF3B30]/[0.05] text-[#C02010] dark:text-[#FF3B30]",
        subtle: "border-[var(--glass-border)]/50 bg-[var(--card)]/40",
      },
    },
    defaultVariants: {
      tone: "default",
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

export function Card({ className, tone, ...props }: CardProps) {
  return <div className={cn(cardVariants({ tone }), className)} {...props} />
}

