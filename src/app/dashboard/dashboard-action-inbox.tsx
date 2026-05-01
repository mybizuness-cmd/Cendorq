import Link from "next/link";

import { projectPlanRouting, type PlanRoutingInput } from "@/lib/plan-routing-runtime";

const ACTION_INBOX_CASES: readonly (PlanRoutingInput & {
  title: string;
  eyebrow: string;
  customerSummary: string;
  conversionRole: string;
  href: string;
  cta: string;
})[] = [
  {
    title: "Confirm your Cendorq inbox once",
    eyebrow: "One-time setup",
    customerSummary:
      "Confirm this inbox once so report, billing, support, and plan-status emails sent to your signup address are easier to find.",
    conversionRole:
      "Keeps the customer reachable for report-ready notices, plan education, billing clarity, and support follow-through without repeating confirmation every plan.",
    href: "/dashboard/notifications",
    cta: "Confirm inbox",
    customerIdHashPresent: true,
    verifiedEmail: true,
    welcomeSent: false,
    inboxConfirmationSent: false,
    inboxConfirmationCompleted: false,
    selectedPlan: "deep-review",
    activeEntitlements: ["deep-review"],
    routingMode: "linear-stop",
    evidenceBackedRecommendation: false,
  },
  {
    title: "Optimization scope is protected",
    eyebrow: "Plan scope",
    customerSummary:
      "Build Fix can continue inside the purchased optimization scope. Add Deep Review if you want the full standalone diagnosis behind the work.",
    conversionRole:
      "Converts direct Optimization buyers back toward Deep Review through scope clarity and customer understanding, not pressure or unpaid report leakage.",
    href: "/dashboard/billing",
    cta: "Review plan scope",
    customerIdHashPresent: true,
    verifiedEmail: true,
    welcomeSent: true,
    inboxConfirmationSent: true,
    inboxConfirmationCompleted: true,
    selectedPlan: "build-fix",
    activeEntitlements: ["build-fix"],
    routingMode: "direct-purchase",
    evidenceBackedRecommendation: true,
    intakeOrApprovalIncomplete: true,
  },
  {
    title: "Monthly command stays evidence-led",
    eyebrow: "Ongoing control",
    customerSummary:
      "Monthly control can continue from approved scope. Build Fix is recommended only when evidence shows implementation work is needed.",
    conversionRole:
      "Turns recurring visibility into upgrade education by showing when monthly insight needs paid implementation, while preserving the active monthly plan.",
    href: "/dashboard/notifications",
    cta: "View monthly updates",
    customerIdHashPresent: true,
    verifiedEmail: true,
    welcomeSent: true,
    inboxConfirmationSent: true,
    inboxConfirmationCompleted: true,
    selectedPlan: "ongoing-control",
    activeEntitlements: ["ongoing-control"],
    routingMode: "direct-purchase",
    evidenceBackedRecommendation: true,
  },
] as const;

const ACTION_INBOX_ITEMS = ACTION_INBOX_CASES.map((item) => ({
  ...item,
  projection: projectPlanRouting(item),
}));

export function DashboardActionInbox() {
  return (
    <section className="relative z-10 mt-8" aria-label="Dashboard action inbox">
      <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">Dashboard action inbox</div>
            <h2 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-white">
              The most important customer actions stay visible and conversion-ready without becoming noise.
            </h2>
            <p className="mt-4 max-w-4xl text-base leading-8 text-slate-300">
              This inbox is a dashboard conversion and action strip, not a substitute for the email orchestration, lifecycle follow-up emails, or the full notification center. Email remains the external delivery channel to the signup address; the dashboard keeps the next best action visible when the customer returns.
            </p>
          </div>
          <Link href="/dashboard/notifications" className="inline-flex rounded-2xl border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-sm font-bold text-cyan-100 transition hover:bg-cyan-300/15 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
            Open notification center
          </Link>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {ACTION_INBOX_ITEMS.map((item) => (
            <Link key={item.title} href={item.href} className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-5 text-sm leading-6 text-slate-200 transition hover:border-cyan-300/30 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-100">{item.eyebrow} · {item.projection.routingMode}</span>
              <span className="mt-3 block text-lg font-semibold tracking-tight text-white">{item.title}</span>
              <span className="mt-3 block text-sm leading-7 text-slate-300">{item.customerSummary}</span>
              <span className="mt-4 block rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.07] px-4 py-3 text-xs leading-5 text-cyan-50">
                Conversion role: {item.conversionRole}
              </span>
              <span className="mt-3 block rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-xs leading-5 text-slate-400">
                Next: {item.projection.nextBestPlan}
              </span>
              <span className="mt-4 inline-flex rounded-2xl bg-cyan-300 px-4 py-2 text-xs font-bold text-slate-950">{item.cta}</span>
            </Link>
          ))}
        </div>

        <div className="mt-5 rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-4 text-xs leading-6 text-slate-400">
          Customer-safe rule: dashboard inbox items must supplement, not replace, signup-email follow-ups and transactional email orchestration. They should convert through evidence, plan-fit education, scope clarity, and one safe next action while avoiding raw payloads, raw evidence, internal notes, risk internals, operator identities, provider payloads, secrets, payment data, unsupported outcome promises, or pressure-based urgency.
        </div>
      </div>
    </section>
  );
}
