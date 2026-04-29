"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type CustomerSupportCommunicationPlan = {
  supportRequestId: string;
  status: CustomerSupportStatusEntry["customerVisibleStatus"];
  decision: "send" | "hold" | "suppress";
  notificationKey: string;
  emailKey: string;
  primaryPath: string;
  channels: readonly ("dashboard-notification" | "email" | "support-status")[];
  sendReasons: readonly string[];
  holdReasons: readonly string[];
  suppressionReasons: readonly string[];
  requiredGuards: readonly string[];
};

type CustomerSupportStatusEntry = {
  supportRequestId: string;
  requestType: string;
  businessContext: string;
  safeSummary: string;
  customerVisibleStatus: "received" | "reviewing" | "waiting-on-customer" | "in-specialist-review" | "resolved" | "closed";
  customerSafeStatus: string;
  statusLabel: string;
  statusCopy: string;
  primaryCta: string;
  primaryPath: string;
  communicationPlan: CustomerSupportCommunicationPlan;
  createdAt: string;
  updatedAt: string;
  operatorReviewRequired: boolean;
  downstreamProcessingAllowed: boolean;
};

type SupportStatusApiSuccess = {
  ok: true;
  returned: number;
  entries: CustomerSupportStatusEntry[];
};

type SupportStatusApiError = {
  ok: false;
  error?: string;
  details?: string[];
};

type SupportStatusApiResponse = SupportStatusApiSuccess | SupportStatusApiError;

type LoadState =
  | { kind: "loading" }
  | { kind: "ready"; entries: CustomerSupportStatusEntry[] }
  | { kind: "empty" }
  | { kind: "error"; message: string; details: string[] };

export function SupportStatusList() {
  const [state, setState] = useState<LoadState>({ kind: "loading" });

  async function loadStatus() {
    setState({ kind: "loading" });
    try {
      const response = await fetch("/api/customer/support/status", {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      const data = (await response.json().catch(() => null)) as SupportStatusApiResponse | null;

      if (!response.ok || !data) {
        setState({ kind: "error", message: "Support status could not be loaded safely.", details: [] });
        return;
      }

      if (!data.ok) {
        setState({ kind: "error", message: data.error ?? "Support status could not be loaded safely.", details: Array.isArray(data.details) ? data.details : [] });
        return;
      }

      if (!data.entries.length) {
        setState({ kind: "empty" });
        return;
      }

      setState({ kind: "ready", entries: data.entries });
    } catch {
      setState({ kind: "error", message: "The support status service could not be reached right now.", details: ["Open this page from the authenticated customer dashboard and try again."] });
    }
  }

  useEffect(() => {
    void loadStatus();
  }, []);

  return (
    <section className="system-panel-authority rounded-[2rem] p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">Live status</div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">Your protected support requests.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
            Status is shown through customer-safe projection only. Internal notes, operator identities, risk-scoring details, raw evidence, billing data, session tokens, and support secrets are never displayed here.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void loadStatus()}
          className="rounded-2xl border border-cyan-300/25 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/10"
        >
          Refresh status
        </button>
      </div>

      {state.kind === "loading" ? (
        <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 text-sm leading-7 text-slate-300">Loading protected support status...</div>
      ) : null}

      {state.kind === "empty" ? (
        <div className="mt-6 rounded-[1.5rem] border border-cyan-300/20 bg-cyan-300/10 p-5">
          <div className="text-sm font-semibold text-cyan-50">No active support requests are visible yet.</div>
          <p className="mt-2 text-sm leading-7 text-cyan-50/80">Start a protected request when you need report help, correction review, billing support, security review, or plan guidance.</p>
          <Link href="/dashboard/support/request" className="mt-4 inline-flex rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200">
            Start protected request
          </Link>
        </div>
      ) : null}

      {state.kind === "error" ? (
        <div className="mt-6 rounded-[1.5rem] border border-rose-300/20 bg-rose-300/10 p-5">
          <div className="text-sm font-semibold text-rose-50">{state.message}</div>
          {state.details.length ? (
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

      {state.kind === "ready" ? (
        <div className="mt-6 grid gap-4">
          {state.entries.map((entry) => (
            <article key={entry.supportRequestId} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">{entry.statusLabel}</div>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">{entry.businessContext}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{entry.statusCopy}</p>
                </div>
                <Link href={entry.primaryPath} className="rounded-2xl border border-cyan-300/25 px-5 py-3 text-center text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/10">
                  {entry.primaryCta}
                </Link>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                <StatusDetail label="Request ID" value={entry.supportRequestId} />
                <StatusDetail label="Request type" value={entry.requestType} />
                <StatusDetail label="Processing" value={entry.downstreamProcessingAllowed ? "Allowed" : "Held for review"} />
                <StatusDetail label="Operator review" value={entry.operatorReviewRequired ? "Required" : "Not required"} />
              </div>
              <CommunicationPlanPanel communicationPlan={entry.communicationPlan} />
              <div className="mt-4 rounded-[1.25rem] border border-cyan-300/15 bg-cyan-300/10 p-4 text-xs leading-6 text-cyan-50">
                {entry.customerSafeStatus}
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function CommunicationPlanPanel({ communicationPlan }: { communicationPlan: CustomerSupportCommunicationPlan }) {
  const channels = communicationPlan.channels.length ? communicationPlan.channels.map(formatCommunicationChannel).join(", ") : "No customer channel selected";
  const guards = communicationPlan.requiredGuards.length ? communicationPlan.requiredGuards.map(formatCommunicationGuard).join(" • ") : "Customer-safe projection";

  return (
    <div className="mt-4 rounded-[1.25rem] border border-violet-300/15 bg-violet-300/10 p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-100">Next communication path</div>
          <p className="mt-2 text-sm font-semibold text-white">{formatCommunicationDecision(communicationPlan.decision)}</p>
          <p className="mt-2 max-w-3xl text-xs leading-6 text-violet-50/80">{communicationDecisionCopy(communicationPlan.decision)}</p>
        </div>
        <Link href={communicationPlan.primaryPath} className="rounded-2xl border border-violet-200/25 px-4 py-3 text-center text-xs font-semibold text-violet-50 transition hover:bg-violet-200/10">
          Open communication path
        </Link>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <StatusDetail label="Communication decision" value={formatCommunicationDecision(communicationPlan.decision)} />
        <StatusDetail label="Safe channels" value={channels} />
        <StatusDetail label="Required guards" value={guards} />
      </div>
    </div>
  );
}

function StatusDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</div>
      <div className="mt-2 break-words text-sm font-semibold text-white">{value}</div>
    </div>
  );
}

function formatCommunicationDecision(decision: CustomerSupportCommunicationPlan["decision"]) {
  if (decision === "send") return "Ready to communicate";
  if (decision === "hold") return "Protected hold";
  return "Suppressed by safety controls";
}

function communicationDecisionCopy(decision: CustomerSupportCommunicationPlan["decision"]) {
  if (decision === "send") return "Cendorq can use the approved customer channels for this status while keeping the request customer-owned and safely projected.";
  if (decision === "hold") return "Cendorq is keeping the communication controlled until the customer-safe conditions for this status are satisfied.";
  return "Cendorq is avoiding duplicate, unavailable, or blocked communication for this status while preserving the protected support path.";
}

function formatCommunicationChannel(channel: CustomerSupportCommunicationPlan["channels"][number]) {
  if (channel === "dashboard-notification") return "Dashboard notification";
  if (channel === "support-status") return "Support status";
  return "Email";
}

function formatCommunicationGuard(guard: string) {
  return guard
    .split("-")
    .join(" ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}
