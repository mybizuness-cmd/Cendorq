import { recordReportEvidenceRecordBatch } from "@/lib/command-center/report-evidence-record-persistence-runtime";
import { buildReportEvidenceRecordRuntime } from "@/lib/command-center/report-evidence-record-runtime";

const sampleEvidence = [
  {
    evidenceKey: "customer-claim-check",
    sourceTier: "customer-context" as const,
    trustLevel: "limited" as const,
    planFit: "deep-review" as const,
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
    sourceTier: "owned-business-surface" as const,
    trustLevel: "strong" as const,
    planFit: "build-fix" as const,
    summary: "Owned business surface signal can support a blocker only after release-captain review.",
    limitationsVisible: true,
    safeNextActionVisible: true,
    planFitEvidencePresent: true,
    releaseCaptainReviewed: false,
  },
  {
    evidenceKey: "conflict-resolution-path",
    sourceTier: "safe-public-signal" as const,
    trustLevel: "conflicted" as const,
    planFit: "ongoing-control" as const,
    summary: "Public signal conflict requires disclosure and resolution before stronger report language.",
    hasEvidenceConflict: true,
    limitationsVisible: true,
    safeNextActionVisible: true,
    planFitEvidencePresent: true,
    releaseCaptainReviewed: false,
  },
] as const;

const sampleRecord = buildReportEvidenceRecordRuntime({
  reportId: "report-evidence-record-sample",
  businessId: "business-evidence-sample",
  capturedAt: "2026-01-01T00:00:00.000Z",
  retentionClass: "audit-defense",
  reviewedByRole: "release-captain",
  evidence: sampleEvidence,
});

const samplePersistence = recordReportEvidenceRecordBatch(
  {
    reportId: "report-evidence-record-sample",
    businessId: "business-evidence-sample",
    capturedAt: "2026-01-01T00:00:00.000Z",
    retentionClass: "audit-defense",
    reviewedByRole: "release-captain",
    evidence: sampleEvidence,
  },
  {
    commandCenterAllowed: true,
    releaseCaptainReviewed: false,
    recordedByRole: "operator",
    sourceRoute: "/api/command-center/report-evidence/records",
    requestIdHash: "report-evidence-record-panel-sample",
  },
);

const persistenceRecords = samplePersistence.records ?? [];
const releaseReviewRecord = persistenceRecords.find((record) => record.recordClass === "release-review");

export function ReportEvidenceRecordPanel() {
  return (
    <div className="mt-10 rounded-[2rem] border border-sky-200/10 bg-sky-200/[0.03] p-6 md:p-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-200">Report Evidence Records</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">Safe record projection, persistence, and API posture for report evidence</h2>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.14em]">
          <span className="rounded-full border border-sky-200/20 bg-sky-200/10 px-2.5 py-1 text-sky-100">{sampleRecord.status}</span>
          <span className="rounded-full border border-white/10 px-2.5 py-1 text-slate-400">raw evidence stored: {String(sampleRecord.rawEvidenceStored)}</span>
          <span className="rounded-full border border-white/10 px-2.5 py-1 text-slate-400">persistence: {samplePersistence.cache}</span>
        </div>
      </div>

      <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-400">
        Private command-center projection only. Report evidence records preserve separation between sources, confidence, conflicts, plan fit, blocked patterns, release review, and append-only persistence without exposing raw evidence, provider payloads, credentials, customer data, internal notes, private audit payloads, or operator identity.
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-4">
        <Metric label="Sources" value={sampleRecord.sourceRecords.length} />
        <Metric label="Confidence" value={sampleRecord.confidenceRecords.length} />
        <Metric label="Conflicts" value={sampleRecord.conflictRecords.length} />
        <Metric label="Persisted classes" value={persistenceRecords.length} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <StatusCard label="Records API" value="/api/command-center/report-evidence/records" detail="Command-center only, safe-summary-only, no-store/noindex, generic denied/rejected responses." />
        <StatusCard label="Persistence mode" value="append-only-safe-projection" detail="Safe hash and counts only; records never store raw evidence, provider payloads, credentials, customer data, or private audit payloads." />
        <StatusCard label="Approval boundary" value="review is not release" detail="Release-captain review metadata never creates customer-facing output, paid recommendation, public report release, launch, or security approval." />
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
        <ListCard
          title="Persistence records"
          items={persistenceRecords.map((record) => `${record.recordClass}: ${record.runtimeStatus}, append-only ${String(record.appendOnly)}, hash ${record.safeSummaryHash}`)}
        />
        <ListCard
          title="Persistence denials"
          items={[
            `raw evidence stored: ${String(samplePersistence.rawEvidenceStored)}`,
            `provider payload stored: ${String(samplePersistence.rawProviderPayloadStored)}`,
            `private audit payload stored: ${String(samplePersistence.privateAuditPayloadStored)}`,
            `customer-facing output approved: ${String(samplePersistence.customerFacingOutputApproved)}`,
          ]}
        />
        <ListCard
          title="Release review persistence"
          items={[
            `release captain reviewed: ${String(releaseReviewRecord?.releaseCaptainReviewed ?? false)}`,
            `evidence separation checked: ${String(releaseReviewRecord?.evidenceSeparationChecked ?? false)}`,
            `confidence labels checked: ${String(releaseReviewRecord?.confidenceLabelsChecked ?? false)}`,
            `raw/private exposure checked: ${String(releaseReviewRecord?.rawPrivateExposureChecked ?? false)}`,
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

function StatusCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="rounded-3xl border border-sky-200/10 bg-slate-950/60 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-3 text-sm font-semibold text-sky-100">{value}</p>
      <p className="mt-3 text-sm leading-6 text-slate-400">{detail}</p>
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
