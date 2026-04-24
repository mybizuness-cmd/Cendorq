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
const POLICY_DATE = "Effective date: April 2026";

export const metadata = buildMetadata({
    title: `Privacy | ${BRAND_NAME}`,
    description:
        "Read the Cendorq privacy policy to understand what information may be collected, how it may be used, when it may be shared, how long it may be kept, and what trust boundaries protect the platform.",
    path: "/privacy",
    keywords: [
        "cendorq privacy",
        "cendorq privacy policy",
        "search presence os privacy",
        "search presence scan privacy",
        "business visibility privacy policy",
        "cendorq data handling",
        "cendorq data use",
        "cendorq information policy",
    ],
    imageAlt:
        "Cendorq privacy page — data handling boundaries, collection logic, retention posture, and trust protections.",
});

const READOUTS = [
    {
        label: "Primary goal",
        value: "Protect trust through clear data boundaries",
    },
    {
        label: "Core rule",
        value: "Collect what supports the system",
    },
    {
        label: "Primary use",
        value: "Improve routing, review, communication, and delivery",
    },
    {
        label: "Trust posture",
        value: "Explicit, bounded, and reality-first",
    },
] as const;

const CORE_PRINCIPLES = [
    {
        title: "Data should support the system path, not clutter it.",
        copy:
            "Cendorq is built around signal quality. Information is gathered so the business can be read more clearly, routed more cleanly, and supported more intelligently—not so unnecessary data can accumulate without purpose.",
    },
    {
        title: "Trust gets stronger when boundaries stay explicit.",
        copy:
            "This policy exists to make it clear what kinds of information may be collected, why they may matter, and where the platform intends the limits around use and sharing to stay.",
    },
    {
        title: "Privacy is part of product quality.",
        copy:
            "Strong privacy posture is not separate from strong platform posture. It supports seriousness, credibility, cleaner long-term trust, and more responsible system use.",
    },
] as const;

const COLLECTION_CATEGORIES = [
    {
        label: "Identity and contact details",
        title: "Information you provide about yourself or your business.",
        copy:
            "This can include items such as your name, email address, business name, website, location details, and other information submitted through Search Presence Scan, Contact, or other platform lanes.",
    },
    {
        label: "Business context",
        title: "Information that helps the system interpret the business more clearly.",
        copy:
            "This can include business type, offer description, audience context, competitor references, pressure points, notes, and other details that improve the quality of first signal or deeper review.",
    },
    {
        label: "Technical and usage information",
        title: "Information created by using the website or platform.",
        copy:
            "This can include browser, device, approximate region, visited pages, referring information, session behavior, and similar technical or analytics-style information used to understand site performance and product use.",
    },
    {
        label: "Communication records",
        title: "Information tied to direct communication with Cendorq.",
        copy:
            "If you communicate through contact or another direct lane, the platform may retain the content of that communication and related metadata so it can be understood, answered, and referenced appropriately.",
    },
] as const;

const USE_CASES = [
    {
        title: "Run and improve the platform",
        copy:
            "Information may be used to operate the site, maintain system quality, understand how the platform is being used, and improve structure, clarity, reliability, and user experience over time.",
    },
    {
        title: "Review and route business submissions",
        copy:
            "Information may be used to interpret business context, evaluate what layer may fit next, reduce confusion around sequence, and support the decision-quality role of the platform.",
    },
    {
        title: "Respond to inquiries and communicate appropriately",
        copy:
            "Information may be used to reply to messages, discuss fit, send operational follow-up, or continue communication reasonably connected to a user’s submission, route, or request.",
    },
    {
        title: "Protect the platform and its data quality",
        copy:
            "Information may be used to detect abuse, spam, duplicate submissions, low-integrity intake quality, malicious activity, or other patterns that degrade system integrity.",
    },
] as const;

const SHARING_RULES = [
    {
        label: "Service providers",
        value:
            "Information may be shared with carefully chosen infrastructure, hosting, analytics, security, or operational providers when reasonably needed to run, support, or protect the platform.",
    },
    {
        label: "Legal and safety reasons",
        value:
            "Information may be disclosed when reasonably necessary to comply with law, respond to valid legal process, protect rights, investigate misuse, or address safety or security issues.",
    },
    {
        label: "Business transfers",
        value:
            "If Cendorq is involved in a reorganization, financing, acquisition, or similar transaction, information may be transferred as part of that broader business event, subject to appropriate continuity of obligations.",
    },
    {
        label: "No broad resale logic",
        value:
            "The platform is not built around selling personal information as part of the core operating model described here.",
    },
] as const;

const RETENTION_SECURITY = [
    {
        title: "Retention follows practical business need.",
        copy:
            "Information may be retained for as long as reasonably needed to operate the platform, support communication, maintain records, protect the system, comply with law, or resolve legitimate business issues.",
    },
    {
        title: "Security matters, but no serious system should promise perfection.",
        copy:
            "Cendorq may use reasonable administrative, technical, and organizational measures to protect information, but no online system can honestly guarantee absolute security in every scenario.",
    },
    {
        title: "Data quality and system integrity are part of the privacy posture.",
        copy:
            "Retention, monitoring, and protective controls may also support fraud resistance, duplicate detection, abuse prevention, and higher-integrity intake quality across the system.",
    },
] as const;

const USER_CHOICES = [
    {
        title: "You can choose what information you submit.",
        copy:
            "You are not required to submit business information through Search Presence Scan or Contact, but some features and routing benefits only work well when sufficient signal is provided.",
    },
    {
        title: "You can ask questions about your information.",
        copy:
            "If you need clarification about submitted information, platform communication, or privacy handling, use the contact lane so the request can be reviewed appropriately.",
    },
    {
        title: "Browser and device controls may also apply.",
        copy:
            "Depending on the tools used in your environment, you may also have browser-level, cookie-level, or device-level controls that affect certain types of technical data collection.",
    },
] as const;

const ADDITIONAL_BOUNDARIES = [
    {
        title: "Cookies and similar tools may be used.",
        copy:
            "The platform may use cookies, pixels, local storage, or similar technologies to support core functionality, analytics, security, performance understanding, and a cleaner product experience.",
    },
    {
        title: "Third-party tools may process information on the platform’s behalf.",
        copy:
            "When outside providers are used for hosting, analytics, communications, form handling, or system operations, those providers may process relevant information only in ways reasonably connected to their role.",
    },
    {
        title: "Information may be processed across different regions.",
        copy:
            "If infrastructure, providers, or team operations span multiple jurisdictions, information may be processed or stored outside your local region, subject to the platform’s intended privacy and security posture.",
    },
] as const;

const RIGHTS_NOTICES = [
    {
        label: "Access and correction",
        value:
            "Depending on your location and the circumstances, you may be able to request access to certain information or ask that it be corrected.",
    },
    {
        label: "Deletion and limitation",
        value:
            "Depending on applicable law and legitimate business need, you may be able to request deletion or limited handling of certain information.",
    },
    {
        label: "Communication preferences",
        value:
            "You may be able to reduce or stop certain non-essential communications by contacting the platform or using the communication controls available to you.",
    },
    {
        label: "Practical limits still exist",
        value:
            "Some requests may be limited by security, identity verification, legal obligations, operational necessity, or the need to preserve system integrity.",
    },
] as const;

const POLICY_UPDATES = [
    {
        title: "The policy may change as the platform evolves.",
        copy:
            "Cendorq may update this privacy policy to reflect product changes, infrastructure changes, legal changes, or clearer communication of existing practices.",
    },
    {
        title: "The current version is the one that governs current use.",
        copy:
            "When the policy changes, the platform may update the effective date and replace the prior language with the newer version.",
    },
    {
        title: "Serious changes should still remain understandable.",
        copy:
            "Even when updates occur, the privacy posture is intended to stay explicit enough that users can understand the practical boundary logic behind them.",
    },
] as const;

const TRUST_BOUNDARIES = [
    {
        label: "What this policy is for",
        value:
            "Clear data boundaries around collection, use, sharing, retention, and trust.",
    },
    {
        label: "What this policy is not for",
        value:
            "Inflated claims of perfect control, perfect security, or unlimited rights beyond what the platform actually supports.",
    },
    {
        label: "Primary privacy bias",
        value:
            "Collect and use information in ways that support legitimate platform function and cleaner decision-quality outcomes.",
    },
    {
        label: "Primary trust bias",
        value:
            "Say clearly what the system is doing instead of hiding behind vague policy language.",
    },
] as const;

const FAQS = [
    {
        question: "Why does Cendorq collect business information at all?",
        answer:
            "Because the platform is built around signal quality. Business information helps the system interpret the business more clearly, route it more cleanly, and support better next-step judgment.",
    },
    {
        question: "Does Cendorq promise perfect privacy or perfect security?",
        answer:
            "No. A serious privacy posture uses reasonable protections while being explicit that no online system can honestly guarantee perfection in every scenario.",
    },
    {
        question:
            "Will submitted information be shared broadly or sold as the core business model?",
        answer:
            "This policy does not describe a broad resale model. Information may be shared in bounded ways with service providers, for legal reasons, or during business transfers when reasonably necessary.",
    },
    {
        question: "What is the strongest way to read this privacy page?",
        answer:
            "Read it as a boundary document: what the platform may collect, why it may matter, how it may be used, when it may be shared, and where reality-first limits still remain.",
    },
] as const;

export default function PrivacyPage() {
    const webPageJsonLd = buildWebPageJsonLd({
        title: `${BRAND_NAME} Privacy Policy`,
        description:
            "Understand what information Cendorq may collect, how it may be used, and what boundaries help protect trust.",
        path: "/privacy",
    });

    const serviceJsonLd = buildServiceJsonLd({
        title: `${BRAND_NAME} Privacy and Data Boundaries`,
        description:
            "A structured privacy policy covering what information may be collected, how it may be used, when it may be shared, and what trust boundaries protect the platform.",
        path: "/privacy",
    });

    return (
        <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 text-white sm:px-6 md:py-16 xl:py-20">
            <PrivacyAtmosphere />

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
                    <span className="text-cyan-100">Privacy</span>
                </div>
            </section>

            <section className="relative z-10 grid gap-10 pt-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-start">
                <div>
                    <TopChip>Privacy</TopChip>

                    <h1 className="system-hero-title mt-5 max-w-5xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
                        Privacy should strengthen trust,
                        <span className="system-gradient-text block">
                            not disappear behind vague language.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                        This privacy policy explains what information {BRAND_NAME} may collect,
                        how that information may be used, when it may be shared, how long it may
                        be retained, and what boundaries are intended to protect trust while the
                        platform operates.
                    </p>

                    <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                        {BRAND_NAME} is a Search Presence OS. That means some information may
                        be collected to support clearer routing, stronger signal quality,
                        cleaner communication, better delivery, and higher-integrity decision quality
                        across the platform.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <AuthorityPill>Explicit boundaries</AuthorityPill>
                        <AuthorityPill>Reasonable collection</AuthorityPill>
                        <AuthorityPill>Reality-first posture</AuthorityPill>
                    </div>

                    <div className="mt-8 text-sm font-medium uppercase tracking-[0.22em] text-slate-400">
                        {POLICY_DATE}
                    </div>

                    <div className="system-panel-authority mt-8 rounded-[1.8rem] p-5 sm:p-6">
                        <p className="system-eyebrow">What this policy is really doing</p>

                        <h2 className="mt-4 text-2xl font-semibold text-white">
                            It is meant to make data handling easier to understand before trust has to guess.
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                            A serious privacy policy should not hide the role of information
                            behind legal fog. It should explain what categories of information
                            matter, why they may matter, and how the platform intends to stay
                            inside clearer boundaries while using them.
                        </p>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                            <GuideTile
                                label="Primary objective"
                                value="Make privacy handling easier to understand"
                            />
                            <GuideTile
                                label="Main failure avoided"
                                value="Weak trust caused by vague or inflated policy language"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid gap-4">
                    <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                            <div className="max-w-2xl">
                                <TopChip>Privacy posture</TopChip>

                                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                                    Privacy is part of platform quality, not a side note added after trust is already at risk.
                                </h2>

                                <p className="mt-5 text-base leading-8 text-slate-300">
                                    The platform is built around signal quality and strategic clarity.
                                    That means data should be collected and used in ways that support
                                    legitimate system function instead of creating unnecessary opacity,
                                    unnecessary drift, or unnecessary trust damage.
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
                        <StatusTile label="Collection style" value="Purpose-led" highlighted />
                        <StatusTile label="Sharing style" value="Bounded" />
                        <StatusTile label="Trust style" value="Explicit" />
                    </div>

                    <div className="system-surface rounded-[1.7rem] p-6">
                        <p className="system-eyebrow">Best reading rule</p>
                        <p className="mt-4 text-base leading-8 text-slate-300">
                            Read this policy as a boundary document: what the platform may
                            collect, what it may use, what it may share, and where its
                            reality-first limitations remain.
                        </p>
                    </div>
                </div>
            </section>

            <section className="relative z-10 mt-20">
                <div className="max-w-3xl">
                    <TopChip>Core principles</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The privacy posture is built around a few simple principles.
                    </h2>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-3">
                    {CORE_PRINCIPLES.map((item, index) => (
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
                    <TopChip>Information that may be collected</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The platform may collect information that supports signal quality, communication, and system function.
                    </h2>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {COLLECTION_CATEGORIES.map((item, index) => (
                        <PolicyCard
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
                    <TopChip>How information may be used</TopChip>

                    <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Information should support legitimate platform function, not vague expansion of scope.
                    </h2>

                    <div className="mt-8 grid gap-4">
                        {USE_CASES.map((item, index) => (
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
                    {SHARING_RULES.map((item, index) => (
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
                    <TopChip>Additional privacy boundaries</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Privacy posture stays stronger when adjacent boundaries are named clearly too.
                    </h2>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-3">
                    {ADDITIONAL_BOUNDARIES.map((item, index) => (
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
                    <TopChip>Retention and security</TopChip>

                    <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Serious privacy posture includes protection, but it should not pretend perfect control exists.
                    </h2>

                    <div className="mt-8 grid gap-4">
                        {RETENTION_SECURITY.map((item, index) => (
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
                    {USER_CHOICES.map((item, index) => (
                        <InfoPanel
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
                            No online platform can honestly guarantee absolute security in all
                            circumstances. The right trust posture is to use reasonable protections
                            while being explicit that perfection is not a serious promise.
                        </p>
                    </div>
                </div>
            </section>

            <section className="relative z-10 mt-20 grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
                <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8 md:p-10">
                    <TopChip>Requests and practical rights</TopChip>

                    <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Privacy becomes more usable when users can understand what they may be able to ask for.
                    </h2>

                    <div className="mt-8 grid gap-4">
                        {RIGHTS_NOTICES.map((item, index) => (
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
                    <InfoPanel
                        title="Identity verification may matter"
                        copy="Before acting on certain requests, the platform may need enough information to verify that the request is legitimate and tied to the correct person or business."
                        highlighted
                    />
                    <InfoPanel
                        title="Operational need may still matter"
                        copy="Some information may need to be kept for fraud prevention, legal compliance, dispute handling, security, or legitimate recordkeeping even when a request is made."
                    />
                    <InfoPanel
                        title="The cleanest route for privacy questions"
                        copy="Use the contact lane when a practical privacy question, data question, or communication question needs review."
                    />
                </div>
            </section>

            <section className="relative z-10 mt-20">
                <div className="max-w-3xl">
                    <TopChip>Trust boundaries</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The privacy document should be easy to read as a boundary system.
                    </h2>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {TRUST_BOUNDARIES.map((item, index) => (
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
                    <TopChip>Policy updates</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The policy can evolve, but it should remain understandable when it does.
                    </h2>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-3">
                    {POLICY_UPDATES.map((item, index) => (
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
                    <TopChip>Practical privacy questions</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The strongest privacy answers make boundaries easier to understand in practical terms.
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
                <div className="system-panel-authority rounded-[2rem] p-6 text-center sm:p-8 md:p-10">
                    <TopChip>Questions about privacy</TopChip>

                    <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Use the contact lane if you need clarification about privacy handling.
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-300">
                        If you have a legitimate privacy question, a communication question,
                        or a concern about submitted business information, use the contact
                        route so the request can be reviewed inside the proper lane.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                        <Link
                            href="/contact"
                            className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
                        >
                            Go to contact
                        </Link>
                        <Link
                            href="/terms"
                            className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
                        >
                            Read terms
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

function PrivacyAtmosphere() {
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

function PolicyCard({
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