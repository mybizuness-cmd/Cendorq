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
const TERMS_DATE = "Effective date: April 2026";

export const metadata = buildMetadata({
    title: "Terms",
    description:
        "Read the Cendorq terms to understand platform rules, service boundaries, scope logic, expectation limits, acceptable use, and the operating structure behind the Search Presence OS system.",
    path: "/terms",
    keywords: [
        "cendorq terms",
        "search presence os terms",
        "service terms",
        "platform rules",
        "scope boundaries",
        "cendorq service boundaries",
        "search presence platform terms",
        "search presence os rules",
    ],
    imageAlt:
        "Cendorq terms page — clear service boundaries, scope rules, and operating expectations for the platform.",
});

const READOUTS = [
    {
        label: "Primary role",
        value: "Clarify service boundaries and operating rules",
    },
    {
        label: "Main purpose",
        value: "Explain what the platform is, what it is not, and how it should be used",
    },
    {
        label: "Trust posture",
        value: "Explicit boundaries over vague assumptions",
    },
    {
        label: "Best reading rule",
        value: "Assume only what is clearly stated",
    },
] as const;

const TERMS_PRINCIPLES = [
    {
        label: "Clear scope",
        title: "Each layer has a role, and that role should stay explicit.",
        copy:
            "The strongest service terms reduce confusion by making it clear what each layer is for, where its boundaries sit, and why one step should not be assumed to include another unless that inclusion is explicitly stated.",
    },
    {
        label: "Reality-first expectations",
        title: "The service should not be misread as a promise engine.",
        copy:
            "A serious business system should avoid encouraging assumptions that every action guarantees results. The terms exist in part to keep the relationship grounded in reality instead of inflated expectation.",
    },
    {
        label: "Lawful, honest use",
        title: "The platform should be used with integrity.",
        copy:
            "The system is built for serious businesses, serious inquiries, and serious communication. Misuse, deceptive use, fraudulent use, abusive input, or attempts to manipulate the system undermine the platform and violate its intended operating posture.",
    },
    {
        label: "Boundary-protected delivery",
        title: "Clear boundaries protect both trust and service quality.",
        copy:
            "When scope is explicit, the platform becomes easier to trust, easier to understand, and less likely to collapse into vague, undefined expectations that hurt both the user and the system.",
    },
] as const;

const WHAT_THESE_TERMS_COVER = [
    {
        title: "Use of the platform",
        copy:
            "These terms explain the basic rules for how the site, system path, forms, plan layers, and related communication channels should be used.",
    },
    {
        title: "Service structure and scope",
        copy:
            "These terms help explain how the layers of the Cendorq system are separated, why they are separated, and how to avoid confusing one layer with another.",
    },
    {
        title: "Expectation boundaries",
        copy:
            "These terms help prevent assumptions about guaranteed outcomes, unlimited support, or bundled work that was never clearly offered.",
    },
    {
        title: "Platform integrity and protection",
        copy:
            "These terms also support the platform’s right to protect itself against abusive behavior, fraud, spam, low-integrity use, and misuse of its operating routes.",
    },
] as const;

const CORE_RULES = [
    {
        step: "01",
        title: "Use the platform honestly",
        copy:
            "Businesses should provide real information, communicate in good faith, and use the route that actually matches their purpose instead of distorting the system with fake, misleading, or manipulative input.",
    },
    {
        step: "02",
        title: "Do not assume one layer includes another",
        copy:
            "Search Presence Scan, Visibility Blueprint, Presence Infrastructure, Presence Command, and Contact each exist for distinct reasons. A user should not assume that choosing one automatically includes additional layers or undefined services unless explicitly stated.",
    },
    {
        step: "03",
        title: "Do not treat the platform like a guarantee engine",
        copy:
            "The system is built to improve interpretation, decision quality, and strategic direction. It should not be read as a guarantee of rankings, leads, sales, revenue, or full control over external market behavior.",
    },
    {
        step: "04",
        title: "Respect communication and support boundaries",
        copy:
            "Contact and support routes should be used for legitimate, bounded communication rather than as a substitute for vague open-ended consulting, abusive communication, or attempts to stretch scope beyond what is clearly defined.",
    },
] as const;

const WHY_TERMS_MATTER = [
    {
        title: "Because weak assumptions quietly damage strong systems.",
        copy:
            "A platform can be carefully built and still become harder to trust if users assume more than was actually offered. Terms help prevent those assumptions from becoming the default operating logic.",
    },
    {
        title: "Because trust improves when scope is readable.",
        copy:
            "The clearer the service boundaries, the easier it becomes for a business to understand what it is buying, what it is not buying, and what kind of next step actually makes sense.",
    },
    {
        title: "Because serious systems should not hide behind ambiguity.",
        copy:
            "The terms are meant to make the operating logic more visible, not less. Strong terms strengthen the platform by making the boundaries harder to misread.",
    },
] as const;

const SERVICE_BOUNDARIES = [
    "Search Presence Scan is a first-signal layer, not a disguised deeper paid analysis.",
    "Visibility Blueprint is a deeper explanation layer, not undefined implementation scope.",
    "Presence Infrastructure is concentrated one-time strengthening, not hidden unlimited support.",
    "Presence Command is recurring strategic continuity, not a substitute for missing first signal or missing diagnosis.",
    "Contact is a routing and communication layer, not a replacement for the structured system path.",
] as const;

const ACCEPTABLE_USE = [
    {
        title: "No fraudulent, deceptive, or abusive use.",
        copy:
            "The platform may not be used to submit fake business information, impersonate others, misrepresent authority, send abusive communications, or attempt to manipulate internal routing or review logic dishonestly.",
    },
    {
        title: "No interference with platform integrity.",
        copy:
            "Users should not attempt to disrupt, overload, probe, reverse-engineer, scrape in abusive ways, or interfere with the operation, security, availability, or integrity of the site or its intake and routing systems.",
    },
    {
        title: "No misuse of protected materials or access.",
        copy:
            "Users should not attempt to obtain unauthorized access, reuse private materials without permission, or treat protected internal surfaces, system logic, or outputs as open public resources when they are not.",
    },
] as const;

const COMMERCIAL_BOUNDARIES = [
    {
        label: "Scope exists where it is clearly stated",
        value:
            "Only the layer, deliverable posture, or communication boundary that is actually stated should be assumed to exist.",
    },
    {
        label: "Pricing does not erase boundaries",
        value:
            "Paying for one layer does not automatically convert that layer into unlimited consulting, unlimited implementation, or unrestricted ongoing support.",
    },
    {
        label: "Delivery depends on fit, clarity, and actual agreement",
        value:
            "A serious service relationship depends on clear fit, clean communication, and an actual defined agreement—not on implied assumptions carried across unrelated layers.",
    },
    {
        label: "Future changes may update structure",
        value:
            "The platform may refine pricing, structure, sequence, naming, positioning, or layer logic over time without those changes rewriting past scope beyond what was clearly agreed.",
    },
] as const;

const RESERVATION_RIGHTS = [
    {
        title: "Cendorq may refuse, pause, limit, or stop use when integrity is at risk.",
        copy:
            "The platform may protect itself when behavior appears abusive, fraudulent, manipulative, high-risk, unlawful, or incompatible with the intended operating posture of the system.",
    },
    {
        title: "Cendorq may update, restructure, or discontinue parts of the platform.",
        copy:
            "The site, routes, layers, features, names, pricing, or surrounding materials may change over time as the platform evolves, improves, or is restructured.",
    },
    {
        title: "Cendorq may preserve the right to protect its work, systems, and communications.",
        copy:
            "That includes the right to safeguard its materials, processes, internal tools, platform routes, and the overall quality of the experience against degradation or misuse.",
    },
] as const;

const PRACTICAL_QUESTIONS = [
    {
        question: "Why do the terms emphasize that each layer is separate?",
        answer:
            "Because the system is intentionally sequenced. If users assume that one layer automatically includes other layers, the path becomes harder to understand and easier to misuse. Separation protects clarity, trust, and scope discipline.",
    },
    {
        question: "Why do the terms avoid promising guaranteed outcomes?",
        answer:
            "Because no serious platform should promise control over every external variable that affects business outcomes. The service is designed to improve signal, interpretation, direction, and next-step quality, not to guarantee market behavior.",
    },
    {
        question: "Why do the terms talk about integrity and misuse?",
        answer:
            "Because a high-integrity platform should protect itself against spam, fraud, abusive communication, fake submissions, and other behavior that reduces system quality or distorts the service relationship.",
    },
    {
        question: "What is the strongest way to use the terms?",
        answer:
            "Use them to understand the service structure clearly. They are here to make the platform’s role easier to read, the scope easier to respect, and the path harder to confuse.",
    },
] as const;

const BOUNDARIES = [
    {
        label: "What these terms are for",
        value: "Clarify service rules, scope logic, and platform expectations",
    },
    {
        label: "What these terms are not for",
        value: "Hiding vague obligations or manufacturing false certainty",
    },
    {
        label: "What strengthens trust most",
        value: "Clear boundaries, readable scope, explicit expectations",
    },
    {
        label: "Core principle",
        value: "Assume only what is clearly stated",
    },
] as const;

const NEXT_MOVE_OPTIONS = [
    {
        title: "Read Privacy",
        copy:
            "Use this next if you want to understand how submitted information may be used, why it matters, and where privacy boundaries sit.",
        href: "/privacy",
        cta: "Read privacy",
        highlighted: true,
    },
    {
        title: "Read Disclaimer",
        copy:
            "Use this next if you want to understand the claim boundaries, no-guarantee posture, and interpretation limits behind the platform.",
        href: "/disclaimer",
        cta: "Read disclaimer",
    },
    {
        title: "Contact for a serious question",
        copy:
            "Use this next if you have a legitimate service, trust, or scope-related question that needs direct clarification outside the core path.",
        href: "/contact",
        cta: "Go to contact",
    },
] as const;

export default function TermsPage() {
    const webPageJsonLd = buildWebPageJsonLd({
        title: `${BRAND_NAME} Terms`,
        description:
            "Understand the Cendorq terms governing platform use, service boundaries, scope logic, and operating expectations.",
        path: "/terms",
    });

    const serviceJsonLd = buildServiceJsonLd({
        title: `${BRAND_NAME} Terms and Platform Boundaries`,
        description:
            "A structured terms page covering platform use, service boundaries, scope logic, expectation posture, and operating rules across the Search Presence OS path.",
        path: "/terms",
    });

    return (
        <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 text-white sm:px-6 md:py-16 xl:py-20">
            <TermsAtmosphere />

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
                    <span className="text-cyan-100">Terms</span>
                </div>
            </section>

            <section className="relative z-10 grid gap-10 pt-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-start">
                <div>
                    <TopChip>Terms</TopChip>

                    <h1 className="system-hero-title mt-5 max-w-5xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
                        Clear service boundaries
                        <span className="system-gradient-text block">
                            for a serious search-presence platform.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                        These terms explain how {BRAND_NAME} should be used, how the service
                        layers are structured, where the boundaries of scope sit, and why the
                        platform is intentionally designed to prevent the wrong assumptions from
                        quietly replacing the real system logic.
                    </p>

                    <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                        The strongest terms make the platform easier to understand. They help
                        the business see what the system is for, what it is not for, and how
                        each route should be used without confusion, drift, or inflated expectation.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <AuthorityPill>Clear scope</AuthorityPill>
                        <AuthorityPill>Explicit expectations</AuthorityPill>
                        <AuthorityPill>Reality-first rules</AuthorityPill>
                    </div>

                    <div className="mt-8 text-sm font-medium uppercase tracking-[0.22em] text-slate-400">
                        {TERMS_DATE}
                    </div>

                    <div className="system-panel-authority mt-8 rounded-[1.8rem] p-5 sm:p-6">
                        <p className="system-eyebrow">What this page is really doing</p>

                        <h2 className="mt-4 text-2xl font-semibold text-white">
                            It is meant to make the service easier to read, not harder to decode.
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                            The terms should reduce misreading. They should make the role of the
                            platform, the logic of the layers, and the expectations around use
                            more visible instead of burying everything behind abstract language.
                        </p>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                            <GuideTile
                                label="Primary objective"
                                value="Make scope and expectations easier to understand"
                            />
                            <GuideTile
                                label="Main failure avoided"
                                value="Assuming more than was clearly offered"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid gap-4">
                    <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                            <div className="max-w-2xl">
                                <TopChip>Terms posture</TopChip>

                                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                                    The strongest terms make service logic harder to misread.
                                </h2>

                                <p className="mt-5 text-base leading-8 text-slate-300">
                                    {BRAND_NAME} is structured as a sequenced system, not a vague bundle
                                    of interchangeable promises. The terms exist to keep that structure
                                    readable so trust, scope, and service logic stay aligned.
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
                        <StatusTile label="Scope posture" value="Explicit" highlighted />
                        <StatusTile label="Trust posture" value="Readable" />
                        <StatusTile label="Use logic" value="Controlled" />
                    </div>

                    <div className="system-surface rounded-[1.7rem] p-6">
                        <p className="system-eyebrow">Best reading rule</p>
                        <p className="mt-4 text-base leading-8 text-slate-300">
                            Read the terms through service logic. The core question is not only
                            what rules exist, but how those rules protect clarity, scope, and
                            the integrity of the platform path.
                        </p>
                    </div>
                </div>
            </section>

            <section className="relative z-10 mt-20">
                <div className="max-w-3xl">
                    <TopChip>Terms principles</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The service posture is built around four terms principles.
                    </h2>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {TERMS_PRINCIPLES.map((item, index) => (
                        <PrincipleCard
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
                    <TopChip>What these terms cover</TopChip>

                    <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The terms exist to support platform clarity, service boundaries, and operating integrity.
                    </h2>

                    <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
                        Not every terms page serves the same purpose. Here, the terms are meant
                        to make the role of the platform easier to understand, the limits of
                        each service layer easier to respect, and the expectations around use
                        more consistent with how the system is actually designed to function.
                    </p>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        {WHAT_THESE_TERMS_COVER.map((item, index) => (
                            <CoverageCard
                                key={item.title}
                                title={item.title}
                                copy={item.copy}
                                highlighted={index === 0}
                            />
                        ))}
                    </div>
                </div>

                <div className="grid gap-4">
                    {WHY_TERMS_MATTER.map((item, index) => (
                        <ReasonCard
                            key={item.title}
                            title={item.title}
                            copy={item.copy}
                            highlighted={index === 0}
                        />
                    ))}

                    <div className="system-note-warning rounded-[1.5rem] p-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-200">
                            Important boundary
                        </p>
                        <p className="mt-3 text-sm leading-7 text-slate-200">
                            These terms are meant to strengthen clarity, not weaken it. They should
                            not be used to imply hidden unlimited scope, hidden guarantees, or
                            obligations that were never clearly offered through the platform.
                        </p>
                    </div>
                </div>
            </section>

            <section className="relative z-10 mt-20">
                <div className="max-w-3xl">
                    <TopChip>Core rules</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The service becomes easier to trust when the rules stay visible.
                    </h2>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {CORE_RULES.map((item, index) => (
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

            <section className="relative z-10 mt-20">
                <div className="max-w-3xl">
                    <TopChip>Acceptable use</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        High-integrity systems work better when platform use stays high-integrity too.
                    </h2>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-3">
                    {ACCEPTABLE_USE.map((item, index) => (
                        <ReasonCard
                            key={item.title}
                            title={item.title}
                            copy={item.copy}
                            highlighted={index === 0}
                        />
                    ))}
                </div>
            </section>

            <section className="relative z-10 mt-20 grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
                <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8 md:p-10">
                    <TopChip>Service boundaries</TopChip>

                    <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The path stays stronger when each layer keeps its own role.
                    </h2>

                    <div className="mt-8 grid gap-3">
                        {SERVICE_BOUNDARIES.map((item, index) => (
                            <BoundaryListItem
                                key={item}
                                value={item}
                                highlighted={index === 0}
                            />
                        ))}
                    </div>

                    <div className="system-surface mt-8 rounded-[1.5rem] p-5">
                        <p className="system-eyebrow">Practical interpretation</p>
                        <p className="mt-3 text-sm leading-7 text-slate-300">
                            The platform is intentionally sequenced. The cleaner the service
                            boundaries remain, the easier it becomes for a business to choose the
                            correct next move and the harder it becomes to confuse what was actually offered.
                        </p>
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
                    <TopChip>Commercial and scope posture</TopChip>

                    <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Commercial clarity matters because unclear scope quietly damages trust.
                    </h2>

                    <div className="mt-8 grid gap-4">
                        {COMMERCIAL_BOUNDARIES.map((item, index) => (
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
                    {RESERVATION_RIGHTS.map((item, index) => (
                        <InfoPanel
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
                        The strongest answers make the service easier to read in practical terms.
                    </h2>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2">
                    {PRACTICAL_QUESTIONS.map((item, index) => (
                        <QuestionCard
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
                    <TopChip>Next move options</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        After the terms are clearer, the surrounding trust pages should be easier to read too.
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
                    <TopChip>Final reading rule</TopChip>

                    <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Trust gets stronger when service boundaries stay readable.
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-300">
                        The strongest terms posture does not rely on vagueness or inflated implication.
                        It makes the structure easier to understand, the limits easier to respect,
                        and the relationship easier to trust because only what is clearly stated should be assumed.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                        <Link
                            href="/privacy"
                            className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
                        >
                            Read privacy
                        </Link>
                        <Link
                            href="/disclaimer"
                            className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
                        >
                            Read disclaimer
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

function TermsAtmosphere() {
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

function PrincipleCard({
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

function CoverageCard({
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
                    ? "system-chip rounded-[1.2rem] px-4 py-4 text-sm text-slate-100"
                    : "system-surface rounded-[1.2rem] px-4 py-4 text-sm text-slate-200"
            }
        >
            {value}
        </div>
    );
}

function QuestionCard({
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
            <h3 className="text-2xl font-semibold tracking-tight text-white">{question}</h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">{answer}</p>
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
            <h3 className="text-2xl font-semibold tracking-tight text-white">{title}</h3>
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