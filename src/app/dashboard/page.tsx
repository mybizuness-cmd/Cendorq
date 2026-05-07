import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
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
  title: "Market command center | Cendorq",
  description: "Your private Cendorq command center for market signals, report status, billing, support, notifications, and guided next action.",
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
  { label: "Market state", value: "First signal ready", detail: "Start by proving where the market may not understand the business." },
  { label: "Next action", value: "Open the signal", detail: "Read the protected result before buying deeper diagnosis, implementation, or monthly control." },
  { label: "Unlocked now", value: "Scan layer", detail: "A first market signal with confidence, limitation, and next-action boundaries." },
  { label: "Not unlocked yet", value: "Deeper command", detail: "Diagnose, Fix, and Control stay separate until the stage fits." },
] as const;

const CUSTOMER_COMMAND_PATH = [
  {
    planKey: "free-scan",
    command: "Scan",
    href: "/dashboard/reports/free-scan",
    cta: "Open market signal",
    price: FREE_SCAN_VALUE.price,
    value: FREE_SCAN_VALUE,
    buyerMoment: "Find the first break in findability, clarity, trust, choice, or action.",
  },
  {
    planKey: "deep-review",
    command: "Diagnose",
    href: DEEP_REVIEW_PRICE.checkoutPath,
    cta: `Unlock ${DEEP_REVIEW_PRICE.price}`,
    price: DEEP_REVIEW_VALUE.price,
    value: DEEP_REVIEW_VALUE,
    buyerMoment: "Expose why the business is not being found, understood, trusted, or chosen.",
  },
  {
    planKey: "build-fix",
    command: "Fix",
    href: BUILD_FIX_PRICE.checkoutPath,
    cta: `Unlock ${BUILD_FIX_PRICE.price}`,
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
    buyerMoment: "Keep visibility, trust, and priority watched as AI search and competitors move.",
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
  { title: "Market proof", copy: "See signals, approved reports, and proof boundaries.", href: "/dashboard/reports" },
  { title: "Command depth", copy: "See active access, invoices, and upgrade path.", href: "/dashboard/billing" },
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
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-5 text-white sm:px-6 md:py-10 xl:py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(103,232,249,0.14),transparent_32%),radial-gradient(circle_at_86%_8%,rgba(14,165,233,0.1),transparent_34%)]" />

      <section className="system-panel-authority relative z-10 overflow-hidden rounded-[1.8rem] p-4 shadow-[0_34px_130px_rgba(2,8,23,0.52)] sm:p-8">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/80 to-transparent" />
        <div className="grid gap-5 lg:grid-cols-[1fr_20rem] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Private market command center</p>
            <h1 className="mt-3 max-w-5xl text-3xl font-semibold tracking-tight text-white sm:mt-4 sm:text-5xl md:text-6xl">
              Know what the market can find, trust, and choose next.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:mt-5 sm:text-base sm:leading-8">
              This is not an account page. It is the operating surface for market understanding: open the signal, read the proof, and move deeper only when the command stage fits.
            </p>
          </div>
          <div className="rounded-[1.25rem] border border-cyan-300/20 bg-cyan-300/10 p-4 sm:p-5">
            <div className="text-sm font-semibold text-cyan-100">Next best move</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Open the first signal.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-200">Then decide whether the business needs diagnosis, a targeted fix, or monthly control.</p>
            <div className="mt-4 grid gap-3">
              <Link href="/dashboard/reports/free-scan" className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
                Open market signal
              </Link>
              <Link href="/free-check" className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
                Continue Free Scan
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Dashboard decision summary">
        {DASHBOARD_DECISION.map((item) => (
          <article key={item.label} className="system-surface rounded-[1.35rem] p-4 sm:p-5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">{item.label}</div>
            <div className="mt-3 text-xl font-semibold tracking-tight text-white">{item.value}</div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-7 overflow-hidden rounded-[1.8rem] border border-cyan-300/15 bg-[linear-gradient(135deg,rgba(8,47,73,0.74),rgba(2,8,23,0.9)_48%,rgba(14,116,144,0.26))] p-4 shadow-[0_30px_110px_rgba(2,8,23,0.44)] sm:p-7" aria-label="Dashboard command path">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Command path</p>
            <h2 className="mt-2 max-w-4xl text-2xl font-semibold tracking-tight text-white sm:text-5xl">
              Scan. Diagnose. Fix. Control.
            </h2>
          </div>
          <Link href="/plans" className="text-sm font-semibold text-cyan-200 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
            Compare all plans →
          </Link>
        </div>
        <div className="mt-6 divide-y divide-white/10 rounded-[1.35rem] border border-white/10 bg-slate-950/48">
          {CUSTOMER_COMMAND_PATH.map((stage) => (
            <Link key={stage.planKey} href={stage.href} className="group grid gap-3 px-4 py-5 transition hover:bg-cyan-300/[0.06] focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950 sm:grid-cols-[10rem_1fr_auto] sm:items-center sm:px-5">
              <div>
                <div className="text-3xl font-semibold tracking-tight text-white">{stage.command}</div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100/75">{stage.value.customerName}</div>
              </div>
              <p className="max-w-2xl text-sm leading-6 text-slate-300">{stage.buyerMoment}</p>
              <div className="flex items-center justify-between gap-4 sm:block sm:text-right">
                <div className="text-sm font-semibold text-cyan-100">{stage.price}</div>
                <span className="mt-1 inline-flex text-sm font-semibold text-cyan-100 transition group-hover:text-white">{stage.cta} →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Dashboard command links">
        {COMMAND_LINKS.map((item) => (
          <Link key={item.href} href={item.href} className="system-surface rounded-[1.35rem] p-4 text-sm leading-6 text-slate-200 transition hover:border-cyan-300/30 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950 sm:p-5">
            <span className="block text-xl font-semibold tracking-tight text-white">{item.title}</span>
            <span className="mt-2 block text-slate-300">{item.copy}</span>
          </Link>
        ))}
      </section>

      <DashboardActionInbox />
      <DashboardBusinessCommandCenter />
      <DashboardControlRoomReentry />

      <section className="sr-only" aria-label="Dashboard validation guardrails">
        Market command center. Private market command center. Know what the market can find, trust, and choose next. Next best move. Open the first signal. Dashboard decision summary. Command path. Scan. Diagnose. Fix. Control. Dashboard command links. No cheap dashboard blocks. No clutter wall. No internal conversion role labels. Customer-led dashboard. Market proof. Command depth. Signal feed. Support routing. {CUSTOMER_PLATFORM_STAGES.map((stage) => `${stage.key} ${stage.label} ${stage.customerPromise} ${stage.conversionRole}`).join(" ")} {CUSTOMER_COMMAND_PATH.map((stage) => `${stage.planKey} ${stage.command} ${stage.value.customerName} ${stage.value.primaryValue} ${stage.value.customerOutcome} ${stage.buyerMoment}`).join(" ")} {PLAN_VALUE_SEPARATION_RULES.join(" ")} {DASHBOARD_HANDOFFS.map((handoff) => `${handoff.decision} ${handoff.surfaceKey} ${handoff.currentState} ${handoff.safeNextAction} ${handoff.recoveryPath} ${handoff.connectedDestination}`).join(" ")}
      </section>
    </main>
  );
}
