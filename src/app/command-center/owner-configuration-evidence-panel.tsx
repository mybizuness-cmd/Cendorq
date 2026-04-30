import { summarizeOwnerConfigurationEvidence } from "@/lib/owner-configuration-evidence-runtime";

const ownerEvidence = summarizeOwnerConfigurationEvidence([
  {
    areaKey: "auth-provider-configuration",
    approvalStatus: "pending",
    safeSummary: "Auth provider evidence is pending owner approval and does not create launch readiness.",
    recordedByRole: "operator",
    sourceRoute: "/api/command-center/owner-configuration/evidence",
    requestIdHash: "owner-auth-provider-evidence",
  },
  {
    areaKey: "payment-mapping-configuration",
    approvalStatus: "pending",
    safeSummary: "Payment mapping evidence is pending owner approval and does not create paid launch readiness.",
    recordedByRole: "operator",
    sourceRoute: "/api/command-center/owner-configuration/evidence",
    requestIdHash: "owner-payment-mapping-evidence",
  },
  {
    areaKey: "protected-runtime-configuration",
    approvalStatus: "pending",
    safeSummary: "Protected runtime evidence is pending owner approval and must stay server-side without browser exposure.",
    recordedByRole: "operator",
    sourceRoute: "/api/command-center/owner-configuration/evidence",
    requestIdHash: "owner-protected-runtime-evidence",
  },
  {
    areaKey: "launch-contact-configuration",
    approvalStatus: "missing",
    safeSummary: "Launch contact evidence is missing and must be recorded before launch review.",
    recordedByRole: "operator",
    sourceRoute: "/api/command-center/owner-configuration/evidence",
    requestIdHash: "owner-launch-contact-evidence",
  },
  {
    areaKey: "support-identity-configuration",
    approvalStatus: "pending",
    safeSummary: "Support identity evidence is pending owner approval and must preserve safe support language.",
    recordedByRole: "operator",
    sourceRoute: "/api/command-center/owner-configuration/evidence",
    requestIdHash: "owner-support-identity-evidence",
  },
]);

export function OwnerConfigurationEvidencePanel() {
  return (
    <section className="mt-10 rounded-[2rem] border border-emerald-300/15 bg-emerald-300/[0.035] p-6 shadow-2xl shadow-emerald-950/20 md:p-8" aria-label="Owner configuration evidence panel">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-200">Owner configuration evidence</p>
          <h2 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Private owner approval posture for auth, payments, protected runtime, launch contact, and support identity.
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-slate-400">
          This panel shows safe owner evidence projections only. Missing or pending evidence is not complete, and owner evidence alone never creates public launch, paid launch, report launch, or security readiness approval.
        </p>
      </div>

      <div className="mt-7 grid gap-4 lg:grid-cols-4">
        <MetricCard label="Approved" value={String(ownerEvidence.approvedCount)} />
        <MetricCard label="Pending" value={String(ownerEvidence.pendingCount)} />
        <MetricCard label="Missing" value={String(ownerEvidence.missingCount)} />
        <MetricCard label="Paid launch" value={ownerEvidence.paidLaunchAllowed ? "allowed" : "blocked"} />
      </div>

      <article className="mt-7 rounded-3xl border border-white/10 bg-slate-950/60 p-5">
        <p className="text-sm font-semibold text-white">Owner evidence projections</p>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          Evidence records stay command-center-only, use safe summaries, and do not expose provider payloads, protected config values, private credentials, internal notes, customer data, or private audit payloads.
        </p>
        <div className="mt-5 grid gap-3 lg:grid-cols-2">
          {ownerEvidence.projections.map((projection) => (
            <div key={projection.evidenceId} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold text-slate-100">{projection.areaKey}</p>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">{projection.approvalStatus}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">{projection.safeSummary}</p>
              <div className="mt-4 grid gap-2 text-xs leading-5 text-slate-400">
                <p>Complete: {projection.complete ? "yes" : "no"}</p>
                <p>Public launch: {projection.publicLaunchAllowed ? "allowed" : "blocked"}</p>
                <p>Paid launch: {projection.paidLaunchAllowed ? "allowed" : "blocked"}</p>
                <p>Role: {projection.recordedByRole}</p>
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
