import Link from "next/link"
import { brand } from "@/assets/brand"
import { footerColumns } from "@/constants/navigation"

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 px-4 py-12">
      <div className="mx-auto w-full max-w-6xl space-y-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="font-grotesk text-base font-semibold">{column.title}</h3>
              <ul className="mt-4 space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#8A8A8A] transition-colors hover:text-[#F5F5F5]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-sm text-[#8A8A8A] md:flex-row">
          <p>© 2026 {brand.fullName}. All rights reserved.</p>
          <p>{brand.tagLine}.</p>
        </div>
      </div>
    </footer>
  )
}
