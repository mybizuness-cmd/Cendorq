import { getCommandCenterPanelRegistry } from "@/lib/command-center/panel-registry";

export function CommandCenterPanelIndex() {
  const panels = [...getCommandCenterPanelRegistry()].sort((a, b) => a.order - b.order);

  return (
    <div className="mt-10 rounded-[2rem] border border-slate-200/10 bg-white/[0.025] p-6 md:p-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">Panel Index</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">Private cockpit registry</h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-slate-400">
          Metadata only. This index keeps the Command Center navigable as it grows by listing every private panel, its operating layer, purpose, data exposure class, and protection note without exposing live records or secrets.
        </p>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {panels.map((panel) => (
          <article key={panel.key} className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-base font-semibold text-white">{panel.order}. {panel.label}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{panel.operatorPurpose}</p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.14em]">
                <span className="rounded-full border border-slate-200/20 bg-slate-200/10 px-2.5 py-1 text-slate-200">{panel.layer}</span>
                <span className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-2.5 py-1 text-cyan-100">{panel.visibility}</span>
                <span className="rounded-full border border-emerald-200/20 bg-emerald-200/10 px-2.5 py-1 text-emerald-100">{panel.dataExposure}</span>
              </div>
            </div>
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-slate-400">
              <span className="font-semibold text-slate-200">Protection:</span> {panel.protectionNote}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
