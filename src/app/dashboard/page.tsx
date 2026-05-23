import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { SiteHeader } from "@/components/layout/site-header"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { ClientCinematicBackground } from "@/components/shared/client-cinematic-background"
import { LeftSidebar } from "@/components/layout/left-sidebar"

export default async function DashboardPage() {
  const supabase = await createClient()
  let user = null

  if (supabase) {
    const { data } = await supabase.auth.getUser()
    user = data.user

    if (!user) {
      redirect("/auth/sign-in")
    }
  }

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#050505] px-4 pb-20 pt-28 text-[#F5F5F5]">
      <ClientCinematicBackground />
      <SiteHeader />
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
          <div>
            <LeftSidebar />
          </div>
          <div>
            <DashboardOverview user={user} />
          </div>
        </div>
      </div>
    </main>
  )
}
