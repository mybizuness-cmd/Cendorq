"use client";

import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";

type ApprovalFormValues = {
  supportRequestId: string;
  customerIdHash: string;
  approvalType: "safe-correction";
  approvalGate: "specialist-review" | "support-admin-approval";
  requestedByRole: "support-triage" | "support-specialist" | "support-admin";
  reviewerRole: "support-specialist" | "support-admin";
  decision: "approve" | "reject" | "hold" | "escalate";
  state: "requested" | "in-review" | "approved" | "rejected" | "held" | "escalated";
  reasonCode: string;
  customerSafeSummary: string;
  customerSafeOutcomeCopy: string;
};

type SafeApprovalProjection = {
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

type ApprovalApiSuccess = {
  ok: true;
  approval: SafeApprovalProjection;
  auditRecorded: true;
  projection: "operator-approval-safe";
};

type ApprovalApiError = {
  ok: false;
  error?: string;
  details?: string[];
  fieldErrors?: Partial<Record<keyof ApprovalFormValues, string>>;
};

type ApprovalApiResponse = ApprovalApiSuccess | ApprovalApiError;

type SubmitState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; response: ApprovalApiSuccess }
  | { kind: "error"; message: string; details: string[]; fieldErrors: Partial<Record<keyof ApprovalFormValues, string>> };

const INITIAL_VALUES: ApprovalFormValues = {
  supportRequestId: "",
  customerIdHash: "",
  approvalType: "safe-correction",
  approvalGate: "specialist-review",
  requestedByRole: "support-specialist",
  reviewerRole: "support-specialist",
  decision: "hold",
  state: "in-review",
  reasonCode: "safe-correction-review",
  customerSafeSummary: "",
  customerSafeOutcomeCopy: "",
};

const APPROVAL_GATE_OPTIONS = [
  ["specialist-review", "Specialist review"],
  ["support-admin-approval", "Support admin approval"],
] as const;

const REQUESTED_ROLE_OPTIONS = [
  ["support-triage", "Support triage"],
  ["support-specialist", "Support specialist"],
  ["support-admin", "Support admin"],
] as const;

const REVIEWER_ROLE_OPTIONS = [
  ["support-specialist", "Support specialist"],
  ["support-admin", "Support admin"],
] as const;

const DECISION_OPTIONS = [
  ["approve", "Approve"],
  ["reject", "Reject"],
  ["hold", "Hold"],
  ["escalate", "Escalate"],
] as const;

const STATE_OPTIONS = [
  ["requested", "Requested"],
  ["in-review", "In review"],
  ["approved", "Approved"],
  ["rejected", "Rejected"],
  ["held", "Held"],
  ["escalated", "Escalated"],
] as const;

export function OperatorApprovalPanel() {
  const [values, setValues] = useState<ApprovalFormValues>(INITIAL_VALUES);
  const [state, setState] = useState<SubmitState>({ kind: "idle" });
  const localFieldErrors = useMemo(() => validateLocally(values), [values]);
  const canSubmit = Object.keys(localFieldErrors).length === 0 && state.kind !== "submitting";

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const name = event.target.name as keyof ApprovalFormValues;
    const value = event.target.value;
    setValues((current) => ({ ...current, [name]: value }));
    if (state.kind !== "idle" && state.kind !== "submitting") setState({ kind: "idle" });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fieldErrors = validateLocally(values);
    if (Object.keys(fieldErrors).length) {
      setState({ kind: "error", message: "The approval needs safe required fields before it can be submitted.", details: ["Use customer-safe summaries only and keep approval copy clear, bounded, and reviewable."], fieldErrors });
      return;
    }

    setState({ kind: "submitting" });
    try {
      const response = await fetch("/api/admin/support/approvals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json().catch(() => null)) as ApprovalApiResponse | null;
      if (!response.ok || !data) {
        setState({ kind: "error", message: "The approval could not be stored safely.", details: [], fieldErrors: {} });
        return;
      }
      if (!data.ok) {
        setState({ kind: "error", message: data.error ?? "The approval could not be stored safely.", details: Array.isArray(data.details) ? data.details : [], fieldErrors: data.fieldErrors ?? {} });
        return;
      }
      setState({ kind: "success", response: data });
      setValues((current) => ({ ...current, customerSafeSummary: "", customerSafeOutcomeCopy: "" }));
    } catch {
      setState({ kind: "error", message: "The approval service could not be reached.", details: ["Use a verified operator session with fresh reauthentication and try again."], fieldErrors: {} });
    }
  }

  return (
    <section className="system-panel-authority rounded-[2rem] p-6">
      <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">Guarded approval</div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">Approve safe corrections with audit.</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
        This panel submits safe-correction approvals only. It requires protected operator access, fresh reauthentication, immutable audit creation, and safe approval projection.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 grid gap-5">
        <div className="grid gap-4 lg:grid-cols-2">
          <ApprovalInput name="supportRequestId" label="Support request ID" value={values.supportRequestId} onChange={handleChange} error={getFieldError(state, localFieldErrors, "supportRequestId")} />
          <ApprovalInput name="customerIdHash" label="Server-side customer ownership hash" value={values.customerIdHash} onChange={handleChange} error={getFieldError(state, localFieldErrors, "customerIdHash")} />
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          <ApprovalSelect name="approvalGate" label="Approval gate" value={values.approvalGate} options={APPROVAL_GATE_OPTIONS} onChange={handleChange} error={getFieldError(state, localFieldErrors, "approvalGate")} />
          <ApprovalSelect name="requestedByRole" label="Requester role" value={values.requestedByRole} options={REQUESTED_ROLE_OPTIONS} onChange={handleChange} error={getFieldError(state, localFieldErrors, "requestedByRole")} />
          <ApprovalSelect name="reviewerRole" label="Reviewer role" value={values.reviewerRole} options={REVIEWER_ROLE_OPTIONS} onChange={handleChange} error={getFieldError(state, localFieldErrors, "reviewerRole")} />
          <ApprovalSelect name="decision" label="Decision" value={values.decision} options={DECISION_OPTIONS} onChange={handleChange} error={getFieldError(state, localFieldErrors, "decision")} />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <ApprovalSelect name="state" label="Approval state" value={values.state} options={STATE_OPTIONS} onChange={handleChange} error={getFieldError(state, localFieldErrors, "state")} />
          <ApprovalInput name="reasonCode" label="Safe reason code" value={values.reasonCode} onChange={handleChange} error={getFieldError(state, localFieldErrors, "reasonCode")} />
        </div>

        <ApprovalTextarea name="customerSafeSummary" label="Customer-safe approval summary" value={values.customerSafeSummary} onChange={handleChange} error={getFieldError(state, localFieldErrors, "customerSafeSummary")} placeholder="Summarize the review reason using safe, customer-appropriate context only." />
        <ApprovalTextarea name="customerSafeOutcomeCopy" label="Customer-safe outcome copy" value={values.customerSafeOutcomeCopy} onChange={handleChange} error={getFieldError(state, localFieldErrors, "customerSafeOutcomeCopy")} placeholder="Required for approvals. Use clear, bounded, customer-safe outcome language." />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button type="submit" disabled={!canSubmit} className="rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60">
            {state.kind === "submitting" ? "Submitting approval..." : "Submit guarded approval"}
          </button>
          <div className="text-xs leading-6 text-slate-400">Only safe-correction approval records are created by this panel.</div>
        </div>
      </form>

      {state.kind === "success" ? (
        <div className="mt-6 rounded-[1.5rem] border border-emerald-300/20 bg-emerald-300/10 p-5">
          <div className="text-sm font-semibold text-emerald-50">Approval stored with safe projection.</div>
          <div className="mt-3 grid gap-2 text-xs leading-6 text-emerald-50/80 sm:grid-cols-2">
            <div>Approval ID: {state.response.approval.approvalId}</div>
            <div>Support request: {state.response.approval.supportRequestId}</div>
            <div>Gate: {state.response.approval.approvalGate}</div>
            <div>Decision: {state.response.approval.decision}</div>
            <div>State: {state.response.approval.state}</div>
            <div>Audit recorded: {state.response.auditRecorded ? "yes" : "no"}</div>
          </div>
        </div>
      ) : null}

      {state.kind === "error" ? (
        <div className="mt-6 rounded-[1.5rem] border border-rose-300/20 bg-rose-300/10 p-5">
          <div className="text-sm font-semibold text-rose-50">{state.message}</div>
          {state.details.length ? <div className="mt-3 grid gap-2">{state.details.map((detail) => <div key={detail} className="rounded-2xl border border-white/10 bg-black/20 p-3 text-xs leading-6 text-rose-50/80">{detail}</div>)}</div> : null}
        </div>
      ) : null}
    </section>
  );
}

function ApprovalInput({ name, label, value, onChange, error }: { name: keyof ApprovalFormValues; label: string; value: string; onChange: (event: ChangeEvent<HTMLInputElement>) => void; error?: string }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-white">{label}</span>
      <input name={name} value={value} onChange={onChange} maxLength={160} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/50" />
      <FieldError message={error} />
    </label>
  );
}

function ApprovalSelect({ name, label, value, options, onChange, error }: { name: keyof ApprovalFormValues; label: string; value: string; options: readonly (readonly [string, string])[]; onChange: (event: ChangeEvent<HTMLSelectElement>) => void; error?: string }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-white">{label}</span>
      <select name={name} value={value} onChange={onChange} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/50">
        {options.map(([optionValue, labelText]) => <option key={optionValue} value={optionValue}>{labelText}</option>)}
      </select>
      <FieldError message={error} />
    </label>
  );
}

function ApprovalTextarea({ name, label, value, onChange, error, placeholder }: { name: keyof ApprovalFormValues; label: string; value: string; onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void; error?: string; placeholder: string }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-white">{label}</span>
      <textarea name={name} value={value} onChange={onChange} maxLength={600} rows={4} placeholder={placeholder} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm leading-7 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50" />
      <div className="flex justify-between gap-3 text-xs text-slate-400"><span>Minimum 20 characters when required. Maximum 600.</span><span>{value.length}/600</span></div>
      <FieldError message={error} />
    </label>
  );
}

function validateLocally(values: ApprovalFormValues) {
  const errors: Partial<Record<keyof ApprovalFormValues, string>> = {};
  if (!values.supportRequestId.trim()) errors.supportRequestId = "Support request ID is required.";
  if (!values.customerIdHash.trim()) errors.customerIdHash = "Server-side customer ownership hash is required.";
  if (!values.reasonCode.trim()) errors.reasonCode = "Safe reason code is required.";
  if (values.customerSafeSummary.trim().length < 20) errors.customerSafeSummary = "Customer-safe approval summary must be at least 20 characters.";
  if (values.decision === "approve" && values.customerSafeOutcomeCopy.trim().length < 20) errors.customerSafeOutcomeCopy = "Customer-safe outcome copy is required before approval.";
  return errors;
}

function getFieldError(state: SubmitState, localErrors: Partial<Record<keyof ApprovalFormValues, string>>, key: keyof ApprovalFormValues) {
  if (state.kind === "error" && state.fieldErrors[key]) return state.fieldErrors[key];
  return localErrors[key];
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <span className="text-xs font-medium text-rose-200">{message}</span>;
}
