"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";

type SupportRequestUpdateFormValues = {
  supportRequestId: string;
  safeUpdateSummary: string;
  customerAcknowledgement: boolean;
};

type SupportRequestUpdateApiSuccess = {
  ok: true;
  supportRequestId: string;
  status: "reviewing";
  message: string;
  rawPayloadStored: false;
  customerSafeProjectionOnly: true;
};

type SupportRequestUpdateApiError = {
  ok: false;
  error?: string;
  details?: string[];
  fieldErrors?: Partial<Record<keyof SupportRequestUpdateFormValues, string>>;
};

type SupportRequestUpdateApiResponse = SupportRequestUpdateApiSuccess | SupportRequestUpdateApiError;

type SubmitState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; response: SupportRequestUpdateApiSuccess }
  | { kind: "error"; message: string; details: string[]; fieldErrors: Partial<Record<keyof SupportRequestUpdateFormValues, string>> };

const INITIAL_VALUES: SupportRequestUpdateFormValues = {
  supportRequestId: "",
  safeUpdateSummary: "",
  customerAcknowledgement: false,
};

const UPDATE_WARNING = "Summarize what changed without pasting passwords, tokens, payment data, raw evidence, raw security payloads, or private report internals.";

export function SupportRequestUpdateForm() {
  const [values, setValues] = useState<SupportRequestUpdateFormValues>(INITIAL_VALUES);
  const [state, setState] = useState<SubmitState>({ kind: "idle" });
  const [routeUpdateId, setRouteUpdateId] = useState("");

  useEffect(() => {
    const nextUpdateId = new URL(window.location.href).searchParams.get("update")?.trim() ?? "";
    setRouteUpdateId(nextUpdateId);
    if (nextUpdateId) setValues((current) => ({ ...current, supportRequestId: nextUpdateId.slice(0, 120) }));
  }, []);

  const localFieldErrors = useMemo(() => validateLocally(values), [values]);
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
    if (Object.keys(fieldErrors).length > 0) {
      setState({
        kind: "error",
        message: "The support update needs a safe summary before it can be submitted.",
        details: [UPDATE_WARNING],
        fieldErrors,
      });
      return;
    }

    setState({ kind: "submitting" });

    try {
      const response = await fetch("/api/customer/support/request/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = (await response.json().catch(() => null)) as SupportRequestUpdateApiResponse | null;
      if (!response.ok || !data) {
        setState({ kind: "error", message: "The support update could not be submitted cleanly.", details: [], fieldErrors: {} });
        return;
      }

      if (!data.ok) {
        setState({ kind: "error", message: data.error ?? "The support update could not be submitted cleanly.", details: Array.isArray(data.details) ? data.details : [], fieldErrors: data.fieldErrors ?? {} });
        return;
      }

      setState({ kind: "success", response: data });
      setValues({ supportRequestId: values.supportRequestId, safeUpdateSummary: "", customerAcknowledgement: false });
    } catch {
      setState({ kind: "error", message: "The support update service could not be reached right now.", details: ["Open the update path from support status and try again."], fieldErrors: {} });
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="system-panel-authority rounded-[2rem] p-6">
      <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">Safe support update</div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">Update a waiting support request safely.</h2>
      <p className="mt-3 text-sm leading-7 text-slate-300">{UPDATE_WARNING}</p>
      <div className="mt-4 rounded-[1.25rem] border border-cyan-300/15 bg-cyan-300/10 p-4 text-xs leading-6 text-cyan-50">
        Use this panel when support status asks for a safer customer summary. Cendorq does not show rejected raw content here and does not ask you to paste sensitive records again.
      </div>

      <div className="mt-6 grid gap-5">
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-white">Support request ID</span>
          <input
            name="supportRequestId"
            value={values.supportRequestId}
            onChange={handleChange}
            maxLength={120}
            placeholder="Open from /dashboard/support/status or paste the request ID"
            className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
            aria-invalid={Boolean(getFieldError(state, localFieldErrors, "supportRequestId"))}
          />
          {routeUpdateId ? <span className="text-xs text-cyan-100/80">Loaded from update link.</span> : <span className="text-xs text-slate-400">The safest path is from support status using the update link.</span>}
          <FieldError message={getFieldError(state, localFieldErrors, "supportRequestId")} />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-white">Safe update summary</span>
          <textarea
            name="safeUpdateSummary"
            value={values.safeUpdateSummary}
            onChange={handleChange}
            maxLength={1400}
            rows={7}
            placeholder="Explain the corrected or safer summary in your own words. Do not paste secrets, payment data, raw evidence, or security payloads."
            className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm leading-7 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
            aria-invalid={Boolean(getFieldError(state, localFieldErrors, "safeUpdateSummary"))}
          />
          <div className="flex items-center justify-between gap-3 text-xs text-slate-400">
            <span>Minimum 20 characters. Maximum 1,400.</span>
            <span>{values.safeUpdateSummary.length}/1400</span>
          </div>
          <FieldError message={getFieldError(state, localFieldErrors, "safeUpdateSummary")} />
        </label>

        <label className="flex gap-3 rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4 text-sm leading-7 text-slate-200">
          <input
            name="customerAcknowledgement"
            type="checkbox"
            checked={values.customerAcknowledgement}
            onChange={handleChange}
            className="mt-1 h-4 w-4 shrink-0 accent-cyan-300"
            aria-invalid={Boolean(getFieldError(state, localFieldErrors, "customerAcknowledgement"))}
          />
          <span>I confirm this update does not include passwords, raw tokens, payment details, secrets, private keys, raw evidence dumps, raw security payloads, or private report internals.</span>
        </label>
        <FieldError message={getFieldError(state, localFieldErrors, "customerAcknowledgement")} />
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" disabled={!canSubmit} className="rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60">
          {state.kind === "submitting" ? "Submitting safe update..." : "Submit safe update"}
        </button>
        <Link href="/dashboard/support/status" className="rounded-2xl border border-cyan-300/25 px-5 py-3 text-center text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/10">
          Back to support status
        </Link>
      </div>

      {state.kind === "success" ? (
        <div className="mt-6 rounded-[1.5rem] border border-emerald-300/20 bg-emerald-300/10 p-5">
          <div className="text-sm font-semibold text-emerald-50">{state.response.message}</div>
          <div className="mt-3 grid gap-2 text-xs leading-6 text-emerald-50/80 sm:grid-cols-2">
            <div>Request ID: {state.response.supportRequestId}</div>
            <div>Status: {state.response.status}</div>
            <div>Raw payload stored: {state.response.rawPayloadStored ? "yes" : "no"}</div>
            <div>Projection: {state.response.customerSafeProjectionOnly ? "customer-safe only" : "not available"}</div>
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/support/status" className="inline-flex rounded-2xl bg-emerald-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-200">
              Track updated request
            </Link>
            <Link href="/dashboard/support" className="inline-flex rounded-2xl border border-emerald-300/25 px-5 py-3 text-sm font-semibold text-emerald-50 transition hover:bg-emerald-300/10">
              Back to support center
            </Link>
          </div>
        </div>
      ) : null}

      {state.kind === "error" ? (
        <div className="mt-6 rounded-[1.5rem] border border-rose-300/20 bg-rose-300/10 p-5">
          <div className="text-sm font-semibold text-rose-50">{state.message}</div>
          {state.details.length > 0 ? (
            <div className="mt-3 grid gap-2">
              {state.details.map((detail) => (
                <div key={detail} className="rounded-2xl border border-white/10 bg-black/20 p-3 text-xs leading-6 text-rose-50/80">
                  {detail}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}

function validateLocally(values: SupportRequestUpdateFormValues) {
  const errors: Partial<Record<keyof SupportRequestUpdateFormValues, string>> = {};
  if (!values.supportRequestId.trim()) errors.supportRequestId = "Support request ID is required.";
  if (values.safeUpdateSummary.trim().length < 20) errors.safeUpdateSummary = "A safe update summary of at least 20 characters is required.";
  if (!values.customerAcknowledgement) errors.customerAcknowledgement = "Safety acknowledgement is required before update.";
  return errors;
}

function getFieldError(
  state: SubmitState,
  localErrors: Partial<Record<keyof SupportRequestUpdateFormValues, string>>,
  key: keyof SupportRequestUpdateFormValues,
) {
  if (state.kind === "error" && state.fieldErrors[key]) return state.fieldErrors[key];
  return localErrors[key];
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <span className="text-xs font-medium text-rose-200">{message}</span>;
}
