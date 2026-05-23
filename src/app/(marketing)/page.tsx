import { SiteFooter } from "@/components/layout/site-footer"
import { ClientCinematicBackground } from "@/components/shared/client-cinematic-background"
import { ClientMarketingPage } from "@/components/shared/client-marketing-page"

export default function MarketingPage() {
  return (
    <main className="noise-overlay relative min-h-screen overflow-x-clip bg-[#050505] text-[#F5F5F5]">
      <ClientCinematicBackground />
      <ClientMarketingPage />
      <SiteFooter />
    </main>
  )
}
