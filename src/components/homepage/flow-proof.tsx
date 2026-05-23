const FLOW = [
  ["Input", "Start with the business website."],
  ["Report", "Show the customer-safe presence state."],
  ["Gap", "Explain what makes the business harder to choose."],
  ["Next", "Route to Scan, Review, Repair, or Control."],
] as const;

export function FlowProof() {
  return (
    <section className="relative px-5 py-7 sm:px-8 lg:py-10" aria-label="Homepage flow proof">
      <div className="mx-auto max-w-7xl rounded-[2.3rem] border border-cyan-100 bg-cyan-50/60 p-6 shadow-[0_22px_80px_rgba(15,23,42,0.06)] sm:rounded-[3rem] sm:p-8 lg:p-10">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Customer journey</p>
        <h2 className="mt-4 text-[clamp(2.1rem,7.8vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.07em] text-slate-950">Make the first visit feel like the first product command.</h2>
        <div className="mt-7 grid gap-4 lg:grid-cols-4">
          {FLOW.map(([label, copy], index) => (
            <article key={label} className="rounded-[1.5rem] border border-white/80 bg-white/82 p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-700">{index + 1}. {label}</p>
              <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
