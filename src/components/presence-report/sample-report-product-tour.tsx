const TOUR = [
  {
    title: "Presence Score",
    copy: "A directional first signal across findability, understanding, trust, choice, and action.",
  },
  {
    title: "Choice Gap",
    copy: "The reason a customer or AI system may find another option easier to understand or trust.",
  },
  {
    title: "Evidence Boundary",
    copy: "What was checked, what was not checked, and what the sample cannot promise.",
  },
  {
    title: "Repair Queue",
    copy: "The first fixes ordered by impact, effort, risk, and confidence instead of generic audit noise.",
  },
  {
    title: "Next Move",
    copy: "The safest path after the first signal: deeper review, repair, or ongoing control.",
  },
] as const;

export function SampleReportProductTour() {
  return (
    <section className="px-5 pb-10 sm:px-8 lg:pb-16" aria-label="Sample report product tour">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-900 bg-slate-950 p-6 text-white shadow-[0_26px_90px_rgba(15,23,42,0.2)] sm:rounded-[2.7rem] sm:p-8">
        <div className="grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">Product tour</p>
            <h2 className="mt-3 text-[clamp(2.1rem,7vw,4.2rem)] font-semibold leading-[0.95] tracking-[-0.075em] text-white">
              Read the sample like the product.
            </h2>
            <p className="mt-4 text-base font-medium leading-8 text-slate-300">
              The sample should show what Cendorq gives before a customer chooses deeper review, repair, or control: a score, a gap, a boundary, a queue, and a next move.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {TOUR.map((item, index) => (
              <article key={item.title} className="rounded-[1.25rem] border border-white/10 bg-white/[0.06] p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-100">0{index + 1}</p>
                <h3 className="mt-3 text-xl font-semibold tracking-[-0.045em] text-white">{item.title}</h3>
                <p className="mt-2 text-xs font-semibold leading-5 text-slate-300">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
