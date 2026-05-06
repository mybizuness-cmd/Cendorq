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

const STATUS_ACTIONS = [
  { title: "Review status", href: "#support-status-list", copy: "Start with the customer-safe status before sending another request." },
  { title: "Send safe update", href: "/dashboard/support/request", copy: "Add context only when the status asks for it." },
  { title: "Return to billing", href: "/dashboard/billing", copy: "Continue the plan or invoice path once the blocker is clear." },
] as const;

const STATUS_RULES = [
  "Status should reduce anxiety without exposing internal notes, operator details, or risk mechanics.",
  "Waiting-on-customer states should ask for safe clarification without echoing rejected unsafe content.",
  "Resolved or closed states should explain completion without guaranteeing unsupported outcomes.",
  "Status tracking should never reveal raw evidence, security payloads, billing data, secrets, prompts, or tokens.",
] as const;

export default function SupportStatusPage() {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-5 text-white sm:px-6 md:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(103,232,249,0.12),transparent_34%)]" />

      <section className="system-panel-authority relative z-10 overflow-hidden rounded-[1.55rem] p-4 shadow-[0_28px_110px_rgba(2,8,23,0.42)] sm:rounded-[1.8rem] sm:p-8">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />
        <div className="grid gap-5 lg:grid-cols-[1fr_20rem] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Support status</p>
            <h1 className="mt-3 max-w-5xl text-3xl font-semibold tracking-tight text-white sm:mt-4 sm:text-5xl">Know where the blocker stands and what to do next.</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:mt-5 sm:text-base sm:leading-8">
              Status should reduce anxiety, protect private information, and return the customer to billing, reports, support, or plan choice as soon as the blocker is clear.
            </p>
          </div>
          <div className="rounded-[1.25rem] border border-cyan-300/20 bg-cyan-300/10 p-4 sm:p-5">
            <div className="text-sm font-semibold text-cyan-100">After resolution</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Continue the paid path.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-200">Support should restore confidence and move the customer back to the right operating lane.</p>
            <Link href="/dashboard/billing" className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">Open billing</Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-5 grid gap-3 md:grid-cols-3" aria-label="Support status actions">
        {STATUS_ACTIONS.map((item) => (
          <Link key={item.href} href={item.href} className="system-surface rounded-[1.25rem] p-4 transition hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950 sm:p-5">
            <h2 className="text-xl font-semibold tracking-tight text-white">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{item.copy}</p>
          </Link>
        ))}
      </section>

      <section id="support-status-list" className="relative z-10 mt-7 scroll-mt-8">
        <SupportStatusList />
      </section>

      <section className="relative z-10 mt-7 rounded-[1.45rem] border border-white/10 bg-white/[0.035] p-4 sm:p-5" aria-label="Support status safety standard">
        <p className="text-sm font-semibold text-cyan-100">Status safety standard</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Show progress without exposing internals.</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {STATUS_RULES.map((rule) => (
            <p key={rule} className="rounded-[1rem] border border-white/10 bg-black/20 p-3 text-xs leading-6 text-slate-300">{rule}</p>
          ))}
        </div>
      </section>

      <section className="sr-only" aria-label="Support status guardrails">
        Support status. Know where the blocker stands and what to do next. Show progress without exposing internals. Continue the paid path. No generic ticket tracker. No internal notes. No raw evidence. No duplicate support loop. {STATUS_ACTIONS.map((item) => `${item.title} ${item.copy} ${item.href}`).join(" ")} {STATUS_RULES.join(" ")} {CUSTOMER_SUPPORT_STATUS_CONTRACTS.map((status) => `${status.key} ${status.label} ${status.customerMeaning}`).join(" ")}
      </section>
    </main>
  );
}
