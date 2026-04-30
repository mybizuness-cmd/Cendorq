const CONTROL_RAILS = [
  {
    title: "Admin-only access",
    copy: "Command center controls require private operator access, production authorization, and closed-by-default route posture before any internal panel is visible.",
  },
  {
    title: "Approval gates",
    copy: "Report corrections, billing changes, security outcomes, customer-visible status changes, and AI-assisted outputs require explicit approval posture before release.",
  },
  {
    title: "Safe internal notes",
    copy: "Internal notes are for operator reasoning, triage, and audit context only; they must never be projected directly into customer dashboard, email, notification, report, or support views.",
  },
  {
    title: "Audit preservation",
    copy: "Audit records remain preserved for accountability, correction history, access review, and incident reconstruction. Customer copy must never imply required audit records are deleted.",
  },
] as const;

const RELEASE_GATES = [
  "Customer-owned safe projection exists before any customer-visible update.",
  "Protected session, role, and route authorization are verified before operator actions.",
  "Billing actions avoid refund, entitlement, payment, or plan-change promises without approved provider state.",
  "Security reviews avoid exposing attacker details, detection internals, raw payloads, or unsupported outcome claims.",
  "Report changes preserve audit proof while separating facts, assumptions, inferences, limitations, and next actions.",
  "AI-assisted output remains advisory until reviewed, approved, logged, and bounded by customer-safe copy rules.",
] as const;

const BLOCKED_PROJECTIONS = [
  "raw payloads",
  "raw evidence",
  "raw security payloads",
  "raw billing data",
  "internal notes",
  "operator identities",
  "risk-scoring internals",
  "attacker details",
  "system prompts",
  "developer messages",
  "passwords, secrets, private keys, session tokens, CSRF tokens, admin keys, or support context keys",
] as const;

export function OperatorControlInterfacePanel() {
  return (
    <section className="mt-10 rounded-[2rem] border border-cyan-300/15 bg-cyan-300/[0.035] p-6 shadow-2xl shadow-cyan-950/20 md:p-8" aria-label="Operator control interface elevation">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Operator control interface</p>
          <h2 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Every internal action needs access, approval, audit, and projection control.
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-slate-400">
          This command layer is intentionally not a customer surface. It centralizes safe operator control while preventing internal notes, secrets, risk internals, billing internals, security details, or unapproved promises from reaching customers.
        </p>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {CONTROL_RAILS.map((rail) => (
          <article key={rail.title} className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
            <h3 className="text-lg font-semibold tracking-tight text-white">{rail.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">{rail.copy}</p>
          </article>
        ))}
      </div>

      <div className="mt-7 grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
        <article className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
          <h3 className="text-lg font-semibold tracking-tight text-white">Required release gates</h3>
          <div className="mt-4 grid gap-3">
            {RELEASE_GATES.map((gate) => (
              <div key={gate} className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm leading-6 text-slate-300">
                {gate}
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-red-200/10 bg-red-200/[0.03] p-5">
          <h3 className="text-lg font-semibold tracking-tight text-white">Blocked customer projections</h3>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            The command center may help operators review sensitive context, but customer-facing projections must stay sanitized, bounded, and approved.
          </p>
          <div className="mt-4 grid gap-2">
            {BLOCKED_PROJECTIONS.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm leading-6 text-slate-300">
                {item}
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
