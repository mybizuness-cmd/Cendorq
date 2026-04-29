import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Support and corrections | Cendorq",
  description: "Your private Cendorq support center for report questions, corrections, billing help, security review, and plan guidance.",
  path: "/dashboard/support",
  noIndex: true,
});

const SUPPORT_FIRST_USE_SNAPSHOT = [
  { label: "Help path", value: "Choose the right route", detail: "Customers should know whether they need report help, correction review, billing help, security review, or plan guidance." },
  { label: "Submission posture", value: "Safe summary only", detail: "Support should receive useful context without passwords, payment details, secrets, raw private evidence, or unnecessary payloads." },
  { label: "Status posture", value: "Track without internals", detail: "Status should show customer-safe progress, next actions, and hold reasons without internal notes or operator details." },
  { label: "Promise posture", value: "Approved outcomes only", detail: "Support copy must not promise refunds, legal outcomes, report changes, billing changes, or security outcomes without approval." },
] as const;

const SUPPORT_FIRST_USE_ACTIONS = [
  { title: "Start request", copy: "Use the protected intake when you need help or review.", href: "/dashboard/support/request" },
  { title: "Track status", copy: "Use status tracking when you already submitted a request.", href: "/dashboard/support/status" },
  { title: "Check alerts", copy: "Use notifications for support receipts and next actions.", href: "/dashboard/notifications" },
] as const;

const SUPPORT_FIRST_USE_RULES = [
  "Pick the narrowest help path that matches the problem before submitting a request.",
  "Do not submit passwords, card numbers, private keys, session tokens, raw attack strings, or unrelated private evidence.",
  "Waiting-on-customer states should ask for safe clarifications without echoing rejected unsafe content.",
  "Support can explain process, status, and next steps, but approved outcomes require the proper review gate.",
] as const;

const SUPPORT_PATHS = [
  {
    label: "Report question",
    title: "Ask about a report section",
    copy: "Use this path when you need help understanding a finding, score, confidence label, visual, limitation, or recommendation.",
    guard: "Answers must stay tied to approved report records and cannot invent evidence or change conclusions without review.",
  },
  {
    label: "Correction request",
    title: "Request a correction review",
    copy: "Use this when you believe business information, evidence, a section explanation, or report context may need review.",
    guard: "Corrections require a safe summary, review record, and release gate before customer-facing changes are made.",
  },
  {
    label: "Billing help",
    title: "Resolve billing or plan questions",
    copy: "Use this for invoices, plan status, entitlement questions, failed payments, upgrades, or billing portal guidance.",
    guard: "Billing help must verify entitlement state and cannot promise refunds or billing changes without approval.",
  },
  {
    label: "Security concern",
    title: "Report account or access concern",
    copy: "Use this if a device, session, email, login, or account access event seems suspicious or needs reauthentication.",
    guard: "Security review must avoid exposing attacker details, risk scoring internals, secrets, or raw security payloads.",
  },
  {
    label: "Plan guidance",
    title: "Ask which plan fits next",
    copy: "Use this when you want help understanding Deep Review, Build Fix, Ongoing Control, or whether to wait.",
    guard: "Plan guidance must be stage-aware, evidence-backed, and free from fake urgency or guaranteed outcome claims.",
  },
] as const;

const SUPPORT_SAFETY_RULES = [
  "Support requires customer ownership and route authorization.",
  "Support messages should use safe summaries, not raw evidence, secrets, passwords, billing IDs, or private report internals.",
  "Correction requests must stay review-gated before any report change is shown to the customer.",
  "Billing, refund, legal, or report outcome promises require approval before being stated as commitments.",
] as const;

export default function SupportCenterPage() {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-8 text-white sm:px-6 md:py-12 xl:py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(103,232,249,0.12),transparent_34%),radial-gradient(circle_at_84%_12%,rgba(14,165,233,0.1),transparent_30%)]" />

      <section className="system-panel-authority relative z-10 rounded-[2.5rem] p-6 sm:p-10">
        <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">Support and corrections</div>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Get help without losing the proof trail.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
          Cendorq support is designed for report questions, correction requests, billing help, account security, and plan guidance while preserving audit records, safe summaries, support visibility, and approval boundaries.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/dashboard/support/request" className="rounded-2xl bg-cyan-300 px-5 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
            Start protected request
          </Link>
          <Link href="/dashboard/support/status" className="rounded-2xl border border-cyan-300/25 px-5 py-3 text-center text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
            View support status
          </Link>
          <Link href="/dashboard" className="rounded-2xl border border-white/10 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
            Back to dashboard
          </Link>
          <Link href="/dashboard/notifications" className="rounded-2xl border border-white/10 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
            Open notification center
          </Link>
        </div>
      </section>

      <section className="relative z-10 mt-8 grid gap-4 lg:grid-cols-4" aria-label="Support center first use snapshot">
        {SUPPORT_FIRST_USE_SNAPSHOT.map((item) => (
          <article key={item.label} className="system-surface rounded-[1.5rem] p-5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">{item.label}</div>
            <h2 className="mt-3 text-xl font-semibold tracking-tight text-white">{item.value}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-8 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]" aria-label="Support center first use guidance">
        <article className="system-panel-authority rounded-[2rem] p-6 sm:p-8">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">First support visit</div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">Choose the safest path before sending details.</h2>
          <p className="mt-4 text-base leading-8 text-slate-300">
            The support center should help customers get useful help while keeping sensitive submissions minimized, correction paths review-gated, and status follow-through visible.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {SUPPORT_FIRST_USE_ACTIONS.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-[1.2rem] border border-white/10 bg-white/[0.035] p-4 text-sm leading-7 text-slate-200 transition hover:border-cyan-300/30 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
                <span className="block font-semibold text-white">{item.title}</span>
                <span className="mt-2 block">{item.copy}</span>
              </Link>
            ))}
          </div>
        </article>
        <article className="system-surface rounded-[2rem] p-6 sm:p-8">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">First-use rules</div>
          <div className="mt-5 grid gap-3">
            {SUPPORT_FIRST_USE_RULES.map((rule) => (
              <div key={rule} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-slate-200">
                {rule}
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="relative z-10 mt-8 grid gap-4 lg:grid-cols-5">
        {SUPPORT_PATHS.map((path) => (
          <article key={path.label} className="system-surface rounded-[1.5rem] p-5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">{path.label}</div>
            <h2 className="mt-4 text-xl font-semibold tracking-tight text-white">{path.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{path.copy}</p>
            <p className="mt-4 rounded-[1.25rem] border border-cyan-300/15 bg-cyan-300/10 p-4 text-xs leading-6 text-cyan-50">{path.guard}</p>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-8 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="system-panel-authority rounded-[2rem] p-6">
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">Start a protected request</div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">Use a safe support summary.</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            The support form should collect request type, business context, affected report or billing area, and a safe customer description. It should not ask customers to paste passwords, raw tokens, payment details, or unrelated secrets.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              "Report or correction request",
              "Billing or entitlement help",
              "Security or access review",
              "Plan guidance or next step",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-200">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/support/request" className="inline-flex rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Open protected request intake
            </Link>
            <Link href="/dashboard/support/status" className="inline-flex rounded-2xl border border-cyan-300/25 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              Track request status
            </Link>
          </div>
        </article>

        <aside className="system-surface rounded-[2rem] p-6">
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">Support safety rules</div>
          <div className="mt-5 grid gap-3">
            {SUPPORT_SAFETY_RULES.map((rule) => (
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
