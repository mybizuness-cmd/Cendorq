import Link from "next/link";

import { OperatorApprovalList } from "@/components/customer-support/operator-approval-list";
import { OperatorAssignmentList } from "@/components/customer-support/operator-assignment-list";
import { OperatorAssignmentPanel } from "@/components/customer-support/operator-assignment-panel";
import { OperatorSafeSummaryConsole } from "@/components/customer-support/operator-safe-summary-console";
import { CUSTOMER_SUPPORT_OPERATOR_CONSOLE_CONTRACT, CUSTOMER_SUPPORT_OPERATOR_CONSOLE_GUARDS } from "@/lib/customer-support-operator-console-contracts";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Support operator console | Cendorq",
  description: "Support operator console for safe summaries, audit-aware assignment, safe assignment history, safe approval history, and protected support triage.",
  path: "/admin/support",
  noIndex: true,
});

const OPERATOR_RULES = [
  "Safe summaries use safe-summary-only projection.",
  "Assignments require the guarded operator assignment API, fresh reauthentication, and immutable audit creation.",
  "Assignment and approval history use safe projections only.",
  "Correction, billing, security, and closure controls require approval gates and are intentionally separated from read-only history.",
] as const;

export default function SupportOperatorConsolePage() {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-8 text-white sm:px-6 md:py-12 xl:py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(103,232,249,0.12),transparent_34%),radial-gradient(circle_at_84%_12%,rgba(14,165,233,0.1),transparent_30%)]" />

      <section className="system-panel-authority relative z-10 rounded-[2.5rem] p-6 sm:p-10">
        <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">Support operator console</div>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Review, assign, approve, and track support with protected audit controls.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
          This operator-facing support surface provides safe-summary review, guarded assignment, safe approval history, and safe assignment history. It is designed to inspect customer support context and assign review paths without exposing unsafe raw data, private internals, or customer-visible operator identity.
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
        {OPERATOR_RULES.map((rule) => (
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

      <section className="relative z-10 mt-8">
        <OperatorAssignmentPanel />
      </section>

      <section className="relative z-10 mt-8">
        <OperatorAssignmentList />
      </section>

      <section className="relative z-10 mt-8">
        <OperatorApprovalList />
      </section>
    </main>
  );
}
