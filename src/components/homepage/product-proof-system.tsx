const STAGES = [
  ["Presence Report", "See the score, checks, weak signal, and next move."],
  ["Choice Gap", "See why another option may be easier to understand or trust."],
  ["Repair Queue", "See what should be improved first."],
  ["Control Snapshot", "See what needs continued attention."],
] as const;

export function ProductProofSystem() {
  return (
    <section className="px-5 py-10 sm:px-8 lg:py-14" aria-label="Product proof system">
      <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-slate-900 bg-slate-950 p-6 text-white shadow-[0_34px_110px_rgba(15,23,42,0.22)] sm:p-8 lg:p-10">
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">Product proof system</p>
            <h2 className="mt-4 text-[clamp(2.3rem,8vw,5rem)] font-semibold leading-[0.92] tracking-[-0.08em] text-white">Show the system in one pass.</h2>
            <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-slate-300">The public page should make the path from first signal to report, gap, queue, and control easy to understand.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {STAGES.map(([title, copy], index) => (
              <article key={title} className="rounded-[1.4rem] border border-white/10 bg-white/[0.06] p-5 transition hover:-translate-y-1 hover:border-cyan-200/35">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-100">0{index + 1}</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.055em] text-white">{title}</h3>
                <p className="mt-3 text-sm font-medium leading-7 text-slate-300">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
