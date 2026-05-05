import { projectProductionLaunchFinalBlockers } from "@/lib/production-launch-final-blocker-runtime";

const finalBlockers = projectProductionLaunchFinalBlockers({
  ownerConfigurationComplete: false,
  productionSmokeComplete: false,
  rollbackEvidenceComplete: false,
  auditEvidenceComplete: false,
  hardLocksClear: false,
});

export function ProductionLaunchFinalBlockerPanel() {
  return (
    <section className="mt-10 rounded-[2rem] border border-red-300/15 bg-red-300/[0.035] p-6 shadow-2xl shadow-red-950/20 md:p-8" aria-label="Production launch final blocker panel">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-red-200">Final blocker control</p>
          <h2 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Operator-only launch claim blockers before any public, paid, or report launch claim.
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-slate-400">
          This panel does not launch the platform. It shows whether owner configuration, production smoke, rollback evidence, audit evidence, and hard-lock clearance have enough proof for operator review. It does not expose protected provider details, private customer data, internal risk models, or private audit payloads.
        </p>
      </div>

      <div className="mt-7 grid gap-4 lg:grid-cols-4">
        <MetricCard label="Release state" value={finalBlockers.releaseState} />
        <MetricCard label="Public claim" value={finalBlockers.publicClaimAllowed ? "allowed" : "blocked"} />
        <MetricCard label="Paid claim" value={finalBlockers.paidClaimAllowed ? "allowed" : "blocked"} />
        <MetricCard label="Report claim" value={finalBlockers.reportClaimAllowed ? "allowed" : "blocked"} />
      </div>

      <article className="mt-7 rounded-3xl border border-white/10 bg-slate-950/60 p-5">
        <p className="text-sm font-semibold text-white">Final blockers</p>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          Public launch claims stay blocked until every blocker has complete evidence. Paid and report claims also require their matching evidence before they can be reviewed.
        </p>
        <div className="mt-5 grid gap-3 lg:grid-cols-2">
          {finalBlockers.blockers.map((blocker) => (
            <div key={blocker.blockerKey} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold text-slate-100">{blocker.label}</p>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">{blocker.evidenceStatus}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-400">Blocks: {blocker.blocks}</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">{blocker.safeNextAction}</p>
              <div className="mt-4 grid gap-2">
                {blocker.requiredEvidence.map((evidence) => (
                  <div key={evidence} className="rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-xs leading-5 text-slate-400">
                    {evidence}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="mt-7 rounded-3xl border border-amber-200/10 bg-amber-200/[0.03] p-5">
        <p className="text-sm font-semibold text-white">Safe next actions</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {finalBlockers.safeNextActions.map((action) => (
            <div key={action} className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm leading-6 text-slate-300">
              {action}
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-3 text-2xl font-semibold tracking-tight text-white">{value}</p>
    </article>
  );
}
