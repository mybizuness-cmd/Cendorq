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

const SUPPORT_REQUEST_FIRST_USE_SNAPSHOT = [
  { label: "Form choice", value: "New or update", detail: "Use the main form for a new request and update mode only when status asks for safer customer context." },
  { label: "Summary posture", value: "Safe context", detail: "A useful request explains what happened, what area is affected, and what help is needed without raw private content." },
  { label: "Risk posture", value: "Guarded intake", detail: "Unsafe submissions should be blocked, minimized, or redirected without echoing rejected raw content." },
  { label: "Follow-through", value: "Track after submit", detail: "Successful submission should point customers to status tracking and notifications instead of duplicate submissions." },
] as const;

const SUPPORT_REQUEST_FIRST_USE_ACTIONS = [
  { title: "Start new request", copy: "Use the protected intake when the issue is new.", href: "#new-support-request" },
  { title: "Update existing request", copy: "Use update mode only when support status asks for it.", href: "#support-request-update" },
  { title: "Track instead", copy: "Check request progress before submitting more detail.", href: "/dashboard/support/status" },
] as const;

const SUPPORT_REQUEST_FIRST_USE_RULES = [
  "Write a safe summary: request type, business context, affected area, and the question or correction needed.",
  "Do not submit passwords, card numbers, bank details, private keys, raw tokens, session tokens, CSRF tokens, or admin keys.",
  "Do not paste raw attack strings, prompt-injection text, raw evidence dumps, raw security payloads, or private report internals.",
  "Use status tracking after submission so duplicate requests do not create confusion or unnecessary support noise.",
] as const;

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
          Start or update with a safe summary, then route the request correctly.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
          Cendorq support intake is designed to collect enough context to help without accepting passwords, raw tokens, payment data, secrets, raw evidence dumps, raw security payloads, private report internals, or rejected raw content echoes.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/dashboard/support" className="rounded-2xl bg-cyan-300 px-5 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
            Back to support center
          </Link>
          <Link href="/dashboard/support/status" className="rounded-2xl border border-cyan-300/25 px-5 py-3 text-center text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
            Track support status
          </Link>
          <Link href="/dashboard" className="rounded-2xl border border-white/10 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
            Back to dashboard
          </Link>
        </div>
      </section>

      <section className="relative z-10 mt-8 grid gap-4 lg:grid-cols-4" aria-label="Support request first use snapshot">
        {SUPPORT_REQUEST_FIRST_USE_SNAPSHOT.map((item) => (
          <article key={item.label} className="system-surface rounded-[1.5rem] p-5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">{item.label}</div>
            <h2 className="mt-3 text-xl font-semibold tracking-tight text-white">{item.value}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-8 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]" aria-label="Support request first use guidance">
        <article className="system-panel-authority rounded-[2rem] p-6 sm:p-8">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">First request visit</div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">Give enough context to help, not enough to create risk.</h2>
          <p className="mt-4 text-base leading-8 text-slate-300">
            The first-use request experience should make the safe path obvious: choose the right request type, write a bounded summary, submit once, then track progress through status and notifications.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {SUPPORT_REQUEST_FIRST_USE_ACTIONS.map((item) => (
              <Link key={item.title} href={item.href} className="rounded-[1.2rem] border border-white/10 bg-white/[0.035] p-4 text-sm leading-7 text-slate-200 transition hover:border-cyan-300/30 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
                <span className="block font-semibold text-white">{item.title}</span>
                <span className="mt-2 block">{item.copy}</span>
              </Link>
            ))}
          </div>
        </article>
        <article className="system-surface rounded-[2rem] p-6 sm:p-8">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">First-use rules</div>
          <div className="mt-5 grid gap-3">
            {SUPPORT_REQUEST_FIRST_USE_RULES.map((rule) => (
              <div key={rule} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-slate-200">
                {rule}
              </div>
            ))}
          </div>
        </article>
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

      <section id="new-support-request" className="relative z-10 mt-8 grid scroll-mt-8 gap-5 lg:grid-cols-[1.1fr_0.9fr]">
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

      <section id="support-request-update" className="relative z-10 mt-8 grid scroll-mt-8 gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <SupportRequestUpdateForm />
        <aside className="system-surface rounded-[2rem] p-6">
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">Waiting-on-customer updates</div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">Use this only when status asks for a safer summary.</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Open this page from support status with <span className="font-semibold text-cyan-100">?update=&lt;request id&gt;</span>. The update path checks customer ownership, verified session access, and waiting-on-customer state before storing a safe summary.
          </p>
          <div className="mt-5 grid gap-3">
            {[
              "Do not paste rejected raw content back into the update form.",
              "Do not include passwords, raw tokens, payment data, secrets, private keys, raw evidence dumps, or raw security payloads.",
              "Approved updates return the request to the protected review path using customer-safe projection only.",
            ].map((rule) => (
              <div key={rule} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-7 text-slate-200">
                {rule}
              </div>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
