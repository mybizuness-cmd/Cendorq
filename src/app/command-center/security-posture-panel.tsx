import { getCommandCenterSecurityPosture } from "@/lib/command-center/security-posture";

export function SecurityPosturePanel() {
  const posture = getCommandCenterSecurityPosture();

  return (
    <div className="mt-10 rounded-[2rem] border border-red-200/10 bg-red-200/[0.03] p-6 md:p-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-red-200">Security Posture</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">Maximum practical defense-in-depth</h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-slate-400">
          Metadata only. This view makes the private protection model visible to operators: deny by default, server-only private access, no public database exposure, no fake absolute guarantees, and no customer-facing AI output without review.
        </p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <PolicyCard label="Default access" value={posture.defaultAccess} />
        <PolicyCard label="Private data" value={posture.privateDataAccess} />
        <PolicyCard label="Secrets" value={posture.secretsPolicy} />
        <PolicyCard label="Validation" value={posture.validationPolicy} />
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <ListCard title="Required controls" items={posture.requiredControls} />
        <ListCard title="Forbidden claims" items={posture.forbiddenClaims} />
        <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
          <p className="text-sm font-semibold text-white">Core policies</p>
          <div className="mt-4 space-y-3 text-sm leading-6 text-slate-400">
            <p><span className="font-semibold text-slate-200">Database:</span> {posture.databasePolicy}</p>
            <p><span className="font-semibold text-slate-200">AI:</span> {posture.aiActionPolicy}</p>
            <p><span className="font-semibold text-slate-200">Public surface:</span> {posture.publicSurfacePolicy}</p>
            <p><span className="font-semibold text-slate-200">Audit:</span> {posture.auditPolicy}</p>
            <p><span className="font-semibold text-slate-200">Absolute claims:</span> {posture.absoluteGuaranteeClaimAllowed ? "allowed" : "blocked"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PolicyCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

function ListCard({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
      <p className="text-sm font-semibold text-white">{title}</p>
      <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-400">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}
