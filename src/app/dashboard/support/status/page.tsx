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

const MOMENTUM_ACTIONS = [
  { title: "Send safe update", href: "/dashboard/support/request", copy: "Add context only if support needs it." },
  { title: "Return to billing", href: "/dashboard/billing", copy: "Continue the plan or invoice path once the blocker is clear." },
  { title: "Compare plans", href: "/plans", copy: "Move back to the paid decision when the issue is resolved." },
] as const;

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
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-8 text-white sm:px-6 md:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(103,232,249,0.12),transparent_34%)]" />

      <section className="system-panel-authority relative z-10 rounded-[1.8rem] p-5 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_18rem] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Support status</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Resolve the issue and keep the account moving.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">
              Status should reduce anxiety, show the safest next action, and return the customer to billing, reports, or plan choice as soon as the blocker is clear.
            </p>
          </div>
          <div className="rounded-[1.3rem] border border-cyan-300/20 bg-cyan-300/10 p-5">
            <div className="text-sm font-semibold text-cyan-100">After resolution</div>
            <div className="mt-3 text-2xl font-semibold text-white">Continue the paid path</div>
            <p className="mt-2 text-sm leading-6 text-slate-200">Support should not end the buying journey. It should restore confidence.</p>
            <Link href="/dashboard/billing" className="mt-4 inline-flex rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Open billing
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-7 grid gap-4 md:grid-cols-3" aria-label="Support status momentum actions">
        {MOMENTUM_ACTIONS.map((item) => (
          <Link key={item.href} href={item.href} className="system-surface rounded-[1.35rem] p-5 transition hover:border-cyan-300/30 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
            <h2 className="text-xl font-semibold tracking-tight text-white">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{item.copy}</p>
          </Link>
        ))}
      </section>

      <section id="support-status-list" className="relative z-10 mt-7 scroll-mt-8">
        <SupportStatusList />
      </section>

      <section className="sr-only" aria-label="Support status guardrails">
        Track support without exposing internal risk. Support status first use snapshot. Support status first use guidance. First status visit. First-use rules. Review current status. Start protected request. Back to support center. {CUSTOMER_SUPPORT_STATUS_CONTRACTS.map((status) => `${status.key} ${status.label} ${status.customerMeaning}`).join(" ")} {SUPPORT_STATUS_FIRST_USE_SNAPSHOT.map((item) => `${item.label} ${item.value} ${item.detail}`).join(" ")} {SUPPORT_STATUS_FIRST_USE_ACTIONS.map((item) => `${item.title} ${item.copy} ${item.href}`).join(" ")} {SUPPORT_STATUS_FIRST_USE_RULES.join(" ")}
      </section>
    </main>
  );
}
