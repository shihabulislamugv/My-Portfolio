export default function ProjectsLoading() {
  return (
    <main className="flex-1 max-w-[90rem] mx-auto px-6 pt-28 md:pt-32 pb-24 w-full animate-pulse">
      {/* Back button skeleton */}
      <div className="mb-8">
        <div className="h-5 w-40 bg-zinc-200 border border-zinc-300" />
      </div>

      {/* Header skeleton */}
      <div className="mb-14 md:mb-16 border-b-4 border-zinc-900 pb-8 md:pb-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <div className="h-14 sm:h-16 md:h-20 w-64 sm:w-80 bg-zinc-300 mb-3" />
          <div className="h-10 sm:h-12 w-48 bg-zinc-200" />
        </div>
        <div className="max-w-md w-full space-y-3">
          <div className="h-4 bg-zinc-200 w-full" />
          <div className="h-4 bg-zinc-200 w-3/4" />
          <div className="h-6 bg-zinc-900 w-44 mt-4" />
        </div>
      </div>

      {/* Projects Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`space-y-6 ${i % 2 === 0 ? "md:mt-24" : ""}`}>
            <div className="aspect-[4/3] md:aspect-[16/11] bg-zinc-200 border-4 border-zinc-900 shadow-[12px_12px_0px_0px_rgba(24,24,27,1)]" />
            <div className="space-y-3">
              <div className="h-4 w-24 bg-zinc-300" />
              <div className="h-8 w-3/4 bg-zinc-300" />
              <div className="h-4 w-full bg-zinc-200" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
