import { projectProductionSmokeTarget } from "@/lib/production-smoke-target-runtime";

const smokeTarget = projectProductionSmokeTarget([
  {
    routeGroupKey: "public-conversion-routes",
    route: "/",
    observedPosture: "reachable-public-safe",
    safeSummary: "Public homepage route posture matches expected smoke posture without creating public launch approval.",
    evidenceId: "smoke-public-home",
    requestIdHash: "smoke-public-home",
  },
  {
    routeGroupKey: "public-conversion-routes",
    route: "/free-check",
    observedPosture: "reachable-public-safe",
    safeSummary: "Free Scan route posture matches expected smoke posture without treating pending scan states as final.",
    evidenceId: "smoke-free-check",
    requestIdHash: "smoke-free-check",
  },
  {
    routeGroupKey: "protected-api-routes",
    route: "/api/customer/support/status",
    observedPosture: "generic-safe-denial-without-session",
    safeSummary: "Protected support status API returns expected safe denial posture when no verified customer session is present.",
    evidenceId: "smoke-support-status-api",
    requestIdHash: "smoke-support-status-api",
  },
  {
    routeGroupKey: "command-center-routes",
    route: "/command-center",
    observedPosture: "closed-by-default",
    safeSummary: "Command center route remains closed by default without operator posture.",
    evidenceId: "smoke-command-center",
    requestIdHash: "smoke-command-center",
  },
  {
    routeGroupKey: "launch-evidence-routes",
    route: "/api/command-center/launch-readiness/evidence",
    observedPosture: "operator-only-safe-projection",
    safeSummary: "Launch evidence route projects operator-only safe evidence posture and never creates launch approval alone.",
    evidenceId: "smoke-launch-evidence",
    requestIdHash: "smoke-launch-evidence",
  },
]);

export function ProductionSmokeTargetPanel() {
  return (
    <section className="mt-10 rounded-[2rem] border border-indigo-300/15 bg-indigo-300/[0.035] p-6 shadow-2xl shadow-indigo-950/20 md:p-8" aria-label="Production smoke target panel">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-200">Production smoke target</p>
          <h2 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Operator-only smoke posture for public, protected, command-center, and evidence routes.
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-slate-400">
          This private panel summarizes safe smoke route projections. Passing route posture does not equal public launch approval, and records avoid raw responses, private customer data, internal notes, protected provider details, or private audit payloads.
        </p>
      </div>

      <div className="mt-7 grid gap-4 lg:grid-cols-4">
        <MetricCard label="Target" value={smokeTarget.targetName} />
        <MetricCard label="Pass" value={String(smokeTarget.passCount)} />
        <MetricCard label="Blocked" value={String(smokeTarget.blockedCount)} />
        <MetricCard label="Public launch" value={smokeTarget.publicLaunchAllowed ? "allowed" : "blocked"} />
      </div>

      <article className="mt-7 rounded-3xl border border-white/10 bg-slate-950/60 p-5">
        <p className="text-sm font-semibold text-white">Route smoke records</p>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          Expected safe denials are treated as valid when they match protected-route posture. Smoke records remain safe projections and do not store raw route output. This panel does not store raw route output.
        </p>
        <div className="mt-5 grid gap-3 lg:grid-cols-2">
          {smokeTarget.records.map((record) => (
            <div key={record.smokeRunId} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold text-slate-100">{record.route}</p>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">{record.result}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">{record.safeSummary}</p>
              <div className="mt-4 grid gap-2 text-xs leading-5 text-slate-400">
                <p>Group: {record.routeGroupKey}</p>
                <p>Expected: {record.expectedPosture}</p>
                <p>Observed: {record.observedPosture}</p>
                <p>Evidence: {record.evidenceId}</p>
              </div>
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
