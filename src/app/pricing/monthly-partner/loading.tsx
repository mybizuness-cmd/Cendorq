import { buildMetadata, buildServiceJsonLd, buildWebPageJsonLd, toJsonLd } from "@/lib/seo";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata = buildMetadata({
    title: "Presence Command",
    description:
        "Cendorq Presence Command is the recurring strategic continuity layer for businesses that already have enough clarity to benefit from ongoing refinement, sharper pressure, and compounding direction over time.",
    path: "/pricing/monthly-partner",
    keywords: [
        "monthly strategic partner",
        "cendorq presence command",
        "business strategic continuity",
        "ongoing business optimization support",
        "monthly business partner service",
        "business visibility continuity",
    ],
    imageAlt:
        "Cendorq Presence Command page — recurring strategic continuity after the path is already clear enough to compound.",
});

const readouts = [
    {
        label: "Price",
        value: "$1,500 per month",
    },
    {
        label: "Primary role",
        value: "Recurring strategic continuity",
    },
    {
        label: "Best timing",
        value: "After clarity, after stronger direction, before drift returns",
    },
    {
        label: "Main outcome",
        value: "Compounding refinement over time",
    },
] as const;

const whyItExists = [
    {
        title: "Because some businesses do not need one more isolated move. They need continuity.",
        copy:
            "A business can reach a clearer state and still lose momentum later if no one keeps the strategic pressure aligned, monitored, and refined over time.",
    },
    {
        title: "Because clarity decays when it is not maintained.",
        copy:
            "Even after diagnosis or one-time strengthening, businesses can drift back into weaker signal, weaker discipline, and weaker execution sequence if the path is not kept coherent.",
    },
    {
        title: "Because recurring continuity is different from recurring activity.",
        copy:
            "Presence Command is not endless noise. It is meant to provide sustained strategic direction after the business is already clear enough to compound from it.",
    },
] as const;

const continuityLenses = [
    {
        label: "Trust",
        title: "Sustain and refine the signals that make the business easier to believe.",
        copy:
            "Monthly continuity helps prevent the business from sliding back into weaker credibility, weaker authority, weaker seriousness, or weaker perceived stability over time.",
    },
    {
        label: "Clarity",
        title: "Keep the business readable as the business evolves.",
        copy:
            "As offers, priorities, and audience pressures shift, continuity helps keep explanation, structure, and message sequence clean enough to stay understandable.",
    },
    {
        label: "Positioning",
        title: "Keep the business distinct as the field changes around it.",
        copy:
            "Continuity helps prevent the business from drifting back into genericness or becoming easier to compare away as competitors and alternatives keep moving too.",
    },
    {
        label: "Action",
        title: "Keep the path into movement strong instead of letting friction rebuild.",
        copy:
            "Monthly direction helps keep the conversion path, response path, and next-step structure from quietly weakening again after earlier gains were made.",
    },
] as const;

const whatYouReceive = [
    {
        title: "Recurring strategic continuity",
        copy:
            "This layer is designed to keep the business moving with ongoing judgment, ongoing refinement, and cleaner long-range direction after the path is already strong enough to support compounding work.",
    },
    {
        title: "A sustained pressure layer instead of a single isolated pass",
        copy:
            "Presence Command exists for businesses that benefit more from maintained strategic alignment over time than from one more disconnected one-time push.",
    },
    {
        title: "Cleaner business discipline",
        copy:
            "Continuity helps the business keep making better decisions instead of slipping back into reactive moves, misaligned priorities, or scattered execution.",
    },
    {
        title: "A stronger compounding surface",
        copy:
            "The point is not constant busyness. The point is to let the business compound from stronger interpretation, stronger sequencing, and stronger pressure over time.",
    },
] as const;

const continuitySequence = [
    {
        step: "01",
        title: "Start from a business state that is already clearer",
        copy:
            "Monthly continuity works best after first signal, diagnosis, or one-time strengthening has already made the path more readable than it was before.",
    },
    {
        step: "02",
        title: "Sustain strategic direction instead of resetting every month",
        copy:
            "The value comes from keeping the path coherent over time rather than re-solving the same foundational confusion from the beginning again and again.",
    },
    {
        step: "03",
        title: "Refine what needs refinement while protecting what already got stronger",
        copy:
            "Continuity is not only about pushing forward. It is also about preventing backslide in trust, clarity, positioning, and action where progress has already been earned.",
    },
    {
        step: "04",
        title: "Compound the business more intelligently over time",
        copy:
            "The end state is a business that keeps getting stronger without constantly losing direction, sequence, or interpretive discipline.",
    },
] as const;

const bestFor = [
    "Businesses that already have enough clarity to benefit from ongoing strategic direction instead of another isolated one-time move.",
    "Businesses that want monthly continuity after diagnosis or optimization has made the highest-priority path clearer.",
    "Businesses that need sustained refinement rather than repeated reactive resets.",
    "Businesses that understand continuity is valuable only when the business is already clear enough to compound from it.",
] as const;

const notFor = [
    "Businesses that still need first signal more than recurring continuity.",
    "Businesses that still need diagnosis because the real pressure is not yet clear enough to sustain monthly direction well.",
    "Businesses expecting unlimited undefined execution inside a strategic continuity layer.",
    "Businesses looking for guaranteed outcomes or false certainty instead of stronger judgment over time.",
] as const;

const whyThisMatters = [
    {
        title: "Because one strong month is not the same as sustained strategic quality.",
        copy:
            "A business can have one sharp pass and still weaken later if no continuity exists to protect the gains, refine the path, and keep priorities aligned.",
    },
    {
        title: "Because compounding is stronger than repeated restarting.",
        copy:
            "Monthly continuity becomes valuable when it helps the business build from a stronger state instead of repeatedly drifting back into confusion, hesitation, or generic execution.",
    },
    {
        title: "Because ongoing direction reduces strategic waste over time.",
        copy:
            "The point is not endless monthly activity. The point is to reduce drift, improve decision quality, and maintain stronger pressure where it continues to matter.",
    },
] as const;

const nextMoveOptions = [
    {
        title: "Stay with Presence Command",
        copy:
            "Use this when the business is already clear enough to benefit from sustained strategic continuity and ongoing refinement over time.",
        href: "/contact",
        cta: "Contact about Presence Command",
        highlighted: true,
    },
    {
        title: "Presence Infrastructure first",
        copy:
            "If the business still needs a serious one-time strengthening pass before recurring continuity makes sense, go into Presence Infrastructure first.",
        href: "/pricing/optimization",
        cta: "View optimization",
    },
    {
        title: "Diagnosis first",
        copy:
            "If the business still needs stronger explanation before anyone can responsibly maintain monthly direction, go back to Visibility Blueprint first.",
        href: "/pricing/full-diagnosis",
        cta: "See Visibility Blueprint",
    },
] as const;

const boundaries = [
    {
        label: "What this is for",
        value: "Recurring strategic continuity after the business is already clear enough to compound",
    },
    {
        label: "What this is not for",
        value: "Guaranteed outcomes, undefined unlimited execution, or a substitute for missing clarity",
    },
    {
        label: "What it improves most",
        value: "Ongoing decision quality, alignment, and compounding direction",
    },
    {
        label: "When it is strongest",
        value: "After diagnosis or optimization has already strengthened the path",
    },
] as const;

export default function MonthlyPartnerPage() {
    const webPageJsonLd = buildWebPageJsonLd({
        title: "Cendorq Presence Command",
        description:
            "A recurring strategic continuity layer for businesses that already have enough clarity to benefit from ongoing refinement and compounding direction.",
        path: "/pricing/monthly-partner",
    });

    const serviceJsonLd = buildServiceJsonLd({
        title: "Cendorq Presence Command",
        description:
            "A monthly continuity layer that helps sustain and refine trust, clarity, positioning, and action after the business is already clear enough to compound well.",
        path: "/pricing/monthly-partner",
    });

    return (
        <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 text-white sm:px-6 md:py-16 xl:py-20">
            <MonthlyPartnerAtmosphere />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: toJsonLd(serviceJsonLd) }}
            />

            <section className="relative z-10 grid gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-start">
                <div>
                    <TopChip>Presence Command</TopChip>

                    <h1 className="system-hero-title mt-5 max-w-5xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
                        Recurring strategic continuity
                        <span className="system-gradient-text block">
                            after the business is clear enough to compound.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                        Presence Command is the recurring continuity layer inside Cendorq.
                        It is designed for businesses that already have enough clarity to
                        benefit from ongoing refinement of{" "}
                        <strong className="font-semibold text-white">trust</strong>,{" "}
                        <strong className="font-semibold text-white">clarity</strong>,{" "}
                        <strong className="font-semibold text-white">positioning</strong>, and{" "}
                        <strong className="font-semibold text-white">action</strong> over time.
                    </p>

                    <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                        This is not the first-signal layer, not the diagnosis layer, and not
                        the one-time strengthening layer. It is the stage where the business
                        is ready to compound from ongoing strategic direction instead of
                        restarting from confusion every month.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <AuthorityPill>Recurring continuity</AuthorityPill>
                        <AuthorityPill>Compounding refinement</AuthorityPill>
                        <AuthorityPill>Ongoing strategic direction</AuthorityPill>
                    </div>

                    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                        <Link
                            href="/contact"
                            className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
                        >
                            Contact about Presence Command
                        </Link>
                        <Link
                            href="/pricing/optimization"
                            className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
                        >
                            See optimization
                        </Link>
                    </div>

                    <div className="system-panel-authority mt-8 rounded-[1.8rem] p-5 sm:p-6">
                        <p className="system-eyebrow">What this layer is really for</p>

                        <h2 className="mt-4 text-2xl font-semibold text-white">
                            It is built to keep the business strategically aligned after clarity already exists.
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                            A serious continuity layer should not exist just to stay busy every
                            month. It should exist to keep the business from drifting back into
                            weaker signal, weaker judgment, weaker sequence, and weaker
                            strategic discipline after the path has already been clarified.
                        </p>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                            <GuideTile
                                label="Primary objective"
                                value="Maintain and compound strategic strength over time"
                            />
                            <GuideTile
                                label="Main failure avoided"
                                value="Losing clarity after earlier progress was already earned"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid gap-4">
                    <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                            <div className="max-w-2xl">
                                <TopChip>Continuity posture</TopChip>

                                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                                    The business should keep getting sharper instead of resetting back into drift.
                                </h2>

                                <p className="mt-5 text-base leading-8 text-slate-300">
                                    That is why Presence Command exists as its own layer. It protects
                                    the business from treating continuity like vague activity and
                                    instead uses ongoing strategic direction to preserve gains,
                                    refine priorities, and compound from a stronger state.
                                </p>
                            </div>

                            <div className="grid min-w-0 gap-3 sm:grid-cols-2 lg:w-[21rem]">
                                {readouts.map((item, index) => (
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
                        <StatusTile label="Layer type" value="Continuity" highlighted />
                        <StatusTile label="Scope type" value="Monthly" />
                        <StatusTile label="Best timing" value="After clarity" />
                    </div>

                    <div className="system-surface rounded-[1.7rem] p-6">
                        <p className="system-eyebrow">Best reading rule</p>
                        <p className="mt-4 text-base leading-8 text-slate-300">
                            Use Presence Command when the business already has enough strategic
                            clarity to benefit from ongoing refinement and does not need to
                            restart from first signal or deeper explanation again.
                        </p>
                    </div>
                </div>
            </section>

            <section className="relative z-10 mt-20">
                <div className="max-w-3xl">
                    <TopChip>Core continuity lenses</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Monthly continuity keeps refining the same four pressures that shape how the business gets read.
                    </h2>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {continuityLenses.map((lens, index) => (
                        <LensCard
                            key={lens.label}
                            label={lens.label}
                            title={lens.title}
                            copy={lens.copy}
                            highlighted={index === 0}
                        />
                    ))}
                </div>
            </section>

            <section className="relative z-10 mt-20 grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
                <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8 md:p-10">
                    <TopChip>What you receive</TopChip>

                    <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        This layer should leave the business compounding more intelligently, not just doing more every month.
                    </h2>

                    <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
                        Presence Command is meant to turn clarity into sustained strategic
                        refinement. It should keep the business aligned, reduce drift, and
                        preserve stronger business quality over time instead of letting gains
                        fade after a single sharp pass.
                    </p>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        {whatYouReceive.map((item, index) => (
                            <ReceiveCard
                                key={item.title}
                                title={item.title}
                                copy={item.copy}
                                highlighted={index === 0}
                            />
                        ))}
                    </div>
                </div>

                <div className="grid gap-4">
                    {whyThisMatters.map((item, index) => (
                        <ReasonCard
                            key={item.title}
                            title={item.title}
                            copy={item.copy}
                            highlighted={index === 0}
                        />
                    ))}
                </div>
            </section>

            <section className="relative z-10 mt-20">
                <div className="max-w-3xl">
                    <TopChip>Continuity sequence</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The continuity layer compounds by maintaining strategic coherence month after month.
                    </h2>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {continuitySequence.map((item, index) => (
                        <SequenceCard
                            key={item.step}
                            step={item.step}
                            title={item.title}
                            copy={item.copy}
                            highlighted={index === 0}
                        />
                    ))}
                </div>
            </section>

            <section className="relative z-10 mt-20 grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
                <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8 md:p-10">
                    <TopChip>Fit clarity</TopChip>

                    <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        This layer is strongest when the business is ready to compound instead of restart.
                    </h2>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        <FitCard title="Best for" items={bestFor} highlighted />
                        <FitCard title="Not for" items={notFor} />
                    </div>

                    <div className="system-note-warning mt-8 rounded-[1.5rem] p-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-200">
                            Important boundary
                        </p>
                        <p className="mt-3 text-sm leading-7 text-slate-200">
                            Presence Command is a recurring strategic continuity layer. It is
                            not a substitute for missing first signal, missing diagnosis, or
                            missing one-time strengthening where those are still the cleaner
                            next moves.
                        </p>
                    </div>
                </div>

                <div className="grid gap-4">
                    {boundaries.map((item, index) => (
                        <BoundaryTile
                            key={item.label}
                            label={item.label}
                            value={item.value}
                            highlighted={index === 0}
                        />
                    ))}
                </div>
            </section>

            <section className="relative z-10 mt-20">
                <div className="max-w-3xl">
                    <TopChip>Next move options</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Monthly continuity only works well when the business is already clear enough to support it.
                    </h2>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-3">
                    {nextMoveOptions.map((item, index) => (
                        <NextMoveCard
                            key={item.title}
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
                        Use Presence Command when the business is ready for ongoing strategic continuity.
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-300">
                        If the business already has enough clarity and now benefits most from
                        sustained refinement, Presence Command is the correct layer. If not,
                        go back to Presence Infrastructure or Visibility Blueprint first so continuity is not
                        being asked to carry work that should have been clarified earlier.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                        <Link
                            href="/contact"
                            className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
                        >
                            Contact about Presence Command
                        </Link>
                        <Link
                            href="/pricing/optimization"
                            className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
                        >
                            See optimization
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

function MonthlyPartnerAtmosphere() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-10 top-8 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl sm:h-96 sm:w-96" />
            <div className="absolute -right-8 top-28 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl sm:h-80 sm:w-80" />
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

function LensCard({
    label,
    title,
    copy,
    highlighted = false,
}: {
    label: string;
    title: string;
    copy: string;
    highlighted?: boolean;
}) {
    return (
        <article
            className={
                highlighted
                    ? "system-panel-authority rounded-[1.75rem] p-6"
                    : "system-surface rounded-[1.75rem] p-6"
            }
        >
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
                {label}
            </div>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                {title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">{copy}</p>
        </article>
    );
}

function ReceiveCard({
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
                    ? "system-chip rounded-[1.55rem] p-5"
                    : "system-surface rounded-[1.55rem] p-5"
            }
        >
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>
        </article>
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
                    ? "system-panel-authority rounded-[1.65rem] p-5"
                    : "system-surface rounded-[1.65rem] p-5"
            }
        >
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>
        </article>
    );
}

function SequenceCard({
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
        <article
            className={
                highlighted
                    ? "system-panel-authority rounded-[1.75rem] p-6"
                    : "system-surface rounded-[1.75rem] p-6"
            }
        >
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
                Step {step}
            </div>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                {title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">{copy}</p>
        </article>
    );
}

function FitCard({
    title,
    items,
    highlighted = false,
}: {
    title: string;
    items: readonly string[];
    highlighted?: boolean;
}) {
    return (
        <section
            className={
                highlighted
                    ? "system-chip rounded-[1.7rem] p-5"
                    : "system-surface rounded-[1.7rem] p-5"
            }
        >
            <h3 className="text-2xl font-semibold tracking-tight text-white">{title}</h3>
            <div className="mt-5 grid gap-3">
                {items.map((item) => (
                    <div
                        key={item}
                        className="rounded-[1.1rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm leading-7 text-slate-200"
                    >
                        {item}
                    </div>
                ))}
            </div>
        </section>
    );
}

function BoundaryTile({
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
                    ? "system-chip rounded-[1.45rem] p-5"
                    : "system-surface rounded-[1.45rem] p-5"
            }
        >
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                {label}
            </div>
            <div className="mt-3 text-base font-semibold leading-7 text-white">
                {value}
            </div>
        </div>
    );
}

function NextMoveCard({
    title,
    copy,
    href,
    cta,
    highlighted = false,
}: {
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
                    ? "system-panel-authority rounded-[1.8rem] p-6"
                    : "system-surface rounded-[1.8rem] p-6"
            }
        >
            <h3 className="text-2xl font-semibold tracking-tight text-white">
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
