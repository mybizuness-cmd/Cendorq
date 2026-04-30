import { projectProductionLaunchChecklist } from "@/lib/production-launch-checklist-runtime";

const productionChecklist = projectProductionLaunchChecklist({
  verifiedMain: true,
  validateRoutesWired: true,
  validateRoutesPassing: true,
  vercelGreen: true,
  productionSmokeConfigured: false,
  productionSmokePassed: false,
  ownerPaymentConfigReady: false,
  authProviderConfigured: false,
  serverOnlySecretsConfigured: false,
  rollbackPlanReady: false,
  auditPlanReady: false,
  publicEntryReady: true,
  freeScanReady: true,
  customerHandoffsReady: true,
  reportsReady: true,
  billingReady: true,
  supportAndCommandCenterReady: true,
  maintenanceReady: true,
  criticalLockActive: false,
});

export function ProductionLaunchChecklistPanel() {
  return (
    <section className="mt-10 rounded-[2rem] border border-amber-300/15 bg-amber-300/[0.035] p-6 shadow-2xl shadow-amber-950/20 md:p-8" aria-label="Production launch checklist panel">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-200">Private launch checklist</p>
          <h2 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Operator-safe production checklist with launch blockers and next actions.
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-slate-400">
          This private checklist converts the launch readiness projection into operator actions. It is not customer-facing, does not declare public launch, and does not expose raw evidence, internal notes, operator identity, protected provider details, or private customer data.
        </p>
      </div>

      <div className="mt-7 grid gap-4 lg:grid-cols-3">
        <MetricCard label="Decision" value={productionChecklist.decision} />
        <MetricCard label="Ready items" value={String(productionChecklist.readyCount)} />
        <MetricCard label="Blocked or evidence needed" value={String(productionChecklist.blockedCount)} />
      </div>

      <article className="mt-7 rounded-3xl border border-white/10 bg-slate-950/60 p-5">
        <p className="text-sm font-semibold text-white">Checklist</p>
        <p className="mt-3 text-sm leading-6 text-slate-400">Every item remains private and operator-scoped. Complete items do not create public launch claims by themselves.</p>
        <div className="mt-5 grid gap-3 lg:grid-cols-2">
          {productionChecklist.checklist.map((item) => (
            <div key={item.key} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold text-slate-100">{item.label}</p>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">{item.status}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-400">{item.safeOwnerAction}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-amber-200">{item.releaseImpact}</p>
            </div>
          ))}
        </div>
      </article>

      <div className="mt-7 grid gap-4 lg:grid-cols-2">
        <article className="rounded-3xl border border-red-200/10 bg-red-200/[0.03] p-5">
          <p className="text-sm font-semibold text-white">Blocked launch reasons</p>
          <div className="mt-4 grid gap-3">
            {productionChecklist.blockedLaunchReasons.map((reason) => (
              <div key={reason} className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm leading-6 text-slate-300">{reason}</div>
            ))}
          </div>
        </article>
        <article className="rounded-3xl border border-emerald-200/10 bg-emerald-200/[0.03] p-5">
          <p className="text-sm font-semibold text-white">Next operator actions</p>
          <div className="mt-4 grid gap-3">
            {productionChecklist.nextOperatorActions.map((action) => (
              <div key={action} className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm leading-6 text-slate-300">{action}</div>
            ))}
          </div>
        </article>
      </div>
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
