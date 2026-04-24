import type { ReactNode } from "react";

const contactPreviewCards = [
    {
        title: "General inquiries",
        copy:
            "Preparing the contact lane for serious business questions, plan-fit questions, and cleaner routing before someone chooses the wrong next move.",
    },
    {
        title: "Client support",
        copy:
            "Preparing the support lane for businesses already inside the system so active-scope communication stays cleaner and more controlled.",
    },
    {
        title: "Routing clarity",
        copy:
            "Preparing the structure that helps separate real support needs from loose, undefined expectations or the wrong contact path.",
    },
    {
        title: "Expectation control",
        copy:
            "Preparing the guidance that keeps contact from being mistaken for unlimited support, instant consultation, or undefined scope expansion.",
    },
];

const routeSignals = [
    { label: "Routing state", value: "Preparing contact lanes" },
    { label: "Support clarity", value: "Loading expectations" },
    { label: "Next move", value: "Becoming clearer" },
];

export default function ContactLoadingPage() {
    return (
        <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 text-white sm:px-6 md:py-16 xl:py-20">
            <ContactLoadingAtmosphere />

            <section className="relative z-10 max-w-5xl">
                <TopChip>Contact loading</TopChip>

                <h1 className="system-hero-title mt-5 max-w-5xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
                    Preparing the contact route
                    <span className="system-gradient-text block">
                        before the right channel appears.
                    </span>
                </h1>

                <p className="mt-6 max-w-4xl text-base leading-8 text-slate-300 sm:text-lg">
                    This route is loading the contact structure so serious questions,
                    support requests, and plan-fit inquiries can enter through a cleaner,
                    more controlled path instead of a weak or confusing transition.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                    <AuthorityPill>Clear routing</AuthorityPill>
                    <AuthorityPill>Defined expectations</AuthorityPill>
                    <AuthorityPill>Stronger support logic</AuthorityPill>
                </div>
            </section>

            <section className="relative z-10 mt-16 grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
                <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8 md:p-10">
                    <TopChip>Route meaning</TopChip>

                    <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The system is loading the contact structure so the message enters the right lane.
                    </h2>

                    <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
                        The contact page matters because it helps separate serious business
                        inquiries, plan-fit questions, and active-scope support from vague,
                        undefined requests. That route should feel controlled, trustworthy,
                        and authoritative even while it loads.
                    </p>

                    <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">
                        This loading layer protects that transition so the route can prepare
                        contact paths, support expectations, and routing guidance without
                        dropping the user into a blank or uncertain page.
                    </p>

                    <div className="mt-8">
                        <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.22em] text-slate-400">
                            <span>Contact route readiness</span>
                            <span>65%</span>
                        </div>

                        <div className="system-status-bar mt-2 h-2">
                            <span style={{ width: "65%" }} />
                        </div>
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                        {routeSignals.map((item, index) => (
                            <StatusTile
                                key={item.label}
                                label={item.label}
                                value={item.value}
                                highlighted={index === 0}
                            />
                        ))}
                    </div>
                </div>

                <div className="grid gap-4">
                    <ReadoutCard
                        label="Why this matters"
                        value="Contact should route cleanly"
                        copy="Weak contact structure creates weak expectations. Strong routing helps keep support, plan questions, and business inquiries cleaner."
                    />
                    <ReadoutCard
                        label="What is loading"
                        value="Contact lanes and support guidance"
                        copy="The route may be resolving content, preparing the contact page structure, or loading the rules that explain how messages should enter the system."
                    />
                    <ReadoutCard
                        label="Best reading rule"
                        value="Use contact for routing, not for replacing the system path"
                        copy="The strongest move still depends on what the business actually needs. Contact helps route the question. It does not replace the logic of the system."
                    />
                </div>
            </section>

            <section className="relative z-10 mt-20">
                <div className="max-w-3xl">
                    <TopChip>Contact preview</TopChip>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                        The route is preparing the main contact and support lanes.
                    </h2>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {contactPreviewCards.map((card, index) => (
                        <LoadingContactCard
                            key={card.title}
                            title={card.title}
                            copy={card.copy}
                            highlighted={index === 0}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}

function ContactLoadingAtmosphere() {
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

function ReadoutCard({
    label,
    value,
    copy,
}: {
    label: string;
    value: string;
    copy: string;
}) {
    return (
        <div className="system-surface rounded-[1.5rem] p-5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                {label}
            </div>
            <div className="mt-2 text-xl font-semibold text-white">{value}</div>
            <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>
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

function LoadingContactCard({
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
                    ? "system-panel-authority rounded-[1.7rem] p-6"
                    : "system-surface rounded-[1.7rem] p-6"
            }
        >
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
                Contact lane
            </div>

            <div className="mt-3 text-2xl font-semibold text-white">{title}</div>

            <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>

            <div className="mt-6 space-y-3">
                <SkeletonLine wide />
                <SkeletonLine />
                <SkeletonLine />
                <SkeletonLine short />
            </div>
        </div>
    );
}

function SkeletonLine({
    wide = false,
    short = false,
}: {
    wide?: boolean;
    short?: boolean;
}) {
    const widthClass = wide ? "w-full" : short ? "w-1/2" : "w-5/6";

    return (
        <div className="h-2.5 animate-pulse rounded-full bg-white/[0.06]">
            <div className={`h-full rounded-full bg-transparent ${widthClass}`} />
        </div>
    );
}
