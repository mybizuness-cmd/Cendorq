"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";

const FREE_SCAN_PROGRESS_KEY = "cendorq.free-check.progress.v1";
const FREE_SCAN_SUBMITTED_KEY = "cendorq.free-check.submitted.v1";

type DashboardActionState = "start-free-scan" | "continue-free-scan" | "open-free-scan-result";
type ActionSource = "device" | "server" | "fallback";

type StoredProgress = {
  savedAt?: string;
  values?: Record<string, string>;
};

type StoredSubmitted = {
  submittedAt?: string;
  intakeId?: string;
  routingHint?: string;
};

type SafeFreeScanStatusResponse = {
  ok?: boolean;
  status?: "submitted" | "result-ready" | "not-found" | "missing-intake-id";
  nextAction?: "start-free-scan" | "open-free-scan-result";
  resultDestination?: string;
  message?: string;
};

type ActionView = {
  state: DashboardActionState;
  source: ActionSource;
  serverMessage?: string;
};

export function DashboardNextBestAction() {
  const [actionView, setActionView] = useState<ActionView>({ state: "start-free-scan", source: "fallback" });

  useEffect(() => {
    let cancelled = false;

    const sync = async () => {
      const next = await resolveActionView();
      if (!cancelled) setActionView(next);
    };

    void sync();
    window.addEventListener("storage", sync);
    window.addEventListener("focus", sync);
    window.addEventListener("cendorq:free-check:submitted", sync);
    return () => {
      cancelled = true;
      window.removeEventListener("storage", sync);
      window.removeEventListener("focus", sync);
      window.removeEventListener("cendorq:free-check:submitted", sync);
    };
  }, []);

  const action = useMemo(() => buildAction(actionView), [actionView]);

  return (
    <div className="mt-8 max-w-xl rounded-[1.55rem] border border-white/80 bg-white/80 p-4 shadow-[0_18px_55px_rgba(15,23,42,0.055)] backdrop-blur">
      <div className="text-[11px] font-black uppercase tracking-[0.18em] text-cyan-700">Next best action</div>
      <h2 className="mt-2 text-2xl font-semibold tracking-[-0.045em] text-slate-950">{action.title}</h2>
      <p className="mt-2 text-sm font-medium leading-6 text-slate-600">{action.copy}</p>
      {actionView.source === "server" ? <p className="mt-2 text-xs font-semibold leading-5 text-cyan-700">Checked against Cendorq status.</p> : null}
      <Link href={action.href} className={`${CENDORQ_EXPERIENCE_SYSTEM.primaryButton} mt-4 w-full justify-center sm:w-auto`}>
        {action.cta}
      </Link>
    </div>
  );
}

function buildAction(actionView: ActionView) {
  if (actionView.state === "open-free-scan-result") {
    return {
      title: "Your scan was submitted.",
      copy: actionView.serverMessage || "Open the protected result area. If the result still needs email confirmation, Cendorq will guide you back to access recovery.",
      href: "/dashboard/reports/free-scan",
      cta: "Open Free Scan result",
    };
  }

  if (actionView.state === "continue-free-scan") {
    return {
      title: "Continue your Free Scan.",
      copy: "Cendorq found saved scan progress on this device. Continue from the form instead of starting over.",
      href: "/free-check",
      cta: "Continue Free Scan",
    };
  }

  return {
    title: "Start with the Free Scan.",
    copy: "Cendorq needs business context before it can give the first useful readiness signal.",
    href: "/free-check",
    cta: "Start Free Scan",
  };
}

async function resolveActionView(): Promise<ActionView> {
  const submitted = getSubmittedMarker();
  if (submitted?.intakeId) {
    const serverStatus = await fetchSafeFreeScanStatus(submitted.intakeId);
    if (serverStatus?.nextAction === "open-free-scan-result") {
      return { state: "open-free-scan-result", source: "server", serverMessage: serverStatus.message };
    }
  }

  if (submitted) return { state: "open-free-scan-result", source: "device" };
  if (hasMeaningfulDraft()) return { state: "continue-free-scan", source: "device" };
  return { state: "start-free-scan", source: "fallback" };
}

async function fetchSafeFreeScanStatus(intakeId: string) {
  try {
    const response = await fetch(`/api/customer/free-scan/status?intakeId=${encodeURIComponent(intakeId)}`, { cache: "no-store", credentials: "same-origin" });
    if (!response.ok) return null;
    return (await response.json()) as SafeFreeScanStatusResponse;
  } catch {
    return null;
  }
}

function getSubmittedMarker() {
  const raw = safeGetLocalStorage(FREE_SCAN_SUBMITTED_KEY);
  if (!raw) return null;
  try {
    const stored = JSON.parse(raw) as StoredSubmitted;
    return stored.submittedAt || stored.intakeId ? stored : null;
  } catch {
    return null;
  }
}

function hasMeaningfulDraft() {
  const raw = safeGetLocalStorage(FREE_SCAN_PROGRESS_KEY);
  if (!raw) return false;
  try {
    const stored = JSON.parse(raw) as StoredProgress;
    const values = stored.values || {};
    return Object.values(values).some((value) => typeof value === "string" && value.trim().length > 0);
  } catch {
    return false;
  }
}

function safeGetLocalStorage(key: string) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}
