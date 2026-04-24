import Link from "next/link";
import type { ReactNode } from "react";

const BRAND_NAME = "Cendorq";
const CATEGORY_LINE = "Search Presence OS";

const ROUTE_READOUTS = [
    {
        label: "Page state",
        value: "Route missing",
    },
    {
        label: "Best posture",
        value: "Return to structure",
    },
    {
        label: "Recovery bias",
        value: "Use the cleanest lane",
    },
    {
        label: "Trust rule",
        value: "Do not guess deeper",
    },
] as const;

const LIKELY_REASONS = [
    {
        title: "The route may be outdated or no longer part of the current structure.",
        copy:
            "This can happen when an older link, copied URL, stale bookmark, or previously valid route no longer belongs inside the current Cendorq path.",
    },
    {
        title: "The path may have been entered incorrectly.",
        copy:
            "A small route difference can point to a missing page even when the intended destination still exists elsewhere in the platform.",
    },
    {
        title: "The destination may belong to a different system layer.",
        copy:
            "Sometimes the page still exists, but under a cleaner route like Search Presence Scan, Diagnosis, Pricing, FAQ, Contact, or one of the deeper layer pages.",
    },
] as const;

const RECOVERY_RULES = [
    {
        title: "Do not search randomly from a broken route.",
        copy:
            "The cleanest recovery is usually to step back into the main system path instead of clicking through unrelated pages and weakening orientation.",
    },
    {
        title: "Restart from the correct layer, not the loudest-looking one.",
        copy:
            "If the original goal was to begin properly, Search Presence Scan is usually the strongest first re-entry point. If the goal was route clarity, Diagnosis or Pricing may be stronger.",
    },
    {
        title: "Use the homepage when the destination is unclear.",
        copy:
            "The homepage restores the broadest clean context and makes it easier to re-enter the platform without forcing another route guess.",
    },
] as const;

const RECOVERY_OPTIONS = [
    {
        label: "Strongest first move",
        title: "Start Search Presence Scan",
        copy:
            "If the user was trying to enter the system properly, the strongest recovery move is usually to restart with the first serious business signal.",
        href: "/free-check",
        cta: "Start Search Presence Scan",
        highlighted: true,
    },
    {
        label: "Read the path",
        title: "See how the system works",
        copy:
            "If the user was trying to understand where something belongs, Diagnosis is the cleanest page for understanding the platform sequence before choosing a deeper layer.",
        href: "/diagnosis",
        cta: "See how it works",
    },
    {
        label: "Compare the layers",
        title: "Review system layers",
        copy:
            "If the user was looking for a specific offer layer, the Pricing route gives the cleanest side-by-side comparison across the full sequence.",
        href: "/pricing",
        cta: "View system layers",
    },
    {
        label: "Reset route",
        title: "Return to homepage",
        copy:
            "If the intended destination is not clear, the homepage is the best broad reset point for restoring context without adding route confusion.",
        href: "/",
        cta: "Go to homepage",
    },
] as const;

const CLEAN_ENTRY_POINTS = [
    {
        label: "First signal",
        title: "Search Presence Scan",
        copy:
            "Use when the business still needs a cleaner first read before it needs deeper explanation or stronger implementation pressure.",
        href: "/free-check",
    },
    {
        label: "System logic",
        title: "Diagnosis",
        copy:
            "Use when the user needs to understand how the platform sequence works before choosing the wrong next layer.",
        href: "/diagnosis",
    },
    {
        label: "Layer comparison",
        title: "Pricing",
        copy:
            "Use when the user needs a side-by-side view of Search Presence Scan, Visibility Blueprint, Presence Infrastructure, and Presence Command.",
        href: "/pricing",
    },
] as const;

export default function NotFoundPage() {
    return (
        <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 text-white sm:px-6 md:py-16 xl:py-20">
            <NotFoundAtmosphere />

            <section className="relative z-10 border-b border-white/8 pb-10">
                <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                    <span className="system-chip rounded-full px-3 py-1.5 text-cyan-200">
                        {BRAND_NAME}
                    </span>
                    <span className="text-white/20">/</span>
                    <span className="text-white/70">{CATEGORY_LINE}</span>
                    <span className="text-white/20">/</span>
                    <span className="text-cyan-100">404</span>
                </div>
            </section>

            <section className="relative z-10 grid gap-10 pt-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-start">
                <div>
                    <TopChip>Route not found</TopChip>

                    <h1 className="system-hero-title mt-5 max-w-5xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
                        This route does not exist
                        <span className="system-gradient-text block">
                            inside the current system path.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                        The page you tried to open is not available here. That usually means
                        the link is outdated, the route was entered incorrectly, or the real
                        destination belongs somewhere else inside the current platform structure.
                    </p>

                    <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                        The strongest recovery move is not to guess. It is to return to a
                        clean route and re-enter the system through the correct layer.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <AuthorityPill>Clean routing</AuthorityPill>
                        <AuthorityPill>System path first</AuthorityPill>
                        <AuthorityPill>No blind guessing</AuthorityPill>
                    </div>

                    <div className="system-panel-authority mt-8 rounded-[1.8rem] p-5 sm:p-6">
                        <p className="system-eyebrow">Primary reading rule</p>

                        <h2 className="mt-4 text-2xl font-semibold text-white">
                            Return to the main path instead of searching from a broken route.
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                            {BRAND_NAME} is structured as a sequenced operating system. When a
                            route is missing, the strongest move is usually to step back into the
                            homepage, Search Presence Scan, Diagnosis, Pricing, FAQ, or Contact
                            and continue from there with the right context restored.
                        </p>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                            <GuideTile
                                label="Strongest next move"
                                value="Return to a clean system route"
                            />
                            <GuideTile
                                label="Main mistake avoided"
                                value="Guessing into the wrong page again"
                            />
                        </div>
                    </div>

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

                <div className="grid gap-4">
                    <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                            <div className="max-w-2xl">
                                <TopChip>Recovery posture</TopChip>

                                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                                    The best recovery path is the one that restores clarity fast.
                                </h2>

                                <p className="mt-5 text-base leading-8 text-slate-300">
                                    A missing route should not send the user into random navigation.
                                    It should guide them back into the strongest available system lane
                                    so the next move becomes cleaner, not noisier.
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
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                        <StatusTile label="Route state" value="Missing" highlighted />
                        <StatusTile label="Recovery bias" value="Structured" />
                        <StatusTile label="User risk" value="Wrong-route guessing" />
                    </div>

                    <div className="system-surface rounded-[1.7rem] p-6">
                        <p className="system-eyebrow">Most likely causes</p>

                        <div className="mt-4 grid gap-4">
                            {LIKELY_REASONS.map((item, index) => (
                                <ReasonRow
                                    key={item.title}
                                    title={item.title}
                                    copy={item.copy}
                                    highlighted={index === 0}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="system-surface rounded-[1.7rem] p-6">
                        <p className="system-eyebrow">Clean entry points</p>

                        <div className="mt-4 grid gap-3">
                            {CLEAN_ENTRY_POINTS.map((item, index) => (
                                <EntryPointCard
                                    key={item.title}
                                    label={item.label}
                                    title={item.title}
                                    copy={item.copy}
                                    href={item.href}
                                    highlighted={index === 0}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative z-10 mt-20">
                <div className="max-w-3xl">
                    <TopChip>Recovery options</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Use the cleanest next route, not the most random one.
                    </h2>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {RECOVERY_OPTIONS.map((item, index) => (
                        <RecoveryCard
                            key={item.title}
                            label={item.label}
                            title={item.title}
                            copy={item.copy}
                            href={item.href}
                            cta={item.cta}
                            highlighted={index === 0}
                        />
                    ))}
                </div>
            </section>

            <section className="relative z-10 mt-20">
                <div className="system-panel-authority rounded-[2rem] p-6 text-center sm:p-8 md:p-10">
                    <TopChip>Best next move</TopChip>

                    <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Go back to the homepage or restart from the correct layer.
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-300">
                        If you are not sure where you meant to go, the homepage is the best
                        broad reset point. If you were trying to begin properly, Search Presence
                        Scan is usually the strongest structured restart. If you were comparing
                        deeper layers, Diagnosis or Pricing will usually restore the cleanest route logic.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                        <Link
                            href="/"
                            className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
                        >
                            Go to homepage
                        </Link>
                        <Link
                            href="/free-check"
                            className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
                        >
                            Start Search Presence Scan
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

function NotFoundAtmosphere() {
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

function ReasonRow({
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
                    ? "system-chip rounded-[1.35rem] p-4"
                    : "system-surface rounded-[1.35rem] p-4"
            }
        >
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-300">{copy}</p>
        </div>
    );
}

function EntryPointCard({
    label,
    title,
    copy,
    href,
    highlighted = false,
}: {
    label: string;
    title: string;
    copy: string;
    href: string;
    highlighted?: boolean;
}) {
    return (
        <Link
            href={href}
            className={
                highlighted
                    ? "system-chip rounded-[1.35rem] p-4 transition"
                    : "system-surface rounded-[1.35rem] p-4 transition hover:border-cyan-300/22 hover:bg-white/[0.05]"
            }
        >
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
                {label}
            </div>
            <h3 className="mt-2 text-lg font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-300">{copy}</p>
        </Link>
    );
}

function RecoveryCard({
    label,
    title,
    copy,
    href,
    cta,
    highlighted = false,
}: {
    label: string;
    title: string;
    copy: string;
    href: string;
    cta: string;
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
                {label}
            </div>

            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                {title}
            </h3>

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
                    {cta}
                </Link>
            </div>
        </article>
    );
}
