"use client";

import { useEffect, useState } from "react";

type OperatorSafeSummary = {
  id: string;
  businessContext: string;
  requestType: string;
  safeSummary: string;
  decision: "allow" | "sanitize" | "challenge" | "block" | "quarantine";
  riskFlagCount: number;
  sourceRoute: "/dashboard/support/request";
  createdAt: string;
  updatedAt: string;
  rawPayloadStored: false;
  customerOwnershipRequired: true;
  supportAuditRequired: true;
  downstreamProcessingAllowed: boolean;
  operatorReviewRequired: boolean;
};

type OperatorSafeSummaryApiSuccess = {
  ok: true;
  returned: number;
  entries: OperatorSafeSummary[];
  auditRecorded: boolean;
  projection: "safe-summary-only";
};

type OperatorSafeSummaryApiError = {
  ok: false;
  error?: string;
  details?: string[];
};

type OperatorSafeSummaryApiResponse = OperatorSafeSummaryApiSuccess | OperatorSafeSummaryApiError;

type LoadState =
  | { kind: "loading" }
  | { kind: "ready"; entries: OperatorSafeSummary[]; auditRecorded: boolean }
  | { kind: "empty"; auditRecorded: boolean }
  | { kind: "error"; message: string; details: string[] };

export function OperatorSafeSummaryConsole() {
  const [state, setState] = useState<LoadState>({ kind: "loading" });

  async function loadSafeSummaries() {
    setState({ kind: "loading" });
    try {
      const response = await fetch("/api/admin/support/requests?limit=50", {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      const data = (await response.json().catch(() => null)) as OperatorSafeSummaryApiResponse | null;
      if (!response.ok || !data) {
        setState({ kind: "error", message: "Safe support summaries could not be loaded.", details: ["Use a verified operator session and try again."] });
        return;
      }
      if (!data.ok) {
        setState({ kind: "error", message: data.error ?? "Safe support summaries could not be loaded.", details: Array.isArray(data.details) ? data.details : [] });
        return;
      }
      if (!data.entries.length) {
        setState({ kind: "empty", auditRecorded: data.auditRecorded });
        return;
      }
      setState({ kind: "ready", entries: data.entries, auditRecorded: data.auditRecorded });
    } catch {
      setState({ kind: "error", message: "The operator safe-summary service could not be reached.", details: ["Open this page from a verified operator session and try again."] });
    }
  }

  useEffect(() => {
    void loadSafeSummaries();
  }, []);

  return (
    <section className="system-panel-authority rounded-[2rem] p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">Read-only operator console</div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">Safe support summaries only.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
            This view is intentionally read-only. It displays safe summaries returned by the protected operator API and does not expose customer hashes, raw descriptions, raw evidence, billing data, internal notes, operator identities, risk internals, attacker details, secrets, session tokens, CSRF tokens, admin keys, or support context keys.
          </p>
        </div>
        <button type="button" onClick={() => void loadSafeSummaries()} className="rounded-2xl border border-cyan-300/25 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/10">
          Refresh safe summaries
        </button>
      </div>

      {state.kind === "loading" ? <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 text-sm leading-7 text-slate-300">Loading protected operator safe summaries...</div> : null}

      {state.kind === "empty" ? (
        <div className="mt-6 rounded-[1.5rem] border border-cyan-300/20 bg-cyan-300/10 p-5">
          <div className="text-sm font-semibold text-cyan-50">No safe support summaries are available.</div>
          <p className="mt-2 text-sm leading-7 text-cyan-50/80">The access attempt was still handled through the read-only operator path. Audit recorded: {state.auditRecorded ? "yes" : "no"}.</p>
        </div>
      ) : null}

      {state.kind === "error" ? (
        <div className="mt-6 rounded-[1.5rem] border border-rose-300/20 bg-rose-300/10 p-5">
          <div className="text-sm font-semibold text-rose-50">{state.message}</div>
          {state.details.length ? (
            <div className="mt-3 grid gap-2">
              {state.details.map((detail) => (
                <div key={detail} className="rounded-2xl border border-white/10 bg-black/20 p-3 text-xs leading-6 text-rose-50/80">{detail}</div>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      {state.kind === "ready" ? (
        <div className="mt-6 grid gap-4">
          <div className="rounded-[1.25rem] border border-emerald-300/15 bg-emerald-300/10 p-4 text-xs leading-6 text-emerald-50">
            Audit recorded for this read: {state.auditRecorded ? "yes" : "no"}. Projection: safe-summary-only. Mutation controls are intentionally absent.
          </div>
          {state.entries.map((entry) => (
            <article key={entry.id} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">{formatDecision(entry.decision)} · {entry.requestType}</div>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">{entry.businessContext}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{entry.safeSummary}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-xs font-semibold text-slate-300">Read-only</div>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                <SummaryDetail label="Request ID" value={entry.id} />
                <SummaryDetail label="Risk flag count" value={String(entry.riskFlagCount)} />
                <SummaryDetail label="Processing" value={entry.downstreamProcessingAllowed ? "Allowed" : "Held"} />
                <SummaryDetail label="Review" value={entry.operatorReviewRequired ? "Required" : "Not required"} />
              </div>
              <div className="mt-4 rounded-[1.25rem] border border-cyan-300/15 bg-cyan-300/10 p-4 text-xs leading-6 text-cyan-50">
                Raw payload stored: {entry.rawPayloadStored ? "yes" : "no"}. Customer ownership required: {entry.customerOwnershipRequired ? "yes" : "no"}. Support audit required: {entry.supportAuditRequired ? "yes" : "no"}.
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function SummaryDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</div>
      <div className="mt-2 break-words text-sm font-semibold text-white">{value}</div>
    </div>
  );
}

function formatDecision(decision: OperatorSafeSummary["decision"]) {
  if (decision === "allow") return "Allowed";
  if (decision === "sanitize") return "Waiting on safe summary";
  if (decision === "challenge") return "Needs approval path";
  if (decision === "quarantine") return "Quarantined";
  return "Blocked";
}
