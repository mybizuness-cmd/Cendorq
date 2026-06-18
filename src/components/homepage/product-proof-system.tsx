import Link from "next/link";

const STAGES = [
  {
    title: "Presence Report",
    eyebrow: "First signal",
    state: "A directional score with five checks.",
    evidence: "Findability, Understanding, Trust, Choice, and Action are shown together so the first weak signal is visible before deeper work starts.",
    limit: "A first signal is not a ranking, revenue, lead, or AI-placement guarantee.",
    action: "Start Free Scan",
  },
  {
    title: "Decision Gap",
    eyebrow: "Decision gap",
    state: "Why another option may be easier to choose.",
    evidence: "Cendorq separates visibility from readiness so the gap can point to clarity, proof, comparison, trust, or action friction.",
    limit: "The gap must be tied to visible evidence and confidence labels, not invented competitor claims.",
    action: "Read FAQ",
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
    action: "Open Access",
  },
] as const;

const QUEUE = [
  ["01", "Category clarity", "Can a visitor quickly tell what the business does and who it helps?"],
  ["02", "Trust proof", "Is the proof visible before the customer compares alternatives?"],
  ["03", "Action path", "Is the next step obvious enough to call, book, request, or visit?"],
] as const;

const AI_SIGNAL_ROWS = [
  ["Answer surface", "Business facts show up clearly enough to be understood.", "Signal only"],
  ["Prompt view", "Common customer questions reveal clarity, proof, and decision gaps.", "Report row"],
  ["Mention context", "Public pages are checked for trust and category language.", "Evidence"],
  ["Daily watch", "Control keeps drift visible after review or repair.", "Monitor"],
] as const;

const MONITORING_RHYTHM = [
  ["Score", "A simple starting read."],
  ["Rows", "Visible signal evidence."],
  ["Queue", "Prioritized repair order."],
  ["Control", "Ongoing drift watch."],
] as const;

const PUBLIC_PROOF_BOUNDARY_CHECKS = [
  "First signals guide the next decision; they are not full paid reviews.",
  "Scores and queues show report structure, not guaranteed customer outcomes.",
  "Plan depth stays separated: signal, cause, scoped repair, and ongoing watch.",
  "Cendorq does not guarantee rankings, leads, revenue, or AI placement.",
] as const;

export function ProductProofSystem() {
  return (
    <section className="px-5 py-10 sm:px-8 lg:py-16" aria-label="Cendorq product proof system">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/85 bg-white/84 text-slate-950 shadow-[0_28px_90px_rgba(14,165,233,0.10)] backdrop-blur">
        <div className="grid gap-0 lg:grid-cols-[0.74fr_1.26fr]">
          <div className="border-b border-cyan-100 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
            <p className="inline-flex rounded-2xl border border-cyan-100 bg-cyan-50/70 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-cyan-700">Product proof</p>
            <h2 className="mt-4 text-[clamp(2.4rem,8vw,5.2rem)] font-semibold leading-[0.92] tracking-[-0.08em] text-slate-950">
              One report. <span className="block text-cyan-600">Four decisions.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-slate-600">
              Cendorq should feel like a decision system, not another SEO dashboard. The first signal becomes a report, a decision gap, a repair queue, and a control snapshot.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Link href="/free-check" className="inline-flex min-h-13 items-center justify-center rounded-2xl border border-cyan-200 bg-white px-7 py-3 text-sm font-black text-slate-950 shadow-[0_18px_48px_rgba(14,165,233,0.14)] transition hover:-translate-y-0.5 hover:bg-cyan-50">
                Start Free Scan
              </Link>
              <Link href="/faq" className="inline-flex min-h-13 items-center justify-center rounded-2xl border border-white/90 bg-white/72 px-7 py-3 text-sm font-bold text-slate-800 shadow-[0_12px_36px_rgba(15,23,42,0.06)] backdrop-blur transition hover:-translate-y-0.5 hover:bg-white">
                Read FAQ
              </Link>
            </div>

            <div className="mt-8 rounded-[1.6rem] border border-cyan-100 bg-cyan-50/45 p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-700">Evidence boundary</p>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">
                Scores and queues are confidence-labeled signals. They help choose the next safest repair path without promising rankings, leads, revenue, or AI placement.
              </p>
              <div className="mt-4 grid gap-2">
                {PUBLIC_PROOF_BOUNDARY_CHECKS.map((check) => (
                  <p key={check} className="rounded-[1rem] border border-white/80 bg-white/76 p-3 text-xs font-semibold leading-5 text-slate-700">{check}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            <div className="rounded-[2rem] border border-cyan-100 bg-[linear-gradient(145deg,#ffffff,#f6fcff_55%,#fff7fb)] p-4 sm:p-5">
              <div className="flex flex-col gap-4 border-b border-cyan-100 pb-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-700">Presence Report</p>
                  <h3 className="mt-2 text-3xl font-semibold tracking-[-0.065em] text-slate-950">Decision view</h3>
                </div>
                <div className="rounded-[1.2rem] border border-cyan-100 bg-cyan-50 px-4 py-3 text-right">
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-cyan-700">Presence Score</p>
                  <p className="text-3xl font-black tracking-[-0.06em] text-slate-950">72</p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 xl:grid-cols-2">
                {STAGES.map((stage, index) => (
                  <article key={stage.title} className="rounded-[1.4rem] border border-cyan-100 bg-white/86 p-5 transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-[0_18px_48px_rgba(14,165,233,0.10)]">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-700">0{index + 1}</p>
                      <p className="rounded-xl border border-cyan-100 bg-cyan-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-cyan-700">{stage.eyebrow}</p>
                    </div>
                    <h4 className="mt-4 text-2xl font-semibold tracking-[-0.055em] text-slate-950">{stage.title}</h4>
                    <p className="mt-3 text-sm font-black leading-6 text-slate-800">{stage.state}</p>
                    <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{stage.evidence}</p>
                    <p className="mt-4 rounded-[1rem] border border-cyan-100 bg-cyan-50/45 p-3 text-xs font-semibold leading-5 text-slate-700">{stage.limit}</p>
                    <p className="mt-4 text-sm font-black text-cyan-700">{stage.action}</p>
                  </article>
                ))}
              </div>

              <div className="mt-5 rounded-[1.6rem] border border-cyan-100 bg-white/86 p-5 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-700">AI signal proof</p>
                    <h4 className="mt-2 text-2xl font-semibold tracking-[-0.055em] text-slate-950">Engine-style rows without placement promises.</h4>
                  </div>
                  <p className="rounded-xl border border-cyan-100 bg-cyan-50 px-3 py-1 text-xs font-black text-cyan-800">Report evidence</p>
                </div>
                <div className="mt-4 grid gap-2">
                  {AI_SIGNAL_ROWS.map(([label, copy, status]) => (
                    <div key={label} className="grid gap-3 rounded-[1.05rem] border border-cyan-100 bg-cyan-50/40 p-3 sm:grid-cols-[0.42fr_1fr_auto] sm:items-center">
                      <p className="text-sm font-black text-slate-950">{label}</p>
                      <p className="text-xs font-semibold leading-5 text-slate-600">{copy}</p>
                      <p className="rounded-xl border border-white/80 bg-white/80 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-cyan-700">{status}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-4">
                {MONITORING_RHYTHM.map(([label, copy]) => (
                  <article key={label} className="rounded-[1.1rem] border border-cyan-100 bg-white/76 p-4">
                    <p className="text-sm font-black text-slate-950">{label}</p>
                    <p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p>
                  </article>
                ))}
              </div>

              <div className="mt-5 rounded-[1.6rem] border border-cyan-100 bg-cyan-50/45 p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-700">Repair queue</p>
                <div className="mt-4 grid gap-3">
                  {QUEUE.map(([number, title, copy]) => (
                    <div key={title} className="grid gap-3 rounded-[1.15rem] border border-white/80 bg-white/76 p-4 sm:grid-cols-[3rem_0.5fr_1fr] sm:items-center">
                      <p className="text-xs font-black text-cyan-700">{number}</p>
                      <p className="text-sm font-black text-slate-950">{title}</p>
                      <p className="text-sm font-medium leading-6 text-slate-600">{copy}</p>
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
