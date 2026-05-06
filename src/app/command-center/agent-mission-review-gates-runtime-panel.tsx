import { getAgentMissionReviewGatesRuntime } from "@/lib/agent-mission-review-gates-runtime";

export function AgentMissionReviewGatesRuntimePanel() {
  const runtime = getAgentMissionReviewGatesRuntime();

  return (
    <section className="mt-10 rounded-[2rem] border border-cyan-200/15 bg-slate-900/60 p-6 md:p-8" aria-label="Agent mission review gates runtime">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100">Agent mission review gates</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Findings must pass agent submission, chief review, then captain approval.</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
            This layer turns mission records into gated operating decisions. Agent findings can become safe for chief review, chief agents can consolidate evidence, and release captain can approve customer-safe output posture only when the plan boundary and evidence gates are satisfied.
          </p>
        </div>
        <div className="rounded-3xl border border-cyan-200/20 bg-cyan-200/10 p-4 text-sm leading-6 text-cyan-50 lg:max-w-sm">
          Chief review does not approve customer-facing output. Release captain approval still cannot bypass delivery, billing, report, or production gates.
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {runtime.reviews.map(({ record, findingSubmissions, chiefReview, captainApproval }) => (
          <article key={record.missionRecordId} className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100">{record.planKey}</p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">{record.customerSafeSummary}</h3>
              </div>
              <span className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-3 py-1 text-xs font-semibold text-cyan-100">{captainApproval.customerSafeOutputPosture}</span>
            </div>

            <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-300">
              <p><span className="font-semibold text-slate-100">Mission:</span> {record.missionRecordId}</p>
              <p><span className="font-semibold text-slate-100">Finding submissions:</span> {findingSubmissions.filter((item) => item.accepted).length}/{findingSubmissions.length} accepted</p>
              <p><span className="font-semibold text-slate-100">Chief review:</span> {chiefReview.state} · {chiefReview.consolidatedEvidencePosture}</p>
              <p><span className="font-semibold text-slate-100">Captain gate:</span> {captainApproval.state} · {captainApproval.releaseGate}</p>
              <p><span className="font-semibold text-slate-100">Blocked claims:</span> {captainApproval.blockedOutputClaims.length}</p>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Reason codes</p>
              <p className="mt-2 text-sm leading-6 text-slate-200">{[...chiefReview.reasonCodes, ...captainApproval.reasonCodes].join(", ") || "Ready for next review gate."}</p>
            </div>

            <div className="mt-4 grid gap-2 text-xs leading-5 text-slate-400 sm:grid-cols-2">
              <p>Customer output: {captainApproval.customerFacingOutputAllowed ? "allowed" : "blocked"}</p>
              <p>Production mutation: {captainApproval.productionMutationAllowed ? "allowed" : "blocked"}</p>
              <p>Report release: {captainApproval.reportReleaseAllowed ? "allowed" : "blocked"}</p>
              <p>Delivery email: {captainApproval.deliveryEmailAllowed ? "allowed" : "blocked"}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/60 p-5">
        <p className="text-sm font-semibold text-cyan-100">Review gate rules</p>
        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          {runtime.rules.map((rule) => (
            <p key={rule} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-xs leading-6 text-slate-300">{rule}</p>
          ))}
        </div>
      </div>

      <p className="sr-only">
        Agent mission review gates runtime. Findings must pass agent submission, chief review, then captain approval. Every finding submission must include verified facts, source references, assumptions, evidence gaps, risks, recommendation, confidence, and blocked customer claims. Agent findings can become safe for chief-agent review but never customer-facing output by themselves. Chief-agent review can consolidate findings and request captain review but cannot approve customer-facing report, fix, monitoring alert, paid recommendation, code, billing, provider action, delivery email, or production mutation. Release-captain approval is the only gate that can approve customer-safe output posture. {runtime.reviews.map(({ record, chiefReview, captainApproval }) => `${record.missionRecordId} ${chiefReview.state} ${chiefReview.consolidatedEvidencePosture} ${captainApproval.state} ${captainApproval.customerSafeOutputPosture} ${captainApproval.reasonCodes.join(" ")}`).join(" ")} {runtime.rules.join(" ")}
      </p>
    </section>
  );
}
