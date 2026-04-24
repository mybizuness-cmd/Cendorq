import type { ReactNode } from "react";

const faqPreviewGroups = [
    {
        eyebrow: "System",
        title: "How the system works",
        copy:
            "Preparing the answers that explain how the path moves from first signal into deeper explanation and then into the right next step.",
    },
    {
        eyebrow: "Search Presence Scan",
        title: "Questions about the Search Presence Scan",
        copy:
            "Preparing the answers that explain what the Search Presence Scan is for, what it is not, and why the intake needs real signal.",
    },
    {
        eyebrow: "Visibility Blueprint",
        title: "Questions about the diagnosis",
        copy:
            "Preparing the answers that explain the deeper interpretation layer and how it differs from implementation.",
    },
    {
        eyebrow: "Plans",
        title: "Questions about optimization and Presence Command",
        copy:
            "Preparing the answers that help businesses choose between one-time improvement and recurring continuity without guessing.",
    },
];

const pathCards = [
    { step: "Step 1", title: "Search Presence Scan", subtitle: "First signal" },
    { step: "Step 2", title: "Visibility Blueprint", subtitle: "Deep explanation" },
    { step: "Step 3", title: "Presence Infrastructure", subtitle: "One-time improvement" },
    { step: "Step 4", title: "Presence Command", subtitle: "Recurring continuity" },
];

export default function FaqLoadingPage() {
    return (
        <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 text-white sm:px-6 md:py-16 xl:py-20">
            <FaqLoadingAtmosphere />

            <section className="relative z-10 max-w-5xl">
                <TopChip>FAQ loading</TopChip>

                <h1 className="system-hero-title mt-5 max-w-5xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
                    Preparing the answer layer
                    <span className="system-gradient-text block">
                        before the system clarifies the path.
                    </span>
                </h1>

                <p className="mt-6 max-w-4xl text-base leading-8 text-slate-300 sm:text-lg">
                    This route is loading the answer structure so the business can read clear
                    explanations about the system, the plan sequence, and the right next move
                    without getting dropped into a weak or broken transition.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                    <AuthorityPill>Clear questions</AuthorityPill>
                    <AuthorityPill>Clear route logic</AuthorityPill>
                    <AuthorityPill>Clear next-step decisions</AuthorityPill>
                </div>
            </section>

            <section className="relative z-10 mt-16 grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
                <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8 md:p-10">
                    <TopChip>Route meaning</TopChip>

                    <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The system is loading the answers that help prevent the wrong next decision.
                    </h2>

                    <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
                        The FAQ page matters because it helps businesses understand the system
                        without confusion. It answers the practical questions that usually show up
                        right before someone chooses the wrong layer too early.
                    </p>

                    <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">
                        This loading layer keeps the route stable while the answer structure is
                        prepared, so the page still feels controlled, deliberate, and trustworthy
                        instead of blank or uncertain.
                    </p>

                    <div className="mt-8">
                        <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.22em] text-slate-400">
                            <span>Answer route readiness</span>
                            <span>63%</span>
                        </div>

                        <div className="system-status-bar mt-2 h-2">
                            <span style={{ width: "63%" }} />
                        </div>
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                        <StatusTile label="System logic" value="Preparing" highlighted />
                        <StatusTile label="Plan answers" value="Loading" />
                        <StatusTile label="Next move" value="Becoming clearer" />
                    </div>
                </div>

                <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8">
                    <TopChip>Best path</TopChip>

                    <div className="mt-6 grid gap-4">
                        {pathCards.map((item, index) => (
                            <div
                                key={item.title}
                                className={
                                    index === 0
                                        ? "system-chip rounded-[1.35rem] p-5"
                                        : "system-surface rounded-[1.35rem] p-5"
                                }
                            >
                                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
                                    {item.step}
                                </div>
                                <div className="mt-2 text-2xl font-semibold text-white">{item.title}</div>
                                <div className="mt-1 text-sm text-slate-400">{item.subtitle}</div>
                            </div>
                        ))}
                    </div>

                    <div className="system-surface mt-4 rounded-[1.35rem] p-5">
                        <div className="text-sm font-semibold text-white">Loading rule</div>
                        <p className="mt-2 text-sm leading-7 text-slate-300">
                            The page is preparing answers that help the business understand the
                            route before it mistakes explanation, optimization, and continuity
                            for the same thing.
                        </p>
                    </div>
                </div>
            </section>

            <section className="relative z-10 mt-20">
                <div className="max-w-3xl">
                    <TopChip>Answer group preview</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The route is preparing the main question groups.
                    </h2>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2">
                    {faqPreviewGroups.map((group, index) => (
                        <LoadingFaqGroupCard
                            key={group.title}
                            eyebrow={group.eyebrow}
                            title={group.title}
                            copy={group.copy}
                            highlighted={index === 0}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}

function FaqLoadingAtmosphere() {
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

function LoadingFaqGroupCard({
    eyebrow,
    title,
    copy,
    highlighted = false,
}: {
    eyebrow: string;
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
                {eyebrow}
            </div>

            <div className="mt-3 text-2xl font-semibold text-white">{title}</div>

            <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>

            <div className="mt-6 space-y-3">
                <SkeletonLine wide />
                <SkeletonLine />
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
