"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState, type ReactNode } from "react";

type MatchMode = "exact" | "startsWith";

type NavItem = {
    label: string;
    href: string;
    description: string;
    match?: MatchMode;
};

type StageItem = {
    step: string;
    title: string;
    href: string;
    description: string;
};

type RouteContext = {
    eyebrow: string;
    label: string;
    note: string;
    pressure: string;
};

type Action = {
    href: string;
    label: string;
};

type NextMove = {
    href: string;
    label: string;
    note: string;
};

type StageState = "active" | "complete" | "suggested" | "idle";

const BRAND_NAME = "Cendorq";
const CATEGORY_LINE = "Search Presence OS";

const PRIMARY_NAV: readonly NavItem[] = [
    {
        label: "How It Works",
        href: "/diagnosis",
        description: "Read the operating path before choosing depth.",
        match: "exact",
    },
    {
        label: "System Layers",
        href: "/pricing",
        description: "Compare the full route side by side.",
        match: "startsWith",
    },
    {
        label: "Profile",
        href: "/profile",
        description: "Review the platform doctrine and posture.",
        match: "exact",
    },
    {
        label: "FAQ",
        href: "/faq",
        description: "Get explicit answers before choosing the wrong layer.",
        match: "exact",
    },
    {
        label: "Contact",
        href: "/contact",
        description: "Use the right communication lane for the current stage.",
        match: "exact",
    },
] as const;

const TRUST_NAV: readonly NavItem[] = [
    {
        label: "Privacy",
        href: "/privacy",
        description: "Read the data and collection boundaries.",
        match: "exact",
    },
    {
        label: "Terms",
        href: "/terms",
        description: "Understand scope, structure, and service boundaries.",
        match: "exact",
    },
    {
        label: "Disclaimer",
        href: "/disclaimer",
        description: "Read the claim, certainty, and outcome boundaries.",
        match: "exact",
    },
] as const;

const SYSTEM_STAGES: readonly StageItem[] = [
    {
        step: "01",
        title: "Search Presence Scan",
        href: "/free-check",
        description: "First serious signal",
    },
    {
        step: "02",
        title: "Visibility Blueprint",
        href: "/pricing/full-diagnosis",
        description: "Strategic explanation",
    },
    {
        step: "03",
        title: "Presence Infrastructure",
        href: "/pricing/optimization",
        description: "Build the system",
    },
    {
        step: "04",
        title: "Presence Command",
        href: "/pricing/monthly-partner",
        description: "Ongoing operating layer",
    },
] as const;

const HEADER_PILLARS = [
    "Signal first",
    "Explanation before force",
    "Infrastructure before scale",
    "Continuity as strategy",
] as const;

export function SiteHeader() {
    const pathname = usePathname();
    const safePathname = pathname || "/";
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        setMobileOpen(false);
    }, [safePathname]);

    useEffect(() => {
        if (typeof document === "undefined") return;

        const previousOverflow = document.body.style.overflow;
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [mobileOpen]);

    const currentRoute = useMemo(() => buildCurrentRoute(safePathname), [safePathname]);
    const primaryCta = useMemo(() => buildPrimaryCta(safePathname), [safePathname]);
    const secondaryCta = useMemo(() => buildSecondaryCta(safePathname), [safePathname]);
    const nextBestMove = useMemo(() => buildNextBestMove(safePathname), [safePathname]);
    const activeStageIndex = useMemo(() => getActiveStageIndex(safePathname), [safePathname]);
    const suggestedStageHref = useMemo(() => getSuggestedStageHref(safePathname), [safePathname]);

    return (
        <header className="sticky top-0 z-50 border-b border-white/6 bg-slate-950/84 text-white backdrop-blur-2xl supports-[backdrop-filter]:bg-slate-950/72">
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent" />

            <div className="hidden border-b border-white/6 lg:block">
                <div className="mx-auto flex min-h-[2.9rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
                    <div className="flex min-w-0 items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                        <span className="system-chip rounded-full px-3 py-1 text-cyan-200">
                            {BRAND_NAME}
                        </span>
                        <span className="text-white/20">/</span>
                        <span className="truncate text-white/72">{currentRoute.eyebrow}</span>
                        <span className="text-white/20">/</span>
                        <span className="truncate text-cyan-100">{currentRoute.label}</span>
                    </div>

                    <div className="flex min-w-0 items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                        <span className="hidden xl:inline">Next best move</span>
                        <span className="text-white/20">/</span>
                        <Link
                            href={nextBestMove.href}
                            className="truncate text-white/78 transition hover:text-cyan-100"
                        >
                            {nextBestMove.label}
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="flex min-h-[5.65rem] items-center justify-between gap-4 py-3">
                    <div className="flex min-w-0 items-center gap-4">
                        <Link
                            href="/"
                            aria-label={`${BRAND_NAME} homepage`}
                            className="group inline-flex min-w-0 items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 transition duration-200 hover:border-cyan-300/28 hover:bg-white/[0.05]"
                        >
                            <BrandMark />

                            <span className="min-w-0">
                                <span className="block truncate text-sm font-semibold tracking-[0.16em] text-white sm:text-base">
                                    {BRAND_NAME}
                                </span>
                                <span className="hidden truncate text-[11px] uppercase tracking-[0.18em] text-slate-400 sm:block">
                                    {CATEGORY_LINE}
                                </span>
                            </span>
                        </Link>

                        <div className="hidden xl:flex">
                            <HeaderPill>{HEADER_PILLARS[0]}</HeaderPill>
                        </div>
                    </div>

                    <nav aria-label="Primary navigation" className="hidden items-center gap-1 xl:flex">
                        {PRIMARY_NAV.map((item) => (
                            <DesktopNavLink
                                key={item.href}
                                href={item.href}
                                active={isNavActive(safePathname, item)}
                            >
                                {item.label}
                            </DesktopNavLink>
                        ))}
                    </nav>

                    <div className="hidden items-center gap-3 lg:flex">
                        <div className="hidden min-w-[18rem] xl:block">
                            <RoutePanel
                                label={currentRoute.label}
                                note={currentRoute.note}
                                pressure={currentRoute.pressure}
                            />
                        </div>

                        <Link
                            href={secondaryCta.href}
                            className="system-button-secondary inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition"
                        >
                            {secondaryCta.label}
                        </Link>

                        <Link
                            href={primaryCta.href}
                            className="system-button-primary inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition"
                        >
                            {primaryCta.label}
                        </Link>
                    </div>

                    <button
                        type="button"
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-site-nav"
                        aria-label={mobileOpen ? "Close site navigation" : "Open site navigation"}
                        onClick={() => setMobileOpen((current) => !current)}
                        className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-300/26 hover:bg-white/[0.06] lg:hidden"
                    >
                        {mobileOpen ? "Close" : "Menu"}
                    </button>
                </div>

                <div className="hidden border-t border-white/6 pb-4 pt-4 xl:block">
                    <div className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr] xl:items-start">
                        <div>
                            <div className="flex flex-wrap gap-2">
                                {HEADER_PILLARS.map((item) => (
                                    <HeaderPill key={item}>{item}</HeaderPill>
                                ))}
                            </div>

                            <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                                {SYSTEM_STAGES.map((item, index) => {
                                    const state = getStageState({
                                        pathname: safePathname,
                                        stageHref: item.href,
                                        index,
                                        activeStageIndex,
                                        suggestedStageHref,
                                    });

                                    return (
                                        <StageLink
                                            key={item.href}
                                            href={item.href}
                                            title={item.title}
                                            description={item.description}
                                            step={item.step}
                                            state={state}
                                        />
                                    );
                                })}
                            </div>
                        </div>

                        <div className="grid gap-3 xl:grid-cols-2">
                            <StatusCard
                                label="Current route"
                                value={currentRoute.label}
                                copy={currentRoute.note}
                                highlighted
                            />
                            <StatusCard
                                label="Next best move"
                                value={nextBestMove.label}
                                copy={nextBestMove.note}
                            />
                            <StatusCard
                                label="Route pressure"
                                value={currentRoute.pressure}
                                copy="The header keeps the user oriented to what this layer is supposed to do."
                            />
                            <StatusCard
                                label="Primary lane"
                                value={primaryCta.label}
                                copy="The highest-probability action based on the current stage."
                            />
                        </div>
                    </div>
                </div>

                <div className="hidden pb-4 pt-2 lg:block xl:hidden">
                    <div className="flex flex-wrap gap-2">
                        {HEADER_PILLARS.map((item) => (
                            <HeaderPill key={item}>{item}</HeaderPill>
                        ))}
                    </div>
                </div>

                {mobileOpen ? (
                    <div id="mobile-site-nav" className="pb-4 lg:hidden">
                        <div className="system-panel-authority rounded-[1.9rem] p-4 sm:p-5">
                            <div className="grid gap-4">
                                <div className="grid gap-3 sm:grid-cols-[1.12fr_0.88fr]">
                                    <RoutePanel
                                        label={currentRoute.label}
                                        note={currentRoute.note}
                                        pressure={currentRoute.pressure}
                                    />

                                    <div className="grid gap-3">
                                        <StatusCard
                                            label="Next best move"
                                            value={nextBestMove.label}
                                            copy={nextBestMove.note}
                                            highlighted
                                        />
                                        <StatusCard
                                            label="Primary lane"
                                            value={primaryCta.label}
                                            copy="Use the strongest route for the current stage."
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {HEADER_PILLARS.map((item) => (
                                        <HeaderPill key={item}>{item}</HeaderPill>
                                    ))}
                                </div>

                                <section>
                                    <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                                        System path
                                    </div>

                                    <div className="mt-3 grid gap-2">
                                        {SYSTEM_STAGES.map((item, index) => {
                                            const state = getStageState({
                                                pathname: safePathname,
                                                stageHref: item.href,
                                                index,
                                                activeStageIndex,
                                                suggestedStageHref,
                                            });

                                            return (
                                                <MobileNavLink
                                                    key={item.href}
                                                    href={item.href}
                                                    active={state === "active"}
                                                    emphasized={state === "suggested"}
                                                    ariaLabel={buildStageAriaLabel(item.title, state)}
                                                >
                                                    <div className="flex items-start justify-between gap-3">
                                                        <div className="flex flex-col items-start">
                                                            <span className="text-sm font-semibold">{item.title}</span>
                                                            <span className="mt-1 text-xs font-medium tracking-normal text-slate-400">
                                                                {item.description}
                                                            </span>
                                                        </div>
                                                        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                                                            {item.step}
                                                        </span>
                                                    </div>
                                                </MobileNavLink>
                                            );
                                        })}
                                    </div>
                                </section>

                                <section>
                                    <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                                        Pages
                                    </div>

                                    <div className="mt-3 grid gap-2">
                                        {PRIMARY_NAV.map((item) => (
                                            <MobileNavLink
                                                key={item.href}
                                                href={item.href}
                                                active={isNavActive(safePathname, item)}
                                            >
                                                <div className="flex flex-col items-start">
                                                    <span>{item.label}</span>
                                                    <span className="mt-1 text-xs font-medium tracking-normal text-slate-400">
                                                        {item.description}
                                                    </span>
                                                </div>
                                            </MobileNavLink>
                                        ))}
                                    </div>
                                </section>

                                <div className="grid gap-2 sm:grid-cols-2">
                                    <Link
                                        href={primaryCta.href}
                                        className="system-button-primary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition"
                                    >
                                        {primaryCta.label}
                                    </Link>
                                    <Link
                                        href={secondaryCta.href}
                                        className="system-button-secondary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition"
                                    >
                                        {secondaryCta.label}
                                    </Link>
                                </div>

                                <section className="border-t border-white/8 pt-4">
                                    <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                                        Trust pages
                                    </div>

                                    <div className="mt-3 grid gap-2 sm:grid-cols-3">
                                        {TRUST_NAV.map((item) => (
                                            <MobileNavLink
                                                key={item.href}
                                                href={item.href}
                                                active={isNavActive(safePathname, item)}
                                                compact
                                            >
                                                <div className="flex flex-col items-start">
                                                    <span>{item.label}</span>
                                                    <span className="mt-1 text-xs font-medium tracking-normal text-slate-400">
                                                        {item.description}
                                                    </span>
                                                </div>
                                            </MobileNavLink>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </header>
    );
}

function BrandMark() {
    return (
        <span className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-cyan-300/20 bg-slate-950 shadow-[0_10px_30px_rgba(2,8,23,0.22)]">
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_28%,rgba(103,232,249,0.25),transparent_55%)]" />
            <span className="relative flex items-center gap-[3px]">
                <span className="h-4 w-1.5 rounded-full bg-cyan-200" />
                <span className="h-5 w-1.5 rounded-full bg-white" />
                <span className="h-3 w-1.5 rounded-full bg-indigo-200" />
            </span>
        </span>
    );
}

function HeaderPill({ children }: { children: ReactNode }) {
    return (
        <div className="system-chip inline-flex items-center gap-2 rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
            <span className="system-pulse-dot inline-flex h-2 w-2 rounded-full bg-cyan-300" />
            {children}
        </div>
    );
}

function RoutePanel({
    label,
    note,
    pressure,
}: {
    label: string;
    note: string;
    pressure: string;
}) {
    return (
        <div className="system-surface rounded-[1.3rem] px-4 py-3">
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                Current route
            </div>
            <div className="mt-2 text-sm font-semibold text-white">{label}</div>
            <div className="mt-1 text-xs leading-6 text-slate-400">{note}</div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="system-tag-strong rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]">
                    {pressure}
                </span>
            </div>
        </div>
    );
}

function DesktopNavLink({
    href,
    active,
    children,
}: {
    href: string;
    active?: boolean;
    children: ReactNode;
}) {
    return (
        <Link
            href={href}
            aria-current={active ? "page" : undefined}
            className={[
                "inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition duration-200",
                active
                    ? "border border-cyan-300/18 bg-cyan-300/10 text-cyan-100"
                    : "text-slate-300 hover:bg-white/[0.04] hover:text-white",
            ].join(" ")}
        >
            {children}
        </Link>
    );
}

function MobileNavLink({
    href,
    active,
    emphasized = false,
    children,
    compact = false,
    ariaLabel,
}: {
    href: string;
    active?: boolean;
    emphasized?: boolean;
    children: ReactNode;
    compact?: boolean;
    ariaLabel?: string;
}) {
    return (
        <Link
            href={href}
            aria-current={active ? "page" : undefined}
            aria-label={ariaLabel}
            className={[
                "rounded-[1.25rem] border text-left transition duration-200",
                compact ? "px-4 py-3" : "px-4 py-3.5",
                active
                    ? "border-cyan-300/18 bg-cyan-300/10 text-cyan-100"
                    : emphasized
                        ? "border-white/14 bg-white/[0.05] text-white"
                        : "border-white/10 bg-white/[0.03] text-slate-200 hover:border-cyan-300/22 hover:bg-white/[0.05] hover:text-white",
            ].join(" ")}
        >
            {children}
        </Link>
    );
}

function StageLink({
    href,
    title,
    description,
    step,
    state,
}: {
    href: string;
    title: string;
    description: string;
    step: string;
    state: StageState;
}) {
    return (
        <Link
            href={href}
            aria-current={state === "active" ? "page" : undefined}
            aria-label={buildStageAriaLabel(title, state)}
            className={[
                "rounded-[1.35rem] border px-4 py-4 transition duration-200",
                state === "active" && "border-cyan-300/18 bg-cyan-300/10",
                state === "complete" && "border-white/12 bg-white/[0.045]",
                state === "suggested" && "border-white/14 bg-white/[0.05]",
                state === "idle" &&
                "border-white/10 bg-white/[0.03] hover:border-cyan-300/22 hover:bg-white/[0.05]",
            ]
                .filter(Boolean)
                .join(" ")}
        >
            <div className="flex items-start justify-between gap-3">
                <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                        {step}
                    </div>
                    <div className="mt-2 text-sm font-semibold text-white">{title}</div>
                    <div className="mt-1 text-xs leading-6 text-slate-400">{description}</div>
                </div>

                <span
                    className={[
                        "mt-1 inline-flex h-2.5 w-2.5 rounded-full",
                        state === "active" && "system-pulse-dot bg-cyan-300",
                        state === "complete" && "bg-emerald-300",
                        state === "suggested" && "bg-white/70",
                        state === "idle" && "bg-white/18",
                    ]
                        .filter(Boolean)
                        .join(" ")}
                />
            </div>
        </Link>
    );
}

function StatusCard({
    label,
    value,
    copy,
    highlighted = false,
}: {
    label: string;
    value: string;
    copy: string;
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
            <div className="mt-2 text-sm font-semibold text-white">{value}</div>
            <div className="mt-2 text-xs leading-6 text-slate-400">{copy}</div>
        </div>
    );
}

function buildPrimaryCta(pathname: string): Action {
    if (pathname.startsWith("/free-check")) {
        return { href: "/free-check#free-check-intake", label: "Start scan" };
    }

    if (pathname.startsWith("/pricing/full-diagnosis")) {
        return { href: "/pricing/optimization", label: "See infrastructure" };
    }

    if (pathname.startsWith("/pricing/optimization")) {
        return { href: "/pricing/monthly-partner", label: "See command" };
    }

    if (pathname.startsWith("/pricing/monthly-partner")) {
        return { href: "/contact", label: "Talk through fit" };
    }

    return { href: "/free-check", label: "Start scan" };
}

function buildSecondaryCta(pathname: string): Action {
    if (pathname === "/") {
        return { href: "/diagnosis", label: "See how it works" };
    }

    if (pathname.startsWith("/free-check")) {
        return { href: "/pricing", label: "View system" };
    }

    if (pathname.startsWith("/pricing/full-diagnosis")) {
        return { href: "/pricing", label: "View system" };
    }

    if (pathname.startsWith("/pricing/optimization")) {
        return { href: "/pricing/full-diagnosis", label: "See blueprint" };
    }

    if (pathname.startsWith("/pricing/monthly-partner")) {
        return { href: "/pricing", label: "View system" };
    }

    if (pathname.startsWith("/pricing")) {
        return { href: "/diagnosis", label: "How it works" };
    }

    return { href: "/pricing", label: "View system" };
}

function buildNextBestMove(pathname: string): NextMove {
    if (pathname === "/") {
        return {
            href: "/free-check",
            label: "Search Presence Scan",
            note: "Start with the strongest first signal before heavier depth or implementation.",
        };
    }

    if (pathname.startsWith("/free-check")) {
        return {
            href: "/pricing/full-diagnosis",
            label: "Visibility Blueprint",
            note: "Move deeper when the business clearly needs strategic explanation, not just first signal.",
        };
    }

    if (pathname.startsWith("/pricing/full-diagnosis")) {
        return {
            href: "/pricing/optimization",
            label: "Presence Infrastructure",
            note: "Move into implementation once the system is clearer and the right priorities are known.",
        };
    }

    if (pathname.startsWith("/pricing/optimization")) {
        return {
            href: "/pricing/monthly-partner",
            label: "Presence Command",
            note: "Use the recurring operating layer when the business needs ongoing maintenance and adaptation.",
        };
    }

    if (pathname.startsWith("/pricing/monthly-partner")) {
        return {
            href: "/contact",
            label: "Contact",
            note: "Use the direct lane when command fit, scope, and business context need discussion.",
        };
    }

    if (pathname.startsWith("/pricing")) {
        return {
            href: "/free-check",
            label: "Search Presence Scan",
            note: "Most businesses still benefit from stronger first signal before committing deeper.",
        };
    }

    if (pathname.startsWith("/diagnosis")) {
        return {
            href: "/free-check",
            label: "Search Presence Scan",
            note: "After reading the route logic, the strongest entry is usually still the first signal layer.",
        };
    }

    return {
        href: "/free-check",
        label: "Search Presence Scan",
        note: "The route stays strongest when signal comes before escalation.",
    };
}

function buildCurrentRoute(pathname: string): RouteContext {
    if (pathname === "/") {
        return {
            eyebrow: "System entry",
            label: "Homepage",
            note: "Primary entry into the Cendorq operating path.",
            pressure: "Entry layer",
        };
    }

    if (pathname.startsWith("/free-check")) {
        return {
            eyebrow: "Current route",
            label: "Search Presence Scan",
            note: "Structured first-read intake for the initial visibility signal.",
            pressure: "Signal layer",
        };
    }

    if (pathname.startsWith("/pricing/full-diagnosis")) {
        return {
            eyebrow: "Current route",
            label: "Visibility Blueprint",
            note: "Strategic explanation of what is weakening search presence and response.",
            pressure: "Explanation layer",
        };
    }

    if (pathname.startsWith("/pricing/optimization")) {
        return {
            eyebrow: "Current route",
            label: "Presence Infrastructure",
            note: "Concentrated structural strengthening once the path is clearer.",
            pressure: "Build layer",
        };
    }

    if (pathname.startsWith("/pricing/monthly-partner")) {
        return {
            eyebrow: "Current route",
            label: "Presence Command",
            note: "Recurring operating continuity for maintenance, monitoring, and adaptation.",
            pressure: "Operating layer",
        };
    }

    if (pathname === "/pricing") {
        return {
            eyebrow: "Path comparison",
            label: "System layers",
            note: "Compare the full route side by side before committing deeper.",
            pressure: "Comparison layer",
        };
    }

    if (pathname.startsWith("/diagnosis")) {
        return {
            eyebrow: "Support route",
            label: "How it works",
            note: "Read the operating sequence before choosing the wrong layer.",
            pressure: "System logic",
        };
    }

    if (pathname.startsWith("/profile")) {
        return {
            eyebrow: "Support route",
            label: "Profile",
            note: "Platform doctrine, posture, and operating philosophy.",
            pressure: "Doctrine layer",
        };
    }

    if (pathname.startsWith("/faq")) {
        return {
            eyebrow: "Support route",
            label: "FAQ",
            note: "Explicit answers that keep the next move cleaner.",
            pressure: "Answer layer",
        };
    }

    if (pathname.startsWith("/contact")) {
        return {
            eyebrow: "Support route",
            label: "Contact",
            note: "Choose the right communication lane based on actual stage.",
            pressure: "Communication layer",
        };
    }

    if (pathname.startsWith("/privacy")) {
        return {
            eyebrow: "Trust route",
            label: "Privacy",
            note: "Data boundaries, collection logic, and privacy posture.",
            pressure: "Privacy boundary",
        };
    }

    if (pathname.startsWith("/terms")) {
        return {
            eyebrow: "Trust route",
            label: "Terms",
            note: "Scope, obligations, and commercial boundary clarity.",
            pressure: "Terms boundary",
        };
    }

    if (pathname.startsWith("/disclaimer")) {
        return {
            eyebrow: "Trust route",
            label: "Disclaimer",
            note: "Outcome limits, scope reality, and claim boundaries.",
            pressure: "Claim boundary",
        };
    }

    return {
        eyebrow: "System route",
        label: "System route",
        note: "Structured route inside the Cendorq platform.",
        pressure: "System layer",
    };
}

function getActiveStageIndex(pathname: string) {
    return SYSTEM_STAGES.findIndex((item) => isStageActive(pathname, item.href));
}

function getSuggestedStageHref(pathname: string) {
    if (
        pathname === "/" ||
        pathname.startsWith("/diagnosis") ||
        pathname.startsWith("/profile") ||
        pathname.startsWith("/faq") ||
        pathname.startsWith("/contact") ||
        pathname.startsWith("/privacy") ||
        pathname.startsWith("/terms") ||
        pathname.startsWith("/disclaimer") ||
        pathname.startsWith("/pricing")
    ) {
        return "/free-check";
    }

    return "";
}

function getStageState({
    pathname,
    stageHref,
    index,
    activeStageIndex,
    suggestedStageHref,
}: {
    pathname: string;
    stageHref: string;
    index: number;
    activeStageIndex: number;
    suggestedStageHref: string;
}): StageState {
    if (isStageActive(pathname, stageHref)) {
        return "active";
    }

    if (activeStageIndex >= 0 && index < activeStageIndex) {
        return "complete";
    }

    if (activeStageIndex === -1 && suggestedStageHref === stageHref) {
        return "suggested";
    }

    return "idle";
}

function isNavActive(pathname: string, item: NavItem) {
    const match = item.match || "startsWith";

    if (match === "exact") {
        return pathname === item.href;
    }

    if (item.href === "/") {
        return pathname === "/";
    }

    return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

function isStageActive(pathname: string, href: string) {
    if (href === "/pricing") {
        return pathname === href;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
}

function buildStageAriaLabel(title: string, state: StageState) {
    if (state === "active") return `${title}, current stage`;
    if (state === "complete") return `${title}, completed stage`;
    if (state === "suggested") return `${title}, suggested stage`;
    return title;
}
