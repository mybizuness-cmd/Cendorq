import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { SupportRequestForm } from "@/components/customer-support/support-request-form";
import { SupportRequestUpdateForm } from "@/components/customer-support/support-request-update-form";
import { CUSTOMER_SUPPORT_INTAKE_FLOWS, CUSTOMER_SUPPORT_INTAKE_RISK_RULES } from "@/lib/customer-support-intake-architecture";

export const metadata = buildMetadata({
  title: "Start support request | Cendorq",
  description: "Start or safely update a protected Cendorq support request with guarded summaries and no raw secrets or payment data.",
  path: "/dashboard/support/request",
  noIndex: true,
});

const REQUEST_PATHS = [
  { title: "New blocker", href: "#new-support-request", copy: "Submit the narrowest safe summary for a new issue." },
  { title: "Asked for context", href: "#support-request-update", copy: "Update only when status asks for safer detail." },
  { title: "Already submitted", href: "/dashboard/support/status", copy: "Track status before creating duplicate requests." },
] as const;

const SAFE_SUMMARY_RULES = [
  "Say what happened, which area it affects, and what help you need.",
  "Do not paste passwords, card numbers, bank details, private keys, raw tokens, session tokens, or admin keys.",
  "Do not paste raw attack strings, prompt-injection text, raw evidence dumps, or private report internals.",
  "After submission, track status and notifications instead of creating duplicate requests.",
] as const;

export default function SupportRequestPage() {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-5 text-white sm:px-6 md:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(103,232,249,0.12),transparent_34%)]" />

      <section className="system-panel-authority relative z-10 overflow-hidden rounded-[1.55rem] p-4 shadow-[0_28px_110px_rgba(2,8,23,0.42)] sm:rounded-[1.8rem] sm:p-8">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />
        <div className="grid gap-5 lg:grid-cols-[1fr_20rem] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Protected support intake</p>
            <h1 className="mt-3 max-w-5xl text-3xl font-semibold tracking-tight text-white sm:mt-4 sm:text-5xl">Send the safe summary that moves the blocker forward.</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:mt-5 sm:text-base sm:leading-8">
              Support intake should collect enough context to help without turning into a private data dump, duplicate request loop, or plan-expansion shortcut.
            </p>
          </div>
          <div className="rounded-[1.25rem] border border-cyan-300/20 bg-cyan-300/10 p-4 sm:p-5">
            <div className="text-sm font-semibold text-cyan-100">After submit</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Track status first.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-200">Duplicate requests create noise. Status and notifications show what happens next.</p>
            <Link href="/dashboard/support/status" className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">Track status</Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-5 grid gap-3 md:grid-cols-3" aria-label="Support request paths">
        {REQUEST_PATHS.map((item) => (
          <Link key={item.title} href={item.href} className="system-surface rounded-[1.25rem] p-4 transition hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950 sm:p-5">
            <h2 className="text-xl font-semibold tracking-tight text-white">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{item.copy}</p>
          </Link>
        ))}
      </section>

      <section id="new-support-request" className="relative z-10 mt-7 grid scroll-mt-8 gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <SupportRequestForm />
        <aside className="system-surface rounded-[1.45rem] p-4 sm:p-5">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Safe summary only.</h2>
          <div className="mt-4 grid gap-3">
            {SAFE_SUMMARY_RULES.map((rule) => (
              <p key={rule} className="rounded-[1rem] border border-white/10 bg-black/20 p-3 text-sm leading-6 text-slate-300">{rule}</p>
            ))}
          </div>
        </aside>
      </section>

      <section id="support-request-update" className="relative z-10 mt-7 grid scroll-mt-8 gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <SupportRequestUpdateForm />
        <aside className="system-surface rounded-[1.45rem] p-4 sm:p-5">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Update only when asked.</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">Use update mode only when the status page asks for safer customer context. Approved updates return the request to protected review.</p>
          <Link href="/dashboard/support/status" className="mt-5 inline-flex text-sm font-semibold text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">Check status first →</Link>
        </aside>
      </section>

      <section className="sr-only" aria-label="Support request guardrails">
        Protected support intake. Send the safe summary that moves the blocker forward. Safe summary only. Update only when asked. No duplicate requests. No private data dump. No plan-expansion shortcut. Track status first. {SAFE_SUMMARY_RULES.join(" ")} {REQUEST_PATHS.map((item) => `${item.title} ${item.copy} ${item.href}`).join(" ")} {CUSTOMER_SUPPORT_INTAKE_FLOWS.map((flow) => `${flow.key} ${flow.label} ${flow.primaryOutcome} ${flow.purpose} ${flow.requiredGuards.join(" ")}`).join(" ")} {CUSTOMER_SUPPORT_INTAKE_RISK_RULES.map((rule) => `${rule.key} ${rule.decision} ${rule.customerMessage}`).join(" ")}
      </section>
    </main>
  );
}
