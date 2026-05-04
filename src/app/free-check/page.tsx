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
  image: { alt: "Cendorq guided Free Scan." },
});

const SCAN_PROMISES = [
  {
    title: "Find the hesitation",
    copy: "See where people may be confused, unsure, comparing you away, or not ready to act.",
  },
  {
    title: "Avoid the wrong spend",
    copy: "Get a first read before paying for deeper diagnosis, fixes, ads, SEO, or redesign work.",
  },
  {
    title: "Know the next move",
    copy: "The scan points toward the right depth instead of pushing every plan at once.",
  },
] as const;

const TRUST_RULES = [
  "Safe business context only.",
  "No passwords, private keys, cards, or raw evidence dumps.",
  "Pending means pending, not final truth.",
  "Protected dashboard/report vault after verification.",
] as const;

const SCAN_ROOM_TRUST_RAIL = [
  "Submit only business context needed for the first read, not passwords, private keys, card data, tokens, or unrelated raw evidence.",
  "Treat incomplete, interrupted, or pending scan state as pending instead of final analysis.",
  "After submission, use dashboard, notifications, and report vault before creating duplicate support requests.",
  "Plan guidance should come from scan evidence, stage fit, and customer readiness, not fake urgency or guaranteed outcomes.",
] as const;

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
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-8 text-white sm:px-6 md:py-12 xl:py-14">
      <FreeCheckAtmosphere />
      <FreeCheckProgressGuard />
      <FreeCheckAnalytics />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />

      <section className="relative z-10 grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div>
          <div className="system-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">
            Premium Free Scan room · Free first read
          </div>
          <h1 className="system-hero-title mt-5 max-w-5xl text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            Find the decision break before you buy the wrong fix.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            Answer a few plain business questions to enter safe context. Cendorq looks for where customers may be losing clarity, trust, AI-search visibility, or confidence to act.
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400">
            It turns customer hesitation into a safer first direction. It does so without treating pending or incomplete input as final analysis.
          </p>
        </div>

        <div className="system-panel-authority relative overflow-hidden rounded-[2.25rem] p-6 sm:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(103,232,249,0.14),transparent_35%),radial-gradient(circle_at_90%_0%,rgba(56,189,248,0.1),transparent_30%)]" />
          <div className="relative z-10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">What you get</div>
            <div className="mt-5 grid gap-3">
              {SCAN_PROMISES.map((item) => (
                <PromiseCard key={item.title} title={item.title} copy={item.copy} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Free Scan trust rules">
        {TRUST_RULES.map((item) => (
          <div key={item} className="rounded-2xl border border-cyan-300/15 bg-cyan-300/10 px-4 py-3 text-sm font-semibold text-cyan-50">
            {item}
          </div>
        ))}
      </section>

      <section className="relative z-10 mt-8 rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 sm:p-6" aria-label="Free Scan room trust rail">
        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">Dedicated page, not a cramped popup</div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">Dashboard, notifications, and report vault handoff</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Routeable page that can be resumed or linked from dashboard. It can hand off into dashboard, notifications, and report vault after verification.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-cyan-100">
              {HANDOFF_LINKS.map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">{item}</span>
              ))}
            </div>
          </div>
          <div className="grid gap-3">
            {SCAN_ROOM_TRUST_RAIL.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/35 p-4 text-sm leading-6 text-slate-300">
                {item}
              </div>
            ))}
            <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-4 text-sm font-semibold leading-6 text-slate-200">
              No browser-exposed protected secrets.
            </div>
          </div>
        </div>
      </section>

      <GuidedFreeCheckForm className="relative z-10 mt-10" />

      <section className="relative z-10 mt-10 grid gap-4 md:grid-cols-3">
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
      <div className="absolute -left-10 top-8 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl sm:h-96 sm:w-96" />
      <div className="absolute -right-8 top-28 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl sm:h-80 sm:w-80" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.025]" />
    </div>
  );
}

function PromiseCard({ title, copy }: { title: string; copy: string }) {
  return (
    <article className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4 sm:p-5">
      <h3 className="text-base font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">{copy}</p>
    </article>
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
