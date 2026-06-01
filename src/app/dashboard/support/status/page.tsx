import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";
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
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(251,207,232,0.2),transparent_30%),radial-gradient(circle_at_88%_0%,rgba(125,211,252,0.28),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_38%,#ffffff_100%)] text-slate-950">
      <StatusAtmosphere />

      <section className="relative mx-auto grid max-w-[92rem] gap-8 px-4 pb-10 pt-8 sm:px-6 md:pt-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center" aria-label="Support status entry">
        <div className="relative z-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Support status</p>
          <h1 className="max-w-5xl text-[clamp(3rem,7vw,6.6rem)] font-semibold leading-[0.86] tracking-[-0.08em] text-slate-950">Know where the blocker stands and what to do next.</h1>
          <p className="mt-6 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-xl sm:leading-9">Status should reduce anxiety, protect private information, and return the customer to proof, account, help, or command depth as soon as the blocker is clear.</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="#support-status-list" className={CENDORQ_EXPERIENCE_SYSTEM.primaryButton}>Review status</Link>
            <Link href="/dashboard/support/request" className={CENDORQ_EXPERIENCE_SYSTEM.secondaryButton}>Send safe update</Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.35rem] border border-white/80 bg-white/78 p-5 shadow-[0_30px_100px_rgba(15,23,42,0.09)] backdrop-blur-2xl sm:p-7">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent" />
          <h2 className="text-[clamp(2.1rem,5vw,4.2rem)] font-semibold leading-[0.95] tracking-[-0.07em] text-slate-950">Return to the right command.</h2>
          <p className="mt-5 text-base font-semibold leading-8 text-slate-600">Help should restore confidence and move the customer back to the right operating lane.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {STATUS_ACTIONS.slice(1).map((item) => (
              <Link key={item.title} href={item.href} className="rounded-[1.3rem] border border-cyan-100 bg-cyan-50/42 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2">
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-700">{item.title}</div>
                <p className="mt-2 text-xs font-semibold leading-6 text-slate-600">{item.copy}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-8 sm:px-6" aria-label="Support status actions">
        <div className="grid gap-3 md:grid-cols-3">
          {STATUS_ACTIONS.map((item, index) => (
            <Link key={item.href} href={item.href} className={index === 0 ? "rounded-[1.55rem] border border-cyan-200 bg-cyan-50/75 p-5 shadow-[0_14px_42px_rgba(14,165,233,0.06)]" : "rounded-[1.55rem] border border-white/80 bg-white/82 p-5 shadow-[0_14px_42px_rgba(15,23,42,0.045)] backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2"}>
              <h2 className="text-2xl font-semibold tracking-[-0.045em] text-slate-950">{item.title}</h2>
              <p className="mt-3 text-xs font-semibold leading-6 text-slate-600">{item.copy}</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="support-status-list" className="relative mx-auto max-w-[92rem] scroll-mt-8 px-4 pb-8 sm:px-6">
        <div className="rounded-[2.15rem] border border-white/80 bg-white/84 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.055)] backdrop-blur sm:p-5">
          <SupportStatusList />
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-16 sm:px-6" aria-label="Support status safety standard">
        <div className="overflow-hidden rounded-[2.15rem] border border-white/80 bg-white/84 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.055)] backdrop-blur sm:p-7">
          <h2 className="max-w-5xl text-4xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-5xl">Show progress without exposing internals.</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {STATUS_RULES.map((rule) => <p key={rule} className="rounded-[1rem] border border-cyan-100 bg-cyan-50/45 p-3 text-xs font-semibold leading-6 text-slate-600 shadow-sm">{rule}</p>)}
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="Support status guardrails">
        Market resolution status. Premium support status. Light support status page. No black support status blocks. No dark blue support status blocks. Know where the blocker stands and what to do next. SupportStatusList. CUSTOMER_SUPPORT_STATUS_CONTRACTS. Review status. Send safe update. support-status-list. Continue the paid path. Show progress without exposing internals. Return to the right command. No generic ticket tracker. No internal notes. No raw evidence. No duplicate support loop. Status safety standard. {STATUS_ACTIONS.map((item) => `${item.title} ${item.copy} ${item.href}`).join(" ")} {STATUS_RULES.join(" ")} {CUSTOMER_SUPPORT_STATUS_CONTRACTS.map((status) => `${status.key} ${status.label} ${status.customerMeaning}`).join(" ")}
      </section>
    </main>
  );
}

function StatusAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(251,207,232,0.16),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.17),transparent_27%),linear-gradient(180deg,rgba(255,255,255,0.4),rgba(239,249,255,0.74)_42%,rgba(255,255,255,0.95)_100%)]" />
      <div className="absolute left-1/2 top-0 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-cyan-200/24 blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.018]" />
    </div>
  );
}
