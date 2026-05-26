const TOUR = [
  {
    title: "Presence Score",
    copy: "A directional first signal across findability, understanding, trust, choice, and action.",
    detail: "Shows where the public presence looks strong, weak, or unclear before deeper review.",
  },
  {
    title: "Choice Gap",
    copy: "The reason a customer or AI system may find another option easier to understand or trust.",
    detail: "Separates being visible from being easy to choose, so the report points to decision friction.",
  },
  {
    title: "Evidence Boundary",
    copy: "What was checked, what was not checked, and what the sample cannot promise.",
    detail: "Keeps the sample safe: no ranking, revenue, lead, or AI-placement guarantee.",
  },
  {
    title: "Repair Queue",
    copy: "The first fixes ordered by impact, effort, risk, and confidence instead of generic audit noise.",
    detail: "Turns weak signals into a sequence the customer can understand and approve.",
  },
  {
    title: "Next Move",
    copy: "The safest path after the first signal: deeper review, repair, or ongoing control.",
    detail: "Connects the report to the plan depth without forcing paid pressure too early.",
  },
] as const;

const DEPTHS = [
  ["Free Scan", "Shows the likely weak area before buying deeper diagnosis."],
  ["Deep Review", "Explains why the weak signal exists and what evidence supports it."],
  ["Build Fix", "Improves the scoped public signal without turning into unlimited work."],
  ["Ongoing Control", "Tracks drift and keeps the next command visible."],
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
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/85 bg-white/82 text-slate-950 shadow-[0_24px_80px_rgba(14,165,233,0.08)] backdrop-blur-2xl sm:rounded-[2.7rem]">
        <div className="grid gap-0 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="border-b border-cyan-100 p-6 sm:p-8 lg:border-b-0 lg:border-r">
            <h2 className="text-[clamp(2.1rem,7vw,4.2rem)] font-semibold leading-[0.95] tracking-[-0.075em] text-slate-950">
              Read the sample like the product.
            </h2>
            <p className="mt-4 text-base font-medium leading-8 text-slate-600">
              The sample should make the product obvious before a customer chooses deeper review, repair, or control: state, gap, boundary, queue, and next move.
            </p>
            <p className="mt-5 rounded-[1.35rem] border border-cyan-100 bg-cyan-50/48 p-4 text-sm font-semibold leading-7 text-slate-700">
              This sample demonstrates format and decision logic. A real result depends on business details, public pages, proof, category, location, and selected depth.
            </p>
            <div className="mt-4 grid gap-2">
              {REPORT_READING_ORDER.map(([label, copy]) => (
                <div key={label} className="rounded-[1rem] border border-cyan-100 bg-white p-3 shadow-sm">
                  <p className="text-sm font-black text-cyan-700">{label}</p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-slate-600">{copy}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
              {TOUR.map((item) => (
                <article key={item.title} className="rounded-[1.25rem] border border-cyan-100 bg-white p-4 shadow-sm">
                  <h3 className="text-xl font-semibold tracking-[-0.045em] text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{item.copy}</p>
                  <p className="mt-3 rounded-[0.9rem] border border-cyan-100 bg-cyan-50/45 p-3 text-[11px] font-semibold leading-5 text-slate-600">{item.detail}</p>
                </article>
              ))}
            </div>

            <div className="mt-5 rounded-[1.6rem] border border-cyan-100 bg-cyan-50/38 p-5">
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {DEPTHS.map(([name, copy]) => (
                  <div key={name} className="rounded-[1.1rem] border border-cyan-100 bg-white p-4 shadow-sm">
                    <h3 className="text-lg font-semibold tracking-[-0.04em] text-slate-950">{name}</h3>
                    <p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <span className="sr-only">Product tour. How to read it. Proof reading key. Plan depth ladder. Score. Gap. Boundary. Queue. Move.</span>
    </section>
  );
}
