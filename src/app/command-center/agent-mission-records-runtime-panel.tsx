import { getAgentMissionRecordsRuntime } from "@/lib/agent-mission-records-runtime";

export function AgentMissionRecordsRuntimePanel() {
  const runtime = getAgentMissionRecordsRuntime();

  return (
    <section className="mt-10 rounded-[2rem] border border-cyan-200/15 bg-slate-900/60 p-6 md:p-8" aria-label="Agent mission records runtime">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100">Agent mission records runtime</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Mission records make the agent engine operational, reviewable, and bounded.</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
            Every plan-triggered mission needs a runtime record before research starts. The record shows the intake source, missing inputs, assigned chief agent, assigned scouts, finding record posture, chief review state, captain review state, blocked claims, and next operating action.
          </p>
        </div>
        <div className="rounded-3xl border border-cyan-200/20 bg-cyan-200/10 p-4 text-sm leading-6 text-cyan-50 lg:max-w-sm">
          Runtime records are safe-summary-only. They do not expose raw customer payloads, credentials, payment data, provider payloads, prompts, internal notes, or cross-customer records.
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {runtime.records.map((record) => (
          <article key={record.missionRecordId} className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100">{record.planKey}</p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">{record.customerSafeSummary}</h3>
              </div>
              <span className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-3 py-1 text-xs font-semibold text-cyan-100">{record.status}</span>
            </div>
            <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-300">
              <p><span className="font-semibold text-slate-100">Record:</span> {record.missionRecordId}</p>
              <p><span className="font-semibold text-slate-100">Intake:</span> {record.intakeRecordKey}</p>
              <p><span className="font-semibold text-slate-100">Chief:</span> {record.assignedChiefAgent}</p>
              <p><span className="font-semibold text-slate-100">Agents:</span> {record.assignedAgentKeys.join(", ")}</p>
              <p><span className="font-semibold text-slate-100">Chief review:</span> {record.chiefAgentReview.state} · {record.chiefAgentReview.gate}</p>
              <p><span className="font-semibold text-slate-100">Captain review:</span> {record.releaseCaptainReview.state} · {record.releaseCaptainReview.gate}</p>
            </div>
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Next operating action</p>
              <p className="mt-2 text-sm leading-6 text-slate-200">{record.nextOperatingAction}</p>
            </div>
            <div className="mt-4 grid gap-2 text-xs leading-5 text-slate-400 sm:grid-cols-2">
              <p>Customer output: {record.customerFacingOutputAllowed ? "allowed" : "blocked"}</p>
              <p>Production mutation: {record.productionMutationAllowed ? "allowed" : "blocked"}</p>
              <p>Report release: {record.reportReleaseAllowed ? "allowed" : "blocked"}</p>
              <p>Delivery email: {record.deliveryEmailAllowed ? "allowed" : "blocked"}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
          <p className="text-sm font-semibold text-cyan-100">Runtime rules</p>
          <div className="mt-4 grid gap-3">
            {runtime.rules.slice(0, 5).map((rule) => (
              <p key={rule} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-xs leading-6 text-slate-300">{rule}</p>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
          <p className="text-sm font-semibold text-cyan-100">Append-only audit events</p>
          <div className="mt-4 grid gap-3">
            {runtime.auditEvents.map((event) => (
              <p key={event} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-xs leading-6 text-slate-300">{event}</p>
            ))}
          </div>
        </div>
      </div>

      <p className="sr-only">
        Agent mission records runtime. Mission records make the agent engine operational reviewable and bounded. Every runtime record must reference the plan intelligence intake record. Every runtime record must show missing inputs, assigned chief agent, assigned sub-agents, structured finding records, chief-agent review state, release-captain review state, blocked claims, and append-only audit events. Runtime records are safe-summary-only. Customer-facing output remains blocked until structured findings exist, source references exist, chief-agent review passes, release-captain review passes, and blocked customer claims are removed or safely limited. {runtime.records.map((record) => `${record.missionRecordId} ${record.planKey} ${record.status} ${record.intakeRecordKey} ${record.assignedChiefAgent} ${record.chiefAgentReview.state} ${record.releaseCaptainReview.state} ${record.nextOperatingAction}`).join(" ")} {runtime.rules.join(" ")} {runtime.auditEvents.join(" ")}
      </p>
    </section>
  );
}
