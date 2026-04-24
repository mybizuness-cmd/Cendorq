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
    title: "Contact",
    description:
        "Use the Cendorq contact page to choose the right communication lane, avoid the wrong one, and route business questions into the cleanest next step.",
    path: "/contact",
    keywords: [
        "cendorq contact",
        "contact cendorq",
        "search presence scan contact",
        "visibility blueprint contact",
        "presence command contact",
        "cendorq inquiry",
        "search presence os contact",
    ],
    imageAlt:
        "Cendorq contact page — choose the right communication lane before entering the wrong one.",
});

const contactEmail = normalizeEmail(process.env.NEXT_PUBLIC_CONTACT_EMAIL);
const hasDirectEmail = Boolean(contactEmail);
const directEmailHref = hasDirectEmail ? `mailto:${contactEmail}` : "";

const heroReadouts = [
    {
        label: "Primary contact bias",
        value: "Route by stage",
    },
    {
        label: "Strongest first lane",
        value: "Search Presence Scan",
    },
    {
        label: "Best direct discussion",
        value: "Fit, scope, or Presence Command",
    },
    {
        label: "Trust posture",
        value: "Clear lanes, clear boundaries",
    },
] as const;

const contactLanes = [
    {
        label: "Best first move",
        title: "Search Presence Scan",
        copy:
            "Use this when the business still needs a stronger first signal before deeper conversation or stronger pressure is justified.",
        href: "/free-check",
        cta: "Start Search Presence Scan",
        highlighted: true,
    },
    {
        label: "Need deeper explanation",
        title: "Visibility Blueprint",
        copy:
            "Use this when the business already knows it needs a deeper read on what may be weakening trust, clarity, positioning, search presence, and response.",
        href: "/pricing/full-diagnosis",
        cta: "View Visibility Blueprint",
    },
    {
        label: "Need recurring continuity",
        title: "Presence Command",
        copy:
            "Use this when the business is already clear enough to discuss ongoing strategic continuity, maintenance, and compounding direction.",
        href: "/pricing/monthly-partner",
        cta: "View Presence Command",
    },
] as const;

const bestUseCases = [
    {
        title:
            "Use contact when the business already understands the system well enough to ask the right question.",
        copy:
            "The contact lane is strongest when the business is not trying to skip sequence blindly and already has enough context to communicate clearly about fit, timing, scope, or the right next step.",
    },
    {
        title:
            "Use contact when the question is about fit, path, scope, or strategic direction.",
        copy:
            "It is a strong lane for clarifying where the business belongs in the system path and whether it is ready for Visibility Blueprint, Presence Infrastructure, or Presence Command.",
    },
    {
        title:
            "Use contact when the business needs a direct communication lane after clarity already exists.",
        copy:
            "The cleaner the business understands its own stage, the more useful direct contact becomes.",
    },
] as const;

const wrongUseCases = [
    {
        title:
            "Do not use contact as a substitute for Search Presence Scan when the business still lacks first signal.",
        copy:
            "If the business still needs its first serious read, the strongest move is usually to use the structured intake instead of trying to explain everything loosely through general contact.",
    },
    {
        title:
            "Do not use contact to bypass Visibility Blueprint when deeper explanation is still missing.",
        copy:
            "If the core pressure is still blurred, contact should not be asked to replace the role of the strategic explanation layer.",
    },
    {
        title:
            "Do not use contact expecting guaranteed outcomes or undefined open-ended scope.",
        copy:
            "The communication lane is part of the trust architecture. It does not exist to create false certainty or blur service boundaries.",
    },
] as const;

const communicationRules = [
    {
        label: "Best first lane",
        value: "Structured intake before vague explanation",
    },
    {
        label: "Best direct-fit lane",
        value: "Plan-fit or continuity questions after clarity exists",
    },
    {
        label: "Main failure avoided",
        value: "Using general contact to skip sequence",
    },
    {
        label: "Primary objective",
        value: "Route the business into the cleanest next communication path",
    },
] as const;

const trustBoundaries = [
    {
        label: "What contact is for",
        value: "Clarifying fit, sequence, scope, and the right next move.",
    },
    {
        label: "What contact is not for",
        value:
            "Guaranteed promises, undefined delivery assumptions, or bypassing the system path without enough clarity.",
    },
    {
        label: "What creates the most value here",
        value:
            "Clear business context, clear timing, and a clear understanding of what layer may actually fit next.",
    },
    {
        label: "What keeps trust strong here",
        value:
            "Explicit roles, explicit boundaries, and routing the business into the correct lane instead of the loudest one.",
    },
] as const;

const routeGuide = [
    {
        step: "01",
        title: "Search Presence Scan first",
        copy:
            "If the business still needs a stronger first signal, use the structured intake before trying to generalize the problem through contact.",
        href: "/free-check",
        cta: "Start Search Presence Scan",
        highlighted: true,
    },
    {
        step: "02",
        title: "Visibility Blueprint if needed",
        copy:
            "If the business already knows it needs deeper explanation of what may actually be weakening visibility and response, use the strategic layer next.",
        href: "/pricing/full-diagnosis",
        cta: "View Visibility Blueprint",
    },
    {
        step: "03",
        title: "Presence Infrastructure if clear",
        copy:
            "If the business already has enough clarity to justify concentrated one-time strengthening, move into Presence Infrastructure.",
        href: "/pricing/optimization",
        cta: "View Presence Infrastructure",
    },
    {
        step: "04",
        title: "Presence Command if ready",
        copy:
            "If the business is already clear enough for recurring strategic continuity, move into Presence Command discussion.",
        href: "/pricing/monthly-partner",
        cta: "View Presence Command",
    },
] as const;

const faqs = [
    {
        question: "What should most businesses do before contacting Cendorq?",
        answer:
            "Most businesses should start with Search Presence Scan, because structured first signal is usually more useful than loose explanation when the real stage is still unclear.",
    },
    {
        question: "When is direct contact most useful?",
        answer:
            "Direct contact is most useful when the business already has enough clarity to ask about fit, scope, timing, or whether Presence Command or another layer is the right next move.",
    },
    {
        question: "Can contact replace Visibility Blueprint?",
        answer:
            "No. Contact can help route the business, but it should not replace the deeper explanation layer when the core pressure is still blurred.",
    },
    {
        question: "What makes the contact lane trustworthy?",
        answer:
            "It stays trustworthy by preserving boundaries, keeping roles explicit, and helping the business choose the right lane instead of using contact as a shortcut around the system.",
    },
] as const;

const selectionGuide = [
    {
        label: "Need first signal",
        value: "Start Search Presence Scan",
    },
    {
        label: "Need deeper interpretation",
        value: "Move into Visibility Blueprint",
    },
    {
        label: "Need concentrated build work",
        value: "Use Presence Infrastructure",
    },
    {
        label: "Need recurring continuity",
        value: "Discuss Presence Command",
    },
] as const;

const readinessGuide = [
    {
        title: "Good contact question",
        copy:
            "We already understand the system path and need help deciding whether Visibility Blueprint, Presence Infrastructure, or Presence Command is the right next move.",
    },
    {
        title: "Weak contact question",
        copy:
            "We are not sure what is wrong yet, we have not clarified the business pressure, and we want contact to replace the structured first-signal lane.",
    },
    {
        title: "Best use of direct email",
        copy:
            "Use it for serious fit, scope, continuity, or stage questions after the business already has enough clarity to communicate cleanly.",
    },
] as const;

export default function ContactPage() {
    const webPageJsonLd = buildWebPageJsonLd({
        title: `${BRAND_NAME} Contact`,
        description:
            "Choose the right communication lane for Cendorq based on fit, sequence, and the cleanest next move.",
        path: "/contact",
    });

    const serviceJsonLd = buildServiceJsonLd({
        title: `${BRAND_NAME} Contact and Routing Guidance`,
        description:
            "A structured contact page that helps businesses choose the correct communication lane based on what stage they are actually in.",
        path: "/contact",
    });

    const breadcrumbJsonLd = buildBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
    ]);

    const faqJsonLd = buildFaqJsonLd(faqs);

    return (
        <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 text-white sm:px-6 md:py-16 xl:py-20">
            <ContactAtmosphere />

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
                    <span className="text-cyan-100">Contact</span>
                </div>
            </section>

            <section className="relative z-10 grid gap-10 pt-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-start">
                <div>
                    <TopChip>Contact</TopChip>

                    <h1 className="system-hero-title mt-5 max-w-5xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
                        Use the right communication lane
                        <span className="system-gradient-text block">
                            before the business enters the wrong one.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                        The contact page exists to route communication cleanly. It is not meant
                        to replace first signal, replace strategic explanation, or blur the role
                        of different system layers. It is meant to help the business choose the
                        right lane based on what stage it is actually in.
                    </p>

                    <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                        In most cases, the strongest first move is still the{" "}
                        <strong className="font-semibold text-white">Search Presence Scan</strong>,
                        because structured signal is usually more useful than vague contact when
                        the business is still trying to understand what it really needs.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <AuthorityPill>Route by need</AuthorityPill>
                        <AuthorityPill>Sequence before escalation</AuthorityPill>
                        <AuthorityPill>Clear lanes only</AuthorityPill>
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
                            It is built to make contact cleaner, not vaguer.
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                            A serious contact lane should reduce confusion, not create more of it.
                            That means helping the business choose the correct communication path
                            based on what it already knows, what it still does not know, and what
                            layer actually fits next.
                        </p>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                            <GuideTile
                                label="Primary objective"
                                value="Route the business into the cleanest next lane"
                            />
                            <GuideTile
                                label="Main failure avoided"
                                value="Using vague contact to skip sequence"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid gap-4">
                    <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                            <div className="max-w-2xl">
                                <TopChip>Contact posture</TopChip>

                                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                                    The best communication path depends on what the business actually needs now.
                                </h2>

                                <p className="mt-5 text-base leading-8 text-slate-300">
                                    Contact is strongest after the business has enough clarity to ask
                                    the right question. Before that, structured signal usually creates
                                    more value than loose explanation.
                                </p>
                            </div>

                            <div className="grid min-w-0 gap-3 sm:grid-cols-2 lg:w-[21rem]">
                                {heroReadouts.map((item, index) => (
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
                        <StatusTile label="Contact bias" value="Structured" highlighted />
                        <StatusTile label="Best first move" value="Scan" />
                        <StatusTile label="Trust style" value="Explicit" />
                    </div>

                    <div className="system-surface rounded-[1.7rem] p-6">
                        <p className="system-eyebrow">Best reading rule</p>
                        <p className="mt-4 text-base leading-8 text-slate-300">
                            Use contact when the business is clear enough to ask a good question.
                            Use structured intake when the business still needs a stronger first
                            signal more than anything else.
                        </p>
                    </div>

                    <div className="system-surface rounded-[1.7rem] p-6">
                        <p className="system-eyebrow">Quick selection guide</p>
                        <div className="mt-4 grid gap-3">
                            {selectionGuide.map((item, index) => (
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
                    <TopChip>Contact lanes</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Choose the lane that matches the stage the business is actually in.
                    </h2>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-3">
                    {contactLanes.map((item, index) => (
                        <ContactLaneCard
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

                <div className="mt-6">
                    {hasDirectEmail ? (
                        <DirectEmailCard href={directEmailHref} email={contactEmail} />
                    ) : (
                        <FallbackContactCard />
                    )}
                </div>
            </section>

            <section className="relative z-10 mt-20 grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
                <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8 md:p-10">
                    <TopChip>Best uses</TopChip>

                    <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Contact becomes strongest when clarity already exists.
                    </h2>

                    <div className="mt-8 grid gap-4">
                        {bestUseCases.map((item, index) => (
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
                    {wrongUseCases.map((item, index) => (
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
                    <TopChip>Communication rules</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The communication lane is part of the platform’s trust architecture.
                    </h2>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {communicationRules.map((item, index) => (
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
                    <TopChip>Readiness guide</TopChip>

                    <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Good contact becomes easier when the question is already disciplined.
                    </h2>

                    <div className="mt-8 grid gap-4">
                        {readinessGuide.map((item, index) => (
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
                    {trustBoundaries.map((item, index) => (
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
                            Contact is not a loophole around the system path. It is a cleaner
                            communication layer inside it. The route stays strongest when the
                            business enters the lane that matches its actual stage.
                        </p>
                    </div>
                </div>
            </section>

            <section className="relative z-10 mt-20 grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
                <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8 md:p-10">
                    <TopChip>Route guide</TopChip>

                    <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        If the business is unsure where to go, return to the cleanest route logic.
                    </h2>

                    <div className="mt-8 grid gap-4">
                        {routeGuide.map((item, index) => (
                            <RouteCard
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
                    <InfoPanel
                        title="Most common mistake"
                        copy="Trying to use contact as the first serious business read instead of using Search Presence Scan to create a stronger first signal."
                        highlighted
                    />
                    <InfoPanel
                        title="Cleanest escalation logic"
                        copy="Signal first, deeper explanation second, concentrated strengthening after clarity, and recurring continuity only when the business is ready to use it well."
                    />
                    <InfoPanel
                        title="Why this matters"
                        copy="The cleaner the routing logic stays, the more trustworthy the whole system becomes and the harder it is to buy the wrong next move."
                    />
                </div>
            </section>

            <section className="relative z-10 mt-20">
                <div className="max-w-3xl">
                    <TopChip>Layer questions</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Contact becomes more trustworthy when the lane logic stays explicit.
                    </h2>
                </div>

                <div className="mt-10 grid gap-4 lg:grid-cols-2">
                    {faqs.map((item, index) => (
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
                    <TopChip>Best next move</TopChip>

                    <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Start with structured signal unless the business already clearly knows what it needs to ask.
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-300">
                        Most businesses get the cleanest result by starting with the Search
                        Presence Scan. Contact becomes strongest after the business has enough
                        clarity to ask about fit, path, or continuity without using general
                        communication to replace the role of the system itself.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                        <Link
                            href="/free-check"
                            className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
                        >
                            Start Search Presence Scan
                        </Link>
                        <Link
                            href="/pricing/monthly-partner"
                            className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition"
                        >
                            View Presence Command
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

function normalizeEmail(value: string | undefined) {
    const cleaned = (value || "").trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned) ? cleaned : "";
}

function ContactAtmosphere() {
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

function ContactLaneCard({
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

function DirectEmailCard({
    href,
    email,
}: {
    href: string;
    email: string;
}) {
    return (
        <article className="system-panel-authority rounded-[1.8rem] p-6">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
                Direct email
            </div>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                Use direct contact only when the question is already clear enough.
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">
                If the business already understands its stage and needs a direct communication
                lane, use the configured contact address below instead of trying to force a
                vague conversation through the wrong route.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="rounded-[1rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-200">
                    {email}
                </div>
                <a
                    href={href}
                    className="system-button-primary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition"
                >
                    Email now
                </a>
            </div>
        </article>
    );
}

function FallbackContactCard() {
    return (
        <article className="system-surface rounded-[1.8rem] p-6">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
                Direct communication
            </div>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                Use the routing lanes until the direct contact address is configured.
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">
                The page is preserving the lane logic first. If direct email is added later,
                this block can become the explicit direct-contact surface without changing the
                route discipline of the system.
            </p>
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

function RouteCard({
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