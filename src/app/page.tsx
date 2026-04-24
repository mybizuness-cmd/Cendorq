import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Report",
  description:
    "Structured report surface for saved Search Presence Scan output and next-step routing.",
  path: "/report",
});

export default function ReportPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 text-white sm:px-6 md:py-16 xl:px-8">
      <section className="system-panel-authority rounded-[2rem] p-8">
        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
          Report layer
        </div>

        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
          Structured report route
          <span className="system-gradient-text block">
            ready for saved intake and output rendering.
          </span>
        </h1>

        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
          This route keeps the report layer alive and compile-safe while the fuller
          saved-report engine is being stabilized. It preserves the destination in
          the system path without forcing undefined live data during build or typecheck.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="system-surface rounded-[1.5rem] p-5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              Current role
            </div>
            <div className="mt-3 text-xl font-semibold text-white">
              Stable report shell
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Holds the report destination in the route map while the heavier report
              state is refined.
            </p>
          </div>

          <div className="system-surface rounded-[1.5rem] p-5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              Best source
            </div>
            <div className="mt-3 text-xl font-semibold text-white">
              Intake Console
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              The strongest current internal operating read still lives in the intake
              console, where signal quality and routing posture are visible.
            </p>
          </div>

          <div className="system-surface rounded-[1.5rem] p-5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              Next route
            </div>
            <div className="mt-3 text-xl font-semibold text-white">
              Search Presence Scan
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              The intake layer remains the clearest route into stronger report logic
              and later output handling.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/intake-console"
            className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
          >
            Open Intake Console
          </Link>
          <Link
            href="/free-check"
            className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
          >
            Go to Search Presence Scan
          </Link>
        </div>
      </section>
    </main>
  );
}