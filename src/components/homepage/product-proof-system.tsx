import Link from "next/link";

const STAGES = [
  {
    title: "Presence Report",
    eyebrow: "First signal",
    state: "Directional presence score with five checks.",
    evidence: "Findability, Understanding, Trust, Choice, and Action are shown together so the first weak signal is visible before deeper work starts.",
    limit: "A first signal is not a ranking, revenue, lead, or AI-placement guarantee.",
    action: "Start Free Scan",
  },
  {
    title: "Choice Gap",
    eyebrow: "Decision gap",
    state: "Why another option may be easier to choose.",
    evidence: "Cendorq separates visibility from readiness so the gap can point to clarity, proof, comparison, trust, or action friction.",
    limit: "The gap must be tied to visible evidence and confidence labels, not invented competitor claims.",
    action: "See Sample Report",
  },
  {
    title: "Repair Queue",
    eyebrow: "Priority order",
    state: "The next fixes ranked by decision value.",
    evidence: "Weak signals become scoped repair priorities with impact, effort, risk, and confidence instead of generic audit noise.",
    limit: "Repair work stays scoped to the chosen depth and does not promise unlimited implementation.",
    action: "View Plans",
  },
  {
    title: "Control Snapshot",
    eyebrow: "Ongoing watch",
    state: "What changed, drifted, or needs attention next.",
    evidence: "After review or repair, the control layer keeps the business focused on public signal drift and next command state.",
    limit: "Control is monitoring and guidance, not a guarantee that platforms will rank or cite the business.",
    action: "Open Customer Access",
  },
] as const;

const QUEUE = [
  ["01", "Category clarity", "Can a visitor quickly tell what the business does and who it helps?"],
  ["02", "Trust proof", "Is the proof visible before the customer compares alternatives?"],
  ["03", "Action path", "Is the next step obvious enough to call, book, request, or visit?"],
] as const;

export function ProductProofSystem() {
  return (
    <section className="px-5 py-10 sm:px-8 lg:py-16" aria-label="Cendorq product proof system">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-slate-900 bg-slate-950 text-white shadow-[0_34px_110px_rgba(15,23,42,0.22)]">
        <div className="grid gap-0 lg:grid-cols-[0.74fr_1.26fr]">
          <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">Product proof</p>
            <h2 className="mt-4 text-[clamp(2.4rem,8vw,5.2rem)] font-semibold leading-[0.92] tracking-[-0.08em] text-white">
              One report. Four decisions.
            </h2>
            <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-slate-300">
              Cendorq should feel like a decision system, not another SEO dashboard. The first signal becomes a report, a choice gap, a repair queue, and a control snapshot.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Link href="/free-check" className="inline-flex min-h-13 items-center justify-center rounded-full bg-cyan-200 px-7 py-3 text-sm font-black text-slate-950 shadow-[0_18px_50px_rgba(103,232,249,0.18)] transition hover:-translate-y-0.5 hover:bg-white">
                Start Free Scan
              </Link>
              <Link href="/sample-report" className="inline-flex min-h-13 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-7 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:border-cyan-200/45 hover:bg-white/[0.1]">
                See Sample Report
              </Link>
            </div>

            <div className="mt-8 rounded-[1.6rem] border border-cyan-200/20 bg-cyan-200/10 p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-100">Evidence boundary</p>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-200">
                Scores and queues are sampled, confidence-labeled signals. They help choose the next safest repair path without promising rankings, revenue, leads, or AI placement.
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-4 sm:p-5">
              <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-100">Sample Presence Report</p>
                  <h3 className="mt-2 text-3xl font-semibold tracking-[-0.065em] text-white">Decision view</h3>
                </div>
                <div className="rounded-[1.2rem] border border-cyan-200/20 bg-slate-950/70 px-4 py-3 text-right">
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-cyan-100">Presence Score</p>
                  <p className="text-3xl font-black tracking-[-0.06em] text-white">72</p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 xl:grid-cols-2">
                {STAGES.map((stage, index) => (
                  <article key={stage.title} className="rounded-[1.4rem] border border-white/10 bg-slate-950/58 p-5 transition hover:-translate-y-1 hover:border-cyan-200/35">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-100">0{index + 1}</p>
                      <p className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-cyan-100">{stage.eyebrow}</p>
                    </div>
                    <h4 className="mt-4 text-2xl font-semibold tracking-[-0.055em] text-white">{stage.title}</h4>
                    <p className="mt-3 text-sm font-bold leading-6 text-slate-100">{stage.state}</p>
                    <p className="mt-3 text-sm font-medium leading-7 text-slate-300">{stage.evidence}</p>
                    <p className="mt-4 rounded-[1rem] border border-white/10 bg-white/[0.05] p-3 text-xs font-semibold leading-5 text-slate-300">{stage.limit}</p>
                    <p className="mt-4 text-sm font-black text-cyan-100">{stage.action}</p>
                  </article>
                ))}
              </div>

              <div className="mt-5 rounded-[1.6rem] border border-white/10 bg-white/[0.045] p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-100">Repair queue preview</p>
                <div className="mt-4 grid gap-3">
                  {QUEUE.map(([number, title, copy]) => (
                    <div key={title} className="grid gap-3 rounded-[1.15rem] border border-white/10 bg-slate-950/70 p-4 sm:grid-cols-[3rem_0.5fr_1fr] sm:items-center">
                      <p className="text-xs font-black text-cyan-100">{number}</p>
                      <p className="text-sm font-black text-white">{title}</p>
                      <p className="text-sm font-medium leading-6 text-slate-300">{copy}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
