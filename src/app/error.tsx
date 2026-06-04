"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const PRIMARY_BUTTON_CLASS = "inline-flex min-h-14 items-center justify-center rounded-full border border-cyan-200 bg-cyan-100 px-8 py-4 text-base font-black text-slate-950 shadow-[0_18px_48px_rgba(14,165,233,0.14)] transition hover:-translate-y-0.5 hover:bg-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";
const SECONDARY_LINK_CLASS = "inline-flex min-h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-4 text-base font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  const [retryCount, setRetryCount] = useState(0);
  const readableMessage = useMemo(() => buildReadableMessage(error), [error]);

  function handleRetry() {
    setRetryCount((current) => current + 1);
    reset();
  }

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(251,207,232,0.16),transparent_30%),radial-gradient(circle_at_88%_0%,rgba(125,211,252,0.14),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f7fcff_45%,#ffffff_100%)] text-slate-950">
      <ErrorAtmosphere />

      <section className="relative mx-auto grid min-h-screen max-w-[92rem] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:py-14" aria-label="Route error recovery">
        <div className="relative z-10 max-w-4xl">
          <p className="text-sm font-semibold text-cyan-700">Route error</p>
          <h1 className="mt-4 max-w-5xl text-[clamp(3rem,7.6vw,6.8rem)] font-semibold leading-[0.86] tracking-[-0.09em] text-slate-950">
            The page did not load cleanly.
          </h1>
          <p className="mt-6 max-w-2xl text-base font-semibold leading-7 text-slate-600 sm:text-xl sm:leading-9">
            Try once. If it still fails, use a known Cendorq route instead of guessing through a broken path.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={handleRetry} className={PRIMARY_BUTTON_CLASS}>Try again</button>
            <Link href="/" className={SECONDARY_LINK_CLASS}>Homepage</Link>
            <Link href="/free-check" className={SECONDARY_LINK_CLASS}>Start Scan</Link>
          </div>
        </div>

        <section className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/88 p-5 shadow-[0_26px_84px_rgba(15,23,42,0.075)] backdrop-blur-2xl sm:p-7" aria-label="Error details">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(251,207,232,0.14),transparent_36%),radial-gradient(circle_at_100%_100%,rgba(186,230,253,0.1),transparent_40%)]" aria-hidden="true" />
          <div className="relative">
            <p className="text-sm font-semibold text-cyan-700">Recovery</p>
            <h2 className="mt-3 text-[clamp(2.25rem,4.7vw,4.6rem)] font-semibold leading-[0.92] tracking-[-0.075em] text-slate-950">Keep the path simple.</h2>
            <p className="mt-5 text-sm font-semibold leading-7 text-slate-600">
              Error message: {readableMessage}
            </p>
            <p className="mt-3 text-xs font-semibold leading-6 text-slate-500">Retry count: {retryCount}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/plans" className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">Plans</Link>
              <Link href="/login" className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">Sign-in/Sign-up</Link>
            </div>
          </div>
        </section>
      </section>

      <section className="sr-only" aria-label="Route error validation anchors">
        Route error. One clear page. Try again. Homepage. Start Scan. Plans. Sign-in/Sign-up. No Start Free Scan label. No Customer Access label. No crowded recovery card wall. No legacy Diagnose copy.
      </section>
    </main>
  );
}

function ErrorAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(251,207,232,0.12),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.09),transparent_27%),linear-gradient(180deg,rgba(255,255,255,0.45),rgba(248,252,255,0.68)_42%,rgba(255,255,255,0.95)_100%)]" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.014]" />
    </div>
  );
}

function buildReadableMessage(error: Error & { digest?: string }) {
  const raw = typeof error?.message === "string" ? error.message.trim() : "";
  if (!raw) return "The route returned an unexpected runtime interruption before the page could finish rendering.";
  if (raw.length <= 180) return raw;
  return `${raw.slice(0, 179)}...`;
}
