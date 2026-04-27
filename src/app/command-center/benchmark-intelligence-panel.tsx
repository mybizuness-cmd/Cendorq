import { getBenchmarkIntelligenceControls, type BenchmarkIntelligenceControl } from "@/lib/command-center/benchmark-intelligence";

export function BenchmarkIntelligencePanel() {
  const controls = getBenchmarkIntelligenceControls();

  return (
    <div className="mt-10 rounded-[2rem] border border-sky-200/10 bg-sky-200/[0.03] p-6 md:p-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-200">Benchmark Intelligence</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">Curated comparison controls</h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-slate-400">
          Metadata only. Benchmarks are reviewed comparison references, not proof by themselves. Each category must stay source-backed, category-fit, staleness-tracked, and separated from live customer records.
        </p>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {controls.map((control) => (
          <BenchmarkControlCard key={control.category} control={control} />
        ))}
      </div>
    </div>
  );
}

function BenchmarkControlCard({ control }: { control: BenchmarkIntelligenceControl }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-lg font-semibold text-white">{control.label}</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">Category: {control.category}</p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.14em]">
          <span className="rounded-full border border-sky-200/20 bg-sky-200/10 px-2.5 py-1 text-sky-100">
            {control.status}
          </span>
          <span className="rounded-full border border-white/10 px-2.5 py-1 text-slate-400">
            target {control.targetReferenceCount}
          </span>
        </div>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <ListCard title="Selection standards" items={control.selectionStandards} />
        <ListCard title="Evidence types" items={control.requiredEvidenceTypes} />
        <ListCard title="Comparison areas" items={control.comparisonAreas} />
        <ListCard title="AI review checks" items={control.aiReviewChecks} />
      </div>
      <div className="mt-4">
        <ListCard title="Self-evolution signals" items={control.selfEvolutionSignals} />
      </div>
    </article>
  );
}

function ListCard({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{title}</p>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-400">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}
