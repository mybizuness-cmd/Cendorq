"use client";

import Link from "next/link";

type DisclaimerErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function DisclaimerErrorPage({
  error,
  reset,
}: DisclaimerErrorPageProps) {
  const reference =
    typeof error?.digest === "string" && error.digest.trim()
      ? error.digest.trim()
      : "No digest available";

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 text-white sm:px-6 md:py-16 xl:px-8">
      <div className="system-panel-authority rounded-[2rem] p-8">
        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-rose-300">
          Disclaimer route issue
        </div>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">
          The disclaimer page needs a cleaner retry.
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
          A runtime interruption affected this trust layer. Retry the page first.
          If the interruption continues, step back into a stable route instead of
          forcing a broken state.
        </p>

        <div className="mt-6 system-surface rounded-[1.4rem] p-4">
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
            Reference
          </div>
          <div className="mt-2 break-all text-sm text-slate-200">{reference}</div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="system-surface rounded-[1.4rem] p-5">
            <h2 className="text-lg font-semibold text-white">Retry the disclaimer page</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Use this first if the interruption looks temporary and you want the
              disclaimer route to attempt a clean recovery.
            </p>
            <button
              type="button"
              onClick={reset}
              className="system-button-primary mt-6 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition"
            >
              Retry disclaimer route
            </button>
          </div>

          <div className="system-surface rounded-[1.4rem] p-5">
            <h2 className="text-lg font-semibold text-white">Return to Terms</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Use this if you want to step back into the service-boundary layer
              through a stable route while the disclaimer page is unavailable.
            </p>
            <Link
              href="/terms"
              className="system-button-secondary mt-6 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition"
            >
              Read terms
            </Link>
          </div>

          <div className="system-surface rounded-[1.4rem] p-5">
            <h2 className="text-lg font-semibold text-white">Go to Home</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Use this if you want to re-enter the wider system from a stable route
              instead of staying inside a broken trust page.
            </p>
            <Link
              href="/"
              className="system-button-secondary mt-6 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition"
            >
              Return home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}