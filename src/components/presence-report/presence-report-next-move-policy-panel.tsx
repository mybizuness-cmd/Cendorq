import { PRESENCE_REPORT_NEXT_MOVE_POLICIES } from "@/lib/presence-report-next-move-policy";

export function PresenceReportNextMovePolicyPanel() {
  return (
    <section className="rounded-[2rem] border border-white/80 bg-white/84 p-6 text-slate-950 shadow-[0_18px_60px_rgba(14,165,233,0.065)] backdrop-blur sm:rounded-[2.5rem] sm:p-8" aria-label="Presence Report next move policy">
      <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
        <h2 className="text-[clamp(2rem,6vw,3.5rem)] font-semibold leading-[0.98] tracking-[-0.065em] text-slate-950">Do not sell the wrong layer too early.</h2>
        <p className="text-base font-medium leading-8 text-slate-600">The report should recommend the smallest safe depth: scan, diagnose, repair, or monitor.</p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {PRESENCE_REPORT_NEXT_MOVE_POLICIES.map((policy) => (
          <article key={policy.nextMove} className="rounded-[1.35rem] border border-cyan-100 bg-cyan-50/38 p-5 shadow-sm">
            <h3 className="text-xl font-semibold tracking-[-0.04em] text-slate-950">{policy.nextMove}</h3>
            <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{policy.when}</p>
            <p className="mt-3 rounded-[1rem] border border-cyan-100 bg-white p-3 text-xs font-semibold leading-5 text-slate-700">{policy.boundary}</p>
          </article>
        ))}
      </div>
      <span className="sr-only">Next move policy. smallest safe depth. scan, diagnose, repair, monitor.</span>
    </section>
  );
}
