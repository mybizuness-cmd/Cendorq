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
    title: "Visibility Blueprint",
    description:
        "Visibility Blueprint is Cendorq’s deeper strategy review for businesses that know something is not working but need a clear explanation before they spend more money, make more changes, or choose the wrong next step.",
    path: "/pricing/full-diagnosis",
    keywords: [
        "cendorq visibility blueprint",
        "visibility blueprint",
        "business strategy review",
        "search visibility diagnosis",
        "website visibility review",
        "business visibility strategy",
        "online presence diagnosis",
        "clarity and positioning review",
        "trust and conversion review",
        "deep business diagnosis",
    ],
    image: {
        alt: "Cendorq Visibility Blueprint page — a deeper strategy review for businesses that need clear answers before making bigger changes.",
    },
});

const HERO_READOUTS = [
    {
        label: "Best for",
        value: "Businesses that need clear answers",
    },
    {
        label: "Main role",
        value: "Deep strategy review",
    },
    {
        label: "Comes after",
        value: "Search Presence Scan",
    },
    {
        label: "Usually leads to",
        value: "Focused implementation",
    },
] as const;

const WHY_THIS_EXISTS = [
    {
        title: "Because many businesses know something is wrong but still cannot explain the real problem.",
        copy:
            "They can feel the weakness, but they cannot clearly say whether the issue is trust, messaging, positioning, customer understanding, poor structure, or a mix of several things.",
    },
    {
        title: "Because spending more money without clarity often makes the wrong problem bigger.",
        copy:
            "A business can easily pay for more marketing, more redesign, more content, or more optimization before it fully understands what is actually blocking better results.",
    },
    {
        title: "Because the strongest next move depends on what is really causing the slowdown.",
        copy:
            "Sometimes the business needs stronger messaging. Sometimes it needs stronger trust signals. Sometimes it needs better structure. This page is about getting that answer clearer first.",
    },
] as const;

const WHAT_THIS_IS = [
    {
        label: "What it is",
        title: "A deeper strategy review that explains what is really holding the business back.",
        copy:
            "Visibility Blueprint is for businesses that are beyond the first signal stage and now need a clearer diagnosis of why they are being overlooked, misunderstood, compared away, or not converting well enough.",
    },
    {
        label: "What it helps with",
        title: "It helps you stop guessing before you make bigger decisions.",
        copy:
            "Instead of pushing into more work blindly, this layer helps you understand what deserves attention first so the next investment is smarter and better timed.",
    },
    {
        label: "What it prevents",
        title: "It protects you from solving the wrong problem.",
        copy:
            "That matters because solving the wrong problem can waste time, money, momentum, and confidence, especially when the business is already under pressure to improve.",
    },
] as const;

const WHAT_WE_LOOK_AT = [
    {
        label: "Trust",
        title: "Do people trust the business quickly enough?",
        copy:
            "We look at whether the business feels believable, credible, current, professional, and safe to choose — especially when people are comparing options fast.",
    },
    {
        label: "Clarity",
        title: "Do people understand what the business does fast enough?",
        copy:
            "If people do not quickly understand what you do, who you help, and why you are a good fit, strong opportunities can disappear before serious interest forms.",
    },
    {
        label: "Positioning",
        title: "Does the business stand out clearly enough?",
        copy:
            "We look at whether the business feels distinct and memorable or whether it blends into a crowded market where customers treat every option like the same thing.",
    },
    {
        label: "Action",
        title: "Is the business making the next step easy enough?",
        copy:
            "We look at whether the structure helps people move forward confidently or creates hesitation, confusion, delay, or drop-off before contact and conversion happen.",
    },
] as const;

const WHAT_YOU_GET = [
    {
        label: "Clearer diagnosis",
        value:
            "A stronger explanation of what is actually weakening visibility, trust, customer understanding, and response.",
    },
    {
        label: "Better priorities",
        value:
            "More clarity on what deserves attention first so the business stops spreading effort everywhere at once.",
    },
    {
        label: "Smarter next steps",
        value:
            "A stronger base for deciding whether the next move should be implementation, more structural work, or ongoing support.",
    },
    {
        label: "More confidence",
        value:
            "A clearer reason for why the business is underperforming and what needs to change first to improve the situation.",
    },
] as const;

const BEST_FOR = [
    "Businesses that know something is off but cannot yet explain the real problem clearly.",
    "Businesses that have already spent money on activity and still feel the market is reading them the wrong way.",
    "Businesses that are deciding whether they need deeper strategy or direct implementation next.",
    "Businesses that want a clearer plan before making bigger changes to their website, messaging, positioning, or visibility systems.",
] as const;

const NOT_FOR = [
    "Businesses that still only need a first signal and are not ready for a deeper review yet.",
    "Businesses looking for instant guarantees, magic promises, or fake certainty.",
    "Businesses trying to skip clarity and go straight into bigger work because it sounds more impressive.",
    "Businesses that do not want a real answer and only want reassurance.",
] as const;

const HOW_TO_KNOW_IF_YOU_NEED_IT = [
    {
        title: "Choose Visibility Blueprint when the business already knows first signal is not enough.",
        copy:
            "If you have already reached the point where a surface-level answer will not help, this is usually the stronger next step.",
    },
    {
        title: "Choose Visibility Blueprint when you need a real explanation before paying for bigger changes.",
        copy:
            "This is especially useful when you are considering implementation work but do not want to move forward until the underlying problem is much clearer.",
    },
    {
        title: "Choose Visibility Blueprint when you feel the business is being misunderstood, under-trusted, or misread.",
        copy:
            "If the market is not responding the way it should, and you still cannot explain exactly why, this layer helps make that problem much easier to see.",
    },
] as const;

const COMMON_MISTAKES = [
    {
        title: "Jumping into implementation before the diagnosis is clear.",
        copy:
            "This is one of the fastest ways to waste money. Bigger work feels productive, but it can easily be pointed at the wrong issue.",
    },
    {
        title: "Assuming the problem is only traffic or only marketing.",
        copy:
            "Sometimes the real issue is trust. Sometimes it is positioning. Sometimes customers simply do not understand the business well enough. More activity alone does not fix that.",
    },
    {
        title: "Treating strategy like optional thinking instead of decision protection.",
        copy:
            "Good strategy does not slow momentum down. It protects momentum from being wasted on the wrong move.",
    },
] as const;

const TRUST_BOUNDARIES = [
    {
        label: "No fake guarantees",
        value:
            "Visibility Blueprint is meant to improve clarity and decision quality. It is not a promise of guaranteed rankings, guaranteed leads, or guaranteed revenue.",
    },
    {
        label: "Real-world use",
        value:
            "This layer is about helping the business make better decisions with better understanding, not dressing uncertainty up with bigger words.",
    },
    {
        label: "Clear role",
        value:
            "This is the deeper strategy layer. It is not the first signal layer and it is not the implementation layer.",
    },
    {
        label: "Conversion with honesty",
        value:
            "The page should help the right customers say yes for the right reasons, not pressure the wrong customers into buying something too advanced too early.",
    },
] as const;

const FAQS = [
    {
        question: "What is Visibility Blueprint in simple terms?",
        answer:
            "It is a deeper strategy review that helps you understand what is really holding the business back before you spend more money or make bigger changes.",
    },
    {
        question: "How is this different from Search Presence Scan?",
        answer:
            "Search Presence Scan is the first signal. Visibility Blueprint is the deeper review you use when you already know the business needs more than a first read.",
    },
    {
        question: "When is this better than going straight into implementation?",
        answer:
            "It is better when the real problem is still not clear enough. If you do implementation without clarity, you can easily improve the wrong thing.",
    },
    {
        question: "What usually comes after Visibility Blueprint?",
        answer:
            "For many businesses, the next step is Presence Infrastructure, where the right parts of the business get strengthened more directly. But the main point is that the next move becomes clearer after this review.",
    },
] as const;

const NEXT_MOVE_OPTIONS = [
    {
        title: "Start with Search Presence Scan",
        copy:
            "Best if the business still needs a stronger first signal before a deeper review makes sense.",
        href: "/free-check",
        cta: "Start Search Presence Scan",
    },
    {
        title: "Move into Presence Infrastructure",
        copy:
            "Best if the business already has enough clarity and is ready for focused implementation and strengthening work.",
        href: "/pricing/optimization",
        cta: "View Presence Infrastructure",
        highlighted: true,
    },
    {
        title: "Compare all system layers",
        copy:
            "Best if you still want to compare Search Presence Scan, Visibility Blueprint, Infrastructure, and Command side by side.",
        href: "/pricing",
        cta: "View System Layers",
    },
] as const;

export default function FullDiagnosisPage() {
    const organizationJsonLd = buildOrganizationJsonLd();
    const websiteJsonLd = buildWebsiteJsonLd();

    const webPageJsonLd = buildWebPageJsonLd({
        title: `${BRAND_NAME} Visibility Blueprint`,
        description:
            "Visibility Blueprint is the deeper strategy review for businesses that need clearer answers before making bigger changes.",
        path: "/pricing/full-diagnosis",
    });

    const serviceJsonLd = buildServiceJsonLd({
        title: `${BRAND_NAME} Visibility Blueprint`,
        description:
            "A deeper strategy review for businesses that need a clearer explanation of what is hurting visibility, trust, customer understanding, and conversion.",
        path: "/pricing/full-diagnosis",
        serviceType: "Business visibility strategy review",
    });

    const breadcrumbJsonLd = buildBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "System Layers", path: "/pricing" },
        { name: "Visibility Blueprint", path: "/pricing/full-diagnosis" },
    ]);

    const faqJsonLd = buildFaqJsonLd(FAQS);

    return (
        <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 text-white sm:px-6 md:py-16 xl:py-20">
            <BlueprintAtmosphere />

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
                    <span className="text-cyan-100">Visibility Blueprint</span>
                </div>
            </section>

            <section className="relative z-10 grid gap-10 pt-10 lg:grid-cols-[0.93fr_1.07fr] lg:items-start">
                <div>
                    <TopChip>Visibility Blueprint</TopChip>

                    <h1 className="system-hero-title mt-5 max-w-5xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
                        Clear answers before
                        <span className="system-gradient-text block">
                            you spend more money in the wrong direction.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                        Visibility Blueprint is for businesses that already know something is
                        not working but need a much clearer explanation before they invest in
                        bigger changes.
                    </p>

                    <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                        In simple terms, this is the deep-dive strategy review. It helps you
                        understand what is actually causing the slowdown so your next move is
                        smarter, safer, and more likely to help.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <AuthorityPill>Clearer diagnosis</AuthorityPill>
                        <AuthorityPill>Better decisions</AuthorityPill>
                        <AuthorityPill>Stronger next step</AuthorityPill>
                    </div>

                    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                        <Link
                            href="/pricing/optimization"
                            className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
                        >
                            View Presence Infrastructure
                        </Link>
                        <Link
                            href="/free-check"
                            className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
                        >
                            Start Search Presence Scan
                        </Link>
                    </div>

                    <div className="system-panel-authority mt-8 rounded-[1.8rem] p-5 sm:p-6">
                        <p className="system-eyebrow">What this service really does</p>

                        <h2 className="mt-4 text-2xl font-semibold text-white">
                            It helps you understand the real problem before you try to fix it.
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                            This service gives the business a clearer explanation of what is
                            really blocking growth, visibility, trust, customer understanding,
                            and action. That makes the next investment much easier to choose.
                        </p>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                            <GuideTile
                                label="Primary objective"
                                value="Make the real business problem much easier to understand"
                            />
                            <GuideTile
                                label="Main failure avoided"
                                value="Making bigger changes before the diagnosis is clear"
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
                                        Deep strategy review
                                    </div>

                                    <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                                        This layer is for businesses that need clarity before bigger moves.
                                    </h2>

                                    <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                                        If you are already past the point of needing a simple first read,
                                        Visibility Blueprint helps you understand what is really going
                                        on before you commit to more implementation, more spend, or more change.
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
                                    <span>Best use case</span>
                                    <span>Clear diagnosis before bigger action</span>
                                </div>

                                <div className="system-status-bar mt-2 h-2">
                                    <span style={{ width: "90%" }} />
                                </div>
                            </div>

                            <div className="mt-6 grid gap-4 md:grid-cols-3">
                                {WHY_THIS_EXISTS.map((item, index) => (
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
                    <TopChip>Why this exists</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Many businesses do not need more random effort. They need a better explanation first.
                    </h2>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-3">
                    {WHAT_THIS_IS.map((item, index) => (
                        <ReasonCard
                            key={item.title}
                            title={item.title}
                            copy={item.copy}
                            eyebrow={item.label}
                            highlighted={index === 0}
                        />
                    ))}
                </div>
            </section>

            <section className="relative z-10 mt-20">
                <div className="max-w-3xl">
                    <TopChip>What we look at</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        We look at the parts of the business that usually decide whether people trust, understand, and choose you.
                    </h2>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {WHAT_WE_LOOK_AT.map((item, index) => (
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

            <section className="relative z-10 mt-20 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8 md:p-10">
                    <TopChip>What you get</TopChip>

                    <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The main result is stronger clarity about what needs to happen next.
                    </h2>

                    <div className="mt-8 grid gap-4">
                        {WHAT_YOU_GET.map((item, index) => (
                            <TrustTile
                                key={item.label}
                                label={item.label}
                                value={item.value}
                                highlighted={index === 0}
                            />
                        ))}
                    </div>
                </div>

                <div className="grid gap-4">
                    <div className="system-panel-authority rounded-[1.7rem] p-5">
                        <TopChip>Best for</TopChip>

                        <div className="mt-5 grid gap-3">
                            {BEST_FOR.map((item, index) => (
                                <FitRow key={item} value={item} highlighted={index === 0} />
                            ))}
                        </div>
                    </div>

                    <div className="system-surface rounded-[1.7rem] p-5">
                        <TopChip>Not for</TopChip>

                        <div className="mt-5 grid gap-3">
                            {NOT_FOR.map((item, index) => (
                                <FitRow key={item} value={item} highlighted={index === 0} muted />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative z-10 mt-20 grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
                <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8 md:p-10">
                    <TopChip>How to know if you need it</TopChip>

                    <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Choose this when the business needs a clearer answer before it needs a bigger move.
                    </h2>

                    <div className="mt-8 grid gap-4">
                        {HOW_TO_KNOW_IF_YOU_NEED_IT.map((item, index) => (
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
                    <TopChip>Common mistakes</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The service becomes more valuable when the business avoids the mistakes that usually waste money.
                    </h2>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-3">
                    {COMMON_MISTAKES.map((item, index) => (
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
                        Real customers convert better when the offer is explained plainly.
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
                        Choose the next step that matches how clear the business already is.
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
                            highlighted={index === 1}
                        />
                    ))}
                </div>
            </section>

            <section className="relative z-10 mt-20">
                <div className="system-panel-authority rounded-[2rem] p-6 text-center sm:p-8 md:p-10">
                    <TopChip>Best next move</TopChip>

                    <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Use Visibility Blueprint when you need a real explanation before you make bigger changes.
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-300">
                        If the business already knows something is wrong but still cannot explain
                        the real cause clearly, Visibility Blueprint is often the smartest next
                        step. It helps turn confusion into clarity so the next investment is
                        stronger, safer, and more likely to help.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                        <Link
                            href="/pricing/optimization"
                            className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
                        >
                            View Presence Infrastructure
                        </Link>
                        <Link
                            href="/pricing"
                            className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
                        >
                            View System Layers
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

function BlueprintAtmosphere() {
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
