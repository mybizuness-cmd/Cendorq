import Link from "next/link";

const COMMAND_CENTER_PRIORITIES = [
  {
    title: "Open the proof first",
    copy: "The first paid move should come after the customer sees what Cendorq found, not before.",
    signal: "Proof",
  },
  {
    title: "Make the upgrade rational",
    copy: "Each upgrade should answer a specific unlocked question: cause, repair, or ongoing control.",
    signal: "Depth",
  },
  {
    title: "Show what stays separate",
    copy: "Plan boundaries increase trust because the customer sees Cendorq is not hiding scope or forcing the wrong step.",
    signal: "Scope",
  },
  {
    title: "Keep the next move visible",
    copy: "The dashboard should always make one strongest next action easier than wandering through menus.",
    signal: "Action",
  },
] as const;

const CONTROL_ROOM_LANES = [
  { lane: "Reports", purpose: "Open the proof, limitations, and next action.", href: "/dashboard/reports" },
  { lane: "Plans", purpose: "Move to the next paid depth when the stage fits.", href: "/plans" },
  { lane: "Notifications", purpose: "Review only the actions that actually need attention.", href: "/dashboard/notifications" },
  { lane: "Support", purpose: "Resolve blockers without exposing sensitive secrets.", href: "/dashboard/support/status" },
] as const;

const CONVERSION_LAWS = [
  "Proof creates trust.",
  "Trust makes the upgrade feel safe.",
  "Clear scope removes hesitation.",
  "One next action keeps momentum alive.",
] as const;

export function DashboardBusinessCommandCenter() {
  return (
    <section className="relative z-10 mt-7" aria-label="Business command center experience">
      <div className="system-panel-authority overflow-hidden rounded-[1.7rem] p-4 sm:p-6 lg:p-7">
        <div className="grid gap-5 lg:grid-cols-[1fr_22rem] lg:items-start">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">Conversion command center</div>
            <h2 className="mt-3 max-w-4xl text-2xl font-semibold tracking-tight text-white sm:text-4xl">
              This is where Free Scan turns into the right paid depth.
            </h2>
            <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
              The customer should see what Cendorq found, why it matters, what is still unknown, and why Review, Repair, or Control is the safest next move. That is how the dashboard sells without feeling like pressure.
            </p>
          </div>
          <div className="rounded-[1.25rem] border border-cyan-300/20 bg-cyan-300/10 p-4 sm:p-5">
            <div className="text-sm font-semibold text-cyan-100">Customer feeling to create</div>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-white">
              “This next step makes sense.”
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              That is the money path: proof earns trust, trust opens budget, and the correct plan depth becomes the obvious move.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-4">
          {COMMAND_CENTER_PRIORITIES.map((item, index) => (
            <article key={item.title} className={index === 1 ? "rounded-[1.25rem] border border-cyan-200/30 bg-cyan-300/12 p-4 shadow-[0_24px_90px_rgba(34,211,238,0.1)] sm:p-5" : "rounded-[1.25rem] border border-white/10 bg-slate-950/45 p-4 sm:p-5"}>
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-100">{item.signal}</div>
              <h3 className="mt-3 text-lg font-semibold tracking-tight text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{item.copy}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-[1.45rem] border border-white/10 bg-white/[0.035] p-4 sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">Conversion laws</div>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">The dashboard should guide, not beg.</h3>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-400">
              The strongest selling happens when the customer can see why the next depth is safer than guessing.
            </p>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {CONVERSION_LAWS.map((law) => (
              <div key={law} className="rounded-[1.25rem] border border-cyan-300/15 bg-cyan-300/[0.07] p-4 text-sm font-semibold leading-6 text-cyan-50">
                {law}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-[1.45rem] border border-white/10 bg-white/[0.035] p-4 sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">Control lanes</div>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">Every lane should lead to proof, scope, or the next paid depth.</h3>
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
        <div className="sr-only">Dashboard business conversion command center. Free Scan turns into the right paid depth. This next step makes sense. Proof earns trust. Trust opens budget. No internal documentation wall. Every lane should lead to proof, scope, or the next paid depth.</div>
      </div>
    </section>
  );
}
