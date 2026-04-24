import type { ReactNode } from "react";

const sequenceCards = [
    {
        step: "Step 1",
        title: "Search Presence Scan",
        copy:
            "Capturing the first serious signal before the business commits to the wrong kind of help too early.",
    },
    {
        step: "Step 2",
        title: "Signal Review",
        copy:
            "Reading intake quality, seriousness, and enough context to justify a stronger interpretation layer.",
    },
    {
        step: "Step 3",
        title: "Visibility Blueprint",
        copy:
            "Preparing the deeper explanation layer that shows what may be weakening trust, clarity, positioning, and action.",
    },
    {
        step: "Step 4",
        title: "Right Next Move",
        copy:
            "Only after the explanation is clearer should the business move into the correct improvement or continuity path.",
    },
];

export default function DiagnosisLoadingPage() {
    return (
        <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 text-white sm:px-6 md:py-16 xl:py-20">
            <DiagnosisLoadingAtmosphere />

            <section className="relative z-10 max-w-5xl">
                <TopChip>How it works loading</TopChip>

                <h1 className="system-hero-title mt-5 max-w-5xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
                    Preparing the system path
                    <span className="system-gradient-text block">
                        before the explanation layer appears.
                    </span>
                </h1>

                <p className="mt-6 max-w-4xl text-base leading-8 text-slate-300 sm:text-lg">
                    This route is loading the sequence that explains how the system moves
                    from first signal to deeper interpretation so the business can choose
                    the next step through a cleaner, stronger decision path.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                    <AuthorityPill>Signal first</AuthorityPill>
                    <AuthorityPill>Explanation before motion</AuthorityPill>
                    <AuthorityPill>Right-step logic</AuthorityPill>
                </div>
            </section>

            <section className="relative z-10 mt-16 grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
                <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8 md:p-10">
                    <TopChip>Route meaning</TopChip>

                    <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The sequence is loading so the business can understand the path before it buys motion.
                    </h2>

                    <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
                        The How It Works page matters because it explains why the system is
                        structured in stages. It helps prevent businesses from jumping into
                        a bigger-looking step before they understand whether it is actually
                        the right step.
                    </p>

                    <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">
                        This loading state keeps that transition controlled instead of weak.
                        It gives the route enough time to assemble the system explanation
                        layer without dropping the user into a blank or broken view.
                    </p>

                    <div className="mt-8">
                        <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.22em] text-slate-400">
                            <span>Explanation route readiness</span>
                            <span>64%</span>
                        </div>

                        <div className="system-status-bar mt-2 h-2">
                            <span style={{ width: "64%" }} />
                        </div>
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                        <StatusTile label="Signal layer" value="Loaded first" />
                        <StatusTile label="System path" value="Preparing" highlighted />
                        <StatusTile label="Next move" value="Becoming clearer" />
                    </div>
                </div>

                <div className="grid gap-4">
                    <ReadoutCard
                        label="Why this page matters"
                        value="It explains the route logic"
                        copy="Without this layer, businesses are more likely to confuse first signal, explanation, optimization, and monthly continuity."
                    />
                    <ReadoutCard
                        label="What is loading"
                        value="System sequence and explanation structure"
                        copy="The route may be resolving content, loading page structure, or preparing the sequence that explains how each step fits."
                    />
                    <ReadoutCard
                        label="Best reading rule"
                        value="Understand the path before choosing pressure"
                        copy="The system works best when the business understands what each layer is for before paying for the wrong one."
                    />
                </div>
            </section>

            <section className="relative z-10 mt-20">
                <div className="max-w-3xl">
                    <TopChip>System sequence preview</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The route is preparing the explanation of how the system moves.
                    </h2>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {sequenceCards.map((item, index) => (
                        <LoadingSequenceCard
                            key={item.title}
                            step={item.step}
                            title={item.title}
                            copy={item.copy}
                            highlighted={index === 1}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}

function DiagnosisLoadingAtmosphere() {
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

function LoadingSequenceCard({
    step,
    title,
    copy,
    highlighted = false,
}: {
    step: string;
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
                {step}
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
        <div className="h-2.5 rounded-full bg-white/[0.06] animate-pulse">
            <div className={`h-full rounded-full bg-transparent ${widthClass}`} />
        </div>
    );
}
