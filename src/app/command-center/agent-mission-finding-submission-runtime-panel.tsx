import { projectAgentMissionExecutionPreview } from "@/lib/agent-mission-live-execution-runtime";
import { projectPlanTriggeredAgentMission } from "@/lib/agent-mission-operating-engine";
import { AGENT_MISSION_FINDING_SUBMISSION_RULES, projectAgentMissionFindingSubmissionPreview } from "@/lib/agent-mission-finding-submission-runtime";

const PLAN_KEYS = ["free-scan", "deep-review", "build-fix", "ongoing-control"] as const;

const SAMPLE_FINDING_BY_PLAN = {
  "free-scan": {
    agentKey: "report-truth-research-scout",
    verifiedFacts: ["The mission has a visible business surface and a customer-stated concern."],
    sourceRefs: ["safe owned-surface summary"],
    assumptions: ["Only first-signal evidence is available at this stage."],
    evidenceGaps: ["No full diagnostic evidence has been collected."],
    risks: ["The scan can overstate certainty if limitations are not shown."],
    recommendation: "Keep the Free Scan output focused on the strongest first visible signal and a safe next action.",
    confidence: "medium" as const,
    blockedCustomerClaims: ["full diagnosis", "guaranteed revenue", "implementation included"],
  },
  "deep-review": {
    agentKey: "evidence-conflict-scout",
    verifiedFacts: ["The mission requires cause-level diagnosis before fix recommendations."],
    sourceRefs: ["safe customer intake summary", "safe owned-surface summary"],
    assumptions: ["Some market context may require customer clarification."],
    evidenceGaps: ["Competitor context may be incomplete until reviewed."],
    risks: ["A recommendation can become generic if cause and priority are not separated."],
    recommendation: "Separate symptoms from causes and mark every priority with evidence confidence.",
    confidence: "medium" as const,
    blockedCustomerClaims: ["implementation included", "complete certainty", "guaranteed ROI"],
  },
  "build-fix": {
    agentKey: "conversion-luxury-ui-scout",
    verifiedFacts: ["The mission requires a scoped fix target before production work."],
    sourceRefs: ["safe scope summary"],
    assumptions: ["The customer will confirm final approval contact."],
    evidenceGaps: ["Before-state baseline may need a final snapshot."],
    risks: ["Scope can expand if out-of-scope work is not named."],
    recommendation: "Confirm scope, preserve before-state, and prepare approval-ready implementation summary.",
    confidence: "medium" as const,
    blockedCustomerClaims: ["unlimited implementation", "unapproved production change", "guaranteed conversion lift"],
  },
  "ongoing-control": {
    agentKey: "business-change-forecasting-scout",
    verifiedFacts: ["The mission requires comparable monthly evidence and one priority."],
    sourceRefs: ["safe monthly scope summary"],
    assumptions: ["Historical baseline may need expansion over time."],
    evidenceGaps: ["A first cycle has limited trend depth."],
    risks: ["Monthly status can become noise without a selected priority."],
    recommendation: "Compare against the last available baseline and select one next monthly priority.",
    confidence: "medium" as const,
    blockedCustomerClaims: ["guaranteed ranking", "guaranteed AI placement", "unlimited Build Fix"],
  },
} as const;

export function AgentMissionFindingSubmissionRuntimePanel() {
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
    const submission = projectAgentMissionFindingSubmissionPreview(record, SAMPLE_FINDING_BY_PLAN[planKey]);
    return { planKey, execution, submission };
  });

  return (
    <section className="mt-10 rounded-[2rem] border border-cyan-200/15 bg-slate-900/60 p-6 md:p-8" aria-label="Agent mission finding submission runtime">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100">Agent finding submission runtime</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Assigned agents can submit findings; the mission recomputes immediately.</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
            This layer gives the operating engine a real finding submission path. Accepted findings replace that agent&apos;s prior finding, recompute chief review, captain approval posture, quality score, output assembly, queue state, blocked reasons, and append-only audit events.
          </p>
        </div>
        <div className="rounded-3xl border border-cyan-200/20 bg-cyan-200/10 p-4 text-sm leading-6 text-cyan-50 lg:max-w-sm">
          Finding submission can move work toward review. It still cannot approve customer output, report release, production mutation, delivery email, or billing action.
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {previews.map(({ planKey, execution, submission }) => (
          <article key={planKey} className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100">{planKey}</p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">{execution.runtime.customerSafeSummary}</h3>
              </div>
              <span className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-3 py-1 text-xs font-semibold text-cyan-100">{submission.submission.accepted ? "accepted" : "blocked"}</span>
            </div>

            <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-300">
              <p><span className="font-semibold text-slate-100">Agent:</span> {submission.finding.agentKey}</p>
              <p><span className="font-semibold text-slate-100">Finding:</span> {submission.finding.findingId}</p>
              <p><span className="font-semibold text-slate-100">Queue after submit:</span> {submission.queueState}</p>
              <p><span className="font-semibold text-slate-100">Quality after submit:</span> {submission.qualityScore.total}/100 · {submission.qualityScore.tier}</p>
              <p><span className="font-semibold text-slate-100">Output after submit:</span> {submission.outputAssembly.outputType} · {submission.outputAssembly.readiness}</p>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Submission result</p>
              <p className="mt-2 text-sm leading-6 text-slate-200">{submission.blockedReasonCodes.slice(0, 6).join(", ") || "Accepted for review recomputation."}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/60 p-5">
        <p className="text-sm font-semibold text-cyan-100">Submission rules</p>
        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          {AGENT_MISSION_FINDING_SUBMISSION_RULES.map((rule) => (
            <p key={rule} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-xs leading-6 text-slate-300">{rule}</p>
          ))}
        </div>
      </div>

      <p className="sr-only">
        Agent mission finding submission runtime. Assigned agents can submit findings and the mission recomputes immediately. Accepted findings replace that agent prior finding, recompute chief review, captain approval posture, quality score, output assembly, queue state, blocked reasons, and append-only audit events. Finding submission can move work toward review but cannot approve customer output, report release, production mutation, delivery email, or billing action. {AGENT_MISSION_FINDING_SUBMISSION_RULES.join(" ")}
      </p>
    </section>
  );
}
