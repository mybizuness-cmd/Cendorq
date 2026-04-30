import { getReportEvidenceOrchestrationPolicy } from "@/lib/command-center/report-evidence-orchestration";
import { projectReportEvidenceRuntime } from "@/lib/command-center/report-evidence-orchestration-runtime";

const sampleEvidence = projectReportEvidenceRuntime([
  {
    evidenceKey: "customer-claim-check",
    sourceTier: "customer-context",
    trustLevel: "limited",
    planFit: "deep-review",
    summary: "Customer-provided claim requires supporting evidence before report use.",
    customerClaimPresent: true,
    customerClaimSupported: false,
    limitationsVisible: true,
    safeNextActionVisible: true,
    planFitEvidencePresent: true,
    releaseCaptainReviewed: false,
  },
  {
    evidenceKey: "owned-surface-observation",
    sourceTier: "owned-business-surface",
    trustLevel: "strong",
    planFit: "build-fix",
    summary: "Owned surface observation can support a blocker only after release-captain review.",
    limitationsVisible: true,
    safeNextActionVisible: true,
    planFitEvidencePresent: true,
    releaseCaptainReviewed: false,
  },
  {
    evidenceKey: "conflict-resolution-path",
    sourceTier: "safe-public-signal",
    trustLevel: "conflicted",
    planFit: "ongoing-control",
    summary: "Public signal conflict requires disclosure and resolution before stronger output.",
    hasEvidenceConflict: true,
    limitationsVisible: true,
    safeNextActionVisible: true,
    planFitEvidencePresent: true,
    releaseCaptainReviewed: false,
  },
]);

export function ReportEvidenceOrchestrationPanel() {
  const policy = getReportEvidenceOrchestrationPolicy();

  return (
    <div className="mt-10 rounded-[2rem] border border-cyan-200/10 bg-cyan-200/[0.03] p-6 md:p-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Report Evidence</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">Evidence orchestration and runtime review</h2>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.14em]">
          <span className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-2.5 py-1 text-cyan-100">
            {policy.sourceContracts.length} source tiers
          </span>
          <span className="rounded-full border border-white/10 px-2.5 py-1 text-slate-400">
            {sampleEvidence.blockedPatterns.length} blocked flags
          </span>
        </div>
      </div>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-400">
        Metadata only. This private panel shows how report evidence is classified, confidence-labeled, conflict-aware, plan-fit checked, and returned to release-captain review before customer-facing output.
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-4">
        <Metric label="Evidence inputs" value={sampleEvidence.evidenceCount} />
        <Metric label="Needs review" value={sampleEvidence.reviewCount} />
        <Metric label="Conflicts" value={sampleEvidence.conflictCount} />
        <Metric label="Dominant trust" value={sampleEvidence.dominantTrustLevel} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <ListCard title="Orchestration rules" items={policy.orchestrationRules.map((rule) => rule.label)} />
        <ListCard title="Source tiers" items={policy.sourceContracts.map((contract) => `${contract.label}: ${contract.requiredHandling[0]}`)} />
        <ListCard title="Trust language" items={policy.confidenceContracts.map((contract) => `${contract.trustLevel}: ${contract.requiredEvidencePosture[0]}`)} />
        <ListCard title="Plan-fit gates" items={policy.planFitContracts.map((contract) => `${contract.planFit}: ${contract.minimumEvidencePosture[0]}`)} />
        <ListCard title="Runtime blocked patterns" items={sampleEvidence.blockedPatterns.length ? sampleEvidence.blockedPatterns : ["No runtime blocked pattern projected in this safe sample."]} />
        <ListCard title="Runtime next actions" items={sampleEvidence.safeNextActions.slice(0, 5)} />
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}

function ListCard({ title, items }: { title: string; items: readonly string[] }) {
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
