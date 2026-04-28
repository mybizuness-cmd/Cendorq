"use client";

import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { CUSTOMER_SUPPORT_INTAKE_FLOWS, type CustomerSupportIntakeType } from "@/lib/customer-support-intake-architecture";

type SupportRequestFormValues = {
  requestType: CustomerSupportIntakeType;
  businessContext: string;
  safeDescription: string;
  customerAcknowledgement: boolean;
};

type SupportRequestApiSuccess = {
  ok: true;
  supportRequestId: string;
  requestType: CustomerSupportIntakeType;
  decision: "allow" | "sanitize" | "challenge" | "block" | "quarantine";
  operatorReviewRequired: boolean;
  downstreamProcessingAllowed: boolean;
  message: string;
};

type SupportRequestApiError = {
  ok: false;
  error?: string;
  details?: string[];
  fieldErrors?: Partial<Record<keyof SupportRequestFormValues, string>>;
};

type SupportRequestApiResponse = SupportRequestApiSuccess | SupportRequestApiError;

type SubmitState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; response: SupportRequestApiSuccess }
  | { kind: "error"; message: string; details: string[]; fieldErrors: Partial<Record<keyof SupportRequestFormValues, string>> };

const INITIAL_VALUES: SupportRequestFormValues = {
  requestType: "report-question",
  businessContext: "",
  safeDescription: "",
  customerAcknowledgement: false,
};

const SECRET_WARNING = "Do not include passwords, raw tokens, payment data, secrets, private keys, raw evidence dumps, raw security payloads, or private report internals.";

export function SupportRequestForm() {
  const [values, setValues] = useState<SupportRequestFormValues>(INITIAL_VALUES);
  const [state, setState] = useState<SubmitState>({ kind: "idle" });

  const selectedFlow = useMemo(
    () => CUSTOMER_SUPPORT_INTAKE_FLOWS.find((flow) => flow.key === values.requestType) ?? CUSTOMER_SUPPORT_INTAKE_FLOWS[0],
    [values.requestType],
  );

  const localFieldErrors = useMemo(() => validateLocally(values), [values]);
  const canSubmit = Object.keys(localFieldErrors).length === 0 && state.kind !== "submitting";

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const target = event.target;
    const name = target.name as keyof SupportRequestFormValues;
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
        message: "The request needs a safe summary before it can be submitted.",
        details: [SECRET_WARNING],
        fieldErrors,
      });
      return;
    }

    setState({ kind: "submitting" });

    try {
      const response = await fetch("/api/customer/support/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = (await response.json().catch(() => null)) as SupportRequestApiResponse | null;
      if (!response.ok || !data || data.ok === false) {
        setState({
          kind: "error",
          message: data?.error ?? "The support request could not be submitted cleanly.",
          details: Array.isArray(data?.details) ? data.details : [],
          fieldErrors: data?.fieldErrors ?? {},
        });
        return;
      }

      setState({ kind: "success", response: data });
      setValues(INITIAL_VALUES);
    } catch {
      setState({
        kind: "error",
        message: "The support request service could not be reached right now.",
        details: ["Try again from the authenticated dashboard support path."],
        fieldErrors: {},
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="system-panel-authority rounded-[2rem] p-6">
      <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">Protected request form</div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">Submit a safe support request.</h2>
      <p className="mt-3 text-sm leading-7 text-slate-300">{SECRET_WARNING}</p>

      <div className="mt-6 grid gap-5">
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-white">Request type</span>
          <select
            name="requestType"
            value={values.requestType}
            onChange={handleChange}
            className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/50"
          >
            {CUSTOMER_SUPPORT_INTAKE_FLOWS.map((flow) => (
              <option key={flow.key} value={flow.key}>
                {flow.label}
              </option>
            ))}
          </select>
        </label>

        <div className="rounded-[1.25rem] border border-cyan-300/15 bg-cyan-300/10 p-4">
          <div className="text-sm font-semibold text-cyan-50">{selectedFlow.primaryOutcome}</div>
          <p className="mt-2 text-xs leading-6 text-cyan-50/80">{selectedFlow.purpose}</p>
        </div>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-white">Business or account context</span>
          <input
            name="businessContext"
            value={values.businessContext}
            onChange={handleChange}
            maxLength={160}
            placeholder="Business name, location, account area, or report context"
            className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
            aria-invalid={Boolean(getFieldError(state, localFieldErrors, "businessContext"))}
          />
          <FieldError message={getFieldError(state, localFieldErrors, "businessContext")} />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-white">Safe description</span>
          <textarea
            name="safeDescription"
            value={values.safeDescription}
            onChange={handleChange}
            maxLength={1400}
            rows={8}
            placeholder="Explain the request in your own words. Summarize the issue instead of pasting sensitive records or raw evidence."
            className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm leading-7 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
            aria-invalid={Boolean(getFieldError(state, localFieldErrors, "safeDescription"))}
          />
          <div className="flex items-center justify-between gap-3 text-xs text-slate-400">
            <span>Minimum 20 characters. Maximum 1,400.</span>
            <span>{values.safeDescription.length}/1400</span>
          </div>
          <FieldError message={getFieldError(state, localFieldErrors, "safeDescription")} />
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
          <span>I confirm this request does not include passwords, raw tokens, payment details, secrets, private keys, raw evidence dumps, raw security payloads, or private report internals.</span>
        </label>
        <FieldError message={getFieldError(state, localFieldErrors, "customerAcknowledgement")} />
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={!canSubmit}
          className="rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state.kind === "submitting" ? "Submitting protected request..." : "Submit protected request"}
        </button>
        <button
          type="button"
          onClick={() => {
            setValues(INITIAL_VALUES);
            setState({ kind: "idle" });
          }}
          className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
        >
          Clear form
        </button>
      </div>

      {state.kind === "success" ? (
        <div className="mt-6 rounded-[1.5rem] border border-emerald-300/20 bg-emerald-300/10 p-5">
          <div className="text-sm font-semibold text-emerald-50">{state.response.message}</div>
          <div className="mt-3 grid gap-2 text-xs leading-6 text-emerald-50/80 sm:grid-cols-2">
            <div>Request ID: {state.response.supportRequestId}</div>
            <div>Decision: {state.response.decision}</div>
            <div>Operator review: {state.response.operatorReviewRequired ? "required" : "not required"}</div>
            <div>Processing: {state.response.downstreamProcessingAllowed ? "allowed" : "held"}</div>
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

function validateLocally(values: SupportRequestFormValues) {
  const errors: Partial<Record<keyof SupportRequestFormValues, string>> = {};
  if (!values.businessContext.trim()) errors.businessContext = "Business or account context is required.";
  if (values.safeDescription.trim().length < 20) errors.safeDescription = "A safe description of at least 20 characters is required.";
  if (!values.customerAcknowledgement) errors.customerAcknowledgement = "Safety acknowledgement is required before submit.";
  return errors;
}

function getFieldError(
  state: SubmitState,
  localErrors: Partial<Record<keyof SupportRequestFormValues, string>>,
  key: keyof SupportRequestFormValues,
) {
  if (state.kind === "error" && state.fieldErrors[key]) return state.fieldErrors[key];
  return localErrors[key];
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <span className="text-xs font-medium text-rose-200">{message}</span>;
}
