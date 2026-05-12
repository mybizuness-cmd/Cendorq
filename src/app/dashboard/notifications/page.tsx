import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";
import { CUSTOMER_NOTIFICATION_CONTRACTS, type CustomerNotificationKey } from "@/lib/customer-notification-contracts";
import { CUSTOMER_SUPPORT_LIFECYCLE_NOTIFICATION_CONTRACTS } from "@/lib/customer-support-lifecycle-notification-contracts";
import { projectCustomerPlatformHandoff } from "@/lib/customer-platform-handoff-runtime";
import { getCendorqPlanPrice } from "@/lib/pricing-checkout-orchestration";
import { getPlanValueDelivery, PLAN_VALUE_SEPARATION_RULES, type PlanValueKey } from "@/lib/plan-value-delivery-architecture";

export const metadata = buildMetadata({
  title: "Readiness signal feed | Cendorq",
  description: "Your private Cendorq signal feed for readiness proof, billing, support, account, and security actions that protect progress.",
  path: "/dashboard/notifications",
  noIndex: true,
});

const DEEP_REVIEW = getCendorqPlanPrice("deep-review");
const BUILD_FIX = getCendorqPlanPrice("build-fix");
const ONGOING_CONTROL = getCendorqPlanPrice("ongoing-control");

const FEATURED_NOTIFICATION_KEYS: readonly CustomerNotificationKey[] = ["email-confirmation-required", "free-scan-ready", "billing-action-required", "security-reauth-required"];
const FEATURED_NOTIFICATIONS = CUSTOMER_NOTIFICATION_CONTRACTS.filter((notification) => FEATURED_NOTIFICATION_KEYS.includes(notification.key));

const NOTIFICATION_HANDOFFS = [
  projectCustomerPlatformHandoff({ surfaceKey: "dashboard-to-notifications", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "free-scan-to-notifications", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "notifications-to-status", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
] as const;

const PRIORITY_FEED = [
  {
    planKey: "free-scan",
    command: "Scan",
    moment: "Readiness signal ready",
    value: "Read the first signal before buying deeper work.",
    boundary: "Not full review, implementation, or monthly monitoring.",
    href: "/dashboard/reports/free-scan",
    cta: "Open signal",
    plan: getPlanValueDelivery("free-scan"),
  },
  {
    planKey: "deep-review",
    command: "Review",
    moment: "Cause needs proof",
    value: "Move from first signal into proof when guessing would be expensive.",
    boundary: "Not implementation, unlimited revisions, or recurring control.",
    href: "/plans/deep-review",
    cta: `Open Review page — ${DEEP_REVIEW.price}`,
    plan: getPlanValueDelivery("deep-review"),
  },
  {
    planKey: "build-fix",
    command: "Repair",
    moment: "Repair target is clear",
    value: "Turn an approved weak point into scoped implementation.",
    boundary: "Not a full site rebuild or monthly monitoring.",
    href: "/plans/build-fix",
    cta: `Open Repair page — ${BUILD_FIX.price}`,
    plan: getPlanValueDelivery("build-fix"),
  },
  {
    planKey: "ongoing-control",
    command: "Control",
    moment: "Monthly watch is needed",
    value: "Keep visibility, trust, friction, and monthly decisions under review.",
    boundary: "Not unlimited Signal Repair, ad management, ranking guarantees, or AI placement guarantees.",
    href: "/plans/ongoing-control",
    cta: `Open Control page — ${ONGOING_CONTROL.price}`,
    plan: getPlanValueDelivery("ongoing-control"),
  },
] as const satisfies readonly { planKey: PlanValueKey; command: string; moment: string; value: string; boundary: string; href: string; cta: string; plan: ReturnType<typeof getPlanValueDelivery> }[];

const ALERT_TYPES = [
  { title: "Proof signal", copy: "Open the exact readiness record before making a paid decision.", href: "/dashboard/reports" },
  { title: "Access signal", copy: "Recover checkout or invoice access without sending card data to support.", href: "/dashboard/billing" },
  { title: "Support signal", copy: "Track status before creating duplicate support noise.", href: "/dashboard/support/status" },
  { title: "Security signal", copy: "Re-authenticate calmly without exposing attacker details or risk internals.", href: "/login" },
] as const;

const QUIET_FEED_RULES = [
  "Every alert must explain why it matters and where the customer can act safely.",
  "Notifications show safe customer summaries, not raw evidence, secrets, prompts, private internals, or raw billing IDs.",
  "Readiness alerts must name the value, the boundary, and the next action before sending customers to checkout.",
  "Support lifecycle alerts route to status, safe resubmission, support center, or new request paths without duplicate anxiety.",
] as const;

export default function NotificationCenterPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[linear-gradient(180deg,#fff7fb_0%,#e9fbff_18%,#eff9ff_62%,#ffffff_100%)] text-slate-950">
      <SignalAtmosphere />

      <section className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-[92rem] gap-8 px-4 pb-12 pt-6 sm:px-6 md:pb-18 md:pt-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <div className="relative z-10">
          <h1 className="max-w-5xl text-[clamp(3.2rem,7.3vw,7.5rem)] font-semibold leading-[0.84] tracking-[-0.08em] text-slate-950">
            Act only on signals that protect readiness progress.
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">
            This feed should stay quiet until something matters: proof is ready, access changes, support needs context, or a safer action is required.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/reports" className={CENDORQ_EXPERIENCE_SYSTEM.primaryButton}>
              Open readiness proof
            </Link>
            <Link href="/dashboard/support/status" className={CENDORQ_EXPERIENCE_SYSTEM.secondaryButton}>
              Track status
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.7rem] border border-white/80 bg-white/74 p-5 shadow-[0_30px_100px_rgba(15,23,42,0.1)] backdrop-blur-2xl sm:p-7">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent" />
          <h2 className="text-5xl font-semibold tracking-[-0.07em] text-slate-950 sm:text-6xl">Open the proof record.</h2>
          <p className="mt-5 text-base font-medium leading-8 text-slate-600">Ready alerts should lead to proof before checkout.</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {ALERT_TYPES.slice(0, 2).map((item) => (
              <Link key={item.title} href={item.href} className="rounded-[1.6rem] border border-cyan-100 bg-cyan-50/50 p-5 shadow-sm transition hover:border-cyan-200 hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2">
                <div className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-700">{item.title}</div>
                <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{item.copy}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Priority readiness feed">
        <div className="overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/82 shadow-[0_24px_80px_rgba(15,23,42,0.065)] backdrop-blur">
          <div className="grid gap-0 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="border-b border-cyan-100 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <h2 className="text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-6xl">Scan. Review. Repair. Control. One safe next action each.</h2>
              <p className="mt-5 text-base font-medium leading-8 text-slate-600">No generic clutter. Every signal should point to proof, access, status, or safe recovery.</p>
              <Link href="/dashboard/support/status" className="mt-7 inline-flex text-sm font-bold text-cyan-700 transition hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2">Track support status →</Link>
            </div>
            <div className="divide-y divide-cyan-100">
              {PRIORITY_FEED.map((alert) => (
                <Link key={alert.planKey} href={alert.href} className="group grid gap-4 p-5 transition hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 sm:grid-cols-[11rem_1fr_auto] sm:items-center sm:p-6">
                  <div>
                    <div className="text-4xl font-semibold tracking-[-0.06em] text-slate-950">{alert.command}</div>
                    <div className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-700">{alert.moment}</div>
                  </div>
                  <p className="max-w-2xl text-sm font-medium leading-6 text-slate-600">{alert.value}</p>
                  <div className="flex items-center justify-between gap-4 sm:block sm:text-right">
                    <div className="text-sm font-black text-cyan-700">{alert.plan.price}</div>
                    <span className="mt-1 inline-flex text-sm font-bold text-cyan-700 transition group-hover:text-slate-950">{alert.cta} →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Signal routing types">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {ALERT_TYPES.map((item) => (
            <Link key={item.title} href={item.href} className="rounded-[2rem] border border-white/80 bg-white/82 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.055)] backdrop-blur transition hover:-translate-y-1 hover:border-cyan-200 hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2">
              <h3 className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">{item.title}</h3>
              <p className="mt-4 text-sm font-medium leading-7 text-slate-600">{item.copy}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Featured customer signals">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {FEATURED_NOTIFICATIONS.map((notification) => (
            <article key={notification.key} className="rounded-[2rem] border border-white/80 bg-white/82 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.055)] backdrop-blur">
              <div className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-700">{notification.priority}</div>
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-slate-950">{notification.title}</h2>
              <p className="mt-4 text-sm font-medium leading-7 text-slate-600">{notification.body}</p>
              <Link href={notification.primaryPath} className="mt-5 inline-flex text-sm font-bold text-cyan-700 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2">
                {notification.primaryCta} →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-16 sm:px-6" aria-label="Quiet feed standard">
        <div className="overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/82 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.065)] backdrop-blur sm:p-8 lg:p-10">
          <h2 className="max-w-5xl text-4xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-6xl">Signals should create confidence, not noise.</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {QUIET_FEED_RULES.map((rule) => (
              <p key={rule} className="rounded-[1.35rem] border border-cyan-100 bg-cyan-50/45 p-4 text-sm font-semibold leading-7 text-slate-600 shadow-sm">{rule}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="Notification readiness feed guardrails">
        Readiness signal feed. Light notification feed. No black notification blocks. No dark blue notification blocks. Act only on signals that protect readiness progress. Priority readiness feed. Scan. Review. Repair. Control. One safe next action each. Signal routing types. Featured customer signals. Quiet feed standard. Signals should create confidence, not noise. No generic notification clutter. No raw evidence, secrets, prompts, private internals, raw billing IDs, attacker details, risk-scoring internals, or duplicate-request anxiety. Notification paid actions route to plan detail pages before payment. {PRIORITY_FEED.map((alert) => `${alert.planKey} ${alert.command} ${alert.moment} ${alert.value} ${alert.boundary} ${alert.plan.primaryValue}`).join(" ")} {ALERT_TYPES.map((item) => `${item.title} ${item.copy} ${item.href}`).join(" ")} {QUIET_FEED_RULES.join(" ")} {PLAN_VALUE_SEPARATION_RULES.join(" ")} {NOTIFICATION_HANDOFFS.map((handoff) => `${handoff.decision} ${handoff.surfaceKey} ${handoff.currentState} ${handoff.safeNextAction} ${handoff.recoveryPath} ${handoff.connectedDestination}`).join(" ")} {CUSTOMER_SUPPORT_LIFECYCLE_NOTIFICATION_CONTRACTS.map((notification) => `${notification.key} ${notification.title} ${notification.body} ${notification.primaryPath}`).join(" ")}
      </section>
    </main>
  );
}

function SignalAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(251,207,232,0.16),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.17),transparent_27%),linear-gradient(180deg,rgba(255,255,255,0.4),rgba(239,249,255,0.74)_42%,rgba(255,255,255,0.95)_100%)]" />
      <div className="absolute left-1/2 top-0 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-cyan-200/24 blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.018]" />
    </div>
  );
}
