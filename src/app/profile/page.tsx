import {
    buildBreadcrumbJsonLd,
    buildMetadata,
    buildServiceJsonLd,
    buildWebPageJsonLd,
    toJsonLd,
} from "@/lib/seo";
import Link from "next/link";
import type { ReactNode } from "react";

const BRAND_NAME = "Cendorq";
const CATEGORY_LINE = "Search Presence OS";

export const metadata = buildMetadata({
    title: "Profile",
    description:
        "Read the Cendorq platform profile, operating doctrine, trust posture, system philosophy, and structured sequence behind the Search Presence OS.",
    path: "/profile",
    keywords: [
        "cendorq profile",
        "cendorq company profile",
        "search presence os philosophy",
        "cendorq doctrine",
        "search presence operating system profile",
        "trust clarity positioning action framework",
        "search presence sequence",
        "business visibility doctrine",
        "cendorq operating posture",
    ],
    imageAlt:
        "Cendorq profile page — platform doctrine, operating posture, identity, and trust boundaries.",
});

const READOUTS = [
    {
        label: "Primary role",
        value: "Search Presence OS",
    },
    {
        label: "Primary bias",
        value: "Clarity before pressure",
    },
    {
        label: "System structure",
        value: "Signal, blueprint, infrastructure, command",
    },
    {
        label: "Trust posture",
        value: "Explicit and reality-first",
    },
] as const;

const CORE_BELIEFS = [
    {
        title: "Most businesses do not only have an effort problem.",
        copy:
            "They often have a reading problem. The market is interpreting the business through weaker trust, weaker clarity, weaker positioning, or weaker action structure than the business realizes.",
    },
    {
        title: "The wrong next move compounds waste.",
        copy:
            "When a business spends harder into the wrong weakness, it usually does not only lose money. It also loses time, momentum, confidence, and decision quality.",
    },
    {
        title: "A stronger read can matter more than louder motion.",
        copy:
            "Better interpretation often improves the next decision more than another rushed campaign, another vague redesign, or another force increase without clearer direction.",
    },
] as const;

const OPERATING_PILLARS = [
    {
        label: "Signal first",
        title: "Start with the cleanest first read possible.",
        copy:
            "The system begins by raising the quality of the first signal instead of pretending the business should immediately jump into the heaviest layer.",
    },
    {
        label: "Explanation before force",
        title: "Do not strengthen what is not yet understood.",
        copy:
            "The platform is designed to resist concentrated pressure until the business is clear enough to justify where that pressure should go.",
    },
    {
        label: "Bounded scope",
        title: "Each layer has a clear role.",
        copy:
            "Search Presence Scan, Visibility Blueprint, Presence Infrastructure, and Presence Command are intentionally separated so the business can understand what each layer is for.",
    },
    {
        label: "Reality over inflated claims",
        title: "Trust rises when false certainty is removed.",
        copy:
            "Cendorq is built to improve judgment and next-step quality, not to make dishonest promises about guarantees no serious system can control.",
    },
] as const;

const WHAT_CENDORQ_IS = [
    "A structured Search Presence OS.",
    "A platform designed to improve how a business is read before stronger effort gets applied.",
    "A cleaner route from first signal to deeper explanation, one-time strengthening, and recurring continuity.",
    "A strategic system for improving next-step judgment instead of escalating randomly.",
] as const;

const WHAT_CENDORQ_IS_NOT = [
    "Not a vague stack of interchangeable services.",
    "Not a guarantee engine for rankings, leads, revenue, or outside market behavior.",
    "Not a pressure-first system that sells the heaviest step before the business is ready.",
    "Not a substitute for clear boundaries, disciplined sequencing, or serious business reasoning.",
] as const;

const PLATFORM_PRESSURES = [
    {
        label: "Trust",
        title: "How believable, current, serious, and credible the business feels.",
        copy:
            "The platform reads whether the business is being received as more doubtful than it deserves, even if the actual operator or offer is strong.",
    },
    {
        label: "Clarity",
        title: "How quickly the business becomes understandable.",
        copy:
            "The platform reads whether people can understand what the business does, who it is for, why it matters, and what they should do next.",
    },
    {
        label: "Positioning",
        title: "How distinctly the business stands in the field.",
        copy:
            "The platform reads whether the business feels too generic, too comparable, or too easy to replace with alternatives that are simpler to read.",
    },
    {
        label: "Action",
        title: "How cleanly the business turns interest into movement.",
        copy:
            "The platform reads whether the path into contact, inquiry, booking, purchase, or response is helping momentum or causing hesitation.",
    },
] as const;

const COMPANY_FIT = [
    {
        title:
            "Best for businesses that know something feels weak but want a cleaner read before escalating.",
        copy:
            "The strongest fit is a business that wants stronger judgment, stronger sequencing, and a more disciplined route into deeper action.",
    },
    {
        title:
            "Best for businesses that care about trust and decision quality, not just surface-level activity.",
        copy:
            "The platform is a strong fit when the business wants to understand where market interpretation may be distorting performance before doing more for its own sake.",
    },
    {
        title:
            "Best for businesses willing to value clarity, boundaries, and sequence.",
        copy:
            "Cendorq works best when the business understands that not every stage should be collapsed into one vague offer or one vague expectation.",
    },
] as const;

const COMPANY_NOT_FOR = [
    "Businesses looking for fake certainty instead of stronger judgment.",
    "Businesses expecting every layer to automatically include every other layer.",
    "Businesses that want the heaviest-looking option before the path is clear enough to justify it.",
    "Businesses that prefer service blur over explicit structure and disciplined sequencing.",
] as const;

const TRUST_BOUNDARIES = [
    {
        label: "What the platform does",
        value: "Improve the quality of the next business decision.",
    },
    {
        label: "What the platform does not do",
        value:
            "Promise guaranteed market outcomes or certainty that no serious system can honestly guarantee.",
    },
    {
        label: "What makes the system stronger",
        value:
            "Explicit sequencing, explicit boundaries, stronger signal quality, and sharper interpretation.",
    },
    {
        label: "What keeps trust intact",
        value:
            "Clear roles for each layer and a reality-first posture around claims and outcomes.",
    },
] as const;

const SEQUENCE_MAP = [
    {
        step: "01",
        title: "Search Presence Scan",
        copy:
            "The system begins with first signal when the business needs a cleaner read before deeper paid depth is justified.",
        href: "/free-check",
        cta: "Start Search Presence Scan",
        highlighted: true,
    },
    {
        step: "02",
        title: "Visibility Blueprint",
        copy:
            "The path deepens into stronger explanation when the business needs a clearer interpretation of what may actually be weakening response.",
        href: "/pricing/full-diagnosis",
        cta: "View Visibility Blueprint",
    },
    {
        step: "03",
        title: "Presence Infrastructure",
        copy:
            "The path moves into concentrated one-time strengthening when the business is clear enough to justify stronger pressure in the right places.",
        href: "/pricing/optimization",
        cta: "View Presence Infrastructure",
    },
    {
        step: "04",
        title: "Presence Command",
        copy:
            "The path moves into recurring continuity when the business is already clear enough to benefit from ongoing compounding direction.",
        href: "/pricing/monthly-partner",
        cta: "View Presence Command",
    },
] as const;

const IDENTITY_RULES = [
    {
        title: "Cendorq should read like a system, not a service blur.",
        copy:
            "A system has sequence, boundaries, operating logic, and role clarity. That identity makes the platform easier to trust and easier to use correctly.",
    },
    {
        title:
            "Cendorq should read like a decision-quality company, not a noise company.",
        copy:
            "Its core value is not more random motion. Its core value is improving what the business understands, chooses, and strengthens next.",
    },
    {
        title:
            "Cendorq should read like a serious business layer inside evolving search.",
        copy:
            "The platform exists because visibility, preference, and answer inclusion now depend on more than traditional ranking tactics alone.",
    },
] as const;

const PROFILE_ASSERTIONS = [
    {
        title: "The company is built around sequence.",
        copy:
            "That means the platform gets stronger when signal, explanation, implementation, and continuity are kept distinct enough to be chosen correctly.",
    },
    {
        title: "The company is built around interpretation.",
        copy:
            "Its core advantage is helping the business understand what may be getting misread before stronger effort hardens the wrong weakness.",
    },
    {
        title: "The company is built around trust through boundaries.",
        copy:
            "Serious businesses become easier to trust when they are explicit about what they do, what they do not do, and where each layer begins and ends.",
    },
] as const;

export default function ProfilePage() {
    const webPageJsonLd = buildWebPageJsonLd({
        title: `${BRAND_NAME} Profile`,
        description:
            "The platform doctrine, trust posture, operating philosophy, and system structure behind Cendorq.",
        path: "/profile",
    });

    const serviceJsonLd = buildServiceJsonLd({
        title: `${BRAND_NAME} Platform Profile`,
        description:
            "A structured Search Presence OS designed to improve interpretation, sequencing, and next-step judgment.",
        path: "/profile",
    });

    const breadcrumbJsonLd = buildBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Profile", path: "/profile" },
    ]);

    return (
        <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 text-white sm:px-6 md:py-16 xl:py-20">
            <ProfileAtmosphere />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: toJsonLd(serviceJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }}
            />

            <section className="relative z-10 border-b border-white/8 pb-10">
                <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                    <span className="system-chip rounded-full px-3 py-1.5 text-cyan-200">
                        {BRAND_NAME}
                    </span>
                    <span className="text-white/20">/</span>
                    <span className="text-white/70">{CATEGORY_LINE}</span>
                    <span className="text-white/20">/</span>
                    <span className="text-cyan-100">Profile</span>
                </div>
            </section>

            <section className="relative z-10 grid gap-10 pt-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-start">
                <div>
                    <TopChip>Profile</TopChip>

                    <h1 className="system-hero-title mt-5 max-w-5xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
                        Cendorq is built
                        <span className="system-gradient-text block">
                            to improve how a business gets read before stronger pressure begins.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                        {BRAND_NAME} is a Search Presence OS. Its role is not to overwhelm the
                        business with louder motion. Its role is to improve how the business is
                        being interpreted so the next move becomes cleaner, sharper, and less
                        likely to reinforce the wrong weakness.
                    </p>

                    <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                        The platform is structured around four recurring business pressures:
                        <strong className="font-semibold text-white"> trust</strong>,
                        <strong className="font-semibold text-white"> clarity</strong>,
                        <strong className="font-semibold text-white"> positioning</strong>, and
                        <strong className="font-semibold text-white"> action</strong>. The
                        system exists because those pressures often distort response before the
                        business fully realizes where the distortion is happening.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <AuthorityPill>Search Presence OS</AuthorityPill>
                        <AuthorityPill>Decision-quality first</AuthorityPill>
                        <AuthorityPill>Reality-first trust posture</AuthorityPill>
                    </div>

                    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                        <Link
                            href="/free-check"
                            className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
                        >
                            Start Search Presence Scan
                        </Link>
                        <Link
                            href="/diagnosis"
                            className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
                        >
                            See how it works
                        </Link>
                    </div>

                    <div className="system-panel-authority mt-8 rounded-[1.8rem] p-5 sm:p-6">
                        <p className="system-eyebrow">Platform doctrine</p>

                        <h2 className="mt-4 text-2xl font-semibold text-white">
                            The platform is strongest when it improves interpretation before it increases force.
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                            {BRAND_NAME} exists because many businesses do not need louder effort
                            first. They need a stronger understanding of what the market may be
                            reading weakly first. Better sequence often creates a better outcome
                            than bigger activity applied too early.
                        </p>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                            <GuideTile
                                label="Primary objective"
                                value="Improve the quality of the next business decision"
                            />
                            <GuideTile
                                label="Main failure avoided"
                                value="Escalating effort into the wrong weakness"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid gap-4">
                    <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                            <div className="max-w-2xl">
                                <TopChip>Operating posture</TopChip>

                                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                                    The system is designed to make the business easier to understand, not just easier to market loudly.
                                </h2>

                                <p className="mt-5 text-base leading-8 text-slate-300">
                                    That means the platform is intentionally structured, intentionally
                                    bounded, and intentionally sequenced. It is not trying to be all
                                    things at once. It is trying to create a better path through first
                                    signal, deeper explanation, strengthening, and continuity.
                                </p>
                            </div>

                            <div className="grid min-w-0 gap-3 sm:grid-cols-2 lg:w-[21rem]">
                                {READOUTS.map((item, index) => (
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
                        <StatusTile label="Bias" value="Signal-first" highlighted />
                        <StatusTile label="Scope" value="Structured" />
                        <StatusTile label="Claims" value="Reality-first" />
                    </div>

                    <div className="system-surface rounded-[1.7rem] p-6">
                        <p className="system-eyebrow">Best reading rule</p>
                        <p className="mt-4 text-base leading-8 text-slate-300">
                            Treat {BRAND_NAME} as a decision-quality system, not a pressure-first
                            service stack. The platform is meant to improve sequence, not bypass it.
                        </p>
                    </div>

                    <div className="system-surface rounded-[1.7rem] p-6">
                        <p className="system-eyebrow">Identity posture</p>
                        <div className="mt-4 grid gap-4">
                            {PROFILE_ASSERTIONS.map((item, index) => (
                                <MiniAssertionCard
                                    key={item.title}
                                    title={item.title}
                                    copy={item.copy}
                                    highlighted={index === 0}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative z-10 mt-20">
                <div className="max-w-3xl">
                    <TopChip>Core beliefs</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The platform is built on a few strong beliefs about how businesses actually get weakened.
                    </h2>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-3">
                    {CORE_BELIEFS.map((item, index) => (
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
                    <TopChip>Operating pillars</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The system is held together by explicit operating rules.
                    </h2>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {OPERATING_PILLARS.map((item, index) => (
                        <PillarCard
                            key={item.label}
                            label={item.label}
                            title={item.title}
                            copy={item.copy}
                            highlighted={index === 0}
                        />
                    ))}
                </div>
            </section>

            <section className="relative z-10 mt-20 grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
                <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8 md:p-10">
                    <TopChip>What Cendorq is</TopChip>

                    <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The platform becomes easier to trust when its identity stays precise.
                    </h2>

                    <div className="mt-8 grid gap-3">
                        {WHAT_CENDORQ_IS.map((item, index) => (
                            <IdentityRow key={item} value={item} highlighted={index === 0} />
                        ))}
                    </div>

                    <div className="mt-8 border-t border-white/8 pt-8">
                        <TopChip>What Cendorq is not</TopChip>

                        <div className="mt-5 grid gap-3">
                            {WHAT_CENDORQ_IS_NOT.map((item, index) => (
                                <IdentityRow
                                    key={item}
                                    value={item}
                                    muted
                                    highlighted={index === 0}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid gap-4">
                    {COMPANY_FIT.map((item, index) => (
                        <InfoPanel
                            key={item.title}
                            title={item.title}
                            copy={item.copy}
                            highlighted={index === 0}
                        />
                    ))}

                    <div className="system-surface rounded-[1.6rem] p-5">
                        <p className="system-eyebrow">Not for</p>
                        <div className="mt-4 grid gap-3">
                            {COMPANY_NOT_FOR.map((item, index) => (
                                <IdentityRow
                                    key={item}
                                    value={item}
                                    muted
                                    highlighted={index === 0}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative z-10 mt-20">
                <div className="max-w-3xl">
                    <TopChip>Core platform pressures</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The system is designed around the four pressures that most often distort business response.
                    </h2>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {PLATFORM_PRESSURES.map((item, index) => (
                        <PressureCard
                            key={item.label}
                            label={item.label}
                            title={item.title}
                            copy={item.copy}
                            highlighted={index === 0}
                        />
                    ))}
                </div>
            </section>

            <section className="relative z-10 mt-20 grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
                <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8 md:p-10">
                    <TopChip>Identity rules</TopChip>

                    <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The company profile should reinforce how the system is supposed to be understood.
                    </h2>

                    <div className="mt-8 grid gap-4">
                        {IDENTITY_RULES.map((item, index) => (
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
                    <InfoPanel
                        title="What the profile should communicate"
                        copy="That Cendorq is a structured operating system for business visibility and search presence, not a louder generic marketing wrapper."
                        highlighted
                    />
                    <InfoPanel
                        title="What the profile should stop"
                        copy="Misreading the company as a random services bundle, a guarantee engine, or a pressure-first business that escalates before clarity exists."
                    />
                    <InfoPanel
                        title="What creates the strongest impression"
                        copy="Precision, boundaries, sequence, and a reality-first explanation of what the platform is actually designed to do."
                    />
                </div>
            </section>

            <section className="relative z-10 mt-20 grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
                <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8 md:p-10">
                    <TopChip>System sequence</TopChip>

                    <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The platform is not one vague offer. It is one coherent route.
                    </h2>

                    <div className="mt-8 grid gap-4">
                        {SEQUENCE_MAP.map((item, index) => (
                            <SequenceCard
                                key={item.step}
                                step={item.step}
                                title={item.title}
                                copy={item.copy}
                                href={item.href}
                                cta={item.cta}
                                highlighted={index === 0}
                            />
                        ))}
                    </div>
                </div>

                <div className="grid gap-4">
                    {TRUST_BOUNDARIES.map((item, index) => (
                        <BoundaryTile
                            key={item.label}
                            label={item.label}
                            value={item.value}
                            highlighted={index === 0}
                        />
                    ))}

                    <div className="system-note-warning rounded-[1.5rem] p-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-200">
                            Important boundary
                        </p>
                        <p className="mt-3 text-sm leading-7 text-slate-200">
                            {BRAND_NAME} improves judgment, sequencing, and business clarity. It
                            does not honestly guarantee rankings, leads, revenue, or total
                            market control, and it does not pretend that uncertainty disappears.
                        </p>
                    </div>
                </div>
            </section>

            <section className="relative z-10 mt-20">
                <div className="system-panel-authority rounded-[2rem] p-6 text-center sm:p-8 md:p-10">
                    <TopChip>Best next move</TopChip>

                    <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Start with the first serious signal unless the business already clearly needs deeper depth.
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-300">
                        The cleanest way into the system is usually through Search Presence Scan,
                        because it raises the first signal before the business escalates into
                        deeper explanation, one-time strengthening, or recurring continuity.
                        The platform works best when the route stays disciplined.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
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
                            View full system path
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

function ProfileAtmosphere() {
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

function MiniAssertionCard({
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
                    ? "system-chip rounded-[1.4rem] p-4"
                    : "system-surface rounded-[1.4rem] p-4"
            }
        >
            <h3 className="text-base font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-300">{copy}</p>
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
            <h3 className="text-2xl font-semibold tracking-tight text-white">{title}</h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">{copy}</p>
        </article>
    );
}

function PillarCard({
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

function IdentityRow({
    value,
    highlighted = false,
    muted = false,
}: {
    value: string;
    highlighted?: boolean;
    muted?: boolean;
}) {
    return (
        <div
            className={
                highlighted
                    ? "system-chip rounded-[1.2rem] px-4 py-4 text-sm text-slate-100"
                    : muted
                        ? "system-surface rounded-[1.2rem] px-4 py-4 text-sm text-slate-300"
                        : "system-surface rounded-[1.2rem] px-4 py-4 text-sm text-slate-200"
            }
        >
            {value}
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
                    ? "system-panel-authority rounded-[1.6rem] p-5"
                    : "system-surface rounded-[1.6rem] p-5"
            }
        >
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>
        </article>
    );
}

function PressureCard({
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

function SequenceCard({
    step,
    title,
    copy,
    href,
    cta,
    highlighted = false,
}: {
    step: string;
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
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
                Step {step}
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