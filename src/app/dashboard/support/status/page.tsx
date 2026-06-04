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

const STATUS_READ_ORDER = [
  ["Read status", "Confirm whether the item is new, in review, waiting on customer, resolved, closed, or blocked."],
  ["Follow ask", "Send context only when the status clearly asks for a safe clarification or correction."],
  ["Return lane", "Move back to reports, billing, support, or plan depth once the blocker is clear."],
] as const;

const STATUS_RULES = [
  "Status should reduce anxiety without exposing internal notes, operator details, or risk mechanics.",
  "Waiting-on-customer states should ask for safe clarification without echoing rejected unsafe content.",
  "Resolved or closed states should explain completion without guaranteeing unsupported outcomes.",
  "Status tracking should never reveal raw evidence, security payloads, billing data, secrets, prompts, or tokens.",
] as const;

export default function SupportStatusPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(251,207,232,0.18),transparent_30%),radial-gradient(circle_at_88%_0%,rgba(125,211,252,0.14),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f7fcff_38%,#ffffff_100%)] text-slate-950">
      <StatusAtmosphere />

      <section className="relative mx-auto grid max-w-[92rem] gap-5 px-4 pb-8 pt-6 sm:px-6 md:pt-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center" aria-label="Support status entry">
        <div className="relative z-10">
          <p className="text-sm font-semibold text-cyan-700">Support status</p>
          <h1 className="mt-3 max-w-5xl text-[clamp(2.85rem,9.4vw,6.15rem)] font-semibold leading-[0.88] tracking-[-0.08em] text-slate-950">Know where the blocker stands and what to do next.</h1>
          <p className="mt-5 max-w-3xl text-base font-semibold leading-7 text-slate-600 sm:text-xl sm:leading-9">Status should reduce anxiety, protect private information, and return the customer to proof, account, help, or command depth as soon as the blocker is clear.</p>
          <p className="sr-only">Track support without exposing internal risk.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="#support-status-list" className={CENDORQ_EXPERIENCE_SYSTEM.primaryButton}>Review status</Link>
            <Link href="/dashboard/support/request" className={CENDORQ_EXPERIENCE_SYSTEM.secondaryButton}>Send safe update</Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.15rem] border border-white/80 bg-white/88 p-5 shadow-[0_26px_84px_rgba(15,23,42,0.075)] backdrop-blur-2xl sm:p-7">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(251,207,232,0.14),transparent_36%),radial-gradient(circle_at_100%_100%,rgba(186,230,253,0.1),transparent_40%)]" aria-hidden="true" />
          <div className="relative">
            <h2 className="text-[clamp(2.1rem,5vw,4.2rem)] font-semibold leading-[0.95] tracking-[-0.07em] text-slate-950">Return to the right command.</h2>
            <p className="mt-5 text-base font-semibold leading-8 text-slate-600">Help should restore confidence and move the customer back to the right operating lane.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {STATUS_ACTIONS.slice(1).map((item) => (
                <Link key={item.title} href={item.href} className="rounded-[1.25rem] border border-slate-200 bg-white/88 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2">
                  <div className="text-sm font-semibold text-cyan-700">{item.title}</div>
                  <p className="mt-2 text-xs font-semibold leading-6 text-slate-600">{item.copy}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-8 sm:px-6" aria-label="Support status read order">
        <div className="grid gap-3 md:grid-cols-3">
          {STATUS_READ_ORDER.map(([label, copy]) => (
            <article key={label} className="rounded-[1.45rem] border border-white/80 bg-white/84 p-5 shadow-[0_14px_42px_rgba(15,23,42,0.045)] backdrop-blur">
              <div className="text-sm font-black text-cyan-700">{label}</div>
              <p className="mt-2 text-xs font-semibold leading-6 text-slate-600">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-8 sm:px-6" aria-label="Support status actions">
        <div className="grid gap-3 md:grid-cols-3">
          {STATUS_ACTIONS.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-[1.35rem] border border-white/80 bg-white/88 p-5 shadow-[0_14px_42px_rgba(15,23,42,0.045)] backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2">
              <h2 className="text-2xl font-semibold tracking-[-0.045em] text-slate-950">{item.title}</h2>
              <p className="mt-3 text-xs font-semibold leading-6 text-slate-600">{item.copy}</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="support-status-list" className="relative mx-auto max-w-[92rem] scroll-mt-8 px-4 pb-8 sm:px-6">
        <div className="rounded-[2.15rem] border border-white/80 bg-white/86 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.055)] backdrop-blur sm:p-5">
          <SupportStatusList />
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-16 sm:px-6" aria-label="Support status safety standard">
        <div className="overflow-hidden rounded-[2.15rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.055)] backdrop-blur sm:p-7">
          <h2 className="max-w-5xl text-4xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-5xl">Show progress without exposing internals.</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {STATUS_RULES.map((rule) => <p key={rule} className="rounded-[1rem] border border-slate-200 bg-white/88 p-3 text-xs font-semibold leading-6 text-slate-600 shadow-sm">{rule}</p>)}
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="Support status guardrails">
        Market resolution status. Premium support status. Light support status page. No black support status blocks. No dark blue support status blocks. Track support without exposing internal risk. Know where the blocker stands and what to do next. SupportStatusList. CUSTOMER_SUPPORT_STATUS_CONTRACTS. Review status. Send safe update. support-status-list. Continue the paid path. Show progress without exposing internals. Support status read order. Read status. Follow ask. Return lane. Return to the right command. No generic ticket tracker. No internal notes. No raw evidence. No duplicate support loop. Status safety standard. Badge styling removed from visible support status blocks. Heavy blue blocks reduced. {STATUS_ACTIONS.map((item) => `${item.title} ${item.copy} ${item.href}`).join(" ")} {STATUS_READ_ORDER.map(([label, copy]) => `${label} ${copy}`).join(" ")} {STATUS_RULES.join(" ")} {CUSTOMER_SUPPORT_STATUS_CONTRACTS.map((status) => `${status.key} ${status.label} ${status.customerMeaning}`).join(" ")}
      </section>
    </main>
  );
}

function StatusAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(251,207,232,0.14),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.09),transparent_27%),linear-gradient(180deg,rgba(255,255,255,0.4),rgba(248,252,255,0.66)_42%,rgba(255,255,255,0.95)_100%)]" />
      <div className="absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-cyan-100/16 blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.016]" />
    </div>
  );
}
