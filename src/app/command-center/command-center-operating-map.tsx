const operatingLayers = [
  {
    label: "Control",
    description: "Plan controls, optimization methods, customer output approvals, and operator review gates.",
    state: "wired",
  },
  {
    label: "Truth",
    description: "Report methodology, benchmark evidence, source requirements, and unsupported-claim blockers.",
    state: "wired",
  },
  {
    label: "Intelligence",
    description: "Benchmark comparison, test record separation, model policy tracking, and regression readiness.",
    state: "wired",
  },
  {
    label: "Operations",
    description: "Database, auth, intake, clients, reports, files, billing, delivery, automation, and monthly control.",
    state: "next",
  },
] as const;

const roadmapBands = [
  {
    label: "Now",
    items: ["Keep Command Center closed", "Keep panels metadata-only", "Keep validation green", "Reduce cockpit clutter"],
  },
  {
    label: "Next",
    items: ["Production database", "Real authentication", "Private navigation", "Intake inbox"],
  },
  {
    label: "Later",
    items: ["Clients and reports", "File vault", "Billing and delivery", "Monthly control automation"],
  },
] as const;

export function CommandCenterOperatingMap() {
  return (
    <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 md:p-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Operating Map</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">Cockpit layers and build direction</h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-slate-400">
          Metadata only. This map keeps the Command Center readable as the platform grows from protected foundations into a source-of-truth operating system for reports, plans, approvals, intelligence, and monthly control.
        </p>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-4">
        {operatingLayers.map((layer) => (
          <article key={layer.label} className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
            <div className="flex items-start justify-between gap-4">
              <p className="text-base font-semibold text-white">{layer.label}</p>
              <span className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-100">
                {layer.state}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-400">{layer.description}</p>
          </article>
        ))}
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {roadmapBands.map((band) => (
          <article key={band.label} className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{band.label}</p>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-400">
              {band.items.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
