"use client";

import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";

type ClosureApprovalFormValues = {
  supportRequestId: string;
  customerIdHash: string;
  requestedByRole: "support-triage" | "support-specialist" | "support-admin";
  decision: "approve" | "reject" | "hold" | "escalate";
  state: "requested" | "in-review" | "approved" | "rejected" | "held" | "escalated";
  reasonCode: string;
  customerSafeSummary: string;
  customerSafeOutcomeCopy: string;
};

type SafeClosureApprovalProjection = {
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

type ClosureApprovalApiSuccess = { ok: true; approval: SafeClosureApprovalProjection; auditRecorded: true; projection: "operator-closure-approval-safe" };
type ClosureApprovalApiError = { ok: false; error?: string; details?: string[]; fieldErrors?: Partial<Record<keyof ClosureApprovalFormValues, string>> };
type ClosureApprovalApiResponse = ClosureApprovalApiSuccess | ClosureApprovalApiError;
type SubmitState = { kind: "idle" } | { kind: "submitting" } | { kind: "success"; response: ClosureApprovalApiSuccess } | { kind: "error"; message: string; details: string[]; fieldErrors: Partial<Record<keyof ClosureApprovalFormValues, string>> };

const INITIAL_VALUES: ClosureApprovalFormValues = {
  supportRequestId: "",
  customerIdHash: "",
  requestedByRole: "support-admin",
  decision: "hold",
  state: "in-review",
  reasonCode: "closure-review",
  customerSafeSummary: "",
  customerSafeOutcomeCopy: "",
};

const REQUESTED_ROLE_OPTIONS = [["support-triage", "Support triage"], ["support-specialist", "Support specialist"], ["support-admin", "Support admin"]] as const;
const DECISION_OPTIONS = [["approve", "Approve"], ["reject", "Reject"], ["hold", "Hold"], ["escalate", "Escalate"]] as const;
const STATE_OPTIONS = [["requested", "Requested"], ["in-review", "In review"], ["approved", "Approved"], ["rejected", "Rejected"], ["held", "Held"], ["escalated", "Escalated"]] as const;

export function OperatorClosureApprovalPanel() {
  const [values, setValues] = useState<ClosureApprovalFormValues>(INITIAL_VALUES);
  const [state, setState] = useState<SubmitState>({ kind: "idle" });
  const localFieldErrors = useMemo(() => validateLocally(values), [values]);
  const canSubmit = Object.keys(localFieldErrors).length === 0 && state.kind !== "submitting";

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const name = event.target.name as keyof ClosureApprovalFormValues;
    setValues((current) => ({ ...current, [name]: event.target.value }));
    if (state.kind !== "idle" && state.kind !== "submitting") setState({ kind: "idle" });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fieldErrors = validateLocally(values);
    if (Object.keys(fieldErrors).length) {
      setState({ kind: "error", message: "The closure review needs required safe fields.", details: ["Use short, customer-safe closure copy only."], fieldErrors });
      return;
    }
    setState({ kind: "submitting" });
    try {
      const response = await fetch("/api/admin/support/approvals/closure", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const data = (await response.json().catch(() => null)) as ClosureApprovalApiResponse | null;
      if (!response.ok || !data) {
        setState({ kind: "error", message: "The closure review could not be saved.", details: [], fieldErrors: {} });
        return;
      }
      if (!data.ok) {
        setState({ kind: "error", message: data.error ?? "The closure review could not be saved.", details: Array.isArray(data.details) ? data.details : [], fieldErrors: data.fieldErrors ?? {} });
        return;
      }
      setState({ kind: "success", response: data });
      setValues((current) => ({ ...current, customerSafeSummary: "", customerSafeOutcomeCopy: "" }));
    } catch {
      setState({ kind: "error", message: "The closure review service could not be reached.", details: ["Use a verified support admin session and try again."], fieldErrors: {} });
    }
  }

  return (
    <section className="system-panel-authority rounded-[2rem] p-6">
      <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">Closure review</div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">Review closure outcomes with audit.</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">This panel submits support-closure reviews only through the protected closure endpoint and renders the safe result.</p>
      <form onSubmit={handleSubmit} noValidate className="mt-6 grid gap-5">
        <div className="grid gap-4 lg:grid-cols-2">
          <ClosureInput name="supportRequestId" label="Support request ID" value={values.supportRequestId} onChange={handleChange} error={getFieldError(state, localFieldErrors, "supportRequestId")} />
          <ClosureInput name="customerIdHash" label="Customer ownership hash" value={values.customerIdHash} onChange={handleChange} error={getFieldError(state, localFieldErrors, "customerIdHash")} />
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <ClosureSelect name="requestedByRole" label="Requester role" value={values.requestedByRole} options={REQUESTED_ROLE_OPTIONS} onChange={handleChange} error={getFieldError(state, localFieldErrors, "requestedByRole")} />
          <ClosureSelect name="decision" label="Decision" value={values.decision} options={DECISION_OPTIONS} onChange={handleChange} error={getFieldError(state, localFieldErrors, "decision")} />
          <ClosureSelect name="state" label="State" value={values.state} options={STATE_OPTIONS} onChange={handleChange} error={getFieldError(state, localFieldErrors, "state")} />
        </div>
        <ClosureInput name="reasonCode" label="Reason code" value={values.reasonCode} onChange={handleChange} error={getFieldError(state, localFieldErrors, "reasonCode")} />
        <ClosureTextarea name="customerSafeSummary" label="Safe closure summary" value={values.customerSafeSummary} onChange={handleChange} error={getFieldError(state, localFieldErrors, "customerSafeSummary")} />
        <ClosureTextarea name="customerSafeOutcomeCopy" label="Safe closure result copy" value={values.customerSafeOutcomeCopy} onChange={handleChange} error={getFieldError(state, localFieldErrors, "customerSafeOutcomeCopy")} />
        <button type="submit" disabled={!canSubmit} className="rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60">{state.kind === "submitting" ? "Submitting..." : "Submit closure review"}</button>
      </form>
      {state.kind === "success" ? <div className="mt-6 rounded-[1.5rem] border border-emerald-300/20 bg-emerald-300/10 p-5 text-sm text-emerald-50">Closure review saved. Approval ID: {state.response.approval.approvalId}. Audit recorded: {state.response.auditRecorded ? "yes" : "no"}.</div> : null}
      {state.kind === "error" ? <div className="mt-6 rounded-[1.5rem] border border-rose-300/20 bg-rose-300/10 p-5 text-sm text-rose-50">{state.message}</div> : null}
    </section>
  );
}

function ClosureInput({ name, label, value, onChange, error }: { name: keyof ClosureApprovalFormValues; label: string; value: string; onChange: (event: ChangeEvent<HTMLInputElement>) => void; error?: string }) {
  return <label className="grid gap-2"><span className="text-sm font-semibold text-white">{label}</span><input name={name} value={value} onChange={onChange} maxLength={160} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/50" /><FieldError message={error} /></label>;
}

function ClosureSelect({ name, label, value, options, onChange, error }: { name: keyof ClosureApprovalFormValues; label: string; value: string; options: readonly (readonly [string, string])[]; onChange: (event: ChangeEvent<HTMLSelectElement>) => void; error?: string }) {
  return <label className="grid gap-2"><span className="text-sm font-semibold text-white">{label}</span><select name={name} value={value} onChange={onChange} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/50">{options.map(([optionValue, labelText]) => <option key={optionValue} value={optionValue}>{labelText}</option>)}</select><FieldError message={error} /></label>;
}

function ClosureTextarea({ name, label, value, onChange, error }: { name: keyof ClosureApprovalFormValues; label: string; value: string; onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void; error?: string }) {
  return <label className="grid gap-2"><span className="text-sm font-semibold text-white">{label}</span><textarea name={name} value={value} onChange={onChange} maxLength={600} rows={4} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm leading-7 text-white outline-none transition focus:border-cyan-300/50" /><div className="text-xs text-slate-400">{value.length}/600</div><FieldError message={error} /></label>;
}

function validateLocally(values: ClosureApprovalFormValues) {
  const errors: Partial<Record<keyof ClosureApprovalFormValues, string>> = {};
  if (!values.supportRequestId.trim()) errors.supportRequestId = "Support request ID is required.";
  if (!values.customerIdHash.trim()) errors.customerIdHash = "Customer ownership hash is required.";
  if (!values.reasonCode.trim()) errors.reasonCode = "Reason code is required.";
  if (values.customerSafeSummary.trim().length < 20) errors.customerSafeSummary = "Safe closure summary must be at least 20 characters.";
  if (values.decision === "approve" && values.customerSafeOutcomeCopy.trim().length < 20) errors.customerSafeOutcomeCopy = "Safe closure result copy is required before approval.";
  return errors;
}

function getFieldError(state: SubmitState, localErrors: Partial<Record<keyof ClosureApprovalFormValues, string>>, key: keyof ClosureApprovalFormValues) {
  if (state.kind === "error" && state.fieldErrors[key]) return state.fieldErrors[key];
  return localErrors[key];
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <span className="text-xs font-medium text-rose-200">{message}</span>;
}
