import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[#FF3B30] text-[#050505] shadow-[0_0_20px_rgba(255,59,48,0.3)] hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(255,59,48,0.45)] focus-visible:ring-[#FF3B30]",
        secondary:
          "border border-white/15 bg-white/5 text-[#F5F5F5] hover:border-white/30 hover:bg-white/10 focus-visible:ring-white/40",
        danger:
          "border border-[#FF3B30]/50 bg-[#FF3B30]/10 text-[#FF3B30] hover:bg-[#FF3B30]/20 focus-visible:ring-[#FF3B30]",
        ghost: "text-[#F5F5F5] hover:bg-white/10 focus-visible:ring-white/40",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-7 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }
