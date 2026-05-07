import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { projectCustomerPlatformHandoff } from "@/lib/customer-platform-handoff-runtime";
import { getCendorqPlanPrice } from "@/lib/pricing-checkout-orchestration";
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
  title: "Visibility report vault | Cendorq",
  description: "Your private Cendorq vault for visibility signals, approved reports, paid-report delivery, confidence labels, and next-plan guidance.",
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

const REPORT_LIBRARY = [
  {
    planKey: "free-scan",
    command: "Scan",
    reportType: "Free Scan result",
    stage: "First signal",
    href: "/dashboard/reports/free-scan",
    cta: "Open result",
    deliveryMeaning: "Shows the first visible break in visibility, clarity, trust, or action with confidence limits and the safest next move.",
    notThis: "Not full diagnosis, implementation, monthly monitoring, or paid-report attachment delivery.",
    nextDecision: "Unlock Deep Review when the first signal matters enough that guessing would cost more than diagnosis.",
    deliveryChannel: "Dashboard-only protected result unless a separate export is approved later.",
    value: getPlanValueDelivery("free-scan"),
  },
  {
    planKey: "deep-review",
    command: "Diagnose",
    reportType: "Deep Review report",
    stage: "Cause-level proof",
    href: DEEP_REVIEW_PRICE.checkoutPath,
    cta: `Unlock ${DEEP_REVIEW_PRICE.price}`,
    deliveryMeaning: "Explains why the business is not being found, trusted, or chosen before money is spent on the wrong fix.",
    notThis: "Not done-for-you implementation, unlimited revisions, ad management, or guaranteed outcomes.",
    nextDecision: "Use Build Fix only after the diagnosis identifies a scoped target ready for implementation.",
    deliveryChannel: paidDelivery("deep-review"),
    value: getPlanValueDelivery("deep-review"),
  },
  {
    planKey: "build-fix",
    command: "Fix",
    reportType: "Build Fix summary",
    stage: "Scoped improvement",
    href: BUILD_FIX_PRICE.checkoutPath,
    cta: `Unlock ${BUILD_FIX_PRICE.price}`,
    deliveryMeaning: "Shows what changed, why it mattered, and what still remains outside the approved fix.",
    notThis: "Not a full diagnostic report, unlimited site rebuild, recurring monitoring, or unapproved production work.",
    nextDecision: "Use Ongoing Control when the business needs recurring watch after the scoped improvement.",
    deliveryChannel: paidDelivery("build-fix"),
    value: getPlanValueDelivery("build-fix"),
  },
  {
    planKey: "ongoing-control",
    command: "Control",
    reportType: "Ongoing Control monthly summary",
    stage: "Monthly visibility control",
    href: ONGOING_CONTROL_PRICE.checkoutPath,
    cta: `Start ${ONGOING_CONTROL_PRICE.price}`,
    deliveryMeaning: "Keeps priorities, alerts, trend awareness, and next decisions under control as search and competitors move.",
    notThis: "Not unlimited Build Fix, a full Deep Review every month, ad management, ranking guarantees, or guaranteed AI placement.",
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
  notThis: string;
  nextDecision: string;
  deliveryChannel: string;
  value: ReturnType<typeof getPlanValueDelivery>;
}[];

const REPORT_STATE = [
  { label: "Ready", value: "Free Scan result", detail: "The first visibility signal is the only immediately actionable report type in this demo state." },
  { label: "Paid delivery", value: "Dashboard + email attachment", detail: "Deep Review, Build Fix, and Ongoing Control reports must appear in the vault and arrive by email with an approved PDF." },
  { label: "Protected", value: "Customer vault", detail: "Visibility records stay behind customer ownership and verified access gates." },
] as const;

const REPORT_ACTIONS = [
  { title: "Open Free Scan result", href: "/dashboard/reports/free-scan", value: "Read the first signal" },
  { title: "Ask report support", href: "/dashboard/support", value: "Question or correction" },
  { title: "Compare command depth", href: "/plans", value: "Choose the next stage" },
] as const;

const REPORT_VAULT_RULES = [
  "Pending, draft, or unavailable reports must never look final.",
  "Scan, Diagnose, Fix, and Control report types must remain visibly separate.",
  "Every paid plan report must be accessible from the dashboard report vault and also delivered by email with an approved PDF attachment.",
  "The vault must not expose internal notes, private records, or cross-customer data.",
] as const;

export default function ReportsVaultPage() {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-5 text-white sm:px-6 md:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(103,232,249,0.12),transparent_32%),radial-gradient(circle_at_86%_8%,rgba(14,165,233,0.08),transparent_34%)]" />

      <section className="system-panel-authority relative z-10 overflow-hidden rounded-[1.65rem] p-4 shadow-[0_30px_120px_rgba(2,8,23,0.48)] sm:rounded-[1.85rem] sm:p-8">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />
        <div className="grid gap-5 lg:grid-cols-[1fr_20rem] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Visibility report vault</p>
            <h1 className="mt-3 max-w-5xl text-3xl font-semibold tracking-tight text-white sm:mt-4 sm:text-5xl">
              Keep the proof of what the market can understand.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:mt-5 sm:text-base sm:leading-8">
              This vault stores the business visibility record: first signals, approved reports, paid delivery, confidence limits, and the next command decision.
            </p>
          </div>
          <div className="rounded-[1.25rem] border border-cyan-300/20 bg-cyan-300/10 p-4 sm:p-5">
            <div className="text-sm font-semibold text-cyan-100">Delivery rule</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Dashboard + attachment.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-200">Every paid report needs both a vault copy and an email attachment after approval.</p>
            <Link href="/dashboard/reports/free-scan" className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Open Free Scan result
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-5 grid gap-3 md:grid-cols-3" aria-label="Report state summary">
        {REPORT_STATE.map((item) => (
          <article key={item.label} className="system-surface rounded-[1.2rem] p-4 sm:rounded-[1.35rem] sm:p-5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">{item.label}</div>
            <h2 className="mt-3 text-xl font-semibold tracking-tight text-white">{item.value}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-7 overflow-hidden rounded-[1.7rem] border border-cyan-300/15 bg-[linear-gradient(135deg,rgba(8,47,73,0.72),rgba(2,8,23,0.88)_48%,rgba(14,116,144,0.24))] p-4 shadow-[0_28px_100px_rgba(2,8,23,0.42)] sm:p-7" aria-label="Separated report library">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Separated report library</p>
            <h2 className="mt-2 max-w-4xl text-2xl font-semibold tracking-tight text-white sm:text-4xl">
              Scan. Diagnose. Fix. Control. Different proof for each stage.
            </h2>
          </div>
          <Link href="/dashboard" className="text-sm font-semibold text-cyan-200 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
            Back to dashboard →
          </Link>
        </div>
        <div className="mt-5 divide-y divide-white/10 rounded-[1.2rem] border border-white/10 bg-slate-950/50">
          {REPORT_LIBRARY.map((report) => (
            <Link key={report.planKey} href={report.href} className="group grid gap-3 px-4 py-4 transition hover:bg-cyan-300/[0.06] focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950 sm:grid-cols-[10rem_1fr_auto] sm:items-center sm:px-5">
              <div>
                <div className="text-2xl font-semibold tracking-tight text-white">{report.command}</div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100/75">{report.reportType}</div>
              </div>
              <p className="text-sm leading-6 text-slate-300">{report.deliveryMeaning}</p>
              <div className="flex items-center justify-between gap-4 sm:block sm:text-right">
                <div className="text-sm font-semibold text-cyan-100">{report.value.price}</div>
                <span className="mt-1 inline-flex text-sm font-semibold text-cyan-100 transition group-hover:text-white">{report.cta} →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-7 grid gap-3 md:grid-cols-3" aria-label="Report actions">
        {REPORT_ACTIONS.map((item) => (
          <Link key={item.href} href={item.href} className="system-surface rounded-[1.25rem] p-4 transition hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950 sm:p-5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">{item.value}</div>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">{item.title}</h3>
          </Link>
        ))}
      </section>

      <section className="relative z-10 mt-7 rounded-[1.45rem] border border-white/10 bg-white/[0.035] p-4 sm:p-5" aria-label="Vault safety standard">
        <p className="text-sm font-semibold text-cyan-100">Vault standard</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Useful only when report depth and delivery are impossible to confuse.</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {REPORT_VAULT_RULES.map((rule) => (
            <p key={rule} className="rounded-[1rem] border border-white/10 bg-black/20 p-3 text-xs leading-6 text-slate-300">{rule}</p>
          ))}
        </div>
      </section>

      <section className="sr-only" aria-label="Report vault guardrails">
        Visibility report vault. Paid plan report delivery operating system. Keep the proof of what the market can understand. Dashboard plus attachment. Every paid plan report must have a dashboard copy at /dashboard/reports. Every paid plan report delivery email must include the approved customer-safe report PDF as an attachment. Scan. Diagnose. Fix. Control. Different proof for each stage. Free Scan result dashboard-only protected result. Deep Review report dashboard plus email attachment. Build Fix summary dashboard plus email attachment. Ongoing Control monthly summary dashboard plus email attachment. Useful only when report depth and delivery are impossible to confuse. {REPORT_LIBRARY.map((report) => `${report.planKey} ${report.command} ${report.reportType} ${report.stage} ${report.deliveryMeaning} ${report.notThis} ${report.nextDecision} ${report.deliveryChannel} ${report.value.primaryValue} ${report.value.reportBoundary}`).join(" ")} {PLAN_VALUE_SEPARATION_RULES.join(" ")} {REPORT_VAULT_RULES.join(" ")} {PAID_PLAN_REPORT_DELIVERY_GUARDS.join(" ")} {PAID_PLAN_REPORT_DELIVERY_OPERATING_SYSTEM.map((contract) => `${contract.planKey} ${contract.customerReportName} ${contract.dashboardPath} ${contract.customerEmailSubject} ${contract.attachmentFileNamePattern} ${contract.releaseGate}`).join(" ")} {REPORT_VAULT_HANDOFFS.map((handoff) => `${handoff.decision} ${handoff.surfaceKey} ${handoff.currentState} ${handoff.safeNextAction} ${handoff.recoveryPath} ${handoff.connectedDestination}`).join(" ")}
      </section>
    </main>
  );
}

function paidDelivery(planKey: "deep-review" | "build-fix" | "ongoing-control") {
  const contract = PAID_REPORT_BY_PLAN[planKey];
  return contract ? `Dashboard report plus ${contract.attachmentContentType} email attachment after ${contract.releaseGate}.` : "Dashboard report plus approved email attachment.";
}
