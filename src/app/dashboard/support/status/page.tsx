import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { SupportStatusList } from "@/components/customer-support/support-status-list";
import { CUSTOMER_SUPPORT_STATUS_CONTRACTS } from "@/lib/customer-support-status-contracts";

export const metadata = buildMetadata({
  title: "Support status | Cendorq",
  description: "View customer-safe Cendorq support request status without internal notes, raw evidence, or private security and billing details.",
  path: "/dashboard/support/status",
  noIndex: true,
});

export default function SupportStatusPage() {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-8 text-white sm:px-6 md:py-12 xl:py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(103,232,249,0.12),transparent_34%),radial-gradient(circle_at_84%_12%,rgba(14,165,233,0.1),transparent_30%)]" />

      <section className="system-panel-authority relative z-10 rounded-[2.5rem] p-6 sm:p-10">
        <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">Support status</div>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Track support without exposing internal risk.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
          Cendorq shows only customer-safe support status fields: request ID, request type, safe summary, status, approved copy, and next action. Internal notes, operator identities, risk-scoring internals, raw evidence, raw billing data, session tokens, CSRF tokens, admin keys, and support secrets stay private.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/dashboard/support/request" className="rounded-2xl bg-cyan-300 px-5 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-cyan-200">
            Start protected request
          </Link>
          <Link href="/dashboard/support" className="rounded-2xl border border-white/10 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10">
            Back to support center
          </Link>
        </div>
      </section>

      <section className="relative z-10 mt-8 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        {CUSTOMER_SUPPORT_STATUS_CONTRACTS.map((status) => (
          <article key={status.key} className="system-surface rounded-[1.5rem] p-5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">{status.label}</div>
            <p className="mt-3 text-sm leading-7 text-slate-300">{status.customerMeaning}</p>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-8">
        <SupportStatusList />
      </section>
    </main>
  );
}
