import { COMMAND_CENTER_MODULES } from "@/lib/command-center/modules";

export function ModuleRoadmapPanel() {
  return (
    <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {COMMAND_CENTER_MODULES.map((module) => (
        <article key={module.key} className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
          <div className="flex items-start justify-between gap-4">
            <p className="text-base font-semibold text-white">{module.label}</p>
            <span className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-100">
              {module.buildPriority}
            </span>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-400">{module.description}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.14em]">
            <span className="rounded-full border border-white/10 px-2.5 py-1 text-slate-400">phase {module.buildPhase}</span>
            <span className="rounded-full border border-white/10 px-2.5 py-1 text-slate-400">{module.status}</span>
            <span className="rounded-full border border-white/10 px-2.5 py-1 text-slate-400">{module.requiredPermission}</span>
          </div>
        </article>
      ))}
    </div>
  );
}
