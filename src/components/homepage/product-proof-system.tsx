import Link from "next/link";

const STAGES = [
  {
    title: "Presence Report",
    eyebrow: "First signal",
    copy: "A clear view of findability, understanding, trust, choice, and action before deeper repair work starts.",
    proof: "Score + weak signal + next move",
  },
  {
    title: "Choice Gap",
    eyebrow: "Decision gap",
    copy: "Shows why another business may be easier for a customer or AI system to understand, trust, compare, or choose.",
    proof: "Observed friction + confidence label",
  },
  {
    title: "Repair Queue",
    eyebrow: "Priority order",
    copy: "Turns the report into ranked repair priorities instead of a long audit with no obvious next action.",
    proof: "Impact + effort + risk boundary",
  },
  {
    title: "Control Snapshot",
    eyebrow: "Ongoing watch",
    copy: "Keeps attention on what changed, what drifted, and what should be watched after the first repair path.",
    proof: "State + drift + next command",
  },
] as const;

export function ProductProofSystem() {
  return (
    <section className="px-5 py-10 sm:px-8 lg:py-16" aria-label="Cendorq product proof system">
      <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-slate-900 bg-slate-950 p-6 text-white shadow-[0_34px_110px_rgba(15,23,42,0.22)] sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.74fr_1.26fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">Product proof</p>
            <h2 className="mt-4 text-[clamp(2.4rem,8vw,5.2rem)] font-semibold leading-[0.92] tracking-[-0.08em] text-white">
              One report. Four decisions.
            </h2>
            <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-slate-300">
              Cendorq should not feel like another SEO dashboard. It turns the first public signal into a report, a choice gap, a repair queue, and a control snapshot.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/free-check" className="inline-flex min-h-13 items-center justify-center rounded-full bg-cyan-200 px-7 py-3 text-sm font-black text-slate-950 shadow-[0_18px_50px_rgba(103,232,249,0.18)] transition hover:-translate-y-0.5 hover:bg-white">
                Start Free Scan
              </Link>
              <Link href="/sample-report" className="inline-flex min-h-13 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-7 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:border-cyan-200/45 hover:bg-white/[0.1]">
                See Sample Report
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {STAGES.map((stage, index) => (
              <article key={stage.title} className="rounded-[1.4rem] border border-white/10 bg-white/[0.06] p-5 transition hover:-translate-y-1 hover:border-cyan-200/35">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-100">0{index + 1}</p>
                  <p className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-cyan-100">{stage.eyebrow}</p>
                </div>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.055em] text-white">{stage.title}</h3>
                <p className="mt-3 text-sm font-medium leading-7 text-slate-300">{stage.copy}</p>
                <p className="mt-4 rounded-[1rem] border border-white/10 bg-slate-950/55 p-3 text-xs font-bold leading-5 text-cyan-100">{stage.proof}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
