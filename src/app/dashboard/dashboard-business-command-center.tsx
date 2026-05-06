import Link from "next/link";

const COMMAND_CENTER_PRIORITIES = [
  {
    title: "Know what matters now",
    copy: "See the current priority without searching through reports, billing, support, and notifications.",
    signal: "Priority",
  },
  {
    title: "Stay inside scope",
    copy: "Understand what is included, what is separate, and what needs approval before work expands.",
    signal: "Scope",
  },
  {
    title: "Move with proof",
    copy: "Choose the next plan only when the evidence, confidence, and limits make sense.",
    signal: "Proof",
  },
  {
    title: "Keep momentum calm",
    copy: "Progress should feel obvious and serious without fake urgency or noisy reminders.",
    signal: "Momentum",
  },
] as const;

const CONTROL_ROOM_LANES = [
  { lane: "Reports", purpose: "See what Cendorq found and what is still pending.", href: "/dashboard/reports" },
  { lane: "Plans", purpose: "Choose the next depth only when the stage fits.", href: "/plans" },
  { lane: "Notifications", purpose: "Review the few actions that actually need attention.", href: "/dashboard/notifications" },
  { lane: "Support", purpose: "Resolve blockers without sending sensitive secrets.", href: "/dashboard/support/status" },
] as const;

export function DashboardBusinessCommandCenter() {
  return (
    <section className="relative z-10 mt-7" aria-label="Business command center experience">
      <div className="system-panel-authority overflow-hidden rounded-[1.7rem] p-4 sm:p-6 lg:p-7">
        <div className="grid gap-5 lg:grid-cols-[1fr_21rem] lg:items-start">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">Business command center</div>
            <h2 className="mt-3 max-w-4xl text-2xl font-semibold tracking-tight text-white sm:text-4xl">
              The dashboard should answer the customer’s next decision in seconds.
            </h2>
            <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
              The customer should know where the business stands, what Cendorq sees, what is safe to do next, and which plan depth would actually unlock new value.
            </p>
          </div>
          <div className="rounded-[1.25rem] border border-cyan-300/20 bg-cyan-300/10 p-4 sm:p-5">
            <div className="text-sm font-semibold text-cyan-100">Customer feeling to create</div>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-white">
              “I know what to do next.”
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              That is the conversion engine: clarity earns attention, proof earns trust, and control makes the next purchase feel rational.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-4">
          {COMMAND_CENTER_PRIORITIES.map((item) => (
            <article key={item.title} className="rounded-[1.25rem] border border-white/10 bg-slate-950/45 p-4 sm:p-5">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-100">{item.signal}</div>
              <h3 className="mt-3 text-lg font-semibold tracking-tight text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{item.copy}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-[1.45rem] border border-white/10 bg-white/[0.035] p-4 sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">Control lanes</div>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">Every lane should lead somewhere useful.</h3>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-400">
              Reports, plans, notifications, and support should feel connected, not like separate products.
            </p>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {CONTROL_ROOM_LANES.map((lane) => (
              <Link key={lane.lane} href={lane.href} className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4 transition hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-100">{lane.lane}</div>
                <p className="mt-3 text-sm font-semibold leading-6 text-white">{lane.purpose}</p>
                <span className="mt-4 inline-flex text-xs font-semibold text-cyan-100">Open →</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="sr-only">Premium dashboard business command center. The dashboard should answer the customer’s next decision in seconds. I know what to do next. No internal documentation wall. Every lane should lead somewhere useful.</div>
      </div>
    </section>
  );
}
