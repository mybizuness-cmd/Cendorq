import { buildMetadata, siteConfig } from "@/lib/seo";
import { headers } from "next/headers";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata = buildMetadata({
  title: "Intake Console",
  description:
    "Internal Cendorq operating console for reviewing Search Presence Scan submissions, signal quality, scoring posture, routing readiness, risk flags, and intake integrity.",
  path: "/intake-console",
  keywords: [
    "cendorq intake console",
    "search presence scan console",
    "internal intake dashboard",
    "signal quality dashboard",
    "routing readiness console",
    "search presence operating console",
    "intake scoring dashboard",
  ],
  image: {
    alt: "Cendorq Intake Console — internal operating view for Search Presence Scan submissions, scoring posture, and routing readiness.",
  },
  noIndex: true,
});

type HeaderLike = {
  get(name: string): string | null;
};

type PageSearchParams = Record<string, string | string[] | undefined>;
type SourceState = "live" | "empty" | "unavailable" | "protected";
type RoutingHint =
  | "scan-only"
  | "blueprint-candidate"
  | "infrastructure-review"
  | "command-review";
type ScoreDecision = "reject" | "review" | "priority";
type ScoreTier = "low" | "mid" | "high";
type StrongestPressure =
  | "trust"
  | "clarity"
  | "positioning"
  | "action"
  | "mixed";
type ConfidenceLevel = "low" | "medium" | "high";
type FreeCheckSortMode = "recent" | "signal" | "score" | "priority";

type ApiEntry = Record<string, unknown>;

type ConsoleFilters = Readonly<{
  q: string;
  riskOnly: boolean;
  routingHint: RoutingHint | "";
  decision: ScoreDecision | "";
  confidence: ConfidenceLevel | "";
  minSignal: number | null;
  minScore: number | null;
  sort: FreeCheckSortMode;
  limit: number;
}>;

type NormalizedIntake = Readonly<{
  id: string;
  businessName: string;
  websiteUrl: string;
  websiteHostname: string;
  contactName: string;
  email: string;
  city: string;
  region: string;
  country: string;
  businessType: string;
  primaryOffer: string;
  audience: string;
  biggestIssue: string;
  competitors: string;
  notes: string;
  signalQuality: number | null;
  clarityScore: number | null;
  intentStrength: number | null;
  routingHint: RoutingHint;
  score: number | null;
  scoreTier: ScoreTier;
  decision: ScoreDecision;
  strongestPressure: StrongestPressure;
  submissionCount: number;
  riskFlags: string[];
  signalSummary: string;
  scoreSummary: string;
  confidenceLevel: ConfidenceLevel;
  dataDepthScore: number | null;
  timeSensitivity: "stable" | "watch" | "urgent";
  decisionMoment: string;
  explanationTrace: string[];
  scoreModules: {
    discoverability: number;
    recommendationVisibility: number;
    trustAuthority: number;
    conversionReadiness: number;
    competitiveExposure: number;
  };
  createdAt: string;
  updatedAt: string;
}>;

type ConsoleSummary = Readonly<{
  flagged: number;
  averageSignalQuality: number;
  averageScore: number;
  averageDataDepth: number;
  byRoutingHint: Record<RoutingHint, number>;
  byDecision: Record<ScoreDecision, number>;
}>;

type ConsoleAppliedFilters = Partial<{
  riskOnly: boolean;
  routingHint: RoutingHint | null;
  decision: ScoreDecision | null;
  confidence: ConfidenceLevel | null;
  minSignal: number | null;
  minScore: number | null;
  q: string | null;
  sort: FreeCheckSortMode | null;
}>;

type ConsoleData = Readonly<{
  entries: NormalizedIntake[];
  sourceState: SourceState;
  note: string;
  summary?: ConsoleSummary;
  appliedFilters?: ConsoleAppliedFilters;
}>;

type PatternCardData = Readonly<{
  title: string;
  value: string;
  copy: string;
}>;

const BRAND_NAME = "Cendorq";
const CATEGORY_LINE = "Search Presence OS";
const MAX_CONSOLE_ENTRIES = 150;
const RECENT_ENTRY_LIMIT = 8;
const STRONG_SIGNAL_THRESHOLD = 75;
const REVIEW_SIGNAL_THRESHOLD = 55;
const PRIORITY_SCORE_THRESHOLD = 18;

const QUICK_FILTERS = [
  {
    title: "Priority queue",
    copy: "Show submissions already leaning priority so the operator can review the strongest opportunities first.",
    overrides: { decision: "priority", sort: "priority", minScore: 18 },
  },
  {
    title: "Risk review",
    copy: "Surface flagged entries quickly so weak or suspicious signal can be isolated before it distorts the picture.",
    overrides: { riskOnly: true, sort: "recent" },
  },
  {
    title: "Blueprint candidates",
    copy: "Focus the board on businesses whose current signal is leaning toward Visibility Blueprint rather than scan-only review.",
    overrides: { routingHint: "blueprint-candidate", sort: "score" },
  },
  {
    title: "Strongest signal",
    copy: "Pull the feed toward higher-signal submissions so serious businesses rise above weaker noise.",
    overrides: { minSignal: 75, sort: "signal" },
  },
] as const;

const CONSOLE_REASONS = [
  {
    title: "See signal strength before routing gets misread.",
    copy:
      "The console exists to help operators read submission quality, business seriousness, and likely next-layer readiness instead of treating every intake like equally valuable raw storage.",
  },
  {
    title: "See risk, duplication, and pressure patterns early.",
    copy:
      "When weak detail, repeated submissions, or recurring problem themes start clustering, the console should make those patterns visible before they distort internal judgment.",
  },
  {
    title: "Keep the intake layer high-integrity.",
    copy:
      "A stronger operating surface makes weak, low-detail, suspicious, or misrouted submissions easier to isolate before they lower the quality of the broader intake picture.",
  },
] as const;

export default async function IntakeConsolePage({
  searchParams,
}: {
  searchParams?: Promise<PageSearchParams>;
}) {
  const resolvedParams = (await searchParams) ?? {};
  const filters = resolveConsoleFilters(resolvedParams);
  const headerStore = await headers();
  const consoleData = await getConsoleData(headerStore, filters);

  const metrics = buildMetrics(consoleData.entries, consoleData.summary);
  const patterns = buildPatternSummary(consoleData.entries, consoleData.summary);
  const recentEntries = consoleData.entries.slice(0, RECENT_ENTRY_LIMIT);
  const activeFilterRows = buildActiveFilterRows(
    filters,
    consoleData.appliedFilters,
  );

  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 text-white sm:px-6 md:py-16 xl:py-20">
      <ConsoleAtmosphere />

      <section className="relative z-10 border-b border-white/8 pb-10">
        <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
          <span className="system-chip rounded-full px-3 py-1.5 text-cyan-200">
            {BRAND_NAME}
          </span>
          <span className="text-white/20">/</span>
          <span className="text-white/70">{CATEGORY_LINE}</span>
          <span className="text-white/20">/</span>
          <span className="text-cyan-100">Intake Console</span>
        </div>
      </section>

      <section className="relative z-10 grid gap-10 pt-10 lg:grid-cols-[0.93fr_1.07fr] lg:items-start">
        <div>
          <TopChip>Intake Console</TopChip>

          <h1 className="system-hero-title mt-5 max-w-5xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
            The internal operating layer
            <span className="system-gradient-text block">
              for live Search Presence Scan review.
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            The intake console is built to help {BRAND_NAME} review live Search
            Presence Scan submissions through a stronger internal operating view
            — one that makes{" "}
            <strong className="font-semibold text-white">signal quality</strong>,{" "}
            <strong className="font-semibold text-white">score posture</strong>,{" "}
            <strong className="font-semibold text-white">
              routing readiness
            </strong>
            , and{" "}
            <strong className="font-semibold text-white">
              submission integrity
            </strong>{" "}
            easier to read before the wrong next move is taken internally.
          </p>

          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            This route should not behave like a flat storage page. It should
            behave like an internal intelligence surface that helps operators
            distinguish stronger signal from weaker noise and route businesses
            with more precision.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <AuthorityPill>Internal use only</AuthorityPill>
            <AuthorityPill>Signal triage</AuthorityPill>
            <AuthorityPill>Routing clarity</AuthorityPill>
          </div>

          <div className="system-panel-authority mt-8 rounded-[1.8rem] p-5 sm:p-6">
            <p className="system-eyebrow">What this route is really for</p>
            <h2 className="mt-4 text-2xl font-semibold text-white">
              It turns raw intake flow into an internal operating picture.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
              A strong intake system does more than collect form data. It helps
              the platform see what kind of businesses are entering the path,
              how strong those signals are, what route each business appears
              closest to, what priority level the scoring layer is assigning,
              and where low-quality or higher-risk noise is starting to appear.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <GuideTile
                label="Primary objective"
                value="Improve internal reading of live intake quality"
              />
              <GuideTile
                label="Main failure avoided"
                value="Treating all submissions like equally useful signal"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <TopChip>Console posture</TopChip>
                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  The console should make live intake signal easier to trust and
                  easier to act on.
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-300">
                  When the submission layer becomes easier to read, routing
                  improves, review quality improves, and weak or suspicious
                  noise becomes easier to isolate before it starts distorting
                  the internal operating picture.
                </p>
              </div>

              <div className="grid min-w-0 gap-3 sm:grid-cols-2 lg:w-[21rem]">
                <ReadoutTile
                  label="Source state"
                  value={sourceStateLabel(consoleData.sourceState)}
                  highlighted={consoleData.sourceState === "live"}
                />
                <ReadoutTile
                  label="Average signal"
                  value={metrics.averageSignalLabel}
                />
                <ReadoutTile
                  label="Average score"
                  value={metrics.averageScoreLabel}
                />
                <ReadoutTile
                  label="Priority-ready"
                  value={`${metrics.priority}`}
                />
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-4">
            <StatusTile
              label="Feed posture"
              value={sourceStateLabel(consoleData.sourceState)}
              highlighted={consoleData.sourceState === "live"}
            />
            <StatusTile label="Review bias" value="Specific over vague" />
            <StatusTile label="Routing bias" value="Signal before assumption" />
            <StatusTile label="Decision bias" value="Guarded" />
          </div>

          <div className="system-surface rounded-[1.7rem] p-6">
            <p className="system-eyebrow">Live source note</p>
            <p className="mt-4 text-base leading-8 text-slate-300">
              {consoleData.note}
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="system-surface rounded-[1.7rem] p-6">
              <p className="system-eyebrow">Routing board</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <BoundaryTile
                  label="Scan only"
                  value={`${metrics.byRoutingHint["scan-only"]}`}
                  highlighted
                />
                <BoundaryTile
                  label="Blueprint"
                  value={`${metrics.byRoutingHint["blueprint-candidate"]}`}
                />
                <BoundaryTile
                  label="Infrastructure"
                  value={`${metrics.byRoutingHint["infrastructure-review"]}`}
                />
                <BoundaryTile
                  label="Command"
                  value={`${metrics.byRoutingHint["command-review"]}`}
                />
              </div>
            </div>

            <div className="system-surface rounded-[1.7rem] p-6">
              <p className="system-eyebrow">Decision board</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <BoundaryTile
                  label="Reject"
                  value={`${metrics.byDecision.reject}`}
                  highlighted
                />
                <BoundaryTile
                  label="Review"
                  value={`${metrics.byDecision.review}`}
                />
                <BoundaryTile
                  label="Priority"
                  value={`${metrics.byDecision.priority}`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-20">
        <div className="max-w-3xl">
          <TopChip>Quick console routes</TopChip>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            The console gets stronger when the operator can move the board into
            the right review posture quickly.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {QUICK_FILTERS.map((item, index) => (
            <QuickFilterCard
              key={item.title}
              title={item.title}
              copy={item.copy}
              href={buildConsoleHref(filters, item.overrides)}
              highlighted={index === 0}
            />
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-20 grid gap-6 lg:grid-cols-[1.03fr_0.97fr]">
        <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8 md:p-10">
          <TopChip>Applied filters</TopChip>
          <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            The board should always make its current review posture visible.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {activeFilterRows.map((item, index) => (
              <FilterTile
                key={item.label}
                label={item.label}
                value={item.value}
                highlighted={index === 0 && item.value !== "—"}
              />
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/intake-console"
              className="system-button-secondary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition"
            >
              Clear filters
            </Link>
            <Link
              href={buildConsoleHref(filters, { sort: "recent" })}
              className="system-button-secondary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition"
            >
              Sort by recent
            </Link>
            <Link
              href={buildConsoleHref(filters, { sort: "signal" })}
              className="system-button-secondary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition"
            >
              Sort by signal
            </Link>
            <Link
              href={buildConsoleHref(filters, { sort: "priority" })}
              className="system-button-primary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition"
            >
              Sort by priority
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="system-panel-authority rounded-[1.8rem] p-6">
            <TopChip>Filter shortcuts</TopChip>
            <div className="mt-5 grid gap-3">
              <Link
                href={buildConsoleHref(filters, {
                  confidence: "low",
                  sort: "recent",
                })}
                className="system-surface rounded-[1.2rem] px-4 py-4 text-sm leading-7 text-slate-200 transition hover:border-cyan-400/30 hover:text-white"
              >
                Low-confidence review
              </Link>
              <Link
                href={buildConsoleHref(filters, {
                  minSignal: 60,
                  minScore: 18,
                  sort: "score",
                })}
                className="system-surface rounded-[1.2rem] px-4 py-4 text-sm leading-7 text-slate-200 transition hover:border-cyan-400/30 hover:text-white"
              >
                Strong signal plus stronger scoring
              </Link>
              <Link
                href={buildConsoleHref(filters, { q: "trust", sort: "score" })}
                className="system-surface rounded-[1.2rem] px-4 py-4 text-sm leading-7 text-slate-200 transition hover:border-cyan-400/30 hover:text-white"
              >
                Pressure search: trust
              </Link>
              <Link
                href={buildConsoleHref(filters, {
                  q: "positioning",
                  sort: "score",
                })}
                className="system-surface rounded-[1.2rem] px-4 py-4 text-sm leading-7 text-slate-200 transition hover:border-cyan-400/30 hover:text-white"
              >
                Pressure search: positioning
              </Link>
            </div>
          </div>

          <div className="system-surface rounded-[1.8rem] p-6">
            <p className="system-eyebrow">Console API surface now active</p>
            <p className="mt-4 text-base leading-8 text-slate-300">
              This board is now wired to a stronger intake read surface that
              supports decision filters, routing filters, confidence filters,
              risk views, minimum thresholds, keyword search, and multiple sort
              modes.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-20 grid gap-5 md:grid-cols-2 xl:grid-cols-6">
        <MetricCard
          label="Total intakes"
          value={`${metrics.total}`}
          helper="All normalized entries currently available to this internal view."
          highlighted
        />
        <MetricCard
          label="Average signal"
          value={metrics.averageSignalLabel}
          helper="Average signal quality across entries with a readable score."
        />
        <MetricCard
          label="Average score"
          value={metrics.averageScoreLabel}
          helper="Average scoring posture across readable entries."
        />
        <MetricCard
          label="Average data depth"
          value={metrics.averageDataDepthLabel}
          helper="Average business-context depth across readable entries."
        />
        <MetricCard
          label="Strong signals"
          value={`${metrics.strongSignals}`}
          helper="Entries at or above the strong-signal threshold."
        />
        <MetricCard
          label="Flagged"
          value={`${metrics.flagged}`}
          helper="Entries carrying one or more risk flags from the API layer."
        />
        <MetricCard
          label="Needs review"
          value={`${metrics.needsReview}`}
          helper="Entries likely needing closer operator review before routing."
        />
      </section>

      <section className="relative z-10 mt-20 grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
        <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8 md:p-10">
          <TopChip>Current filtered feed</TopChip>
          <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            The active board should surface the most useful entries for the
            current review posture, not just the latest raw records.
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
            This feed is designed to help operators read who submitted, what
            kind of business entered, how strong the signal looks, what routing
            hint is emerging, how the scoring layer is classifying the entry,
            and whether the record needs closer review without forcing a weak
            flat-list workflow.
          </p>

          {recentEntries.length > 0 ? (
            <div className="mt-8 grid gap-4">
              {recentEntries.map((entry, index) => (
                <IntakeCard
                  key={entry.id}
                  entry={entry}
                  highlighted={index === 0}
                />
              ))}
            </div>
          ) : (
            <EmptyConsoleCard sourceState={consoleData.sourceState} />
          )}
        </div>

        <div className="grid gap-4">
          <div className="system-panel-authority rounded-[1.8rem] p-6">
            <TopChip>Pattern board</TopChip>
            <div className="mt-5 grid gap-4">
              {patterns.map((pattern, index) => (
                <PatternCard
                  key={pattern.title}
                  title={pattern.title}
                  value={pattern.value}
                  copy={pattern.copy}
                  highlighted={index === 0}
                />
              ))}
            </div>
          </div>

          {CONSOLE_REASONS.map((item, index) => (
            <InfoPanel
              key={item.title}
              title={item.title}
              copy={item.copy}
              highlighted={index === 0}
            />
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-20">
        <div className="system-panel-authority rounded-[2rem] p-6 text-center sm:p-8 md:p-10">
          <TopChip>Internal routing rule</TopChip>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Stronger intake review means stronger path decisions later.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-300">
            When the console makes first-signal quality easier to read, the
            platform gets better at distinguishing between stronger submissions,
            weaker signal, repeat updates, risk-marked entries, and businesses
            that may need a different level of depth next.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/free-check"
              className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
            >
              Go to Search Presence Scan
            </Link>
            <Link
              href="/pricing"
              className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
            >
              Review system path
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

async function getConsoleData(
  headerStore: HeaderLike,
  filters: ConsoleFilters,
): Promise<ConsoleData> {
  const origin = buildOrigin(headerStore);
  const adminKey = configuredReadKey();
  const query = buildConsoleApiQuery(filters);

  try {
    const response = await fetch(`${origin}/api/free-check?${query}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        ...(adminKey ? { "x-intake-admin-key": adminKey } : {}),
      },
    });

    if (response.status === 401) {
      return {
        entries: [],
        sourceState: "protected",
        note:
          "The console route is protected, but the current page request does not have a valid intake-console read key available to access the live feed.",
      };
    }

    if (!response.ok) {
      return {
        entries: [],
        sourceState: "unavailable",
        note:
          "The console structure is live, but a readable intake feed was not returned from the current API route. This usually means the GET layer is unavailable or the current route response failed.",
      };
    }

    const payload = (await response.json()) as unknown;
    const rawEntries = extractEntries(payload);
    const entries = dedupeEntries(
      rawEntries.map((record, index) => normalizeIntake(record, index)),
    ).filter(isUsefulEntry);

    const summary = extractSummary(payload);
    const appliedFilters = extractAppliedFilters(payload);

    if (entries.length === 0) {
      return {
        entries: [],
        sourceState: "empty",
        note:
          "The intake route responded, but there are no readable submissions available to display in the current filter posture yet.",
        summary,
        appliedFilters,
      };
    }

    return {
      entries,
      sourceState: "live",
      note:
        "The console is reading live Search Presence Scan data from the current intake route and normalizing it into an internal operating view.",
      summary,
      appliedFilters,
    };
  } catch {
    return {
      entries: [],
      sourceState: "unavailable",
      note:
        "The console could not reach a live intake feed from the current route, so it is rendering the internal operating structure without active submission data.",
    };
  }
}

function resolveConsoleFilters(searchParams: PageSearchParams): ConsoleFilters {
  const riskOnly = firstParam(searchParams.riskOnly) === "1";
  const routingHint = normalizeRoutingHintValue(
    firstParam(searchParams.routingHint),
  );
  const decision = normalizeDecisionValue(firstParam(searchParams.decision));
  const confidence = normalizeConfidenceLevelValue(
    firstParam(searchParams.confidence),
  );
  const minSignal = parseOptionalInteger(
    firstParam(searchParams.minSignal),
    0,
    100,
  );
  const minScore = parseOptionalInteger(
    firstParam(searchParams.minScore),
    0,
    100,
  );
  const q = cleanString(firstParam(searchParams.q) ?? "", 160);
  const sort = normalizeSortModeValue(firstParam(searchParams.sort)) || "recent";
  const limit = clampInteger(
    firstParam(searchParams.limit),
    1,
    MAX_CONSOLE_ENTRIES,
    100,
  );

  return {
    q,
    riskOnly,
    routingHint,
    decision,
    confidence,
    minSignal,
    minScore,
    sort,
    limit,
  };
}

function buildConsoleApiQuery(filters: ConsoleFilters) {
  const params = new URLSearchParams();
  params.set("limit", String(filters.limit));
  params.set("sort", filters.sort);
  if (filters.riskOnly) params.set("riskOnly", "1");
  if (filters.routingHint) params.set("routingHint", filters.routingHint);
  if (filters.decision) params.set("decision", filters.decision);
  if (filters.confidence) params.set("confidence", filters.confidence);
  if (typeof filters.minSignal === "number") {
    params.set("minSignal", String(filters.minSignal));
  }
  if (typeof filters.minScore === "number") {
    params.set("minScore", String(filters.minScore));
  }
  if (filters.q) params.set("q", filters.q);
  return params.toString();
}

function buildConsoleHref(
  current: ConsoleFilters,
  overrides: Partial<ConsoleFilters>,
) {
  const merged: ConsoleFilters = {
    ...current,
    ...overrides,
    q: overrides.q === undefined ? current.q : overrides.q,
  };

  const params = new URLSearchParams();
  if (merged.q) params.set("q", merged.q);
  if (merged.riskOnly) params.set("riskOnly", "1");
  if (merged.routingHint) params.set("routingHint", merged.routingHint);
  if (merged.decision) params.set("decision", merged.decision);
  if (merged.confidence) params.set("confidence", merged.confidence);
  if (typeof merged.minSignal === "number") {
    params.set("minSignal", String(merged.minSignal));
  }
  if (typeof merged.minScore === "number") {
    params.set("minScore", String(merged.minScore));
  }
  if (merged.sort !== "recent") params.set("sort", merged.sort);
  if (merged.limit !== 100) params.set("limit", String(merged.limit));

  const suffix = params.toString();
  return suffix ? `/intake-console?${suffix}` : "/intake-console";
}

function buildActiveFilterRows(
  filters: ConsoleFilters,
  appliedFilters?: ConsoleAppliedFilters,
) {
  return [
    { label: "Keyword", value: appliedFilters?.q || filters.q || "—" },
    {
      label: "Routing hint",
      value: appliedFilters?.routingHint || filters.routingHint || "—",
    },
    {
      label: "Decision",
      value: appliedFilters?.decision || filters.decision || "—",
    },
    {
      label: "Confidence",
      value: appliedFilters?.confidence || filters.confidence || "—",
    },
    {
      label: "Minimum signal",
      value:
        typeof (appliedFilters?.minSignal ?? filters.minSignal) === "number"
          ? `${appliedFilters?.minSignal ?? filters.minSignal}%`
          : "—",
    },
    {
      label: "Minimum score",
      value:
        typeof (appliedFilters?.minScore ?? filters.minScore) === "number"
          ? `${appliedFilters?.minScore ?? filters.minScore}`
          : "—",
    },
    {
      label: "Risk only",
      value: (appliedFilters?.riskOnly ?? filters.riskOnly) ? "Active" : "Off",
    },
    { label: "Sort mode", value: appliedFilters?.sort || filters.sort || "recent" },
    { label: "Result limit", value: `${filters.limit}` },
  ];
}

function extractAppliedFilters(payload: unknown): ConsoleAppliedFilters | undefined {
  if (!isRecord(payload) || !isRecord(payload.appliedFilters)) return undefined;
  const value = payload.appliedFilters;
  return {
    riskOnly: value.riskOnly === true,
    routingHint: normalizeRoutingHintValue(value.routingHint) || null,
    decision: normalizeDecisionValue(value.decision) || null,
    confidence: normalizeConfidenceLevelValue(value.confidence) || null,
    minSignal: parseUnknownOptionalInteger(value.minSignal, 0, 100),
    minScore: parseUnknownOptionalInteger(value.minScore, 0, 100),
    q: cleanString(value.q, 160) || null,
    sort: normalizeSortModeValue(value.sort) || null,
  };
}

function configuredReadKey() {
  const envCandidates = [
    process.env.INTAKE_CONSOLE_READ_KEY,
    process.env.INTAKE_ADMIN_KEY,
  ];

  for (const candidate of envCandidates) {
    const cleaned = cleanString(candidate ?? "", 200);
    if (cleaned) return cleaned;
  }

  return "";
}

function buildOrigin(headerStore: HeaderLike) {
  const forwardedProto = headerStore.get("x-forwarded-proto");
  const forwardedHost = headerStore.get("x-forwarded-host");
  const host = forwardedHost ?? headerStore.get("host");

  if (host) {
    const protocol =
      forwardedProto ?? (host.includes("localhost") ? "http" : "https");

    try {
      return new URL(`${protocol}://${host}`).origin;
    } catch {
      return safeSiteOrigin(siteConfig.siteUrl);
    }
  }

  return safeSiteOrigin(siteConfig.siteUrl);
}

function safeSiteOrigin(value: string) {
  try {
    return new URL(value).origin;
  } catch {
    return "http://localhost:3000";
  }
}

function extractEntries(payload: unknown): ApiEntry[] {
  if (Array.isArray(payload)) {
    return payload.filter(isRecord);
  }

  if (!isRecord(payload)) {
    return [];
  }

  const directKeys = [
    "entries",
    "intakes",
    "submissions",
    "items",
    "results",
    "data",
  ] as const;

  for (const key of directKeys) {
    const candidate = payload[key];
    if (Array.isArray(candidate)) {
      return candidate.filter(isRecord);
    }
    if (isRecord(candidate)) {
      const nested = extractEntries(candidate);
      if (nested.length > 0) return nested;
    }
  }

  return [];
}

function extractSummary(payload: unknown): ConsoleSummary | undefined {
  if (!isRecord(payload) || !isRecord(payload.summary)) return undefined;

  const summary = payload.summary;
  const byRoutingHintRaw = summary.byRoutingHint;
  const byDecisionRaw = summary.byDecision;

  if (!isRecord(byRoutingHintRaw) || !isRecord(byDecisionRaw)) return undefined;

  return {
    flagged: safeNumber(summary.flagged),
    averageSignalQuality: safeNumber(summary.averageSignalQuality),
    averageScore: safeNumber(summary.averageScore),
    averageDataDepth: safeNumber(summary.averageDataDepth),
    byRoutingHint: {
      "scan-only": safeNumber(byRoutingHintRaw["scan-only"]),
      "blueprint-candidate": safeNumber(
        byRoutingHintRaw["blueprint-candidate"],
      ),
      "infrastructure-review": safeNumber(
        byRoutingHintRaw["infrastructure-review"],
      ),
      "command-review": safeNumber(byRoutingHintRaw["command-review"]),
    },
    byDecision: {
      reject: safeNumber(byDecisionRaw.reject),
      review: safeNumber(byDecisionRaw.review),
      priority: safeNumber(byDecisionRaw.priority),
    },
  };
}

function normalizeIntake(record: ApiEntry, index: number): NormalizedIntake {
  const websiteUrl = normalizeWebsite(
    firstString(record, ["websiteUrl", "website", "siteUrl", "url"]),
  );

  const createdAt = firstString(record, ["createdAt", "submittedAt", "timestamp"]);
  const updatedAt = firstString(record, [
    "updatedAt",
    "createdAt",
    "submittedAt",
    "timestamp",
  ]);

  return {
    id:
      firstString(record, ["intakeId", "submissionId", "id", "_id"]) ||
      `intake-${index + 1}`,
    businessName:
      firstString(record, ["businessName", "companyName", "company", "name"]) ||
      "Unnamed business",
    websiteUrl,
    websiteHostname:
      firstString(record, ["websiteHostname"]) || deriveHostname(websiteUrl),
    contactName: firstString(record, ["fullName", "contactName", "ownerName"]),
    email: firstString(record, ["email", "contactEmail"]),
    city: firstString(record, ["city"]),
    region: firstString(record, ["stateRegion", "state", "province", "region"]),
    country: firstString(record, ["country"]),
    businessType: firstString(record, ["businessType", "industry", "type"]),
    primaryOffer: firstString(record, ["primaryOffer", "offer", "service", "product"]),
    audience: firstString(record, ["audience", "targetAudience"]),
    biggestIssue: firstString(record, [
      "biggestIssue",
      "issue",
      "problem",
      "mainProblem",
    ]),
    competitors: firstString(record, ["competitors"]),
    notes: firstString(record, ["notes", "extraNotes"]),
    signalQuality: clampSignal(firstNumber(record, ["signalQuality", "qualityScore"])),
    clarityScore: clampMetric(firstNumber(record, ["clarityScore"])),
    intentStrength: clampMetric(firstNumber(record, ["intentStrength"])),
    routingHint: firstRoutingHint(record, ["routingHint"]),
    score: clampSignal(firstNumber(record, ["score"])),
    scoreTier: firstScoreTier(record, ["scoreTier", "tier"]),
    decision: firstDecision(record, ["decision"]),
    strongestPressure: firstStrongestPressure(record, ["strongestPressure"]),
    submissionCount: clampCount(firstNumber(record, ["submissionCount"])),
    riskFlags: firstStringArray(record, ["riskFlags"]),
    signalSummary: firstString(record, ["signalSummary"]),
    scoreSummary: firstString(record, ["scoreSummary"]),
    confidenceLevel: firstConfidenceLevel(record, ["confidenceLevel"]),
    dataDepthScore: clampSignal(firstNumber(record, ["dataDepthScore"])),
    timeSensitivity: firstTimeSensitivity(record, ["timeSensitivity"]),
    decisionMoment: firstString(record, ["decisionMoment"]),
    explanationTrace: firstStringArray(record, ["explanationTrace"]),
    scoreModules: {
      discoverability:
        clampSignal(firstNestedNumber(record, "scoreModules", "discoverability")) ?? 0,
      recommendationVisibility:
        clampSignal(
          firstNestedNumber(record, "scoreModules", "recommendationVisibility"),
        ) ?? 0,
      trustAuthority:
        clampSignal(firstNestedNumber(record, "scoreModules", "trustAuthority")) ?? 0,
      conversionReadiness:
        clampSignal(
          firstNestedNumber(record, "scoreModules", "conversionReadiness"),
        ) ?? 0,
      competitiveExposure:
        clampSignal(
          firstNestedNumber(record, "scoreModules", "competitiveExposure"),
        ) ?? 0,
    },
    createdAt,
    updatedAt,
  };
}

function dedupeEntries(entries: NormalizedIntake[]) {
  const seen = new Set<string>();
  const result: NormalizedIntake[] = [];

  for (const entry of entries) {
    const key =
      entry.id || `${entry.businessName}::${entry.websiteHostname}::${entry.updatedAt}`;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(entry);
  }

  return result.sort((left, right) => {
    const leftDate = sortableDate(left.updatedAt || left.createdAt);
    const rightDate = sortableDate(right.updatedAt || right.createdAt);
    return rightDate.localeCompare(leftDate);
  });
}

function sortableDate(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toISOString();
}

function isUsefulEntry(entry: NormalizedIntake) {
  return Boolean(
    entry.businessName ||
      entry.websiteUrl ||
      entry.biggestIssue ||
      entry.primaryOffer ||
      entry.contactName,
  );
}

function buildMetrics(entries: NormalizedIntake[], summary?: ConsoleSummary) {
  const signalValues = entries
    .map((entry) => entry.signalQuality)
    .filter((value): value is number => typeof value === "number");

  const scoreValues = entries
    .map((entry) => entry.score)
    .filter((value): value is number => typeof value === "number");

  const averageSignal =
    typeof summary?.averageSignalQuality === "number" &&
    summary.averageSignalQuality > 0
      ? summary.averageSignalQuality
      : signalValues.length > 0
        ? Math.round(
            signalValues.reduce((sum, value) => sum + value, 0) /
              signalValues.length,
          )
        : null;

  const averageScore =
    typeof summary?.averageScore === "number" && summary.averageScore > 0
      ? summary.averageScore
      : scoreValues.length > 0
        ? Math.round(
            scoreValues.reduce((sum, value) => sum + value, 0) /
              scoreValues.length,
          )
        : null;

  const dataDepthValues = entries
    .map((entry) => entry.dataDepthScore)
    .filter((value): value is number => typeof value === "number");

  const averageDataDepth =
    typeof summary?.averageDataDepth === "number" &&
    summary.averageDataDepth > 0
      ? summary.averageDataDepth
      : dataDepthValues.length > 0
        ? Math.round(
            dataDepthValues.reduce((sum, value) => sum + value, 0) /
              dataDepthValues.length,
          )
        : null;

  const strongSignals = entries.filter(
    (entry) =>
      typeof entry.signalQuality === "number" &&
      entry.signalQuality >= STRONG_SIGNAL_THRESHOLD,
  ).length;

  const flagged =
    summary?.flagged ?? entries.filter((entry) => entry.riskFlags.length > 0).length;

  const needsReview = entries.filter((entry) => {
    const weakIssue =
      entry.biggestIssue.trim().length > 0 && entry.biggestIssue.trim().length < 70;
    const missingSite = !entry.websiteUrl;
    const lowSignal =
      typeof entry.signalQuality === "number"
        ? entry.signalQuality < REVIEW_SIGNAL_THRESHOLD
        : false;
    const missingBusinessContext =
      !entry.businessType && !entry.primaryOffer && !entry.audience;
    const flaggedRisk = entry.riskFlags.length > 0;
    const nonPriorityScore =
      typeof entry.score === "number" ? entry.score < PRIORITY_SCORE_THRESHOLD : true;

    return (
      weakIssue ||
      missingSite ||
      lowSignal ||
      missingBusinessContext ||
      flaggedRisk ||
      nonPriorityScore
    );
  }).length;

  const priority =
    summary?.byDecision.priority ??
    entries.filter((entry) => entry.decision === "priority").length;

  const byRoutingHint =
    summary?.byRoutingHint ?? {
      "scan-only": entries.filter((entry) => entry.routingHint === "scan-only").length,
      "blueprint-candidate": entries.filter(
        (entry) => entry.routingHint === "blueprint-candidate",
      ).length,
      "infrastructure-review": entries.filter(
        (entry) => entry.routingHint === "infrastructure-review",
      ).length,
      "command-review": entries.filter(
        (entry) => entry.routingHint === "command-review",
      ).length,
    };

  const byDecision =
    summary?.byDecision ?? {
      reject: entries.filter((entry) => entry.decision === "reject").length,
      review: entries.filter((entry) => entry.decision === "review").length,
      priority: entries.filter((entry) => entry.decision === "priority").length,
    };

  return {
    total: entries.length,
    averageSignal,
    averageSignalLabel: averageSignal === null ? "—" : `${averageSignal}%`,
    averageScore,
    averageScoreLabel: averageScore === null ? "—" : `${averageScore}`,
    averageDataDepth,
    averageDataDepthLabel: averageDataDepth === null ? "—" : `${averageDataDepth}%`,
    strongSignals,
    flagged,
    needsReview,
    priority,
    byRoutingHint,
    byDecision,
  };
}

function buildPatternSummary(
  entries: NormalizedIntake[],
  summary?: ConsoleSummary,
): PatternCardData[] {
  if (entries.length === 0) {
    return [
      {
        title: "Dominant pressure",
        value: "Awaiting live feed",
        copy:
          "Pattern recognition becomes more useful once the console has readable submission volume.",
      },
      {
        title: "Primary routing lane",
        value: "—",
        copy:
          "Routing concentration becomes meaningful once live entries are flowing through the intake route.",
      },
      {
        title: "Decision posture",
        value: "—",
        copy:
          "Decision posture becomes useful once readable score output is entering the board consistently.",
      },
    ];
  }

  const dominantPressure = mostFrequent(
    entries.map((entry) => entry.strongestPressure),
  );
  const dominantRoutingHint = mostFrequent(
    entries.map((entry) => entry.routingHint),
  );
  const dominantDecision = mostFrequent(entries.map((entry) => entry.decision));
  const averageSignal =
    summary?.averageSignalQuality ??
    Math.round(
      entries.reduce((sum, entry) => sum + (entry.signalQuality ?? 0), 0) /
        entries.length,
    );

  return [
    {
      title: "Dominant pressure",
      value: dominantPressure || "mixed",
      copy:
        "This shows which pressure theme is appearing most often in the currently filtered board posture.",
    },
    {
      title: "Primary routing lane",
      value: dominantRoutingHint || "scan-only",
      copy:
        "This shows where the filtered intake pool is leaning right now at the routing-hint level.",
    },
    {
      title: "Decision posture",
      value: dominantDecision || "review",
      copy:
        "This shows the dominant scoring decision inside the current operating slice.",
    },
    {
      title: "Average signal climate",
      value: `${averageSignal}%`,
      copy:
        "This helps the operator judge whether the current board posture is leaning toward stronger signal or weaker noise overall.",
    },
  ];
}

function sourceStateLabel(value: SourceState) {
  if (value === "live") return "Live";
  if (value === "protected") return "Protected";
  if (value === "empty") return "Empty";
  return "Unavailable";
}

function firstParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

function firstString(record: ApiEntry, keys: string[]) {
  for (const key of keys) {
    const value = cleanString(record[key], 500);
    if (value) return value;
  }
  return "";
}

function firstNumber(record: ApiEntry, keys: string[]) {
  for (const key of keys) {
    const value = record[key];
    const parsed = parseUnknownOptionalInteger(value, 0, 100);
    if (typeof parsed === "number") return parsed;
  }
  return null;
}

function firstNestedNumber(record: ApiEntry, parent: string, child: string) {
  const value = record[parent];
  if (!isRecord(value)) return null;
  return parseUnknownOptionalInteger(value[child], 0, 100);
}

function firstRoutingHint(record: ApiEntry, keys: string[]): RoutingHint {
  for (const key of keys) {
    const value = normalizeRoutingHintValue(record[key]);
    if (value) return value;
  }
  return "scan-only";
}

function firstDecision(record: ApiEntry, keys: string[]): ScoreDecision {
  for (const key of keys) {
    const value = normalizeDecisionValue(record[key]);
    if (value) return value;
  }
  return "review";
}

function firstScoreTier(record: ApiEntry, keys: string[]): ScoreTier {
  for (const key of keys) {
    const value = normalizeScoreTierValue(record[key]);
    if (value) return value;
  }
  return "mid";
}

function firstStrongestPressure(
  record: ApiEntry,
  keys: string[],
): StrongestPressure {
  for (const key of keys) {
    const value = normalizeStrongestPressure(record[key]);
    if (value) return value;
  }
  return "mixed";
}

function firstConfidenceLevel(
  record: ApiEntry,
  keys: string[],
): ConfidenceLevel {
  for (const key of keys) {
    const value = normalizeConfidenceLevelValue(record[key]);
    if (value) return value;
  }
  return "medium";
}

function firstTimeSensitivity(
  record: ApiEntry,
  keys: string[],
): "stable" | "watch" | "urgent" {
  for (const key of keys) {
    const value = record[key];
    if (value === "stable" || value === "watch" || value === "urgent") {
      return value;
    }
  }
  return "stable";
}

function firstStringArray(record: ApiEntry, keys: string[]) {
  for (const key of keys) {
    const value = record[key];
    if (!Array.isArray(value)) continue;
    const cleaned = value
      .filter((item): item is string => typeof item === "string")
      .map((item) => cleanString(item, 240))
      .filter(Boolean);
    if (cleaned.length > 0) return cleaned;
  }
  return [] as string[];
}

function deriveHostname(value: string) {
  if (!value) return "";
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return (
      value
        .replace(/^https?:\/\//, "")
        .replace(/^www\./, "")
        .split("/")[0] ?? ""
    );
  }
}

function normalizeWebsite(value: string) {
  if (!value) return "";
  try {
    const url = new URL(value.startsWith("http") ? value : `https://${value}`);
    return url.toString();
  } catch {
    return value;
  }
}

function clampSignal(value: number | null) {
  if (typeof value !== "number") return null;
  return clamp(value, 0, 100);
}

function clampMetric(value: number | null) {
  if (typeof value !== "number") return null;
  return clamp(value, 0, 100);
}

function clampCount(value: number | null) {
  if (typeof value !== "number") return 1;
  return clamp(value, 1, 10_000);
}

function parseUnknownOptionalInteger(value: unknown, min: number, max: number) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return clamp(Math.trunc(value), min, max);
  }
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return clamp(Math.trunc(parsed), min, max);
  }
  return null;
}

function safeNumber(value: unknown) {
  return parseUnknownOptionalInteger(value, 0, 10_000) ?? 0;
}

function mostFrequent(values: string[]) {
  const counts = new Map<string, number>();
  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  let winner = "";
  let highest = -1;
  for (const [value, count] of counts.entries()) {
    if (count > highest) {
      highest = count;
      winner = value;
    }
  }
  return winner;
}

function formatDate(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "Unknown date";
  return parsed.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function pressureLabel(value: StrongestPressure) {
  if (value === "trust") return "Trust";
  if (value === "clarity") return "Clarity";
  if (value === "positioning") return "Positioning";
  if (value === "action") return "Action";
  return "Mixed";
}

function riskLabel(entry: NormalizedIntake) {
  return entry.riskFlags.length > 0 ? `${entry.riskFlags.length} flags` : "No flags";
}

function ConsoleAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-10 top-8 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl sm:h-96 sm:w-96" />
      <div className="absolute -right-8 top-28 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl sm:h-80 sm:w-80" />
      <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-300/8 blur-3xl sm:h-[26rem] sm:w-[26rem]" />
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
  return <div className="system-tag-strong rounded-full px-4 py-2 text-sm">{children}</div>;
}

function GuideTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="system-surface rounded-[1.2rem] px-4 py-4">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-sm font-medium text-white">{value}</p>
    </div>
  );
}

function ReadoutTile({
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
          ? "system-chip rounded-[1.3rem] p-4"
          : "system-surface rounded-[1.3rem] p-4"
      }
    >
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
        {label}
      </div>
      <div className="mt-2 text-base font-semibold leading-6 text-white">{value}</div>
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
          ? "system-chip rounded-[1.3rem] p-4"
          : "system-surface rounded-[1.3rem] p-4"
      }
    >
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
        {label}
      </div>
      <div className="mt-2 text-sm font-semibold leading-6 text-white">{value}</div>
    </div>
  );
}

function BoundaryTile({
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
          ? "system-chip rounded-[1.2rem] px-4 py-4"
          : "system-surface rounded-[1.2rem] px-4 py-4"
      }
    >
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
        {label}
      </div>
      <div className="mt-2 text-xl font-semibold text-white">{value}</div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  helper,
  highlighted = false,
}: {
  label: string;
  value: string;
  helper: string;
  highlighted?: boolean;
}) {
  return (
    <article
      className={
        highlighted
          ? "system-panel-authority rounded-[1.7rem] p-5"
          : "system-surface rounded-[1.7rem] p-5"
      }
    >
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
        {label}
      </div>
      <div className="mt-3 text-3xl font-semibold tracking-tight text-white">{value}</div>
      <p className="mt-3 text-sm leading-7 text-slate-300">{helper}</p>
    </article>
  );
}

function QuickFilterCard({
  title,
  copy,
  href,
  highlighted = false,
}: {
  title: string;
  copy: string;
  href: string;
  highlighted?: boolean;
}) {
  return (
    <article
      className={
        highlighted
          ? "system-panel-authority rounded-[1.75rem] p-6"
          : "system-surface rounded-[1.75rem] p-6"
      }
    >
      <h3 className="text-2xl font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-300">{copy}</p>
      <div className="mt-6">
        <Link
          href={href}
          className={
            highlighted
              ? "system-button-primary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition"
              : "system-button-secondary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition"
          }
        >
          Open board
        </Link>
      </div>
    </article>
  );
}

function FilterTile({
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
          ? "system-chip rounded-[1.2rem] px-4 py-4"
          : "system-surface rounded-[1.2rem] px-4 py-4"
      }
    >
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
        {label}
      </div>
      <div className="mt-2 text-sm font-semibold leading-7 text-white">{value}</div>
    </div>
  );
}

function PatternCard({
  title,
  value,
  copy,
  highlighted = false,
}: {
  title: string;
  value: string;
  copy: string;
  highlighted?: boolean;
}) {
  return (
    <article
      className={
        highlighted
          ? "system-panel-authority rounded-[1.6rem] p-5"
          : "system-surface rounded-[1.6rem] p-5"
      }
    >
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
        {title}
      </div>
      <div className="mt-3 text-2xl font-semibold tracking-tight text-white">{value}</div>
      <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>
    </article>
  );
}

function InfoPanel({
  title,
  copy,
  highlighted = false,
}: {
  title: string;
  copy: string;
  highlighted?: boolean;
}) {
  return (
    <article
      className={
        highlighted
          ? "system-panel-authority rounded-[1.6rem] p-5"
          : "system-surface rounded-[1.6rem] p-5"
      }
    >
      <h3 className="text-2xl font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-300">{copy}</p>
    </article>
  );
}

function IntakeCard({
  entry,
  highlighted = false,
}: {
  entry: NormalizedIntake;
  highlighted?: boolean;
}) {
  return (
    <article
      className={
        highlighted
          ? "system-panel-authority rounded-[1.75rem] p-5"
          : "system-surface rounded-[1.75rem] p-5"
      }
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
            <span>{entry.routingHint}</span>
            <span className="text-white/20">/</span>
            <span>{entry.decision}</span>
            <span className="text-white/20">/</span>
            <span>{entry.scoreTier}</span>
          </div>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
            {entry.businessName}
          </h3>
          <p className="mt-2 text-sm leading-7 text-slate-300">
            {entry.primaryOffer || "Primary offer not supplied."}
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            {entry.signalSummary || entry.biggestIssue || "No signal summary available yet."}
          </p>
        </div>

        <div className="grid min-w-0 gap-3 sm:grid-cols-2 lg:w-[22rem]">
          <ReadoutTile
            label="Signal"
            value={entry.signalQuality === null ? "—" : `${entry.signalQuality}%`}
            highlighted={highlighted}
          />
          <ReadoutTile label="Score" value={entry.score === null ? "—" : `${entry.score}`} />
          <ReadoutTile label="Pressure" value={pressureLabel(entry.strongestPressure)} />
          <ReadoutTile label="Risk" value={riskLabel(entry)} />
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <BoundaryTile label="Contact" value={entry.contactName || "Unknown"} />
        <BoundaryTile label="Website" value={entry.websiteHostname || "Missing"} />
        <BoundaryTile label="Confidence" value={entry.confidenceLevel} />
        <BoundaryTile label="Updated" value={formatDate(entry.updatedAt)} />
      </div>

      {entry.riskFlags.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {entry.riskFlags.map((flag) => (
            <span key={flag} className="system-tag-strong rounded-full px-3 py-1.5 text-xs">
              {flag}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}

function EmptyConsoleCard({ sourceState }: { sourceState: SourceState }) {
  return (
    <div className="system-surface rounded-[1.8rem] p-6">
      <p className="system-eyebrow">No readable entries</p>
      <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">
        The current console posture is not returning readable submissions.
      </h3>
      <p className="mt-4 text-sm leading-7 text-slate-300">
        Source state: {sourceStateLabel(sourceState)}. Adjust the filters, wait for new
        submissions, or verify that the intake route is returning readable data for the
        current authorization state.
      </p>
    </div>
  );
}

function normalizeRoutingHintValue(value: unknown): RoutingHint | "" {
  return value === "scan-only" ||
    value === "blueprint-candidate" ||
    value === "infrastructure-review" ||
    value === "command-review"
    ? value
    : "";
}

function normalizeDecisionValue(value: unknown): ScoreDecision | "" {
  return value === "reject" || value === "review" || value === "priority"
    ? value
    : "";
}

function normalizeScoreTierValue(value: unknown): ScoreTier | "" {
  return value === "low" || value === "mid" || value === "high" ? value : "";
}

function normalizeConfidenceLevelValue(value: unknown): ConfidenceLevel | "" {
  return value === "low" || value === "medium" || value === "high"
    ? value
    : "";
}

function normalizeSortModeValue(value: unknown): FreeCheckSortMode | "" {
  return value === "recent" ||
    value === "signal" ||
    value === "score" ||
    value === "priority"
    ? value
    : "";
}

function normalizeStrongestPressure(value: unknown): StrongestPressure | "" {
  return value === "trust" ||
    value === "clarity" ||
    value === "positioning" ||
    value === "action" ||
    value === "mixed"
    ? value
    : "";
}

function parseOptionalInteger(value: string, min: number, max: number) {
  if (!value) return null;
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return null;
  return clamp(Math.trunc(parsed), min, max);
}

function cleanString(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";

  return value
    .normalize("NFKC")
    .replace(/<[^>]*>/g, " ")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function clampInteger(
  value: unknown,
  min: number,
  max: number,
  fallback: number,
) {
  const parsed =
    typeof value === "number"
      ? Math.trunc(value)
      : typeof value === "string"
        ? Math.trunc(Number(value))
        : Number.NaN;

  if (!Number.isFinite(parsed)) return fallback;
  return clamp(parsed, min, max);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}