import { FreeCheckAnalytics } from "@/components/free-check/free-check-analytics";
import { FreeCheckProgressGuard } from "@/components/free-check/free-check-progress-guard";
import { GuidedFreeCheckFormV3 } from "@/components/free-check/guided-free-check-form-v3";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";
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
    "Start the Cendorq Free Scan to see the first Presence Report and AI Visibility signal before choosing deeper Review, Repair, or Control work.",
  path: "/free-check",
  keywords: [
    "cendorq free scan",
    "AI visibility scan",
    "AI readiness scan",
    "AI Search Presence Repair",
    "business clarity scan",
    "presence report",
    "business trust scan",
  ],
  image: { alt: "Cendorq Free Scan." },
});

type FreeCheckSearchParams = { access?: string; method?: string; provider?: string; returnTo?: string };
type FreeCheckPageProps = { searchParams?: Promise<FreeCheckSearchParams> | FreeCheckSearchParams };

const PREVIEW_SIGNALS = [
  { label: "Findability", status: "Check", copy: "Can people and public systems locate the business, site, and core facts?" },
  { label: "Understanding", status: "Check", copy: "Can a first-time visitor understand the offer without working too hard?" },
  { label: "Trust", status: "Check", copy: "Is proof visible before the customer starts comparing alternatives?" },
  { label: "Choice", status: "Check", copy: "Is the reason to choose this business clear enough to act on?" },
  { label: "Action", status: "Check", copy: "Is the next step obvious enough to call, book, request, or visit?" },
] as const;

const FORM_PAGE_STANDARD = [
  ["Fast start", "A short guided form, not a sales maze."],
  ["Useful context", "Only the facts needed for a first signal."],
  ["Safe boundary", "No card details, passwords, or private keys."],
] as const;

const SCAN_SYSTEM_STEPS = [
  {
    step: "01",
    title: "Share what customers can already see.",
    copy: "Add the business name, website, offer, audience, and the place where being found or chosen feels weakest.",
  },
  {
    step: "02",
    title: "Cendorq checks the first signal.",
    copy: "The scan looks for the first visible weakness across findability, understanding, trust, choice, and action readiness.",
  },
  {
    step: "03",
    title: "Open the result with one email thread.",
    copy: "Verify once, then keep the result, next command, and plan path connected to the same customer email.",
  },
] as const;

const FREE_SCAN_DECISION_PATH = [
  ["Input", "Business facts create the first usable signal."],
  ["Signal", "The scan shows a visible weak area before paid depth."],
  ["Next command", "The result points toward Review, Repair, Control, or no paid step yet."],
] as const;

const FREE_SCAN_EXPECTATION_CHECKS = [
  "It is a first signal, not a full paid review.",
  "It helps decide whether deeper work is worth it.",
  "It does not promise rankings, leads, revenue, or AI placement.",
  "It keeps the result tied to the same email for the next command.",
] as const;

const FAQS = [
  {
    question: "Is the Free Scan a full review?",
    answer: "No. It is the first AI Visibility signal. It shows where visibility, clarity, trust, choice, or action may be weak before you choose deeper Review or Repair work.",
  },
  {
    question: "What should I expect after submitting?",
    answer: "Confirm your email, then open the result inside Cendorq so your business details, result, and next command stay connected.",
  },
  {
    question: "Do I need payment information?",
    answer: "No. The Free Scan should help you see the first signal before buying a deeper plan. Do not send card numbers, passwords, or private keys.",
  },
  {
    question: "What if the scan shows the cause is still unclear?",
    answer: "That is when Review makes sense. Repair should wait when the cause still needs proof.",
  },
] as const;

export default async function FreeCheckPage({ searchParams }: FreeCheckPageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams || {});
  const accessNotice = buildAccessNotice(resolvedSearchParams);
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq Free Scan",
    description: "A guided first AI Visibility scan for businesses that need to see where they may be missing, unclear, under-trusted, or harder to choose.",
    path: "/free-check",
  });

  const serviceJsonLd = buildServiceJsonLd({
    title: "Cendorq Free Scan",
    description: "A guided intake that checks the first visible weakness in business visibility, clarity, trust, AI understanding, or customer action.",
    path: "/free-check",
    serviceType: "AI Visibility free scan",
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Free Scan", path: "/free-check" },
  ]);

  const faqJsonLd = buildFaqJsonLd(FAQS);

  return (
    <main className={CENDORQ_EXPERIENCE_SYSTEM.pageShell}>
      <FreeCheckProgressGuard />
      <FreeCheckAnalytics />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />

      <section className="relative overflow-hidden px-5 py-10 sm:px-8 lg:py-14" aria-label="Free Scan diagnostic entry">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_0%,rgba(251,207,232,0.28),transparent_28%),radial-gradient(circle_at_76%_8%,rgba(125,211,252,0.34),transparent_34%),linear-gradient(180deg,#fffaff,#f6fcff_58%,#eefbff)]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.84fr_1.16fr] lg:items-center">
          <div>
            {accessNotice ? (
              <div role="status" aria-live="polite" className="mb-6 max-w-3xl rounded-[1.35rem] border border-cyan-200 bg-white/86 p-4 text-sm font-semibold leading-7 text-slate-700 shadow-[0_14px_45px_rgba(15,23,42,0.06)] backdrop-blur">
                <span className="text-cyan-700">We could not find your Cendorq account yet.</span> {accessNotice}
              </div>
            ) : null}
            <p className={CENDORQ_EXPERIENCE_SYSTEM.eyebrow}>Free AI Visibility Scan</p>
            <h1 className="mt-5 max-w-5xl text-[clamp(3rem,7vw,6.25rem)] font-semibold leading-[0.88] tracking-[-0.086em] text-slate-950">
              See the first weak signal before buying the deeper fix.
            </h1>
            <p className="mt-5 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-xl sm:leading-9">
              Cendorq checks how your business appears to customers and public systems, then shows the first place visibility, trust, choice, or action may be holding you back.
            </p>
            <p className="mt-4 max-w-2xl text-sm font-black leading-6 text-cyan-800">Start free. See the first signal. Choose the next depth only when it makes sense.</p>
            <div className="mt-6 rounded-[1.55rem] border border-white/80 bg-white/82 p-4 shadow-[0_16px_50px_rgba(14,165,233,0.08)] backdrop-blur">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">What the scan checks first</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {PREVIEW_SIGNALS.map((signal) => (
                  <article key={signal.label} className="rounded-[1.15rem] border border-cyan-100 bg-white/86 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <h2 className="text-base font-semibold tracking-[-0.035em] text-slate-950">{signal.label}</h2>
                      <span className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-cyan-700">{signal.status}</span>
                    </div>
                    <p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{signal.copy}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[2.65rem] border border-white/80 bg-white/74 p-3 shadow-[0_34px_120px_rgba(14,165,233,0.12)] backdrop-blur-2xl">
            <div className="grid gap-2 p-2 sm:grid-cols-3">
              {FORM_PAGE_STANDARD.map(([label, copy]) => (
                <div key={label} className="rounded-[1rem] border border-cyan-100 bg-cyan-50/60 p-3">
                  <p className="text-[9px] font-black uppercase tracking-[0.16em] text-cyan-700">{label}</p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-slate-600">{copy}</p>
                </div>
              ))}
            </div>
            <GuidedFreeCheckFormV3 className="relative z-10" />
          </div>
        </div>
      </section>

      <section className="px-5 pb-10 sm:px-8" aria-label="Free Scan decision path">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/85 bg-white/84 p-5 text-slate-950 shadow-[0_22px_70px_rgba(14,165,233,0.08)] backdrop-blur sm:rounded-[2.5rem] sm:p-7">
          <div className="grid gap-5 lg:grid-cols-[0.45fr_0.55fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Decision path</p>
              <h2 className="mt-3 text-[clamp(2rem,6vw,3.8rem)] font-semibold leading-[0.96] tracking-[-0.07em] text-slate-950">Know what the scan can decide.</h2>
            </div>
            <p className="text-base font-semibold leading-8 text-slate-600">The Free Scan reduces uncertainty before paid depth. It collects enough context to create a first signal, then keeps the result and next command connected.</p>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {FREE_SCAN_DECISION_PATH.map(([title, copy]) => (
              <article key={title} className="rounded-[1.35rem] border border-cyan-100 bg-white/86 p-4">
                <h3 className="text-2xl font-semibold tracking-[-0.05em] text-slate-950">{title}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{copy}</p>
              </article>
            ))}
          </div>
          <div className="mt-5 rounded-[1.45rem] border border-cyan-100 bg-cyan-50/45 p-5">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-700">Expectation checklist</p>
            <div className="mt-4 grid gap-3 md:grid-cols-4">
              {FREE_SCAN_EXPECTATION_CHECKS.map((check) => (
                <p key={check} className="rounded-[1rem] border border-white/80 bg-white/76 p-3 text-xs font-semibold leading-5 text-slate-700">{check}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-5 pb-14 sm:px-8 lg:pb-20" aria-label="How the Free Scan moves from intake to protected results">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/82 shadow-[0_24px_80px_rgba(15,23,42,0.07)] backdrop-blur">
          <div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="relative overflow-hidden border-b border-cyan-100 bg-[radial-gradient(circle_at_22%_8%,rgba(125,211,252,0.2),transparent_34%),linear-gradient(180deg,#ffffff,#effcff)] p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <div className="relative">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Scan to result handoff</p>
                <h2 className="mt-3 max-w-3xl text-[clamp(2.3rem,4.1vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.065em] text-slate-950">
                  Start with what is already visible.
                </h2>
                <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-slate-600">
                  The scan points to the first weak spot without pretending the whole cause is proven. Review before Repair when the cause still needs proof.
                </p>
              </div>
            </div>

            <div className="bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-5 sm:p-7 lg:p-8">
              <div className="grid gap-3">
                {SCAN_SYSTEM_STEPS.map((item) => (
                  <article key={item.step} className="grid gap-4 rounded-[1.8rem] border border-cyan-100 bg-white/88 p-5 shadow-[0_14px_45px_rgba(15,23,42,0.055)] sm:grid-cols-[4rem_1fr] sm:items-start">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-cyan-100 bg-cyan-50 text-sm font-black text-slate-950 shadow-sm">{item.step}</div>
                    <div>
                      <h3 className="text-2xl font-semibold tracking-[-0.05em] text-slate-950">{item.title}</h3>
                      <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{item.copy}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-5 pb-16 sm:px-8 md:grid-cols-2" aria-label="Free Scan questions">
        {FAQS.map((item) => (
          <article key={item.question} className="rounded-[2rem] border border-cyan-100 bg-white/86 p-6 shadow-[0_16px_55px_rgba(15,23,42,0.055)]">
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">{item.question}</h2>
            <p className="mt-4 text-sm font-medium leading-7 text-slate-600">{item.answer}</p>
          </article>
        ))}
      </section>
      <section className="sr-only" aria-label="Free Scan public drift anchors">Start Free Scan. first Presence Report and AI Visibility signal. missing, unclear, under-trusted, or harder to choose. Get the first signal before buying the deeper fix. Low friction. Useful context. Safe boundary. Review before Repair when the cause still needs proof.</section>
    </main>
  );
}

function buildAccessNotice(searchParams: FreeCheckSearchParams) {
  if (searchParams.access !== "free-scan-required") return "";
  if (searchParams.method === "provider" && searchParams.provider) return `Use the email from your Free Scan or plan, or start the Free Scan below with this ${titleCase(searchParams.provider)} email.`;
  if (searchParams.method === "email") return "Use the email from your Free Scan or plan, or start the Free Scan below with this email.";
  return "Already have an account? Use the same email you used for your Free Scan, form, or plan. If this is your first time here, start the Free Scan below.";
}

function titleCase(value: string) {
  return value.replace(/-/g, " ").replace(/\b\w/g, (character) => character.toUpperCase());
}
