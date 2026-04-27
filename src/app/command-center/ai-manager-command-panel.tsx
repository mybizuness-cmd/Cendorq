import type { AiManagerCommandPolicy } from "@/lib/command-center/ai-manager-command-queue";

export function AiManagerCommandPanel({ commands }: { commands: readonly AiManagerCommandPolicy[] }) {
  return (
    <div className="mt-10 rounded-[2rem] border border-cyan-200/10 bg-cyan-200/[0.035] p-6 md:p-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">AI Manager</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">Controlled command queue</h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-slate-400">
          Metadata only. These are the future AI manager actions available from the private panel. AI can draft, review, compare, test, summarize, and recommend, but it cannot send customer output or change live records without review and approval.
        </p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {commands.map((command) => (
          <article key={command.commandType} className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
            <div className="flex items-start justify-between gap-4">
              <p className="text-base font-semibold text-white">{command.label}</p>
              <span className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-100">
                {command.defaultState}
              </span>
            </div>
            <div className="mt-5 space-y-3 text-sm leading-6 text-slate-400">
              <p><span className="font-semibold text-slate-200">Context:</span> {command.requiredContext.slice(0, 3).join(", ")}</p>
              <p><span className="font-semibold text-slate-200">Guards:</span> {command.requiredGuards.slice(0, 3).join(", ")}</p>
              <p><span className="font-semibold text-slate-200">Blocked:</span> {command.blockedActions.slice(0, 3).join(", ")}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
