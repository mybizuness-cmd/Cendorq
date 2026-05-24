const TOUR = [
  {
    title: "Presence Score",
    eyebrow: "State",
    copy: "A directional first signal across findability, understanding, trust, choice, and action.",
    detail: "Shows where the public presence looks strong, weak, or unclear before deeper review.",
  },
  {
    title: "Choice Gap",
    eyebrow: "Gap",
    copy: "The reason a customer or AI system may find another option easier to understand or trust.",
    detail: "Separates being visible from being easy to choose, so the report points to decision friction.",
  },
  {
    title: "Evidence Boundary",
    eyebrow: "Limit",
    copy: "What was checked, what was not checked, and what the sample cannot promise.",
    detail: "Keeps the sample safe: no ranking, revenue, lead, or AI-placement guarantee.",
  },
  {
    title: "Repair Queue",
    eyebrow: "Action",
    copy: "The first fixes ordered by impact, effort, risk, and confidence instead of generic audit noise.",
    detail: "Turns weak signals into a sequence the customer can understand and approve.",
  },
  {
    title: "Next Move",
    eyebrow: "Path",
    copy: "The safest path after the first signal: deeper review, repair, or ongoing control.",
    detail: "Connects the report to the plan depth without forcing paid pressure too early.",
  },
] as const;

const DEPTHS = [
  ["Free Scan", "First signal", "Shows the likely weak area before buying deeper diagnosis."],
  ["Deep Review", "Cause", "Explains why the weak signal exists and what evidence supports it."],
  ["Build Fix", "Repair", "Improves the scoped public signal without turning into unlimited work."],
  ["Ongoing Control", "Watch", "Tracks drift and keeps the next command visible."],
] as const;

const PROOF_READING_KEY = [
  ["Score", "A directional state, not a promise."],
  ["Gap", "The customer-choice reason behind the weak signal."],
  ["Boundary", "What the sample can and cannot conclude."],
  ["Queue", "The first useful repair order."],
  ["Move", "The safest next depth after the first signal."],
] as const;

const REPORT_READING_ORDER = [
  ["Look", "Find the lowest-confidence area first."],
  ["Ask", "Why would a customer choose a clearer option?"],
  ["Limit", "Separate sample evidence from promises."],
  ["Act", "Use the queue before buying unrelated work."],
] as const;

export function SampleReportProductTour() {
  return (
    <section className="px-5 pb-10 sm:px-8 lg:pb-16" aria-label="Sample report product tour">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-slate-900 bg-slate-950 text-white shadow-[0_26px_90px_rgba(15,23,42,0.2)] sm:rounded-[2.7rem]">
        <div className="grid gap-0 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">Product tour</p>
            <h2 className="mt-3 text-[clamp(2.1rem,7vw,4.2rem)] font-semibold leading-[0.95] tracking-[-0.075em] text-white">
              Read the sample like the product.
            </h2>
            <p className="mt-4 text-base font-medium leading-8 text-slate-300">
              The sample should make the product obvious before a customer chooses deeper review, repair, or control: state, gap, boundary, queue, and next move.
            </p>
            <div className="mt-6 rounded-[1.4rem] border border-cyan-200/20 bg-cyan-200/10 p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-100">How to read it</p>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-200">
                This sample demonstrates format and decision logic. A real result depends on business details, public pages, proof, category, location, and selected depth.
              </p>
            </div>
            <div className="mt-4 grid gap-2">
              {REPORT_READING_ORDER.map(([label, copy]) => (
                <div key={label} className="rounded-[1rem] border border-white/10 bg-white/[0.045] p-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-cyan-100">{label}</p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-slate-300">{copy}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
              {TOUR.map((item, index) => (
                <article key={item.title} className="rounded-[1.25rem] border border-white/10 bg-white/[0.06] p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-100">0{index + 1}</p>
                    <p className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-cyan-100">{item.eyebrow}</p>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold tracking-[-0.045em] text-white">{item.title}</h3>
                  <p className="mt-2 text-xs font-semibold leading-5 text-slate-300">{item.copy}</p>
                  <p className="mt-3 rounded-[0.9rem] border border-white/10 bg-slate-950/55 p-3 text-[11px] font-semibold leading-5 text-slate-300">{item.detail}</p>
                </article>
              ))}
            </div>

            <div className="mt-5 rounded-[1.6rem] border border-white/10 bg-white/[0.045] p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-100">Proof reading key</p>
              <div className="mt-4 grid gap-3 md:grid-cols-5">
                {PROOF_READING_KEY.map(([label, copy]) => (
                  <div key={label} className="rounded-[1.05rem] border border-white/10 bg-slate-950/65 p-4">
                    <p className="text-sm font-black text-white">{label}</p>
                    <p className="mt-2 text-xs font-semibold leading-5 text-slate-300">{copy}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-[1.6rem] border border-white/10 bg-white/[0.045] p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-100">Plan depth ladder</p>
              <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {DEPTHS.map(([name, label, copy]) => (
                  <div key={name} className="rounded-[1.1rem] border border-white/10 bg-slate-950/65 p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-cyan-100">{label}</p>
                    <h3 className="mt-2 text-lg font-semibold tracking-[-0.04em] text-white">{name}</h3>
                    <p className="mt-2 text-xs font-semibold leading-5 text-slate-300">{copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
