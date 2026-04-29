"use client";

import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";

type AssignmentFormValues = {
  supportRequestId: string;
  customerIdHash: string;
  assignedRole: "support-triage" | "support-specialist" | "billing-approver" | "security-reviewer" | "support-admin";
  assignmentState: "triage-assigned" | "specialist-assigned" | "billing-assigned" | "security-assigned" | "admin-review" | "released";
  decision: "assign" | "hold" | "release" | "escalate" | "deny";
  reasonCode: string;
  customerSafeSummary: string;
};

type SafeAssignmentProjection = {
  assignmentId: string;
  supportRequestId: string;
  assignedRole: AssignmentFormValues["assignedRole"];
  assignmentState: AssignmentFormValues["assignmentState"] | "unassigned";
  decision: AssignmentFormValues["decision"];
  reasonCode: string;
  customerSafeSummary: string;
  createdAt: string;
  updatedAt: string;
  auditEventId: string;
};

type AssignmentApiSuccess = {
  ok: true;
  assignment: SafeAssignmentProjection;
  auditRecorded: true;
  projection: "operator-assignment-safe";
};

type AssignmentApiError = {
  ok: false;
  error?: string;
  details?: string[];
  fieldErrors?: Partial<Record<keyof AssignmentFormValues, string>>;
};

type AssignmentApiResponse = AssignmentApiSuccess | AssignmentApiError;

type SubmitState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; response: AssignmentApiSuccess }
  | { kind: "error"; message: string; details: string[]; fieldErrors: Partial<Record<keyof AssignmentFormValues, string>> };

const INITIAL_VALUES: AssignmentFormValues = {
  supportRequestId: "",
  customerIdHash: "",
  assignedRole: "support-triage",
  assignmentState: "triage-assigned",
  decision: "assign",
  reasonCode: "operator-safe-assignment",
  customerSafeSummary: "",
};

const ASSIGNED_ROLE_OPTIONS = [
  ["support-triage", "Support triage"],
  ["support-specialist", "Support specialist"],
  ["billing-approver", "Billing approver"],
  ["security-reviewer", "Security reviewer"],
  ["support-admin", "Support admin"],
] as const;

const ASSIGNMENT_STATE_OPTIONS = [
  ["triage-assigned", "Triage assigned"],
  ["specialist-assigned", "Specialist assigned"],
  ["billing-assigned", "Billing assigned"],
  ["security-assigned", "Security assigned"],
  ["admin-review", "Admin review"],
  ["released", "Released"],
] as const;

const DECISION_OPTIONS = [
  ["assign", "Assign"],
  ["hold", "Hold"],
  ["release", "Release"],
  ["escalate", "Escalate"],
  ["deny", "Deny"],
] as const;

export function OperatorAssignmentPanel() {
  const [values, setValues] = useState<AssignmentFormValues>(INITIAL_VALUES);
  const [state, setState] = useState<SubmitState>({ kind: "idle" });
  const localFieldErrors = useMemo(() => validateLocally(values), [values]);
  const canSubmit = Object.keys(localFieldErrors).length === 0 && state.kind !== "submitting";

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const name = event.target.name as keyof AssignmentFormValues;
    const value = event.target.value;
    setValues((current) => ({ ...current, [name]: value }));
    if (state.kind !== "idle" && state.kind !== "submitting") setState({ kind: "idle" });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fieldErrors = validateLocally(values);
    if (Object.keys(fieldErrors).length) {
      setState({ kind: "error", message: "The assignment needs safe required fields before it can be submitted.", details: ["Use safe summaries only. Do not paste raw materials, private financial data, credentials, internal notes, or attack details."], fieldErrors });
      return;
    }

    setState({ kind: "submitting" });
    try {
      const response = await fetch("/api/admin/support/assignments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json().catch(() => null)) as AssignmentApiResponse | null;
      if (!response.ok || !data) {
        setState({ kind: "error", message: "The assignment could not be stored safely.", details: [], fieldErrors: {} });
        return;
      }
      if (!data.ok) {
        setState({ kind: "error", message: data.error ?? "The assignment could not be stored safely.", details: Array.isArray(data.details) ? data.details : [], fieldErrors: data.fieldErrors ?? {} });
        return;
      }
      setState({ kind: "success", response: data });
      setValues((current) => ({ ...current, customerSafeSummary: "" }));
    } catch {
      setState({ kind: "error", message: "The assignment service could not be reached.", details: ["Use a verified operator session with fresh reauthentication and try again."], fieldErrors: {} });
    }
  }

  return (
    <section className="system-panel-authority rounded-[2rem] p-6">
      <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">Guarded assignment</div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">Assign support safely with audit.</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
        This panel calls the guarded assignment API. It requires server-side operator access, fresh reauthentication, immutable audit creation, and safe assignment projection. Use customer-safe summaries only.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 grid gap-5">
        <div className="grid gap-4 lg:grid-cols-2">
          <AssignmentInput name="supportRequestId" label="Support request ID" value={values.supportRequestId} onChange={handleChange} error={getFieldError(state, localFieldErrors, "supportRequestId")} />
          <AssignmentInput name="customerIdHash" label="Server-side customer ownership hash" value={values.customerIdHash} onChange={handleChange} error={getFieldError(state, localFieldErrors, "customerIdHash")} />
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <AssignmentSelect name="assignedRole" label="Assigned role" value={values.assignedRole} options={ASSIGNED_ROLE_OPTIONS} onChange={handleChange} error={getFieldError(state, localFieldErrors, "assignedRole")} />
          <AssignmentSelect name="assignmentState" label="Assignment state" value={values.assignmentState} options={ASSIGNMENT_STATE_OPTIONS} onChange={handleChange} error={getFieldError(state, localFieldErrors, "assignmentState")} />
          <AssignmentSelect name="decision" label="Decision" value={values.decision} options={DECISION_OPTIONS} onChange={handleChange} error={getFieldError(state, localFieldErrors, "decision")} />
        </div>

        <AssignmentInput name="reasonCode" label="Safe reason code" value={values.reasonCode} onChange={handleChange} error={getFieldError(state, localFieldErrors, "reasonCode")} />

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-white">Customer-safe assignment summary</span>
          <textarea
            name="customerSafeSummary"
            value={values.customerSafeSummary}
            onChange={handleChange}
            maxLength={600}
            rows={5}
            placeholder="Summarize the assignment reason using safe, customer-appropriate context only."
            className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm leading-7 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
          />
          <div className="flex justify-between gap-3 text-xs text-slate-400"><span>Minimum 20 characters. Maximum 600.</span><span>{values.customerSafeSummary.length}/600</span></div>
          <FieldError message={getFieldError(state, localFieldErrors, "customerSafeSummary")} />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button type="submit" disabled={!canSubmit} className="rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60">
            {state.kind === "submitting" ? "Submitting assignment..." : "Submit guarded assignment"}
          </button>
          <div className="text-xs leading-6 text-slate-400">No customer-visible operator identity is created by this panel.</div>
        </div>
      </form>

      {state.kind === "success" ? (
        <div className="mt-6 rounded-[1.5rem] border border-emerald-300/20 bg-emerald-300/10 p-5">
          <div className="text-sm font-semibold text-emerald-50">Assignment stored with safe projection.</div>
          <div className="mt-3 grid gap-2 text-xs leading-6 text-emerald-50/80 sm:grid-cols-2">
            <div>Assignment ID: {state.response.assignment.assignmentId}</div>
            <div>Support request: {state.response.assignment.supportRequestId}</div>
            <div>Role: {state.response.assignment.assignedRole}</div>
            <div>State: {state.response.assignment.assignmentState}</div>
            <div>Decision: {state.response.assignment.decision}</div>
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

function AssignmentInput({ name, label, value, onChange, error }: { name: keyof AssignmentFormValues; label: string; value: string; onChange: (event: ChangeEvent<HTMLInputElement>) => void; error?: string }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-white">{label}</span>
      <input name={name} value={value} onChange={onChange} maxLength={160} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50" />
      <FieldError message={error} />
    </label>
  );
}

function AssignmentSelect({ name, label, value, options, onChange, error }: { name: keyof AssignmentFormValues; label: string; value: string; options: readonly (readonly [string, string])[]; onChange: (event: ChangeEvent<HTMLSelectElement>) => void; error?: string }) {
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

function validateLocally(values: AssignmentFormValues) {
  const errors: Partial<Record<keyof AssignmentFormValues, string>> = {};
  if (!values.supportRequestId.trim()) errors.supportRequestId = "Support request ID is required.";
  if (!values.customerIdHash.trim()) errors.customerIdHash = "Server-side customer ownership hash is required.";
  if (!values.reasonCode.trim()) errors.reasonCode = "Safe reason code is required.";
  if (values.customerSafeSummary.trim().length < 20) errors.customerSafeSummary = "Customer-safe assignment summary must be at least 20 characters.";
  return errors;
}

function getFieldError(state: SubmitState, localErrors: Partial<Record<keyof AssignmentFormValues, string>>, key: keyof AssignmentFormValues) {
  if (state.kind === "error" && state.fieldErrors[key]) return state.fieldErrors[key];
  return localErrors[key];
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <span className="text-xs font-medium text-rose-200">{message}</span>;
}
