import { getReportTruthMethodology } from "@/lib/command-center/report-truth-methodology";

export function ReportTruthMethodologyPanel() {
  const methodology = getReportTruthMethodology();

  return (
    <div className="mt-10 rounded-[2rem] border border-amber-200/10 bg-amber-200/[0.03] p-6 md:p-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-200">Report Truth</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">{methodology.methodLabel}</h2>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.14em]">
          <span className="rounded-full border border-amber-200/20 bg-amber-200/10 px-2.5 py-1 text-amber-100">
            {methodology.status}
          </span>
          <span className="rounded-full border border-white/10 px-2.5 py-1 text-slate-400">
            evidence required
          </span>
        </div>
      </div>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-400">
        Metadata only. This truth method keeps reports practical, source-backed, uncertainty-aware, approval-gated, and useful without allowing unsupported claims, fake certainty, or customer-facing AI output without review.
      </p>
      <div className="mt-6 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <ListCard title="Score principles" items={methodology.scorePrinciples} />
        <ListCard title="Required evidence links" items={methodology.requiredEvidenceLinks} />
        <ListCard title="Optimization proof checks" items={methodology.optimizationProofChecks} />
        <ListCard title="Customer output gates" items={methodology.customerOutputGates} />
        <ListCard title="Monthly control checks" items={methodology.monthlyControlChecks} />
      </div>
    </div>
  );
}

function ListCard({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
      <p className="text-sm font-semibold text-white">{title}</p>
      <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-400">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}
