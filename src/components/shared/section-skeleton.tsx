export function SectionSkeleton() {
  return (
    <div className="px-4 py-20 md:py-28" aria-hidden>
      <div className="mx-auto w-full max-w-6xl">
        <div className="h-10 w-56 animate-pulse rounded-md bg-white/10" />
        <div className="mt-4 h-5 w-80 animate-pulse rounded-md bg-white/5" />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-40 animate-pulse rounded-2xl border border-white/10 bg-white/5"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
