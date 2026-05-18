import { OWNER_REPORT_TEST_MODE_STANDARD } from "@/lib/owner-report-test-mode-standard";
import { OWNER_REPORT_TEST_PREVIEW_BLUEPRINTS, OWNER_REPORT_TEST_PREVIEW_STANDARD } from "@/lib/owner-report-test-preview-rendering";

export function OwnerReportTestModePanel() {
  return (
    <section className="mt-10 rounded-3xl border border-fuchsia-300/20 bg-fuchsia-950/15 p-6 shadow-2xl shadow-fuchsia-950/20">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-fuchsia-200">Owner report test mode</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">Run every plan preview without checkout.</h2>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-fuchsia-50/75">
            Owner-only report testing for public companies, plan visuals, operator trace, chief review posture, and release-captain gate posture. No billing, customer delivery, entitlement mutation, or customer email.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <Metric label="Plans" value={OWNER_REPORT_TEST_PREVIEW_BLUEPRINTS.length} />
          <Metric label="Rules" value={OWNER_REPORT_TEST_MODE_STANDARD.length} />
          <Metric label="Preview rules" value={OWNER_REPORT_TEST_PREVIEW_STANDARD.length} />
        </div>
      </div>

      <div className="mt-6 grid gap-3 lg:grid-cols-4">
        {OWNER_REPORT_TEST_PREVIEW_BLUEPRINTS.map((blueprint) => (
          <article key={blueprint.planKey} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-fuchsia-100/70">{blueprint.planKey}</div>
            <h3 className="mt-2 text-lg font-semibold tracking-[-0.03em] text-white">{blueprint.title}</h3>
            <div className="mt-3 rounded-xl border border-fuchsia-300/20 bg-fuchsia-900/20 px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-fuchsia-100">
              {blueprint.previewWatermark}
            </div>
            <p className="mt-3 text-xs font-medium leading-6 text-fuchsia-50/70">
              Visuals: {blueprint.visualStandard.join(" • ")}
            </p>
            <p className="mt-3 text-xs font-medium leading-6 text-fuchsia-50/60">
              Trace: {blueprint.operatorTrace.join(" • ")}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-3 lg:grid-cols-2">
        <RuleBlock title="Owner test requirements" rules={OWNER_REPORT_TEST_MODE_STANDARD} />
        <RuleBlock title="Preview rendering requirements" rules={OWNER_REPORT_TEST_PREVIEW_STANDARD} />
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-fuchsia-300/20 bg-white/[0.045] px-4 py-3">
      <div className="text-2xl font-semibold text-white">{value}</div>
      <div className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-fuchsia-100/70">{label}</div>
    </div>
  );
}

function RuleBlock({ title, rules }: { title: string; rules: readonly string[] }) {
  return (
    <div className="rounded-2xl border border-fuchsia-300/20 bg-fuchsia-900/15 p-4">
      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-fuchsia-200">{title}</p>
      <ul className="mt-3 grid gap-2 text-xs font-medium leading-6 text-fuchsia-50/70">
        {rules.map((rule) => <li key={rule}>• {rule}</li>)}
      </ul>
    </div>
  );
}
