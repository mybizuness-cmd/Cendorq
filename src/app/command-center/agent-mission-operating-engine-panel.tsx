import { getAgentMissionOperatingEngine } from "@/lib/agent-mission-operating-engine";

export function AgentMissionOperatingEnginePanel() {
  const engine = getAgentMissionOperatingEngine();

  return (
    <section className="mt-10 rounded-[2rem] border border-cyan-200/15 bg-slate-900/60 p-6 md:p-8" aria-label="Agent mission operating engine">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100">Agent mission operating engine</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Plan-triggered missions, structured findings, chief review, captain approval.</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
            This is the operating layer that turns captains, chief agents, and scouts into controlled production intelligence. Missions start from plan intake records, collect structured findings, then wait for chief-agent review and release-captain approval before any customer-safe output.
          </p>
        </div>
        <div className="rounded-3xl border border-cyan-200/20 bg-cyan-200/10 p-4 text-sm leading-6 text-cyan-50 lg:max-w-sm">
          Agents increase depth and speed. They do not approve reports, customer-facing claims, code, launch, paid recommendations, production changes, or delivery emails.
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {engine.planMissions.map((mission) => (
          <article key={mission.missionKey} className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100">{mission.planKey}</p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">{mission.customerMoment}</h3>
              </div>
              <span className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-3 py-1 text-xs font-semibold text-cyan-100">{mission.status}</span>
            </div>
            <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-300">
              <p><span className="font-semibold text-slate-100">Trigger:</span> {mission.trigger}</p>
              <p><span className="font-semibold text-slate-100">Chief:</span> {mission.chiefAgentKey}</p>
              <p><span className="font-semibold text-slate-100">Agents:</span> {mission.assignedAgentKeys.join(", ")}</p>
              <p><span className="font-semibold text-slate-100">Chief gate:</span> {mission.chiefAgentReviewGate}</p>
              <p><span className="font-semibold text-slate-100">Captain gate:</span> {mission.releaseCaptainReviewGate}</p>
            </div>
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Next operating action</p>
              <p className="mt-2 text-sm leading-6 text-slate-200">{mission.nextOperatingAction}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
          <p className="text-sm font-semibold text-cyan-100">Finding record standard</p>
          <div className="mt-4 grid gap-3">
            {engine.planMissions[0]?.structuredFindingSchema.map((field) => (
              <p key={field} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-xs leading-6 text-slate-300">{field}</p>
            ))}
          </div>
          <p className="mt-4 text-xs leading-6 text-slate-400">Every mission expands this schema into verified facts, source refs, assumptions, evidence gaps, confidence, risks, recommendation, and blocked customer claims.</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
          <p className="text-sm font-semibold text-cyan-100">Operating rules</p>
          <div className="mt-4 grid gap-3">
            {engine.missionRules.slice(0, 5).map((rule) => (
              <p key={rule} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-xs leading-6 text-slate-300">{rule}</p>
            ))}
          </div>
        </div>
      </div>

      <p className="sr-only">
        Agent mission operating engine. Plan-triggered missions, structured findings, chief review, captain approval. Every plan-triggered mission must start from a plan intelligence intake record. Every mission assigns one chief agent and scoped sub-agents. Every agent finding must use verified facts, source references, assumptions, evidence gaps, confidence, risks, recommendation, and blocked customer claims. Chief agents may review and consolidate findings, but release-captain approval remains required before customer-facing report, fix, monitoring alert, code, copy, validator output, paid recommendation, or delivery email. {engine.planMissions.map((mission) => `${mission.missionKey} ${mission.planKey} ${mission.trigger} ${mission.chiefAgentKey} ${mission.assignedAgentKeys.join(" ")} ${mission.chiefAgentReviewGate} ${mission.releaseCaptainReviewGate} ${mission.nextOperatingAction} ${mission.blockedShortcuts.join(" ")}`).join(" ")} {engine.missionRules.join(" ")}
      </p>
    </section>
  );
}
