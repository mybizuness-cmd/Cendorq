import { SAMPLE_PRESENCE_REPORT_EVIDENCE_BOUNDARIES } from "@/lib/presence-report-evidence-boundary";

export function PresenceReportEvidenceBoundaryPanel() {
  return (
    <section className="rounded-[2rem] border border-white/80 bg-white/82 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.055)] backdrop-blur sm:rounded-[2.5rem] sm:p-8" aria-label="Presence Report evidence boundaries">
      <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Evidence boundaries</p>
          <h2 className="mt-3 text-[clamp(2rem,6vw,3.5rem)] font-semibold leading-[0.98] tracking-[-0.065em] text-slate-950">Useful signal without overclaiming.</h2>
        </div>
        <p className="text-base font-medium leading-8 text-slate-600">Every report should keep observed facts, inferred weakness, and review-needed comparisons separate before recommending deeper work.</p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {SAMPLE_PRESENCE_REPORT_EVIDENCE_BOUNDARIES.map((item) => (
          <article key={item.label} className="rounded-[1.35rem] border border-cyan-100 bg-cyan-50/45 p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xl font-semibold tracking-[-0.04em] text-slate-950">{item.label}</h3>
              <span className="rounded-full border border-cyan-200 bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-cyan-700">{item.confidence}</span>
            </div>
            <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{item.publicSafeUse}</p>
            <p className="mt-3 rounded-[1rem] border border-cyan-100 bg-white p-3 text-xs font-semibold leading-5 text-slate-700">{item.boundary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
