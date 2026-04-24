import type { ReactNode } from "react";

export default function FreeCheckLoadingPage() {
    return (
        <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 text-white sm:px-6 md:py-16 xl:py-20">
            <FreeCheckLoadingAtmosphere />

            <section className="relative z-10 grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
                <div>
                    <TopChip>Search Presence Scan loading</TopChip>

                    <h1 className="system-hero-title mt-5 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
                        Preparing the intake route
                        <span className="system-gradient-text block">
                            before the system asks for signal.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                        The intake layer is loading so the business can enter the system
                        through a controlled, usable, high-signal path instead of a weak or
                        broken transition.
                    </p>

                    <div className="mt-8 grid gap-3 sm:grid-cols-3">
                        <AuthorityPill>Identity layer</AuthorityPill>
                        <AuthorityPill>Context layer</AuthorityPill>
                        <AuthorityPill>Pressure layer</AuthorityPill>
                    </div>

                    <div className="system-panel-authority mt-8 rounded-[1.8rem] p-5 sm:p-6">
                        <p className="system-eyebrow">Why this route matters</p>
                        <h2 className="mt-4 text-2xl font-semibold text-white">
                            The search presence scan is the first serious filter in the system.
                        </h2>
                        <p className="mt-4 text-sm leading-7 text-slate-300">
                            It is built to capture enough real business signal to show whether
                            the business likely needs deeper diagnosis or a lighter next move.
                            That is why the intake route is treated like a serious operating
                            layer, not like a throwaway form.
                        </p>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                            <GuideTile label="Route state" value="Preparing intake sequence" />
                            <GuideTile label="System goal" value="Protect signal quality" />
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 rounded-[2rem] bg-cyan-400/10 blur-3xl" />

                    <div className="system-panel-authority relative rounded-[2rem] p-5 sm:p-6">
                        <div className="system-grid-wide absolute inset-0 opacity-[0.08]" />
                        <div className="system-scan-line pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />

                        <div className="relative z-10">
                            <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                    <div className="system-chip inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
                                        <span className="system-pulse-dot inline-flex h-2 w-2 rounded-full bg-cyan-300" />
                                        Intake booting
                                    </div>

                                    <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                                        Begin diagnostic sequence
                                    </h2>

                                    <p className="mt-2 max-w-xl text-sm leading-7 text-slate-300">
                                        The route is preparing the guided intake so identity, market
                                        context, and pressure details load into a cleaner sequence.
                                    </p>
                                </div>

                                <StageBadge />
                            </div>

                            <div className="mt-6">
                                <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.22em] text-slate-400">
                                    <span>Signal readiness</span>
                                    <span>58%</span>
                                </div>

                                <div className="system-status-bar mt-2 h-2">
                                    <span style={{ width: "58%" }} />
                                </div>
                            </div>

                            <div className="mt-6 grid gap-4 md:grid-cols-2">
                                <SkeletonField
                                    label="Full name"
                                    helper="Main business contact"
                                />
                                <SkeletonField
                                    label="Business email"
                                    helper="Valid business email required"
                                />
                            </div>

                            <div className="mt-4 grid gap-4 md:grid-cols-2">
                                <SkeletonField
                                    label="Business name"
                                    helper="Customer-facing business identity"
                                />
                                <SkeletonField
                                    label="Website URL"
                                    helper="Primary business site"
                                />
                            </div>

                            <div className="system-surface mt-6 rounded-[1.4rem] p-4">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">
                                    Route meaning
                                </p>
                                <p className="mt-2 text-sm leading-7 text-slate-300">
                                    This is a loading state, not a failure state. The system is
                                    preparing the intake environment so the business enters through
                                    a stronger first step.
                                </p>
                            </div>

                            <div className="mt-6 grid gap-3 sm:grid-cols-4">
                                <StatusTile label="Identity lane" value="Preparing" />
                                <StatusTile label="Contact lane" value="Preparing" />
                                <StatusTile label="Detail layer" value="Queued" />
                                <StatusTile label="Next move" value="Intake readying" highlighted />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

function FreeCheckLoadingAtmosphere() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="system-orb-a absolute -left-10 top-8 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl sm:h-96 sm:w-96" />
            <div className="system-orb-b absolute -right-8 top-28 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl sm:h-80 sm:w-80" />
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
        <div className="system-surface hidden min-w-[116px] rounded-[1.6rem] px-4 py-4 text-center sm:block">
            <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
                Stage
            </div>
            <div className="mt-2 text-xl font-semibold leading-none text-white">1</div>
            <div className="mt-1 text-sm font-medium text-slate-300">of 3</div>
        </div>
    );
}

function SkeletonField({
    label,
    helper,
}: {
    label: string;
    helper: string;
}) {
    return (
        <div className="block">
            <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                {label}
            </span>
            <div className="system-surface h-[58px] rounded-[1rem] px-4 py-4">
                <div className="h-full w-full animate-pulse rounded-md bg-white/[0.05]" />
            </div>
            <span className="system-helper mt-2 block">{helper}</span>
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
