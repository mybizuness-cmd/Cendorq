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
    title: "Presence Command",
    description:
        "Presence Command is the ongoing Cendorq monthly support layer for businesses that need continued guidance, monitoring, upkeep, and strategic adjustments after the path is already clear.",
    path: "/pricing/monthly-partner",
    keywords: [
        "cendorq presence command",
        "presence command pricing",
        "monthly visibility support",
        "ongoing search presence support",
        "search visibility maintenance",
        "ai search visibility support",
        "answer engine visibility support",
        "monthly search strategy support",
        "visibility partner service",
        "ongoing business visibility help",
    ],
    image: {
        alt: "Cendorq Presence Command page — the ongoing monthly support layer for businesses that need continued guidance, upkeep, and strategic adjustments.",
    },
});

const HERO_READOUTS = [
    {
        label: "Layer",
        value: "Presence Command",
    },
    {
        label: "Primary role",
        value: "Ongoing monthly support",
    },
    {
        label: "Best after",
        value: "A clearer strategy and stronger base",
    },
    {
        label: "Main outcome",
        value: "Steady guidance over time",
    },
] as const;

const CORE_POSITIONING = [
    {
        title: "This is the monthly layer for businesses that need ongoing help, not one more one-time fix.",
        copy:
            "Presence Command exists for businesses that already have a clearer direction and need continued support to keep improving, adjusting, and protecting that progress over time.",
    },
    {
        title: "It is easier to understand as steady expert guidance and upkeep.",
        copy:
            "Instead of thinking of this as a vague retainer, think of it as an ongoing support layer that helps the business stay clear, current, and better positioned as search behavior and customer expectations keep changing.",
    },
    {
        title: "It works best when the business already has a stronger base to build on.",
        copy:
            "Monthly support becomes much more useful after the business has clearer priorities and stronger structure. Otherwise the monthly work can get wasted on problems that should have been solved earlier in the sequence.",
    },
] as const;

const WHAT_MONTHLY_SUPPORT_COVERS = [
    {
        label: "Monitoring",
        title: "Keep watching what is changing so the business does not fall behind quietly.",
        copy:
            "Search results, answer engines, customer expectations, competitor behavior, and business signals change over time. This layer helps the business keep paying attention to what matters instead of drifting.",
    },
    {
        label: "Adjustments",
        title: "Make smarter changes as new issues or opportunities appear.",
        copy:
            "Not every month needs a major rebuild. Sometimes the strongest move is a smart adjustment, a correction, a refinement, or a clearer next step based on what is happening now.",
    },
    {
        label: "Maintenance",
        title: "Protect the strength of the systems the business already worked to build.",
        copy:
            "Good work can weaken if it is ignored. Presence Command helps keep important trust, clarity, positioning, and action systems from slowly degrading over time.",
    },
    {
        label: "Guidance",
        title: "Keep the business from guessing its next move every month.",
        copy:
            "This layer helps the business make better ongoing decisions without having to restart the strategy conversation from zero each time something changes.",
    },
] as const;

const WHAT_IT_DOES = [
    {
        title: "Helps the business stay aligned as the market keeps moving.",
        copy:
            "Customer behavior, search surfaces, competitor positioning, and trust signals do not stay still. Presence Command helps the business stay responsive without becoming reactive and chaotic.",
    },
    {
        title: "Turns isolated wins into steadier progress.",
        copy:
            "One strong improvement matters. A series of smart monthly improvements matters more. This layer helps turn a cleaner base into more consistent long-term progress.",
    },
    {
        title: "Reduces the risk of losing ground after earlier work was completed.",
        copy:
            "Many businesses do the hard work once and then slowly slip because no one is watching, maintaining, or adjusting the system afterward. This layer helps prevent that.",
    },
] as const;

const BEST_FOR = [
    "Businesses that already have a clearer direction and need ongoing support to stay sharp.",
    "Businesses that want monthly expert guidance instead of having to solve every visibility issue alone.",
    "Businesses that want help maintaining and improving trust, clarity, positioning, and customer action paths over time.",
    "Businesses that understand good visibility is not a one-time event and want steady support instead of random last-minute fixes.",
] as const;

const NOT_FOR = [
    "Businesses that still need a first serious read before monthly support would make sense.",
    "Businesses that still need a deeper explanation of the real problem before paying for ongoing work.",
    "Businesses expecting a monthly plan to magically fix problems that were never clearly diagnosed or strengthened first.",
    "Businesses looking for guaranteed rankings, guaranteed leads, or guaranteed revenue promises.",
] as const;

const WHAT_YOU_GET = [
    {
        label: "Ongoing strategic help",
        value:
            "Regular support so the business does not have to guess what to do next whenever conditions change.",
    },
    {
        label: "Monthly visibility upkeep",
        value:
            "A steadier way to maintain and improve the systems that influence trust, clarity, customer preference, and action.",
    },
    {
        label: "Smarter adaptation",
        value:
            "Better decisions about what to adjust, what to protect, and what to ignore as new signals appear.",
    },
    {
        label: "Longer-term continuity",
        value:
            "A stronger chance of keeping progress moving instead of letting earlier gains fade through neglect.",
    },
] as const;

const HOW_IT_WORKS = [
    {
        title: "Start from the current reality, not a template.",
        copy:
            "The monthly work should reflect what is actually happening with the business now, not force the same generic activity every month.",
    },
    {
        title: "Review what changed, what weakened, and what deserves attention now.",
        copy:
            "Each month should be guided by what the business is facing in real time, whether that means protecting what is working, fixing drift, or responding to new pressure.",
    },
    {
        title: "Make focused updates instead of random busywork.",
        copy:
            "The point is not to manufacture tasks. The point is to make the right updates at the right time so the business keeps improving with less waste.",
    },
    {
        title: "Keep building on what is already stronger.",
        copy:
            "Presence Command should compound a better base. It should not restart the whole system every month unless something major has clearly changed.",
    },
] as const;

const DECISION_SIGNALS = [
    {
        title: "Choose Presence Command when the business needs continued support, not another first read.",
        copy:
            "If the direction is already much clearer, the stronger move may be steady monthly help instead of going back to the beginning.",
    },
    {
        title: "Choose Presence Command when maintenance and adaptation are now more important than large one-time changes.",
        copy:
            "This usually means the business already has a stronger base and now needs ongoing attention to keep that base useful and current.",
    },
    {
        title: "Choose Presence Command when the business wants a real partner for ongoing visibility decisions.",
        copy:
            "This layer is for businesses that do not want to be left alone after earlier work and would rather keep improving with guidance over time.",
    },
] as const;

const MISFIRES = [
    {
        title: "Trying to use monthly support to replace missing earlier work.",
        copy:
            "If the business still lacks a clear first signal or a strong explanation of the real problem, monthly support can become an expensive way to stay unclear.",
    },
    {
        title: "Paying for continuity before the structure underneath it is strong enough.",
        copy:
            "Presence Command is better at protecting and improving a stronger base than it is at compensating for a weak one.",
    },
    {
        title: "Expecting monthly work to mean constant major change.",
        copy:
            "Good monthly support is not endless disruption. Often it is steady monitoring, smart maintenance, and targeted improvements when they are actually needed.",
    },
] as const;

const TRUST_BOUNDARIES = [
    {
        label: "No fake guarantees",
        value:
            "Presence Command is built to provide steady support, better decisions, and ongoing improvement, not guaranteed rankings, guaranteed leads, or guaranteed revenue.",
    },
    {
        label: "Clear monthly role",
        value:
            "This layer is for ongoing guidance, monitoring, upkeep, and adjustments. It is not a substitute for earlier-stage work the business still has not done.",
    },
    {
        label: "Simple operating logic",
        value:
            "The monthly support is strongest when it protects and improves a clearer base instead of trying to solve every unclear problem at once.",
    },
    {
        label: "Long-term realism",
        value:
            "Better visibility usually comes from steady improvement over time, not from one dramatic promise that ignores how real markets and search systems actually work.",
    },
] as const;

const FAQS = [
    {
        question: "When is Presence Command the right layer?",
        answer:
            "Presence Command is the right layer when the business already has a clearer direction and needs ongoing support, maintenance, monitoring, and smart adjustments over time.",
    },
    {
        question: "How is Presence Command different from Presence Infrastructure?",
        answer:
            "Presence Infrastructure is a more concentrated strengthening layer. Presence Command is the ongoing monthly support layer that helps the business maintain and improve after the base is stronger.",
    },
    {
        question: "What does monthly support actually help with?",
        answer:
            "It helps with staying current, protecting earlier improvements, making smarter updates, noticing new problems sooner, and keeping the business from drifting as conditions change.",
    },
    {
        question: "Should every business go straight into Presence Command?",
        answer:
            "No. It works best after the business has already developed clearer priorities and a stronger base. Otherwise the monthly work can get spent on problems that should have been solved earlier.",
    },
] as const;

const NEXT_MOVES = [
    {
        title: "Go back to Presence Infrastructure",
        copy:
            "Use Presence Infrastructure if the business still needs stronger structural reinforcement before ongoing monthly support will be fully useful.",
        href: "/pricing/optimization",
        cta: "View Presence Infrastructure",
    },
    {
        title: "Start with first signal instead",
        copy:
            "Use Search Presence Scan if the business is still too early in the process for monthly support to make sense.",
        href: "/free-check",
        cta: "Start Search Presence Scan",
    },
    {
        title: "Contact Cendorq about fit",
        copy:
            "Use direct contact when the business already knows it needs ongoing support and wants to talk through whether Presence Command is the right match.",
        href: "/contact",
        cta: "Contact Cendorq",
        highlighted: true,
    },
] as const;

export default function MonthlyPartnerPage() {
    const organizationJsonLd = buildOrganizationJsonLd();
    const websiteJsonLd = buildWebsiteJsonLd();

    const webPageJsonLd = buildWebPageJsonLd({
        title: `${BRAND_NAME} Presence Command`,
        description:
            "Presence Command is the ongoing monthly support layer for businesses that need continued guidance, monitoring, upkeep, and strategic adjustments.",
        path: "/pricing/monthly-partner",
    });

    const serviceJsonLd = buildServiceJsonLd({
        title: `${BRAND_NAME} Presence Command`,
        description:
            "An ongoing monthly support layer for businesses that need continued visibility guidance, maintenance, monitoring, and strategic adjustments.",
        path: "/pricing/monthly-partner",
        serviceType: "Ongoing visibility support",
    });

    const breadcrumbJsonLd = buildBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "System Layers", path: "/pricing" },
        { name: "Presence Command", path: "/pricing/monthly-partner" },
    ]);

    const faqJsonLd = buildFaqJsonLd(FAQS);

    return (
        <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 text-white sm:px-6 md:py-16 xl:py-20">
            <CommandAtmosphere />

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
                    <span className="text-cyan-100">Presence Command</span>
                </div>
            </section>

            <section className="relative z-10 grid gap-10 pt-10 lg:grid-cols-[0.93fr_1.07fr] lg:items-start">
                <div>
                    <TopChip>Presence Command</TopChip>

                    <h1 className="system-hero-title mt-5 max-w-5xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
                        The monthly support layer
                        <span className="system-gradient-text block">
                            for businesses that need steady guidance over time.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                        Presence Command is the {BRAND_NAME} layer for businesses that already
                        have a clearer path and need ongoing support to keep improving,
                        adjusting, and protecting that progress month after month.
                    </p>

                    <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                        In simpler terms, this is the ongoing help layer. It is for businesses
                        that do not want to figure everything out alone every month and would
                        rather have steady guidance, upkeep, and smarter next steps over time.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <AuthorityPill>Ongoing monthly support</AuthorityPill>
                        <AuthorityPill>Monitoring and upkeep</AuthorityPill>
                        <AuthorityPill>Smarter monthly decisions</AuthorityPill>
                    </div>

                    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                        <Link
                            href="/contact"
                            className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
                        >
                            Contact Cendorq
                        </Link>
                        <Link
                            href="/pricing/optimization"
                            className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
                        >
                            View Presence Infrastructure
                        </Link>
                    </div>

                    <div className="system-panel-authority mt-8 rounded-[1.8rem] p-5 sm:p-6">
                        <p className="system-eyebrow">What this layer is really for</p>

                        <h2 className="mt-4 text-2xl font-semibold text-white">
                            It helps the business stay on track after earlier work is already clearer.
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                            Presence Command is not meant to be a confusing monthly package with
                            unclear value. Its job is to help the business keep moving in the
                            right direction, catch issues sooner, protect what was already
                            improved, and make smarter adjustments as new conditions appear.
                        </p>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                            <GuideTile
                                label="Primary objective"
                                value="Provide steady monthly support after the path is clearer"
                            />
                            <GuideTile
                                label="Main failure avoided"
                                value="Letting earlier progress weaken through drift or neglect"
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
                                        Ongoing support layer active
                                    </div>

                                    <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                                        This layer is best understood as monthly guidance, not monthly noise.
                                    </h2>

                                    <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                                        Presence Command works best when the business already has a
                                        stronger base and now needs consistent expert help to keep that
                                        base useful, current, and improving over time.
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
                                    <span>Monthly posture</span>
                                    <span>Support with continuity</span>
                                </div>

                                <div className="system-status-bar mt-2 h-2">
                                    <span style={{ width: "92%" }} />
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
                    <TopChip>What monthly support covers</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Presence Command keeps the business supported after the main direction is already clearer.
                    </h2>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {WHAT_MONTHLY_SUPPORT_COVERS.map((item, index) => (
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
                        Presence Command is built to keep good work from fading and help the business keep improving.
                    </h2>

                    <div className="mt-8 grid gap-4">
                        {WHAT_IT_DOES.map((item, index) => (
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
                        The main value is steady support that helps the business stay strong and adapt sensibly.
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
                        Good monthly support should feel steady, clear, and useful — not vague or busy.
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
                    <TopChip>Decision signals</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Choose Presence Command when ongoing support is now more useful than starting over again.
                    </h2>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-3">
                    {DECISION_SIGNALS.map((item, index) => (
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
                        Monthly support becomes much more valuable when the business avoids the wrong expectations.
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
                        The layer becomes easier to understand when the monthly-support questions are answered plainly.
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
                        Use Presence Command only when the business is ready for steady ongoing support.
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
                            highlighted={index === 2}
                        />
                    ))}
                </div>
            </section>

            <section className="relative z-10 mt-20">
                <div className="system-panel-authority rounded-[2rem] p-6 text-center sm:p-8 md:p-10">
                    <TopChip>Best next move</TopChip>

                    <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Choose Presence Command when the business needs a steady partner to help it stay sharp over time.
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-300">
                        If the business already has a clearer direction and stronger base,
                        monthly support can be the smartest next step. It helps protect earlier
                        progress, respond to change more calmly, and keep improvement moving
                        without starting from scratch every month.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                        <Link
                            href="/contact"
                            className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
                        >
                            Contact Cendorq
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

function CommandAtmosphere() {
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
