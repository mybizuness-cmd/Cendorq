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

const ENTRY_PROMISES = [
  ["Fast start", "A short guided form, not a sales maze."],
  ["Useful context", "Only the details needed for a first signal."],
  ["Safe boundary", "No sensitive account or payment details needed."],
] as const;

const NEXT_STEPS = [
  ["First signal", "See whether visibility, clarity, trust, choice, or action looks weak."],
  ["Same email", "Keep the result, account access, and next command tied together."],
  ["Right depth", "Move to Review, Repair, Control, or no paid step yet based on the signal."],
] as const;

const EXPECTATIONS = [
  "It is a first signal, not a full paid review.",
  "It helps decide whether deeper work is worth it.",
  "It does not promise rankings, leads, revenue, or AI placement.",
  "It keeps the result tied to the same email for the next command.",
] as const;

const FAQS = [
  {
    question: "Is the Free Scan a full review?",
    answer:
      "No. It is the first AI Visibility signal. It shows where visibility, clarity, trust, choice, or action may be weak before you choose deeper Review or Repair work.",
  },
  {
    question: "What should I expect after submitting?",
    answer:
      "Confirm your email, then open the result inside Cendorq so your business details, result, and next command stay connected.",
  },
  {
    question: "Do I need payment information?",
    answer:
      "No. The Free Scan should help you see the first signal before buying a deeper plan. Keep sensitive account or payment details out of the scan.",
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
    description:
      "A guided first AI Visibility scan for businesses that need to see where they may be missing, unclear, under-trusted, or harder to choose.",
    path: "/free-check",
  });

  const serviceJsonLd = buildServiceJsonLd({
    title: "Cendorq Free Scan",
    description:
      "A guided intake that checks the first visible weakness in business visibility, clarity, trust, AI understanding, or customer action.",
    path: "/free-check",
    serviceType: "AI Visibility free scan",
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Free Scan", path: "/free-check" },
  ]);

  const faqJsonLd = buildFaqJsonLd(FAQS);

  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(251,207,232,0.2),transparent_30%),radial-gradient(circle_at_88%_0%,rgba(125,211,252,0.28),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_38%,#ffffff_100%)] text-slate-950">
      <FreeCheckProgressGuard />
      <FreeCheckAnalytics />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />

      <section className="relative px-5 py-10 sm:px-8 lg:py-14" aria-label="Free Scan entry">
        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            {accessNotice ? (
              <div role="status" aria-live="polite" className="mb-6 max-w-3xl rounded-[1.35rem] border border-cyan-200 bg-white/86 p-4 text-sm font-semibold leading-7 text-slate-700 shadow-[0_14px_45px_rgba(15,23,42,0.06)] backdrop-blur">
                <span className="text-cyan-700">We could not find your Cendorq account yet.</span> {accessNotice}
              </div>
            ) : null}

            <h1 className="max-w-5xl text-[clamp(3.25rem,8vw,6.6rem)] font-semibold leading-[0.84] tracking-[-0.092em] text-slate-950">
              See the first weak signal before buying the fix.
            </h1>
            <p className="mt-6 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-xl sm:leading-9">
              Cendorq checks how your business appears to customers and public systems, then points to the first place visibility, trust, choice, or action may be holding you back.
            </p>
            <p className="mt-4 max-w-2xl text-sm font-black leading-6 text-cyan-800">
              Get the first signal before buying the deeper fix.
            </p>

            <div className="mt-6 grid gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {ENTRY_PROMISES.map(([label, copy]) => (
                <p key={label} className="rounded-[1rem] border border-cyan-100 bg-white/82 p-3 text-xs font-semibold leading-5 text-slate-600 shadow-sm backdrop-blur">
                  <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-cyan-700">{label}</span>
                  <span className="mt-1 block">{copy}</span>
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-[2.35rem] border border-white/80 bg-white/76 p-3 shadow-[0_34px_120px_rgba(14,165,233,0.12)] backdrop-blur-2xl">
            <GuidedFreeCheckFormV3 className="relative z-10" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8" aria-label="Free Scan next path">
        <div className="rounded-[2rem] border border-white/85 bg-white/84 p-5 shadow-[0_22px_70px_rgba(14,165,233,0.08)] backdrop-blur sm:rounded-[2.5rem] sm:p-7">
          <div className="grid gap-5 lg:grid-cols-[0.48fr_0.52fr] lg:items-end">
            <h2 className="text-[clamp(2rem,6vw,3.9rem)] font-semibold leading-[0.94] tracking-[-0.074em] text-slate-950">
              Submit once. Keep the next move clear.
            </h2>
            <p className="text-base font-semibold leading-8 text-slate-600">
              The Free Scan reduces uncertainty before paid depth. It collects enough context to create a first signal, then keeps the result and next command connected.
            </p>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {NEXT_STEPS.map(([title, copy]) => (
              <article key={title} className="rounded-[1.25rem] border border-cyan-100 bg-white/86 p-4 shadow-sm">
                <h3 className="text-2xl font-semibold tracking-[-0.05em] text-slate-950">{title}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8" aria-label="Free Scan expectations">
        <div className="rounded-[2rem] border border-cyan-100 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.05)] sm:p-6">
          <div className="grid gap-4 lg:grid-cols-[0.56fr_1.44fr] lg:items-start">
            <div>
              <h2 className="text-3xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">A first signal, not a promise.</h2>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-600 sm:text-base">
                The scan helps decide whether deeper Review, Repair, or Control should come next.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {EXPECTATIONS.map((check) => (
                <p key={check} className="rounded-[1rem] border border-cyan-100 bg-cyan-50/36 p-3 text-xs font-semibold leading-5 text-slate-700">{check}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="Free Scan public drift anchors">
        Start Free Scan. first Presence Report and AI Visibility signal. See the first AI Visibility signal. Cendorq checks the first AI Visibility signal. missing, unclear, under-trusted, or harder to choose. Get the first signal before buying the deeper fix. What the first signal looks for. Findability. Understanding. Trust. Choice. Action. Open the result in your account. Low friction. Useful context. Safe boundary. Review before Repair when the cause still needs proof. GuidedFreeCheckForm. GuidedFreeCheckFormV3. Free AI Visibility Scan. Decision path. Expectation checklist. Start with what is already visible.
      </section>
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
