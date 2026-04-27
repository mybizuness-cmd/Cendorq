import type { AiManagerCommandHistoryPolicy } from "@/lib/command-center/ai-manager-command-history";

export function AiHistoryPanel({ history }: { history: AiManagerCommandHistoryPolicy }) {
  return (
    <div className="mt-10 rounded-[2rem] border border-emerald-200/10 bg-emerald-200/[0.03] p-6 md:p-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-200">AI History</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">Command audit trail</h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-slate-400">
          Every future AI command should record request context, model and policy labels, review details, blocked reasons, and final decisions before anything can become customer-facing.
        </p>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-4">
        <HistoryCard title="Required fields" items={history.requiredFields.slice(0, 6)} />
        <HistoryCard title="Review fields" items={history.reviewFields.slice(0, 6)} />
        <HistoryCard title="Blocked reasons" items={history.blockedReasonTypes.slice(0, 6)} />
        <HistoryCard title="Audit events" items={history.auditEvents.slice(0, 6)} />
      </div>
      <div className="mt-5 rounded-3xl border border-white/10 bg-slate-950/60 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Retention states</p>
        <p className="mt-2 text-sm leading-6 text-slate-300">{history.retentionStates.join(" · ")}</p>
      </div>
    </div>
  );
}

function HistoryCard({ title, items }: { title: string; items: readonly string[] }) {
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
