import Link from "next/link";

import { OperatorSafeSummaryConsole } from "@/components/customer-support/operator-safe-summary-console";
import { CUSTOMER_SUPPORT_OPERATOR_CONSOLE_CONTRACT, CUSTOMER_SUPPORT_OPERATOR_CONSOLE_GUARDS } from "@/lib/customer-support-operator-console-contracts";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Support operator console | Cendorq",
  description: "Read-only support operator console for safe summaries, audit-aware review, and protected support triage.",
  path: "/admin/support",
  noIndex: true,
});

const READ_ONLY_RULES = [
  "This first operator console surface is read-only and uses safe-summary-only projection.",
  "Assignment, approval, correction, billing, security, and closure actions are intentionally not available here.",
  "Operator access is gated by server-side role/session checks and each authorized read is audit-recorded.",
  "Raw payloads, raw evidence, raw security payloads, raw billing data, payment data, customer hashes, internal notes, operator identities, risk internals, attacker details, prompts, secrets, session tokens, CSRF tokens, admin keys, and support context keys are not rendered.",
] as const;

export default function SupportOperatorConsolePage() {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-8 text-white sm:px-6 md:py-12 xl:py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(103,232,249,0.12),transparent_34%),radial-gradient(circle_at_84%_12%,rgba(14,165,233,0.1),transparent_30%)]" />

      <section className="system-panel-authority relative z-10 rounded-[2.5rem] p-6 sm:p-10">
        <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">Support operator console</div>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Read support safely before any privileged action exists.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
          This page is the first operator-facing support surface: a read-only, audit-aware safe-summary console. It is designed to inspect customer support context without exposing raw data, secrets, internal notes, or customer-visible operator identity.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/dashboard" className="rounded-2xl border border-white/10 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10">
            Customer dashboard
          </Link>
          <Link href="/dashboard/support/status" className="rounded-2xl border border-cyan-300/25 px-5 py-3 text-center text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/10">
            Customer support status
          </Link>
        </div>
      </section>

      <section className="relative z-10 mt-8 grid gap-4 lg:grid-cols-4">
        {READ_ONLY_RULES.map((rule) => (
          <article key={rule} className="system-surface rounded-[1.5rem] p-5 text-sm leading-7 text-slate-200">
            {rule}
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-8 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <article className="system-surface rounded-[2rem] p-6">
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">Contract lock</div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">Closed-by-default operator access.</h2>
          <div className="mt-5 grid gap-3 text-sm leading-7 text-slate-300">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">Route: {CUSTOMER_SUPPORT_OPERATOR_CONSOLE_CONTRACT.route}</div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">Access: {CUSTOMER_SUPPORT_OPERATOR_CONSOLE_CONTRACT.access}</div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">Default mode: {CUSTOMER_SUPPORT_OPERATOR_CONSOLE_CONTRACT.defaultMode}</div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">Projection: {CUSTOMER_SUPPORT_OPERATOR_CONSOLE_CONTRACT.customerProjection}</div>
          </div>
        </article>

        <article className="system-surface rounded-[2rem] p-6">
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">Required guardrails</div>
          <div className="mt-5 grid gap-3">
            {CUSTOMER_SUPPORT_OPERATOR_CONSOLE_GUARDS.slice(0, 4).map((guard) => (
              <div key={guard} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-7 text-slate-200">
                {guard}
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="relative z-10 mt-8">
        <OperatorSafeSummaryConsole />
      </section>
    </main>
  );
}
