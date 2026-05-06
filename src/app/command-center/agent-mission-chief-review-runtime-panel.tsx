import { projectAgentMissionExecutionPreview } from "@/lib/agent-mission-live-execution-runtime";
import { projectPlanTriggeredAgentMission } from "@/lib/agent-mission-operating-engine";
import { AGENT_MISSION_CHIEF_REVIEW_RULES, projectChiefAgentMissionReviewPreview } from "@/lib/agent-mission-chief-review-runtime";

const PLAN_KEYS = ["free-scan", "deep-review", "build-fix", "ongoing-control"] as const;

const CHIEF_REVIEW_SAMPLE_BY_PLAN = {
  "free-scan": {
    chiefAgentKey: "chief-report-truth-agent",
    decision: "request-changes" as const,
    consolidatedFacts: ["The Free Scan mission must stay a first visible signal, not a full diagnosis."],
    priorityFindings: ["Show one strongest observed issue and one safe next action."],
    evidenceConflicts: ["No full diagnostic evidence has been reviewed yet."],
    safeLimitations: ["Do not imply implementation, full diagnosis, or guaranteed revenue."],
    requiredCaptainNotes: ["Confirm dashboard-only Free Scan result boundary before customer output."],
  },
  "deep-review": {
    chiefAgentKey: "chief-report-truth-agent",
    decision: "request-changes" as const,
    consolidatedFacts: ["Deep Review must separate verified facts, assumptions, and cause hypotheses."],
    priorityFindings: ["Prioritize cause-level diagnosis before Build Fix recommendation."],
    evidenceConflicts: ["Customer claims and public evidence may conflict until verified."],
    safeLimitations: ["Do not claim complete certainty or implementation included."],
    requiredCaptainNotes: ["Require report delivery gate, PDF gate, and evidence boundary before release."],
  },
  "build-fix": {
    chiefAgentKey: "chief-product-experience-agent",
    decision: "request-changes" as const,
    consolidatedFacts: ["Build Fix must have approved fix target and scope boundary before production work."],
    priorityFindings: ["Preserve before-state and define customer-facing change."],
    evidenceConflicts: ["Out-of-scope requests must be named before customer approval."],
    safeLimitations: ["Do not imply unlimited implementation or unapproved production mutation."],
    requiredCaptainNotes: ["Require scope approval and delivery summary before customer output."],
  },
  "ongoing-control": {
    chiefAgentKey: "chief-growth-forecast-agent",
    decision: "request-changes" as const,
    consolidatedFacts: ["Ongoing Control must compare current state against a baseline and select one monthly priority."],
    priorityFindings: ["Show stable signal, regression, confidence, and next monthly priority."],
    evidenceConflicts: ["First cycle trend depth is limited until more history exists."],
    safeLimitations: ["Do not imply guaranteed ranking, guaranteed AI placement, or unlimited Build Fix."],
    requiredCaptainNotes: ["Require monthly review gate and plan boundary before customer output."],
  },
} as const;

export function AgentMissionChiefReviewRuntimePanel() {
  const previews = PLAN_KEYS.map((planKey) => {
    const execution = projectAgentMissionExecutionPreview(planKey);
    const record = {
      executionId: `${execution.runtime.missionRecordId}-execution`,
      createdAt: "preview-time",
      updatedAt: "preview-time",
      mission: projectPlanTriggeredAgentMission(planKey),
      runtime: execution.runtime,
      queueState: execution.queueState,
      findingRecords: execution.runtime.findingRecords,
      chiefReview: execution.chiefReview,
      captainApproval: execution.captainApproval,
      qualityScore: execution.qualityScore,
      outputAssembly: execution.outputAssembly,
      auditTrail: [],
      blockedReasonCodes: execution.blockedReasonCodes,
    };
    const chiefReview = projectChiefAgentMissionReviewPreview(record, CHIEF_REVIEW_SAMPLE_BY_PLAN[planKey]);
    return { planKey, execution, chiefReview };
  });

  return (
    <section className="mt-10 rounded-[2rem] border border-cyan-200/15 bg-slate-900/60 p-6 md:p-8" aria-label="Agent mission chief review runtime">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100">Agent chief-review runtime</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Chief agents consolidate findings before release-captain review.</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
            Chief review is now a persisted action. The assigned chief agent can accept, reject, or request changes; record consolidated facts, priority findings, evidence conflicts, safe limitations, and captain notes; then move eligible missions toward release-captain review without approving customer output.
          </p>
        </div>
        <div className="rounded-3xl border border-cyan-200/20 bg-cyan-200/10 p-4 text-sm leading-6 text-cyan-50 lg:max-w-sm">
          Chief review improves quality control. It still cannot approve reports, customer output, paid recommendations, delivery email, billing action, or production mutation.
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {previews.map(({ planKey, execution, chiefReview }) => (
          <article key={planKey} className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100">{planKey}</p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">{execution.runtime.customerSafeSummary}</h3>
              </div>
              <span className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-3 py-1 text-xs font-semibold text-cyan-100">{chiefReview.review.decision}</span>
            </div>
            <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-300">
              <p><span className="font-semibold text-slate-100">Chief:</span> {chiefReview.review.chiefAgentKey}</p>
              <p><span className="font-semibold text-slate-100">Accepted findings:</span> {chiefReview.review.acceptedFindingCount}/{chiefReview.review.requiredFindingCount}</p>
              <p><span className="font-semibold text-slate-100">Captain ready:</span> {chiefReview.review.captainReviewReady ? "yes" : "no"}</p>
              <p><span className="font-semibold text-slate-100">Queue after review:</span> {chiefReview.updatedExecution.queueState}</p>
              <p><span className="font-semibold text-slate-100">Chief posture:</span> {chiefReview.updatedExecution.chiefReview.state} · {chiefReview.updatedExecution.chiefReview.consolidatedEvidencePosture}</p>
            </div>
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Review reason codes</p>
              <p className="mt-2 text-sm leading-6 text-slate-200">{chiefReview.review.reasonCodes.slice(0, 6).join(", ") || "Ready for release-captain review."}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/60 p-5">
        <p className="text-sm font-semibold text-cyan-100">Chief-review rules</p>
        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          {AGENT_MISSION_CHIEF_REVIEW_RULES.map((rule) => (
            <p key={rule} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-xs leading-6 text-slate-300">{rule}</p>
          ))}
        </div>
      </div>

      <p className="sr-only">
        Agent mission chief review runtime. Chief agents consolidate findings before release-captain review. Chief review is a persisted action. The assigned chief agent can accept, reject, or request changes; record consolidated facts, priority findings, evidence conflicts, safe limitations, and captain notes; then move eligible missions toward release-captain review without approving customer output. {AGENT_MISSION_CHIEF_REVIEW_RULES.join(" ")}
      </p>
    </section>
  );
}
