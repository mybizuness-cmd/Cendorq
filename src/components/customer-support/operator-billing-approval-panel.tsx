"use client";

import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";

type BillingApprovalFormValues = {
  supportRequestId: string;
  customerIdHash: string;
  requestedByRole: "support-triage" | "support-specialist" | "billing-approver" | "support-admin";
  decision: "approve" | "reject" | "hold" | "escalate";
  state: "requested" | "in-review" | "approved" | "rejected" | "held" | "escalated";
  reasonCode: string;
  customerSafeSummary: string;
  customerSafeOutcomeCopy: string;
};

type SafeBillingApprovalProjection = {
  approvalId: string;
  supportRequestId: string;
  approvalType: string;
  approvalGate: string;
  reviewerRole: string;
  decision: string;
  state: string;
  reasonCode: string;
  customerSafeSummary: string;
  customerSafeOutcomeCopy?: string;
  auditEventId: string;
};

type BillingApprovalApiSuccess = { ok: true; approval: SafeBillingApprovalProjection; auditRecorded: true; projection: "operator-billing-approval-safe" };
type BillingApprovalApiError = { ok: false; error?: string; details?: string[]; fieldErrors?: Partial<Record<keyof BillingApprovalFormValues, string>> };
type BillingApprovalApiResponse = BillingApprovalApiSuccess | BillingApprovalApiError;
type SubmitState = { kind: "idle" } | { kind: "submitting" } | { kind: "success"; response: BillingApprovalApiSuccess } | { kind: "error"; message: string; details: string[]; fieldErrors: Partial<Record<keyof BillingApprovalFormValues, string>> };

const INITIAL_VALUES: BillingApprovalFormValues = {
  supportRequestId: "",
  customerIdHash: "",
  requestedByRole: "billing-approver",
  decision: "hold",
  state: "in-review",
  reasonCode: "billing-review",
  customerSafeSummary: "",
  customerSafeOutcomeCopy: "",
};

const REQUESTED_ROLE_OPTIONS = [["support-triage", "Support triage"], ["support-specialist", "Support specialist"], ["billing-approver", "Billing approver"], ["support-admin", "Support admin"]] as const;
const DECISION_OPTIONS = [["approve", "Approve"], ["reject", "Reject"], ["hold", "Hold"], ["escalate", "Escalate"]] as const;
const STATE_OPTIONS = [["requested", "Requested"], ["in-review", "In review"], ["approved", "Approved"], ["rejected", "Rejected"], ["held", "Held"], ["escalated", "Escalated"]] as const;

export function OperatorBillingApprovalPanel() {
  const [values, setValues] = useState<BillingApprovalFormValues>(INITIAL_VALUES);
  const [state, setState] = useState<SubmitState>({ kind: "idle" });
  const localFieldErrors = useMemo(() => validateLocally(values), [values]);
  const canSubmit = Object.keys(localFieldErrors).length === 0 && state.kind !== "submitting";

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const name = event.target.name as keyof BillingApprovalFormValues;
    setValues((current) => ({ ...current, [name]: event.target.value }));
    if (state.kind !== "idle" && state.kind !== "submitting") setState({ kind: "idle" });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fieldErrors = validateLocally(values);
    if (Object.keys(fieldErrors).length) {
      setState({ kind: "error", message: "The billing review needs required safe fields.", details: ["Use short, customer-safe billing copy only."], fieldErrors });
      return;
    }
    setState({ kind: "submitting" });
    try {
      const response = await fetch("/api/admin/support/approvals/billing", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const data = (await response.json().catch(() => null)) as BillingApprovalApiResponse | null;
      if (!response.ok || !data) {
        setState({ kind: "error", message: "The billing review could not be saved.", details: [], fieldErrors: {} });
        return;
      }
      if (!data.ok) {
        setState({ kind: "error", message: data.error ?? "The billing review could not be saved.", details: Array.isArray(data.details) ? data.details : [], fieldErrors: data.fieldErrors ?? {} });
        return;
      }
      setState({ kind: "success", response: data });
      setValues((current) => ({ ...current, customerSafeSummary: "", customerSafeOutcomeCopy: "" }));
    } catch {
      setState({ kind: "error", message: "The billing review service could not be reached.", details: ["Use a verified billing reviewer session and try again."], fieldErrors: {} });
    }
  }

  return (
    <section className="system-panel-authority rounded-[2rem] p-6">
      <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">Billing review</div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">Review billing actions with audit.</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">This panel submits billing-action reviews only through the protected billing endpoint and renders the safe result.</p>
      <form onSubmit={handleSubmit} noValidate className="mt-6 grid gap-5">
        <div className="grid gap-4 lg:grid-cols-2">
          <BillingInput name="supportRequestId" label="Support request ID" value={values.supportRequestId} onChange={handleChange} error={getFieldError(state, localFieldErrors, "supportRequestId")} />
          <BillingInput name="customerIdHash" label="Customer ownership hash" value={values.customerIdHash} onChange={handleChange} error={getFieldError(state, localFieldErrors, "customerIdHash")} />
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <BillingSelect name="requestedByRole" label="Requester role" value={values.requestedByRole} options={REQUESTED_ROLE_OPTIONS} onChange={handleChange} error={getFieldError(state, localFieldErrors, "requestedByRole")} />
          <BillingSelect name="decision" label="Decision" value={values.decision} options={DECISION_OPTIONS} onChange={handleChange} error={getFieldError(state, localFieldErrors, "decision")} />
          <BillingSelect name="state" label="State" value={values.state} options={STATE_OPTIONS} onChange={handleChange} error={getFieldError(state, localFieldErrors, "state")} />
        </div>
        <BillingInput name="reasonCode" label="Reason code" value={values.reasonCode} onChange={handleChange} error={getFieldError(state, localFieldErrors, "reasonCode")} />
        <BillingTextarea name="customerSafeSummary" label="Safe billing summary" value={values.customerSafeSummary} onChange={handleChange} error={getFieldError(state, localFieldErrors, "customerSafeSummary")} />
        <BillingTextarea name="customerSafeOutcomeCopy" label="Safe billing result copy" value={values.customerSafeOutcomeCopy} onChange={handleChange} error={getFieldError(state, localFieldErrors, "customerSafeOutcomeCopy")} />
        <button type="submit" disabled={!canSubmit} className="rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60">{state.kind === "submitting" ? "Submitting..." : "Submit billing review"}</button>
      </form>
      {state.kind === "success" ? <div className="mt-6 rounded-[1.5rem] border border-emerald-300/20 bg-emerald-300/10 p-5 text-sm text-emerald-50">Billing review saved. Approval ID: {state.response.approval.approvalId}. Audit recorded: {state.response.auditRecorded ? "yes" : "no"}.</div> : null}
      {state.kind === "error" ? <div className="mt-6 rounded-[1.5rem] border border-rose-300/20 bg-rose-300/10 p-5 text-sm text-rose-50">{state.message}</div> : null}
    </section>
  );
}

function BillingInput({ name, label, value, onChange, error }: { name: keyof BillingApprovalFormValues; label: string; value: string; onChange: (event: ChangeEvent<HTMLInputElement>) => void; error?: string }) {
  return <label className="grid gap-2"><span className="text-sm font-semibold text-white">{label}</span><input name={name} value={value} onChange={onChange} maxLength={160} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/50" /><FieldError message={error} /></label>;
}

function BillingSelect({ name, label, value, options, onChange, error }: { name: keyof BillingApprovalFormValues; label: string; value: string; options: readonly (readonly [string, string])[]; onChange: (event: ChangeEvent<HTMLSelectElement>) => void; error?: string }) {
  return <label className="grid gap-2"><span className="text-sm font-semibold text-white">{label}</span><select name={name} value={value} onChange={onChange} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/50">{options.map(([optionValue, labelText]) => <option key={optionValue} value={optionValue}>{labelText}</option>)}</select><FieldError message={error} /></label>;
}

function BillingTextarea({ name, label, value, onChange, error }: { name: keyof BillingApprovalFormValues; label: string; value: string; onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void; error?: string }) {
  return <label className="grid gap-2"><span className="text-sm font-semibold text-white">{label}</span><textarea name={name} value={value} onChange={onChange} maxLength={600} rows={4} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm leading-7 text-white outline-none transition focus:border-cyan-300/50" /><div className="text-xs text-slate-400">{value.length}/600</div><FieldError message={error} /></label>;
}

function validateLocally(values: BillingApprovalFormValues) {
  const errors: Partial<Record<keyof BillingApprovalFormValues, string>> = {};
  if (!values.supportRequestId.trim()) errors.supportRequestId = "Support request ID is required.";
  if (!values.customerIdHash.trim()) errors.customerIdHash = "Customer ownership hash is required.";
  if (!values.reasonCode.trim()) errors.reasonCode = "Reason code is required.";
  if (values.customerSafeSummary.trim().length < 20) errors.customerSafeSummary = "Safe billing summary must be at least 20 characters.";
  if (values.decision === "approve" && values.customerSafeOutcomeCopy.trim().length < 20) errors.customerSafeOutcomeCopy = "Safe billing result copy is required before approval.";
  return errors;
}

function getFieldError(state: SubmitState, localErrors: Partial<Record<keyof BillingApprovalFormValues, string>>, key: keyof BillingApprovalFormValues) {
  if (state.kind === "error" && state.fieldErrors[key]) return state.fieldErrors[key];
  return localErrors[key];
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <span className="text-xs font-medium text-rose-200">{message}</span>;
}
