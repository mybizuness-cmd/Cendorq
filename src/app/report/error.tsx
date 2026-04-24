"use client";

export default function ReportErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 text-white sm:px-6 md:py-16 xl:py-20">
      <section className="system-panel-authority rounded-[2rem] p-8 text-center">
        <div className="system-chip inline-flex rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-rose-200">Report View</div>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">The report view hit a route error.</h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300">The system could not render the requested report snapshot cleanly. Reset the route and try again.</p>
        <div className="mt-8 flex justify-center gap-3">
          <button onClick={reset} className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition">Retry report view</button>
        </div>
      </section>
    </main>
  );
}
