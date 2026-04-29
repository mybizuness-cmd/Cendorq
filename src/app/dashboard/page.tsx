import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CUSTOMER_PLATFORM_STAGES } from "@/lib/customer-platform-route-map";

export const metadata = buildMetadata({
  title: "Customer dashboard | Cendorq",
  description: "Your private Cendorq command room for Free Scan status, proof, reports, billing, and next actions.",
  path: "/dashboard",
  noIndex: true,
});

const OPERATING_SNAPSHOT = [
  { label: "Current stage", value: "Free Scan setup", detail: "Start with a truthful first read before any paid recommendation." },
  { label: "Primary focus", value: "Find the highest-leverage gap", detail: "Clarity, trust, choice, and action are reviewed before deeper work." },
  { label: "Decision quality", value: "Proof before pressure", detail: "Each next step should explain evidence, confidence, limitation, and practical value." },
  { label: "Protection mode", value: "Customer-safe", detail: "Dashboard copy avoids raw internal data, unsupported promises, and fake urgency." },
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
  { title: "Protected trust", copy: "Customer-facing surfaces avoid raw payloads, private internals, and unsupported guarantees." },
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
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-8 text-white sm:px-6 md:py-12 xl:py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(103,232,249,0.12),transparent_32%),radial-gradient(circle_at_86%_8%,rgba(14,165,233,0.1),transparent_34%)]" />

      <section className="system-panel-authority relative z-10 overflow-hidden rounded-[2.5rem] p-6 sm:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">Customer command room</div>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
              Your Cendorq dashboard is where the business becomes clearer.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
              Track Free Scan status, see evidence-backed findings, open your report vault, manage billing, view important notifications, request support, track support status, and move to the next plan only when the proof and stage make sense.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-cyan-300/20 bg-cyan-300/10 p-5 lg:w-80">
            <div className="text-sm font-semibold text-cyan-100">Next best action</div>
            <p className="mt-2 text-sm leading-6 text-slate-200">
              Finish or review the Free Scan so Cendorq can show the first evidence-backed direction.
            </p>
            <Link href="/free-check" className="mt-4 inline-flex rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Continue Free Scan
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-8 grid gap-4 lg:grid-cols-4" aria-label="Dashboard operating snapshot">
        {OPERATING_SNAPSHOT.map((item) => (
          <article key={item.label} className="system-surface rounded-[1.5rem] p-5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">{item.label}</div>
            <div className="mt-3 text-xl font-semibold tracking-tight text-white">{item.value}</div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-8 grid gap-4 md:grid-cols-4">
        {SCORECARDS.map((card) => (
          <article key={card.label} className="system-surface rounded-[1.5rem] p-5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">{card.label}</div>
            <div className="mt-4 text-2xl font-semibold tracking-tight text-white">{card.value}</div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{card.detail}</p>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-8 grid gap-4 lg:grid-cols-4" aria-label="Dashboard excellence pillars">
        {EXPERIENCE_PILLARS.map((pillar) => (
          <article key={pillar.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
            <h2 className="text-lg font-semibold tracking-tight text-white">{pillar.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{pillar.copy}</p>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-8 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="system-surface rounded-[2rem] p-6">
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">Roadmap command timeline</div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">From first scan to controlled growth.</h2>
          <div className="mt-6 grid gap-3">
            {CUSTOMER_PLATFORM_STAGES.map((stage, index) => (
              <div key={stage.key} className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</div>
                  <div>
                    <div className="font-semibold text-white">{stage.label}</div>
                    <p className="mt-1 text-sm leading-6 text-slate-300">{stage.customerPromise}</p>
                    <p className="mt-2 text-xs leading-5 text-cyan-100/80">{stage.conversionRole}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>

        <aside className="grid gap-5">
          <article className="system-panel-authority rounded-[2rem] p-6">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">Proof and trust center</div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">Every recommendation should explain why.</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Cendorq separates evidence, confidence, limitations, and next-plan logic so the dashboard converts through proof, not pressure.
            </p>
          </article>
          <article className="system-surface rounded-[2rem] p-6">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">Revenue channel awareness</div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">Coverage beyond one business model.</h2>
            <div className="mt-4 grid gap-2">
              {CHANNEL_COVERAGE.map((channel) => (
                <div key={channel} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200">
                  {channel}
                </div>
              ))}
            </div>
          </article>
          <article className="system-surface rounded-[2rem] p-6">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">Strategic conversation</div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">Ask smarter questions.</h2>
            <div className="mt-4 grid gap-2">
              {CONVERSATION_PROMPTS.map((prompt) => (
                <div key={prompt} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200">
                  {prompt}
                </div>
              ))}
            </div>
          </article>
        </aside>
      </section>

      <section className="relative z-10 mt-8 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        <DashboardLink href="/dashboard/reports" title="Open report vault" copy="View Free Scan, Deep Review, Build Fix, and Ongoing Control outputs as they become available." />
        <DashboardLink href="/dashboard/billing" title="Manage billing and plans" copy="See plan state, invoices, entitlements, and upgrade paths without friction." />
        <DashboardLink href="/dashboard/notifications" title="Open notification center" copy="Review account, report, billing, support, and security alerts without raw private data exposure." />
        <DashboardLink href="/dashboard/support" title="Open support center" copy="Request report help, correction review, billing guidance, security review, or plan guidance safely." />
        <DashboardLink href="/dashboard/support/status" title="Track support status" copy="View customer-safe request status, approved next actions, and support follow-through without internal data exposure." />
        <DashboardLink href="/plans" title="Compare plans" copy="Understand which next step fits your current stage and what each plan unlocks." />
      </section>
    </main>
  );
}

function DashboardLink({ href, title, copy }: { href: string; title: string; copy: string }) {
  return (
    <Link href={href} className="system-surface rounded-[1.5rem] p-5 transition hover:border-cyan-300/30 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
      <h2 className="text-xl font-semibold tracking-tight text-white">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>
    </Link>
  );
}
