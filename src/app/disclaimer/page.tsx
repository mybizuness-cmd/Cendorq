import {
    buildMetadata,
    buildServiceJsonLd,
    buildWebPageJsonLd,
    toJsonLd,
} from "@/lib/seo";
import Link from "next/link";
import type { ReactNode } from "react";

const BRAND_NAME = "Cendorq";
const CATEGORY_LINE = "Search Presence OS";
const DISCLAIMER_DATE = "Effective date: April 2026";

export const metadata = buildMetadata({
    title: "Disclaimer",
    description:
        "Read the Cendorq disclaimer covering interpretation limits, no guaranteed outcomes, third-party dependency realities, and the reality-first boundaries around search-presence analysis, strategic direction, and platform guidance.",
    path: "/disclaimer",
    keywords: [
        "cendorq disclaimer",
        "search presence os disclaimer",
        "no guaranteed outcomes",
        "business visibility disclaimer",
        "search presence analysis disclaimer",
        "cendorq interpretation limits",
        "search presence claim boundaries",
        "cendorq no guarantee policy",
    ],
    imageAlt:
        "Cendorq disclaimer page — reality-first boundaries around interpretation, claims, platform outputs, and outcomes.",
});

const READOUTS = [
    {
        label: "Platform role",
        value: "Decision-support and search-presence guidance",
    },
    {
        label: "Claim boundary",
        value: "No guaranteed outcomes",
    },
    {
        label: "Primary value",
        value: "Stronger judgment, not false certainty",
    },
    {
        label: "Trust posture",
        value: "Reality-first and explicit",
    },
] as const;

const DISCLAIMER_CARDS = [
    {
        title: "Informational and strategic use",
        copy:
            "Cendorq provides search-presence analysis, interpretation, structured guidance, and plan-based service architecture. It is not a guarantee engine and should not be interpreted as one.",
    },
    {
        title: "No guaranteed outcomes",
        copy:
            "Nothing on the platform should be read as a guarantee of rankings, leads, revenue, sales, answer-engine placement, search visibility, platform treatment, or advertising performance.",
    },
    {
        title: "Decision support, not certainty",
        copy:
            "The system is built to improve business decision quality and reduce wasted motion, but interpretation still involves judgment and should never be mistaken for omniscience or absolute certainty.",
    },
] as const;

const NOT_ADVICE_ITEMS = [
    "Cendorq is not legal advice.",
    "Cendorq is not financial advice.",
    "Cendorq is not medical advice.",
    "Cendorq is not tax advice.",
    "Cendorq is not a substitute for licensed professional advice where such advice is required.",
] as const;

const RELIANCE_ITEMS = [
    "You remain responsible for your business decisions, implementation decisions, commercial choices, and financial commitments.",
    "You should not rely on platform content as a guaranteed predictor of future market results.",
    "Third-party platforms, search behavior, customer behavior, competitive activity, and economic conditions can change at any time.",
] as const;

const INTERPRETATION_ITEMS = [
    "Search-presence diagnosis involves interpretation, not omniscience.",
    "Signals may point to likely weaknesses, but not every weakness will produce identical outcomes across every business.",
    "Recommendations should be understood as strategic guidance, not infallible certainty.",
] as const;

const WHY_THIS_EXISTS = [
    {
        title: "Because serious systems should stay inside reality.",
        copy:
            "A strong disclaimer protects truth by making it explicit that interpretation, diagnosis, and strategic direction are meant to improve judgment, not erase uncertainty.",
    },
    {
        title: "Because false certainty damages trust.",
        copy:
            "When a platform implies guaranteed outcomes it cannot honestly control, trust weakens. A stronger system says clearly what it helps with and where its limits remain.",
    },
    {
        title: "Because external platforms and markets keep moving.",
        copy:
            "Business outcomes may depend on search systems, customer behavior, competitor movement, platform changes, and other variables that no serious service fully controls.",
    },
] as const;

const EXTERNAL_VARIABLES = [
    {
        label: "Search and answer systems",
        value:
            "Traditional search engines, AI search engines, local surfaces, review ecosystems, and answer systems may all shift independently of platform guidance.",
    },
    {
        label: "Market behavior",
        value:
            "Customer demand, timing, trust conditions, purchase intent, and macro conditions can influence outcomes in ways no platform can promise to fix universally.",
    },
    {
        label: "Competitive movement",
        value:
            "Competitors may change their offers, positioning, spend, messaging, or visibility posture at any time.",
    },
    {
        label: "Implementation quality",
        value:
            "Results may depend on what the business actually implements, how consistently it does so, and whether strategic guidance is applied well in practice.",
    },
] as const;

const OUTPUT_LIMITS = [
    {
        title: "Platform outputs are guidance, not certainty.",
        copy:
            "Reports, scans, recommendations, route guidance, commercial comparisons, and explanatory outputs are designed to help a business think more clearly. They should not be treated as infallible forecasts or universal guarantees.",
    },
    {
        title: "Recommendations depend on the quality of the input signal.",
        copy:
            "If a business provides weak, incomplete, inaccurate, outdated, or misleading information, the resulting interpretation may also be limited, distorted, or less useful than intended.",
    },
    {
        title: "Timing matters.",
        copy:
            "A recommendation that is reasonable at one moment may lose strength later as competitors move, search surfaces change, customer conditions shift, or implementation delays reduce relevance.",
    },
] as const;

const LIABILITY_POSTURE = [
    {
        label: "No outcome guarantee",
        value:
            "The platform does not guarantee rankings, inclusion, conversions, leads, sales, revenue, traffic, or platform treatment across third-party systems.",
    },
    {
        label: "No full-control claim",
        value:
            "Cendorq does not claim control over external algorithms, search interfaces, answer-engine behavior, customer decisions, competitor actions, or broader market conditions.",
    },
    {
        label: "User responsibility remains",
        value:
            "Businesses remain responsible for how they interpret, accept, reject, implement, delay, fund, or act on platform guidance and related business decisions.",
    },
    {
        label: "Practical risk remains",
        value:
            "Using any strategic guidance still involves judgment, tradeoffs, cost, and uncertainty. The disclaimer keeps that reality explicit instead of hidden.",
    },
] as const;

const BOUNDARIES = [
    {
        label: "What this page is for",
        value:
            "Clarify interpretation limits, claim boundaries, and the reality-first posture of the platform.",
    },
    {
        label: "What this page is not for",
        value:
            "Undermining the value of the platform or pretending it offers less than it does.",
    },
    {
        label: "Primary disclaimer logic",
        value:
            "The system improves decision quality and guidance, not guaranteed market outcomes.",
    },
    {
        label: "Best reading rule",
        value:
            "Read platform outputs as structured business guidance, not certainty in a moving market.",
    },
] as const;

const FAQS = [
    {
        question: "Why does Cendorq emphasize no guaranteed outcomes so strongly?",
        answer:
            "Because a serious platform should not promise control over rankings, leads, sales, or market behavior it cannot honestly control. The platform improves interpretation, direction, and next-step quality instead.",
    },
    {
        question: "Does this mean the platform has limited value?",
        answer:
            "No. It means the platform is honest about what it does. Its value is in helping the business understand what may be weakening trust, clarity, positioning, search presence, and action so stronger decisions can follow.",
    },
    {
        question: "What is the strongest way to use Cendorq guidance?",
        answer:
            "Use it as structured strategic guidance to improve judgment, sequencing, and priority clarity. Do not use it as a replacement for business responsibility or as a promise of universal outcomes.",
    },
    {
        question: "Why mention external factors so clearly?",
        answer:
            "Because external platforms, customer behavior, competitors, and market conditions can all change independently. The disclaimer protects truth by keeping that reality visible.",
    },
] as const;

export default function DisclaimerPage() {
    const webPageJsonLd = buildWebPageJsonLd({
        title: `${BRAND_NAME} Disclaimer`,
        description:
            "Understand the claim boundaries, interpretation limits, and no-guarantee posture behind Cendorq analysis, guidance, and platform outputs.",
        path: "/disclaimer",
    });

    const serviceJsonLd = buildServiceJsonLd({
        title: `${BRAND_NAME} Disclaimer and Claim Boundaries`,
        description:
            "A structured disclaimer explaining interpretation limits, no-guarantee posture, external dependencies, and reality-first claim boundaries across the Search Presence OS.",
        path: "/disclaimer",
    });

    return (
        <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 text-white sm:px-6 md:py-16 xl:py-20">
            <DisclaimerAtmosphere />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: toJsonLd(serviceJsonLd) }}
            />

            <section className="relative z-10 border-b border-white/8 pb-10">
                <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                    <span className="system-chip rounded-full px-3 py-1.5 text-cyan-200">
                        {BRAND_NAME}
                    </span>
                    <span className="text-white/20">/</span>
                    <span className="text-white/70">{CATEGORY_LINE}</span>
                    <span className="text-white/20">/</span>
                    <span className="text-cyan-100">Disclaimer</span>
                </div>
            </section>

            <section className="relative z-10 grid gap-10 pt-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-start">
                <div>
                    <TopChip>Disclaimer</TopChip>

                    <h1 className="system-hero-title mt-5 max-w-5xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
                        Clear disclaimers protect truth
                        <span className="system-gradient-text block">
                            when claims stay inside reality.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-4xl text-base leading-8 text-slate-300 sm:text-lg">
                        This page explains what {BRAND_NAME} is, what it is not, and the
                        boundaries around how platform content, analysis, interpretation, and
                        recommendations should be understood.
                    </p>

                    <p className="mt-5 max-w-4xl text-base leading-8 text-slate-300 sm:text-lg">
                        {BRAND_NAME} is built to improve business judgment, not to pretend
                        uncertainty disappears. The platform helps businesses understand what
                        may be weakening trust, clarity, positioning, search presence, and
                        action so stronger next decisions can be made inside a more realistic frame.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <AuthorityPill>Decision-support system</AuthorityPill>
                        <AuthorityPill>No guaranteed outcomes</AuthorityPill>
                        <AuthorityPill>Reality-first claims</AuthorityPill>
                    </div>

                    <div className="mt-8 text-sm font-medium uppercase tracking-[0.22em] text-slate-400">
                        {DISCLAIMER_DATE}
                    </div>

                    <div className="system-panel-authority mt-8 rounded-[1.8rem] p-5 sm:p-6">
                        <p className="system-eyebrow">What this page is really doing</p>

                        <h2 className="mt-4 text-2xl font-semibold text-white">
                            It is protecting truth before inflated assumptions weaken trust.
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                            A serious disclaimer should not make the platform sound weaker than
                            it is. It should make its role clearer. That means saying what the
                            system helps with, where its guidance is strongest, and where reality
                            still limits any honest claim about outcomes.
                        </p>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                            <GuideTile
                                label="Primary objective"
                                value="Clarify interpretation limits and claim boundaries"
                            />
                            <GuideTile
                                label="Main failure avoided"
                                value="Misreading strategic guidance as guaranteed certainty"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid gap-4">
                    <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                            <div className="max-w-2xl">
                                <TopChip>Claim posture</TopChip>

                                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                                    The system is built to improve judgment, not replace reality.
                                </h2>

                                <p className="mt-5 text-base leading-8 text-slate-300">
                                    That means the platform should be understood as a structured
                                    guidance system with serious value and serious limits. The
                                    disclaimer exists to keep those limits visible instead of letting
                                    exaggerated interpretation become the default.
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
                        <StatusTile label="Claim style" value="Bounded" highlighted />
                        <StatusTile label="Guidance style" value="Strategic" />
                        <StatusTile label="Truth style" value="Explicit" />
                    </div>

                    <div className="system-surface rounded-[1.7rem] p-6">
                        <p className="system-eyebrow">Best reading rule</p>
                        <p className="mt-4 text-base leading-8 text-slate-300">
                            The strongest way to read Cendorq is this: the platform is built to
                            help a business understand what may be weakening response so it can
                            make stronger next decisions, not to promise certainty in a moving market.
                        </p>
                    </div>
                </div>
            </section>

            <section className="relative z-10 mt-16 grid gap-5 md:grid-cols-3">
                {DISCLAIMER_CARDS.map((item, index) => (
                    <Card
                        key={item.title}
                        title={item.title}
                        copy={item.copy}
                        highlighted={index === 0}
                    />
                ))}
            </section>

            <section className="relative z-10 mt-20 grid gap-6 lg:grid-cols-2">
                <ListCard title="What Cendorq is not" items={NOT_ADVICE_ITEMS} highlighted />
                <ListCard title="User responsibility and reliance" items={RELIANCE_ITEMS} />
            </section>

            <section className="relative z-10 mt-20">
                <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8 md:p-10">
                    <TopChip>Interpretation boundaries</TopChip>

                    <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Strategic interpretation creates value, but it should never be confused with omniscience.
                    </h2>

                    <div className="mt-8 grid gap-3">
                        {INTERPRETATION_ITEMS.map((item, index) => (
                            <BoundaryListItem key={item} value={item} highlighted={index === 0} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative z-10 mt-20">
                <div className="max-w-3xl">
                    <TopChip>Why this matters</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The strongest disclaimer protects trust without weakening the platform’s real value.
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

            <section className="relative z-10 mt-20 grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
                <div className="system-surface rounded-[2rem] p-6 sm:p-8">
                    <TopChip>External variables</TopChip>

                    <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                        Business outcomes depend on variables the platform does not fully control.
                    </h2>

                    <div className="mt-8 grid gap-4">
                        {EXTERNAL_VARIABLES.map((item, index) => (
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
                    {BOUNDARIES.map((item, index) => (
                        <BoundaryTile
                            key={item.label}
                            label={item.label}
                            value={item.value}
                            highlighted={index === 0}
                        />
                    ))}
                </div>
            </section>

            <section className="relative z-10 mt-20 grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
                <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8 md:p-10">
                    <TopChip>Output and liability posture</TopChip>

                    <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Strong guidance still lives inside practical limits, responsibility, and risk.
                    </h2>

                    <div className="mt-8 grid gap-4">
                        {OUTPUT_LIMITS.map((item, index) => (
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
                    {LIABILITY_POSTURE.map((item, index) => (
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
                    <TopChip>Practical questions</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The strongest disclaimer answers make the claim boundaries easier to apply in real use.
                    </h2>
                </div>

                <div className="mt-10 grid gap-4 lg:grid-cols-2">
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
                <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8 md:p-10">
                    <div className="grid gap-8 lg:grid-cols-[1.06fr_0.94fr] lg:items-center">
                        <div>
                            <TopChip>Questions</TopChip>

                            <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                                If you need clarity, use the cleanest route.
                            </h2>

                            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
                                If you have questions about how platform claims, recommendations,
                                or service boundaries should be understood, use the contact page so
                                the question can be handled through the correct lane.
                            </p>

                            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                                <Link
                                    href="/contact"
                                    className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
                                >
                                    Contact Cendorq
                                </Link>
                                <Link
                                    href="/terms"
                                    className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
                                >
                                    Read terms
                                </Link>
                            </div>
                        </div>

                        <div className="grid gap-4">
                            <InfoTile
                                label="Platform role"
                                value="Decision-support and search-presence diagnosis"
                            />
                            <InfoTile label="Claim boundary" value="No guaranteed outcomes" />
                            <InfoTile label="Best support path" value="Use contact for clarification" />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

function DisclaimerAtmosphere() {
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

function Card({
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
                    ? "system-panel-authority rounded-[1.5rem] p-6"
                    : "system-surface rounded-[1.5rem] p-6"
            }
        >
            <h3 className="text-2xl font-semibold text-white">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">{copy}</p>
        </div>
    );
}

function ListCard({
    title,
    items,
    highlighted = false,
}: {
    title: string;
    items: readonly string[];
    highlighted?: boolean;
}) {
    return (
        <div
            className={
                highlighted
                    ? "system-panel-authority rounded-[2rem] p-6 sm:p-8"
                    : "system-surface rounded-[2rem] p-6 sm:p-8"
            }
        >
            <h3 className="text-2xl font-semibold text-white">{title}</h3>
            <div className="mt-6 grid gap-3">
                {items.map((item, index) => (
                    <BoundaryListItem key={item} value={item} highlighted={index === 0} />
                ))}
            </div>
        </div>
    );
}

function BoundaryListItem({
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
                    ? "system-chip rounded-[1.1rem] px-4 py-4 text-sm text-slate-100"
                    : "system-surface rounded-[1.1rem] px-4 py-4 text-sm text-slate-200"
            }
        >
            {value}
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
                    ? "system-panel-authority rounded-[1.65rem] p-5"
                    : "system-surface rounded-[1.65rem] p-5"
            }
        >
            <h3 className="text-xl font-semibold text-white">{question}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{answer}</p>
        </article>
    );
}

function InfoTile({ label, value }: { label: string; value: string }) {
    return (
        <div className="system-surface rounded-[1.4rem] p-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                {label}
            </div>
            <div className="mt-2 text-base font-semibold text-white">{value}</div>
        </div>
    );
}
