import type { NavItem } from "@/types/navigation"

export const marketingNavItems: NavItem[] = [
  { label: "Features", href: "#features" },
  { label: "Live Analysis", href: "#analysis" },
  { label: "Graveyard", href: "#graveyard" },
  { label: "Roast Mode", href: "#roast-mode" },
]

export const footerColumns: ReadonlyArray<{
  title: string
  links: NavItem[]
}> = [
  {
    title: "Product",
    links: [
      { label: "How It Works", href: "#features" },
      { label: "Live Analysis", href: "#analysis" },
      { label: "Roast Mode", href: "#roast-mode" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Mission", href: "#mission" },
      { label: "Careers", href: "#careers" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#privacy" },
      { label: "Terms", href: "#terms" },
      { label: "Security", href: "#security" },
    ],
  },
] as const
