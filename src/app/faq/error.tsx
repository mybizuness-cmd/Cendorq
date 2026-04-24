"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect } from "react";

type FaqErrorPageProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

const recoveryRoutes = [
    {
        title: "Retry the FAQ page",
        copy:
            "Use this first if the interruption looks temporary and you want the answer layer to attempt a clean recovery.",
        type: "retry" as const,
    },
    {
        title: "Return to How It Works",
        copy:
            "Use this if you want to step back into the system sequence page before trying to load the FAQ again.",
        href: "/diagnosis",
        label: "See how it works",
    },
    {
        title: "Go back to Plans",
        copy:
            "Use this if you want to review the plan architecture directly from a stable route instead of forcing the broken answer page.",
        href: "/pricing",
        label: "View plans",
    },
];

export default function FaqErrorPage({
    error,
    reset,
}: FaqErrorPageProps) {
    useEffect(() => {
        console.error("FAQ route error:", error);
    }, [error]);

    const reference =
        typeof error?.digest === "string" && error.digest.trim()
            ? error.digest.trim()
            : "No digest available";

    return (
        <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 text-white sm:px-6 md:py-16 xl:py-20">
            <FaqErrorAtmosphere />

            <section className="relative z-10 max-w-5xl">
                <TopChip>FAQ interruption</TopChip>

                <h1 className="system-hero-title mt-5 max-w-5xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
                    The answer layer hit a problem,
                    <span className="system-gradient-text block">
                        but the strongest next move is still clear.
                    </span>
                </h1>

                <p className="mt-6 max-w-4xl text-base leading-8 text-slate-300 sm:text-lg">
                    The FAQ page failed while trying to load or render the answer
                    structure. That does not automatically mean the whole platform is
                    down. It means this specific route needs a clean retry or a cleaner
                    re-entry path.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                    <AuthorityPill>Retry once</AuthorityPill>
                    <AuthorityPill>Use a stable route</AuthorityPill>
                    <AuthorityPill>Do not force a broken answer page</AuthorityPill>
                </div>
            </section>

            <section className="relative z-10 mt-16 grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
                <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8 md:p-10">
                    <TopChip>What failed</TopChip>

                    <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The page that should remove confusion broke before the route could
                        explain the system cleanly.
                    </h2>

                    <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
                        This route matters because it answers the practical questions that
                        usually appear right before a business chooses the wrong step too
                        early. When that route fails, the right move is not random clicking.
                        The right move is controlled recovery.
                    </p>

                    <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">
                        Retry the page once. If it still fails, step back into a stable path
                        like How It Works or Plans so the business can recover clarity from
                        a clean route instead of forcing a broken answer layer.
                    </p>

                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                        <StatusTile label="System sequence" value="Still available" />
                        <StatusTile label="Answer layer" value="Interrupted" highlighted />
                        <StatusTile label="Recovery path" value="Ready" />
                    </div>
                </div>

                <div className="grid gap-4">
                    <ReadoutCard
                        label="Route state"
                        value="FAQ route failure captured"
                        copy="The interruption happened on the answer page, not necessarily across the full system."
                    />
                    <ReadoutCard
                        label="Best next move"
                        value="Retry once, then step back cleanly"
                        copy="If the page does not recover immediately, return to How It Works or Plans instead of forcing the broken route."
                    />
                    <ReadoutCard
                        label="Reference"
                        value={reference}
                        copy="Use this internal reference if the route failure needs to be identified more precisely later."
                        breakWords
                    />
                </div>
            </section>

            <section className="relative z-10 mt-20">
                <div className="max-w-3xl">
                    <TopChip>Recovery options</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Use the cleanest route back into the answer path.
                    </h2>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-3">
                    {recoveryRoutes.map((item) =>
                        item.type === "retry" ? (
                            <ActionCard
                                key={item.title}
                                title={item.title}
                                copy={item.copy}
                                action={
                                    <button
                                        type="button"
                                        onClick={reset}
                                        className="system-button-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition"
                                    >
                                        Retry FAQ route
                                    </button>
                                }
                            />
                        ) : (
                            <ActionCard
                                key={item.title}
                                title={item.title}
                                copy={item.copy}
                                action={
                                    <Link
                                        href={item.href}
                                        className="system-button-secondary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition"
                                    >
                                        {item.label}
                                    </Link>
                                }
                            />
                        ),
                    )}
                </div>
            </section>

            <section className="relative z-10 mt-20">
                <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8 md:p-10">
                    <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
                        <div>
                            <TopChip>Best reading rule</TopChip>

                            <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                                Do not make the next step decision from a broken answer page.
                            </h2>

                            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
                                The stronger move is to recover the route once, then step back
                                into the system sequence or the plan architecture if needed. That
                                keeps the decision path clear and prevents a temporary page
                                failure from distorting what the business does next.
                            </p>

                            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                                <Link
                                    href="/diagnosis"
                                    className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
                                >
                                    Return to How It Works
                                </Link>

                                <Link
                                    href="/pricing"
                                    className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
                                >
                                    View plans
                                </Link>
                            </div>
                        </div>

                        <div className="grid gap-4">
                            <InfoTile label="Most stable re-entry" value="How It Works" />
                            <InfoTile label="Fallback comparison route" value="Plans" />
                            <InfoTile label="Retry rule" value="Retry once only" />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

function FaqErrorAtmosphere() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-10 top-8 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl sm:h-96 sm:w-96" />
            <div className="absolute right-0 top-16 h-72 w-72 rounded-full bg-rose-400/10 blur-3xl sm:h-96 sm:w-96" />
            <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-300/8 blur-3xl sm:h-[26rem] sm:w-[26rem]" />
            <div className="system-grid-wide absolute inset-0 opacity-[0.03]" />
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

function ReadoutCard({
    label,
    value,
    copy,
    breakWords = false,
}: {
    label: string;
    value: string;
    copy: string;
    breakWords?: boolean;
}) {
    return (
        <div className="system-surface rounded-[1.5rem] p-5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                {label}
            </div>
            <div
                className={`mt-2 text-xl font-semibold text-white ${breakWords ? "break-all" : ""
                    }`}
            >
                {value}
            </div>
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

function ActionCard({
    title,
    copy,
    action,
}: {
    title: string;
    copy: string;
    action: ReactNode;
}) {
    return (
        <div className="system-surface rounded-[1.6rem] p-6">
            <h3 className="text-2xl font-semibold tracking-tight text-white">
                {title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                {copy}
            </p>
            <div className="mt-6">{action}</div>
        </div>
    );
}

function InfoTile({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="system-surface rounded-[1.4rem] p-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                {label}
            </div>
            <div className="mt-2 text-base font-semibold text-white">{value}</div>
        </div>
    );
}
