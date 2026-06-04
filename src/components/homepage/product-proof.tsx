const ITEMS = [
  ["State", "Presence Report", "Show the report object early.", "Score, pillars, and current state"],
  ["Gap", "Choice Gap", "Show why another option may be easier to choose.", "Understanding, trust, and comparison risk"],
  ["Action", "Repair Queue", "Show the ranked path from weak signal to next action.", "Prioritized next fixes"],
  ["Watch", "Control Snapshot", "Show how public signals stay watched.", "Drift, posture, and follow-up"],
] as const;

const PROOF_ROWS = [
  ["AI proof surface", "Search, maps, reviews, directories, and AI answers stay framed as customer-safe visibility signals."],
  ["Prompt-style monitoring", "Discovery, comparison, and action questions become watch rows, not ranking promises."],
  ["Evidence boundary", "Public proof should show the product shape without exposing raw evidence or overclaiming certainty."],
] as const;

export function ProductProof() {
  return (
    <section className="relative px-4 py-7 sm:px-8 lg:py-10" aria-label="Product proof">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.15rem] border border-white/80 bg-white/88 p-5 text-slate-950 shadow-[0_24px_78px_rgba(15,23,42,0.065)] backdrop-blur sm:rounded-[2.8rem] sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(251,207,232,0.14),transparent_34%),radial-gradient(circle_at_100%_100%,rgba(186,230,253,0.1),transparent_36%)]" aria-hidden="true" />
        <div className="relative grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold text-cyan-700">Product proof</p>
            <h2 className="mt-3 text-[clamp(2.2rem,8vw,4.7rem)] font-semibold leading-[0.93] tracking-[-0.075em] text-slate-950">Show the product first.</h2>
            <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-slate-600">The homepage should make the path from report state to gap, action, and control obvious.</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            {PROOF_ROWS.map(([label, copy]) => (
              <div key={label} className="rounded-[1.1rem] border border-slate-200 bg-white/88 p-4 shadow-sm">
                <p className="text-sm font-semibold text-cyan-700">{label}</p>
                <p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map(([label, item, detail, proof]) => (
            <div key={item} className="rounded-[1.2rem] border border-slate-200 bg-white/88 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-white">
              <p className="text-sm font-semibold text-cyan-700">{label}</p>
              <h3 className="mt-3 text-xl font-semibold tracking-[-0.04em] text-slate-950">{item}</h3>
              <p className="mt-3 text-sm font-medium leading-6 text-slate-600">{detail}</p>
              <p className="mt-4 rounded-[0.9rem] border border-slate-200 bg-white p-3 text-xs font-semibold leading-5 text-slate-600 shadow-sm">{proof}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
