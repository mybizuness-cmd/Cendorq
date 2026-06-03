const ASSETS = [
  ["Presence Gap Index", "Benchmark answer-readiness by vertical instead of pretending to be a broad SEO index.", "Category signal"],
  ["Vertical proof sets", "Show what different business categories need to be understood and chosen.", "Market proof"],
  ["Repair library", "Turn repeated weak signals into clearer page, proof, FAQ, and action patterns.", "Execution memory"],
] as const;

export function AuthorityProof() {
  return (
    <section className="relative px-4 py-7 sm:px-8 lg:py-10" aria-label="Authority proof">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.15rem] border border-white/80 bg-white/88 p-5 shadow-[0_22px_72px_rgba(15,23,42,0.055)] backdrop-blur sm:rounded-[2.8rem] sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(251,207,232,0.14),transparent_34%),radial-gradient(circle_at_100%_100%,rgba(186,230,253,0.1),transparent_36%)]" aria-hidden="true" />
        <div className="relative">
          <p className="text-sm font-semibold text-cyan-700">Authority asset</p>
          <h2 className="mt-3 text-[clamp(2.1rem,7.8vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.07em] text-slate-950">Build the Presence Gap Index.</h2>
          <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-slate-600">Cendorq should prove the category with visible public intelligence: not just visibility, but whether businesses are understood, trusted, compared, and chosen.</p>
          <div className="mt-7 grid gap-4 lg:grid-cols-3">
            {ASSETS.map(([label, copy, state]) => (
              <article key={label} className="rounded-[1.3rem] border border-slate-200 bg-white/88 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-white">
                <p className="text-sm font-semibold text-cyan-700">{state}</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-slate-950">{label}</h3>
                <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
