"use client"

import { motion } from "framer-motion"

interface BreakdownItem {
  label: string
  value: number
}

export function RiskBreakdownAnimated({ items }: { items: BreakdownItem[] }) {
  return (
    <div className="space-y-4">
      {items.map((it, idx) => (
        <motion.div key={it.label} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.06 }} className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-[#8A8A8A]">{it.label}</span>
            <span className="text-sm font-bold">{it.value}%</span>
          </div>
          <div className="relative h-3 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#FFB020] to-[#FF3B30] shadow-glow-red"
              initial={{ width: 0 }}
              animate={{ width: `${it.value}%` }}
              transition={{ duration: 1.1, ease: "easeOut" }}
            />
            <motion.div
              className="pointer-events-none absolute -right-2 top-[-6px] h-5 w-5 rounded-full bg-[#FF3B30] blur-xl opacity-40"
              animate={{ x: (it.value / 100) * 100 + '%' }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  )
}
