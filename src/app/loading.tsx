import Link from "next/link";
import type { ReactNode } from "react";

const BRAND_NAME = "Cendorq";
const CATEGORY_LINE = "Search Presence OS";

const ROUTE_READOUTS = [
    {
        label: "System state",
        value: "Preparing route",
    },
    {
        label: "Loading bias",
        value: "Clarity before instability",
    },
    {
        label: "Fallback posture",
        value: "Stay inside the path",
    },
    {
        label: "Recovery rule",
        value: "Use the cleanest route",
    },
] as const;

const LOADING_REASONS = [
    {
        title: "The current page is still resolving the route cleanly.",
        copy:
            "That usually means the route, layout, data dependency, or page-state handoff is still assembling before the final view becomes stable enough to render properly.",
    },
    {
        title: "A controlled loading state is stronger than a broken partial render.",
        copy:
            "The platform should prefer a deliberate system hold over a weak half-loaded experience that creates confusion, breaks trust, or suggests the page is ready before it really is.",
    },
    {
        title: "The strongest fallback is still a structured route inside the platform.",
        copy:
            "If a page takes too long, the homepage, Search Presence Scan, Diagnosis, and Pricing routes remain the safest recovery lanes because they preserve the system path instead of forcing random navigation.",
    },
] as const;

const LOADING_RULES = [
    {
        title: "Hold briefly before abandoning the route.",
        copy:
            "Many route-level holds resolve cleanly after a short delay. The strongest first response is patience, not immediate route chaos.",
    },
    {
        title: "If the route keeps stalling, reset into the cleanest system page.",
        copy:
            "The homepage or Search Presence Scan usually provides the strongest reset because both routes preserve sequence and clarity without forcing a guess.",
    },
    {
        title: "Do not let a loading delay collapse the system path.",
        copy:
            "A slow page does not change which layer the business should use. The sequence is still strongest when the user recovers into the right route instead of wandering through unrelated pages.",
    },
] as const;

const INTERNAL_STEPS = [
    {
        step: "01",
        title: "Route resolving",
        copy:
            "The route, layout, and dependent view state are still assembling the current page.",
    },
    {
        step: "02",
        title: "System guard active",
        copy:
            "A controlled hold is being shown so the user does not get a weak partial page that looks finished before it actually is.",
    },
    {
        step: "03",
        title: "Clean handoff pending",
        copy:
            "Once the route is ready, the page should resolve into the correct system layer without forcing extra user decisions or unstable transitions.",
    },
] as const;

const RECOVERY_OPTIONS = [
    {
        label: "Strongest restart lane",
        title: "Start Search Presence Scan",
        copy:
            "If the goal is to begin the system properly, the strongest structured fallback is usually the first serious signal layer.",
        href: "/free-check",
        cta: "Start Search Presence Scan",
        highlighted: true,
    },
    {
        label: "Reset route",
        title: "Return to homepage",
        copy:
            "The homepage restores the broadest clean context and makes it easier to re-enter the platform without losing sequence.",
        href: "/",
        cta: "Go to homepage",
    },
    {
        label: "Review path logic",
        title: "See how the system works",
        copy:
            "If the user was deciding between layers, Diagnosis is the cleanest route for understanding the sequence before choosing deeper depth.",
        href: "/diagnosis",
        cta: "See how it works",
    },
    {
        label: "Compare all layers",
        title: "Review system layers",
        copy:
            "If the user was trying to reach a specific offer layer, Pricing remains the strongest side-by-side route comparison page.",
        href: "/pricing",
        cta: "View system layers",
    },
] as const;

export default function GlobalLoadingPage() {
    return (
        <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 text-white sm:px-6 md:py-16 xl:py-20">
            <LoadingAtmosphere />

            <section className="relative z-10 border-b border-white/8 pb-10">
                <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                    <span className="system-chip rounded-full px-3 py-1.5 text-cyan-200">
                        {BRAND_NAME}
                    </span>
                    <span className="text-white/20">/</span>
                    <span className="text-white/70">{CATEGORY_LINE}</span>
                    <span className="text-white/20">/</span>
                    <span className="text-cyan-100">Loading</span>
                </div>
            </section>

            <section className="relative z-10 grid gap-10 pt-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-start">
                <div>
                    <TopChip>Loading state</TopChip>

                    <h1 className="system-hero-title mt-5 max-w-5xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
                        This route is still preparing
                        <span className="system-gradient-text block">
                            a clean system view for the page.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                        {BRAND_NAME} is holding a controlled loading state while the current
                        route finishes resolving. That is stronger than exposing a weak partial
                        render that looks usable before the page is actually ready.
                    </p>

                    <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                        The strongest posture here is simple: hold briefly, preserve sequence,
                        and return to the cleanest route only if the page keeps failing to
                        resolve properly.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <AuthorityPill>Controlled loading</AuthorityPill>
                        <AuthorityPill>Clarity first</AuthorityPill>
                        <AuthorityPill>No weak partial state</AuthorityPill>
                    </div>

                    <div className="system-panel-authority mt-8 rounded-[1.8rem] p-5 sm:p-6">
                        <p className="system-eyebrow">Primary reading rule</p>

                        <h2 className="mt-4 text-2xl font-semibold text-white">
                            A structured loading hold is better than a page pretending it is ready.
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                            This route exists to protect trust. If the page still needs route,
                            layout, or data resolution, the platform should hold the experience
                            cleanly instead of producing a misleading half-render that weakens
                            confidence and damages the path.
                        </p>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                            <GuideTile
                                label="Primary objective"
                                value="Preserve a clean route before final render"
                            />
                            <GuideTile
                                label="Main failure avoided"
                                value="A weak partial page that looks finished too early"
                            />
                        </div>
                    </div>

                    <div className="mt-8 grid gap-4">
                        {LOADING_REASONS.map((item, index) => (
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
                                <TopChip>Loading posture</TopChip>

                                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                                    The route is being held cleanly until the page is stable enough to resolve.
                                </h2>

                                <p className="mt-5 text-base leading-8 text-slate-300">
                                    This loading page should not feel like a generic wait screen. It
                                    should communicate that the system is intentionally preventing an
                                    unstable or misleading render while the route finishes assembling.
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
                                <span>Route preparation</span>
                                <span>In progress</span>
                            </div>

                            <div className="system-status-bar mt-2 h-2">
                                <span style={{ width: "74%" }} />
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                        <StatusTile label="Route" value="Resolving" highlighted />
                        <StatusTile label="Render" value="Held cleanly" />
                        <StatusTile label="Fallback" value="Structured" />
                    </div>

                    <div
                        className="system-surface rounded-[1.7rem] p-6"
                        role="status"
                        aria-live="polite"
                        aria-busy="true"
                    >
                        <div className="flex items-center justify-between gap-4">
                            <p className="system-eyebrow">Live preparation sequence</p>
                            <span className="rounded-full border border-cyan-300/15 bg-cyan-300/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-100">
                                Controlled hold
                            </span>
                        </div>

                        <div className="mt-4 grid gap-4">
                            {INTERNAL_STEPS.map((item, index) => (
                                <SequenceRow
                                    key={item.step}
                                    step={item.step}
                                    title={item.title}
                                    copy={item.copy}
                                    highlighted={index === 0}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="system-surface rounded-[1.7rem] p-6">
                        <p className="system-eyebrow">Visual state</p>

                        <div className="mt-4 grid gap-3">
                            <SkeletonBlock tall />
                            <SkeletonBlock />
                            <SkeletonBlock />
                            <SkeletonBlock />
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative z-10 mt-20 grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
                <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8 md:p-10">
                    <TopChip>Loading rules</TopChip>

                    <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The route stays strongest when delay does not break the system path.
                    </h2>

                    <div className="mt-8 grid gap-4">
                        {LOADING_RULES.map((item, index) => (
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
                            label={option.label}
                            title={option.title}
                            copy={option.copy}
                            href={option.href}
                            cta={option.cta}
                            highlighted={index === 0}
                        />
                    ))}
                </div>
            </section>

            <section className="relative z-10 mt-20">
                <div className="system-panel-authority rounded-[2rem] p-6 text-center sm:p-8 md:p-10">
                    <TopChip>Best next move</TopChip>

                    <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Hold briefly, then recover into the cleanest route if needed.
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-300">
                        If the page still does not resolve, the strongest fallback is usually
                        the homepage, Search Presence Scan, Diagnosis, or the system-layers
                        view. Those routes restore structure without forcing random navigation
                        after a loading delay.
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

function LoadingAtmosphere() {
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

function SequenceRow({
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
                    ? "system-chip rounded-[1.35rem] p-4"
                    : "system-surface rounded-[1.35rem] p-4"
            }
        >
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
                Step {step}
            </div>
            <h3 className="mt-2 text-lg font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-300">{copy}</p>
        </div>
    );
}

function SkeletonBlock({ tall = false }: { tall?: boolean }) {
    return (
        <div
            className={[
                "system-surface animate-pulse rounded-[1.2rem]",
                tall ? "h-28" : "h-16",
            ].join(" ")}
            aria-hidden="true"
        />
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
