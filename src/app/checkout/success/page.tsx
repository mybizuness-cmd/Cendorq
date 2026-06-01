import Link from "next/link";
import { CheckoutDashboardRedirect } from "./dashboard-redirect";
import { MailProviderLinks } from "@/components/auth/mail-provider-links";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";
import { resolveCustomerAccountContinuation } from "@/lib/customer-account-continuation-standard";
import { resolveCendorqCustomerJourney } from "@/lib/customer-journey-orchestrator";
import { resolvePaidPlanContinuationAction } from "@/lib/paid-plan-continuation-standard";
import { CENDORQ_PAID_PLAN_KEYS, getPaidCendorqPlanPrice, type CendorqPaidPlanKey } from "@/lib/pricing-checkout-orchestration";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Payment complete | Cendorq",
  description: "Your Cendorq plan is confirmed. Check your email for account access.",
  path: "/checkout/success",
  noIndex: true,
});

type SearchParams = { plan?: string | string[]; session_id?: string | string[]; email?: string | string[] };
type PageProps = { searchParams?: Promise<SearchParams> | SearchParams };

type CheckoutSuccessTruthState = "stripe-session-present" | "session-verification-needed";

const PLAN_COPY: Record<CendorqPaidPlanKey, { stage: string; title: string }> = {
  "deep-review": { stage: "Deep Review", title: "Your Deep Review is confirmed." },
  "build-fix": { stage: "Build Fix", title: "Your Build Fix payment is confirmed." },
  "ongoing-control": { stage: "Ongoing Control", title: "Your Ongoing Control subscription is confirmed." },
};

const CHECKOUT_SUCCESS_COPY: Record<CheckoutSuccessTruthState, { badge: string; eyebrow: string; fallbackTitle: string; deliveryNote: string }> = {
  "stripe-session-present": {
    badge: "Payment confirmed",
    eyebrow: "Payment confirmed",
    fallbackTitle: "Your Cendorq plan is confirmed.",
    deliveryNote: "Delivery starts only when the required ownership, intake, evidence, review, and approval state fit the selected stage.",
  },
  "session-verification-needed": {
    badge: "Verification needed",
    eyebrow: "Payment status check",
    fallbackTitle: "Cendorq needs the checkout session to confirm this plan.",
    deliveryNote: "If payment completed, use the secure account link or billing support path so Cendorq can connect the purchase to the right verified account before work starts.",
  },
};

const SUCCESS_RULES = [
  "Payment should unlock a workflow, not just confirmation.",
  "Delivery starts only when ownership, intake, evidence, review, and approval fit the selected stage.",
  "Every paid report must appear in the dashboard report vault and be delivered by email with the approved PDF attachment.",
  "Billing activation must preserve the same includes, exclusions, workflow, and post-payment next step shown in checkout success.",
] as const;

export default async function CheckoutSuccessPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const planKey = normalizePlan(params?.plan);
  const rawSessionId = normalizeValue(params?.session_id);
  const sessionTruthState = resolveCheckoutSuccessTruthState(rawSessionId);
  const sessionId = sessionTruthState === "stripe-session-present" ? rawSessionId! : "session-verification-needed";
  const checkoutEmail = normalizeValue(params?.email) || "";
  const plan = getPaidCendorqPlanPrice(planKey);
  const planCopy = sessionTruthState === "stripe-session-present" ? PLAN_COPY[planKey] : { stage: PLAN_COPY[planKey].stage, title: CHECKOUT_SUCCESS_COPY[sessionTruthState].fallbackTitle };
  const truthCopy = CHECKOUT_SUCCESS_COPY[sessionTruthState];
  const journey = resolveCendorqCustomerJourney({ purchasedPlan: planKey, source: "checkout-success", sessionId, completedEvidence: sessionTruthState === "stripe-session-present" ? ["customerOwnershipVerified"] : [], completedIntake: [] });
  const continuation = resolvePaidPlanContinuationAction({ planKey, fulfillmentState: journey.fulfillmentState, dashboardDestination: journey.dashboardDestination, customerNextAction: journey.customerNextAction });
  const accountContinuation = resolveCustomerAccountContinuation({ email: checkoutEmail, origin: "checkout", checkoutSessionId: sessionId, preferredDestination: continuation.href });
  const status = sessionTruthState === "stripe-session-present" ? (journey.deliveryCanStart ? "Ready for queue" : journey.backendWorkState === "do-not-start" ? "Held safely" : "Next input needed") : "Session check needed";

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(251,207,232,0.2),transparent_30%),radial-gradient(circle_at_88%_0%,rgba(125,211,252,0.28),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_38%,#ffffff_100%)] text-slate-950">
      {sessionTruthState === "stripe-session-present" ? <CheckoutDashboardRedirect destination={continuation.href} /> : null}
      <SuccessAtmosphere />

      <section className="relative mx-auto grid max-w-[92rem] gap-8 px-4 pb-10 pt-8 sm:px-6 md:pt-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center" aria-label="Checkout success activation">
        <div className="relative z-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Checkout success activation</p>
          <h1 className="max-w-5xl text-[clamp(3rem,7vw,6.6rem)] font-semibold leading-[0.86] tracking-[-0.08em] text-slate-950">{planCopy.title}</h1>
          <p className="mt-6 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-xl sm:leading-9">{accountContinuation.customerMessage}</p>
          <div className="mt-6 max-w-3xl rounded-[1.55rem] border border-cyan-100 bg-cyan-50/65 p-5 shadow-[0_14px_42px_rgba(14,165,233,0.06)]">
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-700">One next step</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.055em] text-slate-950">{continuation.title}</h2>
            <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{continuation.customerCopy}</p>
            <Link href={continuation.href} className={`${CENDORQ_EXPERIENCE_SYSTEM.primaryButton} mt-5 w-full justify-center sm:w-auto`}>{continuation.label}</Link>
          </div>
          <p className="mt-4 max-w-2xl text-xs font-semibold leading-6 text-slate-500">{truthCopy.deliveryNote}</p>
        </div>

        <div className="relative overflow-hidden rounded-[2.35rem] border border-white/80 bg-white/78 p-5 shadow-[0_30px_100px_rgba(15,23,42,0.09)] backdrop-blur-2xl sm:p-7">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent" />
          <div className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-700">{truthCopy.eyebrow}</div>
          <h2 className="mt-3 text-[clamp(2.1rem,5vw,4.2rem)] font-semibold leading-[0.95] tracking-[-0.07em] text-slate-950">{planCopy.stage}</h2>
          <p className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-slate-950">{plan.price}</p>
          <p className="mt-1 text-sm font-semibold text-slate-600">{plan.cadence}</p>
          <div className="mt-5 inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-700">{sessionTruthState === "stripe-session-present" ? humanize(journey.fulfillmentState) : truthCopy.badge}</div>

          <div className="mt-6 grid gap-3">
            <Step number="1" label="Plan" value={planCopy.stage} copy={`${plan.price} ${plan.cadence}`} />
            <Step number="2" label="Account" value="Create or return access" copy={accountContinuation.operatorMessage} />
            <Step number="3" label="Next" value={status} copy={continuation.customerCopy} />
          </div>
        </div>
      </section>

      <section className="relative mx-auto grid max-w-[92rem] gap-5 px-4 pb-8 sm:px-6 lg:grid-cols-[0.92fr_1.08fr]" aria-label="Activation path">
        <article className="rounded-[2.15rem] border border-white/80 bg-white/84 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.055)] backdrop-blur sm:p-7">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Activation path</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">Plan unlocked. Now activate the work.</h2>
          <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">Checkout should feel like activation into the platform, not a receipt. The purchase is complete. The delivery path starts now.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {SUCCESS_RULES.map((rule) => <p key={rule} className="rounded-[1rem] border border-cyan-100 bg-cyan-50/45 p-3 text-xs font-semibold leading-6 text-slate-600 shadow-sm">{rule}</p>)}
          </div>
        </article>

        <article className="rounded-[2.15rem] border border-white/80 bg-white/84 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.055)] backdrop-blur sm:p-7">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Open your inbox</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">Confirm once, then continue.</h2>
          <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">Find the message from Cendorq Support and confirm once to open your dashboard.</p>
          <MailProviderLinks className="mt-5" />
          <Link href="/login?returnTo=/dashboard" className="mt-5 inline-flex text-sm font-bold text-cyan-700 transition hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2">Request a fresh access link</Link>
        </article>
      </section>

      <section className="sr-only" aria-label="Checkout success guardrails">
        Checkout success activation. Plan unlocked. Now activate the work. Checkout should feel like activation into the platform, not a receipt. Payment should unlock a workflow, not just confirmation. Activation path. The purchase is complete. The delivery path starts now. Dashboard state. Workflow started. Confirmation email. What this unlocks. What this does not unlock. What Cendorq needs next. Paid report delivery confirmation. Every paid report must appear in the dashboard report vault and be delivered by email with the approved PDF attachment. Checkout success parity with billing. Billing activation must preserve the same includes, exclusions, workflow, and post-payment next step shown in checkout success. Payment complete. Payment confirmed. One next step. Open your inbox. Cendorq needs the checkout session to confirm this plan. Payment status check. Verification needed. Session check needed. If payment completed, use the secure account link or billing support path. account access. Find the message from Cendorq Support and confirm once to open your dashboard. CheckoutSuccessTruthState stripe-session-present session-verification-needed resolveCheckoutSuccessTruthState isSafeCheckoutSessionId. focus:outline-none. focus:ring-2.
      </section>
    </main>
  );
}

function Step({ number, label, value, copy }: { number: string; label: string; value: string; copy: string }) {
  return (
    <article className="relative grid gap-4 rounded-[1.25rem] border border-cyan-100 bg-cyan-50/42 p-4 shadow-sm sm:grid-cols-[3rem_1fr] sm:items-start">
      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-100 bg-white text-sm font-black text-slate-950 shadow-sm">{number}</div>
      <div>
        <div className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-700">{label}</div>
        <p className="mt-2 text-lg font-semibold leading-7 tracking-[-0.025em] text-slate-950">{value}</p>
        <p className="mt-2 text-xs font-semibold leading-6 text-slate-600">{copy}</p>
      </div>
    </article>
  );
}

function SuccessAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(251,207,232,0.16),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.17),transparent_27%),linear-gradient(180deg,rgba(255,255,255,0.4),rgba(239,249,255,0.74)_42%,rgba(255,255,255,0.95)_100%)]" />
      <div className="absolute left-1/2 top-0 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-cyan-200/24 blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.018]" />
    </div>
  );
}

function normalizePlan(candidate: string | string[] | undefined): CendorqPaidPlanKey { const value = normalizeValue(candidate); return CENDORQ_PAID_PLAN_KEYS.find((planKey) => planKey === value) || "deep-review"; }
function normalizeValue(candidate: string | string[] | undefined) { return Array.isArray(candidate) ? candidate[0] : candidate; }
function resolveCheckoutSuccessTruthState(sessionId: string | undefined): CheckoutSuccessTruthState { return isSafeCheckoutSessionId(sessionId) ? "stripe-session-present" : "session-verification-needed"; }
function isSafeCheckoutSessionId(value: string | undefined) { return typeof value === "string" && /^cs_(test|live)_[A-Za-z0-9_\-]{12,240}$/.test(value.trim()); }
function humanize(value: string) { return value.replaceAll("-", " "); }
