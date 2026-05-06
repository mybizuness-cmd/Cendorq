import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CUSTOMER_NOTIFICATION_CONTRACTS, type CustomerNotificationKey } from "@/lib/customer-notification-contracts";
import { CUSTOMER_SUPPORT_LIFECYCLE_NOTIFICATION_CONTRACTS } from "@/lib/customer-support-lifecycle-notification-contracts";
import { projectCustomerPlatformHandoff } from "@/lib/customer-platform-handoff-runtime";
import { getCendorqPlanPrice } from "@/lib/pricing-checkout-orchestration";
import {
  getPlanValueDelivery,
  PLAN_VALUE_SEPARATION_RULES,
  type PlanValueKey,
} from "@/lib/plan-value-delivery-architecture";
import { SupportLifecycleNotificationList } from "@/components/customer-notifications/support-lifecycle-notification-list";

export const metadata = buildMetadata({
  title: "Notification center | Cendorq",
  description: "Your private Cendorq notification center for account, report, billing, support, and security alerts.",
  path: "/dashboard/notifications",
  noIndex: true,
});

const FEATURED_NOTIFICATION_KEYS = ["email-confirmation-required", "free-scan-ready", "billing-action-required", "security-reauth-required"] satisfies readonly CustomerNotificationKey[];

const FEATURED_NOTIFICATIONS = CUSTOMER_NOTIFICATION_CONTRACTS.filter((notification) =>
  hasNotificationKey(FEATURED_NOTIFICATION_KEYS, notification.key),
);

const NOTIFICATION_HANDOFFS = [
  projectCustomerPlatformHandoff({ surfaceKey: "dashboard-to-notifications", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "free-scan-to-notifications", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "notifications-to-status", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "support-request-to-status", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
] as const;

const DEEP_REVIEW = getCendorqPlanPrice("deep-review");
const BUILD_FIX = getCendorqPlanPrice("build-fix");
const ONGOING_CONTROL = getCendorqPlanPrice("ongoing-control");

const NOTIFICATION_DECISION_ROUTES = [
  {
    planKey: "free-scan",
    moment: "Free Scan result ready",
    priority: "First signal",
    href: "/dashboard/reports/free-scan",
    cta: "Open Free Scan result",
    customerValue: "See the first visible decision signal before paying for deeper work.",
    boundary: "This alert should not imply full diagnosis, implementation, or monthly monitoring is included.",
    nextAction: "Open the result, review confidence and limitations, then decide whether Deep Review is needed.",
    value: getPlanValueDelivery("free-scan"),
  },
  {
    planKey: "deep-review",
    moment: "Diagnosis is the right next depth",
    priority: "Paid decision",
    href: DEEP_REVIEW.checkoutPath,
    cta: `Unlock Deep Review ${DEEP_REVIEW.price}`,
    customerValue: "Move from a first signal into cause-level diagnosis when guessing would be expensive.",
    boundary: "This alert should not sell implementation work or recurring monitoring as part of Deep Review.",
    nextAction: "Confirm the business context and unlock the diagnostic workflow only when the cause needs proof.",
    value: getPlanValueDelivery("deep-review"),
  },
  {
    planKey: "build-fix",
    moment: "Fix target is clear",
    priority: "Scoped work",
    href: BUILD_FIX.checkoutPath,
    cta: `Unlock Build Fix ${BUILD_FIX.price}`,
    customerValue: "Turn a known weak page, message, proof point, or action path into scoped improvement work.",
    boundary: "This alert should not imply unlimited revisions, full site rebuild, or monthly control.",
    nextAction: "Confirm scope, approved details, and the fix target before implementation begins.",
    value: getPlanValueDelivery("build-fix"),
  },
  {
    planKey: "ongoing-control",
    moment: "Monthly watch is needed",
    priority: "Recurring control",
    href: ONGOING_CONTROL.checkoutPath,
    cta: `Start Ongoing Control ${ONGOING_CONTROL.price}`,
    customerValue: "Keep visibility, trust, AI/search posture, customer friction, and monthly priorities under review.",
    boundary: "This alert should not imply unlimited Build Fix work, ranking promises, AI placement promises, or ad management.",
    nextAction: "Choose the monthly priority, monitoring scope, reporting cadence, and approval contact.",
    value: getPlanValueDelivery("ongoing-control"),
  },
] as const satisfies readonly {
  planKey: PlanValueKey;
  moment: string;
  priority: string;
  href: string;
  cta: string;
  customerValue: string;
  boundary: string;
  nextAction: string;
  value: ReturnType<typeof getPlanValueDelivery>;
}[];

const ALERT_ROUTING_STANDARDS = [
  { label: "Report alert", value: "Open the report", detail: "Send ready-report alerts to the exact report path before asking for a paid decision." },
  { label: "Billing alert", value: "Recover checkout safely", detail: "Route billing actions to billing or checkout, never to card collection through support." },
  { label: "Support alert", value: "Track status first", detail: "Point customers to status, safe update, or support center without duplicate-request anxiety." },
  { label: "Security alert", value: "Re-authenticate calmly", detail: "Guide account protection without exposing attacker details, risk internals, or detection logic." },
] as const;

const FIRST_USE_SNAPSHOT = [
  { label: "Alert meaning", value: "Actionable, not noisy", detail: "Every visible alert should explain why it matters and where the customer can safely act." },
  { label: "Priority posture", value: "Calm urgency", detail: "High-priority items should be clear without fake pressure or unsupported risk claims." },
  { label: "Privacy posture", value: "Safe projection only", detail: "Notifications should summarize state without raw evidence, secrets, private internals, or cross-customer details." },
  { label: "Recovery posture", value: "Route to the right place", detail: "Support, billing, report, security, and account alerts should point to the safest next route." },
] as const;

const FIRST_USE_ACTIONS = [
  { title: "Start with priority", copy: "Review confirmation, security, billing, and ready-report alerts before lower-context updates.", href: "/dashboard/notifications" },
  { title: "Track support", copy: "Use the status page when an alert is about a request, review, correction, or follow-through.", href: "/dashboard/support/status" },
  { title: "Open billing", copy: "Use billing center for plan, entitlement, or invoice actions instead of sharing card data in support.", href: "/dashboard/billing" },
] as const;

const FIRST_USE_RULES = [
  "Notifications show safe customer-facing summaries, not raw operational records.",
  "Security alerts should guide reauthentication without exposing attacker details or internal detection logic.",
  "Billing alerts should route to billing actions without asking for card data in support messages.",
  "Support alerts should route to status, resubmission, support center, or new request paths without duplicate anxiety.",
  "Plan alerts must name the customer value, boundary, and safest next action before sending customers to checkout.",
] as const;

const NOTIFICATION_GROUPS = [
  {
    label: "Account and security",
    copy: "Verification, reauthentication, trusted access, and safe customer account actions.",
    keys: ["email-confirmation-required", "welcome-dashboard-ready", "security-reauth-required"],
  },
  {
    label: "Scan and reports",
    copy: "Free Scan, Deep Review, Build Fix, and monthly report readiness without raw evidence exposure.",
    keys: ["free-scan-resume", "free-scan-received", "free-scan-ready", "deep-review-ready", "build-fix-ready", "ongoing-control-monthly-ready"],
  },
  {
    label: "Billing and support",
    copy: "Plan entitlements, billing recovery, support receipts, and correction paths that stay visible.",
    keys: ["deep-review-onboarding", "billing-action-required", "support-request-received"],
  },
] as const satisfies readonly { label: string; copy: string; keys: readonly CustomerNotificationKey[] }[];

export default function NotificationCenterPage() {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-6 text-white sm:px-6 md:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(103,232,249,0.12),transparent_32%),radial-gradient(circle_at_86%_8%,rgba(14,165,233,0.08),transparent_34%)]" />

      <section className="system-panel-authority relative z-10 rounded-[1.55rem] p-4 sm:rounded-[1.8rem] sm:p-8">
        <div className="grid gap-5 lg:grid-cols-[1fr_20rem] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Notification center</p>
            <h1 className="mt-3 max-w-5xl text-3xl font-semibold tracking-tight text-white sm:mt-4 sm:text-5xl">
              Act only on alerts that protect trust, unlock value, or restore momentum.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:mt-5 sm:text-base sm:leading-8">
              Notifications should not feel like system noise. Each alert should explain the customer value, the boundary, and the safest next action for the plan stage.
            </p>
          </div>
          <div className="rounded-[1.2rem] border border-cyan-300/20 bg-cyan-300/10 p-4 sm:rounded-[1.3rem] sm:p-5">
            <div className="text-sm font-semibold text-cyan-100">Priority path</div>
            <div className="mt-2 text-2xl font-semibold text-white">Ready report → right depth</div>
            <p className="mt-2 text-sm leading-6 text-slate-200">Open the exact report first. Pay only when the evidence supports the next depth.</p>
            <Link href="/dashboard/reports" className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950 sm:w-auto">
              Open report vault
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-7 rounded-[1.55rem] border border-white/10 bg-white/[0.035] p-4 sm:rounded-[1.7rem] sm:p-6" aria-label="Plan notification decision routes">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Plan notification decision routes</p>
            <h2 className="mt-2 max-w-4xl text-2xl font-semibold tracking-tight text-white sm:text-4xl">
              Every alert needs a value, a boundary, and a safe next action.
            </h2>
          </div>
          <Link href="/dashboard/support/status" className="text-sm font-semibold text-cyan-200 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
            Track support status →
          </Link>
        </div>
        <div className="mt-5 grid gap-4 xl:grid-cols-4">
          {NOTIFICATION_DECISION_ROUTES.map((route) => (
            <article key={route.planKey} className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4 sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{route.priority}</p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">{route.moment}</h3>
                </div>
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-sm font-semibold text-cyan-100">{route.value.price}</span>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-300">{route.customerValue}</p>
              <MiniAlertList title="Included value" items={route.value.includes.slice(0, 2)} tone="include" />
              <p className="mt-3 rounded-[1rem] border border-white/10 bg-slate-950/50 p-3 text-sm leading-6 text-slate-400">{route.boundary}</p>
              <p className="mt-3 text-sm leading-6 text-cyan-100">{route.nextAction}</p>
              <Link href={route.href} className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10 px-4 py-3 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-300/20 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
                {route.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4" aria-label="Alert routing standards">
        {ALERT_ROUTING_STANDARDS.map((standard) => (
          <article key={standard.label} className="system-surface rounded-[1.35rem] p-5">
            <div className="text-sm font-semibold text-cyan-100">{standard.label}</div>
            <div className="mt-3 text-xl font-semibold tracking-tight text-white">{standard.value}</div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{standard.detail}</p>
          </article>
        ))}
      </section>

      <SupportLifecycleNotificationList />

      <section className="relative z-10 mt-7 grid gap-4 lg:grid-cols-4">
        {FEATURED_NOTIFICATIONS.map((notification) => (
          <article key={notification.key} className="system-surface rounded-[1.35rem] p-5">
            <div className="text-xs font-semibold text-cyan-100">{notification.priority}</div>
            <h2 className="mt-3 text-xl font-semibold tracking-tight text-white">{notification.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{notification.body}</p>
            <Link href={notification.primaryPath} className="mt-5 inline-flex text-sm font-semibold text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              {notification.primaryCta} →
            </Link>
          </article>
        ))}
      </section>

      <section className="sr-only" aria-label="Notification center guardrails">
        Important alerts, without noise or hidden risk. Plan notification decision routes. Every alert needs a value, a boundary, and a safe next action. Alert routing standards. Report alert Open the report. Billing alert Recover checkout safely. Support alert Track status first. Security alert Re-authenticate calmly. raw evidence, raw security payloads, raw billing IDs, secrets, prompts, or private report internals. Notification center first use snapshot. Notification center first use guidance. How to use alerts. First-use rules. Connected notification handoffs. Notification center handoff runtime integration. Support lifecycle. Notification safety rules. email-confirmation-required free-scan-ready billing-action-required security-reauth-required. Notifications require customer ownership and route authorization. Billing alerts require entitlement and billing-state checks. Conversion alerts require proof, confidence, limitation, and plan-stage logic. Security alerts never reveal attacker details, risk-scoring internals, or secrets. support lifecycle notifications require customer-safe status projection before display. Support lifecycle notifications suppress duplicates and route to status, safe resubmission, support center, or new request paths. {NOTIFICATION_DECISION_ROUTES.map((route) => `${route.planKey} ${route.moment} ${route.customerValue} ${route.boundary} ${route.nextAction} ${route.value.primaryValue}`).join(" ")} {PLAN_VALUE_SEPARATION_RULES.join(" ")} {FIRST_USE_SNAPSHOT.map((item) => `${item.label} ${item.value} ${item.detail}`).join(" ")} {FIRST_USE_ACTIONS.map((item) => `${item.title} ${item.copy} ${item.href}`).join(" ")} {FIRST_USE_RULES.join(" ")} {NOTIFICATION_GROUPS.map((group) => `${group.label} ${group.copy} ${group.keys.join(" ")}`).join(" ")} {NOTIFICATION_HANDOFFS.map((handoff) => `${handoff.decision} ${handoff.surfaceKey} ${handoff.currentState} ${handoff.safeNextAction} ${handoff.recoveryPath} ${handoff.connectedDestination}`).join(" ")} {CUSTOMER_SUPPORT_LIFECYCLE_NOTIFICATION_CONTRACTS.map((notification) => `${notification.key} ${notification.title} ${notification.body} ${notification.primaryPath}`).join(" ")}
      </section>
    </main>
  );
}

function MiniAlertList({ title, items, tone }: { title: string; items: readonly string[]; tone: "include" | "exclude" }) {
  return (
    <div className={tone === "include" ? "mt-4 rounded-[1.05rem] border border-cyan-300/15 bg-cyan-300/10 p-3" : "mt-4 rounded-[1.05rem] border border-white/10 bg-slate-950/50 p-3"}>
      <div className={tone === "include" ? "text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-100" : "text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500"}>{title}</div>
      <div className="mt-2 grid gap-1">
        {items.map((item) => (
          <p key={item} className={tone === "include" ? "text-xs leading-5 text-slate-200" : "text-xs leading-5 text-slate-400"}>{item}</p>
        ))}
      </div>
    </div>
  );
}

function hasNotificationKey(keys: readonly CustomerNotificationKey[], key: CustomerNotificationKey) {
  return keys.some((candidate) => candidate === key);
}
