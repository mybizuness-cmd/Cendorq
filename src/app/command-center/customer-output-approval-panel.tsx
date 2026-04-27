import type { CustomerOutputApprovalPolicy } from "@/lib/command-center/customer-output-approval";

export function CustomerOutputApprovalPanel({ policies }: { policies: readonly CustomerOutputApprovalPolicy[] }) {
  return (
    <div className="mt-10 rounded-[2rem] border border-rose-200/10 bg-rose-200/[0.03] p-6 md:p-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rose-200">Customer Output Approval</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">Preview, review, approve, then send</h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-slate-400">
          Metadata only. Every customer-facing output stays blocked until required reviews, previews, block-condition checks, and audit events prove it is truthful, plan-scoped, customer-safe, and approved.
        </p>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {policies.map((policy) => (
          <CustomerOutputPolicyCard key={policy.outputType} policy={policy} />
        ))}
      </div>
    </div>
  );
}

function CustomerOutputPolicyCard({ policy }: { policy: CustomerOutputApprovalPolicy }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-lg font-semibold text-white">{policy.label}</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">Output type: {policy.outputType}</p>
        </div>
        <span className="rounded-full border border-rose-200/20 bg-rose-200/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-rose-100">
          {policy.defaultState}
        </span>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <ListCard title="Required reviews" items={policy.requiredReviews} />
        <ListCard title="Preview requirements" items={policy.previewRequirements} />
        <ListCard title="Block conditions" items={policy.blockConditions} />
        <ListCard title="Audit events" items={policy.auditEvents} />
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
