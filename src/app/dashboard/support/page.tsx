import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { getCendorqPlanPrice } from "@/lib/pricing-checkout-orchestration";
import {
  getPlanValueDelivery,
  PLAN_VALUE_SEPARATION_RULES,
  type PlanValueKey,
} from "@/lib/plan-value-delivery-architecture";

export const metadata = buildMetadata({
  title: "Support and corrections | Cendorq",
  description: "Your private Cendorq support center for report questions, corrections, billing help, security review, and plan guidance.",
  path: "/dashboard/support",
  noIndex: true,
});

const DEEP_REVIEW = getCendorqPlanPrice("deep-review");
const BUILD_FIX = getCendorqPlanPrice("build-fix");
const ONGOING_CONTROL = getCendorqPlanPrice("ongoing-control");

const SUPPORT_ROUTING_MAP = [
  {
    key: "billing-issue",
    label: "Billing issue",
    title: "Fix checkout, invoice, or entitlement access",
    href: "/dashboard/billing",
    cta: "Open billing",
    customerValue: "Recover payment, invoice, or plan access without exposing card data in a support message.",
    safeBoundary: "Support can explain the path and route the issue, but payment changes and refund outcomes require approved billing gates.",
    nextAction: "Open billing first, then submit a protected request only if the billing center cannot resolve the blocker.",
  },
  {
    key: "report-question",
    label: "Report question",
    title: "Understand a finding before acting",
    href: "/dashboard/reports",
    cta: "Open report vault",
    customerValue: "Clarify confidence labels, limitations, evidence boundaries, and the recommendation behind a result.",
    safeBoundary: "Support should not turn a Free Scan question into a full Deep Review diagnosis unless Deep Review is unlocked.",
    nextAction: "Open the relevant report, review the plan boundary, then ask for clarification with a safe summary if needed.",
  },
  {
    key: "build-fix-scope",
    label: "Build Fix scope question",
    title: "Confirm what can be implemented",
    href: BUILD_FIX.checkoutPath,
    cta: `See Build Fix ${BUILD_FIX.price}`,
    customerValue: "Decide whether a known weak page, message, proof point, or action path is ready for scoped implementation.",
    safeBoundary: "Support should not promise unlimited implementation, full site rebuild, monthly monitoring, or unapproved production work.",
    nextAction: "Confirm the fix target, approved business details, output approval path, and what is outside the scope.",
  },
  {
    key: "ongoing-control-priority",
    label: "Ongoing Control monthly priority",
    title: "Choose what should be watched this month",
    href: ONGOING_CONTROL.checkoutPath,
    cta: `Start Ongoing Control ${ONGOING_CONTROL.price}`,
    customerValue: "Turn recurring questions into a monthly priority, monitoring scope, alerts, and decision support.",
    safeBoundary: "Support should not frame Ongoing Control as unlimited Build Fix work, repeated Deep Review reports, ad management, or guaranteed ranking/AI placement.",
    nextAction: "Choose the monthly priority, target channels, competitor set, reporting preference, and approval contact.",
  },
  {
    key: "account-access",
    label: "Account access",
    title: "Restore safe dashboard entry",
    href: "/login",
    cta: "Send magic link",
    customerValue: "Recover access to reports, billing, notifications, and support without leaking private account or security data.",
    safeBoundary: "Support should not expose raw security payloads, attacker details, session tokens, internal risk logic, or cross-customer data.",
    nextAction: "Use magic-link re-entry first, then request support only if verified access still fails.",
  },
  {
    key: "correction-dispute",
    label: "Correction or dispute",
    title: "Request a bounded review",
    href: "/dashboard/support/request",
    cta: "Start protected request",
    customerValue: "Ask Cendorq to review something that may be incomplete, wrong, outdated, or misunderstood.",
    safeBoundary: "Support can review and route corrections, but report changes require the proper review gate before anything becomes customer-facing.",
    nextAction: "Submit a safe summary with the report area, concern, customer-safe context, and the correction requested.",
  },
] as const;

const PLAN_SUPPORT_BOUNDARIES = [
  {
    planKey: "free-scan",
    href: "/dashboard/reports/free-scan",
    cta: "Open Free Scan result",
    supportRole: "Explain the first signal, evidence boundary, confidence posture, and why deeper diagnosis may be needed.",
    supportMustNot: "Do not provide full root-cause diagnosis, implementation direction, private investigation, or monthly monitoring as Free Scan support.",
    value: getPlanValueDelivery("free-scan"),
  },
  {
    planKey: "deep-review",
    href: DEEP_REVIEW.checkoutPath,
    cta: `Unlock Deep Review ${DEEP_REVIEW.price}`,
    supportRole: "Help the customer understand cause-level diagnosis, evidence, priority, and the decision path.",
    supportMustNot: "Do not promise done-for-you implementation, unlimited revisions, ad management, or guaranteed outcomes as Deep Review support.",
    value: getPlanValueDelivery("deep-review"),
  },
  {
    planKey: "build-fix",
    href: BUILD_FIX.checkoutPath,
    cta: `Unlock Build Fix ${BUILD_FIX.price}`,
    supportRole: "Clarify scope, approved business details, customer-output approval, and delivery expectations for a defined improvement.",
    supportMustNot: "Do not turn Build Fix support into unlimited site work, monthly monitoring, or unapproved production changes.",
    value: getPlanValueDelivery("build-fix"),
  },
  {
    planKey: "ongoing-control",
    href: ONGOING_CONTROL.checkoutPath,
    cta: `Start Ongoing Control ${ONGOING_CONTROL.price}`,
    supportRole: "Help select monthly priorities, review cadence, monitoring scope, and decision support needs.",
    supportMustNot: "Do not sell Ongoing Control as unlimited Build Fix, guaranteed ranking, guaranteed AI answer placement, or ad management.",
    value: getPlanValueDelivery("ongoing-control"),
  },
] as const satisfies readonly {
  planKey: PlanValueKey;
  href: string;
  cta: string;
  supportRole: string;
  supportMustNot: string;
  value: ReturnType<typeof getPlanValueDelivery>;
}[];

const SUPPORT_FIRST_USE_SNAPSHOT = [
  { label: "Help path", value: "Choose the right route", detail: "Customers should know whether they need report help, correction review, billing help, security review, or plan guidance." },
  { label: "Submission posture", value: "Safe summary only", detail: "Support should receive useful context without passwords, payment details, secrets, raw private evidence, or unnecessary payloads." },
  { label: "Status posture", value: "Track without internals", detail: "Status should show customer-safe progress, next actions, and hold reasons without internal notes or operator details." },
  { label: "Promise posture", value: "Approved outcomes only", detail: "Support copy must not promise refunds, legal outcomes, report changes, billing changes, or security outcomes without approval." },
] as const;

const SUPPORT_FIRST_USE_ACTIONS = [
  { title: "Start request", copy: "Use the protected intake when you need help or review.", href: "/dashboard/support/request" },
  { title: "Track status", copy: "Use status tracking when you already submitted a request.", href: "/dashboard/support/status" },
  { title: "Check alerts", copy: "Use notifications for support receipts and next actions.", href: "/dashboard/notifications" },
] as const;

const SUPPORT_FIRST_USE_RULES = [
  "Pick the narrowest help path that matches the problem before submitting a request.",
  "Do not submit passwords, card numbers, private keys, session tokens, raw attack strings, or unrelated private evidence.",
  "Waiting-on-customer states should ask for safe clarifications without echoing rejected unsafe content.",
  "Support can explain process, status, and next steps, but approved outcomes require the proper review gate.",
  "Support routing must separate billing issues, report questions, Build Fix scope questions, Ongoing Control monthly priorities, account access, and correction or dispute paths.",
] as const;

const SUPPORT_SAFETY_RULES = [
  "Support requires customer ownership and route authorization.",
  "Support messages should use safe summaries, not raw evidence, secrets, passwords, billing IDs, or private report internals.",
  "Correction requests must stay review-gated before any report change is shown to the customer.",
  "Billing, refund, legal, or report outcome promises require approval before being stated as commitments.",
] as const;

export default function SupportCenterPage() {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-6 text-white sm:px-6 md:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(103,232,249,0.12),transparent_32%),radial-gradient(circle_at_86%_8%,rgba(14,165,233,0.08),transparent_34%)]" />

      <section className="system-panel-authority relative z-10 rounded-[1.55rem] p-4 sm:rounded-[1.8rem] sm:p-8">
        <div className="grid gap-5 lg:grid-cols-[1fr_20rem] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Support and corrections</p>
            <h1 className="mt-3 max-w-5xl text-3xl font-semibold tracking-tight text-white sm:mt-4 sm:text-5xl">
              Route the blocker to the right path without blurring the plan.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:mt-5 sm:text-base sm:leading-8">
              Support should solve the issue, protect the proof trail, and return the customer to the correct report, billing, plan, or status path without promising work the plan does not include.
            </p>
          </div>
          <div className="rounded-[1.2rem] border border-cyan-300/20 bg-cyan-300/10 p-4 sm:rounded-[1.3rem] sm:p-5">
            <div className="text-sm font-semibold text-cyan-100">Best recovery path</div>
            <div className="mt-2 text-2xl font-semibold text-white">Track, then act</div>
            <p className="mt-2 text-sm leading-6 text-slate-200">Check status first. Submit a safe request only when the issue needs review or new context.</p>
            <Link href="/dashboard/support/status" className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950 sm:w-auto">
              Track status
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-7 rounded-[1.55rem] border border-white/10 bg-white/[0.035] p-4 sm:rounded-[1.7rem] sm:p-6" aria-label="Support routing map">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Support routing map</p>
            <h2 className="mt-2 max-w-4xl text-2xl font-semibold tracking-tight text-white sm:text-4xl">
              Pick the narrowest path that matches the blocker.
            </h2>
          </div>
          <Link href="/dashboard/support/request" className="text-sm font-semibold text-cyan-200 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
            Start protected request →
          </Link>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {SUPPORT_ROUTING_MAP.map((path) => (
            <article key={path.key} className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4 sm:p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-100">{path.label}</p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">{path.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{path.customerValue}</p>
              <p className="mt-3 rounded-[1rem] border border-white/10 bg-slate-950/50 p-3 text-sm leading-6 text-slate-400">{path.safeBoundary}</p>
              <p className="mt-3 text-sm leading-6 text-cyan-100">{path.nextAction}</p>
              <Link href={path.href} className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10 px-4 py-3 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-300/20 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
                {path.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-7 rounded-[1.55rem] border border-white/10 bg-white/[0.035] p-4 sm:rounded-[1.7rem] sm:p-6" aria-label="Plan support boundaries">
        <div>
          <p className="text-sm font-semibold text-cyan-100">Plan support boundaries</p>
          <h2 className="mt-2 max-w-4xl text-2xl font-semibold tracking-tight text-white sm:text-4xl">
            Support explains the plan. It does not quietly expand it.
          </h2>
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
          {PLAN_SUPPORT_BOUNDARIES.map((plan) => (
            <article key={plan.planKey} className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4 sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="text-xl font-semibold tracking-tight text-white">{plan.value.customerName}</h3>
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-sm font-semibold text-cyan-100">{plan.value.price}</span>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-300">{plan.supportRole}</p>
              <p className="mt-3 rounded-[1rem] border border-white/10 bg-slate-950/50 p-3 text-sm leading-6 text-slate-400">{plan.supportMustNot}</p>
              <Link href={plan.href} className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10 px-4 py-3 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-300/20 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
                {plan.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-7 grid gap-4 md:grid-cols-3" aria-label="Support actions">
        <Link href="/dashboard/support/request" className="rounded-[1.2rem] border border-white/10 bg-white/[0.035] p-4 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/30 hover:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">Start protected request →</Link>
        <Link href="/dashboard/support/status" className="rounded-[1.2rem] border border-white/10 bg-white/[0.035] p-4 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/30 hover:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">View support status →</Link>
        <Link href="/dashboard/notifications" className="rounded-[1.2rem] border border-white/10 bg-white/[0.035] p-4 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/30 hover:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">Open notifications →</Link>
      </section>

      <section className="sr-only" aria-label="Support guardrails">
        Get help without losing the proof trail. Support routing map. Pick the narrowest path that matches the blocker. Billing issue. Report question. Build Fix scope question. Ongoing Control monthly priority. Account access. Correction or dispute. Plan support boundaries. Support explains the plan. It does not quietly expand it. Start protected request. View support status. Open notification center. Support center first use snapshot. Support center first use guidance. First support visit. First-use rules. Start a protected request. Use a safe support summary. Support safety rules. {SUPPORT_ROUTING_MAP.map((path) => `${path.key} ${path.label} ${path.title} ${path.customerValue} ${path.safeBoundary} ${path.nextAction}`).join(" ")} {PLAN_SUPPORT_BOUNDARIES.map((plan) => `${plan.planKey} ${plan.value.customerName} ${plan.supportRole} ${plan.supportMustNot} ${plan.value.primaryValue}`).join(" ")} {PLAN_VALUE_SEPARATION_RULES.join(" ")} {SUPPORT_FIRST_USE_SNAPSHOT.map((item) => `${item.label} ${item.value} ${item.detail}`).join(" ")} {SUPPORT_FIRST_USE_ACTIONS.map((item) => `${item.title} ${item.copy} ${item.href}`).join(" ")} {SUPPORT_FIRST_USE_RULES.join(" ")} {SUPPORT_SAFETY_RULES.join(" ")}
      </section>
    </main>
  );
}
