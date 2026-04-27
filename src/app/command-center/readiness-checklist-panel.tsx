import { COMMAND_CENTER_READINESS_CHECKS } from "@/lib/command-center/readiness";
import type { CommandCenterReadinessSummary } from "@/lib/command-center/readiness-summary";

export function ReadinessChecklistPanel({ foundation }: { foundation: CommandCenterReadinessSummary }) {
  return (
    <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 md:p-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Readiness</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">Private configuration checklist</h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-slate-400">
          Metadata only. This view lists required server-side configuration names and protected data areas without reading values, secrets, or customer records.
        </p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {foundation.items.map((item) => (
          <article key={item.area} className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
            <div className="flex items-start justify-between gap-4">
              <p className="text-base font-semibold capitalize text-white">{item.area}</p>
              <span className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-100">
                {item.configured ? "ready" : "pending"}
              </span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <MiniMetric label="Required" value={item.requiredCount} />
              <MiniMetric label="Missing" value={item.missingCount} />
              <MiniMetric label="Scope" value={item.scopeCount} />
              <MiniMetric label="Checks" value={item.capabilityCount} />
            </div>
          </article>
        ))}
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {COMMAND_CENTER_READINESS_CHECKS.map((check) => (
          <article key={check.key} className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
            <div className="flex items-start justify-between gap-4">
              <p className="text-base font-semibold text-white">{check.label}</p>
              <span className="rounded-full border border-amber-200/20 bg-amber-200/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-amber-100">
                {check.status}
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-400">{check.description}</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{check.category}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}
