import {
    buildBreadcrumbJsonLd,
    buildFaqJsonLd,
    buildMetadata,
    buildOrganizationJsonLd,
    buildServiceJsonLd,
    buildWebPageJsonLd,
    buildWebsiteJsonLd,
    toJsonLd,
} from "@/lib/seo";
import Link from "next/link";
import type { ReactNode } from "react";

const BRAND_NAME = "Cendorq";
const CATEGORY_LINE = "Search Presence OS";

export const metadata = buildMetadata({
    title: "How Cendorq Works",
    description:
        "See how Cendorq moves from first signal to strategic explanation, infrastructure strengthening, and ongoing command so businesses do not buy the wrong visibility layer too early.",
    path: "/diagnosis",
    keywords: [
        "how cendorq works",
        "search presence os process",
        "search presence scan",
        "visibility blueprint",
        "presence infrastructure",
        "presence command",
        "ai search visibility process",
        "answer engine visibility system",
        "business visibility operating system",
        "search presence sequence",
    ],
    image: {
        alt: "Cendorq How It Works page — the Search Presence OS path from first signal to strategic explanation, infrastructure strengthening, and ongoing command.",
    },
});

const HERO_READOUTS = [
    {
        label: "Entry layer",
        value: "Search Presence Scan",
    },
    {
        label: "Strategy layer",
        value: "Visibility Blueprint",
    },
    {
        label: "Build layer",
        value: "Presence Infrastructure",
    },
    {
        label: "Operating layer",
        value: "Presence Command",
    },
] as const;

const WHY_THIS_EXISTS = [
    {
        title: "Because businesses often buy the wrong help too early.",
        copy:
            "Many businesses move straight into louder execution, bigger retainers, or broader service packages before they have a clean read on what is actually weakening visibility and response.",
    },
    {
        title: "Because evolving search punishes weak sequencing.",
        copy:
            "As traditional search, AI search, answer engines, reviews, maps, and supporting sources keep changing, weak sequencing becomes more expensive instead of less expensive.",
    },
    {
        title: "Because the strongest next move depends on the real stage of the business.",
        copy:
            "Some businesses need first signal. Some need strategic explanation. Some need infrastructure. Some need ongoing command. The system exists to separate those stages clearly.",
    },
] as const;

const SYSTEM_PATH = [
    {
        step: "01",
        label: "First serious signal",
        title: "Search Presence Scan",
        copy:
            "The business enters through a structured first-read layer so Cendorq can begin assessing trust, clarity, positioning, action structure, and visibility weakness before deeper work is recommended.",
        emphasis:
            "Best when the business still needs a cleaner first signal more than it needs heavier strategic or implementation depth.",
        href: "/free-check",
        cta: "Start Search Presence Scan",
        highlighted: true,
    },
    {
        step: "02",
        label: "Strategic explanation",
        title: "Visibility Blueprint",
        copy:
            "If the business needs a more serious explanation of what is weakening search presence, preference, answer inclusion, and conversion readiness, the path moves into the deeper strategy layer.",
        emphasis:
            "Best when first signal alone is not enough to create confident next-step clarity.",
        href: "/pricing/full-diagnosis",
        cta: "View Visibility Blueprint",
    },
    {
        step: "03",
        label: "Build the system",
        title: "Presence Infrastructure",
        copy:
            "Once the business is clearer, concentrated implementation can strengthen the structural systems that support stronger search presence instead of applying broader force without enough directional confidence.",
        emphasis:
            "Best after the business already knows what deserves concentrated structural work first.",
        href: "/pricing/optimization",
        cta: "View Presence Infrastructure",
    },
    {
        step: "04",
        label: "Run the operating layer",
        title: "Presence Command",
        copy:
            "If the business needs ongoing monitoring, adaptation, maintenance, and strategic continuity after the path is already clearer, Presence Command becomes the correct recurring layer.",
        emphasis:
            "Best when the business already has enough clarity to benefit from sustained compounding direction over time.",
        href: "/pricing/monthly-partner",
        cta: "View Presence Command",
    },
] as const;

const WHAT_THE_SYSTEM_READS = [
    {
        label: "Trust",
        title: "Does the business look easier to doubt than it should be?",
        copy:
            "Cendorq looks for signals that make a real business feel less credible, less current, less authoritative, or less safe to choose than its actual value deserves.",
    },
    {
        label: "Clarity",
        title: "Do people understand the business fast enough to keep moving?",
        copy:
            "If people do not quickly understand what the business is, who it serves, and why it matters, strong opportunities often collapse before serious intent can form.",
    },
    {
        label: "Positioning",
        title: "Does the business stand apart or blur into alternatives?",
        copy:
            "Weak differentiation makes even strong businesses easier to compare away, easier to commoditize, and easier to replace with something less valuable but easier to read.",
    },
    {
        label: "Action",
        title: "Is the structure helping movement or creating hesitation?",
        copy:
            "The system looks for friction that slows contact, delays decisions, weakens next-step confidence, or causes people to leave before the right action happens.",
    },
] as const;

const STAGE_DECISIONS = [
    {
        label: "Need first signal",
        title: "Stay with Search Presence Scan",
        copy:
            "Use this when the business still needs a stronger first read before deeper depth makes sense. The goal here is not more pressure. It is a cleaner interpretation baseline.",
        bestFor:
            "Businesses that know something feels weak but still cannot tell where the real pressure is sitting.",
        href: "/free-check",
        cta: "Start scan",
        highlighted: true,
    },
    {
        label: "Need deeper explanation",
        title: "Move into Visibility Blueprint",
        copy:
            "Use this when the business already knows first signal is not enough and needs sharper interpretation of what is weakening search presence, answer inclusion, preference, and response.",
        bestFor:
            "Businesses that have enough initial signal already, but still do not have strong enough explanation to direct serious build pressure cleanly.",
        href: "/pricing/full-diagnosis",
        cta: "View blueprint",
    },
    {
        label: "Need concentrated strengthening",
        title: "Move into Presence Infrastructure",
        copy:
            "Use this when the path is already clear enough to justify one serious structural strengthening pass instead of more abstract discussion.",
        bestFor:
            "Businesses that already know what deserves concentrated work and do not need to keep solving a sequence problem first.",
        href: "/pricing/optimization",
        cta: "View infrastructure",
    },
    {
        label: "Need recurring continuity",
        title: "Move into Presence Command",
        copy:
            "Use this when the business is already clear enough for ongoing adaptation, maintenance, monitoring, and compounding direction over time.",
        bestFor:
            "Businesses that are no longer trying to discover the right layer and are ready to operate it continuously.",
        href: "/pricing/monthly-partner",
        cta: "View command",
    },
] as const;

const SEQUENCE_MISFIRES = [
    {
        title: "Buying the loudest-looking layer first.",
        copy:
            "A heavier-looking step is not automatically the stronger next move. The stronger move is the one that matches the business’s actual stage of clarity.",
    },
    {
        title: "Using stronger force before the business is understood clearly enough.",
        copy:
            "Concentrated pressure becomes more valuable after the business is clearer, not before. Otherwise the wrong weakness often gets reinforced faster.",
    },
    {
        title: "Asking continuity to solve what sequence should have solved first.",
        copy:
            "Presence Command works best after first signal, explanation, and one-time strengthening have already made the path more stable.",
    },
] as const;

const FIT_SUMMARY = [
    "Businesses that know something feels weak but cannot yet identify where the real pressure is sitting.",
    "Businesses that have already spent on activity but still feel like the market is reading them incorrectly.",
    "Businesses deciding whether they need first signal, strategic explanation, infrastructure work, or ongoing command.",
    "Businesses that want a cleaner, more structured path instead of vague overlapping services.",
] as const;

const NOT_FIT = [
    "Businesses looking for fake certainty or guaranteed market outcomes.",
    "Businesses trying to skip directly into heavier work without first clarifying what layer they actually need.",
    "Businesses expecting every route to automatically include every layer at once.",
    "Businesses treating the system like a vague bundle instead of a sequenced operating path.",
] as const;

const TRUST_RULES = [
    {
        label: "No fake guarantees",
        value:
            "Cendorq is built to improve decision quality, visibility control, and next-step reasoning, not to guarantee rankings, leads, revenue, or total control over search systems.",
    },
    {
        label: "Clear path boundaries",
        value:
            "Each layer exists for a reason. The route is stronger when scan, blueprint, infrastructure, and command are not confused with each other.",
    },
    {
        label: "Decision-quality first",
        value:
            "The system is designed to help the business choose the right next move with better reasoning before stronger commitments are made.",
    },
    {
        label: "Structure over guesswork",
        value:
            "The platform is intentionally sequenced to reduce random escalation into the wrong layer.",
    },
] as const;

const FAQS = [
    {
        question: "When should a business start with Search Presence Scan?",
        answer:
            "Start there when the business still needs a cleaner first read more than it needs heavier strategic or implementation depth. It is the right opening layer when the real visibility bottleneck is still not clear enough.",
    },
    {
        question: "When should a business move into Visibility Blueprint?",
        answer:
            "Move into Visibility Blueprint when first signal is no longer enough and the business needs a deeper explanation of what is weakening search presence, preference, answer inclusion, and conversion readiness.",
    },
    {
        question: "Why not jump straight into infrastructure or a recurring plan?",
        answer:
            "Because heavier force aimed at the wrong weakness usually compounds waste. The system is sequenced so the business can earn directional clarity before concentrated build work or recurring command gets chosen.",
    },
    {
        question: "What is the strongest way to use this page?",
        answer:
            "Use it to understand which layer the business actually needs now, not which one merely sounds bigger or more impressive. The path is strongest when the right layer is chosen at the right time.",
    },
] as const;

const NEXT_MOVE_OPTIONS = [
    {
        title: "Start Search Presence Scan",
        copy:
            "Best when the business still needs a stronger first signal before it needs heavier strategic or implementation depth.",
        href: "/free-check",
        cta: "Start scan",
        highlighted: true,
    },
    {
        title: "Review full system layers",
        copy:
            "Best when the business already understands the path well enough to compare the deeper layers side by side.",
        href: "/pricing",
        cta: "View system",
    },
    {
        title: "Go to Visibility Blueprint",
        copy:
            "Best when the business already knows that first signal is not enough and needs a deeper strategic explanation now.",
        href: "/pricing/full-diagnosis",
        cta: "View blueprint",
    },
] as const;

const SEQUENCE_LOGIC = [
    {
        label: "Signal before escalation",
        title: "The system begins by reading the business before trying to overpower the problem.",
        copy:
            "That first read matters because businesses often mistake activity problems for interpretation problems. Cendorq is designed to separate those before deeper commitments get made.",
    },
    {
        label: "Explanation before concentration",
        title: "Heavier pressure becomes stronger after the business is understood more clearly.",
        copy:
            "That is why Visibility Blueprint exists between first signal and infrastructure. The platform is protecting against concentrated work aimed at the wrong weakness.",
    },
    {
        label: "Continuity after clarity",
        title: "Recurring command is strongest when it compounds a cleaner path instead of compensating for a confused one.",
        copy:
            "Presence Command is not the first answer to every problem. It is the correct answer when the business is already clear enough to benefit from sustained strategic continuity.",
    },
] as const;

const DECISION_SIGNALS = [
    {
        label: "Use Search Presence Scan when",
        value:
            "the business still needs a cleaner first read of what feels weak before it can confidently justify deeper strategy or build work.",
    },
    {
        label: "Use Visibility Blueprint when",
        value:
            "the business already knows it has a real visibility problem but needs stronger interpretation of what is suppressing search presence, preference, and response.",
    },
    {
        label: "Use Presence Infrastructure when",
        value:
            "the business is already clear enough to justify concentrated structural strengthening instead of more explanation.",
    },
    {
        label: "Use Presence Command when",
        value:
            "the business already has enough path clarity for recurring monitoring, maintenance, and compounding direction to create more value than more initial diagnosis.",
    },
] as const;

export default function DiagnosisPage() {
    const organizationJsonLd = buildOrganizationJsonLd();
    const websiteJsonLd = buildWebsiteJsonLd();

    const webPageJsonLd = buildWebPageJsonLd({
        title: `How ${BRAND_NAME} Works`,
        description:
            "See how Cendorq moves from first signal to strategic explanation, infrastructure strengthening, and ongoing command.",
        path: "/diagnosis",
    });

    const serviceJsonLd = buildServiceJsonLd({
        title: `${BRAND_NAME} System Path`,
        description:
            "A structured path from Search Presence Scan to Visibility Blueprint, Presence Infrastructure, and Presence Command based on what the business actually needs next.",
        path: "/diagnosis",
        serviceType: "Search Presence OS",
    });

    const breadcrumbJsonLd = buildBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "How It Works", path: "/diagnosis" },
    ]);

    const faqJsonLd = buildFaqJsonLd(FAQS);

    return (
        <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 text-white sm:px-6 md:py-16 xl:py-20">
            <DiagnosisAtmosphere />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: toJsonLd(organizationJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: toJsonLd(websiteJsonLd) }}
            />
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }}
            />

            <section className="relative z-10 border-b border-white/8 pb-10">
                <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                    <span className="system-chip rounded-full px-3 py-1.5 text-cyan-200">
                        {BRAND_NAME}
                    </span>
                    <span className="text-white/20">/</span>
                    <span className="text-white/70">{CATEGORY_LINE}</span>
                    <span className="text-white/20">/</span>
                    <span className="text-cyan-100">How it works</span>
                </div>
            </section>

            <section className="relative z-10 grid gap-10 pt-10 lg:grid-cols-[0.93fr_1.07fr] lg:items-start">
                <div>
                    <TopChip>How it works</TopChip>

                    <h1 className="system-hero-title mt-5 max-w-5xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
                        The system path is built
                        <span className="system-gradient-text block">
                            to stop businesses from choosing the wrong visibility layer too early.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                        {BRAND_NAME} is structured as a sequence, not a vague stack of
                        overlapping offers. It starts with a first serious signal, moves into
                        strategic explanation only when justified, then routes the business into
                        the correct build or recurring operating layer after the path is clearer.
                    </p>

                    <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                        That matters because many businesses do not only have an effort problem.
                        They often have a{" "}
                        <strong className="font-semibold text-white">reading problem</strong>.
                        The wrong weakness gets reinforced because the business buys the wrong
                        help before it understands what the market, search systems, and answer
                        surfaces are actually reacting to.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <AuthorityPill>Sequenced by need</AuthorityPill>
                        <AuthorityPill>Explanation before force</AuthorityPill>
                        <AuthorityPill>Clarity before escalation</AuthorityPill>
                    </div>

                    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
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

                    <div className="system-panel-authority mt-8 rounded-[1.8rem] p-5 sm:p-6">
                        <p className="system-eyebrow">What this page is really saying</p>

                        <h2 className="mt-4 text-2xl font-semibold text-white">
                            The strongest next move depends on what the business actually needs now.
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                            Some businesses need first signal. Some need strategic explanation.
                            Some need infrastructure work. Some need ongoing command. This page
                            exists to make those stages readable so the business does not skip over
                            the layer that would have created the cleanest decision first.
                        </p>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                            <GuideTile
                                label="Primary objective"
                                value="Route the business into the correct depth at the correct time"
                            />
                            <GuideTile
                                label="Main failure avoided"
                                value="Escalating into heavier work before the path is clear"
                            />
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 rounded-[2rem] bg-cyan-400/10 blur-3xl" />

                    <div className="system-panel-authority relative rounded-[2rem] p-5 sm:p-6 md:p-7">
                        <div className="system-grid-wide absolute inset-0 opacity-[0.08]" />
                        <div className="system-scan-line pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />

                        <div className="relative z-10">
                            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                                <div className="max-w-2xl">
                                    <div className="system-chip inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
                                        <span className="system-pulse-dot inline-flex h-2 w-2 rounded-full bg-cyan-300" />
                                        System sequencing active
                                    </div>

                                    <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                                        Read the business first. Then deepen, build, or command from
                                        the right layer.
                                    </h2>

                                    <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                                        The platform is strongest when the business does not confuse
                                        first signal with strategic explanation, infrastructure work,
                                        or recurring operating continuity. The path is designed to
                                        separate those clearly.
                                    </p>
                                </div>

                                <div className="grid min-w-0 gap-3 sm:grid-cols-2 lg:w-[22rem]">
                                    {HERO_READOUTS.map((item, index) => (
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
                                    <span>Path logic</span>
                                    <span>Signal before escalation</span>
                                </div>

                                <div className="system-status-bar mt-2 h-2">
                                    <span style={{ width: "88%" }} />
                                </div>
                            </div>

                            <div className="mt-6 grid gap-4 md:grid-cols-3">
                                {[
                                    {
                                        label: "Weak sequence",
                                        value: "Push harder first",
                                        copy:
                                            "Spend more, launch more, optimize more, and hope greater activity solves what has not yet been clearly understood.",
                                    },
                                    {
                                        label: "Stronger sequence",
                                        value: "Read the business first",
                                        copy:
                                            "Identify whether trust, clarity, positioning, action structure, or visibility-system weakness is the actual bottleneck before increasing force.",
                                    },
                                    {
                                        label: "Why it matters",
                                        value: "Wrong force compounds waste",
                                        copy:
                                            "More activity aimed at the wrong weakness often multiplies inefficiency instead of correcting the actual problem.",
                                    },
                                ].map((item, index) => (
                                    <ComparisonTile
                                        key={item.label}
                                        label={item.label}
                                        value={item.value}
                                        copy={item.copy}
                                        highlighted={index === 0}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative z-10 mt-20">
                <div className="max-w-3xl">
                    <TopChip>Why the system exists</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The system exists because many businesses are strengthening the wrong thing.
                    </h2>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-3">
                    {WHY_THIS_EXISTS.map((item, index) => (
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
                    <TopChip>Sequence logic</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The route is stronger because each layer protects the next one from being chosen too early.
                    </h2>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-3">
                    {SEQUENCE_LOGIC.map((item, index) => (
                        <ReasonCard
                            key={item.title}
                            title={item.title}
                            copy={item.copy}
                            highlighted={index === 0}
                            eyebrow={item.label}
                        />
                    ))}
                </div>
            </section>

            <section className="relative z-10 mt-20 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8 md:p-10">
                    <TopChip>System path</TopChip>

                    <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Four layers. Four different jobs. One cleaner sequence.
                    </h2>

                    <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
                        The route is not stronger because it is more complicated. It is
                        stronger because each layer has a distinct role and the business is
                        less likely to buy the wrong kind of help before it has earned enough
                        clarity to use the next layer properly.
                    </p>

                    <div className="mt-8 grid gap-4">
                        {SYSTEM_PATH.map((item, index) => (
                            <PathCard
                                key={item.step}
                                step={item.step}
                                label={item.label}
                                title={item.title}
                                copy={item.copy}
                                emphasis={item.emphasis}
                                href={item.href}
                                cta={item.cta}
                                highlighted={index === 0}
                            />
                        ))}
                    </div>
                </div>

                <div className="grid gap-4">
                    <div className="system-panel-authority rounded-[1.7rem] p-5">
                        <TopChip>Decision lanes</TopChip>

                        <div className="mt-5 grid gap-3">
                            {STAGE_DECISIONS.map((item, index) => (
                                <DecisionTile
                                    key={item.title}
                                    label={item.label}
                                    value={item.title}
                                    copy={item.copy}
                                    bestFor={item.bestFor}
                                    href={item.href}
                                    cta={item.cta}
                                    highlighted={index === 0}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="system-panel-authority rounded-[1.7rem] p-5">
                        <TopChip>Best fit</TopChip>

                        <div className="mt-5 grid gap-3">
                            {FIT_SUMMARY.map((item, index) => (
                                <FitRow key={item} value={item} highlighted={index === 0} />
                            ))}
                        </div>
                    </div>

                    <div className="system-surface rounded-[1.7rem] p-5">
                        <TopChip>Not for</TopChip>

                        <div className="mt-5 grid gap-3">
                            {NOT_FIT.map((item, index) => (
                                <FitRow key={item} value={item} highlighted={index === 0} muted />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative z-10 mt-20">
                <div className="max-w-3xl">
                    <TopChip>What the system reads</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Every layer is built around the same four core business pressures.
                    </h2>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {WHAT_THE_SYSTEM_READS.map((item, index) => (
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

            <section className="relative z-10 mt-20 grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
                <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8 md:p-10">
                    <TopChip>Sequence warnings</TopChip>

                    <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Most wrong next moves come from sequence mistakes before they come from effort problems.
                    </h2>

                    <div className="mt-8 grid gap-4">
                        {SEQUENCE_MISFIRES.map((item, index) => (
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
                    {TRUST_RULES.map((item, index) => (
                        <TrustTile
                            key={item.label}
                            label={item.label}
                            value={item.value}
                            highlighted={index === 0}
                        />
                    ))}

                    <InfoPanel
                        title="What the platform does"
                        copy="It improves the quality of the next visibility decision by making the path from first signal to deeper action more readable."
                        highlighted
                    />
                    <InfoPanel
                        title="What the platform does not do"
                        copy="It does not promise guaranteed rankings, guaranteed leads, guaranteed revenue, or total control over external search and market behavior."
                    />
                </div>
            </section>

            <section className="relative z-10 mt-20">
                <div className="max-w-3xl">
                    <TopChip>Decision signals</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The strongest layer usually becomes obvious when the business asks the right question.
                    </h2>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2">
                    {DECISION_SIGNALS.map((item, index) => (
                        <TrustTile
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
                    <TopChip>Practical questions</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The strongest route becomes easier to follow when the path answers practical questions clearly.
                    </h2>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2">
                    {FAQS.map((item, index) => (
                        <FaqCard
                            key={item.question}
                            question={item.question}
                            answer={item.answer}
                            highlighted={index === 0}
                        />
                    ))}
                </div>
            </section>

            <section className="relative z-10 mt-20">
                <div className="max-w-3xl">
                    <TopChip>Best next moves</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Choose the layer the business actually needs now.
                    </h2>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-3">
                    {NEXT_MOVE_OPTIONS.map((item, index) => (
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
                        Start with first signal unless the business already clearly needs strategic explanation.
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-300">
                        If the business still needs a cleaner first read, begin with the Search
                        Presence Scan. If it already knows it needs a deeper explanation of what
                        is actually weakening visibility and response, move into the Visibility
                        Blueprint. The key is not choosing the biggest-looking step first. The
                        key is choosing the right one.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                        <Link
                            href="/free-check"
                            className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
                        >
                            Start Search Presence Scan
                        </Link>
                        <Link
                            href="/pricing/full-diagnosis"
                            className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
                        >
                            View Visibility Blueprint
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

function DiagnosisAtmosphere() {
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
            <div className="mt-2 text-base font-semibold leading-6 text-white">
                {value}
            </div>
        </div>
    );
}

function ComparisonTile({
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
        <article
            className={
                highlighted
                    ? "system-chip rounded-[1.45rem] p-5"
                    : "system-surface rounded-[1.45rem] p-5"
            }
        >
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
                {label}
            </div>
            <h3 className="mt-3 text-xl font-semibold text-white">{value}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>
        </article>
    );
}

function ReasonCard({
    title,
    copy,
    highlighted = false,
    eyebrow,
}: {
    title: string;
    copy: string;
    highlighted?: boolean;
    eyebrow?: string;
}) {
    return (
        <article
            className={
                highlighted
                    ? "system-panel-authority rounded-[1.7rem] p-6"
                    : "system-surface rounded-[1.7rem] p-6"
            }
        >
            {eyebrow ? (
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
                    {eyebrow}
                </div>
            ) : null}
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                {title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">{copy}</p>
        </article>
    );
}

function PathCard({
    step,
    label,
    title,
    copy,
    emphasis,
    href,
    cta,
    highlighted = false,
}: {
    step: string;
    label: string;
    title: string;
    copy: string;
    emphasis: string;
    href: string;
    cta: string;
    highlighted?: boolean;
}) {
    return (
        <article
            className={
                highlighted
                    ? "system-chip rounded-[1.75rem] p-5"
                    : "system-surface rounded-[1.75rem] p-5"
            }
        >
            <div className="flex items-center justify-between gap-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
                    Step {step}
                </div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                    {label}
                </div>
            </div>

            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                {title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>

            <div className="system-surface mt-4 rounded-[1.1rem] p-4">
                <p className="text-sm leading-7 text-slate-200">{emphasis}</p>
            </div>

            <div className="mt-5">
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

function DecisionTile({
    label,
    value,
    copy,
    bestFor,
    href,
    cta,
    highlighted = false,
}: {
    label: string;
    value: string;
    copy: string;
    bestFor: string;
    href: string;
    cta: string;
    highlighted?: boolean;
}) {
    return (
        <article
            className={
                highlighted
                    ? "system-chip rounded-[1.4rem] p-4"
                    : "system-surface rounded-[1.4rem] p-4"
            }
        >
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
                {label}
            </div>
            <h3 className="mt-2 text-lg font-semibold text-white">{value}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-300">{copy}</p>
            <div className="system-surface mt-4 rounded-[1rem] p-3">
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                    Best for
                </div>
                <div className="mt-2 text-sm leading-7 text-slate-200">{bestFor}</div>
            </div>
            <div className="mt-4">
                <Link
                    href={href}
                    className={
                        highlighted
                            ? "system-button-primary inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition"
                            : "system-button-secondary inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition"
                    }
                >
                    {cta}
                </Link>
            </div>
        </article>
    );
}

function FitRow({
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

function TrustTile({
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

function FaqCard({
    question,
    answer,
    highlighted = false,
}: {
    question: string;
    answer: string;
    highlighted?: boolean;
}) {
    return (
        <article
            className={
                highlighted
                    ? "system-panel-authority rounded-[1.7rem] p-5"
                    : "system-surface rounded-[1.7rem] p-5"
            }
        >
            <h3 className="text-2xl font-semibold tracking-tight text-white">
                {question}
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">{answer}</p>
        </article>
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
