"use client"

import { motion } from "framer-motion"
import { LayoutDashboard, PieChart, AlertTriangle, Users, Star, Clock, Bookmark, Sliders } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useTheme } from "@/components/shared/theme-provider"

const MENU = [
  { label: "Analysis Overview", icon: LayoutDashboard },
  { label: "Risk Breakdown", icon: PieChart },
  { label: "Failure Reasons", icon: AlertTriangle },
  { label: "Competitor Analysis", icon: Users },
  { label: "Recommendations", icon: Star },
  { label: "Roast Mode", icon: Sliders },
  { label: "Saved Analyses", icon: Bookmark },
  { label: "History", icon: Clock }
]

export function LeftSidebar() {
  const [active, setActive] = useState<string>("Analysis Overview")
  const { theme } = useTheme()

  function SidebarItem({ label, Icon }: { label: string; Icon: any }) {
    const ref = useRef<HTMLButtonElement | null>(null)
    const raf = useRef<number | null>(null)
    const pointer = useRef({ x: 0, y: 0 })
    const transform = useRef({ tx: 0, ty: 0 })

    useEffect(() => {
      return () => {
        if (raf.current) cancelAnimationFrame(raf.current)
      }
    }, [])

    const onMove = (e: React.MouseEvent) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) * 0.08
      const dy = (e.clientY - cy) * 0.06
      pointer.current.x = dx
      pointer.current.y = dy

      if (raf.current) return
      const loop = () => {
        transform.current.tx += (pointer.current.x - transform.current.tx) * 0.2
        transform.current.ty += (pointer.current.y - transform.current.ty) * 0.2
        if (ref.current) {
          ref.current.style.transform = `translate3d(${transform.current.tx}px, ${transform.current.ty}px, 0)`
        }
        raf.current = requestAnimationFrame(loop)
      }
      raf.current = requestAnimationFrame(loop)
    }

    const onLeave = () => {
      if (raf.current) cancelAnimationFrame(raf.current)
      raf.current = null
      pointer.current.x = 0
      pointer.current.y = 0
      if (ref.current) ref.current.style.transform = "translate3d(0,0,0)"
    }

    const isActive = active === label

    return (
      <li className="py-1">
        <motion.button
          ref={ref}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          whileHover={{ x: 6 }}
          onClick={() => setActive(label)}
          aria-current={isActive ? "page" : undefined}
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-300 relative overflow-hidden ${
            isActive 
              ? theme === "light"
                ? "bg-gradient-to-r from-[#FF3B30]/10 via-[#FF3B30]/2 to-transparent text-[#FF3B30] font-semibold border-l-2 border-[#FF3B30]" 
                : "bg-gradient-to-r from-[#FF3B30]/15 via-[#FF3B30]/4 to-transparent text-[#F5F5F5] font-semibold border-l-2 border-[#FF3B30] shadow-[0_0_15px_rgba(255,59,48,0.12)]"
              : theme === "light"
                ? "text-[#666666] hover:bg-black/5 hover:text-[#111111]"
                : "text-[#8A8A8A] hover:bg-white/5 hover:text-[#F5F5F5]"
          }`}
        >
          {/* Subtle pulse trail when active */}
          {isActive && (
            <motion.span 
              className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#FFB020]"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
          
          <Icon className={`h-4.5 w-4.5 ${isActive ? "text-[#FF3B30]" : "text-[#FFB020]"}`} />
          <span className="flex-1 text-left">{label}</span>
          <span className={`text-xs ${isActive ? "text-[#FF3B30]" : "text-[#8A8A8A]"} font-mono`}>›</span>
        </motion.button>
      </li>
    )
  }

  return (
    <aside className="hidden lg:block lg:w-80">
      <div className="sticky top-28 space-y-6">
        <div className={`glass-panel p-5 rounded-2xl border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all ${
          theme === "light" 
            ? "border-black/5 bg-[#FFFFFF]/70 shadow-[0_10px_40px_rgba(0,0,0,0.04)]" 
            : "border-white/10 bg-[#0D0D0D]/60"
        }`}>
          {/* Deadpool Header */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              <div className="h-10 w-10 rounded-full bg-[#FF3B30] shadow-[0_0_24px_rgba(255,59,48,0.5)] flex items-center justify-center text-sm font-bold text-[#050505] font-grotesk z-10">
                💀
              </div>
              <motion.div 
                className="absolute inset-0 rounded-full bg-[#FF3B30]/30"
                animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.2, repeat: Infinity }}
              />
            </div>
            <div>
              <div className={`font-grotesk text-sm font-bold ${theme === "light" ? "text-[#111111]" : "text-[#F5F5F5]"}`}>
                DEADPOOL AI
              </div>
              <div className={`text-[11px] font-mono tracking-widest uppercase ${theme === "light" ? "text-[#666666]" : "text-[#8A8A8A]"}`}>
                Startup Autopsy OS
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-6 flow-root">
            <ul className="space-y-1">
              {MENU.map((item) => (
                <SidebarItem key={item.label} label={item.label} Icon={item.icon} />
              ))}
            </ul>
          </nav>

          {/* Upgrade & Profile Section */}
          <div className={`mt-6 rounded-xl border p-4 ${
            theme === "light" 
              ? "border-black/5 bg-gradient-to-b from-black/[0.01] to-transparent text-[#111]" 
              : "border-white/5 bg-gradient-to-b from-black/40 to-transparent text-[#F5F5F5]"
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-[10px] font-mono uppercase ${theme === "light" ? "text-[#666666]" : "text-[#8A8A8A]"}`}>
                  CLASSIFIED SUITE
                </div>
                <div className="mt-1 font-semibold text-xs font-grotesk">Founder • Local Demo</div>
              </div>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs border ${
                theme === "light" 
                  ? "bg-black/5 border-black/10 text-[#111]" 
                  : "bg-white/5 border-white/8 text-[#F5F5F5]"
              }`}>
                DP
              </div>
            </div>
            
            <div className={`mt-3 text-[11px] leading-relaxed ${theme === "light" ? "text-[#666666]" : "text-[#8A8A8A]"}`}>
              Upgrade for full roast mode and investor readiness autopsies.
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-3 w-full rounded-lg bg-gradient-to-r from-[#FFB020] to-[#FF3B30] py-2 text-xs font-bold text-[#050505] shadow-[0_4px_20px_rgba(255,59,48,0.25)] hover:opacity-95 transition-opacity"
            >
              Upgrade Terminal
            </motion.button>
          </div>
        </div>
      </div>
    </aside>
  )
}
