import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { getCendorqPlanPrice } from "@/lib/pricing-checkout-orchestration";
import { getPlanValueDelivery, PLAN_VALUE_SEPARATION_RULES, type PlanValueKey } from "@/lib/plan-value-delivery-architecture";

export const metadata = buildMetadata({
  title: "Readiness resolution routing | Cendorq",
  description: "Your private Cendorq support routing center for proof questions, corrections, billing help, security review, and readiness-depth guidance.",
  path: "/dashboard/support",
  noIndex: true,
});

const DEEP_REVIEW = getCendorqPlanPrice("deep-review");
const BUILD_FIX = getCendorqPlanPrice("build-fix");
const ONGOING_CONTROL = getCendorqPlanPrice("ongoing-control");

const SUPPORT_ROUTES = [
  {
    key: "billing-issue",
    label: "Access issue",
    title: "Restore access or payment flow first.",
    href: "/dashboard/billing",
    cta: "Open billing",
    value: "Recover payment, invoice, or readiness-depth access without sending card data through support.",
    boundary: "Support can route the issue, but payment changes require approved billing gates.",
  },
  {
    key: "report-question",
    label: "Proof question",
    title: "Understand the signal before acting.",
    href: "/dashboard/reports",
    cta: "Open readiness proof",
    value: "Clarify confidence, limits, evidence boundaries, and next-readiness logic.",
    boundary: "A Free Scan question does not become full AI Readiness Review unless unlocked.",
  },
  {
    key: "scope-question",
    label: "Repair scope",
    title: "Confirm what can be improved.",
    href: BUILD_FIX.checkoutPath,
    cta: `See Signal Repair ${BUILD_FIX.price}`,
    value: "Decide whether a known weak page, message, proof point, or action path is ready for scoped work.",
    boundary: "No unlimited implementation, full rebuild, monthly monitoring, or unapproved production work.",
  },
  {
    key: "monthly-priority",
    label: "Control priority",
    title: "Choose what should be watched.",
    href: ONGOING_CONTROL.checkoutPath,
    cta: `Start ${ONGOING_CONTROL.price}`,
    value: "Turn recurring readiness questions into a monthly focus, review cadence, alerts, and decision support.",
    boundary: "Not unlimited Signal Repair, repeated AI Readiness Review, ad management, or guaranteed ranking/AI placement.",
  },
  {
    key: "account-access",
    label: "Account access",
    title: "Restore safe workspace entry.",
    href: "/login",
    cta: "Sign in",
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
  { planKey: "free-scan", command: "Scan", href: "/dashboard/reports/free-scan", cta: "Open signal", role: "Explain the first signal, confidence posture, and why deeper review may be needed.", mustNot: "No full root-cause review, implementation direction, or monthly monitoring.", value: getPlanValueDelivery("free-scan") },
  { planKey: "deep-review", command: "Review", href: DEEP_REVIEW.checkoutPath, cta: `Unlock ${DEEP_REVIEW.price}`, role: "Help the customer understand evidence-backed review, priority, and decision path.", mustNot: "No done-for-you implementation, unlimited revisions, ad management, or guaranteed outcomes.", value: getPlanValueDelivery("deep-review") },
  { planKey: "build-fix", command: "Repair", href: BUILD_FIX.checkoutPath, cta: `Unlock ${BUILD_FIX.price}`, role: "Clarify scope, approved business details, output approval, and delivery expectations.", mustNot: "No unlimited site work, monthly monitoring, or unapproved production changes.", value: getPlanValueDelivery("build-fix") },
  { planKey: "ongoing-control", command: "Control", href: ONGOING_CONTROL.checkoutPath, cta: `Start ${ONGOING_CONTROL.price}`, role: "Help select monthly priorities, review cadence, monitoring scope, and decision support needs.", mustNot: "No unlimited Signal Repair, ranking guarantees, AI answer placement guarantees, or ad management.", value: getPlanValueDelivery("ongoing-control") },
] as const satisfies readonly { planKey: PlanValueKey; command: string; href: string; cta: string; role: string; mustNot: string; value: ReturnType<typeof getPlanValueDelivery> }[];

const SUPPORT_RULES = [
  "Pick the narrowest support path before submitting a request.",
  "Use safe summaries only: no passwords, card data, private keys, session tokens, raw attack strings, or unrelated private evidence.",
  "Support can explain process, status, and next steps; approved outcomes require the right review gate.",
  "Support must separate billing, proof questions, Repair scope, Control priority, account access, and correction paths.",
] as const;

export default function SupportCenterPage() {
  return (
    <main className="relative isolate overflow-hidden text-white">
      <HelpAtmosphere />

      <section className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-[92rem] gap-8 px-4 pb-12 pt-6 sm:px-6 md:pb-18 md:pt-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <div className="relative z-10">
          <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-100 shadow-[0_0_60px_rgba(34,211,238,0.12)]">
            Readiness resolution routing
          </div>
          <h1 className="mt-6 max-w-5xl text-[clamp(3.2rem,7.3vw,7.5rem)] font-semibold leading-[0.84] tracking-[-0.08em] text-white">
            Route the blocker without weakening the readiness path.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl sm:leading-9">
            Help should restore momentum, protect the proof trail, and return the customer to the right report, account, readiness depth, or status path.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/support/status" className="inline-flex min-h-14 items-center justify-center rounded-full bg-cyan-200 px-9 py-4 text-base font-black text-slate-950 shadow-[0_22px_80px_rgba(103,232,249,0.24)] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Track status
            </Link>
            <Link href="/dashboard/support/request" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-9 py-4 text-base font-bold text-white shadow-[0_18px_70px_rgba(2,8,23,0.32)] transition hover:border-cyan-200/40 hover:bg-cyan-200/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              Start protected request
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.7rem] border border-cyan-200/22 bg-[radial-gradient(circle_at_50%_0%,rgba(103,232,249,0.2),transparent_36%),linear-gradient(145deg,rgba(8,47,73,0.9),rgba(2,8,23,0.98)_52%,rgba(14,116,144,0.32))] p-5 shadow-[0_55px_200px_rgba(2,8,23,0.72)] sm:p-7">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent" />
          <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-100">Best recovery path</p>
          <h2 className="mt-4 text-5xl font-semibold tracking-[-0.07em] text-white sm:text-6xl">Track, then act.</h2>
          <p className="mt-5 text-base leading-8 text-slate-300">Check status first. Submit a safe request only when the issue needs review or new context.</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {SUPPORT_ROUTES.slice(0, 2).map((route) => (
              <Link key={route.key} href={route.href} className="rounded-[1.6rem] border border-white/10 bg-black/24 p-5 transition hover:border-cyan-200/30 hover:bg-cyan-200/[0.08]">
                <div className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-100">{route.label}</div>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">{route.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{route.value}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Support route selector">
        <div className="overflow-hidden rounded-[2.5rem] border border-cyan-300/15 bg-[linear-gradient(135deg,rgba(8,47,73,0.72),rgba(2,8,23,0.94)_46%,rgba(14,116,144,0.22))] shadow-[0_45px_180px_rgba(2,8,23,0.55)]">
          <div className="grid gap-0 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-100">Resolution selector</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-white sm:text-6xl">Pick the narrowest path that matches the blocker.</h2>
              <p className="mt-5 text-base leading-8 text-slate-300">This should not become a dumping ground. Each route has a boundary and the next safest action.</p>
              <Link href="/dashboard/support/request" className="mt-7 inline-flex text-sm font-bold text-cyan-100 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">Start protected request →</Link>
            </div>
            <div className="grid gap-0 md:grid-cols-2">
              {SUPPORT_ROUTES.map((route) => (
                <Link key={route.key} href={route.href} className="group border-b border-white/10 p-5 transition hover:bg-cyan-200/[0.06] focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950 md:border-r sm:p-6">
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-100">{route.label}</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">{route.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{route.value}</p>
                  <p className="mt-4 rounded-[1.1rem] border border-white/10 bg-black/20 p-3 text-xs leading-5 text-slate-400">{route.boundary}</p>
                  <span className="mt-5 inline-flex text-sm font-bold text-cyan-100 transition group-hover:text-white">{route.cta} →</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Readiness support boundaries">
        <div className="grid gap-4 lg:grid-cols-4">
          {PLAN_SUPPORT.map((plan) => (
            <Link key={plan.planKey} href={plan.href} className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_24px_90px_rgba(2,8,23,0.34)] transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-3xl font-semibold tracking-[-0.055em] text-white">{plan.command}</h3>
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-100">{plan.value.price}</span>
              </div>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-cyan-100/75">{plan.value.customerName}</p>
              <p className="mt-4 text-sm leading-7 text-slate-300">{plan.role}</p>
              <p className="mt-4 rounded-[1.1rem] border border-white/10 bg-black/20 p-3 text-xs leading-5 text-slate-400">{plan.mustNot}</p>
              <span className="mt-5 inline-flex text-sm font-bold text-cyan-100">{plan.cta} →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-16 sm:px-6" aria-label="Support safety standard">
        <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025)_38%,rgba(103,232,249,0.08))] p-6 shadow-[0_45px_180px_rgba(2,8,23,0.55)] backdrop-blur-2xl sm:p-8 lg:p-10">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-100">Help safety standard</p>
          <h2 className="mt-3 max-w-5xl text-4xl font-semibold tracking-[-0.055em] text-white sm:text-6xl">Help should restore momentum without expanding scope silently.</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {SUPPORT_RULES.map((rule) => (
              <p key={rule} className="rounded-[1.35rem] border border-white/10 bg-black/25 p-4 text-sm font-semibold leading-7 text-slate-300">{rule}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="Support routing guardrails">
        Readiness resolution routing. Route the blocker without weakening the readiness path. Resolution selector. Pick the narrowest path that matches the blocker. Help should restore momentum without expanding scope silently. Access issue. Proof question. Repair scope. Control priority. Account access. Correction or dispute. No support dumping ground. No raw secrets. No duplicate request anxiety. Scan. Review. Repair. Control. {SUPPORT_ROUTES.map((route) => `${route.key} ${route.label} ${route.title} ${route.value} ${route.boundary}`).join(" ")} {PLAN_SUPPORT.map((plan) => `${plan.planKey} ${plan.command} ${plan.value.customerName} ${plan.role} ${plan.mustNot} ${plan.value.primaryValue}`).join(" ")} {SUPPORT_RULES.join(" ")} {PLAN_VALUE_SEPARATION_RULES.join(" ")}
      </section>
    </main>
  );
}

function HelpAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(103,232,249,0.16),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.11),transparent_27%),linear-gradient(180deg,#020617_0%,#020817_42%,#030712_100%)]" />
      <div className="absolute left-1/2 top-0 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-cyan-300/[0.04] blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.018]" />
    </div>
  );
}
