import Link from "next/link";

const COMMAND_CENTER_PRIORITIES = [
  {
    title: "Know what matters now",
    copy: "Cendorq turns scan status, reports, notifications, billing, support, and plan fit into one clear operating view so the customer does not have to guess what to do next.",
    signal: "Current priority",
  },
  {
    title: "Stay in control of scope",
    copy: "Every plan card and action path separates what is included, what is separate, what is pending, and what requires approval before work expands.",
    signal: "Scope control",
  },
  {
    title: "Move with proof",
    copy: "Recommendations should explain evidence, confidence, limitations, and business value before asking the customer to choose a deeper plan.",
    signal: "Proof-led decisions",
  },
  {
    title: "Keep momentum without pressure",
    copy: "The dashboard should make progress feel easy and premium without fake urgency, fear tactics, unsupported promises, or noisy reminders.",
    signal: "Calm momentum",
  },
] as const;

const CONTROL_ROOM_LANES = [
  {
    lane: "Diagnose",
    purpose: "Understand what weakens clarity, trust, choice, and action.",
    customerControl: "Review scan and report state before choosing a next plan.",
    cendorqGuidance: "Cendorq separates facts, assumptions, inferences, confidence, and limitations.",
    href: "/dashboard/reports",
  },
  {
    lane: "Decide",
    purpose: "Choose the next best step based on stage and evidence.",
    customerControl: "Compare options and see what is included before upgrading.",
    cendorqGuidance: "Cendorq recommends Deep Review, Build Fix, or Ongoing Control only when plan fit is supported.",
    href: "/plans",
  },
  {
    lane: "Act",
    purpose: "Move approved work forward without losing context.",
    customerControl: "Use the action inbox, billing, and support paths to approve, clarify, or pause.",
    cendorqGuidance: "Cendorq keeps scope, reminders, and corrections connected without exposing private internals.",
    href: "/dashboard/notifications",
  },
  {
    lane: "Protect",
    purpose: "Keep account, billing, support, and report handling safe.",
    customerControl: "Track requests and ask for help without submitting sensitive secrets.",
    cendorqGuidance: "Cendorq uses safe projection, audit posture, and support status boundaries.",
    href: "/dashboard/support/status",
  },
] as const;

const EXPERIENCE_STANDARD = [
  "The customer should feel this is the control center for business progress, not a static account page.",
  "The customer owns the decisions; Cendorq guides the strategy, sequencing, and safeguards.",
  "Every module should answer: what is happening, why it matters, what is safe to do next, and what improves if they continue.",
  "Conversion should come from confidence, education, proof, and visible momentum—not pressure or confusion.",
] as const;

export function DashboardBusinessCommandCenter() {
  return (
    <section className="relative z-10 mt-8" aria-label="Business command center experience">
      <div className="system-panel-authority overflow-hidden rounded-[2.35rem] p-6 sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">Business command center</div>
            <h2 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              This is where the customer controls the business journey — with Cendorq guiding the smartest next move.
            </h2>
            <p className="mt-5 max-w-4xl text-base leading-8 text-slate-300">
              The dashboard should feel like the premium control room for the customer&apos;s business success: every report, inbox action, billing state, support request, and next-plan recommendation stays connected so the customer feels informed, in control, and guided by expert structure.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {EXPERIENCE_STANDARD.map((rule) => (
                <div key={rule} className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4 text-sm leading-7 text-slate-200">
                  {rule}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[1.75rem] border border-cyan-300/20 bg-cyan-300/10 p-5">
            <div className="text-sm font-semibold text-cyan-100">Customer feeling to create</div>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-white">
              “I know where my business stands, what Cendorq sees, and what I should do next.”
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              That feeling is the conversion engine: clarity keeps them inside the dashboard, trust makes them listen, control makes them comfortable buying, and proof makes the next plan feel logical.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href="/free-check" className="rounded-2xl bg-cyan-300 px-4 py-2 text-xs font-bold text-slate-950">Continue scan</Link>
              <Link href="/dashboard/notifications" className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-bold text-white">Review actions</Link>
              <Link href="/plans" className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-bold text-white">Compare plans</Link>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-4">
          {COMMAND_CENTER_PRIORITIES.map((item) => (
            <article key={item.title} className="rounded-[1.45rem] border border-white/10 bg-slate-950/45 p-5">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-100">{item.signal}</div>
              <h3 className="mt-3 text-lg font-semibold tracking-tight text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.copy}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-[1.85rem] border border-white/10 bg-white/[0.035] p-5 sm:p-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">Control lanes</div>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">The dashboard should always show where the customer is, what they control, and how Cendorq helps.</h3>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-400">
              Each lane is a conversion path, but only when the action is safe, evidence-backed, and connected to the customer&apos;s purchased or available scope.
            </p>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {CONTROL_ROOM_LANES.map((lane) => (
              <Link key={lane.lane} href={lane.href} className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4 transition hover:border-cyan-300/30 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-100">{lane.lane}</div>
                <p className="mt-3 text-sm font-semibold leading-6 text-white">{lane.purpose}</p>
                <p className="mt-3 text-xs leading-5 text-slate-300">Customer controls: {lane.customerControl}</p>
                <p className="mt-3 text-xs leading-5 text-slate-400">Cendorq guides: {lane.cendorqGuidance}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
