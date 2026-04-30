import { buildReportEvidenceRecordRuntime } from "@/lib/command-center/report-evidence-record-runtime";

const sampleRecord = buildReportEvidenceRecordRuntime({
  reportId: "report-evidence-record-sample",
  businessId: "business-evidence-sample",
  capturedAt: "2026-01-01T00:00:00.000Z",
  retentionClass: "audit-defense",
  reviewedByRole: "release-captain",
  evidence: [
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
      summary: "Owned business surface signal can support a blocker only after release-captain review.",
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
      summary: "Public signal conflict requires disclosure and resolution before stronger report language.",
      hasEvidenceConflict: true,
      limitationsVisible: true,
      safeNextActionVisible: true,
      planFitEvidencePresent: true,
      releaseCaptainReviewed: false,
    },
  ],
});

export function ReportEvidenceRecordPanel() {
  return (
    <div className="mt-10 rounded-[2rem] border border-sky-200/10 bg-sky-200/[0.03] p-6 md:p-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-200">Report Evidence Records</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">Safe record projection for report source, confidence, conflict, plan-fit, and release review</h2>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.14em]">
          <span className="rounded-full border border-sky-200/20 bg-sky-200/10 px-2.5 py-1 text-sky-100">{sampleRecord.status}</span>
          <span className="rounded-full border border-white/10 px-2.5 py-1 text-slate-400">raw evidence stored: {String(sampleRecord.rawEvidenceStored)}</span>
        </div>
      </div>

      <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-400">
        Private command-center projection only. Report evidence records preserve separation between sources, confidence, conflicts, plan fit, blocked patterns, and release review without exposing raw evidence, provider payloads, credentials, customer data, internal notes, or operator identity.
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-4">
        <Metric label="Sources" value={sampleRecord.sourceRecords.length} />
        <Metric label="Confidence" value={sampleRecord.confidenceRecords.length} />
        <Metric label="Conflicts" value={sampleRecord.conflictRecords.length} />
        <Metric label="Blocked patterns" value={sampleRecord.blockedPatternRecords.length} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <ListCard title="Source records" items={sampleRecord.sourceRecords.map((record) => `${record.sourceTier}: ${record.safeSummary}`)} />
        <ListCard title="Confidence records" items={sampleRecord.confidenceRecords.map((record) => `${record.trustLevel}: ${record.confidenceReason}`)} />
        <ListCard title="Conflict records" items={sampleRecord.conflictRecords.length ? sampleRecord.conflictRecords.map((record) => `${record.conflictStatus}: ${record.resolutionPath}`) : ["No unresolved evidence conflict projected in this sample."]} />
        <ListCard title="Plan-fit records" items={sampleRecord.planFitRecords.map((record) => `${record.planFit}: ${record.recommendationSummary}`)} />
        <ListCard title="Blocked pattern records" items={sampleRecord.blockedPatternRecords.length ? sampleRecord.blockedPatternRecords.map((record) => `${record.patternKey}: ${record.blockedReason}`) : ["No blocked pattern projected in this safe sample."]} />
        <ListCard
          title="Release review"
          items={[
            `reviewed by: ${sampleRecord.releaseReviewRecord.reviewedByRole}`,
            `customer output approved: ${String(sampleRecord.releaseReviewRecord.customerFacingOutputApproved)}`,
            `public report release approved: ${String(sampleRecord.releaseReviewRecord.publicReportReleaseApproved)}`,
            `paid plan recommendation approved: ${String(sampleRecord.releaseReviewRecord.paidPlanRecommendationApproved)}`,
          ]}
        />
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
