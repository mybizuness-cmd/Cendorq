import type { OptimizationMethod } from "@/lib/command-center/optimization-method-library";

export function OptimizationLibraryPanel({ methods }: { methods: readonly OptimizationMethod[] }) {
  return (
    <div className="mt-10 rounded-[2rem] border border-fuchsia-200/10 bg-fuchsia-200/[0.03] p-6 md:p-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-fuchsia-200">Optimization Library</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">Evidence-backed method controls</h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-slate-400">
          Metadata only. Each approved method shows plan scope, problem signals, required evidence, proof checks, expected outcomes, and customer-safe output rules so recommendations stay practical, reviewed, and plan-scoped.
        </p>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {methods.map((method) => (
          <OptimizationMethodCard key={method.key} method={method} />
        ))}
      </div>
    </div>
  );
}

function OptimizationMethodCard({ method }: { method: OptimizationMethod }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-lg font-semibold text-white">{method.label}</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">Approved method: {method.key}</p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.14em]">
          {method.planScopes.map((scope) => (
            <span key={scope} className="rounded-full border border-fuchsia-200/20 bg-fuchsia-200/10 px-2.5 py-1 text-fuchsia-100">
              {scope}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <ListCard title="Problem signals" items={method.problemSignals} />
        <ListCard title="Required evidence" items={method.requiredEvidence} />
        <ListCard title="Proof checks" items={method.proofChecks} />
        <ListCard title="Expected outcomes" items={method.expectedOutcomes} />
      </div>
      <div className="mt-4">
        <ListCard title="Customer-safe rules" items={method.customerSafeOutputRules} />
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
