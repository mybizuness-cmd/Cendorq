import { buildMetadata } from "@/lib/seo";
import { headers } from "next/headers";
import Link from "next/link";

type HeaderLike = {
  get(name: string): string | null;
};

type PageSearchParams = Record<string, string | string[] | undefined>;
type SourceState = "live" | "empty" | "unavailable" | "protected";
type ConsoleEntry = Record<string, unknown>;

type ConsoleData = Readonly<{
  entries: ConsoleEntry[];
  sourceState: SourceState;
  note: string;
}>;

type ConsoleFilters = Readonly<{
  limit: number;
  sort: "recent" | "signal" | "score" | "priority";
  riskOnly: boolean;
  q: string;
}>;

export const metadata = buildMetadata({
  title: "Intake Console",
  description:
    "Internal Cendorq operating console for reviewing Free Scan submissions, signal quality, scoring posture, routing readiness, risk flags, and intake integrity.",
  path: "/intake-console",
  keywords: [
    "cendorq intake console",
    "free scan console",
    "internal intake dashboard",
    "signal quality dashboard",
    "routing readiness console",
    "intake scoring dashboard",
  ],
  image: {
    alt: "Cendorq Intake Console — internal operating view for Free Scan submissions, scoring posture, and routing readiness.",
  },
  noIndex: true,
});

const MAX_LIMIT = 150;
const DEFAULT_LIMIT = 100;
const ADMIN_HEADER = "x-intake-admin-key";

export default async function IntakeConsoleCleanCopyPage({
  searchParams,
}: {
  searchParams?: Promise<PageSearchParams>;
}) {
  const params = (await searchParams) ?? {};
  const filters = resolveFilters(params);
  const headerStore = await headers();
  const consoleData = await getConsoleData(headerStore, filters);
  const metrics = buildMetrics(consoleData.entries);
  const entries = consoleData.entries.slice(0, 12);

  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 text-white sm:px-6 md:py-16 xl:py-20">
      <section className="relative z-10 max-w-5xl">
        <p className="system-chip inline-flex rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-100">
          Internal intake console
        </p>

        <h1 className="system-hero-title mt-5 max-w-5xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
          The internal operating layer
          <span className="system-gradient-text block">for live Free Scan review.</span>
        </h1>

        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
          This console helps Cendorq review Free Scan submissions without reviving old public labels or old route strategy. It focuses on signal quality, score posture, routing readiness, risk flags, and intake integrity.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <StatusPill>Internal use only</StatusPill>
          <StatusPill>Free Scan intake</StatusPill>
          <StatusPill>Protected read path</StatusPill>
        </div>
      </section>

      <section className="relative z-10 mt-14 grid gap-5 md:grid-cols-4">
        <MetricCard label="Source state" value={sourceStateLabel(consoleData.sourceState)} />
        <MetricCard label="Readable entries" value={`${metrics.total}`} />
        <MetricCard label="Flagged" value={`${metrics.flagged}`} />
        <MetricCard label="Priority" value={`${metrics.priority}`} />
      </section>

      <section className="relative z-10 mt-12 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8">
          <p className="system-eyebrow">Live source note</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Console data should be readable, protected, and current-language only.
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-300">{consoleData.note}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/intake-console" className="system-button-secondary rounded-full px-5 py-3 text-sm font-semibold">
              Clear filters
            </Link>
            <Link href="/free-check" className="system-button-primary rounded-full px-5 py-3 text-sm font-semibold">
              Start Free Scan
            </Link>
            <Link href="/plans" className="system-button-secondary rounded-full px-5 py-3 text-sm font-semibold">
              Review Plans
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          <InfoCard title="Route rule" copy="The console may read Free Scan data, but it must not promote old pricing routes or old public labels." />
          <InfoCard title="Read rule" copy="Production reads stay protected by the configured intake-console read key. Local development can still inspect safely." />
          <InfoCard title="Merge rule" copy="This clean copy should be validated before replacing the larger live console page." />
        </div>
      </section>

      <section className="relative z-10 mt-14">
        <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="system-eyebrow">Current filtered feed</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Recent readable Free Scan entries
              </h2>
            </div>
            <p className="text-sm text-slate-400">Showing up to 12 entries from the protected API read.</p>
          </div>

          {entries.length > 0 ? (
            <div className="mt-8 grid gap-4">
              {entries.map((entry, index) => (
                <EntryCard key={entryId(entry, index)} entry={entry} index={index} />
              ))}
            </div>
          ) : (
            <div className="system-surface mt-8 rounded-[1.5rem] p-6">
              <h3 className="text-2xl font-semibold text-white">No readable entries in this view.</h3>
              <p className="mt-3 text-base leading-7 text-slate-300">
                The console route is available, but there are no entries to show for this filter posture or the feed is currently protected/unavailable.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

async function getConsoleData(headerStore: HeaderLike, filters: ConsoleFilters): Promise<ConsoleData> {
  const origin = buildOrigin(headerStore);
  const query = buildConsoleApiQuery(filters);
  const readKey = configuredReadKey();

  try {
    const response = await fetch(`${origin}/api/free-check?${query}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        ...(readKey ? { [ADMIN_HEADER]: readKey } : {}),
      },
    });

    if (response.status === 401) {
      return {
        entries: [],
        sourceState: "protected",
        note: "The intake feed is protected. Configure the server-only intake console read key to view live Free Scan entries in production.",
      };
    }

    if (!response.ok) {
      return {
        entries: [],
        sourceState: "unavailable",
        note: "The console route is rendering, but the Free Scan API read did not return a usable response.",
      };
    }

    const payload = (await response.json()) as unknown;
    const entries = extractEntries(payload);

    return {
      entries,
      sourceState: entries.length > 0 ? "live" : "empty",
      note: entries.length > 0 ? "The console is reading live Free Scan intake data from the protected API surface." : "The Free Scan API responded, but there are no readable entries for this filter posture yet.",
    };
  } catch {
    return {
      entries: [],
      sourceState: "unavailable",
      note: "The console could not reach the Free Scan API from the current request context.",
    };
  }
}

function resolveFilters(searchParams: PageSearchParams): ConsoleFilters {
  return {
    limit: clampInteger(firstParam(searchParams.limit), 1, MAX_LIMIT, DEFAULT_LIMIT),
    sort: normalizeSort(firstParam(searchParams.sort)),
    riskOnly: firstParam(searchParams.riskOnly) === "1",
    q: cleanString(firstParam(searchParams.q) ?? "", 160),
  };
}

function buildConsoleApiQuery(filters: ConsoleFilters) {
  const params = new URLSearchParams();
  params.set("limit", String(filters.limit));
  params.set("sort", filters.sort);
  if (filters.riskOnly) params.set("riskOnly", "1");
  if (filters.q) params.set("q", filters.q);
  return params.toString();
}

function buildMetrics(entries: ConsoleEntry[]) {
  return entries.reduce(
    (summary, entry) => {
      summary.total += 1;
      if (Array.isArray(entry.riskFlags) && entry.riskFlags.length > 0) summary.flagged += 1;
      if (entry.decision === "priority") summary.priority += 1;
      return summary;
    },
    { total: 0, flagged: 0, priority: 0 },
  );
}

function extractEntries(payload: unknown): ConsoleEntry[] {
  if (!isRecord(payload) || !Array.isArray(payload.entries)) return [];
  return payload.entries.filter(isRecord);
}

function configuredReadKey() {
  return cleanString(process.env.INTAKE_CONSOLE_READ_KEY ?? process.env.INTAKE_ADMIN_KEY ?? "", 240);
}

function buildOrigin(headersLike: HeaderLike) {
  const proto = headersLike.get("x-forwarded-proto") || "https";
  const host = headersLike.get("x-forwarded-host") || headersLike.get("host") || "www.cendorq.com";
  return `${proto}://${host}`;
}

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function normalizeSort(value: string | undefined): ConsoleFilters["sort"] {
  return value === "signal" || value === "score" || value === "priority" ? value : "recent";
}

function clampInteger(value: unknown, min: number, max: number, fallback: number) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(min, Math.min(max, Math.round(parsed)));
}

function cleanString(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.normalize("NFKC").replace(/<[^>]*>/g, " ").replace(/[\u0000-\u001F\u007F]/g, " ").replace(/[\u200B-\u200D\uFEFF]/g, "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function sourceStateLabel(value: SourceState) {
  if (value === "live") return "Live";
  if (value === "empty") return "Empty";
  if (value === "protected") return "Protected";
  return "Unavailable";
}

function entryId(entry: ConsoleEntry, index: number) {
  return typeof entry.id === "string" && entry.id ? entry.id : `entry-${index}`;
}

function entryText(entry: ConsoleEntry, key: string, fallback = "Not provided") {
  const value = entry[key];
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function entryNumber(entry: ConsoleEntry, key: string) {
  const value = entry[key];
  return typeof value === "number" && Number.isFinite(value) ? String(value) : "—";
}

function isRecord(value: unknown): value is ConsoleEntry {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function StatusPill({ children }: { children: string }) {
  return <span className="system-tag-strong rounded-full px-4 py-2 text-sm">{children}</span>;
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="system-surface rounded-[1.5rem] p-5">
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
    </div>
  );
}

function InfoCard({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="system-surface rounded-[1.5rem] p-5">
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>
    </div>
  );
}

function EntryCard({ entry, index }: { entry: ConsoleEntry; index: number }) {
  return (
    <article className="system-surface rounded-[1.5rem] p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">Entry {index + 1}</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">{entryText(entry, "businessName", "Unnamed business")}</h3>
          <p className="mt-2 text-sm text-slate-400">{entryText(entry, "websiteUrl", "No website provided")}</p>
        </div>
        <div className="grid gap-2 text-sm text-slate-300 sm:text-right">
          <span>Signal: {entryNumber(entry, "signalQuality")}</span>
          <span>Score: {entryNumber(entry, "score")}</span>
          <span>Decision: {entryText(entry, "decision", "review")}</span>
        </div>
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-300">{entryText(entry, "signalSummary", "No signal summary available yet.")}</p>
    </article>
  );
}
