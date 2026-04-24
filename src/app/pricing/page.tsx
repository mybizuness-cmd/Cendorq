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
    title: "System Layers",
    description:
        "Compare Search Presence Scan, Visibility Blueprint, Presence Infrastructure, and Presence Command so the business chooses the right Cendorq layer at the right time.",
    path: "/pricing",
    keywords: [
        "cendorq pricing",
        "search presence scan pricing",
        "visibility blueprint pricing",
        "presence infrastructure pricing",
        "presence command pricing",
        "search presence os pricing",
        "compare cendorq layers",
        "business visibility system pricing",
        "ai search visibility pricing",
        "answer engine visibility pricing",
    ],
    image: {
        alt: "Cendorq System Layers page — compare Search Presence Scan, Visibility Blueprint, Presence Infrastructure, and Presence Command.",
    },
});

type LayerKey =
    | "search-presence-scan"
    | "visibility-blueprint"
    | "presence-infrastructure"
    | "presence-command";

type LayerCard = Readonly<{
    key: LayerKey;
    eyebrow: string;
    title: string;
    strap: string;
    copy: string;
    bestFor: string;
    notFor: string;
    outcome: string;
    href: string;
    cta: string;
    highlighted?: boolean;
}>;

const HERO_READOUTS = [
    {
        label: "Layer 01",
        value: "Search Presence Scan",
    },
    {
        label: "Layer 02",
        value: "Visibility Blueprint",
    },
    {
        label: "Layer 03",
        value: "Presence Infrastructure",
    },
    {
        label: "Layer 04",
        value: "Presence Command",
    },
] as const;

const CORE_POSITIONING = [
    {
        title: "This page exists to stop businesses from buying the wrong depth.",
        copy:
            "The strongest layer is not the biggest-looking one. It is the one that matches the business’s actual stage of clarity, structural readiness, and continuity need.",
    },
    {
        title: "Each layer has a different job inside the same system.",
        copy:
            "Search Presence Scan creates first signal. Visibility Blueprint deepens explanation. Presence Infrastructure applies concentrated structural strengthening. Presence Command runs recurring strategic continuity.",
    },
    {
        title: "The sequence is the product, not just the pages.",
        copy:
            "The route is intentionally structured so the business can move deeper only when the previous layer has done enough to justify the next one.",
    },
] as const;

const SYSTEM_LAYERS: readonly LayerCard[] = [
    {
        key: "search-presence-scan",
        eyebrow: "Layer 01",
        title: "Search Presence Scan",
        strap: "First serious signal",
        copy:
            "A structured first-read layer designed to surface the initial visibility, trust, clarity, positioning, and action signal before the business commits to deeper strategic or implementation work.",
        bestFor:
            "Businesses that know something feels weak but still need a cleaner first read before choosing a deeper layer.",
        notFor:
            "Businesses that already know they need a deeper explanation or a specific concentrated build path right now.",
        outcome:
            "A stronger first interpretation baseline for what deserves deeper attention next.",
        href: "/free-check",
        cta: "Start Search Presence Scan",
        highlighted: true,
    },
    {
        key: "visibility-blueprint",
        eyebrow: "Layer 02",
        title: "Visibility Blueprint",
        strap: "Strategic explanation",
        copy:
            "A deeper interpretation layer for businesses that already know first signal alone is not enough and need clearer strategic explanation of what is weakening search presence, preference, answer inclusion, and response.",
        bestFor:
            "Businesses that need sharper reasoning before stronger build pressure is applied.",
        notFor:
            "Businesses that still need a cleaner first signal before deeper strategy makes sense.",
        outcome:
            "A clearer visibility explanation model that strengthens decision quality before concentrated work begins.",
        href: "/pricing/full-diagnosis",
        cta: "View Visibility Blueprint",
    },
    {
        key: "presence-infrastructure",
        eyebrow: "Layer 03",
        title: "Presence Infrastructure",
        strap: "Concentrated strengthening",
        copy:
            "A structural strengthening layer for businesses that already know what deserves concentrated work and no longer need to keep solving a sequence problem first.",
        bestFor:
            "Businesses ready to strengthen the specific structural systems that support stronger search presence.",
        notFor:
            "Businesses that still need first signal or deeper explanation before concentrated implementation pressure is justified.",
        outcome:
            "A more intentional and structurally stronger visibility foundation instead of loosely directed effort.",
        href: "/pricing/optimization",
        cta: "View Presence Infrastructure",
    },
    {
        key: "presence-command",
        eyebrow: "Layer 04",
        title: "Presence Command",
        strap: "Recurring operating layer",
        copy:
            "A recurring continuity layer for businesses that are already clear enough to benefit from monitoring, maintenance, adaptation, and sustained strategic direction over time.",
        bestFor:
            "Businesses ready for compounding continuity after the path is already clearer.",
        notFor:
            "Businesses trying to use recurring command to replace the earlier sequence they still have not solved properly.",
        outcome:
            "Longer-term visibility continuity, cleaner adaptation, and stronger operating discipline over time.",
        href: "/pricing/monthly-partner",
        cta: "View Presence Command",
    },
] as const;

const COMPARISON_ROWS = [
    {
        label: "Primary job",
        values: [
            "Create first signal",
            "Deepen explanation",
            "Strengthen structure",
            "Run continuity",
        ],
    },
    {
        label: "Best timing",
        values: [
            "Before deeper commitment",
            "When first signal is not enough",
            "When the path is already clear enough for concentrated work",
            "When the business is ready for ongoing command",
        ],
    },
    {
        label: "Main protection",
        values: [
            "Stops premature escalation",
            "Stops concentrated work without enough interpretation",
            "Stops vague effort without structural direction",
            "Stops continuity without a clear operating base",
        ],
    },
    {
        label: "Main mistake avoided",
        values: [
            "Buying heavier help too early",
            "Applying force before the real weakness is explained",
            "Trying to build before the sequence is earned",
            "Using monthly continuity to solve an earlier-stage clarity problem",
        ],
    },
] as const;

const DECISION_SIGNALS = [
    {
        title: "Choose Search Presence Scan",
        copy:
            "when the business still needs a cleaner first read before it can justify deeper strategic or implementation depth.",
    },
    {
        title: "Choose Visibility Blueprint",
        copy:
            "when the business already knows it has a serious visibility problem and needs a stronger explanation of what is actually weakening preference and response.",
    },
    {
        title: "Choose Presence Infrastructure",
        copy:
            "when the business is already clear enough about the path that concentrated structural strengthening is the real next move.",
    },
    {
        title: "Choose Presence Command",
        copy:
            "when the business is ready for recurring strategic continuity rather than more initial interpretation.",
    },
] as const;

const MISFIRES = [
    {
        title: "Choosing the largest-looking layer first.",
        copy:
            "A bigger-looking step is not automatically the stronger one. The stronger one is the layer that matches the actual stage of the business.",
    },
    {
        title: "Using infrastructure to solve a strategy problem.",
        copy:
            "Concentrated structural strengthening becomes more valuable after the business already knows what it is trying to strengthen and why.",
    },
    {
        title: "Using monthly continuity to replace earlier sequence work.",
        copy:
            "Presence Command compounds a stronger path. It does not replace the need for first signal or deeper explanation when those are still missing.",
    },
] as const;

const TRUST_BOUNDARIES = [
    {
        label: "No fake certainty",
        value:
            "Cendorq is built to improve decision quality, visibility control, and operating clarity, not to guarantee rankings, revenue, leads, or perfect external search outcomes.",
    },
    {
        label: "Clear layer boundaries",
        value:
            "The platform is strongest when Search Presence Scan, Visibility Blueprint, Presence Infrastructure, and Presence Command are not blended into one vague promise.",
    },
    {
        label: "Sequence over random escalation",
        value:
            "The system is intentionally structured to reduce waste created by choosing the wrong depth too early.",
    },
    {
        label: "Decision quality first",
        value:
            "The page is designed to help the business choose the right next move before making heavier commitments.",
    },
] as const;

const FAQS = [
    {
        question: "What is the best first Cendorq layer for most businesses?",
        answer:
            "For most businesses, the strongest first move is Search Presence Scan because it creates a cleaner first signal before deeper explanation, concentrated strengthening, or recurring command is chosen.",
    },
    {
        question: "When should a business skip directly to Visibility Blueprint?",
        answer:
            "A business should move directly to Visibility Blueprint when it already knows first signal is not enough and needs a stronger explanation of what is suppressing visibility, preference, and response.",
    },
    {
        question: "Why not choose Presence Infrastructure first if the business wants stronger results?",
        answer:
            "Because stronger structural pressure becomes more valuable after the business is clearer about what deserves concentrated work. Otherwise the wrong weakness can get reinforced faster.",
    },
    {
        question: "When is Presence Command the right layer?",
        answer:
            "Presence Command is the right layer when the business is already clear enough to benefit from recurring continuity, monitoring, adaptation, and long-term operating discipline.",
    },
] as const;

const NEXT_MOVES = [
    {
        title: "Start with first signal",
        copy:
            "Use Search Presence Scan when the business still needs a stronger first read before choosing deeper depth.",
        href: "/free-check",
        cta: "Start Search Presence Scan",
        highlighted: true,
    },
    {
        title: "Read the sequence first",
        copy:
            "Use Diagnosis when the business needs to understand how the route works before choosing the wrong layer.",
        href: "/diagnosis",
        cta: "See how it works",
    },
    {
        title: "Move straight into strategy",
        copy:
            "Use Visibility Blueprint when the business already knows first signal is not enough and needs a deeper explanation now.",
        href: "/pricing/full-diagnosis",
        cta: "View Visibility Blueprint",
    },
] as const;

export default function PricingPage() {
    const organizationJsonLd = buildOrganizationJsonLd();
    const websiteJsonLd = buildWebsiteJsonLd();

    const webPageJsonLd = buildWebPageJsonLd({
        title: `${BRAND_NAME} System Layers`,
        description:
            "Compare Search Presence Scan, Visibility Blueprint, Presence Infrastructure, and Presence Command so the business chooses the right layer at the right time.",
        path: "/pricing",
    });

    const serviceJsonLd = buildServiceJsonLd({
        title: `${BRAND_NAME} System Layers`,
        description:
            "A structured pricing and route-comparison page for Search Presence Scan, Visibility Blueprint, Presence Infrastructure, and Presence Command.",
        path: "/pricing",
        serviceType: "Search Presence OS",
    });

    const breadcrumbJsonLd = buildBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "System Layers", path: "/pricing" },
    ]);

    const faqJsonLd = buildFaqJsonLd(FAQS);

    return (
        <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 text-white sm:px-6 md:py-16 xl:py-20">
            <PricingAtmosphere />

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
                    <span className="text-cyan-100">System layers</span>
                </div>
            </section>

            <section className="relative z-10 grid gap-10 pt-10 lg:grid-cols-[0.93fr_1.07fr] lg:items-start">
                <div>
                    <TopChip>System Layers</TopChip>

                    <h1 className="system-hero-title mt-5 max-w-5xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
                        Compare the full route
                        <span className="system-gradient-text block">
                            before the business chooses the wrong depth.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                        This page exists to make the full {BRAND_NAME} route legible. It
                        compares Search Presence Scan, Visibility Blueprint, Presence
                        Infrastructure, and Presence Command so the business can choose the
                        correct layer at the correct time.
                    </p>

                    <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                        The strongest layer is not the one that sounds biggest. It is the one
                        that matches the business’s actual stage of clarity, structural
                        readiness, and continuity need.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <AuthorityPill>Sequence before force</AuthorityPill>
                        <AuthorityPill>Compare before committing</AuthorityPill>
                        <AuthorityPill>Right layer, right time</AuthorityPill>
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
                        <p className="system-eyebrow">What this page is really doing</p>

                        <h2 className="mt-4 text-2xl font-semibold text-white">
                            It helps the business choose the correct layer before deeper commitment begins.
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                            The page is not just listing offers. It is protecting the business
                            from mis-sequencing itself into deeper work before it has earned the
                            right level of clarity.
                        </p>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                            <GuideTile
                                label="Primary objective"
                                value="Clarify which layer the business actually needs now"
                            />
                            <GuideTile
                                label="Main failure avoided"
                                value="Buying heavier depth before the path is clear"
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
                                        Full route comparison active
                                    </div>

                                    <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                                        The route is strongest when each layer is read as a different job, not a vague bundle.
                                    </h2>

                                    <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                                        Search Presence Scan is not Visibility Blueprint. Visibility
                                        Blueprint is not Presence Infrastructure. Presence
                                        Infrastructure is not Presence Command. The platform is stronger
                                        when those roles stay distinct.
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
                                    <span>Comparison rule</span>
                                    <span>Choose by stage, not by volume</span>
                                </div>

                                <div className="system-status-bar mt-2 h-2">
                                    <span style={{ width: "89%" }} />
                                </div>
                            </div>

                            <div className="mt-6 grid gap-4 md:grid-cols-3">
                                {CORE_POSITIONING.map((item, index) => (
                                    <ReasonCard
                                        key={item.title}
                                        title={item.title}
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
                    <TopChip>Layer comparison</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Four layers. Four different responsibilities. One cleaner system.
                    </h2>
                </div>

                <div className="mt-10 grid gap-5 xl:grid-cols-2">
                    {SYSTEM_LAYERS.map((item, index) => (
                        <LayerCardView
                            key={item.key}
                            eyebrow={item.eyebrow}
                            title={item.title}
                            strap={item.strap}
                            copy={item.copy}
                            bestFor={item.bestFor}
                            notFor={item.notFor}
                            outcome={item.outcome}
                            href={item.href}
                            cta={item.cta}
                            highlighted={index === 0}
                        />
                    ))}
                </div>
            </section>

            <section className="relative z-10 mt-20">
                <div className="max-w-3xl">
                    <TopChip>Comparison table</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The strongest decision usually becomes obvious when the layers are compared side by side.
                    </h2>
                </div>

                <div className="system-panel-authority mt-10 overflow-hidden rounded-[2rem] p-4 sm:p-6">
                    <div className="grid grid-cols-[1.05fr_repeat(4,minmax(0,1fr))] gap-3">
                        <ComparisonHeaderCell value="Comparison lens" />
                        {SYSTEM_LAYERS.map((item, index) => (
                            <ComparisonHeaderCell
                                key={item.key}
                                value={item.title}
                                highlighted={index === 0}
                            />
                        ))}

                        {COMPARISON_ROWS.flatMap((row) => [
                            <ComparisonLabelCell
                                key={`${row.label}-label`}
                                value={row.label}
                            />,
                            ...row.values.map((value, index) => (
                                <ComparisonValueCell
                                    key={`${row.label}-${index}`}
                                    value={value}
                                    highlighted={index === 0}
                                />
                            )),
                        ])}
                    </div>
                </div>
            </section>

            <section className="relative z-10 mt-20 grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
                <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8 md:p-10">
                    <TopChip>Decision signals</TopChip>

                    <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The right layer usually becomes clear when the business asks the right stage question.
                    </h2>

                    <div className="mt-8 grid gap-4">
                        {DECISION_SIGNALS.map((item, index) => (
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
                    {TRUST_BOUNDARIES.map((item, index) => (
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
                    <TopChip>Sequence mistakes</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Most wrong purchases happen when the business skips over the layer that should have come first.
                    </h2>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-3">
                    {MISFIRES.map((item, index) => (
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
                    <TopChip>Practical questions</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The system becomes easier to use when the page answers the real layer questions explicitly.
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
                        Use the layer the business actually needs now.
                    </h2>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-3">
                    {NEXT_MOVES.map((item, index) => (
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
                        Start with Search Presence Scan unless the business already clearly needs deeper explanation.
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-300">
                        If the business still needs a cleaner first read, begin with Search
                        Presence Scan. If it already knows first signal is not enough, move
                        into Visibility Blueprint. The point is not to choose the biggest-looking
                        layer first. The point is to choose the correct one.
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

function PricingAtmosphere() {
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
            <div className="mt-2 text-base font-semibold leading-6 text-white">
                {value}
            </div>
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

function LayerCardView({
    eyebrow,
    title,
    strap,
    copy,
    bestFor,
    notFor,
    outcome,
    href,
    cta,
    highlighted = false,
}: {
    eyebrow: string;
    title: string;
    strap: string;
    copy: string;
    bestFor: string;
    notFor: string;
    outcome: string;
    href: string;
    cta: string;
    highlighted?: boolean;
}) {
    return (
        <article
            className={
                highlighted
                    ? "system-panel-authority rounded-[1.85rem] p-6 sm:p-7"
                    : "system-surface rounded-[1.85rem] p-6 sm:p-7"
            }
        >
            <div className="flex items-center justify-between gap-4">
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
                    {eyebrow}
                </div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                    {strap}
                </div>
            </div>

            <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white">
                {title}
            </h3>

            <p className="mt-4 text-sm leading-7 text-slate-300">{copy}</p>

            <div className="mt-5 grid gap-3">
                <DetailPanel label="Best for" value={bestFor} />
                <DetailPanel label="Not for" value={notFor} />
                <DetailPanel label="Primary outcome" value={outcome} />
            </div>

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

function DetailPanel({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="system-surface rounded-[1.1rem] p-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                {label}
            </div>
            <div className="mt-2 text-sm leading-7 text-slate-200">{value}</div>
        </div>
    );
}

function ComparisonHeaderCell({
    value,
    highlighted = false,
}: {
    value: string;
    highlighted?: boolean;
}) {
    return (
        <div
            className={
                highlighted
                    ? "system-chip rounded-[1.15rem] px-4 py-4 text-sm font-semibold text-white"
                    : "system-surface rounded-[1.15rem] px-4 py-4 text-sm font-semibold text-white"
            }
        >
            {value}
        </div>
    );
}

function ComparisonLabelCell({ value }: { value: string }) {
    return (
        <div className="system-surface rounded-[1.15rem] px-4 py-4 text-sm font-semibold text-slate-200">
            {value}
        </div>
    );
}

function ComparisonValueCell({
    value,
    highlighted = false,
}: {
    value: string;
    highlighted?: boolean;
}) {
    return (
        <div
            className={
                highlighted
                    ? "system-chip rounded-[1.15rem] px-4 py-4 text-sm leading-7 text-slate-100"
                    : "system-surface rounded-[1.15rem] px-4 py-4 text-sm leading-7 text-slate-200"
            }
        >
            {value}
        </div>
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