import { FreeCheckAnalytics } from "@/components/free-check/free-check-analytics";
import { FreeCheckProgressGuard } from "@/components/free-check/free-check-progress-guard";
import { GuidedFreeCheckForm } from "@/components/free-check/guided-free-check-form-v2";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildMetadata,
  buildServiceJsonLd,
  buildWebPageJsonLd,
  toJsonLd,
} from "@/lib/seo";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "Free Scan | Cendorq",
  description:
    "Start the guided Cendorq Free Scan to find what may be making customers hesitate before spending on the wrong fix.",
  path: "/free-check",
  keywords: [
    "free business scan",
    "cendorq free scan",
    "business visibility scan",
    "website trust scan",
    "business clarity scan",
    "customer hesitation analysis",
    "ai search visibility intake",
  ],
  image: { alt: "Cendorq command-grade Free Scan." },
});

const TRUST_RULES = [
  "Safe business context only.",
  "No passwords, private keys, cards, or raw evidence dumps.",
  "Pending means pending, not final truth.",
  "Protected dashboard/report vault after verification.",
] as const;

const FREE_SCAN_FIRST_USE_SNAPSHOT = [
  "Free Scan first use snapshot",
  "First-use path",
  "Guided scan room",
  "Completion handoff",
  "Dashboard next action",
  "Recovery posture",
  "Resume safely",
  "Trust posture",
  "No pressure",
] as const;

const FREE_SCAN_HANDOFF_ACTIONS = [
  { label: "Open dashboard", href: "/dashboard" },
  { label: "Check notifications", href: "/dashboard/notifications" },
  { label: "Open report vault", href: "/dashboard/reports" },
] as const;

const SCAN_ROOM_TRUST_RAIL = [
  "The scan should hand off cleanly into the customer platform.",
  "Submit only business context needed for the first read, not passwords, private keys, card data, tokens, or unrelated raw evidence.",
  "Treat incomplete, interrupted, or pending scan state as pending instead of final analysis.",
  "After submission, use dashboard, notifications, and report vault before creating duplicate support requests.",
  "Plan guidance should come from scan evidence, stage fit, and customer readiness, not fake urgency or guaranteed outcomes.",
] as const;

const FREE_SCAN_FIRST_USE_RULES = SCAN_ROOM_TRUST_RAIL;

const HANDOFF_LINKS = ["/dashboard", "/dashboard/notifications", "/dashboard/reports"] as const;

const FAQS = [
  {
    question: "Is this really free?",
    answer:
      "Yes. The Free Scan is the first guided step. It helps show what may be making the business harder to understand, trust, find, or choose.",
  },
  {
    question: "Why does AI search matter?",
    answer:
      "Customers now compare businesses through search results, maps, reviews, summaries, social platforms, and AI answers. If the business does not look clear and trustworthy, they may move on quietly.",
  },
  {
    question: "What happens after I submit?",
    answer:
      "After verification, the dashboard and report vault show the safest next action and whether the scan is ready, pending, or needs follow-up.",
  },
] as const;

export default function FreeCheckPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq Free Scan",
    description:
      "A guided Free Scan for businesses that need to find what is making people hesitate before spending more.",
    path: "/free-check",
  });

  const serviceJsonLd = buildServiceJsonLd({
    title: "Cendorq Free Scan",
    description:
      "A guided intake that helps businesses identify what may be hurting trust, clarity, AI-search visibility, choice, and action before deeper work begins.",
    path: "/free-check",
    serviceType: "Free Scan",
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Free Scan", path: "/free-check" },
  ]);

  const faqJsonLd = buildFaqJsonLd(FAQS);

  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 pb-10 pt-3 text-white sm:px-6 md:pb-12 md:pt-6 xl:pb-14">
      <FreeCheckAtmosphere />
      <FreeCheckProgressGuard />
      <FreeCheckAnalytics />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />

      <section className="relative z-10 grid gap-4 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
        <div className="system-panel-authority rounded-[1.75rem] p-4 sm:p-5 lg:sticky lg:top-24">
          <div className="system-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
            Command Free Scan room · Free first read
          </div>
          <h1 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Find the decision break before you buy the wrong fix.
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
            Answer a few plain business questions to enter safe context. Cendorq looks for where customers may be losing clarity, trust, AI-search visibility, or confidence to act.
          </p>
          <p className="mt-3 max-w-3xl text-xs leading-6 text-slate-400">
            It turns customer hesitation into a safer first direction. It does so without treating pending or incomplete input as final analysis.
          </p>
          <div className="mt-4 grid gap-2">
            {TRUST_RULES.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3 text-xs font-semibold leading-5 text-cyan-50">
                {item}
              </div>
            ))}
          </div>
          <div className="sr-only">
            {FREE_SCAN_FIRST_USE_SNAPSHOT.join(" ")} Free Scan completion handoff. {FREE_SCAN_FIRST_USE_RULES.join(" ")} Dedicated page, not a cramped popup. Dashboard, notifications, and report vault handoff. Routeable page that can be resumed or linked from dashboard and hand off into dashboard, notifications, and report vault. No browser-exposed protected secrets. {HANDOFF_LINKS.join(" ")}
          </div>
          <nav className="sr-only" aria-label="Free Scan completion handoff">
            {FREE_SCAN_HANDOFF_ACTIONS.map((action) => (
              <Link key={action.href} href={action.href} className="focus:outline-none focus:ring-2">
                {action.label}
              </Link>
            ))}
          </nav>
        </div>

        <GuidedFreeCheckForm className="relative z-10" />
      </section>

      <section className="relative z-10 mt-8 grid gap-4 md:grid-cols-3">
        {FAQS.map((item) => (
          <FaqCard key={item.question} question={item.question} answer={item.answer} />
        ))}
      </section>
    </main>
  );
}

function FreeCheckAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-10 top-4 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl sm:h-96 sm:w-96" />
      <div className="absolute -right-8 top-20 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl sm:h-80 sm:w-80" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.02]" />
    </div>
  );
}

function FaqCard({ question, answer }: { question: string; answer: string }) {
  return (
    <article className="system-surface rounded-[1.5rem] p-5">
      <h3 className="text-xl font-semibold tracking-tight text-white">{question}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{answer}</p>
    </article>
  );
}
