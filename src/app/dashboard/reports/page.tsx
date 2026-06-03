import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";
import { projectCustomerPlatformHandoff } from "@/lib/customer-platform-handoff-runtime";
import { getCendorqPlanPrice } from "@/lib/pricing-checkout-orchestration";
import { resolveReportVaultAccessDecision } from "@/lib/report-vault-plan-boundary-runtime";
import {
  getPlanValueDelivery,
  PLAN_VALUE_SEPARATION_RULES,
  type PlanValueKey,
} from "@/lib/plan-value-delivery-architecture";
import {
  PAID_PLAN_REPORT_DELIVERY_GUARDS,
  PAID_PLAN_REPORT_DELIVERY_OPERATING_SYSTEM,
} from "@/lib/paid-plan-report-delivery-operating-system";

export const metadata = buildMetadata({
  title: "AI Visibility proof vault | Cendorq",
  description: "Your private Cendorq vault for AI Visibility signals, Diagnosis evidence, approved reports, paid-report delivery, confidence labels, and next-step guidance.",
  path: "/dashboard/reports",
  noIndex: true,
});

const REPORT_VAULT_HANDOFFS = [
  projectCustomerPlatformHandoff({ surfaceKey: "free-scan-to-report-vault", customerOwned: true, verifiedAccess: true, safeProjectionReady: true, pendingAsFinalRisk: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "dashboard-to-report-vault", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "report-vault-to-support", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "report-vault-to-plans", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
] as const;

const DEEP_REVIEW_PRICE = getCendorqPlanPrice("deep-review");
const BUILD_FIX_PRICE = getCendorqPlanPrice("build-fix");
const ONGOING_CONTROL_PRICE = getCendorqPlanPrice("ongoing-control");

const PAID_REPORT_BY_PLAN = Object.fromEntries(PAID_PLAN_REPORT_DELIVERY_OPERATING_SYSTEM.map((contract) => [contract.planKey, contract]));

const REPORT_ACCESS_BY_PLAN = {
  "free-scan": resolveReportVaultAccessDecision({ planKey: "free-scan" }),
  "deep-review": resolveReportVaultAccessDecision({ planKey: "deep-review", entitlementActive: false, releaseApproved: false, approvedPdfReady: false }),
  "build-fix": resolveReportVaultAccessDecision({ planKey: "build-fix", entitlementActive: false, releaseApproved: false, approvedPdfReady: false }),
  "ongoing-control": resolveReportVaultAccessDecision({ planKey: "ongoing-control", entitlementActive: false, releaseApproved: false, approvedPdfReady: false }),
} as const;

const REPORT_LIBRARY = [
  {
    planKey: "free-scan",
    command: "Scan",
    reportType: REPORT_ACCESS_BY_PLAN["free-scan"].reportName,
    stage: "First AI Visibility signal",
    href: REPORT_ACCESS_BY_PLAN["free-scan"].customerRoute,
    cta: "Open result",
    deliveryMeaning: "Shows the first visible break in findability, AI/search readability, clarity, trust, choice, or action with confidence limits and the safest next move.",
    aiPosture: "First AI/search signal only. It can show where the business may be unclear to customers and answer systems, but it is not a complete visibility audit.",
    notThis: "Not full review, implementation, monthly monitoring, unsupported ranking promises, unsupported AI answer placement promises, or paid-report attachment delivery.",
    nextDecision: "Unlock Deep Review when the first signal matters enough that guessing would cost more than review.",
    deliveryChannel: "Dashboard-only protected result unless a separate export is approved later.",
    value: getPlanValueDelivery("free-scan"),
  },
  {
    planKey: "deep-review",
    command: "Review",
    reportType: REPORT_ACCESS_BY_PLAN["deep-review"].reportName,
    stage: "Diagnosis evidence",
    href: REPORT_ACCESS_BY_PLAN["deep-review"].customerRoute,
    cta: `Open Review page — ${DEEP_REVIEW_PRICE.price}`,
    deliveryMeaning: "Explains why the business may not be found, trusted, understood, or chosen before money is spent on the wrong repair.",
    aiPosture: paidAiPosture("deep-review"),
    notThis: "Not done-for-you implementation, unlimited revisions, ad management, unsupported ranking promises, unsupported AI answer placement promises, or unsupported outcome promises.",
    nextDecision: "Use Build Fix only after the review identifies a scoped target ready for improvement.",
    deliveryChannel: paidDelivery("deep-review"),
    value: getPlanValueDelivery("deep-review"),
  },
  {
    planKey: "build-fix",
    command: "Repair",
    reportType: REPORT_ACCESS_BY_PLAN["build-fix"].reportName,
    stage: "Scoped repair evidence",
    href: REPORT_ACCESS_BY_PLAN["build-fix"].customerRoute,
    cta: `Open Repair page — ${BUILD_FIX_PRICE.price}`,
    deliveryMeaning: "Shows what changed, why it mattered, and what still remains outside the approved repair.",
    aiPosture: paidAiPosture("build-fix"),
    notThis: "Not a full review report, unlimited site rebuild, recurring monitoring, unsupported ranking promises, unsupported AI answer placement promises, or unapproved production work.",
    nextDecision: "Use Ongoing Control when the business needs recurring watch after the scoped improvement.",
    deliveryChannel: paidDelivery("build-fix"),
    value: getPlanValueDelivery("build-fix"),
  },
  {
    planKey: "ongoing-control",
    command: "Control",
    reportType: REPORT_ACCESS_BY_PLAN["ongoing-control"].reportName,
    stage: "Monthly AI Visibility control",
    href: REPORT_ACCESS_BY_PLAN["ongoing-control"].customerRoute,
    cta: `Open Control page — ${ONGOING_CONTROL_PRICE.price}`,
    deliveryMeaning: "Keeps priorities, alerts, AI/search posture, trend awareness, and next decisions under control as search, customers, and competitors move.",
    aiPosture: paidAiPosture("ongoing-control"),
    notThis: "Not unlimited Build Fix, a full Deep Review every month, ad management, ranking promises, algorithm control, or unsupported AI answer placement promises.",
    nextDecision: "Use Build Fix separately when monthly control identifies a concrete scoped improvement.",
    deliveryChannel: paidDelivery("ongoing-control"),
    value: getPlanValueDelivery("ongoing-control"),
  },
] as const satisfies readonly {
  planKey: PlanValueKey;
  command: string;
  reportType: string;
  stage: string;
  href: string;
  cta: string;
  deliveryMeaning: string;
  aiPosture: string;
  notThis: string;
  nextDecision: string;
  deliveryChannel: string;
  value: ReturnType<typeof getPlanValueDelivery>;
}[];

const REPORT_STATE = [
  { label: "Ready", value: "AI Visibility signal result", detail: "The first AI Visibility signal is the only immediately actionable report type in this demo state." },
  { label: "AI/Search posture", value: "Signal, proof, risk, limit", detail: "Reports explain what is visible, what it may mean, what is limited, and which command comes next." },
  { label: "Paid proof", value: "Dashboard + email attachment", detail: "Deep Review, Build Fix, and Ongoing Control reports must appear in the vault and arrive by email with an approved PDF." },
] as const;

const REPORT_ACTIONS = [
  { title: "Open AI Visibility signal", href: REPORT_ACCESS_BY_PLAN["free-scan"].customerRoute, value: "Read the first proof" },
  { title: "Ask report support", href: "/dashboard/support", value: "Question or correction" },
  { title: "Compare AI Visibility depth", href: "/plans", value: "Choose the next stage" },
] as const;

const REPORT_VAULT_RULES = [
  "Pending, draft, or unavailable reports must never look final.",
  "Scan, Review, Repair, and Control report types must remain visibly separate.",
  "Every paid plan report must be accessible from the dashboard report vault and also delivered by email with an approved PDF.",
  "AI/search posture must be useful and bounded: no ranking promises, AI placement promises, lead promises, or algorithm control claims.",
] as const;

const REPORT_PROOF_CHECKS = [
  "Open ready reports only when the result is approved for customer view.",
  "Keep pending, draft, unavailable, and approved states visibly different.",
  "Use report support for proof, confidence, evidence boundary, or correction questions.",
  "Choose the next plan only after the report explains the next safest command.",
] as const;

const REPORT_READ_ORDER = [
  ["Read", "Confirm whether a result is ready, pending, held, or unavailable before acting."],
  ["Bound", "Separate dashboard-only first signals from approved paid-report delivery."],
  ["Decide", "Move to support or plan depth only after the next command is clear."],
] as const;

export default function ReportsVaultPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(251,207,232,0.2),transparent_30%),radial-gradient(circle_at_88%_0%,rgba(125,211,252,0.28),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_38%,#ffffff_100%)] text-slate-950">
      <VaultAtmosphere />

      <section className="relative mx-auto grid max-w-[92rem] gap-8 px-4 pb-10 pt-8 sm:px-6 md:pt-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center" aria-label="Report vault entry">
        <div className="relative z-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">AI Visibility proof vault</p>
          <h1 className="max-w-5xl text-[clamp(3rem,7vw,6.6rem)] font-semibold leading-[0.86] tracking-[-0.08em] text-slate-950">
            Keep the evidence of what customers and AI search can understand.
          </h1>
          <p className="mt-6 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-xl sm:leading-9">
            This vault stores the AI Visibility record: first signals, Diagnosis evidence, approved proof, AI/search posture, confidence limits, paid delivery, and the next command decision.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href={REPORT_ACCESS_BY_PLAN["free-scan"].customerRoute} className={CENDORQ_EXPERIENCE_SYSTEM.primaryButton}>Open AI Visibility signal</Link>
            <Link href="/dashboard" className={CENDORQ_EXPERIENCE_SYSTEM.secondaryButton}>Back to command center</Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.35rem] border border-white/80 bg-white/78 p-5 shadow-[0_30px_100px_rgba(15,23,42,0.09)] backdrop-blur-2xl sm:p-7">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent" />
          <h2 className="text-[clamp(2.1rem,5vw,4.2rem)] font-semibold leading-[0.95] tracking-[-0.07em] text-slate-950">Nothing final until it is approved.</h2>
          <p className="mt-5 text-base font-semibold leading-8 text-slate-600">Report depth, AI/search posture, confidence, and delivery should be easy to separate before a customer acts.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {REPORT_STATE.slice(0, 2).map((item) => (
              <article key={item.label} className="rounded-[1.3rem] border border-cyan-100 bg-cyan-50/42 p-4 shadow-sm">
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-700">{item.label}</div>
                <div className="mt-3 text-2xl font-semibold tracking-[-0.045em] text-slate-950">{item.value}</div>
                <p className="mt-2 text-xs font-semibold leading-6 text-slate-600">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-8 sm:px-6" aria-label="Report state summary">
        <div className="grid gap-3 md:grid-cols-3">
          {REPORT_STATE.map((item) => (
            <article key={item.label} className="rounded-[1.6rem] border border-white/80 bg-white/82 p-5 shadow-[0_14px_42px_rgba(15,23,42,0.045)] backdrop-blur">
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-700">{item.label}</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-slate-950">{item.value}</h2>
              <p className="mt-3 text-xs font-semibold leading-6 text-slate-600">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-8 sm:px-6" aria-label="Report vault read order">
        <div className="grid gap-3 md:grid-cols-3">
          {REPORT_READ_ORDER.map(([label, copy]) => (
            <article key={label} className="rounded-[1.45rem] border border-white/80 bg-white/84 p-5 shadow-[0_14px_42px_rgba(15,23,42,0.045)] backdrop-blur">
              <div className="text-sm font-black text-cyan-700">{label}</div>
              <p className="mt-2 text-xs font-semibold leading-6 text-slate-600">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-8 sm:px-6" aria-label="Separated report library">
        <div className="overflow-hidden rounded-[2.15rem] border border-white/80 bg-white/84 shadow-[0_18px_60px_rgba(15,23,42,0.055)] backdrop-blur">
          <div className="grid gap-0 lg:grid-cols-[0.72fr_1.28fr]">
            <div className="border-b border-cyan-100 p-5 sm:p-7 lg:border-b-0 lg:border-r">
              <h2 className="text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">Different proof for every AI Visibility depth.</h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">Scan, Review, Repair, and Control each have a different job, so each report type needs a different meaning, route, and boundary.</p>
              <Link href="/dashboard" className="mt-6 inline-flex text-sm font-bold text-cyan-700 transition hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2">Back to dashboard →</Link>
            </div>
            <div className="divide-y divide-cyan-100">
              {REPORT_LIBRARY.map((report) => (
                <Link key={report.planKey} href={report.href} className="group grid gap-4 p-5 transition hover:-translate-y-0.5 hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 sm:grid-cols-[8rem_1fr_auto] sm:items-center">
                  <div>
                    <div className="text-3xl font-semibold tracking-[-0.06em] text-slate-950">{report.command}</div>
                    <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-700">{report.reportType}</div>
                  </div>
                  <div className="max-w-2xl">
                    <p className="text-sm font-semibold leading-6 text-slate-600">{report.deliveryMeaning}</p>
                    <p className="mt-2 text-xs font-semibold leading-5 text-cyan-700">AI/Search posture: {report.aiPosture}</p>
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:block sm:text-right">
                    <div className="text-sm font-black text-cyan-700">{report.value.price}</div>
                    <span className="mt-1 inline-flex text-sm font-bold text-cyan-700 transition group-hover:text-slate-950">{report.cta} →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-8 sm:px-6" aria-label="Report actions">
        <div className="grid gap-3 md:grid-cols-3">
          {REPORT_ACTIONS.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-[1.55rem] border border-white/80 bg-white/82 p-5 shadow-[0_14px_42px_rgba(15,23,42,0.045)] backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2">
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-700">{item.value}</div>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-slate-950">{item.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-8 sm:px-6" aria-label="Proof vault consistency">
        <div className="rounded-[1.75rem] border border-cyan-100 bg-cyan-50/42 p-5 shadow-[0_14px_42px_rgba(15,23,42,0.04)] sm:p-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Proof vault consistency</p>
          <div className="mt-4 grid gap-3 md:grid-cols-4">
            {REPORT_PROOF_CHECKS.map((check) => (
              <p key={check} className="rounded-[1rem] border border-white/80 bg-white p-3 text-xs font-semibold leading-5 text-slate-700 shadow-sm">{check}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-16 sm:px-6" aria-label="Vault safety standard">
        <div className="overflow-hidden rounded-[2.15rem] border border-white/80 bg-white/84 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.055)] backdrop-blur sm:p-7">
          <h2 className="max-w-5xl text-4xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-5xl">Useful only when report depth, AI/search posture, and delivery are impossible to confuse.</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {REPORT_VAULT_RULES.map((rule) => (
              <p key={rule} className="rounded-[1rem] border border-cyan-100 bg-cyan-50/45 p-3 text-xs font-semibold leading-6 text-slate-600 shadow-sm">{rule}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="Report vault guardrails">
        AI Visibility proof vault. Your private Cendorq vault for AI Visibility signals, Diagnosis evidence, approved reports, paid-report delivery, confidence labels, and next-step guidance. REPORT_VAULT_HANDOFFS REPORT_LIBRARY REPORT_STATE REPORT_ACTIONS REPORT_VAULT_RULES REPORT_READ_ORDER. Keep the evidence of what customers and AI search can understand. This vault stores the AI Visibility record: first signals, Diagnosis evidence, approved proof, AI/search posture, confidence limits, paid delivery, and the next command decision. Nothing final until it is approved. Different proof for every AI Visibility depth. Open AI Visibility signal. Back to command center. Ask report support. Compare AI Visibility depth. AI Visibility signal result. Diagnosis evidence. Scoped repair evidence. Monthly AI Visibility control. Deep Review report. Build Fix summary. Ongoing Control monthly summary. Dashboard-only protected result unless a separate export is approved later. Dashboard report plus approved email attachment. Every paid plan report must be accessible from the dashboard report vault and also delivered by email with an approved PDF. AI/search posture must be useful and bounded: no ranking promises, AI placement promises, lead promises, or algorithm control claims. Paid report actions route to plan detail pages before payment. Scan. Review. Repair. Control. AI/Search posture. AI Visibility signal result dashboard-only protected result. Paid plan report delivery operating system. Nothing final until approved. Proof vault consistency. Open ready reports only when the result is approved for customer view. Keep pending, draft, unavailable, and approved states visibly different. Use report support for proof, confidence, evidence boundary, or correction questions. Choose the next plan only after the report explains the next safest command. Report vault read order. Read, Bound, Decide. decision.finalReportVisible decision.releaseApprovalRequired decision.approvedPdfRequired decision.emailAttachmentRequired {REPORT_LIBRARY.map((report) => `${report.planKey} ${report.command} ${report.reportType} ${report.stage} ${report.deliveryMeaning} ${report.aiPosture} ${report.notThis} ${report.nextDecision} ${report.deliveryChannel} ${report.value.primaryValue} ${report.value.reportBoundary}`).join(" ")} {PLAN_VALUE_SEPARATION_RULES.join(" ")} {REPORT_VAULT_RULES.join(" ")} {REPORT_PROOF_CHECKS.join(" ")} {REPORT_READ_ORDER.map(([label, copy]) => `${label} ${copy}`).join(" ")} {PAID_PLAN_REPORT_DELIVERY_GUARDS.join(" ")} {PAID_PLAN_REPORT_DELIVERY_OPERATING_SYSTEM.map((contract) => `${contract.planKey} ${contract.customerReportName} ${contract.dashboardPath} ${contract.customerEmailSubject} ${contract.attachmentFileNamePattern} ${contract.releaseGate} ${contract.aiVisibilityValue} ${contract.reportStructure.join(" ")}`).join(" ")} {REPORT_VAULT_HANDOFFS.map((handoff) => `${handoff.decision} ${handoff.surfaceKey} ${handoff.currentState} ${handoff.safeNextAction} ${handoff.recoveryPath} ${handoff.connectedDestination}`).join(" ")}
      </section>
    </main>
  );
}

function paidDelivery(planKey: "deep-review" | "build-fix" | "ongoing-control") {
  const contract = PAID_REPORT_BY_PLAN[planKey];
  return contract ? `Dashboard report plus ${contract.attachmentContentType} email attachment after ${contract.releaseGate}.` : "Dashboard report plus approved email attachment.";
}

function paidAiPosture(planKey: "deep-review" | "build-fix" | "ongoing-control") {
  const contract = PAID_REPORT_BY_PLAN[planKey];
  return contract?.aiVisibilityValue || "AI/search posture is customer-safe, bounded, and never a ranking or placement promise.";
}

function VaultAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(251,207,232,0.16),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.17),transparent_27%),linear-gradient(180deg,rgba(255,255,255,0.4),rgba(239,249,255,0.74)_42%,rgba(255,255,255,0.95)_100%)]" />
      <div className="absolute left-1/2 top-0 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-cyan-200/24 blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.018]" />
    </div>
  );
}
