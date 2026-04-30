"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const DISMISS_COOKIE = "cendorq_concierge_dismissed";
const STARTED_COOKIE = "cendorq_free_scan_started";
const COMPLETED_COOKIE = "cendorq_free_scan_completed";
const DISMISS_SECONDS = 60 * 60 * 24 * 14;
const STANDARD_DELAY_MS = 12_000;
const RESUME_DELAY_MS = 6_000;
const SCROLL_TRIGGER_RATIO = 0.38;

type NudgeMode = "start" | "resume" | "exit";

export function FreeScanConciergeNudge() {
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<NudgeMode>("start");

  const copy = useMemo(() => {
    if (mode === "resume") {
      return {
        eyebrow: "Resume your scan",
        title: "Continue in the focused scan room.",
        body: "Your Free Scan belongs on the dedicated page so the business context, recovery state, and handoff into dashboard, notifications, and report vault stay clear.",
        cta: "Resume Free Scan",
      };
    }
    if (mode === "exit") {
      return {
        eyebrow: "Soft Free Scan entry",
        title: "Take the first read before you spend more.",
        body: "This is only an invitation into the scan room — no cramped popup form, no fake urgency, and no guaranteed outcome promise.",
        cta: "Start Free Scan",
      };
    }
    return {
      eyebrow: "Soft Free Scan entry",
      title: "Want the first read before you spend more?",
      body: "Start the Free Scan in the dedicated scan room. It is designed for focus, privacy posture, recovery, and a clear next step — not a full-form popup or pressure tactic.",
      cta: "Start Free Scan",
    };
  }, [mode]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (readCookie(DISMISS_COOKIE) === "1") return;
    if (readCookie(COMPLETED_COOKIE) === "1") return;

    const started = readCookie(STARTED_COOKIE) === "1";
    let shown = false;
    const show = (nextMode: NudgeMode) => {
      if (shown) return;
      shown = true;
      setMode(nextMode);
      setVisible(true);
    };

    const timer = window.setTimeout(() => show(started ? "resume" : "start"), started ? RESUME_DELAY_MS : STANDARD_DELAY_MS);

    const onScroll = () => {
      const availableScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (availableScroll <= 0) return;
      const ratio = window.scrollY / availableScroll;
      if (ratio >= SCROLL_TRIGGER_RATIO) show(started ? "resume" : "start");
    };

    const onMouseLeave = (event: MouseEvent) => {
      if (started || window.innerWidth < 900) return;
      if (event.clientY <= 0) show("exit");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  function dismiss() {
    writeCookie(DISMISS_COOKIE, "1", DISMISS_SECONDS);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <aside
      aria-label="Free Scan concierge prompt"
      aria-live="polite"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-md rounded-[1.5rem] border border-cyan-300/20 bg-slate-950/95 p-4 text-white shadow-[0_24px_80px_rgba(8,47,73,0.35)] backdrop-blur md:inset-x-auto md:right-5 md:mx-0"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-200">{copy.eyebrow}</div>
          <h2 className="mt-2 text-lg font-semibold tracking-tight text-white">{copy.title}</h2>
        </div>
        <button
          type="button"
          aria-label="Dismiss Free Scan prompt"
          onClick={dismiss}
          className="rounded-full border border-white/10 px-3 py-1 text-sm font-semibold text-slate-300 transition hover:border-cyan-300/40 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950"
        >
          ×
        </button>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-300">{copy.body}</p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <Link
          href="/free-check"
          onClick={() => writeCookie(STARTED_COOKIE, "1", DISMISS_SECONDS)}
          className="inline-flex justify-center rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950"
        >
          {copy.cta}
        </Link>
        <button
          type="button"
          onClick={dismiss}
          className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950"
        >
          Not now
        </button>
      </div>
    </aside>
  );
}

function readCookie(name: string) {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : "";
}

function writeCookie(name: string, value: string, maxAge: number) {
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
}
