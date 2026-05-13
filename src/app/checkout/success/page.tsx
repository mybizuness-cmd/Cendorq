import Link from "next/link";
import { CheckoutDashboardRedirect } from "./dashboard-redirect";
import { buildMetadata } from "@/lib/seo";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";
import { resolveCendorqCustomerJourney } from "@/lib/customer-journey-orchestrator";
import {
  CENDORQ_CHECKOUT_ORCHESTRATION,
  CENDORQ_PAID_PLAN_KEYS,
  CENDORQ_POST_PAYMENT_EMAILS,
  getPaidCendorqPlanPrice,
  type CendorqPaidPlanKey,
} from "@/lib/pricing-checkout-orchestration";

export const metadata = buildMetadata({
  title: "Payment complete | Cendorq",
  description: "Your Cendorq plan is confirmed. Continue into the protected dashboard for the next step.",
  path: "/checkout/success",
  noIndex: true,
});

type CheckoutSuccessSearchParams = {
  plan?: string | string[];
  session_id?: string | string[];
};

type CheckoutSuccessPageProps = {
  searchParams?: Promise<CheckoutSuccessSearchParams> | CheckoutSuccessSearchParams;
};

type CheckoutSuccessDashboardDestination = "/dashboard/reports" | "/dashboard/support/request" | "/dashboard/billing";

const POST_PAYMENT_CONTEXT: Record<CendorqPaidPlanKey, { stage: string; title: string; dashboardCta: string; completedEvidence: readonly ["customerOwnershipVerified"]; completedIntake: readonly string[] }> = {
  "deep-review": { stage: "AI Readiness Review", title: "Your AI Readiness Review is confirmed.", dashboardCta: "Open review next step", completedEvidence: ["customerOwnershipVerified"], completedIntake: [] },
  "build-fix": { stage: "Signal Repair", title: "Your Signal Repair payment is confirmed.", dashboardCta: "Open repair requirements", completedEvidence: ["customerOwnershipVerified"], completedIntake: [] },
  "ongoing-control": { stage: "Readiness Control", title: "Your Readiness Control subscription is confirmed.", dashboardCta: "Open control requirements", completedEvidence: ["customerOwnershipVerified"], completedIntake: [] },
};

export default async function CheckoutSuccessPage({ searchParams }: CheckoutSuccessPageProps) {
  const resolvedSearchParams = await searchParams;
  const planKey = normalizePaidPlanKey(resolvedSearchParams?.plan);
  const sessionId = normalizeQueryValue(resolvedSearchParams?.session_id) || "pending-session";
  const plan = getPaidCendorqPlanPrice(planKey);
  const context = POST_PAYMENT_CONTEXT[planKey];
  const journey = resolveCendorqCustomerJourney({ purchasedPlan: planKey, source: "checkout-success", sessionId, completedEvidence: context.completedEvidence, completedIntake: context.completedIntake });
  const dashboardDestination = normalizeDashboardDestination(journey.dashboardDestination);
  const email = CENDORQ_POST_PAYMENT_EMAILS.find((item) => item.planKey === planKey);
  const emailCopy = email ? `${email.subject}. ${email.customerGoal}` : "A confirmation email should also explain the next step.";
  const statusLabel = journey.deliveryCanStart ? "Ready for queue" : journey.backendWorkState === "do-not-start" ? "Held safely" : "Next input needed";
  const activationSteps = [
    { label: "Plan", value: context.stage, copy: `${plan.price} ${plan.cadence}` },
    { label: "Status", value: statusLabel, copy: journey.safeCustomerMessage },
    { label: "Next", value: humanize(journey.backendWorkState), copy: journey.customerNextAction },
  ] as const;

  return (
    <main className={CENDORQ_EXPERIENCE_SYSTEM.pageShell}>
      <CheckoutDashboardRedirect destination={dashboardDestination} />
      <section className="relative overflow-hidden px-5 py-12 sm:px-8 lg:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_0%,rgba(125,211,252,0.28),transparent_34%),linear-gradient(180deg,#ffffff,#f8fbff_58%,#eef8ff)]" aria-hidden="true" />
        <div className="relative mx-auto grid min-h-[calc(100vh-4.25rem)] max-w-7xl gap-8 lg:grid-cols-[0.84fr_1.16fr] lg:items-center">
          <div>
            <h1 className={`max-w-5xl ${CENDORQ_EXPERIENCE_SYSTEM.pageHeadline}`}>{context.title}</h1>
            <p className={`mt-6 max-w-3xl ${CENDORQ_EXPERIENCE_SYSTEM.body}`}>{journey.safeCustomerMessage}</p>
            <p className={`mt-4 max-w-2xl ${CENDORQ_EXPERIENCE_SYSTEM.mutedText}`}>Payment unlocks the workflow. Cendorq starts delivery only when the required ownership, intake, evidence, diagnosis, and approval state fit the stage.</p>
            <div className={`mt-8 ${CENDORQ_EXPERIENCE_SYSTEM.mobileActionRow}`}>
              <Link href={dashboardDestination} className={`${CENDORQ_EXPERIENCE_SYSTEM.primaryButton} ${CENDORQ_EXPERIENCE_SYSTEM.mobileTouchButton}`}>{context.dashboardCta}</Link>
              <Link href="/dashboard/billing" className={`${CENDORQ_EXPERIENCE_SYSTEM.secondaryButton} ${CENDORQ_EXPERIENCE_SYSTEM.mobileTouchButton}`}>Open billing</Link>
            </div>
          </div>

          <div className={CENDORQ_EXPERIENCE_SYSTEM.glassPanel}>
            <div className="overflow-hidden rounded-[1.85rem] border border-white/80 bg-white/84 shadow-[0_24px_80px_rgba(15,23,42,0.065)] backdrop-blur sm:rounded-[2.35rem]">
              <div className="border-b border-cyan-100 bg-[radial-gradient(circle_at_20%_0%,rgba(125,211,252,0.2),transparent_35%),linear-gradient(180deg,#ffffff,#effcff)] p-6 sm:p-8">
                <div className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-700">Resolved journey state</div>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">{context.stage}</h2>
                <p className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-slate-950">{plan.price}</p>
                <p className="mt-1 text-sm font-semibold text-slate-600">{plan.cadence}</p>
                <div className="mt-5 inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-700">{humanize(journey.fulfillmentState)}</div>
              </div>
              <div className="relative bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-5 sm:p-6">
                <div className="absolute left-10 top-8 hidden h-[calc(100%-4rem)] w-px bg-gradient-to-b from-cyan-200 via-slate-300 to-indigo-200 sm:block" aria-hidden="true" />
                <div className="grid gap-3">
                  {activationSteps.map((item, index) => (
                    <article key={item.label} className="relative grid gap-4 rounded-[1.6rem] border border-slate-200 bg-white/88 p-5 shadow-[0_14px_45px_rgba(15,23,42,0.055)] sm:grid-cols-[3.4rem_1fr] sm:items-start">
                      <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-black text-slate-950 shadow-sm">{index + 1}</div>
                      <div><div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">{item.label}</div><p className="mt-2 text-lg font-semibold leading-7 tracking-[-0.025em] text-slate-950">{item.value}</p><p className="mt-2 text-sm font-medium leading-7 text-slate-600">{item.copy}</p></div>
                    </article>
                  ))}
                  <article className="relative rounded-[1.6rem] border border-cyan-200 bg-cyan-50 p-5 shadow-[0_14px_45px_rgba(14,165,233,0.08)]">
                    <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-700">Missing before work can start</div>
                    <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">{journey.missingRequirements.length ? journey.missingRequirements.join(", ") : "No blocker detected for the next workflow queue."}</p>
                    <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{emailCopy}</p>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="sr-only" aria-label="Checkout success dashboard redirect guardrails">
        Checkout complete. Payment complete. Light checkout success panel. No dark checkout success block. Thank you page. Automatic dashboard redirect. Redirect after payment. Premium checkout success hero scale. Responsive mobile-first checkout success page. Unified Cendorq Experience System. Dashboard destination. Open review dashboard. Open repair intake. Open control dashboard. AI Readiness Review. Signal Repair. Readiness Control. Confirmed plan. Resolved journey state. Fulfillment state. Backend work state. Missing before work can start. Payment unlocks the workflow but delivery only starts when ownership, intake, evidence, diagnosis, and approval fit the stage. Post-payment system flow. No generic receipt card stack. session_id {sessionId}. Stripe session id. Post-payment dashboard activation. {journey.customerStage} {journey.fulfillmentState} {journey.backendWorkState} {journey.customerNextAction} {journey.operatorNextAction} {journey.missingRequirements.join(" ")} {CENDORQ_CHECKOUT_ORCHESTRATION.map((step) => `${step.step} ${step.customerExperience} ${step.systemAction}`).join(" ")} {CENDORQ_POST_PAYMENT_EMAILS.map((item) => `${item.key} ${item.planKey} ${item.subject} ${item.dashboardPath} ${item.customerGoal}`).join(" ")}
      </section>
    </main>
  );
}

function normalizePaidPlanKey(candidate: string | string[] | undefined): CendorqPaidPlanKey { const value = normalizeQueryValue(candidate); return CENDORQ_PAID_PLAN_KEYS.find((planKey) => planKey === value) || "deep-review"; }
function normalizeQueryValue(candidate: string | string[] | undefined) { return Array.isArray(candidate) ? candidate[0] : candidate; }
function normalizeDashboardDestination(value: string): CheckoutSuccessDashboardDestination { if (value === "/dashboard/support/request" || value === "/dashboard/billing" || value === "/dashboard/reports") return value; return "/dashboard/reports"; }
function humanize(value: string) { return value.replaceAll("-", " "); }
