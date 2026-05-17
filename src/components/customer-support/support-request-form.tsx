"use client";

import Link from "next/link";
import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { CENDORQ_WORK_START_GATES, type CendorqWorkStartGateKey } from "@/lib/cendorq-work-start-intake-gates";
import { CUSTOMER_SUPPORT_INTAKE_FLOWS, type CustomerSupportIntakeType } from "@/lib/customer-support-intake-architecture";

type SupportRequestFormValues = { requestType: CustomerSupportIntakeType; workStartGate: CendorqWorkStartGateKey; businessContext: string; safeDescription: string; customerAcknowledgement: boolean };
type SupportRequestApiSuccess = { ok: true; supportRequestId: string; requestType: CustomerSupportIntakeType; workStartGate: CendorqWorkStartGateKey; workStartPlanKey: string; decision: "allow" | "sanitize" | "challenge" | "block" | "quarantine"; operatorReviewRequired: boolean; downstreamProcessingAllowed: boolean; message: string };
type SupportRequestApiError = { ok: false; error?: string; details?: string[]; fieldErrors?: Partial<Record<keyof SupportRequestFormValues, string>> };
type SupportRequestApiResponse = SupportRequestApiSuccess | SupportRequestApiError;
type SubmitState = { kind: "idle" } | { kind: "submitting" } | { kind: "success"; response: SupportRequestApiSuccess } | { kind: "error"; message: string; details: string[]; fieldErrors: Partial<Record<keyof SupportRequestFormValues, string>> };
type HeldReportPreset = { label: string; context: string; description: string; workStartGate: CendorqWorkStartGateKey };

const INITIAL_VALUES: SupportRequestFormValues = { requestType: "report-question", workStartGate: "review-intake", businessContext: "", safeDescription: "", customerAcknowledgement: false };
const SECRET_WARNING = "Do not include passwords, raw tokens, payment data, secrets, private keys, raw evidence dumps, raw security payloads, or private report internals.";
const HELD_REPORT_PRESETS = [
  { label: "Deep Review held report", context: "Deep Review report status", description: "I need help understanding why my Deep Review report is still held. Please check entitlement, release approval, and approved PDF readiness without using private report internals.", workStartGate: "review-intake" },
  { label: "Build Fix held summary", context: "Build Fix delivery summary status", description: "I need help understanding why my Build Fix delivery summary is still held. Please check approved scope, release approval, and approved PDF readiness without using raw internal notes.", workStartGate: "repair-prerequisites" },
  { label: "Ongoing Control held summary", context: "Ongoing Control monthly summary status", description: "I need help understanding why my Ongoing Control monthly summary is still held. Please check subscription, monthly scope, release approval, and approved PDF readiness without using raw evidence.", workStartGate: "control-baseline" },
] as const satisfies readonly HeldReportPreset[];
const INPUT_CLASS = "rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-200/70";
const BUTTON_PRIMARY = "rounded-2xl border border-cyan-200 bg-white px-5 py-3 text-sm font-bold text-slate-950 shadow-sm transition hover:border-cyan-300 hover:bg-cyan-50 disabled:cursor-not-allowed disabled:opacity-60";
const BUTTON_SECONDARY = "rounded-2xl border border-cyan-100 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-slate-950";

export function SupportRequestForm() {
  const [values, setValues] = useState<SupportRequestFormValues>(INITIAL_VALUES);
  const [state, setState] = useState<SubmitState>({ kind: "idle" });
  const selectedFlow = useMemo(() => CUSTOMER_SUPPORT_INTAKE_FLOWS.find((flow) => flow.key === values.requestType) ?? CUSTOMER_SUPPORT_INTAKE_FLOWS[0], [values.requestType]);
  const selectedGate = useMemo(() => CENDORQ_WORK_START_GATES.find((gate) => gate.key === values.workStartGate) ?? CENDORQ_WORK_START_GATES[0], [values.workStartGate]);
  const localFieldErrors = useMemo(() => validateLocally(values), [values]);
  const canSubmit = Object.keys(localFieldErrors).length === 0 && state.kind !== "submitting";

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const target = event.target;
    const name = target.name as keyof SupportRequestFormValues;
    const nextValue = target instanceof HTMLInputElement && target.type === "checkbox" ? target.checked : target.value;
    setValues((current) => ({ ...current, [name]: nextValue }));
    if (state.kind !== "idle" && state.kind !== "submitting") setState({ kind: "idle" });
  }

  function applyHeldReportPreset(preset: HeldReportPreset) {
    setValues({ requestType: "report-question", workStartGate: preset.workStartGate, businessContext: preset.context, safeDescription: preset.description, customerAcknowledgement: true });
    if (state.kind !== "idle" && state.kind !== "submitting") setState({ kind: "idle" });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fieldErrors = validateLocally(values);
    if (Object.keys(fieldErrors).length > 0) {
      setState({ kind: "error", message: "The request needs a safe summary before it can be submitted.", details: [SECRET_WARNING], fieldErrors });
      return;
    }
    setState({ kind: "submitting" });
    try {
      const response = await fetch("/api/customer/support/request", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const data = (await response.json().catch(() => null)) as SupportRequestApiResponse | null;
      if (!response.ok || !data) { setState({ kind: "error", message: "The support request could not be submitted cleanly.", details: [], fieldErrors: {} }); return; }
      if (!data.ok) { setState({ kind: "error", message: data.error ?? "The support request could not be submitted cleanly.", details: Array.isArray(data.details) ? data.details : [], fieldErrors: data.fieldErrors ?? {} }); return; }
      setState({ kind: "success", response: data });
      setValues(INITIAL_VALUES);
    } catch {
      setState({ kind: "error", message: "The support request service could not be reached right now.", details: ["Try again from the authenticated dashboard support path."], fieldErrors: {} });
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.055)]">
      <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Submit the context Cendorq needs before work starts.</h2>
      <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{SECRET_WARNING}</p>
      <div className="mt-6 rounded-[1.25rem] border border-cyan-100 bg-cyan-50/55 p-4">
        <div className="text-sm font-semibold text-slate-950">Held paid report question</div>
        <p className="mt-2 text-xs font-medium leading-6 text-slate-600">Use a safe preset when a paid report route says the final output is still held. Presets never include private report content, raw evidence, or internal notes.</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {HELD_REPORT_PRESETS.map((preset) => <button key={preset.label} type="button" onClick={() => applyHeldReportPreset(preset)} className={BUTTON_SECONDARY}>{preset.label}</button>)}
        </div>
      </div>
      <div className="mt-6 grid gap-5">
        <label className="grid gap-2"><span className="text-sm font-semibold text-slate-800">Cendorq work-start gate</span><select name="workStartGate" value={values.workStartGate} onChange={handleChange} className={INPUT_CLASS}>{CENDORQ_WORK_START_GATES.map((gate) => <option key={gate.key} value={gate.key}>{gate.customerTitle}</option>)}</select><FieldError message={getFieldError(state, localFieldErrors, "workStartGate")} /></label>
        <div className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/55 p-4"><div className="text-sm font-semibold text-slate-950">{selectedGate.customerSafeAction}</div><p className="mt-2 text-xs font-medium leading-6 text-slate-600">{selectedGate.customerPromise}</p><p className="mt-3 text-xs font-semibold leading-6 text-amber-700">{selectedGate.blockedPattern}</p></div>
        <label className="grid gap-2"><span className="text-sm font-semibold text-slate-800">Request type</span><select name="requestType" value={values.requestType} onChange={handleChange} className={INPUT_CLASS}>{CUSTOMER_SUPPORT_INTAKE_FLOWS.map((flow) => <option key={flow.key} value={flow.key}>{flow.label}</option>)}</select></label>
        <div className="rounded-[1.25rem] border border-cyan-100 bg-white p-4"><div className="text-sm font-semibold text-slate-950">{selectedFlow.primaryOutcome}</div><p className="mt-2 text-xs font-medium leading-6 text-slate-600">{selectedFlow.purpose}</p></div>
        <label className="grid gap-2"><span className="text-sm font-semibold text-slate-800">Business or account context</span><input name="businessContext" value={values.businessContext} onChange={handleChange} maxLength={160} placeholder="Business name, website, account area, report, repair target, or control baseline" className={INPUT_CLASS} aria-invalid={Boolean(getFieldError(state, localFieldErrors, "businessContext"))} /><FieldError message={getFieldError(state, localFieldErrors, "businessContext")} /></label>
        <label className="grid gap-2"><span className="text-sm font-semibold text-slate-800">Safe description</span><textarea name="safeDescription" value={values.safeDescription} onChange={handleChange} maxLength={1400} rows={8} placeholder="Summarize the context needed for this gate. Do not paste secrets or raw evidence." className={`${INPUT_CLASS} leading-7`} aria-invalid={Boolean(getFieldError(state, localFieldErrors, "safeDescription"))} /><div className="flex items-center justify-between gap-3 text-xs text-slate-500"><span>Minimum 20 characters. Maximum 1,400.</span><span>{values.safeDescription.length}/1400</span></div><FieldError message={getFieldError(state, localFieldErrors, "safeDescription")} /></label>
        <div className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/45 p-4"><div className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-700">Required before queue</div><ul className="mt-3 grid gap-2 text-xs font-medium leading-6 text-slate-600">{selectedGate.requiredBeforeQueue.slice(0, 5).map((item) => <li key={item}>• {item}</li>)}</ul></div>
        <label className="flex gap-3 rounded-[1.25rem] border border-cyan-100 bg-white p-4 text-sm font-medium leading-7 text-slate-700"><input name="customerAcknowledgement" type="checkbox" checked={values.customerAcknowledgement} onChange={handleChange} className="mt-1 h-4 w-4 shrink-0 accent-cyan-500" aria-invalid={Boolean(getFieldError(state, localFieldErrors, "customerAcknowledgement"))} /><span>I confirm this request does not include passwords, raw tokens, payment details, secrets, private keys, raw evidence dumps, raw security payloads, or private report internals.</span></label><FieldError message={getFieldError(state, localFieldErrors, "customerAcknowledgement")} />
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"><button type="submit" disabled={!canSubmit} className={BUTTON_PRIMARY}>{state.kind === "submitting" ? "Submitting protected intake..." : "Submit protected intake"}</button><button type="button" onClick={() => { setValues(INITIAL_VALUES); setState({ kind: "idle" }); }} className={BUTTON_SECONDARY}>Clear form</button></div>
      {state.kind === "success" ? <div className="mt-6 rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-5"><div className="text-sm font-semibold text-emerald-950">{state.response.message}</div><div className="mt-3 grid gap-2 text-xs font-medium leading-6 text-emerald-900 sm:grid-cols-2"><div>Request ID: {state.response.supportRequestId}</div><div>Gate: {state.response.workStartGate}</div><div>Plan: {state.response.workStartPlanKey}</div><div>Decision: {state.response.decision}</div><div>Operator review: {state.response.operatorReviewRequired ? "required" : "not required"}</div><div>Processing: {state.response.downstreamProcessingAllowed ? "allowed" : "held"}</div></div><div className="mt-5 flex flex-col gap-3 sm:flex-row"><Link href="/dashboard/support/status" className={BUTTON_PRIMARY}>Track this request safely</Link><Link href="/dashboard/support" className={BUTTON_SECONDARY}>Back to support center</Link></div><p className="mt-4 text-xs font-medium leading-6 text-emerald-900">Status tracking uses customer-safe projection only and never reveals internal notes, operator identities, risk-scoring details, raw evidence, billing data, session tokens, or support secrets.</p></div> : null}
      {state.kind === "error" ? <div className="mt-6 rounded-[1.5rem] border border-rose-200 bg-rose-50 p-5"><div className="text-sm font-semibold text-rose-900">{state.message}</div>{state.details.length > 0 ? <div className="mt-3 grid gap-2">{state.details.map((detail) => <div key={detail} className="rounded-2xl border border-rose-200 bg-white p-3 text-xs font-medium leading-6 text-rose-800">{detail}</div>)}</div> : null}</div> : null}
      <div className="sr-only">Light support request form. No black support form blocks. No dark blue support form blocks. Held paid report question. Deep Review held report. Build Fix held summary. Ongoing Control held summary. No private report content. No raw evidence. No internal notes.</div>
    </form>
  );
}

function validateLocally(values: SupportRequestFormValues) { const errors: Partial<Record<keyof SupportRequestFormValues, string>> = {}; if (!values.workStartGate) errors.workStartGate = "Choose a work-start gate."; if (!values.businessContext.trim()) errors.businessContext = "Business or account context is required."; if (values.safeDescription.trim().length < 20) errors.safeDescription = "A safe description of at least 20 characters is required."; if (!values.customerAcknowledgement) errors.customerAcknowledgement = "Safety acknowledgement is required before submit."; return errors; }
function getFieldError(state: SubmitState, localErrors: Partial<Record<keyof SupportRequestFormValues, string>>, key: keyof SupportRequestFormValues) { if (state.kind === "error" && state.fieldErrors[key]) return state.fieldErrors[key]; return localErrors[key]; }
function FieldError({ message }: { message?: string }) { if (!message) return null; return <span className="text-xs font-medium text-rose-600">{message}</span>; }
