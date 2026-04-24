import type { ReactNode } from "react";

const consoleMetrics = [
  { label: "Total intakes", value: "—" },
  { label: "Average signal", value: "—" },
  { label: "Strong signal cases", value: "—" },
  { label: "Needs more detail", value: "—" },
];

const consolePreviewCards = [
  {
    title: "Submission stream",
    copy:
      "Preparing the intake feed so recent submissions, signal quality, and business context can load into a cleaner operating view.",
  },
  {
    title: "Signal patterning",
    copy:
      "Preparing the layer that shows whether trust, clarity, positioning, or conversion pressure is appearing across current intakes.",
  },
  {
    title: "Operator read",
    copy:
      "Preparing the faster internal read so the console helps with triage and prioritization instead of acting like a dead storage page.",
  },
  {
    title: "Pipeline control",
    copy:
      "Preparing the internal operating layer that keeps submission quality, review logic, and intake visibility easier to manage.",
  },
];

export default function IntakeConsoleLoadingPage() {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 text-white sm:px-6 md:py-16 xl:px-20">
      <ConsoleLoadingAtmosphere />

      <section className="relative z-10 max-w-5xl">
        <TopChip>Intake console loading</TopChip>

        <h1 className="system-hero-title mt-5 max-w-5xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
          Preparing the internal console
          <span className="system-gradient-text block">
            before the intake signal comes into view.
          </span>
        </h1>

        <p className="mt-6 max-w-4xl text-base leading-8 text-slate-300 sm:text-lg">
          This route is loading the operating view for free-check submissions so
          signal quality, intake patterns, and current business context can load
          through a strong internal dashboard instead of a weak or broken page.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <AuthorityPill>Internal operating view</AuthorityPill>
          <AuthorityPill>Signal triage layer</AuthorityPill>
          <AuthorityPill>Pipeline clarity</AuthorityPill>
        </div>
      </section>

      <section className="relative z-10 mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {consoleMetrics.map((item, index) => (
          <MetricCard
            key={item.label}
            label={item.label}
            value={item.value}
            highlighted={index === 1}
          />
        ))}
      </section>

      <section className="relative z-10 mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8 md:p-10">
          <TopChip>Route meaning</TopChip>

          <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            The system is loading the operator layer so submissions become readable,
            sortable, and usable instead of just stored.
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
            The intake console matters because submission volume means almost nothing
            without signal quality, pattern visibility, and a cleaner way to see
            what the system is actually receiving. That route should feel structured,
            serious, and internal-grade even while it loads.
          </p>

          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">
            This loading layer protects that transition so the console can prepare
            metrics, intake rows, and operator guidance without dropping the user
            into a blank or uncertain state.
          </p>

          <div className="mt-8">
            <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.22em] text-slate-400">
              <span>Console route readiness</span>
              <span>67%</span>
            </div>

            <div className="system-status-bar mt-2 h-2">
              <span style={{ width: "67%" }} />
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <StatusTile label="Submission stream" value="Preparing" highlighted />
            <StatusTile label="Signal patterns" value="Loading" />
            <StatusTile label="Operator read" value="Becoming clearer" />
          </div>
        </div>

        <div className="grid gap-4">
          <ReadoutCard
            label="Why this matters"
            value="The console should improve decision quality"
            copy="A strong intake system needs more than storage. It needs a live operating layer that helps sort signal, weakness, and next-step readiness."
          />
          <ReadoutCard
            label="What is loading"
            value="Metrics, submission rows, and internal readouts"
            copy="The route may be resolving stored intakes, preparing the console layout, or loading the operating structure used to review current submissions."
          />
          <ReadoutCard
            label="Best reading rule"
            value="Read patterns, not just entries"
            copy="The strongest console does not just display names and websites. It helps show what kind of signal is entering the system and what deserves attention first."
          />
        </div>
      </section>

      <section className="relative z-10 mt-20">
        <div className="max-w-3xl">
          <TopChip>Console preview</TopChip>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            The route is preparing the main internal operating groups.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {consolePreviewCards.map((card, index) => (
            <LoadingConsoleCard
              key={card.title}
              title={card.title}
              copy={card.copy}
              highlighted={index === 0}
            />
          ))}
        </div>

        <div className="mt-10 system-panel-authority rounded-[2rem] p-6 sm:p-8">
          <TopChip>Submission preview</TopChip>

          <div className="mt-6 grid gap-5">
            <SkeletonSubmission highlighted />
            <SkeletonSubmission />
          </div>
        </div>
      </section>
    </main>
  );
}

function ConsoleLoadingAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="system-orb-a absolute -left-10 top-8 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl sm:h-96 sm:w-96" />
      <div className="system-orb-b absolute -right-8 top-28 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl sm:h-80 sm:w-80" />
      <div className="system-orb-c absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-300/8 blur-3xl sm:h-[26rem] sm:w-[26rem]" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.03]" />
      <div className="system-scan-line absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
    </div>
  );
}

function TopChip({ children }: { children: ReactNode }) {
  return (
    <div className="system-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em]">
      {children}
    </div>
  );
}

function AuthorityPill({ children }: { children: ReactNode }) {
  return (
    <div className="system-tag-strong rounded-full px-4 py-2 text-sm">
      {children}
    </div>
  );
}

function MetricCard({
  label,
  value,
  highlighted = false,
}: {
  label: string;
  value: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={
        highlighted
          ? "system-chip rounded-[1.6rem] p-6"
          : "system-surface rounded-[1.6rem] p-6"
      }
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
        {label}
      </p>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-white">{value}</p>
    </div>
  );
}

function ReadoutCard({
  label,
  value,
  copy,
}: {
  label: string;
  value: string;
  copy: string;
}) {
  return (
    <div className="system-surface rounded-[1.5rem] p-5">
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
        {label}
      </div>
      <div className="mt-2 text-xl font-semibold text-white">{value}</div>
      <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>
    </div>
  );
}

function StatusTile({
  label,
  value,
  highlighted = false,
}: {
  label: string;
  value: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={
        highlighted
          ? "system-chip rounded-[1.25rem] px-4 py-4"
          : "system-surface rounded-[1.25rem] px-4 py-4"
      }
    >
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
        {label}
      </div>
      <div className="mt-2 text-sm font-semibold text-white">{value}</div>
    </div>
  );
}

function LoadingConsoleCard({
  title,
  copy,
  highlighted = false,
}: {
  title: string;
  copy: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={
        highlighted
          ? "system-panel-authority rounded-[1.7rem] p-6"
          : "system-surface rounded-[1.7rem] p-6"
      }
    >
      <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
        Console layer
      </div>

      <div className="mt-3 text-2xl font-semibold text-white">{title}</div>

      <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>

      <div className="mt-6 space-y-3">
        <SkeletonLine wide />
        <SkeletonLine />
        <SkeletonLine />
        <SkeletonLine short />
      </div>
    </div>
  );
}

function SkeletonSubmission({
  highlighted = false,
}: {
  highlighted?: boolean;
}) {
  return (
    <div
      className={
        highlighted
          ? "system-panel-authority rounded-[1.8rem] p-6"
          : "system-surface rounded-[1.8rem] p-6"
      }
    >
      <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="system-chip rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-100">
              Loading signal
            </div>
            <div className="system-surface rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-300">
              Reviewing
            </div>
          </div>

          <div className="mt-4 h-7 w-2/3 animate-pulse rounded-full bg-white/[0.06]" />

          <div className="mt-5 grid gap-3">
            <InlineSkeleton />
            <InlineSkeleton />
            <InlineSkeleton />
            <InlineSkeleton />
          </div>
        </div>

        <div className="grid gap-4">
          <ContentSkeleton />
          <ContentSkeleton />
          <ContentSkeleton />
        </div>
      </div>
    </div>
  );
}

function InlineSkeleton() {
  return (
    <div className="system-surface rounded-2xl px-4 py-4">
      <div className="h-2.5 w-1/3 animate-pulse rounded-full bg-white/[0.06]" />
      <div className="mt-3 h-3 w-5/6 animate-pulse rounded-full bg-white/[0.06]" />
    </div>
  );
}

function ContentSkeleton() {
  return (
    <div className="system-surface rounded-[1.5rem] p-5">
      <div className="h-2.5 w-1/4 animate-pulse rounded-full bg-white/[0.06]" />
      <div className="mt-4 space-y-3">
        <SkeletonLine wide />
        <SkeletonLine />
        <SkeletonLine />
        <SkeletonLine short />
      </div>
    </div>
  );
}

function SkeletonLine({
  wide = false,
  short = false,
}: {
  wide?: boolean;
  short?: boolean;
}) {
  const widthClass = wide ? "w-full" : short ? "w-1/2" : "w-5/6";

  return (
    <div className={`h-2.5 animate-pulse rounded-full bg-white/[0.06] ${widthClass}`} />
  );
}