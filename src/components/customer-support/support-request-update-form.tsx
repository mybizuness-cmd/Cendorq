"use client";

import Link from "next/link";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";

type SupportRequestUpdateFormValues = { supportRequestId: string; safeUpdateSummary: string; customerAcknowledgement: boolean };
type SupportRequestUpdateApiSuccess = { ok: true; supportRequestId: string; status: "reviewing"; message: string; rawPayloadStored: false; customerSafeProjectionOnly: true };
type SupportRequestUpdateApiError = { ok: false; error?: string; details?: string[]; fieldErrors?: Partial<Record<keyof SupportRequestUpdateFormValues, string>> };
type SupportRequestUpdateApiResponse = SupportRequestUpdateApiSuccess | SupportRequestUpdateApiError;
type SubmitState = { kind: "idle" } | { kind: "submitting" } | { kind: "success"; response: SupportRequestUpdateApiSuccess } | { kind: "error"; message: string; details: string[]; fieldErrors: Partial<Record<keyof SupportRequestUpdateFormValues, string>> };

const INITIAL_VALUES: SupportRequestUpdateFormValues = { supportRequestId: "", safeUpdateSummary: "", customerAcknowledgement: false };
const UPDATE_WARNING = "Summarize what changed without pasting passwords, tokens, payment data, raw evidence, raw security payloads, or private report internals.";
const INPUT_CLASS = "rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-200/70";
const BUTTON_PRIMARY = "rounded-2xl border border-cyan-200 bg-white px-5 py-3 text-sm font-bold text-slate-950 shadow-sm transition hover:border-cyan-300 hover:bg-cyan-50 disabled:cursor-not-allowed disabled:opacity-60";
const BUTTON_SECONDARY = "rounded-2xl border border-cyan-100 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-slate-950";

export function SupportRequestUpdateForm() {
  const [values, setValues] = useState<SupportRequestUpdateFormValues>(INITIAL_VALUES);
  const [state, setState] = useState<SubmitState>({ kind: "idle" });
  const [routeUpdateId, setRouteUpdateId] = useState("");

  useEffect(() => {
    const nextUpdateId = new URL(window.location.href).searchParams.get("update")?.trim() ?? "";
    setRouteUpdateId(nextUpdateId);
    if (nextUpdateId) setValues((current) => ({ ...current, supportRequestId: nextUpdateId.slice(0, 120) }));
  }, []);

  const localFieldErrors = validateLocally(values);
  const canSubmit = Object.keys(localFieldErrors).length === 0 && state.kind !== "submitting";

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const target = event.target;
    const name = target.name as keyof SupportRequestUpdateFormValues;
    const nextValue = target instanceof HTMLInputElement && target.type === "checkbox" ? target.checked : target.value;
    setValues((current) => ({ ...current, [name]: nextValue }));
    if (state.kind !== "idle" && state.kind !== "submitting") setState({ kind: "idle" });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fieldErrors = validateLocally(values);
    if (Object.keys(fieldErrors).length > 0) { setState({ kind: "error", message: "The support update needs a safe summary before it can be submitted.", details: [UPDATE_WARNING], fieldErrors }); return; }
    setState({ kind: "submitting" });
    try {
      const response = await fetch("/api/customer/support/request/update", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const data = (await response.json().catch(() => null)) as SupportRequestUpdateApiResponse | null;
      if (!response.ok || !data) { setState({ kind: "error", message: "The support update could not be submitted cleanly.", details: [], fieldErrors: {} }); return; }
      if (!data.ok) { setState({ kind: "error", message: data.error ?? "The support update could not be submitted cleanly.", details: Array.isArray(data.details) ? data.details : [], fieldErrors: data.fieldErrors ?? {} }); return; }
      setState({ kind: "success", response: data });
      setValues({ supportRequestId: values.supportRequestId, safeUpdateSummary: "", customerAcknowledgement: false });
    } catch {
      setState({ kind: "error", message: "The support update service could not be reached right now.", details: ["Open the update path from support status and try again."], fieldErrors: {} });
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.055)]">
      <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Update a waiting support request safely.</h2>
      <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{UPDATE_WARNING}</p>
      <div className="mt-4 rounded-[1.25rem] border border-cyan-100 bg-cyan-50/55 p-4 text-xs font-medium leading-6 text-slate-600">
        Use this panel when support status asks for a safer customer summary. Cendorq does not show rejected raw content here and does not ask you to paste sensitive records again.
      </div>
      <div className="mt-6 grid gap-5">
        <label className="grid gap-2"><span className="text-sm font-semibold text-slate-800">Support request ID</span><input name="supportRequestId" value={values.supportRequestId} onChange={handleChange} maxLength={120} placeholder="Open from /dashboard/support/status or paste the request ID" className={INPUT_CLASS} aria-invalid={Boolean(getFieldError(state, localFieldErrors, "supportRequestId"))} />{routeUpdateId ? <span className="text-xs text-cyan-700">Loaded from update link.</span> : <span className="text-xs text-slate-500">The safest path is from support status using the update link.</span>}<FieldError message={getFieldError(state, localFieldErrors, "supportRequestId")} /></label>
        <label className="grid gap-2"><span className="text-sm font-semibold text-slate-800">Safe update summary</span><textarea name="safeUpdateSummary" value={values.safeUpdateSummary} onChange={handleChange} maxLength={1400} rows={7} placeholder="Explain the corrected or safer summary in your own words. Do not paste secrets, payment data, raw evidence, or security payloads." className={`${INPUT_CLASS} leading-7`} aria-invalid={Boolean(getFieldError(state, localFieldErrors, "safeUpdateSummary"))} /><div className="flex items-center justify-between gap-3 text-xs text-slate-500"><span>Minimum 20 characters. Maximum 1,400.</span><span>{values.safeUpdateSummary.length}/1400</span></div><FieldError message={getFieldError(state, localFieldErrors, "safeUpdateSummary")} /></label>
        <label className="flex gap-3 rounded-[1.25rem] border border-cyan-100 bg-white p-4 text-sm font-medium leading-7 text-slate-700"><input name="customerAcknowledgement" type="checkbox" checked={values.customerAcknowledgement} onChange={handleChange} className="mt-1 h-4 w-4 shrink-0 accent-cyan-500" aria-invalid={Boolean(getFieldError(state, localFieldErrors, "customerAcknowledgement"))} /><span>I confirm this update does not include passwords, raw tokens, payment details, secrets, private keys, raw evidence dumps, raw security payloads, or private report internals.</span></label><FieldError message={getFieldError(state, localFieldErrors, "customerAcknowledgement")} />
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"><button type="submit" disabled={!canSubmit} className={BUTTON_PRIMARY}>{state.kind === "submitting" ? "Submitting safe update..." : "Submit safe update"}</button><Link href="/dashboard/support/status" className={BUTTON_SECONDARY}>Back to support status</Link></div>
      {state.kind === "success" ? <div className="mt-6 rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-5"><div className="text-sm font-semibold text-emerald-950">{state.response.message}</div><div className="mt-3 grid gap-2 text-xs font-medium leading-6 text-emerald-900 sm:grid-cols-2"><div>Request ID: {state.response.supportRequestId}</div><div>Status: {state.response.status}</div><div>Raw payload stored: {state.response.rawPayloadStored ? "yes" : "no"}</div><div>Projection: {state.response.customerSafeProjectionOnly ? "customer-safe only" : "not available"}</div></div><div className="mt-5 flex flex-col gap-3 sm:flex-row"><Link href="/dashboard/support/status" className={BUTTON_PRIMARY}>Track updated request</Link><Link href="/dashboard/support" className={BUTTON_SECONDARY}>Back to support center</Link></div></div> : null}
      {state.kind === "error" ? <div className="mt-6 rounded-[1.5rem] border border-rose-200 bg-rose-50 p-5"><div className="text-sm font-semibold text-rose-900">{state.message}</div>{state.details.length > 0 ? <div className="mt-3 grid gap-2">{state.details.map((detail) => <div key={detail} className="rounded-2xl border border-rose-200 bg-white p-3 text-xs font-medium leading-6 text-rose-800">{detail}</div>)}</div> : null}</div> : null}
      <div className="sr-only">Light support update form. No black support update blocks. No dark blue support update blocks.</div>
    </form>
  );
}

function validateLocally(values: SupportRequestUpdateFormValues) { const errors: Partial<Record<keyof SupportRequestUpdateFormValues, string>> = {}; if (!values.supportRequestId.trim()) errors.supportRequestId = "Support request ID is required."; if (values.safeUpdateSummary.trim().length < 20) errors.safeUpdateSummary = "A safe update summary of at least 20 characters is required."; if (!values.customerAcknowledgement) errors.customerAcknowledgement = "Safety acknowledgement is required before update."; return errors; }
function getFieldError(state: SubmitState, localErrors: Partial<Record<keyof SupportRequestUpdateFormValues, string>>, key: keyof SupportRequestUpdateFormValues) { if (state.kind === "error" && state.fieldErrors[key]) return state.fieldErrors[key]; return localErrors[key]; }
function FieldError({ message }: { message?: string }) { if (!message) return null; return <span className="text-xs font-medium text-rose-600">{message}</span>; }
