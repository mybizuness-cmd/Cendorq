import { getCommandCenterRecordClassPolicies, type CommandCenterRecordClassPolicy } from "@/lib/command-center/test-record-classes";

export function TestRecordClassesPanel() {
  const policies = getCommandCenterRecordClassPolicies();

  return (
    <div className="mt-10 rounded-[2rem] border border-teal-200/10 bg-teal-200/[0.03] p-6 md:p-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-200">Test Record Classes</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">Clean separation of test, benchmark, and live data</h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-slate-400">
          Metadata only. Synthetic tests, regression tests, benchmark references, archived benchmarks, and live customers must never be mixed for revenue, delivery, progress, or customer-facing proof.
        </p>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {policies.map((policy) => (
          <RecordClassCard key={policy.key} policy={policy} />
        ))}
      </div>
    </div>
  );
}

function RecordClassCard({ policy }: { policy: CommandCenterRecordClassPolicy }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-lg font-semibold text-white">{policy.label}</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">{policy.purpose}</p>
        </div>
        <span className="rounded-full border border-teal-200/20 bg-teal-200/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-teal-100">
          {policy.key}
        </span>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-4">
        <FlagCard label="Customer visible" value={policy.customerVisible} />
        <FlagCard label="Revenue" value={policy.countsAsRevenue} />
        <FlagCard label="Progress" value={policy.countsAsProgress} />
        <FlagCard label="Delivery" value={policy.canTriggerDelivery} />
      </div>
      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Required guards</p>
        <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-400">
          {policy.requiredGuards.map((guard) => (
            <li key={guard}>• {guard}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function FlagCard({ label, value }: { label: string; value: boolean }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-white">{value ? "yes" : "no"}</p>
    </div>
  );
}
