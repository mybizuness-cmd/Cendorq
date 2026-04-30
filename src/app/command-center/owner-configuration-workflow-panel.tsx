import { projectOwnerConfigurationEvidenceApprovalWorkflow } from "@/lib/owner-configuration-evidence-approval-workflow-runtime";
import { recordOwnerConfigurationEvidenceBatch } from "@/lib/owner-configuration-evidence-persistence-runtime";

const workflowRecords = recordOwnerConfigurationEvidenceBatch(
  [
    {
      areaKey: "auth-provider-configuration",
      approvalStatus: "pending",
      safeSummary: "Auth provider evidence is pending owner approval and remains blocked for launch review.",
      recordedByRole: "operator",
      sourceRoute: "/api/command-center/owner-configuration/workflow",
      requestIdHash: "workflow-auth-provider",
    },
    {
      areaKey: "payment-mapping-configuration",
      approvalStatus: "pending",
      safeSummary: "Payment mapping evidence is pending owner approval and remains blocked for paid launch review.",
      recordedByRole: "operator",
      sourceRoute: "/api/command-center/owner-configuration/workflow",
      requestIdHash: "workflow-payment-mapping",
    },
    {
      areaKey: "protected-runtime-configuration",
      approvalStatus: "pending",
      safeSummary: "Protected runtime evidence is pending owner approval and release captain review.",
      recordedByRole: "operator",
      sourceRoute: "/api/command-center/owner-configuration/workflow",
      requestIdHash: "workflow-protected-runtime",
    },
    {
      areaKey: "launch-contact-configuration",
      approvalStatus: "missing",
      safeSummary: "Launch contact evidence is missing and must be recorded before review.",
      recordedByRole: "operator",
      sourceRoute: "/api/command-center/owner-configuration/workflow",
      requestIdHash: "workflow-launch-contact",
    },
    {
      areaKey: "support-identity-configuration",
      approvalStatus: "pending",
      safeSummary: "Support identity evidence is pending owner approval and release captain review.",
      recordedByRole: "operator",
      sourceRoute: "/api/command-center/owner-configuration/workflow",
      requestIdHash: "workflow-support-identity",
    },
  ],
  {
    commandCenterAllowed: true,
    ownerApprovalRecorded: false,
    releaseCaptainReviewed: false,
    recordedByRole: "operator",
    requestIdHash: "workflow-safe-summary",
  },
);

const workflow = projectOwnerConfigurationEvidenceApprovalWorkflow({
  records: workflowRecords.records ?? [],
  ownerApprovalRecorded: false,
  releaseCaptainReviewed: false,
  reviewedByRole: "release-captain",
  requestIdHash: "workflow-release-captain-review",
});

export function OwnerConfigurationWorkflowPanel() {
  return (
    <section className="mt-10 rounded-[2rem] border border-cyan-300/15 bg-cyan-300/[0.035] p-6 shadow-2xl shadow-cyan-950/20 md:p-8" aria-label="Owner configuration workflow panel">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Owner configuration workflow</p>
          <h2 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Evidence recorded, owner approval tracked, and release-captain review required before any launch posture can move.
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-slate-400">
          This private workflow view uses safe record projections only. It does not approve public launch, paid launch, report launch, security readiness, provider configuration, payment mapping, or customer-facing claims.
        </p>
      </div>

      <div className="mt-7 grid gap-4 lg:grid-cols-4">
        <MetricCard label="Workflow decision" value={workflow.decision} />
        <MetricCard label="Evidence recorded" value={workflow.evidenceRecorded ? "yes" : "no"} />
        <MetricCard label="Owner approval" value={workflow.ownerApprovalRecorded ? "recorded" : "pending"} />
        <MetricCard label="Final validator" value={workflow.finalValidator} />
      </div>

      <article className="mt-7 rounded-3xl border border-white/10 bg-slate-950/60 p-5">
        <p className="text-sm font-semibold text-white">Workflow blockers</p>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          Missing, pending, or blocked evidence remains incomplete. Release-captain review is tracked separately and still does not create launch approval by itself.
        </p>
        <div className="mt-5 grid gap-3 lg:grid-cols-3">
          <ListCard label="Missing" values={workflow.missingAreaKeys} />
          <ListCard label="Pending" values={workflow.pendingAreaKeys} />
          <ListCard label="Blocked" values={workflow.blockedAreaKeys} />
        </div>
      </article>
    </section>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-3 text-xl font-semibold tracking-tight text-white">{value}</p>
    </article>
  );
}

function ListCard({ label, values }: { label: string; values: readonly string[] }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <div className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
        {values.length ? values.map((value) => <p key={value}>{value}</p>) : <p>none</p>}
      </div>
    </article>
  );
}
