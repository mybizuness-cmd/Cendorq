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

const SUPPORT_STATUS_FIRST_USE_SNAPSHOT = [
  { label: "Progress meaning", value: "Customer-safe status", detail: "Every status should explain what is happening without exposing internal notes, operator details, or risk mechanics." },
  { label: "Communication posture", value: "Send, hold, or suppress", detail: "Communication plans should explain customer-safe channels and next paths without leaking internal hold logic." },
  { label: "Action posture", value: "One clear next step", detail: "When customer input is needed, the page should point to a safe request or resubmission path." },
  { label: "Privacy posture", value: "No raw content", detail: "Status tracking should never reveal raw evidence, security payloads, billing data, secrets, prompts, or tokens." },
] as const;

const SUPPORT_STATUS_FIRST_USE_ACTIONS = [
  { title: "Review current status", copy: "Start with the live card list below before sending another request.", href: "#support-status-list" },
  { title: "Send safe update", copy: "Use protected intake when status asks for customer context.", href: "/dashboard/support/request" },
  { title: "Return to support", copy: "Use the support center if you need a different path.", href: "/dashboard/support" },
] as const;

const SUPPORT_STATUS_FIRST_USE_RULES = [
  "Received means Cendorq has the request and can show a customer-safe tracking path.",
  "Waiting on customer should ask for safe clarification without echoing rejected unsafe content.",
  "Resolved and closed statuses should explain process completion without guaranteeing unsupported outcomes.",
  "Communication plans may show safe channels, next paths, and required guards, not internal risk details or raw records.",
] as const;

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
          <Link href="/dashboard/support/request" className="rounded-2xl bg-cyan-300 px-5 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
            Start protected request
          </Link>
          <Link href="/dashboard/support" className="rounded-2xl border border-white/10 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
            Back to support center
          </Link>
        </div>
      </section>

      <section className="relative z-10 mt-8 grid gap-4 lg:grid-cols-4" aria-label="Support status first use snapshot">
        {SUPPORT_STATUS_FIRST_USE_SNAPSHOT.map((item) => (
          <article key={item.label} className="system-surface rounded-[1.5rem] p-5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">{item.label}</div>
            <h2 className="mt-3 text-xl font-semibold tracking-tight text-white">{item.value}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-8 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]" aria-label="Support status first use guidance">
        <article className="system-panel-authority rounded-[2rem] p-6 sm:p-8">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">First status visit</div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">Understand the status before sending more details.</h2>
          <p className="mt-4 text-base leading-8 text-slate-300">
            Status tracking should reduce duplicate anxiety: show safe progress, explain customer action paths, and keep communication decisions understandable without exposing internal handling mechanics.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {SUPPORT_STATUS_FIRST_USE_ACTIONS.map((item) => (
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
            {SUPPORT_STATUS_FIRST_USE_RULES.map((rule) => (
              <div key={rule} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-slate-200">
                {rule}
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="relative z-10 mt-8 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        {CUSTOMER_SUPPORT_STATUS_CONTRACTS.map((status) => (
          <article key={status.key} className="system-surface rounded-[1.5rem] p-5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">{status.label}</div>
            <p className="mt-3 text-sm leading-7 text-slate-300">{status.customerMeaning}</p>
          </article>
        ))}
      </section>

      <section id="support-status-list" className="relative z-10 mt-8 scroll-mt-8">
        <SupportStatusList />
      </section>
    </main>
  );
}
