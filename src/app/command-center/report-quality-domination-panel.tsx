import { REPORT_QUALITY_DOMINATION_STANDARD, REPORT_QUALITY_NON_NEGOTIABLES } from "@/lib/report-quality-domination-standard";

export function ReportQualityDominationPanel() {
  return (
    <section className="mt-10 rounded-3xl border border-emerald-300/20 bg-emerald-950/15 p-6 shadow-2xl shadow-emerald-950/20">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-200">Report quality domination</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">Reports must look elite and stay true.</h2>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-emerald-50/75">
            Metadata-only quality standard for visual hierarchy, truth separation, evidence, confidence, plan-specific value, operator trace, limitations, and customer next command.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-center sm:grid-cols-3">
          <Metric label="Dimensions" value={REPORT_QUALITY_DOMINATION_STANDARD.length} />
          <Metric label="Non-negotiables" value={REPORT_QUALITY_NON_NEGOTIABLES.length} />
          <Metric label="Delivery gate" value={1} />
        </div>
      </div>

      <div className="mt-6 grid gap-3 lg:grid-cols-3">
        {REPORT_QUALITY_DOMINATION_STANDARD.map((rule) => (
          <article key={rule.dimension} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-100/70">{rule.dimension}</div>
            <p className="mt-3 text-sm font-semibold leading-6 text-white">{rule.tenOutOfTenDefinition}</p>
            <p className="mt-3 text-xs font-medium leading-6 text-emerald-50/65">Required: {rule.requiredInEveryReport.join(" • ")}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-emerald-300/20 bg-emerald-900/15 p-4">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-200">Non-negotiables</p>
        <ul className="mt-3 grid gap-2 text-xs font-medium leading-6 text-emerald-50/70 lg:grid-cols-2">
          {REPORT_QUALITY_NON_NEGOTIABLES.map((rule) => <li key={rule}>• {rule}</li>)}
        </ul>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-emerald-300/20 bg-white/[0.045] px-4 py-3">
      <div className="text-2xl font-semibold text-white">{value}</div>
      <div className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-100/70">{label}</div>
    </div>
  );
}
