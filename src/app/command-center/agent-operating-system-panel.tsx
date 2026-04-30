import { AGENT_OPERATING_SYSTEM_CONTRACT } from "@/lib/agent-operating-system-contracts";

export function AgentOperatingSystemPanel() {
  const contract = AGENT_OPERATING_SYSTEM_CONTRACT;

  return (
    <section className="mt-10 rounded-[2rem] border border-fuchsia-300/15 bg-fuchsia-300/[0.035] p-6 shadow-2xl shadow-fuchsia-950/20 md:p-8" aria-label="Agent operating system panel">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-fuchsia-200">Agent operating system</p>
          <h2 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Owner command, release-captain final validation, chief agents, and calibrated sub-agents.
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-slate-400">
          Private operator view for the controlled Cendorq agent structure. Agents may scout, research, forecast, and pressure-test, but every output returns to release-captain review before code, copy, launch posture, or report logic becomes real.
        </p>
      </div>

      <div className="mt-7 grid gap-4 lg:grid-cols-4">
        <MetricCard label="Command layers" value={String(contract.commandHierarchy.length)} />
        <MetricCard label="Chief agents" value={String(contract.chiefAgentLanes.length)} />
        <MetricCard label="Sub-agent lanes" value={String(contract.agentLanes.length)} />
        <MetricCard label="Final validator" value="release captain" />
      </div>

      <article className="mt-7 rounded-3xl border border-white/10 bg-slate-950/60 p-5">
        <p className="text-sm font-semibold text-white">Command hierarchy</p>
        <div className="mt-5 grid gap-3 lg:grid-cols-2">
          {contract.commandHierarchy.map((layer) => (
            <div key={layer.key} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold text-slate-100">{layer.title}</p>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">{layer.authority}</span>
              </div>
              <div className="mt-4 grid gap-2">
                {layer.responsibilities.slice(0, 4).map((responsibility) => (
                  <p key={responsibility} className="rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-xs leading-5 text-slate-400">{responsibility}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="mt-7 rounded-3xl border border-white/10 bg-slate-950/60 p-5">
        <p className="text-sm font-semibold text-white">Chief-agent council</p>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          Chief agents coordinate sub-agents inside their domains, reject weak findings, and escalate conflicts. They do not approve merges, launches, provider configuration, payment mapping, report release, or customer-facing claims.
        </p>
        <div className="mt-5 grid gap-3 lg:grid-cols-2">
          {contract.chiefAgentLanes.map((agent) => (
            <div key={agent.key} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <p className="text-sm font-semibold text-slate-100">{agent.title}</p>
              <p className="mt-3 text-sm leading-6 text-slate-400">{agent.mission}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {agent.owns.map((owned) => (
                  <span key={owned} className="rounded-full border border-white/10 bg-slate-950/60 px-3 py-1 text-[11px] font-semibold text-slate-400">{owned}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="mt-7 rounded-3xl border border-white/10 bg-slate-950/60 p-5">
        <p className="text-sm font-semibold text-white">Calibration and final validation</p>
        <div className="mt-5 grid gap-3 lg:grid-cols-2">
          {[...contract.calibrationRules.slice(0, 4), ...contract.finalValidatorRules.slice(0, 4)].map((rule) => (
            <div key={rule} className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm leading-6 text-slate-300">
              {rule}
            </div>
          ))}
        </div>
      </article>

      <article className="mt-7 rounded-3xl border border-white/10 bg-slate-950/60 p-5">
        <p className="text-sm font-semibold text-white">Future forecast lanes</p>
        <div className="mt-5 grid gap-3 lg:grid-cols-2">
          {contract.futureForecastLanes.map((lane) => (
            <div key={lane.key} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <p className="text-sm font-semibold text-slate-100">{lane.key}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-slate-500">{lane.horizon}</p>
              <p className="mt-3 text-sm leading-6 text-slate-400">{lane.focus}</p>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-3 text-2xl font-semibold tracking-tight text-white">{value}</p>
    </article>
  );
}
