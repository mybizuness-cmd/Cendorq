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

type SourceState = "live" | "empty" | "unavailable" | "protected";

type RoutingHint =
  | "scan-only"
  | "blueprint-candidate"
  | "infrastructure-review"
  | "command-review";

type ScoreDecision = "reject" | "review" | "priority";
type ScoreTier = "low" | "mid" | "high";
type StrongestPressure = "trust" | "clarity" | "positioning" | "action" | "mixed";

type ApiEntry = Record<string, unknown>;

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
  confidenceLevel: "low" | "medium" | "high";
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

type ConsoleData = Readonly<{
  entries: NormalizedIntake[];
  sourceState: SourceState;
  note: string;
  summary?: ConsoleSummary;
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

export default async function IntakeConsolePage() {
  const headerStore = await headers();
  const consoleData = await getConsoleData(headerStore);

  const metrics = buildMetrics(consoleData.entries, consoleData.summary);
  const patterns = buildPatternSummary(consoleData.entries, consoleData.summary);
  const recentEntries = consoleData.entries.slice(0, RECENT_ENTRY_LIMIT);

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
            Presence Scan submissions through a stronger internal operating view —
            one that makes{" "}
            <strong className="font-semibold text-white">signal quality</strong>,{" "}
            <strong className="font-semibold text-white">score posture</strong>,{" "}
            <strong className="font-semibold text-white">routing readiness</strong>,
            and{" "}
            <strong className="font-semibold text-white">submission integrity</strong>{" "}
            easier to read before the wrong next move is taken internally.
          </p>

          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            This route should not behave like a flat storage page. It should behave
            like an internal intelligence surface that helps operators distinguish
            stronger signal from weaker noise and route businesses with more
            precision.
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
              A strong intake system does more than collect form data. It helps the
              platform see what kind of businesses are entering the path, how strong
              those signals are, what route each business appears closest to, what
              priority level the scoring layer is assigning, and where low-quality or
              higher-risk noise is starting to appear.
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
                  The console should make live intake signal easier to trust and easier to act on.
                </h2>

                <p className="mt-5 text-base leading-8 text-slate-300">
                  When the submission layer becomes easier to read, routing improves,
                  review quality improves, and weak or suspicious noise becomes easier
                  to isolate before it starts distorting the internal operating
                  picture.
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
          <TopChip>Recent intake feed</TopChip>

          <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            The latest entries should surface signal quality, score posture, and routing readiness fast.
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
            This feed is designed to help operators read who submitted, what kind
            of business entered, how strong the signal looks, what routing hint is
            emerging, how the scoring layer is classifying the entry, and whether
            the record needs closer review without forcing a weak flat-list
            workflow.
          </p>

          {recentEntries.length > 0 ? (
            <div className="mt-8 grid gap-4">
              {recentEntries.map((entry, index) => (
                <IntakeCard
                  key={`${entry.id}-${index}`}
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

async function getConsoleData(headerStore: HeaderLike): Promise<ConsoleData> {
  const origin = buildOrigin(headerStore);
  const adminKey = configuredReadKey();

  try {
    const response = await fetch(`${origin}/api/free-check?limit=${MAX_CONSOLE_ENTRIES}`, {
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

    if (entries.length === 0) {
      return {
        entries: [],
        sourceState: "empty",
        note:
          "The intake route responded, but there are no readable submissions available to display yet. The console is ready for live data as soon as the feed contains usable entries.",
        summary,
      };
    }

    return {
      entries,
      sourceState: "live",
      note:
        "The console is reading live Search Presence Scan data from the current intake route and normalizing it into an internal operating view.",
      summary,
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
      "blueprint-candidate": safeNumber(byRoutingHintRaw["blueprint-candidate"]),
      "infrastructure-review": safeNumber(byRoutingHintRaw["infrastructure-review"]),
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
    signalQuality: clampSignal(
      firstNumber(record, ["signalQuality", "qualityScore"]),
    ),
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
        clampSignal(firstNestedNumber(record, "scoreModules", "recommendationVisibility")) ?? 0,
      trustAuthority:
        clampSignal(firstNestedNumber(record, "scoreModules", "trustAuthority")) ?? 0,
      conversionReadiness:
        clampSignal(firstNestedNumber(record, "scoreModules", "conversionReadiness")) ?? 0,
      competitiveExposure:
        clampSignal(firstNestedNumber(record, "scoreModules", "competitiveExposure")) ?? 0,
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
      entry.id ||
      `${entry.businessName}::${entry.websiteHostname}::${entry.updatedAt}`;
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
            signalValues.reduce((sum, value) => sum + value, 0) / signalValues.length,
          )
        : null;

  const averageScore =
    typeof summary?.averageScore === "number" && summary.averageScore > 0
      ? summary.averageScore
      : scoreValues.length > 0
        ? Math.round(
            scoreValues.reduce((sum, value) => sum + value, 0) / scoreValues.length,
          )
        : null;

  const dataDepthValues = entries
    .map((entry) => entry.dataDepthScore)
    .filter((value): value is number => typeof value === "number");

  const averageDataDepth =
    typeof summary?.averageDataDepth === "number" && summary.averageDataDepth > 0
      ? summary.averageDataDepth
      : dataDepthValues.length > 0
        ? Math.round(
            dataDepthValues.reduce((sum, value) => sum + value, 0) / dataDepthValues.length,
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
      "command-review": entries.filter((entry) => entry.routingHint === "command-review")
        .length,
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
          "Decision concentration becomes meaningful once live entries are being scored through the full intake chain.",
      },
      {
        title: "Repeat signals",
        value: "—",
        copy:
          "Repeat-submission behavior becomes more useful once the feed contains active businesses updating signal over time.",
      },
    ];
  }

  const pressureCounts = {
    Trust: 0,
    Clarity: 0,
    Positioning: 0,
    Action: 0,
    Mixed: 0,
  };

  const countryCounts = new Map<string, number>();
  let repeatedSignals = 0;

  for (const entry of entries) {
    if (entry.submissionCount > 1) {
      repeatedSignals += 1;
    }

    const theme =
      entry.strongestPressure === "trust"
        ? "Trust"
        : entry.strongestPressure === "clarity"
          ? "Clarity"
          : entry.strongestPressure === "positioning"
            ? "Positioning"
            : entry.strongestPressure === "action"
              ? "Action"
              : detectDominantTheme(
                  `${entry.biggestIssue} ${entry.notes} ${entry.primaryOffer} ${entry.audience}`,
                );

    pressureCounts[theme] += 1;

    const geography = entry.country || "Unspecified";
    countryCounts.set(geography, (countryCounts.get(geography) ?? 0) + 1);
  }

  const dominantPressure = Object.entries(pressureCounts).sort((a, b) => b[1] - a[1])[0];

  const dominantCountry = [...countryCounts.entries()].sort((a, b) => b[1] - a[1])[0];

  const routingWinner = Object.entries(
    summary?.byRoutingHint ?? {
      "scan-only": entries.filter((entry) => entry.routingHint === "scan-only").length,
      "blueprint-candidate": entries.filter(
        (entry) => entry.routingHint === "blueprint-candidate",
      ).length,
      "infrastructure-review": entries.filter(
        (entry) => entry.routingHint === "infrastructure-review",
      ).length,
      "command-review": entries.filter((entry) => entry.routingHint === "command-review")
        .length,
    },
  ).sort((a, b) => b[1] - a[1])[0];

  const decisionWinner = Object.entries(
    summary?.byDecision ?? {
      reject: entries.filter((entry) => entry.decision === "reject").length,
      review: entries.filter((entry) => entry.decision === "review").length,
      priority: entries.filter((entry) => entry.decision === "priority").length,
    },
  ).sort((a, b) => b[1] - a[1])[0];

  return [
    {
      title: "Dominant pressure",
      value: `${dominantPressure[0]} (${dominantPressure[1]})`,
      copy:
        "This is the most common pressure theme currently appearing across readable submission text in the live feed.",
    },
    {
      title: "Primary routing lane",
      value: `${humanizeRoutingHint(routingWinner[0] as RoutingHint)} (${routingWinner[1]})`,
      copy:
        "This shows where the current intake mix appears to be leaning based on the routing-hint layer.",
    },
    {
      title: "Decision posture",
      value: `${humanizeDecision(decisionWinner[0] as ScoreDecision)} (${decisionWinner[1]})`,
      copy:
        "This shows where the scoring layer is currently concentrating operator attention across reject, review, and priority classifications.",
    },
    {
      title: "Repeat signals",
      value: `${repeatedSignals}`,
      copy:
        "Repeat-signal count shows how often businesses appear to be updating the same record rather than entering as entirely new signal.",
    },
    {
      title: "Highest-volume geography",
      value: dominantCountry
        ? `${dominantCountry[0]} (${dominantCountry[1]})`
        : "Unspecified",
      copy:
        "This shows the most common country currently appearing across readable intake records.",
    },
  ];
}

function detectDominantTheme(
  text: string,
): "Trust" | "Clarity" | "Positioning" | "Action" | "Mixed" {
  const content = text.toLowerCase();

  const trustHits = countMatches(content, [
    "trust",
    "credible",
    "credibility",
    "reputation",
    "reviews",
    "doubt",
    "believe",
  ]);

  const clarityHits = countMatches(content, [
    "clarity",
    "clear",
    "understand",
    "confusing",
    "message",
    "explain",
  ]);

  const positioningHits = countMatches(content, [
    "position",
    "positioning",
    "different",
    "differentiate",
    "compare",
    "generic",
    "blend",
  ]);

  const actionHits = countMatches(content, [
    "convert",
    "conversion",
    "book",
    "call",
    "contact",
    "lead",
    "sales",
    "buy",
    "action",
    "drop",
  ]);

  const ranked = [
    ["Trust", trustHits] as const,
    ["Clarity", clarityHits] as const,
    ["Positioning", positioningHits] as const,
    ["Action", actionHits] as const,
  ].sort((a, b) => b[1] - a[1]);

  if (ranked[0][1] === 0) return "Mixed";
  if (ranked[1] && ranked[0][1] === ranked[1][1]) return "Mixed";
  return ranked[0][0];
}

function countMatches(content: string, keywords: string[]) {
  return keywords.reduce(
    (count, keyword) => count + (content.includes(keyword) ? 1 : 0),
    0,
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function firstString(record: Record<string, unknown>, keys: readonly string[]) {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return "";
}

function firstNumber(record: Record<string, unknown>, keys: readonly string[]) {
  for (const key of keys) {
    const value = record[key];

    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === "string" && value.trim()) {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }
  }

  return null;
}

function firstStringArray(record: Record<string, unknown>, keys: readonly string[]) {
  for (const key of keys) {
    const value = record[key];

    if (Array.isArray(value)) {
      return value
        .filter((item): item is string => typeof item === "string")
        .map((item) => item.trim())
        .filter(Boolean);
    }
  }

  return [];
}

function firstRoutingHint(record: Record<string, unknown>, keys: readonly string[]) {
  for (const key of keys) {
    const value = record[key];

    if (
      value === "scan-only" ||
      value === "blueprint-candidate" ||
      value === "infrastructure-review" ||
      value === "command-review"
    ) {
      return value;
    }
  }

  return "scan-only";
}

function firstDecision(record: Record<string, unknown>, keys: readonly string[]) {
  for (const key of keys) {
    const value = record[key];

    if (value === "reject" || value === "review" || value === "priority") {
      return value;
    }
  }

  return "review";
}

function firstScoreTier(record: Record<string, unknown>, keys: readonly string[]) {
  for (const key of keys) {
    const value = record[key];

    if (value === "low" || value === "mid" || value === "high") {
      return value;
    }
  }

  return "mid";
}

function firstStrongestPressure(
  record: Record<string, unknown>,
  keys: readonly string[],
): StrongestPressure {
  for (const key of keys) {
    const value = record[key];

    if (
      value === "trust" ||
      value === "clarity" ||
      value === "positioning" ||
      value === "action" ||
      value === "mixed"
    ) {
      return value;
    }
  }

  return "mixed";
}

function firstConfidenceLevel(record: Record<string, unknown>, keys: readonly string[]) {
  for (const key of keys) {
    const value = record[key];
    if (value === "low" || value === "medium" || value === "high") {
      return value;
    }
  }

  return "medium" as const;
}

function firstTimeSensitivity(record: Record<string, unknown>, keys: readonly string[]) {
  for (const key of keys) {
    const value = record[key];
    if (value === "stable" || value === "watch" || value === "urgent") {
      return value;
    }
  }

  return "stable" as const;
}

function firstNestedNumber(record: Record<string, unknown>, parentKey: string, childKey: string) {
  const parent = record[parentKey];
  if (!isRecord(parent)) return null;
  const value = parent[childKey];

  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return null;
}

function normalizeWebsite(value: string) {
  if (!value) return "";
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

function deriveHostname(value: string) {
  if (!value) return "";

  try {
    return new URL(value).hostname.replace(/^www\./i, "");
  } catch {
    return "";
  }
}

function formatLocation(entry: NormalizedIntake) {
  return [entry.city, entry.region, entry.country].filter(Boolean).join(", ");
}

function formatDate(value: string) {
  if (!value) return "Date unavailable";

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "Date unavailable";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

function summarizeEntry(entry: NormalizedIntake) {
  return truncate(
    entry.signalSummary ||
      entry.scoreSummary ||
      entry.biggestIssue ||
      entry.notes ||
      entry.primaryOffer ||
      "No detailed pressure description yet.",
    220,
  );
}

function truncate(value: string, maxLength: number) {
  const cleaned = value.trim().replace(/\s+/g, " ");
  if (cleaned.length <= maxLength) return cleaned;
  return `${cleaned.slice(0, maxLength - 1)}…`;
}

function sourceStateLabel(state: SourceState) {
  if (state === "live") return "Live feed";
  if (state === "empty") return "Awaiting entries";
  if (state === "protected") return "Protected feed";
  return "Feed unavailable";
}

function safeNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) return value;

  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }

  return 0;
}

function clampSignal(value: number | null) {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  return Math.max(0, Math.min(100, Math.round(value)));
}

function clampMetric(value: number | null) {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  return Math.max(0, Math.round(value));
}

function clampCount(value: number | null) {
  if (typeof value !== "number" || !Number.isFinite(value)) return 1;
  return Math.max(1, Math.trunc(value));
}

function humanizeRoutingHint(value: RoutingHint) {
  if (value === "scan-only") return "Scan only";
  if (value === "blueprint-candidate") return "Blueprint";
  if (value === "infrastructure-review") return "Infrastructure";
  return "Command";
}

function humanizeDecision(value: ScoreDecision) {
  if (value === "priority") return "Priority";
  if (value === "review") return "Review";
  return "Reject";
}

function humanizePressure(value: StrongestPressure) {
  if (value === "trust") return "Trust";
  if (value === "clarity") return "Clarity";
  if (value === "positioning") return "Positioning";
  if (value === "action") return "Action";
  return "Mixed";
}

function humanizeTimeSensitivity(value: NormalizedIntake["timeSensitivity"]) {
  if (value === "urgent") return "urgent timing";
  if (value === "watch") return "watch timing";
  return "stable timing";
}

function topScoreModule(modules: NormalizedIntake["scoreModules"]) {
  const pairs = [
    { label: "Discoverability", value: modules.discoverability ?? 0 },
    { label: "Recommendation visibility", value: modules.recommendationVisibility ?? 0 },
    { label: "Trust authority", value: modules.trustAuthority ?? 0 },
    { label: "Conversion readiness", value: modules.conversionReadiness ?? 0 },
    { label: "Competitive exposure", value: modules.competitiveExposure ?? 0 },
  ];

  return pairs.sort((left, right) => right.value - left.value)[0];
}

function riskTone(flags: string[]) {
  if (flags.some((flag) => flag === "spam_risk")) return "High risk";
  if (flags.length >= 2) return "Review";
  if (flags.length === 1) return "Flagged";
  return "Clean";
}

function cleanString(value: string, maxLength: number) {
  return value.trim().slice(0, maxLength);
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
  return (
    <div className="system-tag-strong rounded-full px-4 py-2 text-sm">
      {children}
    </div>
  );
}

function GuideTile({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
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
      <div className="mt-2 text-base font-semibold text-white">{value}</div>
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
    <div
      className={
        highlighted
          ? "system-panel-authority rounded-[1.7rem] p-6"
          : "system-surface rounded-[1.7rem] p-6"
      }
    >
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
        {label}
      </div>
      <div className="mt-3 text-4xl font-semibold tracking-tight text-white">
        {value}
      </div>
      <p className="mt-3 text-sm leading-7 text-slate-300">{helper}</p>
    </div>
  );
}

function IntakeCard({
  entry,
  highlighted = false,
}: {
  entry: NormalizedIntake;
  highlighted?: boolean;
}) {
  const location = formatLocation(entry);
  const signalLabel =
    typeof entry.signalQuality === "number" ? `${entry.signalQuality}%` : "Unscored";
  const scoreLabel = typeof entry.score === "number" ? `${entry.score}` : "—";
  const dataDepthLabel =
    typeof entry.dataDepthScore === "number" ? `${entry.dataDepthScore}%` : "—";
  const strongestModule = topScoreModule(entry.scoreModules);

  return (
    <article
      className={
        highlighted
          ? "system-panel-authority rounded-[1.8rem] p-6"
          : "system-surface rounded-[1.8rem] p-6"
      }
    >
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0 max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="system-chip rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
              {entry.businessType || "Business intake"}
            </span>
            <span className="system-surface rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-300">
              {signalLabel}
            </span>
            <span className="system-surface rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-300">
              Score {scoreLabel}
            </span>
            <span className="system-surface rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-300">
              {humanizeRoutingHint(entry.routingHint)}
            </span>
            <span className="system-surface rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-300">
              {humanizeDecision(entry.decision)}
            </span>
            <span className="system-surface rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-300">
              {entry.confidenceLevel} confidence
            </span>
            <span className="system-surface rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-300">
              {humanizeTimeSensitivity(entry.timeSensitivity)}
            </span>
            {entry.submissionCount > 1 ? (
              <span className="system-surface rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-200">
                {entry.submissionCount} submissions
              </span>
            ) : null}
            {entry.riskFlags.length > 0 ? (
              <span className="system-surface rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-rose-200">
                {riskTone(entry.riskFlags)}
              </span>
            ) : null}
          </div>

          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">
            {entry.businessName}
          </h3>

          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-400">
            {entry.contactName ? <span>{entry.contactName}</span> : null}
            {entry.email ? <span>{entry.email}</span> : null}
            {location ? <span>{location}</span> : null}
            <span>{formatDate(entry.updatedAt || entry.createdAt)}</span>
          </div>

          <p className="mt-4 text-sm leading-7 text-slate-300">
            {summarizeEntry(entry)}
          </p>

          {entry.decisionMoment ? (
            <div className="system-surface mt-4 rounded-[1.2rem] p-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
                Decision moment
              </div>
              <div className="mt-2 text-sm leading-7 text-slate-200">{entry.decisionMoment}</div>
            </div>
          ) : null}

          {entry.riskFlags.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {entry.riskFlags.map((flag) => (
                <span
                  key={flag}
                  className="rounded-full border border-rose-300/15 bg-rose-300/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-rose-100"
                >
                  {flag.replace(/_/g, " ")}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="grid min-w-0 gap-3 xl:w-[19rem]">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            {entry.websiteUrl ? (
              <a
                href={entry.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="system-button-secondary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition"
              >
                Visit website
              </a>
            ) : (
              <div className="system-surface rounded-full px-5 py-3 text-center text-sm font-semibold text-slate-300">
                No website submitted
              </div>
            )}
            <Link
              href={`/report?id=${entry.id}`}
              className="system-button-primary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition"
            >
              Open report view
            </Link>
          </div>

          <div className="system-surface rounded-[1.2rem] p-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
              Pressure bias
            </div>
            <div className="mt-2 text-sm font-semibold text-white">
              {humanizePressure(entry.strongestPressure)}
            </div>
            <div className="mt-1 text-xs leading-6 text-slate-400">
              Tier {entry.scoreTier.toUpperCase()} • {entry.clarityScore ?? "—"}/14 clarity •{" "}
              {entry.intentStrength ?? "—"}/8 intent
            </div>
          </div>

          <div className="system-surface rounded-[1.2rem] p-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
              Offer signal
            </div>
            <div className="mt-2 text-sm leading-7 text-white">
              {truncate(entry.primaryOffer || "Offer not clearly described yet.", 96)}
            </div>
            <div className="mt-3 text-xs leading-6 text-slate-400">
              Top module: {strongestModule.label} ({strongestModule.value})
            </div>
          </div>

          <div className="system-surface rounded-[1.2rem] p-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
              Website host
            </div>
            <div className="mt-2 break-all text-sm font-semibold text-white">
              {entry.websiteHostname || "Unavailable"}
            </div>
            <div className="mt-1 text-xs leading-6 text-slate-400">Data depth {dataDepthLabel}</div>
          </div>
        </div>
      </div>
    </article>
  );
}

function EmptyConsoleCard({
  sourceState,
}: {
  sourceState: SourceState;
}) {
  return (
    <div className="system-surface rounded-[1.8rem] p-6">
      <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
        Intake feed
      </div>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
        {sourceState === "protected"
          ? "The live intake feed is protected and not readable from this request."
          : sourceState === "unavailable"
            ? "The live intake feed is not connected to this view yet."
            : "No readable intake entries are available yet."}
      </h3>
      <p className="mt-4 text-sm leading-7 text-slate-300">
        The console structure is ready. Once readable Search Presence Scan
        submissions are flowing through the intake route, this section will
        surface signal quality, risk posture, routing readiness, scoring
        posture, and internal review visibility.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/free-check"
          className="system-button-primary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition"
        >
          Go to Search Presence Scan
        </Link>
        <Link
          href="/pricing"
          className="system-button-secondary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition"
        >
          Review system path
        </Link>
      </div>
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
    <div
      className={
        highlighted
          ? "system-chip rounded-[1.5rem] p-5"
          : "system-surface rounded-[1.5rem] p-5"
      }
    >
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
        {title}
      </div>
      <div className="mt-3 text-2xl font-semibold tracking-tight text-white">
        {value}
      </div>
      <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>
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
          ? "system-chip rounded-[1.35rem] p-4"
          : "system-surface rounded-[1.35rem] p-4"
      }
    >
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
        {label}
      </div>
      <div className="mt-2 text-lg font-semibold text-white">{value}</div>
    </div>
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
          ? "system-panel-authority rounded-[1.65rem] p-5"
          : "system-surface rounded-[1.65rem] p-5"
      }
    >
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>
    </article>
  );
}