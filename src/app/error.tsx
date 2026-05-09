"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const READOUTS = [
  { label: "System state", value: "Route interruption" },
  { label: "Best posture", value: "Retry once" },
  { label: "Fallback rule", value: "Return to the readiness path" },
] as const;

const RECOVERY_LINKS = [
  {
    label: "Reset route",
    title: "Return to homepage",
    copy: "Restore the broadest clean context and re-enter Cendorq without route confusion.",
    href: "/",
    cta: "Go to homepage",
  },
  {
    label: "Restart with first signal",
    title: "Start Free Scan",
    copy: "Use the first signal layer when the safest next readiness move is still unclear.",
    href: "/free-check",
    cta: "Start Free Scan",
  },
  {
    label: "Compare readiness depth",
    title: "Review Plans",
    copy: "Compare Scan, Review, Repair, and Control without returning to legacy recovery routes.",
    href: "/plans",
    cta: "Review Plans",
  },
] as const;

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  const [retryCount, setRetryCount] = useState(0);
  const readableMessage = useMemo(() => buildReadableMessage(error), [error]);

  function handleRetry() {
    setRetryCount((current) => current + 1);
    reset();
  }

  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 text-white sm:px-6 md:py-16 xl:py-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-10 top-8 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute -right-8 top-24 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl sm:h-80 sm:w-80" />
        <div className="system-grid-wide absolute inset-0 opacity-[0.03]" />
      </div>

      <section className="relative z-10 grid min-h-[calc(100vh-8rem)] gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div>
          <p className="system-chip inline-flex rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-100">
            Cendorq / Route error
          </p>

          <h1 className="system-hero-title mt-5 max-w-5xl text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl xl:text-7xl">
            This route hit an interruption
            <span className="system-gradient-text block">before the page finished cleanly.</span>
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            Retry once. If the route still fails, recover into the clean readiness path instead of guessing through unrelated pages.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={handleRetry} className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition">
              Try again
            </button>
            <Link href="/free-check" className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition">
              Start Free Scan
            </Link>
          </div>
        </div>

        <div className="relative z-10 grid gap-4">
          <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8">
            <p className="system-eyebrow">Recovery posture</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Restore clarity fast. Preserve the sequence.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-300">
              A route error should not become route chaos. The safest recovery path is one retry, then homepage, Free Scan, or Plans.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {READOUTS.map((item, index) => (
                <div key={item.label} className={index === 0 ? "system-chip rounded-[1.25rem] p-4" : "system-surface rounded-[1.25rem] p-4"}>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">{item.label}</div>
                  <div className="mt-2 text-sm font-semibold text-white">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="system-surface rounded-[1.6rem] p-5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200">Readable message</div>
            <p className="mt-3 text-sm leading-7 text-slate-300">{readableMessage}</p>
            <p className="mt-2 text-xs leading-6 text-slate-500">Retry count: {retryCount}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {RECOVERY_LINKS.map((option) => (
              <article key={option.href} className="system-surface rounded-[1.6rem] p-5">
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200">{option.label}</div>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">{option.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{option.copy}</p>
                <Link href={option.href} className="system-button-secondary mt-5 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition">
                  {option.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <span className="sr-only">Use homepage, Free Scan, or Plans after a route error.</span>
    </main>
  );
}

function buildReadableMessage(error: Error & { digest?: string }) {
  const raw = typeof error?.message === "string" ? error.message.trim() : "";
  if (!raw) return "The route returned an unexpected runtime interruption before the page could finish rendering.";
  if (raw.length <= 220) return raw;
  return `${raw.slice(0, 219)}...`;
}
