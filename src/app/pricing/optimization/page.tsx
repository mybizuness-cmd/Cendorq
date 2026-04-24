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
    title: "Presence Infrastructure",
    description:
        "Presence Infrastructure is Cendorq’s focused implementation layer for businesses that already know what needs to improve and are ready to strengthen the website, messaging, trust signals, and customer journey.",
    path: "/pricing/optimization",
    keywords: [
        "cendorq presence infrastructure",
        "presence infrastructure",
        "website improvement service",
        "business visibility implementation",
        "website and messaging optimization",
        "trust and conversion improvement",
        "clarity and positioning improvement",
        "business website strengthening",
        "search visibility implementation",
        "conversion structure improvement",
    ],
    image: {
        alt: "Cendorq Presence Infrastructure page — focused implementation for businesses ready to strengthen the right parts of the business.",
    },
});

const HERO_READOUTS = [
    {
        label: "Best for",
        value: "Businesses ready for implementation",
    },
    {
        label: "Main role",
        value: "Focused strengthening work",
    },
    {
        label: "Comes after",
        value: "Visibility Blueprint",
    },
    {
        label: "Often leads to",
        value: "Ongoing monthly support",
    },
] as const;

const CORE_POSITIONING = [
    {
        title: "This is the layer where the right changes actually get made.",
        copy:
            "Presence Infrastructure is for businesses that already know what needs work and are now ready to strengthen the website, messaging, trust signals, and customer journey more directly.",
    },
    {
        title: "It is easier to understand as focused implementation.",
        copy:
            "Instead of more diagnosis, this layer is about making the improvements that support stronger trust, stronger clarity, better customer understanding, and smoother action.",
    },
    {
        title: "It works best when the business already has better direction.",
        copy:
            "That matters because implementation is much more effective when it is guided by a clearer strategy instead of rushed guesswork.",
    },
] as const;

const WHAT_GETS_STRENGTHENED = [
    {
        label: "Trust signals",
        title: "Make the business feel more credible, current, and easier to trust.",
        copy:
            "This can include the parts of the business presence that influence whether people believe you, feel safe choosing you, and see you as established and real.",
    },
    {
        label: "Clarity",
        title: "Help people understand what you do and why it matters faster.",
        copy:
            "If customers do not quickly understand the offer, the audience, and the value, good opportunities can disappear before they turn into serious interest.",
    },
    {
        label: "Positioning",
        title: "Make the business feel more distinct and less replaceable.",
        copy:
            "This work helps reduce the feeling that you are just one more generic option in a crowded market.",
    },
    {
        label: "Action path",
        title: "Make it easier for serious customers to take the next step.",
        copy:
            "This includes reducing friction, confusion, hesitation, and drop-off before inquiries, bookings, or contact actually happen.",
    },
] as const;

const WHAT_THIS_SERVICE_DOES = [
    {
        title: "Turns strategy into real improvements.",
        copy:
            "Once the business is clearer on what is wrong, this layer focuses on actually strengthening the right parts instead of staying in discussion mode.",
    },
    {
        title: "Improves the systems customers and search surfaces react to.",
        copy:
            "The work is aimed at the parts of the business presence that affect understanding, trust, preference, and action — not just cosmetic change for its own sake.",
    },
    {
        title: "Builds a better base for future growth and monthly support.",
        copy:
            "A stronger structure makes future upkeep, adaptation, and ongoing support much more useful and more efficient.",
    },
] as const;

const WHAT_YOU_GET = [
    {
        label: "Focused implementation",
        value:
            "Direct work on the parts of the business that most need strengthening right now.",
    },
    {
        label: "Stronger customer understanding",
        value:
            "A clearer and more convincing presentation of what the business does, who it helps, and why someone should choose it.",
    },
    {
        label: "Better conversion support",
        value:
            "A smoother path for serious prospects to move from interest into action.",
    },
    {
        label: "A stronger base",
        value:
            "A more stable foundation for future visibility improvements and monthly support.",
    },
] as const;

const BEST_FOR = [
    "Businesses that already know what needs to improve and are ready to act on it.",
    "Businesses that have enough clarity to move from diagnosis into focused strengthening work.",
    "Businesses that want more than advice and are ready for real improvements to the website, messaging, trust signals, and customer journey.",
    "Businesses that want a stronger base before moving into ongoing monthly support.",
] as const;

const NOT_FOR = [
    "Businesses that still need a first signal before implementation makes sense.",
    "Businesses that still need a deeper diagnosis before they know what to fix.",
    "Businesses looking for vague activity without clear priorities.",
    "Businesses expecting instant guarantees instead of real improvement work.",
] as const;

const HOW_IT_WORKS = [
    {
        title: "Start with the clearest priorities first.",
        copy:
            "The strongest version of this service does not try to improve everything equally. It focuses on the improvements that matter most first.",
    },
    {
        title: "Strengthen what affects trust, clarity, and action most directly.",
        copy:
            "That usually means working on the parts of the business presence that shape how people understand, trust, compare, and respond to you.",
    },
    {
        title: "Use implementation to support the strategy, not replace it.",
        copy:
            "This layer is strongest when the work is clearly guided by what the business already learned in the earlier stages.",
    },
    {
        title: "Build a base that is easier to maintain later.",
        copy:
            "Good implementation should not just look better for a moment. It should make the business easier to support and improve over time.",
    },
] as const;

const HOW_TO_KNOW_IF_YOU_NEED_IT = [
    {
        title: "Choose Presence Infrastructure when the business is ready for real changes, not more explanation.",
        copy:
            "If the problem is already clear enough, the stronger move is often implementation instead of staying in review mode.",
    },
    {
        title: "Choose Presence Infrastructure when you know what needs strengthening.",
        copy:
            "This is usually the right step when the business has already reached a point where the next value comes from focused improvement work.",
    },
    {
        title: "Choose Presence Infrastructure when the current website or business presentation is clearly holding you back.",
        copy:
            "If the structure, clarity, trust, or customer journey is now the problem, this layer is often the right one.",
    },
] as const;

const COMMON_MISTAKES = [
    {
        title: "Trying to implement before the diagnosis is clear.",
        copy:
            "This usually creates busywork, unnecessary revisions, and improvements aimed at the wrong problem.",
    },
    {
        title: "Treating implementation like a cosmetic refresh only.",
        copy:
            "The strongest implementation work is not just visual. It improves understanding, trust, positioning, and customer movement.",
    },
    {
        title: "Expecting one round of improvements to replace all future upkeep.",
        copy:
            "This layer can make the base much stronger, but strong businesses still benefit from continued attention over time when needed.",
    },
] as const;

const TRUST_BOUNDARIES = [
    {
        label: "No fake guarantees",
        value:
            "Presence Infrastructure is meant to improve important business systems, not promise guaranteed rankings, guaranteed leads, or guaranteed revenue.",
    },
    {
        label: "Clear role",
        value:
            "This is the implementation and strengthening layer. It is not the first-read layer and it is not the monthly continuity layer.",
    },
    {
        label: "Practical value",
        value:
            "The value here comes from making the right improvements in the right places, not from adding technical-sounding work that does not help the customer experience.",
    },
    {
        label: "Better conversion through clarity",
        value:
            "The page should make it easy for the right customers to understand what the service does and why it matters, without hiding behind jargon.",
    },
] as const;

const FAQS = [
    {
        question: "What is Presence Infrastructure in simple terms?",
        answer:
            "It is the focused implementation layer where the business actually strengthens the website, messaging, trust signals, and customer journey after the strategy is already clearer.",
    },
    {
        question: "How is this different from Visibility Blueprint?",
        answer:
            "Visibility Blueprint is the deeper diagnosis and strategy review. Presence Infrastructure is the strengthening and implementation layer that usually comes after that clarity is already in place.",
    },
    {
        question: "What kinds of things does this help improve?",
        answer:
            "It helps improve the parts of the business presence that affect trust, customer understanding, positioning, and action — especially where the current structure is making the business harder to choose.",
    },
    {
        question: "What usually comes after Presence Infrastructure?",
        answer:
            "For many businesses, the next step is Presence Command, the ongoing monthly support layer that helps protect and improve the stronger base over time.",
    },
] as const;

const NEXT_MOVE_OPTIONS = [
    {
        title: "Go back to Visibility Blueprint",
        copy:
            "Best if the business still needs stronger diagnosis before focused implementation work makes sense.",
        href: "/pricing/full-diagnosis",
        cta: "View Visibility Blueprint",
    },
    {
        title: "Move into Presence Command",
        copy:
            "Best if the business already has a stronger base and now needs ongoing monthly support, upkeep, and smart adjustments over time.",
        href: "/pricing/monthly-partner",
        cta: "View Presence Command",
        highlighted: true,
    },
    {
        title: "Compare all system layers",
        copy:
            "Best if you still want to compare the full Cendorq sequence before deciding.",
        href: "/pricing",
        cta: "View System Layers",
    },
] as const;

export default function OptimizationPage() {
    const organizationJsonLd = buildOrganizationJsonLd();
    const websiteJsonLd = buildWebsiteJsonLd();

    const webPageJsonLd = buildWebPageJsonLd({
        title: `${BRAND_NAME} Presence Infrastructure`,
        description:
            "Presence Infrastructure is the focused implementation layer for businesses ready to strengthen the right parts of the business.",
        path: "/pricing/optimization",
    });

    const serviceJsonLd = buildServiceJsonLd({
        title: `${BRAND_NAME} Presence Infrastructure`,
        description:
            "A focused implementation layer for businesses ready to strengthen the website, messaging, trust signals, and customer journey.",
        path: "/pricing/optimization",
        serviceType: "Business visibility implementation",
    });

    const breadcrumbJsonLd = buildBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "System Layers", path: "/pricing" },
        { name: "Presence Infrastructure", path: "/pricing/optimization" },
    ]);

    const faqJsonLd = buildFaqJsonLd(FAQS);

    return (
        <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 text-white sm:px-6 md:py-16 xl:py-20">
            <InfrastructureAtmosphere />

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
                    <span className="text-cyan-100">Presence Infrastructure</span>
                </div>
            </section>

            <section className="relative z-10 grid gap-10 pt-10 lg:grid-cols-[0.93fr_1.07fr] lg:items-start">
                <div>
                    <TopChip>Presence Infrastructure</TopChip>

                    <h1 className="system-hero-title mt-5 max-w-5xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
                        The focused implementation layer
                        <span className="system-gradient-text block">
                            for businesses ready to strengthen what matters most.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                        Presence Infrastructure is for businesses that already know what needs
                        work and are ready to improve the website, messaging, trust signals,
                        and customer journey more directly.
                    </p>

                    <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                        In simple terms, this is the implementation layer. It is where the
                        right changes actually get made so the business becomes easier to trust,
                        easier to understand, and easier to choose.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <AuthorityPill>Focused implementation</AuthorityPill>
                        <AuthorityPill>Stronger trust and clarity</AuthorityPill>
                        <AuthorityPill>Better customer movement</AuthorityPill>
                    </div>

                    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                        <Link
                            href="/pricing/monthly-partner"
                            className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
                        >
                            View Presence Command
                        </Link>
                        <Link
                            href="/pricing/full-diagnosis"
                            className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
                        >
                            View Visibility Blueprint
                        </Link>
                    </div>

                    <div className="system-panel-authority mt-8 rounded-[1.8rem] p-5 sm:p-6">
                        <p className="system-eyebrow">What this service really does</p>

                        <h2 className="mt-4 text-2xl font-semibold text-white">
                            It strengthens the parts of the business that are making results harder than they should be.
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                            This is where clearer strategy turns into real improvement work. The
                            service is designed to strengthen the parts of the business that affect
                            trust, understanding, positioning, and customer action most directly.
                        </p>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                            <GuideTile
                                label="Primary objective"
                                value="Make the right business improvements in the right places"
                            />
                            <GuideTile
                                label="Main failure avoided"
                                value="Changing things blindly without clear priorities"
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
                                        Focused strengthening work
                                    </div>

                                    <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                                        This layer is for businesses that are ready to move from clarity into action.
                                    </h2>

                                    <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                                        If the diagnosis is already strong enough, Presence
                                        Infrastructure helps turn that understanding into the real
                                        improvements that customers and search surfaces actually react to.
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
                                    <span>Implementation after clarity</span>
                                </div>

                                <div className="system-status-bar mt-2 h-2">
                                    <span style={{ width: "91%" }} />
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
                    <TopChip>What gets strengthened</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        We focus on the parts of the business that most affect trust, understanding, and response.
                    </h2>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {WHAT_GETS_STRENGTHENED.map((item, index) => (
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
                    <TopChip>What it does</TopChip>

                    <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The goal is not more random activity. The goal is better business improvement work.
                    </h2>

                    <div className="mt-8 grid gap-4">
                        {WHAT_THIS_SERVICE_DOES.map((item, index) => (
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

            <section className="relative z-10 mt-20">
                <div className="max-w-3xl">
                    <TopChip>What you get</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The main result is a stronger business presence that is easier to trust, understand, and act on.
                    </h2>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2">
                    {WHAT_YOU_GET.map((item, index) => (
                        <TrustTile
                            key={item.label}
                            label={item.label}
                            value={item.value}
                            highlighted={index === 0}
                        />
                    ))}
                </div>
            </section>

            <section className="relative z-10 mt-20 grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
                <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8 md:p-10">
                    <TopChip>How it works</TopChip>

                    <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Good implementation work is focused, practical, and guided by clear priorities.
                    </h2>

                    <div className="mt-8 grid gap-4">
                        {HOW_IT_WORKS.map((item, index) => (
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
                    <TopChip>How to know if you need it</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Choose Presence Infrastructure when the business is ready for real improvement work, not more diagnosis.
                    </h2>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-3">
                    {HOW_TO_KNOW_IF_YOU_NEED_IT.map((item, index) => (
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
                    <TopChip>Common mistakes</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The service works better when the business avoids the mistakes that usually create wasted implementation.
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
                        Customers convert better when the service is explained in plain language.
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
                        Choose the next step that matches whether the business still needs clarity or is ready for ongoing support.
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
                        Use Presence Infrastructure when the business is ready to make the right improvements in the right places.
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-300">
                        If the diagnosis is already clear enough, this is where that clarity
                        turns into real strengthening work. The goal is to make the business
                        easier to trust, easier to understand, and easier for serious customers
                        to move forward with.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                        <Link
                            href="/pricing/monthly-partner"
                            className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
                        >
                            View Presence Command
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

function InfrastructureAtmosphere() {
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
