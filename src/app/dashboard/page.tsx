import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CENDORQ_EXPERIENCE_GUARDRAILS, CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";
import { CUSTOMER_PLATFORM_STAGES } from "@/lib/customer-platform-route-map";
import { projectCustomerPlatformHandoff } from "@/lib/customer-platform-handoff-runtime";
import { resolveCendorqCustomerJourney } from "@/lib/customer-journey-orchestrator";
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

const JOURNEY_DECISIONS = [
  {
    label: "Current first action",
    title: "Free Scan intake",
    href: "/dashboard/reports/free-scan",
    decision: resolveCendorqCustomerJourney({
      purchasedPlan: "free-scan",
      source: "dashboard",
      completedEvidence: ["emailVerified", "businessProfileExists"],
      completedIntake: ["business name"],
    }),
  },
  {
    label: "Paid review gate",
    title: "AI Readiness Review",
    href: "/dashboard/reports",
    decision: resolveCendorqCustomerJourney({
      purchasedPlan: "deep-review",
      source: "dashboard",
      completedEvidence: ["customerOwnershipVerified"],
      completedIntake: ["business URL or main page"],
    }),
  },
  {
    label: "Repair protection",
    title: "Signal Repair",
    href: "/dashboard/support/request",
    decision: resolveCendorqCustomerJourney({
      purchasedPlan: "build-fix",
      source: "dashboard",
      completedEvidence: ["customerOwnershipVerified"],
      completedIntake: ["repair target"],
    }),
  },
  {
    label: "Control baseline",
    title: "Readiness Control",
    href: "/dashboard/billing",
    decision: resolveCendorqCustomerJourney({
      purchasedPlan: "ongoing-control",
      source: "dashboard",
      completedEvidence: ["customerOwnershipVerified"],
      completedIntake: ["monthly priority"],
    }),
  },
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
    href: "/plans/deep-review",
    cta: `Open Review page — ${DEEP_REVIEW_PRICE.price}`,
    price: DEEP_REVIEW_VALUE.price,
    value: DEEP_REVIEW_VALUE,
    buyerMoment: "Understand why the business may not be clear, trusted, or easy to choose.",
  },
  {
    planKey: "build-fix",
    command: "Repair",
    href: "/plans/build-fix",
    cta: `Open Repair page — ${BUILD_FIX_PRICE.price}`,
    price: BUILD_FIX_VALUE.price,
    value: BUILD_FIX_VALUE,
    buyerMoment: "Improve the weak page, proof, message, or action path.",
  },
  {
    planKey: "ongoing-control",
    command: "Control",
    href: "/plans/ongoing-control",
    cta: `Open Control page — ${ONGOING_CONTROL_PRICE.price}`,
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
    <main className="relative isolate min-h-screen overflow-hidden bg-[linear-gradient(180deg,#fff7fb_0%,#e9fbff_18%,#eff9ff_62%,#ffffff_100%)] text-slate-950">
      <DashboardAtmosphere />

      <section className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-[92rem] gap-8 px-4 pb-12 pt-6 sm:px-6 md:pb-18 md:pt-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <div className="relative z-10">
          <h1 className="max-w-5xl text-[clamp(3.2rem,7.3vw,7.5rem)] font-semibold leading-[0.84] tracking-[-0.08em] text-slate-950">
            Know what AI engines and customers can understand next.
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">
            This is the private operating surface for readiness: open the signal, read the proof, and move deeper only when the stage fits.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/reports/free-scan" className={CENDORQ_EXPERIENCE_SYSTEM.primaryButton}>
              Open readiness signal
            </Link>
            <Link href="/free-check" className={CENDORQ_EXPERIENCE_SYSTEM.secondaryButton}>
              Continue Free Scan
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.7rem] border border-white/80 bg-white/74 p-5 shadow-[0_30px_100px_rgba(15,23,42,0.1)] backdrop-blur-2xl sm:p-7">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent" />
          <h2 className="text-5xl font-semibold tracking-[-0.07em] text-slate-950 sm:text-6xl">Open the first signal.</h2>
          <p className="mt-5 text-base font-medium leading-8 text-slate-600">Then decide whether the business needs deeper review, targeted repair, or ongoing control.</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {DASHBOARD_DECISION.slice(0, 2).map((item) => (
              <article key={item.label} className="rounded-[1.6rem] border border-cyan-100 bg-cyan-50/50 p-5 shadow-sm">
                <div className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-700">{item.label}</div>
                <div className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-slate-950">{item.value}</div>
                <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Dashboard decision summary">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DASHBOARD_DECISION.map((item, index) => (
            <article key={item.label} className={index === 1 ? "rounded-[2rem] border border-cyan-200 bg-cyan-50/75 p-6 shadow-[0_20px_65px_rgba(14,165,233,0.08)] lg:-mt-6 lg:mb-6" : "rounded-[2rem] border border-white/80 bg-white/82 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.055)] backdrop-blur"}>
              <div className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-700">{item.label}</div>
              <div className="mt-4 text-3xl font-semibold tracking-[-0.055em] text-slate-950">{item.value}</div>
              <p className="mt-4 text-sm font-medium leading-7 text-slate-600">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Cendorq journey resolver">
        <div className="overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/82 shadow-[0_24px_80px_rgba(15,23,42,0.065)] backdrop-blur">
          <div className="border-b border-cyan-100 p-6 sm:p-8 lg:p-10">
            <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
              <h2 className="text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-6xl">Cendorq decides what can start before work starts.</h2>
              <p className="max-w-3xl text-base font-medium leading-8 text-slate-600">
                Purchases unlock the correct workflow, but delivery only moves when ownership, intake, evidence, diagnosis, and approval fit the stage. This keeps Repair and Control from quietly becoming unpaid Review work.
              </p>
            </div>
          </div>

          <div className="grid gap-0 lg:grid-cols-4">
            {JOURNEY_DECISIONS.map((item) => {
              const blocked = item.decision.backendWorkState === "do-not-start";
              const ready = item.decision.deliveryCanStart;
              const statusLabel = ready ? "Ready" : blocked ? "Held" : "Needs input";
              return (
                <Link key={item.label} href={item.href} className="group border-b border-cyan-100 p-5 transition hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 lg:border-b-0 lg:border-r last:lg:border-r-0 sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-700">{item.label}</div>
                    <span className={ready ? "rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-emerald-700" : blocked ? "rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-amber-700" : "rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-cyan-700"}>
                      {statusLabel}
                    </span>
                  </div>
                  <h3 className="mt-4 text-3xl font-semibold tracking-[-0.055em] text-slate-950">{item.title}</h3>
                  <p className="mt-4 text-sm font-medium leading-7 text-slate-600">{item.decision.safeCustomerMessage}</p>
                  <dl className="mt-5 grid gap-3 text-sm">
                    <div>
                      <dt className="text-[11px] font-black uppercase tracking-[0.18em] text-cyan-700">Fulfillment</dt>
                      <dd className="mt-1 font-semibold text-slate-950">{humanize(item.decision.fulfillmentState)}</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] font-black uppercase tracking-[0.18em] text-cyan-700">Backend</dt>
                      <dd className="mt-1 font-semibold text-slate-950">{humanize(item.decision.backendWorkState)}</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] font-black uppercase tracking-[0.18em] text-cyan-700">Missing</dt>
                      <dd className="mt-1 text-slate-600">{item.decision.missingRequirements.length ? item.decision.missingRequirements.slice(0, 2).join(", ") : "Nothing blocking the next queue."}</dd>
                    </div>
                  </dl>
                  <span className="mt-5 inline-flex text-sm font-bold text-cyan-700 transition group-hover:text-slate-950">Open next step →</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Dashboard readiness path">
        <div className="overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/82 shadow-[0_24px_80px_rgba(15,23,42,0.065)] backdrop-blur">
          <div className="grid gap-0 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="border-b border-cyan-100 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <h2 className="text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-6xl">Scan. Review. Repair. Control.</h2>
              <p className="mt-5 text-base font-medium leading-8 text-slate-600">Every action in the dashboard should return the customer to the right readiness layer.</p>
              <Link href="/plans" className="mt-7 inline-flex text-sm font-bold text-cyan-700 transition hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2">
                Compare all plans →
              </Link>
            </div>
            <div className="divide-y divide-cyan-100">
              {CUSTOMER_COMMAND_PATH.map((stage) => (
                <Link key={stage.planKey} href={stage.href} className="group grid gap-4 p-5 transition hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 sm:grid-cols-[11rem_1fr_auto] sm:items-center sm:p-6">
                  <div>
                    <div className="text-4xl font-semibold tracking-[-0.06em] text-slate-950">{stage.command}</div>
                    <div className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-700">{stage.value.customerName}</div>
                  </div>
                  <p className="max-w-2xl text-sm font-medium leading-6 text-slate-600">{stage.buyerMoment}</p>
                  <div className="flex items-center justify-between gap-4 sm:block sm:text-right">
                    <div className="text-sm font-black text-cyan-700">{stage.price}</div>
                    <span className="mt-1 inline-flex text-sm font-bold text-cyan-700 transition group-hover:text-slate-950">{stage.cta} →</span>
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
            <Link key={item.href} href={item.href} className="rounded-[2rem] border border-white/80 bg-white/82 p-6 text-sm font-medium leading-6 text-slate-600 shadow-[0_18px_55px_rgba(15,23,42,0.055)] backdrop-blur transition hover:-translate-y-1 hover:border-cyan-200 hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2">
              <span className="block text-2xl font-semibold tracking-[-0.04em] text-slate-950">{item.title}</span>
              <span className="mt-3 block text-slate-600">{item.copy}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6"><DashboardActionInbox /></section>
      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6"><DashboardBusinessCommandCenter /></section>
      <section className="relative mx-auto max-w-[92rem] px-4 pb-16 sm:px-6"><DashboardControlRoomReentry /></section>

      <section className="sr-only" aria-label="Dashboard validation guardrails">
        AI readiness control center. Private AI readiness control center. Know what AI engines and customers can understand next. Next best move. Open the first signal. Dashboard decision summary. Cendorq journey resolver. Journey resolver. Fulfillment state. Backend work state. Held prerequisite required. Held intake required. Delivery can start only after ownership, intake, evidence, diagnosis, and approval fit the Cendorq stage. Readiness path. Scan. Review. Repair. Control. Dashboard command links. Light customer dashboard. No black dashboard blocks. No dark blue dashboard blocks. No cheap dashboard blocks. No clutter wall. No internal conversion role labels. Customer-led dashboard. Readiness proof. Plan depth. Signal feed. Support routing. Unified Cendorq Experience System. {CENDORQ_EXPERIENCE_GUARDRAILS.join(" ")} {CUSTOMER_PLATFORM_STAGES.map((stage) => `${stage.key} ${stage.label} ${stage.customerPromise} ${stage.conversionRole}`).join(" ")} {CUSTOMER_COMMAND_PATH.map((stage) => `${stage.planKey} ${stage.command} ${stage.value.customerName} ${stage.value.primaryValue} ${stage.value.customerOutcome} ${stage.buyerMoment}`).join(" ")} {JOURNEY_DECISIONS.map((item) => `${item.label} ${item.title} ${item.decision.customerStage} ${item.decision.fulfillmentState} ${item.decision.backendWorkState} ${item.decision.customerNextAction} ${item.decision.operatorNextAction} ${item.decision.missingRequirements.join(" ")}`).join(" ")} {PLAN_VALUE_SEPARATION_RULES.join(" ")} {DASHBOARD_HANDOFFS.map((handoff) => `${handoff.decision} ${handoff.surfaceKey} ${handoff.currentState} ${handoff.safeNextAction} ${handoff.recoveryPath} ${handoff.connectedDestination}`).join(" ")}
      </section>
    </main>
  );
}

function DashboardAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(251,207,232,0.16),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.17),transparent_27%),linear-gradient(180deg,rgba(255,255,255,0.4),rgba(239,249,255,0.74)_42%,rgba(255,255,255,0.95)_100%)]" />
      <div className="absolute left-1/2 top-0 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-cyan-200/24 blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.018]" />
    </div>
  );
}

function humanize(value: string) {
  return value.replaceAll("-", " ");
}
