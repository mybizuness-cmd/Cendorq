import {
    buildBreadcrumbJsonLd,
    buildFaqJsonLd,
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
    title: "FAQ",
    description:
        "Read the Cendorq FAQ to understand the system path, what each layer is for, who it fits, and how to choose the right next move without escalating too early.",
    path: "/faq",
    keywords: [
        "cendorq faq",
        "search presence os faq",
        "search presence scan faq",
        "visibility blueprint faq",
        "presence infrastructure faq",
        "presence command faq",
        "cendorq questions",
    ],
    imageAlt:
        "Cendorq FAQ page — answers about the system path, layer selection, and trust boundaries.",
});

const HERO_READOUTS = [
    {
        label: "Main purpose",
        value: "Reduce confusion before the next move",
    },
    {
        label: "System posture",
        value: "Signal before escalation",
    },
    {
        label: "Primary value",
        value: "Sharper decision quality",
    },
    {
        label: "Trust posture",
        value: "Explicit and reality-first",
    },
] as const;

const FAQ_ITEMS = [
    {
        category: "System",
        question: "What is Cendorq?",
        answer:
            "Cendorq is a Search Presence OS. It helps businesses identify what may be weakening trust, clarity, positioning, and action before they keep spending into the wrong fix across evolving search environments.",
    },
    {
        category: "System",
        question: "What makes Cendorq different from a typical service stack?",
        answer:
            "The platform is structured as a sequence, not a vague pile of overlapping services. It starts with first signal, moves into deeper explanation only when justified, then into one-time strengthening or recurring continuity when the business is ready for those layers.",
    },
    {
        category: "Start here",
        question: "What is the strongest first move for most businesses?",
        answer:
            "Usually Search Presence Scan. It raises the quality of the first signal before the business escalates into deeper explanation, concentrated strengthening, or recurring continuity.",
    },
    {
        category: "Layer fit",
        question: "When should I choose Visibility Blueprint instead of Search Presence Scan?",
        answer:
            "Choose Visibility Blueprint when the business already knows it needs more than a first read and wants a deeper explanation of what may actually be weakening response before stronger pressure begins.",
    },
    {
        category: "Layer fit",
        question: "When should I choose Presence Infrastructure?",
        answer:
            "Choose Presence Infrastructure when the business already has enough clarity to justify concentrated one-time strengthening in the highest-priority places.",
    },
    {
        category: "Layer fit",
        question: "When should I choose Presence Command?",
        answer:
            "Choose Presence Command when the business is already clear enough to benefit from ongoing strategic continuity, maintenance, refinement, and compounding direction over time.",
    },
    {
        category: "Trust",
        question: "Does Cendorq guarantee rankings, leads, or revenue?",
        answer:
            "No. Cendorq is built to improve judgment, sequencing, and decision quality. It does not honestly guarantee market outcomes or total control over external variables.",
    },
    {
        category: "Search Presence Scan",
        question: "Is Search Presence Scan just a disguised sales form?",
        answer:
            "No. Search Presence Scan is a structured intake layer designed to create a stronger first signal. Its job is to improve the quality of the first read, not to pretend deeper paid work should be forced immediately.",
    },
    {
        category: "Sequence",
        question: "Can I skip directly to the biggest layer?",
        answer:
            "You can choose a deeper layer, but the strongest move is not automatically the biggest-looking one. The strongest move is the one that matches what the business actually needs now.",
    },
    {
        category: "Diagnosis",
        question: "What does Cendorq focus on most?",
        answer:
            "The system focuses on four recurring pressures: trust, clarity, positioning, and action. These are often the pressures that distort how the market reads a business before the business realizes what is happening.",
    },
    {
        category: "Contact",
        question: "When should I use direct contact instead of the structured path?",
        answer:
            "Direct contact is strongest when the business is already clear enough to ask a disciplined question about fit, scope, timing, or continuity. It should not replace first signal when the stage is still unclear.",
    },
    {
        category: "Trust",
        question: "What is the cleanest way to read the whole system?",
        answer:
            "Read it as one coherent route: Search Presence Scan for first signal, Visibility Blueprint for deeper explanation, Presence Infrastructure for concentrated one-time strengthening, and Presence Command for recurring continuity after clarity exists.",
    },
] as const;

const CORE_RULES = [
    {
        title: "Do not confuse bigger with better.",
        copy:
            "A heavier-looking step is not automatically the stronger next move. The stronger move is the one that matches the business’s actual stage of clarity.",
    },
    {
        title: "Do not strengthen what is not yet understood.",
        copy:
            "Concentrated pressure becomes more valuable after the business is clearer, not before.",
    },
    {
        title: "Do not ask continuity to solve what sequence should have solved first.",
        copy:
            "Presence Command works best after first signal, explanation, and one-time strengthening have already made the path more stable.",
    },
] as const;

const PLAN_GUIDE = [
    {
        label: "Start here first",
        title: "Search Presence Scan",
        copy:
            "Use this when the business still needs a stronger first signal before deeper paid depth is justified.",
        href: "/free-check",
        cta: "Start Search Presence Scan",
        highlighted: true,
    },
    {
        label: "Deeper explanation",
        title: "Visibility Blueprint",
        copy:
            "Use this when the business needs stronger interpretation of what may actually be weakening response.",
        href: "/pricing/full-diagnosis",
        cta: "View Visibility Blueprint",
    },
    {
        label: "One-time strengthening",
        title: "Presence Infrastructure",
        copy:
            "Use this when the business already has enough clarity to justify concentrated one-time pressure.",
        href: "/pricing/optimization",
        cta: "View Presence Infrastructure",
    },
    {
        label: "Recurring continuity",
        title: "Presence Command",
        copy:
            "Use this when the business is already clear enough to compound from ongoing strategic direction.",
        href: "/pricing/monthly-partner",
        cta: "View Presence Command",
    },
] as const;

const TRUST_BOUNDARIES = [
    {
        label: "What the platform does",
        value: "Improve the quality of the next business decision.",
    },
    {
        label: "What the platform does not do",
        value:
            "Promise guaranteed rankings, leads, revenue, or certainty that no serious system can honestly guarantee.",
    },
    {
        label: "What creates value here",
        value:
            "Stronger signal, stronger explanation, stronger sequence, and cleaner next-step judgment.",
    },
    {
        label: "What protects trust here",
        value:
            "Explicit boundaries, explicit layer roles, and a reality-first posture around outcomes.",
    },
] as const;

const ANSWER_PRINCIPLES = [
    {
        title: "The FAQ exists to protect sequence.",
        copy:
            "A strong answer is not just informative. It should reduce the chance that the business enters the wrong layer with the wrong expectations.",
    },
    {
        title: "The FAQ exists to keep layer roles explicit.",
        copy:
            "Search Presence Scan, Visibility Blueprint, Presence Infrastructure, and Presence Command should stay distinct enough that the business can tell what each one is actually for.",
    },
    {
        title: "The FAQ exists to strengthen trust through clarity.",
        copy:
            "Explicit answers create stronger commercial trust than vague promises, blurred scope, or inflated certainty ever can.",
    },
] as const;

const QUICK_SELECTIONS = [
    {
        label: "Need a first read",
        value: "Start Search Presence Scan",
    },
    {
        label: "Need deeper interpretation",
        value: "Move into Visibility Blueprint",
    },
    {
        label: "Need system strengthening",
        value: "Use Presence Infrastructure",
    },
    {
        label: "Need ongoing continuity",
        value: "Use Presence Command",
    },
] as const;

const ROUTE_MISTAKES = [
    {
        title: "Using the biggest-looking layer first",
        copy:
            "The loudest-looking step is not automatically the best one. Bigger action without cleaner sequence often compounds waste.",
    },
    {
        title: "Trying to use contact instead of first signal",
        copy:
            "Direct contact should not replace structured intake when the business still needs the first serious read more than anything else.",
    },
    {
        title: "Expecting guarantees instead of better judgment",
        copy:
            "The platform is built to improve interpretation and next-step clarity, not to promise outcomes no serious system can honestly control.",
    },
] as const;

const SEQUENCE_READOUTS = [
    {
        label: "Search Presence Scan",
        value: "First signal before assumption",
    },
    {
        label: "Visibility Blueprint",
        value: "Deeper explanation before force",
    },
    {
        label: "Presence Infrastructure",
        value: "Concentrated strengthening after clarity",
    },
    {
        label: "Presence Command",
        value: "Recurring continuity after the path is ready",
    },
] as const;

export default function FaqPage() {
    const webPageJsonLd = buildWebPageJsonLd({
        title: `${BRAND_NAME} FAQ`,
        description:
            "Answers about how the Cendorq system works, how to choose the right layer, and what the platform is designed to do.",
        path: "/faq",
    });

    const serviceJsonLd = buildServiceJsonLd({
        title: `${BRAND_NAME} FAQ and System Guidance`,
        description:
            "A structured FAQ covering the Cendorq system path, layer selection, and trust boundaries.",
        path: "/faq",
    });

    const breadcrumbJsonLd = buildBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "FAQ", path: "/faq" },
    ]);

    const faqJsonLd = buildFaqJsonLd(
        FAQ_ITEMS.map((item) => ({
            question: item.question,
            answer: item.answer,
        })),
    );

    return (
        <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 text-white sm:px-6 md:py-16 xl:py-20">
            <FaqAtmosphere />

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
                    <span className="text-cyan-100">FAQ</span>
                </div>
            </section>

            <section className="relative z-10 grid gap-10 pt-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-start">
                <div>
                    <TopChip>FAQ</TopChip>

                    <h1 className="system-hero-title mt-5 max-w-5xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
                        Clear answers
                        <span className="system-gradient-text block">
                            before the business chooses the wrong next move.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                        The FAQ exists to reduce confusion before the business escalates into
                        the wrong layer. {BRAND_NAME} works best when the system path stays
                        readable and each stage keeps its role clear.
                    </p>

                    <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                        The strongest use of this page is not just getting an answer. It is
                        getting a cleaner understanding of whether the business needs first
                        signal, deeper explanation, one-time strengthening, or recurring
                        continuity next.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <AuthorityPill>Clear sequencing</AuthorityPill>
                        <AuthorityPill>Stronger judgment</AuthorityPill>
                        <AuthorityPill>Reality-first answers</AuthorityPill>
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
                            View full system path
                        </Link>
                    </div>

                    <div className="system-panel-authority mt-8 rounded-[1.8rem] p-5 sm:p-6">
                        <p className="system-eyebrow">What this page is really for</p>

                        <h2 className="mt-4 text-2xl font-semibold text-white">
                            It is here to protect the business from preventable confusion.
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                            The FAQ is part of the platform’s trust architecture. It keeps the
                            route explicit, prevents different layers from blurring together, and
                            helps the business make a cleaner decision before more effort, more
                            money, or more expectation gets attached to the wrong step.
                        </p>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                            <GuideTile
                                label="Primary objective"
                                value="Reduce confusion before escalation"
                            />
                            <GuideTile
                                label="Main failure avoided"
                                value="Misreading what layer the business actually needs"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid gap-4">
                    <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                            <div className="max-w-2xl">
                                <TopChip>FAQ posture</TopChip>

                                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                                    Better answers create better sequence, and better sequence creates better decisions.
                                </h2>

                                <p className="mt-5 text-base leading-8 text-slate-300">
                                    That is why the answers here stay explicit. This page is not meant
                                    to create more blur. It is meant to make the route easier to trust
                                    and easier to follow correctly.
                                </p>
                            </div>

                            <div className="grid min-w-0 gap-3 sm:grid-cols-2 lg:w-[21rem]">
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
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                        <StatusTile label="Answer style" value="Explicit" highlighted />
                        <StatusTile label="System bias" value="Sequence-first" />
                        <StatusTile label="Trust style" value="Reality-first" />
                    </div>

                    <div className="system-surface rounded-[1.7rem] p-6">
                        <p className="system-eyebrow">Best reading rule</p>
                        <p className="mt-4 text-base leading-8 text-slate-300">
                            Use the FAQ to understand the role of each layer clearly, not to look
                            for a shortcut around the system path.
                        </p>
                    </div>

                    <div className="system-surface rounded-[1.7rem] p-6">
                        <p className="system-eyebrow">Quick selection guide</p>
                        <div className="mt-4 grid gap-3">
                            {QUICK_SELECTIONS.map((item, index) => (
                                <BoundaryTile
                                    key={item.label}
                                    label={item.label}
                                    value={item.value}
                                    highlighted={index === 0}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative z-10 mt-20">
                <div className="max-w-3xl">
                    <TopChip>Frequently asked questions</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The most important questions are the ones that keep the next move clean.
                    </h2>
                </div>

                <div className="mt-10 grid gap-4">
                    {FAQ_ITEMS.map((item, index) => (
                        <FaqCard
                            key={item.question}
                            category={item.category}
                            question={item.question}
                            answer={item.answer}
                            highlighted={index === 0}
                        />
                    ))}
                </div>
            </section>

            <section className="relative z-10 mt-20 grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
                <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8 md:p-10">
                    <TopChip>Core rules</TopChip>

                    <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The strongest answers usually point back to stronger sequence.
                    </h2>

                    <div className="mt-8 grid gap-4">
                        {CORE_RULES.map((item, index) => (
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
                            The platform is designed to improve decision quality and business
                            sequence. It is not designed to promise guaranteed outcomes or to
                            collapse every layer into one vague expectation.
                        </p>
                    </div>
                </div>
            </section>

            <section className="relative z-10 mt-20">
                <div className="max-w-3xl">
                    <TopChip>Quick layer guide</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        If the answers are clear, the right layer usually becomes easier to see.
                    </h2>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {PLAN_GUIDE.map((item, index) => (
                        <PlanGuideCard
                            key={item.title}
                            label={item.label}
                            title={item.title}
                            copy={item.copy}
                            href={item.href}
                            cta={item.cta}
                            highlighted={index === 0}
                        />
                    ))}
                </div>
            </section>

            <section className="relative z-10 mt-20 grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
                <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8 md:p-10">
                    <TopChip>Sequence map</TopChip>

                    <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The system works best when every layer stays in its proper place.
                    </h2>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        {SEQUENCE_READOUTS.map((item, index) => (
                            <BoundaryTile
                                key={item.label}
                                label={item.label}
                                value={item.value}
                                highlighted={index === 0}
                            />
                        ))}
                    </div>
                </div>

                <div className="grid gap-4">
                    {ROUTE_MISTAKES.map((item, index) => (
                        <InfoPanel
                            key={item.title}
                            title={item.title}
                            copy={item.copy}
                            highlighted={index === 0}
                        />
                    ))}
                </div>
            </section>

            <section className="relative z-10 mt-20 grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
                <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8 md:p-10">
                    <TopChip>Answer principles</TopChip>

                    <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Strong FAQ architecture should increase trust, not just increase volume.
                    </h2>

                    <div className="mt-8 grid gap-4">
                        {ANSWER_PRINCIPLES.map((item, index) => (
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
                        title="What this page should help you do"
                        copy="Choose the right layer with less confusion, less guesswork, and less chance of escalating too early."
                        highlighted
                    />
                    <InfoPanel
                        title="What this page should stop you from doing"
                        copy="Treating every service layer like it solves the same problem or expecting the heaviest-looking option to always be the best one."
                    />
                    <InfoPanel
                        title="What creates the strongest outcome"
                        copy="Using the FAQ to reinforce sequence, not to search for a loophole around it."
                    />
                </div>
            </section>

            <section className="relative z-10 mt-20">
                <div className="system-panel-authority rounded-[2rem] p-6 text-center sm:p-8 md:p-10">
                    <TopChip>Best next move</TopChip>

                    <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Start with first signal unless the business already clearly needs deeper explanation.
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-300">
                        Most confusion disappears once the business stops trying to choose the
                        biggest-looking step first. Start with Search Presence Scan unless the path
                        is already clear enough to justify deeper paid depth now.
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

function FaqAtmosphere() {
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

function FaqCard({
    category,
    question,
    answer,
    highlighted = false,
}: {
    category: string;
    question: string;
    answer: string;
    highlighted?: boolean;
}) {
    return (
        <details
            className={
                highlighted
                    ? "system-panel-authority rounded-[1.7rem] p-5"
                    : "system-surface rounded-[1.7rem] p-5"
            }
            open={highlighted}
        >
            <summary className="cursor-pointer">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
                    {category}
                </div>
                <div className="mt-3 text-xl font-semibold text-white">{question}</div>
            </summary>
            <p className="mt-4 text-sm leading-7 text-slate-300">{answer}</p>
        </details>
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

function PlanGuideCard({
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
                    ? "system-panel-authority rounded-[1.8rem] p-6"
                    : "system-surface rounded-[1.8rem] p-6"
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