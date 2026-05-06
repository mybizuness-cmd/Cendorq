import { projectAgentMissionExecutionPreview, AGENT_MISSION_LIVE_EXECUTION_RULES } from "@/lib/agent-mission-live-execution-runtime";

const PLAN_KEYS = ["free-scan", "deep-review", "build-fix", "ongoing-control"] as const;

export function AgentMissionLiveExecutionRuntimePanel() {
  const previews = PLAN_KEYS.map((planKey) => projectAgentMissionExecutionPreview(planKey));

  return (
    <section className="mt-10 rounded-[2rem] border border-cyan-200/15 bg-slate-900/60 p-6 md:p-8" aria-label="Agent mission live execution runtime">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100">Agent mission live execution</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Persisted records, queue state, quality score, and output assembly posture.</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
            This layer turns the agent mission engine into an execution system. Every plan mission gets a persisted execution record, queue state, review projections, quality scoring, customer-output assembly posture, blocked reason codes, and append-only audit trail.
          </p>
        </div>
        <div className="rounded-3xl border border-cyan-200/20 bg-cyan-200/10 p-4 text-sm leading-6 text-cyan-50 lg:max-w-sm">
          Customer output cannot become delivery-ready until finding submissions, chief review, release-captain approval posture, plan-boundary safety, quality score, and blocked-claim review pass.
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {previews.map(({ runtime, queueState, chiefReview, captainApproval, qualityScore, outputAssembly, blockedReasonCodes }) => (
          <article key={runtime.missionRecordId} className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100">{runtime.planKey}</p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">{runtime.customerSafeSummary}</h3>
              </div>
              <span className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-3 py-1 text-xs font-semibold text-cyan-100">{queueState}</span>
            </div>

            <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-300">
              <p><span className="font-semibold text-slate-100">Execution:</span> {runtime.missionRecordId}-execution</p>
              <p><span className="font-semibold text-slate-100">Chief review:</span> {chiefReview.state} · {chiefReview.consolidatedEvidencePosture}</p>
              <p><span className="font-semibold text-slate-100">Captain approval:</span> {captainApproval.state} · {captainApproval.customerSafeOutputPosture}</p>
              <p><span className="font-semibold text-slate-100">Quality:</span> {qualityScore.total}/100 · {qualityScore.tier}</p>
              <p><span className="font-semibold text-slate-100">Output:</span> {outputAssembly.outputType} · {outputAssembly.readiness}</p>
              <p><span className="font-semibold text-slate-100">Destination:</span> {outputAssembly.dashboardDestination}</p>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Blocked reason codes</p>
              <p className="mt-2 text-sm leading-6 text-slate-200">{blockedReasonCodes.slice(0, 6).join(", ") || "No blocking reason codes."}</p>
            </div>

            <div className="mt-4 grid gap-2 text-xs leading-5 text-slate-400 sm:grid-cols-2">
              <p>PDF required: {outputAssembly.requiresPdfAttachment ? "yes" : "no"}</p>
              <p>Email required: {outputAssembly.requiresDeliveryEmail ? "yes" : "no"}</p>
              <p>Safe sections: {outputAssembly.safeSections.length}</p>
              <p>Blockers: {outputAssembly.blockedUntil.length}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/60 p-5">
        <p className="text-sm font-semibold text-cyan-100">Live execution rules</p>
        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          {AGENT_MISSION_LIVE_EXECUTION_RULES.map((rule) => (
            <p key={rule} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-xs leading-6 text-slate-300">{rule}</p>
          ))}
        </div>
      </div>

      <p className="sr-only">
        Agent mission live execution runtime. Persisted records, queue state, quality score, and output assembly posture. Every plan-triggered mission must persist an execution record before agent work can be treated as operational. Every execution record carries mission template, runtime record, queue state, finding records, chief review, captain approval, quality score, output assembly posture, blocked reason codes, and append-only audit trail. Free Scan output assembly targets dashboard-only results, while paid plan output assembly targets dashboard report delivery plus PDF and email gates. {previews.map(({ runtime, queueState, qualityScore, outputAssembly, blockedReasonCodes }) => `${runtime.planKey} ${runtime.missionRecordId} ${queueState} ${qualityScore.total} ${qualityScore.tier} ${outputAssembly.outputType} ${outputAssembly.readiness} ${outputAssembly.dashboardDestination} ${blockedReasonCodes.join(" ")}`).join(" ")} {AGENT_MISSION_LIVE_EXECUTION_RULES.join(" ")}
      </p>
    </section>
  );
}
