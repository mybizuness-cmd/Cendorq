import { getAiManagerVersionRegistry, type AiManagerVersionRegistryItem } from "@/lib/command-center/ai-manager-version-registry";

export function AiManagerVersionRegistryPanel() {
  const registry = getAiManagerVersionRegistry();

  return (
    <div className="mt-10 rounded-[2rem] border border-indigo-200/10 bg-indigo-200/[0.03] p-6 md:p-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-200">AI Manager Version Registry</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">Model, prompt, and policy control</h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-slate-400">
          Metadata only. AI manager versions must be evaluated, regression-tested, promoted, and retired through controlled policy gates before they can influence customer-safe reports, recommendations, or monthly control outputs.
        </p>
      </div>
      <div className="mt-6 grid gap-4">
        {registry.map((item) => (
          <RegistryItemCard key={item.key} item={item} />
        ))}
      </div>
    </div>
  );
}

function RegistryItemCard({ item }: { item: AiManagerVersionRegistryItem }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-lg font-semibold text-white">{item.label}</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">Registry key: {item.key}</p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.14em]">
          <span className="rounded-full border border-indigo-200/20 bg-indigo-200/10 px-2.5 py-1 text-indigo-100">
            {item.status}
          </span>
          <span className="rounded-full border border-white/10 px-2.5 py-1 text-slate-400">
            {item.modelProviderLabel}
          </span>
          <span className="rounded-full border border-white/10 px-2.5 py-1 text-slate-400">
            {item.modelFamilyLabel}
          </span>
        </div>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <PolicyCard label="Prompt policy" value={item.promptPolicyVersion} />
        <PolicyCard label="Evaluation policy" value={item.evaluationPolicyVersion} />
        <PolicyCard label="Scoring policy" value={item.scoringPolicyVersion} />
        <PolicyCard label="Report policy" value={item.reportPolicyVersion} />
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <ListCard title="Regression suites" items={item.requiredRegressionSuites} />
        <ListCard title="Promotion gates" items={item.promotionGates} />
        <ListCard title="Retirement triggers" items={item.retirementTriggers} />
      </div>
    </article>
  );
}

function PolicyCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

function ListCard({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
      <p className="text-sm font-semibold text-white">{title}</p>
      <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-400">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}
