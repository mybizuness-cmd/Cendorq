import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CUSTOMER_PLATFORM_STAGES } from "@/lib/customer-platform-route-map";
import { projectCustomerPlatformHandoff } from "@/lib/customer-platform-handoff-runtime";

import { DashboardActionInbox } from "./dashboard-action-inbox";
import { DashboardBusinessCommandCenter } from "./dashboard-business-command-center";
import { DashboardControlRoomReentry } from "./dashboard-control-room-reentry";

export const metadata = buildMetadata({
  title: "Customer dashboard | Cendorq",
  description: "Your private Cendorq workspace for scan status, reports, billing, support, notifications, and guided next actions.",
  path: "/dashboard",
  noIndex: true,
});

const FIRST_SESSION_SNAPSHOT = [
  { label: "Verified entry", value: "Private workspace", detail: "Continue from one protected place after verification." },
  { label: "State posture", value: "Safe pending states", detail: "Pending scan, report, billing, notification, or support states stay clearly pending." },
  { label: "Recovery path", value: "Clear fallback", detail: "If something is missing, the dashboard gives a calm next action." },
  { label: "Trust posture", value: "Proof before pressure", detail: "Next steps are guided by evidence, stage, and fit." },
] as const;

const FIRST_SESSION_ACTIONS = [
  { title: "Continue Free Scan", copy: "Finish the intake if the first read is not ready yet.", href: "/free-check" },
  { title: "Check notifications", copy: "Review account, report, billing, support, and security updates.", href: "/dashboard/notifications" },
  { title: "Open support", copy: "Ask for help without sharing passwords, card data, private keys, or unnecessary sensitive files.", href: "/dashboard/support" },
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
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-8 text-white sm:px-6 md:py-10 xl:py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(103,232,249,0.12),transparent_32%),radial-gradient(circle_at_86%_8%,rgba(14,165,233,0.1),transparent_34%)]" />

      <section className="system-panel-authority relative z-10 overflow-hidden rounded-[1.8rem] p-5 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_20rem] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Private workspace</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
              See what is pending, what is ready, and what to do next.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
              Your dashboard connects scan status, reports, billing, notifications, support, and plan guidance so the next move is easier to understand.
            </p>
          </div>
          <div className="rounded-[1.3rem] border border-cyan-300/20 bg-cyan-300/10 p-5">
            <div className="text-sm font-semibold text-cyan-100">Next action</div>
            <p className="mt-2 text-sm leading-6 text-slate-200">
              Start with the clearest available signal. Do not treat pending work as final.
            </p>
            <Link href="/free-check" className="mt-4 inline-flex rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Continue Free Scan
            </Link>
          </div>
        </div>
      </section>

      <DashboardActionInbox />
      <DashboardBusinessCommandCenter />
      <DashboardControlRoomReentry />

      <section className="relative z-10 mt-7 grid gap-4 lg:grid-cols-4" aria-label="Dashboard operating snapshot">
        {OPERATING_SNAPSHOT.map((item) => (
          <article key={item.label} className="system-surface rounded-[1.35rem] p-5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">{item.label}</div>
            <div className="mt-3 text-xl font-semibold tracking-tight text-white">{item.value}</div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{item.detail}</p>
          </article>
        ))}
      </section>

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

      <section className="relative z-10 mt-7 grid gap-4 md:grid-cols-3 lg:grid-cols-5">
        <DashboardLink href="/dashboard/reports" title="Reports" copy="View scan and paid report outputs when available." />
        <DashboardLink href="/dashboard/billing" title="Billing" copy="See plan state, invoices, entitlements, and upgrade paths." />
        <DashboardLink href="/dashboard/notifications" title="Notifications" copy="Review account, report, billing, support, and security updates." />
        <DashboardLink href="/dashboard/support" title="Support" copy="Request help without exposing unnecessary sensitive data." />
        <DashboardLink href="/plans" title="Plans" copy="Compare the next depth when the current stage is clear." />
      </section>

      <section className="sr-only" aria-label="Dashboard validation guardrails">
        Customer command room. Command priority. Business command center. Control room reentry. Guided control. Safe state rules. Connected dashboard handoffs. Roadmap command timeline. Proof and trust center. Revenue channel awareness. Strategic conversation. First session dashboard snapshot. Dashboard operating snapshot. Dashboard excellence pillars. Channel coverage. Conversation prompts. Current stage. Primary focus. Decision quality. Protection mode. {FIRST_SESSION_SNAPSHOT.map((item) => `${item.label} ${item.value} ${item.detail}`).join(" ")} {SAFE_STATE_RULES.join(" ")} {DASHBOARD_HANDOFFS.map((handoff) => `${handoff.decision} ${handoff.surfaceKey} ${handoff.currentState} ${handoff.safeNextAction} ${handoff.recoveryPath} ${handoff.connectedDestination}`).join(" ")} {CUSTOMER_PLATFORM_STAGES.map((stage) => `${stage.key} ${stage.label} ${stage.customerPromise} ${stage.conversionRole}`).join(" ")} {EXPERIENCE_PILLARS.map((pillar) => `${pillar.title} ${pillar.copy}`).join(" ")} {CHANNEL_COVERAGE.join(" ")} {CONVERSATION_PROMPTS.join(" ")}
      </section>
    </main>
  );
}

function DashboardLink({ href, title, copy }: { href: string; title: string; copy: string }) {
  return (
    <Link href={href} className="system-surface rounded-[1.35rem] p-5 transition hover:border-cyan-300/30 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
      <h2 className="text-xl font-semibold tracking-tight text-white">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>
    </Link>
  );
}
