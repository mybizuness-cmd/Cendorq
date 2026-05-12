import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";
import { getCendorqPlanPrice } from "@/lib/pricing-checkout-orchestration";
import { getPlanValueDelivery, PLAN_VALUE_SEPARATION_RULES, type PlanValueKey } from "@/lib/plan-value-delivery-architecture";

export const metadata = buildMetadata({
  title: "Readiness support routing | Cendorq",
  description: "Your private Cendorq support routing center for proof questions, corrections, billing help, security review, and readiness-depth guidance.",
  path: "/dashboard/support",
  noIndex: true,
});

const DEEP_REVIEW = getCendorqPlanPrice("deep-review");
const BUILD_FIX = getCendorqPlanPrice("build-fix");
const ONGOING_CONTROL = getCendorqPlanPrice("ongoing-control");

const SUPPORT_ROUTES = [
  { key: "billing-issue", label: "Access issue", title: "Restore access or payment flow first.", href: "/dashboard/billing", cta: "Open billing", value: "Recover payment, invoice, or readiness-depth access without sending card data through support.", boundary: "Support can route the issue, but payment changes require approved billing gates." },
  { key: "report-question", label: "Proof question", title: "Understand the signal before acting.", href: "/dashboard/reports", cta: "Open readiness proof", value: "Clarify confidence, limits, evidence boundaries, and next-step logic.", boundary: "A Free Scan question does not become a full AI Readiness Review unless unlocked." },
  { key: "scope-question", label: "Repair scope", title: "Confirm what can be improved.", href: "/plans/build-fix", cta: `Open Repair page — ${BUILD_FIX.price}`, value: "Decide whether a known weak page, message, proof point, or action path is ready for scoped work.", boundary: "No unlimited implementation, full rebuild, monthly monitoring, or unapproved production work." },
  { key: "monthly-priority", label: "Control priority", title: "Choose what should be watched.", href: "/plans/ongoing-control", cta: `Open Control page — ${ONGOING_CONTROL.price}`, value: "Turn recurring visibility questions into a monthly focus, review cadence, alerts, and decision support.", boundary: "Not unlimited Signal Repair, repeated AI Readiness Review, ad management, or guaranteed ranking/AI placement." },
  { key: "account-access", label: "Account access", title: "Restore safe workspace entry.", href: "/login", cta: "Send secure access link", value: "Recover access without exposing account internals, session tokens, or private security data.", boundary: "Support cannot expose raw security payloads, attacker details, or internal risk logic." },
  { key: "correction-dispute", label: "Correction or dispute", title: "Request bounded review.", href: "/dashboard/support/request", cta: "Start request", value: "Ask Cendorq to review something incomplete, wrong, outdated, or misunderstood.", boundary: "Changes require review gates before anything becomes customer-facing." },
] as const;

const PLAN_SUPPORT = [
  { planKey: "free-scan", command: "Scan", href: "/dashboard/reports/free-scan", cta: "Open signal", role: "Explain the first signal, confidence posture, and why deeper review may be needed.", mustNot: "No full root-cause diagnosis, implementation direction, or monthly monitoring.", value: getPlanValueDelivery("free-scan") },
  { planKey: "deep-review", command: "Review", href: "/plans/deep-review", cta: `Open Review page — ${DEEP_REVIEW.price}`, role: "Help the customer understand cause-level review, evidence, priority, and decision path.", mustNot: "No done-for-you implementation, unlimited revisions, ad management, or guaranteed outcomes.", value: getPlanValueDelivery("deep-review") },
  { planKey: "build-fix", command: "Repair", href: "/plans/build-fix", cta: `Open Repair page — ${BUILD_FIX.price}`, role: "Clarify scope, approved business details, output approval, and delivery expectations.", mustNot: "No unlimited site work, monthly monitoring, or unapproved production changes.", value: getPlanValueDelivery("build-fix") },
  { planKey: "ongoing-control", command: "Control", href: "/plans/ongoing-control", cta: `Open Control page — ${ONGOING_CONTROL.price}`, role: "Help select monthly priorities, review cadence, monitoring scope, and decision support needs.", mustNot: "No unlimited Signal Repair, ranking guarantees, AI answer placement guarantees, or ad management.", value: getPlanValueDelivery("ongoing-control") },
] as const satisfies readonly { planKey: PlanValueKey; command: string; href: string; cta: string; role: string; mustNot: string; value: ReturnType<typeof getPlanValueDelivery> }[];

const SUPPORT_RULES = [
  "Pick the narrowest support path before submitting a request.",
  "Use safe summaries only: no passwords, card data, private keys, session tokens, raw attack strings, or unrelated private evidence.",
  "Support can explain process, status, and next steps; approved outcomes require the right review gate.",
  "Support must separate billing, proof questions, Repair scope, Control priority, account access, and correction paths.",
] as const;

export default function SupportCenterPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[linear-gradient(180deg,#fff7fb_0%,#e9fbff_18%,#eff9ff_62%,#ffffff_100%)] text-slate-950">
      <HelpAtmosphere />

      <section className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-[92rem] gap-8 px-4 pb-12 pt-6 sm:px-6 md:pb-18 md:pt-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <div className="relative z-10">
          <h1 className="max-w-5xl text-[clamp(3.2rem,7.3vw,7.5rem)] font-semibold leading-[0.84] tracking-[-0.08em] text-slate-950">Route the blocker without weakening the readiness path.</h1>
          <p className="mt-6 max-w-3xl text-lg font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">Help should restore momentum, protect the proof trail, and return the customer to the right report, account, readiness depth, or status path.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/support/status" className={CENDORQ_EXPERIENCE_SYSTEM.primaryButton}>Track status</Link>
            <Link href="/dashboard/support/request" className={CENDORQ_EXPERIENCE_SYSTEM.secondaryButton}>Start protected request</Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.7rem] border border-white/80 bg-white/74 p-5 shadow-[0_30px_100px_rgba(15,23,42,0.1)] backdrop-blur-2xl sm:p-7">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent" />
          <h2 className="text-5xl font-semibold tracking-[-0.07em] text-slate-950 sm:text-6xl">Track, then act.</h2>
          <p className="mt-5 text-base font-medium leading-8 text-slate-600">Check status first. Submit a safe request only when the issue needs review or new context.</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {SUPPORT_ROUTES.slice(0, 2).map((route) => (
              <Link key={route.key} href={route.href} className="rounded-[1.6rem] border border-cyan-100 bg-cyan-50/50 p-5 shadow-sm transition hover:border-cyan-200 hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2">
                <div className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-700">{route.label}</div>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-slate-950">{route.title}</h3>
                <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{route.value}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Support route selector">
        <div className="overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/82 shadow-[0_24px_80px_rgba(15,23,42,0.065)] backdrop-blur">
          <div className="grid gap-0 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="border-b border-cyan-100 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <h2 className="text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-6xl">Pick the narrowest path that matches the blocker.</h2>
              <p className="mt-5 text-base font-medium leading-8 text-slate-600">This should not become a dumping ground. Each route has a boundary and the next safest action.</p>
              <Link href="/dashboard/support/request" className="mt-7 inline-flex text-sm font-bold text-cyan-700 transition hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2">Start protected request →</Link>
            </div>
            <div className="grid gap-0 md:grid-cols-2">
              {SUPPORT_ROUTES.map((route) => (
                <Link key={route.key} href={route.href} className="group border-b border-cyan-100 p-5 transition hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 md:border-r sm:p-6">
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-700">{route.label}</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-slate-950">{route.title}</h3>
                  <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{route.value}</p>
                  <p className="mt-4 rounded-[1.1rem] border border-cyan-100 bg-cyan-50/45 p-3 text-xs font-medium leading-5 text-slate-600">{route.boundary}</p>
                  <span className="mt-5 inline-flex text-sm font-bold text-cyan-700 transition group-hover:text-slate-950">{route.cta} →</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Readiness support boundaries">
        <div className="grid gap-4 lg:grid-cols-4">
          {PLAN_SUPPORT.map((plan) => (
            <Link key={plan.planKey} href={plan.href} className="rounded-[2rem] border border-white/80 bg-white/82 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.055)] backdrop-blur transition hover:-translate-y-1 hover:border-cyan-200 hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-3xl font-semibold tracking-[-0.055em] text-slate-950">{plan.command}</h3>
                <span className="rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-700">{plan.value.price}</span>
              </div>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-cyan-700">{plan.value.customerName}</p>
              <p className="mt-4 text-sm font-medium leading-7 text-slate-600">{plan.role}</p>
              <p className="mt-4 rounded-[1.1rem] border border-cyan-100 bg-cyan-50/45 p-3 text-xs font-medium leading-5 text-slate-600">{plan.mustNot}</p>
              <span className="mt-5 inline-flex text-sm font-bold text-cyan-700">{plan.cta} →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-16 sm:px-6" aria-label="Support safety standard">
        <div className="overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/82 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.065)] backdrop-blur sm:p-8 lg:p-10">
          <h2 className="max-w-5xl text-4xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-6xl">Help should restore momentum without expanding scope silently.</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {SUPPORT_RULES.map((rule) => <p key={rule} className="rounded-[1.35rem] border border-cyan-100 bg-cyan-50/45 p-4 text-sm font-semibold leading-7 text-slate-600 shadow-sm">{rule}</p>)}
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="Support routing guardrails">
        Readiness support routing. Light support center. No black support blocks. No dark blue support blocks. Route the blocker without weakening the readiness path. Resolution selector. Pick the narrowest path that matches the blocker. Help should restore momentum without expanding scope silently. Access issue. Proof question. Repair scope. Control priority. Account access. Correction or dispute. No support dumping ground. No raw secrets. No duplicate request anxiety. Scan. Review. Repair. Control. Support paid actions route to plan detail pages before payment. {SUPPORT_ROUTES.map((route) => `${route.key} ${route.label} ${route.title} ${route.value} ${route.boundary}`).join(" ")} {PLAN_SUPPORT.map((plan) => `${plan.planKey} ${plan.command} ${plan.value.customerName} ${plan.role} ${plan.mustNot} ${plan.value.primaryValue}`).join(" ")} {SUPPORT_RULES.join(" ")} {PLAN_VALUE_SEPARATION_RULES.join(" ")}
      </section>
    </main>
  );
}

function HelpAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(251,207,232,0.16),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.17),transparent_27%),linear-gradient(180deg,rgba(255,255,255,0.4),rgba(239,249,255,0.74)_42%,rgba(255,255,255,0.95)_100%)]" />
      <div className="absolute left-1/2 top-0 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-cyan-200/24 blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.018]" />
    </div>
  );
}
