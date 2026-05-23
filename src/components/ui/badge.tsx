import type { ReactNode } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-mono tracking-wide font-semibold transition-all duration-300",
  {
    variants: {
      variant: {
        neutral: "border-[var(--glass-border)] bg-black/5 dark:bg-white/5 text-[#555555] dark:text-[#8A8A8A]",
        danger: "border-[#FF3B30]/30 bg-[#FF3B30]/10 text-[#C02010] dark:text-[#FF3B30]",
        warning: "border-[#FFB020]/30 bg-[#FFB020]/10 text-[#B07000] dark:text-[#FFB020]",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
)

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  className?: string
  children: ReactNode
}

export function Badge({ className, variant, children }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)}>{children}</span>
}

