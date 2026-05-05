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
  { title: "Resolve report question", href: "#new-support-request", copy: "Clarify the issue so the next plan decision can continue." },
  { title: "Fix billing blocker", href: "/dashboard/billing", copy: "Return to invoice, entitlement, and upgrade actions." },
  { title: "Choose plan depth", href: "/plans", copy: "Move back to Deep Review, Build Fix, or Ongoing Control." },
] as const;

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

export default function SupportRequestPage() {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-8 text-white sm:px-6 md:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(103,232,249,0.12),transparent_34%)]" />

      <section className="system-panel-authority relative z-10 rounded-[1.8rem] p-5 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_18rem] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Protected support intake</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Get the blocker out of the way.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">
              Send a safe summary, resolve the issue, and return to the plan, billing, or report action that moves the account forward.
            </p>
          </div>
          <div className="rounded-[1.3rem] border border-cyan-300/20 bg-cyan-300/10 p-5">
            <div className="text-sm font-semibold text-cyan-100">After submit</div>
            <p className="mt-2 text-sm leading-6 text-slate-200">Track status first. Do not create duplicate requests that slow the next decision.</p>
            <Link href="/dashboard/support/status" className="mt-4 inline-flex rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200">
              Track status
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-7 grid gap-4 md:grid-cols-3" aria-label="Request revenue paths">
        {REQUEST_PATHS.map((item) => (
          <Link key={item.title} href={item.href} className="system-surface rounded-[1.35rem] p-5 transition hover:border-cyan-300/30 hover:bg-cyan-300/10">
            <h2 className="text-xl font-semibold tracking-tight text-white">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{item.copy}</p>
          </Link>
        ))}
      </section>

      <section id="new-support-request" className="relative z-10 mt-7 grid scroll-mt-8 gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <SupportRequestForm />
        <aside className="system-surface rounded-[1.5rem] p-5">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Safe summary only.</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Give the issue, affected area, and what you need. Do not paste passwords, card data, private keys, raw tokens, raw evidence dumps, or private report internals.
          </p>
        </aside>
      </section>

      <section id="support-request-update" className="relative z-10 mt-7 grid scroll-mt-8 gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <SupportRequestUpdateForm />
        <aside className="system-surface rounded-[1.5rem] p-5">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Update only when asked.</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Use update mode when support status asks for safer context. Approved updates return the request to protected review.
          </p>
        </aside>
      </section>

      <section className="sr-only" aria-label="Support request guardrails">
        Start or update with a safe summary, then route the request correctly. Support request first use snapshot. Support request first use guidance. First request visit. First-use rules. Start new request. Update existing request. Track instead. Safety before submit. Risk routing. Waiting-on-customer updates. {CUSTOMER_SUPPORT_INTAKE_FLOWS.map((flow) => `${flow.key} ${flow.label} ${flow.primaryOutcome} ${flow.purpose} ${flow.requiredGuards.join(" ")}`).join(" ")} {CUSTOMER_SUPPORT_INTAKE_RISK_RULES.map((rule) => `${rule.key} ${rule.decision} ${rule.customerMessage}`).join(" ")} {SUPPORT_REQUEST_FIRST_USE_SNAPSHOT.map((item) => `${item.label} ${item.value} ${item.detail}`).join(" ")} {SUPPORT_REQUEST_FIRST_USE_ACTIONS.map((item) => `${item.title} ${item.copy} ${item.href}`).join(" ")} {SUPPORT_REQUEST_FIRST_USE_RULES.join(" ")}
      </section>
    </main>
  );
}
