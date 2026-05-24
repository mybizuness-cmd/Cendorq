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

const BUSINESS_COMMAND_CHECKS = [
  "Answer the next customer decision before adding more dashboard surface.",
  "Keep reports, plans, notifications, and support connected to the same account thread.",
  "Use proof, scope, priority, and momentum language without fake urgency.",
  "Send each lane to one useful destination instead of making the customer choose twice.",
] as const;

export function DashboardBusinessCommandCenter() {
  return (
    <section className="relative z-10 mt-7" aria-label="Business command center experience">
      <div className="overflow-hidden rounded-[2.2rem] border border-white/80 bg-white/86 shadow-[0_24px_80px_rgba(15,23,42,0.075)] backdrop-blur">
        <div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="border-b border-cyan-100 bg-[radial-gradient(circle_at_18%_0%,rgba(125,211,252,0.2),transparent_34%),linear-gradient(180deg,#ffffff,#effcff)] p-5 sm:p-7 lg:border-b-0 lg:border-r lg:p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Customer decision center</p>
            <h2 className="max-w-4xl text-3xl font-semibold leading-tight tracking-[-0.06em] text-slate-950 sm:text-5xl">
              The dashboard should answer the customer’s next decision in seconds.
            </h2>
            <p className="mt-4 max-w-4xl text-sm font-medium leading-7 text-slate-600 sm:text-base sm:leading-8">
              The customer should know where the business stands, what Cendorq sees, what is safe to do next, and which plan depth would actually unlock new value.
            </p>
            <div className="mt-6 rounded-[1.4rem] border border-cyan-100 bg-white/88 p-5 shadow-sm">
              <div className="text-sm font-semibold text-cyan-700">Customer feeling to create</div>
              <p className="mt-3 text-3xl font-semibold tracking-[-0.055em] text-slate-950">
                “I know what to do next.”
              </p>
              <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                Clarity earns attention, proof earns trust, and control makes the next step feel rational.
              </p>
            </div>
          </div>

          <div className="grid gap-0 sm:grid-cols-2">
            {COMMAND_CENTER_PRIORITIES.map((item) => (
              <article key={item.title} className="border-b border-cyan-100 p-5 sm:border-r sm:p-6">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-700">{item.signal}</div>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="border-t border-cyan-100 bg-white/90 p-5 sm:p-6 lg:p-7">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Connected customer lanes</p>
              <h3 className="mt-2 text-3xl font-semibold tracking-[-0.055em] text-slate-950">Every lane should lead somewhere useful.</h3>
            </div>
            <p className="max-w-xl text-sm font-medium leading-6 text-slate-600">
              Reports, plans, notifications, and support should feel connected, not like separate products.
            </p>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {CONTROL_ROOM_LANES.map((lane) => (
              <Link key={lane.lane} href={lane.href} className="rounded-[1.35rem] border border-cyan-100 bg-cyan-50/55 p-4 transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2">
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-700">{lane.lane}</div>
                <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">{lane.purpose}</p>
                <span className="mt-4 inline-flex text-xs font-semibold text-cyan-700">Open →</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="grid gap-0 border-t border-cyan-100 bg-cyan-50/50 lg:grid-cols-4">
          {BUSINESS_COMMAND_CHECKS.map((check) => (
            <div key={check} className="border-b border-cyan-100 p-4 text-xs font-semibold leading-6 text-slate-700 lg:border-r">
              {check}
            </div>
          ))}
        </div>
        <div className="sr-only">Dashboard business command center. Customer decision center. Connected customer lanes. Business command center consistency. The dashboard should answer the customer’s next decision in seconds. I know what to do next. No internal documentation wall. Every lane should lead somewhere useful. {BUSINESS_COMMAND_CHECKS.join(" ")}</div>
      </div>
    </section>
  );
}
