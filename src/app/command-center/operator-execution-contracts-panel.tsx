import { OPERATOR_EXECUTION_CONTRACTS, OPERATOR_EXECUTION_SAFETY_STANDARD } from "@/lib/command-center/operator-execution-contracts";

export function OperatorExecutionContractsPanel() {
  const releaseCriticalCount = OPERATOR_EXECUTION_CONTRACTS.filter((contract) => contract.riskLevel === "release-critical").length;

  return (
    <section className="mt-10 rounded-3xl border border-cyan-400/20 bg-cyan-950/20 p-6 shadow-2xl shadow-cyan-950/20">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-200">Operator execution contracts</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">Terminal-grade actions need explicit gates.</h2>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-cyan-50/75">
            Metadata-only command contracts for operator actions, state transitions, approval boundaries, audit events, and customer-safe projection rules.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-center sm:grid-cols-3">
          <Metric label="Commands" value={OPERATOR_EXECUTION_CONTRACTS.length} />
          <Metric label="Release-critical" value={releaseCriticalCount} />
          <Metric label="Safety rules" value={OPERATOR_EXECUTION_SAFETY_STANDARD.length} />
        </div>
      </div>

      <div className="mt-6 grid gap-3 lg:grid-cols-2">
        {OPERATOR_EXECUTION_CONTRACTS.map((contract) => (
          <article key={contract.key} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-semibold text-white">{contract.label}</h3>
              <span className="rounded-full border border-cyan-300/30 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-cyan-100">{contract.riskLevel}</span>
            </div>
            <p className="mt-3 text-xs font-medium leading-6 text-cyan-50/70">{contract.customerProjectionRule}</p>
            <div className="mt-4 grid gap-2 text-[11px] font-semibold leading-5 text-cyan-50/65 sm:grid-cols-3">
              <div>Preconditions: {contract.requiredBeforeExecution.length}</div>
              <div>Transitions: {contract.allowedStateTransitions.length}</div>
              <div>Audit events: {contract.auditEvents.length}</div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-cyan-300/20 bg-cyan-900/20 p-4">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-200">Execution safety standard</p>
        <ul className="mt-3 grid gap-2 text-xs font-medium leading-6 text-cyan-50/70 lg:grid-cols-2">
          {OPERATOR_EXECUTION_SAFETY_STANDARD.map((rule) => <li key={rule}>• {rule}</li>)}
        </ul>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-cyan-300/20 bg-white/[0.045] px-4 py-3">
      <div className="text-2xl font-semibold text-white">{value}</div>
      <div className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-100/70">{label}</div>
    </div>
  );
}
