import { PRESENCE_REPORT_NEXT_MOVE_POLICIES } from "@/lib/presence-report-next-move-policy";

export function PresenceReportNextMovePolicyPanel() {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_18px_60px_rgba(15,23,42,0.18)] sm:rounded-[2.5rem] sm:p-8" aria-label="Presence Report next move policy">
      <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">Next move policy</p>
          <h2 className="mt-3 text-[clamp(2rem,6vw,3.5rem)] font-semibold leading-[0.98] tracking-[-0.065em] text-white">Do not sell the wrong layer too early.</h2>
        </div>
        <p className="text-base font-medium leading-8 text-slate-300">The report should recommend the smallest safe depth: scan, diagnose, repair, or monitor.</p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {PRESENCE_REPORT_NEXT_MOVE_POLICIES.map((policy) => (
          <article key={policy.nextMove} className="rounded-[1.35rem] border border-white/10 bg-white/7 p-5 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-200">{policy.nextMove}</p>
            <p className="mt-3 text-sm font-medium leading-7 text-slate-300">{policy.when}</p>
            <p className="mt-3 rounded-[1rem] border border-cyan-200/20 bg-cyan-200/10 p-3 text-xs font-semibold leading-5 text-cyan-50">{policy.boundary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
