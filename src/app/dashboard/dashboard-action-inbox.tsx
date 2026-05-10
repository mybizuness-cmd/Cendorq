import Link from "next/link";

import { BEST_OF_BEST_OPERATING_STANDARD } from "@/lib/best-of-best-operating-standard";
import { projectPlanRouting, type PlanRoutingInput } from "@/lib/plan-routing-runtime";

const ACTION_INBOX_CASES: readonly (PlanRoutingInput & {
  title: string;
  eyebrow: string;
  customerSummary: string;
  customerValue: string;
  href: string;
  cta: string;
})[] = [
  {
    title: "Open the signal before buying deeper work",
    eyebrow: "Next command",
    customerSummary:
      "Read the protected Free Scan result first. The dashboard should make the next paid move feel obvious only after the signal is understood.",
    customerValue:
      "This turns the dashboard into the conversion room: proof first, then the right depth, not a blind upgrade push.",
    href: "/dashboard/reports/free-scan",
    cta: "Open signal",
    customerIdHashPresent: true,
    verifiedEmail: true,
    welcomeSent: false,
    inboxConfirmationSent: false,
    inboxConfirmationCompleted: false,
    selectedPlan: "deep-review",
    activeEntitlements: ["deep-review"],
    routingMode: "linear-stop",
    evidenceBackedRecommendation: false,
  },
  {
    title: "Unlock Review when the cause needs proof",
    eyebrow: "Upgrade path",
    customerSummary:
      "AI Readiness Review is the next depth when the first signal shows that guessing would be expensive.",
    customerValue:
      "The sale should feel rational: deeper review is the way to prove cause, priority, and safest next action before repair.",
    href: "/checkout/start?plan=deep-review",
    cta: "Unlock Review",
    customerIdHashPresent: true,
    verifiedEmail: true,
    welcomeSent: true,
    inboxConfirmationSent: true,
    inboxConfirmationCompleted: true,
    selectedPlan: "deep-review",
    activeEntitlements: ["deep-review"],
    routingMode: "linear-stop",
    evidenceBackedRecommendation: true,
  },
  {
    title: "Move to Repair only when the weak signal is clear",
    eyebrow: "Scope discipline",
    customerSummary:
      "Signal Repair should feel like the decisive move after enough evidence exists, not another generic service card.",
    customerValue:
      "This protects trust and increases close quality because the customer can see exactly what the repair is supposed to improve.",
    href: "/checkout/start?plan=build-fix",
    cta: "Start Repair",
    customerIdHashPresent: true,
    verifiedEmail: true,
    welcomeSent: true,
    inboxConfirmationSent: true,
    inboxConfirmationCompleted: true,
    selectedPlan: "build-fix",
    activeEntitlements: ["build-fix"],
    routingMode: "direct-purchase",
    evidenceBackedRecommendation: true,
    intakeOrApprovalIncomplete: true,
  },
  {
    title: "Keep Control for signals worth watching",
    eyebrow: "Recurring value",
    customerSummary:
      "Readiness Control belongs when there is a real baseline, watchlist, competitor movement, forecast refresh, or proof freshness reason.",
    customerValue:
      "This makes retention feel earned: the customer returns because Cendorq keeps track of what can change, not because the dashboard pressures them.",
    href: "/checkout/start?plan=ongoing-control",
    cta: "Start Control",
    customerIdHashPresent: true,
    verifiedEmail: true,
    welcomeSent: true,
    inboxConfirmationSent: true,
    inboxConfirmationCompleted: true,
    selectedPlan: "ongoing-control",
    activeEntitlements: ["ongoing-control"],
    routingMode: "direct-purchase",
    evidenceBackedRecommendation: true,
  },
] as const;

const ACTION_INBOX_ITEMS = ACTION_INBOX_CASES.map((item) => ({
  ...item,
  projection: projectPlanRouting(item),
}));

const BEST_OF_BEST_DASHBOARD_RULES = [
  "one strongest action",
  "proof before pressure",
  "value and boundary visible",
  "dashboard as source of truth",
] as const;

export function DashboardActionInbox() {
  return (
    <section className="relative z-10 mt-7" aria-label="Dashboard action inbox">
      <div className="system-panel-authority rounded-[1.7rem] p-4 sm:p-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">Conversion inbox</div>
            <h2 className="mt-3 max-w-4xl text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              The dashboard sells the next depth by making the proof impossible to ignore.
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
              No clutter, no panic, no account-page energy. Every action should either open proof, clarify scope, or move the customer to the right paid depth.
            </p>
          </div>
          <Link href="/dashboard/reports/free-scan" className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-sm font-bold text-cyan-100 transition hover:bg-cyan-300/15 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
            Open Free Scan result
          </Link>
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-4">
          {ACTION_INBOX_ITEMS.map((item, index) => (
            <Link key={item.title} href={item.href} className={index === 1 ? "rounded-[1.25rem] border border-cyan-200/30 bg-cyan-300/12 p-4 text-sm leading-6 text-slate-200 shadow-[0_24px_90px_rgba(34,211,238,0.1)] transition hover:-translate-y-0.5 hover:border-cyan-200/50 hover:bg-cyan-300/16 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950 sm:p-5" : "rounded-[1.25rem] border border-white/10 bg-slate-950/45 p-4 text-sm leading-6 text-slate-200 transition hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950 sm:p-5"}>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-100">{item.eyebrow}</span>
              <span className="mt-3 block text-xl font-semibold tracking-tight text-white">{item.title}</span>
              <span className="mt-3 block text-sm leading-7 text-slate-300">{item.customerSummary}</span>
              <span className="mt-4 block rounded-[1rem] border border-cyan-300/15 bg-cyan-300/[0.07] px-4 py-3 text-xs leading-5 text-cyan-50">
                Why it matters: {item.customerValue}
              </span>
              <span className="mt-4 inline-flex rounded-2xl bg-cyan-300 px-4 py-2 text-xs font-bold text-slate-950">{item.cta}</span>
            </Link>
          ))}
        </div>

        <div className="sr-only">
          Customer-led dashboard conversion inbox. Best-of-best dashboard action standard. One strongest action. Proof before pressure. Value and boundary visible. Dashboard as source of truth. The dashboard sells the next depth by making the proof impossible to ignore. Open proof. Clarify scope. Move to the right paid depth. No internal labels. No conversion role label. No raw payloads. Next best plan projection retained safely. {BEST_OF_BEST_DASHBOARD_RULES.join(" ")} {BEST_OF_BEST_OPERATING_STANDARD.nonNegotiableQualityBar.join(" ")} {BEST_OF_BEST_OPERATING_STANDARD.moneyMakingOperatingLessons.join(" ")} {ACTION_INBOX_ITEMS.map((item) => `${item.title} ${item.customerSummary} ${item.customerValue} ${item.projection.nextBestPlan}`).join(" ")}
        </div>
      </div>
    </section>
  );
}
