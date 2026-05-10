import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { SupportRequestForm } from "@/components/customer-support/support-request-form";
import { SupportRequestUpdateForm } from "@/components/customer-support/support-request-update-form";
import { CUSTOMER_SUPPORT_INTAKE_FLOWS, CUSTOMER_SUPPORT_INTAKE_RISK_RULES } from "@/lib/customer-support-intake-architecture";
import { BEST_OF_BEST_OPERATING_STANDARD } from "@/lib/best-of-best-operating-standard";

export const metadata = buildMetadata({
  title: "Readiness resolution intake | Cendorq",
  description: "Start or safely update a protected Cendorq support request with guarded summaries, no raw secrets, no payment data, and no duplicate request anxiety.",
  path: "/dashboard/support/request",
  noIndex: true,
});

const REQUEST_PATHS = [
  { title: "New blocker", href: "#new-support-request", copy: "Submit the narrowest safe summary for a new issue." },
  { title: "Asked for context", href: "#support-request-update", copy: "Update only when status asks for safer detail." },
  { title: "Already submitted", href: "/dashboard/support/status", copy: "Track status before creating duplicate requests." },
  { title: "Missed message", href: "/dashboard/notifications", copy: "Recover mirrored dashboard messages before opening a new request." },
  { title: "Document question", href: "/dashboard/reports", copy: "Check report vault state before asking for a PDF, attachment, or correction." },
  { title: "Billing document", href: "/dashboard/billing", copy: "Check provider-backed billing state before sending payment-support details." },
] as const;

const BEST_REQUEST_STANDARD = [
  { title: "Acknowledge the blocker", copy: "The request should tell Cendorq what happened, what surface it affected, and what help the customer needs without dumping private internals." },
  { title: "Choose source first", copy: "If the answer already belongs in status, notifications, report vault, or billing center, use that source before opening another request." },
  { title: "One safe update", copy: "When Cendorq asks for context, send the narrow update requested by status instead of reopening the same issue." },
  { title: "No scope shortcut", copy: "Support intake cannot turn Free Scan into AI Readiness Review, Review into Signal Repair, or Control into unlimited implementation." },
] as const;

const SAFE_SUMMARY_RULES = [
  "Say what happened, which area it affects, and what help you need.",
  "Do not paste passwords, card numbers, bank details, private keys, raw tokens, session tokens, admin keys, or provider secrets.",
  "Do not paste raw attack strings, prompt-injection text, raw evidence dumps, raw billing payloads, or private report internals.",
  "Check status, notifications, report vault, or billing center before creating duplicate requests.",
  "Use support to clarify process, status, corrections, and safe next actions—not to bypass plan scope, release gates, or document safety.",
] as const;

export default function SupportRequestPage() {
  return (
    <main className="relative isolate overflow-hidden text-white">
      <RequestAtmosphere />

      <section className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-[92rem] gap-8 px-4 pb-12 pt-6 sm:px-6 md:pb-18 md:pt-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <div className="relative z-10">
          <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-100 shadow-[0_0_60px_rgba(34,211,238,0.12)]">
            Readiness resolution intake
          </div>
          <h1 className="mt-6 max-w-5xl text-[clamp(3.2rem,7.3vw,7.5rem)] font-semibold leading-[0.84] tracking-[-0.08em] text-white">
            Send the safe summary that moves the blocker forward.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl sm:leading-9">
            Intake should acknowledge the issue, collect only the context needed to help, route customers to the source of truth when it already exists, and avoid turning support into a private data dump, duplicate loop, or readiness-depth shortcut.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="#new-support-request" className="inline-flex min-h-14 items-center justify-center rounded-full bg-cyan-200 px-9 py-4 text-base font-black text-slate-950 shadow-[0_22px_80px_rgba(103,232,249,0.24)] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Start safe request
            </Link>
            <Link href="/dashboard/support/status" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-9 py-4 text-base font-bold text-white shadow-[0_18px_70px_rgba(2,8,23,0.32)] transition hover:border-cyan-200/40 hover:bg-cyan-200/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              Track status first
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.7rem] border border-cyan-200/22 bg-[radial-gradient(circle_at_50%_0%,rgba(103,232,249,0.2),transparent_36%),linear-gradient(145deg,rgba(8,47,73,0.9),rgba(2,8,23,0.98)_52%,rgba(14,116,144,0.32))] p-5 shadow-[0_55px_200px_rgba(2,8,23,0.72)] sm:p-7">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent" />
          <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-100">After submit</p>
          <h2 className="mt-4 text-5xl font-semibold tracking-[-0.07em] text-white sm:text-6xl">Track status first.</h2>
          <p className="mt-5 text-base leading-8 text-slate-300">Duplicate requests create noise. Status, notifications, report vault, and billing center show what happens next.</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {REQUEST_PATHS.slice(1, 3).map((item) => (
              <Link key={item.title} href={item.href} className="rounded-[1.6rem] border border-white/10 bg-black/24 p-5 transition hover:border-cyan-200/30 hover:bg-cyan-200/[0.08]">
                <div className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-100">{item.title}</div>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.copy}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Best support request standard">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {BEST_REQUEST_STANDARD.map((item) => (
            <article key={item.title} className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_24px_90px_rgba(2,8,23,0.34)]">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-100">Best-of-best intake</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">{item.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Support request paths">
        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
          {REQUEST_PATHS.map((item, index) => (
            <Link key={item.title} href={item.href} className={index === 0 ? "rounded-[2rem] border border-cyan-200/22 bg-cyan-200/[0.09] p-6 shadow-[0_28px_100px_rgba(2,8,23,0.42)] md:-mt-6 md:mb-6" : "rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_24px_90px_rgba(2,8,23,0.34)] transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950"}>
              <h2 className="text-3xl font-semibold tracking-[-0.055em] text-white">{item.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">{item.copy}</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="new-support-request" className="relative mx-auto grid max-w-[92rem] scroll-mt-8 gap-6 px-4 pb-10 sm:px-6 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="rounded-[2.5rem] border border-cyan-300/15 bg-[linear-gradient(135deg,rgba(8,47,73,0.72),rgba(2,8,23,0.94)_46%,rgba(14,116,144,0.22))] p-4 shadow-[0_45px_180px_rgba(2,8,23,0.55)] sm:p-6">
          <SupportRequestForm />
        </div>
        <aside className="rounded-[2.5rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_24px_90px_rgba(2,8,23,0.34)] sm:p-8">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-100">Safe summary only</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-0.055em] text-white sm:text-5xl">Enough context. No secrets.</h2>
          <div className="mt-6 grid gap-3">
            {SAFE_SUMMARY_RULES.map((rule) => (
              <p key={rule} className="rounded-[1.35rem] border border-white/10 bg-black/25 p-4 text-sm font-semibold leading-7 text-slate-300">{rule}</p>
            ))}
          </div>
        </aside>
      </section>

      <section id="support-request-update" className="relative mx-auto grid max-w-[92rem] scroll-mt-8 gap-6 px-4 pb-16 sm:px-6 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="rounded-[2.5rem] border border-cyan-300/15 bg-[linear-gradient(135deg,rgba(8,47,73,0.72),rgba(2,8,23,0.94)_46%,rgba(14,116,144,0.22))] p-4 shadow-[0_45px_180px_rgba(2,8,23,0.55)] sm:p-6">
          <SupportRequestUpdateForm />
        </div>
        <aside className="rounded-[2.5rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_24px_90px_rgba(2,8,23,0.34)] sm:p-8">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-100">Update only when asked</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-0.055em] text-white sm:text-5xl">Do not create duplicate noise.</h2>
          <p className="mt-5 text-sm leading-7 text-slate-300">Use update mode only when the status page asks for safer customer context. Approved updates return the request to protected review.</p>
          <Link href="/dashboard/support/status" className="mt-6 inline-flex text-sm font-bold text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">Check status first →</Link>
        </aside>
      </section>

      <section className="sr-only" aria-label="Support request guardrails">
        Readiness resolution intake. Best-of-best intake. Acknowledge the blocker. Choose source first. One safe update. No scope shortcut. Send the safe summary that moves the blocker forward. Safe summary only. Update only when asked. No duplicate requests. No private data dump. No readiness-depth shortcut. Track status first. Report vault first. Billing center first. Dashboard message recovery. {BEST_REQUEST_STANDARD.map((item) => `${item.title} ${item.copy}`).join(" ")} {SAFE_SUMMARY_RULES.join(" ")} {REQUEST_PATHS.map((item) => `${item.title} ${item.copy} ${item.href}`).join(" ")} {CUSTOMER_SUPPORT_INTAKE_FLOWS.map((flow) => `${flow.key} ${flow.label} ${flow.primaryOutcome} ${flow.purpose} ${flow.requiredGuards.join(" ")}`).join(" ")} {CUSTOMER_SUPPORT_INTAKE_RISK_RULES.map((rule) => `${rule.key} ${rule.decision} ${rule.customerMessage}`).join(" ")} {BEST_OF_BEST_OPERATING_STANDARD.nonNegotiableQualityBar.join(" ")} {BEST_OF_BEST_OPERATING_STANDARD.researchInspiredPrinciples.map((principle) => `${principle.sourcePattern} ${principle.cendorqRule}`).join(" ")}
      </section>
    </main>
  );
}

function RequestAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(103,232,249,0.16),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.11),transparent_27%),linear-gradient(180deg,#020617_0%,#020817_42%,#030712_100%)]" />
      <div className="absolute left-1/2 top-0 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-cyan-300/[0.04] blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.018]" />
    </div>
  );
}
