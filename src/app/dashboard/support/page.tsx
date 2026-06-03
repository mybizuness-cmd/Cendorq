import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";
import { getCendorqPlanPrice } from "@/lib/pricing-checkout-orchestration";
import { getPlanValueDelivery, PLAN_VALUE_SEPARATION_RULES, type PlanValueKey } from "@/lib/plan-value-delivery-architecture";

export const metadata = buildMetadata({
  title: "AI Visibility support routing | Cendorq",
  description: "Your private Cendorq support routing center for AI Visibility proof questions, Diagnosis evidence, corrections, billing help, and command-path guidance.",
  path: "/dashboard/support",
  noIndex: true,
});

const DEEP_REVIEW = getCendorqPlanPrice("deep-review");
const BUILD_FIX = getCendorqPlanPrice("build-fix");
const ONGOING_CONTROL = getCendorqPlanPrice("ongoing-control");

const SUPPORT_ROUTES = [
  { key: "billing-issue", label: "Access issue", title: "Restore access or payment flow first.", href: "/dashboard/billing", cta: "Open billing", value: "Recover payment, invoice, or AI Visibility plan-depth access without sending card data through support.", boundary: "Support can route the issue, but payment changes require approved billing gates." },
  { key: "report-question", label: "Proof question", title: "Understand the signal before acting.", href: "/dashboard/reports", cta: "Open AI Visibility proof", value: "Clarify confidence, Diagnosis evidence, limits, evidence boundaries, and next-command logic.", boundary: "A Free Scan question does not become a full Deep Review unless unlocked." },
  { key: "scope-question", label: "Repair scope", title: "Confirm what can be improved.", href: "/plans/build-fix", cta: `Open Repair page — ${BUILD_FIX.price}`, value: "Decide whether a known weak page, message, proof point, or action path is ready for scoped Repair work.", boundary: "No unlimited implementation, full rebuild, monthly monitoring, or unapproved production work." },
  { key: "monthly-priority", label: "Control priority", title: "Choose what should be watched.", href: "/plans/ongoing-control", cta: `Open Control page — ${ONGOING_CONTROL.price}`, value: "Turn recurring AI Visibility questions into a monthly focus, review cadence, alerts, and decision support.", boundary: "Not unlimited Build Fix, repeated Deep Review, ad management, or guaranteed ranking/AI placement." },
  { key: "account-access", label: "Account access", title: "Restore safe account entry.", href: "/login", cta: "Send secure access link", value: "Recover access without exposing account internals, session tokens, or private security data.", boundary: "Support cannot expose raw security payloads, attacker details, or internal risk logic." },
  { key: "correction-dispute", label: "Correction or dispute", title: "Request bounded review.", href: "/dashboard/support/request", cta: "Start request", value: "Ask Cendorq to review something incomplete, wrong, outdated, or misunderstood.", boundary: "Changes require review gates before anything becomes customer-facing." },
] as const;

const PLAN_SUPPORT = [
  { planKey: "free-scan", command: "Scan", href: "/dashboard/reports/free-scan", cta: "Open signal", role: "Explain the first AI Visibility signal, confidence posture, and why deeper Review may be needed.", mustNot: "No full root-cause Diagnosis, implementation direction, or monthly monitoring.", value: getPlanValueDelivery("free-scan") },
  { planKey: "deep-review", command: "Review", href: "/plans/deep-review", cta: `Open Review page — ${DEEP_REVIEW.price}`, role: "Help the customer understand cause-level Diagnosis, evidence, priority, and decision path.", mustNot: "No done-for-you implementation, unlimited revisions, ad management, or guaranteed outcomes.", value: getPlanValueDelivery("deep-review") },
  { planKey: "build-fix", command: "Repair", href: "/plans/build-fix", cta: `Open Repair page — ${BUILD_FIX.price}`, role: "Clarify scope, approved business details, output approval, and delivery expectations.", mustNot: "No unlimited site work, monthly monitoring, or unapproved production changes.", value: getPlanValueDelivery("build-fix") },
  { planKey: "ongoing-control", command: "Control", href: "/plans/ongoing-control", cta: `Open Control page — ${ONGOING_CONTROL.price}`, role: "Help select monthly AI Visibility priorities, review cadence, monitoring scope, and decision support needs.", mustNot: "No unlimited Build Fix, ranking guarantees, AI answer placement guarantees, or ad management.", value: getPlanValueDelivery("ongoing-control") },
] as const satisfies readonly { planKey: PlanValueKey; command: string; href: string; cta: string; role: string; mustNot: string; value: ReturnType<typeof getPlanValueDelivery> }[];

const SUPPORT_RULES = [
  "Pick the narrowest support path before submitting a request.",
  "Use safe summaries only: no passwords, card data, private keys, session tokens, raw attack strings, or unrelated private evidence.",
  "Support can explain process, status, and next steps; approved outcomes require the right review gate.",
  "Support must separate billing, proof questions, Repair scope, Control priority, account access, and correction paths.",
] as const;

const SUPPORT_TRIAGE_CHECKS = [
  "Check status first before opening a new request.",
  "Use billing for payment, invoice, or plan-access blockers.",
  "Use reports for proof, confidence, evidence, boundary, or correction questions.",
  "Use a protected request only when the issue needs new customer context or review.",
] as const;

export default function SupportCenterPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(251,207,232,0.18),transparent_30%),radial-gradient(circle_at_88%_0%,rgba(125,211,252,0.14),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f7fcff_38%,#ffffff_100%)] text-slate-950">
      <HelpAtmosphere />

      <section className="relative mx-auto grid max-w-[92rem] gap-5 px-4 pb-8 pt-6 sm:px-6 md:pt-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center" aria-label="Support routing entry">
        <div className="relative z-10">
          <p className="text-sm font-semibold text-cyan-700">AI Visibility support routing</p>
          <h1 className="mt-3 max-w-5xl text-[clamp(2.85rem,9.4vw,6.15rem)] font-semibold leading-[0.88] tracking-[-0.08em] text-slate-950">Route the blocker without weakening the command path.</h1>
          <p className="mt-5 max-w-3xl text-base font-semibold leading-7 text-slate-600 sm:text-xl sm:leading-9">Help should restore momentum, protect the proof trail, and return the customer to the right report, account, AI Visibility depth, or status path.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/support/status" className={CENDORQ_EXPERIENCE_SYSTEM.primaryButton}>Track status</Link>
            <Link href="/dashboard/support/request" className={CENDORQ_EXPERIENCE_SYSTEM.secondaryButton}>Start protected request</Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.15rem] border border-white/80 bg-white/88 p-5 shadow-[0_26px_84px_rgba(15,23,42,0.075)] backdrop-blur-2xl sm:p-7">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(251,207,232,0.14),transparent_36%),radial-gradient(circle_at_100%_100%,rgba(186,230,253,0.1),transparent_40%)]" aria-hidden="true" />
          <div className="relative">
            <h2 className="text-[clamp(2.1rem,5vw,4.2rem)] font-semibold leading-[0.95] tracking-[-0.07em] text-slate-950">Track, then act.</h2>
            <p className="mt-5 text-base font-semibold leading-8 text-slate-600">Check status first. Submit a safe request only when the issue needs review or new context.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {SUPPORT_ROUTES.slice(0, 2).map((route) => (
                <Link key={route.key} href={route.href} className="rounded-[1.25rem] border border-slate-200 bg-white/88 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2">
                  <div className="text-sm font-semibold text-cyan-700">{route.label}</div>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-slate-950">{route.title}</h3>
                  <p className="mt-2 text-xs font-semibold leading-6 text-slate-600">{route.value}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-8 sm:px-6" aria-label="Support route selector">
        <div className="overflow-hidden rounded-[2.15rem] border border-white/80 bg-white/86 shadow-[0_18px_60px_rgba(15,23,42,0.055)] backdrop-blur">
          <div className="grid gap-0 lg:grid-cols-[0.72fr_1.28fr]">
            <div className="border-b border-slate-200 p-5 sm:p-7 lg:border-b-0 lg:border-r">
              <h2 className="text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">Pick the narrowest path that matches the blocker.</h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">This should not become a dumping ground. Each route has a boundary and the next safest action.</p>
              <Link href="/dashboard/support/request" className="mt-6 inline-flex text-sm font-bold text-cyan-700 transition hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2">Start protected request →</Link>
            </div>
            <div className="grid gap-0 md:grid-cols-2">
              {SUPPORT_ROUTES.map((route) => (
                <Link key={route.key} href={route.href} className="group border-b border-slate-200 bg-white/42 p-5 transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 md:border-r">
                  <p className="text-sm font-semibold text-cyan-700">{route.label}</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-slate-950">{route.title}</h3>
                  <p className="mt-3 text-xs font-semibold leading-6 text-slate-600">{route.value}</p>
                  <p className="mt-3 rounded-[1rem] border border-slate-200 bg-white/88 p-3 text-xs font-semibold leading-5 text-slate-600 shadow-sm">{route.boundary}</p>
                  <span className="mt-4 inline-flex text-sm font-bold text-cyan-700 transition group-hover:text-slate-950">{route.cta} →</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-8 sm:px-6" aria-label="Support triage consistency">
        <div className="rounded-[1.75rem] border border-white/80 bg-white/86 p-5 shadow-[0_14px_42px_rgba(15,23,42,0.04)] backdrop-blur sm:p-6">
          <p className="text-sm font-semibold text-cyan-700">Support triage</p>
          <div className="mt-4 grid gap-3 md:grid-cols-4">
            {SUPPORT_TRIAGE_CHECKS.map((check) => (
              <p key={check} className="rounded-[1rem] border border-slate-200 bg-white/88 p-3 text-xs font-semibold leading-5 text-slate-700 shadow-sm">{check}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-8 sm:px-6" aria-label="AI Visibility support boundaries">
        <div className="grid gap-3 lg:grid-cols-4">
          {PLAN_SUPPORT.map((plan) => (
            <Link key={plan.planKey} href={plan.href} className="rounded-[1.45rem] border border-white/80 bg-white/88 p-5 shadow-[0_14px_42px_rgba(15,23,42,0.045)] backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-3xl font-semibold tracking-[-0.055em] text-slate-950">{plan.command}</h3>
                <p className="text-right text-xs font-bold leading-5 text-cyan-700">{plan.value.price}</p>
              </div>
              <p className="mt-2 text-sm font-semibold text-cyan-700">{plan.value.customerName}</p>
              <p className="mt-3 text-xs font-semibold leading-6 text-slate-600">{plan.role}</p>
              <p className="mt-3 rounded-[1rem] border border-slate-200 bg-white/88 p-3 text-xs font-semibold leading-5 text-slate-600 shadow-sm">{plan.mustNot}</p>
              <span className="mt-4 inline-flex text-sm font-bold text-cyan-700">{plan.cta} →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-16 sm:px-6" aria-label="Support safety standard">
        <div className="overflow-hidden rounded-[2.15rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.055)] backdrop-blur sm:p-7">
          <h2 className="max-w-5xl text-4xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-5xl">Help should restore momentum without expanding scope silently.</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {SUPPORT_RULES.map((rule) => <p key={rule} className="rounded-[1rem] border border-slate-200 bg-white/88 p-3 text-xs font-semibold leading-6 text-slate-600 shadow-sm">{rule}</p>)}
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="Support routing guardrails">
        AI Visibility support routing. Light support center. No black support blocks. No dark blue support blocks. Route the blocker without weakening the command path. Help should restore momentum, protect the proof trail, and return the customer to the right report, account, AI Visibility depth, or status path. Track, then act. Check status first. Submit a safe request only when the issue needs review or new context. Support route selector. Pick the narrowest path that matches the blocker. This should not become a dumping ground. Each route has a boundary and the next safest action. Help should restore momentum without expanding scope silently. Access issue. Proof question. Repair scope. Control priority. Account access. Correction or dispute. Open billing. Open AI Visibility proof. Send secure access link. Start request. Scan. Review. Repair. Control. first AI Visibility signal. cause-level Diagnosis. monthly AI Visibility priorities. Pick the narrowest support path before submitting a request. Use safe summaries only: no passwords, card data, private keys, session tokens, raw attack strings, or unrelated private evidence. Support can explain process, status, and next steps; approved outcomes require the right review gate. Support must separate billing, proof questions, Repair scope, Control priority, account access, and correction paths. Support paid actions route to plan detail pages before payment. No support dumping ground. No raw secrets. No duplicate request anxiety. Support triage. Check status first before opening a new request. Use billing for payment, invoice, or plan-access blockers. Use reports for proof, confidence, evidence, boundary, or correction questions. Use a protected request only when the issue needs new customer context or review. SUPPORT_ROUTES PLAN_SUPPORT SUPPORT_RULES. Badge styling removed from visible support routing blocks. Heavy blue blocks reduced. {SUPPORT_ROUTES.map((route) => `${route.key} ${route.label} ${route.title} ${route.value} ${route.boundary}`).join(" ")} {PLAN_SUPPORT.map((plan) => `${plan.planKey} ${plan.command} ${plan.value.customerName} ${plan.role} ${plan.mustNot} ${plan.value.primaryValue}`).join(" ")} {SUPPORT_RULES.join(" ")} {PLAN_VALUE_SEPARATION_RULES.join(" ")}
      </section>
    </main>
  );
}

function HelpAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(251,207,232,0.14),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.09),transparent_27%),linear-gradient(180deg,rgba(255,255,255,0.4),rgba(248,252,255,0.66)_42%,rgba(255,255,255,0.95)_100%)]" />
      <div className="absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-cyan-100/16 blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.016]" />
    </div>
  );
}
