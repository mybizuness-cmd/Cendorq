import { getCommandCenterValidationRegistry } from "@/lib/command-center/validation-registry";

export function ValidationRegistryPanel() {
  const validators = getCommandCenterValidationRegistry();

  return (
    <div className="mt-10 rounded-[2rem] border border-lime-200/10 bg-lime-200/[0.03] p-6 md:p-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-lime-200">Validation Registry</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">Guardrail chain visibility</h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-slate-400">
          Metadata only. This panel shows the validation scripts that protect the private cockpit, the boundary each guard owns, and what a failure means without exposing secret values, customer records, raw intelligence, raw evidence, prompts, scoring internals, or live operational data.
        </p>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {validators.map((validator) => (
          <article key={validator.key} className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-base font-semibold text-white">{validator.label}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{validator.scriptPath}</p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.14em]">
                <span className="rounded-full border border-lime-200/20 bg-lime-200/10 px-2.5 py-1 text-lime-100">{validator.category}</span>
                <span className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-2.5 py-1 text-cyan-100">
                  {validator.requiredInValidateRoutes ? "validate:routes" : "manual"}
                </span>
              </div>
            </div>
            <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-400 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Protected boundary</p>
                <p className="mt-2">{validator.protectedBoundary}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Failure meaning</p>
                <p className="mt-2">{validator.failureMeaning}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
