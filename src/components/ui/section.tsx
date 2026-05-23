import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionProps {
  id?: string
  className?: string
  containerClassName?: string
  children: ReactNode
}

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: "left" | "center"
}

export function Section({ id, className, containerClassName, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("relative px-4 py-20 md:py-28", className)}
      aria-label={id}
    >
      <div className={cn("mx-auto w-full max-w-6xl", containerClassName)}>{children}</div>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 space-y-4", align === "center" && "text-center")}>
      {eyebrow ? (
        <p className="font-satoshi text-xs uppercase tracking-[0.28em] text-[#8A8A8A]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-grotesk text-4xl leading-tight md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="mx-auto max-w-3xl text-pretty text-base text-[#8A8A8A] md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  )
}
