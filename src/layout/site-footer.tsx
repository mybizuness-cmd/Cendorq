import Link from "next/link";
import type { ReactNode } from "react";

type FooterLinkItem = {
    label: string;
    href: string;
    description: string;
};

const BRAND_NAME = "Cendorq";
const CATEGORY_LINE = "Search Presence OS";

const SYSTEM_PATH_LINKS: readonly FooterLinkItem[] = [
    {
        label: "Search Presence Scan",
        href: "/free-check",
        description:
            "Start with the first serious signal before the business commits to the wrong next layer.",
    },
    {
        label: "How It Works",
        href: "/diagnosis",
        description:
            "Read the operating path before confusing signal, strategy, build, and command.",
    },
    {
        label: "System Layers",
        href: "/pricing",
        description:
            "Compare every layer side by side so the business chooses the correct depth.",
    },
    {
        label: "Profile",
        href: "/profile",
        description:
            "Read the platform doctrine, operating posture, and strategic philosophy.",
    },
] as const;

const LAYER_LINKS: readonly FooterLinkItem[] = [
    {
        label: "Visibility Blueprint",
        href: "/pricing/full-diagnosis",
        description:
            "Use strategic explanation when first signal alone is no longer enough.",
    },
    {
        label: "Presence Infrastructure",
        href: "/pricing/optimization",
        description:
            "Use concentrated build work once the path is clear enough.",
    },
    {
        label: "Presence Command",
        href: "/pricing/monthly-partner",
        description:
            "Use recurring command when the business is ready to maintain and compound from clarity.",
    },
    {
        label: "FAQ",
        href: "/faq",
        description:
            "Get explicit answers that protect against choosing the wrong layer too early.",
    },
] as const;

const TRUST_LINKS: readonly FooterLinkItem[] = [
    {
        label: "Contact",
        href: "/contact",
        description:
            "Use the right communication lane when the business already knows what it needs to ask.",
    },
    {
        label: "Privacy",
        href: "/privacy",
        description:
            "Read the data boundaries that support trust, signal quality, and system integrity.",
    },
    {
        label: "Terms",
        href: "/terms",
        description:
            "Understand service roles, scope logic, and commercial boundaries.",
    },
    {
        label: "Disclaimer",
        href: "/disclaimer",
        description:
            "Read the explicit claim boundaries around outcomes, certainty, and scope.",
    },
] as const;

const OPERATING_PILLARS = [
    "Signal first",
    "Explanation before force",
    "Infrastructure before scale",
    "Continuity as strategy",
] as const;

const FOOTER_READOUTS = [
    {
        label: "Primary role",
        value: "Search Presence OS",
        copy:
            "The platform exists to improve how the business is interpreted, chosen, and maintained across evolving search environments.",
    },
    {
        label: "Best first move",
        value: "Search Presence Scan",
        copy:
            "Most businesses benefit most from a stronger first signal before deeper strategy, implementation, or operating command.",
    },
    {
        label: "Core strategic layer",
        value: "Visibility Blueprint",
        copy:
            "The strategy layer becomes strongest when the business already knows first signal alone is not enough.",
    },
    {
        label: "Flagship recurring layer",
        value: "Presence Command",
        copy:
            "Command works best after the business is already clear enough to benefit from sustained compounding direction over time.",
    },
] as const;

const SYSTEM_NOTES = [
    {
        title: "What the platform is for",
        copy:
            "Cendorq is built to improve signal quality, search-presence strategy, system strength, and long-term visibility control.",
    },
    {
        title: "What the platform is not for",
        copy:
            "It is not built to sell the biggest-looking step first or promise guaranteed outcomes that no serious system can honestly control.",
    },
    {
        title: "Why the route is sequenced",
        copy:
            "Because the stronger move is often not louder pressure first. It is usually the cleaner read first, then the right layer second.",
    },
] as const;

const FOOTER_ROUTE_MAP = [
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
        description: "Concentrated strengthening",
    },
    {
        step: "04",
        title: "Presence Command",
        href: "/pricing/monthly-partner",
        description: "Recurring operating layer",
    },
] as const;

export function SiteFooter() {
    const year = new Date().getFullYear();

    return (
        <footer
            className="relative border-t border-white/6 bg-slate-950"
            aria-label="Site footer"
        >
            <FooterAtmosphere />

            <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 xl:py-20">
                <section className="grid gap-10 lg:grid-cols-[1.03fr_0.97fr] lg:items-start">
                    <div>
                        <TopChip>{BRAND_NAME}</TopChip>

                        <div className="mt-5">
                            <BrandLockup />
                        </div>

                        <h2 className="mt-6 max-w-5xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl xl:text-6xl">
                            Better visibility sequence
                            <span className="system-gradient-text block">
                                before stronger effort gets pointed at the wrong weakness.
                            </span>
                        </h2>

                        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                            {BRAND_NAME} is built to help businesses become the strongest answer
                            across evolving search environments, then stay there through
                            stronger signal, stronger strategy, stronger infrastructure, and
                            stronger ongoing command.
                        </p>

                        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                            The platform is intentionally structured as a route. It starts with
                            first signal, moves into deeper explanation when justified, then into
                            build or recurring command only when the business is actually ready
                            for those layers.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            {OPERATING_PILLARS.map((item) => (
                                <PillarChip key={item}>{item}</PillarChip>
                            ))}
                        </div>

                        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                            <Link
                                href="/free-check"
                                className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
                            >
                                Start Search Presence Scan
                            </Link>
                            <Link
                                href="/pricing"
                                className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
                            >
                                View full system
                            </Link>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {FOOTER_READOUTS.map((item, index) => (
                            <ReadoutCard
                                key={item.label}
                                label={item.label}
                                value={item.value}
                                copy={item.copy}
                                highlighted={index === 0}
                            />
                        ))}
                    </div>
                </section>

                <section className="mt-16">
                    <div className="max-w-3xl">
                        <TopChip>System route</TopChip>
                        <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                            The footer should still preserve the full platform sequence.
                        </h3>
                    </div>

                    <div className="mt-8 grid gap-4 xl:grid-cols-4">
                        {FOOTER_ROUTE_MAP.map((item, index) => (
                            <RouteMapCard
                                key={item.href}
                                step={item.step}
                                title={item.title}
                                description={item.description}
                                href={item.href}
                                highlighted={index === 0}
                            />
                        ))}
                    </div>
                </section>

                <section className="mt-16 grid gap-5 xl:grid-cols-3">
                    <FooterLinkGroup
                        eyebrow="System path"
                        title="Move through the route in the right order."
                        links={SYSTEM_PATH_LINKS}
                        highlighted
                    />
                    <FooterLinkGroup
                        eyebrow="System layers"
                        title="Choose the right layer, not the louder-looking one."
                        links={LAYER_LINKS}
                    />
                    <FooterLinkGroup
                        eyebrow="Trust boundaries"
                        title="Read the pages that protect trust and expectation clarity."
                        links={TRUST_LINKS}
                    />
                </section>

                <section className="mt-16 grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
                    <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8 md:p-10">
                        <TopChip>Footer doctrine</TopChip>

                        <h3 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                            Strong businesses do not always need more force first.
                            <span className="system-gradient-text block">
                                They often need a stronger read first.
                            </span>
                        </h3>

                        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
                            That is the operating logic behind {BRAND_NAME}. The platform is not
                            meant to behave like a vague stack of interchangeable services. It
                            is meant to behave like a controlled sequence that protects against
                            buying the wrong depth, the wrong build, or the wrong continuity
                            too early.
                        </p>

                        <div className="mt-8 grid gap-3 sm:grid-cols-3">
                            <MiniStatusTile
                                label="System posture"
                                value="Signal-first"
                                highlighted
                            />
                            <MiniStatusTile label="Trust posture" value="Explicit" />
                            <MiniStatusTile label="Claim posture" value="Reality-first" />
                        </div>
                    </div>

                    <div className="grid gap-4">
                        {SYSTEM_NOTES.map((item, index) => (
                            <InfoPanel
                                key={item.title}
                                title={item.title}
                                copy={item.copy}
                                highlighted={index === 0}
                            />
                        ))}
                    </div>
                </section>

                <section className="mt-16 border-t border-white/8 pt-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="text-sm leading-7 text-slate-400">
                            © {year} {BRAND_NAME}. All rights reserved.
                        </div>

                        <nav
                            aria-label="Footer utility navigation"
                            className="flex flex-wrap gap-3 text-sm text-slate-400"
                        >
                            <Link href="/privacy" className="transition hover:text-white">
                                Privacy
                            </Link>
                            <Link href="/terms" className="transition hover:text-white">
                                Terms
                            </Link>
                            <Link href="/disclaimer" className="transition hover:text-white">
                                Disclaimer
                            </Link>
                            <Link href="/contact" className="transition hover:text-white">
                                Contact
                            </Link>
                        </nav>
                    </div>
                </section>
            </div>
        </footer>
    );
}

function FooterAtmosphere() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-cyan-400/8 blur-3xl sm:h-96 sm:w-96" />
            <div className="absolute right-0 top-16 h-72 w-72 rounded-full bg-sky-400/8 blur-3xl sm:h-96 sm:w-96" />
            <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-300/6 blur-3xl sm:h-80 sm:w-80" />
            <div className="system-grid-wide absolute inset-0 opacity-[0.025]" />
        </div>
    );
}

function BrandLockup() {
    return (
        <div className="inline-flex items-center gap-4 rounded-[1.6rem] border border-white/10 bg-white/[0.035] px-4 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-sm">
            <BrandMark />
            <div className="min-w-0">
                <div className="text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">
                    {BRAND_NAME}
                </div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 sm:text-xs">
                    {CATEGORY_LINE}
                </div>
            </div>
        </div>
    );
}

function BrandMark() {
    return (
        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[1.15rem] border border-cyan-300/18 bg-slate-950 shadow-[0_16px_40px_rgba(0,0,0,0.24)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_24%,rgba(103,232,249,0.28),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]" />
            <div className="relative flex items-center gap-[4px]">
                <span className="h-4 w-1.5 rounded-full bg-cyan-200" />
                <span className="h-6 w-1.5 rounded-full bg-white" />
                <span className="h-3 w-1.5 rounded-full bg-indigo-200" />
            </div>
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

function PillarChip({ children }: { children: ReactNode }) {
    return (
        <div className="system-tag-strong rounded-full px-3 py-1.5 text-xs sm:text-sm">
            {children}
        </div>
    );
}

function ReadoutCard({
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
                    ? "system-panel-authority rounded-[1.6rem] p-5"
                    : "system-surface rounded-[1.6rem] p-5"
            }
        >
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                {label}
            </div>
            <div className="mt-3 text-2xl font-semibold tracking-tight text-white">
                {value}
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>
        </div>
    );
}

function RouteMapCard({
    step,
    title,
    description,
    href,
    highlighted = false,
}: {
    step: string;
    title: string;
    description: string;
    href: string;
    highlighted?: boolean;
}) {
    return (
        <Link
            href={href}
            className={
                highlighted
                    ? "system-panel-authority rounded-[1.6rem] p-5 transition hover:border-cyan-300/24"
                    : "system-surface rounded-[1.6rem] p-5 transition hover:border-cyan-300/24 hover:bg-white/[0.05]"
            }
        >
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
                Step {step}
            </div>
            <div className="mt-3 text-xl font-semibold tracking-tight text-white">
                {title}
            </div>
            <p className="mt-2 text-sm leading-7 text-slate-300">{description}</p>
        </Link>
    );
}

function FooterLinkGroup({
    eyebrow,
    title,
    links,
    highlighted = false,
}: {
    eyebrow: string;
    title: string;
    links: readonly FooterLinkItem[];
    highlighted?: boolean;
}) {
    return (
        <section
            className={
                highlighted
                    ? "system-panel-authority rounded-[1.9rem] p-6"
                    : "system-surface rounded-[1.9rem] p-6"
            }
        >
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
                {eyebrow}
            </div>

            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                {title}
            </h3>

            <div className="mt-6 grid gap-3">
                {links.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="rounded-[1.15rem] border border-white/10 bg-white/[0.03] px-4 py-4 transition hover:border-cyan-300/24 hover:bg-white/[0.05]"
                    >
                        <div className="text-base font-semibold text-white">{item.label}</div>
                        <div className="mt-1 text-sm leading-7 text-slate-300">
                            {item.description}
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}

function MiniStatusTile({
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
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                {label}
            </div>
            <div className="mt-2 text-sm font-semibold text-white">{value}</div>
        </div>
    );
}

function InfoPanel({
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
                    ? "system-panel-authority rounded-[1.65rem] p-5"
                    : "system-surface rounded-[1.65rem] p-5"
            }
        >
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>
        </article>
    );
}