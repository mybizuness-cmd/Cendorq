const FLOW = [
  ["Input", "Start with the business website so the visitor feels the product can begin immediately.", "Command begins", "Website signal"],
  ["Report", "Show the customer-safe presence state before asking for a deeper plan.", "Proof appears", "Presence state"],
  ["Gap", "Explain what makes the business harder to understand, trust, compare, or choose.", "Cause is visible", "Choice risk"],
  ["Next", "Route to Scan, Review, Repair, or Control without clutter or pressure.", "Action is clear", "Best next move"],
] as const;

const PROOF_PATH = [
  ["Visible first", "The first screen should feel like a working scan path, not a brochure."],
  ["Bounded proof", "Show the signal and its limit before asking for deeper work."],
  ["One action", "Every proof object should make the next useful move easier."],
] as const;

export function FlowProof() {
  return (
    <section className="relative px-4 py-7 sm:px-8 lg:py-10" aria-label="Homepage flow proof">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.15rem] border border-white/80 bg-white/86 p-5 shadow-[0_22px_72px_rgba(15,23,42,0.055)] backdrop-blur sm:rounded-[2.8rem] sm:p-8 lg:p-10">
        <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold text-cyan-700">Customer journey</p>
            <h2 className="mt-3 text-[clamp(2.1rem,7.8vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.07em] text-slate-950">Make the first visit feel like the first product command.</h2>
            <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-slate-600">The public journey should move like a command surface: input, visible report, explained gap, and one useful next action.</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            {PROOF_PATH.map(([label, copy]) => (
              <div key={label} className="rounded-[1.1rem] border border-slate-200 bg-white/88 p-4 shadow-sm">
                <p className="text-sm font-semibold text-cyan-700">{label}</p>
                <p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-7 grid gap-4 lg:grid-cols-4">
          {FLOW.map(([label, copy, state, signal], index) => (
            <article key={label} className="rounded-[1.35rem] border border-slate-200 bg-white/88 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-white">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-semibold text-cyan-700">0{index + 1} {label}</p>
                <p className="text-right text-xs font-semibold leading-5 text-slate-500">{signal}</p>
              </div>
              <h3 className="mt-3 text-xl font-semibold tracking-[-0.04em] text-slate-950">{state}</h3>
              <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
