function TopChip({ children }: { children: React.ReactNode }) {
  return (
    <div className="system-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em]">
      {children}
    </div>
  );
}

export default function SearchPresenceScanLoading() {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 text-white sm:px-6 md:py-16 xl:py-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-10 top-8 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute -right-8 top-28 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl sm:h-80 sm:w-80" />
        <div className="system-grid-wide absolute inset-0 opacity-[0.03]" />
      </div>
      <section className="relative z-10">
        <TopChip>Search Presence Scan loading</TopChip>
        <h1 className="mt-5 max-w-5xl text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl xl:text-7xl">
          Preparing the first serious paid read.
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
          This layer should load as a clean explanation of what Search Presence Scan is, when it fits, and why it sits between the free snapshot and the flagship strategy review.
        </p>
      </section>
    </main>
  );
}
