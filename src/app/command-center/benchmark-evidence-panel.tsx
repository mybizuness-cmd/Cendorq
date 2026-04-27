import { getBenchmarkEvidenceReadiness } from "@/lib/command-center/benchmark-evidence";

export function BenchmarkEvidencePanel() {
  const readiness = getBenchmarkEvidenceReadiness();

  return (
    <div className="mt-10 rounded-[2rem] border border-blue-200/10 bg-blue-200/[0.03] p-6 md:p-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-200">Benchmark Evidence</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">Source-backed benchmark readiness</h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-slate-400">
          Metadata only. Benchmark evidence must prove category fit, source quality, review ownership, staleness state, and retirement discipline before a reference can influence comparisons.
        </p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <MetricCard label="Status" value={readiness.status} />
        <MetricCard label="Target sources" value={readiness.targetSourcesPerBenchmark} />
        <MetricCard label="Evidence checks" value={readiness.evidenceRequirements.length} />
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <ListCard title="Required metadata" items={readiness.requiredMetadata} />
        <ListCard title="Approval checks" items={readiness.approvalChecks} />
        <ListCard title="Retirement checks" items={readiness.retirementChecks} />
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {readiness.evidenceRequirements.map((requirement) => (
          <article key={requirement.sourceType} className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-base font-semibold text-white">{requirement.sourceType}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{requirement.reviewQuestion}</p>
              </div>
              <span className="rounded-full border border-blue-200/20 bg-blue-200/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-blue-100">
                {requirement.requiredForApproval ? "required" : "supporting"}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
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
