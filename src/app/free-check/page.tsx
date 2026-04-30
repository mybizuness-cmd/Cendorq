import Link from "next/link";
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
    "Start the guided Cendorq Free Scan in a dedicated scan room built for trust, focus, accessibility, and a stronger first business read.",
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
  image: {
    alt: "Cendorq guided Free Scan.",
  },
});

const SCAN_PROMISES = [
  {
    title: "Find what is making people hesitate",
    copy:
      "See whether people may be confused, unsure, comparing you away, or failing to understand why they should choose you.",
  },
  {
    title: "Avoid paying for the wrong fix",
    copy:
      "Before you buy deeper work, get a cleaner first read on what is actually weakening the business online.",
  },
  {
    title: "Know the next right move",
    copy:
      "The scan helps point the business toward the next step that makes sense instead of pushing every offer at once.",
  },
] as const;

const SCAN_ROOM_TRUST_RAIL = [
  "Dedicated page, not a cramped popup",
  "Safe business context only",
  "Pending means pending, not final truth",
  "Dashboard, notifications, and report vault handoff",
] as const;

const FREE_SCAN_FIRST_USE_SNAPSHOT = [
  { label: "First-use path", value: "Guided scan room", detail: "Customers should understand why each step exists before sharing business context." },
  { label: "Completion handoff", value: "Dashboard next action", detail: "After submit, the next place to look should be dashboard, notifications, and report vault status." },
  { label: "Recovery posture", value: "Resume safely", detail: "If intake is interrupted, the page should support recovery without local/session storage secrets." },
  { label: "Trust posture", value: "No pressure", detail: "The scan should explain value without fake urgency or unsupported business-result promises." },
] as const;

const FREE_SCAN_HANDOFF_ACTIONS = [
  { title: "Open dashboard", copy: "Use your private dashboard after account verification to see the next action.", href: "/dashboard" },
  { title: "Check notifications", copy: "Look for account, scan, report, billing, support, and security updates in one safe place.", href: "/dashboard/notifications" },
  { title: "Open report vault", copy: "Use the vault to see whether a Free Scan result is ready, pending, or needs follow-up.", href: "/dashboard/reports" },
] as const;

const FREE_SCAN_FIRST_USE_RULES = [
  "Submit only business context needed for the first read, not passwords, private keys, card data, tokens, or unrelated raw evidence.",
  "Treat incomplete, interrupted, or pending scan state as pending instead of final analysis.",
  "After submission, use dashboard, notifications, and report vault before creating duplicate support requests.",
  "Plan guidance should come from scan evidence, stage fit, and customer readiness, not fake urgency or guaranteed outcomes.",
] as const;

const DEDICATED_SCAN_ROOM_DECISION = [
  {
    label: "Primary pattern",
    value: "Dedicated page",
    detail: "The full scan needs room for labels, progress, errors, recovery, and trust context.",
  },
  {
    label: "Popup role",
    value: "Entry only",
    detail: "Small prompts may route customers here, but the full form should not be trapped in a modal.",
  },
  {
    label: "Completion quality",
    value: "Focused flow",
    detail: "A page supports mobile spacing, accessible controls, and a calmer finish state.",
  },
  {
    label: "Business trust",
    value: "Proof-led",
    detail: "The scan explains what is being asked and why before requesting deeper details.",
  },
] as const;

const SCAN_ROOM_STANDARDS = [
  "Visible labels and clear field purpose",
  "Step-by-step progress and recovery",
  "Mobile-friendly spacing and large controls",
  "Customer-safe copy with no fake urgency",
  "No browser-exposed protected secrets",
  "Routeable page that can be resumed or linked from dashboard",
] as const;

const FAQS = [
  {
    question: "Is this really free?",
    answer:
      "Yes. The free scan is the first guided step. It helps you see what may be making the business harder to understand, trust, or choose.",
  },
  {
    question: "Why does the scan have its own page instead of a popup?",
    answer:
      "A dedicated page gives the scan enough space for labels, progress, errors, mobile usability, privacy context, and a calmer finish state. A small popup can invite someone to begin, but the full scan belongs in this focused scan room.",
  },
  {
    question: "Why is the scan split into steps?",
    answer:
      "A giant form creates friction. The guided scan asks for the right information in the right order so it feels easier to finish and produces a stronger first read.",
  },
  {
    question: "What happens after I submit it?",
    answer:
      "The business gets captured into the Cendorq scan system. After account verification, dashboard, notifications, and the report vault should show the safest next action and whether the scan is ready, pending, or needs follow-up.",
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
      "A premium guided intake that helps businesses identify what may be hurting trust, clarity, choice, and action before deeper work begins.",
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

      <section className="relative z-10 grid gap-8 lg:grid-cols-[0.96fr_1.04fr] lg:items-center">
        <div>
          <div className="system-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">
            Premium Free Scan room
          </div>

          <h1 className="system-hero-title mt-5 max-w-5xl text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl xl:text-[4.6rem]">
            Find the decision break before you buy the wrong fix.
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            Cendorq gives the full Free Scan its own focused page so the business owner has room to understand each step, enter safe context, recover from errors, and hand off into dashboard, notifications, and report vault without a cramped popup experience.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {SCAN_PROMISES.map((item) => (
              <PromiseCard key={item.title} title={item.title} copy={item.copy} />
            ))}
          </div>

          <div className="mt-6 grid gap-2 sm:grid-cols-2" aria-label="Free Scan room trust rail">
            {SCAN_ROOM_TRUST_RAIL.map((item) => (
              <div key={item} className="rounded-2xl border border-cyan-300/15 bg-cyan-300/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-50">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="system-panel-authority relative overflow-hidden rounded-[2.25rem] p-6 sm:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(103,232,249,0.14),transparent_35%),radial-gradient(circle_at_90%_0%,rgba(56,189,248,0.1),transparent_30%)]" />
          <div className="relative z-10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">
              What this scan does
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              It turns customer hesitation into a safer first direction.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-300">
              Customers judge the business before they call, book, or buy. This scan helps identify where that judgment may be breaking down without treating pending or incomplete input as final analysis.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <MiniPoint label="People may not get it" value="The offer may be too hard to understand quickly." />
              <MiniPoint label="People may not trust it" value="The page may not create enough confidence fast enough." />
              <MiniPoint label="People may compare away" value="Competitors may feel easier, safer, or clearer." />
              <MiniPoint label="People may not act" value="The next step may not feel obvious or worth it." />
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-8 grid gap-4 lg:grid-cols-4" aria-label="Free Scan first use snapshot">
        {FREE_SCAN_FIRST_USE_SNAPSHOT.map((item) => (
          <article key={item.label} className="system-surface rounded-[1.5rem] p-5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">{item.label}</div>
            <div className="mt-3 text-xl font-semibold tracking-tight text-white">{item.value}</div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-8 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]" aria-label="Free Scan completion handoff">
        <article className="system-panel-authority rounded-[2rem] p-6 sm:p-8">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">After submission</div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            The scan should hand off cleanly into the customer platform.
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-300">
            A finished scan should not strand the customer. The dashboard, notification center, and report vault should explain whether the scan is ready, pending, or needs safe follow-up before any deeper plan decision.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {FREE_SCAN_HANDOFF_ACTIONS.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-[1.2rem] border border-white/10 bg-white/[0.035] p-4 text-sm leading-7 text-slate-200 transition hover:border-cyan-300/30 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
                <span className="block font-semibold text-white">{item.title}</span>
                <span className="mt-2 block">{item.copy}</span>
              </Link>
            ))}
          </div>
        </article>
        <article className="system-surface rounded-[2rem] p-6 sm:p-8">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">First-use rules</div>
          <div className="mt-5 grid gap-3">
            {FREE_SCAN_FIRST_USE_RULES.map((rule) => (
              <div key={rule} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-slate-200">
                {rule}
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="relative z-10 mt-8 grid gap-4 lg:grid-cols-4" aria-label="Free Scan page decision">
        {DEDICATED_SCAN_ROOM_DECISION.map((item) => (
          <article key={item.label} className="system-surface rounded-[1.5rem] p-5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">{item.label}</div>
            <div className="mt-3 text-xl font-semibold tracking-tight text-white">{item.value}</div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-8 grid gap-5 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <article className="system-panel-authority rounded-[2rem] p-6 sm:p-8">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">Why this is not a full popup</div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            The scan is important enough to deserve focus.
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-300">
            A small popup can invite someone into the scan, but the actual form should live on this dedicated page. That keeps the experience accessible, routeable, recoverable, and serious enough for a business owner sharing real context.
          </p>
        </article>
        <article className="system-surface rounded-[2rem] p-6">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">Scan room standards</div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {SCAN_ROOM_STANDARDS.map((standard) => (
              <div key={standard} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200">
                {standard}
              </div>
            ))}
          </div>
        </article>
      </section>

      <GuidedFreeCheckForm className="relative z-10 mt-12" />

      <section className="relative z-10 mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
      <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-300/8 blur-3xl sm:h-[26rem] sm:w-[26rem]" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.025]" />
    </div>
  );
}

function PromiseCard({ title, copy }: { title: string; copy: string }) {
  return (
    <article className="system-surface rounded-[1.35rem] p-4 sm:p-5">
      <h3 className="text-base font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">{copy}</p>
    </article>
  );
}

function MiniPoint({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4">
      <div className="text-sm font-semibold text-white">{label}</div>
      <div className="mt-2 text-sm leading-6 text-slate-300">{value}</div>
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
