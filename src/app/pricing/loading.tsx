import type { ReactNode } from "react";

const loadingPlans = [
    {
        eyebrow: "Best first step",
        title: "Search Presence Scan",
        price: "$0",
        cadence: "No-cost start",
    },
    {
        eyebrow: "Core paid step",
        title: "Visibility Blueprint",
        price: "$495",
        cadence: "One time",
    },
    {
        eyebrow: "One-time improvement layer",
        title: "Presence Infrastructure",
        price: "$4,500",
        cadence: "One time",
    },
    {
        eyebrow: "Recurring continuity layer",
        title: "Presence Command",
        price: "$1,500",
        cadence: "Per month",
    },
];

export default function PricingLoadingPage() {
    return (
        <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 text-white sm:px-6 md:py-16 xl:py-20">
            <PricingLoadingAtmosphere />

            <section className="relative z-10 max-w-5xl">
                <TopChip>Plans loading</TopChip>

                <h1 className="system-hero-title mt-5 max-w-5xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
                    Preparing the plan architecture
                    <span className="system-gradient-text block">
                        before the next step gets chosen.
                    </span>
                </h1>

                <p className="mt-6 max-w-4xl text-base leading-8 text-slate-300 sm:text-lg">
                    The pricing route is loading so the business can compare the system
                    path through a controlled structure instead of a weak transition or a
                    broken plan view.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                    <AuthorityPill>Signal first</AuthorityPill>
                    <AuthorityPill>Clear plan fit</AuthorityPill>
                    <AuthorityPill>Better next-step logic</AuthorityPill>
                </div>
            </section>

            <section className="relative z-10 mt-16 grid gap-6 xl:grid-cols-4">
                {loadingPlans.map((plan, index) => (
                    <LoadingPlanCard
                        key={plan.title}
                        eyebrow={plan.eyebrow}
                        title={plan.title}
                        price={plan.price}
                        cadence={plan.cadence}
                        highlighted={index === 0}
                    />
                ))}
            </section>

            <section className="relative z-10 mt-20 grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
                <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8 md:p-10">
                    <TopChip>Route meaning</TopChip>

                    <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The system is loading the plan logic, not dropping the user into a dead page.
                    </h2>

                    <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
                        The plans page matters because this is where businesses decide whether
                        they need first signal, deeper explanation, one-time improvement, or
                        recurring continuity. That route should feel controlled, authoritative,
                        and readable even while it loads.
                    </p>

                    <div className="mt-8">
                        <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.22em] text-slate-400">
                            <span>Plan route readiness</span>
                            <span>61%</span>
                        </div>

                        <div className="system-status-bar mt-2 h-2">
                            <span style={{ width: "61%" }} />
                        </div>
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                        <StatusTile label="Signal layer" value="Queued" />
                        <StatusTile label="Plan fit" value="Loading" highlighted />
                        <StatusTile label="Next move" value="Preparing" />
                    </div>
                </div>

                <div className="grid gap-4">
                    <ReadoutCard
                        label="Why this matters"
                        value="The plans page decides direction"
                        copy="Weak plan reading creates weak next-step decisions. The route is loading the business path, not just four price blocks."
                    />
                    <ReadoutCard
                        label="What is loading"
                        value="Plan hierarchy and route structure"
                        copy="The page may be resolving content, assembling the current plan architecture, or preparing route-level rendering."
                    />
                    <ReadoutCard
                        label="Best reading rule"
                        value="Wait for clarity, then choose"
                        copy="The strongest decision still starts by understanding which layer fits the real business need instead of choosing the biggest-looking step."
                    />
                </div>
            </section>
        </main>
    );
}

function PricingLoadingAtmosphere() {
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

function LoadingPlanCard({
    eyebrow,
    title,
    price,
    cadence,
    highlighted = false,
}: {
    eyebrow: string;
    title: string;
    price: string;
    cadence: string;
    highlighted?: boolean;
}) {
    return (
        <article
            className={
                highlighted
                    ? "system-panel-authority rounded-[2rem] p-6"
                    : "system-surface rounded-[2rem] p-6"
            }
        >
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
                {eyebrow}
            </div>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
                {title}
            </h2>

            <div className="mt-5 flex items-end gap-3">
                <div className="text-4xl font-semibold tracking-tight text-white">
                    {price}
                </div>
                <div className="pb-1 text-sm text-slate-300">{cadence}</div>
            </div>

            <div className="mt-6 space-y-3">
                <SkeletonLine wide />
                <SkeletonLine />
                <SkeletonLine />
                <SkeletonLine short />
            </div>

            <div className="mt-8 grid gap-3">
                <div className="system-button-primary h-11 rounded-full opacity-80" />
                <div className="system-button-secondary h-11 rounded-full opacity-80" />
            </div>
        </article>
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
        <div className="system-surface rounded-xl px-3 py-3">
            <div className={`h-2.5 animate-pulse rounded-full bg-white/[0.06] ${widthClass}`} />
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
