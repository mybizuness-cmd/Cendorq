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
    "Run the Cendorq Free Scan to see the first Presence Report signal: where your business may be missing, unclear, under-trusted, or harder for customers and AI systems to understand and choose.",
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
  { label: "Findability", status: "Check", copy: "Can public systems locate the site, business facts, and local signals?" },
  { label: "Understanding", status: "Check", copy: "Can a first-time customer quickly understand what the business does and who it serves?" },
  { label: "Trust", status: "Check", copy: "Is proof visible enough to support confidence before the customer compares alternatives?" },
  { label: "Choice", status: "Check", copy: "Does the business explain why it should be chosen over a clearer competitor?" },
  { label: "Action", status: "Check", copy: "Is the next step obvious enough for a customer to call, book, request, or visit?" },
] as const;

const SCAN_SYSTEM_STEPS = [
  {
    step: "01",
    title: "Share what customers can see now.",
    copy: "Tell Cendorq the business name, website, offer, audience, and where being found or chosen may feel weak.",
  },
  {
    step: "02",
    title: "Cendorq checks the first Presence Report signal.",
    copy: "The scan looks for the first place the business may be missing, unclear, under-trusted, or harder to choose without pretending to be a full paid review.",
  },
  {
    step: "03",
    title: "Open the result in your account.",
    copy: "Confirm your email once, then continue into your account where the result, next step, and plan path stay connected.",
  },
] as const;

const FAQS = [
  {
    question: "Is the Free Scan a full review?",
    answer: "No. It is a first Presence Report signal that shows where visibility or readiness may be weak, so you can decide whether deeper review or repair work makes sense.",
  },
  {
    question: "Where does the result open?",
    answer: "After verification, the result opens inside your Cendorq account so your business details and next step stay connected.",
  },
] as const;

export default async function FreeCheckPage({ searchParams }: FreeCheckPageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams || {});
  const accessNotice = buildAccessNotice(resolvedSearchParams);
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq Free Scan",
    description: "A guided first Presence Report signal for businesses that need to see where they may be missing, unclear, under-trusted, or harder to choose.",
    path: "/free-check",
  });

  const serviceJsonLd = buildServiceJsonLd({
    title: "Cendorq Free Scan",
    description: "A guided intake that checks the first visible weakness in business visibility, clarity, trust, AI readiness, or customer action.",
    path: "/free-check",
    serviceType: "AI Search Presence Repair free scan",
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

      <section className="relative overflow-hidden px-5 py-10 sm:px-8 lg:py-12 xl:py-14" aria-label="Free Scan diagnostic entry">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(251,207,232,0.22),transparent_28%),radial-gradient(circle_at_72%_8%,rgba(125,211,252,0.3),transparent_34%),linear-gradient(180deg,#ffffff,#f8fbff_58%,#eef8ff)]" aria-hidden="true" />
        <div className="absolute left-[-14rem] top-20 h-[34rem] w-[34rem] rounded-full bg-cyan-200/35 blur-3xl" aria-hidden="true" />
        <div className="absolute right-[-16rem] top-32 h-[38rem] w-[38rem] rounded-full bg-indigo-200/35 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.84fr_1.16fr] lg:items-center">
          <div>
            {accessNotice ? (
              <div role="status" aria-live="polite" className="mb-6 max-w-3xl rounded-[1.35rem] border border-cyan-200 bg-white/86 p-4 text-sm font-semibold leading-7 text-slate-700 shadow-[0_14px_45px_rgba(15,23,42,0.06)] backdrop-blur">
                <span className="text-cyan-700">Customer access needs a real Free Scan or plan.</span> {accessNotice}
              </div>
            ) : null}
            <p className="inline-flex rounded-full border border-cyan-200 bg-white/84 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-700 shadow-[0_10px_28px_rgba(14,165,233,0.08)]">Free Presence Scan</p>
            <h1 className="mt-5 max-w-5xl text-[clamp(3rem,5.35vw,6rem)] font-semibold leading-[0.92] tracking-[-0.08em] text-slate-950 xl:text-[clamp(3.35rem,5.8vw,6.35rem)]">
              Get the first signal before buying the deeper fix.
            </h1>
            <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">
              Cendorq checks the visible signals around your business and shows where customers or AI systems may hesitate first.
            </p>
            <div className="mt-6 rounded-[1.55rem] border border-white/80 bg-white/80 p-4 shadow-[0_16px_50px_rgba(15,23,42,0.06)] backdrop-blur">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">What the first signal looks for</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {PREVIEW_SIGNALS.map((signal) => (
                  <article key={signal.label} className="rounded-[1.15rem] border border-slate-200 bg-white p-4">
                    <div className="flex items-center justify-between gap-3">
                      <h2 className="text-base font-semibold tracking-[-0.035em] text-slate-950">{signal.label}</h2>
                      <span className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-cyan-700">{signal.status}</span>
                    </div>
                    <p className="mt-2 text-xs font-medium leading-5 text-slate-500">{signal.copy}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[2.65rem] border border-white/80 bg-white/72 p-3 shadow-[0_34px_120px_rgba(15,23,42,0.12)] backdrop-blur-2xl">
            <GuidedFreeCheckFormV3 className="relative z-10" />
          </div>
        </div>
      </section>

      <section className="relative px-5 pb-14 sm:px-8 lg:pb-20" aria-label="How the Free Scan moves from intake to protected results">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/82 shadow-[0_24px_80px_rgba(15,23,42,0.07)] backdrop-blur">
          <div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="relative overflow-hidden border-b border-cyan-100 bg-[radial-gradient(circle_at_22%_8%,rgba(125,211,252,0.2),transparent_34%),linear-gradient(180deg,#ffffff,#effcff)] p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <div className="relative">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Scan to account handoff</p>
                <h2 className="mt-3 max-w-3xl text-[clamp(2.3rem,4.1vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.065em] text-slate-950">
                  Start with what is already visible.
                </h2>
                <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-slate-600">
                  Cendorq checks the public-facing signals around the business and points to the first weak spot: missing visibility, unclear information, weak proof, weak trust, or a harder path to choose you.
                </p>
              </div>
            </div>

            <div className="bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-5 sm:p-7 lg:p-8">
              <div className="grid gap-3">
                {SCAN_SYSTEM_STEPS.map((item) => (
                  <article key={item.step} className="grid gap-4 rounded-[1.8rem] border border-slate-200 bg-white/88 p-5 shadow-[0_14px_45px_rgba(15,23,42,0.055)] sm:grid-cols-[4rem_1fr] sm:items-start">
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
          <article key={item.question} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_16px_55px_rgba(15,23,42,0.055)]">
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">{item.question}</h2>
            <p className="mt-4 text-sm font-medium leading-7 text-slate-600">{item.answer}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

function buildAccessNotice(searchParams: FreeCheckSearchParams) {
  if (searchParams.access !== "free-scan-required") return "";
  if (searchParams.method === "provider" && searchParams.provider) return `We could not find a Free Scan or plan for that ${titleCase(searchParams.provider)} identity. Start the Free Scan below.`;
  if (searchParams.method === "email") return "We could not find a Free Scan or plan for that email. Start the Free Scan below.";
  return "Already have an account? Use the same email you used for your Free Scan, form, or plan. If this is your first time here, start the Free Scan below.";
}

function titleCase(value: string) {
  return value.replace(/-/g, " ").replace(/\b\w/g, (character) => character.toUpperCase());
}
