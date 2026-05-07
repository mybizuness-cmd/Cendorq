import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { getCendorqPlanPrice } from "@/lib/pricing-checkout-orchestration";
import { getPlanValueDelivery, PLAN_VALUE_SEPARATION_RULES, type PlanValueKey } from "@/lib/plan-value-delivery-architecture";

export const metadata = buildMetadata({
  title: "Support command routing | Cendorq",
  description: "Your private Cendorq support command center for report questions, corrections, billing help, security review, and command-depth guidance.",
  path: "/dashboard/support",
  noIndex: true,
});

const DEEP_REVIEW = getCendorqPlanPrice("deep-review");
const BUILD_FIX = getCendorqPlanPrice("build-fix");
const ONGOING_CONTROL = getCendorqPlanPrice("ongoing-control");

const SUPPORT_ROUTES = [
  {
    key: "billing-issue",
    label: "Billing issue",
    title: "Restore access or payment flow first.",
    href: "/dashboard/billing",
    cta: "Open billing",
    value: "Recover payment, invoice, or command-depth access without sending card data through support.",
    boundary: "Support can route the issue, but payment changes require approved billing gates.",
  },
  {
    key: "report-question",
    label: "Report question",
    title: "Understand the proof before acting.",
    href: "/dashboard/reports",
    cta: "Open report vault",
    value: "Clarify confidence, limits, evidence boundaries, and next-command logic.",
    boundary: "A Free Scan question does not become full Deep Review diagnosis unless unlocked.",
  },
  {
    key: "scope-question",
    label: "Fix scope",
    title: "Confirm what can be improved.",
    href: BUILD_FIX.checkoutPath,
    cta: `See Build Fix ${BUILD_FIX.price}`,
    value: "Decide whether a known weak page, message, proof point, or action path is ready for scoped work.",
    boundary: "No unlimited implementation, full rebuild, monthly monitoring, or unapproved production work.",
  },
  {
    key: "monthly-priority",
    label: "Control priority",
    title: "Choose what should be watched.",
    href: ONGOING_CONTROL.checkoutPath,
    cta: `Start ${ONGOING_CONTROL.price}`,
    value: "Turn recurring visibility questions into a monthly focus, review cadence, alerts, and decision support.",
    boundary: "Not unlimited Build Fix, repeated Deep Review, ad management, or guaranteed ranking/AI placement.",
  },
  {
    key: "account-access",
    label: "Account access",
    title: "Restore safe command entry.",
    href: "/login",
    cta: "Send magic link",
    value: "Recover access without exposing account internals, session tokens, or private security data.",
    boundary: "Support cannot expose raw security payloads, attacker details, or internal risk logic.",
  },
  {
    key: "correction-dispute",
    label: "Correction or dispute",
    title: "Request bounded review.",
    href: "/dashboard/support/request",
    cta: "Start request",
    value: "Ask Cendorq to review something incomplete, wrong, outdated, or misunderstood.",
    boundary: "Changes require review gates before anything becomes customer-facing.",
  },
] as const;

const PLAN_SUPPORT = [
  { planKey: "free-scan", command: "Scan", href: "/dashboard/reports/free-scan", cta: "Open result", role: "Explain the first signal, confidence posture, and why deeper diagnosis may be needed.", mustNot: "No full root-cause diagnosis, implementation direction, or monthly monitoring.", value: getPlanValueDelivery("free-scan") },
  { planKey: "deep-review", command: "Diagnose", href: DEEP_REVIEW.checkoutPath, cta: `Unlock ${DEEP_REVIEW.price}`, role: "Help the customer understand cause-level diagnosis, evidence, priority, and decision path.", mustNot: "No done-for-you implementation, unlimited revisions, ad management, or guaranteed outcomes.", value: getPlanValueDelivery("deep-review") },
  { planKey: "build-fix", command: "Fix", href: BUILD_FIX.checkoutPath, cta: `Unlock ${BUILD_FIX.price}`, role: "Clarify scope, approved business details, output approval, and delivery expectations.", mustNot: "No unlimited site work, monthly monitoring, or unapproved production changes.", value: getPlanValueDelivery("build-fix") },
  { planKey: "ongoing-control", command: "Control", href: ONGOING_CONTROL.checkoutPath, cta: `Start ${ONGOING_CONTROL.price}`, role: "Help select monthly priorities, review cadence, monitoring scope, and decision support needs.", mustNot: "No unlimited Build Fix, ranking guarantees, AI answer placement guarantees, or ad management.", value: getPlanValueDelivery("ongoing-control") },
] as const satisfies readonly { planKey: PlanValueKey; command: string; href: string; cta: string; role: string; mustNot: string; value: ReturnType<typeof getPlanValueDelivery> }[];

const SUPPORT_RULES = [
  "Pick the narrowest support path before submitting a request.",
  "Use safe summaries only: no passwords, card data, private keys, session tokens, raw attack strings, or unrelated private evidence.",
  "Support can explain process, status, and next steps; approved outcomes require the right review gate.",
  "Support must separate billing, report questions, Fix scope, Control priority, account access, and correction paths.",
] as const;

export default function SupportCenterPage() {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-5 text-white sm:px-6 md:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(103,232,249,0.12),transparent_32%),radial-gradient(circle_at_86%_8%,rgba(14,165,233,0.08),transparent_34%)]" />

      <section className="system-panel-authority relative z-10 overflow-hidden rounded-[1.65rem] p-4 shadow-[0_30px_120px_rgba(2,8,23,0.48)] sm:rounded-[1.85rem] sm:p-8">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />
        <div className="grid gap-5 lg:grid-cols-[1fr_20rem] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Support command routing</p>
            <h1 className="mt-3 max-w-5xl text-3xl font-semibold tracking-tight text-white sm:mt-4 sm:text-5xl">Route the blocker without weakening the command path.</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:mt-5 sm:text-base sm:leading-8">
              Support should restore momentum, protect the proof trail, and return the customer to the right report, billing, command depth, or status path.
            </p>
          </div>
          <div className="rounded-[1.25rem] border border-cyan-300/20 bg-cyan-300/10 p-4 sm:p-5">
            <div className="text-sm font-semibold text-cyan-100">Best recovery path</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Track, then act.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-200">Check status first. Submit a safe request only when the issue needs review or new context.</p>
            <Link href="/dashboard/support/status" className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">Track status</Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-7 overflow-hidden rounded-[1.7rem] border border-cyan-300/15 bg-[linear-gradient(135deg,rgba(8,47,73,0.72),rgba(2,8,23,0.88)_48%,rgba(14,116,144,0.24))] p-4 shadow-[0_28px_100px_rgba(2,8,23,0.42)] sm:p-7" aria-label="Support route selector">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Support route selector</p>
            <h2 className="mt-2 max-w-4xl text-2xl font-semibold tracking-tight text-white sm:text-4xl">Pick the narrowest path that matches the blocker.</h2>
          </div>
          <Link href="/dashboard/support/request" className="text-sm font-semibold text-cyan-200 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">Start protected request →</Link>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {SUPPORT_ROUTES.map((route) => (
            <Link key={route.key} href={route.href} className="group rounded-[1.25rem] border border-white/10 bg-slate-950/60 p-4 transition hover:-translate-y-0.5 hover:border-cyan-300/35 hover:bg-slate-900/80 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950 sm:p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-100">{route.label}</p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">{route.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{route.value}</p>
              <p className="mt-4 rounded-[1rem] border border-white/10 bg-black/20 p-3 text-xs leading-5 text-slate-400">{route.boundary}</p>
              <span className="mt-5 inline-flex text-sm font-semibold text-cyan-100 transition group-hover:text-white">{route.cta} →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-7 grid gap-3 lg:grid-cols-4" aria-label="Command support boundaries">
        {PLAN_SUPPORT.map((plan) => (
          <Link key={plan.planKey} href={plan.href} className="system-surface rounded-[1.25rem] p-4 transition hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-xl font-semibold tracking-tight text-white">{plan.command}</h3>
              <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">{plan.value.price}</span>
            </div>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100/75">{plan.value.customerName}</p>
            <p className="mt-3 text-sm leading-6 text-slate-300">{plan.role}</p>
            <p className="mt-4 rounded-[1rem] border border-white/10 bg-black/20 p-3 text-xs leading-5 text-slate-400">{plan.mustNot}</p>
            <span className="mt-5 inline-flex text-sm font-semibold text-cyan-100">{plan.cta} →</span>
          </Link>
        ))}
      </section>

      <section className="relative z-10 mt-7 rounded-[1.45rem] border border-white/10 bg-white/[0.035] p-4 sm:p-5" aria-label="Support safety standard">
        <p className="text-sm font-semibold text-cyan-100">Support safety standard</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Support should restore momentum without expanding scope silently.</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {SUPPORT_RULES.map((rule) => (
            <p key={rule} className="rounded-[1rem] border border-white/10 bg-black/20 p-3 text-xs leading-6 text-slate-300">{rule}</p>
          ))}
        </div>
      </section>

      <section className="sr-only" aria-label="Support routing guardrails">
        Support command routing. Route the blocker without weakening the command path. Support route selector. Pick the narrowest path that matches the blocker. Support should restore momentum without expanding scope silently. Billing issue. Report question. Fix scope. Control priority. Account access. Correction or dispute. No support dumping ground. No raw secrets. No duplicate request anxiety. Scan. Diagnose. Fix. Control. {SUPPORT_ROUTES.map((route) => `${route.key} ${route.label} ${route.title} ${route.value} ${route.boundary}`).join(" ")} {PLAN_SUPPORT.map((plan) => `${plan.planKey} ${plan.command} ${plan.value.customerName} ${plan.role} ${plan.mustNot} ${plan.value.primaryValue}`).join(" ")} {SUPPORT_RULES.join(" ")} {PLAN_VALUE_SEPARATION_RULES.join(" ")}
      </section>
    </main>
  );
}
