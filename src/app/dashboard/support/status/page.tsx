import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { SupportStatusList } from "@/components/customer-support/support-status-list";
import { CUSTOMER_SUPPORT_STATUS_CONTRACTS } from "@/lib/customer-support-status-contracts";

export const metadata = buildMetadata({
  title: "Market resolution status | Cendorq",
  description: "View customer-safe Cendorq support request status without internal notes, raw evidence, or private security and billing details.",
  path: "/dashboard/support/status",
  noIndex: true,
});

const STATUS_ACTIONS = [
  { title: "Review status", href: "#support-status-list", copy: "Start with the customer-safe status before sending another request." },
  { title: "Send safe update", href: "/dashboard/support/request", copy: "Add context only when the status asks for it." },
  { title: "Return to command depth", href: "/dashboard/billing", copy: "Continue the plan or invoice path once the blocker is clear." },
] as const;

const STATUS_RULES = [
  "Status should reduce anxiety without exposing internal notes, operator details, or risk mechanics.",
  "Waiting-on-customer states should ask for safe clarification without echoing rejected unsafe content.",
  "Resolved or closed states should explain completion without guaranteeing unsupported outcomes.",
  "Status tracking should never reveal raw evidence, security payloads, billing data, secrets, prompts, or tokens.",
] as const;

export default function SupportStatusPage() {
  return (
    <main className="relative isolate overflow-hidden text-white">
      <StatusAtmosphere />

      <section className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-[92rem] gap-8 px-4 pb-12 pt-6 sm:px-6 md:pb-18 md:pt-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <div className="relative z-10">
          <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-100 shadow-[0_0_60px_rgba(34,211,238,0.12)]">
            Market resolution status
          </div>
          <h1 className="mt-6 max-w-5xl text-[clamp(3.2rem,7.3vw,7.5rem)] font-semibold leading-[0.84] tracking-[-0.08em] text-white">
            Know where the blocker stands and what to do next.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl sm:leading-9">
            Status should reduce anxiety, protect private information, and return the customer to proof, account, help, or command depth as soon as the blocker is clear.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="#support-status-list" className="inline-flex min-h-14 items-center justify-center rounded-full bg-cyan-200 px-9 py-4 text-base font-black text-slate-950 shadow-[0_22px_80px_rgba(103,232,249,0.24)] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Review status
            </Link>
            <Link href="/dashboard/support/request" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-9 py-4 text-base font-bold text-white shadow-[0_18px_70px_rgba(2,8,23,0.32)] transition hover:border-cyan-200/40 hover:bg-cyan-200/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              Send safe update
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.7rem] border border-cyan-200/22 bg-[radial-gradient(circle_at_50%_0%,rgba(103,232,249,0.2),transparent_36%),linear-gradient(145deg,rgba(8,47,73,0.9),rgba(2,8,23,0.98)_52%,rgba(14,116,144,0.32))] p-5 shadow-[0_55px_200px_rgba(2,8,23,0.72)] sm:p-7">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent" />
          <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-100">After resolution</p>
          <h2 className="mt-4 text-5xl font-semibold tracking-[-0.07em] text-white sm:text-6xl">Return to the right command.</h2>
          <p className="mt-5 text-base leading-8 text-slate-300">Help should restore confidence and move the customer back to the right operating lane.</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {STATUS_ACTIONS.slice(1).map((item) => (
              <Link key={item.title} href={item.href} className="rounded-[1.6rem] border border-white/10 bg-black/24 p-5 transition hover:border-cyan-200/30 hover:bg-cyan-200/[0.08]">
                <div className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-100">{item.title}</div>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.copy}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Support status actions">
        <div className="grid gap-4 md:grid-cols-3">
          {STATUS_ACTIONS.map((item, index) => (
            <Link key={item.href} href={item.href} className={index === 0 ? "rounded-[2rem] border border-cyan-200/22 bg-cyan-200/[0.09] p-6 shadow-[0_28px_100px_rgba(2,8,23,0.42)] md:-mt-6 md:mb-6" : "rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_24px_90px_rgba(2,8,23,0.34)] transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950"}>
              <h2 className="text-3xl font-semibold tracking-[-0.055em] text-white">{item.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">{item.copy}</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="support-status-list" className="relative mx-auto max-w-[92rem] scroll-mt-8 px-4 pb-10 sm:px-6">
        <div className="rounded-[2.5rem] border border-cyan-300/15 bg-[linear-gradient(135deg,rgba(8,47,73,0.72),rgba(2,8,23,0.94)_46%,rgba(14,116,144,0.22))] p-4 shadow-[0_45px_180px_rgba(2,8,23,0.55)] sm:p-6">
          <SupportStatusList />
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-16 sm:px-6" aria-label="Support status safety standard">
        <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025)_38%,rgba(103,232,249,0.08))] p-6 shadow-[0_45px_180px_rgba(2,8,23,0.55)] backdrop-blur-2xl sm:p-8 lg:p-10">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-100">Status safety standard</p>
          <h2 className="mt-3 max-w-5xl text-4xl font-semibold tracking-[-0.055em] text-white sm:text-6xl">Show progress without exposing internals.</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {STATUS_RULES.map((rule) => (
              <p key={rule} className="rounded-[1.35rem] border border-white/10 bg-black/25 p-4 text-sm font-semibold leading-7 text-slate-300">{rule}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="Support status guardrails">
        Market resolution status. Know where the blocker stands and what to do next. Show progress without exposing internals. Return to the right command. No generic ticket tracker. No internal notes. No raw evidence. No duplicate support loop. {STATUS_ACTIONS.map((item) => `${item.title} ${item.copy} ${item.href}`).join(" ")} {STATUS_RULES.join(" ")} {CUSTOMER_SUPPORT_STATUS_CONTRACTS.map((status) => `${status.key} ${status.label} ${status.customerMeaning}`).join(" ")}
      </section>
    </main>
  );
}

function StatusAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(103,232,249,0.16),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.11),transparent_27%),linear-gradient(180deg,#020617_0%,#020817_42%,#030712_100%)]" />
      <div className="absolute left-1/2 top-0 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-cyan-300/[0.04] blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.018]" />
    </div>
  );
}
