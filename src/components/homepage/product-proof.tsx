const ITEMS = [
  ["Presence Report", "Show the report object before plan pressure."],
  ["Choice Gap", "Show why another option may be easier to choose."],
  ["Repair Queue", "Show the ranked path from weak signal to next action."],
  ["Control Snapshot", "Show how public signals stay watched after work starts."],
] as const;

export function ProductProof() {
  return (
    <section className="relative px-5 py-7 sm:px-8 lg:py-10" aria-label="Product proof">
      <div className="mx-auto max-w-7xl rounded-[2.3rem] border border-slate-900 bg-slate-950 p-6 text-white shadow-[0_32px_110px_rgba(15,23,42,0.2)] sm:rounded-[3rem] sm:p-8 lg:p-10">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">Product proof</p>
        <h2 className="mt-4 text-[clamp(2.2rem,8vw,4.7rem)] font-semibold leading-[0.93] tracking-[-0.075em] text-white">Show the product before the pitch.</h2>
        <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-slate-300">The homepage should make the path from report state to gap, action, and control obvious before a visitor compares plans.</p>
        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map(([item, detail]) => (
            <div key={item} className="rounded-[1.2rem] border border-white/10 bg-white/[0.06] p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-100">{item}</p>
              <p className="mt-3 text-sm font-medium leading-6 text-slate-300">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
