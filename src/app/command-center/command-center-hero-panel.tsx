import type { CommandCenterReadinessSummary } from "@/lib/command-center/readiness-summary";

export function CommandCenterHeroPanel({ foundation }: { foundation: CommandCenterReadinessSummary }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-cyan-950/20 md:p-12">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">Cendorq Command Center</p>
      <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">Private operating system shell.</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
        The source-of-truth foundations are ready. Dashboard modules remain gated until production auth and durable database configuration are active.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <Metric label="Areas" value={foundation.totalAreas} />
        <Metric label="Configured" value={foundation.configuredAreas} />
        <Metric label="Missing" value={foundation.missingAreas} />
        <Metric label="Ready" value={foundation.ready ? "Yes" : "No"} />
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}
