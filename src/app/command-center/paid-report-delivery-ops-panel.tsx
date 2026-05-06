import { getPaidReportDeliveryCommandCenterOps } from "@/lib/command-center/paid-report-delivery-ops";

export function PaidReportDeliveryOpsPanel() {
  const { controls, deliveryContracts, deliveryGuards, rules } = getPaidReportDeliveryCommandCenterOps();

  return (
    <section className="mt-10 rounded-[2rem] border border-cyan-200/15 bg-cyan-950/20 p-6 md:p-8" aria-label="Paid report delivery command center operations">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100">Paid report delivery ops</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Dashboard copy, PDF attachment, approval, resend, and audit must agree.</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
            Metadata-only operator view for paid-report execution. It shows the operating posture without exposing raw evidence, provider payloads, prompts, internal notes, payment data, or customer secrets.
          </p>
        </div>
        <div className="rounded-3xl border border-cyan-200/20 bg-cyan-200/10 p-4 text-sm leading-6 text-cyan-50 lg:max-w-sm">
          A paid report is not complete until the dashboard copy is published, the approved customer-safe PDF is generated, the delivery email is sent with attachment, and the audit record exists.
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {deliveryContracts.map((contract) => (
          <article key={contract.key} className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100">{contract.planKey}</p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">{contract.customerReportName}</h3>
              </div>
              <span className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-3 py-1 text-xs font-semibold text-cyan-100">PDF</span>
            </div>
            <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-300">
              <p><span className="font-semibold text-slate-100">Dashboard:</span> {contract.dashboardPath}</p>
              <p><span className="font-semibold text-slate-100">Email:</span> {contract.customerEmailSubject}</p>
              <p><span className="font-semibold text-slate-100">Attachment:</span> {contract.attachmentFileNamePattern}</p>
              <p><span className="font-semibold text-slate-100">Release gate:</span> {contract.releaseGate}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {controls.map((control) => (
          <article key={control.stage} className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100">{control.label}</p>
            <h3 className="mt-3 text-lg font-semibold tracking-tight text-white">{control.operatorQuestion}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">{control.requiredVisibleState}</p>
            <p className="mt-4 rounded-2xl border border-rose-200/15 bg-rose-200/10 p-3 text-xs leading-5 text-rose-50">Blocked shortcut: {control.blockedShortcut}</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Audit event · {control.auditEvent}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
          <p className="text-sm font-semibold text-cyan-100">Operator rules</p>
          <div className="mt-4 grid gap-3">
            {rules.map((rule) => (
              <p key={rule} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-xs leading-6 text-slate-300">{rule}</p>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
          <p className="text-sm font-semibold text-cyan-100">Delivery guards</p>
          <div className="mt-4 grid gap-3">
            {deliveryGuards.slice(0, 5).map((guard) => (
              <p key={guard} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-xs leading-6 text-slate-300">{guard}</p>
            ))}
          </div>
        </div>
      </div>

      <p className="sr-only">
        Command center paid report delivery ops. Paid report production status. Attachment generation status. Release approval gate. Email delivery status. Resend controls. Delivery audit visibility. Dashboard copy PDF attachment approval resend audit must agree. Metadata-only operator view. No raw evidence, customer secrets, provider payloads, prompts, internal notes, payment data, or cross-customer records. A paid report is not complete until dashboard copy is published, approved PDF is generated, report-ready email is sent with attachment, and delivery audit is recorded. {controls.map((control) => `${control.stage} ${control.label} ${control.requiredVisibleState} ${control.blockedShortcut} ${control.auditEvent}`).join(" ")} {deliveryContracts.map((contract) => `${contract.planKey} ${contract.customerReportName} ${contract.dashboardPath} ${contract.customerEmailSubject} ${contract.attachmentFileNamePattern} ${contract.releaseGate}`).join(" ")} {rules.join(" ")} {deliveryGuards.join(" ")}
      </p>
    </section>
  );
}
