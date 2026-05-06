import { getCendorqAgentIntelligencePlaybooks } from "@/lib/cendorq-agent-intelligence-playbooks";

export function CendorqAgentIntelligencePlaybooksPanel() {
  const runtime = getCendorqAgentIntelligencePlaybooks();
  const featured = runtime.playbooks.filter((playbook) => [
    "report-truth-research-scout",
    "conversion-luxury-ui-scout",
    "customer-journey-scout",
    "business-change-forecasting-scout",
  ].includes(playbook.agentKey));

  return (
    <section className="mt-10 rounded-[2rem] border border-cyan-200/15 bg-slate-900/60 p-6 md:p-8" aria-label="Cendorq agent intelligence playbooks">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100">Cendorq agent intelligence playbooks</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Agents now diagnose acquisition, AI visibility, conversion, trust, and forecast risk.</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
            This layer upgrades agents from lane ownership into decision playbooks. Every agent gets source strategy, search procedure, AI-era visibility checks, acquisition diagnosis, forecast posture, rejection rules, confidence scoring, plan adaptations, and blocked customer language.
          </p>
        </div>
        <div className="rounded-3xl border border-cyan-200/20 bg-cyan-200/10 p-4 text-sm leading-6 text-cyan-50 lg:max-w-sm">
          Customer-facing language stays bounded: help the business become easier to find, understand, trust, compare, and choose. Long-term search adaptation remains an internal Cendorq system standard.
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {featured.map((playbook) => (
          <article key={playbook.agentKey} className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100">{playbook.agentKey}</p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">{playbook.mission}</h3>
            </div>
            <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-300">
              <p><span className="font-semibold text-slate-100">Customer problem focus:</span> {playbook.customerProblemFocus.slice(0, 3).join(", ")}</p>
              <p><span className="font-semibold text-slate-100">Sources:</span> {playbook.sourceStrategy.join(", ")}</p>
              <p><span className="font-semibold text-slate-100">AI visibility:</span> {playbook.aiVisibilityProcedure[0]}</p>
              <p><span className="font-semibold text-slate-100">Forecast:</span> {playbook.forecastProcedure[0]}</p>
            </div>
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Required finding shape</p>
              <p className="mt-2 text-sm leading-6 text-slate-200">{playbook.requiredFindingShape.map((shape) => shape.field).join(", ")}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/60 p-5">
        <p className="text-sm font-semibold text-cyan-100">System rules</p>
        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          {runtime.systemRules.map((rule) => (
            <p key={rule} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-xs leading-6 text-slate-300">{rule}</p>
          ))}
        </div>
      </div>

      <p className="sr-only">
        Cendorq agent intelligence playbooks. Agents diagnose customer acquisition, AI-era visibility, trust clarity, offer clarity, conversion friction, evidence quality, and next best action together. Customer-facing promises focus on helping the business become easier to find, understand, trust, compare, and choose. The five-to-ten-year adaptation goal belongs to Cendorq internal system standards, not as a customer guarantee. {runtime.systemRules.join(" ")}
      </p>
    </section>
  );
}
