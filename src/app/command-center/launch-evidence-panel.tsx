import { projectLaunchEvidenceBatch, summarizeLaunchEvidenceReadiness } from "@/lib/launch-evidence-persistence-runtime";

const evidenceInputs = [
  {
    evidenceType: "owner-configuration-evidence" as const,
    status: "pending" as const,
    safeSummary: "Owner auth, payment mapping, protected config, launch contact, and support identity evidence still requires review.",
    blockerKey: "owner-configuration",
    checklistKey: "auth-provider",
    recordedByRole: "operator",
    sourceRoute: "/api/command-center/launch-readiness/evidence",
    requestIdHash: "owner-configuration-evidence",
  },
  {
    evidenceType: "production-smoke-evidence" as const,
    status: "pending" as const,
    safeSummary: "Production smoke target and protected denial posture must be recorded before public launch review.",
    blockerKey: "production-smoke-target",
    checklistKey: "production-smoke",
    recordedByRole: "operator",
    sourceRoute: "/api/command-center/launch-readiness/evidence",
    requestIdHash: "production-smoke-evidence",
  },
  {
    evidenceType: "rollback-evidence" as const,
    status: "pending" as const,
    safeSummary: "Rollback evidence for auth, billing, reports, support, public conversion, and maintenance must be recorded.",
    blockerKey: "rollback-evidence",
    checklistKey: "rollback-plan",
    recordedByRole: "operator",
    sourceRoute: "/api/command-center/launch-readiness/evidence",
    requestIdHash: "rollback-evidence",
  },
  {
    evidenceType: "audit-evidence" as const,
    status: "pending" as const,
    safeSummary: "Audit path evidence for auth, billing, reports, support, operator actions, and maintenance must be recorded.",
    blockerKey: "audit-evidence",
    checklistKey: "audit-plan",
    recordedByRole: "operator",
    sourceRoute: "/api/command-center/launch-readiness/evidence",
    requestIdHash: "audit-evidence",
  },
  {
    evidenceType: "hard-lock-clearance-evidence" as const,
    status: "blocked" as const,
    safeSummary: "Hard-lock clearance remains blocked until no unsafe launch claim, private data exposure, or uncontrolled production mutation path is present.",
    blockerKey: "hard-lock-clearance",
    checklistKey: "controlled-maintenance",
    recordedByRole: "operator",
    sourceRoute: "/api/command-center/launch-readiness/evidence",
    requestIdHash: "hard-lock-clearance-evidence",
  },
];

const evidenceSummary = summarizeLaunchEvidenceReadiness(evidenceInputs);
const evidenceRows = projectLaunchEvidenceBatch(evidenceInputs);

export function LaunchEvidencePanel() {
  return (
    <section className="mt-10 rounded-[2rem] border border-cyan-300/15 bg-cyan-300/[0.035] p-6 shadow-2xl shadow-cyan-950/20 md:p-8" aria-label="Launch evidence persistence panel">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Launch evidence</p>
          <h2 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Append-only evidence posture for owner config, smoke, rollback, audit, and hard-lock clearance.
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-slate-400">
          Operator-only evidence view. This panel does not create public, paid, or report launch claims and never exposes raw source evidence, protected provider details, private customer data, internal notes, or private audit payloads.
        </p>
      </div>

      <div className="mt-7 grid gap-4 lg:grid-cols-4">
        <MetricCard label="Recorded" value={String(evidenceSummary.recordedCount)} />
        <MetricCard label="Pending" value={String(evidenceSummary.pendingCount)} />
        <MetricCard label="Blocked" value={String(evidenceSummary.blockedCount)} />
        <MetricCard label="Public claim" value={evidenceSummary.publicClaimAllowed ? "allowed" : "blocked"} />
      </div>

      <article className="mt-7 rounded-3xl border border-white/10 bg-slate-950/60 p-5">
        <p className="text-sm font-semibold text-white">Safe evidence projections</p>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          Evidence is projected through safe fields only. Pending evidence is not complete evidence, and evidence records alone never create public launch readiness.
        </p>
        <div className="mt-5 grid gap-3 lg:grid-cols-2">
          {evidenceRows.map((row) => row.projection && (
            <div key={row.projection.evidenceId} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold text-slate-100">{row.projection.evidenceType}</p>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">{row.projection.status}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">{row.projection.safeSummary}</p>
              <div className="mt-4 grid gap-2 text-xs leading-5 text-slate-400">
                <p>Blocker: {row.projection.blockerKey}</p>
                <p>Checklist: {row.projection.checklistKey}</p>
                <p>Role: {row.projection.recordedByRole}</p>
                <p>Append-only: {row.projection.appendOnly ? "yes" : "no"}</p>
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
