"use client";

import { useEffect, useMemo, useState, type ChangeEvent } from "react";

type SafeApproval = {
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
  createdAt: string;
  updatedAt: string;
};

type ApprovalListApiSuccess = {
  ok: true;
  returned: number;
  entries: SafeApproval[];
  projection: "operator-approval-safe-list";
};

type ApprovalListApiError = {
  ok: false;
  error?: string;
  details?: string[];
};

type ApprovalListApiResponse = ApprovalListApiSuccess | ApprovalListApiError;

type LoadState =
  | { kind: "loading" }
  | { kind: "ready"; entries: SafeApproval[]; returned: number }
  | { kind: "empty" }
  | { kind: "error"; message: string; details: string[] };

type ApprovalFilters = {
  approvalType: "" | "safe-correction" | "billing-action" | "security-outcome" | "support-closure";
  decision: "" | "approve" | "reject" | "hold" | "escalate";
  state: "" | "requested" | "in-review" | "approved" | "rejected" | "held" | "escalated";
};

const INITIAL_FILTERS: ApprovalFilters = { approvalType: "", decision: "", state: "" };
const APPROVAL_TYPE_OPTIONS = [["", "All types"], ["safe-correction", "Safe correction"], ["billing-action", "Billing action"], ["security-outcome", "Security outcome"], ["support-closure", "Support closure"]] as const;
const DECISION_OPTIONS = [["", "All decisions"], ["approve", "Approve"], ["reject", "Reject"], ["hold", "Hold"], ["escalate", "Escalate"]] as const;
const STATE_OPTIONS = [["", "All states"], ["requested", "Requested"], ["in-review", "In review"], ["approved", "Approved"], ["rejected", "Rejected"], ["held", "Held"], ["escalated", "Escalated"]] as const;

export function OperatorApprovalList() {
  const [state, setState] = useState<LoadState>({ kind: "loading" });
  const [filters, setFilters] = useState<ApprovalFilters>(INITIAL_FILTERS);
  const query = useMemo(() => {
    const params = new URLSearchParams({ limit: "50" });
    if (filters.approvalType) params.set("approvalType", filters.approvalType);
    if (filters.decision) params.set("decision", filters.decision);
    if (filters.state) params.set("state", filters.state);
    return params.toString();
  }, [filters]);

  async function loadApprovals(activeQuery = query) {
    setState({ kind: "loading" });
    try {
      const response = await fetch(`/api/admin/support/approvals/list?${activeQuery}`, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      const data = (await response.json().catch(() => null)) as ApprovalListApiResponse | null;
      if (!response.ok || !data) {
        setState({ kind: "error", message: "Safe approval records could not be loaded.", details: ["Use a verified operator session and try again."] });
        return;
      }
      if (!data.ok) {
        setState({ kind: "error", message: data.error ?? "Safe approval records could not be loaded.", details: Array.isArray(data.details) ? data.details : [] });
        return;
      }
      if (!data.entries.length) {
        setState({ kind: "empty" });
        return;
      }
      setState({ kind: "ready", entries: data.entries, returned: data.returned });
    } catch {
      setState({ kind: "error", message: "The approval list service could not be reached.", details: ["Open the operator console from a verified session and try again."] });
    }
  }

  function handleFilterChange(event: ChangeEvent<HTMLSelectElement>) {
    const name = event.target.name as keyof ApprovalFilters;
    const value = event.target.value as ApprovalFilters[keyof ApprovalFilters];
    setFilters((current) => ({ ...current, [name]: value }));
  }

  function clearFilters() {
    setFilters(INITIAL_FILTERS);
  }

  useEffect(() => {
    void loadApprovals(query);
  }, [query]);

  return (
    <section className="system-panel-authority rounded-[2rem] p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">Approval records</div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">Safe approval history.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
            This list displays operator approval projections only. Filters use safe approval type, decision, and state query parameters without adding customer hashes, requester roles, raw storage flags, internal notes, secrets, or authorization internals.
          </p>
        </div>
        <button type="button" onClick={() => void loadApprovals()} className="rounded-2xl border border-cyan-300/25 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/10">
          Refresh approvals
        </button>
      </div>

      <div className="mt-6 grid gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end">
        <ApprovalFilterSelect name="approvalType" label="Approval type" value={filters.approvalType} options={APPROVAL_TYPE_OPTIONS} onChange={handleFilterChange} />
        <ApprovalFilterSelect name="decision" label="Decision" value={filters.decision} options={DECISION_OPTIONS} onChange={handleFilterChange} />
        <ApprovalFilterSelect name="state" label="State" value={filters.state} options={STATE_OPTIONS} onChange={handleFilterChange} />
        <button type="button" onClick={clearFilters} className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10">
          Clear filters
        </button>
      </div>

      {state.kind === "ready" ? <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Showing {state.returned} safe approval record{state.returned === 1 ? "" : "s"}</div> : null}

      {state.kind === "loading" ? <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 text-sm leading-7 text-slate-300">Loading safe approval records...</div> : null}

      {state.kind === "empty" ? (
        <div className="mt-6 rounded-[1.5rem] border border-cyan-300/20 bg-cyan-300/10 p-5">
          <div className="text-sm font-semibold text-cyan-50">No approval records match the current filters.</div>
          <p className="mt-2 text-sm leading-7 text-cyan-50/80">Clear filters or submit a guarded approval to see safe projections here.</p>
        </div>
      ) : null}

      {state.kind === "error" ? (
        <div className="mt-6 rounded-[1.5rem] border border-rose-300/20 bg-rose-300/10 p-5">
          <div className="text-sm font-semibold text-rose-50">{state.message}</div>
          {state.details.length ? <div className="mt-3 grid gap-2">{state.details.map((detail) => <div key={detail} className="rounded-2xl border border-white/10 bg-black/20 p-3 text-xs leading-6 text-rose-50/80">{detail}</div>)}</div> : null}
        </div>
      ) : null}

      {state.kind === "ready" ? (
        <div className="mt-6 grid gap-4">
          {state.entries.map((entry) => (
            <article key={entry.approvalId} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">{entry.state} · {entry.decision}</div>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">{entry.approvalType} · {entry.approvalGate}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{entry.customerSafeSummary}</p>
                  {entry.customerSafeOutcomeCopy ? <p className="mt-3 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm leading-7 text-cyan-50">{entry.customerSafeOutcomeCopy}</p> : null}
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-xs font-semibold text-slate-300">Safe projection</div>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                <ApprovalDetail label="Approval ID" value={entry.approvalId} />
                <ApprovalDetail label="Support request" value={entry.supportRequestId} />
                <ApprovalDetail label="Reviewer role" value={entry.reviewerRole} />
                <ApprovalDetail label="Audit event" value={entry.auditEventId} />
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function ApprovalFilterSelect({ name, label, value, options, onChange }: { name: keyof ApprovalFilters; label: string; value: string; options: readonly (readonly [string, string])[]; onChange: (event: ChangeEvent<HTMLSelectElement>) => void }) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</span>
      <select name={name} value={value} onChange={onChange} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/50">
        {options.map(([optionValue, labelText]) => <option key={optionValue || "all"} value={optionValue}>{labelText}</option>)}
      </select>
    </label>
  );
}

function ApprovalDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</div>
      <div className="mt-2 break-words text-sm font-semibold text-white">{value}</div>
    </div>
  );
}
