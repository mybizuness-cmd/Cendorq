import type { CommandCenterPlanControl } from "@/lib/command-center/plan-control";

export function PlanControlPanel({ plans }: { plans: readonly CommandCenterPlanControl[] }) {
  return (
    <div className="mt-10 rounded-[2rem] border border-violet-200/10 bg-violet-200/[0.035] p-6 md:p-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-200">Plan Control</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">Private plan operating controls</h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-slate-400">
          Metadata only. This panel shows how Free Scan, Deep Review, Build Fix, and Ongoing Control will be edited, previewed, tested, approved, and supported by the AI manager without exposing customer records or private evidence.
        </p>
      </div>
      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        {plans.map((plan) => (
          <PlanControlCard key={plan.key} plan={plan} />
        ))}
      </div>
    </div>
  );
}

function PlanControlCard({ plan }: { plan: CommandCenterPlanControl }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-lg font-semibold text-white">{plan.label}</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">Buyer path: {plan.buyerPathLabel}</p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.14em]">
          <span className="rounded-full border border-violet-200/20 bg-violet-200/10 px-2.5 py-1 text-violet-100">{plan.controlMode}</span>
          <span className="rounded-full border border-white/10 px-2.5 py-1 text-slate-400">{plan.commandCenterPath}</span>
        </div>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <ListCard title="Editable areas" items={plan.editableAreas} />
        <ListCard title="Preview outputs" items={plan.previewOutputs} />
        <ListCard title="Test run types" items={plan.testRunTypes} />
        <ListCard title="Approval gates" items={plan.approvalGates} />
        <ListCard title="Proof standards" items={plan.proofStandards} />
        <ListCard title="AI manager capabilities" items={plan.aiManagerCapabilities} />
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
