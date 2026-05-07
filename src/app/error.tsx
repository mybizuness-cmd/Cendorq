"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";

type GlobalErrorProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

type RecoveryOption =
    | {
        kind: "retry";
        label: string;
        title: string;
        copy: string;
        highlighted?: boolean;
    }
    | {
        kind: "link";
        label: string;
        title: string;
        copy: string;
        href: string;
        cta: string;
        highlighted?: boolean;
    };

type Severity = "route-isolated" | "request-layer" | "asset-layer" | "unknown";

const BRAND_NAME = "Cendorq";
const CATEGORY_LINE = "Business Visibility Command";

const ROUTE_READOUTS = [
    {
        label: "System state",
        value: "Unexpected interruption",
    },
    {
        label: "Best posture",
        value: "Recover with structure",
    },
    {
        label: "First recovery move",
        value: "Retry once",
    },
    {
        label: "Fallback logic",
        value: "Return to a clean route",
    },
] as const;

const FAILURE_REASONS = [
    {
        title: "The current route failed before it could complete a clean render.",
        copy:
            "That usually means a page-level render step, route transition, data dependency, or client-side state path broke before the experience could stabilize.",
    },
    {
        title: "This does not automatically mean the entire platform is broken.",
        copy:
            "Many runtime failures are isolated to one route, one request path, or one state transition rather than the whole system. The strongest response is a clean recovery path, not random guessing.",
    },
    {
        title: "A structured retry is stronger than blind navigation.",
        copy:
            "Retrying once is the cleanest first action. If the same route keeps failing, the strongest fallback is to return to the homepage, the Free Scan, or the command-path layer.",
    },
] as const;

const RECOVERY_RULES = [
    {
        title: "Retry once before widening the recovery path.",
        copy:
            "A temporary route interruption often resolves on a clean retry. Multiple blind retries are weaker than one deliberate retry followed by a reset into a stronger route.",
    },
    {
        title: "If the route fails again, step back into the main system path.",
        copy:
            "The homepage, Free Scan, Deep Review, and Plans routes are the cleanest system re-entry points when a single route becomes unreliable.",
    },
    {
        title: "Do not confuse route failure with business-path failure.",
        copy:
            "A broken page does not change the platform sequence. The system path is still strongest when users recover into the correct layer instead of guessing through unrelated pages.",
    },
] as const;

const RECOVERY_OPTIONS: readonly RecoveryOption[] = [
    {
        kind: "retry",
        label: "Strongest first move",
        title: "Retry the current route",
        copy:
            "If the failure was temporary, one clean retry is the fastest path back to a stable route without breaking the user’s context.",
        highlighted: true,
    },
    {
        kind: "link",
        label: "Reset route",
        title: "Return to homepage",
        copy:
            "The homepage restores the broadest clean context and makes it easier to re-enter the system path without extra route confusion.",
        href: "/",
        cta: "Go to homepage",
    },
    {
        kind: "link",
        label: "Restart with first signal",
        title: "Use Free Scan",
        copy:
            "If the original goal was to start the platform properly, the strongest structured restart is usually the first serious signal layer.",
        href: "/free-check",
        cta: "Start Free Scan",
    },
    {
        kind: "link",
        label: "Review route logic",
        title: "Read how the system works",
        copy:
            "If the interruption happened during route selection, Diagnosis is the cleanest page for understanding the sequence before choosing the wrong next layer.",
        href: "/diagnosis",
        cta: "See how it works",
    },
] as const;

export default function GlobalError({ error, reset }: GlobalErrorProps) {
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        console.error(`[${BRAND_NAME}] route error`, {
            name: error?.name,
            message: error?.message,
            digest: error?.digest,
            stack: error?.stack,
        });
    }, [error]);

    const digest = useMemo(() => {
        const cleaned = (error?.digest || "").trim();
        return cleaned || "Unavailable";
    }, [error]);

    const readableMessage = useMemo(() => buildReadableMessage(error), [error]);
    const severity = useMemo(() => inferSeverity(error), [error]);
    const severityLabel = useMemo(() => humanizeSeverity(severity), [severity]);
    const likelyCause = useMemo(() => inferLikelyCause(error), [error]);
    const recoveryBias = useMemo(() => {
        if (severity === "asset-layer") {
            return "Retry once, then return to homepage if the route still does not stabilize.";
        }

        if (severity === "request-layer") {
            return "Retry once, then use Free Scan or the homepage as the clean fallback route.";
        }

        return "Retry once, then re-enter through the homepage or Free Scan rather than guessing through unrelated pages.";
    }, [severity]);

    function handleRetry() {
        setRetryCount((current) => current + 1);
        reset();
    }

    return (
        <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 text-white sm:px-6 md:py-16 xl:py-20">
            <ErrorAtmosphere />

            <section className="relative z-10 border-b border-white/8 pb-10">
                <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                    <span className="system-chip rounded-full px-3 py-1.5 text-cyan-200">
                        {BRAND_NAME}
                    </span>
                    <span className="text-white/20">/</span>
                    <span className="text-white/70">{CATEGORY_LINE}</span>
                    <span className="text-white/20">/</span>
                    <span className="text-cyan-100">Route error</span>
                </div>
            </section>

            <section className="relative z-10 grid gap-10 pt-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-start">
                <div>
                    <TopChip>System error</TopChip>

                    <h1 className="system-hero-title mt-5 max-w-5xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
                        This route hit an interruption
                        <span className="system-gradient-text block">
                            before the page could finish cleanly.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                        The current route did not complete the way it should have. That usually
                        means a render layer, request dependency, route transition, or client-side
                        state path failed before the page reached a stable final state.
                    </p>

                    <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                        The strongest response is not random clicking. It is a controlled retry,
                        followed by a clean return to the main system path if the interruption
                        continues.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <AuthorityPill>Recover cleanly</AuthorityPill>
                        <AuthorityPill>Retry once first</AuthorityPill>
                        <AuthorityPill>Use the system path</AuthorityPill>
                    </div>

                    <div className="system-panel-authority mt-8 rounded-[1.8rem] p-5 sm:p-6">
                        <p className="system-eyebrow">Primary reading rule</p>

                        <h2 className="mt-4 text-2xl font-semibold text-white">
                            A route failure should trigger a structured recovery path, not route chaos.
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                            {BRAND_NAME} is built as a sequenced operating path. When one route breaks,
                            the cleanest move is to recover with structure so the user can get back to a
                            stable system layer without losing context or confidence.
                        </p>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                            <GuideTile
                                label="Primary objective"
                                value="Restore a clean route without adding confusion"
                            />
                            <GuideTile
                                label="Main failure avoided"
                                value="Blind recovery attempts through the wrong pages"
                            />
                        </div>
                    </div>

                    <div className="mt-8 grid gap-4">
                        {FAILURE_REASONS.map((item, index) => (
                            <ReasonCard
                                key={item.title}
                                title={item.title}
                                copy={item.copy}
                                highlighted={index === 0}
                            />
                        ))}
                    </div>
                </div>

                <div className="grid gap-4">
                    <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                            <div className="max-w-2xl">
                                <TopChip>Recovery posture</TopChip>

                                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                                    The best recovery is the one that restores clarity fast.
                                </h2>

                                <p className="mt-5 text-base leading-8 text-slate-300">
                                    This error page should not behave like a dead end. It should help the
                                    user understand that the route failed, see the safest next move, and
                                    step back into a stable part of the system without breaking sequence.
                                </p>
                            </div>

                            <div className="grid min-w-0 gap-3 sm:grid-cols-2 lg:w-[21rem]">
                                {ROUTE_READOUTS.map((item, index) => (
                                    <ReadoutTile
                                        key={item.label}
                                        label={item.label}
                                        value={item.value}
                                        highlighted={index === 0}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="mt-6">
                            <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.22em] text-slate-400">
                                <span>Recovery priority</span>
                                <span>Structured reset</span>
                            </div>

                            <div className="system-status-bar mt-2 h-2">
                                <span style={{ width: "82%" }} />
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                        <StatusTile label="Route state" value="Failed" highlighted />
                        <StatusTile label="Severity" value={severityLabel} />
                        <StatusTile label="Retry count" value={`${retryCount}`} />
                    </div>

                    <div className="system-surface rounded-[1.7rem] p-6">
                        <p className="system-eyebrow">Readable message</p>
                        <p className="mt-4 text-base leading-8 text-slate-300">
                            {readableMessage}
                        </p>
                    </div>

                    <div className="system-surface rounded-[1.7rem] p-6">
                        <p className="system-eyebrow">Recovery bias</p>
                        <p className="mt-4 text-base leading-8 text-slate-300">
                            {recoveryBias}
                        </p>
                    </div>

                    <div className="system-surface rounded-[1.7rem] p-6">
                        <p className="system-eyebrow">Diagnostic reference</p>
                        <div className="mt-4 grid gap-3">
                            <DiagnosticTile label="Digest" value={digest} />
                            <DiagnosticTile label="Severity posture" value={severityLabel} />
                            <DiagnosticTile label="Likely cause" value={likelyCause} />
                            <DiagnosticTile
                                label="Operator note"
                                value="Use this reference if the interruption persists and needs deeper route review."
                            />
                        </div>
                    </div>

                    {retryCount > 0 ? (
                        <div className="system-note-warning rounded-[1.5rem] p-5">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-200">
                                Retry note
                            </p>
                            <p className="mt-3 text-sm leading-7 text-slate-200">
                                If the same route keeps failing after a clean retry, step back into
                                the homepage, Free Scan, or the command explanation layer
                                instead of cycling through random pages.
                            </p>
                        </div>
                    ) : null}
                </div>
            </section>

            <section className="relative z-10 mt-20 grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
                <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8 md:p-10">
                    <TopChip>Recovery rules</TopChip>

                    <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Most route recoveries get weaker when the user abandons structure.
                    </h2>

                    <div className="mt-8 grid gap-4">
                        {RECOVERY_RULES.map((item, index) => (
                            <ReasonCard
                                key={item.title}
                                title={item.title}
                                copy={item.copy}
                                highlighted={index === 0}
                            />
                        ))}
                    </div>
                </div>

                <div className="grid gap-5">
                    {RECOVERY_OPTIONS.map((option, index) => (
                        <RecoveryCard
                            key={option.title}
                            option={option}
                            onRetry={handleRetry}
                            highlighted={index === 0}
                        />
                    ))}
                </div>
            </section>

            <section className="relative z-10 mt-20">
                <div className="system-panel-authority rounded-[2rem] p-6 text-center sm:p-8 md:p-10">
                    <TopChip>Best next move</TopChip>

                    <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Retry once, then return to the strongest clean route.
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-300">
                        If the route does not stabilize after one clean retry, the strongest
                        fallback is to return to the homepage or restart through Search Presence
                        Scan. That preserves sequence, protects clarity, and prevents users from
                        wandering through the wrong pages after a technical interruption.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                        <button
                            type="button"
                            onClick={handleRetry}
                            className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
                        >
                            Try again
                        </button>
                        <Link
                            href="/"
                            className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
                        >
                            Go to homepage
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

function buildReadableMessage(error: Error & { digest?: string }) {
    const raw = typeof error?.message === "string" ? error.message.trim() : "";

    if (!raw) {
        return "The route returned an unexpected runtime interruption before the page could finish rendering.";
    }

    if (raw.length <= 240) {
        return raw;
    }

    return `${raw.slice(0, 239)}…`;
}

function inferSeverity(error: Error & { digest?: string }): Severity {
    const raw = `${error?.name || ""} ${error?.message || ""}`.toLowerCase();

    if (
        raw.includes("chunk") ||
        raw.includes("loading chunk") ||
        raw.includes("module") ||
        raw.includes("asset")
    ) {
        return "asset-layer";
    }

    if (
        raw.includes("fetch") ||
        raw.includes("request") ||
        raw.includes("timeout") ||
        raw.includes("network") ||
        raw.includes("failed to fetch")
    ) {
        return "request-layer";
    }

    if (
        raw.includes("render") ||
        raw.includes("hydration") ||
        raw.includes("route") ||
        raw.includes("server component")
    ) {
        return "route-isolated";
    }

    return "unknown";
}

function humanizeSeverity(severity: Severity) {
    if (severity === "asset-layer") return "Asset-layer";
    if (severity === "request-layer") return "Request-layer";
    if (severity === "route-isolated") return "Route-isolated";
    return "Unknown";
}

function inferLikelyCause(error: Error & { digest?: string }) {
    const raw = `${error?.name || ""} ${error?.message || ""}`.toLowerCase();

    if (raw.includes("chunk") || raw.includes("module")) {
        return "A client asset or route bundle likely failed to load cleanly.";
    }

    if (raw.includes("fetch") || raw.includes("request") || raw.includes("timeout")) {
        return "A dependent request likely failed before the route could complete.";
    }

    if (raw.includes("hydration")) {
        return "The client and rendered route state likely diverged during hydration.";
    }

    if (raw.includes("render")) {
        return "A page-level render path likely failed during route assembly.";
    }

    return "The route hit a runtime condition it could not complete safely.";
}

function ErrorAtmosphere() {
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

function ReasonCard({
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
                    ? "system-panel-authority rounded-[1.7rem] p-6"
                    : "system-surface rounded-[1.7rem] p-6"
            }
        >
            <h3 className="text-2xl font-semibold tracking-tight text-white">
                {title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">{copy}</p>
        </article>
    );
}

function DiagnosticTile({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="system-surface rounded-[1.2rem] p-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                {label}
            </div>
            <div className="mt-2 break-all text-sm font-semibold text-white">
                {value}
            </div>
        </div>
    );
}

function RecoveryCard({
    option,
    onRetry,
    highlighted = false,
}: {
    option: RecoveryOption;
    onRetry: () => void;
    highlighted?: boolean;
}) {
    return (
        <article
            className={
                highlighted
                    ? "system-panel-authority rounded-[1.85rem] p-6"
                    : "system-surface rounded-[1.85rem] p-6"
            }
        >
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
                {option.label}
            </div>

            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                {option.title}
            </h3>

            <p className="mt-4 text-sm leading-7 text-slate-300">{option.copy}</p>

            <div className="mt-6">
                {option.kind === "retry" ? (
                    <button
                        type="button"
                        onClick={onRetry}
                        className={
                            highlighted
                                ? "system-button-primary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition"
                                : "system-button-secondary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition"
                        }
                    >
                        Try again
                    </button>
                ) : (
                    <Link
                        href={option.href}
                        className={
                            highlighted
                                ? "system-button-primary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition"
                                : "system-button-secondary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition"
                        }
                    >
                        {option.cta}
                    </Link>
                )}
            </div>
        </article>
    );
}
