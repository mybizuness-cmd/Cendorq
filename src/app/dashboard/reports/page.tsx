import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { projectCustomerPlatformHandoff } from "@/lib/customer-platform-handoff-runtime";
import { getCendorqPlanPrice } from "@/lib/pricing-checkout-orchestration";
import {
  getPlanValueDelivery,
  PLAN_VALUE_SEPARATION_RULES,
  type PlanValueKey,
} from "@/lib/plan-value-delivery-architecture";

export const metadata = buildMetadata({
  title: "Report vault | Cendorq",
  description: "Your private Cendorq report vault for scan results, confidence labels, versions, and next-plan guidance.",
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

const REPORT_LIBRARY = [
  {
    planKey: "free-scan",
    reportType: "Free Scan result",
    status: "First signal path",
    href: "/dashboard/reports/free-scan",
    cta: "Open Free Scan result",
    deliveryMeaning: "A directional first-read result that shows the first visible customer-decision signal, confidence posture, limitations, and safest next move.",
    notThis: "Not a full diagnosis, implementation plan, or monthly monitoring report.",
    nextDecision: "Use Deep Review when the signal matters enough that guessing would be more expensive than diagnosis.",
    value: getPlanValueDelivery("free-scan"),
  },
  {
    planKey: "deep-review",
    reportType: "Deep Review diagnostic report",
    status: "Available after checkout and expanded review",
    href: DEEP_REVIEW_PRICE.checkoutPath,
    cta: `Unlock Deep Review ${DEEP_REVIEW_PRICE.price}`,
    deliveryMeaning: "An evidence-backed cause-level diagnosis with priority, friction explanation, confidence labels, and plan-fit recommendation.",
    notThis: "Not done-for-you implementation, unlimited revisions, ad management, or a guaranteed revenue outcome.",
    nextDecision: "Use Build Fix only when the diagnosis identifies a scoped improvement ready for implementation.",
    value: getPlanValueDelivery("deep-review"),
  },
  {
    planKey: "build-fix",
    reportType: "Build Fix delivery summary",
    status: "After scoped implementation",
    href: BUILD_FIX_PRICE.checkoutPath,
    cta: `Unlock Build Fix ${BUILD_FIX_PRICE.price}`,
    deliveryMeaning: "A before-after delivery summary for scoped customer-facing improvement work tied to an approved fix target.",
    notThis: "Not a full diagnostic report, unlimited site rebuild, recurring monitoring loop, or unapproved production work.",
    nextDecision: "Use Ongoing Control when the business needs recurring watch and monthly decision support after the fix.",
    value: getPlanValueDelivery("build-fix"),
  },
  {
    planKey: "ongoing-control",
    reportType: "Ongoing Control monthly summary",
    status: "Monthly subscription output",
    href: ONGOING_CONTROL_PRICE.checkoutPath,
    cta: `Start Ongoing Control ${ONGOING_CONTROL_PRICE.price}`,
    deliveryMeaning: "A recurring monthly control summary that tracks priorities, review cycle, alerts, trend awareness, and decision support.",
    notThis: "Not unlimited Build Fix work, a full Deep Review every month, ad management, ranking guarantees, or guaranteed AI placement.",
    nextDecision: "Use Build Fix when monitoring identifies a concrete improvement that needs scoped implementation.",
    value: getPlanValueDelivery("ongoing-control"),
  },
] as const satisfies readonly {
  planKey: PlanValueKey;
  reportType: string;
  status: string;
  href: string;
  cta: string;
  deliveryMeaning: string;
  notThis: string;
  nextDecision: string;
  value: ReturnType<typeof getPlanValueDelivery>;
}[];

const REPORT_ACTIONS = [
  { title: "Continue Free Scan", href: "/free-check" },
  { title: "Ask report support", href: "/dashboard/support" },
  { title: "Compare plans", href: "/plans" },
] as const;

const REPORT_VAULT_FIRST_USE_SNAPSHOT = [
  { label: "Availability", value: "Clear report state", detail: "Reports should be marked ready, pending, under review, corrected, or unavailable without guessing." },
  { label: "Methodology", value: "Separated reasoning", detail: "Facts, assumptions, inferences, recommendations, limitations, and next actions must stay distinct." },
  { label: "Access posture", value: "Protected vault", detail: "Report access belongs behind customer ownership checks and verified customer session gates." },
  { label: "Correction posture", value: "Visible review path", detail: "Customers should know how to ask for correction without exposing private files unnecessarily." },
] as const;

const REPORT_VAULT_RULES = [
  "Do not present pending, draft, or incomplete reports as final customer truth.",
  "Do not expose private payloads, private files, internal notes, operator identities, risk internals, prompts, secrets, or cross-customer data.",
  "Report copy must separate verified facts, assumptions, inferences, recommendations, limitations, and next actions.",
  "Correction paths must preserve audit proof while keeping customer-facing explanations calm and bounded.",
  "Report vault outputs must keep Free Scan result, Deep Review report, Build Fix delivery summary, and Ongoing Control monthly summary visibly separate.",
] as const;

export default function ReportsVaultPage() {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-6 text-white sm:px-6 md:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(103,232,249,0.12),transparent_32%),radial-gradient(circle_at_86%_8%,rgba(14,165,233,0.08),transparent_34%)]" />

      <section className="system-panel-authority relative z-10 rounded-[1.55rem] p-4 sm:rounded-[1.8rem] sm:p-8">
        <div className="grid gap-5 lg:grid-cols-[1fr_20rem] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Report vault</p>
            <h1 className="mt-3 max-w-5xl text-3xl font-semibold tracking-tight text-white sm:mt-4 sm:text-5xl">
              Know exactly which result is ready and what kind of value it unlocks.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:mt-5 sm:text-base sm:leading-8">
              The vault separates first signals, diagnostic reports, implementation summaries, and monthly control updates so no report looks deeper than it is.
            </p>
          </div>
          <div className="rounded-[1.2rem] border border-cyan-300/20 bg-cyan-300/10 p-4 sm:rounded-[1.3rem] sm:p-5">
            <div className="text-sm font-semibold text-cyan-100">Current state</div>
            <p className="mt-2 text-sm leading-6 text-slate-200">Treat only ready reports as actionable. Pending, draft, or unavailable outputs stay clearly bounded.</p>
            <Link href="/dashboard/reports/free-scan" className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950 sm:w-auto">
              Open Free Scan result
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-7 rounded-[1.55rem] border border-white/10 bg-white/[0.035] p-4 sm:rounded-[1.7rem] sm:p-6" aria-label="Separated report library">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Separated report library</p>
            <h2 className="mt-2 max-w-4xl text-2xl font-semibold tracking-tight text-white sm:text-4xl">
              Each report type has a different job.
            </h2>
          </div>
          <Link href="/dashboard" className="text-sm font-semibold text-cyan-200 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
            Back to dashboard →
          </Link>
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {REPORT_LIBRARY.map((report) => (
            <article key={report.planKey} className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4 sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{report.status}</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">{report.reportType}</h3>
                </div>
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-sm font-semibold text-cyan-100">{report.value.price}</span>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-300">{report.deliveryMeaning}</p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <MiniVaultList title="Includes here" items={report.value.includes.slice(0, 3)} tone="include" />
                <MiniVaultList title="Not this report" items={report.value.doesNotInclude.slice(0, 3)} tone="exclude" />
              </div>
              <p className="mt-4 rounded-[1rem] border border-white/10 bg-slate-950/50 p-3 text-sm leading-6 text-slate-400">{report.notThis}</p>
              <p className="mt-3 text-sm leading-6 text-cyan-100">{report.nextDecision}</p>
              <Link href={report.href} className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10 px-4 py-3 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-300/20 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
                {report.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-7 grid gap-4 md:grid-cols-3" aria-label="Report actions">
        {REPORT_ACTIONS.map((item) => (
          <Link key={item.href} href={item.href} className="system-surface rounded-[1.35rem] p-5 text-sm font-semibold text-white transition hover:border-cyan-300/30 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
            {item.title} →
          </Link>
        ))}
      </section>

      <section className="relative z-10 mt-7 grid gap-4 md:grid-cols-4" aria-label="Report vault readiness standards">
        {REPORT_VAULT_FIRST_USE_SNAPSHOT.map((item) => (
          <article key={item.label} className="system-surface rounded-[1.35rem] p-5">
            <div className="text-sm font-semibold text-cyan-100">{item.label}</div>
            <div className="mt-3 text-xl font-semibold tracking-tight text-white">{item.value}</div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="sr-only" aria-label="Report vault guardrails">
        Private report vault. Separated report library. Each report type has a different job. Free Scan result. Deep Review diagnostic report. Build Fix delivery summary. Ongoing Control monthly summary. Ready reports only. Not a full diagnosis. Not implementation. Not monthly monitoring. Not unlimited Build Fix. Report vault first use snapshot. Report vault first use guidance. Vault safety rules. Connected report handoffs. Report vault handoff runtime integration. Report movement stays tied to readiness, correction, plan value, and stage fit. confidence labels. methodology versions. correction markers. Compare plans. {REPORT_LIBRARY.map((report) => `${report.planKey} ${report.reportType} ${report.status} ${report.deliveryMeaning} ${report.notThis} ${report.nextDecision} ${report.value.primaryValue} ${report.value.reportBoundary}`).join(" ")} {PLAN_VALUE_SEPARATION_RULES.join(" ")} {REPORT_VAULT_FIRST_USE_SNAPSHOT.map((item) => `${item.label} ${item.value} ${item.detail}`).join(" ")} {REPORT_VAULT_RULES.join(" ")} {REPORT_VAULT_HANDOFFS.map((handoff) => `${handoff.decision} ${handoff.surfaceKey} ${handoff.currentState} ${handoff.safeNextAction} ${handoff.recoveryPath} ${handoff.connectedDestination}`).join(" ")}
      </section>
    </main>
  );
}

function MiniVaultList({ title, items, tone }: { title: string; items: readonly string[]; tone: "include" | "exclude" }) {
  return (
    <div className={tone === "include" ? "rounded-[1.05rem] border border-cyan-300/15 bg-cyan-300/10 p-3" : "rounded-[1.05rem] border border-white/10 bg-slate-950/50 p-3"}>
      <div className={tone === "include" ? "text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-100" : "text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500"}>{title}</div>
      <div className="mt-2 grid gap-1">
        {items.map((item) => (
          <p key={item} className={tone === "include" ? "text-xs leading-5 text-slate-200" : "text-xs leading-5 text-slate-400"}>{item}</p>
        ))}
      </div>
    </div>
  );
}
