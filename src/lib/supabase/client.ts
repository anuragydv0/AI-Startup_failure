import { createBrowserClient } from "@supabase/ssr"

const mockClient = {
  auth: {
    getSession: async () => ({ data: { session: null } }),
  },
  from: () => ({
    insert: async () => ({ data: null, error: null }),
  }),
}

export function createClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    // Graceful fallback for mock mode
    console.warn("Supabase credentials missing. Operating in Local Mock Mode.")
    return mockClient as any
  }
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}
