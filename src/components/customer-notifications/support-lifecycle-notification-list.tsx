"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type SupportLifecycleNotificationEntry = {
  source: "support-lifecycle";
  notificationId: string;
  supportRequestId: string;
  notificationKey: string;
  status: "received" | "reviewing" | "waiting-on-customer" | "in-specialist-review" | "resolved" | "closed";
  channel: "dashboard-notification" | "email" | "support-status";
  state: "queued" | "displayed" | "sent" | "read" | "suppressed" | "failed";
  createdAt: string;
  queuedAt?: string;
  displayedAt?: string;
  sentAt?: string;
  readAt?: string;
  suppressedAt?: string;
  failedAt?: string;
  customerVisibleTitle: string;
  customerVisibleBody: string;
  primaryPath: "/dashboard/support/status" | "/dashboard/support/request" | "/dashboard/support";
};

type CustomerNotificationApiSuccess = {
  ok: true;
  returned: number;
  entries: SupportLifecycleNotificationEntry[];
};

type CustomerNotificationApiError = {
  ok: false;
  error?: string;
  details?: string[];
};

type CustomerNotificationApiResponse = CustomerNotificationApiSuccess | CustomerNotificationApiError;

type LoadState =
  | { kind: "loading" }
  | { kind: "ready"; entries: SupportLifecycleNotificationEntry[] }
  | { kind: "empty" }
  | { kind: "error"; message: string; details: string[] };

export function SupportLifecycleNotificationList() {
  const [state, setState] = useState<LoadState>({ kind: "loading" });

  async function loadNotifications() {
    setState({ kind: "loading" });
    try {
      const response = await fetch("/api/customer/notifications?source=support-lifecycle&limit=25", {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      const data = (await response.json().catch(() => null)) as CustomerNotificationApiResponse | null;

      if (!response.ok || !data) {
        setState({ kind: "error", message: "Support lifecycle notifications could not be loaded safely.", details: [] });
        return;
      }

      if (!data.ok) {
        setState({ kind: "error", message: data.error ?? "Support lifecycle notifications could not be loaded safely.", details: Array.isArray(data.details) ? data.details : [] });
        return;
      }

      if (!data.entries.length) {
        setState({ kind: "empty" });
        return;
      }

      setState({ kind: "ready", entries: data.entries });
    } catch {
      setState({ kind: "error", message: "The notification service could not be reached right now.", details: ["Open notifications from the authenticated customer dashboard and try again."] });
    }
  }

  useEffect(() => {
    void loadNotifications();
  }, []);

  return (
    <section className="relative z-10 mt-8 system-panel-authority rounded-[2rem] p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">Live support notifications</div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">Customer-owned support alerts from the protected notification API.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
            These records come from the protected notification center API and are projected for the signed-in customer only. Raw payloads, evidence, billing data, internal notes, audit internals, suppression reasons, operator identities, risk scoring, secrets, and support context keys are not rendered here.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void loadNotifications()}
          className="rounded-2xl border border-cyan-300/25 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/10"
        >
          Refresh notifications
        </button>
      </div>

      {state.kind === "loading" ? (
        <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 text-sm leading-7 text-slate-300">Loading protected support lifecycle notifications...</div>
      ) : null}

      {state.kind === "empty" ? (
        <div className="mt-6 rounded-[1.5rem] border border-cyan-300/20 bg-cyan-300/10 p-5">
          <div className="text-sm font-semibold text-cyan-50">No live support lifecycle notifications are visible yet.</div>
          <p className="mt-2 text-sm leading-7 text-cyan-50/80">When a customer-owned support request changes status, safe notification records can appear here without exposing internal support data.</p>
          <Link href="/dashboard/support" className="mt-4 inline-flex rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200">
            Open support center
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
            <article key={entry.notificationId} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">{formatState(entry.state)} · {formatChannel(entry.channel)}</div>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">{entry.customerVisibleTitle}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{entry.customerVisibleBody}</p>
                </div>
                <Link href={entry.primaryPath} className="rounded-2xl border border-cyan-300/25 px-5 py-3 text-center text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/10">
                  Open safe path
                </Link>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                <NotificationDetail label="Status" value={formatStatus(entry.status)} />
                <NotificationDetail label="Channel" value={formatChannel(entry.channel)} />
                <NotificationDetail label="State" value={formatState(entry.state)} />
                <NotificationDetail label="Created" value={formatDate(entry.createdAt)} />
              </div>
              <div className="mt-4 rounded-[1.25rem] border border-cyan-300/15 bg-cyan-300/10 p-4 text-xs leading-6 text-cyan-50">
                Support request {entry.supportRequestId} is shown through customer-safe notification projection only.
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function NotificationDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</div>
      <div className="mt-2 break-words text-sm font-semibold text-white">{value}</div>
    </div>
  );
}

function formatStatus(status: SupportLifecycleNotificationEntry["status"]) {
  if (status === "waiting-on-customer") return "Waiting on customer";
  if (status === "in-specialist-review") return "Specialist review";
  return status.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatChannel(channel: SupportLifecycleNotificationEntry["channel"]) {
  if (channel === "dashboard-notification") return "Dashboard notification";
  if (channel === "support-status") return "Support status";
  return "Email";
}

function formatState(state: SupportLifecycleNotificationEntry["state"]) {
  return state.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Protected timestamp";
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}
