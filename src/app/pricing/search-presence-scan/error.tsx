"use client";

function TopChip({ children }: { children: React.ReactNode }) {
  return (
    <div className="system-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em]">
      {children}
    </div>
  );
}

export default function SearchPresenceScanError({ reset }: { reset: () => void }) {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 text-white sm:px-6 md:py-16 xl:py-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-10 top-8 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute -right-8 top-28 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl sm:h-80 sm:w-80" />
      </div>
      <section className="relative z-10 max-w-4xl">
        <TopChip>Search Presence Scan interruption</TopChip>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
          The first serious paid layer failed while loading.
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
          Retry once. If the route still fails, return to the pricing page or the free snapshot so the system sequence stays clear instead of forcing a random next click.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <button onClick={reset} className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition">Retry Search Presence Scan</button>
          <a href="/pricing" className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition">View pricing and layers</a>
        </div>
      </section>
    </main>
  );
}
