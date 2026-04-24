import type { ReactNode } from "react";

const optimizationLayers = [
    {
        title: "Trust strengthening",
        copy:
            "Preparing the layer that helps improve how credible, current, and solid the business feels when people first encounter it.",
    },
    {
        title: "Clarity strengthening",
        copy:
            "Preparing the layer that sharpens what the business does, who it is for, and why the offer should feel easy to understand.",
    },
    {
        title: "Positioning strengthening",
        copy:
            "Preparing the layer that helps the business stand apart more clearly instead of blending into weaker alternatives.",
    },
    {
        title: "Conversion strengthening",
        copy:
            "Preparing the layer that reduces hesitation and helps the right next move feel more natural to take.",
    },
];

export default function OptimizationLoadingPage() {
    return (
        <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 text-white sm:px-6 md:py-16 xl:py-20">
            <OptimizationLoadingAtmosphere />

            <section className="relative z-10 max-w-5xl">
                <TopChip>Presence Infrastructure loading</TopChip>

                <h1 className="system-hero-title mt-5 max-w-5xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
                    Preparing the optimization layer
                    <span className="system-gradient-text block">
                        before concentrated improvement begins.
                    </span>
                </h1>

                <p className="mt-6 max-w-4xl text-base leading-8 text-slate-300 sm:text-lg">
                    This route is loading the one-time optimization layer so the business
                    can move from explanation into focused improvement through a controlled,
                    high-authority path instead of a weak transition.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                    <AuthorityPill>One-time improvement</AuthorityPill>
                    <AuthorityPill>Priority-based strengthening</AuthorityPill>
                    <AuthorityPill>Focused execution path</AuthorityPill>
                </div>
            </section>

            <section className="relative z-10 mt-16 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8 md:p-10">
                    <TopChip>Route meaning</TopChip>

                    <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The system is loading the concentrated improvement layer before the
                        business commits to a stronger build move.
                    </h2>

                    <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
                        The Presence Infrastructure page matters because this is where the business
                        moves beyond explanation and into a more serious one-time improvement
                        path. That route should feel focused, controlled, and powerful even
                        while it loads.
                    </p>

                    <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">
                        This loading layer protects that transition so the page can prepare
                        the improvement structure without dropping the user into a blank,
                        weak, or uncertain state.
                    </p>

                    <div className="mt-8">
                        <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.22em] text-slate-400">
                            <span>Presence Infrastructure route readiness</span>
                            <span>68%</span>
                        </div>

                        <div className="system-status-bar mt-2 h-2">
                            <span style={{ width: "68%" }} />
                        </div>
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                        <StatusTile label="Diagnosis layer" value="Already clearer" />
                        <StatusTile label="Presence Infrastructure layer" value="Preparing" highlighted />
                        <StatusTile label="Next move" value="Concentrating" />
                    </div>
                </div>

                <div className="grid gap-4">
                    <ReadoutCard
                        label="Why this matters"
                        value="This page turns clarity into action"
                        copy="Without a focused improvement layer, businesses often know what is wrong but still fail to apply pressure in the right places."
                    />
                    <ReadoutCard
                        label="What is loading"
                        value="Presence Infrastructure structure and improvement path"
                        copy="The route may be resolving content, preparing the page architecture, or loading the one-time improvement layer."
                    />
                    <ReadoutCard
                        label="Best reading rule"
                        value="Improve only after priorities are clear"
                        copy="The strongest optimization move still comes after the business understands what matters most, not before."
                    />
                </div>
            </section>

            <section className="relative z-10 mt-20">
                <div className="max-w-3xl">
                    <TopChip>Presence Infrastructure preview</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The route is preparing the main areas of concentrated strengthening.
                    </h2>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {optimizationLayers.map((item, index) => (
                        <LoadingOptimizationCard
                            key={item.title}
                            title={item.title}
                            copy={item.copy}
                            highlighted={index === 0}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}

function OptimizationLoadingAtmosphere() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-10 top-8 h-72 w-72 rounded-full bg-violet-400/10 blur-3xl sm:h-96 sm:w-96" />
            <div className="absolute -right-8 top-28 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl sm:h-80 sm:w-80" />
            <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-300/8 blur-3xl sm:h-[26rem] sm:w-[26rem]" />
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

function LoadingOptimizationCard({
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
                Presence Infrastructure layer
            </div>

            <div className="mt-3 text-2xl font-semibold text-white">{title}</div>

            <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>

            <div className="mt-6 space-y-3">
                <SkeletonLine wide />
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
        <div className="h-2.5 animate-pulse rounded-full bg-white/[0.06]">
            <div className={`h-full rounded-full bg-transparent ${widthClass}`} />
        </div>
    );
}
