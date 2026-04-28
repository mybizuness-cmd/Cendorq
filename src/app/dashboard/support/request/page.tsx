import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { SupportRequestForm } from "@/components/customer-support/support-request-form";
import { CUSTOMER_SUPPORT_INTAKE_FLOWS, CUSTOMER_SUPPORT_INTAKE_RISK_RULES } from "@/lib/customer-support-intake-architecture";

export const metadata = buildMetadata({
  title: "Start support request | Cendorq",
  description: "Start a protected Cendorq support request with safe summaries, guarded categories, and no raw secrets or payment data.",
  path: "/dashboard/support/request",
  noIndex: true,
});

const SAFETY_BANNERS = [
  "Do not paste passwords, raw tokens, secret keys, private keys, or payment details.",
  "Do not paste raw evidence dumps, raw security payloads, or private report internals.",
  "Correction, refund, billing, report-change, legal, or outcome commitments require the correct approval path.",
] as const;

export default function SupportRequestPage() {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-8 text-white sm:px-6 md:py-12 xl:py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(103,232,249,0.12),transparent_34%),radial-gradient(circle_at_84%_12%,rgba(14,165,233,0.1),transparent_30%)]" />

      <section className="system-panel-authority relative z-10 rounded-[2.5rem] p-6 sm:p-10">
        <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">Protected support intake</div>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Start with a safe summary, then route the request correctly.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
          Cendorq support intake is designed to collect enough context to help without accepting passwords, raw tokens, payment data, secrets, raw evidence dumps, raw security payloads, or private report internals.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/dashboard/support" className="rounded-2xl bg-cyan-300 px-5 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-cyan-200">
            Back to support center
          </Link>
          <Link href="/dashboard" className="rounded-2xl border border-white/10 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10">
            Back to dashboard
          </Link>
        </div>
      </section>

      <section className="relative z-10 mt-8 grid gap-4 lg:grid-cols-5">
        {CUSTOMER_SUPPORT_INTAKE_FLOWS.map((flow) => (
          <article key={flow.key} className="system-surface rounded-[1.5rem] p-5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">{flow.label}</div>
            <h2 className="mt-4 text-xl font-semibold tracking-tight text-white">{flow.primaryOutcome}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{flow.purpose}</p>
            <div className="mt-4 rounded-[1.25rem] border border-cyan-300/15 bg-cyan-300/10 p-4 text-xs leading-6 text-cyan-50">
              {flow.requiredGuards.slice(0, 3).join(" • ")}
            </div>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <SupportRequestForm />

        <aside className="grid gap-5">
          <article className="system-surface rounded-[2rem] p-6">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">Safety before submit</div>
            <div className="mt-5 grid gap-3">
              {SAFETY_BANNERS.map((banner) => (
                <div key={banner} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-7 text-slate-200">
                  {banner}
                </div>
              ))}
            </div>
          </article>

          <article className="system-surface rounded-[2rem] p-6">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">Risk routing</div>
            <div className="mt-5 grid gap-3">
              {CUSTOMER_SUPPORT_INTAKE_RISK_RULES.map((rule) => (
                <div key={rule.key} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="text-sm font-semibold text-white">{rule.decision}</div>
                  <p className="mt-2 text-xs leading-6 text-slate-400">{rule.customerMessage}</p>
                </div>
              ))}
            </div>
          </article>
        </aside>
      </section>
    </main>
  );
}
