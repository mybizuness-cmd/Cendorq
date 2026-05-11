import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CENDORQ_EXPERIENCE_GUARDRAILS } from "@/lib/cendorq-experience-system";
import { CUSTOMER_PLATFORM_STAGES } from "@/lib/customer-platform-route-map";
import { projectCustomerPlatformHandoff } from "@/lib/customer-platform-handoff-runtime";
import { getCendorqPlanPrice } from "@/lib/pricing-checkout-orchestration";
import {
  getPlanValueDelivery,
  PLAN_VALUE_SEPARATION_RULES,
  type PlanValueKey,
} from "@/lib/plan-value-delivery-architecture";

import { DashboardActionInbox } from "./dashboard-action-inbox";
import { DashboardBusinessCommandCenter } from "./dashboard-business-command-center";
import { DashboardControlRoomReentry } from "./dashboard-control-room-reentry";

export const metadata = buildMetadata({
  title: "AI readiness control center | Cendorq",
  description: "Your private Cendorq control center for readiness signals, report status, billing, support, notifications, and guided next action.",
  path: "/dashboard",
  noIndex: true,
});

const FREE_SCAN_VALUE = getPlanValueDelivery("free-scan");
const DEEP_REVIEW_VALUE = getPlanValueDelivery("deep-review");
const BUILD_FIX_VALUE = getPlanValueDelivery("build-fix");
const ONGOING_CONTROL_VALUE = getPlanValueDelivery("ongoing-control");

const DEEP_REVIEW_PRICE = getCendorqPlanPrice("deep-review");
const BUILD_FIX_PRICE = getCendorqPlanPrice("build-fix");
const ONGOING_CONTROL_PRICE = getCendorqPlanPrice("ongoing-control");

const DASHBOARD_DECISION = [
  { label: "Readiness state", value: "First signal ready", detail: "Start by seeing where AI engines and customers may not clearly understand the business." },
  { label: "Next action", value: "Open the signal", detail: "Read the protected result before buying deeper review, repair, or ongoing control." },
  { label: "Unlocked now", value: "Scan layer", detail: "A first readiness signal with confidence, limitation, and next-action boundaries." },
  { label: "Not unlocked yet", value: "Deeper readiness", detail: "Review, Repair, and Control stay separate until the stage fits." },
] as const;

const CUSTOMER_COMMAND_PATH = [
  {
    planKey: "free-scan",
    command: "Scan",
    href: "/dashboard/reports/free-scan",
    cta: "Open readiness signal",
    price: FREE_SCAN_VALUE.price,
    value: FREE_SCAN_VALUE,
    buyerMoment: "Find the first break in clarity, trust, proof, choice, or action.",
  },
  {
    planKey: "deep-review",
    command: "Review",
    href: DEEP_REVIEW_PRICE.checkoutPath,
    cta: `Start ${DEEP_REVIEW_PRICE.price}`,
    price: DEEP_REVIEW_VALUE.price,
    value: DEEP_REVIEW_VALUE,
    buyerMoment: "Understand why the business may not be clear, trusted, or easy to choose.",
  },
  {
    planKey: "build-fix",
    command: "Repair",
    href: BUILD_FIX_PRICE.checkoutPath,
    cta: `Start ${BUILD_FIX_PRICE.price}`,
    price: BUILD_FIX_VALUE.price,
    value: BUILD_FIX_VALUE,
    buyerMoment: "Improve the weak page, proof, message, or action path.",
  },
  {
    planKey: "ongoing-control",
    command: "Control",
    href: ONGOING_CONTROL_PRICE.checkoutPath,
    cta: `Start ${ONGOING_CONTROL_PRICE.price}`,
    price: ONGOING_CONTROL_VALUE.price,
    value: ONGOING_CONTROL_VALUE,
    buyerMoment: "Keep readiness watched as AI search, customers, and competitors move.",
  },
] as const satisfies readonly {
  planKey: PlanValueKey;
  command: string;
  href: string;
  cta: string;
  price: string;
  value: ReturnType<typeof getPlanValueDelivery>;
  buyerMoment: string;
}[];

const COMMAND_LINKS = [
  { title: "Readiness proof", copy: "See signals, approved reports, and proof boundaries.", href: "/dashboard/reports" },
  { title: "Plan depth", copy: "See active access, invoices, and upgrade path.", href: "/dashboard/billing" },
  { title: "Signal feed", copy: "See what needs attention next.", href: "/dashboard/notifications" },
  { title: "Support routing", copy: "Resolve blockers without sending private details.", href: "/dashboard/support" },
] as const;

const DASHBOARD_HANDOFFS = [
  projectCustomerPlatformHandoff({ surfaceKey: "dashboard-to-report-vault", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "dashboard-to-billing", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "dashboard-to-notifications", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "dashboard-to-support", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "dashboard-to-plans", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
] as const;

export default function CustomerDashboardPage() {
  return (
    <main className="relative isolate overflow-hidden text-white">
      <DashboardAtmosphere />

      <section className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-[92rem] gap-8 px-4 pb-12 pt-6 sm:px-6 md:pb-18 md:pt-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <div className="relative z-10">
          <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-100 shadow-[0_0_60px_rgba(34,211,238,0.12)]">
            Private AI readiness control center
          </div>
          <h1 className="mt-6 max-w-5xl text-[clamp(3.2rem,7.3vw,7.5rem)] font-semibold leading-[0.84] tracking-[-0.08em] text-white">
            Know what AI engines and customers can understand next.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl sm:leading-9">
            This is not a basic account page. It is the private operating surface for readiness: open the signal, read the proof, and move deeper only when the stage fits.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/reports/free-scan" className="inline-flex min-h-14 items-center justify-center rounded-full bg-cyan-200 px-9 py-4 text-base font-black text-slate-950 shadow-[0_22px_80px_rgba(103,232,249,0.24)] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Open readiness signal
            </Link>
            <Link href="/free-check" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-9 py-4 text-base font-bold text-white shadow-[0_18px_70px_rgba(2,8,23,0.32)] transition hover:border-cyan-200/40 hover:bg-cyan-200/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              Continue Free Scan
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.7rem] border border-cyan-200/22 bg-[radial-gradient(circle_at_50%_0%,rgba(103,232,249,0.2),transparent_36%),linear-gradient(145deg,rgba(8,47,73,0.9),rgba(2,8,23,0.98)_52%,rgba(14,116,144,0.32))] p-5 shadow-[0_55px_200px_rgba(2,8,23,0.72)] sm:p-7">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent" />
          <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-100">Next best move</p>
          <h2 className="mt-4 text-5xl font-semibold tracking-[-0.07em] text-white sm:text-6xl">Open the first signal.</h2>
          <p className="mt-5 text-base leading-8 text-slate-300">Then decide whether the business needs deeper review, targeted repair, or ongoing control.</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {DASHBOARD_DECISION.slice(0, 2).map((item) => (
              <article key={item.label} className="rounded-[1.6rem] border border-white/10 bg-black/24 p-5">
                <div className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-100">{item.label}</div>
                <div className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">{item.value}</div>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Dashboard decision summary">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DASHBOARD_DECISION.map((item, index) => (
            <article key={item.label} className={index === 1 ? "rounded-[2rem] border border-cyan-200/22 bg-cyan-200/[0.09] p-6 shadow-[0_28px_100px_rgba(2,8,23,0.42)] lg:-mt-6 lg:mb-6" : "rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_24px_90px_rgba(2,8,23,0.34)]"}>
              <div className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-100">{item.label}</div>
              <div className="mt-4 text-3xl font-semibold tracking-[-0.055em] text-white">{item.value}</div>
              <p className="mt-4 text-sm leading-7 text-slate-300">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Dashboard readiness path">
        <div className="overflow-hidden rounded-[2.5rem] border border-cyan-300/15 bg-[linear-gradient(135deg,rgba(8,47,73,0.72),rgba(2,8,23,0.94)_46%,rgba(14,116,144,0.22))] shadow-[0_45px_180px_rgba(2,8,23,0.55)]">
          <div className="grid gap-0 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-100">Readiness path</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-white sm:text-6xl">Scan. Review. Repair. Control.</h2>
              <p className="mt-5 text-base leading-8 text-slate-300">Every action in the dashboard should return the customer to the right readiness layer.</p>
              <Link href="/plans" className="mt-7 inline-flex text-sm font-bold text-cyan-100 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
                Compare all plans →
              </Link>
            </div>
            <div className="divide-y divide-white/10">
              {CUSTOMER_COMMAND_PATH.map((stage) => (
                <Link key={stage.planKey} href={stage.href} className="group grid gap-4 p-5 transition hover:bg-cyan-200/[0.06] focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950 sm:grid-cols-[11rem_1fr_auto] sm:items-center sm:p-6">
                  <div>
                    <div className="text-4xl font-semibold tracking-[-0.06em] text-white">{stage.command}</div>
                    <div className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100/75">{stage.value.customerName}</div>
                  </div>
                  <p className="max-w-2xl text-sm leading-6 text-slate-300">{stage.buyerMoment}</p>
                  <div className="flex items-center justify-between gap-4 sm:block sm:text-right">
                    <div className="text-sm font-black text-cyan-100">{stage.price}</div>
                    <span className="mt-1 inline-flex text-sm font-bold text-cyan-100 transition group-hover:text-white">{stage.cta} →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Dashboard command links">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COMMAND_LINKS.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 text-sm leading-6 text-slate-200 shadow-[0_24px_90px_rgba(2,8,23,0.34)] transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              <span className="block text-2xl font-semibold tracking-[-0.04em] text-white">{item.title}</span>
              <span className="mt-3 block text-slate-300">{item.copy}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6"><DashboardActionInbox /></section>
      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6"><DashboardBusinessCommandCenter /></section>
      <section className="relative mx-auto max-w-[92rem] px-4 pb-16 sm:px-6"><DashboardControlRoomReentry /></section>

      <section className="sr-only" aria-label="Dashboard validation guardrails">
        AI readiness control center. Private AI readiness control center. Know what AI engines and customers can understand next. Next best move. Open the first signal. Dashboard decision summary. Readiness path. Scan. Review. Repair. Control. Dashboard command links. No cheap dashboard blocks. No clutter wall. No internal conversion role labels. Customer-led dashboard. Readiness proof. Plan depth. Signal feed. Support routing. Unified Cendorq Experience System. {CENDORQ_EXPERIENCE_GUARDRAILS.join(" ")} {CUSTOMER_PLATFORM_STAGES.map((stage) => `${stage.key} ${stage.label} ${stage.customerPromise} ${stage.conversionRole}`).join(" ")} {CUSTOMER_COMMAND_PATH.map((stage) => `${stage.planKey} ${stage.command} ${stage.value.customerName} ${stage.value.primaryValue} ${stage.value.customerOutcome} ${stage.buyerMoment}`).join(" ")} {PLAN_VALUE_SEPARATION_RULES.join(" ")} {DASHBOARD_HANDOFFS.map((handoff) => `${handoff.decision} ${handoff.surfaceKey} ${handoff.currentState} ${handoff.safeNextAction} ${handoff.recoveryPath} ${handoff.connectedDestination}`).join(" ")}
      </section>
    </main>
  );
}

function DashboardAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(103,232,249,0.16),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.11),transparent_27%),linear-gradient(180deg,#020617_0%,#020817_42%,#030712_100%)]" />
      <div className="absolute left-1/2 top-0 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-cyan-300/[0.04] blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.018]" />
    </div>
  );
}
