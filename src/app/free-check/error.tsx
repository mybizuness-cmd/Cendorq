"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect } from "react";

type FreeCheckErrorPageProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

export default function FreeCheckErrorPage({
    error,
    reset,
}: FreeCheckErrorPageProps) {
    useEffect(() => {
        console.error("Free Scan route error:", error);
    }, [error]);

    const reference =
        typeof error?.digest === "string" && error.digest.trim()
            ? error.digest.trim()
            : "No digest available";

    return (
        <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 text-white sm:px-6 md:py-16 xl:py-20">
            <FreeCheckErrorAtmosphere />

            <section className="relative z-10 grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
                <div>
                    <TopChip>Free Scan interruption</TopChip>

                    <h1 className="system-hero-title mt-5 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
                        The intake route hit a problem,
                        <span className="system-gradient-text block">
                            but the strongest next move is still clear.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                        The free-check route failed while trying to load or render part of
                        the intake experience. That does not automatically mean the whole
                        system is broken. It means this specific intake path needs a clean
                        retry or a cleaner re-entry point.
                    </p>

                    <div className="mt-8 grid gap-3 sm:grid-cols-3">
                        <AuthorityPill>Retry once</AuthorityPill>
                        <AuthorityPill>Preserve signal quality</AuthorityPill>
                        <AuthorityPill>Use the clean route</AuthorityPill>
                    </div>

                    <div className="system-panel-authority mt-8 rounded-[1.8rem] p-5 sm:p-6">
                        <p className="system-eyebrow">What this means</p>

                        <h2 className="mt-4 text-2xl font-semibold text-white">
                            The route failed before the intake could complete cleanly.
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-300">
                            The Free Scan is the first serious signal layer in the system, so
                            it should stay clean, stable, and trustworthy. When this route
                            fails, the right move is not random clicking. The right move is to
                            retry once, then re-enter through a stable path if needed.
                        </p>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                            <GuideTile label="Route state" value="Free Scan failure captured" />
                            <GuideTile label="Best reading rule" value="Retry cleanly, then re-enter" />
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 rounded-[2rem] bg-cyan-400/10 blur-3xl" />

                    <div className="system-panel-authority relative rounded-[2rem] p-5 sm:p-6">
                        <div className="system-grid-wide absolute inset-0 opacity-[0.08]" />

                        <div className="relative z-10">
                            <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                    <div className="system-note-danger inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-rose-100">
                                        <span className="inline-flex h-2 w-2 rounded-full bg-rose-300" />
                                        Intake interrupted
                                    </div>

                                    <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                                        Free Scan recovery options
                                    </h2>

                                    <p className="mt-2 max-w-xl text-sm leading-7 text-slate-300">
                                        Use the cleanest move first. Retry once. If the route still
                                        fails, go back to a stable path and start again from a
                                        stronger entry point.
                                    </p>
                                </div>

                                <StageBadge />
                            </div>

                            <div className="mt-6 grid gap-4">
                                <ActionCard
                                    title="Retry this intake route"
                                    copy="Use this first if the interruption looks temporary and you want the route to attempt a clean recovery."
                                    action={
                                        <button
                                            type="button"
                                            onClick={reset}
                                            className="system-button-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition"
                                        >
                                            Retry Free Scan
                                        </button>
                                    }
                                />

                                <ActionCard
                                    title="Restart from the homepage"
                                    copy="Use this if you want to re-enter the system through a stable route before coming back to the intake."
                                    action={
                                        <Link
                                            href="/"
                                            className="system-button-secondary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition"
                                        >
                                            Go home
                                        </Link>
                                    }
                                />

                                <ActionCard
                                    title="Review the system path first"
                                    copy="Use this if you want to confirm the route sequence before returning to the intake layer."
                                    action={
                                        <Link
                                            href="/diagnosis"
                                            className="system-button-secondary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition"
                                        >
                                            See how it works
                                        </Link>
                                    }
                                />
                            </div>

                            <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                <InlineValue label="Error state" value="Route-level intake failure" />
                                <InlineValue label="Reference" value={reference} breakWords />
                            </div>

                            <div className="mt-6 grid gap-3 sm:grid-cols-4">
                                <StatusTile label="Identity lane" value="Interrupted" />
                                <StatusTile label="Context lane" value="Interrupted" />
                                <StatusTile label="Recovery state" value="Available" highlighted />
                                <StatusTile label="Safe route" value="Homepage or diagnosis" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

function FreeCheckErrorAtmosphere() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="system-orb-a absolute -left-10 top-8 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl sm:h-96 sm:w-96" />
            <div className="absolute right-0 top-16 h-72 w-72 rounded-full bg-rose-400/10 blur-3xl sm:h-96 sm:w-96" />
            <div className="system-orb-c absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-300/8 blur-3xl sm:h-[26rem] sm:w-[26rem]" />
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

function StageBadge() {
    return (
        <div className="system-surface hidden min-w-[128px] rounded-[1.6rem] px-4 py-4 text-center sm:block">
            <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
                Intake state
            </div>
            <div className="mt-2 text-lg font-semibold leading-none text-white">
                Recovery
            </div>
            <div className="mt-1 text-sm font-medium text-slate-300">
                route available
            </div>
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
        <div className="system-surface rounded-[1.5rem] p-5">
            <h3 className="text-xl font-semibold tracking-tight text-white">
                {title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>
            <div className="mt-5">{action}</div>
        </div>
    );
}

function InlineValue({
    label,
    value,
    breakWords = false,
}: {
    label: string;
    value: string;
    breakWords?: boolean;
}) {
    return (
        <div className="system-surface rounded-2xl px-4 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                {label}
            </p>
            <p
                className={`mt-2 text-sm font-medium text-white ${breakWords ? "break-all" : "break-words"
                    }`}
            >
                {value}
            </p>
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
