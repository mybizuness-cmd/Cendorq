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
  title: "Readiness proof vault | Cendorq",
  description: "Your private Cendorq vault for readiness signals, AI/search posture, approved reports, paid-report delivery, confidence labels, and next-step guidance.",
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
    stage: "First signal",
    href: REPORT_ACCESS_BY_PLAN["free-scan"].customerRoute,
    cta: "Open result",
    deliveryMeaning: "Shows the first visible break in findability, AI/search readability, clarity, trust, choice, or action with confidence limits and the safest next move.",
    aiPosture: "First AI/search signal only. It can show where the business may be unclear to customers and answer systems, but it is not a complete visibility audit.",
    notThis: "Not full diagnosis, implementation, monthly monitoring, guaranteed ranking, guaranteed AI placement, or paid-report attachment delivery.",
    nextDecision: "Unlock AI Readiness Review when the first signal matters enough that guessing would cost more than review.",
    deliveryChannel: "Dashboard-only protected result unless a separate export is approved later.",
    value: getPlanValueDelivery("free-scan"),
  },
  {
    planKey: "deep-review",
    command: "Review",
    reportType: REPORT_ACCESS_BY_PLAN["deep-review"].reportName,
    stage: "Cause-level proof",
    href: REPORT_ACCESS_BY_PLAN["deep-review"].customerRoute,
    cta: `Open Review page — ${DEEP_REVIEW_PRICE.price}`,
    deliveryMeaning: "Explains why the business may not be found, trusted, understood, or chosen before money is spent on the wrong repair.",
    aiPosture: paidAiPosture("deep-review"),
    notThis: "Not done-for-you implementation, unlimited revisions, ad management, guaranteed ranking, guaranteed AI placement, or guaranteed outcomes.",
    nextDecision: "Use Signal Repair only after the review identifies a scoped target ready for improvement.",
    deliveryChannel: paidDelivery("deep-review"),
    value: getPlanValueDelivery("deep-review"),
  },
  {
    planKey: "build-fix",
    command: "Repair",
    reportType: REPORT_ACCESS_BY_PLAN["build-fix"].reportName,
    stage: "Scoped improvement",
    href: REPORT_ACCESS_BY_PLAN["build-fix"].customerRoute,
    cta: `Open Repair page — ${BUILD_FIX_PRICE.price}`,
    deliveryMeaning: "Shows what changed, why it mattered, and what still remains outside the approved repair.",
    aiPosture: paidAiPosture("build-fix"),
    notThis: "Not a full diagnostic report, unlimited site rebuild, recurring monitoring, guaranteed ranking, guaranteed AI placement, or unapproved production work.",
    nextDecision: "Use Readiness Control when the business needs recurring watch after the scoped improvement.",
    deliveryChannel: paidDelivery("build-fix"),
    value: getPlanValueDelivery("build-fix"),
  },
  {
    planKey: "ongoing-control",
    command: "Control",
    reportType: REPORT_ACCESS_BY_PLAN["ongoing-control"].reportName,
    stage: "Monthly readiness control",
    href: REPORT_ACCESS_BY_PLAN["ongoing-control"].customerRoute,
    cta: `Open Control page — ${ONGOING_CONTROL_PRICE.price}`,
    deliveryMeaning: "Keeps priorities, alerts, AI/search posture, trend awareness, and next decisions under control as search, customers, and competitors move.",
    aiPosture: paidAiPosture("ongoing-control"),
    notThis: "Not unlimited Signal Repair, a full AI Readiness Review every month, ad management, ranking guarantees, algorithm control, or guaranteed AI placement.",
    nextDecision: "Use Signal Repair separately when monthly control identifies a concrete scoped improvement.",
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
  { label: "Ready", value: "Readiness signal result", detail: "The first readiness signal is the only immediately actionable report type in this demo state." },
  { label: "AI/Search posture", value: "Signal, proof, risk, limit", detail: "Reports explain what is visible, what it may mean, what is limited, and which step comes next." },
  { label: "Paid proof", value: "Dashboard + email attachment", detail: "AI Readiness Review, Signal Repair, and Readiness Control reports must appear in the vault and arrive by email with an approved PDF." },
] as const;

const REPORT_ACTIONS = [
  { title: "Open readiness signal", href: REPORT_ACCESS_BY_PLAN["free-scan"].customerRoute, value: "Read the first proof" },
  { title: "Ask report support", href: "/dashboard/support", value: "Question or correction" },
  { title: "Compare readiness depth", href: "/plans", value: "Choose the next stage" },
] as const;

const REPORT_VAULT_RULES = [
  "Pending, draft, or unavailable reports must never look final.",
  "Scan, Review, Repair, and Control report types must remain visibly separate.",
  "Every paid plan report must be accessible from the dashboard report vault and also delivered by email with an approved PDF.",
  "AI/search posture must be useful and bounded: no guaranteed ranking, guaranteed AI placement, guaranteed leads, or algorithm control.",
] as const;

export default function ReportsVaultPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[linear-gradient(180deg,#fff7fb_0%,#e9fbff_18%,#eff9ff_62%,#ffffff_100%)] text-slate-950">
      <VaultAtmosphere />

      <section className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-[92rem] gap-8 px-4 pb-12 pt-6 sm:px-6 md:pb-18 md:pt-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <div className="relative z-10">
          <h1 className="max-w-5xl text-[clamp(3.2rem,7.3vw,7.5rem)] font-semibold leading-[0.84] tracking-[-0.08em] text-slate-950">
            Keep the record of what customers and AI search can understand.
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">
            This vault stores the business readiness record: first signals, approved proof, AI/search posture, confidence limits, paid delivery, and the next readiness decision.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={REPORT_ACCESS_BY_PLAN["free-scan"].customerRoute} className={CENDORQ_EXPERIENCE_SYSTEM.primaryButton}>
              Open readiness signal
            </Link>
            <Link href="/dashboard" className={CENDORQ_EXPERIENCE_SYSTEM.secondaryButton}>
              Back to control center
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.7rem] border border-white/80 bg-white/74 p-5 shadow-[0_30px_100px_rgba(15,23,42,0.1)] backdrop-blur-2xl sm:p-7">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent" />
          <h2 className="text-5xl font-semibold tracking-[-0.07em] text-slate-950 sm:text-6xl">Nothing final until it is approved.</h2>
          <p className="mt-5 text-base font-medium leading-8 text-slate-600">The vault should make report depth, AI/search posture, confidence, and delivery impossible to confuse.</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {REPORT_STATE.slice(0, 2).map((item) => (
              <article key={item.label} className="rounded-[1.6rem] border border-cyan-100 bg-cyan-50/50 p-5 shadow-sm">
                <div className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-700">{item.label}</div>
                <div className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-slate-950">{item.value}</div>
                <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Report state summary">
        <div className="grid gap-4 md:grid-cols-3">
          {REPORT_STATE.map((item, index) => (
            <article key={item.label} className={index === 1 ? "rounded-[2rem] border border-cyan-200 bg-cyan-50/75 p-6 shadow-[0_20px_65px_rgba(14,165,233,0.08)] md:-mt-6 md:mb-6" : "rounded-[2rem] border border-white/80 bg-white/82 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.055)] backdrop-blur"}>
              <div className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-700">{item.label}</div>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.055em] text-slate-950">{item.value}</h2>
              <p className="mt-4 text-sm font-medium leading-7 text-slate-600">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Separated report library">
        <div className="overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/82 shadow-[0_24px_80px_rgba(15,23,42,0.065)] backdrop-blur">
          <div className="grid gap-0 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="border-b border-cyan-100 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <h2 className="text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-6xl">Different proof for every readiness depth.</h2>
              <p className="mt-5 text-base font-medium leading-8 text-slate-600">Scan, Review, Repair, and Control cannot look like the same cheap report block. Each one has a different job.</p>
              <Link href="/dashboard" className="mt-7 inline-flex text-sm font-bold text-cyan-700 transition hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2">
                Back to dashboard →
              </Link>
            </div>
            <div className="divide-y divide-cyan-100">
              {REPORT_LIBRARY.map((report) => (
                <Link key={report.planKey} href={report.href} className="group grid gap-4 p-5 transition hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 sm:grid-cols-[11rem_1fr_auto] sm:items-center sm:p-6">
                  <div>
                    <div className="text-4xl font-semibold tracking-[-0.06em] text-slate-950">{report.command}</div>
                    <div className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-700">{report.reportType}</div>
                  </div>
                  <div className="max-w-2xl">
                    <p className="text-sm font-medium leading-6 text-slate-600">{report.deliveryMeaning}</p>
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

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Report actions">
        <div className="grid gap-4 md:grid-cols-3">
          {REPORT_ACTIONS.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-[2rem] border border-white/80 bg-white/82 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.055)] backdrop-blur transition hover:-translate-y-1 hover:border-cyan-200 hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2">
              <div className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-700">{item.value}</div>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-slate-950">{item.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-16 sm:px-6" aria-label="Vault safety standard">
        <div className="overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/82 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.065)] backdrop-blur sm:p-8 lg:p-10">
          <h2 className="max-w-5xl text-4xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-6xl">Useful only when report depth, AI/search posture, and delivery are impossible to confuse.</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {REPORT_VAULT_RULES.map((rule) => (
              <p key={rule} className="rounded-[1.35rem] border border-cyan-100 bg-cyan-50/45 p-4 text-sm font-semibold leading-7 text-slate-600 shadow-sm">{rule}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="Report vault guardrails">
        Readiness proof vault. Light report vault. No black report vault blocks. No dark blue report vault blocks. Paid plan report delivery operating system. Keep the record of what customers and AI search can understand. Nothing final until approved. Scan. Review. Repair. Control. Different proof for every readiness depth. AI/Search posture. Readiness signal result dashboard-only protected result. AI Readiness Review report dashboard plus email attachment. Signal Repair summary dashboard plus email attachment. Readiness Control monthly summary dashboard plus email attachment. Useful only when report depth, AI/search posture, and delivery are impossible to confuse. Paid report actions route to plan detail pages before payment. {REPORT_LIBRARY.map((report) => `${report.planKey} ${report.command} ${report.reportType} ${report.stage} ${report.deliveryMeaning} ${report.aiPosture} ${report.notThis} ${report.nextDecision} ${report.deliveryChannel} ${report.value.primaryValue} ${report.value.reportBoundary}`).join(" ")} {PLAN_VALUE_SEPARATION_RULES.join(" ")} {REPORT_VAULT_RULES.join(" ")} {PAID_PLAN_REPORT_DELIVERY_GUARDS.join(" ")} {PAID_PLAN_REPORT_DELIVERY_OPERATING_SYSTEM.map((contract) => `${contract.planKey} ${contract.customerReportName} ${contract.dashboardPath} ${contract.customerEmailSubject} ${contract.attachmentFileNamePattern} ${contract.releaseGate} ${contract.aiVisibilityValue} ${contract.reportStructure.join(" ")}`).join(" ")} {REPORT_VAULT_HANDOFFS.map((handoff) => `${handoff.decision} ${handoff.surfaceKey} ${handoff.currentState} ${handoff.safeNextAction} ${handoff.recoveryPath} ${handoff.connectedDestination}`).join(" ")} {Object.values(REPORT_ACCESS_BY_PLAN).map((decision) => `${decision.reportKey} ${decision.planKey} ${decision.reportName} ${decision.customerRoute} ${decision.fallbackRoute} ${decision.accessState} final visible ${decision.finalReportVisible} release approval ${decision.releaseApprovalRequired} approved pdf ${decision.approvedPdfRequired} email attachment ${decision.emailAttachmentRequired}`).join(" ")}
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
  return contract?.aiVisibilityValue || "AI/search posture is customer-safe, bounded, and never a ranking or placement guarantee.";
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
