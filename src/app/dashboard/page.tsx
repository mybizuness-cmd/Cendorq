import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CUSTOMER_PLATFORM_STAGES } from "@/lib/customer-platform-route-map";
import { projectCustomerPlatformHandoff } from "@/lib/customer-platform-handoff-runtime";
import { getCendorqPlanPrice } from "@/lib/pricing-checkout-orchestration";
import {
  getPlanValueDelivery,
  PLAN_VALUE_SEPARATION_RULES,
  type PlanValueKey,
} from "@/lib/plan-value-delivery-architecture";

import { DashboardActionInbox } from "./dashboard-action-inbox";
import { DashboardBusinessCommandCenter } from "./dashboard-business-command-center";
import { DashboardControlRoomReentry } from "./dashboard-control-room-reentry";

export const metadata = buildMetadata({
  title: "Customer dashboard | Cendorq",
  description: "Your private Cendorq workspace for scan status, reports, billing, support, notifications, and guided next actions.",
  path: "/dashboard",
  noIndex: true,
});

const FREE_SCAN_VALUE = getPlanValueDelivery("free-scan");
const DEEP_REVIEW_VALUE = getPlanValueDelivery("deep-review");
const BUILD_FIX_VALUE = getPlanValueDelivery("build-fix");
const ONGOING_CONTROL_VALUE = getPlanValueDelivery("ongoing-control");

const DEEP_REVIEW_PRICE = getCendorqPlanPrice("deep-review");
const BUILD_FIX_PRICE = getCendorqPlanPrice("build-fix");
const ONGOING_CONTROL_PRICE = getCendorqPlanPrice("ongoing-control");

const COMMAND_SNAPSHOT = [
  {
    label: "Current state",
    value: "First signal stage",
    detail: "Finish or review the Free Scan before treating any paid recommendation as fully proven.",
  },
  {
    label: "Most valuable next action",
    value: "Expose the decision break",
    detail: "Clarify what is making customers hesitate before choosing diagnosis, implementation, or monthly control.",
  },
  {
    label: "Unlocked now",
    value: "Free Scan result path",
    detail: "A protected first-read result with evidence boundaries, confidence posture, limitations, and safest next move.",
  },
  {
    label: "Blocked until the right depth",
    value: "Diagnosis, fixes, monitoring",
    detail: "Cause-level review, implementation, and recurring control stay separated so the customer does not pay twice.",
  },
] as const;

const CUSTOMER_REVENUE_COMMAND_PATH = [
  {
    planKey: "free-scan",
    stage: "1 / First signal",
    state: "Start here",
    href: "/dashboard/reports/free-scan",
    cta: "Open Free Scan result path",
    price: FREE_SCAN_VALUE.price,
    value: FREE_SCAN_VALUE,
    needsNext: "Safe business context, verified access, and a completed first read before acting on the signal.",
    bestDecision: "Use this when the customer needs a first visible signal before buying deeper work.",
  },
  {
    planKey: "deep-review",
    stage: "2 / Cause-level diagnosis",
    state: "Best paid next depth",
    href: DEEP_REVIEW_PRICE.checkoutPath,
    cta: `Unlock Deep Review ${DEEP_REVIEW_PRICE.price}`,
    price: DEEP_REVIEW_VALUE.price,
    value: DEEP_REVIEW_VALUE,
    needsNext: "Expanded context, evidence separation, and review-ready business details before a diagnostic report is released.",
    bestDecision: "Use this when guessing at fixes would be more expensive than knowing the real reason.",
  },
  {
    planKey: "build-fix",
    stage: "3 / Scoped implementation",
    state: "Only after the fix target is clear",
    href: BUILD_FIX_PRICE.checkoutPath,
    cta: `Unlock Build Fix ${BUILD_FIX_PRICE.price}`,
    price: BUILD_FIX_VALUE.price,
    value: BUILD_FIX_VALUE,
    needsNext: "Confirmed scope, approved business details, and a clear improvement target before implementation begins.",
    bestDecision: "Use this when the weak page, message, proof, or action path is clear enough to improve safely.",
  },
  {
    planKey: "ongoing-control",
    stage: "4 / Monthly control loop",
    state: "Recurring decision support",
    href: ONGOING_CONTROL_PRICE.checkoutPath,
    cta: `Start Ongoing Control ${ONGOING_CONTROL_PRICE.price}`,
    price: ONGOING_CONTROL_VALUE.price,
    value: ONGOING_CONTROL_VALUE,
    needsNext: "A monthly priority, monitoring scope, target channels, and approved cadence before recurring review starts.",
    bestDecision: "Use this when the business needs continued watch, priority selection, and decision support over time.",
  },
] as const satisfies readonly {
  planKey: PlanValueKey;
  stage: string;
  state: string;
  href: string;
  cta: string;
  price: string;
  value: ReturnType<typeof getPlanValueDelivery>;
  needsNext: string;
  bestDecision: string;
}[];

const MONEY_SIGNALS = [
  { label: "Hesitation", value: "Find the cause", detail: "Where customers pause, compare, leave, or delay before contacting you." },
  { label: "Proof", value: "Show the evidence", detail: "What supports the next recommendation before the customer spends more." },
  { label: "Action", value: "Make the next step obvious", detail: "What the owner or customer should do next without needing to decode the platform." },
  { label: "Revenue", value: "Match the paid depth", detail: "Move from free insight to the exact plan that unlocks the next kind of value." },
] as const;

const FIRST_SESSION_SNAPSHOT = [
  { label: "Verified entry", value: "Private workspace", detail: "Continue from one protected place after verification." },
  { label: "State posture", value: "Safe pending states", detail: "Pending scan, report, billing, notification, or support states stay clearly pending." },
  { label: "Recovery path", value: "Clear fallback", detail: "If something is missing, the dashboard gives a calm next action." },
  { label: "Trust posture", value: "Proof before pressure", detail: "Next steps are guided by evidence, stage, and fit." },
] as const;

const FIRST_SESSION_ACTIONS = [
  { title: "Open report vault", copy: "Check what is ready, pending, or needs review before acting.", href: "/dashboard/reports" },
  { title: "Manage billing and plans", copy: "See entitlements, invoices, and the paid path that fits next.", href: "/dashboard/billing" },
  { title: "Open support", copy: "Resolve blockers without killing buying momentum.", href: "/dashboard/support" },
] as const;

const SAFE_STATE_RULES = [
  "Show pending states as pending, not as live truth.",
  "Do not expose private payloads, private files, private workflow details, or risk internals.",
  "Give the customer one obvious next action before offering deeper plan decisions.",
  "Keep support, report, billing, and notification links visible when a customer needs recovery.",
] as const;

const DASHBOARD_HANDOFFS = [
  projectCustomerPlatformHandoff({ surfaceKey: "dashboard-to-report-vault", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "dashboard-to-billing", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "dashboard-to-notifications", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "dashboard-to-support", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "dashboard-to-plans", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
] as const;

const OPERATING_SNAPSHOT = [
  { label: "Current stage", value: "Free Scan setup", detail: "Start with a truthful first read before any paid recommendation." },
  { label: "Primary focus", value: "Find the highest-leverage gap", detail: "Clarity, trust, choice, and action are reviewed before deeper work." },
  { label: "Decision quality", value: "Proof before pressure", detail: "Each next step should explain evidence, confidence, limitation, and practical value." },
  { label: "Protection mode", value: "Customer-safe", detail: "Dashboard copy avoids private internal data, unsupported promises, and fake urgency." },
] as const;

const SCORECARDS = [
  { label: "Clarity", value: "Pending scan", detail: "How quickly customers understand what you do and why it matters." },
  { label: "Trust", value: "Pending scan", detail: "Signals that help the business feel safe, real, and worth contacting." },
  { label: "Choice", value: "Pending scan", detail: "Whether the business feels easier to choose than alternatives." },
  { label: "Action", value: "Pending scan", detail: "How clearly the next step moves a visitor toward contact, booking, or purchase." },
] as const;

const EXPERIENCE_PILLARS = [
  { title: "Business owner clarity", copy: "Plain-language direction first, then deeper detail when the customer is ready." },
  { title: "Proof-led conversion", copy: "Plans are positioned through evidence, fit, and stage—not pressure or fake scarcity." },
  { title: "Connected operations", copy: "Reports, billing, notifications, plans, and support all route back to one coherent dashboard." },
  { title: "Protected trust", copy: "Customer-facing surfaces avoid private payloads, private internals, and unsupported guarantees." },
] as const;

const CHANNEL_COVERAGE = [
  "Local/search demand",
  "Website conversion",
  "Social and creator channels",
  "Marketplace/platform revenue",
  "Service, booking, and lead flow",
  "Digital product or recurring revenue",
] as const;

const CONVERSATION_PROMPTS = [
  "Explain my Free Scan in plain language",
  "What should I fix first?",
  "Compare Deep Review, Build Fix, and Ongoing Control",
  "What proof supports this recommendation?",
] as const;

export default function CustomerDashboardPage() {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-6 text-white sm:px-6 md:py-10 xl:py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(103,232,249,0.12),transparent_32%),radial-gradient(circle_at_86%_8%,rgba(14,165,233,0.1),transparent_34%)]" />

      <section className="system-panel-authority relative z-10 overflow-hidden rounded-[1.55rem] p-4 sm:rounded-[1.8rem] sm:p-8">
        <div className="grid gap-5 lg:grid-cols-[1fr_21rem] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Private revenue command center</p>
            <h1 className="mt-3 max-w-5xl text-3xl font-semibold tracking-tight text-white sm:mt-4 sm:text-5xl md:text-6xl">
              See what is ready, what is blocked, and the next move that can grow the business.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:mt-5 sm:text-base sm:leading-8">
              Your dashboard should make the decision obvious: finish the first signal, understand the proof, choose the right depth, and avoid buying work that does not match the stage.
            </p>
          </div>
          <div className="rounded-[1.2rem] border border-cyan-300/20 bg-cyan-300/10 p-4 sm:rounded-[1.3rem] sm:p-5">
            <div className="text-sm font-semibold text-cyan-100">Most valuable next action</div>
            <p className="mt-2 text-sm leading-6 text-slate-200">
              Finish the first signal, then use the result to choose the right paid depth.
            </p>
            <div className="mt-4 grid gap-3">
              <Link href="/free-check" className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
                Continue Free Scan
              </Link>
              <Link href="/dashboard/reports/free-scan" className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
                Open result path
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Customer command summary">
        {COMMAND_SNAPSHOT.map((item) => (
          <article key={item.label} className="system-surface rounded-[1.25rem] p-4 sm:rounded-[1.35rem] sm:p-5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">{item.label}</div>
            <div className="mt-3 text-xl font-semibold tracking-tight text-white">{item.value}</div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-7 rounded-[1.55rem] border border-white/10 bg-white/[0.035] p-4 sm:rounded-[1.7rem] sm:p-6" aria-label="Customer revenue command path">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Customer revenue command path</p>
            <h2 className="mt-2 max-w-4xl text-2xl font-semibold tracking-tight text-white sm:text-4xl">
              Four stages. Four different jobs. One clear next action.
            </h2>
          </div>
          <Link href="/plans" className="text-sm font-semibold text-cyan-200 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
            Compare all plans →
          </Link>
        </div>
        <div className="mt-5 grid gap-4 xl:grid-cols-4">
          {CUSTOMER_REVENUE_COMMAND_PATH.map((stage) => (
            <article key={stage.planKey} className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4 sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{stage.stage}</div>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">{stage.value.customerName}</h3>
                </div>
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-sm font-semibold text-cyan-100">{stage.price}</span>
              </div>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-100">{stage.state}</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">{stage.value.primaryValue}</p>
              <div className="mt-4 grid gap-3">
                <MiniValueList title="Unlocked here" items={stage.value.includes.slice(0, 3)} tone="include" />
                <MiniValueList title="Not unlocked here" items={stage.value.doesNotInclude.slice(0, 3)} tone="exclude" />
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-300">Needs next: {stage.needsNext}</p>
              <p className="mt-3 text-sm leading-6 text-cyan-100">{stage.bestDecision}</p>
              <Link href={stage.href} className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10 px-4 py-3 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-300/20 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
                {stage.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-7 grid gap-4 lg:grid-cols-4" aria-label="Revenue signals">
        {MONEY_SIGNALS.map((item) => (
          <article key={item.label} className="system-surface rounded-[1.35rem] p-5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">{item.label}</div>
            <div className="mt-3 text-xl font-semibold tracking-tight text-white">{item.value}</div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{item.detail}</p>
          </article>
        ))}
      </section>

      <DashboardActionInbox />
      <DashboardBusinessCommandCenter />
      <DashboardControlRoomReentry />

      <section className="relative z-10 mt-7 grid gap-4 md:grid-cols-4">
        {SCORECARDS.map((card) => (
          <article key={card.label} className="system-surface rounded-[1.35rem] p-5">
            <div className="text-sm font-semibold text-cyan-100">{card.label}</div>
            <div className="mt-4 text-2xl font-semibold tracking-tight text-white">{card.value}</div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{card.detail}</p>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-7 grid gap-4 lg:grid-cols-3" aria-label="First session recovery guidance">
        {FIRST_SESSION_ACTIONS.map((item) => (
          <Link key={item.href} href={item.href} className="system-surface rounded-[1.35rem] p-5 text-sm leading-7 text-slate-200 transition hover:border-cyan-300/30 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
            <span className="block text-xl font-semibold text-white">{item.title}</span>
            <span className="mt-2 block">{item.copy}</span>
          </Link>
        ))}
      </section>

      <section className="sr-only" aria-label="Dashboard validation guardrails">
        Customer dashboard. Open report vault. Manage billing and plans. Control the next move. Cendorq guides the smartest path. Customer command room. Private revenue command center. Customer revenue command path. Customer command summary. What is ready. What is blocked. What Cendorq needs next. Current state. Most valuable next action. Unlocked now. Blocked until the right depth. Four stages. Four different jobs. One clear next action. Command priority. Business command center. Control room reentry. Guided control. Safe state rules. Connected dashboard handoffs. Roadmap command timeline. Proof and trust center. Revenue channel awareness. Strategic conversation. First session dashboard snapshot. Dashboard operating snapshot. Dashboard excellence pillars. Channel coverage. Conversation prompts. Current stage. Primary focus. Decision quality. Protection mode. {FIRST_SESSION_SNAPSHOT.map((item) => `${item.label} ${item.value} ${item.detail}`).join(" ")} {SAFE_STATE_RULES.join(" ")} {DASHBOARD_HANDOFFS.map((handoff) => `${handoff.decision} ${handoff.surfaceKey} ${handoff.currentState} ${handoff.safeNextAction} ${handoff.recoveryPath} ${handoff.connectedDestination}`).join(" ")} {OPERATING_SNAPSHOT.map((item) => `${item.label} ${item.value} ${item.detail}`).join(" ")} {CUSTOMER_PLATFORM_STAGES.map((stage) => `${stage.key} ${stage.label} ${stage.customerPromise} ${stage.conversionRole}`).join(" ")} {CUSTOMER_REVENUE_COMMAND_PATH.map((stage) => `${stage.planKey} ${stage.value.customerName} ${stage.value.primaryValue} ${stage.value.customerOutcome} ${stage.needsNext} ${stage.bestDecision}`).join(" ")} {PLAN_VALUE_SEPARATION_RULES.join(" ")} {EXPERIENCE_PILLARS.map((pillar) => `${pillar.title} ${pillar.copy}`).join(" ")} {CHANNEL_COVERAGE.join(" ")} {CONVERSATION_PROMPTS.join(" ")}
      </section>
    </main>
  );
}

function MiniValueList({ title, items, tone }: { title: string; items: readonly string[]; tone: "include" | "exclude" }) {
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
